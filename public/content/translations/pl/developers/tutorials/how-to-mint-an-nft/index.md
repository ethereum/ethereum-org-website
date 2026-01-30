---
title: Jak wybić NFT (Część 2/3 serii samouczków NFT)
description: Ten samouczek opisuje, jak wybić NFT na blockchainie Ethereum, używając naszego inteligentnego kontraktu i Web3.
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "solidity", "smart kontrakty" ]
skill: beginner
lang: pl
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milionów USD
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milionów USD
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milionów USD

Wszyscy oni wybili swoje NFT za pomocą potężnego API Alchemy. W tym samouczku nauczymy Cię, jak zrobić to samo w \<10 minut.

„Wybicie NFT” to akt publikacji unikalnej instancji Twojego tokena ERC-721 na blockchainie. Używając naszego inteligentnego kontraktu z [części 1 tej serii samouczków NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), zaprezentujmy nasze umiejętności Web3 i wybijmy NFT. Na koniec tego samouczka będziesz w stanie wybić tyle NFT, ile tylko dusza (i portfel) zapragnie!

Zaczynajmy!

## Krok 1: Zainstaluj Web3 {#install-web3}

Jeśli śledziłeś pierwszy samouczek dotyczący tworzenia inteligentnego kontraktu NFT, masz już doświadczenie w korzystaniu z Ethers.js. Web3 jest podobne do Ethers, ponieważ jest to biblioteka używana do ułatwienia tworzenia zapytań do blockchaina Ethereum. W tym samouczku będziemy używać [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), która jest ulepszoną biblioteką Web3, która oferuje automatyczne ponawianie prób i solidne wsparcie dla WebSocket.

W głównym katalogu projektu uruchom:

```
npm install @alch/alchemy-web3
```

## Krok 2: Stwórz plik `mint-nft.js` {#create-mintnftjs}

Wewnątrz katalogu `scripts` utwórz plik `mint-nft.js` i dodaj następujące linie kodu:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Krok 3: Pobierz ABI swojego kontraktu {#contract-abi}

ABI naszego kontraktu (Application Binary Interface) to interfejs do interakcji z naszym inteligentnym kontraktem. Możesz dowiedzieć się więcej o ABI kontraktów [tutaj](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat automatycznie generuje dla nas ABI i zapisuje je w pliku `MyNFT.json`. Aby z tego skorzystać, musimy przeanalizować zawartość, dodając następujące linie kodu do naszego pliku `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Jeśli chcesz zobaczyć ABI, możesz je wydrukować w swojej konsoli:

```js
console.log(JSON.stringify(contract.abi))
```

Aby uruchomić `mint-nft.js` i zobaczyć swoje ABI wydrukowane w konsoli, przejdź do terminala i uruchom:

```js
node scripts/mint-nft.js
```

## Krok 4: Skonfiguruj metadane dla swojego NFT za pomocą IPFS {#config-meta}

Jeśli pamiętasz z naszego samouczka w części 1, nasza funkcja inteligentnego kontraktu `mintNFT` przyjmuje parametr tokenURI, który powinien prowadzić do dokumentu JSON opisującego metadane NFT — co tak naprawdę ożywia NFT, pozwalając mu mieć konfigurowalne właściwości, takie jak nazwa, opis, obraz i inne atrybuty.

> _Interplanetary File System (IPFS) to zdecentralizowany protokół i sieć peer-to-peer do przechowywania i udostępniania danych w rozproszonym systemie plików._

Użyjemy Pinaty, wygodnego API i zestawu narzędzi IPFS, do przechowywania naszych aktywów NFT i metadanych, aby upewnić się, że nasze NFT jest naprawdę zdecentralizowane. Jeśli nie masz konta Pinata, zarejestruj darmowe konto [tutaj](https://app.pinata.cloud) i wykonaj kroki w celu zweryfikowania swojego adresu e-mail.

Po utworzeniu konta:

- Przejdź na stronę "Files" i kliknij niebieski przycisk "Upload" w lewym górnym rogu strony.

- Prześlij obraz do Pinaty — będzie to zasób obrazu dla Twojego NFT. Możesz nazwać zasób, jak tylko chcesz

- Po przesłaniu zobaczysz informacje o pliku w tabeli na stronie "Files". Zobaczysz także kolumnę CID. Możesz skopiować CID, klikając przycisk kopiowania obok niego. Możesz zobaczyć swój plik pod adresem: `https://gateway.pinata.cloud/ipfs/<CID>`. Przykładowo, obraz, którego użyliśmy na IPFS, można znaleźć [tutaj](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Dla wzrokowców, powyższe kroki zostały podsumowane tutaj:

![Jak przesłać swój obraz do Pinaty](./instructionsPinata.gif)

Teraz będziemy chcieli przesłać jeszcze jeden dokument do Pinaty. Ale zanim to zrobimy, musimy go stworzyć!

W katalogu głównym utwórz nowy plik o nazwie `nft-metadata.json` i dodaj następujący kod json:

```json
{
  "attributes": [
    {
      "trait_type": "Rasa",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Kolor oczu",
      "value": "Mokka"
    }
  ],
  "description": "Najbardziej uroczy i wrażliwy szczeniak na świecie.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Możesz dowolnie zmieniać dane w pliku json. Możesz usuwać lub dodawać atrybuty w sekcji atrybutów. Co najważniejsze, upewnij się, że pole obrazu wskazuje na lokalizację Twojego obrazu IPFS — w przeciwnym razie Twoje NFT będzie zawierać zdjęcie (bardzo uroczego!) psa.

Gdy skończysz edytować plik JSON, zapisz go i prześlij do Pinaty, postępując według tych samych kroków, co przy przesyłaniu obrazu.

![Jak przesłać plik nft-metadata.json do Pinaty](./uploadPinata.gif)

## Krok 5: Stwórz instancję swojego kontraktu {#instance-contract}

Teraz, aby wejść w interakcję z naszym kontraktem, musimy stworzyć jego instancję w naszym kodzie. Aby to zrobić, będziemy potrzebować adresu naszego kontraktu, który możemy uzyskać z wdrożenia lub z [Blockscout](https://eth-sepolia.blockscout.com/), wyszukując adres, którego użyliśmy do wdrożenia kontraktu.

![Wyświetl adres swojego kontraktu na Etherscan](./view-contract-etherscan.png)

W powyższym przykładzie adres naszego kontraktu to 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Następnie użyjemy metody kontraktowej Web3 [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract), aby utworzyć nasz kontrakt przy użyciu ABI i adresu. W pliku `mint-nft.js` dodaj następujące elementy:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Krok 6: Zaktualizuj plik `.env` {#update-env}

Teraz, aby tworzyć i wysyłać transakcje do łańcucha Ethereum, użyjemy Twojego publicznego adresu konta Ethereum, aby uzyskać nonce konta (wyjaśnimy poniżej).

Dodaj swój klucz publiczny do pliku `.env` — jeśli ukończyłeś część 1 samouczka, nasz plik `.env` powinien teraz wyglądać tak:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Krok 7: Stwórz swoją transakcję {#create-txn}

Najpierw zdefiniujmy funkcję o nazwie `mintNFT(tokenData)` i utwórzmy naszą transakcję, wykonując następujące czynności:

1. Pobierz swoje _PRIVATE_KEY_ i _PUBLIC_KEY_ z pliku `.env`.

2. Następnie będziemy musieli ustalić nonce konta. Specyfikacja nonce służy do śledzenia liczby transakcji wysłanych z Twojego adresu – czego potrzebujemy do celów bezpieczeństwa i zapobiegania [atakom typu replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Aby uzyskać liczbę transakcji wysłanych z Twojego adresu, używamy [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Na koniec skonfigurujemy naszą transakcję z następującymi informacjami:

- `'from': PUBLIC_KEY` — Źródłem naszej transakcji jest nasz adres publiczny

- `'to': contractAddress` — Kontrakt, z którym chcemy wejść w interakcję i do którego wysyłamy transakcję

- `'nonce': nonce` — Nonce konta z liczbą transakcji wysłanych z naszego adresu

- `'gas': estimatedGas` — Szacowany gaz potrzebny do sfinalizowania transakcji

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Obliczenia, które chcemy wykonać w tej transakcji — co w tym przypadku oznacza wybicie NFT

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

## Krok 8: Podpisz transakcję {#sign-txn}

Teraz, gdy stworzyliśmy naszą transakcję, musimy ją podpisać, aby ją wysłać. Tutaj użyjemy naszego klucza prywatnego.

`web3.eth.sendSignedTransaction` da nam hasz transakcji, którego możemy użyć, aby upewnić się, że nasza transakcja została wydobyta i nie została odrzucona przez sieć. Zauważysz, że w sekcji podpisywania transakcji dodaliśmy sprawdzanie błędów, aby wiedzieć, czy nasza transakcja zakończyła się pomyślnie.

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
              "Hasz Twojej transakcji to: ",
              hash,
              "\nSprawdź Mempool Alchemy, aby zobaczyć status swojej transakcji!"
            )
          } else {
            console.log(
              "Coś poszło nie tak podczas przesyłania transakcji:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Błąd Promise:", err)
    })
}
```

## Krok 9: Wywołaj `mintNFT` i uruchom node `mint-nft.js` {#call-mintnft-fn}

Pamiętasz plik `metadata.json`, który przesłałeś do Pinaty? Pobierz jego hashcode z Pinaty i przekaż następujący parametr do funkcji `mintNFT`: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Oto jak uzyskać hashcode:

![Jak uzyskać hashcode metadanych NFT na Pinacie](./metadataPinata.gif)_Jak uzyskać hashcode metadanych NFT na Pinacie_

> Sprawdź dwukrotnie, czy skopiowany hashcode prowadzi do Twojego **metadata.json**, ładując `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` w osobnym oknie. Strona powinna wyglądać podobnie do poniższego zrzutu ekranu:

![Twoja strona powinna wyświetlać metadane json](./metadataJSON.png)_Twoja strona powinna wyświetlać metadane json_

W całości Twój kod powinien wyglądać mniej więcej tak:

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
              "Hasz Twojej transakcji to: ",
              hash,
              "\nSprawdź Mempool Alchemy, aby zobaczyć status swojej transakcji!"
            )
          } else {
            console.log(
              "Coś poszło nie tak podczas przesyłania transakcji:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Błąd Promise:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Teraz uruchom `node scripts/mint-nft.js`, aby wdrożyć swoje NFT. Po kilku sekundach w terminalu powinna pojawić się odpowiedź podobna do tej:

    ```
    Hasz Twojej transakcji to: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Sprawdź Mempool Alchemy, aby zobaczyć status swojej transakcji!
    ```

Następnie odwiedź swój [mempool Alchemy](https://dashboard.alchemyapi.io/mempool), aby zobaczyć status swojej transakcji (czy jest w toku, wydobyta, czy została odrzucona przez sieć). Jeśli Twoja transakcja została odrzucona, warto również sprawdzić [Blockscout](https://eth-sepolia.blockscout.com/) i wyszukać hasz swojej transakcji.

![Wyświetl hasz transakcji NFT na Etherscan](./view-nft-etherscan.png)_Wyświetl hasz transakcji NFT na Etherscan_

I to wszystko! Właśnie wdrożyłeś ORAZ wybiłeś NFT na blockchainie Ethereum <Emoji text=":money_mouth_face:" size={1} />

Używając `mint-nft.js` możesz wybić tyle NFT, ile tylko dusza (i portfel) zapragnie! Pamiętaj tylko, aby przekazać nowy tokenURI opisujący metadane NFT (w przeciwnym razie skończysz, tworząc kilka identycznych z różnymi ID).

Prawdopodobnie chciałbyś móc pochwalić się swoim NFT w swoim portfelu – więc koniecznie sprawdź [Część 3: Jak wyświetlić swoje NFT w portfelu](/developers/tutorials/how-to-view-nft-in-metamask/)!
