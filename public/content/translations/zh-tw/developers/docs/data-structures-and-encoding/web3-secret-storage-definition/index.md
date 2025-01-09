---
title: Web3 金鑰儲存的定義
description: Web3 金鑰儲存的正式定義
lang: zh-tw
sidebarDepth: 2
---

要讓應用程式在以太坊上執行，可以使用 web3.js 程式庫提供的 web3 物件。 在底層，它透過遠端程序呼叫與區域節點通訊。 [web3](https://github.com/ethereum/web3.js/) 可與任何有公開遠端程序呼叫層的以太坊節點一起使用。

`web3` 包含 `eth` 物件 - web3.eth。

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** result
 *               [ 'web3', 3 ]   web3 (v3) keyfile
 *  [ 'ethersale', undefined ]   Ethersale keyfile
 *                        null     invalid keyfile
 */
```

以下記載了**第 3 版** Web3 金鑰儲存定義。

## 定義 {#definition}

除了加密演算法不再綁定 AES-128-CBC 外（現在最低要求是 AES-128-CTR），和第一版對照，檔案的編碼和解碼方式差異不大。 大部分意義/演算法與第 1 版本相似，但 `mac` 除外，它是衍生金鑰最左邊算起第二組 16 位元組與完整的 `ciphertext` 串連在一起的 SHA3 (keccak-256)。

秘密金鑰檔案直接儲存在 `~/.web3/keystore`（類 Unix 系統）和 `~/AppData/Web3/keystore`（Windows 系統）中。 該檔案可以任意命名，但良好的慣例是以 `<uuid>.json` 命名，其中 `<uuid>` 是賦予秘密金鑰（秘密金鑰地址的隱私保護代理程式）的 128 位元 UUID。

所有這類的檔案都有一個相關的密碼。 要導出給定 `.json` 檔案的秘密金鑰，首先要導出這個檔案的加密金鑰，完成這工作要透過取得檔案的密碼，並將它傳給 `kdf` 金鑰中記述的金鑰導出函式。 KDF 函式的靜態和動態 KDF 依存參數是記述在 `kdfparams` 金鑰裡。

KDF 函式的靜態和動態 KDF 依存參數是記述在 `kdfparams` 金鑰裡。

- `kdf`：`pbkdf2`

就 PBKDF2 而言，kdfparams 包含：

- `prf`：必須是 `hmac-sha256`（未來可能會增加長度）。
- `c`：反覆次数；
- `salt`：傳送給 PBKDF 的 salt
- `dklen`：衍生金鑰的長度。 必需大於或等於 32。

一旦檔案的金鑰導出後，必須透過 MAC 的導出進行驗証。 MAC 是由串聯衍生金鑰最左算起第二組 16 位元組和`ciphertext` 金鑰的內容所形成的位元組陣列的 SHAK3 (keccak-256) 雜湊值，也就是：

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

（其中 `++` 是串連運算子）

這數值應該和 `mac` 金鑰的內容進行比較；如果不同，會被要求提供替代密碼（否則運算會被取消）。

檔案的金鑰被驗證後，加密文字（檔案內的`ciphertext` 金鑰）可用 `cipher` 金鑰指定的對稱式加密演算法進行解碼，並透過 `cipherparams` 執行參數化。 如果衍生金鑰的長度和演算法的金鑰大小不一樣，則用 0 填滿，衍生金鑰最右邊的位元組應當用作演算法的金鑰。

所有最低限度合規實作都必須支援 AES-128-CTR 演算法，表示如下：

- `cipher: aes-128-ctr`

這密碼取得下列參數，作為 cipherparams 金鑰的金鑰提供：

- `iv`：加密的 128 位元初始化向量。

加密金鑰是衍生金鑰的最左 16 位元組，也就是 `DK[0..15]`。

祕密金鑰的建立/加密基本上應該是這些步驟的反序操作。 確認 `uuid`、`salt` 和 `iv` 的確是隨機數。

除了 `version` 欄位應該作為版本的「硬」識別碼外，實作中也可以使用 `minorversion` 來追蹤較小的非破壞性格式變更。

## 測試向量 {#test-vectors}

詳細資料：

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

測試向量使用 `AES-128-CTR` 和 `PBKDF2-SHA-256`：

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` 檔案的內容：

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

**中間事物**：

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

測試向量使用 AES-128-CTR 和 Scrypt：

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

**中間事物**：

`衍生金鑰`：`7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d` `MAC 本體`：`edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2` `MAC`：`337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c` `加密金鑰`：`7446f59ecc301d2d79bc3302650d8a5c`

## 對第一版的修正 {#alterations-from-v2}

這版本修正了與發佈於[此處](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)的第一版的若干不一致的地方。 簡述如下：

- 大小寫未對齊和不一致（scrypt 為小寫字母，Kdf 為大小寫字母混合，MAC 為大寫字母）。
- 不必要的地址和侵害隱私權。
- `Salt` 本質上是金鑰衍生函式的一個參數，一般而言應該與金鑰衍生函式而不是與加密相關聯。
- _SaltLen_ 是不需要的（因為它是從 Salt 衍生的）。
- 給定了金鑰衍生函式，但加密演算法是硬式指定的。
- `Version` 本質上是數値但卻設為字串（結構化版本管理對於字串是可能的，但對於難得修改的設定檔案格式可能被認定超出範圍）。
- `KDF` 和 `cipher` 理論上是同層級概念但組織方式卻不一樣。
- `MAC` 是透過無關空白位置的資料片段 (!) 計算出來的。

已變更格式，賦予下列檔案等同先前連結頁面所述範例的功能：

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

## 對第二版的修正 {#alterations-from-v2}

第二版是早期的 C++ 實作，有若干缺陷。 所有基本元素保留不變。
