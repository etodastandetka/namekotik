#!/bin/bash

# Скрипт для настройки SSL сертификата через Let's Encrypt
# Использование: sudo ./setup-ssl.sh

set -e

DOMAIN="name-kotik.com"

echo "🔒 Настройка SSL сертификата для ${DOMAIN}..."

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Пожалуйста, запустите скрипт с sudo: sudo ./setup-ssl.sh"
    exit 1
fi

# Проверка установки certbot
if ! command -v certbot &> /dev/null; then
    echo "📦 Устанавливаем certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Проверка DNS
echo "🔍 Проверяем DNS записи..."
if ! nslookup ${DOMAIN} &> /dev/null; then
    echo "⚠️  Внимание: DNS записи для ${DOMAIN} могут быть еще не настроены"
    echo "   Убедитесь, что A запись для ${DOMAIN} указывает на IP вашего сервера"
    read -p "Продолжить? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Получение SSL сертификата
echo "📜 Получаем SSL сертификат от Let's Encrypt..."
certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email admin@${DOMAIN} --redirect

# Настройка автоматического обновления
echo "🔄 Настраиваем автоматическое обновление сертификата..."
certbot renew --dry-run

echo ""
echo "✅ SSL сертификат успешно настроен!"
echo ""
echo "🔍 Проверьте конфигурацию nginx:"
echo "   sudo nginx -t"
echo ""
echo "🔄 Перезапустите nginx если нужно:"
echo "   sudo systemctl restart nginx"
echo ""
echo "🌐 Откройте в браузере: https://${DOMAIN}"

