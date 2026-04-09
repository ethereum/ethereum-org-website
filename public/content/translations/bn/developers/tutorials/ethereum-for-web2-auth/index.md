---
title: "ওয়েব2 অথেনটিকেশনের জন্য ইথিরিয়াম ব্যবহার করা"
description: "এই টিউটোরিয়ালটি পড়ার পর, একজন ডেভেলপার ইথিরিয়াম লগইন (ওয়েব3)-কে SAML লগইনের সাথে ইন্টিগ্রেট করতে পারবেন, যা ওয়েব2-তে সিঙ্গেল সাইন-অন এবং অন্যান্য সম্পর্কিত পরিষেবা প্রদানের জন্য ব্যবহৃত একটি স্ট্যান্ডার্ড। এটি ইথিরিয়াম সিগনেচারের মাধ্যমে ওয়েব2 রিসোর্সগুলোতে অ্যাক্সেস অথেনটিকেট করার অনুমতি দেয়, যেখানে ব্যবহারকারীর অ্যাট্রিবিউটগুলো এটেস্টেশন থেকে আসে।"
author: "ওরি পোমেরান্টজ"
tags: ["ওয়েব2", "অথেনটিকেশন", "eas"]
skill: beginner
breadcrumb: "ওয়েব2 অথেনটিকেশনের জন্য ইথিরিয়াম"
lang: bn
published: 2025-04-30
---

## Introduction {#introduction}

[SAML](https://www.onelogin.com/learn/saml) হলো ওয়েব2-তে ব্যবহৃত একটি স্ট্যান্ডার্ড যা একটি [আইডেন্টিটি প্রোভাইডার (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)-কে [সার্ভিস প্রোভাইডার (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML))-এর জন্য ব্যবহারকারীর তথ্য প্রদান করার অনুমতি দেয়।

এই টিউটোরিয়ালে আপনি শিখবেন কীভাবে ইথিরিয়াম সিগনেচারকে SAML-এর সাথে ইন্টিগ্রেট করতে হয়, যাতে ব্যবহারকারীরা তাদের ইথিরিয়াম ওয়ালেট ব্যবহার করে এমন ওয়েব2 পরিষেবাগুলোতে নিজেদের অথেনটিকেট করতে পারে যা এখনও নেটিভভাবে ইথিরিয়াম সমর্থন করে না।

মনে রাখবেন যে এই টিউটোরিয়ালটি দুটি আলাদা অডিয়েন্সের জন্য লেখা হয়েছে:

- ইথিরিয়ামের মানুষ যারা ইথিরিয়াম বোঝেন এবং তাদের SAML শেখা প্রয়োজন
- ওয়েব2-এর মানুষ যারা SAML এবং ওয়েব2 অথেনটিকেশন বোঝেন এবং তাদের ইথিরিয়াম শেখা প্রয়োজন

ফলস্বরূপ, এতে এমন অনেক প্রাথমিক বিষয় থাকবে যা আপনি হয়তো আগে থেকেই জানেন। আপনি চাইলে সেগুলো এড়িয়ে যেতে পারেন।

### SAML for Ethereum people {#saml-for-ethereum-people}

SAML হলো একটি সেন্ট্রালাইজড প্রটোকল। একটি সার্ভিস প্রোভাইডার (SP) শুধুমাত্র তখনই একটি আইডেন্টিটি প্রোভাইডার (IdP) থেকে অ্যাসারশন (যেমন "এই হলো আমার ব্যবহারকারী জন, তার A, B, এবং C করার অনুমতি থাকা উচিত") গ্রহণ করে যদি তার সাথে বা সেই IdP-এর সার্টিফিকেট সাইন করা [সার্টিফিকেট অথরিটি](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)-এর সাথে আগে থেকেই কোনো ট্রাস্ট সম্পর্ক থাকে।

উদাহরণস্বরূপ, SP হতে পারে একটি ট্রাভেল এজেন্সি যা কোম্পানিগুলোকে ভ্রমণ পরিষেবা প্রদান করে, এবং IdP হতে পারে একটি কোম্পানির অভ্যন্তরীণ ওয়েবসাইট। যখন কর্মীদের ব্যবসায়িক ভ্রমণের জন্য বুকিং করতে হয়, তখন ট্রাভেল এজেন্সি তাদের আসলে ভ্রমণ বুক করার অনুমতি দেওয়ার আগে কোম্পানির দ্বারা অথেনটিকেশনের জন্য পাঠায়।

![Step by step SAML process](./fig-01-saml.png)

এভাবেই তিনটি এনটিটি—ব্রাউজার, SP এবং IdP—অ্যাক্সেসের জন্য নেগোশিয়েট করে। SP-কে আগে থেকে ব্রাউজার ব্যবহারকারী সম্পর্কে কিছু জানার প্রয়োজন নেই, শুধু IdP-কে বিশ্বাস করলেই হয়।

### Ethereum for SAML people {#ethereum-for-saml-people}

ইথিরিয়াম হলো একটি ডিসেন্ট্রালাইজড সিস্টেম। 

![Ethereum logon](./fig-02-eth-logon.png)

ব্যবহারকারীদের একটি প্রাইভেট কি থাকে (সাধারণত একটি ব্রাউজার এক্সটেনশনে রাখা হয়)। প্রাইভেট কি থেকে আপনি একটি পাবলিক কি বের করতে পারেন, এবং তা থেকে একটি 20-বাইট এডড্রেস। যখন ব্যবহারকারীদের কোনো সিস্টেমে লগ ইন করতে হয়, তখন তাদের একটি নন্স (একবার ব্যবহারযোগ্য মান) সহ একটি মেসেজ সাইন করার অনুরোধ করা হয়। সার্ভার যাচাই করতে পারে যে সিগনেচারটি সেই এডড্রেস দ্বারা তৈরি করা হয়েছিল।

![Getting extra data from attestations](./fig-03-eas-data.png)

সিগনেচারটি শুধুমাত্র ইথিরিয়াম এডড্রেস যাচাই করে। অন্যান্য ব্যবহারকারীর অ্যাট্রিবিউট পেতে, আপনি সাধারণত [এটেস্টেশন](https://attest.org/) ব্যবহার করেন। একটি এটেস্টেশন-এ সাধারণত এই ফিল্ডগুলো থাকে:

- **Attestor**, যে এডড্রেস এটেস্টেশন তৈরি করেছে
- **Recipient**, যে এডড্রেস-এর উপর এটেস্টেশন প্রযোজ্য
- **Data**, যে ডেটা অ্যাটেস্ট করা হচ্ছে, যেমন নাম, অনুমতি ইত্যাদি।
- **Schema**, ডেটা ব্যাখ্যা করতে ব্যবহৃত স্কিমার আইডি।

ইথিরিয়ামের ডিসেন্ট্রালাইজড প্রকৃতির কারণে, যেকোনো ব্যবহারকারী এটেস্টেশন তৈরি করতে পারে। কোন এটেস্টেশন-গুলোকে আমরা নির্ভরযোগ্য বলে বিবেচনা করব তা চিহ্নিত করার জন্য অ্যাটেস্টরের পরিচয় গুরুত্বপূর্ণ।

## Setup {#setup}

প্রথম ধাপ হলো একটি SAML SP এবং একটি SAML IdP-এর মধ্যে যোগাযোগ স্থাপন করা।

1. সফটওয়্যারটি ডাউনলোড করুন। এই আর্টিকেলের জন্য নমুনা সফটওয়্যারটি [গিটহাবে](https://github.com/qbzzt/250420-saml-ethereum) রয়েছে। বিভিন্ন পর্যায়গুলো বিভিন্ন ব্রাঞ্চে সংরক্ষিত আছে, এই পর্যায়ের জন্য আপনার `saml-only` প্রয়োজন।

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. সেলফ-সাইন্ড সার্টিফিকেট সহ কি (keys) তৈরি করুন। এর মানে হলো কি-টি নিজেই তার নিজস্ব সার্টিফিকেট অথরিটি, এবং এটিকে ম্যানুয়ালি সার্ভিস প্রোভাইডারে ইমপোর্ট করতে হবে। আরও তথ্যের জন্য [OpenSSL ডক্স](https://docs.openssl.org/master/man1/openssl-req/) দেখুন। 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. সার্ভারগুলো চালু করুন (SP এবং IdP উভয়ই)

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/)-এ SP ব্রাউজ করুন এবং IdP (পোর্ট 3001)-তে রিডাইরেক্ট হওয়ার জন্য বোতামে ক্লিক করুন।

5. IdP-কে আপনার ইমেইল ঠিকানা প্রদান করুন এবং **Login to the service provider**-এ ক্লিক করুন। দেখুন যে আপনাকে আবার সার্ভিস প্রোভাইডারে (পোর্ট 3000) রিডাইরেক্ট করা হয়েছে এবং এটি আপনাকে আপনার ইমেইল ঠিকানা দ্বারা চিনতে পারছে।

### Detailed explanation {#detailed-explanation}

ধাপে ধাপে যা ঘটে তা হলো:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

এই ফাইলে আইডেন্টিটি প্রোভাইডার এবং সার্ভিস প্রোভাইডার উভয়ের জন্যই কনফিগারেশন রয়েছে। সাধারণত এই দুটি ভিন্ন এনটিটি হবে, কিন্তু এখানে আমরা সরলতার জন্য কোড শেয়ার করতে পারি।

```typescript
const fs = await import("fs")

const protocol="http"
```

আপাতত আমরা শুধু টেস্টিং করছি, তাই HTTP ব্যবহার করা ঠিক আছে।

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

পাবলিক কি-গুলো পড়ুন, যা সাধারণত উভয় কম্পোনেন্টের কাছেই উপলব্ধ থাকে (এবং সরাসরি বিশ্বস্ত, অথবা একটি বিশ্বস্ত সার্টিফিকেট অথরিটি দ্বারা সাইন করা)।

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

উভয় কম্পোনেন্টের জন্য URL-গুলো।

```typescript
export const spPublicData = {
```

সার্ভিস প্রোভাইডারের জন্য পাবলিক ডেটা।

```typescript
    entityID: `${spUrl}/metadata`,
```

প্রথা অনুযায়ী, SAML-এ `entityID` হলো সেই URL যেখানে এনটিটির মেটাডেটা পাওয়া যায়। এই মেটাডেটা এখানকার পাবলিক ডেটার সাথে মিলে যায়, তবে এটি XML ফর্মে থাকে।

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

আমাদের উদ্দেশ্যের জন্য সবচেয়ে গুরুত্বপূর্ণ সংজ্ঞা হলো `assertionConsumerServer`। এর মানে হলো সার্ভিস প্রোভাইডারের কাছে কিছু অ্যাসার্ট করতে (উদাহরণস্বরূপ, "যে ব্যবহারকারী আপনাকে এই তথ্য পাঠাচ্ছে সে হলো somebody@example.com") আমাদের URL `http://localhost:3000/sp/assertion`-এ [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) ব্যবহার করতে হবে।

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

আইডেন্টিটি প্রোভাইডারের পাবলিক ডেটাও একই রকম। এটি নির্দিষ্ট করে যে একজন ব্যবহারকারীকে লগ ইন করতে আপনাকে `http://localhost:3001/idp/login`-এ POST করতে হবে এবং লগ আউট করতে `http://localhost:3001/idp/logout`-এ POST করতে হবে।

#### src/sp.mts {#srcspmts}

এটি সেই কোড যা একটি সার্ভিস প্রোভাইডার ইমপ্লিমেন্ট করে।

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

আমরা SAML ইমপ্লিমেন্ট করতে [`samlify`](https://www.npmjs.com/package/samlify) লাইব্রেরি ব্যবহার করি।

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` লাইব্রেরি আশা করে যে একটি প্যাকেজ যাচাই করবে যে XML সঠিক, প্রত্যাশিত পাবলিক কি দিয়ে সাইন করা ইত্যাদি। আমরা এই উদ্দেশ্যে [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) ব্যবহার করি।

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

একটি [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) হলো একটি "মিনি ওয়েবসাইট" যা একটি ওয়েবসাইটের ভিতরে মাউন্ট করা যায়। এই ক্ষেত্রে, আমরা সমস্ত সার্ভিস প্রোভাইডার সংজ্ঞাগুলোকে একসাথে গ্রুপ করতে এটি ব্যবহার করি।

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

সার্ভিস প্রোভাইডারের নিজস্ব উপস্থাপনা হলো সমস্ত পাবলিক ডেটা এবং তথ্য সাইন করতে এটি যে প্রাইভেট কি ব্যবহার করে।

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

পাবলিক ডেটাতে এমন সবকিছু থাকে যা সার্ভিস প্রোভাইডারের আইডেন্টিটি প্রোভাইডার সম্পর্কে জানা প্রয়োজন।

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

অন্যান্য SAML কম্পোনেন্টগুলোর সাথে ইন্টারঅপারেবিলিটি সক্ষম করতে, সার্ভিস এবং আইডেন্টিটি প্রোভাইডারদের তাদের পাবলিক ডেটা (যাকে মেটাডেটা বলা হয়) `/metadata`-এ XML ফর্ম্যাটে উপলব্ধ থাকা উচিত।

```typescript
spRouter.post(`/assertion`,
```

এটি সেই পেজ যা ব্রাউজার নিজেকে আইডেন্টিফাই করতে অ্যাক্সেস করে। অ্যাসারশনে ব্যবহারকারীর আইডেন্টিফায়ার (এখানে আমরা ইমেইল ঠিকানা ব্যবহার করি) অন্তর্ভুক্ত থাকে এবং অতিরিক্ত অ্যাট্রিবিউটও অন্তর্ভুক্ত থাকতে পারে। এটি উপরের সিকোয়েন্স ডায়াগ্রামের 7 নম্বর ধাপের হ্যান্ডলার।

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

অ্যাসারশনে দেওয়া XML ডেটা দেখতে আপনি কমেন্ট আউট করা কমান্ডটি ব্যবহার করতে পারেন। এটি [base64 এনকোডেড](https://en.wikipedia.org/wiki/Base64)।

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

আইডেন্টিটি সার্ভার থেকে লগইন রিকোয়েস্ট পার্স করুন।

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

একটি HTML রেসপন্স পাঠান, শুধু ব্যবহারকারীকে দেখানোর জন্য যে আমরা লগইন পেয়েছি।

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

ব্যর্থতার ক্ষেত্রে ব্যবহারকারীকে জানান।

```typescript
spRouter.get('/login',
```

ব্রাউজার যখন এই পেজটি পাওয়ার চেষ্টা করে তখন একটি লগইন রিকোয়েস্ট তৈরি করুন। এটি উপরের সিকোয়েন্স ডায়াগ্রামের 1 নম্বর ধাপের হ্যান্ডলার।

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

একটি লগইন রিকোয়েস্ট পোস্ট করার জন্য তথ্য পান।

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

এই পেজটি স্বয়ংক্রিয়ভাবে ফর্মটি (নিচে দেখুন) সাবমিট করে। এইভাবে রিডাইরেক্ট হওয়ার জন্য ব্যবহারকারীকে কিছু করতে হয় না। এটি উপরের সিকোয়েন্স ডায়াগ্রামের 2 নম্বর ধাপ।

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (আইডেন্টিটি প্রোভাইডার এন্ডপয়েন্টের URL)-এ পোস্ট করুন।

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ইনপুট নাম হলো `loginRequest.type` (`SAMLRequest`)। সেই ফিল্ডের কন্টেন্ট হলো `loginRequest.context`, যা আবার base64 এনকোডেড XML।

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[এই মিডলওয়্যারটি](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP রিকোয়েস্টের](https://www.tutorialspoint.com/http/http_requests.htm) বডি পড়ে। ডিফল্টভাবে express এটি উপেক্ষা করে, কারণ বেশিরভাগ রিকোয়েস্টে এর প্রয়োজন হয় না। আমাদের এটি প্রয়োজন কারণ POST বডি ব্যবহার করে।

```typescript
app.use(`/${config.spDir}`, spRouter)
```

সার্ভিস প্রোভাইডার ডিরেক্টরিতে (`/sp`) রাউটারটি মাউন্ট করুন।

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

যদি কোনো ব্রাউজার রুট ডিরেক্টরি পাওয়ার চেষ্টা করে, তবে তাকে লগইন পেজের একটি লিঙ্ক প্রদান করুন।

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

এই express অ্যাপ্লিকেশনের সাথে `spPort`-এ লিসেন করুন।

#### src/idp.mts {#srcidpmts}

এটি হলো আইডেন্টিটি প্রোভাইডার। এটি সার্ভিস প্রোভাইডারের মতোই, নিচের ব্যাখ্যাগুলো সেই অংশগুলোর জন্য যেগুলো আলাদা।

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // অ্যাট্রিবিউট সংরক্ষণ করুন
    attributeNamePrefix: "@_", // অ্যাট্রিবিউটের জন্য প্রিফিক্স
  }
)
```

সার্ভিস প্রোভাইডার থেকে আমরা যে XML রিকোয়েস্ট পাই তা আমাদের পড়তে এবং বুঝতে হবে।

```typescript
const getLoginPage = requestId => `
```

এই ফাংশনটি অটো-সাবমিটেড ফর্ম সহ পেজটি তৈরি করে যা উপরের সিকোয়েন্স ডায়াগ্রামের 4 নম্বর ধাপে রিটার্ন করা হয়।

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

আমরা সার্ভিস প্রোভাইডারকে দুটি ফিল্ড পাঠাই:

1. `requestId` যার আমরা রেসপন্স দিচ্ছি।
2. ব্যবহারকারীর আইডেন্টিফায়ার (আপাতত আমরা ব্যবহারকারীর দেওয়া ইমেইল ঠিকানা ব্যবহার করি)।

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

এটি উপরের সিকোয়েন্স ডায়াগ্রামের 5 নম্বর ধাপের হ্যান্ডলার। [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) লগইন রেসপন্স তৈরি করে। 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

অডিয়েন্স হলো সার্ভিস প্রোভাইডার।

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

রিকোয়েস্ট থেকে এক্সট্রাক্ট করা তথ্য। রিকোয়েস্টে আমরা যে একটি প্যারামিটার নিয়ে চিন্তা করি তা হলো requestId, যা সার্ভিস প্রোভাইডারকে রিকোয়েস্ট এবং তাদের রেসপন্স মেলাতে দেয়।

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert } // সাইনিং নিশ্চিত করুন
```

রেসপন্স সাইন করার ডেটা পেতে আমাদের `signingKey` প্রয়োজন। সার্ভিস প্রোভাইডার আনসাইন্ড রিকোয়েস্ট বিশ্বাস করে না।

```typescript
    },
    "post",
    {
      email: req.body.email
```

এটি হলো সেই ফিল্ড যেখানে ব্যবহারকারীর তথ্য থাকে যা আমরা সার্ভিস প্রোভাইডারকে ফেরত পাঠাই।

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

আবার, একটি অটো-সাবমিটেড ফর্ম ব্যবহার করুন। এটি উপরের সিকোয়েন্স ডায়াগ্রামের 6 নম্বর ধাপ।

```typescript

// লগইন রিকোয়েস্টের জন্য IdP এন্ডপয়েন্ট
idpRouter.post(`/login`,
```

এটি হলো সেই এন্ডপয়েন্ট যা সার্ভিস প্রোভাইডার থেকে একটি লগইন রিকোয়েস্ট গ্রহণ করে। এটি উপরের সিকোয়েন্স ডায়াগ্রামের 3 নম্বর ধাপের হ্যান্ডলার।

```typescript
  async (req, res) => {
    try {
      // parseLoginRequest কাজ করাতে পারিনি বলে এই বিকল্প ব্যবস্থা।
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

অথেনটিকেশন রিকোয়েস্টের ID পড়তে আমাদের [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) ব্যবহার করতে সক্ষম হওয়া উচিত। তবে, আমি এটি কাজ করাতে পারিনি এবং এর পিছনে অনেক সময় ব্যয় করাটা সার্থক মনে হয়নি, তাই আমি শুধু একটি [জেনারেল-পারপাস XML পার্সার](https://www.npmjs.com/package/fast-xml-parser) ব্যবহার করেছি। আমাদের যে তথ্যটি প্রয়োজন তা হলো `<samlp:AuthnRequest>` ট্যাগের ভিতরের `ID` অ্যাট্রিবিউট, যা XML-এর টপ লেভেলে থাকে।

## Using Ethereum signatures {#using-ethereum-signatures}

এখন যেহেতু আমরা সার্ভিস প্রোভাইডারের কাছে ব্যবহারকারীর পরিচয় পাঠাতে পারি, পরবর্তী ধাপ হলো একটি বিশ্বস্ত উপায়ে ব্যবহারকারীর পরিচয় পাওয়া। Viem আমাদের শুধু ওয়ালেটকে ব্যবহারকারীর এডড্রেস জিজ্ঞাসা করার অনুমতি দেয়, কিন্তু এর মানে হলো ব্রাউজারকে তথ্যের জন্য জিজ্ঞাসা করা। আমরা ব্রাউজার নিয়ন্ত্রণ করি না, তাই আমরা স্বয়ংক্রিয়ভাবে এর থেকে পাওয়া রেসপন্স বিশ্বাস করতে পারি না।

এর পরিবর্তে, IdP ব্রাউজারকে সাইন করার জন্য একটি স্ট্রিং পাঠাবে। যদি ব্রাউজারের ওয়ালেট এই স্ট্রিংটি সাইন করে, তবে এর মানে হলো এটি সত্যিই সেই এডড্রেস (অর্থাৎ, এটি সেই এডড্রেস-এর সাথে সম্পর্কিত প্রাইভেট কি জানে)।

এটি কাজ করতে দেখতে, বিদ্যমান IdP এবং SP বন্ধ করুন এবং এই কমান্ডগুলো চালান:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

তারপর [SP-তে](http://localhost:3000) ব্রাউজ করুন এবং নির্দেশাবলী অনুসরণ করুন।

মনে রাখবেন যে এই পর্যায়ে আমরা জানি না কীভাবে ইথিরিয়াম এডড্রেস থেকে ইমেইল ঠিকানা পেতে হয়, তাই এর পরিবর্তে আমরা SP-কে `<ethereum address>@bad.email.address` রিপোর্ট করি।

### Detailed explanation {#detailed-explanation-2}

পরিবর্তনগুলো আগের ডায়াগ্রামের 4-5 নম্বর ধাপে রয়েছে।

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

আমরা যে একমাত্র ফাইলটি পরিবর্তন করেছি তা হলো `idp.mts`। এখানে পরিবর্তিত অংশগুলো দেওয়া হলো।

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

আমাদের এই দুটি অতিরিক্ত লাইব্রেরি প্রয়োজন। আমরা [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce) মান তৈরি করতে [`uuid`](https://www.npmjs.com/package/uuid) ব্যবহার করি। মানটি নিজে কোনো ব্যাপার না, শুধু এই বিষয়টি গুরুত্বপূর্ণ যে এটি কেবল একবার ব্যবহার করা হয়।

[`viem`](https://viem.sh/) লাইব্রেরি আমাদের ইথিরিয়াম সংজ্ঞাগুলো ব্যবহার করতে দেয়। এখানে আমাদের এটি প্রয়োজন যাচাই করার জন্য যে সিগনেচারটি সত্যিই বৈধ।

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

ওয়ালেট ব্যবহারকারীকে মেসেজটি সাইন করার অনুমতি চায়। একটি মেসেজ যা শুধু একটি নন্স তা ব্যবহারকারীদের বিভ্রান্ত করতে পারে, তাই আমরা এই প্রম্পটটি অন্তর্ভুক্ত করি।

```typescript
// requestID-গুলো এখানে রাখুন
let nonces = {}
```

রিকোয়েস্টের রেসপন্স দিতে আমাদের রিকোয়েস্টের তথ্য প্রয়োজন। আমরা এটি রিকোয়েস্টের সাথে পাঠাতে পারতাম (ধাপ 4), এবং এটি ফেরত পেতে পারতাম (ধাপ 5)। তবে, আমরা ব্রাউজার থেকে পাওয়া তথ্য বিশ্বাস করতে পারি না, যা সম্ভাব্য ক্ষতিকারক ব্যবহারকারীর নিয়ন্ত্রণে থাকে। তাই এটিকে এখানে সংরক্ষণ করা ভালো, নন্স-কে কি (key) হিসেবে ব্যবহার করে।

মনে রাখবেন যে আমরা সরলতার খাতিরে এখানে এটি একটি ভেরিয়েবল হিসেবে করছি। তবে, এর বেশ কয়েকটি অসুবিধা রয়েছে:

- আমরা ডিনায়াল অফ সার্ভিস অ্যাটাকের ঝুঁকিতে আছি। একজন ক্ষতিকারক ব্যবহারকারী একাধিকবার লগ অন করার চেষ্টা করতে পারে, আমাদের মেমরি পূর্ণ করে দিতে পারে।
- যদি IdP প্রসেস রিস্টার্ট করার প্রয়োজন হয়, তবে আমরা বিদ্যমান মানগুলো হারিয়ে ফেলি।
- আমরা একাধিক প্রসেস জুড়ে লোড ব্যালেন্স করতে পারি না, কারণ প্রতিটির নিজস্ব ভেরিয়েবল থাকবে।

একটি প্রোডাকশন সিস্টেমে আমরা একটি ডাটাবেস ব্যবহার করব এবং কোনো ধরনের এক্সপায়ারি মেকানিজম ইমপ্লিমেন্ট করব।

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

একটি নন্স তৈরি করুন এবং ভবিষ্যতের ব্যবহারের জন্য `requestId` সংরক্ষণ করুন।

```typescript
  return `
<html>
  <head>
    <script type="module">
```

পেজটি লোড হওয়ার সময় এই জাভাস্ক্রিপ্টটি স্বয়ংক্রিয়ভাবে এক্সিকিউট হয়।

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

আমাদের `viem` থেকে বেশ কয়েকটি ফাংশন প্রয়োজন।

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

ব্রাউজারে একটি ওয়ালেট থাকলেই আমরা কাজ করতে পারি।

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

ওয়ালেট (`window.ethereum`) থেকে একাউন্ট-গুলোর তালিকার জন্য রিকোয়েস্ট করুন। ধরে নিন অন্তত একটি আছে, এবং শুধুমাত্র প্রথমটি সংরক্ষণ করুন। 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ব্রাউজার ওয়ালেটের সাথে ইন্টারঅ্যাক্ট করতে একটি [ওয়ালেট ক্লায়েন্ট](https://viem.sh/docs/clients/wallet) তৈরি করুন।

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

ব্যবহারকারীকে একটি মেসেজ সাইন করতে বলুন। যেহেতু এই সম্পূর্ণ HTML একটি [টেমপ্লেট স্ট্রিং](https://viem.sh/docs/clients/wallet)-এ রয়েছে, আমরা idp প্রসেসে সংজ্ঞায়িত ভেরিয়েবলগুলো ব্যবহার করতে পারি। এটি সিকোয়েন্স ডায়াগ্রামের 4.5 নম্বর ধাপ।

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>`-এ রিডাইরেক্ট করুন। এটি সিকোয়েন্স ডায়াগ্রামের 5 নম্বর ধাপ।

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

সিগনেচারটি ব্রাউজার দ্বারা ফেরত পাঠানো হয়, যা সম্ভাব্য ক্ষতিকারক হতে পারে (ব্রাউজারে শুধু `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` খোলা থেকে আপনাকে আটকানোর কিছু নেই)। অতএব, IdP প্রসেস খারাপ সিগনেচারগুলো সঠিকভাবে হ্যান্ডেল করে কিনা তা যাচাই করা গুরুত্বপূর্ণ।

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

বাকিটা শুধু স্ট্যান্ডার্ড HTML।

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

এটি সিকোয়েন্স ডায়াগ্রামের 5 নম্বর ধাপের হ্যান্ডলার।

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

রিকোয়েস্ট ID পান, এবং `nonces` থেকে নন্স-টি মুছে ফেলুন যাতে এটি পুনরায় ব্যবহার করা না যায়।

```typescript
  try {
```

যেহেতু সিগনেচারটি অবৈধ হওয়ার অনেক উপায় রয়েছে, তাই আমরা যেকোনো নিক্ষিপ্ত ত্রুটি ধরতে এটিকে একটি `try ... catch` ব্লকে র‍্যাপ করি।

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

সিকোয়েন্স ডায়াগ্রামের 5.5 নম্বর ধাপ ইমপ্লিমেন্ট করতে [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) ব্যবহার করুন।

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

হ্যান্ডলারের বাকি অংশটি আমরা আগে `/loginSubmitted` হ্যান্ডলারে যা করেছি তার সমতুল্য, শুধু একটি ছোট পরিবর্তন ছাড়া।

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

আমাদের কাছে আসল ইমেইল ঠিকানা নেই (আমরা এটি পরবর্তী বিভাগে পাব), তাই আপাতত আমরা ইথিরিয়াম এডড্রেস রিটার্ন করি এবং এটিকে স্পষ্টভাবে ইমেইল ঠিকানা নয় হিসেবে চিহ্নিত করি।


```typescript
// লগইন রিকোয়েস্টের জন্য IdP এন্ডপয়েন্ট
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // parseLoginRequest কাজ করাতে পারিনি বলে এই বিকল্প ব্যবস্থা।
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

`getLoginPage`-এর পরিবর্তে, এখন 3 নম্বর ধাপের হ্যান্ডলারে `getSignaturePage` ব্যবহার করুন।

## Getting the email address {#getting-the-email-address}

পরবর্তী ধাপ হলো ইমেইল ঠিকানা পাওয়া, যা সার্ভিস প্রোভাইডার দ্বারা অনুরোধ করা আইডেন্টিফায়ার। এটি করার জন্য, আমরা [Ethereum Attestation Service (EAS)](https://attest.org/) ব্যবহার করি।

এটেস্টেশন পাওয়ার সবচেয়ে সহজ উপায় হলো [GraphQL API](https://docs.attest.org/docs/developer-tools/api) ব্যবহার করা। আমরা এই কোয়েরিটি ব্যবহার করি:

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

এই [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)-তে শুধু একটি ইমেইল ঠিকানা অন্তর্ভুক্ত থাকে। এই কোয়েরিটি এই স্কিমার এটেস্টেশন-গুলোর জন্য জিজ্ঞাসা করে। এটেস্টেশন-এর বিষয়বস্তুকে `recipient` বলা হয়। এটি সর্বদা একটি ইথিরিয়াম এডড্রেস।

সতর্কতা: আমরা এখানে যেভাবে এটেস্টেশন পাচ্ছি তাতে দুটি নিরাপত্তা সমস্যা রয়েছে।

- আমরা API এন্ডপয়েন্ট, `https://optimism.easscan.org/graphql`-এ যাচ্ছি, যা একটি সেন্ট্রালাইজড কম্পোনেন্ট। আমরা `id` অ্যাট্রিবিউট পেতে পারি এবং তারপর একটি এটেস্টেশন আসল কিনা তা যাচাই করতে অনচেইন লুকআপ করতে পারি, কিন্তু API এন্ডপয়েন্ট এখনও আমাদের না জানিয়ে এটেস্টেশন-গুলোকে সেন্সর করতে পারে। 

  এই সমস্যাটি সমাধান করা অসম্ভব নয়, আমরা আমাদের নিজস্ব GraphQL এন্ডপয়েন্ট চালাতে পারতাম এবং চেইন লগ থেকে এটেস্টেশন-গুলো পেতে পারতাম, কিন্তু আমাদের উদ্দেশ্যের জন্য তা অতিরিক্ত।

- আমরা অ্যাটেস্টরের পরিচয়ের দিকে তাকাই না। যে কেউ আমাদের মিথ্যা তথ্য দিতে পারে। একটি বাস্তব বিশ্বের ইমপ্লিমেন্টেশনে আমাদের বিশ্বস্ত অ্যাটেস্টরদের একটি সেট থাকবে এবং শুধুমাত্র তাদের এটেস্টেশন-গুলোর দিকে তাকাব।

এটি কাজ করতে দেখতে, বিদ্যমান IdP এবং SP বন্ধ করুন এবং এই কমান্ডগুলো চালান:

```sh
git checkout email-address
pnpm install
pnpm start
```

তারপর আপনার ইমেইল ঠিকানা প্রদান করুন। এটি করার দুটি উপায় আছে:

- একটি প্রাইভেট কি ব্যবহার করে একটি ওয়ালেট ইমপোর্ট করুন, এবং টেস্টিং প্রাইভেট কি `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` ব্যবহার করুন।

- আপনার নিজের ইমেইল ঠিকানার জন্য একটি এটেস্টেশন যোগ করুন:

  1. [এটেস্টেশন এক্সপ্লোরারে স্কিমাতে](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ব্রাউজ করুন।

  2. **Attest with Schema**-তে ক্লিক করুন।

  3. প্রাপক হিসেবে আপনার ইথিরিয়াম এডড্রেস, ইমেইল ঠিকানা হিসেবে আপনার ইমেইল ঠিকানা লিখুন এবং **Onchain** নির্বাচন করুন। তারপর **Make Attestation**-এ ক্লিক করুন।

  4. আপনার ওয়ালেট-এ লেনদেন অনুমোদন করুন। গ্যাস ফি দেওয়ার জন্য আপনার [অপ্টিমিজম ব্লকচেইন](https://app.optimism.io/bridge/deposit)-এ কিছু ETH প্রয়োজন হবে।

যেভাবেই হোক, এটি করার পর [http://localhost:3000](http://localhost:3000)-এ ব্রাউজ করুন এবং নির্দেশাবলী অনুসরণ করুন। যদি আপনি টেস্টিং প্রাইভেট কি ইমপোর্ট করে থাকেন, তবে আপনি যে ইমেইলটি পাবেন তা হলো `test_addr_0@example.com`। যদি আপনি আপনার নিজের এডড্রেস ব্যবহার করে থাকেন, তবে এটি আপনি যা অ্যাটেস্ট করেছেন তাই হওয়া উচিত।

### Detailed explanation {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

নতুন ধাপগুলো হলো GraphQL কমিউনিকেশন, ধাপ 5.6 এবং 5.7।

আবার, এখানে `idp.mts`-এর পরিবর্তিত অংশগুলো দেওয়া হলো।

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

আমাদের প্রয়োজনীয় লাইব্রেরিগুলো ইমপোর্ট করুন।

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[প্রতিটি ব্লকচেইনের জন্য একটি আলাদা এন্ডপয়েন্ট](https://docs.attest.org/docs/developer-tools/api) রয়েছে।

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

একটি নতুন `GraphQLClient` ক্লায়েন্ট তৈরি করুন যা আমরা এন্ডপয়েন্ট কোয়েরি করার জন্য ব্যবহার করতে পারি।

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL আমাদের শুধু বাইট সহ একটি অস্বচ্ছ ডেটা অবজেক্ট দেয়। এটি বুঝতে আমাদের স্কিমা প্রয়োজন। 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

একটি ইথিরিয়াম এডড্রেস থেকে একটি ইমেইল ঠিকানা পাওয়ার জন্য একটি ফাংশন।

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

এটি একটি GraphQL কোয়েরি।

```typescript
      attestations(
```

আমরা এটেস্টেশন খুঁজছি।

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

আমরা যে এটেস্টেশন-গুলো চাই তা হলো আমাদের স্কিমার মধ্যে থাকাগুলো, যেখানে প্রাপক হলো `getAddress(ethAddr)`। [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) ফাংশনটি নিশ্চিত করে যে আমাদের এডড্রেস-এর সঠিক [চেকসাম](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) রয়েছে। এটি প্রয়োজনীয় কারণ GraphQL কেস-সেনসিটিভ। "0xBAD060A7", "0xBad060A7", এবং "0xbad060a7" হলো ভিন্ন মান।

```typescript
        take: 1
```

আমরা যতগুলো এটেস্টেশন-ই পাই না কেন, আমরা শুধু প্রথমটি চাই।

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

আমরা যে ফিল্ডগুলো পেতে চাই।

- `attester`: যে এডড্রেস এটেস্টেশন সাবমিট করেছে। সাধারণত এটি এটেস্টেশন-কে বিশ্বাস করা হবে কি না তা সিদ্ধান্ত নিতে ব্যবহৃত হয়।
- `id`: এটেস্টেশন ID। আপনি এই মানটি ব্যবহার করে [অনচেইন এটেস্টেশন পড়তে পারেন](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) যাতে যাচাই করা যায় যে GraphQL কোয়েরি থেকে পাওয়া তথ্য সঠিক।
- `data`: স্কিমা ডেটা (এই ক্ষেত্রে, ইমেইল ঠিকানা)।

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

যদি কোনো এটেস্টেশন না থাকে, তবে এমন একটি মান রিটার্ন করুন যা স্পষ্টতই ভুল, কিন্তু সার্ভিস প্রোভাইডারের কাছে বৈধ বলে মনে হবে।

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

যদি কোনো মান থাকে, তবে ডেটা ডিকোড করতে `decodeData` ব্যবহার করুন। এটি যে মেটাডেটা প্রদান করে তা আমাদের প্রয়োজন নেই, শুধু মানটিই যথেষ্ট।

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

ইমেইল ঠিকানা পেতে নতুন ফাংশনটি ব্যবহার করুন।

## What about decentralization? {#what-about-decentralization}

এই কনফিগারেশনে ব্যবহারকারীরা এমন কেউ হওয়ার ভান করতে পারে না যা তারা নয়, যতক্ষণ না আমরা ইথিরিয়াম থেকে ইমেইল এডড্রেস ম্যাপিংয়ের জন্য বিশ্বস্ত অ্যাটেস্টরদের উপর নির্ভর করি। তবে, আমাদের আইডেন্টিটি প্রোভাইডার এখনও একটি সেন্ট্রালাইজড কম্পোনেন্ট। যার কাছে আইডেন্টিটি প্রোভাইডারের প্রাইভেট কি আছে সে সার্ভিস প্রোভাইডারকে মিথ্যা তথ্য পাঠাতে পারে।

[মাল্টি-পার্টি কম্পিউটেশন (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ব্যবহার করে এর একটি সমাধান থাকতে পারে। আমি ভবিষ্যতের একটি টিউটোরিয়ালে এটি সম্পর্কে লেখার আশা রাখি।

## Conclusion {#conclusion}

ইথিরিয়াম সিগনেচারের মতো একটি লগ অন স্ট্যান্ডার্ড গ্রহণ করা একটি চিকেন অ্যান্ড এগ সমস্যার সম্মুখীন হয়। সার্ভিস প্রোভাইডাররা সম্ভাব্য সবচেয়ে বিস্তৃত বাজারের কাছে আবেদন করতে চায়। ব্যবহারকারীরা তাদের লগ অন স্ট্যান্ডার্ড সমর্থন করার বিষয়ে চিন্তা না করেই পরিষেবাগুলো অ্যাক্সেস করতে সক্ষম হতে চায়।
ইথিরিয়াম IdP-এর মতো অ্যাডাপ্টার তৈরি করা আমাদের এই বাধা অতিক্রম করতে সাহায্য করতে পারে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।