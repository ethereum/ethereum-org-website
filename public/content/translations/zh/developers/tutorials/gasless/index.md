---
title: "赞助 Gas 费：如何为用户代付交易成本"
description: "创建一个私钥和地址很容易；只需运行合适的软件即可。但在世界上许多地方，获取用于发送交易的 ETH 要困难得多。在本教程中，你将学习如何为在智能合约中执行用户签名的链下结构化数据代付链上 Gas 成本。你可以让用户签署一个包含交易信息的结构，然后你的链下代码将其作为交易提交到区块链。"
author: "奥里·波梅兰茨"
tags: ["无 Gas", "Solidity", "eip-712", "元交易"]
skill: intermediate
breadcrumb: "Gas 赞助"
lang: zh
published: 2026-02-27
---

## 简介 {#introduction}

如果我们希望以太坊服务[十亿以上的人口](https://blog.ethereum.org/category/next-billion)，我们需要消除阻力并使其尽可能易于使用。这种阻力的来源之一是需要 ETH 来支付 Gas 费。

如果你有一个从用户那里赚钱的去中心化应用 (dapp)，那么让用户通过你的服务器提交交易并由你自己支付交易费用可能是有意义的。因为用户仍然在他们的钱包中签署 [EIP-712 授权消息](https://eips.ethereum.org/EIPS/eip-712)，所以他们保留了以太坊的完整性保证。可用性取决于中继交易的服务器，因此它受到更多限制。但是，你可以进行设置，以便用户也可以直接访问智能合约（如果他们获得了 ETH），并允许其他想要赞助交易的人设置他们自己的服务器。

本教程中的技术仅在你控制智能合约时才有效。还有其他技术，包括[账户抽象](https://eips.ethereum.org/EIPS/eip-4337)，可以让你赞助到其他智能合约的交易，我希望在未来的教程中介绍这些技术。

注意：这_不是_生产级别的代码。它容易受到重大攻击，并且缺乏主要功能。在[本指南的漏洞部分](#vulnerabilities)了解更多信息。

### 前提条件 {#prerequisites}

要理解本教程，你需要已经熟悉：

- Solidity
- JavaScript
- React 和 WAGMI。如果你不熟悉这些用户界面工具，[我们有一个相关的教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

## 示例应用 {#sample-app}

这里的示例应用是 Hardhat 的 `Greeter` 合约的一个变体。你可以在 [GitHub 上](https://github.com/qbzzt/260301-gasless)查看它。该智能合约已经部署在 [Sepolia](https://sepolia.dev/) 上，地址为 [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA)。

要查看它的实际运行效果，请按照以下步骤操作。

1. 克隆仓库并安装必要的软件。

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. 编辑 `.env`，将 `PRIVATE_KEY` 设置为在 Sepolia 上拥有 ETH 的钱包。如果你需要 Sepolia ETH，请[使用水龙头](/developers/docs/networks/#sepolia)。理想情况下，这个私钥应该与你浏览器钱包中的私钥不同。

3. 启动服务器。

   ```sh
   npm run dev
   ```

4. 浏览位于 URL [`http://localhost:5173`](http://localhost:5173) 的应用。

5. 点击 **Connect with Injected** 连接到钱包。在钱包中授权，并在必要时授权切换到 Sepolia。

6. 编写一个新的问候语，然后点击 **Update greeting via sponsor**。

7. 签署消息。

8. 等待大约 12 秒（Sepolia 上的出块时间）。在等待期间，你可以查看服务器控制台中的 URL 以查看交易。

9. 看到问候语已更改，并且最后更新的地址值现在是你浏览器钱包的地址。

要了解其工作原理，我们需要看看消息是如何在用户界面中创建的，它是如何由服务器中继的，以及智能合约是如何处理它的。

### 用户界面 {#ui-changes}

用户界面基于 [WAGMI](https://wagmi.sh/)；你可以在[本教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)中了解相关信息。

以下是我们签署消息的方式：

```js
const signGreeting = useCallback(
```

React 钩子 [`useCallback`](https://react.dev/reference/react/useCallback) 允许我们在重绘组件时重用相同的函数，从而提高性能。

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

如果没有账户，则引发错误。这应该永远不会发生，因为在这种情况下，启动调用 `signGreeting` 进程的 UI 按钮是被禁用的。然而，未来的程序员可能会移除该保护措施，因此在这里检查此条件也是一个好主意。

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[域分隔符](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)的参数。该值是常量，因此在优化得更好的实现中，我们可能会计算一次，而不是在每次调用函数时重新计算。

- `name` 是用户可读的名称，例如我们为其生成签名的 dapp 的名称。
- `version` 是版本。不同版本不兼容。
- `chainId` 是我们正在使用的链，由 [WAGMI 提供](https://wagmi.sh/react/api/hooks/useChainId)。
- `verifyingContract` 是将验证此签名的合约地址。我们不希望同一个签名应用于多个合约，以防有多个 `Greeter` 合约并且我们希望它们有不同的问候语。

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

我们签署的数据类型。在这里，我们只有一个参数 `greeting`，但现实生活中的系统通常有更多参数。

```js
        const message = { greeting }
```

我们想要签署并发送的实际消息。`greeting` 既是字段名称，也是填充它的变量名称。

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

实际获取签名。此函数是异步的，因为用户需要很长时间（从计算机的角度来看）来签署数据。

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

该函数返回一个十六进制值。在这里我们将其划分为多个字段。

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

如果这些变量中的任何一个发生变化，则创建该函数的新实例。`account` 和 `chainId` 参数可以由用户在钱包中更改。`contractAddr` 是链 ID 的函数。`signTypedDataAsync` 不应该改变，但我们从[一个钩子](https://wagmi.sh/react/api/hooks/useSignTypedData)导入它，所以我们不能确定，最好在这里添加它。

现在新的问候语已签署，我们需要将其发送到服务器。

```js
  const sponsoredGreeting = async () => {
    try {
```

此函数接收签名并将其发送到服务器。

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

发送到我们来源服务器中的路径 `/server/sponsor`。

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

使用 `POST` 发送 JSON 编码的信息。

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

输出响应。在生产系统上，我们还会向用户显示响应。

### 服务器 {#server}

我喜欢使用 [Vite](https://vite.dev/) 作为我的前端。它会自动提供 React 库，并在前端代码更改时更新浏览器。然而，Vite 不包含后端工具。

解决方案在 [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js) 中。

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // 让 Vite 处理其余的一切
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

首先，我们为自己处理的请求（向 `/server/sponsor` 发送的 `POST`）注册一个处理程序。然后，我们创建并使用 Vite 服务器来处理所有其他 URL。

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

这只是一个标准的 [viem](https://viem.sh/) 区块链调用。

### 智能合约 {#smart-contract}

最后，[`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) 需要验证签名。

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

构造函数创建[域分隔符](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)，类似于上面的用户界面代码。区块链执行要昂贵得多，所以我们只计算一次。

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

这是被签署的结构。在这里我们只有一个字段。

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

这是[结构标识符](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct)。它每次都在用户界面中计算。

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

此函数接收已签名的请求并更新问候语。

```solidity
        // 计算 EIP-712 摘要
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

根据 [EIP-712](https://eips.ethereum.org/EIPS/eip-712) 创建摘要。

```solidity
        // 恢复签名者
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

使用 [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) 获取签名者地址。请注意，错误的签名仍然可能产生一个有效的地址，只是一个随机地址。

```solidity
        // 应用问候语，就像签名者调用它一样
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

更新问候语。

## 漏洞 {#vulnerabilities}

这_不是_生产级别的代码。它容易受到重大攻击，并且缺乏主要功能。以下是一些漏洞以及如何解决它们。

要查看其中一些攻击，请点击_Attacks_标题下的按钮，看看会发生什么。对于 **Invalid signature** 按钮，请检查服务器控制台以查看交易响应。

### 服务器上的拒绝服务攻击 {#dos-on-server}

最简单的攻击是对服务器的[拒绝服务](https://en.wikipedia.org/wiki/Denial-of-service_attack)攻击。服务器接收来自互联网上任何地方的请求，并根据这些请求发送交易。绝对没有任何东西可以阻止攻击者发出大量签名，无论有效还是无效。每一个都会引发一笔交易。最终，服务器将耗尽用于支付 Gas 的 ETH。

解决此问题的一种方法是将速率限制为每个区块一笔交易。如果目的是向[外部拥有账户](/developers/docs/accounts/#key-differences)显示问候语，那么在区块中间问候语是什么并不重要。

另一种解决方案是跟踪地址，并且只允许来自有效客户的签名。

### 错误的问候语签名 {#wrong-greeting-sigs}

当你点击 **Signature for wrong greeting** 时，你提交了一个针对特定地址 (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) 和问候语 (`Hello`) 的有效签名。但它提交时使用了不同的问候语。这会使 `ecrecover` 产生混淆，它会更改问候语，但地址是错误的。

要解决此问题，请将地址添加到[已签名的结构](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124)中。这样，`ecrecover` 随机地址将与签名中的地址不匹配，智能合约将拒绝该消息。

### 重放攻击 {#replay-attack}

当你点击 **Replay attack** 时，你提交了相同的“我是 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e，我希望问候语是 `Hello`”签名，但带有正确的问候语。结果，智能合约认为该地址（不是你的）将问候语改回了 `Hello`。执行此操作的信息在[交易信息](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1)中是公开可用的。

如果这是一个问题，一种解决方案是添加一个[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)。在地址和数字之间建立一个[映射](https://docs.soliditylang.org/en/latest/types.html#mapping-types)，并在签名中添加一个随机数字段。如果随机数字段与地址的映射匹配，则接受签名并在下次递增映射。如果不匹配，则拒绝交易。

另一种解决方案是在签名数据中添加时间戳，并仅在该时间戳之后的几秒钟内接受签名为有效。这更简单、更便宜，但我们面临在时间窗口内发生重放攻击的风险，以及如果超过时间窗口则合法交易失败的风险。

## 其他缺失的功能 {#other-missing-features}

在生产环境中，我们还会添加其他功能。

### 从其他服务器访问 {#other-servers}

目前，我们允许任何地址提交 `sponsorSetGreeting`。为了去中心化，这可能正是我们想要的。或者，也许我们想确保赞助的交易通过_我们_的服务器，在这种情况下，我们会在智能合约中检查 `msg.sender`。

无论哪种方式，这都应该是一个有意识的设计决策，而不仅仅是没有考虑这个问题的结果。

### 错误处理 {#error-handling}

用户提交问候语。也许它会在下一个区块更新。也许不会。错误是不可见的。在生产系统上，用户应该能够区分以下情况：

- 新的问候语尚未提交
- 新的问候语已提交，正在处理中
- 新的问候语已被拒绝

## 结论

到目前为止，你应该能够为你的去中心化应用 (dapp) 用户创建无 Gas 体验，代价是存在一定程度的中心化。

然而，这仅适用于支持 ERC-712 的智能合约。例如，要转账 ERC-20 代币，必须由所有者签署交易，而不仅仅是签署消息。最简单的解决方案是让资产不归 EOA 地址所有，而是归一个单独的合约所有（这是[账户抽象](/roadmap/account-abstraction/)的一种简单形式）。你可以在[后续教程](/developers/tutorials/gasless-token)中了解更多相关信息。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
