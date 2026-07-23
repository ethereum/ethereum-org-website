---
title: 以太坊上的身分驗證
description: 了解以太坊應用程式中的使用者身分驗證如何運作——不需要密碼，只需要錢包和簽章。
lang: zh-tw
---

如果你來自傳統的網頁開發領域，你可能已經習慣了使用者名稱/密碼登入、OAuth 流程和工作階段 Cookie。以太坊上的身分驗證運作方式有所不同——而且在許多方面更為簡單。

在以太坊上，使用者透過**使用他們的錢包簽署訊息**來證明自己的身分。沒有需要儲存的密碼。沒有會外洩憑證的資料庫。只有密碼學。

## 與 Web2 有何不同？ {#how-is-it-different}

| Web2                              | 以太坊                                         |
| --------------------------------- | ------------------------------------------------ |
| 使用者名稱 + 密碼               | 錢包地址 + 簽章                       |
| 伺服器儲存憑證         | 使用者持有私鑰                           |
| 工作階段由 Cookie / JWT 管理 | 工作階段始於鏈下錢包簽章 |
| 「使用 Google 登入」             | 「使用以太坊登入」                          |
| 密碼重設流程              | 助記詞復原                             |

根本的轉變在於：在 Web2 中，由中心化伺服器對你進行身分驗證。在以太坊上，**你對自己進行身分驗證**，方法是證明你控制一個特定的地址——而且任何人都可以獨立驗證這一點。

## 先決條件 {#prerequisites}

請確保你了解：

- [以太坊帳戶及其運作方式](/developers/docs/accounts/)
- [什麼是錢包以及如何連接錢包](/wallets/)
- [公私鑰密碼學基礎](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## 基於錢包的身分驗證如何運作 {#how-wallet-auth-works}

核心流程很簡單：

1. **你的去中心化應用程式 (dapp) 要求使用者連接他們的錢包**（透過梅塔馬斯克 (MetaMask)、Rainbow、WalletConnect 等）
2. **錢包分享使用者的以太坊地址**——這是他們的公開識別碼
3. **你的 dapp 產生一則獨特的訊息**（隨機數或挑戰）
4. **使用者使用他們的私鑰簽署訊息**（在錢包內進行）
5. **你的後端針對聲稱的地址驗證簽章**
6. **如果有效，使用者即通過身分驗證**

過程中從未輸入、儲存或傳輸過任何密碼。

## 使用以太坊登入 (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 定義了以太坊登入的標準訊息格式，通常稱為 **SIWE** (Sign-In with Ethereum)。它以結構化、安全的標準取代了臨時的訊息簽署。

SIWE 訊息看起來像這樣：

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

SIWE 的主要特點：

- **網域綁定**——訊息包含網域，可防止網路釣魚
- **鏈 ID**——指定簽章在哪個網路上有效
- **隨機數**——防止重放攻擊
- **過期時間**——限制有效期限的選用時間戳記
- **資源**——用於範圍存取的選用 URI

### SIWE 函式庫 {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)**——Spruce 的官方 TypeScript 實作
- **[siwe-rs](https://github.com/spruceid/siwe-rs)**——Rust 實作
- **[siwe-go](https://github.com/spruceid/siwe-go)**——Go 實作

### 範例：使用 siwe 進行用戶端登入 {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. 從您的後端取得隨機數
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. 建立並簽署 SIWE 訊息
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

  // 3. 傳送至後端進行驗證
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### 範例：伺服器端驗證 (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// 發行隨機數並將其儲存在 session 中，以便 /verify 稍後進行檢查
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
      // data.address 是已驗證的以太坊地址
      // 為使用者建立 session 或 JWT
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## 錢包連接函式庫 {#wallet-connection-libraries}

在進行身分驗證之前，你需要使用者連接他們的錢包。這些函式庫讓這件事變得簡單：

- **[RainbowKit](https://www.rainbowkit.com/)**——具有美觀使用者介面且隨插即用的 React 元件
- **[ConnectKit](https://docs.family.co/connectkit)**——可直接使用的錢包連接互動視窗
- **[AppKit (WalletConnect)](https://reown.com/appkit)**——內建 SIWE 的多鏈錢包連接
- **[wagmi](https://wagmi.sh)**——包含 `useAccount`、`useConnect` 的 React Hooks 函式庫

## 手動驗證簽章 {#verifying-manually}

如果你不想使用 SIWE，你可以直接驗證簽章：

```ts
import { verifyMessage } from 'ethers'

// 使用者簽署的訊息
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// 從簽章中還原簽署者的地址
const recoveredAddress = verifyMessage(message, signature)

// 與聲稱的地址進行比較
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // 身分驗證成功
}
```

### 重要安全注意事項 {#security-notes}

- **務必使用隨機數**——防止重複使用舊簽章的重放攻擊
- **包含網域**——防止簽章在不同網站之間有效
- **檢查過期時間**——簽章應具有有限的有效期限
- **盡可能使用 SIWE (EIP-4361)**——它會為你處理上述所有事項
- **絕不暴露私鑰**——簽署過程在錢包內進行；你的應用程式只會看到結果

## 工作階段管理 {#session-management}

通過身分驗證後，你仍然需要工作階段——就像 Web2 一樣。常見模式：

- **JWT 權杖**——在驗證簽章後核發 JWT，用於 API 請求
- **伺服器端工作階段**——將驗證過的地址儲存在工作階段 Cookie 中
- **帶有資源的 SIWE**——定義連結到特定 URI 的範圍存取權杖

與 Web2 的主要差異在於：使用者的以太坊地址是他們持久的身分。他們可以在任何 dapp 中使用它，而無需建立新帳戶。

## 去中心化身分 {#decentralized-identity}

以太坊身分驗證是邁向**自主身分**更廣泛運動的一部分。此領域的標準和專案包括：

- **[以太坊域名服務 (ENS)](https://ens.domains/)**——解析為地址的人類可讀名稱（例如 `vitalik.eth`）
- **[以太坊證明服務 (EAS)](https://attest.org/)**——關於身分和憑證的鏈上證明
- **[W3C 去中心化識別碼 (DID)](https://www.w3.org/TR/did-core/)**——可驗證去中心化身分 (DID) 的全球標準
- **[Ceramic Network](https://ceramic.network/)**——與 DID 綁定的去中心化資料流

## 延伸閱讀 {#further-reading}

- [EIP-4361：使用以太坊登入](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE 文件](https://docs.login.xyz/)
- [在 Auth0 上使用以太坊登入](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit 身分驗證文件](https://docs.reown.com/appkit/authentication)
- [ENS 文件](https://docs.ens.domains/)

## 相關主題 {#related-topics}

- [以太坊帳戶](/developers/docs/accounts/)
- [JavaScript API 函式庫](/developers/docs/apis/javascript/)
- [後端 API 函式庫](/developers/docs/apis/backend/)
- [錢包](/wallets/)