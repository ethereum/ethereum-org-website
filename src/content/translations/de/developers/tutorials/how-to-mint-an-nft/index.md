---
title: So prägen Sie einen NFT (Teil 2/3 der NFT-Tutorialreihe)
description: In diesem Tutorial wird beschrieben, wie Sie ein NFT auf der Ethereum-Blockchain mit unserem Smart Contract und Web3 prägen können
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

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Millionen USD [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Millionen USD [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Millionen USD

Sie alle haben ihre NFTs mit der leistungsstarken API von Alchemy geprägt. In diesem Tutorial zeigen wir Ihnen, wie das in <10 Minuten geht.

"NFTs prägen" – ist die Veröffentlichung einer einzigartigen Instanz Ihres ERC-721-Tokens auf der Blockchain. Mit unserem Smart Contract aus [Teil 1 dieser NFT-Tutorialserie](/developers/tutorials/how-to-write-and-deploy-an-nft/) möchten wir unsere Web3-Fähigkeiten unter Beweis stellen und einen NFT prägen. Am Ende dieses Tutorials sind Sie selbst in der Lage, so viele NFTs zu prägen, wie Ihr Herz (und Ihr Wallet) begehrt.

Los gehts!

## Schritt 1: Web3 installieren {#install-web3}

Wenn Sie das erste Tutorial zur Erstellung Ihres NFT-Smart Contracts verfolgt haben, haben Sie bereits Erfahrung mit Ethers.js gesammelt. Web3 ist ähnlich wie Ethers eine Bibliothek, die das Erstellen von Anfragen an die Ethereum-Blockchain erleichtert. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), eine erweiterte Web3-Bibliothek, die automatische Wiederholungen und ausgereifte WebSocket-Unterstützung bietet.

Führen Sie folgenden Befehl im Startverzeichnis Ihres Projekts aus:

```
npm install @alch/alchemy-web3
```

## Schritt 2: `mint-nft.js`-Datei erstellen {#create-mintnftjs}

Erstellen Sie die Datei `mint-nft.js` in Ihrem Skriptverzeichnis und fügen Sie die folgenden Codezeilen hinzu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Schritt 3: Vertrags-ABI öffnen {#contract-abi}

Unsere Vertrags-ABI (Application Binary Interface) ist die Schnittstelle, über die die Interaktion mit unserem Smart Contract erfolgt. [Hier](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) erfahren Sie mehr über Vertrags-ABIs. Hardhat generiert automatisch eine ABI für uns und speichert sie in der Datei `MyNFT.json`. Um das zu nutzen, müssen wir den Inhalt auslesen. Dafür fügen wir die folgenden Codezeilen in unsere `mint-nft.js`-Datei ein:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Wenn Sie die ABI anzeigen möchten, können Sie sie auf Ihrer Konsole anzeigen:

```js
console.log(JSON.stringify(contract.abi))
```

Um `mint-nft.js` auszuführen und die ABI auf der Konsole anzuzeigen, navigieren Sie zu Ihrem Terminal und führen folgenden befehl aus:

```js
node scripts/mint-nft.js
```

## Schritt 4: Metadaten für den NFT mit IPFS konfigurieren {#config-meta}

Wenn Sie sich an den ersten Teil unseres Tutorials erinnern, nimmt unsere `mintNFT`-Smart-Contract-Funktion einen tokenURI-Parameter entgegen, der in ein JSON-Dokument aufgelöst werden sollte, das die Metadaten des NFT beschreibt. Das ist es, was einen NFT wirklich zum Leben erweckt und ermöglicht, konfigurierbare Eigenschaften wie einen Namen, eine Beschreibung, ein Bild und andere Attribute zu haben.

> _Interplanetary File System (IPFS) ist ein dezentralisiertes Protokoll und Peer-to-Peer-Netzwerk, um Informationen in verteilten Dateisystemen zu speichern und zu teilen._

Wir nutzen Pinata, eine praktische IPFS-API und ein Toolkit zum Speichern unserer NFT-Assets und Metadaten, um sicherzustellen, dass unser NFT wirklich dezentralisiert ist. Falls Sie noch kein Pinata-Konto haben, können Sie ein kostenloses Konto [hier](https://app.pinata.cloud) erstellen. Zur Vervollständigung müssen Sie anschließend noch Ihre E-Mail-Adresse verifizieren.

Sobald Sie ein Konto erstellt haben:

- Navigieren Sie zur Seite "Files" (Dateien) und klicken Sie auf die blaue Schaltfläche "Upload" (Hochladen) oben links auf der Seite.

- Laden Sie ein Bild bei Pinata hoch — diese Bild-Datei wird für Ihren NFT benötigt. Sie können die Datei beliebig benennen.

- Nach dem Hochladen sehen Sie die Dateiinformationen in der Tabelle auf der Seite "Files" (Dateien). Zudem sehen Sie auch die Spalte "CID". Sie können die CID kopieren, indem Sie auf die Kopierschaltfläche direkt daneben klicken. Sie können ihren Upload einsehen unter: `https://gateway.pinata.cloud/ipfs/<CID>`. Das Bild, das wir auf IPFS verwendet haben, finden Sie zum Beispiel [hier](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f).

Für visuell Lernende sind die oben genannten Schritte hier zusammengefasst:

![So laden Sie ihr Bild bei Pinata hoch](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Jetzt laden wir ein weiteres Dokument in Pinata hoch. Doch bevor wir das machen, müssen wir es erst erstellen.

Erstellen Sie in Ihrem Stammverzeichnis eine neue Datei namens `nft-metadata.json` und fügen Sie den folgenden json-Code hinzu:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Sie können die Daten in der json-Datei gerne ändern. Sie können den Attributabschnitt entfernen oder hinzufügen. Vergewissern Sie sich vor allem, dass das Bildfeld auf den Speicherort Ihres IPFS-Bildes verweist – andernfalls wird Ihr NFT ein Foto eines (sehr niedlichen!) Hundes enthalten.

Wenn Sie mit der Bearbeitung der JSON-Datei fertig sind, speichern Sie sie und laden Sie sie auf Pinata hoch. Führen Sie dafür die gleichen Schritte wie beim Hochladen des Bildes aus.

![So laden Sie die Datei "nft-metadata.json" bei Pinata hoch](./uploadPinata.gif)

## Schritt 5: Vertragsinstanz erstellen {#instance-contract}

Um nun mit unserem Vertrag zu interagieren, müssen wir eine Instanz davon in unserem Code erstellen. Dazu benötigen wir unsere Vertragsadresse, die wir über die Bereitstellung oder [Etherscan](https://ropsten.etherscan.io/) erhalten können. Dafür fragen wir die Adresse ab, die Sie für die Bereitstellung des Vertrags verwendet haben.

![Ihre Vertragsadresse auf Etherscan anzeigen](./viewContractEtherscan.png)

Im obigen Beispiel lautet unsere Vertragsadresse 0x81c587EB0fE773404c42c1d2666b5f557C470eED.

Als Nächstes werden wir die Web3-[Vertragsmethode](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) verwenden, um unseren Vertrag unter Verwendung der ABI und der Adresse zu erstellen. Fügen Sie in der Datei `mint-nft.js` Folgendes hinzu:

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Schritt 6: `.env`-Datei aktualisieren {#update-env}

Um nun Transaktionen zu erstellen und an die Ethereum-Chain zu senden, verwenden wir Ihre öffentliche Ethereum-Kontoadresse, um die Konto-Nonce zu erhalten (wird unten erklärt).

Fügen Sie Ihren öffentlichen Schlüssel zu Ihrer `.env-`Datei hinzu. Wenn Sie den ersten Teil des Tutorials abgeschlossen haben, sollte die `.env`-Datei nun wie folgt aussehen:

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Schritt 7: Transaktion erstellen {#create-txn}

Als Erstes definieren wir eine Funktion mit dem Namen `mintNFT(tokenData)` und erstellen dann wie folgt unsere Transaktion:

1. Nehmen Sie den _PRIVATE_KEY_ und _PUBLIC_KEY_ aus der `.env`-Datei.

1. Als Nächstes müssen wir die Konto-Nonce in Erfahrung bringen. Die Nonce-Spezifikation wird verwendet, um die Anzahl der von Ihrer Adresse aus gesendeten Transaktionen zu verfolgen. Das ist aus Sicherheitsgründen und zur Verhinderung von [Replay-Angriffen](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) erforderlich. Um die Anzahl der von Ihrer Adresse aus gesendeten Transaktionen in Erfahrung zu bringen, nutzen wir [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Abschließend richten wir eine Transaktion mit der folgenden Information ein:

- `'from': PUBLIC_KEY` – Der Ursprung der Transaktion ist unsere öffentliche Adresse

- `'to': contractAddress` – Der Vertrag, mit dem wir interagieren und dem wir die Transaktion senden möchten

- `'nonce': nonce` – Die Konto-Nonce mit der Anzahl der Transaktionen, die von unserer Adresse gesendet wurden

- `'gas': estimatedGas` – Die geschätzten Ressourcen, die zum Abschließen der Transaktion erforderlich sind

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` – Die Berechnung, die wir in dieser Transaktion durchführen wollen, in diesem Fall das Prägen eines NFT.

Unser <code>mint-nft.js</code> Datei sollte dann so aussehen:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Schritt 8: Transaktion signieren {#sign-txn}

Jetzt, da wir unsere Transaktion erstellt haben, müssen wir sie signieren, um sie abzusenden. Dafür verwenden wir den privaten Schlüssel.

`web3.eth.sendSignedTransaction` liefert uns den Transaktions-Hash, mit dem wir sicherstellen können, dass die Transaktion verarbeitet und nicht vom Netzwerk gelöscht wurde. Sie werden feststellen, dass wir im Abschnitt zur Transaktionssignierung eine Fehlerprüfung hinzugefügt haben, damit wir wissen, ob unsere Transaktion erfolgreich durchgeführt wurde.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Schritt 9: `mintNFT` aufrufen und Node-`mint-nft.js` ausführen {#call-mintnft-fn}

Erinnern Sie sich noch an die Datei `metadata.json`, die Sie in Pinata hochgeladen haben? Holen Sie sich den Hashcode von Pinata und übermitteln Sie die Parameter an die `mintNFT`-Funktion: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

So erhalten Sie den Hashcode:

![So erhalten Sie Ihren NFT-Metadaten-Hashcode auf Pinata](./metadataPinata.gif)_So bekommen Sie Ihren NFT-Metadata-Hashcode auf Pinata_

> Überprüfen Sie den Hashcode, den Sie zu Ihrer **metadata.json** verlinkt haben, indem Sie `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in einem separaten Fenster öffnen. Die Seite sollte ähnlich wie der untenstehende Screenshot aussehen:

![Ihre Seite sollte die json-Metadata anzeigen](./metadataJSON.png)_Ihre Seite sollte die json-Metadaten anzeigen_

Alles in allem sollte Ihr Code etwa wie folgt aussehen:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Führen Sie nun `node scripts/mint-nft.js` aus, um Ihren NFT bereitzustellen. Nach ein paar Sekunden sollten Sie eine Antwort wie diese in Ihrem Terminal sehen:

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

Als Nächstes gehen Sie zu Ihrem [Alchemy-Mempool](https://dashboard.alchemyapi.io/mempool), um den Status Ihrer Transaktion zu sehen (ob sie ausstehend ist, geprägt oder vom Netzwerk abgebrochen wurde). Wenn Ihre Transaktion abgebrochen wurde, ist es auch hilfreich, [Ropsten-Etherscan](https://ropsten.etherscan.io/) zu überprüfen und nach Ihrem Transaktionshash zu suchen.

![Ihren NFT-Transaktions-Hash auf Etherscan anzeigen](./viewNFTEtherscan.png)_NFT-Transaktionshash auf Etherscan ansehen_

Das war's! Sie haben jetzt einen NFT auf der Ethereum-Blockchain veröffentlicht UND geprägt. <Emoji text=":money_mouth_face:" size={1} />

Mit der `mint-nft.js` können Sie so viele NFTs prägen, wie Sie möchten (und Ihre Wallet zulässt). Vergewissern Sie sich nur, dass Sie eine neue tokenURI übermitteln, die die Metadaten der NFTs beschreibt (andernfalls würden Sie nur einen Haufen identischer Token mit unterschiedlichen IDs erstellen).

Vermutlich möchten Sie, dass Ihre NFTs in Ihrer Wallet erscheinen. Lesen Sie also unbedingt [Teil 3: So können Sie Ihre NFTs in Ihrer Wallet anzeigen](/developers/tutorials/how-to-view-nft-in-metamask/).
