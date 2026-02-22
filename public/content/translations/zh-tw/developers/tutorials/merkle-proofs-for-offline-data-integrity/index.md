---
title: "用於離線資料完整性的默克爾證明"
description: "為儲存在鏈下的資料確保其鏈上完整性"
author: Ori Pomerantz
tags: [ "storage" ]
skill: advanced
lang: zh-tw
published: 2021-12-30
---

## 介紹 {#introduction}

理想情況下，我們希望將所有內容儲存在以太坊儲存空間中。以太坊儲存空間分布在數千台電腦上，具有極高的可用性（資料無法被審查）和完整性（資料無法在未經授權的情況下被修改），但儲存一個 32 位元組的字通常需要花費 20,000 gas。 在我撰寫本文時，該成本相當於 6.60 美元。 每位元組 21 美分的價格對於許多用途來說都太過昂貴。

為了要解決這個問題，以太坊生態系開發了[許多以去中心化方式儲存資料的替代方案](/developers/docs/storage/)。 通常它們都涉及可用性和價格之間的權衡。 然而，完整性通常能獲得保證。

在本文中，您將學習**如何**使用[默克爾證明](https://computersciencewiki.org/index.php/Merkle_proof)在不將資料儲存在區塊鏈上的情況下確保資料完整性。

## 它是如何運作的？ {#how-does-it-work}

理論上，我們可以只將資料的哈希儲存在鏈上，並在需要資料的交易中傳送所有資料。 但是，這將會還是太昂貴了。 往一項交易傳送的一個字節位元組的數據會消耗掉約16份燃料，現時相當於半毛錢，或者每千字節會消耗掉約$5。 每 MB 5000 美元的價格，對於許多用途來說仍然太貴，即使不考慮哈希處理資料的額外成本。

解決方案是重複哈希處理資料的不同子集，這樣一來，對於您不需要傳送的資料，您只需傳送一個哈希即可。 您可以使用默克爾樹來完成此操作，這是一種樹狀資料結構，其中每個節點都是其下方節點的哈希：

![默克爾樹](tree.png)

根哈希是唯一需要儲存在鏈上的部分。 為了證明某個特定值，您需要提供所有與其組合以獲得根所需的哈希。 例如，為了證明 `C`，您需要提供 `D`、`H(A-B)` 和 `H(E-H)`。

![C 值的證明](proof-c.png)

## 實作 {#implementation}

[範例程式碼在此處提供](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity)。

### 鏈下程式碼 {#offchain-code}

在本文中，我們使用 JavaScript 進行鏈下運算。 大多數去中心化應用程式都以 JavaScript 撰寫其鏈下元件。

#### 建立默克爾根 {#creating-the-merkle-root}

首先，我們需要往區塊鏈提供Merkle樹根。

```javascript
const ethers = require("ethers")
```

[我們使用 ethers 套件中的哈希函式](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256)。

```javascript
// 我們必須驗證其完整性的原始資料。前兩個位元組
// 是使用者識別碼，後兩個位元組是使用者目前擁有的代幣數量。
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

把每個輸入編碼成為一個單一256-bit的整數，會導致產生一個較低閱讀性的程序碼。要舉例的話，那就是比使用JSON編碼而成的數值的閱讀性還要低了。 但是，這意味著要提取合約內的數據需要經歷的程序會大幅降低，所消耗的燃料成本如是。 [您可以在鏈上讀取 JSON](https://github.com/chrisdotn/jsmnSol)，但如果可以避免，最好不要這麼做。

```javascript
// 哈希值陣列，以 BigInts 形式表示
const hashArray = dataArray
```

在這個例子中，我們的數據是從256-bit的數值開始的，所以不需要更多的程序了。 如果我們使用一個更複雜的數據結構如字串們，我們需要確認我們先雜湊好數據以拿到一個欄目的雜湊值。 要注意這也是因為我們不在意用戶是否知道其他用戶的資訊。 否則，我們將會必須要進行雜湊，所以用戶1將不會知道用戶0的數值，用戶2則將不會知道用戶3的數值，如此類推。

```javascript
// 在哈希函式預期的字串和我們在其他地方使用的
// BigInt 之間進行轉換。
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ethers 哈希函式預期接收一個帶有十六進位數字的 JavaScript 字串 (例如 `0x60A7`)，並回應一個具有相同結構的字串。 然而，對於其餘的程式碼而言，使用 `BigInt` 更為容易，所以我們先轉換為十六進位字串，然後再轉換回來。

```javascript
// 一對值的對稱哈希，所以我們不關心順序是否顛倒。
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

這個函式是對稱的 (a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b 的哈希)。 這是指當我們檢查Merkle推論的時候，我們不需要擔心有關是否要把從推論而來的數值安放在計算完成的數值前或後方。 默克爾證明的檢查是在鏈上完成的，所以我們在那裡需要做的事情越少越好。

警告：
密碼學比看起來的要困難。
本文的最初版本使用了哈希函式 `hash(a^b)`。
那是個**糟糕**的想法，因為這意味著如果您知道 `a` 和 `b` 的合法值，您就可以使用 `b' = a^b^a'` 來證明任何想要的 `a'` 值。
使用這個函式，您必須計算 `b'` 使得 `hash(a') ^ hash(b')` 等於一個已知值 (通往根路徑上的下一個分支)，這要困難得多。

```javascript
// 用來表示某個分支為空、沒有
// 值的值
const empty = 0n
```

當數值的數字不是一個整數再取二次方，我們便需要處理空出來的枝節。 這個程序要這樣寫的原因是把零放左一個空間持有者。

![遺失分支的默克爾樹](merkle-empty-hash.png)

```javascript
// 依序對每對值取哈希，計算出哈希陣列樹的上一層
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // 為避免覆寫輸入 // 必要時新增一個空值 (我們需要所有葉節點都 // 成對)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

這個功能會在Merkle樹狀內「攀爬」到一個程度，此舉是透過把現層的數值們作成雜湊值的配對。 請注意，這不是最有效率的實作，我們本可以避免複製輸入，而只在迴圈中適當的時候新增 `hashEmpty`，但此程式碼是為了可讀性而最佳化。

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // 沿著樹向上，直到只剩下一個值，那就是 // 根。 // // 如果一層有奇數個條目，oneLevelUp 中的 // 程式碼會新增一個空值，所以如果我們有，例如，// 10 個葉節點，那麼第二層會有 5 個分支，第三層 // 有 3 個分支，第四層有 2 個分支，而根是第五層

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

要拿到根部，一直攀爬直到這裡只剩下一個數值。

#### 建立默克爾證明 {#creating-a-merkle-proof}

一個Merkle推論是用來跟一些已經被證明好的數值雜湊在一起，以拿回Merkle樹根。 被證明的數值通常從其他數據可以得手，所以比起作為程序碼的一部份我的取向會是分別提供這些數值。

```javascript
// 默克爾證明由要一起哈希的條目清單
// 的值組成。因為我們使用對稱哈希函式，所以我們不
// 需要項目的位置來驗證證明，只需要用它來建立證明
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // 直到我們到達頂部
    while (currentLayer.length > 1) {
        // 沒有奇數長度的層
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // 如果 currentN 是奇數，將它前面的值加入證明
            ? currentLayer[currentN-1]
               // 如果是偶數，則加入它後面的值
            : currentLayer[currentN+1])

```

我們哈希處理 `(v[0],v[1])`、`(v[2],v[3])` 等。 所以對於偶數值，我們需要下一個；對於奇數值，我們需要前一個。

```javascript
        // 移動到上一層
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### 鏈上程式碼 {#onchain-code}

最終，我們有了核實推論的程式碼。 鏈上程式碼是以 [Solidity](https://docs.soliditylang.org/en/v0.8.11/) 撰寫的。 最優化在此是更為重要，因為相對來說燃料價格是較為昂貴的。

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

我是使用 [Hardhat 開發環境](https://hardhat.org/) 撰寫此程式碼的，它讓我們在開發時可以取得[來自 Solidity 的主控台輸出](https://hardhat.org/docs/cookbook/debug-logs)。

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // 極度不安全，在生產程式碼中，對此函式的存取
    // **必須**嚴格限制，可能僅限於
    // 擁有者
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

為Merkle樹根而設定和拿取功能。 在生產系統中，讓任何人都能更新默克爾根是個_極其糟糕的想法_。 我在此這樣做是為了把範例程式碼給簡化掉。 **不要在資料完整性至關重要的系統上這麼做**。

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

這個功能產生了一對雜湊值。 這只是 JavaScript 程式碼中 `hash` 和 `pairHash` 的 Solidity 轉譯。

**注意：**這是另一個為了可讀性而進行最佳化的案例。 根據[函式定義](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)，或許可以將資料儲存為 [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) 值並避免轉換。

```solidity
    // 驗證默克爾證明
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

在數學表示法中，默克爾證明驗證看起來像這樣：`H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))`。 這個程序碼會實行驗證。

## 默克爾證明與匯總值不相容 {#merkle-proofs-and-rollups}

默克爾證明與[匯總值](/developers/docs/scaling/#rollups) 的相容性不佳。 這個現象的原因是匯總值在層一負責書寫所有的交易數據，但在層二上是負責紀錄交易過程。 伴隨一項交易來傳送一份Merkle推論的每層平均成本是638份燃料（現時在一個回呼內的一個字節位元組會花費16份燃料，如果它數值不是為零的話。如果為零，它會花費掉4份燃料）。 如果我們有1024字的數據，一份Merkle推論需要十層，或是總共6380份燃料。

以 [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m) 為例，寫入 L1 的 gas 約為 100 gwei，L2 的 gas 為 0.001 gwei (這是正常價格，可能會隨著擁塞而上漲)。 所以，就層一的成本來說，我們在層二的程序中可以花掉百到千份的燃料。 先假設我們不會寫爆儲存，這達標我們可用層一燃料的價格來在層二寫大約五個字詞。 對於單一的默克爾證明，我們可以將全部 1024 個字寫入儲存空間 (假設它們一開始就可以在鏈上計算，而不是在交易中提供)，並且仍然有大部分的 gas 剩餘。

## 結論 {#conclusion}

在現實生活中，你可能永遠不會單靠自己來施行Merkle樹狀理論。 這裡有些著名而被審查好的圖書館給你用。通常來說，最好不要自己來實行虛擬代幣的早期版本。 但是，我希望現在你會更好地理解到Merkle推論，並且能夠決定甚麼時候它們會值得被使用。

請注意，雖然默克爾證明保留了_完整性_，但它們不保留_可用性_。 當我們知道沒有其他人可以拿取你的資產時，這個行為在兩種情境中可以成為你一個小小的悲傷。其一是當數據儲存否決你的接觸許可，其二是反回來看你不能構造一個Merkle樹來接觸到儲存。 所以，Merkle樹最好是跟某種如IPFS的去中央化儲存一起使用。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
