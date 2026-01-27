---
title: "Sử dụng Ethereum để xác thực web2"
description: "Sau khi đọc hướng dẫn này, nhà phát triển sẽ có thể tích hợp đăng nhập Ethereum (web3) với đăng nhập SAML, một tiêu chuẩn được sử dụng trong web2 để cung cấp đăng nhập một lần và các dịch vụ liên quan khác. Điều này cho phép quyền truy cập vào các tài nguyên web2 được xác thực thông qua chữ ký Ethereum, với các thuộc tính người dùng đến từ các sự chứng thực."
author: Ori Pomerantz
tags: [ "web2", "xác thực", "eas" ]
skill: beginner
lang: vi
published: 2025-04-30
---

## Giới thiệu

[SAML](https://www.onelogin.com/learn/saml) là một tiêu chuẩn được sử dụng trên web2 để cho phép một [nhà cung cấp danh tính (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) cung cấp thông tin người dùng cho [nhà cung cấp dịch vụ (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

Trong hướng dẫn này, bạn sẽ học cách tích hợp chữ ký Ethereum với SAML để cho phép người dùng sử dụng ví Ethereum của họ để tự xác thực với các dịch vụ web2 chưa hỗ trợ Ethereum nguyên bản.

Lưu ý rằng hướng dẫn này được viết cho hai đối tượng riêng biệt:

- Những người Ethereum hiểu về Ethereum và cần học SAML
- Những người Web2 hiểu về SAML và xác thực web2 và cần học Ethereum

Do đó, nó sẽ chứa rất nhiều tài liệu giới thiệu mà bạn đã biết. Hãy thoải mái bỏ qua nó.

### SAML cho những người Ethereum

SAML là một giao thức tập trung. Một nhà cung cấp dịch vụ (SP) chỉ chấp nhận các xác nhận (chẳng hạn như "đây là người dùng John của tôi, anh ta nên có quyền thực hiện A, B và C") từ một nhà cung cấp danh tính (IdP) nếu nó có mối quan hệ tin cậy từ trước với nó, hoặc với [cơ quan cấp chứng chỉ](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) đã ký chứng chỉ của IdP đó.

Ví dụ, SP có thể là một công ty du lịch cung cấp dịch vụ du lịch cho các công ty, và IdP có thể là một trang web nội bộ của công ty. Khi nhân viên cần đặt chuyến đi công tác, công ty du lịch sẽ gửi họ đến công ty để xác thực trước khi cho phép họ thực sự đặt chuyến đi.

![Quy trình SAML từng bước](./fig-01-saml.png)

Đây là cách ba thực thể, trình duyệt, SP và IdP, đàm phán để truy cập. SP không cần biết trước bất cứ điều gì về người dùng đang sử dụng trình duyệt, chỉ cần tin tưởng vào IdP.

### Ethereum cho những người SAML

Ethereum là một hệ thống phi tập trung.

![Đăng nhập Ethereum](./fig-02-eth-logon.png)

Người dùng có một khóa riêng tư (thường được giữ trong một tiện ích mở rộng của trình duyệt). Từ khóa riêng tư, bạn có thể lấy ra một khóa công khai, và từ đó ra một địa chỉ 20-byte. Khi người dùng cần đăng nhập vào một hệ thống, họ được yêu cầu ký một thông điệp với một nonce (một giá trị sử dụng một lần). Máy chủ có thể xác minh chữ ký đã được tạo bởi địa chỉ đó.

![Lấy dữ liệu bổ sung từ các sự chứng thực](./fig-03-eas-data.png)

Chữ ký chỉ xác minh địa chỉ Ethereum. Để có được các thuộc tính người dùng khác, bạn thường sử dụng [sự chứng thực](https://attest.org/). Một sự chứng thực thường có các trường sau:

- **Người chứng thực**, địa chỉ đã thực hiện sự chứng thực
- **Người nhận**, địa chỉ mà sự chứng thực áp dụng cho
- **Dữ liệu**, dữ liệu đang được chứng thực, chẳng hạn như tên, quyền, v.v.
- **Lược đồ**, ID của lược đồ được sử dụng để diễn giải dữ liệu.

Do bản chất phi tập trung của Ethereum, bất kỳ người dùng nào cũng có thể thực hiện sự chứng thực. Danh tính của người chứng thực rất quan trọng để xác định sự chứng thực nào chúng ta coi là đáng tin cậy.

## Cài đặt

Bước đầu tiên là có một SAML SP và một SAML IdP giao tiếp với nhau.

1. Tải xuống phần mềm. Phần mềm mẫu cho bài viết này có [trên github](https://github.com/qbzzt/250420-saml-ethereum). Các giai đoạn khác nhau được lưu trữ trong các nhánh khác nhau, đối với giai đoạn này bạn muốn `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Tạo khóa với chứng chỉ tự ký. Điều này có nghĩa là khóa là cơ quan cấp chứng chỉ của chính nó, và cần được nhập thủ công vào nhà cung cấp dịch vụ. Xem [tài liệu OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) để biết thêm thông tin.

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

5. Cung cấp cho IdP địa chỉ email của bạn và nhấp vào **Đăng nhập vào nhà cung cấp dịch vụ**. Xem rằng bạn được chuyển hướng trở lại nhà cung cấp dịch vụ (cổng 3000) và nó biết bạn qua địa chỉ email của bạn.

### Giải thích chi tiết

Đây là những gì xảy ra, từng bước một:

![Đăng nhập SAML thông thường không có Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Tệp này chứa cấu hình cho cả Nhà cung cấp danh tính và Nhà cung cấp dịch vụ. Thông thường hai thực thể này sẽ khác nhau, nhưng ở đây chúng ta có thể chia sẻ mã cho đơn giản.

```typescript
const fs = await import("fs")

const protocol="http"
```

Hiện tại chúng ta chỉ đang thử nghiệm, vì vậy sử dụng HTTP là được.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Đọc các khóa công khai, thường có sẵn cho cả hai thành phần (và hoặc được tin cậy trực tiếp, hoặc được ký bởi một cơ quan cấp chứng chỉ đáng tin cậy).

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

Theo quy ước, trong SAML, `entityID` là URL nơi siêu dữ liệu của thực thể có sẵn. Siêu dữ liệu này tương ứng với dữ liệu công khai ở đây, ngoại trừ nó ở dạng XML.

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

Định nghĩa quan trọng nhất cho mục đích của chúng ta là `assertionConsumerServer`. Nó có nghĩa là để xác nhận một điều gì đó (ví dụ, "người dùng gửi cho bạn thông tin này là somebody@example.com") cho nhà cung cấp dịch vụ, chúng ta cần sử dụng [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) đến URL `http://localhost:3000/sp/assertion`.

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

Dữ liệu công khai cho nhà cung cấp danh tính là tương tự. Nó chỉ định rằng để đăng nhập một người dùng, bạn POST đến `http://localhost:3001/idp/login` và để đăng xuất một người dùng, bạn POST đến `http://localhost:3001/idp/logout`.

#### src/sp.mts

Đây là mã triển khai một nhà cung cấp dịch vụ.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Chúng tôi sử dụng thư viện [`samlify`](https://www.npmjs.com/package/samlify) để triển khai SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Thư viện `samlify` mong đợi có một gói xác thực rằng XML là chính xác, được ký bằng khóa công khai dự kiến, v.v. Chúng tôi sử dụng [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) cho mục đích này.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Một [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) là một "trang web nhỏ" có thể được gắn bên trong một trang web. Trong trường hợp này, chúng tôi sử dụng nó để nhóm tất cả các định nghĩa nhà cung cấp dịch vụ lại với nhau.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Đại diện của chính nhà cung cấp dịch vụ là tất cả dữ liệu công khai, và khóa riêng tư mà nó sử dụng để ký thông tin.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Dữ liệu công khai chứa mọi thứ mà nhà cung cấp dịch vụ cần biết về nhà cung cấp danh tính.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Để cho phép khả năng tương tác với các thành phần SAML khác, các nhà cung cấp dịch vụ và danh tính nên có dữ liệu công khai của họ (được gọi là siêu dữ liệu) có sẵn ở định dạng XML trong `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Đây là trang được trình duyệt truy cập để tự nhận dạng. Xác nhận bao gồm mã định danh người dùng (ở đây chúng tôi sử dụng địa chỉ email), và có thể bao gồm các thuộc tính bổ sung. Đây là trình xử lý cho bước 7 trong sơ đồ tuần tự ở trên.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Bạn có thể sử dụng lệnh đã được chú thích để xem dữ liệu XML được cung cấp trong xác nhận. Nó được [mã hóa base64](https://en.wikipedia.org/wiki/Base64).

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

Tạo một yêu cầu đăng nhập khi trình duyệt cố gắng lấy trang này. Đây là trình xử lý cho bước 1 trong sơ đồ tuần tự ở trên.

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

Trang này tự động gửi biểu mẫu (xem bên dưới). Bằng cách này, người dùng không phải làm gì để được chuyển hướng. Đây là bước 2 trong sơ đồ tuần tự ở trên.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Đăng lên `loginRequest.entityEndpoint` (URL của điểm cuối nhà cung cấp danh tính).

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

[Phần mềm trung gian này](https://expressjs.com/en/5x/api.html#express.urlencoded) đọc phần thân của [yêu cầu HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Theo mặc định, express bỏ qua nó, vì hầu hết các yêu cầu không cần nó. Chúng ta cần nó vì POST có sử dụng phần thân.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Gắn bộ định tuyến trong thư mục nhà cung cấp dịch vụ (`/sp`).

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

#### src/idp.mts

Đây là nhà cung cấp danh tính. Nó rất tương tự với nhà cung cấp dịch vụ, các giải thích dưới đây dành cho các phần khác nhau.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

Chúng ta cần đọc và hiểu yêu cầu XML mà chúng ta nhận được từ nhà cung cấp dịch vụ.

```typescript
const getLoginPage = requestId => `
```

Hàm này tạo ra trang với biểu mẫu tự động gửi được trả về trong bước 4 của sơ đồ tuần tự ở trên.

```typescript
<html>
  <head>
    <title>Trang đăng nhập</title>
  </head>
  <body>
    <h2>Trang đăng nhập</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Địa chỉ email: <input name="email" />
      <br />
      <button type="Submit">
        Đăng nhập vào nhà cung cấp dịch vụ
      </button>
```

Có hai trường chúng ta gửi cho nhà cung cấp dịch vụ:

1. `requestId` mà chúng ta đang phản hồi.
2. Mã định danh người dùng (chúng tôi sử dụng địa chỉ email mà người dùng cung cấp hiện tại).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Đây là trình xử lý cho bước 5 trong sơ đồ tuần tự ở trên. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) tạo phản hồi đăng nhập.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Đối tượng là nhà cung cấp dịch vụ.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Thông tin được trích xuất từ yêu cầu. Tham số duy nhất mà chúng ta quan tâm trong yêu cầu là requestId, cho phép nhà cung cấp dịch vụ khớp các yêu cầu và phản hồi của chúng.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

Chúng ta cần `signingKey` để có dữ liệu ký phản hồi. Nhà cung cấp dịch vụ không tin tưởng các yêu cầu không được ký.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Đây là trường chứa thông tin người dùng mà chúng tôi gửi lại cho nhà cung cấp dịch vụ.

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

Một lần nữa, sử dụng một biểu mẫu tự động gửi. Đây là bước 6 trong sơ đồ tuần tự ở trên.

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

Đây là điểm cuối nhận yêu cầu đăng nhập từ nhà cung cấp dịch vụ. Đây là trình xử lý cho bước 3 của sơ đồ tuần tự ở trên.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Chúng ta nên có thể sử dụng [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) để đọc ID của yêu cầu xác thực. Tuy nhiên, tôi không thể làm cho nó hoạt động và không đáng để dành nhiều thời gian cho nó nên tôi chỉ sử dụng một [trình phân tích cú pháp XML đa năng](https://www.npmjs.com/package/fast-xml-parser). Thông tin chúng ta cần là thuộc tính `ID` bên trong thẻ `<samlp:AuthnRequest>`, nằm ở cấp cao nhất của XML.

## Sử dụng chữ ký Ethereum

Bây giờ chúng ta có thể gửi danh tính người dùng đến nhà cung cấp dịch vụ, bước tiếp theo là lấy danh tính người dùng một cách đáng tin cậy. Viem cho phép chúng ta chỉ cần yêu cầu ví cung cấp địa chỉ người dùng, nhưng điều này có nghĩa là yêu cầu trình duyệt cung cấp thông tin. Chúng ta không kiểm soát trình duyệt, vì vậy chúng ta không thể tự động tin tưởng vào phản hồi mà chúng ta nhận được từ nó.

Thay vào đó, IdP sẽ gửi cho trình duyệt một chuỗi để ký. Nếu ví trong trình duyệt ký chuỗi này, điều đó có nghĩa là nó thực sự là địa chỉ đó (tức là, nó biết khóa riêng tư tương ứng với địa chỉ đó).

Để thấy điều này hoạt động, hãy dừng IdP và SP hiện có và chạy các lệnh sau:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Sau đó duyệt đến [SP](http://localhost:3000) và làm theo hướng dẫn.

Lưu ý rằng tại thời điểm này, chúng tôi không biết cách lấy địa chỉ email từ địa chỉ Ethereum, vì vậy thay vào đó, chúng tôi báo cáo `<địa chỉ ethereum>@bad.email.address` cho SP.

### Giải thích chi tiết

Những thay đổi nằm ở bước 4-5 trong sơ đồ trước.

![SAML với chữ ký Ethereum](./fig-05-saml-w-signature.png)

Tệp duy nhất chúng tôi đã thay đổi là `idp.mts`. Đây là các phần đã thay đổi.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Chúng ta cần hai thư viện bổ sung này. Chúng tôi sử dụng [`uuid`](https://www.npmjs.com/package/uuid) để tạo giá trị [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Giá trị của chính nó không quan trọng, chỉ có điều nó chỉ được sử dụng một lần.

Thư viện [`viem`](https://viem.sh/) cho phép chúng tôi sử dụng các định nghĩa Ethereum. Ở đây chúng tôi cần nó để xác minh rằng chữ ký thực sự hợp lệ.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Ví yêu cầu người dùng cho phép ký thông điệp. Một thông điệp chỉ là một nonce có thể gây nhầm lẫn cho người dùng, vì vậy chúng tôi bao gồm lời nhắc này.

```typescript
// Keep requestIDs here
let nonces = {}
```

Chúng tôi cần thông tin yêu cầu để có thể phản hồi nó. Chúng tôi có thể gửi nó cùng với yêu cầu (bước 4), và nhận lại nó (bước 5). Tuy nhiên, chúng tôi không thể tin tưởng thông tin chúng tôi nhận được từ trình duyệt, vốn nằm dưới sự kiểm soát của một người dùng có thể có ý đồ xấu. Vì vậy, tốt hơn là lưu trữ nó ở đây, với nonce làm khóa.

Lưu ý rằng chúng tôi đang thực hiện ở đây như một biến để đơn giản. Tuy nhiên, điều này có một số nhược điểm:

- Chúng ta dễ bị tấn công từ chối dịch vụ. Một người dùng độc hại có thể cố gắng đăng nhập nhiều lần, làm đầy bộ nhớ của chúng ta.
- Nếu quy trình IdP cần được khởi động lại, chúng ta sẽ mất các giá trị hiện có.
- Chúng tôi không thể cân bằng tải trên nhiều quy trình, bởi vì mỗi quy trình sẽ có biến riêng.

Trên một hệ thống sản xuất, chúng tôi sẽ sử dụng cơ sở dữ liệu và triển khai một loại cơ chế hết hạn nào đó.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Tạo một nonce, và lưu trữ `requestId` để sử dụng trong tương lai.

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

Chúng tôi cần một số hàm từ `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Chúng tôi chỉ có thể làm việc nếu có một ví trên trình duyệt.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Yêu cầu danh sách các tài khoản từ ví (`window.ethereum`). Giả sử có ít nhất một, và chỉ lưu trữ cái đầu tiên.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Tạo một [ứng dụng ví](https://viem.sh/docs/clients/wallet) để tương tác với ví trình duyệt.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Yêu cầu người dùng ký một thông điệp. Vì toàn bộ HTML này nằm trong một [chuỗi mẫu](https://viem.sh/docs/clients/wallet), chúng ta có thể sử dụng các biến được định nghĩa trong quy trình idp. Đây là bước 4.5 trong sơ đồ tuần tự.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Chuyển hướng đến `/idp/signature/<nonce>/<address>/<signature>`. Đây là bước 5 trong sơ đồ tuần tự.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Chữ ký được gửi lại bởi trình duyệt, có khả năng là độc hại (không có gì ngăn cản bạn chỉ cần mở `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` trong trình duyệt). Do đó, điều quan trọng là phải xác minh quy trình IdP xử lý các chữ ký xấu một cách chính xác.

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

Đây là trình xử lý cho bước 5 trong sơ đồ tuần tự.

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

Bởi vì có rất nhiều cách mà chữ ký có thể không hợp lệ, chúng tôi bao bọc điều này trong một `try ... khối `catch` để bắt bất kỳ lỗi nào được ném ra.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Sử dụng [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) để triển khai bước 5.5 trong sơ đồ tuần tự.

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

Chúng tôi không có địa chỉ email thực tế (chúng tôi sẽ lấy nó trong phần tiếp theo), vì vậy hiện tại chúng tôi trả về địa chỉ Ethereum và đánh dấu rõ ràng nó không phải là địa chỉ email.

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

Thay vì `getLoginPage`, bây giờ sử dụng `getSignaturePage` trong trình xử lý bước 3.

## Lấy địa chỉ email

Bước tiếp theo là lấy địa chỉ email, mã định danh được yêu cầu bởi nhà cung cấp dịch vụ. Để làm điều đó, chúng tôi sử dụng [Dịch vụ Chứng thực Ethereum (EAS)](https://attest.org/).

Cách dễ nhất để có được sự chứng thực là sử dụng [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Chúng tôi sử dụng truy vấn này:

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

[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) này chỉ bao gồm một địa chỉ e-mail. Truy vấn này yêu cầu các sự chứng thực của lược đồ này. Chủ thể của sự chứng thực được gọi là `recipient`. Nó luôn là một địa chỉ Ethereum.

Cảnh báo: Cách chúng tôi lấy sự chứng thực ở đây có hai vấn đề bảo mật.

- Chúng tôi đang đi đến điểm cuối API, `https://optimism.easscan.org/graphql`, là một thành phần tập trung. Chúng ta có thể lấy thuộc tính `id` và sau đó thực hiện một tra cứu trên chuỗi để xác minh rằng một sự chứng thực là thật, nhưng điểm cuối API vẫn có thể kiểm duyệt các sự chứng thực bằng cách không cho chúng ta biết về chúng.

  Vấn đề này không phải là không thể giải quyết, chúng tôi có thể chạy điểm cuối GraphQL của riêng mình và lấy sự chứng thực từ nhật ký chuỗi, nhưng điều đó là quá mức cần thiết cho mục đích của chúng tôi.

- Chúng tôi không xem xét danh tính của người chứng thực. Bất cứ ai cũng có thể cung cấp cho chúng tôi thông tin sai lệch. Trong một triển khai thực tế, chúng tôi sẽ có một tập hợp các người chứng thực đáng tin cậy và chỉ xem xét sự chứng thực của họ.

Để thấy điều này hoạt động, hãy dừng IdP và SP hiện có và chạy các lệnh sau:

```sh
git checkout email-address
pnpm install
pnpm start
```

Sau đó, cung cấp địa chỉ e-mail của bạn. Bạn có hai cách để làm điều đó:

- Nhập một ví bằng cách sử dụng một khóa riêng tư, và sử dụng khóa riêng tư thử nghiệm `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Thêm một sự chứng thực cho địa chỉ e-mail của riêng bạn:

  1. Duyệt đến [lược đồ trong trình khám phá sự chứng thực](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Nhấp vào **Chứng thực với Lược đồ**.

  3. Nhập địa chỉ Ethereum của bạn làm người nhận, địa chỉ e-mail của bạn làm địa chỉ email và chọn **Trên chuỗi**. Sau đó nhấp vào **Thực hiện Chứng thực**.

  4. Phê duyệt giao dịch trong ví của bạn. Bạn sẽ cần một ít ETH trên [Chuỗi khối Optimism](https://app.optimism.io/bridge/deposit) để trả gas.

Dù bằng cách nào, sau khi bạn làm điều này, hãy duyệt đến [http://localhost:3000](http://localhost:3000) và làm theo hướng dẫn. Nếu bạn đã nhập khóa riêng tư thử nghiệm, e-mail bạn nhận được là `test_addr_0@example.com`. Nếu bạn đã sử dụng địa chỉ của riêng mình, nó phải là bất cứ điều gì bạn đã chứng thực.

### Giải thích chi tiết

![Lấy từ địa chỉ Ethereum sang e-mail](./fig-06-saml-sig-n-email.png)

Các bước mới là giao tiếp GraphQL, bước 5.6 và 5.7.

Một lần nữa, đây là các phần đã thay đổi của `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Nhập các thư viện chúng ta cần.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Có [một điểm cuối riêng cho mỗi chuỗi khối](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Tạo một ứng dụng `GraphQLClient` mới mà chúng ta có thể sử dụng để truy vấn điểm cuối.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL chỉ cung cấp cho chúng ta một đối tượng dữ liệu mờ với các byte. Để hiểu nó, chúng ta cần lược đồ.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Một hàm để lấy từ địa chỉ Ethereum sang địa chỉ e-mail.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Đây là một truy vấn GraphQL.

```typescript
      attestations(
```

Chúng tôi đang tìm kiếm các sự chứng thực.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Các sự chứng thực chúng tôi muốn là những sự chứng thực trong lược đồ của chúng tôi, nơi người nhận là `getAddress(ethAddr)`. Hàm [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) đảm bảo địa chỉ của chúng tôi có [tổng kiểm tra](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) chính xác. Điều này là cần thiết về GraphQL là phân biệt chữ hoa chữ thường. "0xBAD060A7", "0xBad060A7", và "0xbad060a7" là các giá trị khác nhau.

```typescript
        take: 1
```

Bất kể chúng tôi tìm thấy bao nhiêu sự chứng thực, chúng tôi chỉ muốn cái đầu tiên.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Các trường chúng tôi muốn nhận.

- `attester`: Địa chỉ đã gửi sự chứng thực. Thông thường, điều này được sử dụng để quyết định có tin tưởng sự chứng thực hay không.
- `id`: ID sự chứng thực. Bạn có thể sử dụng giá trị này để [đọc sự chứng thực trên chuỗi](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) để xác minh rằng thông tin từ truy vấn GraphQL là chính xác.
- `data`: Dữ liệu lược đồ (trong trường hợp này là địa chỉ e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Nếu không có sự chứng thực nào, hãy trả về một giá trị rõ ràng là không chính xác, nhưng sẽ có vẻ hợp lệ đối với nhà cung cấp dịch vụ.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Nếu có giá trị, hãy sử dụng `decodeData` để giải mã dữ liệu. Chúng tôi không cần siêu dữ liệu mà nó cung cấp, chỉ cần chính giá trị.

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

Sử dụng hàm mới để lấy địa chỉ e-mail.

## Thế còn tính phi tập trung thì sao?

Trong cấu hình này, người dùng không thể giả vờ là người mà họ không phải, miễn là chúng tôi dựa vào những người chứng thực đáng tin cậy cho việc ánh xạ địa chỉ Ethereum sang địa chỉ e-mail. Tuy nhiên, nhà cung cấp danh tính của chúng tôi vẫn là một thành phần tập trung. Bất cứ ai có khóa riêng tư của nhà cung cấp danh tính đều có thể gửi thông tin sai lệch cho nhà cung cấp dịch vụ.

Có thể có một giải pháp sử dụng [tính toán đa bên (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Tôi hy vọng sẽ viết về nó trong một hướng dẫn trong tương lai.

## Kết luận

Việc áp dụng một tiêu chuẩn đăng nhập, chẳng hạn như chữ ký Ethereum, phải đối mặt với vấn đề con gà và quả trứng. Các nhà cung cấp dịch vụ muốn thu hút thị trường rộng lớn nhất có thể. Người dùng muốn có thể truy cập các dịch vụ mà không cần phải lo lắng về việc hỗ trợ tiêu chuẩn đăng nhập của họ.
Việc tạo các bộ điều hợp, chẳng hạn như một IdP Ethereum, có thể giúp chúng ta vượt qua trở ngại này.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
