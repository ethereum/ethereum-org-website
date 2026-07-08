---
title: "Raspberry Pi 4에서 이더리움 노드 실행하기"
description: "Raspberry Pi 4를 플래시하고, 이더넷 케이블을 꽂고, SSD 디스크를 연결한 후 전원을 켜서 Raspberry Pi 4를 완전한 이더리움 노드 및 검증자로 만들어 보세요."
author: "EthereumOnArm"
tags: ["클라이언트", "실행 계층", "합의 계층", "노드"]
lang: ko
skill: intermediate
breadcrumb: "Raspberry Pi 노드"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm은 Raspberry Pi를 이더리움 노드로 바꿀 수 있는 맞춤형 Linux 이미지입니다.**

Ethereum on Arm을 사용하여 Raspberry Pi를 이더리움 노드로 만들려면 다음 하드웨어를 권장합니다.

- Raspberry Pi 4(모델 B 8GB), Odroid M1 또는 Rock 5B(8GB/16GB RAM) 보드
- MicroSD 카드(최소 16GB Class 10)
- 최소 2TB SSD USB 3.0 디스크 또는 USB to SATA 케이스가 있는 SSD
- 전원 공급 장치
- 이더넷 케이블
- 포트 포워딩(자세한 내용은 클라이언트 참조)
- 방열판과 팬이 있는 케이스
- USB 키보드, 모니터 및 HDMI 케이블(micro-HDMI) (선택 사항)

## 왜 ARM에서 이더리움을 실행해야 할까요? {#why-run-ethereum-on-arm}

ARM 보드는 매우 저렴하고 유연하며 작은 컴퓨터입니다. 저렴하게 구입할 수 있고, 모든 리소스를 노드에만 집중하도록 구성하여 효율성을 높일 수 있으며, 전력 소비가 적고 물리적으로 작아 어느 가정에나 눈에 띄지 않게 배치할 수 있기 때문에 이더리움 노드를 실행하는 데 좋은 선택입니다. 또한 소프트웨어를 다운로드하거나 빌드할 필요 없이 Raspberry Pi의 MicroSD에 사전 빌드된 이미지를 플래시하기만 하면 되므로 노드를 가동하는 것도 매우 쉽습니다.

## 어떻게 작동하나요? {#how-does-it-work}

Raspberry Pi의 메모리 카드에는 사전 빌드된 이미지가 플래시됩니다. 이 이미지에는 이더리움 노드를 실행하는 데 필요한 모든 것이 포함되어 있습니다. 카드가 플래시되면 사용자는 Raspberry Pi의 전원을 켜기만 하면 됩니다. 노드를 실행하는 데 필요한 모든 프로세스가 자동으로 시작됩니다. 메모리 카드에는 장치를 이더리움 노드로 바꾸는 시스템 수준 프로세스가 자동으로 실행되는 Linux 기반 운영 체제(OS)가 포함되어 있기 때문에 가능합니다.

널리 사용되는 Raspberry Pi Linux OS인 "Raspbian"은 여전히 32비트 아키텍처를 사용하므로 이더리움 사용자가 메모리 문제에 직면하게 되고 합의 클라이언트가 32비트 바이너리를 지원하지 않기 때문에 Raspbian을 사용하여 이더리움을 실행할 수 없습니다. 이를 극복하기 위해 Ethereum on Arm 팀은 "Armbian"이라는 네이티브 64비트 OS로 마이그레이션했습니다.

**이미지는** 환경 설정 및 SSD 디스크 포맷부터 이더리움 소프트웨어 설치 및 실행, 블록체인 동기화 시작에 이르기까지 **필요한 모든 단계를 처리합니다**.

## 실행 및 합의 클라이언트에 대한 참고 사항 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 이미지에는 사전 빌드된 실행 및 합의 클라이언트가 서비스로 포함되어 있습니다. 이더리움 노드는 두 클라이언트가 모두 동기화되고 실행되어야 합니다. 이미지를 다운로드하고 플래시한 다음 서비스를 시작하기만 하면 됩니다. 이미지에는 다음 실행 클라이언트가 사전 로드되어 있습니다.

- 고 이더리움 (geth)
- 네더마인드
- 베수

그리고 다음 합의 클라이언트가 포함되어 있습니다.

- 라이트하우스
- 님버스
- 프리즘
- 테쿠

실행할 클라이언트를 각각 하나씩 선택해야 합니다. 모든 실행 클라이언트는 모든 합의 클라이언트와 호환됩니다. 클라이언트를 명시적으로 선택하지 않으면 노드는 기본값인 고 이더리움 (geth)과 라이트하우스로 돌아가 보드에 전원이 공급될 때 자동으로 실행합니다. 고 이더리움 (geth)이 피어를 찾고 연결할 수 있도록 라우터에서 포트 30303을 열어야 합니다.

## 이미지 다운로드 {#downloading-the-image}

Raspberry Pi 4 이더리움 이미지는 실행 및 합의 클라이언트를 모두 자동으로 설치하고 설정하여 서로 통신하고 이더리움 네트워크에 연결하도록 구성하는 "플러그 앤 플레이" 이미지입니다. 사용자는 간단한 명령을 사용하여 프로세스를 시작하기만 하면 됩니다.

[Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1)에서 Raspberry Pi 이미지를 다운로드하고 SHA-256 해시를 확인합니다.

```sh
# 다운로드한 이미지가 포함된 디렉터리에서
shasum -a 256 ethonarm_22.04.00.img.zip
# 해시 출력 결과는 다음과 같아야 합니다: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Rock 5B 및 Odroid M1 보드용 이미지는 Ethereum-on-Arm [다운로드 페이지](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)에서 사용할 수 있습니다.

## MicroSD 플래시 {#flashing-the-microsd}

Raspberry Pi에 사용할 MicroSD 카드는 플래시할 수 있도록 먼저 데스크톱이나 노트북에 삽입해야 합니다. 그런 다음 다음 터미널 명령을 실행하여 다운로드한 이미지를 SD 카드에 플래시합니다.

```shell
# MicroSD 카드 이름 확인
sudo fdisk -l

>> sdxxx
```

다음 명령에는 이미지를 푸시하기 전에 카드의 기존 콘텐츠를 완전히 지우는 `dd`가 포함되어 있으므로 이름을 올바르게 지정하는 것이 매우 중요합니다. 계속하려면 압축된 이미지가 포함된 디렉터리로 이동합니다.

```shell
# 압축 해제 및 이미지 플래시
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

이제 카드가 플래시되었으므로 Raspberry Pi에 삽입할 수 있습니다.

## 노드 시작 {#start-the-node}

SD 카드를 Raspberry Pi에 삽입한 상태에서 이더넷 케이블과 SSD를 연결한 다음 전원을 켭니다. OS가 부팅되고 클라이언트 소프트웨어 설치 및 빌드를 포함하여 Raspberry Pi를 이더리움 노드로 바꾸는 사전 구성된 작업을 자동으로 수행하기 시작합니다. 이 작업은 아마도 10\~15분 정도 걸릴 것입니다.

모든 설치 및 구성이 완료되면 ssh 연결을 통해 장치에 로그인하거나 보드에 모니터와 키보드가 연결된 경우 터미널을 직접 사용하여 로그인합니다. 노드를 시작하는 데 필요한 권한이 있는 `ethereum` 계정을 사용하여 로그인합니다.

```shell
User: ethereum
Password: ethereum
```

기본 실행 클라이언트인 고 이더리움 (geth)이 자동으로 시작됩니다. 다음 터미널 명령을 사용하여 로그를 확인하여 이를 확인할 수 있습니다.

```sh
sudo journalctl -u geth -f
```

합의 클라이언트는 명시적으로 시작해야 합니다. 이렇게 하려면 먼저 라이트하우스가 피어를 찾고 연결할 수 있도록 라우터에서 포트 9000을 엽니다. 그런 다음 라이트하우스 서비스를 활성화하고 시작합니다.

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

로그를 사용하여 클라이언트를 확인합니다.

```sh
sudo journalctl -u lighthouse-beacon
```

합의 클라이언트는 체크포인트 동기화를 사용하므로 몇 분 안에 동기화됩니다. 실행 클라이언트는 더 오래 걸리며(잠재적으로 몇 시간), 합의 클라이언트가 동기화를 완료할 때까지 시작되지 않습니다(실행 클라이언트는 동기화할 대상이 필요하며, 이는 동기화된 합의 클라이언트가 제공하기 때문입니다).

고 이더리움 (geth) 및 라이트하우스 서비스가 실행되고 동기화되면 이제 Raspberry Pi가 이더리움 노드가 됩니다! 포트 8545에서 고 이더리움 (geth) 클라이언트에 연결할 수 있는 고 이더리움 (geth)의 JavaScript 콘솔을 사용하여 이더리움 네트워크와 상호 작용하는 것이 가장 일반적입니다. Curl과 같은 요청 도구를 사용하여 JSON 객체 형식의 명령을 제출할 수도 있습니다. 자세한 내용은 [고 이더리움 (geth) 문서](https://geth.ethereum.org/)를 참조하세요.

고 이더리움 (geth)은 브라우저에서 볼 수 있는 Grafana 대시보드에 지표를 보고하도록 사전 구성되어 있습니다. 고급 사용자는 `ipaddress:3000`로 이동하여 `user: admin` 및 `passwd: ethereum`를 전달하여 노드의 상태를 모니터링하는 데 이 기능을 사용할 수 있습니다.

## 검증자 {#validators}

선택적으로 합의 클라이언트에 검증자를 추가할 수도 있습니다. 검증자 소프트웨어를 사용하면 노드가 합의에 적극적으로 참여하고 네트워크에 암호경제적 보안을 제공할 수 있습니다. 이 작업에 대한 보상으로 ETH를 받습니다. 검증자를 실행하려면 먼저 32 ETH가 있어야 하며, 이를 예치 컨트랙트에 예치해야 합니다. 예치는 [런치패드](https://launchpad.ethereum.org/)의 단계별 가이드에 따라 수행할 수 있습니다. 이 작업은 데스크톱/노트북에서 수행하되 키는 생성하지 마세요. 키 생성은 Raspberry Pi에서 직접 수행할 수 있습니다.

Raspberry Pi에서 터미널을 열고 다음 명령을 실행하여 예치 키를 생성합니다.

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(또는 에어갭 머신에서 실행할 [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli)를 다운로드하고 `deposit new-mnemnonic` 명령을 실행합니다.)

니모닉 문구를 안전하게 보관하세요! 위의 명령은 노드의 키스토어에 검증자 키와 예치 데이터 파일이라는 두 개의 파일을 생성했습니다. 예치 데이터는 런치패드에 업로드해야 하므로 Raspberry Pi에서 데스크톱/노트북으로 복사해야 합니다. 이는 ssh 연결이나 다른 복사/붙여넣기 방법을 사용하여 수행할 수 있습니다.

런치패드를 실행하는 컴퓨터에서 예치 데이터 파일을 사용할 수 있게 되면 런치패드 화면의 `+`에 끌어다 놓을 수 있습니다. 화면의 지침에 따라 예치 컨트랙트로 트랜잭션을 보냅니다.

다시 Raspberry Pi로 돌아가서 검증자를 시작할 수 있습니다. 이를 위해서는 검증자 키를 가져오고, 보상을 수집할 주소를 설정한 다음, 사전 구성된 검증자 프로세스를 시작해야 합니다. 아래 예시는 라이트하우스용입니다. 다른 합의 클라이언트에 대한 지침은 [Ethereum on Arm 문서](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)에서 확인할 수 있습니다.

```shell
# 검증자 키 가져오기
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 보상 주소 설정
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# 검증자 시작
sudo systemctl start lighthouse-validator
```

축하합니다. 이제 Raspberry Pi에서 완전한 이더리움 노드와 검증자가 실행되고 있습니다!

## 자세한 내용 {#more-details}

이 페이지에서는 Raspberry Pi를 사용하여 고 이더리움 (geth)-라이트하우스 노드 및 검증자를 설정하는 방법에 대한 개요를 제공했습니다. 더 자세한 지침은 [Ethereum-on-Arm 웹사이트](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)에서 확인할 수 있습니다.

## 피드백 환영 {#feedback-appreciated}

Raspberry Pi는 이더리움 네트워크의 건전성에 매우 긍정적인 영향을 미칠 수 있는 방대한 사용자 기반을 보유하고 있습니다.
이 튜토리얼의 세부 사항을 살펴보고, 테스트넷에서 실행해 보고, Ethereum on Arm GitHub를 확인하고, 피드백을 제공하고, 이슈 및 풀 리퀘스트를 제기하여 기술과 문서를 발전시키는 데 도움을 주세요!

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org