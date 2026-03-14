---
title: "Hello World-Smart Contract für Einsteiger"
description: "Einführungstutorial zum Schreiben und Bereitstellen eines einfachen Smart Contracts auf Ethereum."
author: "elanh"
tags:
  [
    "solidity",
    "Hardhat",
    "Alchemy",
    "intelligente Verträge",
    "Bereitstellung"
  ]
skill: beginner
lang: de
published: 2021-03-31
---

Wenn Sie neu in der Blockchain-Entwicklung sind und nicht wissen, wo Sie anfangen sollen, oder wenn Sie einfach nur verstehen wollen, wie man Smart Contracts einsetzt und mit ihnen interagiert, ist dieser Leitfaden genau das Richtige für Sie. Wir werden die Erstellung und Bereitstellung eines einfachen Smart Contracts im Sepolia-Testnetz durchgehen. Dabei verwenden wir eine virtuelle Wallet ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) und [Alchemy](https://www.alchemy.com/eth) (keine Sorge, falls Sie noch nicht verstehen, was das alles bedeutet – wir werden es erklären).

In [Teil 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) dieses Tutorials gehen wir durch, wie wir mit unserem Smart Contract interagieren können, sobald er bereitgestellt wurde. In [Teil 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) behandeln wir dann, wie man ihn auf Etherscan veröffentlicht.

Wenn Sie zu irgendeinem Zeitpunkt Fragen haben, können Sie sich gerne im [Alchemy Discord](https://discord.gg/gWuC7zB) melden!

## Schritt 1: Mit dem Ethereum-Netzwerk verbinden {#step-1}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Chain zu stellen. Der Einfachheit halber verwenden wir ein kostenloses Konto bei Alchemy, eine Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne dass wir unsere eigenen Nodes betreiben müssen. Die Plattform verfügt auch über Entwickler-Tools für die Überwachung und Analyse, die wir in diesem Tutorial nutzen werden, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts „unter der Haube“ passiert. Wenn Sie noch kein Alchemy-Konto haben, [können Sie sich hier kostenlos registrieren](https://dashboard.alchemy.com/signup).

## Schritt 2: Ihre App (und den API-Schlüssel) erstellen {#step-2}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren. Erstellen Sie dafür eine App. Dies ermöglicht es uns, Anfragen an das Sepolia-Testnet zu senden. Wenn Sie mit Testnets nicht vertraut sind, sehen Sie sich [diese Seite](/developers/docs/networks/) an.

1. Navigieren Sie in Ihrem Alchemy-Dashboard zur Seite „Create new app“, indem Sie in der Navigationsleiste „Select an app“ auswählen und dann auf „Create new app“ klicken.

![Hallo Welt App erstellen](./hello-world-create-app.png)

2. Geben Sie Ihrer App den Namen „Hello World“, fügen Sie eine kurze Beschreibung hinzu und wählen Sie einen Anwendungsfall aus, z. B. „Infra & Tooling“. Suchen Sie als Nächstes nach „Ethereum“ und wählen Sie das Netzwerk aus.

![App-Ansicht erstellen Hallo Welt](./create-app-view-hello-world.png)

3. Klicken Sie zum Fortfahren auf „Next“, dann auf „Create app“ und das war's schon! Ihre App sollte im Dropdown-Menü der Navigationsleiste erscheinen, und ein API-Schlüssel steht zum Kopieren bereit.

## Schritt 3: Ethereum-Konto (Adresse) erstellen {#step-3}

Zum Versenden und Empfangen von Transaktionen benötigen Sie ein Ethereum-Konto. In diesem Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, mit der Sie Ihre Ethereum-Kontoadresse verwalten können. Mehr zu [Transaktionen](/developers/docs/transactions/).

Sie können MetaMask herunterladen und [hier](https://metamask.io/download) kostenlos ein Ethereum-Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, wechseln Sie über das Netzwerk-Dropdown-Menü unbedingt zum Testnetz „Sepolia“ (damit wir nicht mit echtem Geld arbeiten).

Wenn Sepolia nicht aufgeführt ist, gehen Sie in das Menü, dann auf „Advanced“ und scrollen Sie nach unten, um „Show test networks“ zu aktivieren. Wählen Sie im Netzwerkauswahlmenü die Registerkarte „Custom“, um eine Liste von Testnets zu finden, und wählen Sie „Sepolia“ aus.

![MetaMask Sepolia Beispiel](./metamask-sepolia-example.png)

## Schritt 4: Ether von einem Faucet hinzufügen {#step-4}

Um unseren Smart Contract im Testnetz bereitzustellen, benötigen wir etwas „Fake-ETH“. Um Sepolia-ETH zu erhalten, können Sie zu den [Details des Sepolia-Netzwerks](/developers/docs/networks/#sepolia) gehen, um eine Liste verschiedener Faucets anzuzeigen. Wenn einer nicht funktioniert, versuchen Sie einen anderen, da sie manchmal leer sein können. Aufgrund des Netzwerkverkehrs kann es einige Zeit dauern, bis Sie Ihre Fake-ETH erhalten. Sie sollten kurz darauf ETH auf Ihrem MetaMask-Konto sehen!

## Schritt 5: Ihr Guthaben überprüfen {#step-5}

Um zu überprüfen, ob unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Das gibt den ETH-Betrag in unserem Wallet wieder. Nachdem Sie die Adresse Ihres MetaMask-Kontos eingegeben und auf “Send Request” (Anforderung senden) geklickt haben, sollten Sie eine Antwort ähnlich der Folgenden erhalten:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **HINWEIS:** Dieses Ergebnis ist in Wei und nicht in ETH angegeben. Wei ist die kleinste Einheit von Ether. Die Umrechnung von Wei in ETH lautet: 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0x2B5E3AF16B1880000 in eine Dezimalzahl umwandeln, erhalten wir 5\*10¹⁸, was 5 ETH entspricht.
>
> Puh! Unser Fake-Geld ist da <Emoji text=":money_mouth_face:" size={1} />.

## Schritt 6: Unser Projekt initialisieren {#step-6}

Zunächst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zur Befehlszeile und geben Sie Folgendes ein:

```
mkdir hello-world
cd hello-world
```

Da wir uns nun in unserem Projektordner befinden, verwenden wir `npm init`, um das Projekt zu initialisieren. Wenn Sie npm noch nicht installiert haben, folgen Sie [dieser Anleitung](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (wir benötigen auch Node.js, also laden Sie das auch herunter!).

```
npm init
```

Es spielt keine große Rolle, wie Sie die Installationsfragen beantworten. Zu Ihrer Orientierung zeigen wir Ihnen, wie wir es gemacht haben:

```
Paketname: (hello-world)
Version: (1.0.0)
Beschreibung: hello world smart contract
Einstiegspunkt: (index.js)
Testbefehl:
Git-Repository:
Schlüsselwörter:
Autor:
Lizenz: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Bestätigen Sie die package.json und schon kann es losgehen!

## Schritt 7: [Hardhat](https://hardhat.org/getting-started/#overview) herunterladen {#step-7}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern Smart Contracts und dApps lokal zu erstellen, bevor diese auf der Live-Chain bereitgestellt werden.

Führen Sie in unserem `hello-world`-Projekt Folgendes aus:

```
npm install --save-dev hardhat
```

Weitere Details zu den [Installationsanweisungen](https://hardhat.org/getting-started/#overview) finden Sie auf dieser Seite.

## Schritt 8: Hardhat-Projekt erstellen {#step-8}

Führen Sie folgeden Befehl in unserem Projektordner aus:

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

👷 Willkommen bei Hardhat v2.0.11 👷‍?

Was möchten Sie tun? …
Ein Beispielprojekt erstellen
❯ Eine leere hardhat.config.js erstellen
Beenden
```

Dadurch wird eine `hardhat.config.js`-Datei für uns generiert, in der wir alle Einstellungen für unser Projekt festlegen (in Schritt 13).

## Schritt 9: Projektordner hinzufügen {#step-9}

Um unser Projekt zu organisieren, erstellen wir zwei neue Ordner. Navigieren Sie in der Befehlszeile zum Stammverzeichnis Ihres Projekts und geben Sie Folgendes ein:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ist der Ort, an dem wir unsere `Hello-World-Smart-Contract`-Codedatei aufbewahren.
- `scripts/` ist der Ort, an dem wir Skripte zur Bereitstellung und Interaktion mit unserem Vertrag aufbewahren.

## Schritt 10: Unseren Vertrag schreiben {#step-10}

Sie fragen sich vielleicht, wann wir endlich anfangen, Code zu schreiben? Nun, hier sind wir, in Schritt 10.

Öffnen Sie das hello-world-Projekt in Ihrem bevorzugten Editor (wir mögen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben, die wir verwenden werden, um unseren Smart Contract HelloWorld.sol zu schreiben.‌

1. Navigieren Sie zum Ordner „contracts“ und erstellen Sie eine neue Datei mit dem Namen HelloWorld.sol
2. Unten finden Sie einen Beispiel-Smart-Contract „Hello World“ von der Ethereum Foundation, den wir für dieses Tutorial verwenden werden. Kopieren Sie den folgenden Inhalt und fügen Sie ihn in Ihre Datei HelloWorld.sol ein. Lesen Sie unbedingt die Kommentare, um zu verstehen, was dieser Vertrag bewirkt:

```solidity
// Gibt die Version von Solidity an, unter Verwendung der semantischen Versionierung.
// Erfahren Sie mehr: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definiert einen Vertrag mit dem Namen `HelloWorld`.
// Ein Vertrag ist eine Sammlung von Funktionen und Daten (seinem Zustand). Nach der Bereitstellung befindet sich ein Vertrag an einer bestimmten Adresse in der Ethereum-Blockchain. Erfahren Sie mehr: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Deklariert eine Zustandsvariable `message` vom Typ `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher gespeichert werden. Das Schlüsselwort `public` macht Variablen von außerhalb eines Vertrags zugänglich und erstellt eine Funktion, die andere Verträge oder Clients aufrufen können, um auf den Wert zuzugreifen.
   string public message;

   // Ähnlich wie bei vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor eine spezielle Funktion, die nur bei der Erstellung des Vertrags ausgeführt wird.
   // Konstruktoren werden verwendet, um die Daten des Vertrags zu initialisieren. Erfahren Sie mehr:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akzeptiert ein String-Argument `initMessage` und legt den Wert in der Speichervariable `message` des Vertrags fest).
      message = initMessage;
   }

   // Eine öffentliche Funktion, die ein String-Argument akzeptiert und die Speichervariable `message` aktualisiert.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Dies ist ein sehr einfacher Smart Contract, der beim Erstellen eine Nachricht speichert und durch den Aufruf der `update`-Funktion aktualisiert werden kann.

## Schritt 11: MetaMask und Alchemy mit Ihrem Projekt verbinden {#step-11}

Wir haben eine MetaMask-Wallet und ein Alchemy-Konto erstellt und unseren Smart Contract geschrieben. Jetzt ist es an der Zeit, die drei zu verbinden.

Jede Transaktion, die von Ihrer virtuellen Wallet gesendet wird, benötigt eine Signatur mit ihrem eindeutigen privaten Schlüssel. Um unser Programm mit dieser Berechtigung auszustatten, können wir unseren privaten Schlüssel (und Alchemy-API-Schlüssel) in einer Umgebungsdatei sicher abspeichern.

> Um mehr über das Senden von Transaktionen zu erfahren, sehen Sie sich [dieses Tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) über das Senden von Transaktionen mit web3 an.

Installieren Sie zuerst das dotenv-Paket in Ihrem Projektverzeichnis:

```
npm install dotenv --save
```

Erstellen Sie dann eine `.env`-Datei im Stammverzeichnis unseres Projekts und fügen Sie Ihren privaten MetaMask-Schlüssel und Ihre HTTP-Alchemy-API-URL hinzu.

- Befolgen Sie [diese Anweisungen](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), um Ihren privaten Schlüssel zu exportieren
- Siehe unten, um die HTTP Alchemy API-URL zu erhalten

![Alchemy-API-Schlüssel erhalten](./get-alchemy-api-key.png)

Alchemy-API-URL kopieren

Ihre `.env`-Datei sollte wie folgt aussehen:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, verweisen wir in Schritt 13 in unserer `hardhat.config.js`-Datei auf diese Variablen.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Führen Sie keinen Commit für <code>.env</code> aus! Bitte stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals an Dritte weitergeben oder offenlegen, da Sie dadurch Ihre Geheimnisse preisgeben. Wenn Sie eine Versionskontrolle verwenden, fügen Sie Ihre <code>.env</code>-Datei einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

## Schritt 12: Ethers.js installieren {#step-12-install-ethersjs}

Ethers.js ist eine Bibliothek, die die Interaktion und das Stellen von Anfragen an Ethereum erleichtert, indem sie [standardmäßige JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) in benutzerfreundlichere Methoden verpackt.

Hardhat macht es sehr einfach, [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) für die Vertragsbereitstellung nutzen ([Ethers.js](https://github.com/ethers-io/ethers.js/) verfügt über einige sehr saubere Methoden zur Vertragsbereitstellung).

Geben Sie Folgendes in Ihrem Projektverzeichnis ein:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Im nächsten Schritt werden wir auch Ethers in unserer `hardhat.config.js` benötigen.

## Schritt 13: hardhat.config.js aktualisieren {#step-13-update-hardhatconfigjs}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt. Jetzt müssen wir `hardhat.config.js` aktualisieren, damit unser Projekt alle kennt.

Aktualisieren Sie Ihre `hardhat.config.js`, sodass sie wie folgt aussieht:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Schritt 14: Unseren Vertrag kompilieren {#step-14-compile-our-contracts}

Um sicherzugehen, dass so weit alles funktioniert, sollten wir unseren Vertrag erstellen. Der `compile`-Task ist einer der integrierten Hardhat-Tasks.

Führen Sie folgenden Befehl in der Befehlszeile aus:

```
npx hardhat compile
```

Möglicherweise erhalten Sie eine Warnung `SPDX license identifier not provided in source file`, aber darüber müssen Sie sich keine Sorgen machen – hoffentlich sieht alles andere gut aus! Wenn nicht, können Sie jederzeit eine Nachricht im [Alchemy-Discord](https://discord.gg/u72VCg3) schreiben.

## Schritt 15: Unser Bereitstellungsskript schreiben {#step-15-write-our-deploy-scripts}

Nun, da unser Vertrag geschrieben und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, das Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`, und fügen Sie ihr den folgenden Inhalt hinzu:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Startet die Bereitstellung und gibt ein Promise zurück, das in ein Vertragsobjekt aufgelöst wird
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat erklärt in seinem [Contracts-Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) hervorragend, was jede dieser Codezeilen bewirkt; wir haben die Erklärungen hier übernommen.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Eine `ContractFactory` in ethers.js ist eine Abstraktion, die zur Bereitstellung neuer Smart Contracts verwendet wird. `HelloWorld` ist hier also eine Factory für Instanzen unseres Hello-World-Vertrags. Bei Verwendung des `hardhat-ethers`-Plugins sind die Instanzen `ContractFactory` und `Contract` standardmäßig mit dem ersten Unterzeichner verbunden.

```
const hello_world = await HelloWorld.deploy();
```

Der Aufruf von `deploy()` auf einer `ContractFactory` startet die Bereitstellung und gibt ein `Promise` zurück, das zu einem `Contract` aufgelöst wird. Das ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen enthält.

## Schritt 16: Unseren Vertrag bereitstellen {#step-16-deploy-our-contract}

Nun sind wir endlich bereit, unseren Smart Contract bereitzustellen. Navigieren Sie zur Befehlszeile und führen Sie Folgendes aus:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Sie sollten dann etwas sehen wie:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Wenn wir zu [Sepolia Etherscan](https://sepolia.etherscan.io/) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Die Transaktion wird ungefähr so aussehen:

![Etherscan-Vertrag](./etherscan-contract.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und die `To`-Adresse lautet „Contract Creation“. Wenn wir jedoch auf die Transaktion klicken, sehen wir unsere Vertragsadresse im `To`-Feld:

![Etherscan-Transaktion](./etherscan-transaction.png)

Glückwunsch! Sie haben gerade einen Smart Contract in der Ethereum-Chain bereitgestellt 🎉

Um zu verstehen, was unter der Haube vor sich geht, navigieren wir zum Explorer-Tab in unserem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/explorer). Wenn Sie mehrere Alchemy-Apps haben, stellen Sie sicher, dass Sie nach App filtern und „Hello World“ auswählen.
![Hello-World-Explorer](./hello-world-explorer.png)

Hier sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers für uns „unter der Haube“ gemacht hat, als wir die `.deploy()`-Funktion aufgerufen haben. Zwei wichtige, die hier zu nennen sind, sind [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), also die Anfrage, unseren Vertrag tatsächlich in die Sepolia-Chain zu schreiben, und [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), eine Anfrage zum Lesen von Informationen über unsere Transaktion anhand des Hash (ein typisches Muster bei
Transaktionen). Um mehr über das Senden von Transaktionen zu erfahren, sehen Sie sich dieses Tutorial zum [Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) an.

Das ist alles für Teil 1 dieses Tutorials. In Teil 2 werden wir tatsächlich [mit unserem Smart Contract interagieren](https://www.alchemy.com/docs/interacting-with-a-smart-contract), indem wir unsere ursprüngliche Nachricht aktualisieren, und in Teil 3 werden wir [unseren Smart Contract auf Etherscan veröffentlichen](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), damit jeder weiß, wie man mit ihm interagiert.

**Möchten Sie mehr über Alchemy erfahren? Besuchen Sie unsere [Website](https://www.alchemy.com/eth). Möchten Sie nie ein Update verpassen? Abonnieren Sie unseren Newsletter [hier](https://www.alchemy.com/newsletter)! Treten Sie auch unserem [Discord](https://discord.gg/u72VCg3) bei.**.
