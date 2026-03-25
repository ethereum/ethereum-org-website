---
title: "ویب 2 کی تصدیق کے لیے ایتھیریم کا استعمال"
description: "اس ٹیوٹوریل کو پڑھنے کے بعد، ایک ڈیولپر ایتھیریم لاگ ان (ویب 3) کو SAML لاگ ان کے ساتھ مربوط کرنے کے قابل ہو جائے گا، جو کہ ویب 2 میں سنگل سائن آن اور دیگر متعلقہ خدمات فراہم کرنے کے لیے استعمال ہونے والا ایک معیار ہے۔ یہ ویب 2 وسائل تک رسائی کو ایتھیریم سگنیچرز کے ذریعے تصدیق کرنے کی اجازت دیتا ہے، جس میں صارف کی خصوصیات تصدیق ناموں (attestations) سے آتی ہیں۔"
author: "اوری پومرانٹز"
tags: ["web2", "تصدیق", "eas"]
skill: beginner
breadcrumb: "ویب 2 تصدیق کے لیے ایتھیریم"
lang: ur
published: 2025-04-30
---

## تعارف

[SAML](https://www.onelogin.com/learn/saml) ویب 2 پر استعمال ہونے والا ایک معیار ہے جو ایک [شناختی فراہم کنندہ (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) کو [سروس فراہم کنندگان (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)) کے لیے صارف کی معلومات فراہم کرنے کی اجازت دیتا ہے۔

اس ٹیوٹوریل میں آپ سیکھیں گے کہ ایتھیریم سگنیچرز کو SAML کے ساتھ کیسے مربوط کیا جائے تاکہ صارفین اپنے ایتھیریم والیٹس کا استعمال کرتے ہوئے خود کو ان ویب 2 سروسز پر تصدیق کر سکیں جو ابھی تک مقامی طور پر ایتھیریم کو سپورٹ نہیں کرتیں۔

نوٹ کریں کہ یہ ٹیوٹوریل دو الگ الگ سامعین کے لیے لکھا گیا ہے:

- ایتھیریم کے لوگ جو ایتھیریم کو سمجھتے ہیں اور انہیں SAML سیکھنے کی ضرورت ہے
- ویب 2 کے لوگ جو SAML اور ویب 2 کی تصدیق کو سمجھتے ہیں اور انہیں ایتھیریم سیکھنے کی ضرورت ہے

نتیجتاً، اس میں بہت سا تعارفی مواد شامل ہونے والا ہے جو آپ پہلے سے جانتے ہیں۔ آپ اسے بلا جھجھک چھوڑ سکتے ہیں۔

### ایتھیریم کے لوگوں کے لیے SAML

SAML ایک مرکزی (centralized) پروٹوکول ہے۔ ایک سروس فراہم کنندہ (SP) شناختی فراہم کنندہ (IdP) سے صرف اسی صورت میں دعوے (assertions) قبول کرتا ہے (جیسے "یہ میرا صارف جان ہے، اسے A، B، اور C کرنے کی اجازت ہونی چاہیے") اگر اس کا اس کے ساتھ، یا اس [سرٹیفکیٹ اتھارٹی](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) کے ساتھ پہلے سے موجود اعتماد کا رشتہ ہو جس نے اس IdP کے سرٹیفکیٹ پر دستخط کیے ہوں۔

مثال کے طور پر، SP ایک ٹریول ایجنسی ہو سکتی ہے جو کمپنیوں کو سفری خدمات فراہم کرتی ہے، اور IdP کسی کمپنی کی اندرونی ویب سائٹ ہو سکتی ہے۔ جب ملازمین کو کاروباری سفر بک کرنے کی ضرورت ہوتی ہے، تو ٹریول ایجنسی انہیں اصل میں سفر بک کرنے دینے سے پہلے کمپنی کے ذریعے تصدیق کے لیے بھیجتی ہے۔

![مرحلہ وار SAML کا عمل](./fig-01-saml.png)

یہ وہ طریقہ ہے جس سے تینوں ادارے، براؤزر، SP، اور IdP، رسائی کے لیے بات چیت کرتے ہیں۔ SP کو براؤزر استعمال کرنے والے صارف کے بارے میں پہلے سے کچھ جاننے کی ضرورت نہیں ہے، بس IdP پر بھروسہ کرنا ہوتا ہے۔

### SAML کے لوگوں کے لیے ایتھیریم

ایتھیریم ایک غیر مرکزی (decentralized) نظام ہے۔ 

![ایتھیریم لاگ ان](./fig-02-eth-logon.png)

صارفین کے پاس ایک پرائیویٹ کلید (private key) ہوتی ہے (جو عام طور پر براؤزر ایکسٹینشن میں رکھی جاتی ہے)۔ پرائیویٹ کلید سے آپ ایک پبلک کلید (public key) اخذ کر سکتے ہیں، اور اس سے 20 بائٹ کا ایڈریس۔ جب صارفین کو کسی سسٹم میں لاگ ان کرنے کی ضرورت ہوتی ہے، تو ان سے ایک نانس (nonce - ایک بار استعمال ہونے والی قدر) کے ساتھ پیغام پر دستخط کرنے کی درخواست کی جاتی ہے۔ سرور تصدیق کر سکتا ہے کہ دستخط اسی ایڈریس کے ذریعے بنائے گئے تھے۔

![تصدیق ناموں سے اضافی ڈیٹا حاصل کرنا](./fig-03-eas-data.png)

دستخط صرف ایتھیریم ایڈریس کی تصدیق کرتا ہے۔ صارف کی دیگر خصوصیات حاصل کرنے کے لیے، آپ عام طور پر [تصدیق نامے (attestations)](https://attest.org/) استعمال کرتے ہیں۔ ایک تصدیق نامے میں عام طور پر یہ فیلڈز ہوتے ہیں:

- **تصدیق کنندہ (Attestor)**، وہ ایڈریس جس نے تصدیق کی
- **وصول کنندہ (Recipient)**، وہ ایڈریس جس پر تصدیق کا اطلاق ہوتا ہے
- **ڈیٹا (Data)**، وہ ڈیٹا جس کی تصدیق کی جا رہی ہے، جیسے نام، اجازتیں وغیرہ۔
- **اسکیما (Schema)**، اسکیما کی ID جو ڈیٹا کی تشریح کے لیے استعمال ہوتی ہے۔

ایتھیریم کی غیر مرکزی نوعیت کی وجہ سے، کوئی بھی صارف تصدیق کر سکتا ہے۔ تصدیق کنندہ کی شناخت یہ پہچاننے کے لیے اہم ہے کہ ہم کن تصدیق ناموں کو قابل اعتماد سمجھتے ہیں۔

## سیٹ اپ

پہلا قدم یہ ہے کہ ایک SAML SP اور ایک SAML IdP آپس میں بات چیت کر رہے ہوں۔

1. سافٹ ویئر ڈاؤن لوڈ کریں۔ اس مضمون کے لیے نمونہ سافٹ ویئر [گٹ ہب پر](https://github.com/qbzzt/250420-saml-ethereum) موجود ہے۔ مختلف مراحل مختلف برانچز میں محفوظ ہیں، اس مرحلے کے لیے آپ کو `saml-only` درکار ہے۔

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. سیلف سائنڈ (self-signed) سرٹیفکیٹس کے ساتھ کلیدیں بنائیں۔ اس کا مطلب ہے کہ کلید اپنی خود کی سرٹیفکیٹ اتھارٹی ہے، اور اسے سروس فراہم کنندہ میں دستی طور پر امپورٹ کرنے کی ضرورت ہے۔ مزید معلومات کے لیے [OpenSSL کی دستاویزات](https://docs.openssl.org/master/man1/openssl-req/) دیکھیں۔ 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. سرورز شروع کریں (SP اور IdP دونوں)

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/) پر SP کو براؤز کریں اور IdP (پورٹ 3001) پر ری ڈائریکٹ ہونے کے لیے بٹن پر کلک کریں۔

5. IdP کو اپنا ای میل ایڈریس فراہم کریں اور **Login to the service provider** پر کلک کریں۔ دیکھیں کہ آپ واپس سروس فراہم کنندہ (پورٹ 3000) پر ری ڈائریکٹ ہو جاتے ہیں اور یہ آپ کو آپ کے ای میل ایڈریس سے پہچانتا ہے۔

### تفصیلی وضاحت

مرحلہ وار یہ ہوتا ہے:

![ایتھیریم کے بغیر عام SAML لاگ ان](./fig-04-saml-no-eth.png)

#### src/config.mts

اس فائل میں شناختی فراہم کنندہ (Identity Provider) اور سروس فراہم کنندہ (Service Provider) دونوں کی کنفیگریشن شامل ہے۔ عام طور پر یہ دونوں مختلف ادارے ہوں گے، لیکن یہاں ہم سادگی کے لیے کوڈ شیئر کر سکتے ہیں۔

```typescript
const fs = await import("fs")

const protocol="http"
```

فی الحال ہم صرف ٹیسٹنگ کر رہے ہیں، اس لیے HTTP کا استعمال ٹھیک ہے۔

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

پبلک کلیدیں پڑھیں، جو عام طور پر دونوں اجزاء کو دستیاب ہوتی ہیں (اور یا تو براہ راست قابل اعتماد ہوتی ہیں، یا کسی قابل اعتماد سرٹیفکیٹ اتھارٹی کے ذریعے دستخط شدہ ہوتی ہیں)۔

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

دونوں اجزاء کے URLs۔

```typescript
export const spPublicData = {
```

سروس فراہم کنندہ کے لیے پبلک ڈیٹا۔

```typescript
    entityID: `${spUrl}/metadata`,
```

روایت کے مطابق، SAML میں `entityID` وہ URL ہے جہاں ادارے کا میٹا ڈیٹا دستیاب ہوتا ہے۔ یہ میٹا ڈیٹا یہاں موجود پبلک ڈیٹا سے مطابقت رکھتا ہے، سوائے اس کے کہ یہ XML کی شکل میں ہوتا ہے۔

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

ہمارے مقاصد کے لیے سب سے اہم تعریف `assertionConsumerServer` ہے۔ اس کا مطلب ہے کہ سروس فراہم کنندہ کے سامنے کچھ دعویٰ کرنے کے لیے (مثال کے طور پر، "جو صارف آپ کو یہ معلومات بھیجتا ہے وہ somebody@example.com ہے") ہمیں URL `http://localhost:3000/sp/assertion` پر [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) استعمال کرنے کی ضرورت ہے۔

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

شناختی فراہم کنندہ کا پبلک ڈیٹا بھی اسی طرح کا ہے۔ یہ بتاتا ہے کہ صارف کو لاگ ان کرنے کے لیے آپ `http://localhost:3001/idp/login` پر POST کرتے ہیں اور صارف کو لاگ آؤٹ کرنے کے لیے آپ `http://localhost:3001/idp/logout` پر POST کرتے ہیں۔

#### src/sp.mts

یہ وہ کوڈ ہے جو سروس فراہم کنندہ کو نافذ کرتا ہے۔

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

ہم SAML کو نافذ کرنے کے لیے [`samlify`](https://www.npmjs.com/package/samlify) لائبریری کا استعمال کرتے ہیں۔

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` لائبریری توقع کرتی ہے کہ ایک پیکیج اس بات کی توثیق کرے گا کہ XML درست ہے، متوقع پبلک کلید کے ساتھ دستخط شدہ ہے، وغیرہ۔ ہم اس مقصد کے لیے [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) استعمال کرتے ہیں۔

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

ایک [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) ایک "منی ویب سائٹ" ہے جسے کسی ویب سائٹ کے اندر ماؤنٹ کیا جا سکتا ہے۔ اس صورت میں، ہم اسے سروس فراہم کنندہ کی تمام تعریفوں کو ایک ساتھ گروپ کرنے کے لیے استعمال کرتے ہیں۔

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

سروس فراہم کنندہ کی اپنی نمائندگی وہ تمام پبلک ڈیٹا ہے، اور وہ پرائیویٹ کلید ہے جسے وہ معلومات پر دستخط کرنے کے لیے استعمال کرتا ہے۔

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

پبلک ڈیٹا میں وہ سب کچھ شامل ہوتا ہے جو سروس فراہم کنندہ کو شناختی فراہم کنندہ کے بارے میں جاننے کی ضرورت ہوتی ہے۔

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

دیگر SAML اجزاء کے ساتھ انٹرآپریبلٹی (interoperability) کو فعال کرنے کے لیے، سروس اور شناختی فراہم کنندگان کا پبلک ڈیٹا (جسے میٹا ڈیٹا کہا جاتا ہے) `/metadata` میں XML فارمیٹ میں دستیاب ہونا چاہیے۔

```typescript
spRouter.post(`/assertion`,
```

یہ وہ صفحہ ہے جس تک براؤزر اپنی شناخت کے لیے رسائی حاصل کرتا ہے۔ دعوے (assertion) میں صارف کا شناخت کنندہ (یہاں ہم ای میل ایڈریس استعمال کرتے ہیں) شامل ہوتا ہے، اور اس میں اضافی خصوصیات شامل ہو سکتی ہیں۔ یہ اوپر دی گئی ترتیب کے خاکہ (sequence diagram) میں مرحلہ 7 کا ہینڈلر ہے۔

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

آپ دعوے میں فراہم کردہ XML ڈیٹا دیکھنے کے لیے کمنٹ آؤٹ کی گئی کمانڈ استعمال کر سکتے ہیں۔ یہ [base64 انکوڈ شدہ](https://en.wikipedia.org/wiki/Base64) ہے۔

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

شناختی سرور سے لاگ ان کی درخواست کو پارس (parse) کریں۔

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

ایک HTML رسپانس بھیجیں، صرف صارف کو یہ دکھانے کے لیے کہ ہمیں لاگ ان مل گیا ہے۔

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

ناکامی کی صورت میں صارف کو مطلع کریں۔

```typescript
spRouter.get('/login',
```

جب براؤزر اس صفحے کو حاصل کرنے کی کوشش کرے تو لاگ ان کی درخواست بنائیں۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ 1 کا ہینڈلر ہے۔

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

لاگ ان کی درخواست پوسٹ کرنے کے لیے معلومات حاصل کریں۔

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

یہ صفحہ فارم (نیچے دیکھیں) خود بخود جمع کر دیتا ہے۔ اس طرح صارف کو ری ڈائریکٹ ہونے کے لیے کچھ نہیں کرنا پڑتا۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ 2 ہے۔

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (شناختی فراہم کنندہ کے اینڈ پوائنٹ کا URL) پر پوسٹ کریں۔

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ان پٹ کا نام `loginRequest.type` (`SAMLRequest`) ہے۔ اس فیلڈ کا مواد `loginRequest.context` ہے، جو کہ دوبارہ XML ہے جو base64 انکوڈ شدہ ہے۔

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[یہ مڈل ویئر](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP درخواست](https://www.tutorialspoint.com/http/http_requests.htm) کی باڈی کو پڑھتا ہے۔ پہلے سے طے شدہ طور پر express اسے نظر انداز کر دیتا ہے، کیونکہ زیادہ تر درخواستوں کو اس کی ضرورت نہیں ہوتی۔ ہمیں اس کی ضرورت ہے کیونکہ POST باڈی کا استعمال کرتا ہے۔

```typescript
app.use(`/${config.spDir}`, spRouter)
```

راؤٹر کو سروس فراہم کنندہ کی ڈائرکٹری (`/sp`) میں ماؤنٹ کریں۔

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

اگر کوئی براؤزر روٹ ڈائرکٹری حاصل کرنے کی کوشش کرتا ہے، تو اسے لاگ ان صفحے کا لنک فراہم کریں۔

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

اس express ایپلیکیشن کے ساتھ `spPort` کو سنیں۔

#### src/idp.mts

یہ شناختی فراہم کنندہ ہے۔ یہ سروس فراہم کنندہ سے بہت ملتا جلتا ہے، ذیل میں دی گئی وضاحتیں ان حصوں کے لیے ہیں جو مختلف ہیں۔

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // خصوصیات کو برقرار رکھیں
    attributeNamePrefix: "@_", // خصوصیات کے لیے سابقہ
  }
)
```

ہمیں سروس فراہم کنندہ سے موصول ہونے والی XML درخواست کو پڑھنے اور سمجھنے کی ضرورت ہے۔

```typescript
const getLoginPage = requestId => `
```

یہ فنکشن آٹو سبمٹڈ فارم کے ساتھ وہ صفحہ بناتا ہے جو اوپر دی گئی ترتیب کے خاکہ کے مرحلہ 4 میں واپس کیا جاتا ہے۔

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

دو فیلڈز ہیں جو ہم سروس فراہم کنندہ کو بھیجتے ہیں:

1. وہ `requestId` جس کا ہم جواب دے رہے ہیں۔
2. صارف کا شناخت کنندہ (ہم فی الحال وہ ای میل ایڈریس استعمال کرتے ہیں جو صارف فراہم کرتا ہے)۔

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

یہ اوپر دی گئی ترتیب کے خاکہ کے مرحلہ 5 کا ہینڈلر ہے۔ [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) لاگ ان کا رسپانس بناتا ہے۔ 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

سامعین (audience) سروس فراہم کنندہ ہے۔

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

درخواست سے نکالی گئی معلومات۔ درخواست میں جس ایک پیرامیٹر کی ہمیں پرواہ ہے وہ requestId ہے، جو سروس فراہم کنندہ کو درخواستوں اور ان کے جوابات کو ملانے کی اجازت دیتا ہے۔

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert } // دستخط کو یقینی بنائیں
```

ہمیں رسپانس پر دستخط کرنے کے لیے ڈیٹا رکھنے کے لیے `signingKey` کی ضرورت ہے۔ سروس فراہم کنندہ بغیر دستخط شدہ درخواستوں پر بھروسہ نہیں کرتا۔

```typescript
    },
    "post",
    {
      email: req.body.email
```

یہ صارف کی معلومات والا فیلڈ ہے جسے ہم واپس سروس فراہم کنندہ کو بھیجتے ہیں۔

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

دوبارہ، ایک آٹو سبمٹڈ فارم استعمال کریں۔ یہ اوپر دی گئی ترتیب کے خاکہ کا مرحلہ 6 ہے۔

```typescript

// لاگ ان کی درخواستوں کے لیے IdP اینڈ پوائنٹ
idpRouter.post(`/login`,
```

یہ وہ اینڈ پوائنٹ ہے جو سروس فراہم کنندہ سے لاگ ان کی درخواست وصول کرتا ہے۔ یہ اوپر دی گئی ترتیب کے خاکہ کے مرحلہ 3 کا ہینڈلر ہے۔

```typescript
  async (req, res) => {
    try {
      // متبادل حل کیونکہ میں parseLoginRequest کو چلا نہیں سکا۔
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

ہمیں تصدیقی درخواست کی ID پڑھنے کے لیے [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) استعمال کرنے کے قابل ہونا چاہیے۔ تاہم، میں اسے کام نہیں کروا سکا اور اس پر زیادہ وقت صرف کرنا مناسب نہیں تھا اس لیے میں نے صرف ایک [عام مقصد کا XML پارسر](https://www.npmjs.com/package/fast-xml-parser) استعمال کیا۔ ہمیں جس معلومات کی ضرورت ہے وہ `<samlp:AuthnRequest>` ٹیگ کے اندر `ID` وصف (attribute) ہے، جو XML کی اوپری سطح پر ہے۔

## ایتھیریم سگنیچرز کا استعمال

اب جب کہ ہم سروس فراہم کنندہ کو صارف کی شناخت بھیج سکتے ہیں، اگلا قدم صارف کی شناخت کو قابل اعتماد طریقے سے حاصل کرنا ہے۔ Viem ہمیں صرف والیٹ سے صارف کا ایڈریس مانگنے کی اجازت دیتا ہے، لیکن اس کا مطلب براؤزر سے معلومات مانگنا ہے۔ ہم براؤزر کو کنٹرول نہیں کرتے، اس لیے ہم اس سے ملنے والے جواب پر خود بخود بھروسہ نہیں کر سکتے۔

اس کے بجائے، IdP براؤزر کو دستخط کرنے کے لیے ایک سٹرنگ بھیجنے والا ہے۔ اگر براؤزر میں موجود والیٹ اس سٹرنگ پر دستخط کرتا ہے، تو اس کا مطلب ہے کہ یہ واقعی وہی ایڈریس ہے (یعنی، یہ اس پرائیویٹ کلید کو جانتا ہے جو اس ایڈریس سے مطابقت رکھتی ہے)۔

اسے عملی طور پر دیکھنے کے لیے، موجودہ IdP اور SP کو روکیں اور یہ کمانڈز چلائیں:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

پھر [SP پر](http://localhost:3000) براؤز کریں اور ہدایات پر عمل کریں۔

نوٹ کریں کہ اس مقام پر ہم نہیں جانتے کہ ایتھیریم ایڈریس سے ای میل ایڈریس کیسے حاصل کیا جائے، اس لیے اس کے بجائے ہم SP کو `<ethereum address>@bad.email.address` رپورٹ کرتے ہیں۔

### تفصیلی وضاحت

تبدیلیاں پچھلے خاکے کے مراحل 4-5 میں ہیں۔

![ایتھیریم سگنیچر کے ساتھ SAML](./fig-05-saml-w-signature.png)

ہم نے صرف `idp.mts` فائل کو تبدیل کیا ہے۔ یہاں تبدیل شدہ حصے ہیں۔

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

ہمیں ان دو اضافی لائبریریوں کی ضرورت ہے۔ ہم [نانس (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce) کی قدر بنانے کے لیے [`uuid`](https://www.npmjs.com/package/uuid) استعمال کرتے ہیں۔ قدر بذات خود اہمیت نہیں رکھتی، صرف یہ حقیقت اہم ہے کہ اسے صرف ایک بار استعمال کیا جاتا ہے۔

[`viem`](https://viem.sh/) لائبریری ہمیں ایتھیریم کی تعریفیں استعمال کرنے دیتی ہے۔ یہاں ہمیں اس کی ضرورت اس بات کی تصدیق کرنے کے لیے ہے کہ دستخط واقعی درست ہیں۔

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

والیٹ صارف سے پیغام پر دستخط کرنے کی اجازت مانگتا ہے۔ ایک پیغام جو صرف ایک نانس ہو، صارفین کو الجھا سکتا ہے، اس لیے ہم یہ پرامپٹ شامل کرتے ہیں۔

```typescript
// requestIDs کو یہاں رکھیں
let nonces = {}
```

ہمیں درخواست کی معلومات کی ضرورت ہے تاکہ ہم اس کا جواب دے سکیں۔ ہم اسے درخواست کے ساتھ بھیج سکتے ہیں (مرحلہ 4)، اور اسے واپس وصول کر سکتے ہیں (مرحلہ 5)۔ تاہم، ہم براؤزر سے ملنے والی معلومات پر بھروسہ نہیں کر سکتے، جو ممکنہ طور پر کسی مخالف صارف کے کنٹرول میں ہوتا ہے۔ اس لیے اسے یہاں نانس کو کلید کے طور پر استعمال کرتے ہوئے محفوظ کرنا بہتر ہے۔

نوٹ کریں کہ ہم سادگی کی خاطر اسے یہاں ایک متغیر (variable) کے طور پر کر رہے ہیں۔ تاہم، اس کے کئی نقصانات ہیں:

- ہم ڈینائل آف سروس (denial of service) حملے کا شکار ہو سکتے ہیں۔ ایک بدنیتی پر مبنی صارف کئی بار لاگ ان کرنے کی کوشش کر سکتا ہے، جس سے ہماری میموری بھر سکتی ہے۔
- اگر IdP کے عمل کو دوبارہ شروع کرنے کی ضرورت پڑتی ہے، تو ہم موجودہ اقدار کھو دیتے ہیں۔
- ہم متعدد عملوں (processes) میں لوڈ بیلنس نہیں کر سکتے، کیونکہ ہر ایک کا اپنا متغیر ہوگا۔

پروڈکشن سسٹم پر ہم ایک ڈیٹا بیس استعمال کریں گے اور کسی قسم کا ایکسپائری میکانزم نافذ کریں گے۔

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

ایک نانس بنائیں، اور مستقبل کے استعمال کے لیے `requestId` کو محفوظ کریں۔

```typescript
  return `
<html>
  <head>
    <script type="module">
```

یہ جاوا اسکرپٹ صفحہ لوڈ ہونے پر خود بخود چل جاتی ہے۔

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

ہمیں `viem` سے کئی فنکشنز کی ضرورت ہے۔

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

ہم صرف اسی صورت میں کام کر سکتے ہیں اگر براؤزر پر کوئی والیٹ موجود ہو۔

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

والیٹ (`window.ethereum`) سے اکاؤنٹس کی فہرست کی درخواست کریں۔ فرض کریں کہ کم از کم ایک موجود ہے، اور صرف پہلے والے کو محفوظ کریں۔

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

براؤزر والیٹ کے ساتھ تعامل کرنے کے لیے ایک [والیٹ کلائنٹ](https://viem.sh/docs/clients/wallet) بنائیں۔

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

صارف سے پیغام پر دستخط کرنے کو کہیں۔ چونکہ یہ پورا HTML ایک [ٹیمپلیٹ سٹرنگ](https://viem.sh/docs/clients/wallet) میں ہے، اس لیے ہم idp کے عمل میں بیان کردہ متغیرات استعمال کر سکتے ہیں۔ یہ ترتیب کے خاکہ میں مرحلہ 4.5 ہے۔

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` پر ری ڈائریکٹ کریں۔ یہ ترتیب کے خاکہ میں مرحلہ 5 ہے۔

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

دستخط براؤزر کے ذریعے واپس بھیجے جاتے ہیں، جو ممکنہ طور پر بدنیتی پر مبنی ہو سکتا ہے (آپ کو براؤزر میں صرف `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` کھولنے سے روکنے کے لیے کچھ نہیں ہے)۔ لہذا، یہ تصدیق کرنا ضروری ہے کہ IdP کا عمل خراب دستخطوں کو صحیح طریقے سے ہینڈل کرتا ہے۔

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

باقی صرف معیاری HTML ہے۔

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

یہ ترتیب کے خاکہ میں مرحلہ 5 کا ہینڈلر ہے۔

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

درخواست کی ID حاصل کریں، اور `nonces` سے نانس کو حذف کریں تاکہ یہ یقینی بنایا جا سکے کہ اسے دوبارہ استعمال نہیں کیا جا سکتا۔

```typescript
  try {
```

چونکہ دستخط کے غلط ہونے کے بہت سے طریقے ہیں، اس لیے ہم اسے `try ... catch` بلاک میں لپیٹتے ہیں تاکہ کسی بھی پھینکی گئی خرابی (error) کو پکڑا جا سکے۔

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

ترتیب کے خاکہ میں مرحلہ 5.5 کو نافذ کرنے کے لیے [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) استعمال کریں۔

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

باقی ہینڈلر اس کے مساوی ہے جو ہم نے پہلے `/loginSubmitted` ہینڈلر میں کیا تھا، سوائے ایک چھوٹی سی تبدیلی کے۔

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

ہمارے پاس اصل ای میل ایڈریس نہیں ہے (ہم اسے اگلے حصے میں حاصل کریں گے)، اس لیے فی الحال ہم ایتھیریم ایڈریس واپس کرتے ہیں اور اسے واضح طور پر نشان زد کرتے ہیں کہ یہ ای میل ایڈریس نہیں ہے۔


```typescript
// لاگ ان کی درخواستوں کے لیے IdP اینڈ پوائنٹ
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // متبادل حل کیونکہ میں parseLoginRequest کو چلا نہیں سکا۔
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

`getLoginPage` کے بجائے، اب مرحلہ 3 کے ہینڈلر میں `getSignaturePage` استعمال کریں۔

## ای میل ایڈریس حاصل کرنا

اگلا قدم ای میل ایڈریس حاصل کرنا ہے، جو سروس فراہم کنندہ کی طرف سے درخواست کردہ شناخت کنندہ ہے۔ ایسا کرنے کے لیے، ہم [ایتھیریم اٹیسٹیشن سروس (EAS)](https://attest.org/) استعمال کرتے ہیں۔

تصدیق نامے حاصل کرنے کا سب سے آسان طریقہ [GraphQL API](https://docs.attest.org/docs/developer-tools/api) کا استعمال کرنا ہے۔ ہم یہ کیوری (query) استعمال کرتے ہیں:

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

اس [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) میں صرف ایک ای میل ایڈریس شامل ہے۔ یہ کیوری اس اسکیما کے تصدیق ناموں کے لیے پوچھتی ہے۔ تصدیق کے موضوع کو `recipient` کہا جاتا ہے۔ یہ ہمیشہ ایک ایتھیریم ایڈریس ہوتا ہے۔

انتباہ: ہم یہاں جس طرح سے تصدیق نامے حاصل کر رہے ہیں اس میں دو حفاظتی مسائل ہیں۔

- ہم API اینڈ پوائنٹ، `https://optimism.easscan.org/graphql` پر جا رہے ہیں، جو ایک مرکزی جزو ہے۔ ہم `id` وصف حاصل کر سکتے ہیں اور پھر آن چین (onchain) تلاش کر کے تصدیق کر سکتے ہیں کہ تصدیق نامہ اصلی ہے، لیکن API اینڈ پوائنٹ اب بھی ہمیں ان کے بارے میں نہ بتا کر تصدیق ناموں کو سنسر کر سکتا ہے۔ 

  یہ مسئلہ حل کرنا ناممکن نہیں ہے، ہم اپنا خود کا GraphQL اینڈ پوائنٹ چلا سکتے ہیں اور چین لاگز سے تصدیق نامے حاصل کر سکتے ہیں، لیکن یہ ہمارے مقاصد کے لیے ضرورت سے زیادہ ہے۔

- ہم تصدیق کنندہ کی شناخت کو نہیں دیکھتے۔ کوئی بھی ہمیں غلط معلومات فراہم کر سکتا ہے۔ حقیقی دنیا کے نفاذ میں ہمارے پاس قابل اعتماد تصدیق کنندگان کا ایک سیٹ ہوگا اور ہم صرف ان کے تصدیق ناموں کو دیکھیں گے۔

اسے عملی طور پر دیکھنے کے لیے، موجودہ IdP اور SP کو روکیں اور یہ کمانڈز چلائیں:

```sh
git checkout email-address
pnpm install
pnpm start
```

پھر اپنا ای میل ایڈریس فراہم کریں۔ آپ کے پاس ایسا کرنے کے دو طریقے ہیں:

- پرائیویٹ کلید کا استعمال کرتے ہوئے ایک والیٹ امپورٹ کریں، اور ٹیسٹنگ پرائیویٹ کلید `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` استعمال کریں۔

- اپنے ای میل ایڈریس کے لیے ایک تصدیق نامہ شامل کریں:

  1. [اٹیسٹیشن ایکسپلورر میں اسکیما](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) پر براؤز کریں۔

  2. **Attest with Schema** پر کلک کریں۔

  3. وصول کنندہ کے طور پر اپنا ایتھیریم ایڈریس، ای میل ایڈریس کے طور پر اپنا ای میل ایڈریس درج کریں، اور **Onchain** کو منتخب کریں۔ پھر **Make Attestation** پر کلک کریں۔

  4. اپنے والیٹ میں ٹرانزیکشن کو منظور کریں۔ گیس کی ادائیگی کے لیے آپ کو [آپٹیمزم بلاک چین (Optimism Blockchain)](https://app.optimism.io/bridge/deposit) پر کچھ ETH کی ضرورت ہوگی۔

کسی بھی طرح، یہ کرنے کے بعد [http://localhost:3000](http://localhost:3000) پر براؤز کریں اور ہدایات پر عمل کریں۔ اگر آپ نے ٹیسٹنگ پرائیویٹ کلید امپورٹ کی ہے، تو آپ کو موصول ہونے والا ای میل `test_addr_0@example.com` ہے۔ اگر آپ نے اپنا ایڈریس استعمال کیا ہے، تو یہ وہی ہونا چاہیے جس کی آپ نے تصدیق کی ہے۔

### تفصیلی وضاحت

![ایتھیریم ایڈریس سے ای میل تک پہنچنا](./fig-06-saml-sig-n-email.png)

نئے مراحل GraphQL کمیونیکیشن ہیں، مراحل 5.6 اور 5.7۔

دوبارہ، یہاں `idp.mts` کے تبدیل شدہ حصے ہیں۔

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

ہمیں درکار لائبریریاں امپورٹ کریں۔

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[ہر بلاک چین کے لیے ایک الگ اینڈ پوائنٹ](https://docs.attest.org/docs/developer-tools/api) موجود ہے۔

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

ایک نیا `GraphQLClient` کلائنٹ بنائیں جسے ہم اینڈ پوائنٹ سے کیوری کرنے کے لیے استعمال کر سکیں۔

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL ہمیں صرف بائٹس کے ساتھ ایک غیر شفاف (opaque) ڈیٹا آبجیکٹ دیتا ہے۔ اسے سمجھنے کے لیے ہمیں اسکیما کی ضرورت ہے۔

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

ایتھیریم ایڈریس سے ای میل ایڈریس حاصل کرنے کا ایک فنکشن۔

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

یہ ایک GraphQL کیوری ہے۔

```typescript
      attestations(
```

ہم تصدیق نامے تلاش کر رہے ہیں۔

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

ہمیں جو تصدیق نامے درکار ہیں وہ ہمارے اسکیما میں ہیں، جہاں وصول کنندہ `getAddress(ethAddr)` ہے۔ [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) فنکشن اس بات کو یقینی بناتا ہے کہ ہمارے ایڈریس میں درست [چیک سم (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) موجود ہے۔ یہ ضروری ہے کیونکہ GraphQL کیس سینسیٹو (case-significant) ہے۔ "0xBAD060A7"، "0xBad060A7"، اور "0xbad060a7" مختلف اقدار ہیں۔

```typescript
        take: 1
```

اس بات سے قطع نظر کہ ہمیں کتنے تصدیق نامے ملتے ہیں، ہمیں صرف پہلا والا چاہیے۔

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

وہ فیلڈز جو ہم وصول کرنا چاہتے ہیں۔

- `attester`: وہ ایڈریس جس نے تصدیق نامہ جمع کرایا۔ عام طور پر یہ فیصلہ کرنے کے لیے استعمال ہوتا ہے کہ تصدیق نامے پر بھروسہ کیا جائے یا نہیں۔
- `id`: تصدیق نامے کی ID۔ آپ اس قدر کو [آن چین تصدیق نامہ پڑھنے](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) کے لیے استعمال کر سکتے ہیں تاکہ یہ تصدیق کی جا سکے کہ GraphQL کیوری سے حاصل کردہ معلومات درست ہیں۔
- `data`: اسکیما کا ڈیٹا (اس صورت میں، ای میل ایڈریس)۔

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

اگر کوئی تصدیق نامہ نہیں ہے، تو ایک ایسی قدر واپس کریں جو واضح طور پر غلط ہو، لیکن جو سروس فراہم کنندہ کو درست معلوم ہو۔

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

اگر کوئی قدر موجود ہے، تو ڈیٹا کو ڈی کوڈ کرنے کے لیے `decodeData` استعمال کریں۔ ہمیں اس کے فراہم کردہ میٹا ڈیٹا کی ضرورت نہیں ہے، صرف قدر کی ضرورت ہے۔

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

ای میل ایڈریس حاصل کرنے کے لیے نیا فنکشن استعمال کریں۔

## غیر مرکزیت (decentralization) کے بارے میں کیا خیال ہے؟

اس کنفیگریشن میں صارفین وہ ہونے کا دکھاوا نہیں کر سکتے جو وہ نہیں ہیں، جب تک کہ ہم ایتھیریم سے ای میل ایڈریس کی میپنگ کے لیے قابل اعتماد تصدیق کنندگان پر انحصار کرتے ہیں۔ تاہم، ہمارا شناختی فراہم کنندہ اب بھی ایک مرکزی جزو ہے۔ جس کے پاس بھی شناختی فراہم کنندہ کی پرائیویٹ کلید ہے وہ سروس فراہم کنندہ کو غلط معلومات بھیج سکتا ہے۔

[ملٹی پارٹی کمپیوٹیشن (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) کا استعمال کرتے ہوئے اس کا کوئی حل ہو سکتا ہے۔ مجھے امید ہے کہ میں مستقبل کے ٹیوٹوریل میں اس کے بارے میں لکھوں گا۔

## نتیجہ

لاگ ان کے معیار، جیسے کہ ایتھیریم سگنیچرز، کو اپنانے میں مرغی اور انڈے کے مسئلے کا سامنا ہے۔ سروس فراہم کنندگان وسیع ترین ممکنہ مارکیٹ کو راغب کرنا چاہتے ہیں۔ صارفین چاہتے ہیں کہ وہ اپنے لاگ ان کے معیار کو سپورٹ کرنے کی فکر کیے بغیر سروسز تک رسائی حاصل کر سکیں۔
ایڈاپٹرز بنانا، جیسے کہ ایتھیریم IdP، ہمیں اس رکاوٹ پر قابو پانے میں مدد کر سکتا ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔