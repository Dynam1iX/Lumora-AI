# 🚀 Быстрый деплой - Пошаговая инструкция

## Backend на Render (5 минут)

### 1. Регистрация
- Зайдите на https://render.com
- Sign Up через GitHub
- Подключите репозиторий Lumora-AI

### 2. Создание Web Service

1. **New** → **Web Service**
2. Выберите репозиторий `Lumora-AI`
3. Заполните:

```
Name: lumora-ai-backend
Root Directory: backend
Environment: Python 3
Branch: main

Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

4. **Free Plan** (можно потом upgrade)

### 3. Environment Variables (ВАЖНО!)

Нажмите **Advanced** → **Add Environment Variable**

Добавьте эти переменные:

```
DATABASE_URL = sqlite:///./helpdesk.db

ANTHROPIC_API_KEY = ваш_ключ_anthropic

CLAUDE_MODEL = claude-3-5-sonnet-20241022

DEBUG = False

ALLOWED_ORIGINS = *

ADMIN_USERNAME = admin

ADMIN_PASSWORD = hackathon2024
```

**ВАЖНО:** Замените `ваш_ключ_anthropic` на реальный ключ!

Получить ключ: https://console.anthropic.com/settings/keys

### 4. Deploy!

Нажмите **Create Web Service**

Render начнет деплой (3-5 минут)

### 5. После деплоя

Вы получите URL вроде: `https://lumora-ai-backend.onrender.com`

**Проверьте работу:**
```
https://lumora-ai-backend.onrender.com/health
```

Должно вернуть:
```json
{"status": "healthy", "database": "connected", "api": "operational"}
```

### 6. Заполнить базу знаний

**Вариант 1: Через Shell в Render**
1. В Render Dashboard → ваш сервис → **Shell**
2. Выполните:
```bash
python seed_knowledge.py
```

**Вариант 2: Локально запустить миграцию**
Можно пропустить - БД заполнится при первом запросе к API

---

## Frontend на Netlify (3 минуты)

### Если фронтенд уже готов:

1. Зайдите на https://netlify.com
2. **Add new site** → **Import an existing project**
3. Выберите **GitHub** → ваш репозиторий
4. Настройки:

```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

5. **Environment variables** (если нужно):
```
VITE_API_URL = https://lumora-ai-backend.onrender.com
```

6. **Deploy**

### Если фронтенда еще нет:

Можно задеплоить простую страницу-заглушку:

1. Создайте `frontend/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Lumora AI - Coming Soon</title>
</head>
<body>
  <h1>Lumora AI HelpDesk</h1>
  <p>Backend API: <a href="https://lumora-ai-backend.onrender.com/docs">Swagger Docs</a></p>
  <p>Frontend coming soon...</p>
</body>
</html>
```

2. В Netlify → **Deploy manually**
3. Перетащите папку `frontend`

---

## Обновление CORS после деплоя

После того как задеплоили фронтенд на Netlify:

1. Скопируйте URL Netlify (например: `https://lumora-ai.netlify.app`)
2. Зайдите в Render → ваш backend → **Environment**
3. Обновите `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS = https://lumora-ai.netlify.app
```
4. Render автоматически передеплоит

---

## ✅ Готово!

Теперь у вас:
- ✅ Backend работает на Render
- ✅ API доступен по https://your-app.onrender.com
- ✅ Frontend на Netlify (если есть)
- ✅ CORS настроен

### Проверьте API:

**Health check:**
```
curl https://your-app.onrender.com/health
```

**Создать тикет:**
```bash
curl -X POST https://your-app.onrender.com/api/support \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "Test User",
    "email": "test@test.com",
    "problem": "Не работает VPN"
  }'
```

**API Документация:**
```
https://your-app.onrender.com/docs
```

---

## 🐛 Если что-то не работает

### Backend не стартует

**Проверьте логи:**
Render Dashboard → ваш сервис → **Logs**

**Частые ошибки:**

1. **ModuleNotFoundError**
   - Решение: проверьте что `requirements.txt` в папке `backend/`

2. **ANTHROPIC_API_KEY not found**
   - Решение: добавьте ключ в Environment Variables

3. **Port already in use**
   - Решение: используйте переменную `$PORT` (Render автоматически её задаёт)

### CORS ошибки

1. Откройте DevTools (F12) в браузере
2. Смотрите ошибку в Console
3. Убедитесь что `ALLOWED_ORIGINS` содержит правильный URL Netlify
4. Формат: `https://site.netlify.app` (без слэша в конце)

### Render засыпает (free tier)

- Это нормально! Free tier засыпает после 15 минут бездействия
- Первый запрос после сна займет ~30-60 секунд
- Для always-on нужен платный план ($7/мес)

---

## 💡 Полезные ссылки

- **Render Dashboard:** https://dashboard.render.com
- **Netlify Dashboard:** https://app.netlify.com
- **Anthropic API Keys:** https://console.anthropic.com/settings/keys
- **Полная документация:** см. DEPLOYMENT.md

---

## 🎉 Следующие шаги

1. **Интегрируйте фронтенд** с backend API
2. **Протестируйте** создание тикетов
3. **Проверьте** что AI работает
4. **Покажите** на хакатоне!

---

**Время:** ~10 минут (без фронтенда)
**Стоимость:** $0 (бесплатные tier'ы)

Удачи! 🚀
