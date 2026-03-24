---
title: Utilizzare Ethereum per l'autenticazione web2
description: "Dopo aver letto questo tutorial, uno sviluppatore sarà in grado di integrare l'accesso di Ethereum (web3) con l'accesso SAML, uno standard utilizzato nel web2 per fornire il single sign-on e altri servizi correlati. Questo consente di autenticare l'accesso alle risorse web2 tramite le firme di Ethereum, con gli attributi dell'utente provenienti dalle attestazioni."
author: Ori Pomerantz
tags: ["web2", "autenticazione", "eas"]
skill: beginner
breadcrumb: Ethereum per l'autenticazione web2
lang: it
published: 2025-04-30
---

## Introduzione

[SAML](https://www.onelogin.com/learn/saml) è uno standard utilizzato nel web2 per consentire a un [provider di identità (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) di fornire informazioni sull'utente ai [provider di servizi (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)).

In questo tutorial imparerai come integrare le firme di Ethereum con SAML per consentire agli utenti di utilizzare i propri portafogli Ethereum per autenticarsi ai servizi web2 che non supportano ancora nativamente Ethereum.

Nota che questo tutorial è scritto per due tipi di pubblico distinti:

- Utenti di Ethereum che comprendono Ethereum e hanno bisogno di imparare SAML
- Utenti del web2 che comprendono SAML e l'autenticazione web2 e hanno bisogno di imparare Ethereum

Di conseguenza, conterrà molto materiale introduttivo che potresti già conoscere. Sentiti libero di saltarlo.

### SAML per gli utenti di Ethereum

SAML è un protocollo centralizzato. Un provider di servizi (SP) accetta asserzioni (come "questo è il mio utente John, dovrebbe avere i permessi per fare A, B e C") da un provider di identità (IdP) solo se ha una relazione di fiducia preesistente con esso, o con l'[autorità di certificazione](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) che ha firmato il certificato di quell'IdP.

Ad esempio, l'SP può essere un'agenzia di viaggi che fornisce servizi di viaggio alle aziende, e l'IdP può essere il sito web interno di un'azienda. Quando i dipendenti devono prenotare un viaggio di lavoro, l'agenzia di viaggi li invia per l'autenticazione da parte dell'azienda prima di consentire loro di prenotare effettivamente il viaggio.

![Processo SAML passo dopo passo](./fig-01-saml.png)

Questo è il modo in cui le tre entità, il browser, l'SP e l'IdP, negoziano l'accesso. L'SP non ha bisogno di sapere nulla in anticipo sull'utente che utilizza il browser, deve solo fidarsi dell'IdP.

### Ethereum per gli utenti di SAML

Ethereum è un sistema decentralizzato. 

![Accesso a Ethereum](./fig-02-eth-logon.png)

Gli utenti hanno una chiave privata (tipicamente conservata in un'estensione del browser). Dalla chiave privata è possibile derivare una chiave pubblica, e da questa un indirizzo di 20 byte. Quando gli utenti devono accedere a un sistema, viene loro richiesto di firmare un messaggio con un nonce (un valore monouso). Il server può verificare che la firma sia stata creata da quell'indirizzo.

![Ottenere dati extra dalle attestazioni](./fig-03-eas-data.png)

La firma verifica solo l'indirizzo di Ethereum. Per ottenere altri attributi dell'utente, in genere si utilizzano le [attestazioni](https://attest.org/). Un'attestazione ha tipicamente questi campi:

- **Attestatore**, l'indirizzo che ha effettuato l'attestazione
- **Destinatario**, l'indirizzo a cui si applica l'attestazione
- **Dati**, i dati attestati, come nome, permessi, ecc.
- **Schema**, l'ID dello schema utilizzato per interpretare i dati.

A causa della natura decentralizzata di Ethereum, qualsiasi utente può effettuare attestazioni. L'identità dell'attestatore è importante per identificare quali attestazioni consideriamo affidabili.

## Configurazione

Il primo passo è far comunicare tra loro un SP SAML e un IdP SAML.

1. Scarica il software. Il software di esempio per questo articolo è [su github](https://github.com/qbzzt/250420-saml-ethereum). Le diverse fasi sono memorizzate in rami diversi, per questa fase ti serve `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
```

2. Crea chiavi con certificati autofirmati. Questo significa che la chiave è la propria autorità di certificazione e deve essere importata manualmente nel provider di servizi. Consulta [la documentazione di OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) per maggiori informazioni. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
```

3. Avvia i server (sia SP che IdP)

    ```sh
    pnpm start
```

4. Naviga verso l'SP all'URL [http://localhost:3000/](http://localhost:3000/) e fai clic sul pulsante per essere reindirizzato all'IdP (porta 3001).

5. Fornisci all'IdP il tuo indirizzo e-mail e fai clic su **Login to the service provider**. Vedrai che verrai reindirizzato di nuovo al provider di servizi (porta 3000) e che ti riconoscerà tramite il tuo indirizzo e-mail.

### Spiegazione dettagliata

Questo è ciò che accade, passo dopo passo:

![Accesso SAML normale senza Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Questo file contiene la configurazione sia per il Provider di Identità che per il Provider di Servizi. Normalmente queste due sarebbero entità diverse, ma qui possiamo condividere il codice per semplicità.

```typescript
const fs = await import("fs")

const protocol="http"
```

Per ora stiamo solo testando, quindi va bene usare HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Leggi le chiavi pubbliche, che sono normalmente disponibili per entrambi i componenti (e considerate affidabili direttamente, o firmate da un'autorità di certificazione fidata).

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

Gli URL per entrambi i componenti.

```typescript
export const spPublicData = {
```

I dati pubblici per il provider di servizi.

```typescript
    entityID: `${spUrl}/metadata`,
```

Per convenzione, in SAML l'`entityID` è l'URL in cui sono disponibili i metadati dell'entità. Questi metadati corrispondono ai dati pubblici qui presenti, tranne per il fatto che sono in formato XML.

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

La definizione più importante per i nostri scopi è l'`assertionConsumerServer`. Significa che per asserire qualcosa (ad esempio, "l'utente che ti invia queste informazioni è somebody@example.com") al provider di servizi dobbiamo usare [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) all'URL `http://localhost:3000/sp/assertion`.

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

I dati pubblici per il provider di identità sono simili. Specificano che per far accedere un utente si effettua un POST a `http://localhost:3001/idp/login` e per disconnettere un utente si effettua un POST a `http://localhost:3001/idp/logout`.

#### src/sp.mts

Questo è il codice che implementa un provider di servizi.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Usiamo la libreria [`samlify`](https://www.npmjs.com/package/samlify) per implementare SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

La libreria `samlify` si aspetta di avere un pacchetto che convalidi che l'XML sia corretto, firmato con la chiave pubblica prevista, ecc. Usiamo [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) per questo scopo.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Un [`Router`](https://expressjs.com/en/5x/api.html#router) di [`express`](https://expressjs.com/) è un "mini sito web" che può essere montato all'interno di un sito web. In questo caso, lo usiamo per raggruppare tutte le definizioni del provider di servizi.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

La rappresentazione che il provider di servizi ha di se stesso è costituita da tutti i dati pubblici e dalla chiave privata che utilizza per firmare le informazioni.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

I dati pubblici contengono tutto ciò che il provider di servizi deve sapere sul provider di identità.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Per consentire l'interoperabilità con altri componenti SAML, i provider di servizi e di identità dovrebbero avere i loro dati pubblici (chiamati metadati) disponibili in formato XML in `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Questa è la pagina a cui accede il browser per identificarsi. L'asserzione include l'identificatore dell'utente (qui usiamo l'indirizzo e-mail) e può includere attributi aggiuntivi. Questo è il gestore per il passaggio 7 nel diagramma di sequenza sopra.

```typescript
  async (req, res) => {
    // console.log(`Risposta SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Puoi usare il comando commentato per vedere i dati XML forniti nell'asserzione. È [codificato in base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analizza la richiesta di accesso dal server di identità.

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

Invia una risposta HTML, solo per mostrare all'utente che abbiamo ricevuto l'accesso.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Informa l'utente in caso di fallimento.

```typescript
spRouter.get('/login',
```

Crea una richiesta di accesso quando il browser tenta di ottenere questa pagina. Questo è il gestore per il passaggio 1 nel diagramma di sequenza sopra.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Ottieni le informazioni per inviare una richiesta di accesso.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Questa pagina invia il modulo (vedi sotto) automaticamente. In questo modo l'utente non deve fare nulla per essere reindirizzato. Questo è il passaggio 2 nel diagramma di sequenza sopra.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Invia a `loginRequest.entityEndpoint` (l'URL dell'endpoint del provider di identità).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Il nome dell'input è `loginRequest.type` (`SAMLRequest`). Il contenuto per quel campo è `loginRequest.context`, che è di nuovo XML codificato in base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Questo middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) legge il corpo della [richiesta HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Per impostazione predefinita express lo ignora, perché la maggior parte delle richieste non lo richiede. Ne abbiamo bisogno perché POST utilizza il corpo.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Monta il router nella directory del provider di servizi (`/sp`).

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

Se un browser tenta di ottenere la directory principale, forniscigli un link alla pagina di accesso.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Ascolta la `spPort` con questa applicazione express.

#### src/idp.mts

Questo è il provider di identità. È molto simile al provider di servizi, le spiegazioni di seguito riguardano le parti che sono diverse.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserva gli attributi
    attributeNamePrefix: "@_", // Prefisso per gli attributi
  }
)
```

Dobbiamo leggere e comprendere la richiesta XML che riceviamo dal provider di servizi.

```typescript
const getLoginPage = requestId => `
```

Questa funzione crea la pagina con il modulo inviato automaticamente che viene restituita nel passaggio 4 del diagramma di sequenza sopra.

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

Ci sono due campi che inviamo al provider di servizi:

1. Il `requestId` a cui stiamo rispondendo.
2. L'identificatore dell'utente (per ora usiamo l'indirizzo e-mail fornito dall'utente).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Questo è il gestore per il passaggio 5 del diagramma di sequenza sopra. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) crea la risposta di accesso. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Il pubblico è il provider di servizi.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informazioni estratte dalla richiesta. L'unico parametro che ci interessa nella richiesta è il requestId, che consente al provider di servizi di far corrispondere le richieste e le relative risposte.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert } // Assicura la firma
```

Abbiamo bisogno di `signingKey` per avere i dati per firmare la risposta. Il provider di servizi non si fida delle richieste non firmate.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Questo è il campo con le informazioni sull'utente che inviamo di nuovo al provider di servizi.

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

Ancora una volta, usa un modulo inviato automaticamente. Questo è il passaggio 6 del diagramma di sequenza sopra.

```typescript

// Endpoint IdP per le richieste di login
idpRouter.post(`/login`,
```

Questo è l'endpoint che riceve una richiesta di accesso dal provider di servizi. Questo è il gestore del passaggio 3 del diagramma di sequenza sopra.

```typescript
  async (req, res) => {
    try {
      // Soluzione alternativa perché non sono riuscito a far funzionare parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Dovremmo essere in grado di usare [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) per leggere l'ID della richiesta di autenticazione. Tuttavia, non sono riuscito a farlo funzionare e non valeva la pena dedicarci molto tempo, quindi uso semplicemente un [parser XML di uso generale](https://www.npmjs.com/package/fast-xml-parser). L'informazione di cui abbiamo bisogno è l'attributo `ID` all'interno del tag `<samlp:AuthnRequest>`, che si trova al livello superiore dell'XML.

## Utilizzare le firme di Ethereum

Ora che possiamo inviare un'identità utente al provider di servizi, il passo successivo è ottenere l'identità utente in modo affidabile. Viem ci consente di chiedere semplicemente al portafoglio l'indirizzo dell'utente, ma questo significa chiedere le informazioni al browser. Non controlliamo il browser, quindi non possiamo fidarci automaticamente della risposta che ne otteniamo.

Invece, l'IdP invierà al browser una stringa da firmare. Se il portafoglio nel browser firma questa stringa, significa che è davvero quell'indirizzo (cioè, conosce la chiave privata che corrisponde all'indirizzo).

Per vederlo in azione, ferma l'IdP e l'SP esistenti ed esegui questi comandi:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Quindi naviga [verso l'SP](http://localhost:3000) e segui le indicazioni.

Nota che a questo punto non sappiamo come ottenere l'indirizzo e-mail dall'indirizzo di Ethereum, quindi riportiamo invece `<ethereum address>@bad.email.address` all'SP.

### Spiegazione dettagliata

Le modifiche sono nei passaggi 4-5 del diagramma precedente.

![SAML con una firma di Ethereum](./fig-05-saml-w-signature.png)

L'unico file che abbiamo modificato è `idp.mts`. Ecco le parti modificate.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Abbiamo bisogno di queste due librerie aggiuntive. Usiamo [`uuid`](https://www.npmjs.com/package/uuid) per creare il valore del [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Il valore in sé non ha importanza, solo il fatto che venga utilizzato una sola volta.

La libreria [`viem`](https://viem.sh/) ci consente di utilizzare le definizioni di Ethereum. Qui ne abbiamo bisogno per verificare che la firma sia effettivamente valida.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Il portafoglio chiede all'utente il permesso di firmare il messaggio. Un messaggio che è solo un nonce potrebbe confondere gli utenti, quindi includiamo questo prompt.

```typescript
// Mantieni qui i requestID
let nonces = {}
```

Abbiamo bisogno delle informazioni della richiesta per potervi rispondere. Potremmo inviarle con la richiesta (passaggio 4) e riceverle indietro (passaggio 5). Tuttavia, non possiamo fidarci delle informazioni che otteniamo dal browser, che è sotto il controllo di un utente potenzialmente ostile. Quindi è meglio memorizzarle qui, con il nonce come chiave.

Nota che lo stiamo facendo qui come variabile per motivi di semplicità. Tuttavia, questo presenta diversi svantaggi:

- Siamo vulnerabili a un attacco denial of service. Un utente malintenzionato potrebbe tentare di accedere più volte, riempiendo la nostra memoria.
- Se il processo IdP deve essere riavviato, perdiamo i valori esistenti.
- Non possiamo bilanciare il carico su più processi, perché ognuno avrebbe la propria variabile.

Su un sistema di produzione useremmo un database e implementeremmo un qualche tipo di meccanismo di scadenza.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Crea un nonce e memorizza il `requestId` per un uso futuro.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Questo JavaScript viene eseguito automaticamente quando la pagina viene caricata.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Abbiamo bisogno di diverse funzioni da `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Possiamo funzionare solo se c'è un portafoglio sul browser.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Richiedi l'elenco degli account dal portafoglio (`window.ethereum`). Supponi che ce ne sia almeno uno e memorizza solo il primo. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Crea un [client del portafoglio](https://viem.sh/docs/clients/wallet) per interagire con il portafoglio del browser.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Chiedi all'utente di firmare un messaggio. Poiché tutto questo HTML si trova in una [stringa di template](https://viem.sh/docs/clients/wallet), possiamo usare le variabili definite nel processo idp. Questo è il passaggio 4.5 nel diagramma di sequenza.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Reindirizza a `/idp/signature/<nonce>/<address>/<signature>`. Questo è il passaggio 5 nel diagramma di sequenza.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

La firma viene rispedita dal browser, che è potenzialmente dannoso (non c'è nulla che ti impedisca di aprire semplicemente `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` nel browser). Pertanto, è importante verificare che il processo IdP gestisca correttamente le firme errate.

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

Il resto è solo HTML standard.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Questo è il gestore per il passaggio 5 nel diagramma di sequenza.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Ottieni l'ID della richiesta ed elimina il nonce da `nonces` per assicurarti che non possa essere riutilizzato.

```typescript
  try {
```

Poiché ci sono così tanti modi in cui la firma può essere non valida, racchiudiamo questo in un blocco `try ... catch` per intercettare eventuali errori generati.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Usa [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) per implementare il passaggio 5.5 nel diagramma di sequenza.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Il resto del gestore è equivalente a quello che abbiamo fatto in precedenza nel gestore `/loginSubmitted`, ad eccezione di una piccola modifica.

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

Non abbiamo l'indirizzo e-mail effettivo (lo otterremo nella prossima sezione), quindi per ora restituiamo l'indirizzo di Ethereum e lo contrassegniamo chiaramente come non un indirizzo e-mail.


```typescript
// Endpoint IdP per le richieste di login
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Soluzione alternativa perché non sono riuscito a far funzionare parseLoginRequest.
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

Invece di `getLoginPage`, ora usa `getSignaturePage` nel gestore del passaggio 3.

## Ottenere l'indirizzo e-mail

Il passo successivo è ottenere l'indirizzo e-mail, l'identificatore richiesto dal provider di servizi. Per farlo, usiamo l'[Ethereum Attestation Service (EAS)](https://attest.org/).

Il modo più semplice per ottenere le attestazioni è usare l'[API GraphQL](https://docs.attest.org/docs/developer-tools/api). Usiamo questa query:

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

Questo [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) include solo un indirizzo e-mail. Questa query richiede le attestazioni di questo schema. Il soggetto dell'attestazione è chiamato `recipient` (destinatario). È sempre un indirizzo di Ethereum.

Attenzione: Il modo in cui stiamo ottenendo le attestazioni qui presenta due problemi di sicurezza.

- Stiamo andando all'endpoint dell'API, `https://optimism.easscan.org/graphql`, che è un componente centralizzato. Possiamo ottenere l'attributo `id` e poi fare una ricerca on-chain per verificare che un'attestazione sia reale, ma l'endpoint dell'API può comunque censurare le attestazioni non informandoci su di esse. 

  Questo problema non è impossibile da risolvere, potremmo eseguire il nostro endpoint GraphQL e ottenere le attestazioni dai log della catena, ma questo è eccessivo per i nostri scopi.

- Non guardiamo l'identità dell'attestatore. Chiunque può fornirci informazioni false. In un'implementazione nel mondo reale avremmo un insieme di attestatori fidati e guarderemmo solo le loro attestazioni.

Per vederlo in azione, ferma l'IdP e l'SP esistenti ed esegui questi comandi:

```sh
git checkout email-address
pnpm install
pnpm start
```

Quindi fornisci il tuo indirizzo e-mail. Hai due modi per farlo:

- Importa un portafoglio usando una chiave privata e usa la chiave privata di test `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Aggiungi un'attestazione per il tuo indirizzo e-mail:

  1. Naviga verso [lo schema nell'esploratore di attestazioni](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Fai clic su **Attest with Schema**.

  3. Inserisci il tuo indirizzo di Ethereum come destinatario, il tuo indirizzo e-mail come email address e seleziona **Onchain**. Quindi fai clic su **Make Attestation**.

  4. Approva la transazione nel tuo portafoglio. Avrai bisogno di un po' di ETH sulla [Blockchain di Optimism](https://app.optimism.io/bridge/deposit) per pagare il gas.

In ogni caso, dopo averlo fatto naviga verso [http://localhost:3000](http://localhost:3000) e segui le indicazioni. Se hai importato la chiave privata di test, l'e-mail che ricevi è `test_addr_0@example.com`. Se hai usato il tuo indirizzo, dovrebbe essere quello che hai attestato.

### Spiegazione dettagliata

![Passare dall'indirizzo di Ethereum all'e-mail](./fig-06-saml-sig-n-email.png)

I nuovi passaggi sono la comunicazione GraphQL, passaggi 5.6 e 5.7.

Ancora una volta, ecco le parti modificate di `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importa le librerie di cui abbiamo bisogno.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

C'è [un endpoint separato per ogni blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Crea un nuovo client `GraphQLClient` che possiamo usare per interrogare l'endpoint.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL ci fornisce solo un oggetto dati opaco con byte. Per capirlo abbiamo bisogno dello schema. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Una funzione per passare da un indirizzo di Ethereum a un indirizzo e-mail.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Questa è una query GraphQL.

```typescript
      attestations(
```

Stiamo cercando attestazioni.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Le attestazioni che vogliamo sono quelle nel nostro schema, in cui il destinatario è `getAddress(ethAddr)`. La funzione [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) si assicura che il nostro indirizzo abbia il [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) corretto. Questo è necessario perché GraphQL fa distinzione tra maiuscole e minuscole. "0xBAD060A7", "0xBad060A7" e "0xbad060a7" sono valori diversi.

```typescript
        take: 1
```

Indipendentemente da quante attestazioni troviamo, vogliamo solo la prima.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

I campi che vogliamo ricevere.

- `attester`: L'indirizzo che ha inviato l'attestazione. Normalmente questo viene utilizzato per decidere se fidarsi o meno dell'attestazione.
- `id`: L'ID dell'attestazione. Puoi usare questo valore per [leggere l'attestazione on-chain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) per verificare che le informazioni dalla query GraphQL siano corrette.
- `data`: I dati dello schema (in questo caso, l'indirizzo e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Se non c'è alcuna attestazione, restituisci un valore che è ovviamente errato, ma che apparirebbe valido al provider di servizi.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Se c'è un valore, usa `decodeData` per decodificare i dati. Non abbiamo bisogno dei metadati che fornisce, solo del valore stesso.

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

Usa la nuova funzione per ottenere l'indirizzo e-mail.

## E la decentralizzazione?

In questa configurazione gli utenti non possono fingere di essere qualcuno che non sono, a patto di affidarci ad attestatori fidati per la mappatura dall'indirizzo di Ethereum all'indirizzo e-mail. Tuttavia, il nostro provider di identità è ancora un componente centralizzato. Chiunque abbia la chiave privata del provider di identità può inviare informazioni false al provider di servizi.

Potrebbe esserci una soluzione che utilizza il [calcolo multiparte (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Spero di scriverne in un tutorial futuro.

## Conclusione

L'adozione di uno standard di accesso, come le firme di Ethereum, affronta il problema dell'uovo e della gallina. I provider di servizi vogliono attrarre il mercato più ampio possibile. Gli utenti vogliono poter accedere ai servizi senza doversi preoccupare di supportare il loro standard di accesso.
La creazione di adattatori, come un IdP di Ethereum, può aiutarci a superare questo ostacolo.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).