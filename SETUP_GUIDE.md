# Lumora AI - Руководство по установке

## Быстрая установка (Windows)

### Автоматическая установка

1. Откройте терминал в директории проекта
2. Перейдите в папку backend:
   ```bash
   cd backend
   ```
3. Запустите setup.bat:
   ```bash
   setup.bat
   ```
4. Отредактируйте файл `.env` и добавьте ваш ANTHROPIC_API_KEY
5. Запустите сервер:
   ```bash
   run.bat
   ```

### Ручная установка

#### Шаг 1: Установка зависимостей

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### Шаг 2: Настройка окружения

Скопируйте `.env.example` в `.env`:
```bash
copy .env.example .env
```

Отредактируйте `.env` файл:
```env
DATABASE_URL=sqlite:///./helpdesk.db
ANTHROPIC_API_KEY=sk-ant-...  # ВАШ API КЛЮЧ
CLAUDE_MODEL=claude-3-5-sonnet-20241022
DEBUG=True
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=hackathon2024  # ИЗМЕНИТЕ ДЛЯ PRODUCTION
```

#### Шаг 3: Получение API ключа Anthropic

1. Перейдите на https://console.anthropic.com/
2. Зарегистрируйтесь или войдите
3. Перейдите в раздел API Keys
4. Создайте новый ключ
5. Скопируйте ключ в файл `.env`

#### Шаг 4: Инициализация базы знаний

```bash
python seed_knowledge.py
```

Эта команда добавит 15 готовых статей с решениями типовых IT проблем.

#### Шаг 5: Запуск сервера

```bash
python main.py
```

Сервер запустится на http://localhost:8000

## Проверка работоспособности

### 1. Откройте Swagger документацию

Перейдите в браузере: http://localhost:8000/docs

Вы должны увидеть интерактивную API документацию со всеми endpoints.

### 2. Проверьте health check

```bash
curl http://localhost:8000/health
```

Ответ должен быть:
```json
{
  "status": "healthy",
  "database": "connected",
  "api": "operational"
}
```

### 3. Запустите тесты

```bash
pip install requests  # если еще не установлен
python test_api.py
```

## Использование API

### Пример 1: Поиск в базе знаний

```bash
curl "http://localhost:8000/api/knowledge/search?q=vpn"
```

### Пример 2: Создание тикета

```bash
curl -X POST http://localhost:8000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "Иван Иванов",
    "email": "ivan@company.com",
    "category": "network",
    "problem": "Не подключается VPN"
  }'
```

### Пример 3: Чат с AI

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user123",
    "message": "Забыл пароль от почты",
    "category": "access_passwords"
  }'
```

### Пример 4: Админ - просмотр тикетов

```bash
curl "http://localhost:8000/api/admin/tickets?username=admin&password=hackathon2024"
```

## Структура проекта

```
backend/
├── app/
│   ├── core/               # Конфигурация и БД
│   │   ├── config.py      # Настройки приложения
│   │   └── database.py    # Подключение к БД
│   ├── models/            # SQLAlchemy модели
│   │   ├── ticket.py      # Модель тикета
│   │   ├── knowledge_base.py
│   │   └── chat_history.py
│   ├── schemas/           # Pydantic схемы (валидация)
│   │   ├── ticket.py
│   │   ├── chat.py
│   │   └── knowledge.py
│   ├── services/          # Бизнес-логика
│   │   ├── ai_service.py      # Интеграция с Claude
│   │   ├── knowledge_service.py # Поиск в БЗ
│   │   └── ticket_service.py   # Работа с тикетами
│   ├── routers/           # API endpoints
│   │   ├── chat.py        # POST /api/chat
│   │   ├── tickets.py     # /api/tickets/*
│   │   ├── knowledge.py   # /api/knowledge/*
│   │   └── admin.py       # /api/admin/*
│   └── main.py           # FastAPI приложение
├── main.py               # Точка входа
├── seed_knowledge.py     # Заполнение БЗ
├── test_api.py          # Тесты
├── requirements.txt      # Зависимости
├── setup.bat            # Автоустановка (Windows)
└── run.bat              # Быстрый запуск (Windows)
```

## API Endpoints

### Публичные

- `GET /` - корневой endpoint
- `GET /health` - health check

### Chat
- `POST /api/chat` - отправить сообщение AI

### Tickets
- `POST /api/tickets` - создать тикет
- `GET /api/tickets/{id}` - получить тикет

### Knowledge Base
- `GET /api/knowledge/search` - поиск статей
- `GET /api/knowledge/{id}` - получить статью

### Admin (требуют username/password)
- `GET /api/admin/tickets` - список тикетов
- `PATCH /api/admin/tickets/{id}` - обновить тикет
- `POST /api/admin/knowledge` - добавить статью
- `GET /api/admin/knowledge` - список статей
- `GET /api/admin/stats` - статистика

## Решение проблем

### Ошибка: "Module not found"
```bash
# Убедитесь что активировали виртуальное окружение
venv\Scripts\activate
pip install -r requirements.txt
```

### Ошибка: "ANTHROPIC_API_KEY not found"
Убедитесь что:
1. Создан файл `.env` (не `.env.example`)
2. В `.env` указан правильный API ключ
3. `.env` находится в папке `backend/`

### Ошибка: "Could not connect to database"
- Проверьте DATABASE_URL в `.env`
- Для SQLite файл создастся автоматически
- Для PostgreSQL убедитесь что сервер запущен

### AI не отвечает или ошибка 401
- Проверьте валидность ANTHROPIC_API_KEY
- Проверьте баланс на аккаунте Anthropic
- Проверьте лимиты API

### CORS ошибки
Добавьте домен фронтенда в ALLOWED_ORIGINS в `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://your-frontend.com
```

## Production Deploy

### Railway / Render

1. Создайте PostgreSQL базу данных
2. Получите DATABASE_URL
3. Установите переменные окружения:
   - DATABASE_URL
   - ANTHROPIC_API_KEY
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
   - DEBUG=False
4. Deploy через Git

### Heroku

```bash
heroku create lumora-ai-backend
heroku addons:create heroku-postgresql
heroku config:set ANTHROPIC_API_KEY=sk-ant-...
heroku config:set ADMIN_PASSWORD=secure_password
git push heroku main
heroku run python seed_knowledge.py
```

### Docker

```bash
docker build -t lumora-ai-backend .
docker run -p 8000:8000 --env-file .env lumora-ai-backend
```

## Следующие шаги

После успешного запуска backend:

1. ✅ Backend работает на http://localhost:8000
2. ⬜ Создайте frontend на React
3. ⬜ Интегрируйте frontend с API
4. ⬜ Протестируйте полный флоу
5. ⬜ Задеплойте на production

## Поддержка

По вопросам обращайтесь к команде MayhemMonkeys.

---

**Создано для хакатона 2024** 🚀
