---
title: Erste Schritte mit der Ethereum-Entwicklung
description: "Dies ist ein Anfängerleitfaden für die ersten Schritte in der Ethereum-Entwicklung. Wir begleiten dich von der Einrichtung eines API-Endpunkts über eine Befehlszeilenanfrage bis hin zum Schreiben deines ersten Web3-Skripts! Keine Erfahrung in der Blockchain-Entwicklung erforderlich!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "Blockchain-Knoten", "Abfragen", "Alchemy"]
skill: beginner
breadcrumb: Erste Schritte
lang: de
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum- und Alchemy-Logos](./ethereum-alchemy.png)

Dies ist ein Anfängerleitfaden für die ersten Schritte in der Ethereum-Entwicklung. Für dieses Tutorial verwenden wir [Alchemy](https://alchemyapi.io/), die führende Blockchain-Entwicklerplattform, die Millionen von Nutzern von 70 % der Top-Blockchain-Apps unterstützt, darunter Maker, 0x, MyEtherWallet, Dharma und Kyber. Alchemy gibt uns Zugriff auf einen API-Endpunkt auf der Ethereum-Chain, damit wir Transaktionen lesen und schreiben können.

Wir begleiten dich von der Anmeldung bei Alchemy bis zum Schreiben deines ersten Web3-Skripts! Keine Erfahrung in der Blockchain-Entwicklung erforderlich!

## 1. Melde dich für ein kostenloses Alchemy-Konto an {#sign-up-for-a-free-alchemy-account}

Das Erstellen eines Kontos bei Alchemy ist einfach, [melde dich hier kostenlos an](https://auth.alchemy.com/).

## 2. Erstelle eine Alchemy-App {#create-an-alchemy-app}

Um mit der Ethereum-Chain zu kommunizieren und die Produkte von Alchemy zu nutzen, benötigst du einen API-Schlüssel, um deine Anfragen zu authentifizieren.

Du kannst [API-Schlüssel über das Dashboard erstellen](https://dashboard.alchemy.com/). Um einen neuen Schlüssel zu erstellen, navigiere zu „Create App“, wie unten gezeigt:

Ein besonderer Dank geht an [_ShapeShift_](https://shapeshift.com/), _dass wir ihr Dashboard zeigen dürfen!_

![Alchemy-Dashboard](./alchemy-dashboard.png)

Fülle die Details unter „Create App“ aus, um deinen neuen Schlüssel zu erhalten. Hier siehst du auch Apps, die du zuvor erstellt hast, sowie solche, die von deinem Team erstellt wurden. Rufe vorhandene Schlüssel ab, indem du bei einer beliebigen App auf „View Key“ klickst.

![Screenshot: App mit Alchemy erstellen](./create-app.png)

Du kannst auch vorhandene API-Schlüssel abrufen, indem du mit der Maus über „Apps“ fährst und eine auswählst. Hier kannst du auf „View Key“ klicken sowie auf „Edit App“, um bestimmte Domains auf die Whitelist zu setzen, verschiedene Entwicklertools zu sehen und Analysen anzuzeigen.

![Gif, das einem Benutzer zeigt, wie man API-Schlüssel abruft](./pull-api-keys.gif)

## 3. Stelle eine Anfrage über die Befehlszeile {#make-a-request-from-the-command-line}

Interagiere mit der Ethereum-Blockchain über Alchemy mithilfe von JSON-RPC und curl.

Für manuelle Anfragen empfehlen wir die Interaktion mit dem `JSON-RPC` über `POST`-Anfragen. Übergib einfach den Header `Content-Type: application/json` und deine Abfrage als `POST`-Body mit den folgenden Feldern:

- `jsonrpc`: Die JSON-RPC-Version – derzeit wird nur `2.0` unterstützt.
- `method`: Die ETH-API-Methode. [Siehe API-Referenz.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Eine Liste von Parametern, die an die Methode übergeben werden sollen.
- `id`: Die ID deiner Anfrage. Wird in der Antwort zurückgegeben, damit du nachverfolgen kannst, zu welcher Anfrage eine Antwort gehört.

Hier ist ein Beispiel, das du über die Befehlszeile ausführen kannst, um den aktuellen Gaspreis abzurufen:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**HINWEIS:** Ersetze [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) durch deinen eigenen API-Schlüssel `https://eth-mainnet.alchemyapi.io/v2/**dein-api-schluessel`._

**Ergebnisse:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Richte deinen Web3-Client ein {#set-up-your-web3-client}

**Wenn du bereits einen Client hast,** ändere deine aktuelle Blockchain-Knoten-Anbieter-URL in eine Alchemy-URL mit deinem API-Schlüssel: `„https://eth-mainnet.alchemyapi.io/v2/dein-api-schluessel“`

**_HINWEIS:_** Die folgenden Skripte müssen in einem **Node-Kontext** ausgeführt oder **in einer Datei gespeichert** werden und dürfen nicht über die Befehlszeile ausgeführt werden. Wenn du Node oder npm noch nicht installiert hast, sieh dir diese kurze [Einrichtungsanleitung für Macs](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) an.

Es gibt unzählige [Web3-Bibliotheken](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), die du in Alchemy integrieren kannst. Wir empfehlen jedoch die Verwendung von [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), einem direkten Ersatz für web3.js, der so entwickelt und konfiguriert wurde, dass er nahtlos mit Alchemy zusammenarbeitet. Dies bietet mehrere Vorteile wie automatische Wiederholungsversuche und robuste WebSocket-Unterstützung.

Um AlchemyWeb3.js zu installieren, **navigiere zu deinem Projektverzeichnis** und führe Folgendes aus:

**Mit Yarn:**

```
yarn add @alch/alchemy-web3
```

**Mit NPM:**

```
npm install @alch/alchemy-web3
```

Um mit der Blockchain-Knoten-Infrastruktur von Alchemy zu interagieren, führe dies in NodeJS aus oder füge es einer JavaScript-Datei hinzu:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Schreibe dein erstes Web3-Skript! {#write-your-first-web3-script}

Um nun etwas praktische Erfahrung mit der Web3-Programmierung zu sammeln, schreiben wir ein einfaches Skript, das die neueste Blocknummer aus dem Ethereum-Mainnet ausgibt.

**1. Falls noch nicht geschehen, erstelle in deinem Terminal ein neues Projektverzeichnis und wechsle mit cd dorthin:**

```
mkdir web3-example
cd web3-example
```

**2. Installiere die Alchemy-Web3-Abhängigkeit (oder eine beliebige Web3-Abhängigkeit) in deinem Projekt, falls du dies noch nicht getan hast:**

```
npm install @alch/alchemy-web3
```

**3. Erstelle eine Datei namens `index.js` und füge den folgenden Inhalt hinzu:**

> Du solltest letztendlich `demo` durch deinen Alchemy-HTTP-API-Schlüssel ersetzen.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Nicht vertraut mit asynchronen Konzepten? Sieh dir diesen [Medium-Beitrag](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) an.

**4. Führe es in deinem Terminal mit Node aus**

```
node index.js
```

**5. Du solltest nun die Ausgabe der neuesten Blocknummer in deiner Konsole sehen!**

```
The latest block number is 11043912
```

**Juhu! Glückwunsch! Du hast gerade dein erstes Web3-Skript mit Alchemy geschrieben 🎉**

Nicht sicher, was du als Nächstes tun sollst? Versuche, deinen ersten Smart Contract bereitzustellen, und sammle praktische Erfahrungen mit der Solidity-Programmierung in unserem [Hello World Smart Contract-Leitfaden](https://www.alchemy.com/docs/hello-world-smart-contract), oder teste dein Dashboard-Wissen mit der [Dashboard-Demo-App](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Melde dich kostenlos bei Alchemy an](https://auth.alchemy.com/), sieh dir unsere [Dokumentation](https://www.alchemy.com/docs/) an und folge uns für die neuesten Nachrichten auf [Twitter](https://twitter.com/AlchemyPlatform)_.