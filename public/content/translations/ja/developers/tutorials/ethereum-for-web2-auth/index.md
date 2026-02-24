---
title: "Web2認証にイーサリアムを使用する"
description: "このチュートリアルを読むことで、デベロッパーはイーサリアムログイン (Web3) をSAMLログインと統合できるようになります。SAMLは、Web2でシングルサインオンやその他の関連サービスを提供するために使用される標準です。 これにより、Web2リソースへのアクセスをイーサリアム署名を通じて認証できるようになり、ユーザー属性はアテステーションから取得されます。"
author: Ori Pomerantz
tags: [ "web2", "認証", "eas" ]
skill: beginner
lang: ja
published: 2025-04-30
---

## はじめに

[SAML](https://www.onelogin.com/learn/saml)は、Web2で[IDプロバイダー (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) が[サービスプロバイダー (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\))にユーザー情報を提供するために使用される標準です。

このチュートリアルでは、イーサリアム署名をSAMLと統合し、まだイーサリアムをネイティブにサポートしていないWeb2サービスに対して、ユーザーがイーサリアムウォレットを使用して認証できるようにする方法を学びます。

このチュートリアルは、2つの異なる読者を対象に書かれていることに注意してください。

- イーサリアムを理解していて、SAMLを学ぶ必要があるイーサリアム関係者
- SAMLとWeb2認証を理解していて、イーサリアムを学ぶ必要があるWeb2関係者

そのため、すでにご存知の入門的な内容が多く含まれています。 適宜読み飛ばしてください。

### イーサリアム関係者向けのSAML

SAMLは中央集権型のプロトコルです。 サービスプロバイダー (SP) は、IDプロバイダー (IdP) との間、またはそのIdPの証明書に署名した[証明書認証局](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)との間に、既存の信頼関係がある場合にのみ、IdPからのアサーション (「これは私のユーザーJohnで、A、B、Cを行う権限を持つべきである」など) を受け入れます。

たとえば、SPは企業に旅行サービスを提供する旅行代理店、IdPは企業の社内ウェブサイトであるとします。 従業員が出張の予約をする際、旅行代理店は、実際に旅行の予約を許可する前に、従業員を会社の認証に送ります。

![SAMLプロセスのステップバイステップ](./fig-01-saml.png)

これが、ブラウザ、SP、IdPの3つのエンティティがアクセスを交渉する方法です。 SPは、ブラウザを使用しているユーザーについて事前に何も知る必要はなく、IdPを信頼するだけで済みます。

### SAML関係者向けのイーサリアム

イーサリアムは分散型システムです。

![イーサリアムのログオン](./fig-02-eth-logon.png)

ユーザーは秘密鍵を持っています (通常はブラウザ拡張機能に保存されています)。 秘密鍵から公開鍵を導出し、そこから20バイトのアドレスを導出できます。 ユーザーがシステムにログインする必要がある場合、ノンス (1回限りの値) を持つメッセージに署名するよう要求されます。 サーバーは、署名がそのアドレスによって作成されたことを検証できます。

![アテステーションから追加データを取得](./fig-03-eas-data.png)

署名はイーサリアムアドレスを検証するだけです。 他のユーザー属性を取得するには、通常[アテステーション](https://attest.org/)を使用します。 アテステーションには通常、以下のフィールドがあります。

- **証明者**、アテステーションを行ったアドレス
- **受取人**、アテステーションが適用されるアドレス
- **データ**、名前や権限など、証明されるデータ
- **スキーマ**、データの解釈に使用されるスキーマのID。

イーサリアムの分散型の性質により、どのユーザーでもアテステーションを作成できます。 どのアテステーションが信頼できるかを判断するには、証明者のIDが重要です。

## セットアップ

最初のステップは、SAML SPとSAML IdPが互いに通信できるようにすることです。

1. ソフトウェアをダウンロードします。 この記事のサンプルソフトウェアは、[github](https://github.com/qbzzt/250420-saml-ethereum)にあります。 異なるステージは異なるブランチに保存されています。このステージでは `saml-only` を使用します。

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. 自己署名証明書でキーを作成します。 これは、キーがそれ自体の証明書認証局であることを意味し、サービスプロバイダーに手動でインポートする必要があります。 詳細については、[OpenSSLのドキュメント](https://docs.openssl.org/master/man1/openssl-req/)を参照してください。

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. サーバー (SPとIdPの両方) を起動します。

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/)でSPにアクセスし、ボタンをクリックしてIdP (ポート3001) にリダイレクトします。

5. IdPにメールアドレスを入力し、**サービスプロバイダーにログイン**をクリックします。 サービスプロバイダー (ポート3000) にリダイレクトされ、メールアドレスで認識されていることを確認します。

### 詳細な説明

ステップバイステップで起こることは次のとおりです。

![イーサリアムを使用しない通常のSAMLログオン](./fig-04-saml-no-eth.png)

#### src/config.mts

このファイルには、IDプロバイダーとサービスプロバイダー両方の設定が含まれています。 通常、これら2つは異なるエンティティですが、ここでは簡潔にするためにコードを共有します。

```typescript
const fs = await import("fs")

const protocol="http"
```

今のところテストだけなので、HTTPを使用して問題ありません。

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

通常は両方のコンポーネントで利用可能な公開鍵 (直接信頼されるか、信頼された証明書認証局によって署名される) を読み取ります。

```typescript
export const spPort = 3000
export const spHostname = "localhost"
export const spDir = "sp"

export const idpPort = 3001
export const idpHostname = "localhost"
export const idpDir = "idp"

export const spUrl = `${protocol}://${spHostname}:${spPort}/${spDir}`
export const idpUrl = `${protocol}://${idpHostname}:${idpPort}/${idpDir}`
```

両コンポーネントのURLです。

```typescript
export const spPublicData = {
```

サービスプロバイダーの公開データです。

```typescript
    entityID: `${spUrl}/metadata`,
```

慣例的に、SAMLでは`entityID`はエンティティのメタデータが利用可能なURLです。 このメタデータはここの公開データに対応しますが、XML形式である点が異なります。

```typescript
    wantAssertionsSigned: true,
    authnRequestsSigned: false,
    signingCert: spCert,
    allowCreate: true,
    assertionConsumerService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: `${spUrl}/assertion`,
    }]
  }
```

私たちの目的にとって最も重要な定義は `assertionConsumerServer` です。 これは、サービスプロバイダーに何かをアサートする (例えば、「この情報を送信するユーザーは somebody@example.com です」) ためには、URL `http://localhost:3000/sp/assertion` に [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) を使用する必要があることを意味します。

```typescript
export const idpPublicData = {
    entityID: `${idpUrl}/metadata`,
    signingCert: idpCert,
    wantAuthnRequestsSigned: false,
    singleSignOnService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/login`
    }],
    singleLogoutService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/logout`
    }],
  }
```

IDプロバイダーの公開データも同様です。 これは、ユーザーをログインさせるには `http://localhost:3001/idp/login` にPOSTし、ユーザーをログアウトさせるには `http://localhost:3001/idp/logout` にPOSTすることを指定しています。

#### src/sp.mts

これはサービスプロバイダーを実装するコードです。

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAMLを実装するために [`samlify`](https://www.npmjs.com/package/samlify) ライブラリを使用します。

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` ライブラリは、XMLが正しいこと、期待される公開鍵で署名されていることなどを検証するパッケージを必要とします。 この目的のために [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) を使用します。

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`express`](https://expressjs.com/)の [`Router`](https://expressjs.com/en/5x/api.html#router)は、ウェブサイト内にマウントできる「ミニウェブサイト」です。 この場合、すべてのサービスプロバイダーの定義をグループ化するために使用します。

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

サービスプロバイダー自身の表現は、すべての公開データと、情報に署名するために使用する秘密鍵です。

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

公開データには、サービスプロバイダーがIDプロバイダーについて知る必要があるすべてのものが含まれています。

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

他のSAMLコンポーネントとの相互運用性を確保するため、サービスプロバイダーとIDプロバイダーは、公開データ (メタデータと呼ばれる) をXML形式で `/metadata` にて利用可能にする必要があります。

```typescript
spRouter.post(`/assertion`,
```

これは、ブラウザが自身を識別するためにアクセスするページです。 アサーションにはユーザー識別子 (ここではメールアドレスを使用) が含まれ、追加の属性を含めることもできます。 これは、上記のシーケンス図のステップ7のハンドラです。

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

コメントアウトされたコマンドを使用して、アサーションで提供されるXMLデータを確認できます。 これは[base64でエンコード](https://en.wikipedia.org/wiki/Base64)されています。

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

IDサーバーからのログインリクエストを解析します。

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hello ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

ユーザーにログインが成功したことを示すために、HTMLレスポンスを送信します。

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

失敗した場合は、ユーザーに通知します。

```typescript
spRouter.get('/login',
```

ブラウザがこのページを取得しようとするときに、ログインリクエストを作成します。 これは、上記のシーケンス図のステップ1のハンドラです。

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

ログインリクエストをPOSTするための情報を取得します。

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

このページは、フォーム (下記参照) を自動的に送信します。 これにより、ユーザーはリダイレクトされるために何もする必要がありません。 これは、上記のシーケンス図のステップ2です。

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (IDプロバイダーエンドポイントのURL) にPOSTします。

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

入力名は `loginRequest.type` (`SAMLRequest`) です。 そのフィールドのコンテンツは `loginRequest.context` で、これもbase64エンコードされたXMLです。

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[このミドルウェア](https://expressjs.com/en/5x/api.html#express.urlencoded) は [HTTPリクエスト](https://www.tutorialspoint.com/http/http_requests.htm)のボディを読み取ります。 ほとんどのリクエストはそれを必要としないため、Expressはデフォルトでそれを無視します。 POSTはボディを使用するため、これが必要です。

```typescript
app.use(`/${config.spDir}`, spRouter)
```

サービスプロバイダーディレクトリ (`/sp`) にルーターをマウントします。

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           ここをクリックしてログオン
        </button>
      </body>
    </html>
  `)
})
```

ブラウザがルートディレクトリを取得しようとした場合は、ログインページへのリンクを提供します。

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

このExpressアプリケーションで `spPort` をリッスンします。

#### src/idp.mts

これはIDプロバイダーです。 これはサービスプロバイダーと非常によく似ており、以下の説明は異なる部分についてです。

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

サービスプロバイダーから受け取ったXMLリクエストを読み取り、理解する必要があります。

```typescript
const getLoginPage = requestId => `
```

この関数は、上記のシーケンス図のステップ4で返される、自動送信フォーム付きのページを作成します。

```typescript
<html>
  <head>
    <title>ログインページ</title>
  </head>
  <body>
    <h2>ログインページ</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      メールアドレス: <input name="email" />
      <br />
      <button type="Submit">
        サービスプロバイダーにログイン
      </button>
```

サービスプロバイダーに送信するフィールドは2つあります。

1. 応答する `requestId`。
2. ユーザー識別子 (ここではユーザーが提供するメールアドレスを使用)。

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

これは、上記のシーケンス図のステップ5のハンドラです。 [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125)はログインレスポンスを作成します。

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

オーディエンスはサービスプロバイダーです。

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

リクエストから抽出された情報です。 リクエストで重要なパラメータはrequestIdで、これによりサービスプロバイダーはリクエストとそのレスポンスを一致させることができます。

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

レスポンスに署名するためのデータを持つために `signingKey` が必要です。 サービスプロバイダーは署名されていないリクエストを信頼しません。

```typescript
    },
    "post",
    {
      email: req.body.email
```

これは、サービスプロバイダーに送り返すユーザー情報を持つフィールドです。

```typescript
    }
  );

  res.send(`
    <html>
      <body>
        <script>
          window.onload = function () { document.forms[0].submit(); }
        </script>
        
        <form method="post" action="${loginResponse.entityEndpoint}">
          <input type="hidden" name="${loginResponse.type}" value="${loginResponse.context}" />
        </form>
      </body>
    </html>
  `)
})
```

ここでも、自動送信フォームを使用します。 これは、上記のシーケンス図のステップ6です。

```typescript

// ログインリクエスト用のIdPエンドポイント
idpRouter.post(`/login`,
```

これはサービスプロバイダーからログインリクエストを受け取るエンドポイントです。 これは、上記のシーケンス図のステップ3のハンドラです。

```typescript
  async (req, res) => {
    try {
      // parseLoginRequestが動作しなかったための回避策
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

[`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144)を使用して認証リクエストのIDを読み取ることができるはずです。 しかし、動作させることができず、それに多くの時間を費やす価値もなかったので、[汎用XMLパーサー](https://www.npmjs.com/package/fast-xml-parser)を使用します。 必要な情報は、XMLのトップレベルにある `<samlp:AuthnRequest>` タグ内の `ID` 属性です。

## イーサリアム署名の使用

ユーザーIDをサービスプロバイダーに送信できるようになったので、次のステップは信頼できる方法でユーザーIDを取得することです。 Viemを使用すると、ウォレットにユーザーアドレスを尋ねるだけで済みますが、これはブラウザに情報を要求することを意味します。 私たちはブラウザを制御していないため、そこから得られる応答を自動的に信頼することはできません。

代わりに、IdPはブラウザに署名するための文字列を送信します。 ブラウザのウォレットがこの文字列に署名すれば、それが本当にそのアドレスであること (つまり、そのアドレスに対応する秘密鍵を知っていること) を意味します。

これを実際に確認するには、既存のIdPとSPを停止し、次のコマンドを実行します。

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

次に、[SP](http://localhost:3000)にアクセスし、指示に従ってください。

この時点では、イーサリアムアドレスからメールアドレスを取得する方法がわからないため、代わりに `<イーサリアムアドレス>@bad.email.address` をSPに報告します。

### 詳細な説明

変更点は、前の図のステップ4-5にあります。

![イーサリアム署名付きSAML](./fig-05-saml-w-signature.png)

変更したファイルは `idp.mts` だけです。 以下が変更された部分です。

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

これら2つの追加ライブラリが必要です。 [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)値を作成するために [`uuid`](https://www.npmjs.com/package/uuid) を使用します。 値自体は問題ではなく、一度しか使用されないという事実が重要です。

[`viem`](https://viem.sh/) ライブラリを使用すると、イーサリアムの定義を使用できます。 ここでは、署名が実際に有効であることを検証するためにこれが必要です。

```typescript
const loginPrompt = "サービスプロバイダーにアクセスするには、このノンスに署名してください: "
```

ウォレットは、ユーザーにメッセージに署名する許可を求めます。 ノンスだけのメッセージはユーザーを混乱させる可能性があるため、このプロンプトを含めます。

```typescript
// ここにrequestIDを保持する
let nonces = {}
```

応答するためには、リクエスト情報が必要です。 リクエストと一緒に送信し (ステップ4)、それを受け取る (ステップ5) こともできます。 しかし、潜在的に敵対的なユーザーの制御下にあるブラウザから得られる情報は信頼できません。 したがって、ノンスをキーとしてここに保存する方が良いでしょう。

簡潔さのために、ここでは変数としてこれを行っていることに注意してください。 ただし、これにはいくつかの欠点があります。

- サービス拒否攻撃に対して脆弱です。 悪意のあるユーザーが複数回ログオンを試み、メモリを使い果たす可能性があります。
- IdPプロセスを再起動する必要がある場合、既存の値を失います。
- 各プロセスが独自の変数を持つため、複数のプロセス間で負荷分散を行うことはできません。

本番システムでは、データベースを使用し、何らかの有効期限メカニズムを実装します。

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

ノンスを作成し、後で使用するために `requestId` を保存します。

```typescript
  return `
<html>
  <head>
    <script type="module">
```

このJavaScriptは、ページが読み込まれると自動的に実行されます。

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

`viem`からいくつかの関数が必要です。

```typescript
      if (!window.ethereum) {
          alert("MetaMaskまたは互換性のあるウォレットをインストールしてからリロードしてください")
      }
```

ブラウザにウォレットがある場合にのみ機能します。

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

ウォレット (`window.ethereum`) からアカウントのリストを要求します。 少なくとも1つあると仮定し、最初のものだけを保存します。

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ブラウザウォレットとやり取りするための[ウォレットクライアント](https://viem.sh/docs/clients/wallet)を作成します。

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

ユーザーにメッセージへの署名を依頼します。 このHTML全体が[テンプレート文字列](https://viem.sh/docs/clients/wallet)内にあるため、idpプロセスで定義された変数を使用できます。 これはシーケンス図のステップ4.5です。

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` にリダイレクトします。 これはシーケンス図のステップ5です。

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

署名はブラウザから返送されますが、これは潜在的に悪意のある可能性があります (ブラウザで `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` を開くのを止めるものは何もありません)。 したがって、IdPプロセスが不正な署名を正しく処理することを確認することが重要です。

```typescript
    </script>
  </head>
  <body>
    <h2>署名してください</h2>
    <button onClick="window.goodSignature()">
      良好な (有効な) 署名を送信
    </button>
    <br/>
    <button onClick="window.badSignature()">
      不正な (無効な) 署名を送信
    </button>
  </body>
</html>  
`
}
```

残りは標準のHTMLです。

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

これはシーケンス図のステップ5のハンドラです。

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

リクエストIDを取得し、再利用されないように `nonces` からノンスを削除します。

```typescript
  try {
```

署名が無効になる方法が非常に多いため、これを `try ...` でラップします。 catch`ブロックで、スローされたエラーをキャッチします。

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

シーケンス図のステップ5.5を実装するには、[`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) を使用します。

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

ハンドラの残りの部分は、1つの小さな変更を除いて、以前に `/loginSubmitted` ハンドラで行ったことと同等です。

```typescript
  const loginResponse = await idp.createLoginResponse(
      .
      .
      .
    {
      email: req.params.account + "@bad.email.address"
    }
  );
```

実際のメールアドレスは持っていないので (次のセクションで取得します)、今のところはイーサリアムアドレスを返し、それがメールアドレスではないことを明確にマークします。

```typescript
// ログインリクエスト用のIdPエンドポイント
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // parseLoginRequestが動作しなかったための回避策
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('SAMLレスポンスの処理中にエラーが発生しました:', err);
      res.status(400).send('SAML認証に失敗しました');
    }
  }
)
```

ステップ3のハンドラでは、`getLoginPage` の代わりに `getSignaturePage` を使用します。

## メールアドレスの取得

次のステップは、サービスプロバイダーによって要求された識別子であるメールアドレスを取得することです。 そのためには、[Ethereum Attestation Service (EAS)](https://attest.org/) を使用します。

アテステーションを取得する最も簡単な方法は、[GraphQL API](https://docs.attest.org/docs/developer-tools/api)を使用することです。 このクエリを使用します。

```
query GetAttestationsByRecipient {
  attestations(
    where: { 
      recipient: { equals: "${getAddress(ethAddr)}" }
      schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
    }
    take: 1
  ) { 
    data
    id
    attester
  }
}
```

この[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)には、メールアドレスのみが含まれます。 このクエリは、このスキーマのアテステーションを要求します。 アテステーションのサブジェクトは `recipient` と呼ばれます。 これは常にイーサリアムアドレスです。

警告：ここでアテステーションを取得する方法には、2つのセキュリティ上の問題があります。

- 中央集権的なコンポーネントであるAPIエンドポイント `https://optimism.easscan.org/graphql` にアクセスしています。 `id`属性を取得し、オンチェーンでルックアップしてアテステーションが本物であることを確認できますが、APIエンドポイントは、アテステーションについて通知しないことで、依然としてアテステーションを検閲できます。

  この問題は解決不可能ではありません。独自のGraphQLエンドポイントを実行し、チェーンログからアテステーションを取得できますが、私たちの目的には過剰です。

- 私たちは証明者のIDを見ていません。 誰でも偽の情報を私たちに与えることができます。 実際の環境では、信頼できる証明者のセットを持ち、彼らのアテステーションのみを参照します。

これを実際に確認するには、既存のIdPとSPを停止し、次のコマンドを実行します。

```sh
git checkout email-address
pnpm install
pnpm start
```

次に、メールアドレスを入力します。 これを行うには2つの方法があります。

- 秘密鍵を使用してウォレットをインポートし、テスト用の秘密鍵 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` を使用します。

- 自分のメールアドレスにアテステーションを追加します。

  1. アテステーションエクスプローラーの[スキーマ](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)に移動します。

  2. **スキーマで証明**をクリックします。

  3. 受信者としてイーサリアムアドレスを入力し、メールアドレスとしてメールアドレスを入力し、**オンチェーン**を選択します。 次に、**アテステーションを作成**をクリックします。

  4. ウォレットでトランザクションを承認します。 ガスを支払うために、[Optimism Blockchain](https://app.optimism.io/bridge/deposit)にETHが必要です。

どちらの場合も、これを行った後、[http://localhost:3000](http://localhost:3000) にアクセスして指示に従ってください。 テスト用の秘密鍵をインポートした場合、受け取るメールは `test_addr_0@example.com` です。 独自のアドレスを使用した場合は、証明した内容になります。

### 詳細な説明

![イーサリアムアドレスからメールアドレスへの変換](./fig-06-saml-sig-n-email.png)

新しいステップはGraphQL通信、ステップ5.6と5.7です。

再度、`idp.mts`の変更部分を示します。

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

必要なライブラリをインポートします。

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[各ブロックチェーンに個別のエンドポイント](https://docs.attest.org/docs/developer-tools/api)があります。

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

エンドポイントのクエリに使用できる新しい`GraphQLClient`クライアントを作成します。

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQLは、バイトを持つ不透明なデータオブジェクトのみを提供します。 それを理解するためにはスキーマが必要です。

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

イーサリアムアドレスからメールアドレスを取得する関数です。

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

これはGraphQLクエリです。

```typescript
      アテステーション(
```

アテステーションを探しています。

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

必要なアテステーションは、私たちのスキーマにあり、受信者が`getAddress(ethAddr)`であるものです。 [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress)関数は、アドレスが正しい[チェックサム](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)を持つことを保証します。 GraphQLは大文字と小文字を区別するため、これは必要です。 「0xBAD060A7」、「0xBad060A7」、および「0xbad060a7」は異なる値です。

```typescript
        take: 1
```

見つかったアテステーションの数に関係なく、最初のものだけが必要です。

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

受け取りたいフィールドです。

- `attester`: アテステーションを送信したアドレス。 通常、これはアテステーションを信頼するかどうかを決定するために使用されます。
- `id`: アテステーションID。 この値を使用して、[アテステーションをオンチェーンで読み取り](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64)、GraphQLクエリからの情報が正しいことを確認できます。
- `data`: スキーマデータ (この場合はメールアドレス)。

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

アテステーションがない場合は、明らかに不正であるが、サービスプロバイダーには有効に見える値を返します。

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

値がある場合は、`decodeData`を使用してデータをデコードします。 提供されるメタデータは不要で、値自体のみが必要です。

```typescript
  const loginResponse = await idp.createLoginResponse(
    sp, 
    {
      .
      .
      .
    },
    "post",
    {
      email: await ethereumAddressToEmail(req.params.account)
    }
  );
```

新しい関数を使用してメールアドレスを取得します。

## 分散化については？

この構成では、イーサリアムとメールアドレスのマッピングに信頼できる証明者に依存している限り、ユーザーは他人になりすますことはできません。 しかし、私たちのIDプロバイダーは依然として中央集権的なコンポーネントです。 IDプロバイダーの秘密鍵を持っている人は誰でも、サービスプロバイダーに偽の情報を送信できます。

[マルチパーティ計算 (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) を使用した解決策があるかもしれません。 将来のチュートリアルでそれについて書きたいと思っています。

## まとめ

イーサリアム署名のようなログオン標準の採用は、鶏が先か卵が先かの問題に直面します。 サービスプロバイダーは、可能な限り広い市場にアピールしたいと考えています。 ユーザーは、ログオン標準のサポートを心配することなく、サービスにアクセスできることを望んでいます。
イーサリアムIdPなどのアダプターを作成することは、このハードルを乗り越えるのに役立ちます。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
