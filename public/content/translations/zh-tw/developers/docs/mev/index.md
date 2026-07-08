---
title: "最大可提取價值 (MEV)"
description: "最大可提取價值 (MEV) 簡介"
lang: zh-tw
---

最大可提取價值 (MEV) 是指在標準區塊獎勵和 Gas 費之外，透過包含、排除和改變區塊中交易的順序，從區塊生產中可以提取的最大價值。

## 最大可提取價值 {#maximal-extractable-value}

最大可提取價值最初應用於[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/)的背景下，最初被稱為「礦工可提取價值」。這是因為在工作量證明中，礦工控制著交易的包含、排除和排序。然而，自從透過[合併](/roadmap/merge)過渡到權益證明 (PoS) 以來，驗證者一直負責這些角色，而挖礦不再是[以太坊](/)協定的一部分。不過，價值提取的方法仍然存在，因此現在改用「最大可提取價值」一詞。

## 先決條件 {#prerequisites}

確保您熟悉[交易](/developers/docs/transactions/)、[區塊](/developers/docs/blocks/)、[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)和[燃料](/developers/docs/gas/)。熟悉[去中心化應用程式 (dapp)](/apps/)和[去中心化金融 (DeFi)](/defi/)也會有所幫助。

## MEV 提取 {#mev-extraction}

理論上，MEV 完全歸屬於驗證者，因為他們是唯一能保證執行有利可圖的 MEV 機會的參與者。然而在實務上，很大一部分的 MEV 是由被稱為「搜尋者」的獨立網路參與者所提取。搜尋者在區塊鏈資料上執行複雜的演算法，以偵測有利可圖的 MEV 機會，並讓機器人自動將這些有利可圖的交易提交到網路。

無論如何，驗證者確實會獲得全部 MEV 金額的一部分，因為搜尋者願意支付高昂的 Gas 費（歸驗證者所有），以換取他們有利可圖的交易被包含在區塊中的更高可能性。假設搜尋者在經濟上是理性的，搜尋者願意支付的 Gas 費將高達搜尋者 MEV 的 100%（因為如果 Gas 費更高，搜尋者就會虧錢）。

因此，對於一些競爭激烈的 MEV 機會，例如[去中心化交易所 (DEX) 套利](#mev-examples-dex-arbitrage)，搜尋者可能必須將其總 MEV 收入的 90% 甚至更多作為 Gas 費支付給驗證者，因為有太多人想要執行相同的獲利套利交易。這是因為保證其套利交易得以執行的唯一方法，就是以最高的 Gas 價格提交交易。

### Gas golfing {#mev-extraction-gas-golfing}

這種動態使得擅長「Gas golfing」（編寫交易程式碼以使用最少量的燃料）成為一種競爭優勢，因為它允許搜尋者設定更高的 Gas 價格，同時保持其總 Gas 費不變（因為 Gas 費 = Gas 價格 \* 使用的燃料）。

一些著名的 Gas golfing 技巧包括：使用以一長串零開頭的地址（例如 [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)），因為它們佔用較少的儲存空間（因此消耗較少的燃料）；以及在合約中保留少量的 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代幣餘額，因為初始化儲存槽（餘額為 0 的情況）比更新儲存槽花費更多的燃料。尋找更多減少燃料使用的技巧是搜尋者之間活躍的研究領域。

### 通用搶先交易者 {#mev-extraction-generalized-frontrunners}

有些搜尋者並非編寫複雜的演算法來偵測有利可圖的 MEV 機會，而是執行通用搶先交易機器人 (generalized frontrunners)。通用搶先交易者是監控記憶體池以偵測有利可圖交易的機器人。搶先交易者會複製潛在獲利交易的程式碼，將地址替換為搶先交易者的地址，並在本地執行交易，以再次確認修改後的交易能為搶先交易者的地址帶來利潤。如果該交易確實有利可圖，搶先交易者將提交帶有替換地址和更高 Gas 價格的修改後交易，從而「搶先」原始交易並獲得原始搜尋者的 MEV。

### Flashbots {#mev-extraction-flashbots}

Flashbots 是一個獨立專案，它透過一項服務擴展了執行客戶端，允許搜尋者將 MEV 交易提交給驗證者，而無需將其暴露在公開的記憶體池中。這可以防止交易被通用搶先交易者搶先。

## MEV 範例 {#mev-examples}

MEV 在區塊鏈上以幾種方式出現。

### DEX 套利 {#mev-examples-dex-arbitrage}

[去中心化交易所](/glossary/#dex) (DEX) 套利是最簡單也是最著名的 MEV 機會。因此，它也是競爭最激烈的。

它的運作方式如下：如果兩個 DEX 以兩種不同的價格提供某種代幣，有人可以在單一的原子交易中，在價格較低的 DEX 上購買該代幣，並在價格較高的 DEX 上出售。由於區塊鏈的機制，這是真正的無風險套利。

[這是一個有利可圖的套利交易範例](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4)，搜尋者利用尤尼斯瓦普和 Sushiswap 上 ETH/DAI 交易對的不同定價，將 1,000 ETH 變成了 1,045 ETH。

### 清算 {#mev-examples-liquidations}

借貸協定清算提供了另一個著名的 MEV 機會。

像 Maker 和 Aave 這樣的借貸協定要求使用者存入一些抵押品（例如 ETH）。這些存入的抵押品隨後被用於借貸給其他使用者。

使用者隨後可以根據自己的需求向他人借款資產和代幣（例如，如果您想在 MakerDAO 治理提案中投票，您可能會借入 MKR），最高可達其存入抵押品的特定百分比。例如，如果借款金額最高為 30%，則向協定存入 100 DAI 的使用者最多可以借入價值 30 DAI 的另一種資產。協定決定了確切的借款能力百分比。

隨著借款人抵押品價值的波動，他們的借款能力也會隨之波動。如果由於市場波動，借入資產的價值超過了其抵押品價值的（例如）30%（同樣，確切的百分比由協定決定），協定通常允許任何人清算抵押品，立即償還給貸款人（這類似於傳統金融中[追加保證金](https://www.investopedia.com/terms/m/margincall.asp)的運作方式）。如果被清算，借款人通常必須支付高昂的清算費，其中一部分歸清算人所有——這就是 MEV 機會的來源。

搜尋者競相盡快解析區塊鏈資料，以確定哪些借款人可以被清算，並成為第一個提交清算交易並為自己收取清算費的人。

### 三明治交易 {#mev-examples-sandwich-trading}

三明治交易是另一種常見的 MEV 提取方法。

為了進行三明治交易，搜尋者會監控記憶體池中的大型 DEX 交易。例如，假設有人想在尤尼斯瓦普上用 DAI 購買 10,000 UNI。這種規模的交易將對 UNI/DAI 交易對產生有意義的影響，可能會顯著提高 UNI 相對於 DAI 的價格。

搜尋者可以計算這筆大額交易對 UNI/DAI 交易對的近似價格影響，並在大額交易_之前_立即執行最佳買單，廉價買入 UNI，然後在大額交易_之後_立即執行賣單，以大單造成的較高價格將其賣出。

然而，三明治交易的風險更高，因為它不是原子性的（與上述 DEX 套利不同），並且容易受到[沙門氏菌攻擊 (salmonella attack)](https://github.com/Defi-Cartel/salmonella)。

### NFT MEV {#mev-examples-nfts}

NFT 領域的 MEV 是一個新興現象，並不一定有利可圖。

然而，由於 NFT 交易發生在所有其他以太坊交易共享的同一個區塊鏈上，搜尋者也可以在 NFT 市場中使用與傳統 MEV 機會類似的技術。

例如，如果有一個受歡迎的 NFT 發行，而搜尋者想要某個 NFT 或一組 NFT，他們可以編寫交易程式碼，使自己排在第一位購買該 NFT，或者他們可以在單筆交易中購買整組 NFT。或者，如果某個 NFT [被錯誤地以低價上架](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent)，搜尋者可以搶在其他購買者之前以低價搶購。

NFT MEV 的一個著名例子發生在一名搜尋者花費 700 萬美元以底價[購買](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs)每一個 Cryptopunk 時。一位區塊鏈研究員[在推特上解釋了](https://twitter.com/IvanBogatyy/status/1422232184493121538)買家如何與 MEV 提供商合作以對其購買保密。

### 長尾效應 {#mev-examples-long-tail}

DEX 套利、清算和三明治交易都是非常著名的 MEV 機會，對於新的搜尋者來說不太可能有利可圖。然而，存在著大量鮮為人知的長尾 MEV 機會（NFT MEV 可以說是其中之一）。

剛起步的搜尋者或許能透過在這條長尾中尋找 MEV 來獲得更多成功。Flashbots 的 [MEV 工作板](https://github.com/flashbots/mev-job-board)列出了一些新興的機會。

## MEV 的影響 {#effects-of-mev}

MEV 並非全都是壞事——以太坊上的 MEV 既有正面影響，也有負面影響。

### 優點 {#effects-of-mev-the-good}

許多去中心化金融 (DeFi) 專案依賴經濟理性的參與者來確保其協定的實用性和穩定性。例如，DEX 套利確保使用者獲得其代幣的最佳、最正確價格，而借貸協定則依賴於當借款人低於抵押率時的快速清算，以確保貸款人獲得還款。

如果沒有理性的搜尋者尋找並修復經濟效率低下的問題，並利用協定的經濟激勵，DeFi 協定和去中心化應用程式 (dapp) 整體而言可能不會像今天這樣穩健。

### 缺點 {#effects-of-mev-the-bad}

在應用層，某些形式的 MEV（如三明治交易）會為使用者帶來明顯更差的體驗。被夾擊的使用者面臨滑價增加和交易執行變差的問題。

在網路層，通用搶先交易者及其經常參與的 Gas 價格拍賣（當兩個或多個搶先交易者透過逐步提高自己交易的 Gas 價格來競爭將其交易包含在下一個區塊中時）會導致網路擁塞，並使其他試圖執行常規交易的人面臨高昂的 Gas 價格。

除了區塊_內部_發生的事情之外，MEV 還可能在區塊_之間_產生有害影響。如果區塊中可用的 MEV 顯著超過標準區塊獎勵，驗證者可能會受到激勵去重組區塊並為自己捕獲 MEV，從而導致區塊鏈重組和共識不穩定。

這種區塊鏈重組的可能性[之前已在比特幣區塊鏈上探討過](https://dl.acm.org/doi/10.1145/2976749.2978408)。隨著比特幣的區塊獎勵減半，且交易費在區塊獎勵中所佔的比例越來越大，就會出現這樣的情況：礦工放棄下一個區塊的獎勵，轉而重新挖掘具有更高費用的過去區塊，這在經濟上是理性的。隨著 MEV 的增長，以太坊也可能發生類似的情況，威脅到區塊鏈的完整性。

## MEV 的現狀 {#state-of-mev}

MEV 提取在 2021 年初激增，導致該年前幾個月的 Gas 價格極高。Flashbots 的 MEV 中繼的出現降低了通用搶先交易者的有效性，並將 Gas 價格拍賣轉移到鏈下，從而降低了普通使用者的 Gas 價格。

雖然許多搜尋者仍然從 MEV 中賺取豐厚的利潤，但隨著機會變得越來越為人所知，並且越來越多的搜尋者競爭同一個機會，驗證者將捕獲越來越多的總 MEV 收入（因為最初描述的同類 Gas 拍賣也發生在 Flashbots 中，儘管是私下進行的，而驗證者將捕獲由此產生的 Gas 收入）。MEV 也並非以太坊獨有，隨著以太坊上的機會競爭變得更加激烈，搜尋者正在轉向幣安智能鏈 (Binance Smart Chain) 等替代區塊鏈，那裡存在與以太坊類似的 MEV 機會，但競爭較少。

另一方面，從工作量證明到權益證明的過渡，以及使用匯總來擴展以太坊的持續努力，都以某種仍不清楚的方式改變了 MEV 的格局。與工作量證明中的機率模型相比，稍微提前知道有保證的區塊提案者會如何改變 MEV 提取的動態，或者當實施[單一秘密領導者選舉 (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789)和[分散式驗證者技術](/staking/dvt/)時這將如何被顛覆，目前尚不清楚。同樣，當大多數使用者活動從以太坊轉移到其第二層 (L2) 匯總和分片上時，存在哪些 MEV 機會還有待觀察。

## 以太坊權益證明 (PoS) 中的 MEV {#mev-in-ethereum-proof-of-stake}

如前所述，MEV 對整體使用者體驗和共識層安全具有負面影響。但以太坊向權益證明共識的過渡（被稱為「合併」）可能會引入與 MEV 相關的新風險：

### 驗證者中心化 {#validator-centralization}

在合併後的以太坊中，驗證者（已繳納 32 ETH 的安全押金）對添加到信標鏈的區塊的有效性達成共識。由於 32 ETH 對許多人來說可能遙不可及，因此[加入質押池](/staking/pools/)可能是更可行的選擇。儘管如此，[獨立質押者](/staking/solo/)的健康分佈是理想的，因為它可以減輕驗證者的中心化並提高以太坊的安全性。

然而，人們認為 MEV 提取能夠加速驗證者中心化。部分原因是，由於驗證者[提出區塊的收入](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply)低於以前的礦工，自[合併](/roadmap/merge/)以來，MEV 提取極大地[影響了驗證者的收益](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb)。

較大的質押池可能會有更多資源來投資必要的最佳化，以捕獲 MEV 機會。這些池提取的 MEV 越多，它們就擁有越多的資源來提高其 MEV 提取能力（並增加整體收入），實質上創造了[規模經濟](https://www.investopedia.com/terms/e/economiesofscale.asp#)。

由於可支配的資源較少，獨立質押者可能無法從 MEV 機會中獲利。這可能會增加獨立驗證者加入強大質押池以提高收益的壓力，從而降低以太坊的去中心化程度。

### 許可制記憶體池 {#permissioned-mempools}

為了應對三明治交易和搶先交易攻擊，交易者可能會開始與驗證者進行鏈下交易以獲得交易隱私。交易者不會將潛在的 MEV 交易發送到公開的記憶體池，而是將其直接發送給驗證者，驗證者將其包含在區塊中並與交易者分享利潤。

「暗池 (Dark pools)」是這種安排的更大版本，其功能為許可制、僅限存取的記憶體池，向願意支付特定費用的使用者開放。這種趨勢將削弱以太坊的非許可制和無須信任性，並可能將區塊鏈轉變為有利於出價最高者的「付費參與 (pay-to-play)」機制。

許可制記憶體池也會加速上一節中描述的中心化風險。執行多個驗證者的大型池可能會受益於向交易者和使用者提供交易隱私，從而增加其 MEV 收入。

在合併後的以太坊中對抗這些與 MEV 相關的問題是一個核心研究領域。迄今為止，為減少合併後 MEV 對以太坊去中心化和安全性的負面影響而提出的兩個解決方案是[**提案者與建構者分離 (PBS)**](/roadmap/pbs/)和 [**Builder API**](https://github.com/ethereum/builder-specs)。

### 提案者與建構者分離 {#proposer-builder-separation}

在工作量證明和權益證明中，建構區塊的節點會向參與共識的其他節點提出將其添加到鏈中的提案。在另一個礦工在其之上建構（在 PoW 中）或它收到大多數驗證者的證明（在 PoS 中）之後，新區塊將成為規範鏈的一部分。

區塊生產者和區塊提案者角色的結合，正是引入了前面描述的大多數與 MEV 相關問題的原因。例如，共識節點受到激勵，在[時間強盜攻擊 (time-bandit attacks)](https://www.mev.wiki/attack-examples/time-bandit-attack)中觸發區塊鏈重組，以最大化 MEV 收益。

[提案者與建構者分離](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) 旨在減輕 MEV 的影響，尤其是在共識層。PBS 的主要特點是分離區塊生產者和區塊提案者的規則。驗證者仍然負責提出區塊並對其進行投票，但一類新的專門實體，稱為**區塊構建者**，負責排序交易和建構區塊。

在 PBS 下，區塊構建者建立一個交易包，並為其包含在信標鏈區塊中（作為「執行負載」）進行投標。被選中提出下一個區塊的驗證者隨後會檢查不同的出價，並選擇費用最高的交易包。PBS 實質上創造了一個拍賣市場，建構者在其中與出售區塊空間的驗證者進行談判。

目前的 PBS 設計使用[承諾-揭示方案 (commit-reveal scheme)](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/)，其中建構者僅發布對區塊內容（區塊頭）的密碼學承諾及其出價。在接受得標出價後，提案者建立一個包含區塊頭的已簽署區塊提案。區塊構建者預計在看到已簽署的區塊提案後發布完整的區塊主體，並且在已定案之前，它還必須收到來自驗證者的足夠[證明](/glossary/#attestation)。

#### 提案者與建構者分離如何減輕 MEV 的影響？ {#how-does-pbs-curb-mev-impact}

協定內的提案者與建構者分離透過將 MEV 提取從驗證者的權限中移除，減少了 MEV 對共識的影響。相反，執行專用硬體的區塊構建者將在未來捕獲 MEV 機會。

不過，這並不完全將驗證者排除在與 MEV 相關的收入之外，因為建構者必須出高價才能讓驗證者接受他們的區塊。儘管如此，由於驗證者不再直接專注於最佳化 MEV 收入，時間強盜攻擊的威脅降低了。

提案者與建構者分離也降低了 MEV 的中心化風險。例如，使用承諾-揭示方案消除了建構者信任驗證者不會竊取 MEV 機會或將其暴露給其他建構者的需要。這降低了獨立質押者從 MEV 中受益的門檻，否則，建構者將傾向於青睞具有鏈下聲譽的大型池並與它們進行鏈下交易。

同樣，驗證者不必信任建構者不會扣留區塊主體或發布無效區塊，因為付款是無條件的。即使提出的區塊不可用或被其他驗證者宣告無效，驗證者的費用仍會處理。在後一種情況下，區塊會被簡單地丟棄，迫使區塊構建者失去所有交易費和 MEV 收入。

### Builder API {#builder-api}

雖然提案者與建構者分離有望減少 MEV 提取的影響，但實施它需要對共識協定進行更改。具體來說，信標鏈上的[分叉選擇](/developers/docs/consensus-mechanisms/pos/#fork-choice)規則需要更新。[Builder API](https://github.com/ethereum/builder-specs) 是一個臨時解決方案，旨在提供提案者與建構者分離的有效實作，儘管具有較高的信任假設。

Builder API 是共識層客戶端用來向執行層客戶端請求執行負載的 [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 的修改版本。正如[誠實驗證者規範](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md)中所述，被選中執行區塊提案職責的驗證者會向連接的執行客戶端請求交易包，並將其包含在提出的信標鏈區塊中。

Builder API 也充當驗證者和執行層客戶端之間的中介軟體；但它的不同之處在於，它允許信標鏈上的驗證者從外部實體獲取區塊（而不是使用執行客戶端在本地建構區塊）。

以下是 Builder API 運作方式的概述：

1. Builder API 將驗證者連接到執行執行層客戶端的區塊構建者網路。與 PBS 中一樣，建構者是專門的參與者，他們投資於資源密集的區塊建構，並使用不同的策略來最大化從 MEV + 優先小費中賺取的收入。

2. 驗證者（執行共識層客戶端）向建構者網路請求執行負載以及出價。建構者的出價將包含執行負載標頭（對負載內容的密碼學承諾）以及支付給驗證者的費用。

3. 驗證者審查傳入的出價，並選擇費用最高的執行負載。使用 Builder API，驗證者建立一個「盲化 (blinded)」的信標區塊提案，其中僅包含他們的簽章和執行負載標頭，並將其發送給建構者。

4. 執行 Builder API 的建構者預計在看到盲化的區塊提案後，會以完整的執行負載進行回應。這允許驗證者建立一個「已簽署」的信標區塊，並將其傳播到整個網路。

5. 使用 Builder API 的驗證者仍預計在本地建構區塊，以防區塊構建者未能及時回應，這樣他們就不會錯過區塊提案獎勵。然而，驗證者不能使用現在揭示的交易或另一組交易建立另一個區塊，因為這將等同於_模稜兩可 (equivocation)_（在同一個時槽內簽署兩個區塊），這是一種會被罰沒 (slashable) 的違規行為。

Builder API 的一個實作範例是 [MEV-Boost](https://github.com/flashbots/mev-boost)，這是對 [Flashbots 拍賣機制](https://docs.flashbots.net/flashbots-auction/overview)的改進，旨在遏制 MEV 對以太坊的負面外部性。Flashbots 拍賣允許權益證明中的驗證者將建構有利可圖區塊的工作外包給稱為**搜尋者**的專門參與者。
![A diagram showing the MEV flow in detail](./mev.png)

搜尋者尋找利潤豐厚的 MEV 機會，並將交易包連同包含在區塊中的[密封價格出價](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction)發送給區塊提案者。執行 mev-geth（Go 以太坊 (Geth) 客戶端的分叉版本）的驗證者只需選擇利潤最高的交易包，並將其作為新區塊的一部分包含在內。為了保護區塊提案者（驗證者）免受垃圾郵件和無效交易的影響，交易包在到達提案者之前會經過**中繼者 (relayers)** 進行驗證。

MEV-Boost 保留了原始 Flashbots 拍賣的相同運作方式，儘管具有為以太坊切換到權益證明而設計的新功能。搜尋者仍然尋找有利可圖的 MEV 交易以包含在區塊中，但一類新的專門參與者，稱為**建構者**，負責將交易和交易包聚合到區塊中。建構者接受來自搜尋者的密封價格出價，並執行最佳化以找到最有利可圖的排序。

中繼者仍然負責在將交易包傳遞給提案者之前對其進行驗證。然而，MEV-Boost 引入了**託管 (escrows)**，負責透過儲存建構者發送的區塊主體和驗證者發送的區塊頭來提供[資料可用性](/developers/docs/data-availability/)。在這裡，連接到中繼的驗證者請求可用的執行負載，並使用 MEV-Boost 的排序演算法來選擇具有最高出價 + MEV 小費的負載標頭。

#### Builder API 如何減輕 MEV 的影響？ {#how-does-builder-api-curb-mev-impact}

Builder API 的核心優勢在於其具有使 MEV 機會存取民主化的潛力。使用承諾-揭示方案消除了信任假設，並降低了尋求從 MEV 中受益的驗證者的進入門檻。這應該會減輕獨立質押者為了提高 MEV 利潤而與大型質押池整合的壓力。

Builder API 的廣泛實施將鼓勵區塊構建者之間進行更激烈的競爭，從而提高抗審查性。當驗證者審查來自多個建構者的出價時，意圖審查一筆或多筆使用者交易的建構者必須出價高於所有其他不進行審查的建構者才能成功。這極大地增加了審查使用者的成本，並阻礙了這種做法。

一些專案（例如 MEV-Boost）使用 Builder API 作為整體結構的一部分，旨在為某些參與者（例如試圖避免搶先交易/三明治攻擊的交易者）提供交易隱私。這是透過在使用者和區塊構建者之間提供私人通訊管道來實現的。與前面描述的許可制記憶體池不同，這種方法有益的原因如下：

1. 市場上存在多個建構者使得審查變得不切實際，這對使用者有利。相反，中心化和基於信任的暗池的存在會將權力集中在少數區塊構建者手中，並增加審查的可能性。

2. Builder API 軟體是開源的，這允許任何人提供區塊構建者服務。這意味著使用者不會被迫使用任何特定的區塊構建者，並提高了以太坊的中立性和非許可制。此外，尋求 MEV 的交易者不會因為使用私人交易管道而無意中助長中心化。

## 相關資源 {#related-resources}

- [Flashbots 文件](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _提供 MEV-Boost 中繼和區塊構建者即時統計資料的追蹤器_

## 延伸閱讀 {#further-reading}

- [什麼是礦工可提取價值 (MEV)？](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV 與我](https://www.paradigm.xyz/2021/02/mev-and-me)
- [以太坊是一座黑暗森林](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [逃離黑暗森林](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots：搶先應對 MEV 危機](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller 的 MEV 討論串](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost：為合併準備就緒的 Flashbots 架構](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [什麼是 MEV-Boost](https://www.alchemy.com/overviews/mev-boost)
- [為什麼要執行 mev-boost？](https://writings.flashbots.net/writings/why-run-mevboost/)
- [以太坊漫遊指南](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)