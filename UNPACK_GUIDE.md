# Как распаковать архив на сервере

## Быстрая инструкция

### Если архив в формате `.tar.gz`:

```bash
# Перейти в папку, куда загружен архив
cd /home/user

# Распаковать
tar -xzf name-kotik.tar.gz

# Перейти в распакованную папку
cd name-kotik
```

### Если архив в формате `.zip`:

```bash
# Установить unzip (если не установлен)
sudo apt-get install unzip

# Распаковать
unzip name-kotik.zip

# Перейти в папку
cd name-kotik
```

## Подробные команды

### 1. Проверить, что архив загружен:

```bash
# Посмотреть файлы в текущей папке
ls -lh

# Или найти архив
find ~ -name "name-kotik.*" -type f
```

### 2. Распаковать tar.gz:

```bash
# Базовый вариант
tar -xzf name-kotik.tar.gz

# С указанием папки назначения
tar -xzf name-kotik.tar.gz -C /home/user/my-project

# С выводом списка распакованных файлов
tar -xzvf name-kotik.tar.gz
```

**Параметры tar:**
- `-x` - извлечь (extract)
- `-z` - обработать через gzip
- `-f` - указать имя файла
- `-v` - подробный вывод (verbose)
- `-C` - указать папку назначения

### 3. Распаковать ZIP:

```bash
# Базовый вариант
unzip name-kotik.zip

# В указанную папку
unzip name-kotik.zip -d /home/user/my-project

# Без вывода (тихо)
unzip -q name-kotik.zip

# С выводом списка файлов
unzip -l name-kotik.zip
```

### 4. После распаковки:

```bash
# Перейти в папку проекта
cd name-kotik

# Проверить содержимое
ls -la

# Установить зависимости
npm install

# Собрать проект
npm run build
```

## Создание архива на Windows (для загрузки на сервер)

### Через PowerShell:

```powershell
# Создать tar.gz (если установлен Git Bash или WSL)
tar -czf name-kotik.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' .

# Или создать ZIP
Compress-Archive -Path * -DestinationPath name-kotik.zip -Exclude node_modules,.next,.git
```

### Через WinRAR/7-Zip (вручную):

1. Выделите все файлы проекта
2. Исключите: `node_modules`, `.next`, `.git`
3. Создайте архив (ZIP или 7z)
4. Загрузите на сервер через SCP или FTP

## Загрузка на сервер

### Через SCP (из PowerShell или Git Bash):

```bash
scp name-kotik.tar.gz username@your-server-ip:/home/username/
```

### Через WinSCP (графический интерфейс):

1. Скачайте WinSCP
2. Подключитесь к серверу
3. Перетащите архив в нужную папку
4. Распакуйте через терминал на сервере

### Через FTP клиент:

1. Используйте FileZilla или другой FTP клиент
2. Загрузите архив
3. Распакуйте через SSH терминал

## Проверка после распаковки

```bash
# Проверить структуру проекта
ls -la name-kotik/

# Должны быть файлы:
# - package.json
# - app/
# - components/
# - public/
# и т.д.

# Проверить права доступа
chmod -R 755 name-kotik/

# Установить зависимости
cd name-kotik
npm install
```

## Устранение проблем

### Ошибка "Permission denied":
```bash
sudo chmod +x name-kotik.tar.gz
# или
sudo tar -xzf name-kotik.tar.gz
```

### Ошибка "No space left":
```bash
# Проверить свободное место
df -h

# Очистить место
sudo apt-get clean
sudo apt-get autoremove
```

### Архив поврежден:
```bash
# Проверить целостность
tar -tzf name-kotik.tar.gz > /dev/null && echo "OK" || echo "BAD"

# Для ZIP
unzip -t name-kotik.zip
```


