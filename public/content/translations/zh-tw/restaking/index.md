---
title: 再質押
metaTitle: 什麼是再質押？ | 再質押的好處和用途
description: 使用已質押的 ETH 保護其他去中心化服務，並賺取額外獎勵。
lang: zh-tw
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: 以太坊上再質押的視覺化呈現。
sidebarDepth: 2
summaryPoint1: 使用已質押的 ETH 保護其他去中心化服務，並賺取額外獎勵。
buttons:
  - content: 什麼是再質押？
    toId: what-is-restaking
  - content: 它是如何運作的？
    toId: how-does-restaking-work
    isSecondary: false
---

以太坊網路全年無休地保護著數十億美元的價值。 怎麼做到的？

世界各地的人們將[以太幣 (ETH)](/eth/) 鎖定（或「質押」）在智能合約中，以運行處理以太坊交易和保護以太坊網路的軟體。 作為回報，他們會獲得更多 ETH 作為獎勵。

再質押是一項為[質押者](/staking/)打造的技術，可將此安全性擴展到其他服務、應用程式或網路。 作為回報，他們可以賺取額外的再質押獎勵。 然而，這也使他們已質押的 ETH 承受更大的風險。

**18 分鐘解釋再質押**

<YouTube id="rOJo7VwPh7I" />

## 什麼是再質押？ {#what-is-restaking}

再質押是指質押者使用他們已經質押的 ETH 來保護其他去中心化服務。 作為回報，再質押者除了常規的 ETH 質押獎勵外，還可以從那些其他服務中獲得額外獎勵。

透過再質押保護的去中心化服務被稱為「主動驗證服務」(AVS)。
正如許多 ETH 質押者運行以太坊驗證軟體一樣，許多再質押者也運行專門的 AVS 軟體。

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>建議須知</strong></p>
  <p className="mt-2">雖然「主動驗證服務」(Actively Validated Services，簡稱 AVS) 是最常見的稱呼，但不同的再質押平台可能會為他們協助保護的去中心化服務使用其他名稱，例如「自主驗證服務」(Autonomously Validated Services)、「分散式安全服務」(Distributed Secure Services) 或「網路」(Networks)。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 質押與再質押 {#staking-vs-restaking}

| 質押         | 再質押                |
| ---------- | ------------------ |
| 賺取 ETH 獎勵  | 賺取 ETH 獎勵 + AVS 獎勵 |
| 保護以太坊網路    | 保護以太坊網路 + AVS      |
| 無最低 ETH 限制 | 無最低 ETH 限制         |
| 低風險等級      | 低至高風險等級            |
| 提款時間取決於佇列  | 提款時間取決於佇列 + 解綁定期   |

## 我們為什麼需要再質押？ {#why-do-we-need-restaking}

想像兩個世界；一個有再質押，一個沒有。

 <TabbedSection />

在有再質押的這個世界裡，AVS 和質押者都能從互相找到對方並用安全性換取額外獎勵中獲益。

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>再質押的額外好處</strong></p>
  <p className="mt-2">AVS 可以將所有資源投入建構和行銷他們的服務，而不用為去中心化和安全性分心。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 再質押如何運作？ {#how-does-restaking-work}

再質押涉及數個實體——每個實體都扮演著重要的角色。

| **術語**      | **描述**                                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **再質押平台**   | 再質押平台是一種連接 AVS、ETH 質押者和營運者的服務。 他們為質押者建構去中心化應用程式以再質押他們的 ETH，並建立市場讓質押者、AVS 和營運者可以找到彼此。                                                   |
| **原生再質押者**  | 透過運行自己的以太坊驗證者來質押 ETH 的人，可以將他們已質押的 ETH 連接到再質押平台（包括 EigenLayer 和其他平台），在 ETH 驗證者獎勵之上賺取再質押獎勵。                                              |
|             |                                                                                                                                        |
| **流動性再質押者** | 透過 Lido 或 Rocket Pool 等第三方流動性質押提供商質押 ETH 的人，會獲得代表其已質押 ETH 的流動性質押代幣 (LST)。 他們可以再質押這些 LST 來賺取再質押獎勵，同時保持其原始 ETH 的質押狀態。 |
|             |                                                                                                                                        |
| **營運者**     | 營運者運行 AVS 的再質押軟體，執行每個 AVS 所需的驗證任務。 營運者通常是保證正常運行時間和效能等事項的專業服務提供商。 與非營運者再質押者一樣，營運者使用已質押的 ETH 來保護 AVS，但營運者也會因其工作而獲得額外獎勵。                  |
|             |                                                                                                                                        |
| **AVS**     | 這些是去中心化服務——例如價格預言機、代幣跨鏈橋和數據系統——它們從再質押者那裡獲得安全性，並提供代幣獎勵作為回報。                                                                             |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>建議須知</strong></p>
  <p className="mt-2">原生和流動性再質押者通常會將他們已質押的 ETH 委託給營運者，而不是自己運行軟體來保護 AVS。</p>
  <p className="mt-2">這樣他們就不需要擔心 AVS 複雜的技術要求，儘管他們收到的獎勵率比營運者低。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 再質押有哪些例子？ {#what-are-some-examples-of-restaking}

雖然這是一個新穎的想法，但已經出現了一些專案來探索再質押的可能性。

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>用詞不當警報</strong></p>
  <p className="mt-2">有些人會將「再質押」與在 DeFi 中借出和借入 LST 混淆。 兩者都是讓已質押的 ETH 發揮作用，但再質押意味著保護 AVS，而不僅僅是在 LST 上賺取收益。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 我能從再質押中賺多少錢？ {#how-much-can-i-make-from-restaking}

雖然 AVS 提供不同的利率，但像 eETH 這樣的流動性再質押代幣 (LRT) 能讓您了解可以賺多少錢。 就像質押您的 ETH 會得到 stETH 等 LST 一樣，再質押 stETH 可以得到 eETH 等 LRT。 這些代幣可以賺取 ETH 質押和再質押獎勵。

**承認再質押的風險很重要。 潛在獎勵可能很吸引人，但並非沒有風險。**

## 再質押的風險是什麼？ {#what-are-the-risks-of-restaking}

| **風險**        | **描述**                                                      |
| ------------- | ----------------------------------------------------------- |
| **罰款（或「罰沒」）** | 就像 ETH 質押一樣，如果再質押者/營運者離線、審查訊息或試圖破壞網路，他們的質押品可能會被部分或全部罰沒（銷毀）。 |
| **中心化**       | 如果少數營運者主導了大部分的再質押，他們可能會對再質押者、AVS 甚至再質押平台產生巨大影響。             |
| **連鎖反應**      | 如果一個再質押者在保護多個 AVS 時被罰沒，這可能會降低其他 AVS 的安全性，使其變得易受攻擊。          |
| **立即存取資金**    | 提取再質押的 ETH 有一段等待時間（或「解綁定期」），所以您可能無法總是立即存取。                  |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>以太坊共同創辦人正在輸入...</strong></p>
  <p className="mt-2">
    以太坊共同創辦人 Vitalik 在 2021 年一篇名為 <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">《不要讓共識超載》</a>的部落格文章中警告了再質押的潛在風險。 </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## 如何開始再質押？ {#how-to-get-started-with-restaking}

| 🫡 初學者                                                              | 🤓 進階使用者                                                    |
| ------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1.  在 Lido 或 Rocket Pool 等平台上質押 ETH 以獲得 LST。 | 1.  在以太坊上作為驗證者質押您的 ETH。              |
| 2. 使用這些 LST 在再質押服務上開始再質押。                    | 2. 比較 EigenLayer、Symbiotic 和其他再質押服務。 |
|                                                                     | 3 按照說明將您的驗證者連接到再質押智能合約。                                     |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>以太坊質押：</strong>如何運作？</p>
  <ButtonLink href="/staking/">
    了解更多
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 進階 {#advanced}

<YouTube id="-V-fG4J1N_M" />

## 延伸閱讀 {#further-reading}

1. [ethereum.org - ETH 質押指南](https://ethereum.org/en/staking/)
2. [Ledger Academy - 什麼是以太坊再質押？](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer：去中心化以太坊再質押協議詳解](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - 不要讓以太坊的共識超載](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - 什麼是 EigenLayer？ 以太坊的再質押協議詳解](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer：與 Sreeram Kannan 談為以太坊添加無需許可的功能](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer 詳解：什麼是再質押？](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - 再質押數據儀表板](https://www.theblock.co/data/decentralized-finance/restaking)
