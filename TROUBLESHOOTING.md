# 🔧 Troubleshooting - Решение проблем

## Быстрая диагностика

Запустите проверку:
```bash
cd C:\Users\Est1ege\Documents\GitHub\Lumora-AI
check_setup.bat
```

---

## 🐛 Частые проблемы

### 1. Backend не запускается

#### Ошибка: `ModuleNotFoundError`

**Причина:** Не установлены зависимости

**Решение:**
```bash
cd backend
reinstall_all.bat
```

#### Ошибка: `ANTHROPIC_API_KEY not found`

**Причина:** API ключ не настроен в .env

**Решение:**
1. Получите ключ: https://console.anthropic.com/settings/keys
2. Откройте `backend\.env`
3. Замените: `ANTHROPIC_API_KEY=your_api_key_here`
4. На: `ANTHROPIC_API_KEY=sk-ant-api03-ваш_ключ`
5. Перезапустите backend

**Подробнее:** [FIX_API_KEY.md](FIX_API_KEY.md)

#### Ошибка: `TypeError: Client.__init__() got an unexpected keyword argument 'proxies'`

**Причина:** Устаревшая версия пакета anthropic

**Решение:**
```bash
cd backend
reinstall_all.bat
```

---

### 2. Frontend не запускается

#### Ошибка: `Cannot find module`

**Причина:** Не установлены зависимости npm

**Решение:**
```bash
cd frontend
npm install
```

#### Ошибка: `EADDRINUSE: address already in use`

**Причина:** Порт 5173 уже занят

**Решение:**

**Вариант 1:** Убить процесс на порту
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Вариант 2:** Использовать другой порт
```bash
npm run dev -- --port 5174
```

---

### 3. Frontend не подключается к Backend

#### Ошибка: `Failed to fetch` или `Network Error`

**Причина:** Backend не запущен или неверный URL

**Решение:**

1. Проверьте что backend работает:
   ```bash
   curl http://localhost:8000/health
   ```

2. Проверьте `frontend\.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. Перезапустите frontend:
   ```bash
   # Ctrl+C в терминале frontend
   npm run dev
   ```

#### Ошибка: CORS

**Причина:** Backend не разрешает запросы с frontend

**Решение:**

Откройте `backend\.env` и проверьте:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Перезапустите backend.

---

### 4. AI не отвечает / Ошибка 422

#### Ошибка: `422 Unprocessable Entity`

**Причина:** Неверный формат email

**Решение:**

1. Откройте DevTools (F12) → Application → Local Storage
2. Удалите `user_email` и `user_name`
3. Обновите страницу (F5)
4. Введите корректный email: `user@company.com`

**Подробнее:** [RESET_USER_INFO.md](RESET_USER_INFO.md)

#### AI возвращает `ai_confidence: 0.0` и `needs_human: true`

**Причина:** ANTHROPIC_API_KEY не настроен или неверный

**Решение:**

1. Проверьте `backend\.env`:
   ```bash
   cd backend
   check_api_key.bat
   ```

2. Если ключ не настроен - см. [FIX_API_KEY.md](FIX_API_KEY.md)

3. Если настроен - проверьте баланс: https://console.anthropic.com/

---

### 5. Проблемы с зависимостями

#### Ошибка: `email-validator is not installed`

**Причина:** Не установлен модуль email-validator

**Решение:**
```bash
cd backend
fix_dependencies.bat
```

#### Warning: `The candidate selected for download or install is a yanked version`

**Причина:** Используется отозванная версия пакета

**Решение:**
```bash
cd backend
reinstall_all.bat
```

Это обновит все пакеты до актуальных версий.

---

### 6. База данных

#### Ошибка: `database is locked`

**Причина:** SQLite база данных заблокирована другим процессом

**Решение:**

1. Остановите backend (Ctrl+C)
2. Закройте все программы которые могут использовать БД
3. Запустите backend снова

#### Проблема: База знаний пустая

**Причина:** Не выполнена миграция seed_knowledge.py

**Решение:**
```bash
cd backend
venv\Scripts\activate
python seed_knowledge.py
```

---

## 🔍 Логи и диагностика

### Проверка Backend

```bash
# Health check
curl http://localhost:8000/health

# API Docs
# Откройте: http://localhost:8000/docs

# Прямой тест API
curl -X POST http://localhost:8000/api/support \
  -H "Content-Type: application/json" \
  -d "{\"user_name\":\"Test\",\"email\":\"test@test.com\",\"problem\":\"Test\"}"
```

### Проверка Frontend

1. Откройте DevTools (F12)
2. Вкладка **Console** - ошибки JavaScript
3. Вкладка **Network** - проверка HTTP запросов
4. Ищите красные ошибки

### Проверка переменных окружения

**Backend:**
```bash
cd backend
type .env
```

**Frontend:**
```bash
cd frontend
type .env
```

---

## 📋 Контрольный список проблем

Перед обращением за помощью проверьте:

### Backend
- [ ] Python 3.11+ установлен
- [ ] Виртуальное окружение создано
- [ ] Зависимости установлены (`pip install -r requirements.txt`)
- [ ] `.env` файл существует
- [ ] `ANTHROPIC_API_KEY` настроен (не `your_api_key_here`)
- [ ] База данных заполнена (`python seed_knowledge.py`)
- [ ] Backend запущен на http://localhost:8000
- [ ] Health check работает: http://localhost:8000/health

### Frontend
- [ ] Node.js 18+ установлен
- [ ] npm зависимости установлены (`npm install`)
- [ ] `.env` файл существует
- [ ] `VITE_API_URL=http://localhost:8000`
- [ ] Frontend запущен на http://localhost:5173
- [ ] Email корректный в localStorage

### Интеграция
- [ ] Backend доступен с frontend (CORS настроен)
- [ ] API ключ работает (проверьте баланс)
- [ ] Нет ошибок в консоли браузера
- [ ] Нет ошибок в терминале backend

---

## 🆘 Полный сброс (последнее средство)

Если ничего не помогает:

### Backend
```bash
cd backend
rmdir /s /q venv
del helpdesk.db
reinstall_all.bat
python seed_knowledge.py
start_backend.bat
```

### Frontend
```bash
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

### Browser
1. Очистите localStorage (F12 → Application → Local Storage → Clear All)
2. Очистите кэш (Ctrl+Shift+Delete)
3. Перезапустите браузер

---

## 📚 Дополнительная помощь

- **[START_NOW.md](START_NOW.md)** - Пошаговая инструкция запуска
- **[FIX_API_KEY.md](FIX_API_KEY.md)** - Настройка API ключа
- **[RESET_USER_INFO.md](RESET_USER_INFO.md)** - Сброс информации пользователя
- **[COMMANDS_CHEATSHEET.md](COMMANDS_CHEATSHEET.md)** - Шпаргалка команд

---

**Не нашли решение?** Проверьте логи в терминалах backend и frontend - там обычно есть подробности об ошибке.
