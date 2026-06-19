---
title: 更安全的以太坊
description: 以太坊是目前最安全且去中心化的智能合約平台。然而，我們仍可進行一些改進，確保以太坊在未來能長期抵禦任何級別的攻擊。
lang: zh-tw
image: /images/roadmap/roadmap-security.png
alt: "以太坊路線圖"
template: roadmap
---

**以太坊已經是一個非常安全**且去中心化的[智能合約](/glossary/#smart-contract)平台。然而，我們仍可進行一些改進，確保以太坊在未來能長期抵禦各種攻擊。這些改進包括對[以太坊用戶端](/glossary/#consensus-client)處理競爭[區塊](/glossary/#block)方式的細微調整，以及提高網路將區塊視為[「已定案」](/developers/docs/consensus-mechanisms/pos/#finality)的速度（這意味著除非攻擊者承受極大的經濟損失，否則無法更改這些區塊）。

還有一些改進能讓審查交易變得更加困難，例如讓區塊提案者無法看見其區塊的實際內容，以及識別用戶端何時在進行審查的新方法。這些改進將共同升級[權益證明 (PoS)](/glossary/#pos)協定，讓從個人到企業的所有使用者，都能對他們在以太坊上的應用程式、資料和資產充滿信心。

## 質押提款 {#staking-withdrawals}

從[工作量證明 (PoW)](/glossary/#pow)到權益證明 (PoS) 的升級，始於以太坊先驅們將他們的 ETH「質押」在存款合約中。這些 ETH 被用來保護網路。2023 年 4 月 12 日進行了第二次更新，允許驗證者提取已質押的 ETH。從那時起，驗證者就可以自由地質押或提取 ETH。

<ButtonLink variant="outline-color" href="/staking/withdrawals/">了解提款</ButtonLink>

## 抵禦攻擊 {#defending-against-attacks}

以太坊的權益證明協定還有改進的空間。其中一項被稱為[視圖合併 (view-merge)](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739)——這是一種更安全的[分叉](/glossary/#fork)選擇演算法，能讓某些複雜類型的攻擊變得更加困難。

縮短以太坊將區塊[定案](/glossary/#finality)的時間，將能提供更好的使用者體驗，並防止複雜的「區塊鏈重組」攻擊（攻擊者試圖重新排列最近的區塊以獲取利潤或審查特定交易）。[**單槽最終性 (SSF)**](/roadmap/single-slot-finality/)是**一種將定案延遲降至最低的方法**。目前，攻擊者在理論上可以說服其他驗證者重新配置長達 15 分鐘的區塊。有了 SSF，這個時間將降為 0。從個人到應用程式和交易所等使用者，都能從交易不會被還原的快速保證中受益，而網路也能藉由阻斷一整類攻擊而獲益。

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">了解單槽最終性</ButtonLink>

## 抵禦審查 {#defending-against-censorship}

去中心化可防止個人或小群體[驗證者](/glossary/#validator)變得過具影響力。新的質押技術有助於確保以太坊的驗證者盡可能保持去中心化，同時保護他們免受硬體、軟體和網路故障的影響。這包括在多個[節點](/glossary/#node)之間分擔驗證者責任的軟體。這被稱為**分散式驗證者技術 (DVT)**。[質押池](/glossary/#staking-pool)有動機使用 DVT，因為它允許多台電腦共同參與驗證，從而增加備援和容錯能力。它還將驗證者金鑰分散到多個系統中，而不是由單一營運商運行多個驗證者。這使得不誠實的營運商更難以協調對以太坊的攻擊。總體而言，這個想法是透過將驗證者作為 _社群_ 而非個人來運行，從而獲得安全效益。

<ButtonLink variant="outline-color" href="/staking/dvt/">了解分散式驗證者技術</ButtonLink>

實施**提案者與建構者分離 (PBS)** 將大幅改善以太坊內建的抗審查防禦能力。PBS 允許一個驗證者建立區塊，並由另一個驗證者將其廣播到以太坊網路。這確保了從專業的利潤最大化區塊建構演算法中獲得的收益，能在網路上更公平地分享，**防止質押隨著時間推移集中**在表現最佳的機構質押者手中。區塊提案者可以從區塊構建者市場提供給他們的區塊中，選擇最有利可圖的區塊。為了進行審查，區塊提案者通常必須選擇利潤較低的區塊，這在**經濟上是不理性的，而且對網路上的其他驗證者來說也是顯而易見的**。

PBS 還有一些潛在的附加功能，例如加密交易和包含列表 (inclusion lists)，可以進一步提高以太坊的抗審查性。這些功能讓區塊構建者和提案者無法看見其區塊中包含的實際交易。

<ButtonLink variant="outline-color" href="/roadmap/pbs/">了解提案者與建構者分離</ButtonLink>

## 保護驗證者 {#protecting-validators}

複雜的攻擊者有可能識別出即將上任的驗證者，並向他們發送垃圾訊息以阻止他們提案區塊；這被稱為**阻斷服務 (DoS)** 攻擊。實施[**秘密領袖選舉 (SLE)**](/roadmap/secret-leader-election)將透過防止區塊提案者被提前知曉，來抵禦這種類型的攻擊。其運作方式是不斷洗牌一組代表候選區塊提案者的密碼學承諾，並使用它們的順序來決定選擇哪個驗證者，這種方式只有驗證者自己才能提前知道他們的順序。

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">了解秘密領袖選舉</ButtonLink>

## 目前進度 {#current-progress}

**路線圖上的安全升級正處於進階研究階段**，但預計還需要一段時間才能實施。視圖合併 (view-merge)、PBS、SSF 和 SLE 的後續步驟是定案規格並開始建立原型。