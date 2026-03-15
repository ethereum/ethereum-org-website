---
title: "वेब2 प्रमाणीकरण के लिए एथेरियम का उपयोग करना"
description: "इस ट्यूटोरियल को पढ़ने के बाद, एक डेवलपर एथेरियम लॉगिन (वेब3) को SAML लॉगिन के साथ एकीकृत करने में सक्षम हो जाएगा, जो वेब2 में एकल साइन-ऑन और अन्य संबंधित सेवाएं प्रदान करने के लिए उपयोग किया जाने वाला एक मानक है। यह एथेरियम हस्ताक्षरों के माध्यम से वेब2 संसाधनों तक पहुंच को प्रमाणित करने की अनुमति देता है, जिसमें यूज़र की विशेषताएं साक्षियों से आती हैं।"
author: "ओरी पोमेरेन्ट्ज़"
tags: [ "web2", "प्रमाणीकरण", "ईएएस" ]
skill: beginner
lang: hi
published: 2025-04-30
---

## परिचय

[SAML](https://www.onelogin.com/learn/saml) वेब2 पर इस्तेमाल किया जाने वाला एक मानक है जो एक [पहचान प्रदाता (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) को [सेवा प्रदाताओं (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) के लिए यूज़र जानकारी प्रदान करने की अनुमति देता है।

इस ट्यूटोरियल में आप सीखेंगे कि एथेरियम हस्ताक्षरों को SAML के साथ कैसे एकीकृत किया जाए ताकि यूज़र अपने एथेरियम वॉलेट का उपयोग उन वेब2 सेवाओं में खुद को प्रमाणित करने के लिए कर सकें जो अभी तक एथेरियम को मूल रूप से समर्थन नहीं करती हैं।

ध्यान दें कि यह ट्यूटोरियल दो अलग-अलग दर्शकों के लिए लिखा गया है:

- एथेरियम से जुड़े लोग जो एथेरियम को समझते हैं और जिन्हें SAML सीखने की ज़रूरत है
- वेब2 से जुड़े लोग जो SAML और वेब2 प्रमाणीकरण को समझते हैं और जिन्हें एथेरियम सीखने की ज़रूरत है

परिणामस्वरूप, इसमें बहुत सारी परिचयात्मक सामग्री होने वाली है जिसे आप पहले से जानते हैं। इसे छोड़ने के लिए स्वतंत्र महसूस करें।

### एथेरियम लोगों के लिए SAML

SAML एक केंद्रीकृत प्रोटोकॉल है। एक सेवा प्रदाता (SP) किसी पहचान प्रदाता (IdP) से केवल तभी दावे (जैसे "यह मेरा यूज़र जॉन है, उसके पास A, B, और C करने की अनुमति होनी चाहिए") स्वीकार करता है, जब उसका या तो उसके साथ या उस [प्रमाणपत्र प्राधिकारी](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) के साथ पहले से मौजूद विश्वास संबंध हो, जिसने उस IdP के प्रमाणपत्र पर हस्ताक्षर किए हों।

उदाहरण के लिए, SP एक ट्रैवल एजेंसी हो सकती है जो कंपनियों को यात्रा सेवाएं प्रदान करती है, और IdP एक कंपनी की आंतरिक वेब साइट हो सकती है। जब कर्मचारियों को व्यावसायिक यात्रा बुक करने की आवश्यकता होती है, तो ट्रैवल एजेंसी उन्हें वास्तव में यात्रा बुक करने देने से पहले प्रमाणीकरण के लिए कंपनी के पास भेजती है।

![चरण-दर-चरण SAML प्रक्रिया](./fig-01-saml.png)

यह वह तरीका है जिससे तीन संस्थाएँ, ब्राउज़र, SP, और IdP, पहुँच के लिए बातचीत करती हैं। SP को ब्राउज़र का उपयोग करने वाले यूज़र के बारे में पहले से कुछ भी जानने की आवश्यकता नहीं है, बस IdP पर भरोसा करना है।

### SAML लोगों के लिए एथेरियम

एथेरियम एक विकेंद्रीकृत प्रणाली है।

![एथेरियम लॉगऑन](./fig-02-eth-logon.png)

यूज़र्स के पास एक निजी चाबी होती है (आमतौर पर एक ब्राउज़र एक्सटेंशन में रखी जाती है)। निजी चाबी से आप एक सार्वजनिक कुंजी प्राप्त कर सकते हैं, और उससे एक 20-बाइट का पता। जब यूज़र्स को किसी सिस्टम में लॉग इन करने की आवश्यकता होती है, तो उन्हें एक नॉन्स (एकल-उपयोग मान) के साथ एक संदेश पर हस्ताक्षर करने के लिए अनुरोध किया जाता है। सर्वर यह सत्यापित कर सकता है कि हस्ताक्षर उस पते द्वारा बनाया गया था।

![साक्षियों से अतिरिक्त डेटा प्राप्त करना](./fig-03-eas-data.png)

हस्ताक्षर केवल एथेरियम पते की पुष्टि करता है। अन्य यूज़र विशेषताओं को प्राप्त करने के लिए, आप आमतौर पर [साक्षियों](https://attest.org/) का उपयोग करते हैं। एक साक्षी में आमतौर पर ये फ़ील्ड होती हैं:

- **साक्षीकर्ता**, वह पता जिसने साक्षी बनाई
- **प्राप्तकर्ता**, वह पता जिस पर साक्षी लागू होती है
- **डेटा**, प्रमाणित किया जा रहा डेटा, जैसे नाम, अनुमतियाँ, आदि।
- **स्कीमा**, डेटा की व्याख्या के लिए उपयोग किए गए स्कीमा की ID।

एथेरियम की विकेन्द्रीकृत प्रकृति के कारण, कोई भी यूज़र साक्षी बना सकता है। साक्षीकर्ता की पहचान यह पहचानने के लिए महत्वपूर्ण है कि हम किन साक्षियों को विश्वसनीय मानते हैं।

## सेटअप

पहला कदम एक SAML SP और एक SAML IdP का आपस में संचार करना है।

1. सॉफ़्टवेयर डाउनलोड करें। इस लेख के लिए नमूना सॉफ़्टवेयर [github पर](https://github.com/qbzzt/250420-saml-ethereum) है। विभिन्न चरण विभिन्न शाखाओं में संग्रहीत हैं, इस चरण के लिए आप `saml-only` चाहते हैं

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. स्व-हस्ताक्षरित प्रमाणपत्रों के साथ कुंजियाँ बनाएँ। इसका मतलब है कि कुंजी इसका अपना प्रमाणपत्र प्राधिकारी है, और इसे सेवा प्रदाता में मैन्युअल रूप से आयात करने की आवश्यकता है। अधिक जानकारी के लिए [OpenSSL दस्तावेज़](https://docs.openssl.org/master/man1/openssl-req/) देखें।

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

5. IdP को अपना ईमेल पता प्रदान करें और **सेवा प्रदाता में लॉगिन करें** पर क्लिक करें। देखें कि आपको सेवा प्रदाता (पोर्ट 3000) पर वापस रीडायरेक्ट कर दिया गया है और यह आपको आपके ईमेल पते से जानता है।

### विस्तृत व्याख्या

यह चरण-दर-चरण होता है:

![एथेरियम के बिना सामान्य SAML लॉगऑन](./fig-04-saml-no-eth.png)

#### src/config.mts

इस फ़ाइल में पहचान प्रदाता और सेवा प्रदाता दोनों के लिए कॉन्फ़िगरेशन शामिल है। आम तौर पर ये दोनों अलग-अलग संस्थाएँ होंगी, लेकिन यहाँ हम सरलता के लिए कोड साझा कर सकते हैं।

```typescript
const fs = await import("fs")

const protocol="http"
```

अभी के लिए हम सिर्फ़ परीक्षण कर रहे हैं, इसलिए HTTP का उपयोग करना ठीक है।

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

सार्वजनिक कुंजियों को पढ़ें, जो आम तौर पर दोनों घटकों के लिए उपलब्ध होती हैं (और या तो सीधे विश्वसनीय होती हैं, या एक विश्वसनीय प्रमाणपत्र प्राधिकारी द्वारा हस्ताक्षरित होती हैं)।

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

परंपरा के अनुसार, SAML में `entityID` वह URL है जहाँ इकाई का मेटाडेटा उपलब्ध होता है। यह मेटाडेटा यहाँ सार्वजनिक डेटा से मेल खाता है, सिवाय इसके कि यह XML रूप में है।

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

हमारे उद्देश्यों के लिए सबसे महत्वपूर्ण परिभाषा `assertionConsumerServer` है। इसका मतलब है कि सेवा प्रदाता को कुछ दावा करने के लिए (उदाहरण के लिए, "यह जानकारी भेजने वाला यूज़र somebody@example.com है") हमें URL `http://localhost:3000/sp/assertion` पर [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) का उपयोग करने की आवश्यकता है।

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

पहचान प्रदाता के लिए सार्वजनिक डेटा समान है। यह निर्दिष्ट करता है कि किसी यूज़र को लॉग इन करने के लिए आप `http://localhost:3001/idp/login` पर पोस्ट करते हैं और किसी यूज़र को लॉग आउट करने के लिए आप `http://localhost:3001/idp/logout` पर पोस्ट करते हैं।

#### src/sp.mts

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

`samlify` लाइब्रेरी यह उम्मीद करती है कि एक पैकेज यह सत्यापित करेगा कि XML सही है, अपेक्षित सार्वजनिक कुंजी के साथ हस्ताक्षरित है, आदि। हम इस उद्देश्य के लिए [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) का उपयोग करते हैं।

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

एक [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) एक "मिनी वेब साइट" है जिसे एक वेब साइट के अंदर माउंट किया जा सकता है। इस मामले में, हम इसका उपयोग सभी सेवा प्रदाता परिभाषाओं को एक साथ समूहित करने के लिए करते हैं।

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

सेवा प्रदाता का स्वयं का प्रतिनिधित्व सभी सार्वजनिक डेटा है, और वह निजी चाबी है जिसका उपयोग वह जानकारी पर हस्ताक्षर करने के लिए करता है।

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

सार्वजनिक डेटा में वह सब कुछ होता है जो सेवा प्रदाता को पहचान प्रदाता के बारे में जानने की आवश्यकता होती है।

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

अन्य SAML घटकों के साथ अंतर-संचालनीयता को सक्षम करने के लिए, सेवा और पहचान प्रदाताओं के पास `/metadata` में XML प्रारूप में उनका सार्वजनिक डेटा (मेटाडेटा कहा जाता है) उपलब्ध होना चाहिए।

```typescript
spRouter.post(`/assertion`,
```

यह वह पृष्ठ है जिस पर ब्राउज़र अपनी पहचान बनाने के लिए पहुँचता है। दावे में यूज़र पहचानकर्ता (यहाँ हम ईमेल पते का उपयोग करते हैं) शामिल है, और इसमें अतिरिक्त विशेषताएँ शामिल हो सकती हैं। यह ऊपर के अनुक्रम आरेख में चरण 7 के लिए हैंडलर है।

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

आप दावे में प्रदान किए गए XML डेटा को देखने के लिए टिप्पणी की गई कमांड का उपयोग कर सकते हैं। यह [base64 एन्कोडेड](https://en.wikipedia.org/wiki/Base64) है।

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

एक HTML प्रतिक्रिया भेजें, बस यूज़र को यह दिखाने के लिए कि हमें लॉगिन मिल गया है।

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

विफलता की स्थिति में यूज़र को सूचित करें।

```typescript
spRouter.get('/login',
```

जब ब्राउज़र इस पृष्ठ को प्राप्त करने का प्रयास करता है तो एक लॉगिन अनुरोध बनाएँ। यह ऊपर के अनुक्रम आरेख में चरण 1 के लिए हैंडलर है।

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

यह पृष्ठ फ़ॉर्म (नीचे देखें) को स्वचालित रूप से सबमिट करता है। इस तरह यूज़र को रीडायरेक्ट होने के लिए कुछ भी करने की ज़रूरत नहीं है। यह ऊपर के अनुक्रम आरेख में चरण 2 है।

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (पहचान प्रदाता एंडपॉइंट का URL) पर पोस्ट करें।

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

इनपुट नाम `loginRequest.type` (`SAMLRequest`) है। उस फ़ील्ड के लिए सामग्री `loginRequest.context` है, जो फिर से XML है जो base64 एन्कोडेड है।

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[यह मिडलवेयर](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP अनुरोध](https://www.tutorialspoint.com/http/http_requests.htm) के मुख्य भाग को पढ़ता है। डिफ़ॉल्ट रूप से एक्सप्रेस इसे अनदेखा करता है, क्योंकि अधिकांश अनुरोधों के लिए इसकी आवश्यकता नहीं होती है। हमें इसकी आवश्यकता है क्योंकि POST मुख्य भाग का उपयोग करता है।

```typescript
app.use(`/${config.spDir}`, spRouter)
```

सेवा प्रदाता निर्देशिका (`/sp`) में राउटर को माउंट करें।

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

यदि कोई ब्राउज़र रूट निर्देशिका प्राप्त करने का प्रयास करता है, तो उसे लॉगिन पृष्ठ का एक लिंक प्रदान करें।

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

इस एक्सप्रेस एप्लिकेशन के साथ `spPort` को सुनें।

#### src/idp.mts

यह पहचान प्रदाता है। यह सेवा प्रदाता के बहुत समान है, नीचे दी गई व्याख्याएँ उन हिस्सों के लिए हैं जो अलग हैं।

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

हमें सेवा प्रदाता से प्राप्त XML अनुरोध को पढ़ने और समझने की आवश्यकता है।

```typescript
const getLoginPage = requestId => `
```

यह फ़ंक्शन स्वचालित रूप से सबमिट किए गए फ़ॉर्म के साथ पृष्ठ बनाता है जो ऊपर अनुक्रम आरेख के चरण 4 में लौटाया जाता है।

```typescript
<html>
  <head>
    <title>लॉगिन पेज</title>
  </head>
  <body>
    <h2>लॉगिन पेज</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      ईमेल पता: <input name="email" />
      <br />
      <button type="Submit">
        सेवा प्रदाता पर लॉगिन करें
      </button>
```

हम सेवा प्रदाता को दो फ़ील्ड भेजते हैं:

1. `requestId` जिसका हम जवाब दे रहे हैं।
2. यूज़र पहचानकर्ता (हम अभी के लिए यूज़र द्वारा प्रदान किए गए ईमेल पते का उपयोग करते हैं)।

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

यह ऊपर के अनुक्रम आरेख में चरण 5 के लिए हैंडलर है। [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) लॉगिन प्रतिक्रिया बनाता है।

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

दर्शक सेवा प्रदाता है।

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

अनुरोध से निकाली गई जानकारी। अनुरोध में जिस एक पैरामीटर की हमें परवाह है, वह है requestId, जो सेवा प्रदाता को अनुरोधों और उनकी प्रतिक्रियाओं का मिलान करने देता है।

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

हमें प्रतिक्रिया पर हस्ताक्षर करने के लिए डेटा रखने के लिए `signingKey` की आवश्यकता है। सेवा प्रदाता अहस्ताक्षरित अनुरोधों पर भरोसा नहीं करता है।

```typescript
    },
    "post",
    {
      email: req.body.email
```

यह यूज़र जानकारी वाला फ़ील्ड है जिसे हम सेवा प्रदाता को वापस भेजते हैं।

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

फिर से, एक ऑटो-सबमिट किए गए फ़ॉर्म का उपयोग करें। यह ऊपर के अनुक्रम आरेख में चरण 6 है।

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

यह वह एंडपॉइंट है जो सेवा प्रदाता से लॉगिन अनुरोध प्राप्त करता है। यह ऊपर के अनुक्रम आरेख के चरण 3 के लिए हैंडलर है।

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

हमें प्रमाणीकरण अनुरोध की ID पढ़ने के लिए [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) का उपयोग करने में सक्षम होना चाहिए। हालाँकि, मैं इसे काम नहीं करवा सका और इस पर बहुत समय खर्च करना उचित नहीं था इसलिए मैं बस एक [सामान्य-उद्देश्य XML पार्सर](https://www.npmjs.com/package/fast-xml-parser) का उपयोग करता हूँ। हमें जिस जानकारी की आवश्यकता है, वह `<samlp:AuthnRequest>` टैग के अंदर `ID` विशेषता है, जो XML के शीर्ष स्तर पर है।

## एथेरियम हस्ताक्षरों का उपयोग करना

अब जब हम सेवा प्रदाता को यूज़र की पहचान भेज सकते हैं, तो अगला कदम एक विश्वसनीय तरीके से यूज़र की पहचान प्राप्त करना है। Viem हमें वॉलेट से यूज़र के पते के लिए पूछने की अनुमति देता है, लेकिन इसका मतलब ब्राउज़र से जानकारी मांगना है। हम ब्राउज़र को नियंत्रित नहीं करते हैं, इसलिए हम इससे मिलने वाली प्रतिक्रिया पर स्वचालित रूप से भरोसा नहीं कर सकते हैं।

इसके बजाय, IdP ब्राउज़र को हस्ताक्षर करने के लिए एक स्ट्रिंग भेजेगा। यदि ब्राउज़र में वॉलेट इस स्ट्रिंग पर हस्ताक्षर करता है, तो इसका मतलब है कि यह वास्तव में वह पता है (यानी, यह उस पते से मेल खाने वाली निजी चाबी जानता है)।

इसे क्रिया में देखने के लिए, मौजूदा IdP और SP को रोकें और इन कमांड को चलाएँ:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

फिर [SP](http://localhost:3000) पर ब्राउज़ करें और निर्देशों का पालन करें।

ध्यान दें कि इस समय हम यह नहीं जानते हैं कि एथेरियम पते से ईमेल पता कैसे प्राप्त करें, इसलिए इसके बजाय हम SP को `<ethereum address>@bad.email.address` रिपोर्ट करते हैं।

### विस्तृत व्याख्या

परिवर्तन पिछले आरेख में चरण 4-5 में हैं।

![एक एथेरियम हस्ताक्षर के साथ SAML](./fig-05-saml-w-signature.png)

हमने जिस एकमात्र फ़ाइल को बदला है वह `idp.mts` है। यहाँ बदले हुए भाग हैं।

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

हमें इन दो अतिरिक्त पुस्तकालयों की आवश्यकता है। हम [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) मान बनाने के लिए [`uuid`](https://www.npmjs.com/package/uuid) का उपयोग करते हैं। मान स्वयं मायने नहीं रखता है, बस यह तथ्य है कि इसका उपयोग केवल एक बार किया जाता है।

[`viem`](https://viem.sh/) लाइब्रेरी हमें एथेरियम परिभाषाओं का उपयोग करने देती है। यहाँ हमें यह सत्यापित करने की आवश्यकता है कि हस्ताक्षर वास्तव में मान्य है।

```typescript
const loginPrompt = "सेवा प्रदाता तक पहुँचने के लिए, इस नॉन्स पर हस्ताक्षर करें: "
```

वॉलेट यूज़र से संदेश पर हस्ताक्षर करने की अनुमति मांगता है। एक संदेश जो केवल एक नॉन्स है, यूज़र्स को भ्रमित कर सकता है, इसलिए हम इस प्रॉम्प्ट को शामिल करते हैं।

```typescript
// Keep requestIDs here
let nonces = {}
```

हमें इसका जवाब देने में सक्षम होने के लिए अनुरोध जानकारी की आवश्यकता है। हम इसे अनुरोध (चरण 4) के साथ भेज सकते हैं, और इसे वापस प्राप्त कर सकते हैं (चरण 5)। हालाँकि, हम ब्राउज़र से मिलने वाली जानकारी पर भरोसा नहीं कर सकते, जो संभावित रूप से शत्रुतापूर्ण यूज़र के नियंत्रण में है। तो इसे यहाँ संग्रहीत करना बेहतर है, कुंजी के रूप में नॉन्स के साथ।

ध्यान दें कि हम इसे यहाँ सरलता के लिए एक चर के रूप में कर रहे हैं। हालाँकि, इसके कई नुकसान हैं:

- हम सेवा से इनकार के हमले के प्रति संवेदनशील हैं। एक दुर्भावनापूर्ण यूज़र कई बार लॉग ऑन करने का प्रयास कर सकता है, जिससे हमारी मेमोरी भर जाएगी।
- यदि IdP प्रक्रिया को पुनरारंभ करने की आवश्यकता है, तो हम मौजूदा मान खो देते हैं।
- हम कई प्रक्रियाओं में लोड को संतुलित नहीं कर सकते हैं, क्योंकि प्रत्येक का अपना चर होगा।

एक उत्पादन प्रणाली पर हम एक डेटाबेस का उपयोग करेंगे और किसी प्रकार की समाप्ति तंत्र लागू करेंगे।

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

यह जावास्क्रिप्ट पृष्ठ लोड होने पर स्वचालित रूप से निष्पादित हो जाता है।

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

हमें `viem` से कई फ़ंक्शन की आवश्यकता है।

```typescript
      if (!window.ethereum) {
          alert("कृपया MetaMask या एक संगत वॉलेट स्थापित करें और फिर पुनः लोड करें")
      }
```

हम केवल तभी काम कर सकते हैं जब ब्राउज़र पर कोई वॉलेट हो।

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

वॉलेट (`window.ethereum`) से खातों की सूची का अनुरोध करें। मान लें कि कम से कम एक है, और केवल पहले वाले को संग्रहीत करें।

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

ब्राउज़र वॉलेट के साथ इंटरैक्ट करने के लिए एक [वॉलेट क्लाइंट](https://viem.sh/docs/clients/wallet) बनाएँ।

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

यूज़र से एक संदेश पर हस्ताक्षर करने के लिए कहें। क्योंकि यह पूरा HTML एक [टेम्पलेट स्ट्रिंग](https://viem.sh/docs/clients/wallet) में है, हम idp प्रक्रिया में परिभाषित चर का उपयोग कर सकते हैं। यह अनुक्रम आरेख में चरण 4.5 है।

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

हस्ताक्षर ब्राउज़र द्वारा वापस भेजा जाता है, जो संभावित रूप से दुर्भावनापूर्ण है (ब्राउज़र में `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` खोलने से आपको कोई नहीं रोक सकता)। इसलिए, यह सत्यापित करना महत्वपूर्ण है कि IdP प्रक्रिया खराब हस्ताक्षरों को सही ढंग से संभालती है।

```typescript
    </script>
  </head>
  <body>
    <h2>कृपया हस्ताक्षर करें</h2>
    <button onClick="window.goodSignature()">
      एक अच्छा (मान्य) हस्ताक्षर सबमिट करें
    </button>
    <br/>
    <button onClick="window.badSignature()">
      एक खराब (अमान्य) हस्ताक्षर सबमिट करें
    </button>
  </body>
</html>  
`
}
```

बाकी सब मानक HTML है।

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

क्योंकि हस्ताक्षर के अमान्य होने के इतने सारे तरीके हैं, हम इसे एक `try ...` में लपेटते हैं। `catch` ब्लॉक किसी भी फेंकी गई त्रुटियों को पकड़ने के लिए।

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

हैंडलर का बाकी हिस्सा `/loginSubmitted` हैंडलर में पहले किए गए काम के बराबर है, सिवाय एक छोटे से बदलाव के।

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

हमारे पास वास्तविक ईमेल पता नहीं है (हम इसे अगले अनुभाग में प्राप्त करेंगे), इसलिए अभी के लिए हम एथेरियम पता लौटाते हैं और इसे स्पष्ट रूप से एक ईमेल पते के रूप में चिह्नित नहीं करते हैं।

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

`getLoginPage` के बजाय, अब चरण 3 हैंडलर में `getSignaturePage` का उपयोग करें।

## ईमेल पता प्राप्त करना

अगला कदम ईमेल पता प्राप्त करना है, जो सेवा प्रदाता द्वारा अनुरोधित पहचानकर्ता है। ऐसा करने के लिए, हम [एथेरियम साक्षी सेवा (EAS)](https://attest.org/) का उपयोग करते हैं।

साक्षियाँ प्राप्त करने का सबसे आसान तरीका [GraphQL API](https://docs.attest.org/docs/developer-tools/api) का उपयोग करना है। हम इस क्वेरी का उपयोग करते हैं:

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

इस [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) में केवल एक ई-मेल पता शामिल है। यह क्वेरी इस स्कीमा की साक्षियों के लिए पूछती है। साक्षी का विषय `recipient` कहलाता है। यह हमेशा एक एथेरियम पता होता है।

चेतावनी: जिस तरह से हम यहाँ साक्षियाँ प्राप्त कर रहे हैं, उसमें दो सुरक्षा मुद्दे हैं।

- हम API एंडपॉइंट, `https://optimism.easscan.org/graphql` पर जा रहे हैं, जो एक केंद्रीकृत घटक है। हम `id` विशेषता प्राप्त कर सकते हैं और फिर यह सत्यापित करने के लिए ऑन-चेन लुकअप कर सकते हैं कि एक साक्षी वास्तविक है, लेकिन API एंडपॉइंट अभी भी हमें उनके बारे में न बताकर साक्षियों को सेंसर कर सकता है।

  इस समस्या को हल करना असंभव नहीं है, हम अपना स्वयं का GraphQL एंडपॉइंट चला सकते हैं और चेन लॉग से साक्षियाँ प्राप्त कर सकते हैं, लेकिन यह हमारे उद्देश्यों के लिए अत्यधिक है।

- हम साक्षीकर्ता की पहचान को नहीं देखते हैं। कोई भी हमें झूठी जानकारी दे सकता है। एक वास्तविक दुनिया के कार्यान्वयन में हमारे पास विश्वसनीय साक्षीकर्ताओं का एक सेट होगा और केवल उनकी साक्षियों को देखेंगे।

इसे क्रिया में देखने के लिए, मौजूदा IdP और SP को रोकें और इन कमांड को चलाएँ:

```sh
git checkout email-address
pnpm install
pnpm start
```

फिर अपना ई-मेल पता प्रदान करें। ऐसा करने के आपके पास दो तरीके हैं:

- एक निजी चाबी का उपयोग करके एक वॉलेट आयात करें, और परीक्षण निजी चाबी `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` का उपयोग करें।

- अपने स्वयं के ई-मेल पते के लिए एक साक्षी जोड़ें:

  1. [साक्षी एक्सप्लोरर में स्कीमा](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) पर ब्राउज़ करें।

  2. **स्कीमा के साथ साक्षी दें** पर क्लिक करें।

  3. प्राप्तकर्ता के रूप में अपना एथेरियम पता, ईमेल पते के रूप में अपना ई-मेल पता दर्ज करें, और **ऑनचेन** चुनें। फिर **साक्षी बनाएँ** पर क्लिक करें।

  4. अपने वॉलेट में लेनदेन को स्वीकृत करें। गैस का भुगतान करने के लिए आपको [ऑप्टिमिज्म ब्लॉकचेन](https://app.optimism.io/bridge/deposit) पर कुछ ETH की आवश्यकता होगी।

किसी भी तरह, ऐसा करने के बाद [http://localhost:3000](http://localhost:3000) पर ब्राउज़ करें और निर्देशों का पालन करें। यदि आपने परीक्षण निजी चाबी आयात की है, तो आपको मिलने वाला ई-मेल `test_addr_0@example.com` है। यदि आपने अपने स्वयं के पते का उपयोग किया है, तो यह वह होना चाहिए जो आपने प्रमाणित किया है।

### विस्तृत व्याख्या

![एथेरियम पते से ई-मेल तक पहुँचना](./fig-06-saml-sig-n-email.png)

नए चरण GraphQL संचार हैं, चरण 5.6 और 5.7।

फिर से, यहाँ `idp.mts` के बदले हुए भाग हैं।

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

हमें जिन पुस्तकालयों की आवश्यकता है, उन्हें आयात करें।

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[प्रत्येक ब्लॉकचेन के लिए एक अलग एंडपॉइंट](https://docs.attest.org/docs/developer-tools/api) है।

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

एक नया `GraphQLClient` क्लाइंट बनाएँ जिसका उपयोग हम एंडपॉइंट की क्वेरी के लिए कर सकते हैं।

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL हमें केवल बाइट्स के साथ एक अपारदर्शी डेटा ऑब्जेक्ट देता है। इसे समझने के लिए हमें स्कीमा की आवश्यकता है।

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

एक एथेरियम पते से एक ई-मेल पते पर जाने के लिए एक फ़ंक्शन।

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

यह एक GraphQL क्वेरी है।

```typescript
      attestations(
```

हम साक्षियों की तलाश कर रहे हैं।

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

हम जो साक्षियाँ चाहते हैं, वे हमारे स्कीमा में हैं, जहाँ प्राप्तकर्ता `getAddress(ethAddr)` है। [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) फ़ंक्शन यह सुनिश्चित करता है कि हमारे पते में सही [चेकसम](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) है। यह आवश्यक है क्योंकि GraphQL केस-महत्वपूर्ण है। "0xBAD060A7", "0xBad060A7", और "0xbad060a7" अलग-अलग मान हैं।

```typescript
        take: 1
```

चाहे हमें कितनी भी साक्षियाँ मिलें, हम केवल पहली वाली चाहते हैं।

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

वे फ़ील्ड जिन्हें हम प्राप्त करना चाहते हैं।

- `attester`: वह पता जिसने साक्षी सबमिट की। आम तौर पर इसका उपयोग यह तय करने के लिए किया जाता है कि साक्षी पर भरोसा किया जाए या नहीं।
- `id`: साक्षी ID। आप इस मान का उपयोग [साक्षी को ऑन-चेन पढ़ने](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) के लिए कर सकते हैं ताकि यह सत्यापित हो सके कि GraphQL क्वेरी से जानकारी सही है।
- `data`: स्कीमा डेटा (इस मामले में, ई-मेल पता)।

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

यदि कोई साक्षी नहीं है, तो एक मान लौटाएँ जो स्पष्ट रूप से गलत है, लेकिन जो सेवा प्रदाता के लिए मान्य दिखाई देगा।

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

यदि कोई मान है, तो डेटा को डिकोड करने के लिए `decodeData` का उपयोग करें। हमें इसके द्वारा प्रदान किए गए मेटाडेटा की आवश्यकता नहीं है, बस मान ही चाहिए।

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

## विकेंद्रीकरण के बारे में क्या?

इस कॉन्फ़िगरेशन में यूज़र वह व्यक्ति होने का दिखावा नहीं कर सकते जो वे नहीं हैं, जब तक कि हम एथेरियम से ई-मेल पता मैपिंग के लिए भरोसेमंद साक्षीकर्ताओं पर भरोसा करते हैं। हालाँकि, हमारा पहचान प्रदाता अभी भी एक केंद्रीकृत घटक है। जिसके पास भी पहचान प्रदाता की निजी चाबी है, वह सेवा प्रदाता को झूठी जानकारी भेज सकता है।

[मल्टी-पार्टी कंप्यूटेशन (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) का उपयोग करके एक समाधान हो सकता है। मुझे उम्मीद है कि मैं भविष्य के ट्यूटोरियल में इसके बारे में लिखूँगा।

## निष्कर्ष

एक लॉग ऑन मानक, जैसे कि एथेरियम हस्ताक्षर, को अपनाने में चिकन और अंडे की समस्या का सामना करना पड़ता है। सेवा प्रदाता व्यापक संभव बाजार को आकर्षित करना चाहते हैं। यूज़र अपने लॉग ऑन मानक का समर्थन करने की चिंता किए बिना सेवाओं तक पहुँचने में सक्षम होना चाहते हैं।
एडेप्टर बनाना, जैसे कि एथेरियम IdP, हमें इस बाधा को दूर करने में मदद कर सकता है।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।
