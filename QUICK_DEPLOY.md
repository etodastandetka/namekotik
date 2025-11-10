# Быстрый деплой на сервер

## Краткая инструкция для деплоя в /var/www/namekotik

### 1. Подготовка сервера

```bash
# Установить Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установить nginx
sudo apt-get update
sudo apt-get install -y nginx
```

### 2. Настройка DNS

В панели управления доменом `name-kotik.com` добавьте A запись:
- **Имя**: `@` (или пусто)
- **Значение**: IP адрес вашего сервера
- **TTL**: 3600

Для www поддомена:
- **Имя**: `www`
- **Значение**: тот же IP адрес

### 3. Деплой проекта

**Вариант A: Автоматический (рекомендуется)**

```bash
# Склонировать проект
cd /tmp
git clone https://github.com/etodastandetka/namekotik.git
cd namekotik

# Запустить скрипт деплоя
chmod +x deploy.sh
sudo ./deploy.sh
```

**Вариант B: Ручной**

```bash
# Создать директорию
sudo mkdir -p /var/www/namekotik
sudo chown $USER:$USER /var/www/namekotik

# Клонировать проект
cd /var/www
git clone https://github.com/etodastandetka/namekotik.git namekotik
cd namekotik

# Установить зависимости и собрать
npm install
npm run build

# Настроить права
sudo chown -R www-data:www-data /var/www/namekotik

# Установить PM2
npm install -g pm2

# Запустить приложение
pm2 start npm --name "namekotik" -- start
pm2 save
pm2 startup

# Настроить nginx
sudo cp nginx/name-kotik.com.conf /etc/nginx/sites-available/name-kotik.com.conf
sudo ln -s /etc/nginx/sites-available/name-kotik.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Настройка SSL сертификата

```bash
cd /var/www/namekotik
chmod +x setup-ssl.sh
sudo ./setup-ssl.sh
```

Или вручную:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d name-kotik.com -d www.name-kotik.com
```

### 5. Проверка

```bash
# Проверить статус приложения
pm2 status

# Проверить nginx
sudo systemctl status nginx

# Проверить логи
pm2 logs namekotik
```

Откройте в браузере: `https://name-kotik.com`

## Обновление проекта

```bash
cd /var/www/namekotik
git pull origin master
npm install
npm run build
pm2 restart namekotik
```

## Полезные команды

```bash
# Логи приложения
pm2 logs namekotik

# Перезапуск
pm2 restart namekotik

# Логи nginx
sudo tail -f /var/log/nginx/name-kotik-error.log
```

