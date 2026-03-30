/**
 * SPIRA - AI стилист приложение
 * Express сервер для Railway
 */

const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(__dirname));
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API маршруты
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'SPIRA сервер работает' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`SPIRA сервер запущен на порту ${PORT}`);
});