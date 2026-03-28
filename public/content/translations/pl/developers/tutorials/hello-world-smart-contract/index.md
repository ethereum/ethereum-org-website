---
title: "Inteligentny kontrakt Hello World dla początkujących"
description: "Samouczek wprowadzający na temat pisania i wdrażania prostego inteligentnego kontraktu na Ethereum."
author: "elanh"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "smart kontrakty",
    "wdrażanie"
  ]
skill: beginner
lang: pl
published: 2021-03-31
---

Jeśli dopiero zaczynasz przygodę z tworzeniem oprogramowania blockchain i nie wiesz, od czego zacząć, lub jeśli po prostu chcesz zrozumieć, jak wdrażać inteligentne kontrakty i wchodzić z nimi w interakcję, ten przewodnik jest dla Ciebie. Przeprowadzimy Cię przez proces tworzenia i wdrażania prostego inteligentnego kontraktu w sieci testowej Sepolia przy użyciu wirtualnego portfela [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) i [Alchemy](https://www.alchemy.com/) (nie martw się, jeśli jeszcze nie rozumiesz, co to wszystko znaczy, wyjaśnimy to).

W [części 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) tego samouczka omówimy, jak wejść w interakcję z naszym inteligentnym kontraktem po jego wdrożeniu, a w [części 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) omówimy, jak opublikować go na Etherscan.

Jeśli w dowolnym momencie będziesz mieć pytania, śmiało odezwij się na [Discordzie Alchemy](https://discord.gg/gWuC7zB)!

## Krok 1: Połącz się z siecią Ethereum {#step-1}

Istnieje wiele sposobów na wysyłanie żądań do łańcucha Ethereum. Dla uproszczenia użyjemy darmowego konta na Alchemy, platformy deweloperskiej i interfejsu API blockchain, która pozwala nam komunikować się z łańcuchem Ethereum bez konieczności uruchamiania własnych węzłów. Platforma posiada również narzędzia deweloperskie do monitorowania i analityki, które wykorzystamy w tym samouczku, aby zrozumieć, co dzieje się „pod maską” podczas wdrażania naszego inteligentnego kontraktu. Jeśli nie masz jeszcze konta Alchemy, [możesz zarejestrować się za darmo tutaj](https://dashboard.alchemy.com/signup).

## Krok 2: Stwórz swoją aplikację (i klucz API) {#step-2}

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli nam to na wysyłanie żądań do sieci testowej Sepolia. Jeśli nie znasz sieci testowych, sprawdź [tę stronę](/developers/docs/networks/).

1. Przejdź na stronę "Utwórz nową aplikację" w pulpicie nawigacyjnym Alchemy, wybierając "Wybierz aplikację" na pasku nawigacyjnym i klikając "Utwórz nową aplikację"

![Utwórz aplikację Hello world](./hello-world-create-app.png)

2. Nazwij swoją aplikację "Hello World", podaj krótki opis i wybierz przypadek użycia, np. "Infrastruktura i narzędzia". Następnie wyszukaj "Ethereum" i wybierz sieć.

![widok tworzenia aplikacji hello world](./create-app-view-hello-world.png)

3. Kliknij "Dalej", aby kontynuować, następnie "Utwórz aplikację" i to wszystko! Twoja aplikacja powinna pojawić się w rozwijanym menu paska nawigacyjnego, z kluczem API dostępnym do skopiowania.

## Krok 3: Utwórz konto Ethereum (adres) {#step-3}

Potrzebujemy konta Ethereum do wysyłania i odbierania transakcji. W tym samouczku użyjemy MetaMask, wirtualnego portfela w przeglądarce, który służy do zarządzania adresem konta Ethereum. Więcej o [transakcjach](/developers/docs/transactions/).

Możesz pobrać MetaMask i utworzyć darmowe konto Ethereum [tutaj](https://metamask.io/download). Podczas tworzenia konta lub jeśli już je posiadasz, pamiętaj, aby przełączyć się na sieć testową "Sepolia" za pomocą rozwijanego menu sieci (abyśmy nie mieli do czynienia z prawdziwymi pieniędzmi).

Jeśli nie widzisz na liście sieci Sepolia, przejdź do menu, następnie do opcji Zaawansowane i przewiń w dół, aby włączyć opcję "Pokaż sieci testowe". W menu wyboru sieci wybierz kartę "Niestandardowe", aby znaleźć listę sieci testowych, i wybierz "Sepolia".

![przykład metamask sepolia](./metamask-sepolia-example.png)

## Krok 4: Dodaj ether z kranu (faucet) {#step-4}

Aby wdrożyć nasz inteligentny kontrakt w sieci testowej, będziemy potrzebować trochę fałszywego ETH. Aby otrzymać Sepolia ETH, możesz przejść do [szczegółów sieci Sepolia](/developers/docs/networks/#sepolia), aby zobaczyć listę różnych kranów (faucetów). Jeśli jeden nie działa, spróbuj innego, ponieważ czasami mogą się wyczerpać. Otrzymanie fałszywego ETH może zająć trochę czasu ze względu na ruch w sieci. Wkrótce powinieneś zobaczyć ETH na swoim koncie MetaMask!

## Krok 5: Sprawdź saldo {#step-5}

Aby upewnić się, że nasze saldo tam jest, wykonajmy żądanie [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) za pomocą [narzędzia kompozytora Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Wyślij żądanie” powinieneś zobaczyć następującą odpowiedź:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **UWAGA:** Ten wynik jest w wei, a nie w ETH. Wei jest używany jako najmniejsza jednostka etheru. Przeliczenie z wei na ETH wynosi: 1 eth = 10<sup>18</sup> wei. Więc jeśli przekonwertujemy 0x2B5E3AF16B1880000 na liczbę dziesiętną, otrzymamy 5\*10¹⁸, co równa się 5 ETH.
>
> Uff! Nasze fałszywe pieniądze są na miejscu <Emoji text=":money_mouth_face:" size={1} />.

## Krok 6: Zainicjuj nasz projekt {#step-6}

Najpierw musimy utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wpisz:

```
mkdir hello-world
cd hello-world
```

Teraz, gdy jesteśmy w folderze naszego projektu, użyjemy `npm init`, aby zainicjować projekt. Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [tymi instrukcjami](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (będziemy również potrzebować Node.js, więc pobierz go również!).

```
npm init
```

Nie ma większego znaczenia, jak odpowiesz na pytania instalacyjne, dla porównania przedstawiamy, jak my to zrobiliśmy:

```
nazwa pakietu: (hello-world)
wersja: (1.0.0)
opis: inteligentny kontrakt hello world
punkt wejścia: (index.js)
polecenie testowe:
repozytorium git:
słowa kluczowe:
autor:
licencja: (ISC)
Zapisywanie do /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "inteligentny kontrakt hello world",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Błąd: nie określono testu\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Zatwierdź plik package.json i gotowe!

## Krok 7: Pobierz [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat to środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga deweloperom w tworzeniu inteligentnych kontraktów i dapek lokalnie przed wdrożeniem ich na żywym łańcuchu.

W naszym projekcie `hello-world` uruchom:

```
npm install --save-dev hardhat
```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/getting-started/#overview).

## Krok 8: Stwórz projekt Hardhat {#step-8}

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

👷 Witamy w Hardhat v2.0.11 👷‍?

Co chcesz zrobić? …
Stwórz przykładowy projekt
❯ Stwórz pusty plik hardhat.config.js
Wyjdź
```

Spowoduje to wygenerowanie dla nas pliku `hardhat.config.js`, w którym określimy całą konfigurację naszego projektu (w kroku 13).

## Krok 9: Dodaj foldery projektu {#step-9}

Aby utrzymać porządek w naszym projekcie, utworzymy dwa nowe foldery. Przejdź do katalogu głównego projektu w wierszu poleceń i wpisz:

```
mkdir contracts
mkdir scripts
```

- w `contracts/` będziemy przechowywać plik z kodem naszego inteligentnego kontraktu hello world
- w `scripts/` będziemy przechowywać skrypty do wdrażania naszego kontraktu i interakcji z nim

## Krok 10: Napisz nasz kontrakt {#step-10}

Możesz zadawać sobie pytanie: kiedy, do licha, zaczniemy pisać kod?? Cóż, jesteśmy tutaj, w kroku 10.

Otwórz projekt hello-world w swoim ulubionym edytorze (my lubimy [VSCode](https://code.visualstudio.com/)). Inteligentne kontrakty pisane są w języku o nazwie Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu HelloWorld.sol.‌

1. Przejdź do folderu "contracts" i utwórz nowy plik o nazwie HelloWorld.sol
2. Poniżej znajduje się przykładowy inteligentny kontrakt Hello World z Ethereum Foundation, którego będziemy używać w tym samouczku. Skopiuj i wklej poniższą zawartość do pliku HelloWorld.sol i koniecznie przeczytaj komentarze, aby zrozumieć, co robi ten kontrakt:

```solidity
// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stanu). Po wdrożeniu kontrakt znajduje się pod określonym adresem na blockchainie Ethereum. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` udostępnia zmienne z zewnątrz kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać w celu uzyskania dostępu do wartości.
   string public message;

   // Podobnie jak w wielu obiektowych językach programowania opartych na klasach, konstruktor jest specjalną funkcją, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjalizacji danych kontraktu. Dowiedz się więcej:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akceptuje argument typu string `initMessage` i ustawia jego wartość w zmiennej `message` w pamięci kontraktu).
      message = initMessage;
   }

   // Funkcja publiczna, która akceptuje argument typu string i aktualizuje zmienną `message` w pamięci.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

To jest bardzo prosty inteligentny kontrakt, który przechowuje wiadomość po utworzeniu i może być aktualizowany przez wywołanie funkcji `update`.

## Krok 11: Połącz MetaMask i Alchemy ze swoim projektem {#step-11}

Stworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, teraz nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego wirtualnego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby udzielić naszemu programowi tego uprawnienia, możemy bezpiecznie przechowywać nasz klucz prywatny (i klucz API Alchemy) w pliku środowiskowym.

> Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [ten samouczek](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) o wysyłaniu transakcji przy użyciu web3.

Najpierw zainstaluj pakiet dotenv w katalogu swojego projektu:

```
npm install dotenv --save
```

Następnie utwórz plik `.env` w katalogu głównym naszego projektu i dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

- Postępuj zgodnie z [tymi instrukcjami](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), aby wyeksportować swój klucz prywatny
- Poniżej dowiesz się, jak uzyskać adres URL interfejsu API HTTP Alchemy

![uzyskaj klucz api alchemy](./get-alchemy-api-key.png)

Skopiuj adres URL interfejsu API Alchemy

Twój plik `.env` powinien wyglądać następująco:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/twój-klucz-api"
PRIVATE_KEY = "twój-klucz-prywatny-metamask"
```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku `hardhat.config.js` w kroku 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nie commituj pliku <code>.env</code>! Upewnij się, że nigdy nie udostępniasz ani nie ujawniasz nikomu swojego pliku <code>.env</code>, ponieważ w ten sposób narażasz swoje poufne dane. Jeśli używasz kontroli wersji, dodaj swój plik <code>.env</code> do pliku <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Krok 12: Zainstaluj Ethers.js {#step-12-install-ethersjs}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum, opakowując [standardowe metody JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat bardzo ułatwia integrację [wtyczek](https://hardhat.org/plugins/) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności. Skorzystamy z [wtyczki Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) do wdrażania kontraktów ([Ethers.js](https://github.com/ethers-io/ethers.js/) ma kilka bardzo przejrzystych metod wdrażania kontraktów).

W katalogu projektu wpisz:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Będziemy również wymagać ethers w naszym pliku `hardhat.config.js` w następnym kroku.

## Krok 13: Zaktualizuj hardhat.config.js {#step-13-update-hardhatconfigjs}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować `hardhat.config.js`, aby nasz projekt wiedział o wszystkich.

Zaktualizuj swój `hardhat.config.js`, aby wyglądał następująco:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
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

## Krok 14: Skompiluj nasz kontrakt {#step-14-compile-our-contracts}

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie `compile` jest jednym z wbudowanych zadań hardhat.

Z wiersza poleceń uruchom:

```
npx hardhat compile
```

Możesz otrzymać ostrzeżenie o `SPDX license identifier not provided in source file` (brak identyfikatora licencji SPDX w pliku źródłowym), ale nie musisz się tym martwić — miejmy nadzieję, że wszystko inne wygląda dobrze! Jeśli nie, zawsze możesz napisać wiadomość na [discordzie Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napisz nasz skrypt wdrożeniowy {#step-15-write-our-deploy-scripts}

Teraz, gdy nasz kontrakt jest napisany, a nasz plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać nasz skrypt wdrażający kontrakt.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Rozpocznij wdrażanie, zwracając obietnicę, która prowadzi do obiektu kontraktu
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Kontrakt wdrożony pod adresem:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat wykonuje niesamowitą robotę, wyjaśniając, co robi każda z tych linii kodu w swoim [samouczku dotyczącym kontraktów](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), a my przyjęliśmy ich wyjaśnienia tutaj.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` w ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc `HelloWorld` jest tutaj fabryką dla instancji naszego kontraktu hello world. Podczas korzystania z wtyczki `hardhat-ethers` instancje `ContractFactory` i `Contract` są domyślnie połączone z pierwszym sygnatariuszem.

```
const hello_world = await HelloWorld.deploy();
```

Wywołanie `deploy()` na `ContractFactory` rozpocznie wdrażanie i zwróci `Promise`, które prowadzi do `Contract`. Jest to obiekt, który ma metodę dla każdej z naszych funkcji inteligentnego kontraktu.

## Krok 16: Wdróż nasz kontrakt {#step-16-deploy-our-contract}

Jesteśmy wreszcie gotowi do wdrożenia naszego inteligentnego kontraktu! Przejdź do wiersza poleceń i uruchom:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Powinieneś wtedy zobaczyć coś takiego:

```
Kontrakt wdrożony pod adresem: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jeśli przejdziemy do [Etherscan Sepolia](https://sepolia.etherscan.io/) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Transakcja będzie wyglądać mniej więcej tak:

![kontrakt etherscan](./etherscan-contract.png)

Adres `Od` powinien pasować do adresu Twojego konta MetaMask, a adres `Do` będzie miał napis „Tworzenie Kontraktu”, ale jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu `Do`:

![transakcja etherscan](./etherscan-transaction.png)

Gratulacje! Właśnie wdrożyłeś inteligentny kontrakt w łańcuchu Ethereum 🎉

Aby zrozumieć, co dzieje się pod maską, przejdźmy do karty Explorer w naszym [panelu Alchemy](https://dashboard.alchemyapi.io/explorer). Jeśli masz wiele aplikacji Alchemy, pamiętaj, aby filtrować według aplikacji i wybrać „Hello World”.
![eksplorator hello world](./hello-world-explorer.png)

Tutaj zobaczysz kilka wywołań JSON-RPC, które Hardhat/Ethers wykonały za nas „pod maską”, gdy wywołaliśmy funkcję `.deploy()`. Dwa ważne, które należy tu wymienić, to [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), czyli żądanie faktycznego zapisania naszego kontraktu w łańcuchu Sepolia, oraz [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), czyli żądanie odczytania informacji o naszej transakcji na podstawie haszu (typowy wzorzec podczas
transakcji). Aby dowiedzieć się więcej o wysyłaniu transakcji, zapoznaj się z tym samouczkiem na temat [wysyłania transakcji za pomocą Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

To wszystko w części 1 tego samouczka, w części 2 faktycznie [wejdziemy w interakcję z naszym inteligentnym kontraktem](https://www.alchemy.com/docs/interacting-with-a-smart-contract) poprzez aktualizację naszej początkowej wiadomości, a w części 3 [opublikujemy nasz inteligentny kontrakt na Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), aby każdy wiedział, jak z nim wchodzić w interakcję.

**Chcesz dowiedzieć się więcej o Alchemy? Sprawdź naszą [stronę internetową](https://www.alchemy.com/eth). Nie chcesz przegapić żadnej aktualizacji? Zapisz się do naszego newslettera [tutaj](https://www.alchemy.com/newsletter)! Pamiętaj, aby dołączyć również do naszego [Discorda](https://discord.gg/u72VCg3).**.
