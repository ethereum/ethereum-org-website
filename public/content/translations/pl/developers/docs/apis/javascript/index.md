---
title: Biblioteki API JavaScript
description: Wprowadzenie do bibliotek klienta JavaScript, które umożliwiają interakcję z blockchainem z poziomu aplikacji.
lang: pl
---

Aby aplikacja internetowa mogła wchodzić w interakcję z blockchainem Ethereum (tj. odczytywać dane z blockchaina i/lub wysyłać transakcje do sieci), musi połączyć się z węzłem Ethereum.

W tym celu każdy klient Ethereum implementuje specyfikację [JSON-RPC](/developers/docs/apis/json-rpc/), dzięki czemu istnieje jednolity zestaw [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na których mogą polegać aplikacje.

Jeśli chcesz użyć określonego języka programowania do połączenia z węzłem Ethereum, rozpisz własne rozwiązanie, ale w ekosystemie istnieje kilka wygodnych bibliotek, które znacznie to ułatwiają. Dzięki tym bibliotekom deweloperzy mogą pisać intuicyjne, jednowierszowe metody inicjowania żądań JSON-RPC (pod maską), które wchodzą w interakcję z Ethereum.

Należy pamiętać, że od czasu [The Merge](/roadmap/merge/) do uruchomienia węzła wymagane są dwa połączone elementy oprogramowania Ethereum – klient wykonawczy i klient konsensusu. Upewnij się, że Twój węzeł zawiera zarówno klienta wykonawczego, jak i klienta konsensusu. Jeśli Twój węzeł nie znajduje się na Twoim komputerze lokalnym (np. węzeł działa w instancji AWS), zaktualizuj odpowiednio adresy IP w samouczku. Więcej informacji można znaleźć na naszej stronie o [uruchamianiu węzła](/developers/docs/nodes-and-clients/run-a-node/).

## Wymagania wstępne {#prerequisites}

Oprócz znajomości JavaScript pomocne może być zrozumienie [stosu Ethereum](/developers/docs/ethereum-stack/) i [klientów Ethereum](/developers/docs/nodes-and-clients/).

## Dlaczego warto użyć biblioteki? {#why-use-a-library}

Biblioteki te eliminują znaczną złożoność interakcji bezpośrednio z węzłem Ethereum. Zapewniają one również funkcje pomocnicze (np. przeliczanie ETH na Gwei), dzięki czemu jako programista możesz poświęcić mniej czasu na zmaganie się ze złożonością klientów Ethereum, a więcej na skupieniu się na unikalnej funkcjonalności swojej aplikacji.

## Funkcje biblioteki {#library-features}

### Łączenie z węzłami Ethereum {#connect-to-ethereum-nodes}

Korzystając z dostawców, biblioteki te pozwalają Ci połączyć się z Ethereum i przeczytać jego dane, niezależnie od tego, czy chodzi o JSON-RPC, INFURA, Etherscan, Alchemy czy MetaMask.

> **Ostrzeżenie:** Web3.js został zarchiwizowany 4 marca 2025 roku. [Przeczytaj ogłoszenie](https://blog.chainsafe.io/web3-js-sunset/). Rozważ użycie alternatywnych bibliotek, takich jak [ethers.js](https://ethers.org) lub [viem](https://viem.sh), w nowych projektach.

**Przykład Ethers**

```js
// BrowserProvider opakowuje standardowego dostawcę Web3, którym jest
// to, co MetaMask wstrzykuje jako window.ethereum na każdej stronie
const provider = new ethers.BrowserProvider(window.ethereum)

// Wtyczka MetaMask pozwala również na podpisywanie transakcji w celu
// wysyłania etheru i płacenia za zmianę stanu w blockchainie.
// Do tego potrzebujemy signera konta...
const signer = provider.getSigner()
```

**Przykład Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

Po skonfigurowaniu będziesz mógł wysyłać zapytania do blockchaina o:

- numery bloku
- oszacowanie gazu
- wydarzenia inteligentnych kontraktów
- id sieci
- i nie tylko...

### Funkcjonalność portfela {#wallet-functionality}

Te biblioteki zapewniają Ci funkcjonalność tworzenia portfeli, zarządzania kluczami i podpisywania transakcji.

Oto przykłady od Ethers

```js
// Utwórz instancję portfela z mnemonika...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...lub z klucza prywatnego
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Adres jako Promise zgodnie z interfejsem API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Adres portfela jest również dostępny synchronicznie
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Wewnętrzne komponenty kryptograficzne
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Mnemonik portfela
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Uwaga: Portfel utworzony za pomocą klucza prywatnego nie ma
//       mnemonika (uniemożliwia to derywacja)
walletPrivateKey.mnemonic
// null

// Podpisywanie wiadomości
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Podpisywanie transakcji
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Metoda connect zwraca nową instancję
// portfela połączonego z dostawcą
wallet = walletMnemonic.connect(provider)

// Wysyłanie zapytań do sieci
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Wysyłanie etheru
wallet.sendTransaction(tx)
```

[Przeczytaj pełną dokumentację](https://docs.ethers.io/v5/api/signer/#Wallet)

Po skonfigurowaniu będziesz w stanie:

- utworzyć konto
- wysłać transakcje
- podpisać transakcje
- i nie tylko...

### Interakcja z funkcjami inteligentnych kontraktów {#interact-with-smart-contract-functions}

Biblioteki klienta JavaScript pozwalają aplikacji na wywołanie funkcji inteligentnych kontraktów poprzez odczyt interfejsu binarnego aplikacji (ABI) skompilowanego kontraktu.

ABI zasadniczo wyjaśnia funkcje kontraktu w formacie JSON i pozwala na używanie go jak zwykłego obiektu JavaScript.

A zatem następujący kontrakt Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Skutkowałby następującym plikiem JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Oznacza to, że możesz:

- Wysłać transakcję do inteligentnego kontraktu i wykonać jego metodę
- Wezwać do oszacowania gazu, którego wykonanie zostanie przeprowadzone w EVM
- Wdrożyć kontrakt
- I więcej...

### Funkcje pomocnicze {#utility-functions}

Funkcje użytkowe dają Ci praktyczne skróty, które sprawiają, że budowanie z Ethereum jest nieco łatwiejsze.

Wartości ETH są domyślnie w Wei. 1 ETH = 1.000.000.000.000.000 WEI — oznacza to, że masz do czynienia z wieloma liczbami! `web3.utils.toWei` konwertuje dla Ciebie ether na Wei.

A w Ethers wygląda to tak:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funkcje pomocnicze Web3js](https://docs.web3js.org/api/web3-utils)
- [Funkcje pomocnicze Ethers](https://docs.ethers.org/v6/api/utils/)

## Dostępne biblioteki {#available-libraries}

**Web3.js –** **_interfejs API JavaScript dla Ethereum._**

- [Dokumentacja](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js –** **_Kompletna implementacja portfela Ethereum i narzędzia w językach JavaScript i TypeScript._**

- [Strona główna Ethers.js](https://ethers.org/)
- [Dokumentacja](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph –** **_Protokół do indeksowania danych Ethereum i IPFS oraz wysyłania do nich zapytań za pomocą GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentacja](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK –** **_Nakładka na Ethers.js z rozszerzonymi interfejsami API._**

- [Dokumentacja](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem –** **_Interfejs TypeScript dla Ethereum._**

- [Dokumentacja](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift –** **_Metateka TypeScript z wbudowanym buforowaniem, hakami i makietami testowymi._**

- [Dokumentacja](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [Frameworki deweloperskie](/developers/docs/frameworks/)

## Powiązane samouczki {#related-tutorials}

- [Konfiguracja Web3.js do używania blockchainu Ethereum w JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrukcje dotyczące konfiguracji web3.js w projekcie._
- [Wywoływanie smart kontraktu z poziomu JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Zobacz, jak wywołać funkcje kontraktu za pomocą JavaScriptu, używając tokenu DAI._
- [Wysyłanie transakcji za pomocą web3 i Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Przewodnik krok po kroku dotyczący wysyłania transakcji z zaplecza._
