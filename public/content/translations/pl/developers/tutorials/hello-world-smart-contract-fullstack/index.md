---
title: "Inteligentny kontrakt „Witaj świecie” dla początkujących – Fullstack"
description: "Samouczek wprowadzający na temat pisania i wdrażania prostego inteligentnego kontraktu na Ethereum."
author: "nstrike2"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "smart kontrakty",
    "wdrażanie",
    "eksplorator bloków",
    "frontend",
    "transakcje"
  ]
skill: beginner
lang: pl
published: 2021-10-25
---

Ten przewodnik jest dla Ciebie, jeśli jesteś nowy w tworzeniu blockchaina i nie wiesz, od czego zacząć lub jak wdrażać i wchodzić w interakcję z inteligentnymi kontraktami. Przeprowadzimy Cię przez proces tworzenia i wdrażania prostego inteligentnego kontraktu w sieci testowej Goerli przy użyciu [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) i [Alchemy](https://alchemy.com/eth).

Do ukończenia tego samouczka potrzebne będzie konto Alchemy. [Zarejestruj się, aby założyć darmowe konto](https://www.alchemy.com/).

Jeśli masz jakieś pytania, skontaktuj się z nami na [Discordzie Alchemy](https://discord.gg/gWuC7zB)!

## Część 1 – Utwórz i wdróż swój inteligentny kontrakt za pomocą Hardhat {#part-1}

### Połącz się z siecią Ethereum {#connect-to-the-ethereum-network}

Istnieje wiele sposobów na wysyłanie żądań do łańcucha Ethereum. Dla uproszczenia, użyjemy darmowego konta na Alchemy, platformie deweloperskiej i interfejsie API blockchaina, które pozwalają nam komunikować się z łańcuchem Ethereum bez konieczności samodzielnego uruchamiania węzła. Alchemy posiada również narzędzia deweloperskie do monitorowania i analityki. Skorzystamy z nich w tym samouczku, aby zrozumieć, co dzieje się pod maską podczas wdrażania naszego inteligentnego kontraktu.

### Utwórz swoją aplikację i klucz API {#create-your-app-and-api-key}

Po utworzeniu konta Alchemy, można wygenerować klucz API, tworząc aplikację. Umożliwi to wysyłanie żądań do sieci testowej Goerli. Jeśli nie znasz sieci testowych, możesz [przeczytać przewodnik Alchemy dotyczący wyboru sieci](https://www.alchemy.com/docs/choosing-a-web3-network).

Na pulpicie nawigacyjnym Alchemy znajdź menu rozwijane **Aplikacje** w pasku nawigacyjnym i kliknij **Utwórz aplikację**.

![Utwórz aplikację Hello world](./hello-world-create-app.png)

Nadaj swojej aplikacji nazwę „_Hello World_” i wpisz krótki opis. Wybierz **Staging** jako środowisko i **Goerli** jako sieć.

![widok tworzenia aplikacji hello world](./create-app-view-hello-world.png)

_Uwaga: upewnij się, że wybrałeś **Goerli**, w przeciwnym razie ten samouczek nie zadziała._

Kliknij **Utwórz aplikację**. Twoja aplikacja pojawi się w poniższej tabeli.

### Utwórz konto Ethereum {#create-an-ethereum-account}

Aby wysyłać i odbierać transakcje, potrzebujesz konta Ethereum. Użyjemy MetaMask, wirtualnego portfela w przeglądarce, który pozwala użytkownikom zarządzać adresem konta Ethereum.

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta, lub jeśli już je posiadasz, upewnij się, że przełączyłeś się na „Sieć testową Goerli” w prawym górnym rogu (aby nie mieć do czynienia z prawdziwymi pieniędzmi).

### Krok 4: Dodaj ether z Faucet {#step-4-add-ether-from-a-faucet}

Aby wdrożyć swój inteligentny kontrakt w sieci testowej, będziesz potrzebować trochę fałszywych ETH. Aby uzyskać ETH w sieci Goerli, przejdź do Faucet Goerli i wprowadź adres swojego konta Goerli. Należy pamiętać, że krany Goerli mogą być ostatnio nieco zawodne - sprawdź [stronę sieci testowych](/developers/docs/networks/#goerli), aby uzyskać listę opcji do wypróbowania:

_Uwaga: ze względu na przeciążenie sieci może to trochę potrwać._

### Krok 5: Sprawdź swoje saldo {#step-5-check-your-balance}

Aby dwukrotnie sprawdzić, czy ETH znajduje się w Twoim portfelu, wykonaj żądanie [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) za pomocą [narzędzia kompozytora Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Zwróci to ilość ETH w naszym portfelu. Aby dowiedzieć się więcej, sprawdź [krótki samouczek Alchemy na temat korzystania z narzędzia kompozytora](https://youtu.be/r6sjRxBZJuU).

Wprowadź swój adres konta MetaMask i kliknij **Wyślij żądanie**. Zobaczysz odpowiedź, która wygląda jak poniższy fragment kodu.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Uwaga: Ten wynik jest w wei, nie w ETH. Wei jest używane jako najmniejsza jednostka etheru._

Uff! Wszystkie nasze fałszywe pieniądze są na miejscu.

### Krok 6: Zainicjuj nasz projekt {#step-6-initialize-our-project}

Najpierw musimy utworzyć folder dla naszego projektu. Przejdź do wiersza poleceń i wprowadź następujące informacje.

```
mkdir hello-world
cd hello-world
```

Teraz, gdy jesteśmy w folderze naszego projektu, użyjemy `npm init`, aby zainicjować projekt.

> Jeśli nie masz jeszcze zainstalowanego npm, postępuj zgodnie z [tymi instrukcjami, aby zainstalować Node.js i npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Dla celów tego samouczka nie ma znaczenia, jak odpowiesz na pytania inicjujące. Oto, jak zrobiliśmy to dla odniesienia:

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

Hardhat to środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Ethereum. Pomaga deweloperom w tworzeniu inteligentnych kontraktów i dapek lokalnie przed wdrożeniem ich na żywym łańcuchu.

W naszym projekcie `hello-world` uruchom:

```
npm install --save-dev hardhat
```

Sprawdź tę stronę, aby uzyskać więcej szczegółów na temat [instrukcji instalacji](https://hardhat.org/getting-started/#overview).

### Krok 8: Utwórz projekt Hardhat {#step-8-create-hardhat-project}

W naszym folderze projektu `hello-world` uruchom:

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

👷 Witamy w Hardhat v2.0.11 👷‍

Co chcesz zrobić? …
Utwórz przykładowy projekt
❯ Utwórz pusty plik hardhat.config.js
Zamknij
```

Spowoduje to wygenerowanie pliku `hardhat.config.js` w projekcie. Użyjemy tego później w samouczku, aby określić konfigurację naszego projektu.

### Krok 9: Dodaj foldery projektu {#step-9-add-project-folders}

Aby utrzymać porządek w projekcie, utwórzmy dwa nowe foldery. W wierszu poleceń przejdź do katalogu głównego projektu `hello-world` i wpisz:

```
mkdir contracts
mkdir scripts
```

- w `contracts/` będziemy przechowywać plik z kodem naszego inteligentnego kontraktu hello world
- w `scripts/` będziemy przechowywać skrypty do wdrażania naszego kontraktu i interakcji z nim

### Krok 10: Napisz nasz kontrakt {#step-10-write-our-contract}

Możesz zadać sobie pytanie, kiedy napiszemy kod? Nadszedł czas!

Otwórz projekt hello-world w swoim ulubionym edytorze. Inteligentne kontrakty najczęściej pisane są w Solidity, którego użyjemy do napisania naszego inteligentnego kontraktu.

1. Przejdź do folderu `contracts` i utwórz nowy plik o nazwie `HelloWorld.sol`
2. Poniżej znajduje się przykładowy inteligentny kontrakt Witaj Świecie, którego będziemy używać w tym samouczku. Skopiuj poniższą zawartość do pliku `HelloWorld.sol`.

_Uwaga: Pamiętaj, aby przeczytać komentarze, aby zrozumieć, co robi ten kontrakt._

```
// Określa wersję Solidity, używając semantycznego wersjonowania.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt jest zbiorem funkcji i danych (jego stanu). Po wdrożeniu kontrakt znajduje się pod określonym adresem w blockchainie Ethereum. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emitowane, gdy wywoływana jest funkcja aktualizacji
   // Zdarzenia inteligentnych kontraktów to sposób, w jaki kontrakt komunikuje, że coś wydarzyło się na blockchainie do front-endu aplikacji, który może „nasłuchiwać” określonych zdarzeń i podejmować działania, gdy one wystąpią.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` udostępnia zmienne spoza kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać w celu uzyskania dostępu do wartości.
   string public message;

   // Podobnie jak w wielu językach obiektowych opartych na klasach, konstruktor jest specjalną funkcją, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjalizacji danych kontraktu. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akceptuje argument ciągu znaków `initMessage` i ustawia wartość w zmiennej pamięci kontraktu `message`).
      message = initMessage;
   }

   // Funkcja publiczna, która akceptuje argument w postaci ciągu znaków i aktualizuje zmienną pamięci masowej `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Jest to podstawowy inteligentny kontrakt, który przechowuje wiadomość po utworzeniu. Można go zaktualizować, wywołując funkcję `update`.

### Krok 11: Podłącz MetaMask i Alchemy do swojego projektu {#step-11-connect-metamask-alchemy-to-your-project}

Stworzyliśmy portfel MetaMask, konto Alchemy i napisaliśmy nasz inteligentny kontrakt, teraz nadszedł czas, aby połączyć te trzy elementy.

Każda transakcja wysłana z Twojego portfela wymaga podpisu za pomocą Twojego unikalnego klucza prywatnego. Aby zapewnić naszemu programowi to uprawnienie, możemy bezpiecznie przechowywać nasz klucz prywatny w pliku środowiskowym. Będziemy tutaj również przechowywać klucz API dla Alchemy.

> Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [ten samouczek](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) na temat wysyłania transakcji za pomocą web3.

Najpierw zainstaluj pakiet dotenv w katalogu swojego projektu:

```
npm install dotenv --save
```

Następnie utwórz plik `.env` w głównym katalogu projektu. Dodaj do niego swój klucz prywatny MetaMask i adres URL HTTP Alchemy API.

Twój plik środowiskowy musi mieć nazwę `.env`, w przeciwnym razie nie zostanie rozpoznany jako plik środowiskowy.

Nie nazywaj go `process.env` lub `.env-custom` ani w żaden inny sposób.

- Postępuj zgodnie z [tymi instrukcjami](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), aby wyeksportować swój klucz prywatny
- Poniżej dowiesz się, jak uzyskać adres URL interfejsu API HTTP Alchemy

![](./get-alchemy-api-key.gif)

Twój plik `.env` powinien wyglądać następująco:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Aby faktycznie połączyć je z naszym kodem, odwołamy się do tych zmiennych w naszym pliku `hardhat.config.js` w kroku 13.

### Krok 12: Zainstaluj Ethers.js {#step-12-install-ethersjs}

Ethers.js to biblioteka, która ułatwia interakcję i wysyłanie żądań do Ethereum poprzez opakowanie [standardowych metod JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) w bardziej przyjazne dla użytkownika metody.

Hardhat pozwala nam na integrację [wtyczek](https://hardhat.org/plugins/) w celu uzyskania dodatkowych narzędzi i rozszerzonej funkcjonalności. Skorzystamy z [wtyczki Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) do wdrażania kontraktów.

W katalogu projektu wpisz:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Krok 13: Zaktualizuj hardhat.config.js {#step-13-update-hardhat-configjs}

Do tej pory dodaliśmy kilka zależności i wtyczek, teraz musimy zaktualizować `hardhat.config.js`, aby nasz projekt wiedział o wszystkich.

Zaktualizuj swój `hardhat.config.js`, aby wyglądał następująco:

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

Aby upewnić się, że wszystko do tej pory działa, skompilujmy nasz kontrakt. Zadanie `compile` jest jednym z wbudowanych zadań hardhat.

Z wiersza poleceń uruchom:

```bash
npx hardhat compile
```

Możesz otrzymać ostrzeżenie o `SPDX license identifier not provided in source file`, ale nie musisz się tym martwić - miejmy nadzieję, że wszystko inne wygląda dobrze! Jeśli nie, zawsze możesz napisać wiadomość na [discordzie Alchemy](https://discord.gg/u72VCg3).

### Krok 15: Napisz nasz skrypt wdrożeniowy {#step-15-write-our-deploy-script}

Teraz, gdy nasz kontrakt jest napisany, a nasz plik konfiguracyjny jest gotowy, nadszedł czas, aby napisać nasz skrypt wdrażający kontrakt.

Przejdź do folderu `scripts/` i utwórz nowy plik o nazwie `deploy.js`, dodając do niego następującą zawartość:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Rozpocznij wdrażanie, zwracając obietnicę, która rozwiązuje się do obiektu kontraktu
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

Hardhat wykonuje niesamowitą robotę, wyjaśniając, co robi każda z tych linii kodu w swoim [samouczku dotyczącym kontraktów](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), a my przyjęliśmy ich wyjaśnienia tutaj.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` w ethers.js jest abstrakcją używaną do wdrażania nowych inteligentnych kontraktów, więc `HelloWorld` jest tutaj [fabryką](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) dla instancji naszego kontraktu witaj świecie. Podczas korzystania z wtyczki `hardhat-ethers`, instancje `ContractFactory` i `Contract` są domyślnie połączone z pierwszym sygnatariuszem (właścicielem).

```javascript
const hello_world = await HelloWorld.deploy()
```

Wywołanie `deploy()` w `ContractFactory` rozpocznie wdrażanie i zwróci `Promise`, które rozwiąże się do obiektu `Contract`. Jest to obiekt, który ma metodę dla każdej z naszych funkcji inteligentnego kontraktu.

### Krok 16: Wdróż nasz kontrakt {#step-16-deploy-our-contract}

Jesteśmy wreszcie gotowi do wdrożenia naszego inteligentnego kontraktu! Przejdź do wiersza poleceń i uruchom:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Powinieneś wtedy zobaczyć coś takiego:

```bash
Kontrakt wdrożony pod adresem: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Proszę zapisać ten adres**. Będziemy go używać w dalszej części samouczka.

Jeśli przejdziemy do [Goerli etherscan](https://goerli.etherscan.io) i wyszukamy adres naszego kontraktu, powinniśmy zobaczyć, że został on pomyślnie wdrożony. Transakcja będzie wyglądać mniej więcej tak:

![](./etherscan-contract.png)

Adres `From` powinien pasować do adresu konta MetaMask, a adres `To` będzie zawierał informację **Contract Creation**. Jeśli klikniemy w transakcję, zobaczymy adres naszego kontraktu w polu `Do`.

![](./etherscan-transaction.png)

Gratulacje! Właśnie wdrożyłeś inteligentny kontrakt w sieci testowej Ethereum.

Aby zrozumieć, co dzieje się pod maską, przejdź do zakładki Eksplorator w naszym [pulpicie nawigacyjnym Alchemy](https://dashboard.alchemy.com/explorer). Jeśli masz wiele aplikacji Alchemy, upewnij się, że filtrujesz według aplikacji i wybierz **Hello World**.

![](./hello-world-explorer.png)

Tutaj zobaczysz kilka metod JSON-RPC, które Hardhat/Ethers stworzył dla nas pod maską, gdy wywołaliśmy funkcję `.deploy()`. Dwie ważne metody to [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), czyli żądanie zapisu naszego kontraktu w łańcuchu Goerli, oraz [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), czyli żądanie odczytania informacji o naszej transakcji na podstawie jej hasza. Aby dowiedzieć się więcej o wysyłaniu transakcji, sprawdź [nasz samouczek na temat wysyłania transakcji za pomocą Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Część 2: Interakcja z Twoim inteligentnym kontraktem {#part-2-interact-with-your-smart-contract}

Teraz, gdy pomyślnie wdrożyliśmy inteligentny kontrakt w sieci Goerli, nauczmy się, jak wchodzić z nim w interakcję.

### Utwórz plik interact.js {#create-a-interactjs-file}

To jest plik, w którym napiszemy nasz skrypt interakcji. Będziemy używać biblioteki Ethers.js, którą zainstalowałeś wcześniej w części 1.

W folderze `scripts/` utwórz nowy plik o nazwie `interact.js` i dodaj następujący kod:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Zaktualizuj swój plik .env {#update-your-env-file}

Będziemy używać nowych zmiennych środowiskowych, więc musimy je zdefiniować w pliku `.env`, który [utworzyliśmy wcześniej](#step-11-connect-metamask-&-alchemy-to-your-project).

Będziemy musieli dodać definicję dla naszego `API_KEY` Alchemy i `CONTRACT_ADDRESS`, gdzie został wdrożony nasz inteligentny kontrakt.

Plik `.env` powinien wyglądać następująco:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Pobierz swoje ABI kontraktu {#grab-your-contract-ABI}

Nasze [ABI (Application Binary Interface)](/glossary/#abi) kontraktu to interfejs do interakcji z naszym inteligentnym kontraktem. Hardhat automatycznie generuje ABI i zapisuje go w `HelloWorld.json`. Aby użyć ABI, będziemy musieli przeanalizować zawartość, dodając następujące wiersze kodu do naszego pliku `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Jeśli chcesz zobaczyć ABI, możesz je wydrukować w swojej konsoli:

```javascript
console.log(JSON.stringify(contract.abi))
```

Aby zobaczyć swoje ABI wydrukowane na konsoli, przejdź do terminala i uruchom:

```bash
npx hardhat run scripts/interact.js
```

### Utwórz instancję swojego kontraktu {#create-an-instance-of-your-contract}

Aby wejść w interakcję z naszym kontraktem, musimy stworzyć jego instancję w naszym kodzie. Aby to zrobić za pomocą Ethers.js, będziemy musieli pracować z trzema koncepcjami:

1. Dostawca - dostawca węzła, który daje Ci dostęp do odczytu i zapisu do blockchaina
2. Sygnatariusz - reprezentuje konto Ethereum, które może podpisywać transakcje
3. Kontrakt - obiekt Ethers.js reprezentujący określony kontrakt wdrożony w łańcuchu

Użyjemy ABI kontraktu z poprzedniego kroku, aby stworzyć instancję naszego kontraktu:

```javascript
// interact.js

// Dostawca
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Sygnatariusz
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Kontrakt
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Dowiedz się więcej o Dostawcach, Sygnatariuszach i Kontraktach w [dokumentacji ethers.js](https://docs.ethers.io/v5/).

### Przeczytaj wiadomość init {#read-the-init-message}

Pamiętasz, jak wdrożyliśmy nasz kontrakt z `initMessage = "Hello world!"`? Teraz odczytamy tę wiadomość zapisaną w naszym inteligentnym kontrakcie i wydrukujemy ją na konsoli.

W języku JavaScript funkcje asynchroniczne są używane podczas interakcji z sieciami. Aby dowiedzieć się więcej o funkcjach asynchronicznych, [przeczytaj ten artykuł](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Użyj poniższego kodu, aby wywołać funkcję `message` w naszym inteligentnym kontrakcie i odczytać wiadomość init:

```javascript
// interact.js

// ...

asynchroniczna funkcja main() {
  const message = await helloWorldContract.message()
  console.log("Wiadomość to: " + message)
}
main()
```

Po uruchomieniu pliku za pomocą `npx hardhat run scripts/interact.js` w terminalu powinniśmy zobaczyć taką odpowiedź:

```
Wiadomość to: Witaj świecie!
```

Gratulacje! Właśnie pomyślnie odczytałeś dane inteligentnego kontraktu z blockchaina Ethereum, brawo!

### Zaktualizuj wiadomość {#update-the-message}

Zamiast tylko odczytywać wiadomość, możemy również zaktualizować wiadomość zapisaną w naszym inteligentnym kontrakcie za pomocą funkcji `update`! Całkiem fajne, prawda?

Aby zaktualizować wiadomość, możemy bezpośrednio wywołać funkcję `update` na naszym obiekcie Contract:

```javascript
// interact.js

// ...

asynchroniczna funkcja main() {
  const message = await helloWorldContract.message()
  console.log("Wiadomość to: " + message)

  console.log("Aktualizowanie wiadomości...")
  const tx = await helloWorldContract.update("To jest nowa wiadomość.")
  await tx.wait()
}
main()
```

Zauważ, że w linii 11, wywołujemy `.wait()` na zwróconym obiekcie transakcji. To zapewnia, że nasz skrypt czeka na wydobycie transakcji na blockchainie przed zakończeniem funkcji. Jeśli wywołanie `.wait()` nie zostanie uwzględnione, skrypt może nie zobaczyć zaktualizowanej wartości `message` w kontrakcie.

### Przeczytaj nową wiadomość {#read-the-new-message}

Powinieneś być w stanie powtórzyć [poprzedni krok](#read-the-init-message), aby odczytać zaktualizowaną wartość `message`. Poświęć chwilę i sprawdź, czy możesz dokonać niezbędnych zmian, aby wydrukować tę nową wartość!

Jeśli potrzebujesz podpowiedzi, oto jak powinien wyglądać twój plik `interact.js` w tym momencie:

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

asynchroniczna funkcja main() {
  const message = await helloWorldContract.message()
  console.log("Wiadomość to: " + message)

  console.log("Aktualizowanie wiadomości...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Nowa wiadomość to: " + newMessage)
}

main()
```

Teraz po prostu uruchom skrypt, a powinieneś zobaczyć starą wiadomość, status aktualizacji i nową wiadomość wydrukowaną w terminalu!

`npx hardhat run scripts/interact.js --network goerli`

```
Wiadomość to: Witaj świecie!
Aktualizowanie wiadomości...
Nowa wiadomość to: To jest nowa wiadomość.
```

Podczas uruchamiania tego skryptu możesz zauważyć, że krok `Aktualizowanie wiadomości...` zajmuje chwilę, zanim załaduje się nowa wiadomość. Jest to spowodowane procesem wydobycia. Jeśli jesteś ciekaw śledzenia transakcji podczas ich wydobywania, odwiedź [mempool Alchemy](https://dashboard.alchemyapi.io/mempool), aby zobaczyć status transakcji. Jeśli transakcja zostanie odrzucona, warto również sprawdzić [Goerli Etherscan](https://goerli.etherscan.io) i wyszukać swój hasz transakcji.

## Część 3: Opublikuj swój inteligentny kontrakt w Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Wykonałeś całą ciężką pracę, aby ożywić swój inteligentny kontrakt, teraz nadszedł czas, aby podzielić się nim ze światem!

Weryfikując swój inteligentny kontrakt w Etherscan, każdy może zobaczyć jego kod źródłowy i wejść z nim w interakcję. Zaczynajmy!

### Krok 1: Wygeneruj klucz API na swoim koncie Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Klucz API Etherscan jest niezbędny do zweryfikowania, czy jesteś właścicielem inteligentnego kontraktu, który próbujesz opublikować.

Jeśli nie masz jeszcze konta Etherscan, [załóż konto](https://etherscan.io/register).

Po zalogowaniu znajdź swoją nazwę użytkownika w pasku nawigacyjnym, najedź na nią i wybierz przycisk **Mój profil**.

Na stronie profilu powinieneś zobaczyć boczny pasek nawigacyjny. Z bocznego paska nawigacyjnego wybierz **Klucze API**. Następnie naciśnij przycisk „Dodaj”, aby utworzyć nowy klucz API, nazwij swoją aplikację **hello-world** i naciśnij przycisk **Utwórz nowy klucz API**.

Nowy klucz API powinien pojawić się w tabeli kluczy API. Skopiuj klucz API do schowka.

Następnie musimy dodać klucz API Etherscan do naszego pliku `.env`.

Po dodaniu, twój plik `.env` powinien wyglądać tak:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Inteligentne kontrakty wdrożone za pomocą Hardhat {#hardhat-deployed-smart-contracts}

#### Zainstaluj hardhat-etherscan {#install-hardhat-etherscan}

Publikowanie kontraktu w Etherscan za pomocą Hardhat jest proste. Na początek musisz zainstalować wtyczkę `hardhat-etherscan`. `hardhat-etherscan` automatycznie zweryfikuje kod źródłowy inteligentnego kontraktu i ABI w Etherscan. Aby to dodać, w katalogu `hello-world` uruchom:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Po zainstalowaniu, dołącz następującą instrukcję na początku pliku `hardhat.config.js` i dodaj opcje konfiguracyjne Etherscan:

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
    // Uzyskaj go na https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Zweryfikuj swój inteligentny kontrakt na Etherscan {#verify-your-smart-contract-on-etherscan}

Upewnij się, że wszystkie pliki są zapisane, a wszystkie zmienne `.env` są poprawnie skonfigurowane.

Uruchom zadanie `verify`, podając adres kontraktu i sieć, w której jest wdrożony:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Upewnij się, że `DEPLOYED_CONTRACT_ADDRESS` to adres Twojego wdrożonego inteligentnego kontraktu w sieci testowej Goerli. Ponadto ostatni argument (`'Hello World!'`) musi być tą samą wartością ciągu znaków, która została użyta [podczas kroku wdrażania w części 1](#write-our-deploy-script).

Jeśli wszystko pójdzie dobrze, zobaczysz następujący komunikat w terminalu:

```text
Pomyślnie przesłano kod źródłowy dla kontraktu
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
do weryfikacji na Etherscan. Oczekiwanie na wynik weryfikacji...


Pomyślnie zweryfikowano kontrakt HelloWorld na Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Gratulacje! Twój kod inteligentnego kontraktu jest w Etherscan!

### Sprawdź swój inteligentny kontrakt w Etherscan! {#check-out-your-smart-contract-on-etherscan}

Po przejściu do linku podanego w terminalu, powinieneś być w stanie zobaczyć kod inteligentnego kontraktu i ABI opublikowane na Etherscan!

**Hura - udało Ci się, mistrzu! Teraz każdy może wywołać lub zapisać do Twojego inteligentnego kontraktu! Nie możemy się doczekać, co zbudujesz dalej!**

## Część 4 – Integracja inteligentnego kontraktu z frontendem {#part-4-integrating-your-smart-contract-with-the-frontend}

Po ukończeniu tego samouczka dowiesz się, jak:

- Połącz portfel MetaMask z Twoją dappką
- Odczytaj dane ze swojego inteligentnego kontraktu za pomocą interfejsu API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Podpisz transakcje Ethereum za pomocą MetaMask

Dla tej dapki użyjemy [React](https://react.dev/) jako naszego frameworka frontendowego. Należy jednak zauważyć, że nie będziemy spędzać dużo czasu na omawianiu jego podstaw, ponieważ skupimy się głównie na wprowadzaniu funkcjonalności Web3 do naszego projektu.

Jako warunek wstępny, powinieneś mieć podstawową wiedzę na temat React. Jeśli nie, polecamy ukończenie oficjalnego [samouczka Wprowadzenie do React](https://react.dev/learn).

### Klonowanie plików startowych {#clone-the-starter-files}

Najpierw przejdź do [repozytorium GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial), aby pobrać pliki startowe dla tego projektu i sklonować to repozytorium na swój komputer lokalny.

Otwórz sklonowane repozytorium lokalnie. Zauważ, że zawiera on dwa foldery: `starter-files` i `completed`.

- `starter-files`- **będziemy pracować w tym katalogu**, połączymy interfejs użytkownika z Twoim portfelem Ethereum i inteligentnym kontraktem, który opublikowaliśmy w Etherscan w [części 3](#part-3).
- `completed` zawiera cały ukończony samouczek i powinien być używany tylko jako odniesienie, jeśli utkniesz.

Następnie otwórz swoją kopię `starter-files` w ulubionym edytorze kodu, a następnie przejdź do folderu `src`.

Cały kod, który napiszemy, będzie znajdować się w folderze `src`. Będziemy edytować komponent `HelloWorld.js` i pliki JavaScript `util/interact.js`, aby nadać naszemu projektowi funkcjonalność Web3.

### Sprawdź pliki startowe {#check-out-the-starter-files}

Zanim zaczniemy kodować, przeanalizujmy, co jest dla nas dostępne w plikach startowych.

#### Uruchomienie projektu React {#get-your-react-project-running}

Zacznijmy od uruchomienia projektu React w naszej przeglądarce. Piękno React polega na tym, że gdy nasz projekt jest już uruchomiony w przeglądarce, wszelkie zapisane przez nas zmiany będą na bieżąco aktualizowane w przeglądarce.

Aby uruchomić projekt, przejdź do katalogu głównego folderu `starter-files` i uruchom `npm install` w terminalu, aby zainstalować zależności projektu:

```bash
cd starter-files
npm install
```

Po zakończeniu instalacji uruchom `npm start` w terminalu:

```bash
npm start
```

Spowoduje to otwarcie [http://localhost:3000/](http://localhost:3000/) w przeglądarce, gdzie zobaczysz frontend naszego projektu. Powinien on składać się z jednego pola (miejsce do aktualizacji wiadomości przechowywanej w inteligentnym kontrakcie), przycisku „Połącz portfel” i przycisku „Aktualizuj”.

Jeśli spróbujesz kliknąć którykolwiek z przycisków, zauważysz, że nie działają – to dlatego, że wciąż musimy zaprogramować ich funkcjonalność.

#### Komponent `HelloWorld.js` {#the-helloworld-js-component}

Wróćmy do folderu `src` w naszym edytorze i otwórzmy plik `HelloWorld.js`. Jest bardzo ważne, abyśmy zrozumieli wszystko w tym pliku, ponieważ jest to główny komponent React, nad którym będziemy pracować.

Na górze tego pliku zauważysz, że mamy kilka instrukcji importu, które są niezbędne do uruchomienia naszego projektu, w tym bibliotekę React, hooki useEffect i useState, niektóre elementy z `./util/interact.js` (opiszemy je bardziej szczegółowo wkrótce!) i logo Alchemy.

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

// Zmienne stanu
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Brak połączenia z siecią.") 
const [newMessage, setNewMessage] = useState("")
```

Oto, co reprezentuje każda ze zmiennych:

- `walletAddress` - ciąg znaków, który przechowuje adres portfela użytkownika
- `status` - ciąg znaków, który przechowuje pomocną wiadomość, która prowadzi użytkownika, jak wchodzić w interakcję z dapp
- `message` - ciąg znaków, który przechowuje bieżącą wiadomość w inteligentnym kontrakcie
- `newMessage` - ciąg znaków, który przechowuje nową wiadomość, która zostanie zapisana w inteligentnym kontrakcie

Po zmiennych stanu zobaczysz pięć niezaimplementowanych funkcji: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` i `onUpdatePressed`. Poniżej wyjaśnimy, co robią:

```javascript
// HelloWorld.js

// wywoływane tylko raz
useEffect(async () => {
  // TODO: zaimplementuj
}, [])

function addSmartContractListener() {
  // TODO: zaimplementuj
}

function addWalletListener() {
  // TODO: zaimplementuj
}

const connectWalletPressed = async () => {
  // TODO: zaimplementuj
}

const onUpdatePressed = async () => {
  // TODO: zaimplementuj
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - to hook React, który jest wywoływany po wyrenderowaniu komponentu. Ponieważ ma przekazaną pustą tablicę `[]` jako właściwość (patrz linia 4), będzie wywoływany tylko podczas _pierwszego_ renderowania komponentu. Tutaj załadujemy bieżącą wiadomość zapisaną w naszym inteligentnym kontrakcie, wywołamy nasze inteligentne kontrakty i nasłuchiwacze portfela, a także zaktualizujemy nasz interfejs użytkownika, aby odzwierciedlić, czy portfel jest już podłączony.
- `addSmartContractListener` - ta funkcja konfiguruje nasłuchiwacza, który będzie obserwował zdarzenie `UpdatedMessages` naszego kontraktu HelloWorld i aktualizował nasz interfejs użytkownika, gdy wiadomość w naszym inteligentnym kontrakcie ulegnie zmianie.
- `addWalletListener` - ta funkcja konfiguruje nasłuchiwacza, który wykrywa zmiany w stanie portfela MetaMask użytkownika, np. gdy użytkownik odłącza portfel lub zmienia adresy.
- `connectWalletPressed` - ta funkcja zostanie wywołana w celu połączenia portfela MetaMask użytkownika z naszą dapp.
- `onUpdatePressed` - ta funkcja zostanie wywołana, gdy użytkownik będzie chciał zaktualizować wiadomość zapisaną w inteligentnym kontrakcie.

Pod koniec tego pliku mamy interfejs użytkownika naszego komponentu.

```javascript
// HelloWorld.js

// interfejs użytkownika naszego komponentu
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Połączono: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Połącz portfel</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Bieżąca wiadomość:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Nowa wiadomość:</h2>

    <div>
      <input
        type="text"
        placeholder="Zaktualizuj wiadomość w swoim inteligentnym kontrakcie."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Zaktualizuj
      </button>
</div>
 
</div>
)
```

Jeśli dokładnie przeanalizujesz ten kod, zauważysz, gdzie używamy naszych różnych zmiennych stanu w naszym interfejsie użytkownika:

- W liniach 6-12, jeśli portfel użytkownika jest podłączony (tj. `walletAddress.length > 0`), wyświetlamy skróconą wersję `walletAddress` użytkownika w przycisku o identyfikatorze „walletButton”; w przeciwnym razie jest tam po prostu napis „Połącz portfel”.
- W linii 17 wyświetlamy bieżącą wiadomość zapisaną w inteligentnym kontrakcie, która jest przechwytywana w ciągu znaków `message`.
- W liniach 23-26 używamy [komponentu kontrolowanego](https://legacy.reactjs.org/docs/forms.html#controlled-components), aby zaktualizować naszą zmienną stanu `newMessage`, gdy zmienia się wpis w polu tekstowym.

Oprócz naszych zmiennych stanu, zobaczysz również, że funkcje `connectWalletPressed` i `onUpdatePressed` są wywoływane, gdy odpowiednio klikane są przyciski o identyfikatorach `publishButton` i `walletButton`.

Na koniec zajmijmy się tym, gdzie ten komponent `HelloWorld.js` jest dodawany.

Jeśli przejdziesz do pliku `App.js`, który jest głównym komponentem w React, który działa jako kontener dla wszystkich innych komponentów, zobaczysz, że nasz komponent `HelloWorld.js` jest wstrzykiwany w linii 7.

Na koniec sprawdźmy jeszcze jeden plik, który został dla Ciebie przygotowany, plik `interact.js`.

#### Plik `interact.js` {#the-interact-js-file}

Ponieważ chcemy trzymać się paradygmatu [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), będziemy chcieli mieć osobny plik, który zawiera wszystkie nasze funkcje do zarządzania logiką, danymi i regułami naszej dapki, a następnie będziemy mogli wyeksportować te funkcje do naszego frontendu (naszego komponentu `HelloWorld.js`).

👆🏽 To jest dokładny cel naszego pliku `interact.js`!

Przejdź do folderu `util` w swoim katalogu `src`, a zauważysz, że dołączyliśmy plik o nazwie `interact.js`, który będzie zawierał wszystkie nasze funkcje i zmienne interakcji z inteligentnym kontraktem i portfelem.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Na początku pliku zauważysz, że skomentowaliśmy obiekt `helloWorldContract`. Później w tym samouczku odkomentujemy ten obiekt i utworzymy instancję naszego inteligentnego kontraktu w tej zmiennej, którą następnie wyeksportujemy do naszego komponentu `HelloWorld.js`.

Cztery niezaimplementowane funkcje po naszym obiekcie `helloWorldContract` robią następujące rzeczy:

- `loadCurrentMessage` - ta funkcja obsługuje logikę ładowania bieżącej wiadomości zapisanej w inteligentnym kontrakcie. Wywoła ona żądanie _odczytu_ do inteligentnego kontraktu Witaj Świecie za pomocą [interfejsu API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - ta funkcja połączy MetaMask użytkownika z naszą dappką.
- `getCurrentWalletConnected` - ta funkcja sprawdzi, czy konto Ethereum jest już połączone z naszą dappką podczas ładowania strony i odpowiednio zaktualizuje nasz interfejs użytkownika.
- `updateMessage` - ta funkcja zaktualizuje wiadomość zapisaną w inteligentnym kontrakcie. Wykona ona żądanie _zapisu_ do inteligentnego kontraktu Witaj Świecie, więc portfel MetaMask użytkownika będzie musiał podpisać transakcję Ethereum, aby zaktualizować wiadomość.

Teraz, gdy rozumiemy, z czym pracujemy, dowiedzmy się, jak czytać z naszego inteligentnego kontraktu!

### Krok 3: Odczyt z Twojego inteligentnego kontraktu {#step-3-read-from-your-smart-contract}

Aby odczytać dane z inteligentnego kontraktu, musisz pomyślnie skonfigurować:

- Połączenie API z łańcuchem Ethereum
- Załadowana instancja Twojego inteligentnego kontraktu
- Funkcja do wywołania funkcji inteligentnego kontraktu
- Nasłuchiwacz do obserwowania aktualizacji, gdy zmieniają się dane, które odczytujesz z inteligentnego kontraktu

To może brzmieć jak wiele kroków, ale nie martw się! Przeprowadzimy Cię przez każdy z nich krok po kroku! :\)

#### Ustanów połączenie API z łańcuchem Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Pamiętasz, jak w części 2 tego samouczka użyliśmy naszego klucza Alchemy Web3 do odczytu z naszego inteligentnego kontraktu ([https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library))? Będziesz również potrzebować klucza Alchemy Web3 w swojej dapce, aby czytać z łańcucha.

Jeśli go jeszcze nie masz, najpierw zainstaluj [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), przechodząc do katalogu głównego `starter-files` i uruchamiając następujące polecenie w terminalu:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) to nakładka na [Web3.js](https://docs.web3js.org/), zapewniająca ulepszone metody API i inne kluczowe korzyści, które ułatwiają życie dewelopera web3. Został zaprojektowany tak, aby wymagał minimalnej konfiguracji, dzięki czemu możesz od razu zacząć go używać w swojej aplikacji!

Następnie zainstaluj pakiet [dotenv](https://www.npmjs.com/package/dotenv) w katalogu projektu, abyśmy mieli bezpieczne miejsce do przechowywania naszego klucza API po jego pobraniu.

```text
npm install dotenv --save
```

Dla naszej dapki **będziemy używać naszego klucza API Websockets** zamiast klucza API HTTP, ponieważ pozwoli nam to skonfigurować nasłuchiwacza, który wykrywa, kiedy zmienia się wiadomość zapisana w inteligentnym kontrakcie.

Po uzyskaniu klucza API, utwórz plik `.env` w swoim katalogu głównym i dodaj do niego adres URL Alchemy Websockets. Następnie plik `.env` powinien wyglądać następująco:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Teraz jesteśmy gotowi do skonfigurowania naszego punktu końcowego Alchemy Web3 w naszej dapce! Wróćmy do naszego pliku `interact.js`, który jest zagnieżdżony w naszym folderze `util` i dodajmy następujący kod na początku pliku:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Powyżej najpierw zaimportowaliśmy klucz Alchemy z naszego pliku `.env`, a następnie przekazaliśmy nasz `alchemyKey` do `createAlchemyWeb3`, aby ustanowić nasz punkt końcowy Alchemy Web3.

Gdy ten punkt końcowy jest gotowy, nadszedł czas, aby załadować nasz inteligentny kontrakt!

#### Ładowanie Twojego inteligentnego kontraktu Witaj Świecie {#loading-your-hello-world-smart-contract}

Aby załadować swój inteligentny kontrakt Witaj Świecie, będziesz potrzebować jego adresu kontraktu i ABI, które można znaleźć w Etherscan, jeśli ukończyłeś [część 3 tego samouczka](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan).

#### Jak uzyskać ABI kontraktu z Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Jeśli pominąłeś część 3 tego samouczka, możesz użyć kontraktu HelloWorld z adresem [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Jego ABI można znaleźć [tutaj](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI kontraktu jest niezbędne do określenia, którą funkcję kontrakt wywoła, a także do zapewnienia, że funkcja zwróci dane w oczekiwanym formacie. Po skopiowaniu naszego ABI kontraktu, zapiszmy go jako plik JSON o nazwie `contract-abi.json` w swoim katalogu `src`.

Twój plik contract-abi.json powinien być przechowywany w folderze src.

Mając do dyspozycji adres kontraktu, ABI i punkt końcowy Alchemy Web3, możemy użyć [metody kontraktu](https://docs.web3js.org/api/web3-eth-contract/class/Contract), aby załadować instancję naszego inteligentnego kontraktu. Zaimportuj ABI kontraktu do pliku `interact.js` i dodaj adres kontraktu.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Możemy teraz wreszcie odkomentować naszą zmienną `helloWorldContract` i załadować inteligentny kontrakt za pomocą naszego punktu końcowego AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Podsumowując, pierwsze 12 linii pliku `interact.js` powinno teraz wyglądać tak:

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

Teraz, gdy nasz kontrakt jest załadowany, możemy zaimplementować naszą funkcję `loadCurrentMessage`!

#### Implementacja `loadCurrentMessage` w pliku `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Ta funkcja jest super prosta. Zrobimy proste asynchroniczne wywołanie web3, aby odczytać z naszego kontraktu. Nasza funkcja zwróci wiadomość zapisaną w inteligentnym kontrakcie:

Zaktualizuj `loadCurrentMessage` w swoim pliku `interact.js` do następującej postaci:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Ponieważ chcemy wyświetlić ten inteligentny kontrakt w naszym interfejsie użytkownika, zaktualizujmy funkcję `useEffect` w naszym komponencie `HelloWorld.js` do następującej postaci:

```javascript
// HelloWorld.js

// wywoływane tylko raz
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Zauważ, że chcemy, aby nasza funkcja `loadCurrentMessage` była wywoływana tylko raz podczas pierwszego renderowania komponentu. Wkrótce zaimplementujemy `addSmartContractListener`, aby automatycznie aktualizować interfejs użytkownika po zmianie wiadomości w inteligentnym kontrakcie.

Zanim przejdziemy do naszego nasłuchiwacza, sprawdźmy, co mamy do tej pory! Zapisz pliki `HelloWorld.js` i `interact.js`, a następnie przejdź do [http://localhost:3000/](http://localhost:3000/)

Zauważysz, że bieżąca wiadomość nie brzmi już „Brak połączenia z siecią”. Zamiast tego odzwierciedla ona wiadomość zapisaną w inteligentnym kontrakcie. Super!

#### Twój interfejs użytkownika powinien teraz odzwierciedlać wiadomość zapisaną w inteligentnym kontrakcie {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

A propos tego nasłuchiwacza...

#### Zaimplementuj `addSmartContractListener` {#implement-addsmartcontractlistener}

Jeśli przypomnisz sobie plik `HelloWorld.sol`, który napisaliśmy w [części 1 tej serii samouczków](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), przypomnisz sobie, że istnieje zdarzenie inteligentnego kontraktu o nazwie `UpdatedMessages`, które jest emitowane po wywołaniu funkcji `update` naszego inteligentnego kontraktu (patrz linie 9 i 27):

```javascript
// HelloWorld.sol

// Określa wersję Solidity, używając semantycznego wersjonowania.
// Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definiuje kontrakt o nazwie `HelloWorld`.
// Kontrakt jest zbiorem funkcji i danych (jego stanu). Po wdrożeniu kontrakt znajduje się pod określonym adresem w blockchainie Ethereum. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emitowane, gdy wywoływana jest funkcja aktualizacji
   // Zdarzenia inteligentnych kontraktów to sposób, w jaki kontrakt komunikuje, że coś wydarzyło się na blockchainie do front-endu aplikacji, który może „nasłuchiwać” określonych zdarzeń i podejmować działania, gdy one wystąpią.
   event UpdatedMessages(string oldStr, string newStr);

   // Deklaruje zmienną stanu `message` typu `string`.
   // Zmienne stanu to zmienne, których wartości są trwale przechowywane w pamięci kontraktu. Słowo kluczowe `public` udostępnia zmienne spoza kontraktu i tworzy funkcję, którą inne kontrakty lub klienci mogą wywołać w celu uzyskania dostępu do wartości.
   string public message;

   // Podobnie jak w wielu językach obiektowych opartych na klasach, konstruktor jest specjalną funkcją, która jest wykonywana tylko podczas tworzenia kontraktu.
   // Konstruktory służą do inicjalizacji danych kontraktu. Dowiedz się więcej: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Akceptuje argument ciągu znaków `initMessage` i ustawia wartość w zmiennej pamięci kontraktu `message`).
      message = initMessage;
   }

   // Funkcja publiczna, która akceptuje argument w postaci ciągu znaków i aktualizuje zmienną pamięci masowej `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Zdarzenia inteligentnych kontraktów to sposób, w jaki kontrakt komunikuje, że coś się stało (tj. miało miejsce _zdarzenie_) na blockchainie do Twojej aplikacji front-endowej, która może „nasłuchiwać” określonych zdarzeń i podejmować działania, gdy one wystąpią.

Funkcja `addSmartContractListener` będzie konkretnie nasłuchiwać zdarzenia `UpdatedMessages` naszego inteligentnego kontraktu Witaj Świecie i aktualizować nasz interfejs użytkownika, aby wyświetlić nową wiadomość.

Zmodyfikuj `addSmartContractListener` do następującej postaci:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Twoja wiadomość została zaktualizowana!")
    }
  })
}
```

Przeanalizujmy, co się dzieje, gdy nasłuchiwacz wykryje zdarzenie:

- Jeśli wystąpi błąd podczas emitowania zdarzenia, zostanie on odzwierciedlony w interfejsie użytkownika za pośrednictwem naszej zmiennej stanu `status`.
- W przeciwnym razie użyjemy zwróconego obiektu `data`. `data.returnValues` to tablica indeksowana od zera, w której pierwszy element tablicy przechowuje poprzednią wiadomość, a drugi element przechowuje zaktualizowaną. W sumie, w przypadku pomyślnego zdarzenia, ustawimy nasz ciąg znaków `message` na zaktualizowaną wiadomość, wyczyścimy ciąg znaków `newMessage` i zaktualizujemy naszą zmienną stanu `status`, aby odzwierciedlić, że nowa wiadomość została opublikowana w naszym inteligentnym kontrakcie.

Na koniec wywołajmy naszego nasłuchiwacza w naszej funkcji `useEffect`, aby został zainicjowany podczas pierwszego renderowania komponentu `HelloWorld.js`. W sumie Twoja funkcja `useEffect` powinna wyglądać tak:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Teraz, gdy jesteśmy w stanie czytać z naszego inteligentnego kontraktu, byłoby wspaniale dowiedzieć się, jak do niego pisać! Jednak, aby pisać do naszej dapki, musimy najpierw mieć do niej podłączony portfel Ethereum.

Więc następnie zajmiemy się konfiguracją naszego portfela Ethereum (MetaMask), a następnie podłączeniem go do naszej dapki!

### Krok 4: Skonfiguruj swój portfel Ethereum {#step-4-set-up-your-ethereum-wallet}

Aby cokolwiek zapisać w łańcuchu Ethereum, użytkownicy muszą podpisywać transakcje za pomocą kluczy prywatnych swojego wirtualnego portfela. W tym samouczku użyjemy [MetaMask](https://metamask.io/), wirtualnego portfela w przeglądarce używanego do zarządzania adresem konta Ethereum, ponieważ znacznie ułatwia to podpisywanie transakcji dla użytkownika końcowego.

Jeśli chcesz dowiedzieć się więcej o tym, jak działają transakcje w Ethereum, sprawdź [tę stronę](/developers/docs/transactions/) od Ethereum Foundation.

#### Pobierz MetaMask {#download-metamask}

Możesz pobrać i utworzyć konto MetaMask za darmo [tutaj](https://metamask.io/download). Podczas tworzenia konta, lub jeśli już je posiadasz, upewnij się, że przełączyłeś się na „Sieć testową Goerli” w prawym górnym rogu (aby nie mieć do czynienia z prawdziwymi pieniędzmi).

#### Dodaj ether z Faucet {#add-ether-from-a-faucet}

Aby podpisać transakcję na blockchainie Ethereum, będziemy potrzebować trochę fałszywego Eth. Aby uzyskać Eth, możesz przejść do [FaucETH](https://fauceth.komputing.org) i wprowadzić swój adres konta Goerli, kliknąć „Poproś o fundusze”, następnie wybrać „Ethereum Testnet Goerli” w menu rozwijanym i na koniec ponownie kliknąć przycisk „Poproś o fundusze”. Wkrótce powinieneś zobaczyć Eth na swoim koncie MetaMask!

#### Sprawdź swoje saldo {#check-your-balance}

Aby sprawdzić, czy nasze saldo jest na miejscu, wykonajmy żądanie [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) za pomocą [narzędzia kompozytora Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Zwróci to ilość Eth w naszym portfelu. Po wprowadzeniu adresu konta MetaMask i kliknięciu „Wyślij żądanie” powinieneś zobaczyć następującą odpowiedź:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**UWAGA:** ten wynik jest w wei, a nie w eth. Wei jest używany jako najmniejsza jednostka etheru. Konwersja z wei na eth to: 1 eth = 10¹⁸ wei. Więc jeśli przekonwertujemy 0xde0b6b3a7640000 na system dziesiętny, otrzymamy 1\*10¹⁸, co równa się 1 eth.

Uff! Nasze fałszywe pieniądze są na miejscu! 🤑

### Krok 5: Podłącz MetaMask do swojego interfejsu użytkownika {#step-5-connect-metamask-to-your-UI}

Teraz, gdy nasz portfel MetaMask jest skonfigurowany, połączmy z nim naszą dapką!

#### Funkcja `connectWallet` {#the-connectWallet-function}

W naszym pliku `interact.js` zaimplementujmy funkcję `connectWallet`, którą następnie możemy wywołać w naszym komponencie `HelloWorld.js`.

Zmodyfikujmy `connectWallet` do następującej postaci:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Wpisz wiadomość w polu tekstowym powyżej.",
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
              Musisz zainstalować MetaMask, wirtualny portfel Ethereum, w swojej
              przeglądarce.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Więc co dokładnie robi ten gigantyczny blok kodu?

Po pierwsze, sprawdza, czy `window.ethereum` jest włączone w przeglądarce.

`window.ethereum` to globalny interfejs API wstrzykiwany przez MetaMask i innych dostawców portfeli, który pozwala stronom internetowym na żądanie dostępu do kont Ethereum użytkowników. Jeśli zostanie zatwierdzony, może odczytywać dane z blockchainów, z którymi użytkownik jest połączony, i sugerować, aby użytkownik podpisywał wiadomości i transakcje. Sprawdź [dokumentację MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents), aby uzyskać więcej informacji!

Jeśli `window.ethereum` _nie jest_ obecne, oznacza to, że MetaMask nie jest zainstalowany. Powoduje to zwrócenie obiektu JSON, w którym zwrócony `adres` jest pustym ciągiem, a obiekt `status` JSX informuje, że użytkownik musi zainstalować MetaMask.

Teraz, jeśli `window.ethereum` _jest_ obecne, to wtedy robi się ciekawie.

Używając pętli try/catch, spróbujemy połączyć się z MetaMask, wywołując [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Wywołanie tej funkcji otworzy MetaMask w przeglądarce, gdzie użytkownik zostanie poproszony o podłączenie swojego portfela do Twojej dapki.

- Jeśli użytkownik zdecyduje się połączyć, `method: "eth_requestAccounts"` zwróci tablicę zawierającą wszystkie adresy kont użytkownika, które połączyły się z dappką. W sumie nasza funkcja `connectWallet` zwróci obiekt JSON, który zawiera _pierwszy_ `adres` w tej tablicy (patrz linia 9) oraz wiadomość `status`, która prosi użytkownika o napisanie wiadomości do inteligentnego kontraktu.
- Jeśli użytkownik odrzuci połączenie, obiekt JSON będzie zawierał pusty ciąg dla zwróconego `adresu` oraz komunikat `status`, który odzwierciedla, że użytkownik odrzucił połączenie.

Teraz, gdy napisaliśmy tę funkcję `connectWallet`, następnym krokiem jest wywołanie jej w naszym komponencie `HelloWorld.js`.

#### Dodaj funkcję `connectWallet` do swojego komponentu interfejsu użytkownika HelloWorld.js {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Przejdź do funkcji `connectWalletPressed` w `HelloWorld.js` i zaktualizuj ją do następującej postaci:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Zauważ, jak większość naszej funkcjonalności jest abstrahowana od naszego komponentu `HelloWorld.js` z pliku `interact.js`? Robimy tak, aby zachować zgodność z paradygmatem M-V-C!

W `connectWalletPressed` po prostu wykonujemy wywołanie await do naszej zaimportowanej funkcji `connectWallet`, a za pomocą jej odpowiedzi aktualizujemy nasze zmienne `status` i `walletAddress` za pomocą ich hooków stanu.

Teraz zapiszmy oba pliki (`HelloWorld.js` i `interact.js`) i przetestujmy nasz dotychczasowy interfejs użytkownika.

Otwórz przeglądarkę na stronie [http://localhost:3000/](http://localhost:3000/) i naciśnij przycisk „Połącz portfel” w prawym górnym rogu strony.

Jeśli masz zainstalowany MetaMask, powinieneś zostać poproszony o podłączenie swojego portfela do Twojej dapki. Zaakceptuj zaproszenie do połączenia.

Powinieneś zobaczyć, że przycisk portfela odzwierciedla teraz, że Twój adres jest połączony! Jeeee 🔥

Następnie spróbuj odświeżyć stronę... to jest dziwne. Nasz przycisk portfela prosi nas o podłączenie MetaMask, mimo że jest już podłączony...

Jednak nie ma się czego bać! Możemy łatwo to rozwiązać (zaadresować?) implementując `getCurrentWalletConnected`, który sprawdzi, czy adres jest już połączony z naszą dappką i odpowiednio zaktualizuje nasz interfejs użytkownika!

#### Funkcja `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Zaktualizuj swoją funkcję `getCurrentWalletConnected` w pliku `interact.js` do następującej postaci:

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
          status: "👆🏽 Wpisz wiadomość w polu tekstowym powyżej.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Połącz się z MetaMask za pomocą przycisku w prawym górnym rogu.",
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
              Musisz zainstalować MetaMask, wirtualny portfel Ethereum, w swojej
              przeglądarce.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Ten kod jest _bardzo_ podobny do funkcji `connectWallet`, którą właśnie napisaliśmy w poprzednim kroku.

Główna różnica polega na tym, że zamiast wywoływać metodę `eth_requestAccounts`, która otwiera MetaMask, aby użytkownik mógł połączyć swój portfel, tutaj wywołujemy metodę `eth_accounts`, która po prostu zwraca tablicę zawierającą adresy MetaMask aktualnie połączone z naszą dapką.

Aby zobaczyć tę funkcję w działaniu, wywołajmy ją w naszej funkcji `useEffect` naszego komponentu `HelloWorld.js`:

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

Teraz, gdy dodałeś ten kod, spróbujmy odświeżyć okno przeglądarki.

Fajnieee! Przycisk powinien informować, że jesteś połączony i pokazywać podgląd adresu podłączonego portfela - nawet po odświeżeniu!

#### Zaimplementuj `addWalletListener` {#implement-addwalletlistener}

Ostatnim krokiem w konfiguracji portfela naszej dapki jest zaimplementowanie nasłuchiwacza portfela, aby nasz interfejs użytkownika aktualizował się, gdy zmieni się stan naszego portfela, na przykład gdy użytkownik się rozłączy lub zmieni konto.

W pliku `HelloWorld.js` zmodyfikuj swoją funkcję `addWalletListener` w następujący sposób:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Wpisz wiadomość w polu tekstowym powyżej.")
      } else {
        setWallet("")
        setStatus("🦊 Połącz się z MetaMask za pomocą przycisku w prawym górnym rogu.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Musisz zainstalować MetaMask, wirtualny portfel Ethereum, w swojej przeglądarce.
        </a>
      </p>
    )
  }
}
```

Założę się, że w tym momencie nie potrzebujesz nawet naszej pomocy, aby zrozumieć, co się tutaj dzieje, ale dla porządku szybko to omówmy:

- Najpierw nasza funkcja sprawdza, czy `window.ethereum` jest włączone (tj. MetaMask jest zainstalowany).
  - Jeśli nie jest, po prostu ustawiamy naszą zmienną stanu `status` na ciąg JSX, który prosi użytkownika o zainstalowanie MetaMask.
  - Jeśli jest włączone, ustawiamy nasłuchiwacz `window.ethereum.on("accountsChanged")` w linii 3, który nasłuchuje zmian stanu w portfelu MetaMask, co obejmuje sytuacje, gdy użytkownik podłącza dodatkowe konto do dapki, zmienia konta lub odłącza konto. Jeśli co najmniej jedno konto jest połączone, zmienna stanu `walletAddress` jest aktualizowana jako pierwsze konto w tablicy `konta` zwróconej przez nasłuchiwacz. W przeciwnym razie `walletAddress` jest ustawiany jako pusty ciąg.

Na koniec musimy wywołać ją w naszej funkcji `useEffect`:

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

I to wszystko! Pomyślnie ukończyliśmy programowanie całej naszej funkcjonalności portfela! Teraz przejdźmy do naszego ostatniego zadania: aktualizacji wiadomości zapisanej w naszym inteligentnym kontrakcie!

### Krok 6: Zaimplementuj funkcję `updateMessage` {#step-6-implement-the-updateMessage-function}

Dobra, ekipa, dotarliśmy do ostatniej prostej! W `updateMessage` w swoim pliku `interact.js`, zrobimy następujące rzeczy:

1. Upewnij się, że wiadomość, którą chcemy opublikować w naszym inteligentnym kontakcie, jest ważna
2. Podpisz naszą transakcję za pomocą MetaMask
3. Wywołaj tę funkcję z naszego komponentu frontendowego `HelloWorld.js`

To nie potrwa długo; dokończmy tę dappkę!

#### Obsługa błędów wejściowych {#input-error-handling}

Naturalnie, sensowne jest posiadanie jakiejś formy obsługi błędów wejściowych na początku funkcji.

Będziemy chcieli, aby nasza funkcja zakończyła się wcześniej, jeśli nie ma zainstalowanego rozszerzenia MetaMask, nie jest podłączony portfel (tj. przekazany `address` jest pustym ciągiem znaków) lub `message` jest pustym ciągiem znaków. Dodajmy następującą obsługę błędów do `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Połącz swój portfel MetaMask, aby zaktualizować wiadomość na blockchainie.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Twoja wiadomość nie może być pustym ciągiem znaków.",
    }
  }
}
```

Teraz, gdy mamy właściwą obsługę błędów wejściowych, nadszedł czas, aby podpisać transakcję za pomocą MetaMask!

#### Podpisywanie naszej transakcji {#signing-our-transaction}

Jeśli jesteś już zaznajomiony z tradycyjnymi transakcjami Ethereum web3, kod, który napiszemy dalej, będzie bardzo znajomy. Poniżej kodu obsługi błędów wejściowych dodaj następujący kod do `updateMessage`:

```javascript
// interact.js

// ustaw parametry transakcji
const transactionParameters = {
  to: contractAddress, // Wymagane z wyjątkiem publikacji kontraktów.
  from: address, // musi pasować do aktywnego adresu użytkownika.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// podpisz transakcję
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
          Zobacz status swojej transakcji na Etherscan!
        </a>
        <br />
        ℹ️ Gdy transakcja zostanie zweryfikowana przez sieć, wiadomość zostanie
        zaktualizowana automatycznie.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Przeanalizujmy, co się dzieje. Najpierw ustawiamy parametry naszej transakcji, gdzie:

- `to` określa adres odbiorcy (nasz inteligentny kontrakt)
- `from` określa sygnatariusza transakcji, zmienną `address`, którą przekazaliśmy do naszej funkcji
- `data` zawiera wywołanie metody `update` naszego inteligentnego kontraktu Witaj Świecie, otrzymując jako dane wejściowe naszą zmienną ciągu znaków `message`

Następnie wykonujemy wywołanie await, `window.ethereum.request`, w którym prosimy MetaMask o podpisanie transakcji. Zauważ, że w liniach 11 i 12 określamy naszą metodę eth, `eth_sendTransaction` i przekazujemy nasze `transactionParameters`.

W tym momencie w przeglądarce otworzy się MetaMask i poprosi użytkownika o podpisanie lub odrzucenie transakcji.

- Jeśli transakcja się powiedzie, funkcja zwróci obiekt JSON, w którym ciąg JSX `status` prosi użytkownika o sprawdzenie Etherscan w celu uzyskania dalszych informacji o transakcji.
- Jeśli transakcja się nie powiedzie, funkcja zwróci obiekt JSON, w którym ciąg znaków `status` przekaże komunikat o błędzie.

W sumie nasza funkcja `updateMessage` powinna wyglądać tak:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // obsługa błędów wejściowych
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Połącz swój portfel MetaMask, aby zaktualizować wiadomość na blockchainie.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Twoja wiadomość nie może być pustym ciągiem znaków.",
    }
  }

  // ustaw parametry transakcji
  const transactionParameters = {
    to: contractAddress, // Wymagane z wyjątkiem publikacji kontraktów.
    from: address, // musi pasować do aktywnego adresu użytkownika.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // podpisz transakcję
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
            Zobacz status swojej transakcji na Etherscan!
          </a>
          <br />
          ℹ️ Gdy transakcja zostanie zweryfikowana przez sieć, wiadomość zostanie
          zaktualizowana automatycznie.
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

Na koniec musimy połączyć naszą funkcję `updateMessage` z naszym komponentem `HelloWorld.js`.

#### Połącz `updateMessage` z frontendem `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Nasza funkcja `onUpdatePressed` powinna wykonać wywołanie await do zaimportowanej funkcji `updateMessage` i zmodyfikować zmienną stanu `status`, aby odzwierciedlić, czy nasza transakcja się powiodła, czy nie:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

To super czyste i proste. I zgadnij co... TWOJA DAPPKA JEST UKOŃCZONA!!!

Śmiało przetestuj przycisk **Aktualizuj**!

### Stwórz swoją własną dappkę {#make-your-own-custom-dapp}

Hura, dotarłeś do końca samouczka! Podsumowując, nauczyłeś się, jak:

- Podłącz portfel MetaMask do swojego projektu dapp
- Odczytaj dane ze swojego inteligentnego kontraktu za pomocą interfejsu API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Podpisz transakcje Ethereum za pomocą MetaMask

Teraz jesteś w pełni wyposażony, aby zastosować umiejętności z tego samouczka do zbudowania własnego, niestandardowego projektu dapp! Jak zawsze, jeśli masz jakieś pytania, nie wahaj się skontaktować z nami w celu uzyskania pomocy na [Discordzie Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Po ukończeniu tego samouczka daj nam znać, jak Ci poszło lub czy masz jakieś uwagi, oznaczając nas na Twitterze [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
