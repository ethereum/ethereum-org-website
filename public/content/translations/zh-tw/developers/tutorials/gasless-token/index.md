---
title: "讓你的免燃料使用者持有代幣並呼叫合約"
description: "透過帳戶抽象化，我們可以建立智能合約錢包，接受由特定外部擁有帳戶 (EOA) 發送或由該 EOA 簽署的交易。這些智能合約隨後可以擁有代幣，並受該 EOA 控制。"
author: "奧里·波梅蘭茨"
tags:
  - "免燃料"
  - "ERC-20"
  - "帳戶抽象化"
skill: intermediate
breadcrumb: "免燃料代幣"
lang: zh-tw
published: 2026-04-01
---

## 簡介 {#introduction}

[上一篇文章](/developers/tutorials/gasless/)討論了如何使用 EIP-712 簽章對你自己的應用程式進行免燃料存取，但這僅限於你自己的智能合約。透過[帳戶抽象化](/roadmap/account-abstraction/)，我們可以建立智能合約錢包，接受兩種類型的交易並將其轉發到請求的目的地：

- 由特定外部擁有帳戶 (EOA) 發送的交易（這要求該 EOA 擁有 ETH）
- 從任何地方發送，但由同一個 EOA 簽署的交易。

透過這種方式，我們可以為帳戶提供一種免燃料的方式來持有資產（代幣等），並執行擁有燃料的 EOA 所能執行的所有功能。

### 為什麼我們不能直接轉發請求？ {#why-no-tx-origin}

在 ERC-20 及相關標準中，帳戶擁有者是 [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)，即呼叫代幣合約的地址，這不一定是交易的發起者 [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)。這是基於[安全考量](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin)的要求。這意味著如果我們轉發代幣轉帳請求，它們將嘗試從轉發者的地址轉帳代幣，而不是從使用者控制的地址轉帳。

有一個解決方案可以讓你透過 [EIP-7702](https://eip7702.io/) 使用 EOA 地址，但這需要簽署一個具有潛在危險的委託，因此你只能將其用於委託給錢包提供商核准的智能合約。在本教學中，我傾向於使用更簡單的方法，即建立一個智能合約作為使用者的代理。

## 實際操作 {#in-action}

1. 確保你已安裝 [Node](https://nodejs.org/en/download) 和 [Foundry](https://www.getfoundry.sh/introduction/installation)。

2. 複製應用程式並安裝必要的軟體。

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. 編輯 `.env`，將 `SEPOLIA_PRIVATE_KEY` 設定為在 Sepolia 上擁有 ETH 的錢包。如果你需要 Sepolia ETH，請[使用水龍頭](/developers/docs/networks/#sepolia)來獲取。理想情況下，這個私鑰應該與你瀏覽器錢包中的私鑰不同。

4. 啟動伺服器。

   ```sh
   npm run dev
   ```

5. 瀏覽位於 URL [`http://localhost:5173`](http://localhost:5173) 的應用程式。

6. 點擊 **Connect with Injected** 以連接到錢包。在錢包中授權，並在必要時授權切換到 Sepolia 網路。

7. 向下捲動並點擊 **Deploy UserProxy (slow process)**。

8. 當使用者代理部署完成時，你可以在 **UserProxy access** 旁邊看到一個地址。如果你等待了 24 秒（2 個區塊）但仍未出現，可能是偵測變更時發生了問題。

   如果發生這種情況，請前往 [Sepolia 區塊鏈瀏覽器](https://eth-sepolia.blockscout.com/)，並輸入你在伺服器輸出 `npm run dev` 中看到的部署交易雜湊值。點擊已建立的合約以檢視其地址，然後將其複製。將地址貼上到 _Or enter existing proxy address_ 欄位中，然後點擊 **Set proxy address**。

9. 點擊 **Request more tokens for proxy** 以提交對 ERC-20 合約 [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) 函式的呼叫來獲取代幣。在錢包中**確認**簽章。當然，代幣會到達代理的地址，而不是使用者的地址。

10. 向下捲動並點擊 _Last transaction:_ 下方的連結。這將開啟瀏覽器以向你顯示 `faucet` 交易。

11. 在 _amount to transfer_ 中，輸入一個介於一到一千之間的數字。點擊 **Transfer** 將代幣轉帳到你自己的地址。在點擊**確認**請求之前，請注意正在簽署的資料是不透明的。使用者很難理解他們正在簽署什麼。請記住，我們將在[下方](#vulnerabilities)討論這個問題。

12. 交易確認後，等待查看 _your balance_ 和 _proxy balance_ 的變化。請注意，這也需要一些時間，因為 Sepolia 的區塊時間為 12 秒。

## 運作原理 {#how-work}

為了實現免燃料體驗，我們需要一個供使用者操作的使用者介面、一個將訊息從使用者介面路由到鏈上的伺服器，以及一個接收並驗證這些訊息的智能合約。

### 錢包智能合約 {#wallet-smart-contract}

這是[智能合約](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol)。它的目的是執行真正擁有者請求的任何操作，無論使用何種管道進行請求，並忽略其他所有內容。為此，其函式會接收一個要呼叫的目標地址以及用於呼叫該地址的資料。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

擁有者的身分和一個[隨機數](https://en.wikipedia.org/wiki/Cryptographic_nonce)，用於防止訊息被重複發送。因為隨機數是一個 `public` 變數，Solidity 編譯器也會建立一個 view 函式 [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0)，允許鏈下程式碼讀取其值。

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

驗證 [EIP-712 簽章](https://eips.ethereum.org/EIPS/eip-712)所需的資訊。

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

一個 `UserProxy` 綁定到單一擁有者地址。這是必要的，因為它可以擁有資產（ERC-20 代幣、NFT 等）。我們不希望將屬於不同擁有者的資產混合在一起。

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[網域分隔符](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)。它無法在編譯時計算，因為它取決於鏈 ID 和合約地址。這使得 UserProxy 不可能被為另一個代理準備的訊息所欺騙。

```solidity
    event CallResult(address target, bytes returnData);
```

記錄呼叫的結果。

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

這個函式可以直接由擁有者呼叫。如果沒有可用的轉發器，擁有者仍然可以直接在區塊鏈上存取資產（如果使用者擁有 ETH）。

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

如果我們被擁有者_直接_呼叫，則使用提供的呼叫資料呼叫目標。

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

這是 `UserProxy` 的主要函式。它接收 `target` 和 `data`，以及一個簽章。

```solidity
    external returns (bytes memory) {
        // 計算 EIP-712 摘要
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

摘要也包含隨機數，但我們不需要從交易中接收它；我們已經知道正確的值。具有錯誤隨機數的簽章將被拒絕。

```solidity

    // 還原簽署者
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

如果簽章無效，`ecrecover` 通常會回傳一個不同的地址，並且不會被接受。

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

呼叫使用者告訴我們要呼叫的合約，如果不成功則回滾。

```solidity
    emit CallResult(target, returnData);

    nonce++; // 遞增隨機數以防止重放

    return returnData;
}
```

如果成功，則發出日誌事件並遞增隨機數。

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

這些是幾乎相同的變體，讓你也將 ETH 從合約中轉帳出去。

### 轉發器 {#relayer}

轉發器是一個[伺服器元件](/developers/tutorials/server-components/)。它是用 JavaScript 編寫的；你可以在[這裡](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js)查看原始碼。

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

我們需要的函式庫。這是一個 [Express](https://expressjs.com/) 伺服器，它使用 [Vite](https://vite.dev/) 來提供使用者介面程式碼。我們使用 [Viem](https://viem.sh/) 與區塊鏈通訊，並使用 [dotenv](https://www.dotenv.org/) 讀取發送交易之地址的私鑰。

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

這是讀取已編譯之 `UserProxy` 的簡單方法。我們需要 ABI 才能呼叫 `UserProxy`，並需要編譯後的程式碼才能為使用者部署它。

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

讀取 `.env` 檔案，提取地址，並將其列印到主控台。

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

與區塊鏈通訊的 Viem 客戶端。

```js
const start = async () => {
  const app = express()
```

執行 Express 伺服器。

```js
  app.use(express.json())
```

告訴 Express 讀取請求主體，如果它是 JSON 則對其進行解析。

```js
  app.post("/server/deploy", async (req, res) => {
```

這是處理部署代理請求的程式碼。請注意，我們在這裡容易受到[阻斷服務](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻擊，因為攻擊者可以向我們發送大量部署代理的請求，直到我們的 ETH 耗盡。在生產系統上，我們可能會要求部署代理的請求必須經過簽署，並且簽署者必須是現有客戶。

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

從請求中獲取擁有者的地址。

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[部署合約](https://viem.sh/docs/contract/deployContract#deploycontract)並[等待其部署完成](https://viem.sh/docs/actions/public/waitForTransactionReceipt)。

```js
      res.json({ contractAddress: receipt.contractAddress })
```

如果一切正常，則將代理地址回傳給使用者介面。

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

如果出現問題，則回報它。

```js
  app.post("/server/message", async (req, res) => {
```

這是處理 `UserProxy` 合約之使用者訊息的程式碼。這是另一個容易受到阻斷服務攻擊的地方。

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

獲取請求資料並使用它來呼叫代理上的 `signedAccess`。

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

回報交易雜湊值。這讓 UI 可以顯示一個 URL，供使用者檢查交易。

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

同樣地，如果出現問題，則回報它。

```js
  // 讓 Vite 處理其他所有事情
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

對於其他所有內容，請使用 Vite，它會為我們處理提供使用者介面的工作。

### 使用者介面 {#user-interface}

[這是使用者介面程式碼](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src)。除了 [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) 之外，大部分程式碼與[這篇文章](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through)中記錄的程式碼幾乎相同。

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) 的部分內容類似於[這篇文章](/developers/tutorials/gasless/#ui-changes)中的 [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)。以下是新的部分。

```js
import {
   encodeFunctionData
       } from 'viem'
```

[這個函式](https://viem.sh/docs/contract/encodeFunctionData)會建立 EVM 函式呼叫的呼叫資料。這是必要的，以便使用者可以簽署呼叫資料。

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`，如上所述。

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[這個合約](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract)主要是一個普通的 ERC-20 合約，但增加了一個重要的函式 `faucet()`。這個函式會將代幣授予任何出於測試目的而請求它們的人。

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken` 的地址。

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

這個元件會輸出一個地址，並附帶區塊鏈瀏覽器上該合約的連結。

```js
const Token = () => {
    ...
```

這是完成大部分工作的主要元件。

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

使用者地址的代幣餘額。

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

使用者擁有的代理地址。

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

代理的代幣餘額。

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

當使用者手動設定代理地址時，會使用此欄位。能夠手動設定代理地址讓使用者可以使用現有的代理，而不是每次都部署一個新的代理（並失去舊代理擁有的所有代幣）。

```js
  const [ txHash, setTxHash ] = useState(null)
```

最後一筆交易的雜湊值，用於顯示瀏覽器的連結，以便使用者可以檢查該交易。

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

這些欄位都用於向 ERC-20 合約發送代幣轉帳命令。這可能是 `FaucetToken`，但並非必須如此。[`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) 函式是 ERC-20 標準的一部分。

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

讀取我們感興趣的兩個代幣餘額：使用者擁有多少，以及代理擁有多少。

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

為了防止重放攻擊（例如，賣家重放一筆給他們錢的交易），我們使用一個[隨機數](https://en.wikipedia.org/wiki/Cryptographic_nonce)。我們需要知道目前的值，以便將其加入我們簽署的資料中。

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

當從區塊鏈讀取的資訊發生變化時，使用 [`useEffect`](https://react.dev/reference/react/useEffect) 來更新顯示給使用者的餘額。

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

預設是將 `FaucetToken` 代幣轉帳到使用者自己的帳戶。在這裡，當我們從 Viem 接收到這些值時，我們會設定它們。

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

當文字欄位變更時的事件處理常式。

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

要求伺服器為此使用者部署一個代理。

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

在將訊息發送到伺服器以發送到鏈上的 `UserProxy` 之前，先簽署該訊息。這在[這裡](/developers/tutorials/gasless/#ui-changes)有解釋。我們需要簽署一個包含目標地址（我們正在呼叫的代幣地址）和要發送的呼叫資料的訊息。

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

將已簽署的訊息發送到 `UserProxy`，它將驗證簽章，然後將其發送到 `target`。

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // 兩個地址
          data,           // 發送至目標的呼叫資料
          v, r, s         // 簽章
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

向伺服器發送請求，當你收到回應時，獲取交易雜湊值。

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

模擬呼叫 `faucet` 函式。只有在成功時，我們才會啟用該水龍頭按鈕。

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

要透過伺服器和 `UserProxy` 呼叫函式，我們遵循三個步驟：

1. 使用 [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) 建立要簽署和發送的呼叫資料。

2. 簽署訊息（目標地址、呼叫資料和隨機數）。

3. 將訊息發送到伺服器。

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

元件的這部分讓你直接從瀏覽器使用 `FaucetToken`。其主要目的是為了方便除錯。

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

讓使用者部署一個新的 `UserProxy`。

```js
         <br /><br />
         <input type="text" placeholder="或輸入現有的代理地址" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

只有當使用者輸入合法的地址時，才讓他們點擊 **Set proxy address**。請注意，這並不能確保該地址確實是一個 `UserProxy` 合約。可以加入這樣的檢查，但這會慢得多（使用者體驗較差），而且不會提高安全性（攻擊者總是可以使用他們自己的程式碼來建立使用者介面）。

```js
         <br /><br />
         { proxyAddr && (
```

<em>只有</em>在有合法的代理地址時，才顯示其餘部分。

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

使用者不需要知道隨機數；這只是為了除錯目的。

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

我們無法模擬透過代理呼叫 `faucet()`。然而，我們至少可以確保我們有一個代理，並且該代理向我們回報了一個隨機數。

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

讓使用者發出 ERC-20 轉帳交易。

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

如果有最後一筆交易雜湊值，則顯示一個連結，以便使用者可以在區塊鏈瀏覽器中檢視它。

```js
 
</div>
    </>
  )
}

export {Token}
```

這只是 React 樣板程式碼。

## 漏洞 {#vulnerabilities}

我們的伺服器容易受到阻斷服務攻擊。這種攻擊在[本系列的前一篇文章中](/developers/tutorials/gasless/#dos-on-server)有解釋。

此外，我們正在鼓勵不良的使用者行為。這是我們要求使用者簽署的內容：

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

<em>我們</em>知道這是一筆合法的 ERC-20 轉帳，包含使用者想要轉帳的代幣、金額和目標地址。但大多數使用者不知道如何解讀呼叫資料，也不知道他們正在簽署什麼。這是一個糟糕的設計，原因有兩個：

- 有些使用者不會使用我們的服務，因為他們不信任我們要求他們簽署的資料。
- 其他使用者_會_信任我們，並學到他們應該直接簽署呼叫資料，而不需要理解它是什麼。這意味著如果攻擊者亞當成功將他們重新導向到他的網站，他可以讓他們簽署一筆交易，將使用者擁有的所有 USDC（或 DAI，或任何其他 ERC-20）授予他。

解決方案是在 `UserProxy` 中為常用的函式（例如轉帳）提供獨立的函式。這樣使用者就可以簽署他們理解的內容。

![Screen capture with transfer details](./fig-2-transparent-signature.png)

<strong>注意：</strong>雖然使用者可以使用任何他們想要的錢包，但強烈建議使用 EIP-712 的應用程式鼓勵他們使用能[顯示完整簽章資料](https://rabby.io/)的錢包。有些錢包會截斷地址，這是不安全的。攻擊者可以建立一個開頭和結尾字元相同，但中間不同的地址。

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## 結論 {#conclusion}

除了上述漏洞之外，本教學中的解決方案還有幾個缺點，以太坊可以幫助我們解決這些問題。

- _抗審查性_。目前，使用者可以使用你的伺服器、其他人建立的競爭伺服器，或者直接連接到以太坊（這會產生燃料費用）。使用 [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) 讓使用者可以將他們的交易提供給大型伺服器池，從而降低他們的交易被審查的可能性。
- _EOA 擁有的資產_。如上所述，[EIP-7702](https://eip7702.io/) 可用於管理 EOA 地址已擁有的資產。這有其困難之處，但有時是必要的。

我希望在不久的將來發布有關加入這些功能的教學。

[在這裡查看我的更多作品](https://cryptodocguy.pro/)。
