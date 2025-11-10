# Решение проблем на сервере

## Проблема 1: Git pull не прошел из-за локальных изменений

Выполните на сервере:

```bash
cd /var/www/namekotik

# Сохранить локальные изменения (если они нужны)
git stash

# Или отменить локальные изменения (если они не нужны)
git reset --hard HEAD

# Теперь обновить код
git pull origin master
```

## Проблема 2: PM2 процесс не найден

Приложение нужно запустить:

```bash
cd /var/www/namekotik
pm2 start npm --name "namekotik" -- start
pm2 save
pm2 startup
```

## Проблема 3: fix-ssl.sh не найден

После успешного git pull файл должен появиться. Если нет, выполните:

```bash
cd /var/www/namekotik
git pull origin master
chmod +x fix-ssl.sh
sudo ./fix-ssl.sh
```

## Полная последовательность команд для исправления:

```bash
# 1. Перейти в директорию проекта
cd /var/www/namekotik

# 2. Решить проблему с git (выберите один вариант)
# Вариант A: Сохранить локальные изменения
git stash
git pull origin master
git stash pop  # если нужно вернуть изменения

# Вариант B: Отменить локальные изменения (рекомендуется)
git reset --hard HEAD
git pull origin master

# 3. Убедиться, что fix-ssl.sh существует
ls -la fix-ssl.sh

# 4. Если файла нет, скачать его вручную или повторить git pull
# Если файл есть, сделать его исполняемым
chmod +x fix-ssl.sh

# 5. Запустить приложение через PM2
pm2 start npm --name "namekotik" -- start
pm2 save

# 6. Исправить SSL
sudo ./fix-ssl.sh
```

## Проверка после исправления:

```bash
# Проверить статус PM2
pm2 status

# Проверить логи
pm2 logs namekotik

# Проверить nginx
sudo systemctl status nginx

# Проверить SSL
sudo certbot certificates
```

