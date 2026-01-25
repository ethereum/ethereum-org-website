---
title: "Raspberry Pi 4에서 이더리움 노드 실행하기"
description: "Raspberry Pi 4를 플래시하고, 이더넷 케이블을 꽂고, SSD 디스크를 연결하고, 장치에 전원을 공급하여 Raspberry Pi 4를 완전한 이더리움 노드 + 검증자로 바꾸세요"
author: "EthereumOnArm"
tags: [ "클라이언트", "실행 레이어", "합의 레이어", "노드" ]
lang: ko
skill: intermediate
published: 2022-06-10
source: "ARM 기반의 이더리움"
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm은 라즈베리 파이를 이더리움 노드로 전환할 수 있는 맞춤형 리눅스 이미지입니다.**

Ethereum on Arm을 사용하여 라즈베리 파이를 이더리움 노드로 전환하려면 다음과 같은 하웨어가 권장됩니다.

- Raspberry 4 (B 모델 8GB), Odroid M1 또는 Rock 5B (8GB/16GB RAM) 보드
- 마이크로SD 카드(최소 16GB 클래스 10)
- 최소 2TB SSD USB 3.0 디스크 또는 USB-SATA 케이스가 있는 SSD.
- 전원 공급 장치
- 이더넷 케이블
- 포트 포워딩(자세한 내용은 클라이언트를 참조하세요)
- 방열판과 팬이 있는 케이스
- USB 키보드, 모니터 및 HDMI 케이블(마이크로-HDMI)(선택 사항)

## ARM에서 이더리움을 실행해야 하는 이유 {#why-run-ethereum-on-arm}

ARM 보드는 매우 저렴하고 유연한 소형 컴퓨터입니다. 저렴하게 구입할 수 있고, 모든 자원을 노드에만 집중하도록 구성하여 효율적이고, 전력 소비가 적으며, 물리적으로 작아 어느 집에나 눈에 띄지 않게 설치할 수 있으므로 이더리움 노드를 실행하기에 좋은 선택입니다. 또한 Raspberry Pi의 MicroSD는 사전 빌드된 이미지로 간단히 플래시할 수 있어 소프트웨어를 다운로드하거나 빌드할 필요가 없으므로 노드를 매우 쉽게 가동할 수 있습니다.

## 어떻게 작동하나요? {#how-does-it-work}

Raspberry Pi의 메모리 카드는 사전 빌드된 이미지로 플래시됩니다. 이 이미지에는 이더리움 노드를 실행하는 데 필요한 모든 것이 포함되어 있습니다. 플래시된 카드를 사용하면 사용자는 Raspberry Pi의 전원을 켜기만 하면 됩니다. 노드를 실행하는 데 필요한 모든 프로세스가 자동으로 시작됩니다. 이는 메모리 카드에 리눅스 기반 운영 체제(OS)가 포함되어 있고, 그 위에서 시스템 수준의 프로세스가 자동으로 실행되어 장치를 이더리움 노드로 전환하기 때문에 가능합니다.

Raspbian은 여전히 32비트 아키텍처를 사용하기 때문에 이더리움 사용자가 메모리 문제에 직면하고 합의 클라이언트가 32비트 바이너리를 지원하지 않으므로, 널리 사용되는 Raspberry Pi Linux OS "Raspbian"을 사용하여 이더리움을 실행할 수 없습니다. 이를 극복하기 위해 Ethereum on Arm 팀은 "Armbian"이라는 네이티브 64비트 OS로 마이그레이션했습니다.

**이미지는 환경 설정과 SSD 디스크 포맷부터 이더리움 소프트웨어 설치 및 실행, 블록체인 동기화 시작까지 모든 필요한 단계를 처리합니다.**

## 실행 및 합의 클라이언트에 대한 참고 사항 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 이미지에는 사전 빌드된 실행 및 합의 클라이언트가 서비스로 포함되어 있습니다. 이더리움 노드는 두 클라이언트가 모두 동기화되고 실행되어야 합니다. 이미지를 다운로드하고 플래시한 다음 서비스를 시작하기만 하면 됩니다. 이미지에는 다음과 같은 실행 클라이언트가 사전 로드되어 있습니다.

- Geth
- Nethermind
- Besu

그리고 다음 합의 클라이언트가 포함됩니다:

- Lighthouse
- Nimbus
- Prysm
- Teku

각각 하나씩 선택하여 실행해야 합니다. 모든 실행 클라이언트는 모든 합의 클라이언트와 호환됩니다. 클라이언트를 명시적으로 선택하지 않으면 노드는 기본값인 Geth와 Lighthouse로 대체되고 보드에 전원이 공급될 때 자동으로 실행됩니다. Geth가 피어를 찾아 연결할 수 있도록 라우터에서 30303 포트를 열어야 합니다.

## 이미지 다운로드하기 {#downloading-the-image}

Raspberry Pi 4 이더리움 이미지는 실행 클라이언트와 합의 클라이언트를 모두 자동으로 설치 및 설정하고, 서로 통신하고 이더리움 네트워크에 연결하도록 구성하는 "플러그 앤 플레이" 이미지입니다. 사용자는 간단한 명령을 사용하여 프로세스를 시작하기만 하면 됩니다.

[Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1)에서 라즈베리 파이 이미지를 다운로드하고 SHA256 해시를 확인하세요:

```sh
# 다운로드한 이미지가 포함된 디렉터리에서
shasum -a 256 ethonarm_22.04.00.img.zip
# 해시 출력: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5B 및 Odroid M1 보드용 이미지는 Ethereum-on-Arm [다운로드 페이지](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html)에서 사용할 수 있습니다.

## MicroSD 플래시하기 {#flashing-the-microsd}

Raspberry Pi에 사용할 MicroSD 카드는 먼저 데스크톱이나 노트북에 삽입하여 플래시해야 합니다. 그런 다음 다음 터미널 명령을 사용하여 다운로드한 이미지를 SD 카드에 플래시합니다:

```shell
# MicroSD 카드 이름 확인
sudo fdisk -l

>> sdxxx
```

다음 명령에 카드의 기존 콘텐츠를 완전히 지우고 이미지를 푸시하는 `dd`가 포함되어 있으므로 이름을 올바르게 지정하는 것이 매우 중요합니다. 계속하려면 압축된 이미지가 포함된 디렉터리로 이동하세요:

```shell
# 이미지 압축 해제 및 플래시
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

이제 카드가 플래시되었으므로 Raspberry Pi에 삽입할 수 있습니다.

## 노드 시작하기 {#start-the-node}

SD 카드를 Raspberry Pi에 삽입한 상태에서 이더넷 케이블과 SSD를 연결한 다음 전원을 켭니다. OS가 부팅되고 클라이언트 소프트웨어 설치 및 빌드를 포함하여 Raspberry Pi를 이더리움 노드로 전환하는 사전 구성된 작업을 자동으로 수행하기 시작합니다. 이 과정은 10~15분 정도 소요될 수 있습니다.

모든 것이 설치 및 구성되면 ssh 연결을 통해 장치에 로그인하거나 모니터와 키보드가 보드에 연결되어 있는 경우 터미널을 직접 사용하여 로그인합니다. `ethereum` 계정은 노드를 시작하는 데 필요한 권한을 가지고 있으므로 이 계정을 사용하여 로그인하세요.

```shell
사용자: ethereum
비밀번호: ethereum
```

기본 실행 클라이언트인 Geth가 자동으로 시작됩니다. 다음 터미널 명령을 사용하여 로그를 확인하여 이를 확인할 수 있습니다.

```sh
sudo journalctl -u geth -f
```

합의 클라이언트는 명시적으로 시작해야 합니다. 이렇게 하려면 먼저 라우터에서 9000 포트를 열어 Lighthouse가 피어를 찾아 연결할 수 있도록 하세요. 그런 다음 lighthouse 서비스를 활성화하고 시작합니다.

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

로그를 사용하여 클라이언트를 확인합니다.

```sh
sudo journalctl -u lighthouse-beacon
```

합의 클라이언트는 체크포인트 동기화를 사용하므로 몇 분 안에 동기화됩니다. 실행 클라이언트는 더 오래 걸릴 수 있으며(몇 시간이 걸릴 수 있음) 합의 클라이언트가 이미 동기화를 마칠 때까지 시작되지 않습니다(이는 실행 클라이언트가 동기화할 대상이 필요하며 동기화된 합의 클라이언트가 이를 제공하기 때문입니다).

Geth 및 Lighthouse 서비스가 실행되고 동기화되면 이제 Raspberry Pi는 이더리움 노드가 됩니다! 8545 포트의 Geth 클라이언트에 연결할 수 있는 Geth의 자바스크립트 콘솔을 사용하여 이더리움 네트워크와 상호 작용하는 것이 가장 일반적입니다. Curl과 같은 요청 도구를 사용하여 JSON 객체로 형식화된 명령을 제출할 수도 있습니다. [Geth 개발문서](https://geth.ethereum.org/)에서 자세한 내용을 확인하세요.

Geth는 브라우저에서 볼 수 있는 Grafana 대시보드에 메트릭을 보고하도록 사전 구성되어 있습니다. 고급 사용자는 `ipaddress:3000`으로 이동하여 `user: admin` 및 `passwd: ethereum`을 전달하여 이 기능을 사용하여 노드의 상태를 모니터링할 수 있습니다.

## 검증자 {#validators}

합의 클라이언트에 검증자를 선택적으로 추가할 수도 있습니다. 검증자 소프트웨어를 사용하면 노드가 합의에 적극적으로 참여할 수 있으며 네트워크에 암호경제학적 보안을 제공합니다. 이 작업에 대한 보상으로 ETH를 받습니다. 검증자를 실행하려면 먼저 32 ETH가 있어야 하며, 이는 예금 계약에 예치되어야 합니다. [런치패드](https://launchpad.ethereum.org/)의 단계별 가이드를 따라 예치할 수 있습니다. 이 작업은 데스크톱/노트북에서 수행하지만 키는 생성하지 마세요. 이 작업은 Raspberry Pi에서 직접 수행할 수 있습니다.

Raspberry Pi에서 터미널을 열고 다음 명령을 실행하여 예금 키를 생성합니다.

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(또는 에어갭 머신에서 실행하기 위해 [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli)를 다운로드하고 `deposit new-mnemnonic` 명령을 실행)

니모닉 문구를 안전하게 보관하세요! 위의 명령은 노드의 키스토어에 두 개의 파일, 즉 검증자 키와 예금 데이터 파일을 생성했습니다. 예금 데이터를 런치패드에 업로드해야 하므로 Raspberry Pi에서 데스크톱/노트북으로 복사해야 합니다. 이 작업은 ssh 연결 또는 다른 복사/붙여넣기 방법을 사용하여 수행할 수 있습니다.

예금 데이터 파일이 런치패드를 실행하는 컴퓨터에서 사용 가능해지면 런치패드 화면의 `+` 위로 끌어다 놓을 수 있습니다. 화면의 지시에 따라 예금 계약에 트랜잭션을 보냅니다.

Raspberry Pi로 돌아가서 검증자를 시작할 수 있습니다. 이를 위해서는 검증자 키를 가져오고, 보상을 수집할 주소를 설정한 다음, 사전 구성된 검증자 프로세스를 시작해야 합니다. 아래 예시는 Lighthouse에 대한 것입니다. 다른 합의 클라이언트에 대한 지침은 [Ethereum on Arm 문서](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)에서 확인할 수 있습니다.

```shell
# 검증자 키 가져오기
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 보상 주소 설정
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# 검증자 시작
sudo systemctl start lighthouse-validator
```

축하합니다! 이제 Raspberry Pi에서 완전한 이더리움 노드와 검증자를 실행하고 있습니다!

## 자세한 내용 {#more-details}

이 페이지에서는 Raspberry Pi를 사용하여 Geth-Lighthouse 노드 및 검증자를 설정하는 방법에 대한 개요를 제공했습니다. 더 자세한 지침은 [Ethereum-on-Arm 웹사이트](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html)에서 확인할 수 있습니다.

## 피드백을 기다립니다 {#feedback-appreciated}

저희는 Raspberry Pi가 이더리움 네트워크의 건전성에 매우 긍정적인 영향을 미칠 수 있는 거대한 사용자 기반을 가지고 있다는 것을 알고 있습니다.
이 튜토리얼의 세부 사항을 자세히 살펴보고, 테스트넷에서 실행해보고, Ethereum on Arm GitHub를 확인하고, 피드백을 제공하고, 이슈와 풀 리퀘스트를 제기하여 기술과 개발문서를 발전시키는 데 도움을 주세요!

## 참고 자료 {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
