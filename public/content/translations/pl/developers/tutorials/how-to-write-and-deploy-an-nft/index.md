---
title: "Jak napisać i wdrożyć NFT (Część 1/3 serii samouczków o NFT)"
description: "Ten samouczek to część 1 serii o NFT, która krok po kroku pokaże Ci, jak napisać i wdrożyć inteligentny kontrakt niewymiennego tokena (tokena ERC-721) przy użyciu Ethereum i Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "inteligentne kontrakty"]
skill: beginner
breadcrumb: "Napisz i wdróż NFT"
lang: pl
published: 2021-04-22
---

Ponieważ NFT wprowadzają blockchain do świadomości publicznej, jest to doskonała okazja, aby samemu zrozumieć ten szum, publikując własny kontrakt NFT (token ERC-721) na blockchainie Ethereum!

Alchemy jest niezwykle dumne z tego, że napędza największe nazwy w przestrzeni NFT, w tym Makersplace (niedawno ustanowiło rekord sprzedaży cyfrowego dzieła sztuki w Christie's za 69 milionów dolarów), Dapper Labs (twórcy NBA Top Shot i Crypto Kitties), OpenSea (największy na świecie rynek NFT), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable i wiele innych.

W tym samouczku przejdziemy przez tworzenie i wdrożenie inteligentnego kontraktu ERC-721 w sieci testowej Sepolia przy użyciu [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) oraz [Alchemy](https://alchemy.com/signup/eth) (nie martw się, jeśli jeszcze nie rozumiesz, co to wszystko oznacza — wyjaśnimy to!).

W części 2 tego samouczka omówimy, jak możemy użyć naszego inteligentnego kontraktu do wybicia NFT, a w części 3 wyjaśnimy, jak wyświetlić swoje NFT w MetaMask.

I oczywiście, jeśli w którymkolwiek momencie będziesz mieć pytania, nie wahaj się skontaktować na [Discordzie Alchemy](https://discord.gg/gWuC7zB) lub odwiedzić [dokumentację API NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Krok 1: Połącz się z siecią Ethereum {#connect-to-ethereum}

Istnieje wiele sposobów na wysyłanie żądań do blockchaina Ethereum, ale dla ułatwienia użyjemy darmowego konta na [Alchemy](https://alchemy.com/signup/eth), platformie dla programistów blockchain i API, która pozwala nam komunikować się z łańcuchem Ethereum bez konieczności uruchamiania własnych węzłów.

W tym samouczku skorzystamy również z narzędzi programistycznych Alchemy do monitorowania i analityki, aby zrozumieć, co dzieje się pod maską podczas wdrożenia naszego inteligentnego kontraktu. Jeśli nie masz jeszcze konta Alchemy, możesz zarejestrować się za darmo [tutaj](https://alchemy.com/signup/eth).

## Krok 2: Utwórz swoją aplikację (i klucz API) {#make-api-key}

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na wysyłanie żądań do sieci testowej Sepolia. Sprawdź [ten przewodnik](https://www.alchemy.com/docs/choosing-a-web3-network), jeśli chcesz dowiedzieć się więcej o sieciach testowych.

1. Przejdź do strony „Create App” w swoim panelu Alchemy, najechawszy na „Apps” na pasku nawigacyjnym i klikając „Create App”

![Create your app](./create-your-app.png)

2. Nazwij swoją aplikację (my wybraliśmy „My First NFT!”), dodaj krótki opis, wybierz „Ethereum” jako łańcuch (Chain) i wybierz „Sepolia” jako swoją sieć. Od czasu The Merge inne sieci testowe zostały wycofane.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Kliknij „Create app” i to wszystko! Twoja aplikacja powinna pojawić się w tabeli poniżej.

## Krok 3: Utwórz konto Ethereum (adres) {#create-eth-address}

Potrzebujemy konta Ethereum, aby wysyłać i odbierać transakcje. W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, służącego do zarządzania adresem Twojego konta Ethereum. Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/) od Fundacji Ethereum.

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta, lub jeśli już je masz, upewnij się, że przełączyłeś się na „Sepolia Test Network” w prawym górnym rogu (abyśmy nie operowali prawdziwymi pieniędzmi).

![Set Sepolia as your network](./metamask-goerli.png)

## Krok 4: Dodaj ether z kranika {#step-4-add-ether-from-a-faucet}

Aby wdrożyć nasz inteligentny kontrakt w sieci testowej, będziemy potrzebować trochę fałszywego ETH. Aby zdobyć ETH, możesz przejść do [kranika Sepolia](https://sepoliafaucet.com/) hostowanego przez Alchemy, zalogować się, wprowadzić adres swojego konta i kliknąć „Send Me ETH”. Wkrótce potem powinieneś zobaczyć ETH na swoim koncie MetaMask!

## Krok 5: Sprawdź swoje saldo {#check-balance}

Aby upewnić się, że nasze saldo tam jest, wyślijmy żądanie [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) za pomocą [narzędzia sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Send Request”, powinieneś zobaczyć odpowiedź podobną do tej:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Uwaga** Ten wynik jest w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru. Przelicznik z wei na ETH to 1 eth = 10<sup>18</sup> wei. Więc jeśli zamienimy 0xde0b6b3a7640000 na system dziesiętny, otrzymamy 1\*10<sup>18</sup> wei, co równa się 1 ETH.

Uff! Nasze fałszywe pieniądze są na miejscu.
## Krok 6: Zainicjuj nasz projekt {#initialize-project}

Najpierw będziemy musieli utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wpisz:

    mkdir my-nft
    cd my-nft

Teraz, gdy jesteśmy w folderze naszego projektu, użyjemy npm init, aby zainicjować projekt. Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [instrukcjami instalacji Node.js](https://nodejs.org/en/download/) (do tego samouczka będziemy potrzebować Node.js i npm).

    npm init

Nie ma większego znaczenia, jak odpowiesz na pytania instalacyjne; oto jak my to zrobiliśmy w celach informacyjnych:

```json
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
```

Zatwierdź plik package.json i jesteśmy gotowi do działania!
## Krok 7: Zainstaluj [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat to środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga programistom podczas lokalnego budowania inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp) przed wdrożeniem ich w działającym łańcuchu.

Wewnątrz naszego projektu my-nft uruchom:

    npm install --save-dev hardhat

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/getting-started/#overview).

## Krok 8: Utwórz projekt Hardhat {#create-hardhat-project}

Wewnątrz folderu naszego projektu uruchom:

    npx hardhat

Powinieneś wtedy zobaczyć wiadomość powitalną i opcję wyboru tego, co chcesz zrobić. Wybierz „create an empty hardhat.config.js”:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Wygeneruje to dla nas plik hardhat.config.js, w którym określimy całą konfigurację naszego projektu (w kroku 13).

## Krok 9: Dodaj foldery projektu {#add-project-folders}

Aby utrzymać porządek w naszym projekcie, utworzymy dwa nowe foldery. Przejdź do katalogu głównego swojego projektu w wierszu poleceń i wpisz:

    mkdir contracts
    mkdir scripts

- contracts/ to miejsce, w którym będziemy przechowywać kod naszego inteligentnego kontraktu NFT

- scripts/ to miejsce, w którym będziemy przechowywać skrypty do wdrożenia i interakcji z naszym inteligentnym kontraktem

## Krok 10: Napisz nasz kontrakt {#write-contract}

Teraz, gdy nasze środowisko jest skonfigurowane, przejdźmy do bardziej ekscytujących rzeczy: _pisania kodu naszego inteligentnego kontraktu!_

Otwórz projekt my-nft w swoim ulubionym edytorze (my lubimy [VSCode](https://code.visualstudio.com/)). Inteligentne kontrakty są pisane w języku zwanym Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu MyNFT.sol.‌

1. Przejdź do folderu `contracts` i utwórz nowy plik o nazwie MyNFT.sol

2. Poniżej znajduje się kod naszego inteligentnego kontraktu NFT, który oparliśmy na implementacji ERC-721 z biblioteki [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Skopiuj i wklej poniższą zawartość do swojego pliku MyNFT.sol.

   ```solidity
   //Kontrakt oparty na [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. Ponieważ dziedziczymy klasy z biblioteki kontraktów OpenZeppelin, w wierszu poleceń uruchom `npm install @openzeppelin/contracts^4.0.0`, aby zainstalować bibliotekę w naszym folderze.

Więc co dokładnie _robi_ ten kod? Przeanalizujmy go linijka po linijce.

Na samej górze naszego inteligentnego kontraktu importujemy trzy klasy inteligentnych kontraktów [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol zawiera implementację standardu ERC-721, którą odziedziczy nasz inteligentny kontrakt NFT. (Aby być prawidłowym NFT, Twój inteligentny kontrakt musi implementować wszystkie metody standardu ERC-721). Aby dowiedzieć się więcej o odziedziczonych funkcjach ERC-721, sprawdź definicję interfejsu [tutaj](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol dostarcza liczniki, które mogą być tylko inkrementowane lub dekrementowane o jeden. Nasz inteligentny kontrakt używa licznika do śledzenia całkowitej liczby wybitych NFT i ustawienia unikalnego identyfikatora (ID) dla naszego nowego NFT. (Każde NFT wybite przy użyciu inteligentnego kontraktu musi mieć przypisany unikalny identyfikator — tutaj nasz unikalny identyfikator jest po prostu określany przez całkowitą liczbę istniejących NFT. Na przykład pierwsze NFT, które wybijamy za pomocą naszego inteligentnego kontraktu, ma ID „1”, nasze drugie NFT ma ID „2” itd.).

- @openzeppelin/contracts/access/Ownable.sol konfiguruje [kontrolę dostępu](https://docs.openzeppelin.com/contracts/3.x/access-control) w naszym inteligentnym kontrakcie, dzięki czemu tylko właściciel inteligentnego kontraktu (Ty) może wybijać NFT. (Uwaga, włączenie kontroli dostępu jest całkowicie opcjonalne. Jeśli chcesz, aby każdy mógł wybić NFT za pomocą Twojego inteligentnego kontraktu, usuń słowo Ownable w linii 10 i onlyOwner w linii 17).

Po naszych instrukcjach importu mamy nasz niestandardowy inteligentny kontrakt NFT, który jest zaskakująco krótki — zawiera tylko licznik, konstruktor i jedną funkcję! Dzieje się tak dzięki naszym odziedziczonym kontraktom OpenZeppelin, które implementują większość metod potrzebnych do stworzenia NFT, takich jak `ownerOf`, która zwraca właściciela NFT, oraz `transferFrom`, która przenosi własność NFT z jednego konta na drugie.

W naszym konstruktorze ERC-721 zauważysz, że przekazujemy 2 ciągi znaków: „MyNFT” i „NFT”. Pierwsza zmienna to nazwa inteligentnego kontraktu, a druga to jego symbol. Możesz nazwać każdą z tych zmiennych, jak tylko chcesz!

Na koniec mamy naszą funkcję `mintNFT(address recipient, string memory tokenURI)`, która pozwala nam wybić NFT! Zauważysz, że ta funkcja przyjmuje dwie zmienne:

- `address recipient` określa adres, który otrzyma Twoje świeżo wybite NFT

- `string memory tokenURI` to ciąg znaków, który powinien wskazywać na dokument JSON opisujący metadane NFT. Metadane NFT to tak naprawdę to, co ożywia token, pozwalając mu na posiadanie konfigurowalnych właściwości, takich jak nazwa, opis, obraz i inne atrybuty. W części 2 tego samouczka opiszemy, jak skonfigurować te metadane.

`mintNFT` wywołuje niektóre metody z odziedziczonej biblioteki ERC-721 i ostatecznie zwraca liczbę reprezentującą ID świeżo wybitego NFT.

## Krok 11: Połącz MetaMask i Alchemy ze swoim projektem {#connect-metamask-and-alchemy}

Teraz, gdy utworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego wirtualnego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby nadać naszemu programowi to uprawnienie, możemy bezpiecznie przechowywać nasz klucz prywatny (i klucz API Alchemy) w pliku środowiskowym.

Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [ten samouczek](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) dotyczący wysyłania transakcji przy użyciu Web3.

Najpierw zainstaluj pakiet dotenv w katalogu swojego projektu:

    npm install dotenv --save

Następnie utwórz plik `.env` w katalogu głównym naszego projektu i dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

- Postępuj zgodnie z [tymi instrukcjami](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), aby wyeksportować swój klucz prywatny z MetaMask

- Zobacz poniżej, jak uzyskać adres URL HTTP API Alchemy i skopiuj go do schowka

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Twój plik `.env` powinien teraz wyglądać tak:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku hardhat.config.js w kroku 13.

<EnvWarningBanner />

## Krok 12: Zainstaluj Ethers.js {#install-ethers}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum poprzez opakowanie [standardowych metod JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat sprawia, że integracja [wtyczek](https://hardhat.org/plugins/) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności jest niezwykle prosta. Skorzystamy z [wtyczki Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) do wdrożenia kontraktu ([Ethers.js](https://github.com/ethers-io/ethers.js/) ma kilka bardzo przejrzystych metod wdrażania kontraktów).

W katalogu swojego projektu wpisz:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

W następnym kroku będziemy również wymagać ethers w naszym pliku hardhat.config.js.

## Krok 13: Zaktualizuj hardhat.config.js {#update-hardhat-config}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować plik hardhat.config.js, aby nasz projekt wiedział o nich wszystkich.

Zaktualizuj swój plik hardhat.config.js, aby wyglądał tak:

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

## Krok 14: Skompiluj nasz kontrakt {#compile-contract}

Aby upewnić się, że do tej pory wszystko działa, skompilujmy nasz kontrakt. Zadanie kompilacji jest jednym z wbudowanych zadań Hardhat.

Z wiersza poleceń uruchom:

    npx hardhat compile

Możesz otrzymać ostrzeżenie o braku identyfikatora licencji SPDX w pliku źródłowym (SPDX license identifier not provided in source file), ale nie musisz się tym martwić — miejmy nadzieję, że wszystko inne wygląda dobrze! Jeśli nie, zawsze możesz napisać na [Discordzie Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napisz nasz skrypt wdrożeniowy {#write-deploy}

Teraz, gdy nasz kontrakt jest napisany, a plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać nasz skrypt wdrożeniowy kontraktu.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Rozpocznij wdrożenie, zwracając obietnicę, która rozwiązuje się do obiektu kontraktu
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

Hardhat wykonuje niesamowitą robotę, wyjaśniając, co robi każda z tych linii kodu w swoim [samouczku o kontraktach](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), zaadaptowaliśmy ich wyjaśnienia tutaj.

    const MyNFT = await ethers.getContractFactory("MyNFT");

ContractFactory w ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc MyNFT jest tutaj fabryką dla instancji naszego kontraktu NFT. Podczas korzystania z wtyczki hardhat-ethers instancje ContractFactory i Contract są domyślnie połączone z pierwszym podpisującym (signer).

    const myNFT = await MyNFT.deploy();

Wywołanie deploy() na ContractFactory rozpocznie wdrożenie i zwróci Promise, który rozwiązuje się do obiektu Contract. Jest to obiekt, który ma metodę dla każdej z funkcji naszego inteligentnego kontraktu.

## Krok 16: Wdróż nasz kontrakt {#deploy-contract}

W końcu jesteśmy gotowi do wdrożenia naszego inteligentnego kontraktu! Wróć do katalogu głównego swojego projektu i w wierszu poleceń uruchom:

    npx hardhat --network sepolia run scripts/deploy.js

Powinieneś wtedy zobaczyć coś takiego:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Jeśli przejdziemy do [Etherscan dla sieci Sepolia](https://sepolia.etherscan.io/) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Jeśli nie widzisz go od razu, poczekaj chwilę, ponieważ może to zająć trochę czasu. Transakcja będzie wyglądać mniej więcej tak:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

Adres „From” powinien odpowiadać adresowi Twojego konta MetaMask, a adres „To” będzie wskazywał „Contract Creation”. Jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu „To”:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Taaak! Właśnie wdrożyłeś swój inteligentny kontrakt NFT w łańcuchu (sieci testowej) Ethereum!

Aby zrozumieć, co dzieje się pod maską, przejdźmy do zakładki Explorer w naszym [panelu Alchemy](https://dashboard.alchemy.com/explorer). Jeśli masz wiele aplikacji Alchemy, upewnij się, że filtrujesz według aplikacji i wybierasz „MyNFT”.

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Tutaj zobaczysz garść wywołań JSON-RPC, które Hardhat/Ethers wykonały dla nas pod maską, gdy wywołaliśmy funkcję .deploy(). Dwa ważne, o których warto tutaj wspomnieć, to [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), które jest żądaniem faktycznego zapisania naszego inteligentnego kontraktu w łańcuchu Sepolia, oraz [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), które jest żądaniem odczytania informacji o naszej transakcji na podstawie hasha (typowy wzorzec podczas wysyłania transakcji). Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź ten samouczek dotyczący [wysyłania transakcji przy użyciu Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

To wszystko w części 1 tego samouczka. W [części 2 faktycznie wejdziemy w interakcję z naszym inteligentnym kontraktem, wybijając NFT](/developers/tutorials/how-to-mint-an-nft/), a w [części 3 pokażemy Ci, jak wyświetlić swoje NFT w portfelu Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
