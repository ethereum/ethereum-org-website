---
title: "使用以太坊進行 Web2 驗證"
description: "閱讀本教學後，開發者將能夠將以太坊登入 (Web3) 與 SAML 登入整合。SAML 登入是 Web2 中使用的一種標準，可提供單一登入及其他相關服務。 這允許透過以太坊簽章來驗證對 Web2 資源的存取，且使用者屬性來自證明。"
author: Ori Pomerantz
tags: [ "web2", "驗證", "eas" ]
skill: beginner
lang: zh-tw
published: 2025-04-30
---

## 簡介

[SAML](https://www.onelogin.com/learn/saml) 是 Web2 上使用的一種標準，允許[身分提供者 (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) 為[服務提供者 (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) 提供使用者資訊。

在本教學中，您將學習如何將以太坊簽章與 SAML 整合，讓使用者能夠使用其以太坊錢包來對那些尚不原生支援以太坊的 Web2 服務進行身分驗證。

請注意，本教學是為兩種不同的受眾所撰寫：

- 了解以太坊且需要學習 SAML 的以太坊使用者
- 了解 SAML 和 Web2 驗證且需要學習以太坊的 Web2 使用者

因此，本教學會包含許多您已知的入門資料。 您可以隨意跳過。

### 為以太坊使用者介紹 SAML

SAML 是一種中心化協定。 只有在服務提供者 (SP) 與身分提供者 (IdP) 或簽署該 IdP 憑證的[憑證授權單位](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)有預先存在的信任關係時，服務提供者才會接受身分提供者所做的斷言 (例如「這是我的使用者 John，他應該有權限執行 A、B 和 C」)。

例如，SP 可以是為公司提供旅行服務的旅行社，而 IdP 可以是公司的內部網站。 當員工需要預訂商務旅行時，旅行社會在允許他們實際預訂旅行之前，先將他們傳送到公司進行驗證。

![SAML 流程逐步說明](./fig-01-saml.png)

這就是瀏覽器、SP 和 IdP 這三個實體協商存取權限的方式。 SP 不需要事先知道任何關於使用瀏覽器的使用者的資訊，只需要信任 IdP 即可。

### 為 SAML 使用者介紹以太坊

以太坊是去中心化系統。

![以太坊登入](./fig-02-eth-logon.png)

使用者擁有私密金鑰 (通常儲存在瀏覽器擴充功能中)。 您可以從私密金鑰衍生出公鑰，再從公鑰衍生出 20 位元組的地址。 當使用者需要登入系統時，系統會要求他們簽署一則附有 nonce (單次使用值) 的訊息。 伺服器可以驗證該簽章是由該地址所建立。

![從證明中取得額外資料](./fig-03-eas-data.png)

該簽章只會驗證以太坊地址。 若要取得其他使用者屬性，您通常會使用[證明](https://attest.org/)。 證明通常具有以下欄位：

- **證明人**，做出證明的地址
- **接收者**，證明所適用的地址
- **資料**，正在證明的資料，例如姓名、權限等。
- **結構**，用於解譯資料的結構 ID。

由於以太坊的去中心化性質，任何使用者都可以做出證明。 證明人的身分對於識別我們認為哪些證明是可靠的至關重要。

## 設定

第一步是讓 SAML SP 和 SAML IdP 能夠互相通訊。

1. 下載軟體。 本文的範例軟體在 [github](https://github.com/qbzzt/250420-saml-ethereum) 上。 不同的階段儲存在不同的分支中，此階段您需要 `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. 使用自我簽署憑證建立金鑰。 這表示該金鑰本身即是憑證授權單位，需要手動匯入至服務提供者。 如需詳細資訊，請參閱 [OpenSSL 文件](https://docs.openssl.org/master/man1/openssl-req/)。

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. 啟動伺服器 (SP 和 IdP)

    ```sh
    pnpm start
    ```

4. 瀏覽至 SP URL [http://localhost:3000/](http://localhost:3000/)，然後按一下按鈕，重新導向至 IdP (通訊埠 3001)。

5. 向 IdP 提供您的電子郵件地址，然後按一下「**登入服務提供者**」。 確認您已重新導向回服務提供者 (通訊埠 3000)，且服務提供者可透過您的電子郵件地址識別您的身分。

### 詳細說明

以下是逐步發生的情況：

![不含以太坊的一般 SAML 登入](./fig-04-saml-no-eth.png)

#### src/config.mts

此檔案包含身分提供者和服務提供者的組態。 通常這兩者是不同的實體，但為了簡便起見，我們在此共用程式碼。

```typescript
const fs = await import("fs")

const protocol="http"
```

目前我們只是在測試，所以使用 HTTP 沒問題。

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

讀取公鑰，公鑰通常可供兩個元件使用 (直接信任，或由受信任的憑證授權單位簽署)。

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

這兩個元件的 URL。

```typescript
export const spPublicData = {
```

服務提供者的公開資料。

```typescript
    entityID: `${spUrl}/metadata`,
```

在 SAML 中，依照慣例，`entityID` 是實體中繼資料所在的 URL。 此中繼資料對應於此處的公開資料，但其格式為 XML。

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

就我們的目的而言，最重要的定義是 `assertionConsumerServer`。 這表示若要向服務提供者宣告某件事 (例如「傳送此資訊給您的使用者是 somebody@example.com」)，我們需要使用 [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) 到 URL `http://localhost:3000/sp/assertion`。

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

身分提供者的公開資料是相似的。 它指定若要登入使用者，您需 POST 至 `http://localhost:3001/idp/login`，若要登出使用者，則 POST 至 `http://localhost:3001/idp/logout`。

#### src/sp.mts

這是實作服務提供者的程式碼。

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

我們使用 [`samlify`](https://www.npmjs.com/package/samlify) 庫來實作 SAML。

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` 庫需要一個套件來驗證 XML 是否正確、是否使用預期的公鑰簽署等。 為此，我們使用 [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)。

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) 是一個可以掛載在網站中的「迷你網站」。 在此情況下，我們使用它將所有服務提供者定義群組在一起。

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

服務提供者自身的表示是所有公開資料，以及它用來簽署資訊的私密金鑰。

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

公開資料包含服務提供者需要了解的身分提供者的所有資訊。

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

為了與其他 SAML 元件互通，服務和身分提供者的公開資料 (稱為中繼資料) 應以 XML 格式在 `/metadata` 中提供。

```typescript
spRouter.post(`/assertion`,
```

這是瀏覽器存取以識別自身的頁面。 宣告包含使用者識別碼 (此處我們使用電子郵件地址)，並且可以包含額外的屬性。 這是上方序列圖中步驟 7 的處理常式。

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

您可以使用已註解的指令來查看斷言中提供的 XML 資料。 它是 [base64 編碼的](https://en.wikipedia.org/wiki/Base64)。

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

解析來自身分伺服器的登入請求。

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

傳送 HTML 回應，僅是為了向使用者顯示我們已收到登入請求。

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

如果失敗，請通知使用者。

```typescript
spRouter.get('/login',
```

當瀏覽器嘗試取得此頁面時，建立一個登入請求。 這是上方序列圖中步驟 1 的處理常式。

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

取得發布登入請求的資訊。

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

此頁面會自動提交表單 (見下文)。 如此一來，使用者就不需要執行任何操作即可被重新導向。 這是上方序列圖中的步驟 2。

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

張貼到 `loginRequest.entityEndpoint` (身分提供者端點的 URL)。

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

輸入名稱為 `loginRequest.type` (`SAMLRequest`)。 該欄位的內容是 `loginRequest.context`，它同樣是經過 base64 編碼的 XML。

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[此中介軟體](https://expressjs.com/en/5x/api.html#express.urlencoded) 會讀取 [HTTP 請求](https://www.tutorialspoint.com/http/http_requests.htm)的主體。 預設情況下，express 會忽略它，因為大多數請求並不需要它。 我們需要它，因為 POST 會使用主體。

```typescript
app.use(`/${config.spDir}`, spRouter)
```

在服務提供者目錄 (`/sp`) 中掛載路由器。

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

如果瀏覽器嘗試取得根目錄，請為其提供登入頁面的連結。

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

使用此 express 應用程式監聽 `spPort`。

#### src/idp.mts

這是身分提供者。 它與服務提供者非常相似，以下說明是針對不同的部分。

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

我們需要讀取並理解從服務提供者收到的 XML 請求。

```typescript
const getLoginPage = requestId => `
```

此函數會建立一個帶有自動提交表單的頁面，該頁面會在上方序列圖的步驟 4 中傳回。

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

我們傳送給服務提供者的欄位有兩個：

1. 我們正在回應的 `requestId`。
2. 使用者識別碼 (目前我們使用使用者提供的電子郵件地址)。

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

這是上方序列圖中步驟 5 的處理常式。 [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) 會建立登入回應。

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

對象為服務提供者。

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

從請求中提取的資訊。 我們在請求中關心的一個參數是 requestId，它讓服務提供者能夠匹配請求及其回應。

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

我們需要 `signingKey` 擁有簽署回應的資料。 服務提供者不信任未經簽署的請求。

```typescript
    },
    "post",
    {
      email: req.body.email
```

這是我們傳送回服務提供者的使用者資訊欄位。

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

同樣，使用自動提交的表單。 這是上方序列圖中的步驟 6。

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

這是從服務提供者接收登入請求的端點。 這是上方序列圖中步驟 3 的處理常式。

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

我們應該能夠使用 [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) 來讀取驗證請求的 ID。 然而，我無法讓它正常運作，而且不值得花太多時間，所以我只使用[通用的 XML 解析器](https://www.npmjs.com/package/fast-xml-parser)。 我們需要的資訊是 `<samlp:AuthnRequest>` 標籤內的 `ID` 屬性，它位於 XML 的最上層。

## 使用以太坊簽章

既然我們能夠將使用者身分傳送給服務提供者，下一步就是以受信任的方式取得使用者身分。 Viem 允許我們直接向錢包詢問使用者地址，但這表示要向瀏覽器索取資訊。 我們無法控制瀏覽器，所以不能自動信任從它那裡得到的回應。

因此，IdP 會傳送一個字串給瀏覽器進行簽署。 如果瀏覽器中的錢包簽署了這個字串，這就表示它確實是那個地址 (也就是說，它知道對應於該地址的私密金鑰)。

要查看此操作，請停止現有的 IdP 和 SP，並執行以下命令：

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

然後瀏覽至 [SP](http://localhost:3000) 並依照指示操作。

請注意，此時我們不知道如何從以太坊地址取得電子郵件地址，因此我們向 SP 回報 `<ethereum address>@bad.email.address`。

### 詳細說明

變更發生在先前圖表中的步驟 4-5。

![帶有以太坊簽章的 SAML](./fig-05-saml-w-signature.png)

我們唯一變更的檔案是 `idp.mts`。 以下是已變更的部分。

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

我們需要這兩個額外的庫。 我們使用 [`uuid`](https://www.npmjs.com/package/uuid) 來建立 [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) 值。 值本身並不重要，重要的是它只使用一次。

[`viem`](https://viem.sh/) 庫讓我們能夠使用以太坊的定義。 此處我們需要它來驗證簽章確實有效。

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

錢包會要求使用者允許簽署該訊息。 僅包含 nonce 的訊息可能會讓使用者感到困惑，因此我們加入了這個提示。

```typescript
// Keep requestIDs here
let nonces = {}
```

我們需要請求資訊才能回應它。 我們可以隨請求傳送它 (步驟 4)，然後再接收回來 (步驟 5)。 然而，我們不能信任從瀏覽器取得的資訊，因為瀏覽器在一個可能具有敵意的使用者的控制之下。 所以最好將它儲存在這裡，並以 nonce 作為金鑰。

請注意，為了簡單起見，我們在此將它作為一個變數。 然而，這有幾個缺點：

- 我們容易受到拒絕服務攻擊。 惡意使用者可以多次嘗試登入，耗盡我們的記憶體。
- 如果 IdP 程序需要重新啟動，我們會遺失現有的值。
- 我們無法在多個程序之間進行負載平衡，因為每個程序都有自己的變數。

在生產系統上，我們會使用資料庫並實作某種過期機制。

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

建立一個 nonce，並儲存 `requestId` 以供日後使用。

```typescript
  return `
<html>
  <head>
    <script type="module">
```

此 JavaScript 會在頁面載入時自動執行。

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

我們需要從 `viem` 中取得幾個函數。

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

我們只有在瀏覽器上有錢包時才能運作。

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

從錢包 (`window.ethereum`) 請求帳戶清單。 假設至少有一個，並且只儲存第一個。

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

建立一個 [錢包用戶端](https://viem.sh/docs/clients/wallet) 與瀏覽器錢包互動。

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

要求使用者簽署一則訊息。 因為整個 HTML 都在 [範本字串](https://viem.sh/docs/clients/wallet) 中，我們可以使用在 idp 程序中定義的變數。 這是序列圖中的步驟 4.5。

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

重新導向至 `/idp/signature/<nonce>/<address>/<signature>`。 這是序列圖中的步驟 5。

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

簽章由瀏覽器傳回，而瀏覽器可能具有惡意 (沒有什麼可以阻止您在瀏覽器中直接開啟 `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`)。 因此，驗證 IdP 程序是否能正確處理不良簽章非常重要。

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

其餘的只是標準的 HTML。

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

這是序列圖中步驟 5 的處理常式。

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

取得請求 ID，並從 `nonces` 中刪除該 nonce，以確保無法重複使用。

```typescript
  try {
```

由於簽章可能無效的方式有很多種，我們將此包裝在 `try ...` `catch` 區塊中，以捕捉任何擲出的錯誤。

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

使用 [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) 來實作序列圖中的步驟 5.5。

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

此處理程式的其餘部分與我們之前在 `/loginSubmitted` 處理程式中所做的相同，除了一個小小的變更。

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

我們沒有實際的電子郵件地址 (我們將在下一節中取得)，所以現在我們先傳回以太坊地址，並清楚地標示它不是一個電子郵件地址。

```typescript
// IdP endpoint for login requests
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
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

現在在步驟 3 的處理常式中使用 `getSignaturePage` 取代 `getLoginPage`。

## 取得電子郵件地址

下一步是取得電子郵件地址，也就是服務提供者請求的識別碼。 為此，我們使用[以太坊證明服務 (EAS)](https://attest.org/)。

取得證明最簡單的方法是使用 [GraphQL API](https://docs.attest.org/docs/developer-tools/api)。 我們使用此查詢：

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

這個 [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) 只包含一個電子郵件地址。 此查詢要求此結構的證明。 證明的主體稱為「`recipient`」(接收者)。 它永遠是以太坊地址。

警告：我們在此處取得證明的方式有兩個安全問題。

- 我們前往的 API 端點是 `https://optimism.easscan.org/graphql`，這是一個中心化元件。 我們可以取得 `id` 屬性，然後在鏈上進行查詢以驗證證明是否真實，但 API 端點仍然可以透過不告知我們來審查證明。

  這個問題並非無法解決，我們可以執行自己的 GraphQL 端點並從鏈記錄中取得證明，但這對我們的目的來說太過繁瑣。

- 我們不看證明人的身分。 任何人都可以提供我們錯誤的資訊。 在實際的實作中，我們會有一組受信任的證明人，並且只查看他們的證明。

要查看此操作，請停止現有的 IdP 和 SP，並執行以下命令：

```sh
git checkout email-address
pnpm install
pnpm start
```

然後提供您的電子郵件地址。 您有兩種方式可以做到：

- 使用私密金鑰匯入錢包，並使用測試私密金鑰 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`。

- 為您自己的電子郵件地址新增一則證明：

  1. 在證明瀏覽器中瀏覽至[該結構](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)。

  2. 按一下「**使用結構證明**」。

  3. 輸入您的以太坊地址作為接收者，您的電子郵件地址作為 email address，並選取**鏈上**。 然後按一下「**進行證明**」。

  4. 在您的錢包中核准交易。 您將需要在 [Optimism 區塊鏈](https://app.optimism.io/bridge/deposit) 上擁有一些 ETH 以支付 Gas。

無論哪種方式，完成後請瀏覽至 [http://localhost:3000](http://localhost:3000) 並依照指示操作。 如果您匯入了測試私密金鑰，您收到的電子郵件是 `test_addr_0@example.com`。 如果您使用自己的地址，它應該是您所證明的任何內容。

### 詳細說明

![從以太坊地址取得電子郵件](./fig-06-saml-sig-n-email.png)

新的步驟是 GraphQL 通訊，即步驟 5.6 和 5.7。

同樣，以下是 `idp.mts` 的已變更部分。

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

匯入我們需要的庫。

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[每個區塊鏈都有一個獨立的端點](https://docs.attest.org/docs/developer-tools/api)。

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

建立一個新的 `GraphQLClient` 用戶端，可用於查詢端點。

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL 只提供我們一個不透明的位元組資料物件。 若要理解它，我們需要結構。

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

一個從以太坊地址取得電子郵件地址的函數。

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

這是一個 GraphQL 查詢。

```typescript
      attestations(
```

我們正在尋找證明。

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

我們想要的證明是我們結構中的證明，其中接收者是 `getAddress(ethAddr)`。 [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) 函數可確保我們的地址具有正確的[校驗和](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)。 這對於 GraphQL 而言是必要的，因為 GraphQL 區分大小寫。 「0xBAD060A7」、「0xBad060A7」和「0xbad060a7」是不同的值。

```typescript
        take: 1
```

無論我們找到多少則證明，我們只需要第一則。

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

我們想要接收的欄位。

- `attester`：提交證明的地址。 通常這用於決定是否信任該證明。
- `id`：證明 ID。 您可以使用此值[在鏈上讀取證明](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64)以驗證 GraphQL 查詢的資訊是否正確。
- `data`：結構資料 (在此情況下為電子郵件地址)。

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

如果沒有證明，則傳回一個明顯不正確的值，但服務提供者會認為它有效。

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

如果有值，請使用 `decodeData` 解碼資料。 我們不需要它提供的中繼資料，只需要值本身。

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

使用新函數取得電子郵件地址。

## 關於去中心化呢？

在此組態中，只要我們依賴可信的證明人進行以太坊到電子郵件地址的對應，使用者就無法冒充他人。 然而，我們的身分提供者仍然是一個中心化元件。 任何擁有身分提供者私密金鑰的人都可以向服務提供者傳送虛假資訊。

使用[多方運算 (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) 可能是一個解決方案。 我希望在未來的教學中寫到它。

## 結論

採用登入標準 (例如以太坊簽章) 會面臨雞生蛋、蛋生雞的問題。 服務提供者希望吸引盡可能廣泛的市場。 使用者希望能夠存取服務，而不用擔心支援其登入標準。
建立適配器 (例如以太坊 IdP) 可以幫助我們克服這個障礙。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
