---
title: "Мониторинг Geth с помощью InfluxDB и Grafana"
description: "Настройте мониторинг для вашего узла Geth с помощью InfluxDB и Grafana, чтобы отслеживать производительность и выявлять проблемы."
author: "Марио Хавел"
tags:
  - клиенты
  - узлы
skill: intermediate
breadcrumb: "Мониторинг Geth"
lang: ru
published: 2021-01-13
---

Это руководство поможет вам настроить мониторинг для вашего узла Geth, чтобы вы могли лучше понимать его производительность и выявлять потенциальные проблемы.

## Предварительные требования {#prerequisites}

- У вас уже должен быть запущен экземпляр Geth.
- Большинство шагов и примеров предназначены для среды Linux, поэтому базовые знания терминала будут полезны.
- Посмотрите этот видеообзор набора метрик Geth: [Мониторинг инфраструктуры Эфириума от Петера Силадьи (Péter Szilágyi)](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Стек мониторинга {#monitoring-stack}

Клиент Эфириума собирает множество данных, которые можно читать в виде хронологической базы данных. Чтобы упростить мониторинг, вы можете передавать их в программное обеспечение для визуализации данных. Доступно несколько вариантов:

- [Prometheus](https://prometheus.io/) (модель pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (модель push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Также существует [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) — вариант, предварительно настроенный с InfluxDB и Grafana.

В этом руководстве мы настроим ваш клиент Geth для отправки данных в InfluxDB для создания базы данных и в Grafana для создания графической визуализации данных. Выполнение этого вручную поможет вам лучше понять процесс, изменять его и развертывать в различных средах.

## Настройка InfluxDB {#setting-up-influxdb}

Сначала давайте скачаем и установим InfluxDB. Различные варианты загрузки можно найти на [странице релизов Influxdata](https://portal.influxdata.com/downloads/). Выберите тот, который подходит для вашей среды.
Вы также можете установить его из [репозитория](https://repos.influxdata.com/). Например, в дистрибутиве на базе Debian:

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

После успешной установки InfluxDB убедитесь, что он работает в фоновом режиме. По умолчанию он доступен по адресу `localhost:8086`.
Перед использованием клиента `influx` вам необходимо создать нового пользователя с правами администратора. Этот пользователь будет служить для управления на высоком уровне, создания баз данных и пользователей.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Теперь вы можете использовать клиент influx для входа в [оболочку InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) под этим пользователем.

```
influx -username 'username' -password 'password'
```

Напрямую взаимодействуя с InfluxDB в его оболочке, вы можете создать базу данных и пользователя для метрик Geth.

```
create database geth
create user geth with password choosepassword
```

Проверьте созданные записи с помощью:

```
show databases
show users
```

Выйдите из оболочки InfluxDB.

```
exit
```

InfluxDB запущен и настроен для хранения метрик от Geth.

## Подготовка Geth {#preparing-geth}

После настройки базы данных нам нужно включить сбор метрик в Geth. Обратите внимание на `METRICS AND STATS OPTIONS` в `geth --help`. Там можно найти множество опций, в данном случае мы хотим, чтобы Geth отправлял данные в InfluxDB.
Базовая настройка указывает конечную точку, где доступен InfluxDB, и аутентификацию для базы данных.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Эти флаги можно добавить к команде запуска клиента или сохранить в файле конфигурации.

Вы можете убедиться, что Geth успешно отправляет данные, например, просмотрев список метрик в базе данных. В оболочке InfluxDB:

```
use geth
show measurements
```

## Настройка Grafana {#setting-up-grafana}

Следующий шаг — установка Grafana, которая будет графически интерпретировать данные. Следуйте процессу установки для вашей среды в документации Grafana. Убедитесь, что устанавливаете версию OSS, если не хотите иного.
Пример шагов установки для дистрибутивов Debian с использованием репозитория:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Когда Grafana будет запущена, она должна быть доступна по адресу `localhost:3000`.
Используйте предпочитаемый браузер для доступа по этому пути, затем войдите с учетными данными по умолчанию (пользователь: `admin` и пароль: `admin`). При появлении запроса измените пароль по умолчанию и сохраните.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Вы будете перенаправлены на главную страницу Grafana. Сначала настройте исходные данные. Нажмите на значок конфигурации на левой панели и выберите «Data sources» (Источники данных).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Источники данных еще не созданы, нажмите «Add data source» (Добавить источник данных), чтобы определить его.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Для этой настройки выберите «InfluxDB» и продолжите.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Настройка источника данных довольно проста, если вы запускаете инструменты на одной машине. Вам нужно задать адрес InfluxDB и данные для доступа к базе данных. Обратитесь к изображению ниже.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Если все заполнено и InfluxDB доступен, нажмите «Save and test» (Сохранить и проверить) и дождитесь появления подтверждения.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Теперь Grafana настроена на чтение данных из InfluxDB. Теперь вам нужно создать панель управления (дашборд), которая будет интерпретировать и отображать их. Свойства панелей управления кодируются в файлах JSON, которые может создать любой желающий и легко импортировать. На левой панели нажмите «Create and Import» (Создать и импортировать).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Для панели мониторинга Geth скопируйте ID [этой панели управления](https://grafana.com/grafana/dashboards/13877/) и вставьте его на странице «Import» (Импорт) в Grafana. После сохранения панель управления должна выглядеть так:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Вы можете изменять свои панели управления. Каждую панель можно редактировать, перемещать, удалять или добавлять. Вы можете изменять свои конфигурации. Все зависит от вас! Чтобы узнать больше о том, как работают панели управления, обратитесь к [документации Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Вас также может заинтересовать [Оповещение (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). Это позволяет настроить уведомления о том, когда метрики достигают определенных значений. Поддерживаются различные каналы связи.