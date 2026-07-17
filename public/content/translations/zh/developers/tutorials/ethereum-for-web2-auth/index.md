---
title: "使用以太坊进行 Web2 身份验证"
description: "阅读本教程后，开发者将能够把以太坊登录 (Web3) 与 SAML 登录（Web2 中用于提供单点登录及其他相关服务的标准）集成。这允许通过以太坊签名对 Web2 资源的访问进行身份验证，而用户属性则来自证明。"
author: "奥里·波梅兰茨"
tags:
  - Web2
  - 身份验证
  - eas
skill: beginner
breadcrumb: "以太坊用于 Web2 身份验证"
lang: zh
published: 2025-04-30
---

## 简介 {#introduction}

[SAML](https://www.onelogin.com/learn/saml) 是 Web2 中使用的一种标准，允许[身份提供者 (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)为[服务提供者 (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) 提供用户信息。

在本教程中，你将学习如何将以太坊签名与 SAML 集成，以允许用户使用其以太坊钱包向尚未原生支持以太坊的 Web2 服务进行身份验证。

请注意，本教程是为两类不同的受众编写的：

- 了解以太坊并需要学习 SAML 的以太坊开发者
- 了解 SAML 和 Web2 身份验证并需要学习以太坊的 Web2 开发者

因此，它将包含许多你可能已经了解的介绍性材料。你可以随意跳过这些内容。

### 面向以太坊开发者的 SAML {#saml-for-ethereum-people}

SAML 是一种中心化协议。服务提供者 (SP) 仅在与身份提供者 (IdP) 或签署该 IdP 证书的[证书颁发机构](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)存在预先建立的信任关系时，才会接受来自该 IdP 的断言（例如“这是我的用户 John，他应该拥有执行 A、B 和 C 的权限”）。

例如，SP 可以是为公司提供差旅服务的旅行社，而 IdP 可以是公司的内部网站。当员工需要预订商务旅行时，旅行社会先将他们发送给公司进行身份验证，然后再允许他们实际预订行程。

![Step by step SAML process](./fig-01-saml.png)

这就是浏览器、SP 和 IdP 这三个实体协商访问权限的方式。SP 不需要提前了解使用浏览器的用户的任何信息，只需信任 IdP 即可。

### 面向 SAML 开发者的以太坊 {#ethereum-for-saml-people}

以太坊是一个去中心化的系统。

![Ethereum logon](./fig-02-eth-logon.png)

用户拥有一个私钥（通常保存在浏览器扩展程序中）。从私钥可以推导出公钥，进而推导出一个 20 字节的地址。当用户需要登录系统时，系统会要求他们使用一个随机数（一次性使用的值）对消息进行签名。服务器可以验证该签名是由该地址创建的。

![Getting extra data from attestations](./fig-03-eas-data.png)

签名仅验证以太坊地址。要获取其他用户属性，通常需要使用[证明](https://attest.org/)。证明通常包含以下字段：

- **证明者 (Attestor)**，做出证明的地址
- **接收者 (Recipient)**，证明适用的地址
- **数据 (Data)**，被证明的数据，如姓名、权限等
- **模式 (Schema)**，用于解释数据的模式 ID。

由于以太坊的去中心化特性，任何用户都可以做出证明。证明者的身份对于识别我们认为哪些证明是可靠的非常重要。

## 设置 {#setup}

第一步是让 SAML SP 和 SAML IdP 之间进行通信。

1. 下载软件。本文的示例软件位于 [GitHub 上](https://github.com/qbzzt/250420-saml-ethereum)。不同的阶段存储在不同的分支中，对于此阶段，你需要 `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. 创建带有自签名证书的密钥。这意味着该密钥本身就是其证书颁发机构，需要手动导入到服务提供者中。有关更多信息，请参阅 [OpenSSL 文档](https://docs.openssl.org/master/man1/openssl-req/)。

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. 启动服务器（包括 SP 和 IdP）

    ```sh
    pnpm start
    ```

4. 浏览位于 URL [http://localhost:3000/](http://localhost:3000/) 的 SP，然后单击按钮以重定向到 IdP（端口 3001）。

5. 向 IdP 提供你的电子邮件地址，然后单击 **Login to the service provider**（登录到服务提供者）。你会看到自己被重定向回服务提供者（端口 3000），并且它通过你的电子邮件地址识别出了你。

### 详细解释 {#detailed-explanation}

以下是逐步发生的过程：

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

此文件包含身份提供者和服务提供者的配置。通常这两个是不同的实体，但为了简单起见，我们在这里共享代码。

```typescript
const fs = await import("fs")

const protocol="http"
```

目前我们只是在测试，所以使用 HTTP 就可以了。

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

读取公钥，这些公钥通常对两个组件都可用（并且要么被直接信任，要么由受信任的证书颁发机构签名）。

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

两个组件的 URL。

```typescript
export const spPublicData = {
```

服务提供者的公开数据。

```typescript
    entityID: `${spUrl}/metadata`,
```

按照惯例，在 SAML 中，`entityID` 是可获取实体元数据的 URL。此元数据对应于此处的公开数据，只不过它是 XML 格式的。

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

就我们的目的而言，最重要的定义是 `assertionConsumerServer`。这意味着要向服务提供者断言某些内容（例如，“向你发送此信息的用户是 somebody@example.com”），我们需要使用 [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) 请求 URL `http://localhost:3000/sp/assertion`。

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

身份提供者的公开数据与此类似。它指定要让用户登录，你需要向 `http://localhost:3001/idp/login` 发送 POST 请求；要让用户注销，你需要向 `http://localhost:3001/idp/logout` 发送 POST 请求。

#### src/sp.mts {#srcspmts}

这是实现服务提供者的代码。

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

我们使用 [`samlify`](https://www.npmjs.com/package/samlify) 库来实现 SAML。

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` 库期望有一个包来验证 XML 是否正确、是否使用预期的公钥签名等。我们为此目的使用 [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)。

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) 是一个可以挂载在网站内部的“迷你网站”。在这种情况下，我们使用它将所有服务提供者的定义组合在一起。

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

服务提供者自身的表示形式包括所有的公开数据，以及它用于签署信息的私钥。

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

公开数据包含服务提供者需要了解的关于身份提供者的所有信息。

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

为了实现与其他 SAML 组件的互操作性，服务和身份提供者应在 `/metadata` 中以 XML 格式提供其公开数据（称为元数据）。

```typescript
spRouter.post(`/assertion`,
```

这是浏览器访问以识别自身身份的页面。断言包含用户标识符（这里我们使用电子邮件地址），并且可以包含其他属性。这是上述序列图中第 7 步的处理程序。

```typescript
  async (req, res) => {
    // console.log(`SAML 响应：\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

你可以使用注释掉的命令来查看断言中提供的 XML 数据。它是经过 [Base64 编码](https://en.wikipedia.org/wiki/Base64)的。

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

解析来自身份服务器的登录请求。

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

发送 HTML 响应，只是为了向用户表明我们已收到登录信息。

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

在失败的情况下通知用户。

```typescript
spRouter.get('/login',
```

当浏览器尝试获取此页面时创建一个登录请求。这是上述序列图中第 1 步的处理程序。

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

获取用于发送登录请求的信息。

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

此页面会自动提交表单（见下文）。这样用户无需执行任何操作即可被重定向。这是上述序列图中的第 2 步。

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

向 `loginRequest.entityEndpoint`（身份提供者端点的 URL）发送 POST 请求。

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

输入名称为 `loginRequest.type` (`SAMLRequest`)。该字段的内容是 `loginRequest.context`，它同样是经过 Base64 编码的 XML。

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[此中间件](https://expressjs.com/en/5x/api.html#express.urlencoded)读取 [HTTP 请求](https://www.tutorialspoint.com/http/http_requests.htm)的主体。默认情况下，Express 会忽略它，因为大多数请求不需要它。我们需要它，因为 POST 请求确实使用了主体。

```typescript
app.use(`/${config.spDir}`, spRouter)
```

将路由器挂载到服务提供者目录 (`/sp`) 中。

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Click here to log on
        </button>
      </body>
    </html>
  `)
})
```

如果浏览器尝试获取根目录，则为其提供指向登录页面的链接。

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

使用此 Express 应用程序监听 `spPort`。

#### src/idp.mts {#srcidpmts}

这是身份提供者。它与服务提供者非常相似，下面的解释针对的是不同的部分。

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // 保留属性
    attributeNamePrefix: "@_", // 属性前缀
  }
)
```

我们需要读取并理解从服务提供者收到的 XML 请求。

```typescript
const getLoginPage = requestId => `
```

此函数创建带有自动提交表单的页面，该页面在上述序列图的第 4 步中返回。

```typescript
<html>
  <head>
    <title>Login page</title>
  </head>
  <body>
    <h2>Login page</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Email address: <input name="email" />
      <br />
      <button type="Submit">
        Login to the service provider
      </button>
```

我们向服务提供者发送两个字段：

1. 我们正在响应的 `requestId`。
2. 用户标识符（目前我们使用用户提供的电子邮件地址）。

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

这是上述序列图中第 5 步的处理程序。[`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) 创建登录响应。

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

受众 (audience) 是服务提供者。

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

从请求中提取的信息。我们在请求中关心的唯一参数是 requestId，它使服务提供者能够将请求与其响应进行匹配。

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // 确保签名
```

我们需要 `signingKey` 拥有签署响应的数据。服务提供者不信任未签名的请求。

```typescript
    },
    "post",
    {
      email: req.body.email
```

这是包含我们发送回服务提供者的用户信息的字段。

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

同样，使用自动提交的表单。这是上述序列图中的第 6 步。

```typescript

// 登录请求的 IdP 端点
idpRouter.post(`/login`,
```

这是接收来自服务提供者的登录请求的端点。这是上述序列图中第 3 步的处理程序。

```typescript
  async (req, res) => {
    try {
      // 变通方法，因为我无法让 parseLoginRequest 正常工作。
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

我们应该能够使用 [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) 来读取身份验证请求的 ID。但是，我无法让它正常工作，而且不值得在上面花费大量时间，所以我只是使用了一个[通用的 XML 解析器](https://www.npmjs.com/package/fast-xml-parser)。我们需要的信息是 `<samlp:AuthnRequest>` 标签内的 `ID` 属性，该标签位于 XML 的顶层。

## 使用以太坊签名 {#using-ethereum-signatures}

既然我们已经可以将用户身份发送给服务提供者，下一步就是以可信的方式获取用户身份。Viem 允许我们直接向钱包请求用户地址，但这意味要向浏览器请求信息。我们无法控制浏览器，因此不能自动信任从它那里得到的响应。

相反，IdP 将向浏览器发送一个字符串进行签名。如果浏览器中的钱包对该字符串进行了签名，则意味着它确实是该地址（也就是说，它知道与该地址对应的私钥）。

要查看实际效果，请停止现有的 IdP 和 SP 并运行以下命令：

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

然后浏览[到 SP](http://localhost:3000) 并按照说明进行操作。

请注意，此时我们还不知道如何从以太坊地址获取电子邮件地址，因此我们向 SP 报告 `<ethereum address>@bad.email.address`。

### 详细解释 {#detailed-explanation-2}

更改发生在前面图表中的第 4-5 步。

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

我们唯一更改的文件是 `idp.mts`。以下是更改的部分。

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

我们需要这两个额外的库。我们使用 [`uuid`](https://www.npmjs.com/package/uuid) 来创建[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)值。该值本身并不重要，重要的是它只被使用一次。

[`viem`](https://viem.sh/) 库允许我们使用以太坊定义。在这里，我们需要它来验证签名是否确实有效。

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

钱包会请求用户允许对消息进行签名。仅包含随机数的消息可能会让用户感到困惑，因此我们包含了此提示。

```typescript
// 在此处保留 requestIDs
let nonces = {}
```

我们需要请求信息才能对其进行响应。我们可以将其与请求一起发送（第 4 步），并接收它返回（第 5 步）。但是，我们不能信任从浏览器获取的信息，因为浏览器处于潜在恶意用户的控制之下。因此，最好将其存储在这里，以随机数作为键。

请注意，为了简单起见，我们在这里将其作为一个变量来处理。然而，这有几个缺点：

- 我们容易受到拒绝服务攻击。恶意用户可能会尝试多次登录，从而耗尽我们的内存。
- 如果 IdP 进程需要重启，我们将丢失现有的值。
- 我们无法在多个进程之间进行负载均衡，因为每个进程都有自己的变量。

在生产系统中，我们会使用数据库并实现某种过期机制。

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

创建一个随机数，并存储 `requestId` 供将来使用。

```typescript
  return `
<html>
  <head>
    <script type="module">
```

此 JavaScript 会在页面加载时自动执行。

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

我们需要 `viem` 中的几个函数。

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

只有当浏览器上存在钱包时，我们才能工作。

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

从钱包请求帐户列表 (`window.ethereum`)。假设至少有一个，并且只存储第一个。

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

创建一个[钱包客户端](https://viem.sh/docs/clients/wallet)以与浏览器钱包进行交互。

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

要求用户对消息进行签名。因为整个 HTML 都在一个[模板字符串](https://viem.sh/docs/clients/wallet)中，所以我们可以使用在 idp 进程中定义的变量。这是序列图中的第 4.5 步。

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

重定向到 `/idp/signature/<nonce>/<address>/<signature>`。这是序列图中的第 5 步。

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

签名由浏览器发送回来，这可能是恶意的（没有什么能阻止你直接在浏览器中打开 `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`）。因此，验证 IdP 进程是否正确处理了无效签名非常重要。

```typescript
    </script>
  </head>
  <body>
    <h2>Please sign</h2>
    <button onClick="window.goodSignature()">
      Submit a good (valid) signature
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Submit a bad (invalid) signature
    </button>
  </body>
</html>  
`
}
```

其余的只是标准的 HTML。

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

这是序列图中第 5 步的处理程序。

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

获取请求 ID，并从 `nonces` 中删除随机数，以确保它不能被重复使用。

```typescript
  try {
```

因为签名无效的方式有很多种，所以我们将其包装在 `try ... catch` 块中以捕获任何抛出的错误。

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

使用 [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) 来实现序列图中的第 5.5 步。

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

处理程序的其余部分等同于我们之前在 `/loginSubmitted` 处理程序中所做的操作，只是有一个小改动。

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

我们没有实际的电子邮件地址（我们将在下一节中获取它），因此目前我们返回以太坊地址，并明确将其标记为非电子邮件地址。

```typescript
// 登录请求的 IdP 端点
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // 变通方法，因为我无法让 parseLoginRequest 正常工作。
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

在第 3 步的处理程序中，现在使用 `getSignaturePage` 而不是 `getLoginPage`。

## 获取电子邮件地址 {#getting-the-email-address}

下一步是获取电子邮件地址，即服务提供者请求的标识符。为此，我们使用[以太坊证明服务 (EAS)](https://attest.org/)。

获取证明的最简单方法是使用 [GraphQL API](https://docs.attest.org/docs/developer-tools/api)。我们使用以下查询：

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

此[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)仅包含一个电子邮件地址。此查询请求该模式的证明。证明的主体称为 `recipient`。它始终是一个以太坊地址。

警告：我们在这里获取证明的方式存在两个安全问题。

- 我们访问的是 API 端点 `https://optimism.easscan.org/graphql`，这是一个中心化组件。我们可以获取 `id` 属性，然后在链上进行查找以验证证明是否真实，但 API 端点仍然可以通过不告诉我们来审查证明。

  这个问题并非无法解决，我们可以运行自己的 GraphQL 端点并从链日志中获取证明，但这对于我们的目的来说有些小题大做了。

- 我们没有查看证明者的身份。任何人都可以向我们提供虚假信息。在现实世界的实现中，我们会有一组受信任的证明者，并且只查看他们的证明。

要查看实际效果，请停止现有的 IdP 和 SP 并运行以下命令：

```sh
git checkout email-address
pnpm install
pnpm start
```

然后提供你的电子邮件地址。你有两种方法可以做到这一点：

- 使用私钥导入钱包，并使用测试私钥 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`。

- 为你自己的电子邮件地址添加证明：

  1. 浏览到[证明浏览器中的模式](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)。

  2. 单击 **Attest with Schema**（使用模式进行证明）。

  3. 输入你的以太坊地址作为接收者，输入你的电子邮件地址作为 email address，然后选择 **Onchain**（链上）。接着单击 **Make Attestation**（做出证明）。

  4. 在你的钱包中授权交易。你需要在 [Optimism 区块链](https://app.optimism.io/bridge/deposit)上拥有一些 ETH 来支付 Gas 费用。

无论哪种方式，完成此操作后，请浏览至 [http://localhost:3000](http://localhost:3000) 并按照说明进行操作。如果你导入了测试私钥，你收到的电子邮件将是 `test_addr_0@example.com`。如果你使用了自己的地址，它应该是你所证明的任何内容。

### 详细解释 {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

新的步骤是 GraphQL 通信，即第 5.6 步和第 5.7 步。

同样，以下是 `idp.mts` 中更改的部分。

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

导入我们需要的库。

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[每个区块链都有一个单独的端点](https://docs.attest.org/docs/developer-tools/api)。

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

创建一个新的 `GraphQLClient` 客户端，我们可以用它来查询端点。

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL 只给我们提供了一个包含字节的不透明数据对象。要理解它，我们需要模式。

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

一个从以太坊地址获取电子邮件地址的函数。

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

这是一个 GraphQL 查询。

```typescript
      attestations(
```

我们正在寻找证明。

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

我们想要的证明是那些在我们的模式中，且接收者为 `getAddress(ethAddr)` 的证明。[`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) 函数确保我们的地址具有正确的[校验和](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)。这是必要的，因为 GraphQL 是区分大小写的。“0xBAD060A7”、“0xBad060A7”和“0xbad060a7”是不同的值。

```typescript
        take: 1
```

无论我们找到多少个证明，我们只想要第一个。

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

我们想要接收的字段。

- `attester`：提交证明的地址。通常这用于决定是否信任该证明。
- `id`：证明 ID。你可以使用此值在[链上读取证明](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64)，以验证来自 GraphQL 查询的信息是否正确。
- `data`：模式数据（在本例中为电子邮件地址）。

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

如果没有证明，则返回一个明显不正确的值，但该值对服务提供者来说似乎是有效的。

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

如果有值，则使用 `decodeData` 解码数据。我们不需要它提供的元数据，只需要值本身。

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

使用新函数获取电子邮件地址。

## 去中心化呢？ {#what-about-decentralization}

在这种配置中，只要我们依赖可信的证明者来进行以太坊到电子邮件地址的映射，用户就不能冒充他人。然而，我们的身份提供者仍然是一个中心化组件。任何拥有身份提供者私钥的人都可以向服务提供者发送虚假信息。

可能存在一种使用[多方计算 (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) 的解决方案。我希望在未来的教程中写一写这方面的内容。

## 结论 {#conclusion}

采用诸如以太坊签名之类的登录标准面临着先有鸡还是先有蛋的问题。服务提供者希望吸引尽可能广泛的市场。用户希望能够访问服务，而不必担心是否支持他们的登录标准。
创建适配器（例如以太坊 IdP）可以帮助我们克服这一障碍。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。