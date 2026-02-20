---
title: "web2 kimlik doğrulaması için Ethereum'u kullanma"
description: "Bu öğreticiyi okuduktan sonra, bir Geliştirici, tek oturum açma ve diğer ilgili hizmetleri sağlamak için web2'de kullanılan bir standart olan SAML girişi ile Ethereum girişini (Web3) entegre edebilecektir. Bu, web2 Kaynaklarına erişimin, Kullanıcı nitelikleri Tasdiklerden gelecek şekilde Ethereum imzaları aracılığıyla doğrulanmasına olanak tanır."
author: Ori Pomerantz
tags: [ "web2", "kimlik doğrulama", "eas" ]
skill: beginner
lang: tr
published: 2025-04-30
---

## Giriş

[SAML](https://www.onelogin.com/learn/saml), bir [kimlik sağlayıcının (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider), [hizmet sağlayıcılara (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) Kullanıcı bilgileri sağlamasına izin vermek için web2'de kullanılan bir standarttır.

Bu öğreticide, Kullanıcıların Ethereum'u henüz yerel olarak desteklemeyen web2 hizmetlerinde kimliklerini doğrulamak için Ethereum cüzdanlarını kullanmalarına olanak sağlamak üzere Ethereum imzalarını SAML ile nasıl entegre edeceğinizi öğreneceksiniz.

Bu öğreticinin iki ayrı kitle için yazıldığını unutmayın:

- Ethereum'u anlayan ve SAML öğrenmesi gereken Ethereum meraklıları
- SAML ve web2 kimlik doğrulamasını anlayan ve Ethereum öğrenmesi gereken Web2 meraklıları

Sonuç olarak, zaten bildiğiniz birçok giriş materyali içerecektir. Atlamaktan çekinmeyin.

### Ethereum meraklıları için SAML

SAML merkezi bir protokoldür. bir hizmet sağlayıcı (SP), bir kimlik sağlayıcıdan (IdP) gelen iddiaları (örneğin \

Örneğin, SP şirketlere seyahat hizmetleri sağlayan bir seyahat acentesi olabilir ve IdP bir şirketin dahili web sitesi olabilir. Çalışanların iş seyahati rezervasyonu yapması gerektiğinde, seyahat acentesi, gerçekten seyahat rezervasyonu yapmalarına izin vermeden önce onları kimlik doğrulaması için şirkete gönderir.

![Adım adım SAML süreci](./fig-01-saml.png)

Bu, üç varlığın, tarayıcının, SP'nin ve IdP'nin erişim için müzakere etme şeklidir. SP'nin tarayıcıyı kullanan Kullanıcı hakkında önceden bir şey bilmesine gerek yoktur, sadece IdP'ye güvenmesi yeterlidir.

### SAML meraklıları için Ethereum

Ethereum merkeziyetsiz bir sistemdir.

![Ethereum girişi](./fig-02-eth-logon.png)

Kullanıcıların bir özel anahtarı vardır (genellikle bir tarayıcı uzantısında tutulur). Özel anahtardan bir açık anahtar ve ondan da 20 baytlık bir adres türetebilirsiniz. Kullanıcıların bir sisteme giriş yapması gerektiğinde, onlardan bir nonce (tek kullanımlık bir değer) ile bir mesaj imzalamaları istenir. Sunucu, imzanın bu adres tarafından oluşturulduğunu doğrulayabilir.

![Tasdiklerden ekstra veri alma](./fig-03-eas-data.png)

İmza yalnızca Ethereum adresini doğrular. Diğer kullanıcı niteliklerini almak için genellikle [tasdikleri](https://attest.org/) kullanırsınız. Bir tasdik genellikle şu alanlara sahiptir:

- **Tasdik eden**, tasdiki yapan adres
- **Alıcı**, tasdikin geçerli olduğu adres
- **Veri**, ad, izinler vb. gibi tasdik edilen veriler.
- **Şema**, verileri yorumlamak için kullanılan şemanın kimliği.

Ethereum'un merkeziyetsiz doğası nedeniyle, herhangi bir kullanıcı tasdik yapabilir. Tasdik edenin kimliği, hangi tasdikleri güvenilir olarak kabul ettiğimizi belirlemek için önemlidir.

## Kurulum

İlk adım, kendi aralarında iletişim kuran bir SAML SP ve bir SAML IdP'ye sahip olmaktır.

1. Yazılımı indirin. Bu makalenin örnek yazılımı [github'da](https://github.com/qbzzt/250420-saml-ethereum). Farklı aşamalar farklı dallarda saklanır, bu aşama için `saml-only` istersiniz

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

5. IdP'ye e-posta adresinizi verin ve **Hizmet sağlayıcıda oturum aç**'a tıklayın. Hizmet sağlayıcıya geri yönlendirildiğinizi (bağlantı noktası 3000) ve sizi e-posta adresinizle tanıdığını görün.

### Ayrıntılı açıklama

Adım adım olanlar şunlardır:

![Ethereum olmadan normal SAML girişi](./fig-04-saml-no-eth.png)

#### src/config.mts

Bu dosya hem Kimlik Sağlayıcı hem de Hizmet Sağlayıcı için yapılandırmayı içerir. Normalde bu ikisi farklı varlıklar olurdu, ancak burada basitlik için kodu paylaşabiliriz.

```typescript
const fs = await import("fs")

const protocol="http"
```

Şimdilik sadece test ediyoruz, bu yüzden HTTP kullanmakta bir sakınca yok.

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

Hizmet sağlayıcı için genel veriler.

```typescript
    entityID: `${spUrl}/metadata`,
```

Geleneksel olarak SAML'de `entityID`, varlığın meta verilerinin bulunduğu URL'dir. Bu meta veriler, XML biçiminde olması dışında, buradaki genel verilere karşılık gelir.

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

Amaçlarımız için en önemli tanım `assertionConsumerServer`'dır. Hizmet sağlayıcıya bir şey iddia etmek (örneğin, \

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

Kimlik sağlayıcı için genel veriler benzerdir. Bir kullanıcının oturumunu açmak için `http://localhost:3001/idp/login` adresine POST ve bir kullanıcının oturumunu kapatmak için `http://localhost:3001/idp/logout` adresine POST yapmanız gerektiğini belirtir.

#### src/sp.mts

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

Bir [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router), bir web sitesinin içine monte edilebilen bir \ Bu durumda, tüm hizmet sağlayıcı tanımlarını bir araya getirmek için kullanırız.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Hizmet sağlayıcının kendi temsili, tüm genel veriler ve bilgileri imzalamak için kullandığı özel anahtardır.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Genel veriler, hizmet sağlayıcının kimlik sağlayıcı hakkında bilmesi gereken her şeyi içerir.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Diğer SAML bileşenleriyle birlikte çalışabilirliği sağlamak için, hizmet ve kimlik sağlayıcıların genel verileri (meta veriler olarak adlandırılır) `/metadata` içinde XML biçiminde mevcut olmalıdır.

```typescript
spRouter.post(`/assertion`,
```

Bu, tarayıcının kendini tanıtmak için eriştiği sayfadır. Beyan, kullanıcı tanımlayıcısını (burada e-posta adresi kullanıyoruz) içerir ve ek nitelikler içerebilir. Bu, yukarıdaki sıra diyagramındaki 7. adımın işleyicisidir.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Onayda sağlanan XML verilerini görmek için yorum satırı yapılmış komutu kullanabilirsiniz. [Base64 kodludur](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Kimlik sunucusundan gelen oturum açma isteğini ayrıştırın.

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

Sadece kullanıcıya giriş yaptığımızı göstermek için bir HTML yanıtı gönderin.

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

Tarayıcı bu sayfayı almaya çalıştığında bir oturum açma isteği oluşturun. Bu, yukarıdaki sıra diyagramındaki 1. adımın işleyicisidir.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Bir oturum açma isteği göndermek için bilgileri alın.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Bu sayfa formu (aşağıya bakın) otomatik olarak gönderir. Bu şekilde kullanıcının yönlendirilmek için herhangi bir şey yapmasına gerek kalmaz. Bu, yukarıdaki sıra diyagramındaki 2. adımdır.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint`'e (kimlik sağlayıcı uç noktasının URL'si) gönderin.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Girdi adı `loginRequest.type`'dır (`SAMLRequest`). Bu alanın içeriği `loginRequest.context`'tir, bu da yine base64 kodlu XML'dir.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Bu ara katman yazılımı](https://expressjs.com/en/5x/api.html#express.urlencoded), [HTTP isteğinin](https://www.tutorialspoint.com/http/http_requests.htm) gövdesini okur. Varsayılan olarak express bunu yok sayar, çünkü çoğu istek bunu gerektirmez. Buna ihtiyacımız var çünkü POST gövdeyi kullanıyor.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Yönlendiriciyi hizmet sağlayıcı dizinine (`/sp`) bağlayın.

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick=\"document.location.href='${config.spUrl}/login'\">
           Oturum açmak için buraya tıklayın
        </button>
      </body>
    </html>
  `)
})
```

Bir tarayıcı kök dizini almaya çalışırsa, ona oturum açma sayfasına bir bağlantı sağlayın.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Bu express uygulamasıyla `spPort`'u dinleyin.

#### src/idp.mts

Bu kimlik sağlayıcıdır. Hizmet sağlayıcıya çok benzer, aşağıdaki açıklamalar farklı olan kısımlar içindir.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Nitelikleri Koru
    attributeNamePrefix: "@_", // Nitelikler için ön ek
  }
)
```

Hizmet sağlayıcıdan aldığımız XML isteğini okumamız ve anlamamız gerekiyor.

```typescript
const getLoginPage = requestId => `
```

Bu işlev, yukarıdaki sıra diyagramının 4. adımında döndürülen, otomatik gönderilen formu içeren sayfayı oluşturur.

```typescript
<html>
  <head>
    <title>Oturum açma sayfası</title>
  </head>
  <body>
    <h2>Oturum açma sayfası</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      E-posta adresi: <input name="email" />
      <br />
      <button type="Submit">
        Hizmet sağlayıcıda oturum aç
      </button>
```

Hizmet sağlayıcıya gönderdiğimiz iki alan var:

1. Yanıtladığımız `requestId`.
2. Kullanıcı tanımlayıcısı (şimdilik kullanıcının verdiği e-posta adresini kullanıyoruz).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Bu, yukarıdaki sıra diyagramındaki 5. adımın işleyicisidir. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) oturum açma yanıtını oluşturur.

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

İstekten çıkarılan bilgiler. İstekte önem verdiğimiz tek parametre, hizmet sağlayıcının istekleri ve yanıtlarını eşleştirmesine olanak tanıyan requestId'dir.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // İmzalamayı sağla
```

Yanıtı imzalamak için veriye sahip olmak için `signingKey`'e ihtiyacımız var. Hizmet sağlayıcı imzasız isteklere güvenmez.

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

Yine, otomatik gönderilen bir form kullanın. Bu, yukarıdaki sıra diyagramındaki 6. adımdır.

```typescript

// Oturum açma istekleri için IdP uç noktası
idpRouter.post(`/login`,
```

Bu, hizmet sağlayıcıdan bir oturum açma isteği alan uç noktadır. Bu, yukarıdaki sıra diyagramının 3. adımının işleyicisidir.

```typescript
  async (req, res) => {
    try {
      // parseLoginRequest'i çalıştıramadığım için geçici çözüm.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Kimlik doğrulama isteğinin kimliğini okumak için [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) kullanabilmeliyiz. Ancak, çalıştıramadım ve üzerinde çok fazla zaman harcamaya değmedi, bu yüzden sadece [genel amaçlı bir XML ayrıştırıcısı](https://www.npmjs.com/package/fast-xml-parser) kullanıyorum. İhtiyacımız olan bilgi, XML'in en üst düzeyinde bulunan `<samlp:AuthnRequest>` etiketinin içindeki `ID` özniteliğidir.

## Ethereum imzalarını kullanma

Artık hizmet sağlayıcıya bir kullanıcı kimliği gönderebildiğimize göre, bir sonraki adım kullanıcı kimliğini güvenilir bir şekilde elde etmektir. Viem, cüzdandan kullanıcı adresini istememize izin verir, ancak bu, bilgiyi tarayıcıdan istemek anlamına gelir. Tarayıcıyı kontrol etmiyoruz, bu yüzden ondan aldığımız yanıta otomatik olarak güvenemeyiz.

Bunun yerine, IdP tarayıcıya imzalaması için bir dize gönderecek. Tarayıcıdaki cüzdan bu dizeyi imzalarsa, bu gerçekten o adres olduğu anlamına gelir (yani, adrese karşılık gelen özel anahtarı bilir).

Bunu çalışırken görmek için mevcut IdP ve SP'yi durdurun ve şu komutları çalıştırın:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Ardından [SP'ye](http://localhost:3000) gidin ve yönergeleri izleyin.

Bu noktada Ethereum adresinden e-posta adresini nasıl alacağımızı bilmediğimizi, bu yüzden SP'ye `<ethereum adresi>@bad.email.address` olarak rapor ettiğimizi unutmayın.

### Ayrıntılı açıklama

Değişiklikler önceki diyagramdaki 4-5. adımlardadır.

![Ethereum imzalı SAML](./fig-05-saml-w-signature.png)

Değiştirdiğimiz tek dosya `idp.mts`. İşte değiştirilen kısımlar.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Bu iki ek kütüphaneye ihtiyacımız var. [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) değerini oluşturmak için [`uuid`](https://www.npmjs.com/package/uuid) kullanıyoruz. Değerin kendisi önemli değil, sadece bir kez kullanıldığı gerçeği önemli.

[`viem`](https://viem.sh/) kütüphanesi Ethereum tanımlarını kullanmamızı sağlar. Burada imzanın gerçekten geçerli olduğunu doğrulamak için buna ihtiyacımız var.

```typescript
const loginPrompt = \
```

Cüzdan, mesajı imzalamak için kullanıcıdan izin ister. Sadece bir nonce olan bir mesaj kullanıcıların kafasını karıştırabilir, bu yüzden bu istemi ekliyoruz.

```typescript
// requestID'leri burada tutun
let nonces = {}
```

Ona yanıt verebilmek için istek bilgisine ihtiyacımız var. İstekle birlikte gönderebilir (adım 4) ve geri alabiliriz (adım 5). Ancak, potansiyel olarak düşman bir kullanıcının kontrolü altında olan tarayıcıdan aldığımız bilgilere güvenemeyiz. Bu yüzden anahtar olarak nonce ile burada saklamak daha iyidir.

Bunu burada basitlik adına bir değişken olarak yaptığımızı unutmayın. Ancak, bunun birkaç dezavantajı vardır:

- Hizmet reddi saldırısına karşı savunmasızız. Kötü niyetli bir kullanıcı birden çok kez oturum açmaya çalışarak belleğimizi doldurabilir.
- IdP işlemi yeniden başlatılması gerekirse, mevcut değerleri kaybederiz.
- Her birinin kendi değişkeni olacağı için birden çok işlem arasında yük dengeleyemeyiz.

Bir üretim sisteminde bir veritabanı kullanır ve bir tür sona erme mekanizması uygularız.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Bir nonce oluşturun ve `requestId`'yi ileride kullanmak üzere saklayın.

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
          alert(\"Please install MetaMask or a compatible wallet and then reload\")
      }
```

Sadece tarayıcıda bir cüzdan varsa çalışabiliriz.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Cüzdandan (`window.ethereum`) hesap listesini isteyin. En az bir tane olduğunu varsayın ve sadece ilkini saklayın.

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

Kullanıcıdan bir mesaj imzalamasını isteyin. Tüm bu HTML bir [şablon dizesi](https://viem.sh/docs/clients/wallet) içinde olduğundan, idp işleminde tanımlanan değişkenleri kullanabiliriz. Bu, sıra diyagramındaki 4.5. adımdır.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` adresine yönlendir. Bu, sıra diyagramındaki 5. adımdır.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

İmza, potansiyel olarak kötü niyetli olan tarayıcı tarafından geri gönderilir (sizi tarayıcıda sadece `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` açmaktan alıkoyan hiçbir şey yoktur). Bu nedenle, IdP işleminin kötü imzaları doğru şekilde işlediğini doğrulamak önemlidir.

```typescript
    </script>
  </head>
  <body>
    <h2>Lütfen imzalayın</h2>
    <button onClick="window.goodSignature()">
      İyi (geçerli) bir imza gönderin
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Kötü (geçersiz) bir imza gönderin
    </button>
  </body>
</html>  
`
}
```

Gerisi sadece standart HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Bu, sıra diyagramındaki 5. adımın işleyicisidir.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Kötü nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

İstek kimliğini alın ve yeniden kullanılamadığından emin olmak için `nonces`'tan nonce'ı silin.

```typescript
  try {
```

İmzanın geçersiz olabileceği pek çok yol olduğundan, bunu bir `try ...` içine sararız. `catch` bloğu ile atılan hataları yakalarız.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Sıra diyagramında 5.5. adımı uygulamak için [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) kullanın.

```typescript
    if (!validSignature)
      throw("Kötü imza")
  } catch (err) {
    res.send("Hata:" + err)
    return ;
  }
```

İşleyicinin geri kalanı, küçük bir değişiklik dışında, daha önce `/loginSubmitted` işleyicisinde yaptığımızla eşdeğerdir.

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

Gerçek e-posta adresimiz yok (bir sonraki bölümde alacağız), bu yüzden şimdilik Ethereum adresini döndürüyoruz ve bir e-posta adresi olmadığını açıkça belirtiyoruz.

```typescript
// Oturum açma istekleri için IdP uç noktası
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // parseLoginRequest'i çalıştıramadığım için geçici çözüm.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('SAML yanıtı işlenirken hata:', err);
      res.status(400).send('SAML kimlik doğrulaması başarısız oldu');
    }
  }
)
```

3. adım işleyicisinde `getLoginPage` yerine şimdi `getSignaturePage` kullanın.

## E-posta adresini alma

Bir sonraki adım, hizmet sağlayıcı tarafından istenen tanımlayıcı olan e-posta adresini elde etmektir. Bunu yapmak için [Ethereum Tasdik Hizmetini (EAS)](https://attest.org/) kullanıyoruz.

Tasdik almanın en kolay yolu [GraphQL API'sini](https://docs.attest.org/docs/developer-tools/api) kullanmaktır. Bu sorguyu kullanıyoruz:

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

Bu [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) yalnızca bir e-posta adresi içerir. Bu sorgu, bu şemanın tasdiklerini ister. Tasdikin konusu `recipient` (alıcı) olarak adlandırılır. Her zaman bir Ethereum adresidir.

Uyarı: Burada tasdikleri alma şeklimizin iki güvenlik sorunu var.

- Merkezi bir bileşen olan `https://optimism.easscan.org/graphql` API uç noktasına gidiyoruz. `id` özniteliğini alabilir ve ardından bir tasdikin gerçek olduğunu doğrulamak için zincir üzerinde bir arama yapabiliriz, ancak API uç noktası yine de bize onlardan bahsetmeyerek tasdikleri sansürleyebilir.

  Bu sorunu çözmek imkansız değil, kendi GraphQL uç noktamızı çalıştırabilir ve tasdikleri zincir günlüklerinden alabiliriz, ancak bu amaçlarımız için aşırıdır.

- Tasdik eden kimliğine bakmıyoruz. Herkes bize yanlış bilgi verebilir. Gerçek bir dünya uygulamasında, bir dizi güvenilir tasdik edicimiz olurdu ve yalnızca onların tasdiklerine bakardık.

Bunu çalışırken görmek için mevcut IdP ve SP'yi durdurun ve şu komutları çalıştırın:

```sh
git checkout email-address
pnpm install
pnpm start
```

Ardından e-posta adresinizi girin. Bunu yapmanın iki yolu var:

- Özel bir anahtar kullanarak bir cüzdanı içe aktarın ve `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` test özel anahtarını kullanın.

- Kendi e-posta adresiniz için bir tasdik ekleyin:

  1. [Tasdik gezginindeki şemaya](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) gidin.

  2. **Şema ile Tasdik Et**'e tıklayın.

  3. Alıcı olarak Ethereum adresinizi, e-posta adresi olarak e-posta adresinizi girin ve **Zincir Üstü**'nü seçin. Ardından **Tasdik Oluştur**'a tıklayın.

  4. Cüzdanınızdaki işlemi onaylayın. Gaz ücretini ödemek için [Optimism Blokzincirinde](https://app.optimism.io/bridge/deposit) bir miktar ETH'ye ihtiyacınız olacak.

Her iki durumda da, bunu yaptıktan sonra [http://localhost:3000](http://localhost:3000) adresine gidin ve yönergeleri izleyin. Test özel anahtarını içe aktardıysanız, aldığınız e-posta `test_addr_0@example.com`'dur. Kendi adresinizi kullandıysanız, tasdik ettiğiniz ne ise o olmalıdır.

### Ayrıntılı açıklama

![Ethereum adresinden e-postaya geçiş](./fig-06-saml-sig-n-email.png)

Yeni adımlar GraphQL iletişimi, 5.6 ve 5.7. adımlardır.

Yine, `idp.mts`'nin değiştirilmiş kısımları burada.

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

GraphQL bize yalnızca bayt içeren opak bir veri nesnesi verir. Onu anlamak için şemaya ihtiyacımız var.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Bir Ethereum adresinden bir e-posta adresine geçmek için bir işlev.

```typescript
  const query = `
    query GetAttestationsByRecipient {`
```

Bu bir GraphQL sorgusudur.

```typescript
      tasdikler(
```

Tasdikler arıyoruz.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

İstediğimiz tasdikler, şemamızdaki, alıcının `getAddress(ethAddr)` olduğu tasdiklerdir. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) işlevi, adresimizin doğru [sağlama toplamına](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) sahip olduğundan emin olur. Bu, GraphQL'in büyük/küçük harfe duyarlı olması nedeniyle gereklidir. `

```typescript
        take: 1
```

Kaç tane tasdik bulursak bulalım, sadece ilkini istiyoruz.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Almak istediğimiz alanlar.

- `attester`: Tasdiki gönderen adres. Normalde bu, tasdike güvenip güvenmeyeceğine karar vermek için kullanılır.
- `id`: Tasdik kimliği. GraphQL sorgusundan gelen bilgilerin doğru olduğunu doğrulamak için bu değeri [tasdiki zincir üzerinde okumak](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) için kullanabilirsiniz.
- `data`: Şema verileri (bu durumda, e-posta adresi).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Tasdik yoksa, açıkça yanlış olan ancak hizmet sağlayıcıya geçerli görünecek bir değer döndürün.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Bir değer varsa, verileri çözmek için `decodeData` kullanın. Sağladığı meta verilere ihtiyacımız yok, sadece değerin kendisine ihtiyacımız var.

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

E-posta adresini almak için yeni işlevi kullanın.

## Peki ya merkeziyetsizlik?

Bu yapılandırmada, Ethereum'dan e-posta adresine eşleme için güvenilir tasdik edicilere güvendiğimiz sürece, kullanıcılar olmadıkları biri gibi davranamazlar. Ancak, kimlik sağlayıcımız hala merkezi bir bileşendir. Kimlik sağlayıcısının özel anahtarına sahip olan herkes, hizmet sağlayıcıya yanlış bilgi gönderebilir.

[Çok taraflı hesaplama (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) kullanarak bir çözüm olabilir. Gelecekteki bir öğreticide bunun hakkında yazmayı umuyorum.

## Sonuç

Ethereum imzaları gibi bir oturum açma standardının benimsenmesi, bir tavuk ve yumurta sorunuyla karşı karşıyadır. Hizmet sağlayıcılar mümkün olan en geniş pazara hitap etmek ister. Kullanıcılar, oturum açma standartlarını destekleme konusunda endişelenmeden hizmetlere erişebilmek ister.
Bir Ethereum IdP gibi adaptörler oluşturmak, bu engeli aşmamıza yardımcı olabilir.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
