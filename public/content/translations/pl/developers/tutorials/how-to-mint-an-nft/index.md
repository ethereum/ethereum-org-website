---
title: "Jak wybijać NFT (Część 2/3 serii samouczków o NFT)"
description: "Ten samouczek opisuje, jak wybić NFT na blockchainie Ethereum za pomocą naszego inteligentnego kontraktu i Web3."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "inteligentne kontrakty"]
skill: beginner
breadcrumb: Wybijanie NFT
lang: pl
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milionów dolarów
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milionów dolarów
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milionów dolarów

Wszyscy oni wybili swoje NFT przy użyciu potężnego API Alchemy. W tym samouczku nauczymy Cię, jak zrobić to samo w \<10 minut.

„Wybijanie NFT” to proces publikowania unikalnej instancji Twojego tokena ERC-721 na blockchainie. Korzystając z naszego inteligentnego kontraktu z [części 1 tej serii samouczków o NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), wykorzystajmy nasze umiejętności Web3 i wybijmy NFT. Na koniec tego samouczka będziesz w stanie wybić tyle NFT, ile tylko zapragnie Twoje serce (i portfel)!

Zaczynajmy!

## Krok 1: Instalacja Web3 {#install-web3}

Jeśli postępowałeś zgodnie z pierwszym samouczkiem dotyczącym tworzenia inteligentnego kontraktu NFT, masz już doświadczenie w korzystaniu z Ethers.js. Web3 jest podobne do Ethers, ponieważ jest to biblioteka używana do ułatwienia tworzenia żądań do blockchaina [Ethereum](/). W tym samouczku będziemy używać [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), ulepszonej biblioteki Web3, która oferuje automatyczne ponawianie prób i solidną obsługę WebSocket.

W katalogu głównym projektu uruchom:

```
npm install @alch/alchemy-web3
```

## Krok 2: Utworzenie pliku `mint-nft.js` {#create-mintnftjs}

Wewnątrz katalogu scripts utwórz plik `mint-nft.js` i dodaj następujące wiersze kodu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Krok 3: Pobranie ABI kontraktu

Nasze ABI (Application Binary Interface) kontraktu to interfejs do interakcji z naszym inteligentnym kontraktem. Możesz dowiedzieć się więcej o [ABI kontraktu](/glossary/#abi). Hardhat automatycznie generuje dla nas ABI i zapisuje je w pliku `MyNFT.json`. Aby z niego skorzystać, będziemy musieli wyodrębnić zawartość, dodając następujące wiersze kodu do naszego pliku `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Jeśli chcesz zobaczyć ABI, możesz wypisać je w konsoli:

```js
console.log(JSON.stringify(contract.abi))
```

Aby uruchomić `mint-nft.js` i zobaczyć ABI wypisane w konsoli, przejdź do terminala i uruchom:

```js
node scripts/mint-nft.js
```
## Krok 4: Konfiguracja metadanych dla Twojego NFT przy użyciu IPFS {#config-meta}

Jeśli pamiętasz z naszego samouczka w części 1, nasza funkcja inteligentnego kontraktu `mintNFT` przyjmuje parametr tokenURI, który powinien wskazywać na dokument JSON opisujący metadane NFT — co tak naprawdę ożywia NFT, pozwalając mu na posiadanie konfigurowalnych właściwości, takich jak nazwa, opis, obraz i inne atrybuty.

> _Interplanetary File System (IPFS) to zdecentralizowany protokół i sieć peer-to-peer do przechowywania i udostępniania danych w rozproszonym systemie plików._

Użyjemy Pinata, wygodnego API i zestawu narzędzi IPFS, do przechowywania naszego zasobu NFT i metadanych, aby upewnić się, że nasze NFT jest naprawdę zdecentralizowane. Jeśli nie masz konta Pinata, zarejestruj darmowe konto [tutaj](https://app.pinata.cloud) i wykonaj kroki w celu weryfikacji adresu e-mail.

Po utworzeniu konta:

- Przejdź do strony „Files” i kliknij niebieski przycisk „Upload” w lewym górnym rogu strony.

- Prześlij obraz do Pinata — będzie to zasób obrazu dla Twojego NFT. Możesz nazwać zasób jak tylko chcesz.

- Po przesłaniu zobaczysz informacje o pliku w tabeli na stronie „Files”. Zobaczysz również kolumnę CID. Możesz skopiować CID, klikając przycisk kopiowania obok niego. Możesz wyświetlić przesłany plik pod adresem: `https://gateway.pinata.cloud/ipfs/<CID>`. Obraz, którego użyliśmy w IPFS, możesz znaleźć na przykład [tutaj](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Dla wzrokowców powyższe kroki zostały podsumowane tutaj:

![How to upload your image to Pinata](./instructionsPinata.gif)

Teraz będziemy chcieli przesłać jeszcze jeden dokument do Pinata. Ale zanim to zrobimy, musimy go utworzyć!

W katalogu głównym utwórz nowy plik o nazwie `nft-metadata.json` i dodaj następujący kod json:

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

Możesz dowolnie zmieniać dane w pliku json. Możesz usuwać lub dodawać elementy do sekcji atrybutów. Co najważniejsze, upewnij się, że pole image wskazuje na lokalizację Twojego obrazu w IPFS — w przeciwnym razie Twoje NFT będzie zawierać zdjęcie (bardzo uroczego!) psa.

Po zakończeniu edycji pliku JSON zapisz go i prześlij do Pinata, wykonując te same kroki, co w przypadku przesyłania obrazu.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Krok 5: Utworzenie instancji kontraktu {#instance-contract}

Teraz, aby wejść w interakcję z naszym kontraktem, musimy utworzyć jego instancję w naszym kodzie. W tym celu będziemy potrzebować adresu naszego kontraktu, który możemy uzyskać z wdrożenia lub z [Blockscout](https://eth-sepolia.blockscout.com/), wyszukując adres użyty do wdrożenia kontraktu.

![View your contract address on Etherscan](./view-contract-etherscan.png)

W powyższym przykładzie adres naszego kontraktu to 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Następnie użyjemy [metody kontraktu](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3, aby utworzyć nasz kontrakt przy użyciu ABI i adresu. W pliku `mint-nft.js` dodaj następujący kod:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Krok 6: Aktualizacja pliku `.env` {#update-env}

Teraz, aby tworzyć i wysyłać transakcje do łańcucha Ethereum, użyjemy adresu Twojego publicznego konta Ethereum, aby uzyskać nonce konta (wyjaśnimy to poniżej).

Dodaj swój klucz publiczny do pliku `.env` — jeśli ukończyłeś część 1 samouczka, nasz plik `.env` powinien teraz wyglądać tak:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Krok 7: Utworzenie transakcji

Najpierw zdefiniujmy funkcję o nazwie `mintNFT(tokenData)` i utwórzmy naszą transakcję, wykonując następujące czynności:

1. Pobierz swój _PRIVATE_KEY_ i _PUBLIC_KEY_ z pliku `.env`.

1. Następnie będziemy musieli ustalić nonce konta. Specyfikacja nonce służy do śledzenia liczby transakcji wysłanych z Twojego adresu — czego potrzebujemy ze względów bezpieczeństwa i aby zapobiec atakom typu replay. Aby uzyskać liczbę transakcji wysłanych z Twojego adresu, używamy [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).

1. Na koniec skonfigurujemy naszą transakcję z następującymi informacjami:

- `'from': PUBLIC_KEY` — Źródłem naszej transakcji jest nasz adres publiczny

- `'to': contractAddress` — Kontrakt, z którym chcemy wejść w interakcję i wysłać transakcję

- `'nonce': nonce` — Nonce konta z liczbą transakcji wysłanych z naszego adresu

- `'gas': estimatedGas` — Szacowany gaz potrzebny do zakończenia transakcji

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Obliczenia, które chcemy wykonać w tej transakcji — w tym przypadku jest to wybijanie NFT

Twój plik `mint-nft.js` powinien teraz wyglądać tak:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //pobierz najnowszy nonce

   //transakcja
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```
## Krok 8: Podpisywanie transakcji {#sign-txn}

Teraz, gdy utworzyliśmy naszą transakcję, musimy ją podpisać, aby ją wysłać. W tym miejscu użyjemy naszego klucza prywatnego.

`web3.eth.sendSignedTransaction` da nam hash transakcji, którego możemy użyć, aby upewnić się, że nasza transakcja została wydobyta i nie została odrzucona przez sieć. Zauważysz, że w sekcji podpisywania transakcji dodaliśmy sprawdzanie błędów, abyśmy wiedzieli, czy nasza transakcja zakończyła się pomyślnie.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //pobierz najnowszy nonce

  //transakcja
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

## Krok 9: Wywołanie `mintNFT` i uruchomienie węzła `mint-nft.js` {#call-mintnft-fn}

Pamiętasz plik `metadata.json`, który przesłałeś do Pinata? Pobierz jego kod hash z Pinata i przekaż następujący parametr do funkcji `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Oto jak uzyskać kod hash:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Jak uzyskać kod hash metadanych NFT w Pinata_

> Upewnij się, że skopiowany kod hash prowadzi do Twojego pliku **metadata.json**, ładując `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` w osobnym oknie. Strona powinna wyglądać podobnie do poniższego zrzutu ekranu:

![Your page should display the json metadata](./metadataJSON.png)_Twoja strona powinna wyświetlać metadane json_

W sumie Twój kod powinien wyglądać mniej więcej tak:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //pobierz najnowszy nonce

  //transakcja
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

Teraz uruchom `node scripts/mint-nft.js`, aby wdrożyć swoje NFT. Po kilku sekundach powinieneś zobaczyć w terminalu odpowiedź podobną do tej:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Następnie odwiedź swój [mempool Alchemy](https://dashboard.alchemy.com/mempool), aby sprawdzić status swojej transakcji (czy jest oczekująca, wydobyta, czy została odrzucona przez sieć). Jeśli Twoja transakcja została odrzucona, warto również sprawdzić [Blockscout](https://eth-sepolia.blockscout.com/) i wyszukać hash transakcji.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Wyświetl hash transakcji NFT w Etherscan_

I to wszystko! Właśnie wdrożyłeś I wybiłeś NFT na blockchainie Ethereum <Emoji text=":money_mouth_face:" size={1} />

Używając `mint-nft.js`, możesz wybić tyle NFT, ile tylko zapragnie Twoje serce (i portfel)! Pamiętaj tylko, aby przekazać nowe tokenURI opisujące metadane NFT (w przeciwnym razie po prostu utworzysz mnóstwo identycznych z różnymi identyfikatorami).

Prawdopodobnie chciałbyś móc pochwalić się swoim NFT w portfelu — więc koniecznie sprawdź [Część 3: Jak wyświetlić NFT w portfelu](/developers/tutorials/how-to-view-nft-in-metamask/)!
