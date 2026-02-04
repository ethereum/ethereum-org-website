---
title: web2 प्रमाणीकरणासाठी Ethereum वापरणे
description: हे ट्युटोरियल वाचल्यानंतर, एक डेव्हलपर Ethereum लॉगिन (web3) ला SAML लॉगिन सोबत इंटिग्रेट करू शकेल, जे web2 मध्ये सिंगल साइन-ऑन आणि इतर संबंधित सेवा प्रदान करण्यासाठी वापरले जाणारे एक स्टँडर्ड आहे. हे web2 रिसोर्सेसना Ethereum सिग्नेचर्सद्वारे ऑथेंटिकेट करण्याची परवानगी देते, ज्यात वापरकर्त्याचे अ‍ॅट्रिब्यूट्स अटेस्टेशन्समधून येतात.
author: ओरी पोमेरँट्झ
tags: [ "web2", "प्रमाणीकरण", "eas" ]
skill: beginner
lang: mr
published: 2025-04-30
---

## परिचय

[SAML](https://www.onelogin.com/learn/saml) हे web2 वर वापरले जाणारे एक स्टँडर्ड आहे जे [आयडेंटिटी प्रोव्हायडर (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) ला [सर्व्हिस प्रोव्हायडर्स (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) साठी वापरकर्त्याची माहिती प्रदान करण्याची परवानगी देते.

या ट्युटोरियलमध्ये तुम्ही Ethereum सिग्नेचरला SAML सोबत कसे समाकलित करायचे ते शिकाल जेणेकरून वापरकर्ते त्यांचे Ethereum वॉलेट वापरून स्वतःला web2 सेवांमध्ये प्रमाणित करू शकतील जे अद्याप मूळतः Ethereum ला सपोर्ट करत नाहीत.

लक्षात घ्या की हे ट्युटोरियल दोन स्वतंत्र श्रोत्यांसाठी लिहिलेले आहे:

- Ethereum चे लोक ज्यांना Ethereum समजते आणि ज्यांना SAML शिकण्याची गरज आहे
- Web2 चे लोक ज्यांना SAML आणि web2 प्रमाणीकरण समजते आणि ज्यांना Ethereum शिकण्याची गरज आहे

परिणामी, यात बरीच प्रास्ताविक माहिती असणार आहे जी तुम्हाला आधीच माहित आहे. ते वगळण्यास मोकळ्या मनाने.

### Ethereum च्या लोकांसाठी SAML

SAML हा एक सेंट्रलाइज्ड प्रोटोकॉल आहे. एक सर्व्हिस प्रोव्हायडर (SP) केवळ आयडेंटिटी प्रोव्हायडर (IdP) कडून अझर्शन्स (जसे की "हा माझा वापरकर्ता जॉन आहे, त्याला A, B आणि C करण्याची परवानगी असावी") स्वीकारतो, जर त्याचा त्याच्याशी किंवा त्या IdP च्या प्रमाणपत्रावर सही करणाऱ्या [सर्टिफिकेट अथॉरिटी](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) शी पूर्व-अस्तित्वात असलेला विश्वासाचा संबंध असेल.

उदाहरणार्थ, SP ही कंपन्यांना प्रवास सेवा पुरवणारी ट्रॅव्हल एजन्सी असू शकते आणि IdP ही कंपनीची अंतर्गत वेबसाईट असू शकते. जेव्हा कर्मचाऱ्यांना व्यवसायासाठी प्रवास बुक करण्याची आवश्यकता असते, तेव्हा ट्रॅव्हल एजन्सी त्यांना प्रवास बुक करण्याची परवानगी देण्यापूर्वी कंपनीद्वारे प्रमाणीकरणासाठी पाठवते.

![स्टेप बाय स्टेप SAML प्रक्रिया](./fig-01-saml.png)

हा तो मार्ग आहे ज्याद्वारे तीन घटक, ब्राउझर, SP आणि IdP, प्रवेशासाठी वाटाघाटी करतात. SP ला ब्राउझर वापरणाऱ्या वापरकर्त्याबद्दल आगाऊ काहीही जाणून घेण्याची आवश्यकता नाही, फक्त IdP वर विश्वास ठेवणे आवश्यक आहे.

### SAML च्या लोकांसाठी Ethereum

Ethereum ही एक विकेंद्रित प्रणाली आहे.

![Ethereum लॉगऑन](./fig-02-eth-logon.png)

वापरकर्त्यांकडे एक प्रायव्हेट की असते (सामान्यतः ब्राउझर एक्स्टेंशनमध्ये ठेवली जाते). प्रायव्हेट की मधून तुम्ही पब्लिक की मिळवू शकता, आणि त्यातून एक 20-बाईट अ‍ॅड्रेस. जेव्हा वापरकर्त्यांना सिस्टीममध्ये लॉग इन करण्याची आवश्यकता असते, तेव्हा त्यांना एका नॉन्स (एकल-वापर मूल्य) सह मेसेजवर सही करण्याची विनंती केली जाते. सर्व्हर त्या अ‍ॅड्रेसद्वारे सिग्नेचर तयार केली गेली होती हे सत्यापित करू शकतो.

![अटेस्टेशन्समधून अतिरिक्त डेटा मिळवणे](./fig-03-eas-data.png)

सिग्नेचर केवळ Ethereum अ‍ॅड्रेसची पडताळणी करते. इतर वापरकर्ता अ‍ॅट्रिब्युट्स मिळवण्यासाठी, तुम्ही सामान्यतः [अटेस्टेशन्स](https://attest.org/) वापरता. अटेस्टेशनमध्ये सामान्यतः हे फिल्ड्स असतात:

- **अटेस्टॉर**, ज्या अ‍ॅड्रेसने अटेस्टेशन केले
- **प्राप्तकर्ता**, ज्या अ‍ॅड्रेसवर अटेस्टेशन लागू होते
- **डेटा**, अटेस्ट केला जाणारा डेटा, जसे की नाव, परवानग्या इ.
- **स्कीमा**, डेटाचा अर्थ लावण्यासाठी वापरल्या जाणार्‍या स्कीमाचा ID.

Ethereum च्या विकेंद्रित स्वरूपामुळे, कोणताही वापरकर्ता अटेस्टेशन्स करू शकतो. आपण कोणती अटेस्टेशन्स विश्वसनीय मानतो हे ओळखण्यासाठी अटेस्टॉरची ओळख महत्त्वाची आहे.

## सेटअप

पहिली पायरी म्हणजे SAML SP आणि SAML IdP एकमेकांशी संवाद साधत असणे.

1. सॉफ्टवेअर डाऊनलोड करा. या लेखासाठी नमुना सॉफ्टवेअर [github वर](https://github.com/qbzzt/250420-saml-ethereum) आहे. वेगवेगळे टप्पे वेगवेगळ्या शाखांमध्ये संग्रहित केले आहेत, या टप्प्यासाठी तुम्हाला `saml-only` पाहिजे.

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. स्व-स्वाक्षरी केलेल्या प्रमाणपत्रांसह की तयार करा. याचा अर्थ की ही की स्वतःच एक प्रमाणपत्र प्राधिकरण आहे आणि सेवा प्रदात्याकडे व्यक्तिचलितरित्या आयात करणे आवश्यक आहे. अधिक माहितीसाठी [OpenSSL डॉक्स](https://docs.openssl.org/master/man1/openssl-req/) पहा.

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. सर्व्हर (SP आणि IdP दोन्ही) सुरू करा

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/) वर SP वर ब्राउझ करा आणि IdP (पोर्ट 3001) वर पुनर्निर्देशित होण्यासाठी बटणावर क्लिक करा.

5. IdP ला तुमचा ईमेल अ‍ॅड्रेस द्या आणि **सर्व्हिस प्रोव्हायडरमध्ये लॉगिन करा** वर क्लिक करा. तुम्ही सर्व्हिस प्रोव्हायडर (पोर्ट 3000) वर परत पुनर्निर्देशित झाल्याचे आणि ते तुम्हाला तुमच्या ईमेल अ‍ॅड्रेसने ओळखत असल्याचे पहा.

### तपशीलवार स्पष्टीकरण

हे काय घडते, ते टप्प्याटप्प्याने येथे दिले आहे:

![Ethereum शिवाय सामान्य SAML लॉगऑन](./fig-04-saml-no-eth.png)

#### src/config.mts

या फाईलमध्ये आयडेंटिटी प्रोव्हायडर आणि सर्व्हिस प्रोव्हायडर दोन्हीसाठी कॉन्फिगरेशन आहे. सामान्यतः हे दोन वेगळे घटक असतील, परंतु येथे आपण साधेपणासाठी कोड शेअर करू शकतो.

```typescript
const fs = await import("fs")

const protocol="http"
```

सध्या आम्ही फक्त चाचणी करत आहोत, त्यामुळे HTTP वापरणे ठीक आहे.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

पब्लिक की वाचा, ज्या सामान्यतः दोन्ही घटकांसाठी उपलब्ध असतात (आणि एकतर थेट विश्वासार्ह असतात, किंवा विश्वासार्ह प्रमाणपत्र प्राधिकरणाद्वारे स्वाक्षरी केलेल्या असतात).

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

दोन्ही घटकांसाठी URLs.

```typescript
export const spPublicData = {
```

सर्व्हिस प्रोव्हायडरसाठी सार्वजनिक डेटा.

```typescript
    entityID: `${spUrl}/metadata`,
```

प्रथेनुसार, SAML मध्ये `entityID` ही URL असते जिथे घटकाचा मेटाडेटा उपलब्ध असतो. हा मेटाडेटा येथील सार्वजनिक डेटाशी संबंधित आहे, फक्त तो XML स्वरूपात आहे.

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

आमच्या उद्देशांसाठी सर्वात महत्त्वाची व्याख्या `assertionConsumerServer` आहे. याचा अर्थ असा की सर्व्हिस प्रोव्हायडरला काहीतरी ठामपणे सांगण्यासाठी (उदाहरणार्थ, "तुम्हाला ही माहिती पाठवणारा वापरकर्ता somebody@example.com आहे") आम्हाला `http://localhost:3000/sp/assertion` या URL वर [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) वापरण्याची आवश्यकता आहे.

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

आयडेंटिटी प्रोव्हायडरसाठी सार्वजनिक डेटा समान आहे. यात नमूद केले आहे की वापरकर्त्याला लॉग इन करण्यासाठी तुम्ही `http://localhost:3001/idp/login` वर POST करा आणि वापरकर्त्याला लॉग आउट करण्यासाठी तुम्ही `http://localhost:3001/idp/logout` वर POST करा.

#### src/sp.mts

हा कोड सर्व्हिस प्रोव्हायडरची अंमलबजावणी करतो.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

आम्ही SAML लागू करण्यासाठी [`samlify`](https://www.npmjs.com/package/samlify) लायब्ररी वापरतो.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` लायब्ररीला एक पॅकेज हवे असते जे XML योग्य आहे, अपेक्षित पब्लिक की ने स्वाक्षरी केलेले आहे इत्यादीची पडताळणी करते. आम्ही या उद्देशासाठी [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) वापरतो.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

एक [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) ही एक "मिनी वेब साईट" आहे जी वेबसाईटच्या आत माउंट केली जाऊ शकते. या प्रकरणात, आम्ही सर्व सर्व्हिस प्रोव्हायडर व्याख्या एकत्र गटबद्ध करण्यासाठी याचा वापर करतो.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

सर्व्हिस प्रोव्हायडरचे स्वतःचे प्रतिनिधित्व म्हणजे सर्व सार्वजनिक डेटा आणि माहितीवर स्वाक्षरी करण्यासाठी वापरली जाणारी प्रायव्हेट की.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

सार्वजनिक डेटामध्ये सर्व्हिस प्रोव्हायडरला आयडेंटिटी प्रोव्हायडरबद्दल माहित असणे आवश्यक असलेली प्रत्येक गोष्ट असते.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

इतर SAML घटकांसह आंतरकार्यक्षमता सक्षम करण्यासाठी, सेवा आणि ओळख प्रदात्यांनी त्यांचा सार्वजनिक डेटा (मेटाडेटा म्हणतात) `/metadata` मध्ये XML स्वरूपात उपलब्ध करून दिला पाहिजे.

```typescript
spRouter.post(`/assertion`,
```

हे ब्राउझरद्वारे स्वतःची ओळख पटवण्यासाठी अ‍ॅक्सेस केलेले पेज आहे. असर्शनमध्ये वापरकर्ता ओळखकर्ता (येथे आम्ही ईमेल अ‍ॅड्रेस वापरतो) समाविष्ट असतो आणि त्यात अतिरिक्त अ‍ॅट्रिब्यूट्स समाविष्ट असू शकतात. हे वरील क्रम आकृतीमधील पायरी 7 साठी हँडलर आहे.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

तुम्ही अझर्शनमध्ये प्रदान केलेला XML डेटा पाहण्यासाठी टिप्पणी केलेला कमांड वापरू शकता. ते [base64 एन्कोड केलेले](https://en.wikipedia.org/wiki/Base64) आहे.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

आयडेंटिटी सर्व्हरवरून लॉगिन विनंती पार्स करा.

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

वापरकर्त्याला दाखवण्यासाठी की आम्हाला लॉगिन मिळाले आहे, एक HTML प्रतिसाद पाठवा.

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

जेव्हा ब्राउझर हे पृष्ठ मिळवण्याचा प्रयत्न करतो तेव्हा एक लॉगिन विनंती तयार करा. हे वरील क्रम आकृतीमधील पायरी 1 साठी हँडलर आहे.

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

हे पृष्ठ फॉर्म (खाली पहा) आपोआप सबमिट करते. यामुळे वापरकर्त्याला पुनर्निर्देशित होण्यासाठी काहीही करण्याची गरज नाही. हे वरील क्रम आकृतीमधील पायरी 2 आहे.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (आयडेंटिटी प्रोव्हायडर एंडपॉईंटची URL) वर पोस्ट करा.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

इनपुट नाव `loginRequest.type` (`SAMLRequest`) आहे. त्या फिल्डमधील मजकूर `loginRequest.context` आहे, जो पुन्हा base64 एन्कोड केलेला XML आहे.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[हे मिडलवेअर](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP विनंती](https://www.tutorialspoint.com/http/http_requests.htm) चा मुख्य भाग वाचतो. डीफॉल्टनुसार एक्सप्रेस त्याकडे दुर्लक्ष करते, कारण बहुतेक विनंत्यांसाठी त्याची आवश्यकता नसते. आम्हाला त्याची आवश्यकता आहे कारण POST मुख्य भाग वापरतो.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

सर्व्हिस प्रोव्हायडर डिरेक्टरी (`/sp`) मध्ये राउटर माउंट करा.

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

जर ब्राउझरला रूट डिरेक्टरी मिळवण्याचा प्रयत्न केल्यास, त्याला लॉगिन पेजची लिंक द्या.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

या एक्सप्रेस ॲप्लिकेशनसह `spPort` ऐका.

#### src/idp.mts

हा आयडेंटिटी प्रोव्हायडर आहे. हे सर्व्हिस प्रोव्हायडरसारखेच आहे, खालील स्पष्टीकरण वेगळ्या भागांसाठी आहेत.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

आम्हाला सर्व्हिस प्रोव्हायडरकडून मिळालेली XML विनंती वाचणे आणि समजून घेणे आवश्यक आहे.

```typescript
const getLoginPage = requestId => `
```

हे फंक्शन वरील क्रम आकृतीमधील पायरी 4 मध्ये परत आलेल्या स्वयंचलित-सबमिट केलेल्या फॉर्मसह पृष्ठ तयार करते.

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

आम्ही सर्व्हिस प्रोव्हायडरला दोन फिल्ड्स पाठवतो:

1. ज्या `requestId` ला आम्ही प्रतिसाद देत आहोत.
2. वापरकर्ता ओळखकर्ता (आम्ही वापरकर्त्याने आतासाठी प्रदान केलेला ईमेल अ‍ॅड्रेस वापरतो).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

हे वरील क्रम आकृतीमधील पायरी 5 साठी हँडलर आहे. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) लॉगिन प्रतिसाद तयार करते.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

श्रोता सर्व्हिस प्रोव्हायडर आहे.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

विनंतीमधून काढलेली माहिती. विनंतीमधील आपल्याला महत्त्वाचा असलेला एक पॅरामीटर म्हणजे requestId, जो सर्व्हिस प्रोव्हायडरला विनंत्या आणि त्यांचे प्रतिसाद जुळवू देतो.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

प्रतिसादावर स्वाक्षरी करण्यासाठी डेटा मिळवण्यासाठी आम्हाला `signingKey` ची आवश्यकता आहे. सर्व्हिस प्रोव्हायडर स्वाक्षरी नसलेल्या विनंत्यांवर विश्वास ठेवत नाही.

```typescript
    },
    "post",
    {
      email: req.body.email
```

हे फिल्ड आम्ही सर्व्हिस प्रोव्हायडरला परत पाठवत असलेल्या वापरकर्ता माहितीसह आहे.

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

पुन्हा, स्वयंचलित-सबमिट केलेला फॉर्म वापरा. हे वरील क्रम आकृतीमधील पायरी 6 आहे.

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

हा एंडपॉईंट आहे जो सर्व्हिस प्रोव्हायडरकडून लॉगिन विनंती प्राप्त करतो. हे वरील क्रम आकृतीमधील पायरी 3 साठी हँडलर आहे.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

आपण प्रमाणीकरण विनंतीचा आयडी वाचण्यासाठी [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) वापरू शकले पाहिजे. तथापि, मला ते काम करायला जमले नाही आणि त्यावर जास्त वेळ घालवणे योग्य नव्हते म्हणून मी फक्त एक [सामान्य-उद्देशीय XML पार्सर](https://www.npmjs.com/package/fast-xml-parser) वापरतो. आम्हाला आवश्यक असलेली माहिती `<samlp:AuthnRequest>` टॅगमधील `ID` विशेषता आहे, जी XML च्या शीर्ष स्तरावर आहे.

## Ethereum सिग्नेचर वापरणे

आता आपण सर्व्हिस प्रोव्हायडरला वापरकर्त्याची ओळख पाठवू शकतो, पुढील पायरी म्हणजे विश्वसनीय पद्धतीने वापरकर्त्याची ओळख मिळवणे. Viem आपल्याला वॉलेटमधून वापरकर्त्याचा अ‍ॅड्रेस विचारण्याची परवानगी देतो, पण याचा अर्थ ब्राउझरकडून माहिती विचारणे आहे. आपण ब्राउझरवर नियंत्रण ठेवत नाही, त्यामुळे आपण त्यातून मिळणाऱ्या प्रतिसादावर आपोआप विश्वास ठेवू शकत नाही.

त्याऐवजी, IdP ब्राउझरला स्वाक्षरी करण्यासाठी एक स्ट्रिंग पाठवेल. जर ब्राउझरमधील वॉलेट या स्ट्रिंगवर स्वाक्षरी करत असेल, तर याचा अर्थ तो खरोखरच तो अ‍ॅड्रेस आहे (म्हणजेच, त्याला अ‍ॅड्रेसशी संबंधित असलेली प्रायव्हेट की माहित आहे).

हे कृतीत पाहण्यासाठी, विद्यमान IdP आणि SP थांबवा आणि हे कमांड चालवा:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

नंतर [SP वर](http://localhost:3000) ब्राउझ करा आणि निर्देशांचे पालन करा.

लक्षात ठेवा की या टप्प्यावर आम्हाला Ethereum अ‍ॅड्रेसवरून ईमेल अ‍ॅड्रेस कसा मिळवायचा हे माहित नाही, म्हणून त्याऐवजी आम्ही SP ला `<ethereum address>@bad.email.address` असे रिपोर्ट करतो.

### तपशीलवार स्पष्टीकरण

बदल मागील आकृतीमधील पायरी 4-5 मध्ये आहेत.

![Ethereum सिग्नेचरसह SAML](./fig-05-saml-w-signature.png)

आम्ही बदललेली एकमेव फाईल `idp.mts` आहे. येथे बदललेले भाग आहेत.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

आम्हाला या दोन अतिरिक्त लायब्ररींची गरज आहे. आम्ही [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) व्हॅल्यू तयार करण्यासाठी [`uuid`](https://www.npmjs.com/package/uuid) वापरतो. मूल्य स्वतः महत्त्वाचे नाही, फक्त ते एकदाच वापरले जाते हे महत्त्वाचे आहे.

[`viem`](https://viem.sh/) लायब्ररी आम्हाला Ethereum डेफिनेशन्स वापरण्याची परवानगी देते. येथे आम्हाला स्वाक्षरी खरोखरच वैध आहे की नाही हे तपासण्यासाठी त्याची आवश्यकता आहे.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

वॉलेट वापरकर्त्याला मेसेजवर स्वाक्षरी करण्याची परवानगी विचारते. फक्त एक नॉन्स असलेला संदेश वापरकर्त्यांना गोंधळात टाकू शकतो, म्हणून आम्ही हा प्रॉम्प्ट समाविष्ट करतो.

```typescript
// Keep requestIDs here
let nonces = {}
```

आम्हाला त्याला प्रतिसाद देण्यासाठी विनंती माहितीची आवश्यकता आहे. आपण ते विनंतीसह पाठवू शकतो (पायरी 4), आणि ते परत मिळवू शकतो (पायरी 5). तथापि, आपण ब्राउझरकडून मिळणाऱ्या माहितीवर विश्वास ठेवू शकत नाही, जो संभाव्यतः शत्रुत्वापूर्ण वापरकर्त्याच्या नियंत्रणाखाली असतो. त्यामुळे ते येथे संग्रहित करणे चांगले आहे, नॉन्सला की म्हणून वापरून.

लक्षात घ्या की आम्ही हे साधेपणासाठी येथे व्हेरिएबल म्हणून करत आहोत. तथापि, याचे अनेक तोटे आहेत:

- आपण डिनायल ऑफ सर्व्हिस हल्ल्यासाठी असुरक्षित आहोत. एक दुर्भावनापूर्ण वापरकर्ता अनेक वेळा लॉग ऑन करण्याचा प्रयत्न करू शकतो, ज्यामुळे आमची मेमरी भरली जाईल.
- जर IdP प्रक्रिया पुन्हा सुरू करण्याची आवश्यकता असेल, तर आम्ही विद्यमान मूल्ये गमावतो.
- आपण अनेक प्रक्रिया ओलांडून लोड बॅलन्स करू शकत नाही, कारण प्रत्येकाचे स्वतःचे व्हेरिएबल असेल.

उत्पादन प्रणालीवर आपण डेटाबेस वापरू आणि काही प्रकारची समाप्ती यंत्रणा लागू करू.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

एक नॉन्स तयार करा आणि भविष्यातील वापरासाठी `requestId` संग्रहित करा.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

हे जावास्क्रिप्ट पृष्ठ लोड झाल्यावर आपोआप कार्यान्वित होते.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

आम्हाला `viem` मधील अनेक फंक्शन्सची आवश्यकता आहे.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

आपण फक्त तेव्हाच काम करू शकतो जेव्हा ब्राउझरवर वॉलेट असेल.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

वॉलेट (`window.ethereum`) कडून खात्यांची यादी मागवा. किमान एक आहे असे गृहीत धरा, आणि फक्त पहिलेच संग्रहित करा.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ब्राउझर वॉलेटशी संवाद साधण्यासाठी [वॉलेट क्लायंट](https://viem.sh/docs/clients/wallet) तयार करा.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

वापरकर्त्याला मेसेजवर स्वाक्षरी करण्यास सांगा. कारण हे संपूर्ण HTML [टेम्पलेट स्ट्रिंग](https://viem.sh/docs/clients/wallet) मध्ये आहे, आपण idp प्रक्रियेत परिभाषित केलेले व्हेरिएबल्स वापरू शकतो. ही क्रम आकृतीमधील पायरी 4.5 आहे.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` वर पुनर्निर्देशित करा. ही क्रम आकृतीमधील पायरी 5 आहे.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

सिग्नेचर ब्राउझरद्वारे परत पाठवली जाते, जी संभाव्यतः दुर्भावनापूर्ण असू शकते (तुम्हाला ब्राउझरमध्ये `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` उघडण्यापासून कोणीही रोखू शकत नाही). म्हणून, IdP प्रक्रिया खराब स्वाक्षऱ्या योग्यरित्या हाताळते हे तपासणे महत्त्वाचे आहे.

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

उरलेले फक्त स्टँडर्ड HTML आहे.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

हे क्रम आकृतीमधील पायरी 5 साठी हँडलर आहे.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

रिक्वेस्ट आयडी मिळवा, आणि `nonces` मधून नॉन्स हटवा जेणेकरून त्याचा पुन्हा वापर होणार नाही याची खात्री करा.

```typescript
  try {
```

सिग्नेचर अवैध असण्याचे अनेक मार्ग असल्यामुळे, आपण हे `try ...` मध्ये गुंडाळतो. कोणत्याही फेकलेल्या त्रुटी पकडण्यासाठी `catch` ब्लॉक.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

क्रम आकृतीमधील पायरी 5.5 लागू करण्यासाठी [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) वापरा.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

हँडलरचा उर्वरित भाग एका लहान बदलाशिवाय, आपण पूर्वी `/loginSubmitted` हँडलरमध्ये जे केले आहे त्याच्या समतुल्य आहे.

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

आमच्याकडे खरा ईमेल अ‍ॅड्रेस नाही (तो आम्हाला पुढील विभागात मिळेल), म्हणून आतासाठी आम्ही Ethereum अ‍ॅड्रेस परत करतो आणि तो ईमेल अ‍ॅड्रेस नाही असे स्पष्टपणे चिन्हांकित करतो.

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

`getLoginPage` ऐवजी, आता पायरी 3 हँडलरमध्ये `getSignaturePage` वापरा.

## ईमेल अ‍ॅड्रेस मिळवणे

पुढील पायरी ईमेल अ‍ॅड्रेस मिळवणे आहे, जो सर्व्हिस प्रोव्हायडरने मागितलेला ओळखकर्ता आहे. ते करण्यासाठी, आम्ही [Ethereum Attestation Service (EAS)](https://attest.org/) वापरतो.

अटेस्टेशन्स मिळवण्याचा सर्वात सोपा मार्ग म्हणजे [GraphQL API](https://docs.attest.org/docs/developer-tools/api) वापरणे. आम्ही ही क्वेरी वापरतो:

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

या [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) मध्ये फक्त एक ई-मेल अ‍ॅड्रेस समाविष्ट आहे. ही क्वेरी या स्कीमाच्या अटेस्टेशन्ससाठी विचारते. अटेस्टेशनच्या विषयाला `recipient` म्हणतात. तो नेहमी एक Ethereum अ‍ॅड्रेस असतो.

चेतावणी: आपण येथे अटेस्टेशन्स मिळवत असलेल्या पद्धतीत दोन सुरक्षा समस्या आहेत.

- आपण API एंडपॉईंट, `https://optimism.easscan.org/graphql` वर जात आहोत, जो एक सेंट्रलाइज्ड घटक आहे. आपण `id` अ‍ॅट्रिब्यूट मिळवू शकतो आणि नंतर अटेस्टेशन वास्तविक आहे की नाही हे तपासण्यासाठी ऑनचेन तपासणी करू शकतो, परंतु API एंडपॉईंट अजूनही अटेस्टेशन्सबद्दल न सांगता सेन्सॉर करू शकतो.

  ही समस्या सोडवणे अशक्य नाही, आपण स्वतःचा GraphQL एंडपॉईंट चालवू शकतो आणि चेन लॉगमधून अटेस्टेशन्स मिळवू शकतो, परंतु ते आमच्या उद्देशांसाठी जास्त आहे.

- आपण अटेस्टॉरच्या ओळखीकडे पाहत नाही. कोणीही आम्हाला खोटी माहिती देऊ शकतो. वास्तविक जगातील अंमलबजावणीमध्ये आमच्याकडे विश्वासार्ह अटेस्टॉरचा एक सेट असेल आणि आम्ही फक्त त्यांच्या अटेस्टेशन्स पाहू.

हे कृतीत पाहण्यासाठी, विद्यमान IdP आणि SP थांबवा आणि हे कमांड चालवा:

```sh
git checkout email-address
pnpm install
pnpm start
```

नंतर तुमचा ई-मेल अ‍ॅड्रेस द्या. तुमच्याकडे ते करण्याचे दोन मार्ग आहेत:

- प्रायव्हेट की वापरून वॉलेट आयात करा आणि चाचणीसाठी `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` ही प्रायव्हेट की वापरा.

- तुमच्या स्वतःच्या ई-मेल अ‍ॅड्रेससाठी एक अटेस्टेशन जोडा:

  1. [अटेस्टेशन एक्सप्लोररमधील स्कीमावर](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ब्राउझ करा.

  2. **स्कीमासह अटेस्ट करा** वर क्लिक करा.

  3. प्राप्तकर्ता म्हणून तुमचा Ethereum अ‍ॅड्रेस, ईमेल अ‍ॅड्रेस म्हणून तुमचा ई-मेल अ‍ॅड्रेस टाका आणि **ऑनचेन** निवडा. नंतर **अटेस्टेशन तयार करा** वर क्लिक करा.

  4. तुमच्या वॉलेटमध्ये व्यवहाराला मंजुरी द्या. गॅससाठी पैसे देण्यासाठी तुम्हाला [Optimism Blockchain](https://app.optimism.io/bridge/deposit) वर काही ETH ची आवश्यकता असेल.

एकतर, तुम्ही हे केल्यानंतर [http://localhost:3000](http://localhost:3000) वर ब्राउझ करा आणि निर्देशांचे पालन करा. जर तुम्ही चाचणीची प्रायव्हेट की आयात केली असेल, तर तुम्हाला मिळणारा ई-मेल `test_addr_0@example.com` आहे. जर तुम्ही तुमचा स्वतःचा अ‍ॅड्रेस वापरला असेल, तर तो तुम्ही अटेस्ट केलेला असावा.

### तपशीलवार स्पष्टीकरण

![Ethereum अ‍ॅड्रेसवरून ई-मेल मिळवणे](./fig-06-saml-sig-n-email.png)

नवीन पायऱ्या GraphQL कम्युनिकेशन, पायऱ्या 5.6 आणि 5.7 आहेत.

पुन्हा, येथे `idp.mts` चे बदललेले भाग आहेत.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

आपल्याला आवश्यक असलेल्या लायब्ररी आयात करा.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[प्रत्येक ब्लॉकचेनसाठी एक वेगळा एंडपॉईंट](https://docs.attest.org/docs/developer-tools/api) आहे.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

एक नवीन `GraphQLClient` क्लायंट तयार करा जो आपण एंडपॉईंटवर क्वेरी करण्यासाठी वापरू शकतो.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL आपल्याला फक्त बाइट्ससह एक अपारदर्शक डेटा ऑब्जेक्ट देतो. ते समजून घेण्यासाठी आपल्याला स्कीमाची आवश्यकता आहे.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Ethereum अ‍ॅड्रेसवरून ई-मेल अ‍ॅड्रेसवर जाण्यासाठी एक फंक्शन.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

ही एक GraphQL क्वेरी आहे.

```typescript
      attestations(
```

आम्ही अटेस्टेशन्स शोधत आहोत.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

आम्हाला हवी असलेली अटेस्टेशन्स आमच्या स्कीमामध्ये आहेत, जिथे प्राप्तकर्ता `getAddress(ethAddr)` आहे. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) फंक्शन खात्री करते की आमच्या अ‍ॅड्रेसमध्ये योग्य [चेकसम](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) आहे. हे आवश्यक आहे कारण GraphQL केस-सिग्निफिकेंट आहे. "0xBAD060A7", "0xBad060A7", आणि "0xbad060a7" ही वेगवेगळी मूल्ये आहेत.

```typescript
        take: 1
```

आपल्याला कितीही अटेस्टेशन्स सापडले तरी, आम्हाला फक्त पहिलेच हवे आहे.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

आम्हाला मिळवायचे असलेले फिल्ड्स.

- `attester`: ज्या अ‍ॅड्रेसने अटेस्टेशन सादर केले. सामान्यतः याचा वापर अटेस्टेशनवर विश्वास ठेवायचा की नाही हे ठरवण्यासाठी केला जातो.
- `id`: अटेस्टेशन आयडी. तुम्ही GraphQL क्वेरीमधून मिळालेली माहिती योग्य आहे की नाही हे तपासण्यासाठी [अटेस्टेशन ऑनचेन वाचण्यासाठी](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) हे मूल्य वापरू शकता.
- `data`: स्कीमा डेटा (या प्रकरणात, ई-मेल अ‍ॅड्रेस).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

जर अटेस्टेशन नसेल, तर एक असे मूल्य परत करा जे स्पष्टपणे चुकीचे आहे, परंतु सर्व्हिस प्रोव्हायडरला ते वैध वाटेल.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

जर मूल्य असेल, तर डेटा डीकोड करण्यासाठी `decodeData` वापरा. आम्हाला ते प्रदान करत असलेला मेटाडेटा नको, फक्त मूल्यच हवे आहे.

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

ई-मेल अ‍ॅड्रेस मिळवण्यासाठी नवीन फंक्शन वापरा.

## विकेंद्रीकरणाचे काय?

या कॉन्फिगरेशनमध्ये वापरकर्ते स्वतःला दुसरे कोणीतरी असल्याचे भासवू शकत नाहीत, जोपर्यंत आपण Ethereum ते ई-मेल अ‍ॅड्रेस मॅपिंगसाठी विश्वासार्ह अटेस्टर्सवर अवलंबून आहोत. तथापि, आमचा ओळख प्रदाता अजूनही एक केंद्रीकृत घटक आहे. ज्याच्याकडे आयडेंटिटी प्रोव्हायडरची प्रायव्हेट की आहे तो सर्व्हिस प्रोव्हायडरला खोटी माहिती पाठवू शकतो.

[मल्टी-पार्टी कम्प्युटेशन (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) वापरून एक उपाय असू शकतो. मी भविष्यातील ट्युटोरियलमध्ये त्याबद्दल लिहिण्याची आशा करतो.

## निष्कर्ष

लॉग ऑन स्टँडर्डचा अवलंब, जसे की Ethereum सिग्नेचर, कोंबडी आणि अंड्याच्या समस्येला सामोरे जातो. सर्व्हिस प्रोव्हायडर शक्य तितक्या विस्तृत बाजारपेठेत आवाहन करू इच्छितात. वापरकर्ते त्यांच्या लॉग ऑन स्टँडर्डला सपोर्ट करण्याची चिंता न करता सेवांमध्ये प्रवेश करू इच्छितात.
अ‍ॅडॉप्टर्स तयार करणे, जसे की Ethereum IdP, आपल्याला या अडथळ्यावर मात करण्यास मदत करू शकते.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).
