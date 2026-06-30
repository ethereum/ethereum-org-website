---
title: "Inteligentny kontrakt Hello World dla początkujących – Fullstack"
description: "Wprowadzający samouczek dotyczący pisania i wdrażania prostego inteligentnego kontraktu w sieci Ethereum."
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "inteligentne kontrakty",
    "wdrażanie",
    "eksplorator bloków",
    "frontend",
    "transakcje",
    "framework",
  ]
skill: beginner
lang: pl
published: 2021-10-25
---

Ten przewodnik jest dla Ciebie, jeśli dopiero zaczynasz programowanie w technologii blockchain i nie wiesz, od czego zacząć ani jak wdrażać inteligentne kontrakty i wchodzić z nimi w interakcje. Przejdziemy przez proces tworzenia i wdrażania prostego inteligentnego kontraktu w sieci testowej Goerli przy użyciu [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) oraz [Alchemy](https://alchemy.com/eth).

Aby ukończyć ten samouczek, będziesz potrzebować konta Alchemy. [Zarejestruj darmowe konto](https://www.alchemy.com/).

Jeśli w którymkolwiek momencie będziesz mieć pytania, śmiało napisz na [Discordzie Alchemy](https://discord.gg/gWuC7zB)!

## Część 1 – Tworzenie i wdrażanie inteligentnego kontraktu za pomocą narzędzia Hardhat {#part-1}

### Połącz się z siecią Ethereum {#connect-to-the-ethereum-network}

Istnieje wiele sposobów na wysyłanie żądań do łańcucha Ethereum. Dla uproszczenia użyjemy darmowego konta na platformie Alchemy, która jest platformą dla programistów blockchain i API, pozwalającą na komunikację z łańcuchem Ethereum bez konieczności samodzielnego uruchamiania węzła. Alchemy posiada również narzędzia programistyczne do monitorowania i analityki; wykorzystamy je w tym samouczku, aby zrozumieć, jak technicznie działa wdrożenie naszego inteligentnego kontraktu.

### Utwórz swoją aplikację i klucz API {#create-your-app-and-api-key}

Po utworzeniu konta Alchemy możesz wygenerować klucz API, tworząc aplikację. Pozwoli to na wysyłanie żądań do sieci testowej Goerli. Jeśli nie znasz sieci testowych, możesz [przeczytać przewodnik Alchemy dotyczący wyboru sieci](https://www.alchemy.com/docs/choosing-a-web3-network).

W panelu nawigacyjnym Alchemy znajdź menu rozwijane **Apps** i kliknij **Create App**.

![Hello world create app](./hello-world-create-app.png)

Nadaj swojej aplikacji nazwę „_Hello World_” i napisz krótki opis. Wybierz **Staging** jako środowisko i **Goerli** jako sieć.

![create app view hello world](./create-app-view-hello-world.png)

_Uwaga: upewnij się, że wybierasz **Goerli**, w przeciwnym razie ten samouczek nie zadziała._

Kliknij **Create app**. Twoja aplikacja pojawi się w tabeli poniżej.

### Utwórz konto Ethereum {#create-an-ethereum-account}

Potrzebujesz konta Ethereum, aby wysyłać i odbierać transakcje. Użyjemy MetaMask, wirtualnego portfela w przeglądarce, który pozwala użytkownikom zarządzać adresem ich konta Ethereum.

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta, lub jeśli już je posiadasz, upewnij się, że przełączyłeś się na „Goerli Test Network” w prawym górnym rogu (abyśmy nie operowali prawdziwymi pieniędzmi).

### Krok 4: Dodaj ether z kranika {#step-4-add-ether-from-a-faucet}

Aby wdrożyć swój inteligentny kontrakt w sieci testowej, będziesz potrzebować trochę fałszywego ETH. Aby zdobyć ETH w sieci Goerli, przejdź do kranika Goerli i wprowadź adres swojego konta Goerli. Zauważ, że kraniki Goerli mogą być ostatnio nieco zawodne – zobacz [stronę sieci testowych](/developers/docs/networks/#goerli), aby uzyskać listę opcji do wypróbowania:

_Uwaga: ze względu na przeciążenie sieci może to chwilę potrwać._
``

### Krok 5: Sprawdź swoje saldo

Aby upewnić się, że ETH znajduje się w Twoim portfelu, wykonajmy żądanie [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) za pomocą [narzędzia sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Aby dowiedzieć się więcej, sprawdź [krótki samouczek Alchemy na temat korzystania z narzędzia composer](https://youtu.be/r6sjRxBZJuU).

Wprowadź adres swojego konta MetaMask i kliknij **Send Request**. Zobaczysz odpowiedź, która wygląda jak poniższy fragment kodu.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Uwaga: Ten wynik jest podany w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru._

Uff! Nasze fałszywe pieniądze są na miejscu.
### Krok 6: Zainicjuj nasz projekt
Najpierw musimy utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wpisz poniższe polecenia.

```
mkdir hello-world
cd hello-world
```

Teraz, gdy jesteśmy w folderze naszego projektu, użyjemy `npm init`, aby zainicjować projekt.

> Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [instrukcjami instalacji Node.js](https://nodejs.org/en/download/), aby zainstalować Node.js i npm.

Na potrzeby tego samouczka nie ma znaczenia, jak odpowiesz na pytania inicjalizacyjne. Oto jak my to zrobiliśmy w celach informacyjnych:

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
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Zatwierdź plik package.json i gotowe!

### Krok 7: Pobierz Hardhat {#step-7-download-hardhat}

Hardhat to środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga programistom w budowaniu inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp) lokalnie przed wdrożeniem ich w głównym łańcuchu.

Wewnątrz naszego projektu `hello-world` uruchom:

```
npm install --save-dev hardhat
```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/getting-started/#overview).

### Krok 8: Utwórz projekt Hardhat {#step-8-create-hardhat-project}

Wewnątrz folderu naszego projektu `hello-world` uruchom:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Spowoduje to wygenerowanie pliku `hardhat.config.js` w projekcie. Użyjemy go w dalszej części samouczka, aby określić konfigurację naszego projektu.

### Krok 9: Dodaj foldery projektu {#step-9-add-project-folders}

Aby utrzymać porządek w projekcie, utwórzmy dwa nowe foldery. W wierszu poleceń przejdź do katalogu głównego swojego projektu `hello-world` i wpisz:

```
mkdir contracts
mkdir scripts
```

- `contracts/` to miejsce, w którym będziemy przechowywać plik z kodem naszego inteligentnego kontraktu hello world
- `scripts/` to miejsce, w którym będziemy przechowywać skrypty do wdrażania i interakcji z naszym kontraktem

### Krok 10: Napisz nasz kontrakt {#step-10-write-our-contract}

Możesz zadawać sobie pytanie, kiedy w końcu zaczniemy pisać kod? Właśnie teraz!

Otwórz projekt hello-world w swoim ulubionym edytorze. Inteligentne kontrakty najczęściej pisane są w języku Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu.‌

1. Przejdź do folderu `contracts` i utwórz nowy plik o nazwie `HelloWorld.sol`
2. Poniżej znajduje się przykładowy inteligentny kontrakt Hello World, którego będziemy używać w tym samouczku. Skopiuj poniższą zawartość do pliku `HelloWorld.sol`.

_Uwaga: Pamiętaj, aby przeczytać komentarze, aby zrozumieć, co robi ten kontrakt._

```
// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stan). Po wdrożeniu kontrakt znajduje się pod określonym adresem na blockchainie Ethereum. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emitowane po wywołaniu funkcji update
   // Zdarzenia inteligentnego kontraktu to sposób, w jaki Twój kontrakt komunikuje front-endowi aplikacji, że coś wydarzyło się na blockchainie. Front-end może „nasłuchiwać” określonych zdarzeń i podejmować działania, gdy one wystąpią.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` sprawia, że zmienne są dostępne z zewnątrz kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do wartości.
   string public message;

   // Podobnie jak w wielu klasowych językach obiektowych, konstruktor jest specjalną funkcją, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjowania danych kontraktu. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Przyjmuje argument typu string `initMessage` i ustawia jego wartość w zmiennej pamięci kontraktu `message`.
      message = initMessage;
   }

   // Publiczna funkcja, która przyjmuje argument typu string i aktualizuje zmienną pamięci `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Jest to podstawowy inteligentny kontrakt, który przechowuje wiadomość po utworzeniu. Można ją zaktualizować, wywołując funkcję `update`.

### Krok 11: Połącz MetaMask i Alchemy ze swoim projektem {#step-11-connect-metamask-alchemy-to-your-project}

Utworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, teraz nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego portfela wymaga podpisu przy użyciu Twojego unikalnego klucza prywatnego. Aby zapewnić naszemu programowi to uprawnienie, możemy bezpiecznie przechowywać nasz klucz prywatny w pliku środowiskowym. Będziemy tu również przechowywać klucz API dla Alchemy.

> Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [ten samouczek](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) dotyczący wysyłania transakcji za pomocą Web3.

Najpierw zainstaluj pakiet dotenv w katalogu swojego projektu:

```
npm install dotenv --save
```

Następnie utwórz plik `.env` w katalogu głównym projektu. Dodaj do niego swój klucz prywatny MetaMask oraz adres URL HTTP API Alchemy.

Twój plik środowiskowy musi nazywać się `.env`, w przeciwnym razie nie zostanie rozpoznany jako plik środowiskowy.

Nie nazywaj go `process.env` ani `.env-custom` ani w żaden inny sposób.

- Postępuj zgodnie z [tymi instrukcjami](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), aby wyeksportować swój klucz prywatny
- Zobacz poniżej, jak uzyskać adres URL HTTP API Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Twój plik `.env` powinien wyglądać tak:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku `hardhat.config.js` w kroku 13.

### Krok 12: Zainstaluj Ethers.js {#step-12-install-ethersjs}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum poprzez opakowanie [standardowych metod JSON-RPC](/developers/docs/apis/json-rpc/) w bardziej przyjazne dla użytkownika metody.

Hardhat pozwala nam na integrację [wtyczek](https://hardhat.org/plugins/) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności. Wykorzystamy [wtyczkę Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) do wdrożenia kontraktu.

W katalogu swojego projektu wpisz:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Krok 13: Zaktualizuj plik hardhat.config.js {#step-13-update-hardhat-configjs}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować plik `hardhat.config.js`, aby nasz projekt wiedział o nich wszystkich.

Zaktualizuj swój plik `hardhat.config.js`, aby wyglądał tak:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Krok 14: Skompiluj nasz kontrakt {#step-14-compile-our-contract}

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie `compile` jest jednym z wbudowanych zadań narzędzia Hardhat.

Z wiersza poleceń uruchom:

```bash
npx hardhat compile
```

Możesz otrzymać ostrzeżenie o `SPDX license identifier not provided in source file`, ale nie musisz się tym martwić — miejmy nadzieję, że wszystko inne wygląda dobrze! Jeśli nie, zawsze możesz napisać na [Discordzie Alchemy](https://discord.gg/u72VCg3).

### Krok 15: Napisz nasz skrypt wdrożeniowy {#step-15-write-our-deploy-script}

Teraz, gdy nasz kontrakt jest napisany, a plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać nasz skrypt wdrożeniowy kontraktu.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```javascript
async function main() {
  const HelloWorld = await ethers.getKontraktFactory("HelloWorld")

  // Rozpocznij wdrożenie, zwracając obietnicę, która rozwiązuje się do obiektu kontraktu
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat świetnie wyjaśnia, co robi każda z tych linii kodu w swoim [samouczku dotyczącym kontraktów](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), zaadaptowaliśmy ich wyjaśnienia tutaj.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` w ethers.js to abstrakcja używana do wdrażania nowych inteligentnych kontraktów, więc `HelloWorld` jest tutaj [fabryką](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) dla instancji naszego kontraktu hello world. Podczas korzystania z wtyczki `hardhat-ethers` `ContractFactory` i `Contract`, instancje są domyślnie połączone z pierwszym podpisującym (właścicielem).

```javascript
const hello_world = await HelloWorld.deploy()
```

Wywołanie `deploy()` na `ContractFactory` rozpocznie wdrożenie i zwróci `Promise`, który rozwiązuje się do obiektu `Contract`. Jest to obiekt, który posiada metodę dla każdej z funkcji naszego inteligentnego kontraktu.

### Krok 16: Wdróż nasz kontrakt {#step-16-deploy-our-contract}

W końcu jesteśmy gotowi na wdrożenie naszego inteligentnego kontraktu! Przejdź do wiersza poleceń i uruchom:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Powinieneś wtedy zobaczyć coś w stylu:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Proszę, zapisz ten adres**. Będziemy go używać w dalszej części samouczka.

Jeśli przejdziemy do [Etherscan dla Goerli](https://goerli.etherscan.io) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Transakcja będzie wyglądać mniej więcej tak:

![](./etherscan-contract.png)

Adres `From` powinien odpowiadać adresowi Twojego konta MetaMask, a adres `To` będzie wskazywał **Contract Creation**. Jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu `To`.

![](./etherscan-transaction.png)

Gratulacje! Właśnie wdrożyłeś inteligentny kontrakt w sieci testowej Ethereum.

Aby zrozumieć, jak to technicznie działa, przejdźmy do zakładki Explorer w naszym [panelu Alchemy](https://dashboard.alchemy.com/explorer). Jeśli masz wiele aplikacji Alchemy, upewnij się, że filtrujesz po aplikacji i wybierasz **Hello World**.

![](./hello-world-explorer.png)

Tutaj zobaczysz garść metod JSON-RPC, które Hardhat/Ethers wykonały dla nas w tle, gdy wywołaliśmy funkcję `.deploy()`. Dwie ważne metody to [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), która jest żądaniem zapisania naszego kontraktu w łańcuchu Goerli, oraz [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), która jest żądaniem odczytania informacji o naszej transakcji na podstawie hasha. Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [nasz samouczek dotyczący wysyłania transakcji za pomocą Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Część 2: Interakcja z inteligentnym kontraktem {#part-2-interact-with-your-smart-contract}

Skoro pomyślnie wdrożyliśmy inteligentny kontrakt w sieci Goerli, dowiedzmy się, jak wejść z nim w interakcję.

### Utworzenie pliku interact.js {#create-a-interactjs-file}

To jest plik, w którym napiszemy nasz skrypt interakcji. Będziemy używać biblioteki Ethers.js, którą zainstalowałeś wcześniej w Części 1.

Wewnątrz folderu `scripts/`, utwórz nowy plik o nazwie `interact.js` i dodaj następujący kod:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aktualizacja pliku .env {#update-your-env-file}

Będziemy używać nowych zmiennych środowiskowych, więc musimy je zdefiniować w pliku `.env`, który [utworzyliśmy wcześniej](#step-11-connect-metamask-alchemy-to-your-project).

Będziemy musieli dodać definicję dla naszego `API_KEY` z Alchemy oraz `CONTRACT_ADDRESS`, pod którym wdrożono Twój inteligentny kontrakt.

Twój plik `.env` powinien wyglądać mniej więcej tak:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Pobranie ABI kontraktu {#grab-your-contract-abi}

[ABI (Application Binary Interface)](/glossary/#abi) naszego kontraktu to interfejs umożliwiający interakcję z naszym inteligentnym kontraktem. Hardhat automatycznie generuje ABI i zapisuje je w `HelloWorld.json`. Aby użyć ABI, będziemy musieli przeanalizować jego zawartość, dodając następujące wiersze kodu do naszego pliku `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Jeśli chcesz zobaczyć ABI, możesz je wydrukować w konsoli:

```javascript
console.log(JSON.stringify(contract.abi))
```

Aby zobaczyć ABI wydrukowane w konsoli, przejdź do terminala i uruchom:

```bash
npx hardhat run scripts/interact.js
```

### Utworzenie instancji kontraktu {#create-an-instance-of-your-contract}

Aby wejść w interakcję z naszym kontraktem, musimy utworzyć instancję kontraktu w naszym kodzie. Aby to zrobić za pomocą Ethers.js, będziemy musieli pracować z trzema pojęciami:

1. Dostawca - dostawca węzła, który daje Ci dostęp do odczytu i zapisu w blockchainie
2. Podpisujący - reprezentuje konto Ethereum, które może podpisywać transakcje
3. Contract - obiekt Ethers.js reprezentujący konkretny kontrakt wdrożony w łańcuchu

Użyjemy ABI kontraktu z poprzedniego kroku, aby utworzyć naszą instancję kontraktu:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Dowiedz się więcej o Providerach, Signerach i Kontraktach w [dokumentacji ethers.js](https://docs.ethers.io/v5/).

### Odczytanie wiadomości początkowej {#read-the-init-message}

Pamiętasz, jak wdrożyliśmy nasz kontrakt za pomocą `initMessage = "Hello world!"`? Teraz odczytamy tę wiadomość zapisaną w naszym inteligentnym kontrakcie i wydrukujemy ją w konsoli.

W języku JavaScript funkcje asynchroniczne są używane podczas interakcji z sieciami. Aby dowiedzieć się więcej o funkcjach asynchronicznych, [przeczytaj ten artykuł na Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Użyj poniższego kodu, aby wywołać funkcję `message` w naszym inteligentnym kontrakcie i odczytać wiadomość początkową:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Po uruchomieniu pliku za pomocą `npx hardhat run scripts/interact.js` w terminalu powinniśmy zobaczyć taką odpowiedź:

```
Wiadomość to: Hello world!
```

Gratulacje! Właśnie pomyślnie odczytałeś dane inteligentnego kontraktu z blockchaina Ethereum, tak trzymaj!

### Aktualizacja wiadomości {#update-the-message}

Zamiast tylko odczytywać wiadomość, możemy również zaktualizować wiadomość zapisaną w naszym inteligentnym kontrakcie za pomocą funkcji `update`! Całkiem fajnie, prawda?

Aby zaktualizować wiadomość, możemy bezpośrednio wywołać funkcję `update` na naszym utworzonym obiekcie Contract:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Zauważ, że w linii 11 wywołujemy `.wait()` na zwróconym obiekcie transakcji. Zapewnia to, że nasz skrypt poczeka na wydobycie transakcji w blockchainie przed zakończeniem funkcji. Jeśli wywołanie `.wait()` nie zostanie uwzględnione, skrypt może nie zobaczyć zaktualizowanej wartości `message` w kontrakcie.

### Odczytanie nowej wiadomości {#read-the-new-message}

Powinieneś być w stanie powtórzyć [poprzedni krok](#read-the-init-message), aby odczytać zaktualizowaną wartość `message`. Poświęć chwilę i sprawdź, czy potrafisz wprowadzić zmiany niezbędne do wydrukowania tej nowej wartości!

Jeśli potrzebujesz podpowiedzi, oto jak powinien wyglądać Twój plik `interact.js` w tym momencie:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// dostawca - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// podpisujący - ty
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// instancja kontraktu
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Teraz po prostu uruchom skrypt, a powinieneś zobaczyć starą wiadomość, status aktualizacji i nową wiadomość wydrukowaną w terminalu!

`npx hardhat run scripts/interact.js --network goerli`

```
Wiadomość to: Hello World!
Aktualizowanie wiadomości...
Nowa wiadomość to: This is the new message.
```

Podczas uruchamiania tego skryptu możesz zauważyć, że krok `Updating the message...` ładuje się przez chwilę, zanim załaduje się nowa wiadomość. Wynika to z procesu wydobywania; jeśli jesteś ciekawy śledzenia transakcji podczas ich wydobywania, odwiedź [mempool Alchemy](https://dashboard.alchemy.com/mempool), aby zobaczyć status transakcji. Jeśli transakcja zostanie odrzucona, warto również sprawdzić [Goerli Etherscan](https://goerli.etherscan.io) i wyszukać hash swojej transakcji.

## Część 3: Opublikuj swój inteligentny kontrakt w Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Wykonałeś całą ciężką pracę, aby ożywić swój inteligentny kontrakt; teraz nadszedł czas, aby podzielić się nim ze światem!

Dzięki weryfikacji inteligentnego kontraktu w Etherscan, każdy może zobaczyć jego kod źródłowy i wejść z nim w interakcję. Zaczynajmy!

### Krok 1: Wygeneruj klucz API na swoim koncie Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Klucz API Etherscan jest niezbędny do zweryfikowania, że jesteś właścicielem inteligentnego kontraktu, który próbujesz opublikować.

Jeśli nie masz jeszcze konta Etherscan, [zarejestruj się](https://etherscan.io/register).

Po zalogowaniu znajdź swoją nazwę użytkownika na pasku nawigacyjnym, najedź na nią i wybierz przycisk **My profile**.

Na stronie swojego profilu powinieneś zobaczyć boczny pasek nawigacyjny. Z bocznego paska nawigacyjnego wybierz **API Keys**. Następnie naciśnij przycisk „Add”, aby utworzyć nowy klucz API, nazwij swoją aplikację **hello-world** i naciśnij przycisk **Create New API Key**.

Twój nowy klucz API powinien pojawić się w tabeli kluczy API. Skopiuj klucz API do schowka.

Następnie musimy dodać klucz API Etherscan do naszego pliku `.env`.

Po jego dodaniu, Twój plik `.env` powinien wyglądać tak:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Inteligentne kontrakty wdrożone za pomocą Hardhat {#hardhat-deployed-smart-contracts}

#### Zainstaluj hardhat-etherscan {#install-hardhat-etherscan}

Publikowanie kontraktu w Etherscan za pomocą Hardhat jest proste. Aby zacząć, musisz najpierw zainstalować wtyczkę `hardhat-etherscan`. `hardhat-etherscan` automatycznie zweryfikuje kod źródłowy inteligentnego kontraktu i ABI w Etherscan. Aby to dodać, w katalogu `hello-world` uruchom:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Po zainstalowaniu dołącz następującą instrukcję na górze pliku `hardhat.config.js` i dodaj opcje konfiguracji Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Twój klucz API dla Etherscan
    // Zdobądź go na https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Zweryfikuj swój inteligentny kontrakt w Etherscan {#verify-your-smart-contract-on-etherscan}

Upewnij się, że wszystkie pliki są zapisane, a wszystkie zmienne `.env` są poprawnie skonfigurowane.

Uruchom zadanie `verify`, przekazując adres kontraktu i sieć, w której został wdrożony:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Upewnij się, że `DEPLOYED_CONTRACT_ADDRESS` to adres Twojego wdrożonego inteligentnego kontraktu w sieci testowej Goerli. Ponadto ostatni argument (`'Hello World!'`) musi być tą samą wartością ciągu znaków, która została użyta [podczas kroku wdrażania w części 1](#step-15-write-our-deploy-script).

Jeśli wszystko pójdzie dobrze, w terminalu zobaczysz następującą wiadomość:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Gratulacje! Kod Twojego inteligentnego kontraktu jest w Etherscan!

### Sprawdź swój inteligentny kontrakt w Etherscan! {#check-out-your-smart-contract-on-etherscan}

Po przejściu do linku podanego w terminalu powinieneś zobaczyć kod swojego inteligentnego kontraktu i ABI opublikowane w Etherscan!

**Hura - udało Ci się, mistrzu! Teraz każdy może wywoływać lub zapisywać dane w Twoim inteligentnym kontrakcie! Nie możemy się doczekać, aby zobaczyć, co zbudujesz w następnej kolejności!**

## Część 4 – Integracja inteligentnego kontraktu z frontendem {#part-4-integrating-your-smart-contract-with-the-frontend}

Pod koniec tego samouczka będziesz wiedzieć, jak:

- Podłączyć portfel MetaMask do swojej zdecentralizowanej aplikacji (dapp)
- Odczytywać dane ze swojego inteligentnego kontraktu za pomocą API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Podpisywać transakcje Ethereum za pomocą MetaMask

W przypadku tej aplikacji dapp użyjemy [React](https://react.dev/) jako naszego frameworka frontendowego; warto jednak zauważyć, że nie będziemy poświęcać dużo czasu na omawianie jego podstaw, ponieważ skupimy się głównie na wprowadzeniu funkcjonalności Web3 do naszego projektu.

Wymagane jest podstawowe zrozumienie Reacta. Jeśli go nie masz, zalecamy ukończenie oficjalnego [samouczka Wprowadzenie do React](https://react.dev/learn).

### Sklonuj pliki startowe {#clone-the-starter-files}

Najpierw przejdź do [repozytorium hello-world-part-four na GitHubie](https://github.com/alchemyplatform/hello-world-part-four-tutorial), aby pobrać pliki startowe dla tego projektu i sklonuj to repozytorium na swój komputer lokalny.

Otwórz sklonowane repozytorium lokalnie. Zauważ, że zawiera ono dwa foldery: `starter-files` i `completed`.

- `starter-files` – **będziemy pracować w tym katalogu**, połączymy interfejs użytkownika z Twoim portfelem Ethereum i inteligentnym kontraktem, który opublikowaliśmy w Etherscan w [Części 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` zawiera cały ukończony samouczek i powinien być używany tylko jako punkt odniesienia, jeśli utkniesz.

Następnie otwórz swoją kopię `starter-files` w ulubionym edytorze kodu, a następnie przejdź do folderu `src`.

Cały kod, który napiszemy, będzie znajdował się w folderze `src`. Będziemy edytować komponent `HelloWorld.js` oraz pliki JavaScript `util/interact.js`, aby nadać naszemu projektowi funkcjonalność Web3.

### Sprawdź pliki startowe {#check-out-the-starter-files}

Zanim zaczniemy kodować, sprawdźmy, co zostało nam udostępnione w plikach startowych.

#### Uruchom swój projekt React {#get-your-react-project-running}

Zacznijmy od uruchomienia projektu React w naszej przeglądarce. Piękno Reacta polega na tym, że gdy już uruchomimy nasz projekt w przeglądarce, wszelkie zapisane przez nas zmiany będą aktualizowane na żywo.

Aby uruchomić projekt, przejdź do katalogu głównego folderu `starter-files` i uruchom `npm install` w terminalu, aby zainstalować zależności projektu:

```bash
cd starter-files
npm install
```

Po zakończeniu ich instalacji uruchom `npm start` w terminalu:

```bash
npm start
```

Spowoduje to otwarcie [http://localhost:3000/](http://localhost:3000/) w Twojej przeglądarce, gdzie zobaczysz frontend naszego projektu. Powinien on składać się z jednego pola \(miejsca do aktualizacji wiadomości przechowywanej w Twoim inteligentnym kontrakcie\), przycisku „Connect Wallet” (Połącz portfel) oraz przycisku „Update” (Aktualizuj).

Jeśli spróbujesz kliknąć którykolwiek z przycisków, zauważysz, że nie działają – to dlatego, że wciąż musimy zaprogramować ich funkcjonalność.

#### Komponent `HelloWorld.js` {#the-helloworld-js-component}

Wróćmy do folderu `src` w naszym edytorze i otwórzmy plik `HelloWorld.js`. To bardzo ważne, abyśmy zrozumieli wszystko w tym pliku, ponieważ jest to główny komponent React, nad którym będziemy pracować.

Na górze tego pliku zauważysz kilka instrukcji importu, które są niezbędne do uruchomienia naszego projektu, w tym bibliotekę React, hooki useEffect i useState, niektóre elementy z `./util/interact.js` (wkrótce opiszemy je bardziej szczegółowo!) oraz logo Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Następnie mamy nasze zmienne stanu, które będziemy aktualizować po określonych zdarzeniach.

```javascript
// HelloWorld.js

//Zmienne stanu
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Oto co reprezentuje każda ze zmiennych:

- `walletAddress` – ciąg znaków przechowujący adres portfela użytkownika
- `status` – ciąg znaków przechowujący pomocną wiadomość, która instruuje użytkownika, jak wchodzić w interakcję z aplikacją dapp
- `message` – ciąg znaków przechowujący bieżącą wiadomość w inteligentnym kontrakcie
- `newMessage` – ciąg znaków przechowujący nową wiadomość, która zostanie zapisana w inteligentnym kontrakcie

Po zmiennych stanu zobaczysz pięć niezaimplementowanych funkcji: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` oraz `onUpdatePressed`. Poniżej wyjaśnimy, co one robią:

```javascript
// HelloWorld.js

//wywoływane tylko raz
useEffect(async () => {
  //TODO: zaimplementuj
}, [])

function addSmartContractListener() {
  //TODO: zaimplementuj
}

function addWalletListener() {
  //TODO: zaimplementuj
}

const connectWalletPressed = async () => {
  //TODO: zaimplementuj
}

const onUpdatePressed = async () => {
  //TODO: zaimplementuj
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) – to hook Reacta, który jest wywoływany po wyrenderowaniu komponentu. Ponieważ przekazano do niego pustą tablicę `[]` \(zobacz wiersz 4\), zostanie on wywołany tylko przy _pierwszym_ renderowaniu komponentu. W tym miejscu załadujemy bieżącą wiadomość przechowywaną w naszym inteligentnym kontrakcie, wywołamy nasłuchiwacze (listeners) naszego inteligentnego kontraktu i portfela oraz zaktualizujemy nasz interfejs użytkownika, aby odzwierciedlić, czy portfel jest już podłączony.
- `addSmartContractListener` – ta funkcja konfiguruje nasłuchiwacz, który będzie obserwował zdarzenie `UpdatedMessages` naszego kontraktu HelloWorld i zaktualizuje nasz interfejs użytkownika, gdy wiadomość w naszym inteligentnym kontrakcie ulegnie zmianie.
- `addWalletListener` – ta funkcja konfiguruje nasłuchiwacz, który wykrywa zmiany w stanie portfela MetaMask użytkownika, na przykład gdy użytkownik odłączy swój portfel lub zmieni adresy.
- `connectWalletPressed` – ta funkcja zostanie wywołana w celu podłączenia portfela MetaMask użytkownika do naszej aplikacji dapp.
- `onUpdatePressed` – ta funkcja zostanie wywołana, gdy użytkownik będzie chciał zaktualizować wiadomość przechowywaną w inteligentnym kontrakcie.

Pod koniec tego pliku znajduje się interfejs użytkownika naszego komponentu.

```javascript
// HelloWorld.js

//interfejs użytkownika naszego komponentu
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Jeśli uważnie przeanalizujesz ten kod, zauważysz, gdzie używamy naszych różnych zmiennych stanu w interfejsie użytkownika:

- W wierszach 6-12, jeśli portfel użytkownika jest podłączony \(tj. `walletAddress.length > 0`\), wyświetlamy skróconą wersję `walletAddress` użytkownika na przycisku o identyfikatorze „walletButton”; w przeciwnym razie widnieje na nim po prostu napis „Connect Wallet”.
- W wierszu 17 wyświetlamy bieżącą wiadomość przechowywaną w inteligentnym kontrakcie, która jest przechwytywana w ciągu znaków `message`.
- W wierszach 23-26 używamy [komponentu kontrolowanego](https://legacy.reactjs.org/docs/forms.html#controlled-components), aby zaktualizować naszą zmienną stanu `newMessage`, gdy zmienią się dane wejściowe w polu tekstowym.

Oprócz naszych zmiennych stanu zobaczysz również, że funkcje `connectWalletPressed` i `onUpdatePressed` są wywoływane po kliknięciu odpowiednio przycisków o identyfikatorach `publishButton` i `walletButton`.

Na koniec zajmijmy się tym, gdzie dodawany jest ten komponent `HelloWorld.js`.

Jeśli przejdziesz do pliku `App.js`, który jest głównym komponentem w React działającym jako kontener dla wszystkich innych komponentów, zobaczysz, że nasz komponent `HelloWorld.js` jest wstrzykiwany w wierszu 7.

Ostatnią, ale nie mniej ważną rzeczą jest sprawdzenie jeszcze jednego udostępnionego pliku, pliku `interact.js`.

#### Plik `interact.js` {#the-interact-js-file}

Ponieważ chcemy trzymać się paradygmatu [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), będziemy potrzebować osobnego pliku, który zawiera wszystkie nasze funkcje do zarządzania logiką, danymi i regułami naszej aplikacji dapp, a następnie móc wyeksportować te funkcje do naszego frontendu \(naszego komponentu `HelloWorld.js`\).

👆🏽Dokładnie taki jest cel naszego pliku `interact.js`!

Przejdź do folderu `util` w katalogu `src`, a zauważysz, że dołączyliśmy plik o nazwie `interact.js`, który będzie zawierał wszystkie nasze funkcje i zmienne dotyczące interakcji z inteligentnym kontraktem oraz portfelem.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Zauważysz na górze pliku, że zakomentowaliśmy obiekt `helloWorldContract`. W dalszej części tego samouczka odkomentujemy ten obiekt i utworzymy instancję naszego inteligentnego kontraktu w tej zmiennej, którą następnie wyeksportujemy do naszego komponentu `HelloWorld.js`.

Cztery niezaimplementowane funkcje po naszym obiekcie `helloWorldContract` wykonują następujące czynności:

- `loadCurrentMessage` – ta funkcja obsługuje logikę ładowania bieżącej wiadomości przechowywanej w inteligentnym kontrakcie. Wykona ona wywołanie _odczytu_ do inteligentnego kontraktu Hello World za pomocą [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` – ta funkcja połączy MetaMask użytkownika z naszą aplikacją dapp.
- `getCurrentWalletConnected` – ta funkcja sprawdzi, czy konto Ethereum jest już podłączone do naszej aplikacji dapp podczas ładowania strony i odpowiednio zaktualizuje nasz interfejs użytkownika.
- `updateMessage` – ta funkcja zaktualizuje wiadomość przechowywaną w inteligentnym kontrakcie. Wykona ona wywołanie _zapisu_ do inteligentnego kontraktu Hello World, więc portfel MetaMask użytkownika będzie musiał podpisać transakcję Ethereum, aby zaktualizować wiadomość.

Teraz, gdy rozumiemy, z czym pracujemy, dowiedzmy się, jak odczytywać dane z naszego inteligentnego kontraktu!

### Krok 3: Odczyt z inteligentnego kontraktu {#step-3-read-from-your-smart-contract}

Aby odczytywać dane ze swojego inteligentnego kontraktu, musisz pomyślnie skonfigurować:

- Połączenie API z łańcuchem Ethereum
- Załadowaną instancję swojego inteligentnego kontraktu
- Funkcję do wywołania funkcji Twojego inteligentnego kontraktu
- Nasłuchiwacz do obserwowania aktualizacji, gdy dane odczytywane z inteligentnego kontraktu ulegną zmianie

Może to brzmieć jak wiele kroków, ale nie martw się! Przeprowadzimy Cię przez każdy z nich krok po kroku! :\)

#### Nawiąż połączenie API z łańcuchem Ethereum

Pamiętasz, jak w części 2 tego samouczka użyliśmy naszego klucza Alchemy Web3 do odczytu z naszego inteligentnego kontraktu? Będziesz również potrzebować klucza Alchemy Web3 w swojej zdecentralizowanej aplikacji (dapp), aby odczytywać dane z łańcucha.

Jeśli jeszcze go nie masz, najpierw zainstaluj [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), przechodząc do katalogu głównego `starter-files` i uruchamiając następujące polecenie w terminalu:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) to wrapper dla [Web3.js](https://docs.web3js.org/), zapewniający ulepszone metody API i inne kluczowe korzyści, które ułatwią Ci życie jako programiście Web3. Został zaprojektowany tak, aby wymagał minimalnej konfiguracji, dzięki czemu możesz od razu zacząć go używać w swojej aplikacji!

Następnie zainstaluj pakiet [dotenv](https://www.npmjs.com/package/dotenv) w katalogu swojego projektu, abyśmy mieli bezpieczne miejsce do przechowywania naszego klucza API po jego pobraniu.

```text
npm install dotenv --save
```

W naszej aplikacji dapp **będziemy używać naszego klucza API Websockets** zamiast klucza API HTTP, ponieważ pozwoli nam to skonfigurować nasłuchiwacz, który wykrywa zmiany wiadomości przechowywanej w inteligentnym kontrakcie.

Gdy masz już swój klucz API, utwórz plik `.env` w katalogu głównym i dodaj do niego swój adres URL Alchemy Websockets. Następnie Twój plik `.env` powinien wyglądać tak:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Teraz jesteśmy gotowi do skonfigurowania naszego punktu końcowego Alchemy Web3 w naszej aplikacji dapp! Wróćmy do naszego pliku `interact.js`, który znajduje się w folderze `util`, i dodajmy następujący kod na górze pliku:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Powyżej najpierw zaimportowaliśmy klucz Alchemy z naszego pliku `.env`, a następnie przekazaliśmy nasz `alchemyKey` do `createAlchemyWeb3`, aby ustanowić nasz punkt końcowy Alchemy Web3.

Mając gotowy ten punkt końcowy, nadszedł czas na załadowanie naszego inteligentnego kontraktu!
#### Ładowanie inteligentnego kontraktu Hello World {#loading-your-hello-world-smart-contract}

Aby załadować swój inteligentny kontrakt Hello World, będziesz potrzebować jego adresu kontraktu i ABI, z których oba można znaleźć w Etherscan, jeśli ukończyłeś [Część 3 tego samouczka.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Jak uzyskać ABI kontraktu z Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Jeśli pominąłeś Część 3 tego samouczka, możesz użyć kontraktu HelloWorld z adresem [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Jego ABI można znaleźć [tutaj](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI kontraktu jest niezbędne do określenia, którą funkcję wywoła kontrakt, a także do upewnienia się, że funkcja zwróci dane w oczekiwanym formacie. Po skopiowaniu naszego ABI kontraktu zapiszmy je jako plik JSON o nazwie `contract-abi.json` w Twoim katalogu `src`.

Twój plik contract-abi.json powinien być przechowywany w folderze src.

Uzbrojeni w nasz adres kontraktu, ABI i punkt końcowy Alchemy Web3, możemy użyć [metody contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract), aby załadować instancję naszego inteligentnego kontraktu. Zaimportuj swoje ABI kontraktu do pliku `interact.js` i dodaj swój adres kontraktu.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Możemy teraz w końcu odkomentować naszą zmienną `helloWorldContract` i załadować inteligentny kontrakt za pomocą naszego punktu końcowego AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Podsumowując, pierwsze 12 wierszy Twojego pliku `interact.js` powinno teraz wyglądać tak:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Teraz, gdy mamy załadowany nasz kontrakt, możemy zaimplementować naszą funkcję `loadCurrentMessage`!

#### Implementacja `loadCurrentMessage` w pliku `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Ta funkcja jest bardzo prosta. Wykonamy proste asynchroniczne wywołanie web3, aby odczytać dane z naszego kontraktu. Nasza funkcja zwróci wiadomość przechowywaną w inteligentnym kontrakcie:

Zaktualizuj `loadCurrentMessage` w swoim pliku `interact.js` na następujący kod:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Ponieważ chcemy wyświetlić ten inteligentny kontrakt w naszym interfejsie użytkownika, zaktualizujmy funkcję `useEffect` w naszym komponencie `HelloWorld.js` na następującą:

```javascript
// HelloWorld.js

//wywoływane tylko raz
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Zauważ, że chcemy, aby nasza funkcja `loadCurrentMessage` została wywołana tylko raz podczas pierwszego renderowania komponentu. Wkrótce zaimplementujemy `addSmartContractListener`, aby automatycznie aktualizować interfejs użytkownika po zmianie wiadomości w inteligentnym kontrakcie.

Zanim zagłębimy się w nasz nasłuchiwacz, sprawdźmy, co mamy do tej pory! Zapisz swoje pliki `HelloWorld.js` i `interact.js`, a następnie przejdź do [http://localhost:3000/](http://localhost:3000/)

Zauważysz, że bieżąca wiadomość nie mówi już „Brak połączenia z siecią”. Zamiast tego odzwierciedla wiadomość przechowywaną w inteligentnym kontrakcie. Super!

#### Twój interfejs użytkownika powinien teraz odzwierciedlać wiadomość przechowywaną w inteligentnym kontrakcie {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

A skoro mowa o tym nasłuchiwaczu...

#### Zaimplementuj `addSmartContractListener` {#implement-addsmartcontractlistener}

Jeśli przypomnisz sobie plik `HelloWorld.sol`, który napisaliśmy w [Części 1 tej serii samouczków](#step-10-write-our-contract), przypomnisz sobie, że istnieje zdarzenie inteligentnego kontraktu o nazwie `UpdatedMessages`, które jest emitowane po wywołaniu funkcji `update` naszego inteligentnego kontraktu \(zobacz wiersze 9 i 27\):

```javascript
// HelloWorld.sol

// Określa wersję Solidity, używając wersjonowania semantycznego.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt to zbiór funkcji i danych (jego stan). Po wdrożeniu, kontrakt znajduje się pod określonym adresem na blockchainie Ethereum. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitowane, gdy wywoływana jest funkcja aktualizacji
   //Zdarzenia inteligentnego kontraktu to sposób, w jaki twój kontrakt komunikuje, że coś wydarzyło się na blockchainie do front-endu twojej aplikacji, który może 'nasłuchiwać' określonych zdarzeń i podejmować działania, gdy one wystąpią.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` sprawia, że zmienne są dostępne z zewnątrz kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać, aby uzyskać dostęp do wartości.
   string public message;

   // Podobnie jak w wielu językach obiektowych opartych na klasach, konstruktor to specjalna funkcja, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjowania danych kontraktu. Dowiedz się więcej:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Przyjmuje argument typu string `initMessage` i ustawia wartość w zmiennej przechowywania `message` kontraktu).
      message = initMessage;
   }

   // Publiczna funkcja, która przyjmuje argument typu string i aktualizuje zmienną przechowywania `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Zdarzenia inteligentnego kontraktu to sposób, w jaki Twój kontrakt komunikuje Twojej aplikacji frontendowej, że coś się wydarzyło \(tj. miało miejsce _zdarzenie_\) na blockchainie. Aplikacja może „nasłuchiwać” określonych zdarzeń i podejmować działania, gdy one wystąpią.

Funkcja `addSmartContractListener` będzie w szczególności nasłuchiwać zdarzenia `UpdatedMessages` naszego inteligentnego kontraktu Hello World i aktualizować nasz interfejs użytkownika, aby wyświetlić nową wiadomość.

Zmodyfikuj `addSmartContractListener` na następujący kod:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Przeanalizujmy, co się dzieje, gdy nasłuchiwacz wykryje zdarzenie:

- Jeśli podczas emitowania zdarzenia wystąpi błąd, zostanie to odzwierciedlone w interfejsie użytkownika za pośrednictwem naszej zmiennej stanu `status`.
- W przeciwnym razie użyjemy zwróconego obiektu `data`. `data.returnValues` to tablica indeksowana od zera, w której pierwszy element przechowuje poprzednią wiadomość, a drugi element przechowuje zaktualizowaną. Podsumowując, w przypadku pomyślnego zdarzenia ustawimy nasz ciąg znaków `message` na zaktualizowaną wiadomość, wyczyścimy ciąg znaków `newMessage` i zaktualizujemy naszą zmienną stanu `status`, aby odzwierciedlić, że nowa wiadomość została opublikowana w naszym inteligentnym kontrakcie.

Na koniec wywołajmy nasz nasłuchiwacz w naszej funkcji `useEffect`, aby został zainicjowany podczas pierwszego renderowania komponent `HelloWorld.js`. Podsumowując, Twoja funkcja `useEffect` powinna wyglądać tak:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Teraz, gdy jesteśmy w stanie odczytywać dane z naszego inteligentnego kontraktu, byłoby wspaniale dowiedzieć się, jak również do niego zapisywać! Jednak aby zapisywać w naszej aplikacji dapp, musimy najpierw mieć podłączony do niej portfel Ethereum.

Więc w następnej kolejności zajmiemy się konfiguracją naszego portfela Ethereum \(MetaMask\), a następnie podłączeniem go do naszej aplikacji dapp!

### Krok 4: Skonfiguruj swój portfel Ethereum {#step-4-set-up-your-ethereum-wallet}

Aby zapisać cokolwiek w łańcuchu Ethereum, użytkownicy muszą podpisywać transakcje za pomocą kluczy prywatnych swojego wirtualnego portfela. W tym samouczku użyjemy [MetaMask](https://metamask.io/), wirtualnego portfela w przeglądarce używanego do zarządzania adresem konta Ethereum, ponieważ sprawia on, że podpisywanie transakcji jest bardzo łatwe dla użytkownika końcowego.

Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/) od Ethereum Foundation.

#### Pobierz MetaMask {#download-metamask}

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta lub jeśli już je masz, upewnij się, że przełączyłeś się na „Goerli Test Network” w prawym górnym rogu \(abyśmy nie operowali prawdziwymi pieniędzmi\).

#### Dodaj ether z kranika {#add-ether-from-a-faucet}

Aby podpisać transakcję na blockchainie Ethereum, będziemy potrzebować trochę fałszywego ETH. Aby zdobyć ETH, możesz przejść do [FaucETH](https://fauceth.komputing.org) i wprowadzić adres swojego konta Goerli, kliknąć „Request funds” (Poproś o środki), następnie wybrać „Ethereum Testnet Goerli” z listy rozwijanej i na koniec ponownie kliknąć przycisk „Request funds”. Wkrótce potem powinieneś zobaczyć ETH na swoim koncie MetaMask!

#### Sprawdź swoje saldo
Aby upewnić się, że nasze saldo tam jest, wykonajmy żądanie [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) za pomocą [narzędzia sandbox Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Zwróci to ilość ETH w naszym portfelu. Po wprowadzeniu adresu swojego konta MetaMask i kliknięciu „Send Request”, powinieneś zobaczyć odpowiedź podobną do tej:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**UWAGA:** Ten wynik jest podany w wei, a nie w ETH. Wei jest używane jako najmniejszy nominał etheru. Przelicznik z wei na ETH to: 1 ETH = 10¹⁸ wei. Więc jeśli zamienimy 0xde0b6b3a7640000 na system dziesiętny, otrzymamy 1\*10¹⁸, co równa się 1 ETH.

Uff! Nasze fałszywe pieniądze są na miejscu! 🤑
### Krok 5: Podłącz MetaMask do swojego interfejsu użytkownika {#step-5-connect-metamask-to-your-ui}

Teraz, gdy nasz portfel MetaMask jest skonfigurowany, podłączmy do niego naszą aplikację dapp!

#### Funkcja `connectWallet` {#the-connectwallet-function}

W naszym pliku `interact.js` zaimplementujmy funkcję `connectWallet`, którą następnie będziemy mogli wywołać w naszym komponencie `HelloWorld.js`.

Zmodyfikujmy `connectWallet` na następujący kod:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Więc co dokładnie robi ten gigantyczny blok kodu?

Cóż, po pierwsze, sprawdza, czy `window.ethereum` jest włączone w Twojej przeglądarce.

`window.ethereum` to globalne API wstrzykiwane przez MetaMask i innych dostawców portfeli, które pozwala stronom internetowym na żądanie kont Ethereum użytkowników. W przypadku zatwierdzenia może odczytywać dane z blockchainów, do których podłączony jest użytkownik, i sugerować użytkownikowi podpisywanie wiadomości oraz transakcji. Sprawdź [dokumentację MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents), aby uzyskać więcej informacji!

Jeśli `window.ethereum` _nie jest_ obecne, oznacza to, że MetaMask nie jest zainstalowany. Skutkuje to zwróceniem obiektu JSON, w którym zwrócony `address` jest pustym ciągiem znaków, a obiekt JSX `status` przekazuje informację, że użytkownik musi zainstalować MetaMask.

Teraz, jeśli `window.ethereum` _jest_ obecne, wtedy robi się ciekawie.

Używając bloku try/catch, spróbujemy połączyć się z MetaMask, wywołując [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Wywołanie tej funkcji otworzy MetaMask w przeglądarce, po czym użytkownik zostanie poproszony o podłączenie swojego portfela do Twojej aplikacji dapp.

- Jeśli użytkownik zdecyduje się połączyć, `method: "eth_requestAccounts"` zwróci tablicę zawierającą wszystkie adresy kont użytkownika, które połączyły się z aplikacją dapp. Podsumowując, nasza funkcja `connectWallet` zwróci obiekt JSON, który zawiera _pierwszy_ `address` w tej tablicy \(zobacz wiersz 9\) oraz wiadomość `status`, która zachęca użytkownika do zapisania wiadomości w inteligentnym kontrakcie.
- Jeśli użytkownik odrzuci połączenie, obiekt JSON będzie zawierał pusty ciąg znaków dla zwróconego `address` oraz wiadomość `status`, która odzwierciedla, że użytkownik odrzucił połączenie.

Teraz, gdy napisaliśmy tę funkcję `connectWallet`, następnym krokiem jest wywołanie jej w naszym komponencie `HelloWorld.js`.

#### Dodaj funkcję `connectWallet` do swojego komponentu interfejsu użytkownika `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Przejdź do funkcji `connectWalletPressed` w `HelloWorld.js` i zaktualizuj ją na następującą:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Zauważasz, jak większość naszej funkcjonalności jest wyabstrahowana z naszego komponentu `HelloWorld.js` do pliku `interact.js`? Dzieje się tak, abyśmy byli zgodni z paradygmatem M-V-C!

W `connectWalletPressed` po prostu wykonujemy wywołanie await do naszej zaimportowanej funkcji `connectWallet`, a korzystając z jej odpowiedzi, aktualizujemy nasze zmienne `status` i `walletAddress` za pośrednictwem ich hooków stanu.

Teraz zapiszmy oba pliki \(`HelloWorld.js` i `interact.js`\) i przetestujmy nasz dotychczasowy interfejs użytkownika.

Otwórz przeglądarkę na stronie [http://localhost:3000/](http://localhost:3000/) i naciśnij przycisk „Connect Wallet” w prawym górnym rogu strony.

Jeśli masz zainstalowany MetaMask, powinieneś zostać poproszony o podłączenie swojego portfela do aplikacji dapp. Zaakceptuj zaproszenie do połączenia.

Powinieneś zobaczyć, że przycisk portfela odzwierciedla teraz, że Twój adres jest podłączony! Taaak 🔥

Następnie spróbuj odświeżyć stronę... to dziwne. Nasz przycisk portfela prosi nas o podłączenie MetaMask, mimo że jest już podłączony...

Jednak nie obawiaj się! Możemy łatwo to rozwiązać, implementując `getCurrentWalletConnected`, co sprawdzi, czy adres jest już podłączony do naszej aplikacji dapp i odpowiednio zaktualizuje nasz interfejs użytkownika!

#### Funkcja `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Zaktualizuj swoją funkcję `getCurrentWalletConnected` w pliku `interact.js` na następującą:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Ten kod jest _bardzo_ podobny do funkcji `connectWallet`, którą właśnie napisaliśmy w poprzednim kroku.

Główna różnica polega na tym, że zamiast wywoływać metodę `eth_requestAccounts`, która otwiera MetaMask, aby użytkownik mógł podłączyć swój portfel, tutaj wywołujemy metodę `eth_accounts`, która po prostu zwraca tablicę zawierającą adresy MetaMask aktualnie podłączone do naszej aplikacji dapp.

Aby zobaczyć tę funkcję w akcji, wywołajmy ją w naszej funkcji `useEffect` naszego komponentu `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Zauważ, że używamy odpowiedzi z naszego wywołania `getCurrentWalletConnected`, aby zaktualizować nasze zmienne stanu `walletAddress` i `status`.

Teraz, gdy dodałeś ten kod, spróbujmy odświeżyć okno naszej przeglądarki.

Świetnie! Przycisk powinien informować, że jesteś podłączony, i pokazywać podgląd adresu Twojego podłączonego portfela – nawet po odświeżeniu!

#### Zaimplementuj `addWalletListener` {#implement-addwalletlistener}

Ostatnim krokiem w konfiguracji portfela naszej aplikacji dapp jest zaimplementowanie nasłuchiwacza portfela, aby nasz interfejs użytkownika aktualizował się, gdy stan naszego portfela ulegnie zmianie, na przykład gdy użytkownik się odłączy lub zmieni konta.

W swoim pliku `HelloWorld.js` zmodyfikuj funkcję `addWalletListener` w następujący sposób:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Założę się, że na tym etapie nie potrzebujesz nawet naszej pomocy, aby zrozumieć, co się tutaj dzieje, ale dla pewności szybko to przeanalizujmy:

- Po pierwsze, nasza funkcja sprawdza, czy `window.ethereum` jest włączone \(tj. czy MetaMask jest zainstalowany\).
  - Jeśli nie jest, po prostu ustawiamy naszą zmienną stanu `status` na ciąg znaków JSX, który zachęca użytkownika do zainstalowania MetaMask.
  - Jeśli jest włączone, konfigurujemy nasłuchiwacz `window.ethereum.on("accountsChanged")` w wierszu 3, który nasłuchuje zmian stanu w portfelu MetaMask, co obejmuje sytuacje, gdy użytkownik podłącza dodatkowe konto do aplikacji dapp, zmienia konta lub odłącza konto. Jeśli podłączone jest co najmniej jedno konto, zmienna stanu `walletAddress` jest aktualizowana jako pierwsze konto w tablicy `accounts` zwróconej przez nasłuchiwacz. W przeciwnym razie `walletAddress` jest ustawiane jako pusty ciąg znaków.

Ostatnią, ale nie mniej ważną rzeczą jest wywołanie jej w naszej funkcji `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

I to wszystko! Pomyślnie zakończyliśmy programowanie całej funkcjonalności naszego portfela! Teraz przejdźmy do naszego ostatniego zadania: aktualizacji wiadomości przechowywanej w naszym inteligentnym kontrakcie!

### Krok 6: Zaimplementuj funkcję `updateMessage` {#step-6-implement-the-updatemessage-function}

Dobra ekipa, dotarliśmy na ostatnią prostą! W `updateMessage` Twojego pliku `interact.js` zrobimy następujące rzeczy:

1. Upewnimy się, że wiadomość, którą chcemy opublikować w naszym inteligentnym kontrakcie, jest prawidłowa
2. Podpiszemy naszą transakcję za pomocą MetaMask
3. Wywołamy tę funkcję z naszego komponentu frontendowego `HelloWorld.js`

Nie potrwa to długo; dokończmy tę aplikację dapp!

#### Obsługa błędów wejściowych {#input-error-handling}

Naturalnie, sensowne jest posiadanie jakiegoś rodzaju obsługi błędów wejściowych na początku funkcji.

Będziemy chcieli, aby nasza funkcja zwróciła wartość wcześniej, jeśli nie ma zainstalowanego rozszerzenia MetaMask, nie ma podłączonego portfela \(tj. przekazany `address` jest pustym ciągiem znaków\) lub `message` jest pustym ciągiem znaków. Dodajmy następującą obsługę błędów do `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Teraz, gdy ma odpowiednią obsługę błędów wejściowych, nadszedł czas na podpisanie transakcji za pośrednictwem MetaMask!

#### Podpisywanie naszej transakcji {#signing-our-transaction}

Jeśli już czujesz się komfortowo z tradycyjnymi transakcjami Ethereum w Web3, kod, który napiszemy w następnej kolejności, będzie bardzo znajomy. Poniżej kodu obsługi błędów wejściowych dodaj następujący kod do `updateMessage`:

```javascript
// interact.js

//ustaw parametry transakcji
const transactionParameters = {
  to: contractAddress, // Wymagane z wyjątkiem publikacji kontraktu.
  from: address, // musi pasować do aktywnego adresu użytkownika.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//podpisz transakcję
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Przeanalizujmy, co się dzieje. Najpierw konfigurujemy parametry naszej transakcji, gdzie:

- `to` określa adres odbiorcy \(nasz inteligentny kontrakt\)
- `from` określa osobę podpisującą transakcję, zmienną `address`, którą przekazaliśmy do naszej funkcji
- `data` zawiera wywołanie metody `update` naszego inteligentnego kontraktu Hello World, otrzymując naszą zmienną znakową `message` jako dane wejściowe

Następnie wykonujemy wywołanie await, `window.ethereum.request`, w którym prosimy MetaMask o podpisanie transakcji. Zauważ, że w wierszach 11 i 12 określamy naszą metodę eth, `eth_sendTransaction` i przekazujemy nasze `transactionParameters`.

W tym momencie MetaMask otworzy się w przeglądarce i poprosi użytkownika o podpisanie lub odrzucenie transakcji.

- Jeśli transakcja się powiedzie, funkcja zwróci obiekt JSON, w którym ciąg znaków JSX `status` zachęca użytkownika do sprawdzenia Etherscan w celu uzyskania dodatkowych informacji o jego transakcji.
- Jeśli transakcja się nie powiedzie, funkcja zwróci obiekt JSON, w którym ciąg znaków `status` przekazuje komunikat o błędzie.

Podsumowując, nasza funkcja `updateMessage` powinna wyglądać tak:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //obsługa błędów wejścia
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //ustaw parametry transakcji
  const transactionParameters = {
    to: contractAddress, // Wymagane z wyjątkiem publikacji kontraktu.
    from: address, // musi pasować do aktywnego adresu użytkownika.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //podpisz transakcję
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Ostatnią, ale nie mniej ważną rzeczą jest podłączenie naszej funkcji `updateMessage` do naszego komponentu `HelloWorld.js`.

#### Podłącz `updateMessage` do frontendu `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nasza funkcja `onUpdatePressed` powinna wykonać wywołanie await do zaimportowanej funkcji `updateMessage` i zmodyfikować zmienną stanu `status`, aby odzwierciedlić, czy nasza transakcja się powiodła, czy nie:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

To bardzo przejrzyste i proste. I zgadnij co... TWOJA APLIKACJA DAPP JEST GOTOWA!!!

Śmiało, przetestuj przycisk **Update** (Aktualizuj)!

### Stwórz własną niestandardową aplikację dapp {#make-your-own-custom-dapp}

Hura, dotarłeś do końca samouczka! Podsumowując, nauczyłeś się, jak:

- Podłączyć portfel MetaMask do swojego projektu aplikacji dapp
- Odczytywać dane ze swojego inteligentnego kontraktu za pomocą API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Podpisywać transakcje Ethereum za pomocą MetaMask

Teraz jesteś w pełni wyposażony, aby zastosować umiejętności z tego samouczka do zbudowania własnego niestandardowego projektu aplikacji dapp! Jak zawsze, jeśli masz jakiekolwiek pytania, nie wahaj się skontaktować z nami w celu uzyskania pomocy na [Discordzie Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Po ukończeniu tego samouczka daj nam znać, jakie były Twoje wrażenia lub czy masz jakieś uwagi, oznaczając nas na Twitterze [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
