---
title: Wie man einen NFT schreibt und bereitstellt (Teil 1/3 der NFT-Tutorial-Reihe)
description: "Dieses Tutorial ist Teil 1 einer Serie über NFTs, die Sie Schritt für Schritt durch das Schreiben und Bereitstellen eines Smart Contracts für einen nicht-fungiblen Token (ERC-721-Token) unter Verwendung von Ethereum und dem Inter Planetary File System (IPFS) führt."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "Smart Contracts"]
skill: beginner
breadcrumb: NFT schreiben und bereitstellen
lang: de
published: 2021-04-22
---

Da NFTs die Blockchain in den Fokus der Öffentlichkeit rücken, ist jetzt eine hervorragende Gelegenheit, den Hype selbst zu verstehen, indem Sie Ihren eigenen NFT-Vertrag (ERC-721-Token) auf der Ethereum-Blockchain veröffentlichen!

Alchemy ist extrem stolz darauf, die größten Namen im NFT-Bereich zu unterstützen, darunter Makersplace (stellte kürzlich bei Christie's einen Rekord für den Verkauf digitaler Kunstwerke in Höhe von 69 Millionen US-Dollar auf), Dapper Labs (Schöpfer von NBA Top Shot & Crypto Kitties), OpenSea (der weltweit größte NFT-Marktplatz), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable und mehr.

In diesem Tutorial werden wir die Erstellung und Bereitstellung eines ERC-721 Smart Contracts im Sepolia-Testnet unter Verwendung von [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) und [Alchemy](https://alchemy.com/signup/eth) durchgehen (keine Sorge, wenn Sie noch nicht verstehen, was das alles bedeutet – wir werden es erklären!).

In Teil 2 dieses Tutorials werden wir durchgehen, wie wir unseren Smart Contract verwenden können, um einen NFT zu prägen, und in Teil 3 werden wir erklären, wie Sie Ihren NFT in MetaMask anzeigen können.

Und natürlich, wenn Sie an irgendeinem Punkt Fragen haben, zögern Sie nicht, sich im [Alchemy Discord](https://discord.gg/gWuC7zB) zu melden oder die [NFT-API-Dokumentation von Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) zu besuchen!

## Schritt 1: Mit dem Ethereum-Netzwerk verbinden {#connect-to-ethereum}

Es gibt viele Möglichkeiten, Anfragen an die Ethereum-Blockchain zu stellen, aber um es einfach zu machen, verwenden wir ein kostenloses Konto bei [Alchemy](https://alchemy.com/signup/eth), einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne unsere eigenen Blockchain-Knoten betreiben zu müssen.

In diesem Tutorial werden wir auch die Entwicklertools von Alchemy für Überwachung und Analysen nutzen, um zu verstehen, was bei der Bereitstellung unseres Smart Contracts unter der Haube passiert. Wenn Sie noch kein Alchemy-Konto haben, können Sie sich [hier](https://alchemy.com/signup/eth) kostenlos anmelden.

## Schritt 2: Erstellen Sie Ihre App (und Ihren API-Schlüssel) {#make-api-key}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Dies ermöglicht es uns, Anfragen an das Sepolia-Testnet zu stellen. Schauen Sie sich [diesen Leitfaden](https://docs.alchemyapi.io/guides/choosing-a-network) an, wenn Sie mehr über Testnets erfahren möchten.

1. Navigieren Sie zur Seite „Create App“ in Ihrem Alchemy-Dashboard, indem Sie mit der Maus über „Apps“ in der Navigationsleiste fahren und auf „Create App“ klicken.

![Erstellen Sie Ihre App](./create-your-app.png)

2. Benennen Sie Ihre App (wir haben „My First NFT!“ gewählt), geben Sie eine kurze Beschreibung ein, wählen Sie „Ethereum“ für die Chain und „Sepolia“ für Ihr Netzwerk. Seit dem Merge sind die anderen Testnets veraltet.

![Konfigurieren und veröffentlichen Sie Ihre App](./alchemy-explorer-sepolia.png)

3. Klicken Sie auf „Create app“ und das war's! Ihre App sollte in der Tabelle unten erscheinen.

## Schritt 3: Erstellen Sie ein Ethereum-Konto (Adresse) {#create-eth-address}

Wir benötigen ein Ethereum-Konto, um Transaktionen zu senden und zu empfangen. Für dieses Tutorial verwenden wir MetaMask, ein virtuelles Wallet im Browser, das zur Verwaltung Ihrer Ethereum-Kontoadresse verwendet wird. Wenn Sie mehr darüber verstehen möchten, wie Transaktionen auf Ethereum funktionieren, schauen Sie sich [diese Seite](/developers/docs/transactions/) der Ethereum Foundation an.

Sie können MetaMask [hier](https://metamask.io/download) kostenlos herunterladen und ein Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie oben rechts zum „Sepolia Test Network“ wechseln (damit wir nicht mit echtem Geld hantieren).

![Legen Sie Sepolia als Ihr Netzwerk fest](./metamask-goerli.png)

## Schritt 4: Fügen Sie Ether aus einem Faucet hinzu {#step-4-add-ether-from-a-faucet}

Um unseren Smart Contract im Testnet bereitzustellen, benötigen wir etwas falsches ETH. Um ETH zu erhalten, können Sie zum [Sepolia Faucet](https://sepoliafaucet.com/) gehen, das von Alchemy gehostet wird, sich anmelden, Ihre Kontoadresse eingeben und auf „Send Me ETH“ klicken. Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen!

## Schritt 5: Überprüfen Sie Ihr Guthaben {#check-balance}

Um sicherzustellen, dass unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Dies gibt die Menge an ETH in unserem Wallet zurück. Nachdem Sie Ihre MetaMask-Kontoadresse eingegeben und auf „Send Request“ geklickt haben, sollten Sie eine Antwort wie diese sehen:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Hinweis** Dieses Ergebnis ist in Wei, nicht in ETH. Wei wird als die kleinste Stückelung von Ether verwendet. Die Umrechnung von Wei in ETH ist 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl umwandeln, erhalten wir 1\*10<sup>18</sup> Wei, was 1 ETH entspricht.

Puh! Unser falsches Geld ist komplett da.

## Schritt 6: Initialisieren Sie unser Projekt {#initialize-project}

Zuerst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zu Ihrer Kommandozeile und tippen Sie:

    mkdir my-nft
    cd my-nft

Da wir uns nun in unserem Projektordner befinden, verwenden wir `npm init`, um das Projekt zu initialisieren. Wenn Sie npm noch nicht installiert haben, folgen Sie [diesen Anweisungen](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (wir benötigen auch [Node.js](https://nodejs.org/en/download/), laden Sie das also ebenfalls herunter!).

    npm init

Es spielt keine große Rolle, wie Sie die Installationsfragen beantworten; hier ist, wie wir es als Referenz gemacht haben:

```json
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

Bestätigen Sie die package.json, und wir können loslegen!

## Schritt 7: Installieren Sie [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern beim lokalen Erstellen von Smart Contracts und Dapps, bevor sie auf der Live-Chain bereitgestellt werden.

Führen Sie in unserem my-nft-Projekt Folgendes aus:

    npm install --save-dev hardhat

Schauen Sie sich diese Seite für weitere Details zu den [Installationsanweisungen](https://hardhat.org/getting-started/#overview) an.

## Schritt 8: Erstellen Sie ein Hardhat-Projekt {#create-hardhat-project}

Führen Sie in unserem Projektordner Folgendes aus:

    npx hardhat

Sie sollten dann eine Willkommensnachricht und die Option sehen, auszuwählen, was Sie tun möchten. Wählen Sie „create an empty hardhat.config.js“:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Dies generiert eine hardhat.config.js-Datei für uns, in der wir die gesamte Einrichtung für unser Projekt festlegen werden (in Schritt 13).

## Schritt 9: Fügen Sie Projektordner hinzu {#add-project-folders}

Um unser Projekt organisiert zu halten, erstellen wir zwei neue Ordner. Navigieren Sie in Ihrer Kommandozeile zum Stammverzeichnis Ihres Projekts und tippen Sie:

    mkdir contracts
    mkdir scripts

- contracts/ ist der Ort, an dem wir unseren NFT-Smart-Contract-Code aufbewahren

- scripts/ ist der Ort, an dem wir Skripte zur Bereitstellung und Interaktion mit unserem Smart Contract aufbewahren

## Schritt 10: Schreiben Sie unseren Vertrag {#write-contract}

Da unsere Umgebung nun eingerichtet ist, kommen wir zu aufregenderen Dingen: _dem Schreiben unseres Smart-Contract-Codes!_

Öffnen Sie das my-nft-Projekt in Ihrem bevorzugten Editor (wir mögen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben, die wir verwenden werden, um unseren MyNFT.sol Smart Contract zu schreiben.‌

1. Navigieren Sie zum Ordner `contracts` und erstellen Sie eine neue Datei namens MyNFT.sol.

2. Unten finden Sie unseren NFT-Smart-Contract-Code, den wir auf der ERC-721-Implementierung der [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721)-Bibliothek basieren. Kopieren Sie den folgenden Inhalt und fügen Sie ihn in Ihre MyNFT.sol-Datei ein.

   ```solidity
   // Contract basierend auf [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
```

3. Da wir Klassen aus der OpenZeppelin-Vertragsbibliothek erben, führen Sie in Ihrer Kommandozeile `npm install @openzeppelin/contracts^4.0.0` aus, um die Bibliothek in unserem Ordner zu installieren.

Also, was _macht_ dieser Code genau? Lassen Sie uns ihn Zeile für Zeile aufschlüsseln.

Oben in unserem Smart Contract importieren wir drei [OpenZeppelin](https://openzeppelin.com/)-Smart-Contract-Klassen:

- @openzeppelin/contracts/token/ERC721/ERC721.sol enthält die Implementierung des ERC-721-Standards, den unser NFT-Smart-Contract erben wird. (Um ein gültiger NFT zu sein, muss Ihr Smart Contract alle Methoden des ERC-721-Standards implementieren.) Um mehr über die geerbten ERC-721-Funktionen zu erfahren, schauen Sie sich die Schnittstellendefinition [hier](https://eips.ethereum.org/EIPS/eip-721) an.

- @openzeppelin/contracts/utils/Counters.sol stellt Zähler bereit, die nur um eins erhöht oder verringert werden können. Unser Smart Contract verwendet einen Zähler, um die Gesamtzahl der geprägten NFTs zu verfolgen und die eindeutige ID für unseren neuen NFT festzulegen. (Jedem NFT, der mit einem Smart Contract geprägt wird, muss eine eindeutige ID zugewiesen werden – hier wird unsere eindeutige ID einfach durch die Gesamtzahl der existierenden NFTs bestimmt. Zum Beispiel hat der erste NFT, den wir mit unserem Smart Contract prägen, die ID „1“, unser zweiter NFT hat die ID „2“ usw.)

- @openzeppelin/contracts/access/Ownable.sol richtet eine [Zugriffskontrolle](https://docs.openzeppelin.com/contracts/3.x/access-control) für unseren Smart Contract ein, sodass nur der Eigentümer des Smart Contracts (Sie) NFTs prägen kann. (Hinweis: Die Einbeziehung der Zugriffskontrolle ist reine Präferenz. Wenn Sie möchten, dass jeder einen NFT mit Ihrem Smart Contract prägen kann, entfernen Sie das Wort Ownable in Zeile 10 und onlyOwner in Zeile 17.)

Nach unseren Importanweisungen haben wir unseren benutzerdefinierten NFT-Smart-Contract, der überraschend kurz ist – er enthält nur einen Zähler, einen Konstruktor und eine einzige Funktion! Dies ist unseren geerbten OpenZeppelin-Verträgen zu verdanken, die die meisten Methoden implementieren, die wir zur Erstellung eines NFTs benötigen, wie z. B. `ownerOf`, die den Eigentümer des NFTs zurückgibt, und `transferFrom`, die das Eigentum am NFT von einem Konto auf ein anderes überträgt.

In unserem ERC-721-Konstruktor werden Sie feststellen, dass wir 2 Strings übergeben, „MyNFT“ und „NFT“. Die erste Variable ist der Name des Smart Contracts und die zweite ist sein Symbol. Sie können jede dieser Variablen benennen, wie Sie möchten!

Schließlich haben wir unsere Funktion `mintNFT(address recipient, string memory tokenURI)`, die es uns ermöglicht, einen NFT zu prägen! Sie werden feststellen, dass diese Funktion zwei Variablen aufnimmt:

- `address recipient` gibt die Adresse an, die Ihren frisch geprägten NFT erhalten wird.

- `string memory tokenURI` ist ein String, der auf ein JSON-Dokument verweisen sollte, das die Metadaten des NFTs beschreibt. Die Metadaten eines NFTs sind das, was ihn wirklich zum Leben erweckt und es ihm ermöglicht, konfigurierbare Eigenschaften wie Name, Beschreibung, Bild und andere Attribute zu haben. In Teil 2 dieses Tutorials werden wir beschreiben, wie diese Metadaten konfiguriert werden.

`mintNFT` ruft einige Methoden aus der geerbten ERC-721-Bibliothek auf und gibt letztendlich eine Zahl zurück, die die ID des frisch geprägten NFTs darstellt.

## Schritt 11: Verbinden Sie MetaMask & Alchemy mit Ihrem Projekt {#connect-metamask-and-alchemy}

Nachdem wir nun ein MetaMask-Wallet und ein Alchemy-Konto erstellt sowie unseren Smart Contract geschrieben haben, ist es an der Zeit, die drei zu verbinden.

Jede Transaktion, die von Ihrem virtuellen Wallet gesendet wird, erfordert eine Signatur mit Ihrem eindeutigen Private-Key. Um unserem Programm diese Berechtigung zu erteilen, können wir unseren Private-Key (und den Alchemy-API-Schlüssel) sicher in einer Umgebungsdatei speichern.

Um mehr über das Senden von Transaktionen zu erfahren, schauen Sie sich [dieses Tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) zum Senden von Transaktionen mit Web3 an.

Installieren Sie zunächst das dotenv-Paket in Ihrem Projektverzeichnis:

    npm install dotenv --save

Erstellen Sie dann eine `.env`-Datei im Stammverzeichnis unseres Projekts und fügen Sie Ihren MetaMask Private-Key und die HTTP-Alchemy-API-URL hinzu.

- Folgen Sie [diesen Anweisungen](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um Ihren Private-Key aus MetaMask zu exportieren.

- Siehe unten, um die HTTP-Alchemy-API-URL zu erhalten und in Ihre Zwischenablage zu kopieren.

![Kopieren Sie Ihre Alchemy-API-URL](./copy-alchemy-api-url.gif)

Ihre `.env` sollte nun so aussehen:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Um diese tatsächlich mit unserem Code zu verbinden, werden wir in Schritt 13 in unserer hardhat.config.js-Datei auf diese Variablen verweisen.

<EnvWarningBanner />

## Schritt 12: Installieren Sie Ethers.js {#install-ethers}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen, indem sie [Standard-JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) in benutzerfreundlichere Methoden verpackt.

Hardhat macht es super einfach, [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) für die Vertragsbereitstellung nutzen ([Ethers.js](https://github.com/ethers-io/ethers.js/) hat einige sehr saubere Methoden zur Vertragsbereitstellung).

Tippen Sie in Ihrem Projektverzeichnis:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Wir werden im nächsten Schritt auch Ethers in unserer hardhat.config.js benötigen.

## Schritt 13: Aktualisieren Sie hardhat.config.js {#update-hardhat-config}

Wir haben bisher mehrere Abhängigkeiten und Plugins hinzugefügt, jetzt müssen wir hardhat.config.js aktualisieren, damit unser Projekt von allen weiß.

Aktualisieren Sie Ihre hardhat.config.js so, dass sie wie folgt aussieht:

```js
    /* *
    * @type import('hardhat/config').HardhatUserConfig */
    


    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## Schritt 14: Kompilieren Sie unseren Vertrag {#compile-contract}

Um sicherzustellen, dass bisher alles funktioniert, lassen Sie uns unseren Vertrag kompilieren. Die Kompilierungsaufgabe ist eine der integrierten Hardhat-Aufgaben.

Führen Sie in der Kommandozeile Folgendes aus:

    npx hardhat compile

Möglicherweise erhalten Sie eine Warnung, dass der SPDX-Lizenzidentifikator in der Quelldatei nicht angegeben ist, aber darüber müssen Sie sich keine Sorgen machen – hoffentlich sieht alles andere gut aus! Wenn nicht, können Sie jederzeit im [Alchemy Discord](https://discord.gg/u72VCg3) eine Nachricht schreiben.

## Schritt 15: Schreiben Sie unser Bereitstellungsskript {#write-deploy}

Da unser Vertrag nun geschrieben ist und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, unser Skript zur Vertragsbereitstellung zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`, der Sie den folgenden Inhalt hinzufügen:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Startet die Bereitstellung und gibt ein Promise zurück, das zu einem Contract-Objekt aufgelöst wird.
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat leistet hervorragende Arbeit bei der Erklärung, was jede dieser Codezeilen in ihrem [Contracts-Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) tut, wir haben ihre Erklärungen hier übernommen.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Eine ContractFactory in ethers.js ist eine Abstraktion, die zur Bereitstellung neuer Smart Contracts verwendet wird, also ist MyNFT hier eine Fabrik für Instanzen unseres NFT-Vertrags. Bei Verwendung des hardhat-ethers-Plugins sind ContractFactory- und Contract-Instanzen standardmäßig mit dem ersten Unterzeichner verbunden.

    const myNFT = await MyNFT.deploy();

Der Aufruf von deploy() auf einer ContractFactory startet die Bereitstellung und gibt ein Promise zurück, das in einen Contract aufgelöst wird. Dies ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen hat.

## Schritt 16: Stellen Sie unseren Vertrag bereit {#deploy-contract}

Wir sind endlich bereit, unseren Smart Contract bereitzustellen! Navigieren Sie zurück zum Stammverzeichnis Ihres Projekts und führen Sie in der Kommandozeile Folgendes aus:

    npx hardhat --network sepolia run scripts/deploy.js

Sie sollten dann so etwas sehen:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Wenn wir zum [Sepolia Etherscan](https://sepolia.etherscan.io/) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Wenn Sie sie nicht sofort sehen können, warten Sie bitte eine Weile, da dies einige Zeit dauern kann. Die Transaktion wird in etwa so aussehen:

![Sehen Sie sich Ihre Transaktionsadresse auf Etherscan an](./etherscan-sepoila-contract-creation.png)

Die From-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und die To-Adresse wird „Contract Creation“ anzeigen. Wenn wir in die Transaktion klicken, sehen wir unsere Vertragsadresse im To-Feld:

![Sehen Sie sich Ihre Vertragsadresse auf Etherscan an](./etherscan-sepolia-tx-details.png)

Jaaaaa! Sie haben gerade Ihren NFT-Smart-Contract auf der Ethereum-Chain (Testnet) bereitgestellt!

Um zu verstehen, was unter der Haube passiert, navigieren wir zum Explorer-Tab in unserem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/explorer). Wenn Sie mehrere Alchemy-Apps haben, stellen Sie sicher, dass Sie nach App filtern und „MyNFT“ auswählen.

![Sehen Sie sich die „unter der Haube“ getätigten Aufrufe mit dem Explorer-Dashboard von Alchemy an](./alchemy-explorer-goerli.png)

Hier sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers unter der Haube für uns gemacht haben, als wir die Funktion .deploy() aufgerufen haben. Zwei wichtige, die hier hervorgehoben werden sollten, sind [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), was die Anfrage ist, unseren Smart Contract tatsächlich auf die Sepolia-Chain zu schreiben, und [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), was eine Anfrage ist, um Informationen über unsere Transaktion anhand des Hashs zu lesen (ein typisches Muster beim Senden von Transaktionen). Um mehr über das Senden von Transaktionen zu erfahren, schauen Sie sich dieses Tutorial zum [Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) an.

Das war's für Teil 1 dieses Tutorials. In [Teil 2 werden wir tatsächlich mit unserem Smart Contract interagieren, indem wir einen NFT prägen](/developers/tutorials/how-to-mint-an-nft/), und in [Teil 3 zeigen wir Ihnen, wie Sie Ihren NFT in Ihrem Ethereum-Wallet anzeigen können](/developers/tutorials/how-to-view-nft-in-metamask/)!