---
title: "InfluxDB와 Grafana를 사용하여 Geth 모니터링하기"
description: "InfluxDB와 Grafana를 사용하여 Geth 노드에 대한 모니터링을 설정하여 성능을 추적하고 문제를 식별합니다."
author: "Mario Havel"
tags: [ "클라이언트", "노드" ]
skill: intermediate
lang: ko
published: 2021-01-13
---

이 튜토리얼은 Geth 노드의 성능을 더 잘 이해하고 잠재적인 문제를 식별할 수 있도록 모니터링을 설정하는 데 도움이 됩니다.

## 필수 구성 요소 {#prerequisites}

- Geth 인스턴스를 이미 실행 중이어야 합니다.
- 대부분의 단계와 예시는 Linux 환경을 위한 것이므로, 기본적인 터미널 지식이 도움이 될 것입니다.
- Geth의 메트릭 제품군에 대한 이 비디오 개요를 확인하세요: [Péter Szilágyi의 이더리움 인프라 모니터링](https://www.youtube.com/watch?v=cOBab8IJMYI).

## 모니터링 스택 {#monitoring-stack}

이더리움 클라이언트는 시간순 데이터베이스 형식으로 읽을 수 있는 많은 데이터를 수집합니다. 모니터링을 더 쉽게 하기 위해 이 데이터를 데이터 시각화 소프트웨어에 입력할 수 있습니다. 사용 가능한 여러 옵션이 있습니다:

- [Prometheus](https://prometheus.io/) (풀 모델)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (푸시 모델)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

InfluxDB 및 Grafana로 사전 구성된 옵션인 [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter)도 있습니다.

이 튜토리얼에서는 Geth 클라이언트가 데이터를 InfluxDB로 푸시하여 데이터베이스를 생성하고, Grafana가 데이터의 그래프 시각화를 생성하도록 설정할 것입니다. 수동으로 수행하면 프로세스를 더 잘 이해하고, 변경하며, 다른 환경에 배포하는 데 도움이 됩니다.

## InfluxDB 설정 {#setting-up-influxdb}

먼저, InfluxDB를 다운로드하고 설치해 보겠습니다. 다양한 다운로드 옵션은 [Influxdata 릴리스 페이지](https://portal.influxdata.com/downloads/)에서 찾을 수 있습니다. 사용자의 환경에 맞는 것을 선택하세요.
[리포지토리](https://repos.influxdata.com/)에서도 설치할 수 있습니다. 예를 들어 Debian 기반 배포판에서는 다음과 같습니다:

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

InfluxDB를 성공적으로 설치한 후, 백그라운드에서 실행되고 있는지 확인하세요. 기본적으로 `localhost:8086`에서 연결할 수 있습니다.
`influx` 클라이언트를 사용하기 전에 관리자 권한을 가진 새 사용자를 만들어야 합니다. 이 사용자는 상위 수준 관리, 데이터베이스 및 사용자 생성에 사용됩니다.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

이제 influx 클라이언트를 사용하여 이 사용자로 [InfluxDB 셸](https://docs.influxdata.com/influxdb/v1.8/tools/shell/)에 들어갈 수 있습니다.

```
influx -username 'username' -password 'password'
```

셸에서 InfluxDB와 직접 통신하여 Geth 메트릭을 위한 데이터베이스와 사용자를 생성할 수 있습니다.

```
create database geth
create user geth with password choosepassword
```

다음을 통해 생성된 항목을 확인합니다:

```
show databases
show users
```

InfluxDB 셸을 나갑니다.

```
exit
```

InfluxDB가 실행 중이며 Geth의 메트릭을 저장하도록 구성되었습니다.

## Geth 준비하기 {#preparing-geth}

데이터베이스를 설정한 후, Geth에서 메트릭 수집을 활성화해야 합니다. `geth --help`에서 `METRICS AND STATS OPTIONS`에 주의하세요. 여기서 여러 옵션을 찾을 수 있는데, 이 경우 Geth가 데이터를 InfluxDB로 푸시하도록 하려고 합니다.
기본 설정은 InfluxDB에 연결할 수 있는 엔드포인트와 데이터베이스에 대한 인증을 지정합니다.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

이 플래그들은 클라이언트를 시작하는 명령어에 추가하거나 구성 파일에 저장할 수 있습니다.

예를 들어, 데이터베이스의 메트릭을 나열하여 Geth가 데이터를 성공적으로 푸시하고 있는지 확인할 수 있습니다. InfluxDB 셸에서:

```
use geth
show measurements
```

## Grafana 설정 {#setting-up-grafana}

다음 단계는 데이터를 그래픽으로 해석할 Grafana를 설치하는 것입니다. Grafana 개발문서에서 사용자 환경에 맞는 설치 과정을 따르세요. 달리 원하지 않는 경우 OSS 버전을 설치해야 합니다.
리포지토리를 사용하는 Debian 배포판의 설치 예시는 다음과 같습니다:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana가 실행되면 `localhost:3000`에서 연결할 수 있습니다.
선호하는 브라우저를 사용하여 이 경로에 접속한 다음 기본 자격 증명(사용자: `admin`, 암호: `admin`)으로 로그인하세요. 메시지가 표시되면 기본 암호를 변경하고 저장하세요.

![](./grafana1.png)

Grafana 홈 페이지로 리디렉션됩니다. 먼저, 소스 데이터를 설정하세요. 왼쪽 막대에서 구성 아이콘을 클릭하고 "Data sources"를 선택하세요.

![](./grafana2.png)

아직 생성된 데이터 소스가 없습니다. "Add data source"를 클릭하여 하나를 정의하세요.

![](./grafana3.png)

이 설정에서는 "InfluxDB"를 선택하고 진행하세요.

![](./grafana4.png)

동일한 컴퓨터에서 도구를 실행하는 경우 데이터 소스 구성은 매우 간단합니다. InfluxDB 주소와 데이터베이스 액세스에 대한 세부 정보를 설정해야 합니다. 아래 그림을 참조하세요.

![](./grafana5.png)

모든 것이 완료되고 InfluxDB에 연결할 수 있으면 "Save and test"를 클릭하고 확인 메시지가 나타날 때까지 기다리세요.

![](./grafana6.png)

이제 Grafana가 InfluxDB에서 데이터를 읽도록 설정되었습니다. 이제 데이터를 해석하고 표시할 대시보드를 생성해야 합니다. 대시보드 속성은 누구나 생성하고 쉽게 가져올 수 있는 JSON 파일로 인코딩됩니다. 왼쪽 막대에서 "Create and Import"를 클릭하세요.

![](./grafana7.png)

Geth 모니터링 대시보드의 경우, [이 대시보드](https://grafana.com/grafana/dashboards/13877/)의 ID를 복사하여 Grafana의 "Import page"에 붙여넣으세요. 대시보드를 저장하면 다음과 같이 보일 것입니다:

![](./grafana8.png)

대시보드를 수정할 수 있습니다. 각 패널은 편집, 이동, 제거 또는 추가할 수 있습니다. 구성을 변경할 수 있습니다. 당신에게 달려 있습니다! 대시보드 작동 방식에 대해 더 자세히 알아보려면 [Grafana의 개발문서](https://grafana.com/docs/grafana/latest/dashboards/)를 참조하세요.
[알림](https://grafana.com/docs/grafana/latest/alerting/)에도 관심이 있을 수 있습니다. 이를 통해 메트릭이 특정 값에 도달했을 때 알림을 설정할 수 있습니다. 다양한 통신 채널이 지원됩니다.
