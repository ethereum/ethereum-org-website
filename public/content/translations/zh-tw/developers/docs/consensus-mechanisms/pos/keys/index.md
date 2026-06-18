---
title: 以太坊權益證明中的金鑰
description: 以太坊權益證明共識機制中使用的金鑰說明
lang: zh-tw
---

以太坊使用公私鑰密碼學來保護使用者資產。公鑰被用作以太坊地址的基礎——也就是說，它對大眾可見，並被用作唯一識別碼。私鑰（或「密鑰」）應該只能由帳戶擁有者存取。私鑰用於「簽署」交易與資料，以便密碼學能夠證明持有者核准了特定私鑰的某些操作。

以太坊的金鑰是使用[橢圓曲線密碼學](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)產生的。

然而，當以太坊從[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow)轉換為[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)時，以太坊新增了一種新型金鑰。原有的金鑰運作方式與以前完全相同——保護帳戶的橢圓曲線金鑰沒有任何改變。然而，使用者需要一種新型金鑰，才能透過質押 ETH 和執行驗證者來參與權益證明。這種需求源於大量驗證者之間傳遞許多訊息所帶來的擴展性挑戰，這需要一種可以輕鬆聚合的密碼學方法，以減少網路達成共識所需的通訊量。

這種新型金鑰使用 [**Boneh-Lynn-Shacham (BLS)** 簽章方案](https://wikipedia.org/wiki/BLS_digital_signature)。BLS 能夠非常有效率地聚合簽章，同時也允許對聚合的個別驗證者金鑰進行逆向工程，非常適合管理驗證者之間的操作。

## 兩種驗證者金鑰 {#two-types-of-keys}

在轉換為權益證明之前，以太坊使用者只有一把基於橢圓曲線的私鑰來存取他們的資金。隨著權益證明的引入，希望成為獨立質押者的使用者還需要一把**驗證者金鑰**和一把**提款金鑰**。

### 驗證者金鑰 {#validator-key}

驗證者簽署金鑰由兩個元素組成：

- 驗證者**私鑰**
- 驗證者**公鑰**

驗證者私鑰的目的是簽署鏈上操作，例如區塊提案和證明。正因如此，這些金鑰必須保存在熱錢包中。

這種靈活性具有將驗證者簽署金鑰非常快速地從一個裝置轉移到另一個裝置的優勢，然而，如果它們遺失或被盜，竊賊可能會透過以下幾種方式**進行惡意行為**：

- 導致驗證者被罰沒：
  - 作為提案者，為同一個時槽簽署兩個不同的信標區塊
  - 作為證明者，簽署一個「包圍」另一個證明的證明
  - 作為證明者，簽署兩個具有相同目標的不同證明
- 強制自願退出，這會停止驗證者的質押，並將其 ETH 餘額的存取權授予提款金鑰擁有者

當使用者將 ETH 存入質押存款合約時，**驗證者公鑰**會包含在交易資料中。這被稱為*存款資料*，它允許以太坊識別該驗證者。

### 提款憑證 {#withdrawal-credentials}

每個驗證者都有一個稱為*提款憑證*的屬性。這個 32 位元組欄位的第一個位元組識別了帳戶類型：`0x00` 代表原始的 BLS（沙佩拉升級前，不可提款）憑證，`0x01` 代表指向執行地址的舊版憑證，而 `0x02` 代表現代的複利憑證類型。

擁有 `0x00` BLS 金鑰的驗證者必須更新這些憑證以指向執行地址，才能啟用超額餘額支付或從質押中全額提款。這可以透過在初始金鑰產生期間於存款資料中提供執行地址來完成，*或者*在稍後使用提款金鑰簽署並廣播 `BLSToExecutionChange` 訊息來完成。

[更多關於驗證者提款憑證的資訊](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### 提款金鑰 {#withdrawal-key}

如果在初始存款期間未設定，將需要提款金鑰來更新提款憑證以指向執行地址。這將使超額餘額支付開始被處理，並允許使用者全額提取其質押的 ETH。

就像驗證者金鑰一樣，提款金鑰也由兩個元件組成：

- 提款**私鑰**
- 提款**公鑰**

在將提款憑證更新為 `0x01` 類型之前遺失此金鑰，意味著失去對驗證者餘額的存取權。驗證者仍然可以簽署證明和區塊，因為這些操作需要驗證者的私鑰，然而如果提款金鑰遺失，幾乎沒有任何誘因繼續這麼做。

將驗證者金鑰與以太坊帳戶金鑰分開，使得單一使用者能夠執行多個驗證者。

![validator key schematic](validator-key-schematic.png)

**注意**：目前退出質押職責並提取驗證者餘額需要使用驗證者金鑰簽署[自願退出訊息 (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1)。然而，[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) 是一項提案，未來將允許使用者透過使用提款金鑰簽署退出訊息來觸發驗證者退出並提取其餘額。這將透過讓將 ETH 委託給[質押即服務提供者](/staking/saas/#what-is-staking-as-a-service)的質押者保持對其資金的控制權，來減少信任假設。

## 從助記詞衍生金鑰 {#deriving-keys-from-seed}

如果每質押 32 個 ETH 都需要一組 2 把完全獨立的新金鑰，金鑰管理將很快變得難以控制，特別是對於執行多個驗證者的使用者而言。相反地，可以從單一共同的秘密衍生出多個驗證者金鑰，而儲存該單一秘密即可存取多個驗證者金鑰。

[助記詞](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase)和路徑是使用者在[存取](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0)錢包時經常遇到的顯著特徵。助記詞是一連串的單字，作為私鑰的初始種子。當與額外資料結合時，助記詞會產生一個稱為「主金鑰」的雜湊。這可以被視為一棵樹的根。然後可以使用階層式路徑從這個根衍生出分支，使得子節點可以作為其父節點雜湊和它們在樹中索引的組合而存在。閱讀有關基於助記詞產生金鑰的 [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) 和 [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) 標準。

這些路徑具有以下結構，與硬體錢包互動過的使用者會很熟悉：

```
m/44'/60'/0'/0`
```

此路徑中的斜線將私鑰的元件分隔如下：

```
master_key / purpose / coin_type / account / change / address_index
```

這種邏輯讓使用者能夠將盡可能多的驗證者附加到單一**助記詞**上，因為樹根可以是共同的，而差異化可以發生在分支上。使用者可以從助記詞**衍生出任意數量的金鑰**。

```
[m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

每個分支由一個 `/` 分隔，因此 `m/2` 表示從主金鑰開始並遵循分支 2。在下方的示意圖中，單一助記詞用於儲存三個提款金鑰，每個提款金鑰都有兩個關聯的驗證者。

![validator key logic](multiple-keys.png)

## 延伸閱讀 {#further-reading}

- [Carl Beekhuizen 撰寫的以太坊基金會部落格文章](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333 BLS12-381 金鑰產生](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002：執行層觸發退出](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [大規模金鑰管理](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)