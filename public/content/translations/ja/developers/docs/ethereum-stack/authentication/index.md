---
title: イーサリアムでの認証
description: イーサリアムアプリケーションにおけるユーザー認証の仕組みについて学びます。パスワードは不要で、ウォレットと署名のみを使用します。
lang: ja
---

従来のWeb開発の経験がある場合、ユーザー名とパスワードによるログイン、OAuthフロー、セッションCookieなどに慣れていることでしょう。イーサリアムでの認証はこれらとは異なり、多くの点でよりシンプルに機能します。

イーサリアムでは、ユーザーは**ウォレットでメッセージに署名する**ことで身元を証明します。保存すべきパスワードはありません。漏洩する可能性のある認証情報のデータベースもありません。あるのは暗号技術だけです。

## Web2との違い {#how-is-it-different}

| Web2                              | イーサリアム                                         |
| --------------------------------- | ------------------------------------------------ |
| ユーザー名 + パスワード               | ウォレットアドレス + 署名                       |
| サーバーが認証情報を保存         | ユーザーが秘密鍵を保持                           |
| Cookie / JWTでセッションを管理 | オフチェーンのウォレット署名でセッションを開始 |
| 「Googleでサインイン」             | 「イーサリアムでサインイン」                          |
| パスワードリセットのフロー              | シード・フレーズによる復元                             |

根本的な変化は次のとおりです。Web2では、中央集権型のサーバーがユーザーを認証します。イーサリアムでは、特定のアドレスを管理していることを証明することで**自分自身を認証し**、誰でもそれを独立して検証できます。

## 前提条件 {#prerequisites}

以下の内容を理解しておいてください。

- [イーサリアムアカウントとその仕組み](/developers/docs/accounts/)
- [ウォレットとは何か、その接続方法](/wallets/)
- [公開鍵・秘密鍵の暗号技術の基礎](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## ウォレットベースの認証の仕組み {#how-wallet-auth-works}

基本的なフローはシンプルです。

1. **分散型アプリケーション (dapp) がユーザーにウォレットの接続を要求する** (メタマスク、Rainbow、WalletConnectなどを経由)
2. **ウォレットがユーザーのイーサリアムアドレスを共有する** - これが公開識別子となります
3. **dappが一意のメッセージを生成する** (ナンスまたはチャレンジ)
4. **ユーザーが秘密鍵でメッセージに署名する** (ウォレット内で実行されます)
5. **バックエンドが、提示されたアドレスに対して署名を検証する**
6. **有効な場合、ユーザーが認証される**

パスワードが入力されたり、保存されたり、送信されたりすることは一切ありません。

## イーサリアムでサインイン (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361)は、イーサリアムでのサインインのための標準メッセージフォーマットを定義しており、一般的に**SIWE** (Sign-In with Ethereum) と呼ばれます。これにより、アドホックなメッセージ署名が、構造化された安全な標準に置き換えられます。

SIWEメッセージは次のようになります。

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

SIWEの主な特徴:

- **ドメインバインディング** - メッセージにドメインが含まれており、フィッシングを防ぎます
- **チェーンID** - 署名が有効なネットワークを指定します
- **ナンス** - リプレイ攻撃を防ぎます
- **有効期限** - 有効期間を制限するオプションのタイムスタンプです
- **リソース** - スコープ付きアクセスのためのオプションのURIです

### SIWEライブラリ {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruceによる公式のTypeScript実装
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust実装
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go実装

### 例: siweを使用したクライアントサイドのサインイン {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. バックエンドからナンスを取得する
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWEメッセージを作成して署名する
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

  // 3. 検証のためにバックエンドに送信する
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### 例: サーバーサイドの検証 (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// ナンスを発行し、後で/verifyが確認できるようにセッションに保存する
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
      // data.addressは検証済みのイーサリアムアドレス
      // ユーザーのセッションまたはJWTを作成する
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## ウォレット接続ライブラリ {#wallet-connection-libraries}

認証の前に、ユーザーにウォレットを接続してもらう必要があります。以下のライブラリを使用すると簡単に実装できます。

- **[RainbowKit](https://www.rainbowkit.com/)** - 美しいUIを備えた、すぐに使えるReactコンポーネント
- **[ConnectKit](https://docs.family.co/connectkit)** - ドロップインで使えるウォレット接続モーダル
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - SIWEを内蔵したマルチチェーン対応のウォレット接続
- **[wagmi](https://wagmi.sh)** - `useAccount`や`useConnect`を提供するReact Hooksライブラリ

## 手動での署名検証 {#verifying-manually}

SIWEを使用しない場合は、署名を直接検証することもできます。

```ts
import { verifyMessage } from 'ethers'

// ユーザーが署名したメッセージ
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// 署名から署名者のアドレスを復元する
const recoveredAddress = verifyMessage(message, signature)

// 主張されたアドレスと比較する
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // 認証成功
}
```

### セキュリティに関する重要な注意事項 {#security-notes}

- **常にナンスを使用する** - 古い署名が再利用されるリプレイ攻撃を防ぎます
- **ドメインを含める** - 署名が異なるサイト間で有効になるのを防ぎます
- **有効期限を確認する** - 署名には制限された有効期間を設ける必要があります
- **可能な限りSIWE (EIP-4361) を使用する** - 上記のすべてを自動的に処理してくれます
- **秘密鍵を絶対に公開しない** - 署名はウォレット内で行われ、アプリは結果のみを受け取ります

## セッション管理 {#session-management}

認証後も、Web2と同様にセッションが必要です。一般的なパターンは次のとおりです。

- **JWTトークン** - 署名を検証した後にJWTを発行し、APIリクエストに使用します
- **サーバーサイドセッション** - 検証済みのアドレスをセッションCookieに保存します
- **リソース付きSIWE** - 特定のURIにリンクされたスコープ付きアクセストークンを定義します

Web2との主な違いは、ユーザーのイーサリアムアドレスが永続的なアイデンティティになる点です。新しいアカウントを作成することなく、どのdappでも同じアドレスを使用できます。

## 分散型アイデンティティ {#decentralized-identity}

イーサリアムの認証は、**自己主権型アイデンティティ**に向けたより広範な動きの一部です。この分野の標準やプロジェクトには以下が含まれます。

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - アドレスに解決される人間が読める名前 (例: `vitalik.eth`)
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - アイデンティティと認証情報に関するオンチェーンのアテステーション
- **[W3C 分散型アイデンティティ (DID)](https://www.w3.org/TR/did-core/)** - 検証可能な分散型アイデンティティの世界標準
- **[Ceramic Network](https://ceramic.network/)** - DIDに紐づく分散型データストリーム

## 参考文献 {#further-reading}

- [EIP-4361: イーサリアムでサインイン](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWEドキュメント](https://docs.login.xyz/)
- [Auth0でのイーサリアムによるサインイン](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit認証ドキュメント](https://docs.reown.com/appkit/authentication)
- [ENSドキュメント](https://docs.ens.domains/)

## 関連トピック {#related-topics}

- [イーサリアムアカウント](/developers/docs/accounts/)
- [JavaScript APIライブラリ](/developers/docs/apis/javascript/)
- [バックエンドAPIライブラリ](/developers/docs/apis/backend/)
- [ウォレット](/wallets/)