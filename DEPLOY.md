# Инструкция по деплою и настройке домена

## Шаг 1: Узнать IP адрес вашего сервера

Если у вас VPS/сервер, узнайте его публичный IP адрес. Обычно он указан в панели управления хостингом.

## Шаг 2: Настроить DNS записи

В панели управления доменом (где вы видите "Домен - name-kotik.com"):

1. Нажмите **"Добавить запись"**
2. Выберите тип записи **"A"** (для IPv4) или **"AAAA"** (для IPv6)
3. Заполните:
   - **Имя/Поддомен**: `@` (для основного домена) или оставьте пустым
   - **Значение/IP**: вставьте IP адрес вашего сервера
   - **TTL**: можно оставить по умолчанию (обычно 3600)
4. Сохраните запись

**Важно**: Если хотите также `www.name-kotik.com`, добавьте еще одну A запись:
   - **Имя/Поддомен**: `www`
   - **Значение/IP**: тот же IP адрес сервера

## Шаг 3: Подготовить Next.js приложение к продакшену

### Сборка проекта:

```bash
npm run build
```

Это создаст оптимизированную версию приложения в папке `.next`

## Шаг 4: Деплой на сервер

### Вариант A: Использовать Vercel (рекомендуется для Next.js)

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub/GitLab репозиторий
3. Vercel автоматически задеплоит приложение
4. В настройках домена добавьте ваш домен `name-kotik.com`
5. Vercel предоставит DNS записи для настройки

### Вариант B: Деплой на свой VPS сервер

#### Установить Node.js на сервере:

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверить версию
node -v
npm -v
```

#### Установить PM2 (менеджер процессов):

```bash
npm install -g pm2
```

#### Загрузить проект на сервер:

**Вариант 1: Через архив (tar.gz)**

```bash
# На вашем компьютере (Windows PowerShell)
# Создать архив проекта (исключая node_modules и .next)
tar -czf name-kotik.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' .

# Загрузить на сервер через SCP (из PowerShell или Git Bash)
scp name-kotik.tar.gz user@your-server-ip:/home/user/
```

**На сервере (Linux):**

```bash
# Перейти в нужную директорию
cd /home/user

# Распаковать архив
tar -xzf name-kotik.tar.gz

# Или если архив в другой папке
tar -xzf /path/to/name-kotik.tar.gz -C /home/user/

# Перейти в распакованную папку
cd name-kotik

# Удалить архив (опционально)
rm ../name-kotik.tar.gz
```

**Вариант 2: Через ZIP архив (если tar не работает на Windows)**

```bash
# На вашем компьютере (Windows)
# Создать ZIP архив вручную или через PowerShell:
Compress-Archive -Path * -DestinationPath name-kotik.zip -Exclude node_modules,.next,.git

# Загрузить на сервер
scp name-kotik.zip user@your-server-ip:/home/user/
```

**На сервере:**

```bash
# Установить unzip (если не установлен)
sudo apt-get update
sudo apt-get install unzip

# Распаковать ZIP
unzip name-kotik.zip -d /home/user/name-kotik

# Или просто
unzip name-kotik.zip

# Перейти в папку
cd name-kotik

# Удалить архив
rm ../name-kotik.zip
```

**Вариант 3: Через Git (рекомендуется)**

```bash
# На сервере
cd /home/user
git clone <your-repo-url> name-kotik
cd name-kotik
```

#### На сервере:

```bash
# Распаковать или перейти в папку проекта
cd /home/user/name-kotik

# Установить зависимости
npm install

# Собрать проект
npm run build

# Запустить с PM2
pm2 start npm --name "name-kotik" -- start
pm2 save
pm2 startup
```

#### Настроить Nginx (обратный прокси):

```bash
# Установить Nginx
sudo apt-get install nginx

# Создать конфигурацию
sudo nano /etc/nginx/sites-available/name-kotik
```

Содержимое файла:

```nginx
server {
    listen 80;
    server_name name-kotik.com www.name-kotik.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Активировать конфигурацию
sudo ln -s /etc/nginx/sites-available/name-kotik /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Настроить SSL (HTTPS) с Let's Encrypt:

```bash
# Установить Certbot
sudo apt-get install certbot python3-certbot-nginx

# Получить сертификат
sudo certbot --nginx -d name-kotik.com -d www.name-kotik.com

# Автоматическое обновление
sudo certbot renew --dry-run
```

## Шаг 5: Проверка

1. Подождите 5-30 минут (время распространения DNS)
2. Проверьте DNS: `nslookup name-kotik.com` или используйте [dnschecker.org](https://dnschecker.org)
3. Откройте в браузере: `http://name-kotik.com` (потом будет `https://`)

## Полезные команды

```bash
# Проверить статус PM2
pm2 status

# Посмотреть логи
pm2 logs name-kotik

# Перезапустить приложение
pm2 restart name-kotik

# Проверить Nginx
sudo nginx -t
sudo systemctl status nginx
```

## Troubleshooting

- **Домен не открывается**: Проверьте DNS записи, подождите до 48 часов
- **502 Bad Gateway**: Проверьте, что приложение запущено на порту 3000
- **Порт занят**: Измените порт в `package.json` или настройте Nginx

