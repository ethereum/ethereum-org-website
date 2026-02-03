---
title: "web2 ప్రమాణీకరణ కోసం ఇతీరియమును ఉపయోగించడం"
description: "ఈ ట్యుటోరియల్ చదివిన తర్వాత, ఒక డెవలపర్ ఇతీరియము లాగిన్ (web3)ను SAML లాగిన్‌తో ఇంటిగ్రేట్ చేయగలరు, ఇది web2లో సింగిల్ సైన్-ఆన్ మరియు ఇతర సంబంధిత సేవలను అందించడానికి ఉపయోగించే ఒక ప్రామాణికం. ఇది ఇతీరియము సంతకాల ద్వారా web2 వనరులకు ప్రామాణీకరణను అనుమతిస్తుంది, వినియోగదారు గుణాలు ధృవీకరణల నుండి వస్తాయి."
author: "ఓరి పోమెరాంట్జ్"
tags: [ "web2", "ప్రమాణీకరణ", "eas" ]
skill: "ఆరంభకులు"
lang: te
published: 2025-04-30
---

## పరిచయం

[SAML](https://www.onelogin.com/learn/saml) అనేది web2లో ఉపయోగించే ఒక ప్రామాణికం, ఇది [గుర్తింపు ప్రదాత (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider)కి [సేవా ప్రదాతల (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) కోసం వినియోగదారుడి సమాచారాన్ని అందించడానికి అనుమతిస్తుంది.

ఈ ట్యుటోరియల్‌లో మీరు ఇతీరియమును ఇంకా స్థానికంగా సపోర్ట్ చేయని web2 సేవలకు తమను తాము ప్రామాణీకరించుకోవడానికి వినియోగదారులను వారి ఇతీరియము వాలెట్‌లను ఉపయోగించడానికి అనుమతించడానికి, ఇతీరియము సంతకాలను SAMLతో ఎలా ఇంటిగ్రేట్ చేయాలో నేర్చుకుంటారు.

ఈ ట్యుటోరియల్ ఇద్దరు వేర్వేరు ప్రేక్షకుల కోసం వ్రాయబడిందని గమనించండి:

- ఇతీరియమును అర్థం చేసుకుని, SAML నేర్చుకోవాల్సిన ఇతీరియము వ్యక్తులు
- SAML మరియు web2 ప్రామాణీకరణను అర్థం చేసుకుని, ఇతీరియము నేర్చుకోవాల్సిన Web2 వ్యక్తులు

ఫలితంగా, ఇది మీకు ఇప్పటికే తెలిసిన చాలా పరిచయ విషయాలను కలిగి ఉండబోతోంది. దాన్ని దాటవేయడానికి సంకోచించకండి.

### ఇతీరియము వ్యక్తుల కోసం SAML

SAML ఒక కేంద్రీకృత ప్రోటోకాల్. ఒక సేవా ప్రదాత (SP) ఒక గుర్తింపు ప్రదాత (IdP) నుండి వాదనలను (ఉదాహరణకు "ఇది నా వినియోగదారుడు జాన్, అతనికి A, B, మరియు C చేయడానికి అనుమతులు ఉండాలి") అంగీకరించాలంటే, దానితో గానీ, లేదా ఆ IdP యొక్క సర్టిఫికేట్‌పై సంతకం చేసిన [సర్టిఫికేట్ అథారిటీ](https://www.ssl.com/article/what-is-a-certificate-authority-ca/)తో గానీ ముందుగా ఉన్న విశ్వాస సంబంధం ఉండాలి.

ఉదాహరణకు, SP కంపెనీలకు ప్రయాణ సేవలను అందించే ఒక ప్రయాణ ఏజెన్సీ కావచ్చు, మరియు IdP ఒక కంపెనీ యొక్క అంతర్గత వెబ్ సైట్ కావచ్చు. ఉద్యోగులు వ్యాపార ప్రయాణాన్ని బుక్ చేసుకోవాల్సిన అవసరం వచ్చినప్పుడు, ప్రయాణ ఏజెన్సీ వాస్తవానికి ప్రయాణాన్ని బుక్ చేసుకోనివ్వడానికి ముందు కంపెనీ ద్వారా ప్రామాణీకరణ కోసం వారిని పంపుతుంది.

![దశలవారీగా SAML ప్రక్రియ](./fig-01-saml.png)

యాక్సెస్ కోసం బ్రౌజర్, SP, మరియు IdP అనే మూడు సంస్థలు ఈ విధంగా చర్చలు జరుపుతాయి. SPకి ముందుగా బ్రౌజర్‌ని ఉపయోగించే వినియోగదారుడి గురించి ఏమీ తెలియాల్సిన అవసరం లేదు, కేవలం IdPని విశ్వసిస్తే చాలు.

### SAML వ్యక్తుల కోసం ఇతీరియము

ఇతీరియము ఒక వికేంద్రీకృత వ్యవస్థ.

![ఇతీరియము లాగాన్](./fig-02-eth-logon.png)

వినియోగదారులు ఒక ప్రైవేట్ కీని కలిగి ఉంటారు (సాధారణంగా బ్రౌజర్ పొడిగింపులో ఉంచబడుతుంది). ప్రైవేట్ కీ నుండి మీరు పబ్లిక్ కీని, మరియు దాని నుండి 20-బైట్ చిరునామాను పొందవచ్చు. వినియోగదారులు ఒక సిస్టమ్‌లోకి లాగ్ ఇన్ చేయాల్సిన అవసరం వచ్చినప్పుడు, వారు ఒక నాన్స్ (ఒకే-వినియోగ విలువ)తో ఒక సందేశంపై సంతకం చేయమని అభ్యర్థించబడతారు. ఆ చిరునామా ద్వారా సంతకం సృష్టించబడిందని సర్వర్ ధృవీకరించగలదు.

![ధృవీకరణల నుండి అదనపు డేటాను పొందడం](./fig-03-eas-data.png)

సంతకం కేవలం ఇతీరియము చిరునామాను మాత్రమే ధృవీకరిస్తుంది. ఇతర వినియోగదారు గుణాలను పొందడానికి, మీరు సాధారణంగా [ధృవీకరణలు](https://attest.org/) ఉపయోగిస్తారు. ఒక ధృవీకరణలో సాధారణంగా ఈ ఫీల్డ్‌లు ఉంటాయి:

- **ధృవీకర్త**, ధృవీకరణ చేసిన చిరునామా
- **గ్రహీత**, ధృవీకరణ వర్తించే చిరునామా
- **డేటా**, పేరు, అనుమతులు మొదలైన ధృవీకరించబడుతున్న డేటా.
- **స్కీమా**, డేటాను అర్థం చేసుకోవడానికి ఉపయోగించే స్కీమా యొక్క ID.

ఇతీరియము యొక్క వికేంద్రీకృత స్వభావం కారణంగా, ఏ వినియోగదారుడైనా ధృవీకరణలు చేయవచ్చు. మేము ఏ ధృవీకరణలను నమ్మదగినవిగా పరిగణిస్తామో గుర్తించడానికి ధృవీకర్త యొక్క గుర్తింపు ముఖ్యం.

## సెటప్

మొదటి దశ SAML SP మరియు SAML IdP తమ మధ్య సంభాషించుకోవడం.

1. సాఫ్ట్‌వేర్‌ను డౌన్‌లోడ్ చేయండి. ఈ వ్యాసం కోసం నమూనా సాఫ్ట్‌వేర్ [githubలో ఉంది](https://github.com/qbzzt/250420-saml-ethereum). వివిధ దశలు వివిధ బ్రాంచ్‌లలో నిల్వ చేయబడతాయి, ఈ దశ కోసం మీకు `saml-only` కావాలి

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. స్వీయ-సంతకం చేసిన సర్టిఫికేట్‌లతో కీలను సృష్టించండి. అంటే కీ దాని స్వంత సర్టిఫికేట్ అథారిటీ, మరియు దానిని సేవా ప్రదాతకు మాన్యువల్‌గా దిగుమతి చేసుకోవాలి. మరింత సమాచారం కోసం [OpenSSL డాక్స్](https://docs.openssl.org/master/man1/openssl-req/) చూడండి.

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

4. URL [http://localhost:3000/](http://localhost:3000/) వద్ద SPకి బ్రౌజ్ చేసి, IdP (పోర్ట్ 3001)కి మళ్ళించబడటానికి బటన్‌ను క్లిక్ చేయండి.

5. IdPకి మీ ఇమెయిల్ చిరునామాను అందించి, **సేవా ప్రదాతకు లాగిన్ చేయండి** క్లిక్ చేయండి. మీరు తిరిగి సేవా ప్రదాతకు (పోర్ట్ 3000) మళ్ళించబడటాన్ని మరియు అది మీ ఇమెయిల్ చిరునామా ద్వారా మిమ్మల్ని గుర్తించడాన్ని చూడండి.

### వివరణాత్మక వివరణ

దశలవారీగా ఇది జరుగుతుంది:

![ఇతీరియము లేకుండా సాధారణ SAML లాగాన్](./fig-04-saml-no-eth.png)

#### src/config.mts

ఈ ఫైల్ గుర్తింపు ప్రదాత మరియు సేవా ప్రదాత రెండింటికీ కాన్ఫిగరేషన్‌ను కలిగి ఉంది. సాధారణంగా ఈ రెండూ వివిధ సంస్థలుగా ఉంటాయి, కానీ ఇక్కడ మనం సరళత కోసం కోడ్‌ను పంచుకోవచ్చు.

```typescript
const fs = await import("fs")

const protocol="http"
```

ఇప్పుడైతే మనం కేవలం పరీక్షిస్తున్నాం, కాబట్టి HTTP ఉపయోగించడం పర్వాలేదు.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

పబ్లిక్ కీలను చదవండి, ఇవి సాధారణంగా రెండు కాంపోనెంట్‌లకు అందుబాటులో ఉంటాయి (మరియు నేరుగా విశ్వసించబడతాయి, లేదా విశ్వసనీయ సర్టిఫికేట్ అథారిటీ ద్వారా సంతకం చేయబడతాయి).

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

రెండు కాంపోనెంట్‌ల కోసం URLలు.

```typescript
export const spPublicData = {
```

సేవా ప్రదాత కోసం పబ్లిక్ డేటా.

```typescript
    entityID: `${spUrl}/metadata`,
```

సంప్రదాయం ప్రకారం, SAMLలో `entityID` అనేది సంస్థ యొక్క మెటాడేటా అందుబాటులో ఉండే URL. ఈ మెటాడేటా ఇక్కడ ఉన్న పబ్లిక్ డేటాకు అనుగుణంగా ఉంటుంది, అయితే ఇది XML రూపంలో ఉంటుంది.

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

మన ప్రయోజనాల కోసం అత్యంత ముఖ్యమైన నిర్వచనం `assertionConsumerServer`. అంటే సేవా ప్రదాతకు ఏదైనా చెప్పడానికి (ఉదాహరణకు, "మీకు ఈ సమాచారం పంపిన వినియోగదారుడు somebody@example.com") మనం [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp)ని URL `http://localhost:3000/sp/assertion`కు ఉపయోగించాలి.

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

గుర్తింపు ప్రదాత కోసం పబ్లిక్ డేటా ఇలాంటిదే. ఒక వినియోగదారుడిని లాగ్ ఇన్ చేయడానికి మీరు `http://localhost:3001/idp/login`కు POST చేయాలని మరియు ఒక వినియోగదారుడిని లాగ్ అవుట్ చేయడానికి మీరు `http://localhost:3001/idp/logout`కు POST చేయాలని ఇది నిర్దేశిస్తుంది.

#### src/sp.mts

ఇది సేవా ప్రదాతను అమలు చేసే కోడ్.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

SAMLని అమలు చేయడానికి మేము [`samlify`](https://www.npmjs.com/package/samlify) లైబ్రరీని ఉపయోగిస్తాము.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

XML సరైనదని, ఊహించిన పబ్లిక్ కీతో సంతకం చేయబడిందని మొదలైనవాటిని ధృవీకరించడానికి `samlify` లైబ్రరీ ఒక ప్యాకేజీని కలిగి ఉండాలని ఆశిస్తుంది. ఈ ప్రయోజనం కోసం మేము [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint)ని ఉపయోగిస్తాము.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

ఒక [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) అనేది ఒక వెబ్ సైట్‌లో మౌంట్ చేయగల "మినీ వెబ్ సైట్". ఈ సందర్భంలో, మేము అన్ని సేవా ప్రదాత నిర్వచనాలను ఒకచోట చేర్చడానికి దీనిని ఉపయోగిస్తాము.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

సేవా ప్రదాత యొక్క స్వీయ ప్రాతినిధ్యం అనేది మొత్తం పబ్లిక్ డేటా, మరియు సమాచారాన్ని సంతకం చేయడానికి అది ఉపయోగించే ప్రైవేట్ కీ.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

పబ్లిక్ డేటాలో సేవా ప్రదాతకు గుర్తింపు ప్రదాత గురించి తెలియవలసినవన్నీ ఉంటాయి.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

ఇతర SAML కాంపోనెంట్‌లతో పరస్పర చర్యను ప్రారంభించడానికి, సేవ మరియు గుర్తింపు ప్రదాతలు వారి పబ్లిక్ డేటాను (మెటాడేటా అని పిలుస్తారు) `/metadata`లో XML ఫార్మాట్‌లో అందుబాటులో ఉంచాలి.

```typescript
spRouter.post(`/assertion`,
```

ఇది బ్రౌజర్ తనను తాను గుర్తించుకోవడానికి యాక్సెస్ చేసే పేజీ. ఈ వాదనలో వినియోగదారు గుర్తింపు (ఇక్కడ మనం ఇమెయిల్ చిరునామాను ఉపయోగిస్తాము) ఉంటుంది, మరియు అదనపు గుణాలను కూడా కలిగి ఉండవచ్చు. ఇది పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 7వ దశకు హ్యాండ్లర్.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

వాదనలో అందించిన XML డేటాను చూడటానికి మీరు వ్యాఖ్యానించిన ఆదేశాన్ని ఉపయోగించవచ్చు. ఇది [బేస్64 ఎన్‌కోడ్](https://en.wikipedia.org/wiki/Base64) చేయబడింది.

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

గుర్తింపు సర్వర్ నుండి లాగిన్ అభ్యర్థనను విశ్లేషించండి.

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

వినియోగదారుడికి మేము లాగిన్ పొందామని చూపించడానికి, ఒక HTML ప్రతిస్పందనను పంపండి.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

వైఫల్యం సంభవించినప్పుడు వినియోగదారుడికి తెలియజేయండి.

```typescript
spRouter.get('/login',
```

బ్రౌజర్ ఈ పేజీని పొందడానికి ప్రయత్నించినప్పుడు ఒక లాగిన్ అభ్యర్థనను సృష్టించండి. ఇది పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 1వ దశకు హ్యాండ్లర్.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

ఒక లాగిన్ అభ్యర్థనను పోస్ట్ చేయడానికి సమాచారం పొందండి.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

ఈ పేజీ ఫారమ్‌ను (క్రింద చూడండి) స్వయంచాలకంగా సమర్పిస్తుంది. ఈ విధంగా వినియోగదారుడు మళ్ళించబడటానికి ఏమీ చేయనవసరం లేదు. ఇది పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 2వ దశ.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

`loginRequest.entityEndpoint` (గుర్తింపు ప్రదాత ఎండ్‌పాయింట్ యొక్క URL)కి పోస్ట్ చేయండి.

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

ఇన్‌పుట్ పేరు `loginRequest.type` (`SAMLRequest`). ఆ ఫీల్డ్ కోసం కంటెంట్ `loginRequest.context`, ఇది మళ్ళీ బేస్64 ఎన్‌కోడ్ చేయబడిన XML.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[ఈ మిడిల్‌వేర్](https://expressjs.com/en/5x/api.html#express.urlencoded) [HTTP అభ్యర్థన](https://www.tutorialspoint.com/http/http_requests.htm) యొక్క బాడీని చదువుతుంది. డిఫాల్ట్‌గా ఎక్స్‌ప్రెస్ దానిని పట్టించుకోదు, ఎందుకంటే చాలా అభ్యర్థనలకు అది అవసరం లేదు. POST బాడీని ఉపయోగిస్తుంది కాబట్టి మాకు అది అవసరం.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

సేవా ప్రదాత డైరెక్టరీ (`/sp`)లో రౌటర్‌ను మౌంట్ చేయండి.

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

ఒక బ్రౌజర్ రూట్ డైరెక్టరీని పొందడానికి ప్రయత్నిస్తే, దానికి లాగిన్ పేజీకి ఒక లింక్‌ను అందించండి.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

ఈ ఎక్స్‌ప్రెస్ అప్లికేషన్‌తో `spPort`కి వినండి.

#### src/idp.mts

ఇది గుర్తింపు ప్రదాత. ఇది సేవా ప్రదాతకు చాలా ఇలాంటిది, దిగువ వివరణలు వివిధ భాగాల కోసం.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

సేవా ప్రదాత నుండి మేము స్వీకరించే XML అభ్యర్థనను మేము చదివి అర్థం చేసుకోవాలి.

```typescript
const getLoginPage = requestId => `
```

ఈ ఫంక్షన్ పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 4వ దశలో తిరిగి ఇవ్వబడిన స్వీయ-సమర్పిత ఫారమ్‌తో పేజీని సృష్టిస్తుంది.

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

మేము సేవా ప్రదాతకు పంపే రెండు ఫీల్డ్‌లు ఉన్నాయి:

1. మేము ప్రతిస్పందిస్తున్న `requestId`.
2. వినియోగదారు గుర్తింపు (మేము ఇప్పటికి వినియోగదారుడు అందించిన ఇమెయిల్ చిరునామాను ఉపయోగిస్తాము).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

ఇది పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 5వ దశకు హ్యాండ్లర్. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) లాగిన్ ప్రతిస్పందనను సృష్టిస్తుంది.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

ప్రేక్షకులు సేవా ప్రదాత.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

అభ్యర్థన నుండి సంగ్రహించిన సమాచారం. అభ్యర్థనలో మనకు ఆసక్తి ఉన్న ఒకే ఒక పరామితి requestId, ఇది సేవా ప్రదాతకు అభ్యర్థనలను మరియు వాటి ప్రతిస్పందనలను సరిపోల్చడానికి అనుమతిస్తుంది.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

ప్రతిస్పందనను సంతకం చేయడానికి డేటాను కలిగి ఉండటానికి మాకు `signingKey` అవసరం. సేవా ప్రదాత సంతకం చేయని అభ్యర్థనలను విశ్వసించడు.

```typescript
    },
    "post",
    {
      email: req.body.email
```

ఇది మేము సేవా ప్రదాతకు తిరిగి పంపే వినియోగదారు సమాచారంతో ఉన్న ఫీల్డ్.

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

మళ్ళీ, ఒక స్వీయ-సమర్పిత ఫారమ్‌ను ఉపయోగించండి. ఇది పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 6వ దశ.

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

ఇది సేవా ప్రదాత నుండి లాగిన్ అభ్యర్థనను స్వీకరించే ఎండ్‌పాయింట్. ఇది పైన ఉన్న సీక్వెన్స్ రేఖాచిత్రంలో 3వ దశకు హ్యాండ్లర్.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

మేము [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144)ని ఉపయోగించి ప్రామాణీకరణ అభ్యర్థన యొక్క IDని చదవగలగాలి. అయితే, నేను దానిని పని చేసేలా చేయలేకపోయాను మరియు దానిపై ఎక్కువ సమయం వెచ్చించడం విలువైనది కాదు కాబట్టి నేను కేవలం ఒక [సాధారణ-ప్రయోజన XML పార్సర్](https://www.npmjs.com/package/fast-xml-parser)ని ఉపయోగిస్తాను. మాకు కావలసిన సమాచారం `<samlp:AuthnRequest>` ట్యాగ్‌లోని `ID` గుణం, ఇది XML యొక్క అత్యున్నత స్థాయిలో ఉంటుంది.

## ఇతీరియము సంతకాలను ఉపయోగించడం

ఇప్పుడు మనం సేవా ప్రదాతకు ఒక వినియోగదారు గుర్తింపును పంపగలుగుతున్నాం కాబట్టి, తదుపరి దశ వినియోగదారు గుర్తింపును విశ్వసనీయ పద్ధతిలో పొందడం. Viem మనకు వినియోగదారు చిరునామా కోసం వాలెట్‌ను అడగడానికి అనుమతిస్తుంది, కానీ దీని అర్థం బ్రౌజర్ నుండి సమాచారం అడగడం. మేము బ్రౌజర్‌ను నియంత్రించలేము, కాబట్టి దాని నుండి మనకు లభించే ప్రతిస్పందనను మనం స్వయంచాలకంగా విశ్వసించలేము.

బదులుగా, IdP బ్రౌజర్‌కు సంతకం చేయడానికి ఒక స్ట్రింగ్‌ను పంపుతుంది. బ్రౌజర్‌లోని వాలెట్ ఈ స్ట్రింగ్‌పై సంతకం చేస్తే, అది నిజంగా ఆ చిరునామా అని అర్థం (అంటే, దానికి చిరునామాకు సంబంధించిన ప్రైవేట్ కీ తెలుసు).

దీనిని చర్యలో చూడటానికి, ఉన్న IdP మరియు SPలను ఆపి, ఈ ఆదేశాలను అమలు చేయండి:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

ఆపై [SPకి](http://localhost:3000) బ్రౌజ్ చేసి, సూచనలను అనుసరించండి.

ఈ సమయంలో ఇతీరియము చిరునామా నుండి ఇమెయిల్ చిరునామాను ఎలా పొందాలో మాకు తెలియదు, కాబట్టి బదులుగా మేము SPకి `<ఇతీరియము చిరునామా>@bad.email.address` అని రిపోర్ట్ చేస్తాము.

### వివరణాత్మక వివరణ

మునుపటి రేఖాచిత్రంలో 4-5 దశలలో మార్పులు ఉన్నాయి.

![ఒక ఇతీరియము సంతకంతో SAML](./fig-05-saml-w-signature.png)

మేము మార్చిన ఏకైక ఫైల్ `idp.mts`. ఇక్కడ మార్చబడిన భాగాలు ఉన్నాయి.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

మాకు ఈ రెండు అదనపు లైబ్రరీలు అవసరం. మేము [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce) విలువను సృష్టించడానికి [`uuid`](https://www.npmjs.com/package/uuid)ని ఉపయోగిస్తాము. విలువకు ప్రాముఖ్యత లేదు, కేవలం అది ఒక్కసారి మాత్రమే ఉపయోగించబడుతుంది అనే వాస్తవం ముఖ్యం.

[`viem`](https://viem.sh/) లైబ్రరీ మనకు ఇతీరియము నిర్వచనాలను ఉపయోగించడానికి అనుమతిస్తుంది. ఇక్కడ సంతకం నిజంగా చెల్లుబాటు అయ్యేదని ధృవీకరించడానికి మాకు ఇది అవసరం.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

వాలెట్ సందేశంపై సంతకం చేయడానికి వినియోగదారుని అనుమతి అడుగుతుంది. కేవలం ఒక నాన్స్ మాత్రమే ఉన్న సందేశం వినియోగదారులను గందరగోళానికి గురి చేస్తుంది, కాబట్టి మేము ఈ ప్రాంప్ట్‌ను చేర్చుతాము.

```typescript
// Keep requestIDs here
let nonces = {}
```

దానికి ప్రతిస్పందించడానికి మాకు అభ్యర్థన సమాచారం అవసరం. మేము దానిని అభ్యర్థనతో (దశ 4) పంపవచ్చు, మరియు దానిని తిరిగి స్వీకరించవచ్చు (దశ 5). అయితే, మేము బ్రౌజర్ నుండి పొందే సమాచారాన్ని విశ్వసించలేము, ఇది సంభావ్యంగా హానికరమైన వినియోగదారు నియంత్రణలో ఉంటుంది. కాబట్టి నాన్స్‌ను కీగా ఇక్కడ నిల్వ చేయడం మంచిది.

సరళత కోసం మనం ఇక్కడ ఒక వేరియబుల్‌గా చేస్తున్నామని గమనించండి. అయితే, దీనికి అనేక ప్రతికూలతలు ఉన్నాయి:

- మేము సేవా నిరాకరణ దాడికి గురవుతాము. ఒక హానికరమైన వినియోగదారుడు చాలాసార్లు లాగ్ ఆన్ చేయడానికి ప్రయత్నించవచ్చు, మా మెమరీని నింపవచ్చు.
- IdP ప్రక్రియను పునఃప్రారంభించాల్సిన అవసరం వస్తే, మనం ఇప్పటికే ఉన్న విలువలను కోల్పోతాము.
- మేము బహుళ ప్రక్రియలలో లోడ్ బ్యాలెన్స్ చేయలేము, ఎందుకంటే ప్రతిదానికి దాని స్వంత వేరియబుల్ ఉంటుంది.

ఒక ప్రొడక్షన్ సిస్టమ్‌లో మనం ఒక డేటాబేస్‌ను ఉపయోగిస్తాము మరియు ఏదో ఒక రకమైన గడువు ముగింపు యంత్రాంగాన్ని అమలు చేస్తాము.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

ఒక నాన్స్‌ను సృష్టించి, భవిష్యత్ ఉపయోగం కోసం `requestId`ని నిల్వ చేయండి.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

ఈ జావాస్క్రిప్ట్ పేజీ లోడ్ అయినప్పుడు స్వయంచాలకంగా అమలు చేయబడుతుంది.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

`viem` నుండి మాకు అనేక ఫంక్షన్లు అవసరం.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

బ్రౌజర్‌లో ఒక వాలెట్ ఉంటేనే మనం పని చేయగలం.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

వాలెట్ (`window.ethereum`) నుండి ఖాతాల జాబితాను అభ్యర్థించండి. కనీసం ఒకటి ఉందని ఊహించుకోండి, మరియు మొదటిదాన్ని మాత్రమే నిల్వ చేయండి.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

బ్రౌజర్ వాలెట్‌తో పరస్పర చర్య చేయడానికి ఒక [వాలెట్ క్లయింట్](https://viem.sh/docs/clients/wallet)ని సృష్టించండి.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

వినియోగదారుని ఒక సందేశంపై సంతకం చేయమని అడగండి. ఈ మొత్తం HTML ఒక [టెంప్లేట్ స్ట్రింగ్](https://viem.sh/docs/clients/wallet)లో ఉన్నందున, మేము idp ప్రక్రియలో నిర్వచించిన వేరియబుల్స్‌ను ఉపయోగించవచ్చు. ఇది సీక్వెన్స్ రేఖాచిత్రంలో 4.5వ దశ.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

`/idp/signature/<nonce>/<address>/<signature>`కు మళ్ళించండి. ఇది సీక్వెన్స్ రేఖాచిత్రంలో 5వ దశ.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

సంతకం బ్రౌజర్ ద్వారా తిరిగి పంపబడుతుంది, ఇది సంభావ్యంగా హానికరమైనది (బ్రౌజర్‌లో `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` తెరవడాన్ని ఆపడానికి ఏమీ లేదు). అందువల్ల, IdP ప్రక్రియ చెడ్డ సంతకాలను సరిగ్గా నిర్వహిస్తుందో లేదో ధృవీకరించడం ముఖ్యం.

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

ఇది సీక్వెన్స్ రేఖాచిత్రంలో 5వ దశకు హ్యాండ్లర్.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

అభ్యర్థన IDని పొందండి, మరియు దానిని తిరిగి ఉపయోగించలేకుండా చూసుకోవడానికి `nonces` నుండి నాన్స్‌ను తొలగించండి.

```typescript
  try {
```

సంతకం చెల్లనిదిగా ఉండటానికి చాలా మార్గాలు ఉన్నందున, మేము దీనిని `try ...`లో చుట్టుతాము. బ్లాక్ విసిరిన ఏవైనా లోపాలను పట్టుకోవడానికి `catch` చేయండి.

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

హ్యాండ్లర్ యొక్క మిగిలిన భాగం మనం ఇంతకు ముందు `/loginSubmitted` హ్యాండ్లర్‌లో చేసిన దానికి సమానంగా ఉంటుంది, ఒక చిన్న మార్పు మినహా.

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

మాకు అసలు ఇమెయిల్ చిరునామా లేదు (మేము దానిని తదుపరి విభాగంలో పొందుతాము), కాబట్టి ఇప్పటికి మేము ఇతీరియము చిరునామాను తిరిగి ఇస్తాము మరియు దానిని స్పష్టంగా ఇమెయిల్ చిరునామా కాదని గుర్తిస్తాము.

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

`getLoginPage` బదులుగా, ఇప్పుడు 3వ దశ హ్యాండ్లర్‌లో `getSignaturePage`ని ఉపయోగించండి.

## ఇమెయిల్ చిరునామాను పొందడం

తదుపరి దశ ఇమెయిల్ చిరునామాను పొందడం, సేవా ప్రదాత అభ్యర్థించిన గుర్తింపు. అది చేయడానికి, మేము [Ethereum Attestation Service (EAS)](https://attest.org/)ని ఉపయోగిస్తాము.

ధృవీకరణలను పొందడానికి సులభమైన మార్గం [GraphQL API](https://docs.attest.org/docs/developer-tools/api)ని ఉపయోగించడం. మేము ఈ ప్రశ్నను ఉపయోగిస్తాము:

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

ఈ [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) కేవలం ఒక ఇ-మెయిల్ చిరునామాను మాత్రమే కలిగి ఉంటుంది. ఈ ప్రశ్న ఈ స్కీమా యొక్క ధృవీకరణల కోసం అడుగుతుంది. ధృవీకరణ యొక్క విషయం `గ్రహీత` అని పిలువబడుతుంది. ఇది ఎల్లప్పుడూ ఒక ఇతీరియము చిరునామా.

హెచ్చరిక: మనం ఇక్కడ ధృవీకరణలను పొందుతున్న విధానంలో రెండు భద్రతా సమస్యలు ఉన్నాయి.

- మేము API ఎండ్‌పాయింట్, `https://optimism.easscan.org/graphql`కు వెళ్తున్నాము, ఇది ఒక కేంద్రీకృత భాగం. మేము `id` గుణాన్ని పొంది, ఆ తర్వాత ఒక ధృవీకరణ నిజమైనదని ధృవీకరించడానికి ఆన్‌చెయిన్‌లో లుకప్ చేయవచ్చు, కానీ API ఎండ్‌పాయింట్ వాటి గురించి మాకు చెప్పకుండా ధృవీకరణలను సెన్సార్ చేయగలదు.

  ఈ సమస్యను పరిష్కరించడం అసాధ్యం కాదు, మనం మన స్వంత GraphQL ఎండ్‌పాయింట్‌ను అమలు చేయవచ్చు మరియు చైన్ లాగ్‌ల నుండి ధృవీకరణలను పొందవచ్చు, కానీ అది మన ప్రయోజనాల కోసం అధికం.

- మేము ధృవీకర్త గుర్తింపును చూడము. ఎవరైనా మనకు తప్పుడు సమాచారాన్ని అందించవచ్చు. ఒక నిజ ప్రపంచ అమలులో మనకు విశ్వసనీయ ధృవీకర్తల సెట్ ఉంటుంది మరియు వారి ధృవీకరణలను మాత్రమే చూస్తాము.

దీనిని చర్యలో చూడటానికి, ఉన్న IdP మరియు SPలను ఆపి, ఈ ఆదేశాలను అమలు చేయండి:

```sh
git checkout email-address
pnpm install
pnpm start
```

ఆపై మీ ఇ-మెయిల్ చిరునామాను అందించండి. అది చేయడానికి మీకు రెండు మార్గాలు ఉన్నాయి:

- ఒక ప్రైవేట్ కీని ఉపయోగించి ఒక వాలెట్‌ను దిగుమతి చేసుకోండి, మరియు `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` అనే టెస్టింగ్ ప్రైవేట్ కీని ఉపయోగించండి.

- మీ స్వంత ఇ-మెయిల్ చిరునామా కోసం ఒక ధృవీకరణను జోడించండి:

  1. ధృవీకరణ ఎక్స్‌ప్లోరర్‌లో [స్కీమాకు బ్రౌజ్ చేయండి](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. **స్కీమాతో ధృవీకరించండి** క్లిక్ చేయండి.

  3. మీ ఇతీరియము చిరునామాను గ్రహీతగా, మీ ఇ-మెయిల్ చిరునామాను ఇమెయిల్ చిరునామాగా నమోదు చేయండి, మరియు **ఆన్‌చెయిన్** ఎంచుకోండి. ఆపై **ధృవీకరణ చేయండి** క్లిక్ చేయండి.

  4. మీ వాలెట్‌లో లావాదేవీని ఆమోదించండి. గ్యాస్ కోసం చెల్లించడానికి మీకు [Optimism బ్లాక్ చైను](https://app.optimism.io/bridge/deposit) పై కొంత ETH అవసరం.

ఏ విధంగానైనా, మీరు ఇది చేసిన తర్వాత [http://localhost:3000](http://localhost:3000)కు బ్రౌజ్ చేసి, సూచనలను అనుసరించండి. మీరు టెస్టింగ్ ప్రైవేట్ కీని దిగుమతి చేసుకుంటే, మీరు స్వీకరించే ఇ-మెయిల్ `test_addr_0@example.com`. మీరు మీ స్వంత చిరునామాను ఉపయోగిస్తే, అది మీరు ధృవీకరించినదిగా ఉండాలి.

### వివరణాత్మక వివరణ

![ఇతీరియము చిరునామా నుండి ఇ-మెయిల్‌కు పొందడం](./fig-06-saml-sig-n-email.png)

కొత్త దశలు GraphQL సంభాషణ, 5.6 మరియు 5.7 దశలు.

మళ్ళీ, ఇక్కడ `idp.mts` యొక్క మార్చబడిన భాగాలు ఉన్నాయి.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

మాకు అవసరమైన లైబ్రరీలను దిగుమతి చేయండి.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

ప్రతి బ్లాక్ చైను కోసం [ఒక ప్రత్యేక ఎండ్‌పాయింట్ ఉంది](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

ఎండ్‌పాయింట్‌ను ప్రశ్నించడానికి మనం ఉపయోగించగల కొత్త `GraphQLClient` క్లయింట్‌ను సృష్టించండి.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL మనకు బైట్‌లతో అపారదర్శక డేటా వస్తువును మాత్రమే ఇస్తుంది. దాన్ని అర్థం చేసుకోవడానికి మాకు స్కీమా అవసరం.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

ఒక ఇతీరియము చిరునామా నుండి ఒక ఇ-మెయిల్ చిరునామాకు పొందడానికి ఒక ఫంక్షన్.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

ఇది ఒక GraphQL ప్రశ్న.

```typescript
      attestations(
```

మేము ధృవీకరణల కోసం చూస్తున్నాము.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

మాకు కావలసిన ధృవీకరణలు మా స్కీమాలోనివి, ఇక్కడ గ్రహీత `getAddress(ethAddr)`. [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) ఫంక్షన్ మన చిరునామా సరైన [చెక్‌సమ్](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) కలిగి ఉందని నిర్ధారిస్తుంది. GraphQL కేస్-సిగ్నిఫికెంట్ కావడం వల్ల ఇది అవసరం. "0xBAD060A7", "0xBad060A7", మరియు "0xbad060a7" వేర్వేరు విలువలు.

```typescript
        take: 1
```

మేము ఎన్ని ధృవీకరణలను కనుగొన్నా, మాకు మొదటిది మాత్రమే కావాలి.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

మేము స్వీకరించాలనుకుంటున్న ఫీల్డ్‌లు.

- `attester`: ధృవీకరణను సమర్పించిన చిరునామా. సాధారణంగా ఇది ధృవీకరణను విశ్వసించాలా వద్దా అని నిర్ణయించడానికి ఉపయోగించబడుతుంది.
- `id`: ధృవీకరణ ID. GraphQL ప్రశ్న నుండి వచ్చిన సమాచారం సరైనదని ధృవీకరించడానికి మీరు ఈ విలువను [ఆన్‌చెయిన్‌లో ధృవీకరణను చదవడానికి](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) ఉపయోగించవచ్చు.
- `data`: స్కీమా డేటా (ఈ సందర్భంలో, ఇ-మెయిల్ చిరునామా).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

ధృవీకరణ లేకపోతే, స్పష్టంగా తప్పుగా ఉన్న విలువను తిరిగి ఇవ్వండి, కానీ అది సేవా ప్రదాతకు చెల్లుబాటు అయ్యేదిగా కనిపిస్తుంది.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

ఒక విలువ ఉంటే, డేటాను డీకోడ్ చేయడానికి `decodeData`ని ఉపయోగించండి. అది అందించే మెటాడేటా మాకు అవసరం లేదు, కేవలం విలువ మాత్రమే.

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

ఇ-మెయిల్ చిరునామాను పొందడానికి కొత్త ఫంక్షన్‌ను ఉపయోగించండి.

## వికేంద్రీకరణ గురించి ఏమిటి?

ఈ కాన్ఫిగరేషన్‌లో వినియోగదారులు తాము కాని వారిలా నటించలేరు, మనం ఇతీరియము నుండి ఇ-మెయిల్ చిరునామా మ్యాపింగ్ కోసం విశ్వసనీయ ధృవీకర్తలపై ఆధారపడినంత కాలం. అయితే, మన గుర్తింపు ప్రదాత ఇప్పటికీ ఒక కేంద్రీకృత భాగం. గుర్తింపు ప్రదాత యొక్క ప్రైవేట్ కీ ఉన్న ఎవరైనా సేవా ప్రదాతకు తప్పుడు సమాచారం పంపవచ్చు.

[మల్టీ-పార్టీ కంప్యూటేషన్ (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ఉపయోగించి ఒక పరిష్కారం ఉండవచ్చు. భవిష్యత్ ట్యుటోరియల్‌లో దాని గురించి వ్రాయాలని నేను ఆశిస్తున్నాను.

## ముగింపు

ఇతీరియము సంతకాలు వంటి లాగ్ ఆన్ ప్రామాణికాన్ని స్వీకరించడం, కోడి మరియు గుడ్డు సమస్యను ఎదుర్కొంటుంది. సేవా ప్రదాతలు సాధ్యమైనంత విస్తృత మార్కెట్‌కు విజ్ఞప్తి చేయాలనుకుంటున్నారు. వినియోగదారులు వారి లాగ్ ఆన్ ప్రామాణికానికి మద్దతు ఇవ్వడం గురించి చింతించకుండా సేవలను యాక్సెస్ చేయగలగాలని కోరుకుంటారు.
ఒక ఇతీరియము IdP వంటి అడాప్టర్‌లను సృష్టించడం, ఈ అడ్డంకిని అధిగమించడానికి మాకు సహాయం చేస్తుంది.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
