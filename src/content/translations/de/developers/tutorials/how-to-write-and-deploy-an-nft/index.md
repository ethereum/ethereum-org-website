---
title: So erstellen und veröffentlichen Sie einen NFT (Teil 1/3 von unserer NFT-Tutorialreihe)
description: Dieses Tutorial ist Teil 1 einer Serie über NFTs, die Ihnen Schritt für Schritt zeigt, wie Sie einen Non Fungible Token (ERC-721 Token) Smart Contract mit Ethereum und Inter Planetary File System (IPFS) erstellen und veröffentlichen.
author: "Sumi Mudgil"
tags:
  - "NFTs"
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "Smart Contracts"
skill: beginner
lang: de
published: 2021-04-22
---

Mit NFTs ist die Blockchain ins Auge der Öffentlichkeit gerückt. Das ist nun eine ausgezeichnete Gelegenheit, sich selbst ein Bild über diesen Hype zu machen. Veröffentlichen Sie dafür Ihren eigenen NFT (ERC-721 Token) auf der Ethereum-Blockchain.

Alchemy ist sehr stolz darauf, die größten Namen im NFT-Bereich zu unterstützen, darunter Makersplace (kürzlich wurde ein Rekordverkauf digitaler Kunstwerke bei Christie's für 69 Millionen USD verzeichnet), Dapper Labs (Entwickler von NBA Top Shot & Crypto Kitties), OpenSea (der weltweit größte NFT-Marktplatz), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable und viele mehr.

In diesem Tutorial erfahren Sie, wie Sie im Ropsten-Testnet mithilfe von [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) und [Alchemy](https://alchemy.com/signup/eth) einen ERC-721-Smart Contract erstellen und bereitstellen (keine Sorge, wenn Sie jetzt noch nicht wissen, was das alles bedeutet, wir werden Ihnen das erklären).

In Teil 2 dieses Tutorials erläutern wir, wie Sie mit diesem Smart Contract einen NFT prägen können, in Teil 3 wird behandelt, wie Sie Ihren NFT auf MetaMask anzeigen können.

Wenn Sie zu irgendeinem Zeitpunkt Fragen haben, melden Sie sich gerne im [Alchemy Discord](https://discord.gg/gWuC7zB) oder rufen Sie die [NFT-API-Dokumentation von Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api).

## Schritt 1: Verbindung mit dem Ethereum-Netzwerk {#connect-to-ethereum}

Es gibt eine Reihe von Möglichkeiten, Anfragen an die Ethereum Blockchain zu stellen, der Einfachheit halber verwenden wir ein kostenloses Konto bei [Alchemy](https://alchemy.com/signup/eth), einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne dass wir unsere eigenen Nodes betreiben müssen.

In diesem Tutorial werden wir auch die Alchemy-Entwicklertools für die Überwachung und Analyse nutzen, um zu verstehen, was sich hinter unserer Smart-Contract-Bereitstellung verbirgt. Wenn Sie noch kein Alchemy-Konto haben, können Sie sich [hier](https://alchemy.com/signup/eth) kostenlos registrieren.

## Schritt 2: App (und den API-Schlüssel) erstellen {#make-api-key}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren, indem Sie eine App erstellen. Dadurch können wir Anfragen an das Ropsten-Testnet stellen. In [diesem Leitfaden](https://docs.alchemyapi.io/guides/choosing-a-network) erfahren Sie mehr über Testnetzwerke.

1. Klicken Sie in Ihrem Alchemy-Dashboard in der Navigationsleiste unter "Apps" auf "Create App" (App erstellen), um auf die Seite "Create App" (App erstellen) zu gelangen.

![App erstellen](./create-your-app.png)

2. Geben Sie Ihrer App einen Namen (wir haben uns für "My First NFT!" entschieden), eine kurze Beschreibung, wählen Sie "Staging" für die Umgebung (für die Buchhaltung Ihrer App) und "Ropsten" als Netzwerk.

![App konfigrurieren und veröffentlichen](./configure-and-publish-your-app.png)

3. Klicken Sie auf “Create app” (App erstellen) und schon sind Sie fertig. Die App sollte in der untenstehenden Tabelle erscheinen.

## Schritt 3: Ethereum-Konto (Adresse) erstellen {#create-eth-address}

Zum Versenden und Empfangen von Transaktionen benötigen Sie ein Ethereum-Konto. In diesem Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, mit der Sie Ihre Ethereum-Kontoadresse verwalten können. Wenn Sie mehr über Transaktionen auf Ethereum erfahren möchten, besuchen Sie [diese Seite](/developers/docs/transactions/) von der Ethereum Foundation.

Sie können [hier](https://metamask.io/download.html) MetaMask kostenlos herunterladen und ein Konto erstellen. Wie Sie ein neues Konto erstellen oder wenn Sie bereits ein Konto haben, stellen Sie bitte sicher, dass Sie zum Ropsten-Testnet oben rechts wechseln (um sicherzustellen, dass Sie nicht mit echtem Geld handeln).

![Ropsten als Netzwerk festlegen](./metamask-ropsten.png)

## Schritt 4: Ether von einem Faucet hinzufügen {#step-4-add-ether-from-a-faucet}

Um unseren Smart Contract in das Testnetzwerk integrieren zu können, benötigen wir ein paar Fake-ETH. Um ETH zu erhalten, können Sie zu [FaucETH](https://fauceth.komputing.org) navigieren und Ihre Ropsten-Kontoadresse eingeben. Klicken Sie dort auf "Request funds" (Geld anfordern), wählen Sie im Dropdown-Menü "Ethereum Testnet Ropsten" (Ethereum-Testnet Ropsten) und klicken Sie dann nochmals auf die Schaltfläche "Request funds" (Geld anfordern). Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen.

## Schritt 5: Kontostand überprüfen {#check-balance}

Um zu überprüfen, ob Sie das Guthaben erhalten haben, stellen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage über das [Composer-Tool von Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Das gibt den ETH-Betrag in unserem Wallet wieder. Nachdem Sie die Adresse Ihres MetaMask-Kontos eingegeben und auf “Send Request” (Anforderung senden) geklickt haben, sollten Sie eine Antwort ähnlich der Folgenden erhalten:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

**HINWEIS: **Dieses Ergebnis ist in Wei, nicht in ETH. Wei ist die kleinste Einheit von Ether. Die Umrechnung von Wei auf ETH ist: 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl konvertieren, erhalten wir 1\*10<sup>18</sup> Wei und das entspricht 1 ETH.

Puh! Unser Falschgeld ist da.

## Schritt 6: Projekt initialisieren {#initialize-project}

Zunächst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zur Befehlszeile und geben Sie Folgendes ein:

    mkdir my-nft
    cd my-nft

Jetzt, da wir uns in unserem Projektordner befinden, verwenden wir "npm init" um das Projekt zu starten. Wenn Sie npm noch nicht installiert haben, folgen Sie [dieser Anleitung](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (wir brauchen auch [Node.js](https://nodejs.org/en/download/), also laden Sie das auch herunter).

    npm init

Es spielt keine Rolle, wie Sie die Fragen zur Installation beantworten, aber wir haben es folgendermaßen gemacht:

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

Genehmigen Sie die Datei "package.json" und schon kann es losgehen.

## Schritt 7: [Hardhat](https://hardhat.org/getting-started/#overview) installieren {#install-hardhat}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern bei der lokalen Erstellung von Smart Contracts und dApps, bevor diese auf der Live-Chain bereitgestellt werden.

Innerhalb unseres my-nft-Projektlaufs:

    npm install --save-dev hardhat

Auf dieser Seite finden Sie weitere Informationen zur [Installationsanleitung](https://hardhat.org/getting-started/#overview).

## Schritt 8: Hardhat-Projekt erstellen {#create-hardhat-project}

Führen Sie folgeden Befehl in unserem Projektordner aus:

    npx hardhat

Sie sollten dann eine Willkommensnachricht sehen und die Möglichkeit haben, auszuwählen, wie Sie fortfahren möchten. Wählen Sie "create an empty hardhat.config.js" (Leere hardhat.config.js erstellen) aus:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? Was möchten Sie tun? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Darüber wird eine hardhat.config.js-Datei für uns generiert, in der alle Einstellungen für unser Projekt angeben werden (in Schritt 13).

## Schritt 9: Projektordner hinzufügen {#add-project-folders}

Um unser Projekt zu organisieren, erstellen wir zwei neue Ordner. Navigieren Sie in der Befehlszeile zum Stammverzeichnis Ihres Projekts und geben Sie Folgendes ein:

    mkdir contracts
    mkdir scripts

- contracts/ ist der Ort, an dem wir unseren NFT-Smart-Contract-Code aufbewahren werden.

- scripts/ ist der Ort, an dem wir Skripte veröffentlichen und mit unseren Smart Contract interagieren.

## Schritt 10: Vertrag schreiben {#write-contract}

Nachdem unsere Umgebung nun eingerichtet ist, kommen wir zu spannenderen Dingen: _Wir schreiben unseren Smart-Contract-Code._

Öffnen sie das my-nft-Projekt in ihrem favorisierten Ordner (wir bevorzugen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben. Damit werden wir auch unseren Smart Contract MyNFT.sol schreiben.

1. Navigieren Sie zum Ordner `Contracts` (Verträge) und erstellen Sie eine neue Datei namens MyNFT.sol.

2. Im Folgenden finden Sie den NFT-Smart-Contract-Code, der auf der ERC-721-Implementierung der [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721)-Bibliothek basiert. Kopieren Sie folgenden Inhalt und fügen Sie ihn in die Datei MyNFT.sol ein.

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Weil wir Klassen der OpenZeppelin-Vertragsbibliothek erben, geben Sie `npm install @openzeppelin/contracts` in die Befehlszeile ein, um die Bibliothek in Ihrem Ordner zu installieren.

Doch was _macht_ dieser Code denn genau? Sehen wir uns das gemeinsam Zeil für Zeile an.

Am Anfang unseres Smart Contracts importieren wir drei [OpenZeppelin](https://openzeppelin.com/)-Smart-Contract-Klassen:

- @openzeppelin/contracts/token/ERC721/ERC721.sol enthält eine Implementierung des ERC-721-Standards, den unser NFT-Smart-Contract erben wird. (Damit der NFT auch Gültikeit erlangt, muss Ihr Smart Contract alle Methoden des ERC-721-Standards implementieren.) In der Schnittstellendefinition [hier](https://eips.ethereum.org/EIPS/eip-721) erfahren Sie mehr über die vererbten ERC-721-Funktionen.

- @openzeppelin/contracts/utils/Counters.sol stellt Zähler zur Verfügung, die jeweils nur um eins erhöht oder verringert werden können. Unser Smart Contract benutzt einen Zähler, um die Gesamtanzahl der geprägten NFTs zu überprüfen und eine eindeutige ID für unseren neuen NFT festzulegen. (Jedem NFT, der durch die Benutzung eines Smart Contracts geprägt wird, muss eine eindeutige ID zugewiesen werden. In diesem Beispiel wird unsere eindeutige ID einfach deterministisch über die Gesamtanzahl der existierenden NFTs bestimmt. Zum Beispiel hat der erste NFT, der mit unserem Smart Contract geprägt wird, die ID "1", unser zweiter NFT hat die ID "2" usw.)

- @openzeppelin/contracts/access/Ownable.sol richtet eine [Zugriffskontrolle](https://docs.openzeppelin.com/contracts/3.x/access-control) in unserem Smart Contract ein, so dass nur der Besitzer des Smart Contracts (also Sie) NFTs prägen kann. (Hinweis, die Einbeziehung der Zugriffskontrolle ist optional. Wenn Sie möchten, dass mit Ihrem Smart Contract jeder NFTs prägen kann, entfernen Sie das Wort "Ownable" in Zeile 10 und "onlyOwner" in Zeile 17.)

Nach unseren Importanweisungen haben wir unseren benutzerdefinierten Smart Contract, der überraschend kurz ist , denn er enthält nur einen Zähler, einen Konstruktor und eine einzige Funktion. Das ist unseren vererbten OpenZeppelin-Contracts zu verdanken, die einen Großteil der Methoden implementieren, die wir zur Erstellung eines NFT benötigen, wie `ownerOf`, was den Besitzer des NFT zurückgibt, und `transferFrom`, was das Eigentum an einem NFT von einem Konto zu einem anderen überträgt.

Sie werden feststellen, dass wir in unserem ERC-721-Konstruktor zwei Zeichenfolgen übergeben: "MyNFT" und "NFT". Die erste Variable ist der Name des Smart Contracts und die zweite ist sein Symbol. Sie können jede der beiden Variablen benennen wie sie möchten.

Schließlich haben wir unsere Funktion `mintNFT(address recipient, string memory tokenURI)`, mit der wir einen NFT prägen können. Sie werden bemerken, dass diese Funktion zwei Variablen benötigt:

- `address recipient` gibt die Adresse an, die den frisch geprägten NFT erhalten soll.

- `string memory tokenURI` ist eine Zeichenfolge, die auf ein JSON-Dokument zeigt, das die Metadaten des NFT beschreibt. Die Metadaten eines NFT, sind das Element, das den NFT wirklich zum Leben erwecken. Sie schaffen die Grundlage, dass ein NFT konfigurierbare Eigenschaften wie einen Namen, eine Beschreibung ein Bild und andere Attribute haben kann. In Teil 2 dieses Tutorials wird die Konfiguration dieser Metadaten beschrieben.

`mintNFT` ruft bestimmte Methoden der vererbten ERC-721-Bibliothek auf und gibt eine Zahl zurück, die für die ID des frisch geprägten NFT steht.

## Schritt 11: MetaMask und Alchemy mit ihrem Projekt mit Ihrem Projekt verbinden {#connect-metamask-and-alchemy}

Nachdem wir nun eine MetaMask-Wallet und ein Alchemy-Konto erstellt uns unseren Smart Contract geschrieben haben, ist es an der Zeit, die drei Elemente miteinander zu verbinden.

Jede Transaktion, die von Ihrer virtuellen Wallet gesendet wird, benötigt eine Signatur mit ihrem eindeutigen privaten Schlüssel. Um unser Programm mit dieser Berechtigung auszustatten, können wir unseren privaten Schlüssel (und Alchemy-API-Schlüssel) in einer Umgebungsdatei sicher abspeichern.

Wenn Sie mehr über das Senden von Transaktionen erfahren möchten, schauen Sie sich [dieses Tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) über das senden von Transaktionen mit Web3 an.

Installieren Sie zuerst das dotenv-Paket in Ihrem Projektverzeichnis:

    npm install dotenv --save

Danach erstellen Sie eine `.env`-Datei im Hauptverzeichnis des Projekts und fügen den privaten Schlüssel von MetaMask und die HTTP-URL der Alchemy-API hinzu.

- Befolgen Sie [diese Anweisungen](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um Ihren privaten Schlüssel aus MetaMask zu importieren.

- Unten wird erläutert, wie Sie die HTTP-URL der Alchemy-API erhalten und in die Zwischenablage kopieren.

![Alchemy-API-URL kopieren](./copy-alchemy-api-url.gif)

Ihre `.env`-Datei sollte nun wie folgt aussehen:

    API_URL="https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Um nun die Verbindung mit unserem Code zu erstellen, werden wir diese Variablen in der Datei hardhat.config.js in Schritt 13 referenzieren.

<InfoBanner isWarning>
Führen Sie keinen Commit für <code>.env</code> aus. Stellen Sie sicher, dass Sie Ihre <code>.env</code>-Datei niemals an andere weitergeben, denn damit würden Sie Ihre geheimen Daten weitergeben. Wenn Sie die Versionskontrolle verwenden, fügen Sie Ihre <code>Env-Datei</code> zu einer Datei <a href="https://git-scm.com/docs/gitignore">gitignore</a> hinzu.
</InfoBanner>

## Schritt 12: Ethers.js installieren {#install-ethers}

Ethers.js ist eine Bibliothek, die es einfacher macht, mit Ethereum zu interagieren und Anfragen zu stellen. Dafür schließt sie [Standard-JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) in benutzerfreundlichere Methoden ein.

Hardhat macht es sehr einfach [Plug-ins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionen zu integrieren. Wir werden das [Ethers-Plug-in](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) für die Bereitstellung von Verträgen nutzen ([Ethers.js](https://github.com/ethers-io/ethers.js/) bietet einige sehr saubere Methoden zur Bereitstellung von Verträgen).

Geben Sie Folgendes in Ihrem Projektverzeichnis ein:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Im nächsten Schritt benötigen wir auch Ether in unserer hardhat.config.js.

## Schritt 13: hardhat.config.js aktualisieren {#update-hardhat-config}

Wir haben bisher mehrere Abhängigkeiten und Plug-ins hinzugefügt. Jetzt müssen wir hardhat.config.js aktualisieren, damit unser Projekt über alle diese Abhängigkeiten informiert wird.

Aktualisieren Sie Ihre hardhat.config.js so, dass sie wie folgt aussieht:

    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "ropsten",
       networks: {
          hardhat: {},
          ropsten: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }

## Schritt 14: Vertrag kompilieren {#compile-contract}

Um sicherzugehen, dass so weit alles funktioniert, sollten wir unseren Vertrag erstellen. Die Aufgabe compile ist eine der integrierten Hardhat-Aufgaben.

Führen Sie folgenden Befehl in der Befehlszeile aus:

    npx hardhat compile

Möglicherweise erhalten Sie eine Warnung, dass die SPDX-Lizenzkennung nicht in Quelldatei angegeben sei. Doch darüber brauchen Sie sich keine Sorgen zu machen. Alles andere sieht hoffentlich gut aus. Falls nicht, können Sie jederzeit eine Nachricht im [Alchemy Discord](https://discord.gg/u72VCg3) hinterlassen.

## Schritt 15: Bereitstellungsskript schreiben {#write-deploy}

Nun, da unser Vertrag geschrieben und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, das Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum Ordner `scripts/` und erstellen Sie eine neue Datei namens `deploy.js`. Fügen Sie folgende Inhalte hinzu:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
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

Hardhat erklärt in seinem [Vertragstutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) sehr gut, was die einzelnen Codezeilen bewirken. Wir haben diese Erklärungen hier übernommen.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Eine ContractFactory in ethers.js ist eine Abstraktion, die dazu dient, neue Smart Contracts einzusetzen. So ist MyNFT eine Factory für Instanzen von unseren NFT-Vertrag. Wenn Sie das hardhat-ethers-Plug-in verwenden, werden die Instanzen ContractFactory und Contract standardmäßig mit dem ersten Unterzeichner verbunden.

    const myNFT = await MyNFT.deploy();

Mit dem Aufruf von deploy() über eine ContractFactory wird die Bereitstellung gestartet. Zurückgegeben wird eine Referenz, die auf einen Vertrag zeigt. Das ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen enthält.

## Schritt 16: Vertragsbereitstellung {#deploy-contract}

Nun sind wir endlich bereit, unseren Smart Contract bereitzustellen. Navigieren Sie zurück zu Ihrem Stammverzeichnis und führen Sie Folgendes über die Befehlszeile aus:

    npx hardhat --network ropsten run scripts/deploy.js

Sie sollten dann etwas sehen wie:

    Contract deployed to address: 0x81c587EB0fE773404c42c1d2666b5f557C470eED

Wenn wir den [Ropsten-Etherscan](https://ropsten.etherscan.io/) aufrufen und nach unserer Vertragsadresse suchen, sollten wir sehen, dass sie erfolgreich bereitgestellt wurde. Wenn sie nicht sofort angezeigt wird, haben Sie etwas Geduld, denn dieser Vorgang kann einige Zeit in Anspruch nehmen. Die Transaktion wird ungefähr so aussehen:

![Transaktionsadresse auf Etherscan einsehen](./etherscan-transaction.png)

Die Absenderadresse sollte mit der Adresse ihres MetaMask-Kontos übereinstimmen und in der Empfängeradresse sollte "Contract Creation" (Vertragserstellung) stehen. Wenn wir auf die Transaktion klicken ,sehen wir unsere Vertragsadresse im Empfängerfeld:

![Vertragsadresse auf Etherscan anzeigen](./etherscan-contract.png)

Großartig! Sie haben soeben Ihren NFT-Smart-Contract auf der Ethereum-Chain bereitgestellt.

Um zu verstehen, was im Verborgenen vor sich geht, navigieren wir zur Explorer-Registerkarte in unserem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/explorer). Wenn Sie mehrere Alchemy-Apps besitzen, filtern Sie nach Apps und wählen Sie "MyNFT" aus.

![Mit dem Explorer-Dashboard von Alchemy Aufrufe einsehen, die im Verborgenen erfolgen](./alchemy-explorer.png)

Hier sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers implementiert hat, als wir die .deploy()-Funktion aufgerufen haben. Zwei wichtige Funktionen, die hier aufzuführen sind, ist die [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), die eine Anforderung zum Schreiben unseres Smart Contracts auf der Ropsten-Chain ist, und [eth_getTranscationByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), die eine Anforderung ist, um Informationen über unsere Transaktion zu lesen, die vom Hash gegeben werden (ein typisches Muster beim Senden von Transaktionen). Wenn Sie mehr über das Senden von Transaktionen erfahren möchten, schauen Sie sich diese Anleitung an: [Transaktionen mit Web3 senden](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Damit sind wir am Ende vom ersten Teil dieses Tutorials. In [Teil 2 werden wir mit unserem Smart Contract interagieren, indem wir einen NFT prägen](/developers/tutorials/how-to-mint-an-nft/). In [Teil 3 werden wir Ihnen zeigen, wie Sie Ihren NFT in Ihrer Ethereum-Wallet sehen können](/developers/tutorials/how-to-view-nft-in-metamask/).
