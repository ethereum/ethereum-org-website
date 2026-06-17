---
title: Sử dụng Ethereum để xác thực Web2
description: Sau khi đọc hướng dẫn này, nhà phát triển sẽ có thể tích hợp đăng nhập Ethereum (web3) với đăng nhập SAML, một tiêu chuẩn được sử dụng trong Web2 để cung cấp đăng nhập một lần và các dịch vụ liên quan khác. Điều này cho phép quyền truy cập vào các tài nguyên Web2 được xác thực thông qua chữ ký Ethereum, với các thuộc tính người dùng đến từ các chứng thực.
author: Ori Pomerantz
tags:
  - Web2
  - xác thực
  - eas
skill: beginner
breadcrumb: Ethereum cho xác thực Web2
lang: vi
published: 2025-04-30
---

## Giới thiệu {#introduction}

[SAML](https://www.onelogin.com/learn/saml) là một tiêu chuẩn được sử dụng trên Web2 để cho phép một [nhà cung cấp danh tính (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) cung cấp thông tin người dùng cho các [nhà cung cấp dịch vụ (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

Trong hướng dẫn này, bạn sẽ tìm hiểu cách tích hợp chữ ký Ethereum với SAML để cho phép người dùng sử dụng Ví Ethereum của họ để tự xác thực với các dịch vụ Web2 chưa hỗ trợ Ethereum một cách nguyên bản.

Lưu ý rằng hướng dẫn này được viết cho hai đối tượng độc giả riêng biệt:

- Những người dùng Ethereum đã hiểu về Ethereum và cần tìm hiểu về SAML
- Những người dùng Web2 đã hiểu về SAML và xác thực Web2 và cần tìm hiểu về Ethereum

Do đó, bài viết sẽ chứa nhiều tài liệu giới thiệu mà bạn có thể đã biết. Bạn có thể thoải mái bỏ qua phần đó.

### SAML dành cho người dùng Ethereum {#saml-for-ethereum-people}

SAML là một Giao thức tập trung. Một nhà cung cấp dịch vụ (SP) chỉ chấp nhận các khẳng định (chẳng hạn như "đây là người dùng John của tôi, anh ấy nên có quyền thực hiện A, B và C") từ một nhà cung cấp danh tính (IdP) nếu nó có mối quan hệ tin cậy từ trước với IdP đó, hoặc với [tổ chức phát hành chứng chỉ](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) đã ký chứng chỉ của IdP đó.

Ví dụ: SP có thể là một đại lý du lịch cung cấp dịch vụ du lịch cho các công ty và IdP có thể là trang web nội bộ của một công ty. Khi nhân viên cần đặt chuyến công tác, đại lý du lịch sẽ gửi họ đi xác thực bởi công ty trước khi thực sự cho phép họ đặt chuyến đi.

![Step by step SAML process](./fig-01-saml.png)

Đây là cách ba thực thể: trình duyệt, SP và IdP, đàm phán để cấp quyền truy cập. SP không cần biết trước bất kỳ điều gì về người dùng đang sử dụng trình duyệt, chỉ cần tin tưởng IdP.

### Ethereum dành cho người dùng SAML {#ethereum-for-saml-people}

Ethereum là một hệ thống phi tập trung. 

![Ethereum logon](./fig-02-eth-logon.png)

Người dùng có một khóa riêng tư (thường được lưu giữ trong một tiện ích mở rộng trình duyệt). Từ khóa riêng tư, bạn có thể tạo ra một khóa công khai và từ đó tạo ra một Địa chỉ 20 byte. Khi người dùng cần đăng nhập vào một hệ thống, họ được yêu cầu ký một thông điệp với một nonce (một giá trị sử dụng một lần). Máy chủ có thể xác minh chữ ký đã được tạo bởi Địa chỉ đó.

![Getting extra data from attestations](./fig-03-eas-data.png)

chữ ký chỉ xác minh Địa chỉ Ethereum. Để lấy các thuộc tính người dùng khác, bạn thường sử dụng các [chứng thực](https://attest.org/). Một chứng thực thường có các trường sau:

- **Attestor** (Người chứng thực), Địa chỉ đã thực hiện chứng thực
- **Recipient** (Người nhận), Địa chỉ mà chứng thực áp dụng
- **Data** (Dữ liệu), dữ liệu đang được chứng thực, chẳng hạn như tên, quyền hạn, v.v.
- **Schema** (Lược đồ), ID của lược đồ được sử dụng để diễn giải dữ liệu.

Do bản chất phi tập trung của Ethereum, bất kỳ người dùng nào cũng có thể thực hiện các chứng thực. Danh tính của người chứng thực rất quan trọng để xác định những chứng thực nào mà chúng ta coi là đáng tin cậy.

## Thiết lập {#setup}

Bước đầu tiên là để một SAML SP và một SAML IdP giao tiếp với nhau.

1. Tải xuống phần mềm. Phần mềm mẫu cho bài viết này có [trên GitHub](https://github.com/qbzzt/250420-saml-ethereum). Các giai đoạn khác nhau được lưu trữ trong các nhánh khác nhau, đối với giai đoạn này, bạn cần `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Tạo các khóa với chứng chỉ tự ký. Điều này có nghĩa là khóa tự đóng vai trò là tổ chức phát hành chứng chỉ của chính nó và cần được nhập thủ công vào nhà cung cấp dịch vụ. Xem [tài liệu OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) để biết thêm thông tin. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Khởi động các máy chủ (cả SP và IdP)

    ```sh
    pnpm start
    ```

4. Duyệt đến SP tại URL [http://localhost:3000/](http://localhost:3000/) và nhấp vào nút để được chuyển hướng đến IdP (cổng 3001).

5. Cung cấp cho IdP địa chỉ email của bạn và nhấp vào **Login to the service provider** (Đăng nhập vào nhà cung cấp dịch vụ). Bạn sẽ thấy mình được chuyển hướng trở lại nhà cung cấp dịch vụ (cổng 3000) và nó nhận ra bạn qua địa chỉ email của bạn.

### Giải thích chi tiết {#detailed-explanation}

Dưới đây là những gì diễn ra, theo từng bước:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Tệp này chứa cấu hình cho cả Nhà cung cấp danh tính (IdP) và Nhà cung cấp dịch vụ (SP). Thông thường hai thành phần này sẽ là các thực thể khác nhau, nhưng ở đây chúng ta có thể chia sẻ mã để đơn giản hóa.

```typescript
const fs = await import("fs")

const protocol="http"
```

Hiện tại chúng ta chỉ đang thử nghiệm, vì vậy việc sử dụng HTTP là hoàn toàn ổn.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Đọc các khóa công khai, thường có sẵn cho cả hai thành phần (và được tin cậy trực tiếp hoặc được ký bởi một tổ chức phát hành chứng chỉ đáng tin cậy).

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

Các URL cho cả hai thành phần.

```typescript
export const spPublicData = {
```

Dữ liệu công khai cho nhà cung cấp dịch vụ.

```typescript
    entityID: `${spUrl}/metadata`,
```

Theo quy ước, trong SAML, `entityID` là URL nơi siêu dữ liệu của thực thể có sẵn. siêu dữ liệu này tương ứng với dữ liệu công khai ở đây, ngoại trừ việc nó ở định dạng XML.

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

Định nghĩa quan trọng nhất cho mục đích của chúng ta là `assertionConsumerServer`. Điều đó có nghĩa là để khẳng định một điều gì đó (ví dụ: "người dùng gửi cho bạn thông tin này là somebody@example.com") với nhà cung cấp dịch vụ, chúng ta cần sử dụng [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) tới URL `http://localhost:3000/sp/assertion`.

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

Dữ liệu công khai cho nhà cung cấp danh tính cũng tương tự. Nó chỉ định rằng để đăng nhập cho một người dùng, bạn POST tới `http://localhost:3001/idp/login` và để đăng xuất một người dùng, bạn POST tới `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Đây là mã triển khai một nhà cung cấp dịch vụ.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Chúng ta sử dụng Thư viện [`samlify`](https://www.npmjs.com/package/samlify) để triển khai SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Thư viện `samlify` yêu cầu phải có một gói xác thực rằng XML là chính xác, được ký bằng khóa công khai dự kiến, v.v. Chúng ta sử dụng [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) cho mục đích này.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Một [`Router`](https://expressjs.com/en/5x/api.html#router) của [`express`](https://expressjs.com/) là một "trang web thu nhỏ" có thể được gắn bên trong một trang web. Trong trường hợp này, chúng ta sử dụng nó để nhóm tất cả các định nghĩa của nhà cung cấp dịch vụ lại với nhau.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Đại diện riêng của nhà cung cấp dịch vụ về chính nó là tất cả dữ liệu công khai và khóa riêng tư mà nó sử dụng để ký thông tin.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Dữ liệu công khai chứa mọi thứ mà nhà cung cấp dịch vụ cần biết về nhà cung cấp danh tính.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Để kích hoạt khả năng tương tác với các thành phần SAML khác, các nhà cung cấp dịch vụ và danh tính nên có dữ liệu công khai của họ (được gọi là siêu dữ liệu) ở định dạng XML trong `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Đây là trang được trình duyệt truy cập để tự nhận dạng. Khẳng định bao gồm định danh người dùng (ở đây chúng ta sử dụng địa chỉ email) và có thể bao gồm các thuộc tính bổ sung. Đây là trình xử lý cho bước 7 trong biểu đồ trình tự ở trên.

```typescript
  async (req, res) => {
    // console.log(`Phản hồi SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Bạn có thể sử dụng lệnh đã được chú thích để xem dữ liệu XML được cung cấp trong khẳng định. Nó được [mã hóa base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Phân tích cú pháp yêu cầu đăng nhập từ máy chủ danh tính.

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

Gửi một phản hồi HTML, chỉ để cho người dùng thấy chúng ta đã nhận được đăng nhập.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Thông báo cho người dùng trong trường hợp thất bại.

```typescript
spRouter.get('/login',
```

Tạo một yêu cầu đăng nhập khi trình duyệt cố gắng lấy trang này. Đây là trình xử lý cho bước 1 trong biểu đồ trình tự ở trên.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Lấy thông tin để đăng một yêu cầu đăng nhập.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Trang này tự động gửi biểu mẫu (xem bên dưới). Bằng cách này, người dùng không phải làm bất cứ điều gì để được chuyển hướng. Đây là bước 2 trong biểu đồ trình tự ở trên.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

POST tới `loginRequest.entityEndpoint` (URL của điểm cuối nhà cung cấp danh tính).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Tên đầu vào là `loginRequest.type` (`SAMLRequest`). Nội dung cho trường đó là `loginRequest.context`, một lần nữa là XML được mã hóa base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Phần mềm trung gian này](https://expressjs.com/en/5x/api.html#express.urlencoded) đọc phần thân của [yêu cầu HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Theo mặc định, express bỏ qua nó, vì hầu hết các yêu cầu không cần đến nó. Chúng ta cần nó vì POST có sử dụng phần thân.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Gắn bộ định tuyến vào thư mục nhà cung cấp dịch vụ (`/sp`).

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

Nếu một trình duyệt cố gắng lấy thư mục gốc, hãy cung cấp cho nó một liên kết đến trang đăng nhập.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Lắng nghe `spPort` với ứng dụng express này.

#### src/idp.mts {#srcidpmts}

Đây là nhà cung cấp danh tính. Nó rất giống với nhà cung cấp dịch vụ, các giải thích bên dưới dành cho những phần khác biệt.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Giữ nguyên các thuộc tính
    attributeNamePrefix: "@_", // Tiền tố cho các thuộc tính
  }
)
```

Chúng ta cần đọc và hiểu yêu cầu XML mà chúng ta nhận được từ nhà cung cấp dịch vụ.

```typescript
const getLoginPage = requestId => `
```

Hàm này tạo trang với biểu mẫu tự động gửi được trả về trong bước 4 của biểu đồ trình tự ở trên.

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

Có hai trường mà chúng ta gửi cho nhà cung cấp dịch vụ:

1. `requestId` mà chúng ta đang phản hồi.
2. Định danh người dùng (hiện tại chúng ta sử dụng địa chỉ email mà người dùng cung cấp).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Đây là trình xử lý cho bước 5 của biểu đồ trình tự ở trên. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) tạo phản hồi đăng nhập. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Đối tượng tiếp nhận là nhà cung cấp dịch vụ.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Thông tin được trích xuất từ yêu cầu. Tham số duy nhất mà chúng ta quan tâm trong yêu cầu là requestId, cho phép nhà cung cấp dịch vụ khớp các yêu cầu với các phản hồi của chúng.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Đảm bảo việc ký
```

Chúng ta cần `signingKey` để có dữ liệu ký phản hồi. Nhà cung cấp dịch vụ không tin tưởng các yêu cầu chưa được ký.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Đây là trường chứa thông tin người dùng mà chúng ta gửi lại cho nhà cung cấp dịch vụ.

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

Một lần nữa, sử dụng một biểu mẫu tự động gửi. Đây là bước 6 của biểu đồ trình tự ở trên.

```typescript

// Điểm cuối IdP cho các yêu cầu đăng nhập
idpRouter.post(`/login`,
```

Đây là điểm cuối nhận yêu cầu đăng nhập từ nhà cung cấp dịch vụ. Đây là trình xử lý cho bước 3 của biểu đồ trình tự ở trên.

```typescript
  async (req, res) => {
    try {
      // Giải pháp thay thế vì tôi không thể làm cho parseLoginRequest hoạt động.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Chúng ta đáng lẽ có thể sử dụng [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) để đọc ID của yêu cầu xác thực. Tuy nhiên, tôi không thể làm cho nó hoạt động và không đáng để dành nhiều thời gian cho nó nên tôi chỉ sử dụng một [trình phân tích cú pháp XML đa năng](https://www.npmjs.com/package/fast-xml-parser). Thông tin chúng ta cần là thuộc tính `ID` bên trong thẻ `<samlp:AuthnRequest>`, nằm ở cấp cao nhất của XML.

## Sử dụng chữ ký Ethereum {#using-ethereum-signatures}

Bây giờ chúng ta đã có thể gửi danh tính người dùng đến nhà cung cấp dịch vụ, bước tiếp theo là lấy danh tính người dùng một cách đáng tin cậy. Viem cho phép chúng ta chỉ cần hỏi Ví về Địa chỉ người dùng, nhưng điều này có nghĩa là hỏi trình duyệt để lấy thông tin. Chúng ta không kiểm soát trình duyệt, vì vậy chúng ta không thể tự động tin tưởng phản hồi mà chúng ta nhận được từ nó.

Thay vào đó, IdP sẽ gửi cho trình duyệt một chuỗi để ký. Nếu Ví trong trình duyệt ký chuỗi này, điều đó có nghĩa nó thực sự là Địa chỉ đó (tức là nó biết khóa riêng tư tương ứng với Địa chỉ đó).

Để xem điều này hoạt động như thế nào, hãy dừng IdP và SP hiện tại và chạy các lệnh sau:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Sau đó duyệt [đến SP](http://localhost:3000) và làm theo hướng dẫn.

Lưu ý rằng tại thời điểm này, chúng ta chưa biết cách lấy địa chỉ email từ Địa chỉ Ethereum, vì vậy thay vào đó chúng ta báo cáo `<ethereum address>@bad.email.address` cho SP.

### Giải thích chi tiết {#detailed-explanation-2}

Các thay đổi nằm ở các bước 4-5 trong biểu đồ trước đó.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Tệp duy nhất chúng ta đã thay đổi là `idp.mts`. Dưới đây là các phần đã thay đổi.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Chúng ta cần thêm hai Thư viện này. Chúng ta sử dụng [`uuid`](https://www.npmjs.com/package/uuid) để tạo giá trị [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Bản thân giá trị không quan trọng, chỉ cần thực tế là nó chỉ được sử dụng một lần.

Thư viện [`viem`](https://viem.sh/) cho phép chúng ta sử dụng các định nghĩa Ethereum. Ở đây chúng ta cần nó để xác minh rằng chữ ký thực sự hợp lệ.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Ví yêu cầu người dùng cấp quyền để ký thông điệp. Một thông điệp chỉ là một nonce có thể gây nhầm lẫn cho người dùng, vì vậy chúng ta đưa vào lời nhắc này.

```typescript
// Giữ các requestID ở đây
let nonces = {}
```

Chúng ta cần thông tin yêu cầu để có thể phản hồi nó. Chúng ta có thể gửi nó cùng với yêu cầu (bước 4) và nhận lại nó (bước 5). Tuy nhiên, chúng ta không thể tin tưởng thông tin nhận được từ trình duyệt, vốn nằm dưới sự kiểm soát của một người dùng có khả năng gây hại. Vì vậy, tốt hơn là lưu trữ nó ở đây, với nonce làm khóa.

Lưu ý rằng chúng ta đang thực hiện điều đó ở đây dưới dạng một biến vì mục đích đơn giản hóa. Tuy nhiên, điều này có một số nhược điểm:

- Chúng ta dễ bị tấn công từ chối dịch vụ. Một người dùng độc hại có thể cố gắng đăng nhập nhiều lần, làm đầy bộ nhớ của chúng ta.
- Nếu tiến trình IdP cần được khởi động lại, chúng ta sẽ mất các giá trị hiện có.
- Chúng ta không thể cân bằng tải trên nhiều tiến trình, vì mỗi tiến trình sẽ có biến riêng của nó.

Trên một hệ thống sản xuất, chúng ta sẽ sử dụng cơ sở dữ liệu và triển khai một loại cơ chế hết hạn nào đó.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Tạo một nonce và lưu trữ `requestId` để sử dụng trong tương lai.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

JavaScript này được thực thi tự động khi trang được tải.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Chúng ta cần một số hàm từ `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Chúng ta chỉ có thể hoạt động nếu có một Ví trên trình duyệt.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Yêu cầu danh sách các tài khoản từ Ví (`window.ethereum`). Giả sử có ít nhất một tài khoản và chỉ lưu trữ tài khoản đầu tiên. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Tạo một [máy khách Ví](https://viem.sh/docs/clients/wallet) để tương tác với Ví trình duyệt.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Yêu cầu người dùng ký một thông điệp. Vì toàn bộ HTML này nằm trong một [chuỗi mẫu](https://viem.sh/docs/clients/wallet), chúng ta có thể sử dụng các biến được định nghĩa trong tiến trình idp. Đây là bước 4.5 trong biểu đồ trình tự.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Chuyển hướng đến `/idp/signature/<nonce>/<address>/<signature>`. Đây là bước 5 trong biểu đồ trình tự.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

chữ ký được gửi lại bởi trình duyệt, vốn có khả năng độc hại (không có gì ngăn cản bạn chỉ cần mở `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` trong trình duyệt). Do đó, điều quan trọng là phải xác minh tiến trình IdP xử lý các chữ ký không hợp lệ một cách chính xác.

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

Phần còn lại chỉ là HTML tiêu chuẩn.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Đây là trình xử lý cho bước 5 trong biểu đồ trình tự.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Lấy ID yêu cầu và xóa nonce khỏi `nonces` để đảm bảo nó không thể được sử dụng lại.

```typescript
  try {
```

Vì có rất nhiều cách khiến chữ ký có thể không hợp lệ, chúng ta bọc phần này trong một khối `try ... catch` để bắt bất kỳ lỗi nào được ném ra.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Sử dụng [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) để triển khai bước 5.5 trong biểu đồ trình tự.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Phần còn lại của trình xử lý tương đương với những gì chúng ta đã làm trong trình xử lý `/loginSubmitted` trước đó, ngoại trừ một thay đổi nhỏ.

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

Chúng ta không có địa chỉ email thực tế (chúng ta sẽ lấy nó trong phần tiếp theo), vì vậy hiện tại chúng ta trả về Địa chỉ Ethereum và đánh dấu rõ ràng rằng nó không phải là một địa chỉ email.


```typescript
// Điểm cuối IdP cho các yêu cầu đăng nhập
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Giải pháp thay thế vì tôi không thể làm cho parseLoginRequest hoạt động.
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

Thay vì `getLoginPage`, bây giờ hãy sử dụng `getSignaturePage` trong trình xử lý bước 3.

## Lấy địa chỉ email {#getting-the-email-address}

Bước tiếp theo là lấy địa chỉ email, định danh được yêu cầu bởi nhà cung cấp dịch vụ. Để làm điều đó, chúng ta sử dụng [Dịch vụ chứng thực Ethereum (EAS)](https://attest.org/).

Cách dễ nhất để lấy các chứng thực là sử dụng [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Chúng ta sử dụng truy vấn này:

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

[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) này chỉ bao gồm một địa chỉ email. Truy vấn này yêu cầu các chứng thực của lược đồ này. Đối tượng của chứng thực được gọi là `recipient`. Nó luôn là một Địa chỉ Ethereum.

Cảnh báo: Cách chúng ta đang lấy các chứng thực ở đây có hai vấn đề về bảo mật.

- Chúng ta đang đi đến điểm cuối API, `https://optimism.easscan.org/graphql`, vốn là một thành phần tập trung. Chúng ta có thể lấy thuộc tính `id` và sau đó thực hiện tra cứu trên chuỗi để xác minh rằng một chứng thực là có thật, nhưng điểm cuối API vẫn có thể kiểm duyệt các chứng thực bằng cách không cho chúng ta biết về chúng. 

  Vấn đề này không phải là không thể giải quyết, chúng ta có thể chạy điểm cuối GraphQL của riêng mình và lấy các chứng thực từ các Nhật ký của Chuỗi, nhưng điều đó là quá mức cần thiết cho mục đích của chúng ta.

- Chúng ta không xem xét danh tính người chứng thực. Bất kỳ ai cũng có thể cung cấp cho chúng ta thông tin sai lệch. Trong một triển khai thực tế, chúng ta sẽ có một tập hợp các người chứng thực đáng tin cậy và chỉ xem xét các chứng thực của họ.

Để xem điều này hoạt động như thế nào, hãy dừng IdP và SP hiện tại và chạy các lệnh sau:

```sh
git checkout email-address
pnpm install
pnpm start
```

Sau đó cung cấp địa chỉ email của bạn. Bạn có hai cách để làm điều đó:

- Nhập một Ví bằng khóa riêng tư và sử dụng khóa riêng tư thử nghiệm `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Thêm một chứng thực cho địa chỉ email của riêng bạn:

  1. Duyệt đến [lược đồ trong trình khám phá chứng thực](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Nhấp vào **Attest with Schema** (Chứng thực với Lược đồ).

  3. Nhập Địa chỉ Ethereum của bạn làm người nhận, địa chỉ email của bạn làm địa chỉ email và chọn **Onchain** (trên chuỗi). Sau đó nhấp vào **Make Attestation** (Tạo chứng thực).

  4. chấp thuận giao dịch trong Ví của bạn. Bạn sẽ cần một ít ETH trên [Chuỗi khối Optimism](https://app.optimism.io/bridge/deposit) để trả phí Gas.

Dù bằng cách nào, sau khi bạn thực hiện việc này, hãy duyệt đến [http://localhost:3000](http://localhost:3000) và làm theo hướng dẫn. Nếu bạn đã nhập khóa riêng tư thử nghiệm, email bạn nhận được là `test_addr_0@example.com`. Nếu bạn đã sử dụng Địa chỉ của riêng mình, nó sẽ là bất cứ thứ gì bạn đã chứng thực.

### Giải thích chi tiết {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Các bước mới là giao tiếp GraphQL, các bước 5.6 và 5.7.

Một lần nữa, đây là các phần đã thay đổi của `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Nhập các Thư viện chúng ta cần.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Có [một điểm cuối riêng biệt cho mỗi Chuỗi khối](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Tạo một máy khách `GraphQLClient` mới mà chúng ta có thể sử dụng để truy vấn điểm cuối.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL chỉ cung cấp cho chúng ta một đối tượng dữ liệu mờ với các byte. Để hiểu nó, chúng ta cần lược đồ. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Một hàm để lấy từ một Địa chỉ Ethereum sang một địa chỉ email.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Đây là một truy vấn GraphQL.

```typescript
      attestations(
```

Chúng ta đang tìm kiếm các chứng thực.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Các chứng thực mà chúng ta muốn là những chứng thực trong lược đồ của chúng ta, nơi người nhận là `getAddress(ethAddr)`. Hàm [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) đảm bảo Địa chỉ của chúng ta có [tổng kiểm tra](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) chính xác. Điều này là cần thiết vì GraphQL phân biệt chữ hoa chữ thường. "0xBAD060A7", "0xBad060A7" và "0xbad060a7" là các giá trị khác nhau.

```typescript
        take: 1
```

Bất kể chúng ta tìm thấy bao nhiêu chứng thực, chúng ta chỉ muốn cái đầu tiên.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Các trường mà chúng ta muốn nhận.

- `attester`: Địa chỉ đã gửi chứng thực. Thông thường, điều này được sử dụng để quyết định xem có nên tin tưởng chứng thực hay không.
- `id`: ID chứng thực. Bạn có thể sử dụng giá trị này để [đọc chứng thực trên chuỗi](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) nhằm xác minh rằng thông tin từ truy vấn GraphQL là chính xác.
- `data`: Dữ liệu lược đồ (trong trường hợp này là địa chỉ email).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Nếu không có chứng thực, hãy trả về một giá trị rõ ràng là không chính xác, nhưng có vẻ hợp lệ đối với nhà cung cấp dịch vụ.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Nếu có một giá trị, hãy sử dụng `decodeData` để giải mã dữ liệu. Chúng ta không cần siêu dữ liệu mà nó cung cấp, chỉ cần bản thân giá trị đó.

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

Sử dụng hàm mới để lấy địa chỉ email.

## Còn về sự phi tập trung thì sao? {#what-about-decentralization}

Trong cấu hình này, người dùng không thể giả vờ là một người khác, miễn là chúng ta dựa vào các người chứng thực đáng tin cậy cho việc ánh xạ Địa chỉ Ethereum sang địa chỉ email. Tuy nhiên, nhà cung cấp danh tính của chúng ta vẫn là một thành phần tập trung. Bất kỳ ai có khóa riêng tư của nhà cung cấp danh tính đều có thể gửi thông tin sai lệch cho nhà cung cấp dịch vụ.

Có thể có một giải pháp sử dụng [tính toán đa bên (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Tôi hy vọng sẽ viết về nó trong một hướng dẫn tương lai.

## Kết luận {#conclusion}

Việc áp dụng một tiêu chuẩn đăng nhập, chẳng hạn như chữ ký Ethereum, phải đối mặt với vấn đề con gà và quả trứng. Các nhà cung cấp dịch vụ muốn thu hút thị trường rộng lớn nhất có thể. Người dùng muốn có thể truy cập các dịch vụ mà không phải lo lắng về việc hỗ trợ tiêu chuẩn đăng nhập của họ.
Việc tạo ra các bộ điều hợp, chẳng hạn như một IdP Ethereum, có thể giúp chúng ta vượt qua rào cản này.

[Xem thêm các bài viết khác của tôi tại đây](https://cryptodocguy.pro/).