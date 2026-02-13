---
title: Erste Schritte in der Ethereum-Entwicklung
description: "Dies ist ein Leitfaden für Einsteiger in die Ethereum-Entwicklung. Wir führen dich vom Einrichten eines API-Endpunkts über eine Befehlszeilenanforderung bis hin zum Schreiben deines ersten Web3-Skripts! Es sind keine Vorkenntnisse in der Blockchain-Entwicklung erforderlich!"
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "Nodes",
    "Abfragen",
    "Alchemy"
  ]
skill: beginner
lang: de
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logos von Ethereum und Alchemy](./ethereum-alchemy.png)

Dies ist ein Anfängerleitfaden für den Einstieg in die Ethereum-Entwicklung. Für dieses Tutorial verwenden wir [Alchemy](https://alchemyapi.io/), die führende Blockchain-Entwicklerplattform, die Millionen von Nutzern von 70 % der Top-Blockchain-Apps wie Maker, 0x, MyEtherWallet, Dharma und Kyber antreibt. Alchemy gibt uns Zugriff auf einen API-Endpunkt auf der Ethereum-Chain, damit wir Transaktionen lesen und schreiben können.

Wir zeigen dir alle Schritte von der Anmeldung bei Alchemy bis hin zum Schreiben deines ersten Web3-Skripts! Es sind keine Vorkenntnisse in der Blockchain-Entwicklung erforderlich!

## 1. Registriere dich für ein kostenloses Alchemy-Konto {#sign-up-for-a-free-alchemy-account}

Ein Konto bei Alchemy zu erstellen ist einfach, [registriere dich hier kostenlos](https://auth.alchemy.com/).

## 2. Erstelle eine Alchemy-App {#create-an-alchemy-app}

Um mit der Ethereum-Chain zu kommunizieren und die Produkte von Alchemy zu nutzen, benötigst du einen API-Schlüssel, um deine Anfragen zu authentifizieren.

Du kannst [API-Schlüssel über das Dashboard erstellen](https://dashboard.alchemy.com/). Um einen neuen Schlüssel zu erstellen, navigiere zu „App erstellen“, wie unten gezeigt:

Besonderer Dank an [_ShapeShift_](https://shapeshift.com/), _dass wir ihr Dashboard zeigen dürfen!_

![Alchemy-Dashboard](./alchemy-dashboard.png)

Fülle die Details unter „App erstellen“ aus, um deinen neuen Schlüssel zu erhalten. Hier kannst du auch Apps sehen, die du zuvor erstellt hast, und solche, die von deinem Team erstellt wurden. Bestehende Schlüssel rufst du ab, indem du bei einer beliebigen App auf „Schlüssel anzeigen“ klickst.

![Screenshot der App-Erstellung mit Alchemy](./create-app.png)

Du kannst auch bestehende API-Schlüssel abrufen, indem du mit der Maus über „Apps“ fährst und eine auswählst. Hier kannst du den „Schlüssel anzeigen“ sowie die „App bearbeiten“, um bestimmte Domains auf die Whitelist zu setzen, mehrere Entwicklertools anzuzeigen und Analysen einzusehen.

![Gif, das zeigt, wie ein Nutzer API-Schlüssel abruft](./pull-api-keys.gif)

## 3. Eine Anfrage über die Befehlszeile stellen {#make-a-request-from-the-command-line}

Interagiere mit der Ethereum-Blockchain über Alchemy mithilfe von JSON-RPC und curl.

Für manuelle Anfragen empfehlen wir die Interaktion mit `JSON-RPC` über `POST`-Anfragen. Übergebe einfach den Header `Content-Type: application/json` und deine Anfrage als `POST`-Body mit den folgenden Feldern:

- `jsonrpc`: Die JSON-RPC-Version – derzeit wird nur `2.0` unterstützt.
- `method`: Die ETH-API-Methode. [Siehe API-Referenz.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Eine Liste von Parametern, die an die Methode übergeben werden.
- `id`: Die ID deiner Anfrage. Wird mit der Antwort zurückgegeben, damit du verfolgen kannst, zu welcher Anfrage eine Antwort gehört.

Hier ist ein Beispiel, das du in der Befehlszeile ausführen kannst, um den aktuellen Gaspreis abzurufen:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**HINWEIS:** Ersetze [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) durch deinen eigenen API-Schlüssel `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Ergebnisse:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Richte deinen Web3-Client ein {#set-up-your-web3-client}

**Wenn du bereits einen Client hast,** ändere die URL deines aktuellen Node Providers in eine Alchemy-URL mit deinem API-Schlüssel: `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_HINWEIS:_** Die folgenden Skripte müssen in einem **Node-Kontext** ausgeführt oder **in einer Datei gespeichert werden**, nicht über die Befehlszeile. Wenn du Node oder npm noch nicht installiert hast, sieh dir diese kurze [Einrichtungsanleitung für Macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) an.

Es gibt eine Vielzahl von [Web3-Bibliotheken](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), die du mit Alchemy integrieren kannst. Wir empfehlen jedoch [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) zu verwenden, einen Drop-in-Ersatz für web3.js, der für die nahtlose Zusammenarbeit mit Alchemy entwickelt und konfiguriert wurde. Dies bietet mehrere Vorteile, wie z. B. automatische Wiederholungsversuche und eine robuste WebSocket-Unterstützung.

Um AlchemyWeb3.js zu installieren, **navigiere zu deinem Projektverzeichnis** und führe aus:

**Mit Yarn:**

```
yarn add @alch/alchemy-web3
```

**Mit NPM:**

```
npm install @alch/alchemy-web3
```

Um mit der Knoten-Infrastruktur von Alchemy zu interagieren, führe dies in NodeJS aus oder füge es zu einer JavaScript-Datei hinzu:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Schreibe dein erstes Web3-Skript! {#write-your-first-web3-script}

Machen wir uns nun mit ein wenig Web3-Programmierung die Hände schmutzig und schreiben ein einfaches Skript, das die neueste Blocknummer aus dem Ethereum Mainnet ausgibt.

**1. Wenn du es noch nicht getan hast, erstelle in deinem Terminal ein neues Projektverzeichnis und wechsle mit cd hinein:**

```
mkdir web3-example
cd web3-example
```

**2. Installiere die Alchemy Web3 (oder eine andere Web3) Abhängigkeit in deinem Projekt, falls du dies noch nicht getan hast:**

```
npm install @alch/alchemy-web3
```

**3. Erstelle eine Datei namens `index.js` und füge den folgenden Inhalt hinzu:**

> Du solltest `demo` schlussendlich durch deinen Alchemy HTTP-API-Schlüssel ersetzen.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Die letzte Blocknummer ist " + blockNumber)
}
main()
```

Noch nicht mit async/await vertraut? Sieh dir diesen [Medium-Beitrag](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) an.

**4. Führe es mit node in deinem Terminal aus**

```
node index.js
```

**5. Du solltest jetzt die neueste Blocknummer in deiner Konsole ausgegeben sehen!**

```
Die letzte Blocknummer ist 11043912
```

**Woo!** Glückwunsch! Du hast soeben dein erstes Web3-Skript mit Alchemy geschrieben 🎉\*\*

Du weißt nicht, was du als Nächstes tun sollst? Versuche, deinen ersten Smart Contract bereitzustellen und versuche dich an der Solidity-Programmierung in unserem [Hello World Smart Contract Guide](https://www.alchemy.com/docs/hello-world-smart-contract), oder teste dein Dashboard-Wissen mit der [Dashboard Demo App](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Registriere dich kostenlos bei Alchemy](https://auth.alchemy.com/), sieh dir unsere [Dokumentation](https://www.alchemy.com/docs/) an und folge uns für die neuesten Nachrichten auf [Twitter](https://twitter.com/AlchemyPlatform)_.
