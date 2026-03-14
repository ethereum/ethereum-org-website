---
title: "이더리움의 프라이버시"
description: "이더리움에서 프라이버시를 보호하기 위한 도구와 기법"
lang: ko
---

# 이더리움의 프라이버시 {#introduction}

프라이버시는 개인의 안전에 필수적일 뿐만 아니라, 자유의 초석이며 [탈중앙화를 위한 핵심 보증인](https://vitalik.eth.limo/general/2025/04/14/privacy.html)입니다. 프라이버시는 사람들이 자유롭게 자신을 표현하고, 다른 사람들과 거래하며, 커뮤니티를 조직할 수 있는 능력을 부여합니다. 하지만 모든 블록체인과 마찬가지로, 이더리움의 공개 원장은 프라이버시를 어렵게 만듭니다.

이더리움은 설계상 투명합니다. 모든 온체인 활동은 이를 확인하는 모든 사람에게 보입니다. 이더리움은 실제 신원 대신 활동을 [공개 키](/decentralized-identity/#public-key-cryptography)에 연결하여 익명성을 제공하지만, 활동 패턴을 분석하여 민감한 정보를 노출하고 사용자를 식별할 수 있습니다.

이더리움에 프라이버시 보호 도구를 구축하면 개인, 조직, 기관이 불필요한 노출을 제한하면서 안전하게 상호 작용하는 데 도움이 될 수 있습니다. 이를 통해 생태계는 더 넓은 범위의 사용 사례에 대해 더 안전하고 실용적이게 됩니다.

## 쓰기 프라이버시 {#privacy-of-writes}

기본적으로 이더리움에 기록된 모든 트랜잭션은 공개적이며 영구적입니다. 여기에는 ETH 전송뿐만 아니라 ENS 이름 등록, POAP 수집, NFT 거래도 포함됩니다. 결제, 투표 또는 신원 확인과 같은 일상적인 활동은 의도하지 않은 당사자에게 정보를 노출할 수 있습니다. 이러한 활동을 더 비공개로 만드는 데 도움이 되는 몇 가지 도구와 기법이 있습니다.

### 믹싱 프로토콜(또는 "믹서") {#mixing-protocols}

믹서는 많은 사용자의 트랜잭션을 공유 "풀"에 넣은 다음, 나중에 사람들이 새로운 주소로 인출하게 함으로써 발신자와 수신자 간의 연결을 끊습니다. 입금과 출금이 함께 뒤섞여 있어 관찰자가 이를 연결하기가 훨씬 더 어렵습니다.

_예시: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### 보호 풀 {#shielded-pools}

보호 풀은 믹서와 유사하지만 사용자가 풀 자체 내에서 비공개로 자금을 보유하고 이체할 수 있도록 합니다. 입금과 인출 사이의 연결을 모호하게 하는 대신, 보호 풀은 지속적인 비공개 상태를 유지하며 종종 영지식 증명으로 보호됩니다. 이를 통해 비공개 이체, 비공개 잔액 등을 구축할 수 있습니다.

_예시: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### 스텔스 주소 {#stealth-addresses}

[스텔스 주소](https://vitalik.eth.limo/general/2023/01/20/stealth.html)는 각 발신자에게 고유한 일회용 P.O.를 제공하는 것과 같습니다. 오직 본인만 열 수 있는 사서함입니다. 누군가 당신에게 암호화폐를 보낼 때마다 새로운 주소로 전송되므로, 다른 사람은 그 모든 결제가 당신의 것인지 알 수 없습니다. 이를 통해 결제 내역을 비공개로 유지하고 추적하기 어렵게 합니다.

_예시: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### 기타 사용 사례 {#other-use-cases}

비공개 쓰기를 탐구하는 다른 프로젝트로는 [PlasmaFold](https://pse.dev/projects/plasma-fold)(비공개 결제)와 [MACI](https://pse.dev/projects/maci) 및 [Semaphore](https://pse.dev/projects/semaphore)(비공개 투표)와 같은 시스템이 있습니다.

이러한 도구는 이더리움에 비공개로 쓰기 위한 옵션을 확장하지만, 각각에는 장단점이 따릅니다. 일부 접근 방식은 아직 실험 단계에 있고, 일부는 비용이나 복잡성을 증가시키며, 믹서와 같은 일부 도구는 사용 방식에 따라 법적 또는 규제 조사를 받을 수 있습니다.

## 읽기 프라이버시 {#privacy-of-reads}

이더리움에서 정보(예: 지갑 잔액)를 읽거나 확인하는 것은 일반적으로 지갑 공급자, 노드 공급자 또는 블록 탐색기와 같은 서비스를 통해 이루어집니다. 블록체인을 대신 읽어주는 이 서비스에 의존하기 때문에, 서비스 제공자는 IP 주소나 위치와 같은 메타데이터와 함께 사용자의 요청을 볼 수 있습니다. 동일한 계정을 계속 확인하면 이 정보가 조합되어 사용자의 신원과 활동이 연결될 수 있습니다.

자체 이더리움 노드를 운영하면 이를 방지할 수 있지만, 전체 블록체인을 저장하고 동기화하는 것은 대부분의 사용자, 특히 모바일 기기 사용자에게는 여전히 비용이 많이 들고 비실용적입니다.

비공개 읽기를 탐구하는 일부 프로젝트에는 [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)(PIR, 조회하는 내용을 노출하지 않고 데이터 가져오기), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)(영지식 증명을 사용한 비공개 신원 확인), [vOPRF](https://pse.dev/projects/voprf)(웹3에서 웹2 계정을 익명으로 사용), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1)(암호화된 데이터로 연산), [MachinaIO](https://pse.dev/projects/machina-io)(기능은 유지하면서 프로그램 세부 정보 숨기기)가 있습니다.

## 증명 프라이버시 {#privacy-of-proving}

프라이버시 보호 증명은 불필요한 세부 정보를 노출하지 않고 어떤 것이 사실임을 보여주기 위해 이더리움에서 사용할 수 있는 도구입니다. 예를 들어, 다음과 같은 작업을 할 수 있습니다.

- 전체 생년월일을 공유하지 않고 18세 이상임을 증명합니다.
- 전체 지갑을 공개하지 않고 NFT 또는 토큰의 소유권을 증명합니다.
- 다른 개인 데이터를 노출하지 않고 멤버십, 보상 또는 투표 자격을 증명합니다.

이를 위한 대부분의 도구는 영지식 증명과 같은 암호화 기술에 의존하지만, 일상적인 기기에서 실행할 수 있을 만큼 효율적이고, 모든 플랫폼으로 이식 가능하며, 안전하게 만드는 것이 과제입니다.

증명 프라이버시를 탐구하는 일부 프로젝트에는 [Client Side Proving](https://pse.dev/projects/client-side-proving)(ZK 증명 시스템), [TLSNotary](https://tlsnotary.org/)(웹의 모든 데이터에 대한 진위 증명), [Mopro](https://pse.dev/projects/mopro)(모바일 클라이언트 측 증명), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation)(신뢰 가정을 피하는 위임 프레임워크) 및 [Noir](https://noir-lang.org/)(비공개 및 검증 가능한 컴퓨팅을 위한 언어)가 있습니다.

## 프라이버시 용어집 {#privacy-glossary}

**익명**: 데이터에서 모든 식별자를 영구적으로 제거하여 상호 작용하는 것으로, 개인에게 정보를 역추적하는 것을 불가능하게 합니다.

**암호화**: 올바른 키를 가진 사람만 읽을 수 있도록 데이터를 스크램블하는 프로세스입니다.

**[완전 동형 암호](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1)(FHE)**: 암호화된 데이터를 전혀 해독하지 않고 직접 연산을 수행하는 방법입니다.

**[비구별 난독화](https://pse.dev/projects/machina-io)(iO)**: 프로그램이나 데이터를 사용할 수 있으면서도 이해할 수 없게 만드는 프라이버시 기술입니다.

**[다자간 연산](https://pse.dev/blog/secure-multi-party-computation)(MPC)**: 여러 당사자가 자신의 비공개 입력을 노출하지 않고 함께 결과를 계산할 수 있도록 하는 방법입니다.

**프로그래밍 가능 암호학**: 데이터가 공유, 확인 또는 공개되는 방식과 시기를 제어하기 위해 소프트웨어에서 사용자 지정할 수 있는 유연하고 규칙 기반의 암호학입니다.

**가명성**: 개인 식별자 대신 고유한 코드나 숫자(예: 이더리움 주소)를 사용하는 것입니다.

**선택적 공개**: 필요한 것만 공유하는 기능입니다(예: 전체 지갑 기록을 공개하지 않고 NFT 소유 증명).

**비연결성**: 블록체인에서의 개별적인 활동들이 동일한 주소에 연결되지 않도록 보장하는 것입니다.

**검증 가능성**: 이더리움에서 트랜잭션이나 증명을 검증하는 것과 같이 다른 사람들이 주장이 사실임을 확인할 수 있도록 보장하는 것입니다.

**검증 가능한 위임**: 증명 생성과 같은 작업을 다른 당사자(예: 무거운 암호화 작업을 위해 서버를 사용하는 모바일 지갑)에게 할당하면서도 작업이 올바르게 수행되었는지 확인할 수 있는 것입니다.

**[영지식 증명](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)(ZKPs)**: 기본 데이터를 공개하지 않고 정보가 사실임을 증명할 수 있게 해주는 암호화 프로토콜입니다.

**ZK 롤업**: 오프체인에서 트랜잭션을 일괄 처리하고 온체인에 유효성 증명을 제출하는 확장성 시스템입니다. 기본적으로 비공개는 아니지만 비용을 절감하여 효율적인 프라이버시 시스템(보호 풀 등)을 가능하게 합니다.

## 참고 자료 {#resources}

- [이더리움 프라이버시 스튜어드(Privacy Stewards of Ethereum)](https://pse.dev/)(PSE), 생태계의 프라이버시에 중점을 둔 이더리움 재단 연구 개발 연구소입니다.
- [Web3PrivacyNow](https://web3privacy.info/), 온라인에서 인권을 보호하고 증진하는 사람, 프로젝트 및 뜻을 같이하는 조직들의 네트워크입니다.
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), 지갑, 기능, 관행 및 특정 표준 지원에 대한 포괄적인 목록 제공을 목표로 하는 이더리움 지갑 평가 사이트입니다.
- [Zk-kit](https://zkkit.pse.dev/): 다양한 프로젝트와 영지식 프로토콜에서 재사용할 수 있는 라이브러리(알고리즘, 유틸리티 함수, 자료 구조) 모음입니다.
- [프라이버시 앱](/apps/categories/privacy/) - 이더리움에서 실행되는 엄선된 프라이버시 애플리케이션 목록을 확인하세요.
