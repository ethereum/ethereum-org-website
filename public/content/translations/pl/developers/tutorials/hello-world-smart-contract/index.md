---
title: Inteligentny kontrakt Hello World dla początkujących
description: Wprowadzający samouczek dotyczący pisania i wdrażania prostego inteligentnego kontraktu w sieci Ethereum.
author: "elanh"
tags: ["solidity", "hardhat", "alchemy", "inteligentne kontrakty", "wdrażanie"]
skill: beginner
breadcrumb: Kontrakt Hello World
lang: pl
published: 2021-03-31
---

Jeśli dopiero zaczynasz programowanie na blockchainie i nie wiesz, od czego zacząć, lub jeśli po prostu chcesz zrozumieć, jak wdrażać inteligentne kontrakty i wchodzić z nimi w interakcję, ten przewodnik jest dla Ciebie. Przejdziemy przez proces tworzenia i wdrażania prostego inteligentnego kontraktu w sieci testowej Sepolia przy użyciu wirtualnego portfela [MetaMask](https://metamask.io/), języka [Solidity](https://docs.soliditylang.org/en/v0.8.0/), środowiska [Hardhat](https://hardhat.org/) oraz platformy [Alchemy](https://www.alchemy.com/eth) (nie martw się, jeśli jeszcze nie rozumiesz, co to wszystko oznacza – wszystko wyjaśnimy).

W [części 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) tego samouczka omówimy, jak możemy wchodzić w interakcję z naszym inteligentnym kontraktem po jego wdrożeniu, a w [części 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) dowiemy się, jak opublikować go w Etherscan.

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

Jeśli nie widzisz Sepolii na liście, przejdź do menu, następnie do ustawień zaawansowanych (Advanced) i przewiń w dół, aby włączyć opcję „Show test networks” (Pokaż sieci testowe). W menu wyboru sieci wybierz zakładkę „Custom” (Niestandardowe), aby znaleźć listę sieci testowych i wybierz „Sepolia”.

![metamask sepolia example](./metamask-sepolia-example.png)

## Krok 4: Dodaj ether z kranika {#step-4}

Aby wdrożyć nasz inteligentny kontrakt w sieci testowej, będziemy potrzebować trochę fałszywego ETH. Aby zdobyć Sepolia ETH, możesz przejść do [szczegółów sieci Sepolia](/developers/docs/networks/#sepolia), aby wyświetlić listę różnych kraników. Jeśli jeden nie działa, spróbuj innego, ponieważ czasami mogą one wyschnąć. Otrzymanie fałszywego ETH może zająć trochę czasu ze względu na ruch w sieci. Wkrótce potem powinieneś zobaczyć ETH na swoim koncie MetaMask!

## Krok 5: Sprawdź swoje saldo {#step-5}

Aby upewnić się, że nasze saldo tam jest, wyślijmy żądanie [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) za pomocą [narzędzia composer od Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Send Request” (Wyślij żądanie), powinieneś zobaczyć odpowiedź podobną do tej:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **UWAGA:** Ten wynik jest w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru. Przelicznik z wei na ETH to: 1 eth = 10<sup>18</sup> wei. Więc jeśli przekonwertujemy 0x2B5E3AF16B1880000 na system dziesiętny, otrzymamy 5\*10¹⁸, co równa się 5 ETH.
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

Nie ma większego znaczenia, jak odpowiesz na pytania instalacyjne, oto jak zrobiliśmy to dla odniesienia:

```
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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Zatwierdź plik package.json i jesteśmy gotowi!

## Krok 7: Pobierz [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat to środowisko programistyczne do kompilowania, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga programistom podczas lokalnego budowania inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp) przed wdrożeniem ich do działającego łańcucha.

Wewnątrz naszego projektu `hello-world` uruchom:

```
npm install --save-dev hardhat
```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/getting-started/#overview).

## Krok 8: Utwórz projekt Hardhat {#step-8}

Wewnątrz folderu naszego projektu uruchom:

```
npx hardhat
```

Powinieneś wtedy zobaczyć wiadomość powitalną i opcję wyboru tego, co chcesz zrobić. Wybierz „create an empty hardhat.config.js”:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Wygeneruje to dla nas plik `hardhat.config.js`, w którym określimy całą konfigurację naszego projektu (w kroku 13).

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
// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stan). Po wdrożeniu kontrakt znajduje się pod określonym adresem na blockchainie Ethereum. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` sprawia, że zmienne są dostępne spoza kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do wartości.
   string public message;

   // Podobnie jak w wielu językach obiektowych opartych na klasach, konstruktor jest specjalną funkcją, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjowania danych kontraktu. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Przyjmuje argument typu string `initMessage` i ustawia wartość w zmiennej pamięci `message` kontraktu).
      message = initMessage;
   }

   // Publiczna funkcja, która przyjmuje argument typu string i aktualizuje zmienną pamięci `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Jest to super prosty inteligentny kontrakt, który przechowuje wiadomość po utworzeniu i może zostać zaktualizowany poprzez wywołanie funkcji `update`.

## Krok 11: Połącz MetaMask i Alchemy ze swoim projektem {#step-11}

Utworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, teraz nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego wirtualnego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby zapewnić naszemu programowi to uprawnienie, możemy bezpiecznie przechowywać nasz klucz prywatny (i klucz API Alchemy) w pliku środowiskowym.

> Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [ten samouczek](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) dotyczący wysyłania transakcji przy użyciu Web3.

Najpierw zainstaluj pakiet dotenv w katalogu swojego projektu:

```
npm install dotenv --save
```

Następnie utwórz plik `.env` w katalogu głównym naszego projektu i dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

- Postępuj zgodnie z [tymi instrukcjami](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), aby wyeksportować swój klucz prywatny
- Zobacz poniżej, jak uzyskać adres URL HTTP API Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Skopiuj adres URL API Alchemy

Twój plik `.env` powinien wyglądać tak:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku `hardhat.config.js` w kroku 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nie commituj pliku <code>.env</code>! Upewnij się, że nigdy nie udostępniasz ani nie ujawniasz swojego pliku <code>.env</code> nikomu, ponieważ w ten sposób narażasz swoje sekrety. Jeśli używasz systemu kontroli wersji, dodaj swój plik <code>.env</code> do pliku <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Krok 12: Zainstaluj Ethers.js {#step-12-install-ethersjs}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum poprzez opakowanie [standardowych metod JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat sprawia, że integracja [wtyczek](https://hardhat.org/plugins/) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności jest niezwykle prosta. Skorzystamy z [wtyczki Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) do wdrożenia kontraktu ([Ethers.js](https://github.com/ethers-io/ethers.js/) ma kilka bardzo przejrzystych metod wdrażania kontraktów).

W katalogu swojego projektu wpisz:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

W następnym kroku będziemy również wymagać ethers w naszym pliku `hardhat.config.js`.

## Krok 13: Zaktualizuj hardhat.config.js {#step-13-update-hardhatconfigjs}

Dodaliśmy do tej pory kilka zależności i wtyczek, teraz musimy zaktualizować plik `hardhat.config.js`, aby nasz projekt wiedział o nich wszystkich.

Zaktualizuj swój plik `hardhat.config.js`, aby wyglądał tak:

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

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie `compile` jest jednym z wbudowanych zadań Hardhat.

Z wiersza poleceń uruchom:

```
npx hardhat compile
```

Możesz otrzymać ostrzeżenie o `SPDX license identifier not provided in source file`, ale nie musisz się tym martwić — miejmy nadzieję, że wszystko inne wygląda dobrze! Jeśli nie, zawsze możesz napisać na [Discordzie Alchemy](https://discord.gg/u72VCg3).

## Krok 15: Napisz nasz skrypt wdrożeniowy {#step-15-write-our-deploy-scripts}

Teraz, gdy nasz kontrakt jest napisany, a plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać skrypt wdrożeniowy naszego kontraktu.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Rozpocznij wdrożenie, zwracając obietnicę (promise), która rozwiązuje się do obiektu kontraktu
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat wykonuje niesamowitą robotę, wyjaśniając, co robi każda z tych linii kodu w swoim [samouczku dotyczącym kontraktów](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), zaadaptowaliśmy ich wyjaśnienia tutaj.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` w Ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc `HelloWorld` jest tutaj fabryką dla instancji naszego kontraktu hello world. Podczas korzystania z wtyczki `hardhat-ethers`, instancje `ContractFactory` i `Contract` są domyślnie połączone z pierwszym podpisującym.

```
const hello_world = await HelloWorld.deploy();
```

Wywołanie `deploy()` na `ContractFactory` rozpocznie wdrożenie i zwróci `Promise`, który rozwiązuje się do `Contract`. Jest to obiekt, który posiada metodę dla każdej z funkcji naszego inteligentnego kontraktu.

## Krok 16: Wdróż nasz kontrakt {#step-16-deploy-our-contract}

W końcu jesteśmy gotowi na wdrożenie naszego inteligentnego kontraktu! Przejdź do wiersza poleceń i uruchom:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Powinieneś wtedy zobaczyć coś takiego:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Jeśli przejdziemy do [Etherscan dla Sepolii](https://sepolia.etherscan.io/) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Transakcja będzie wyglądać mniej więcej tak:

![etherscan contract](./etherscan-contract.png)

Adres `From` powinien odpowiadać adresowi Twojego konta MetaMask, a adres docelowy (To) będzie wskazywał „Contract Creation” (Tworzenie kontraktu), ale jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu `To`:

![etherscan transaction](./etherscan-transaction.png)

Gratulacje! Właśnie wdrożyłeś inteligentny kontrakt do łańcucha Ethereum 🎉

Aby zrozumieć, co dzieje się pod maską, przejdźmy do zakładki Explorer w naszym [panelu Alchemy](https://dashboard.alchemyapi.io/explorer). Jeśli masz wiele aplikacji Alchemy, upewnij się, że filtrujesz po aplikacji i wybierasz „Hello World”.
![hello world explorer](./hello-world-explorer.png)

Tutaj zobaczysz garść wywołań JSON-RPC, które Hardhat/Ethers wykonały dla nas pod maską, gdy wywołaliśmy funkcję `.deploy()`. Dwa ważne, o których warto tutaj wspomnieć, to [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), które jest żądaniem faktycznego zapisania naszego kontraktu w łańcuchu Sepolia, oraz [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), które jest żądaniem odczytania informacji o naszej transakcji na podstawie hasha (typowy wzorzec przy transakcjach). Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź ten samouczek dotyczący [wysyłania transakcji przy użyciu Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

To wszystko w części 1 tego samouczka, w części 2 będziemy faktycznie [wchodzić w interakcję z naszym inteligentnym kontraktem](https://www.alchemy.com/docs/interacting-with-a-smart-contract) poprzez aktualizację naszej początkowej wiadomości, a w części 3 [opublikujemy nasz inteligentny kontrakt w Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), aby każdy wiedział, jak wchodzić z nim w interakcję.

**Chcesz dowiedzieć się więcej o Alchemy? Sprawdź naszą [stronę internetową](https://www.alchemy.com/eth). Nie chcesz przegapić żadnej aktualizacji? Zapisz się do naszego newslettera [tutaj](https://www.alchemy.com/newsletter)! Koniecznie dołącz również do naszego [Discorda](https://discord.gg/u72VCg3).**