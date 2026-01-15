---
title: 使用以太坊进行 web2 身份验证
description: 阅读本教程后，开发者将能够把以太坊登录 (web3) 与 SAML 登录集成。SAML 是 web2 中用于提供单点登录和其他相关服务的标准。 这允许通过以太坊签名对访问 web2 资源的请求进行身份验证，用户属性则来自认证。
author: Ori Pomerantz
tags: [ "web2", "认证", "eas" ]
skill: beginner
lang: zh
published: 2025-04-30
---

## 简介

[SAML](https://www.onelogin.com/learn/saml) 是 web2 中使用的一种标准，允许[身份提供者 (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) 为[服务提供者 (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) 提供用户信息。

在本教程中，您将学习如何将以太坊签名与 SAML 集成，以允许用户使用其以太坊钱包向尚不支持原生以太坊的 web2 服务进行身份验证。

请注意，本教程面向两类不同的受众：

- 了解以太坊并需要学习 SAML 的以太坊人士
- 了解 SAML 和 web2 身份验证并需要学习以太坊的 Web2 人士

因此，本教程会包含许多您已了解的介绍性材料。 您可以随意跳过。

### 面向以太坊人士的 SAML

SAML 是一种中心化协议。 服务提供者 (SP) 仅在与身份提供者 (IdP) 或签署 IdP 证书的[证书颁发机构](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)存在预先信任关系时，才会接受来自 IdP 的断言（例如“这是我的用户 John，他应有权执行 A、B 和 C”）。

例如，SP 可以是为公司提供差旅服务的旅行社，而 IdP 可以是公司的内部网站。 当员工需要预订商务差旅时，旅行社会先将他们发送至公司进行身份验证，然后才允许他们实际预订差旅。

![SAML 流程分步说明](./fig-01-saml.png)

这就是浏览器、SP 和 IdP 这三个实体协商访问权限的方式。 SP 无需提前了解任何有关使用浏览器的用户的信息，只需信任 IdP 即可。

### 面向 SAML 人士的以太坊

以太坊是一个去中心化系统。

![以太坊登录](./fig-02-eth-logon.png)

用户拥有私钥（通常保存在浏览器扩展程序中）。 您可以从私钥派生出公钥，再从公钥派生出 20 字节的地址。 当用户需要登录系统时，系统会要求他们使用随机数（一次性值）签署一条信息。 服务器可以验证签名是由该地址创建的。

![从认证中获取额外数据](./fig-03-eas-data.png)

签名仅验证以太坊地址。 要获取其他用户属性，您通常会使用[认证](https://attest.org/)。 一份认证通常包含以下字段：

- **认证者**，进行认证的地址
- **接收者**，认证适用的地址
- **数据**，被认证的数据，例如姓名、权限等。
- **模式**，用于解释数据的模式 ID。

由于以太坊的去中心化特性，任何用户都可以创建认证。 认证者的身份对于确定哪些认证是可靠的至关重要。

## 设置

第一步是让 SAML SP 和 SAML IdP 能够相互通信。

1. 下载软件。 本文的示例软件[在 Github 上](https://github.com/qbzzt/250420-saml-ethereum)。 不同阶段存储在不同分支中，此阶段您需要 `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. 使用自签名证书创建密钥。 这意味着该密钥本身就是其证书颁发机构，需要手动将其导入服务提供者。 有关详细信息，请参阅 [OpenSSL 文档](https://docs.openssl.org/master/man1/openssl-req/)。

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. 启动服务器（SP 和 IdP）

    ```sh
    pnpm start
    ```

4. 浏览到 SP 的 URL [http://localhost:3000/](http://localhost:3000/)，然后单击按钮重定向到 IdP（端口 3001）。

5. 向 IdP 提供您的电子邮件地址，然后单击**登录服务提供者**。 您会看到您被重定向回服务提供者（端口 3000），并且它通过您的电子邮件地址识别了您。

### 详细说明

以下是分步说明：

![没有以太坊的常规 SAML 登录](./fig-04-saml-no-eth.png)

#### src/config.mts

此文件包含身份提供者和服务提供者的配置。 通常这两者是不同的实体，但为了简单起见，我们可以在这里共享代码。

```typescript
const fs = await import("fs")

const protocol="http"
```

我们目前只是在测试，所以使用 HTTP 没问题。

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

读取公钥，公钥通常对两个组件都可用（可以直接信任，也可以由受信任的证书颁发机构签名）。

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

按照惯例，在 SAML 中，`entityID` 是实体的元数据所在的 URL。 此元数据对应于此处的公共数据，但其格式为 XML。

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

对我们来说，最重要的定义是 `assertionConsumerServer`。 它意味着，要向服务提供者断言某事（例如，“向您发送此信息的用户是 somebody@example.com”），我们需要使用 [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) 到 URL `http://localhost:3000/sp/assertion`。

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

身份提供者的公共数据是类似的。 它指定要登录用户，您需要 POST 到 `http://localhost:3001/idp/login`，要注销用户，则 POST 到 `http://localhost:3001/idp/logout`。

#### src/sp.mts

这是实现服务提供者的代码。

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

我们使用 [`samlify`](https://www.npmjs.com/package/samlify) 程序库来实现 SAML。

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` 程序库需要一个包来验证 XML 是否正确、是否使用预期的公钥签名等。 为此，我们使用 [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)。

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) 是一个可以挂载在网站内部的“迷你网站”。 在本例中，我们用它将所有服务提供者的定义组合在一起。

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

服务提供者自身的表示是所有的公共数据以及用于签署信息的私钥。

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

公共数据包含服务提供者需要了解的关于身份提供者的一切信息。

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

为了实现与其他 SAML 组件的互操作性，服务和身份提供者应在 `/metadata` 中以 XML 格式提供其公共数据（称为元数据）。

```typescript
spRouter.post(`/assertion`,
```

这是浏览器用来标识自己的页面。 断言包括用户标识符（此处我们使用电子邮件地址），并且可以包括其他属性。 这是上述序列图中步骤 7 的处理程序。

```typescript
  async (req, res) => {
    // console.log(`SAML 响应：\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

您可以使用注释掉的命令来查看断言中提供的 XML 数据。 它经过 [base64 编码](https://en.wikipedia.org/wiki/Base64)。

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

解析来自身份服务器的登录请求。

```typescript
      res.send(`
        <html>
          <body>
            <h2>你好 ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

发送 HTML 响应，只是为了向用户显示我们已成功登录。

```typescript
    } catch (err) {
      console.error('处理 SAML 响应时出错：', err);
      res.status(400).send('SAML 身份验证失败');
    }
  }
)
```

如果失败，通知用户。

```typescript
spRouter.get('/login',
```

当浏览器尝试获取此页面时，创建一个登录请求。 这是上述序列图中步骤 1 的处理程序。

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

获取信息以发布登录请求。

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

此页面会自动提交表单（见下文）。 这样，用户无需执行任何操作即可被重定向。 这是上述序列图中的步骤 2。

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

POST 到 `loginRequest.entityEndpoint`（身份提供者端点的 URL）。

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

输入名称为 `loginRequest.type` (`SAMLRequest`)。 该字段的内容是 `loginRequest.context`，它也是经过 base64 编码的 XML。

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[此中间件](https://expressjs.com/en/5x/api.html#express.urlencoded) 读取 [HTTP 请求](https://www.tutorialspoint.com/http/http_requests.htm)的正文。 默认情况下，express 会忽略它，因为大多数请求都不需要它。 我们需要它，因为 POST 会使用正文。

```typescript
app.use(`/${config.spDir}`, spRouter)
```

将路由器挂载在服务提供者目录 (`/sp`) 中。

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           点击此处登录
        </button>
      </body>
    </html>
  `)
})
```

如果浏览器尝试获取根目录，请为其提供一个指向登录页面的链接。

```typescript
app.listen(config.spPort, () => {
  console.log(`服务提供者正在运行于 http://${config.spHostname}:${config.spPort}`)
})
```

使用此 express 应用监听 `spPort`。

#### src/idp.mts

这是身份提供者。 它与服务提供者非常相似，下面的解释针对的是不同的部分。

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

此函数创建带有自动提交表单的页面，该页面在上述序列图的步骤 4 中返回。

```typescript
<html>
  <head>
    <title>登录页面</title>
  </head>
  <body>
    <h2>登录页面</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      电子邮件地址： <input name="email" />
      <br />
      <button type="Submit">
        登录到服务提供者
      </button>
```

我们发送给服务提供者两个字段：

1. 我们正在响应的 `requestId`。
2. 用户标识符（我们目前使用用户提供的电子邮件地址）。

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

这是上述序列图中步骤 5 的处理程序。 [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) 创建登录响应。

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

受众是服务提供者。

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

从请求中提取的信息。 我们在请求中关心的唯一参数是 requestId，它让服务提供者能够匹配请求及其响应。

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // 确保签名
```

我们需要 `signingKey` 来获取签署响应的数据。 服务提供者不信任未签名的请求。

```typescript
    },
    "post",
    {
      email: req.body.email
```

这是我们发送回服务提供者的包含用户信息的字段。

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

同样，使用自动提交的表单。 这是上述序列图中的步骤 6。

```typescript

// 用于登录请求的 IdP 端点
idpRouter.post(`/login`,
```

这是接收来自服务提供者的登录请求的端点。 这是上述序列图中的步骤 3 的处理程序。

```typescript
  async (req, res) => {
    try {
      // 权宜之计，因为我无法让 parseLoginRequest 工作。
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

我们应该能够使用 [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) 来读取身份验证请求的 ID。 然而，我无法使其正常工作，也不值得花太多时间在这上面，所以我只是用了一个[通用的 XML 解析器](https://www.npmjs.com/package/fast-xml-parser)。 我们需要的信息是 `<samlp:AuthnRequest>` 标签内的 `ID` 属性，它位于 XML 的顶层。

## 使用以太坊签名

既然我们能将用户身份发送到服务提供者，下一步就是以可信的方式获取用户身份。 Viem 允许我们直接向钱包请求用户地址，但这相当于向浏览器请求信息。 我们无法控制浏览器，所以我们不能自动信任从它那里得到的响应。

因此，IdP 将向浏览器发送一个字符串以供签名。 如果浏览器中的钱包签署了这个字符串，就意味着它确实是那个地址（也就是说，它知道与该地址对应的私钥）。

要看到此操作的实际效果，请停止现有的 IdP 和 SP，然后运行以下命令：

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

然后浏览[到 SP](http://localhost:3000) 并按照指示操作。

请注意，此时我们不知道如何从以太坊地址获取电子邮件地址，因此我们向 SP 报告 `<ethereum address>@bad.email.address`。

### 详细说明

更改在前一个图中的步骤 4-5。

![带以太坊签名的 SAML](./fig-05-saml-w-signature.png)

我们唯一更改的文件是 `idp.mts`。 以下是更改的部分。

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

我们需要这两个额外的程序库。 我们使用 [`uuid`](https://www.npmjs.com/package/uuid) 来创建[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)值。 值本身不重要，重要的是它只使用一次。

[`viem`](https://viem.sh/) 程序库让我们能够使用以太坊定义。 这里我们需要它来验证签名是否确实有效。

```typescript
const loginPrompt = "要访问服务提供者，请签署此随机数："
```

钱包会请求用户允许签署该信息。 只包含随机数的信息可能会让用户感到困惑，所以我们加入了这个提示。

```typescript
// 在此处保留 requestID
let nonces = {}
```

我们需要请求信息才能对其做出响应。 我们可以在请求时发送它（步骤 4），然后在响应时接收它（步骤 5）。 然而，我们不能信任从浏览器获得的信息，因为它可能受恶意用户的控制。 所以最好将其存储在这里，以随机数作为密钥。

请注意，为简单起见，我们在此将其作为变量。 然而，这有几个缺点：

- 我们容易受到拒绝服务攻击。 恶意用户可以多次尝试登录，从而耗尽我们的内存。
- 如果 IdP 进程需要重新启动，我们就会丢失现有的值。
- 我们无法在多个进程之间进行负载均衡，因为每个进程都有自己的变量。

在生产系统上，我们会使用数据库并实现某种过期机制。

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

创建一个随机数，并存储 `requestId` 以备将来使用。

```typescript
  return `
<html>
  <head>
    <script type="module">
```

此 JavaScript 在页面加载时自动执行。

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

我们需要 `viem` 中的几个函数。

```typescript
      if (!window.ethereum) {
          alert("请安装 MetaMask 或兼容的钱包，然后重新加载")
      }
```

我们只有在浏览器上有钱包的情况下才能工作。

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

向钱包 (`window.ethereum`) 请求帐户列表。 假设至少有一个，并且只存储第一个。

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

创建一个[钱包客户端](https://viem.sh/docs/clients/wallet)以与浏览器钱包交互。

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

请求用户签署一条信息。 因为整个 HTML 都在一个[模板字符串](https://viem.sh/docs/clients/wallet)中，我们可以使用在 idp 进程中定义的变量。 这是序列图中的步骤 4.5。

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

重定向到 `/idp/signature/<nonce>/<address>/<signature>`。 这是序列图中的步骤 5。

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

签名由浏览器发回，而浏览器可能是恶意的（没有什么能阻止你在浏览器中直接打开 `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`）。 因此，验证 IdP 进程能否正确处理不良签名非常重要。

```typescript
    </script>
  </head>
  <body>
    <h2>请签名</h2>
    <button onClick="window.goodSignature()">
      提交一个好的（有效的）签名
    </button>
    <br/>
    <button onClick="window.badSignature()">
      提交一个坏的（无效的）签名
    </button>
  </body>
</html>  
`
}
```

其余的只是标准 HTML。

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

这是序列图中的步骤 5 的处理程序。

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("错误的随机数")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

获取请求 ID，并从 `nonces` 中删除该随机数以确保其不能被重用。

```typescript
  try {
```

因为签名无效的方式有很多，所以我们将此包装在 `try ...` 中。 `catch` 区块以捕获任何抛出的错误。

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

使用 [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) 实现序列图中的步骤 5.5。

```typescript
    if (!validSignature)
      throw("签名无效")
  } catch (err) {
    res.send("错误：" + err)
    return ;
  }
```

处理程序的其余部分与我们之前在 `/loginSubmitted` 处理程序中所做的相同，只有一个小改动。

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

我们没有实际的电子邮件地址（我们将在下一节中获取），因此暂时返回以太坊地址，并明确标记它不是电子邮件地址。

```typescript
// 用于登录请求的 IdP 端点
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // 权宜之计，因为我无法让 parseLoginRequest 工作。
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('处理 SAML 响应时出错：', err);
      res.status(400).send('SAML 身份验证失败');
    }
  }
)
```

在步骤 3 的处理程序中，现在使用 `getSignaturePage` 代替 `getLoginPage`。

## 获取电子邮件地址

下一步是获取服务提供者请求的标识符，即电子邮件地址。 为此，我们使用[以太坊认证服务 (EAS)](https://attest.org/)。

获取认证的最简单方法是使用 [GraphQL 应用程序接口](https://docs.attest.org/docs/developer-tools/api)。 我们使用以下查询：

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

此 [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) 仅包含一个电子邮件地址。 此查询请求此模式的认证。 认证的主题称为 `recipient`。 它总是一个以太坊地址。

警告：我们在这里获取认证的方式存在两个安全问题。

- 我们访问的 API 端点 `https://optimism.easscan.org/graphql` 是一个中心化组件。 我们可以获取 `id` 属性，然后在链上进行查找以验证认证是否真实，但 API 端点仍然可以通过不告知我们某些认证来对其进行审查。

  这个问题并非无法解决，我们可以运行自己的 GraphQL 端点，并从链上日志中获取认证，但这对于我们的目的来说过于繁琐。

- 我们不查看认证者身份。 任何人都可以向我们提供虚假信息。 在实际实现中，我们会有一组受信任的认证者，并且只查看他们的认证。

要看到此操作的实际效果，请停止现有的 IdP 和 SP，然后运行以下命令：

```sh
git checkout email-address
pnpm install
pnpm start
```

然后提供您的电子邮件地址。 您有两种方法可以做到这一点：

- 使用私钥导入钱包，并使用测试私钥 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`。

- 为您的电子邮件地址添加认证：

  1. 在认证浏览器中浏览到[该模式](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)。

  2. 单击**用模式认证**。

  3. 输入您的以太坊地址作为接收者，您的电子邮件地址作为 email address，并选择**链上**。 然后单击**创建认证**。

  4. 在您的钱包中批准交易。 您需要在 [Optimism 区块链](https://app.optimism.io/bridge/deposit)上有一些 ETH 来支付燃料费。

无论哪种方式，完成后请浏览至 [http://localhost:3000](http://localhost:3000) 并按照指示操作。 如果您导入了测试私钥，您收到的电子邮件将是 `test_addr_0@example.com`。 如果您使用自己的地址，它应该是您认证的任何内容。

### 详细说明

![从以太坊地址到电子邮件的转换](./fig-06-saml-sig-n-email.png)

新的步骤是 GraphQL 通信，即步骤 5.6 和 5.7。

同样，以下是 `idp.mts` 的更改部分。

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

导入我们需要的程序库。

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

GraphQL 只给我们一个包含字节的不透明数据对象。 为了理解它，我们需要模式。

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

一个从以太坊地址转换到电子邮件地址的函数。

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

这是一个 GraphQL 查询。

```typescript
      认证(
```

我们正在寻找认证。

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

我们想要的认证是那些在我们模式中，接收者是 `getAddress(ethAddr)` 的认证。 [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) 函数确保我们的地址具有正确的[校验和](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)。 这对于 GraphQL 来说是必要的，因为它是大小写敏感的。 "0xBAD060A7"、"0xBad060A7" 和 "0xbad060a7" 是不同的值。

```typescript
        take: 1
```

无论我们找到多少认证，我们都只想要第一个。

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

我们想要接收的字段。

- `attester`：提交认证的地址。 通常这用于决定是否信任认证。
- `id`：认证 ID。 您可以使用此值[在链上读取认证](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64)以验证 GraphQL 查询中的信息是否正确。
- `data`：模式数据（在本例中为电子邮件地址）。

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

如果没有认证，则返回一个明显不正确但对服务提供者来说看似有效的值。

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

如果存在值，则使用 `decodeData` 解码数据。 我们不需要它提供的元数据，只需要值本身。

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

## 去中心化呢？

在这种配置下，只要我们依赖可信的认证者进行以太坊到电子邮件地址的映射，用户就无法冒充他们不是的人。 然而，我们的身份提供者仍然是一个中心化组件。 任何拥有身份提供者私钥的人都可以向服务提供者发送虚假信息。

可能有一个使用[多方计算 (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) 的解决方案。 我希望在未来的教程中写到它。

## 总结

采用像以太坊签名这样的登录标准面临着一个“先有鸡还是先有蛋”的问题。 服务提供商希望吸引尽可能广泛的市场。 用户希望能够访问服务，而不必担心支持他们的登录标准。
创建适配器，例如以太坊 IdP，可以帮助我们克服这个障碍。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
