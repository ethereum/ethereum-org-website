---
title: "Web2 kimlik doğrulaması için Ethereum kullanmak"
description: "Bu öğreticiyi okuduktan sonra bir geliştirici, Ethereum girişini (web3), tek oturum açma ve diğer ilgili hizmetleri sağlamak için Web2'de kullanılan bir standart olan SAML girişiyle entegre edebilecektir. Bu, kullanıcı özniteliklerinin onaylardan gelmesiyle, Web2 kaynaklarına erişimin Ethereum imzaları aracılığıyla doğrulanmasına olanak tanır."
author: Ori Pomerantz
tags:
  - Web2
  - kimlik doğrulama
  - eas
skill: beginner
breadcrumb: "Web2 kimlik doğrulaması için Ethereum"
lang: tr
published: 2025-04-30
---

## Giriş {#introduction}

[SAML](https://www.onelogin.com/learn/saml), bir [kimlik sağlayıcısının (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) [hizmet sağlayıcıları (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) için kullanıcı bilgileri sağlamasına olanak tanımak amacıyla Web2'de kullanılan bir standarttır.

Bu öğreticide, kullanıcıların henüz yerel olarak Ethereum'u desteklemeyen Web2 hizmetlerinde kimliklerini doğrulamak için Ethereum cüzdanlarını kullanmalarına olanak tanımak amacıyla Ethereum imzalarını SAML ile nasıl entegre edeceğinizi öğreneceksiniz.

Bu öğreticinin iki ayrı kitle için yazıldığını unutmayın:

- Ethereum'u anlayan ve SAML'yi öğrenmesi gereken Ethereum kullanıcıları
- SAML'yi ve Web2 kimlik doğrulamasını anlayan ve Ethereum'u öğrenmesi gereken Web2 kullanıcıları

Sonuç olarak, zaten bildiğiniz birçok giriş niteliğinde materyal içerecektir. Bunları atlamaktan çekinmeyin.

### Ethereum kullanıcıları için SAML {#saml-for-ethereum-people}

SAML merkezi bir protokoldür. Bir hizmet sağlayıcı (SP), bir kimlik sağlayıcıdan (IdP) gelen doğrulamaları (örneğin "bu benim kullanıcım John, A, B ve C işlemlerini yapma izinlerine sahip olmalı" gibi) yalnızca onunla veya o IdP'nin sertifikasını imzalayan [sertifika yetkilisi](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) ile önceden var olan bir güven ilişkisi varsa kabul eder.

Örneğin, SP şirketlere seyahat hizmetleri sunan bir seyahat acentesi olabilir ve IdP bir şirketin dahili web sitesi olabilir. Çalışanların iş seyahati rezervasyonu yapması gerektiğinde, seyahat acentesi onların gerçekten seyahat rezervasyonu yapmasına izin vermeden önce kimlik doğrulaması için onları şirkete gönderir.

![Step by step SAML process](./fig-01-saml.png)

Tarayıcı, SP ve IdP olmak üzere üç varlığın erişim için pazarlık yapma şekli budur. SP'nin tarayıcıyı kullanan kullanıcı hakkında önceden hiçbir şey bilmesine gerek yoktur, yalnızca IdP'ye güvenmesi yeterlidir.

### SAML kullanıcıları için Ethereum {#ethereum-for-saml-people}

Ethereum merkeziyetsiz bir sistemdir. 

![Ethereum logon](./fig-02-eth-logon.png)

Kullanıcıların bir özel anahtarı vardır (genellikle bir tarayıcı uzantısında tutulur). Özel anahtardan bir açık anahtar ve ondan da 20 baytlık bir adres türetebilirsiniz. Kullanıcıların bir sisteme giriş yapması gerektiğinde, bir nonce (tek kullanımlık bir değer) ile bir mesaj imzalamaları istenir. Sunucu, imzanın o adres tarafından oluşturulduğunu doğrulayabilir.

![Getting extra data from attestations](./fig-03-eas-data.png)

İmza yalnızca Ethereum adresini doğrular. Diğer kullanıcı özniteliklerini almak için genellikle [onayları](https://attest.org/) kullanırsınız. Bir onay genellikle şu alanlara sahiptir:

- **Onaylayan (Attestor)**, onayı yapan adres
- **Alıcı (Recipient)**, onayın geçerli olduğu adres
- **Veri (Data)**, ad, izinler vb. gibi onaylanan veri.
- **Şema (Schema)**, veriyi yorumlamak için kullanılan şemanın kimliği.

Ethereum'un merkeziyetsiz doğası gereği, herhangi bir kullanıcı onay yapabilir. Hangi onayları güvenilir kabul ettiğimizi belirlemek için onaylayanın kimliği önemlidir.

## Kurulum {#setup}

İlk adım, kendi aralarında iletişim kuran bir SAML SP ve bir SAML IdP'ye sahip olmaktır.

1. Yazılımı indirin. Bu makale için örnek yazılım [GitHub'dadır](https://github.com/qbzzt/250420-saml-ethereum). Farklı aşamalar farklı dallarda saklanır, bu aşama için `saml-only` istersiniz.

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Kendinden imzalı sertifikalarla anahtarlar oluşturun. Bu, anahtarın kendi sertifika yetkilisi olduğu ve hizmet sağlayıcıya manuel olarak içe aktarılması gerektiği anlamına gelir. Daha fazla bilgi için [OpenSSL belgelerine](https://docs.openssl.org/master/man1/openssl-req/) bakın. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Sunucuları başlatın (hem SP hem de IdP)

    ```sh
    pnpm start
    ```

4. [http://localhost:3000/](http://localhost:3000/) URL'sindeki SP'ye gidin ve IdP'ye (bağlantı noktası 3001) yönlendirilmek için düğmeye tıklayın.

5. IdP'ye e-posta adresinizi verin ve **Login to the service provider** (Hizmet sağlayıcıya giriş yap) seçeneğine tıklayın. Hizmet sağlayıcıya (bağlantı noktası 3000) geri yönlendirildiğinizi ve sizi e-posta adresinizden tanıdığını görün.

### Ayrıntılı açıklama {#detailed-explanation}

Adım adım şu şekilde gerçekleşir:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Bu dosya hem Kimlik Sağlayıcı hem de Hizmet Sağlayıcı için yapılandırmayı içerir. Normalde bu ikisi farklı varlıklar olurdu, ancak burada basitlik için kodu paylaşabiliriz.

```typescript
const fs = await import("fs")

const protocol="http"
```

Şimdilik sadece test yapıyoruz, bu yüzden HTTP kullanmak sorun değil.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Normalde her iki bileşen için de mevcut olan (ve doğrudan güvenilen veya güvenilir bir sertifika yetkilisi tarafından imzalanan) açık anahtarları okuyun.

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

Her iki bileşen için URL'ler.

```typescript
export const spPublicData = {
```

Hizmet sağlayıcı için açık veriler.

```typescript
    entityID: `${spUrl}/metadata`,
```

Geleneksel olarak, SAML'de `entityID`, varlığın meta verilerinin bulunduğu URL'dir. Bu meta veri, XML biçiminde olması dışında buradaki açık verilere karşılık gelir.

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

Amaçlarımız doğrultusunda en önemli tanım `assertionConsumerServer` tanımıdır. Bu, hizmet sağlayıcıya bir şeyi doğrulamak için (örneğin, "size bu bilgiyi gönderen kullanıcı somebody@example.com'dur") `http://localhost:3000/sp/assertion` URL'sine [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) kullanmamız gerektiği anlamına gelir.

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

Kimlik sağlayıcı için açık veriler benzerdir. Bir kullanıcının giriş yapması için `http://localhost:3001/idp/login` adresine POST yapmanız ve bir kullanıcının çıkış yapması için `http://localhost:3001/idp/logout` adresine POST yapmanız gerektiğini belirtir.

#### src/sp.mts {#srcspmts}

Bu, bir hizmet sağlayıcıyı uygulayan koddur.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAML'yi uygulamak için [`samlify`](https://www.npmjs.com/package/samlify) kütüphanesini kullanıyoruz.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` kütüphanesi, XML'in doğru olduğunu, beklenen açık anahtarla imzalandığını vb. doğrulayan bir pakete sahip olmayı bekler. Bu amaçla [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) kullanıyoruz.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Bir [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router), bir web sitesinin içine monte edilebilen bir "mini web sitesidir". Bu durumda, tüm hizmet sağlayıcı tanımlarını bir araya gruplamak için kullanıyoruz.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Hizmet sağlayıcının kendisini temsili, tüm açık veriler ve bilgileri imzalamak için kullandığı özel anahtardır.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Açık veriler, hizmet sağlayıcının kimlik sağlayıcı hakkında bilmesi gereken her şeyi içerir.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Diğer SAML bileşenleriyle birlikte çalışabilirliği sağlamak için, hizmet ve kimlik sağlayıcılarının açık verileri (meta veri olarak adlandırılır) `/metadata` içinde XML biçiminde bulunmalıdır.

```typescript
spRouter.post(`/assertion`,
```

Bu, tarayıcının kendini tanımlamak için eriştiği sayfadır. Doğrulama, kullanıcı tanımlayıcısını (burada e-posta adresini kullanıyoruz) içerir ve ek öznitelikler içerebilir. Bu, yukarıdaki dizi diyagramındaki 7. adımın işleyicisidir.

```typescript
  async (req, res) => {
    // console.log(`SAML yanıtı:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Doğrulamada sağlanan XML verilerini görmek için yorum satırı yapılmış komutu kullanabilirsiniz. Bu [base64 kodludur](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Kimlik sunucusundan gelen giriş isteğini ayrıştırın.

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

Kullanıcıya girişi aldığımızı göstermek için bir HTML yanıtı gönderin.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Başarısızlık durumunda kullanıcıyı bilgilendirin.

```typescript
spRouter.get('/login',
```

Tarayıcı bu sayfayı almaya çalıştığında bir giriş isteği oluşturun. Bu, yukarıdaki dizi diyagramındaki 1. adımın işleyicisidir.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Bir giriş isteği göndermek için bilgileri alın.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Bu sayfa formu (aşağıya bakın) otomatik olarak gönderir. Bu şekilde kullanıcının yönlendirilmek için hiçbir şey yapmasına gerek kalmaz. Bu, yukarıdaki dizi diyagramındaki 2. adımdır.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` adresine (kimlik sağlayıcı uç noktasının URL'si) POST yapın.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Giriş adı `loginRequest.type` (`SAMLRequest`) şeklindedir. Bu alanın içeriği `loginRequest.context`'dir, bu da yine base64 kodlu XML'dir.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Bu ara yazılım](https://expressjs.com/en/5x/api.html#express.urlencoded), [HTTP isteğinin](https://www.tutorialspoint.com/http/http_requests.htm) gövdesini okur. Varsayılan olarak express bunu yok sayar, çünkü çoğu istek bunu gerektirmez. Buna ihtiyacımız var çünkü POST gövdeyi kullanır.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Yönlendiriciyi hizmet sağlayıcı dizinine (`/sp`) monte edin.

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

Bir tarayıcı kök dizini almaya çalışırsa, ona giriş sayfasına bir bağlantı sağlayın.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Bu express uygulamasıyla `spPort` bağlantı noktasını dinleyin.

#### src/idp.mts {#srcidpmts}

Bu kimlik sağlayıcıdır. Hizmet sağlayıcıya çok benzer, aşağıdaki açıklamalar farklı olan kısımlar içindir.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Öznitelikleri koru
    attributeNamePrefix: "@_", // Öznitelikler için önek
  }
)
```

Hizmet sağlayıcıdan aldığımız XML isteğini okumamız ve anlamamız gerekiyor.

```typescript
const getLoginPage = requestId => `
```

Bu fonksiyon, yukarıdaki dizi diyagramının 4. adımında döndürülen otomatik gönderilen formla sayfayı oluşturur.

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

Hizmet sağlayıcıya gönderdiğimiz iki alan vardır:

1. Yanıt verdiğimiz `requestId`.
2. Kullanıcı tanımlayıcısı (şimdilik kullanıcının sağladığı e-posta adresini kullanıyoruz).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Bu, yukarıdaki dizi diyagramının 5. adımı için işleyicidir. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) giriş yanıtını oluşturur. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Hedef kitle hizmet sağlayıcıdır.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

İstekten çıkarılan bilgiler. İstekte önemsediğimiz tek parametre, hizmet sağlayıcının istekleri ve yanıtlarını eşleştirmesini sağlayan requestId'dir.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // İmzalamayı sağla
```

Yanıtı imzalamak için verilere sahip olmak üzere `signingKey`'ye ihtiyacımız var. Hizmet sağlayıcı imzasız isteklere güvenmez.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Bu, hizmet sağlayıcıya geri gönderdiğimiz kullanıcı bilgilerini içeren alandır.

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

Yine, otomatik gönderilen bir form kullanın. Bu, yukarıdaki dizi diyagramının 6. adımıdır.

```typescript

// Giriş istekleri için IdP uç noktası
idpRouter.post(`/login`,
```

Bu, hizmet sağlayıcıdan bir giriş isteği alan uç noktadır. Bu, yukarıdaki dizi diyagramının 3. adımının işleyicisidir.

```typescript
  async (req, res) => {
    try {
      // parseLoginRequest'i çalıştıramadığım için geçici çözüm.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Kimlik doğrulama isteğinin kimliğini okumak için [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) kullanabilmeliyiz. Ancak, çalıştıramadım ve üzerinde çok fazla zaman harcamaya değmezdi, bu yüzden sadece [genel amaçlı bir XML ayrıştırıcı](https://www.npmjs.com/package/fast-xml-parser) kullanıyorum. İhtiyacımız olan bilgi, XML'in en üst düzeyinde bulunan `<samlp:AuthnRequest>` etiketi içindeki `ID` özniteliğidir.

## Ethereum imzalarını kullanmak {#using-ethereum-signatures}

Artık hizmet sağlayıcıya bir kullanıcı kimliği gönderebildiğimize göre, bir sonraki adım kullanıcı kimliğini güvenilir bir şekilde elde etmektir. Viem, cüzdandan sadece kullanıcı adresini istememize olanak tanır, ancak bu, bilgiyi tarayıcıdan istemek anlamına gelir. Tarayıcıyı kontrol etmiyoruz, bu nedenle ondan aldığımız yanıta otomatik olarak güvenemeyiz.

Bunun yerine, IdP tarayıcıya imzalaması için bir dize gönderecektir. Tarayıcıdaki cüzdan bu dizeyi imzalarsa, bu gerçekten o adres olduğu anlamına gelir (yani, adrese karşılık gelen özel anahtarı biliyordur).

Bunu çalışırken görmek için mevcut IdP ve SP'yi durdurun ve şu komutları çalıştırın:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Ardından [SP'ye gidin](http://localhost:3000) ve talimatları izleyin.

Bu noktada Ethereum adresinden e-posta adresini nasıl alacağımızı bilmediğimizi unutmayın, bu yüzden bunun yerine SP'ye `<ethereum address>@bad.email.address` bildiriyoruz.

### Ayrıntılı açıklama {#detailed-explanation-2}

Değişiklikler önceki diyagramdaki 4-5. adımlardadır.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Değiştirdiğimiz tek dosya `idp.mts` dosyasıdır. İşte değiştirilen kısımlar.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Bu iki ek kütüphaneye ihtiyacımız var. [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) değerini oluşturmak için [`uuid`](https://www.npmjs.com/package/uuid) kullanıyoruz. Değerin kendisi önemli değildir, sadece bir kez kullanılması gerçeği önemlidir.

[`viem`](https://viem.sh/) kütüphanesi Ethereum tanımlarını kullanmamızı sağlar. Burada imzanın gerçekten geçerli olduğunu doğrulamak için buna ihtiyacımız var.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Cüzdan, mesajı imzalamak için kullanıcıdan izin ister. Sadece bir nonce olan bir mesaj kullanıcıların kafasını karıştırabilir, bu yüzden bu istemi dahil ediyoruz.

```typescript
// requestID'leri burada tut
let nonces = {}
```

Yanıt verebilmek için istek bilgilerine ihtiyacımız var. Bunu istekle birlikte gönderebilir (4. adım) ve geri alabilirdik (5. adım). Ancak, potansiyel olarak düşman bir kullanıcının kontrolü altında olan tarayıcıdan aldığımız bilgilere güvenemeyiz. Bu yüzden onu burada, nonce'u anahtar olarak kullanarak saklamak daha iyidir.

Basitlik adına bunu burada bir değişken olarak yaptığımızı unutmayın. Ancak, bunun birkaç dezavantajı vardır:

- Hizmet reddi saldırısına karşı savunmasızız. Kötü niyetli bir kullanıcı birden çok kez oturum açmaya çalışarak belleğimizi doldurabilir.
- IdP işleminin yeniden başlatılması gerekirse, mevcut değerleri kaybederiz.
- Her birinin kendi değişkeni olacağı için birden fazla işlem arasında yük dengelemesi yapamayız.

Bir üretim sisteminde bir veritabanı kullanır ve bir tür sona erme mekanizması uygulardık.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Bir nonce oluşturun ve gelecekte kullanmak üzere `requestId`'yi saklayın.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Bu JavaScript, sayfa yüklendiğinde otomatik olarak yürütülür.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

`viem`'den birkaç fonksiyona ihtiyacımız var.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Yalnızca tarayıcıda bir cüzdan varsa çalışabiliriz.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Cüzdandan hesap listesini isteyin (`window.ethereum`). En az bir tane olduğunu varsayın ve yalnızca ilkini saklayın. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Tarayıcı cüzdanıyla etkileşim kurmak için bir [cüzdan istemcisi](https://viem.sh/docs/clients/wallet) oluşturun.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Kullanıcıdan bir mesaj imzalamasını isteyin. Tüm bu HTML bir [şablon dizesi](https://viem.sh/docs/clients/wallet) içinde olduğundan, idp işleminde tanımlanan değişkenleri kullanabiliriz. Bu, dizi diyagramındaki 4.5 adımıdır.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` adresine yönlendirin. Bu, dizi diyagramındaki 5. adımdır.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

İmza, potansiyel olarak kötü niyetli olan tarayıcı tarafından geri gönderilir (tarayıcıda sadece `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` açmanızı engelleyecek hiçbir şey yoktur). Bu nedenle, IdP işleminin hatalı imzaları doğru şekilde işlediğini doğrulamak önemlidir.

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

Geri kalanı sadece standart HTML'dir.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Bu, dizi diyagramındaki 5. adımın işleyicisidir.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

İstek kimliğini alın ve yeniden kullanılamayacağından emin olmak için nonce'u `nonces`'den silin.

```typescript
  try {
```

İmzanın geçersiz olabileceği pek çok yol olduğundan, fırlatılan hataları yakalamak için bunu bir `try ... catch` bloğuna sarıyoruz.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Dizi diyagramındaki 5.5 adımını uygulamak için [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) kullanın.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

İşleyicinin geri kalanı, küçük bir değişiklik dışında daha önce `/loginSubmitted` işleyicisinde yaptığımıza eşdeğerdir.

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

Gerçek e-posta adresine sahip değiliz (bunu bir sonraki bölümde alacağız), bu yüzden şimdilik Ethereum adresini döndürüyoruz ve onu açıkça bir e-posta adresi olmadığı şeklinde işaretliyoruz.


```typescript
// Giriş istekleri için IdP uç noktası
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // parseLoginRequest'i çalıştıramadığım için geçici çözüm.
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

3. adım işleyicisinde `getLoginPage` yerine artık `getSignaturePage` kullanın.

## E-posta adresini almak {#getting-the-email-address}

Bir sonraki adım, hizmet sağlayıcı tarafından istenen tanımlayıcı olan e-posta adresini elde etmektir. Bunu yapmak için [Ethereum Attestation Service (EAS)](https://attest.org/) kullanıyoruz.

Onayları almanın en kolay yolu [GraphQL API](https://docs.attest.org/docs/developer-tools/api) kullanmaktır. Şu sorguyu kullanıyoruz:

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

Bu [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) yalnızca bir e-posta adresi içerir. Bu sorgu, bu şemanın onaylarını ister. Onayın konusu `recipient` olarak adlandırılır. Bu her zaman bir Ethereum adresidir.

Uyarı: Burada onayları alma şeklimizin iki güvenlik sorunu vardır.

- Merkezi bir bileşen olan `https://optimism.easscan.org/graphql` API uç noktasına gidiyoruz. `id` özniteliğini alabilir ve ardından bir onayın gerçek olduğunu doğrulamak için zincir içi bir arama yapabiliriz, ancak API uç noktası bize bunlardan bahsetmeyerek onayları yine de sansürleyebilir. 

  Bu sorunu çözmek imkansız değildir, kendi GraphQL uç noktamızı çalıştırabilir ve onayları zincir günlüklerinden alabilirdik, ancak bu amaçlarımız için aşırıdır.

- Onaylayanın kimliğine bakmıyoruz. Herkes bize yanlış bilgi verebilir. Gerçek dünyadaki bir uygulamada, bir dizi güvenilir onaylayana sahip olurduk ve yalnızca onların onaylarına bakardık.

Bunu çalışırken görmek için mevcut IdP ve SP'yi durdurun ve şu komutları çalıştırın:

```sh
git checkout email-address
pnpm install
pnpm start
```

Ardından e-posta adresinizi verin. Bunu yapmanın iki yolu vardır:

- Bir özel anahtar kullanarak bir cüzdanı içe aktarın ve `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` test özel anahtarını kullanın.

- Kendi e-posta adresiniz için bir onay ekleyin:

  1. [Onay gezginindeki şemaya](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) gidin.

  2. **Attest with Schema** (Şema ile Onayla) seçeneğine tıklayın.

  3. Alıcı olarak Ethereum adresinizi, e-posta adresi olarak e-posta adresinizi girin ve **Onchain** (Zincir içi) seçeneğini seçin. Ardından **Make Attestation** (Onay Yap) seçeneğine tıklayın.

  4. Cüzdanınızdaki işlemi onaylayın. Gaz ücretini ödemek için [Optimism Blokzinciri](https://app.optimism.io/bridge/deposit) üzerinde bir miktar ETH'ye ihtiyacınız olacak.

Her iki durumda da, bunu yaptıktan sonra [http://localhost:3000](http://localhost:3000) adresine gidin ve talimatları izleyin. Test özel anahtarını içe aktardıysanız, aldığınız e-posta `test_addr_0@example.com` olur. Kendi adresinizi kullandıysanız, onayladığınız şey neyse o olmalıdır.

### Ayrıntılı açıklama {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Yeni adımlar GraphQL iletişimi olan 5.6 ve 5.7 adımlarıdır.

Yine, işte `idp.mts` dosyasının değiştirilen kısımları.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

İhtiyacımız olan kütüphaneleri içe aktarın.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[Her blokzincir için ayrı bir uç nokta](https://docs.attest.org/docs/developer-tools/api) vardır.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Uç noktayı sorgulamak için kullanabileceğimiz yeni bir `GraphQLClient` istemcisi oluşturun.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL bize yalnızca baytlar içeren opak bir veri nesnesi verir. Bunu anlamak için şemaya ihtiyacımız var.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Bir Ethereum adresinden bir e-posta adresine ulaşmak için bir fonksiyon.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Bu bir GraphQL sorgusudur.

```typescript
      attestations(
```

Onayları arıyoruz.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

İstediğimiz onaylar, alıcının `getAddress(ethAddr)` olduğu şemamızdakilerdir. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) fonksiyonu, adresimizin doğru [sağlama toplamına (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) sahip olduğundan emin olur. Bu gereklidir çünkü GraphQL büyük/küçük harfe duyarlıdır. "0xBAD060A7", "0xBad060A7" ve "0xbad060a7" farklı değerlerdir.

```typescript
        take: 1
```

Kaç tane onay bulursak bulalım, yalnızca ilkini istiyoruz.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Almak istediğimiz alanlar.

- `attester`: Onayı gönderen adres. Normalde bu, onaya güvenilip güvenilmeyeceğine karar vermek için kullanılır.
- `id`: Onay kimliği. GraphQL sorgusundan gelen bilgilerin doğru olduğunu doğrulamak amacıyla [onayı zincir içi okumak](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) için bu değeri kullanabilirsiniz.
- `data`: Şema verisi (bu durumda e-posta adresi).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Eğer onay yoksa, açıkça yanlış olan ancak hizmet sağlayıcıya geçerli görünecek bir değer döndürün.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Bir değer varsa, veriyi çözmek için `decodeData` kullanın. Sağladığı meta veriye ihtiyacımız yok, sadece değerin kendisine ihtiyacımız var.

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

E-posta adresini almak için yeni fonksiyonu kullanın.

## Peki ya merkeziyetsizlik? {#what-about-decentralization}

Bu yapılandırmada, Ethereum'dan e-posta adresine eşleme için güvenilir onaylayıcılara güvendiğimiz sürece kullanıcılar olmadıkları biri gibi davranamazlar. Ancak, kimlik sağlayıcımız hala merkezi bir bileşendir. Kimlik sağlayıcının özel anahtarına sahip olan kişi, hizmet sağlayıcıya yanlış bilgi gönderebilir.

[Çok taraflı hesaplama (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) kullanılarak bir çözüm bulunabilir. Gelecekteki bir öğreticide bunun hakkında yazmayı umuyorum.

## Sonuç {#conclusion}

Ethereum imzaları gibi bir oturum açma standardının benimsenmesi, bir tavuk ve yumurta sorunuyla karşı karşıyadır. Hizmet sağlayıcılar mümkün olan en geniş pazara hitap etmek ister. Kullanıcılar, oturum açma standartlarını destekleme konusunda endişelenmek zorunda kalmadan hizmetlere erişebilmek ister.
Ethereum IdP gibi adaptörler oluşturmak, bu engeli aşmamıza yardımcı olabilir.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).