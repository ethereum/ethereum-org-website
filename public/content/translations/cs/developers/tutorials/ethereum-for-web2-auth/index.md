---
title: Použití Etherea pro autentizaci ve Web2
description: Po přečtení tohoto tutoriálu bude vývojář schopen integrovat přihlášení přes Ethereum (web3) s přihlášením přes SAML, což je standard používaný ve Web2 k poskytování jednotného přihlášení (single sign-on) a dalších souvisejících služeb. To umožňuje autentizovat přístup k Web2 zdrojům pomocí podpisů na Ethereu, přičemž atributy uživatele pocházejí z atestací.
author: Ori Pomerantz
tags:
  - Web2
  - autentizace
  - eas
skill: beginner
breadcrumb: Ethereum pro Web2 autentizaci
lang: cs
published: 2025-04-30
---

## Úvod {#introduction}

[SAML](https://www.onelogin.com/learn/saml) je standard používaný ve Web2, který umožňuje [poskytovateli identity (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) poskytovat informace o uživatelích [poskytovatelům služeb (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

V tomto tutoriálu se naučíte, jak integrovat podpisy na Ethereu se SAML, abyste uživatelům umožnili používat jejich peněženky na Ethereu k autentizaci do Web2 služeb, které zatím Ethereum nativně nepodporují.

Vezměte prosím na vědomí, že tento tutoriál je napsán pro dvě různé cílové skupiny:

- Lidi z Etherea, kteří rozumí Ethereu a potřebují se naučit SAML
- Lidi z Web2, kteří rozumí SAML a Web2 autentizaci a potřebují se naučit Ethereum

V důsledku toho bude obsahovat spoustu úvodních materiálů, které už možná znáte. Klidně je přeskočte.

### SAML pro lidi z Etherea {#saml-for-ethereum-people}

SAML je centralizovaný protokol. Poskytovatel služeb (SP) přijímá tvrzení (například „toto je můj uživatel John, měl by mít oprávnění dělat A, B a C“) od poskytovatele identity (IdP) pouze tehdy, pokud s ním má předem navázaný vztah důvěry, nebo s [certifikační autoritou](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), která podepsala certifikát daného IdP.

Například SP může být cestovní kancelář poskytující cestovní služby firmám a IdP může být interní webová stránka firmy. Když si zaměstnanci potřebují zarezervovat služební cestu, cestovní kancelář je před samotnou rezervací pošle k autentizaci do jejich firmy.

![Step by step SAML process](./fig-01-saml.png)

Tímto způsobem tyto tři subjekty – prohlížeč, SP a IdP – vyjednávají o přístupu. SP nepotřebuje o uživateli používajícím prohlížeč vědět předem vůbec nic, stačí mu pouze důvěřovat IdP.

### Ethereum pro lidi ze SAML {#ethereum-for-saml-people}

Ethereum je decentralizovaný systém. 

![Ethereum logon](./fig-02-eth-logon.png)

Uživatelé mají soukromý klíč (obvykle uložený v rozšíření prohlížeče). Ze soukromého klíče lze odvodit veřejný klíč a z něj 20bajtovou adresu. Když se uživatelé potřebují přihlásit do systému, jsou požádáni, aby podepsali zprávu s nonce (hodnotou na jedno použití). Server pak může ověřit, že podpis byl vytvořen touto adresou.

![Getting extra data from attestations](./fig-03-eas-data.png)

Podpis ověřuje pouze adresu na Ethereu. K získání dalších atributů uživatele se obvykle používají [atestace](https://attest.org/). Atestace má obvykle tyto pole:

- **Atestátor (Attestor)**, adresa, která atestaci provedla
- **Příjemce (Recipient)**, adresa, na kterou se atestace vztahuje
- **Data**, ověřovaná data, jako je jméno, oprávnění atd.
- **Schéma (Schema)**, ID schématu použitého k interpretaci dat.

Vzhledem k decentralizované povaze Etherea může atestace provádět jakýkoli uživatel. Identita atestátora je důležitá pro určení toho, které atestace považujeme za spolehlivé.

## Nastavení {#setup}

Prvním krokem je zajistit, aby spolu SAML SP a SAML IdP komunikovaly.

1. Stáhněte si software. Ukázkový software pro tento článek je [na GitHubu](https://github.com/qbzzt/250420-saml-ethereum). Různé fáze jsou uloženy v různých větvích, pro tuto fázi budete potřebovat `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Vytvořte klíče s certifikáty podepsanými samými sebou (self-signed). To znamená, že klíč je svou vlastní certifikační autoritou a musí být do poskytovatele služeb importován ručně. Další informace najdete v [dokumentaci OpenSSL](https://docs.openssl.org/master/man1/openssl-req/). 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Spusťte servery (jak SP, tak IdP)

    ```sh
    pnpm start
    ```

4. Přejděte na SP na URL [http://localhost:3000/](http://localhost:3000/) a klikněte na tlačítko pro přesměrování na IdP (port 3001).

5. Poskytněte IdP svou e-mailovou adresu a klikněte na **Login to the service provider**. Všimněte si, že budete přesměrováni zpět na poskytovatele služeb (port 3000) a že vás zná podle vaší e-mailové adresy.

### Podrobné vysvětlení {#detailed-explanation}

Zde je krok za krokem popsáno, co se stane:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Tento soubor obsahuje konfiguraci jak pro poskytovatele identity, tak pro poskytovatele služeb. Normálně by se jednalo o dva různé subjekty, ale zde můžeme pro zjednodušení sdílet kód.

```typescript
const fs = await import("fs")

const protocol="http"
```

Zatím jen testujeme, takže je v pořádku použít HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Načtěte veřejné klíče, které jsou normálně dostupné oběma komponentám (a buď jsou přímo důvěryhodné, nebo podepsané důvěryhodnou certifikační autoritou).

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

URL adresy pro obě komponenty.

```typescript
export const spPublicData = {
```

Veřejná data pro poskytovatele služeb.

```typescript
    entityID: `${spUrl}/metadata`,
```

Podle konvence je v SAML `entityID` URL adresa, kde jsou dostupná metadata dané entity. Tato metadata odpovídají zdejším veřejným datům, akorát jsou ve formátu XML.

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

Nejdůležitější definicí pro naše účely je `assertionConsumerServer`. Znamená to, že abychom poskytovateli služeb něco potvrdili (například „uživatel, který vám posílá tyto informace, je somebody@example.com“), musíme použít [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) na URL `http://localhost:3000/sp/assertion`.

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

Veřejná data pro poskytovatele identity jsou podobná. Specifikují, že pro přihlášení uživatele odešlete POST na `http://localhost:3001/idp/login` a pro odhlášení uživatele odešlete POST na `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Toto je kód, který implementuje poskytovatele služeb.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

K implementaci SAML používáme knihovnu [`samlify`](https://www.npmjs.com/package/samlify).

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Knihovna `samlify` očekává balíček, který ověří, že je XML správné, podepsané očekávaným veřejným klíčem atd. K tomuto účelu používáme [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) v [`express`](https://expressjs.com/) je „mini webová stránka“, kterou lze připojit (mount) uvnitř jiné webové stránky. V tomto případě jej používáme k seskupení všech definic poskytovatele služeb.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Vlastní reprezentace poskytovatele služeb se skládá ze všech veřejných dat a soukromého klíče, který používá k podepisování informací.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Veřejná data obsahují vše, co poskytovatel služeb potřebuje vědět o poskytovateli identity.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Aby byla umožněna interoperabilita s dalšími komponentami SAML, měli by poskytovatelé služeb a identity mít svá veřejná data (nazývaná metadata) dostupná ve formátu XML na `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Toto je stránka, ke které prohlížeč přistupuje, aby se identifikoval. Tvrzení (assertion) obsahuje identifikátor uživatele (zde používáme e-mailovou adresu) a může obsahovat další atributy. Toto je handler pro krok 7 ve výše uvedeném sekvenčním diagramu.

```typescript
  async (req, res) => {
    // console.log(`SAML odpověď:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Můžete použít zakomentovaný příkaz, abyste viděli XML data poskytnutá v tvrzení. Jsou [zakódována pomocí base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Zpracujte (parse) požadavek na přihlášení ze serveru identity.

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

Odešlete HTML odpověď, jen abyste uživateli ukázali, že jsme přihlášení přijali.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

V případě selhání informujte uživatele.

```typescript
spRouter.get('/login',
```

Vytvořte požadavek na přihlášení, když se prohlížeč pokusí získat tuto stránku. Toto je handler pro krok 1 ve výše uvedeném sekvenčním diagramu.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Získejte informace pro odeslání požadavku na přihlášení.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Tato stránka automaticky odešle formulář (viz níže). Tímto způsobem uživatel nemusí dělat nic, aby byl přesměrován. Toto je krok 2 ve výše uvedeném sekvenčním diagramu.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Odešlete POST na `loginRequest.entityEndpoint` (URL adresa koncového bodu poskytovatele identity).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Název vstupu je `loginRequest.type` (`SAMLRequest`). Obsahem tohoto pole je `loginRequest.context`, což je opět XML zakódované pomocí base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Tento middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) čte tělo [HTTP požadavku](https://www.tutorialspoint.com/http/http_requests.htm). Ve výchozím nastavení jej Express ignoruje, protože většina požadavků jej nevyžaduje. My jej potřebujeme, protože POST tělo používá.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Připojte router do adresáře poskytovatele služeb (`/sp`).

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

Pokud se prohlížeč pokusí získat kořenový adresář, poskytněte mu odkaz na přihlašovací stránku.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Naslouchejte na `spPort` s touto aplikací Express.

#### src/idp.mts {#srcidpmts}

Toto je poskytovatel identity. Je velmi podobný poskytovateli služeb, níže uvedená vysvětlení se týkají částí, které se liší.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Zachovat atributy
    attributeNamePrefix: "@_", // Prefix pro atributy
  }
)
```

Potřebujeme přečíst a porozumět XML požadavku, který obdržíme od poskytovatele služeb.

```typescript
const getLoginPage = requestId => `
```

Tato funkce vytvoří stránku s automaticky odesílaným formulářem, která se vrací v kroku 4 výše uvedeného sekvenčního diagramu.

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

Poskytovateli služeb odesíláme dvě pole:

1. `requestId`, na které odpovídáme.
2. Identifikátor uživatele (zatím používáme e-mailovou adresu, kterou uživatel poskytne).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Toto je handler pro krok 5 výše uvedeného sekvenčního diagramu. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) vytvoří odpověď na přihlášení. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Příjemcem (audience) je poskytovatel služeb.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informace extrahované z požadavku. Jediný parametr, který nás v požadavku zajímá, je requestId, který umožňuje poskytovateli služeb spárovat požadavky s jejich odpověďmi.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Zajistit podepsání
```

Potřebujeme `signingKey`, abychom měli data k podepsání odpovědi. Poskytovatel služeb nedůvěřuje nepodepsaným požadavkům.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Toto je pole s informacemi o uživateli, které posíláme zpět poskytovateli služeb.

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

Opět použijte automaticky odesílaný formulář. Toto je krok 6 výše uvedeného sekvenčního diagramu.

```typescript

// IdP endpoint pro požadavky na přihlášení
idpRouter.post(`/login`,
```

Toto je koncový bod, který přijímá požadavek na přihlášení od poskytovatele služeb. Toto je handler pro krok 3 výše uvedeného sekvenčního diagramu.

```typescript
  async (req, res) => {
    try {
      // Náhradní řešení, protože se mi nepodařilo zprovoznit parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Měli bychom být schopni použít [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) ke čtení ID požadavku na autentizaci. Nepodařilo se mi to však zprovoznit a nestálo za to trávit nad tím spoustu času, takže jsem prostě použil [obecný XML parser](https://www.npmjs.com/package/fast-xml-parser). Informace, kterou potřebujeme, je atribut `ID` uvnitř značky `<samlp:AuthnRequest>`, která je na nejvyšší úrovni XML.

## Použití podpisů na Ethereu {#using-ethereum-signatures}

Nyní, když můžeme odeslat identitu uživatele poskytovateli služeb, je dalším krokem získání identity uživatele důvěryhodným způsobem. Viem nám umožňuje jednoduše požádat peněženku o adresu uživatele, ale to znamená požádat o informace prohlížeč. Prohlížeč nemáme pod kontrolou, takže nemůžeme automaticky důvěřovat odpovědi, kterou z něj dostaneme.

Místo toho IdP pošle prohlížeči řetězec k podepsání. Pokud peněženka v prohlížeči tento řetězec podepíše, znamená to, že se skutečně jedná o danou adresu (to znamená, že zná soukromý klíč, který k adrese patří).

Chcete-li to vidět v akci, zastavte stávající IdP a SP a spusťte tyto příkazy:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Poté přejděte [na SP](http://localhost:3000) a postupujte podle pokynů.

Vezměte prosím na vědomí, že v tuto chvíli nevíme, jak získat e-mailovou adresu z adresy na Ethereu, takže místo toho nahlásíme SP `<ethereum address>@bad.email.address`.

### Podrobné vysvětlení {#detailed-explanation-2}

Změny jsou v krocích 4-5 v předchozím diagramu.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Jediný soubor, který jsme změnili, je `idp.mts`. Zde jsou změněné části.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Potřebujeme tyto dvě další knihovny. K vytvoření hodnoty [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) používáme [`uuid`](https://www.npmjs.com/package/uuid). Na samotné hodnotě nezáleží, jde jen o to, že se použije pouze jednou.

Knihovna [`viem`](https://viem.sh/) nám umožňuje používat definice Etherea. Zde ji potřebujeme k ověření, že je podpis skutečně platný.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Peněženka požádá uživatele o povolení podepsat zprávu. Zpráva, která je pouze nonce, by mohla uživatele zmást, proto přidáváme tuto výzvu.

```typescript
// Uchovávat requestIDs zde
let nonces = {}
```

Potřebujeme informace o požadavku, abychom na něj mohli odpovědět. Mohli bychom je odeslat s požadavkem (krok 4) a přijmout je zpět (krok 5). Nemůžeme však důvěřovat informacím, které získáme z prohlížeče, který je pod kontrolou potenciálně nepřátelského uživatele. Je tedy lepší je uložit zde, s nonce jako klíčem.

Vezměte prosím na vědomí, že to zde pro zjednodušení děláme jako proměnnou. To má však několik nevýhod:

- Jsme zranitelní vůči útoku typu odepření služby (Denial of Service). Zlomyslný uživatel by se mohl pokusit přihlásit vícekrát a zaplnit tak naši paměť.
- Pokud je nutné restartovat proces IdP, ztratíme stávající hodnoty.
- Nemůžeme rozložit zátěž (load balance) mezi více procesů, protože každý by měl svou vlastní proměnnou.

V produkčním systému bychom použili databázi a implementovali nějaký mechanismus expirace.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Vytvořte nonce a uložte `requestId` pro budoucí použití.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Tento JavaScript se spustí automaticky po načtení stránky.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Potřebujeme několik funkcí z `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Můžeme fungovat pouze tehdy, pokud je v prohlížeči peněženka.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Vyžádejte si seznam účtů z peněženky (`window.ethereum`). Předpokládejte, že existuje alespoň jeden, a uložte pouze ten první. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Vytvořte [klienta peněženky](https://viem.sh/docs/clients/wallet) pro interakci s peněženkou v prohlížeči.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Požádejte uživatele, aby podepsal zprávu. Protože je celé toto HTML v [šablonovém řetězci (template string)](https://viem.sh/docs/clients/wallet), můžeme použít proměnné definované v procesu IdP. Toto je krok 4.5 v sekvenčním diagramu.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Přesměrujte na `/idp/signature/<nonce>/<address>/<signature>`. Toto je krok 5 v sekvenčním diagramu.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Podpis je odeslán zpět prohlížečem, který je potenciálně škodlivý (nic vám nebrání v tom, abyste v prohlížeči jednoduše otevřeli `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`). Proto je důležité ověřit, že proces IdP správně zpracovává špatné podpisy.

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

Zbytek je jen standardní HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Toto je handler pro krok 5 v sekvenčním diagramu.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Získejte ID požadavku a odstraňte nonce z `nonces`, abyste se ujistili, že jej nelze znovu použít.

```typescript
  try {
```

Protože existuje tolik způsobů, jak může být podpis neplatný, zabalíme to do bloku `try ... catch`, abychom zachytili jakékoli vyhozené chyby.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Použijte [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) k implementaci kroku 5.5 v sekvenčním diagramu.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Zbytek handleru je ekvivalentní tomu, co jsme dělali v handleru `/loginSubmitted` dříve, s výjimkou jedné malé změny.

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

Nemáme skutečnou e-mailovou adresu (získáme ji v další části), takže prozatím vracíme adresu na Ethereu a jasně ji označíme, že to není e-mailová adresa.


```typescript
// IdP endpoint pro požadavky na přihlášení
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Náhradní řešení, protože se mi nepodařilo zprovoznit parseLoginRequest.
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

Místo `getLoginPage` nyní použijte `getSignaturePage` v handleru kroku 3.

## Získání e-mailové adresy {#getting-the-email-address}

Dalším krokem je získání e-mailové adresy, identifikátoru požadovaného poskytovatelem služeb. K tomu použijeme [Ethereum Attestation Service (EAS)](https://attest.org/).

Nejjednodušší způsob, jak získat atestace, je použít [GraphQL API](https://docs.attest.org/docs/developer-tools/api). Použijeme tento dotaz:

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

Toto [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) obsahuje pouze e-mailovou adresu. Tento dotaz žádá o atestace tohoto schématu. Předmět atestace se nazývá `recipient`. Je to vždy adresa na Ethereu.

Varování: Způsob, jakým zde získáváme atestace, má dva bezpečnostní problémy.

- Přistupujeme k API endpointu `https://optimism.easscan.org/graphql`, což je centralizovaná komponenta. Můžeme získat atribut `id` a poté provést vyhledávání onchain, abychom ověřili, že je atestace skutečná, ale API endpoint může atestace stále cenzurovat tím, že nám o nich neřekne. 

  Tento problém není neřešitelný, mohli bychom provozovat vlastní GraphQL endpoint a získávat atestace z logů řetězce, ale to je pro naše účely přehnané.

- Nedíváme se na identitu atestátora. Kdokoli nám může podstrčit falešné informace. V reálné implementaci bychom měli sadu důvěryhodných atestátorů a dívali bychom se pouze na jejich atestace.

Chcete-li to vidět v akci, zastavte stávající IdP a SP a spusťte tyto příkazy:

```sh
git checkout email-address
pnpm install
pnpm start
```

Poté zadejte svou e-mailovou adresu. Máte dva způsoby, jak to udělat:

- Importujte peněženku pomocí soukromého klíče a použijte testovací soukromý klíč `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Přidejte atestaci pro svou vlastní e-mailovou adresu:

  1. Přejděte na [schéma v průzkumníku atestací](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Klikněte na **Attest with Schema**.

  3. Zadejte svou adresu na Ethereu jako příjemce, svou e-mailovou adresu jako email address a vyberte **Onchain**. Poté klikněte na **Make Attestation**.

  4. Schvalte transakci ve své peněžence. Budete potřebovat nějaké ETH na [blockchainu Optimism](https://app.optimism.io/bridge/deposit) k zaplacení za gas.

Ať tak či onak, jakmile to uděláte, přejděte na [http://localhost:3000](http://localhost:3000) a postupujte podle pokynů. Pokud jste importovali testovací soukromý klíč, e-mail, který obdržíte, je `test_addr_0@example.com`. Pokud jste použili svou vlastní adresu, mělo by to být to, co jste atestovali.

### Podrobné vysvětlení {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Nové kroky jsou komunikace přes GraphQL, kroky 5.6 a 5.7.

Zde jsou opět změněné části `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importujte knihovny, které potřebujeme.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Existuje [samostatný endpoint pro každý blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Vytvořte nového klienta `GraphQLClient`, kterého můžeme použít k dotazování endpointu.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL nám dává pouze neprůhledný datový objekt s bajty. Abychom mu porozuměli, potřebujeme schéma. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Funkce pro získání e-mailové adresy z adresy na Ethereu.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Toto je GraphQL dotaz.

```typescript
      attestations(
```

Hledáme atestace.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Atestace, které chceme, jsou ty v našem schématu, kde je příjemcem `getAddress(ethAddr)`. Funkce [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) zajišťuje, že naše adresa má správný [kontrolní součet (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). To je nutné, protože GraphQL rozlišuje velká a malá písmena. „0xBAD060A7“, „0xBad060A7“ a „0xbad060a7“ jsou různé hodnoty.

```typescript
        take: 1
```

Bez ohledu na to, kolik atestací najdeme, chceme pouze tu první.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Pole, která chceme přijmout.

- `attester`: Adresa, která atestaci odeslala. Normálně se to používá k rozhodnutí, zda atestaci důvěřovat, nebo ne.
- `id`: ID atestace. Tuto hodnotu můžete použít k [přečtení atestace onchain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64), abyste ověřili, že informace z GraphQL dotazu jsou správné.
- `data`: Data schématu (v tomto případě e-mailová adresa).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Pokud neexistuje žádná atestace, vraťte hodnotu, která je zjevně nesprávná, ale poskytovateli služeb by se jevila jako platná.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Pokud hodnota existuje, použijte `decodeData` k dekódování dat. Nepotřebujeme metadata, která poskytuje, pouze samotnou hodnotu.

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

Použijte novou funkci k získání e-mailové adresy.

## A co decentralizace? {#what-about-decentralization}

V této konfiguraci uživatelé nemohou předstírat, že jsou někým, kým nejsou, pokud se spoléháme na důvěryhodné atestátory pro mapování adresy na Ethereu na e-mailovou adresu. Náš poskytovatel identity je však stále centralizovanou komponentou. Kdokoli má soukromý klíč poskytovatele identity, může poskytovateli služeb odesílat falešné informace.

Může existovat řešení využívající [vícestranné výpočty (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Doufám, že o tom napíšu v některém z budoucích tutoriálů.

## Závěr {#conclusion}

Přijetí standardu pro přihlašování, jako jsou podpisy na Ethereu, čelí problému slepice a vejce. Poskytovatelé služeb chtějí oslovit co nejširší trh. Uživatelé chtějí mít přístup ke službám, aniž by se museli starat o to, zda podporují jejich standard pro přihlašování.
Vytváření adaptérů, jako je Ethereum IdP, nám může pomoci tuto překážku překonat.

[Zde najdete další mou práci](https://cryptodocguy.pro/).