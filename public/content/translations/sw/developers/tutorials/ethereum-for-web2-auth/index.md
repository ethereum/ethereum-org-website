---
title: Kutumia Ethereum kwa uthibitishaji wa web2
description: Baada ya kusoma mafunzo haya, msanidi programu ataweza kuunganisha kuingia kwa Ethereum (web3) na kuingia kwa SAML, kiwango kinachotumika katika web2 kutoa kuingia mara moja na huduma zingine zinazohusiana. Hii inaruhusu ufikiaji wa rasilimali za web2 kuthibitishwa kupitia saini za Ethereum, na sifa za mtumiaji zikitoka kwenye uthibitisho.
author: Ori Pomerantz
tags: [ "web2", "uthibitishaji", "eas" ]
skill: beginner
lang: sw
published: 2025-04-30
---

## Utangulizi

[SAML](https://www.onelogin.com/learn/saml) ni kiwango kinachotumika kwenye web2 kuruhusu [mtoa huduma wa kitambulisho (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) kutoa taarifa za mtumiaji kwa [watoa huduma (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

Katika mafunzo haya unajifunza jinsi ya kuunganisha saini za Ethereum na SAML ili kuwaruhusu watumiaji kutumia mikoba yao ya Ethereum kujithibitisha kwa huduma za web2 ambazo bado hazitumii Ethereum moja kwa moja.

Kumbuka kwamba mafunzo haya yameandikwa kwa ajili ya hadhira mbili tofauti:

- Watu wa Ethereum wanaoielewa Ethereum na wanahitaji kujifunza SAML
- Watu wa Web2 wanaoielewa SAML na uthibitishaji wa web2 na wanahitaji kujifunza Ethereum

Kutokana na hilo, itaendana na kuwa na nyenzo nyingi za utangulizi ambazo tayari unazijua. Jisikie huru kuiruka.

### SAML kwa watu wa Ethereum

SAML ni itifaki ya kati. Mtoa huduma (SP) anakubali tu madai (kama vile "huyu ni mtumiaji wangu John, anapaswa kuwa na ruhusa za kufanya A, B, na C") kutoka kwa mtoa huduma wa kitambulisho (IdP) ikiwa ina uhusiano wa awali wa kuaminiana nayo, au na [mamlaka ya cheti](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) iliyosaini cheti cha IdP hicho.

Kwa mfano, SP inaweza kuwa wakala wa usafiri unaotoa huduma za usafiri kwa makampuni, na IdP inaweza kuwa tovuti ya ndani ya kampuni. Wakati wafanyakazi wanapohitaji kuweka nafasi ya safari za kibiashara, wakala wa usafiri huwatuma kwa ajili ya uthibitishaji na kampuni kabla ya kuwaruhusu kuweka nafasi ya safari.

![Mchakato wa SAML hatua kwa hatua](./fig-01-saml.png)

Hii ndiyo njia ambayo taasisi tatu, kivinjari, SP, na IdP, hujadiliana kwa ajili ya ufikiaji. SP haihitaji kujua chochote kuhusu mtumiaji anayetumia kivinjari mapema, ila tu kumwamini IdP.

### Ethereum kwa watu wa SAML

Ethereum ni mfumo uliotawanywa.

![Kuingia kwa Ethereum](./fig-02-eth-logon.png)

Watumiaji wana ufunguo binafsi (kwa kawaida huhifadhiwa kwenye kiendelezi cha kivinjari). Kutoka kwenye ufunguo binafsi unaweza kupata ufunguo wa umma, na kutoka hapo anwani ya baiti 20. Wakati watumiaji wanapohitaji kuingia kwenye mfumo, wanaombwa kusaini ujumbe wenye nonce (thamani ya matumizi moja). Seva inaweza kuthibitisha saini iliundwa na anwani hiyo.

![Kupata data ya ziada kutoka kwa uthibitisho](./fig-03-eas-data.png)

Saini inathibitisha tu anwani ya Ethereum. Ili kupata sifa zingine za mtumiaji, kwa kawaida unatumia [uthibitisho](https://attest.org/). Uthibitisho kwa kawaida huwa na nyanja hizi:

- **Mthibitishaji**, anwani iliyofanya uthibitisho
- **Mpokeaji**, anwani ambayo uthibitisho unatumika kwake
- **Data**, data inayothibitishwa, kama vile jina, ruhusa, n.k.
- **Schema**, Kitambulisho cha schema inayotumika kutafsiri data.

Kwa sababu ya asili ya mfumo uliotawanywa wa Ethereum, mtumiaji yeyote anaweza kufanya uthibitisho. Utambulisho wa mthibitishaji ni muhimu kutambua ni uthibitisho upi tunaouzingatia kuwa wa kuaminika.

## Mpangilio

Hatua ya kwanza ni kuwa na SAML SP na SAML IdP zinazowasiliana kati yao.

1. Pakua programu. Programu ya mfano kwa makala hii iko [kwenye github](https://github.com/qbzzt/250420-saml-ethereum). Hatua tofauti huhifadhiwa katika matawi tofauti, kwa hatua hii unataka `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Unda funguo zenye vyeti vilivyosainiwa kibinafsi. Hii inamaanisha kuwa ufunguo ni mamlaka yake ya cheti, na inahitaji kuingizwa kwa mikono kwa mtoa huduma. Tazama [hati za OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) kwa habari zaidi.

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Anzisha seva (zote SP na IdP)

    ```sh
    pnpm start
    ```

4. Vinjari hadi kwa SP kwenye URL [http://localhost:3000/](http://localhost:3000/) na ubofye kitufe ili kuelekezwa kwa IdP (mlango 3001).

5. Mpe IdP anwani yako ya barua pepe na ubofye **Ingia kwa mtoa huduma**. Tazama kuwa unaelekezwa tena kwa mtoa huduma (mlango 3000) na kwamba anakutambua kwa anwani yako ya barua pepe.

### Maelezo ya kina

Hivi ndivyo inavyotokea, hatua kwa hatua:

![Kuingia kwa kawaida kwa SAML bila Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Faili hii ina usanidi kwa Mtoa Huduma wa Kitambulisho na Mtoa Huduma. Kwa kawaida hizi mbili zingekuwa taasisi tofauti, lakini hapa tunaweza kushiriki msimbo kwa urahisi.

```typescript
const fs = await import("fs")

const protocol="http"
```

Kwa sasa tunafanya majaribio tu, kwa hivyo ni sawa kutumia HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Soma funguo za umma, ambazo kwa kawaida zinapatikana kwa vipengele vyote viwili (na aidha zinaaminika moja kwa moja, au zimesainiwa na mamlaka ya cheti inayoaminika).

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

URL za vipengele vyote viwili.

```typescript
export const spPublicData = {
```

Data ya umma kwa mtoa huduma.

```typescript
    entityID: `${spUrl}/metadata`,
```

Kwa kawaida, katika SAML `entityID` ni URL ambapo metadata ya taasisi inapatikana. Metadata hii inalingana na data ya umma hapa, isipokuwa iko katika fomu ya XML.

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

Ufafanuzi muhimu zaidi kwa madhumuni yetu ni `assertionConsumerServer`. Inamaanisha kuwa ili kudai kitu (kwa mfano, "mtumiaji anayekutumia habari hii ni somebody@example.com") kwa mtoa huduma tunahitaji kutumia [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) kwa URL `http://localhost:3000/sp/assertion`.

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

Data ya umma kwa mtoa huduma wa kitambulisho ni sawa. Inabainisha kuwa ili kumwingiza mtumiaji unatumia POST kwa `http://localhost:3001/idp/login` na kumtoa mtumiaji unatumia POST kwa `http://localhost:3001/idp/logout`.

#### src/sp.mts

Huu ndio msimbo unaotekeleza mtoa huduma.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Tunatumia maktaba ya [`samlify`](https://www.npmjs.com/package/samlify) kutekeleza SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Maktaba ya `samlify` inatarajia kuwa na kifurushi kinachothibitisha kuwa XML ni sahihi, imesainiwa na ufunguo wa umma unaotarajiwa, n.k. Tunatumia [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) kwa madhumuni haya.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) ya [`express`](https://expressjs.com/) ni "tovuti ndogo" ambayo inaweza kuwekwa ndani ya tovuti. Katika kesi hii, tunaitumia kupanga ufafanuzi wote wa watoa huduma pamoja.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Uwakilishi wa mtoa huduma wenyewe ni data yote ya umma, na ufunguo binafsi unaotumia kusaini habari.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Data ya umma ina kila kitu ambacho mtoa huduma anahitaji kujua kuhusu mtoa huduma wa kitambulisho.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Ili kuwezesha ushirikiano na vipengele vingine vya SAML, watoa huduma na watoa huduma za utambulisho wanapaswa kuwa na data zao za umma (zinazoitwa metadata) zinazopatikana katika muundo wa XML katika `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Hii ndiyo ukurasa unaofikiwa na kivinjari ili kujitambulisha. Madai hayo yanajumuisha kitambulisho cha mtumiaji (hapa tunatumia anwani ya barua pepe), na yanaweza kujumuisha sifa za ziada. Hiki ni kishikizi cha hatua ya 7 katika mchoro wa mfuatano hapo juu.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Unaweza kutumia amri iliyotolewa maoni ili kuona data ya XML iliyotolewa katika madai. Ime[simbwa kwa base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Changanua ombi la kuingia kutoka kwa seva ya utambulisho.

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

Tuma jibu la HTML, ili tu kumwonyesha mtumiaji tulipata kuingia.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Mjulishe mtumiaji endapo kutakuwa na hitilafu.

```typescript
spRouter.get('/login',
```

Unda ombi la kuingia wakati kivinjari kinapojaribu kupata ukurasa huu. Hiki ni kishikizi cha hatua ya 1 katika mchoro wa mfuatano hapo juu.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Pata taarifa ya kutuma ombi la kuingia.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Ukurasa huu unawasilisha fomu (tazama hapa chini) kiotomatiki. Kwa njia hii mtumiaji hahitaji kufanya chochote ili aelekezwe. Hii ni hatua ya 2 katika mchoro wa mfuatano hapo juu.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Tuma kwa `loginRequest.entityEndpoint` (URL ya mwisho wa mtoa huduma wa utambulisho).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Jina la ingizo ni `loginRequest.type` (`SAMLRequest`). Maudhui ya uwanja huo ni `loginRequest.context`, ambayo tena ni XML iliyosimbwa kwa base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Middleware hii](https://expressjs.com/en/5x/api.html#express.urlencoded) inasoma mwili wa [ombi la HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Kwa chaguo-msingi, express inapuuzia, kwa sababu maombi mengi hayaihitaji. Tunaihitaji kwa sababu POST inatumia mwili.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Pachika kipanga njia katika saraka ya mtoa huduma (`/sp`).

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

Ikiwa kivinjari kitajaribu kupata saraka ya mizizi, kipe kiungo cha ukurasa wa kuingia.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Sikiliza `spPort` na programu hii ya express.

#### src/idp.mts

Huyu ndiye mtoa huduma wa kitambulisho. Ni sawa na mtoa huduma, maelezo yaliyo hapa chini ni ya sehemu ambazo ni tofauti.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

Tunahitaji kusoma na kuelewa ombi la XML tunalopokea kutoka kwa mtoa huduma.

```typescript
const getLoginPage = requestId => `
```

Kazi hii huunda ukurasa na fomu inayojituma yenyewe ambayo inarudishwa katika hatua ya 4 ya mchoro wa mfuatano hapo juu.

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

Kuna nyanja mbili tunazotuma kwa mtoa huduma:

1. `requestId` ambayo tunajibu.
2. Kitambulisho cha mtumiaji (tunatumia anwani ya barua pepe ambayo mtumiaji hutoa kwa sasa).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Hiki ni kishikizi cha hatua ya 5 katika mchoro wa mfuatano hapo juu. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) huunda jibu la kuingia.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Watazamaji ni watoa huduma.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Taarifa iliyotolewa kutoka kwa ombi. Kigezo kimoja tunachojali katika ombi ni requestId, ambayo inaruhusu mtoa huduma kulinganisha maombi na majibu yao.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

Tunahitaji `signingKey` ili kuwa na data ya kusaini jibu. Mtoa huduma haamini maombi ambayo hayajasainiwa.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Hili ni eneo lenye maelezo ya mtumiaji tunayorudisha kwa mtoa huduma.

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

Tena, tumia fomu inayojituma yenyewe. Hii ni hatua ya 6 ya mchoro wa mfuatano hapo juu.

```typescript

// IdP endpoint for login requests
idpRouter.post(`/login`,
```

Hii ni sehemu ya mwisho inayopokea ombi la kuingia kutoka kwa mtoa huduma. Hii ni handler hatua ya 3 ya mchoro wa mfuatano hapo juu.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Tunapaswa kuwa na uwezo wa kutumia [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) kusoma kitambulisho cha ombi la uthibitishaji. Hata hivyo, sikuweza kuifanyia kazi na haikustahili kutumia muda mwingi juu yake kwa hivyo ninatumia tu [kichanganuzi cha XML cha jumla](https://www.npmjs.com/package/fast-xml-parser). Taarifa tunayohitaji ni sifa ya `ID` ndani ya lebo ya `<samlp:AuthnRequest>`, ambayo iko katika kiwango cha juu cha XML.

## Kutumia saini za Ethereum

Sasa kwa kuwa tunaweza kutuma utambulisho wa mtumiaji kwa mtoa huduma, hatua inayofuata ni kupata utambulisho wa mtumiaji kwa njia inayoaminika. Viem inaturuhusu kuuliza tu mkoba kwa anwani ya mtumiaji, lakini hii inamaanisha kuuliza kivinjari kwa habari. Hatuidhibiti kivinjari, kwa hivyo hatuwezi kuamini moja kwa moja jibu tunalopata kutoka kwake.

Badala yake, IdP itatuma kivinjari mfuatano wa kusaini. Ikiwa mkoba katika kivinjari unasaini mfuatano huu, inamaanisha kuwa kweli ni anwani hiyo (yaani, inajua ufunguo binafsi unaolingana na anwani).

Ili kuona hili likitendeka, simamisha IdP na SP zilizopo na endesha amri hizi:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Kisha vinjari [kwa SP](http://localhost:3000) na ufuate maelekezo.

Kumbuka kuwa kwa wakati huu hatujui jinsi ya kupata anwani ya barua pepe kutoka kwa anwani ya Ethereum, kwa hivyo badala yake tunaripoti `<ethereum address>@bad.email.address` kwa SP.

### Maelezo ya kina

Mabadiliko yapo katika hatua 4-5 katika mchoro uliopita.

![SAML na saini ya Ethereum](./fig-05-saml-w-signature.png)

Faili pekee tuliyobadilisha ni `idp.mts`. Hapa kuna sehemu zilizobadilishwa.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Tunahitaji maktaba hizi mbili za ziada. Tunatumia [`uuid`](https://www.npmjs.com/package/uuid) kuunda thamani ya [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Thamani yenyewe haijalishi, ni ukweli tu kwamba inatumika mara moja tu.

Maktaba ya [`viem`](https://viem.sh/) inaturuhusu kutumia ufafanuzi wa Ethereum. Hapa tunaihitaji ili kuthibitisha kuwa saini ni halali.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Mkoba unamwomba mtumiaji ruhusa ya kusaini ujumbe. Ujumbe ambao ni nonce tu unaweza kuwachanganya watumiaji, kwa hivyo tunajumuisha kidokezo hiki.

```typescript
// Keep requestIDs here
let nonces = {}
```

Tunahitaji taarifa ya ombi ili tuweze kulijibu. Tunaweza kuituma na ombi (hatua ya 4), na kuipokea tena (hatua ya 5). Hata hivyo, hatuwezi kuamini taarifa tunazopata kutoka kwenye kivinjari, ambacho kiko chini ya udhibiti wa mtumiaji anayeweza kuwa na nia mbaya. Kwa hivyo ni bora kuihifadhi hapa, na nonce kama ufunguo.

Kumbuka kuwa tunafanya hivi hapa kama kigezo kwa ajili ya urahisi. Hata hivyo, hii ina hasara kadhaa:

- Tuko katika hatari ya shambulio la kunyimwa huduma. Mtumiaji hasidi anaweza kujaribu kuingia mara nyingi, akijaza kumbukumbu zetu.
- Ikiwa mchakato wa IdP unahitaji kuanzishwa upya, tunapoteza maadili yaliyopo.
- Hatuwezi kusawazisha mzigo katika michakato mingi, kwa sababu kila moja ingekuwa na kigezo chake.

Katika mfumo wa uzalishaji tungetumia hifadhidata na kutekeleza aina fulani ya utaratibu wa kumalizika muda.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Unda nonce, na uhifadhi `requestId` kwa matumizi ya baadaye.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

JavaScript hii inatekelezwa kiotomatiki wakati ukurasa unapopakiwa.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Tunahitaji kazi kadhaa kutoka kwa `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Tunaweza kufanya kazi tu ikiwa kuna mkoba kwenye kivinjari.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Omba orodha ya akaunti kutoka kwa mkoba (`window.ethereum`). Fikiria kuna angalau moja, na hifadhi tu ya kwanza.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Unda [mteja wa mkoba](https://viem.sh/docs/clients/wallet) ili kuingiliana na mkoba wa kivinjari.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Mwombe mtumiaji kusaini ujumbe. Kwa sababu HTML hii yote iko katika [kamba ya kiolezo](https://viem.sh/docs/clients/wallet), tunaweza kutumia vigezo vilivyofafanuliwa katika mchakato wa idp. Hii ni hatua ya 4.5 katika mchoro wa mfuatano.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Elekeza kwa `/idp/signature/<nonce>/<address>/<signature>`. Hii ni hatua ya 5 katika mchoro wa mfuatano.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Saini inarudishwa na kivinjari, ambacho kinaweza kuwa hasidi (hakuna kitu cha kukuzuia kufungua `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` kwenye kivinjari). Kwa hivyo, ni muhimu kuthibitisha kuwa mchakato wa IdP unashughulikia saini mbaya ipasavyo.

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

Sehemu iliyobaki ni HTML ya kawaida tu.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Hiki ni kishikizi cha hatua ya 5 katika mchoro wa mfuatano.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Pata kitambulisho cha ombi, na ufute nonce kutoka kwa `nonces` ili kuhakikisha haiwezi kutumika tena.

```typescript
  try {
```

Kwa sababu kuna njia nyingi ambazo saini inaweza kuwa batili, tunafunga hii katika `try ...` kuzuia `catch` ili kunasa makosa yoyote yaliyorushwa.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Tumia [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) kutekeleza hatua ya 5.5 katika mchoro wa mfuatano.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Sehemu iliyobaki ya mshikaji ni sawa na kile tumefanya katika mshikaji wa `/loginSubmitted` hapo awali, isipokuwa kwa mabadiliko madogo.

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

Hatuna anwani halisi ya barua pepe (tutaipata katika sehemu inayofuata), kwa hivyo kwa sasa tunarudisha anwani ya Ethereum na kuiweka alama wazi kuwa si anwani ya barua pepe.

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

Badala ya `getLoginPage`, sasa tumia `getSignaturePage` katika kishikilizi cha hatua ya 3.

## Kupata anwani ya barua pepe

Hatua inayofuata ni kupata anwani ya barua pepe, kitambulisho kinachoombwa na mtoa huduma. Ili kufanya hivyo, tunatumia [Huduma ya Uthibitisho ya Ethereum (EAS)](https://attest.org/).

Njia rahisi zaidi ya kupata uthibitisho ni kutumia [GraphQL API](https://docs.attest.org/docs/developer-tools/api). Tunatumia swali hili:

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

[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) hii inajumuisha anwani ya barua pepe tu. Swali hili linauliza uthibitisho wa skimu hii. Mada ya uthibitisho inaitwa `recipient`. Daima ni anwani ya Ethereum.

Onyo: Njia tunayopata uthibitisho hapa ina masuala mawili ya usalama.

- Tunaenda kwenye eneo la mwisho la API, `https://optimism.easscan.org/graphql`, ambalo ni sehemu ya kati. Tunaweza kupata sifa ya `id` na kisha kufanya utafutaji wa mnyororo ili kuthibitisha kwamba uthibitisho ni halisi, lakini eneo la mwisho la API bado linaweza kudhibiti uthibitisho kwa kutotuambia kuhusu wao.

  Tatizo hili si gumu kulitatua, tunaweza kuendesha sehemu yetu ya GraphQL na kupata uthibitisho kutoka kwa kumbukumbu za mnyororo, lakini hiyo ni ya kupita kiasi kwa madhumuni yetu.

- Hatuangalii utambulisho wa mthibitishaji. Mtu yeyote anaweza kutupa habari za uongo. Katika utekelezaji wa ulimwengu halisi tungekuwa na seti ya wathibitishaji wanaoaminika na kuangalia tu uthibitisho wao.

Ili kuona hili likitendeka, simamisha IdP na SP zilizopo na endesha amri hizi:

```sh
git checkout email-address
pnpm install
pnpm start
```

Kisha toa anwani yako ya barua pepe. Una njia mbili za kufanya hivyo:

- Ingiza mkoba ukitumia ufunguo binafsi, na utumie ufunguo binafsi wa majaribio `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Ongeza uthibitisho kwa anwani yako ya barua pepe:

  1. Vinjari [skimu katika kivinjari cha uthibitisho](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Bofya **Thibitisha na Schema**.

  3. Ingiza anwani yako ya Ethereum kama mpokeaji, anwani yako ya barua pepe kama anwani ya barua pepe, na uchague **Onchain**. Kisha bofya **Fanya Uthibitisho**.

  4. Idhinisha muamala kwenye mkoba wako. Utahitaji ETH kwenye [Mnyororo wa bloku wa Optimism](https://app.optimism.io/bridge/deposit) kulipia gesi.

Vyovyote vile, baada ya kufanya hivi nenda kwenye [http://localhost:3000](http://localhost:3000) na ufuate maelekezo. Ikiwa umeingiza ufunguo binafsi wa majaribio, barua pepe unayopokea ni `test_addr_0@example.com`. Ikiwa umetumia anwani yako mwenyewe, inapaswa kuwa chochote ulichothibitisha.

### Maelezo ya kina

![Kupata kutoka anwani ya Ethereum hadi barua-pepe](./fig-06-saml-sig-n-email.png)

Hatua mpya ni mawasiliano ya GraphQL, hatua 5.6 na 5.7.

Tena, hapa kuna sehemu zilizobadilishwa za `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Ingiza maktaba tunazohitaji.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Kuna [sehemu tofauti kwa kila mnyororo wa bloku](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Unda mteja mpya wa `GraphQLClient` tunaoweza kutumia kuuliza maswali kwenye endpoint.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL inatupa tu kitu cha data kisichoeleweka na baiti. Ili kuielewa tunahitaji skimu.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Kazi ya kupata kutoka anwani ya Ethereum hadi anwani ya barua-pepe.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Hili ni swali la GraphQL.

```typescript
      attestations(
```

Tunatafuta uthibitisho.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Uthibitisho tunaotaka ni ule ulio katika skimu yetu, ambapo mpokeaji ni `getAddress(ethAddr)`. Kazi ya [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) inahakikisha anwani yetu ina [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) sahihi. Hii ni muhimu kuhusu GraphQL ni muhimu kwa herufi kubwa na ndogo. "0xBAD060A7", "0xBad060A7", na "0xbad060a7" ni maadili tofauti.

```typescript
        take: 1
```

Bila kujali ni ithibati ngapi tunapata, tunataka tu ya kwanza.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Sehemu tunazotaka kupokea.

- `attester`: Anwani iliyowasilisha uthibitisho. Kawaida hii hutumika kuamua kama kuamini uthibitisho au la.
- `id`: Kitambulisho cha uthibitisho. Unaweza kutumia thamani hii [kusoma uthibitisho onchain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) ili kuthibitisha kuwa taarifa kutoka kwa swali la GraphQL ni sahihi.
- `data`: Data ya skimu (katika kesi hii, anwani ya barua pepe).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Ikiwa hakuna uthibitisho, rudisha thamani ambayo ni wazi si sahihi, lakini ambayo itaonekana kuwa halali kwa mtoa huduma.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Ikiwa kuna thamani, tumia `decodeData` kusimbua data. Hatuhitaji metadata inayotoa, ni thamani yenyewe tu.

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

Tumia kazi mpya kupata anwani ya barua pepe.

## Vipi kuhusu utawanyaji wa mamlaka?

Katika usanidi huu watumiaji hawawezi kujifanya kuwa mtu mwingine, mradi tu tunategemea wathibitishaji wanaoaminika kwa ramani ya anwani ya Ethereum hadi barua pepe. Hata hivyo, mtoa huduma wetu wa kitambulisho bado ni sehemu ya kati. Yeyote aliye na ufunguo binafsi wa mtoa huduma wa kitambulisho anaweza kutuma habari za uongo kwa mtoa huduma.

Kunaweza kuwa na suluhisho kwa kutumia [hesabu ya pande nyingi (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Natumai kuandika kuihusu katika mafunzo yajayo.

## Hitimisho

Kukubalika kwa kiwango cha kuingia, kama vile saini za Ethereum, kunakabiliwa na tatizo la kuku na yai. Watoa huduma wanataka kuvutia soko pana iwezekanavyo. Watumiaji wanataka kuwa na uwezo wa kufikia huduma bila kuwa na wasiwasi kuhusu kuunga mkono kiwango chao cha kuingia.
Kuunda adapta, kama vile Ethereum IdP, kunaweza kutusaidia kushinda kikwazo hiki.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
