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
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Також існує [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) — варіант, попередньо налаштований з InfluxDB та Grafana.

У цьому посібнику ми налаштуємо ваш клієнт Geth для надсилання даних до InfluxDB, щоб створити базу даних, та до Grafana для створення графічної візуалізації даних. Виконання цього вручну допоможе вам краще зрозуміти процес, змінювати його та розгортати в різних середовищах.

## Налаштування InfluxDB {#setting-up-influxdb}

Спочатку завантажимо та встановимо InfluxDB. Різні варіанти завантаження можна знайти на [сторінці релізів Influxdata](https://portal.influxdata.com/downloads/). Виберіть той, який підходить для вашого середовища.
Ви також можете встановити його з [репозиторію](https://repos.influxdata.com/). Наприклад, у дистрибутивах на базі Debian:

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
Перед використанням клієнта `influx` вам потрібно створити нового користувача з правами адміністратора. Цей користувач слугуватиме для високорівневого управління, створення баз даних та користувачів.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Тепер ви можете використовувати клієнт influx для входу в [оболонку InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) під цим користувачем.

```
influx -username 'username' -password 'password'
```

Спілкуючись безпосередньо з InfluxDB у його оболонці, ви можете створити базу даних та користувача для метрик Geth.

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

InfluxDB запущено та налаштовано для зберігання метрик з Geth.

## Підготовка Geth {#preparing-geth}

Після налаштування бази даних нам потрібно увімкнути збір метрик у Geth. Зверніть увагу на `METRICS AND STATS OPTIONS` у `geth --help`. Там можна знайти кілька варіантів, у цьому випадку ми хочемо, щоб Geth надсилав дані до InfluxDB.
Базове налаштування визначає кінцеву точку, де доступний InfluxDB, та автентифікацію для бази даних.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Ці прапорці можна додати до команди запуску клієнта або зберегти у файлі конфігурації.

Ви можете перевірити, чи Geth успішно надсилає дані, наприклад, переглянувши список метрик у базі даних. В оболонці InfluxDB:

```
use geth
show measurements
```

## Налаштування Grafana {#setting-up-grafana}

Наступним кроком є встановлення Grafana, яка буде графічно інтерпретувати дані. Дотримуйтесь процесу встановлення для вашого середовища в документації Grafana. Переконайтеся, що встановлюєте версію OSS, якщо не бажаєте іншого.
Приклад кроків встановлення для дистрибутивів Debian з використанням репозиторію:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Коли Grafana буде запущена, вона має бути доступна за адресою `localhost:3000`.
Використовуйте ваш улюблений браузер для доступу до цього шляху, потім увійдіть за допомогою облікових даних за замовчуванням (користувач: `admin` та пароль: `admin`). Коли з'явиться запит, змініть пароль за замовчуванням та збережіть.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Вас буде перенаправлено на домашню сторінку Grafana. Спочатку налаштуйте джерело даних. Натисніть на значок конфігурації на лівій панелі та виберіть «Data sources» (Джерела даних).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Ще не створено жодного джерела даних, натисніть «Add data source» (Додати джерело даних), щоб визначити його.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Для цього налаштування виберіть «InfluxDB» та продовжуйте.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Конфігурація джерела даних досить проста, якщо ви запускаєте інструменти на одній машині. Вам потрібно вказати адресу InfluxDB та дані для доступу до бази даних. Зверніться до зображення нижче.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Якщо все заповнено і InfluxDB доступний, натисніть «Save and test» (Зберегти та перевірити) і дочекайтеся появи підтвердження.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Тепер Grafana налаштована на читання даних з InfluxDB. Далі вам потрібно створити інформаційну панель (дашборд), яка буде їх інтерпретувати та відображати. Властивості інформаційних панелей кодуються у файлах JSON, які може створити будь-хто і легко імпортувати. На лівій панелі натисніть «Create and Import» (Створити та імпортувати).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Для інформаційної панелі моніторингу Geth скопіюйте ID [цієї панелі](https://grafana.com/grafana/dashboards/13877/) та вставте його на сторінці «Import» (Імпорт) у Grafana. Після збереження інформаційна панель має виглядати так:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Ви можете змінювати свої інформаційні панелі. Кожну панель можна редагувати, переміщувати, видаляти або додавати. Ви можете змінювати свої конфігурації. Все залежить від вас! Щоб дізнатися більше про те, як працюють інформаційні панелі, зверніться до [документації Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Вас також може зацікавити [Сповіщення (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). Це дозволяє налаштувати сповіщення, коли метрики досягають певних значень. Підтримуються різні канали зв'язку.