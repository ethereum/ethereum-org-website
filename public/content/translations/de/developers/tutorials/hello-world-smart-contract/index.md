---
title: "Hello World Smart Contract für Anfänger"
description: "Einführendes Tutorial zum Schreiben und Bereitstellen eines einfachen Smart Contracts auf Ethereum."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "Smart Contracts", "Bereitstellung"]
skill: beginner
breadcrumb: Hello World Vertrag
lang: de
published: 2021-03-31
---

Wenn Sie neu in der Blockchain-Entwicklung sind und nicht wissen, wo Sie anfangen sollen, oder wenn Sie einfach nur verstehen möchten, wie man Smart Contracts bereitstellt und mit ihnen interagiert, ist dieser Leitfaden genau das Richtige für Sie. Wir werden die Erstellung und Bereitstellung eines einfachen Smart Contracts im Sepolia-Testnetzwerk (Testnet) durchgehen, wobei wir eine virtuelle Wallet [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) und [Alchemy](https://www.alchemy.com/eth) verwenden (keine Sorge, wenn Sie noch nicht verstehen, was das alles bedeutet, wir werden es erklären).

Sobald Ihr Vertrag bereitgestellt ist, können Sie [eine Benutzeroberfläche dafür erstellen](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Wenn Sie zu irgendeinem Zeitpunkt Fragen haben, können Sie sich gerne im [Alchemy Discord](https://discord.gg/gWuC7zB) melden!

## Schritt 1: Mit dem Ethereum-Netzwerk verbinden {#step-1}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Chain zu stellen. Der Einfachheit halber verwenden wir ein kostenloses Konto bei Alchemy, einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne unsere eigenen Knoten betreiben zu müssen. Die Plattform verfügt auch über Entwicklertools für Überwachung und Analysen, die wir in diesem Tutorial nutzen werden, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts intern abläuft. Wenn Sie noch kein Alchemy-Konto haben, [können Sie sich hier kostenlos anmelden](https://dashboard.alchemy.com/signup).

## Schritt 2: Erstellen Sie Ihre App (und Ihren API-Schlüssel) {#step-2}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Dies ermöglicht es uns, Anfragen an das Sepolia-Testnetzwerk zu stellen. Wenn Sie nicht mit Testnets vertraut sind, sehen Sie sich [diese Seite](/developers/docs/networks/) an.

1.  Navigieren Sie zur Seite „Create new app“ (Neue App erstellen) in Ihrem Alchemy-Dashboard, indem Sie in der Navigationsleiste „Select an app“ (Eine App auswählen) wählen und auf „Create new app“ klicken.

![Hello world create app](./hello-world-create-app.png)

2. Nennen Sie Ihre App „Hello World“, geben Sie eine kurze Beschreibung an und wählen Sie einen Anwendungsfall, z. B. „Infra & Tooling“. Suchen Sie als Nächstes nach „Ethereum“ und wählen Sie das Netzwerk aus.

![create app view hello world](./create-app-view-hello-world.png)

3. Klicken Sie auf „Next“ (Weiter), um fortzufahren, dann auf „Create app“ (App erstellen) und das war's! Ihre App sollte im Dropdown-Menü der Navigationsleiste erscheinen, mit einem API-Schlüssel, den Sie kopieren können.

## Schritt 3: Erstellen Sie ein Ethereum-Konto (Adresse) {#step-3}

Wir benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. Für dieses Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, die zur Verwaltung Ihrer Ethereum-Konto-Adresse verwendet wird. Mehr zu [Transaktionen](/developers/docs/transactions/).

Sie können MetaMask herunterladen und [hier](https://metamask.io/download) kostenlos ein Ethereum-Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie über das Netzwerk-Dropdown-Menü zum Testnetzwerk „Sepolia“ wechseln (damit wir nicht mit echtem Geld hantieren).

Wenn Sepolia nicht aufgeführt ist, öffnen Sie das Menü in der oberen rechten Ecke, wählen Sie „Networks“ (Netzwerke) und aktivieren Sie unten in der Netzwerkliste „Show test networks“ (Testnetzwerke anzeigen) (siehe [MetaMasks Leitfaden zur Anzeige von Testnets](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Wählen Sie dann „Sepolia“ im Netzwerkauswahlmenü.

![metamask sepolia example](./metamask-sepolia-example.png)

## Schritt 4: Fügen Sie Ether aus einem Faucet hinzu {#step-4}

Um unseren Smart Contract im Testnetzwerk bereitzustellen, benötigen wir etwas falsches ETH. Um Sepolia-ETH zu erhalten, können Sie zu den [Sepolia-Netzwerkdetails](/developers/docs/networks/#sepolia) gehen, um eine Liste verschiedener Faucets anzuzeigen. Wenn eines nicht funktioniert, versuchen Sie ein anderes, da sie manchmal leerlaufen können. Einige Faucets haben Teilnahmebedingungen; zum Beispiel erfordert das Sepolia-Faucet von Alchemy, dass die Empfängeradresse mindestens 0,001 ETH im Ethereum Mainnet hält. Es kann aufgrund des Netzwerkverkehrs einige Zeit dauern, bis Sie Ihr falsches ETH erhalten. Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen!

## Schritt 5: Überprüfen Sie Ihr Guthaben {#step-5}

Um sicherzustellen, dass unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Dies gibt die Menge an ETH in unserer Wallet zurück. Nachdem Sie Ihre MetaMask-Konto-Adresse eingegeben und auf „Send Request“ (Anfrage senden) geklickt haben, sollten Sie eine Antwort wie diese sehen:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **HINWEIS:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als die kleinste Stückelung von Ether verwendet. Die Umrechnung von Wei in ETH lautet: 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0x2B5E3AF16B1880000 in eine Dezimalzahl umwandeln, erhalten wir 5\*10¹⁸, was 5 ETH entspricht.
>
> Puh! Unser falsches Geld ist komplett da <Emoji text=":money_mouth_face:" size={1} />.

## Schritt 6: Initialisieren Sie unser Projekt {#step-6}

Zuerst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zu Ihrer Befehlszeile und tippen Sie:

```sh
mkdir hello-world
cd hello-world
```

Da wir uns nun in unserem Projektordner befinden, verwenden wir `npm init`, um das Projekt zu initialisieren. Wenn Sie npm noch nicht installiert haben, folgen Sie [den Installationsanweisungen für Node.js](https://nodejs.org/en/download/) (wir benötigen Node.js und npm für dieses Tutorial).

```sh
npm init
```

Es ist nicht wirklich wichtig, wie Sie die Installationsfragen beantworten, hier ist als Referenz, wie wir es gemacht haben:

```text
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Genehmigen Sie die package.json. Hardhat 3, das wir als Nächstes installieren, unterstützt nur ES-Modul-Projekte, markieren Sie das Projekt also als solches:

```sh
npm pkg set type=module
```

Und schon kann es losgehen!

## Schritt 7: Laden Sie [Hardhat](https://hardhat.org/docs/getting-started) herunter {#step-7}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern beim lokalen Erstellen von Smart Contracts und dezentralen Anwendungen (Dapps), bevor sie auf der Live-Chain bereitgestellt werden.

Hardhat 3 erfordert Node.js v22.13.0 oder neuer. Führen Sie in unserem `hello-world`-Projekt Folgendes aus:

```sh
npm install --save-dev hardhat
```

Auf dieser Seite finden Sie weitere Details zu den [Installationsanweisungen](https://hardhat.org/docs/getting-started).

## Schritt 8: Erstellen Sie ein Hardhat-Projekt {#step-8}

Das Ausführen von `npx hardhat --init` würde ein komplettes Beispielprojekt generieren, aber für dieses Tutorial richten wir die Dinge von Hand ein, damit Sie jedes Teil sehen können. Erstellen Sie im Stammverzeichnis Ihres Projektordners eine Datei namens `hardhat.config.js` mit folgendem Inhalt:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Hier werden wir die gesamte Einrichtung für unser Projekt festlegen (in Schritt 13). Vorerst teilt es Hardhat nur mit, welche Version des Solidity-Compilers verwendet werden soll.

## Schritt 9: Fügen Sie Projektordner hinzu {#step-9}

Um unser Projekt übersichtlich zu halten, erstellen wir zwei neue Ordner. Navigieren Sie in Ihrer Befehlszeile zum Stammverzeichnis Ihres Projekts und tippen Sie:

```
mkdir contracts
mkdir scripts
```

- In `contracts/` werden wir unsere Code-Datei für den Hello World Smart Contract aufbewahren.
- In `scripts/` werden wir Skripte aufbewahren, um unseren Vertrag bereitzustellen und mit ihm zu interagieren.

## Schritt 10: Schreiben Sie unseren Vertrag {#step-10}

Sie fragen sich vielleicht, wann zum Teufel wir Code schreiben werden?? Nun, hier sind wir, bei Schritt 10.

Öffnen Sie das hello-world-Projekt in Ihrem bevorzugten Editor (wir mögen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben, die wir verwenden werden, um unseren HelloWorld.sol Smart Contract zu schreiben.‌

1.  Navigieren Sie zum Ordner „contracts“ und erstellen Sie eine neue Datei namens HelloWorld.sol.
2.  Unten sehen Sie einen beispielhaften Hello World Smart Contract von der Ethereum Foundation, den wir für dieses Tutorial verwenden werden. Kopieren Sie den folgenden Inhalt und fügen Sie ihn in Ihre HelloWorld.sol-Datei ein. Lesen Sie unbedingt die Kommentare, um zu verstehen, was dieser Vertrag tut:

```solidity
// SPDX-License-Identifier: MIT
// Gibt die Version von Solidity unter Verwendung der semantischen Versionierung an.
// Mehr erfahren: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Definiert einen Vertrag namens `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand). Sobald er bereitgestellt ist, befindet sich ein Vertrag an einer bestimmten Adresse auf der Ethereum-Blockchain. Mehr erfahren: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Deklariert eine Zustandsvariable `message` vom Typ `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden. Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
   string public message;

   // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor eine spezielle Funktion, die nur bei der Vertragserstellung ausgeführt wird.
   // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren. Mehr erfahren: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akzeptiert ein String-Argument `initMessage` und setzt den Wert in die Speichervariable `message` des Vertrags).
      message = initMessage;
   }

   // Eine öffentliche Funktion, die ein String-Argument akzeptiert und die Speichervariable `message` aktualisiert.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Dies ist ein super einfacher Smart Contract, der bei der Erstellung eine Nachricht speichert und durch Aufrufen der Funktion `update` aktualisiert werden kann.

## Schritt 11: Verbinden Sie MetaMask und Alchemy mit Ihrem Projekt {#step-11}

Wir haben eine MetaMask-Wallet und ein Alchemy-Konto erstellt und unseren Smart Contract geschrieben. Nun ist es an der Zeit, die drei zu verbinden.

Jede Transaktion, die von Ihrer virtuellen Wallet gesendet wird, erfordert eine Signatur mit Ihrem eindeutigen privaten Schlüssel. Um unserem Programm diese Berechtigung zu erteilen, können wir unseren privaten Schlüssel (und den Alchemy-API-Schlüssel) sicher in einer Umgebungsdatei speichern.

> Um mehr über das Senden von Transaktionen zu erfahren, lesen Sie die [Transaktionsdokumentation](/developers/docs/transactions/).

Erstellen Sie eine `.env`-Datei im Stammverzeichnis unseres Projekts und fügen Sie Ihren privaten MetaMask-Schlüssel und die HTTP-Alchemy-API-URL hinzu.

- Befolgen Sie [diese Anweisungen](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), um Ihren privaten Schlüssel zu exportieren.
- Siehe unten, um die HTTP-Alchemy-API-URL zu erhalten.

![get alchemy api key](./get-alchemy-api-key.png)

Kopieren Sie die Alchemy-API-URL.

Ihre `.env` sollte so aussehen:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, werden wir in Schritt 13 in unserer Datei `hardhat.config.js` auf diese Variablen verweisen. Node.js kann `.env`-Dateien selbstständig lesen, sodass kein zusätzliches Paket installiert werden muss.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Committen Sie <code>.env</code> nicht! Bitte stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals mit jemandem teilen oder offenlegen, da Sie dadurch Ihre Geheimnisse gefährden. Wenn Sie eine Versionskontrolle verwenden, fügen Sie Ihre <code>.env</code> zu einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

## Schritt 12: Installieren Sie Ethers.js {#step-12-install-ethersjs}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen, indem sie [Standard-JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) mit benutzerfreundlicheren Methoden umhüllt.

Hardhat macht es super einfach, [Plugins](https://hardhat.org/docs/plugins/official-plugins) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/hardhat-ethers) für die Bereitstellung von Verträgen nutzen ([Ethers.js](https://docs.ethers.org/v6/) verfügt über einige sehr saubere Methoden zur Bereitstellung von Verträgen).

Tippen Sie in Ihrem Projektverzeichnis:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Wir werden das Plugin im nächsten Schritt auch zu unserer `hardhat.config.js` hinzufügen.

## Schritt 13: Aktualisieren Sie hardhat.config.js {#step-13-update-hardhatconfigjs}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt, jetzt müssen wir `hardhat.config.js` aktualisieren, damit unser Projekt von allen weiß.

Aktualisieren Sie Ihre `hardhat.config.js`, sodass sie wie folgt aussieht:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Lädt API_URL und PRIVATE_KEY aus der .env-Datei in process.env, falls diese existiert
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` weist Hardhat an, jeden Wert aus einer Umgebungsvariablen nur dann zu lesen, wenn er benötigt wird, sodass Befehle wie `compile` auch dann funktionieren, bevor die Werte festgelegt sind. Wenn Sie Ihren privaten Schlüssel lieber nicht in einer Klartextdatei aufbewahren möchten, kann Hardhat auch [Konfigurationsvariablen aus einem verschlüsselten Schlüsselspeicher lesen](https://hardhat.org/docs/guides/configuration-variables).

## Schritt 14: Kompilieren Sie unseren Vertrag {#step-14-compile-our-contracts}

Um sicherzustellen, dass bisher alles funktioniert, lassen Sie uns unseren Vertrag kompilieren. Die Aufgabe `compile` ist eine der integrierten Hardhat-Aufgaben.

Führen Sie in der Befehlszeile Folgendes aus:

```sh
npx hardhat compile
```

Beim ersten Kompilieren lädt Hardhat den Solidity-Compiler herunter. Sie sollten dann etwas wie `Compiled 1 Solidity file with solc 0.8.34` sehen. Wenn nicht, können Sie jederzeit im [Alchemy Discord](https://discord.gg/gWuC7zB) eine Nachricht schreiben.

## Schritt 15: Schreiben Sie unser Bereitstellungsskript {#step-15-write-our-deploy-scripts}

Da unser Vertrag nun geschrieben ist und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, unser Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`, der Sie den folgenden Inhalt hinzufügen:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Startet die Bereitstellung und gibt ein Promise zurück, das zu einem Vertragsobjekt aufgelöst wird
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Lassen Sie uns durchgehen, was jede dieser Codezeilen tut.

```js
const { ethers } = await network.create()
```

In Hardhat 3 öffnet ein Skript explizit eine Verbindung zu einem Netzwerk. `network.create()` stellt eine Verbindung zu dem Netzwerk her, das Sie mit der Option `--network` auswählen, wenn Sie das Skript ausführen, und das Plugin `hardhat-ethers` fügt dieser Verbindung ein `ethers`-Objekt hinzu.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Eine `ContractFactory` in Ethers.js ist eine Abstraktion, die zur Bereitstellung neuer Smart Contracts verwendet wird, daher ist `HelloWorld` hier eine Fabrik für Instanzen unseres Hello-World-Vertrags. Bei Verwendung des Plugins `hardhat-ethers` sind `ContractFactory`- und `Contract`-Instanzen standardmäßig mit dem ersten Unterzeichner verbunden.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Der Aufruf von `deploy()` auf einer `ContractFactory` startet die Bereitstellung und gibt ein `Promise` zurück, das in einen `Contract` aufgelöst wird. Dies ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen hat. Die Argumente, die Sie an `deploy()` übergeben, gehen an den Konstruktor des Vertrags, hier die anfängliche Nachricht.

`waitForDeployment()` wartet, bis die Bereitstellungstransaktion in einen Block aufgenommen wurde, und `getAddress()` gibt die Adresse des neuen Vertrags zurück. Weitere Details finden Sie in der [Vertragsdokumentation von Ethers.js](https://docs.ethers.org/v6/api/contract/).

## Schritt 16: Stellen Sie unseren Vertrag bereit {#step-16-deploy-our-contract}

Wir sind endlich bereit, unseren Smart Contract bereitzustellen! Navigieren Sie zur Befehlszeile und führen Sie Folgendes aus:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Sie sollten dann etwas in dieser Art sehen:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Wenn wir zum [Sepolia Etherscan](https://sepolia.etherscan.io/) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass er erfolgreich bereitgestellt wurde. Die Transaktion wird in etwa so aussehen:

![etherscan contract](./etherscan-contract.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Konto-Adresse übereinstimmen und die `To`-Adresse wird „Contract Creation“ (Vertragserstellung) lauten, aber wenn wir in die Transaktion klicken, sehen wir unsere Vertragsadresse im `To`-Feld:

![etherscan transaction](./etherscan-transaction.png)

Herzlichen Glückwunsch! Sie haben gerade einen Smart Contract auf der Ethereum-Chain bereitgestellt 🎉

Um zu verstehen, was intern abläuft, können Sie sich die Anfragen ansehen, die Ihre „Hello World“-App in Ihrem [Alchemy-Dashboard](https://dashboard.alchemy.com/) erhalten hat.

Dort sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers intern für uns getätigt haben, als wir die Funktion `.deploy()` aufgerufen haben. Zwei wichtige, die hier hervorgehoben werden sollten, sind [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), was die Anfrage ist, unseren Vertrag tatsächlich auf die Sepolia-Chain zu schreiben, und [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), was eine Anfrage ist, um Informationen über unsere Transaktion anhand des Hashes zu lesen (ein typisches Muster beim Senden von Transaktionen). Um mehr über das Senden von Transaktionen zu erfahren, lesen Sie die [Transaktionsdokumentation](/developers/docs/transactions/).

Das ist alles für dieses Tutorial. Als Nächstes können Sie [eine Benutzeroberfläche für Ihren Vertrag erstellen](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
