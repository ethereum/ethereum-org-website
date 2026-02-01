---
title: "ویب 2 کی توثیق کے لیے ایتھیریم کا استعمال"
description: "اس ٹیوٹوریل کو پڑھنے کے بعد، ایک ڈیولپر ایتھیریم لاگ ان (ویب 3) کو SAML لاگ ان کے ساتھ مربوط کر سکے گا، جو ویب 2 میں سنگل سائن آن اور دیگر متعلقہ خدمات فراہم کرنے کے لیے استعمال ہونے والا ایک معیار ہے۔ یہ ویب 2 وسائل تک رسائی کی توثیق ایتھیریم دستخطوں کے ذریعے کرنے کی اجازت دیتا ہے، جس میں صارف کی خصوصیات تصدیق ناموں سے آتی ہیں۔"
author: "اوری پومیرانٹز"
tags: [ "ویب 2", "توثیق (Authentication)", "eas" ]
skill: beginner
lang: ur-in
published: 2025-04-30
---

## تعارف

[SAML](https://www.onelogin.com/learn/saml) ویب 2 پر استعمال ہونے والا ایک معیار ہے جو [شناختی فراہم کنندہ (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) کو [سروس فراہم کنندگان (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) کے لیے صارف کی معلومات فراہم کرنے کی اجازت دیتا ہے۔

اس ٹیوٹوریل میں آپ سیکھیں گے کہ ایتھیریم دستخطوں کو SAML کے ساتھ کیسے مربوط کیا جائے تاکہ صارفین اپنے ایتھیریم والیٹس کا استعمال ان ویب 2 خدمات کے لیے خود کی توثیق کر سکیں جو ابھی تک مقامی طور پر ایتھیریم کو سپورٹ نہیں کرتی ہیں۔

نوٹ کریں کہ یہ ٹیوٹوریل دو الگ الگ سامعین کے لیے لکھا گیا ہے:

- ایتھیریم کے لوگ جو ایتھیریم کو سمجھتے ہیں اور انہیں SAML سیکھنے کی ضرورت ہے۔
- ویب 2 کے لوگ جو SAML اور ویب 2 کی توثیق کو سمجھتے ہیں اور انہیں ایتھیریم سیکھنے کی ضرورت ہے۔

نتیجتاً، اس میں بہت سارا تعارفی مواد ہوگا جو آپ پہلے سے جانتے ہیں۔ بلا جھجھک اسے چھوڑ دیں۔

### ایتھیریم کے لوگوں کے لیے SAML

SAML ایک مرکزی پروٹوکول ہے۔ ایک سروس فراہم کنندہ (SP) صرف ایک شناختی فراہم کنندہ (IdP) سے دعوے (جیسے "یہ میرا صارف جان ہے، اس کے پاس A، B اور C کرنے کی اجازت ہونی چاہیے") قبول کرتا ہے اگر اس کے ساتھ پہلے سے موجود اعتماد کا رشتہ ہو، یا اس [سرٹیفکیٹ اتھارٹی](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) کے ساتھ جس نے اس IdP کے سرٹیفکیٹ پر دستخط کیے ہیں۔

مثال کے طور پر، SP ایک ٹریول ایجنسی ہو سکتی ہے جو کمپنیوں کو سفری خدمات فراہم کرتی ہے، اور IdP کمپنی کی اندرونی ویب سائٹ ہو سکتی ہے۔ جب ملازمین کو کاروباری سفر بک کرنے کی ضرورت ہوتی ہے، تو ٹریول ایجنسی انہیں اصل میں سفر بک کرنے کی اجازت دینے سے پہلے کمپنی کے ذریعے توثیق کے لیے بھیجتی ہے۔

![مرحلہ وار SAML عمل](./fig-01-saml.png)

یہ وہ طریقہ ہے جس سے تینوں ادارے، براؤزر، SP، اور IdP، رسائی کے لیے گفت و شنید کرتے ہیں۔ SP کو براؤزر استعمال کرنے والے صارف کے بارے میں پہلے سے کچھ جاننے کی ضرورت نہیں، صرف IdP پر بھروسہ کرنے کی ضرورت ہے۔

### SAML کے لوگوں کے لیے ایتھیریم

ایتھیریم ایک غیر مرکزی نظام ہے۔

![ایتھیریم لاگ آن](./fig-02-eth-logon.png)

صارفین کے پاس ایک نجی کلید ہوتی ہے (عام طور پر براؤزر ایکسٹینشن میں رکھی جاتی ہے)۔ نجی کلید سے آپ ایک عوامی کلید، اور اس سے 20 بائٹ کا پتہ اخذ کر سکتے ہیں۔ جب صارفین کو کسی سسٹم میں لاگ ان کرنے کی ضرورت ہوتی ہے، تو ان سے نانس (ایک بار استعمال ہونے والی قدر) کے ساتھ ایک پیغام پر دستخط کرنے کی درخواست کی جاتی ہے۔ سرور اس بات کی تصدیق کر سکتا ہے کہ دستخط اسی پتے سے بنایا گیا تھا۔

![تصدیق ناموں سے اضافی ڈیٹا حاصل کرنا](./fig-03-eas-data.png)

دستخط صرف ایتھیریم پتے کی تصدیق کرتا ہے۔ دیگر صارف صفات حاصل کرنے کے لیے، آپ عام طور پر [تصدیق نامے](https://attest.org/) استعمال کرتے ہیں۔ ایک تصدیق نامے میں عام طور پر یہ فیلڈز ہوتے ہیں:

- **تصدیق کنندہ**، وہ پتہ جس نے تصدیق کی
- **وصول کنندہ**، وہ پتہ جس پر تصدیق کا اطلاق ہوتا ہے
- **ڈیٹا**، وہ ڈیٹا جس کی تصدیق کی جا رہی ہے، جیسے نام، اجازتیں وغیرہ۔
- **اسکیما**، ڈیٹا کی تشریح کے لیے استعمال ہونے والے اسکیما کی آئی ڈی۔

ایتھیریم کی غیر مرکزی نوعیت کی وجہ سے، کوئی بھی صارف تصدیق نامے بنا سکتا ہے۔ تصدیق کنندہ کی شناخت اس بات کی نشاندہی کرنے کے لیے اہم ہے کہ ہم کن تصدیق ناموں کو قابل اعتماد سمجھتے ہیں۔

## سیٹ اپ

پہلا قدم ایک SAML SP اور ایک SAML IdP کا ہونا ہے جو آپس میں مواصلت کر رہے ہوں۔

1. سافٹ ویئر ڈاؤن لوڈ کریں۔ اس مضمون کے لیے نمونہ سافٹ ویئر [گٹ ہب پر](https://github.com/qbzzt/250420-saml-ethereum) ہے۔ مختلف مراحل مختلف برانچوں میں محفوظ ہیں، اس مرحلے کے لیے آپ کو `saml-only` چاہیے۔

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. خود دستخط شدہ سرٹیفکیٹس کے ساتھ کلیدیں بنائیں۔ اس کا مطلب ہے کہ کلید خود اپنی سرٹیفکیٹ اتھارٹی ہے، اور اسے دستی طور پر سروس فراہم کنندہ میں درآمد کرنے کی ضرورت ہے۔ مزید معلومات کے لیے [OpenSSL دستاویزات](https://docs.openssl.org/master/man1/openssl-req/) دیکھیں۔

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. سرورز (SP اور IdP دونوں) شروع کریں

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/) پر SP پر براؤز کریں اور IdP (پورٹ 3001) پر ری ڈائریکٹ ہونے کے لیے بٹن پر کلک کریں۔

5. IdP کو اپنا ای میل پتہ فراہم کریں اور **سروس فراہم کنندہ میں لاگ ان کریں** پر کلک کریں۔ دیکھیں کہ آپ کو سروس فراہم کنندہ (پورٹ 3000) پر واپس ری ڈائریکٹ کر دیا گیا ہے اور یہ آپ کو آپ کے ای میل پتے سے جانتا ہے۔

### تفصیلی وضاحت

یہ ہے جو ہوتا ہے، مرحلہ وار:

![ایتھیریم کے بغیر عام SAML لاگ آن](./fig-04-saml-no-eth.png)

#### src/config.mts

اس فائل میں شناختی فراہم کنندہ اور سروس فراہم کنندہ دونوں کے لیے کنفیگریشن موجود ہے۔ عام طور پر یہ دونوں مختلف ادارے ہوں گے، لیکن یہاں ہم سادگی کے لیے کوڈ شیئر کر سکتے ہیں۔

```typescript
const fs = await import("fs")

const protocol="http"
```

ابھی کے لیے ہم صرف ٹیسٹ کر رہے ہیں، لہذا HTTP استعمال کرنا ٹھیک ہے۔

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

عوامی کلیدیں پڑھیں، جو عام طور پر دونوں اجزاء کے لیے دستیاب ہوتی ہیں (اور یا تو براہ راست قابل اعتماد ہوتی ہیں، یا کسی قابل اعتماد سرٹیفکیٹ اتھارٹی کے ذریعے دستخط شدہ ہوتی ہیں)۔

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

دونوں اجزاء کے لیے URLs۔

```typescript
export const spPublicData = {
```

سروس فراہم کنندہ کے لیے عوامی ڈیٹا۔

```typescript
    entityID: `${spUrl}/metadata`,
```

روایت کے مطابق، SAML میں `entityID` وہ URL ہے جہاں ادارے کا میٹا ڈیٹا دستیاب ہوتا ہے۔ یہ میٹا ڈیٹا یہاں عوامی ڈیٹا سے مطابقت رکھتا ہے، سوائے اس کے کہ یہ XML فارم میں ہے۔

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

ہمارے مقاصد کے لیے سب سے اہم تعریف `assertionConsumerServer` ہے۔ اس کا مطلب ہے کہ سروس فراہم کنندہ کو کسی چیز کا دعویٰ کرنے کے لیے (مثال کے طور پر، "یہ معلومات بھیجنے والا صارف somebody@example.com ہے") ہمیں URL `http://localhost:3000/sp/assertion` پر [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) استعمال کرنے کی ضرورت ہے۔

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

شناختی فراہم کنندہ کے لیے عوامی ڈیٹا اسی طرح کا ہے۔ یہ بتاتا ہے کہ کسی صارف کو لاگ ان کرنے کے لیے آپ `http://localhost:3001/idp/login` پر POST کرتے ہیں اور کسی صارف کو لاگ آؤٹ کرنے کے لیے آپ `http://localhost:3001/idp/logout` پر POST کرتے ہیں۔

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

`samlify` لائبریری ایک پیکیج سے یہ توثیق کرنے کی توقع کرتی ہے کہ XML درست ہے، متوقع عوامی کلید کے ساتھ دستخط شدہ ہے، وغیرہ۔ ہم اس مقصد کے لیے [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) کا استعمال کرتے ہیں۔

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

ایک [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) ایک "چھوٹی ویب سائٹ" ہے جسے کسی ویب سائٹ کے اندر نصب کیا جا سکتا ہے۔ اس معاملے میں، ہم اسے تمام سروس فراہم کنندہ کی تعریفوں کو ایک ساتھ گروپ کرنے کے لیے استعمال کرتے ہیں۔

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

سروس فراہم کنندہ کی اپنی نمائندگی تمام عوامی ڈیٹا، اور وہ نجی کلید ہے جسے وہ معلومات پر دستخط کرنے کے لیے استعمال کرتا ہے۔

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

عوامی ڈیٹا میں وہ سب کچھ ہوتا ہے جو سروس فراہم کنندہ کو شناختی فراہم کنندہ کے بارے میں جاننے کی ضرورت ہوتی ہے۔

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

دیگر SAML اجزاء کے ساتھ باہمی تعاون کو فعال کرنے کے لیے، سروس اور شناختی فراہم کنندگان کو اپنا عوامی ڈیٹا (جسے میٹا ڈیٹا کہا جاتا ہے) `/metadata` میں XML فارمیٹ میں دستیاب ہونا چاہیے۔

```typescript
spRouter.post(`/assertion`,
```

یہ وہ صفحہ ہے جس تک براؤزر اپنی شناخت کے لیے رسائی حاصل کرتا ہے۔ دعویٰ میں صارف کا شناخت کنندہ (یہاں ہم ای میل پتہ استعمال کرتے ہیں) شامل ہوتا ہے، اور اس میں اضافی صفات بھی شامل ہو سکتی ہیں۔ یہ اوپر کے ترتیب وار خاکے میں مرحلہ 7 کے لیے ہینڈلر ہے۔

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

آپ دعوے میں فراہم کردہ XML ڈیٹا دیکھنے کے لیے کمنٹ آؤٹ کمانڈ کا استعمال کر سکتے ہیں۔ یہ [بیس 64 انکوڈڈ](https://en.wikipedia.org/wiki/Base64) ہے۔

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

شناختی سرور سے لاگ ان کی درخواست کو پارس کریں۔

```typescript
      res.send(`
        <html>
          <body>
            <h2>ہیلو ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

ایک HTML جواب بھیجیں، صرف صارف کو یہ دکھانے کے لیے کہ ہمیں لاگ ان مل گیا ہے۔

```typescript
    } catch (err) {
      console.error('SAML جواب پر کارروائی کرنے میں خرابی:', err);
      res.status(400).send('SAML توثیق ناکام');
    }
  }
)
```

ناکامی کی صورت میں صارف کو مطلع کریں۔

```typescript
spRouter.get('/login',
```

جب براؤزر اس صفحے کو حاصل کرنے کی کوشش کرتا ہے تو ایک لاگ ان درخواست بنائیں۔ یہ اوپر کے ترتیب وار خاکے میں مرحلہ 1 کے لیے ہینڈلر ہے۔

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

یہ صفحہ خود بخود فارم (نیچے دیکھیں) جمع کراتا ہے۔ اس طرح صارف کو ری ڈائریکٹ ہونے کے لیے کچھ کرنے کی ضرورت نہیں ہے۔ یہ اوپر کے ترتیب وار خاکے میں مرحلہ 2 ہے۔

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (شناختی فراہم کنندہ کے اینڈ پوائنٹ کا URL) پر پوسٹ کریں۔

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ان پٹ کا نام `loginRequest.type` (`SAMLRequest`) ہے۔ اس فیلڈ کا مواد `loginRequest.context` ہے، جو دوبارہ XML ہے جو بیس 64 انکوڈڈ ہے۔

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[یہ مڈل ویئر](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP درخواست](https://www.tutorialspoint.com/http/http_requests.htm) کی باڈی کو پڑھتا ہے۔ پہلے سے طے شدہ طور پر express اسے نظر انداز کرتا ہے، کیونکہ زیادہ تر درخواستوں کو اس کی ضرورت نہیں ہوتی۔ ہمیں اس کی ضرورت ہے کیونکہ POST باڈی کا استعمال کرتا ہے۔

```typescript
app.use(`/${config.spDir}`, spRouter)
```

راؤٹر کو سروس فراہم کنندہ ڈائرکٹری (`/sp`) میں نصب کریں۔

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           لاگ آن کرنے کے لیے یہاں کلک کریں
        </button>
      </body>
    </html>
  `)
})
```

اگر کوئی براؤزر روٹ ڈائرکٹری حاصل کرنے کی کوشش کرتا ہے، تو اسے لاگ ان صفحہ کا ایک لنک فراہم کریں۔

```typescript
app.listen(config.spPort, () => {
  console.log(`سروس فراہم کنندہ http://${config.spHostname}:${config.spPort} پر چل رہا ہے`)
})
```

اس express ایپلیکیشن کے ساتھ `spPort` کو سنیں۔

#### src/idp.mts

یہ شناختی فراہم کنندہ ہے۔ یہ سروس فراہم کنندہ سے بہت ملتا جلتا ہے، نیچے دی گئی وضاحتیں ان حصوں کے لیے ہیں جو مختلف ہیں۔

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // صفات کو محفوظ رکھیں
    attributeNamePrefix: "@_", // صفات کے لیے سابقہ
  }
)
```

ہمیں سروس فراہم کنندہ سے موصول ہونے والی XML درخواست کو پڑھنے اور سمجھنے کی ضرورت ہے۔

```typescript
const getLoginPage = requestId => `
```

یہ فنکشن خودکار طور پر جمع کردہ فارم کے ساتھ صفحہ بناتا ہے جو اوپر کے ترتیب وار خاکے کے مرحلہ 4 میں واپس آتا ہے۔

```typescript
<html>
  <head>
    <title>لاگ ان صفحہ</title>
  </head>
  <body>
    <h2>لاگ ان صفحہ</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      ای میل پتہ: <input name="email" />
      <br />
      <button type="Submit">
        سروس فراہم کنندہ میں لاگ ان کریں
      </button>
```

دو فیلڈز ہیں جو ہم سروس فراہم کنندہ کو بھیجتے ہیں:

1. وہ `requestId` جس کا ہم جواب دے رہے ہیں۔
2. صارف کا شناخت کنندہ (ہم ابھی کے لیے صارف کا فراہم کردہ ای میل پتہ استعمال کرتے ہیں)۔

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

یہ اوپر کے ترتیب وار خاکے کے مرحلہ 5 کے لیے ہینڈلر ہے۔ [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) لاگ ان جواب بناتا ہے۔

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

سامعین سروس فراہم کنندہ ہے۔

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

درخواست سے نکالی گئی معلومات۔ درخواست میں جس ایک پیرامیٹر کا ہم خیال رکھتے ہیں وہ requestId ہے، جو سروس فراہم کنندہ کو درخواستوں اور ان کے جوابات کو ملانے دیتا ہے۔

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // دستخط کو یقینی بنائیں
```

جواب پر دستخط کرنے کے لیے ڈیٹا رکھنے کے لیے ہمیں `signingKey` کی ضرورت ہے۔ سروس فراہم کنندہ غیر دستخط شدہ درخواستوں پر بھروسہ نہیں کرتا ہے۔

```typescript
    },
    "post",
    {
      email: req.body.email
```

یہ صارف کی معلومات کے ساتھ وہ فیلڈ ہے جسے ہم سروس فراہم کنندہ کو واپس بھیجتے ہیں۔

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

دوبارہ، ایک خودکار طور پر جمع کردہ فارم استعمال کریں۔ یہ اوپر کے ترتیب وار خاکے کا مرحلہ 6 ہے۔

```typescript

// لاگ ان درخواستوں کے لیے IdP اینڈ پوائنٹ
idpRouter.post(`/login`,
```

یہ وہ اینڈ پوائنٹ ہے جو سروس فراہم کنندہ سے لاگ ان کی درخواست وصول کرتا ہے۔ یہ اوپر کے ترتیب وار خاکے کے مرحلہ 3 کا ہینڈلر ہے۔

```typescript
  async (req, res) => {
    try {
      // ورک اراؤنڈ کیونکہ میں parseLoginRequest کو کام کرنے پر مجبور نہیں کر سکا۔
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

ہمیں توثیق کی درخواست کی آئی ڈی کو پڑھنے کے لیے [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) کا استعمال کرنے کے قابل ہونا چاہیے۔ تاہم، میں اسے کام کرنے پر مجبور نہیں کر سکا اور اس پر زیادہ وقت صرف کرنا مناسب نہیں تھا، لہذا میں نے صرف ایک [عام مقصد کے XML پارسر](https://www.npmjs.com/package/fast-xml-parser) کا استعمال کیا۔ ہمیں جس معلومات کی ضرورت ہے وہ `<samlp:AuthnRequest>` ٹیگ کے اندر `ID` کی صفت ہے، جو XML کی اعلیٰ سطح پر ہے۔

## ایتھیریم دستخطوں کا استعمال

اب جب کہ ہم صارف کی شناخت سروس فراہم کنندہ کو بھیج سکتے ہیں، اگلا قدم صارف کی شناخت کو قابل اعتماد طریقے سے حاصل کرنا ہے۔ Viem ہمیں صرف والیٹ سے صارف کا پتہ پوچھنے کی اجازت دیتا ہے، لیکن اس کا مطلب ہے براؤزر سے معلومات مانگنا۔ ہم براؤزر کو کنٹرول نہیں کرتے ہیں، لہذا ہم اس سے ملنے والے جواب پر خود بخود بھروسہ نہیں کر سکتے۔

اس کے بجائے، IdP براؤزر کو دستخط کرنے کے لیے ایک سٹرنگ بھیجے گا۔ اگر براؤزر میں موجود والیٹ اس سٹرنگ پر دستخط کرتا ہے، تو اس کا مطلب ہے کہ یہ واقعی وہی پتہ ہے (یعنی، یہ اس پتے سے مطابقت رکھنے والی نجی کلید کو جانتا ہے)۔

اسے عملی طور پر دیکھنے کے لیے، موجودہ IdP اور SP کو روکیں اور یہ کمانڈز چلائیں:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

پھر [SP پر](http://localhost:3000) براؤز کریں اور ہدایات پر عمل کریں۔

نوٹ کریں کہ اس مقام پر ہم نہیں جانتے کہ ایتھیریم پتے سے ای میل پتہ کیسے حاصل کیا جائے، لہذا اس کے بجائے ہم SP کو `<ethereum address>@bad.email.address` کی اطلاع دیتے ہیں۔

### تفصیلی وضاحت

تبدیلیاں پچھلے خاکے میں مرحلہ 4-5 میں ہیں۔

![ایتھیریم دستخط کے ساتھ SAML](./fig-05-saml-w-signature.png)

ہم نے جو واحد فائل تبدیل کی ہے وہ `idp.mts` ہے۔ یہاں تبدیل شدہ حصے ہیں۔

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

ہمیں ان دو اضافی لائبریریوں کی ضرورت ہے۔ ہم [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) کی قدر بنانے کے لیے [`uuid`](https://www.npmjs.com/package/uuid) کا استعمال کرتے ہیں۔ قدر خود کوئی معنی نہیں رکھتی، صرف یہ حقیقت کہ یہ صرف ایک بار استعمال ہوتی ہے۔

[`viem`](https://viem.sh/) لائبریری ہمیں ایتھیریم کی تعریفیں استعمال کرنے دیتی ہے۔ یہاں ہمیں اس کی تصدیق کرنے کی ضرورت ہے کہ دستخط واقعی درست ہے۔

```typescript
const loginPrompt = "سروس فراہم کنندہ تک رسائی حاصل کرنے کے لیے، اس نانس پر دستخط کریں: "
```

والیٹ صارف سے پیغام پر دستخط کرنے کی اجازت مانگتا ہے۔ ایک پیغام جو صرف ایک نانس ہو صارفین کو الجھا سکتا ہے، لہذا ہم اس پرامپٹ کو شامل کرتے ہیں۔

```typescript
// requestIDs یہاں رکھیں
let nonces = {}
```

ہمیں درخواست کی معلومات کی ضرورت ہے تاکہ ہم اس کا جواب دے سکیں۔ ہم اسے درخواست کے ساتھ بھیج سکتے ہیں (مرحلہ 4)، اور اسے واپس وصول کر سکتے ہیں (مرحلہ 5)۔ تاہم، ہم براؤزر سے ملنے والی معلومات پر بھروسہ نہیں کر سکتے، جو ایک ممکنہ طور پر مخالف صارف کے کنٹرول میں ہے۔ لہذا اسے یہاں محفوظ کرنا بہتر ہے، نانس کو کلید کے طور پر استعمال کرتے ہوئے۔

نوٹ کریں کہ ہم سادگی کی خاطر اسے یہاں ایک متغیر کے طور پر کر رہے ہیں۔ تاہم، اس کے کئی نقصانات ہیں:

- ہم سروس سے انکار کے حملے کا شکار ہیں۔ ایک بدنیتی پر مبنی صارف متعدد بار لاگ آن کرنے کی کوشش کر سکتا ہے، جس سے ہماری میموری بھر جائے گی۔
- اگر IdP کے عمل کو دوبارہ شروع کرنے کی ضرورت پڑی تو، ہم موجودہ قدروں کو کھو دیں گے۔
- ہم متعدد پروسیسز میں لوڈ بیلنس نہیں کر سکتے، کیونکہ ہر ایک کا اپنا متغیر ہوگا۔

پروڈکشن سسٹم پر ہم ڈیٹا بیس کا استعمال کریں گے اور کسی قسم کا میعاد ختم ہونے کا طریقہ کار نافذ کریں گے۔

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

ایک نانس بنائیں، اور مستقبل میں استعمال کے لیے `requestId` کو محفوظ کریں۔

```typescript
  return `
<html>
  <head>
    <script type="module">
```

یہ جاوا اسکرپٹ صفحہ لوڈ ہونے پر خود بخود عمل میں آ جاتا ہے۔

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

ہمیں `viem` سے کئی فنکشنز کی ضرورت ہے۔

```typescript
      if (!window.ethereum) {
          alert("براہ کرم MetaMask یا ایک ہم آہنگ والیٹ انسٹال کریں اور پھر دوبارہ لوڈ کریں")
      }
```

ہم صرف اس صورت میں کام کر سکتے ہیں جب براؤزر پر کوئی والیٹ موجود ہو۔

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

والیٹ (`window.ethereum`) سے اکاؤنٹس کی فہرست کی درخواست کریں۔ فرض کریں کہ کم از کم ایک ہے، اور صرف پہلے کو محفوظ کریں۔

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

براؤزر والیٹ کے ساتھ تعامل کے لیے ایک [والیٹ کلائنٹ](https://viem.sh/docs/clients/wallet) بنائیں۔

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

صارف سے پیغام پر دستخط کرنے کو کہیں۔ چونکہ یہ پورا HTML ایک [ٹیمپلیٹ سٹرنگ](https://viem.sh/docs/clients/wallet) میں ہے، ہم idp پروسیس میں بیان کردہ متغیرات کا استعمال کر سکتے ہیں۔ یہ ترتیب وار خاکے میں مرحلہ 4.5 ہے۔

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` پر ری ڈائریکٹ کریں۔ یہ ترتیب وار خاکے میں مرحلہ 5 ہے۔

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

دستخط براؤزر کے ذریعے واپس بھیجا جاتا ہے، جو ممکنہ طور پر بدنیتی پر مبنی ہو سکتا ہے (آپ کو براؤزر میں `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` کھولنے سے کوئی نہیں روک سکتا)۔ لہذا، یہ تصدیق کرنا ضروری ہے کہ IdP کا عمل خراب دستخطوں کو صحیح طریقے سے سنبھالتا ہے۔

```typescript
    </script>
  </head>
  <body>
    <h2>براہ کرم دستخط کریں</h2>
    <button onClick="window.goodSignature()">
      ایک اچھا (درست) دستخط جمع کروائیں
    </button>
    <br/>
    <button onClick="window.badSignature()">
      ایک خراب (غلط) دستخط جمع کروائیں
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

یہ ترتیب وار خاکے میں مرحلہ 5 کے لیے ہینڈلر ہے۔

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("خراب نانس")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

درخواست کی آئی ڈی حاصل کریں، اور `nonces` سے نانس کو حذف کریں تاکہ یہ یقینی بنایا جا سکے کہ اسے دوبارہ استعمال نہیں کیا جا سکتا۔

```typescript
  try {
```

چونکہ دستخط کے غلط ہونے کے بہت سے طریقے ہیں، ہم اسے ایک `try ...` میں لپیٹتے ہیں۔ کسی بھی پھینکی گئی غلطیوں کو پکڑنے کے لیے `catch` بلاک۔

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

ترتیب وار خاکے میں مرحلہ 5.5 کو نافذ کرنے کے لیے [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) کا استعمال کریں۔

```typescript
    if (!validSignature)
      throw("خراب دستخط")
  } catch (err) {
    res.send("خرابی:" + err)
    return ;
  }
```

ہینڈلر کا بقیہ حصہ اس کے برابر ہے جو ہم نے پہلے `/loginSubmitted` ہینڈلر میں کیا ہے، سوائے ایک چھوٹی سی تبدیلی کے۔

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

ہمارے پاس اصل ای میل پتہ نہیں ہے (ہم اسے اگلے حصے میں حاصل کریں گے)، لہذا ابھی کے لیے ہم ایتھیریم پتہ واپس کرتے ہیں اور اسے واضح طور پر ای میل پتے کے طور پر نشان زد نہیں کرتے ہیں۔

```typescript
// لاگ ان درخواستوں کے لیے IdP اینڈ پوائنٹ
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // ورک اراؤنڈ کیونکہ میں parseLoginRequest کو کام کرنے پر مجبور نہیں کر سکا۔
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('SAML جواب پر کارروائی کرنے میں خرابی:', err);
      res.status(400).send('SAML توثیق ناکام');
    }
  }
)
```

مرحلہ 3 کے ہینڈلر میں `getLoginPage` کی بجائے اب `getSignaturePage` کا استعمال کریں۔

## ای میل پتہ حاصل کرنا

اگلا قدم ای میل پتہ حاصل کرنا ہے، جو سروس فراہم کنندہ کی طرف سے درخواست کردہ شناخت کنندہ ہے۔ ایسا کرنے کے لیے، ہم [ایتھیریم تصدیقی سروس (EAS)](https://attest.org/) کا استعمال کرتے ہیں۔

تصدیق نامے حاصل کرنے کا سب سے آسان طریقہ [GraphQL API](https://docs.attest.org/docs/developer-tools/api) کا استعمال کرنا ہے۔ ہم اس استفسار کا استعمال کرتے ہیں:

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

اس [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) میں صرف ایک ای میل پتہ شامل ہے۔ یہ استفسار اس اسکیما کے تصدیق ناموں کی درخواست کرتا ہے۔ تصدیق نامے کا موضوع `recipient` کہلاتا ہے۔ یہ ہمیشہ ایک ایتھیریم پتہ ہوتا ہے۔

انتباہ: جس طرح سے ہم یہاں تصدیق نامے حاصل کر رہے ہیں اس میں دو حفاظتی مسائل ہیں۔

- ہم API اینڈ پوائنٹ، `https://optimism.easscan.org/graphql` پر جا رہے ہیں، جو ایک مرکزی جزو ہے۔ ہم `id` صفت حاصل کر سکتے ہیں اور پھر آن چین پر ایک تلاش کر کے تصدیق کر سکتے ہیں کہ تصدیق نامہ حقیقی ہے، لیکن API اینڈ پوائنٹ اب بھی ہمیں ان کے بارے میں نہ بتا کر تصدیق ناموں کو سنسر کر سکتا ہے۔

  یہ مسئلہ حل کرنا ناممکن نہیں ہے، ہم اپنا GraphQL اینڈ پوائنٹ چلا سکتے ہیں اور چین لاگز سے تصدیق نامے حاصل کر سکتے ہیں، لیکن یہ ہمارے مقاصد کے لیے ضرورت سے زیادہ ہے۔

- ہم تصدیق کنندہ کی شناخت کو نہیں دیکھتے ہیں۔ کوئی بھی ہمیں غلط معلومات فراہم کر سکتا ہے۔ ایک حقیقی دنیا کے نفاذ میں ہمارے پاس قابل اعتماد تصدیق کنندگان کا ایک سیٹ ہوگا اور ہم صرف ان کے تصدیق ناموں کو دیکھیں گے۔

اسے عملی طور پر دیکھنے کے لیے، موجودہ IdP اور SP کو روکیں اور یہ کمانڈز چلائیں:

```sh
git checkout email-address
pnpm install
pnpm start
```

پھر اپنا ای میل پتہ فراہم کریں۔ ایسا کرنے کے آپ کے پاس دو طریقے ہیں:

- ایک نجی کلید کا استعمال کرتے ہوئے ایک والیٹ درآمد کریں، اور ٹیسٹنگ نجی کلید `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` کا استعمال کریں۔

- اپنے ای میل پتے کے لیے ایک تصدیق نامہ شامل کریں:

  1. تصدیق ایکسپلورر میں [اسکیما پر](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) براؤز کریں۔

  2. **اسکیما کے ساتھ تصدیق کریں** پر کلک کریں۔

  3. وصول کنندہ کے طور پر اپنا ایتھیریم پتہ، ای میل پتے کے طور پر اپنا ای میل پتہ درج کریں، اور **آن چین** منتخب کریں۔ پھر **تصدیق نامہ بنائیں** پر کلک کریں۔

  4. اپنے والیٹ میں ٹرانزیکشن کی منظوری دیں۔ گیس کی ادائیگی کے لیے آپ کو [آپٹیمزم بلاک چین](https://app.optimism.io/bridge/deposit) پر کچھ ETH کی ضرورت ہوگی۔

کسی بھی طرح، اس کے بعد [http://localhost:3000](http://localhost:3000) پر براؤز کریں اور ہدایات پر عمل کریں۔ اگر آپ نے ٹیسٹنگ نجی کلید درآمد کی ہے، تو آپ کو موصول ہونے والا ای میل `test_addr_0@example.com` ہے۔ اگر آپ نے اپنا پتہ استعمال کیا ہے، تو یہ وہی ہونا چاہیے جس کی آپ نے تصدیق کی ہے۔

### تفصیلی وضاحت

![ایتھیریم پتے سے ای میل تک پہنچنا](./fig-06-saml-sig-n-email.png)

نئے اقدامات GraphQL مواصلت، اقدامات 5.6 اور 5.7 ہیں۔

دوبارہ، یہاں `idp.mts` کے تبدیل شدہ حصے ہیں۔

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

ہمیں جن لائبریریوں کی ضرورت ہے انہیں درآمد کریں۔

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

ہر بلاک چین کے لیے [ایک الگ اینڈ پوائنٹ](https://docs.attest.org/docs/developer-tools/api) ہے۔

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

ایک نیا `GraphQLClient` کلائنٹ بنائیں جسے ہم اینڈ پوائنٹ سے استفسار کرنے کے لیے استعمال کر سکتے ہیں۔

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL ہمیں صرف بائٹس کے ساتھ ایک مبہم ڈیٹا آبجیکٹ دیتا ہے۔ اسے سمجھنے کے لیے ہمیں اسکیما کی ضرورت ہے۔

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

ایتھیریم پتے سے ای میل پتے تک پہنچنے کا ایک فنکشن۔

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

یہ ایک GraphQL استفسار ہے۔

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

ہم جو تصدیق نامے چاہتے ہیں وہ ہمارے اسکیما میں ہیں، جہاں وصول کنندہ `getAddress(ethAddr)` ہے۔ [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) فنکشن اس بات کو یقینی بناتا ہے کہ ہمارے پتے کا [چیک سم](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) درست ہے۔ یہ ضروری ہے کیونکہ GraphQL کیس-اہم ہے۔ "0xBAD060A7"، "0xBad060A7"، اور "0xbad060a7" مختلف قدریں ہیں۔

```typescript
        take: 1
```

ہمیں کتنے ہی تصدیق نامے ملیں، ہم صرف پہلا چاہتے ہیں۔

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

ہم جو فیلڈز وصول کرنا چاہتے ہیں۔

- `attester`: وہ پتہ جس نے تصدیق نامہ جمع کرایا۔ عام طور پر اس کا استعمال یہ فیصلہ کرنے کے لیے کیا جاتا ہے کہ آیا تصدیق نامے پر بھروسہ کرنا ہے یا نہیں۔
- `id`: تصدیق نامہ آئی ڈی۔ آپ اس قدر کا استعمال [آن چین پر تصدیق نامہ پڑھنے](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) کے لیے کر سکتے ہیں تاکہ یہ تصدیق کی جا سکے کہ GraphQL استفسار سے ملنے والی معلومات درست ہے۔
- `data`: اسکیما ڈیٹا (اس معاملے میں، ای میل پتہ)۔

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

اگر کوئی قدر ہے، تو ڈیٹا کو ڈی کوڈ کرنے کے لیے `decodeData` کا استعمال کریں۔ ہمیں اس کے فراہم کردہ میٹا ڈیٹا کی ضرورت نہیں، صرف قدر خود۔

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

ای میل پتہ حاصل کرنے کے لیے نئے فنکشن کا استعمال کریں۔

## غیر مرکزیت کے بارے میں کیا خیال ہے؟

اس ترتیب میں صارفین وہ شخص ہونے کا بہانہ نہیں کر سکتے جو وہ نہیں ہیں، جب تک کہ ہم ایتھیریم سے ای میل پتے کی میپنگ کے لیے قابل اعتماد تصدیق کنندگان پر انحصار کرتے ہیں۔ تاہم، ہمارا شناختی فراہم کنندہ اب بھی ایک مرکزی جزو ہے۔ جس کے پاس بھی شناختی فراہم کنندہ کی نجی کلید ہے وہ سروس فراہم کنندہ کو غلط معلومات بھیج سکتا ہے۔

[ملٹی پارٹی کمپیوٹیشن (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) کا استعمال کرتے ہوئے ایک حل ہو سکتا ہے۔ مجھے امید ہے کہ مستقبل کے ٹیوٹوریل میں اس کے بارے میں لکھوں گا۔

## نتیجہ

لاگ آن معیار، جیسے ایتھیریم دستخط، کو اپنانے میں مرغی اور انڈے کا مسئلہ درپیش ہے۔ سروس فراہم کنندگان وسیع تر ممکنہ مارکیٹ کو اپیل کرنا چاہتے ہیں۔ صارفین اپنے لاگ آن معیار کی حمایت کے بارے میں فکر کیے بغیر خدمات تک رسائی حاصل کرنا چاہتے ہیں۔
اڈاپٹر بنانا، جیسے کہ ایتھیریم IdP، ہمیں اس رکاوٹ کو دور کرنے میں مدد کر سکتا ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
