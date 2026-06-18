---
title: "再質押"
metaTitle: "什麼是再質押？ | 再質押的優勢與用途"
description: "使用已質押的 ETH 來保護其他去中心化服務，並賺取額外獎勵。"
lang: zh-tw
template: use-cases
image: /images/use-cases/restaking.png
alt: "以太坊再質押的視覺化呈現。"
sidebarDepth: 2
summaryPoints:
  - "使用已質押的 ETH 來保護其他去中心化服務，並賺取額外獎勵。"
buttons:
  - content: 什麼是再質押？
    toId: what-is-restaking
  - content: 它是如何運作的？
    toId: how-does-restaking-work
    isSecondary: false
---

以太坊網路全年無休地保護著數十億美元的價值。這是如何做到的？

世界各地的人們將[以太幣 (ETH)](/what-is-ether/)鎖定（或「質押」）在智能合約中，以運行處理以太坊交易並保護以太坊網路的軟體。作為回報，他們會獲得更多 ETH 獎勵。

再質押是一項為[質押者](/staking/)打造的技術，旨在將這種安全性擴展到其他服務、應用程式或網路。作為回報，他們可以賺取額外的再質押獎勵。然而，這也讓他們質押的 ETH 面臨更多風險。

**18 分鐘了解再質押**

<VideoWatch slug="restaking-explained" />

## 什麼是再質押？ {#what-is-restaking}

再質押是指質押者使用其已經質押的 ETH 來保護其他去中心化服務。作為回報，再質押者除了獲得常規的 ETH 質押獎勵外，還可以從這些其他服務中獲得額外獎勵。

由再質押保護的去中心化服務被稱為「主動驗證服務 (AVS)」。
就像許多 ETH 質押者運行以太坊驗證軟體一樣，許多再質押者也會運行專門的 AVS 軟體。

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>溫馨提示</strong>
  <p className="mt-2">雖然「主動驗證服務 (AVS)」是最常見的名稱，但不同的再質押平台可能會對其協助保護的去中心化服務使用其他名稱，例如「自主驗證服務 (Autonomously Validated Services)」、「分散式安全服務 (Distributed Secure Services)」或「網路 (Networks)」。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 質押與再質押 {#staking-vs-restaking}

| 質押 | 再質押 |
| ------------------------------ | ------------------------------------------------- |
| 賺取 ETH 獎勵 | 賺取 ETH 獎勵 + AVS 獎勵 |
| 保護以太坊網路 | 保護以太坊網路 + AVS |
| 無最低 ETH 限制 | 無最低 ETH 限制 |
| 低風險等級 | 低至高風險等級 |
| 提款時間取決於佇列 | 提款時間取決於佇列 + 解除綁定期間 |

## 為什麼我們需要再質押？ {#why-do-we-need-restaking}

想像兩個世界：一個有再質押，另一個沒有。

 <TabbedSection />

在這個有再質押的世界裡，AVS 和質押者都能因為找到彼此並以安全性換取額外獎勵而受益。

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>再質押的額外好處</strong>
  <p className="mt-2">AVS 可以將所有資源投入到建立和行銷其服務中，而不會因為去中心化和安全性問題而分心。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 再質押是如何運作的？ {#how-does-restaking-work}

再質押涉及多個實體——每一個都扮演著重要的角色。

| **術語** | **描述** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **再質押平台** | 再質押平台是連接 AVS、ETH 質押者和營運者的服務。他們為質押者建立去中心化應用程式以再質押其 ETH，並建立市場讓質押者、AVS 和營運者可以找到彼此。 |
| **原生再質押者** | 透過運行自己的以太坊驗證者來質押 ETH 的人，可以將其質押的 ETH 連接到再質押平台（包括 EigenLayer 等），以在 ETH 驗證者獎勵之上賺取再質押獎勵。 |
| **流動性再質押者** | 透過第三方流動性質押提供商（如 Lido 或 Rocket Pool）質押 ETH 的人，會獲得代表其已質押 ETH 的流動性質押代幣 (LST)。他們可以再質押這些 LST 以賺取再質押獎勵，同時保持其原始 ETH 的質押狀態。 |
| **營運者** | 營運者運行 AVS 的再質押軟體，執行每個 AVS 所需的驗證任務。營運者通常是保證正常運行時間和效能等事項的專業服務提供商。與非營運者的再質押者一樣，營運者使用已質押的 ETH 來保護 AVS，但營運者也會獲得額外獎勵作為其工作的回報。 |
| **AVS** | 這些是去中心化服務——例如價格預言機、代幣橋和資料系統——它們從再質押者那裡獲得安全性，並提供代幣獎勵作為回報。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>溫馨提示</strong>
  <p className="mt-2">原生和流動性再質押者通常會將其質押的 ETH 委託給營運者，而不是自己運行軟體來保護 AVS。</p>
  <p className="mt-2">這樣一來，他們就不需要擔心 AVS 複雜的技術要求，儘管他們獲得的獎勵率會低於營運者。</p>
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
 <p className="mt-0"><strong>名稱誤區提示</strong>
  <p className="mt-2">有些人會將「再質押」與去中心化金融 (DeFi) 中借貸和借款 LST 混淆。兩者都讓已質押的 ETH 發揮作用，但再質押意味著保護 AVS，而不僅僅是賺取 LST 的收益。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 我可以從再質押中賺多少錢？ {#how-much-can-i-make-from-restaking}

雖然 AVS 提供不同的費率，但像 eETH 這樣的流動性再質押代幣 (LRT) 可以讓您了解自己能賺多少錢。就像您透過質押 ETH 獲得 stETH 等 LST 一樣，您可以透過再質押 stETH 獲得 eETH 等 LRT。這些代幣可以賺取 ETH 質押和再質押獎勵。

**了解再質押的風險非常重要。潛在的獎勵可能很吸引人，但它們並非沒有風險。**

## 再質押有哪些風險？ {#what-are-the-risks-of-restaking}

| **風險** | **描述** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **懲罰（或「罰沒」）** | 就像 ETH 質押一樣，如果再質押者/營運者離線、審查訊息或試圖破壞網路，他們的質押可能會被部分或全部罰沒（銷毀）。 |
| **中心化** | 如果少數營運者主導了大部分的再質押，他們可能會對再質押者、AVS 甚至再質押平台產生巨大影響。 |
| **連鎖反應** | 如果再質押者在保護多個 AVS 時被罰沒，這可能會降低其他 AVS 的安全性，使它們變得脆弱。 |
| **立即存取資金** | 提取再質押的 ETH 需要等待時間（或「解除綁定期間」），因此您可能無法總是立即存取資金。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>以太坊共同創辦人正在輸入…</strong>
  <p className="mt-2">
    以太坊共同創辦人維塔利克·布特林 (Vitalik Buterin) 在 2021 年一篇名為<a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">不要讓共識超載 (Don't Overload Consensus)</a>的部落格文章中警告了再質押的潛在風險。

</AlertDescription>
</AlertContent>
</Alert>

## 如何開始再質押？ {#how-to-get-started-with-restaking}

| 🫡 初學者 | 🤓 進階使用者 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. 在 Lido 或 Rocket Pool 等平台上質押 ETH 以獲得 LST。 | 1. 將您的 ETH 作為以太坊上的驗證者進行質押。 |
| 2. 使用這些 LST 在再質押服務上開始再質押。 | 2. 比較 EigenLayer、Symbiotic 等再質押服務。 |
|                                                                 | 3. 按照指示將您的驗證者連接到再質押智能合約。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>以太坊質押：</strong>它是如何運作的？
  <ButtonLink href="/staking/">
    了解更多
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 進階 {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## 延伸閱讀 {#further-reading}

1. [ethereum.org - ETH 質押指南](/staking/)
2. [Ledger 學院 - 什麼是以太坊再質押？](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys - EigenLayer：去中心化以太坊再質押協定解析](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [維塔利克·布特林 - 不要讓以太坊的共識超載](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - 什麼是 EigenLayer？以太坊再質押協定解析](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto 研究 - EigenLayer：與 Sreeram Kannan 探討為以太坊添加無需許可的功能](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer 解析：什麼是再質押？](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - 再質押資料儀表板](https://www.theblock.co/data/decentralized-finance/restaking)