---
title: Verwendung von Ethereum für die Web2-Authentifizierung
description: Nach der Lektüre dieses Tutorials kann ein Entwickler die Ethereum-Anmeldung (Web3) in die SAML-Anmeldung integrieren, einen in Web2 verwendeten Standard zur Bereitstellung von Single Sign-On und anderen damit verbundenen Diensten. Dies ermöglicht die Authentifizierung des Zugriffs auf Web2-Ressourcen durch Ethereum-Signaturen, wobei die Benutzerattribute aus Attestierungen stammen.
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
tags: [ "web2", "authentifizierung", "eas" ]
skill: beginner
lang: de
published: 2025-04-30
---

## Einführung

[SAML](https://www.onelogin.com/learn/saml) ist ein in Web2 verwendeter Standard, der es einem [Identitätsanbieter (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) ermöglicht, Benutzerinformationen für [Dienstanbieter (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)) bereitzustellen.

In diesem Tutorial lernen Sie, wie Sie Ethereum-Signaturen in SAML integrieren, damit Benutzer ihre Ethereum-Wallets zur Authentifizierung bei Web2-Diensten verwenden können, die Ethereum noch nicht nativ unterstützen.

Beachten Sie, dass dieses Tutorial für zwei verschiedene Zielgruppen geschrieben wurde:

- Ethereum-Leute, die Ethereum verstehen und SAML lernen müssen
- Web2-Leute, die SAML und die Web2-Authentifizierung verstehen und Ethereum lernen müssen

Daher wird es eine Menge Einführungsmaterial enthalten, das Sie bereits kennen. Sie können es gerne überspringen.

### SAML für Ethereum-Leute

SAML ist ein zentralisiertes Protokoll. Ein Dienstanbieter (SP) akzeptiert nur dann Zusicherungen (z. B. „Dies ist mein Benutzer John, er sollte die Berechtigungen haben, A, B und C zu tun“) von einem Identitätsanbieter (IdP), wenn er eine bereits bestehende Vertrauensbeziehung entweder zu diesem oder zu der [Zertifizierungsstelle](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) hat, die das Zertifikat dieses IdP unterzeichnet hat.

Der SP kann beispielsweise ein Reisebüro sein, das Reisedienstleistungen für Unternehmen anbietet, und der IdP kann die interne Website eines Unternehmens sein. Wenn Mitarbeiter eine Geschäftsreise buchen müssen, schickt das Reisebüro sie zur Authentifizierung an das Unternehmen, bevor es sie tatsächlich die Reise buchen lässt.

![Schritt-für-Schritt-SAML-Prozess](./fig-01-saml.png)

Auf diese Weise verhandeln die drei Entitäten, der Browser, der SP und der IdP, über den Zugriff. Der SP muss im Voraus nichts über den Benutzer wissen, der den Browser verwendet, sondern nur dem IdP vertrauen.

### Ethereum für SAML-Leute

Ethereum ist ein dezentralisiertes System.

![Ethereum-Anmeldung](./fig-02-eth-logon.png)

Benutzer haben einen privaten Schlüssel (in der Regel in einer Browser-Erweiterung). Aus dem privaten Schlüssel können Sie einen öffentlichen Schlüssel und daraus eine 20-Byte-Adresse ableiten. Wenn sich Benutzer in einem System anmelden müssen, werden sie aufgefordert, eine Nachricht mit einer Nonce (einem einmalig verwendbaren Wert) zu signieren. Der Server kann überprüfen, ob die Signatur von dieser Adresse erstellt wurde.

![Zusätzliche Daten aus Attestierungen erhalten](./fig-03-eas-data.png)

Die Signatur verifiziert nur die Ethereum-Adresse. Um andere Benutzerattribute zu erhalten, verwenden Sie normalerweise [Attestierungen](https://attest.org/). Eine Attestierung hat normalerweise diese Felder:

- **Attestierer**, die Adresse, die die Attestierung vorgenommen hat
- **Empfänger**, die Adresse, für die die Attestierung gilt
- **Daten**, die zu bescheinigenden Daten, wie Name, Berechtigungen usw.
- **Schema**, die ID des Schemas, das zur Interpretation der Daten verwendet wird.

Aufgrund der dezentralen Natur von Ethereum kann jeder Benutzer Attestierungen erstellen. Die Identität des Attestierers ist wichtig, um zu bestimmen, welche Attestierungen wir als zuverlässig betrachten.

## Einrichtung

Der erste Schritt besteht darin, einen SAML-SP und einen SAML-IdP zu haben, die miteinander kommunizieren.

1. Laden Sie die Software herunter. Die Beispielsoftware für diesen Artikel ist [auf GitHub](https://github.com/qbzzt/250420-saml-ethereum) verfügbar. Verschiedene Phasen werden in verschiedenen Branches gespeichert, für diese Phase benötigen Sie `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Erstellen Sie Schlüssel mit selbstsignierten Zertifikaten. Das bedeutet, dass der Schlüssel seine eigene Zertifizierungsstelle ist und manuell beim Dienstanbieter importiert werden muss. Weitere Informationen finden Sie in den [OpenSSL-Dokumenten](https://docs.openssl.org/master/man1/openssl-req/).

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

4. Navigieren Sie zum SP unter der URL [http://localhost:3000/](http://localhost:3000/) und klicken Sie auf die Schaltfläche, um zum IdP (Port 3001) weitergeleitet zu werden.

5. Geben Sie dem IdP Ihre E-Mail-Adresse und klicken Sie auf **Beim Dienstanbieter anmelden**. Sehen Sie, dass Sie zum Dienstanbieter (Port 3000) zurückgeleitet werden und dass dieser Sie anhand Ihrer E-Mail-Adresse erkennt.

### Detaillierte Erklärung

Folgendes geschieht Schritt für Schritt:

![Normale SAML-Anmeldung ohne Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Diese Datei enthält die Konfiguration sowohl für den Identitätsanbieter als auch für den Dienstanbieter. Normalerweise wären dies zwei verschiedene Entitäten, aber hier können wir der Einfachheit halber Code gemeinsam nutzen.

```typescript
const fs = await import("fs")

const protocol="http"
```

Im Moment testen wir nur, daher ist die Verwendung von HTTP in Ordnung.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Lesen Sie die öffentlichen Schlüssel, die normalerweise beiden Komponenten zur Verfügung stehen (und denen entweder direkt vertraut wird oder die von einer vertrauenswürdigen Zertifizierungsstelle signiert sind).

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

Konventionell ist in SAML die `entityID` die URL, unter der die Metadaten der Entität verfügbar sind. Diese Metadaten entsprechen den hier vorliegenden öffentlichen Daten, außer dass sie in XML-Form vorliegen.

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

Die wichtigste Definition für unsere Zwecke ist der `assertionConsumerServer`. Das bedeutet, dass wir, um etwas gegenüber dem Dienstanbieter zu behaupten (z. B. „Der Benutzer, der Ihnen diese Informationen sendet, ist jemand@example.com“), einen [HTTP-POST](https://www.w3schools.com/tags/ref_httpmethods.asp) an die URL `http://localhost:3000/sp/assertion` verwenden müssen.

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

Die öffentlichen Daten für den Identitätsanbieter sind ähnlich. Es gibt an, dass Sie zum Anmelden eines Benutzers einen POST an `http://localhost:3001/idp/login` und zum Abmelden eines Benutzers einen POST an `http://localhost:3001/idp/logout` senden.

#### src/sp.mts

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

Die `samlify`-Bibliothek erwartet ein Paket, das validiert, dass das XML korrekt ist, mit dem erwarteten öffentlichen Schlüssel signiert ist usw. Wir verwenden [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) für diesen Zweck.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Ein [`express`](https://expressjs.com/)-[`Router`](https://expressjs.com/en/5x/api.html#router) ist eine „Mini-Website“, die innerhalb einer Website eingebunden werden kann. In diesem Fall verwenden wir ihn, um alle Definitionen des Dienstanbieters zusammenzufassen.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Die Eigendarstellung des Dienstanbieters besteht aus allen öffentlichen Daten und dem privaten Schlüssel, den er zum Signieren von Informationen verwendet.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Die öffentlichen Daten enthalten alles, was der Dienstanbieter über den Identitätsanbieter wissen muss.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Um die Interoperabilität mit anderen SAML-Komponenten zu ermöglichen, sollten Dienst- und Identitätsanbieter ihre öffentlichen Daten (die Metadaten) im XML-Format unter `/metadata` zur Verfügung stellen.

```typescript
spRouter.post(`/assertion`, 
```

Dies ist die Seite, auf die der Browser zugreift, um sich zu identifizieren. Die Zusicherung enthält die Benutzerkennung (hier verwenden wir die E-Mail-Adresse) und kann zusätzliche Attribute enthalten. Dies ist der Handler für Schritt 7 im obigen Sequenzdiagramm.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')})
```

Sie können den auskommentierten Befehl verwenden, um die in der Zusicherung bereitgestellten XML-Daten zu sehen. Sie ist [Base64-kodiert](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analysieren Sie die Anmeldeanforderung vom Identitätsserver.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hallo ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Senden Sie eine HTML-Antwort, nur um dem Benutzer zu zeigen, dass wir die Anmeldung erhalten haben.

```typescript
    } catch (err) {
      console.error('Fehler bei der Verarbeitung der SAML-Antwort:', err);
      res.status(400).send('SAML-Authentifizierung fehlgeschlagen');
    }
  }
)
```

Informieren Sie den Benutzer im Falle eines Fehlers.

```typescript
spRouter.get('/login',
```

Erstellen Sie eine Anmeldeanforderung, wenn der Browser versucht, diese Seite aufzurufen. Dies ist der Handler für Schritt 1 im obigen Sequenzdiagramm.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Holen Sie sich die Informationen, um eine Anmeldeanforderung zu posten.

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

Der Eingabename ist `loginRequest.type` (`SAMLRequest`). Der Inhalt für dieses Feld ist `loginRequest.context`, was wiederum XML ist, das Base64-kodiert ist.

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

Binden Sie den Router im Verzeichnis des Dienstanbieters (`/sp`) ein.

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Klicken Sie hier, um sich anzumelden
        </button>
      </body>
    </html>
  `)
})
```

Wenn ein Browser versucht, das Stammverzeichnis aufzurufen, stellen Sie ihm einen Link zur Anmeldeseite zur Verfügung.

```typescript
app.listen(config.spPort, () => {
  console.log(`Dienstanbieter läuft auf http://${config.spHostname}:${config.spPort}`)
})
```

Hören Sie mit dieser Express-Anwendung auf den `spPort`.

#### src/idp.mts

Dies ist der Identitätsanbieter. Er ist dem Dienstanbieter sehr ähnlich, die folgenden Erklärungen beziehen sich auf die Teile, die sich unterscheiden.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Attribute beibehalten
    attributeNamePrefix: "@_", // Präfix für Attribute
  }
)
```

Wir müssen die XML-Anforderung, die wir vom Dienstanbieter erhalten, lesen und verstehen.

```typescript
const getLoginPage = requestId => `
```

Diese Funktion erstellt die Seite mit dem automatisch übermittelten Formular, das in Schritt 4 des obigen Sequenzdiagramms zurückgegeben wird.

```typescript
<html>
  <head>
    <title>Anmeldeseite</title>
  </head>
  <body>
    <h2>Anmeldeseite</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      E-Mail-Adresse: <input name="email" />
      <br />
      <button type="Submit">
        Beim Dienstanbieter anmelden
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

Dies ist der Handler für Schritt 5 des obigen Sequenzdiagramms. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) erstellt die Anmeldeantwort.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Die Zielgruppe ist der Dienstanbieter.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Aus der Anfrage extrahierte Informationen. Der einzige Parameter, der uns in der Anfrage interessiert, ist die requestId, die es dem Dienstanbieter ermöglicht, Anfragen und deren Antworten zuzuordnen.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Signierung sicherstellen
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

Verwenden Sie erneut ein automatisch übermitteltes Formular. Dies ist Schritt 6 im obigen Sequenzdiagramm.

```typescript

// IdP-Endpunkt für Anmeldeanforderungen
idpRouter.post(`/login`,
```

Dies ist der Endpunkt, der eine Anmeldeanforderung vom Dienstanbieter empfängt. Dies ist der Handler für Schritt 3 des obigen Sequenzdiagramms.

```typescript
  async (req, res) => {
    try {
      // Workaround, weil ich parseLoginRequest nicht zum Laufen bringen konnte.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Wir sollten [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) verwenden können, um die ID der Authentifizierungsanforderung zu lesen. Ich konnte es jedoch nicht zum Laufen bringen und es war nicht wert, viel Zeit damit zu verbringen, also verwende ich einfach einen [allgemeinen XML-Parser](https://www.npmjs.com/package/fast-xml-parser). Die Information, die wir benötigen, ist das `ID`-Attribut innerhalb des `<samlp:AuthnRequest>`-Tags, das sich auf der obersten Ebene des XML befindet.

## Verwendung von Ethereum-Signaturen

Nachdem wir nun eine Benutzeridentität an den Dienstanbieter senden können, besteht der nächste Schritt darin, die Benutzeridentität auf vertrauenswürdige Weise zu erhalten. Viem ermöglicht es uns, die Wallet einfach nach der Benutzeradresse zu fragen, aber das bedeutet, den Browser nach den Informationen zu fragen. Wir kontrollieren den Browser nicht, daher können wir der Antwort, die wir von ihm erhalten, nicht automatisch vertrauen.

Stattdessen wird der IdP dem Browser eine zu signierende Zeichenfolge senden. Wenn die Wallet im Browser diese Zeichenfolge signiert, bedeutet dies, dass es sich wirklich um diese Adresse handelt (d. h. sie kennt den privaten Schlüssel, der der Adresse entspricht).

Um dies in Aktion zu sehen, stoppen Sie den vorhandenen IdP und SP und führen Sie diese Befehle aus:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Navigieren Sie dann [zum SP](http://localhost:3000) und folgen Sie den Anweisungen.

Beachten Sie, dass wir an dieser Stelle nicht wissen, wie wir die E-Mail-Adresse aus der Ethereum-Adresse erhalten, also melden wir stattdessen `<Ethereum-Adresse>@bad.email.address` an den SP.

### Detaillierte Erklärung

Die Änderungen befinden sich in den Schritten 4-5 des vorherigen Diagramms.

![SAML mit einer Ethereum-Signatur](./fig-05-saml-w-signature.png)

Die einzige Datei, die wir geändert haben, ist `idp.mts`. Hier sind die geänderten Teile.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Wir benötigen diese beiden zusätzlichen Bibliotheken. Wir verwenden [`uuid`](https://www.npmjs.com/package/uuid), um den [Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)-Wert zu erstellen. Der Wert selbst spielt keine Rolle, nur die Tatsache, dass er nur einmal verwendet wird.

Die Bibliothek [`viem`](https://viem.sh/) ermöglicht es uns, Ethereum-Definitionen zu verwenden. Hier benötigen wir sie, um zu überprüfen, ob die Signatur tatsächlich gültig ist.

```typescript
const loginPrompt = "Um auf den Dienstanbieter zuzugreifen, signieren Sie diese Nonce: "
```

Die Wallet bittet den Benutzer um die Erlaubnis, die Nachricht zu signieren. Eine Nachricht, die nur eine Nonce ist, könnte Benutzer verwirren, daher fügen wir diese Aufforderung hinzu.

```typescript
// requestIDs hier aufbewahren
let nonces = {}
```

Wir benötigen die Anfrageinformationen, um darauf antworten zu können. Wir könnten sie mit der Anfrage (Schritt 4) senden und sie zurückerhalten (Schritt 5). Wir können jedoch den Informationen, die wir vom Browser erhalten, nicht vertrauen, da dieser unter der Kontrolle eines potenziell feindseligen Benutzers steht. Daher ist es besser, sie hier mit der Nonce als Schlüssel zu speichern.

Beachten Sie, dass wir dies der Einfachheit halber hier als Variable tun. Dies hat jedoch mehrere Nachteile:

- Wir sind anfällig für einen Denial-of-Service-Angriff. Ein böswilliger Benutzer könnte versuchen, sich mehrmals anzumelden und so unseren Speicher zu füllen.
- Wenn der IdP-Prozess neu gestartet werden muss, verlieren wir die vorhandenen Werte.
- Wir können keinen Lastenausgleich über mehrere Prozesse durchführen, da jeder seine eigene Variable hätte.

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

Wir benötigen mehrere Funktionen von `viem`.

```typescript
      if (!window.ethereum) {
          alert("Bitte installieren Sie MetaMask oder eine kompatible Wallet und laden Sie dann neu")
      }
```

Wir können nur arbeiten, wenn sich eine Wallet im Browser befindet.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Fordern Sie die Liste der Konten von der Wallet (`window.ethereum`) an. Gehen Sie davon aus, dass es mindestens eines gibt, und speichern Sie nur das erste.

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

Bitten Sie den Benutzer, eine Nachricht zu signieren. Da sich dieses gesamte HTML in einer [Vorlagenzeichenfolge](https://viem.sh/docs/clients/wallet) befindet, können wir Variablen verwenden, die im IDP-Prozess definiert sind. Dies ist Schritt 4.5 im Sequenzdiagramm.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Leiten Sie zu `/idp/signature/<nonce>/<address>/<signature>` um. Dies ist Schritt 5 im Sequenzdiagramm.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Die Signatur wird vom Browser zurückgesendet, der potenziell böswillig ist (es gibt nichts, was Sie davon abhält, einfach `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` im Browser zu öffnen). Daher ist es wichtig zu überprüfen, ob der IdP-Prozess fehlerhafte Signaturen korrekt behandelt.

```typescript
    </script>
  </head>
  <body>
    <h2>Bitte signieren</h2>
    <button onClick="window.goodSignature()">
      Eine gute (gültige) Signatur einreichen
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Eine schlechte (ungültige) Signatur einreichen
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
    res.send("Schlechte Nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Holen Sie sich die Anfrage-ID und löschen Sie die Nonce aus den `nonces`, um sicherzustellen, dass sie nicht wiederverwendet werden kann.

```typescript
  try {
```

Da es so viele Möglichkeiten gibt, wie die Signatur ungültig sein kann, umschließen wir dies in einem `try ...` `catch`-Block, um alle geworfenen Fehler abzufangen.

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
      throw("Schlechte Signatur")
  } catch (err) {
    res.send("Fehler:" + err)
    return ;
  }
```

Der Rest des Handlers ist äquivalent zu dem, was wir zuvor im `/loginSubmitted`-Handler getan haben, mit Ausnahme einer kleinen Änderung.

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

Wir haben nicht die tatsächliche E-Mail-Adresse (wir werden sie im nächsten Abschnitt erhalten), also geben wir vorerst die Ethereum-Adresse zurück und kennzeichnen sie deutlich als keine E-Mail-Adresse.

```typescript
// IdP-Endpunkt für Anmeldeanforderungen
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Workaround, weil ich parseLoginRequest nicht zum Laufen bringen konnte.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Fehler bei der Verarbeitung der SAML-Antwort:', err);
      res.status(400).send('SAML-Authentifizierung fehlgeschlagen');
    }
  }
)
```

Verwenden Sie jetzt anstelle von `getLoginPage` `getSignaturePage` im Handler für Schritt 3.

## Abrufen der E-Mail-Adresse

Der nächste Schritt ist das Abrufen der E-Mail-Adresse, der vom Dienstanbieter angeforderten Kennung. Dazu verwenden wir den [Ethereum Attestation Service (EAS)](https://attest.org/).

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

Diese [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) enthält nur eine E-Mail-Adresse. Diese Abfrage fragt nach Attestierungen dieses Schemas. Das Subjekt der Attestierung wird als `Empfänger` bezeichnet. Es ist immer eine Ethereum-Adresse.

Warnung: Die Art und Weise, wie wir hier Attestierungen erhalten, hat zwei Sicherheitsprobleme.

- Wir greifen auf den API-Endpunkt `https://optimism.easscan.org/graphql` zu, der eine zentralisierte Komponente ist. Wir können das `id`-Attribut erhalten und dann eine On-Chain-Abfrage durchführen, um zu überprüfen, ob eine Attestierung echt ist, aber der API-Endpunkt kann immer noch Attestierungen zensieren, indem er uns nicht darüber informiert.

  Dieses Problem ist nicht unlösbar, wir könnten unseren eigenen GraphQL-Endpunkt betreiben und die Attestierungen aus den Chain-Logs abrufen, aber das ist für unsere Zwecke übertrieben.

- Wir schauen nicht auf die Identität des Attestierers. Jeder kann uns falsche Informationen liefern. In einer realen Implementierung hätten wir eine Reihe vertrauenswürdiger Attestierer und würden nur deren Attestierungen betrachten.

Um dies in Aktion zu sehen, stoppen Sie den vorhandenen IdP und SP und führen Sie diese Befehle aus:

```sh
git checkout email-address
pnpm install
pnpm start
```

Geben Sie dann Ihre E-Mail-Adresse an. Sie haben zwei Möglichkeiten, dies zu tun:

- Importieren Sie eine Wallet mit einem privaten Schlüssel und verwenden Sie den privaten Testschlüssel `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Fügen Sie eine Attestierung für Ihre eigene E-Mail-Adresse hinzu:

  1. Navigieren Sie zu [dem Schema im Attestierungs-Explorer](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Klicken Sie auf **Mit Schema attestieren**.

  3. Geben Sie Ihre Ethereum-Adresse als Empfänger und Ihre E-Mail-Adresse als E-Mail-Adresse ein und wählen Sie **On-Chain**. Klicken Sie dann auf **Attestierung erstellen**.

  4. Genehmigen Sie die Transaktion in Ihrer Wallet. Sie benötigen etwas ETH auf der [Optimism Blockchain](https://app.optimism.io/bridge/deposit), um für Gas zu bezahlen.

So oder so, navigieren Sie danach zu [http://localhost:3000](http://localhost:3000) und folgen Sie den Anweisungen. Wenn Sie den privaten Testschlüssel importiert haben, lautet die E-Mail, die Sie erhalten, `test_addr_0@example.com`. Wenn Sie Ihre eigene Adresse verwendet haben, sollte es das sein, was Sie attestiert haben.

### Detaillierte Erklärung

![Von der Ethereum-Adresse zur E-Mail gelangen](./fig-06-saml-sig-n-email.png)

Die neuen Schritte sind die GraphQL-Kommunikation, Schritte 5.6 und 5.7.

Auch hier sind die geänderten Teile von `idp.mts`.

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

Erstellen Sie einen neuen `GraphQLClient`-Client, den wir zur Abfrage des Endpunkts verwenden können.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL gibt uns nur ein undurchsichtiges Datenobjekt mit Bytes. Um es zu verstehen, benötigen wir das Schema.

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
      Attestierungen(
```

Wir suchen nach Attestierungen.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Die Attestierungen, die wir wollen, sind diejenigen in unserem Schema, bei denen der Empfänger `getAddress(ethAddr)` ist. Die Funktion [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) stellt sicher, dass unsere Adresse die korrekte [Prüfsumme](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) hat. Dies ist notwendig, da bei GraphQL die Groß- und Kleinschreibung beachtet wird. "0xBAD060A7", "0xBad060A7" und "0xbad060a7" sind verschiedene Werte.

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

Die Felder, die wir empfangen wollen.

- `attester`: Die Adresse, die die Attestierung eingereicht hat. Normalerweise wird dies verwendet, um zu entscheiden, ob der Attestierung vertraut werden soll oder nicht.
- `id`: Die Attestierungs-ID. Sie können diesen Wert verwenden, um [die Attestierung On-Chain zu lesen](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) und zu überprüfen, ob die Informationen aus der GraphQL-Abfrage korrekt sind.
- `data`: Die Schemadaten (in diesem Fall die E-Mail-Adresse).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Wenn keine Attestierung vorhanden ist, geben Sie einen Wert zurück, der offensichtlich falsch ist, aber für den Dienstanbieter gültig erscheinen würde.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Wenn ein Wert vorhanden ist, verwenden Sie `decodeData`, um die Daten zu dekodieren. Wir benötigen nicht die Metadaten, die es bereitstellt, sondern nur den Wert selbst.

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

Verwenden Sie die neue Funktion, um die E-Mail-Adresse abzurufen.

## Was ist mit der Dezentralisierung?

In dieser Konfiguration können sich Benutzer nicht als jemand ausgeben, der sie nicht sind, solange wir uns auf vertrauenswürdige Attestierer für die Zuordnung von Ethereum- zu E-Mail-Adressen verlassen. Unser Identitätsanbieter ist jedoch immer noch eine zentralisierte Komponente. Wer den privaten Schlüssel des Identitätsanbieters besitzt, kann falsche Informationen an den Dienstanbieter senden.

Es könnte eine Lösung geben, die [Mehrparteienberechnung (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) verwendet. Ich hoffe, in einem zukünftigen Tutorial darüber zu schreiben.

## Zusammenfassung

Die Einführung eines Anmeldestandards wie Ethereum-Signaturen steht vor einem Henne-Ei-Problem. Dienstanbieter wollen den größtmöglichen Markt ansprechen. Benutzer möchten auf Dienste zugreifen können, ohne sich Gedanken über die Unterstützung ihres Anmeldestandards machen zu müssen.
Die Erstellung von Adaptern, wie z. B. einem Ethereum-IdP, kann uns helfen, diese Hürde zu überwinden.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
