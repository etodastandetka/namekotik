# Исправление проблем деплоя

## Проблема 1: Ошибки сборки Next.js (Module not found)

Исправлено в коде. Теперь нужно:

```bash
cd /var/www/namekotik
git pull origin master
npm install
npm run build
pm2 restart namekotik
```

## Проблема 2: Certbot не может установить SSL сертификат

Сертификат был получен, но не установлен в nginx. Выполните:

```bash
cd /var/www/namekotik
chmod +x fix-ssl.sh
sudo ./fix-ssl.sh
```

Или вручную:

```bash
# Проверить, что конфигурация nginx существует и активирована
sudo ls -la /etc/nginx/sites-available/name-kotik.com.conf
sudo ls -la /etc/nginx/sites-enabled/name-kotik.com.conf

# Если символическая ссылка не существует, создать её
sudo ln -s /etc/nginx/sites-available/name-kotik.com.conf /etc/nginx/sites-enabled/name-kotik.com.conf

# Проверить конфигурацию
sudo nginx -t

# Перезапустить nginx
sudo systemctl restart nginx

# Установить сертификат
sudo certbot install --cert-name name-kotik.com --nginx
```

## Проверка после исправления

```bash
# Проверить статус приложения
pm2 status

# Проверить nginx
sudo systemctl status nginx

# Проверить SSL сертификат
sudo certbot certificates

# Открыть сайт
curl -I https://name-kotik.com
```

## Если проблемы остались

1. **Проверьте логи nginx:**
   ```bash
   sudo tail -f /var/log/nginx/name-kotik-error.log
   ```

2. **Проверьте логи приложения:**
   ```bash
   pm2 logs namekotik
   ```

3. **Проверьте, что приложение запущено на порту 3000:**
   ```bash
   sudo netstat -tlnp | grep 3000
   ```

4. **Проверьте конфигурацию nginx:**
   ```bash
   sudo cat /etc/nginx/sites-available/name-kotik.com.conf
   ```

