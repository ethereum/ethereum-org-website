---
title: "웹2 인증에 이더리움 사용하기"
description: "이 튜토리얼을 읽고 나면, 개발자는 이더리움 로그인(웹3)을 웹2에서 SSO(Single Sign-On) 및 기타 관련 서비스를 제공하는 데 사용되는 표준인 SAML 로그인과 통합할 수 있게 될 것입니다. 이를 통해 이더리움 서명을 통해 웹2 리소스에 대한 액세스를 인증할 수 있으며, 사용자 속성은 인증에서 가져옵니다."
author: Ori Pomerantz
tags: [ "웹2", "인증", "eas" ]
skill: beginner
lang: ko
published: 2025-04-30
---

## 소개

[SAML](https://www.onelogin.com/learn/saml)은 웹2에서 [ID 공급자(IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)가 [서비스 공급자(SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\))에 대한 사용자 정보를 제공할 수 있도록 하는 데 사용되는 표준입니다.

이 튜토리얼에서는 이더리움 서명을 SAML과 통합하여 사용자가 아직 이더리움을 기본적으로 지원하지 않는 웹2 서비스에 대해 이더리움 지갑을 사용하여 자신을 인증할 수 있도록 하는 방법을 배웁니다.

이 튜토리얼은 두 가지 별개의 독자 그룹을 위해 작성되었습니다.

- 이더리움을 이해하고 SAML을 배워야 하는 이더리움 사용자
- SAML 및 웹2 인증을 이해하고 이더리움을 배워야 하는 웹2 사용자

따라서 이미 알고 있는 많은 입문 자료가 포함될 것입니다. 자유롭게 건너뛰어도 좋습니다.

### 이더리움 사용자를 위한 SAML

SAML은 중앙화된 프로토콜입니다. 서비스 공급자(SP)는 해당 ID 공급자(IdP) 또는 해당 IdP의 인증서에 서명한 [인증 기관](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)과 사전 신뢰 관계가 있는 경우에만 ID 공급자로부터 어설션(예: "이 사용자는 John이고, 그는 A, B, C를 수행할 수 있는 권한을 가져야 합니다")을 수락합니다.

예를 들어, SP는 회사에 여행 서비스를 제공하는 여행사일 수 있고 IdP는 회사의 내부 웹사이트일 수 있습니다. 직원들이 출장을 예약해야 할 때, 여행사는 실제로 여행을 예약하기 전에 회사에 인증을 보내도록 합니다.

![SAML 단계별 프로세스](./fig-01-saml.png)

이것은 브라우저, SP, IdP 세 엔티티가 액세스를 위해 협상하는 방식입니다. SP는 사전에 브라우저를 사용하는 사용자에 대해 아무것도 알 필요 없이 IdP를 신뢰하기만 하면 됩니다.

### SAML 사용자를 위한 이더리움

이더리움은 탈중앙화된 시스템입니다.

![이더리움 로그온](./fig-02-eth-logon.png)

사용자는 개인 키를 가집니다(일반적으로 브라우저 확장 프로그램에 보관됨). 개인 키에서 공개 키를 파생할 수 있고, 공개 키에서 20바이트 주소를 파생할 수 있습니다. 사용자가 시스템에 로그인해야 할 때, 논스(일회용 값)가 포함된 메시지에 서명하도록 요청받습니다. 서버는 해당 주소에 의해 서명이 생성되었는지 확인할 수 있습니다.

![인증에서 추가 데이터 가져오기](./fig-03-eas-data.png)

서명은 이더리움 주소만 확인합니다. 다른 사용자 속성을 얻으려면 일반적으로 [인증](https://attest.org/)을 사용합니다. 인증에는 일반적으로 다음과 같은 필드가 있습니다.

- **인증자**, 인증을 만든 주소
- **수신자**, 인증이 적용되는 주소
- **데이터**, 이름, 권한 등과 같이 인증되는 데이터입니다.
- **스키마**, 데이터를 해석하는 데 사용되는 스키마의 ID입니다.

이더리움의 탈중앙화된 특성 때문에 모든 사용자가 인증을 생성할 수 있습니다. 신뢰할 수 있는 인증을 식별하려면 인증자의 신원이 중요합니다.

## 설정

첫 번째 단계는 SAML SP와 SAML IdP가 서로 통신하도록 하는 것입니다.

1. 소프트웨어를 다운로드합니다. 이 글의 샘플 소프트웨어는 [github](https://github.com/qbzzt/250420-saml-ethereum)에 있습니다. 여러 단계가 여러 브랜치에 저장되어 있습니다. 이 단계에서는 `saml-only`를 원합니다.

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. 자체 서명된 인증서로 키를 생성합니다. 이는 키가 자체 인증 기관이며 서비스 공급자로 수동으로 가져와야 함을 의미합니다. 자세한 내용은 [OpenSSL 문서](https://docs.openssl.org/master/man1/openssl-req/)를 참조하세요.

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. 서버(SP 및 IdP 모두) 시작

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/)에서 SP로 이동하여 버튼을 클릭하면 IdP(포트 3001)로 리디렉션됩니다.

5. IdP에 이메일 주소를 제공하고 **서비스 공급자에 로그인**을 클릭합니다. 서비스 공급자(포트 3000)로 다시 리디렉션되고 이메일 주소로 사용자를 인식하는지 확인합니다.

### 자세한 설명

다음은 단계별로 일어나는 일입니다.

![이더리움 없는 일반 SAML 로그온](./fig-04-saml-no-eth.png)

#### src/config.mts

이 파일에는 ID 공급자와 서비스 공급자 모두에 대한 구성이 포함되어 있습니다. 일반적으로 이 둘은 서로 다른 엔티티이지만 여기서는 단순화를 위해 코드를 공유할 수 있습니다.

```typescript
const fs = await import("fs")

const protocol="http"
```

지금은 테스트 중이므로 HTTP를 사용해도 괜찮습니다.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

일반적으로 두 구성 요소 모두에서 사용할 수 있는 공개 키를 읽습니다(직접 신뢰하거나 신뢰할 수 있는 인증 기관에서 서명함).

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

두 구성 요소의 URL입니다.

```typescript
export const spPublicData = {
```

서비스 공급자의 공개 데이터입니다.

```typescript
    entityID: `${spUrl}/metadata`,
```

관례적으로 SAML에서 `entityID`는 엔티티의 메타데이터를 사용할 수 있는 URL입니다. 이 메타데이터는 XML 형식이라는 점을 제외하고 여기의 공개 데이터에 해당합니다.

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

우리의 목적에 가장 중요한 정의는 `assertionConsumerServer`입니다. 이는 서비스 공급자에게 무언가를 주장하기 위해(예: "이 정보를 보내는 사용자는 somebody@example.com입니다") [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp)를 사용하여 URL `http://localhost:3000/sp/assertion`으로 보내야 함을 의미합니다.

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

ID 공급자의 공개 데이터는 비슷합니다. 사용자를 로그인하려면 `http://localhost:3001/idp/login`에 POST하고 사용자를 로그아웃하려면 `http://localhost:3001/idp/logout`에 POST하도록 지정합니다.

#### src/sp.mts

서비스 공급자를 구현하는 코드입니다.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

[`samlify`](https://www.npmjs.com/package/samlify) 라이브러리를 사용하여 SAML을 구현합니다.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` 라이브러리는 XML이 올바른지, 예상 공개 키로 서명되었는지 등을 확인하는 패키지가 있어야 합니다. 이 목적을 위해 [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)를 사용합니다.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router)는 웹 사이트 내에 마운트할 수 있는 "미니 웹 사이트"입니다. 이 경우 모든 서비스 공급자 정의를 함께 그룹화하는 데 사용됩니다.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

서비스 공급자의 자체 표현은 모든 공개 데이터와 정보를 서명하는 데 사용하는 개인 키입니다.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

공개 데이터에는 서비스 공급자가 ID 공급자에 대해 알아야 할 모든 것이 포함됩니다.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

다른 SAML 구성 요소와의 상호 운용성을 활성화하려면 서비스 및 ID 공급자의 공개 데이터(메타데이터라고 함)를 `/metadata`의 XML 형식으로 사용할 수 있어야 합니다.

```typescript
spRouter.post(`/assertion`,
```

이것은 브라우저가 자신을 식별하기 위해 액세스하는 페이지입니다. 어설션에는 사용자 식별자(여기서는 이메일 주소를 사용)가 포함되며 추가 속성을 포함할 수 있습니다. 위 시퀀스 다이어그램의 7단계에 대한 핸들러입니다.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

주석 처리된 명령을 사용하여 어설션에 제공된 XML 데이터를 볼 수 있습니다. [base64로 인코딩](https://en.wikipedia.org/wiki/Base64)되어 있습니다.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

ID 서버에서 로그인 요청을 구문 분석합니다.

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

로그인을 받았음을 사용자에게 보여주기 위해 HTML 응답을 보냅니다.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

실패 시 사용자에게 알립니다.

```typescript
spRouter.get('/login',
```

브라우저가 이 페이지를 가져오려고 할 때 로그인 요청을 생성합니다. 위 시퀀스 다이어그램의 1단계에 대한 핸들러입니다.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

로그인 요청을 게시할 정보를 가져옵니다.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

이 페이지는 양식(아래 참조)을 자동으로 제출합니다. 이렇게 하면 사용자가 리디렉션되기 위해 아무것도 할 필요가 없습니다. 위 시퀀스 다이어그램의 2단계입니다.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint`(ID 공급자 엔드포인트의 URL)에 게시합니다.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

입력 이름은 `loginRequest.type`(`SAMLRequest`)입니다. 해당 필드의 내용은 `loginRequest.context`이며, 다시 base64로 인코딩된 XML입니다.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[이 미들웨어는](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP 요청](https://www.tutorialspoint.com/http/http_requests.htm)의 본문을 읽습니다. 기본적으로 express는 대부분의 요청에 필요하지 않기 때문에 무시합니다. POST는 본문을 사용하기 때문에 필요합니다.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

서비스 공급자 디렉터리(`/sp`)에 라우터를 마운트합니다.

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

브라우저가 루트 디렉터리를 가져오려고 하면 로그인 페이지 링크를 제공합니다.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

이 express 애플리케이션으로 `spPort`를 수신합니다.

#### src/idp.mts

ID 공급자입니다. 서비스 공급자와 매우 유사하며 아래 설명은 다른 부분에 대한 것입니다.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

서비스 공급자로부터 수신하는 XML 요청을 읽고 이해해야 합니다.

```typescript
const getLoginPage = requestId => `
```

이 함수는 위 시퀀스 다이어그램의 4단계에서 반환되는 자동 제출 양식이 있는 페이지를 만듭니다.

```typescript
<html>
  <head>
    <title>로그인 페이지</title>
  </head>
  <body>
    <h2>로그인 페이지</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      이메일 주소: <input name="email" />
      <br />
      <button type="Submit">
        서비스 공급자에 로그인
      </button>
```

서비스 공급자에게 보내는 필드는 두 가지입니다.

1. 응답 중인 `requestId`.
2. 사용자 식별자(지금은 사용자가 제공한 이메일 주소를 사용).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

위 시퀀스 다이어그램의 5단계에 대한 핸들러입니다. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125)는 로그인 응답을 생성합니다.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

대상은 서비스 공급자입니다.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

요청에서 추출한 정보입니다. 요청에서 우리가 신경 쓰는 매개변수 중 하나는 requestId로, 서비스 공급자가 요청과 응답을 일치시킬 수 있게 해줍니다.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

응답에 서명할 데이터를 가지려면 `signingKey`가 필요합니다. 서비스 공급자는 서명되지 않은 요청을 신뢰하지 않습니다.

```typescript
    },
    "post",
    {
      email: req.body.email
```

서비스 공급자에게 다시 보내는 사용자 정보가 있는 필드입니다.

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

다시 자동 제출 양식을 사용합니다. 위 시퀀스 다이어그램의 6단계입니다.

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

서비스 공급자로부터 로그인 요청을 수신하는 엔드포인트입니다. 위 시퀀스 다이어그램의 3단계에 대한 핸들러입니다.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

인증 요청의 ID를 읽으려면 [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144)를 사용할 수 있어야 합니다. 하지만 작동하게 할 수 없었고 많은 시간을 할애할 가치가 없었기 때문에 [범용 XML 파서](https://www.npmjs.com/package/fast-xml-parser)를 사용했습니다. 필요한 정보는 XML의 최상위 수준에 있는 `<samlp:AuthnRequest>` 태그 내의 `ID` 속성입니다.

## 이더리움 서명 사용하기

이제 서비스 공급자에게 사용자 ID를 보낼 수 있으므로 다음 단계는 신뢰할 수 있는 방식으로 사용자 ID를 얻는 것입니다. Viem을 사용하면 지갑에 사용자 주소를 요청할 수 있지만, 이는 브라우저에 정보를 요청하는 것을 의미합니다. 브라우저를 제어할 수 없으므로 브라우저에서 받은 응답을 자동으로 신뢰할 수 없습니다.

대신 IdP는 브라우저에 서명할 문자열을 보냅니다. 브라우저의 지갑이 이 문자열에 서명하면 실제로 해당 주소라는 것을 의미합니다(즉, 주소에 해당하는 개인 키를 알고 있음).

이것이 작동하는 것을 보려면 기존 IdP와 SP를 중지하고 다음 명령을 실행하세요.

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

그런 다음 [SP](http://localhost:3000)로 이동하여 지침을 따릅니다.

이 시점에서는 이더리움 주소에서 이메일 주소를 얻는 방법을 모르므로 대신 `<이더리움 주소>@bad.email.address`를 SP에 보고합니다.

### 자세한 설명

변경 사항은 이전 다이어그램의 4-5단계에 있습니다.

![이더리움 서명을 사용한 SAML](./fig-05-saml-w-signature.png)

변경된 유일한 파일은 `idp.mts`입니다. 변경된 부분은 다음과 같습니다.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

이 두 개의 추가 라이브러리가 필요합니다. [`uuid`](https://www.npmjs.com/package/uuid)를 사용하여 [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce) 값을 생성합니다. 값 자체는 중요하지 않고 한 번만 사용된다는 사실만 중요합니다.

[`viem`](https://viem.sh/) 라이브러리를 사용하면 이더리움 정의를 사용할 수 있습니다. 여기서는 서명이 실제로 유효한지 확인해야 합니다.

```typescript
const loginPrompt = "서비스 공급자에 액세스하려면 이 논스에 서명하세요: "
```

지갑은 사용자에게 메시지에 서명할 권한을 요청합니다. 논스만 있는 메시지는 사용자를 혼란스럽게 할 수 있으므로 이 프롬프트를 포함합니다.

```typescript
// Keep requestIDs here
let nonces = {}
```

응답하려면 요청 정보가 필요합니다. 요청(4단계)과 함께 보내고 다시 받을 수 있습니다(5단계). 그러나 잠재적으로 적대적인 사용자의 통제하에 있는 브라우저에서 얻는 정보는 신뢰할 수 없습니다. 따라서 여기에 nonce를 키로 저장하는 것이 좋습니다.

여기서는 단순성을 위해 변수로 수행하고 있음을 참고하세요. 그러나 여기에는 몇 가지 단점이 있습니다.

- 서비스 거부 공격에 취약합니다. 악의적인 사용자가 여러 번 로그온을 시도하여 메모리를 채울 수 있습니다.
- IdP 프로세스를 다시 시작해야 하는 경우 기존 값을 잃게 됩니다.
- 각각 고유한 변수를 가지므로 여러 프로세스에 걸쳐 부하를 분산할 수 없습니다.

프로덕션 시스템에서는 데이터베이스를 사용하고 일종의 만료 메커니즘을 구현합니다.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

논스를 만들고 나중에 사용할 수 있도록 `requestId`를 저장합니다.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

이 자바스크립트는 페이지가 로드될 때 자동으로 실행됩니다.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

`viem`에서 여러 기능이 필요합니다.

```typescript
      if (!window.ethereum) {
          alert("MetaMask 또는 호환되는 지갑을 설치한 다음 다시 로드하세요")
      }
```

브라우저에 지갑이 있는 경우에만 작동할 수 있습니다.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

지갑(`window.ethereum`)에서 계정 목록을 요청합니다. 적어도 하나가 있다고 가정하고 첫 번째 것만 저장합니다.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

[지갑 클라이언트](https://viem.sh/docs/clients/wallet)를 만들어 브라우저 지갑과 상호 작용합니다.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

사용자에게 메시지에 서명하도록 요청합니다. 이 전체 HTML은 [템플릿 문자열](https://viem.sh/docs/clients/wallet)에 있으므로 idp 프로세스에 정의된 변수를 사용할 수 있습니다. 시퀀스 다이어그램의 4.5단계입니다.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<논스>/<주소>/<서명>`으로 리디렉션합니다. 시퀀스 다이어그램의 5단계입니다.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

서명은 잠재적으로 악의적인 브라우저에서 다시 전송됩니다(브라우저에서 `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`를 열기만 해도 막을 수 있는 것은 없습니다). 따라서 IdP 프로세스가 잘못된 서명을 올바르게 처리하는지 확인하는 것이 중요합니다.

```typescript
    </script>
  </head>
  <body>
    <h2>서명하세요</h2>
    <button onClick="window.goodSignature()">
      좋은(유효한) 서명 제출
    </button>
    <br/>
    <button onClick="window.badSignature()">
      잘못된(유효하지 않은) 서명 제출
    </button>
  </body>
</html>  
`
}
```

나머지는 표준 HTML입니다.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

시퀀스 다이어그램의 5단계에 대한 핸들러입니다.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

요청 ID를 가져오고 재사용할 수 없도록 `nonces`에서 논스를 삭제합니다.

```typescript
  try {
```

서명이 유효하지 않을 수 있는 방법이 너무 많기 때문에 `try ...`로 래핑합니다. catch` 블록으로 발생한 오류를 포착합니다.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

시퀀스 다이어그램의 5.5단계를 구현하려면 [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage)를 사용합니다.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

핸들러의 나머지 부분은 한 가지 작은 변경 사항을 제외하고 이전에 `/loginSubmitted` 핸들러에서 수행한 것과 동일합니다.

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

실제 이메일 주소는 없으므로(다음 섹션에서 얻을 수 있음) 지금은 이더리움 주소를 반환하고 이메일 주소가 아님을 명확하게 표시합니다.

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

3단계 핸들러에서 `getLoginPage` 대신 이제 `getSignaturePage`를 사용합니다.

## 이메일 주소 받기

다음 단계는 서비스 공급자가 요청한 식별자인 이메일 주소를 얻는 것입니다. 이를 위해 [이더리움 증명 서비스(EAS)](https://attest.org/)를 사용합니다.

인증을 얻는 가장 쉬운 방법은 [GraphQL API](https://docs.attest.org/docs/developer-tools/api)를 사용하는 것입니다. 다음 쿼리를 사용합니다.

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

이 [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)는 이메일 주소만 포함합니다. 이 쿼리는 이 스키마의 인증을 요청합니다. 인증의 주체는 `recipient`라고 합니다. 항상 이더리움 주소입니다.

경고: 여기서 인증을 얻는 방식에는 두 가지 보안 문제가 있습니다.

- 중앙화된 구성 요소인 API 엔드포인트 `https://optimism.easscan.org/graphql`로 이동합니다. `id` 속성을 가져와서 온체인 조회를 통해 인증이 진짜인지 확인할 수 있지만, API 엔드포인트는 인증에 대해 알려주지 않음으로써 여전히 인증을 검열할 수 있습니다.

  이 문제는 해결 불가능한 것이 아니며, 자체 GraphQL 엔드포인트를 실행하고 체인 로그에서 인증을 얻을 수 있지만, 우리의 목적에는 과도합니다.

- 인증자 신원을 보지 않습니다. 누구나 거짓 정보를 제공할 수 있습니다. 실제 구현에서는 신뢰할 수 있는 인증자 집합이 있고 그들의 인증만 살펴봅니다.

이것이 작동하는 것을 보려면 기존 IdP와 SP를 중지하고 다음 명령을 실행하세요.

```sh
git checkout email-address
pnpm install
pnpm start
```

그런 다음 이메일 주소를 제공합니다. 두 가지 방법이 있습니다.

- 개인 키를 사용하여 지갑을 가져오고 테스트 개인 키 `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`을 사용합니다.

- 자신의 이메일 주소에 대한 인증을 추가합니다.

  1. 인증 탐색기에서 [스키마](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)로 이동합니다.

  2. **스키마로 인증**을 클릭합니다.

  3. 이더리움 주소를 수신자로 입력하고, 이메일 주소를 이메일 주소로 입력하고, **온체인**을 선택합니다. 그런 다음 **인증 만들기**를 클릭합니다.

  4. 지갑에서 트랜잭션을 승인합니다. 가스를 지불하려면 [옵티미즘 블록체인](https://app.optimism.io/bridge/deposit)에 ETH가 필요합니다.

어느 쪽이든 이 작업을 마친 후 [http://localhost:3000](http://localhost:3000)으로 이동하여 지침을 따릅니다. 테스트 개인 키를 가져온 경우 받는 이메일은 `test_addr_0@example.com`입니다. 자신의 주소를 사용했다면 인증한 주소여야 합니다.

### 자세한 설명

![이더리움 주소에서 이메일로 가져오기](./fig-06-saml-sig-n-email.png)

새로운 단계는 GraphQL 통신, 5.6 및 5.7단계입니다.

다시 한 번, `idp.mts`의 변경된 부분은 다음과 같습니다.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

필요한 라이브러리를 가져옵니다.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[각 블록체인에 대한 별도의 엔드포인트](https://docs.attest.org/docs/developer-tools/api)가 있습니다.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

엔드포인트 쿼리에 사용할 수 있는 새로운 `GraphQLClient` 클라이언트를 만듭니다.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL은 바이트가 포함된 불투명한 데이터 객체만 제공합니다. 이를 이해하려면 스키마가 필요합니다.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

이더리움 주소에서 이메일 주소로 변환하는 함수입니다.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

GraphQL 쿼리입니다.

```typescript
      attestations(
```

인증을 찾고 있습니다.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

원하는 인증은 스키마에 있으며 수신자가 `getAddress(ethAddr)`인 인증입니다. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) 함수는 주소에 올바른 [체크섬](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)이 있는지 확인합니다. 이는 GraphQL이 대소문자를 구분하기 때문에 필요합니다. "0xBAD060A7", "0xBad060A7", "0xbad060a7"은 서로 다른 값입니다.

```typescript
        take: 1
```

몇 개의 인증을 찾든 첫 번째 것만 원합니다.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

받고 싶은 필드입니다.

- `attester`: 인증을 제출한 주소. 일반적으로 인증을 신뢰할지 여부를 결정하는 데 사용됩니다.
- `id`: 인증 ID. 이 값을 사용하여 [온체인에서 인증을 읽어](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) GraphQL 쿼리의 정보가 올바른지 확인할 수 있습니다.
- `data`: 스키마 데이터(이 경우 이메일 주소).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

인증이 없는 경우 명백히 잘못되었지만 서비스 공급자에게 유효하게 표시되는 값을 반환합니다.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

값이 있으면 `decodeData`를 사용하여 데이터를 디코딩합니다. 제공하는 메타데이터는 필요하지 않고 값 자체만 필요합니다.

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

새 함수를 사용하여 이메일 주소를 가져옵니다.

## 탈중앙화는 어떻습니까?

이 구성에서 사용자는 이더리움-이메일 주소 매핑을 위해 신뢰할 수 있는 인증자에 의존하는 한 다른 사람인 척할 수 없습니다. 그러나 ID 공급자는 여전히 중앙화된 구성 요소입니다. ID 공급자의 개인 키를 가진 사람은 누구나 서비스 공급자에게 거짓 정보를 보낼 수 있습니다.

[다자간 계산(MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation)를 사용하는 솔루션이 있을 수 있습니다. 다음 튜토리얼에서 이에 대해 쓸 수 있기를 바랍니다.

## 결론

이더리움 서명과 같은 로그온 표준을 채택하는 것은 닭과 달걀 문제에 직면합니다. 서비스 공급자는 가능한 가장 넓은 시장에 어필하기를 원합니다. 사용자는 로그온 표준 지원에 대해 걱정하지 않고 서비스에 액세스할 수 있기를 원합니다.
이더리움 IdP와 같은 어댑터를 만들면 이 장애물을 극복하는 데 도움이 될 수 있습니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
