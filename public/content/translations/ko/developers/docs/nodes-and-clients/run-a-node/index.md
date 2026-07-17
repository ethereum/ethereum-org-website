---
title: "자체 이더리움 노드 구축하기"
description: "이더리움 클라이언트의 자체 인스턴스를 실행하는 방법에 대한 일반적인 소개입니다."
lang: ko
sidebarDepth: 2
---

자체 노드를 실행하면 다양한 이점을 얻을 수 있고, 새로운 가능성이 열리며, 생태계를 지원하는 데 도움이 됩니다. 이 페이지는 자체 노드를 구축하고 [이더리움](/) 트랜잭션을 검증하는 데 참여하는 과정을 안내합니다.

[머지](/roadmap/merge) 이후 이더리움 노드를 실행하려면 **실행 계층(EL)** 클라이언트와 **합의 레이어(CL)** 클라이언트라는 두 가지 클라이언트가 필요합니다. 이 페이지에서는 이더리움 노드를 실행하기 위해 이 두 클라이언트를 설치, 구성 및 연결하는 방법을 보여줍니다.

## 전제 조건 {#prerequisites}

이더리움 노드가 무엇인지, 왜 클라이언트를 실행해야 하는지 이해해야 합니다. 이는 [노드 및 클라이언트](/developers/docs/nodes-and-clients/)에서 다룹니다.

노드 실행이라는 주제가 처음이거나 덜 기술적인 방법을 찾고 있다면, 먼저 [이더리움 노드 실행하기](/run-a-node)에 대한 사용자 친화적인 소개를 확인하는 것을 권장합니다.

## 접근 방식 선택 {#choosing-approach}

노드 구축의 첫 번째 단계는 접근 방식을 선택하는 것입니다. 요구 사항과 다양한 가능성을 바탕으로 클라이언트 구현(실행 클라이언트 및 합의 클라이언트 모두), 환경(하드웨어, 시스템) 및 클라이언트 설정 매개변수를 선택해야 합니다.

이 페이지는 이러한 결정을 내리는 과정을 안내하고 이더리움 인스턴스를 실행하는 가장 적합한 방법을 찾도록 도와줍니다.

클라이언트 구현을 선택하려면 사용 가능한 모든 메인넷 준비 완료 [실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients), [합의 클라이언트](/developers/docs/nodes-and-clients/#consensus-clients)를 확인하고 [클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity)에 대해 알아보세요.

클라이언트의 [요구 사항](#requirements)을 고려하여 자체 [하드웨어에서 실행할지 아니면 클라우드에서 실행할지](#local-vs-cloud) 결정하세요.

환경을 준비한 후, [초보자 친화적인 인터페이스](#automatized-setup)를 사용하거나 고급 옵션이 있는 터미널을 사용하여 [수동으로](#manual-setup) 선택한 클라이언트를 설치하세요.

노드가 실행되고 동기화되면 [사용할](#using-the-node) 준비가 된 것이지만, [유지보수](#operating-the-node)에 주의를 기울여야 합니다.

![Client setup](./diagram.png)

### 환경 및 하드웨어 {#environment-and-hardware}

#### 로컬 또는 클라우드 {#local-vs-cloud}

이더리움 클라이언트는 소비자용 컴퓨터에서 실행할 수 있으며 채굴기와 같은 특별한 하드웨어가 필요하지 않습니다. 따라서 필요에 따라 노드를 배포할 수 있는 다양한 옵션이 있습니다.
간단히 말해, 로컬 물리적 머신과 클라우드 서버 모두에서 노드를 실행하는 것에 대해 생각해 보겠습니다.

- 클라우드
  - 제공업체는 높은 서버 가동 시간과 고정 퍼블릭 IP 주소를 제공합니다.
  - 전용 또는 가상 서버를 얻는 것이 직접 구축하는 것보다 더 편할 수 있습니다.
  - 단점은 제3자인 서버 제공업체를 신뢰해야 한다는 것입니다.
  - 풀 노드에 필요한 스토리지 크기 때문에 임대 서버의 가격이 높아질 수 있습니다.
- 자체 하드웨어
  - 더 무신뢰적이고 주권적인 접근 방식입니다.
  - 일회성 투자입니다.
  - 사전 구성된 머신을 구매할 수 있는 옵션이 있습니다.
  - 머신과 네트워킹을 물리적으로 준비, 유지보수 및 잠재적으로 문제 해결을 해야 합니다.

두 옵션 모두 위에서 요약한 바와 같이 서로 다른 장점이 있습니다. 클라우드 솔루션을 찾고 있다면, 많은 전통적인 클라우드 컴퓨팅 제공업체 외에도 노드 배포에 중점을 둔 서비스도 있습니다. 호스팅된 노드에 대한 더 많은 옵션은 [서비스형 노드(nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/)를 확인하세요.

#### 하드웨어 {#hardware}

그러나 검열 저항적이고 탈중앙화된 네트워크는 클라우드 제공업체에 의존해서는 안 됩니다. 대신 자체 로컬 하드웨어에서 노드를 실행하는 것이 생태계에 더 건강합니다. [추정치](https://www.ethernodes.org/networkType/cl/Hosting)에 따르면 많은 노드가 클라우드에서 실행되고 있으며, 이는 단일 장애점이 될 수 있습니다.

이더리움 클라이언트는 컴퓨터, 노트북, 서버 또는 단일 보드 컴퓨터에서도 실행할 수 있습니다. 개인용 컴퓨터에서 클라이언트를 실행하는 것도 가능하지만, 노드 전용 머신을 사용하면 기본 컴퓨터에 미치는 영향을 최소화하면서 성능과 보안을 크게 향상시킬 수 있습니다.

자체 하드웨어를 사용하는 것은 매우 쉬울 수 있습니다. 더 기술적인 사람들을 위한 고급 설정뿐만 아니라 많은 간단한 옵션이 있습니다. 그럼 머신에서 이더리움 클라이언트를 실행하기 위한 요구 사항과 방법을 살펴보겠습니다.

#### 요구 사항 {#requirements}

하드웨어 요구 사항은 클라이언트마다 다르지만, 노드는 동기화 상태만 유지하면 되므로 일반적으로 그리 높지 않습니다. 훨씬 더 많은 컴퓨팅 파워가 필요한 채굴과 혼동하지 마세요. 하지만 더 강력한 하드웨어를 사용하면 동기화 시간과 성능이 향상됩니다.

클라이언트를 설치하기 전에 컴퓨터에 클라이언트를 실행할 충분한 리소스가 있는지 확인하세요. 아래에서 최소 및 권장 요구 사항을 확인할 수 있습니다.

하드웨어의 병목 현상은 주로 디스크 공간입니다. 이더리움 블록체인을 동기화하는 것은 입출력 집약적이며 많은 공간이 필요합니다. 동기화 후에도 수백 GB의 여유 공간이 있는 <strong>솔리드 스테이트 드라이브(SSD)</strong>를 사용하는 것이 가장 좋습니다.

데이터베이스의 크기와 초기 동기화 속도는 선택한 클라이언트, 구성 및 [동기화 전략](/developers/docs/nodes-and-clients/#sync-modes)에 따라 다릅니다.

또한 인터넷 연결이 [대역폭 제한](https://wikipedia.org/wiki/Data_cap)에 걸리지 않는지 확인하세요. 초기 동기화 및 네트워크로 브로드캐스트되는 데이터가 제한을 초과할 수 있으므로 종량제가 아닌 연결을 사용하는 것이 좋습니다.

##### 운영 체제

모든 클라이언트는 주요 운영 체제인 Linux, macOS, Windows를 지원합니다. 즉, 자신에게 가장 적합한 운영 체제(OS)가 설치된 일반 데스크톱이나 서버 머신에서 노드를 실행할 수 있습니다. 잠재적인 문제와 보안 취약점을 피하기 위해 OS를 최신 상태로 유지하세요.

##### 최소 요구 사항

- 2개 이상의 코어가 있는 CPU
- 8GB RAM
- 2TB SSD
- 10+ MBit/s 대역폭

##### 권장 사양

- 4개 이상의 코어가 있는 빠른 CPU
- 16GB 이상의 RAM
- 2TB 이상의 빠른 SSD
- 25+ MBit/s 대역폭

선택한 동기화 모드와 클라이언트는 공간 요구 사항에 영향을 미치지만, 아래에 각 클라이언트에 필요한 디스크 공간을 추정해 두었습니다.

| 클라이언트 | 디스크 크기 (스냅 동기화) | 디스크 크기 (풀 아카이브) |
| ---------- | --------------------- | ------------------------ |
| 베수 | 800GB+                | 12TB+                    |
| 에리곤 | 해당 없음             | 2.5TB+                   |
| Geth       | 500GB+                | 12TB+                    |
| 네더마인드 | 500GB+                | 12TB+                    |
| 레스 | 해당 없음             | 2.2TB+                   |

- 참고: 에리곤과 레스는 스냅 동기화를 제공하지 않지만, 전체 프루닝(Full Pruning)이 가능합니다(에리곤의 경우 약 2TB, 레스의 경우 약 1.2TB).

합의 클라이언트의 경우, 공간 요구 사항은 클라이언트 구현 및 활성화된 기능(예: 검증자 슬래셔)에 따라 다르지만 일반적으로 비콘 데이터에 200GB가 추가로 필요하다고 예상해야 합니다. 검증자 수가 많아지면 대역폭 부하도 커집니다. [이 분석에서 합의 클라이언트 요구 사항에 대한 세부 정보](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc)를 확인할 수 있습니다.

#### 플러그 앤 플레이 솔루션 {#plug-and-play}

자체 하드웨어로 노드를 실행하는 가장 쉬운 옵션은 플러그 앤 플레이 박스를 사용하는 것입니다. 공급업체의 사전 구성된 머신은 주문, 연결, 실행이라는 가장 간단한 경험을 제공합니다. 모든 것이 사전 구성되어 있으며 소프트웨어를 모니터링하고 제어하기 위한 직관적인 가이드와 대시보드를 통해 자동으로 실행됩니다.

- [DAppNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### 단일 보드 컴퓨터의 이더리움 {#ethereum-on-a-single-board-computer}

이더리움 노드를 실행하는 쉽고 저렴한 방법은 Raspberry Pi와 같은 ARM 아키텍처를 사용하는 단일 보드 컴퓨터를 사용하는 것입니다. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)은 Raspberry Pi 및 기타 ARM 보드를 위한 여러 실행 및 합의 클라이언트의 실행하기 쉬운 이미지를 제공합니다.

이와 같이 작고 저렴하며 효율적인 장치는 집에서 노드를 실행하는 데 이상적이지만 성능이 제한적이라는 점을 명심하세요.

## 노드 구축하기 {#spinning-up-node}

실제 클라이언트 설정은 자동화된 런처를 사용하거나 클라이언트 소프트웨어를 직접 설정하여 수동으로 수행할 수 있습니다.

초보 사용자의 경우 설치 과정을 안내하고 클라이언트 설정 프로세스를 자동화하는 소프트웨어인 런처를 사용하는 것이 좋습니다. 그러나 터미널 사용 경험이 있다면 수동 설정 단계를 쉽게 따라 할 수 있을 것입니다.

### 안내 설정 {#automatized-setup}

여러 사용자 친화적인 프로젝트가 클라이언트 설정 경험을 개선하는 것을 목표로 합니다. 이러한 런처는 자동 클라이언트 설치 및 구성을 제공하며, 일부는 클라이언트의 안내 설정 및 모니터링을 위한 그래픽 인터페이스를 제공하기도 합니다.

다음은 몇 번의 클릭만으로 클라이언트를 설치하고 제어하는 데 도움이 되는 몇 가지 프로젝트입니다.

- [DAppNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DAppNode는 공급업체의 머신과 함께만 제공되는 것이 아닙니다. 소프트웨어, 실제 노드 런처 및 많은 기능을 갖춘 제어 센터를 임의의 하드웨어에서 사용할 수 있습니다.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - 풀 노드를 설정하는 가장 빠르고 쉬운 방법입니다. 한 줄 설정 도구 및 노드 관리 TUI입니다. 무료이며 오픈 소스입니다. 솔로 스테이커를 위한 이더리움 공공재입니다. ARM64 및 AMD64를 지원합니다.
- [eth-docker](https://eth-docker.net/) - 쉽고 안전한 스테이킹에 중점을 둔 Docker를 사용한 자동 설정으로, 기본적인 터미널 및 Docker 지식이 필요하며 약간 더 고급 사용자에게 권장됩니다.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - GUI 설정 가이드, 제어 센터 및 기타 여러 기능을 갖춘 SSH 연결을 통해 원격 서버에 클라이언트를 설치하기 위한 런처입니다.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - CLI 마법사를 사용하여 Docker 구성을 자동으로 생성하는 노드 설정 도구입니다. 네더마인드에서 Go로 작성했습니다.
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) - Kubernetes에 실행 및 합의 클라이언트를 배포하기 위한 웹 UI 및 CLI입니다. 스냅샷 부트스트랩 및 내장 모니터링이 포함되어 있습니다. 무료이며 Chainstack 계정이 필요하지 않습니다. Chainstack에서 구축했습니다.

### 수동 클라이언트 설정 {#manual-setup}

다른 옵션은 클라이언트 소프트웨어를 수동으로 다운로드, 검증 및 구성하는 것입니다. 일부 클라이언트가 그래픽 인터페이스를 제공하더라도 수동 설정에는 여전히 터미널에 대한 기본 기술이 필요하지만 훨씬 더 많은 다용성을 제공합니다.

앞서 설명했듯이 자체 이더리움 노드를 설정하려면 합의 및 실행 클라이언트 쌍을 실행해야 합니다. 일부 클라이언트에는 다른 종류의 경량 클라이언트가 포함되어 있어 다른 소프트웨어 없이 동기화할 수 있습니다. 그러나 완전한 무신뢰 검증을 위해서는 두 구현이 모두 필요합니다.

#### 클라이언트 소프트웨어 구하기 {#getting-the-client}

먼저 선호하는 [실행 클라이언트](/developers/docs/nodes-and-clients/#execution-clients) 및 [합의 클라이언트](/developers/docs/nodes-and-clients/#consensus-clients) 소프트웨어를 구해야 합니다.

운영 체제 및 아키텍처에 맞는 실행 가능한 애플리케이션이나 설치 패키지를 간단히 다운로드할 수 있습니다. 다운로드한 패키지의 서명과 체크섬을 항상 확인하세요. 일부 클라이언트는 더 쉬운 설치 및 업데이트를 위해 리포지토리나 Docker 이미지를 제공하기도 합니다. 모든 클라이언트는 오픈 소스이므로 소스에서 빌드할 수도 있습니다. 이는 더 고급 방법이지만 경우에 따라 필요할 수 있습니다.

각 클라이언트 설치 지침은 위의 클라이언트 목록에 링크된 문서에 제공되어 있습니다.

다음은 사전 빌드된 바이너리나 설치 지침을 찾을 수 있는 클라이언트의 릴리스 페이지입니다.

##### 실행 클라이언트

- [베수](https://github.com/hyperledger/besu/releases)
- [에리곤](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [네더마인드](https://downloads.nethermind.io/)
- [레스](https://reth.rs/installation/installation.html)

클라이언트 다양성이 [실행 계층의 문제](/developers/docs/nodes-and-clients/client-diversity/#execution-layer)라는 점도 주목할 가치가 있습니다. 독자들은 소수 실행 클라이언트를 실행하는 것을 고려하는 것이 좋습니다.

##### 합의 클라이언트

- [라이트하우스](https://github.com/sigp/lighthouse/releases/latest)
- [로드스타](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (사전 빌드된 바이너리를 제공하지 않으며 Docker 이미지 또는 소스에서 빌드해야 함)
- [님버스](https://github.com/status-im/nimbus-eth2/releases/latest)
- [프리즘](https://github.com/prysmaticlabs/prysm/releases/latest)
- [테쿠](https://github.com/ConsenSys/teku/releases)

[클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity/)은 검증자를 실행하는 합의 노드에 매우 중요합니다. 대다수의 검증자가 단일 클라이언트 구현을 실행하는 경우 네트워크 보안이 위험해집니다. 따라서 소수 클라이언트를 선택하는 것을 고려하는 것이 좋습니다.

[최신 네트워크 클라이언트 사용량 보기](https://clientdiversity.org/) 및 [클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity)에 대해 자세히 알아보세요.

##### 소프트웨어 검증

인터넷에서 소프트웨어를 다운로드할 때는 무결성을 확인하는 것이 좋습니다. 이 단계는 선택 사항이지만 특히 이더리움 클라이언트와 같은 중요한 인프라 요소의 경우 잠재적인 공격 벡터를 인식하고 이를 피하는 것이 중요합니다. 사전 빌드된 바이너리를 다운로드한 경우 이를 신뢰해야 하며 공격자가 실행 파일을 악성 파일로 교체할 수 있는 위험을 감수해야 합니다.

개발자는 릴리스된 바이너리에 PGP 키로 서명하므로 개발자가 만든 소프트웨어를 정확히 실행하고 있는지 암호화 방식으로 확인할 수 있습니다. 클라이언트 릴리스 페이지나 문서에서 찾을 수 있는 개발자가 사용하는 공개 키만 얻으면 됩니다. 클라이언트 릴리스와 해당 서명을 다운로드한 후 [GnuPG](https://gnupg.org/download/index.html)와 같은 PGP 구현을 사용하여 쉽게 확인할 수 있습니다. [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) 또는 [Windows/macOS](https://freedom.press/training/verifying-open-source-software/)에서 `gpg`를 사용하여 오픈 소스 소프트웨어를 확인하는 튜토리얼을 확인하세요.

또 다른 확인 형태는 다운로드한 소프트웨어의 고유한 암호화 지문인 해시가 개발자가 제공한 해시와 일치하는지 확인하는 것입니다. 이는 PGP를 사용하는 것보다 훨씬 쉬우며 일부 클라이언트는 이 옵션만 제공합니다. 다운로드한 소프트웨어에서 해시 함수를 실행하고 릴리스 페이지의 해시 함수와 비교하기만 하면 됩니다. 예를 들면 다음과 같습니다.

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### 클라이언트 설정 {#client-setup}

클라이언트 소프트웨어를 설치, 다운로드 또는 컴파일한 후 실행할 준비가 된 것입니다. 이는 적절한 구성으로 실행해야 함을 의미할 뿐입니다. 클라이언트는 다양한 기능을 활성화할 수 있는 풍부한 구성 옵션을 제공합니다.

클라이언트 성능과 데이터 사용량에 큰 영향을 미칠 수 있는 옵션부터 살펴보겠습니다. [동기화 모드](/developers/docs/nodes-and-clients/#sync-modes)는 블록체인 데이터를 다운로드하고 검증하는 다양한 방법을 나타냅니다. 노드를 시작하기 전에 사용할 네트워크와 동기화 모드를 결정해야 합니다. 가장 중요하게 고려해야 할 사항은 클라이언트에 필요한 디스크 공간과 동기화 시간입니다. 클라이언트의 문서를 주의 깊게 살펴보고 어떤 동기화 모드가 기본값인지 확인하세요. 적합하지 않은 경우 보안 수준, 사용 가능한 데이터 및 비용에 따라 다른 모드를 선택하세요. 동기화 알고리즘 외에도 다양한 종류의 오래된 데이터에 대한 프루닝(pruning)을 설정할 수 있습니다. 프루닝을 사용하면 오래된 데이터를 삭제할 수 있습니다. 즉, 최근 블록에서 도달할 수 없는 상태 트라이 노드를 제거할 수 있습니다.

다른 기본 구성 옵션으로는 메인넷 또는 테스트넷과 같은 네트워크 선택, RPC 또는 WebSocket을 위한 HTTP 엔드포인트 활성화 등이 있습니다. 클라이언트의 문서에서 모든 기능과 옵션을 찾을 수 있습니다. CLI 또는 구성 파일에서 직접 해당 플래그를 사용하여 클라이언트를 실행함으로써 다양한 클라이언트 구성을 설정할 수 있습니다. 각 클라이언트는 조금씩 다르므로 구성 옵션에 대한 자세한 내용은 항상 공식 문서나 도움말 페이지를 참조하세요.

테스트 목적으로 테스트넷 네트워크 중 하나에서 클라이언트를 실행하는 것을 선호할 수 있습니다. [지원되는 네트워크 개요 보기](/developers/docs/nodes-and-clients/#execution-clients).

기본 구성으로 실행 클라이언트를 실행하는 예는 다음 섹션에서 찾을 수 있습니다.

#### 실행 클라이언트 시작 {#starting-the-execution-client}

이더리움 클라이언트 소프트웨어를 시작하기 전에 환경이 준비되었는지 마지막으로 확인하세요. 예를 들어 다음을 확인하세요.

- 선택한 네트워크 및 동기화 모드를 고려할 때 디스크 공간이 충분한지 확인합니다.
- 메모리와 CPU가 다른 프로그램에 의해 중단되지 않는지 확인합니다.
- 운영 체제가 최신 버전으로 업데이트되었는지 확인합니다.
- 시스템의 시간과 날짜가 올바른지 확인합니다.
- 라우터와 방화벽이 수신 대기 포트의 연결을 허용하는지 확인합니다. 기본적으로 이더리움 클라이언트는 수신 대기(TCP) 포트와 디스커버리(UDP) 포트를 사용하며 둘 다 기본적으로 30303입니다.

모든 것이 올바르게 작동하는지 확인하기 위해 먼저 테스트넷에서 클라이언트를 실행하세요.

시작 시 기본값이 아닌 클라이언트 설정을 선언해야 합니다. 플래그나 구성 파일을 사용하여 선호하는 구성을 선언할 수 있습니다. 각 클라이언트의 기능 세트와 구성 구문은 다릅니다. 자세한 내용은 클라이언트의 문서를 확인하세요.

실행 및 합의 클라이언트는 [엔진 API](https://github.com/ethereum/execution-apis/tree/main/src/engine)에 지정된 인증된 엔드포인트를 통해 통신합니다. 합의 클라이언트에 연결하려면 실행 클라이언트가 알려진 경로에 [`jwtsecret`](https://jwt.io/)를 생성해야 합니다. 보안 및 안정성을 위해 클라이언트는 동일한 머신에서 실행되어야 하며, 두 클라이언트 간의 로컬 RPC 연결을 인증하는 데 사용되므로 두 클라이언트 모두 이 경로를 알고 있어야 합니다. 실행 클라이언트는 인증된 API를 위한 수신 대기 포트도 정의해야 합니다.

이 토큰은 클라이언트 소프트웨어에 의해 자동으로 생성되지만 경우에 따라 직접 생성해야 할 수도 있습니다. [OpenSSL](https://www.openssl.org/)을 사용하여 생성할 수 있습니다.

```sh
openssl rand -hex 32 > jwtsecret
```

#### 실행 클라이언트 실행 {#running-an-execution-client}

이 섹션에서는 실행 클라이언트를 시작하는 과정을 안내합니다. 이는 기본 구성의 예일 뿐이며 다음 설정으로 클라이언트를 시작합니다.

- 연결할 네트워크를 지정합니다(예제에서는 메인넷).
  - 설정의 예비 테스트를 위해 대신 [테스트넷 중 하나](/developers/docs/networks/)를 선택할 수 있습니다.
- 블록체인을 포함한 모든 데이터가 저장될 데이터 디렉터리를 정의합니다.
  - 경로를 실제 경로(예: 외장 드라이브를 가리키는 경로)로 대체해야 합니다.
- 클라이언트와 통신하기 위한 인터페이스를 활성화합니다.
  - 합의 클라이언트와의 통신을 위한 JSON-RPC 및 엔진 API를 포함합니다.
- 인증된 API를 위한 `jwtsecret` 경로를 정의합니다.
  - 예제 경로를 클라이언트가 액세스할 수 있는 실제 경로(예: `/tmp/jwtsecret`)로 대체해야 합니다.

이것은 기본적인 예일 뿐이며 다른 모든 설정은 기본값으로 설정된다는 점을 명심하세요. 기본값, 설정 및 기능에 대해 알아보려면 각 클라이언트의 문서에 주의를 기울이세요. 검증자 실행, 모니터링 등과 같은 더 많은 기능에 대해서는 특정 클라이언트의 문서를 참조하세요.

> 예제의 백슬래시 `\`는 서식 지정 목적으로만 사용되며 구성 플래그는 한 줄로 정의할 수 있습니다.

##### 베수 실행

이 예제는 메인넷에서 베수를 시작하고, 블록체인 데이터를 기본 형식으로 `/data/ethereum`에 저장하며, 합의 클라이언트 연결을 위해 JSON-RPC 및 엔진 RPC를 활성화합니다. 엔진 API는 `jwtsecret` 토큰으로 인증되며 `localhost`의 호출만 허용됩니다.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

베수에는 일련의 질문을 하고 구성 파일을 생성하는 런처 옵션도 함께 제공됩니다. 다음을 사용하여 대화형 런처를 실행하세요.

```sh
besu --Xlauncher
```

[베수 문서](https://besu.hyperledger.org/public-networks/get-started/start-node/)에는 추가 옵션 및 구성 세부 정보가 포함되어 있습니다.

##### 에리곤 실행

이 예제는 메인넷에서 에리곤을 시작하고, 블록체인 데이터를 `/data/ethereum`에 저장하며, JSON-RPC를 활성화하고, 허용되는 네임스페이스를 정의하며, `jwtsecret` 경로로 정의된 합의 클라이언트 연결을 위한 인증을 활성화합니다.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

에리곤은 기본적으로 8GB HDD로 전체 동기화를 수행하여 2TB 이상의 아카이브 데이터를 생성합니다. `datadir`가 여유 공간이 충분한 디스크를 가리키는지 확인하거나 다양한 종류의 데이터를 다듬을 수 있는 `--prune` 플래그를 살펴보세요. 자세한 내용은 에리곤의 `--help`를 확인하세요.

##### Geth 실행

이 예제는 메인넷에서 Geth를 시작하고, 블록체인 데이터를 `/data/ethereum`에 저장하며, JSON-RPC를 활성화하고 허용되는 네임스페이스를 정의합니다. 또한 합의 클라이언트 연결을 위한 인증을 활성화하는데, 여기에는 `jwtsecret` 경로와 허용되는 연결을 정의하는 옵션(이 예제에서는 `localhost`에서만 허용)이 필요합니다.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

[모든 구성 옵션에 대한 문서](https://geth.ethereum.org/docs/fundamentals/command-line-options)를 확인하고 [합의 클라이언트와 함께 Geth 실행하기](https://geth.ethereum.org/docs/getting-started/consensus-clients)에 대해 자세히 알아보세요.

##### 네더마인드 실행

네더마인드는 다양한 [설치 옵션](https://docs.nethermind.io/get-started/installing-nethermind)을 제공합니다. 패키지에는 대화형으로 구성을 생성하는 데 도움이 되는 안내 설정이 포함된 런처를 비롯한 다양한 바이너리가 함께 제공됩니다. 또는 실행 파일 자체인 러너(Runner)를 찾아 구성 플래그와 함께 실행할 수도 있습니다. JSON-RPC는 기본적으로 활성화되어 있습니다.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

네더마인드 문서는 합의 클라이언트와 함께 네더마인드를 실행하는 것에 대한 [전체 가이드](https://docs.nethermind.io/get-started/running-node/)를 제공합니다.

실행 클라이언트는 핵심 기능, 선택한 엔드포인트를 시작하고 피어를 찾기 시작합니다. 피어를 성공적으로 발견한 후 클라이언트는 동기화를 시작합니다. 실행 클라이언트는 합의 클라이언트의 연결을 기다립니다. 클라이언트가 현재 상태로 성공적으로 동기화되면 현재 블록체인 데이터를 사용할 수 있습니다.

##### 레스 실행

이 예제는 기본 데이터 위치를 사용하여 메인넷에서 레스를 시작합니다. `jwtsecret` 경로로 정의된 합의 클라이언트 연결을 위해 JSON-RPC 및 엔진 RPC 인증을 활성화하며 `localhost`의 호출만 허용됩니다.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

기본 데이터 디렉터리에 대해 자세히 알아보려면 [레스 구성하기](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth)를 참조하세요. [레스 문서](https://reth.rs/run/mainnet.html)에는 추가 옵션 및 구성 세부 정보가 포함되어 있습니다.

#### 합의 클라이언트 시작 {#starting-the-consensus-client}

실행 클라이언트에 대한 로컬 RPC 연결을 설정하려면 올바른 포트 구성으로 합의 클라이언트를 시작해야 합니다. 합의 클라이언트는 노출된 실행 클라이언트 포트를 구성 인수로 사용하여 실행해야 합니다.

합의 클라이언트는 또한 둘 사이의 RPC 연결을 인증하기 위해 실행 클라이언트의 `jwt-secret` 경로가 필요합니다. 위의 실행 예제와 유사하게 각 합의 클라이언트에는 jwt 토큰 파일 경로를 인수로 사용하는 구성 플래그가 있습니다. 이는 실행 클라이언트에 제공된 `jwtsecret` 경로와 일치해야 합니다.

검증자를 실행할 계획이라면 수수료 수신자의 이더리움 주소를 지정하는 구성 플래그를 추가해야 합니다. 이곳은 검증자에 대한 이더 보상이 누적되는 곳입니다. 각 합의 클라이언트에는 이더리움 주소를 인수로 사용하는 옵션(예: `--suggested-fee-recipient=0xabcd1`)이 있습니다.

테스트넷에서 비콘 노드를 시작할 때 [체크포인트 동기화](https://notes.ethereum.org/@launchpad/checkpoint-sync)를 위한 퍼블릭 엔드포인트를 사용하면 동기화 시간을 크게 절약할 수 있습니다.

#### 합의 클라이언트 실행 {#running-a-consensus-client}

##### 라이트하우스 실행

라이트하우스를 실행하기 전에 [라이트하우스 북(Lighthouse Book)](https://lighthouse-book.sigmaprime.io/installation.html)에서 설치 및 구성 방법에 대해 자세히 알아보세요.

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### 로드스타 실행

로드스타 소프트웨어를 컴파일하거나 Docker 이미지를 다운로드하여 설치하세요. [문서](https://chainsafe.github.io/lodestar/) 및 더 포괄적인 [설정 가이드](https://hackmd.io/@philknows/rk5cDvKmK)에서 자세히 알아보세요.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### 님버스 실행

님버스는 합의 및 실행 클라이언트와 함께 제공됩니다. 컴퓨팅 파워가 매우 낮은 다양한 장치에서도 실행할 수 있습니다.
[종속성 및 님버스 자체를 설치](https://nimbus.guide/quick-start.html)한 후 합의 클라이언트를 실행할 수 있습니다.

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### 프리즘 실행

프리즘에는 쉬운 자동 설치를 허용하는 스크립트가 함께 제공됩니다. 자세한 내용은 [프리즘 문서](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/)에서 찾을 수 있습니다.

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### 테쿠 실행

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

합의 클라이언트가 예치 컨트랙트를 읽고 검증자를 식별하기 위해 실행 클라이언트에 연결할 때, 다른 비콘 노드 피어에도 연결하고 제네시스부터 합의 슬롯 동기화를 시작합니다. 비콘 노드가 현재 에포크에 도달하면 검증자가 비콘 API를 사용할 수 있게 됩니다. [비콘 노드 API](https://ethereum.github.io/beacon-APIs)에 대해 자세히 알아보세요.

### 검증자 추가 {#adding-validators}

합의 클라이언트는 검증자가 연결할 비콘 노드 역할을 합니다. 각 합의 클라이언트에는 해당 문서에 자세히 설명된 자체 검증자 소프트웨어가 있습니다.

자체 검증자를 실행하면 이더리움 네트워크를 지원하는 가장 영향력 있고 무신뢰적인 방법인 [솔로 스테이킹](/staking/solo/)이 가능합니다. 그러나 이를 위해서는 32 ETH의 예치가 필요합니다. 더 적은 금액으로 자체 노드에서 검증자를 실행하려면 [Rocket Pool](https://rocketpool.net/node-operators)과 같은 무허가성 노드 운영자가 있는 탈중앙화된 풀에 관심이 있을 수 있습니다.

스테이킹 및 검증자 키 생성을 시작하는 가장 쉬운 방법은 [Hoodi 테스트넷 스테이킹 런치패드](https://hoodi.launchpad.ethereum.org/)를 사용하는 것입니다. 이를 통해 [Hoodi에서 노드를 실행](https://notes.ethereum.org/@launchpad/hoodi)하여 설정을 테스트할 수 있습니다. 메인넷 준비가 되면 [메인넷 스테이킹 런치패드](https://launchpad.ethereum.org/)를 사용하여 이 단계를 반복할 수 있습니다.

스테이킹 옵션에 대한 개요는 [스테이킹 페이지](/staking)를 살펴보세요.

### 노드 사용 {#using-the-node}

실행 클라이언트는 트랜잭션을 제출하거나 이더리움 네트워크에서 스마트 컨트랙트와 상호 작용하거나 배포하는 데 사용할 수 있는 [RPC API 엔드포인트](/developers/docs/apis/json-rpc/)를 다양한 방식으로 제공합니다.

- 적합한 프로토콜을 사용하여 수동으로 호출(예: `curl` 사용)
- 제공된 콘솔 연결(예: `geth attach`)
- Web3 라이브러리(예: [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/))를 사용하여 애플리케이션에 구현

클라이언트마다 RPC 엔드포인트의 구현이 다릅니다. 하지만 모든 클라이언트에서 사용할 수 있는 표준 JSON-RPC가 있습니다. 개요를 보려면 [JSON-RPC 문서](/developers/docs/apis/json-rpc/)를 읽어보세요. 이더리움 네트워크의 정보가 필요한 애플리케이션은 이 RPC를 사용할 수 있습니다. 예를 들어 인기 있는 지갑인 메타마스크를 사용하면 강력한 프라이버시 및 보안 이점이 있는 [자체 RPC 엔드포인트에 연결](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)할 수 있습니다.

합의 클라이언트는 모두 [Curl](https://curl.se)과 같은 도구를 사용하여 요청을 전송함으로써 합의 클라이언트의 상태를 확인하거나 블록 및 합의 데이터를 다운로드하는 데 사용할 수 있는 [비콘 API](https://ethereum.github.io/beacon-APIs)를 노출합니다. 이에 대한 자세한 내용은 각 합의 클라이언트의 문서에서 찾을 수 있습니다.

#### RPC 연결 {#reaching-rpc}

실행 클라이언트 JSON-RPC의 기본 포트는 `8545`이지만 구성에서 로컬 엔드포인트의 포트를 수정할 수 있습니다. 기본적으로 RPC 인터페이스는 컴퓨터의 로컬 호스트에서만 연결할 수 있습니다. 원격으로 액세스할 수 있도록 하려면 주소를 `0.0.0.0`로 변경하여 대중에게 노출할 수 있습니다. 이렇게 하면 로컬 네트워크 및 퍼블릭 IP 주소를 통해 연결할 수 있습니다. 대부분의 경우 라우터에서 포트 포워딩도 설정해야 합니다.

포트를 인터넷에 노출하면 인터넷의 누구나 노드를 제어할 수 있으므로 주의해서 접근하세요. 악의적인 행위자가 노드에 액세스하여 시스템을 다운시키거나 클라이언트를 지갑으로 사용하는 경우 자금을 훔칠 수 있습니다.

이를 피하는 방법은 잠재적으로 해로운 RPC 메서드를 수정할 수 없도록 방지하는 것입니다. 예를 들어 Geth를 사용하면 `--http.api web3,eth,txpool` 플래그를 사용하여 수정 가능한 메서드를 선언할 수 있습니다.

RPC 인터페이스에 대한 액세스는 Nginx와 같은 에지 레이어 API 또는 웹 서버 애플리케이션을 개발하고 이를 클라이언트의 로컬 주소 및 포트에 연결하여 확장할 수 있습니다. 미들 레이어를 활용하면 개발자가 RPC 인터페이스에 대한 안전한 `https` 연결을 위한 인증서를 설정할 수도 있습니다.

웹 서버, 프록시 또는 외부 연결 Rest API를 설정하는 것이 노드의 RPC 엔드포인트에 대한 액세스를 제공하는 유일한 방법은 아닙니다. 공개적으로 연결 가능한 엔드포인트를 설정하는 또 다른 프라이버시 보호 방법은 자체 [Tor](https://www.torproject.org/) 어니언 서비스에서 노드를 호스팅하는 것입니다. 이렇게 하면 고정 퍼블릭 IP 주소나 열린 포트 없이 로컬 네트워크 외부에서 RPC에 연결할 수 있습니다. 그러나 이 구성을 사용하면 모든 애플리케이션에서 지원되지 않는 Tor 네트워크를 통해서만 RPC 엔드포인트에 액세스할 수 있으므로 연결 문제가 발생할 수 있습니다.

이를 수행하려면 자체 [어니언 서비스](https://community.torproject.org/onion-services/)를 만들어야 합니다. 자체 호스팅을 위한 어니언 서비스 설정에 대한 [문서](https://community.torproject.org/onion-services/setup/)를 확인하세요. RPC 포트에 대한 프록시가 있는 웹 서버를 가리키거나 RPC를 직접 가리킬 수 있습니다.

마지막으로, 내부 네트워크에 대한 액세스를 제공하는 가장 인기 있는 방법 중 하나는 VPN 연결을 통한 것입니다. 사용 사례와 노드에 액세스해야 하는 사용자 수에 따라 안전한 VPN 연결이 옵션이 될 수 있습니다. [OpenVPN](https://openvpn.net/)은 업계 표준 SSL/TLS 프로토콜을 사용하여 OSI 레이어 2 또는 3 보안 네트워크 확장을 구현하는 모든 기능을 갖춘 SSL VPN으로, 인증서, 스마트 카드 및/또는 사용자 이름/비밀번호 자격 증명을 기반으로 하는 유연한 클라이언트 인증 방법을 지원하며, VPN 가상 인터페이스에 적용된 방화벽 규칙을 사용하여 사용자 또는 그룹별 액세스 제어 정책을 허용합니다.

### 노드 운영 {#operating-the-node}

노드가 제대로 실행되고 있는지 정기적으로 모니터링해야 합니다. 가끔 유지보수를 해야 할 수도 있습니다.

#### 노드 온라인 상태 유지 {#keeping-node-online}

노드가 항상 온라인 상태일 필요는 없지만 네트워크와 동기화 상태를 유지하려면 가능한 한 온라인 상태를 유지해야 합니다. 다시 시작하기 위해 종료할 수 있지만 다음 사항을 명심하세요.

- 최근 상태가 여전히 디스크에 기록되고 있는 경우 종료하는 데 몇 분이 걸릴 수 있습니다.
- 강제 종료는 데이터베이스를 손상시켜 전체 노드를 다시 동기화해야 할 수 있습니다.
- 클라이언트가 네트워크와 동기화되지 않으며 다시 시작할 때 다시 동기화해야 합니다. 노드는 마지막으로 종료된 위치에서 동기화를 시작할 수 있지만 오프라인 상태였던 시간에 따라 프로세스에 시간이 걸릴 수 있습니다.

_이는 합의 레이어 검증자 노드에는 적용되지 않습니다._ 노드를 오프라인으로 전환하면 노드에 의존하는 모든 서비스에 영향을 미칩니다. _스테이킹_ 목적으로 노드를 실행하는 경우 다운타임을 최대한 최소화해야 합니다.

#### 클라이언트 서비스 생성 {#creating-client-services}

시작 시 클라이언트를 자동으로 실행하는 서비스를 만드는 것을 고려해 보세요. 예를 들어 Linux 서버의 경우 `systemd` 등을 사용하여 제한된 권한을 가진 사용자 계정으로 적절한 구성으로 클라이언트를 실행하고 자동으로 다시 시작하는 서비스를 만드는 것이 좋은 방법입니다.

#### 클라이언트 업데이트 {#updating-clients}

최신 보안 패치, 기능 및 [EIP](/eips/)로 클라이언트 소프트웨어를 최신 상태로 유지해야 합니다. 특히 [하드 포크](/ethereum-forks/) 전에는 올바른 클라이언트 버전을 실행하고 있는지 확인하세요.

> 중요한 네트워크 업데이트 전에 이더리움 재단(EF)은 [블로그](https://blog.ethereum.org)에 게시물을 게시합니다. [이러한 공지 사항을 구독](https://blog.ethereum.org/category/protocol#subscribe)하면 노드 업데이트가 필요할 때 메일로 알림을 받을 수 있습니다.

클라이언트 업데이트는 매우 간단합니다. 각 클라이언트의 문서에 특정 지침이 있지만 일반적으로 최신 버전을 다운로드하고 새 실행 파일로 클라이언트를 다시 시작하기만 하면 됩니다. 클라이언트는 중단된 부분부터 다시 시작하지만 업데이트가 적용된 상태로 시작됩니다.

각 클라이언트 구현에는 피어 투 피어 프로토콜에서 사용되지만 명령줄에서도 액세스할 수 있는 사람이 읽을 수 있는 버전 문자열이 있습니다. 이 버전 문자열을 통해 사용자는 올바른 버전을 실행하고 있는지 확인할 수 있으며, 네트워크에서 특정 클라이언트의 분포를 정량화하는 데 관심이 있는 블록 탐색기 및 기타 분석 도구를 허용합니다. 버전 문자열에 대한 자세한 내용은 개별 클라이언트 문서를 참조하세요.

#### 추가 서비스 실행 {#running-additional-services}

자체 노드를 실행하면 이더리움 클라이언트 RPC에 직접 액세스해야 하는 서비스를 사용할 수 있습니다. 이는 [레이어 2(l2) 솔루션](/developers/docs/scaling/#layer-2-scaling), 지갑용 백엔드, 블록 탐색기, 개발자 도구 및 기타 이더리움 인프라와 같이 이더리움 위에 구축된 서비스입니다.

#### 노드 모니터링 {#monitoring-the-node}

노드를 제대로 모니터링하려면 지표 수집을 고려해 보세요. 클라이언트는 지표 엔드포인트를 제공하므로 노드에 대한 포괄적인 데이터를 얻을 수 있습니다. [InfluxDB](https://www.influxdata.com/get-influxdb/) 또는 [Prometheus](https://prometheus.io/)와 같은 도구를 사용하여 데이터베이스를 만들고 [Grafana](https://grafana.com/)와 같은 소프트웨어에서 시각화 및 차트로 변환할 수 있습니다. 이 소프트웨어를 사용하기 위한 많은 설정과 노드 및 네트워크 전체를 시각화하기 위한 다양한 Grafana 대시보드가 있습니다. 예를 들어 [Geth 모니터링 튜토리얼](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/)을 확인해 보세요.

모니터링의 일환으로 머신의 성능을 주시해야 합니다. 노드의 초기 동기화 중에 클라이언트 소프트웨어는 CPU 및 RAM에 매우 큰 부하를 줄 수 있습니다. Grafana 외에도 `htop` 또는 `uptime`와 같이 OS에서 제공하는 도구를 사용하여 이 작업을 수행할 수 있습니다.

## 더 읽어보기 {#further-reading}

- [이더리움 스테이킹 가이드](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, 자주 업데이트됨_
- [가이드 | 메인넷에서 이더리움 스테이킹을 위한 검증자를 설정하는 방법](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, 자주 업데이트됨_
- [테스트넷에서 검증자 실행에 대한 EthStaker 가이드](https://github.com/remyroy/ethstaker#guides) – _EthStaker, 정기적으로 업데이트됨_
- [이더리움 노드용 샘플 AWS 블록체인 노드 러너 앱](https://aws-samples.github.io/aws-blockchain-node-runners/docs/blueprints/ethereum) - _AWS, 자주 업데이트됨_
- [노드 운영자를 위한 머지 FAQ](https://notes.ethereum.org/@launchpad/node-faq-merge) - _2022년 7월_
- [이더리움 풀 검증 노드가 되기 위한 하드웨어 요구 사항 분석](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 2018년 9월 24일_
- [이더리움 풀 노드 실행: 동기가 부족한 사람들을 위한 가이드](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 2019년 11월 7일_
- [이더리움 메인넷에서 Hyperledger 베수 노드 실행: 이점, 요구 사항 및 설정](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 2020년 5월 7일_
- [모니터링 스택과 함께 네더마인드 이더리움 클라이언트 배포](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 2020년 7월 8일_

## 관련 주제 {#related-topics}

- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
- [블록](/developers/docs/blocks/)
- [네트워크](/developers/docs/networks/)
