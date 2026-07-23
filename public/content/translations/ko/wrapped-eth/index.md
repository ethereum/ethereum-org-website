---
title: 래핑된 이더 (WETH)
metaTitle: 래핑된 이더(WETH)란 무엇인가요?
description: 이더(ETH)를 위한 ERC-20 호환 래퍼인 래핑된 이더(WETH)에 대한 소개입니다.
lang: ko
---

<Alert variant="update">
<Emoji text="🎁" />
<div>[WrapETH.com](https://www.wrapeth.com/)에서 지갑을 연결하여 모든 체인에서 ETH를 래핑하거나 래핑 해제하세요.</div>
</Alert>

이더(ETH)는 이더리움의 주요 통화입니다. 스테이킹, 통화로서의 사용, 연산에 대한 가스비 지불 등 여러 목적으로 사용됩니다. **WETH는 사실상 이더리움의 다른 유형의 디지털 자산인 많은 애플리케이션과 [ERC-20 토큰](/glossary/#erc-20)에서 요구하는 몇 가지 추가 기능이 포함된 업그레이드된 형태의 ETH입니다.** 이러한 토큰과 함께 작동하려면 ETH도 ERC-20 표준으로 알려진 동일한 규칙을 따라야 합니다.

이러한 격차를 해소하기 위해 래핑된 이더(WETH)가 만들어졌습니다. **래핑된 이더는 원하는 양의 ETH를 컨트랙트에 예치하고 ERC-20 토큰 표준을 준수하여 발행된 동일한 양의 WETH를 받을 수 있게 해주는 스마트 컨트랙트입니다.** WETH는 네이티브 자산인 ETH가 아닌 ERC-20 토큰으로서 상호 작용할 수 있도록 해주는 ETH의 표현입니다. 가스비를 지불하려면 여전히 네이티브 ETH가 필요하므로 예치할 때 일부를 남겨두어야 합니다. 

WETH 스마트 컨트랙트를 사용하여 WETH를 ETH로 래핑 해제할 수 있습니다. WETH 스마트 컨트랙트를 통해 원하는 양의 WETH를 상환할 수 있으며, 동일한 양의 ETH를 받게 됩니다. 예치된 WETH는 소각되어 WETH의 유통량에서 제외됩니다.

**유통되는 ETH 공급량의 약 3%가 WETH 토큰 컨트랙트에 잠겨 있으며**, 이는 가장 많이 사용되는 [스마트 컨트랙트](/glossary/#smart-contract) 중 하나입니다. WETH는 탈중앙화 금융(DeFi) 애플리케이션과 상호 작용하는 사용자에게 특히 중요합니다.

## 왜 ETH를 ERC-20으로 래핑해야 하나요? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/)은 전송 가능한 토큰에 대한 표준 인터페이스를 정의하므로, 누구나 이더리움 생태계에서 이 표준을 사용하는 애플리케이션 및 토큰과 원활하게 상호 작용하는 토큰을 만들 수 있습니다. **ETH는 ERC-20 표준보다 먼저 나왔기 때문에** 이 사양을 준수하지 않습니다. 즉, ETH를 다른 ERC-20 토큰으로 쉽게 교환하거나 **ERC-20 표준을 사용하는 앱에서 ETH를 사용할 수 없습니다**. ETH를 래핑하면 다음과 같은 작업을 수행할 수 있습니다.

- **ETH를 ERC-20 토큰으로 교환**: ETH를 다른 ERC-20 토큰으로 직접 교환할 수 없습니다. WETH는 ERC-20 대체 가능 토큰 표준을 준수하는 이더의 표현이며 다른 ERC-20 토큰과 교환할 수 있습니다. 

- **탈중앙화 애플리케이션(dapp)에서 ETH 사용**: ETH는 ERC-20과 호환되지 않기 때문에 개발자는 디앱(dapp)에서 별도의 인터페이스(ETH용 하나, ERC-20 토큰용 하나)를 만들어야 합니다. ETH를 래핑하면 이러한 장애물이 제거되고 개발자가 동일한 디앱(dapp) 내에서 ETH와 다른 토큰을 처리할 수 있습니다. 많은 탈중앙화 금융 애플리케이션이 이 표준을 사용하며 이러한 토큰을 교환하기 위한 시장을 만듭니다.

## 래핑된 이더(WETH) 대 이더(ETH): 차이점은 무엇인가요? {#weth-vs-eth-differences}


|            | **이더(ETH)**                                                                                                                                                                                                                 | **래핑된 이더(WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 공급량     | [ETH 공급량](/eth/supply/)은 [이더리움](/) 프로토콜에 의해 관리됩니다. ETH의 [발행](/roadmap/merge/issuance)은 트랜잭션을 처리하고 블록을 생성할 때 이더리움 검증자에 의해 처리됩니다.                           | WETH는 스마트 컨트랙트에 의해 공급량이 관리되는 ERC-20 토큰입니다. 사용자의 ETH 예치를 받은 후 컨트랙트에서 새로운 WETH 단위가 발행되거나, 사용자가 WETH를 ETH로 상환하고자 할 때 WETH 단위가 소각됩니다.                                                                                                                                        |
| 소유권  | 소유권은 계정 잔액을 통해 이더리움 프로토콜에 의해 관리됩니다.  | WETH의 소유권은 이더리움 프로토콜에 의해 보호되는 WETH 토큰 스마트 컨트랙트에 의해 관리됩니다.                                                                                                                                         |
| 가스        | 이더(ETH)는 이더리움 네트워크에서 연산에 대해 허용되는 지불 단위입니다. 가스비는 Gwei(이더의 단위)로 표시됩니다.                                                                                    | WETH 토큰으로 가스비를 지불하는 것은 기본적으로 지원되지 않습니다.                                                                                                                                                                                              |

## 자주 묻는 질문 {#faq}
 
<ExpandableCard title="ETH를 래핑/언래핑할 때 비용이 발생하나요?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

WETH 컨트랙트를 사용하여 ETH를 래핑하거나 래핑 해제할 때 가스비를 지불합니다.

</ExpandableCard>

<ExpandableCard title="WETH는 안전한가요?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH는 단순하고 실전 테스트를 거친 스마트 컨트랙트를 기반으로 하기 때문에 일반적으로 안전한 것으로 간주됩니다. 또한 WETH 컨트랙트는 이더리움 스마트 컨트랙트의 최고 보안 표준인 정형 검증을 거쳤습니다.

</ExpandableCard>

<ExpandableCard title="왜 서로 다른 WETH 토큰이 보이나요?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

이 페이지에 설명된 [WETH의 표준 구현](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) 외에도 실제 환경에서는 다른 변형들이 존재합니다. 이는 앱 개발자가 만든 맞춤형 토큰이거나 다른 블록체인에서 발행된 버전일 수 있으며, 다르게 작동하거나 다른 보안 속성을 가질 수 있습니다. **상호 작용하는 WETH 구현이 무엇인지 알기 위해 항상 토큰 정보를 다시 확인하세요.**

</ExpandableCard>

<ExpandableCard title="다른 네트워크의 WETH 컨트랙트는 무엇인가요?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [이더리움 메인넷](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [아비트럼](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [옵티미즘](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 더 읽어보기 {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [Blockscout의 WETH 토큰 정보](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETH의 정형 검증](https://zellic.io/blog/formal-verification-weth)