---
title: "So erstellen und veröffentlichen Sie einen NFT (Teil 1/3 der NFT-Tutorial-Reihe)"
description: "Dieses Tutorial ist Teil 1 einer Serie über NFTs, die Ihnen Schritt für Schritt zeigt, wie Sie einen Non Fungible Token (ERC-721 Token) Smart Contract mit Ethereum und Inter Planetary File System (IPFS) erstellen und veröffentlichen."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "smart contracts"]
skill: beginner
lang: de
published: 2021-04-22
---

Da NFTs die Blockchain ins Rampenlicht der Öffentlichkeit rücken, ist dies eine hervorragende Gelegenheit, den Hype selbst zu verstehen, indem Sie Ihren eigenen NFT-Vertrag (ERC-721-Token) auf der Ethereum-Blockchain veröffentlichen!

Alchemy ist sehr stolz darauf, die größten Namen im NFT-Bereich zu unterstützen, darunter Makersplace (kürzlich wurde ein Rekordverkauf digitaler Kunstwerke bei Christie's für 69 Millionen USD verzeichnet), Dapper Labs (Entwickler von NBA Top Shot & Crypto Kitties), OpenSea (der weltweit größte NFT-Marktplatz), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable und viele mehr.

In diesem Tutorial führen wir Sie durch die Erstellung und Bereitstellung eines ERC-721-Smart-Contracts im Sepolia-Testnet unter Verwendung von [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) und [Alchemy](https://alchemy.com/signup/eth) (keine Sorge, wenn Sie noch nicht verstehen, was das alles bedeutet – wir werden es erklären!).

In Teil 2 dieses Tutorials erläutern wir, wie Sie mit diesem Smart Contract einen NFT prägen können, in Teil 3 wird behandelt, wie Sie Ihren NFT auf MetaMask anzeigen können.

Wenn Sie an irgendeiner Stelle Fragen haben, können Sie sich natürlich jederzeit im [Alchemy Discord](https://discord.gg/gWuC7zB) melden oder die [NFT-API-Dokumentation von Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) besuchen!

## Schritt 1: Mit dem Ethereum-Netzwerk verbinden {#connect-to-ethereum}

Es gibt eine Reihe von Möglichkeiten, Anfragen an die Ethereum-Blockchain zu stellen, aber der Einfachheit halber verwenden wir ein kostenloses Konto bei [Alchemy](https://alchemy.com/signup/eth), einer Blockchain-Entwicklerplattform und API, die es uns ermöglicht, mit der Ethereum-Chain zu kommunizieren, ohne unsere eigenen Nodes betreiben zu müssen.

In diesem Tutorial werden wir auch die Alchemy-Entwicklertools für die Überwachung und Analyse nutzen, um zu verstehen, was sich hinter unserer Smart-Contract-Bereitstellung verbirgt. Wenn Sie noch kein Alchemy-Konto haben, können Sie sich [hier](https://alchemy.com/signup/eth) kostenlos anmelden.

## Schritt 2: Ihre App (und Ihren API-Schlüssel) erstellen {#make-api-key}

Sobald Sie ein Alchemy-Konto erstellt haben, können Sie einen API-Schlüssel generieren. Erstellen Sie dafür eine App. Dies ermöglicht es uns, Anfragen an das Sepolia-Testnet zu senden. Sehen Sie sich [diesen Leitfaden](https://docs.alchemyapi.io/guides/choosing-a-network) an, wenn Sie mehr über Testnetze erfahren möchten.

1. Klicken Sie in Ihrem Alchemy-Dashboard in der Navigationsleiste unter "Apps" auf "Create App" (App erstellen), um auf die Seite "Create App" (App erstellen) zu gelangen.

![Erstellen Sie Ihre App](./create-your-app.png)

2. Benennen Sie Ihre App (wir haben „Mein erster NFT!“ gewählt), geben Sie eine kurze Beschreibung an, wählen Sie „Ethereum“ als Chain und „Sepolia“ als Ihr Netzwerk. Seit The Merge sind die anderen Testnetze veraltet.

![Ihre App konfigurieren und veröffentlichen](./alchemy-explorer-sepolia.png)

3. Klicken Sie auf “Create app” (App erstellen) und schon sind Sie fertig. Die App sollte in der untenstehenden Tabelle erscheinen.

## Schritt 3: Ethereum-Konto (Adresse) erstellen {#create-eth-address}

Zum Versenden und Empfangen von Transaktionen benötigen Sie ein Ethereum-Konto. In diesem Tutorial verwenden wir MetaMask, eine virtuelle Wallet im Browser, mit der Sie Ihre Ethereum-Kontoadresse verwalten können. Wenn Sie mehr darüber erfahren möchten, wie Transaktionen auf Ethereum funktionieren, sehen Sie sich [diese Seite](/developers/docs/transactions/) der Ethereum Foundation an.

Sie können MetaMask [hier](https://metamask.io/download) kostenlos herunterladen und ein Konto erstellen. Wenn Sie ein Konto erstellen oder bereits eines haben, stellen Sie sicher, dass Sie oben rechts zum „Sepolia Test Network“ wechseln (damit wir nicht mit echtem Geld arbeiten).

![Sepolia als Ihr Netzwerk festlegen](./metamask-goerli.png)

## Schritt 4: Ether von einem Faucet hinzufügen {#step-4-add-ether-from-a-faucet}

Um unseren Smart Contract in das Testnetzwerk integrieren zu können, benötigen wir ein paar Fake-ETH. Um ETH zu erhalten, können Sie zum von Alchemy gehosteten [Sepolia Faucet](https://sepoliafaucet.com/) gehen, sich anmelden, Ihre Kontoadresse eingeben und auf „Send Me ETH“ klicken. Sie sollten kurz darauf ETH in Ihrem MetaMask-Konto sehen.

## Schritt 5: Kontostand überprüfen {#check-balance}

Um zu überprüfen, ob unser Guthaben vorhanden ist, stellen wir eine [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)-Anfrage mit dem [Composer-Tool von Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Das gibt den ETH-Betrag in unserem Wallet wieder. Nachdem Sie die Adresse Ihres MetaMask-Kontos eingegeben und auf “Send Request” (Anforderung senden) geklickt haben, sollten Sie eine Antwort ähnlich der Folgenden erhalten:

    ```
    `{\"jsonrpc\": \"2.0\", \"id\": 0, \"result\": \"0xde0b6b3a7640000\"}`
    ```

> **Hinweis:** Dieses Ergebnis ist in Wei, nicht in ETH. Wei ist die kleinste Einheit von Ether. Die Umrechnung von Wei auf ETH ist: 1 ETH = 10<sup>18</sup> Wei. Wenn wir also 0xde0b6b3a7640000 in eine Dezimalzahl konvertieren, erhalten wir 1\*10<sup>18</sup> Wei und das entspricht 1 ETH.

Puh! Unser Falschgeld ist da.

## Schritt 6: Unser Projekt initialisieren {#initialize-project}

Zunächst müssen wir einen Ordner für unser Projekt erstellen. Navigieren Sie zur Befehlszeile und geben Sie Folgendes ein:

    ```
    mkdir my-nft
    cd my-nft
    ```

Jetzt, da wir uns in unserem Projektordner befinden, verwenden wir "npm init" um das Projekt zu starten. Wenn Sie npm noch nicht installiert haben, befolgen Sie [diese Anweisungen](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (wir benötigen auch [Node.js](https://nodejs.org/en/download/), also laden Sie das auch herunter!).

    ```
    npm init
    ```

Es spielt keine Rolle, wie Sie die Fragen zur Installation beantworten, aber wir haben es folgendermaßen gemacht:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: Mein erster NFT!
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
      "description": "Mein erster NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Genehmigen Sie die Datei "package.json" und schon kann es losgehen.

## Schritt 7: [Hardhat](https://hardhat.org/getting-started/#overview) installieren {#install-hardhat}

Hardhat ist eine Entwicklungsumgebung zum Kompilieren, Bereitstellen, Testen und Debuggen Ihrer Ethereum-Software. Es hilft Entwicklern Smart Contracts und dApps lokal zu erstellen, bevor diese auf der Live-Chain bereitgestellt werden.

Innerhalb unseres my-nft-Projektlaufs:

    ```
    npm install --save-dev hardhat
    ```

Weitere Details zu den [Installationsanweisungen](https://hardhat.org/getting-started/#overview) finden Sie auf dieser Seite.

## Schritt 8: Hardhat-Projekt erstellen {#create-hardhat-project}

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
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? Was möchten Sie tun? …
    Ein Beispielprojekt erstellen
    ❯ Eine leere hardhat.config.js erstellen
    Beenden
    ```

Darüber wird eine hardhat.config.js-Datei für uns generiert, in der alle Einstellungen für unser Projekt angeben werden (in Schritt 13).

## Schritt 9: Projektordner hinzufügen {#add-project-folders}

Um unser Projekt zu organisieren, erstellen wir zwei neue Ordner. Navigieren Sie in der Befehlszeile zum Stammverzeichnis Ihres Projekts und geben Sie Folgendes ein:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ ist der Ort, an dem wir unseren NFT-Smart-Contract-Code aufbewahren werden.

- scripts/ ist der Ort, an dem wir Skripte veröffentlichen und mit unseren Smart Contract interagieren.

## Schritt 10: Unseren Vertrag schreiben {#write-contract}

Jetzt, da unsere Umgebung eingerichtet ist, geht es an die aufregenderen Dinge: _das Schreiben unseres Smart-Contract-Codes!_

Öffnen Sie das my-nft-Projekt in Ihrem bevorzugten Editor (wir mögen [VSCode](https://code.visualstudio.com/)). Smart Contracts werden in einer Sprache namens Solidity geschrieben. Damit werden wir auch unseren Smart Contract MyNFT.sol schreiben.

1. Navigieren Sie zum `contracts`-Ordner und erstellen Sie eine neue Datei namens MyNFT.sol.

2. Nachfolgend finden Sie unseren NFT-Smart-Contract-Code, der auf der ERC-721-Implementierung der [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721)-Bibliothek basiert. Kopieren Sie folgenden Inhalt und fügen Sie ihn in die Datei MyNFT.sol ein.

   ```solidity
   //Vertrag basiert auf [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Da wir Klassen aus der OpenZeppelin-contracts-Bibliothek erben, führen Sie in Ihrer Kommandozeile `npm install @openzeppelin/contracts^4.0.0` aus, um die Bibliothek in unserem Ordner zu installieren.

Was also _tut_ dieser Code genau? Sehen wir uns das gemeinsam Zeil für Zeile an.

Ganz oben in unserem Smart-Contract importieren wir drei [OpenZeppelin](https://openzeppelin.com/)-Smart-Contract-Klassen:

- @openzeppelin/contracts/token/ERC721/ERC721.sol enthält eine Implementierung des ERC-721-Standards, den unser NFT-Smart-Contract erben wird. (Damit der NFT auch Gültikeit erlangt, muss Ihr Smart Contract alle Methoden des ERC-721-Standards implementieren.) Um mehr über die geerbten ERC-721-Funktionen zu erfahren, sehen Sie sich die Schnittstellendefinition [hier](https://eips.ethereum.org/EIPS/eip-721) an.

- @openzeppelin/contracts/utils/Counters.sol stellt Zähler zur Verfügung, die jeweils nur um eins erhöht oder verringert werden können. Unser Smart Contract benutzt einen Zähler, um die Gesamtanzahl der geprägten NFTs zu überprüfen und eine eindeutige ID für unseren neuen NFT festzulegen. (Jedem NFT, der durch die Benutzung eines Smart Contracts geprägt wird, muss eine eindeutige ID zugewiesen werden. In diesem Beispiel wird unsere eindeutige ID einfach deterministisch über die Gesamtanzahl der existierenden NFTs bestimmt. Zum Beispiel hat der erste NFT, der mit unserem Smart Contract geprägt wird, die ID "1", unser zweiter NFT hat die ID "2" usw.)

- @openzeppelin/contracts/access/Ownable.sol richtet eine [Zugriffskontrolle](https://docs.openzeppelin.com/contracts/3.x/access-control) für unseren Smart-Contract ein, sodass nur der Eigentümer des Smart-Contracts (also Sie) NFTs prägen kann. (Hinweis, die Einbeziehung der Zugriffskontrolle ist optional. Wenn Sie möchten, dass mit Ihrem Smart Contract jeder NFTs prägen kann, entfernen Sie das Wort "Ownable" in Zeile 10 und "onlyOwner" in Zeile 17.)

Nach unseren Importanweisungen haben wir unseren benutzerdefinierten Smart Contract, der überraschend kurz ist , denn er enthält nur einen Zähler, einen Konstruktor und eine einzige Funktion. Dies ist den von uns geerbten OpenZeppelin-Contracts zu verdanken, die die meisten der Methoden implementieren, die wir zum Erstellen eines NFT benötigen, wie z. B. `ownerOf`, das den Eigentümer des NFT zurückgibt, und `transferFrom`, das das Eigentum am NFT von einem Konto auf ein anderes überträgt.

Sie werden feststellen, dass wir in unserem ERC-721-Konstruktor zwei Zeichenfolgen übergeben: "MyNFT" und "NFT". Die erste Variable ist der Name des Smart Contracts und die zweite ist sein Symbol. Sie können jede der beiden Variablen benennen wie sie möchten.

Schließlich haben wir unsere Funktion `mintNFT(address recipient, string memory tokenURI)`, die es uns ermöglicht, einen NFT zu prägen! Sie werden bemerken, dass diese Funktion zwei Variablen benötigt:

- `address recipient` gibt die Adresse an, die Ihren frisch geprägten NFT erhalten wird

- `string memory tokenURI` ist ein String, der in ein JSON-Dokument aufgelöst werden sollte, das die Metadaten des NFTs beschreibt. Die Metadaten eines NFT, sind das Element, das den NFT wirklich zum Leben erwecken. Sie schaffen die Grundlage, dass ein NFT konfigurierbare Eigenschaften wie einen Namen, eine Beschreibung ein Bild und andere Attribute haben kann. In Teil 2 dieses Tutorials wird die Konfiguration dieser Metadaten beschrieben.

`mintNFT` ruft einige Methoden aus der geerbten ERC-721-Bibliothek auf und gibt schließlich eine Zahl zurück, die die ID des frisch geprägten NFT darstellt.

## Schritt 11: MetaMask & Alchemy mit Ihrem Projekt verbinden {#connect-metamask-and-alchemy}

Nachdem wir nun eine MetaMask-Wallet und ein Alchemy-Konto erstellt uns unseren Smart Contract geschrieben haben, ist es an der Zeit, die drei Elemente miteinander zu verbinden.

Jede Transaktion, die von Ihrer virtuellen Wallet gesendet wird, benötigt eine Signatur mit ihrem eindeutigen privaten Schlüssel. Um unser Programm mit dieser Berechtigung auszustatten, können wir unseren privaten Schlüssel (und Alchemy-API-Schlüssel) in einer Umgebungsdatei sicher abspeichern.

Um mehr über das Senden von Transaktionen zu erfahren, sehen Sie sich [dieses Tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) über das Senden von Transaktionen mit web3 an.

Installieren Sie zuerst das dotenv-Paket in Ihrem Projektverzeichnis:

    ```
    npm install dotenv --save
    ```

Erstellen Sie dann eine `.env`-Datei im Stammverzeichnis unseres Projekts und fügen Sie Ihren privaten MetaMask-Schlüssel und Ihre HTTP-Alchemy-API-URL hinzu.

- Befolgen Sie [diese Anweisungen](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um Ihren privaten Schlüssel aus MetaMask zu exportieren

- Unten wird erläutert, wie Sie die HTTP-URL der Alchemy-API erhalten und in die Zwischenablage kopieren.

![Kopieren Sie Ihre Alchemy-API-URL](./copy-alchemy-api-url.gif)

Ihre `.env`-Datei sollte jetzt so aussehen:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Um diese tatsächlich mit unserem Code zu verbinden, werden wir in Schritt 13 in unserer Datei hardhat.config.js auf diese Variablen verweisen.

<EnvWarningBanner />

## Schritt 12: Ethers.js installieren {#install-ethers}

Ethers.js ist eine Bibliothek, die die Interaktion und das Stellen von Anfragen an Ethereum erleichtert, indem sie [standardmäßige JSON-RPC-Methoden](/developers/docs/apis/json-rpc/) in benutzerfreundlichere Methoden verpackt.

Hardhat macht es sehr einfach, [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionalität zu integrieren. Wir werden das [Ethers-Plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) für die Vertragsbereitstellung nutzen ([Ethers.js](https://github.com/ethers-io/ethers.js/) verfügt über einige sehr saubere Methoden zur Vertragsbereitstellung).

Geben Sie Folgendes in Ihrem Projektverzeichnis ein:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Im nächsten Schritt benötigen wir auch Ether in unserer hardhat.config.js.

## Schritt 13: hardhat.config.js aktualisieren {#update-hardhat-config}

Wir haben bisher mehrere Abhängigkeiten und Plug-ins hinzugefügt. Jetzt müssen wir hardhat.config.js aktualisieren, damit unser Projekt über alle diese Abhängigkeiten informiert wird.

Aktualisieren Sie Ihre hardhat.config.js so, dass sie wie folgt aussieht:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
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

## Schritt 14: Unseren Vertrag kompilieren {#compile-contract}

Um sicherzugehen, dass so weit alles funktioniert, sollten wir unseren Vertrag erstellen. Die Aufgabe compile ist eine der integrierten Hardhat-Aufgaben.

Führen Sie folgenden Befehl in der Befehlszeile aus:

    ```
    npx hardhat compile
    ```

Möglicherweise erhalten Sie eine Warnung, dass die SPDX-Lizenzkennung nicht in Quelldatei angegeben sei. Doch darüber brauchen Sie sich keine Sorgen zu machen. Alles andere sieht hoffentlich gut aus. Wenn nicht, können Sie jederzeit eine Nachricht im [Alchemy-Discord](https://discord.gg/u72VCg3) schreiben.

## Schritt 15: Unser Bereitstellungsskript schreiben {#write-deploy}

Nun, da unser Vertrag geschrieben und unsere Konfigurationsdatei einsatzbereit ist, ist es an der Zeit, das Skript zur Bereitstellung des Vertrags zu schreiben.

Navigieren Sie zum `scripts/`-Ordner und erstellen Sie eine neue Datei namens `deploy.js`, indem Sie die folgenden Inhalte hinzufügen:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Bereitstellung starten, die ein Promise zurückgibt, das zu einem Vertragsobjekt aufgelöst wird
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

Hardhat erklärt in seinem [Contracts-Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) hervorragend, was jede dieser Codezeilen bewirkt; wir haben die Erklärungen hier übernommen.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Eine ContractFactory in ethers.js ist eine Abstraktion, die dazu dient, neue Smart Contracts einzusetzen. So ist MyNFT eine Factory für Instanzen von unseren NFT-Vertrag. Wenn Sie das hardhat-ethers-Plug-in verwenden, werden die Instanzen ContractFactory und Contract standardmäßig mit dem ersten Unterzeichner verbunden.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Mit dem Aufruf von deploy() über eine ContractFactory wird die Bereitstellung gestartet. Zurückgegeben wird eine Referenz, die auf einen Vertrag zeigt. Das ist das Objekt, das eine Methode für jede unserer Smart-Contract-Funktionen enthält.

## Schritt 16: Unseren Vertrag bereitstellen {#deploy-contract}

Nun sind wir endlich bereit, unseren Smart Contract bereitzustellen. Navigieren Sie zurück zu Ihrem Stammverzeichnis und führen Sie Folgendes über die Befehlszeile aus:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Sie sollten dann etwas sehen wie:

    ```
    Vertrag bereitgestellt für Adresse: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Wenn wir zum [Sepolia Etherscan](https://sepolia.etherscan.io/) gehen und nach unserer Vertragsadresse suchen, sollten wir sehen können, dass sie erfolgreich bereitgestellt wurde. Wenn sie nicht sofort angezeigt wird, haben Sie etwas Geduld, denn dieser Vorgang kann einige Zeit in Anspruch nehmen. Die Transaktion wird ungefähr so aussehen:

![Ihre Transaktionsadresse auf Etherscan ansehen](./etherscan-sepoila-contract-creation.png)

Die `From`-Adresse sollte mit Ihrer MetaMask-Kontoadresse übereinstimmen und die `To`-Adresse lautet „Contract Creation“. Wenn wir auf die Transaktion klicken ,sehen wir unsere Vertragsadresse im Empfängerfeld:

![Ihre Vertragsadresse auf Etherscan ansehen](./etherscan-sepolia-tx-details.png)

Großartig! Sie haben soeben Ihren NFT-Smart-Contract in der Ethereum-Chain (Testnet) bereitgestellt!

Um zu verstehen, was unter der Haube vor sich geht, navigieren wir zum Explorer-Tab in unserem [Alchemy-Dashboard](https://dashboard.alchemyapi.io/explorer). Wenn Sie mehrere Alchemy-Apps besitzen, filtern Sie nach Apps und wählen Sie "MyNFT" aus.

![Anzeigen von Aufrufen, die „unter der Haube“ mit dem Explorer-Dashboard von Alchemy gemacht wurden](./alchemy-explorer-goerli.png)

Hier sehen Sie eine Handvoll JSON-RPC-Aufrufe, die Hardhat/Ethers implementiert hat, als wir die .deploy()-Funktion aufgerufen haben. Zwei wichtige Aufrufe sind hier [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), das ist die Anfrage, um unseren Smart-Contract tatsächlich in die Sepolia-Chain zu schreiben, und [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), eine Anfrage zum Lesen von Informationen über unsere Transaktion anhand des Hashes (ein typisches Muster beim Senden von Transaktionen). Um mehr über das Senden von Transaktionen zu erfahren, lesen Sie dieses Tutorial über das [Senden von Transaktionen mit Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Damit sind wir am Ende vom ersten Teil dieses Tutorials. In [Teil 2 werden wir tatsächlich mit unserem Smart-Contract interagieren, indem wir einen NFT prägen](/developers/tutorials/how-to-mint-an-nft/), und in [Teil 3 zeigen wir Ihnen, wie Sie Ihren NFT in Ihrer Ethereum-Wallet ansehen können](/developers/tutorials/how-to-view-nft-in-metamask/)!
