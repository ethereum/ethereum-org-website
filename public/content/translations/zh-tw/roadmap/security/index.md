---
title: 一個更安全的以太坊
description: 以太坊是現有最安全、去中心化程度最高的智慧型合約平台。 然而，我們還可以繼續對其進行改進，以便未來能夠保持韌性來對抗任意級別的攻擊。
lang: zh-tw
image: /images/roadmap/roadmap-security.png
alt: "以太坊開發藍圖"
template: roadmap
---

**以太坊已经是一个非常安全的**去中心化[智慧型合约](/glossary/#smart-contract)平台。 但還可以繼續對其進行改進，以便未來能夠保持韌性來對抗各種攻擊。 這些改進包括對[以太坊用戶端](/glossary/#consensus-client)處理競爭[區塊](/glossary/#block)的方式進行微調，以及提高網路認為區塊[「最終確定」](/developers/docs/consensus-mechanisms/pos/#finality)的速度（這意味著攻擊者必須付出巨大的經濟代價才能改變區塊）。

我們還可以做一些改進來提高交易審查難度，方法是讓區塊提交者無法獲知區塊的實際內容，以及無法找尋新的方法來識別用戶端的審查。 這些改進將共同升級[權益證明](/glossary/#pos)協定，讓從個人到企業的使用者立即對其在以太坊上的應用程式、資料和資產建立信心。

## 質押提款 {#staking-withdrawals}

從[工作量證明](/glossary/#pow)到權益證明的升級，始於以太坊先驅將他們的以太幣「質押」到存款合約中。 質押的以太幣用於保護網路安全， 2023 年 4 月 12 日進行了第二次更新，容許提取質押的以太幣。 從此驗證者可以自由地質押或提取以太幣。

<ButtonLink variant="outline-color" href="/staking/withdrawals/">閱讀提款的相關資訊</ButtonLink>

## 對抗攻擊 {#defending-against-attacks}

可以對以太坊權益證明協定進行一些改進。 其中一項稱為[視圖合併](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - 這是一種更安全的[分叉](/glossary/#fork)選擇演算法，可以令某些複雜類型的攻擊難度大增。

縮短以太坊[最終確定](/glossary/#finality)區塊所需的時間將帶來更好的使用者體驗，並可防止複雜的「重組」攻擊，即攻擊者試圖重新打亂最近的區塊以攫取利潤或審查某些交易。 [**單時隙最終確定性 (SSF)**](/roadmap/single-slot-finality/) 是一種**盡可能減少最終確定延遲的方式**。 目前，攻擊者理論上可以說服其他驗證者重新設定 15 分鐘的區塊。 採用單一時隙最終確定性時，這一數值將變為 0。 使用者（從個人至應用程式乃至交易所）都將受益於快速保證其交易不會被還原，消滅整個一類攻擊會讓網路受益。

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">閱讀單一時隙最終確定性的相關資訊</ButtonLink>

## 對抗審查 {#defending-against-censorship}

去中心化可防止個人或小部分[驗證者](/glossary/#validator)的影響力過大。 新的質押技術有助於確保以太坊的驗證者盡可能保持去中心化，同時保護他們免遭硬體、軟體及網路故障。 這包括跨多個[節點](/glossary/#node)共擔驗證者職責的軟體， 被稱為**分散式驗證者技術 (DVT)**。 分散式驗證者技術允許多台電腦共同參與驗證，增強了冗餘和容錯能力，所以鼓勵[質押池](/glossary/#staking-pool)使用分散式驗證者技術。 它還將驗證者金鑰拆分到多個系統中，而不是讓單個運營商執行多個驗證者。 這使得不誠實的運營商更難協調對以太坊的攻擊。 總結來說，分散式驗證者技術的理念是以_群體_而非個體的方式運行驗證者，從而獲得安全優勢。

<ButtonLink variant="outline-color" href="/staking/dvt/">閱讀分散式驗證者技術的相關資訊</ButtonLink>

實作**提交者-建置者分離 (PBS)** 可大幅提升以太坊內建的抗審查能力。 提交者-建置者分離讓一個驗證者建立區塊，另一個負責將該區塊廣播至以太坊網路。 這樣可確保在整個網路中更公平地分享專業的利潤最大化區塊建置演算法帶來的收益，**避免質押逐漸集中**到表現最佳的機構質押者手上。 區塊提交者可以從眾多區塊建置者提供給他們的區塊中，選取收益最高的區塊。 為了對抗審查，區塊提交者常常退而求其次，選取收益較低的區塊，這在**經濟上不合理，網路上的其他驗證者也很容易看出其意圖**。

提交者-建置者分離有潛在的附加功能（如交易加密及包含清單），可以進一步提高以太坊的抗審查能力。 這些功能使得區塊建置者和提交者無法得知其區塊中包含的實際交易。

<ButtonLink variant="outline-color" href="/roadmap/pbs/">閱讀提交者-建置者分離的相關資訊</ButtonLink>

## 保護驗證者 {#protecting-validators}

經驗老道的攻擊者可能有辦法識別下一輪的驗證者，透過傳送垃圾訊息阻止他們提出區塊，這稱為**阻斷服務 (DoS)** 攻擊。 實作[**秘密領導者選舉 (SLE)**](/roadmap/secret-leader-election) 可以阻止區塊提交者提前獲知區塊內容，從而防範此類攻擊。 其作用原理為：不斷變換代表候選區塊提交者的一組加密承諾，並使用其順序來確定驗證者，以便只有驗證者預先知道自己的順序。

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">閱讀秘密領導者選舉的相關資訊</ButtonLink>

## 目前進度 {#current-progress}

**開發藍圖上的安全性升級正處於研究的後期階段**，但預計一段時間內還不會實作。 至於視窗合併、提交者-建置者分離、單一時隙最終確定性和秘密領導者選舉，下一步是最終確定規範並開始建置原型。
