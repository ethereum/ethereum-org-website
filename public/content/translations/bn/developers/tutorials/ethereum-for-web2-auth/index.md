---
title: web2 প্রমাণীকরণের জন্য ইথেরিয়াম ব্যবহার করা
description: এই টিউটোরিয়ালটি পড়ার পরে, একজন ডেভেলপার SAML লগইনের সাথে ইথেরিয়াম লগইন (web3) একীভূত করতে সক্ষম হবেন, যা web2-তে একক সাইন-অন এবং অন্যান্য সম্পর্কিত পরিষেবা প্রদানের জন্য ব্যবহৃত একটি স্ট্যান্ডার্ড। এটি ইথেরিয়াম স্বাক্ষরগুলির মাধ্যমে web2 রিসোর্সগুলিকে প্রমাণীকৃত করার অনুমতি দেয়, যার ব্যবহারকারী বৈশিষ্ট্যগুলি অ্যাটেস্টেশনগুলি থেকে আসে।
author: Ori Pomerantz
tags: [ "web2", "প্রমাণীকরণ", "eas" ]
skill: beginner
lang: bn
published: 2025-04-30
---

## ভূমিকা

[SAML](https://www.onelogin.com/learn/saml) হল web2-এ ব্যবহৃত একটি স্ট্যান্ডার্ড যা একজন [পরিচয় প্রদানকারী (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)-কে [পরিষেবা প্রদানকারী (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\))-দের জন্য ব্যবহারকারীর তথ্য প্রদান করার অনুমতি দেয়।

এই টিউটোরিয়ালে আপনি শিখবেন কিভাবে ইথেরিয়াম স্বাক্ষরকে SAML-এর সাথে একীভূত করতে হয়, যাতে ব্যবহারকারীরা তাদের ইথেরিয়াম ওয়ালেট ব্যবহার করে সেইসব web2 পরিষেবাগুলিতে নিজেদের প্রমাণীকরণ করতে পারে যা এখনও স্থানীয়ভাবে ইথেরিয়াম সমর্থন করে না।

মনে রাখবেন যে এই টিউটোরিয়ালটি দুটি পৃথক দর্শকের জন্য লেখা হয়েছে:

- ইথেরিয়াম ব্যবহারকারী যারা ইথেরিয়াম বোঝেন এবং তাদের SAML শিখতে হবে
- Web2 ব্যবহারকারী যারা SAML এবং web2 প্রমাণীকরণ বোঝেন এবং তাদের ইথেরিয়াম শিখতে হবে

ফলস্বরূপ, এতে এমন অনেক প্রাথমিক উপাদান থাকবে যা আপনি ইতিমধ্যেই জানেন। আপনি নির্দ্বিধায় এটি এড়িয়ে যেতে পারেন।

### ইথেরিয়াম ব্যবহারকারীদের জন্য SAML

SAML একটি কেন্দ্রীভূত প্রোটোকল। একজন পরিষেবা প্রদানকারী (SP) একজন পরিচয় প্রদানকারী (IdP) থেকে শুধুমাত্র তখনই দাবি (যেমন, "এটি আমার ব্যবহারকারী জন, তার A, B, এবং C করার অনুমতি থাকা উচিত") গ্রহণ করে, যদি তার সাথে এটির একটি পূর্ব-বিদ্যমান বিশ্বাস সম্পর্ক থাকে, অথবা সেই [সার্টিফিকেট কর্তৃপক্ষ](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)-এর সাথে যা সেই IdP-র সার্টিফিকেট স্বাক্ষর করেছে।

উদাহরণস্বরূপ, SP হতে পারে একটি ট্রাভেল এজেন্সি যা কোম্পানিগুলিকে ভ্রমণ পরিষেবা প্রদান করে, এবং IdP হতে পারে একটি কোম্পানির অভ্যন্তরীণ ওয়েব সাইট। যখন কর্মচারীদের ব্যবসায়িক ভ্রমণের জন্য বুকিং করতে হয়, তখন ট্রাভেল এজেন্সি তাদের আসল ভ্রমণের বুকিং করার আগে কোম্পানির দ্বারা প্রমাণীকরণের জন্য পাঠায়।

![ধাপে ধাপে SAML প্রক্রিয়া](./fig-01-saml.png)

এইভাবেই তিনটি সত্তা, ব্রাউজার, SP, এবং IdP, অ্যাক্সেসের জন্য আলোচনা করে। SP-কে আগে থেকে ব্রাউজার ব্যবহারকারী সম্পর্কে কিছু জানার প্রয়োজন নেই, শুধু IdP-কে বিশ্বাস করলেই চলে।

### SAML ব্যবহারকারীদের জন্য ইথেরিয়াম

ইথেরিয়াম একটি বিকেন্দ্রীভূত সিস্টেম।

![ইথেরিয়াম লগঅন](./fig-02-eth-logon.png)

ব্যবহারকারীদের একটি প্রাইভেট কী থাকে (সাধারণত একটি ব্রাউজার এক্সটেনশনে রাখা হয়)। প্রাইভেট কী থেকে আপনি একটি পাবলিক কী এবং তা থেকে একটি 20-বাইটের অ্যাড্রেস তৈরি করতে পারেন। যখন ব্যবহারকারীদের একটি সিস্টেমে লগ ইন করতে হয়, তখন তাদের একটি নন্স (একবার ব্যবহারযোগ্য মান) সহ একটি বার্তায় স্বাক্ষর করতে বলা হয়। সার্ভার যাচাই করতে পারে যে স্বাক্ষরটি সেই অ্যাড্রেস দ্বারা তৈরি করা হয়েছে।

![অ্যাটেস্টেশন থেকে অতিরিক্ত ডেটা পাওয়া](./fig-03-eas-data.png)

স্বাক্ষরটি শুধুমাত্র ইথেরিয়াম অ্যাড্রেস যাচাই করে। অন্যান্য ব্যবহারকারীর বৈশিষ্ট্যগুলি পেতে, আপনি সাধারণত [অ্যাটেস্টেশন](https://attest.org/) ব্যবহার করেন। একটি অ্যাটেস্টেশনে সাধারণত এই ফিল্ডগুলি থাকে:

- **অ্যাটেস্টর**, যে অ্যাড্রেসটি অ্যাটেস্টেশনটি তৈরি করেছে
- **প্রাপক**, যে অ্যাড্রেসের জন্য অ্যাটেস্টেশনটি প্রযোজ্য
- **ডেটা**, যে ডেটা প্রত্যয়িত করা হচ্ছে, যেমন নাম, অনুমতি, ইত্যাদি।
- **স্কিমা**, ডেটা ব্যাখ্যা করার জন্য ব্যবহৃত স্কিমার ID।

ইথেরিয়ামের বিকেন্দ্রীভূত প্রকৃতির কারণে, যেকোনো ব্যবহারকারী অ্যাটেস্টেশন তৈরি করতে পারেন। আমরা কোন অ্যাটেস্টেশনগুলিকে নির্ভরযোগ্য বলে মনে করি তা শনাক্ত করার জন্য অ্যাটেস্টরের পরিচয় গুরুত্বপূর্ণ।

## সেটআপ

প্রথম ধাপ হল একটি SAML SP এবং একটি SAML IdP-র মধ্যে যোগাযোগ স্থাপন করা।

1. সফ্টওয়্যারটি ডাউনলোড করুন। এই নিবন্ধটির জন্য নমুনা সফ্টওয়্যারটি [গিটহাবে](https://github.com/qbzzt/250420-saml-ethereum) রয়েছে। বিভিন্ন পর্যায়গুলি বিভিন্ন ব্রাঞ্চে সংরক্ষণ করা হয়, এই পর্যায়ের জন্য আপনার `saml-only` প্রয়োজন

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. স্ব-স্বাক্ষরিত সার্টিফিকেটসহ কী তৈরি করুন। এর মানে হল যে কী নিজেই তার সার্টিফিকেট কর্তৃপক্ষ, এবং এটি পরিষেবা প্রদানকারীর কাছে ম্যানুয়ালি আমদানি করতে হবে। আরও তথ্যের জন্য [OpenSSL ডক্স](https://docs.openssl.org/master/man1/openssl-req/) দেখুন।

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. সার্ভারগুলি শুরু করুন (SP এবং IdP উভয়ই)

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/) এ SP ব্রাউজ করুন এবং IdP-তে (পোর্ট 3001) পুনঃনির্দেশিত হতে বোতামে ক্লিক করুন।

5. IdP-কে আপনার ইমেল অ্যাড্রেস দিন এবং **পরিষেবা প্রদানকারীতে লগইন করুন**-এ ক্লিক করুন। দেখুন যে আপনাকে পরিষেবা প্রদানকারীতে (পোর্ট 3000) আবার পুনঃনির্দেশিত করা হয়েছে এবং এটি আপনাকে আপনার ইমেল অ্যাড্রেস দ্বারা চেনে।

### বিস্তারিত ব্যাখ্যা

ধাপে ধাপে যা ঘটে তা এখানে দেওয়া হল:

![ইথেরিয়াম ছাড়া সাধারণ SAML লগঅন](./fig-04-saml-no-eth.png)

#### src/config.mts

এই ফাইলটিতে আইডেন্টিটি প্রোভাইডার এবং সার্ভিস প্রোভাইডার উভয়ের কনফিগারেশন রয়েছে। সাধারণত এই দুটি ভিন্ন সত্তা হবে, কিন্তু এখানে আমরা সরলতার জন্য কোড শেয়ার করতে পারি।

```typescript
const fs = await import("fs")

const protocol="http"
```

আপাতত আমরা শুধু পরীক্ষা করছি, তাই HTTP ব্যবহার করা ঠিক আছে।

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

পাবলিক কীগুলি পড়ুন, যা সাধারণত উভয় উপাদানের জন্য উপলব্ধ থাকে (এবং হয় সরাসরি বিশ্বস্ত, অথবা একটি বিশ্বস্ত সার্টিফিকেট কর্তৃপক্ষ দ্বারা স্বাক্ষরিত)।

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

উভয় উপাদানের জন্য URL।

```typescript
export const spPublicData = {
```

পরিষেবা প্রদানকারীর জন্য পাবলিক ডেটা।

```typescript
    entityID: `${spUrl}/metadata`,
```

প্রচলিত নিয়ম অনুযায়ী, SAML-এ `entityID` হল সেই URL যেখানে সত্তার মেটাডেটা পাওয়া যায়। এই মেটাডেটা এখানকার পাবলিক ডেটার সাথে সামঞ্জস্যপূর্ণ, তবে এটি XML ফর্ম্যাটে থাকে।

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

আমাদের উদ্দেশ্যের জন্য সবচেয়ে গুরুত্বপূর্ণ সংজ্ঞা হল `assertionConsumerServer`। এর মানে হল যে পরিষেবা প্রদানকারীর কাছে কিছু দাবি করতে (উদাহরণস্বরূপ, "যে ব্যবহারকারী আপনাকে এই তথ্য পাঠাচ্ছে সে হল somebody@example.com") আমাদের [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) ব্যবহার করে `http://localhost:3000/sp/assertion` URL-এ যেতে হবে।

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

পরিচয় প্রদানকারীর জন্য পাবলিক ডেটা একই রকম। এটি নির্দিষ্ট করে যে একজন ব্যবহারকারীকে লগ ইন করতে আপনাকে `http://localhost:3001/idp/login`-এ POST করতে হবে এবং একজন ব্যবহারকারীকে লগ আউট করতে আপনাকে `http://localhost:3001/idp/logout`-এ POST করতে হবে।

#### src/sp.mts

এটি সেই কোড যা একটি পরিষেবা প্রদানকারীকে বাস্তবায়ন করে।

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

আমরা SAML বাস্তবায়নের জন্য [`samlify`](https://www.npmjs.com/package/samlify) লাইব্রেরি ব্যবহার করি।

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` লাইব্রেরি আশা করে যে একটি প্যাকেজ XML সঠিক কিনা, প্রত্যাশিত পাবলিক কী দিয়ে স্বাক্ষরিত কিনা, ইত্যাদি যাচাই করবে। আমরা এই উদ্দেশ্যে [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) ব্যবহার করি।

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

একটি [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) হল একটি "মিনি ওয়েব সাইট" যা একটি ওয়েব সাইটের ভিতরে মাউন্ট করা যেতে পারে। এই ক্ষেত্রে, আমরা এটি সমস্ত পরিষেবা প্রদানকারীর সংজ্ঞাগুলিকে একত্রিত করার জন্য ব্যবহার করি।

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

পরিষেবা প্রদানকারীর নিজস্ব উপস্থাপনা হল সমস্ত পাবলিক ডেটা এবং তথ্য স্বাক্ষর করার জন্য এটি যে প্রাইভেট কী ব্যবহার করে।

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

পাবলিক ডেটাতে পরিচয় প্রদানকারী সম্পর্কে পরিষেবা প্রদানকারীর যা কিছু জানা দরকার তা রয়েছে।

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

অন্যান্য SAML উপাদানগুলির সাথে আন্তঃকার্যক্ষমতা সক্ষম করার জন্য, পরিষেবা এবং পরিচয় প্রদানকারীদের তাদের পাবলিক ডেটা (যাকে মেটাডেটা বলা হয়) `/metadata`-তে XML ফর্ম্যাটে উপলব্ধ থাকা উচিত।

```typescript
spRouter.post(`/assertion`,
```

এটি সেই পৃষ্ঠা যা ব্রাউজার দ্বারা নিজের পরিচয় প্রদানের জন্য অ্যাক্সেস করা হয়। এই দাবিতে ব্যবহারকারীর শনাক্তকারী (এখানে আমরা ইমেল অ্যাড্রেস ব্যবহার করি) অন্তর্ভুক্ত থাকে এবং এতে অতিরিক্ত বৈশিষ্ট্যও অন্তর্ভুক্ত থাকতে পারে। এটি উপরের সিকোয়েন্স ডায়াগ্রামের ৭ নং ধাপের জন্য হ্যান্ডলার।

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

আপনি দাবিতে প্রদত্ত XML ডেটা দেখতে কমেন্ট করা কমান্ডটি ব্যবহার করতে পারেন। এটি [বেস64 এনকোডেড](https://en.wikipedia.org/wiki/Base64)।

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

পরিচয় সার্ভার থেকে লগইন অনুরোধটি পার্স করুন।

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

একটি HTML প্রতিক্রিয়া পাঠান, শুধু ব্যবহারকারীকে দেখানোর জন্য যে আমরা লগইন পেয়েছি।

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

ব্রাউজার যখন এই পৃষ্ঠাটি পাওয়ার চেষ্টা করে তখন একটি লগইন অনুরোধ তৈরি করুন। এটি উপরের সিকোয়েন্স ডায়াগ্রামের ১ নং ধাপের জন্য হ্যান্ডলার।

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

একটি লগইন অনুরোধ পোস্ট করার জন্য তথ্য পান।

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

এই পৃষ্ঠাটি ফর্মটি (নীচে দেখুন) স্বয়ংক্রিয়ভাবে জমা দেয়। এইভাবে ব্যবহারকারীকে পুনঃনির্দেশিত হওয়ার জন্য কিছু করতে হবে না। এটি উপরের সিকোয়েন্স ডায়াগ্রামের ২ নং ধাপ।

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint`-এ পোস্ট করুন (পরিচয় প্রদানকারী এন্ডপয়েন্টের URL)।

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ইনপুটের নাম হল `loginRequest.type` (`SAMLRequest`)। সেই ফিল্ডের বিষয়বস্তু হল `loginRequest.context`, যা আবার XML এবং বেস64 এনকোডেড।

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[এই মিডলওয়্যারটি](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP অনুরোধের](https://www.tutorialspoint.com/http/http_requests.htm) বডি পড়ে। ডিফল্টভাবে express এটিকে উপেক্ষা করে, কারণ বেশিরভাগ অনুরোধের জন্য এটির প্রয়োজন হয় না। আমাদের এটির প্রয়োজন কারণ POST বডি ব্যবহার করে।

```typescript
app.use(`/${config.spDir}`, spRouter)
```

পরিষেবা প্রদানকারী ডিরেক্টরিতে (`/sp`) রাউটারটি মাউন্ট করুন।

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

যদি কোনো ব্রাউজার রুট ডিরেক্টরি পাওয়ার চেষ্টা করে, তবে তাকে লগইন পৃষ্ঠার একটি লিঙ্ক দিন।

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

এই express অ্যাপ্লিকেশনটির সাথে `spPort`-এ শুনুন।

#### src/idp.mts

এটি হল পরিচয় প্রদানকারী। এটি পরিষেবা প্রদানকারীর মতোই, নীচের ব্যাখ্যাগুলি সেই অংশগুলির জন্য যা ভিন্ন।

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

পরিষেবা প্রদানকারীর কাছ থেকে আমরা যে XML অনুরোধটি পাই তা আমাদের পড়তে এবং বুঝতে হবে।

```typescript
const getLoginPage = requestId => `
```

এই ফাংশনটি স্বয়ংক্রিয়-জমা দেওয়া ফর্ম সহ পৃষ্ঠাটি তৈরি করে যা উপরের সিকোয়েন্স ডায়াগ্রামের ৪ নং ধাপে ফেরত দেওয়া হয়।

```typescript
<html>
  <head>
    <title>লগইন পৃষ্ঠা</title>
  </head>
  <body>
    <h2>লগইন পৃষ্ঠা</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      ইমেল অ্যাড্রেস: <input name="email" />
      <br />
      <button type="Submit">
        পরিষেবা প্রদানকারীতে লগইন করুন
      </button>
```

আমরা পরিষেবা প্রদানকারীকে দুটি ফিল্ড পাঠাই:

1. যে `requestId`-তে আমরা প্রতিক্রিয়া জানাচ্ছি।
2. ব্যবহারকারীর শনাক্তকারী (আপাতত আমরা ব্যবহারকারীর দেওয়া ইমেল অ্যাড্রেস ব্যবহার করি)।

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

এটি উপরের সিকোয়েন্স ডায়াগ্রামের ৫ নং ধাপের জন্য হ্যান্ডলার। [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) লগইন প্রতিক্রিয়া তৈরি করে।

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

অডিয়েন্স হল পরিষেবা প্রদানকারী।

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

অনুরোধ থেকে নিষ্কাশিত তথ্য। অনুরোধে আমাদের যে একটি প্যারামিটার নিয়ে চিন্তা করতে হয় তা হল requestId, যা পরিষেবা প্রদানকারীকে অনুরোধ এবং তাদের প্রতিক্রিয়াগুলির সাথে মেলাতে দেয়।

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

প্রতিক্রিয়া স্বাক্ষর করার জন্য ডেটা পেতে আমাদের `signingKey` প্রয়োজন। পরিষেবা প্রদানকারী স্বাক্ষরবিহীন অনুরোধ বিশ্বাস করে না।

```typescript
    },
    "post",
    {
      email: req.body.email
```

এটি হল সেই ফিল্ড যেখানে ব্যবহারকারীর তথ্য থাকে যা আমরা পরিষেবা প্রদানকারীকে ফেরত পাঠাই।

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

আবার, একটি স্বয়ংক্রিয়ভাবে জমা দেওয়া ফর্ম ব্যবহার করুন। এটি উপরের সিকোয়েন্স ডায়াগ্রামের ৬ নং ধাপ।

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

এটি সেই এন্ডপয়েন্ট যা পরিষেবা প্রদানকারীর কাছ থেকে একটি লগইন অনুরোধ গ্রহণ করে। এটি উপরের সিকোয়েন্স ডায়াগ্রামের ৩ নং ধাপের হ্যান্ডলার।

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

প্রমাণীকরণ অনুরোধের আইডি পড়ার জন্য আমাদের [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) ব্যবহার করতে পারা উচিত। তবে, আমি এটি কাজ করাতে পারিনি এবং এর উপর অনেক সময় ব্যয় করা সার্থক ছিল না তাই আমি শুধু একটি [সাধারণ-উদ্দেশ্যের XML পার্সার](https://www.npmjs.com/package/fast-xml-parser) ব্যবহার করেছি। আমাদের যে তথ্য প্রয়োজন তা হল `<samlp:AuthnRequest>` ট্যাগের ভিতরের `ID` অ্যাট্রিবিউট, যা XML-এর শীর্ষ স্তরে রয়েছে।

## ইথেরিয়াম স্বাক্ষর ব্যবহার করা

এখন যেহেতু আমরা পরিষেবা প্রদানকারীর কাছে একজন ব্যবহারকারীর পরিচয় পাঠাতে পারি, পরবর্তী পদক্ষেপ হল বিশ্বস্ত উপায়ে ব্যবহারকারীর পরিচয় সংগ্রহ করা। Viem আমাদের শুধু ওয়ালেট থেকে ব্যবহারকারীর অ্যাড্রেস জিজ্ঞাসা করার অনুমতি দেয়, কিন্তু এর মানে হল ব্রাউজার থেকে তথ্য চাওয়া। আমরা ব্রাউজার নিয়ন্ত্রণ করি না, তাই আমরা এর থেকে প্রাপ্ত প্রতিক্রিয়াকে স্বয়ংক্রিয়ভাবে বিশ্বাস করতে পারি না।

এর পরিবর্তে, IdP ব্রাউজারকে স্বাক্ষর করার জন্য একটি স্ট্রিং পাঠাবে। যদি ব্রাউজারের ওয়ালেটটি এই স্ট্রিংটি স্বাক্ষর করে, তার মানে হল এটি সত্যিই সেই অ্যাড্রেস (অর্থাৎ, এটি সেই প্রাইভেট কী জানে যা অ্যাড্রেসের সাথে সম্পর্কিত)।

এটি কার্যকর দেখতে, বিদ্যমান IdP এবং SP বন্ধ করুন এবং এই কমান্ডগুলি চালান:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

তারপর [SP-তে](http://localhost:3000) ব্রাউজ করুন এবং নির্দেশাবলী অনুসরণ করুন।

মনে রাখবেন যে এই মুহূর্তে আমরা জানি না কিভাবে ইথেরিয়াম অ্যাড্রেস থেকে ইমেল অ্যাড্রেস পেতে হয়, তাই এর পরিবর্তে আমরা SP-কে `<ethereum address>@bad.email.address` রিপোর্ট করি।

### বিস্তারিত ব্যাখ্যা

পরিবর্তনগুলি আগের ডায়াগ্রামের ৪-৫ নং ধাপে রয়েছে।

![একটি ইথেরিয়াম স্বাক্ষরসহ SAML](./fig-05-saml-w-signature.png)

আমরা শুধুমাত্র `idp.mts` ফাইলটি পরিবর্তন করেছি। এখানে পরিবর্তিত অংশগুলি দেওয়া হল।

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

আমাদের এই দুটি অতিরিক্ত লাইব্রেরি প্রয়োজন। আমরা [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce) মান তৈরি করতে [`uuid`](https://www.npmjs.com/package/uuid) ব্যবহার করি। মানটি নিজেই গুরুত্বপূর্ণ নয়, শুধু এটি একবারই ব্যবহৃত হয়।

[`viem`](https://viem.sh/) লাইব্রেরি আমাদের ইথেরিয়াম সংজ্ঞা ব্যবহার করতে দেয়। এখানে আমাদের এটি প্রয়োজন স্বাক্ষরটি সত্যিই বৈধ কিনা তা যাচাই করার জন্য।

```typescript
const loginPrompt = "পরিষেবা প্রদানকারীতে অ্যাক্সেস করতে, এই ননসে স্বাক্ষর করুন: "
```

ওয়ালেটটি বার্তাটিতে স্বাক্ষর করার জন্য ব্যবহারকারীর কাছে অনুমতি চায়। একটি বার্তা যা শুধুমাত্র একটি নন্স, তা ব্যবহারকারীদের বিভ্রান্ত করতে পারে, তাই আমরা এই প্রম্পটটি অন্তর্ভুক্ত করি।

```typescript
// Keep requestIDs here
let nonces = {}
```

এটিতে প্রতিক্রিয়া জানাতে আমাদের অনুরোধের তথ্য প্রয়োজন। আমরা এটি অনুরোধের সাথে পাঠাতে পারি (ধাপ 4), এবং এটি ফেরত পেতে পারি (ধাপ 5)। তবে, আমরা ব্রাউজার থেকে প্রাপ্ত তথ্য বিশ্বাস করতে পারি না, যা একজন সম্ভাব্য প্রতিকূল ব্যবহারকারীর নিয়ন্ত্রণে থাকে। তাই এটি এখানে সংরক্ষণ করা ভাল, নন্সকে কী হিসাবে ব্যবহার করে।

মনে রাখবেন যে আমরা সরলতার জন্য এটি এখানে একটি ভেরিয়েবল হিসাবে করছি। তবে, এর বেশ কিছু অসুবিধা রয়েছে:

- আমরা পরিষেবা অস্বীকার (denial of service) আক্রমণের জন্য ঝুঁকিপূর্ণ। একজন ক্ষতিকারক ব্যবহারকারী একাধিকবার লগ অন করার চেষ্টা করতে পারে, যা আমাদের মেমরি পূর্ণ করে দেবে।
- যদি IdP প্রক্রিয়াটি পুনরায় চালু করার প্রয়োজন হয়, আমরা বিদ্যমান মানগুলি হারিয়ে ফেলি।
- আমরা একাধিক প্রক্রিয়ার মধ্যে লোড ব্যালেন্স করতে পারি না, কারণ প্রতিটির নিজস্ব ভেরিয়েবল থাকবে।

একটি প্রোডাকশন সিস্টেমে আমরা একটি ডেটাবেস ব্যবহার করব এবং কোনো ধরনের মেয়াদোত্তীর্ণের ব্যবস্থা প্রয়োগ করব।

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

একটি নন্স তৈরি করুন, এবং ভবিষ্যতের ব্যবহারের জন্য `requestId` সংরক্ষণ করুন।

```typescript
  return `
<html>
  <head>
    <script type="module">
```

পৃষ্ঠাটি লোড হলে এই জাভাস্ক্রিপ্টটি স্বয়ংক্রিয়ভাবে কার্যকর হয়।

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

আমাদের `viem` থেকে বেশ কয়েকটি ফাংশন প্রয়োজন।

```typescript
      if (!window.ethereum) {
          alert("অনুগ্রহ করে MetaMask বা একটি সামঞ্জস্যপূর্ণ ওয়ালেট ইনস্টল করুন এবং তারপরে পুনরায় লোড করুন")
      }
```

ব্রাউজারে একটি ওয়ালেট থাকলেই আমরা কাজ করতে পারি।

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

ওয়ালেট (`window.ethereum`) থেকে অ্যাকাউন্টের তালিকা অনুরোধ করুন। ধরুন অন্তত একটি আছে, এবং শুধুমাত্র প্রথমটি সংরক্ষণ করুন।

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ব্রাউজার ওয়ালেটের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি [ওয়ালেট ক্লায়েন্ট](https://viem.sh/docs/clients/wallet) তৈরি করুন।

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

ব্যবহারকারীকে একটি বার্তায় স্বাক্ষর করতে বলুন। যেহেতু এই সম্পূর্ণ HTML একটি [টেমপ্লেট স্ট্রিং](https://viem.sh/docs/clients/wallet)-এর মধ্যে রয়েছে, তাই আমরা idp প্রক্রিয়ায় সংজ্ঞায়িত ভেরিয়েবল ব্যবহার করতে পারি। এটি সিকোয়েন্স ডায়াগ্রামের ৪.৫ নং ধাপ।

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>`-এ পুনঃনির্দেশ করুন। এটি সিকোয়েন্স ডায়াগ্রামের ৫ নং ধাপ।

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

স্বাক্ষরটি ব্রাউজার দ্বারা ফেরত পাঠানো হয়, যা সম্ভাব্যভাবে ক্ষতিকারক হতে পারে (আপনাকে ব্রাউজারে `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` খোলা থেকে আটকানোর কিছু নেই)। অতএব, IdP প্রক্রিয়াটি খারাপ স্বাক্ষরগুলি সঠিকভাবে পরিচালনা করে কিনা তা যাচাই করা গুরুত্বপূর্ণ।

```typescript
    </script>
  </head>
  <body>
    <h2>অনুগ্রহ করে স্বাক্ষর করুন</h2>
    <button onClick="window.goodSignature()">
      একটি ভালো (বৈধ) স্বাক্ষর জমা দিন
    </button>
    <br/>
    <button onClick="window.badSignature()">
      একটি খারাপ (অবৈধ) স্বাক্ষর জমা দিন
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

এটি সিকোয়েন্স ডায়াগ্রামের ৫ নং ধাপের জন্য হ্যান্ডলার।

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

অনুরোধ আইডি পান, এবং `nonces` থেকে নন্সটি মুছে ফেলুন যাতে এটি পুনরায় ব্যবহার করা না যায়।

```typescript
  try {
```

যেহেতু স্বাক্ষরটি অনেক উপায়ে অবৈধ হতে পারে, তাই আমরা এটিকে একটি `try ...`-তে মোড়ানো। `catch` ব্লকে কোনো থ্রো করা ত্রুটি ধরতে।

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

সিকোয়েন্স ডায়াগ্রামে ৫.৫ নং ধাপ বাস্তবায়ন করতে [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) ব্যবহার করুন।

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

হ্যান্ডলারের বাকি অংশটি পূর্বে `/loginSubmitted` হ্যান্ডলারে আমরা যা করেছি তার সমতুল্য, শুধুমাত্র একটি ছোট পরিবর্তন ছাড়া।

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

আমাদের কাছে আসল ইমেল অ্যাড্রেস নেই (আমরা এটি পরবর্তী বিভাগে পাব), তাই আপাতত আমরা ইথেরিয়াম অ্যাড্রেসটি ফেরত দিই এবং এটিকে স্পষ্টভাবে একটি ইমেল অ্যাড্রেস নয় বলে চিহ্নিত করি।

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

`getLoginPage`-এর পরিবর্তে, এখন ৩ নং ধাপের হ্যান্ডলারে `getSignaturePage` ব্যবহার করুন।

## ইমেল অ্যাড্রেস পাওয়া

পরবর্তী পদক্ষেপ হল ইমেল অ্যাড্রেস পাওয়া, যা পরিষেবা প্রদানকারীর দ্বারা অনুরোধ করা শনাক্তকারী। এটি করার জন্য, আমরা [ইথেরিয়াম অ্যাটেস্টেশন সার্ভিস (EAS)](https://attest.org/) ব্যবহার করি।

অ্যাটেস্টেশন পাওয়ার সবচেয়ে সহজ উপায় হল [GraphQL API](https://docs.attest.org/docs/developer-tools/api) ব্যবহার করা। আমরা এই কোয়েরিটি ব্যবহার করি:

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

এই [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977)-এ শুধু একটি ই-মেইল অ্যাড্রেস অন্তর্ভুক্ত থাকে। এই কোয়েরিটি এই স্কিমার অ্যাটেস্টেশনের জন্য জিজ্ঞাসা করে। অ্যাটেস্টেশনের বিষয়টিকে `recipient` বা প্রাপক বলা হয়। এটি সবসময় একটি ইথেরিয়াম অ্যাড্রেস।

সতর্কতা: আমরা এখানে যেভাবে অ্যাটেস্টেশন পাচ্ছি তাতে দুটি নিরাপত্তা সমস্যা রয়েছে।

- আমরা API এন্ডপয়েন্ট, `https://optimism.easscan.org/graphql`-এ যাচ্ছি, যা একটি কেন্দ্রীভূত উপাদান। আমরা `id` অ্যাট্রিবিউট পেতে পারি এবং তারপর একটি অ্যাটেস্টেশন আসল কিনা তা যাচাই করার জন্য একটি অনচেইন লুকআপ করতে পারি, কিন্তু API এন্ডপয়েন্টটি আমাদের তাদের সম্পর্কে না বলে এখনও অ্যাটেস্টেশন সেন্সর করতে পারে।

  এই সমস্যাটি সমাধান করা অসম্ভব নয়, আমরা আমাদের নিজস্ব GraphQL এন্ডপয়েন্ট চালাতে পারি এবং চেইন লগ থেকে অ্যাটেস্টেশন পেতে পারি, কিন্তু তা আমাদের উদ্দেশ্যের জন্য অতিরিক্ত।

- আমরা অ্যাটেস্টরের পরিচয় দেখি না। যেকেউ আমাদের মিথ্যা তথ্য খাওয়াতে পারে। একটি বাস্তব-বিশ্বের বাস্তবায়নে আমাদের বিশ্বস্ত অ্যাটেস্টরদের একটি সেট থাকত এবং শুধুমাত্র তাদের অ্যাটেস্টেশনগুলি দেখতাম।

এটি কার্যকর দেখতে, বিদ্যমান IdP এবং SP বন্ধ করুন এবং এই কমান্ডগুলি চালান:

```sh
git checkout email-address
pnpm install
pnpm start
```

তারপর আপনার ই-মেইল অ্যাড্রেস দিন। আপনার কাছে এটি করার দুটি উপায় আছে:

- একটি প্রাইভেট কী ব্যবহার করে একটি ওয়ালেট আমদানি করুন, এবং টেস্টিং প্রাইভেট কী `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` ব্যবহার করুন।

- আপনার নিজের ই-মেইল অ্যাড্রেসের জন্য একটি অ্যাটেস্টেশন যোগ করুন:

  1. অ্যাটেস্টেশন এক্সপ্লোরারে [স্কিমাতে](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ব্রাউজ করুন।

  2. **স্কিমা দিয়ে অ্যাটেস্ট করুন**-এ ক্লিক করুন।

  3. প্রাপক হিসাবে আপনার ইথেরিয়াম অ্যাড্রেস, ইমেল অ্যাড্রেস হিসাবে আপনার ই-মেইল অ্যাড্রেস লিখুন এবং **অনচেইন** নির্বাচন করুন। তারপর **অ্যাটেস্টেশন তৈরি করুন**-এ ক্লিক করুন।

  4. আপনার ওয়ালেটে লেনদেনটি অনুমোদন করুন। গ্যাসের জন্য অর্থ প্রদান করতে আপনার [অপটিমিজম ব্লকচেইনে](https://app.optimism.io/bridge/deposit) কিছু ETH লাগবে।

যাই হোক, এটি করার পর [http://localhost:3000](http://localhost:3000) তে ব্রাউজ করুন এবং নির্দেশাবলী অনুসরণ করুন। আপনি যদি টেস্টিং প্রাইভেট কী আমদানি করে থাকেন, তাহলে আপনি যে ই-মেইলটি পাবেন তা হল `test_addr_0@example.com`। আপনি যদি নিজের অ্যাড্রেস ব্যবহার করে থাকেন, তাহলে এটি তাই হবে যা আপনি প্রত্যয়িত করেছেন।

### বিস্তারিত ব্যাখ্যা

![ইথেরিয়াম অ্যাড্রেস থেকে ই-মেইলে যাওয়া](./fig-06-saml-sig-n-email.png)

নতুন ধাপগুলি হল GraphQL কমিউনিকেশন, ধাপ ৫.৬ এবং ৫.৭।

আবার, এখানে `idp.mts`-এর পরিবর্তিত অংশগুলি দেওয়া হল।

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

আমাদের প্রয়োজনীয় লাইব্রেরিগুলি আমদানি করুন।

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[প্রতিটি ব্লকচেইনের জন্য একটি পৃথক এন্ডপয়েন্ট](https://docs.attest.org/docs/developer-tools/api) রয়েছে।

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

একটি নতুন `GraphQLClient` ক্লায়েন্ট তৈরি করুন যা আমরা এন্ডপয়েন্ট কোয়েরি করার জন্য ব্যবহার করতে পারি।

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL আমাদের শুধু বাইট সহ একটি অস্বচ্ছ ডেটা অবজেক্ট দেয়। এটি বুঝতে আমাদের স্কিমা প্রয়োজন।

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

একটি ইথেরিয়াম অ্যাড্রেস থেকে একটি ই-মেইল অ্যাড্রেসে যাওয়ার জন্য একটি ফাংশন।

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

এটি একটি GraphQL কোয়েরি।

```typescript
      attestations(
```

আমরা অ্যাটেস্টেশন খুঁজছি।

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

আমরা যে অ্যাটেস্টেশনগুলি চাই তা হল আমাদের স্কিমার মধ্যে থাকা অ্যাটেস্টেশন, যেখানে প্রাপক হল `getAddress(ethAddr)`। [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) ফাংশনটি নিশ্চিত করে যে আমাদের অ্যাড্রেসে সঠিক [চেকসাম](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) আছে। GraphQL কেস-সিগনিফিকেন্ট হওয়ায় এটি প্রয়োজনীয়। `0xBAD060A7`, `0xBad060A7`, এবং `0xbad060a7` ভিন্ন মান।

```typescript
        take: 1
```

আমরা যতগুলিই অ্যাটেস্টেশন পাই না কেন, আমরা শুধুমাত্র প্রথমটি চাই।

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

আমরা যে ফিল্ডগুলি পেতে চাই।

- `attester`: যে অ্যাড্রেসটি অ্যাটেস্টেশন জমা দিয়েছে। সাধারণত এটি অ্যাটেস্টেশনটি বিশ্বাস করা হবে কি না তা সিদ্ধান্ত নিতে ব্যবহৃত হয়।
- `id`: অ্যাটেস্টেশন আইডি। GraphQL কোয়েরি থেকে প্রাপ্ত তথ্য সঠিক কিনা তা যাচাই করতে আপনি এই মানটি ব্যবহার করে [অনচেইনে অ্যাটেস্টেশনটি পড়তে](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) পারেন।
- `data`: স্কিমা ডেটা (এই ক্ষেত্রে, ই-মেইল অ্যাড্রেস)।

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

যদি কোনো অ্যাটেস্টেশন না থাকে, তাহলে এমন একটি মান ফেরত দিন যা স্পষ্টতই ভুল, কিন্তু যা পরিষেবা প্রদানকারীর কাছে বৈধ বলে মনে হবে।

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

যদি কোনো মান থাকে, তাহলে ডেটা ডিকোড করতে `decodeData` ব্যবহার করুন। আমাদের এর প্রদত্ত মেটাডেটার প্রয়োজন নেই, শুধু মানটিই প্রয়োজন।

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

ই-মেইল অ্যাড্রেস পেতে নতুন ফাংশনটি ব্যবহার করুন।

## বিকেন্দ্রীকরণ সম্পর্কে কী?

এই কনফিগারেশনে ব্যবহারকারীরা এমন কেউ হওয়ার ভান করতে পারে না যা তারা নয়, যতক্ষণ না আমরা ইথেরিয়াম থেকে ই-মেইল অ্যাড্রেস ম্যাপিংয়ের জন্য বিশ্বস্ত অ্যাটেস্টরদের উপর নির্ভর করি। তবে, আমাদের পরিচয় প্রদানকারী এখনও একটি কেন্দ্রীভূত উপাদান। পরিচয় প্রদানকারীর প্রাইভেট কী যার কাছে আছে, সে পরিষেবা প্রদানকারীর কাছে মিথ্যা তথ্য পাঠাতে পারে।

[মাল্টি-পার্টি কম্পিউটেশন (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ব্যবহার করে একটি সমাধান থাকতে পারে। আমি আশা করি ভবিষ্যতে একটি টিউটোরিয়ালে এটি নিয়ে লিখব।

## উপসংহার

ইথেরিয়াম স্বাক্ষরের মতো একটি লগ অন স্ট্যান্ডার্ড গ্রহণ করা একটি মুরগি ও ডিমের সমস্যার সম্মুখীন হয়। পরিষেবা প্রদানকারীরা সম্ভাব্য বিস্তৃত বাজারে আবেদন করতে চায়। ব্যবহারকারীরা তাদের লগ অন স্ট্যান্ডার্ড সমর্থন করার বিষয়ে চিন্তা না করে পরিষেবাগুলি অ্যাক্সেস করতে সক্ষম হতে চায়।
ইথেরিয়াম IdP-এর মতো অ্যাডাপ্টার তৈরি করা আমাদের এই বাধা অতিক্রম করতে সাহায্য করতে পারে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
