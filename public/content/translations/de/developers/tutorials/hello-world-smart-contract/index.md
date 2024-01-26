---
title: Hello World-Smart Contract für Einsteiger
description: Einführungstutorial zum Schreiben und Installieren eines einfachen Smart Contracts auf Ethereum
author: "elanh"
tags:
  - "Solidity"
  - "Hardhat"
  - "Alchemy"
  - "Smart Contracts"
  - "Erste Schritte"
  - "Bereitstellung"
skill: beginner
lang: de
published: 2021-03-31
---

Wenn Sie neu in der Blockchain-Entwicklung sind und nicht wissen, wo Sie anfangen sollen, oder wenn Sie einfach nur verstehen wollen, wie man Smart Contracts einsetzt und mit ihnen interagiert, ist dieser Leitfaden genau das Richtige für Sie. Wir werden die Erstellung und den Einsatz eines einfachen Smart Contracts auf dem Ropsten-Testnet unter Verwendung einer virtuellen Wallet erläutern ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) and [Alchemy](https://alchemyapi.io/eth) (Machen Sie sich keine Sorgen, wenn Sie noch nicht verstehen, was das alles bedeutet. Wir werden es Ihnen erklären).

Im zweiten Teil dieses Tutorials werden wir erläutern, wie wir mit unserem Smart Contract interagieren können, sobald er bereitgestellt wurde. Im dritten Teil erläutern wir dann, wie er auf Etherscan veröffentlicht wird.

Wenn Sie zu irgendeinem Zeitpunkt Fragen haben, dann können Sie sich im [Alchemy Discord](https://discord.gg/gWuC7zB) melden.

## Schritt 1: Verbindung mit dem Ethereum-Netzwerk {#step-1}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Chain zu stellen. Der Einfachheit halber verwenden wir ein kostenloses Konto bei Alchemy, eine Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne dass wir unseren eigenen Node betreiben müssen. Die Plattform verfügt auch über Entwickler-Tools für die Überwachung und Analyse, die wir in diesem Tutorial nutzen werden, um zu verstehen, was unter der Haube der Smart-Contract-Bereitstellung vor sich geht. Wenn Sie noch kein Alchemy-Konto haben, [können Sie sich hier kostenlos anmelden](https://dashboard.alchemyapi.io/signup).

## Schritt 2: Anwendung (und den API-Schlüssel) erstellen {#step-2}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren. Erstellen Sie dafür eine App. Darüber können wir Anfragen an das Ropsten-Testnet stellen. Wenn Sie mit Testnets nicht vertraut sind, lesen Sie [diese Seite](/developers/docs/networks/).

1.  Klicken Sie in Ihrem Alchemy-Dashboard in der Navigationsleiste unter "Apps" auf "Create App" (App erstellen), um auf die Seite "Create App" (App erstellen) zu gelangen.

![Hello World-App erstellen](./hello-world-create-app.png)

2. Nennen Sie Ihre App "Hello World", geben Sie eine kurze Beschreibung an, wählen Sie "Staging" für die Umgebung (die für die Buchhaltung Ihrer App verwendet wird) und wählen Sie "Ropsten" als Netzwerk.

![Hello World-App-Ansicht erstellen](./create-app-view-hello-world.png)

3. Klicken Sie auf “Create app” (App erstellen) und schon sind Sie fertig. Die App sollte in der untenstehenden Tabelle erscheinen.

## Schritt 3: Ethereum-Konto (Adresse) erstellen {#step-3}

Wir benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. In diesem Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, mit der Sie Ihre Ethereum-Kontoadresse verwalten können. Weitere Informationen zu [Transaktionen](/developers/docs/transactions/).

Sie können MetaMask [hier](https://metamask.io/download.html) kostenlos herunterladen und ein Konto erstellen. Wenn Sie ein Konto erstellen oder wenn Sie bereits ein Konto haben, stellen Sie sicher, dass Sie oben rechts zum "Ropsten-Testnet" wechseln (damit wir nicht mit echtem Geld arbeiten).

![Beispiel MetaMask Ropsten](./metamask-ropsten-example.png)

## Schritt 4: Ether von einem Faucet hinzufügen {#step-4}

Um unseren Smart Contract im Testnet einzusetzen, benötigen wir einige Fake-ETH. Um ETH zu erhalten, können Sie auf den [Ropsten Faucet](https://faucet.dimensions.network/) gehen und Ihre Ropsten-Kontoadresse eingeben. Klicken Sie dann auf "Ropsten-ETH senden". Aufgrund des Netzwerkverkehrs kann es einige Zeit dauern, bis Sie Ihre Fake-ETH erhalten. Sie sollten kurz darauf ETH auf Ihrem MetaMask-Konto sehen.

## Schritt 5: Guthaben prüfen {#step-5}

Um unser Guthaben zu überprüfen, müssen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [dem Composer-Tool von Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) stellen. Dadurch wird der Betrag der ETH in unsere Wallet zurückgegeben. Nachdem Sie die Adresse Ihres MetaMask-Kontos eingegeben und auf "Anfrage senden" geklickt haben, sollten Sie eine Antwort wie diese erhalten:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **HINWEIS:** Dieses Ergebnis ist in Wei und nicht in ETH. Wei ist die kleinste Einheit von Ether. Die Umrechnung von Wei auf ETH ist: 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0x2B5E3AF16B1880000 in eine Dezimalzahl konvertieren, bekommen wir 5\*10¹⁸. Das entspricht 5 ETH.
>
> Puh! Unser Falschgeld ist da <Emoji text=":money_mouth_face:" size={1} />.

## Schritt 6: Projekt initialisieren {#step-6}

Zunächst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zur Befehlszeile und geben Sie Folgendes ein:

```
mkdir hello-world
cd hello-world
```

Wir befinden uns nun in unserem Projektordner. Mit `npm init` starten wir das Projekt. Wenn Sie npm noch nicht installiert haben, befolgen Sie [diese Anleitung](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (wir brauchen auch Node.js, also laden Sie das auch herunter).

```
npm init
```

Es spielt keine Rolle, wie Sie die Fragen zur Installation beantworten. Wir haben es folgendermaßen gemacht:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Genehmigen Sie die package.json und es kann losgehen.

## Schritt 7: [Hardhat](https://hardhat.org/getting-started/#overview){#step-7} installieren

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern bei der lokalen Erstellung von Smart Contracts und dApps, bevor diese auf der Live-Chain bereitgestellt werden.

Führen Sie innerhalb unseres `hello-world`-Projekts folgenden Befehl aus:

```
npm install --save-dev hardhat
```

Auf dieser Seite finden Sie weitere Informationen zur [Installationsanleitung](https://hardhat.org/getting-started/#overview).

## Schritt 8: Hardhat-Projekt erstellen {#step-8}

Führen Sie in unserem Projektordner folgenden Befehl aus:

```
npx hardhat
```

Sie sollten eine Willkommensnachricht sehen und die Möglichkeit haben, auszuwählen, was Sie tun möchten. Wählen Sie "create an empty hardhat.config.js" (Eine leere hardhat.config.js erstellen):

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

Was möchten Sie tun? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Darüber wird eine `hardhat.config.js`-Datei für uns erstellt, in der wir alle Einstellungen für unser Projekt angeben werden (in Schritt 13).

## Schritt 9: Projektordner hinzufügen {#step-9}

Um unser Projekt zu organisieren, erstellen wir zwei neue Ordner. Navigieren Sie in Ihrer Befehlszeile zum Stammverzeichnis Ihres Projekts und geben Sie Folgendes ein:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ist der Ort, an dem wir unseren hello world-Smart-Contract-Code ablegen
- `scripts/` ist der Ort, an dem wir Skripte zum Einsatz und zur Interaktion mit unserem Vertrag aufbewahren

## Schritt 10: Vertrag schreiben {#step-10}

Sie fragen sich vielleicht, wann fangen wir endlich an, den Code zu schreiben? Jetzt! In Schritt 10.

Öffnen Sie das hello-world-Projekt in Ihrem bevorzugten Editor (wir bevorzugen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben, die wir verwenden werden, um unseren Smart Contract namens HelloWorld.sol zu schreiben.

1.  Navigieren Sie zum Ordner "contracts" (Verträge) und erstellen Sie eine neue Datei namens HelloWorld.sol.
2.  Im Folgenden finden Sie ein Beispiel für einen Hello World-Smart Contract der Ethereum Foundation, den wir für dieses Tutorial verwenden. Kopieren Sie den folgenden Inhalt und fügen Sie ihn in Ihre Datei HelloWorld.sol ein. Lesen Sie die Kommentare, um zu verstehen, was dieser Vertrag bewirkt:

```solidity
// Bestimmt die Version von Solidity mit semantischer Versionierung.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// Ein Smart contract ist eine Sammlung von Funktionen und Daten (sein Zustand). Einmal in die Blockchain integriert, befindet sich ein Contract an einer bestimmten Adresse der Ethereum-Blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Vertragsspeicher hinterlegt werden. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

    // Ähnlich wie viele Klassen-basierte objektorientierte Sprachen, ist ein Konstruktor
    // eine spezielle Funktion, die nur bei der Vertragserstellung ausgeführt wird.
   // Konstruktoren werden verwendet, um die Vertragsdaten zu initialisieren. Erfahre mehr: https://solidity.readthedocs.io/de/v0.5.10/contracts. tml#constructors
    constructor(string memory initMessage) public {
        // Akzeptiert ein String Argument `initMessage` und setzt den Wert
        // in die `message` Speichervariable des Contracts).
      message = initMessage;
    }

    // Eine öffentliche Funktion, die ein String-Argument akzeptiert
    // und die Speichervariable `message` aktualisiert.
   function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

Das ist ein sehr einfacher Smart Contract, der eine Nachricht bei Erstellung speichert und durch den Aufruf der `update`-Funktion aktualisiert werden kann.

## Schritt 11: MetaMask und Alchemy mit Ihrem Projekt verbinden {#step-11}

Wir haben eine MetaMask-Wallet und ein Alchemy-Konto erstellt und unseren Smart Contract geschrieben. Jetzt ist es an der Zeit, die drei zu verbinden.

Jede Transaktion, die von Ihrer virtuellen Wallet gesendet wird, erfordert eine Unterschrift mit Ihrem einzigartigen privaten Schlüssel. Um unser Programm mit dieser Berechtigung auszustatten, können wir unseren privaten Schlüssel (und den Alchemy-API-Schlüssel) sicher in einer Umgebungsdatei speichern.

> Weitere Informationen zum Senden von Transaktionen finden Sie in [diesem Tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) zum Senden von Transaktionen mit web3.

Installieren Sie zunächst das dotenv-Paket in Ihrem Projektverzeichnis:

```
npm install dotenv --save
```

Erstellen Sie dann eine `.env`-Datei im Hauptverzeichnis unseres Projekts und fügen Sie Ihren privaten MetaMask-Schlüssel und die HTTP-API-URL von Alchemy hinzu.

- Befolgen Sie [diese Anweisungen](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um Ihren privaten Schlüssel zu exportieren.
- Unten sehen Sie, wie Sie die HTTP-Alchemy API-URL erhalten.

![Alchemy-API-Schlüssel erhalten](./get-alchemy-api-key.gif)

Alchemy-API-URL kopieren

Unser `.env` sollte dann so aussehen:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Um diese mit unserem Code zu verbinden, werden wir diese Variablen in unserer `hardhat.config.js`-Datei in Schritt 13 referenzieren.

<InfoBanner isWarning>
Führen Sie keinen Commit für <code>.env</code> aus. Stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals an andere weitergeben, denn damit würden Sie Ihre geheimen Daten weitergeben. Wenn Sie die Versionskontrolle verwenden, fügen Sie Ihre <code>Env-Datei</code> zu einer Datei <a href="https://git-scm.com/docs/gitignore">gitignore</a> hinzu.
</InfoBanner>

## Schritt 12: Ethers.js installieren {#step-12-install-ethersjs}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen. Dafür schließt sie [Standard-JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) in benutzerfreundlichere Methoden ein.

Hardhat macht es sehr einfach [Plug-ins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionen zu integrieren. Wir werden das [Ethers-Plug-in](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) für die Bereitstellung von Verträgen nutzen ([Ethers.js](https://github.com/ethers-io/ethers.js/) bietet einige sehr saubere Methoden zur Bereitstellung von Verträgen).

Geben Sie Folgendes in Ihrem Projektverzeichnis ein:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Im nächsten Schritt benötigen wir auch Ether in unserer `hardhat.config.js`.

## Schritt 13: hardhat.config.js aktualisieren {#step-13-update-hardhatconfigjs}

Wir haben bisher mehrere Abhängigkeiten und Plug-ins hinzugefügt. Jetzt müssen wir `hardhat.config.js` aktualisieren, damit unser Projekt über alle diese Abhängigkeiten informiert wird.

Aktualisieren Sie Ihre `hardhat.config.js` so, dass sie wie folgt aussieht:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Schritt 14: Vertragszusammenstellung {#step-14-compile-our-contracts}

Um sicherzugehen, dass so weit alles funktioniert, sollten wir unseren Vertrag erstellen. Die Aufgabe `compile` ist eine der integrierten Hardhat-Aufgaben.

Führen Sie folgenden Befehl in der Befehlszeile aus:

```
npx hardhat compile
```

Möglicherweise erhalten Sie eine Warnung über `SPDX license identifier not provided in source file` (SPDX-Lizenzkennung nicht in Quelldatei angegeben), aber darüber brauchen Sie sich keine Sorgen zu machen. Alles andere sieht hoffentlich gut aus. Falls nicht, können Sie jederzeit eine Nachricht im [Alchemy Discord](https://discord.gg/u72VCg3) hinterlassen.

## Schritt 15: Bereitstellungsskript schreiben {#step-15-write-our-deploy-scripts}

Nun, da unser Vertrag geschrieben und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, das Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`. Fügen Sie folgende Inhalte hinzu:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat erklärt in seinem [Vertragstutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) sehr gut, was die einzelnen Codezeilen bewirken. Wir haben diese Erklärungen hier übernommen.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Eine `ContractFactory` in ethers.js ist eine Abstraktion, die dazu dient, neue Smart Contracts einzusetzen. So ist `HelloWorld` eine Factory for Instances von unseren hello world-Vertrag. Wenn Sie das `hardhat-ethers`-Plug-in verwenden, werden die Instanzen `ContractFactory` und `Contract` standardmäßig mit dem ersten Unterzeichner verbunden.

```
const hello_world = await HelloWorld.deploy();
```

Der Aufruf eines `deploy()` im `ContractFactory` startet die Bereitstellung und gibt einen `Promise` zurück, was zum `Contract` führt. Das ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen enthält.

## Schritt 16: Vertragsbereitstellung {#step-16-deploy-our-contract}

Nun sind wir endlich bereit, unseren Smart Contract bereitzustellen. Navigieren Sie zur Befehlszeile und führen Sie folgenden Befehl aus:

```
npx hardhat run scripts/deploy.js --network ropsten
```

Sie sollten dann etwas sehen wie:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Wenn wir den [Ropsten etherscan](https://ropsten.etherscan.io/) aufrufen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Das Ergebnis sollte etwa wie folgt aussehen:

![Etherscan-Vertrag](./etherscan-contract.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und für die To-Adresse wird “Contract Creation” (Vertragserstellung) angezeigt. Doch wenn Sie die Transaktion aufrufen, erkennen Sie unsere Vertragsadresse im `To`-Feld:

![Etherscan-Transaktion](./etherscan-transaction.png)

Herzlichen Glückwunsch! Sie haben gerade einen Smart Contract in der Ethereum.Chain hinzugefügt 🎉.

Um zu verstehen, was im Verborgenen vor sich geht, navigieren wir zur Explorer-Registerkarte in unserem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/explorer). Wenn Sie mehrere Alchemy-Anwendungen haben, stellen Sie sicher, dass Sie nach Anwendungen filtern und "Hello World" auswählen. ![Hello World-Explorer](./hello-world-explorer.png)

Hier sehen Sie eine Handvoll JSON-RPC-Befehle, die Hardhat/Ethers implementiert hat, als wir die `.deploy()`-Funktion aufgerufen haben. Zwei wichtige Befehle, die wir hier vorstellen möchten, sind [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), das ist die Aufforderung unseren Vertrag in die Ropsten-Chain zu schreiben, und [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), was eine Anfrage ist, Informationen über unsere Transaktion anhand des Hashs zu lesen (ein typisches Muster bei Transaktionen). Wenn Sie mehr über das Senden von Transaktionen erfahren möchten, lesen Sie dieses Tutorial über das [Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Damit sind wir am Ende des ersten Teils von diesem Tutorial. Im zweiten Teil werden wir [mit unserem Smart Contract interagieren](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract). Dafür aktualisieren wir unsere anfängliche Nachricht. Im dritten Teil werden wir [unseren Smart Contract auf Etherscan veröffentlichen](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan), damit jeder weiß, wie man mit ihm interagiert.

**Möchten Sie mehr über Alchemy erfahren? Besuchen Sie unsere [Website](https://alchemyapi.io/eth). Sie möchten kein Update verpassen? Dann abonnieren Sie [hier](https://www.alchemyapi.io/newsletter) unseren Newsletter. Folgen Sie uns auf [Twitter](https://twitter.com/alchemyplatform) und treten Sie unserer Community in [Discord](https://discord.com/invite/u72VCg3)** bei.
