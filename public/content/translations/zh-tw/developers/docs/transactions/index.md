---
title: "交易"
description: "以太坊交易概觀 – 運作原理、資料結構以及如何透過應用程式發送。"
lang: zh-tw
---

交易是帳戶發出的帶密碼學簽章的指令。 帳戶將發起交易以更新以太坊網路的狀態。 最簡單的交易是將以太幣從一個帳戶轉帳到另一個帳戶。

## 先決條件 {#prerequisites}

為協助您更了解本頁，建議您先閱讀 [帳戶](/developers/docs/accounts/) 和我們的 [以太坊簡介](/developers/docs/intro-to-ethereum/)。

## 什麼是交易？ {#whats-a-transaction}

以太坊交易是指由外部帳戶發起的操作，換句話說，此帳戶是由人而不是智慧型合約管理的帳戶。 例如，如果 Bob 發送給 Alice 1 以太幣，Bob 的帳戶必須扣除，Alice 的帳戶必須存入。 此更改狀態的操作發生在交易中。

![顯示交易導致狀態變更的圖表](./tx.png)
_圖表改編自 [Ethereum EVM 圖解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

交易會改變以太坊虛擬機的狀態，須廣播至整個網路。 任何節點都可以廣播要在以太坊虛擬機上執行的交易請求；之後驗證者將執行交易並將引起的狀態變化傳播到網路上的其他節點。

交易需要支付費用並需要添加至經過驗證的區塊中。 為了讓本文更好理解，我們會在其他地方講解燃料和驗證。

提交的交易包括下列資訊：

- `from` – 發送者的地址，將會用來簽署交易。 這將是一個外部擁有的帳戶，因爲合約帳戶無法傳送交易
- `to` – 接收地址 (若是外部擁有的帳戶，此交易將會轉移價值。 如果為合約帳戶，交易將執行合約程式碼）
- `signature` – 發送者的識別碼。 當發送者以私密金鑰簽署交易並確認發送者已授權此交易时，就會產生此簽章。
- `nonce` - 一個循序遞增的計數器，代表來自該帳戶的交易編號
- `value` – 從發送者轉移到接收者的 ETH 數量 (以 WEI 為單位，其中 1 ETH 等於 1e+18 wei)
- `input data` – 選填欄位，可包含任意資料
- `gasLimit` – 交易可消耗的 Gas 單位上限。 [EVM](/developers/docs/evm/opcodes) 指定了每個運算步驟所需的 Gas 單位
- `maxPriorityFeePerGas` - 可作為給驗證程式小費的每單位 Gas 最高價格
- `maxFeePerGas` - 願意為此交易支付的每單位 Gas 最高費用 (包含 `baseFeePerGas` 與 `maxPriorityFeePerGas`)

燃料指請驗證者處理交易所需的計算。 使用者必須為計算支付費用。 `gasLimit` 和 `maxPriorityFeePerGas` 決定支付給驗證程式的最高交易費用。 [更多關於 Gas 的資訊](/developers/docs/gas/)。

交易物件看起來有些像以下內容：

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

但交易物件需要使用發送者的私密金鑰簽署。 這證明交易只可能來自發送者，而不是以欺詐方式發送。

Geth 之類的以太坊用戶端將處理此簽署過程。

範例 [JSON-RPC](/developers/docs/apis/json-rpc) 呼叫：

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

- `raw` 是以 [遞迴長度前綴 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 編碼形式呈現的已簽署交易
- `tx` 是 JSON 形式的已簽署交易

交易具備簽章雜湊值，因此可通過加密技術證明交易來自發送者並提交至網路。

### 資料欄位 {#the-data-field}

大多數交易從外部帳戶存取合約。
大多數合約以 Solidity 撰寫，並根據 [應用程式二進位介面 (ABI)](/glossary/#abi) 解譯其資料欄位。

前四個字節位元組使用函式名稱及參數的雜湊值指定要呼叫的函式。
有時您可以使用[此資料庫](https://www.4byte.directory/signatures/) 來從選擇器識別函式。

calldata 的其餘部分是引數，[根據 ABI 規格中的指定方式進行編碼](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)。

例如，我們來看看[這筆交易](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)。
使用 **Click to see More** 檢視 calldata。

函式選擇器是 `0xa9059cbb`。 有數個[已知函式具有此簽章](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)。
在本案例中，[合約原始碼](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)已上傳至 Etherscan，因此我們知道函式為 `transfer(address,uint256)`。

其餘資料如下所示：

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

根據 ABI 規範，應用程式介面中的整數值（例如地址，20 字節位元組的整數）顯示為 32 字節位元組的字，並且前面用 0 來填補。
因此我們知道 `to` 地址是 [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)。
`value` 為 0x3b0559f4 = 990206452。

## 交易類型 {#types-of-transactions}

以太坊上有幾種不同類型的交易：

- 一般交易：從一個帳戶至另一個帳戶的交易。
- 合約部署交易：沒有「to」地址的交易，其資料欄供合約程式碼所用。
- 合約執行：與部署的智慧型合約互動的交易。 在本例中，「to」地址為智慧型合約的地址。

### 關於 Gas {#on-gas}

如前所述，執行交易需要花費 [Gas](/developers/docs/gas/)。 簡單的轉帳交易需要 21000 單位燃料。

因此，如果 Bob 要在 `baseFeePerGas` 為 190 gwei 且 `maxPriorityFeePerGas` 為 10 gwei 的情況下，傳送 1 ETH 給 Alice，Bob 將需要支付下列費用：

```
(190 + 10) * 21000 = 4,200,000 gwei
--或者--
0.0042 以太幣
```

Bob 的帳戶將會被扣款 **-1.0042 ETH** (1 ETH 給 Alice + 0.0042 ETH 的 Gas 費用)

Alice 的帳戶將會存入 **+1.0 ETH**

基本費用將被銷毀 **-0.00399 ETH**

驗證程式保留小費 **+0.000210 ETH**

![顯示未使用 Gas 如何退款的圖表](./gas-tx.png)
_圖表改編自 [Ethereum EVM 圖解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

任何交易中未使用的燃料都會退還給使用者帳戶。

### 智慧合約互動 {#smart-contract-interactions}

任何涉及智慧型合約的交易都需要燃料。

智慧合約也可以包含 [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) 或 [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) 函式，這些函式不會改變合約的狀態。 因此，從外部帳戶調用這些函數不需要任何燃料。 此情境的底層 RPC 呼叫是 [`eth_call`](/developers/docs/apis/json-rpc#eth_call)。

與使用 `eth_call` 存取不同，這些 `view` 或 `pure` 函式也常在內部被呼叫 (即從合約本身或從另一個合約呼叫)，這確實會花費 Gas。

## 交易生命週期 {#transaction-lifecycle}

一旦交易被提交，就會發生以下情況：

1. 交易哈希是以密碼學方式產生的：
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 然後該交易會廣播到網路並添加到交易池中，交易池中包含了其他所有等待中的網路交易。
3. 為了要驗證交易並使交易「成功」，驗證者必須選擇你的交易並將它打包進區塊中。
4. 隨著時間推移，含有你交易的區塊會被升級為「已證明」，然後是「最終化」。 這些升級能讓您更加
   確定交易成功，且永遠不會被更改。 一旦區塊「最終確認」，就只能透過
   耗資數十億美元的網路層級攻擊才能更改。

## 視覺化示範 {#a-visual-demo}

觀看 Austin 為你講解交易、燃料和挖礦。

<YouTube id="er-0ihqFQB0" />

## 類型化交易封包 {#typed-transaction-envelope}

以太坊最初有一種形式的交易。 每筆交易都包含 nonce、gas price、gas limit、to address、value、data、v、r 與 s。 這些欄位經過 [RLP 編碼](/developers/docs/data-structures-and-encoding/rlp/)後，看起來像這樣：

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

以太坊已演進到支援多種類型的交易，以便在實作存取清單和 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 等新功能時，不會影響舊有交易格式。

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 實現了這種行為。 交易的解釋如下：

`TransactionType || TransactionPayload`

其欄位定義如下：

- `TransactionType` - 一個介於 0 和 0x7f 之間的數字，總共有 128 種可能的交易類型。
- `TransactionPayload` - 由交易類型定義的任意位元組陣列。

根據 `TransactionType` 的值，交易可分類為：

1. **類型 0 (傳統) 交易：** 自以太坊推出以來使用的原始交易格式。 它們不包含 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 的功能，例如動態 Gas 費用計算或智慧合約的存取清單。 傳統交易在其序列化形式中缺少指示其類型的特定前綴，在使用[遞迴長度前綴 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 編碼時以位元組 `0xf8` 開頭。 這些交易的 TransactionType 值為 `0x0`。

2. **類型 1 交易：** 在 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中作為以太坊[柏林升級](/ethereum-forks/#berlin) 的一部分引入，這些交易包含一個 `accessList` 參數。 此清單指定了交易預期存取的地址和儲存金鑰，有助於潛在降低涉及智慧合約的複雜交易的 [Gas](/developers/docs/gas/) 成本。 EIP-1559 的費用市場變化不會包含在類型 1 交易中。 類型 1 交易也包含一個 `yParity` 參數，可以是 `0x0` 或 `0x1`，表示 secp256k1 簽章的 y 值的奇偶性。 它們以位元組 `0x01` 開頭來識別，其 TransactionType 值為 `0x1`。

3. **類型 2 交易**，通常稱為 EIP-1559 交易，是在以太坊[倫敦升級](/ethereum-forks/#london) 的 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 中引入的交易。 這類交易已成為以太坊網路上的標準交易類型。 這些交易引入了一種新的費用市場機制，透過將交易費用分為基本費用和優先費來提高可預測性。 它們以位元組 `0x02` 開頭，並包含 `maxPriorityFeePerGas` 和 `maxFeePerGas` 等欄位。 類型 2 交易因其靈活性和效率而成為預設交易，在網路高度擁塞期間尤其受到青睞，因為它們能夠幫助使用者更好地預測及管理交易費用。 這些交易的 TransactionType 值為 `0x2`。

4. **類型 3 (Blob) 交易**在[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 中作為以太坊 [Dencun 升級](/ethereum-forks/#dencun) 的一部分被引入。 這些交易旨在更高效地處理「blob」資料 (二進位大型物件)，它們提供了一種以更低成本將資料發佈到以太坊網路的方法，尤其有利於二層網路卷軸。 Blob 交易包含額外欄位，例如 `blobVersionedHashes`、`maxFeePerBlobGas` 和 `blobGasPrice`。 它們以位元組 `0x03` 開頭，其 TransactionType 值為 `0x3`。 Blob 交易代表了以太坊在資料可用性和可擴張性方面的重大改進。

5. **類型 4 交易**是在[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 中作為以太坊 [Pectra 升級](/roadmap/pectra/) 的一部分引入的。 這些交易被設計為與帳戶抽象化向前相容。 它們允許 EOA 暫時表現得像智慧合約帳戶，而不會影響其原始功能。 它們包含一個 `authorization_list` 參數，用於指定 EOA 將其權限委派給哪個智慧合約。 交易後，EOA 的程式碼欄位將包含被委派的智慧合約地址。

## 延伸閱讀 {#further-reading}

- [EIP-2718：類型化交易封包](https://eips.ethereum.org/EIPS/eip-2718)

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [賬戶](/developers/docs/accounts/)
- [以太坊虛擬機 (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
