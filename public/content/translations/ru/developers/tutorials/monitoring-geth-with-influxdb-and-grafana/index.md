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
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Если вы предпочитаете Prometheus, Geth также может предоставлять свои метрики в формате Prometheus. Запустите Geth с `--metrics --metrics.addr 127.0.0.1` и направьте Prometheus на `http://127.0.0.1:6060/debug/metrics/prometheus`.

В этом руководстве мы настроим ваш клиент Geth для отправки данных в InfluxDB для создания базы данных и в Grafana для создания графической визуализации данных. Выполнение этого вручную поможет вам лучше понять процесс, изменять его и развертывать в различных средах.

## Настройка InfluxDB {#setting-up-influxdb}

Сначала давайте скачаем и установим InfluxDB. В этом руководстве используется InfluxDB 1.x (OSS), который Geth поддерживает с помощью флагов `--metrics.influxdb` ниже. В более новых версиях InfluxDB используется другая настройка с организациями, корзинами (buckets) и токенами вместо баз данных и пользователей. Geth поддерживает InfluxDB 2.x с помощью флагов `--metrics.influxdbv2`, но шаги настройки в этом руководстве применимы только к версии 1.x.

Следуйте [инструкциям по установке InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) для вашей среды. Например, в Debian или Ubuntu вы можете установить его из репозитория InfluxData. Перед тем как доверять ключу, проверьте инструкции по установке на наличие актуального отпечатка ключа подписи:

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

Пакет `influxdb` включает клиент командной строки `influx`.

После успешной установки InfluxDB убедитесь, что он работает в фоновом режиме. По умолчанию он доступен по адресу `localhost:8086`.
Перед использованием клиента `influx` вам необходимо создать нового пользователя с правами администратора. Этот пользователь будет служить для управления на высоком уровне, создания баз данных и пользователей.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Теперь вы можете использовать клиент influx для входа в [оболочку InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) с этим пользователем.

```sh
influx -username 'username' -password 'password'
```

Напрямую общаясь с InfluxDB в его оболочке, вы можете создать базу данных и пользователя для метрик Geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Проверьте созданные записи с помощью:

```sql
show databases
show users
```

Выйдите из оболочки InfluxDB.

```
exit
```

InfluxDB запущен и настроен для хранения метрик из Geth.

## Подготовка Geth {#preparing-geth}

После настройки базы данных нам нужно включить сбор метрик в Geth. Обратите внимание на `METRICS AND STATS OPTIONS` в `geth --help`. Там можно найти множество опций, в данном случае мы хотим, чтобы Geth отправлял данные в InfluxDB.
Базовая настройка указывает конечную точку, где доступен InfluxDB, и аутентификацию для базы данных.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Используйте тот же пароль, который вы установили при создании пользователя `geth`. Эти флаги можно добавить к команде запуска клиента или сохранить в файле конфигурации.

Вы можете убедиться, что Geth успешно отправляет данные, например, просмотрев метрики в базе данных. В оболочке InfluxDB:

```sql
use geth
show measurements
```

## Настройка Grafana {#setting-up-grafana}

Следующим шагом является установка Grafana, которая будет графически интерпретировать данные. Следуйте [процессу установки для вашей среды](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) в документации Grafana. Обязательно установите версию OSS, если вам не нужно что-то другое.
Пример шагов установки для Debian или Ubuntu с использованием репозитория Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Когда вы запустите Grafana, она должна быть доступна по адресу `localhost:3000`.
Используйте предпочитаемый браузер для доступа к этому пути, затем войдите с учетными данными по умолчанию (пользователь: `admin` и пароль: `admin`). При появлении запроса измените пароль по умолчанию и сохраните.

![Скриншот панели управления Grafana для мониторинга Geth (панель 1)](./grafana1.png)

Вы будете перенаправлены на главную страницу Grafana. Сначала настройте исходные данные. Откройте меню и выберите **Connections > Data sources**. Скриншоты в этом руководстве сделаны в более старой версии Grafana, поэтому ваши экраны могут немного отличаться.

![Скриншот панели управления Grafana для мониторинга Geth (панель 2)](./grafana2.png)

Пока нет созданных источников данных, нажмите «Add data source», чтобы определить его.

![Скриншот панели управления Grafana для мониторинга Geth (панель 3)](./grafana3.png)

Для этой настройки выберите «InfluxDB» и продолжите.

![Скриншот панели управления Grafana для мониторинга Geth (панель 4)](./grafana4.png)

Конфигурация источника данных довольно проста, если вы запускаете инструменты на одной машине. Вам нужно установить адрес InfluxDB и данные для доступа к базе данных. Обратитесь к картинке ниже.

![Скриншот панели управления Grafana для мониторинга Geth (панель 5)](./grafana5.png)

Если все заполнено и InfluxDB доступен, нажмите «Save and test» и дождитесь появления подтверждения.

![Скриншот панели управления Grafana для мониторинга Geth (панель 6)](./grafana6.png)

Теперь Grafana настроена на чтение данных из InfluxDB. Теперь вам нужно создать панель управления (dashboard), которая будет интерпретировать и отображать их. Свойства панелей управления кодируются в файлах JSON, которые может создать любой желающий и легко импортировать. Откройте меню и выберите **Dashboards**, затем нажмите **New > Import**.

![Скриншот панели управления Grafana для мониторинга Geth (панель 7)](./grafana7.png)

Для панели мониторинга Geth скопируйте ID [этой панели управления](https://grafana.com/grafana/dashboards/13877/) и вставьте его на странице «Import» в Grafana. После сохранения панель управления должна выглядеть так:

![Скриншот панели управления Grafana для мониторинга Geth (панель 8)](./grafana8.png)

Вы можете изменять свои панели управления. Каждую панель можно редактировать, перемещать, удалять или добавлять. Вы можете изменять свои конфигурации. Все зависит от вас! Чтобы узнать больше о том, как работают панели управления, обратитесь к [документации Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Вас также может заинтересовать [Оповещение (Alerting)](https://grafana.com/docs/grafana/latest/alerting/). Это позволяет настроить уведомления о том, когда метрики достигают определенных значений. Поддерживаются различные каналы связи.
