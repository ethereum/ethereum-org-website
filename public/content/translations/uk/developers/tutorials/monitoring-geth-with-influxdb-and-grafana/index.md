---
title: "Моніторинг Geth за допомогою InfluxDB і Grafana"
description: "Налаштуйте моніторинг для вашого вузла Geth за допомогою InfluxDB і Grafana, щоб відстежувати продуктивність і виявляти проблеми."
author: "Mario Havel"
tags: [ "клієнти", "вузли" ]
skill: intermediate
lang: uk
published: 2021-01-13
---

Цей посібник допоможе вам налаштувати моніторинг для вашого вузла Geth, щоб краще зрозуміти його продуктивність та визначити потенційні проблеми.

## Передумови {#prerequisites}

- Ви вже повинні мати запущений екземпляр Geth.
- Більшість кроків і прикладів призначені для середовища Linux, тому базові знання терміналу будуть корисними.
- Перегляньте цей відеоогляд набору метрик Geth: [Моніторинг інфраструктури Ethereum від Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Стек моніторингу {#monitoring-stack}

Клієнт Ethereum збирає багато даних, які можна прочитати у вигляді хронологічної бази даних. Щоб спростити моніторинг, ви можете передати ці дані в програмне забезпечення для візуалізації. Існує декілька доступних варіантів:

- [Prometheus](https://prometheus.io/) (модель витягування)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (модель передавання)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Також існує [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) — варіант, попередньо налаштований для роботи з InfluxDB і Grafana.

У цьому посібнику ми налаштуємо ваш клієнт Geth для передавання даних в InfluxDB для створення бази даних і в Grafana для створення графічної візуалізації цих даних. Виконання цих кроків вручну допоможе вам краще зрозуміти процес, змінювати його та розгортати в різних середовищах.

## Налаштування InfluxDB {#setting-up-influxdb}

Спочатку давайте завантажимо та встановимо InfluxDB. Різні варіанти завантаження можна знайти на [сторінці випусків Influxdata](https://portal.influxdata.com/downloads/). Виберіть той, що підходить для вашого середовища.
Ви також можете встановити його з [репозиторію](https://repos.influxdata.com/). Наприклад, у дистрибутиві на основі Debian:

```
curl -tlsv1.3 --proto =https -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
sudo apt install influxdb-client
```

Після успішного встановлення InfluxDB переконайтеся, що він працює у фоновому режимі. За замовчуванням він доступний за адресою `localhost:8086`.
Перш ніж використовувати клієнт `influx`, ви повинні створити нового користувача з правами адміністратора. Цей користувач буде слугувати для управління вищого рівня, створення баз даних і користувачів.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Тепер за допомогою цього користувача ви можете увійти в [оболонку InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/), використовуючи клієнт `influx`.

```
influx -username 'username' -password 'password'
```

Безпосередньо взаємодіючи з InfluxDB в його оболонці, ви можете створити базу даних і користувача для метрик Geth.

```
create database geth
create user geth with password choosepassword
```

Перевірте створені записи за допомогою:

```
show databases
show users
```

Вийдіть з оболонки InfluxDB.

```
exit
```

InfluxDB працює і налаштований для зберігання метрик з Geth.

## Підготовка Geth {#preparing-geth}

Після налаштування бази даних, нам потрібно увімкнути збір метрик в Geth. Зверніть увагу на `METRICS AND STATS OPTIONS` в `geth --help`. Там можна знайти декілька варіантів. У нашому випадку нам потрібно, щоб Geth передавав дані в InfluxDB.
Базове налаштування визначає кінцеву точку, за якою доступний InfluxDB, та дані для автентифікації в базі даних.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Ці прапори можна додати до команди запуску клієнта або зберегти у файлі конфігурації.

Ви можете перевірити, що Geth успішно передає дані, наприклад, переглянувши список метрик у базі даних. В оболонці InfluxDB:

```
use geth
show measurements
```

## Налаштування Grafana {#setting-up-grafana}

Наступний крок — встановлення Grafana, яка буде інтерпретувати дані графічно. Дотримуйтесь інструкцій зі встановлення для вашого середовища в документації Grafana. Переконайтеся, що ви встановили версію OSS, якщо не хочете іншу.
Приклад кроків встановлення для дистрибутивів Debian з використанням репозиторію:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Коли Grafana буде запущено, програма має бути доступна за адресою `localhost:3000`.
Відкрийте цю адресу у бажаному браузері, а потім увійдіть, використовуючи облікові дані за замовчуванням (користувач: `admin`, пароль: `admin`). Коли надійде запит, змініть пароль за замовчуванням та збережіть.

![](./grafana1.png)

Вас буде перенаправлено на головну сторінку Grafana. Спочатку налаштуйте вихідні дані. Натисніть значок конфігурації на панелі ліворуч і виберіть "Джерела даних".

![](./grafana2.png)

Джерел даних ще не створено; натисніть "Додати джерело даних", щоб його визначити.

![](./grafana3.png)

Для цього налаштування виберіть "InfluxDB" і продовжуйте.

![](./grafana4.png)

Налаштування джерела даних є досить простим, якщо ви запускаєте інструменти на тому ж комп'ютері. Вам потрібно вказати адресу InfluxDB та дані для доступу до бази даних. Дивіться зображення нижче.

![](./grafana5.png)

Якщо все заповнено правильно й InfluxDB доступний, натисніть "Зберегти та перевірити" і дочекайтеся спливаючого вікна з підтвердженням.

![](./grafana6.png)

Тепер Grafana налаштовано для читання даних з InfluxDB. Тепер вам потрібно створити інформаційну панель, яка буде інтерпретувати та відображати ці дані. Властивості інформаційних панелей закодовані у файлах JSON, які може створити будь-хто, і їх можна легко імпортувати. На панелі ліворуч натисніть "Створити та імпортувати".

![](./grafana7.png)

Для інформаційної панелі моніторингу Geth скопіюйте ID [цієї панелі](https://grafana.com/grafana/dashboards/13877/) і вставте його на "Сторінці імпорту" в Grafana. Після збереження інформаційна панель повинна мати такий вигляд:

![](./grafana8.png)

Ви можете змінювати свої інформаційні панелі. Кожну панель можна редагувати, переміщувати, видаляти або додавати. Ви можете змінювати свої конфігурації. Усе залежить від вас! Щоб дізнатися більше про те, як працюють інформаційні панелі, зверніться до [документації Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Вас також може зацікавити розділ [Сповіщення](https://grafana.com/docs/grafana/latest/alerting/). Це дає змогу налаштувати сповіщення, які спрацьовуватимуть, коли метрики досягають певних значень. Підтримуються різні канали зв'язку.
