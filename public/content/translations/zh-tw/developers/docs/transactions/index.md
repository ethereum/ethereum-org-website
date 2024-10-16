---
title: 交易
description: 以太坊交易概觀 – 運作原理、資料結構以及如何透過應用程式發送。
lang: zh-tw
---

交易是帳戶發出的帶密碼學簽章的指令。 帳戶將發起交易以更新以太坊網路的狀態。 最簡單的交易是將以太幣從一個帳戶轉帳到另一個帳戶。

## 前置要求 {#prerequisites}

為了讓你更容易理解本頁，建議你先閱讀[帳戶](/developers/docs/accounts/)及我們的[以太坊介紹](/developers/docs/intro-to-ethereum/)。

## 什麼是交易？ {#whats-a-transaction}

以太坊交易是指由外部帳戶發起的操作，換句話說，此帳戶是由人而不是智慧型合約管理的帳戶。 例如，如果 Bob 發送給 Alice 1 以太幣，Bob 的帳戶必須扣除，Alice 的帳戶必須存入。 此更改狀態的操作發生在交易中。

![顯示交易導致狀態變化的圖表](./tx.png) _此圖源於[以太坊EVM圖解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

交易會改變以太坊虛擬機的狀態，須廣播至整個網路。 任何節點都可以廣播要在以太坊虛擬機上執行的交易請求；之後驗證者將執行交易並將引起的狀態變化傳播到網路上的其他節點。

交易需要支付費用並需要添加至經過驗證的區塊中。 為了讓本文更好理解，我們會在其他地方講解燃料和驗證。

提交的交易包括下列資訊：

- `from` – 發送者（簽署交易者）的地址。 這會是外部帳戶，因為合約帳戶無法發送交易。
- `to` – 接收地址（若為外部帳戶，交易將會轉移金額。 如果為合約帳戶，交易將執行合約程式碼）
- `signature` – 發送者的識別碼。 當發送者以私密金鑰簽署交易並確認發送者已授權此交易时，就會產生此簽章。
- `nonce` - 用來表示帳戶中交易編號的按順序遞增計數器
- `value` – 發送者轉帳至接收者的以太幣數量（面額為 WEI，1 以太幣等於 10 的 18 次方 wei）
- `input data` –可選欄位，可填入任意資料
- `gasLimit` – 交易可以使用的最大燃料單位數量。 [以太坊虛擬機](/developers/docs/evm/opcodes)指定了每個計算步驟的所需燃料單位
- `maxPriorityFeePerGas` - 已使用燃料的最高價格，可作為給驗證者的小費
- `maxFeePerGas` - 願意為交易支付的每單位燃料的最高費用（包含 `baseFeePerGas` 和 `maxPriorityFeePerGas`）

燃料指請驗證者處理交易所需的計算。 使用者必須為計算支付費用。 `gasLimit` 和 `maxPriorityFeePerGas` 決定支付給驗證者的最高交易費。 [更多燃料相關資訊](/developers/docs/gas/)。

交易物件看起來有些像以下內容：

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300"
  maxPriorityFeePerGas: "10"
  nonce: "0",
  value: "10000000000",
}
```

但交易物件需要使用發送者的私密金鑰簽署。 這證明交易只可能來自發送者，而不是以欺詐方式發送。

Geth 之類的以太坊用戶端將處理此簽署過程。

[JSON-RPC](/developers/docs/apis/json-rpc) 呼叫範例：

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

回應範例：

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` 是[遞迴長度前綴 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 編碼形式的已簽署交易
- `tx` 是 JSON 形式的已簽署交易

交易具備簽章雜湊值，因此可通過加密技術證明交易來自發送者並提交至網路。

### 資料欄位 {#the-data-field}

大多數交易從外部帳戶存取合約。 大部分合約都用 Solidity 寫成，並根據[應用程式介面 (ABI)](/glossary/#abi) 解譯其資料欄位。

前四個字節位元組使用函式名稱及參數的雜湊值指定要呼叫的函式。 有時候可以從使用[此資料庫](https://www.4byte.directory/signatures/)識別選擇器中的函式。

calldata 的剩餘部分是參數，[依據 ABI 規範中的說明編碼](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)。

例如，我們來看下[這筆交易](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)。 使用 **Click to see More** 檢視 calldata。

函式選擇器為 `0xa9059cbb`。 一些[已知的函式具有此簽章](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)。 在這個例子中，[合約的原始程式碼](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)已經上傳到 Etherscan，所以我們知道函式是 `transfer(address,uint256)`。

其餘資料如下所示：

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

根據 ABI 規範，應用程式介面中的整數值（例如地址，20 字節位元組的整數）顯示為 32 字節位元組的字，並且前面用 0 來填補。 所以我們知道 `to` 地址為 [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)。 `value` 為 0x3b0559f4 = 990206452。

## 交易類型 {#types-of-transactions}

以太坊上有幾種不同類型的交易：

- 一般交易：從一個帳戶至另一個帳戶的交易。
- 合約部署交易：沒有「to」地址的交易，其資料欄供合約程式碼所用。
- 合約執行：與部署的智慧型合約互動的交易。 在本例中，「to」地址為智慧型合約的地址。

### 關於燃料 {#on-gas}

如上所述，執行交易需要花費[燃料](/developers/docs/gas/)。 簡單的轉帳交易需要 21000 單位燃料。

所以，若 Bob 要以 190 gwei 的 `baseFeePerGas` 還有 10 gwei 的 `maxPriorityFeePerGas` 給 Alice 發送 1 以太幣，Bob 將需要支付以下費用：

```
(190 + 10) * 21000 = 4,200,000 gwei
--或者--
0.0042 以太幣
```

Bob 的帳戶會被扣除 **-1.0042 以太幣**（1 以太幣給 Alice + 0.0042 以太幣用來支付燃料費）

Alice 的帳戶將存入 **+1.0 以太幣**

基本費用將銷毀 **-0.00399 以太幣**

驗證者將保留 **+0.000210 以太幣**的小費


![顯示如何退還未使用燃料的圖表](./gas-tx.png) _此圖源於[以太坊EVM圖解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

任何交易中未使用的燃料都會退還給使用者帳戶。

### 智慧型合約互動 {#smart-contract-interactions}

任何涉及智慧型合約的交易都需要燃料。

智慧型合約也可以包含稱為 [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) 或 [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) 的函數，而不會改變合約的狀態。 因此，從外部帳戶調用這些函數不需要任何燃料。 此場景的底層遠端程序調用 [`eth_call`](/developers/docs/apis/json-rpc#eth_call)

與使用 `eth_call` 存取不同，這些 `view` 或 `pure` 函數也通常被內部調用（即從合約本身調用或從另一個合約調用），這會消耗燃料。

## 交易的生命週期 {#transaction-lifecycle}

一旦交易被提交，就會發生以下情況：

1. 透過加密方式生成交易雜湊值： `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 然後該交易會廣播到網路並添加到交易池中，交易池中包含了其他所有等待中的網路交易。
3. 為了要驗證交易並使交易「成功」，驗證者必須選擇你的交易並將它打包進區塊中。
4. 隨著時間推移，含有你交易的區塊會被升級為「已證明」，然後是「最終化」。 這些升級進一步確定 你的交易已經成功且永遠不會被更改。 當區塊「最終化」後，就僅可能被網路層級的攻擊變更， 此類攻擊需要花費數十億美元。

## 視訊示範 {#a-visual-demo}

觀看 Austin 為你講解交易、燃料和挖礦。

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope 交易 {#typed-transaction-envelope}

以太坊最初有一種形式的交易。 每筆交易都包含 nonce、gas price、gas limit、to address、value、data、v、r 與 s。 這些欄位均為 [RLP 編碼](/developers/docs/data-structures-and-encoding/rlp/)，看上去像是以下內容：

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

以太坊不斷演進以支援多種交易類型，以便在實作存取清單和 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 等新功能時不會影響原有交易形式。

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 是支援此類行為的協議。 交易的解釋如下：

`TransactionType || TransactionPayload`

其欄位定義如下：

- `TransactionType` - 介於 0 和 0x7f 之間的數字，代表總計 128 種可能的交易類型。
- `TransactionPayload` - 由交易類型定義的任意字節位元組陣列。

根據 `TransactionType` 值，交易可以分類為

1. **類型 0（傳統）交易：**自以太坊推出以來使用的原始交易格式。 它們不包括 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 的功能，例如動態燃料費計算或智慧型合約的存取清單。 傳統交易缺少在序列化形式中指示交易類型的特定前綴，在使用[遞迴長度前綴 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 編碼時，該前綴以位元組 `0xf8` 開始。 這些交易的 TransactionType 值為 `0x0`。

2. **類型 1 交易：**在 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中引入作為以太坊[柏林升級](/history/#berlin)的一部分，這些交易包含一個 `accessList` 參數。 此清單指定了交易期望存取的地址和儲存金鑰，有助於潛在降低涉及智慧型合約的複雜交易的[燃料](/developers/docs/gas/)成本。 EIP-1559 的費用市場變化不會包含在類型 1 交易中。 類型 1 交易也包含一個 `yParity` 參數，該參數可以是 `0x0` 或 `0x1`，表示 secp256k1 簽章的 y 值的奇偶性。 此類交易透過開頭的位元組 `0x01` 開頭辨識，其 TransactionType 值為 `0x1`。

3. **類型 2 交易**，通常稱為 EIP-1559 交易，是以太坊[倫敦升級](/history/#london)裡 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 中引入的交易。 這類交易已成為以太坊網路上的標準交易類型。 這些交易引入了一種新的費用市場機制，透過將交易費用分為基本費用和優先費來提高可預測性。 這些交易的開頭為位元組 `0x02`，並包含 `maxPriorityFeePerGas` 和 `maxFeePerGas` 等欄位。 類型 2 交易因其靈活性和效率而成為預設交易，在網路高度擁塞期間尤其受到青睞，因為它們能夠幫助使用者更好地預測及管理交易費用。 這些交易的 TransactionType 值為 `0x2`。



## 衍生閱讀 {#further-reading}

- [EIP-2718：Typed Transaction Envelope 交易](https://eips.ethereum.org/EIPS/eip-2718)

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_

## 相關主題 {#related-topics}

- [帳戶](/developers/docs/accounts/)
- [以太坊虛擬機](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
