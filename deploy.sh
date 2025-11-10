#!/bin/bash

# Скрипт деплоя для name-kotik.com
# Использование: sudo ./deploy.sh

set -e

PROJECT_DIR="/var/www/namekotik"
DOMAIN="name-kotik.com"
SERVICE_NAME="namekotik"
NGINX_CONFIG="/etc/nginx/sites-available/${DOMAIN}.conf"

echo "🚀 Начинаем деплой проекта name-kotik..."

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Пожалуйста, запустите скрипт с sudo: sudo ./deploy.sh"
    exit 1
fi

# Создание директории проекта
echo "📁 Создаем директорию проекта..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Если проект уже существует, обновляем через git
if [ -d ".git" ]; then
    echo "📥 Обновляем проект из git..."
    git pull origin master
else
    echo "📥 Клонируем проект из git..."
    git clone https://github.com/etodastandetka/namekotik.git .
fi

# Установка зависимостей
echo "📦 Устанавливаем зависимости..."
npm install --production

# Сборка проекта
echo "🔨 Собираем проект..."
npm run build

# Настройка прав доступа
echo "🔐 Настраиваем права доступа..."
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR

# Установка PM2 если не установлен
if ! command -v pm2 &> /dev/null; then
    echo "📦 Устанавливаем PM2..."
    npm install -g pm2
fi

# Остановка старого процесса если существует
pm2 stop $SERVICE_NAME 2>/dev/null || true
pm2 delete $SERVICE_NAME 2>/dev/null || true

# Запуск приложения через PM2
echo "▶️  Запускаем приложение..."
cd $PROJECT_DIR
pm2 start npm --name $SERVICE_NAME -- start
pm2 save

# Настройка автозапуска PM2
CURRENT_USER=$(whoami)
pm2 startup systemd -u $CURRENT_USER --hp /home/$CURRENT_USER | grep -v PM2 | bash || true

# Копирование конфигурации nginx
echo "⚙️  Настраиваем nginx..."
if [ -f "nginx/${DOMAIN}.conf" ]; then
    cp nginx/${DOMAIN}.conf $NGINX_CONFIG
else
    echo "⚠️  Файл nginx/${DOMAIN}.conf не найден, создаем базовую конфигурацию..."
    cat > $NGINX_CONFIG <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    access_log /var/log/nginx/name-kotik-access.log;
    error_log /var/log/nginx/name-kotik-error.log;
}
EOF
fi

# Активация конфигурации nginx
if [ ! -L "/etc/nginx/sites-enabled/${DOMAIN}.conf" ]; then
    ln -s $NGINX_CONFIG /etc/nginx/sites-enabled/
fi

# Проверка конфигурации nginx
echo "🔍 Проверяем конфигурацию nginx..."
nginx -t

# Перезапуск nginx
echo "🔄 Перезапускаем nginx..."
systemctl restart nginx

echo ""
echo "✅ Деплой завершен!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Убедитесь, что DNS записи для ${DOMAIN} указывают на IP вашего сервера"
echo "2. Для получения SSL сертификата выполните:"
echo "   sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo ""
echo "📊 Проверка статуса:"
echo "   pm2 status"
echo "   pm2 logs ${SERVICE_NAME}"
echo "   sudo systemctl status nginx"

