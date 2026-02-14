---
title: "Мониторинг Geth с помощью InfluxDB и Grafana"
description: "Настройте мониторинг для своего узла Geth с помощью InfluxDB и Grafana, чтобы отслеживать производительность и выявлять проблемы."
author: "Mario Havel"
tags: [ "клиенты", "узлы" ]
skill: intermediate
lang: ru
published: 2021-01-13
---

Это руководство поможет вам настроить мониторинг для своего узла Geth, чтобы вы могли лучше понимать его производительность и выявлять потенциальные проблемы.

## Предварительные условия {#prerequisites}

- У вас уже должен быть запущен экземпляр Geth.
- Большинство шагов и примеров предназначены для среды Linux, поэтому будут полезны базовые знания о работе с терминалом.
- Посмотрите этот видеообзор набора метрик Geth: [Мониторинг инфраструктуры Ethereum от Петера Силадьи](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Стек мониторинга {#monitoring-stack}

Клиент Ethereum собирает множество данных, которые можно прочитать в виде хронологической базы данных. Чтобы упростить мониторинг, вы можете передать эти данные в программное обеспечение для визуализации. Доступно несколько вариантов:

- [Prometheus](https://prometheus.io/) (модель извлечения)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (модель передачи)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Также есть [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter) — вариант, предварительно настроенный для InfluxDB и Grafana.

В этом руководстве мы настроим ваш клиент Geth для передачи данных в InfluxDB, чтобы создать базу данных, и Grafana для создания графической визуализации данных. Выполнение этой операции вручную поможет вам лучше понять процесс, изменить его и развернуть в различных средах.

## Настройка InfluxDB {#setting-up-influxdb}

Сначала скачаем и установим InfluxDB. Различные варианты загрузки можно найти на [странице релизов Influxdata](https://portal.influxdata.com/downloads/). Выберите тот, который подходит для вашей среды.
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
Перед использованием клиента `influx` вы должны создать нового пользователя с правами администратора. Этот пользователь будет использоваться для управления высокого уровня, создания баз данных и пользователей.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Теперь вы можете использовать клиент influx для входа в [оболочку InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) с этим пользователем.

```
influx -username 'username' -password 'password'
```

Взаимодействуя с InfluxDB напрямую в его оболочке, вы можете создать базу данных и пользователя для метрик geth.

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

InfluxDB запущен и настроен для хранения метрик из Geth.

## Подготовка Geth {#preparing-geth}

После настройки базы данных необходимо включить сбор метрик в Geth. Обратите внимание на `METRICS AND STATS OPTIONS` в `geth --help`. Там можно найти несколько опций, в данном случае мы хотим, чтобы Geth передавал данные в InfluxDB.
Базовая настройка указывает конечную точку, по которой доступен InfluxDB, и аутентификацию для базы данных.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Эти флаги можно добавить к команде, запускающей клиент, или сохранить в файле конфигурации.

Вы можете убедиться, что Geth успешно передает данные, например, выведя список метрик в базе данных. В оболочке InfluxDB:

```
use geth
show measurements
```

## Настройка Grafana {#setting-up-grafana}

Следующий шаг — установка Grafana, которая будет интерпретировать данные графически. Следуйте процессу установки для вашей среды в документации Grafana. Убедитесь, что вы устанавливаете версию OSS, если не хотите иного.
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
Используйте предпочитаемый браузер для доступа к этому пути, затем войдите в систему с учетными данными по умолчанию (пользователь: `admin` и пароль: `admin`). При появлении запроса измените пароль по умолчанию и сохраните.

![](./grafana1.png)

Вы будете перенаправлены на домашнюю страницу Grafana. Сначала настройте источник данных. Нажмите на значок конфигурации на левой панели и выберите "Источники данных".

![](./grafana2.png)

Источники данных еще не созданы, нажмите "Добавить источник данных", чтобы определить один.

![](./grafana3.png)

Для этой настройки выберите "InfluxDB" и продолжайте.

![](./grafana4.png)

Конфигурация источника данных довольно проста, если вы запускаете инструменты на одной и той же машине. Вам нужно указать адрес InfluxDB и данные для доступа к базе данных. Обратитесь к изображению ниже.

![](./grafana5.png)

Если все заполнено и InfluxDB доступен, нажмите "Сохранить и протестировать" и дождитесь появления подтверждения.

![](./grafana6.png)

Теперь Grafana настроена на чтение данных из InfluxDB. Теперь вам нужно создать панель мониторинга, которая будет интерпретировать и отображать данные. Свойства панелей мониторинга кодируются в JSON-файлах, которые могут быть созданы кем угодно и легко импортированы. На левой панели нажмите "Создать и импортировать".

![](./grafana7.png)

Для панели мониторинга Geth скопируйте ID [этой панели мониторинга](https://grafana.com/grafana/dashboards/13877/) и вставьте его на странице "Импорт" в Grafana. После сохранения панели мониторинга она должна выглядеть так:

![](./grafana8.png)

Вы можете изменять свои панели мониторинга. Каждую панель можно редактировать, перемещать, удалять или добавлять. Вы можете изменять свои конфигурации. Все зависит от вас! Чтобы узнать больше о том, как работают панели мониторинга, обратитесь к [документации Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Вас также могут заинтересовать [Оповещения](https://grafana.com/docs/grafana/latest/alerting/). Это позволяет настроить уведомления на случаи, когда метрики достигают определенных значений. Поддерживаются различные каналы связи.
