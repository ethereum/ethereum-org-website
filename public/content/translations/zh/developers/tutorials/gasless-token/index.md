---
title: "让你的免 Gas 用户持有代币并调用合约"
description: "使用账户抽象，我们可以创建智能合约钱包，接受由特定外部拥有账户 (EOA) 发送或签名的交易。然后，这些智能合约可以拥有受该 EOA 控制的代币。"
author: "奥里·波梅兰茨"
tags:
  - "免 Gas"
  - "ERC-20"
  - "账户抽象"
skill: intermediate
breadcrumb: "免 Gas 代币"
lang: zh
published: 2026-04-01
---

## 简介 {#introduction}

[上一篇文章](/developers/tutorials/gasless/)讨论了使用 EIP-712 签名对你自己的应用程序进行免 Gas 访问，但这仅限于你自己的智能合约。使用[账户抽象](/roadmap/account-abstraction/)，我们可以创建智能合约钱包，接受两种类型的交易并将其转发到请求的目的地：

- 由特定外部拥有账户 (EOA) 发送的交易（这要求该 EOA 拥有 ETH）
- 从任何地方发送，但由同一个 EOA 签名的交易。

通过这种方式，我们可以为账户提供一种免 Gas 的方式来持有资产（代币等），并执行拥有 Gas 的 EOA 所能执行的所有功能。

### 为什么我们不能直接转发请求？ {#why-no-tx-origin}

在 ERC-20 及相关标准中，账户所有者是 [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)，即调用代币合约的地址，这不一定是交易的发起者 [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)。这是出于[安全原因](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin)的要求。这意味着如果我们转发代币转账请求，它们将尝试从转发者的地址而不是用户控制的地址转账代币。

有一种解决方案允许你通过 [EIP-7702](https://eip7702.io/) 使用 EOA 地址，但这需要签名一个具有潜在危险的委托，因此你只能将其用于委托给钱包提供商授权的智能合约。对于本教程，我更倾向于使用一种简单得多的方法，即创建一个智能合约作为用户的代理。

## 实际操作演示 {#in-action}

1. 确保你已安装 [Node](https://nodejs.org/en/download) 和 [Foundry](https://www.getfoundry.sh/introduction/installation)。

2. 克隆应用程序并安装必要的软件。

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. 编辑 `.env`，将 `SEPOLIA_PRIVATE_KEY` 设置为在 Sepolia 上拥有 ETH 的钱包。如果你需要 Sepolia ETH，请[使用水龙头](/developers/docs/networks/#sepolia)获取。理想情况下，此私钥应与你浏览器钱包中的私钥不同。

4. 启动服务器。

   ```sh
   npm run dev
   ```

5. 浏览 URL 为 [`http://localhost:5173`](http://localhost:5173) 的应用程序。

6. 点击 **Connect with Injected** 连接到钱包。在钱包中授权，并在必要时授权切换到 Sepolia 网络。

7. 向下滚动并点击 **Deploy UserProxy (slow process)**。

8. 当用户代理部署完成时，你可以在 **UserProxy access** 旁边看到一个地址。如果你等待了 24 秒（2 个区块）但仍未出现，则可能是检测更改时出现了问题。

   如果是这种情况，请前往 [Sepolia 区块浏览器](https://eth-sepolia.blockscout.com/)，并输入你在服务器输出 `npm run dev` 处看到的部署交易哈希。点击创建的合约以查看其地址，然后复制它。将该地址粘贴到 _Or enter existing proxy address_ 字段中，然后点击 **Set proxy address**。

9. 点击 **Request more tokens for proxy**，向 ERC-20 合约的 [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) 函数提交调用以获取代币。在钱包中**确认**签名。当然，代币会到达代理的地址，而不是用户的地址。

10. 向下滚动并点击 _Last transaction:_ 下方的链接。这将在浏览器中打开以向你显示 `faucet` 交易。

11. 在 _amount to transfer_ 中，输入一个介于 1 到 1000 之间的数字。点击 **Transfer** 将代币转账到你自己的地址。在点击**确认**请求之前，请注意正在签名的数据是不透明的。用户很难理解他们正在签名什么。请记住，我们将在[下文](#vulnerabilities)中讨论这个问题。

12. 交易确认后，等待查看 _your balance_ 和 _proxy balance_ 的变化。请注意，这也需要一些时间，因为 Sepolia 的出块时间为 12 秒。

## 工作原理 {#how-work}

为了实现免 Gas 体验，我们需要一个供用户使用的用户界面、一个将消息从用户界面路由到链上的服务器，以及一个接收并验证这些消息的智能合约。

### 钱包智能合约 {#wallet-smart-contract}

这是[智能合约](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol)。它的目的是执行真正所有者请求的任何操作，无论使用何种渠道进行请求，并忽略其他所有内容。为此，其函数接收要调用的目标地址以及用于调用它的数据。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

所有者的身份和一个用于防止消息被重复使用的[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)。因为随机数是一个 `public` 变量，Solidity 编译器还会创建一个视图函数 [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0)，允许链下代码读取其值。

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

验证 [EIP-712 签名](https://eips.ethereum.org/EIPS/eip-712)所需的信息。

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

一个 `UserProxy` 绑定到一个单一的所有者地址。这是必要的，因为它可以拥有资产（ERC-20 代币、NFT 等）。我们不想将属于不同所有者的资产混合在一起。

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

[域分隔符](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)。它不能在编译时计算，因为它取决于链 ID 和合约地址。这使得 UserProxy 不可能被为另一个代理准备的消息所欺骗。

```solidity
    event CallResult(address target, bytes returnData);
```

记录调用的结果日志。

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

此函数可以由所有者直接调用。如果没有可用的转发器，所有者仍然可以直接在区块链上访问资产（如果用户拥有 ETH）。

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

如果我们被所有者_直接_调用，则使用提供的调用数据调用目标。

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

这是 `UserProxy` 的主要函数。它获取 `target` 和 `data`，以及一个签名。

```solidity
    external returns (bytes memory) {
        // 计算 EIP-712 摘要
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

摘要还包括随机数，但我们不需要从交易中接收它；我们已经知道正确的值。具有错误随机数的签名将被拒绝。

```solidity

    // 恢复签名者
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

如果签名无效，`ecrecover` 通常会返回一个不同的地址，并且它将不被接受。

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

调用用户告诉我们要调用的合约，如果不成功则回退。

```solidity
    emit CallResult(target, returnData);

    nonce++; // 递增随机数以防止重放

    return returnData;
}
```

如果成功，则触发日志事件并递增随机数。

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

这些是几乎相同的变体，允许你也将 ETH 从合约中转账出去。

### 转发器 {#relayer}

转发器是一个[服务器组件](/developers/tutorials/server-components/)。它是用 JavaScript 编写的；你可以在[此处](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js)查看源代码。

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

我们需要这些库。这是一个 [Express](https://expressjs.com/) 服务器，它使用 [Vite](https://vite.dev/) 来提供用户界面代码。我们使用 [Viem](https://viem.sh/) 与区块链通信，并使用 [dotenv](https://www.dotenv.org/) 读取发送交易的地址的私钥。

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

这是读取已编译的 `UserProxy` 的一种简单方法。我们需要 ABI 才能调用 `UserProxy`，并且需要编译后的代码才能为用户部署它。

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

读取 `.env` 文件，提取地址，并将其打印到控制台。

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

与区块链通信的 Viem 客户端。

```js
const start = async () => {
  const app = express()
```

运行 Express 服务器。

```js
  app.use(express.json())
```

告诉 Express 读取请求正文，如果是 JSON 则解析它。

```js
  app.post("/server/deploy", async (req, res) => {
```

这是处理部署代理请求的代码。请注意，我们在这里容易受到[拒绝服务](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻击，因为攻击者可以向我们发送大量部署代理的请求，直到我们的 ETH 耗尽。在生产系统上，我们可能会要求部署代理的请求必须经过签名，并且签名者必须是现有客户。

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

从请求中获取所有者的地址。

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

[部署合约](https://viem.sh/docs/contract/deployContract#deploycontract)并[等待其部署完成](https://viem.sh/docs/actions/public/waitForTransactionReceipt)。

```js
      res.json({ contractAddress: receipt.contractAddress })
```

如果一切正常，则将代理地址返回给用户界面。

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

如果出现问题，则报告它。

```js
  app.post("/server/message", async (req, res) => {
```

这是处理 `UserProxy` 合约用户消息的代码。这是另一个容易受到拒绝服务攻击的点。

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

获取请求数据并使用它在代理上调用 `signedAccess`。

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

报告交易哈希。这使得 UI 能够显示一个 URL 供用户检查交易。

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

同样，如果出现问题，则报告它。

```js
  // 让 Vite 处理其他一切
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

对于其他所有内容，使用 Vite，它会为我们处理用户界面的服务。

### 用户界面 {#user-interface}

[这是用户界面代码](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src)。除了 [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) 之外，大部分代码与[本文](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through)中记录的代码几乎相同。

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) 的部分内容类似于[本文](/developers/tutorials/gasless/#ui-changes)中的 [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)。以下是新增的部分。

```js
import {
   encodeFunctionData
       } from 'viem'
```

[此函数](https://viem.sh/docs/contract/encodeFunctionData)为 EVM 函数调用创建调用数据。这是必要的，以便用户可以对调用数据进行签名。

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`，如上所述。

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[此合约](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract)主要是一个普通的 ERC-20 合约，增加了一个重要的函数 `faucet()`。此函数出于测试目的向任何请求代币的人授予代币。

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

此组件输出一个地址，并带有指向区块浏览器上该合约的链接。

```js
const Token = () => {
    ...
```

这是完成大部分工作的主要组件。

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

用户地址的代币余额。

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

用户拥有的代理地址。

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

代理的代币余额。

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

当用户手动设置代理地址时使用此字段。能够手动设置代理地址让用户可以使用现有的代理，而不是每次都部署一个新的代理（并丢失旧代理拥有的所有代币）。

```js
  const [ txHash, setTxHash ] = useState(null)
```

上一笔交易的哈希，用于显示指向浏览器的链接，以便用户可以检查该交易。

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

这些字段都用于向 ERC-20 合约发送代币转账命令。这可能是 `FaucetToken`，但并非必须如此。[`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) 函数是 ERC-20 标准的一部分。

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

读取我们感兴趣的两个代币余额：用户拥有多少，以及代理拥有多少。

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

为了防止重放攻击（例如，卖家重放一笔给他们钱的交易），我们使用一个[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)。我们需要知道当前值，以便将其添加到我们签名的数据中。

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

当从区块链读取的信息发生变化时，使用 [`useEffect`](https://react.dev/reference/react/useEffect) 更新显示给用户的余额。

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

默认是将 `FaucetToken` 代币转账到用户自己的账户。在这里，当我们从 Viem 接收到这些值时，我们设置它们。

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

文本字段更改时的事件处理程序。

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

请求服务器为该用户部署一个代理。

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

在将消息发送到服务器以发送到链上的 `UserProxy` 之前，对消息进行签名。这在[此处](/developers/tutorials/gasless/#ui-changes)有解释。我们需要使用目标地址（我们正在调用的代币的地址）和要发送的调用数据对消息进行签名。

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

将签名消息发送到 `UserProxy`，它将验证签名，然后将其发送到 `target`。

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // 两个地址
          data,           // 发送到目标的调用数据
          v, r, s         // 签名
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

向服务器发送请求，并在收到响应时获取交易哈希。

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

模拟调用 `faucet` 函数。只有在成功时，我们才启用水龙头按钮。

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

要通过服务器和 `UserProxy` 调用函数，我们遵循三个步骤：

1. 使用 [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) 创建要签名和发送的调用数据。

2. 对消息（目标地址、调用数据和随机数）进行签名。

3. 将消息发送到服务器。

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

组件的这一部分允许你直接从浏览器使用 `FaucetToken`。其主要目的是为了方便调试。

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

让用户部署一个新的 `UserProxy`。

```js
         <br /><br />
         <input type="text" placeholder="或输入现有代理地址" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

仅当用户输入合法地址时，才允许他们点击 **Set proxy address**。请注意，这并不能确保相关地址确实是一个 `UserProxy` 合约。可以添加这样的检查，但这会慢得多（用户体验更差），并且不会提高安全性（攻击者总是可以为用户界面使用他们自己的代码）。

```js
         <br /><br />
         { proxyAddr && (
```

_仅当_存在合法的代理地址时，才显示其余部分。

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

用户不需要知道随机数；这仅用于调试目的。

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

我们无法通过代理模拟对 `faucet()` 的调用。但是，我们至少可以确保我们有一个代理，并且该代理向我们报告了一个随机数。

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

让用户发出 ERC-20 转账交易。

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

如果存在上一笔交易哈希，则显示一个链接，以便用户可以在区块浏览器中查看它。

```js
      </div>
    </>
  )
}

export {Token}
```

这只是 React 样板代码。

## 漏洞 {#vulnerabilities}

我们的服务器容易受到拒绝服务攻击。这种攻击在[本系列的上一篇文章中](/developers/tutorials/gasless/#dos-on-server)有解释。

此外，我们正在鼓励不良的用户行为。这是我们要求用户签名的内容：

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_我们_知道这是针对用户想要转账的代币、金额和目标地址的合法 ERC-20 转账。但大多数用户不知道如何解释调用数据，也不知道他们正在签名什么。这是糟糕的设计，原因有两个：

- 一些用户不会使用我们，因为他们不信任我们让他们签名的数据。
- 其他用户_会_信任我们，并认为他们应该直接对调用数据进行签名，而无需了解它是什么。这意味着如果攻击者 Adam 设法将他们重定向到他的网站，他就可以让他们签名一笔交易，将用户拥有的所有 USDC（或 DAI，或任何其他 ERC-20）授权给他。

解决方案是在 `UserProxy` 中为常用函数（例如转账）提供单独的函数。这样用户就可以对他们理解的内容进行签名。

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**注意：**虽然用户可以使用他们想要的任何钱包，但强烈建议使用 EIP-712 的应用程序鼓励他们使用[显示完整签名数据](https://rabby.io/)的钱包。一些钱包会截断地址，这是不安全的。攻击者可以创建一个开头和结尾字符相同，但中间不同的地址。

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## 结论 {#conclusion}

除了上述漏洞之外，本教程中的解决方案还有几个以太坊可以帮助我们解决的缺点。

- _抗审查性_。目前，用户可以使用你的服务器、其他人设置的竞争服务器，或者直接连接到以太坊（这会产生 Gas 成本）。使用 [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) 允许用户将他们的交易提供给大型服务器池，从而降低其交易被审查的可能性。
- _EOA 拥有的资产_。如上所述，[EIP-7702](https://eip7702.io/) 可用于管理 EOA 地址已拥有的资产。这有其困难，但有时是必要的。

我希望在不久的将来发布有关添加这些功能的教程。

[在此处查看我的更多作品](https://cryptodocguy.pro/)。