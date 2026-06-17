---
title: वेब२ प्रमाणीकरणासाठी इथेरियम वापरणे
description: हे ट्युटोरिअल वाचल्यानंतर, डेव्हलपर इथेरियम लॉगिन (web3) ला SAML लॉगिनसोबत एकत्रित करू शकेल, जे वेब२ मध्ये सिंगल साईन-ऑन आणि इतर संबंधित सेवा प्रदान करण्यासाठी वापरले जाणारे एक मानक आहे. यामुळे वेब२ संसाधनांचा अ‍ॅक्सेस इथेरियम स्वाक्षऱ्यांद्वारे प्रमाणित केला जाऊ शकतो, ज्यामध्ये वापरकर्त्याचे गुणधर्म साक्षांकनातून येतात.
author: ओरी पोमेरँट्झ
tags: ["वेब२", "प्रमाणीकरण", "EAS"]
skill: beginner
breadcrumb: वेब२ प्रमाणीकरणासाठी इथेरियम
lang: mr
published: 2025-04-30
---

## परिचय {#introduction}

[SAML](https://www.onelogin.com/learn/saml) हे वेब२ वर वापरले जाणारे एक मानक आहे जे [ओळख प्रदाता (identity provider - IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) ला [सेवा प्रदात्यांसाठी (service providers - SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) वापरकर्त्याची माहिती प्रदान करण्यास अनुमती देते).

या ट्युटोरिअलमध्ये तुम्ही इथेरियम स्वाक्षऱ्या SAML सोबत कशा एकत्रित करायच्या हे शिकाल, जेणेकरून वापरकर्ते त्यांच्या इथेरियम वॉलेटचा वापर करून स्वतःला अशा वेब२ सेवांवर प्रमाणित करू शकतील ज्या अद्याप मूळतः इथेरियमला सपोर्ट करत नाहीत.

लक्षात घ्या की हे ट्युटोरिअल दोन वेगवेगळ्या प्रेक्षकांसाठी लिहिले आहे:

- इथेरियमचे लोक ज्यांना इथेरियम समजते आणि त्यांना SAML शिकण्याची आवश्यकता आहे
- वेब२ चे लोक ज्यांना SAML आणि वेब२ प्रमाणीकरण समजते आणि त्यांना इथेरियम शिकण्याची आवश्यकता आहे

परिणामी, यात बरीच परिचयात्मक माहिती असेल जी तुम्हाला आधीच माहित असू शकते. ती वगळण्यास संकोच करू नका.

### इथेरियमच्या लोकांसाठी SAML {#saml-for-ethereum-people}

SAML हा एक केंद्रित प्रोटोकॉल आहे. सेवा प्रदाता (SP) ओळख प्रदात्याकडून (IdP) केवळ तेव्हाच दृढकथने (assertions) (जसे की "हा माझा वापरकर्ता जॉन आहे, त्याला A, B आणि C करण्याची परवानगी असावी") स्वीकारतो जेव्हा त्याचा त्या IdP सोबत किंवा त्या IdP च्या प्रमाणपत्रावर स्वाक्षरी करणाऱ्या [प्रमाणपत्र प्राधिकरणासोबत (certificate authority)](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) आधीपासूनच विश्वासाचा संबंध असतो.

उदाहरणार्थ, SP ही कंपन्यांना प्रवास सेवा पुरवणारी ट्रॅव्हल एजन्सी असू शकते आणि IdP ही कंपनीची अंतर्गत वेबसाइट असू शकते. जेव्हा कर्मचाऱ्यांना व्यावसायिक प्रवासाचे बुकिंग करायचे असते, तेव्हा ट्रॅव्हल एजन्सी त्यांना प्रत्यक्ष प्रवास बुक करू देण्यापूर्वी कंपनीद्वारे प्रमाणीकरणासाठी पाठवते.

![Step by step SAML process](./fig-01-saml.png)

अशा प्रकारे ब्राउझर, SP आणि IdP या तीन संस्था अ‍ॅक्सेससाठी वाटाघाटी करतात. SP ला ब्राउझर वापरणाऱ्या वापरकर्त्याबद्दल आगाऊ काहीही माहिती असण्याची आवश्यकता नसते, फक्त IdP वर विश्वास ठेवणे आवश्यक असते.

### SAML च्या लोकांसाठी इथेरियम {#ethereum-for-saml-people}

इथेरियम ही एक विकेंद्रित प्रणाली आहे. 

![Ethereum logon](./fig-02-eth-logon.png)

वापरकर्त्यांकडे एक खाजगी की असते (जी सामान्यतः ब्राउझर एक्स्टेंशनमध्ये ठेवली जाते). खाजगी की वरून तुम्ही सार्वजनिक की मिळवू शकता आणि त्यावरून 20-बाइटचा पत्ता मिळवू शकता. जेव्हा वापरकर्त्यांना सिस्टममध्ये लॉग इन करायचे असते, तेव्हा त्यांना नॉन्स (एकदाच वापरले जाणारे मूल्य) असलेल्या संदेशावर स्वाक्षरी करण्याची विनंती केली जाते. सर्व्हर पडताळणी करू शकतो की स्वाक्षरी त्याच पत्त्याद्वारे तयार केली गेली होती.

![Getting extra data from attestations](./fig-03-eas-data.png)

स्वाक्षरी केवळ इथेरियम पत्त्याची पडताळणी करते. वापरकर्त्याचे इतर गुणधर्म मिळवण्यासाठी, तुम्ही सामान्यतः [साक्षांकने (attestations)](https://attest.org/) वापरता. साक्षांकनामध्ये सामान्यतः ही क्षेत्रे (fields) असतात:

- **साक्षांकनकर्ता (Attestor)**, ज्या पत्त्याने साक्षांकन केले आहे
- **प्राप्तकर्ता (Recipient)**, ज्या पत्त्यावर साक्षांकन लागू होते
- **डेटा (Data)**, ज्या डेटाचे साक्षांकन केले जात आहे, जसे की नाव, परवानग्या इ.
- **स्कीमा (Schema)**, डेटाचा अर्थ लावण्यासाठी वापरल्या जाणाऱ्या स्कीमाचा ID.

इथेरियमच्या विकेंद्रित स्वरूपामुळे, कोणताही वापरकर्ता साक्षांकने करू शकतो. कोणती साक्षांकने आपण विश्वसनीय मानतो हे ओळखण्यासाठी साक्षांकनकर्त्याची ओळख महत्त्वाची असते.

## सेटअप {#setup}

पहिली पायरी म्हणजे SAML SP आणि SAML IdP यांच्यात एकमेकांशी संवाद प्रस्थापित करणे.

1. सॉफ्टवेअर डाउनलोड करा. या लेखासाठी नमुना सॉफ्टवेअर [GitHub वर](https://github.com/qbzzt/250420-saml-ethereum) उपलब्ध आहे. वेगवेगळे टप्पे वेगवेगळ्या शाखांमध्ये (branches) साठवले आहेत, या टप्प्यासाठी तुम्हाला `saml-only` आवश्यक आहे.

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. सेल्फ-साईन्ड प्रमाणपत्रांसह की तयार करा. याचा अर्थ असा की ही की स्वतःच तिचे प्रमाणपत्र प्राधिकरण आहे आणि ती सेवा प्रदात्याकडे मॅन्युअली इम्पोर्ट करणे आवश्यक आहे. अधिक माहितीसाठी [OpenSSL चे दस्तऐवज](https://docs.openssl.org/master/man1/openssl-req/) पहा. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. सर्व्हर सुरू करा (SP आणि IdP दोन्ही)

    ```sh
    pnpm start
    ```

4. [http://localhost:3000/](http://localhost:3000/) या URL वर SP ब्राउझ करा आणि IdP (पोर्ट 3001) वर पुनर्निर्देशित (redirect) होण्यासाठी बटणावर क्लिक करा.

5. IdP ला तुमचा ईमेल पत्ता द्या आणि **Login to the service provider** वर क्लिक करा. पहा की तुम्हाला परत सेवा प्रदात्याकडे (पोर्ट 3000) पुनर्निर्देशित केले जाते आणि तो तुम्हाला तुमच्या ईमेल पत्त्यावरून ओळखतो.

### सविस्तर स्पष्टीकरण {#detailed-explanation}

हे टप्प्याटप्प्याने कसे घडते ते येथे दिले आहे:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

या फाईलमध्ये ओळख प्रदाता आणि सेवा प्रदाता या दोन्हींसाठी कॉन्फिगरेशन आहे. सामान्यतः या दोन वेगवेगळ्या संस्था असतात, परंतु येथे साधेपणासाठी आपण कोड शेअर करू शकतो.

```typescript
const fs = await import("fs")

const protocol="http"
```

सध्या आपण फक्त चाचणी करत आहोत, त्यामुळे HTTP वापरणे ठीक आहे.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

सार्वजनिक की वाचा, ज्या सामान्यतः दोन्ही घटकांसाठी उपलब्ध असतात (आणि एकतर थेट विश्वासार्ह असतात किंवा विश्वासार्ह प्रमाणपत्र प्राधिकरणाद्वारे स्वाक्षरी केलेल्या असतात).

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

दोन्ही घटकांसाठी URL.

```typescript
export const spPublicData = {
```

सेवा प्रदात्यासाठी सार्वजनिक डेटा.

```typescript
    entityID: `${spUrl}/metadata`,
```

प्रथेनुसार, SAML मध्ये `entityID` ही अशी URL असते जिथे संस्थेचा मेटाडेटा उपलब्ध असतो. हा मेटाडेटा येथील सार्वजनिक डेटाशी संबंधित असतो, फक्त तो XML स्वरूपात असतो.

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

आपल्या उद्देशांसाठी सर्वात महत्त्वाची व्याख्या `assertionConsumerServer` ही आहे. याचा अर्थ असा की सेवा प्रदात्याला काहीतरी दृढकथन करण्यासाठी (उदाहरणार्थ, "जो वापरकर्ता तुम्हाला ही माहिती पाठवत आहे तो somebody@example.com आहे") आपल्याला `http://localhost:3000/sp/assertion` या URL वर [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) वापरण्याची आवश्यकता आहे.

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

ओळख प्रदात्याचा सार्वजनिक डेटाही असाच असतो. हे निर्दिष्ट करते की वापरकर्त्याला लॉग इन करण्यासाठी तुम्ही `http://localhost:3001/idp/login` वर POST करता आणि वापरकर्त्याला लॉग आउट करण्यासाठी तुम्ही `http://localhost:3001/idp/logout` वर POST करता.

#### src/sp.mts {#srcspmts}

हा तो कोड आहे जो सेवा प्रदात्याची अंमलबजावणी करतो.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAML ची अंमलबजावणी करण्यासाठी आपण [`samlify`](https://www.npmjs.com/package/samlify) लायब्ररी वापरतो.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` लायब्ररीला अशी अपेक्षा असते की XML योग्य आहे, अपेक्षित सार्वजनिक की ने स्वाक्षरी केलेले आहे इत्यादी प्रमाणित करण्यासाठी एक पॅकेज असावे. या उद्देशासाठी आपण [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) वापरतो.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) ही एक "मिनी वेब साइट" आहे जी वेब साइटच्या आत माउंट केली जाऊ शकते. या प्रकरणात, आपण सेवा प्रदात्याच्या सर्व व्याख्या एकत्र करण्यासाठी त्याचा वापर करतो.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

सेवा प्रदात्याचे स्वतःचे सादरीकरण म्हणजे सर्व सार्वजनिक डेटा आणि माहितीवर स्वाक्षरी करण्यासाठी तो वापरत असलेली खाजगी की.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

सार्वजनिक डेटामध्ये सेवा प्रदात्याला ओळख प्रदात्याबद्दल माहित असणे आवश्यक असलेली प्रत्येक गोष्ट असते.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

इतर SAML घटकांसोबत आंतरकार्यक्षमता सक्षम करण्यासाठी, सेवा आणि ओळख प्रदात्यांचा सार्वजनिक डेटा (ज्याला मेटाडेटा म्हणतात) `/metadata` मध्ये XML स्वरूपात उपलब्ध असावा.

```typescript
spRouter.post(`/assertion`,
```

स्वतःची ओळख पटवण्यासाठी ब्राउझरद्वारे अ‍ॅक्सेस केले जाणारे हे पेज आहे. दृढकथनामध्ये वापरकर्ता आयडेंटिफायर (येथे आपण ईमेल पत्ता वापरतो) समाविष्ट असतो आणि त्यात अतिरिक्त गुणधर्म समाविष्ट असू शकतात. वरील अनुक्रम आकृतीमधील (sequence diagram) पायरी 7 साठी हा हँडलर आहे.

```typescript
  async (req, res) => {
    // console.log(`SAML प्रतिसाद:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

दृढकथनामध्ये प्रदान केलेला XML डेटा पाहण्यासाठी तुम्ही कमेंट आऊट केलेली कमांड वापरू शकता. तो [base64 एन्कोड केलेला](https://en.wikipedia.org/wiki/Base64) असतो.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

ओळख सर्व्हरकडून आलेली लॉगिन विनंती पार्स करा.

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

वापरकर्त्याला आपल्याला लॉगिन मिळाले आहे हे दाखवण्यासाठी HTML प्रतिसाद पाठवा.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

अयशस्वी झाल्यास वापरकर्त्याला कळवा.

```typescript
spRouter.get('/login',
```

जेव्हा ब्राउझर हे पेज मिळवण्याचा प्रयत्न करतो तेव्हा लॉगिन विनंती तयार करा. वरील अनुक्रम आकृतीमधील पायरी 1 साठी हा हँडलर आहे.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

लॉगिन विनंती पोस्ट करण्यासाठी माहिती मिळवा.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

हे पेज फॉर्म (खाली पहा) आपोआप सबमिट करते. अशा प्रकारे पुनर्निर्देशित होण्यासाठी वापरकर्त्याला काहीही करावे लागत नाही. वरील अनुक्रम आकृतीमधील ही पायरी 2 आहे.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` वर पोस्ट करा (ओळख प्रदाता एंडपॉईंटची URL).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

इनपुटचे नाव `loginRequest.type` (`SAMLRequest`) आहे. त्या क्षेत्रासाठी सामग्री `loginRequest.context` आहे, जे पुन्हा base64 एन्कोड केलेले XML आहे.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[हे मिडलवेअर](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP विनंतीचा](https://www.tutorialspoint.com/http/http_requests.htm) मुख्य भाग (body) वाचते. डीफॉल्टनुसार express त्याकडे दुर्लक्ष करते, कारण बहुतांश विनंत्यांना त्याची आवश्यकता नसते. आपल्याला त्याची आवश्यकता आहे कारण POST मुख्य भाग वापरते.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

सेवा प्रदाता डिरेक्टरीमध्ये (`/sp`) राऊटर माउंट करा.

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

जर ब्राउझरने रूट डिरेक्टरी मिळवण्याचा प्रयत्न केला, तर त्याला लॉगिन पेजची लिंक द्या.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

या express अ‍ॅप्लिकेशनसह `spPort` ऐका.

#### src/idp.mts {#srcidpmts}

हा ओळख प्रदाता आहे. तो सेवा प्रदात्यासारखाच आहे, खालील स्पष्टीकरणे वेगळ्या असलेल्या भागांसाठी आहेत.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // गुणधर्म जतन करा
    attributeNamePrefix: "@_", // गुणधर्मांसाठी उपसर्ग
  }
)
```

आपल्याला सेवा प्रदात्याकडून प्राप्त होणारी XML विनंती वाचणे आणि समजून घेणे आवश्यक आहे.

```typescript
const getLoginPage = requestId => `
```

हे फंक्शन आपोआप सबमिट होणाऱ्या फॉर्मसह पेज तयार करते जे वरील अनुक्रम आकृतीच्या पायरी 4 मध्ये परत केले जाते.

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

आपण सेवा प्रदात्याला दोन क्षेत्रे पाठवतो:

1. `requestId` ज्याला आपण प्रतिसाद देत आहोत.
2. वापरकर्ता आयडेंटिफायर (सध्या आपण वापरकर्त्याने दिलेला ईमेल पत्ता वापरतो).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

वरील अनुक्रम आकृतीच्या पायरी 5 साठी हा हँडलर आहे. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) लॉगिन प्रतिसाद तयार करते. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

प्रेक्षक (audience) हा सेवा प्रदाता आहे.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

विनंतीमधून काढलेली माहिती. विनंतीमध्ये आपण ज्या एका पॅरामीटरची काळजी घेतो तो म्हणजे requestId, जो सेवा प्रदात्याला विनंत्या आणि त्यांचे प्रतिसाद जुळवण्यास मदत करतो.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // स्वाक्षरी सुनिश्चित करा
```

प्रतिसादावर स्वाक्षरी करण्यासाठी डेटा असण्यासाठी आपल्याला `signingKey` ची आवश्यकता आहे. सेवा प्रदाता स्वाक्षरी नसलेल्या विनंत्यांवर विश्वास ठेवत नाही.

```typescript
    },
    "post",
    {
      email: req.body.email
```

हे वापरकर्त्याच्या माहितीचे क्षेत्र आहे जे आपण सेवा प्रदात्याला परत पाठवतो.

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

पुन्हा, आपोआप सबमिट होणारा फॉर्म वापरा. वरील अनुक्रम आकृतीमधील ही पायरी 6 आहे.

```typescript

// लॉगिन विनंत्यांसाठी IdP एंडपॉइंट
idpRouter.post(`/login`,
```

हा तो एंडपॉईंट आहे जो सेवा प्रदात्याकडून लॉगिन विनंती प्राप्त करतो. वरील अनुक्रम आकृतीच्या पायरी 3 चा हा हँडलर आहे.

```typescript
  async (req, res) => {
    try {
      // पर्यायी मार्ग कारण मला parseLoginRequest कार्यान्वित करता आले नाही.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

प्रमाणीकरण विनंतीचा ID वाचण्यासाठी आपण [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) वापरण्यास सक्षम असावे. तथापि, मी ते कार्यान्वित करू शकलो नाही आणि त्यावर जास्त वेळ घालवणे योग्य नव्हते म्हणून मी फक्त एक [सामान्य-उद्देशीय XML पार्सर](https://www.npmjs.com/package/fast-xml-parser) वापरतो. आपल्याला आवश्यक असलेली माहिती `<samlp:AuthnRequest>` टॅगमधील `ID` गुणधर्म आहे, जो XML च्या शीर्ष स्तरावर आहे.

## इथेरियम स्वाक्षऱ्या वापरणे {#using-ethereum-signatures}

आता आपण सेवा प्रदात्याला वापरकर्त्याची ओळख पाठवू शकतो, पुढची पायरी म्हणजे वापरकर्त्याची ओळख विश्वासार्ह पद्धतीने मिळवणे. Viem आपल्याला वापरकर्त्याच्या पत्त्यासाठी फक्त वॉलेटला विचारण्याची अनुमती देते, परंतु याचा अर्थ माहितीसाठी ब्राउझरला विचारणे असा होतो. आपले ब्राउझरवर नियंत्रण नसते, त्यामुळे आपण त्याकडून मिळणाऱ्या प्रतिसादावर आपोआप विश्वास ठेवू शकत नाही.

त्याऐवजी, IdP ब्राउझरला स्वाक्षरी करण्यासाठी एक स्ट्रिंग पाठवणार आहे. जर ब्राउझरमधील वॉलेट या स्ट्रिंगवर स्वाक्षरी करत असेल, तर याचा अर्थ असा की तो खरोखरच तो पत्ता आहे (म्हणजेच, त्याला त्या पत्त्याशी संबंधित खाजगी की माहित आहे).

हे कृतीत पाहण्यासाठी, विद्यमान IdP आणि SP थांबवा आणि या कमांड्स चालवा:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

त्यानंतर [SP वर](http://localhost:3000) ब्राउझ करा आणि सूचनांचे पालन करा.

लक्षात घ्या की या टप्प्यावर आपल्याला इथेरियम पत्त्यावरून ईमेल पत्ता कसा मिळवायचा हे माहित नाही, त्यामुळे त्याऐवजी आपण SP ला `<ethereum address>@bad.email.address` कळवतो.

### सविस्तर स्पष्टीकरण {#detailed-explanation-2}

मागील आकृतीमधील पायऱ्या 4-5 मध्ये बदल आहेत.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

आपण बदललेली एकमेव फाईल `idp.mts` आहे. येथे बदललेले भाग आहेत.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

आपल्याला या दोन अतिरिक्त लायब्ररींची आवश्यकता आहे. आपण [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) मूल्य तयार करण्यासाठी [`uuid`](https://www.npmjs.com/package/uuid) वापरतो. मूल्य स्वतः महत्त्वाचे नसते, फक्त ते एकदाच वापरले जाते ही वस्तुस्थिती महत्त्वाची असते.

[`viem`](https://viem.sh/) लायब्ररी आपल्याला इथेरियम व्याख्या वापरू देते. येथे स्वाक्षरी खरोखरच वैध आहे हे पडताळण्यासाठी आपल्याला त्याची आवश्यकता आहे.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

वॉलेट वापरकर्त्याला संदेशावर स्वाक्षरी करण्यासाठी परवानगी मागतो. केवळ नॉन्स असलेला संदेश वापरकर्त्यांना गोंधळात टाकू शकतो, म्हणून आपण हा प्रॉम्प्ट समाविष्ट करतो.

```typescript
// requestIDs येथे ठेवा
let nonces = {}
```

विनंतीला प्रतिसाद देण्यास सक्षम होण्यासाठी आपल्याला विनंतीच्या माहितीची आवश्यकता आहे. आपण ती विनंतीसोबत पाठवू शकतो (पायरी 4), आणि ती परत मिळवू शकतो (पायरी 5). तथापि, आपण ब्राउझरकडून मिळणाऱ्या माहितीवर विश्वास ठेवू शकत नाही, जे संभाव्यतः प्रतिकूल वापरकर्त्याच्या नियंत्रणाखाली असते. त्यामुळे नॉन्सला की म्हणून वापरून ती येथे साठवणे अधिक चांगले आहे.

लक्षात घ्या की साधेपणासाठी आपण येथे हे व्हेरिएबल म्हणून करत आहोत. तथापि, याचे अनेक तोटे आहेत:

- आपण डिनायल ऑफ सर्व्हिस (denial of service) हल्ल्यास असुरक्षित आहोत. एखादा दुर्भावनापूर्ण वापरकर्ता अनेक वेळा लॉग इन करण्याचा प्रयत्न करू शकतो, ज्यामुळे आपली मेमरी भरू शकते.
- जर IdP प्रक्रिया रीस्टार्ट करण्याची आवश्यकता असेल, तर आपण विद्यमान मूल्ये गमावतो.
- आपण एकाधिक प्रक्रियांमध्ये लोड बॅलन्स करू शकत नाही, कारण प्रत्येकाचे स्वतःचे व्हेरिएबल असेल.

प्रॉडक्शन सिस्टमवर आपण डेटाबेस वापरू आणि काही प्रकारची एक्सपायरी यंत्रणा लागू करू.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

एक नॉन्स तयार करा आणि भविष्यातील वापरासाठी `requestId` साठवा.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

जेव्हा पेज लोड होते तेव्हा हे JavaScript आपोआप कार्यान्वित होते.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

आपल्याला `viem` मधील अनेक फंक्शन्सची आवश्यकता आहे.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

जर ब्राउझरवर वॉलेट असेल तरच आपण काम करू शकतो.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

वॉलेटकडून खात्यांच्या सूचीची विनंती करा (`window.ethereum`). असे गृहीत धरा की किमान एक खाते आहे आणि फक्त पहिले खाते साठवा. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ब्राउझर वॉलेटशी संवाद साधण्यासाठी एक [वॉलेट क्लायंट](https://viem.sh/docs/clients/wallet) तयार करा.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

वापरकर्त्याला संदेशावर स्वाक्षरी करण्यास सांगा. कारण हे संपूर्ण HTML एका [टेम्पलेट स्ट्रिंगमध्ये](https://viem.sh/docs/clients/wallet) आहे, आपण idp प्रक्रियेत परिभाषित केलेले व्हेरिएबल्स वापरू शकतो. अनुक्रम आकृतीमधील ही पायरी 4.5 आहे.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` वर पुनर्निर्देशित करा. अनुक्रम आकृतीमधील ही पायरी 5 आहे.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

स्वाक्षरी ब्राउझरद्वारे परत पाठविली जाते, जी संभाव्यतः दुर्भावनापूर्ण असू शकते (तुम्हाला ब्राउझरमध्ये फक्त `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` उघडण्यापासून रोखण्यासाठी काहीही नाही). म्हणून, IdP प्रक्रिया चुकीच्या स्वाक्षऱ्या योग्यरित्या हाताळते की नाही हे पडताळणे महत्त्वाचे आहे.

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

उर्वरित फक्त मानक HTML आहे.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

अनुक्रम आकृतीमधील पायरी 5 साठी हा हँडलर आहे.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

विनंती ID मिळवा आणि तो पुन्हा वापरला जाऊ शकत नाही याची खात्री करण्यासाठी `nonces` मधून नॉन्स हटवा.

```typescript
  try {
```

स्वाक्षरी अवैध असण्याचे अनेक मार्ग असल्यामुळे, कोणत्याही त्रुटी पकडण्यासाठी आपण याला `try ... catch` ब्लॉकमध्ये गुंडाळतो.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

अनुक्रम आकृतीमधील पायरी 5.5 ची अंमलबजावणी करण्यासाठी [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) वापरा.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

एका छोट्या बदलाचा अपवाद वगळता, उर्वरित हँडलर आपण यापूर्वी `/loginSubmitted` हँडलरमध्ये जे केले आहे त्याच्या समतुल्य आहे.

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

आपल्याकडे प्रत्यक्ष ईमेल पत्ता नाही (तो आपल्याला पुढील विभागात मिळेल), त्यामुळे सध्या आपण इथेरियम पत्ता परत करतो आणि तो ईमेल पत्ता नाही असे स्पष्टपणे चिन्हांकित करतो.


```typescript
// लॉगिन विनंत्यांसाठी IdP एंडपॉइंट
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // पर्यायी मार्ग कारण मला parseLoginRequest कार्यान्वित करता आले नाही.
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

पायरी 3 हँडलरमध्ये `getLoginPage` ऐवजी आता `getSignaturePage` वापरा.

## ईमेल पत्ता मिळवणे {#getting-the-email-address}

पुढची पायरी म्हणजे सेवा प्रदात्याने विनंती केलेला आयडेंटिफायर, ईमेल पत्ता मिळवणे. ते करण्यासाठी, आपण [इथेरियम साक्षांकन सेवा (Ethereum Attestation Service - EAS)](https://attest.org/) वापरतो.

साक्षांकने मिळवण्याचा सर्वात सोपा मार्ग म्हणजे [GraphQL API](https://docs.attest.org/docs/developer-tools/api) वापरणे. आपण ही क्वेरी वापरतो:

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

या [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) मध्ये फक्त एक ई-मेल पत्ता समाविष्ट आहे. ही क्वेरी या स्कीमाच्या साक्षांकनांची विनंती करते. साक्षांकनाच्या विषयाला `recipient` म्हटले जाते. तो नेहमी एक इथेरियम पत्ता असतो.

चेतावणी: आपण येथे ज्या प्रकारे साक्षांकने मिळवत आहोत त्यात दोन सुरक्षा समस्या आहेत.

- आपण API एंडपॉईंट, `https://optimism.easscan.org/graphql` वर जात आहोत, जो एक केंद्रित घटक आहे. आपण `id` गुणधर्म मिळवू शकतो आणि नंतर साक्षांकन खरे आहे की नाही हे पडताळण्यासाठी ऑनचेन लुकअप करू शकतो, परंतु API एंडपॉईंट तरीही आपल्याला त्यांच्याबद्दल न सांगता साक्षांकने सेन्सॉर करू शकतो. 

  ही समस्या सोडवणे अशक्य नाही, आपण आपला स्वतःचा GraphQL एंडपॉईंट चालवू शकतो आणि चेन नोंदींमधून (logs) साक्षांकने मिळवू शकतो, परंतु आपल्या उद्देशांसाठी ते खूप जास्त आहे.

- आपण साक्षांकनकर्त्याची ओळख पाहत नाही. कोणीही आपल्याला चुकीची माहिती देऊ शकतो. वास्तविक जगातील अंमलबजावणीमध्ये आपल्याकडे विश्वासार्ह साक्षांकनकर्त्यांचा एक संच असेल आणि आपण केवळ त्यांचीच साक्षांकने पाहू.

हे कृतीत पाहण्यासाठी, विद्यमान IdP आणि SP थांबवा आणि या कमांड्स चालवा:

```sh
git checkout email-address
pnpm install
pnpm start
```

त्यानंतर तुमचा ई-मेल पत्ता द्या. तुमच्याकडे ते करण्याचे दोन मार्ग आहेत:

- खाजगी की वापरून वॉलेट इम्पोर्ट करा आणि `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` ही चाचणी खाजगी की वापरा.

- तुमच्या स्वतःच्या ई-मेल पत्त्यासाठी साक्षांकन जोडा:

  1. [साक्षांकन एक्सप्लोररमधील स्कीमावर](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ब्राउझ करा.

  2. **Attest with Schema** वर क्लिक करा.

  3. प्राप्तकर्ता म्हणून तुमचा इथेरियम पत्ता, ईमेल पत्ता म्हणून तुमचा ई-मेल पत्ता प्रविष्ट करा आणि **Onchain** निवडा. त्यानंतर **Make Attestation** वर क्लिक करा.

  4. तुमच्या वॉलेटमध्ये व्यवहार मंजूर करा. गॅससाठी पैसे देण्यासाठी तुम्हाला [ऑप्टिमिझम् ब्लॉकचेनवर](https://app.optimism.io/bridge/deposit) काही ETH ची आवश्यकता असेल.

कोणत्याही प्रकारे, तुम्ही हे केल्यानंतर [http://localhost:3000](http://localhost:3000) वर ब्राउझ करा आणि सूचनांचे पालन करा. जर तुम्ही चाचणी खाजगी की इम्पोर्ट केली असेल, तर तुम्हाला मिळणारा ई-मेल `test_addr_0@example.com` असेल. जर तुम्ही तुमचा स्वतःचा पत्ता वापरला असेल, तर तुम्ही जे साक्षांकन केले असेल तेच असावे.

### सविस्तर स्पष्टीकरण {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

नवीन पायऱ्या म्हणजे GraphQL संवाद, पायऱ्या 5.6 आणि 5.7 आहेत.

पुन्हा, येथे `idp.mts` चे बदललेले भाग आहेत.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

आपल्याला आवश्यक असलेल्या लायब्ररी इम्पोर्ट करा.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[प्रत्येक ब्लॉकचेनसाठी एक वेगळा एंडपॉईंट](https://docs.attest.org/docs/developer-tools/api) आहे.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

एक नवीन `GraphQLClient` क्लायंट तयार करा जो आपण एंडपॉईंटला क्वेरी करण्यासाठी वापरू शकतो.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL आपल्याला फक्त बाइट्ससह एक अपारदर्शक डेटा ऑब्जेक्ट देते. ते समजून घेण्यासाठी आपल्याला स्कीमाची आवश्यकता आहे. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

इथेरियम पत्त्यावरून ई-मेल पत्ता मिळवण्यासाठी एक फंक्शन.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

ही एक GraphQL क्वेरी आहे.

```typescript
      attestations(
```

आपण साक्षांकने शोधत आहोत.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

आपल्याला हवी असलेली साक्षांकने आपल्या स्कीमामधील आहेत, जिथे प्राप्तकर्ता `getAddress(ethAddr)` आहे. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) फंक्शन आपल्या पत्त्यामध्ये योग्य [चेकसम (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) असल्याची खात्री करते. हे आवश्यक आहे कारण GraphQL केस-सेन्सिटिव्ह (case-significant) आहे. "0xBAD060A7", "0xBad060A7" आणि "0xbad060a7" ही वेगवेगळी मूल्ये आहेत.

```typescript
        take: 1
```

आपल्याला कितीही साक्षांकने सापडली तरीही, आपल्याला फक्त पहिलेच हवे आहे.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

आपल्याला प्राप्त करायची असलेली क्षेत्रे.

- `attester`: ज्या पत्त्याने साक्षांकन सबमिट केले आहे. सामान्यतः साक्षांकनावर विश्वास ठेवायचा की नाही हे ठरवण्यासाठी याचा वापर केला जातो.
- `id`: साक्षांकन ID. GraphQL क्वेरीमधील माहिती योग्य आहे हे पडताळण्यासाठी तुम्ही हे मूल्य [ऑनचेन साक्षांकन वाचण्यासाठी](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) वापरू शकता.
- `data`: स्कीमा डेटा (या प्रकरणात, ई-मेल पत्ता).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

जर कोणतेही साक्षांकन नसेल, तर असे मूल्य परत करा जे स्पष्टपणे चुकीचे आहे, परंतु जे सेवा प्रदात्याला वैध वाटेल.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

जर मूल्य असेल, तर डेटा डिकोड करण्यासाठी `decodeData` वापरा. आपल्याला ते प्रदान करत असलेल्या मेटाडेटाची आवश्यकता नाही, फक्त मूल्याचीच आवश्यकता आहे.

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

ई-मेल पत्ता मिळवण्यासाठी नवीन फंक्शन वापरा.

## विकेंद्रीकरणाचे काय? {#what-about-decentralization}

या कॉन्फिगरेशनमध्ये वापरकर्ते ते नसलेले कोणीतरी असल्याचे भासवू शकत नाहीत, जोपर्यंत आपण इथेरियम ते ई-मेल पत्ता मॅपिंगसाठी विश्वासार्ह साक्षांकनकर्त्यांवर अवलंबून असतो. तथापि, आपला ओळख प्रदाता अद्याप एक केंद्रित घटक आहे. ज्याच्याकडे ओळख प्रदात्याची खाजगी की आहे तो सेवा प्रदात्याला चुकीची माहिती पाठवू शकतो.

[मल्टी-पार्टी कॉम्प्युटेशन (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) वापरून यावर उपाय असू शकतो. मला आशा आहे की मी भविष्यातील ट्युटोरिअलमध्ये याबद्दल लिहीन.

## निष्कर्ष {#conclusion}

इथेरियम स्वाक्षऱ्यांसारख्या लॉग ऑन मानकाचा अवलंब करताना कोंबडी आणि अंड्याच्या समस्येचा (chicken and egg problem) सामना करावा लागतो. सेवा प्रदात्यांना शक्य तितक्या विस्तृत बाजारपेठेला आकर्षित करायचे असते. वापरकर्त्यांना त्यांच्या लॉग ऑन मानकाला सपोर्ट करण्याबद्दल काळजी न करता सेवा अ‍ॅक्सेस करण्यास सक्षम व्हायचे असते.
इथेरियम IdP सारखे अ‍ॅडॉप्टर तयार केल्याने आपल्याला या अडथळ्यावर मात करण्यास मदत होऊ शकते.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).