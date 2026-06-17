---
title: "Web2認証にイーサリアムを使用する"
description: "このチュートリアルを読むと、開発者はイーサリアムログイン（Web3）を、シングルサインオンやその他の関連サービスを提供するためにWeb2で使用される標準であるSAMLログインと統合できるようになります。これにより、イーサリアムの署名を通じてWeb2リソースへのアクセスを認証し、ユーザー属性をアテステーションから取得できるようになります。"
author: "オリ・ポメランツ"
tags:
  - Web2
  - 認証
  - EAS
skill: beginner
breadcrumb: "Web2認証のためのイーサリアム"
lang: ja
published: 2025-04-30
---

## はじめに {#introduction}

[SAML](https://www.onelogin.com/learn/saml)は、[アイデンティティプロバイダー（IdP）](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)が[サービスプロバイダー（SP）](https://en.wikipedia.org/wiki/Service_provider_(SAML)にユーザー情報を提供できるようにするためにWeb2で使用される標準です。

このチュートリアルでは、イーサリアムの署名をSAMLと統合し、ユーザーがイーサリアムウォレットを使用して、まだイーサリアムをネイティブにサポートしていないWeb2サービスで自分自身を認証できるようにする方法を学びます。

なお、このチュートリアルは2つの異なる読者層に向けて書かれています。

- イーサリアムを理解しており、SAMLを学ぶ必要があるイーサリアム関係者
- SAMLとWeb2認証を理解しており、イーサリアムを学ぶ必要があるWeb2関係者

その結果、すでに知っている入門的な内容が多く含まれることになります。必要に応じて読み飛ばしてください。

### イーサリアム関係者向けのSAML {#saml-for-ethereum-people}

SAMLは中央集権型のプロトコルです。サービスプロバイダー（SP）は、アイデンティティプロバイダー（IdP）との間、またはそのIdPの証明書に署名した[認証局](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)との間に既存の信頼関係がある場合にのみ、IdPからのアサーション（「これは私のユーザーであるJohnであり、A、B、Cを行う権限を持つべきである」など）を受け入れます。

例えば、SPは企業に旅行サービスを提供する旅行代理店であり、IdPは企業の社内ウェブサイトである場合があります。従業員が出張を予約する必要がある場合、旅行代理店は実際に旅行を予約させる前に、企業による認証のために従業員を送信します。

![Step by step SAML process](./fig-01-saml.png)

これは、ブラウザ、SP、IdPの3つのエンティティがアクセスを交渉する方法です。SPは、ブラウザを使用しているユーザーについて事前に何も知る必要はなく、IdPを信頼するだけで済みます。

### SAML関係者向けのイーサリアム {#ethereum-for-saml-people}

イーサリアムは分散型システムです。

![Ethereum logon](./fig-02-eth-logon.png)

ユーザーは秘密鍵（通常はブラウザ拡張機能に保持されます）を持っています。秘密鍵から公開鍵を導出でき、そこから20バイトのアドレスを導出できます。ユーザーがシステムにログインする必要がある場合、ナンス（1回限りの値）を含むメッセージに署名するよう求められます。サーバーは、その署名がそのアドレスによって作成されたことを検証できます。

![Getting extra data from attestations](./fig-03-eas-data.png)

署名はイーサリアムのアドレスのみを検証します。他のユーザー属性を取得するには、通常[アテステーション](https://attest.org/)を使用します。アテステーションには通常、以下のフィールドがあります。

- **Attestor**（アテスター）: アテステーションを行ったアドレス
- **Recipient**（受信者）: アテステーションが適用されるアドレス
- **Data**（データ）: 名前、権限など、証明されるデータ
- **Schema**（スキーマ）: データを解釈するために使用されるスキーマのID

イーサリアムの分散型の性質により、どのユーザーでもアテステーションを行うことができます。どのアテステーションを信頼できると見なすかを特定するためには、アテスターの身元が重要です。

## セットアップ {#setup}

最初のステップは、SAML SPとSAML IdPが相互に通信できるようにすることです。

1. ソフトウェアをダウンロードします。この記事のサンプルソフトウェアは[GitHub上](https://github.com/qbzzt/250420-saml-ethereum)にあります。異なるステージは異なるブランチに保存されており、このステージでは`saml-only`が必要です。

<HTML-PLACEHOLDER-CODEBLOCK-0d06f2>
git clone https://github.com/qbzzt/saml-eth-idp.git
cd saml-eth-idp
git checkout stage-1
yarn
</HTML-PLACEHOLDER-CODEBLOCK-0d06f2>

2. 自己署名証明書を使用して鍵を作成します。これは、鍵がそれ自身の認証局であることを意味し、サービスプロバイダーに手動でインポートする必要があります。詳細については、[OpenSSLのドキュメント](https://docs.openssl.org/master/man1/openssl-req/)を参照してください。

<HTML-PLACEHOLDER-CODEBLOCK-dd0c06>
openssl req -x509 -newkey rsa:4096 -keyout src/idp-private-key.pem -out src/idp-public-cert.pem -days 365 -nodes
openssl req -x509 -newkey rsa:4096 -keyout src/sp-private-key.pem -out src/sp-public-cert.pem -days 365 -nodes
</HTML-PLACEHOLDER-CODEBLOCK-dd0c06>

3. サーバー（SPとIdPの両方）を起動します。

<HTML-PLACEHOLDER-CODEBLOCK-b529d2>
yarn start
</HTML-PLACEHOLDER-CODEBLOCK-b529d2>

4. URL [http://localhost:3000/](http://localhost:3000/) でSPにアクセスし、ボタンをクリックしてIdP（ポート3001）にリダイレクトされます。

5. IdPにメールアドレスを提供し、**Login to the service provider**をクリックします。サービスプロバイダー（ポート3000）にリダイレクトされ、メールアドレスによってあなたが認識されていることを確認します。

### 詳細な説明 {#detailed-explanation}

ステップバイステップで何が起こるかを説明します。

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

このファイルには、アイデンティティプロバイダーとサービスプロバイダーの両方の設定が含まれています。通常、これら2つは異なるエンティティですが、ここでは簡略化のためにコードを共有できます。

<HTML-PLACEHOLDER-CODEBLOCK-bdbdcd>
// 簡略化のために、SPとIdPの両方の設定をここに置きます。
// 実際のシステムでは、これらは別々のエンティティになります。

import fs from "fs"

// テスト中なので、HTTPを使用しても問題ありません。
const spUrl = "http://localhost:3000"
const idpUrl = "http://localhost:3001"
</HTML-PLACEHOLDER-CODEBLOCK-bdbdcd>

今のところテスト中なので、HTTPを使用しても問題ありません。

<HTML-PLACEHOLDER-CODEBLOCK-8434af>
// 公開鍵を読み込みます。これらは通常、両方のコンポーネントで利用可能です
// （直接信頼されるか、信頼できる認証局によって署名されています）。
const idpPubKey = fs.readFileSync("src/idp-public-cert.pem", "utf8")
const spPubKey = fs.readFileSync("src/sp-public-cert.pem", "utf8")
</HTML-PLACEHOLDER-CODEBLOCK-8434af>

公開鍵を読み込みます。これは通常、両方のコンポーネントで利用可能です（直接信頼されるか、信頼できる認証局によって署名されています）。

<HTML-PLACEHOLDER-CODEBLOCK-844139>
// サービスプロバイダーの公開データ
export const spPublicData = {
  entityID: `${spUrl}/sp/metadata`,
  assertionConsumerService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${spUrl}/sp/acs`,
    },
  ],
  signingCertificates: [spPubKey],
}
</HTML-PLACEHOLDER-CODEBLOCK-844139>

両方のコンポーネントのURLです。

<HTML-PLACEHOLDER-CODEBLOCK-44646b>
// サービスプロバイダーの公開データ
export const spPublicData = {
  entityID: `${spUrl}/sp/metadata`,
  assertionConsumerService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${spUrl}/sp/acs`,
    },
  ],
  signingCertificates: [spPubKey],
}
</HTML-PLACEHOLDER-CODEBLOCK-44646b>

サービスプロバイダーの公開データです。

<HTML-PLACEHOLDER-CODEBLOCK-32634d>
  entityID: `${spUrl}/sp/metadata`,
</HTML-PLACEHOLDER-CODEBLOCK-32634d>

慣例として、SAMLでは`entityID`はエンティティのメタデータが利用可能なURLです。このメタデータは、XML形式であることを除いて、ここでの公開データに対応します。

<HTML-PLACEHOLDER-CODEBLOCK-fb27cf>
  assertionConsumerService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${spUrl}/sp/acs`,
    },
  ],
</HTML-PLACEHOLDER-CODEBLOCK-fb27cf>

私たちの目的において最も重要な定義は`assertionConsumerServer`です。これは、サービスプロバイダーに何かをアサートする（例えば、「この情報を送信するユーザーはsomebody@example.comである」）には、URL `http://localhost:3000/sp/assertion`に対して[HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp)を使用する必要があることを意味します。

<HTML-PLACEHOLDER-CODEBLOCK-49d264>
// アイデンティティプロバイダーの公開データ
export const idpPublicData = {
  entityID: `${idpUrl}/idp/metadata`,
  singleSignOnService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/idp/sso`,
    },
  ],
  singleLogoutService: [
    {
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/idp/slo`,
    },
  ],
  signingCertificates: [idpPubKey],
}
</HTML-PLACEHOLDER-CODEBLOCK-49d264>

アイデンティティプロバイダーの公開データも同様です。ユーザーをログインさせるには`http://localhost:3001/idp/login`にPOSTし、ユーザーをログアウトさせるには`http://localhost:3001/idp/logout`にPOSTすることを指定しています。

#### src/sp.mts {#srcspmts}

これはサービスプロバイダーを実装するコードです。

<HTML-PLACEHOLDER-CODEBLOCK-c33ecb>
import * as samlify from "samlify"
</HTML-PLACEHOLDER-CODEBLOCK-c33ecb>

SAMLを実装するために[`samlify`](https://www.npmjs.com/package/samlify)ライブラリを使用します。

<HTML-PLACEHOLDER-CODEBLOCK-512f04>
import * as validator from "@authenio/samlify-node-xmllint"

samlify.setSchemaValidator(validator)
</HTML-PLACEHOLDER-CODEBLOCK-512f04>

`samlify`ライブラリは、XMLが正しいこと、期待される公開鍵で署名されていることなどを検証するパッケージがあることを想定しています。この目的のために[`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)を使用します。

<HTML-PLACEHOLDER-CODEBLOCK-c21825>
import express from "express"
const spRouter = express.Router()
</HTML-PLACEHOLDER-CODEBLOCK-c21825>

[`express`](https://expressjs.com/)の[`Router`](https://expressjs.com/en/5x/api.html#router)は、ウェブサイト内にマウントできる「ミニウェブサイト」です。この場合、すべてのサービスプロバイダーの定義をグループ化するために使用します。

<HTML-PLACEHOLDER-CODEBLOCK-35bd89>
import fs from "fs"
import { spPublicData, idpPublicData } from "./config.mjs"

const sp = samlify.ServiceProvider({
  ...spPublicData,
  privateKey: fs.readFileSync("src/sp-private-key.pem", "utf8"),
})
</HTML-PLACEHOLDER-CODEBLOCK-35bd89>

サービスプロバイダー自身の表現は、すべての公開データと、情報に署名するために使用する秘密鍵です。

<HTML-PLACEHOLDER-CODEBLOCK-622d64>
const idp = samlify.IdentityProvider(idpPublicData)
</HTML-PLACEHOLDER-CODEBLOCK-622d64>

公開データには、サービスプロバイダーがアイデンティティプロバイダーについて知る必要があるすべてが含まれています。

<HTML-PLACEHOLDER-CODEBLOCK-97a6ea>
spRouter.get("/metadata", (req, res) => {
  res.header("Content-Type", "text/xml").send(sp.getMetadata())
})
</HTML-PLACEHOLDER-CODEBLOCK-97a6ea>

他のSAMLコンポーネントとのインターオペラビリティを可能にするために、サービスプロバイダーとアイデンティティプロバイダーは、公開データ（メタデータと呼ばれます）をXML形式で`/metadata`で利用できるようにする必要があります。

<HTML-PLACEHOLDER-CODEBLOCK-443d45>
spRouter.post("/acs", async (req, res) => {
  try {
    // console.log(Buffer.from(req.body.SAMLResponse, 'base64').toString('utf8'))
</HTML-PLACEHOLDER-CODEBLOCK-443d45>

これは、ブラウザが自身を識別するためにアクセスするページです。アサーションにはユーザー識別子（ここではメールアドレスを使用）が含まれ、追加の属性を含めることができます。これは、上記のシーケンス図のステップ7のハンドラーです。

<HTML-PLACEHOLDER-CODEBLOCK-a4ff9a>
    // console.log(Buffer.from(req.body.SAMLResponse, 'base64').toString('utf8'))
</HTML-PLACEHOLDER-CODEBLOCK-a4ff9a>

コメントアウトされたコマンドを使用して、アサーションで提供されたXMLデータを確認できます。これは[Base64エンコード](https://en.wikipedia.org/wiki/Base64)されています。

<HTML-PLACEHOLDER-CODEBLOCK-0bebb4>
    const { extract } = await sp.parseLoginResponse(idp, "post", req)
</HTML-PLACEHOLDER-CODEBLOCK-0bebb4>

アイデンティティサーバーからのログインリクエストを解析します。

<HTML-PLACEHOLDER-CODEBLOCK-5e64b2>
    res.send(`
      <html>
        <body>
          <h1>Login successful</h1>
          <p>Welcome, ${extract.nameID}</p>
        </body>
      </html>
    `)
</HTML-PLACEHOLDER-CODEBLOCK-5e64b2>

ログインを受け取ったことをユーザーに示すために、HTMLレスポンスを送信します。

<HTML-PLACEHOLDER-CODEBLOCK-1c7539>
  } catch (e) {
    console.error(e)
    res.status(500).send("Login failed")
  }
})
</HTML-PLACEHOLDER-CODEBLOCK-1c7539>

失敗した場合はユーザーに通知します。

<HTML-PLACEHOLDER-CODEBLOCK-82c7f3>
spRouter.get("/login", (req, res) => {
</HTML-PLACEHOLDER-CODEBLOCK-82c7f3>

ブラウザがこのページを取得しようとしたときにログインリクエストを作成します。これは、上記のシーケンス図のステップ1のハンドラーです。

<HTML-PLACEHOLDER-CODEBLOCK-bf195e>
  const { id, context } = sp.createLoginRequest(idp, "redirect")
</HTML-PLACEHOLDER-CODEBLOCK-bf195e>

ログインリクエストをPOSTするための情報を取得します。

<HTML-PLACEHOLDER-CODEBLOCK-995827>
  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
</HTML-PLACEHOLDER-CODEBLOCK-995827>

このページはフォーム（下記参照）を自動的に送信します。これにより、ユーザーはリダイレクトされるために何もする必要がありません。これは、上記のシーケンス図のステップ2です。

<HTML-PLACEHOLDER-CODEBLOCK-bc73e1>
        <form method="post" action="${context.split("?")[0]}">
</HTML-PLACEHOLDER-CODEBLOCK-bc73e1>

`loginRequest.entityEndpoint`（アイデンティティプロバイダーのエンドポイントのURL）にPOSTします。

<HTML-PLACEHOLDER-CODEBLOCK-98e356>
          <input type="hidden" name="SAMLRequest" value="${
            context.split("=")[1]
          }" />
          <input type="submit" value="Login" />
        </form>
      </body>
    </html>
  `)
})
</HTML-PLACEHOLDER-CODEBLOCK-98e356>

入力名は`loginRequest.type`（`SAMLRequest`）です。そのフィールドのコンテンツは`loginRequest.context`であり、これもBase64エンコードされたXMLです。

<HTML-PLACEHOLDER-CODEBLOCK-c69100>
const app = express()
app.use(express.urlencoded({ extended: true }))
</HTML-PLACEHOLDER-CODEBLOCK-c69100>

[このミドルウェア](https://expressjs.com/en/5x/api.html#express.urlencoded)は、[HTTPリクエスト](https://www.tutorialspoint.com/http/http_requests.htm)のボディを読み取ります。ほとんどのリクエストでは必要ないため、デフォルトではExpressはこれを無視します。POSTはボディを使用するため、これが必要です。

<HTML-PLACEHOLDER-CODEBLOCK-f23133>
app.use("/sp", spRouter)
</HTML-PLACEHOLDER-CODEBLOCK-f23133>

サービスプロバイダーのディレクトリ（`/sp`）にルーターをマウントします。

<HTML-PLACEHOLDER-CODEBLOCK-5328af>
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Service Provider</h1>
        <a href="/sp/login">Login</a>
      </body>
    </html>
  `)
})
</HTML-PLACEHOLDER-CODEBLOCK-5328af>

ブラウザがルートディレクトリを取得しようとした場合、ログインページへのリンクを提供します。

<HTML-PLACEHOLDER-CODEBLOCK-fce654>
app.listen(3000, () => {
  console.log("SP listening on port 3000")
})
</HTML-PLACEHOLDER-CODEBLOCK-fce654>

このExpressアプリケーションで`spPort`をリッスンします。

#### src/idp.mts {#srcidpmts}

これはアイデンティティプロバイダーです。サービスプロバイダーと非常に似ており、以下の説明は異なる部分に関するものです。

<HTML-PLACEHOLDER-CODEBLOCK-fc9d79>
import { XMLParser } from "fast-xml-parser"
const parser = new XMLParser({ ignoreAttributes: false })
</HTML-PLACEHOLDER-CODEBLOCK-fc9d79>

サービスプロバイダーから受け取るXMLリクエストを読み取り、理解する必要があります。

<HTML-PLACEHOLDER-CODEBLOCK-8b41ef>
const loginPage = (reqId: string) => `
  <html>
    <body>
      <h1>Identity Provider</h1>
      <form method="post" action="/idp/login">
</HTML-PLACEHOLDER-CODEBLOCK-8b41ef>

この関数は、上記のシーケンス図のステップ4で返される、自動送信フォームを含むページを作成します。

<HTML-PLACEHOLDER-CODEBLOCK-8c32a0>
        <input type="hidden" name="reqId" value="${reqId}" />
        <input type="text" name="email" placeholder="Email" />
</HTML-PLACEHOLDER-CODEBLOCK-8c32a0>

サービスプロバイダーに送信するフィールドは2つあります。

1. 応答している`requestId`。
2. ユーザー識別子（今のところ、ユーザーが提供するメールアドレスを使用します）。

<HTML-PLACEHOLDER-CODEBLOCK-84a97a>
idpRouter.post("/login", async (req, res) => {
</HTML-PLACEHOLDER-CODEBLOCK-84a97a>

これは、上記のシーケンス図のステップ5のハンドラーです。[`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125)はログインレスポンスを作成します。

<HTML-PLACEHOLDER-CODEBLOCK-b37d97>
  const { id, context } = await idp.createLoginResponse(
    sp,
</HTML-PLACEHOLDER-CODEBLOCK-b37d97>

オーディエンスはサービスプロバイダーです。

<HTML-PLACEHOLDER-CODEBLOCK-e1adfc>
    {
      extract: {
        request: {
          id: req.body.reqId,
        },
      },
    },
</HTML-PLACEHOLDER-CODEBLOCK-e1adfc>

リクエストから抽出された情報です。リクエストで私たちが気にする唯一のパラメーターはrequestIdであり、これによりサービスプロバイダーはリクエストとそのレスポンスを一致させることができます。

<HTML-PLACEHOLDER-CODEBLOCK-7983d5>
    "post",
</HTML-PLACEHOLDER-CODEBLOCK-7983d5>

レスポンスに署名するためのデータを持つために`signingKey`が必要です。サービスプロバイダーは署名されていないリクエストを信頼しません。

<HTML-PLACEHOLDER-CODEBLOCK-b3b32c>
    {
      nameID: req.body.email,
    }
  )
</HTML-PLACEHOLDER-CODEBLOCK-b3b32c>

これは、サービスプロバイダーに送り返すユーザー情報を含むフィールドです。

<HTML-PLACEHOLDER-CODEBLOCK-19c7e6>
  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="${context.split("?")[0]}">
          <input type="hidden" name="SAMLResponse" value="${
            context.split("=")[1]
          }" />
          <input type="submit" value="Login" />
        </form>
      </body>
    </html>
  `)
})
</HTML-PLACEHOLDER-CODEBLOCK-19c7e6>

ここでも、自動送信フォームを使用します。これは、上記のシーケンス図のステップ6です。

<HTML-PLACEHOLDER-CODEBLOCK-5ea2d2>
idpRouter.post("/sso", async (req, res) => {
</HTML-PLACEHOLDER-CODEBLOCK-5ea2d2>

これは、サービスプロバイダーからログインリクエストを受け取るエンドポイントです。これは、上記のシーケンス図のステップ3のハンドラーです。

<HTML-PLACEHOLDER-CODEBLOCK-71d6a8>
  const xml = Buffer.from(req.body.SAMLRequest, "base64").toString("utf8")
  const parsed = parser.parse(xml)
  const reqId = parsed["samlp:AuthnRequest"]["@_ID"]
  res.send(loginPage(reqId))
})
</HTML-PLACEHOLDER-CODEBLOCK-71d6a8>

認証リクエストのIDを読み取るために[`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144)を使用できるはずです。しかし、私はそれを機能させることができず、多くの時間を費やす価値がなかったため、単に[汎用のXMLパーサー](https://www.npmjs.com/package/fast-xml-parser)を使用しています。必要な情報は、XMLのトップレベルにある`<samlp:AuthnRequest>`タグ内の`ID`属性です。

## イーサリアムの署名を使用する {#using-ethereum-signatures}

ユーザーのアイデンティティをサービスプロバイダーに送信できるようになったので、次のステップは信頼できる方法でユーザーのアイデンティティを取得することです。Viemを使用すると、ウォレットにユーザーのアドレスを尋ねるだけで済みますが、これはブラウザに情報を尋ねることを意味します。私たちはブラウザを制御していないため、ブラウザから得られるレスポンスを自動的に信頼することはできません。

代わりに、IdPはブラウザに署名するための文字列を送信します。ブラウザ内のウォレットがこの文字列に署名した場合、それは本当にそのアドレスである（つまり、そのアドレスに対応する秘密鍵を知っている）ことを意味します。

これを実際に確認するには、既存のIdPとSPを停止し、以下のコマンドを実行します。

<HTML-PLACEHOLDER-CODEBLOCK-0f544f>
git checkout stage-2
yarn
yarn start
</HTML-PLACEHOLDER-CODEBLOCK-0f544f>

次に、[SPにアクセス](http://localhost:3000)し、指示に従います。

現時点では、イーサリアムのアドレスからメールアドレスを取得する方法がわからないため、代わりに`<ethereum address>@bad.email.address`をSPに報告することに注意してください。

### 詳細な説明 {#detailed-explanation-2}

変更点は、前の図のステップ4〜5にあります。

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

変更したファイルは`idp.mts`のみです。変更された部分は以下の通りです。

<HTML-PLACEHOLDER-CODEBLOCK-7a27cc>
import { v4 as uuidv4 } from "uuid"
import { verifyMessage } from "viem"
</HTML-PLACEHOLDER-CODEBLOCK-7a27cc>

これら2つの追加ライブラリが必要です。[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)値を作成するために[`uuid`](https://www.npmjs.com/package/uuid)を使用します。値自体は重要ではなく、1回だけ使用されるという事実が重要です。

[`viem`](https://viem.sh/)ライブラリを使用すると、イーサリアムの定義を使用できます。ここでは、署名が実際に有効であることを検証するために必要です。

<HTML-PLACEHOLDER-CODEBLOCK-8eaf8a>
const loginPage = (nonce: string) => `
  <html>
    <body>
      <h1>Identity Provider</h1>
      <p>Please sign the message in your wallet to log in.</p>
</HTML-PLACEHOLDER-CODEBLOCK-8eaf8a>

ウォレットは、メッセージに署名する許可をユーザーに求めます。単なるナンスであるメッセージはユーザーを混乱させる可能性があるため、このプロンプトを含めます。

<HTML-PLACEHOLDER-CODEBLOCK-42b5e3>
const reqIds: Record<string, string> = {}
</HTML-PLACEHOLDER-CODEBLOCK-42b5e3>

リクエストに応答できるようにするために、リクエスト情報が必要です。リクエストと一緒に送信し（ステップ4）、送り返してもらう（ステップ5）こともできます。しかし、潜在的に悪意のあるユーザーの制御下にあるブラウザから得られる情報を信頼することはできません。そのため、ナンスをキーとしてここに保存する方が良いでしょう。

簡略化のために、ここでは変数として行っていることに注意してください。ただし、これにはいくつかの欠点があります。

- サービス拒否攻撃に対して脆弱です。悪意のあるユーザーが複数回ログオンを試み、メモリをいっぱいに埋め尽くす可能性があります。
- IdPプロセスを再起動する必要がある場合、既存の値を失います。
- それぞれが独自の変数を持つことになるため、複数のプロセス間で負荷分散を行うことはできません。

本番システムでは、データベースを使用し、何らかの有効期限メカニズムを実装します。

<HTML-PLACEHOLDER-CODEBLOCK-08cb7a>
idpRouter.post("/sso", async (req, res) => {
  const xml = Buffer.from(req.body.SAMLRequest, "base64").toString("utf8")
  const parsed = parser.parse(xml)
  const reqId = parsed["samlp:AuthnRequest"]["@_ID"]
  const nonce = uuidv4()
  reqIds[nonce] = reqId
  res.send(loginPage(nonce))
})
</HTML-PLACEHOLDER-CODEBLOCK-08cb7a>

ナンスを作成し、将来の使用のために`requestId`を保存します。

<HTML-PLACEHOLDER-CODEBLOCK-a44764>
      <script type="module">
</HTML-PLACEHOLDER-CODEBLOCK-a44764>

このJavaScriptは、ページが読み込まれたときに自動的に実行されます。

<HTML-PLACEHOLDER-CODEBLOCK-7321fb>
        import { createWalletClient, custom } from 'https://esm.sh/viem'
</HTML-PLACEHOLDER-CODEBLOCK-7321fb>

`viem`からいくつかの関数が必要です。

<HTML-PLACEHOLDER-CODEBLOCK-aadfd4>
        if (!window.ethereum) {
          alert('Please install a wallet to log in.')
          window.location.reload()
        }
</HTML-PLACEHOLDER-CODEBLOCK-aadfd4>

ブラウザにウォレットがある場合にのみ機能します。

<HTML-PLACEHOLDER-CODEBLOCK-6fc23d>
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
</HTML-PLACEHOLDER-CODEBLOCK-6fc23d>

ウォレットからアカウントのリストをリクエストします（`window.ethereum`）。少なくとも1つあると仮定し、最初のものだけを保存します。

<HTML-PLACEHOLDER-CODEBLOCK-02ba6e>
        const client = createWalletClient({
          account,
          transport: custom(window.ethereum)
        })
</HTML-PLACEHOLDER-CODEBLOCK-02ba6e>

ブラウザのウォレットと対話するための[ウォレットクライアント](https://viem.sh/docs/clients/wallet)を作成します。

<HTML-PLACEHOLDER-CODEBLOCK-a744de>
        const signature = await client.signMessage({ message: "${nonce}" })
</HTML-PLACEHOLDER-CODEBLOCK-a744de>

ユーザーにメッセージへの署名を求めます。このHTML全体が[テンプレート文字列](https://viem.sh/docs/clients/wallet)内にあるため、idpプロセスで定義された変数を使用できます。これはシーケンス図のステップ4.5です。

<HTML-PLACEHOLDER-CODEBLOCK-6be23b>
        window.location.href = \`/idp/login?nonce=${nonce}&signature=\${signature}&account=\${account}\`
</HTML-PLACEHOLDER-CODEBLOCK-6be23b>

`/idp/signature/<nonce>/<address>/<signature>`にリダイレクトします。これはシーケンス図のステップ5です。

<HTML-PLACEHOLDER-CODEBLOCK-c02327>
      </script>
</HTML-PLACEHOLDER-CODEBLOCK-c02327>

署名はブラウザによって送り返されますが、ブラウザは潜在的に悪意がある可能性があります（ブラウザで単に`http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`を開くことを止めるものは何もありません）。したがって、IdPプロセスが不正な署名を正しく処理することを検証することが重要です。

<HTML-PLACEHOLDER-CODEBLOCK-cc675c>
    </body>
  </html>
`
</HTML-PLACEHOLDER-CODEBLOCK-cc675c>

残りは単なる標準的なHTMLです。

<HTML-PLACEHOLDER-CODEBLOCK-d6317a>
idpRouter.get("/login", async (req, res) => {
</HTML-PLACEHOLDER-CODEBLOCK-d6317a>

これはシーケンス図のステップ5のハンドラーです。

<HTML-PLACEHOLDER-CODEBLOCK-cedfd8>
  const nonce = req.query.nonce as string
  const reqId = reqIds[nonce]
  delete reqIds[nonce]
</HTML-PLACEHOLDER-CODEBLOCK-cedfd8>

リクエストIDを取得し、再利用できないように`nonces`からナンスを削除します。

<HTML-PLACEHOLDER-CODEBLOCK-5dc2c9>
  try {
</HTML-PLACEHOLDER-CODEBLOCK-5dc2c9>

署名が無効になる可能性のある方法は非常に多いため、スローされたエラーをキャッチするためにこれを`try ... catch`ブロックでラップします。

<HTML-PLACEHOLDER-CODEBLOCK-71a7b9>
    const valid = await verifyMessage({
      address: req.query.account as `0x${string}`,
      message: nonce,
      signature: req.query.signature as `0x${string}`,
    })
    if (!valid) {
      throw new Error("Invalid signature")
    }
</HTML-PLACEHOLDER-CODEBLOCK-71a7b9>

シーケンス図のステップ5.5を実装するために[`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage)を使用します。

<HTML-PLACEHOLDER-CODEBLOCK-908a1c>
    const { id, context } = await idp.createLoginResponse(
      sp,
      {
        extract: {
          request: {
            id: reqId,
          },
        },
      },
      "post",
      {
        nameID: `${req.query.account} (not an email)`,
      }
    )
</HTML-PLACEHOLDER-CODEBLOCK-908a1c>

ハンドラーの残りの部分は、1つの小さな変更を除いて、以前に`/loginSubmitted`ハンドラーで行ったことと同等です。

<HTML-PLACEHOLDER-CODEBLOCK-0f1ccb>
        nameID: `${req.query.account} (not an email)`,
</HTML-PLACEHOLDER-CODEBLOCK-0f1ccb>

実際のメールアドレスは持っていないため（次のセクションで取得します）、今のところはイーサリアムのアドレスを返し、それがメールアドレスではないことを明確にマークします。

<HTML-PLACEHOLDER-CODEBLOCK-7cfcfb>
idpRouter.post("/sso", async (req, res) => {
</HTML-PLACEHOLDER-CODEBLOCK-7cfcfb>

ステップ3のハンドラーで、`getLoginPage`の代わりに`getSignaturePage`を使用するようになりました。

## メールアドレスの取得 {#getting-the-email-address}

次のステップは、サービスプロバイダーから要求された識別子であるメールアドレスを取得することです。そのために、[Ethereum Attestation Service（EAS）](https://attest.org/)を使用します。

アテステーションを取得する最も簡単な方法は、[GraphQL API](https://docs.attest.org/docs/developer-tools/api)を使用することです。以下のクエリを使用します。

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

この[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)にはメールアドレスのみが含まれています。このクエリは、このスキーマのアテステーションを要求します。アテステーションの対象は`recipient`と呼ばれます。これは常にイーサリアムのアドレスです。

警告：ここでアテステーションを取得する方法には、2つのセキュリティ上の問題があります。

- APIエンドポイントである`https://optimism.easscan.org/graphql`にアクセスしていますが、これは中央集権型のコンポーネントです。`id`属性を取得し、オンチェーンでルックアップを行ってアテステーションが本物であることを検証することはできますが、APIエンドポイントはアテステーションについて私たちに伝えないことで、依然としてアテステーションを検閲することができます。

  この問題は解決不可能ではありません。独自のGraphQLエンドポイントを実行し、チェーンのログからアテステーションを取得することもできますが、私たちの目的には過剰です。

- アテスターの身元を確認していません。誰でも私たちに偽の情報を与えることができます。現実世界の実装では、信頼できるアテスターのセットを用意し、彼らのアテステーションのみを確認します。

これを実際に確認するには、既存のIdPとSPを停止し、以下のコマンドを実行します。

<HTML-PLACEHOLDER-CODEBLOCK-c52af0>
git checkout stage-3
yarn
yarn start
</HTML-PLACEHOLDER-CODEBLOCK-c52af0>

次に、メールアドレスを提供します。これを行うには2つの方法があります。

- 秘密鍵を使用してウォレットをインポートし、テスト用の秘密鍵`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`を使用します。

- 自分のメールアドレスのアテステーションを追加します。

  1. [アテステーションエクスプローラーのスキーマ](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)にアクセスします。

  2. **Attest with Schema**をクリックします。

  3. 受信者としてイーサリアムのアドレス、メールアドレスとしてメールアドレスを入力し、**Onchain**を選択します。次に、**Make Attestation**をクリックします。

  4. ウォレットでトランザクションを承認する。ガスの支払いには、[オプティミズムブロックチェーン](https://app.optimism.io/bridge/deposit)上のETHがいくらか必要になります。

いずれにせよ、これを行った後、[http://localhost:3000](http://localhost:3000) にアクセスし、指示に従います。テスト用の秘密鍵をインポートした場合、受け取るメールアドレスは`test_addr_0@example.com`です。自分のアドレスを使用した場合、それはあなたがアテステーションした内容になります。

### 詳細な説明 {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

新しいステップは、GraphQL通信であるステップ5.6と5.7です。

繰り返しになりますが、`idp.mts`の変更された部分は以下の通りです。

<HTML-PLACEHOLDER-CODEBLOCK-c27b33>
import { GraphQLClient, gql } from "graphql-request"
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { getAddress } from "viem"
</HTML-PLACEHOLDER-CODEBLOCK-c27b33>

必要なライブラリをインポートします。

<HTML-PLACEHOLDER-CODEBLOCK-db2ac2>
const EAS_GRAPHQL_URL = "https://optimism.easscan.org/graphql"
</HTML-PLACEHOLDER-CODEBLOCK-db2ac2>

[各ブロックチェーンに個別のエンドポイント](https://docs.attest.org/docs/developer-tools/api)があります。

<HTML-PLACEHOLDER-CODEBLOCK-1c3199>
const graphQLClient = new GraphQLClient(EAS_GRAPHQL_URL)
</HTML-PLACEHOLDER-CODEBLOCK-1c3199>

エンドポイントのクエリに使用できる新しい`GraphQLClient`クライアントを作成します。

<HTML-PLACEHOLDER-CODEBLOCK-9ddcdf>
const schemaEncoder = new SchemaEncoder("string email")
</HTML-PLACEHOLDER-CODEBLOCK-9ddcdf>

GraphQLは、バイトを含む不透明なデータオブジェクトのみを提供します。それを理解するにはスキーマが必要です。

<HTML-PLACEHOLDER-CODEBLOCK-834653>
const getEmail = async (ethAddr: string) => {
</HTML-PLACEHOLDER-CODEBLOCK-834653>

イーサリアムのアドレスからメールアドレスを取得する関数です。

<HTML-PLACEHOLDER-CODEBLOCK-ae4fab>
  const query = gql`
</HTML-PLACEHOLDER-CODEBLOCK-ae4fab>

これはGraphQLクエリです。

<HTML-PLACEHOLDER-CODEBLOCK-b8fe95>
    query GetAttestationsByRecipient {
      attestations(
</HTML-PLACEHOLDER-CODEBLOCK-b8fe95>

アテステーションを探しています。

<HTML-PLACEHOLDER-CODEBLOCK-b0af67>
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
</HTML-PLACEHOLDER-CODEBLOCK-b0af67>

必要なアテステーションは、受信者が`getAddress(ethAddr)`であるスキーマ内のものです。[`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress)関数は、アドレスが正しい[チェックサム](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)を持っていることを確認します。GraphQLは大文字と小文字を区別するため、これが必要です。「0xBAD060A7」、「0xBad060A7」、および「0xbad060a7」は異なる値です。

<HTML-PLACEHOLDER-CODEBLOCK-613f0c>
        take: 1
</HTML-PLACEHOLDER-CODEBLOCK-613f0c>

見つかったアテステーションの数に関係なく、最初のものだけが必要です。

<HTML-PLACEHOLDER-CODEBLOCK-556c29>
      ) { 
        data
        id
        attester
      }
    }
  `
</HTML-PLACEHOLDER-CODEBLOCK-556c29>

受け取りたいフィールドです。

- `attester`: アテステーションを送信したアドレス。通常、これはアテステーションを信頼するかどうかを決定するために使用されます。
- `id`: アテステーションID。この値を使用して[オンチェーンでアテステーションを読み取り](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64)、GraphQLクエリからの情報が正しいことを検証できます。
- `data`: スキーマデータ（この場合はメールアドレス）。

<HTML-PLACEHOLDER-CODEBLOCK-36c109>
  const response: any = await graphQLClient.request(query)

  if (response.attestations.length === 0) {
    return `${ethAddr} (no email attestation)`
  }
</HTML-PLACEHOLDER-CODEBLOCK-36c109>

アテステーションがない場合は、明らかに間違っているが、サービスプロバイダーには有効に見える値を返します。

<HTML-PLACEHOLDER-CODEBLOCK-76a6da>
  const decodedData = schemaEncoder.decodeData(response.attestations[0].data)
  return decodedData[0].value.value
}
</HTML-PLACEHOLDER-CODEBLOCK-76a6da>

値がある場合は、`decodeData`を使用してデータをデコードします。それが提供するメタデータは必要なく、値自体だけが必要です。

<HTML-PLACEHOLDER-CODEBLOCK-94ca7d>
      {
        nameID: await getEmail(req.query.account as string),
      }
</HTML-PLACEHOLDER-CODEBLOCK-94ca7d>

新しい関数を使用してメールアドレスを取得します。

## 分散化についてはどうですか？ {#what-about-decentralization}

この構成では、イーサリアムからメールアドレスへのマッピングについて信頼できるアテスターに依存している限り、ユーザーは自分以外の誰かになりすますことはできません。しかし、私たちのアイデンティティプロバイダーは依然として中央集権型のコンポーネントです。アイデンティティプロバイダーの秘密鍵を持っている人は誰でも、サービスプロバイダーに偽の情報を送信できます。

[マルチパーティ計算（MPC）](https://en.wikipedia.org/wiki/Secure_multi-party_computation)を使用した解決策があるかもしれません。将来のチュートリアルでそれについて書きたいと思います。

## まとめ {#conclusion}

イーサリアムの署名などのログオン標準の採用は、鶏と卵の問題に直面しています。サービスプロバイダーは、可能な限り幅広い市場にアピールしたいと考えています。ユーザーは、自分のログオン標準のサポートを心配することなくサービスにアクセスできることを望んでいます。
イーサリアムIdPなどのアダプターを作成することで、このハードルを乗り越えることができます。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。