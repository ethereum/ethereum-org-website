---
title: "Wie man einen NFT prägt (Teil 2/3 der NFT-Tutorial-Reihe)"
description: "Dieses Tutorial beschreibt, wie man einen NFT auf der Ethereum-Blockchain mithilfe unseres Smart Contracts und Web3 prägt."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "Smart Contracts"]
skill: beginner
breadcrumb: "Einen NFT prägen"
lang: de
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Millionen $
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Millionen $
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Millionen $

Sie alle haben ihre NFTs mithilfe der leistungsstarken API von Alchemy geprägt. In diesem Tutorial zeigen wir Ihnen, wie Sie in \<10 Minuten dasselbe tun können.

„Einen NFT prägen“ ist der Vorgang, eine einzigartige Instanz Ihres ERC-721-Tokens auf der Blockchain zu veröffentlichen. Lassen Sie uns mit unserem Smart Contract aus [Teil 1 dieser NFT-Tutorial-Reihe](/developers/tutorials/how-to-write-and-deploy-an-nft/) unsere Web3-Fähigkeiten unter Beweis stellen und einen NFT prägen. Am Ende dieses Tutorials werden Sie in der Lage sein, so viele NFTs zu prägen, wie Ihr Herz (und Ihre Wallet) begehrt!

Lassen Sie uns anfangen!

## Schritt 1: Web3 installieren {#install-web3}

Wenn Sie das erste Tutorial zur Erstellung Ihres NFT-Smart-Contracts befolgt haben, haben Sie bereits Erfahrung mit Ethers.js. Web3 ist ähnlich wie Ethers, da es sich um eine Bibliothek handelt, die das Erstellen von Anfragen an die [Ethereum](/)-Blockchain erleichtert. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), eine erweiterte Web3-Bibliothek, die automatische Wiederholungsversuche und robuste WebSocket-Unterstützung bietet.

Führen Sie in Ihrem Projekt-Stammverzeichnis Folgendes aus:

```
npm install @alch/alchemy-web3
```

## Schritt 2: Eine `mint-nft.js`-Datei erstellen {#create-mintnftjs}

Erstellen Sie in Ihrem Skriptverzeichnis eine Datei namens `mint-nft.js` und fügen Sie die folgenden Codezeilen hinzu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Schritt 3: Holen Sie sich Ihre Vertrags-ABI {#contract-abi}

Unsere Vertrags-ABI (Application Binary Interface) ist die Schnittstelle zur Interaktion mit unserem Smart Contract. Mehr über Vertrags-ABIs erfahren Sie [hier](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat generiert automatisch eine ABI für uns und speichert sie in der Datei `MyNFT.json`. Um diese zu verwenden, müssen wir den Inhalt parsen, indem wir die folgenden Codezeilen zu unserer Datei `mint-nft.js` hinzufügen:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Wenn Sie die ABI sehen möchten, können Sie sie in Ihrer Konsole ausgeben:

```js
console.log(JSON.stringify(contract.abi))
```

Um `mint-nft.js` auszuführen und Ihre ABI in der Konsole ausgeben zu lassen, navigieren Sie zu Ihrem Terminal und führen Sie Folgendes aus:

```js
node scripts/mint-nft.js
```

## Schritt 4: Konfigurieren Sie die Metadaten für Ihren NFT mit IPFS {#config-meta}

Wenn Sie sich an unser Tutorial in Teil 1 erinnern, nimmt unsere Smart-Contract-Funktion `mintNFT` einen tokenURI-Parameter entgegen, der auf ein JSON-Dokument verweisen sollte, das die Metadaten des NFTs beschreibt – was den NFT erst wirklich zum Leben erweckt und ihm konfigurierbare Eigenschaften wie Name, Beschreibung, Bild und andere Attribute verleiht.

> _Das Interplanetary File System (IPFS) ist ein dezentralisiertes Protokoll und Peer-to-Peer-Netzwerk zum Speichern und Teilen von Daten in einem verteilten Dateisystem._

Wir werden Pinata verwenden, eine praktische IPFS-API und ein Toolkit, um unser NFT-Asset und die Metadaten zu speichern und sicherzustellen, dass unser NFT wirklich dezentralisiert ist. Wenn Sie noch kein Pinata-Konto haben, melden Sie sich [hier](https://app.pinata.cloud) für ein kostenloses Konto an und führen Sie die Schritte zur Verifizierung Ihrer E-Mail-Adresse durch.

Sobald Sie ein Konto erstellt haben:

- Navigieren Sie zur Seite „Files“ (Dateien) und klicken Sie oben links auf die blaue Schaltfläche „Upload“ (Hochladen).

- Laden Sie ein Bild auf Pinata hoch – dies wird das Bild-Asset für Ihren NFT sein. Sie können das Asset nach Belieben benennen.

- Nach dem Hochladen sehen Sie die Dateiinformationen in der Tabelle auf der Seite „Files“. Sie sehen auch eine CID-Spalte. Sie können die CID kopieren, indem Sie auf die Kopieren-Schaltfläche daneben klicken. Sie können Ihren Upload unter `https://gateway.pinata.cloud/ipfs/<CID>` ansehen. Das von uns verwendete Bild finden Sie beispielsweise [hier](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) auf IPFS.

Für die eher visuellen Lerner sind die obigen Schritte hier zusammengefasst:

![Wie man sein Bild auf Pinata hochlädt](./instructionsPinata.gif)

Nun möchten wir noch ein weiteres Dokument auf Pinata hochladen. Aber bevor wir das tun, müssen wir es erstellen!

Erstellen Sie in Ihrem Stammverzeichnis eine neue Datei namens `nft-metadata.json` und fügen Sie den folgenden JSON-Code hinzu:

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

Sie können die Daten im JSON gerne ändern. Sie können den Abschnitt „attributes“ (Attribute) erweitern oder Einträge daraus entfernen. Am wichtigsten ist, dass das Feld „image“ (Bild) auf den Speicherort Ihres IPFS-Bildes verweist – andernfalls wird Ihr NFT ein Foto eines (sehr süßen!) Hundes enthalten.

Sobald Sie mit der Bearbeitung der JSON-Datei fertig sind, speichern Sie sie und laden Sie sie auf Pinata hoch, indem Sie dieselben Schritte wie beim Hochladen des Bildes befolgen.

![Wie man seine nft-metadata.json auf Pinata hochlädt](./uploadPinata.gif)

## Schritt 5: Erstellen Sie eine Instanz Ihres Vertrags {#instance-contract}

Um nun mit unserem Vertrag zu interagieren, müssen wir eine Instanz davon in unserem Code erstellen. Dazu benötigen wir unsere Vertragsadresse, die wir aus der Bereitstellung oder von [Blockscout](https://eth-sepolia.blockscout.com/) erhalten können, indem wir nach der Adresse suchen, die Sie zur Bereitstellung des Vertrags verwendet haben.

![Ihre Vertragsadresse auf Etherscan ansehen](./view-contract-etherscan.png)

Im obigen Beispiel lautet unsere Vertragsadresse 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Als Nächstes verwenden wir die Web3-[contract-Methode](https://docs.web3js.org/api/web3-eth-contract/class/Contract), um unseren Vertrag mithilfe der ABI und der Adresse zu erstellen. Fügen Sie in Ihrer Datei `mint-nft.js` Folgendes hinzu:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Schritt 6: Aktualisieren Sie die Datei `.env` {#update-env}

Um nun Transaktionen zu erstellen und an die Ethereum-Chain zu senden, verwenden wir Ihre öffentliche Ethereum-Kontoadresse, um die Konto-Nonce zu erhalten (wird unten erklärt).

Fügen Sie Ihren Public-Key zu Ihrer Datei `.env` hinzu – wenn Sie Teil 1 des Tutorials abgeschlossen haben, sollte unsere Datei `.env` nun so aussehen:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Schritt 7: Erstellen Sie Ihre Transaktion {#create-txn}

Lassen Sie uns zunächst eine Funktion namens `mintNFT(tokenData)` definieren und unsere Transaktion erstellen, indem wir Folgendes tun:

1. Holen Sie sich Ihren _PRIVATE_KEY_ und _PUBLIC_KEY_ aus der Datei `.env`.

1. Als Nächstes müssen wir die Konto-Nonce herausfinden. Die Nonce-Spezifikation wird verwendet, um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu verfolgen – was wir aus Sicherheitsgründen und zur Verhinderung von [Replay-Angriffen](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) benötigen. Um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu erhalten, verwenden wir [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Schließlich richten wir unsere Transaktion mit den folgenden Informationen ein:

- `'from': PUBLIC_KEY` — Der Ursprung unserer Transaktion ist unsere öffentliche Adresse

- `'to': contractAddress` — Der Vertrag, mit dem wir interagieren und an den wir die Transaktion senden möchten

- `'nonce': nonce` — Die Konto-Nonce mit der Anzahl der von unserer Adresse gesendeten Transaktionen

- `'gas': estimatedGas` — Das geschätzte Gas, das zum Abschluss der Transaktion benötigt wird

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Die Berechnung, die wir in dieser Transaktion durchführen möchten – was in diesem Fall das Prägen eines NFTs ist

Ihre Datei `mint-nft.js` sollte nun so aussehen:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // neueste Nonce abrufen

   // die Transaktion
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Schritt 8: Signieren Sie die Transaktion {#sign-txn}

Nachdem wir nun unsere Transaktion erstellt haben, müssen wir sie signieren, um sie abzusenden. Hier verwenden wir unseren Private-Key.

`web3.eth.sendSignedTransaction` gibt uns den Transaktions-Hash, mit dem wir sicherstellen können, dass unsere Transaktion gemint und nicht vom Netzwerk verworfen wurde. Sie werden feststellen, dass wir im Abschnitt zur Transaktionssignierung eine Fehlerüberprüfung hinzugefügt haben, damit wir wissen, ob unsere Transaktion erfolgreich durchgeführt wurde.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // neueste Nonce abrufen

  // die Transaktion
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

## Schritt 9: Rufen Sie `mintNFT` auf und führen Sie node `mint-nft.js` aus {#call-mintnft-fn}

Erinnern Sie sich an die `metadata.json`, die Sie auf Pinata hochgeladen haben? Holen Sie sich deren Hashcode von Pinata und übergeben Sie Folgendes als Parameter an die Funktion `mintNFT`: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

So erhalten Sie den Hashcode:

![Wie man seinen NFT-Metadaten-Hashcode auf Pinata erhält](./metadataPinata.gif)_Wie man seinen NFT-Metadaten-Hashcode auf Pinata erhält_

> Überprüfen Sie noch einmal, ob der kopierte Hashcode auf Ihre **metadata.json** verweist, indem Sie `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in einem separaten Fenster laden. Die Seite sollte ähnlich aussehen wie auf dem Screenshot unten:

![Ihre Seite sollte die JSON-Metadaten anzeigen](./metadataJSON.png)_Ihre Seite sollte die JSON-Metadaten anzeigen_

Insgesamt sollte Ihr Code in etwa so aussehen:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // neueste Nonce abrufen

  // die Transaktion
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

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Besuchen Sie als Nächstes Ihren [Alchemy-Mempool](https://dashboard.alchemyapi.io/mempool), um den Status Ihrer Transaktion zu sehen (ob sie ausstehend ist, gemint wurde oder vom Netzwerk verworfen wurde). Wenn Ihre Transaktion verworfen wurde, ist es auch hilfreich, [Blockscout](https://eth-sepolia.blockscout.com/) zu überprüfen und nach Ihrem Transaktions-Hash zu suchen.

![Ihren NFT-Transaktions-Hash auf Etherscan ansehen](./view-nft-etherscan.png)_Ihren NFT-Transaktions-Hash auf Etherscan ansehen_

Und das war's! Sie haben nun einen NFT auf der Ethereum-Blockchain bereitgestellt UND geprägt <Emoji text=":money_mouth_face:" size={1} />

Mit der `mint-nft.js` können Sie so viele NFTs prägen, wie Ihr Herz (und Ihre Wallet) begehrt! Stellen Sie nur sicher, dass Sie eine neue tokenURI übergeben, die die Metadaten des NFTs beschreibt (andernfalls erstellen Sie nur einen Haufen identischer NFTs mit unterschiedlichen IDs).

Vermutlich möchten Sie Ihren NFT in Ihrer Wallet präsentieren können – schauen Sie sich also unbedingt [Teil 3: Wie Sie Ihren NFT in Ihrer Wallet ansehen](/developers/tutorials/how-to-view-nft-in-metamask/) an!