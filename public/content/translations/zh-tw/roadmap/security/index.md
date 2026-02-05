---
title: 一個更安全的以太坊
description: 以太坊是現有最安全、去中心化程度最高的智慧型合約平台。 然而，我們還可以繼續對其進行改進，以便未來能夠保持韌性來對抗任意級別的攻擊。
lang: zh-tw
image: /images/roadmap/roadmap-security.png
alt: "以太坊開發藍圖"
template: roadmap
---

**以太坊已經是一個非常安全的**去中心化[智慧合約](/glossary/#smart-contract)平台。 但還可以繼續對其進行改進，以便未來能夠保持韌性來對抗各種攻擊。 這些變更包括對 [以太坊共識用戶端](/glossary/#consensus-client) 處理競爭[區塊](/glossary/#block)的方式進行微調，並加快網路認定區塊達到[「最終確認」](/developers/docs/consensus-mechanisms/pos/#finality)的速度（這意味著攻擊者若不付出極大的經濟損失，便無法變更區塊）。

我們還可以做一些改進來提高交易審查難度，方法是讓區塊提交者無法獲知區塊的實際內容，以及無法找尋新的方法來識別用戶端的審查。 這些改進將一同升級[權益證明](/glossary/#pos)協定，讓所有使用者（從個人到企業）都能立即對他們在以太坊上的應用程式、資料和資產抱持信心。

## 質押提款 {#staking-withdrawals}

從[工作量證明](/glossary/#pow)到權益證明的升級，始於以太坊先驅將他們的 ETH「質押」到存款合約中。 質押的以太幣用於保護網路安全， 在 2023 年 4 月 12 日進行了第二次更新，允許驗證程式提取質押的 ETH。 從此驗證者可以自由地質押或提取以太幣。

<ButtonLink variant="outline-color" href="/staking/withdrawals/">閱讀關於提款的資訊</ButtonLink>

## 抵禦攻擊 {#defending-against-attacks}

可以對以太坊權益證明協定進行一些改進。 其中一種稱為 [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739)，這是一種更安全的[分叉](/glossary/#fork)選擇演算法，能讓某些複雜的攻擊類型變得更加困難。

縮短以太坊[最終確認](/glossary/#finality)區塊所需的時間，可以提供更好的使用者體驗，並防止複雜的「重組」(reorg) 攻擊，此類攻擊中，攻擊者會試圖重組最近的區塊以獲取利潤或審查某些交易。 [**單一時隙最終性 (SSF)**](/roadmap/single-slot-finality/) 是**一種將最終確認延遲降至最低的方法**。 目前，攻擊者理論上可以說服其他驗證者重新設定 15 分鐘的區塊。 採用單一時隙最終確定性時，這一數值將變為 0。 使用者（從個人至應用程式乃至交易所）都將受益於快速保證其交易不會被還原，消滅整個一類攻擊會讓網路受益。

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">閱讀關於單一時隙最終性的資訊</ButtonLink>

## 抵禦審查 {#defending-against-censorship}

去中心化可防止個人或小群體的[驗證程式](/glossary/#validator)影響力過大。 新的質押技術有助於確保以太坊的驗證者盡可能保持去中心化，同時保護他們免遭硬體、軟體及網路故障。 這包括在多個[節點](/glossary/#node)之間共享驗證程式職責的軟體。 這就是所謂的**分散式驗證程式技術 (DVT)**。 [質押池](/glossary/#staking-pool)有誘因使用 DVT，因為 DVT 允許多台電腦共同參與驗證，從而增加了冗餘和容錯能力。 它還將驗證者金鑰拆分到多個系統中，而不是讓單個運營商執行多個驗證者。 這使得不誠實的運營商更難協調對以太坊的攻擊。 總體而言，這個想法是透過以_社群_而非個人的方式運行驗證程式，來獲得安全性上的好處。

<ButtonLink variant="outline-color" href="/staking/dvt/">閱讀關於分散式驗證程式技術的資訊</ButtonLink>

實作**提議者-建構者分離 (PBS)** 將大幅提升以太坊內建的抗審查能力。 提交者-建置者分離讓一個驗證者建立區塊，另一個負責將該區塊廣播至以太坊網路。 這能確保專業利潤最大化區塊建構演算法的收益在網路上更公平地分享，**避免質押逐漸集中**在表現最好的機構質押者身上。 區塊提交者可以從眾多區塊建置者提供給他們的區塊中，選取收益最高的區塊。 為了進行審查，區塊提議者通常必須選擇一個利潤較低的區塊，這在經濟上**不僅不合理，而且對網路上的其他驗證程式來說也顯而易見**。

提交者-建置者分離有潛在的附加功能（如交易加密及包含清單），可以進一步提高以太坊的抗審查能力。 這些功能使得區塊建置者和提交者無法得知其區塊中包含的實際交易。

<ButtonLink variant="outline-color" href="/roadmap/pbs/">閱讀關於提議者-建構者分離的資訊</ButtonLink>

## 保護驗證程式 {#protecting-validators}

經驗老道的攻擊者或許有辦法識別即將上任的驗證程式，並向他們發送垃圾訊息以阻止他們提議區塊；這就是所謂的**阻斷服務 (DoS)** 攻擊。 實作[**秘密領導人選舉 (SLE)**](/roadmap/secret-leader-election) 將能防止區塊提議者被預先得知，藉此防禦此類攻擊。 其作用原理為：不斷變換代表候選區塊提交者的一組加密承諾，並使用其順序來確定驗證者，以便只有驗證者預先知道自己的順序。

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">閱讀關於秘密領導人選舉的資訊</ButtonLink>

## 目前進度 {#current-progress}

**路線圖上的安全升級正處於研究的後期階段**，但預計還需要一段時間才會實作。 view-merge、PBS、SSF 和 SLE 的下一步是最終確定規範並開始建構原型。
