---
title: "Raspberry Pi 5에서 이더리움 노드 실행하기"
description: "Raspberry Pi 5를 플래시하고, 이더넷 케이블을 꽂고, NVMe 디스크를 연결한 다음 기기의 전원을 켜서 Raspberry Pi 5를 완전한 이더리움 노드 및 검증자로 만들어 보세요."
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

- 16GB RAM이 장착된 Raspberry Pi 5
- NVMe 디스크를 연결하기 위한 Raspberry Pi 5용 NVMe HAT
- NVMe SSD(M.2 2280), 최소 4TB. 호환성 문제가 알려진 Phison 컨트롤러가 있는 디스크는 피하세요.
- MicroSD 카드(최소 16GB Class 10)
- 전원 공급 장치
- 이더넷 케이블
- 포트 포워딩(자세한 내용은 클라이언트 참조)
- 방열판이 있는 케이스
- USB 키보드, 모니터 및 HDMI 케이블(micro-HDMI) (선택 사항)

Ethereum on Arm은 NanoPC T6, Rock 5B, Orange Pi 5 Plus와 같은 다른 ARM 보드도 지원합니다. 이러한 보드는 기본적으로 NVMe를 지원하므로, 새 하드웨어를 구입하는 경우 Ethereum on Arm 팀은 Raspberry Pi 5보다 이 보드들을 권장합니다. 자세한 내용은 [권장 하드웨어 목록](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html)을 참조하세요. 다운로드하는 이미지 파일을 제외하고 이 튜토리얼의 나머지 부분은 지원되는 모든 보드에서 동일합니다.

## 왜 ARM에서 이더리움을 실행해야 할까요? {#why-run-ethereum-on-arm}

ARM 보드는 매우 저렴하고 유연하며 작은 컴퓨터입니다. 저렴하게 구입할 수 있고, 모든 리소스를 노드에만 집중하도록 구성하여 효율성을 높일 수 있으며, 전력 소비가 적고 물리적으로 작아 어느 가정에나 눈에 띄지 않게 배치할 수 있기 때문에 이더리움 노드를 실행하는 데 좋은 선택입니다. 또한 소프트웨어를 다운로드하거나 빌드할 필요 없이 Raspberry Pi의 MicroSD에 사전 빌드된 이미지를 플래시하기만 하면 되므로 노드를 가동하는 것도 매우 쉽습니다.

## 어떻게 작동하나요? {#how-does-it-work}

Raspberry Pi의 메모리 카드는 사전 빌드된 이미지로 플래시됩니다. 이 이미지에는 이더리움 노드를 실행하는 데 필요한 모든 것이 포함되어 있습니다. 플래시된 카드가 있으면 사용자는 Raspberry Pi의 전원을 켜기만 하면 됩니다. 노드를 실행하는 데 필요한 모든 프로세스가 자동으로 시작됩니다. 메모리 카드에는 기기를 이더리움 노드로 바꾸는 시스템 수준 프로세스가 자동으로 실행되는 Linux 기반 운영 체제(OS)가 포함되어 있기 때문에 가능합니다.

Ethereum on Arm 이미지는 이더리움 노드 실행에 최적화된 64비트 Linux 배포판을 기반으로 하며, 사전 빌드된 이더리움 클라이언트를 포함합니다.

**이미지는 환경 설정 및 NVMe 디스크 포맷부터 이더리움 소프트웨어 설치에 이르기까지 필요한 모든 단계를 처리합니다.**

## 실행 및 합의 클라이언트에 대한 참고 사항 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 이미지에는 사전 빌드된 실행 및 합의 클라이언트가 서비스로 포함되어 있습니다. 이더리움 노드는 두 클라이언트가 모두 동기화되고 실행되어야 합니다. 이미지를 다운로드하고 플래시한 다음 서비스를 시작하기만 하면 됩니다. 이미지에는 여러 실행 클라이언트(Geth, Nethermind, Besu, Erigon, Reth 등)와 합의 클라이언트(Lighthouse, Prysm, Teku, Nimbus, Lodestar 등)가 사전 로드되어 있습니다. 현재 목록은 [Ethereum on Arm 문서](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html)를 참조하세요.

각각 하나씩 선택하여 실행해야 합니다. 모든 실행 클라이언트는 모든 합의 클라이언트와 호환됩니다. 이 튜토리얼에서는 Geth와 Lighthouse를 사용합니다.

## 이미지 다운로드 {#downloading-the-image}

Ethereum on Arm 이미지는 실행 및 합의 클라이언트를 모두 자동으로 설치하고 설정하여 서로 통신하고 이더리움 네트워크에 연결하도록 구성하는 "플러그 앤 플레이" 이미지입니다. 사용자는 간단한 명령을 사용하여 프로세스를 시작하기만 하면 됩니다.

[Ethereum on Arm 다운로드 페이지](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads)에서 보드에 맞는 최신 이미지를 다운로드하세요. 다운로드 페이지에는 각 이미지의 SHA256 체크섬도 나열되어 있습니다. 다운로드한 파일을 이 체크섬과 비교하여 확인하세요.

```sh
# 다운로드한 이미지가 포함된 디렉터리에서
sha256sum ethonarm_rpi5_<version>.img.zip
# 출력을 다운로드 페이지의 체크섬과 비교
```

## MicroSD 플래시 {#flashing-the-microsd}

Raspberry Pi에 사용할 MicroSD 카드를 먼저 데스크톱이나 노트북에 삽입하여 플래시할 수 있도록 해야 합니다. 그런 다음 다음 터미널 명령을 사용하여 다운로드한 이미지를 SD 카드에 플래시합니다.

```shell
# MicroSD 카드 이름 확인
sudo fdisk -l

>> sdxxx
```

다음 명령에는 이미지를 카드에 밀어넣기 전에 카드의 기존 콘텐츠를 완전히 지우는 `dd`가 포함되어 있으므로 이름을 정확하게 입력하는 것이 매우 중요합니다. 계속하려면 압축된 이미지가 포함된 디렉터리로 이동하세요.

```shell
# 압축 해제 및 이미지 플래시
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

이제 카드가 플래시되었으므로 Raspberry Pi에 삽입할 수 있습니다.

## 노드 시작 {#start-the-node}

SD 카드를 Raspberry Pi에 삽입한 상태에서 이더넷 케이블과 NVMe 디스크를 연결한 다음 전원을 켭니다. OS가 부팅되고 NVMe 디스크 포맷 및 클라이언트 소프트웨어 설치를 포함하여 Raspberry Pi를 이더리움 노드로 바꾸는 사전 구성된 작업을 자동으로 수행하기 시작합니다. 이 작업은 아마도 10\~15분 정도 걸릴 것이며, 완료되면 보드가 자동으로 재부팅됩니다. 이 시간 동안 전원 공급을 중단하지 마세요.

모든 것이 설치되고 구성되면 ssh 연결을 통해 기기에 로그인하거나 모니터와 키보드가 보드에 연결된 경우 터미널을 직접 사용하여 로그인합니다. 노드를 시작하는 데 필요한 권한이 있는 `ethereum` 계정을 사용하여 로그인하세요.

```shell
User: ethereum
Password: ethereum
```

첫 로그인 시 기본 비밀번호를 변경하라는 메시지가 표시됩니다. 노드에 접근할 수 있는 누구나 기본 비밀번호로 로그인할 수 있으므로 비밀번호를 변경하세요. 시스템 방화벽은 기본적으로 비활성화되어 있으므로 노드에 공인 IP 주소가 있는 경우 [Ethereum on Arm 보안 가이드](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html)를 참조하여 활성화하세요.

합의 클라이언트를 먼저 시작합니다. Lighthouse가 피어를 찾고 연결할 수 있도록 라우터에서 포트 9000(TCP 및 UDP)을 엽니다. 그런 다음 lighthouse 서비스를 활성화하고 시작하여 재부팅 후에도 다시 시작되도록 합니다.

```sh
sudo systemctl enable --now lighthouse-beacon
```

로그를 사용하여 클라이언트를 확인합니다.

```sh
sudo journalctl -u lighthouse-beacon -f
```

다음으로 실행 클라이언트를 시작합니다. Geth가 피어를 찾고 연결할 수 있도록 라우터에서 포트 30303(TCP 및 UDP)을 엽니다. 그런 다음 geth 서비스를 활성화하고 시작합니다.

```sh
sudo systemctl enable --now geth
```

로그를 확인하여 실행 중인지 확인할 수 있습니다.

```sh
sudo journalctl -u geth -f
```

합의 클라이언트는 체크포인트 동기화를 사용하므로 몇 분 안에 동기화됩니다. 실행 클라이언트는 더 오래 걸리며 잠재적으로 몇 시간이 걸릴 수 있습니다. 두 클라이언트는 동시에 실행됩니다. 합의 클라이언트는 실행 클라이언트에게 체인의 헤드인 블록을 알려주고, 실행 클라이언트는 해당 블록까지 다운로드하고 검증합니다.

Geth 및 Lighthouse 서비스가 실행되고 동기화되면 이제 Raspberry Pi가 이더리움 노드가 됩니다! 포트 8545에서 Geth 클라이언트에 연결할 수 있는 Geth의 JavaScript 콘솔을 사용하여 이더리움 네트워크와 상호 작용하는 것이 가장 일반적입니다. Curl과 같은 요청 도구를 사용하여 JSON 객체 형식의 명령을 제출할 수도 있습니다. 자세한 내용은 [Geth 문서](https://geth.ethereum.org/)를 참조하세요.

이미지에는 고급 사용자가 브라우저에서 `ipaddress:3000`로 이동하여 노드의 상태를 모니터링하는 데 사용할 수 있는 Grafana 대시보드도 포함되어 있습니다.

## 검증자 {#validators}

합의 클라이언트에 선택적으로 검증자를 추가할 수도 있습니다. 검증자 소프트웨어를 사용하면 노드가 합의에 적극적으로 참여하고 네트워크에 암호경제적 보안을 제공할 수 있습니다. 이 작업에 대한 보상으로 ETH를 받습니다. 검증자를 실행하려면 먼저 32 ETH가 있어야 하며, 이를 예치 컨트랙트에 예치해야 합니다. 예치는 [런치패드](https://launchpad.ethereum.org/)의 단계별 가이드에 따라 수행할 수 있습니다. 이 작업은 데스크톱/노트북에서 수행하되 키는 생성하지 마세요. 키 생성은 Raspberry Pi에서 직접 수행할 수 있습니다.

[ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) 도구는 검증자 키를 생성합니다. 현재 이미지에는 이 도구가 포함되어 있습니다. 이전 이미지를 실행 중인 경우 먼저 설치하세요. 그런 다음 `<YOUR_ETH_ADDRESS>`를 출금액을 받을 주소로 바꾸어 예치 키를 생성합니다.

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(또는 에어갭 머신에서 실행할 [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli)를 다운로드하고 그곳에서 `deposit new-mnemonic` 명령을 실행하세요.)

니모닉 문구를 안전하게 보관하세요! 위의 명령은 `validator_keys` 디렉터리에 검증자 키와 예치 데이터 파일이라는 두 개의 파일을 생성했습니다. 예치 데이터는 런치패드에 업로드해야 하므로 Raspberry Pi에서 데스크톱/노트북으로 복사해야 합니다. 이 작업은 ssh 연결이나 다른 복사/붙여넣기 방법을 사용하여 수행할 수 있습니다.

런치패드를 실행하는 컴퓨터에서 예치 데이터 파일을 사용할 수 있게 되면 런치패드 화면의 `+`에 끌어다 놓을 수 있습니다. 화면의 지침에 따라 예치 컨트랙트로 트랜잭션을 보냅니다.

다시 Raspberry Pi로 돌아와서 검증자를 시작할 수 있습니다. 이를 위해서는 검증자 키를 가져오고, 보상을 수집할 주소를 설정한 다음, 사전 구성된 검증자 프로세스를 시작해야 합니다. 아래 예시는 Lighthouse에 대한 것입니다. 다른 합의 클라이언트에 대한 지침은 [Ethereum on Arm 문서](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html)에서 확인할 수 있습니다.

```shell
# 검증자 키 가져오기
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 보상 주소 설정 (<YOUR_ETH_ADDRESS>를 본인의 주소로 변경)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# 검증자 시작
sudo systemctl enable --now lighthouse-validator
```

축하합니다. 이제 Raspberry Pi에서 완전한 이더리움 노드와 검증자가 실행되고 있습니다!

## 자세한 내용 {#more-details}

이 페이지에서는 Raspberry Pi를 사용하여 고 이더리움 (geth)-라이트하우스 노드 및 검증자를 설정하는 방법에 대한 개요를 제공했습니다. 더 자세한 지침은 [Ethereum-on-Arm 웹사이트](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)에서 확인할 수 있습니다.

## 피드백 환영 {#feedback-appreciated}

우리는 Raspberry Pi가 이더리움 네트워크의 건전성에 매우 긍정적인 영향을 미칠 수 있는 방대한 사용자 기반을 가지고 있다는 것을 알고 있습니다.
이 튜토리얼의 세부 사항을 살펴보고, 테스트넷에서 실행해 보고, [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm)를 확인하고, 피드백을 제공하고, 이슈 및 풀 리퀘스트를 제기하여 기술과 문서를 발전시키는 데 도움을 주세요!

## 참고 자료 {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
