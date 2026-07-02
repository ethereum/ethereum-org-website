---
title: "如何識別詐騙代幣"
description: "了解詐騙代幣、它們如何偽裝成合法代幣，以及如何避免受騙。"
lang: zh-tw
---

以太坊最常見的用途之一是讓群體建立可交易的代幣，在某種意義上就是他們自己的貨幣。這些代幣通常遵循一個標準：[ERC-20](/developers/docs/standards/tokens/erc-20/)。然而，只要有能帶來價值的合法用例，就會有試圖為自己竊取該價值的犯罪分子。

他們通常會透過以下兩種方式來欺騙你：

- **向你出售詐騙代幣**：這些代幣看起來可能像你想購買的合法代幣，但實際上是由詐騙者發行的，毫無價值。
- **誘騙你簽署惡意交易**：通常是透過將你引導至他們自己的使用者介面。他們可能會試圖讓你給予他們的合約對你 ERC-20 代幣的授權額度，暴露敏感資訊以讓他們存取你的資產等。這些使用者介面可能是真實網站的近乎完美的複製品，但暗藏玄機。

為了說明什麼是詐騙代幣以及如何識別它們，我們將來看一個例子：[`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82)。這個代幣試圖偽裝成合法的 [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) 代幣。

<ExpandableCard
title="什麼是 ARB？"
contentPreview=''>

Arbitrum 是一個開發和管理[樂觀匯總](/developers/docs/scaling/optimistic-rollups/)的組織。最初，Arbitrum 是一家營利性公司，但隨後採取了去中心化的措施。作為該過程的一部分，他們發行了可交易的[治理代幣](/dao/#token-based-membership)。

</ExpandableCard>

<ExpandableCard
title="為什麼詐騙代幣叫做 wARB？"
contentPreview=''>

以太坊中有一個慣例，當資產不符合 ERC-20 標準時，我們會建立一個「包裝」版本，名稱以「w」開頭。例如，我們有代表比特幣的 wBTC 和<a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">代表以太幣的包裝以太幣 (wETH)</a>。

為已經在以太坊上的 ERC-20 代幣建立包裝版本是沒有意義的，但詐騙者依賴的是合法的表象，而不是底層的現實。

</ExpandableCard>

## 詐騙代幣是如何運作的？ {#how-do-scam-tokens-work}

以太坊的核心在於去中心化。這意味著沒有中央機構可以沒收你的資產或阻止你部署智能合約。但這也意味著詐騙者可以部署任何他們想要的智能合約。

<ExpandableCard
title="什麼是智能合約？"
contentPreview=''>

[智能合約](/developers/docs/smart-contracts/)是在以太坊區塊鏈上執行的程式。例如，每個 ERC-20 代幣都是作為智能合約實作的。

</ExpandableCard>

具體來說，Arbitrum 部署了一個使用 `ARB` 代號的合約。但這並不能阻止其他人也部署一個使用完全相同或相似代號的合約。編寫合約的人可以設定合約將執行什麼操作。

## 偽裝成合法代幣 {#appearing-legitimate}

詐騙代幣的建立者會使用幾種伎倆來讓自己看起來合法。

- **合法的名稱和代號**。如前所述，ERC-20 合約可以與其他 ERC-20 合約具有相同的代號和名稱。你不能依賴這些欄位來確保安全。

- **合法的所有者**。詐騙代幣通常會將大量餘額空投到預期為真實代幣合法持有者的地址。

  例如，讓我們再看看 `wARB`。[大約 16% 的代幣](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders)由一個公開標籤為 [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F) 的地址持有。這_不是_一個假地址，它確實是[在以太坊主網上部署真實 ARB 合約](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670)的地址。

  因為地址的 ERC-20 餘額是 ERC-20 合約儲存的一部分，所以合約開發者可以將其指定為任何他們想要的值。合約也有可能禁止轉帳，這樣合法使用者就無法擺脫這些詐騙代幣。

- **合法的轉帳**。_合法的所有者不會付費將詐騙代幣轉帳給其他人，所以如果有轉帳，它一定是合法的，對吧？_ **錯了**。`Transfer` 事件是由 ERC-20 合約產生的。詐騙者可以輕易地編寫合約，使其產生這些操作。

## 詐騙網站 {#websites}

詐騙者還可以製作非常有說服力的網站，有時甚至是真實網站的精確複製品，具有相同的使用者介面，但帶有微妙的陷阱。例如，看似合法的外部連結實際上將使用者傳送到外部詐騙網站，或者錯誤的指示引導使用者暴露他們的金鑰或將資金發送到攻擊者的地址。

避免這種情況的最佳做法是仔細檢查你造訪網站的 URL，並將已知真實網站的地址儲存在你的書籤中。然後，你可以透過書籤存取真實網站，而不會意外拼錯或依賴外部連結。

## 你該如何保護自己？ {#protect-yourself}

1. **檢查合約地址**。合法的代幣來自合法的組織，你可以在該組織的網站上看到合約地址。例如，[對於 `ARB`，你可以在這裡看到合法的地址](https://docs.arbitrum.foundation/deployment-addresses#token)。

2. **真實代幣具有流動性**。另一個選擇是查看 [尤尼斯瓦普](https://uniswap.org/) 上的流動性池規模，這是最常見的代幣交換協定之一。該協定使用流動性池運作，投資者將他們的代幣存入其中，以期從交易費中獲得回報。

詐騙代幣通常只有極小的流動性池（如果有的話），因為詐騙者不想拿真實資產冒險。例如，`ARB`/`ETH` 尤尼斯瓦普池持有約一百萬美元（[在此處查看最新價值](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)），買賣少量代幣不會改變價格：

![Buying a legitimate token](./uniswap-real.png)

但是當你嘗試購買詐騙代幣 `wARB` 時，即使是極小的購買量也會使價格改變超過 90%：

![Buying a scam token](./uniswap-scam.png)

這是另一個向我們表明 `wARB` 不太可能是合法代幣的證據。

3. **在 Etherscan 中查看**。許多詐騙代幣已經被社群識別並舉報。這些代幣會[在 Etherscan 中被標記](https://info.etherscan.com/etherscan-token-reputation/)。雖然 Etherscan 不是權威的真相來源（去中心化網路的本質決定了不可能有權威的合法性來源），但被 Etherscan 識別為詐騙的代幣很可能就是詐騙。

   ![Scam token in Etherscan](./etherscan-scam.png)

## 結論 {#conclusion}

只要世界上存在價值，就會有詐騙者試圖將其據為己有，而在一個去中心化的世界裡，除了你自己，沒有人能保護你。希望你能記住這些要點，以幫助區分合法代幣和詐騙代幣：

- 詐騙代幣會冒充合法代幣，它們可以使用相同的名稱、代號等。
- 詐騙代幣_不能_使用相同的合約地址。
- 獲取合法代幣地址的最佳來源是發行該代幣的組織。
- 如果無法做到這一點，你可以使用受歡迎且值得信賴的應用程式，例如 [尤尼斯瓦普](https://app.uniswap.org/#/swap) 和 [Blockscout](https://eth.blockscout.com/)。
