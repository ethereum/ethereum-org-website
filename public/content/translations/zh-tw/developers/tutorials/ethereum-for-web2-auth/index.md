---
title: "使用以太坊進行 Web2 身份驗證"
description: "閱讀本教學後，開發人員將能夠將以太坊登入 (Web3) 與 SAML 登入（Web2 中用於提供單一登入及其他相關服務的標準）整合。這允許透過以太坊簽章對 Web2 資源的存取進行身份驗證，而使用者屬性則來自證明。"
author: "奧里·波梅蘭茨"
tags: ["Web2", "身份驗證", "eas"]
skill: beginner
breadcrumb: "用於 Web2 身份驗證的以太坊"
lang: zh-tw
published: 2025-04-30
---

## 簡介 {#introduction}

[SAML](https://www.onelogin.com/learn/saml) 是 Web2 上使用的一種標準，允許[身份提供者 (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) 為[服務提供者 (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) 提供使用者資訊。

在本教學中，您將學習如何將以太坊簽章與 SAML 整合，讓使用者能夠使用他們的以太坊錢包，向尚未原生支援以太坊的 Web2 服務進行身份驗證。

請注意，本教學是為兩個不同的受眾所編寫：

- 了解以太坊並需要學習 SAML 的以太坊開發者
- 了解 SAML 與 Web2 身份驗證並需要學習以太坊的 Web2 開發者

因此，它將包含許多您可能已經知道的介紹性內容。您可以隨意跳過這些部分。

### 給以太坊開發者的 SAML 簡介 {#saml-for-ethereum-people}

SAML 是一種中心化的協定。服務提供者 (SP) 只有在與身份提供者 (IdP) 或簽署該 IdP 憑證的[憑證授權中心](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)具有預先存在的信任關係時，才會接受來自該 IdP 的斷言（例如「這是我的使用者 John，他應該擁有執行 A、B 和 C 的權限」）。

例如，SP 可以是為公司提供旅遊服務的旅行社，而 IdP 可以是公司的內部網站。當員工需要預訂商務旅行時，旅行社會先將他們送至公司進行身份驗證，然後才讓他們實際預訂行程。

![Step by step SAML process](./fig-01-saml.png)

這就是瀏覽器、SP 和 IdP 這三個實體協商存取權限的方式。SP 不需要事先了解使用瀏覽器的使用者的任何資訊，只需要信任 IdP 即可。

### 給 SAML 開發者的以太坊簡介 {#ethereum-for-saml-people}

以太坊是一個去中心化的系統。

![Ethereum logon](./fig-02-eth-logon.png)

使用者擁有一把私鑰（通常保存在瀏覽器擴充功能中）。從私鑰可以推導出公鑰，再從公鑰推導出 20 位元組的地址。當使用者需要登入系統時，系統會要求他們使用隨機數（一次性使用的值）對訊息進行簽章。伺服器可以驗證該簽章是否由該地址所建立。

![Getting extra data from attestations](./fig-03-eas-data.png)

簽章僅驗證以太坊地址。要取得其他使用者屬性，您通常會使用[證明](https://attest.org/)。證明通常具有以下欄位：

- **證明者 (Attestor)**，做出該證明的地址
- **接收者 (Recipient)**，該證明所適用的地址
- **資料 (Data)**，被證明的資料，例如姓名、權限等
- **結構描述 (Schema)**，用於解釋資料的結構描述 ID。

由於以太坊去中心化的特性，任何使用者都可以進行證明。證明者的身份對於識別我們認為哪些證明是可靠的非常重要。

## 設定 {#setup}

第一步是讓 SAML SP 和 SAML IdP 之間能夠互相通訊。

1. 下載軟體。本文的範例軟體位於 [GitHub 上](https://github.com/qbzzt/250420-saml-ethereum)。不同的階段儲存在不同的分支中，對於這個階段，您需要 `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. 建立帶有自簽憑證的金鑰。這意味著該金鑰本身就是自己的憑證授權中心，並且需要手動匯入到服務提供者。請參閱 [OpenSSL 文件](https://docs.openssl.org/master/man1/openssl-req/)以獲取更多資訊。

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. 啟動伺服器（包括 SP 和 IdP）

    ```sh
    pnpm start
    ```

4. 瀏覽至 SP 的 URL [http://localhost:3000/](http://localhost:3000/)，然後點擊按鈕以重新導向至 IdP（通訊埠 3001）。

5. 向 IdP 提供您的電子郵件地址，然後點擊 **Login to the service provider**。您會看到自己被重新導向回服務提供者（通訊埠 3000），並且它能透過您的電子郵件地址識別您。

### 詳細說明 {#detailed-explanation}

以下是逐步發生的情況：

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

此檔案包含身份提供者和服務提供者的設定。通常這兩者會是不同的實體，但在這裡為了簡單起見，我們可以共用程式碼。

```typescript
const fs = await import("fs")

const protocol="http"
```

目前我們只是在測試，所以使用 HTTP 是可以的。

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

讀取公鑰，這些公鑰通常對兩個元件都可用（並且可以直接信任，或由受信任的憑證授權中心簽署）。

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

兩個元件的 URL。

```typescript
export const spPublicData = {
```

服務提供者的公開資料。

```typescript
    entityID: `${spUrl}/metadata`,
```

按照慣例，在 SAML 中，`entityID` 是可取得實體中繼資料的 URL。此中繼資料對應於此處的公開資料，只是它採用 XML 格式。

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

就我們的目的而言，最重要的定義是 `assertionConsumerServer`。這意味著要向服務提供者斷言某些內容（例如，「向您發送此資訊的使用者是 somebody@example.com」），我們需要使用 [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) 到 URL `http://localhost:3000/sp/assertion`。

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

身份提供者的公開資料也很類似。它指定要登入使用者，您需要 POST 到 `http://localhost:3001/idp/login`，而要登出使用者，您需要 POST 到 `http://localhost:3001/idp/logout`。

#### src/sp.mts {#srcspmts}

這是實作服務提供者的程式碼。

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

我們使用 [`samlify`](https://www.npmjs.com/package/samlify) 函式庫來實作 SAML。

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` 函式庫預期會有一個套件來驗證 XML 是否正確、是否使用預期的公鑰簽署等。我們為此目的使用 [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)。

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) 是一個可以掛載在網站內部的「迷你網站」。在這種情況下，我們使用它將所有服務提供者的定義分組在一起。

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

服務提供者對自身的表示方式包含所有的公開資料，以及它用來簽署資訊的私鑰。

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

公開資料包含服務提供者需要了解關於身份提供者的所有資訊。

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

為了實現與其他 SAML 元件的互操作性，服務和身份提供者應將其公開資料（稱為中繼資料）以 XML 格式提供於 `/metadata` 中。

```typescript
spRouter.post(`/assertion`,
```

這是瀏覽器存取以識別自身身份的頁面。斷言包含使用者識別碼（這裡我們使用電子郵件地址），並且可以包含其他屬性。這是上述循序圖中步驟 7 的處理常式。

```typescript
  async (req, res) => {
    // console.log(`SAML 回應：\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

您可以使用註解掉的命令來查看斷言中提供的 XML 資料。它是經過 [Base64 編碼](https://en.wikipedia.org/wiki/Base64)的。

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

解析來自身份伺服器的登入請求。

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

發送 HTML 回應，只是為了向使用者顯示我們已收到登入。

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

在失敗時通知使用者。

```typescript
spRouter.get('/login',
```

當瀏覽器嘗試取得此頁面時建立登入請求。這是上述循序圖中步驟 1 的處理常式。

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

此頁面會自動提交表單（見下文）。這樣使用者就不需要執行任何操作即可被重新導向。這是上述循序圖中的步驟 2。

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

POST 到 `loginRequest.entityEndpoint`（身份提供者端點的 URL）。

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

輸入名稱為 `loginRequest.type` (`SAMLRequest`)。該欄位的內容為 `loginRequest.context`，這同樣是經過 Base64 編碼的 XML。

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[這個中介軟體](https://expressjs.com/en/5x/api.html#express.urlencoded)會讀取 [HTTP 請求](https://www.tutorialspoint.com/http/http_requests.htm)的主體。預設情況下，Express 會忽略它，因為大多數請求不需要它。我們需要它，因為 POST 確實會使用主體。

```typescript
app.use(`/${config.spDir}`, spRouter)
```

將路由器掛載到服務提供者目錄 (`/sp`) 中。

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

如果瀏覽器嘗試取得根目錄，請提供登入頁面的連結給它。

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

使用這個 Express 應用程式監聽 `spPort`。

#### src/idp.mts {#srcidpmts}

這是身份提供者。它與服務提供者非常相似，以下說明針對不同的部分。

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // 保留屬性
    attributeNamePrefix: "@_", // 屬性前綴
  }
)
```

我們需要讀取並理解從服務提供者收到的 XML 請求。

```typescript
const getLoginPage = requestId => `
```

此函式會建立帶有自動提交表單的頁面，該頁面會在上述循序圖的步驟 4 中回傳。

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

我們發送給服務提供者的有兩個欄位：

1. 我們正在回應的 `requestId`。
2. 使用者識別碼（我們目前使用使用者提供的電子郵件地址）。

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

這是上述循序圖中步驟 5 的處理常式。[`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) 會建立登入回應。

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

受眾 (audience) 是服務提供者。

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

從請求中提取的資訊。我們在請求中關心的一個參數是 requestId，它讓服務提供者能夠將請求與其回應進行配對。

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // 確保簽署
```

我們需要 `signingKey` 擁有簽署回應的資料。服務提供者不信任未簽署的請求。

```typescript
    },
    "post",
    {
      email: req.body.email
```

這是包含我們發送回服務提供者的使用者資訊的欄位。

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

同樣地，使用自動提交的表單。這是上述循序圖中的步驟 6。

```typescript

// 登入請求的 IdP 端點
idpRouter.post(`/login`,
```

這是接收來自服務提供者登入請求的端點。這是上述循序圖中步驟 3 的處理常式。

```typescript
  async (req, res) => {
    try {
      // 替代方案，因為我無法讓 parseLoginRequest 正常運作。
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

我們應該能夠使用 [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) 來讀取身份驗證請求的 ID。然而，我無法讓它正常運作，而且不值得花費大量時間在上面，所以我只使用了一個[通用的 XML 解析器](https://www.npmjs.com/package/fast-xml-parser)。我們需要的資訊是 `<samlp:AuthnRequest>` 標籤內的 `ID` 屬性，該標籤位於 XML 的最頂層。

## 使用以太坊簽章 {#using-ethereum-signatures}

既然我們已經可以將使用者身份發送給服務提供者，下一步就是以受信任的方式取得使用者身份。Viem 允許我們直接向錢包詢問使用者地址，但這意味著要向瀏覽器索取資訊。我們無法控制瀏覽器，因此我們不能自動信任從它那裡得到的回應。

相反地，IdP 將向瀏覽器發送一個字串以供簽章。如果瀏覽器中的錢包簽署了這個字串，這意味著它確實是該地址（也就是說，它知道對應於該地址的私鑰）。

要查看實際運作情況，請停止現有的 IdP 和 SP，並執行以下命令：

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

然後瀏覽[至 SP](http://localhost:3000) 並按照指示操作。

請注意，此時我們還不知道如何從以太坊地址取得電子郵件地址，因此我們改為向 SP 報告 `<ethereum address>@bad.email.address`。

### 詳細說明 {#detailed-explanation-2}

變更在於上圖中的步驟 4-5。

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

我們唯一更改的檔案是 `idp.mts`。以下是更改的部分。

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

我們需要這兩個額外的函式庫。我們使用 [`uuid`](https://www.npmjs.com/package/uuid) 來建立[隨機數](https://en.wikipedia.org/wiki/Cryptographic_nonce)值。該值本身並不重要，重要的是它只被使用一次。

[`viem`](https://viem.sh/) 函式庫讓我們可以使用以太坊的定義。在這裡，我們需要它來驗證簽章是否確實有效。

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

錢包會要求使用者授權簽署訊息。僅包含隨機數的訊息可能會讓使用者感到困惑，因此我們加入了這個提示。

```typescript
// 在此保留 requestIDs
let nonces = {}
```

我們需要請求資訊才能對其進行回應。我們可以將它與請求一起發送（步驟 4），然後接收回來（步驟 5）。然而，我們不能信任從瀏覽器獲得的資訊，因為它處於潛在惡意使用者的控制之下。因此，最好將其儲存在這裡，並以隨機數作為金鑰。

請注意，為了簡單起見，我們在這裡將其作為變數處理。然而，這有幾個缺點：

- 我們容易受到阻斷服務攻擊。惡意使用者可能會嘗試多次登入，從而耗盡我們的記憶體。
- 如果 IdP 處理程序需要重新啟動，我們將遺失現有的值。
- 我們無法在多個處理程序之間進行負載平衡，因為每個處理程序都會有自己的變數。

在生產系統上，我們會使用資料庫並實作某種過期機制。

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

建立一個隨機數，並儲存 `requestId` 以供未來使用。

```typescript
  return `
<html>
  <head>
    <script type="module">
```

這段 JavaScript 會在頁面載入時自動執行。

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

我們需要來自 `viem` 的幾個函式。

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

只有在瀏覽器上有錢包時，我們才能運作。

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

向錢包請求帳戶列表 (`window.ethereum`)。假設至少有一個，並且只儲存第一個。

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

建立一個[錢包客戶端](https://viem.sh/docs/clients/wallet)以與瀏覽器錢包互動。

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

要求使用者簽署訊息。因為這整個 HTML 都在一個[樣板字串](https://viem.sh/docs/clients/wallet)中，我們可以使用在 IdP 處理程序中定義的變數。這是循序圖中的步驟 4.5。

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

重新導向至 `/idp/signature/<nonce>/<address>/<signature>`。這是循序圖中的步驟 5。

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

簽章由瀏覽器發送回來，這可能是惡意的（沒有什麼能阻止您直接在瀏覽器中開啟 `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`）。因此，驗證 IdP 處理程序是否正確處理無效簽章非常重要。

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

這是循序圖中步驟 5 的處理常式。

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

取得請求 ID，並從 `nonces` 中刪除隨機數，以確保它不能被重複使用。

```typescript
  try {
```

因為簽章無效的方式有很多種，我們將其包裝在 `try ... catch` 區塊中，以捕捉任何拋出的錯誤。

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

使用 [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) 來實作循序圖中的步驟 5.5。

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

處理常式的其餘部分等同於我們之前在 `/loginSubmitted` 處理常式中所做的，除了一個小小的改變。

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

我們沒有實際的電子郵件地址（我們將在下一節中取得），所以目前我們回傳以太坊地址，並清楚標記它不是電子郵件地址。


```typescript
// 登入請求的 IdP 端點
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // 替代方案，因為我無法讓 parseLoginRequest 正常運作。
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

在步驟 3 的處理常式中，現在使用 `getSignaturePage` 而不是 `getLoginPage`。

## 取得電子郵件地址 {#getting-the-email-address}

下一步是取得電子郵件地址，這是服務提供者所要求的識別碼。為此，我們使用[以太坊證明服務 (EAS)](https://attest.org/)。

取得證明最簡單的方法是使用 [GraphQL API](https://docs.attest.org/docs/developer-tools/api)。我們使用這個查詢：

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

這個 [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) 僅包含一個電子郵件地址。此查詢要求此結構描述的證明。證明的主體稱為 `recipient`。它始終是一個以太坊地址。

警告：我們在這裡取得證明的方式有兩個安全性問題。

- 我們前往 API 端點 `https://optimism.easscan.org/graphql`，這是一個中心化的元件。我們可以取得 `id` 屬性，然後在鏈上進行查詢以驗證證明是否真實，但 API 端點仍然可以透過不告訴我們來審查證明。 

  這個問題並非無法解決，我們可以執行自己的 GraphQL 端點並從鏈上日誌中取得證明，但這對我們的目的來說太過繁瑣了。

- 我們沒有查看證明者的身份。任何人都可以向我們提供虛假資訊。在現實世界的實作中，我們會有一組受信任的證明者，並且只查看他們的證明。

要查看實際運作情況，請停止現有的 IdP 和 SP，並執行以下命令：

```sh
git checkout email-address
pnpm install
pnpm start
```

然後提供您的電子郵件地址。您有兩種方法可以做到這一點：

- 使用私鑰匯入錢包，並使用測試私鑰 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`。

- 為您自己的電子郵件地址新增證明：

  1. 瀏覽至[證明瀏覽器中的結構描述](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)。

  2. 點擊 **Attest with Schema**。

  3. 輸入您的以太坊地址作為接收者，您的電子郵件地址作為 email address，並選擇 **Onchain**。然後點擊 **Make Attestation**。

  4. 在您的錢包中授權交易。您將需要在 [Optimism 區塊鏈](https://app.optimism.io/bridge/deposit)上有一些 ETH 來支付燃料費用。

無論哪種方式，在您完成此操作後，請瀏覽至 [http://localhost:3000](http://localhost:3000) 並按照指示操作。如果您匯入了測試私鑰，您收到的電子郵件將是 `test_addr_0@example.com`。如果您使用了自己的地址，它應該是您所證明的任何內容。

### 詳細說明 {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

新的步驟是 GraphQL 通訊，即步驟 5.6 和 5.7。

同樣地，以下是 `idp.mts` 更改的部分。

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

匯入我們需要的函式庫。

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[每個區塊鏈都有一個獨立的端點](https://docs.attest.org/docs/developer-tools/api)。

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

建立一個新的 `GraphQLClient` 客戶端，我們可以用它來查詢端點。

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL 只給我們一個帶有位元組的不透明資料物件。要理解它，我們需要結構描述。

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

一個從以太坊地址取得電子郵件地址的函式。

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

我們想要的證明是那些在我們的結構描述中，且接收者為 `getAddress(ethAddr)` 的證明。[`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) 函式確保我們的地址具有正確的[校驗和](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)。這是必要的，因為 GraphQL 區分大小寫。"0xBAD060A7"、"0xBad060A7" 和 "0xbad060a7" 是不同的值。

```typescript
        take: 1
```

無論我們找到多少個證明，我們只想要第一個。

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

我們想要接收的欄位。

- `attester`：提交證明的地址。通常這用於決定是否信任該證明。
- `id`：證明 ID。您可以使用此值在[鏈上讀取證明](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64)，以驗證來自 GraphQL 查詢的資訊是否正確。
- `data`：結構描述資料（在這種情況下，為電子郵件地址）。

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

如果沒有證明，則回傳一個明顯不正確的值，但該值對服務提供者來說會顯得有效。

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

如果有值，請使用 `decodeData` 來解碼資料。我們不需要它提供的中繼資料，只需要值本身。

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

使用新函式來取得電子郵件地址。

## 那去中心化呢？ {#what-about-decentralization}

在這種設定中，只要我們依賴值得信賴的證明者來進行以太坊到電子郵件地址的映射，使用者就無法冒充他人。然而，我們的身份提供者仍然是一個中心化的元件。任何擁有身份提供者私鑰的人都可以向服務提供者發送虛假資訊。

可能有一個使用[多方運算 (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) 的解決方案。我希望在未來的教學中寫到它。

## 結論 {#conclusion}

採用登入標準（例如以太坊簽章）面臨著雞生蛋、蛋生雞的問題。服務提供者希望吸引盡可能廣泛的市場。使用者希望能夠存取服務，而不必擔心是否支援他們的登入標準。
建立轉接器（例如以太坊 IdP）可以幫助我們克服這個障礙。

[點擊此處查看我更多的作品](https://cryptodocguy.pro/)。