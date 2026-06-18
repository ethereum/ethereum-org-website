---
title: Web3 機密儲存定義
description: Web3 機密儲存的正式定義
lang: zh-tw
sidebarDepth: 2
---

為了讓你的應用程式在以太坊上運作，你可以使用 Web3.js 函式庫提供的 web3 物件。在底層，它透過 RPC 呼叫與本機節點進行通訊。[web3](https://github.com/ethereum/web3.js/) 可與任何公開 RPC 層的以太坊節點搭配使用。

`web3` 包含 `eth` 物件 - web3.eth。

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** 結果
 *               [ 'web3', 3 ]   Web3 (v3) 金鑰檔案
 *  [ 'ethersale', undefined ]   Ethersale 金鑰檔案
 *                        null     無效的金鑰檔案
 */
```

本文件說明 Web3 機密儲存定義的**第 3 版**。

## 定義 {#definition}

檔案的實際編碼與解碼與第 1 版相比大致保持不變，差別在於加密演算法不再固定為 AES-128-CBC（現在的最低要求是 AES-128-CTR）。大多數的含義/演算法與第 1 版相似，除了 `mac`，它是衍生金鑰左起第二個 16 位元組與完整 `ciphertext` 串接後的 SHA3 (Keccak-256) 雜湊值。

機密金鑰檔案直接儲存在 `~/.web3/keystore`（適用於類 Unix 系統）和 `~/AppData/Web3/keystore`（適用於 Windows）。它們可以命名為任何名稱，但一個良好的慣例是 `<uuid>.json`，其中 `<uuid>` 是賦予該機密金鑰的 128 位元 UUID（作為機密金鑰地址的隱私保護代理）。

所有這類檔案都有一個關聯的密碼。要衍生特定 `.json` 檔案的機密金鑰，首先要衍生該檔案的加密金鑰；這是透過取得檔案的密碼，並將其傳遞給 `kdf` 金鑰所描述的金鑰衍生函式 (KDF) 來完成。KDF 函式中與 KDF 相關的靜態和動態參數描述於 `kdfparams` 金鑰中。

所有符合最低要求的實作都必須支援 PBKDF2，其表示方式為：

- `kdf`: `pbkdf2`

對於 PBKDF2，kdfparams 包含：

- `prf`：必須為 `hmac-sha256`（未來可能會擴充）；
- `c`：迭代次數；
- `salt`：傳遞給 PBKDF 的鹽值 (salt)；
- `dklen`：衍生金鑰的長度。必須 >= 32。

一旦衍生出檔案的金鑰，就應該透過衍生 MAC 來進行驗證。MAC 的計算方式應為：將衍生金鑰左起第二個 16 位元組與 `ciphertext` 金鑰內容串接成位元組陣列，然後對其進行 SHA3 (Keccak-256) 雜湊計算，即：

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

（其中 `++` 是串接運算子）

應將此值與 `mac` 金鑰的內容進行比較；如果兩者不同，則應要求輸入其他密碼（或取消操作）。

在驗證檔案的金鑰後，可以使用 `cipher` 金鑰指定的對稱加密演算法（並透過 `cipherparams` 金鑰設定參數）來解密密文（檔案中的 `ciphertext` 金鑰）。如果衍生金鑰的大小與演算法的金鑰大小不符，則應使用補零後衍生金鑰最右側的位元組作為該演算法的金鑰。

所有符合最低要求的實作都必須支援 AES-128-CTR 演算法，其表示方式為：

- `cipher: aes-128-ctr`

此密碼編譯採用以下參數，作為 cipherparams 金鑰的鍵值提供：

- `iv`：密碼編譯的 128 位元初始化向量 (IV)。

密碼編譯的金鑰是衍生金鑰最左側的 16 個位元組，即 `DK[0..15]`

機密金鑰的建立/加密基本上應該是這些指示的反向操作。請確保 `uuid`、`salt` 和 `iv` 是真正的隨機值。

除了應作為版本「硬性」識別碼的 `version` 欄位之外，實作也可以使用 `minorversion` 來追蹤格式中較小、非破壞性的變更。

## 測試向量 {#test-vectors}

詳細資訊：

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

使用 `AES-128-CTR` 和 `PBKDF2-SHA-256` 的測試向量：

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` 的檔案內容：

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**中間值**：

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

使用 AES-128-CTR 和 Scrypt 的測試向量：

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**中間值**：

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## 與第 1 版的差異 {#alterations-from-v2}

此版本修正了與[此處](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)發布的第 1 版之間的幾個不一致之處。簡而言之，這些差異包括：

- 大小寫不合理且不一致（scrypt 小寫，Kdf 混合大小寫，MAC 大寫）。
- 地址是不必要的，且會損害隱私。
- `Salt` 本質上是金鑰衍生函式的參數，應該與其關聯，而不是與一般加密技術關聯。
- _SaltLen_ 是不必要的（直接從 Salt 衍生即可）。
- 已提供金鑰衍生函式，但加密演算法卻被硬性指定。
- `Version` 本質上是數字，卻被設定為字串（使用字串可以實現結構化版本控制，但對於很少變更的設定檔格式來說，這可視為超出範圍）。
- `KDF` 和 `cipher` 在概念上是同級的，但組織方式卻不同。
- `MAC` 是透過一段與空白無關的資料計算出來的（！）

格式已進行變更，產生以下檔案，其功能等同於先前連結頁面上提供的範例：

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## 與第 2 版的差異 {#alterations-from-v2-2}

第 2 版是早期的 C++ 實作，存在一些錯誤。所有基本要素與其相比皆保持不變。