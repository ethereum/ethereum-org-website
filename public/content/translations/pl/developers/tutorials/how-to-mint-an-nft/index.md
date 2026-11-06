---
title: "Jak wybijać NFT (Część 2/3 serii samouczków o NFT)"
description: "Ten samouczek opisuje, jak wybijać niewymienny token (NFT) na blockchainie Ethereum za pomocą naszego inteligentnego kontraktu, Hardhat i ethers.js."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "inteligentne kontrakty"]
skill: beginner
breadcrumb: Wybijanie NFT
lang: pl
published: 2021-04-22
---

„Wybijanie niewymiennego tokena (NFT)” to proces publikowania unikalnej instancji Twojego tokena ERC-721 na blockchainie. Korzystając z naszego inteligentnego kontraktu z [Części 1 tej serii samouczków o NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), wykorzystajmy nasze umiejętności Web3 i wybijmy NFT. Na końcu tego samouczka będziesz w stanie wybijać tyle NFT, ile tylko zapragnie Twoje serce (i portfel)!

Zaczynajmy!

## Krok 1: Sprawdź swoją konfigurację {#install-web3}

Jeśli postępowałeś zgodnie z pierwszym samouczkiem dotyczącym tworzenia inteligentnego kontraktu dla niewymiennego tokena (NFT), masz już wszystko, czego potrzebujesz: projekt Hardhat 3 z [wtyczką Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) i [ethers.js](https://docs.ethers.org/v6/), biblioteką ułatwiającą tworzenie żądań do blockchaina [Ethereum](/). Napiszemy nasz kod wybijania jako skrypt Hardhat, więc ponownie wykorzysta on ustawienia sieci Sepolia oraz wartości `API_URL` i `PRIVATE_KEY` z Części 1 — nie ma nic nowego do instalacji.

## Krok 2: Utwórz plik `mint-nft.js` {#create-mintnftjs}

Wewnątrz katalogu scripts utwórz plik `mint-nft.js` i dodaj następujące wiersze kodu:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Podobnie jak w naszym skrypcie wdrażania, `network.create()` łączy się z siecią wybraną za pomocą `--network` podczas uruchamiania skryptu i zwraca nam dla niej obiekt `ethers`.

## Krok 3: Pobierz ABI swojego kontraktu {#contract-abi}

Nasz binarny interfejs aplikacji (ABI) kontraktu to interfejs pozwalający na interakcję z naszym inteligentnym kontraktem. Możesz dowiedzieć się więcej o [ABI kontraktu](/glossary/#abi). Hardhat automatycznie generuje dla nas ABI podczas kompilacji kontraktu i zapisuje je w pliku `artifacts/contracts/MyNFT.sol/MyNFT.json`. Wtyczka Hardhat Ethers odczytuje je stamtąd za nas, gdy tworzymy instancję naszego kontraktu w kroku 5, więc nie musimy go ładować sami.

Jeśli chcesz zobaczyć ABI, możesz wypisać je w konsoli. Z katalogu głównego projektu uruchom:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Krok 4: Skonfiguruj metadane dla swojego NFT przy użyciu IPFS {#config-meta}

Jeśli pamiętasz z naszego samouczka w Części 1, funkcja naszego inteligentnego kontraktu `mintNFT` przyjmuje parametr tokenURI, który powinien wskazywać na dokument JSON opisujący metadane niewymiennego tokena (NFT) — co tak naprawdę ożywia NFT, pozwalając mu na posiadanie konfigurowalnych właściwości, takich jak nazwa, opis, obraz i inne atrybuty.

> _Interplanetary File System (IPFS) to zdecentralizowany protokół i sieć peer-to-peer do przechowywania i udostępniania danych w rozproszonym systemie plików._

Do przechowywania zasobów i metadanych naszego NFT użyjemy Pinata, wygodnego interfejsu programowania aplikacji (API) IPFS oraz zestawu narzędzi, aby upewnić się, że nasze NFT jest w pełni zdecentralizowane. Jeśli nie masz konta Pinata, zarejestruj darmowe konto [tutaj](https://app.pinata.cloud) i wykonaj kroki, aby zweryfikować swój adres e-mail.

Po utworzeniu konta:

- Przejdź do [strony Files](https://app.pinata.cloud/ipfs/files) i kliknij przycisk „Add” w prawym górnym rogu strony.

- Prześlij obraz do Pinata — będzie to zasób graficzny dla Twojego NFT. Możesz nazwać ten zasób jak tylko chcesz. Upewnij się, że przesyłasz go do publicznego IPFS: pliki w [prywatnym IPFS](https://docs.pinata.cloud/files/private-ipfs) nie mogą być pobierane przez portfele i rynki, które wyświetlają Twoje NFT.

- Po przesłaniu zobaczysz plik na liście na stronie Files wraz z jego CID (identyfikatorem treści). Skopiuj CID. Możesz wyświetlić przesłany plik pod adresem: `https://gateway.pinata.cloud/ipfs/<CID>` lub przez dedykowaną bramkę wymienioną w sekcji „Gateways” na pasku bocznym Pinata. Obraz, którego użyliśmy na IPFS, możesz znaleźć na przykład [tutaj](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

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

Możesz swobodnie zmieniać dane w pliku json. Możesz usuwać lub dodawać elementy do sekcji atrybutów. Co najważniejsze, upewnij się, że pole obrazu wskazuje na lokalizację Twojego obrazu w IPFS, w formacie `ipfs://<image-CID>` — w przeciwnym razie Twoje NFT będzie zawierało zdjęcie (bardzo uroczego!) psa.

Po zakończeniu edycji pliku JSON zapisz go i prześlij do Pinata, postępując zgodnie z tymi samymi krokami, co przy przesyłaniu obrazu. Skopiuj również CID pliku `nft-metadata.json`; będziemy go potrzebować w kroku 9.

## Krok 5: Utwórz instancję swojego kontraktu {#instance-contract}

Teraz, aby wejść w interakcję z naszym kontraktem, musimy utworzyć jego instancję w naszym kodzie. Aby to zrobić, będziemy potrzebować adresu naszego kontraktu, który nasz skrypt wdrażania wypisał w Części 1. Możesz go również znaleźć na [Etherscan](https://sepolia.etherscan.io/) lub [Blockscout](https://eth-sepolia.blockscout.com/), wyszukując adres, którego użyłeś do wdrożenia kontraktu.

![Wyświetl adres swojego kontraktu na Etherscan](./view-contract-etherscan.png)

W powyższym przykładzie adres naszego kontraktu to 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Następnie użyjemy metody `getContractAt` z wtyczki Hardhat Ethers, aby utworzyć nasz kontrakt, używając jego nazwy (która mówi mu, jakiego ABI użyć) i jego adresu. W pliku `mint-nft.js` dodaj poniższy kod, zastępując adres swoim własnym:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Krok 6: Sprawdź plik `.env` {#update-env}

Każda transakcja, którą wysyłamy, musi być podpisana kluczem prywatnym Twojego konta. Jeśli ukończyłeś część 1 samouczka, nasz plik `.env` powinien już wyglądać tak:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Nie ma potrzeby dodawania adresu publicznego: ethers wylicza go z klucza prywatnego.

## Krok 7: Utwórz swoją transakcję {#create-txn}

Najpierw zdefiniujmy funkcję o nazwie `mintNFT(tokenURI)` i utwórzmy naszą transakcję, wykonując następujące czynności:

1. Pobierz konto, z którego wysyłamy transakcję. `ethers.getSigners()` zwraca konta skonfigurowane dla sieci, co w przypadku Sepolia oznacza konto, którego klucz prywatny znajduje się w pliku `.env`. Ponieważ `mintNFT` ma modyfikator `onlyOwner`, musi to być to samo konto, które wdrożyło kontrakt.

1. Wywołaj funkcję `mintNFT` na instancji naszego kontraktu, podając nasz własny adres jako odbiorcę oraz URI metadanych. To jest obliczenie, które chcemy wykonać w tej transakcji — co w tym przypadku oznacza wybijanie niewymiennego tokena (NFT).

Nie musisz samodzielnie obliczać nonce (liczby transakcji wysłanych z Twojego adresu, co zapobiega atakom typu replay), limitu gazu ani opłat: ethers pobiera lub szacuje je przed wysłaniem transakcji.

Twój plik `mint-nft.js` powinien teraz wyglądać tak:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Wyślij transakcję. ethers uzupełnia za nas nonce, limit gazu i opłaty.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Krok 8: Podpisz transakcję {#sign-txn}

Ponieważ sieć jest skonfigurowana z naszym kluczem prywatnym, ethers automatycznie podpisuje nim transakcję przed jej wysłaniem.

Wywołanie `mintNFT` zwraca wynik po wysłaniu transakcji i daje nam hash transakcji, którego możemy użyć, aby upewnić się, że nasza transakcja została wydobyta i nie została odrzucona przez sieć. Następnie `tx.wait()` czeka, aż transakcja zostanie uwzględniona w bloku. Dodaliśmy również sprawdzanie błędów, aby wiedzieć, czy nasza transakcja zakończyła się sukcesem.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Wyślij transakcję. ethers uzupełnia za nas nonce, limit gazu i opłaty.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Poczekaj, aż transakcja zostanie dołączona do bloku
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Krok 9: Wywołaj `mintNFT` i uruchom `mint-nft.js` {#call-mintnft-fn}

Pamiętasz plik `nft-metadata.json` przesłany do Pinata? Pobierz jego CID z Pinata i przekaż `ipfs://<metadata-CID>` jako parametr do funkcji `mintNFT`. Portfele i rynki rozwiązują URI `ipfs://` przez wybraną przez siebie bramkę IPFS, więc Twój niewymienny token (NFT) nie zależy od jednej konkretnej bramki.

> Upewnij się dwukrotnie, że skopiowany CID prowadzi do Twojego **nft-metadata.json**, ładując adres `https://gateway.pinata.cloud/ipfs/<metadata-CID>` w osobnym oknie. Strona powinna wyglądać podobnie do poniższego zrzutu ekranu:

![Twoja strona powinna wyświetlać metadane json](./metadataJSON.png)_Twoja strona powinna wyświetlać metadane json_

W całości Twój kod powinien wyglądać mniej więcej tak:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Wyślij transakcję. ethers uzupełnia za nas nonce, limit gazu i opłaty.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Poczekaj, aż transakcja zostanie dołączona do bloku
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Teraz uruchom skrypt w sieci Sepolia, aby wybić swoje NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Po kilku sekundach w terminalu powinieneś zobaczyć odpowiedź podobną do tej:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Aby zobaczyć szczegóły swojej transakcji, wyszukaj jej hash na [Etherscan](https://sepolia.etherscan.io/) lub [Blockscout](https://eth-sepolia.blockscout.com/).

![Wyświetl hash transakcji swojego NFT na Etherscan](./view-nft-etherscan.png)_Wyświetl hash transakcji swojego NFT na Etherscan_

I to wszystko! Właśnie wdrożyłeś ORAZ wybiłeś niewymienny token (NFT) na blockchainie Ethereum <Emoji text=":money_mouth_face:" size={1} />

Używając `mint-nft.js`, możesz wybijać tyle NFT, ile tylko zapragnie Twoje serce (i portfel)! Pamiętaj tylko, aby przekazać nowy tokenURI opisujący metadane NFT (w przeciwnym razie po prostu stworzysz mnóstwo identycznych z różnymi identyfikatorami).

Prawdopodobnie chciałbyś móc pochwalić się swoim NFT w swoim portfelu — więc koniecznie sprawdź [Część 3: Jak wyświetlić swoje NFT w portfelu](/developers/tutorials/how-to-view-nft-in-metamask/)!
