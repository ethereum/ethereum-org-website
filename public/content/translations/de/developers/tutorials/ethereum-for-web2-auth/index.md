---
title: "Ethereum für die Web2-Authentifizierung nutzen"
description: "Nach dem Lesen dieses Tutorials wird ein Entwickler in der Lage sein, den Ethereum-Login (Web3) in den SAML-Login zu integrieren, einen Standard, der im Web2 verwendet wird, um Single Sign-On und andere verwandte Dienste bereitzustellen. Dies ermöglicht die Authentifizierung des Zugriffs auf Web2-Ressourcen durch Ethereum-Signaturen, wobei die Benutzerattribute aus Bestätigungen stammen."
author: Ori Pomerantz
tags: ["web2", "Authentifizierung", "eas"]
skill: beginner
breadcrumb: "Ethereum für Web2-Auth"
lang: de
published: 2025-04-30
---

## Einführung

[SAML](https://www.onelogin.com/learn/saml) ist ein Standard, der im Web2 verwendet wird, um einem [Identitätsanbieter (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) zu ermöglichen, Benutzerinformationen für [Dienstanbieter (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)) bereitzustellen.

In diesem Tutorial lernen Sie, wie Sie Ethereum-Signaturen in SAML integrieren, damit Benutzer ihre Ethereum-Wallets verwenden können, um sich bei Web2-Diensten zu authentifizieren, die Ethereum noch nicht nativ unterstützen.

Beachten Sie, dass dieses Tutorial für zwei verschiedene Zielgruppen geschrieben wurde:

- Ethereum-Nutzer, die Ethereum verstehen und SAML lernen müssen
- Web2-Nutzer, die SAML und Web2-Authentifizierung verstehen und Ethereum lernen müssen

Daher wird es viel Einführungsmaterial enthalten, das Sie vielleicht schon kennen. Sie können dieses gerne überspringen.

### SAML für Ethereum-Nutzer

SAML ist ein zentralisiertes Protokoll. Ein Dienstanbieter (SP) akzeptiert Zusicherungen (wie „Dies ist mein Benutzer John, er sollte die Berechtigungen haben, A, B und C zu tun“) von einem Identitätsanbieter (IdP) nur, wenn bereits eine Vertrauensbeziehung zu ihm oder zu der [Zertifizierungsstelle](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) besteht, die das Zertifikat dieses IdP signiert hat.

Zum Beispiel kann der SP ein Reisebüro sein, das Reisedienstleistungen für Unternehmen anbietet, und der IdP kann die interne Website eines Unternehmens sein. Wenn Mitarbeiter Geschäftsreisen buchen müssen, leitet das Reisebüro sie zur Authentifizierung durch das Unternehmen weiter, bevor sie die Reise tatsächlich buchen können.

![Schritt-für-Schritt-SAML-Prozess](./fig-01-saml.png)

Auf diese Weise verhandeln die drei Entitäten – der Browser, der SP und der IdP – über den Zugriff. Der SP muss im Voraus nichts über den Benutzer wissen, der den Browser verwendet, sondern nur dem IdP vertrauen.

### Ethereum für SAML-Nutzer

Ethereum ist ein dezentralisiertes System. 

![Ethereum-Anmeldung](./fig-02-eth-logon.png)

Benutzer haben einen Private-Key (der typischerweise in einer Browser-Erweiterung gespeichert ist). Aus dem Private-Key kann man einen Public-Key ableiten und daraus eine 20-Byte-Adresse. Wenn sich Benutzer an einem System anmelden müssen, werden sie aufgefordert, eine Nachricht mit einer Nonce (einem Einmalwert) zu signieren. Der Server kann verifizieren, dass die Signatur von dieser Adresse erstellt wurde.

![Zusätzliche Daten aus Bestätigungen erhalten](./fig-03-eas-data.png)

Die Signatur verifiziert nur die Ethereum-Adresse. Um andere Benutzerattribute zu erhalten, verwendet man typischerweise [Bestätigungen](https://attest.org/). Eine Bestätigung hat typischerweise diese Felder:

- **Attestor (Bestätigender)**, die Adresse, die die Bestätigung vorgenommen hat
- **Empfänger**, die Adresse, auf die sich die Bestätigung bezieht
- **Daten**, die bestätigten Daten, wie Name, Berechtigungen usw.
- **Schema**, die ID des Schemas, das zur Interpretation der Daten verwendet wird.

Aufgrund der dezentralisierten Natur von Ethereum kann jeder Benutzer Bestätigungen vornehmen. Die Identität des Bestätigenden ist wichtig, um zu identifizieren, welche Bestätigungen wir als zuverlässig erachten.

## Einrichtung

Der erste Schritt besteht darin, dass ein SAML-SP und ein SAML-IdP miteinander kommunizieren.

1. Laden Sie die Software herunter. Die Beispielsoftware für diesen Artikel befindet sich [auf GitHub](https://github.com/qbzzt/250420-saml-ethereum). Verschiedene Phasen sind in verschiedenen Branches gespeichert; für diese Phase benötigen Sie `saml-only`.

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum.git
    cd 250420-saml-ethereum
    git checkout saml-only
    yarn
    ```

2. Erstellen Sie Schlüssel mit selbstsignierten Zertifikaten. Das bedeutet, dass der Schlüssel seine eigene Zertifizierungsstelle ist und manuell in den Dienstanbieter importiert werden muss. Weitere Informationen finden Sie in den [OpenSSL-Dokumentationen](https://docs.openssl.org/master/man1/openssl-req/). 

    ```sh
    mkdir keys
    openssl req -x509 -newkey rsa:4096 -keyout keys/sp-key.pem -out keys/sp-cert.pem -sha256 -days 3650 -nodes -subj "/C=US/ST=Texas/L=Austin/O=Service Provider/OU=IT/CN=localhost"
    openssl req -x509 -newkey rsa:4096 -keyout keys/idp-key.pem -out keys/idp-cert.pem -sha256 -days 3650 -nodes -subj "/C=US/ST=Texas/L=Austin/O=Identity Provider/OU=IT/CN=localhost"
    ```

3. Starten Sie die Server (sowohl SP als auch IdP).

    ```sh
    yarn start
    ```

4. Rufen Sie den SP unter der URL [http://localhost:3000/](http://localhost:3000/) auf und klicken Sie auf die Schaltfläche, um zum IdP (Port 3001) weitergeleitet zu werden.

5. Geben Sie dem IdP Ihre E-Mail-Adresse an und klicken Sie auf **Login to the service provider**. Sie werden sehen, dass Sie zurück zum Dienstanbieter (Port 3000) weitergeleitet werden und dieser Sie anhand Ihrer E-Mail-Adresse erkennt.

### Detaillierte Erklärung

Das passiert Schritt für Schritt:

![Normale SAML-Anmeldung ohne Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Diese Datei enthält die Konfiguration sowohl für den Identitätsanbieter als auch für den Dienstanbieter. Normalerweise wären diese beiden unterschiedliche Entitäten, aber hier können wir den Code der Einfachheit halber teilen.

```typescript
import fs from "fs"

```

Da wir vorerst nur testen, ist es in Ordnung, HTTP zu verwenden.

```typescript
const protocol = "http"
const domain = "localhost"

```

Lesen Sie die Public-Keys, die normalerweise beiden Komponenten zur Verfügung stehen (und denen entweder direkt vertraut wird oder die von einer vertrauenswürdigen Zertifizierungsstelle signiert wurden).

```typescript
const spPubKey = fs.readFileSync("./keys/sp-cert.pem")
const idpPubKey = fs.readFileSync("./keys/idp-cert.pem")

```

Die URLs für beide Komponenten.

```typescript
export const spPort = 3000
export const spUrl = `${protocol}://${domain}:${spPort}`

export const idpPort = 3001
export const idpUrl = `${protocol}://${domain}:${idpPort}`

```

Die öffentlichen Daten für den Dienstanbieter.

```typescript
export const spPublicData = {
```

Konventionsgemäß ist in SAML die `entityID` die URL, unter der die Metadaten der Entität verfügbar sind. Diese Metadaten entsprechen den hier aufgeführten öffentlichen Daten, außer dass sie im XML-Format vorliegen.

```typescript
  entityID: `${spUrl}/sp/metadata`,
```

Die wichtigste Definition für unsere Zwecke ist der `assertionConsumerServer`. Das bedeutet, dass wir, um dem Dienstanbieter etwas zuzusichern (zum Beispiel „der Benutzer, der Ihnen diese Informationen sendet, ist somebody@example.com“), [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) an die URL `http://localhost:3000/sp/assertion` verwenden müssen.

```typescript
  assertionConsumerService: [{
    Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
    Location: `${spUrl}/sp/assertion`,
  }],
  encPrivateKey: spPubKey,
}

```

Die öffentlichen Daten für den Identitätsanbieter sind ähnlich. Sie geben an, dass Sie zum Anmelden eines Benutzers einen POST an `http://localhost:3001/idp/login` und zum Abmelden eines Benutzers einen POST an `http://localhost:3001/idp/logout` senden.

```typescript
export const idpPublicData = {
  entityID: `${idpUrl}/idp/metadata`,
  singleSignOnService: [{
    Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
    Location: `${idpUrl}/idp/login`,
  }],
  singleLogoutService: [{
    Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
    Location: `${idpUrl}/idp/logout`,
  }],
  signingCert: idpPubKey,
}
```

#### src/sp.mts

Dies ist der Code, der einen Dienstanbieter implementiert.

```typescript
import fs from "fs"
import express from "express"
```

Wir verwenden die Bibliothek [`samlify`](https://www.npmjs.com/package/samlify), um SAML zu implementieren.

```typescript
import * as samlify from "samlify"
```

Die Bibliothek `samlify` erwartet ein Paket, das validiert, ob das XML korrekt ist, mit dem erwarteten Public-Key signiert wurde usw. Wir verwenden dafür [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
import * as validator from "@authenio/samlify-node-xmllint"

import { spPort, spUrl, spPublicData, idpPublicData } from "./config.mjs"

samlify.setSchemaValidator(validator)

```

Ein [`express`](https://expressjs.com/) [`Router`](https://expressjs.com/en/5x/api.html#router) ist eine „Mini-Website“, die in eine Website eingebunden werden kann. In diesem Fall verwenden wir ihn, um alle Definitionen des Dienstanbieters zu gruppieren.

```typescript
const spRouter = express.Router()

```

Die eigene Repräsentation des Dienstanbieters besteht aus all seinen öffentlichen Daten und dem Private-Key, den er zum Signieren von Informationen verwendet.

```typescript
const sp = samlify.ServiceProvider({
  ...spPublicData,
  privateKey: fs.readFileSync("./keys/sp-key.pem"),
})

```

Die öffentlichen Daten enthalten alles, was der Dienstanbieter über den Identitätsanbieter wissen muss.

```typescript
const idp = samlify.IdentityProvider(idpPublicData)

```

Um die Interoperabilität mit anderen SAML-Komponenten zu ermöglichen, sollten Dienst- und Identitätsanbieter ihre öffentlichen Daten (die sogenannten Metadaten) im XML-Format unter `/metadata` zur Verfügung stellen.

```typescript
spRouter.get("/metadata", (req, res) => {
  res.header("Content-Type", "text/xml").send(sp.getMetadata())
})

```

Dies ist die Seite, auf die der Browser zugreift, um sich zu identifizieren. Die Zusicherung enthält die Benutzerkennung (hier verwenden wir die E-Mail-Adresse) und kann zusätzliche Attribute enthalten. Dies ist der Handler für Schritt 7 im obigen Sequenzdiagramm.

```typescript
spRouter.post("/assertion", async (req, res) => {
  try {
```

Sie können den auskommentierten Befehl verwenden, um die in der Zusicherung bereitgestellten XML-Daten anzuzeigen. Sie sind [Base64-kodiert](https://en.wikipedia.org/wiki/Base64).

```typescript
    // console.log(Buffer.from(req.body.SAMLResponse, 'base64').toString('utf8'))
```

Parsen Sie die Anmeldeanforderung vom Identitätsserver.

```typescript
    const { extract } = await sp.parseLoginResponse(idp, "post", req)
```

Senden Sie eine HTML-Antwort, nur um dem Benutzer zu zeigen, dass wir die Anmeldung erhalten haben.

```typescript
    res.send(`
      <html>
        <body>
          <h1>Login Successful</h1>
          <p>Welcome, ${extract.nameID}</p>
        </body>
      </html>
    `)
  } catch (e) {
```

Informieren Sie den Benutzer im Fehlerfall.

```typescript
    console.error("[FATAL] when parsing login response sent from idp", e)
    res.status(500).send(`
      <html>
        <body>
          <h1>Login Failed</h1>
          <p>Check the console for more information</p>
        </body>
      </html>
    `)
  }
})

```

Erstellen Sie eine Anmeldeanforderung, wenn der Browser versucht, diese Seite abzurufen. Dies ist der Handler für Schritt 1 im obigen Sequenzdiagramm.

```typescript
spRouter.get("/login", async (req, res) => {
```

Holen Sie sich die Informationen, um eine Anmeldeanforderung zu posten.

```typescript
  const loginRequest = sp.createLoginRequest(idp, "redirect")

```

Diese Seite sendet das Formular (siehe unten) automatisch ab. Auf diese Weise muss der Benutzer nichts tun, um weitergeleitet zu werden. Dies ist Schritt 2 im obigen Sequenzdiagramm.

```typescript
  const html = `
    <html>
      <body onload="document.forms[0].submit()">
```

Posten Sie an `loginRequest.entityEndpoint` (die URL des Endpunkts des Identitätsanbieters).

```typescript
        <form method="post" action="${loginRequest.entityEndpoint}">
```

Der Eingabename ist `loginRequest.type` (`SAMLRequest`). Der Inhalt für dieses Feld ist `loginRequest.context`, was wiederum Base64-kodiertes XML ist.

```typescript
          <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
          <input type="submit" value="Login" />
        </form>
      </body>
    </html>
  `
  res.send(html)
})

const app = express()

```

[Diese Middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) liest den Body der [HTTP-Anfrage](https://www.tutorialspoint.com/http/http_requests.htm). Standardmäßig ignoriert Express ihn, da die meisten Anfragen ihn nicht benötigen. Wir brauchen ihn, weil POST den Body verwendet.

```typescript
app.use(express.urlencoded({ extended: true }))

```

Binden Sie den Router im Verzeichnis des Dienstanbieters (`/sp`) ein.

```typescript
app.use("/sp", spRouter)

```

Wenn ein Browser versucht, das Stammverzeichnis abzurufen, stellen Sie ihm einen Link zur Anmeldeseite zur Verfügung.

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Service Provider</h1>
        <a href="/sp/login">Login</a>
      </body>
    </html>
  `)
})

```

Hören Sie mit dieser Express-Anwendung auf den `spPort`.

```typescript
app.listen(spPort, () => {
  console.log(`Service Provider listening at ${spUrl}`)
})
```

#### src/idp.mts

Dies ist der Identitätsanbieter. Er ist dem Dienstanbieter sehr ähnlich; die folgenden Erklärungen beziehen sich auf die Teile, die unterschiedlich sind.

```typescript
import fs from "fs"
import express from "express"
import * as samlify from "samlify"
import * as validator from "@authenio/samlify-node-xmllint"
```

Wir müssen die XML-Anfrage, die wir vom Dienstanbieter erhalten, lesen und verstehen.

```typescript
import { XMLParser } from "fast-xml-parser"

import { idpPort, idpUrl, spPublicData, idpPublicData } from "./config.mjs"

samlify.setSchemaValidator(validator)

const idpRouter = express.Router()

const idp = samlify.IdentityProvider({
  ...idpPublicData,
  privateKey: fs.readFileSync("./keys/idp-key.pem"),
})

const sp = samlify.ServiceProvider(spPublicData)

idpRouter.get("/metadata", (req, res) => {
  res.header("Content-Type", "text/xml").send(idp.getMetadata())
})

```

Diese Funktion erstellt die Seite mit dem automatisch abgesendeten Formular, das in Schritt 4 des obigen Sequenzdiagramms zurückgegeben wird.

```typescript
const getLoginPage = (reqId: string) => `
  <html>
    <body>
      <h1>Identity Provider</h1>
      <form method="post" action="/idp/loginSubmitted">
```

Es gibt zwei Felder, die wir an den Dienstanbieter senden:

1. Die `requestId`, auf die wir antworten.
2. Die Benutzerkennung (wir verwenden vorerst die vom Benutzer angegebene E-Mail-Adresse).

```typescript
        <input type="hidden" name="reqId" value="${reqId}" />
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" />
        <input type="submit" value="Login to the service provider" />
      </form>
    </body>
  </html>
`

```

Dies ist der Handler für Schritt 5 des obigen Sequenzdiagramms. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) erstellt die Anmeldeantwort.

```typescript
idpRouter.post("/loginSubmitted", async (req, res) => {
  const { context } = await idp.createLoginResponse(
```

Die Zielgruppe (Audience) ist der Dienstanbieter.

```typescript
    sp,
```

Aus der Anfrage extrahierte Informationen. Der einzige Parameter, der uns in der Anfrage interessiert, ist die `requestId`, die es dem Dienstanbieter ermöglicht, Anfragen und deren Antworten zuzuordnen.

```typescript
    {
      extract: {
        request: {
          id: req.body.reqId,
        },
      },
    },
    "post",
```

Wir benötigen den `signingKey`, um die Daten zum Signieren der Antwort zu haben. Der Dienstanbieter vertraut keinen unsignierten Anfragen.

```typescript
    {
      signingKey: fs.readFileSync("./keys/idp-key.pem"),
    },
```

Dies ist das Feld mit den Benutzerinformationen, die wir an den Dienstanbieter zurücksenden.

```typescript
    (template: string) => {
      return template.replace("{nameID}", req.body.email)
    }
  )

```

Verwenden Sie erneut ein automatisch abgesendetes Formular. Dies ist Schritt 6 des obigen Sequenzdiagramms.

```typescript
  const html = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="${spPublicData.assertionConsumerService[0].Location}">
          <input type="hidden" name="SAMLResponse" value="${context}" />
          <input type="submit" value="Login" />
        </form>
      </body>
    </html>
  `
  res.send(html)
})

```

Dies ist der Endpunkt, der eine Anmeldeanforderung vom Dienstanbieter empfängt. Dies ist der Handler für Schritt 3 des obigen Sequenzdiagramms.

```typescript
idpRouter.post("/login", async (req, res) => {
```

Wir sollten in der Lage sein, [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) zu verwenden, um die ID der Authentifizierungsanfrage zu lesen. Ich konnte es jedoch nicht zum Laufen bringen und es war nicht wert, viel Zeit darauf zu verwenden, also verwende ich einfach einen [allgemeinen XML-Parser](https://www.npmjs.com/package/fast-xml-parser). Die Information, die wir benötigen, ist das `ID`-Attribut innerhalb des `<samlp:AuthnRequest>`-Tags, das sich auf der obersten Ebene des XML befindet.

```typescript
  const xmlStr = Buffer.from(req.body.SAMLRequest, "base64").toString("utf8")
  const parser = new XMLParser({ ignoreAttributes: false })
  const xmlObj = parser.parse(xmlStr)
  const reqId = xmlObj["samlp:AuthnRequest"]["@_ID"]

  res.send(getLoginPage(reqId))
})

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use("/idp", idpRouter)

app.listen(idpPort, () => {
  console.log(`Identity Provider listening at ${idpUrl}`)
})
```

## Verwendung von Ethereum-Signaturen

Da wir nun eine Benutzeridentität an den Dienstanbieter senden können, besteht der nächste Schritt darin, die Benutzeridentität auf vertrauenswürdige Weise zu erhalten. Viem ermöglicht es uns, einfach das Wallet nach der Benutzeradresse zu fragen, aber das bedeutet, den Browser nach den Informationen zu fragen. Wir kontrollieren den Browser nicht, also können wir der Antwort, die wir von ihm erhalten, nicht automatisch vertrauen.

Stattdessen wird der IdP dem Browser eine Zeichenfolge zum Signieren senden. Wenn das Wallet im Browser diese Zeichenfolge signiert, bedeutet das, dass es sich wirklich um diese Adresse handelt (das heißt, es kennt den Private-Key, der der Adresse entspricht).

Um dies in Aktion zu sehen, stoppen Sie den bestehenden IdP und SP und führen Sie diese Befehle aus:

```sh
git checkout saml-and-eth
yarn
yarn start
```

Rufen Sie dann [den SP](http://localhost:3000) auf und folgen Sie den Anweisungen.

Beachten Sie, dass wir zu diesem Zeitpunkt nicht wissen, wie wir die E-Mail-Adresse aus der Ethereum-Adresse erhalten, also melden wir stattdessen `<ethereum address>@bad.email.address` an den SP.

### Detaillierte Erklärung

Die Änderungen befinden sich in den Schritten 4-5 im vorherigen Diagramm.

![SAML mit einer Ethereum-Signatur](./fig-05-saml-w-signature.png)

Die einzige Datei, die wir geändert haben, ist `idp.mts`. Hier sind die geänderten Teile.

```typescript
import { XMLParser } from "fast-xml-parser"
```

Wir benötigen diese beiden zusätzlichen Bibliotheken. Wir verwenden [`uuid`](https://www.npmjs.com/package/uuid), um den [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)-Wert zu erstellen. Der Wert selbst spielt keine Rolle, nur die Tatsache, dass er nur einmal verwendet wird.

Die Bibliothek [`viem`](https://viem.sh/) ermöglicht es uns, Ethereum-Definitionen zu verwenden. Hier benötigen wir sie, um zu verifizieren, dass die Signatur tatsächlich gültig ist.

```typescript
import { v4 as uuidv4 } from "uuid"
import { verifyMessage } from "viem"

import { idpPort, idpUrl, spPublicData, idpPublicData } from "./config.mjs"
```

Das Wallet bittet den Benutzer um Erlaubnis, die Nachricht zu signieren. Eine Nachricht, die nur eine Nonce ist, könnte Benutzer verwirren, daher fügen wir diese Aufforderung hinzu.

```typescript
const prompt = "Please sign this message to log in. Nonce: "

```

Wir benötigen die Anfrageinformationen, um darauf antworten zu können. Wir könnten sie mit der Anfrage senden (Schritt 4) und sie zurückerhalten (Schritt 5). Wir können jedoch den Informationen, die wir vom Browser erhalten, nicht vertrauen, da dieser unter der Kontrolle eines potenziell feindlichen Benutzers steht. Es ist also besser, sie hier mit der Nonce als Schlüssel zu speichern.

Beachten Sie, dass wir dies hier der Einfachheit halber als Variable tun. Dies hat jedoch mehrere Nachteile:

- Wir sind anfällig für einen Denial-of-Service-Angriff. Ein böswilliger Benutzer könnte versuchen, sich mehrmals anzumelden und so unseren Speicher zu füllen.
- Wenn der IdP-Prozess neu gestartet werden muss, verlieren wir die vorhandenen Werte.
- Wir können keinen Lastausgleich über mehrere Prozesse hinweg durchführen, da jeder seine eigene Variable hätte.

Auf einem Produktionssystem würden wir eine Datenbank verwenden und eine Art Ablaufmechanismus implementieren.

```typescript
const nonces: Record<string, string> = {}

```

Erstellen Sie eine Nonce und speichern Sie die `requestId` für die zukünftige Verwendung.

```typescript
const getSignaturePage = (reqId: string) => {
  const nonce = uuidv4()
  nonces[nonce] = reqId

  return `
  <html>
    <head>
```

Dieses JavaScript wird automatisch ausgeführt, wenn die Seite geladen wird.

```typescript
      <script type="module">
```

Wir benötigen mehrere Funktionen von `viem`.

```typescript
        import { createWalletClient, custom } from 'https://esm.sh/viem'
        import 'https://esm.sh/viem/window'

        async function sign() {
```

Wir können nur arbeiten, wenn sich ein Wallet im Browser befindet.

```typescript
          if (!window.ethereum) {
            alert('No wallet found')
            return
          }

```

Fordern Sie die Liste der Konten vom Wallet an (`window.ethereum`). Gehen Sie davon aus, dass es mindestens eines gibt, und speichern Sie nur das erste. 

```typescript
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          const account = accounts[0]

```

Erstellen Sie einen [Wallet-Client](https://viem.sh/docs/clients/wallet), um mit dem Browser-Wallet zu interagieren.

```typescript
          const client = createWalletClient({
            account,
            transport: custom(window.ethereum)
          })

```

Bitten Sie den Benutzer, eine Nachricht zu signieren. Da sich dieses gesamte HTML in einem [Template-String](https://viem.sh/docs/clients/wallet) befindet, können wir Variablen verwenden, die im IdP-Prozess definiert sind. Dies ist Schritt 4.5 im Sequenzdiagramm.

```typescript
          const signature = await client.signMessage({
            message: '${prompt}${nonce}'
          })

```

Leiten Sie zu `/idp/signature/<nonce>/<address>/<signature>` weiter. Dies ist Schritt 5 im Sequenzdiagramm.

```typescript
          window.location.href = '/idp/signature/${nonce}/' + account + '/' + signature
        }

        sign()
      </script>
    </head>
```

Die Signatur wird vom Browser zurückgesendet, der potenziell böswillig ist (es hindert Sie nichts daran, einfach `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` im Browser zu öffnen). Daher ist es wichtig zu verifizieren, dass der IdP-Prozess fehlerhafte Signaturen korrekt verarbeitet.

```typescript
    <body>
```

Der Rest ist nur Standard-HTML.

```typescript
      <h1>Identity Provider</h1>
      <p>Please sign the message in your wallet to log in.</p>
    </body>
  </html>
`
}

```

Dies ist der Handler für Schritt 5 im Sequenzdiagramm.

```typescript
idpRouter.get("/signature/:nonce/:address/:signature", async (req, res) => {
  const { nonce, address, signature } = req.params

```

Holen Sie sich die Anfrage-ID und löschen Sie die Nonce aus `nonces`, um sicherzustellen, dass sie nicht wiederverwendet werden kann.

```typescript
  const reqId = nonces[nonce]
  delete nonces[nonce]

  if (!reqId) {
    res.status(400).send("Invalid nonce")
    return
  }

```

Da es so viele Möglichkeiten gibt, wie die Signatur ungültig sein kann, verpacken wir dies in einen `try ... catch`-Block, um alle ausgelösten Fehler abzufangen.

```typescript
  try {
```

Verwenden Sie [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage), um Schritt 5.5 im Sequenzdiagramm zu implementieren.

```typescript
    const valid = await verifyMessage({
      address: address as `0x${string}`,
      message: `${prompt}${nonce}`,
      signature: signature as `0x${string}`,
    })

    if (!valid) {
      res.status(400).send("Invalid signature")
      return
    }
  } catch (e) {
    res.status(400).send("Invalid signature")
    return
  }

```

Der Rest des Handlers entspricht dem, was wir zuvor im `/loginSubmitted`-Handler getan haben, bis auf eine kleine Änderung.

```typescript
  const { context } = await idp.createLoginResponse(
    sp,
    {
      extract: {
        request: {
          id: reqId,
        },
      },
    },
    "post",
    {
      signingKey: fs.readFileSync("./keys/idp-key.pem"),
    },
    (template: string) => {
```

Wir haben nicht die tatsächliche E-Mail-Adresse (wir werden sie im nächsten Abschnitt erhalten), also geben wir vorerst die Ethereum-Adresse zurück und markieren sie deutlich als keine E-Mail-Adresse.

```typescript
      return template.replace("{nameID}", `${address}@bad.email.address`)
    }
  )

  const html = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="${spPublicData.assertionConsumerService[0].Location}">
          <input type="hidden" name="SAMLResponse" value="${context}" />
          <input type="submit" value="Login" />
        </form>
      </body>
    </html>
  `
  res.send(html)
})

idpRouter.post("/login", async (req, res) => {
  const xmlStr = Buffer.from(req.body.SAMLRequest, "base64").toString("utf8")
  const parser = new XMLParser({ ignoreAttributes: false })
  const xmlObj = parser.parse(xmlStr)
  const reqId = xmlObj["samlp:AuthnRequest"]["@_ID"]

```

Verwenden Sie nun anstelle von `getLoginPage` `getSignaturePage` im Handler für Schritt 3.

```typescript
  res.send(getSignaturePage(reqId))
})
```

## Abrufen der E-Mail-Adresse

Der nächste Schritt besteht darin, die E-Mail-Adresse zu erhalten, die vom Dienstanbieter angeforderte Kennung. Dazu verwenden wir den [Ethereum Attestation Service (EAS)](https://attest.org/).

Der einfachste Weg, Bestätigungen zu erhalten, ist die Verwendung der [GraphQL-API](https://docs.attest.org/docs/developer-tools/api). Wir verwenden diese Abfrage:

```graphql
query Attestations($schemaId: StringFilter!, $recipient: StringFilter!) {
  attestations(where: {schemaId: $schemaId, recipient: $recipient}) {
    attester
    id
    data
  }
}
```

Diese [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) enthält nur eine E-Mail-Adresse. Diese Abfrage fragt nach Bestätigungen dieses Schemas. Das Subjekt der Bestätigung wird als `recipient` (Empfänger) bezeichnet. Es ist immer eine Ethereum-Adresse.

Warnung: Die Art und Weise, wie wir hier Bestätigungen erhalten, hat zwei Sicherheitsprobleme.

- Wir greifen auf den API-Endpunkt `https://optimism.easscan.org/graphql` zu, der eine zentralisierte Komponente ist. Wir können das `id`-Attribut abrufen und dann eine Suche auf der Blockchain durchführen, um zu verifizieren, dass eine Bestätigung echt ist, aber der API-Endpunkt kann Bestätigungen immer noch zensieren, indem er uns nichts davon erzählt. 

  Dieses Problem ist nicht unlösbar; wir könnten unseren eigenen GraphQL-Endpunkt betreiben und die Bestätigungen aus den Chain-Logs abrufen, aber das ist für unsere Zwecke übertrieben.

- Wir betrachten nicht die Identität des Bestätigenden. Jeder kann uns falsche Informationen liefern. In einer realen Implementierung hätten wir eine Reihe von vertrauenswürdigen Bestätigenden und würden nur deren Bestätigungen berücksichtigen.

Um dies in Aktion zu sehen, stoppen Sie den bestehenden IdP und SP und führen Sie diese Befehle aus:

```sh
git checkout saml-eth-eas
yarn
yarn start
```

Geben Sie dann Ihre E-Mail-Adresse an. Sie haben zwei Möglichkeiten, dies zu tun:

- Importieren Sie ein Wallet mit einem Private-Key und verwenden Sie den Test-Private-Key `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Fügen Sie eine Bestätigung für Ihre eigene E-Mail-Adresse hinzu:

  1. Rufen Sie [das Schema im Attestation Explorer](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) auf.

  2. Klicken Sie auf **Attest with Schema**.

  3. Geben Sie Ihre Ethereum-Adresse als Empfänger und Ihre E-Mail-Adresse als E-Mail-Adresse ein und wählen Sie **Onchain**. Klicken Sie dann auf **Make Attestation**.

  4. Genehmigen Sie die Transaktion in Ihrem Wallet. Sie benötigen etwas ETH auf [der Optimism-Blockchain](https://app.optimism.io/bridge/deposit), um für Gas zu bezahlen.

So oder so, rufen Sie danach [http://localhost:3000](http://localhost:3000) auf und folgen Sie den Anweisungen. Wenn Sie den Test-Private-Key importiert haben, lautet die E-Mail, die Sie erhalten, `test_addr_0@example.com`. Wenn Sie Ihre eigene Adresse verwendet haben, sollte es das sein, was Sie bestätigt haben.

### Detaillierte Erklärung

![Von der Ethereum-Adresse zur E-Mail gelangen](./fig-06-saml-sig-n-email.png)

Die neuen Schritte sind die GraphQL-Kommunikation, Schritte 5.6 und 5.7.

Hier sind wiederum die geänderten Teile von `idp.mts`.

```typescript
import { v4 as uuidv4 } from "uuid"
import { verifyMessage, getAddress } from "viem"
```

Importieren Sie die Bibliotheken, die wir benötigen.

```typescript
import { GraphQLClient, gql } from "graphql-request"
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"

import { idpPort, idpUrl, spPublicData, idpPublicData } from "./config.mjs"

```

Es gibt [einen separaten Endpunkt für jede Blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const easEndpoint = "https://optimism.easscan.org/graphql"

```

Erstellen Sie einen neuen `GraphQLClient`-Client, den wir zum Abfragen des Endpunkts verwenden können.

```typescript
const easClient = new GraphQLClient(easEndpoint)

```

GraphQL gibt uns nur ein undurchsichtiges Datenobjekt mit Bytes. Um es zu verstehen, benötigen wir das Schema. 

```typescript
const schemaEncoder = new SchemaEncoder("string email")

```

Eine Funktion, um von einer Ethereum-Adresse zu einer E-Mail-Adresse zu gelangen.

```typescript
const getEmail = async (ethAddr: string) => {
```

Dies ist eine GraphQL-Abfrage.

```typescript
  const query = gql`
```

Wir suchen nach Bestätigungen.

```typescript
    query Attestations($schemaId: StringFilter!, $recipient: StringFilter!) {
      attestations(
        where: { schemaId: $schemaId, recipient: $recipient }
```

Die Bestätigungen, die wir wollen, sind diejenigen in unserem Schema, bei denen der Empfänger `getAddress(ethAddr)` ist. Die Funktion [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) stellt sicher, dass unsere Adresse die korrekte [Prüfsumme](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) hat. Dies ist notwendig, da GraphQL zwischen Groß- und Kleinschreibung unterscheidet. „0xBAD060A7“, „0xBad060A7“ und „0xbad060a7“ sind unterschiedliche Werte.

```typescript
        take: 1
```

Unabhängig davon, wie viele Bestätigungen wir finden, wollen wir nur die erste.

```typescript
      ) {
```

Die Felder, die wir empfangen möchten.

- `attester`: Die Adresse, die die Bestätigung eingereicht hat. Normalerweise wird dies verwendet, um zu entscheiden, ob der Bestätigung vertraut werden soll oder nicht.
- `id`: Die Bestätigungs-ID. Sie können diesen Wert verwenden, um [die Bestätigung auf der Blockchain zu lesen](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64), um zu verifizieren, dass die Informationen aus der GraphQL-Abfrage korrekt sind.
- `data`: Die Schemadaten (in diesem Fall die E-Mail-Adresse).

```typescript
        attester
        id
        data
      }
    }
  `

  const variables = {
    schemaId: {
      equals:
        "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977",
    },
    recipient: {
      equals: getAddress(ethAddr),
    },
  }

  const response: any = await easClient.request(query, variables)

```

Wenn es keine Bestätigung gibt, geben Sie einen Wert zurück, der offensichtlich falsch ist, aber dem Dienstanbieter als gültig erscheinen würde.

```typescript
  if (response.attestations.length === 0) {
    return `${ethAddr}@no.attestation.found`
  }

```

Wenn ein Wert vorhanden ist, verwenden Sie `decodeData`, um die Daten zu dekodieren. Wir benötigen nicht die bereitgestellten Metadaten, sondern nur den Wert selbst.

```typescript
  const data = schemaEncoder.decodeData(response.attestations[0].data)
  return data[0].value.value
}

samlify.setSchemaValidator(validator)
```

Verwenden Sie die neue Funktion, um die E-Mail-Adresse zu erhalten.

```typescript
  const email = await getEmail(address)

  const { context } = await idp.createLoginResponse(
    sp,
    {
      extract: {
        request: {
          id: reqId,
        },
      },
    },
    "post",
    {
      signingKey: fs.readFileSync("./keys/idp-key.pem"),
    },
    (template: string) => {
      return template.replace("{nameID}", email)
    }
  )
```

## Was ist mit Dezentralisierung?

In dieser Konfiguration können Benutzer nicht vorgeben, jemand zu sein, der sie nicht sind, solange wir uns auf vertrauenswürdige Bestätigende für die Zuordnung von Ethereum- zu E-Mail-Adressen verlassen. Unser Identitätsanbieter ist jedoch immer noch eine zentralisierte Komponente. Wer auch immer den Private-Key des Identitätsanbieters besitzt, kann falsche Informationen an den Dienstanbieter senden.

Es könnte eine Lösung geben, die [Multi-Party Computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) verwendet. Ich hoffe, in einem zukünftigen Tutorial darüber zu schreiben.

## Fazit

Die Einführung eines Anmeldestandards, wie z. B. Ethereum-Signaturen, steht vor einem Henne-Ei-Problem. Dienstanbieter möchten einen möglichst breiten Markt ansprechen. Benutzer möchten auf Dienste zugreifen können, ohne sich Gedanken über die Unterstützung ihres Anmeldestandards machen zu müssen.
Die Erstellung von Adaptern, wie z. B. einem Ethereum-IdP, kann uns helfen, diese Hürde zu überwinden.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).