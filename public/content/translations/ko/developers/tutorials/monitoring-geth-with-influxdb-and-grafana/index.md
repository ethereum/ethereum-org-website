---
title: "InfluxDB와 Grafana로 Geth 모니터링하기"
description: "InfluxDB와 Grafana를 사용하여 Geth 노드의 모니터링을 설정하고 성능을 추적하며 문제를 식별하세요."
author: "마리오 하벨"
tags:
  - "클라이언트"
  - "노드"
skill: intermediate
breadcrumb: "Geth 모니터링"
lang: ko
published: 2021-01-13
---

이 튜토리얼은 Geth 노드의 모니터링을 설정하여 성능을 더 잘 이해하고 잠재적인 문제를 식별하는 데 도움을 줍니다.

## 전제 조건 {#prerequisites}

- 이미 Geth 인스턴스를 실행 중이어야 합니다.
- 대부분의 단계와 예제는 Linux 환경을 위한 것이므로 기본적인 터미널 지식이 있으면 도움이 됩니다.
- Geth의 메트릭 제품군에 대한 이 비디오 개요를 확인해 보세요: [Péter Szilágyi의 이더리움 인프라 모니터링(Monitoring an Ethereum infrastructure)](https://www.youtube.com/watch?v=cOBab8IJMYI).

## 모니터링 스택 {#monitoring-stack}

이더리움 클라이언트는 시간순 데이터베이스 형태로 읽을 수 있는 많은 데이터를 수집합니다. 모니터링을 더 쉽게 하기 위해 이 데이터를 데이터 시각화 소프트웨어에 입력할 수 있습니다. 다음과 같은 여러 옵션을 사용할 수 있습니다:

- [Prometheus](https://prometheus.io/) (풀 모델)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (푸시 모델)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Prometheus를 선호하는 경우, Geth는 Prometheus 형식으로 메트릭을 노출할 수도 있습니다. `--metrics --metrics.addr 127.0.0.1`로 Geth를 시작하고 Prometheus가 `http://127.0.0.1:6060/debug/metrics/prometheus`를 가리키도록 하세요.

이 튜토리얼에서는 Geth 클라이언트가 InfluxDB로 데이터를 푸시하여 데이터베이스를 생성하고, Grafana를 사용하여 데이터의 그래프 시각화를 생성하도록 설정할 것입니다. 이 과정을 수동으로 수행하면 프로세스를 더 잘 이해하고, 변경하며, 다양한 환경에 배포하는 데 도움이 됩니다.

## InfluxDB 설정하기 {#setting-up-influxdb}

먼저 InfluxDB를 다운로드하고 설치해 보겠습니다. 이 튜토리얼에서는 Geth가 아래의 `--metrics.influxdb` 플래그로 지원하는 InfluxDB 1.x (OSS)를 사용합니다. 최신 InfluxDB 버전은 데이터베이스와 사용자 대신 조직, 버킷, 토큰을 사용하는 다른 설정을 사용합니다. Geth는 `--metrics.influxdbv2` 플래그로 InfluxDB 2.x를 지원하지만, 이 튜토리얼의 설정 단계는 1.x에만 적용됩니다.

사용 중인 환경에 맞는 [InfluxDB 1.x 설치 지침](https://docs.influxdata.com/influxdb/v1/introduction/install/)을 따르세요. 예를 들어, Debian이나 Ubuntu에서는 InfluxData 리포지토리에서 설치할 수 있습니다. 키를 신뢰하기 전에 설치 지침에서 현재 서명 키 지문을 확인하세요:

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

`influxdb` 패키지에는 `influx` 명령줄 클라이언트가 포함되어 있습니다.

InfluxDB를 성공적으로 설치한 후, 백그라운드에서 실행 중인지 확인하세요. 기본적으로 `localhost:8086`에서 접근할 수 있습니다.
`influx` 클라이언트를 사용하기 전에 관리자 권한을 가진 새 사용자를 생성해야 합니다. 이 사용자는 데이터베이스와 사용자를 생성하는 등 높은 수준의 관리를 담당하게 됩니다.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

이제 influx 클라이언트를 사용하여 이 사용자로 [InfluxDB 셸](https://docs.influxdata.com/influxdb/v1/tools/shell/)에 들어갈 수 있습니다.

```sh
influx -username 'username' -password 'password'
```

InfluxDB 셸에서 직접 통신하여 Geth 메트릭을 위한 데이터베이스와 사용자를 생성할 수 있습니다.

```sql
create database geth
create user geth with password '<geth-password>'
```

생성된 항목을 다음 명령어로 확인하세요:

```sql
show databases
show users
```

InfluxDB 셸을 종료합니다.

```
exit
```

InfluxDB가 실행 중이며 Geth의 메트릭을 저장하도록 구성되었습니다.

## Geth 준비하기 {#preparing-geth}

데이터베이스를 설정한 후, Geth에서 메트릭 수집을 활성화해야 합니다. `geth --help`의 `METRICS AND STATS OPTIONS`에 주의하세요. 여기에서 여러 옵션을 찾을 수 있으며, 이 경우 Geth가 InfluxDB로 데이터를 푸시하도록 하려고 합니다.
기본 설정은 InfluxDB에 접근할 수 있는 엔드포인트와 데이터베이스 인증을 지정합니다.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

`geth` 사용자를 생성할 때 설정한 것과 동일한 비밀번호를 사용하세요. 이러한 플래그는 클라이언트를 시작하는 명령어에 추가하거나 구성 파일에 저장할 수 있습니다.

예를 들어 데이터베이스의 메트릭을 나열하여 Geth가 데이터를 성공적으로 푸시하고 있는지 확인할 수 있습니다. InfluxDB 셸에서:

```sql
use geth
show measurements
```

## Grafana 설정하기 {#setting-up-grafana}

다음 단계는 데이터를 그래픽으로 해석할 Grafana를 설치하는 것입니다. Grafana 문서에서 [사용 중인 환경에 맞는 설치 과정](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)을 따르세요. 다른 것이 필요하지 않다면 OSS 버전을 설치해야 합니다.
Grafana 리포지토리를 사용하는 Debian 또는 Ubuntu의 설치 단계 예시:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Grafana가 실행되면 `localhost:3000`에서 접근할 수 있어야 합니다.
선호하는 브라우저를 사용하여 이 경로에 접속한 다음, 기본 자격 증명(사용자: `admin`, 비밀번호: `admin`)으로 로그인하세요. 메시지가 표시되면 기본 비밀번호를 변경하고 저장하세요.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 1)](./grafana1.png)

Grafana 홈 페이지로 리디렉션됩니다. 먼저 소스 데이터를 설정하세요. 메뉴를 열고 <strong>Connections > Data sources</strong>를 선택합니다. 이 튜토리얼의 스크린샷은 이전 버전의 Grafana에서 가져온 것이므로 화면이 조금 다르게 보일 수 있습니다.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 2)](./grafana2.png)

아직 생성된 데이터 소스가 없으므로 "Add data source"를 클릭하여 정의하세요.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 3)](./grafana3.png)

이 설정에서는 "InfluxDB"를 선택하고 계속 진행합니다.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 4)](./grafana4.png)

동일한 머신에서 도구를 실행하는 경우 데이터 소스 구성은 매우 간단합니다. InfluxDB 주소와 데이터베이스 접근을 위한 세부 정보를 설정해야 합니다. 아래 사진을 참조하세요.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 5)](./grafana5.png)

모든 것이 완료되고 InfluxDB에 접근할 수 있다면 "Save and test"를 클릭하고 확인 메시지가 팝업될 때까지 기다리세요.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 6)](./grafana6.png)

이제 Grafana가 InfluxDB에서 데이터를 읽도록 설정되었습니다. 이제 데이터를 해석하고 표시할 대시보드를 생성해야 합니다. 대시보드 속성은 누구나 생성하고 쉽게 가져올 수 있는 JSON 파일로 인코딩됩니다. 메뉴를 열고 <strong>Dashboards</strong>를 선택한 다음 <strong>New > Import</strong>를 클릭하세요.

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 7)](./grafana7.png)

Geth 모니터링 대시보드의 경우, [이 대시보드](https://grafana.com/grafana/dashboards/13877/)의 ID를 복사하여 Grafana의 "Import page"에 붙여넣으세요. 대시보드를 저장한 후에는 다음과 같이 보여야 합니다:

![Geth 모니터링을 위한 Grafana 대시보드 스크린샷 (패널 8)](./grafana8.png)

대시보드를 수정할 수 있습니다. 각 패널을 편집, 이동, 제거 또는 추가할 수 있습니다. 구성을 변경할 수 있습니다. 여러분의 선택에 달려 있습니다! 대시보드가 어떻게 작동하는지 자세히 알아보려면 [Grafana 문서](https://grafana.com/docs/grafana/latest/dashboards/)를 참조하세요.
[Alerting](https://grafana.com/docs/grafana/latest/alerting/)에도 관심이 있을 수 있습니다. 이를 통해 메트릭이 특정 값에 도달했을 때 알림을 설정할 수 있습니다. 다양한 통신 채널이 지원됩니다.
