---
title: "Inteligentny kontrakt Hello World dla początkujących"
description: "Wprowadzający samouczek dotyczący pisania i wdrażania prostego inteligentnego kontraktu w sieci Ethereum."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "inteligentne kontrakty", "wdrażanie"]
skill: beginner
breadcrumb: Kontrakt Hello World
lang: pl
published: 2021-03-31
---

Jeśli jesteś nowym programistą blockchain i nie wiesz, od czego zacząć, lub jeśli po prostu chcesz zrozumieć, jak wdrożyć i wchodzić w interakcje z inteligentnymi kontraktami, ten przewodnik jest dla Ciebie. Przejdziemy przez proces tworzenia i wdrażania prostego inteligentnego kontraktu w sieci testowej Sepolia przy użyciu wirtualnego portfela [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) i [Alchemy](https://www.alchemy.com/eth) (nie martw się, jeśli jeszcze nie rozumiesz, co to wszystko oznacza, wyjaśnimy to).

Po wdrożeniu kontraktu możesz [zbudować dla niego interfejs użytkownika](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Jeśli w którymkolwiek momencie będziesz mieć pytania, śmiało napisz na [Discordzie Alchemy](https://discord.gg/gWuC7zB)!

## Krok 1: Połącz się z siecią Ethereum {#step-1}

Istnieje wiele sposobów na wysyłanie żądań do łańcucha Ethereum. Dla uproszczenia użyjemy darmowego konta na Alchemy, platformie dla programistów blockchain i API, która pozwala nam komunikować się z łańcuchem Ethereum bez konieczności uruchamiania własnych węzłów. Platforma posiada również narzędzia programistyczne do monitorowania i analityki, z których skorzystamy w tym samouczku, aby zrozumieć, co dzieje się pod maską podczas wdrażania naszego inteligentnego kontraktu. Jeśli nie masz jeszcze konta Alchemy, [możesz zarejestrować się za darmo tutaj](https://dashboard.alchemy.com/signup).

## Krok 2: Utwórz swoją aplikację (i klucz API) {#step-2}

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na wysyłanie żądań do sieci testowej Sepolia. Jeśli nie znasz sieci testowych, sprawdź [tę stronę](/developers/docs/networks/).

1.  Przejdź do strony „Create new app” (Utwórz nową aplikację) w panelu Alchemy, wybierając „Select an app” (Wybierz aplikację) na pasku nawigacyjnym i klikając „Create new app”.

![Hello world create app](./hello-world-create-app.png)

2. Nazwij swoją aplikację „Hello World”, dodaj krótki opis i wybierz przypadek użycia, np. „Infra & Tooling”. Następnie wyszukaj „Ethereum” i wybierz sieć.

![create app view hello world](./create-app-view-hello-world.png)

3. Kliknij „Next” (Dalej), aby kontynuować, a następnie „Create app” (Utwórz aplikację) i to wszystko! Twoja aplikacja powinna pojawić się w menu rozwijanym na pasku nawigacyjnym, a klucz API będzie gotowy do skopiowania.

## Krok 3: Utwórz konto Ethereum (adres) {#step-3}

Potrzebujemy konta Ethereum, aby wysyłać i odbierać transakcje. W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, służącego do zarządzania adresem konta Ethereum. Więcej o [transakcjach](/developers/docs/transactions/).

Możesz pobrać MetaMask i utworzyć konto Ethereum za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta lub jeśli już je posiadasz, upewnij się, że przełączyłeś się na sieć testową „Sepolia” za pomocą menu rozwijanego sieci (abyśmy nie operowali prawdziwymi pieniędzmi).

Jeśli nie widzisz Sepolii na liście, otwórz menu w prawym górnym rogu, wybierz „Networks” (Sieci) i włącz opcję „Show test networks” (Pokaż sieci testowe) na dole listy sieci (zobacz [przewodnik MetaMask dotyczący wyświetlania sieci testowych](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Następnie wybierz „Sepolia” w menu wyboru sieci.

![metamask sepolia example](./metamask-sepolia-example.png)

## Krok 4: Dodaj ether z kranika {#step-4}

Aby wdrożyć nasz inteligentny kontrakt w sieci testowej, będziemy potrzebować trochę fałszywego ETH. Aby zdobyć Sepolia ETH, możesz przejść do [szczegółów sieci Sepolia](/developers/docs/networks/#sepolia), aby wyświetlić listę różnych kraników. Jeśli jeden nie działa, spróbuj innego, ponieważ czasami mogą one wyschnąć. Niektóre kraniki mają zasady kwalifikowalności; na przykład kranik Sepolia od Alchemy wymaga, aby adres odbiorczy posiadał co najmniej 0,001 ETH w sieci głównej Ethereum. Otrzymanie fałszywego ETH może zająć trochę czasu ze względu na ruch w sieci. Wkrótce potem powinieneś zobaczyć ETH na swoim koncie MetaMask!

## Krok 5: Sprawdź swoje saldo {#step-5}

Aby upewnić się, że nasze saldo tam jest, wyślijmy żądanie [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) za pomocą [narzędzia composer od Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Send Request” (Wyślij żądanie), powinieneś zobaczyć odpowiedź podobną do tej:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **UWAGA:** Ten wynik jest w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru. Przelicznik z wei na ETH to: 1 eth = 10<sup>18</sup> wei. Więc jeśli przekonwertujemy 0x2B5E3AF16B1880000 na system dziesiętny, otrzymamy 5\*10¹⁸, co równa się 5 ETH.
>
> Uff! Nasze fałszywe pieniądze są na miejscu <Emoji text=":money_mouth_face:" size={1} />.

## Krok 6: Zainicjuj nasz projekt {#step-6}

Najpierw będziemy musieli utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wpisz:

```sh
mkdir hello-world
cd hello-world
```

Teraz, gdy jesteśmy w folderze naszego projektu, użyjemy `npm init`, aby zainicjować projekt. Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [instrukcjami instalacji Node.js](https://nodejs.org/en/download/) (do tego samouczka będziemy potrzebować Node.js i npm).

```sh
npm init
```

Nie ma większego znaczenia, jak odpowiesz na pytania instalacyjne, oto jak my to zrobiliśmy w celach informacyjnych:

```text
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
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

I jesteśmy gotowi!

## Krok 7: Pobierz [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat to środowisko programistyczne do kompilowania, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga programistom podczas lokalnego budowania inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp) przed wdrożeniem ich w działającym łańcuchu.

Hardhat 3 wymaga Node.js w wersji v22.13.0 lub nowszej. Wewnątrz naszego projektu `hello-world` uruchom:

```sh
npm install --save-dev hardhat
```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/docs/getting-started).

## Krok 8: Utwórz projekt Hardhat {#step-8}

Uruchomienie `npx hardhat --init` wygenerowałoby kompletny przykładowy projekt, ale w tym samouczku skonfigurujemy wszystko ręcznie, abyś mógł zobaczyć każdy element. W katalogu głównym folderu projektu utwórz plik o nazwie `hardhat.config.js` z następującą zawartością:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

To tutaj określimy całą konfigurację naszego projektu (w kroku 13). Na razie mówi to tylko Hardhatowi, której wersji kompilatora Solidity użyć.

## Krok 9: Dodaj foldery projektu {#step-9}

Aby utrzymać porządek w naszym projekcie, utworzymy dwa nowe foldery. Przejdź do katalogu głównego swojego projektu w wierszu poleceń i wpisz:

```
mkdir contracts
mkdir scripts
```

- `contracts/` to miejsce, w którym będziemy przechowywać plik z kodem naszego inteligentnego kontraktu hello world
- `scripts/` to miejsce, w którym będziemy przechowywać skrypty do wdrażania i interakcji z naszym kontraktem

## Krok 10: Napisz nasz kontrakt {#step-10}

Możesz zadawać sobie pytanie, kiedy do cholery zaczniemy pisać kod?? Cóż, oto jesteśmy, w kroku 10.

Otwórz projekt hello-world w swoim ulubionym edytorze (my lubimy [VSCode](https://code.visualstudio.com/)). Inteligentne kontrakty są pisane w języku zwanym Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu HelloWorld.sol.‌

1.  Przejdź do folderu „contracts” i utwórz nowy plik o nazwie HelloWorld.sol
2.  Poniżej znajduje się przykładowy inteligentny kontrakt Hello World od Fundacji Ethereum, którego będziemy używać w tym samouczku. Skopiuj i wklej poniższą zawartość do pliku HelloWorld.sol i upewnij się, że przeczytałeś komentarze, aby zrozumieć, co robi ten kontrakt:

```solidity
// SPDX-License-Identifier: MIT
// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stan). Po wdrożeniu kontrakt znajduje się pod określonym adresem na blockchainie Ethereum. Dowiedz się więcej: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` sprawia, że zmienne są dostępne spoza kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do wartości.
   string public message;

   // Podobnie jak w wielu językach obiektowych opartych na klasach, konstruktor to specjalna funkcja, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjowania danych kontraktu. Dowiedz się więcej: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Przyjmuje argument typu string `initMessage` i ustawia wartość w zmiennej przechowywania `message` kontraktu).
      message = initMessage;
   }

   // Publiczna funkcja, która przyjmuje argument typu string i aktualizuje zmienną przechowywania `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

To super prosty inteligentny kontrakt, który przechowuje wiadomość po utworzeniu i może zostać zaktualizowany poprzez wywołanie funkcji `update`.

## Krok 11: Połącz MetaMask i Alchemy ze swoim projektem {#step-11}

Utworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, teraz nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego wirtualnego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby zapewnić naszemu programowi to uprawnienie, możemy bezpiecznie przechowywać nasz klucz prywatny (i klucz API Alchemy) w pliku środowiskowym.

> Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [dokumentację transakcji](/developers/docs/transactions/).

Utwórz plik `.env` w katalogu głównym naszego projektu i dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

- Postępuj zgodnie z [tymi instrukcjami](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), aby wyeksportować swój klucz prywatny
- Zobacz poniżej, jak uzyskać adres URL HTTP API Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Skopiuj adres URL API Alchemy

Twój plik `.env` powinien wyglądać tak:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku `hardhat.config.js` w kroku 13. Node.js potrafi samodzielnie odczytywać pliki `.env`, więc nie ma potrzeby instalowania dodatkowego pakietu.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nie commituj pliku <code>.env</code>! Upewnij się, że nigdy nie udostępniasz ani nie ujawniasz swojego pliku <code>.env</code> nikomu, ponieważ w ten sposób narażasz swoje sekrety. Jeśli używasz kontroli wersji, dodaj swój plik <code>.env</code> do pliku <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Krok 12: Zainstaluj Ethers.js {#step-12-install-ethersjs}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum poprzez opakowanie [standardowych metod JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat sprawia, że integracja [wtyczek](https://hardhat.org/docs/plugins/official-plugins) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności jest niezwykle prosta. Skorzystamy z [wtyczki Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) do wdrożenia kontraktu ([Ethers.js](https://docs.ethers.org/v6/) ma kilka bardzo przejrzystych metod wdrażania kontraktów).

W katalogu swojego projektu wpisz:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

W następnym kroku dodamy również wtyczkę do naszego pliku `hardhat.config.js`.

## Krok 13: Zaktualizuj hardhat.config.js {#step-13-update-hardhatconfigjs}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować `hardhat.config.js`, aby nasz projekt wiedział o nich wszystkich.

Zaktualizuj swój plik `hardhat.config.js`, aby wyglądał tak:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Ładuje API_URL i PRIVATE_KEY z pliku .env do process.env, jeśli istnieje
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

`configVariable` mówi Hardhatowi, aby odczytywał każdą wartość ze zmiennej środowiskowej tylko wtedy, gdy jest to potrzebne, więc polecenia takie jak `compile` działają nawet przed ustawieniem wartości. Jeśli wolisz nie trzymać swojego klucza prywatnego w pliku tekstowym, Hardhat może również odczytywać [zmienne konfiguracyjne z zaszyfrowanego magazynu kluczy](https://hardhat.org/docs/guides/configuration-variables).

## Krok 14: Skompiluj nasz kontrakt {#step-14-compile-our-contracts}

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie `compile` jest jednym z wbudowanych zadań Hardhata.

Z wiersza poleceń uruchom:

```sh
npx hardhat compile
```

Przy pierwszej kompilacji Hardhat pobiera kompilator Solidity. Następnie powinieneś zobaczyć coś w stylu `Compiled 1 Solidity file with solc 0.8.34`. Jeśli nie, zawsze możesz napisać na [Discordzie Alchemy](https://discord.gg/gWuC7zB).

## Krok 15: Napisz nasz skrypt wdrożeniowy {#step-15-write-our-deploy-scripts}

Teraz, gdy nasz kontrakt jest napisany, a plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać skrypt wdrożeniowy naszego kontraktu.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Rozpoczyna wdrożenie, zwracając obietnicę, która rozwiązuje się do obiektu kontraktu
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Przeanalizujmy, co robi każda z tych linii kodu.

```js
const { ethers } = await network.create()
```

W Hardhat 3 skrypt jawnie otwiera połączenie z siecią. `network.create()` łączy się z siecią wybraną za pomocą opcji `--network` podczas uruchamiania skryptu, a wtyczka `hardhat-ethers` dodaje obiekt `ethers` do tego połączenia.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` w ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc `HelloWorld` jest tutaj fabryką dla instancji naszego kontraktu hello world. Podczas korzystania z wtyczki `hardhat-ethers` instancje `ContractFactory` i `Contract` są domyślnie połączone z pierwszym podpisującym.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Wywołanie `deploy()` na `ContractFactory` rozpocznie wdrożenie i zwróci `Promise`, który rozwiązuje się do `Contract`. Jest to obiekt, który ma metodę dla każdej z funkcji naszego inteligentnego kontraktu. Argumenty przekazywane do `deploy()` trafiają do konstruktora kontraktu, w tym przypadku jest to początkowa wiadomość.

`waitForDeployment()` czeka, aż transakcja wdrożeniowa zostanie włączona do bloku, a `getAddress()` zwraca adres nowego kontraktu. Zobacz [dokumentację kontraktów ethers.js](https://docs.ethers.org/v6/api/contract/), aby uzyskać więcej szczegółów.

## Krok 16: Wdróż nasz kontrakt {#step-16-deploy-our-contract}

W końcu jesteśmy gotowi na wdrożenie naszego inteligentnego kontraktu! Przejdź do wiersza poleceń i uruchom:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Następnie powinieneś zobaczyć coś w stylu:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jeśli przejdziemy do [Etherscan dla Sepolii](https://sepolia.etherscan.io/) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Transakcja będzie wyglądać mniej więcej tak:

![etherscan contract](./etherscan-contract.png)

Adres `From` powinien odpowiadać adresowi Twojego konta MetaMask, a adres `To` będzie wskazywał „Contract Creation”, ale jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu `To`:

![etherscan transaction](./etherscan-transaction.png)

Gratulacje! Właśnie wdrożyłeś inteligentny kontrakt w łańcuchu Ethereum 🎉

Aby zrozumieć, co dzieje się pod maską, możesz spojrzeć na żądania, które Twoja aplikacja „Hello World” otrzymała w [panelu Alchemy](https://dashboard.alchemy.com/).

Zobaczysz tam garść wywołań JSON-RPC, które Hardhat/Ethers wykonały dla nas pod maską, gdy wywołaliśmy funkcję `.deploy()`. Dwa ważne, o których warto tutaj wspomnieć, to [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), które jest żądaniem faktycznego zapisania naszego kontraktu w łańcuchu Sepolia, oraz [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash), które jest żądaniem odczytania informacji o naszej transakcji na podstawie hasha (typowy wzorzec podczas wysyłania transakcji). Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [dokumentację transakcji](/developers/docs/transactions/).

To wszystko w tym samouczku. Następnie możesz [zbudować interfejs użytkownika dla swojego kontraktu](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
