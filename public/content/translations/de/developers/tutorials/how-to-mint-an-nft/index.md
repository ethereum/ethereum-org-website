---
title: "Wie man einen NFT prägt (Teil 2/3 der NFT-Tutorial-Reihe)"
description: "In diesem Tutorial wird beschrieben, wie Sie einen NFT auf der Ethereum-Blockchain mit unserem Smart Contract und Web3 prägen können."
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "Alchemy",
    "solidity",
    "intelligente Verträge"
  ]
skill: beginner
lang: de
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Millionen Dollar
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Millionen Dollar
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Millionen Dollar

Sie alle haben ihre NFTs mit der leistungsstarken API von Alchemy geprägt. In diesem Tutorial zeigen wir Ihnen, wie das in \<10 Minuten geht.

Das „Prägen eines NFT“ ist der Akt der Veröffentlichung einer einzigartigen Instanz Ihres ERC-721-Tokens auf der Blockchain. Nutzen wir unseren Smart Contract aus [Teil 1 dieser NFT-Tutorial-Reihe](/developers/tutorials/how-to-write-and-deploy-an-nft/), um unsere Web3-Fähigkeiten unter Beweis zu stellen und einen NFT zu prägen. Am Ende dieses Tutorials werden Sie in der Lage sein, so viele NFTs zu prägen, wie Ihr Herz (und Ihr Wallet) begehrt!

Legen wir los!

## Schritt 1: Web3 installieren {#install-web3}

Wenn Sie dem ersten Tutorial zur Erstellung Ihres NFT-Smart-Contracts gefolgt sind, haben Sie bereits Erfahrung mit der Verwendung von Ethers.js. Web3 ist ähnlich wie Ethers eine Bibliothek, die das Erstellen von Anfragen an die Ethereum-Blockchain erleichtert. In diesem Tutorial verwenden wir [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), eine erweiterte Web3-Bibliothek, die automatische Wiederholungsversuche und robuste WebSocket-Unterstützung bietet.

Führen Sie im Stammverzeichnis Ihres Projekts Folgendes aus:

```
npm install @alch/alchemy-web3
```

## Schritt 2: Eine `mint-nft.js`-Datei erstellen {#create-mintnftjs}

Erstellen Sie in Ihrem Skriptverzeichnis eine `mint-nft.js`-Datei und fügen Sie die folgenden Codezeilen hinzu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Schritt 3: Die Vertrags-ABI abrufen {#contract-abi}

Die ABI unseres Vertrags (Application Binary Interface) ist die Schnittstelle für die Interaktion mit unserem Smart-Contract. Mehr über Vertrags-ABIs erfahren Sie [hier](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat generiert automatisch eine ABI für uns und speichert sie in der Datei `MyNFT.json`. Um dies zu verwenden, müssen wir den Inhalt parsen, indem wir die folgenden Codezeilen zu unserer `mint-nft.js`-Datei hinzufügen:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Wenn Sie die ABI sehen möchten, können Sie sie auf Ihrer Konsole ausgeben:

```js
console.log(JSON.stringify(contract.abi))
```

Um `mint-nft.js` auszuführen und Ihre ABI auf der Konsole ausgeben zu sehen, navigieren Sie zu Ihrem Terminal und führen Sie Folgendes aus:

```js
node scripts/mint-nft.js
```

## Schritt 4: Metadaten für Ihren NFT mit IPFS konfigurieren {#config-meta}

Wenn Sie sich an unser Tutorial in Teil 1 erinnern, nimmt unsere `mintNFT`-Smart-Contract-Funktion einen tokenURI-Parameter entgegen, der zu einem JSON-Dokument aufgelöst werden sollte, das die Metadaten des NFT beschreibt – was den NFT erst richtig zum Leben erweckt und ihm konfigurierbare Eigenschaften wie Name, Beschreibung, Bild und andere Attribute verleiht.

> _Interplanetary File System (IPFS) ist ein dezentrales Protokoll und ein Peer-to-Peer-Netzwerk zum Speichern und Teilen von Daten in einem verteilten Dateisystem._

Wir werden Pinata, eine praktische IPFS-API und ein Toolkit, verwenden, um unser NFT-Asset und unsere Metadaten zu speichern und sicherzustellen, dass unser NFT wirklich dezentral ist. Wenn Sie kein Pinata-Konto haben, registrieren Sie sich [hier](https://app.pinata.cloud) für ein kostenloses Konto und führen Sie die Schritte zur Verifizierung Ihrer E-Mail-Adresse aus.

Sobald Sie ein Konto erstellt haben:

- Navigieren Sie zur Seite „Dateien“ und klicken Sie oben links auf die blaue Schaltfläche „Hochladen“.

- Laden Sie ein Bild auf Pinata hoch – dies wird das Bild-Asset für Ihren NFT sein. Sie können das Asset benennen, wie Sie möchten.

- Nach dem Hochladen sehen Sie die Datei-Informationen in der Tabelle auf der Seite „Dateien“. Sie werden auch eine CID-Spalte sehen. Sie können die CID kopieren, indem Sie auf die Schaltfläche zum Kopieren daneben klicken. Sie können Ihren Upload unter `https://gateway.pinata.cloud/ipfs/<CID>` ansehen. Das von uns verwendete Bild finden Sie zum Beispiel auf IPFS [hier](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Für die eher visuell Lernenden sind die obigen Schritte hier zusammengefasst:

![So laden Sie Ihr Bild auf Pinata hoch](./instructionsPinata.gif)

Jetzt wollen wir noch ein weiteres Dokument auf Pinata hochladen. Aber bevor wir das tun, müssen wir es erstellen!

Erstellen Sie in Ihrem Stammverzeichnis eine neue Datei mit dem Namen `nft-metadata.json` und fügen Sie den folgenden JSON-Code hinzu:

```json
{
  "attributes": [
    {
      "trait_type": "Rasse",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Augenfarbe",
      "value": "Mokka"
    }
  ],
  "description": "Der bezauberndste und sensibelste Welpe der Welt.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Sie können die Daten in der JSON-Datei beliebig ändern. Sie können den Abschnitt mit den Attributen entfernen oder erweitern. Am wichtigsten ist, dass das Bildfeld auf den Speicherort Ihres IPFS-Bildes verweist – andernfalls enthält Ihr NFT ein Foto von einem (sehr süßen!) Hund.

Wenn Sie mit der Bearbeitung der JSON-Datei fertig sind, speichern Sie sie und laden Sie sie auf Pinata hoch. Befolgen Sie dabei die gleichen Schritte wie beim Hochladen des Bildes.

![So laden Sie Ihre nft-metadata.json auf Pinata hoch](./uploadPinata.gif)

## Schritt 5: Eine Instanz Ihres Vertrags erstellen {#instance-contract}

Um mit unserem Vertrag zu interagieren, müssen wir nun eine Instanz davon in unserem Code erstellen. Dazu benötigen wir unsere Vertragsadresse, die wir bei der Bereitstellung oder von [Blockscout](https://eth-sepolia.blockscout.com/) erhalten können, indem wir die Adresse nachschlagen, die Sie zur Bereitstellung des Vertrags verwendet haben.

![Ihre Vertragsadresse auf Etherscan anzeigen](./view-contract-etherscan.png)

Im obigen Beispiel lautet unsere Vertragsadresse 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Als Nächstes verwenden wir die Web3-[Vertragsmethode](https://docs.web3js.org/api/web3-eth-contract/class/Contract), um unseren Vertrag mithilfe der ABI und der Adresse zu erstellen. Fügen Sie in Ihrer `mint-nft.js`-Datei Folgendes hinzu:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Schritt 6: Die `.env`-Datei aktualisieren {#update-env}

Um Transaktionen zu erstellen und an die Ethereum-Kette zu senden, verwenden wir nun Ihre öffentliche Ethereum-Kontoadresse, um die Konto-Nonce zu erhalten (Erklärung folgt unten).

Fügen Sie Ihren öffentlichen Schlüssel zu Ihrer `.env`-Datei hinzu – wenn Sie Teil 1 des Tutorials abgeschlossen haben, sollte unsere `.env`-Datei jetzt so aussehen:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Schritt 7: Ihre Transaktion erstellen {#create-txn}

Definieren wir zunächst eine Funktion namens `mintNFT(tokenData)` und erstellen wir unsere Transaktion, indem wir Folgendes tun:

1. Holen Sie sich Ihren _PRIVATE_KEY_ und _PUBLIC_KEY_ aus der `.env`-Datei.

2. Als Nächstes müssen wir die Konto-Nonce ermitteln. Die Nonce-Spezifikation wird verwendet, um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu verfolgen – was wir aus Sicherheitsgründen und zur Verhinderung von [Replay-Angriffen](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) benötigen. Um die Anzahl der von Ihrer Adresse gesendeten Transaktionen zu erhalten, verwenden wir [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Schließlich richten wir unsere Transaktion mit den folgenden Informationen ein:

- `'from': PUBLIC_KEY` — Der Ursprung unserer Transaktion ist unsere öffentliche Adresse

- `'to': contractAddress` — Der Vertrag, mit dem wir interagieren und an den wir die Transaktion senden wollen

- `'nonce': nonce` — Die Konto-Nonce mit der Anzahl der von unserer Adresse gesendeten Transaktionen

- `'gas': estimatedGas` — Das geschätzte Gas, das für den Abschluss der Transaktion benötigt wird

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Die Berechnung, die wir in dieser Transaktion durchführen wollen — in diesem Fall das Prägen eines NFT

Ihre `mint-nft.js`-Datei sollte jetzt so aussehen:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //letzte Nonce holen

   //die Transaktion
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Schritt 8: Die Transaktion signieren {#sign-txn}

Nachdem wir unsere Transaktion erstellt haben, müssen wir sie signieren, um sie zu versenden. Hier werden wir unseren privaten Schlüssel verwenden.

`web3.eth.sendSignedTransaction` gibt uns den Transaktions-Hash, mit dem wir sicherstellen können, dass unsere Transaktion gemined und nicht vom Netzwerk verworfen wurde. Sie werden feststellen, dass wir im Abschnitt zur Signierung der Transaktion eine Fehlerprüfung hinzugefügt haben, damit wir wissen, ob unsere Transaktion erfolgreich war.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //letzte Nonce holen

  //die Transaktion
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
              "Der Hash Ihrer Transaktion ist: ",
              hash,
              "\nÜberprüfen Sie den Mempool von Alchemy, um den Status Ihrer Transaktion anzuzeigen!"
            )
          } else {
            console.log(
              "Beim Senden Ihrer Transaktion ist ein Fehler aufgetreten:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise fehlgeschlagen:", err)
    })
}
```

## Schritt 9: `mintNFT` aufrufen und `node mint-nft.js` ausführen {#call-mintnft-fn}

Erinnern Sie sich an die `metadata.json`, die Sie auf Pinata hochgeladen haben? Holen Sie sich den Hashcode von Pinata und übergeben Sie Folgendes als Parameter an die Funktion `mintNFT`: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

So erhalten Sie den Hashcode:

![So erhalten Sie den Hashcode Ihrer NFT-Metadaten auf Pinata](./metadataPinata.gif)_So erhalten Sie den Hashcode Ihrer NFT-Metadaten auf Pinata_

> Überprüfen Sie, ob der von Ihnen kopierte Hashcode auf Ihre **metadata.json** verweist, indem Sie `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in einem separaten Fenster laden. Die Seite sollte ähnlich wie im folgenden Screenshot aussehen:

![Ihre Seite sollte die JSON-Metadaten anzeigen](./metadataJSON.png)_Ihre Seite sollte die JSON-Metadaten anzeigen_

Insgesamt sollte Ihr Code etwa so aussehen:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //letzte Nonce holen

  //die Transaktion
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
              "Der Hash Ihrer Transaktion ist: ",
              hash,
              "\nÜberprüfen Sie den Mempool von Alchemy, um den Status Ihrer Transaktion anzuzeigen!"
            )
          } else {
            console.log(
              "Beim Senden Ihrer Transaktion ist ein Fehler aufgetreten:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise fehlgeschlagen:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Führen Sie nun `node scripts/mint-nft.js` aus, um Ihren NFT zu prägen. Nach einigen Sekunden sollten Sie eine Antwort wie diese in Ihrem Terminal sehen:

    ```
    Der Hash Ihrer Transaktion lautet: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Überprüfen Sie den Mempool von Alchemy, um den Status Ihrer Transaktion anzuzeigen!
    ```

Besuchen Sie als Nächstes Ihren [Alchemy-Mempool](https://dashboard.alchemyapi.io/mempool), um den Status Ihrer Transaktion zu sehen (ob sie ausstehend ist, gemined wurde oder vom Netzwerk verworfen wurde). Wenn Ihre Transaktion verworfen wurde, ist es auch hilfreich, [Blockscout](https://eth-sepolia.blockscout.com/) zu überprüfen und nach Ihrem Transaktions-Hash zu suchen.

![Ihren NFT-Transaktions-Hash auf Etherscan anzeigen](./view-nft-etherscan.png)_Ihren NFT-Transaktions-Hash auf Etherscan anzeigen_

Und das war's! Sie haben nun einen NFT auf der Ethereum-Blockchain bereitgestellt UND geprägt <Emoji text=":money_mouth_face:" size={1} />

Mit `mint-nft.js` können Sie so viele NFTs prägen, wie Ihr Herz (und Ihr Wallet) begehrt! Stellen Sie nur sicher, dass Sie eine neue tokenURI übergeben, die die Metadaten des NFT beschreibt (andernfalls erstellen Sie nur einen Haufen identischer NFTs mit unterschiedlichen IDs).

Vermutlich möchten Sie Ihren NFT in Ihrem Wallet präsentieren können – schauen Sie sich also unbedingt [Teil 3: Wie Sie Ihren NFT in Ihrem Wallet anzeigen](/developers/tutorials/how-to-view-nft-in-metamask/) an!
