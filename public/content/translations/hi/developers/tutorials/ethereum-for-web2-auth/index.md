---
title: "वेब2 प्रमाणीकरण के लिए इथेरियम का उपयोग करना"
description: "इस ट्यूटोरियल को पढ़ने के बाद, एक डेवलपर इथेरियम लॉगिन (वेब3) को SAML लॉगिन के साथ एकीकृत करने में सक्षम होगा, जो वेब2 में सिंगल साइन-ऑन और अन्य संबंधित सेवाएं प्रदान करने के लिए उपयोग किया जाने वाला एक मानक है। यह वेब2 संसाधनों तक पहुंच को इथेरियम हस्ताक्षर के माध्यम से प्रमाणित करने की अनुमति देता है, जिसमें उपयोगकर्ता विशेषताएँ अनुप्रमाणन से आती हैं।"
author: "ओरी पोमेरेंट्ज़"
tags:
  - वेब2
  - प्रमाणीकरण
  - eas
skill: beginner
breadcrumb: "वेब2 प्रमाणीकरण के लिए इथेरियम"
lang: hi
published: 2025-04-30
---

## परिचय {#introduction}

[SAML](https://www.onelogin.com/learn/saml) वेब2 पर उपयोग किया जाने वाला एक मानक है जो एक [पहचान प्रदाता (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) को [सेवा प्रदाताओं (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) के लिए उपयोगकर्ता जानकारी प्रदान करने की अनुमति देता है।

इस ट्यूटोरियल में आप सीखेंगे कि इथेरियम हस्ताक्षर को SAML के साथ कैसे एकीकृत किया जाए ताकि उपयोगकर्ता अपने इथेरियम वॉलेट का उपयोग करके खुद को उन वेब2 सेवाओं में प्रमाणित कर सकें जो अभी तक मूल रूप से इथेरियम का समर्थन नहीं करती हैं।

ध्यान दें कि यह ट्यूटोरियल दो अलग-अलग दर्शकों के लिए लिखा गया है:

- इथेरियम के लोग जो इथेरियम को समझते हैं और जिन्हें SAML सीखने की आवश्यकता है
- वेब2 के लोग जो SAML और वेब2 प्रमाणीकरण को समझते हैं और जिन्हें इथेरियम सीखने की आवश्यकता है

परिणामस्वरूप, इसमें बहुत सारी परिचयात्मक सामग्री होगी जो आप पहले से ही जानते हैं। बेझिझक इसे छोड़ दें।

### इथेरियम के लोगों के लिए SAML {#saml-for-ethereum-people}

SAML एक केंद्रीकृत प्रोटोकॉल है। एक सेवा प्रदाता (SP) केवल एक पहचान प्रदाता (IdP) से दावों (जैसे "यह मेरा उपयोगकर्ता जॉन है, उसके पास A, B, और C करने की अनुमति होनी चाहिए") को तभी स्वीकार करता है जब उसका इसके साथ, या उस [प्रमाणपत्र प्राधिकरण (certificate authority)](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) के साथ पहले से मौजूद विश्वास संबंध हो जिसने उस IdP के प्रमाणपत्र पर हस्ताक्षर किए हैं।

उदाहरण के लिए, SP एक ट्रैवल एजेंसी हो सकती है जो कंपनियों को यात्रा सेवाएं प्रदान करती है, और IdP किसी कंपनी की आंतरिक वेबसाइट हो सकती है। जब कर्मचारियों को व्यावसायिक यात्रा बुक करने की आवश्यकता होती है, तो ट्रैवल एजेंसी उन्हें वास्तव में यात्रा बुक करने देने से पहले कंपनी द्वारा प्रमाणीकरण के लिए भेजती है।

![Step by step SAML process](./fig-01-saml.png)

यह वह तरीका है जिससे तीन संस्थाएं, ब्राउज़र, SP और IdP, पहुंच के लिए बातचीत करते हैं। SP को ब्राउज़र का उपयोग करने वाले उपयोगकर्ता के बारे में पहले से कुछ भी जानने की आवश्यकता नहीं है, बस IdP पर भरोसा करना है।

### SAML के लोगों के लिए इथेरियम {#ethereum-for-saml-people}

इथेरियम एक विकेंद्रीकृत प्रणाली है। 

![Ethereum logon](./fig-02-eth-logon.png)

उपयोगकर्ताओं के पास एक निजी कुंजी होती है (आमतौर पर ब्राउज़र एक्सटेंशन में रखी जाती है)। निजी कुंजी से आप एक सार्वजनिक कुंजी प्राप्त कर सकते हैं, और उससे एक 20-बाइट पता प्राप्त कर सकते हैं। जब उपयोगकर्ताओं को किसी सिस्टम में लॉग इन करने की आवश्यकता होती है, तो उनसे एक नॉन्स (एकल-उपयोग मूल्य) के साथ एक संदेश पर हस्ताक्षर करने का अनुरोध किया जाता है। सर्वर सत्यापित कर सकता है कि हस्ताक्षर उस पते द्वारा बनाया गया था।

![Getting extra data from attestations](./fig-03-eas-data.png)

हस्ताक्षर केवल इथेरियम पते को सत्यापित करता है। अन्य उपयोगकर्ता विशेषताएँ प्राप्त करने के लिए, आप आमतौर पर [अनुप्रमाणन](https://attest.org/) का उपयोग करते हैं। एक अनुप्रमाणन में आमतौर पर ये फ़ील्ड होते हैं:

- **अनुप्रमाणक (Attestor)**, वह पता जिसने अनुप्रमाणन किया
- **प्राप्तकर्ता (Recipient)**, वह पता जिस पर अनुप्रमाणन लागू होता है
- **डेटा (Data)**, वह डेटा जिसे प्रमाणित किया जा रहा है, जैसे नाम, अनुमतियाँ, आदि।
- **स्कीमा (Schema)**, डेटा की व्याख्या करने के लिए उपयोग किए जाने वाले स्कीमा की ID।

इथेरियम की विकेंद्रीकृत प्रकृति के कारण, कोई भी उपयोगकर्ता अनुप्रमाणन कर सकता है। यह पहचानने के लिए अनुप्रमाणक की पहचान महत्वपूर्ण है कि हम किन अनुप्रमाणनों को विश्वसनीय मानते हैं।

## सेटअप {#setup}

पहला कदम एक SAML SP और एक SAML IdP को आपस में संचारित करना है।

1. सॉफ़्टवेयर डाउनलोड करें। इस लेख के लिए नमूना सॉफ़्टवेयर [GitHub पर](https://github.com/qbzzt/250420-saml-ethereum) है। विभिन्न चरण अलग-अलग शाखाओं में संग्रहीत हैं, इस चरण के लिए आपको `saml-only` चाहिए

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. स्व-हस्ताक्षरित प्रमाणपत्रों के साथ कुंजियाँ बनाएँ। इसका मतलब है कि कुंजी अपना स्वयं का प्रमाणपत्र प्राधिकरण है, और इसे सेवा प्रदाता में मैन्युअल रूप से आयात करने की आवश्यकता है। अधिक जानकारी के लिए [OpenSSL दस्तावेज़](https://docs.openssl.org/master/man1/openssl-req/) देखें। 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. सर्वर प्रारंभ करें (SP और IdP दोनों)

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/) पर SP पर ब्राउज़ करें और IdP (पोर्ट 3001) पर रीडायरेक्ट होने के लिए बटन पर क्लिक करें।

5. IdP को अपना ईमेल पता प्रदान करें और **Login to the service provider** पर क्लिक करें। देखें कि आप वापस सेवा प्रदाता (पोर्ट 3000) पर रीडायरेक्ट हो जाते हैं और यह आपको आपके ईमेल पते से जानता है।

### विस्तृत व्याख्या {#detailed-explanation}

यह कदम दर कदम होता है:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

इस फ़ाइल में पहचान प्रदाता और सेवा प्रदाता दोनों के लिए कॉन्फ़िगरेशन शामिल है। आम तौर पर ये दोनों अलग-अलग संस्थाएं होंगी, लेकिन यहां हम सरलता के लिए कोड साझा कर सकते हैं।

```typescript
const fs = await import("fs")

const protocol="http"
```

अभी के लिए हम केवल परीक्षण कर रहे हैं, इसलिए HTTP का उपयोग करना ठीक है।

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

सार्वजनिक कुंजियों को पढ़ें, जो आम तौर पर दोनों घटकों के लिए उपलब्ध होती हैं (और या तो सीधे विश्वसनीय होती हैं, या किसी विश्वसनीय प्रमाणपत्र प्राधिकरण द्वारा हस्ताक्षरित होती हैं)।

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

दोनों घटकों के लिए URL।

```typescript
export const spPublicData = {
```

सेवा प्रदाता के लिए सार्वजनिक डेटा।

```typescript
    entityID: `${spUrl}/metadata`,
```

परंपरा के अनुसार, SAML में `entityID` वह URL है जहां इकाई का मेटाडेटा उपलब्ध है। यह मेटाडेटा यहां सार्वजनिक डेटा से मेल खाता है, सिवाय इसके कि यह XML रूप में है।

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

हमारे उद्देश्यों के लिए सबसे महत्वपूर्ण परिभाषा `assertionConsumerServer` है। इसका मतलब है कि सेवा प्रदाता को कुछ दावा करने के लिए (उदाहरण के लिए, "जो उपयोगकर्ता आपको यह जानकारी भेजता है वह somebody@example.com है") हमें URL `http://localhost:3000/sp/assertion` पर [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) का उपयोग करने की आवश्यकता है।

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

पहचान प्रदाता के लिए सार्वजनिक डेटा समान है। यह निर्दिष्ट करता है कि किसी उपयोगकर्ता को लॉग इन करने के लिए आप `http://localhost:3001/idp/login` पर POST करते हैं और किसी उपयोगकर्ता को लॉग आउट करने के लिए आप `http://localhost:3001/idp/logout` पर POST करते हैं।

#### src/sp.mts {#srcspmts}

यह वह कोड है जो एक सेवा प्रदाता को लागू करता है।

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

हम SAML को लागू करने के लिए [`samlify`](https://www.npmjs.com/package/samlify) लाइब्रेरी का उपयोग करते हैं।

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` लाइब्रेरी को यह सत्यापित करने के लिए एक पैकेज की अपेक्षा होती है कि XML सही है, अपेक्षित सार्वजनिक कुंजी के साथ हस्ताक्षरित है, आदि। हम इस उद्देश्य के लिए [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) का उपयोग करते हैं।

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

एक [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) एक "मिनी वेब साइट" है जिसे किसी वेब साइट के अंदर माउंट किया जा सकता है। इस मामले में, हम इसका उपयोग सभी सेवा प्रदाता परिभाषाओं को एक साथ समूहित करने के लिए करते हैं।

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

सेवा प्रदाता का अपना प्रतिनिधित्व सभी सार्वजनिक डेटा है, और वह निजी कुंजी है जिसका उपयोग वह जानकारी पर हस्ताक्षर करने के लिए करता है।

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

सार्वजनिक डेटा में वह सब कुछ होता है जो सेवा प्रदाता को पहचान प्रदाता के बारे में जानने की आवश्यकता होती है।

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

अन्य SAML घटकों के साथ अंतर-संचालनीयता को सक्षम करने के लिए, सेवा और पहचान प्रदाताओं को अपना सार्वजनिक डेटा (जिसे मेटाडेटा कहा जाता है) `/metadata` में XML प्रारूप में उपलब्ध होना चाहिए।

```typescript
spRouter.post(`/assertion`,
```

यह वह पृष्ठ है जिसे ब्राउज़र द्वारा स्वयं को पहचानने के लिए एक्सेस किया जाता है। दावे में उपयोगकर्ता पहचानकर्ता (यहां हम ईमेल पते का उपयोग करते हैं) शामिल है, और इसमें अतिरिक्त विशेषताएँ शामिल हो सकती हैं। यह ऊपर दिए गए अनुक्रम आरेख में चरण 7 के लिए हैंडलर है।

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

आप दावे में प्रदान किए गए XML डेटा को देखने के लिए कमेंट आउट किए गए कमांड का उपयोग कर सकते हैं। यह [base64 एन्कोडेड](https://en.wikipedia.org/wiki/Base64) है।

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

पहचान सर्वर से लॉगिन अनुरोध को पार्स करें।

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

उपयोगकर्ता को यह दिखाने के लिए कि हमें लॉगिन मिल गया है, एक HTML प्रतिक्रिया भेजें।

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

विफलता के मामले में उपयोगकर्ता को सूचित करें।

```typescript
spRouter.get('/login',
```

जब ब्राउज़र इस पृष्ठ को प्राप्त करने का प्रयास करता है तो एक लॉगिन अनुरोध बनाएँ। यह ऊपर दिए गए अनुक्रम आरेख में चरण 1 के लिए हैंडलर है।

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

लॉगिन अनुरोध पोस्ट करने के लिए जानकारी प्राप्त करें।

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

यह पृष्ठ स्वचालित रूप से फॉर्म (नीचे देखें) सबमिट करता है। इस तरह उपयोगकर्ता को रीडायरेक्ट होने के लिए कुछ भी नहीं करना पड़ता है। यह ऊपर दिए गए अनुक्रम आरेख में चरण 2 है।

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (पहचान प्रदाता एंडपॉइंट का URL) पर पोस्ट करें।

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

इनपुट नाम `loginRequest.type` (`SAMLRequest`) है। उस फ़ील्ड की सामग्री `loginRequest.context` है, जो फिर से XML है जो base64 एन्कोडेड है।

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[यह मिडलवेयर](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP अनुरोध](https://www.tutorialspoint.com/http/http_requests.htm) के मुख्य भाग (body) को पढ़ता है। डिफ़ॉल्ट रूप से express इसे अनदेखा कर देता है, क्योंकि अधिकांश अनुरोधों को इसकी आवश्यकता नहीं होती है। हमें इसकी आवश्यकता है क्योंकि POST मुख्य भाग का उपयोग करता है।

```typescript
app.use(`/${config.spDir}`, spRouter)
```

राउटर को सेवा प्रदाता निर्देशिका (`/sp`) में माउंट करें।

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

यदि कोई ब्राउज़र रूट निर्देशिका प्राप्त करने का प्रयास करता है, तो उसे लॉगिन पृष्ठ का लिंक प्रदान करें।

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

इस express एप्लिकेशन के साथ `spPort` को सुनें।

#### src/idp.mts {#srcidpmts}

यह पहचान प्रदाता है। यह सेवा प्रदाता के बहुत समान है, नीचे दिए गए स्पष्टीकरण उन भागों के लिए हैं जो भिन्न हैं।

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // विशेषताओं को बनाए रखें
    attributeNamePrefix: "@_", // विशेषताओं के लिए उपसर्ग
  }
)
```

हमें सेवा प्रदाता से प्राप्त XML अनुरोध को पढ़ने और समझने की आवश्यकता है।

```typescript
const getLoginPage = requestId => `
```

यह फ़ंक्शन ऑटो-सबमिट किए गए फॉर्म के साथ पृष्ठ बनाता है जो ऊपर दिए गए अनुक्रम आरेख के चरण 4 में वापस किया जाता है।

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

हम सेवा प्रदाता को दो फ़ील्ड भेजते हैं:

1. वह `requestId` जिसका हम जवाब दे रहे हैं।
2. उपयोगकर्ता पहचानकर्ता (हम अभी के लिए उपयोगकर्ता द्वारा प्रदान किए गए ईमेल पते का उपयोग करते हैं)।

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

यह ऊपर दिए गए अनुक्रम आरेख के चरण 5 के लिए हैंडलर है। [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) लॉगिन प्रतिक्रिया बनाता है। 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

ऑडियंस सेवा प्रदाता है।

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

अनुरोध से निकाली गई जानकारी। अनुरोध में जिस एक पैरामीटर की हमें परवाह है वह requestId है, जो सेवा प्रदाता को अनुरोधों और उनकी प्रतिक्रियाओं का मिलान करने देता है।

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // हस्ताक्षर सुनिश्चित करें
```

प्रतिक्रिया पर हस्ताक्षर करने के लिए डेटा रखने के लिए हमें `signingKey` की आवश्यकता है। सेवा प्रदाता अहस्ताक्षरित अनुरोधों पर भरोसा नहीं करता है।

```typescript
    },
    "post",
    {
      email: req.body.email
```

यह उपयोगकर्ता जानकारी वाला फ़ील्ड है जिसे हम सेवा प्रदाता को वापस भेजते हैं।

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

फिर से, एक ऑटो-सबमिट किए गए फॉर्म का उपयोग करें। यह ऊपर दिए गए अनुक्रम आरेख का चरण 6 है।

```typescript

// लॉगिन अनुरोधों के लिए IdP एंडपॉइंट
idpRouter.post(`/login`,
```

यह वह एंडपॉइंट है जो सेवा प्रदाता से लॉगिन अनुरोध प्राप्त करता है। यह ऊपर दिए गए अनुक्रम आरेख के चरण 3 का हैंडलर है।

```typescript
  async (req, res) => {
    try {
      // वैकल्पिक उपाय क्योंकि मैं parseLoginRequest को काम नहीं करा सका।
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

हमें प्रमाणीकरण अनुरोध की ID पढ़ने के लिए [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) का उपयोग करने में सक्षम होना चाहिए। हालाँकि, मैं इसे काम नहीं करा सका और इस पर बहुत समय बिताना उचित नहीं था, इसलिए मैं केवल एक [सामान्य-उद्देश्य वाले XML पार्सर](https://www.npmjs.com/package/fast-xml-parser) का उपयोग करता हूँ। हमें जो जानकारी चाहिए वह `<samlp:AuthnRequest>` टैग के अंदर `ID` विशेषता है, जो XML के शीर्ष स्तर पर है।

## इथेरियम हस्ताक्षर का उपयोग करना {#using-ethereum-signatures}

अब जब हम सेवा प्रदाता को उपयोगकर्ता पहचान भेज सकते हैं, तो अगला कदम विश्वसनीय तरीके से उपयोगकर्ता पहचान प्राप्त करना है। Viem हमें केवल उपयोगकर्ता पते के लिए वॉलेट से पूछने की अनुमति देता है, लेकिन इसका मतलब है कि जानकारी के लिए ब्राउज़र से पूछना। हम ब्राउज़र को नियंत्रित नहीं करते हैं, इसलिए हम इससे मिलने वाली प्रतिक्रिया पर स्वचालित रूप से भरोसा नहीं कर सकते हैं।

इसके बजाय, IdP ब्राउज़र को हस्ताक्षर करने के लिए एक स्ट्रिंग भेजने जा रहा है। यदि ब्राउज़र में वॉलेट इस स्ट्रिंग पर हस्ताक्षर करता है, तो इसका मतलब है कि यह वास्तव में वही पता है (अर्थात, यह उस पते से मेल खाने वाली निजी कुंजी को जानता है)।

इसे क्रियान्वित देखने के लिए, मौजूदा IdP और SP को रोकें और इन कमांड को चलाएँ:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

फिर [SP पर](http://localhost:3000) ब्राउज़ करें और निर्देशों का पालन करें।

ध्यान दें कि इस बिंदु पर हम नहीं जानते कि इथेरियम पते से ईमेल पता कैसे प्राप्त किया जाए, इसलिए इसके बजाय हम SP को `<ethereum address>@bad.email.address` रिपोर्ट करते हैं।

### विस्तृत व्याख्या {#detailed-explanation-2}

परिवर्तन पिछले आरेख में चरण 4-5 में हैं।

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

हमने केवल `idp.mts` फ़ाइल को बदला है। यहाँ बदले गए भाग हैं।

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

हमें इन दो अतिरिक्त लाइब्रेरी की आवश्यकता है। हम [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) मान बनाने के लिए [`uuid`](https://www.npmjs.com/package/uuid) का उपयोग करते हैं। मान स्वयं मायने नहीं रखता, बस यह तथ्य कि इसका उपयोग केवल एक बार किया जाता है।

[`viem`](https://viem.sh/) लाइब्रेरी हमें इथेरियम परिभाषाओं का उपयोग करने देती है। यहाँ हमें यह सत्यापित करने के लिए इसकी आवश्यकता है कि हस्ताक्षर वास्तव में मान्य है।

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

वॉलेट उपयोगकर्ता से संदेश पर हस्ताक्षर करने की अनुमति मांगता है। एक संदेश जो केवल एक नॉन्स है, उपयोगकर्ताओं को भ्रमित कर सकता है, इसलिए हम इस प्रॉम्प्ट को शामिल करते हैं।

```typescript
// requestIDs को यहाँ रखें
let nonces = {}
```

हमें अनुरोध का जवाब देने में सक्षम होने के लिए अनुरोध जानकारी की आवश्यकता है। हम इसे अनुरोध (चरण 4) के साथ भेज सकते हैं, और इसे वापस प्राप्त कर सकते हैं (चरण 5)। हालाँकि, हम ब्राउज़र से प्राप्त जानकारी पर भरोसा नहीं कर सकते हैं, जो संभावित रूप से शत्रुतापूर्ण उपयोगकर्ता के नियंत्रण में है। इसलिए इसे यहाँ संग्रहीत करना बेहतर है, कुंजी के रूप में नॉन्स के साथ।

ध्यान दें कि हम सरलता के लिए इसे यहाँ एक चर (variable) के रूप में कर रहे हैं। हालाँकि, इसके कई नुकसान हैं:

- हम डिनायल ऑफ सर्विस (denial of service) हमले के प्रति संवेदनशील हैं। एक दुर्भावनापूर्ण उपयोगकर्ता कई बार लॉग ऑन करने का प्रयास कर सकता है, जिससे हमारी मेमोरी भर सकती है।
- यदि IdP प्रक्रिया को पुनरारंभ करने की आवश्यकता है, तो हम मौजूदा मान खो देते हैं।
- हम कई प्रक्रियाओं में लोड बैलेंस नहीं कर सकते हैं, क्योंकि प्रत्येक का अपना चर होगा।

उत्पादन प्रणाली (production system) पर हम एक डेटाबेस का उपयोग करेंगे और किसी प्रकार के समाप्ति तंत्र (expiry mechanism) को लागू करेंगे।

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

एक नॉन्स बनाएँ, और भविष्य में उपयोग के लिए `requestId` को संग्रहीत करें।

```typescript
  return `
<html>
  <head>
    <script type="module">
```

पृष्ठ लोड होने पर यह JavaScript स्वचालित रूप से निष्पादित हो जाता है।

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

हमें `viem` से कई कार्यों की आवश्यकता है।

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

हम तभी काम कर सकते हैं जब ब्राउज़र पर कोई वॉलेट हो।

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

वॉलेट से खातों की सूची का अनुरोध करें (`window.ethereum`)। मान लें कि कम से कम एक है, और केवल पहले वाले को संग्रहीत करें। 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ब्राउज़र वॉलेट के साथ बातचीत करने के लिए एक [वॉलेट क्लाइंट](https://viem.sh/docs/clients/wallet) बनाएँ।

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

उपयोगकर्ता को एक संदेश पर हस्ताक्षर करने के लिए कहें। क्योंकि यह पूरा HTML एक [टेम्पलेट स्ट्रिंग](https://viem.sh/docs/clients/wallet) में है, हम idp प्रक्रिया में परिभाषित चर का उपयोग कर सकते हैं। यह अनुक्रम आरेख में चरण 4.5 है।

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` पर रीडायरेक्ट करें। यह अनुक्रम आरेख में चरण 5 है।

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

हस्ताक्षर ब्राउज़र द्वारा वापस भेजा जाता है, जो संभावित रूप से दुर्भावनापूर्ण है (आपको ब्राउज़र में केवल `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` खोलने से रोकने के लिए कुछ भी नहीं है)। इसलिए, यह सत्यापित करना महत्वपूर्ण है कि IdP प्रक्रिया खराब हस्ताक्षरों को सही ढंग से संभालती है।

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

बाकी केवल मानक HTML है।

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

यह अनुक्रम आरेख में चरण 5 के लिए हैंडलर है।

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

अनुरोध ID प्राप्त करें, और यह सुनिश्चित करने के लिए कि इसका पुन: उपयोग नहीं किया जा सकता है, `nonces` से नॉन्स को हटा दें।

```typescript
  try {
```

चूंकि ऐसे कई तरीके हैं जिनसे हस्ताक्षर अमान्य हो सकता है, हम किसी भी फेंकी गई त्रुटियों (thrown errors) को पकड़ने के लिए इसे `try ... catch` ब्लॉक में लपेटते हैं।

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

अनुक्रम आरेख में चरण 5.5 को लागू करने के लिए [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) का उपयोग करें।

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

हैंडलर का बाकी हिस्सा एक छोटे से बदलाव को छोड़कर, पहले `/loginSubmitted` हैंडलर में जो हमने किया है, उसके बराबर है।

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

हमारे पास वास्तविक ईमेल पता नहीं है (हम इसे अगले भाग में प्राप्त करेंगे), इसलिए अभी के लिए हम इथेरियम पता वापस करते हैं और इसे स्पष्ट रूप से ईमेल पते के रूप में चिह्नित नहीं करते हैं।


```typescript
// लॉगिन अनुरोधों के लिए IdP एंडपॉइंट
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // वैकल्पिक उपाय क्योंकि मैं parseLoginRequest को काम नहीं करा सका।
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

`getLoginPage` के बजाय, अब चरण 3 हैंडलर में `getSignaturePage` का उपयोग करें।

## ईमेल पता प्राप्त करना {#getting-the-email-address}

अगला कदम ईमेल पता प्राप्त करना है, जो सेवा प्रदाता द्वारा अनुरोधित पहचानकर्ता है। ऐसा करने के लिए, हम [इथेरियम अनुप्रमाणन सेवा (Ethereum Attestation Service - EAS)](https://attest.org/) का उपयोग करते हैं।

अनुप्रमाणन प्राप्त करने का सबसे आसान तरीका [GraphQL API](https://docs.attest.org/docs/developer-tools/api) का उपयोग करना है। हम इस क्वेरी का उपयोग करते हैं:

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

इस [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) में केवल एक ई-मेल पता शामिल है। यह क्वेरी इस स्कीमा के अनुप्रमाणन के लिए पूछती है। अनुप्रमाणन के विषय को `recipient` कहा जाता है। यह हमेशा एक इथेरियम पता होता है।

चेतावनी: हम यहाँ जिस तरह से अनुप्रमाणन प्राप्त कर रहे हैं, उसमें दो सुरक्षा समस्याएँ हैं।

- हम API एंडपॉइंट, `https://optimism.easscan.org/graphql` पर जा रहे हैं, जो एक केंद्रीकृत घटक है। हम `id` विशेषता प्राप्त कर सकते हैं और फिर यह सत्यापित करने के लिए ऑनचेन लुकअप कर सकते हैं कि एक अनुप्रमाणन वास्तविक है, लेकिन API एंडपॉइंट अभी भी हमें उनके बारे में न बताकर अनुप्रमाणन को सेंसर कर सकता है। 

  इस समस्या को हल करना असंभव नहीं है, हम अपना स्वयं का GraphQL एंडपॉइंट चला सकते हैं और चेन लॉग से अनुप्रमाणन प्राप्त कर सकते हैं, लेकिन यह हमारे उद्देश्यों के लिए अत्यधिक है।

- हम अनुप्रमाणक की पहचान नहीं देखते हैं। कोई भी हमें गलत जानकारी दे सकता है। वास्तविक दुनिया के कार्यान्वयन में हमारे पास विश्वसनीय अनुप्रमाणकों का एक सेट होगा और हम केवल उनके अनुप्रमाणन को देखेंगे।

इसे क्रियान्वित देखने के लिए, मौजूदा IdP और SP को रोकें और इन कमांड को चलाएँ:

```sh
git checkout email-address
pnpm install
pnpm start
```

फिर अपना ई-मेल पता प्रदान करें। ऐसा करने के आपके पास दो तरीके हैं:

- एक निजी कुंजी का उपयोग करके एक वॉलेट आयात करें, और परीक्षण निजी कुंजी `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` का उपयोग करें।

- अपने स्वयं के ई-मेल पते के लिए एक अनुप्रमाणन जोड़ें:

  1. [अनुप्रमाणन एक्सप्लोरर में स्कीमा](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) पर ब्राउज़ करें।

  2. **Attest with Schema** पर क्लिक करें।

  3. प्राप्तकर्ता के रूप में अपना इथेरियम पता, ईमेल पते के रूप में अपना ई-मेल पता दर्ज करें, और **Onchain** चुनें। फिर **Make Attestation** पर क्लिक करें।

  4. अपने वॉलेट में लेन-देन को स्वीकृति दें। गैस का भुगतान करने के लिए आपको [ऑप्टिमिज़्म ब्लॉकचेन](https://app.optimism.io/bridge/deposit) पर कुछ ETH की आवश्यकता होगी।

किसी भी तरह से, ऐसा करने के बाद [http://localhost:3000](http://localhost:3000) पर ब्राउज़ करें और निर्देशों का पालन करें। यदि आपने परीक्षण निजी कुंजी आयात की है, तो आपको प्राप्त होने वाला ई-मेल `test_addr_0@example.com` है। यदि आपने अपने स्वयं के पते का उपयोग किया है, तो यह वही होना चाहिए जिसे आपने प्रमाणित किया है।

### विस्तृत व्याख्या {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

नए चरण GraphQL संचार हैं, चरण 5.6 और 5.7।

फिर से, यहाँ `idp.mts` के बदले गए भाग हैं।

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

हमें जिन लाइब्रेरी की आवश्यकता है उन्हें आयात करें।

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[प्रत्येक ब्लॉकचेन के लिए एक अलग एंडपॉइंट](https://docs.attest.org/docs/developer-tools/api) है।

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

एक नया `GraphQLClient` क्लाइंट बनाएँ जिसका उपयोग हम एंडपॉइंट को क्वेरी करने के लिए कर सकते हैं।

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL हमें केवल बाइट्स के साथ एक अपारदर्शी डेटा ऑब्जेक्ट देता है। इसे समझने के लिए हमें स्कीमा की आवश्यकता है।

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

इथेरियम पते से ई-मेल पते तक प्राप्त करने के लिए एक फ़ंक्शन।

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

यह एक GraphQL क्वेरी है।

```typescript
      attestations(
```

हम अनुप्रमाणन की तलाश कर रहे हैं।

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

हम जो अनुप्रमाणन चाहते हैं वे हमारे स्कीमा में हैं, जहाँ प्राप्तकर्ता `getAddress(ethAddr)` है। [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) फ़ंक्शन यह सुनिश्चित करता है कि हमारे पते में सही [चेकसम (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) है। यह आवश्यक है क्योंकि GraphQL केस-संवेदी (case-significant) है। "0xBAD060A7", "0xBad060A7", और "0xbad060a7" अलग-अलग मान हैं।

```typescript
        take: 1
```

भले ही हमें कितने भी अनुप्रमाणन मिलें, हम केवल पहला वाला चाहते हैं।

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

वे फ़ील्ड जो हम प्राप्त करना चाहते हैं।

- `attester`: वह पता जिसने अनुप्रमाणन प्रस्तुत किया। आम तौर पर इसका उपयोग यह तय करने के लिए किया जाता है कि अनुप्रमाणन पर भरोसा किया जाए या नहीं।
- `id`: अनुप्रमाणन ID। आप यह सत्यापित करने के लिए कि GraphQL क्वेरी से जानकारी सही है, [ऑनचेन अनुप्रमाणन पढ़ने](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) के लिए इस मान का उपयोग कर सकते हैं।
- `data`: स्कीमा डेटा (इस मामले में, ई-मेल पता)।

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

यदि कोई अनुप्रमाणन नहीं है, तो एक ऐसा मान वापस करें जो स्पष्ट रूप से गलत है, लेकिन जो सेवा प्रदाता को मान्य प्रतीत होगा।

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

यदि कोई मान है, तो डेटा को डिकोड करने के लिए `decodeData` का उपयोग करें। हमें इसके द्वारा प्रदान किए जाने वाले मेटाडेटा की आवश्यकता नहीं है, केवल मान की ही आवश्यकता है।

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

ई-मेल पता प्राप्त करने के लिए नए फ़ंक्शन का उपयोग करें।

## विकेंद्रीकरण के बारे में क्या? {#what-about-decentralization}

इस कॉन्फ़िगरेशन में उपयोगकर्ता वह होने का दिखावा नहीं कर सकते जो वे नहीं हैं, जब तक कि हम इथेरियम से ई-मेल पते की मैपिंग के लिए भरोसेमंद अनुप्रमाणकों पर भरोसा करते हैं। हालाँकि, हमारा पहचान प्रदाता अभी भी एक केंद्रीकृत घटक है। जिसके पास भी पहचान प्रदाता की निजी कुंजी है, वह सेवा प्रदाता को गलत जानकारी भेज सकता है।

[मल्टी-पार्टी कंप्यूटेशन (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) का उपयोग करके एक समाधान हो सकता है। मुझे भविष्य के ट्यूटोरियल में इसके बारे में लिखने की उम्मीद है।

## निष्कर्ष {#conclusion}

इथेरियम हस्ताक्षर जैसे लॉग ऑन मानक को अपनाने में मुर्गी और अंडे की समस्या का सामना करना पड़ता है। सेवा प्रदाता व्यापक संभव बाजार को आकर्षित करना चाहते हैं। उपयोगकर्ता अपने लॉग ऑन मानक का समर्थन करने की चिंता किए बिना सेवाओं तक पहुंचने में सक्षम होना चाहते हैं।
इथेरियम IdP जैसे एडेप्टर बनाना, हमें इस बाधा को दूर करने में मदद कर सकता है।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।