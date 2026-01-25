---
title: 래핑된 이더(WETH)란 무엇인가요?
description: 이더(ETH)를 위한 ERC-20 호환 래퍼, 래핑된 이더(WETH)에 대한 소개입니다.
lang: ko
---

# 래핑된 이더(WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>[WrapETH.com](https://www.wrapeth.com/)에서 체인에 상관없이 지갑을 연결하여 ETH를 래핑하거나 언래핑하세요.</div>
</Alert>

이더 (ETH)는 이더리움의 주요 통화입니다. 이더는 스테이킹, 화폐 및 연산을 위한 가스비 지불 등 여러 목적으로 사용됩니다. **WETH는 사실상 ETH의 업그레이드된 형태로, 이더리움의 다른 디지털 자산 유형인 여러 애플리케이션과 [ERC-20 토큰](/glossary/#erc-20)에서 요구하는 몇 가지 추가 기능을 갖추고 있습니다**. 이러한 토큰과 함께 작동하려면 ETH는 ERC-20 표준으로 알려진 동일한 규칙을 따라야 합니다.

이 차이를 메우기 위해 래핑된 ETH(WETH)가 만들어졌습니다. **래핑된 ETH는 스마트 계약에 원하는 금액의 ETH를 예치하고 ERC-20 토큰 표준을 준수하는 동일한 금액의 WETH를 발행받을 수 있게 하는 스마트 계약입니다**. WETH는 기본 자산인 ETH가 아닌 ERC-20 토큰으로 상호작용할 수 있도록 ETH를 나타낸 것입니다. 가스 수수료를 지불하려면 여전히 기본 ETH가 필요하므로 예치할 때 일부를 남겨 두어야 합니다.

WETH 스마트 계약을 사용하여 WETH를 ETH로 언래핑할 수 있습니다. WETH 스마트 계약으로 원하는 금액의 WETH를 상환하고 동일한 금액의 ETH를 받을 수 있습니다. 예치된 WETH는 소각되어 WETH의 유통 공급량에서 제외됩니다.

**유통되는 ETH 공급량의 약 3%가 WETH 토큰 계약에 잠겨 있어** 가장 많이 사용되는 [스마트 계약](/glossary/#smart-contract) 중 하나입니다. WETH는 탈중앙화 금융(DeFi)의 애플리케이션과 상호작용하는 사용자에게 특히 중요합니다.

## ETH를 ERC-20으로 래핑해야 하는 이유는 무엇인가요? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/)은 전송 가능한 토큰에 대한 표준 인터페이스를 정의하므로 누구나 이더리움 생태계에서 이 표준을 사용하는 애플리케이션 및 토큰과 원활하게 상호 작용하는 토큰을 만들 수 있습니다. **ETH는 ERC-20 표준보다 먼저 나왔기 때문에** 이 사양을 따르지 않습니다. 즉, ETH를 다른 ERC-20 토큰으로 쉽게 교환하거나 **ERC-20 표준을 사용하는 앱에서 ETH를 사용할 수 없습니다**. ETH를 래핑하면 다음과 같은 작업을 수행할 수 있습니다.

- **ETH를 ERC-20 토큰으로 교환**: ETH를 다른 ERC-20 토큰과 직접 교환할 수 없습니다. WETH는 ERC-20 대체 가능 토큰 표준을 준수하며 다른 ERC-20 토큰과 교환할 수 있는 이더를 나타냅니다.

- **탈중앙화앱에서 ETH 사용**: ETH는 ERC-20과 호환되지 않으므로 개발자는 탈중앙화앱에서 ETH용 인터페이스와 ERC-20 토큰용 인터페이스를 별도로 만들어야 합니다. ETH를 래핑하면 이러한 장애물이 제거되고 개발자가 동일한 탈중앙화앱 내에서 ETH 및 기타 토큰을 처리할 수 있습니다. 많은 탈중앙화 금융 애플리케이션이 이 표준을 사용하며 이러한 토큰을 교환하기 위한 시장을 만듭니다.

## 래핑된 이더(WETH) 대 이더(ETH): 차이점은 무엇인가요? {#weth-vs-eth-differences}

|     | **이더(ETH)**                                                                                                              | **래핑된 이더(WETH)**                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 공급  | ETH-이더-의 공급은 이더리움 프로토콜에 의해 관리됩니다. ETH의 [발행](/roadmap/merge/issuance)은 이더리움 검증자가 트랜잭션을 처리하고 블록을 생성할 때 처리됩니다. | WETH는 스마트 계약에 의해 공급이 관리되는 ERC-20 토큰입니다. WETH의 새 단위는 계약이 사용자로부터 ETH 예금을 받은 후에 발행되거나 사용자가 WETH를 ETH로 상환하고자 할 때 소각됩니다. |
| 소유권 | 소유권은 계정 잔액을 통해 이더리움 프로토콜에 의해 관리됩니다.                                                                                         | WETH의 소유권은 WETH 토큰 스마트 계약에 의해 관리되며 이더리움 프로토콜에 의해 보호됩니다.                                                                             |
| 가스  | 이더(ETH)는 이더리움 네트워크에서 연산에 대한 지불 단위로 사용됩니다. 가스 수수료는 기위(이더의 단위)로 표시됩니다.  | WETH 토큰으로 가스를 지불하는 것은 기본적으로 지원되지 않습니다.                                                                                              |

## 자주 묻는 질문 {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

WETH 계약을 사용하여 ETH를 래핑하거나 언래핑하기 위해 가스 수수료를 지불합니다.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH는 간단하고 전투 테스트를 거친 스마트 계약을 기반으로 하기 때문에 일반적으로 안전한 것으로 간주됩니다. WETH 계약은 또한 공식적으로 검증되었으며, 이는 이더리움의 스마트 계약에 대한 최고 보안 표준입니다.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

이 페이지에 설명된 [WETH의 표준 구현](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) 외에도 다른 변형이 있습니다. 이는 앱 개발자가 만든 사용자 지정 토큰이거나 다른 블록체인에서 발행된 버전일 수 있으며 다르게 작동하거나 다른 보안 속성을 가질 수 있습니다. **어떤 WETH 구현과 상호 작용하는지 알기 위해 항상 토큰 정보를 다시 확인하세요.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [이더리움 메인넷](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 더 읽어보기 {#further-reading}

- [WETH란 무엇인가요?](https://weth.tkn.eth.limo/)
- [Blockscout의 WETH 토큰 정보](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETH의 형식 검증](https://zellic.io/blog/formal-verification-weth)
