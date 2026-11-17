---
title: "로컬 다중 클라이언트 테스트넷에서 dApp을 개발하고 테스트하는 방법"
description: "이 가이드에서는 다중 클라이언트 로컬 이더리움 테스트넷을 인스턴스화하고 구성하는 방법을 먼저 살펴본 다음, 해당 테스트넷을 사용하여 dApp을 배포하고 테스트하는 방법을 안내합니다."
author: "테디 미티쿠"
tags:
  [
    "클라이언트",
    "노드",
    "스마트 컨트랙트",
    "조합 가능성",
    "합의 레이어",
    "실행 계층",
    "테스트",
  ]
skill: intermediate
breadcrumb: "다중 클라이언트 테스트넷"
lang: ko
published: 2023-04-11
---

## 소개 {#introduction}

이 가이드는 구성 가능한 로컬 이더리움 테스트넷을 인스턴스화하고, 여기에 스마트 컨트랙트를 배포하며, 테스트넷을 사용하여 탈중앙화 애플리케이션(dapp)에 대한 테스트를 실행하는 과정을 안내합니다. 이 가이드는 라이브 테스트넷이나 메인넷에 배포하기 전에 다양한 네트워크 구성에 대해 로컬에서 dapp을 개발하고 테스트하려는 dapp 개발자를 위해 작성되었습니다.

이 가이드에서 다룰 내용은 다음과 같습니다.

- [Kurtosis](https://www.kurtosis.com/)를 사용하여 [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) 패키지로 로컬 이더리움 테스트넷 인스턴스화
- Hardhat dApp 개발 환경을 로컬 테스트넷에 연결하여 dApp을 컴파일, 배포 및 테스트
- 노드 수 및 특정 EL/CL 클라이언트 쌍과 같은 매개변수를 포함하여 로컬 테스트넷을 구성하여 다양한 네트워크 구성에 대한 개발 및 테스트 워크플로 활성화

### Kurtosis란 무엇인가요? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/)는 다중 컨테이너 테스트 환경을 구성하도록 설계된 조합 가능한 빌드 시스템입니다. 특히 개발자가 블록체인 테스트넷과 같이 동적 설정 로직이 필요한 재현 가능한 환경을 만들 수 있도록 지원합니다.

이 가이드에서는 [ethPandaOps](https://ethpandaops.io/)가 유지 관리하는 Kurtosis `ethereum-package`를 사용하여 로컬 이더리움 테스트넷을 구동합니다. 이 패키지는 [`geth`](https://geth.ethereum.org/)와 같은 모든 주요 실행 계층(EL) 클라이언트와 [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), [`lodestar`](https://lodestar.chainsafe.io/)와 같은 합의 레이어(CL) 클라이언트를 지원합니다. 이 패키지는 Hardhat Network 및 Anvil과 같은 프레임워크의 네트워크에 대한 구성 가능하고 조합 가능한 대안 역할을 합니다. Kurtosis는 개발자에게 사용하는 테스트넷에 대한 더 큰 제어력과 유연성을 제공하며, 이는 이더리움 클라이언트 팀이 네트워크 업그레이드를 테스트할 때 이를 사용하는 주요 이유입니다.

## Kurtosis 설정 {#setting-up-kurtosis}

계속 진행하기 전에 다음 사항을 확인하세요.

- 로컬 머신에 [Docker 엔진을 설치하고 시작](https://docs.kurtosis.com/install/#i-install--start-docker)했는지 확인
- [Kurtosis CLI 설치](https://docs.kurtosis.com/install#ii-install-the-cli) (이미 CLI가 설치되어 있는 경우 최신 릴리스로 업그레이드)
- (dApp 환경을 위한) [Node.js](https://nodejs.org/en) 설치

## 로컬 이더리움 테스트넷 인스턴스화 {#instantiate-testnet}

로컬 이더리움 테스트넷을 구동하려면 다음을 실행하세요.

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

참고: 이 명령어는 `--enclave` 플래그를 사용하여 네트워크 이름을 "local-eth-testnet"으로 지정합니다.

Kurtosis는 명령을 해석, 검증 및 실행하기 위해 내부적으로 수행 중인 단계를 출력합니다. 마지막에는 생성된 엔클레이브(enclave)의 요약을 출력합니다. 요약에는 **파일 아티팩트(files artifacts)** 목록과 **사용자 서비스(user services)** 목록이 포함됩니다. 기본 구성에서 사용자 서비스에는 단일 노드가 포함됩니다.

- `el-1-geth-lighthouse`, `geth` 실행 클라이언트
- `cl-1-lighthouse-geth`, `lighthouse` 비콘 노드
- `vc-1-geth-lighthouse`, `lighthouse` 검증자 클라이언트

각 서비스는 노출하는 포트와 각각 매핑된 로컬 포트와 함께 나열됩니다. 예를 들어, `el-1-geth-lighthouse` 서비스의 `rpc` 포트는 dApp 도구가 사용할 JSON-RPC 엔드포인트입니다. 정확한 서비스 및 포트 번호는 머신마다 다를 수 있습니다.

다음을 실행하여 언제든지 이 요약을 다시 볼 수 있습니다.

```sh
kurtosis enclave inspect local-eth-testnet
```

축하합니다! Kurtosis를 사용하여 Docker 위에서 CL(`lighthouse`) 및 EL 클라이언트(`geth`)가 포함된 로컬 이더리움 테스트넷을 인스턴스화했습니다.

### 검토 {#review-instantiate-testnet}

이 섹션에서는 Kurtosis가 [GitHub에 원격으로 호스팅된 `ethereum-package`](https://github.com/ethpandaops/ethereum-package)를 사용하여 Kurtosis [엔클레이브(Enclave)](https://docs.kurtosis.com/advanced-concepts/enclaves/) 내에 로컬 이더리움 테스트넷을 구동하도록 지시하는 명령을 실행했습니다. 엔클레이브 내부에는 "파일 아티팩트"와 "사용자 서비스"가 모두 있습니다.

엔클레이브의 [파일 아티팩트](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)에는 제네시스 파일 및 검증자 키와 같이 EL 및 CL 클라이언트를 부트스트랩하기 위해 생성되고 활용되는 모든 데이터가 포함됩니다. 제네시스 데이터는 [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator)를 사용하여 생성되었습니다.

사용자 서비스는 엔클레이브에서 작동하는 모든 컨테이너화된 서비스를 표시합니다. EL 클라이언트와 CL 클라이언트를 모두 갖춘 단일 노드가 생성된 것을 확인할 수 있습니다.

## dApp 개발 환경을 로컬 이더리움 테스트넷에 연결 {#connect-your-dapp}

### dApp 개발 환경 설정 {#set-up-dapp-env}

이제 실행 중인 로컬 테스트넷이 있으므로, dApp 개발 환경을 연결하여 로컬 테스트넷을 사용할 수 있습니다. 이 가이드에서는 Hardhat 프레임워크를 사용하여 블랙잭 dApp을 로컬 테스트넷에 배포합니다.

dApp 개발 환경을 설정하려면 샘플 dApp이 포함된 리포지토리를 복제하고 종속성을 설치하세요. 다음을 실행합니다.

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

샘플 프로젝트의 일부 Hardhat 플러그인이 충돌하는 피어 종속성 버전을 선언하기 때문에 `--legacy-peer-deps` 플래그가 필요합니다.

여기서 사용된 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 폴더에는 [Hardhat](https://hardhat.org/) 프레임워크를 사용하는 dApp 개발자를 위한 일반적인 설정이 포함되어 있습니다.

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)에는 블랙잭 dApp을 위한 몇 가지 간단한 스마트 컨트랙트가 포함되어 있습니다.
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)에는 로컬 이더리움 네트워크에 토큰 컨트랙트를 배포하는 스크립트가 포함되어 있습니다.
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)에는 블랙잭 dApp의 각 플레이어에게 1000개의 토큰이 발행되었는지 확인하기 위한 토큰 컨트랙트용 간단한 .js 테스트가 포함되어 있습니다.
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts)는 Hardhat 설정을 구성합니다.

### 로컬 테스트넷을 사용하도록 Hardhat 구성 {#configure-hardhat}

dApp 개발 환경이 설정되었으므로, 이제 Kurtosis를 사용하여 생성된 로컬 이더리움 테스트넷을 사용하도록 Hardhat을 연결합니다. 먼저 실행 클라이언트의 JSON-RPC 엔드포인트 로컬 주소를 찾습니다.

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

출력은 `http://127.0.0.1:32769`와 같은 URL입니다. 포트는 다를 수 있습니다. `hardhat.config.ts` 구성 파일의 `localnet` 구조체에 있는 `<PORT>`를 이 포트로 바꿉니다.

`hardhat.config.ts`의 예시:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: <PORT>를 ETH 네트워크 Kurtosis 패키지에서 생성된 노드 URI의 포트로 교체하세요
  // 이것들은 eth-network-package에 의해 생성된 사전 충전된 테스트 계정과 관련된 프라이빗 키입니다
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

이 프라이빗 키는 공개적으로 알려진 테스트 키입니다. 메인넷이나 퍼블릭 네트워크에서는 절대 사용하지 마세요.

파일을 저장하면 Hardhat dApp 개발 환경이 로컬 이더리움 테스트넷에 연결됩니다! 다음을 실행하여 테스트넷이 작동하는지 확인할 수 있습니다.

```sh
npx hardhat balances --network localnet
```

출력에는 위 각 계정의 주소와 잔액이 나열됩니다. 예를 들어, 첫 번째 줄은 다음과 같아야 합니다.

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

이는 Hardhat이 로컬 테스트넷을 사용하고 있으며 `ethereum-package`에 의해 생성된 사전 자금이 지원된 계정을 감지함을 확인해 줍니다.

### 로컬에서 dApp 배포 및 테스트 {#deploy-and-test-dapp}

dApp 개발 환경이 로컬 이더리움 테스트넷에 완전히 연결되었으므로, 이제 로컬 테스트넷을 사용하여 dApp에 대한 개발 및 테스트 워크플로를 실행할 수 있습니다.

로컬 프로토타이핑 및 개발을 위해 `ChipToken.sol` 스마트 컨트랙트를 컴파일하고 배포하려면 다음을 실행하세요.

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

출력은 다음과 같아야 합니다.

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

이제 로컬 dApp에 대해 `ChipToken.js` 테스트를 실행하여 블랙잭 dApp의 각 플레이어에게 1000개의 토큰이 발행되었는지 확인해 보세요. 샘플 테스트는 여전히 ethers v5의 `deployed()` 함수를 사용하지만, ethers v6에서는 이를 `waitForDeployment()`로 대체했으므로 먼저 업데이트하세요.

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

그런 다음 테스트를 실행합니다.

```sh
npx hardhat test --network localnet
```

출력은 다음과 같아야 합니다.

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### 검토 {#review-dapp-workflows}

이 시점에서 dApp 개발 환경을 설정하고, Kurtosis가 생성한 로컬 이더리움 네트워크에 연결했으며, dApp을 컴파일, 배포하고 간단한 테스트를 실행했습니다.

이제 다양한 네트워크 구성에서 dApp을 테스트하기 위해 기본 네트워크를 구성하는 방법을 살펴보겠습니다.

## 로컬 이더리움 테스트넷 구성 {#configure-testnet}

### 클라이언트 구성 및 노드 수 변경 {#configure-client-config-and-num-nodes}

로컬 이더리움 테스트넷은 개발하거나 테스트하려는 시나리오 및 특정 네트워크 구성에 따라 다양한 EL 및 CL 클라이언트 쌍과 다양한 수의 노드를 사용하도록 구성할 수 있습니다. 즉, 한 번 설정하면 맞춤형 로컬 테스트넷을 구동하고 이를 사용하여 다양한 네트워크 구성에서 동일한 워크플로(배포, 테스트 등)를 실행하여 모든 것이 예상대로 작동하는지 확인할 수 있습니다. 수정할 수 있는 다른 매개변수에 대해 자세히 알아보려면 [`ethereum-package` 구성 문서](https://github.com/ethpandaops/ethereum-package#configuration)를 참조하세요.

한번 시도해 보세요! YAML 파일을 통해 `ethereum-package`에 다양한 구성 옵션을 전달할 수 있습니다. 이 네트워크 매개변수 파일은 Kurtosis가 로컬 이더리움 네트워크를 설정하는 데 사용할 특정 구성을 제공합니다.

서로 다른 EL/CL 쌍을 가진 세 개의 노드를 구동하는 `network_params.yaml`라는 파일을 만듭니다.

- 노드 1: `geth`/`lighthouse`
- 노드 2: `geth`/`lodestar`
- 노드 3: `geth`/`teku`

이 구성은 dApp 테스트를 위해 이더리움 노드 구현의 이기종 네트워크를 생성합니다. 구성 파일은 다음과 같아야 합니다.

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

`participants`의 각 항목은 네트워크의 노드에 매핑되므로, 3개의 `participants` 항목은 Kurtosis에 네트워크에서 3개의 노드를 구동하도록 지시합니다. 각 항목을 통해 해당 특정 노드에 사용되는 EL 및 CL 쌍을 지정할 수 있습니다. 지정하지 않은 매개변수는 기본값을 유지합니다.

`network_params` 구조체는 각 노드의 제네시스 파일을 생성하는 데 사용되는 네트워크 설정과 네트워크의 슬롯당 초와 같은 기타 설정을 구성합니다.

매개변수 파일을 저장한 다음, 이를 사용하여 다음을 실행하여 Kurtosis 패키지를 실행합니다.

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

참고: 여기서 `kurtosis clean -a` 명령어는 Kurtosis에 새 테스트넷을 시작하기 전에 이전 테스트넷과 그 내용을 파괴하도록 지시하는 데 사용됩니다.

다시 한 번, Kurtosis는 잠시 작동하며 진행 중인 개별 단계를 출력합니다. 결국 엔클레이브 요약을 출력합니다. 이번에는 사용자 서비스에 실행 클라이언트를 위한 `el-1-geth-lighthouse`, `el-2-geth-lodestar`, `el-3-geth-teku` 등 세 개의 노드와 일치하는 합의 및 검증자 클라이언트가 포함됩니다.

축하합니다! 로컬 테스트넷을 1개가 아닌 3개의 노드를 갖도록 성공적으로 구성했습니다. dApp에 대해 이전과 동일한 워크플로(배포 및 테스트)를 실행하려면, `hardhat.config.ts` 구성 파일의 `localnet` 구조체에 있는 `<PORT>`를 새로운 3노드 로컬 테스트넷에 있는 임의의 `el-<num>-...` 서비스의 `rpc` 포트로 교체하여 이전과 동일한 작업을 수행하세요.

## 결론 {#conclusion}

이상입니다! 이 짧은 가이드를 요약하자면 다음과 같습니다.

- Kurtosis를 사용하여 Docker 위에 로컬 이더리움 테스트넷 생성
- 로컬 dApp 개발 환경을 로컬 이더리움 네트워크에 연결
- 로컬 이더리움 네트워크에 dApp을 배포하고 간단한 테스트 실행
- 기본 이더리움 네트워크가 3개의 노드를 갖도록 구성

어떤 점이 좋았는지, 어떤 점을 개선할 수 있는지, 또는 질문에 대한 답변을 듣고 싶습니다. 주저하지 말고 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)를 통해 연락해 주세요!

### 기타 예제 및 가이드 {#other-examples-guides}

[빠른 시작(quickstart)](https://docs.kurtosis.com/quickstart)과 [awesome-kurtosis 리포지토리](https://github.com/kurtosis-tech/awesome-kurtosis)의 다른 예제들을 확인해 보시기 바랍니다.

`ethereum-package`는 트랜잭션 스패머(트랜잭션 시뮬레이션용), 블록 탐색기, 연결된 Grafana 및 Prometheus 인스턴스와 같은 추가 서비스를 네트워크와 함께 시작할 수도 있습니다. 이를 활성화하려면 [패키지 문서](https://github.com/ethpandaops/ethereum-package#configuration)에 설명된 대로 매개변수 파일의 `additional_services` 아래에 나열하세요.
