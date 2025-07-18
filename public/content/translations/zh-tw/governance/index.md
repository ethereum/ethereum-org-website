---
title: 以太坊管理體系
description: 以太坊決策方式的簡介。
lang: zh-tw
---

# 以太坊管理體系的簡介 {#introduction}

_如果沒人擁有以太坊，如何針對以太坊過去和未來的變動，作出相關決定？ 以太坊管理體系是一種能讓人作出此類決定的流程。_

<Divider />

## 什麽是管理體系？ {#what-is-governance}

管理體系是一種讓人能作決策的系統。 一般典型的組織結構中，執行團隊或董事會可能擁有最終決策權。 或者，股東也許能為提案投票，實行變革。 在政治體系中，推選的官員能立法，盡力反映選民的期望。

## 去中心化管理體系 {#decentralized-governance}

以太坊協定並無擁有者或控制者，但為了徹底確保網路長久運作且蓬勃發展，仍需做出實行變革的決策。 由於缺乏擁有權，因此不適合以傳統的組織治理方式來解決。

## 以太坊管制 {#ethereum-governance}

以太坊管理體系是一種變更協定的流程。 此流程本身和人或應用程式如何使用協定無關，這點很重要，以太坊是無需許可的。 世界上每個人都能參與以太坊鏈上的活動。 對於誰能建立應用程式或傳送交易，並無規則限制。 但若想提議變更核心協定，確實有既定的流程，去中心化應用程式就是在此協定上執行。 由於現今太多人倚賴以太坊的穩定性，因此包括社會和技術流程在內，核心變更的協作門檻非常高，確保無論對以太坊作出何種變更，都能安全無虞且獲得社群的廣泛支援。

### 鏈上與鏈下管理體系的比較 {#on-chain-vs-off-chain}

區塊鏈技術為管理體系帶來了新的可能性，俗稱鏈上管理體系。 鏈上管理體系是指提出的協定變更由利益相關方投票決定。通常是管理體系代幣的持有者投票，且投票是在區塊鏈上進行。 某些形式的鏈上管理體系，提出的協定變更已經寫入程式碼中，如果利益相關方簽署交易核准許變更內容，還會自動實作這些變更。

鏈外管理體系則與上述體系相反，任何協定變更決定都是透過非正式的社會討論過程進行，一旦經核准，將會實作到程式碼中。

**以太坊管理體系發生於鏈下**，參與該流程的利益相關方形形色色。

_雖然以太坊管理體系在協定層級為鏈下，但許多建立在以太坊上的使用案例，例如去中心化自治組織，都使用鏈上管理體系。_

<ButtonLink href="/dao/">
  更多去中心化自治組織相關資訊
</ButtonLink>

<Divider />

## 誰參與其中？ {#who-is-involved}

[以太坊社群](/community/)中的利益相關方形形色色，在管理體系流程中各有其作用。 以協定為核心，利益相關方從遠到近分別有：

- **以太幣持有者**：其持有任意數量的以太幣。 [更多以太幣相關資訊](/eth/)。
- **應用程式使用者**：在以太坊區塊鏈上與應用程式互動。
- **應用程式／模組化開發者**：其編寫在以太坊區塊鏈上執行的應用程式（例如去中心化金融、非同質化代幣等），或建立模組化，以便和以太坊互動（例如錢包、測試套件等）。 [去中心化應用程式的相關細節](/dapps/)。
- **節點運營商**：其執行能廣播區塊及交易的節點，拒絕發現的任何無效的交易或區塊。 [更多節點相關資訊](/developers/docs/nodes-and-clients/)。
- **以太坊改進提案作者**：其提出以太坊改進提案，提議變更以太坊協定。 [更多以太坊改進提案相關資訊](/eips/)。
- **驗證者**：其執行能為以太坊區塊鏈新增區塊的節點。
- **協定開發者**（俗稱 「核心開發者」）：這些人負責維護各種以太坊實作（如執行層的 go-ethereum、Nethermind、Besu、Erigon、Reth；共識層的 Prysm、Lighthouse、Nimbus、Teku、Lodestar、Grandine）。 [更多以太坊用戶端相關資訊](/developers/docs/nodes-and-clients/)。

_注意：任何人都能參與多個組別，例如，協定開發者可以支援以太坊改進提案、執行信標鏈驗證者，並使用去中心化金融應用程式。 但為了清楚交代概念，區分這些相關方是最簡易的作法。_

<Divider />

## 什麼是以太坊改進提案？ {#what-is-an-eip}

以太坊管理體系採用一個重要的流程，就是**以太坊改進提案 (EIP)**。 以太坊改進提案是規定以太坊潛在的新功能或流程的標準。 以太坊社群中的每一個人都能建立以太坊改進提案。 如果你有興趣編寫 以太坊改進提案或參與同儕審查和/或管理體系，請參閱：

<ButtonLink href="/eips/">
  更多以太坊改進提案相關資訊
</ButtonLink>

<Divider />

## 正式流程 {#formal-process}

要對以太坊協定進行變更，正式流程如下：

1. **提出核心以太坊改進提案**：如 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) 所述，要正式對以太坊提出變更，第一步是在核心以太坊改進提案中詳述此變更。 當協定開發者實作以太坊改進提案（若被接受），這將成為此以太坊改進提案的官方規範。

2. **將以太坊改進提案提供給協定開發者**：為核心以太坊改進提案收集社群意見後，你應該將其提供給協定開發者。 想提供此提案，提出來在 [AllCoreDevs 電話會議](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status)上討論即可。 [Ethereum Magicians 論壇](https://ethereum-magicians.org/)或 [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw) 可能已經非同步進行某些討論。

> 此階段可能產生以下結果：

> - 未來升級網路時會考慮此以太坊改進提案
> - 將請求進行技術變更
> - 如果非當務之急，或相對於開發工作而言，改善程度不夠顯著，可能會被拒絕

3. **朝最終提案進行迭代：**收到所有利益相關方的回饋意見後，你很可能需要對初始提案進行修改，以提高安全性或更加滿足多種使用者的需求。 當以太坊改進提案納入你認為必須納入的所有變更，你需要再次提供給協定開發者。 之後將進入此流程的下個步驟；或是出現新的問題，提案必須再迭代一輪。

4. **網路升級中納入以太坊改進提案**：假設以太坊改進提案已核准、測試及實作，以太坊改進提案會被安排為網路升級的一部分。 由於網路升級的協調成本很高（每個人需同步升級），升級通常會將以太坊改進提案綁搭在一起。

5. **網路升級啟動**：啟動網路升級後，以太坊改進提案將能在以太坊網路上線。 _注意：網路升級通常會先在測試網上啟動，之後才在以太坊主網上啟動。_

這個流程雖然非常簡化，但大致說明了在以太坊實現協定變更的重要階段。 現在來看看有哪些非正式因素在此流程中產生作用。

## 非正式流程 {#informal-process}

### 了解先前的工作 {#prior-work}

以太坊改進提案擁護者應先熟悉之前的工作和提案，之後再建立能受到認真考慮可部署於以太坊主網的以太坊改進提案。 這樣一來，以太坊改進提案但願能帶來一些未被拒絕過的新內容。 要深入研究這點，有三個主要的位置：[以太坊改進提案儲存庫](https://github.com/ethereum/EIPs)、[Ethereum Magicians](https://ethereum-magicians.org/) 和 [ethresear.ch](https://ethresear.ch/)。

### 工作群組 {#working-groups}

以太坊改進提案初稿未經編輯或改動，不太可能直接在以太坊主網上實作。 一般來說，以太坊改進提案擁護者會和一部分協定開發者合作，以指定、實作、測試、迭代和完成其提案。 過去，這些工作群組通常需要幾個月，有時甚至數年來完成這項工作！ 同樣，提出此類變更的以太坊改進提案擁護者，在努力收集終端使用者的回饋意見和減輕任何部署風險時，應讓相關的應用程式／模組化開發者提早加入行列。

### 社群共識 {#community-consensus}

有些以太坊改進提案都是技術上的改進，簡單明瞭，差別非常細微，有些則較複雜，並且需要權衡，將以不同的方式影響不同的利益相關方。 這表示某些以太坊改進提案在社群中比其他提案更具爭議。

對於如何處理具爭議的提案，目前沒有明確的方案。 這是以太坊去中心化設計使然，沒有一個利益相關方群體可以暴力迫使他人：協定開發者可以選擇不要實作程式碼變更；節點運營商可以選擇不要執行最新的以太坊用戶端；應用程式團隊及使用者可以選擇不要在鏈上交易。 由於協定開發者無法強迫人進行網路升級，因此若與給更廣泛的社群帶來利益相比，提案更容易引發爭議，他們通常會避免實作以太坊改進提案。

以太坊改進提案擁護者必須向所有利益相關方徵取回饋意見。 如果你擁護的以太坊改進提案有爭議，你應嘗試解決異議，使人對該提案產生共識。 由於以太坊社群廣大、多元，沒有任何一個指標能用來衡量社群共識（例如貨幣投票），以太坊改進提案擁護者必須適應提案的實際情況。

除了以太坊網路的安全性以外，協定開發者歷來非常重視應用程式／模組化開發者和應用程式使用者看重些什麼，因為他們在以太坊上的使用與開發行為，是生態系統能吸引其他利益相關方的原因所在。 此外，以太坊改進提案必須跨所有用戶端實作來執行，而用戶端實作由不同的團隊管理。 實作過程中常得說服許多協定開發者團隊相信作出某個變更很重要，能幫助到終端使用者或解決安全性問題。

<Divider />

## 處理爭論 {#disagreements}

當涉及多位利益相關方，且各有不同的動機和觀點，有爭議是很常見的。

處理爭論時，通常是在公開論壇中進行漫長的討論，以了解問題的根源，並讓任何人都能加入。 通常某一方會讓步，或取得一個皆大歡喜的折衷方法。 如果一方給人感覺很強勢，強力推行某個變更可能會導致鏈分叉。 鏈分叉是指某些利益相關方反對執行協定變更，導致運作的協定出現不相容的版本，從中形成兩條不同的區塊鏈。

### 去中心化自治組織分叉 {#dao-fork}

分叉係指網路必須進行重大的技術升級或變更，且這些升級或變更改變協定的「規則」之時。 [以太坊用戶端](/developers/docs/nodes-and-clients/)必須升級自己的軟體，以實作新分叉規則。

實行去中心化自治組織分叉是因為 [2016 DAO 攻擊](https://www.coindesk.com/learn/understanding-the-dao-attack)，[去中心化自治組織](/glossary/#dao)合約不夠安全，被駭客榨取超過 360 萬以太幣。 使用分叉後，資金從這份有缺陷的合約轉移到新的合約，當時因駭客攻擊而損失資金的人，後來都拿回了資金。

這個做法是以太坊社群投票的結果。 所有以太幣持有者都能透過[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易進行投票。 許多人支持分叉的決定，投票率超過 85%。

要注意的是，雖然協定當時利用分叉轉危為安，但投票在決定分叉時所佔的重要性，仍存在爭議，原因如下：

- 投票率低得驚人
- 多數人都不知道舉行了投票
- 這次投票只代表以太幣的持有者，不包括系統中任何其他參與者

社群中某些人拒絕分叉，主因是他們認為去中心化自治組織的這起事件，不是協定方面的缺陷。 他們之後又成立[以太坊經典](https://ethereumclassic.org/)平台。

如今，以太坊社群遇到合約漏洞或資金損失時採取不干涉政策，以維護系統的中立性和可信度。

觀賞影片，深入了解 DAO 遭駭事件：

<YouTube id="rNeLuBOVe8A" />

<Divider />

### 分叉的功用 {#forking-utility}

以太坊/以太坊經典平台的分叉，是良好分叉的絕佳典範。 有兩派人對一些核心價值觀存在非常大的分歧，大到認為值得冒相關的風險追求各自的做法。

能否在政治、哲學或經濟差異甚大的情況下實行分叉，對以太坊管理體系的成功有重大的影響。 若不能分叉，另一種方案只能持續暗鬥，以太坊經典平台最終的成立者也只能被迫參與，對以太坊的成功也產生越來越不同的看法。

<Divider />

## 信標鏈管理體系 {#beacon-chain}

以太坊管理體系流程常犧牲速度和效率，以換取開放性和包容性。 為了加速信標鏈的發展，信標鏈的推出係獨立於工作量證明以太坊網路之外，並遵循自己的管理體系常規。

雖然規範和開發實作一直完全開源，但那些用於提出上述更新內容的正式流程，並未被採用。 這使得研究人員和實作者能更快指定和同意變更內容。

2022 年 9 月 15 日，信標鏈與以太坊執行層完成合併，這項合併當時是[巴黎網路升級](/history/#paris)的一部分。 提案 [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) 從「最後召集」變成「最終確定」，轉變成權益證明機制。

<ButtonLink href="/roadmap/merge/">
  合併案的相關細節
</ButtonLink>

<Divider />

## 我能如何參與其中？ {#get-involved}

- [提出以太坊改進提案](/eips/#participate)
- [探討現有提案](https://ethereum-magicians.org/)
- [參與研發討論](https://ethresear.ch/)
- [加入 Ethereum R&D Discord](https://discord.gg/mncqtgVSVw)
- [運行一節點](/developers/docs/nodes-and-clients/run-a-node/)
- [協助用戶端開發](/developers/docs/nodes-and-clients/#execution-clients)
- [核心開發者學徒計畫](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## 衍生閱讀 {#further-reading}

以太坊管理體系的定義並不嚴謹。 不同社群參與者對其看法不一。 其中包括：

- [區塊鏈治理筆記](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [以太坊管理體系如何運作？](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [以太坊管理體系如何運作](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [以太坊核心開發者為何？](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [管理體系，第二部分：統治階級仍舊令人搖頭](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [跳脫代幣投票治理體系](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
