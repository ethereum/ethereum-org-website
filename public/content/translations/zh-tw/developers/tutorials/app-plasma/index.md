---
title: 撰寫一個保護隱私的特定應用程式電漿
description: 在本教學中，我們將建立一個用於存款的半機密銀行。該銀行是一個中心化元件；它知道每個使用者的餘額。然而，這些資訊並未儲存在鏈上。相反地，銀行會發布狀態的雜湊值。每次發生交易時，銀行都會發布新的雜湊值，以及一個零知識證明，證明它擁有一個已簽署的交易，該交易將雜湊狀態更改為新的狀態。閱讀本教學後，您不僅會了解如何使用零知識證明，還會了解為什麼要使用它們以及如何安全地進行操作。
author: 奧里·波梅蘭茨
tags: ["零知識", "伺服器", "鏈下", "隱私"]
skill: advanced
breadcrumb: 特定應用程式電漿
lang: zh-tw
published: 2025-10-15
---
## 簡介 {#introduction}

與[匯總](/developers/docs/scaling/zk-rollups/)相反，[電漿](/developers/docs/scaling/plasma)使用以太坊主網來確保完整性，但不保證可用性。在本文中，我們將撰寫一個行為類似於電漿的應用程式，由以太坊保證完整性（沒有未經授權的更改），但不保證可用性（中心化元件可能會停機並使整個系統癱瘓）。

我們在此撰寫的應用程式是一個保護隱私的銀行。不同的地址擁有帶有餘額的帳戶，並且它們可以將資金（ETH）發送給其他帳戶。銀行會發布狀態（帳戶及其餘額）和交易的雜湊值，但將實際餘額保留在鏈下，以保持其隱私。

## 設計 {#design}

這不是一個可用於生產環境的系統，而是一個教學工具。因此，在編寫時採用了幾個簡化的假設。

- 固定的帳戶池。帳戶數量是特定的，且每個帳戶屬於一個預先決定的地址。這使得系統簡單得多，因為在零知識證明中很難處理可變大小的資料結構。對於可用於生產環境的系統，我們可以使用 [默克爾根](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) 作為狀態雜湊，並為所需的餘額提供默克爾證明。

- 記憶體儲存。在生產系統上，我們需要將所有帳戶餘額寫入磁碟，以便在重新啟動時保留它們。在這裡，如果資訊直接遺失也沒關係。

- 僅限轉帳。生產系統需要一種將資產存入銀行並提取的方法。但這裡的目的只是為了說明概念，因此這家銀行僅限於轉帳。

### 零知識證明 {#zero-knowledge-proofs}

從根本上來說，零知識證明表明證明者知道某些資料 _Data<sub>private</sub>_，使得某些公開資料 _Data<sub>public</sub>_ 與 _Data<sub>private</sub>_ 之間存在某種關係 _Relationship_。驗證者知道 _Relationship_ 和 _Data<sub>public</sub>_。

為了保護隱私，我們需要狀態和交易保持私密。但為了確保完整性，我們需要狀態的 [密碼學雜湊](https://en.wikipedia.org/wiki/Cryptographic_hash_function) 是公開的。為了向提交交易的人證明這些交易確實發生了，我們還需要發布交易雜湊值。

在大多數情況下，_Data<sub>private</sub>_ 是零知識證明程式的輸入，而 _Data<sub>public</sub>_ 是輸出。

_Data<sub>private</sub>_ 中的這些欄位：

- _State<sub>n</sub>_，舊狀態
- _State<sub>n+1</sub>_，新狀態
- _Transaction_，將舊狀態更改為新狀態的交易。此交易需要包含以下欄位：
  - 接收轉帳的 _目標地址_
  - 正在轉帳的 _金額_
  - _隨機數_，以確保每筆交易只能被處理一次。
    來源地址不需要包含在交易中，因為它可以從簽章中還原。
- _Signature_，授權執行交易的簽章。在我們的案例中，唯一被授權執行交易的地址是來源地址。由於我們的零知識系統的運作方式，除了以太坊簽章之外，我們還需要帳戶的公鑰。

這些是 _Data<sub>public</sub>_ 中的欄位：

- _Hash(State<sub>n</sub>)_ 舊狀態的雜湊
- _Hash(State<sub>n+1</sub>)_ 新狀態的雜湊
- _Hash(Transaction)_ 將狀態從 _State<sub>n</sub>_ 更改為 _State<sub>n+1</sub>_ 的交易雜湊值。

該關係會檢查幾個條件：

- 公開雜湊確實是私密欄位的正確雜湊。
- 將交易應用於舊狀態時，會產生新狀態。
- 簽章來自交易的來源地址。

由於密碼學雜湊函數的特性，證明這些條件就足以確保完整性。

### 資料結構 {#data-structures}

主要的資料結構是伺服器所持有的狀態。對於每個帳戶，伺服器會追蹤帳戶餘額和一個 [隨機數](https://en.wikipedia.org/wiki/Cryptographic_nonce)，用於防止 [重放攻擊](https://en.wikipedia.org/wiki/Replay_attack)。

### 元件 {#components}

此系統需要兩個元件：

- _伺服器_，負責接收交易、處理交易，並將雜湊連同零知識證明發布到鏈上。
- _智能合約_，負責儲存雜湊並驗證零知識證明，以確保狀態轉換是合法的。

### 資料與控制流程 {#flows}

這些是各個元件之間進行通訊以從一個帳戶轉帳到另一個帳戶的方式。

1. 網頁瀏覽器提交一筆已簽署的交易，要求從簽署者的帳戶轉帳到另一個不同的帳戶。

2. 伺服器驗證該交易是否有效：

   - 簽署者在銀行中有一個餘額充足的帳戶。
   - 接收者在銀行中有一個帳戶。

3. 伺服器透過從簽署者的餘額中減去轉帳金額，並將其加到接收者的餘額中，來計算新狀態。

4. 伺服器計算一個零知識證明，證明該狀態變更是有效的。

5. 伺服器向以太坊提交一筆交易，其中包含：

   - 新狀態雜湊
   - 交易雜湊值（以便交易發送者可以知道它已被處理）
   - 證明轉換到新狀態是有效的零知識證明

6. 智能合約驗證零知識證明。

7. 如果零知識證明驗證通過，智能合約會執行以下操作：
   - 將當前狀態雜湊更新為新狀態雜湊
   - 發出一個包含新狀態雜湊和交易雜湊值的日誌條目

### 工具 {#tools}

對於客戶端程式碼，我們將使用 [Vite](https://vite.dev/)、[React](https://react.dev/)、[Viem](https://viem.sh/) 和 [Wagmi](https://wagmi.sh/)。這些是業界標準的工具；如果您對它們不熟悉，可以使用 [本教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

伺服器的大部分程式碼是使用 [Node](https://nodejs.org/en) 以 JavaScript 編寫的。零知識部分是以 [Noir](https://noir-lang.org/) 編寫的。我們需要 `1.0.0-beta.10` 版本，因此在您 [按照指示安裝 Noir](https://noir-lang.org/docs/getting_started/quick_start) 之後，請執行：

```
noirup -v 1.0.0-beta.10
```

我們使用的區塊鏈是 `anvil`，這是一個本地測試區塊鏈，也是 [Foundry](https://getfoundry.sh/introduction/installation) 的一部分。

## 實作 {#implementation}

因為這是一個複雜的系統，我們將分階段實作。

### 第 1 階段 - 手動零知識 {#stage-1}

在第一階段，我們將在瀏覽器中簽署一筆交易，然後手動將資訊提供給零知識證明。零知識程式碼預期在 `server/noir/Prover.toml` 中取得該資訊（文件請見[此處](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)）。

要查看實際運作情況：

1. 確保你已安裝 [Node](https://nodejs.org/en/download) 和 [Noir](https://noir-lang.org/install)。最好將它們安裝在 UNIX 系統上，例如 macOS、Linux 或 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)。

2. 下載第 1 階段的程式碼並啟動網頁伺服器以提供客戶端程式碼。

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   這裡需要網頁伺服器的原因是，為了防止某些類型的詐欺，許多錢包（例如梅塔馬斯克）不接受直接從磁碟提供的檔案

3. 開啟帶有錢包的瀏覽器。

4. 在錢包中，輸入新的密碼短語。請注意，這將刪除你現有的密碼短語，因此_請確保你已備份_。

   密碼短語為 `test test test test test test test test test test test junk`，這是 anvil 的預設測試密碼短語。

5. 瀏覽至[客戶端程式碼](http://localhost:5173/)。

6. 連接至錢包並選擇你的目標帳戶與金額。

7. 點擊 **Sign** 並簽署交易。

8. 在 **Prover.toml** 標題下，你會找到文字。將 `server/noir/Prover.toml` 替換為該文字。

9. 執行零知識證明。

   ```sh
   cd ../server/noir
   nargo execute
   ```

   輸出應類似於

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. 將最後兩個值與你在網頁瀏覽器上看到的雜湊進行比較，以查看訊息是否被正確雜湊。

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)顯示了 Noir 預期的資訊格式。

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

訊息採用純文字格式，這使得使用者易於理解（在簽署時這是必要的），也便於 Noir 程式碼進行解析。金額以芬尼為單位報價，一方面可以實現小數轉帳，另一方面也易於閱讀。最後一個數字是[隨機數](https://en.wikipedia.org/wiki/Cryptographic_nonce)。

字串長度為 100 個字元。零知識證明無法很好地處理可變大小的資料，因此通常需要對資料進行填充。

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

這三個參數是固定大小的位元組陣列。

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

這是指定結構陣列的方法。對於每個條目，我們指定地址、餘額（以 milliETH 即[芬尼](https://cryptovalleyjournal.com/glossary/finney/)為單位）以及下一個隨機數值。

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx)實作了客戶端處理並產生 `server/noir/Prover.toml` 檔案（包含零知識參數的檔案）。

以下是較有趣部分的說明。

```tsx
export default attrs =>  {
```

此函數建立了 `Transfer` React 元件，其他檔案可以匯入該元件。

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

這些是帳戶地址，由 `test ... test junk` 密碼短語建立的地址。如果你想使用自己的地址，只需修改此定義即可。

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

這些 [Wagmi hooks](https://wagmi.sh/react/api/hooks) 讓我們能夠存取 [viem](https://viem.sh/) 函式庫和錢包。

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

這是訊息，用空格填充。每當 [`useState`](https://react.dev/reference/react/useState) 變數之一發生變化時，元件就會重新繪製並更新 `message`。

```tsx
  const sign = async () => {
```

當使用者點擊 **Sign** 按鈕時會呼叫此函數。訊息會自動更新，但簽章需要使用者在錢包中批准，除非必要，否則我們不想要求批准。

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

要求錢包[簽署訊息](https://viem.sh/docs/accounts/local/signMessage)。 

```tsx
    const hash = hashMessage(message)
```

取得訊息雜湊。將其提供給使用者以進行除錯（針對 Noir 程式碼）會很有幫助。 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[取得公鑰](https://viem.sh/docs/utilities/recoverPublicKey)。這是 [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) 函數所要求的。

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

設定狀態變數。這樣做會重新繪製元件（在 `sign` 函數退出後），並向使用者顯示更新後的值。

```tsx
    let proverToml = `
```

`Prover.toml` 的文字。

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem 以 65 位元組的十六進位字串形式向我們提供公鑰。第一個位元組是 `0x04`，這是一個版本標記。接下來是 32 位元組的公鑰 `x`，然後是 32 位元組的公鑰 `y`。

然而，Noir 預期以兩個位元組陣列的形式取得此資訊，一個用於 `x`，另一個用於 `y`。在客戶端這裡解析它比作為零知識證明的一部分更容易。

請注意，這通常是零知識中的良好實踐。零知識證明內部的程式碼成本很高，因此任何可以在零知識證明外部完成的處理_都應該_在零知識證明外部完成。

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

簽章也以 65 位元組的十六進位字串形式提供。然而，最後一個位元組僅用於恢復公鑰。由於公鑰已經提供給 Noir 程式碼，我們不需要它來驗證簽章，且 Noir 程式碼也不要求它。

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

提供帳戶。

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

這是元件的 HTML（更準確地說，是 [JSX](https://react.dev/learn/writing-markup-with-jsx)）格式。

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr)是實際的零知識程式碼。

```
use std::hash::pedersen_hash;
```

[Pedersen 雜湊](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/)由 [Noir 標準函式庫](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)提供。零知識證明通常使用此雜湊函數。與標準雜湊函數相比，它在[算術電路](https://rareskills.io/post/arithmetic-circuit)內部計算要容易得多。

```
use keccak256::keccak256;
use dep::ecrecover;
```

這兩個函數是外部函式庫，定義在 [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) 中。它們的功能正如其名，一個是計算 [keccak256 雜湊](https://emn178.github.io/online-tools/keccak_256.html)的函數，另一個是驗證以太坊簽章並恢復簽署者以太坊地址的函數。

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir 的靈感來自 [Rust](https://www.rust-lang.org/)。變數預設為常數。這就是我們定義全域配置常數的方式。具體來說，`ACCOUNT_NUMBER` 是我們儲存的帳戶數量。

名為 `u<number>` 的資料類型是該位元數的無號整數。唯一支援的類型是 `u8`、`u16`、`u32`、`u64` 和 `u128`。

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

此變數用於帳戶的 Pedersen 雜湊，如下所述。

```
global MESSAGE_LENGTH : u32 = 100;
```

如上所述，訊息長度是固定的。它在此處指定。

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 簽章](https://eips.ethereum.org/EIPS/eip-191)要求緩衝區具有 26 位元組的前綴，接著是 ASCII 格式的訊息長度，最後是訊息本身。

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

我們儲存的關於帳戶的資訊。[`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) 是一個數字，通常最多 253 位元，可以直接在實作零知識證明的[算術電路](https://rareskills.io/post/arithmetic-circuit)中使用。在這裡，我們使用 `Field` 來儲存 160 位元的以太坊地址。

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

我們為轉帳交易儲存的資訊。

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

函數定義。參數是 `Account` 資訊。結果是一個 `Field` 變數陣列，其長度為 `FLAT_ACCOUNT_FIELDS`

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

陣列中的第一個值是帳戶地址。第二個值包含餘額和隨機數。`.into()` 呼叫將數字變更為其所需的資料類型。`account.nonce` 是一個 `u32` 值，但要將其加到 `account.balance << 32`（一個 `u128` 值）中，它必須是一個 `u128`。這就是第一個 `.into()` 的作用。第二個呼叫將 `u128` 結果轉換為 `Field`，以便它適合放入陣列中。

```
flat
}
```

在 Noir 中，函數只能在最後回傳一個值（沒有提前回傳）。要指定回傳值，你需要在函數的右括號之前對其進行求值。

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

此函數將帳戶陣列轉換為 `Field` 陣列，該陣列可用作 Petersen 雜湊的輸入。

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

這就是你指定可變變數（即_不是_常數）的方式。Noir 中的變數必須始終具有值，因此我們將此變數初始化為全零。

```
for i in 0..ACCOUNT_NUMBER {
```

這是一個 `for` 迴圈。請注意，邊界是常數。Noir 迴圈必須在編譯時知道其邊界。原因是算術電路不支援流程控制。在處理 `for` 迴圈時，編譯器只是將其中的程式碼放置多次，每次迭代一次。

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

最後，我們來到了對帳戶陣列進行雜湊的函數。

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

此函數尋找具有特定地址的帳戶。在標準程式碼中，此函數的效率會非常低，因為即使找到了地址，它也會迭代所有帳戶。

然而，在零知識證明中，沒有流程控制。如果我們需要檢查某個條件，我們必須每次都檢查它。

`if` 敘述也會發生類似的情況。上述迴圈中的 `if` 敘述被轉換為這些數學敘述。

_condition<sub>result</sub> = accounts[i].address == address_ // 如果它們相等則為 1，否則為 0

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

如果斷言為假，[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) 函數會導致零知識證明崩潰。在這種情況下，如果我們找不到具有相關地址的帳戶。為了報告地址，我們使用[格式化字串](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)。

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

此函數套用轉帳交易並回傳新的帳戶陣列。

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

我們無法在 Noir 的格式化字串中存取結構元素，因此我們建立一個可用的副本。

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

這是兩個可能導致交易無效的條件。

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

建立新的帳戶陣列然後將其回傳。

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

此函數從訊息中讀取地址。 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

地址長度始終為 20 位元組（即 40 個十六進位數字），並從第 7 個字元開始。

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

從訊息中讀取金額和隨機數。 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

在訊息中，地址後的第一個數字是要轉帳的芬尼（即千分之一 ETH）金額。第二個數字是隨機數。它們之間的任何文字都會被忽略。

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // 我們剛剛找到了它
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

回傳[元組](https://noir-lang.org/docs/noir/concepts/data_types/tuples)是 Noir 從函數回傳多個值的方式。

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

此函數將訊息轉換為位元組，然後將金額轉換為 `TransferTxn`。

```rust
// 等同於 Viem 的 hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

我們能夠對帳戶使用 Pedersen 雜湊，因為它們僅在零知識證明內部進行雜湊。然而，在此程式碼中，我們需要檢查由瀏覽器產生的訊息簽章。為此，我們需要遵循 [EIP-191](https://eips.ethereum.org/EIPS/eip-191) 中的以太坊簽署格式。這意味著我們需要建立一個組合緩衝區，其中包含標準前綴、ASCII 格式的訊息長度以及訊息本身，並使用以太坊標準的 keccak256 對其進行雜湊。

```rust
    // ASCII 前綴
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

為了避免應用程式要求使用者簽署可用作交易或用於其他目的的訊息，EIP-191 指定所有已簽署的訊息都以字元 0x19（不是有效的 ASCII 字元）開頭，接著是 `Ethereum Signed Message:` 和換行符號。

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

處理長度最多為 999 的訊息，如果更大則失敗。我加入了這段程式碼，即使訊息長度是一個常數，因為這使得更改它變得更容易。在生產系統上，為了獲得更好的效能，你可能會直接假設 `MESSAGE_LENGTH` 不會改變。

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

使用以太坊標準的 `keccak256` 函數。

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // 地址，雜湊的前 16 個位元組，雜湊的後 16 個位元組        
{
```

此函數驗證簽章，這需要訊息雜湊。然後它向我們提供簽署它的地址和訊息雜湊。訊息雜湊以兩個 `Field` 值提供，因為在程式的其餘部分中，它們比位元組陣列更容易使用。

我們需要使用兩個 `Field` 值，因為欄位計算是對一個大數字進行[模運算](https://en.wikipedia.org/wiki/Modulo)，但該數字通常小於 256 位元（否則很難在 EVM 中執行這些計算）。

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

將 `hash1` 和 `hash2` 指定為可變變數，並逐位元組將雜湊寫入其中。

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
這類似於 [Solidity 的 `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)，但有兩個重要的區別：

- 如果簽章無效，呼叫將在 `assert` 處失敗，並且程式將中止。
- 雖然可以從簽章和雜湊中恢復公鑰，但這是可以在外部完成的處理，因此不值得在零知識證明內部進行。如果有人試圖在這裡欺騙我們，簽章驗證將會失敗。

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // 舊帳戶陣列的雜湊
        Field,  // 新帳戶陣列的雜湊
        Field,  // 訊息雜湊的前 16 個位元組
        Field,  // 訊息雜湊的後 16 個位元組
    )
```

最後，我們到達了 `main` 函數。我們需要證明我們有一筆交易，該交易有效地將帳戶的雜湊從舊值變更為新值。我們還需要證明它具有這個特定的交易雜湊值，以便發送它的人知道他們的交易已被處理。

```rust
{
    let mut txn = readTransferTxn(message);
```

我們需要 `txn` 是可變的，因為我們不是從訊息中讀取發送方地址，而是從簽章中讀取。 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### 第 2 階段 - 加入伺服器 {#stage-2}

在第二階段，我們加入一個伺服器，該伺服器接收並實作來自瀏覽器的轉帳交易。

要查看實際運作情況：

1. 如果 Vite 正在執行，請將其停止。

2. 下載包含伺服器的分支，並確保你擁有所有必要的模組。

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   不需要編譯 Noir 程式碼，它與你在第 1 階段使用的程式碼相同。

3. 啟動伺服器。

   ```sh
   npm run start
   ```

4. 在單獨的命令列視窗中，執行 Vite 以提供瀏覽器程式碼。

   ```sh
   cd client
   npm run dev
   ```

5. 瀏覽至客戶端程式碼 [http://localhost:5173](http://localhost:5173)

6. 在發出交易之前，你需要知道隨機數以及你可以發送的金額。要取得此資訊，請點擊 **Update account data** 並簽署訊息。

   我們在這裡面臨一個兩難。一方面，我們不想簽署可以被重複使用的訊息（[重放攻擊](https://en.wikipedia.org/wiki/Replay_attack)），這就是為什麼我們一開始就需要隨機數。然而，我們還沒有隨機數。解決方案是選擇一個只能使用一次且雙方都已經擁有的隨機數，例如當前時間。

   這個解決方案的問題在於時間可能無法完美同步。因此，我們改為簽署一個每分鐘變更一次的值。這意味著我們容易受到重放攻擊的空窗期最多為一分鐘。考慮到在生產環境中，已簽署的請求將受到 TLS 的保護，並且通道的另一端（伺服器）已經可以揭露餘額和隨機數（它必須知道它們才能運作），這是一個可接受的風險。

7. 一旦瀏覽器取回餘額和隨機數，它就會顯示轉帳表單。選擇目標地址和金額，然後點擊 **Transfer**。簽署此請求。

8. 要查看轉帳，請點擊 **Update account data** 或查看執行伺服器的視窗。伺服器會在每次狀態變更時記錄日誌。

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs)包含伺服器程序，並與 [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) 處的 Noir 程式碼互動。以下是較有趣部分的說明。

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) 函式庫是 JavaScript 程式碼和 Noir 程式碼之間的介面。

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

載入算術電路——我們在上一階段建立的已編譯 Noir 程式——並準備執行它。

```js
// 我們僅在回應已簽章的請求時提供帳戶資訊
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

為了提供帳戶資訊，我們只需要簽章。原因是我們已經知道訊息會是什麼，因此也知道訊息雜湊。

```js
const processMessage = async (message, signature) => {
```

處理訊息並執行其編碼的交易。

```js
    // 取得公鑰
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

現在我們在伺服器上執行 JavaScript，我們可以在那裡而不是在客戶端上擷取公鑰。

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` 執行 Noir 程式。參數等同於 [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) 中提供的參數。請注意，長值以十六進位字串陣列（`["0x60", "0xA7"]`）的形式提供，而不是像 Viem 那樣作為單一十六進位值（`0x60A7`）提供。

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

如果發生錯誤，請捕捉它，然後將簡化版本中繼給客戶端。

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

套用交易。我們已經在 Noir 程式碼中做過了，但在這裡再做一次比從那裡提取結果更容易。

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

初始的 `Accounts` 結構。

### 第 3 階段 - 以太坊智能合約 {#stage-3}

1. 停止伺服器和客戶端程序。

2. 下載包含智能合約的分支，並確保你擁有所有必要的模組。

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. 在單獨的命令列視窗中執行 `anvil`。

4. 產生驗證金鑰和 Solidity 驗證者，然後將驗證者程式碼複製到 Solidity 專案中。

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. 前往智能合約並設定環境變數以使用 `anvil` 區塊鏈。

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. 部署 `Verifier.sol` 並將地址儲存在環境變數中。

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. 部署 `ZkBank` 合約。

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` 值是 `Accounts` 初始狀態的 Pederson 雜湊。如果你在 `server/index.mjs` 中修改此初始狀態，你可以執行一筆交易來查看零知識證明報告的初始雜湊。

8. 執行伺服器。

   ```sh
   cd ../server
   npm run start
   ```

9. 在不同的命令列視窗中執行客戶端。

   ```sh
   cd client
   npm run dev
   ```

10. 執行一些交易。

11. 要驗證狀態是否在鏈上發生變更，請重新啟動伺服器程序。你會看到 `ZkBank` 不再接受交易，因為交易中的原始雜湊值與儲存在鏈上的雜湊值不同。

    這是預期的錯誤類型。

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

此檔案中的變更主要與建立實際證明並將其提交到鏈上相關。

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

我們需要使用 [Barretenberg 套件](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg)來建立要發送到鏈上的實際證明。我們可以透過執行命令列介面（`bb`）或使用 [JavaScript 函式庫 `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) 來使用此套件。JavaScript 函式庫比原生執行程式碼慢得多，因此我們在這裡使用 [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) 來使用命令列。

請注意，如果你決定使用 `bb.js`，你需要使用與你正在使用的 Noir 版本相容的版本。在撰寫本文時，目前的 Noir 版本（1.0.0-beta.11）使用 `bb.js` 版本 0.87。

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

這裡的地址是當你從乾淨的 `anvil` 開始並遵循上述指示時獲得的地址。

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

此私鑰是 `anvil` 中預設的預先注資帳戶之一。 

```js
const generateProof = async (witness, fileID) => {
```

使用 `bb` 執行檔產生證明。

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

將見證寫入檔案。

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

實際建立證明。此步驟還會建立一個包含公共變數的檔案，但我們不需要它。我們已經從 `noir.execute` 取得了這些變數。

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

證明是一個 `Field` 值的 JSON 陣列，每個值都表示為十六進位值。然而，我們需要在交易中將其作為單一 `bytes` 值發送，Viem 將其表示為一個大型十六進位字串。在這裡，我們透過連接所有值、移除所有 `0x`，然後在最後加入一個來變更格式。

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

清理並回傳證明。

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

公共欄位需要是 32 位元組值的陣列。然而，由於我們需要將交易雜湊值劃分在兩個 `Field` 值之間，因此它顯示為 16 位元組的值。在這裡我們加入零，以便 Viem 了解它實際上是 32 位元組。

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

每個地址只使用每個隨機數一次，因此我們可以使用 `fromAddress` 和 `nonce` 的組合做為見證檔案和輸出目錄的唯一識別碼。

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

將交易發送到鏈上。

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

這是接收交易的鏈上程式碼。

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

鏈上程式碼需要追蹤兩個變數：驗證者（由 `nargo` 建立的獨立合約）和目前的狀態雜湊。

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

每次狀態變更時，我們都會發出一個 `TransactionProcessed` 事件。

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

此函數處理交易。它以驗證者要求的格式取得證明（作為 `bytes`）和公共輸入（作為 `bytes32` 陣列）（以最小化鏈上處理，從而降低燃料成本）。

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

零知識證明需要證明交易從我們目前的雜湊變更為新的雜湊。

```solidity
        myVerifier.verify(_proof, _publicFields);
```

呼叫驗證者合約以驗證零知識證明。如果零知識證明錯誤，此步驟將還原交易。

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

如果一切檢查無誤，將狀態雜湊更新為新值並發出 `TransactionProcessed` 事件。

## 中心化元件的濫用 {#abuses}

資訊安全包含三個屬性：

- _機密性_：使用者無法讀取未經授權的資訊。
- _完整性_：除非由授權使用者以授權的方式進行，否則無法更改資訊。
- _可用性_：授權使用者可以使用該系統。

在這個系統中，完整性是透過零知識證明來提供的。可用性則難以保證，而機密性是不可能的，因為銀行必須知道每個帳戶的餘額和所有交易。我們無法阻止擁有資訊的實體分享該資訊。

或許可以使用[隱形地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html)來建立一個真正機密的銀行，但這超出了本文的範圍。

### 虛假資訊 {#false-info}

伺服器破壞完整性的一種方式是，在[請求資料](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291)時提供虛假資訊。

為了解決這個問題，我們可以編寫第二個 Noir 程式，該程式接收帳戶作為私密輸入，並將請求資訊的地址作為公開輸入。輸出則是該地址的餘額與隨機數，以及帳戶的雜湊值。

當然，這個證明無法在鏈上驗證，因為我們不想將隨機數和餘額發布到鏈上。然而，它可以由在瀏覽器中執行的用戶端程式碼來驗證。

### 強制交易 {#forced-txns}

在 L2 上確保可用性並防止審查的常見機制是[強制交易](https://docs.optimism.io/stack/transactions/forced-transaction)。但是強制交易無法與零知識證明結合。伺服器是唯一可以驗證交易的實體。

我們可以修改 `smart-contracts/src/ZkBank.sol` 以接受強制交易，並在處理這些交易之前防止伺服器更改狀態。然而，這會讓我們面臨簡單的阻斷服務攻擊。如果強制交易無效且因此無法處理怎麼辦？

解決方案是提供一個零知識證明來證明強制交易無效。這為伺服器提供了三個選項：

- 處理強制交易，提供已處理該交易的零知識證明以及新的狀態雜湊值。
- 拒絕強制交易，並向合約提供該交易無效（未知地址、錯誤的隨機數或餘額不足）的零知識證明。
- 忽略強制交易。沒有辦法強迫伺服器實際處理該交易，但這意味著整個系統將無法使用。

#### 可用性保證金 {#avail-bonds}

在現實生活中的實作中，可能會有某種利潤動機來維持伺服器運作。我們可以透過讓伺服器提交可用性保證金來加強這種誘因，如果強制交易未在特定期間內處理，任何人都可以銷毀該保證金。

### 糟糕的 Noir 程式碼 {#bad-noir-code}

通常，為了讓人們信任智能合約，我們會將原始碼上傳到[區塊鏈瀏覽器](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)。然而，在零知識證明的情況下，這是不夠的。

`Verifier.sol` 包含驗證金鑰，這是 Noir 程式的一個函數。然而，該金鑰並未告訴我們 Noir 程式是什麼。要真正擁有一個受信任的解決方案，你需要上傳 Noir 程式（以及建立它的版本）。否則，零知識證明可能反映的是一個不同的程式，一個帶有後門的程式。

在區塊鏈瀏覽器開始允許我們上傳並驗證 Noir 程式之前，你應該自己動手（最好上傳到 [IPFS](/developers/tutorials/ipfs-decentralized-ui/)）。這樣一來，進階使用者就能夠下載原始碼，自行編譯，建立 `Verifier.sol`，並驗證它與鏈上的版本完全相同。

## 結論 {#conclusion}

電漿類型的應用程式需要一個中心化組件作為資訊儲存。這會帶來潛在的漏洞，但作為回報，它允許我們以區塊鏈本身無法提供的方式來保護隱私。透過零知識證明，我們可以確保完整性，並可能使運行該中心化組件的人在經濟上有利可圖，從而維持其可用性。

[點擊此處查看我的更多作品](https://cryptodocguy.pro/)。

## 致謝 {#acknowledgements}

- Josh Crites 閱讀了本文的草稿，並協助我解決了一個棘手的 Noir 問題。

任何剩餘的錯誤均由本人負責。