---
title: "이더리움의 프라이버시"
description: "이더리움에서 프라이버시를 보호하기 위한 도구 및 기술"
lang: ko
---

프라이버시는 개인의 안전을 위해 필수적일 뿐만 아니라, 자유의 초석이자 [탈중앙화를 보장하는](https://vitalik.eth.limo/general/2025/04/14/privacy.html) 핵심 요소입니다. 프라이버시는 사람들이 자신을 표현하고, 다른 사람들과 거래하며, 자유롭게 커뮤니티를 조직할 수 있는 능력을 제공합니다. 하지만 다른 모든 블록체인과 마찬가지로, 이더리움의 공개 원장은 프라이버시를 유지하기 어렵게 만듭니다.

이더리움은 설계상 투명합니다. 모든 온체인 활동은 누구나 볼 수 있습니다. 이더리움은 활동을 실제 신원 대신 [공개키](/decentralized-identity/#public-key-cryptography)에 연결하여 가명성을 제공하지만, 활동 패턴을 분석하면 민감한 정보가 노출되고 사용자가 식별될 수 있습니다.

이더리움에 프라이버시 보호 도구를 구축하면 사람, 조직 및 기관이 불필요한 노출을 제한하면서 안전하게 상호 작용할 수 있습니다. 이는 생태계를 더 안전하게 만들고 더 넓은 범위의 사용 사례에 실용적으로 만듭니다.

<VideoWatch slug="privacy-is-existential" />

## 쓰기 프라이버시 {#privacy-of-writes}

기본적으로 이더리움에 기록되는 모든 트랜잭션은 공개적이며 영구적입니다. 여기에는 ETH 전송뿐만 아니라 ENS 이름 등록, POAP 수집 또는 NFT 거래도 포함됩니다. 결제, 투표 또는 신원 확인과 같은 일상적인 활동으로 인해 의도하지 않은 당사자에게 정보가 노출될 수 있습니다. 이러한 활동을 더 비공개로 유지하는 데 도움이 되는 몇 가지 도구와 기술이 있습니다.

### 믹싱 프로토콜(또는 "믹서") {#mixing-protocols}

믹서는 많은 사용자의 트랜잭션을 공유 "풀"에 넣은 다음 나중에 사람들이 새로운 주소로 인출할 수 있도록 하여 송신자와 수신자 간의 연결을 끊습니다. 입금과 인출이 뒤섞여 있기 때문에 관찰자가 이를 연결하기가 훨씬 더 어렵습니다.

_예시: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### 쉴디드 풀 {#shielded-pools}

쉴디드 풀은 믹서와 유사하지만 사용자가 풀 내부에서 비공개로 자금을 보유하고 전송할 수 있도록 합니다. 쉴디드 풀은 단순히 입금과 인출 간의 연결을 모호하게 하는 대신, 종종 영지식 증명으로 보호되는 지속적인 비공개 상태를 유지합니다. 이를 통해 비공개 전송, 비공개 잔액 등을 구축할 수 있습니다.

_예시: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### 스텔스 주소 {#stealth-addresses}

[스텔스 주소](https://vitalik.eth.limo/general/2023/01/20/stealth.html)는 각 송신자에게 본인만 열 수 있는 고유한 일회용 사서함을 제공하는 것과 같습니다. 누군가 암호화폐를 보낼 때마다 새로운 주소로 전송되므로, 다른 사람은 그 모든 결제가 본인의 것인지 알 수 없습니다. 이를 통해 결제 내역을 비공개로 유지하고 추적하기 어렵게 만듭니다.

_예시: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### 기타 사용 사례 {#other-use-cases}

비공개 쓰기를 탐구하는 다른 프로젝트로는 [PlasmaFold](https://pse.dev/projects/plasma-fold)(비공개 결제)와 [MACI](https://pse.dev/projects/maci) 및 [Semaphore](https://pse.dev/projects/semaphore)(비공개 투표) 같은 시스템이 있습니다.

이러한 도구는 이더리움에서 비공개로 쓰기 위한 옵션을 확장하지만, 각각 장단점이 있습니다. 일부 접근 방식은 아직 실험적이고, 일부는 비용이나 복잡성을 증가시키며, 믹서와 같은 일부 도구는 사용 방식에 따라 법적 또는 규제적 조사를 받을 수 있습니다.

## 읽기 프라이버시 {#privacy-of-reads}

이더리움에서 정보(예: 지갑 잔액)를 읽거나 확인하는 작업은 일반적으로 지갑 제공업체, 노드 제공업체 또는 블록 탐색기와 같은 서비스를 통해 이루어집니다. 사용자가 블록체인을 읽기 위해 이들에 의존하기 때문에, 이들은 사용자의 요청과 함께 IP 주소나 위치 같은 메타데이터도 볼 수 있습니다. 동일한 계정을 계속 확인하면 이 정보가 결합되어 사용자의 신원과 활동이 연결될 수 있습니다.

자체 이더리움 노드를 실행하면 이를 방지할 수 있지만, 전체 블록체인을 저장하고 동기화하는 것은 대부분의 사용자, 특히 모바일 기기에서는 여전히 비용이 많이 들고 비실용적입니다.

비공개 읽기를 탐구하는 일부 프로젝트에는 [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)(PIR, 검색하는 내용을 노출하지 않고 데이터 가져오기), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec)(영지식 증명을 사용한 비공개 신원 확인), [vOPRF](https://pse.dev/projects/voprf)(Web3에서 웹2 계정을 가명으로 사용), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1)(암호화된 데이터에 대한 연산), [MachinaIO](https://pse.dev/projects/machina-io)(기능을 유지하면서 프로그램 세부 정보 숨기기)가 포함됩니다.

## 증명 프라이버시 {#privacy-of-proving}

프라이버시 보존 증명은 불필요한 세부 정보를 노출하지 않고 어떤 것이 사실임을 보여주기 위해 이더리움에서 사용할 수 있는 도구입니다. 예를 들어 다음과 같은 작업을 수행할 수 있습니다.

- 전체 생년월일을 공유하지 않고 18세 이상임을 증명
- 전체 지갑을 노출하지 않고 NFT 또는 토큰의 소유권을 증명
- 다른 개인 데이터를 노출하지 않고 멤버십, 보상 또는 투표 자격을 증명

이를 위한 대부분의 도구는 영지식 증명과 같은 암호학 기술에 의존하지만, 일상적인 기기에서 실행할 수 있을 만큼 효율적이고, 모든 플랫폼에 이식 가능하며, 안전하게 만드는 것이 과제입니다.

증명 프라이버시를 탐구하는 일부 프로젝트에는 [클라이언트 측 증명(Client Side Proving)](https://pse.dev/projects/client-side-proving)(ZK 증명 시스템), [TLSNotary](https://tlsnotary.org/)(웹상의 모든 데이터에 대한 진위 증명), [Mopro](https://pse.dev/projects/mopro)(모바일 클라이언트 측 증명), [비공개 증명 위임(Private Proof Delegation)](https://pse.dev/projects/private-proof-delegation)(신뢰 가정을 피하는 위임 프레임워크), [Noir](https://noir-lang.org/)(비공개 및 검증 가능한 컴퓨팅을 위한 언어)가 포함됩니다.

## 프라이버시 용어집 {#privacy-glossary}

**익명(Anonymous)**: 데이터에서 모든 식별자가 영구적으로 제거된 상태로 상호 작용하여, 정보를 개인에게 다시 추적하는 것을 불가능하게 만드는 것

**암호화(Encryption)**: 올바른 키를 가진 사람만 읽을 수 있도록 데이터를 섞는 과정

**[완전 동형 암호(Fully Homomorphic Encryption)](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: 데이터를 복호화하지 않고 암호화된 데이터에서 직접 연산을 수행하는 방법

**[난독화(Indistinguishable Obfuscation)](https://pse.dev/projects/machina-io) (iO)**: 프로그램이나 데이터를 여전히 사용할 수 있으면서도 이해할 수 없게 만드는 프라이버시 기술

**[다자간 연산(Multi-Party Computation)](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: 여러 당사자가 각자의 비공개 입력값을 노출하지 않고 함께 결과를 계산할 수 있도록 하는 방법

**프로그래밍 가능한 암호학(Programmable Cryptography)**: 데이터가 공유, 검증 또는 공개되는 방식과 시기를 제어하기 위해 소프트웨어에서 사용자 정의할 수 있는 유연하고 규칙 기반의 암호학

**가명(Pseudonymous)**: 개인 식별자 대신 고유한 코드나 숫자(이더리움 주소 등)를 사용하는 것

**선택적 공개(Selective Disclosure)**: 필요한 것만 공유할 수 있는 기능(예: 전체 지갑 내역을 노출하지 않고 NFT 소유를 증명)

**비연결성(Unlinkability)**: 블록체인상의 개별 활동이 동일한 주소로 다시 연결될 수 없도록 보장하는 것

**검증 가능성(Verifiability)**: 이더리움에서 트랜잭션이나 증명을 검증하는 등 다른 사람이 청구가 사실인지 확인할 수 있도록 보장하는 것

**검증 가능한 위임(Verifiable Delegation)**: 증명 생성과 같은 작업을 다른 당사자(예: 무거운 암호학 연산을 위해 서버를 사용하는 모바일 지갑)에게 할당하면서도 해당 작업이 올바르게 수행되었는지 검증할 수 있는 것

**[영지식 증명(Zero-Knowledge Proofs)](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: 기본 데이터를 노출하지 않고 정보가 사실임을 증명할 수 있게 해주는 암호학 프로토콜

**ZK 롤업(ZK Rollup)**: 트랜잭션을 오프체인에서 일괄 처리하고 온체인에 유효성 증명을 제출하는 확장성 시스템. 기본적으로 비공개는 아니지만 비용을 절감하여 효율적인 프라이버시 시스템(쉴디드 풀 등)을 가능하게 합니다.

## 리소스 {#resources}

- [이더리움 프라이버시 스튜어드(Privacy Stewards of Ethereum)](https://pse.dev/) (PSE): 생태계의 프라이버시에 중점을 둔 이더리움 재단 연구 개발 랩
- [Web3PrivacyNow](https://web3privacy.info/): 온라인에서 인권을 보호하고 증진하는 사람, 프로젝트 및 관련 조직의 네트워크
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/): 지갑의 포괄적인 목록, 기능, 관행 및 특정 표준에 대한 지원을 제공하는 것을 목표로 하는 이더리움 지갑 평가 사이트
- [Zk-kit](https://zkkit.org/): 다양한 프로젝트 및 영지식 프로토콜에서 재사용할 수 있는 라이브러리(알고리즘, 유틸리티 함수 및 데이터 구조) 세트
- [프라이버시 앱(Privacy Apps)](/apps/categories/privacy/) - 이더리움에서 실행되는 엄선된 프라이버시 애플리케이션 목록을 확인하세요.
