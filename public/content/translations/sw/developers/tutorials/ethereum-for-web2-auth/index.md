---
title: Kutumia Ethereum kwa uthibitishaji wa Web2
description: Baada ya kusoma mafunzo haya, msanidi ataweza kuunganisha kuingia kwa Ethereum (web3) na kuingia kwa SAML, kiwango kinachotumiwa katika Web2 kutoa kuingia mara moja na huduma zingine zinazohusiana. Hii inaruhusu ufikiaji wa rasilimali za Web2 kuthibitishwa kupitia sahihi za Ethereum, huku sifa za mtumiaji zikitoka kwenye uthibitisho.
author: Ori Pomerantz
tags:
  - Web2
  - uthibitishaji
  - eas
skill: beginner
breadcrumb: Ethereum kwa uthibitishaji wa Web2
lang: sw
published: 2025-04-30
---

## Utangulizi {#introduction}

[SAML](https://www.onelogin.com/learn/saml) ni kiwango kinachotumiwa kwenye Web2 kuruhusu [mtoa utambulisho (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) kutoa taarifa za mtumiaji kwa [watoa huduma (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)).

Katika mafunzo haya unajifunza jinsi ya kuunganisha sahihi za Ethereum na SAML ili kuruhusu watumiaji kutumia mikoba yao ya Ethereum kujithibitisha kwenye huduma za Web2 ambazo bado hazitumii Ethereum asilia.

Kumbuka kwamba mafunzo haya yameandikwa kwa hadhira mbili tofauti:

- Watu wa Ethereum wanaoelewa Ethereum na wanahitaji kujifunza SAML
- Watu wa Web2 wanaoelewa SAML na uthibitishaji wa Web2 na wanahitaji kujifunza Ethereum

Kama matokeo, itakuwa na nyenzo nyingi za utangulizi ambazo tayari unazijua. Jisikie huru kuziruka.

### SAML kwa watu wa Ethereum {#saml-for-ethereum-people}

SAML ni itifaki iliyowekwa kati. Mtoa huduma (SP) anakubali tu madai (kama vile "huyu ni mtumiaji wangu John, anapaswa kuwa na ruhusa za kufanya A, B, na C") kutoka kwa mtoa utambulisho (IdP) ikiwa ina uhusiano wa uaminifu uliopo tayari ama nayo, au na [mamlaka ya cheti](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) iliyosaini cheti cha IdP huyo.

Kwa mfano, SP inaweza kuwa wakala wa usafiri anayetoa huduma za usafiri kwa makampuni, na IdP inaweza kuwa tovuti ya ndani ya kampuni. Wakati wafanyakazi wanahitaji kukata tiketi za usafiri wa kibiashara, wakala wa usafiri huwatuma kwa uthibitishaji na kampuni kabla ya kuwaruhusu kukata tiketi za usafiri.

![Step by step SAML process](./fig-01-saml.png)

Hii ndiyo njia ambayo vyombo vitatu, kivinjari, SP, na IdP, hujadiliana kwa ajili ya ufikiaji. SP haihitaji kujua chochote kuhusu mtumiaji anayetumia kivinjari mapema, inahitaji tu kuiamini IdP.

### Ethereum kwa watu wa SAML {#ethereum-for-saml-people}

Ethereum ni mfumo uliogatuliwa. 

![Ethereum logon](./fig-02-eth-logon.png)

Watumiaji wana ufunguo wa siri (kawaida huhifadhiwa kwenye kiendelezi cha kivinjari). Kutoka kwenye ufunguo wa siri unaweza kupata ufunguo wa umma, na kutoka hapo anwani ya baiti 20. Wakati watumiaji wanahitaji kuingia kwenye mfumo, wanaombwa kusaini ujumbe na nonsi (thamani ya matumizi mara moja). Seva inaweza kuthibitisha sahihi iliundwa na anwani hiyo.

![Getting extra data from attestations](./fig-03-eas-data.png)

Sahihi inathibitisha tu anwani ya Ethereum. Ili kupata sifa zingine za mtumiaji, kwa kawaida unatumia [uthibitisho](https://attest.org/). Uthibitisho kwa kawaida una nyanja hizi:

- **Mthibitishaji**, anwani iliyofanya uthibitisho
- **Mpokeaji**, anwani ambayo uthibitisho unatumika
- **Data**, data inayothibitishwa, kama vile jina, ruhusa, n.k.
- **Skima**, kitambulisho cha skima inayotumika kufasiri data.

Kwa sababu ya asili iliyogatuliwa ya Ethereum, mtumiaji yeyote anaweza kufanya uthibitisho. Utambulisho wa mthibitishaji ni muhimu ili kutambua ni uthibitisho upi tunaochukulia kuwa wa kuaminika.

## Usanidi {#setup}

Hatua ya kwanza ni kuwa na SAML SP na SAML IdP zinazowasiliana zenyewe kwa zenyewe.

1. Pakua programu. Programu ya mfano kwa makala haya iko [kwenye GitHub](https://github.com/qbzzt/250420-saml-ethereum). Hatua tofauti zimehifadhiwa katika matawi tofauti, kwa hatua hii unataka `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Unda funguo zilizo na vyeti vilivyosainiwa binafsi. Hii inamaanisha kuwa ufunguo ni mamlaka yake yenyewe ya cheti, na inahitaji kuingizwa kwa mikono kwa mtoa huduma. Tazama [nyaraka za OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) kwa maelezo zaidi. 

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

4. Vinjari hadi kwenye SP kwenye URL [http://localhost:3000/](http://localhost:3000/) na ubofye kitufe ili kuelekezwa kwenye IdP (lango 3001).

5. Ipe IdP anwani yako ya barua pepe na ubofye **Ingia kwa mtoa huduma**. Utaona kwamba unaelekezwa tena kwa mtoa huduma (lango 3000) na kwamba inakutambua kwa anwani yako ya barua pepe.

### Maelezo ya kina {#detailed-explanation}

Hivi ndivyo kinachotokea, hatua kwa hatua:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Faili hili lina usanidi kwa Mtoa Utambulisho na Mtoa Huduma. Kwa kawaida hizi mbili zingekuwa vyombo tofauti, lakini hapa tunaweza kushiriki msimbo kwa urahisi.

```typescript
const fs = await import("fs")

const protocol="http"
```

Kwa sasa tunajaribu tu, kwa hivyo ni sawa kutumia HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Soma funguo za umma, ambazo kwa kawaida zinapatikana kwa vipengele vyote viwili (na ama zinaaminika moja kwa moja, au zimesainiwa na mamlaka ya cheti inayoaminika).

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

Kwa kawaida, katika SAML `entityID` ni URL ambapo data fafanuzi ya chombo inapatikana. Data fafanuzi hii inalingana na data ya umma hapa, isipokuwa iko katika muundo wa XML.

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

Ufafanuzi muhimu zaidi kwa madhumuni yetu ni `assertionConsumerServer`. Inamaanisha kwamba ili kuthibitisha jambo (kwa mfano, "mtumiaji anayekutumia taarifa hii ni somebody@example.com") kwa mtoa huduma tunahitaji kutumia [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) kwenye URL `http://localhost:3000/sp/assertion`.

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

Data ya umma kwa mtoa utambulisho inafanana. Inabainisha kwamba ili kumwingiza mtumiaji una-POST kwenye `http://localhost:3001/idp/login` na kumtoa mtumiaji una-POST kwenye `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Huu ni msimbo unaotekeleza mtoa huduma.

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

Maktaba ya `samlify` inatarajia kuwa na kifurushi cha kuthibitisha kwamba XML ni sahihi, imesainiwa na ufunguo wa umma unaotarajiwa, n.k. Tunatumia [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) kwa madhumuni haya.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) ya [`express`](https://expressjs.com/) ni "tovuti ndogo" inayoweza kupachikwa ndani ya tovuti. Katika hali hii, tunaitumia kuweka pamoja ufafanuzi wote wa mtoa huduma.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Uwakilishi wa mtoa huduma wenyewe ni data yote ya umma, na ufunguo wa siri inayoutumia kusaini taarifa.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Data ya umma ina kila kitu ambacho mtoa huduma anahitaji kujua kuhusu mtoa utambulisho.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Ili kuwezesha mwingiliano na vipengele vingine vya SAML, watoa huduma na utambulisho wanapaswa kuwa na data yao ya umma (inayoitwa data fafanuzi) inayopatikana katika muundo wa XML kwenye `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Huu ni ukurasa unaofikiwa na kivinjari ili kujitambulisha. Dai linajumuisha kitambulisho cha mtumiaji (hapa tunatumia anwani ya barua pepe), na linaweza kujumuisha sifa za ziada. Hiki ni kishughulikiaji cha hatua ya 7 katika mchoro wa mfuatano hapo juu.

```typescript
  async (req, res) => {
    // console.log(`Majibu ya SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Unaweza kutumia amri iliyotolewa maoni ili kuona data ya XML iliyotolewa katika dai. Imesimbwa kwa [base64](https://en.wikipedia.org/wiki/Base64).

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

Tuma majibu ya HTML, ili tu kumwonyesha mtumiaji tumepata kuingia.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Mfahamishe mtumiaji endapo kutatokea hitilafu.

```typescript
spRouter.get('/login',
```

Unda ombi la kuingia wakati kivinjari kinajaribu kupata ukurasa huu. Hiki ni kishughulikiaji cha hatua ya 1 katika mchoro wa mfuatano hapo juu.

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

Ukurasa huu unawasilisha fomu (tazama hapa chini) kiotomatiki. Kwa njia hii mtumiaji halazimiki kufanya chochote ili kuelekezwa kwingine. Hii ni hatua ya 2 katika mchoro wa mfuatano hapo juu.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Tuma kwa `loginRequest.entityEndpoint` (URL ya mwisho wa mtoa utambulisho).

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

[Kifaa hiki cha kati](https://expressjs.com/en/5x/api.html#express.urlencoded) kinasoma kiini cha [ombi la HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Kwa chaguo-msingi express inakipuuza, kwa sababu maombi mengi hayakihitaji. Tunakihitaji kwa sababu POST inatumia kiini.

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

Ikiwa kivinjari kinajaribu kupata saraka ya mzizi, kipe kiungo cha ukurasa wa kuingia.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Sikiliza `spPort` na programu hii ya express.

#### src/idp.mts {#srcidpmts}

Huyu ni mtoa utambulisho. Anafanana sana na mtoa huduma, maelezo hapa chini ni kwa sehemu ambazo ni tofauti.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Hifadhi sifa
    attributeNamePrefix: "@_", // Kiambishi awali cha sifa
  }
)
```

Tunahitaji kusoma na kuelewa ombi la XML tunalopokea kutoka kwa mtoa huduma.

```typescript
const getLoginPage = requestId => `
```

Kazi hii inaunda ukurasa na fomu iliyowasilishwa kiotomatiki ambayo inarejeshwa katika hatua ya 4 ya mchoro wa mfuatano hapo juu.

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

1. `requestId` ambayo tunaijibu.
2. Kitambulisho cha mtumiaji (tunatumia anwani ya barua pepe anayotoa mtumiaji kwa sasa).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Hiki ni kishughulikiaji cha hatua ya 5 ya mchoro wa mfuatano hapo juu. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) inaunda majibu ya kuingia. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Hadhira ni mtoa huduma.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Taarifa iliyotolewa kutoka kwenye ombi. Kigezo kimoja tunachojali katika ombi ni requestId, ambayo inaruhusu mtoa huduma kulinganisha maombi na majibu yao.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Hakikisha utiaji sahihi
```

Tunahitaji `signingKey` kuwa na data ya kusaini majibu. Mtoa huduma haamini maombi ambayo hayajasainiwa.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Huu ni uwanja wenye taarifa za mtumiaji tunazotuma tena kwa mtoa huduma.

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

Tena, tumia fomu iliyowasilishwa kiotomatiki. Hii ni hatua ya 6 ya mchoro wa mfuatano hapo juu.

```typescript

// Kituo cha IdP kwa maombi ya kuingia
idpRouter.post(`/login`,
```

Huu ni mwisho unaopokea ombi la kuingia kutoka kwa mtoa huduma. Hiki ni kishughulikiaji cha hatua ya 3 ya mchoro wa mfuatano hapo juu.

```typescript
  async (req, res) => {
    try {
      // Njia mbadala kwa sababu nilishindwa kufanya parseLoginRequest ifanye kazi.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Tunapaswa kuweza kutumia [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) kusoma kitambulisho cha ombi la uthibitishaji. Hata hivyo, sikuweza kuifanya ifanye kazi na haikufaa kutumia muda mwingi kwayo kwa hivyo natumia tu [kichanganuzi cha XML cha matumizi ya jumla](https://www.npmjs.com/package/fast-xml-parser). Taarifa tunayohitaji ni sifa ya `ID` ndani ya lebo ya `<samlp:AuthnRequest>`, ambayo iko kwenye kiwango cha juu cha XML.

## Kutumia sahihi za Ethereum {#using-ethereum-signatures}

Sasa kwa kuwa tunaweza kutuma utambulisho wa mtumiaji kwa mtoa huduma, hatua inayofuata ni kupata utambulisho wa mtumiaji kwa njia inayoaminika. Viem inaturuhusu tu kuuuliza mkoba anwani ya mtumiaji, lakini hii inamaanisha kukiuliza kivinjari taarifa hiyo. Hatudhibiti kivinjari, kwa hivyo hatuwezi kuamini kiotomatiki majibu tunayopata kutoka kwake.

Badala yake, IdP itatuma mfuatano kwa kivinjari ili usainiwe. Ikiwa mkoba kwenye kivinjari utasaini mfuatano huu, inamaanisha kwamba kweli ni anwani hiyo (yaani, inajua ufunguo wa siri unaolingana na anwani hiyo).

Ili kuona hili likifanya kazi, simamisha IdP na SP zilizopo na uendeshe amri hizi:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Kisha vinjari [hadi kwenye SP](http://localhost:3000) na ufuate maelekezo.

Kumbuka kwamba katika hatua hii hatujui jinsi ya kupata anwani ya barua pepe kutoka kwenye anwani ya Ethereum, kwa hivyo badala yake tunaripoti `<ethereum address>@bad.email.address` kwa SP.

### Maelezo ya kina {#detailed-explanation-2}

Mabadiliko yako katika hatua ya 4-5 katika mchoro uliopita.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Faili pekee tulilobadilisha ni `idp.mts`. Hapa kuna sehemu zilizobadilishwa.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Tunahitaji maktaba hizi mbili za ziada. Tunatumia [`uuid`](https://www.npmjs.com/package/uuid) kuunda thamani ya [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce). Thamani yenyewe haijalishi, isipokuwa ukweli kwamba inatumika mara moja tu.

Maktaba ya [`viem`](https://viem.sh/) inaturuhusu kutumia ufafanuzi wa Ethereum. Hapa tunaitegemea kuthibitisha kwamba sahihi ni halali kweli.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Mkoba unamwomba mtumiaji ruhusa ya kusaini ujumbe. Ujumbe ambao ni nonsi tu unaweza kuwachanganya watumiaji, kwa hivyo tunajumuisha kidokezo hiki.

```typescript
// Hifadhi requestIDs hapa
let nonces = {}
```

Tunahitaji taarifa ya ombi ili kuweza kulijibu. Tungeweza kuituma pamoja na ombi (hatua ya 4), na kuipokea tena (hatua ya 5). Hata hivyo, hatuwezi kuamini taarifa tunayopata kutoka kwenye kivinjari, ambacho kiko chini ya udhibiti wa mtumiaji anayeweza kuwa na nia mbaya. Kwa hivyo ni bora kuihifadhi hapa, na nonsi kama ufunguo.

Kumbuka kwamba tunafanya hivi hapa kama kigezo kwa ajili ya urahisi. Hata hivyo, hii ina hasara kadhaa:

- Tuko hatarini kwa shambulio la kunyimwa huduma. Mtumiaji mwenye nia mbaya anaweza kujaribu kuingia mara nyingi, na kujaza kumbukumbu yetu.
- Ikiwa mchakato wa IdP unahitaji kuanzishwa upya, tunapoteza thamani zilizopo.
- Hatuwezi kusawazisha mzigo kwenye michakato mingi, kwa sababu kila mmoja ungekuwa na kigezo chake.

Kwenye mfumo wa uzalishaji tungetumia hifadhidata na kutekeleza aina fulani ya utaratibu wa kuisha muda wake.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Unda nonsi, na uhifadhi `requestId` kwa matumizi ya baadaye.

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

Tunahitaji kazi kadhaa kutoka `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Tunaweza kufanya kazi tu ikiwa kuna mkoba kwenye kivinjari.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Omba orodha ya akaunti kutoka kwenye mkoba (`window.ethereum`). Chukulia kuna angalau moja, na uhifadhi ya kwanza tu. 

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

Mwombe mtumiaji asaini ujumbe. Kwa sababu HTML hii yote iko katika [mfuatano wa kiolezo](https://viem.sh/docs/clients/wallet), tunaweza kutumia vigezo vilivyofafanuliwa katika mchakato wa idp. Hii ni hatua ya 4.5 katika mchoro wa mfuatano.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Elekeza kwingine kwenye `/idp/signature/<nonce>/<address>/<signature>`. Hii ni hatua ya 5 katika mchoro wa mfuatano.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Sahihi inatumwa tena na kivinjari, ambacho kinaweza kuwa na nia mbaya (hakuna kinachokuzuia kufungua tu `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` kwenye kivinjari). Kwa hivyo, ni muhimu kuthibitisha mchakato wa IdP unashughulikia sahihi mbaya kwa usahihi.

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

Iliyosalia ni HTML ya kawaida tu.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Hiki ni kishughulikiaji cha hatua ya 5 katika mchoro wa mfuatano.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Pata kitambulisho cha ombi, na ufute nonsi kutoka `nonces` ili kuhakikisha haiwezi kutumika tena.

```typescript
  try {
```

Kwa sababu kuna njia nyingi ambazo sahihi inaweza kuwa batili, tunafunga hii katika kizuizi cha `try ... catch` ili kunasa makosa yoyote yaliyotupwa.

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

Sehemu iliyosalia ya kishughulikiaji ni sawa na kile tulichofanya katika kishughulikiaji cha `/loginSubmitted` hapo awali, isipokuwa kwa mabadiliko moja madogo.

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

Hatuna anwani halisi ya barua pepe (tutaipata katika sehemu inayofuata), kwa hivyo kwa sasa tunarejesha anwani ya Ethereum na kuiweka alama wazi kama sio anwani ya barua pepe.


```typescript
// Kituo cha IdP kwa maombi ya kuingia
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Njia mbadala kwa sababu nilishindwa kufanya parseLoginRequest ifanye kazi.
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

Badala ya `getLoginPage`, sasa tumia `getSignaturePage` katika kishughulikiaji cha hatua ya 3.

## Kupata anwani ya barua pepe {#getting-the-email-address}

Hatua inayofuata ni kupata anwani ya barua pepe, kitambulisho kilichoombwa by mtoa huduma. Ili kufanya hivyo, tunatumia [Huduma ya Uthibitisho ya Ethereum (EAS)](https://attest.org/).

Njia rahisi zaidi ya kupata uthibitisho ni kutumia [API ya GraphQL](https://docs.attest.org/docs/developer-tools/api). Tunatumia hoja hii:

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

[`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) hii inajumuisha tu anwani ya barua pepe. Hoja hii inaomba uthibitisho wa skima hii. Mada ya uthibitisho inaitwa `recipient`. Kila mara ni anwani ya Ethereum.

Onyo: Njia tunayopata uthibitisho hapa ina masuala mawili ya usalama.

- Tunaenda kwenye mwisho wa API, `https://optimism.easscan.org/graphql`, ambayo ni kipengele kilichowekwa kati. Tunaweza kupata sifa ya `id` na kisha kufanya utafutaji mnyororoni ili kuthibitisha kwamba uthibitisho ni wa kweli, lakini mwisho wa API bado unaweza kudhibiti uthibitisho kwa kutotuambia kuuhusu. 

  Tatizo hili si gumu kutatua, tungeweza kuendesha mwisho wetu wenyewe wa GraphQL na kupata uthibitisho kutoka kwenye logi za mnyororo, lakini hiyo ni kupita kiasi kwa madhumuni yetu.

- Hatuangalii utambulisho wa mthibitishaji. Mtu yeyote anaweza kutulisha taarifa za uongo. Katika utekelezaji wa ulimwengu halisi tungekuwa na seti ya wathibitishaji wanaoaminika na kuangalia tu uthibitisho wao.

Ili kuona hili likifanya kazi, simamisha IdP na SP zilizopo na uendeshe amri hizi:

```sh
git checkout email-address
pnpm install
pnpm start
```

Kisha toa anwani yako ya barua pepe. Una njia mbili za kufanya hivyo:

- Ingiza mkoba ukitumia ufunguo wa siri, na utumie ufunguo wa siri wa majaribio `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Ongeza uthibitisho kwa anwani yako mwenyewe ya barua pepe:

  1. Vinjari hadi kwenye [skima katika kichunguzi cha uthibitisho](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Bofya **Thibitisha kwa Skima**.

  3. Weka anwani yako ya Ethereum kama mpokeaji, anwani yako ya barua pepe kama anwani ya barua pepe, na uchague **Mnyororoni**. Kisha ubofye **Fanya Uthibitisho**.

  4. Idhinisha muamala kwenye mkoba wako. Utahitaji baadhi ya ETH kwenye [Mnyororo wa vitalu wa Optimism](https://app.optimism.io/bridge/deposit) ili kulipia gesi.

Vyovyote vile, baada ya kufanya hivi vinjari hadi [http://localhost:3000](http://localhost:3000) na ufuate maelekezo. Ikiwa uliingiza ufunguo wa siri wa majaribio, barua pepe unayopokea ni `test_addr_0@example.com`. Ikiwa ulitumia anwani yako mwenyewe, inapaswa kuwa chochote ulichothibitisha.

### Maelezo ya kina {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Hatua mpya ni mawasiliano ya GraphQL, hatua ya 5.6 na 5.7.

Tena, hapa kuna sehemu zilizobadilishwa za `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Ingiza maktaba tunazohitaji.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Kuna [mwisho tofauti kwa kila mnyororo wa vitalu](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Unda mteja mpya wa `GraphQLClient` tunaoweza kutumia kwa kuhoji mwisho.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL inatupa tu kipengee cha data kisicho wazi chenye baiti. Ili kuielewa tunahitaji skima. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Kazi ya kupata kutoka kwenye anwani ya Ethereum hadi kwenye anwani ya barua pepe.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Hii ni hoja ya GraphQL.

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

Uthibitisho tunaotaka ni ule ulio katika skima yetu, ambapo mpokeaji ni `getAddress(ethAddr)`. Kazi ya [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) inahakikisha anwani yetu ina [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) sahihi. Hii ni muhimu kwa sababu GraphQL inajali herufi kubwa na ndogo. "0xBAD060A7", "0xBad060A7", na "0xbad060a7" ni thamani tofauti.

```typescript
        take: 1
```

Bila kujali tunapata uthibitisho wangapi, tunataka wa kwanza tu.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Nyanja tunazotaka kupokea.

- `attester`: Anwani iliyowasilisha uthibitisho. Kwa kawaida hii inatumika kuamua kama kuamini uthibitisho au la.
- `id`: Kitambulisho cha uthibitisho. Unaweza kutumia thamani hii [kusoma uthibitisho mnyororoni](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) ili kuthibitisha kwamba taarifa kutoka kwenye hoja ya GraphQL ni sahihi.
- `data`: Data ya skima (katika hali hii, anwani ya barua pepe).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Ikiwa hakuna uthibitisho, rejesha thamani ambayo ni wazi si sahihi, lakini ambayo ingeonekana halali kwa mtoa huduma.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Ikiwa kuna thamani, tumia `decodeData` kusimbua data. Hatuhitaji data fafanuzi inayoitoa, isipokuwa thamani yenyewe tu.

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

## Vipi kuhusu ugatuzi? {#what-about-decentralization}

Katika usanidi huu watumiaji hawawezi kujifanya kuwa mtu ambaye sio, mradi tu tunategemea wathibitishaji wanaoaminika kwa uchoraji wa ramani wa Ethereum hadi anwani ya barua pepe. Hata hivyo, mtoa utambulisho wetu bado ni kipengele kilichowekwa kati. Yeyote aliye na ufunguo wa siri wa mtoa utambulisho anaweza kutuma taarifa za uongo kwa mtoa huduma.

Kunaweza kuwa na suluhisho kwa kutumia [ukokotoaji wa pande nyingi (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Natumai kuandika kuihusu katika mafunzo yajayo.

## Hitimisho {#conclusion}

Kupitishwa kwa kiwango cha kuingia, kama vile sahihi za Ethereum, kunakabiliwa na tatizo la kuku na yai. Watoa huduma wanataka kuvutia soko pana iwezekanavyo. Watumiaji wanataka kuweza kufikia huduma bila kuwa na wasiwasi kuhusu kusaidia kiwango chao cha kuingia.
Kuunda adapta, kama vile Ethereum IdP, kunaweza kutusaidia kuvuka kikwazo hiki.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).