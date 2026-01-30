---
title: Uso di Ethereum per l'autenticazione web2
description: "Dopo aver letto questa guida, uno sviluppatore sarà in grado di integrare il login di Ethereum (web3) con il login SAML, uno standard utilizzato nel web2 per fornire il single sign-on e altri servizi correlati. Ciò consente di autenticare l'accesso alle risorse web2 attraverso le firme di Ethereum, con gli attributi dell'utente provenienti da attestazioni."
author: Ori Pomerantz
tags: [ "web2", "autenticazione", "eas" ]
skill: beginner
lang: it
published: 2025-04-30
---

## Introduzione

[SAML](https://www.onelogin.com/learn/saml) è uno standard utilizzato su web2 per consentire a un [fornitore di identità (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) di fornire informazioni sull'utente per [i fornitori di servizi (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

In questa guida imparerai come integrare le firme di Ethereum con SAML per consentire agli utenti di usare i loro portafogli Ethereum per autenticarsi ai servizi web2 che non supportano ancora Ethereum in modo nativo.

Nota che questa guida è scritta per due pubblici separati:

- Utenti di Ethereum che conoscono Ethereum e hanno bisogno di imparare SAML
- Utenti Web2 che conoscono SAML e l'autenticazione web2 e hanno bisogno di imparare Ethereum

Di conseguenza, conterrà molto materiale introduttivo che già conosci. Sentiti libero di saltarlo.

### SAML per gli utenti di Ethereum

SAML è un protocollo centralizzato. Un fornitore di servizi (SP) accetta asserzioni (come "questo è il mio utente John, dovrebbe avere i permessi per fare A, B e C") da un fornitore di identità (IdP) solo se ha una relazione di fiducia preesistente con esso, o con l'[autorità di certificazione](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) che ha firmato il certificato di quell'IdP.

Ad esempio, l'SP può essere un'agenzia di viaggi che fornisce servizi di viaggio alle aziende e l'IdP può essere il sito web interno di un'azienda. Quando i dipendenti devono prenotare viaggi di lavoro, l'agenzia di viaggi li invia per l'autenticazione da parte dell'azienda prima di permettere loro di prenotare effettivamente il viaggio.

![Processo SAML passo dopo passo](./fig-01-saml.png)

Questo è il modo in cui le tre entità, il browser, l'SP e l'IdP, negoziano l'accesso. L'SP non ha bisogno di sapere nulla in anticipo sull'utente che usa il browser, gli basta fidarsi dell'IdP.

### Ethereum per gli utenti SAML

Ethereum è un sistema decentralizzato.

![Accesso a Ethereum](./fig-02-eth-logon.png)

Gli utenti hanno una chiave privata (solitamente conservata in un'estensione del browser). Dalla chiave privata è possibile derivare una chiave pubblica, e da questa un indirizzo a 20 byte. Quando gli utenti devono accedere a un sistema, viene loro richiesto di firmare un messaggio con un nonce (un valore monouso). Il server può verificare che la firma è stata creata da quell'indirizzo.

![Ottenere dati aggiuntivi dalle attestazioni](./fig-03-eas-data.png)

La firma verifica solo l'indirizzo Ethereum. Per ottenere altri attributi dell'utente, solitamente si usano le [attestazioni](https://attest.org/). Un'attestazione ha in genere questi campi:

- **Attestatore**, l'indirizzo che ha effettuato l'attestazione
- **Destinatario**, l'indirizzo a cui si applica l'attestazione
- **Dati**, i dati oggetto di attestazione, come nome, permessi, ecc.
- **Schema**, l'ID dello schema utilizzato per interpretare i dati.

A causa della natura decentralizzata di Ethereum, qualsiasi utente può fare attestazioni. L'identità dell'attestatore è importante per identificare quali attestazioni consideriamo affidabili.

## Configurazione

Il primo passo è fare in modo che un SP SAML e un IdP SAML comunichino tra loro.

1. Scarica il software. Il software di esempio per questo articolo è [su GitHub](https://github.com/qbzzt/250420-saml-ethereum). Le diverse fasi sono memorizzate in diversi rami, per questa fase è necessario `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Crea chiavi con certificati autofirmati. Ciò significa che la chiave è la propria autorità di certificazione e deve essere importata manualmente nel fornitore di servizi. Consulta [la documentazione di OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) per maggiori informazioni.

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

4. Naviga fino all'SP all'URL [http://localhost:3000/](http://localhost:3000/) e fai clic sul pulsante per essere reindirizzato all'IdP (porta 3001).

5. Fornisci all'IdP il tuo indirizzo email e fai clic su **Login al fornitore di servizi**. Verifica di essere reindirizzato al fornitore di servizi (porta 3000) e che ti riconosca tramite il tuo indirizzo email.

### Spiegazione dettagliata

Ecco cosa succede, passo dopo passo:

![Accesso SAML normale senza Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Questo file contiene la configurazione sia per l'Identity Provider che per il Service Provider. Normalmente queste due sarebbero entità differenti, ma qui possiamo condividere il codice per semplicità.

```typescript
const fs = await import("fs")

const protocol="http"
```

Per ora stiamo solo testando, quindi va bene usare HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Leggi le chiavi pubbliche, che normalmente sono disponibili per entrambi i componenti (e sono affidabili direttamente o firmate da un'autorità di certificazione fidata).

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

I dati pubblici per il fornitore di servizi.

```typescript
    entityID: `${spUrl}/metadata`,
```

Per convenzione, in SAML `entityID` è l'URL in cui sono disponibili i metadati dell'entità. Questi metadati corrispondono ai dati pubblici qui, tranne per il fatto che sono in formato XML.

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

La definizione più importante per i nostri scopi è `assertionConsumerServer`. Significa che per asserire qualcosa (ad esempio, "l'utente che ti invia queste informazioni è somebody@example.com") al fornitore di servizi, dobbiamo usare [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) all'URL `http://localhost:3000/sp/assertion`.

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

I dati pubblici del fornitore di identità sono simili. Specifica che per far accedere un utente devi fare una richiesta POST a `http://localhost:3001/idp/login` e per disconnetterlo devi fare una richiesta POST a `http://localhost:3001/idp/logout`.

#### src/sp.mts

Questo è il codice che implementa un fornitore di servizi.

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

La libreria `samlify` si aspetta di avere un pacchetto che convalidi che l'XML sia corretto, firmato con la chiave pubblica prevista, ecc. A tale scopo, usiamo [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Un [`Router`](https://expressjs.com/en/5x/api.html#router) di [`express`](https://expressjs.com/) è un "mini sito web" che può essere montato all'interno di un sito web. In questo caso, lo usiamo per raggruppare tutte le definizioni del fornitore di servizi.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

La rappresentazione che il fornitore di servizi ha di se stesso comprende tutti i dati pubblici e la chiave privata che usa per firmare le informazioni.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

I dati pubblici contengono tutto ciò che il fornitore di servizi deve sapere sul fornitore di identità.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Per consentire l'interoperabilità con altri componenti SAML, i fornitori di servizi e di identità dovrebbero avere i loro dati pubblici (chiamati metadati) disponibili in formato XML in `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Questa è la pagina a cui accede il browser per identificarsi. L'asserzione include l'identificatore dell'utente (qui usiamo l'indirizzo email) e può includere attributi aggiuntivi. Questo è il gestore per il passaggio 7 nel diagramma di sequenza sopra.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

È possibile usare il comando commentato per visualizzare i dati XML forniti nell'asserzione. È [codificato in base64](https://en.wikipedia.org/wiki/Base64).

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

Informa l'utente in caso di errore.

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

Invia a `loginRequest.entityEndpoint` (l'URL dell'endpoint del fornitore di identità).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Il nome dell'input è `loginRequest.type` (`SAMLRequest`). Il contenuto di quel campo è `loginRequest.context`, che è di nuovo XML codificato in base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Questo middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) legge il corpo della [richiesta HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Per impostazione predefinita, express lo ignora, perché la maggior parte delle richieste non lo richiede. Ne abbiamo bisogno perché POST usa il corpo.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Monta il router nella directory del fornitore di servizi (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Fai clic qui per accedere
        </button>
      </body>
    </html>
  `)
})
```

Se un browser tenta di accedere alla directory principale, forniscigli un link alla pagina di accesso.

```typescript
app.listen(config.spPort, () => {
  console.log(`il fornitore di servizi è in esecuzione su http://${config.spHostname}:${config.spPort}`)
})
```

Ascolta la `spPort` con questa applicazione express.

#### src/idp.mts

Questo è il fornitore di identità. È molto simile al fornitore di servizi, le spiegazioni seguenti riguardano le parti che sono differenti.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Conserva gli attributi
    attributeNamePrefix: "@_", // Prefisso per gli attributi
  }
)
```

Dobbiamo leggere e comprendere la richiesta XML che riceviamo dal fornitore di servizi.

```typescript
const getLoginPage = requestId => `
```

Questa funzione crea la pagina con il modulo inviato automaticamente che viene restituito nel passaggio 4 del diagramma di sequenza sopra.

```typescript
<html>
  <head>
    <title>Pagina di accesso</title>
  </head>
  <body>
    <h2>Pagina di accesso</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Indirizzo email: <input name="email" />
      <br />
      <button type="Submit">
        Accedi al fornitore di servizi
      </button>
```

Ci sono due campi che inviamo al fornitore di servizi:

1. Il `requestId` a cui stiamo rispondendo.
2. L'identificatore dell'utente (per ora usiamo l'indirizzo email fornito dall'utente).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Questo è il gestore per il passaggio 5 nel diagramma di sequenza sopra. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) crea la risposta di accesso.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Il pubblico è il fornitore di servizi.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informazioni estratte dalla richiesta. L'unico parametro che ci interessa nella richiesta è il requestId, che consente al fornitore di servizi di abbinare le richieste e le loro risposte.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Assicura la firma
```

Abbiamo bisogno di `signingKey` per avere i dati per firmare la risposta. Il fornitore di servizi non si fida delle richieste non firmate.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Questo è il campo con le informazioni dell'utente che inviamo al fornitore di servizi.

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

Di nuovo, usa un modulo inviato automaticamente. Questo è il passaggio 6 del diagramma di sequenza sopra.

```typescript

// Endpoint IdP per le richieste di accesso
idpRouter.post(`/login`,
```

Questo è l'endpoint che riceve una richiesta di accesso dal fornitore di servizi. Questo è il gestore per il passaggio 3 del diagramma di sequenza sopra.

```typescript
  async (req, res) => {
    try {
      // Soluzione alternativa perché non sono riuscito a far funzionare parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Dovremmo essere in grado di usare [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) per leggere l'ID della richiesta di autenticazione. Tuttavia, non sono riuscito a farlo funzionare e non valeva la pena spenderci molto tempo, quindi ho usato un [parser XML generico](https://www.npmjs.com/package/fast-xml-parser). L'informazione di cui abbiamo bisogno è l'attributo `ID` all'interno del tag `<samlp:AuthnRequest>`, che si trova al livello più alto dell'XML.

## Uso delle firme di Ethereum

Ora che possiamo inviare un'identità utente al fornitore di servizi, il passo successivo è ottenere l'identità utente in modo affidabile. Viem ci permette di chiedere semplicemente al portafoglio l'indirizzo dell'utente, ma questo significa chiedere l'informazione al browser. Non controlliamo il browser, quindi non possiamo fidarci automaticamente della risposta che riceviamo da esso.

Invece, l'IdP invierà al browser una stringa da firmare. Se il portafoglio nel browser firma questa stringa, significa che è davvero quell'indirizzo (cioè, conosce la chiave privata che corrisponde all'indirizzo).

Per vederlo in azione, ferma l'IdP e l'SP esistenti ed esegui questi comandi:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Quindi naviga [all'SP](http://localhost:3000) e segui le indicazioni.

Nota che a questo punto non sappiamo come ottenere l'indirizzo email dall'indirizzo Ethereum, quindi, invece, segnaliamo `<indirizzo ethereum>@bad.email.address` all'SP.

### Spiegazione dettagliata

Le modifiche sono nei passaggi 4-5 del diagramma precedente.

![SAML con una firma di Ethereum](./fig-05-saml-w-signature.png)

L'unico file che abbiamo modificato è `idp.mts`. Ecco le parti modificate.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Abbiamo bisogno di queste due librerie aggiuntive. Usiamo [`uuid`](https://www.npmjs.com/package/uuid) per creare il valore [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Il valore in sé non ha importanza, solo il fatto che venga usato una sola volta.

La libreria [`viem`](https://viem.sh/) ci permette di usare le definizioni di Ethereum. Qui ne abbiamo bisogno per verificare che la firma sia effettivamente valida.

```typescript
const loginPrompt = "Per accedere al fornitore di servizi, firma questo nonce: "
```

Il portafoglio chiede all'utente il permesso di firmare il messaggio. Un messaggio che è solo un nonce potrebbe confondere gli utenti, quindi includiamo questo prompt.

```typescript
// Conserva i requestId qui
let nonces = {}
```

Abbiamo bisogno delle informazioni della richiesta per poter rispondere. Potremmo inviarle con la richiesta (passaggio 4) e riceverle indietro (passaggio 5). Tuttavia, non possiamo fidarci delle informazioni che otteniamo dal browser, che è sotto il controllo di un utente potenzialmente ostile. Quindi è meglio memorizzarle qui, con il nonce come chiave.

Nota che lo stiamo facendo qui come variabile per semplicità. Tuttavia, questo ha diversi svantaggi:

- Siamo vulnerabili a un attacco di negazione del servizio. Un utente malevolo potrebbe tentare di accedere più volte, riempiendo la nostra memoria.
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
          alert("Installa MetaMask o un portafoglio compatibile e poi ricarica")
      }
```

Possiamo lavorare solo se c'è un portafoglio nel browser.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Richiedi l'elenco dei conti dal portafoglio (`window.ethereum`). Supponi che ce ne sia almeno uno e memorizza solo il primo.

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

Chiedi all'utente di firmare un messaggio. Poiché tutto questo HTML si trova in una [stringa modello](https://viem.sh/docs/clients/wallet), possiamo usare variabili definite nel processo idp. Questo è il passaggio 4.5 nel diagramma di sequenza.

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

La firma viene restituita dal browser, che è potenzialmente malevolo (non c'è nulla che ti impedisca di aprire semplicemente `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` nel browser). Pertanto, è importante verificare che il processo IdP gestisca correttamente le firme errate.

```typescript
    </script>
  </head>
  <body>
    <h2>Per favore, firma</h2>
    <button onClick="window.goodSignature()">
      Invia una firma buona (valida)
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Invia una firma cattiva (invalida)
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
    res.send("Nonce errato")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Ottieni l'ID della richiesta ed elimina il nonce da `nonces` per assicurarti che non possa essere riutilizzato.

```typescript
  try {
```

Poiché ci sono tanti modi in cui la firma può essere non valida, avvolgiamo questo in un blocco `try ...` blocco `catch` per catturare eventuali errori lanciati.

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
      throw("Firma errata")
  } catch (err) {
    res.send("Errore:" + err)
    return ;
  }
```

Il resto del gestore è equivalente a ciò che abbiamo fatto in precedenza nel gestore `/loginSubmitted`, tranne per una piccola modifica.

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

Non abbiamo l'indirizzo email effettivo (lo otterremo nella prossima sezione), quindi per ora restituiamo l'indirizzo Ethereum e lo contrassegniamo chiaramente come non un indirizzo email.

```typescript
// Endpoint IdP per le richieste di accesso
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Soluzione alternativa perché non sono riuscito a far funzionare parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Errore nell'elaborazione della risposta SAML:', err);
      res.status(400).send('Autenticazione SAML fallita');
    }
  }
)
```

Invece di `getLoginPage`, ora usa `getSignaturePage` nel gestore del passaggio 3.

## Ottenere l'indirizzo email

Il passo successivo è ottenere l'indirizzo email, l'identificatore richiesto dal fornitore di servizi. Per farlo, usiamo [Ethereum Attestation Service (EAS)](https://attest.org/).

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

Questo [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) include solo un indirizzo e-mail. Questa query richiede le attestazioni di questo schema. Il soggetto dell'attestazione è chiamato `destinatario`. È sempre un indirizzo Ethereum.

Attenzione: il modo in cui stiamo ottenendo le attestazioni qui presenta due problemi di sicurezza.

- Stiamo andando all'endpoint API, `https://optimism.easscan.org/graphql`, che è un componente centralizzato. Possiamo ottenere l'attributo `id` e quindi fare una ricerca sulla catena per verificare che un'attestazione sia reale, ma l'endpoint dell'API può ancora censurare le attestazioni non informandoci della loro esistenza.

  Questo problema non è impossibile da risolvere, potremmo eseguire il nostro endpoint GraphQL e ottenere le attestazioni dai registri della catena, ma questo è eccessivo per i nostri scopi.

- Non guardiamo l'identità dell'attestatore. Chiunque può fornirci informazioni false. In un'implementazione reale, avremmo un set di attestatori fidati e guarderemmo solo le loro attestazioni.

Per vederlo in azione, ferma l'IdP e l'SP esistenti ed esegui questi comandi:

```sh
git checkout email-address
pnpm install
pnpm start
```

Quindi fornisci il tuo indirizzo e-mail. Hai due modi per farlo:

- Importa un portafoglio usando una chiave privata e usa la chiave privata di prova `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Aggiungi un'attestazione per il tuo indirizzo e-mail:

  1. Naviga [allo schema nell'esploratore di attestazioni](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Fai clic su **Attesta con Schema**.

  3. Inserisci il tuo indirizzo Ethereum come destinatario, il tuo indirizzo e-mail come indirizzo email e seleziona **Sulla catena**. Quindi fai clic su **Crea Attestazione**.

  4. Approva la transazione nel tuo portafoglio. Avrai bisogno di un po' di ETH sulla [Blockchain di Optimism](https://app.optimism.io/bridge/deposit) per pagare il gas.

In ogni caso, dopo aver fatto questo, naviga su [http://localhost:3000](http://localhost:3000) e segui le indicazioni. Se hai importato la chiave privata di prova, l'e-mail che ricevi è `test_addr_0@example.com`. Se hai usato il tuo indirizzo, dovrebbe essere quello che hai attestato.

### Spiegazione dettagliata

![Ottenere l'e-mail dall'indirizzo Ethereum](./fig-06-saml-sig-n-email.png)

I nuovi passaggi sono la comunicazione GraphQL, i passaggi 5.6 e 5.7.

Di nuovo, ecco le parti modificate di `idp.mts`.

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

Una funzione per passare da un indirizzo Ethereum a un indirizzo e-mail.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Questa è una query GraphQL.

```typescript
      attestazioni(
```

Stiamo cercando attestazioni.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Le attestazioni che vogliamo sono quelle nel nostro schema, in cui il destinatario è `getAddress(ethAddr)`. La funzione [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) si assicura che il nostro indirizzo abbia il [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) corretto. Questo è necessario perché GraphQL è sensibile alle maiuscole/minuscole. "0xBAD060A7", "0xBad060A7" e "0xbad060a7" sono valori diversi.

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

- `attestatore`: l'indirizzo che ha inviato l'attestazione. Normalmente questo viene usato per decidere se fidarsi o meno dell'attestazione.
- `id`: L'ID dell'attestazione. Puoi usare questo valore per [leggere l'attestazione sulla catena](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) per verificare che le informazioni della query GraphQL siano corrette.
- `data`: i dati dello schema (in questo caso, l'indirizzo e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Se non c'è un'attestazione, restituisce un valore che è ovviamente errato, ma che apparirebbe valido al fornitore di servizi.

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

In questa configurazione gli utenti non possono fingere di essere qualcuno che non sono, a condizione che ci affidiamo ad attestatori affidabili per la mappatura dell'indirizzo Ethereum all'indirizzo e-mail. Tuttavia, il nostro fornitore di identità è ancora un componente centralizzato. Chiunque abbia la chiave privata del fornitore di identità può inviare informazioni false al fornitore di servizi.

Potrebbe esserci una soluzione che utilizza il [calcolo multi-parte (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Spero di scriverne in una guida futura.

## Conclusione

L'adozione di uno standard di accesso, come le firme di Ethereum, si scontra con il problema dell'uovo e della gallina. I fornitori di servizi vogliono rivolgersi al mercato più ampio possibile. Gli utenti vogliono poter accedere ai servizi senza doversi preoccupare di supportare il loro standard di accesso.
La creazione di adattatori, come un IdP Ethereum, può aiutarci a superare questo ostacolo.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
