# 🚀 Как запустить Lumora AI

## Быстрый старт (5 минут)

### Шаг 1: Запустить Backend

```bash
# Терминал 1
cd backend
python main.py
```

Backend запустится на **http://localhost:8000**

Проверьте: http://localhost:8000/health

### Шаг 2: Запустить Frontend

```bash
# Терминал 2
cd frontend
npm install      # первый раз
npm run dev
```

Frontend запустится на **http://localhost:5173**

### Шаг 3: Открыть в браузере

Откройте http://localhost:5173

**Готово!** 🎉

---

## Подробная инструкция

### Требования

- **Python 3.11+**
- **Node.js 18+**
- **Anthropic API Key** (получить на https://console.anthropic.com/settings/keys)

---

### Backend (FastAPI)

#### 1. Установка зависимостей

```bash
cd backend

# Создать виртуальное окружение
python -m venv venv

# Активировать (Windows)
venv\Scripts\activate

# Активировать (Linux/Mac)
source venv/bin/activate

# Установить зависимости
pip install -r requirements.txt
```

#### 2. Настройка .env

Отредактируйте `backend/.env`:

```env
DATABASE_URL=sqlite:///./helpdesk.db
ANTHROPIC_API_KEY=sk-ant-api03-ваш_ключ_здесь  # ВАЖНО!
CLAUDE_MODEL=claude-3-5-sonnet-20241022
DEBUG=True
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

**ОБЯЗАТЕЛЬНО:** Замените `ANTHROPIC_API_KEY` на ваш реальный ключ!

#### 3. Заполнить базу знаний

```bash
python seed_knowledge.py
```

Это добавит 15 готовых решений IT проблем.

#### 4. Запустить сервер

```bash
python main.py
```

Сервер запустится на http://localhost:8000

**API Документация:** http://localhost:8000/docs

---

### Frontend (React + TypeScript)

#### 1. Установка зависимостей

```bash
cd frontend
npm install
```

#### 2. Проверка .env

Убедитесь что `frontend/.env` содержит:

```env
VITE_API_URL=http://localhost:8000
```

#### 3. Запустить dev сервер

```bash
npm run dev
```

Frontend запустится на http://localhost:5173

---

## Использование

### 1. Чат с AI

1. Откройте http://localhost:5173
2. Нажмите "Чат с AI"
3. При первом использовании введите ваше имя и email
4. Опишите проблему, например: "Не работает VPN"
5. AI автоматически:
   - Создаст тикет
   - Определит категорию и приоритет
   - Попытается решить
   - Если не может - передаст специалисту

### 2. База знаний

1. Нажмите "База знаний"
2. Используйте поиск
3. 15 готовых решений доступны сразу

### 3. Админ панель

1. Нажмите "Админ"
2. Логин: `admin`
3. Пароль: `admin` (можно изменить в backend/.env)
4. Просмотр всех тикетов
5. Обновление статусов
6. Добавление новых статей в БЗ

---

## Проверка работы

### Backend Health Check

```bash
curl http://localhost:8000/health
```

Должно вернуть:
```json
{
  "status": "healthy",
  "database": "connected",
  "api": "operational"
}
```

### Тест создания тикета

```bash
curl -X POST http://localhost:8000/api/support \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "Test User",
    "email": "test@test.com",
    "problem": "Не работает принтер"
  }'
```

---

## Troubleshooting

### Backend не запускается

**Проблема:** `ModuleNotFoundError`
**Решение:**
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

**Проблема:** `ANTHROPIC_API_KEY not found`
**Решение:** Добавьте ключ в `backend/.env`

### Frontend не подключается к backend

**Проблема:** CORS ошибки
**Решение:** Проверьте `ALLOWED_ORIGINS` в `backend/.env`

**Проблема:** `Failed to fetch`
**Решение:**
1. Убедитесь что backend запущен (http://localhost:8000/health)
2. Проверьте `VITE_API_URL` в `frontend/.env`

### AI не отвечает

**Проблема:** Ошибка Anthropic API
**Решение:**
1. Проверьте что ANTHROPIC_API_KEY корректный
2. Проверьте лимиты на https://console.anthropic.com/
3. Проверьте баланс аккаунта

---

## Структура проекта

```
Lumora-AI/
├── backend/                    # FastAPI server
│   ├── app/
│   │   ├── core/              # Config, Database
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   │   └── ai_service.py  # 🤖 AI логика здесь!
│   │   └── routers/           # API endpoints
│   │       └── support.py     # 🎯 Главный endpoint!
│   ├── main.py                # Entry point
│   ├── seed_knowledge.py      # Заполнить БЗ
│   └── .env                   # Конфигурация
│
└── frontend/                   # React app
    ├── src/
    │   ├── components/
    │   │   └── ChatWindow.tsx # 💬 Чат с AI
    │   ├── services/
    │   │   └── api.ts         # API клиент
    │   └── App.tsx            # Main app
    ├── .env                   # Frontend config
    └── package.json

```

---

## Ключевые файлы

### Backend
- **app/routers/support.py** - главный endpoint POST /api/support
- **app/services/ai_service.py** - AI логика (Claude integration)
- **seed_knowledge.py** - 15 готовых решений

### Frontend
- **src/components/ChatWindow.tsx** - чат интерфейс
- **src/services/api.ts** - API клиент

---

## Следующие шаги

1. ✅ Backend запущен
2. ✅ Frontend запущен
3. ✅ Протестировать чат
4. ⬜ Настроить под ваши нужды
5. ⬜ Задеплоить на production (см. DEPLOYMENT.md)

---

## Полезные ссылки

- **Backend API Docs:** http://localhost:8000/docs
- **Frontend:** http://localhost:5173
- **Deployment Guide:** DEPLOYMENT.md
- **Frontend Integration:** FRONTEND_INTEGRATION.md

---

**Время запуска:** ~5 минут
**Сложность:** Легко ✅

Удачи! 🚀
