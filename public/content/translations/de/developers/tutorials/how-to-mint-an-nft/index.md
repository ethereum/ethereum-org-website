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

Sie alle haben ihre NFTs mithilfe der leistungsstarken API von Alchemy geprägt. In diesem Tutorial zeigen wir dir, wie du in \<10 Minuten dasselbe tun kannst.

Das „Prägen eines NFTs“ ist der Vorgang, eine einzigartige Instanz deines ERC-721-Tokens auf der Blockchain zu veröffentlichen. Unter Verwendung unseres Vertrags aus [Teil 1 dieser NFT-Tutorial-Reihe](/developers/tutorials/how-to-write-and-deploy-an-nft/) wollen wir unsere Web3-Fähigkeiten unter Beweis stellen und einen NFT prägen. Am Ende dieses Tutorials wirst du in der Lage sein, so viele NFTs zu prägen, wie dein Herz (und deine Wallet) begehrt!

Lass uns anfangen!

## Schritt 1: Web3 installieren {#install-web3}

Wenn du das erste Tutorial zur Erstellung deines NFT-Vertrags befolgt hast, hast du bereits Erfahrung mit Ethers.js. Web3 ist ähnlich wie Ethers, da es eine Bibliothek ist, die das Erstellen von Anfragen an die [Ethereum](/)-Blockchain erleichtert. In diesem Tutorial verwenden wir [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), eine erweiterte Web3-Bibliothek, die automatische Wiederholungsversuche und robuste WebSocket-Unterstützung bietet.

Führe in deinem Projekt-Stammverzeichnis Folgendes aus:

```
npm install @alch/alchemy-web3
```

## Schritt 2: Eine `mint-nft.js`-Datei erstellen {#create-mintnftjs}

Erstelle in deinem scripts-Verzeichnis eine `mint-nft.js`-Datei und füge die folgenden Codezeilen hinzu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Schritt 3: Die Vertrags-ABI abrufen {#contract-abi}

Unsere Vertrags-ABI (Application Binary Interface) ist die Schnittstelle zur Interaktion mit unserem Vertrag. Du kannst mehr über [Vertrags-ABIs](/glossary/#abi) erfahren. Hardhat generiert automatisch eine ABI für uns und speichert sie in der Datei `MyNFT.json`. Um diese zu verwenden, müssen wir den Inhalt auslesen, indem wir die folgenden Codezeilen zu unserer Datei `mint-nft.js` hinzufügen:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Wenn du die ABI sehen möchtest, kannst du sie in deiner Konsole ausgeben:

```js
console.log(JSON.stringify(contract.abi))
```

Um `mint-nft.js` auszuführen und deine ABI in der Konsole ausgeben zu lassen, navigiere zu deinem Terminal und führe Folgendes aus:

```js
node scripts/mint-nft.js
```
## Schritt 4: Die Metadaten für deinen NFT mit IPFS konfigurieren {#config-meta}

Wenn du dich an unser Tutorial in Teil 1 erinnerst, nimmt unsere Vertragsfunktion `mintNFT` einen tokenURI-Parameter entgegen, der auf ein JSON-Dokument verweisen sollte, das die Metadaten des NFTs beschreibt – was den NFT erst wirklich zum Leben erweckt und ihm konfigurierbare Eigenschaften wie Name, Beschreibung, Bild und andere Attribute verleiht.

> _Das Interplanetary File System (IPFS) ist ein dezentrales Protokoll und Peer-to-Peer-Netzwerk zum Speichern und Teilen von Daten in einem verteilten Dateisystem._

Wir werden Pinata verwenden, eine praktische IPFS-API und ein Toolkit, um unser NFT-Asset und die Metadaten zu speichern und sicherzustellen, dass unser NFT wirklich dezentral ist. Wenn du noch kein Pinata-Konto hast, melde dich [hier](https://app.pinata.cloud) für ein kostenloses Konto an und schließe die Schritte zur Verifizierung deiner E-Mail-Adresse ab.

Sobald du ein Konto erstellt hast:

- Navigiere zur Seite „Files“ (Dateien) und klicke auf die blaue Schaltfläche „Upload“ (Hochladen) oben links auf der Seite.

- Lade ein Bild auf Pinata hoch – dies wird das Bild-Asset für deinen NFT sein. Du kannst das Asset nennen, wie du möchtest.

- Nach dem Hochladen siehst du die Dateiinformationen in der Tabelle auf der Seite „Files“. Du siehst auch eine CID-Spalte. Du kannst die CID kopieren, indem du auf die Kopieren-Schaltfläche daneben klickst. Du kannst deinen Upload unter `https://gateway.pinata.cloud/ipfs/<CID>` ansehen. Das von uns verwendete Bild findest du zum Beispiel [hier](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) auf IPFS.

Für die eher visuellen Lerner sind die obigen Schritte hier zusammengefasst:

![How to upload your image to Pinata](./instructionsPinata.gif)

Nun wollen wir ein weiteres Dokument auf Pinata hochladen. Aber bevor wir das tun, müssen wir es erstellen!

Erstelle in deinem Stammverzeichnis eine neue Datei namens `nft-metadata.json` und füge den folgenden JSON-Code hinzu:

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

Du kannst die Daten im JSON gerne ändern. Du kannst den Abschnitt „attributes“ (Attribute) erweitern oder Einträge daraus entfernen. Am wichtigsten ist, dass das Feld „image“ (Bild) auf den Speicherort deines IPFS-Bildes verweist – andernfalls wird dein NFT ein Foto eines (sehr süßen!) Hundes enthalten.

Sobald du mit der Bearbeitung der JSON-Datei fertig bist, speichere sie und lade sie auf Pinata hoch, indem du dieselben Schritte wie beim Hochladen des Bildes befolgst.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Schritt 5: Eine Instanz deines Vertrags erstellen {#instance-contract}

Um nun mit unserem Vertrag zu interagieren, müssen wir in unserem Code eine Instanz davon erstellen. Dazu benötigen wir unsere Vertragsadresse, die wir aus der Bereitstellung oder von [Blockscout](https://eth-sepolia.blockscout.com/) erhalten können, indem wir nach der Adresse suchen, die du zur Bereitstellung des Vertrags verwendet hast.

![View your contract address on Etherscan](./view-contract-etherscan.png)

Im obigen Beispiel lautet unsere Vertragsadresse 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Als Nächstes verwenden wir die Web3-[Vertragsmethode](https://docs.web3js.org/api/web3-eth-contract/class/Contract), um unseren Vertrag mithilfe der ABI und der Adresse zu erstellen. Füge in deiner Datei `mint-nft.js` Folgendes hinzu:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Schritt 6: Die `.env`-Datei aktualisieren {#update-env}

Um nun Transaktionen zu erstellen und an die Ethereum-Chain zu senden, verwenden wir deine öffentliche Ethereum-Kontoadresse, um die Konto-Nonce abzurufen (wird unten erklärt).

Füge deinen öffentlichen Schlüssel zu deiner `.env`-Datei hinzu – wenn du Teil 1 des Tutorials abgeschlossen hast, sollte unsere `.env`-Datei nun so aussehen:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Schritt 7: Deine Transaktion erstellen {#create-txn}

Lass uns zunächst eine Funktion namens `mintNFT(tokenData)` definieren und unsere Transaktion erstellen, indem wir Folgendes tun:

1. Rufe deinen _PRIVATE_KEY_ und _PUBLIC_KEY_ aus der `.env`-Datei ab.

1. Als Nächstes müssen wir die Konto-Nonce herausfinden. Die Nonce-Spezifikation wird verwendet, um die Anzahl der von deiner Adresse gesendeten Transaktionen zu verfolgen – was wir aus Sicherheitsgründen und zur Verhinderung von Replay-Angriffen benötigen. Um die Anzahl der von deiner Adresse gesendeten Transaktionen abzurufen, verwenden wir [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).

1. Schließlich richten wir unsere Transaktion mit den folgenden Informationen ein:

- `'from': PUBLIC_KEY` – Der Ursprung unserer Transaktion ist unsere öffentliche Adresse

- `'to': contractAddress` – Der Vertrag, mit dem wir interagieren und an den wir die Transaktion senden möchten

- `'nonce': nonce` – Die Konto-Nonce mit der Anzahl der von unserer Adresse gesendeten Transaktionen

- `'gas': estimatedGas` – Das geschätzte Gas, das für den Abschluss der Transaktion benötigt wird

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` – Die Berechnung, die wir in dieser Transaktion ausführen möchten – was in diesem Fall das Prägen eines NFTs ist

Deine Datei `mint-nft.js` sollte nun so aussehen:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //neueste Nonce abrufen

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

Nachdem wir nun unsere Transaktion erstellt haben, müssen wir sie signieren, um sie abzusenden. Hier verwenden wir unseren privaten Schlüssel.

`web3.eth.sendSignedTransaction` gibt uns den Transaktions-Hash, mit dem wir sicherstellen können, dass unsere Transaktion gemint und nicht vom Netzwerk verworfen wurde. Du wirst feststellen, dass wir im Abschnitt zum Signieren der Transaktion eine Fehlerüberprüfung hinzugefügt haben, damit wir wissen, ob unsere Transaktion erfolgreich durchgeführt wurde.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //neueste Nonce abrufen

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

## Schritt 9: `mintNFT` aufrufen und node `mint-nft.js` ausführen {#call-mintnft-fn}

Erinnerst du dich an die `metadata.json`, die du auf Pinata hochgeladen hast? Hole dir ihren Hashcode von Pinata und übergib Folgendes als Parameter an die Funktion `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

So erhältst du den Hashcode:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_So erhältst du den Hashcode deiner NFT-Metadaten auf Pinata_

> Überprüfe noch einmal, ob der kopierte Hashcode auf deine **metadata.json** verweist, indem du `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in einem separaten Fenster lädst. Die Seite sollte ähnlich aussehen wie auf dem Screenshot unten:

![Your page should display the json metadata](./metadataJSON.png)_Deine Seite sollte die JSON-Metadaten anzeigen_

Insgesamt sollte dein Code in etwa so aussehen:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //neueste Nonce abrufen

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

Führe nun `node scripts/mint-nft.js` aus, um deinen NFT bereitzustellen. Nach ein paar Sekunden solltest du eine Antwort wie diese in deinem Terminal sehen:

    Der Hash deiner Transaktion lautet: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Überprüfe den Mempool von Alchemy, um den Status deiner Transaktion einzusehen!

Besuche als Nächstes deinen [Alchemy-Mempool](https://dashboard.alchemy.com/mempool), um den Status deiner Transaktion zu sehen (ob sie ausstehend ist, gemint wurde oder vom Netzwerk verworfen wurde). Wenn deine Transaktion verworfen wurde, ist es auch hilfreich, [Blockscout](https://eth-sepolia.blockscout.com/) zu überprüfen und nach deinem Transaktions-Hash zu suchen.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Sieh dir deinen NFT-Transaktions-Hash auf Etherscan an_

Und das war's! Du hast nun einen NFT auf der Ethereum-Blockchain bereitgestellt UND geprägt <Emoji text=":money_mouth_face:" size={1} />

Mit der `mint-nft.js` kannst du so viele NFTs prägen, wie dein Herz (und deine Wallet) begehrt! Achte nur darauf, eine neue tokenURI zu übergeben, die die Metadaten des NFTs beschreibt (andernfalls erstellst du nur einen Haufen identischer NFTs mit unterschiedlichen IDs).

Vermutlich möchtest du deinen NFT auch in deiner Wallet präsentieren können – sieh dir also unbedingt [Teil 3: Wie du deinen NFT in deiner Wallet anzeigst](/developers/tutorials/how-to-view-nft-in-metamask/) an!
