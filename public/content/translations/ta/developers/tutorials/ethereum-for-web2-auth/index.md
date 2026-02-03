---
title: web2 அங்கீகாரத்திற்காக எத்தேரியத்தைப் பயன்படுத்துதல்
description: இந்தப் பயிற்சியைப் படித்த பிறகு, ஒரு உருவாக்குநரால் (டெவலப்பரால்) web2-இல் ஒற்றை உள்நுழைவு மற்றும் பிற தொடர்புடைய சேவைகளை வழங்கப் பயன்படுத்தப்படும் ஒரு தரநிலையான SAML உள்நுழைவுடன் எத்தேரியம் உள்நுழைவை (web3) ஒருங்கிணைக்க முடியும். இது web2 வளங்களுக்கான அணுகலை எத்தேரியம் கையொப்பங்கள் மூலம் அங்கீகரிக்க அனுமதிக்கிறது, பயனர் பண்புகள் சான்றளிப்புகளிலிருந்து வருகின்றன.
author: Ori Pomerantz
tags: [ "web2", "அங்கீகாரம்", "eas" ]
skill: beginner
lang: ta
published: 2025-04-30
---

## # அறிமுகம்

[SAML](https://www.onelogin.com/learn/saml) என்பது web2-இல் பயன்படுத்தப்படும் ஒரு தரநிலையாகும், இது [அடையாள வழங்குநர் (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)-ஐ [சேவை வழங்குநர்களுக்கு (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) பயனர் தகவலை வழங்க அனுமதிக்கிறது.

இந்த பயிற்சியில், பயனர்கள் தங்கள் எத்தேரியம் பணப்பைகளைப் பயன்படுத்தி, இன்னும் இயல்பாக எத்தேரியத்தை ஆதரிக்காத web2 சேவைகளில் தங்களை அங்கீகரித்துக் கொள்ள, எத்தேரியம் கையொப்பங்களை SAML உடன் எப்படி ஒருங்கிணைப்பது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள்.

இந்த பயிற்சி இரண்டு தனித்தனி பார்வையாளர்களுக்காக எழுதப்பட்டுள்ளது என்பதை கவனத்தில் கொள்ளவும்:

- எத்தேரியத்தைப் புரிந்துகொண்டு SAML-ஐக் கற்றுக்கொள்ள வேண்டிய எத்தேரியம் மக்கள்
- SAML மற்றும் web2 அங்கீகாரத்தைப் புரிந்துகொண்டு எத்தேரியத்தைக் கற்றுக்கொள்ள வேண்டிய Web2 மக்கள்

இதன் விளைவாக, நீங்கள் ஏற்கனவே அறிந்த பல அறிமுகப் பொருள்களை இது கொண்டிருக்கப் போகிறது. அதைத் தவிர்க்க தயங்க வேண்டாம்.

### எத்தேரியம் மக்களுக்கான SAML

SAML ஒரு மையப்படுத்தப்பட்ட நெறிமுறை. ஒரு சேவை வழங்குநர் (SP), ஒரு அடையாள வழங்குநரிடமிருந்து (IdP) ("இது எனது பயனர் ஜான், அவருக்கு A, B, மற்றும் C ஆகியவற்றைச் செய்ய அனுமதிகள் இருக்க வேண்டும்" போன்றவை) கூற்றுகளை அதனுடனோ அல்லது அந்த IdP-இன் சான்றிதழில் கையொப்பமிட்ட [சான்றிதழ் ஆணையத்துடனோ](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) முன்பே இருக்கும் நம்பிக்கை உறவு இருந்தால் மட்டுமே ஏற்றுக்கொள்வார்.

உதாரணமாக, SP என்பது நிறுவனங்களுக்கு பயணச் சேவைகளை வழங்கும் ஒரு பயண முகவராகவும், IdP என்பது ஒரு நிறுவனத்தின் உள் வலைத்தளமாகவும் இருக்கலாம். ஊழியர்கள் வணிகப் பயணத்தை முன்பதிவு செய்ய வேண்டியிருக்கும் போது, அவர்கள் உண்மையில் பயணத்தை முன்பதிவு செய்வதற்கு முன், பயண முகவர் அவர்களை நிறுவனத்தால் அங்கீகரிக்க அனுப்புகிறார்.

![படிப்படியான SAML செயல்முறை](./fig-01-saml.png)

உலாவி, SP, மற்றும் IdP ஆகிய மூன்று நிறுவனங்களும் அணுகலுக்காகப் பேச்சுவார்த்தை நடத்தும் வழி இதுவே. SP ஆனது உலாவியைப் பயன்படுத்தும் பயனரைப் பற்றி முன்கூட்டியே எதுவும் தெரிந்து கொள்ளத் தேவையில்லை, IdP-ஐ நம்பினால் மட்டும் போதும்.

### SAML மக்களுக்கான எத்தேரியம்

எத்தேரியம் ஒரு பரவலாக்கப்பட்ட அமைப்பு.

![எத்தேரியம் உள்நுழைவு](./fig-02-eth-logon.png)

பயனர்கள் ஒரு தனியார் திறவுகோலைக் கொண்டுள்ளனர் (பொதுவாக இது ஒரு உலாவி நீட்டிப்பில் வைத்திருக்கப்படும்). தனியார் திறவுகோலிலிருந்து நீங்கள் ஒரு பொதுத் திறவுகோலைப் பெறலாம், அதிலிருந்து 20-பைட் முகவரியையும் பெறலாம். பயனர்கள் ஒரு கணினியில் உள்நுழைய வேண்டியிருக்கும் போது, அவர்கள் ஒரு நான்ஸ் (ஒரு முறை மட்டுமே பயன்படுத்தப்படும் மதிப்பு) உடன் ஒரு செய்தியில் கையொப்பமிடுமாறு கோரப்படுகிறார்கள். கையொப்பம் அந்த முகவரியால் உருவாக்கப்பட்டது என்பதை சேவையகத்தால் சரிபார்க்க முடியும்.

![சான்றளிப்புகளிலிருந்து கூடுதல் தரவைப் பெறுதல்](./fig-03-eas-data.png)

கையொப்பம் எத்தேரியம் முகவரியை மட்டுமே சரிபார்க்கிறது. பிற பயனர் பண்புகளைப் பெற, நீங்கள் பொதுவாக [சான்றளிப்புகளை](https://attest.org/)ப் பயன்படுத்துவீர்கள். ஒரு சான்றளிப்பு பொதுவாக இந்தப் புலங்களைக் கொண்டுள்ளது:

- **சான்றளிப்பவர்**, சான்றளிப்பைச் செய்த முகவரி
- **பெறுநர்**, சான்றளிப்பு பொருந்தும் முகவரி
- **தரவு**, சான்றளிக்கப்பட்ட தரவு, அதாவது பெயர், அனுமதிகள் போன்றவை.
- **திட்ட வரைவு**, தரவை விளக்குவதற்குப் பயன்படுத்தப்படும் திட்ட வரைவின் ID.

எத்தேரியத்தின் பரவலாக்கப்பட்ட தன்மை காரணமாக, எந்தவொரு பயனரும் சான்றளிப்புகளை உருவாக்க முடியும். எந்த சான்றளிப்புகளை நாங்கள் நம்பகமானதாகக் கருதுகிறோம் என்பதை அடையாளம் காண சான்றளிப்பவரின் அடையாளம் முக்கியமானது.

## அமைப்பு

ஒரு SAML SP மற்றும் ஒரு SAML IdP ஆகியவை தங்களுக்குள் தொடர்பு கொள்வதே முதல் படியாகும்.

1. மென்பொருளைப் பதிவிறக்கவும். இந்தக் கட்டுரைக்கான மாதிரி மென்பொருள் [github-இல்](https://github.com/qbzzt/250420-saml-ethereum) உள்ளது. வெவ்வேறு நிலைகள் வெவ்வேறு கிளைகளில் சேமிக்கப்பட்டுள்ளன, இந்த நிலைக்கு உங்களுக்கு `saml-only` தேவை

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. சுய கையொப்பமிடப்பட்ட சான்றிதழ்களுடன் திறவுகோல்களை உருவாக்கவும். இதன் பொருள் திறவுகோலே அதன் சொந்த சான்றிதழ் ஆணையம், மற்றும் அது சேவை வழங்குநருக்கு கைமுறையாக இறக்குமதி செய்யப்பட வேண்டும். மேலும் தகவலுக்கு [OpenSSL ஆவணங்களைப்](https://docs.openssl.org/master/man1/openssl-req/) பார்க்கவும்.

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

4. [http://localhost:3000/](http://localhost:3000/) என்ற URL-இல் SP-ஐ உலாவி, IdP-க்கு (போர்ட் 3001) திருப்பிவிட பொத்தானைக் கிளிக் செய்யவும்.

5. IdP-க்கு உங்கள் மின்னஞ்சல் முகவரியை வழங்கி, **சேவை வழங்குநரில் உள்நுழைக** என்பதைக் கிளிக் செய்யவும். நீங்கள் மீண்டும் சேவை வழங்குநருக்கு (போர்ட் 3000) திருப்பி விடப்படுவதையும், அது உங்கள் மின்னஞ்சல் முகவரி மூலம் உங்களை அறிவதையும் பார்க்கவும்.

### விரிவான விளக்கம்

இதுதான் படிப்படியாக நடக்கிறது:

![எத்தேரியம் இல்லாமல் சாதாரண SAML உள்நுழைவு](./fig-04-saml-no-eth.png)

#### src/config.mts

இந்த கோப்பு அடையாள வழங்குநர் மற்றும் சேவை வழங்குநர் ஆகிய இரண்டிற்குமான உள்ளமைவைக் கொண்டுள்ளது. சாதாரணமாக இவை இரண்டும் வெவ்வேறு நிறுவனங்களாக இருக்கும், ஆனால் இங்கே எளிமைக்காக நாம் குறியீட்டைப் பகிர்ந்து கொள்ளலாம்.

```typescript
const fs = await import("fs")

const protocol="http"
```

இப்போதைக்கு நாம் சோதிக்கிறோம், எனவே HTTP பயன்படுத்துவது பரவாயில்லை.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

பொதுத் திறவுகோல்களைப் படிக்கவும், அவை பொதுவாக இரண்டு கூறுகளுக்கும் கிடைக்கின்றன (மற்றும் நேரடியாக நம்பப்படுகின்றன, அல்லது நம்பகமான சான்றிதழ் அதிகாரத்தால் கையொப்பமிடப்பட்டுள்ளன).

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

இரண்டு கூறுகளுக்கும் உள்ள URL-கள்.

```typescript
export const spPublicData = {
```

சேவை வழங்குநருக்கான பொதுத் தரவு.

```typescript
    entityID: `${spUrl}/metadata`,
```

மரபுப்படி, SAML-இல் `entityID` என்பது அந்த நிறுவனத்தின் மெட்டாடேட்டா கிடைக்கும் URL ஆகும். இந்த மெட்டாடேட்டா இங்குள்ள பொதுத் தரவுகளுடன் பொருந்துகிறது, இது XML வடிவத்தில் இருப்பதைத் தவிர.

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

நமது நோக்கங்களுக்கான மிக முக்கியமான வரையறை `assertionConsumerServer` ஆகும். இதன் பொருள், சேவை வழங்குநருக்கு ஏதேனும் ஒன்றை உறுதிப்படுத்த (உதாரணமாக, "இந்தத் தகவலை உங்களுக்கு அனுப்பும் பயனர் somebody@example.com") நாம் [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) ஐப் பயன்படுத்தி `http://localhost:3000/sp/assertion` என்ற URL-க்கு அனுப்ப வேண்டும்.

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

அடையாள வழங்குநருக்கான பொதுத் தரவு ஒத்ததாக உள்ளது. ஒரு பயனரை உள்நுழைய நீங்கள் `http://localhost:3001/idp/login` முகவரிக்கு POST செய்ய வேண்டும் என்றும் ஒரு பயனரை வெளியேற்ற நீங்கள் `http://localhost:3001/idp/logout` முகவரிக்கு POST செய்ய வேண்டும் என்றும் இது குறிப்பிடுகிறது.

#### src/sp.mts

இது ஒரு சேவை வழங்குநரை செயல்படுத்தும் குறியீடு.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAML-ஐ செயல்படுத்த நாம் [`samlify`](https://www.npmjs.com/package/samlify) நூலகத்தைப் பயன்படுத்துகிறோம்.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

`samlify` நூலகம், XML சரியானது, எதிர்பார்க்கப்படும் பொதுத் திறவுகோலுடன் கையொப்பமிடப்பட்டுள்ளது போன்றவற்றை சரிபார்க்க ஒரு தொகுப்பை எதிர்பார்க்கிறது. இந்த நோக்கத்திற்காக நாங்கள் [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) ஐப் பயன்படுத்துகிறோம்.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

ஒரு [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) என்பது ஒரு வலைத்தளத்திற்குள் ஏற்றக்கூடிய ஒரு "சிறிய வலைத்தளம்" ஆகும். இந்த நிலையில், அனைத்து சேவை வழங்குநர் வரையறைகளையும் ஒன்றாகக் குழுவாக்க இதைப் பயன்படுத்துகிறோம்.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

சேவை வழங்குநரின் சொந்தப் பிரதிநிதித்துவம் என்பது அனைத்து பொதுத் தரவுகளும், தகவலில் கையொப்பமிட அது பயன்படுத்தும் தனியார் திறவுகோலும் ஆகும்.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

பொதுத் தரவில் சேவை வழங்குநர் அடையாள வழங்குநரைப் பற்றி தெரிந்து கொள்ள வேண்டிய அனைத்தும் உள்ளது.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

மற்ற SAML கூறுகளுடன் இயங்குவதை இயக்க, சேவை மற்றும் அடையாள வழங்குநர்கள் தங்கள் பொதுத் தரவை (மெட்டாடேட்டா என அழைக்கப்படுகிறது) `/metadata`-இல் XML வடிவத்தில் வைத்திருக்க வேண்டும்.

```typescript
spRouter.post(`/assertion`,
```

இது தன்னை அடையாளம் காண உலாவி அணுகும் பக்கம். இந்தக் கூற்றில் பயனர் அடையாளங்காட்டி (இங்கே நாம் மின்னஞ்சல் முகவரியைப் பயன்படுத்துகிறோம்) அடங்கும், மேலும் கூடுதல் பண்புகளையும் சேர்க்கலாம். மேலே உள்ள வரிசை வரைபடத்தில் படி 7-க்கான கையாளுபவர் இது.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

கூற்றில் வழங்கப்பட்ட XML தரவைப் பார்க்க நீங்கள் கருத்துரையில் உள்ள கட்டளையைப் பயன்படுத்தலாம். இது [பேஸ்64 குறியாக்கம்](https://en.wikipedia.org/wiki/Base64) செய்யப்பட்டது.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

அடையாள சேவையகத்திலிருந்து உள்நுழைவு கோரிக்கையை அலசவும்.

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

பயனருக்கு நாங்கள் உள்நுழைவைப் பெற்றோம் என்பதைக் காட்ட ஒரு HTML பதிலை அனுப்பவும்.

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

உலாவி இந்தப் பக்கத்தைப் பெற முயற்சிக்கும்போது ஒரு உள்நுழைவு கோரிக்கையை உருவாக்கவும். மேலே உள்ள வரிசை வரைபடத்தில் படி 1-க்கான கையாளுபவர் இது.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

உள்நுழைவு கோரிக்கையை இடுகையிடுவதற்கான தகவலைப் பெறவும்.

```typescript
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

இந்தப் பக்கம் தானாகவே படிவத்தை (கீழே காண்க) சமர்ப்பிக்கிறது. இந்த வழியில் பயனர் திருப்பிவிடப்படுவதற்கு எதையும் செய்ய வேண்டியதில்லை. மேலே உள்ள வரிசை வரைபடத்தில் இது படி 2 ஆகும்.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (அடையாள வழங்குநர் எண்ட்பாயிண்டின் URL) க்கு பதிவு செய்யவும்.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

உள்ளீட்டுப் பெயர் `loginRequest.type` (`SAMLRequest`) ஆகும். அந்தப் புலத்திற்கான உள்ளடக்கம் `loginRequest.context` ஆகும், இது மீண்டும் பேஸ்64 குறியாக்கம் செய்யப்பட்ட XML ஆகும்.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[இந்த மிடில்வேர்](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP கோரிக்கையின்](https://www.tutorialspoint.com/http/http_requests.htm) உடலைப் படிக்கிறது. இயல்பாக express அதைப் புறக்கணிக்கிறது, ஏனெனில் பெரும்பாலான கோரிக்கைகளுக்கு இது தேவையில்லை. POST உடலைப் பயன்படுத்துவதால் இது எங்களுக்குத் தேவை.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

சேவை வழங்குநர் கோப்பகத்தில் (`/sp`) ரூட்டரை ஏற்றவும்.

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

ஒரு உலாவி ரூட் கோப்பகத்தைப் பெற முயற்சித்தால், உள்நுழைவு பக்கத்திற்கான இணைப்பை வழங்கவும்.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

இந்த express பயன்பாட்டுடன் `spPort` ஐக் கேட்கவும்.

#### src/idp.mts

இது அடையாள வழங்குநர். இது சேவை வழங்குநரைப் போலவே உள்ளது, கீழே உள்ள விளக்கங்கள் வேறுபட்ட பகுதிகளுக்கானவை.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

சேவை வழங்குநரிடமிருந்து நாங்கள் பெறும் XML கோரிக்கையைப் படித்து புரிந்து கொள்ள வேண்டும்.

```typescript
const getLoginPage = requestId => `
```

இந்தச் செயல்பாடு, மேலே உள்ள வரிசை வரைபடத்தில் படி 4 இல் திருப்பியனுப்பப்படும் தானாகச் சமர்ப்பிக்கப்பட்ட படிவத்துடன் பக்கத்தை உருவாக்குகிறது.

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

மேலே உள்ள வரிசை வரைபடத்தில் படி 5-க்கான கையாளுபவர் இது. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) உள்நுழைவு பதிலை உருவாக்குகிறது.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

பார்வையாளர்கள் சேவை வழங்குநர்.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

கோரிக்கையிலிருந்து பிரித்தெடுக்கப்பட்ட தகவல். கோரிக்கையில் நாம் அக்கறை கொள்ளும் ஒரு அளவுரு requestId ஆகும், இது சேவை வழங்குநரை கோரிக்கைகளையும் அவற்றின் பதில்களையும் பொருத்த அனுமதிக்கிறது.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

பதிலில் கையொப்பமிட தரவு இருக்க `signingKey` எங்களுக்குத் தேவை. சேவை வழங்குநர் கையொப்பமிடப்படாத கோரிக்கைகளை நம்புவதில்லை.

```typescript
    },
    "post",
    {
      email: req.body.email
```

இது நாங்கள் சேவை வழங்குநருக்குத் திருப்பி அனுப்பும் பயனர் தகவலுடன் கூடிய புலம்.

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

மீண்டும், தானாக சமர்ப்பிக்கப்பட்ட படிவத்தைப் பயன்படுத்தவும். மேலே உள்ள வரிசை வரைபடத்தில் இது படி 6 ஆகும்.

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

இது சேவை வழங்குநரிடமிருந்து ஒரு உள்நுழைவு கோரிக்கையைப் பெறும் எண்ட்பாயிண்ட் ஆகும். இது மேலே உள்ள வரிசை வரைபடத்தில் படி 3 க்கான கையாளுபவர்.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

அங்கீகார கோரிக்கையின் ID-ஐப் படிக்க நாம் [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) ஐப் பயன்படுத்த முடியும். இருப்பினும், என்னால் அதை வேலை செய்ய வைக்க முடியவில்லை, அதில் அதிக நேரம் செலவழிப்பது மதிப்புக்குரியதாக இல்லை, எனவே நான் ஒரு [பொது நோக்க XML அலசரைப்](https://www.npmjs.com/package/fast-xml-parser) பயன்படுத்துகிறேன். நமக்குத் தேவையான தகவல் `<samlp:AuthnRequest>` குறிச்சொல்லுக்குள் உள்ள `ID` பண்புக்கூறு ஆகும், இது XML-இன் மேல் மட்டத்தில் உள்ளது.

## எத்தேரியம் கையொப்பங்களைப் பயன்படுத்துதல்

இப்போது நாம் ஒரு பயனர் அடையாளத்தை சேவை வழங்குநருக்கு அனுப்ப முடியும், அடுத்த கட்டம் நம்பகமான முறையில் பயனர் அடையாளத்தைப் பெறுவதாகும். Viem பயனர் முகவரிக்காக பணப்பையை கேட்க அனுமதிக்கிறது, ஆனால் இது உலாவிடம் தகவலைக் கேட்பதாகும். நாங்கள் உலாவியைக் கட்டுப்படுத்தவில்லை, எனவே அதிலிருந்து நாம் பெறும் பதிலை தானாகவே நம்ப முடியாது.

அதற்கு பதிலாக, IdP கையொப்பமிட ஒரு சரத்தை உலாவிக்கு அனுப்பப் போகிறது. உலாவியில் உள்ள பணப்பை இந்தச் சரத்தில் கையொப்பமிட்டால், அது உண்மையில் அந்த முகவரிதான் என்று அர்த்தம் (அதாவது, அந்த முகவரிக்குரிய தனியார் திறவுகோலை அது அறிந்திருக்கிறது).

இதைச் செயல்பாட்டில் காண, ஏற்கனவே உள்ள IdP மற்றும் SP ஐ நிறுத்தி, இந்தக் கட்டளைகளை இயக்கவும்:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

பின்னர் [SP க்கு](http://localhost:3000) உலவி, வழிமுறைகளைப் பின்பற்றவும்.

இந்த நேரத்தில் எத்தேரியம் முகவரியிலிருந்து மின்னஞ்சல் முகவரியை எவ்வாறு பெறுவது என்று எங்களுக்குத் தெரியாது என்பதை நினைவில் கொள்க, எனவே அதற்குப் பதிலாக `<எத்தேரியம் முகவரி>@bad.email.address` என SP-க்குத் தெரிவிக்கிறோம்.

### விரிவான விளக்கம்

மாற்றங்கள் முந்தைய வரைபடத்தில் 4-5 படிகளில் உள்ளன.

![ஒரு எத்தேரியம் கையொப்பத்துடன் SAML](./fig-05-saml-w-signature.png)

நாங்கள் மாற்றிய ஒரே கோப்பு `idp.mts` மட்டுமே. மாற்றப்பட்ட பகுதிகள் இங்கே.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

இந்த இரண்டு கூடுதல் நூலகங்கள் எங்களுக்குத் தேவை. [நான்ஸ்](https://en.wikipedia.org/wiki/Cryptographic_nonce) மதிப்பை உருவாக்க நாங்கள் [`uuid`](https://www.npmjs.com/package/uuid) ஐப் பயன்படுத்துகிறோம். மதிப்பு தானே ஒரு பொருட்டல்ல, அது ஒரு முறை மட்டுமே பயன்படுத்தப்படுகிறது என்பதுதான் உண்மை.

[`viem`](https://viem.sh/) நூலகம் எத்தேரியம் வரையறைகளைப் பயன்படுத்த அனுமதிக்கிறது. கையொப்பம் உண்மையிலேயே செல்லுபடியானது என்பதை சரிபார்க்க இங்கே இது எங்களுக்குத் தேவை.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

பணப்பை பயனரிடம் செய்தியில் கையொப்பமிட அனுமதி கேட்கிறது. ஒரு நான்ஸ் மட்டுமேயான ஒரு செய்தி பயனர்களைக் குழப்பக்கூடும், எனவே நாங்கள் இந்த அறிவுறுத்தலைச் சேர்க்கிறோம்.

```typescript
// Keep requestIDs here
let nonces = {}
```

கோரிக்கைக்கு பதிலளிக்க கோரிக்கை தகவல் எங்களுக்குத் தேவை. நாங்கள் அதை கோரிக்கையுடன் (படி 4) அனுப்பலாம், மற்றும் அதை மீண்டும் பெறலாம் (படி 5). இருப்பினும், ஒரு சாத்தியமான விரோத பயனரின் கட்டுப்பாட்டில் உள்ள உலாவியிலிருந்து நாம் பெறும் தகவலை நம்ப முடியாது. எனவே அதை இங்கே சேமிப்பது நல்லது, நான்ஸை திறவுகோலாகக் கொண்டு.

எளிமைக்காக இதை இங்கே ஒரு மாறியாகச் செய்கிறோம் என்பதை நினைவில் கொள்க. இருப்பினும், இது பல தீமைகளைக் கொண்டுள்ளது:

- சேவை மறுப்பு தாக்குதலுக்கு நாங்கள் ஆளாக நேரிடலாம். ஒரு தீங்கிழைக்கும் பயனர் பலமுறை உள்நுழைய முயற்சி செய்யலாம், இது நமது நினைவகத்தை நிரப்பும்.
- IdP செயல்முறையை மீண்டும் தொடங்க வேண்டியிருந்தால், ஏற்கனவே உள்ள மதிப்புகளை இழக்கிறோம்.
- பல செயல்முறைகளில் நாங்கள் சுமையை சமநிலைப்படுத்த முடியாது, ஏனெனில் ஒவ்வொன்றும் அதன் சொந்த மாறியைக் கொண்டிருக்கும்.

ஒரு உற்பத்தி அமைப்பில், நாங்கள் ஒரு தரவுத்தளத்தைப் பயன்படுத்துவோம் மற்றும் சில வகையான காலாவதி பொறிமுறையைச் செயல்படுத்துவோம்.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

ஒரு நான்ஸை உருவாக்கி, எதிர்கால பயன்பாட்டிற்காக `requestId` ஐ சேமிக்கவும்.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

பக்கம் ஏற்றப்படும்போது இந்த ஜாவாஸ்கிரிப்ட் தானாகவே செயல்படுத்தப்படுகிறது.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

`viem` இலிருந்து பல செயல்பாடுகள் எங்களுக்குத் தேவை.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

உலாவியில் ஒரு பணப்பை இருந்தால் மட்டுமே நாங்கள் வேலை செய்ய முடியும்.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

பணப்பையிலிருந்து (`window.ethereum`) கணக்குகளின் பட்டியலைக் கோரவும். குறைந்தபட்சம் ஒன்று இருப்பதாகக் கருதி, முதல் ஒன்றை மட்டும் சேமிக்கவும்.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

உலாவி பணப்பையுடன் தொடர்பு கொள்ள ஒரு [பணப்பை கிளையன்டை](https://viem.sh/docs/clients/wallet) உருவாக்கவும்.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

பயனரிடம் ஒரு செய்தியில் கையொப்பமிடுமாறு கேட்கவும். இந்த முழு HTML ஒரு [டெம்ப்ளேட் சரத்தில்](https://viem.sh/docs/clients/wallet) இருப்பதால், idp செயல்முறையில் வரையறுக்கப்பட்ட மாறிகளை நாம் பயன்படுத்தலாம். இது வரிசை வரைபடத்தில் படி 4.5 ஆகும்.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>` க்கு திருப்பி விடவும். இது வரிசை வரைபடத்தில் படி 5 ஆகும்.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

கையொப்பம் உலாவியால் திருப்பி அனுப்பப்படுகிறது, இது சாத்தியமான தீங்கிழைக்கும் (உலாவியில் `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` ஐத் திறப்பதை எதுவும் தடுக்காது). எனவே, IdP செயல்முறை மோசமான கையொப்பங்களைச் சரியாகக் கையாளுகிறதா என்பதைச் சரிபார்ப்பது முக்கியம்.

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

இது வரிசை வரைபடத்தில் படி 5க்கான கையாளுபவர்.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

கோரிக்கை ID-ஐப் பெற்று, நான்ஸை மீண்டும் பயன்படுத்த முடியாது என்பதை உறுதிசெய்ய, அதை `nonces` இலிருந்து நீக்கவும்.

```typescript
  try {
```

கையொப்பம் செல்லுபடியாகாமல் இருக்க பல வழிகள் இருப்பதால், இதை ஒரு `try ...` இல் போர்த்துகிறோம். எறியப்பட்ட பிழைகளைப் பிடிக்க`catch` தொகுதி.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

வரிசை வரைபடத்தில் படி 5.5 ஐ செயல்படுத்த [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) ஐப் பயன்படுத்தவும்.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

கையாளுபவரின் மீதமுள்ளவை, ஒரு சிறிய மாற்றத்தைத் தவிர, `/loginSubmitted` கையாளுபவரில் நாம் முன்பு செய்ததற்குச் சமமானது.

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

உண்மையான மின்னஞ்சல் முகவரி எங்களிடம் இல்லை (அடுத்த பகுதியில் அதைப் பெறுவோம்), எனவே இப்போதைக்கு எத்தேரியம் முகவரியைத் திருப்பித் தந்து, அதை மின்னஞ்சல் முகவரி அல்ல என்று தெளிவாகக் குறிக்கிறோம்.

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

`getLoginPage` க்குப் பதிலாக, இப்போது படி 3 கையாளுபவரில் `getSignaturePage` ஐப் பயன்படுத்தவும்.

## மின்னஞ்சல் முகவரியைப் பெறுதல்

அடுத்த கட்டம் மின்னஞ்சல் முகவரியைப் பெறுவதாகும், இது சேவை வழங்குநரால் கோரப்பட்ட அடையாளங்காட்டி. அதைச் செய்ய, நாங்கள் [எத்தேரியம் சான்றளிப்பு சேவையைப் (EAS)](https://attest.org/) பயன்படுத்துகிறோம்.

சான்றளிப்புகளைப் பெறுவதற்கான எளிதான வழி [GraphQL API](https://docs.attest.org/docs/developer-tools/api) ஐப் பயன்படுத்துவதாகும். இந்த வினவலை நாங்கள் பயன்படுத்துகிறோம்:

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

இந்த [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) ஒரு மின்னஞ்சல் முகவரியை மட்டுமே கொண்டுள்ளது. இந்த வினவல் இந்தத் திட்டவரைவின் சான்றளிப்புகளைக் கேட்கிறது. சான்றளிப்பின் பொருள் `பெறுநர்` என்று அழைக்கப்படுகிறது. இது எப்போதும் ஒரு எத்தேரியம் முகவரியாகும்.

எச்சரிக்கை: நாங்கள் இங்கு சான்றளிப்புகளைப் பெறும் விதத்தில் இரண்டு பாதுகாப்புச் சிக்கல்கள் உள்ளன.

- நாங்கள் API எண்ட்பாயிண்டான, `https://optimism.easscan.org/graphql`-க்குச் செல்கிறோம், இது ஒரு மையப்படுத்தப்பட்ட கூறு. `id` பண்புக்கூறைப் பெற்று, ஒரு சான்றளிப்பு உண்மையானது என்பதைச் சரிபார்க்க ஆன்செயினில் ஒரு தேடலைச் செய்யலாம், ஆனால் API எண்ட்பாயிண்ட் இன்னும் சான்றளிப்புகளைப் பற்றி எங்களுக்குச் சொல்லாமல் தணிக்கை செய்ய முடியும்.

  இந்த சிக்கலைத் தீர்ப்பது சாத்தியமற்றது அல்ல, நாங்கள் எங்கள் சொந்த GraphQL எண்ட்பாயிண்டை இயக்கி, சங்கிலி பதிவுகளிலிருந்து சான்றளிப்புகளைப் பெறலாம், ஆனால் அது எங்கள் நோக்கங்களுக்கு அதிகப்படியானது.

- நாங்கள் சான்றளிப்பவர் அடையாளத்தைப் பார்ப்பதில்லை. யார் வேண்டுமானாலும் எங்களுக்குத் தவறான தகவலை அளிக்கலாம். ஒரு நிஜ உலகச் செயல்பாட்டில், நாங்கள் நம்பகமான சான்றளிப்பாளர்களின் தொகுப்பைக் கொண்டிருப்போம், மேலும் அவர்களின் சான்றளிப்புகளை மட்டுமே பார்ப்போம்.

இதைச் செயல்பாட்டில் காண, ஏற்கனவே உள்ள IdP மற்றும் SP ஐ நிறுத்தி, இந்தக் கட்டளைகளை இயக்கவும்:

```sh
git checkout email-address
pnpm install
pnpm start
```

பின்னர் உங்கள் மின்னஞ்சல் முகவரியை வழங்கவும். அதைச் செய்ய உங்களுக்கு இரண்டு வழிகள் உள்ளன:

- ஒரு தனியார் திறவுகோலைப் பயன்படுத்தி ஒரு பணப்பையை இறக்குமதி செய்து, சோதனை தனியார் திறவுகோலான `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`-ஐப் பயன்படுத்தவும்.

- உங்கள் சொந்த மின்னஞ்சல் முகவரிக்கு ஒரு சான்றளிப்பைச் சேர்க்கவும்:

  1. [சான்றளிப்பு எக்ஸ்ப்ளோரரில் உள்ள திட்ட வரைவுக்கு](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) உலாவவும்.

  2. **திட்ட வரைவுடன் சான்றளி** என்பதைக் கிளிக் செய்யவும்.

  3. உங்கள் எத்தேரியம் முகவரியை பெறுநராகவும், உங்கள் மின்னஞ்சல் முகவரியை மின்னஞ்சல் முகவரியாகவும் உள்ளிட்டு, **ஆன்செயின்** என்பதைத் தேர்ந்தெடுக்கவும். பின்னர் **சான்றளிப்பை உருவாக்கு** என்பதைக் கிளிக் செய்யவும்.

  4. உங்கள் பணப்பையில் பரிவர்த்தனைக்கு ஒப்புதல் அளிக்கவும். எரிவாயுவிற்கான கட்டணத்தைச் செலுத்த [Optimism Blockchain](https://app.optimism.io/bridge/deposit) இல் உங்களுக்குச் சில ETH தேவைப்படும்.

எந்த வழியாயினும், இதைச் செய்த பிறகு [http://localhost:3000](http://localhost:3000) க்கு உலவி, வழிமுறைகளைப் பின்பற்றவும். நீங்கள் சோதனை தனியார் திறவுகோலை இறக்குமதி செய்திருந்தால், நீங்கள் பெறும் மின்னஞ்சல் `test_addr_0@example.com` ஆகும். உங்கள் சொந்த முகவரியைப் பயன்படுத்தியிருந்தால், அது நீங்கள் சான்றளித்ததாக இருக்க வேண்டும்.

### விரிவான விளக்கம்

![எத்தேரியம் முகவரியிலிருந்து மின்னஞ்சலுக்குச் செல்லுதல்](./fig-06-saml-sig-n-email.png)

புதிய படிகள் GraphQL தொடர்பு, படிகள் 5.6 மற்றும் 5.7 ஆகும்.

மீண்டும், `idp.mts`-இன் மாற்றப்பட்ட பகுதிகள் இங்கே உள்ளன.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

நமக்குத் தேவையான நூலகங்களை இறக்குமதி செய்யவும்.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[ஒவ்வொரு பிளாக்செயினுக்கும் ஒரு தனி எண்ட்பாயிண்ட்](https://docs.attest.org/docs/developer-tools/api) உள்ளது.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

எண்ட்பாயிண்ட்டை வினவுவதற்குப் பயன்படுத்தக்கூடிய ஒரு புதிய `GraphQLClient` கிளையன்டை உருவாக்கவும்.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL நமக்கு பைட்டுகளுடன் ஒரு ஒளிபுகா தரவு பொருளை மட்டுமே தருகிறது. அதைப் புரிந்து கொள்ள நமக்கு திட்ட வரைவு தேவை.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

ஒரு எத்தேரியம் முகவரியிலிருந்து ஒரு மின்னஞ்சல் முகவரிக்குச் செல்வதற்கான ஒரு செயல்பாடு.

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

நாங்கள் விரும்பும் சான்றளிப்புகள் எங்கள் திட்ட வரைவில் உள்ளவை, அங்கு பெறுநர் `getAddress(ethAddr)`. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) செயல்பாடு எங்கள் முகவரி சரியான [செக்சம்](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) கொண்டிருப்பதை உறுதி செய்கிறது. இது GraphQL என்பது எழுத்து வடிவம் முக்கியமானது என்பதால் அவசியமானது. "0xBAD060A7", "0xBad060A7", மற்றும் "0xbad060a7" ஆகியவை வெவ்வேறு மதிப்புகள்.

```typescript
        take: 1
```

எத்தனை சான்றளிப்புகளைக் கண்டாலும், முதல் ஒன்றை மட்டுமே நாங்கள் விரும்புகிறோம்.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

நாங்கள் பெற விரும்பும் புலங்கள்.

- `attester`: சான்றளிப்பைச் சமர்ப்பித்த முகவரி. சாதாரணமாக இது சான்றளிப்பை நம்புவதா இல்லையா என்பதைத் தீர்மானிக்கப் பயன்படுகிறது.
- `id`: சான்றளிப்பு ID. GraphQL வினவலிலிருந்து வரும் தகவல் சரியானது என்பதைச் சரிபார்க்க, இந்த மதிப்பை நீங்கள் [சான்றளிப்பை ஆன்செயினில் படிக்கப்](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) பயன்படுத்தலாம்.
- `data`: திட்ட வரைவுத் தரவு (இந்த நிலையில், மின்னஞ்சல் முகவரி).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

சான்றளிப்பு இல்லை என்றால், வெளிப்படையாகத் தவறான, ஆனால் சேவை வழங்குநருக்குச் செல்லுபடியாகும் என்று தோன்றும் ஒரு மதிப்பைத் திருப்பியனுப்பவும்.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

ஒரு மதிப்பு இருந்தால், தரவை டிகோட் செய்ய `decodeData` ஐப் பயன்படுத்தவும். அது வழங்கும் மெட்டாடேட்டா எங்களுக்குத் தேவையில்லை, மதிப்பு மட்டுமே தேவை.

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

இந்த உள்ளமைவில், எத்தேரியத்திலிருந்து மின்னஞ்சல் முகவரி மேப்பிங்கிற்கு நம்பகமான சான்றளிப்பாளர்களை நாங்கள் நம்பியிருக்கும் வரை, பயனர்கள் தாங்கள் இல்லாத ஒருவராக நடிக்க முடியாது. இருப்பினும், எங்கள் அடையாள வழங்குநர் இன்னும் ஒரு மையப்படுத்தப்பட்ட கூறு. அடையாள வழங்குநரின் தனியார் திறவுகோலைக் கொண்ட எவரும் சேவை வழங்குநருக்குத் தவறான தகவலை அனுப்பலாம்.

[பலகட்சி கணக்கீடு (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) பயன்படுத்தி ஒரு தீர்வு இருக்கலாம். எதிர்கால பயிற்சியில் அதைப் பற்றி எழுதுவேன் என்று நம்புகிறேன்.

## முடிவுரை

எத்தேரியம் கையொப்பங்கள் போன்ற ஒரு உள்நுழைவு தரநிலையை ஏற்றுக்கொள்வது, கோழி மற்றும் முட்டை சிக்கலை எதிர்கொள்கிறது. சேவை வழங்குநர்கள் பரந்த சாத்தியமான சந்தையை ஈர்க்க விரும்புகிறார்கள். பயனர்கள் தங்கள் உள்நுழைவு தரநிலையை ஆதரிப்பதைப் பற்றி கவலைப்படாமல் சேவைகளை அணுக விரும்புகிறார்கள்.
ஒரு எத்தேரியம் IdP போன்ற அடாப்டர்களை உருவாக்குவது, இந்தத் தடையைத் தாண்ட எங்களுக்கு உதவும்.

[எனது மேலும் பணிகளை இங்கே பார்க்கவும்](https://cryptodocguy.pro/).
