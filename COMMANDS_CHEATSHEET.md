# 📝 Шпаргалка команд

## 🚀 Запуск проекта

### Быстрый запуск (Windows)

```bash
# Проверка окружения
check_setup.bat

# Backend (Терминал 1)
cd backend
start_backend.bat

# Frontend (Терминал 2)
cd frontend
start_frontend.bat
```

### Ручной запуск

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed_knowledge.py
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Доступ из интернета

### ngrok

```bash
# Установка authtoken (один раз)
ngrok config add-authtoken YOUR_TOKEN

# Backend туннель (Терминал 3)
ngrok http 8000

# Frontend туннель (Терминал 4)
ngrok http 5173
```

### localtunnel

```bash
# Установка (один раз)
npm install -g localtunnel

# Backend туннель
lt --port 8000 --subdomain lumora-backend

# Frontend туннель
lt --port 5173 --subdomain lumora-frontend
```

---

## ✅ Проверка работы

### Backend

```bash
# Health check
curl http://localhost:8000/health

# API Docs
# Откройте: http://localhost:8000/docs

# Создать тестовый тикет
curl -X POST http://localhost:8000/api/support \
  -H "Content-Type: application/json" \
  -d "{\"user_name\":\"Test\",\"email\":\"test@test.com\",\"problem\":\"Не работает VPN\"}"
```

### Frontend

```bash
# Открыть в браузере
start http://localhost:5173
```

---

## 🔧 Настройка

### Backend .env

```env
DATABASE_URL=sqlite:///./helpdesk.db
ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-3-5-sonnet-20241022
DEBUG=True
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

### Frontend .env

```env
VITE_API_URL=http://localhost:8000
```

### Для ngrok добавьте в Backend .env:

```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://YOUR_FRONTEND_NGROK_URL.ngrok-free.app
```

### Для ngrok обновите Frontend .env:

```env
VITE_API_URL=https://YOUR_BACKEND_NGROK_URL.ngrok-free.app
```

---

## 🐛 Troubleshooting

### Перезапуск Backend

```bash
# Нажмите Ctrl+C в терминале backend
# Затем:
python main.py
```

### Перезапуск Frontend

```bash
# Нажмите Ctrl+C в терминале frontend
# Затем:
npm run dev
```

### Переустановка зависимостей Backend

```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt --force-reinstall
```

### Переустановка зависимостей Frontend

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Пересоздание базы данных

```bash
cd backend
rm helpdesk.db
python seed_knowledge.py
```

---

## 📊 Полезные URL

### Локально

- **Frontend:** http://localhost:5173
- **Backend Health:** http://localhost:8000/health
- **API Docs (Swagger):** http://localhost:8000/docs
- **API Docs (ReDoc):** http://localhost:8000/redoc
- **ngrok Dashboard:** http://localhost:4040 (если ngrok запущен)

### Production (после деплоя)

- **Backend:** https://your-app.onrender.com
- **Frontend:** https://your-app.netlify.app
- **API Docs:** https://your-app.onrender.com/docs

---

## 🔑 Получение API ключей

### Anthropic API Key

1. Зайдите: https://console.anthropic.com/settings/keys
2. Sign Up / Login
3. Create Key
4. Скопируйте ключ (начинается с `sk-ant-api03-`)

### ngrok authtoken

1. Зайдите: https://dashboard.ngrok.com/signup
2. Sign Up / Login
3. Скопируйте authtoken из дашборда

---

## 📦 Деплой

### Render (Backend)

```bash
# Создайте Web Service на render.com
# Root Directory: backend
# Build Command: pip install -r requirements.txt
# Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

# Добавьте Environment Variables:
ANTHROPIC_API_KEY=your_key
DATABASE_URL=sqlite:///./helpdesk.db
CLAUDE_MODEL=claude-3-5-sonnet-20241022
DEBUG=False
ALLOWED_ORIGINS=https://your-frontend.netlify.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### Netlify (Frontend)

```bash
# Создайте New Site на netlify.com
# Base directory: frontend
# Build command: npm run build
# Publish directory: frontend/dist

# Добавьте Environment Variables:
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🎯 Git команды

```bash
# Сохранить изменения
git add .
git commit -m "Update: описание изменений"
git push origin main

# Откатить изменения
git checkout .

# Посмотреть статус
git status

# Посмотреть историю
git log --oneline
```

---

## 💻 Системные команды

### Проверка установленных версий

```bash
python --version
node --version
npm --version
git --version
```

### Убить процесс на порту (если порт занят)

**Windows:**
```bash
# Найти PID процесса на порту 8000
netstat -ano | findstr :8000

# Убить процесс
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Убить процесс на порту 8000
lsof -ti:8000 | xargs kill -9
```

---

## 🎨 Быстрые тесты

### Тест 1: VPN проблема

```
Пользователь: "Не работает VPN"

AI должен:
- Создать тикет
- Категория: Сеть и интернет
- Приоритет: Высокий
- Предложить решение
```

### Тест 2: Принтер

```
Пользователь: "Не печатает принтер"

AI должен:
- Создать тикет
- Категория: Принтеры
- Приоритет: Средний
- Предложить решение
```

### Тест 3: Забыл пароль

```
Пользователь: "Забыл пароль от почты"

AI должен:
- Создать тикет
- Категория: Доступы и пароли
- Приоритет: Средний
- Предложить инструкцию по сбросу
```

### Тест 4: Критическая проблема

```
Пользователь: "Сервер упал, база данных недоступна"

AI должен:
- Создать тикет
- Категория: Оборудование
- Приоритет: Критический
- Передать специалисту
```

---

**Сохраните эту шпаргалку!** 📌

Все самые нужные команды в одном месте.
