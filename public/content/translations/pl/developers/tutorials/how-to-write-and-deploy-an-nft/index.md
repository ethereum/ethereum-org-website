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

Ponieważ niewymienne tokeny (NFT) wprowadzają blockchain do świadomości publicznej, teraz jest doskonała okazja, aby samemu zrozumieć ten szum, publikując własny kontrakt NFT (token ERC-721) na blockchainie Ethereum!

W tym samouczku przejdziemy przez tworzenie i wdrażanie inteligentnego kontraktu ERC-721 w sieci testowej Sepolia przy użyciu [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) i [Alchemy](https://alchemy.com/signup/eth) (nie martw się, jeśli jeszcze nie rozumiesz, co to wszystko oznacza — wyjaśnimy to!).

W części 2 tego samouczka omówimy, jak możemy użyć naszego inteligentnego kontraktu do wybicia NFT, a w części 3 wyjaśnimy, jak wyświetlić swój NFT w MetaMask.

I oczywiście, jeśli w którymkolwiek momencie będziesz mieć pytania, nie wahaj się skontaktować na [Discordzie Alchemy](https://discord.gg/gWuC7zB) lub odwiedzić [dokumentację interfejsu programowania aplikacji (API) NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Krok 1: Połącz się z siecią Ethereum {#connect-to-ethereum}

Istnieje wiele sposobów na wysyłanie żądań do blockchaina Ethereum, ale dla ułatwienia użyjemy darmowego konta na [Alchemy](https://alchemy.com/signup/eth), platformie dla programistów blockchain i API, która pozwala nam komunikować się z łańcuchem Ethereum bez konieczności uruchamiania własnych węzłów.

W tym samouczku skorzystamy również z narzędzi programistycznych Alchemy do monitorowania i analityki, aby zrozumieć, co dzieje się pod maską podczas wdrożenia naszego inteligentnego kontraktu. Jeśli nie masz jeszcze konta Alchemy, możesz zarejestrować się za darmo [tutaj](https://alchemy.com/signup/eth).

## Krok 2: Utwórz swoją aplikację (i klucz API) {#make-api-key}

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na wysyłanie żądań do sieci testowej Sepolia. Sprawdź [ten przewodnik](https://www.alchemy.com/docs/choosing-a-web3-network), jeśli chcesz dowiedzieć się więcej o sieciach testowych.

1. Przejdź do strony „Create new app” w swoim panelu Alchemy, wybierając „Select an app” na pasku nawigacyjnym i klikając „Create new app”

![Utwórz swoją aplikację](./alchemy-create-new-app.png)

2. Nazwij swoją aplikację (my wybraliśmy „My First NFT!”), dodaj krótki opis i wybierz przypadek użycia. Następnie wyszukaj „Ethereum” i wybierz sieć. Użyjemy Sepolia, zalecanej sieci testowej do tworzenia aplikacji (zobacz [sieci Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Kliknij „Next”, aby kontynuować, a następnie „Create app” i to wszystko! Twoja aplikacja powinna pojawić się w menu rozwijanym na pasku nawigacyjnym, z kluczem API gotowym do skopiowania.

## Krok 3: Utwórz konto Ethereum (adres) {#create-eth-address}

Potrzebujemy konta Ethereum, aby wysyłać i odbierać transakcje. W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, służącego do zarządzania adresem konta Ethereum. Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/) od Fundacji Ethereum.

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta lub jeśli już je masz, upewnij się, że przełączyłeś się na sieć testową „Sepolia” za pomocą menu wyboru sieci (abyśmy nie operowali prawdziwymi pieniędzmi). Jeśli nie widzisz Sepolia na liście, otwórz menu w prawym górnym rogu, wybierz „Networks” i włącz „Show test networks” (zobacz [przewodnik MetaMask dotyczący wyświetlania sieci testowych](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Ustaw Sepolia jako swoją sieć](./metamask-sepolia.png)

## Krok 4: Dodaj ether z kranika {#step-4-add-ether-from-a-faucet}

Aby wdrożyć nasz inteligentny kontrakt w sieci testowej, będziemy potrzebować trochę fałszywego ETH. Aby zdobyć Sepolia ETH, wybierz jeden z kraników wymienionych w [szczegółach sieci Sepolia](/developers/docs/networks/#sepolia) i wprowadź adres swojego konta. Jeśli jeden nie działa, spróbuj innego, ponieważ czasami mogą wyschnąć, a niektóre mają zasady kwalifikowalności: na przykład [kranik Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia) wymaga, aby adres odbiorczy posiadał co najmniej 0,001 ETH w sieci głównej Ethereum. Wkrótce potem powinieneś zobaczyć ETH na swoim koncie MetaMask!

## Krok 5: Sprawdź swoje saldo {#check-balance}

Aby upewnić się, że nasze saldo tam jest, wyślijmy żądanie [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) za pomocą [narzędzia sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Send Request”, powinieneś zobaczyć odpowiedź podobną do tej:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Uwaga** Ten wynik jest w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru. Przelicznik z wei na ETH to 1 eth = 10<sup>18</sup> wei. Więc jeśli zamienimy 0xde0b6b3a7640000 na system dziesiętny, otrzymamy 1\*10<sup>18</sup> wei, co równa się 1 ETH.

Uff! Nasze fałszywe pieniądze są na miejscu.

## Krok 6: Zainicjuj nasz projekt {#initialize-project}

Najpierw będziemy musieli utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wpisz:

```sh
mkdir my-nft
cd my-nft
```

Teraz, gdy jesteśmy w folderze naszego projektu, użyjemy `npm init`, aby zainicjować projekt. Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [instrukcjami instalacji Node.js](https://nodejs.org/en/download/) (do tego samouczka będziemy potrzebować Node.js i npm).

```sh
npm init
```

Nie ma większego znaczenia, jak odpowiesz na pytania instalacyjne; oto jak my to zrobiliśmy w celach informacyjnych:

```console
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

Zatwierdź plik package.json. Hardhat 3, którego zainstalujemy w następnej kolejności, obsługuje tylko projekty modułów ES, więc oznacz projekt jako taki:

```sh
npm pkg set type=module
```

I jesteśmy gotowi do działania!

## Krok 7: Zainstaluj [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat to środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga programistom podczas lokalnego tworzenia inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp) przed wdrożeniem ich w działającym łańcuchu.

Hardhat 3 wymaga Node.js w wersji v22.13.0 lub nowszej. Wewnątrz naszego projektu my-nft uruchom:

```sh
npm install --save-dev hardhat
```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/docs/getting-started).

## Krok 8: Utwórz projekt Hardhat {#create-hardhat-project}

Uruchomienie `npx hardhat --init` wygenerowałoby kompletny przykładowy projekt, ale w tym samouczku skonfigurujemy wszystko ręcznie, abyś mógł zobaczyć każdy element. W katalogu głównym folderu projektu utwórz plik o nazwie `hardhat.config.js` z następującą zawartością:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

To tutaj określimy całą konfigurację naszego projektu (w kroku 13). Na razie mówi to tylko Hardhatowi, której wersji kompilatora Solidity użyć.

## Krok 9: Dodaj foldery projektu {#add-project-folders}

Aby utrzymać porządek w naszym projekcie, utworzymy dwa nowe foldery. Przejdź do katalogu głównego swojego projektu w wierszu poleceń i wpisz:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ to miejsce, w którym będziemy przechowywać kod naszego inteligentnego kontraktu NFT

- scripts/ to miejsce, w którym będziemy przechowywać skrypty do wdrażania i interakcji z naszym inteligentnym kontraktem

## Krok 10: Napisz nasz kontrakt {#write-contract}

Teraz, gdy nasze środowisko jest skonfigurowane, przejdźmy do bardziej ekscytujących rzeczy: _pisania kodu naszego inteligentnego kontraktu!_

Otwórz projekt my-nft w swoim ulubionym edytorze (my lubimy [VSCode](https://code.visualstudio.com/)). Inteligentne kontrakty są pisane w języku zwanym Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu MyNFT.sol.‌

1. Przejdź do folderu `contracts` i utwórz nowy plik o nazwie MyNFT.sol

2. Poniżej znajduje się kod naszego inteligentnego kontraktu NFT, który oparliśmy na implementacji ERC-721 z biblioteki [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Skopiuj i wklej poniższą zawartość do pliku MyNFT.sol.

   ```solidity
   // Kontrakt oparty na https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Ponieważ dziedziczymy klasy z biblioteki kontraktów OpenZeppelin, w wierszu poleceń uruchom `npm install @openzeppelin/contracts`, aby zainstalować bibliotekę w naszym folderze. Ten samouczek używa OpenZeppelin Contracts 5.x, co wymaga Solidity 0.8.24 lub nowszego.

Więc co dokładnie _robi_ ten kod? Przeanalizujmy go linijka po linijce.

Na samej górze naszego inteligentnego kontraktu importujemy trzy klasy inteligentnych kontraktów [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol zawiera implementację standardu ERC-721, którą odziedziczy nasz inteligentny kontrakt NFT. (Aby być prawidłowym NFT, Twój inteligentny kontrakt musi implementować wszystkie metody standardu ERC-721). Aby dowiedzieć się więcej o odziedziczonych funkcjach ERC-721, sprawdź definicję interfejsu [tutaj](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol konfiguruje [kontrolę dostępu](https://docs.openzeppelin.com/contracts/5.x/access-control) w naszym inteligentnym kontrakcie, dzięki czemu tylko właściciel inteligentnego kontraktu (Ty) może wybijać NFT. Właścicielem jest adres `initialOwner` przekazany do konstruktora. (Uwaga, włączenie kontroli dostępu jest całkowicie opcjonalne. Jeśli chcesz, aby każdy mógł wybijać NFT za pomocą Twojego inteligentnego kontraktu, usuń `Ownable` i `Ownable(initialOwner)` z definicji kontraktu i konstruktora oraz `onlyOwner` z funkcji `mintNFT`).

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol rozszerza ERC-721, dzięki czemu każdy token może przechowywać własny identyfikator URI metadanych, który ustawiamy podczas wybijania.

Po naszych instrukcjach importu mamy nasz niestandardowy inteligentny kontrakt NFT, który jest zaskakująco krótki — zawiera tylko licznik, konstruktor i jedną funkcję! Dzieje się tak dzięki naszym odziedziczonym kontraktom OpenZeppelin, które implementują większość metod potrzebnych do utworzenia NFT, takich jak `ownerOf`, która zwraca właściciela NFT, oraz `transferFrom`, która przenosi własność NFT z jednego konta na drugie.

Licznik `_nextTokenId` śledzi całkowitą liczbę wybitych NFT i ustawia unikalny identyfikator dla naszego nowego NFT. (Każdy NFT wybity za pomocą inteligentnego kontraktu musi mieć przypisany unikalny identyfikator — tutaj nasz unikalny identyfikator jest po prostu określany przez całkowitą liczbę istniejących NFT. `++_nextTokenId` zwiększa licznik przed jego użyciem, więc pierwszy NFT, który wybijamy za pomocą naszego inteligentnego kontraktu, ma identyfikator „1”, nasz drugi NFT ma identyfikator „2” itd.).

W naszym konstruktorze ERC-721 zauważysz, że przekazujemy 2 ciągi znaków: „MyNFT” i „NFT”. Pierwsza zmienna to nazwa inteligentnego kontraktu, a druga to jego symbol. Możesz nazwać każdą z tych zmiennych, jak tylko chcesz!

Na koniec mamy naszą funkcję `mintNFT(address recipient, string memory tokenURI)`, która pozwala nam wybić NFT! Zauważysz, że ta funkcja przyjmuje dwie zmienne:

- `address recipient` określa adres, który otrzyma Twój świeżo wybity NFT

- `string memory tokenURI` to ciąg znaków, który powinien wskazywać na dokument JSON opisujący metadane NFT. Metadane NFT to tak naprawdę to, co ożywia token, pozwalając mu na posiadanie konfigurowalnych właściwości, takich jak nazwa, opis, obraz i inne atrybuty. W części 2 tego samouczka opiszemy, jak skonfigurować te metadane.

`mintNFT` wywołuje niektóre metody z odziedziczonej biblioteki ERC-721 i ostatecznie zwraca liczbę reprezentującą identyfikator świeżo wybitego NFT.

## Krok 11: Połącz MetaMask i Alchemy ze swoim projektem {#connect-metamask-and-alchemy}

Teraz, gdy utworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego wirtualnego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby zapewnić naszemu programowi to uprawnienie, możemy bezpiecznie przechowywać nasz klucz prywatny (i klucz API Alchemy) w pliku środowiskowym.

Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [dokumentację transakcji](/developers/docs/transactions/).

Utwórz plik `.env` w katalogu głównym naszego projektu i dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

- Postępuj zgodnie z [tymi instrukcjami](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), aby wyeksportować swój klucz prywatny z MetaMask

- Zobacz poniżej, jak uzyskać adres URL HTTP API Alchemy i skopiować go do schowka

![Skopiuj swój adres URL API Alchemy](./copy-alchemy-api-url.mp4#842x480)

Twój plik `.env` powinien teraz wyglądać tak:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku hardhat.config.js w kroku 13. Node.js potrafi samodzielnie odczytywać pliki `.env`, więc nie ma potrzeby instalowania dodatkowego pakietu.

<EnvWarningBanner />

## Krok 12: Zainstaluj Ethers.js {#install-ethers}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum poprzez opakowanie [standardowych metod JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat sprawia, że integracja [wtyczek](https://hardhat.org/docs/plugins/official-plugins) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności jest niezwykle prosta. Będziemy korzystać z [wtyczki Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) do wdrażania kontraktów ([Ethers.js](https://docs.ethers.org/v6/) ma kilka bardzo przejrzystych metod wdrażania kontraktów).

W katalogu swojego projektu wpisz:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

W następnym kroku dodamy również wtyczkę do naszego pliku hardhat.config.js.

## Krok 13: Zaktualizuj hardhat.config.js {#update-hardhat-config}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować plik hardhat.config.js, aby nasz projekt wiedział o nich wszystkich.

Zaktualizuj swój plik hardhat.config.js, aby wyglądał tak:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Wczytaj API_URL i PRIVATE_KEY z pliku .env do process.env, jeśli istnieje
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` mówi Hardhatowi, aby odczytywał każdą wartość ze zmiennej środowiskowej tylko wtedy, gdy jest to potrzebne, dzięki czemu polecenia takie jak `compile` działają nawet przed ustawieniem wartości. Jeśli wolisz nie przechowywać swojego klucza prywatnego w pliku tekstowym, Hardhat może również odczytywać [zmienne konfiguracyjne z zaszyfrowanego magazynu kluczy](https://hardhat.org/docs/guides/configuration-variables).

## Krok 14: Skompiluj nasz kontrakt {#compile-contract}

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie kompilacji jest jednym z wbudowanych zadań Hardhata.

Z wiersza poleceń uruchom:

```sh
npx hardhat compile
```

Przy pierwszej kompilacji Hardhat pobiera kompilator Solidity. Następnie powinieneś zobaczyć coś w stylu `Compiled 1 Solidity file with solc 0.8.34`. Jeśli nie, zawsze możesz napisać na [Discordzie Alchemy](https://discord.gg/gWuC7zB).

## Krok 15: Napisz nasz skrypt wdrożeniowy {#write-deploy}

Teraz, gdy nasz kontrakt jest napisany, a plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać nasz skrypt wdrożeniowy kontraktu.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Rozpocznij wdrożenie, zwracając obietnicę, która rozwiązuje się do obiektu kontraktu
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Przeanalizujmy, co robi każda z tych linii kodu.

```js
const { ethers } = await network.create()
```

W Hardhat 3 skrypt jawnie otwiera połączenie z siecią. `network.create()` łączy się z siecią wybraną za pomocą opcji `--network` podczas uruchamiania skryptu, a wtyczka `hardhat-ethers` dodaje obiekt `ethers` do tego połączenia.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` zwraca konta skonfigurowane dla sieci. W Sepolia jest to konto, którego klucz prywatny umieściłeś w pliku `.env`. Przekazujemy jego adres do konstruktora, abyś stał się właścicielem kontraktu.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

ContractFactory w Ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc MyNFT jest tutaj fabryką dla instancji naszego kontraktu NFT. Podczas korzystania z wtyczki hardhat-ethers instancje ContractFactory i Contract są domyślnie połączone z pierwszym sygnatariuszem.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Wywołanie deploy() na ContractFactory rozpocznie wdrożenie i zwróci Promise, który rozwiązuje się do Contract. Jest to obiekt, który ma metodę dla każdej z funkcji naszego inteligentnego kontraktu. Argumenty przekazywane do deploy() trafiają do konstruktora kontraktu, tutaj jest to adres `initialOwner`.

`waitForDeployment()` czeka, aż transakcja wdrożenia zostanie włączona do bloku, a `getAddress()` zwraca adres nowego kontraktu. Zobacz [dokumentację kontraktów Ethers.js](https://docs.ethers.org/v6/api/contract/), aby uzyskać więcej szczegółów.

## Krok 16: Wdróż nasz kontrakt {#deploy-contract}

W końcu jesteśmy gotowi do wdrożenia naszego inteligentnego kontraktu! Wróć do katalogu głównego swojego projektu i w wierszu poleceń uruchom:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Powinieneś wtedy zobaczyć coś w stylu:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Jeśli przejdziemy do [Etherscan Sepolia](https://sepolia.etherscan.io/) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Jeśli nie widzisz go od razu, poczekaj chwilę, ponieważ może to trochę potrwać. Transakcja będzie wyglądać mniej więcej tak:

![Wyświetl adres swojej transakcji w Etherscan](./etherscan-sepoila-contract-creation.png)

Adres From powinien odpowiadać adresowi Twojego konta MetaMask, a adres To będzie wskazywał „Contract Creation”. Jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu To:

![Wyświetl adres swojego kontraktu w Etherscan](./etherscan-sepolia-tx-details.png)

Taaak! Właśnie wdrożyłeś swój inteligentny kontrakt NFT w łańcuchu (sieci testowej) Ethereum!

Aby zrozumieć, co dzieje się pod maską, możesz spojrzeć na żądania, które Twoja aplikacja otrzymała w [panelu Alchemy](https://dashboard.alchemy.com/).

Zobaczysz tam garść wywołań JSON-RPC, które Hardhat/Ethers wykonały dla nas pod maską, gdy wywołaliśmy funkcję .deploy(). Dwa ważne, o których warto tutaj wspomnieć, to [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), które jest żądaniem faktycznego zapisania naszego inteligentnego kontraktu w łańcuchu Sepolia, oraz [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), które jest żądaniem odczytania informacji o naszej transakcji na podstawie hasha (typowy wzorzec podczas wysyłania transakcji). Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [dokumentację transakcji](/developers/docs/transactions/).

To wszystko w części 1 tego samouczka. W [części 2 faktycznie wejdziemy w interakcję z naszym inteligentnym kontraktem, wybijając NFT](/developers/tutorials/how-to-mint-an-nft/), a w [części 3 pokażemy Ci, jak wyświetlić swój NFT w portfelu Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
