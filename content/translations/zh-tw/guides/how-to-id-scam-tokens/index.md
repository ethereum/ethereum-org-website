---
title: 如何辨識詐騙代幣
description: 了解詐騙代幣、它們如何使自己看似合法，以及如何避開這種詐騙方式。
lang: zh-tw
---

# 如何辨識詐騙代幣 {#identify-scam-tokens}

以太坊最常見的用處之一就是為一個團隊建立一種可交易的代幣。某種意義上，這是屬於他們自己的貨幣。 這些代幣通常依循一種標準，那就是 [ERC-20](/developers/docs/standards/tokens/erc-20/)。 然而，任何能產生價值的正當使用案例中，就會有犯罪者嘗試竊取該價值納為已用。

他們可能透過這兩種方式行騙：

- **向你兜售詐騙代幣**，代幣可能看似你想要購買的正規代幣，但其實是由詐騙者發行且不具任何價值的代幣。
- **誘騙你簽署不利的交易**，手段通常是導引你到他們自己的使用者介面。 他們可能會試圖讓你授權，使他們的合約能花費你的 ERC-20 代幣，暴露敏感訊息而使他們能存取你的資產等。 這些使用者介面可能是正規網站幾近完美的複製品，但隱藏著圈套。

為了說明詐騙代幣為何，以及如何辨識詐騙代幣，我們來看一個詐騙代幣示例：[`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82)。 這個代幣看起來試圖模仿 [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) 代幣。

<ExpandableCard
title="什麼是 ARB?"
contentPreview=''>

Arbitrum 是一個開發並管理<a href="/developers/docs/scaling/optimistic-rollups/">樂觀卷軸</a>的機構。 成立之初，Aubitrum 是一間營利公司，而後採取了去中心化的措施。 在此過程中，他們發行了一種可交易的<a href="/dao/#token-based-membership">管理代幣</a>。

</ExpandableCard>

<ExpandableCard
title="為什麼詐騙代幣叫做 wARB？"
contentPreview=''>

以太坊有一個慣例，當一種資產不兼容 ERC-20 時，我們會創建一種「打包」版本，名稱以「w」起頭。 因此，舉例來說，比特幣有 wBTC，而<a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">以太幣有 wETH</a>。

創建以太坊已有的 ERC-20 代幣的打包版本並不合理，但詐騙代幣看似正規，實際並非如此。

</ExpandableCard>

## 詐騙代幣如何運作？ {#how-do-scam-tokens-work}

以太坊的中心即是去中心化。 這代表沒有中央機構能夠沒收你的資產，或是阻止你部署智慧型合約。 但這也代表詐騙犯可以部署他們想要的任何智慧型合約。

<ExpandableCard
title="什麼是智慧型合約？"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">智慧型合約</a>是在以太坊區塊鏈上運行的程式。 例如，每個 ERC-20 代幣都以智慧型合約的形式實施。

</ExpandableCard>

更具體地說，Arbitrum 部署了一種使用符號 `ARB` 的合約。 但這並不能阻止其他人也部署使用完全相同或類似符號的合約。 寫合約的人可以設定合約如何執行。

## 看似正規 {#appearing-legitimate}

詐騙者通常會使用一些技巧使詐騙代幣看似正規。

- **正規的名稱和符號**。 如上所述，ERC-20 合約可以與其他 ERC-20 合約擁有相同的符號和名稱。 你不能依靠這些欄位確保安全性。

- **正規擁有者**。 詐騙代幣通常會空投大量餘額到預計是真代幣正規擁有者的地址。

  我們再次以 `wARB` 為例。 [大概 16% 的代幣](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f)由公開標籤為 [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) 的地址所擁有。 這_並不是_一個假的地址；它真的是[在以太坊主網上部署真 ARB 合約](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670)的地址。

  因爲一個地址的 ERC-20 餘額為 ERC-20 合約儲存的一部分，合約開發者可以透過合約將其指定為想要的形式。 合約也可能禁止轉帳，使正規使用者無法擺脫詐騙代幣。

- **正規轉帳**。 _正規擁有者不會付錢將詐騙代幣轉帳給他人，因此轉帳一定是正規的，對吧？_ **這是錯的**。 `轉帳`透過 ERC-20 合約發生。 詐騙犯可以輕鬆將合約撰寫成得以產生那些操作。

## 詐騙網站 {#websites}

詐騙犯也可以製作非常具說服力的網站，有時候甚至完全複製真實網站，且具有相同的使用者介面，但藏著詭計。 舉例來說，可能會是看似正規的外部連結，但其實會將使用者送往一個外部詐騙網站；或者是不正確的指示，導引使用者暴露他們的金鑰，或將資金發送到攻擊者的地址。

避免此類詐騙的最佳方法就是小心檢查你造訪的網站網址，並將已知的真實網站地址添加到書籤。 如此一來，你就可以透過你的書籤連到真實網站，而不會意外拼錯字或需要依賴外部連結。

## 如何保護自己？ {#protect-yourself}

1. **檢查合約地址**。 正規的代幣來自於正規的機構，而你可以在機構網站上找到合約地址。 以 [`ARB` 為例，你可以在這裡](https://docs.arbitrum.foundation/deployment-addresses#token)看到正規地址。

2. **真正的代幣具有流動性**。 另一個方案是在最常見的代幣交換協議 [Uniswap](https://uniswap.org/) 上查看流動池的大小。 此協議以流動性池操作，讓投資者存放他們的代幣，以期透過交易費用賺取回報。

即便有，詐騙代幣通常具有非常小的流動池，因為詐騙犯不想冒失去真資產的風險。 舉例來說，`ARB`/`ETH` 的 Uniswap 池大概有一百萬美元（[單擊此處參考最新數值](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)），而小量買賣並不會改變價格：

![購買正規代幣](./uniswap-real.png)

但當你嘗試購買詐騙代幣 `wARB` 時，即使是小量的購買也會使價格改變超過 90%：

![購買詐騙代幣](./uniswap-scam.png)

這裡是另外一個告訴我們 `wARB` 不太可能是正規代幣的證明。

3. **在 Etherscan 區塊瀏覽器中查看**。 社群已經辨識出且舉報過許多詐騙代幣。 那些代幣[會在 Etherscan 區塊瀏覽器上被標註](https://info.etherscan.com/etherscan-token-reputation/)。 雖然 Etherscan 區塊瀏覽器不是官方事實來源（這是因為去中心化網路本質上並不會有正規的官方來源），但 Etherscan 區塊瀏覽器辨識為詐騙的代幣通常為詐騙代幣。

   ![Etherscan 區塊瀏覽器中的詐騙代幣](./etherscan-scam.png)

## 結論 {#conclusion}

只要世界上存在價值，就會有嘗試挪為自用的詐騙犯，且在一個去中心化的世界裡，除了你，沒有任何人可以保護你。 希望你記住這幾點，幫助你區別正規代幣和詐騙：

- 詐騙代幣會模仿正規代幣，且可以使用同樣的名稱、符號等等。
- 詐騙代幣_無法_使用相同的合約地址。
- 正規代幣地址的最佳來源是該代幣的發行機構。
- 若無，你可以使用常見且可信的應用程式，例如 [Uniswap](https://app.uniswap.org/#/swap) 和 [Etherscan 區塊瀏覽器](https://etherscan.io/)。
