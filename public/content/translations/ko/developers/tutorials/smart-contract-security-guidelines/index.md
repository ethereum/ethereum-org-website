---
title: 스마트 컨트랙트 보안 가이드라인
description: dapp을 빌드할 때 고려해야 할 보안 가이드라인 체크리스트
author: "Trailofbits"
tags: ["solidity", "스마트 컨트랙트", "보안"]
skill: intermediate
breadcrumb: 보안 가이드라인
lang: ko
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

더 안전한 스마트 컨트랙트를 빌드하려면 다음의 상위 수준 권장 사항을 따르세요.

## 설계 가이드라인 {#design-guidelines}

컨트랙트의 설계는 코드를 한 줄이라도 작성하기 전에 미리 논의되어야 합니다.

### 문서화 및 사양 {#documentation-and-specifications}

문서화는 다양한 수준으로 작성될 수 있으며, 컨트랙트를 구현하는 동안 업데이트되어야 합니다.

- **평이한 언어로 작성된 시스템 설명**, 컨트랙트가 수행하는 작업과 코드베이스에 대한 모든 가정을 설명합니다.
- **스키마 및 아키텍처 다이어그램**, 컨트랙트 상호 작용 및 시스템의 상태 머신을 포함합니다. [슬리더(Slither) 프린터](https://github.com/crytic/slither/wiki/Printer-documentation)를 사용하면 이러한 스키마를 생성하는 데 도움이 될 수 있습니다.
- **철저한 코드 문서화**, Solidity에는 [NatSpec 형식](https://docs.soliditylang.org/en/develop/natspec-format.html)을 사용할 수 있습니다.

### 온체인 대 오프체인 연산 {#onchain-vs-offchain-computation}

- **가능한 한 많은 코드를 오프체인으로 유지하세요.** 온체인 레이어를 작게 유지하세요. 온체인에서의 검증이 간단해지도록 오프체인 코드에서 데이터를 전처리하세요. 정렬된 목록이 필요하신가요? 오프체인에서 목록을 정렬한 다음, 온체인에서는 그 순서만 확인하세요.

### 업그레이드 가능성 {#upgradeability}

[블로그 게시물](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)에서 다양한 업그레이드 가능성 솔루션에 대해 논의했습니다. 코드를 작성하기 전에 업그레이드 가능성을 지원할지 여부를 신중하게 선택하세요. 이 결정은 코드 구조화 방식에 영향을 미칩니다. 일반적으로 다음을 권장합니다.

- **업그레이드 가능성보다 [컨트랙트 마이그레이션](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)을 선호하세요.** 마이그레이션 시스템은 업그레이드 가능한 시스템과 동일한 장점을 많이 가지고 있으면서도 단점은 없습니다.
- **delegatecallproxy 패턴보다 데이터 분리 패턴을 사용하세요.** 프로젝트에 명확한 추상화 분리가 있는 경우, 데이터 분리를 사용한 업그레이드 가능성은 약간의 조정만 필요합니다. delegatecallproxy는 EVM 전문 지식이 필요하며 오류가 발생하기 매우 쉽습니다.
- **배포 전에 마이그레이션/업그레이드 절차를 문서화하세요.** 가이드라인 없이 스트레스를 받는 상황에서 대응해야 한다면 실수를 하게 될 것입니다. 따라야 할 절차를 미리 작성해 두세요. 다음 내용이 포함되어야 합니다.
  - 새로운 컨트랙트를 시작하는 호출
  - 키가 저장된 위치 및 액세스 방법
  - 배포를 확인하는 방법! 배포 후 스크립트를 개발하고 테스트하세요.

## 구현 가이드라인 {#implementation-guidelines}

**단순성을 위해 노력하세요.** 항상 목적에 맞는 가장 간단한 솔루션을 사용하세요. 팀의 모든 구성원이 솔루션을 이해할 수 있어야 합니다.

### 함수 구성 {#function-composition}

코드베이스의 아키텍처는 코드를 검토하기 쉽게 만들어야 합니다. 정확성을 추론하는 능력을 저하시키는 아키텍처 선택은 피하세요.

- 여러 컨트랙트를 통하거나 유사한 함수를 함께 그룹화하여(예: 인증, 산술 등) **시스템의 로직을 분할하세요**.
- **명확한 목적을 가진 작은 함수를 작성하세요.** 이렇게 하면 검토가 더 쉬워지고 개별 구성 요소를 테스트할 수 있습니다.

### 상속 {#inheritance}

- **상속을 관리 가능하게 유지하세요.** 상속은 로직을 나누는 데 사용되어야 하지만, 프로젝트는 상속 트리의 깊이와 너비를 최소화하는 것을 목표로 해야 합니다.
- **슬리더의 [상속 프린터(inheritance printer)](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph)를 사용하여 컨트랙트의 계층 구조를 확인하세요.** 상속 프린터는 계층 구조의 크기를 검토하는 데 도움이 됩니다.

### 이벤트 {#events}

- **모든 중요한 작업을 로그로 남기세요.** 이벤트는 개발 중에 컨트랙트를 디버깅하고 배포 후에 모니터링하는 데 도움이 됩니다.

### 알려진 함정 피하기 {#avoid-known-pitfalls}

- **가장 일반적인 보안 문제에 유의하세요.** [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) 또는 [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)와 같이 일반적인 문제에 대해 배울 수 있는 많은 온라인 리소스가 있습니다.
- **[Solidity 문서](https://docs.soliditylang.org/en/latest/)의 경고 섹션에 유의하세요.** 경고 섹션은 언어의 명확하지 않은 동작에 대해 알려줍니다.

### 종속성 {#dependencies}

- **잘 테스트된 라이브러리를 사용하세요.** 잘 테스트된 라이브러리에서 코드를 가져오면 버그가 있는 코드를 작성할 가능성이 줄어듭니다. ERC-20 컨트랙트를 작성하려면 [오픈제플린](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)을 사용하세요.
- **종속성 관리자를 사용하고 코드 복사 및 붙여넣기를 피하세요.** 외부 소스에 의존하는 경우 원본 소스와 함께 최신 상태로 유지해야 합니다.

### 테스트 및 검증 {#testing-and-verification}

- **철저한 단위 테스트를 작성하세요.** 고품질 소프트웨어를 빌드하려면 광범위한 테스트 스위트가 중요합니다.
- **[슬리더](https://github.com/crytic/slither), [에키드나](https://github.com/crytic/echidna) 및 [맨티코어](https://github.com/trailofbits/manticore) 사용자 지정 검사 및 속성을 작성하세요.** 자동화된 도구는 컨트랙트가 안전한지 확인하는 데 도움이 됩니다. 효율적인 검사 및 속성을 작성하는 방법을 알아보려면 이 가이드의 나머지 부분을 검토하세요.
- **[crytic.io](https://crytic.io/)를 사용하세요.** Crytic은 GitHub와 통합되어 비공개 슬리더 탐지기에 대한 액세스를 제공하고 에키드나에서 사용자 지정 속성 검사를 실행합니다.

### Solidity {#solidity}

- **0.4 및 0.6보다 Solidity 0.5를 선호하세요.** 우리의 의견으로는 Solidity 0.5가 0.4보다 더 안전하고 더 나은 내장 사례를 가지고 있습니다. Solidity 0.6은 프로덕션 환경에서 사용하기에는 너무 불안정하며 성숙할 시간이 필요합니다.
- **컴파일에는 안정적인 릴리스를 사용하고, 경고를 확인하려면 최신 릴리스를 사용하세요.** 최신 컴파일러 버전에서 코드에 보고된 문제가 없는지 확인하세요. 그러나 Solidity는 릴리스 주기가 빠르고 컴파일러 버그의 역사가 있으므로 배포에 최신 버전을 권장하지 않습니다(슬리더의 [solc 버전 권장 사항](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) 참조).
- **인라인 어셈블리를 사용하지 마세요.** 어셈블리에는 EVM 전문 지식이 필요합니다. 황서를 _마스터_하지 않았다면 EVM 코드를 작성하지 마세요.

## 배포 가이드라인 {#deployment-guidelines}

컨트랙트가 개발되고 배포되면 다음을 수행하세요.

- **컨트랙트를 모니터링하세요.** 로그를 주시하고 컨트랙트나 지갑이 손상될 경우 대응할 준비를 하세요.
- **[blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)에 연락처 정보를 추가하세요.** 이 목록은 보안 결함이 발견될 경우 제3자가 귀하에게 연락하는 데 도움이 됩니다.
- **권한이 있는 사용자의 지갑을 보호하세요.** 하드웨어 지갑에 키를 저장하는 경우 당사의 [모범 사례](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)를 따르세요.
- **사고 대응 계획을 마련하세요.** 스마트 컨트랙트가 손상될 수 있음을 고려하세요. 컨트랙트에 버그가 없더라도 공격자가 컨트랙트 소유자의 키를 제어할 수 있습니다.