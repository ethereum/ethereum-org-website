---
title: "Hello World Smart-Contract für Einsteiger – Fullstack"
description: "Einführungstutorial zum Schreiben und Bereitstellen eines einfachen Smart Contracts auf Ethereum."
author: "nstrike2"
tags:
  [
    "solidity",
    "Hardhat",
    "Alchemy",
    "intelligente Verträge",
    "Bereitstellung",
    "Block-Explorer",
    "Frontend",
    "Transaktionen"
  ]
skill: beginner
lang: de
published: 2021-10-25
---

Dieser Leitfaden ist für Sie, wenn Sie neu in der Blockchain-Entwicklung sind und nicht wissen, wo Sie anfangen sollen oder wie Sie Smart Contracts bereitstellen und mit ihnen interagieren können. Wir werden die Erstellung und Bereitstellung eines einfachen Smart Contracts im Goerli-Testnet unter Verwendung von [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) und [Alchemy](https://alchemy.com/eth) durchgehen.

Sie benötigen ein Alchemy-Konto, um dieses Tutorial abzuschließen. [Registrieren Sie sich für ein kostenloses Konto](https://www.alchemy.com/).

Wenn Sie zu irgendeinem Zeitpunkt Fragen haben, können Sie sich gerne im [Alchemy Discord](https://discord.gg/gWuC7zB) melden!

## Teil 1 – Erstellen und Bereitstellen Ihres Smart Contracts mit Hardhat {#part-1}

### Verbindung mit dem Ethereum-Netzwerk herstellen {#connect-to-the-ethereum-network}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Chain zu stellen. Der Einfachheit halber verwenden wir ein kostenloses Konto bei Alchemy, einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne selbst einen Node betreiben zu müssen. Alchemy verfügt auch über Entwickler-Tools für Monitoring und Analytik; wir werden diese in diesem Tutorial nutzen, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts „unter der Haube“ passiert.

### Erstellen Sie Ihre App und Ihren API-Schlüssel {#create-your-app-and-api-key}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Damit können Sie Anfragen an das Goerli-Testnet stellen. Wenn Sie mit Testnets nicht vertraut sind, können Sie [Alchemys Leitfaden zur Auswahl eines Netzwerks](https://www.alchemy.com/docs/choosing-a-web3-network) lesen.

Suchen Sie auf dem Alchemy-Dashboard das Dropdown-Menü **Apps** in der Navigationsleiste und klicken Sie auf **App erstellen**.

![Hallo Welt App erstellen](./hello-world-create-app.png)

Geben Sie Ihrer App den Namen „_Hello World_“ und schreiben Sie eine kurze Beschreibung. Wählen Sie **Staging** als Ihre Umgebung und **Goerli** als Ihr Netzwerk.

![App-Ansicht erstellen Hallo Welt](./create-app-view-hello-world.png)

_Hinweis: Wählen Sie unbedingt **Goerli** aus, sonst funktioniert dieses Tutorial nicht._

Klicken Sie auf **App erstellen**. Ihre App wird in der folgenden Tabelle angezeigt.

### Ein Ethereum-Konto erstellen {#create-an-ethereum-account}

Sie benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. Wir verwenden MetaMask, eine virtuelle Wallet im Browser, mit der Benutzer ihre Ethereum-Kontoadresse verwalten können.

Sie können MetaMask [hier](https://metamask.io/download) kostenlos herunterladen und ein Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie oben rechts zum „Goerli Test Network“ wechseln (damit wir nicht mit echtem Geld arbeiten).

### Schritt 4: Ether von einem Faucet hinzufügen {#step-4-add-ether-from-a-faucet}

Um Ihren Smart Contract im Testnet bereitzustellen, benötigen Sie einige Fake-ETH. Um ETH im Goerli-Netzwerk zu erhalten, gehen Sie zu einem Goerli-Faucet und geben Sie Ihre Goerli-Kontoadresse ein. Beachten Sie, dass Goerli-Faucets in letzter Zeit etwas unzuverlässig sein können – auf der [Seite der Testnets](/developers/docs/networks/#goerli) finden Sie eine Liste mit Optionen, die Sie ausprobieren können:

_Hinweis: Aufgrund von Netzwerküberlastung kann dies eine Weile dauern._
``

### Schritt 5: Überprüfen Sie Ihr Guthaben {#step-5-check-your-balance}

Um zu überprüfen, ob sich die ETH in Ihrer Wallet befinden, stellen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Das gibt den ETH-Betrag in unserem Wallet wieder. Um mehr zu erfahren, sehen Sie sich [Alchemys kurzes Tutorial zur Verwendung des Composer-Tools](https://youtu.be/r6sjRxBZJuU) an.

Geben Sie Ihre MetaMask-Kontoadresse ein und klicken Sie auf **Anfrage senden**. Sie sehen eine Antwort, die wie der folgende Codeausschnitt aussieht.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _HINWEIS: Dieses Ergebnis ist in wei, nicht in ETH, angegeben._ Wei ist die kleinste Einheit von Ether._

Puh! Unser Falschgeld ist da.

### Schritt 6: Initialisieren unseres Projekts {#step-6-initialize-our-project}

Zunächst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zu Ihrer Kommandozeile und geben Sie Folgendes ein.

```
mkdir hello-world
cd hello-world
```

Da wir uns nun in unserem Projektordner befinden, verwenden wir `npm init`, um das Projekt zu initialisieren.

> Wenn Sie npm noch nicht installiert haben, befolgen Sie [diese Anweisungen zur Installation von Node.js und npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Für den Zweck dieses Tutorials spielt es keine Rolle, wie Sie die Initialisierungsfragen beantworten. Hier ist, wie wir es als Referenz gemacht haben:

```
package name: (hello-world)
version: (1.0.0)
description: hallo Welt Smart Contract
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
   "description": "hallo Welt Smart Contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Fehler: kein Test angegeben\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Bestätigen Sie die package.json und schon kann es losgehen!

### Schritt 7: Hardhat herunterladen {#step-7-download-hardhat}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern Smart Contracts und dApps lokal zu erstellen, bevor diese auf der Live-Chain bereitgestellt werden.

Führen Sie in unserem `hello-world`-Projekt Folgendes aus:

```
npm install --save-dev hardhat
```

Weitere Details zu den [Installationsanweisungen](https://hardhat.org/getting-started/#overview) finden Sie auf dieser Seite.

### Schritt 8: Hardhat-Projekt erstellen {#step-8-create-hardhat-project}

Führen Sie im Projektordner `hello-world` Folgendes aus:

```
npx hardhat
```

Sie sollten dann eine Willkommensnachricht sehen und die Möglichkeit haben, auszuwählen, wie Sie fortfahren möchten. Wählen Sie "create an empty hardhat.config.js" (Leere hardhat.config.js erstellen) aus:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Dadurch wird eine `hardhat.config.js`-Datei im Projekt generiert. Wir werden dies später im Tutorial verwenden, um das Setup für unser Projekt festzulegen.

### Schritt 9: Projektordner hinzufügen {#step-9-add-project-folders}

Um das Projekt zu organisieren, erstellen wir zwei neue Ordner. Navigieren Sie in der Kommandozeile zum Stammverzeichnis Ihres `hello-world`-Projekts und geben Sie ein:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ist der Ort, an dem wir unsere `Hello-World-Smart-Contract`-Codedatei aufbewahren.
- `scripts/` ist der Ort, an dem wir Skripte zur Bereitstellung und Interaktion mit unserem Vertrag aufbewahren.

### Schritt 10: Schreiben unseres Vertrags {#step-10-write-our-contract}

Sie fragen sich vielleicht, wann wir anfangen, Code zu schreiben? Es ist soweit!

Öffnen Sie das hello-world-Projekt in Ihrem bevorzugten Editor. Smart Contracts werden meistens in Solidity geschrieben, was wir verwenden werden, um unseren Smart Contract zu schreiben.‌

1. Navigieren Sie zum `contracts`-Ordner und erstellen Sie eine neue Datei namens `HelloWorld.sol`
2. Unten ist ein Beispiel für einen Hallo-Welt-Smart-Contract, den wir für dieses Tutorial verwenden werden. Kopieren Sie den folgenden Inhalt in die `HelloWorld.sol`-Datei.

_Hinweis: Lesen Sie unbedingt die Kommentare, um zu verstehen, was dieser Vertrag bewirkt._

```
// Gibt die Version von Solidity an, unter Verwendung von semantischer Versionierung.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Definiert einen Vertrag namens `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand). Nach der Bereitstellung befindet sich ein Vertrag an einer bestimmten Adresse auf der Ethereum-Blockchain. Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Wird ausgegeben, wenn die update-Funktion aufgerufen wird
   //Smart-Contract-Ereignisse sind eine Möglichkeit für Ihren Vertrag, Ihrer App-Frontend mitzuteilen, dass auf der Blockchain etwas passiert ist. Das Frontend kann auf bestimmte Ereignisse „hören“ und bei deren Eintreten Maßnahmen ergreifen.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklariert eine Zustandsvariable `message` vom Typ `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden. Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
   string public message;

   // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor eine spezielle Funktion, die nur bei der Erstellung des Vertrags ausgeführt wird.
   // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren. Mehr erfahren:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akzeptiert ein String-Argument `initMessage` und setzt den Wert in die Speichervariable `message` des Vertrags).
      message = initMessage;
   }

   // Eine öffentliche Funktion, die ein String-Argument akzeptiert und die Speichervariable `message` aktualisiert.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Dies ist ein einfacher Smart Contract, der bei der Erstellung eine Nachricht speichert. Er kann durch Aufrufen der `update`-Funktion aktualisiert werden.

### Schritt 11: Verbinden Sie MetaMask und Alchemy mit Ihrem Projekt {#step-11-connect-metamask-alchemy-to-your-project}

Wir haben eine MetaMask-Wallet und ein Alchemy-Konto erstellt und unseren Smart Contract geschrieben. Jetzt ist es an der Zeit, die drei zu verbinden.

Jede von Ihrer Wallet gesendete Transaktion erfordert eine Signatur mit Ihrem eindeutigen privaten Schlüssel. Um unserem Programm diese Berechtigung zu erteilen, können wir unseren privaten Schlüssel sicher in einer Umgebungsdatei speichern. Wir werden hier auch einen API-Schlüssel für Alchemy speichern.

> Um mehr über das Senden von Transaktionen zu erfahren, lesen Sie [dieses Tutorial](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) über das Senden von Transaktionen mit web3.

Installieren Sie zuerst das dotenv-Paket in Ihrem Projektverzeichnis:

```
npm install dotenv --save
```

Erstellen Sie dann eine `.env`-Datei im Stammverzeichnis des Projekts. Fügen Sie Ihren privaten MetaMask-Schlüssel und die HTTP-Alchemy-API-URL hinzu.

Ihre Umgebungsdatei muss den Namen `.env` haben, sonst wird sie nicht als Umgebungsdatei erkannt.

Nennen Sie sie nicht `process.env` oder `.env-custom` oder irgendetwas anderes.

- Befolgen Sie [diese Anweisungen](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um Ihren privaten Schlüssel zu exportieren
- Siehe unten, um die HTTP Alchemy API-URL zu erhalten

![](./get-alchemy-api-key.gif)

Ihre `.env`-Datei sollte wie folgt aussehen:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, verweisen wir in Schritt 13 in unserer `hardhat.config.js`-Datei auf diese Variablen.

### Schritt 12: Ethers.js installieren {#step-12-install-ethersjs}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen, indem sie [standardmäßige JSON-RPC-Methoden](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) mit benutzerfreundlicheren Methoden umschließt.

Hardhat ermöglicht es uns, [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) für die Vertragsbereitstellung nutzen.

Geben Sie Folgendes in Ihrem Projektverzeichnis ein:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Schritt 13: Aktualisieren der hardhat.config.js {#step-13-update-hardhat-configjs}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt. Jetzt müssen wir `hardhat.config.js` aktualisieren, damit unser Projekt alle kennt.

Aktualisieren Sie Ihre `hardhat.config.js`, sodass sie wie folgt aussieht:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Schritt 14: Kompilieren unseres Vertrags {#step-14-compile-our-contract}

Um sicherzugehen, dass so weit alles funktioniert, sollten wir unseren Vertrag erstellen. Der `compile`-Task ist einer der integrierten Hardhat-Tasks.

Führen Sie folgenden Befehl in der Befehlszeile aus:

```bash
npx hardhat compile
```

Möglicherweise erhalten Sie eine Warnung über `SPDX license identifier not provided in source file`, aber machen Sie sich darüber keine Sorgen – hoffentlich sieht alles andere gut aus! Wenn nicht, können Sie jederzeit eine Nachricht im [Alchemy-Discord](https://discord.gg/u72VCg3) schreiben.

### Schritt 15: Schreiben unseres Bereitstellungsskripts {#step-15-write-our-deploy-script}

Nun, da unser Vertrag geschrieben und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, das Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`, und fügen Sie ihr den folgenden Inhalt hinzu:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Startet die Bereitstellung und gibt ein Promise zurück, das zu einem Vertragsobjekt aufgelöst wird
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Vertrag bereitgestellt unter Adresse:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat erklärt in seinem [Contracts-Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) hervorragend, was jede dieser Codezeilen bewirkt; wir haben die Erklärungen hier übernommen.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Eine `ContractFactory` in ethers.js ist eine Abstraktion, die verwendet wird, um neue Smart Contracts bereitzustellen. `HelloWorld` ist hier also eine [Factory](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) für Instanzen unseres Hallo-Welt-Vertrags. Bei der Verwendung des `hardhat-ethers`-Plugins werden `ContractFactory`- und `Contract`-Instanzen standardmäßig mit dem ersten Unterzeichner (Besitzer) verbunden.

```javascript
const hello_world = await HelloWorld.deploy()
```

Der Aufruf von `deploy()` auf einer `ContractFactory` startet die Bereitstellung und gibt ein `Promise` zurück, das zu einem `Contract`-Objekt aufgelöst wird. Das ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen enthält.

### Schritt 16: Unseren Vertrag bereitstellen {#step-16-deploy-our-contract}

Nun sind wir endlich bereit, unseren Smart Contract bereitzustellen. Navigieren Sie zur Befehlszeile und führen Sie Folgendes aus:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Sie sollten dann etwas sehen wie:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Bitte speichern Sie diese Adresse**. Wir werden sie später im Tutorial verwenden.

Wenn wir zum [Goerli-Etherscan](https://goerli.etherscan.io) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Die Transaktion wird ungefähr so aussehen:

![](./etherscan-contract.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und die `To`-Adresse lautet **Vertragserstellung**. Wenn wir auf die Transaktion klicken, sehen wir unsere Vertragsadresse im `To`-Feld.

![](./etherscan-transaction.png)

Glückwunsch! Sie haben gerade einen Smart Contract in einem Ethereum-Testnet bereitgestellt.

Um zu verstehen, was „unter der Haube“ vor sich geht, navigieren wir zum Explorer-Tab in unserem [Alchemy-Dashboard](https://dashboard.alchemy.com/explorer). Wenn Sie mehrere Alchemy-Apps haben, stellen Sie sicher, dass Sie nach App filtern und **Hello World** auswählen.

![](./hello-world-explorer.png)

Hier sehen Sie eine Handvoll JSON-RPC-Methoden, die Hardhat/Ethers für uns „unter der Haube“ ausgeführt hat, als wir die `.deploy()`-Funktion aufgerufen haben. Zwei wichtige Methoden sind hier [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), das ist die Anforderung, unseren Vertrag in die Goerli-Chain zu schreiben, und [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), eine Anforderung zum Lesen von Informationen über unsere Transaktion anhand des Hashes. Um mehr über das Senden von Transaktionen zu erfahren, lesen Sie unser [Tutorial zum Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Teil 2: Interaktion mit Ihrem Smart Contract {#part-2-interact-with-your-smart-contract}

Nachdem wir nun erfolgreich einen Smart Contract im Goerli-Netzwerk bereitgestellt haben, lernen wir, wie man mit ihm interagiert.

### Eine interact.js-Datei erstellen {#create-a-interactjs-file}

Dies ist die Datei, in die wir unser Interaktionsskript schreiben werden. Wir werden die Ethers.js-Bibliothek verwenden, die Sie zuvor in Teil 1 installiert haben.

Erstellen Sie im Ordner `scripts/` eine neue Datei namens `interact.js` und fügen Sie den folgenden Code hinzu:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aktualisieren Sie Ihre .env-Datei {#update-your-env-file}

Wir werden neue Umgebungsvariablen verwenden, also müssen wir sie in der `.env`-Datei definieren, die [wir zuvor erstellt haben](#step-11-connect-metamask-&-alchemy-to-your-project).

Wir müssen eine Definition für unseren Alchemy `API_KEY` und die `CONTRACT_ADDRESS` hinzufügen, unter der Ihr Smart Contract bereitgestellt wurde.

Ihre `.env`-Datei sollte ungefähr so aussehen:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Ihre Vertrags-ABI abrufen {#grab-your-contract-ABI}

Unsere Vertrags-[ABI (Application Binary Interface)](/glossary/#abi) ist die Schnittstelle, über die die Interaktion mit unserem Smart Contract erfolgt. Hardhat generiert automatisch eine ABI und speichert sie in `HelloWorld.json`. Um die ABI zu verwenden, müssen wir den Inhalt auslesen, indem wir die folgenden Codezeilen zu unserer `interact.js`-Datei hinzufügen:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Wenn Sie die ABI sehen möchten, können Sie sie auf Ihrer Konsole ausgeben:

```javascript
console.log(JSON.stringify(contract.abi))
```

Um Ihre ABI in der Konsole ausgedruckt zu sehen, navigieren Sie zu Ihrem Terminal und führen Sie aus:

```bash
npx hardhat run scripts/interact.js
```

### Eine Instanz Ihres Vertrags erstellen {#create-an-instance-of-your-contract}

Um mit unserem Vertrag zu interagieren, müssen wir eine Vertragsinstanz in unserem Code erstellen. Um dies mit Ethers.js zu tun, müssen wir mit drei Konzepten arbeiten:

1. Provider – ein Node-Provider, der Ihnen Lese- und Schreibzugriff auf die Blockchain gibt
2. Signer – repräsentiert ein Ethereum-Konto, das Transaktionen signieren kann
3. Contract – ein Ethers.js-Objekt, das einen bestimmten onchain bereitgestellten Vertrag darstellt

Wir verwenden die Vertrags-ABI aus dem vorherigen Schritt, um unsere Instanz des Vertrags zu erstellen:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Erfahren Sie mehr über Provider, Signer und Contracts in der [ethers.js-Dokumentation](https://docs.ethers.io/v5/).

### Lesen Sie die init-Nachricht {#read-the-init-message}

Erinnern Sie sich, als wir unseren Vertrag mit `initMessage = "Hello world!"` bereitgestellt haben? Wir werden nun diese Nachricht, die in unserem Smart Contract gespeichert ist, lesen und in der Konsole ausgeben.

In JavaScript werden asynchrone Funktionen verwendet, wenn mit Netzwerken interagiert wird. Um mehr über asynchrone Funktionen zu erfahren, [lesen Sie diesen Medium-Artikel](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Verwenden Sie den folgenden Code, um die `message`-Funktion in unserem Smart Contract aufzurufen und die init-Nachricht zu lesen:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Nachdem wir die Datei mit `npx hardhat run scripts/interact.js` im Terminal ausgeführt haben, sollten wir diese Antwort sehen:

```
Die Nachricht ist: Hallo Welt!
```

Glückwunsch! Sie haben gerade erfolgreich Smart-Contract-Daten von der Ethereum-Blockchain gelesen, gut gemacht!

### Die Nachricht aktualisieren {#update-the-message}

Anstatt nur die Nachricht zu lesen, können wir auch die in unserem Smart Contract gespeicherte Nachricht mithilfe der `update`-Funktion aktualisieren! Ziemlich cool, oder?

Um die Nachricht zu aktualisieren, können wir die `update`-Funktion direkt auf unserem instanziierten Vertrags-Objekt aufrufen:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Die Nachricht ist: " + message)

  console.log("Aktualisiere die Nachricht...")
  const tx = await helloWorldContract.update("Dies ist die neue Nachricht.")
  await tx.wait()
}
main()
```

Beachten Sie, dass wir in Zeile 11 einen Aufruf von `.wait()` auf dem zurückgegebenen Transaktionsobjekt machen. Dies stellt sicher, dass unser Skript wartet, bis die Transaktion auf der Blockchain gemined ist, bevor die Funktion beendet wird. Wenn der `.wait()`-Aufruf nicht enthalten ist, sieht das Skript möglicherweise nicht den aktualisierten `message`-Wert im Vertrag.

### Die neue Nachricht lesen {#read-the-new-message}

Sie sollten in der Lage sein, den [vorherigen Schritt](#read-the-init-message) zu wiederholen, um den aktualisierten `message`-Wert zu lesen. Nehmen Sie sich einen Moment Zeit und sehen Sie, ob Sie die notwendigen Änderungen vornehmen können, um diesen neuen Wert auszugeben!

Wenn Sie einen Hinweis benötigen, hier ist, wie Ihre `interact.js`-Datei an dieser Stelle aussehen sollte:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - Sie
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Vertragsinstanz
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Die Nachricht ist: " + message)

  console.log("Aktualisiere die Nachricht...")
  const tx = await helloWorldContract.update("Dies ist die neue Nachricht")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Die neue Nachricht ist: " + newMessage)
}

main()
```

Führen Sie nun einfach das Skript aus und Sie sollten die alte Nachricht, den Aktualisierungsstatus und die neue Nachricht in Ihrem Terminal ausgegeben sehen!

`npx hardhat run scripts/interact.js --network goerli`

```
Die Nachricht ist: Hallo Welt!
Aktualisiere die Nachricht...
Die neue Nachricht ist: Dies ist die neue Nachricht.
```

Während der Ausführung dieses Skripts werden Sie vielleicht feststellen, dass der Schritt `Aktualisiere die Nachricht...` eine Weile zum Laden braucht, bevor die neue Nachricht geladen wird. Dies liegt am Mining-Prozess; wenn Sie neugierig sind, Transaktionen während des Minings zu verfolgen, besuchen Sie den [Alchemy-Mempool](https://dashboard.alchemyapi.io/mempool), um den Status einer Transaktion zu sehen. Wenn die Transaktion verworfen wird, ist es auch hilfreich, [Goerli Etherscan](https://goerli.etherscan.io) zu überprüfen und nach Ihrem Transaktions-Hash zu suchen.

## Teil 3: Veröffentlichen Sie Ihren Smart Contract auf Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Sie haben die ganze harte Arbeit geleistet, um Ihren Smart Contract zum Leben zu erwecken; jetzt ist es an der Zeit, ihn mit der Welt zu teilen!

Durch die Verifizierung Ihres Smart Contracts auf Etherscan kann jeder Ihren Quellcode einsehen und mit Ihrem Smart Contract interagieren. Legen wir los!

### Schritt 1: Generieren Sie einen API-Schlüssel in Ihrem Etherscan-Konto {#step-1-generate-an-api-key-on-your-etherscan-account}

Ein Etherscan-API-Schlüssel ist notwendig, um zu verifizieren, dass Sie der Eigentümer des Smart Contracts sind, den Sie veröffentlichen möchten.

Wenn Sie noch kein Etherscan-Konto haben, [registrieren Sie sich für ein Konto](https://etherscan.io/register).

Nach dem Einloggen finden Sie Ihren Benutzernamen in der Navigationsleiste, fahren Sie mit der Maus darüber und wählen Sie die Schaltfläche **Mein Profil**.

Auf Ihrer Profilseite sollten Sie eine seitliche Navigationsleiste sehen. Wählen Sie in der seitlichen Navigationsleiste **API-Schlüssel**. Drücken Sie als Nächstes die Schaltfläche „Hinzufügen“, um einen neuen API-Schlüssel zu erstellen, benennen Sie Ihre App **hello-world** und drücken Sie die Schaltfläche **Neuen API-Schlüssel erstellen**.

Ihr neuer API-Schlüssel sollte in der API-Schlüssel-Tabelle erscheinen. Kopieren Sie den API-Schlüssel in Ihre Zwischenablage.

Als Nächstes müssen wir den Etherscan-API-Schlüssel zu unserer `.env`-Datei hinzufügen.

Nachdem Sie ihn hinzugefügt haben, sollte Ihre `.env`-Datei so aussehen:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat-bereitgestellte Smart Contracts {#hardhat-deployed-smart-contracts}

#### Installieren Sie hardhat-etherscan {#install-hardhat-etherscan}

Das Veröffentlichen Ihres Vertrags auf Etherscan mit Hardhat ist unkompliziert. Sie müssen zuerst das `hardhat-etherscan`-Plugin installieren, um zu beginnen. `hardhat-etherscan` wird automatisch den Quellcode und die ABI des Smart Contracts auf Etherscan verifizieren. Um dies hinzuzufügen, führen Sie im `hello-world`-Verzeichnis Folgendes aus:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Nach der Installation fügen Sie die folgende Anweisung am Anfang Ihrer `hardhat.config.js` ein und fügen Sie die Etherscan-Konfigurationsoptionen hinzu:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Ihr API-Schlüssel für Etherscan
    // Erhalten Sie einen unter https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifizieren Sie Ihren Smart Contract auf Etherscan {#verify-your-smart-contract-on-etherscan}

Stellen Sie sicher, dass alle Dateien gespeichert und alle `.env`-Variablen korrekt konfiguriert sind.

Führen Sie die `verify`-Aufgabe aus, indem Sie die Vertragsadresse und das Netzwerk übergeben, in dem sie bereitgestellt ist:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Stellen Sie sicher, dass `DEPLOYED_CONTRACT_ADDRESS` die Adresse Ihres bereitgestellten Smart Contracts im Goerli-Testnet ist. Außerdem muss das letzte Argument (`'Hello World!'`) derselbe String-Wert sein, der [während des Bereitstellungsschritts in Teil 1](#write-our-deploy-script) verwendet wurde.

Wenn alles gut geht, sehen Sie die folgende Nachricht in Ihrem Terminal:

```text
Quellcode für Vertrag erfolgreich übermittelt
contracts/HelloWorld.sol:HelloWorld unter 0xdeployed-contract-address
zur Verifizierung auf Etherscan. Warte auf Verifizierungsergebnis...


Vertrag HelloWorld auf Etherscan erfolgreich verifiziert.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Glückwunsch! Ihr Smart-Contract-Code ist auf Etherscan!

### Schauen Sie sich Ihren Smart Contract auf Etherscan an! {#check-out-your-smart-contract-on-etherscan}

Wenn Sie dem in Ihrem Terminal bereitgestellten Link folgen, sollten Sie in der Lage sein, Ihren Smart-Contract-Code und Ihre ABI auf Etherscan veröffentlicht zu sehen!

**Wuhuu – du hast es geschafft, Champion! Jetzt kann jeder Ihren Smart Contract aufrufen oder in ihn schreiben! Wir können es kaum erwarten zu sehen, was Sie als Nächstes bauen!**

## Teil 4 – Integrieren Ihres Smart Contracts in das Frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Am Ende dieses Tutorials werden Sie wissen, wie Sie:

- Eine MetaMask-Wallet mit Ihrer Dapp verbinden
- Daten aus Ihrem Smart Contract mit der [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API lesen
- Ethereum-Transaktionen mit MetaMask signieren

Für diese Dapp werden wir [React](https://react.dev/) als unser Frontend-Framework verwenden; es ist jedoch wichtig zu beachten, dass wir nicht viel Zeit damit verbringen werden, dessen Grundlagen zu erläutern, da wir uns hauptsächlich darauf konzentrieren werden, Web3-Funktionalität in unser Projekt zu bringen.

Als Voraussetzung sollten Sie ein grundlegendes Verständnis von React haben. Wenn nicht, empfehlen wir, das offizielle [Intro zu React-Tutorial](https://react.dev/learn) abzuschließen.

### Die Starter-Dateien klonen {#clone-the-starter-files}

Gehen Sie zunächst zum [hello-world-part-four GitHub-Repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial), um die Starter-Dateien für dieses Projekt zu erhalten, und klonen Sie dieses Repository auf Ihren lokalen Rechner.

Öffnen Sie das geklonte Repository lokal. Beachten Sie, dass es zwei Ordner enthält: `starter-files` und `completed`.

- `starter-files` – **wir werden in diesem Verzeichnis arbeiten**, wir werden die Benutzeroberfläche mit Ihrer Ethereum-Wallet und dem Smart Contract verbinden, den wir in [Teil 3](#part-3) auf Etherscan veröffentlicht haben.
- `completed` enthält das gesamte abgeschlossene Tutorial und sollte nur als Referenz verwendet werden, wenn Sie nicht weiterkommen.

Öffnen Sie als Nächstes Ihre Kopie von `starter-files` in Ihrem bevorzugten Code-Editor und navigieren Sie dann in den `src`-Ordner.

Der gesamte Code, den wir schreiben werden, befindet sich im Ordner `src`. Wir werden die `HelloWorld.js`-Komponente und die `util/interact.js`-JavaScript-Dateien bearbeiten, um unserem Projekt Web3-Funktionalität zu verleihen.

### Sehen Sie sich die Starter-Dateien an {#check-out-the-starter-files}

Bevor wir mit dem Codieren beginnen, lassen Sie uns untersuchen, was uns in den Starter-Dateien zur Verfügung gestellt wird.

#### Dein React-Projekt zum Laufen bringen {#get-your-react-project-running}

Beginnen wir damit, das React-Projekt in unserem Browser auszuführen. Das Schöne an React ist, dass alle Änderungen, die wir speichern, live in unserem Browser aktualisiert werden, sobald unser Projekt im Browser läuft.

Um das Projekt zum Laufen zu bringen, navigieren Sie zum Stammverzeichnis des `starter-files`-Ordners und führen Sie `npm install` in Ihrem Terminal aus, um die Abhängigkeiten des Projekts zu installieren:

```bash
cd starter-files
npm install
```

Sobald die Installation abgeschlossen ist, führe `npm start` in deinem Terminal aus:

```bash
npm start
```

Dadurch sollte [http://localhost:3000/](http://localhost:3000/) in Ihrem Browser geöffnet werden, wo Sie das Frontend für unser Projekt sehen. Es sollte aus einem Feld (einem Ort zum Aktualisieren der in Ihrem Smart Contract gespeicherten Nachricht), einer Schaltfläche „Wallet verbinden“ und einer Schaltfläche „Aktualisieren“ bestehen.

Wenn Sie versuchen, auf eine der beiden Schaltflächen zu klicken, werden Sie feststellen, dass sie nicht funktionieren – das liegt daran, dass wir ihre Funktionalität noch programmieren müssen.

#### Die `HelloWorld.js`-Komponente {#the-helloworld-js-component}

Kehren wir zum `src`-Ordner in unserem Editor zurück und öffnen Sie die `HelloWorld.js`-Datei. Es ist sehr wichtig, dass wir alles in dieser Datei verstehen, da es sich um die primäre React-Komponente handelt, an der wir arbeiten werden.

Oben in dieser Datei werden Sie feststellen, dass wir mehrere Import-Anweisungen haben, die notwendig sind, um unser Projekt zum Laufen zu bringen, einschließlich der React-Bibliothek, useEffect- und useState-Hooks, einige Elemente aus `./util/interact.js` (wir werden sie bald genauer beschreiben!) und das Alchemy-Logo.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Als Nächstes haben wir unsere Zustandsvariablen, die wir nach bestimmten Ereignissen aktualisieren werden.

```javascript
// HelloWorld.js

//Zustandsvariablen
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Keine Verbindung zum Netzwerk.")
const [newMessage, setNewMessage] = useState("")
```

Hier ist, was jede der Variablen darstellt:

- `walletAddress` - eine Zeichenfolge, die die Wallet-Adresse des Benutzers speichert
- `status` – ein String, der eine hilfreiche Nachricht speichert, die den Benutzer bei der Interaktion mit der Dapp anleitet
- `message` – ein String, der die aktuelle Nachricht im Smart Contract speichert
- `newMessage` – ein String, der die neue Nachricht speichert, die in den Smart Contract geschrieben wird

Nach den Zustandsvariablen sehen Sie fünf nicht implementierte Funktionen: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed` und `onUpdatePressed`. Wir erklären unten, was sie tun:

```javascript
// HelloWorld.js

//wird nur einmal aufgerufen
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) – dies ist ein React-Hook, der aufgerufen wird, nachdem Ihre Komponente gerendert wurde. Da ihm ein leeres Array `[]` als Eigenschaft übergeben wird (siehe Zeile 4), wird er nur beim _ersten_ Rendern der Komponente aufgerufen. Hier laden wir die aktuelle Nachricht, die in unserem Smart Contract gespeichert ist, rufen unsere Smart-Contract- und Wallet-Listener auf und aktualisieren unsere Benutzeroberfläche, um anzuzeigen, ob eine Wallet bereits verbunden ist.
- `addSmartContractListener` – diese Funktion richtet einen Listener ein, der auf das `UpdatedMessages`-Ereignis unseres HelloWorld-Vertrags achtet und unsere Benutzeroberfläche aktualisiert, wenn die Nachricht in unserem Smart Contract geändert wird.
- `addWalletListener` – diese Funktion richtet einen Listener ein, der Änderungen im Zustand der MetaMask-Wallet des Benutzers erkennt, z. B. wenn der Benutzer seine Wallet trennt oder Adressen wechselt.
- `connectWalletPressed` – diese Funktion wird aufgerufen, um die MetaMask-Wallet des Benutzers mit unserer Dapp zu verbinden.
- `onUpdatePressed` – diese Funktion wird aufgerufen, wenn der Benutzer die im Smart Contract gespeicherte Nachricht aktualisieren möchte.

Gegen Ende dieser Datei haben wir die Benutzeroberfläche unserer Komponente.

```javascript
// HelloWorld.js

//die Benutzeroberfläche unserer Komponente
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Verbunden: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Wallet verbinden</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Aktuelle Nachricht:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Neue Nachricht:</h2>

    <div>
      <input
        type="text"
        placeholder="Aktualisieren Sie die Nachricht in Ihrem Smart Contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Aktualisieren
      </button>
</div>
 
</div>
)
```

Wenn Sie diesen Code sorgfältig scannen, werden Sie feststellen, wo wir unsere verschiedenen Zustandsvariablen in unserer Benutzeroberfläche verwenden:

- In den Zeilen 6-12, wenn die Wallet des Benutzers verbunden ist (d. h. `walletAddress.length > 0`), zeigen wir eine gekürzte Version der Benutzer-`walletAddress` in der Schaltfläche mit der ID „walletButton“ an; andernfalls steht dort einfach „Wallet verbinden“.
- In Zeile 17 zeigen wir die aktuelle Nachricht an, die im Smart Contract gespeichert ist und im `message`-String erfasst wird.
- In den Zeilen 23–26 verwenden wir eine [kontrollierte Komponente](https://legacy.reactjs.org/docs/forms.html#controlled-components), um unsere `newMessage`-Zustandsvariable zu aktualisieren, wenn sich die Eingabe im Textfeld ändert.

Zusätzlich zu unseren Zustandsvariablen sehen Sie auch, dass die Funktionen `connectWalletPressed` und `onUpdatePressed` aufgerufen werden, wenn die Schaltflächen mit den IDs `publishButton` bzw. `walletButton` geklickt werden.

Lassen Sie uns schließlich klären, wo diese `HelloWorld.js`-Komponente hinzugefügt wird.

Wenn Sie zur `App.js`-Datei gehen, die die Hauptkomponente in React ist und als Container für alle anderen Komponenten dient, werden Sie sehen, dass unsere `HelloWorld.js`-Komponente in Zeile 7 eingefügt wird.

Zu guter Letzt wollen wir uns noch eine weitere für Sie bereitgestellte Datei ansehen, die `interact.js`-Datei.

#### Die `interact.js`-Datei {#the-interact-js-file}

Da wir uns an das [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-Paradigma halten wollen, benötigen wir eine separate Datei, die alle unsere Funktionen zur Verwaltung der Logik, Daten und Regeln unserer Dapp enthält, und diese Funktionen dann in unser Frontend (unsere `HelloWorld.js`-Komponente) exportieren können.

👆🏽Dies ist genau der Zweck unserer `interact.js`-Datei!

Navigieren Sie zum `util`-Ordner in Ihrem `src`-Verzeichnis, und Sie werden feststellen, dass wir eine Datei namens `interact.js` beigefügt haben, die alle unsere Smart-Contract-Interaktions- und Wallet-Funktionen und -Variablen enthalten wird.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Sie werden am Anfang der Datei feststellen, dass wir das `helloWorldContract`-Objekt auskommentiert haben. Später in diesem Tutorial werden wir dieses Objekt entkommentieren und unseren Smart Contract in dieser Variable instanziieren, die wir dann in unsere `HelloWorld.js`-Komponente exportieren werden.

Die vier nicht implementierten Funktionen nach unserem `helloWorldContract`-Objekt tun Folgendes:

- `loadCurrentMessage` – diese Funktion behandelt die Logik zum Laden der aktuellen Nachricht, die im Smart Contract gespeichert ist. Es wird ein _Lese_-Aufruf an den Hallo-Welt-Smart-Contract über die [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) gemacht.
- `connectWallet` – diese Funktion verbindet die MetaMask des Benutzers mit unserer Dapp.
- `getCurrentWalletConnected` – diese Funktion prüft, ob beim Laden der Seite bereits ein Ethereum-Konto mit unserer Dapp verbunden ist, und aktualisiert unsere Benutzeroberfläche entsprechend.
- `updateMessage` – diese Funktion aktualisiert die im Smart Contract gespeicherte Nachricht. Es wird ein _Schreib_-Aufruf an den Hallo-Welt-Smart-Contract gemacht, sodass die MetaMask-Wallet des Benutzers eine Ethereum-Transaktion signieren muss, um die Nachricht zu aktualisieren.

Jetzt, da wir verstehen, womit wir arbeiten, lassen Sie uns herausfinden, wie wir aus unserem Smart Contract lesen können!

### Schritt 3: Lesen aus Ihrem Smart Contract {#step-3-read-from-your-smart-contract}

Um aus Ihrem Smart Contract zu lesen, müssen Sie erfolgreich Folgendes einrichten:

- Eine API-Verbindung zur Ethereum-Chain
- Eine geladene Instanz Ihres Smart Contracts
- Eine Funktion zum Aufrufen Ihrer Smart-Contract-Funktion
- Ein Listener, der auf Aktualisierungen achtet, wenn sich die Daten, die Sie aus dem Smart Contract lesen, ändern

Das mag nach vielen Schritten klingen, aber keine Sorge! Wir führen Sie Schritt für Schritt durch jeden einzelnen davon! :\)

#### Eine API-Verbindung zur Ethereum-Chain herstellen {#establish-an-api-connection-to-the-ethereum-chain}

Erinnern Sie sich, wie wir in Teil 2 dieses Tutorials unseren [Alchemy Web3-Schlüssel verwendet haben, um aus unserem Smart Contract zu lesen](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Sie benötigen auch einen Alchemy Web3-Schlüssel in Ihrer Dapp, um von der Chain zu lesen.

Wenn Sie es noch nicht haben, installieren Sie zuerst [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), indem Sie zum Stammverzeichnis Ihrer `starter-files` navigieren und Folgendes in Ihrem Terminal ausführen:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ist ein Wrapper um [Web3.js](https://docs.web3js.org/) und bietet erweiterte API-Methoden und andere entscheidende Vorteile, um dir das Leben als Web3-Entwickler zu erleichtern. Es ist so konzipiert, dass es eine minimale Konfiguration erfordert, sodass du es sofort in deiner App verwenden kannst!

Installieren Sie dann das [dotenv](https://www.npmjs.com/package/dotenv)-Paket in Ihrem Projektverzeichnis, damit wir einen sicheren Ort haben, um unseren API-Schlüssel nach dem Abrufen zu speichern.

```text
npm install dotenv --save
```

Für unsere Dapp **werden wir unseren Websockets-API-Schlüssel** anstelle unseres HTTP-API-Schlüssels verwenden, da wir damit einen Listener einrichten können, der erkennt, wann sich die im Smart Contract gespeicherte Nachricht ändert.

Sobald Sie Ihren API-Schlüssel haben, erstellen Sie eine `.env`-Datei in Ihrem Stammverzeichnis und fügen Sie Ihre Alchemy-Websockets-URL hinzu. Danach sollte Ihre `.env`-Datei so aussehen:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Jetzt sind wir bereit, unseren Alchemy Web3-Endpunkt in unserer Dapp einzurichten! Kehren wir zu unserer `interact.js` zurück, die in unserem `util`-Ordner verschachtelt ist, und fügen Sie den folgenden Code am Anfang der Datei hinzu:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Oben haben wir zuerst den Alchemy-Schlüssel aus unserer `.env`-Datei importiert und dann unseren `alchemyKey` an `createAlchemyWeb3` übergeben, um unseren Alchemy Web3-Endpunkt einzurichten.

Mit diesem Endpunkt sind wir bereit, unseren Smart Contract zu laden!

#### Ihren Hello World Smart Contract laden {#loading-your-hello-world-smart-contract}

Um Ihren Hallo-Welt-Smart-Contract zu laden, benötigen Sie seine Vertragsadresse und ABI, die beide auf Etherscan zu finden sind, wenn Sie [Teil 3 dieses Tutorials abgeschlossen haben.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Wie Sie Ihre Vertrags-ABI von Etherscan erhalten {#how-to-get-your-contract-abi-from-etherscan}

Wenn Sie Teil 3 dieses Tutorials übersprungen haben, können Sie den HelloWorld-Vertrag mit der Adresse [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) verwenden. Seine ABI finden Sie [hier](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

Eine Vertrags-ABI ist notwendig, um festzulegen, welche Funktion ein Vertrag aufrufen wird, sowie um sicherzustellen, dass die Funktion Daten im erwarteten Format zurückgibt. Sobald wir unsere Vertrags-ABI kopiert haben, speichern wir sie als JSON-Datei namens `contract-abi.json` in Ihrem `src`-Verzeichnis.

Ihre contract-abi.json sollte in Ihrem src-Ordner gespeichert sein.

Bewaffnet mit unserer Vertragsadresse, ABI und dem Alchemy Web3-Endpunkt, können wir die [contract-Methode](https://docs.web3js.org/api/web3-eth-contract/class/Contract) verwenden, um eine Instanz unseres Smart Contracts zu laden. Importieren Sie Ihre Vertrags-ABI in die `interact.js`-Datei und fügen Sie Ihre Vertragsadresse hinzu.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Wir können nun endlich unsere `helloWorldContract`-Variable entkommentieren und den Smart Contract mit unserem AlchemyWeb3-Endpunkt laden:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Zusammenfassend sollten die ersten 12 Zeilen Ihrer `interact.js` jetzt so aussehen:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Jetzt, da wir unseren Vertrag geladen haben, können wir unsere `loadCurrentMessage`-Funktion implementieren!

#### Implementierung von `loadCurrentMessage` in Ihrer `interact.js`-Datei {#implementing-loadCurrentMessage-in-your-interact-js-file}

Diese Funktion ist super einfach. Wir werden einen einfachen asynchronen web3-Aufruf machen, um aus unserem Vertrag zu lesen. Unsere Funktion wird die im Smart Contract gespeicherte Nachricht zurückgeben:

Aktualisieren Sie die `loadCurrentMessage` in Ihrer `interact.js`-Datei auf Folgendes:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Da wir diesen Smart Contract in unserer Benutzeroberfläche anzeigen möchten, aktualisieren wir die `useEffect`-Funktion in unserer `HelloWorld.js`-Komponente auf Folgendes:

```javascript
// HelloWorld.js

//wird nur einmal aufgerufen
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Beachten Sie, dass wir `loadCurrentMessage` nur einmal während des ersten Renderns der Komponente aufrufen wollen. Wir werden bald `addSmartContractListener` implementieren, um die Benutzeroberfläche automatisch zu aktualisieren, nachdem sich die Nachricht im Smart Contract geändert hat.

Bevor wir uns mit unserem Listener befassen, schauen wir uns an, was wir bisher haben! Speichern Sie Ihre `HelloWorld.js`- und `interact.js`-Dateien und gehen Sie dann zu [http://localhost:3000/](http://localhost:3000/)

Sie werden feststellen, dass die aktuelle Nachricht nicht mehr „Keine Verbindung zum Netzwerk“ lautet. Stattdessen spiegelt sie die im Smart Contract gespeicherte Nachricht wider. Klasse!

#### Ihre Benutzeroberfläche sollte jetzt die im Smart Contract gespeicherte Nachricht widerspiegeln {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Apropos Listener...

#### Implementieren Sie `addSmartContractListener` {#implement-addsmartcontractlistener}

Wenn Sie an die `HelloWorld.sol`-Datei zurückdenken, die wir in [Teil 1 dieser Tutorial-Reihe](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) geschrieben haben, werden Sie sich daran erinnern, dass es ein Smart-Contract-Ereignis namens `UpdatedMessages` gibt, das ausgegeben wird, nachdem die `update`-Funktion unseres Smart Contracts aufgerufen wurde (siehe Zeilen 9 und 27):

```javascript
// HelloWorld.sol

// Gibt die Version von Solidity an, unter Verwendung von semantischer Versionierung.
// Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definiert einen Vertrag namens `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand). Nach der Bereitstellung befindet sich ein Vertrag an einer bestimmten Adresse auf der Ethereum-Blockchain. Mehr erfahren: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Wird ausgegeben, wenn die update-Funktion aufgerufen wird
   //Smart-Contract-Ereignisse sind eine Möglichkeit für Ihren Vertrag, Ihrer App-Frontend mitzuteilen, dass auf der Blockchain etwas passiert ist. Das Frontend kann auf bestimmte Ereignisse „hören“ und bei deren Eintreten Maßnahmen ergreifen.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklariert eine Zustandsvariable `message` vom Typ `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden. Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
   string public message;

   // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor eine spezielle Funktion, die nur bei der Erstellung des Vertrags ausgeführt wird.
   // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren. Mehr erfahren:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akzeptiert ein String-Argument `initMessage` und setzt den Wert in die Speichervariable `message` des Vertrags).
      message = initMessage;
   }

   // Eine öffentliche Funktion, die ein String-Argument akzeptiert und die Speichervariable `message` aktualisiert.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Smart-Contract-Ereignisse sind eine Möglichkeit für Ihren Vertrag, Ihrer Frontend-Anwendung mitzuteilen, dass auf der Blockchain etwas passiert ist (d. h. es gab ein _Ereignis_), die auf bestimmte Ereignisse „hören“ und bei deren Eintreten Maßnahmen ergreifen kann.

Die `addSmartContractListener`-Funktion wird speziell auf das `UpdatedMessages`-Ereignis unseres Hallo-Welt-Smart-Contracts lauschen und unsere Benutzeroberfläche aktualisieren, um die neue Nachricht anzuzeigen.

Ändern Sie `addSmartContractListener` in Folgendes:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Ihre Nachricht wurde aktualisiert!")
    }
  })
}
```

Lassen Sie uns aufschlüsseln, was passiert, wenn der Listener ein Ereignis erkennt:

- Wenn ein Fehler auftritt, wenn das Ereignis ausgegeben wird, wird dies in der Benutzeroberfläche über unsere `status`-Zustandsvariable angezeigt.
- Andernfalls verwenden wir das zurückgegebene `data`-Objekt. Das `data.returnValues` ist ein bei Null indiziertes Array, bei dem das erste Element im Array die vorherige Nachricht und das zweite Element die aktualisierte speichert. Insgesamt werden wir bei einem erfolgreichen Ereignis unseren `message`-String auf die aktualisierte Nachricht setzen, den `newMessage`-String leeren und unsere `status`-Zustandsvariable aktualisieren, um anzuzeigen, dass eine neue Nachricht in unserem Smart Contract veröffentlicht wurde.

Schließlich rufen wir unseren Listener in unserer `useEffect`-Funktion auf, damit er beim ersten Rendern der `HelloWorld.js`-Komponente initialisiert wird. Insgesamt sollte Ihre `useEffect`-Funktion so aussehen:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Jetzt, da wir in der Lage sind, aus unserem Smart Contract zu lesen, wäre es großartig herauszufinden, wie wir auch in ihn schreiben können! Um jedoch in unsere Dapp zu schreiben, müssen wir zuerst eine Ethereum-Wallet damit verbunden haben.

Als Nächstes werden wir uns also mit der Einrichtung unserer Ethereum-Wallet (MetaMask) befassen und sie dann mit unserer Dapp verbinden!

### Schritt 4: Richten Sie Ihre Ethereum-Wallet ein {#step-4-set-up-your-ethereum-wallet}

Um etwas in die Ethereum-Chain zu schreiben, müssen Benutzer Transaktionen mit den privaten Schlüsseln ihrer virtuellen Wallet signieren. Für dieses Tutorial verwenden wir [MetaMask](https://metamask.io/), eine virtuelle Wallet im Browser, die zur Verwaltung Ihrer Ethereum-Kontoadresse verwendet wird, da sie diese Transaktionssignierung für den Endbenutzer super einfach macht.

Wenn Sie mehr darüber erfahren möchten, wie Transaktionen auf Ethereum funktionieren, sehen Sie sich [diese Seite](/developers/docs/transactions/) der Ethereum Foundation an.

#### MetaMask herunterladen {#download-metamask}

Sie können MetaMask [hier](https://metamask.io/download) kostenlos herunterladen und ein Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie oben rechts zum „Goerli Test Network“ wechseln (damit wir nicht mit echtem Geld arbeiten).

#### Ether aus einem Faucet hinzufügen {#add-ether-from-a-faucet}

Um eine Transaktion auf der Ethereum-Blockchain zu signieren, benötigen wir einige gefälschte Eth. Um Eth zu erhalten, können Sie zu [FaucETH](https://fauceth.komputing.org) gehen und Ihre Goerli-Kontoadresse eingeben, auf „Geld anfordern“ klicken, dann im Dropdown-Menü „Ethereum Testnet Goerli“ auswählen und schließlich erneut auf die Schaltfläche „Geld anfordern“ klicken. Kurz darauf solltest du ETH in deinem MetaMask-Konto sehen!

#### Überprüfen Sie Ihr Guthaben {#check-your-balance}

Um zu überprüfen, ob unser Guthaben vorhanden ist, machen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Dies gibt den Betrag an ETH in unserer Wallet zurück. Nachdem Sie die Adresse Ihres MetaMask-Kontos eingegeben und auf “Send Request” (Anforderung senden) geklickt haben, sollten Sie eine Antwort ähnlich der Folgenden erhalten:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**HINWEIS:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei ist die kleinste Einheit von Ether. Die Umrechnung von Wei in ETH ist: 1 ETH = 10¹⁸ Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl umwandeln, erhalten wir 1\*10¹⁸, was 1 ETH entspricht.

Puh! Unser Falschgeld ist da! 🤑

### Schritt 5: MetaMask mit Ihrer Benutzeroberfläche verbinden {#step-5-connect-metamask-to-your-UI}

Nachdem unsere MetaMask-Wallet nun eingerichtet ist, verbinden wir unsere Dapp damit!

#### Die `connectWallet`-Funktion {#the-connectWallet-function}

In unserer `interact.js`-Datei implementieren wir die `connectWallet`-Funktion, die wir dann in unserer `HelloWorld.js`-Komponente aufrufen können.

Lassen Sie uns `connectWallet` wie folgt ändern:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Schreiben Sie eine Nachricht in das Textfeld oben.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Sie müssen MetaMask, eine virtuelle Ethereum-Wallet, in Ihrem
              Browser installieren.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Also, was macht dieser riesige Codeblock genau?

Zuerst prüft er, ob `window.ethereum` in Ihrem Browser aktiviert ist.

`window.ethereum` ist eine globale API, die von MetaMask und anderen Wallet-Anbietern eingeschleust wird und es Websites ermöglicht, die Ethereum-Konten von Benutzern anzufordern. Wenn genehmigt, kann es Daten von den Blockchains lesen, mit denen der Benutzer verbunden ist, und dem Benutzer vorschlagen, Nachrichten und Transaktionen zu signieren. Weitere Informationen findest du in der [MetaMask-Dokumentation](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Wenn `window.ethereum` _nicht_ vorhanden ist, bedeutet das, dass MetaMask nicht installiert ist. Dies führt dazu, dass ein JSON-Objekt zurückgegeben wird, bei dem die zurückgegebene `address` eine leere Zeichenfolge ist und das `status`-JSX-Objekt meldet, dass der Benutzer MetaMask installieren muss.

Wenn `window.ethereum` jedoch vorhanden _ist_, dann wird es interessant.

Mithilfe einer try/catch-Schleife versuchen wir, eine Verbindung zu MetaMask herzustellen, indem wir [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) aufrufen. Der Aufruf dieser Funktion öffnet MetaMask im Browser, woraufhin der Benutzer aufgefordert wird, seine Wallet mit deiner Dapp zu verbinden.

- Wenn der Benutzer sich entscheidet, eine Verbindung herzustellen, gibt `method: "eth_requestAccounts"` ein Array zurück, das alle Konto-Adressen des Benutzers enthält, die mit der Dapp verbunden sind. Insgesamt gibt unsere `connectWallet`-Funktion ein JSON-Objekt zurück, das die _erste_ `address` in diesem Array (siehe Zeile 9) und eine `status`-Nachricht enthält, die den Benutzer auffordert, eine Nachricht an den Smart Contract zu schreiben.
- Wenn der Benutzer die Verbindung ablehnt, enthält das JSON-Objekt eine leere Zeichenfolge für die zurückgegebene `address` und eine `status`-Nachricht, die widerspiegelt, dass der Benutzer die Verbindung abgelehnt hat.

Nachdem wir diese `connectWallet`-Funktion geschrieben haben, ist der nächste Schritt, sie in unserer `HelloWorld.js`-Komponente aufzurufen.

#### Die `connectWallet`-Funktion zu Ihrer `HelloWorld.js`-UI-Komponente hinzufügen {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Navigieren Sie zur `connectWalletPressed`-Funktion in `HelloWorld.js` und aktualisieren Sie sie wie folgt:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Beachten Sie, wie der größte Teil unserer Funktionalität von unserer `HelloWorld.js`-Komponente aus der `interact.js`-Datei abstrahiert wird? Dies geschieht, damit wir dem M-V-C-Paradigma entsprechen!

In `connectWalletPressed` machen wir einfach einen Await-Aufruf an unsere importierte `connectWallet`-Funktion, und mit ihrer Antwort aktualisieren wir unsere `status`- und `walletAddress`-Variablen über ihre State-Hooks.

Lassen Sie uns nun beide Dateien (`HelloWorld.js` und `interact.js`) speichern und unsere bisherige Benutzeroberfläche testen.

Öffnen Sie Ihren Browser auf der Seite [http://localhost:3000/](http://localhost:3000/) und drücken Sie die Schaltfläche „Wallet verbinden“ oben rechts auf der Seite.

Wenn du MetaMask installiert hast, solltest du aufgefordert werden, deine Wallet mit deiner Dapp zu verbinden. Akzeptiere die Aufforderung, eine Verbindung herzustellen.

Sie sollten sehen, dass die Wallet-Schaltfläche nun anzeigt, dass Ihre Adresse verbunden ist! Jaaaaa 🔥

Als Nächstes versuche, die Seite neu zu laden ... Das ist seltsam. Unsere Wallet-Schaltfläche fordert uns auf, MetaMask zu verbinden, obwohl es bereits verbunden ist ...

Aber keine Angst! Wir können das leicht adressieren (verstanden?) indem wir `getCurrentWalletConnected` implementieren, das prüft, ob eine Adresse bereits mit unserer Dapp verbunden ist, und unsere Benutzeroberfläche entsprechend aktualisiert!

#### Die `getCurrentWalletConnected`-Funktion {#the-getcurrentwalletconnected-function}

Aktualisieren Sie Ihre `getCurrentWalletConnected`-Funktion in der `interact.js`-Datei wie folgt:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Schreiben Sie eine Nachricht in das Textfeld oben.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Verbinden Sie sich mit MetaMask über die Schaltfläche oben rechts.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Sie müssen MetaMask, eine virtuelle Ethereum-Wallet, in Ihrem
              Browser installieren.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Dieser Code ist _sehr_ ähnlich der `connectWallet`-Funktion, die wir gerade im vorherigen Schritt geschrieben haben.

Der Hauptunterschied besteht darin, dass wir anstelle der Methode `eth_requestAccounts`, die MetaMask für den Benutzer öffnet, um seine Wallet zu verbinden, hier die Methode `eth_accounts` aufrufen, die einfach ein Array zurückgibt, das die MetaMask-Adressen enthält, die derzeit mit unserer Dapp verbunden sind.

Um diese Funktion in Aktion zu sehen, rufen wir sie in unserer `useEffect`-Funktion unserer `HelloWorld.js`-Komponente auf:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Beachte, dass wir die Antwort unseres Aufrufs an `getCurrentWalletConnected` verwenden, um unsere `walletAddress`- und `status`-Zustandsvariablen zu aktualisieren.

Nachdem Sie diesen Code hinzugefügt haben, versuchen wir, unser Browserfenster zu aktualisieren.

Nett! Die Schaltfläche sollte anzeigen, dass du verbunden bist, und eine Vorschau der Adresse deiner verbundenen Wallet anzeigen – auch nach dem Aktualisieren!

#### Implementieren Sie `addWalletListener` {#implement-addwalletlistener}

Der letzte Schritt in der Einrichtung unserer Dapp-Wallet ist die Implementierung des Wallet-Listeners, damit unsere Benutzeroberfläche aktualisiert wird, wenn sich der Zustand unserer Wallet ändert, z. B. wenn der Benutzer die Verbindung trennt oder das Konto wechselt.

Ändern Sie in Ihrer `HelloWorld.js`-Datei Ihre `addWalletListener`-Funktion wie folgt:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Schreiben Sie eine Nachricht in das Textfeld oben.")
      } else {
        setWallet("")
        setStatus("🦊 Verbinden Sie sich mit MetaMask über die Schaltfläche oben rechts.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Sie müssen MetaMask, eine virtuelle Ethereum-Wallet, in Ihrem Browser installieren.
        </a>
      </p>
    )
  }
}
```

Ich wette, Sie brauchen an dieser Stelle nicht einmal mehr unsere Hilfe, um zu verstehen, was hier vor sich geht, aber aus Gründen der Vollständigkeit, lassen Sie es uns schnell aufschlüsseln:

- Zuerst prüft unsere Funktion, ob `window.ethereum` aktiviert ist (d. h. MetaMask ist installiert).
  - Wenn nicht, setzen wir einfach unsere `status`-Zustandsvariable auf eine JSX-Zeichenfolge, die den Benutzer auffordert, MetaMask zu installieren.
  - Wenn es aktiviert ist, richten wir den Listener `window.ethereum.on("accountsChanged")` in Zeile 3 ein, der auf Zustandsänderungen in der MetaMask-Wallet lauscht. Dazu gehören, wenn der Benutzer ein zusätzliches Konto mit der Dapp verbindet, Konten wechselt oder ein Konto trennt. Wenn mindestens ein Konto verbunden ist, wird die Zustandsvariable `walletAddress` als das erste Konto im `accounts`-Array aktualisiert, das vom Listener zurückgegeben wird. Andernfalls wird `walletAddress` als leere Zeichenfolge festgelegt.

Zu guter Letzt müssen wir sie in unserer `useEffect`-Funktion aufrufen:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Und das war's! Wir haben erfolgreich die gesamte Funktionalität unserer Wallet programmiert! Jetzt zu unserer letzten Aufgabe: die im Smart Contract gespeicherte Nachricht aktualisieren!

### Schritt 6: Implementieren der `updateMessage`-Funktion {#step-6-implement-the-updateMessage-function}

Also gut, Leute, wir sind auf der Zielgeraden! In `updateMessage` Ihrer `interact.js`-Datei werden wir Folgendes tun:

1. Sicherstellen, dass die Nachricht, die wir in unserem Smart Contact veröffentlichen möchten, gültig ist
2. Unsere Transaktion mit MetaMask signieren
3. Diese Funktion aus unserer `HelloWorld.js`-Frontend-Komponente aufrufen

Das wird nicht lange dauern; lassen Sie uns diese Dapp fertigstellen!

#### Fehlerbehandlung bei der Eingabe {#input-error-handling}

Natürlich ist es sinnvoll, am Anfang der Funktion eine Art Eingabefehlerbehandlung zu haben.

Wir möchten, dass unsere Funktion frühzeitig zurückkehrt, wenn keine MetaMask-Erweiterung installiert ist, keine Wallet verbunden ist (d. h. die übergebene `address` ein leerer String ist) oder die `message` ein leerer String ist. Fügen wir die folgende Fehlerbehandlung zu `updateMessage` hinzu:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Verbinden Sie Ihre MetaMask-Wallet, um die Nachricht auf der Blockchain zu aktualisieren.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ihre Nachricht darf kein leerer String sein.",
    }
  }
}
```

Jetzt, da wir eine ordnungsgemäße Eingabefehlerbehandlung haben, ist es Zeit, die Transaktion über MetaMask zu signieren!

#### Unsere Transaktion signieren {#signing-our-transaction}

Wenn Sie bereits mit traditionellen Web3-Ethereum-Transaktionen vertraut sind, wird Ihnen der Code, den wir als Nächstes schreiben, sehr bekannt vorkommen. Fügen Sie unterhalb Ihres Eingabefehlerbehandlungscodes Folgendes zu `updateMessage` hinzu:

```javascript
// interact.js

//Transaktionsparameter einrichten
const transactionParameters = {
  to: contractAddress, // Erforderlich, außer bei der Veröffentlichung von Verträgen.
  from: address, // muss mit der aktiven Adresse des Benutzers übereinstimmen.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// Transaktion signieren
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          Sehen Sie sich den Status Ihrer Transaktion auf Etherscan an!
        </a>
        <br />
        ℹ️ Sobald die Transaktion vom Netzwerk verifiziert ist, wird die Nachricht
        automatisch aktualisiert.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Schauen wir uns an, was hier passiert. Zuerst richten wir unsere Transaktionsparameter ein, wobei:

- `to` gibt die Empfängeradresse an (unser Smart Contract)
- `from` gibt den Unterzeichner der Transaktion an, die `address`-Variable, die wir in unsere Funktion übergeben haben
- `data` enthält den Aufruf der `update`-Methode unseres Hallo-Welt-Smart-Contracts, der unsere `message`-String-Variable als Eingabe erhält

Dann machen wir einen await-Aufruf, `window.ethereum.request`, bei dem wir MetaMask bitten, die Transaktion zu signieren. Beachten Sie, in den Zeilen 11 und 12 geben wir unsere eth-Methode `eth_sendTransaction` an und übergeben unsere `transactionParameters`.

An diesem Punkt öffnet sich MetaMask im Browser und fordert den Benutzer auf, die Transaktion zu signieren oder abzulehnen.

- Wenn die Transaktion erfolgreich ist, gibt die Funktion ein JSON-Objekt zurück, bei dem der `status`-JSX-String den Benutzer auffordert, Etherscan für weitere Informationen zu seiner Transaktion zu besuchen.
- Wenn die Transaktion fehlschlägt, gibt die Funktion ein JSON-Objekt zurück, bei dem der `status`-String die Fehlermeldung weitergibt.

Insgesamt sollte unsere `updateMessage`-Funktion so aussehen:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //Eingabefehlerbehandlung
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Verbinden Sie Ihre MetaMask-Wallet, um die Nachricht auf der Blockchain zu aktualisieren.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ihre Nachricht darf kein leerer String sein.",
    }
  }

  //Transaktionsparameter einrichten
  const transactionParameters = {
    to: contractAddress, // Erforderlich, außer bei der Veröffentlichung von Verträgen.
    from: address, // muss mit der aktiven Adresse des Benutzers übereinstimmen.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // Transaktion signieren
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            Sehen Sie sich den Status Ihrer Transaktion auf Etherscan an!
          </a>
          <br />
          ℹ️ Sobald die Transaktion vom Netzwerk verifiziert ist, wird die Nachricht
          automatisch aktualisiert.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Zu guter Letzt müssen wir unsere `updateMessage`-Funktion mit unserer `HelloWorld.js`-Komponente verbinden.

#### Verbinden Sie `updateMessage` mit dem `HelloWorld.js`-Frontend {#connect-updatemessage-to-the-helloworld-js-frontend}

Unsere `onUpdatePressed`-Funktion sollte einen await-Aufruf an die importierte `updateMessage`-Funktion machen und die `status`-Zustandsvariable ändern, um anzuzeigen, ob unsere Transaktion erfolgreich war oder fehlgeschlagen ist:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Es ist super sauber und einfach. Und raten Sie mal... IHRE DAPP IST FERTIG!!!

Probieren Sie die **Aktualisieren**-Schaltfläche aus!

### Erstellen Sie Ihre eigene benutzerdefinierte Dapp {#make-your-own-custom-dapp}

Wooooo, Sie haben es bis zum Ende des Tutorials geschafft! Zusammenfassend haben Sie gelernt, wie Sie:

- Eine MetaMask-Wallet mit Ihrem Dapp-Projekt verbinden
- Daten aus Ihrem Smart Contract mit der [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API lesen
- Ethereum-Transaktionen mit MetaMask signieren

Jetzt sind Sie voll ausgestattet, um die Fähigkeiten aus diesem Tutorial anzuwenden, um Ihr eigenes benutzerdefiniertes Dapp-Projekt zu erstellen! Wie immer, wenn Sie Fragen haben, zögern Sie nicht, uns im [Alchemy Discord](https://discord.gg/gWuC7zB) um Hilfe zu bitten. 🧙‍♂️

Sobald Sie dieses Tutorial abgeschlossen haben, lassen Sie uns wissen, wie Ihre Erfahrung war oder ob Sie Feedback haben, indem Sie uns auf Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform) taggen!
