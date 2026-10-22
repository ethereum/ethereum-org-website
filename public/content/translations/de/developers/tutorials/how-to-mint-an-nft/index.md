---
title: "Wie man einen NFT prägt (Teil 2/3 der NFT-Tutorial-Reihe)"
description: "Dieses Tutorial beschreibt, wie man einen Nicht-fungiblen Token (NFT) auf der Ethereum-Blockchain unter Verwendung unseres Smart Contracts, Hardhat und ethers.js prägt."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "Smart Contracts"]
skill: beginner
breadcrumb: "Einen NFT prägen"
lang: de
published: 2021-04-22
---

„Das Prägen eines Nicht-fungiblen Tokens (NFT)“ ist der Vorgang, eine einzigartige Instanz Ihres ERC-721-Tokens auf der Blockchain zu veröffentlichen. Unter Verwendung unseres Smart Contracts aus [Teil 1 dieser NFT-Tutorial-Reihe](/developers/tutorials/how-to-write-and-deploy-an-nft/) wollen wir unsere Web3-Fähigkeiten unter Beweis stellen und einen NFT prägen. Am Ende dieses Tutorials werden Sie in der Lage sein, so viele NFTs zu prägen, wie Ihr Herz (und Ihre Wallet) begehrt!

Lassen Sie uns anfangen!

## Schritt 1: Überprüfen Sie Ihr Setup {#install-web3}

Wenn Sie dem ersten Tutorial zur Erstellung Ihres NFT-Smart-Contracts gefolgt sind, haben Sie bereits alles, was Sie brauchen: ein Hardhat-3-Projekt mit dem [Ethers-Plugin](https://hardhat.org/docs/plugins/hardhat-ethers) und [ethers.js](https://docs.ethers.org/v6/), einer Bibliothek, die verwendet wird, um das Erstellen von Anfragen an die [Ethereum](/) -Blockchain zu erleichtern. Wir werden unseren Code für das Prägen als Hardhat-Skript schreiben, sodass er die Sepolia-Netzwerkeinstellungen und die Werte `API_URL` und `PRIVATE_KEY` aus Teil 1 wiederverwendet – es gibt nichts Neues zu installieren.

## Schritt 2: Erstellen Sie eine Datei `mint-nft.js` {#create-mintnftjs}

Erstellen Sie in Ihrem Skript-Verzeichnis eine Datei `mint-nft.js` und fügen Sie die folgenden Codezeilen hinzu:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Wie in unserem Skript zum Bereitstellen verbindet sich `network.create()` mit dem Netzwerk, das Sie beim Ausführen des Skripts mit `--network` auswählen, und gibt uns ein `ethers`-Objekt dafür.

## Schritt 3: Holen Sie sich Ihre Vertrags-ABI {#contract-abi}

Unsere Vertrags-Application Binary Interface (ABI) ist die Schnittstelle zur Interaktion mit unserem Smart Contract. Sie können mehr über [Vertrags-ABIs](/glossary/#abi) erfahren. Hardhat generiert automatisch eine ABI für uns, wenn es den Vertrag kompiliert, und speichert sie in der Datei `artifacts/contracts/MyNFT.sol/MyNFT.json`. Das Hardhat-Ethers-Plugin liest sie von dort für uns, wenn wir in Schritt 5 unsere Vertragsinstanz erstellen, sodass wir sie nicht selbst laden müssen.

Wenn Sie die ABI sehen möchten, können Sie sie in Ihrer Konsole ausgeben. Führen Sie im Stammverzeichnis Ihres Projekts Folgendes aus:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Schritt 4: Konfigurieren Sie die Metadaten für Ihren NFT mit IPFS {#config-meta}

Wenn Sie sich an unser Tutorial in Teil 1 erinnern, nimmt unsere Smart-Contract-Funktion `mintNFT` einen tokenURI-Parameter entgegen, der auf ein JSON-Dokument verweisen sollte, das die Metadaten des NFTs beschreibt – was den NFT erst wirklich zum Leben erweckt und es ihm ermöglicht, konfigurierbare Eigenschaften wie einen Namen, eine Beschreibung, ein Bild und andere Attribute zu haben.

> _Das Interplanetary File System (IPFS) ist ein dezentrales Protokoll und Peer-to-Peer-Netzwerk zum Speichern und Teilen von Daten in einem verteilten Dateisystem._

Wir werden Pinata, eine praktische IPFS-Programmierschnittstelle (API) und ein Toolkit, verwenden, um unser NFT-Asset und unsere Metadaten zu speichern, um sicherzustellen, dass unser NFT wirklich dezentral ist. Wenn Sie kein Pinata-Konto haben, melden Sie sich [hier](https://app.pinata.cloud) für ein kostenloses Konto an und führen Sie die Schritte zur Verifizierung Ihrer E-Mail-Adresse durch.

Sobald Sie ein Konto erstellt haben:

- Navigieren Sie zur [Dateien-Seite](https://app.pinata.cloud/ipfs/files) und klicken Sie auf die Schaltfläche „Add“ in der oberen rechten Ecke der Seite.

- Laden Sie ein Bild auf Pinata hoch – dies wird das Bild-Asset für Ihren NFT sein. Sie können das Asset nennen, wie Sie möchten. Stellen Sie sicher, dass Sie es in das öffentliche IPFS hochladen: Dateien im [privaten IPFS](https://docs.pinata.cloud/files/private-ipfs) können nicht von Wallets und Marktplätzen abgerufen werden, die Ihren NFT anzeigen.

- Nach dem Hochladen sehen Sie die Datei auf der Dateien-Seite zusammen mit ihrer CID (Content Identifier) aufgelistet. Kopieren Sie die CID. Sie können Ihren Upload unter `https://gateway.pinata.cloud/ipfs/<CID>` oder über das dedizierte Gateway ansehen, das unter „Gateways“ in der Pinata-Seitenleiste aufgeführt ist. Sie können das Bild, das wir auf IPFS verwendet haben, zum Beispiel [hier](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) finden.

Nun möchten wir ein weiteres Dokument auf Pinata hochladen. Aber bevor wir das tun, müssen wir es erstellen!

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

Sie können die Daten im JSON gerne ändern. Sie können den Abschnitt mit den Attributen entfernen oder ergänzen. Am wichtigsten ist, dass das Bildfeld auf den Speicherort Ihres IPFS-Bildes in der Form `ipfs://<image-CID>` verweist – andernfalls wird Ihr NFT ein Foto eines (sehr süßen!) Hundes enthalten.

Sobald Sie mit der Bearbeitung der JSON-Datei fertig sind, speichern Sie sie und laden Sie sie auf Pinata hoch, wobei Sie die gleichen Schritte wie beim Hochladen des Bildes befolgen. Kopieren Sie auch die CID von `nft-metadata.json`; wir werden sie in Schritt 9 benötigen.

## Schritt 5: Erstellen Sie eine Instanz Ihres Vertrags {#instance-contract}

Um nun mit unserem Vertrag zu interagieren, müssen wir eine Instanz davon in unserem Code erstellen. Dazu benötigen wir unsere Vertragsadresse, die unser Skript zum Bereitstellen in Teil 1 ausgegeben hat. Sie können sie auch auf [Etherscan](https://sepolia.etherscan.io/) oder [Blockscout](https://eth-sepolia.blockscout.com/) finden, indem Sie nach der Adresse suchen, die Sie zum Bereitstellen des Vertrags verwendet haben.

![Sehen Sie sich Ihre Vertragsadresse auf Etherscan an](./view-contract-etherscan.png)

Im obigen Beispiel lautet unsere Vertragsadresse 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Als Nächstes werden wir die Methode `getContractAt` des Hardhat-Ethers-Plugins verwenden, um unseren Vertrag unter Verwendung seines Namens (der angibt, welche ABI verwendet werden soll) und seiner Adresse zu erstellen. Fügen Sie in Ihrer Datei `mint-nft.js` Folgendes hinzu und ersetzen Sie die Adresse durch Ihre eigene:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Schritt 6: Überprüfen Sie die `.env`-Datei {#update-env}

Jede Transaktion, die wir senden, muss mit dem privaten Schlüssel Ihres Kontos signiert werden. Wenn Sie Teil 1 des Tutorials abgeschlossen haben, sollte unsere `.env`-Datei bereits so aussehen:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Es ist nicht nötig, Ihre öffentliche Adresse hinzuzufügen: ethers ermittelt sie aus dem privaten Schlüssel.

## Schritt 7: Erstellen Sie Ihre Transaktion {#create-txn}

Lassen Sie uns zunächst eine Funktion namens `mintNFT(tokenURI)` definieren und unsere Transaktion erstellen, indem wir Folgendes tun:

1. Holen Sie sich das Konto, von dem wir die Transaktion senden. `ethers.getSigners()` gibt die für das Netzwerk konfigurierten Konten zurück, was auf Sepolia das Konto ist, dessen privater Schlüssel in `.env` steht. Da `mintNFT` `onlyOwner` ist, muss dies dasselbe Konto sein, das den Vertrag bereitgestellt hat.

1. Rufen Sie die Funktion `mintNFT` auf unserer Vertragsinstanz auf, mit unserer eigenen Adresse als Empfänger und der Metadaten-URI. Dies ist die Berechnung, die wir in dieser Transaktion durchführen möchten – was in diesem Fall das Prägen eines NFTs ist.

Sie müssen die Nonce (die Anzahl der von Ihrer Adresse gesendeten Transaktionen, die Replay-Angriffe verhindert), das Gaslimit oder die Gebühren nicht selbst berechnen: ethers ruft sie ab oder schätzt sie, bevor die Transaktion gesendet wird.

Ihre Datei `mint-nft.js` sollte nun so aussehen:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Sende die Transaktion. ethers füllt die Nonce, das Gaslimit und die Gebühren für uns aus.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Schritt 8: Signieren Sie die Transaktion {#sign-txn}

Da das Netzwerk mit unserem privaten Schlüssel konfiguriert ist, signiert ethers die Transaktion automatisch damit, bevor sie gesendet wird.

Der Aufruf von `mintNFT` kehrt zurück, sobald die Transaktion gesendet wurde, und gibt uns den Transaktions-Hash, den wir verwenden können, um sicherzustellen, dass unsere Transaktion geschürft und nicht vom Netzwerk verworfen wurde. `tx.wait()` wartet dann, bis die Transaktion in einen Block aufgenommen wurde. Wir haben auch eine Fehlerüberprüfung hinzugefügt, damit wir wissen, ob unsere Transaktion erfolgreich durchgeführt wurde.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Sende die Transaktion. ethers füllt die Nonce, das Gaslimit und die Gebühren für uns aus.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Warte darauf, dass die Transaktion in einen Block aufgenommen wird.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Schritt 9: Rufen Sie `mintNFT` auf und führen Sie `mint-nft.js` aus {#call-mintnft-fn}

Erinnern Sie sich an die `nft-metadata.json`, die Sie auf Pinata hochgeladen haben? Holen Sie sich ihre CID von Pinata und übergeben Sie `ipfs://<metadata-CID>` als Parameter an die Funktion `mintNFT`. Wallets und Marktplätze lösen `ipfs://`-URIs über ein IPFS-Gateway ihrer Wahl auf, sodass Ihr NFT nicht von einem einzigen Gateway abhängig ist.

> Überprüfen Sie noch einmal, ob die kopierte CID auf Ihre **nft-metadata.json** verweist, indem Sie `https://gateway.pinata.cloud/ipfs/<metadata-CID>` in einem separaten Fenster laden. Die Seite sollte ähnlich aussehen wie der Screenshot unten:

![Ihre Seite sollte die JSON-Metadaten anzeigen](./metadataJSON.png)_Ihre Seite sollte die JSON-Metadaten anzeigen_

Insgesamt sollte Ihr Code in etwa so aussehen:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Sende die Transaktion. ethers füllt die Nonce, das Gaslimit und die Gebühren für uns aus.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Warte darauf, dass die Transaktion in einen Block aufgenommen wird.
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Führen Sie nun das Skript gegen Sepolia aus, um Ihren NFT zu prägen:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Nach ein paar Sekunden sollten Sie eine Antwort wie diese in Ihrem Terminal sehen:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Um die Details Ihrer Transaktion zu sehen, suchen Sie nach ihrem Hash auf [Etherscan](https://sepolia.etherscan.io/) oder [Blockscout](https://eth-sepolia.blockscout.com/).

![Sehen Sie sich Ihren NFT-Transaktions-Hash auf Etherscan an](./view-nft-etherscan.png)_Sehen Sie sich Ihren NFT-Transaktions-Hash auf Etherscan an_

Und das war's! Sie haben nun einen NFT auf der Ethereum-Blockchain bereitgestellt UND geprägt <Emoji text=":money_mouth_face:" size={1} />

Mit der `mint-nft.js` können Sie so viele NFTs prägen, wie Ihr Herz (und Ihre Wallet) begehrt! Stellen Sie nur sicher, dass Sie eine neue tokenURI übergeben, die die Metadaten des NFTs beschreibt (andernfalls erstellen Sie nur einen Haufen identischer NFTs mit unterschiedlichen IDs).

Vermutlich möchten Sie Ihren NFT in Ihrer Wallet präsentieren können – schauen Sie sich also unbedingt [Teil 3: Wie Sie Ihren NFT in Ihrer Wallet ansehen](/developers/tutorials/how-to-view-nft-in-metamask/) an!
