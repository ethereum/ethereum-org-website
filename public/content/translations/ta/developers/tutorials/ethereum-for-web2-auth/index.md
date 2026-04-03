---
title: "web2 அங்கீகாரத்திற்கு Ethereum-ஐப் பயன்படுத்துதல்"
description: "இந்த டுடோரியலைப் படித்த பிறகு, ஒரு டெவலப்பர் Ethereum உள்நுழைவை (web3) SAML உள்நுழைவுடன் ஒருங்கிணைக்க முடியும், இது web2 இல் ஒற்றை உள்நுழைவு (single sign-on) மற்றும் பிற தொடர்புடைய சேவைகளை வழங்கப் பயன்படுத்தப்படும் ஒரு தரநிலையாகும். இது Ethereum கையொப்பங்கள் மூலம் web2 ஆதாரங்களுக்கான அணுகலை அங்கீகரிக்க அனுமதிக்கிறது, பயனர் பண்புக்கூறுகள் சான்றளிப்புகளிலிருந்து (attestations) வருகின்றன."
author: "ஓரி பொமரன்ட்ஸ்"
tags: ["web2", "அங்கீகாரம்", "eas"]
skill: beginner
breadcrumb: "web2 அங்கீகாரத்திற்கான Ethereum"
lang: ta
published: 2025-04-30
---

## அறிமுகம்

[SAML](https://www.onelogin.com/learn/saml) என்பது web2 இல் பயன்படுத்தப்படும் ஒரு தரநிலையாகும், இது [அடையாள வழங்குநர் (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) [சேவை வழங்குநர்களுக்கு (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)) பயனர் தகவலை வழங்க அனுமதிக்கிறது.

இந்த டுடோரியலில், Ethereum-ஐ இன்னும் இயல்பாக ஆதரிக்காத web2 சேவைகளுக்கு பயனர்கள் தங்களை அங்கீகரிக்க தங்கள் Ethereum வாலெட்டுகளைப் பயன்படுத்த அனுமதிக்க, SAML உடன் Ethereum கையொப்பங்களை எவ்வாறு ஒருங்கிணைப்பது என்பதை நீங்கள் கற்றுக் கொள்வீர்கள்.

இந்த டுடோரியல் இரண்டு தனித்தனி பார்வையாளர்களுக்காக எழுதப்பட்டுள்ளது என்பதை நினைவில் கொள்ளவும்:

- Ethereum-ஐப் புரிந்துகொண்டு SAML-ஐக் கற்றுக்கொள்ள வேண்டிய Ethereum நபர்கள்
- SAML மற்றும் web2 அங்கீகாரத்தைப் புரிந்துகொண்டு Ethereum-ஐக் கற்றுக்கொள்ள வேண்டிய Web2 நபர்கள்

இதன் விளைவாக, உங்களுக்கு ஏற்கனவே தெரிந்த பல அறிமுகத் தகவல்கள் இதில் இருக்கப் போகின்றன. அதைத் தவிர்க்க தயங்க வேண்டாம்.

### Ethereum நபர்களுக்கான SAML

SAML என்பது ஒரு மையப்படுத்தப்பட்ட நெறிமுறையாகும். ஒரு சேவை வழங்குநர் (SP) அடையாள வழங்குநரிடமிருந்து (IdP) ("இது எனது பயனர் ஜான், அவருக்கு A, B மற்றும் C ஆகியவற்றைச் செய்ய அனுமதிகள் இருக்க வேண்டும்" போன்ற) வலியுறுத்தல்களை (assertions) ஏற்றுக்கொள்கிறது, அது அதனுடன் அல்லது அந்த IdP-இன் சான்றிதழில் கையொப்பமிட்ட [சான்றிதழ் அதிகாரத்துடன் (certificate authority)](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) முன்பே இருக்கும் நம்பிக்கை உறவைக் கொண்டிருந்தால் மட்டுமே.

எடுத்துக்காட்டாக, SP என்பது நிறுவனங்களுக்கு பயணச் சேவைகளை வழங்கும் பயண முகவராக இருக்கலாம், மேலும் IdP என்பது ஒரு நிறுவனத்தின் உள் இணையதளமாக இருக்கலாம். ஊழியர்கள் வணிகப் பயணத்தை முன்பதிவு செய்ய வேண்டியிருக்கும் போது, பயண முகவர் அவர்களை உண்மையில் பயணத்தை முன்பதிவு செய்ய அனுமதிக்கும் முன் நிறுவனத்தின் அங்கீகாரத்திற்காக அனுப்புகிறார்.

![படிப்படியான SAML செயல்முறை](./fig-01-saml.png)

உலாவி, SP மற்றும் IdP ஆகிய மூன்று நிறுவனங்களும் அணுகலுக்காக பேச்சுவார்த்தை நடத்தும் விதம் இதுதான். SP-க்கு உலாவியைப் பயன்படுத்தும் பயனரைப் பற்றி முன்கூட்டியே எதுவும் தெரிய வேண்டியதில்லை, IdP-ஐ நம்பினால் மட்டும் போதும்.

### SAML நபர்களுக்கான Ethereum

Ethereum என்பது ஒரு பரவலாக்கப்பட்ட அமைப்பாகும். 

![Ethereum உள்நுழைவு](./fig-02-eth-logon.png)

பயனர்கள் ஒரு தனிப்பட்ட திறவுகோலைக் (private key) கொண்டுள்ளனர் (பொதுவாக உலாவி நீட்டிப்பில் வைக்கப்படும்). தனிப்பட்ட திறவுகோலிலிருந்து நீங்கள் ஒரு பொதுத் திறவுகோலைப் (public key) பெறலாம், அதிலிருந்து 20-பைட் முகவரியைப் பெறலாம். பயனர்கள் ஒரு கணினியில் உள்நுழைய வேண்டியிருக்கும் போது, அவர்கள் ஒரு நான்ஸ் (nonce - ஒரு முறை பயன்படுத்தும் மதிப்பு) கொண்ட செய்தியில் கையொப்பமிடுமாறு கோரப்படுகிறார்கள். அந்த முகவரியால் கையொப்பம் உருவாக்கப்பட்டது என்பதை சேவையகம் சரிபார்க்க முடியும்.

![சான்றளிப்புகளிலிருந்து கூடுதல் தரவைப் பெறுதல்](./fig-03-eas-data.png)

கையொப்பம் Ethereum முகவரியை மட்டுமே சரிபார்க்கிறது. பிற பயனர் பண்புக்கூறுகளைப் பெற, நீங்கள் பொதுவாக [சான்றளிப்புகளைப் (attestations)](https://attest.org/) பயன்படுத்துகிறீர்கள். ஒரு சான்றளிப்பு பொதுவாக இந்த புலங்களைக் கொண்டுள்ளது:

- **சான்றளிப்பவர் (Attestor)**, சான்றளிப்பைச் செய்த முகவரி
- **பெறுநர் (Recipient)**, சான்றளிப்பு பொருந்தும் முகவரி
- **தரவு (Data)**, பெயர், அனுமதிகள் போன்ற சான்றளிக்கப்படும் தரவு.
- **திட்டம் (Schema)**, தரவை விளக்குவதற்குப் பயன்படுத்தப்படும் திட்டத்தின் ஐடி.

Ethereum-இன் பரவலாக்கப்பட்ட தன்மை காரணமாக, எந்தவொரு பயனரும் சான்றளிப்புகளைச் செய்யலாம். எந்த சான்றளிப்புகளை நாம் நம்பகமானதாகக் கருதுகிறோம் என்பதை அடையாளம் காண சான்றளிப்பவரின் அடையாளம் முக்கியமானது.

## அமைப்பு

முதல் படி, ஒரு SAML SP மற்றும் ஒரு SAML IdP தங்களுக்குள் தொடர்புகொள்வதாகும்.

1. மென்பொருளைப் பதிவிறக்கவும். இந்தக் கட்டுரைக்கான மாதிரி மென்பொருள் [github இல்](https://github.com/qbzzt/250420-saml-ethereum) உள்ளது. வெவ்வேறு நிலைகள் வெவ்வேறு கிளைகளில் சேமிக்கப்பட்டுள்ளன, இந்த நிலைக்கு உங்களுக்கு `saml-only` தேவை

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. சுய-கையொப்பமிடப்பட்ட சான்றிதழ்களுடன் (self-signed certificates) திறவுகோல்களை உருவாக்கவும். இதன் பொருள் திறவுகோல் அதன் சொந்த சான்றிதழ் அதிகாரமாகும், மேலும் இது சேவை வழங்குநருக்கு கைமுறையாக இறக்குமதி செய்யப்பட வேண்டும். மேலும் தகவலுக்கு [OpenSSL ஆவணங்களைப்](https://docs.openssl.org/master/man1/openssl-req/) பார்க்கவும். 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. சேவையகங்களைத் தொடங்கவும் (SP மற்றும் IdP இரண்டும்)

    ```sh
    pnpm start
    ```

4. [http://localhost:3000/](http://localhost:3000/) என்ற URL-இல் SP-க்குச் சென்று, IdP-க்கு (போர்ட் 3001) திருப்பி விடப்பட பொத்தானைக் கிளிக் செய்யவும்.

5. IdP-க்கு உங்கள் மின்னஞ்சல் முகவரியை வழங்கி, **சேவை வழங்குநரில் உள்நுழைக (Login to the service provider)** என்பதைக் கிளிக் செய்யவும். நீங்கள் மீண்டும் சேவை வழங்குநருக்கு (போர்ட் 3000) திருப்பி விடப்படுவதையும், அது உங்கள் மின்னஞ்சல் முகவரி மூலம் உங்களை அறிந்துகொள்வதையும் பார்க்கவும்.

### விரிவான விளக்கம்

படிப்படியாக என்ன நடக்கிறது என்பது இங்கே:

![Ethereum இல்லாமல் சாதாரண SAML உள்நுழைவு](./fig-04-saml-no-eth.png)

#### src/config.mts

இந்தக் கோப்பு அடையாள வழங்குநர் மற்றும் சேவை வழங்குநர் ஆகிய இரண்டிற்கான உள்ளமைவைக் கொண்டுள்ளது. பொதுவாக இவை இரண்டும் வெவ்வேறு நிறுவனங்களாக இருக்கும், ஆனால் இங்கே எளிமைக்காக குறியீட்டைப் பகிரலாம்.

```typescript
const fs = await import("fs")

const protocol="http"
```

இப்போதைக்கு நாங்கள் சோதனை மட்டுமே செய்கிறோம், எனவே HTTP-ஐப் பயன்படுத்துவது பரவாயில்லை.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

பொதுத் திறவுகோல்களைப் படிக்கவும், அவை பொதுவாக இரு கூறுகளுக்கும் கிடைக்கும் (மற்றும் நேரடியாக நம்பப்படும் அல்லது நம்பகமான சான்றிதழ் அதிகாரத்தால் கையொப்பமிடப்படும்).

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

இரு கூறுகளுக்கான URL-கள்.

```typescript
export const spPublicData = {
```

சேவை வழங்குநருக்கான பொதுத் தரவு.

```typescript
    entityID: `${spUrl}/metadata`,
```

வழக்கமாக, SAML-இல் `entityID` என்பது நிறுவனத்தின் மெட்டாடேட்டா கிடைக்கும் URL ஆகும். இந்த மெட்டாடேட்டா இங்குள்ள பொதுத் தரவுக்கு ஒத்திருக்கிறது, ஆனால் இது XML வடிவத்தில் உள்ளது.

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

நமது நோக்கங்களுக்கான மிக முக்கியமான வரையறை `assertionConsumerServer` ஆகும். சேவை வழங்குநரிடம் எதையாவது வலியுறுத்த (எடுத்துக்காட்டாக, "உங்களுக்கு இந்தத் தகவலை அனுப்பும் பயனர் somebody@example.com") `http://localhost:3000/sp/assertion` என்ற URL-க்கு [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp)-ஐப் பயன்படுத்த வேண்டும் என்பதே இதன் பொருளாகும்.

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

அடையாள வழங்குநருக்கான பொதுத் தரவும் இதே போன்றது. ஒரு பயனரை உள்நுழையச் செய்ய நீங்கள் `http://localhost:3001/idp/login`-க்கு POST செய்ய வேண்டும் என்பதையும், ஒரு பயனரை வெளியேற்ற நீங்கள் `http://localhost:3001/idp/logout`-க்கு POST செய்ய வேண்டும் என்பதையும் இது குறிப்பிடுகிறது.

#### src/sp.mts

இது சேவை வழங்குநரைச் செயல்படுத்தும் குறியீடாகும்.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAML-ஐச் செயல்படுத்த நாங்கள் [`samlify`](https://www.npmjs.com/package/samlify) நூலகத்தைப் பயன்படுத்துகிறோம்.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

XML சரியானது, எதிர்பார்க்கப்படும் பொதுத் திறவுகோலுடன் கையொப்பமிடப்பட்டுள்ளது போன்றவற்றைச் சரிபார்க்க ஒரு தொகுப்பு இருக்க வேண்டும் என்று `samlify` நூலகம் எதிர்பார்க்கிறது. இந்த நோக்கத்திற்காக நாங்கள் [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)-ஐப் பயன்படுத்துகிறோம்.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

ஒரு [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) என்பது ஒரு இணையதளத்தின் உள்ளே பொருத்தக்கூடிய ஒரு "மினி இணையதளம்" ஆகும். இந்த நிலையில், அனைத்து சேவை வழங்குநர் வரையறைகளையும் ஒன்றாகத் தொகுக்க இதைப் பயன்படுத்துகிறோம்.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

சேவை வழங்குநரின் சொந்தப் பிரதிநிதித்துவம் என்பது அனைத்து பொதுத் தரவுகளும், தகவலில் கையொப்பமிட அது பயன்படுத்தும் தனிப்பட்ட திறவுகோலும் ஆகும்.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

அடையாள வழங்குநரைப் பற்றி சேவை வழங்குநர் தெரிந்து கொள்ள வேண்டிய அனைத்தையும் பொதுத் தரவு கொண்டுள்ளது.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

பிற SAML கூறுகளுடன் இயங்குதன்மையை (interoperability) இயக்க, சேவை மற்றும் அடையாள வழங்குநர்கள் தங்களின் பொதுத் தரவை (மெட்டாடேட்டா என அழைக்கப்படுகிறது) `/metadata`-இல் XML வடிவத்தில் கிடைக்கச் செய்ய வேண்டும்.

```typescript
spRouter.post(`/assertion`,
```

தன்னை அடையாளப்படுத்திக் கொள்ள உலாவி அணுகும் பக்கம் இதுவாகும். வலியுறுத்தலில் பயனர் அடையாளங்காட்டி (இங்கே நாங்கள் மின்னஞ்சல் முகவரியைப் பயன்படுத்துகிறோம்) அடங்கும், மேலும் கூடுதல் பண்புக்கூறுகளையும் சேர்க்கலாம். மேலே உள்ள வரிசை வரைபடத்தில் (sequence diagram) படி 7-க்கான கையாளுபவர் (handler) இதுவாகும்.

```typescript
  async (req, res) => {
    // console.log(`SAML பதில்:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

வலியுறுத்தலில் வழங்கப்பட்ட XML தரவைப் பார்க்க, கருத்துத் தெரிவிக்கப்பட்ட (commented out) கட்டளையை நீங்கள் பயன்படுத்தலாம். இது [base64 குறியாக்கம் (base64 encoded)](https://en.wikipedia.org/wiki/Base64) செய்யப்பட்டுள்ளது.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

அடையாளச் சேவையகத்திலிருந்து உள்நுழைவுக் கோரிக்கையைப் பாகுபடுத்தவும் (Parse).

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

பயனருக்கு உள்நுழைவு கிடைத்துவிட்டது என்பதைக் காட்ட, HTML பதிலளிப்பை அனுப்பவும்.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

தோல்வி ஏற்பட்டால் பயனருக்குத் தெரிவிக்கவும்.

```typescript
spRouter.get('/login',
```

உலாவி இந்தப் பக்கத்தைப் பெற முயற்சிக்கும்போது உள்நுழைவுக் கோரிக்கையை உருவாக்கவும். மேலே உள்ள வரிசை வரைபடத்தில் படி 1-க்கான கையாளுபவர் இதுவாகும்.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

உள்நுழைவுக் கோரிக்கையை இடுகையிடுவதற்கான தகவலைப் பெறவும்.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

இந்தப் பக்கம் படிவத்தை (கீழே காண்க) தானாகவே சமர்ப்பிக்கிறது. இதன் மூலம் பயனர் திருப்பி விடப்படுவதற்கு எதுவும் செய்ய வேண்டியதில்லை. மேலே உள்ள வரிசை வரைபடத்தில் இது படி 2 ஆகும்.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint`-க்கு (அடையாள வழங்குநர் இறுதிப்புள்ளியின் URL) இடுகையிடவும்.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

உள்ளீட்டுப் பெயர் `loginRequest.type` (`SAMLRequest`). அந்தப் புலத்திற்கான உள்ளடக்கம் `loginRequest.context` ஆகும், இது மீண்டும் base64 குறியாக்கம் செய்யப்பட்ட XML ஆகும்.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[இந்த மிடில்வேர்](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP கோரிக்கையின்](https://www.tutorialspoint.com/http/http_requests.htm) உடற்பகுதியைப் படிக்கிறது. இயல்பாக express இதைப் புறக்கணிக்கிறது, ஏனெனில் பெரும்பாலான கோரிக்கைகளுக்கு இது தேவையில்லை. POST உடற்பகுதியைப் பயன்படுத்துவதால் இது எங்களுக்குத் தேவை.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

சேவை வழங்குநர் கோப்பகத்தில் (`/sp`) ரவுட்டரைப் பொருத்தவும்.

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

ஒரு உலாவி ரூட் கோப்பகத்தைப் பெற முயற்சித்தால், அதற்கு உள்நுழைவுப் பக்கத்திற்கான இணைப்பை வழங்கவும்.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

இந்த express பயன்பாட்டுடன் `spPort`-ஐக் கேட்கவும்.

#### src/idp.mts

இது அடையாள வழங்குநராகும். இது சேவை வழங்குநரைப் போலவே உள்ளது, கீழே உள்ள விளக்கங்கள் வேறுபட்ட பகுதிகளுக்கானவை.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // பண்புகளைத் தக்கவைக்கவும்
    attributeNamePrefix: "@_", // பண்புகளுக்கான முன்னொட்டு
  }
)
```

சேவை வழங்குநரிடமிருந்து நாம் பெறும் XML கோரிக்கையைப் படித்துப் புரிந்து கொள்ள வேண்டும்.

```typescript
const getLoginPage = requestId => `
```

மேலே உள்ள வரிசை வரைபடத்தின் படி 4-இல் வழங்கப்படும் தானாகச் சமர்ப்பிக்கப்பட்ட படிவத்துடன் இந்தப் பக்கம் உருவாக்கப்படுகிறது.

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

சேவை வழங்குநருக்கு நாங்கள் அனுப்பும் இரண்டு புலங்கள் உள்ளன:

1. நாங்கள் பதிலளிக்கும் `requestId`.
2. பயனர் அடையாளங்காட்டி (இப்போதைக்கு பயனர் வழங்கும் மின்னஞ்சல் முகவரியைப் பயன்படுத்துகிறோம்).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

மேலே உள்ள வரிசை வரைபடத்தின் படி 5-க்கான கையாளுபவர் இதுவாகும். [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) உள்நுழைவுப் பதிலளிப்பை உருவாக்குகிறது. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

பார்வையாளர்கள் சேவை வழங்குநராவர்.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

கோரிக்கையிலிருந்து பிரித்தெடுக்கப்பட்ட தகவல். கோரிக்கையில் நாங்கள் அக்கறை கொள்ளும் ஒரு அளவுரு requestId ஆகும், இது சேவை வழங்குநரைக் கோரிக்கைகளையும் அவற்றின் பதிலளிப்புகளையும் பொருத்த அனுமதிக்கிறது.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert } // கையொப்பமிடுவதை உறுதிசெய்யவும்
```

பதிலளிப்பில் கையொப்பமிடத் தரவைக் கொண்டிருக்க எங்களுக்கு `signingKey` தேவை. சேவை வழங்குநர் கையொப்பமிடப்படாத கோரிக்கைகளை நம்புவதில்லை.

```typescript
    },
    "post",
    {
      email: req.body.email
```

சேவை வழங்குநருக்கு நாங்கள் திருப்பி அனுப்பும் பயனர் தகவலைக் கொண்ட புலம் இதுவாகும்.

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

மீண்டும், தானாகச் சமர்ப்பிக்கப்பட்ட படிவத்தைப் பயன்படுத்தவும். மேலே உள்ள வரிசை வரைபடத்தில் இது படி 6 ஆகும்.

```typescript

// உள்நுழைவு கோரிக்கைகளுக்கான IdP முடிவுப்புள்ளி
idpRouter.post(`/login`,
```

சேவை வழங்குநரிடமிருந்து உள்நுழைவுக் கோரிக்கையைப் பெறும் இறுதிப்புள்ளி இதுவாகும். மேலே உள்ள வரிசை வரைபடத்தின் படி 3-க்கான கையாளுபவர் இதுவாகும்.

```typescript
  async (req, res) => {
    try {
      // parseLoginRequest-ஐச் செயல்பட வைக்க முடியாததால் இது ஒரு மாற்று வழி.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

அங்கீகாரக் கோரிக்கையின் ஐடியைப் படிக்க நாம் [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144)-ஐப் பயன்படுத்த முடியும். இருப்பினும், என்னால் அதைச் செயல்பட வைக்க முடியவில்லை, அதற்காக அதிக நேரம் செலவிடுவது மதிப்புக்குரியதாக இல்லை, எனவே நான் ஒரு [பொது-நோக்க XML பாகுபடுத்தியைப் (general-purpose XML parser)](https://www.npmjs.com/package/fast-xml-parser) பயன்படுத்துகிறேன். எங்களுக்குத் தேவையான தகவல் `<samlp:AuthnRequest>` குறிச்சொல்லுக்குள் உள்ள `ID` பண்புக்கூறு ஆகும், இது XML-இன் மேல் மட்டத்தில் உள்ளது.

## Ethereum கையொப்பங்களைப் பயன்படுத்துதல்

இப்போது நாம் சேவை வழங்குநருக்கு ஒரு பயனர் அடையாளத்தை அனுப்ப முடியும் என்பதால், அடுத்த கட்டமாக பயனர் அடையாளத்தை நம்பகமான முறையில் பெறுவதாகும். பயனர் முகவரிக்காக வாலெட்டைக் கேட்க Viem நம்மை அனுமதிக்கிறது, ஆனால் இதன் பொருள் தகவலுக்காக உலாவியைக் கேட்பதாகும். நாங்கள் உலாவியைக் கட்டுப்படுத்தவில்லை, எனவே அதிலிருந்து கிடைக்கும் பதிலளிப்பை எங்களால் தானாகவே நம்ப முடியாது.

அதற்குப் பதிலாக, IdP உலாவிக்குக் கையொப்பமிட ஒரு சரத்தை (string) அனுப்பப் போகிறது. உலாவியில் உள்ள வாலெட் இந்தச் சரத்தில் கையொப்பமிட்டால், அது உண்மையில் அந்த முகவரிதான் என்று அர்த்தம் (அதாவது, முகவரிக்கு ஒத்த தனிப்பட்ட திறவுகோல் அதற்குத் தெரியும்).

இதைச் செயலில் காண, இருக்கும் IdP மற்றும் SP-ஐ நிறுத்திவிட்டு இந்தக் கட்டளைகளை இயக்கவும்:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

பின்னர் [SP-க்குச் சென்று](http://localhost:3000) வழிகாட்டுதல்களைப் பின்பற்றவும்.

இந்தக் கட்டத்தில் Ethereum முகவரியிலிருந்து மின்னஞ்சல் முகவரியை எவ்வாறு பெறுவது என்று எங்களுக்குத் தெரியாது என்பதை நினைவில் கொள்ளவும், எனவே அதற்குப் பதிலாக நாங்கள் `<ethereum address>@bad.email.address` என்பதை SP-க்குத் தெரிவிக்கிறோம்.

### விரிவான விளக்கம்

முந்தைய வரைபடத்தில் 4-5 படிகளில் மாற்றங்கள் உள்ளன.

![Ethereum கையொப்பத்துடன் SAML](./fig-05-saml-w-signature.png)

நாங்கள் மாற்றிய ஒரே கோப்பு `idp.mts` ஆகும். மாற்றப்பட்ட பகுதிகள் இங்கே.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

எங்களுக்கு இந்த இரண்டு கூடுதல் நூலகங்கள் தேவை. [நான்ஸ் (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce) மதிப்பை உருவாக்க நாங்கள் [`uuid`](https://www.npmjs.com/package/uuid)-ஐப் பயன்படுத்துகிறோம். மதிப்பு ஒரு பொருட்டல்ல, அது ஒரு முறை மட்டுமே பயன்படுத்தப்படுகிறது என்பதுதான் முக்கியம்.

[`viem`](https://viem.sh/) நூலகம் Ethereum வரையறைகளைப் பயன்படுத்த அனுமதிக்கிறது. கையொப்பம் உண்மையில் செல்லுபடியாகும் என்பதைச் சரிபார்க்க இங்கே எங்களுக்கு இது தேவை.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

செய்தியில் கையொப்பமிட வாலெட் பயனரிடம் அனுமதி கேட்கிறது. வெறும் நான்ஸ் மட்டுமே உள்ள செய்தி பயனர்களைக் குழப்பக்கூடும், எனவே இந்தத் தூண்டுதலை (prompt) நாங்கள் சேர்க்கிறோம்.

```typescript
// requestID-களை இங்கே வைத்திருக்கவும்
let nonces = {}
```

கோரிக்கைக்குப் பதிலளிக்க எங்களுக்குக் கோரிக்கை தகவல் தேவை. நாங்கள் அதைக் கோரிக்கையுடன் அனுப்பலாம் (படி 4), மற்றும் அதைத் திரும்பப் பெறலாம் (படி 5). இருப்பினும், உலாவியிலிருந்து கிடைக்கும் தகவலை எங்களால் நம்ப முடியாது, இது தீங்கு விளைவிக்கும் பயனரின் கட்டுப்பாட்டில் இருக்கலாம். எனவே நான்ஸை திறவுகோலாகக் கொண்டு, அதை இங்கே சேமிப்பது நல்லது.

எளிமைக்காக நாங்கள் இதை இங்கே ஒரு மாறியாகச் (variable) செய்கிறோம் என்பதை நினைவில் கொள்ளவும். இருப்பினும், இதில் பல குறைபாடுகள் உள்ளன:

- சேவை மறுப்புத் தாக்குதலுக்கு (denial of service attack) நாங்கள் ஆளாக நேரிடும். ஒரு தீங்கிழைக்கும் பயனர் பல முறை உள்நுழைய முயற்சி செய்யலாம், இது எங்கள் நினைவகத்தை நிரப்பும்.
- IdP செயல்முறையை மறுதொடக்கம் செய்ய வேண்டியிருந்தால், இருக்கும் மதிப்புகளை நாங்கள் இழக்கிறோம்.
- பல செயல்முறைகளில் எங்களால் சுமையைச் சமநிலைப்படுத்த (load balance) முடியாது, ஏனெனில் ஒவ்வொன்றும் அதன் சொந்த மாறியைக் கொண்டிருக்கும்.

ஒரு தயாரிப்பு அமைப்பில் (production system) நாங்கள் ஒரு தரவுத்தளத்தைப் பயன்படுத்துவோம் மற்றும் ஒரு வகையான காலாவதி பொறிமுறையைச் செயல்படுத்துவோம்.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

ஒரு நான்ஸை உருவாக்கி, எதிர்காலப் பயன்பாட்டிற்காக `requestId`-ஐச் சேமிக்கவும்.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

பக்கம் ஏற்றப்படும்போது இந்த JavaScript தானாகவே செயல்படுத்தப்படும்.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

எங்களுக்கு `viem`-இலிருந்து பல செயல்பாடுகள் தேவை.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

உலாவியில் வாலெட் இருந்தால் மட்டுமே எங்களால் வேலை செய்ய முடியும்.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

வாலெட்டிலிருந்து (`window.ethereum`) கணக்குகளின் பட்டியலைக் கோரவும். குறைந்தது ஒன்று இருப்பதாகக் கருதி, முதலாவதை மட்டும் சேமிக்கவும். 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

உலாவி வாலெட்டுடன் தொடர்புகொள்ள ஒரு [வாலெட் கிளையண்டை (wallet client)](https://viem.sh/docs/clients/wallet) உருவாக்கவும்.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

ஒரு செய்தியில் கையொப்பமிடப் பயனரைக் கேட்கவும். இந்த முழு HTML-உம் ஒரு [டெம்ப்ளேட் சரத்தில் (template string)](https://viem.sh/docs/clients/wallet) இருப்பதால், idp செயல்முறையில் வரையறுக்கப்பட்ட மாறிகளை நாம் பயன்படுத்தலாம். வரிசை வரைபடத்தில் இது படி 4.5 ஆகும்.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>`-க்குத் திருப்பி விடவும். வரிசை வரைபடத்தில் இது படி 5 ஆகும்.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

கையொப்பம் உலாவியால் திருப்பி அனுப்பப்படுகிறது, இது தீங்கிழைக்கும் தன்மையுடையதாக இருக்கலாம் (உலாவியில் `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`-ஐத் திறப்பதிலிருந்து உங்களைத் தடுக்க எதுவும் இல்லை). எனவே, IdP செயல்முறை தவறான கையொப்பங்களைச் சரியாகக் கையாள்கிறதா என்பதைச் சரிபார்க்க வேண்டியது அவசியம்.

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

மீதமுள்ளவை நிலையான HTML மட்டுமே.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

வரிசை வரைபடத்தில் படி 5-க்கான கையாளுபவர் இதுவாகும்.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

கோரிக்கை ஐடியைப் பெற்று, அதை மீண்டும் பயன்படுத்த முடியாது என்பதை உறுதிப்படுத்த `nonces`-இலிருந்து நான்ஸை நீக்கவும்.

```typescript
  try {
```

கையொப்பம் செல்லாததாக இருக்க பல வழிகள் இருப்பதால், எறியப்படும் பிழைகளைப் பிடிக்க இதை ஒரு `try ... catch` தொகுதியில் (block) மடிக்கிறோம்.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

வரிசை வரைபடத்தில் படி 5.5-ஐச் செயல்படுத்த [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage)-ஐப் பயன்படுத்தவும்.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

ஒரு சிறிய மாற்றத்தைத் தவிர, கையாளுபவரின் மீதமுள்ளவை முன்பு `/loginSubmitted` கையாளுபவரில் நாங்கள் செய்ததற்குச் சமமானதாகும்.

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

எங்களிடம் உண்மையான மின்னஞ்சல் முகவரி இல்லை (அடுத்த பிரிவில் அதைப் பெறுவோம்), எனவே இப்போதைக்கு நாங்கள் Ethereum முகவரியைத் திருப்பித் தருகிறோம், மேலும் அதை மின்னஞ்சல் முகவரி அல்ல என்று தெளிவாகக் குறிக்கிறோம்.


```typescript
// உள்நுழைவு கோரிக்கைகளுக்கான IdP முடிவுப்புள்ளி
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // parseLoginRequest-ஐச் செயல்பட வைக்க முடியாததால் இது ஒரு மாற்று வழி.
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

படி 3 கையாளுபவரில் `getLoginPage`-க்குப் பதிலாக, இப்போது `getSignaturePage`-ஐப் பயன்படுத்தவும்.

## மின்னஞ்சல் முகவரியைப் பெறுதல்

அடுத்த கட்டமாக, சேவை வழங்குநரால் கோரப்பட்ட அடையாளங்காட்டியான மின்னஞ்சல் முகவரியைப் பெறுவதாகும். அதைச் செய்ய, நாங்கள் [Ethereum சான்றளிப்பு சேவையை (EAS)](https://attest.org/) பயன்படுத்துகிறோம்.

சான்றளிப்புகளைப் பெறுவதற்கான எளிதான வழி [GraphQL API](https://docs.attest.org/docs/developer-tools/api)-ஐப் பயன்படுத்துவதாகும். நாங்கள் இந்த வினவலைப் (query) பயன்படுத்துகிறோம்:

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

இந்த [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ஒரு மின்னஞ்சல் முகவரியை மட்டுமே உள்ளடக்கியது. இந்த வினவல் இந்தத் திட்டத்தின் சான்றளிப்புகளைக் கேட்கிறது. சான்றளிப்பின் பொருள் `recipient` (பெறுநர்) என்று அழைக்கப்படுகிறது. இது எப்போதும் ஒரு Ethereum முகவரியாகும்.

எச்சரிக்கை: நாங்கள் இங்குச் சான்றளிப்புகளைப் பெறும் விதத்தில் இரண்டு பாதுகாப்புச் சிக்கல்கள் உள்ளன.

- நாங்கள் `https://optimism.easscan.org/graphql` என்ற API இறுதிப்புள்ளிக்குச் செல்கிறோம், இது ஒரு மையப்படுத்தப்பட்ட கூறாகும். நாங்கள் `id` பண்புக்கூறைப் பெறலாம், பின்னர் ஒரு சான்றளிப்பு உண்மையானதா என்பதைச் சரிபார்க்க ஆன்செயின் தேடலைச் செய்யலாம், ஆனால் API இறுதிப்புள்ளி அவற்றைப் பற்றி எங்களிடம் கூறாமல் சான்றளிப்புகளைத் தணிக்கை செய்ய முடியும். 

  இந்தச் சிக்கலைத் தீர்ப்பது சாத்தியமற்றது அல்ல, நாங்கள் எங்கள் சொந்த GraphQL இறுதிப்புள்ளியை இயக்கலாம் மற்றும் செயின் பதிவுகளிலிருந்து சான்றளிப்புகளைப் பெறலாம், ஆனால் அது எங்கள் நோக்கங்களுக்கு அதிகப்படியானது.

- நாங்கள் சான்றளிப்பவரின் அடையாளத்தைப் பார்ப்பதில்லை. யார் வேண்டுமானாலும் எங்களுக்குத் தவறான தகவல்களை வழங்கலாம். நிஜ உலகச் செயலாக்கத்தில் நாங்கள் நம்பகமான சான்றளிப்பாளர்களின் தொகுப்பைக் கொண்டிருப்போம், மேலும் அவர்களின் சான்றளிப்புகளை மட்டுமே பார்ப்போம்.

இதைச் செயலில் காண, இருக்கும் IdP மற்றும் SP-ஐ நிறுத்திவிட்டு இந்தக் கட்டளைகளை இயக்கவும்:

```sh
git checkout email-address
pnpm install
pnpm start
```

பின்னர் உங்கள் மின்னஞ்சல் முகவரியை வழங்கவும். அதைச் செய்ய உங்களுக்கு இரண்டு வழிகள் உள்ளன:

- தனிப்பட்ட திறவுகோலைப் பயன்படுத்தி ஒரு வாலெட்டை இறக்குமதி செய்து, `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` என்ற சோதனைத் தனிப்பட்ட திறவுகோலைப் பயன்படுத்தவும்.

- உங்கள் சொந்த மின்னஞ்சல் முகவரிக்கு ஒரு சான்றளிப்பைச் சேர்க்கவும்:

  1. [சான்றளிப்பு எக்ஸ்ப்ளோரரில் உள்ள திட்டத்திற்குச் (schema in the attestation explorer)](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) செல்லவும்.

  2. **திட்டத்துடன் சான்றளி (Attest with Schema)** என்பதைக் கிளிக் செய்யவும்.

  3. பெறுநராக உங்கள் Ethereum முகவரியையும், மின்னஞ்சல் முகவரியாக உங்கள் மின்னஞ்சல் முகவரியையும் உள்ளிட்டு, **ஆன்செயின் (Onchain)** என்பதைத் தேர்ந்தெடுக்கவும். பின்னர் **சான்றளிப்பை உருவாக்கு (Make Attestation)** என்பதைக் கிளிக் செய்யவும்.

  4. உங்கள் வாலெட்டில் பரிவர்த்தனைக்கு ஒப்புதல் அளிக்கவும். எரிவாயுவுக்குச் (gas) செலுத்த [Optimism பிளாக்செயினில்](https://app.optimism.io/bridge/deposit) உங்களுக்குச் சிறிது ETH தேவைப்படும்.

எப்படியிருந்தாலும், இதைச் செய்த பிறகு [http://localhost:3000](http://localhost:3000)-க்குச் சென்று வழிகாட்டுதல்களைப் பின்பற்றவும். நீங்கள் சோதனைத் தனிப்பட்ட திறவுகோலை இறக்குமதி செய்திருந்தால், நீங்கள் பெறும் மின்னஞ்சல் `test_addr_0@example.com` ஆகும். நீங்கள் உங்கள் சொந்த முகவரியைப் பயன்படுத்தியிருந்தால், அது நீங்கள் சான்றளித்ததாக இருக்க வேண்டும்.

### விரிவான விளக்கம்

![Ethereum முகவரியிலிருந்து மின்னஞ்சலைப் பெறுதல்](./fig-06-saml-sig-n-email.png)

புதிய படிகள் GraphQL தொடர்பு, படிகள் 5.6 மற்றும் 5.7 ஆகும்.

மீண்டும், `idp.mts`-இன் மாற்றப்பட்ட பகுதிகள் இங்கே.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

எங்களுக்குத் தேவையான நூலகங்களை இறக்குமதி செய்யவும்.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[ஒவ்வொரு பிளாக்செயினுக்கும் ஒரு தனி இறுதிப்புள்ளி](https://docs.attest.org/docs/developer-tools/api) உள்ளது.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

இறுதிப்புள்ளியை வினவுவதற்கு நாம் பயன்படுத்தக்கூடிய புதிய `GraphQLClient` கிளையண்டை உருவாக்கவும்.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL பைட்டுகளுடன் கூடிய ஒளிபுகாத் தரவுப் பொருளை (opaque data object) மட்டுமே நமக்கு வழங்குகிறது. அதைப் புரிந்து கொள்ள நமக்குத் திட்டம் தேவை.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Ethereum முகவரியிலிருந்து மின்னஞ்சல் முகவரியைப் பெறுவதற்கான ஒரு செயல்பாடு.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

இது ஒரு GraphQL வினவல்.

```typescript
      attestations(
```

நாங்கள் சான்றளிப்புகளைத் தேடுகிறோம்.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

எங்களுக்குத் தேவையான சான்றளிப்புகள் எங்கள் திட்டத்தில் உள்ளவை, அங்குப் பெறுநர் `getAddress(ethAddr)` ஆவார். [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) செயல்பாடு எங்கள் முகவரியில் சரியான [செக்சம் (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) இருப்பதை உறுதி செய்கிறது. GraphQL எழுத்து உணர்திறன் (case-significant) கொண்டது என்பதால் இது அவசியமாகும். "0xBAD060A7", "0xBad060A7" மற்றும் "0xbad060a7" ஆகியவை வெவ்வேறு மதிப்புகளாகும்.

```typescript
        take: 1
```

நாங்கள் எத்தனை சான்றளிப்புகளைக் கண்டாலும், எங்களுக்கு முதலாவது மட்டுமே தேவை.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

நாங்கள் பெற விரும்பும் புலங்கள்.

- `attester`: சான்றளிப்பைச் சமர்ப்பித்த முகவரி. பொதுவாக இது சான்றளிப்பை நம்புவதா வேண்டாமா என்பதை முடிவு செய்யப் பயன்படுத்தப்படுகிறது.
- `id`: சான்றளிப்பு ஐடி. GraphQL வினவலிலிருந்து வரும் தகவல் சரியானது என்பதைச் சரிபார்க்க, [ஆன்செயினில் சான்றளிப்பைப் படிக்க (read the attestation onchain)](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) இந்த மதிப்பை நீங்கள் பயன்படுத்தலாம்.
- `data`: திட்டத் தரவு (இந்த நிலையில், மின்னஞ்சல் முகவரி).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

சான்றளிப்பு இல்லை என்றால், வெளிப்படையாகத் தவறான, ஆனால் சேவை வழங்குநருக்குச் செல்லுபடியாகும் என்று தோன்றும் மதிப்பைத் திருப்பித் தரவும்.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

மதிப்பு இருந்தால், தரவை குறிவிலக்க (decode) `decodeData`-ஐப் பயன்படுத்தவும். அது வழங்கும் மெட்டாடேட்டா எங்களுக்குத் தேவையில்லை, மதிப்பு மட்டுமே தேவை.

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

மின்னஞ்சல் முகவரியைப் பெற புதிய செயல்பாட்டைப் பயன்படுத்தவும்.

## பரவலாக்கம் பற்றி என்ன?

இந்த உள்ளமைவில், Ethereum-இலிருந்து மின்னஞ்சல் முகவரி மேப்பிங்கிற்கு நம்பகமான சான்றளிப்பாளர்களை நாங்கள் நம்பியிருக்கும் வரை, பயனர்கள் தாங்கள் இல்லாத ஒருவராக நடிக்க முடியாது. இருப்பினும், எங்கள் அடையாள வழங்குநர் இன்னும் ஒரு மையப்படுத்தப்பட்ட கூறாகவே உள்ளது. அடையாள வழங்குநரின் தனிப்பட்ட திறவுகோலை வைத்திருப்பவர் சேவை வழங்குநருக்குத் தவறான தகவலை அனுப்ப முடியும்.

[பல-தரப்பு கணக்கீட்டைப் (multi-party computation - MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) பயன்படுத்தி ஒரு தீர்வு இருக்கலாம். எதிர்கால டுடோரியலில் அதைப் பற்றி எழுதுவேன் என்று நம்புகிறேன்.

## முடிவுரை

Ethereum கையொப்பங்கள் போன்ற உள்நுழைவுத் தரநிலையை ஏற்றுக்கொள்வது கோழி மற்றும் முட்டை சிக்கலை எதிர்கொள்கிறது. சேவை வழங்குநர்கள் சாத்தியமான பரந்த சந்தையை ஈர்க்க விரும்புகிறார்கள். பயனர்கள் தங்கள் உள்நுழைவுத் தரநிலையை ஆதரிப்பதைப் பற்றி கவலைப்படாமல் சேவைகளை அணுக விரும்புகிறார்கள்.
Ethereum IdP போன்ற அடாப்டர்களை உருவாக்குவது இந்தத் தடையைத் தாண்ட நமக்கு உதவும்.

[எனது மேலும் பல பணிகளுக்கு இங்கே பார்க்கவும்](https://cryptodocguy.pro/).