---
title: "ویب۲ کی توثیق کے لیے ایتھیریم کا استعمال"
description: "اس ٹیوٹوریل کو پڑھنے کے بعد، ایک ڈیولپر ایتھیریم لاگ ان (ویب۳) کو ⁦SAML⁩ لاگ ان کے ساتھ مربوط کرنے کے قابل ہو جائے گا، جو کہ ویب۲ میں سنگل سائن-آن اور دیگر متعلقہ خدمات فراہم کرنے کے لیے استعمال ہونے والا ایک معیار ہے۔ یہ ویب۲ وسائل تک رسائی کو ایتھیریم دستخطوں کے ذریعے توثیق کرنے کی اجازت دیتا ہے، جس میں صارف کی خصوصیات تصدیقات سے آتی ہیں۔"
author: اوری پومرانٹز
tags: ["ویب۲", "توثیق", "eas"]
skill: beginner
breadcrumb: "ویب۲ توثیق کے لیے ایتھیریم"
lang: ur
published: 2025-04-30
---

## تعارف {#introduction}

[<span dir="ltr">SAML</span>](https://www.onelogin.com/learn/saml) ویب۲ پر استعمال ہونے والا ایک معیار ہے جو ایک [شناختی فراہم کنندہ (<span dir="ltr">IdP</span>)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) کو [سروس فراہم کنندگان (<span dir="ltr">SP</span>)](https://en.wikipedia.org/wiki/Service_provider_(SAML) کے لیے صارف کی معلومات فراہم کرنے کی اجازت دیتا ہے۔

اس ٹیوٹوریل میں آپ سیکھیں گے کہ ایتھیریم دستخطوں کو <span dir="ltr">SAML</span> کے ساتھ کیسے مربوط کیا جائے تاکہ صارفین اپنے ایتھیریم والیٹس کا استعمال کرتے ہوئے خود کو ان ویب۲ سروسز پر توثیق کر سکیں جو ابھی تک مقامی طور پر ایتھیریم کو سپورٹ نہیں کرتیں۔

نوٹ کریں کہ یہ ٹیوٹوریل دو الگ الگ سامعین کے لیے لکھا گیا ہے:

- ایتھیریم کے لوگ جو ایتھیریم کو سمجھتے ہیں اور انہیں <span dir="ltr">SAML</span> سیکھنے کی ضرورت ہے
- ویب۲ کے لوگ جو <span dir="ltr">SAML</span> اور ویب۲ توثیق کو سمجھتے ہیں اور انہیں ایتھیریم سیکھنے کی ضرورت ہے

نتیجتاً، اس میں بہت سا ایسا تعارفی مواد شامل ہوگا جو آپ پہلے سے جانتے ہیں۔ آپ اسے بلا جھجھک چھوڑ سکتے ہیں۔

### ایتھیریم کے لوگوں کے لیے <span dir="ltr">SAML</span> {#saml-for-ethereum-people}

<span dir="ltr">SAML</span> ایک مرکزی پروٹوکول ہے۔ ایک سروس فراہم کنندہ (<span dir="ltr">SP</span>) کسی شناختی فراہم کنندہ (<span dir="ltr">IdP</span>) سے دعوے (جیسے "یہ میرا صارف جان ہے، اسے A، B، اور C کرنے کی اجازت ہونی چاہیے") صرف اسی صورت میں قبول کرتا ہے جب اس کا اس کے ساتھ، یا اس [سرٹیفکیٹ اتھارٹی](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) کے ساتھ پہلے سے موجود اعتماد کا رشتہ ہو جس نے اس <span dir="ltr">IdP</span> کے سرٹیفکیٹ پر دستخط کیے ہوں۔

مثال کے طور پر، <span dir="ltr">SP</span> ایک ٹریول ایجنسی ہو سکتی ہے جو کمپنیوں کو سفری خدمات فراہم کرتی ہے، اور <span dir="ltr">IdP</span> کسی کمپنی کی اندرونی ویب سائٹ ہو سکتی ہے۔ جب ملازمین کو کاروباری سفر بک کرنے کی ضرورت ہوتی ہے، تو ٹریول ایجنسی انہیں اصل میں سفر بک کرنے کی اجازت دینے سے پہلے کمپنی کے ذریعے توثیق کے لیے بھیجتی ہے۔

![Step by step SAML process](./fig-01-saml.png)

یہ وہ طریقہ ہے جس سے تینوں ادارے، براؤزر، <span dir="ltr">SP</span>، اور <span dir="ltr">IdP</span>، رسائی کے لیے بات چیت کرتے ہیں۔ <span dir="ltr">SP</span> کو براؤزر استعمال کرنے والے صارف کے بارے میں پہلے سے کچھ جاننے کی ضرورت نہیں ہوتی، بس <span dir="ltr">IdP</span> پر اعتماد کرنا ہوتا ہے۔

### <span dir="ltr">SAML</span> کے لوگوں کے لیے ایتھیریم {#ethereum-for-saml-people}

ایتھیریم ایک لامركزی نظام ہے۔ 

![Ethereum logon](./fig-02-eth-logon.png)

صارفین کے پاس ایک نجی کلید ہوتی ہے (جو عام طور پر براؤزر ایکسٹینشن میں رکھی جاتی ہے)۔ نجی کلید سے آپ ایک عوامی کلید اخذ کر سکتے ہیں، اور اس سے ایک <span dir="ltr">20-byte</span> پتہ حاصل کر سکتے ہیں۔ جب صارفین کو کسی سسٹم میں لاگ ان کرنے کی ضرورت ہوتی ہے، تو ان سے ایک نانس (ایک بار استعمال ہونے والی قدر) کے ساتھ ایک پیغام پر دستخط کرنے کی درخواست کی جاتی ہے۔ سرور اس بات کی تصدیق کر سکتا ہے کہ دستخط اسی پتہ کے ذریعے بنائے گئے تھے۔

![Getting extra data from attestations](./fig-03-eas-data.png)

دستخط صرف ایتھیریم پتہ کی تصدیق کرتا ہے۔ صارف کی دیگر خصوصیات حاصل کرنے کے لیے، آپ عام طور پر [تصدیقات](https://attest.org/) کا استعمال کرتے ہیں۔ ایک تصدیق میں عام طور پر یہ فیلڈز ہوتے ہیں:

- **تصدیق کنندہ (Attestor)**، وہ پتہ جس نے تصدیق کی
- **وصول کنندہ (Recipient)**، وہ پتہ جس پر تصدیق لاگو ہوتی ہے
- **ڈیٹا (Data)**، وہ ڈیٹا جس کی تصدیق کی جا رہی ہے، جیسے نام، اجازتیں، وغیرہ۔
- **اسکیما (Schema)**، اس اسکیما کی <span dir="ltr">ID</span> جو ڈیٹا کی تشریح کے لیے استعمال ہوتی ہے۔

ایتھیریم کی لامركزی نوعیت کی وجہ سے، کوئی بھی صارف تصدیقات کر سکتا ہے۔ تصدیق کنندہ کی شناخت یہ جاننے کے لیے اہم ہے کہ ہم کن تصدیقات کو قابل اعتماد سمجھتے ہیں۔

## سیٹ اپ {#setup}

پہلا قدم یہ ہے کہ ایک <span dir="ltr">SAML SP</span> اور ایک <span dir="ltr">SAML IdP</span> آپس میں بات چیت کر رہے ہوں۔

1. سافٹ ویئر ڈاؤن لوڈ کریں۔ اس مضمون کے لیے نمونہ سافٹ ویئر [<span dir="ltr">GitHub</span> پر](https://github.com/qbzzt/250420-saml-ethereum) موجود ہے۔ مختلف مراحل مختلف برانچز میں محفوظ ہیں، اس مرحلے کے لیے آپ کو `saml-only` درکار ہے۔

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. سیلف سائنڈ سرٹیفکیٹس کے ساتھ کلیدیں بنائیں۔ اس کا مطلب ہے کہ کلید خود اپنی سرٹیفکیٹ اتھارٹی ہے، اور اسے سروس فراہم کنندہ میں دستی طور پر امپورٹ کرنے کی ضرورت ہے۔ مزید معلومات کے لیے [<span dir="ltr">OpenSSL</span> کی دستاویزات](https://docs.openssl.org/master/man1/openssl-req/) دیکھیں۔ 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. سرورز شروع کریں (<span dir="ltr">SP</span> اور <span dir="ltr">IdP</span> دونوں)

    ```sh
    pnpm start
    ```

4. <span dir="ltr">URL</span> [<span dir="ltr">http://localhost:3000/</span>](http://localhost:3000/) پر <span dir="ltr">SP</span> کو براؤز کریں اور <span dir="ltr">IdP</span> (پورٹ <span dir="ltr">3001</span>) پر ری ڈائریکٹ ہونے کے لیے بٹن پر کلک کریں۔

5. <span dir="ltr">IdP</span> کو اپنا ای میل پتہ فراہم کریں اور **سروس فراہم کنندہ میں لاگ ان کریں** پر کلک کریں۔ دیکھیں کہ آپ واپس سروس فراہم کنندہ (پورٹ <span dir="ltr">3000</span>) پر ری ڈائریکٹ ہو جاتے ہیں اور یہ آپ کو آپ کے ای میل پتہ سے پہچانتا ہے۔

### تفصیلی وضاحت {#detailed-explanation}

یہاں قدم بہ قدم یہ ہوتا ہے:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### <span dir="ltr">src/config.mts</span> {#srcconfigmts}

اس فائل میں شناختی فراہم کنندہ اور سروس فراہم کنندہ دونوں کی کنفیگریشن شامل ہے۔ عام طور پر یہ دونوں مختلف ادارے ہوں گے، لیکن یہاں ہم سادگی کے لیے کوڈ شیئر کر سکتے ہیں۔

```typescript
const fs = await import("fs")

const protocol="http"
```

فی الحال ہم صرف ٹیسٹنگ کر رہے ہیں، اس لیے <span dir="ltr">HTTP</span> کا استعمال ٹھیک ہے۔

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

عوامی کلیدیں پڑھیں، جو عام طور پر دونوں اجزاء کو دستیاب ہوتی ہیں (اور یا تو براہ راست قابل اعتماد ہوتی ہیں، یا کسی قابل اعتماد سرٹیفکیٹ اتھارٹی کے ذریعے دستخط شدہ ہوتی ہیں)۔

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

دونوں اجزاء کے لیے <span dir="ltr">URLs</span>۔

```typescript
export const spPublicData = {
```

سروس فراہم کنندہ کے لیے عوامی ڈیٹا۔

```typescript
    entityID: `${spUrl}/metadata`,
```

روایت کے مطابق، <span dir="ltr">SAML</span> میں `entityID` وہ <span dir="ltr">URL</span> ہے جہاں ادارے کا میٹا ڈیٹا دستیاب ہوتا ہے۔ یہ میٹا ڈیٹا یہاں موجود عوامی ڈیٹا سے مطابقت رکھتا ہے، سوائے اس کے کہ یہ <span dir="ltr">XML</span> کی شکل میں ہوتا ہے۔

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

ہمارے مقاصد کے لیے سب سے اہم تعریف `assertionConsumerServer` ہے۔ اس کا مطلب ہے کہ سروس فراہم کنندہ کے سامنے کچھ تصدیق کرنے کے لیے (مثال کے طور پر، "جو صارف آپ کو یہ معلومات بھیجتا ہے وہ <span dir="ltr">somebody@example.com</span> ہے") ہمیں <span dir="ltr">URL</span> `http://localhost:3000/sp/assertion` پر [<span dir="ltr">HTTP POST</span>](https://www.w3schools.com/tags/ref_httpmethods.asp) استعمال کرنے کی ضرورت ہے۔

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

شناختی فراہم کنندہ کے لیے عوامی ڈیٹا بھی اسی طرح کا ہے۔ یہ بتاتا ہے کہ کسی صارف کو لاگ ان کرنے کے لیے آپ `http://localhost:3001/idp/login` پر <span dir="ltr">POST</span> کرتے ہیں اور صارف کو لاگ آؤٹ کرنے کے لیے آپ `http://localhost:3001/idp/logout` پر <span dir="ltr">POST</span> کرتے ہیں۔

#### <span dir="ltr">src/sp.mts</span> {#srcspmts}

یہ وہ کوڈ ہے جو سروس فراہم کنندہ کو نافذ کرتا ہے۔

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

ہم <span dir="ltr">SAML</span> کو نافذ کرنے کے لیے [`samlify`](https://www.npmjs.com/package/samlify) لائبریری کا استعمال کرتے ہیں۔

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` لائبریری توقع کرتی ہے کہ ایک پیکیج اس بات کی توثیق کرے گا کہ <span dir="ltr">XML</span> درست ہے، متوقع عوامی کلید کے ساتھ دستخط شدہ ہے، وغیرہ۔ ہم اس مقصد کے لیے [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) کا استعمال کرتے ہیں۔

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

سروس فراہم کنندہ کی اپنی نمائندگی اس کا تمام عوامی ڈیٹا، اور وہ نجی کلید ہے جسے وہ معلومات پر دستخط کرنے کے لیے استعمال کرتا ہے۔

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

عوامی ڈیٹا میں وہ سب کچھ شامل ہوتا ہے جو سروس فراہم کنندہ کو شناختی فراہم کنندہ کے بارے میں جاننے کی ضرورت ہوتی ہے۔

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

دیگر <span dir="ltr">SAML</span> اجزاء کے ساتھ باہمی عمل پذیری کو فعال کرنے کے لیے، سروس اور شناختی فراہم کنندگان کا عوامی ڈیٹا (جسے میٹا ڈیٹا کہا جاتا ہے) `/metadata` میں <span dir="ltr">XML</span> فارمیٹ میں دستیاب ہونا چاہیے۔

```typescript
spRouter.post(`/assertion`,
```

یہ وہ صفحہ ہے جس تک براؤزر اپنی شناخت کے لیے رسائی حاصل کرتا ہے۔ دعوے میں صارف کا شناخت کنندہ شامل ہوتا ہے (یہاں ہم ای میل پتہ استعمال کرتے ہیں)، اور اس میں اضافی خصوصیات شامل ہو سکتی ہیں۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">7</span> کا ہینڈلر ہے۔

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

آپ دعوے میں فراہم کردہ <span dir="ltr">XML</span> ڈیٹا دیکھنے کے لیے کمنٹ آؤٹ کی گئی کمانڈ استعمال کر سکتے ہیں۔ یہ [<span dir="ltr">base64</span> انکوڈ شدہ](https://en.wikipedia.org/wiki/Base64) ہے۔

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

شناختی سرور سے لاگ ان کی درخواست کو پارس کریں۔

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

ایک <span dir="ltr">HTML</span> جواب بھیجیں، صرف صارف کو یہ دکھانے کے لیے کہ ہمیں لاگ ان مل گیا ہے۔

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

جب براؤزر اس صفحہ کو حاصل کرنے کی کوشش کرے تو لاگ ان کی درخواست بنائیں۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">1</span> کا ہینڈلر ہے۔

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

یہ صفحہ فارم (نیچے دیکھیں) خود بخود جمع کر دیتا ہے۔ اس طرح صارف کو ری ڈائریکٹ ہونے کے لیے کچھ کرنے کی ضرورت نہیں ہوتی۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">2</span> ہے۔

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` پر پوسٹ کریں (شناختی فراہم کنندہ کے اینڈ پوائنٹ کا <span dir="ltr">URL</span>)۔

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ان پٹ کا نام `loginRequest.type` (`SAMLRequest`) ہے۔ اس فیلڈ کا مواد `loginRequest.context` ہے، جو کہ دوبارہ <span dir="ltr">XML</span> ہے جو <span dir="ltr">base64</span> انکوڈ شدہ ہے۔

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[یہ مڈل ویئر](https://expressjs.com/en/5x/api.html#express.urlencoded) [<span dir="ltr">HTTP</span> درخواست](https://www.tutorialspoint.com/http/http_requests.htm) کی باڈی کو پڑھتا ہے۔ پہلے سے طے شدہ طور پر ایکسپریس اسے نظر انداز کر دیتا ہے، کیونکہ زیادہ تر درخواستوں کو اس کی ضرورت نہیں ہوتی۔ ہمیں اس کی ضرورت ہے کیونکہ <span dir="ltr">POST</span> باڈی کا استعمال کرتا ہے۔

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

اگر کوئی براؤزر روٹ ڈائرکٹری حاصل کرنے کی کوشش کرتا ہے، تو اسے لاگ ان صفحہ کا لنک فراہم کریں۔

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

اس ایکسپریس ایپلیکیشن کے ساتھ `spPort` کو سنیں۔

#### <span dir="ltr">src/idp.mts</span> {#srcidpmts}

یہ شناختی فراہم کنندہ ہے۔ یہ سروس فراہم کنندہ سے بہت ملتا جلتا ہے، ذیل میں دی گئی وضاحتیں ان حصوں کے لیے ہیں جو مختلف ہیں۔

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // خصوصیات کو محفوظ رکھیں
    attributeNamePrefix: "@_", // خصوصیات کے لیے سابقہ
  }
)
```

ہمیں سروس فراہم کنندہ سے موصول ہونے والی <span dir="ltr">XML</span> درخواست کو پڑھنے اور سمجھنے کی ضرورت ہے۔

```typescript
const getLoginPage = requestId => `
```

یہ فنکشن آٹو-سبمٹڈ فارم کے ساتھ وہ صفحہ بناتا ہے جو اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">4</span> میں واپس کیا جاتا ہے۔

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

ہم سروس فراہم کنندہ کو دو فیلڈز بھیجتے ہیں:

1. وہ `requestId` جس کا ہم جواب دے رہے ہیں۔
2. صارف کا شناخت کنندہ (فی الحال ہم وہ ای میل پتہ استعمال کرتے ہیں جو صارف فراہم کرتا ہے)۔

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">5</span> کا ہینڈلر ہے۔ [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) لاگ ان کا جواب بناتا ہے۔ 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

سامعین سروس فراہم کنندہ ہیں۔

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

درخواست سے نکالی گئی معلومات۔ درخواست میں جس ایک پیرامیٹر کی ہمیں پرواہ ہے وہ <span dir="ltr">requestId</span> ہے، جو سروس فراہم کنندہ کو درخواستوں اور ان کے جوابات کو ملانے کی اجازت دیتا ہے۔

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // دستخط کو یقینی بنائیں
```

ہمیں جواب پر دستخط کرنے کے لیے ڈیٹا رکھنے کے لیے `signingKey` کی ضرورت ہے۔ سروس فراہم کنندہ غیر دستخط شدہ درخواستوں پر اعتماد نہیں کرتا۔

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

دوبارہ، ایک آٹو-سبمٹڈ فارم استعمال کریں۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">6</span> ہے۔

```typescript

// لاگ ان کی درخواستوں کے لیے IdP اینڈ پوائنٹ
idpRouter.post(`/login`,
```

یہ وہ اینڈ پوائنٹ ہے جو سروس فراہم کنندہ سے لاگ ان کی درخواست وصول کرتا ہے۔ یہ اوپر دی گئی ترتیب کے خاکہ میں مرحلہ <span dir="ltr">3</span> کا ہینڈلر ہے۔

```typescript
  async (req, res) => {
    try {
      // متبادل حل کیونکہ میں parseLoginRequest کو کام میں نہیں لا سکا۔
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

ہمیں توثیق کی درخواست کی <span dir="ltr">ID</span> پڑھنے کے لیے [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) استعمال کرنے کے قابل ہونا چاہیے۔ تاہم، میں اسے کام کرنے کے قابل نہیں بنا سکا اور اس پر زیادہ وقت صرف کرنا مناسب نہیں تھا اس لیے میں نے صرف ایک [عام مقصد کا <span dir="ltr">XML</span> پارسر](https://www.npmjs.com/package/fast-xml-parser) استعمال کیا۔ ہمیں جس معلومات کی ضرورت ہے وہ `<samlp:AuthnRequest>` ٹیگ کے اندر `ID` وصف ہے، جو <span dir="ltr">XML</span> کی اوپری سطح پر ہے۔

## ایتھیریم دستخطوں کا استعمال {#using-ethereum-signatures}

اب جب کہ ہم سروس فراہم کنندہ کو صارف کی شناخت بھیج سکتے ہیں، اگلا قدم قابل اعتماد طریقے سے صارف کی شناخت حاصل کرنا ہے۔ Viem ہمیں صرف والیٹ سے صارف کا پتہ مانگنے کی اجازت دیتا ہے، لیکن اس کا مطلب براؤزر سے معلومات مانگنا ہے۔ ہم براؤزر کو کنٹرول نہیں کرتے، اس لیے ہم اس سے ملنے والے جواب پر خود بخود اعتماد نہیں کر سکتے۔

اس کے بجائے، <span dir="ltr">IdP</span> براؤزر کو دستخط کرنے کے لیے ایک سٹرنگ بھیجنے والا ہے۔ اگر براؤزر میں موجود والیٹ اس سٹرنگ پر دستخط کرتا ہے، تو اس کا مطلب ہے کہ یہ واقعی وہی پتہ ہے (یعنی، یہ اس نجی کلید کو جانتا ہے جو اس پتہ سے مطابقت رکھتی ہے)۔

اسے عملی طور پر دیکھنے کے لیے، موجودہ <span dir="ltr">IdP</span> اور <span dir="ltr">SP</span> کو روکیں اور یہ کمانڈز چلائیں:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

پھر [<span dir="ltr">SP</span> پر](http://localhost:3000) براؤز کریں اور ہدایات پر عمل کریں۔

نوٹ کریں کہ اس مقام پر ہم نہیں جانتے کہ ایتھیریم پتہ سے ای میل پتہ کیسے حاصل کیا جائے، اس لیے اس کے بجائے ہم <span dir="ltr">SP</span> کو `<ethereum address>@bad.email.address` رپورٹ کرتے ہیں۔

### تفصیلی وضاحت {#detailed-explanation-2}

تبدیلیاں پچھلے خاکہ میں مراحل <span dir="ltr">4-5</span> میں ہیں۔

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

ہم نے صرف `idp.mts` فائل کو تبدیل کیا ہے۔ یہاں تبدیل شدہ حصے ہیں۔

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

ہمیں ان دو اضافی لائبریریوں کی ضرورت ہے۔ ہم [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) کی قدر بنانے کے لیے [`uuid`](https://www.npmjs.com/package/uuid) کا استعمال کرتے ہیں۔ قدر بذات خود اہمیت نہیں رکھتی، صرف یہ حقیقت اہم ہے کہ اسے صرف ایک بار استعمال کیا جاتا ہے۔

[`viem`](https://viem.sh/) لائبریری ہمیں ایتھیریم کی تعریفیں استعمال کرنے دیتی ہے۔ یہاں ہمیں اس بات کی تصدیق کرنے کے لیے اس کی ضرورت ہے کہ دستخط واقعی درست ہے۔

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

والیٹ صارف سے پیغام پر دستخط کرنے کی اجازت مانگتا ہے۔ ایک پیغام جو صرف ایک نانس ہو، صارفین کو الجھا سکتا ہے، اس لیے ہم یہ پرامپٹ شامل کرتے ہیں۔

```typescript
// requestIDs کو یہاں رکھیں
let nonces = {}
```

ہمیں درخواست کی معلومات کی ضرورت ہے تاکہ ہم اس کا جواب دے سکیں۔ ہم اسے درخواست کے ساتھ بھیج سکتے ہیں (مرحلہ <span dir="ltr">4</span>)، اور اسے واپس وصول کر سکتے ہیں (مرحلہ <span dir="ltr">5</span>)۔ تاہم، ہم براؤزر سے ملنے والی معلومات پر اعتماد نہیں کر سکتے، جو ممکنہ طور پر کسی مخالف صارف کے کنٹرول میں ہوتا ہے۔ اس لیے اسے یہاں نانس کو کلید کے طور پر استعمال کرتے ہوئے محفوظ کرنا بہتر ہے۔

نوٹ کریں کہ ہم سادگی کی خاطر اسے یہاں ایک متغیر کے طور پر کر رہے ہیں۔ تاہم، اس کے کئی نقصانات ہیں:

- ہم ڈینائل آف سروس (<span dir="ltr">DoS</span>) حملے کا شکار ہو سکتے ہیں۔ ایک بدنیتی پر مبنی صارف ہماری میموری کو بھرتے ہوئے کئی بار لاگ ان کرنے کی کوشش کر سکتا ہے۔
- اگر <span dir="ltr">IdP</span> کے عمل کو دوبارہ شروع کرنے کی ضرورت ہو، تو ہم موجودہ اقدار کھو دیتے ہیں۔
- ہم متعدد عملوں میں لوڈ بیلنس نہیں کر سکتے، کیونکہ ہر ایک کا اپنا متغیر ہوگا۔

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

یہ JavaScript صفحہ لوڈ ہونے پر خود بخود چل جاتی ہے۔

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

ہمیں `viem` سے کئی فنکشنز کی ضرورت ہے۔

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

ہم صرف اسی صورت میں کام کر سکتے ہیں جب براؤزر پر کوئی والیٹ موجود ہو۔

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

والیٹ سے اکاؤنٹس کی فہرست کی درخواست کریں (`window.ethereum`)۔ فرض کریں کہ کم از کم ایک موجود ہے، اور صرف پہلے والے کو محفوظ کریں۔ 

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

صارف سے پیغام پر دستخط کرنے کو کہیں۔ چونکہ یہ پورا <span dir="ltr">HTML</span> ایک [ٹیمپلیٹ سٹرنگ](https://viem.sh/docs/clients/wallet) میں ہے، اس لیے ہم <span dir="ltr">idp</span> کے عمل میں بیان کردہ متغیرات استعمال کر سکتے ہیں۔ یہ ترتیب کے خاکہ میں مرحلہ <span dir="ltr">4.5</span> ہے۔

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` پر ری ڈائریکٹ کریں۔ یہ ترتیب کے خاکہ میں مرحلہ <span dir="ltr">5</span> ہے۔

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

دستخط براؤزر کے ذریعے واپس بھیجا جاتا ہے، جو ممکنہ طور پر بدنیتی پر مبنی ہو سکتا ہے (آپ کو براؤزر میں صرف `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` کھولنے سے روکنے کے لیے کچھ نہیں ہے)۔ لہذا، یہ تصدیق کرنا ضروری ہے کہ <span dir="ltr">IdP</span> کا عمل خراب دستخطوں کو صحیح طریقے سے ہینڈل کرتا ہے۔

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

باقی صرف معیاری <span dir="ltr">HTML</span> ہے۔

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

یہ ترتیب کے خاکہ میں مرحلہ <span dir="ltr">5</span> کا ہینڈلر ہے۔

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

درخواست کی <span dir="ltr">ID</span> حاصل کریں، اور `nonces` سے نانس کو حذف کریں تاکہ یہ یقینی بنایا جا سکے کہ اسے دوبارہ استعمال نہیں کیا جا سکتا۔

```typescript
  try {
```

چونکہ دستخط کے غلط ہونے کے بہت سے طریقے ہیں، اس لیے ہم اسے ایک `try ... catch` بلاک میں لپیٹتے ہیں تاکہ کسی بھی پھینکی گئی خرابی کو پکڑا جا سکے۔

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

ترتیب کے خاکہ میں مرحلہ <span dir="ltr">5.5</span> کو نافذ کرنے کے لیے [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) کا استعمال کریں۔

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

ہمارے پاس اصل ای میل پتہ نہیں ہے (ہم اسے اگلے حصے میں حاصل کریں گے)، اس لیے فی الحال ہم ایتھیریم پتہ واپس کرتے ہیں اور اسے واضح طور پر نشان زد کرتے ہیں کہ یہ ای میل پتہ نہیں ہے۔


```typescript
// لاگ ان کی درخواستوں کے لیے IdP اینڈ پوائنٹ
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // متبادل حل کیونکہ میں parseLoginRequest کو کام میں نہیں لا سکا۔
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

`getLoginPage` کے بجائے، اب مرحلہ <span dir="ltr">3</span> کے ہینڈلر میں `getSignaturePage` استعمال کریں۔

## ای میل پتہ حاصل کرنا {#getting-the-email-address}

اگلا قدم ای میل پتہ حاصل کرنا ہے، جو سروس فراہم کنندہ کی طرف سے درخواست کردہ شناخت کنندہ ہے۔ ایسا کرنے کے لیے، ہم [ایتھیریم اٹیسٹیشن سروس (<span dir="ltr">EAS</span>)](https://attest.org/) کا استعمال کرتے ہیں۔

تصدیقات حاصل کرنے کا سب سے آسان طریقہ [GraphQL <span dir="ltr">API</span>](https://docs.attest.org/docs/developer-tools/api) کا استعمال کرنا ہے۔ ہم یہ استفسار (query) استعمال کرتے ہیں:

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

اس [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) میں صرف ایک ای میل پتہ شامل ہے۔ یہ استفسار اس اسکیما کی تصدیقات طلب کرتا ہے۔ تصدیق کے موضوع کو `recipient` کہا جاتا ہے۔ یہ ہمیشہ ایک ایتھیریم پتہ ہوتا ہے۔

انتباہ: ہم یہاں جس طرح سے تصدیقات حاصل کر رہے ہیں اس میں دو حفاظتی مسائل ہیں۔

- ہم <span dir="ltr">API</span> اینڈ پوائنٹ، `https://optimism.easscan.org/graphql` پر جا رہے ہیں، جو ایک مرکزی جزو ہے۔ ہم `id` وصف حاصل کر سکتے ہیں اور پھر یہ تصدیق کرنے کے لیے آن چین تلاش کر سکتے ہیں کہ آیا کوئی تصدیق اصلی ہے، لیکن <span dir="ltr">API</span> اینڈ پوائنٹ اب بھی ہمیں ان کے بارے میں نہ بتا کر تصدیقات کو سنسر کر سکتا ہے۔ 

  اس مسئلے کو حل کرنا ناممکن نہیں ہے، ہم اپنا GraphQL اینڈ پوائنٹ چلا سکتے ہیں اور چین لاگز سے تصدیقات حاصل کر سکتے ہیں، لیکن یہ ہمارے مقاصد کے لیے ضرورت سے زیادہ ہے۔

- ہم تصدیق کنندہ کی شناخت نہیں دیکھتے۔ کوئی بھی ہمیں غلط معلومات فراہم کر سکتا ہے۔ حقیقی دنیا کے نفاذ میں ہمارے پاس قابل اعتماد تصدیق کنندگان کا ایک مجموعہ ہوگا اور ہم صرف ان کی تصدیقات کو دیکھیں گے۔

اسے عملی طور پر دیکھنے کے لیے، موجودہ <span dir="ltr">IdP</span> اور <span dir="ltr">SP</span> کو روکیں اور یہ کمانڈز چلائیں:

```sh
git checkout email-address
pnpm install
pnpm start
```

پھر اپنا ای میل پتہ فراہم کریں۔ آپ کے پاس ایسا کرنے کے دو طریقے ہیں:

- نجی کلید کا استعمال کرتے ہوئے ایک والیٹ امپورٹ کریں، اور ٹیسٹنگ نجی کلید `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` استعمال کریں۔

- اپنے ای میل پتہ کے لیے ایک تصدیق شامل کریں:

  1. [اٹیسٹیشن ایکسپلورر میں اسکیما](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) پر براؤز کریں۔

  2. **<span dir="ltr">Attest with Schema</span>** پر کلک کریں۔

  3. وصول کنندہ کے طور پر اپنا ایتھیریم پتہ، ای میل پتہ کے طور پر اپنا ای میل پتہ درج کریں، اور **آن چین** منتخب کریں۔ پھر **<span dir="ltr">Make Attestation</span>** پر کلک کریں۔

  4. اپنے والیٹ میں ٹرانزیکشن کو منظور کریں۔ گیس کی ادائیگی کے لیے آپ کو [آپٹیمزم بلاک چین](https://app.optimism.io/bridge/deposit) پر کچھ ETH کی ضرورت ہوگی۔

کسی بھی طرح، ایسا کرنے کے بعد [<span dir="ltr">http://localhost:3000</span>](http://localhost:3000) پر براؤز کریں اور ہدایات پر عمل کریں۔ اگر آپ نے ٹیسٹنگ نجی کلید امپورٹ کی ہے، تو آپ کو موصول ہونے والا ای میل `test_addr_0@example.com` ہے۔ اگر آپ نے اپنا پتہ استعمال کیا ہے، تو یہ وہی ہونا چاہیے جس کی آپ نے تصدیق کی ہے۔

### تفصیلی وضاحت {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

نئے مراحل GraphQL مواصلات ہیں، مراحل <span dir="ltr">5.6</span> اور <span dir="ltr">5.7</span>۔

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

ایک نیا `GraphQLClient` کلائنٹ بنائیں جسے ہم اینڈ پوائنٹ سے استفسار کرنے کے لیے استعمال کر سکیں۔

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL ہمیں بائٹس کے ساتھ صرف ایک غیر شفاف ڈیٹا آبجیکٹ دیتا ہے۔ اسے سمجھنے کے لیے ہمیں اسکیما کی ضرورت ہے۔ 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

ایتھیریم پتہ سے ای میل پتہ حاصل کرنے کا ایک فنکشن۔

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

یہ ایک GraphQL استفسار ہے۔

```typescript
      attestations(
```

ہم تصدیقات تلاش کر رہے ہیں۔

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

ہمیں جو تصدیقات درکار ہیں وہ ہمارے اسکیما میں ہیں، جہاں وصول کنندہ `getAddress(ethAddr)` ہے۔ [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) فنکشن اس بات کو یقینی بناتا ہے کہ ہمارے پتہ کا [چیک سم (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) درست ہے۔ یہ ضروری ہے کیونکہ GraphQL کیس-حساس (case-significant) ہے۔ "<span dir="ltr">0xBAD060A7</span>"، "<span dir="ltr">0xBad060A7</span>"، اور "<span dir="ltr">0xbad060a7</span>" مختلف اقدار ہیں۔

```typescript
        take: 1
```

اس بات سے قطع نظر کہ ہمیں کتنی تصدیقات ملتی ہیں، ہمیں صرف پہلی والی چاہیے۔

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

وہ فیلڈز جو ہم وصول کرنا چاہتے ہیں۔

- `attester`: وہ پتہ جس نے تصدیق جمع کرائی۔ عام طور پر یہ فیصلہ کرنے کے لیے استعمال ہوتا ہے کہ آیا تصدیق پر اعتماد کیا جائے یا نہیں۔
- `id`: تصدیق کی <span dir="ltr">ID</span>۔ آپ اس قدر کو [آن چین تصدیق پڑھنے](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) کے لیے استعمال کر سکتے ہیں تاکہ یہ تصدیق کی جا سکے کہ GraphQL استفسار سے حاصل کردہ معلومات درست ہیں۔
- `data`: اسکیما کا ڈیٹا (اس صورت میں، ای میل پتہ)۔

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

اگر کوئی تصدیق نہیں ہے، تو ایک ایسی قدر واپس کریں جو واضح طور پر غلط ہو، لیکن جو سروس فراہم کنندہ کو درست معلوم ہو۔

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

اگر کوئی قدر موجود ہے، تو ڈیٹا کو ڈی کوڈ کرنے کے لیے `decodeData` کا استعمال کریں۔ ہمیں اس کے فراہم کردہ میٹا ڈیٹا کی ضرورت نہیں ہے، صرف قدر کی ضرورت ہے۔

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

ای میل پتہ حاصل کرنے کے لیے نیا فنکشن استعمال کریں۔

## لامرکزیت کے بارے میں کیا خیال ہے؟ {#what-about-decentralization}

اس کنفیگریشن میں صارفین وہ ہونے کا دکھاوا نہیں کر سکتے جو وہ نہیں ہیں، جب تک کہ ہم ایتھیریم سے ای میل پتہ کی میپنگ کے لیے قابل اعتماد تصدیق کنندگان پر انحصار کرتے ہیں۔ تاہم، ہمارا شناختی فراہم کنندہ اب بھی ایک مرکزی جزو ہے۔ جس کے پاس بھی شناختی فراہم کنندہ کی نجی کلید ہے وہ سروس فراہم کنندہ کو غلط معلومات بھیج سکتا ہے۔

[ملٹی پارٹی کمپیوٹیشن (<span dir="ltr">MPC</span>)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) کا استعمال کرتے ہوئے اس کا کوئی حل ہو سکتا ہے۔ مجھے امید ہے کہ میں مستقبل کے کسی ٹیوٹوریل میں اس کے بارے میں لکھوں گا۔

## نتیجہ {#conclusion}

لاگ آن معیار کو اپنانے، جیسے کہ ایتھیریم دستخط، کو مرغی اور انڈے کے مسئلے کا سامنا ہے۔ سروس فراہم کنندگان وسیع ترین ممکنہ مارکیٹ کو راغب کرنا چاہتے ہیں۔ صارفین چاہتے ہیں کہ وہ اپنے لاگ آن معیار کو سپورٹ کرنے کی فکر کیے بغیر خدمات تک رسائی حاصل کر سکیں۔
ایڈاپٹرز بنانا، جیسے کہ ایک ایتھیریم <span dir="ltr">IdP</span>، ہمیں اس رکاوٹ پر قابو پانے میں مدد کر سکتا ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔