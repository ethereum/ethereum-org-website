---
title: Biblioteki JavaScript API
description: Wprowadzenie do bibliotek klienta JavaScript, które umożliwiają interakcję z blockchainem z poziomu aplikacji.
lang: pl
---

Aby aplikacja mogła wchodzić w interakcję z blockchainem Ethereum (tj. odczytywać dane blockchainu i/lub wysyłać transakcje do sieci), musi łączyć się z węzłem Ethereum.

W tym celu każdy klient Ethereum implementuje specyfikację JSON-RPC, dzięki czemu istnieje jednolity zestaw punktów końcowych, na których mogą polegać aplikacje.

Jeśli chcesz użyć określonego języka programowania do połączenia z węzłem Ethereum, rozpisz własne rozwiązanie, ale w ekosystemie istnieje kilka wygodnych bibliotek, które znacznie to ułatwiają. Dzięki tym bibliotekom programiści mogą pisać intuicyjne, jednowierszowe metody inicjowania żądań JSON RPC (pod maską), które współdziałają z Ethereum.

## Wymagania wstępne {#prerequisites}

Oprócz zrozumienia JavaScript, pomocne może być zrozumienie [Ethereum stack](/developers/docs/ethereum-stack/) i [klientów Ethereum](/developers/docs/nodes-and-clients/).

## Dlaczego warto użyć biblioteki? {#why-use-a-library}

Biblioteki te eliminują znaczną złożoność interakcji bezpośrednio z węzłem Ethereum. Zapewniają one także użyteczne funkcje (np. konwersję ETH na Gwei), dzięki czemu jako programiści możemy spędzić mniej czasu na zajmowaniu się zawiłościami klientów, a skupić się w głównej mierze na unikalnej funkcji naszej aplikacji.

## Funkcje biblioteki {#library-features}

### Połącz z węzłami Ethereum {#connect-to-ethereum-nodes}

Korzystając z dostawców, biblioteki te pozwalają Ci połączyć się z Ethereum i przeczytać jego dane, niezależnie od tego, czy chodzi o JSON-RPC, INFURA, Etherscan, Alchemy czy MetaMask.

**Przykładowy Ether**

```js
// Web3Provider otacza standardowego dostawcę Web3, którym jest // MetaMask co wstrzykuje jako window.ethereum do każdej strony const provider = nowy ethers.providers.Web3Provider(window.ethereum) // Wtyczka MetaMask umożliwia również podpisywanie transakcji do // wyślij ether i zapłać, aby zmienić stan w łańcuchu bloków.
// W tym celu potrzebujemy podpisującego konto...
const signer = provider.getSigner()
```

**Przykład Web3.py**

```js
var web3 = new Web3("http://localhost:8545") // lub var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")) // zmiana dostawcy web3.setProvider("ws://localhost:8546") // lub web3.setProvider (nowy Web3.providers.WebsocketProvider("ws://localhost:8546")) // Korzystanie z dostawcy IPC w node.js var net = wymagaj("net") var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // ścieżka mac os // lub var web3 = nowy Web3( nowy Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net) ) // ścieżka mac os // w systemie Windows ścieżka to: "\\\\.\\pipe\\geth.ipc" // w Linuksie ścieżka to: "/users/myuser/.ethereum/geth.ipc"
```

Po skonfigurowaniu łańcucha bloków będziesz mógł zapytać o:

- numery bloku
- oszacowanie gazu
- wydarzenia inteligentnych kontraktów
- id sieci
- i więcej...

### Funkcjonalność portfela {#wallet-functionality}

Te biblioteki zapewniają Ci funkcjonalność tworzenia portfeli, zarządzania kluczami i podpisywania transakcji.

Tutaj są przykłady od Ethers

```js
// Utwórz instancję portfela z mnemonika...
mnemonic =
  "zapowiadaj wzór kończyny pomieszczenia w suchej skali wysiłek gładki alkohol jazzowy"
walletMnemonic = Wallet. romMnemonic(mnemonic)

// ...lub z klucza prywatnego
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic. ddress === walletPrivateKey.address
// true

// Adres jako Promise na portfel Signer API
etAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Adres portfela jest również dostępny synchronicznie
walletMnemonic. ddress
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Wewnętrzne składniki kryptograficzne
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic. ublicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// / Portfel mnemonic
walletMnemonic. nemonic
// {
// locale: 'en',
// path: 'm/44\'/60\'/0\'/0/0',
// wyrażenie: 'zapowiadaj pokój wzorzec suchy jednostkowy wysiłek gładki alkohol jazzowy'
// }

// Uwaga: Portfel utworzony kluczem prywatnym nie
// ma mnemonic (zapobiega temu efektowi)
walletPrivateKey. nemonic
// null

// Podpisanie wiadomości
walletMnemonic. ignMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  wartość: utils. arseEther("1.0"),
}

// Podpisanie transakcji
walletMnemonic. ignTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Metoda połączenia zwraca nową instancję
// Wallet połączony z dostawcą
portfel = portfel Mnemonic. onnect(provider)

// Querying the network
wallet.getBalance()
// { Promise: { BigNumber: "42" }
portfela. etTransactionCount()
// { Promise: 0 }

// Sending ether
wallet.sendTransaction(tx)
```

[Przeczytaj pełną dokumentację](https://docs.ethers.io/v5/api/signer/#Wallet)

Po skonfigurowaniu będziesz w stanie:

- utworzyć konto
- wysłać transakcje
- podpisać transakcje
- i więcej...

### Interakcja z funkcjami inteligentnego kontraktu {#interact-with-smart-contract-functions}

Biblioteki klienta JavaScript pozwalają aplikacji na wywołanie funkcji inteligentnych kontraktów poprzez odczyt interfejsu binarnego aplikacji (ABI) skompilowanego kontraktu.

ABI zasadniczo wyjaśnia funkcje kontraktu w formacie JSON i pozwala na używanie go jak zwykłego obiektu JavaScript.

A zatem następujący kontrakt Solidity:

```solidity
kontrakt Test {
    uint a;
    adres d = 0x12345678901234567890123456789012;

    function Test(uint testInt) { a = testInt;}

    zdarzenie (uint indexed b, bytes32 c);

    zdarzenie wydarzenia2 (indeks b, bajty32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        zwrot d;
    }
}
```

Skutkowałby następującym JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt", type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "stałe":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"", type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true, nazwa":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b", type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Oznacza to, że możesz:

- Wysłać transakcję do inteligentnego kontraktu i wykonać jego metodę
- Wezwać do oszacowania gazu, którego wykonanie zostanie przeprowadzone w EVM
- Wdrożyć kontrakt
- I więcej...

### Funkcje użytkowe {#utility-functions}

Funkcje użytkowe dają Ci praktyczne skróty, które sprawiają, że budowanie z Ethereum jest nieco łatwiejsze.

Wartości ETH są domyślnie w Wei. 1 ETH = 1 000 000 000 000 000 WEI – oznacza to, że masz do czynienia z wieloma liczbami! `web3.utils.toWei` konwertuje ether na Wei dla Ciebie.

A w eterach wygląda to tak:

```js
// Uzyskaj saldo konta (przez adres lub nazwę ENS)
saldo = oczekiwanie na dostawcę.getBalance ("ethers. th")
// { BigNumber: "2337132817842795605" }

// często musisz sformatować dane wyjściowe dla użytkownika
// które wolą zobaczyć wartości w eterze (zamiast Wei)
eterach. tils.formatEther(balance)
// '2,337132817842795605'
```

- [Funkcje użytkowe Web3js](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#)
- [Funkcje użytkowe Ethers](https://docs.ethers.io/v5/api/utils/)

## Dostępne biblioteki {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [Dokumentacja](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js —** **_Pełna implementacja portfela Ethereum i narzędzia w JavaScript i TypeScript._**

- [Dokumentacja](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**Wykres -** **_Protokół do indeksowania danych Ethereum i IPFS i zapytania za pomocą GraphQL._**

- [Wykres](https://thegraph.com/)
- [Eksplorator wykresów](https://thegraph.com/explorer/)
- [Dokumentacja](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Wysokopoziomowa reaktywna biblioteka JS zoptymalizowana dla lekkich klientów._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Typescript alternatywny dla Web3.js._**

- [Dokumentacja](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Wrapper wokół Web3.js z automatycznymi ponownymi próbami i ulepszonymi apis._**

- [Dokumentacja](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## Dodatkowo przeczytaj {#further-reading}

_Wiesz o zasobach społecznościowych, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [Ramy rozwojowe](/developers/docs/frameworks/)

## Powiązane samouczki {#related-tutorials}

- [Skonfiguruj Web3js, aby używać blockchain Ethereum w JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrukcje dotyczące konfiguracji web3.js w Twoim projekcie._
- [Wywołanie inteligentnego kontraktu z JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– za pomocą tokena DAI zobacz jak wywołać funkcję kontraktów przy użyciu JavaScript._
- [Wysyłanie transakcji przy użyciu web3 i Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– krok po kroku do wysyłania transakcji z backendu._
