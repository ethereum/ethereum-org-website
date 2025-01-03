---
title: 甚麼是包裝以太幣 (WETH)
description: 包裝以太幣 (WETH) 簡介 — 以太幣 (ETH) 的一種 ERC20 相容包裝函式。
lang: zh-tw
---

# 包裝以太幣 (WETH) {#intro-to-weth}

以太幣 (ETH) 是以太坊的主要貨幣。 以太幣有多種用途，例如質押、作為貨幣使用、以及支付計算所需要的燃料費。 **包裝以太幣實際上是以太幣的升級形式，具備許多應用程式和 [ERC-20 代幣](/glossary/#erc-20)（即以太坊上其他類型的數位資產）所需的額外功能。** 要與這些代幣互動，以太幣需要遵循與它們相同的規則，這些規則被稱為 ERC-20 標準。

為了彌合這一差距，包裝以太幣 (WETH) 應運而生。 **包裝以太幣是一種智慧型合約，讓你能夠存入任何數量的以太幣，並獲得同樣數量的符合 ERC-20 代幣標準的鑄造包裝以太幣**。 包裝以太幣是以太幣的一種表現形式，讓你能夠以 ERC-20 代幣的方式與其互動，而不是以原生資產以太幣的方式。 你會依然需要一些原生以太幣來支付燃料費，所以當你存入時請確保保留一些以太幣。

你也可以通過包裝以太幣智慧型合約將包裝以太幣換回以太幣。 你可以使用包裝以太幣智慧型合約贖回任意數量的包裝以太幣，而你會收到相同數量的以太幣。 存入的包裝以太幣會被銷毀，並從包裝以太幣的流通量中移除。

**流通中的以太幣有大概 3% 被鎖定在包裝以太幣代幣合約中**，令其成為其中一個最常用的 [智慧型合約](/glossary/#smart-contract)。 包裝以太幣對於與去中心化金融 (DeFi) 中的應用程式互動的使用者尤為重要。

## 為甚麼我們要把以太幣包裝成 ERC-20？ {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) 為可轉讓代幣定義了一個標準介面，讓所有人都可以建立能和以太坊生態系統中使用該標準的代幣和應用程式無縫互動的代幣。 因為**以太幣的出現早於 ERC-20 標準**，因此以太幣並不符合此規範。 這意味著**你無法簡單地**把以太幣和其他 ERC-20 代幣進行交換，或**無法在使用 ERC-20 標準的應用程式中使用以太幣。** 把以太幣包裝起來後，你可以進行以下操作：

- **把以太幣換成其他 ERC-20 代幣**：你無法直接把以太幣換成其他 ERC-20 代幣。 包裝以太幣是一種符合 ERC-20 同質化代幣標準的以太幣表現形式，可以與其他 ERC-20 代幣進行交換。

- **在去中心化應用程式中使用以太幣**：因為以太幣與 ERC-20 標準不相容，開發者需要在去中心化應用程式中建立獨立的介面（一個用於以太幣，另一個用於 ERC-20 代幣）。 包裝以太幣消除了這一障礙，使開發者能夠在同一個去中心化應用程式中處理以太幣和其他代幣。 許多去中心化金融應用程式使用此標準，並建立了用於交換這些代幣的市場。

## 包裝以太幣 (WETH) 與以太幣 (ETH)：有何不同？ {#weth-vs-eth-differences}

|     | **以太幣 (ETH)**                                          | **包裝以太幣 (WETH)**                                                             |
| --- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 供應  | 以太幣的供應由以太坊協定管理。 以太幣的 [發行](/roadmap/merge/issuance) 由以太坊的驗證者在處理交易和建立區塊時進行。 | 包裝以太幣是一種 ERC-20 代幣，其供應由智慧型合約管理。 當合約接收到使用者存入的以太幣後，便會發行新的包裝以太幣；或者當使用者希望將包裝以太幣換回以太幣時，會將對應的包裝以太幣銷毀。 |
| 所有權 | 所有權是透過你的帳戶餘額由以太坊協定管理的。                                                    | 包裝以太幣的所有權由包裝以太幣代幣智慧型合約管理，並由以太坊協定保障安全。                                                           |
| 燃料  | 以太幣 (ETH) 是以太坊網路上針對計算的公認的支付單位。 燃料費以 gwei（以太幣的一種單位）來計價。 | 以包裝以太幣支付燃料費原生不受支援。                                                                              |

## 常見問題 {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

你需要支付燃料費來使用包裝以太幣智慧型合約來兌換或贖回以太幣。

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

包裝以太幣通常被認為是安全的，因為它基於一個簡單且經過實證的智慧型合約。 包裝以太幣合約也已經經過正式驗證，這是以太坊上智慧型合約的最高安全標準。

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

除了本頁描述的 [包裝以太幣的規範化實作](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)外，還有其他變體存在於市場中。 這些可能是由應用程式開發者建立的自訂代幣，或在其他區塊鏈上發行的版本，可能會有不同的行為或具有不同的安全屬性。 **始終仔細檢查代幣資訊，以確認你正在與哪一種包裝以太幣實作進行互動。**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [以太坊主網](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 延伸閱讀 {#further-reading}

- [包裝以太幣究竟是什麼？](https://weth.tkn.eth.limo/)
- [Etherscan 上的包裝以太幣代幣資訊](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [包裝以太幣的形式化驗證](https://zellic.io/blog/formal-verification-weth)
