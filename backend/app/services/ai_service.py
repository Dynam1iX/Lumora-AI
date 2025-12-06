from anthropic import Anthropic
from typing import List, Dict, Tuple, Optional
from ..core.config import settings
from ..models.ticket import TicketCategory, TicketPriority
import re
import json


class AIService:
    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = settings.CLAUDE_MODEL

    def process_ticket_auto(
        self,
        problem: str,
        knowledge_context: str = ""
    ) -> Dict:
        """
        Полная автоматическая обработка тикета:
        1. Определение категории
        2. Определение приоритета
        3. Попытка решения проблемы
        4. Решение о необходимости эскалации

        Returns:
            Dict с полями: category, priority, solution, confidence, needs_human
        """
        system_prompt = """Вы - AI система первой линии технической поддержки. Ваша задача - ЗАМЕНИТЬ человека на первой линии.

КРИТИЧЕСКИ ВАЖНО:
1. Вы ДОЛЖНЫ попытаться решить проблему самостоятельно
2. Вы ДОЛЖНЫ точно определить категорию и приоритет
3. ТОЛЬКО если проблема действительно сложная или критичная - передавайте человеку

КАТЕГОРИИ ПРОБЛЕМ:
- access_passwords: Доступы, пароли, учетные записи
- network: Сеть, VPN, интернет
- printers: Принтеры, печать
- software: Программное обеспечение, приложения
- hardware: Оборудование, железо
- other: Прочее

ПРИОРИТЕТЫ:
- low: Косметические проблемы, не влияют на работу
- medium: Проблемы средней важности, работа возможна
- high: Серьезные проблемы, работа затруднена
- critical: Критические проблемы, работа невозможна

ФОРМАТ ОТВЕТА (СТРОГО JSON):
{
  "category": "категория_из_списка",
  "priority": "приоритет_из_списка",
  "solution": "Подробное пошаговое решение проблемы",
  "confidence": 0.85,
  "needs_human": false
}

ПРАВИЛА ОПРЕДЕЛЕНИЯ needs_human:
- true: Если проблема требует физического доступа, критична, вы не уверены (confidence < 0.6), или требует админских прав которых у пользователя нет
- false: Если вы можете дать четкую инструкцию для решения

Отвечайте ТОЛЬКО валидным JSON, без дополнительного текста!"""

        user_message = f"""Проблема пользователя: {problem}"""

        if knowledge_context:
            user_message += f"""

Релевантная информация из базы знаний:
{knowledge_context}

Используйте эту информацию для решения, если подходит."""

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                system=system_prompt,
                messages=[{"role": "user", "content": user_message}]
            )

            response_text = response.content[0].text.strip()

            # Extract JSON from response
            result = self._extract_json(response_text)

            # Validate and convert category/priority to enums
            result['category'] = TicketCategory(result.get('category', 'other'))
            result['priority'] = TicketPriority(result.get('priority', 'medium'))
            result['confidence'] = float(result.get('confidence', 0.5))
            result['needs_human'] = bool(result.get('needs_human', True))

            return result

        except Exception as e:
            # Fallback in case of error
            return {
                'category': TicketCategory.OTHER,
                'priority': TicketPriority.MEDIUM,
                'solution': f"Не удалось автоматически обработать запрос. Пожалуйста, дождитесь ответа специалиста.",
                'confidence': 0.0,
                'needs_human': True
            }

    def _extract_json(self, text: str) -> Dict:
        """Extract JSON from AI response, handling markdown code blocks."""
        # Try to find JSON in code blocks
        json_match = re.search(r'```json\s*(.*?)\s*```', text, re.DOTALL)
        if json_match:
            text = json_match.group(1)
        else:
            # Try to find JSON without code blocks
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                text = json_match.group(0)

        try:
            return json.loads(text)
        except json.JSONDecodeError:
            # If JSON parsing fails, return default
            return {
                'category': 'other',
                'priority': 'medium',
                'solution': 'Ошибка обработки. Обратитесь к специалисту.',
                'confidence': 0.0,
                'needs_human': True
            }

    def get_response(
        self,
        message: str,
        chat_history: List[Dict[str, str]],
        knowledge_context: str = ""
    ) -> Tuple[str, float]:
        """
        Get AI response with confidence score (legacy method for chat).

        Args:
            message: User's message
            chat_history: List of previous messages [{"role": "user"|"assistant", "content": "..."}]
            knowledge_context: Relevant knowledge base articles

        Returns:
            Tuple of (response_text, confidence_score)
        """
        system_prompt = """Вы - AI помощник IT HelpDesk компании. Ваша задача - помогать сотрудникам решать технические проблемы.

ВАЖНЫЕ ПРАВИЛА:
1. Отвечайте на русском языке кратко и по делу
2. Давайте пошаговые инструкции для решения проблем
3. Используйте информацию из базы знаний, если она предоставлена
4. Будьте вежливы и профессиональны

Формат ответа:
[Ваш ответ пользователю]

CONFIDENCE: [число от 0.0 до 1.0]"""

        messages = chat_history.copy()

        # Add knowledge context if available
        user_message = message
        if knowledge_context:
            user_message = f"""Вопрос пользователя: {message}

Релевантная информация из базы знаний:
{knowledge_context}

Используйте эту информацию для ответа, если она помогает решить проблему."""

        messages.append({"role": "user", "content": user_message})

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            system=system_prompt,
            messages=messages
        )

        response_text = response.content[0].text

        # Extract confidence score
        confidence = self._extract_confidence(response_text)

        # Remove confidence marker from response
        clean_response = re.sub(r'\n*CONFIDENCE:.*$', '', response_text, flags=re.IGNORECASE).strip()

        return clean_response, confidence

    def _extract_confidence(self, response: str) -> float:
        """Extract confidence score from AI response."""
        match = re.search(r'CONFIDENCE:\s*([0-9.]+)', response, re.IGNORECASE)
        if match:
            try:
                confidence = float(match.group(1))
                return max(0.0, min(1.0, confidence))  # Clamp between 0 and 1
            except ValueError:
                pass

        # Default confidence if not found
        return 0.5

    def should_suggest_ticket(self, confidence: float) -> bool:
        """Determine if we should suggest creating a ticket based on confidence."""
        return confidence < 0.6
