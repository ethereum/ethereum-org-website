---
title: Wie man einen NFT schreibt und bereitstellt (Teil 1/3 der NFT-Tutorial-Reihe)
description: "Dieses Tutorial ist Teil 1 einer Reihe über NFTs, die Sie Schritt für Schritt durch das Schreiben und Bereitstellen eines Smart Contracts für einen Non-Fungible Token (ERC-721-Token) unter Verwendung von Ethereum und dem InterPlanetary File System (IPFS) führt."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "Smart Contracts"]
skill: beginner
breadcrumb: NFT schreiben und bereitstellen
lang: de
published: 2021-04-22
---

Da NFTs die Blockchain in den Fokus der Öffentlichkeit rücken, ist jetzt eine hervorragende Gelegenheit, den Hype selbst zu verstehen, indem Sie Ihren eigenen NFT-Vertrag (ERC-721-Token) auf der Ethereum-Blockchain veröffentlichen!

In diesem Tutorial werden wir die Erstellung und Bereitstellung eines ERC-721 Smart Contracts im Sepolia-Testnetz unter Verwendung von [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) und [Alchemy](https://alchemy.com/signup/eth) durchgehen (machen Sie sich keine Sorgen, wenn Sie noch nicht verstehen, was das alles bedeutet – wir werden es erklären!).

In Teil 2 dieses Tutorials werden wir durchgehen, wie wir unseren Smart Contract verwenden können, um einen NFT zu prägen, und in Teil 3 werden wir erklären, wie Sie Ihren NFT in MetaMask anzeigen können.

Und natürlich, wenn Sie zu irgendeinem Zeitpunkt Fragen haben, zögern Sie nicht, sich im [Alchemy Discord](https://discord.gg/gWuC7zB) zu melden oder die [NFT-API-Dokumentation von Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart) zu besuchen!

## Schritt 1: Mit dem Ethereum-Netzwerk verbinden {#connect-to-ethereum}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Blockchain zu stellen, aber um es einfach zu machen, verwenden wir ein kostenloses Konto bei [Alchemy](https://alchemy.com/signup/eth), einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne unsere eigenen Knoten betreiben zu müssen.

In diesem Tutorial werden wir auch die Entwicklertools von Alchemy für Überwachung und Analysen nutzen, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts intern vor sich geht. Wenn Sie noch kein Alchemy-Konto haben, können Sie sich [hier](https://alchemy.com/signup/eth) kostenlos anmelden.

## Schritt 2: Erstellen Sie Ihre App (und Ihren API-Schlüssel) {#make-api-key}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Dies ermöglicht es uns, Anfragen an das Sepolia-Testnetz zu stellen. Schauen Sie sich [diesen Leitfaden](https://www.alchemy.com/docs/choosing-a-web3-network) an, wenn Sie mehr über Testnetze erfahren möchten.

1. Navigieren Sie zur Seite "Create new app" in Ihrem Alchemy-Dashboard, indem Sie in der Navigationsleiste "Select an app" auswählen und auf "Create new app" klicken.

![Erstellen Sie Ihre App](./alchemy-create-new-app.png)

2. Benennen Sie Ihre App (wir haben „My First NFT!“ gewählt), geben Sie eine kurze Beschreibung an und wählen Sie einen Anwendungsfall. Suchen Sie als Nächstes nach "Ethereum" und wählen Sie das Netzwerk aus. Wir werden Sepolia verwenden, das empfohlene Testnetz für die Anwendungsentwicklung (siehe [Ethereum-Netzwerke](/developers/docs/networks/#ethereum-testnets)).

3. Klicken Sie auf "Next", um fortzufahren, dann auf „Create app“ und das war's! Ihre App sollte im Dropdown-Menü der Navigationsleiste erscheinen, mit einem API-Schlüssel, den Sie kopieren können.

## Schritt 3: Erstellen Sie ein Ethereum-Konto (Adresse) {#create-eth-address}

Wir benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. Für dieses Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, die zur Verwaltung Ihrer Ethereum-Kontoadresse verwendet wird. Wenn Sie mehr darüber erfahren möchten, wie Transaktionen auf Ethereum funktionieren, schauen Sie sich [diese Seite](/developers/docs/transactions/) der Ethereum Foundation an.

Sie können [hier](https://metamask.io/download) kostenlos ein MetaMask-Konto herunterladen und erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie über das Netzwerkauswahlmenü zum "Sepolia"-Testnetz wechseln (damit wir nicht mit echtem Geld hantieren). Wenn Sepolia nicht aufgeführt ist, öffnen Sie das Menü in der oberen rechten Ecke, wählen Sie "Networks" und aktivieren Sie "Show test networks" (siehe [MetaMasks Leitfaden zur Anzeige von Testnetzen](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Legen Sie Sepolia als Ihr Netzwerk fest](./metamask-sepolia.png)

## Schritt 4: Fügen Sie Ether aus einem Faucet hinzu {#step-4-add-ether-from-a-faucet}

Um unseren Smart Contract im Testnetz bereitzustellen, benötigen wir etwas falsches ETH. Um Sepolia-ETH zu erhalten, wählen Sie eines der Faucets aus, die in den [Sepolia-Netzwerkdetails](/developers/docs/networks/#sepolia) aufgeführt sind, und geben Sie Ihre Kontoadresse ein. Wenn eines nicht funktioniert, versuchen Sie ein anderes, da sie manchmal leerlaufen können und einige Berechtigungsregeln haben: Zum Beispiel erfordert das [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia), dass die Empfangsadresse mindestens 0,001 ETH im Ethereum Mainnet hält. Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen!

## Schritt 5: Überprüfen Sie Ihr Guthaben {#check-balance}

Um sicherzugehen, dass unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance)-Anfrage über das [Sandbox-Tool von Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Dies gibt die Menge an ETH in unserer Wallet zurück. Nachdem Sie Ihre MetaMask-Kontoadresse eingegeben und auf „Send Request“ geklickt haben, sollten Sie eine Antwort wie diese sehen:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Hinweis** Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als die kleinste Stückelung von Ether verwendet. Die Umrechnung von Wei in ETH lautet 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl umwandeln, erhalten wir 1\*10<sup>18</sup> Wei, was 1 ETH entspricht.

Puh! Unser falsches Geld ist komplett da.

## Schritt 6: Initialisieren Sie unser Projekt {#initialize-project}

Zuerst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zu Ihrer Befehlszeile und geben Sie ein:

```sh
mkdir my-nft
cd my-nft
```

Da wir uns nun in unserem Projektordner befinden, verwenden wir npm init, um das Projekt zu initialisieren. Wenn Sie npm noch nicht installiert haben, folgen Sie [den Installationsanweisungen für Node.js](https://nodejs.org/en/download/) (wir benötigen Node.js und npm für dieses Tutorial).

```sh
npm init
```

Es spielt keine große Rolle, wie Sie die Installationsfragen beantworten; hier ist, wie wir es als Referenz gemacht haben:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
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

## Schritt 7: Installieren Sie [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern beim lokalen Erstellen von Smart Contracts und dezentralen Anwendungen (Dapps), bevor sie auf der Live-Chain bereitgestellt werden.

Hardhat 3 erfordert Node.js v22.13.0 oder neuer. Führen Sie in unserem my-nft-Projekt Folgendes aus:

```sh
npm install --save-dev hardhat
```

Weitere Details zu den [Installationsanweisungen](https://hardhat.org/docs/getting-started) finden Sie auf dieser Seite.

## Schritt 8: Erstellen Sie ein Hardhat-Projekt {#create-hardhat-project}

Das Ausführen von `npx hardhat --init` würde ein komplettes Beispielprojekt generieren, aber für dieses Tutorial werden wir die Dinge von Hand einrichten, damit Sie jedes Teil sehen können. Erstellen Sie im Stammverzeichnis Ihres Projektordners eine Datei namens `hardhat.config.js` mit folgendem Inhalt:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Hier werden wir die gesamte Einrichtung für unser Projekt festlegen (in Schritt 13). Vorerst teilt es Hardhat nur mit, welche Version des Solidity-Compilers verwendet werden soll.

## Schritt 9: Fügen Sie Projektordner hinzu {#add-project-folders}

Um unser Projekt übersichtlich zu halten, erstellen wir zwei neue Ordner. Navigieren Sie in Ihrer Befehlszeile zum Stammverzeichnis Ihres Projekts und geben Sie ein:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ ist der Ort, an dem wir unseren NFT-Smart-Contract-Code aufbewahren werden

- scripts/ ist der Ort, an dem wir Skripte zur Bereitstellung und Interaktion mit unserem Smart Contract aufbewahren werden

## Schritt 10: Schreiben Sie unseren Vertrag {#write-contract}

Da unsere Umgebung nun eingerichtet ist, kommen wir zu den spannenderen Dingen: _dem Schreiben unseres Smart-Contract-Codes!_

Öffnen Sie das my-nft-Projekt in Ihrem bevorzugten Editor (wir mögen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben, die wir verwenden werden, um unseren MyNFT.sol Smart Contract zu schreiben.‌

1. Navigieren Sie zum Ordner `contracts` und erstellen Sie eine neue Datei namens MyNFT.sol

2. Unten finden Sie unseren NFT-Smart-Contract-Code, den wir auf der ERC-721-Implementierung der [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721)-Bibliothek aufgebaut haben. Kopieren Sie den folgenden Inhalt und fügen Sie ihn in Ihre MyNFT.sol-Datei ein.

   ```solidity
   // Vertrag basierend auf https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Da wir Klassen aus der OpenZeppelin-Vertragsbibliothek erben, führen Sie in Ihrer Befehlszeile `npm install @openzeppelin/contracts` aus, um die Bibliothek in unserem Ordner zu installieren. Dieses Tutorial verwendet OpenZeppelin Contracts 5.x, was Solidity 0.8.24 oder neuer erfordert.

Also, was _macht_ dieser Code genau? Lassen Sie uns ihn Zeile für Zeile aufschlüsseln.

Ganz oben in unserem Smart Contract importieren wir drei [OpenZeppelin](https://openzeppelin.com/)-Smart-Contract-Klassen:

- @openzeppelin/contracts/token/ERC721/ERC721.sol enthält die Implementierung des ERC-721-Standards, den unser NFT-Smart-Contract erben wird. (Um ein gültiger NFT zu sein, muss Ihr Smart Contract alle Methoden des ERC-721-Standards implementieren.) Um mehr über die geerbten ERC-721-Funktionen zu erfahren, schauen Sie sich die Schnittstellendefinition [hier](https://eips.ethereum.org/EIPS/eip-721) an.

- @openzeppelin/contracts/access/Ownable.sol richtet die [Zugriffskontrolle](https://docs.openzeppelin.com/contracts/5.x/access-control) für unseren Smart Contract ein, sodass nur der Eigentümer des Smart Contracts (Sie) NFTs prägen kann. Der Eigentümer ist die `initialOwner`-Adresse, die an den Konstruktor übergeben wird. (Hinweis: Die Einbeziehung der Zugriffskontrolle ist reine Präferenz. Wenn Sie möchten, dass jeder mit Ihrem Smart Contract einen NFT prägen kann, entfernen Sie `Ownable` und `Ownable(initialOwner)` aus der Vertragsdefinition und dem Konstruktor sowie `onlyOwner` aus der Funktion `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol erweitert ERC-721, sodass jeder Token seine eigene Metadaten-URI speichern kann, die wir beim Prägen festlegen.

Nach unseren Importanweisungen haben wir unseren benutzerdefinierten NFT-Smart-Contract, der überraschend kurz ist – er enthält nur einen Zähler, einen Konstruktor und eine einzige Funktion! Dies ist unseren geerbten OpenZeppelin-Verträgen zu verdanken, die die meisten Methoden implementieren, die wir zum Erstellen eines NFTs benötigen, wie z. B. `ownerOf`, das den Eigentümer des NFTs zurückgibt, und `transferFrom`, das das Eigentum am NFT von einem Konto auf ein anderes überträgt.

Der Zähler, `_nextTokenId`, verfolgt die Gesamtzahl der geprägten NFTs und legt die eindeutige ID für unseren neuen NFT fest. (Jedem mit einem Smart Contract geprägten NFT muss eine eindeutige ID zugewiesen werden – hier wird unsere eindeutige ID einfach durch die Gesamtzahl der existierenden NFTs bestimmt. `++_nextTokenId` erhöht den Zähler, bevor er verwendet wird, sodass der erste NFT, den wir mit unserem Smart Contract prägen, die ID "1" hat, unser zweiter NFT die ID "2" usw.)

In unserem ERC-721-Konstruktor werden Sie feststellen, dass wir 2 Strings übergeben, „MyNFT“ und „NFT“. Die erste Variable ist der Name des Smart Contracts und die zweite ist sein Symbol. Sie können jede dieser Variablen nach Belieben benennen!

Schließlich haben wir unsere Funktion `mintNFT(address recipient, string memory tokenURI)`, die es uns ermöglicht, einen NFT zu prägen! Sie werden feststellen, dass diese Funktion zwei Variablen aufnimmt:

- `address recipient` gibt die Adresse an, die Ihren frisch geprägten NFT erhalten wird

- `string memory tokenURI` ist ein String, der zu einem JSON-Dokument auflösen sollte, das die Metadaten des NFTs beschreibt. Die Metadaten eines NFTs sind das, was ihn wirklich zum Leben erweckt und es ihm ermöglicht, konfigurierbare Eigenschaften wie Name, Beschreibung, Bild und andere Attribute zu haben. In Teil 2 dieses Tutorials werden wir beschreiben, wie diese Metadaten konfiguriert werden.

`mintNFT` ruft einige Methoden aus der geerbten ERC-721-Bibliothek auf und gibt letztendlich eine Zahl zurück, die die ID des frisch geprägten NFTs darstellt.

## Schritt 11: Verbinden Sie MetaMask & Alchemy mit Ihrem Projekt {#connect-metamask-and-alchemy}

Da wir nun eine MetaMask-Wallet und ein Alchemy-Konto erstellt sowie unseren Smart Contract geschrieben haben, ist es an der Zeit, die drei zu verbinden.

Jede Transaktion, die von Ihrer virtuellen Wallet gesendet wird, erfordert eine Signatur unter Verwendung Ihres eindeutigen privaten Schlüssels. Um unserem Programm diese Berechtigung zu erteilen, können wir unseren privaten Schlüssel (und den Alchemy-API-Schlüssel) sicher in einer Umgebungsdatei speichern.

Um mehr über das Senden von Transaktionen zu erfahren, schauen Sie sich die [Transaktionsdokumentation](/developers/docs/transactions/) an.

Erstellen Sie eine `.env`-Datei im Stammverzeichnis unseres Projekts und fügen Sie Ihren privaten MetaMask-Schlüssel und die HTTP-Alchemy-API-URL hinzu.

- Befolgen Sie [diese Anweisungen](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), um Ihren privaten Schlüssel aus MetaMask zu exportieren

- Sehen Sie unten, wie Sie die HTTP-Alchemy-API-URL erhalten und in Ihre Zwischenablage kopieren

![Kopieren Sie Ihre Alchemy-API-URL](./copy-alchemy-api-url.mp4#842x480)

Ihre `.env` sollte nun so aussehen:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, werden wir in Schritt 13 in unserer hardhat.config.js-Datei auf diese Variablen verweisen. Node.js kann `.env`-Dateien selbst lesen, sodass kein zusätzliches Paket installiert werden muss.

<EnvWarningBanner />

## Schritt 12: Installieren Sie Ethers.js {#install-ethers}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen, indem sie [Standard-JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) mit benutzerfreundlicheren Methoden umhüllt.

Hardhat macht es super einfach, [Plugins](https://hardhat.org/docs/plugins/official-plugins) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/hardhat-ethers) für die Vertragsbereitstellung nutzen ([Ethers.js](https://docs.ethers.org/v6/) verfügt über einige sehr saubere Methoden zur Vertragsbereitstellung).

Geben Sie in Ihrem Projektverzeichnis Folgendes ein:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Wir werden das Plugin im nächsten Schritt auch zu unserer hardhat.config.js hinzufügen.

## Schritt 13: Aktualisieren Sie hardhat.config.js {#update-hardhat-config}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt, nun müssen wir hardhat.config.js aktualisieren, damit unser Projekt von allen weiß.

Aktualisieren Sie Ihre hardhat.config.js so, dass sie wie folgt aussieht:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Lade API_URL und PRIVATE_KEY aus der .env-Datei in process.env, falls vorhanden
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

`configVariable` weist Hardhat an, jeden Wert aus einer Umgebungsvariablen nur dann zu lesen, wenn er benötigt wird, sodass Befehle wie `compile` auch dann funktionieren, bevor die Werte festgelegt sind. Wenn Sie Ihren privaten Schlüssel lieber nicht in einer Klartextdatei aufbewahren möchten, kann Hardhat auch [Konfigurationsvariablen aus einem verschlüsselten Schlüsselspeicher](https://hardhat.org/docs/guides/configuration-variables) lesen.

## Schritt 14: Kompilieren Sie unseren Vertrag {#compile-contract}

Um sicherzustellen, dass bisher alles funktioniert, lassen Sie uns unseren Vertrag kompilieren. Die Kompilierungsaufgabe ist eine der integrierten Hardhat-Aufgaben.

Führen Sie über die Befehlszeile Folgendes aus:

```sh
npx hardhat compile
```

Beim ersten Kompilieren lädt Hardhat den Solidity-Compiler herunter. Sie sollten dann etwas wie `Compiled 1 Solidity file with solc 0.8.34` sehen. Wenn nicht, können Sie jederzeit im [Alchemy Discord](https://discord.gg/gWuC7zB) eine Nachricht schreiben.

## Schritt 15: Schreiben Sie unser Bereitstellungsskript {#write-deploy}

Da unser Vertrag nun geschrieben ist und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, unser Skript zur Vertragsbereitstellung zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`, der Sie den folgenden Inhalt hinzufügen:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Starte die Bereitstellung, die ein Promise zurückgibt, das zu einem Vertragsobjekt aufgelöst wird
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Lassen Sie uns durchgehen, was jede dieser Codezeilen bewirkt.

```js
const { ethers } = await network.create()
```

In Hardhat 3 öffnet ein Skript explizit eine Verbindung zu einem Netzwerk. `network.create()` stellt eine Verbindung zu dem Netzwerk her, das Sie mit der Option `--network` auswählen, wenn Sie das Skript ausführen, und das `hardhat-ethers`-Plugin fügt dieser Verbindung ein `ethers`-Objekt hinzu.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` gibt die für das Netzwerk konfigurierten Konten zurück. Auf Sepolia ist das das Konto, dessen privaten Schlüssel Sie in `.env` abgelegt haben. Wir übergeben seine Adresse an den Konstruktor, damit Sie der Eigentümer des Vertrags werden.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Eine ContractFactory in Ethers.js ist eine Abstraktion, die zur Bereitstellung neuer Smart Contracts verwendet wird, daher ist MyNFT hier eine Fabrik für Instanzen unseres NFT-Vertrags. Bei Verwendung des hardhat-ethers-Plugins sind ContractFactory- und Contract-Instanzen standardmäßig mit dem ersten Unterzeichner verbunden.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Der Aufruf von deploy() auf einer ContractFactory startet die Bereitstellung und gibt ein Promise zurück, das zu einem Contract auflöst. Dies ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen hat. Die Argumente, die Sie an deploy() übergeben, gehen an den Konstruktor des Vertrags, hier die `initialOwner`-Adresse.

`waitForDeployment()` wartet, bis die Bereitstellungstransaktion in einen Block aufgenommen wurde, und `getAddress()` gibt die Adresse des neuen Vertrags zurück. Weitere Details finden Sie in der [Ethers.js-Vertragsdokumentation](https://docs.ethers.org/v6/api/contract/).

## Schritt 16: Stellen Sie unseren Vertrag bereit {#deploy-contract}

Wir sind endlich bereit, unseren Smart Contract bereitzustellen! Navigieren Sie zurück zum Stammverzeichnis Ihres Projektverzeichnisses und führen Sie in der Befehlszeile Folgendes aus:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Sie sollten dann etwas Ähnliches sehen wie:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Wenn wir zum [Sepolia Etherscan](https://sepolia.etherscan.io/) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Wenn Sie sie nicht sofort sehen können, warten Sie bitte eine Weile, da dies einige Zeit in Anspruch nehmen kann. Die Transaktion wird in etwa so aussehen:

![Sehen Sie sich Ihre Transaktionsadresse auf Etherscan an](./etherscan-sepoila-contract-creation.png)

Die From-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und die To-Adresse wird „Contract Creation“ anzeigen. Wenn wir in die Transaktion klicken, sehen wir unsere Vertragsadresse im To-Feld:

![Sehen Sie sich Ihre Vertragsadresse auf Etherscan an](./etherscan-sepolia-tx-details.png)

Jaaaaa! Sie haben gerade Ihren NFT-Smart-Contract auf der Ethereum-Chain (Testnetz) bereitgestellt!

Um zu verstehen, was intern vor sich geht, können Sie sich die Anfragen ansehen, die Ihre App in Ihrem [Alchemy-Dashboard](https://dashboard.alchemy.com/) erhalten hat.

Dort sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers intern für uns getätigt haben, als wir die Funktion .deploy() aufgerufen haben. Zwei wichtige, die hier hervorgehoben werden sollten, sind [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), was die Anfrage ist, unseren Smart Contract tatsächlich auf die Sepolia-Chain zu schreiben, und [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), was eine Anfrage ist, um Informationen über unsere Transaktion anhand des Hashes zu lesen (ein typisches Muster beim Senden von Transaktionen). Um mehr über das Senden von Transaktionen zu erfahren, schauen Sie sich die [Transaktionsdokumentation](/developers/docs/transactions/) an.

Das war's für Teil 1 dieses Tutorials. In [Teil 2 werden wir tatsächlich mit unserem Smart Contract interagieren, indem wir einen NFT prägen](/developers/tutorials/how-to-mint-an-nft/), und in [Teil 3 zeigen wir Ihnen, wie Sie Ihren NFT in Ihrer Ethereum-Wallet anzeigen können](/developers/tutorials/how-to-view-nft-in-metamask/)!
