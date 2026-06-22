---
title: "贊助燃料費用：如何為您的使用者支付交易成本"
description: "建立私鑰和地址很容易；這只是執行正確軟體的問題。但在世界上許多地方，獲取以太幣來發送交易要困難得多。在本教學中，您將學習如何支付在智能合約中執行使用者簽署的鏈下結構化資料的鏈上燃料成本。您讓使用者簽署包含交易資訊的結構，然後您的鏈下程式碼將其作為交易提交到區塊鏈。"
author: "奧里·波梅蘭茨"
tags: ["無燃料", "Solidity", "EIP-712", "元交易"]
skill: intermediate
breadcrumb: "燃料贊助"
lang: zh-tw
published: 2026-02-27
---

## 簡介 {#introduction}

如果我們希望以太坊能服務[十億以上的人口](https://blog.ethereum.org/category/next-billion)，我們需要消除阻力並使其盡可能容易使用。這種阻力的來源之一是需要 ETH 來支付燃料費用。

如果您有一個從使用者身上獲利的去中心化應用程式 (dapp)，讓使用者透過您的伺服器提交交易並由您自己支付交易費用可能是合理的。因為使用者仍然在他們的錢包中簽署 [EIP-712 授權訊息](https://eips.ethereum.org/EIPS/eip-712)，所以他們保留了以太坊的完整性保證。可用性取決於中繼交易的伺服器，因此較為受限。然而，您可以進行設定，讓使用者也能直接存取智能合約（如果他們獲得了 ETH），並讓其他人如果想贊助交易，可以架設自己的伺服器。

本教學中的技術僅在您控制智能合約時才有效。還有其他技術，包括[帳戶抽象化](https://eips.ethereum.org/EIPS/eip-4337)，可以讓您贊助其他智能合約的交易，我希望在未來的教學中涵蓋這些內容。

注意：這_不是_生產等級的程式碼。它容易受到重大攻擊且缺乏主要功能。請在[本指南的漏洞部分](#vulnerabilities)了解更多資訊。

### 先決條件 {#prerequisites}

要理解本教學，您需要已經熟悉：

- Solidity
- JavaScript
- React 和 WAGMI。如果您不熟悉這些使用者介面工具，[我們有相關的教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

## 範例應用程式 {#sample-app}

這裡的範例應用程式是 Hardhat 的 `Greeter` 合約的變體。您可以在 [GitHub 上](https://github.com/qbzzt/260301-gasless)查看它。該智能合約已經部署在 [Sepolia](https://sepolia.dev/) 上，地址為 [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA)。

要查看其實際運作，請遵循以下步驟。

1. 複製儲存庫並安裝必要的軟體。

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. 編輯 `.env`，將 `PRIVATE_KEY` 設定為在 Sepolia 上擁有 ETH 的錢包。如果您需要 Sepolia ETH，請[使用水龍頭](/developers/docs/networks/#sepolia)。理想情況下，這個私鑰應該與您瀏覽器錢包中的私鑰不同。

3. 啟動伺服器。

   ```sh
   npm run dev
   ```

4. 瀏覽位於 URL [`http://localhost:5173`](http://localhost:5173) 的應用程式。

5. 點擊 **Connect with Injected** 以連接到錢包。在錢包中授權，並在必要時授權切換到 Sepolia。

6. 寫下新的問候語，然後點擊 **Update greeting via sponsor**。

7. 簽署訊息。

8. 等待約 12 秒（Sepolia 上的區塊時間）。在等待時，您可以查看伺服器主控台中的 URL 以查看交易。

9. 看到問候語已更改，且最後更新者的地址值現在是您瀏覽器錢包的地址。

要了解其運作原理，我們需要看看訊息是如何在使用者介面中建立的、伺服器如何中繼它，以及智能合約如何處理它。

### 使用者介面 {#ui-changes}

使用者介面基於 [WAGMI](https://wagmi.sh/)；您可以[在本教學中](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)閱讀相關資訊。

以下是我們簽署訊息的方式：

```js
const signGreeting = useCallback(
```

React hook [`useCallback`](https://react.dev/reference/react/useCallback) 讓我們能在重新繪製元件時重複使用相同的函式，從而提高效能。

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

如果沒有帳戶，則引發錯誤。這應該永遠不會發生，因為在這種情況下，啟動呼叫 `signGreeting` 程序的 UI 按鈕會被停用。然而，未來的程式設計師可能會移除該保護措施，因此在這裡檢查此條件也是個好主意。

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[網域分隔符號 (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) 的參數。這個值是常數，所以在最佳化程度更高的實作中，我們可能會只計算一次，而不是每次呼叫函式時都重新計算。

- `name` 是使用者可讀的名稱，例如我們為其產生簽章的 dapp 名稱。
- `version` 是版本。不同的版本互不相容。
- `chainId` 是我們正在使用的鏈，由 [WAGMI 提供](https://wagmi.sh/react/api/hooks/useChainId)。
- `verifyingContract` 是將驗證此簽章的合約地址。我們不希望同一個簽章套用到多個合約，以防有多個 `Greeter` 合約而我們希望它們有不同的問候語。

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

我們簽署的資料類型。在這裡，我們只有一個參數 `greeting`，但現實生活中的系統通常會有更多參數。

```js
        const message = { greeting }
```

我們實際想要簽署並發送的訊息。`greeting` 既是欄位名稱，也是填入該欄位的變數名稱。

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

實際取得簽章。這個函式是非同步的，因為使用者需要很長的時間（從電腦的角度來看）來簽署資料。

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

該函式回傳單一的十六進位值。在這裡我們將其劃分為多個欄位。

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

如果這些變數中的任何一個發生變化，則建立該函式的新實例。使用者可以在錢包中更改 `account` 和 `chainId` 參數。`contractAddr` 是鏈 ID 的函式。`signTypedDataAsync` 應該不會改變，但我們是從[一個 hook](https://wagmi.sh/react/api/hooks/useSignTypedData) 匯入它，所以我們無法確定，最好將其新增到這裡。

現在新的問候語已經簽署，我們需要將其發送到伺服器。

```js
  const sponsoredGreeting = async () => {
    try {
```

這個函式接收一個簽章並將其發送到伺服器。

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

發送到我們來源伺服器中的 `/server/sponsor` 路徑。

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

使用 `POST` 以 JSON 編碼發送資訊。

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

輸出回應。在生產系統上，我們也會向使用者顯示回應。

### 伺服器 {#server}

我喜歡使用 [Vite](https://vite.dev/) 作為我的前端。它會自動提供 React 函式庫，並在前端程式碼更改時更新瀏覽器。然而，Vite 不包含後端工具。

解決方案在 [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js) 中。

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // 讓 Vite 處理其餘一切
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

首先，我們為自己處理的請求（`POST` 到 `/server/sponsor`）註冊一個處理常式。然後我們建立並使用 Vite 伺服器來處理所有其他 URL。

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

這只是一個標準的 [viem](https://viem.sh/) 區塊鏈呼叫。

### 智能合約 {#smart-contract}

最後，[`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) 需要驗證簽章。

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

建構函式建立[網域分隔符號](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)，類似於上面的使用者介面程式碼。區塊鏈執行的成本要高得多，所以我們只計算一次。

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

這是被簽署的結構。在這裡我們只有一個欄位。

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

這是[結構識別碼](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct)。它每次都會在使用者介面中計算。

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

這個函式接收一個已簽署的請求並更新問候語。

```solidity
        // 計算 EIP-712 摘要
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

依照 [EIP 712](https://eips.ethereum.org/EIPS/eip-712) 建立摘要 (digest)。

```solidity
        // 還原簽署者
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

使用 [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) 來取得簽署者地址。請注意，錯誤的簽章仍然可能產生一個有效的地址，只不過是一個隨機的地址。

```solidity
        // 套用問候語，就像是由簽署者呼叫的一樣
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

更新問候語。

## 漏洞 {#vulnerabilities}

這_不是_生產等級的程式碼。它容易受到重大攻擊且缺乏主要功能。以下列出一些漏洞，以及如何解決它們。

要查看其中一些攻擊，請點擊_攻擊 (Attacks)_ 標題下的按鈕，看看會發生什麼事。對於 **Invalid signature (無效簽章)** 按鈕，請檢查伺服器主控台以查看交易回應。

### 伺服器上的阻斷服務攻擊 {#dos-on-server}

最簡單的攻擊是對伺服器進行[阻斷服務 (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) 攻擊。伺服器接收來自網際網路上任何地方的請求，並根據這些請求發送交易。完全沒有任何機制可以阻止攻擊者發出一堆簽章（無論有效或無效）。每一個都會引發一筆交易。最終伺服器將耗盡 ETH 來支付燃料費用。

解決這個問題的一種方法是將速率限制為每個區塊一筆交易。如果目的是向[外部擁有帳戶](/developers/docs/accounts/#key-differences)顯示問候語，那麼在區塊中間的問候語是什麼其實並不重要。

另一種解決方案是追蹤地址，並僅允許來自有效客戶的簽章。

### 錯誤的問候語簽章 {#wrong-greeting-sigs}

當您點擊 **Signature for wrong greeting** 時，您為特定的地址 (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) 和問候語 (`Hello`) 提交了一個有效的簽章。但它卻以不同的問候語提交。這會混淆 `ecrecover`，導致它更改了問候語，但卻使用了錯誤的地址。

要解決這個問題，請將地址新增到[已簽署的結構](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124)中。這樣一來，`ecrecover` 產生的隨機地址就不會與簽章中的地址相符，智能合約就會拒絕該訊息。

### 重放攻擊 {#replay-attack}

當您點擊 **Replay attack** 時，您提交了相同的「我是 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e，我希望問候語是 `Hello`」簽章，但帶有正確的問候語。結果，智能合約會認為該地址（這不是您的地址）將問候語改回了 `Hello`。執行此操作的資訊在[交易資訊](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1)中是公開可用的。

如果這是一個問題，一種解決方案是新增一個[隨機數 (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce)。在地址和數字之間建立一個[對映 (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types)，並在簽章中新增一個隨機數欄位。如果隨機數欄位與該地址的對映相符，則接受該簽章並將對映遞增以供下次使用。如果不相符，則拒絕該交易。

另一種解決方案是在已簽署的資料中新增時間戳記，並僅在該時間戳記之後的幾秒鐘內接受簽章為有效。這更簡單也更便宜，但我們面臨在時間視窗內發生重放攻擊的風險，以及如果超過時間視窗，合法交易將會失敗的風險。

## 其他缺失的功能 {#other-missing-features}

在生產環境中，我們還會新增其他功能。

### 來自其他伺服器的存取 {#other-servers}

目前，我們允許任何地址提交 `sponsorSetGreeting`。為了去中心化的利益，這可能正是我們想要的。或者，我們可能希望確保贊助的交易透過_我們的_伺服器進行，在這種情況下，我們會在智能合約中檢查 `msg.sender`。

無論哪種方式，這都應該是一個有意識的設計決策，而不僅僅是沒有考慮到這個問題的結果。

### 錯誤處理 {#error-handling}

使用者提交了問候語。也許它會在下一個區塊更新。也許不會。錯誤是不可見的。在生產系統上，使用者應該能夠區分這些情況：

- 新的問候語尚未提交
- 新的問候語已提交，正在處理中
- 新的問候語已被拒絕

## 結論
到目前為止，您應該能夠為您的去中心化應用程式 (dapp) 使用者建立免燃料體驗，代價是某種程度的中心化。

然而，這僅適用於支援 ERC-712 的智能合約。舉例來說，要轉帳 ERC-20 代幣，必須由擁有者簽署交易，而不僅僅是簽署訊息。最簡單的解決方案是讓資產不由 EOA 地址擁有，而是由一個獨立的合約擁有（這是[帳戶抽象化](/roadmap/account-abstraction/)的一種簡單形式）。您可以在[後續教學](/developers/tutorials/gasless-token)中閱讀更多相關資訊。

[點擊此處查看我的更多作品](https://cryptodocguy.pro/)。
