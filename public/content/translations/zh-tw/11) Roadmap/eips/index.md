---
title: 以太坊改進提案 (EIP)
description: 你需要知道的以太坊改進提案基本知識
lang: zh-tw
---

# 以太坊改進提案 (EIP) 簡介 {#introduction-to-ethereum-improvement-proposals}

## 什麼是以太坊改進提案？ {#what-are-eips}

[以太坊改進提案 (EIP)](https://eips.ethereum.org/) 是一種標準，用於明定以太坊的潛在新功能或流程。 以太坊改進提案中包含擬定變更的技術規範，相當於以太坊社群的「事實來源」。 以太坊的網路升級和應用程式標準乃透過以太坊改進提案流程商討和制定。

以太坊社群的任何人皆可建立以太坊改進提案。 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中附有以太坊改進提案撰寫準則。 以太坊改進提案主要應簡明介紹技術規範並概述變更誘因。 以太坊改進提案作者負責在社群內尋求共識並記錄不同意見。 由於提出優秀以太坊改進提案的技術門檻很高，根據過往經驗，通常大部分以太坊改進提案的作者都是應用程式或者協定開發者。

## 以太坊改進提案為什麼很重要？ {#why-do-eips-matter}

以太坊改進提案對於確定如何實作變更以及確保將變更記錄在以太坊上至關重要。 人們依之擬定變更、針對變更展開辯論並採納變更。 [有多種類型的以太坊改進提案](https://eips.ethereum.org/EIPS/eip-1#eip-types)，包括核心以太坊改進提案（針對影響共識且要求進行網路升級的低層級協定變更，如 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)）和以太坊開發者公開徵求意見（針對應用程式標準，如 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 和 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)）。

每次網路升級包含一組以太坊改進提案，網路上的每個[以太坊用戶端](/learn/#clients-and-nodes)都必須實作。 也就是說，為了與以太坊主網上的其他用戶端保持共識，用戶端開發者需要確保他們皆已實作所需的以太坊改進提案。

以太坊改進提案提供變更的技術規範，不僅如此，以太坊還以其為單位推行治理舉措：任何人皆可擬定以太坊改進提案，然後社群中的各個利害關係人將對其展開辯論，以確定是否應將其作為標准採納或包含在網路升級中。 由於非核心以太坊改進提案不一定被所有應用程式採納（例如，可以建立不實作 EIP-20 的同質化代幣），而核心以太坊改進提案必須被廣泛採納（因全數節點必須升級才能成為同一網路的一部分），與非核心以太坊改進提案相比，核心以太坊改進提案需要社群內達成更廣泛的共識。

## 以太坊改進提案演進史 {#history-of-eips}

[以太坊改進提案 (EIP) GitHub 存放庫](https://github.com/ethereum/EIPs)於 2015 年 10 月建立。 以太坊改進提案流程基於[比特幣改進提案 (BIP)](https://github.com/bitcoin/bips) 流程，而後者又是基於 [Python 增強提案 (PEP)](https://www.python.org/dev/peps/) 流程。

以太坊改進提案編輯負責審查以太坊改進提案的技術健全性、格式問題，以及修正拼音、文法及程式碼樣式方面的錯誤。 2015 至 2016 年底，Martin Becze、Vitalik Buterin、Gavin Wood 等人擔綱初代的以太坊改進提案編輯。

以太坊改進提案現任編輯：

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

以太坊改進提案榮譽編輯：

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

倘有興趣成為以太坊改進提案編輯，請詳閱 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)。

以太坊改進提案編輯決定提案何時可成為以太坊改進提案，並且會幫助以太坊改進提案作者推進提案。 [以太坊牧貓人組織](https://www.ethereumcatherders.com/)會協助安排以太坊改進提案編輯與社群之間的會議（請參見 [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)）。

完整的標準化流程以及圖表請見 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## 瞭解更多 {#learn-more}

若有興趣進一步瞭解以太坊改進提案，請參閱[以太坊改進提案網站](https://eips.ethereum.org/)和 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)。 以下為一些實用連結：

- [每個以太坊改進提案的清單](https://eips.ethereum.org/all)
- [所有以太坊改進提案類型的說明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [所有以太坊改進提案狀態的說明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 社群教育專案 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP 是一個教育影片系列，討論以太坊改進提案 (EIP) 以及即將到來的升級的主要功能。*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerds 以ELI5 風格、全面概述各種以太坊改進提案 (EIP)，包括核心 EIP 和應用程式/基礎設施層 EIP (ERC)，以教育讀者並圍繞以太坊協定的提議變更達成共識。*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf 提供以太坊改進提案 (EIP) 的額外資訊，包括它們的狀態、實作細節、相關拉取請求和社群意見回饋。*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun 提供有關以太坊改進提案 (EIP) 的最新消息，EIP 會議更新等等。*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight 根據從不同資源收集的資訊，展示以太坊改進提案 (EIP) 流程的狀態和統計資料。*

## 參與方式 {#participate}

所有人皆可建立以太坊改進提案。 提交提案前必須閱讀 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)，其中概述了以太坊改進提案流程以及撰寫以太坊改進提案的方法；並至[以太坊魔術師](https://ethereum-magicians.org/)徵求意見回饋，提交草案之前應先在這裡與社群討論提案。

## 參考資料 {#references}

<cite class="citation">

頁面內容部分來自 Hudson Jameson 的 [以太坊協定開發治理和網路升級協調](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)

</cite>
