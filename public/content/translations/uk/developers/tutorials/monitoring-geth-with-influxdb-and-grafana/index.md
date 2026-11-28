---
title: "Моніторинг Geth за допомогою InfluxDB та Grafana"
description: "Налаштуйте моніторинг для вашого вузла Geth за допомогою InfluxDB та Grafana, щоб відстежувати продуктивність та виявляти проблеми."
author: "Маріо Гавел"
tags:
  - клієнти
  - вузли
skill: intermediate
breadcrumb: "Моніторинг Geth"
lang: uk
published: 2021-01-13
---

Цей посібник допоможе вам налаштувати моніторинг для вашого вузла Geth, щоб ви могли краще розуміти його продуктивність та виявляти потенційні проблеми.

## Передумови {#prerequisites}

- У вас вже має бути запущений екземпляр Geth.
- Більшість кроків та прикладів призначені для середовища Linux, тому базові знання термінала будуть корисними.
- Перегляньте цей відеоогляд набору метрик Geth: [Моніторинг інфраструктури Етеріуму від Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Стек моніторингу {#monitoring-stack}

Клієнт Етеріуму збирає багато даних, які можна читати у вигляді хронологічної бази даних. Щоб полегшити моніторинг, ви можете передавати їх у програмне забезпечення для візуалізації даних. Доступно кілька варіантів:

- [Prometheus](https://prometheus.io/) (модель pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (модель push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Якщо ви віддаєте перевагу Prometheus, Geth також може надавати свої метрики у форматі Prometheus. Запустіть Geth з `--metrics --metrics.addr 127.0.0.1` та спрямуйте Prometheus на `http://127.0.0.1:6060/debug/metrics/prometheus`.

У цьому посібнику ми налаштуємо ваш клієнт Geth для надсилання даних до InfluxDB, щоб створити базу даних, та до Grafana для створення графічної візуалізації даних. Виконання цього вручну допоможе вам краще зрозуміти процес, змінювати його та розгортати в різних середовищах.

## Налаштування InfluxDB {#setting-up-influxdb}

Спочатку завантажимо та встановимо InfluxDB. У цьому посібнику використовується InfluxDB 1.x (OSS), який Geth підтримує за допомогою прапорців `--metrics.influxdb`, наведених нижче. Новіші версії InfluxDB використовують інше налаштування з організаціями, бакетами та токенами замість баз даних і користувачів. Geth підтримує InfluxDB 2.x за допомогою прапорців `--metrics.influxdbv2`, але кроки налаштування в цьому посібнику стосуються лише версії 1.x.

Дотримуйтесь [інструкцій зі встановлення InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) для вашого середовища. Наприклад, на Debian або Ubuntu ви можете встановити його з репозиторію InfluxData. Перевірте інструкції зі встановлення щодо поточного відбитка ключа підписання, перш ніж довіряти ключу:

```sh
curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
sudo mkdir -p /etc/apt/keyrings
gpg --dearmor < influxdata-archive.key | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdata.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

Пакет `influxdb` містить клієнт командного рядка `influx`.

Після успішного встановлення InfluxDB переконайтеся, що він працює у фоновому режимі. За замовчуванням він доступний за адресою `localhost:8086`.
Перед використанням клієнта `influx` вам потрібно створити нового користувача з правами адміністратора. Цей користувач слугуватиме для високорівневого керування, створення баз даних та користувачів.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Тепер ви можете використовувати клієнт influx для входу в [оболонку InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) з цим користувачем.

```sh
influx -username 'username' -password 'password'
```

Безпосередньо взаємодіючи з InfluxDB у його оболонці, ви можете створити базу даних та користувача для метрик Geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Перевірте створені записи за допомогою:

```sql
show databases
show users
```

Вийдіть з оболонки InfluxDB.

```
exit
```

InfluxDB запущено та налаштовано для зберігання метрик з Geth.

## Підготовка Geth {#preparing-geth}

Після налаштування бази даних нам потрібно ввімкнути збір метрик у Geth. Зверніть увагу на `METRICS AND STATS OPTIONS` у `geth --help`. Там можна знайти кілька варіантів, у цьому випадку ми хочемо, щоб Geth надсилав дані до InfluxDB.
Базове налаштування визначає кінцеву точку, де доступний InfluxDB, та автентифікацію для бази даних.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Використовуйте той самий пароль, який ви встановили під час створення користувача `geth`. Ці прапорці можна додати до команди запуску клієнта або зберегти у файлі конфігурації.

Ви можете перевірити, чи Geth успішно надсилає дані, наприклад, переглянувши список метрик у базі даних. В оболонці InfluxDB:

```sql
use geth
show measurements
```

## Налаштування Grafana {#setting-up-grafana}

Наступним кроком є встановлення Grafana, яка буде графічно інтерпретувати дані. Дотримуйтесь [процесу встановлення для вашого середовища](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) у документації Grafana. Переконайтеся, що встановлюєте версію OSS, якщо вам не потрібно щось інше.
Приклад кроків встановлення для Debian або Ubuntu з використанням репозиторію Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Коли Grafana буде запущено, вона має бути доступна за адресою `localhost:3000`.
Використовуйте ваш улюблений браузер для доступу до цього шляху, потім увійдіть за допомогою облікових даних за замовчуванням (користувач: `admin` та пароль: `admin`). Коли з'явиться запит, змініть пароль за замовчуванням і збережіть.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 1)](./grafana1.png)

Вас буде переспрямовано на домашню сторінку Grafana. Спочатку налаштуйте вихідні дані. Відкрийте меню та виберіть **Connections > Data sources**. Знімки екрана в цьому посібнику зроблені зі старішої версії Grafana, тому ваші екрани можуть виглядати трохи інакше.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 2)](./grafana2.png)

Ще не створено жодного джерела даних, натисніть «Add data source», щоб визначити його.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 3)](./grafana3.png)

Для цього налаштування виберіть «InfluxDB» і продовжуйте.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 4)](./grafana4.png)

Конфігурація джерела даних є досить простою, якщо ви запускаєте інструменти на одній машині. Вам потрібно вказати адресу InfluxDB та дані для доступу до бази даних. Зверніться до зображення нижче.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 5)](./grafana5.png)

Якщо все виконано і InfluxDB доступний, натисніть «Save and test» і зачекайте на появу підтвердження.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 6)](./grafana6.png)

Тепер Grafana налаштована на читання даних з InfluxDB. Тепер вам потрібно створити панель інструментів, яка буде інтерпретувати та відображати їх. Властивості панелей інструментів кодуються у файлах JSON, які може створити будь-хто і легко імпортувати. Відкрийте меню та виберіть **Dashboards**, потім натисніть **New > Import**.

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 7)](./grafana7.png)

Для панелі інструментів моніторингу Geth скопіюйте ID [цієї панелі інструментів](https://grafana.com/grafana/dashboards/13877/) і вставте його на сторінці «Import» у Grafana. Після збереження панель інструментів має виглядати так:

![Знімок екрана панелі інструментів Grafana для моніторингу Geth (панель 8)](./grafana8.png)

Ви можете змінювати свої панелі інструментів. Кожну панель можна редагувати, переміщувати, видаляти або додавати. Ви можете змінювати свої конфігурації. Все залежить від вас! Щоб дізнатися більше про те, як працюють панелі інструментів, зверніться до [документації Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Вас також може зацікавити [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Це дозволяє налаштувати сповіщення, коли метрики досягають певних значень. Підтримуються різні канали зв'язку.
