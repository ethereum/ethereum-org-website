---
title: "Hello World Smart Contract für Anfänger"
description: "Einführendes Tutorial zum Schreiben und Bereitstellen eines einfachen Smart Contracts auf Ethereum."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "Smart Contracts", "Bereitstellung"]
skill: beginner
breadcrumb: Hello World Contract
lang: de
published: 2021-03-31
---

Wenn Sie neu in der Blockchain-Entwicklung sind und nicht wissen, wo Sie anfangen sollen, oder wenn Sie einfach nur verstehen möchten, wie man Smart Contracts bereitstellt und mit ihnen interagiert, ist dieser Leitfaden genau das Richtige für Sie. Wir werden die Erstellung und Bereitstellung eines einfachen Smart Contracts im Sepolia-Testnet mithilfe eines virtuellen Wallets [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) und [Alchemy](https://www.alchemy.com/eth) durchgehen (keine Sorge, wenn Sie noch nicht verstehen, was das alles bedeutet, wir werden es erklären).

In [Teil 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) dieses Tutorials werden wir durchgehen, wie wir mit unserem Smart Contract interagieren können, sobald er hier bereitgestellt wurde, und in [Teil 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) werden wir behandeln, wie man ihn auf Etherscan veröffentlicht.

Wenn Sie an irgendeinem Punkt Fragen haben, können Sie sich gerne im [Alchemy Discord](https://discord.gg/gWuC7zB) melden!

## Schritt 1: Mit dem Ethereum-Netzwerk verbinden {#step-1}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Chain zu stellen. Der Einfachheit halber verwenden wir ein kostenloses Konto bei Alchemy, einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne unsere eigenen Blockchain-Knoten betreiben zu müssen. Die Plattform verfügt auch über Entwicklertools für Überwachung und Analysen, die wir in diesem Tutorial nutzen werden, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts unter der Haube vor sich geht. Wenn Sie noch kein Alchemy-Konto haben, [können Sie sich hier kostenlos anmelden](https://dashboard.alchemy.com/signup).

## Schritt 2: Erstellen Sie Ihre App (und Ihren API-Schlüssel) {#step-2}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Dies ermöglicht es uns, Anfragen an das Sepolia-Testnet zu stellen. Wenn Sie nicht mit Testnets vertraut sind, schauen Sie sich [diese Seite](/developers/docs/networks/) an.

1.  Navigieren Sie zur Seite „Create new app“ (Neue App erstellen) in Ihrem Alchemy-Dashboard, indem Sie in der Navigationsleiste „Select an app“ (Eine App auswählen) wählen und auf „Create new app“ klicken.

![Hello world create app](./hello-world-create-app.png)

2. Nennen Sie Ihre App „Hello World“, geben Sie eine kurze Beschreibung an und wählen Sie einen Anwendungsfall, z. B. „Infra & Tooling“. Suchen Sie als Nächstes nach „Ethereum“ und wählen Sie das Netzwerk aus.

![create app view hello world](./create-app-view-hello-world.png)

3. Klicken Sie auf „Next“ (Weiter), um fortzufahren, dann auf „Create app“ (App erstellen) und das war's! Ihre App sollte im Dropdown-Menü der Navigationsleiste erscheinen, mit einem API-Schlüssel, den Sie kopieren können.

## Schritt 3: Erstellen Sie ein Ethereum-Konto (Adresse) {#step-3}

Wir benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. Für dieses Tutorial verwenden wir MetaMask, ein virtuelles Wallet im Browser, das zur Verwaltung Ihrer Ethereum-Kontoadresse verwendet wird. Mehr zu [Transaktionen](/developers/docs/transactions/).

Sie können MetaMask herunterladen und [hier](https://metamask.io/download) kostenlos ein Ethereum-Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie über das Netzwerk-Dropdown-Menü zum „Sepolia“-Testnet wechseln (damit wir nicht mit echtem Geld hantieren).

Wenn Sepolia nicht aufgeführt ist, gehen Sie ins Menü, dann auf „Advanced“ (Erweitert) und scrollen Sie nach unten, um „Show test networks“ (Testnetzwerke anzeigen) einzuschalten. Wählen Sie im Netzwerkauswahlmenü die Registerkarte „Custom“ (Benutzerdefiniert), um eine Liste von Testnets zu finden, und wählen Sie „Sepolia“.

![metamask sepolia example](./metamask-sepolia-example.png)

## Schritt 4: Fügen Sie Ether aus einem Faucet hinzu {#step-4}

Um unseren Smart Contract im Testnet bereitzustellen, benötigen wir etwas falsches ETH. Um Sepolia-ETH zu erhalten, können Sie zu den [Sepolia-Netzwerkdetails](/developers/docs/networks/#sepolia) gehen, um eine Liste verschiedener Faucets anzuzeigen. Wenn eines nicht funktioniert, versuchen Sie ein anderes, da sie manchmal leerlaufen können. Es kann aufgrund des Netzwerkverkehrs einige Zeit dauern, bis Sie Ihr falsches ETH erhalten. Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen!

## Schritt 5: Überprüfen Sie Ihr Guthaben {#step-5}

Um sicherzustellen, dass unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Dies gibt die Menge an ETH in unserem Wallet zurück. Nachdem Sie Ihre MetaMask-Kontoadresse eingegeben und auf „Send Request“ (Anfrage senden) geklickt haben, sollten Sie eine Antwort wie diese sehen:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **HINWEIS:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als die kleinste Stückelung von Ether verwendet. Die Umrechnung von Wei in ETH lautet: 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0x2B5E3AF16B1880000 in eine Dezimalzahl umwandeln, erhalten wir 5\*10¹⁸, was 5 ETH entspricht.
>
> Puh! Unser falsches Geld ist komplett da <Emoji text=":money_mouth_face:" size={1} />.

## Schritt 6: Initialisieren Sie unser Projekt {#step-6}

Zuerst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zu Ihrer Befehlszeile und geben Sie ein:

```
mkdir hello-world
cd hello-world
```

Da wir uns nun in unserem Projektordner befinden, verwenden wir `npm init`, um das Projekt zu initialisieren. Wenn Sie npm noch nicht installiert haben, folgen Sie [diesen Anweisungen](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (wir benötigen auch Node.js, laden Sie das also ebenfalls herunter!).

```
npm init
```

Es spielt keine große Rolle, wie Sie die Installationsfragen beantworten, hier ist als Referenz, wie wir es gemacht haben:

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

Bestätigen Sie die package.json und wir können loslegen!

## Schritt 7: Laden Sie [Hardhat](https://hardhat.org/getting-started/#overview) herunter {#step-7}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern beim lokalen Erstellen von Smart Contracts und Dapps, bevor sie auf der Live-Chain bereitgestellt werden.

Führen Sie in unserem `hello-world`-Projekt Folgendes aus:

```
npm install --save-dev hardhat
```

Auf dieser Seite finden Sie weitere Details zu den [Installationsanweisungen](https://hardhat.org/getting-started/#overview).

## Schritt 8: Erstellen Sie ein Hardhat-Projekt {#step-8}

Führen Sie in unserem Projektordner Folgendes aus:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Dadurch wird eine `hardhat.config.js`-Datei für uns generiert, in der wir die gesamte Einrichtung für unser Projekt festlegen (in Schritt 13).

## Schritt 9: Fügen Sie Projektordner hinzu {#step-9}

Um unser Projekt übersichtlich zu halten, erstellen wir zwei neue Ordner. Navigieren Sie in Ihrer Befehlszeile zum Stammverzeichnis Ihres Projekts und geben Sie ein:

```
mkdir contracts
mkdir scripts
```

- `contracts/` ist der Ort, an dem wir unsere Hello World Smart Contract-Codedatei aufbewahren
- `scripts/` ist der Ort, an dem wir Skripte zur Bereitstellung und Interaktion mit unserem Vertrag aufbewahren

## Schritt 10: Schreiben Sie unseren Vertrag {#step-10}

Sie fragen sich vielleicht, wann zum Teufel wir Code schreiben werden?? Nun, hier sind wir, bei Schritt 10.

Öffnen Sie das hello-world-Projekt in Ihrem bevorzugten Editor (wir mögen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben, die wir verwenden werden, um unseren HelloWorld.sol Smart Contract zu schreiben.‌

1.  Navigieren Sie zum Ordner „contracts“ und erstellen Sie eine neue Datei namens HelloWorld.sol
2.  Unten finden Sie einen beispielhaften Hello World Smart Contract von der Ethereum Foundation, den wir für dieses Tutorial verwenden werden. Kopieren Sie den unten stehenden Inhalt und fügen Sie ihn in Ihre HelloWorld.sol-Datei ein. Lesen Sie unbedingt die Kommentare, um zu verstehen, was dieser Vertrag tut:

```solidity
// Gibt die Version von Solidity unter Verwendung der semantischen Versionierung an.
// Weitere Informationen: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definiert einen Contract namens `HelloWorld`.
// Ein Contract ist eine Sammlung von Funktionen und Daten (seinem Zustand). Sobald er bereitgestellt wurde, befindet sich ein Contract an einer bestimmten Adresse auf der Ethereum-Blockchain. Weitere Informationen: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Deklariert eine Zustandsvariable `message` vom Typ `string`.
   // Zustandsvariablen sind Variablen, deren Werte dauerhaft im Contract-Speicher gespeichert werden. Das Schlüsselwort `public` macht Variablen von außerhalb eines Contracts zugänglich und erstellt eine Funktion, die andere Contracts oder Clients aufrufen können, um auf den Wert zuzugreifen.
   string public message;

   // Ähnlich wie in vielen klassenbasierten objektorientierten Sprachen ist ein Konstruktor eine spezielle Funktion, die nur bei der Erstellung des Contracts ausgeführt wird.
   // Konstruktoren werden verwendet, um die Daten des Contracts zu initialisieren. Weitere Informationen:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akzeptiert ein String-Argument `initMessage` und setzt den Wert in die Speichervariable `message` des Contracts ein).
      message = initMessage;
   }

   // Eine öffentliche Funktion, die ein String-Argument akzeptiert und die Speichervariable `message` aktualisiert.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Dies ist ein super einfacher Smart Contract, der bei der Erstellung eine Nachricht speichert und durch Aufrufen der `update`-Funktion aktualisiert werden kann.

## Schritt 11: Verbinden Sie MetaMask & Alchemy mit Ihrem Projekt {#step-11}

Wir haben ein MetaMask-Wallet und ein Alchemy-Konto erstellt und unseren Smart Contract geschrieben. Jetzt ist es an der Zeit, die drei zu verbinden.

Jede Transaktion, die von Ihrem virtuellen Wallet gesendet wird, erfordert eine Signatur mit Ihrem einzigartigen Private-Key. Um unserem Programm diese Berechtigung zu erteilen, können wir unseren Private-Key (und den Alchemy-API-Schlüssel) sicher in einer Umgebungsdatei speichern.

> Um mehr über das Senden von Transaktionen zu erfahren, schauen Sie sich [dieses Tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) zum Senden von Transaktionen mit web3 an.

Installieren Sie zunächst das dotenv-Paket in Ihrem Projektverzeichnis:

```
npm install dotenv --save
```

Erstellen Sie dann eine `.env`-Datei im Stammverzeichnis unseres Projekts und fügen Sie Ihren MetaMask Private-Key und die HTTP-Alchemy-API-URL hinzu.

- Befolgen Sie [diese Anweisungen](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), um Ihren Private-Key zu exportieren
- Siehe unten, um die HTTP-Alchemy-API-URL zu erhalten

![get alchemy api key](./get-alchemy-api-key.png)

Kopieren Sie die Alchemy-API-URL

Ihre `.env` sollte so aussehen:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, werden wir diese Variablen in unserer `hardhat.config.js`-Datei in Schritt 13 referenzieren.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Committen Sie <code>.env</code> nicht! Bitte stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals mit jemandem teilen oder offenlegen, da Sie dadurch Ihre Geheimnisse kompromittieren. Wenn Sie eine Versionskontrolle verwenden, fügen Sie Ihre <code>.env</code> zu einer <a href="https://git-scm.com/docs/gitignore">gitignore</a>-Datei hinzu.
</AlertDescription>
</AlertContent>
</Alert>

## Schritt 12: Installieren Sie Ethers.js {#step-12-install-ethersjs}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen, indem sie [Standard-JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) mit benutzerfreundlicheren Methoden umhüllt.

Hardhat macht es super einfach, [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) für die Bereitstellung von Verträgen nutzen ([Ethers.js](https://github.com/ethers-io/ethers.js/) verfügt über einige sehr saubere Methoden zur Bereitstellung von Verträgen).

Geben Sie in Ihrem Projektverzeichnis Folgendes ein:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Wir werden im nächsten Schritt auch Ethers in unserer `hardhat.config.js` benötigen.

## Schritt 13: Aktualisieren Sie hardhat.config.js {#step-13-update-hardhatconfigjs}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt, jetzt müssen wir `hardhat.config.js` aktualisieren, damit unser Projekt von allen weiß.

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

## Schritt 14: Kompilieren Sie unseren Vertrag {#step-14-compile-our-contracts}

Um sicherzustellen, dass bisher alles funktioniert, lassen Sie uns unseren Vertrag kompilieren. Die Aufgabe `compile` ist eine der integrierten Hardhat-Aufgaben.

Führen Sie über die Befehlszeile Folgendes aus:

```
npx hardhat compile
```

Möglicherweise erhalten Sie eine Warnung über `SPDX license identifier not provided in source file`, aber darüber müssen Sie sich keine Sorgen machen – hoffentlich sieht alles andere gut aus! Wenn nicht, können Sie jederzeit im [Alchemy Discord](https://discord.gg/u72VCg3) eine Nachricht schreiben.

## Schritt 15: Schreiben Sie unser Bereitstellungsskript {#step-15-write-our-deploy-scripts}

Da unser Vertrag nun geschrieben ist und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, unser Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`, der Sie den folgenden Inhalt hinzufügen:

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

Hardhat leistet hervorragende Arbeit bei der Erklärung, was jede dieser Codezeilen in ihrem [Contracts-Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) tut. Wir haben ihre Erklärungen hier übernommen.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Eine `ContractFactory` in ethers.js ist eine Abstraktion, die zur Bereitstellung neuer Smart Contracts verwendet wird. `HelloWorld` ist hier also eine Fabrik für Instanzen unseres Hello World-Vertrags. Bei Verwendung des `hardhat-ethers`-Plugins sind `ContractFactory`- und `Contract`-Instanzen standardmäßig mit dem ersten Unterzeichner verbunden.

```
const hello_world = await HelloWorld.deploy();
```

Der Aufruf von `deploy()` auf einer `ContractFactory` startet die Bereitstellung und gibt ein `Promise` zurück, das in einen `Contract` aufgelöst wird. Dies ist das Objekt, das eine Methode für jede unserer Smart Contract-Funktionen hat.

## Schritt 16: Stellen Sie unseren Vertrag bereit {#step-16-deploy-our-contract}

Wir sind endlich bereit, unseren Smart Contract bereitzustellen! Navigieren Sie zur Befehlszeile und führen Sie Folgendes aus:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Sie sollten dann so etwas sehen:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Wenn wir zum [Sepolia Etherscan](https://sepolia.etherscan.io/) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Die Transaktion wird in etwa so aussehen:

![etherscan contract](./etherscan-contract.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und die To-Adresse wird „Contract Creation“ (Vertragserstellung) lauten, aber wenn wir in die Transaktion klicken, sehen wir unsere Vertragsadresse im `To`-Feld:

![etherscan transaction](./etherscan-transaction.png)

Herzlichen Glückwunsch! Sie haben gerade einen Smart Contract auf der Ethereum-Chain bereitgestellt 🎉

Um zu verstehen, was unter der Haube vor sich geht, navigieren wir zur Registerkarte Explorer in unserem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/explorer). Wenn Sie mehrere Alchemy-Apps haben, stellen Sie sicher, dass Sie nach App filtern und „Hello World“ auswählen.
![hello world explorer](./hello-world-explorer.png)

Hier sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers unter der Haube für uns gemacht haben, als wir die Funktion `.deploy()` aufgerufen haben. Zwei wichtige, die hier hervorgehoben werden sollten, sind [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), was die Anfrage ist, unseren Vertrag tatsächlich auf die Sepolia-Chain zu schreiben, und [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), was eine Anfrage ist, um Informationen über unsere Transaktion anhand des Hashs zu lesen (ein typisches Muster bei Transaktionen). Um mehr über das Senden von Transaktionen zu erfahren, schauen Sie sich dieses Tutorial zum [Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) an.

Das war's für Teil 1 dieses Tutorials. In Teil 2 werden wir tatsächlich [mit unserem Smart Contract interagieren](https://www.alchemy.com/docs/interacting-with-a-smart-contract), indem wir unsere anfängliche Nachricht aktualisieren, und in Teil 3 werden wir [unseren Smart Contract auf Etherscan veröffentlichen](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), damit jeder weiß, wie man mit ihm interagiert.

**Möchten Sie mehr über Alchemy erfahren? Besuchen Sie unsere [Website](https://www.alchemy.com/eth). Möchten Sie nie wieder ein Update verpassen? Abonnieren Sie unseren Newsletter [hier](https://www.alchemy.com/newsletter)! Treten Sie auch unbedingt unserem [Discord](https://discord.gg/u72VCg3) bei.**.