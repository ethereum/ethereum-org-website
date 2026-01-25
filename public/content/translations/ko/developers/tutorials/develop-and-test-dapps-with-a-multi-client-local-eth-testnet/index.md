---
title: 로컬, 멀티클라이언트 테스트넷에서 dApp을 개발하고 테스트하는 방법
description: 이 가이드에서는 먼저 다중 클라이언트 로컬 이더리움 테스트넷을 인스턴스화하고 구성하는 방법을 안내한 다음, 테스트넷을 사용하여 dApp을 배포하고 테스트합니다.
author: "Tedi Mitiku"
tags:
  [
    "클라이언트",
    "노드",
    "스마트 계약",
    "결합성",
    "합의 레이어",
    "실행 레이어",
    "테스트"
  ]
skill: intermediate
lang: ko
published: 2023-04-11
---

## 소개 {#introduction}

이 가이드는 구성 가능한 로컬 이더리움 테스트넷을 인스턴스화하고, 스마트 계약을 배포하며, 테스트넷을 사용하여 dApp에 대한 테스트를 실행하는 과정을 안내합니다. 이 가이드는 라이브 테스트넷이나 메인넷에 배포하기 전에 다양한 네트워크 구성에 대해 로컬에서 dApp을 개발하고 테스트하려는 dApp 개발자를 위해 설계되었습니다.

이 가이드에서는 다음을 수행합니다.

- [Kurtosis](https://www.kurtosis.com/)를 사용하여 [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)로 로컬 이더리움 테스트넷을 인스턴스화합니다.
- Hardhat dApp 개발 환경을 로컬 테스트넷에 연결하여 dApp을 컴파일, 배포 및 테스트합니다.
- 노드 수 및 특정 EL/CL 클라이언트 페어링과 같은 파라미터를 포함하여 로컬 테스트넷을 구성하여 다양한 네트워크 구성에 대한 개발 및 테스트 워크플로를 활성화합니다.

### Kurtosis란 무엇인가요? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/)는 다중 컨테이너 테스트 환경 구성을 위해 설계된 구성 가능한 빌드 시스템입니다. 이를 통해 개발자는 블록체인 테스트넷과 같이 동적 설정 로직이 필요한 재현 가능한 환경을 만들 수 있습니다.

이 가이드에서 Kurtosis eth-network-package는 [`geth`](https://geth.ethereum.org/) 실행 레이어(EL) 클라이언트와 [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), [`lodestar`](https://lodestar.chainsafe.io/) 합의 레이어(CL) 클라이언트를 지원하는 로컬 이더리움 테스트넷을 가동합니다. 이 패키지는 Hardhat Network, Ganache, Anvil과 같은 프레임워크의 네트워크에 대한 구성 가능하고 조합 가능한 대안 역할을 합니다. Kurtosis는 개발자가 사용하는 테스트넷에 대한 더 큰 제어와 유연성을 제공하며, 이것이 [이더리움 재단이 머지를 테스트하기 위해 Kurtosis를 사용한](https://www.kurtosis.com/blog/testing-the-ethereum-merge) 주된 이유이며 네트워크 업그레이드를 테스트하기 위해 계속 사용하고 있습니다.

## Kurtosis 설정 {#setting-up-kurtosis}

진행하기 전에 다음을 확인하십시오.

- 로컬 머신에 [Docker 엔진을 설치하고 시작](https://docs.kurtosis.com/install/#i-install--start-docker)했습니다.
- [Kurtosis CLI를 설치](https://docs.kurtosis.com/install#ii-install-the-cli)했습니다(CLI가 이미 설치되어 있는 경우 최신 릴리스로 업그레이드).
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), [npx](https://www.npmjs.com/package/npx)를 설치했습니다(dApp 환경용).

## 로컬 이더리움 테스트넷 인스턴스화 {#instantiate-testnet}

로컬 이더리움 테스트넷을 가동하려면 다음을 실행하세요.

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

참고: 이 명령어는 '--enclave' 플래그를 사용하여 네트워크 이름을 "local-eth-testnet"으로 지정합니다.

Kurtosis는 지침을 해석, 검증 및 실행하는 동안 내부적으로 수행하는 단계를 출력합니다. 마지막으로 다음과 유사한 출력이 표시되어야 합니다.

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED
```

축하합니다! Docker를 통해 Kurtosis를 사용하여 CL(`lighthouse`) 및 EL 클라이언트(`geth`)가 있는 로컬 이더리움 테스트넷을 인스턴스화했습니다.

### 검토 {#review-instantiate-testnet}

이 섹션에서는 Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) 내에서 로컬 이더리움 테스트넷을 시작하기 위해 Kurtosis가 [GitHub에 원격으로 호스팅된 `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)를 사용하도록 지시하는 명령을 실행했습니다. 엔클레이브 내부에는 "파일 아티팩트"와 "사용자 서비스"가 모두 있습니다.

엔클레이브의 [파일 아티팩트](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)에는 EL 및 CL 클라이언트를 부트스트랩하기 위해 생성 및 활용된 모든 데이터가 포함됩니다. 데이터는 이 [Docker 이미지](https://github.com/ethpandaops/ethereum-genesis-generator)에서 빌드된 `prelaunch-data-generator` 서비스를 사용하여 생성되었습니다.

사용자 서비스는 엔클레이브에서 작동하는 모든 컨테이너화된 서비스를 표시합니다. EL 클라이언트와 CL 클라이언트를 모두 갖춘 단일 노드가 생성된 것을 알 수 있습니다.

## dApp 개발 환경을 로컬 이더리움 테스트넷에 연결 {#connect-your-dapp}

### dApp 개발 환경 설정 {#set-up-dapp-env}

이제 실행 중인 로컬 테스트넷이 있으므로 dApp 개발 환경을 연결하여 로컬 테스트넷을 사용할 수 있습니다. 이 가이드에서는 Hardhat 프레임워크를 사용하여 블랙잭 dApp을 로컬 테스트넷에 배포합니다.

dApp 개발 환경을 설정하려면 샘플 dApp이 포함된 저장소를 클론하고 종속성을 설치한 후 다음을 실행하세요.

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

여기서 사용되는 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 폴더에는 [Hardhat](https://hardhat.org/) 프레임워크를 사용하는 dApp 개발자를 위한 일반적인 설정이 포함되어 있습니다.

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)에는 Blackjack dApp을 위한 몇 가지 간단한 스마트 계약이 포함되어 있습니다.
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)에는 로컬 이더리움 네트워크에 토큰 계약을 배포하는 스크립트가 포함되어 있습니다.
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)에는 토큰 계약에 대한 간단한 .js 테스트가 포함되어 있으며, Blackjack dApp의 각 플레이어에게 1000개가 민팅되었는지 확인합니다.
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts)는 Hardhat 설정을 구성합니다.

### 로컬 테스트넷을 사용하도록 Hardhat 구성 {#configure-hardhat}

dApp 개발 환경이 설정되었으므로 이제 Kurtosis를 사용하여 생성된 로컬 이더리움 테스트넷을 사용하도록 Hardhat을 연결합니다. 이를 위해 `hardhat.config.ts` 구성 파일의 `localnet` 구조체에서 `<$YOUR_PORT>`를 `el-client-<num>` 서비스의 rpc uri 출력 포트로 바꿉니다. 이 샘플의 경우 포트는 `64248`입니다. 사용자의 포트는 다를 것입니다.

`hardhat.config.ts`의 예시:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT를 ETH 네트워크 KURTOSIS 패키지에서 생성한 노드 URI의 포트로 교체하세요

// 이들은 eth-network-package에 의해 생성된, 사전에 자금이 충전된 테스트 계정과 연관된 개인 키입니다
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

파일을 저장하면 Hardhat dApp 개발 환경이 로컬 이더리움 테스트넷에 연결됩니다! 다음을 실행하여 테스트넷이 작동하는지 확인할 수 있습니다.

```python
npx hardhat balances --network localnet
```

출력은 다음과 같아야 합니다.

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

이는 Hardhat이 로컬 테스트넷을 사용하고 있으며 `eth-network-package`에 의해 생성된 사전에 자금이 충전된 계정을 감지했음을 확인합니다.

### 로컬에서 dApp 배포 및 테스트 {#deploy-and-test-dapp}

dApp 개발 환경이 로컬 이더리움 테스트넷에 완전히 연결되었으므로 이제 로컬 테스트넷을 사용하여 dApp에 대한 개발 및 테스트 워크플로를 실행할 수 있습니다.

`ChipToken.sol` 스마트 계약을 로컬 프로토타이핑 및 개발을 위해 컴파일하고 배포하려면 다음을 실행하세요.

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

출력은 다음과 같아야 합니다.

```python
ChipToken이 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d에 배포되었습니다
```

이제 로컬 dApp에 대해 `simple.js` 테스트를 실행하여 Blackjack dApp의 각 플레이어에게 1000개가 민팅되었는지 확인하세요.

출력은 다음과 같아야 합니다.

```python
npx hardhat test --network localnet
```

출력은 다음과 같아야 합니다.

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### 검토 {#review-dapp-workflows}

이 시점에서 dApp 개발 환경을 설정하고, Kurtosis가 생성한 로컬 이더리움 네트워크에 연결했으며, dApp에 대해 컴파일, 배포 및 간단한 테스트를 실행했습니다.

이제 다양한 네트워크 구성에서 dApp을 테스트하기 위해 기본 네트워크를 구성하는 방법을 살펴보겠습니다.

## 로컬 이더리움 테스트넷 구성 {#configure-testnet}

### 클라이언트 구성 및 노드 수 변경 {#configure-client-config-and-num-nodes}

로컬 이더리움 테스트넷은 개발 또는 테스트하려는 시나리오 및 특정 네트워크 구성에 따라 다양한 EL 및 CL 클라이언트 쌍과 다양한 수의 노드를 사용하도록 구성할 수 있습니다. 즉, 일단 설정되면 맞춤형 로컬 테스트넷을 가동하고 이를 사용하여 동일한 워크플로(배포, 테스트 등)를 실행할 수 있습니다. 다양한 네트워크 구성 하에서 모든 것이 예상대로 작동하는지 확인합니다. 수정할 수 있는 다른 파라미터에 대해 자세히 알아보려면 이 링크를 방문하세요.

시도해 보세요! JSON 파일을 통해 `eth-network-package`에 다양한 구성 옵션을 전달할 수 있습니다. 이 네트워크 파라미터 JSON 파일은 Kurtosis가 로컬 이더리움 네트워크를 설정하는 데 사용할 특정 구성을 제공합니다.

기본 구성 파일을 사용하여 다른 EL/CL 쌍을 가진 두 개의 노드를 시작하도록 편집하세요.

- 노드 1: `geth`/`lighthouse`
- 노드 2: `geth`/`lodestar`
- 노드 3: `geth`/`teku`

이 구성은 dApp 테스트를 위해 이더리움 노드 구현의 이기종 네트워크를 생성합니다. 이제 구성 파일은 다음과 같이 표시됩니다.

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

각 `participants` 구조체는 네트워크의 노드에 매핑되므로 3개의 `participants` 구조체는 Kurtosis에게 네트워크에 3개의 노드를 가동하도록 지시합니다. 각 `participants` 구조체를 통해 특정 노드에 사용되는 EL 및 CL 쌍을 지정할 수 있습니다.

`network_params` 구조체는 각 노드의 제네시스 파일을 생성하는 데 사용되는 네트워크 설정과 네트워크의 슬롯당 시간(초)과 같은 기타 설정을 구성합니다.

편집한 파라미터 파일을 원하는 디렉터리에 저장하고(아래 예에서는 바탕화면에 저장됨) 다음을 실행하여 Kurtosis 패키지를 실행하는 데 사용합니다.

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

참고: `kurtosis clean -a` 명령어는 Kurtosis에게 새 테스트넷을 시작하기 전에 이전 테스트넷과 그 내용을 파괴하도록 지시하는 데 사용됩니다.

다시 한 번, Kurtosis가 잠시 작동하고 진행 중인 개별 단계를 출력합니다. 결과적으로 출력은 다음과 같아야 합니다.

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

축하합니다! 로컬 테스트넷을 1개가 아닌 3개의 노드를 갖도록 성공적으로 구성했습니다. dApp에 대해 이전과 동일한 워크플로(배포 및 테스트)를 실행하려면 `hardhat.config.ts` 구성 파일의 `localnet` 구조체에서 `<$YOUR_PORT>`를 새 3노드 로컬 테스트넷의 `el-client-<num>` 서비스에서 출력된 rpc uri의 포트로 바꾸어 이전과 동일한 작업을 수행하세요.

## 결론 {#conclusion}

이것으로 끝입니다! 이 짧은 가이드를 요약하자면 다음과 같습니다.

- Kurtosis를 사용하여 Docker를 통해 로컬 이더리움 테스트넷을 생성했습니다.
- 로컬 dApp 개발 환경을 로컬 이더리움 네트워크에 연결했습니다.
- 로컬 이더리움 네트워크에서 dApp을 배포하고 간단한 테스트를 실행했습니다.
- 기본 이더리움 네트워크를 3개의 노드를 갖도록 구성했습니다.

잘된 점, 개선할 점 또는 질문에 대한 답변에 대해 여러분의 의견을 듣고 싶습니다. 주저하지 마시고 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)를 통해 연락하시거나 [이메일을 보내주세요](mailto:feedback@kurtosistech.com)!

### 기타 예제 및 가이드 {#other-examples-guides}

[빠른 시작](https://docs.kurtosis.com/quickstart)(Postgres 데이터베이스와 API를 구축)과 [awesome-kurtosis 저장소](https://github.com/kurtosis-tech/awesome-kurtosis)의 다른 예제를 확인해 보시기 바랍니다. 여기에는 다음 패키지를 포함한 훌륭한 예제가 있습니다.

- 동일한 로컬 이더리움 테스트넷을 가동하지만 트랜잭션 스패머(트랜잭션 시뮬레이션용), 포크 모니터, 연결된 Grafana 및 Prometheus 인스턴스와 같은 추가 서비스가 연결되어 있습니다.
- 동일한 로컬 이더리움 네트워크에 대한 [하위 네트워킹 테스트](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) 수행
