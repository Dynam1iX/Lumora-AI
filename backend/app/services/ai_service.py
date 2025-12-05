from anthropic import Anthropic
from typing import List, Dict, Tuple
from ..core.config import settings
import re


class AIService:
    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = settings.CLAUDE_MODEL
        self.system_prompt = """Вы - AI помощник IT HelpDesk компании. Ваша задача - помогать сотрудникам решать технические проблемы.

ВАЖНЫЕ ПРАВИЛА:
1. Отвечайте на русском языке кратко и по делу
2. Давайте пошаговые инструкции для решения проблем
3. Используйте информацию из базы знаний, если она предоставлена
4. Если вы НЕ УВЕРЕНЫ в решении или проблема сложная - ЧЕСТНО скажите об этом и порекомендуйте создать тикет для специалиста
5. После каждого ответа оцените свою уверенность от 0.0 до 1.0:
   - 0.8-1.0: Уверены в решении
   - 0.5-0.7: Частично уверены, но нужно попробовать
   - 0.0-0.4: Не уверены, нужен специалист
6. Будьте вежливы и профессиональны

Формат ответа:
[Ваш ответ пользователю]

CONFIDENCE: [число от 0.0 до 1.0]"""

    def get_response(
        self,
        message: str,
        chat_history: List[Dict[str, str]],
        knowledge_context: str = ""
    ) -> Tuple[str, float]:
        """
        Get AI response with confidence score.

        Args:
            message: User's message
            chat_history: List of previous messages [{"role": "user"|"assistant", "content": "..."}]
            knowledge_context: Relevant knowledge base articles

        Returns:
            Tuple of (response_text, confidence_score)
        """
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
            system=self.system_prompt,
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
