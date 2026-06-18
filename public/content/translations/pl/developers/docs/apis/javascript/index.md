---
title: Biblioteki API JavaScript
description: "Wprowadzenie do bibliotek klienckich JavaScript, które pozwalają na interakcję z blockchainem z poziomu Twojej aplikacji."
lang: pl
---

Aby aplikacja internetowa mogła wchodzić w interakcję z blockchainem Ethereum (tj. odczytywać dane z blockchaina i/lub wysyłać transakcje do sieci), musi połączyć się z węzłem Ethereum.

W tym celu każdy klient Ethereum implementuje specyfikację [JSON-RPC](/developers/docs/apis/json-rpc/), dzięki czemu istnieje jednolity zestaw [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na których mogą polegać aplikacje.

Jeśli chcesz użyć języka JavaScript do połączenia z węzłem Ethereum, możesz użyć czystego JavaScriptu (vanilla JavaScript), ale w ekosystemie istnieje kilka wygodnych bibliotek, które znacznie to ułatwiają. Dzięki tym bibliotekom programiści mogą pisać intuicyjne, jednowierszowe metody do inicjowania żądań JSON-RPC (wewnętrznie), które wchodzą w interakcję z Ethereum.

Należy pamiętać, że od czasu [The Merge](/roadmap/merge/) do uruchomienia węzła wymagane są dwa połączone elementy oprogramowania Ethereum – klient warstwy wykonawczej i klient konsensusu. Upewnij się, że Twój węzeł zawiera zarówno klienta warstwy wykonawczej, jak i klienta konsensusu. Jeśli Twój węzeł nie znajduje się na komputerze lokalnym (np. działa na instancji AWS), odpowiednio zaktualizuj adresy IP w samouczku. Aby uzyskać więcej influbmacji, odwiedź naszą stronę o [uruchamianiu węzła](/developers/docs/nodes-and-clients/run-a-node/).

## Wymagania wstępne {#prerequisites}

Oprócz znajomości języka JavaScript, pomocne może być zrozumienie [stosu Ethereum](/developers/docs/ethereum-stack/) lubaz [klientów Ethereum](/developers/docs/nodes-and-clients/).

## Dlaczego warto używać biblioteki? {#why-use-a-library}

Te biblioteki ukrywają znaczną część złożoności bezpośredniej interakcji z węzłem Ethereum. Zapewniają również funkcje narzędziowe (np. konwersję ETH na gwei), dzięki czemu jako programista możesz spędzać mniej czasu na radzeniu sobie z zawiłościami klientów Ethereum, a więcej na skupieniu się na unikalnej funkcjonalności swojej aplikacji.

## Funkcje bibliotek {#library-features}

### Łączenie z węzłami Ethereum {#connect-to-ethereum-nodes}

Klubzystając z dostawców (providers), biblioteki te pozwalają na połączenie z Ethereum i odczytywanie jego danych, niezależnie od tego, czy odbywa się to przez JSON-RPC, Infura, Etherscan, Alchemy czy MetaMask.

> **Ostrzeżenie:** Biblioteka Web3.js została zarchiwizowana 4 marca 2025 r. [Przeczytaj ogłoszenie](https://blog.chainsafe.io/web3-js-sunset/). Rozważ użycie alternatywnych bibliotek, takich jak [Ethers.js](https://ethers.org) lub [Viem](https://viem.sh) w nowych projektach.

**Przykład Ethers**

```js
// BrowserProvider opakowuje standardowego dostawcę Web3, którym jest
// to, co MetaMask wstrzykuje jako window.ethereum do każdej strony
const provider = new ethers.BrowserProvider(window.ethereum)

// Wtyczka MetaMask pozwala również na podpisywanie transakcji, aby
// wysyłać ether i płacić za zmianę stanu w blockchain.
// Do tego potrzebujemy obiektu podpisującego konta...
const signer = provider.getSigner()
```

**Przykład Web3.js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// zmień dostawcę
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Używanie dostawcy IPC w node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // ścieżka w mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // ścieżka w mac os
// w systemie windows ścieżka to: "\\\\.\\pipe\\geth.ipc"
// w systemie linux ścieżka to: "/users/myuser/.ethereum/geth.ipc"
```

Po skonfigurowaniu będziesz w stanie odpytywać blockchain o:

- numery bloków
- szacunki gazu
- zdarzenia inteligentnych kontraktów
- identyfikator sieci
- i więcej...

### Funkcjonalność portfela {#wallet-functionality}

Te biblioteki zapewniają funkcjonalność tworzenia portfeli, zarządzania kluczami i podpisywania transakcji.

Oto przykład z Ethers

```js
// Utwórz instancję portfela z mnemonika...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...lub z klucza prywatnego
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Adres jako Promise zgodnie z API Signer
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

// Uwaga: Portfel utworzony za pomocą klucza prywatnego nie
//       posiada mnemonika (zapobiega temu derywacja)
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

// Odpytywanie sieci
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Wysyłanie etheru
wallet.sendTransaction(tx)
```

[Przeczytaj pełną dokumentację](https://docs.ethers.io/v5/api/signer/#Wallet)

Po skonfigurowaniu będziesz w stanie:

- tworzyć konta
- wysyłać transakcje
- podpisywać transakcje
- i więcej...

### Interakcja z funkcjami inteligentnych kontraktów {#interact-with-smart-contract-functions}

Biblioteki klienckie JavaScript pozwalają Twojej aplikacji na wywoływanie funkcji inteligentnych kontraktów poprzez odczytanie binarnego interfejsu aplikacji (ABI) skompilowanego kontraktu.

ABI w zasadzie wyjaśnia funkcje kontraktu w formacie JSON i pozwala na używanie go jak zwykłego obiektu JavaScript.

Zatem następujący kontrakt w języku Solidity:

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

Dałby w wyniku następujący plik JSON:

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
- Wywołać oszacowanie gazu, jakie zajmie wykonanie metody w EVM
- Wdrożyć kontrakt
- I więcej...

### Funkcje narzędziowe {#utility-functions}

Funkcje narzędziowe zapewniają przydatne skróty, które nieco ułatwiają budowanie z Ethereum.

Wartości ETH są domyślnie wyrażane w wei. 1 ETH = 1 000 000 000 000 000 000 wei – oznacza to, że masz do czynienia z wieloma liczbami! `web3.utils.toWei` konwertuje ether na wei za Ciebie.

A w Ethers wygląda to tak:

```js
// Pobierz saldo konta (po adresie lub nazwie ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Często będziesz musiał sformatować dane wyjściowe dla użytkownika,
// który woli widzieć wartości w etherze (zamiast w wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funkcje narzędziowe Web3.js](https://docs.web3js.org/api/web3-utils)
- [Funkcje narzędziowe Ethers](https://docs.ethers.org/v6/api/utils/)

## Dostępne biblioteki {#available-libraries}

**Web3.js -** **_API JavaScript dla Ethereum._**

- [Dokumentacja](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Kompletna implementacja portfela Ethereum i narzędzia w JavaScript i TypeScript._**

- [Strona główna Ethers.js](https://ethers.org/)
- [Dokumentacja](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Protokół do indeksowania danych Ethereum i IPFS oraz odpytywania ich za pomocą GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Dokumentacja](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Wrapper dla Ethers.js z ulepszonymi API._**

- [Dokumentacja](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**Viem -** **_Interfejs TypeScript dla Ethereum._**

- [Dokumentacja](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_Wzbogacone API danych blockchain w czasie rzeczywistym dla dziesiątek łańcuchów._**

- [Dokumentacja](https://docs.codex.io)
- [Eksplorator](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Metabiblioteka TypeScript z wbudowanym buforowaniem, hookami i mockami testowymi._**

- [Dokumentacja](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Węzły i klienty](/developers/docs/nodes-and-clients/)
- [Frameworki programistyczne](/developers/docs/frameworks/)

## Powiązane samouczki {#related-tutorials}

- [Skonfiguruj Web3.js, aby korzystać z blockchaina Ethereum w JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrukcje dotyczące konfiguracji Web3.js w Twoim projekcie._
- [Wywoływanie inteligentnego kontraktu z JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Używając tokena DAI, zobacz, jak wywoływać funkcje kontraktów za pomocą JavaScript._
- [Wysyłanie transakcji za pomocą Web3 i Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Przewodnik krok po kroku dotyczący wysyłania transakcji z backendu._

## Samouczki: API JavaScript i WebSockets na Ethereum {#tutorials}

- [Korzystanie z WebSockets](/developers/tutorials/using-websockets/) _– Jak używać WebSockets z Alchemy, aby subskrybować zdarzenia Ethereum i wykonywać żądania JSON-RPC w czasie rzeczywistym._