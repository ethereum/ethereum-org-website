---
title: "వెబ్2 ప్రామాణీకరణ కోసం ఎథీరియంను ఉపయోగించడం"
description: "ఈ ట్యుటోరియల్ చదివిన తర్వాత, డెవలపర్ ఎథీరియం లాగిన్ (వెబ్3)ను SAML లాగిన్‌తో అనుసంధానించగలరు, ఇది సింగిల్ సైన్-ఆన్ మరియు ఇతర సంబంధిత సేవలను అందించడానికి వెబ్2లో ఉపయోగించే ప్రమాణం. ఇది ఎథీరియం సంతకాల ద్వారా వెబ్2 వనరులకు ప్రాప్యతను ప్రామాణీకరించడానికి అనుమతిస్తుంది, వినియోగదారు లక్షణాలు ధృవీకరణల నుండి వస్తాయి."
author: "ఓరి పోమెరాంట్జ్"
tags:
  - వెబ్2
  - ప్రామాణీకరణ
  - eas
skill: beginner
breadcrumb: "వెబ్2 ప్రామాణీకరణ కోసం ఎథీరియం"
lang: te
published: 2025-04-30
---

## పరిచయం {#introduction}

[SAML](https://www.onelogin.com/learn/saml) అనేది [సర్వీస్ ప్రొవైడర్ల (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) కోసం వినియోగదారు సమాచారాన్ని అందించడానికి [ఐడెంటిటీ ప్రొవైడర్‌ను (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) అనుమతించడానికి వెబ్2లో ఉపయోగించే ఒక ప్రమాణం.

ఈ ట్యుటోరియల్‌లో మీరు ఎథీరియం సంతకాలను SAMLతో ఎలా అనుసంధానించాలో నేర్చుకుంటారు, తద్వారా వినియోగదారులు తమ ఎథీరియం వాలెట్‌లను ఉపయోగించి ఇంకా ఎథీరియంకు స్థానికంగా మద్దతు ఇవ్వని వెబ్2 సేవలకు తమను తాము ప్రామాణీకరించుకోవచ్చు.

ఈ ట్యుటోరియల్ రెండు వేర్వేరు ప్రేక్షకుల కోసం వ్రాయబడిందని గమనించండి:

- ఎథీరియంను అర్థం చేసుకుని, SAML నేర్చుకోవాల్సిన ఎథీరియం వ్యక్తులు
- SAML మరియు వెబ్2 ప్రామాణీకరణను అర్థం చేసుకుని, ఎథీరియం నేర్చుకోవాల్సిన వెబ్2 వ్యక్తులు

ఫలితంగా, ఇది మీకు ఇప్పటికే తెలిసిన చాలా పరిచయ విషయాలను కలిగి ఉంటుంది. దాన్ని దాటవేయడానికి సంకోచించకండి.

### ఎథీరియం వ్యక్తుల కోసం SAML {#saml-for-ethereum-people}

SAML అనేది ఒక కేంద్రీకృత ప్రోటోకాల్. ఒక సర్వీస్ ప్రొవైడర్ (SP) ఐడెంటిటీ ప్రొవైడర్ (IdP) నుండి నిర్ధారణలను ("ఇది నా వినియోగదారు జాన్, అతనికి A, B మరియు C చేయడానికి అనుమతులు ఉండాలి" వంటివి) అంగీకరిస్తుంది, దానికి దానితో లేదా ఆ IdP సర్టిఫికెట్‌పై సంతకం చేసిన [సర్టిఫికెట్ అథారిటీతో](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) ముందుగా ఉన్న నమ్మక సంబంధం ఉంటే మాత్రమే.

ఉదాహరణకు, SP అనేది కంపెనీలకు ప్రయాణ సేవలను అందించే ట్రావెల్ ఏజెన్సీ కావచ్చు మరియు IdP అనేది కంపెనీ అంతర్గత వెబ్‌సైట్ కావచ్చు. ఉద్యోగులు వ్యాపార ప్రయాణాన్ని బుక్ చేసుకోవలసి వచ్చినప్పుడు, ట్రావెల్ ఏజెన్సీ వారిని వాస్తవానికి ప్రయాణాన్ని బుక్ చేసుకోవడానికి అనుమతించే ముందు కంపెనీ ద్వారా ప్రామాణీకరణ కోసం పంపుతుంది.

![Step by step SAML process](./fig-01-saml.png)

బ్రౌజర్, SP మరియు IdP అనే మూడు ఎంటిటీలు యాక్సెస్ కోసం చర్చలు జరిపే విధానం ఇది. బ్రౌజర్‌ను ఉపయోగిస్తున్న వినియోగదారు గురించి SP ముందుగా ఏమీ తెలుసుకోవలసిన అవసరం లేదు, కేవలం IdPని విశ్వసిస్తే సరిపోతుంది.

### SAML వ్యక్తుల కోసం ఎథీరియం {#ethereum-for-saml-people}

ఎథీరియం అనేది ఒక వికేంద్రీకృత వ్యవస్థ. 

![Ethereum logon](./fig-02-eth-logon.png)

వినియోగదారులు ఒక ప్రైవేట్ కీని కలిగి ఉంటారు (సాధారణంగా బ్రౌజర్ ఎక్స్‌టెన్షన్‌లో ఉంచబడుతుంది). ప్రైవేట్ కీ నుండి మీరు పబ్లిక్ కీని పొందవచ్చు మరియు దాని నుండి 20-బైట్ల చిరునామాను పొందవచ్చు. వినియోగదారులు సిస్టమ్‌లోకి లాగిన్ అవ్వవలసి వచ్చినప్పుడు, నాన్స్‌తో (ఒకేసారి ఉపయోగించే విలువ) సందేశంపై సంతకం చేయమని వారిని అభ్యర్థిస్తారు. ఆ చిరునామా ద్వారా సంతకం సృష్టించబడిందని సర్వర్ ధృవీకరించగలదు.

![Getting extra data from attestations](./fig-03-eas-data.png)

సంతకం ఎథీరియం చిరునామాను మాత్రమే ధృవీకరిస్తుంది. ఇతర వినియోగదారు లక్షణాలను పొందడానికి, మీరు సాధారణంగా [ధృవీకరణలను](https://attest.org/) ఉపయోగిస్తారు. ఒక ధృవీకరణ సాధారణంగా ఈ ఫీల్డ్‌లను కలిగి ఉంటుంది:

- **అటెస్టర్ (Attestor)**, ధృవీకరణ చేసిన చిరునామా
- **స్వీకర్త (Recipient)**, ధృవీకరణ వర్తించే చిరునామా
- **డేటా (Data)**, పేరు, అనుమతులు మొదలైన ధృవీకరించబడుతున్న డేటా.
- **స్కీమా (Schema)**, డేటాను అర్థం చేసుకోవడానికి ఉపయోగించే స్కీమా యొక్క ID.

ఎథీరియం యొక్క వికేంద్రీకృత స్వభావం కారణంగా, ఏ వినియోగదారుడైనా ధృవీకరణలు చేయవచ్చు. ఏ ధృవీకరణలను మనం నమ్మదగినవిగా పరిగణిస్తామో గుర్తించడానికి అటెస్టర్ గుర్తింపు ముఖ్యం.

## సెటప్ {#setup}

మొదటి దశ SAML SP మరియు SAML IdP తమ మధ్య కమ్యూనికేట్ చేసుకోవడం.

1. సాఫ్ట్‌వేర్‌ను డౌన్‌లోడ్ చేయండి. ఈ వ్యాసం కోసం నమూనా సాఫ్ట్‌వేర్ [GitHubలో](https://github.com/qbzzt/250420-saml-ethereum) ఉంది. వేర్వేరు దశలు వేర్వేరు బ్రాంచ్‌లలో నిల్వ చేయబడతాయి, ఈ దశ కోసం మీకు `saml-only` కావాలి

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. స్వీయ-సంతకం చేసిన సర్టిఫికెట్‌లతో కీలను సృష్టించండి. దీని అర్థం కీ దాని స్వంత సర్టిఫికెట్ అథారిటీ, మరియు సర్వీస్ ప్రొవైడర్‌కు మాన్యువల్‌గా దిగుమతి చేయబడాలి. మరింత సమాచారం కోసం [OpenSSL డాక్యుమెంట్లను](https://docs.openssl.org/master/man1/openssl-req/) చూడండి. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. సర్వర్‌లను ప్రారంభించండి (SP మరియు IdP రెండూ)

    ```sh
    pnpm start
    ```

4. URL [http://localhost:3000/](http://localhost:3000/) వద్ద SPకి బ్రౌజ్ చేయండి మరియు IdP (పోర్ట్ 3001)కి దారి మళ్లించబడటానికి బటన్‌ను క్లిక్ చేయండి.

5. IdPకి మీ ఇమెయిల్ చిరునామాను అందించండి మరియు **సర్వీస్ ప్రొవైడర్‌కు లాగిన్ చేయి (Login to the service provider)** క్లిక్ చేయండి. మీరు తిరిగి సర్వీస్ ప్రొవైడర్‌కు (పోర్ట్ 3000) దారి మళ్లించబడ్డారని మరియు అది మీ ఇమెయిల్ చిరునామా ద్వారా మిమ్మల్ని గుర్తిస్తుందని చూడండి.

### వివరణాత్మక వివరణ {#detailed-explanation}

దశలవారీగా ఏమి జరుగుతుందో ఇక్కడ ఉంది:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

ఈ ఫైల్ ఐడెంటిటీ ప్రొవైడర్ మరియు సర్వీస్ ప్రొవైడర్ రెండింటికీ కాన్ఫిగరేషన్‌ను కలిగి ఉంటుంది. సాధారణంగా ఈ రెండూ వేర్వేరు ఎంటిటీలు అవుతాయి, కానీ ఇక్కడ మనం సరళత కోసం కోడ్‌ను పంచుకోవచ్చు.

```typescript
const fs = await import("fs")

const protocol="http"
```

ప్రస్తుతానికి మనం కేవలం పరీక్షిస్తున్నాము, కాబట్టి HTTPని ఉపయోగించడం మంచిది.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

పబ్లిక్ కీలను చదవండి, ఇవి సాధారణంగా రెండు భాగాలకు అందుబాటులో ఉంటాయి (మరియు నేరుగా విశ్వసించబడతాయి లేదా విశ్వసనీయ సర్టిఫికెట్ అథారిటీ ద్వారా సంతకం చేయబడతాయి).

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

రెండు భాగాల కోసం URLలు.

```typescript
export const spPublicData = {
```

సర్వీస్ ప్రొవైడర్ కోసం పబ్లిక్ డేటా.

```typescript
    entityID: `${spUrl}/metadata`,
```

సాంప్రదాయం ప్రకారం, SAMLలో ``entityID`` అనేది ఎంటిటీ యొక్క మెటాడేటా అందుబాటులో ఉండే URL. ఈ మెటాడేటా ఇక్కడ పబ్లిక్ డేటాకు అనుగుణంగా ఉంటుంది, అయితే ఇది XML రూపంలో ఉంటుంది.

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

మన ప్రయోజనాల కోసం అత్యంత ముఖ్యమైన నిర్వచనం ``assertionConsumerServer``. దీని అర్థం సర్వీస్ ప్రొవైడర్‌కు ఏదైనా నిర్ధారించడానికి (ఉదాహరణకు, "మీకు ఈ సమాచారాన్ని పంపే వినియోగదారు somebody@example.com") మనం URL ``http://localhost:3000/sp/assertion``కి [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp)ని ఉపయోగించాలి.

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

ఐడెంటిటీ ప్రొవైడర్ కోసం పబ్లిక్ డేటా కూడా ఇలాగే ఉంటుంది. వినియోగదారుని లాగిన్ చేయడానికి మీరు ``http://localhost:3001/idp/login``కి POST చేయాలని మరియు వినియోగదారుని లాగ్ అవుట్ చేయడానికి మీరు ``http://localhost:3001/idp/logout``కి POST చేయాలని ఇది నిర్దేశిస్తుంది.

#### src/sp.mts {#srcspmts}

ఇది సర్వీస్ ప్రొవైడర్‌ను అమలు చేసే కోడ్.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAMLని అమలు చేయడానికి మనం [`samlify`](https://www.npmjs.com/package/samlify) లైబ్రరీని ఉపయోగిస్తాము.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

``samlify`` లైబ్రరీ XML సరైనదని, ఆశించిన పబ్లిక్ కీతో సంతకం చేయబడిందని మొదలైనవాటిని ధృవీకరించడానికి ఒక ప్యాకేజీని ఆశిస్తుంది. ఈ ప్రయోజనం కోసం మనం [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)ని ఉపయోగిస్తాము.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

ఒక [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) అనేది వెబ్‌సైట్ లోపల మౌంట్ చేయగల "మినీ వెబ్‌సైట్". ఈ సందర్భంలో, సర్వీస్ ప్రొవైడర్ నిర్వచనాలన్నింటినీ ఒకచోట చేర్చడానికి మనం దీన్ని ఉపయోగిస్తాము.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

సర్వీస్ ప్రొవైడర్ యొక్క స్వంత ప్రాతినిధ్యం అనేది మొత్తం పబ్లిక్ డేటా మరియు సమాచారంపై సంతకం చేయడానికి అది ఉపయోగించే ప్రైవేట్ కీ.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

పబ్లిక్ డేటాలో సర్వీస్ ప్రొవైడర్ ఐడెంటిటీ ప్రొవైడర్ గురించి తెలుసుకోవలసిన ప్రతిదీ ఉంటుంది.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

ఇతర SAML భాగాలతో పరస్పర అనుసంధానతను ప్రారంభించడానికి, సర్వీస్ మరియు ఐడెంటిటీ ప్రొవైడర్‌లు తమ పబ్లిక్ డేటాను (మెటాడేటా అని పిలుస్తారు) ``/metadata``లో XML ఆకృతిలో అందుబాటులో ఉంచాలి.

```typescript
spRouter.post(`/assertion`,
```

ఇది తనను తాను గుర్తించుకోవడానికి బ్రౌజర్ యాక్సెస్ చేసే పేజీ. నిర్ధారణలో వినియోగదారు ఐడెంటిఫైయర్ (ఇక్కడ మనం ఇమెయిల్ చిరునామాను ఉపయోగిస్తాము) ఉంటుంది మరియు అదనపు లక్షణాలను చేర్చవచ్చు. ఇది పై సీక్వెన్స్ రేఖాచిత్రంలోని 7వ దశకు హ్యాండ్లర్.

```typescript
  async (req, res) => {
    // console.log(`SAML ప్రతిస్పందన:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

నిర్ధారణలో అందించబడిన XML డేటాను చూడటానికి మీరు కామెంట్ చేయబడిన కమాండ్‌ను ఉపయోగించవచ్చు. ఇది [బేస్64 ఎన్‌కోడ్](https://en.wikipedia.org/wiki/Base64) చేయబడింది.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

ఐడెంటిటీ సర్వర్ నుండి లాగిన్ అభ్యర్థనను పార్స్ చేయండి.

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

వినియోగదారుకు లాగిన్ అందిందని చూపించడానికి మాత్రమే HTML ప్రతిస్పందనను పంపండి.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

విఫలమైతే వినియోగదారుకు తెలియజేయండి.

```typescript
spRouter.get('/login',
```

బ్రౌజర్ ఈ పేజీని పొందడానికి ప్రయత్నించినప్పుడు లాగిన్ అభ్యర్థనను సృష్టించండి. ఇది పై సీక్వెన్స్ రేఖాచిత్రంలోని 1వ దశకు హ్యాండ్లర్.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

లాగిన్ అభ్యర్థనను పోస్ట్ చేయడానికి సమాచారాన్ని పొందండి.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

ఈ పేజీ ఫారమ్‌ను (క్రింద చూడండి) స్వయంచాలకంగా సమర్పిస్తుంది. ఈ విధంగా వినియోగదారు దారి మళ్లించబడటానికి ఏమీ చేయవలసిన అవసరం లేదు. ఇది పై సీక్వెన్స్ రేఖాచిత్రంలోని 2వ దశ.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

``loginRequest.entityEndpoint``కి (ఐడెంటిటీ ప్రొవైడర్ ఎండ్‌పాయింట్ యొక్క URL) పోస్ట్ చేయండి.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ఇన్‌పుట్ పేరు ``loginRequest.type`` (``SAMLRequest``). ఆ ఫీల్డ్ కంటెంట్ ``loginRequest.context``, ఇది మళ్లీ బేస్64 ఎన్‌కోడ్ చేయబడిన XML.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[ఈ మిడిల్‌వేర్](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP అభ్యర్థన](https://www.tutorialspoint.com/http/http_requests.htm) యొక్క బాడీని చదువుతుంది. అప్రమేయంగా ఎక్స్‌ప్రెస్ దీన్ని విస్మరిస్తుంది, ఎందుకంటే చాలా అభ్యర్థనలకు ఇది అవసరం లేదు. POST బాడీని ఉపయోగిస్తుంది కాబట్టి మనకు ఇది అవసరం.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

సర్వీస్ ప్రొవైడర్ డైరెక్టరీలో (``/sp``) రౌటర్‌ను మౌంట్ చేయండి.

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

బ్రౌజర్ రూట్ డైరెక్టరీని పొందడానికి ప్రయత్నిస్తే, దానికి లాగిన్ పేజీకి లింక్‌ను అందించండి.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

ఈ ఎక్స్‌ప్రెస్ అప్లికేషన్‌తో ``spPort``ని వినండి.

#### src/idp.mts {#srcidpmts}

ఇది ఐడెంటిటీ ప్రొవైడర్. ఇది సర్వీస్ ప్రొవైడర్‌కు చాలా పోలి ఉంటుంది, క్రింది వివరణలు భిన్నంగా ఉన్న భాగాల కోసం.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // లక్షణాలను భద్రపరచండి
    attributeNamePrefix: "@_", // లక్షణాల కోసం ఉపసర్గ
  }
)
```

సర్వీస్ ప్రొవైడర్ నుండి మనం స్వీకరించే XML అభ్యర్థనను మనం చదివి అర్థం చేసుకోవాలి.

```typescript
const getLoginPage = requestId => `
```

ఈ ఫంక్షన్ పై సీక్వెన్స్ రేఖాచిత్రంలోని 4వ దశలో తిరిగి ఇవ్వబడిన ఆటో-సబ్‌మిట్ చేయబడిన ఫారమ్‌తో పేజీని సృష్టిస్తుంది.

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

మనం సర్వీస్ ప్రొవైడర్‌కు పంపే రెండు ఫీల్డ్‌లు ఉన్నాయి:

1. మనం ప్రతిస్పందిస్తున్న ``requestId``.
2. వినియోగదారు ఐడెంటిఫైయర్ (ప్రస్తుతానికి వినియోగదారు అందించే ఇమెయిల్ చిరునామాను మనం ఉపయోగిస్తాము).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

ఇది పై సీక్వెన్స్ రేఖాచిత్రంలోని 5వ దశకు హ్యాండ్లర్. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) లాగిన్ ప్రతిస్పందనను సృష్టిస్తుంది. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

ఆడియన్స్ సర్వీస్ ప్రొవైడర్.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

అభ్యర్థన నుండి సంగ్రహించబడిన సమాచారం. అభ్యర్థనలో మనం పట్టించుకునే ఒక పరామితి requestId, ఇది సర్వీస్ ప్రొవైడర్‌ను అభ్యర్థనలు మరియు వాటి ప్రతిస్పందనలను సరిపోల్చడానికి అనుమతిస్తుంది.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // సంతకం చేయడాన్ని నిర్ధారించుకోండి
```

ప్రతిస్పందనపై సంతకం చేయడానికి డేటాను కలిగి ఉండటానికి మనకు ``signingKey`` అవసరం. సర్వీస్ ప్రొవైడర్ సంతకం చేయని అభ్యర్థనలను విశ్వసించదు.

```typescript
    },
    "post",
    {
      email: req.body.email
```

ఇది మనం సర్వీస్ ప్రొవైడర్‌కు తిరిగి పంపే వినియోగదారు సమాచారంతో ఉన్న ఫీల్డ్.

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

మళ్లీ, ఆటో-సబ్‌మిట్ చేయబడిన ఫారమ్‌ను ఉపయోగించండి. ఇది పై సీక్వెన్స్ రేఖాచిత్రంలోని 6వ దశ.

```typescript

// లాగిన్ అభ్యర్థనల కోసం IdP ఎండ్‌పాయింట్
idpRouter.post(`/login`,
```

ఇది సర్వీస్ ప్రొవైడర్ నుండి లాగిన్ అభ్యర్థనను స్వీకరించే ఎండ్‌పాయింట్. ఇది పై సీక్వెన్స్ రేఖాచిత్రంలోని 3వ దశకు హ్యాండ్లర్.

```typescript
  async (req, res) => {
    try {
      // parseLoginRequest పని చేయనందున ప్రత్యామ్నాయ పరిష్కారం.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

ప్రామాణీకరణ అభ్యర్థన యొక్క IDని చదవడానికి మనం [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144)ని ఉపయోగించగలగాలి. అయితే, నేను దాన్ని పని చేసేలా చేయలేకపోయాను మరియు దానిపై ఎక్కువ సమయం వెచ్చించడం విలువైనది కాదు కాబట్టి నేను కేవలం [సాధారణ-ప్రయోజన XML పార్సర్‌ను](https://www.npmjs.com/package/fast-xml-parser) ఉపయోగిస్తాను. మనకు అవసరమైన సమాచారం `<samlp:AuthnRequest>`` ట్యాగ్ లోపల ఉన్న ``ID`` లక్షణం, ఇది XML యొక్క అగ్ర స్థాయిలో ఉంటుంది.

## ఎథీరియం సంతకాలను ఉపయోగించడం {#using-ethereum-signatures}

ఇప్పుడు మనం సర్వీస్ ప్రొవైడర్‌కు వినియోగదారు గుర్తింపును పంపగలం కాబట్టి, తదుపరి దశ వినియోగదారు గుర్తింపును విశ్వసనీయ పద్ధతిలో పొందడం. వినియోగదారు చిరునామా కోసం వాలెట్‌ను అడగడానికి Viem మమ్మల్ని అనుమతిస్తుంది, కానీ దీని అర్థం సమాచారం కోసం బ్రౌజర్‌ను అడగడం. మనం బ్రౌజర్‌ను నియంత్రించము, కాబట్టి దాని నుండి వచ్చే ప్రతిస్పందనను మనం స్వయంచాలకంగా విశ్వసించలేము.

బదులుగా, IdP బ్రౌజర్‌కు సంతకం చేయడానికి ఒక స్ట్రింగ్‌ను పంపుతుంది. బ్రౌజర్‌లోని వాలెట్ ఈ స్ట్రింగ్‌పై సంతకం చేస్తే, అది నిజంగా ఆ చిరునామా అని అర్థం (అంటే, ఆ చిరునామాకు సంబంధించిన ప్రైవేట్ కీ దానికి తెలుసు).

దీన్ని ఆచరణలో చూడటానికి, ఇప్పటికే ఉన్న IdP మరియు SPని ఆపివేసి, ఈ కమాండ్‌లను రన్ చేయండి:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

తర్వాత [SPకి బ్రౌజ్ చేయండి](http://localhost:3000) మరియు సూచనలను అనుసరించండి.

ఈ సమయంలో ఎథీరియం చిరునామా నుండి ఇమెయిల్ చిరునామాను ఎలా పొందాలో మనకు తెలియదని గమనించండి, కాబట్టి దానికి బదులుగా మనం SPకి ``<ethereum address>@bad.email.address``ని నివేదిస్తాము.

### వివరణాత్మక వివరణ {#detailed-explanation-2}

మునుపటి రేఖాచిత్రంలోని 4-5 దశల్లో మార్పులు ఉన్నాయి.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

మనం మార్చిన ఏకైక ఫైల్ ``idp.mts``. మార్చబడిన భాగాలు ఇక్కడ ఉన్నాయి.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

మనకు ఈ రెండు అదనపు లైబ్రరీలు అవసరం. నాన్స్ విలువను సృష్టించడానికి మనం [`uuid`](https://www.npmjs.com/package/uuid)ని ఉపయోగిస్తాము. విలువ ముఖ్యం కాదు, అది ఒక్కసారి మాత్రమే ఉపయోగించబడుతుందనే వాస్తవం ముఖ్యం.

[`viem`](https://viem.sh/) లైబ్రరీ ఎథీరియం నిర్వచనాలను ఉపయోగించడానికి మమ్మల్ని అనుమతిస్తుంది. సంతకం నిజంగా చెల్లుబాటు అవుతుందని ధృవీకరించడానికి ఇక్కడ మనకు ఇది అవసరం.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

సందేశంపై సంతకం చేయడానికి వాలెట్ వినియోగదారుని అనుమతి అడుగుతుంది. కేవలం నాన్స్ మాత్రమే ఉన్న సందేశం వినియోగదారులను గందరగోళానికి గురి చేస్తుంది, కాబట్టి మనం ఈ ప్రాంప్ట్‌ను చేర్చుతాము.

```typescript
// requestIDలను ఇక్కడ ఉంచండి
let nonces = {}
```

అభ్యర్థనకు ప్రతిస్పందించడానికి మనకు అభ్యర్థన సమాచారం అవసరం. మనం దాన్ని అభ్యర్థనతో (దశ 4) పంపవచ్చు మరియు దాన్ని తిరిగి స్వీకరించవచ్చు (దశ 5). అయితే, బ్రౌజర్ నుండి మనకు లభించే సమాచారాన్ని మనం విశ్వసించలేము, ఇది హానికరమైన వినియోగదారు నియంత్రణలో ఉండవచ్చు. కాబట్టి నాన్స్‌ను కీగా ఉంచి, దాన్ని ఇక్కడే నిల్వ చేయడం మంచిది.

సరళత కోసం మనం దీన్ని ఇక్కడ వేరియబుల్‌గా చేస్తున్నామని గమనించండి. అయితే, దీనికి అనేక ప్రతికూలతలు ఉన్నాయి:

- మనం డినైయల్ ఆఫ్ సర్వీస్ దాడికి గురయ్యే ప్రమాదం ఉంది. హానికరమైన వినియోగదారు మన మెమరీని నింపుతూ, బహుళ సార్లు లాగిన్ అవ్వడానికి ప్రయత్నించవచ్చు.
- IdP ప్రాసెస్‌ను పునఃప్రారంభించవలసి వస్తే, మనం ఇప్పటికే ఉన్న విలువలను కోల్పోతాము.
- మనం బహుళ ప్రాసెస్‌లలో లోడ్ బ్యాలెన్స్ చేయలేము, ఎందుకంటే ప్రతిదానికీ దాని స్వంత వేరియబుల్ ఉంటుంది.

ప్రొడక్షన్ సిస్టమ్‌లో మనం డేటాబేస్‌ను ఉపయోగిస్తాము మరియు ఒక రకమైన గడువు ముగింపు యంత్రాంగాన్ని అమలు చేస్తాము.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

నాన్స్‌ను సృష్టించండి మరియు భవిష్యత్తు ఉపయోగం కోసం ``requestId``ని నిల్వ చేయండి.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

పేజీ లోడ్ అయినప్పుడు ఈ JavaScript స్వయంచాలకంగా అమలు చేయబడుతుంది.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

మనకు ``viem`` నుండి అనేక ఫంక్షన్లు అవసరం.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

బ్రౌజర్‌లో వాలెట్ ఉంటే మాత్రమే మనం పని చేయగలం.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

వాలెట్ నుండి ఖాతాల జాబితాను అభ్యర్థించండి (``window.ethereum``). కనీసం ఒకటి ఉందని ఊహించండి మరియు మొదటిదాన్ని మాత్రమే నిల్వ చేయండి. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

బ్రౌజర్ వాలెట్‌తో ఇంటరాక్ట్ అవ్వడానికి [వాలెట్ క్లయింట్‌ను](https://viem.sh/docs/clients/wallet) సృష్టించండి.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

సందేశంపై సంతకం చేయమని వినియోగదారుని అడగండి. ఈ మొత్తం HTML [టెంప్లేట్ స్ట్రింగ్‌లో](https://viem.sh/docs/clients/wallet) ఉన్నందున, మనం idp ప్రాసెస్‌లో నిర్వచించిన వేరియబుల్స్‌ను ఉపయోగించవచ్చు. ఇది సీక్వెన్స్ రేఖాచిత్రంలోని 4.5వ దశ.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

``/idp/signature/<nonce>/<address>/<signature>``కి దారి మళ్లించండి. ఇది సీక్వెన్స్ రేఖాచిత్రంలోని 5వ దశ.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

సంతకం బ్రౌజర్ ద్వారా తిరిగి పంపబడుతుంది, ఇది హానికరమైనది కావచ్చు (బ్రౌజర్‌లో కేవలం ``http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature``ని తెరవకుండా మిమ్మల్ని ఆపడానికి ఏమీ లేదు). కాబట్టి, IdP ప్రాసెస్ చెడ్డ సంతకాలను సరిగ్గా నిర్వహిస్తుందో లేదో ధృవీకరించడం ముఖ్యం.

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

మిగిలినది కేవలం ప్రామాణిక HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

ఇది సీక్వెన్స్ రేఖాచిత్రంలోని 5వ దశకు హ్యాండ్లర్.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

అభ్యర్థన IDని పొందండి మరియు దాన్ని మళ్లీ ఉపయోగించలేమని నిర్ధారించుకోవడానికి ``nonces`` నుండి నాన్స్‌ను తొలగించండి.

```typescript
  try {
```

సంతకం చెల్లనిది కావడానికి అనేక మార్గాలు ఉన్నందున, విసిరిన ఏవైనా లోపాలను పట్టుకోవడానికి మనం దీన్ని ``try ... catch`` బ్లాక్‌లో చుడతాము.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

సీక్వెన్స్ రేఖాచిత్రంలో 5.5వ దశను అమలు చేయడానికి [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage)ని ఉపయోగించండి.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

ఒక చిన్న మార్పు మినహా, మిగిలిన హ్యాండ్లర్ మనం గతంలో ``/loginSubmitted`` హ్యాండ్లర్‌లో చేసిన దానికి సమానం.

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

మన వద్ద అసలు ఇమెయిల్ చిరునామా లేదు (మనం దాన్ని తదుపరి విభాగంలో పొందుతాము), కాబట్టి ప్రస్తుతానికి మనం ఎథీరియం చిరునామాను తిరిగి ఇస్తాము మరియు దాన్ని ఇమెయిల్ చిరునామా కాదని స్పష్టంగా గుర్తిస్తాము.


```typescript
// లాగిన్ అభ్యర్థనల కోసం IdP ఎండ్‌పాయింట్
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // parseLoginRequest పని చేయనందున ప్రత్యామ్నాయ పరిష్కారం.
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

``getLoginPage``కి బదులుగా, ఇప్పుడు 3వ దశ హ్యాండ్లర్‌లో ``getSignaturePage``ని ఉపయోగించండి.

## ఇమెయిల్ చిరునామాను పొందడం {#getting-the-email-address}

తదుపరి దశ ఇమెయిల్ చిరునామాను పొందడం, ఇది సర్వీస్ ప్రొవైడర్ అభ్యర్థించిన ఐడెంటిఫైయర్. అలా చేయడానికి, మనం [ఎథీరియం అటెస్టేషన్ సర్వీస్ (EAS)](https://attest.org/)ని ఉపయోగిస్తాము.

ధృవీకరణలను పొందడానికి సులభమైన మార్గం [GraphQL API](https://docs.attest.org/docs/developer-tools/api)ని ఉపయోగించడం. మనం ఈ క్వెరీని ఉపయోగిస్తాము:

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

ఈ [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) కేవలం ఇమెయిల్ చిరునామాను మాత్రమే కలిగి ఉంటుంది. ఈ క్వెరీ ఈ స్కీమా యొక్క ధృవీకరణలను అడుగుతుంది. ధృవీకరణ యొక్క సబ్జెక్ట్‌ను `recipient`` అని పిలుస్తారు. ఇది ఎల్లప్పుడూ ఎథీరియం చిరునామా.

హెచ్చరిక: మనం ఇక్కడ ధృవీకరణలను పొందుతున్న విధానంలో రెండు భద్రతా సమస్యలు ఉన్నాయి.

- మనం API ఎండ్‌పాయింట్, ``https://optimism.easscan.org/graphql``కి వెళ్తున్నాము, ఇది ఒక కేంద్రీకృత భాగం. మనం ``id`` లక్షణాన్ని పొందవచ్చు మరియు ధృవీకరణ నిజమైనదని ధృవీకరించడానికి ఆన్‌చైన్ లుకప్ చేయవచ్చు, కానీ API ఎండ్‌పాయింట్ వాటి గురించి మనకు చెప్పకుండా ధృవీకరణలను సెన్సార్ చేయగలదు. 

  ఈ సమస్యను పరిష్కరించడం అసాధ్యం కాదు, మనం మన స్వంత GraphQL ఎండ్‌పాయింట్‌ను రన్ చేయవచ్చు మరియు చైన్ లాగ్‌ల నుండి ధృవీకరణలను పొందవచ్చు, కానీ అది మన ప్రయోజనాలకు మించినది.

- మనం అటెస్టర్ గుర్తింపును చూడము. ఎవరైనా మనకు తప్పుడు సమాచారాన్ని అందించవచ్చు. వాస్తవ ప్రపంచ అమలులో మనం విశ్వసనీయ అటెస్టర్ల సమితిని కలిగి ఉంటాము మరియు వారి ధృవీకరణలను మాత్రమే చూస్తాము.

దీన్ని ఆచరణలో చూడటానికి, ఇప్పటికే ఉన్న IdP మరియు SPని ఆపివేసి, ఈ కమాండ్‌లను రన్ చేయండి:

```sh
git checkout email-address
pnpm install
pnpm start
```

తర్వాత మీ ఇమెయిల్ చిరునామాను అందించండి. అలా చేయడానికి మీకు రెండు మార్గాలు ఉన్నాయి:

- ప్రైవేట్ కీని ఉపయోగించి వాలెట్‌ను దిగుమతి చేయండి మరియు టెస్టింగ్ ప్రైవేట్ కీ ``0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80``ని ఉపయోగించండి.

- మీ స్వంత ఇమెయిల్ చిరునామా కోసం ధృవీకరణను జోడించండి:

  1. [అటెస్టేషన్ ఎక్స్‌ప్లోరర్‌లోని స్కీమాకు](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) బ్రౌజ్ చేయండి.

  2. **స్కీమాతో ధృవీకరించు (Attest with Schema)** క్లిక్ చేయండి.

  3. మీ ఎథీరియం చిరునామాను స్వీకర్తగా, మీ ఇమెయిల్ చిరునామాను ఇమెయిల్ చిరునామాగా నమోదు చేయండి మరియు **ఆన్‌చైన్ (Onchain)** ఎంచుకోండి. ఆపై **ధృవీకరణ చేయి (Make Attestation)** క్లిక్ చేయండి.

  4. మీ వాలెట్‌లో లావాదేవీని ఆమోదించండి. గ్యాస్ చెల్లించడానికి మీకు [Optimism బ్లాక్‌చైన్‌లో](https://app.optimism.io/bridge/deposit) కొంత ETH అవసరం.

ఏదైనా సరే, మీరు దీన్ని చేసిన తర్వాత [http://localhost:3000](http://localhost:3000)కి బ్రౌజ్ చేయండి మరియు సూచనలను అనుసరించండి. మీరు టెస్టింగ్ ప్రైవేట్ కీని దిగుమతి చేసుకుంటే, మీరు స్వీకరించే ఇమెయిల్ ``test_addr_0@example.com``. మీరు మీ స్వంత చిరునామాను ఉపయోగిస్తే, అది మీరు ధృవీకరించినది ఏదైనా అయి ఉండాలి.

### వివరణాత్మక వివరణ {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

కొత్త దశలు GraphQL కమ్యూనికేషన్, దశలు 5.6 మరియు 5.7.

మళ్లీ, ``idp.mts`` యొక్క మార్చబడిన భాగాలు ఇక్కడ ఉన్నాయి.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

మనకు అవసరమైన లైబ్రరీలను దిగుమతి చేయండి.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

[ప్రతి బ్లాక్‌చైన్‌కు ప్రత్యేక ఎండ్‌పాయింట్](https://docs.attest.org/docs/developer-tools/api) ఉంటుంది.

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

ఎండ్‌పాయింట్‌ను క్వెరీ చేయడానికి మనం ఉపయోగించగల కొత్త ``GraphQLClient`` క్లయింట్‌ను సృష్టించండి.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL మనకు బైట్‌లతో కూడిన అపారదర్శక డేటా ఆబ్జెక్ట్‌ను మాత్రమే ఇస్తుంది. దాన్ని అర్థం చేసుకోవడానికి మనకు స్కీమా అవసరం. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

ఎథీరియం చిరునామా నుండి ఇమెయిల్ చిరునామాను పొందడానికి ఒక ఫంక్షన్.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

ఇది ఒక GraphQL క్వెరీ.

```typescript
      attestations(
```

మనం ధృవీకరణల కోసం వెతుకుతున్నాము.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

మనకు కావలసిన ధృవీకరణలు మన స్కీమాలో ఉన్నవి, ఇక్కడ స్వీకర్త ``getAddress(ethAddr)``. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) ఫంక్షన్ మన చిరునామా సరైన [చెక్‌సమ్‌ను](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) కలిగి ఉందని నిర్ధారిస్తుంది. GraphQL కేస్-సెన్సిటివ్ కాబట్టి ఇది అవసరం. "0xBAD060A7", "0xBad060A7" మరియు "0xbad060a7" వేర్వేరు విలువలు.

```typescript
        take: 1
```

మనం ఎన్ని ధృవీకరణలను కనుగొన్నప్పటికీ, మనకు మొదటిది మాత్రమే కావాలి.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

మనం స్వీకరించాలనుకుంటున్న ఫీల్డ్‌లు.

- ``attester``: ధృవీకరణను సమర్పించిన చిరునామా. సాధారణంగా ధృవీకరణను విశ్వసించాలా వద్దా అని నిర్ణయించడానికి ఇది ఉపయోగించబడుతుంది.
- ``id``: ధృవీకరణ ID. GraphQL క్వెరీ నుండి వచ్చిన సమాచారం సరైనదని ధృవీకరించడానికి [ఆన్‌చైన్‌లో ధృవీకరణను చదవడానికి](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) మీరు ఈ విలువను ఉపయోగించవచ్చు.
- ``data``: స్కీమా డేటా (ఈ సందర్భంలో, ఇమెయిల్ చిరునామా).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

ధృవీకరణ లేకపోతే, స్పష్టంగా తప్పు అయిన విలువను తిరిగి ఇవ్వండి, కానీ అది సర్వీస్ ప్రొవైడర్‌కు చెల్లుబాటు అయ్యేదిగా కనిపిస్తుంది.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

విలువ ఉంటే, డేటాను డీకోడ్ చేయడానికి ``decodeData``ని ఉపయోగించండి. అది అందించే మెటాడేటా మనకు అవసరం లేదు, కేవలం విలువ మాత్రమే కావాలి.

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

ఇమెయిల్ చిరునామాను పొందడానికి కొత్త ఫంక్షన్‌ను ఉపయోగించండి.

## వికేంద్రీకరణ గురించి ఏమిటి? {#what-about-decentralization}

ఈ కాన్ఫిగరేషన్‌లో, ఎథీరియం నుండి ఇమెయిల్ చిరునామా మ్యాపింగ్ కోసం మనం నమ్మదగిన అటెస్టర్లపై ఆధారపడినంత కాలం, వినియోగదారులు తాము కాని వారిలా నటించలేరు. అయితే, మన ఐడెంటిటీ ప్రొవైడర్ ఇప్పటికీ ఒక కేంద్రీకృత భాగం. ఐడెంటిటీ ప్రొవైడర్ యొక్క ప్రైవేట్ కీ ఎవరి వద్ద ఉంటే వారు సర్వీస్ ప్రొవైడర్‌కు తప్పుడు సమాచారాన్ని పంపగలరు.

[మల్టీ-పార్టీ కంప్యూటేషన్ (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ఉపయోగించి ఒక పరిష్కారం ఉండవచ్చు. భవిష్యత్తు ట్యుటోరియల్‌లో దీని గురించి వ్రాయాలని నేను ఆశిస్తున్నాను.

## ముగింపు {#conclusion}

ఎథీరియం సంతకాల వంటి లాగ్ ఆన్ ప్రమాణాన్ని స్వీకరించడం కోడి మరియు గుడ్డు సమస్యను ఎదుర్కొంటుంది. సర్వీస్ ప్రొవైడర్లు సాధ్యమైనంత విస్తృతమైన మార్కెట్‌ను ఆకర్షించాలనుకుంటున్నారు. వినియోగదారులు తమ లాగ్ ఆన్ ప్రమాణానికి మద్దతు ఇవ్వడం గురించి ఆందోళన చెందకుండా సేవలను యాక్సెస్ చేయగలగాలి అని కోరుకుంటారు.
ఎథీరియం IdP వంటి ఎడాప్టర్‌లను సృష్టించడం ఈ అడ్డంకిని అధిగమించడానికి మనకు సహాయపడుతుంది.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).