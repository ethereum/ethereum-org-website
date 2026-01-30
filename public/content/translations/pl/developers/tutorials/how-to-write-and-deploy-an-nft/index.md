---
title: Jak napisać i wdrożyć NFT (Część 1/3 serii samouczków NFT)
description: Ten samouczek jest częścią 1 serii o NFT, która poprowadzi Cię krok po kroku przez proces pisania i wdrażania inteligentnego kontraktu niewymienialnego tokena (token ERC-721) przy użyciu Ethereum i Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "smart kontrakty" ]
skill: beginner
lang: pl
published: 2021-04-22
---

Ponieważ NFT przyciągają uwagę opinii publicznej do blockchaina, jest to doskonała okazja, aby samemu zrozumieć ten szum, publikując własny kontrakt NFT (token ERC-721) na blockchainie Ethereum!

Alchemy jest niezwykle dumne z zasilania największych nazwisk w przestrzeni NFT, w tym Makersplace (które niedawno ustanowiło rekordową sprzedaż cyfrowego dzieła sztuki w Christie's za 69 milionów dolarów), Dapper Labs (twórców NBA Top Shot i Crypto Kitties), OpenSea (największy na świecie rynek NFT), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable i wiele innych.

W tym samouczku przeprowadzimy Cię przez proces tworzenia i wdrażania inteligentnego kontraktu ERC-721 w sieci testowej Sepolia przy użyciu [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) i [Alchemy](https://alchemy.com/signup/eth) (nie martw się, jeśli jeszcze nie rozumiesz, co to wszystko oznacza — wyjaśnimy to!).

W części 2 tego samouczka omówimy, jak możemy użyć naszego inteligentnego kontraktu do wybicia NFT, a w części 3 wyjaśnimy, jak wyświetlić swoje NFT w MetaMask.

I oczywiście, jeśli masz w dowolnym momencie pytania, nie wahaj się skontaktować z nami na [Discordzie Alchemy](https://discord.gg/gWuC7zB) lub odwiedzić [dokumentację API NFT firmy Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Krok 1: Połącz się z siecią Ethereum {#connect-to-ethereum}

Istnieje wiele sposobów na wysyłanie żądań do blockchaina Ethereum, ale dla ułatwienia użyjemy darmowego konta w [Alchemy](https://alchemy.com/signup/eth), platformie deweloperskiej blockchain i API, które pozwalają nam komunikować się z łańcuchem Ethereum bez konieczności uruchamiania własnych węzłów.

W tym samouczku skorzystamy również z narzędzi deweloperskich Alchemy do monitorowania i analityki, aby zrozumieć, co dzieje się „pod maską” podczas wdrażania naszego inteligentnego kontraktu. Jeśli nie masz jeszcze konta Alchemy, możesz zarejestrować się za darmo [tutaj](https://alchemy.com/signup/eth).

## Krok 2: Stwórz swoją aplikację (i klucz API) {#make-api-key}

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na wysyłanie żądań do sieci testowej Sepolia. Sprawdź [ten przewodnik](https://docs.alchemyapi.io/guides/choosing-a-network), jeśli chcesz dowiedzieć się więcej o sieciach testowych.

1. Przejdź do strony „Utwórz aplikację” w panelu Alchemy, najeżdżając kursorem na „Aplikacje” na pasku nawigacyjnym i klikając „Utwórz aplikację”.

![Stwórz swoją aplikację](./create-your-app.png)

2. Nazwij swoją aplikację (my wybraliśmy „Mój pierwszy NFT!”), dodaj krótki opis, wybierz „Ethereum” jako łańcuch i „Sepolia” jako sieć. Od czasu The Merge pozostałe sieci testowe zostały wycofane.

![Skonfiguruj i opublikuj swoją aplikację](./alchemy-explorer-sepolia.png)

3. Kliknij „Utwórz aplikację” i to wszystko! Twoja aplikacja powinna pojawić się w poniższej tabeli.

## Krok 3: Utwórz konto Ethereum (adres) {#create-eth-address}

Potrzebujemy konta Ethereum do wysyłania i odbierania transakcji. W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, który służy do zarządzania adresem konta Ethereum. Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/) od Ethereum Foundation.

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta lub jeśli już je masz, pamiętaj o przełączeniu się na „Sieć testową Sepolia” w prawym górnym rogu (abyśmy nie operowali prawdziwymi pieniędzmi).

![Ustaw Sepolię jako swoją sieć](./metamask-goerli.png)

## Krok 4: Dodaj ether z Faucet {#step-4-add-ether-from-a-faucet}

Aby wdrożyć nasz inteligentny kontrakt w sieci testowej, będziemy potrzebować trochę fałszywego ETH. Aby zdobyć ETH, możesz przejść do [Sepolia Faucet](https://sepoliafaucet.com/) hostowanego przez Alchemy, zalogować się i wpisać adres swojego konta, a następnie kliknąć „Wyślij mi ETH”. Wkrótce powinieneś zobaczyć ETH na swoim koncie MetaMask!

## Krok 5: Sprawdź swoje saldo {#check-balance}

Aby upewnić się, że nasze saldo jest prawidłowe, wykonajmy żądanie [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) za pomocą [narzędzia kompozytora Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Wyślij żądanie” powinieneś zobaczyć następującą odpowiedź:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Uwaga** Ten wynik jest w wei, a nie w ETH. Wei jest używany jako najmniejsza jednostka etheru. Przelicznik z wei na ETH to 1 eth = 10<sup>18</sup> wei. Więc jeśli przekonwertujemy 0xde0b6b3a7640000 na liczbę dziesiętną, otrzymamy 1\*10<sup>18</sup> wei, co równa się 1 ETH.

Uff! Wszystkie nasze fałszywe pieniądze są na miejscu.

## Krok 6: Zainicjuj nasz projekt {#initialize-project}

Najpierw musimy utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wpisz:

    ```
    mkdir my-nft
    cd my-nft
    ```

Teraz, gdy jesteśmy w folderze projektu, użyjemy `npm init`, aby zainicjować projekt. Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [tymi instrukcjami](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (będziemy również potrzebować [Node.js](https://nodejs.org/en/download/), więc pobierz go również!).

    ```
    npm init
    ```

Nie ma większego znaczenia, jak odpowiesz na pytania instalacyjne; dla odniesienia, oto jak my to zrobiliśmy:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: Mój pierwszy NFT!
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
      "description": "Mój pierwszy NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Zatwierdź plik package.json i możemy zaczynać!

## Krok 7: Zainstaluj [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat to środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga deweloperom w tworzeniu inteligentnych kontraktów i dapek lokalnie przed wdrożeniem ich na żywym łańcuchu.

Wewnątrz naszego projektu my-nft uruchom:

    ```
    npm install --save-dev hardhat
    ```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/getting-started/#overview).

## Krok 8: Utwórz projekt Hardhat {#create-hardhat-project}

W folderze naszego projektu uruchom:

    ```
    npx hardhat
    ```

Powinieneś wtedy zobaczyć wiadomość powitalną i opcję wyboru tego, co chcesz zrobić. Wybierz „utwórz pusty hardhat.config.js”:

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
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit
    ```

Spowoduje to wygenerowanie dla nas pliku hardhat.config.js, w którym określimy całą konfigurację naszego projektu (w kroku 13).

## Krok 9: Dodaj foldery projektu {#add-project-folders}

Aby utrzymać porządek w naszym projekcie, utworzymy dwa nowe foldery. Przejdź do katalogu głównego projektu w wierszu poleceń i wpisz:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ to miejsce, w którym będziemy przechowywać kod naszego inteligentnego kontraktu NFT

- scripts/ to miejsce, w którym będziemy przechowywać skrypty do wdrażania i interakcji z naszym inteligentnym kontraktem

## Krok 10: Napisz nasz kontrakt {#write-contract}

Teraz, gdy nasze środowisko jest skonfigurowane, przejdźmy do bardziej ekscytujących rzeczy: _pisania kodu naszego inteligentnego kontraktu!_

Otwórz projekt my-nft w swoim ulubionym edytorze (my lubimy [VSCode](https://code.visualstudio.com/)). Inteligentne kontrakty są pisane w języku zwanym Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu MyNFT.sol.‌

1. Przejdź do folderu `contracts` i utwórz nowy plik o nazwie MyNFT.sol

2. Poniżej znajduje się kod naszego inteligentnego kontraktu NFT, który oparliśmy na implementacji ERC-721 z biblioteki [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Skopiuj i wklej poniższą zawartość do pliku MyNFT.sol.

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

Na początku naszego inteligentnego kontraktu importujemy trzy klasy inteligentnych kontraktów [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol zawiera implementację standardu ERC-721, który odziedziczy nasz inteligentny kontrakt NFT. (Aby być prawidłowym NFT, twój inteligentny kontrakt musi implementować wszystkie metody standardu ERC-721). Aby dowiedzieć się więcej o odziedziczonych funkcjach ERC-721, sprawdź definicję interfejsu [tutaj](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol dostarcza liczniki, które mogą być zwiększane lub zmniejszane tylko o jeden. Nasz inteligentny kontrakt używa licznika do śledzenia całkowitej liczby wybitych NFT i ustawiania unikalnego ID dla naszego nowego NFT. (Każdy NFT wybity przy użyciu inteligentnego kontraktu musi mieć przypisane unikalne ID — tutaj nasze unikalne ID jest po prostu określane przez całkowitą liczbę istniejących NFT. Na przykład, pierwszy NFT, który wybijemy za pomocą naszego inteligentnego kontraktu, ma ID „1”, nasz drugi NFT ma ID „2” itd.).

- @openzeppelin/contracts/access/Ownable.sol konfiguruje [kontrolę dostępu](https://docs.openzeppelin.com/contracts/3.x/access-control) w naszym inteligentnym kontrakcie, więc tylko właściciel inteligentnego kontraktu (Ty) może wybijać NFT. (Uwaga, włączenie kontroli dostępu jest całkowicie kwestią preferencji. Jeśli chcesz, aby każdy mógł wybić NFT za pomocą Twojego inteligentnego kontraktu, usuń słowo `Ownable` w linii 10 i `onlyOwner` w linii 17).

Po naszych instrukcjach importu mamy nasz niestandardowy inteligentny kontrakt NFT, który jest zaskakująco krótki — zawiera tylko licznik, konstruktor i jedną funkcję! Jest to zasługa odziedziczonych kontraktów OpenZeppelin, które implementują większość metod potrzebnych do stworzenia NFT, takich jak `ownerOf`, która zwraca właściciela NFT, oraz `transferFrom`, która przenosi własność NFT z jednego konta na drugie.

W naszym konstruktorze ERC-721 zauważysz, że przekazujemy 2 ciągi znaków, „MyNFT” i „NFT”. Pierwsza zmienna to nazwa inteligentnego kontraktu, a druga to jego symbol. Możesz nazwać każdą z tych zmiennych, jak tylko chcesz!

Wreszcie, mamy naszą funkcję `mintNFT(address recipient, string memory tokenURI)`, która pozwala nam wybić NFT! Zauważysz, że ta funkcja przyjmuje dwie zmienne:

- `address recipient` określa adres, który otrzyma Twój świeżo wybity NFT

- `string memory tokenURI` to ciąg znaków, który powinien wskazywać na dokument JSON opisujący metadane NFT. Metadane NFT to to, co naprawdę ożywia go, pozwalając na konfigurowalne właściwości, takie jak nazwa, opis, obraz i inne atrybuty. W części 2 tego samouczka opiszemy, jak skonfigurować te metadane.

`mintNFT` wywołuje niektóre metody z odziedziczonej biblioteki ERC-721 i ostatecznie zwraca liczbę reprezentującą ID świeżo wybitego NFT.

## Krok 11: Połącz MetaMask i Alchemy z Twoim projektem {#connect-metamask-and-alchemy}

Teraz, gdy utworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego wirtualnego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby udzielić naszemu programowi tego uprawnienia, możemy bezpiecznie przechowywać nasz klucz prywatny (i klucz API Alchemy) w pliku środowiskowym.

Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [ten samouczek](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) o wysyłaniu transakcji przy użyciu web3.

Najpierw zainstaluj pakiet dotenv w katalogu swojego projektu:

    ```
    npm install dotenv --save
    ```

Następnie utwórz plik `.env` w katalogu głównym naszego projektu i dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

- Postępuj zgodnie z [tymi instrukcjami](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), aby wyeksportować swój klucz prywatny z MetaMask

- Zobacz poniżej, jak uzyskać adres URL HTTP API Alchemy i skopiować go do schowka

![Skopiuj swój adres URL API Alchemy](./copy-alchemy-api-url.gif)

Twój plik `.env` powinien teraz wyglądać tak:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/twój-klucz-api"
    PRIVATE_KEY="twój-prywatny-klucz-metamask"
    ```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku hardhat.config.js w kroku 13.

<EnvWarningBanner />

## Krok 12: Zainstaluj Ethers.js {#install-ethers}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum, opakowując [standardowe metody JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat bardzo ułatwia integrację [wtyczek](https://hardhat.org/plugins/) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności. Skorzystamy z [wtyczki Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) do wdrażania kontraktów ([Ethers.js](https://github.com/ethers-io/ethers.js/) ma kilka bardzo przejrzystych metod wdrażania kontraktów).

W katalogu projektu wpisz:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Będziemy również wymagać ethers w naszym pliku hardhat.config.js w następnym kroku.

## Krok 13: Zaktualizuj hardhat.config.js {#update-hardhat-config}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować hardhat.config.js, aby nasz projekt o nich wszystkich wiedział.

Zaktualizuj swój plik hardhat.config.js, aby wyglądał następująco:

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

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie kompilacji jest jednym z wbudowanych zadań Hardhat.

Z wiersza poleceń uruchom:

    ```
    npx hardhat compile
    ```

Możesz otrzymać ostrzeżenie o `SPDX license identifier not provided in source file`, ale nie musisz się tym martwić — miejmy nadzieję, że wszystko inne wygląda dobrze! Jeśli nie, zawsze możesz napisać wiadomość na [discordzie Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napisz nasz skrypt wdrożeniowy {#write-deploy}

Teraz, gdy nasz kontrakt jest napisany, a nasz plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać nasz skrypt wdrażający kontrakt.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Rozpocznij wdrożenie, zwracając obietnicę, która rozwiązuje się do obiektu kontraktu
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Kontrakt wdrożony pod adresem:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat wykonuje niesamowitą robotę, wyjaśniając, co robi każda z tych linii kodu w swoim [samouczku dotyczącym kontraktów](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), a my przyjęliśmy ich wyjaśnienia tutaj.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

`ContractFactory` w ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc `MyNFT` jest tutaj fabryką dla instancji naszego kontraktu NFT. Podczas korzystania z wtyczki hardhat-ethers, instancje `ContractFactory` i `Contract` są domyślnie połączone z pierwszym sygnatariuszem.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Wywołanie `deploy()` na `ContractFactory` rozpocznie wdrożenie i zwróci `Promise`, który rozwiązuje się do obiektu `Contract`. Jest to obiekt, który ma metodę dla każdej z naszych funkcji inteligentnego kontraktu.

## Krok 16: Wdróż nasz kontrakt {#deploy-contract}

Jesteśmy wreszcie gotowi do wdrożenia naszego inteligentnego kontraktu! Wróć do katalogu głównego swojego projektu i w wierszu poleceń uruchom:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Powinieneś wtedy zobaczyć coś takiego:

    ```
    Kontrakt wdrożony pod adresem: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Jeśli przejdziemy na [Etherscan Sepolia](https://sepolia.etherscan.io/) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Jeśli nie widzisz go od razu, poczekaj chwilę, ponieważ może to zająć trochę czasu. Transakcja będzie wyglądać mniej więcej tak:

![Zobacz adres swojej transakcji w Etherscan](./etherscan-sepoila-contract-creation.png)

Adres `From` powinien pasować do adresu Twojego konta MetaMask, a adres `To` będzie oznaczony jako „Tworzenie Kontraktu”. Jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu `To`:

![Zobacz adres swojego kontraktu w Etherscan](./etherscan-sepolia-tx-details.png)

Taaak! Właśnie wdrożyłeś swój inteligentny kontrakt NFT do łańcucha Ethereum (sieci testowej)!

Aby zrozumieć, co dzieje się pod maską, przejdźmy do karty Explorer w naszym [panelu Alchemy](https://dashboard.alchemyapi.io/explorer). Jeśli masz wiele aplikacji Alchemy, pamiętaj, aby filtrować według aplikacji i wybrać „MyNFT”.

![Zobacz wywołania wykonane „pod maską” za pomocą pulpitu nawigacyjnego Explorer firmy Alchemy](./alchemy-explorer-goerli.png)

Tutaj zobaczysz kilka wywołań JSON-RPC, które Hardhat/Ethers wykonały dla nas „pod maską”, gdy wywołaliśmy funkcję `.deploy()`. Dwa ważne, o których należy tu wspomnieć, to [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), czyli żądanie faktycznego zapisu naszego inteligentnego kontraktu na łańcuchu Sepolia, oraz [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), czyli żądanie odczytania informacji o naszej transakcji na podstawie jej hasza (typowy wzorzec podczas wysyłania transakcji). Aby dowiedzieć się więcej o wysyłaniu transakcji, zapoznaj się z tym samouczkiem na temat [wysyłania transakcji przy użyciu Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

To wszystko, jeśli chodzi o część 1 tego samouczka. W [części 2 będziemy faktycznie wchodzić w interakcję z naszym inteligentnym kontraktem, wybijając NFT](/developers/tutorials/how-to-mint-an-nft/), a w [części 3 pokażemy, jak wyświetlić swoje NFT w portfelu Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
