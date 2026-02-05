---
title: "Použití Etherea pro web2 autentizaci"
description: "Po přečtení tohoto tutoriálu bude vývojář schopen integrovat přihlášení přes Ethereum (web3) s přihlášením SAML, což je standard používaný ve web2 k poskytování jednotného přihlášení a dalších souvisejících služeb. To umožňuje, aby byl přístup ke zdrojům web2 autentizován prostřednictvím podpisů Etherea, s uživatelskými atributy pocházejícími z atestací."
author: Ori Pomerantz
tags: [ "web2", "ověření", "eas" ]
skill: beginner
lang: cs
published: 2025-04-30
---

## Úvod

[SAML](https://www.onelogin.com/learn/saml) je standard používaný na web2, který umožňuje [poskytovateli identity (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) poskytovat informace o uživateli [poskytovatelům služeb (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

V tomto tutoriálu se dozvíte, jak integrovat podpisy Etherea se SAML, abyste uživatelům umožnili používat jejich peněženky Ethereum k vlastní autentizaci u služeb web2, které ještě nativně nepodporují Ethereum.

Upozorňujeme, že tento tutoriál je napsán pro dvě samostatné skupiny čtenářů:

- Lidi z komunity Etherea, kteří Ethereu rozumí a potřebují se naučit SAML
- Lidi z web2, kteří rozumí SAML a web2 autentizaci a potřebují se naučit o Ethereu

V důsledku toho bude obsahovat spoustu úvodního materiálu, který již znáte. Klidně ho přeskočte.

### SAML pro lidi z komunity Etherea

SAML je centralizovaný protokol. Poskytovatel služeb (SP) přijímá tvrzení (například „toto je můj uživatel John, měl by mít oprávnění provádět A, B a C“) od poskytovatele identity (IdP) pouze pokud s ním má již existující vztah důvěry, nebo s [certifikační autoritou](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), která podepsala certifikát daného IdP.

Například SP může být cestovní kancelář poskytující cestovní služby firmám a IdP může být interní webová stránka firmy. Když si zaměstnanci potřebují rezervovat služební cestu, cestovní kancelář je odešle k autentizaci firmou, než jim skutečně umožní cestu rezervovat.

![Proces SAML krok za krokem](./fig-01-saml.png)

Tímto způsobem si tři entity, prohlížeč, SP a IdP, vyjednávají přístup. SP nemusí předem vědět nic o uživateli používajícím prohlížeč, stačí, když důvěřuje IdP.

### Ethereum pro lidi znalé SAML

Ethereum je decentralizovaný systém.

![Přihlášení přes Ethereum](./fig-02-eth-logon.png)

Uživatelé mají privátní klíč (obvykle uložený v rozšíření prohlížeče). Z privátního klíče můžete odvodit veřejný klíč a z něj 20bajtovou adresu. Když se uživatelé potřebují přihlásit do systému, jsou požádáni o podepsání zprávy s hodnotou nonce (jednorázově použitelná hodnota). Server může ověřit, že podpis byl vytvořen touto adresou.

![Získávání dodatečných dat z atestací](./fig-03-eas-data.png)

Podpis pouze ověřuje adresu Etherea. Chcete-li získat další atributy uživatele, obvykle používáte [atestace](https://attest.org/). Atestace má obvykle tato pole:

- **Atestátor**, adresa, která provedla atestaci
- **Příjemce**, adresa, které se atestace týká
- **Data**, atestovaná data, jako je jméno, oprávnění atd.
- **Schéma**, ID schématu použitého k interpretaci dat.

Vzhledem k decentralizované povaze Etherea může atestace provádět kterýkoli uživatel. Identita atestátora je důležitá pro identifikaci atestací, které považujeme za spolehlivé.

## Nastavení

Prvním krokem je zajistit komunikaci mezi SAML SP a SAML IdP.

1. Stáhněte si software. Vzorový software pro tento článek je [na GitHubu](https://github.com/qbzzt/250420-saml-ethereum). Různé fáze jsou uloženy v různých větvích, pro tuto fázi chcete `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Vytvořte klíče s certifikáty s vlastním podpisem (self-signed). To znamená, že klíč je svou vlastní certifikační autoritou a je třeba jej ručně importovat do poskytovatele služeb. Více informací naleznete v [dokumentaci OpenSSL](https://docs.openssl.org/master/man1/openssl-req/).

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Spusťte servery (SP i IdP)

    ```sh
    pnpm start
    ```

4. Přejděte na adresu URL SP [http://localhost:3000/](http://localhost:3000/) a kliknutím na tlačítko budete přesměrováni na IdP (port 3001).

5. Poskytněte IdP svou e-mailovou adresu a klikněte na **Přihlásit se k poskytovateli služeb**. Uvidíte, že budete přesměrováni zpět k poskytovateli služeb (port 3000) a že vás pozná podle vaší e-mailové adresy.

### Podrobné vysvětlení

Toto se děje krok za krokem:

![Běžné přihlášení SAML bez Etherea](./fig-04-saml-no-eth.png)

#### src/config.mts

Tento soubor obsahuje konfiguraci jak pro poskytovatele identity, tak pro poskytovatele služeb. Obvykle by se jednalo o různé entity, ale zde můžeme pro zjednodušení sdílet kód.

```typescript
const fs = await import("fs")

const protocol="http"
```

Zatím jen testujeme, takže je v pořádku používat HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Načtení veřejných klíčů, které jsou normálně dostupné oběma komponentám (a jsou buď přímo důvěryhodné, nebo podepsané důvěryhodnou certifikační autoritou).

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

Adresy URL pro obě komponenty.

```typescript
export const spPublicData = {
```

Veřejná data pro poskytovatele služeb.

```typescript
    entityID: `${spUrl}/metadata`,
```

Podle konvence je v SAML `entityID` adresa URL, na které jsou dostupná metadata entity. Tato metadata odpovídají zdejším veřejným datům, s výjimkou toho, že jsou ve formátu XML.

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

Nejdůležitější definicí pro naše účely je `assertionConsumerServer`. To znamená, že abychom poskytovateli služeb mohli něco potvrdit (například, že „uživatel, který vám posílá tyto informace, je nekdo@example.com“), musíme použít [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) na URL `http://localhost:3000/sp/assertion`.

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

Veřejná data pro poskytovatele identity jsou podobná. Určuje, že pro přihlášení uživatele je třeba odeslat POST na `http://localhost:3001/idp/login` a pro odhlášení uživatele POST na `http://localhost:3001/idp/logout`.

#### src/sp.mts

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

Knihovna `samlify` očekává balíček, který ověří, že XML je správné, podepsané očekávaným veřejným klíčem atd. Pro tento účel používáme [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) v [`expressu`](https://expressjs.com/) je „mini webová stránka“, kterou lze připojit k webové stránce. V tomto případě jej používáme ke seskupení všech definic poskytovatele služeb dohromady.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Vlastní reprezentace poskytovatele služeb se skládá ze všech veřejných dat a privátního klíče, který používá k podepisování informací.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Veřejná data obsahují vše, co poskytovatel služeb potřebuje vědět o poskytovateli identity.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Pro zajištění interoperability s ostatními komponentami SAML by poskytovatelé služeb a identity měli mít svá veřejná data (nazývaná metadata) dostupná ve formátu XML na adrese `/metadata`.

```typescript
spRouter.post(`/assertion`, 
```

Toto je stránka, na kterou prohlížeč přistupuje, aby se identifikoval. Tvrzení obsahuje identifikátor uživatele (zde používáme e-mailovou adresu) a může obsahovat další atributy. Toto je obslužný program pro krok 7 ve výše uvedeném sekvenčním diagramu.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Pomocí zakomentovaného příkazu můžete zobrazit data XML poskytnutá v tvrzení. Je [kódován v base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Zpracujte požadavek na přihlášení od serveru identity.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Dobrý den, ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Odešlete odpověď HTML, abyste uživateli ukázali, že jsme obdrželi přihlášení.

```typescript
    } catch (err) {
      console.error('Chyba při zpracování odpovědi SAML:', err);
      res.status(400).send('Ověření SAML se nezdařilo');
    }
  }
)
```

V případě selhání informujte uživatele.

```typescript
spRouter.get('/login',
```

Vytvořte požadavek na přihlášení, když se prohlížeč pokusí o přístup na tuto stránku. Toto je obslužný program pro krok 1 ve výše uvedeném sekvenčním diagramu.

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

Tato stránka automaticky odešle formulář (viz níže). Díky tomu uživatel nemusí pro přesměrování nic dělat. Toto je krok 2 ve výše uvedeném sekvenčním diagramu.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Odešlete POST na `loginRequest.entityEndpoint` (adresa URL koncového bodu poskytovatele identity).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Název vstupu je `loginRequest.type` (`SAMLRequest`). Obsah tohoto pole je `loginRequest.context`, což je opět XML kódované v base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Tento middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) čte tělo [požadavku HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Ve výchozím nastavení ho Express ignoruje, protože většina požadavků ho nevyžaduje. Potřebujeme ho, protože POST používá tělo.

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
           Klikněte zde pro přihlášení
        </button>
      </body>
    </html>
  `)
})
```

Pokud se prohlížeč pokusí získat kořenový adresář, poskytněte mu odkaz na přihlašovací stránku.

```typescript
app.listen(config.spPort, () => {
  console.log(`poskytovatel služeb běží na http://${config.spHostname}:${config.spPort}`)
})
```

Naslouchejte na portu `spPort` pomocí této aplikace Express.

#### src/idp.mts

Toto je poskytovatel identity. Je velmi podobný poskytovateli služeb, níže uvedená vysvětlení se týkají částí, které se liší.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Zachovat atributy
    attributeNamePrefix: "@_", // Prefix pro atributy
  }
)
```

Musíme si přečíst a porozumět požadavku XML, který obdržíme od poskytovatele služeb.

```typescript
const getLoginPage = requestId => `
```

Tato funkce vytváří stránku s automaticky odesílaným formulářem, který je vrácen v kroku 4 výše uvedeného sekvenčního diagramu.

```typescript
<html>
  <head>
    <title>Přihlašovací stránka</title>
  </head>
  <body>
    <h2>Přihlašovací stránka</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      E-mailová adresa: <input name="email" />
      <br />
      <button type="Submit">
        Přihlásit se k poskytovateli služeb
      </button>
```

Poskytovateli služeb posíláme dvě pole:

1. `requestId`, na které odpovídáme.
2. Identifikátor uživatele (prozatím používáme e-mailovou adresu, kterou uživatel poskytne).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Toto je obslužný program pro krok 5 ve výše uvedeném sekvenčním diagramu. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) vytváří odpověď na přihlášení.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Cílovou skupinou je poskytovatel služeb.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informace extrahované z požadavku. Jediný parametr, který nás v požadavku zajímá, je requestId, který umožňuje poskytovateli služeb párovat požadavky a jejich odpovědi.

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

Opět použijte automaticky odesílaný formulář. Toto je krok 6 ve výše uvedeném sekvenčním diagramu.

```typescript

// Koncový bod IdP pro požadavky na přihlášení
idpRouter.post(`/login`,
```

Toto je koncový bod, který přijímá požadavek na přihlášení od poskytovatele služeb. Toto je obslužný program pro krok 3 ve výše uvedeném sekvenčním diagramu.

```typescript
  async (req, res) => {
    try {
      // Dočasné řešení, protože se mi nepodařilo zprovoznit parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Měli bychom být schopni použít [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) ke čtení ID požadavku na ověření. Nepodařilo se mi to však zprovoznit a nestálo za to tím trávit spoustu času, tak jsem prostě použil [univerzální XML parser](https://www.npmjs.com/package/fast-xml-parser). Informace, kterou potřebujeme, je atribut `ID` uvnitř značky `<samlp:AuthnRequest>`, která je na nejvyšší úrovni XML.

## Použití podpisů Etherea

Nyní, když můžeme odeslat identitu uživatele poskytovateli služeb, dalším krokem je získat identitu uživatele důvěryhodným způsobem. Viem nám umožňuje jednoduše požádat peněženku o adresu uživatele, ale to znamená žádat o informace prohlížeč. Prohlížeč nemáme pod kontrolou, takže nemůžeme automaticky důvěřovat odpovědi, kterou od něj dostaneme.

Místo toho IdP pošle prohlížeči řetězec k podepsání. Pokud peněženka v prohlížeči tento řetězec podepíše, znamená to, že se skutečně jedná o tuto adresu (tj. zná privátní klíč, který adrese odpovídá).

Chcete-li to vidět v akci, zastavte stávající IdP a SP a spusťte tyto příkazy:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Poté přejděte [na SP](http://localhost:3000) a postupujte podle pokynů.

Všimněte si, že v tomto okamžiku nevíme, jak získat e-mailovou adresu z adresy Etherea, takže místo toho hlásíme SP `<adresa etherea>@bad.email.address`.

### Podrobné vysvětlení

Změny jsou v krocích 4–5 v předchozím diagramu.

![SAML s podpisem Etherea](./fig-05-saml-w-signature.png)

Jediný soubor, který jsme změnili, je `idp.mts`. Zde jsou změněné části.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Potřebujeme tyto dvě další knihovny. K vytvoření hodnoty [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) používáme [`uuid`](https://www.npmjs.com/package/uuid). Na samotné hodnotě nezáleží, jen na tom, že je použita pouze jednou.

Knihovna [`viem`](https://viem.sh/) nám umožňuje používat definice Etherea. Zde ji potřebujeme k ověření, že podpis je skutečně platný.

```typescript
const loginPrompt = "Pro přístup k poskytovateli služeb podepište tuto hodnotu nonce: "
```

Peněženka požádá uživatele o povolení podepsat zprávu. Zpráva, která je pouze hodnotou nonce, by mohla uživatele zmást, proto uvádíme tuto výzvu.

```typescript
// Zde si ponechte requestID
let nonces = {}
```

Potřebujeme informace o požadavku, abychom na něj mohli odpovědět. Mohli bychom ho poslat s požadavkem (krok 4) a přijmout ho zpět (krok 5). Nemůžeme však důvěřovat informacím, které získáváme z prohlížeče, který je pod kontrolou potenciálně nepřátelského uživatele. Je tedy lepší jej uložit zde s hodnotou nonce jako klíčem.

Všimněte si, že pro zjednodušení to zde děláme jako proměnnou. To má však několik nevýhod:

- Jsme zranitelní vůči útoku typu odepření služby (denial of service). Uživatel se zlými úmysly by se mohl pokusit přihlásit vícekrát a zaplnit tak naši paměť.
- Pokud je třeba proces IdP restartovat, ztratíme stávající hodnoty.
- Nemůžeme rozkládat zátěž mezi více procesů, protože každý by měl svou vlastní proměnnou.

Na produkčním systému bychom použili databázi a implementovali nějaký mechanismus pro vypršení platnosti.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Vytvořte hodnotu nonce a uložte `requestId` pro budoucí použití.

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
          alert("Nainstalujte si prosím MetaMask nebo kompatibilní peněženku a poté stránku znovu načtěte")
      }
```

Pracovat můžeme pouze v případě, že je v prohlížeči peněženka.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Požádejte o seznam účtů z peněženky (`window.ethereum`). Předpokládejte, že existuje alespoň jeden, a uložte pouze ten první.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Vytvořte [klienta peněženky](https://viem.sh/docs/clients/wallet) pro interakci s peněženkou prohlížeče.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Požádejte uživatele o podepsání zprávy. Protože celé toto HTML je v [řetězci šablony](https://viem.sh/docs/clients/wallet), můžeme použít proměnné definované v procesu idp. Toto je krok 4.5 v sekvenčním diagramu.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Přesměrování na `/idp/signature/<nonce>/<adresa>/<podpis>`. Toto je krok 5 v sekvenčním diagramu.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Podpis je odeslán zpět prohlížečem, který může být potenciálně škodlivý (nic vám nebrání v tom, abyste v prohlížeči otevřeli adresu `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature`). Proto je důležité ověřit, že proces IdP správně zpracovává špatné podpisy.

```typescript
    </script>
  </head>
  <body>
    <h2>Prosím podepište</h2>
    <button onClick="window.goodSignature()">
      Odeslat dobrý (platný) podpis
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Odeslat špatný (neplatný) podpis
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

Toto je obslužný program pro krok 5 v sekvenčním diagramu.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Špatná hodnota nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Získejte ID požadavku a odstraňte hodnotu nonce z `nonces`, abyste se ujistili, že ji nelze znovu použít.

```typescript
  try {
```

Protože existuje mnoho způsobů, jak může být podpis neplatný, zabalíme to do bloku `try ...` `catch`, který zachytí jakékoli vyvolané chyby.

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
      throw("Špatný podpis")
  } catch (err) {
    res.send("Chyba:" + err)
    return ;
  }
```

Zbytek obslužného programu je ekvivalentní tomu, co jsme dělali v obslužném programu `/loginSubmitted` dříve, s výjimkou jedné malé změny.

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

Nemáme skutečnou e-mailovou adresu (získáme ji v další části), takže prozatím vracíme adresu Etherea a jasně ji označujeme jako e-mailovou adresu.

```typescript
// Koncový bod IdP pro požadavky na přihlášení
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Dočasné řešení, protože se mi nepodařilo zprovoznit parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Chyba při zpracování odpovědi SAML:', err);
      res.status(400).send('Ověření SAML se nezdařilo');
    }
  }
)
```

Místo `getLoginPage` nyní v obslužném programu kroku 3 použijte `getSignaturePage`.

## Získání e-mailové adresy

Dalším krokem je získání e-mailové adresy, identifikátoru požadovaného poskytovatelem služeb. K tomu používáme [službu Ethereum Attestation Service (EAS)](https://attest.org/).

Nejjednodušší způsob, jak získat atestace, je použít [GraphQL API](https://docs.attest.org/docs/developer-tools/api). Používáme tento dotaz:

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

Toto [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) obsahuje pouze e-mailovou adresu. Tento dotaz žádá o atestace tohoto schématu. Subjekt atestace se nazývá `recipient`. Je to vždy adresa Etherea.

Varování: Způsob, jakým zde získáváme atestace, má dva bezpečnostní problémy.

- Přistupujeme ke koncovému bodu API `https://optimism.easscan.org/graphql`, což je centralizovaná komponenta. Můžeme získat atribut `id` a poté provést ověření na blockchainu, abychom ověřili, že je atestace skutečná, ale koncový bod API může stále cenzurovat atestace tím, že nám o nich neřekne.

  Tento problém není neřešitelný, mohli bychom spustit vlastní koncový bod GraphQL a získat atestace z protokolů řetězce, ale to je pro naše účely zbytečné.

- Nebereme v úvahu identitu atestátora. Kdokoli nám může poskytnout nepravdivé informace. V reálné implementaci bychom měli sadu důvěryhodných atestátorů a zabývali bychom se pouze jejich atestacemi.

Chcete-li to vidět v akci, zastavte stávající IdP a SP a spusťte tyto příkazy:

```sh
git checkout email-address
pnpm install
pnpm start
```

Poté zadejte svou e-mailovou adresu. Máte dva způsoby, jak to udělat:

- Importujte peněženku pomocí privátního klíče a použijte testovací privátní klíč `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Přidejte atestaci pro svou vlastní e-mailovou adresu:

  1. Přejděte na [schéma v průzkumníku atestací](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Klikněte na **Atestovat se schématem**.

  3. Zadejte svou adresu Etherea jako příjemce, svou e-mailovou adresu jako e-mailovou adresu a vyberte **Onchain**. Poté klikněte na **Provést atestaci**.

  4. Schvalte transakci ve své peněžence. K zaplacení za palivo budete potřebovat nějaké ETH na [blockchainu Optimism](https://app.optimism.io/bridge/deposit).

Ať tak či onak, poté přejděte na [http://localhost:3000](http://localhost:3000) a postupujte podle pokynů. Pokud jste importovali testovací privátní klíč, e-mail, který obdržíte, je `test_addr_0@example.com`. Pokud jste použili vlastní adresu, měla by to být ta, kterou jste atestovali.

### Podrobné vysvětlení

![Získání e-mailu z adresy Etherea](./fig-06-saml-sig-n-email.png)

Nové kroky jsou komunikace GraphQL, kroky 5.6 a 5.7.

Opět zde jsou změněné části `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importujte knihovny, které potřebujeme.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Pro každý blockchain existuje [samostatný koncový bod](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Vytvořte nového klienta `GraphQLClient`, kterého můžeme použít pro dotazování koncového bodu.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL nám poskytuje pouze neprůhledný datový objekt s bajty. Abychom mu porozuměli, potřebujeme schéma.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Funkce pro získání e-mailové adresy z adresy Etherea.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Toto je dotaz GraphQL.

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

Atestace, které chceme, jsou ty v našem schématu, kde je příjemce `getAddress(ethAddr)`. Funkce [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) zajišťuje, že naše adresa má správný [kontrolní součet](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). To je nutné, protože GraphQL rozlišuje velikost písmen. „0xBAD060A7“, „0xBad060A7“ a „0xbad060a7“ jsou různé hodnoty.

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

Pole, která chceme obdržet.

- `attester`: Adresa, která atestaci odeslala. Obvykle se používá k rozhodnutí, zda atestaci důvěřovat, či nikoli.
- `id`: ID atestace. Tuto hodnotu můžete použít ke [čtení atestace na blockchainu](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64), abyste ověřili, že informace z dotazu GraphQL jsou správné.
- `data`: Data schématu (v tomto případě e-mailová adresa).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Pokud neexistuje žádná atestace, vraťte hodnotu, která je zjevně nesprávná, ale která by se poskytovateli služeb jevila jako platná.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Pokud existuje hodnota, použijte k dekódování dat `decodeData`. Nepotřebujeme metadata, která poskytuje, pouze samotnou hodnotu.

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

Pro získání e-mailové adresy použijte novou funkci.

## A co decentralizace?

V této konfiguraci se uživatelé nemohou vydávat za někoho, kým nejsou, pokud se spoléháme na důvěryhodné atestátory pro mapování adres Etherea na e-mailové adresy. Náš poskytovatel identity je však stále centralizovanou komponentou. Kdokoli, kdo má privátní klíč poskytovatele identity, může poskytovateli služeb posílat nepravdivé informace.

Může existovat řešení pomocí [více-stranného výpočtu (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Doufám, že o tom napíšu v budoucím tutoriálu.

## Závěr

Přijetí standardu pro přihlášení, jako jsou podpisy Etherea, se potýká s problémem slepice a vejce. Poskytovatelé služeb chtějí oslovit co nejširší trh. Uživatelé chtějí mít přístup ke službám, aniž by se museli starat o podporu svého standardu pro přihlášení.
Vytváření adaptérů, jako je Ethereum IdP, nám může pomoci překonat tuto překážku.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
