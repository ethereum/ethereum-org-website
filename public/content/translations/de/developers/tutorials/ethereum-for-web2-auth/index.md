---
title: "Ethereum für die Web2-Authentifizierung nutzen"
description: "Nach dem Lesen dieses Tutorials wird ein Entwickler in der Lage sein, den Ethereum-Login (Web3) in den SAML-Login zu integrieren, einen Standard, der im Web2 verwendet wird, um Single Sign-On und andere verwandte Dienste bereitzustellen. Dies ermöglicht es, den Zugriff auf Web2-Ressourcen durch Ethereum-Signaturen zu authentifizieren, wobei die Benutzerattribute aus Attestierungen stammen."
author: Ori Pomerantz
tags:
  - Web2
  - Authentifizierung
  - eas
skill: beginner
breadcrumb: "Ethereum für Web2-Auth"
lang: de
published: 2025-04-30
---

## Einführung {#introduction}

[SAML](https://www.onelogin.com/learn/saml) ist ein Standard, der im Web2 verwendet wird, um es einem [Identitätsanbieter (Identity Provider, IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) zu ermöglichen, Benutzerinformationen für [Dienstanbieter (Service Provider, SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML) bereitzustellen.

In diesem Tutorial lernen Sie, wie Sie Ethereum-Signaturen in SAML integrieren, damit Benutzer ihre Ethereum-Wallets verwenden können, um sich bei Web2-Diensten zu authentifizieren, die Ethereum noch nicht nativ unterstützen.

Beachten Sie, dass dieses Tutorial für zwei verschiedene Zielgruppen geschrieben wurde:

- Ethereum-Leute, die Ethereum verstehen und SAML lernen müssen
- Web2-Leute, die SAML und Web2-Authentifizierung verstehen und Ethereum lernen müssen

Daher wird es viel Einführungsmaterial enthalten, das Sie bereits kennen. Sie können dieses gerne überspringen.

### SAML für Ethereum-Leute {#saml-for-ethereum-people}

SAML ist ein zentralisiertes Protokoll. Ein Dienstanbieter (SP) akzeptiert Zusicherungen (wie "Dies ist mein Benutzer John, er sollte die Berechtigungen haben, A, B und C zu tun") von einem Identitätsanbieter (IdP) nur dann, wenn er bereits eine Vertrauensbeziehung zu ihm oder zu der [Zertifizierungsstelle (Certificate Authority)](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) hat, die das Zertifikat dieses IdP signiert hat.

Zum Beispiel kann der SP ein Reisebüro sein, das Reisedienstleistungen für Unternehmen anbietet, und der IdP kann die interne Website eines Unternehmens sein. Wenn Mitarbeiter Geschäftsreisen buchen müssen, leitet das Reisebüro sie zur Authentifizierung durch das Unternehmen weiter, bevor sie die Reise tatsächlich buchen können.

![Step by step SAML process](./fig-01-saml.png)

Auf diese Weise verhandeln die drei Entitäten – der Browser, der SP und der IdP – über den Zugriff. Der SP muss im Voraus nichts über den Benutzer wissen, der den Browser verwendet, sondern nur dem IdP vertrauen.

### Ethereum für SAML-Leute {#ethereum-for-saml-people}

Ethereum ist ein dezentrales System. 

![Ethereum logon](./fig-02-eth-logon.png)

Benutzer haben einen privaten Schlüssel (der normalerweise in einer Browser-Erweiterung gespeichert ist). Aus dem privaten Schlüssel kann man einen öffentlichen Schlüssel ableiten und daraus eine 20-Byte-Adresse. Wenn sich Benutzer an einem System anmelden müssen, werden sie aufgefordert, eine Nachricht mit einer Nonce (einem Einmalwert) zu signieren. Der Server kann verifizieren, dass die Signatur von dieser Adresse erstellt wurde.

![Getting extra data from attestations](./fig-03-eas-data.png)

Die Signatur verifiziert nur die Ethereum-Adresse. Um andere Benutzerattribute zu erhalten, verwendet man typischerweise [Attestierungen](https://attest.org/). Eine Attestierung hat typischerweise diese Felder:

- **Attestor**, die Adresse, die die Attestierung vorgenommen hat
- **Empfänger (Recipient)**, die Adresse, auf die sich die Attestierung bezieht
- **Daten (Data)**, die attestierten Daten, wie Name, Berechtigungen usw.
- **Schema**, die ID des Schemas, das zur Interpretation der Daten verwendet wird.

Aufgrund der dezentralen Natur von Ethereum kann jeder Benutzer Attestierungen vornehmen. Die Identität des Attestors ist wichtig, um zu erkennen, welche Attestierungen wir als zuverlässig erachten.

## Einrichtung {#setup}

Der erste Schritt besteht darin, dass ein SAML-SP und ein SAML-IdP miteinander kommunizieren.

1. Laden Sie die Software herunter. Die Beispielsoftware für diesen Artikel befindet sich [auf GitHub](https://github.com/qbzzt/250420-saml-ethereum). Verschiedene Phasen sind in verschiedenen Branches gespeichert, für diese Phase benötigen Sie `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Erstellen Sie Schlüssel mit selbstsignierten Zertifikaten. Das bedeutet, dass der Schlüssel seine eigene Zertifizierungsstelle ist und manuell in den Dienstanbieter importiert werden muss. Weitere Informationen finden Sie in [der OpenSSL-Dokumentation](https://docs.openssl.org/master/man1/openssl-req/). 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Starten Sie die Server (sowohl SP als auch IdP)

    ```sh
    pnpm start
    ```

4. Rufen Sie den SP unter der URL [http://localhost:3000/](http://localhost:3000/) auf und klicken Sie auf die Schaltfläche, um zum IdP (Port 3001) weitergeleitet zu werden.

5. Geben Sie dem IdP Ihre E-Mail-Adresse an und klicken Sie auf **Login to the service provider**. Sie werden sehen, dass Sie zurück zum Dienstanbieter (Port 3000) weitergeleitet werden und dieser Sie anhand Ihrer E-Mail-Adresse erkennt.

### Detaillierte Erklärung {#detailed-explanation}

Das passiert Schritt für Schritt:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Diese Datei enthält die Konfiguration sowohl für den Identitätsanbieter als auch für den Dienstanbieter. Normalerweise wären diese beiden unterschiedliche Entitäten, aber hier können wir der Einfachheit halber Code teilen.

```typescript
const fs = await import("fs")

const protocol="http"
```

Da wir vorerst nur testen, ist es in Ordnung, HTTP zu verwenden.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Lesen Sie die öffentlichen Schlüssel, die normalerweise beiden Komponenten zur Verfügung stehen (und denen entweder direkt vertraut wird oder die von einer vertrauenswürdigen Zertifizierungsstelle signiert wurden).

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

Die URLs für beide Komponenten.

```typescript
export const spPublicData = {
```

Die öffentlichen Daten für den Dienstanbieter.

```typescript
    entityID: `${spUrl}/metadata`,
```

Konventionsgemäß ist in SAML die `entityID` die URL, unter der die Metadaten der Entität verfügbar sind. Diese Metadaten entsprechen den öffentlichen Daten hier, außer dass sie im XML-Format vorliegen.

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

Die wichtigste Definition für unsere Zwecke ist die `assertionConsumerServer`. Das bedeutet, dass wir, um dem Dienstanbieter etwas zuzusichern (zum Beispiel "der Benutzer, der Ihnen diese Informationen sendet, ist somebody@example.com"), [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) an die URL `http://localhost:3000/sp/assertion` verwenden müssen.

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

Die öffentlichen Daten für den Identitätsanbieter sind ähnlich. Sie geben an, dass Sie zum Anmelden eines Benutzers einen POST an `http://localhost:3001/idp/login` und zum Abmelden eines Benutzers einen POST an `http://localhost:3001/idp/logout` senden.

#### src/sp.mts {#srcspmts}

Dies ist der Code, der einen Dienstanbieter implementiert.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Wir verwenden die Bibliothek [`samlify`](https://www.npmjs.com/package/samlify), um SAML zu implementieren.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Die Bibliothek `samlify` erwartet ein Paket, das validiert, dass das XML korrekt ist, mit dem erwarteten öffentlichen Schlüssel signiert wurde usw. Wir verwenden für diesen Zweck [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Ein [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) ist eine "Mini-Website", die in eine Website eingebunden werden kann. In diesem Fall verwenden wir ihn, um alle Definitionen des Dienstanbieters zu gruppieren.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Die eigene Repräsentation des Dienstanbieters besteht aus all seinen öffentlichen Daten und dem privaten Schlüssel, den er zum Signieren von Informationen verwendet.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Die öffentlichen Daten enthalten alles, was der Dienstanbieter über den Identitätsanbieter wissen muss.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Um die Interoperabilität mit anderen SAML-Komponenten zu ermöglichen, sollten Dienst- und Identitätsanbieter ihre öffentlichen Daten (die sogenannten Metadaten) im XML-Format unter `/metadata` zur Verfügung stellen.

```typescript
spRouter.post(`/assertion`,
```

Dies ist die Seite, auf die der Browser zugreift, um sich zu identifizieren. Die Zusicherung enthält die Benutzerkennung (hier verwenden wir die E-Mail-Adresse) und kann zusätzliche Attribute enthalten. Dies ist der Handler für Schritt 7 im obigen Sequenzdiagramm.

```typescript
  async (req, res) => {
    // console.log(`SAML-Antwort:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Sie können den auskommentierten Befehl verwenden, um die in der Zusicherung bereitgestellten XML-Daten anzuzeigen. Sie sind [Base64-kodiert](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Parsen Sie die Login-Anfrage vom Identitätsserver.

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

Senden Sie eine HTML-Antwort, nur um dem Benutzer zu zeigen, dass wir den Login erhalten haben.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Informieren Sie den Benutzer im Fehlerfall.

```typescript
spRouter.get('/login',
```

Erstellen Sie eine Login-Anfrage, wenn der Browser versucht, diese Seite abzurufen. Dies ist der Handler für Schritt 1 im obigen Sequenzdiagramm.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Holen Sie sich die Informationen, um eine Login-Anfrage zu posten.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Diese Seite sendet das Formular (siehe unten) automatisch ab. Auf diese Weise muss der Benutzer nichts tun, um weitergeleitet zu werden. Dies ist Schritt 2 im obigen Sequenzdiagramm.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Posten Sie an `loginRequest.entityEndpoint` (die URL des Endpunkts des Identitätsanbieters).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Der Eingabename ist `loginRequest.type` (`SAMLRequest`). Der Inhalt für dieses Feld ist `loginRequest.context`, was wiederum Base64-kodiertes XML ist.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Diese Middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) liest den Body der [HTTP-Anfrage](https://www.tutorialspoint.com/http/http_requests.htm). Standardmäßig ignoriert Express ihn, da die meisten Anfragen ihn nicht benötigen. Wir brauchen ihn, weil POST den Body verwendet.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Binden Sie den Router in das Verzeichnis des Dienstanbieters ein (`/sp`).

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

Wenn ein Browser versucht, das Stammverzeichnis abzurufen, stellen Sie ihm einen Link zur Login-Seite zur Verfügung.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Lauschen Sie mit dieser Express-Anwendung auf `spPort`.

#### src/idp.mts {#srcidpmts}

Dies ist der Identitätsanbieter. Er ist dem Dienstanbieter sehr ähnlich, die folgenden Erklärungen beziehen sich auf die Teile, die unterschiedlich sind.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Attribute beibehalten
    attributeNamePrefix: "@_", // Präfix für Attribute
  }
)
```

Wir müssen die XML-Anfrage, die wir vom Dienstanbieter erhalten, lesen und verstehen.

```typescript
const getLoginPage = requestId => `
```

Diese Funktion erstellt die Seite mit dem automatisch abgesendeten Formular, das in Schritt 4 des obigen Sequenzdiagramms zurückgegeben wird.

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

Es gibt zwei Felder, die wir an den Dienstanbieter senden:

1. Die `requestId`, auf die wir antworten.
2. Die Benutzerkennung (wir verwenden vorerst die E-Mail-Adresse, die der Benutzer angibt).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Dies ist der Handler für Schritt 5 des obigen Sequenzdiagramms. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) erstellt die Login-Antwort. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Die Zielgruppe (Audience) ist der Dienstanbieter.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Aus der Anfrage extrahierte Informationen. Der einzige Parameter, der uns in der Anfrage interessiert, ist die requestId, mit der der Dienstanbieter Anfragen und deren Antworten abgleichen kann.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Signatur sicherstellen
```

Wir benötigen `signingKey`, um die Daten zum Signieren der Antwort zu haben. Der Dienstanbieter vertraut keinen unsignierten Anfragen.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Dies ist das Feld mit den Benutzerinformationen, die wir an den Dienstanbieter zurücksenden.

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

Verwenden Sie erneut ein automatisch abgesendetes Formular. Dies ist Schritt 6 des obigen Sequenzdiagramms.

```typescript

// IdP-Endpunkt für Login-Anfragen
idpRouter.post(`/login`,
```

Dies ist der Endpunkt, der eine Login-Anfrage vom Dienstanbieter empfängt. Dies ist der Handler für Schritt 3 des obigen Sequenzdiagramms.

```typescript
  async (req, res) => {
    try {
      // Workaround, da ich parseLoginRequest nicht zum Laufen bringen konnte.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Wir sollten in der Lage sein, [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) zu verwenden, um die ID der Authentifizierungsanfrage zu lesen. Ich konnte es jedoch nicht zum Laufen bringen und es war nicht wert, viel Zeit darauf zu verwenden, also verwende ich einfach einen [allgemeinen XML-Parser](https://www.npmjs.com/package/fast-xml-parser). Die Information, die wir benötigen, ist das Attribut `ID` innerhalb des Tags `<samlp:AuthnRequest>`, das sich auf der obersten Ebene des XML befindet.

## Verwendung von Ethereum-Signaturen {#using-ethereum-signatures}

Da wir nun eine Benutzeridentität an den Dienstanbieter senden können, besteht der nächste Schritt darin, die Benutzeridentität auf vertrauenswürdige Weise zu erhalten. Viem ermöglicht es uns, einfach die Wallet nach der Benutzeradresse zu fragen, aber das bedeutet, den Browser nach den Informationen zu fragen. Wir kontrollieren den Browser nicht, also können wir der Antwort, die wir von ihm erhalten, nicht automatisch vertrauen.

Stattdessen sendet der IdP dem Browser einen String zum Signieren. Wenn die Wallet im Browser diesen String signiert, bedeutet das, dass es sich wirklich um diese Adresse handelt (das heißt, sie kennt den privaten Schlüssel, der zu der Adresse gehört).

Um dies in Aktion zu sehen, stoppen Sie den bestehenden IdP und SP und führen Sie diese Befehle aus:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Navigieren Sie dann [zum SP](http://localhost:3000) und folgen Sie den Anweisungen.

Beachten Sie, dass wir zu diesem Zeitpunkt nicht wissen, wie wir die E-Mail-Adresse aus der Ethereum-Adresse erhalten, also melden wir stattdessen `<ethereum address>@bad.email.address` an den SP.

### Detaillierte Erklärung {#detailed-explanation-2}

Die Änderungen befinden sich in den Schritten 4-5 im vorherigen Diagramm.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Die einzige Datei, die wir geändert haben, ist `idp.mts`. Hier sind die geänderten Teile.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Wir benötigen diese beiden zusätzlichen Bibliotheken. Wir verwenden [`uuid`](https://www.npmjs.com/package/uuid), um den [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)-Wert zu erstellen. Der Wert selbst spielt keine Rolle, nur die Tatsache, dass er nur einmal verwendet wird.

Die Bibliothek [`viem`](https://viem.sh/) ermöglicht es uns, Ethereum-Definitionen zu verwenden. Hier benötigen wir sie, um zu verifizieren, dass die Signatur tatsächlich gültig ist.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Die Wallet bittet den Benutzer um Erlaubnis, die Nachricht zu signieren. Eine Nachricht, die nur eine Nonce ist, könnte Benutzer verwirren, daher fügen wir diese Aufforderung hinzu.

```typescript
// requestIDs hier speichern
let nonces = {}
```

Wir benötigen die Anfrageinformationen, um darauf antworten zu können. Wir könnten sie mit der Anfrage senden (Schritt 4) und sie zurückerhalten (Schritt 5). Wir können jedoch den Informationen, die wir vom Browser erhalten, nicht vertrauen, da dieser unter der Kontrolle eines potenziell feindseligen Benutzers steht. Es ist also besser, sie hier zu speichern, mit der Nonce als Schlüssel.

Beachten Sie, dass wir dies hier der Einfachheit halber als Variable tun. Dies hat jedoch mehrere Nachteile:

- Wir sind anfällig für einen Denial-of-Service-Angriff. Ein böswilliger Benutzer könnte versuchen, sich mehrmals anzumelden und so unseren Speicher zu füllen.
- Wenn der IdP-Prozess neu gestartet werden muss, verlieren wir die vorhandenen Werte.
- Wir können keinen Lastausgleich über mehrere Prozesse hinweg durchführen, da jeder seine eigene Variable hätte.

Auf einem Produktionssystem würden wir eine Datenbank verwenden und eine Art Ablaufmechanismus implementieren.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Erstellen Sie eine Nonce und speichern Sie die `requestId` für die zukünftige Verwendung.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Dieses JavaScript wird automatisch ausgeführt, wenn die Seite geladen wird.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Wir benötigen mehrere Funktionen aus `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Wir können nur arbeiten, wenn es eine Wallet im Browser gibt.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Fordern Sie die Liste der Konten von der Wallet an (`window.ethereum`). Gehen Sie davon aus, dass es mindestens eines gibt, und speichern Sie nur das erste. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Erstellen Sie einen [Wallet-Client](https://viem.sh/docs/clients/wallet), um mit der Browser-Wallet zu interagieren.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Bitten Sie den Benutzer, eine Nachricht zu signieren. Da sich dieses gesamte HTML in einem [Template-String](https://viem.sh/docs/clients/wallet) befindet, können wir Variablen verwenden, die im IdP-Prozess definiert sind. Dies ist Schritt 4.5 im Sequenzdiagramm.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Leiten Sie zu `/idp/signature/<nonce>/<address>/<signature>` weiter. Dies ist Schritt 5 im Sequenzdiagramm.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Die Signatur wird vom Browser zurückgesendet, der potenziell böswillig ist (es hindert Sie nichts daran, einfach `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` im Browser zu öffnen). Daher ist es wichtig zu verifizieren, dass der IdP-Prozess fehlerhafte Signaturen korrekt verarbeitet.

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

Der Rest ist nur Standard-HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Dies ist der Handler für Schritt 5 im Sequenzdiagramm.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Holen Sie sich die Anfrage-ID und löschen Sie die Nonce aus `nonces`, um sicherzustellen, dass sie nicht wiederverwendet werden kann.

```typescript
  try {
```

Da es so viele Möglichkeiten gibt, wie die Signatur ungültig sein kann, verpacken wir dies in einen `try ... catch`-Block, um alle ausgelösten Fehler abzufangen.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Verwenden Sie [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage), um Schritt 5.5 im Sequenzdiagramm zu implementieren.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Der Rest des Handlers entspricht dem, was wir zuvor im `/loginSubmitted`-Handler getan haben, bis auf eine kleine Änderung.

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

Wir haben nicht die tatsächliche E-Mail-Adresse (wir werden sie im nächsten Abschnitt erhalten), also geben wir vorerst die Ethereum-Adresse zurück und markieren sie deutlich als keine E-Mail-Adresse.


```typescript
// IdP-Endpunkt für Login-Anfragen
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Workaround, da ich parseLoginRequest nicht zum Laufen bringen konnte.
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

Verwenden Sie anstelle von `getLoginPage` nun `getSignaturePage` im Handler für Schritt 3.

## Abrufen der E-Mail-Adresse {#getting-the-email-address}

Der nächste Schritt besteht darin, die E-Mail-Adresse zu erhalten, die vom Dienstanbieter angeforderte Kennung. Dazu verwenden wir den [Ethereum Attestation Service (EAS)](https://attest.org/).

Der einfachste Weg, Attestierungen zu erhalten, ist die Verwendung der [GraphQL-API](https://docs.attest.org/docs/developer-tools/api). Wir verwenden diese Abfrage:

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

Dieses [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) enthält nur eine E-Mail-Adresse. Diese Abfrage fragt nach Attestierungen dieses Schemas. Das Subjekt der Attestierung wird als `recipient` bezeichnet. Es ist immer eine Ethereum-Adresse.

Warnung: Die Art und Weise, wie wir hier Attestierungen erhalten, weist zwei Sicherheitsprobleme auf.

- Wir greifen auf den API-Endpunkt `https://optimism.easscan.org/graphql` zu, der eine zentralisierte Komponente ist. Wir können das Attribut `id` abrufen und dann ein Onchain-Lookup durchführen, um zu verifizieren, dass eine Attestierung echt ist, aber der API-Endpunkt kann Attestierungen immer noch zensieren, indem er uns nichts davon erzählt. 

  Dieses Problem ist nicht unlösbar, wir könnten unseren eigenen GraphQL-Endpunkt betreiben und die Attestierungen aus den Chain-Logs abrufen, aber das ist für unsere Zwecke übertrieben.

- Wir betrachten nicht die Identität des Attestors. Jeder kann uns mit falschen Informationen füttern. In einer realen Implementierung hätten wir eine Reihe von vertrauenswürdigen Attestoren und würden nur deren Attestierungen betrachten.

Um dies in Aktion zu sehen, stoppen Sie den bestehenden IdP und SP und führen Sie diese Befehle aus:

```sh
git checkout email-address
pnpm install
pnpm start
```

Geben Sie dann Ihre E-Mail-Adresse an. Sie haben zwei Möglichkeiten, dies zu tun:

- Importieren Sie eine Wallet mit einem privaten Schlüssel und verwenden Sie den privaten Testschlüssel `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Fügen Sie eine Attestierung für Ihre eigene E-Mail-Adresse hinzu:

  1. Navigieren Sie zu [dem Schema im Attestation Explorer](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Klicken Sie auf **Attest with Schema**.

  3. Geben Sie Ihre Ethereum-Adresse als Empfänger und Ihre E-Mail-Adresse als E-Mail-Adresse ein und wählen Sie **Onchain**. Klicken Sie dann auf **Make Attestation**.

  4. Genehmigen Sie die Transaktion in Ihrer Wallet. Sie benötigen etwas ETH auf [der Optimism-Blockchain](https://app.optimism.io/bridge/deposit), um für Gas zu bezahlen.

So oder so, nachdem Sie dies getan haben, navigieren Sie zu [http://localhost:3000](http://localhost:3000) und folgen Sie den Anweisungen. Wenn Sie den privaten Testschlüssel importiert haben, lautet die E-Mail, die Sie erhalten, `test_addr_0@example.com`. Wenn Sie Ihre eigene Adresse verwendet haben, sollte es das sein, was Sie attestiert haben.

### Detaillierte Erklärung {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Die neuen Schritte sind die GraphQL-Kommunikation, Schritte 5.6 und 5.7.

Hier sind wiederum die geänderten Teile von `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importieren Sie die Bibliotheken, die wir benötigen.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Es gibt [einen separaten Endpunkt für jede Blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Erstellen Sie einen neuen `GraphQLClient`-Client, den wir zum Abfragen des Endpunkts verwenden können.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL liefert uns nur ein undurchsichtiges Datenobjekt mit Bytes. Um es zu verstehen, benötigen wir das Schema. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Eine Funktion, um von einer Ethereum-Adresse zu einer E-Mail-Adresse zu gelangen.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Dies ist eine GraphQL-Abfrage.

```typescript
      attestations(
```

Wir suchen nach Attestierungen.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Die Attestierungen, die wir wollen, sind diejenigen in unserem Schema, bei denen der Empfänger `getAddress(ethAddr)` ist. Die Funktion [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) stellt sicher, dass unsere Adresse die korrekte [Prüfsumme (Checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) hat. Dies ist notwendig, da bei GraphQL die Groß-/Kleinschreibung beachtet wird. "0xBAD060A7", "0xBad060A7" und "0xbad060a7" sind unterschiedliche Werte.

```typescript
        take: 1
```

Unabhängig davon, wie viele Attestierungen wir finden, wollen wir nur die erste.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Die Felder, die wir empfangen möchten.

- `attester`: Die Adresse, die die Attestierung eingereicht hat. Normalerweise wird dies verwendet, um zu entscheiden, ob der Attestierung vertraut werden soll oder nicht.
- `id`: Die Attestierungs-ID. Sie können diesen Wert verwenden, um [die Attestierung Onchain zu lesen](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64), um zu verifizieren, dass die Informationen aus der GraphQL-Abfrage korrekt sind.
- `data`: Die Schemadaten (in diesem Fall die E-Mail-Adresse).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Wenn es keine Attestierung gibt, geben Sie einen Wert zurück, der offensichtlich falsch ist, aber für den Dienstanbieter gültig erscheinen würde.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Wenn es einen Wert gibt, verwenden Sie `decodeData`, um die Daten zu dekodieren. Wir benötigen nicht die Metadaten, die es bereitstellt, sondern nur den Wert selbst.

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

Verwenden Sie die neue Funktion, um die E-Mail-Adresse zu erhalten.

## Was ist mit Dezentralisierung? {#what-about-decentralization}

In dieser Konfiguration können Benutzer nicht vorgeben, jemand zu sein, der sie nicht sind, solange wir uns auf vertrauenswürdige Attestoren für die Zuordnung von Ethereum- zu E-Mail-Adressen verlassen. Unser Identitätsanbieter ist jedoch immer noch eine zentralisierte Komponente. Wer auch immer den privaten Schlüssel des Identitätsanbieters hat, kann falsche Informationen an den Dienstanbieter senden.

Es könnte eine Lösung geben, die [Multi-Party Computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) verwendet. Ich hoffe, in einem zukünftigen Tutorial darüber schreiben zu können.

## Fazit {#conclusion}

Die Einführung eines Anmeldestandards, wie z. B. Ethereum-Signaturen, steht vor einem Henne-Ei-Problem. Dienstanbieter wollen einen möglichst breiten Markt ansprechen. Benutzer möchten auf Dienste zugreifen können, ohne sich Gedanken über die Unterstützung ihres Anmeldestandards machen zu müssen.
Die Erstellung von Adaptern, wie z. B. einem Ethereum-IdP, kann uns helfen, diese Hürde zu überwinden.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).