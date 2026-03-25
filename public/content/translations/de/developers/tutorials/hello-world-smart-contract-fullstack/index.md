---
title: "Hello World Smart Contract für Anfänger - Fullstack"
description: "Einführungstutorial zum Schreiben und Bereitstellen eines einfachen Smart Contracts auf Ethereum."
author: "nstrike2"
breadcrumb: Hello World Fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "Smart Contracts",
    "Bereitstellung",
    "Blocksuchmaschine",
    "Frontend",
    "Transaktionen",
    "Framework",
  ]
skill: beginner
lang: de
published: 2021-10-25
---

Dieser Leitfaden ist für Sie, wenn Sie neu in der Blockchain-Entwicklung sind und nicht wissen, wo Sie anfangen sollen oder wie Sie Smart Contracts bereitstellen und mit ihnen interagieren können. Wir werden die Erstellung und Bereitstellung eines einfachen Smart Contracts im Goerli-Testnet unter Verwendung von [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) und [Alchemy](https://alchemy.com/eth) durchgehen.

Sie benötigen ein Alchemy-Konto, um dieses Tutorial abzuschließen. [Melden Sie sich für ein kostenloses Konto an](https://www.alchemy.com/).

Wenn Sie zu irgendeinem Zeitpunkt Fragen haben, können Sie sich gerne im [Alchemy Discord](https://discord.gg/gWuC7zB) melden!

## Teil 1 – Erstellen und Bereitstellen Ihres Smart Contracts mit Hardhat {#part-1}

### Mit dem Ethereum-Netzwerk verbinden {#connect-to-the-ethereum-network}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Chain zu stellen. Der Einfachheit halber verwenden wir ein kostenloses Konto bei Alchemy, einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne selbst einen Blockchain-Knoten betreiben zu müssen. Alchemy verfügt auch über Entwicklertools für Überwachung und Analysen; wir werden diese in diesem Tutorial nutzen, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts unter der Haube passiert.

### Erstellen Sie Ihre App und Ihren API-Schlüssel {#create-your-app-and-api-key}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Dies ermöglicht es Ihnen, Anfragen an das Goerli-Testnet zu stellen. Wenn Sie nicht mit Testnets vertraut sind, können Sie [Alchemys Leitfaden zur Auswahl eines Netzwerks lesen](https://www.alchemy.com/docs/choosing-a-web3-network).

Suchen Sie im Alchemy-Dashboard das Dropdown-Menü **Apps** in der Navigationsleiste und klicken Sie auf **Create App**.

![Hello world create app](./hello-world-create-app.png)

Geben Sie Ihrer App den Namen „_Hello World_“ und schreiben Sie eine kurze Beschreibung. Wählen Sie **Staging** als Ihre Umgebung und **Goerli** als Ihr Netzwerk.

![create app view hello world](./create-app-view-hello-world.png)

_Hinweis: Stellen Sie sicher, dass Sie **Goerli** auswählen, da dieses Tutorial sonst nicht funktioniert._

Klicken Sie auf **Create app**. Ihre App wird in der Tabelle unten angezeigt.

### Ein Ethereum-Konto erstellen {#create-an-ethereum-account}

Sie benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. Wir werden MetaMask verwenden, ein virtuelles Wallet im Browser, mit dem Benutzer ihre Ethereum-Konto-Adresse verwalten können.

Sie können [hier](https://metamask.io/download) kostenlos ein MetaMask-Konto herunterladen und erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie oben rechts zum „Goerli Test Network“ wechseln (damit wir nicht mit echtem Geld hantieren).

### Schritt 4: Ether von einem Faucet hinzufügen {#step-4-add-ether-from-a-faucet}

Um Ihren Smart Contract im Testnetzwerk bereitzustellen, benötigen Sie etwas falsches ETH. Um ETH im Goerli-Netzwerk zu erhalten, gehen Sie zu einem Goerli-Faucet und geben Sie Ihre Goerli-Konto-Adresse ein. Beachten Sie, dass Goerli-Faucets in letzter Zeit etwas unzuverlässig sein können – auf der [Testnetzwerk-Seite](/developers/docs/networks/#goerli) finden Sie eine Liste mit Optionen, die Sie ausprobieren können:

_Hinweis: Aufgrund von Netzwerküberlastung kann dies eine Weile dauern._
``

### Schritt 5: Überprüfen Sie Ihr Guthaben {#step-5-check-your-balance}

Um sicherzustellen, dass sich das ETH in Ihrem Wallet befindet, stellen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Dies gibt die Menge an ETH in unserem Wallet zurück. Um mehr zu erfahren, sehen Sie sich [Alchemys kurzes Tutorial zur Verwendung des Composer-Tools](https://youtu.be/r6sjRxBZJuU) an.

Geben Sie Ihre MetaMask-Konto-Adresse ein und klicken Sie auf **Send Request**. Sie werden eine Antwort sehen, die wie der folgende Codeausschnitt aussieht.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Hinweis: Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als die kleinste Stückelung von Ether verwendet._

Puh! Unser falsches Geld ist komplett da.

### Schritt 6: Unser Projekt initialisieren {#step-6-initialize-our-project}

Zuerst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zu Ihrer Kommandozeile und geben Sie Folgendes ein.

```
mkdir hello-world
cd hello-world
```

Jetzt, da wir uns in unserem Projektordner befinden, verwenden wir `npm init`, um das Projekt zu initialisieren.

> Wenn Sie npm noch nicht installiert haben, folgen Sie [diesen Anweisungen, um Node.js und npm zu installieren](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Für die Zwecke dieses Tutorials spielt es keine Rolle, wie Sie die Initialisierungsfragen beantworten. Hier ist als Referenz, wie wir es gemacht haben:

```
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

Bestätigen Sie die package.json und wir können loslegen!

### Schritt 7: Hardhat herunterladen {#step-7-download-hardhat}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern beim lokalen Erstellen von Smart Contracts und Dapps, bevor sie auf der Live-Chain bereitgestellt werden.

Führen Sie in unserem `hello-world`-Projekt Folgendes aus:

```
npm install --save-dev hardhat
```

Auf dieser Seite finden Sie weitere Details zu den [Installationsanweisungen](https://hardhat.org/getting-started/#overview).

### Schritt 8: Hardhat-Projekt erstellen {#step-8-create-hardhat-project}

Führen Sie in unserem `hello-world`-Projektordner Folgendes aus:

```
npx hardhat
```

Sie sollten dann eine Willkommensnachricht und die Option sehen, auszuwählen, was Sie tun möchten. Wählen Sie „create an empty hardhat.config.js“:

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

Dadurch wird eine `hardhat.config.js`-Datei im Projekt generiert. Wir werden diese später im Tutorial verwenden, um das Setup für unser Projekt festzulegen.

### Schritt 9: Projektordner hinzufügen {#step-9-add-project-folders}

Um das Projekt übersichtlich zu halten, lassen Sie uns zwei neue Ordner erstellen. Navigieren Sie in der Kommandozeile zum Stammverzeichnis Ihres `hello-world`-Projekts und geben Sie ein:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ist der Ort, an dem wir unsere Hello-World-Smart-Contract-Codedatei aufbewahren werden
- `scripts/` ist der Ort, an dem wir Skripte zur Bereitstellung und Interaktion mit unserem Vertrag aufbewahren werden

### Schritt 10: Unseren Vertrag schreiben {#step-10-write-our-contract}

Sie fragen sich vielleicht, wann wir endlich Code schreiben werden? Es ist soweit!

Öffnen Sie das hello-world-Projekt in Ihrem bevorzugten Editor. Smart Contracts werden am häufigsten in Solidity geschrieben, was wir auch verwenden werden, um unseren Smart Contract zu schreiben.‌

1. Navigieren Sie zum Ordner `contracts` und erstellen Sie eine neue Datei namens `HelloWorld.sol`
2. Unten finden Sie einen beispielhaften Hello-World-Smart-Contract, den wir für dieses Tutorial verwenden werden. Kopieren Sie den folgenden Inhalt in die Datei `HelloWorld.sol`.

_Hinweis: Lesen Sie unbedingt die Kommentare, um zu verstehen, was dieser Vertrag tut._

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Dies ist ein grundlegender Smart Contract, der bei der Erstellung eine Nachricht speichert. Sie kann durch Aufrufen der Funktion `update` aktualisiert werden.

### Schritt 11: MetaMask & Alchemy mit Ihrem Projekt verbinden {#step-11-connect-metamask-alchemy-to-your-project}

Wir haben ein MetaMask-Wallet und ein Alchemy-Konto erstellt sowie unseren Smart Contract geschrieben. Nun ist es an der Zeit, die drei miteinander zu verbinden.

Jede von Ihrem Wallet gesendete Transaktion erfordert eine Signatur mit Ihrem einzigartigen Private-Key. Um unserem Programm diese Berechtigung zu erteilen, können wir unseren Private-Key sicher in einer Umgebungsdatei speichern. Wir werden hier auch einen API-Schlüssel für Alchemy speichern.

> Um mehr über das Senden von Transaktionen zu erfahren, sehen Sie sich [dieses Tutorial](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) zum Senden von Transaktionen mit web3 an.

Installieren Sie zunächst das dotenv-Paket in Ihrem Projektverzeichnis:

```
npm install dotenv --save
```

Erstellen Sie dann eine `.env`-Datei im Stammverzeichnis des Projekts. Fügen Sie Ihren MetaMask-Private-Key und die HTTP-Alchemy-API-URL hinzu.

Ihre Umgebungsdatei muss `.env` heißen, sonst wird sie nicht als Umgebungsdatei erkannt.

Nennen Sie sie nicht `process.env` oder `.env-custom` oder ähnlich.

- Befolgen Sie [diese Anweisungen](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um Ihren Private-Key zu exportieren
- Siehe unten, um die HTTP-Alchemy-API-URL zu erhalten

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Ihre `.env` sollte so aussehen:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, werden wir in Schritt 13 in unserer `hardhat.config.js`-Datei auf diese Variablen verweisen.

### Schritt 12: Ethers.js installieren {#step-12-install-ethersjs}

Ethers.js ist eine Bibliothek, die die Interaktion und das Stellen von Anfragen an Ethereum erleichtert, indem sie [Standard-JSON-RPC-Methoden](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) in benutzerfreundlichere Methoden verpackt.

Hardhat ermöglicht es uns, [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) für die Bereitstellung von Verträgen nutzen.

Geben Sie in Ihrem Projektverzeichnis Folgendes ein:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Schritt 13: hardhat.config.js aktualisieren {#step-13-update-hardhat-configjs}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt, jetzt müssen wir `hardhat.config.js` aktualisieren, damit unser Projekt von allen weiß.

Aktualisieren Sie Ihre `hardhat.config.js`, sodass sie wie folgt aussieht:

```javascript
/* *
 * @type import('hardhat/config').HardhatUserConfig */




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

### Schritt 14: Unseren Vertrag kompilieren {#step-14-compile-our-contract}

Um sicherzustellen, dass bisher alles funktioniert, lassen Sie uns unseren Vertrag kompilieren. Die Aufgabe `compile` ist eine der integrierten Hardhat-Aufgaben.

Führen Sie in der Kommandozeile Folgendes aus:

```bash
npx hardhat compile
```

Möglicherweise erhalten Sie eine Warnung über `SPDX license identifier not provided in source file`, aber darüber müssen Sie sich keine Sorgen machen – hoffentlich sieht alles andere gut aus! Wenn nicht, können Sie jederzeit im [Alchemy-Discord](https://discord.gg/u72VCg3) nachfragen.

### Schritt 15: Unser Bereitstellungsskript schreiben {#step-15-write-our-deploy-script}

Jetzt, da unser Vertrag geschrieben ist und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, unser Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`. Fügen Sie ihr den folgenden Inhalt hinzu:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Startet die Bereitstellung und gibt ein Promise zurück, das zu einem Vertragsobjekt aufgelöst wird
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat leistet hervorragende Arbeit bei der Erklärung, was jede dieser Codezeilen in ihrem [Contracts-Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) tut. Wir haben ihre Erklärungen hier übernommen.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Eine `ContractFactory` in ethers.js ist eine Abstraktion, die zur Bereitstellung neuer Smart Contracts verwendet wird. `HelloWorld` ist hier also eine [Factory](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) für Instanzen unseres Hello-World-Vertrags. Bei Verwendung des `hardhat-ethers`-Plugins sind `ContractFactory`- und `Contract`-Instanzen standardmäßig mit dem ersten Unterzeichner (Eigentümer) verbunden.

```javascript
const hello_world = await HelloWorld.deploy()
```

Der Aufruf von `deploy()` auf einer `ContractFactory` startet die Bereitstellung und gibt ein `Promise` zurück, das in ein `Contract`-Objekt aufgelöst wird. Dies ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen hat.

### Schritt 16: Unseren Vertrag bereitstellen {#step-16-deploy-our-contract}

Wir sind endlich bereit, unseren Smart Contract bereitzustellen! Navigieren Sie zur Kommandozeile und führen Sie Folgendes aus:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Sie sollten dann in etwa Folgendes sehen:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Bitte speichern Sie diese Adresse**. Wir werden sie später im Tutorial verwenden.

Wenn wir zum [Goerli Etherscan](https://goerli.etherscan.io) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Die Transaktion wird in etwa so aussehen:

![](./etherscan-contract.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Konto-Adresse übereinstimmen und die `To`-Adresse wird **Contract Creation** anzeigen. Wenn wir in die Transaktion klicken, sehen wir unsere Vertragsadresse im `To`-Feld.

![](./etherscan-transaction.png)

Glückwunsch! Sie haben gerade einen Smart Contract in einem Ethereum-Testnet bereitgestellt.

Um zu verstehen, was unter der Haube passiert, navigieren wir zum Explorer-Tab in unserem [Alchemy-Dashboard](https://dashboard.alchemy.com/explorer). Wenn Sie mehrere Alchemy-Apps haben, stellen Sie sicher, dass Sie nach App filtern und **Hello World** auswählen.

![](./hello-world-explorer.png)

Hier sehen Sie eine Handvoll JSON-RPC-Methoden, die Hardhat/Ethers unter der Haube für uns ausgeführt haben, als wir die Funktion `.deploy()` aufgerufen haben. Zwei wichtige Methoden hierbei sind [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), was die Anfrage ist, unseren Vertrag auf die Goerli-Chain zu schreiben, und [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), was eine Anfrage ist, um Informationen über unsere Transaktion anhand des Hashs zu lesen. Um mehr über das Senden von Transaktionen zu erfahren, sehen Sie sich [unser Tutorial zum Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) an.

## Teil 2: Interagieren Sie mit Ihrem Smart Contract {#part-2-interact-with-your-smart-contract}

Nachdem wir nun erfolgreich einen Smart Contract im Goerli-Netzwerk bereitgestellt haben, wollen wir lernen, wie man mit ihm interagiert.

### Erstellen Sie eine interact.js-Datei {#create-a-interactjs-file}

Dies ist die Datei, in der wir unser Interaktionsskript schreiben werden. Wir werden die Ethers.js-Bibliothek verwenden, die Sie zuvor in Teil 1 installiert haben.

Erstellen Sie im Ordner `scripts/` eine neue Datei namens `interact.js` und fügen Sie den folgenden Code hinzu:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aktualisieren Sie Ihre .env-Datei {#update-your-env-file}

Wir werden neue Umgebungsvariablen verwenden, daher müssen wir sie in der `.env`-Datei definieren, die [wir zuvor erstellt haben](#step-11-connect-metamask-&-alchemy-to-your-project).

Wir müssen eine Definition für unseren Alchemy-`API_KEY` und die `CONTRACT_ADDRESS` hinzufügen, unter der Ihr Smart Contract bereitgestellt wurde.

Ihre `.env`-Datei sollte in etwa so aussehen:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Holen Sie sich Ihre Vertrags-ABI {#grab-your-contract-ABI}

Unsere Vertrags-[ABI (Application Binary Interface)](/glossary/#abi) ist die Schnittstelle zur Interaktion mit unserem Smart Contract. Hardhat generiert automatisch eine ABI und speichert sie in `HelloWorld.json`. Um die ABI zu verwenden, müssen wir den Inhalt parsen, indem wir die folgenden Codezeilen zu unserer Datei `interact.js` hinzufügen:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Wenn Sie die ABI sehen möchten, können Sie sie in Ihrer Konsole ausgeben:

```javascript
console.log(JSON.stringify(contract.abi))
```

Um Ihre ABI in der Konsole ausgeben zu lassen, navigieren Sie zu Ihrem Terminal und führen Sie Folgendes aus:

```bash
npx hardhat run scripts/interact.js
```

### Erstellen Sie eine Instanz Ihres Vertrags {#create-an-instance-of-your-contract}

Um mit unserem Vertrag zu interagieren, müssen wir eine Vertragsinstanz in unserem Code erstellen. Um dies mit Ethers.js zu tun, müssen wir mit drei Konzepten arbeiten:

1. Provider – ein Blockchain-Knoten-Anbieter, der Ihnen Lese- und Schreibzugriff auf die Blockchain gibt
2. Signer – repräsentiert ein Ethereum-Konto, das Transaktionen signieren kann
3. Contract – ein Ethers.js-Objekt, das einen bestimmten Vertrag repräsentiert, der auf der Blockchain bereitgestellt wurde

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

### Lesen Sie die Init-Nachricht {#read-the-init-message}

Erinnern Sie sich, als wir unseren Vertrag mit der `initMessage = "Hello world!"` bereitgestellt haben? Wir werden nun diese in unserem Smart Contract gespeicherte Nachricht lesen und in der Konsole ausgeben.

In JavaScript werden asynchrone Funktionen verwendet, wenn mit Netzwerken interagiert wird. Um mehr über asynchrone Funktionen zu erfahren, [lesen Sie diesen Medium-Artikel](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Verwenden Sie den folgenden Code, um die Funktion `message` in unserem Smart Contract aufzurufen und die Init-Nachricht zu lesen:

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
The message is: Hello world!
```

Herzlichen Glückwunsch! Sie haben gerade erfolgreich Smart Contract-Daten aus der Ethereum-Blockchain gelesen, weiter so!

### Aktualisieren Sie die Nachricht {#update-the-message}

Anstatt die Nachricht nur zu lesen, können wir die in unserem Smart Contract gespeicherte Nachricht auch mit der Funktion `update` aktualisieren! Ziemlich cool, oder?

Um die Nachricht zu aktualisieren, können wir die Funktion `update` direkt auf unserem instanziierten Contract-Objekt aufrufen:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Beachten Sie, dass wir in Zeile 11 einen Aufruf von `.wait()` auf dem zurückgegebenen Transaktionsobjekt durchführen. Dies stellt sicher, dass unser Skript darauf wartet, dass die Transaktion auf der Blockchain gemint wird, bevor die Funktion beendet wird. Wenn der Aufruf von `.wait()` nicht enthalten ist, sieht das Skript möglicherweise nicht den aktualisierten `message`-Wert im Vertrag.

### Lesen Sie die neue Nachricht {#read-the-new-message}

Sie sollten in der Lage sein, den [vorherigen Schritt](#read-the-init-message) zu wiederholen, um den aktualisierten `message`-Wert zu lesen. Nehmen Sie sich einen Moment Zeit und prüfen Sie, ob Sie die notwendigen Änderungen vornehmen können, um diesen neuen Wert auszugeben!

Wenn Sie einen Hinweis benötigen, sehen Sie hier, wie Ihre Datei `interact.js` zu diesem Zeitpunkt aussehen sollte:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// Provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer - du
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Vertragsinstanz
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Führen Sie nun einfach das Skript aus und Sie sollten die alte Nachricht, den Aktualisierungsstatus und die neue Nachricht in Ihrem Terminal sehen können!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Während Sie dieses Skript ausführen, werden Sie vielleicht bemerken, dass der Schritt `Updating the message...` eine Weile dauert, bevor die neue Nachricht geladen wird. Das liegt am Mining-Prozess; wenn Sie neugierig sind und Transaktionen verfolgen möchten, während sie gemint werden, besuchen Sie den [Alchemy-Mempool](https://dashboard.alchemyapi.io/mempool), um den Status einer Transaktion zu sehen. Wenn die Transaktion verworfen wird, ist es auch hilfreich, [Goerli Etherscan](https://goerli.etherscan.io) zu überprüfen und nach Ihrem Transaktions-Hash zu suchen.

## Teil 3: Veröffentlichen Sie Ihren Smart Contract auf Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Sie haben die ganze harte Arbeit geleistet, um Ihren Smart Contract zum Leben zu erwecken; jetzt ist es an der Zeit, ihn mit der Welt zu teilen!

Indem Sie Ihren Smart Contract auf Etherscan verifizieren, kann jeder Ihren Quellcode einsehen und mit Ihrem Smart Contract interagieren. Fangen wir an!

### Schritt 1: Generieren Sie einen API-Schlüssel in Ihrem Etherscan-Konto {#step-1-generate-an-api-key-on-your-etherscan-account}

Ein Etherscan-API-Schlüssel ist erforderlich, um zu verifizieren, dass Sie der Eigentümer des Smart Contracts sind, den Sie veröffentlichen möchten.

Wenn Sie noch kein Etherscan-Konto haben, [registrieren Sie sich für ein Konto](https://etherscan.io/register).

Sobald Sie eingeloggt sind, suchen Sie Ihren Benutzernamen in der Navigationsleiste, fahren Sie mit der Maus darüber und wählen Sie die Schaltfläche **My profile**.

Auf Ihrer Profilseite sollten Sie eine seitliche Navigationsleiste sehen. Wählen Sie in der seitlichen Navigationsleiste **API Keys**. Klicken Sie anschließend auf die Schaltfläche „Add“, um einen neuen API-Schlüssel zu erstellen, nennen Sie Ihre App **hello-world** und klicken Sie auf die Schaltfläche **Create New API Key**.

Ihr neuer API-Schlüssel sollte in der API-Schlüssel-Tabelle erscheinen. Kopieren Sie den API-Schlüssel in Ihre Zwischenablage.

Als Nächstes müssen wir den Etherscan-API-Schlüssel zu unserer `.env`-Datei hinzufügen.

Nach dem Hinzufügen sollte Ihre `.env`-Datei wie folgt aussehen:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Mit Hardhat bereitgestellte Smart Contracts {#hardhat-deployed-smart-contracts}

#### Installieren von hardhat-etherscan {#install-hardhat-etherscan}

Die Veröffentlichung Ihres Vertrags auf Etherscan mit Hardhat ist unkompliziert. Sie müssen zunächst das Plugin `hardhat-etherscan` installieren, um loszulegen. `hardhat-etherscan` wird den Quellcode und die ABI des Smart Contracts automatisch auf Etherscan verifizieren. Um dies hinzuzufügen, führen Sie im Verzeichnis `hello-world` Folgendes aus:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Sobald es installiert ist, fügen Sie die folgende Anweisung oben in Ihrer `hardhat.config.js` ein und fügen Sie die Etherscan-Konfigurationsoptionen hinzu:

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
    // Dein API-Schlüssel für Etherscan
    // Erhalte einen unter https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifizieren Sie Ihren Smart Contract auf Etherscan {#verify-your-smart-contract-on-etherscan}

Stellen Sie sicher, dass alle Dateien gespeichert und alle `.env`-Variablen korrekt konfiguriert sind.

Führen Sie die Aufgabe `verify` aus und übergeben Sie die Vertragsadresse sowie das Netzwerk, in dem er bereitgestellt wurde:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Stellen Sie sicher, dass `DEPLOYED_CONTRACT_ADDRESS` die Adresse Ihres bereitgestellten Smart Contracts im Goerli-Testnet ist. Außerdem muss das letzte Argument (`'Hello World!'`) derselbe Zeichenfolgenwert sein, der [während des Bereitstellungsschritts in Teil 1](#write-our-deploy-script) verwendet wurde.

Wenn alles gut geht, sehen Sie die folgende Nachricht in Ihrem Terminal:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https: // goerli.etherscan.io/address/<contract-address>#contracts
```

Herzlichen Glückwunsch! Ihr Smart Contract-Code ist auf Etherscan!

### Sehen Sie sich Ihren Smart Contract auf Etherscan an! {#check-out-your-smart-contract-on-etherscan}

Wenn Sie zu dem in Ihrem Terminal angegebenen Link navigieren, sollten Sie Ihren Smart Contract-Code und die auf Etherscan veröffentlichte ABI sehen können!

**Wahooo – Sie haben es geschafft, Champion! Jetzt kann jeder Ihren Smart Contract aufrufen oder in ihn schreiben! Wir können es kaum erwarten zu sehen, was Sie als Nächstes bauen!**

## Teil 4 – Integration Ihres Smart Contracts in das Frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Am Ende dieses Tutorials werden Sie wissen, wie man:

- Ein MetaMask-Wallet mit Ihrer Dapp verbindet
- Daten aus Ihrem Smart Contract mithilfe der [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)-API liest
- Ethereum-Transaktionen mit MetaMask signiert

Für diese Dapp werden wir [React](https://react.dev/) als unser Frontend-Framework verwenden. Es ist jedoch wichtig zu beachten, dass wir nicht viel Zeit darauf verwenden werden, die Grundlagen zu erklären, da wir uns hauptsächlich darauf konzentrieren, Web3-Funktionalität in unser Projekt zu integrieren.

Als Voraussetzung sollten Sie über grundlegende React-Kenntnisse verfügen. Falls nicht, empfehlen wir, das offizielle [Intro to React-Tutorial](https://react.dev/learn) zu absolvieren.

### Klonen der Startdateien {#clone-the-starter-files}

Gehen Sie zunächst zum [hello-world-part-four GitHub-Repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial), um die Startdateien für dieses Projekt zu erhalten, und klonen Sie dieses Repository auf Ihren lokalen Computer.

Öffnen Sie das geklonte Repository lokal. Beachten Sie, dass es zwei Ordner enthält: `starter-files` und `completed`.

- `starter-files` – **wir werden in diesem Verzeichnis arbeiten**, wir werden die Benutzeroberfläche mit Ihrem Ethereum-Wallet und dem Smart Contract verbinden, den wir in [Teil 3](#part-3) auf Etherscan veröffentlicht haben.
- `completed` enthält das gesamte abgeschlossene Tutorial und sollte nur als Referenz verwendet werden, falls Sie nicht weiterkommen.

Öffnen Sie als Nächstes Ihre Kopie von `starter-files` in Ihrem bevorzugten Code-Editor und navigieren Sie dann in den Ordner `src`.

Der gesamte Code, den wir schreiben werden, befindet sich im Ordner `src`. Wir werden die Komponente `HelloWorld.js` und die JavaScript-Dateien `util/interact.js` bearbeiten, um unserem Projekt Web3-Funktionalität zu verleihen.

### Überprüfen der Startdateien {#check-out-the-starter-files}

Bevor wir mit dem Programmieren beginnen, wollen wir uns ansehen, was uns in den Startdateien zur Verfügung gestellt wird.

#### Starten Sie Ihr React-Projekt {#get-your-react-project-running}

Beginnen wir damit, das React-Projekt in unserem Browser auszuführen. Das Schöne an React ist, dass alle Änderungen, die wir speichern, live in unserem Browser aktualisiert werden, sobald unser Projekt im Browser läuft.

Um das Projekt zum Laufen zu bringen, navigieren Sie zum Stammverzeichnis des Ordners `starter-files` und führen Sie `npm install` in Ihrem Terminal aus, um die Abhängigkeiten des Projekts zu installieren:

```bash
cd starter-files
npm install
```

Sobald die Installation abgeschlossen ist, führen Sie `npm start` in Ihrem Terminal aus:

```bash
npm start
```

Dadurch sollte sich [http://localhost:3000/](http://localhost:3000/) in Ihrem Browser öffnen, wo Sie das Frontend für unser Projekt sehen. Es sollte aus einem Feld (einem Ort zum Aktualisieren der in Ihrem Smart Contract gespeicherten Nachricht), einer Schaltfläche „Connect Wallet“ und einer Schaltfläche „Update“ bestehen.

Wenn Sie versuchen, auf eine der Schaltflächen zu klicken, werden Sie feststellen, dass sie nicht funktionieren – das liegt daran, dass wir ihre Funktionalität erst noch programmieren müssen.

#### Die Komponente `HelloWorld.js` {#the-helloworld-js-component}

Gehen wir in unserem Editor zurück in den Ordner `src` und öffnen die Datei `HelloWorld.js`. Es ist extrem wichtig, dass wir alles in dieser Datei verstehen, da es sich um die primäre React-Komponente handelt, an der wir arbeiten werden.

Oben in dieser Datei werden Sie feststellen, dass wir mehrere Importanweisungen haben, die erforderlich sind, um unser Projekt zum Laufen zu bringen, einschließlich der React-Bibliothek, der Hooks useEffect und useState, einiger Elemente aus `./util/interact.js` (wir werden sie bald genauer beschreiben!) und des Alchemy-Logos.

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

// Zustandsvariablen
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Hier ist, was jede der Variablen darstellt:

- `walletAddress` – ein String, der die Wallet-Adresse des Benutzers speichert
- `status` – ein String, der eine hilfreiche Nachricht speichert, die den Benutzer bei der Interaktion mit der Dapp anleitet
- `message` – ein String, der die aktuelle Nachricht im Smart Contract speichert
- `newMessage` – ein String, der die neue Nachricht speichert, die in den Smart Contract geschrieben wird

Nach den Zustandsvariablen sehen Sie fünf nicht implementierte Funktionen: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` und `onUpdatePressed`. Wir erklären unten, was sie tun:

```javascript
// HelloWorld.js

// wird nur einmal aufgerufen
useEffect(async () => {
  // TODO: implementieren
}, [])

function addSmartContractListener() {
  // TODO: implementieren
}

function addWalletListener() {
  // TODO: implementieren
}

const connectWalletPressed = async () => {
  // TODO: implementieren
}

const onUpdatePressed = async () => {
  // TODO: implementieren
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) – dies ist ein React-Hook, der aufgerufen wird, nachdem Ihre Komponente gerendert wurde. Da ihm ein leeres Array `[]` als Prop übergeben wird (siehe Zeile 4), wird er nur beim _ersten_ Rendern der Komponente aufgerufen. Hier laden wir die aktuelle in unserem Smart Contract gespeicherte Nachricht, rufen unsere Smart Contract- und Wallet-Listener auf und aktualisieren unsere Benutzeroberfläche, um widerzuspiegeln, ob bereits ein Wallet verbunden ist.
- `addSmartContractListener` – diese Funktion richtet einen Listener ein, der auf das Ereignis `UpdatedMessages` unseres HelloWorld-Vertrags achtet und unsere Benutzeroberfläche aktualisiert, wenn die Nachricht in unserem Smart Contract geändert wird.
- `addWalletListener` – diese Funktion richtet einen Listener ein, der Änderungen im Status des MetaMask-Wallets des Benutzers erkennt, z. B. wenn der Benutzer sein Wallet trennt oder die Adresse wechselt.
- `connectWalletPressed` – diese Funktion wird aufgerufen, um das MetaMask-Wallet des Benutzers mit unserer Dapp zu verbinden.
- `onUpdatePressed` – diese Funktion wird aufgerufen, wenn der Benutzer die im Smart Contract gespeicherte Nachricht aktualisieren möchte.

Gegen Ende dieser Datei haben wir die Benutzeroberfläche unserer Komponente.

```javascript
// HelloWorld.js

// die UI unserer Komponente
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Wenn Sie diesen Code sorgfältig prüfen, werden Sie feststellen, wo wir unsere verschiedenen Zustandsvariablen in unserer Benutzeroberfläche verwenden:

- In den Zeilen 6-12 zeigen wir, wenn das Wallet des Benutzers verbunden ist (d. h. `walletAddress.length > 0`), eine gekürzte Version der `walletAddress` des Benutzers in der Schaltfläche mit der ID „walletButton“ an; andernfalls steht dort einfach „Connect Wallet“.
- In Zeile 17 zeigen wir die aktuelle im Smart Contract gespeicherte Nachricht an, die im String `message` erfasst ist.
- In den Zeilen 23-26 verwenden wir eine [gesteuerte Komponente](https://legacy.reactjs.org/docs/forms.html#controlled-components), um unsere Zustandsvariable `newMessage` zu aktualisieren, wenn sich die Eingabe im Textfeld ändert.

Zusätzlich zu unseren Zustandsvariablen werden Sie auch sehen, dass die Funktionen `connectWalletPressed` und `onUpdatePressed` aufgerufen werden, wenn auf die Schaltflächen mit den IDs `publishButton` bzw. `walletButton` geklickt wird.

Lassen Sie uns abschließend klären, wo diese Komponente `HelloWorld.js` hinzugefügt wird.

Wenn Sie zur Datei `App.js` gehen, der Hauptkomponente in React, die als Container für alle anderen Komponenten fungiert, werden Sie sehen, dass unsere Komponente `HelloWorld.js` in Zeile 7 eingefügt wird.

Zu guter Letzt schauen wir uns noch eine weitere Datei an, die Ihnen zur Verfügung gestellt wird: die Datei `interact.js`.

#### Die Datei `interact.js` {#the-interact-js-file}

Da wir uns an das [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-Paradigma halten wollen, benötigen wir eine separate Datei, die alle unsere Funktionen zur Verwaltung der Logik, Daten und Regeln unserer Dapp enthält, um diese Funktionen dann in unser Frontend (unsere Komponente `HelloWorld.js`) exportieren zu können.

👆🏽Genau das ist der Zweck unserer Datei `interact.js`!

Navigieren Sie zum Ordner `util` in Ihrem Verzeichnis `src`, und Sie werden feststellen, dass wir eine Datei namens `interact.js` eingefügt haben, die alle unsere Smart Contract-Interaktions- und Wallet-Funktionen sowie Variablen enthalten wird.

```javascript
// interact.js

// export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Sie werden oben in der Datei feststellen, dass wir das Objekt `helloWorldContract` auskommentiert haben. Später in diesem Tutorial werden wir dieses Objekt einkommentieren und unseren Smart Contract in dieser Variablen instanziieren, die wir dann in unsere Komponente `HelloWorld.js` exportieren werden.

Die vier nicht implementierten Funktionen nach unserem Objekt `helloWorldContract` tun Folgendes:

- `loadCurrentMessage` – diese Funktion übernimmt die Logik zum Laden der aktuellen im Smart Contract gespeicherten Nachricht. Sie führt einen _Lese_-Aufruf an den Hello World Smart Contract mithilfe der [Alchemy Web3-API](https://github.com/alchemyplatform/alchemy-web3) durch.
- `connectWallet` – diese Funktion verbindet das MetaMask des Benutzers mit unserer Dapp.
- `getCurrentWalletConnected` – diese Funktion prüft beim Laden der Seite, ob bereits ein Ethereum-Konto mit unserer Dapp verbunden ist, und aktualisiert unsere Benutzeroberfläche entsprechend.
- `updateMessage` – diese Funktion aktualisiert die im Smart Contract gespeicherte Nachricht. Sie führt einen _Schreib_-Aufruf an den Hello World Smart Contract durch, sodass das MetaMask-Wallet des Benutzers eine Ethereum-Transaktion signieren muss, um die Nachricht zu aktualisieren.

Da wir nun verstehen, womit wir arbeiten, wollen wir herausfinden, wie wir aus unserem Smart Contract lesen können!

### Schritt 3: Lesen aus Ihrem Smart Contract {#step-3-read-from-your-smart-contract}

Um aus Ihrem Smart Contract zu lesen, müssen Sie Folgendes erfolgreich einrichten:

- Eine API-Verbindung zur Ethereum-Chain
- Eine geladene Instanz Ihres Smart Contracts
- Eine Funktion zum Aufrufen Ihrer Smart Contract-Funktion
- Einen Listener, der auf Aktualisierungen achtet, wenn sich die Daten ändern, die Sie aus dem Smart Contract lesen

Das mag nach vielen Schritten klingen, aber keine Sorge! Wir werden Sie Schritt für Schritt durch jeden einzelnen führen! :)

#### Herstellen einer API-Verbindung zur Ethereum-Chain {#establish-an-api-connection-to-the-ethereum-chain}

Erinnern Sie sich daran, wie wir in Teil 2 dieses Tutorials unseren [Alchemy Web3-Schlüssel verwendet haben, um aus unserem Smart Contract zu lesen](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Sie benötigen auch in Ihrer Dapp einen Alchemy Web3-Schlüssel, um von der Chain zu lesen.

Falls Sie es noch nicht haben, installieren Sie zunächst [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), indem Sie zum Stammverzeichnis Ihrer `starter-files` navigieren und Folgendes in Ihrem Terminal ausführen:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ist ein Wrapper um [Web3.js](https://docs.web3js.org/), der erweiterte API-Methoden und andere entscheidende Vorteile bietet, um Ihnen das Leben als Web3-Entwickler zu erleichtern. Es ist so konzipiert, dass es nur minimale Konfiguration erfordert, sodass Sie es sofort in Ihrer App verwenden können!

Installieren Sie dann das Paket [dotenv](https://www.npmjs.com/package/dotenv) in Ihrem Projektverzeichnis, damit wir einen sicheren Ort haben, um unseren API-Schlüssel zu speichern, nachdem wir ihn abgerufen haben.

```text
npm install dotenv --save
```

Für unsere Dapp **werden wir unseren Websockets-API-Schlüssel verwenden** anstelle unseres HTTP-API-Schlüssels, da er es uns ermöglicht, einen Listener einzurichten, der erkennt, wenn sich die im Smart Contract gespeicherte Nachricht ändert.

Sobald Sie Ihren API-Schlüssel haben, erstellen Sie eine `.env`-Datei in Ihrem Stammverzeichnis und fügen Sie Ihre Alchemy Websockets-URL hinzu. Danach sollte Ihre `.env`-Datei wie folgt aussehen:

```javascript
REACT_APP_ALCHEMY_KEY = wss: // eth-goerli.ws.alchemyapi.io/v2/<key>
```

Jetzt sind wir bereit, unseren Alchemy Web3-Endpunkt in unserer Dapp einzurichten! Gehen wir zurück zu unserer `interact.js`, die sich in unserem Ordner `util` befindet, und fügen den folgenden Code oben in der Datei hinzu:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

// export const helloWorldContract;
```

Oben haben wir zuerst den Alchemy-Schlüssel aus unserer `.env`-Datei importiert und dann unseren `alchemyKey` an `createAlchemyWeb3` übergeben, um unseren Alchemy Web3-Endpunkt einzurichten.

Da dieser Endpunkt nun bereit ist, ist es an der Zeit, unseren Smart Contract zu laden!

#### Laden Ihres Hello World Smart Contracts {#loading-your-hello-world-smart-contract}

Um Ihren Hello World Smart Contract zu laden, benötigen Sie dessen Vertragsadresse und ABI, die beide auf Etherscan zu finden sind, wenn Sie [Teil 3 dieses Tutorials](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) abgeschlossen haben.

#### So erhalten Sie Ihre Vertrags-ABI von Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Wenn Sie Teil 3 dieses Tutorials übersprungen haben, können Sie den HelloWorld-Vertrag mit der Adresse [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) verwenden. Seine ABI finden Sie [hier](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

Eine Vertrags-ABI ist erforderlich, um anzugeben, welche Funktion ein Vertrag aufrufen wird, und um sicherzustellen, dass die Funktion Daten in dem von Ihnen erwarteten Format zurückgibt. Sobald wir unsere Vertrags-ABI kopiert haben, speichern wir sie als JSON-Datei namens `contract-abi.json` in Ihrem Verzeichnis `src`.

Ihre contract-abi.json sollte in Ihrem src-Ordner gespeichert werden.

Ausgestattet mit unserer Vertragsadresse, ABI und dem Alchemy Web3-Endpunkt können wir die [contract-Methode](https://docs.web3js.org/api/web3-eth-contract/class/Contract) verwenden, um eine Instanz unseres Smart Contracts zu laden. Importieren Sie Ihre Vertrags-ABI in die Datei `interact.js` und fügen Sie Ihre Vertragsadresse hinzu.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Wir können nun endlich unsere Variable `helloWorldContract` einkommentieren und den Smart Contract über unseren AlchemyWeb3-Endpunkt laden:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Zusammenfassend sollten die ersten 12 Zeilen Ihrer `interact.js` nun so aussehen:

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

Da wir unseren Vertrag nun geladen haben, können wir unsere Funktion `loadCurrentMessage` implementieren!

#### Implementierung von `loadCurrentMessage` in Ihrer Datei `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Diese Funktion ist super einfach. Wir werden einen einfachen asynchronen Web3-Aufruf durchführen, um aus unserem Vertrag zu lesen. Unsere Funktion wird die im Smart Contract gespeicherte Nachricht zurückgeben:

Aktualisieren Sie die `loadCurrentMessage` in Ihrer Datei `interact.js` wie folgt:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Da wir diesen Smart Contract in unserer Benutzeroberfläche anzeigen möchten, aktualisieren wir die Funktion `useEffect` in unserer Komponente `HelloWorld.js` wie folgt:

```javascript
// HelloWorld.js

// wird nur einmal aufgerufen
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Beachten Sie, dass unsere `loadCurrentMessage` nur einmal während des ersten Renderns der Komponente aufgerufen werden soll. Wir werden bald `addSmartContractListener` implementieren, um die Benutzeroberfläche automatisch zu aktualisieren, nachdem sich die Nachricht im Smart Contract geändert hat.

Bevor wir uns in unseren Listener stürzen, schauen wir uns an, was wir bisher haben! Speichern Sie Ihre Dateien `HelloWorld.js` und `interact.js` und gehen Sie dann zu [http://localhost:3000/](http://localhost:3000/)

Sie werden feststellen, dass die aktuelle Nachricht nicht mehr „No connection to the network.“ lautet. Stattdessen spiegelt sie die im Smart Contract gespeicherte Nachricht wider. Genial!

#### Ihre Benutzeroberfläche sollte nun die im Smart Contract gespeicherte Nachricht widerspiegeln {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Apropos Listener...

#### Implementierung von `addSmartContractListener` {#implement-addsmartcontractlistener}

Wenn Sie an die Datei `HelloWorld.sol` zurückdenken, die wir in [Teil 1 dieser Tutorial-Reihe](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) geschrieben haben, werden Sie sich erinnern, dass es ein Smart Contract-Ereignis namens `UpdatedMessages` gibt, das ausgegeben wird, nachdem die Funktion `update` unseres Smart Contracts aufgerufen wurde (siehe Zeilen 9 und 27):

```javascript
// HelloWorld.sol

// Gibt die Version von Solidity unter Verwendung der semantischen Versionierung an.
// Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definiert einen Vertrag namens `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand). Sobald er bereitgestellt ist, befindet sich ein Vertrag an einer bestimmten Adresse auf der Ethereum-Blockchain. Erfahre mehr: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Wird emittiert, wenn die update-Funktion aufgerufen wird
   // Smart-Contract-Events sind eine Möglichkeit für deinen Vertrag, dem Frontend deiner App mitzuteilen, dass etwas auf der Blockchain passiert ist. Das Frontend kann auf bestimmte Events 'hören' und Maßnahmen ergreifen, wenn sie eintreten.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklariert eine Zustandsvariable `message` vom Typ `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden. Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
   string public message;

   // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor eine spezielle Funktion, die nur bei der Vertragserstellung ausgeführt wird.
   // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren. Erfahre mehr:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Smart Contract-Ereignisse sind eine Möglichkeit für Ihren Vertrag, Ihrer Frontend-Anwendung mitzuteilen, dass etwas auf der Blockchain passiert ist (d. h. es gab ein _Ereignis_). Die Anwendung kann auf bestimmte Ereignisse „hören“ und Maßnahmen ergreifen, wenn sie eintreten.

Die Funktion `addSmartContractListener` wird speziell auf das Ereignis `UpdatedMessages` unseres Hello World Smart Contracts hören und unsere Benutzeroberfläche aktualisieren, um die neue Nachricht anzuzeigen.

Ändern Sie `addSmartContractListener` wie folgt:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Lassen Sie uns aufschlüsseln, was passiert, wenn der Listener ein Ereignis erkennt:

- Wenn bei der Ausgabe des Ereignisses ein Fehler auftritt, wird dies in der Benutzeroberfläche über unsere Zustandsvariable `status` widergespiegelt.
- Andernfalls verwenden wir das zurückgegebene `data`-Objekt. `data.returnValues` ist ein bei null indiziertes Array, bei dem das erste Element im Array die vorherige Nachricht und das zweite Element die aktualisierte Nachricht speichert. Insgesamt setzen wir bei einem erfolgreichen Ereignis unseren String `message` auf die aktualisierte Nachricht, leeren den String `newMessage` und aktualisieren unsere Zustandsvariable `status`, um widerzuspiegeln, dass eine neue Nachricht in unserem Smart Contract veröffentlicht wurde.

Lassen Sie uns abschließend unseren Listener in unserer Funktion `useEffect` aufrufen, damit er beim ersten Rendern der Komponente `HelloWorld.js` initialisiert wird. Insgesamt sollte Ihre Funktion `useEffect` so aussehen:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Da wir nun aus unserem Smart Contract lesen können, wäre es großartig herauszufinden, wie wir auch in ihn schreiben können! Um jedoch in unsere Dapp zu schreiben, muss zunächst ein Ethereum-Wallet damit verbunden sein.

Als Nächstes werden wir also die Einrichtung unseres Ethereum-Wallets (MetaMask) in Angriff nehmen und es dann mit unserer Dapp verbinden!

### Schritt 4: Einrichten Ihres Ethereum-Wallets {#step-4-set-up-your-ethereum-wallet}

Um etwas in die Ethereum-Chain zu schreiben, müssen Benutzer Transaktionen mit den Private-Keys ihres virtuellen Wallets signieren. Für dieses Tutorial verwenden wir [MetaMask](https://metamask.io/), ein virtuelles Wallet im Browser, das zur Verwaltung Ihrer Ethereum-Kontoadresse verwendet wird, da es das Signieren von Transaktionen für den Endbenutzer extrem einfach macht.

Wenn Sie mehr darüber erfahren möchten, wie Transaktionen auf Ethereum funktionieren, sehen Sie sich [diese Seite](/developers/docs/transactions/) der Ethereum Foundation an.

#### MetaMask herunterladen {#download-metamask}

Sie können [hier](https://metamask.io/download) kostenlos ein MetaMask-Konto herunterladen und erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie oben rechts zum „Goerli Test Network“ wechseln (damit wir nicht mit echtem Geld hantieren).

#### Ether von einem Faucet hinzufügen {#add-ether-from-a-faucet}

Um eine Transaktion auf der Ethereum-Blockchain zu signieren, benötigen wir etwas Fake-ETH. Um ETH zu erhalten, können Sie zu [FaucETH](https://fauceth.komputing.org) gehen und Ihre Goerli-Kontoadresse eingeben, auf „Request funds“ klicken, dann im Dropdown-Menü „Ethereum Testnet Goerli“ auswählen und schließlich erneut auf die Schaltfläche „Request funds“ klicken. Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen!

#### Überprüfen Sie Ihr Guthaben {#check-your-balance}

Um sicherzustellen, dass unser Guthaben vorhanden ist, führen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) durch. Dies gibt die Menge an ETH in unserem Wallet zurück. Nachdem Sie Ihre MetaMask-Kontoadresse eingegeben und auf „Send Request“ geklickt haben, sollten Sie eine Antwort wie diese sehen:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**HINWEIS:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als kleinste Stückelung von Ether verwendet. Die Umrechnung von Wei in ETH lautet: 1 ETH = 10¹⁸ Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl umwandeln, erhalten wir 1\*10¹⁸, was 1 ETH entspricht.

Puh! Unser Fake-Geld ist komplett da! 🤑

### Schritt 5: Verbinden Sie MetaMask mit Ihrer Benutzeroberfläche {#step-5-connect-metamask-to-your-UI}

Da unser MetaMask-Wallet nun eingerichtet ist, verbinden wir unsere Dapp damit!

#### Die Funktion `connectWallet` {#the-connectWallet-function}

Lassen Sie uns in unserer Datei `interact.js` die Funktion `connectWallet` implementieren, die wir dann in unserer Komponente `HelloWorld.js` aufrufen können.

Ändern wir `connectWallet` wie folgt:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Was genau macht dieser riesige Codeblock also?

Nun, zuerst wird geprüft, ob `window.ethereum` in Ihrem Browser aktiviert ist.

`window.ethereum` ist eine globale API, die von MetaMask und anderen Wallet-Anbietern injiziert wird und es Websites ermöglicht, die Ethereum-Konten der Benutzer anzufordern. Wenn dies genehmigt wird, kann sie Daten aus den Blockchains lesen, mit denen der Benutzer verbunden ist, und vorschlagen, dass der Benutzer Nachrichten und Transaktionen signiert. Weitere Informationen finden Sie in der [MetaMask-Dokumentation](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Wenn `window.ethereum` _nicht_ vorhanden ist, bedeutet das, dass MetaMask nicht installiert ist. Dies führt dazu, dass ein JSON-Objekt zurückgegeben wird, bei dem die zurückgegebene `address` ein leerer String ist und das JSX-Objekt `status` meldet, dass der Benutzer MetaMask installieren muss.

Wenn `window.ethereum` _vorhanden_ ist, wird es interessant.

Mithilfe einer try/catch-Schleife versuchen wir, eine Verbindung zu MetaMask herzustellen, indem wir [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) aufrufen. Der Aufruf dieser Funktion öffnet MetaMask im Browser, wobei der Benutzer aufgefordert wird, sein Wallet mit Ihrer Dapp zu verbinden.

- Wenn der Benutzer sich für eine Verbindung entscheidet, gibt `method: "eth_requestAccounts"` ein Array zurück, das alle Kontoadressen des Benutzers enthält, die mit der Dapp verbunden sind. Insgesamt gibt unsere Funktion `connectWallet` ein JSON-Objekt zurück, das die _erste_ `address` in diesem Array (siehe Zeile 9) und eine `status`-Nachricht enthält, die den Benutzer auffordert, eine Nachricht in den Smart Contract zu schreiben.
- Wenn der Benutzer die Verbindung ablehnt, enthält das JSON-Objekt einen leeren String für die zurückgegebene `address` und eine `status`-Nachricht, die widerspiegelt, dass der Benutzer die Verbindung abgelehnt hat.

Nachdem wir nun diese Funktion `connectWallet` geschrieben haben, besteht der nächste Schritt darin, sie in unserer Komponente `HelloWorld.js` aufzurufen.

#### Fügen Sie die Funktion `connectWallet` zu Ihrer UI-Komponente `HelloWorld.js` hinzu {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Navigieren Sie zur Funktion `connectWalletPressed` in `HelloWorld.js` und aktualisieren Sie sie wie folgt:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Fällt Ihnen auf, wie der Großteil unserer Funktionalität aus der Datei `interact.js` von unserer Komponente `HelloWorld.js` abstrahiert wird? Dies geschieht, damit wir das M-V-C-Paradigma einhalten!

In `connectWalletPressed` führen wir einfach einen await-Aufruf an unsere importierte Funktion `connectWallet` durch und aktualisieren anhand ihrer Antwort unsere Variablen `status` und `walletAddress` über ihre State-Hooks.

Speichern wir nun beide Dateien (`HelloWorld.js` und `interact.js`) und testen unsere bisherige Benutzeroberfläche.

Öffnen Sie Ihren Browser auf der Seite [http://localhost:3000/](http://localhost:3000/) und klicken Sie oben rechts auf der Seite auf die Schaltfläche „Connect Wallet“.

Wenn Sie MetaMask installiert haben, sollten Sie aufgefordert werden, Ihr Wallet mit Ihrer Dapp zu verbinden. Akzeptieren Sie die Einladung zur Verbindung.

Sie sollten sehen, dass die Wallet-Schaltfläche nun anzeigt, dass Ihre Adresse verbunden ist! Jaaaaaa 🔥

Versuchen Sie als Nächstes, die Seite zu aktualisieren... das ist seltsam. Unsere Wallet-Schaltfläche fordert uns auf, MetaMask zu verbinden, obwohl es bereits verbunden ist...

Aber keine Angst! Wir können das leicht beheben, indem wir `getCurrentWalletConnected` implementieren, was prüft, ob bereits eine Adresse mit unserer Dapp verbunden ist, und unsere Benutzeroberfläche entsprechend aktualisiert!

#### Die Funktion `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Aktualisieren Sie Ihre Funktion `getCurrentWalletConnected` in der Datei `interact.js` wie folgt:

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Dieser Code ist der Funktion `connectWallet`, die wir gerade im vorherigen Schritt geschrieben haben, _sehr_ ähnlich.

Der Hauptunterschied besteht darin, dass wir hier nicht die Methode `eth_requestAccounts` aufrufen, die MetaMask öffnet, damit der Benutzer sein Wallet verbinden kann, sondern die Methode `eth_accounts`, die einfach ein Array mit den MetaMask-Adressen zurückgibt, die derzeit mit unserer Dapp verbunden sind.

Um diese Funktion in Aktion zu sehen, rufen wir sie in unserer Funktion `useEffect` unserer Komponente `HelloWorld.js` auf:

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

Beachten Sie, dass wir die Antwort unseres Aufrufs an `getCurrentWalletConnected` verwenden, um unsere Zustandsvariablen `walletAddress` und `status` zu aktualisieren.

Nachdem Sie diesen Code hinzugefügt haben, versuchen wir, unser Browserfenster zu aktualisieren.

Schöööön! Die Schaltfläche sollte anzeigen, dass Sie verbunden sind, und eine Vorschau der Adresse Ihres verbundenen Wallets anzeigen – selbst nach dem Aktualisieren!

#### Implementierung von `addWalletListener` {#implement-addwalletlistener}

Der letzte Schritt bei der Einrichtung unseres Dapp-Wallets ist die Implementierung des Wallet-Listeners, damit unsere Benutzeroberfläche aktualisiert wird, wenn sich der Status unseres Wallets ändert, z. B. wenn der Benutzer die Verbindung trennt oder das Konto wechselt.

Ändern Sie in Ihrer Datei `HelloWorld.js` Ihre Funktion `addWalletListener` wie folgt:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Ich wette, Sie brauchen an diesem Punkt nicht einmal unsere Hilfe, um zu verstehen, was hier vor sich geht, aber der Vollständigkeit halber wollen wir es kurz aufschlüsseln:

- Zuerst prüft unsere Funktion, ob `window.ethereum` aktiviert ist (d. h. MetaMask ist installiert).
  - Wenn nicht, setzen wir unsere Zustandsvariable `status` einfach auf einen JSX-String, der den Benutzer auffordert, MetaMask zu installieren.
  - Wenn es aktiviert ist, richten wir in Zeile 3 den Listener `window.ethereum.on("accountsChanged")` ein, der auf Statusänderungen im MetaMask-Wallet achtet, z. B. wenn der Benutzer ein zusätzliches Konto mit der Dapp verbindet, Konten wechselt oder ein Konto trennt. Wenn mindestens ein Konto verbunden ist, wird die Zustandsvariable `walletAddress` als erstes Konto im vom Listener zurückgegebenen Array `accounts` aktualisiert. Andernfalls wird `walletAddress` als leerer String festgelegt.

Zu guter Letzt müssen wir sie in unserer Funktion `useEffect` aufrufen:

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

Und das war's! Wir haben die Programmierung unserer gesamten Wallet-Funktionalität erfolgreich abgeschlossen! Nun zu unserer letzten Aufgabe: Aktualisierung der in unserem Smart Contract gespeicherten Nachricht!

### Schritt 6: Implementierung der Funktion `updateMessage` {#step-6-implement-the-updateMessage-function}

Alles klar Leute, wir sind auf der Zielgeraden angekommen! In der `updateMessage` Ihrer Datei `interact.js` werden wir Folgendes tun:

1. Sicherstellen, dass die Nachricht, die wir in unserem Smart Contract veröffentlichen möchten, gültig ist
2. Unsere Transaktion mit MetaMask signieren
3. Diese Funktion von unserer Frontend-Komponente `HelloWorld.js` aufrufen

Das wird nicht lange dauern; lassen Sie uns diese Dapp fertigstellen!

#### Eingabefehlerbehandlung {#input-error-handling}

Natürlich ist es sinnvoll, zu Beginn der Funktion eine Art Eingabefehlerbehandlung zu haben.

Wir möchten, dass unsere Funktion vorzeitig zurückkehrt, wenn keine MetaMask-Erweiterung installiert ist, kein Wallet verbunden ist (d. h. die übergebene `address` ist ein leerer String) oder die `message` ein leerer String ist. Fügen wir `updateMessage` die folgende Fehlerbehandlung hinzu:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Da nun eine ordnungsgemäße Eingabefehlerbehandlung vorhanden ist, ist es an der Zeit, die Transaktion über MetaMask zu signieren!

#### Signieren unserer Transaktion {#signing-our-transaction}

Wenn Sie bereits mit traditionellen Web3-Ethereum-Transaktionen vertraut sind, wird Ihnen der Code, den wir als Nächstes schreiben, sehr bekannt vorkommen. Fügen Sie unter Ihrem Code zur Eingabefehlerbehandlung Folgendes zu `updateMessage` hinzu:

```javascript
// interact.js

// Transaktionsparameter einrichten
const transactionParameters = {
  to: contractAddress, // Erforderlich, außer bei Vertragsveröffentlichungen.
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Lassen Sie uns aufschlüsseln, was passiert. Zuerst richten wir unsere Transaktionsparameter ein, wobei:

- `to` die Empfängeradresse (unseren Smart Contract) angibt
- `from` den Unterzeichner der Transaktion angibt, die Variable `address`, die wir an unsere Funktion übergeben haben
- `data` den Aufruf der Methode `update` unseres Hello World Smart Contracts enthält und unsere String-Variable `message` als Eingabe erhält

Dann führen wir einen await-Aufruf durch, `window.ethereum.request`, bei dem wir MetaMask bitten, die Transaktion zu signieren. Beachten Sie, dass wir in den Zeilen 11 und 12 unsere eth-Methode `eth_sendTransaction` angeben und unsere `transactionParameters` übergeben.

An diesem Punkt öffnet sich MetaMask im Browser und fordert den Benutzer auf, die Transaktion zu signieren oder abzulehnen.

- Wenn die Transaktion erfolgreich ist, gibt die Funktion ein JSON-Objekt zurück, bei dem der JSX-String `status` den Benutzer auffordert, Etherscan für weitere Informationen zu seiner Transaktion zu besuchen.
- Wenn die Transaktion fehlschlägt, gibt die Funktion ein JSON-Objekt zurück, bei dem der String `status` die Fehlermeldung weiterleitet.

Insgesamt sollte unsere Funktion `updateMessage` so aussehen:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // Eingabefehlerbehandlung
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  // Transaktionsparameter einrichten
  const transactionParameters = {
    to: contractAddress, // Erforderlich, außer bei Vertragsveröffentlichungen.
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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

Zu guter Letzt müssen wir unsere Funktion `updateMessage` mit unserer Komponente `HelloWorld.js` verbinden.

#### Verbinden Sie `updateMessage` mit dem Frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Unsere Funktion `onUpdatePressed` sollte einen await-Aufruf an die importierte Funktion `updateMessage` durchführen und die Zustandsvariable `status` ändern, um widerzuspiegeln, ob unsere Transaktion erfolgreich war oder fehlgeschlagen ist:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Es ist super sauber und einfach. Und raten Sie mal... IHRE DAPP IST FERTIG!!!

Probieren Sie die Schaltfläche **Update** aus!

### Erstellen Sie Ihre eigene benutzerdefinierte Dapp {#make-your-own-custom-dapp}

Wuhuuu, Sie haben es bis zum Ende des Tutorials geschafft! Zusammenfassend haben Sie gelernt, wie man:

- Ein MetaMask-Wallet mit Ihrem Dapp-Projekt verbindet
- Daten aus Ihrem Smart Contract mithilfe der [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)-API liest
- Ethereum-Transaktionen mit MetaMask signiert

Jetzt sind Sie bestens gerüstet, um die Fähigkeiten aus diesem Tutorial anzuwenden und Ihr eigenes benutzerdefiniertes Dapp-Projekt zu erstellen! Wie immer gilt: Wenn Sie Fragen haben, zögern Sie nicht, uns im [Alchemy Discord](https://discord.gg/gWuC7zB) um Hilfe zu bitten. 🧙‍♂️

Sobald Sie dieses Tutorial abgeschlossen haben, lassen Sie uns wissen, wie Ihre Erfahrung war oder ob Sie Feedback haben, indem Sie uns auf Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform) markieren!