---
title: "編寫一個保護隱私的特定應用程式 plasma"
description: "在本使用教學中，我們將為存款建立一個半祕密的銀行。 此銀行為中心化元件；它知道每位使用者的餘額。 然而，此資訊不會儲存在鏈上。 銀行會改為張貼狀態的雜湊值。 每當交易發生時，銀行就會張貼新的雜湊值，以及證明其擁有將雜湊狀態變更為新狀態的簽署交易之零知識證明。 閱讀本使用教學後，您不僅將瞭解如何使用零知識證明，還會瞭解為何要使用以及如何安全地使用。"
author: Ori Pomerantz
tags: [ "零知識", "伺服器", "鏈下", "隱私" ]
skill: advanced
lang: zh-tw
published: 2025-10-15
---

## 介紹 {#introduction}

與 [rollups](/developers/docs/scaling/zk-rollups/) 相反，[plasma](/developers/docs/scaling/plasma) 使用以太坊主網來確保完整性，而非可用性。 在本文中，我們將編寫一個行為類似 plasma 的應用程式，由以太坊保證完整性 (無未經授權的變更)，但不保證可用性 (中心化元件可能故障並停用整個系統)。

我們在此處編寫的應用程式是保留隱私權的銀行。 不同的地址擁有含餘額的帳戶，且可將資金 (ETH) 傳送至其他帳戶。 銀行會張貼狀態 (帳戶及其餘額) 和交易的雜湊值，但會將實際餘額保留在鏈下，以維持其隱私。

## 設計 {#design}

這不是可供生產的系統，而是教學工具。 因此，它是基於幾個簡化的假設編寫的。

- 固定的帳戶池。 帳戶有特定數量，且每個帳戶都屬於預先決定的地址。 這使得系統更加簡單，因為在零知識證明中處理可變大小的資料結構很困難。 對於可供生產的系統，我們可以使用 [Merkle 根](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) 作為狀態雜湊值，並為必要的餘額提供 Merkle 證明。

- 記憶體儲存。 在生產系統上，我們需要將所有帳戶餘額寫入磁碟，以在重新啟動時保留它們。 在此，即使資訊遺失也無妨。

- 僅限傳送。 生產系統需要一種將資產存入銀行並提款的方式。 但這裡的目的只是為了說明概念，所以此銀行僅限於傳送。

### 零知識證明 {#zero-knowledge-proofs}

在基礎層面上，零知識證明顯示證明者知道一些資料 _Data<sub>private</sub>_，使得一些公開資料 _Data<sub>public</sub>_ 和 _Data<sub>private</sub>_ 之間存在關係 _Relationship_。 驗證者知道 _Relationship_ 和 _Data<sub>public</sub>_。

為了保護隱私，我們需要將狀態和交易設為私密。 但為了確保完整性，我們需要將狀態的 [密碼學雜湊值](https://en.wikipedia.org/wiki/Cryptographic_hash_function) 設為公開。 為了向提交交易的人證明這些交易確實發生了，我們還需要張貼交易雜湊值。

在大多數情況下，_Data<sub>private</sub>_ 是零知識證明程式的輸入，而 _Data<sub>public</sub>_ 是輸出。

_Data<sub>private</sub>_ 中的這些欄位：

- _State<sub>n</sub>_，舊的狀態
- _State<sub>n+1</sub>_，新的狀態
- _Transaction_，將舊狀態變更為新狀態的交易。 此交易需要包含以下欄位：
  - _目的地地址_，接收傳送的地址
  - 正在傳送的 _金額_
  - _Nonce_，確保每個交易只能處理一次。
    來源地址不需要在交易中，因為它可以從簽章中恢復。
- _簽章_，一個經授權執行交易的簽章。 在我們的案例中，唯一被授權執行交易的地址是來源地址。 由於我們的零知識系統的運作方式，除了以太坊簽章外，我們還需要帳戶的公鑰。

_Data<sub>public</sub>_ 中的這些欄位：

- _Hash(State<sub>n</sub>)_，舊狀態的雜湊值
- _Hash(State<sub>n+1</sub>)_，新狀態的雜湊值
- _Hash(Transaction)_，將狀態從 _State<sub>n</sub>_ 變更為 _State<sub>n+1</sub>_ 的交易雜湊值。

此關係會檢查幾個條件：

- 公開的雜湊值確實是私密欄位的正確雜湊值。
- 交易應用於舊狀態時，會產生新狀態。
- 簽章來自交易的來源地址。

由於密碼學雜湊函數的特性，證明這些條件就足以確保完整性。

### 數據結構 {#data-structures}

主要資料結構是伺服器持有的狀態。 對於每個帳戶，伺服器都會追蹤帳戶餘額和一個 [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)，用於防止 [重放攻擊](https://en.wikipedia.org/wiki/Replay_attack)。

### 元件 {#components}

此系統需要兩個元件：

- _伺服器_，接收交易、處理交易，並將雜湊值與零知識證明一起發布到鏈上。
- 一個 _智能合約_，儲存雜湊值並驗證零知識證明，以確保狀態轉換是合法的。

### 資料和控制流 {#flows}

這些是各種元件之間溝通，以將資金從一個帳戶傳送到另一個帳戶的方式。

1. 網頁瀏覽器提交一份簽署的交易，要求從簽署者的帳戶傳送到另一個不同的帳戶。

2. 伺服器驗證該交易是否有效：

   - 簽署者在銀行中有一個餘額充足的帳戶。
   - 收款人在銀行中有一個帳戶。

3. 伺服器透過從簽署者的餘額中減去傳送的金額，並將其加到收款人的餘額中，來計算新的狀態。

4. 伺服器計算一個零知識證明，證明狀態變更是有效的。

5. 伺服器向以太坊提交一筆包含以下內容的交易：

   - 新狀態的雜湊值
   - 交易雜湊值 (以便交易發送者可以知道交易已處理)
   - 證明轉換到新狀態是有效的零知識證明

6. 智能合約驗證零知識證明。

7. 如果零知識證明檢查通過，智能合約將執行以下操作：
   - 將當前狀態雜湊值更新為新狀態雜湊值
   - 發出一個包含新狀態雜湊值和交易雜湊值的日誌項目

### 工具 {#tools}

對於用戶端程式碼，我們將使用 [Vite](https://vite.dev/)、[React](https://react.dev/)、[Viem](https://viem.sh/) 和 [Wagmi](https://wagmi.sh/)。 這些是業界標準的工具；如果您不熟悉，可以使用[此教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

伺服器的主要部分是使用 [Node](https://nodejs.org/en) 以 JavaScript 編寫的。 零知識部分是用 [Noir](https://noir-lang.org/) 編寫的。 我們需要 `1.0.0-beta.10` 版本，因此在您 [按照指示安裝 Noir](https://noir-lang.org/docs/getting_started/quick_start) 後，請執行：

```
noirup -v 1.0.0-beta.10
```

我們使用的區塊鏈是 `anvil`，一個本地測試區塊鏈，是 [Foundry](https://getfoundry.sh/introduction/installation) 的一部分。

## 實作 {#implementation}

由於這是一個複雜的系統，我們將分階段實作。

### 第 1 階段 - 手動零知識 {#stage-1}

在第一階段，我們將在瀏覽器中簽署一筆交易，然後手動提供資訊給零知識證明。 零知識程式碼預期會在 `server/noir/Prover.toml` 中取得該資訊 (文件記錄於 [此處](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1))。

實際操作如下：

1. 請確保您已安裝 [Node](https://nodejs.org/en/download) 和 [Noir](https://noir-lang.org/install)。 最好在 UNIX 系統上安裝它們，例如 macOS、Linux 或 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)。

2. 下載第 1 階段的程式碼並啟動網頁伺服器以提供用戶端程式碼。

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   您需要網頁伺服器的原因是，為了防止某些類型的詐騙，許多錢包 (例如 MetaMask) 不接受直接從磁碟提供的檔案。

3. 打開帶有錢包的瀏覽器。

4. 在錢包中，輸入新的密碼。 請注意，這將刪除您現有的密碼，所以_請確保您有備份_。

   密碼是 `test test test test test test test test test test test junk`，這是 anvil 的預設測試密碼。

5. 瀏覽至 [用戶端程式碼](http://localhost:5173/)。

6. 連接到錢包並選擇您的目標帳戶和金額。

7. 按一下 **Sign** 並簽署交易。

8. 在 **Prover.toml** 標題下，您會找到文字。 將 `server/noir/Prover.toml` 替換為該文字。

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

10. 將最後兩個值與您在網頁瀏覽器上看到的雜湊值進行比較，以查看訊息是否已正確雜湊。

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) 顯示 Noir 預期的資訊格式。

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

此訊息採用文字格式，方便使用者理解 (這在簽署時是必要的)，也方便 Noir 程式碼解析。 金額以 finney 報價，一方面可以進行部分傳送，另一方面也易於閱讀。 最後一個數字是 [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)。

該字串長度為 100 個字元。 零知識證明不善於處理可變大小的資料，因此通常需要填充資料。

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

這是指定結構陣列的方式。 對於每個項目，我們指定地址、餘額 (以 milliETH，又稱為 [finney](https://cryptovalleyjournal.com/glossary/finney/))，以及下一個 nonce 值。

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) 會實作用戶端的處理，並產生 `server/noir/Prover.toml` 檔案 (包含零知識參數的檔案)。

以下是較有趣部分的說明。

```tsx
export default attrs =>  {
```

此函式會建立 `Transfer` React 元件，其他檔案可以匯入此元件。

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

這些是帳戶地址，也就是 `test ...` 建立的地址。 test junk` 密碼。 如果您想使用自己的地址，只需修改此定義即可。

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

這些 [Wagmi hooks](https://wagmi.sh/react/api/hooks) 讓我們能夠存取 [viem](https://viem.sh/) 庫和錢包。

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

這是以空格填補的訊息。 每當 [`useState`](https://react.dev/reference/react/useState) 變數變更時，元件就會重新繪製，而 `message` 也會更新。

```tsx
  const sign = async () => {
```

此函式會在使用者按一下 **Sign** 按鈕時呼叫。 訊息會自動更新，但簽章需要使用者在錢包中核准，除非必要，否則我們不想要求核准。

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

要求錢包 [簽署訊息](https://viem.sh/docs/accounts/local/signMessage)。

```tsx
    const hash = hashMessage(message)
```

取得訊息雜湊值。 提供給使用者以供偵錯 (Noir 程式碼) 會很有幫助。

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[取得公鑰](https://viem.sh/docs/utilities/recoverPublicKey)。 這是 [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) 函式所需的。

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

設定狀態變數。 這樣做會在 `sign` 函式結束後重新繪製元件，並向使用者顯示更新後的值。

```tsx
    let proverToml = `"
```

`Prover.toml` 的文字。

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem 提供我們一個 65 位元組的十六進位字串作為公鑰。 第一個位元組是 `0x04`，一個版本標記。 接下來是 32 位元組的公鑰 `x`，然後是 32 位元組的公鑰 `y`。

然而，Noir 預期會以兩個位元組陣列的形式取得此資訊，一個用於 `x`，一個用於 `y`。 在用戶端解析比在零知識證明中解析更容易。

請注意，這通常是零知識中的良好作法。 零知識證明中的程式碼成本很高，因此任何可以在零知識證明之外完成的處理都_應該_在零知識證明之外完成。

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

簽章也以 65 位元組的十六進位字串提供。 然而，最後一個位元組僅用於恢復公鑰。 由於公鑰已經提供給 Noir 程式碼，我們不需要它來驗證簽章，Noir 程式碼也不需要它。

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

這是元件的 HTML (更準確地說，是 [JSX](https://react.dev/learn/writing-markup-with-jsx)) 格式。

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) 是實際的零知識程式碼。

```
use std::hash::pedersen_hash;
```

[Pedersen 雜湊](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) 由 [Noir 標準庫](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) 提供。 零知識證明通常使用此雜湊函數。 與標準雜湊函數相比，在 [算術電路](https://rareskills.io/post/arithmetic-circuit) 內計算要容易得多。

```
use keccak256::keccak256;
use dep::ecrecover;
```

這兩個函式是外部庫，定義在 [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) 中。 它們的名稱恰如其分，一個是計算 [keccak256 雜湊](https://emn178.github.io/online-tools/keccak_256.html) 的函式，另一個是驗證以太坊簽章並恢復簽署者的以太坊地址的函式。

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir 的靈感來自 [Rust](https://www.rust-lang.org/)。 變數預設是常數。 這是我們定義全域組態常數的方式。 具體來說，`ACCOUNT_NUMBER` 是我們儲存的帳戶數量。

名為 `u<number>` 的資料類型是該位元數的無符號整數。 唯一支援的類型是 `u8`、`u16`、`u32`、`u64` 和 `u128`。

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

此變數用於帳戶的 Pedersen 雜湊，如下所述。

```
global MESSAGE_LENGTH : u32 = 100;
```

如上所述，訊息長度是固定的。 在此處指定。

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 簽章](https://eips.ethereum.org/EIPS/eip-191) 需要一個緩衝區，其中包含 26 位元組的前綴，後接 ASCII 格式的訊息長度，最後是訊息本身。

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

我們儲存的帳戶資訊。 [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) 是一個數字，通常最多 253 位元，可直接用於實作零知識證明的 [算術電路](https://rareskills.io/post/arithmetic-circuit)。 在此，我們使用 `Field` 來儲存 160 位元的以太坊地址。

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

我們儲存的傳送交易資訊。

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

函式定義。 參數是 `Account` 資訊。 結果是一個 `Field` 變數陣列，長度為 `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

陣列中的第一個值是帳戶地址。 第二個值包括餘額和 nonce。 `.into()` 呼叫會將數字變更為其所需的資料類型。 `account.nonce` 是一個 `u32` 值，但若要將其新增至 `account.balance « 32` (一個 `u128` 值)，它需要是 `u128`。 這是第一個 `.into()`。 第二個 `.into()` 將 `u128` 結果轉換為 `Field`，使其符合陣列。

```
    flat
}
```

在 Noir 中，函式只能在結尾傳回一個值 (沒有提早傳回)。 若要指定傳回值，您只需在函式的右括號前評估它即可。

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

此函式將帳戶陣列轉換為 `Field` 陣列，可作為 Petersen 雜湊的輸入。

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

這是指定可變變數的方式，也就是_不是_常數。 Noir 中的變數必須始終有值，因此我們將此變數初始化為全零。

```
    for i in 0..ACCOUNT_NUMBER {
```

這是 `for` 迴圈。 請注意，邊界是常數。 Noir 迴圈的邊界必須在編譯時已知。 原因是算術電路不支援流程控制。 在處理 `for` 迴圈時，編譯器會簡單地將其中的程式碼多次放置，每次迭代一次。

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

最後，我們來到雜湊帳戶陣列的函式。

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

此函式會尋找具有特定地址的帳戶。 此函式在標準程式碼中效率極低，因為它會迭代所有帳戶，即使在找到地址後也是如此。

然而，在零知識證明中，沒有流程控制。 如果我們需要檢查條件，我們必須每次都檢查它。

`if` 陳述式也會發生類似的情況。 上述迴圈中的 `if` 陳述式會轉換為這些數學陳述式。

_condition<sub>result</sub> = accounts[i].address == address_ // 如果相等則為 1，否則為 0

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

如果斷言為假，[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) 函式會導致零知識證明崩潰。 在這種情況下，如果我們找不到具有相關地址的帳戶。 若要報告地址，我們使用 [格式字串](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)。

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

此函式會套用一筆傳送交易，並傳回新的帳戶陣列。

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

我們無法在 Noir 的格式字串內存取結構元素，因此我們建立了一個可用的副本。

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} 沒有 {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"交易的 nonce 為 {txnNonce}，但帳戶應使用 {accountNonce}");
```

這是兩個可能使交易無效的條件。

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

建立新的帳戶陣列，然後傳回它。

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

此函式從訊息中讀取地址。

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

地址總是 20 位元組 (又稱為 40 個十六進位數字) 長，並從字元 #7 開始。

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

從訊息中讀取金額和 nonce。

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

在訊息中，地址後的第一個數字是要傳送的 finney (又稱為 千分之一 ETH) 金額。 第二個數字是 nonce。 兩者之間的任何文字都會被忽略。

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

傳回 [元組](https://noir-lang.org/docs/noir/concepts/data_types/tuples) 是 Noir 從函式傳回多個值的方式。

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

此函式將訊息轉換為位元組，然後將金額轉換為 `TransferTxn`。

```rust
// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

我們能夠對帳戶使用 Pedersen 雜湊，因為它們只在零知識證明內雜湊。 然而，在此程式碼中，我們需要檢查訊息的簽章，這是由瀏覽器產生的。 為此，我們需要遵循 [EIP 191](https://eips.ethereum.org/EIPS/eip-191) 中的以太坊簽署格式。 這表示我們需要建立一個組合緩衝區，其中包含標準前綴、ASCII 格式的訊息長度以及訊息本身，並使用以太坊標準 keccak256 進行雜湊。

```rust
    // ASCII prefix
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

為避免應用程式要求使用者簽署可用作交易或其他用途的訊息，EIP 191 指定所有簽署的訊息都以字元 0x19 (非有效 ASCII 字元) 開頭，後接 `Ethereum Signed Message:` 和換行符。

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

    assert(MESSAGE_LENGTH < 1000, "不支援長度超過三位數的訊息");
```

處理長度達 999 的訊息，如果超過則失敗。 我新增了這段程式碼，即使訊息長度是常數，因為這樣更容易變更。 在生產系統上，為了更好的效能，您可能會假設 `MESSAGE_LENGTH` 不會變更。

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

使用以太坊標準的 `keccak256` 函式。

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

此函式會驗證簽章，這需要訊息雜湊值。 然後，它會提供我們簽署它的地址和訊息雜湊值。 訊息雜湊值以兩個 `Field` 值提供，因為它們比位元組陣列在程式的其餘部分更容易使用。

我們需要使用兩個 `Field` 值，因為欄位計算是使用 [模數](https://en.wikipedia.org/wiki/Modulo) 一個大數來完成的，但該數字通常小於 256 位元 (否則在 EVM 中執行這些計算會很困難)。

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

這類似於 [Solidity 的 `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)，但有兩個重要的差異：

- 如果簽章無效，呼叫會失敗一個 `assert`，程式會被中止。
- 雖然公鑰可以從簽章和雜湊中恢復，但這項處理可以在外部完成，因此不值得在零知識證明內進行。 如果有人在此試圖欺騙我們，簽章驗證將會失敗。

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

最後，我們來到 `main` 函式。 我們需要證明我們有一個交易，該交易有效地將帳戶的雜湊從舊值變更為新值。 我們還需要證明它具有此特定的交易雜湊，以便發送它的人知道他們的交易已處理。

```rust
{
    let mut txn = readTransferTxn(message);
```

我們需要 `txn` 是可變的，因為我們不是從訊息中讀取 `from` 地址，而是從簽章中讀取。

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

### 第 2 階段 - 新增伺服器 {#stage-2}

在第二階段，我們新增一個伺服器，接收並實作來自瀏覽器的傳送交易。

實際操作如下：

1. 如果 Vite 正在執行，請停止它。

2. 下載包含伺服器的分支，並確保您擁有所有必要的模組。

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   無需編譯 Noir 程式碼，它與您用於第 1 階段的程式碼相同。

3. 啟動伺服器。

   ```sh
   npm run start
   ```

4. 在個別的命令列視窗中，執行 Vite 以提供瀏覽器程式碼。

   ```sh
   cd client
   npm run dev
   ```

5. 瀏覽至 [http://localhost:5173](http://localhost:5173) 的用戶端程式碼

6. 在發出交易之前，您需要知道 nonce 以及可以傳送的金額。 若要取得此資訊，請按一下 **Update account data** 並簽署訊息。

   我們在此遇到一個兩難的局面。 一方面，我們不希望簽署可重複使用的訊息 ([重放攻擊](https://en.wikipedia.org/wiki/Replay_attack))，這就是我們一開始需要 nonce 的原因。 然而，我們還沒有 nonce。 解決方案是選擇一個只能使用一次且雙方都已有的 nonce，例如目前時間。

   此解決方案的問題是時間可能無法完全同步。 因此，我們改為簽署一個每分鐘變更一次的值。 這表示我們遭受重放攻擊的漏洞窗口最多為一分鐘。 考量到在生產環境中，已簽署的請求將受到 TLS 保護，而且通道的另一端—伺服器—已經可以揭露餘額和 nonce (它必須知道這些才能運作)，這是一個可接受的風險。

7. 瀏覽器取回餘額和 nonce 後，會顯示傳送表單。 選擇目的地地址和金額，然後按一下 **Transfer**。 簽署此請求。

8. 若要查看傳送，請 **更新帳戶資料** 或查看您執行伺服器的視窗。 伺服器每次變更狀態時都會記錄狀態。

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

[此檔案](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) 包含伺服器程序，並與 [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) 的 Noir 程式碼互動。 以下是有趣部分的說明。

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) 庫在 JavaScript 程式碼和 Noir 程式碼之間提供介面。

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

載入算術電路—我們在上一階段建立的已編譯 Noir 程式—並準備執行它。

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

若要提供帳戶資訊，我們只需要簽章。 原因是我們已經知道訊息會是什麼，因此也知道訊息雜湊值。

```js
const processMessage = async (message, signature) => {
```

處理訊息並執行其編碼的交易。

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

現在我們在伺服器上執行 JavaScript，我們可以在那裡而不是在用戶端上擷取公鑰。

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

`noir.execute` 會執行 Noir 程式。 參數相當於 [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) 中提供的參數。 請注意，長值是作為十六進位字串陣列 (`["0x60", "0xA7"]`) 提供的，而不是像 Viem 那樣作為單一十六進位值 (`0x60A7`)。

```js
    } catch (err) {
        console.log(`Noir 錯誤：${err}`)
        throw Error("交易無效，未處理")
    }
```

如果有錯誤，請將其攔截，然後將簡化版本轉送給用戶端。

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

套用交易。 我們已經在 Noir 程式碼中完成了，但在這裡再做一次比從那裡擷取結果更容易。

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

初始 `Accounts` 結構。

### 第 3 階段 - 以太坊智能合約 {#stage-3}

1. 停止伺服器和用戶端程序。

2. 下載包含智能合約的分支，並確保您擁有所有必要的模組。

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. 在個別的命令列視窗中執行 `anvil`。

4. 產生驗證金鑰和 solidity 驗證器，然後將驗證器程式碼複製到 Solidity 專案。

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

   `0x199..67b` 值是 `Accounts` 初始狀態的 Pederson 雜湊。 如果您在 `server/index.mjs` 中修改此初始狀態，您可以執行一個交易，以查看零知識證明報告的初始雜湊。

8. 執行伺服器。

   ```sh
   cd ../server
   npm run start
   ```

9. 在不同的命令列視窗中執行用戶端。

   ```sh
   cd client
   npm run dev
   ```

10. 執行一些交易。

11. 若要驗證狀態已在鏈上變更，請重新啟動伺服器程序。 查看 `ZkBank` 是否不再接受交易，因為交易中的原始雜湊值與鏈上儲存的雜湊值不同。

    這是預期的錯誤類型。

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    正在接聽連接埠 3000
    驗證錯誤：ContractFunctionExecutionError: 合約函數 "processTransaction" 因以下原因而還原：
    舊狀態雜湊值錯誤

    合約呼叫：
        地址：   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        函數：  processTransaction(bytes _proof, bytes32[] _publicInputs)
        參數：                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

此檔案中的變更主要與建立實際證明並在鏈上提交有關。

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

我們需要使用 [Barretenberg 套件](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) 來建立要傳送到鏈上的實際證明。 我們可以使用此套件，方法是執行命令列介面 (`bb`) 或使用 [JavaScript 庫 `bb.js`](https://www.npmjs.com/package/@aztec/bb.js)。 JavaScript 庫比原生執行程式碼慢得多，因此我們在此使用 [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) 來使用命令列。

請注意，如果您決定使用 `bb.js`，您需要使用與您正在使用的 Noir 版本相容的版本。 在撰寫本文時，目前的 Noir 版本 (1.0.0-beta.11) 使用 `bb.js` 版本 0.87。

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

此處的地址是您從乾淨的 `anvil` 開始並遵循上述說明時取得的地址。

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

此私密金鑰是 `anvil` 中預先資助的預設帳戶之一。

```js
const generateProof = async (witness, fileID) => {
```

使用 `bb` 可執行檔產生證明。

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

將見證寫入檔案。

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

實際建立證明。 此步驟也會建立一個包含公開變數的檔案，但我們不需要該檔案。 我們已經從 `noir.execute` 取得這些變數。

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

證明是一個 JSON 陣列，其中包含 `Field` 值，每個值都以十六進位值表示。 然而，我們需要將它作為單一的 `bytes` 值在交易中傳送，Viem 會以一個大的十六進位字串表示。 在此，我們透過串接所有值、移除所有 `0x`，然後在結尾加上一個來變更格式。

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

清理並傳回證明。

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

公開欄位需要是 32 位元組值的陣列。 然而，由於我們需要將交易雜湊值分割到兩個 `Field` 值之間，因此它顯示為 16 位元組值。 在此，我們加上零，讓 Viem 了解它實際上是 32 位元組。

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

每個地址只會使用每個 nonce 一次，因此我們可以使用 `fromAddress` 和 `nonce` 的組合作為見證檔案和輸出目錄的唯一識別碼。

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`驗證錯誤：${err}`)
        throw Error("無法在鏈上驗證交易")
    }
    .
    .
    .
}
```

將交易傳送到鏈上。

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

鏈上程式碼需要追蹤兩個變數：驗證器 (由 `nargo` 建立的獨立合約) 和目前的狀態雜湊。

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

每當狀態變更時，我們就會發出 `TransactionProcessed` 事件。

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

此函式會處理交易。 它會以驗證器所需的格式取得證明 (作為 `bytes`) 和公開輸入 (作為 `bytes32` 陣列)，以最小化鏈上處理並因此降低 gas 成本。

```solidity
        require(_publicInputs[0] == currentStateHash,
            "舊狀態雜湊值錯誤");
```

零知識證明需要證明交易從我們目前的雜湊變更為新的雜湊。

```solidity
        myVerifier.verify(_proof, _publicFields);
```

呼叫驗證器合約以驗證零知識證明。 如果零知識證明錯誤，此步驟會還原交易。

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

如果一切都檢查無誤，請將狀態雜湊更新為新值，並發出 `TransactionProcessed` 事件。

## 中心化元件的濫用 {#abuses}

資訊安全包含三個屬性：

- _機密性_，使用者無法讀取他們未經授權讀取的資訊。
- _完整性_，資訊不能被授權使用者以外的人以未經授權的方式變更。
- _可用性_，授權使用者可以使用系統。

在此系統上，完整性是透過零知識證明提供的。 可用性更難保證，而機密性則不可能，因為銀行必須知道每個帳戶的餘額和所有交易。 無法阻止擁有資訊的實體分享該資訊。

也許可以使用 [隱身地址](https://vitalik.eth.limo/general/2023/01/20/stealth.html) 建立一個真正機密的銀行，但這超出了本文的範圍。

### 不實資訊 {#false-info}

伺服器違反完整性的一種方式是在 [要求資料](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) 時提供不實資訊。

為了解決這個問題，我們可以編寫第二個 Noir 程式，該程式接收帳戶作為私密輸入，並接收要求資訊的地址作為公開輸入。 輸出是該地址的餘額和 nonce，以及帳戶的雜湊。

當然，此證明無法在鏈上驗證，因為我們不想在鏈上張貼 nonce 和餘額。 然而，它可以由在瀏覽器中執行的用戶端程式碼來驗證。

### 強制交易 {#forced-txns}

確保 L2 可用性和防止審查的通常機制是 [強制交易](https://docs.optimism.io/stack/transactions/forced-transaction)。 但強制交易與零知識證明不相容。 伺服器是唯一可以驗證交易的實體。

我們可以修改 `smart-contracts/src/ZkBank.sol` 以接受強制交易，並防止伺服器在處理它們之前變更狀態。 然而，這會讓我們面臨簡單的阻斷服務攻擊。 如果強制交易無效且因此無法處理，該怎麼辦？

解決方案是擁有一個零知識證明，證明強制交易是無效的。 這給伺服器三個選項：

- 處理強制交易，提供一個零知識證明，證明它已處理，並提供新的狀態雜湊。
- 拒絕強制交易，並向合約提供一個零知識證明，證明該交易無效 (未知地址、錯誤的 nonce 或餘額不足)。
- 忽略強制交易。 無法強制伺服器實際處理交易，但這表示整個系統都不可用。

#### 可用性保證金 {#avail-bonds}

在實際的實作中，可能會有某種獲利動機來維持伺服器運作。 我們可以透過讓伺服器發布可用性保證金來加強此誘因，如果強制交易未在特定時間內處理，任何人都可以銷毀該保證金。

### 不良的 Noir 程式碼 {#bad-noir-code}

通常，為了讓大家信任智能合約，我們會將原始程式碼上傳到 [區塊瀏覽器](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)。 然而，在零知識證明的情況下，這是不夠的。

`Verifier.sol` 包含驗證金鑰，這是 Noir 程式的一個函數。 然而，該金鑰並未告訴我們 Noir 程式是什麼。 為了真正擁有一個可信賴的解決方案，您需要上傳 Noir 程式 (以及建立它的版本)。 否則，零知識證明可能反映出不同的程式，一個有後門的程式。

在區塊瀏覽器允許我們上傳和驗證 Noir 程式之前，您應該自己動手 (最好上傳到 [IPFS](/developers/tutorials/ipfs-decentralized-ui/))。 然後，有經驗的使用者將能夠下載原始程式碼，自己編譯，建立 `Verifier.sol`，並驗證它是否與鏈上的版本相同。

## 結論 {#conclusion}

Plasma 類型的應用程式需要一個中心化元件作為資訊儲存。 這會帶來潛在的漏洞，但作為回報，它讓我們能夠以區塊鏈本身無法提供的方式保護隱私。 透過零知識證明，我們可以確保完整性，並可能使執行中心化元件的人在維持可用性方面具有經濟優勢。

[在此查看我的更多作品](https://cryptodocguy.pro/)。

## 致謝 {#acknowledgements}

- Josh Crites 閱讀了本文的草稿，並幫助我解決了一個棘手的 Noir 問題。

任何剩餘的錯誤都由我負責。
