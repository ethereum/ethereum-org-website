---
title: 包裝以太幣 (WETH)
metaTitle: 什麼是包裝以太幣 (WETH)
description: 包裝以太幣 (WETH) 簡介：一種與 ERC-20 相容的以太幣 (ETH) 包裝代幣。
lang: zh-tw
---

<Alert variant="update">
<Emoji text="🎁" />
<div>連接您的錢包，即可在 [WrapETH.com](https://www.wrapeth.com/) 上於任何鏈包裝或解包 ETH</div>
</Alert>

以太幣 (ETH) 是以太坊的主要貨幣。它有多種用途，例如質押、作為貨幣，以及支付運算的燃料費用。**WETH 實際上是 ETH 的升級形式，具備許多應用程式和 [ERC-20 代幣](/glossary/#erc-20)（以太坊上的其他類型數位資產）所需的一些額外功能**。為了與這些代幣協同運作，ETH 必須遵循與它們相同的規則，即 ERC-20 標準。

為了解決這個落差，包裝 ETH (WETH) 應運而生。**包裝 ETH 是一個智能合約，讓您可以將任意數量的 ETH 存入合約中，並獲得相同數量、符合 ERC-20 代幣標準的鑄造 WETH**。WETH 是 ETH 的一種表現形式，允許您將其作為 ERC-20 代幣進行互動，而不是作為原生資產 ETH。您仍然需要原生 ETH 來支付燃料費用，因此在存款時請務必保留一些。 

您可以使用 WETH 智能合約將 WETH 解包為 ETH。您可以使用 WETH 智能合約贖回任意數量的 WETH，並將收到相同數量的 ETH。存入的 WETH 隨後會被銷毀，並從 WETH 的流通供應量中移除。

**大約有 3% 的 ETH 流通供應量被鎖定在 WETH 代幣合約中**，使其成為最常被使用的[智能合約](/glossary/#smart-contract)之一。對於與去中心化金融 (DeFi) 應用程式互動的使用者來說，WETH 尤其重要。

## 為什麼我們需要將 ETH 包裝為 ERC-20？ {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) 為可轉讓代幣定義了標準介面，因此任何人都可以建立代幣，與以太坊生態系統中使用此標準的應用程式和代幣無縫互動。由於 **ETH 早於 ERC-20 標準出現**，因此 ETH 不符合此規範。這意味著**您無法輕易地**將 ETH 兌換為其他 ERC-20 代幣，或**在採用 ERC-20 標準的應用程式中使用 ETH**。包裝 ETH 讓您有機會執行以下操作：

- **將 ETH 兌換為 ERC-20 代幣**：您無法直接將 ETH 兌換為其他 ERC-20 代幣。WETH 是符合 ERC-20 同質化代幣標準的以太幣表現形式，可以與其他 ERC-20 代幣進行兌換。 

- **在去中心化應用程式 (dapp) 中使用 ETH**：由於 ETH 與 ERC-20 不相容，開發人員需要在 dapp 中建立獨立的介面（一個用於 ETH，另一個用於 ERC-20 代幣）。包裝 ETH 消除了這個障礙，使開發人員能夠在同一個 dapp 中處理 ETH 和其他代幣。許多去中心化金融應用程式都使用此標準，並建立用於兌換這些代幣的市場。

## 包裝以太幣 (WETH) 與以太幣 (ETH)：有什麼區別？ {#weth-vs-eth-differences}


|            | **以太幣 (ETH)**                                                                                                                                                                                                                 | **包裝以太幣 (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 供應量     | [ETH 的供應量](/eth/supply/)由[以太坊](/)協定管理。ETH 的[發行](/roadmap/merge/issuance)由以太坊驗證者在處理交易和建立區塊時處理。                           | WETH 是一種 ERC-20 代幣，其供應量由智能合約管理。在合約收到使用者的 ETH 存款後，會發行新的 WETH 單位；或者當使用者希望將 WETH 贖回為 ETH 時，WETH 單位會被銷毀。                                                                                                                                        |
| 所有權  | 所有權由以太坊協定透過您的帳戶餘額進行管理。  | WETH 的所有權由 WETH 代幣智能合約管理，並由以太坊協定提供安全保障。                                                                                                                                         |
| 燃料        | 以太幣 (ETH) 是以太坊網路上公認的運算支付單位。燃料費用以 Gwei（以太幣的單位）計價。                                                                                    | 原生不支援使用 WETH 代幣支付燃料費用。                                                                                                                                                                                              |

## 常見問題 {#faq}
 
<ExpandableCard title="包裝/解包 ETH 需要付費嗎？" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

使用 WETH 合約包裝或解包 ETH 時，您需要支付燃料費用。

</ExpandableCard>

<ExpandableCard title="WETH 安全嗎？" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH 通常被認為是安全的，因為它建立在一個簡單且經過實戰測試的智能合約之上。WETH 合約也經過了形式化驗證，這是以太坊上智能合約的最高安全標準。

</ExpandableCard>

<ExpandableCard title="為什麼我會看到不同的 WETH 代幣？" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

除了本頁描述的 [WETH 規範實作](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)之外，在實際應用中還有其他變體。這些可能是由應用程式開發人員建立的自訂代幣，或是在其他區塊鏈上發行的版本，它們的行為或安全屬性可能有所不同。**請務必仔細檢查代幣資訊，以了解您正在互動的是哪一種 WETH 實作。**

</ExpandableCard>

<ExpandableCard title="其他網路上的 WETH 合約有哪些？" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [以太坊主網](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 進階閱讀 {#further-reading}

- [WETH 到底是什麼？](https://weth.tkn.eth.limo/)
- [Blockscout 上的 WETH 代幣資訊](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETH 的形式化驗證](https://zellic.io/blog/formal-verification-weth)