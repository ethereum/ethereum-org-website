---
title: 以太坊上的身份验证
description: 了解以太坊应用中的用户身份验证工作原理——无需密码，只需钱包和签名。
lang: zh
---

如果你来自传统的 Web 开发领域，你可能习惯了用户名/密码登录、OAuth 流程和会话 Cookie。以太坊上的身份验证工作方式有所不同——而且在许多方面，更加简单。

在以太坊上，用户通过**使用钱包对消息进行签名**来证明自己的身份。没有需要存储的密码。没有会泄露凭据的数据库。只有密码学。

## 它与 Web2 有何不同？ {#how-is-it-different}

| Web2                              | 以太坊                                         |
| --------------------------------- | ------------------------------------------------ |
| 用户名 + 密码               | 钱包地址 + 签名                       |
| 服务器存储凭据         | 用户持有私钥                           |
| 会话由 Cookie / JWT 管理 | 会话以链下钱包签名开始 |
| “使用 Google 登录”             | “使用以太坊登录”                          |
| 密码重置流程              | 助记词恢复                             |

根本性的转变在于：在 Web2 中，由中心化服务器对你进行身份验证。在以太坊上，**你通过证明自己控制特定地址来验证自己的身份**——并且任何人都可以独立验证这一点。

## 前提条件 {#prerequisites}

请确保你了解：

- [以太坊账户及其工作原理](/developers/docs/accounts/)
- [什么是钱包以及如何连接钱包](/wallets/)
- [公钥-私钥密码学基础](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## 基于钱包的身份验证工作原理 {#how-wallet-auth-works}

核心流程很简单：

1. **你的去中心化应用 (dapp) 要求用户连接他们的钱包**（通过梅塔马斯克 (MetaMask)、Rainbow、WalletConnect 等）
2. **钱包共享用户的以太坊地址**——这是他们的公开标识符
3. **你的 dapp 生成一条唯一的消息**（随机数或质询）
4. **用户使用其私钥对消息进行签名**（在钱包内部进行）
5. **你的后端根据声明的地址验证签名**
6. **如果有效，则用户通过身份验证**

整个过程无需输入、存储或传输任何密码。

## 使用以太坊登录 (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 定义了以太坊登录的标准消息格式，通常称为 **SIWE**（Sign-In with Ethereum，使用以太坊登录）。它用结构化、安全的标准取代了临时的消息签名。

SIWE 消息如下所示：

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

SIWE 的主要特点：

- **域名绑定**——消息包含域名，可防止网络钓鱼
- **链 ID**——指定签名在哪个网络上有效
- **随机数**——防止重放攻击
- **过期时间**——限制有效期的可选时间戳
- **资源**——用于范围访问的可选 URI

### SIWE 库 {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)**——Spruce 提供的官方 TypeScript 实现
- **[siwe-rs](https://github.com/spruceid/siwe-rs)**——Rust 实现
- **[siwe-go](https://github.com/spruceid/siwe-go)**——Go 实现

### 示例：使用 siwe 进行客户端登录 {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. 从后端获取随机数
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. 创建并签名 SIWE 消息
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. 发送到后端进行验证
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### 示例：服务器端验证 (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// 签发一个随机数并将其存储在会话中，以便 /verify 稍后进行检查
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address 是已验证的以太坊地址
      // 为用户创建会话或 JWT
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## 钱包连接库 {#wallet-connection-libraries}

在进行身份验证之前，你需要用户连接他们的钱包。这些库使这一过程变得简单：

- **[RainbowKit](https://www.rainbowkit.com/)**——具有精美 UI 的即用型 React 组件
- **[ConnectKit](https://docs.family.co/connectkit)**——即插即用的钱包连接模态框
- **[AppKit (WalletConnect)](https://reown.com/appkit)**——内置 SIWE 的多链钱包连接
- **[wagmi](https://wagmi.sh)**——包含 `useAccount`、`useConnect` 的 React Hooks 库

## 手动验证签名 {#verifying-manually}

如果你不想使用 SIWE，可以直接验证签名：

```ts
import { verifyMessage } from 'ethers'

// 用户签名的消息
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// 从签名中恢复签名者的地址
const recoveredAddress = verifyMessage(message, signature)

// 与声明的地址进行比较
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // 身份验证成功
}
```

### 重要安全注意事项 {#security-notes}

- **始终使用随机数**——防止重复使用旧签名的重放攻击
- **包含域名**——防止签名在不同网站之间有效
- **检查过期时间**——签名应具有有限的有效期
- **尽可能使用 SIWE (EIP-4361)**——它会为你处理上述所有问题
- **切勿暴露私钥**——签名在钱包内部进行；你的应用只能看到结果

## 会话管理 {#session-management}

身份验证完成后，你仍然需要会话——就像 Web2 一样。常见模式包括：

- **JWT 令牌**——在验证签名后颁发 JWT，用于 API 请求
- **服务器端会话**——将验证后的地址存储在会话 Cookie 中
- **带有资源的 SIWE**——定义链接到特定 URI 的范围访问令牌

与 Web2 的主要区别在于：用户的以太坊地址是其持久身份。他们可以在任何 dapp 中使用它，而无需创建新账户。

## 去中心化身份 {#decentralized-identity}

以太坊身份验证是迈向**自主权身份**的更广泛运动的一部分。该领域的标准和项目包括：

- **[以太坊域名服务 (ENS)](https://ens.domains/)**——解析为地址的人类可读名称（例如 `vitalik.eth`）
- **[以太坊证明服务 (EAS)](https://attest.org/)**——关于身份和凭据的链上证明
- **[W3C 去中心化标识符 (DID)](https://www.w3.org/TR/did-core/)**——可验证去中心化身份的全球标准
- **[Ceramic Network](https://ceramic.network/)**——绑定到 DID 的去中心化数据流

## 延伸阅读 {#further-reading}

- [EIP-4361：使用以太坊登录](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE 文档](https://docs.login.xyz/)
- [在 Auth0 上使用以太坊登录](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit 身份验证文档](https://docs.reown.com/appkit/authentication)
- [ENS 文档](https://docs.ens.domains/)

## 相关主题 {#related-topics}

- [以太坊账户](/developers/docs/accounts/)
- [JavaScript API 库](/developers/docs/apis/javascript/)
- [后端 API 库](/developers/docs/apis/backend/)
- [钱包](/wallets/)