---
title: API JSON-RPC
description: Bezstanowy, lekki protokół zdalnego wywołania procedur (RPC) dla klientów Ethereum.
lang: pl
---

Aby aplikacja mogła wchodzić w interakcję z blockchainem [Ethereum](/) – poprzez odczytywanie danych z blockchaina lub wysyłanie transakcji do sieci – musi połączyć się z węzłem Ethereum.

W tym celu każdy [klient Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementuje [specyfikację JSON-RPC](https://github.com/ethereum/execution-apis), dzięki czemu istnieje jednolity zestaw metod, na których aplikacje mogą polegać niezależnie od konkretnego węzła lub implementacji klienta.

[JSON-RPC](https://www.jsonrpc.org/specification) to bezstanowy, lekki protokół zdalnego wywołania procedur (RPC). Definiuje on kilka struktur danych oraz zasady ich przetwarzania. Jest on niezależny od warstwy transportowej, co oznacza, że jego koncepcje mogą być używane w ramach tego samego procesu, przez gniazda (sockets), przez HTTP lub w wielu różnych środowiskach przekazywania wiadomości. Jako format danych wykorzystuje JSON (RFC 4627).

## Implementacje klientów {#client-implementations}

Klienty Ethereum mogą wykorzystywać różne języki programowania podczas implementacji specyfikacji JSON-RPC. Zobacz [dokumentację poszczególnych klientów](/developers/docs/nodes-and-clients/#execution-clients), aby uzyskać więcej szczegółów związanych z konkretnymi językami programowania. Zalecamy sprawdzanie dokumentacji każdego klienta w celu uzyskania najnowszych informacji o obsłudze API.

## Biblioteki pomocnicze {#convenience-libraries}

Chociaż możesz zdecydować się na bezpośrednią interakcję z klientami Ethereum za pośrednictwem API JSON-RPC, często istnieją łatwiejsze opcje dla twórców dappów. Istnieje wiele bibliotek [JavaScript](/developers/docs/apis/javascript/#available-libraries) i [API backendowych](/developers/docs/apis/backend/#available-libraries), które stanowią nakładki na API JSON-RPC. Dzięki tym bibliotekom programiści mogą pisać intuicyjne, jednolinijkowe metody w wybranym przez siebie języku programowania, aby inicjować żądania JSON-RPC (wewnętrznie), które wchodzą w interakcję z Ethereum.

## API klientów konsensusu {#consensus-clients}

Ta strona dotyczy głównie API JSON-RPC używanego przez klienty warstwy wykonawczej Ethereum. Jednakże klienty konsensusu również posiadają API RPC, które pozwala użytkownikom na zapytania o informacje dotyczące węzła, żądanie bloków Beacon, stanu Beacon oraz innych informacji związanych z konsensusem bezpośrednio z węzła. To API jest udokumentowane na [stronie internetowej Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Wewnętrzne API jest również używane do komunikacji między klientami wewnątrz węzła - to znaczy umożliwia klientowi konsensusu i klientowi warstwy wykonawczej wymianę danych. Nazywa się to „Engine API”, a jego specyfikacje są dostępne na [GitHubie](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Specyfikacja klienta warstwy wykonawczej {#spec}

[Przeczytaj pełną specyfikację API JSON-RPC na GitHubie](https://github.com/ethereum/execution-apis). To API jest udokumentowane na [stronie Execution API](https://ethereum.github.io/execution-apis/) i zawiera narzędzie Inspector, które pozwala wypróbować wszystkie dostępne metody.

## Konwencje {#conventions}

### Kodowanie wartości szesnastkowych {#hex-encoding}

Przez JSON przekazywane są dwa kluczowe typy danych: niesformatowane tablice bajtów i wielkości. Oba są przekazywane w kodowaniu szesnastkowym, ale mają różne wymagania dotyczące formatowania.

#### Wielkości {#quantities-encoding}

Podczas kodowania wielkości (liczb całkowitych, liczb): zakoduj jako wartość szesnastkową, dodaj prefiks „0x”, używając najbardziej kompaktowej reprezentacji (drobny wyjątek: zero powinno być reprezentowane jako „0x0”).

Oto kilka przykładów:

- 0x41 (65 w systemie dziesiętnym)
- 0x400 (1024 w systemie dziesiętnym)
- ŹLE: 0x (zawsze powinna być co najmniej jedna cyfra - zero to „0x0”)
- ŹLE: 0x0400 (wiodące zera są niedozwolone)
- ŹLE: ff (musi mieć prefiks 0x)

### Niesformatowane dane {#unformatted-data-encoding}

Podczas kodowania niesformatowanych danych (tablic bajtów, adresów kont, hashów, tablic kodu bajtowego): zakoduj jako wartość szesnastkową, dodaj prefiks „0x”, po dwie cyfry szesnastkowe na bajt.

Oto kilka przykładów:

- 0x41 (rozmiar 1, „A”)
- 0x004200 (rozmiar 3, „0B0”)
- 0x (rozmiar 0, "")
- ŹLE: 0xf0f0f (musi być parzysta liczba cyfr)
- ŹLE: 004200 (musi mieć prefiks 0x)

### Parametr bloku {#block-parameter}

Następujące metody mają parametr bloku:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Gdy wysyłane są żądania odpytujące stan Ethereum, podany parametr bloku określa wysokość bloku.

Dla parametru bloku możliwe są następujące opcje:

- `HEX String` - numer bloku w postaci liczby całkowitej
- `String "earliest"` - dla najwcześniejszego bloku / bloku genezy
- `String "latest"` - dla najnowszego zaproponowanego bloku
- `String "safe"` - dla najnowszego bezpiecznego bloku czołowego
- `String "finalized"` - dla najnowszego sfinalizowanego bloku
- `String "pending"` - dla oczekującego stanu/transakcji

## Przykłady {#examples}

Na tej stronie przedstawiamy przykłady użycia poszczególnych punktów końcowych API JSON_RPC za pomocą narzędzia wiersza poleceń [curl](https://curl.se). Przykłady dla poszczególnych punktów końcowych znajdują się poniżej w sekcji [Przykłady użycia curl](#curl-examples). W dalszej części strony udostępniamy również [kompleksowy przykład](#usage-example) kompilacji i wdrożenia inteligentnego kontraktu przy użyciu węzła Geth, API JSON_RPC oraz narzędzia curl.

## Przykłady użycia curl {#curl-examples}

Poniżej znajdują się przykłady użycia API JSON-RPC poprzez wysyłanie żądań [curl](https://curl.se) do węzła Ethereum. Każdy przykład
zawiera opis konkretnego punktu końcowego, jego parametrów, zwracanego typu oraz praktyczny przykład jego użycia.

Żądania curl mogą zwrócić komunikat o błędzie związany z typem zawartości (content type). Dzieje się tak, ponieważ opcja `--data` ustawia typ zawartości na `application/x-www-form-urlencoded`. Jeśli twój węzeł zgłasza z tego powodu błąd, ustaw nagłówek ręcznie, umieszczając `-H "Content-Type: application/json"` na początku wywołania. Przykłady nie zawierają również kombinacji adresu URL/IP i portu, która musi być ostatnim argumentem przekazanym do curl (np. `127.0.0.1:8545`). Kompletne żądanie curl uwzględniające te dodatkowe dane przyjmuje następującą postać:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, stan, historia {#gossip-state-history}

Garść podstawowych metod JSON-RPC wymaga danych z sieci Ethereum i dzieli się na trzy główne kategorie: _Gossip, stan i historia_. Użyj linków w tych sekcjach, aby przejść do każdej metody, lub skorzystaj ze spisu treści, aby zapoznać się z całą listą metod.

### Metody Gossip {#gossip-methods}

> Te metody śledzą czoło łańcucha. W ten sposób transakcje rozprzestrzeniają się w sieci, trafiają do bloków, a klienty dowiadują się o nowych blokach.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Metody stanu {#state-methods}

> Metody, które raportują obecny stan wszystkich przechowywanych danych. „Stan” jest jak jeden wielki współdzielony fragment pamięci RAM i obejmuje salda kont, dane kontraktów oraz szacunki gazu.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Metody historii {#history-methods}

> Pobierają historyczne rekordy każdego bloku aż do genezy. Przypomina to jeden duży plik, do którego można tylko dopisywać dane (append-only), i obejmuje wszystkie nagłówki bloków, ciała bloków, bloki uncle oraz pokwitowania transakcji.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## Playground API JSON-RPC {#json-rpc-api-playground}

Możesz użyć [narzędzia playground](https://ethereum-json-rpc.com), aby odkrywać i testować metody API. Pokazuje ono również, które metody i sieci są obsługiwane przez różnych dostawców węzłów.

## Metody API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Zwraca aktualną wersję klienta.

**Parametry**

Brak

**Zwraca**

`String` - Aktualna wersja klienta

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Wynik
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Zwraca Keccak-256 (_nie_ ustandaryzowane SHA3-256) dla podanych danych.

**Parametry**

1. `DATA` - Dane do przekonwertowania na hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Zwraca**

`DATA` - Wynik SHA3 dla podanego ciągu znaków.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Wynik
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Zwraca aktualny identyfikator sieci.

**Parametry**

Brak

**Zwraca**

`String` - Aktualny identyfikator sieci.

Pełna lista aktualnych identyfikatorów sieci jest dostępna na stronie [chainlist.org](https://chainlist.org). Niektóre z popularnych to:

- `1`: sieć główna Ethereum
- `11155111`: sieć testowa Sepolia
- `560048` : sieć testowa Hoodi

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Wynik
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Zwraca `true`, jeśli klient aktywnie nasłuchuje połączeń sieciowych.

**Parametry**

Brak

**Zwraca**

`Boolean` - `true` podczas nasłuchiwania, w przeciwnym razie `false`.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Wynik
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Zwraca liczbę peerów aktualnie połączonych z klientem.

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba całkowita określająca liczbę połączonych peerów.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Wynik
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Zwraca aktualną wersję protokołu Ethereum. Należy pamiętać, że ta metoda [nie jest dostępna w Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parametry**

Brak

**Zwraca**

`String` - Aktualna wersja protokołu Ethereum

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Wynik
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Zwraca obiekt z danymi o statusie synchronizacji lub `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Wypróbuj endpoint w piaskownicy
</ButtonLink>

**Parametry**

Brak

**Zwraca**

Dokładne zwracane dane różnią się w zależności od implementacji klienta. Wszystkie klienty zwracają `False`, gdy węzeł się nie synchronizuje, i wszystkie klienty zwracają następujące pola.

`Object|Boolean`, Obiekt z danymi o statusie synchronizacji lub `FALSE`, gdy się nie synchronizuje:

- `startingBlock`: `QUANTITY` - Blok, od którego rozpoczął się import (zostanie zresetowany dopiero po tym, jak synchronizacja osiągnie wierzchołek)
- `currentBlock`: `QUANTITY` - Obecny blok, to samo co eth_blockNumber
- `highestBlock`: `QUANTITY` - Szacowany najwyższy blok

Jednakże poszczególne klienty mogą również dostarczać dodatkowe dane. Na przykład Geth zwraca następujące dane:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Natomiast Besu zwraca:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Więcej szczegółów znajdziesz w dokumentacji swojego konkretnego klienta.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Lub gdy nie ma synchronizacji
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Zwraca adres coinbase klienta.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

> **Uwaga:** Ta metoda została wycofana w wersji **v1.14.0** i nie jest już obsługiwana. Próba użycia tej metody spowoduje błąd „Method not supported”.

**Parametry**

Brak

**Zwraca**

`DATA`, 20 bajtów - aktualny adres coinbase.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Wynik
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Zwraca identyfikator łańcucha używany do podpisywania transakcji chronionych przed atakami typu replay.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`chainId`, wartość szesnastkowa w postaci ciągu znaków reprezentująca liczbę całkowitą aktualnego identyfikatora łańcucha.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Wynik
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Zwraca `true`, jeśli klient aktywnie kopie nowe bloki. Może to zwrócić `true` tylko dla sieci opartych na dowodzie pracy (PoW) i może nie być dostępne w niektórych klientach od czasu [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Wypróbuj punkt końcowy w piaskownicy
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`Boolean` - zwraca `true`, jeśli klient kopie, w przeciwnym razie `false`.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Zwraca liczbę hashy na sekundę, z jaką kopie węzeł. Może to zwrócić `true` tylko dla sieci opartych na dowodzie pracy i może nie być dostępne w niektórych klientach od czasu [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba hashy na sekundę.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Wynik
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Zwraca szacunkową obecną cenę za gaz w wei. Na przykład klient Besu domyślnie bada ostatnie 100 bloków i zwraca medianę ceny jednostki gazu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba całkowita określająca obecną cenę gazu w wei.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Wynik
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Zwraca listę adresów należących do klienta.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Wypróbuj endpoint w piaskownicy
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`Array of DATA`, 20 bajtów - adresy należące do klienta.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Zwraca numer najnowszego bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba całkowita oznaczająca numer bieżącego bloku, na którym znajduje się klient.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Wynik
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Zwraca saldo konta pod danym adresem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Wypróbuj punkt końcowy w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres, którego saldo ma zostać sprawdzone.
2. `QUANTITY|TAG` - liczba całkowita określająca numer bloku lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Zwraca**

`QUANTITY` - liczba całkowita określająca obecne saldo w wei.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Zwraca wartość z pozycji pamięci pod danym adresem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres pamięci.
2. `QUANTITY` - liczba całkowita określająca pozycję w pamięci.
3. `QUANTITY|TAG` - liczba całkowita określająca numer bloku lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Zwraca**

`DATA` - wartość na tej pozycji w pamięci.

**Przykład**
Obliczenie prawidłowej pozycji zależy od pamięci, którą chcemy pobrać. Rozważmy następujący kontrakt wdrożony pod adresem `0x295a70b2de5e3953354a6a8344e616ed314d7251` przez adres `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Pobranie wartości pos0 jest proste:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Pobranie elementu z mapy jest trudniejsze. Pozycja elementu w mapie jest obliczana za pomocą:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Oznacza to, że aby pobrać pamięć dla pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"], musimy obliczyć pozycję za pomocą:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Konsola Geth, która jest dostarczana z biblioteką Web3, może zostać użyta do wykonania tego obliczenia:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Teraz, aby pobrać pamięć:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

Zwraca liczbę transakcji _wysłanych_ z danego adresu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres.
2. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // stan w najnowszym bloku
]
```

**Zwraca**

`QUANTITY` - liczba całkowita określająca liczbę transakcji wysłanych z tego adresu.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Zwraca liczbę transakcji w bloku pasującym do podanego hasha bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hash bloku

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Zwraca**

`QUANTITY` - liczba całkowita określająca liczbę transakcji w tym bloku.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Zwraca liczbę transakcji w bloku pasującym do podanego numeru bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Wypróbuj punkt końcowy w środowisku testowym
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - liczba całkowita będąca numerem bloku lub ciąg znaków `"earliest"`, `"latest"`, `"pending"`, `"safe"` lub `"finalized"`, zgodnie z [parametrem bloku](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Zwraca**

`QUANTITY` - liczba całkowita określająca liczbę transakcji w tym bloku.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Zwraca liczbę wujków w bloku na podstawie podanego hasha bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty – hash bloku

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Zwraca**

`QUANTITY` – liczba całkowita reprezentująca liczbę wujków w tym bloku.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Zwraca liczbę wujków w bloku pasującym do podanego numeru bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - liczba całkowita będąca numerem bloku lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Zwraca**

`QUANTITY` - liczba całkowita określająca liczbę wujków w tym bloku.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Zwraca kod pod danym adresem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres
2. `QUANTITY|TAG` - całkowity numer bloku lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Zwraca**

`DATA` - kod z podanego adresu.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

Metoda sign oblicza specyficzny dla Ethereum podpis za pomocą: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Dodanie prefiksu do wiadomości sprawia, że obliczony podpis jest rozpoznawalny jako specyficzny dla Ethereum. Zapobiega to nadużyciom, w których złośliwa zdecentralizowana aplikacja (dapp) może podpisać dowolne dane (np. transakcję) i użyć podpisu do podszycia się pod ofiarę.

Uwaga: adres, za pomocą którego ma zostać złożony podpis, musi być odblokowany.

**Parametry**

1. `DATA`, 20 bajtów - adres
2. `DATA`, N bajtów - wiadomość do podpisania

**Zwraca**

`DATA`: Podpis

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Podpisuje transakcję, która może zostać przesłana do sieci w późniejszym czasie za pomocą [eth_sendRawTransaction](#eth-sendrawtransaction).

**Parametry**

1. `Object` - Obiekt transakcji

- `type`:
- `from`: `DATA`, 20 bajtów - Adres, z którego wysyłana jest transakcja.
- `to`: `DATA`, 20 bajtów - (opcjonalne przy tworzeniu nowego kontraktu) Adres, do którego skierowana jest transakcja.
- `gas`: `QUANTITY` - (opcjonalne, domyślnie: 90000) Liczba całkowita określająca gaz dostarczony do wykonania transakcji. Zwróci niewykorzystany gaz.
- `gasPrice`: `QUANTITY` - (opcjonalne, domyślnie: do ustalenia) Liczba całkowita określająca gasPrice użyty dla każdej opłaconej jednostki gazu, w wei.
- `value`: `QUANTITY` - (opcjonalne) Liczba całkowita określająca wartość wysłaną z tą transakcją, w wei.
- `data`: `DATA` - Skompilowany kod kontraktu LUB hash podpisu wywoływanej metody i zakodowanych parametrów.
- `nonce`: `QUANTITY` - (opcjonalne) Liczba całkowita określająca nonce. Pozwala to na nadpisanie własnych oczekujących transakcji, które używają tego samego nonce.

**Zwraca**

`DATA`, Zakodowany w RLP obiekt transakcji podpisany przez określone konto.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Wynik
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Tworzy nową transakcję wywołania wiadomości lub utworzenia kontraktu, jeśli pole danych zawiera kod, i podpisuje ją za pomocą konta określonego w `from`.

**Parametry**

1. `Object` - Obiekt transakcji

- `from`: `DATA`, 20 bajtów - Adres, z którego wysyłana jest transakcja.
- `to`: `DATA`, 20 bajtów - (opcjonalne przy tworzeniu nowego kontraktu) Adres, do którego skierowana jest transakcja.
- `gas`: `QUANTITY` - (opcjonalne, domyślnie: 90000) Liczba całkowita określająca gaz dostarczony do wykonania transakcji. Niewykorzystany gaz zostanie zwrócony.
- `gasPrice`: `QUANTITY` - (opcjonalne, domyślnie: do ustalenia) Liczba całkowita określająca cenę gazu (gasPrice) używaną dla każdej opłaconej jednostki gazu.
- `value`: `QUANTITY` - (opcjonalne) Liczba całkowita określająca wartość wysłaną wraz z tą transakcją.
- `input`: `DATA` - Skompilowany kod kontraktu LUB hash podpisu wywoływanej metody i zakodowanych parametrów.
- `nonce`: `QUANTITY` - (opcjonalne) Liczba całkowita określająca nonce. Pozwala to na nadpisanie własnych oczekujących transakcji, które używają tego samego nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Zwraca**

`DATA`, 32 bajty - hash transakcji lub zerowy hash, jeśli transakcja nie jest jeszcze dostępna.

Użyj [eth_getTransactionReceipt](#eth-gettransactionreceipt), aby uzyskać adres kontraktu po tym, jak transakcja została zaproponowana w bloku, w przypadku utworzenia kontraktu.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Tworzy nową transakcję wywołania wiadomości lub transakcję utworzenia kontraktu dla podpisanych transakcji.

**Parametry**

1. `DATA`, Podpisane dane transakcji.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Zwraca**

`DATA`, 32 bajty - hash transakcji, lub zerowy hash, jeśli transakcja nie jest jeszcze dostępna.

Użyj [eth_getTransactionReceipt](#eth-gettransactionreceipt), aby uzyskać adres kontraktu po tym, jak transakcja została zaproponowana w bloku, jeśli utworzyłeś kontrakt.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Wykonuje nowe wywołanie wiadomości natychmiast, bez tworzenia transakcji na blockchainie. Często używane do wykonywania funkcji inteligentnych kontraktów tylko do odczytu, na przykład `balanceOf` dla kontraktu ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Wypróbuj punkt końcowy w środowisku testowym
</ButtonLink>

**Parametry**

1. `Object` - Obiekt wywołania transakcji

- `from`: `DATA`, 20 bajtów - (opcjonalnie) Adres, z którego wysyłana jest transakcja.
- `to`: `DATA`, 20 bajtów - Adres, do którego kierowana jest transakcja.
- `gas`: `QUANTITY` - (opcjonalnie) Liczba całkowita określająca gaz dostarczony do wykonania transakcji. eth_call zużywa zero gazu, ale ten parametr może być wymagany przez niektóre wykonania.
- `gasPrice`: `QUANTITY` - (opcjonalnie) Liczba całkowita określająca cenę gazu używaną dla każdej opłaconej jednostki gazu
- `value`: `QUANTITY` - (opcjonalnie) Liczba całkowita określająca wartość wysłaną z tą transakcją
- `input`: `DATA` - (opcjonalnie) Hash podpisu metody i zakodowanych parametrów. Szczegółowe informacje można znaleźć w [ABI kontraktu Ethereum w dokumentacji Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - liczba całkowita określająca numer bloku lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Zwraca**

`DATA` - wartość zwracana przez wykonany kontrakt.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Generuje i zwraca szacunkową ilość gazu niezbędną do zakończenia transakcji. Transakcja nie zostanie dodana do blockchaina. Należy pamiętać, że szacunkowa wartość może być znacznie wyższa niż ilość gazu faktycznie zużyta przez transakcję z różnych powodów, w tym ze względu na mechanikę EVM i wydajność węzła.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Wypróbuj punkt końcowy w środowisku testowym
</ButtonLink>

**Parametry**

Zobacz parametry [eth_call](#eth-call), z tą różnicą, że wszystkie właściwości są opcjonalne. Jeśli nie określono limitu gazu, Geth używa limitu gazu z oczekującego bloku jako górnej granicy. W rezultacie zwrócona szacunkowa wartość może nie wystarczyć do wykonania wywołania/transakcji, gdy ilość gazu jest wyższa niż limit gazu oczekującego bloku.

**Zwraca**

`QUANTITY` - ilość zużytego gazu.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Zwraca informacje o bloku na podstawie jego hasha.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - Hash bloku.
2. `Boolean` - Jeśli `true`, zwraca pełne obiekty transakcji, jeśli `false`, tylko hashe transakcji.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Zwraca**

`Object` - Obiekt bloku lub `null`, gdy nie znaleziono bloku:

- `number`: `QUANTITY` - numer bloku. `null`, gdy jest to blok oczekujący.
- `hash`: `DATA`, 32 bajty - hash bloku. `null`, gdy jest to blok oczekujący.
- `parentHash`: `DATA`, 32 bajty - hash bloku nadrzędnego.
- `nonce`: `DATA`, 8 bajtów - hash wygenerowanego dowodu pracy (PoW). `null`, gdy jest to blok oczekujący, `0x0` dla bloków dowodu stawki (PoS) (od czasu The Merge).
- `sha3Uncles`: `DATA`, 32 bajty - SHA3 danych uncles w bloku.
- `logsBloom`: `DATA`, 256 bajtów - filtr Blooma dla logów bloku. `null`, gdy jest to blok oczekujący.
- `transactionsRoot`: `DATA`, 32 bajty - korzeń drzewa transakcji bloku.
- `stateRoot`: `DATA`, 32 bajty - korzeń końcowego drzewa stanu bloku.
- `receiptsRoot`: `DATA`, 32 bajty - korzeń drzewa pokwitowań bloku.
- `miner`: `DATA`, 20 bajtów - adres beneficjenta, któremu przyznano nagrody za blok.
- `difficulty`: `QUANTITY` - liczba całkowita określająca trudność tego bloku.
- `totalDifficulty`: `QUANTITY` - liczba całkowita określająca całkowitą trudność łańcucha do tego bloku.
- `extraData`: `DATA` - pole "extra data" tego bloku.
- `size`: `QUANTITY` - liczba całkowita określająca rozmiar tego bloku w bajtach.
- `gasLimit`: `QUANTITY` - maksymalna ilość gazu dozwolona w tym bloku.
- `gasUsed`: `QUANTITY` - całkowita ilość gazu zużyta przez wszystkie transakcje w tym bloku.
- `timestamp`: `QUANTITY` - znacznik czasu Unix (timestamp) momentu zestawienia bloku.
- `transactions`: `Array` - tablica obiektów transakcji lub 32-bajtowe hashe transakcji, w zależności od ostatniego podanego parametru.
- `uncles`: `Array` - tablica hashy uncles.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Wynik
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth-getblockbynumber}

Zwraca informacje o bloku na podstawie jego numeru.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - liczba całkowita będąca numerem bloku lub ciąg znaków `"earliest"`, `"latest"`, `"pending"`, `"safe"` lub `"finalized"`, zgodnie z [parametrem bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Jeśli `true`, zwraca pełne obiekty transakcji, jeśli `false`, tylko hashe transakcji.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Zwraca**
Zobacz [eth_getBlockByHash](#eth-getblockbyhash)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Wynik: zobacz [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Zwraca informacje o transakcji na podstawie żądanego hasha transakcji.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hash transakcji

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Zwraca**

`Object` - Obiekt transakcji lub `null`, gdy nie znaleziono transakcji:

- `blockHash`: `DATA`, 32 bajty - hash bloku, w którym znajdowała się ta transakcja. `null`, gdy jest oczekująca.
- `blockNumber`: `QUANTITY` - numer bloku, w którym znajdowała się ta transakcja. `null`, gdy jest oczekująca.
- `from`: `DATA`, 20 bajtów - adres nadawcy.
- `gas`: `QUANTITY` - gaz dostarczony przez nadawcę.
- `gasPrice`: `QUANTITY` - cena gazu dostarczona przez nadawcę w wei.
- `hash`: `DATA`, 32 bajty - hash transakcji.
- `input`: `DATA` - dane wysłane wraz z transakcją.
- `nonce`: `QUANTITY` - liczba transakcji wykonanych przez nadawcę przed tą transakcją.
- `to`: `DATA`, 20 bajtów - adres odbiorcy. `null`, gdy jest to transakcja utworzenia kontraktu.
- `transactionIndex`: `QUANTITY` - liczba całkowita określająca pozycję indeksu transakcji w bloku. `null`, gdy jest oczekująca.
- `value`: `QUANTITY` - przesłana wartość w wei.
- `v`: `QUANTITY` - identyfikator odzyskiwania ECDSA
- `r`: `QUANTITY` - podpis ECDSA r
- `s`: `QUANTITY` - podpis ECDSA s

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Wynik
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

Zwraca informacje o transakcji na podstawie hasha bloku i pozycji indeksu transakcji.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hash bloku.
2. `QUANTITY` - liczba całkowita określająca pozycję indeksu transakcji.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Zwraca**
Zobacz [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Wynik: zobacz [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Zwraca informacje o transakcji na podstawie numeru bloku i pozycji indeksu transakcji.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - numer bloku lub ciąg znaków `"earliest"`, `"latest"`, `"pending"`, `"safe"` lub `"finalized"`, tak jak w [parametrze bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - pozycja indeksu transakcji.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Zwraca**
Zobacz [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Wynik zobacz w [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Zwraca pokwitowanie transakcji na podstawie hasha transakcji.

**Uwaga** Pokwitowanie nie jest dostępne dla oczekujących transakcji.

**Parametry**

1. `DATA`, 32 bajty - hash transakcji

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Zwraca**
`Object` - Obiekt pokwitowania transakcji lub `null`, gdy nie znaleziono pokwitowania:

- `transactionHash `: `DATA`, 32 bajty - hash transakcji.
- `transactionIndex`: `QUANTITY` - liczba całkowita określająca pozycję indeksu transakcji w bloku.
- `blockHash`: `DATA`, 32 bajty - hash bloku, w którym znajdowała się ta transakcja.
- `blockNumber`: `QUANTITY` - numer bloku, w którym znajdowała się ta transakcja.
- `from`: `DATA`, 20 bajtów - adres nadawcy.
- `to`: `DATA`, 20 bajtów - adres odbiorcy. null, gdy jest to transakcja utworzenia kontraktu.
- `cumulativeGasUsed` : `QUANTITY ` - Całkowita ilość gazu zużyta podczas wykonywania tej transakcji w bloku.
- `effectiveGasPrice` : `QUANTITY` - Suma opłaty podstawowej i opłaty priorytetowej zapłaconej za jednostkę gazu.
- `gasUsed `: `QUANTITY ` - Ilość gazu zużyta wyłącznie przez tę konkretną transakcję.
- `contractAddress `: `DATA`, 20 bajtów - Adres utworzonego kontraktu, jeśli transakcja była transakcją utworzenia kontraktu, w przeciwnym razie `null`.
- `logs`: `Array` - Tablica obiektów logów, które wygenerowała ta transakcja.
- `logsBloom`: `DATA`, 256 bajtów - Filtr Blooma dla lekkich klientów do szybkiego pobierania powiązanych logów.
- `type`: `QUANTITY` - liczba całkowita określająca typ transakcji, `0x0` dla starszych transakcji (legacy), `0x1` dla typów z listą dostępu (access list), `0x2` dla opłat dynamicznych.

Zwraca również _jedno z poniższych_:

- `root` : `DATA` 32 bajty korzenia stanu po transakcji (przed aktualizacją Bizancjum)
- `status`: `QUANTITY` albo `1` (sukces), albo `0` (niepowodzenie)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Wynik
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // ciąg znaków adresu, jeśli został utworzony
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logi zwracane przez getFilterLogs itp.
    }],
    "logsBloom": "0x00...0", // 256-bajtowy filtr Blooma
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

Zwraca informacje o wujku bloku na podstawie hasha i pozycji indeksu wujka.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Wypróbuj punkt końcowy w środowisku testowym
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty – hash bloku.
2. `QUANTITY` – pozycja indeksu wujka.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Zwraca**
Zobacz [eth_getBlockByHash](#eth-getblockbyhash)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Wynik, zobacz [eth_getBlockByHash](#eth-getblockbyhash)

**Uwaga**: Wujek nie zawiera pojedynczych transakcji.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Zwraca informacje o wujku bloku na podstawie numeru bloku i pozycji indeksu wujka.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Wypróbuj endpoint w środowisku testowym
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - numer bloku lub ciąg znaków `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, tak jak w [parametrze bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - pozycja indeksu wujka.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Zwraca**
Zobacz [eth_getBlockByHash](#eth-getblockbyhash)

**Uwaga**: Wujek nie zawiera pojedynczych transakcji.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Wynik, zobacz [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Tworzy obiekt filtra na podstawie opcji filtrowania, aby powiadamiać o zmianach stanu (logach).
Aby sprawdzić, czy stan uległ zmianie, wywołaj [eth_getFilterChanges](#eth-getfilterchanges).

**Uwaga dotycząca określania filtrów tematów:**
Tematy są zależne od kolejności. Transakcja z logiem zawierającym tematy [A, B] zostanie dopasowana przez następujące filtry tematów:

- `[]` "cokolwiek"
- `[A]` "A na pierwszej pozycji (i cokolwiek po nim)"
- `[null, B]` "cokolwiek na pierwszej pozycji ORAZ B na drugiej pozycji (i cokolwiek po nim)"
- `[A, B]` "A na pierwszej pozycji ORAZ B na drugiej pozycji (i cokolwiek po nim)"
- `[[A, B], [A, B]]` "(A LUB B) na pierwszej pozycji ORAZ (A LUB B) na drugiej pozycji (i cokolwiek po nim)"
- **Parametry**

1. `Object` - Opcje filtra:

- `fromBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Całkowity numer bloku, lub `"latest"` dla ostatniego zaproponowanego bloku, `"safe"` dla najnowszego bezpiecznego bloku, `"finalized"` dla najnowszego sfinalizowanego bloku, lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `toBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Całkowity numer bloku, lub `"latest"` dla ostatniego zaproponowanego bloku, `"safe"` dla najnowszego bezpiecznego bloku, `"finalized"` dla najnowszego sfinalizowanego bloku, lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `address`: `DATA|Array`, 20 bajtów - (opcjonalnie) Adres kontraktu lub lista adresów, z których powinny pochodzić logi.
- `topics`: `Array of DATA`, - (opcjonalnie) Tablica 32-bajtowych tematów `DATA`. Tematy są zależne od kolejności. Każdy temat może być również tablicą DATA z opcjami „lub”.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Zwraca**
`QUANTITY` - Identyfikator filtra.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Tworzy filtr w węźle, aby powiadamiać o nadejściu nowego bloku.
Aby sprawdzić, czy stan uległ zmianie, wywołaj [eth_getFilterChanges](#eth-getfilterchanges).

**Parametry**
Brak

**Zwraca**
`QUANTITY` - Identyfikator filtra.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Wynik
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Tworzy filtr w węźle, aby powiadamiać o nadejściu nowych oczekujących transakcji.
Aby sprawdzić, czy stan uległ zmianie, wywołaj [eth_getFilterChanges](#eth-getfilterchanges).

**Parametry**
Brak

**Zwraca**
`QUANTITY` - Identyfikator filtru.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Wynik
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Odinstalowuje filtr o podanym identyfikatorze. Należy zawsze wywoływać tę metodę, gdy obserwowanie nie jest już potrzebne.
Dodatkowo filtry wygasają, gdy nie są odpytywane za pomocą [eth_getFilterChanges](#eth-getfilterchanges) przez pewien czas.

**Parametry**

1. `QUANTITY` - Identyfikator filtra.

```js
params: [
  "0xb", // 11
]
```

**Zwraca**
`Boolean` - `true`, jeśli filtr został pomyślnie odinstalowany, w przeciwnym razie `false`.

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Wynik
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Metoda odpytywania dla filtru, która zwraca tablicę logów, które wystąpiły od ostatniego odpytania.

**Parametry**

1. `QUANTITY` - identyfikator filtru.

```js
params: [
  "0x16", // 22
]
```

**Zwraca**
`Array` - Tablica obiektów logów lub pusta tablica, jeśli nic się nie zmieniło od ostatniego odpytania.

- Dla filtrów utworzonych za pomocą `eth_newBlockFilter` zwracane są hashe bloków (`DATA`, 32 bajty), np. `["0x3454645634534..."]`.
- Dla filtrów utworzonych za pomocą `eth_newPendingTransactionFilter ` zwracane są hashe transakcji (`DATA`, 32 bajty), np. `["0x6345343454645..."]`.
- Dla filtrów utworzonych za pomocą `eth_newFilter` logi są obiektami o następujących parametrach:
  - `removed`: `TAG` - `true`, gdy log został usunięty z powodu reorganizacji łańcucha. `false`, jeśli jest to prawidłowy log.
  - `logIndex`: `QUANTITY` - liczba całkowita określająca pozycję indeksu logu w bloku. `null`, gdy jest to log oczekujący.
  - `transactionIndex`: `QUANTITY` - liczba całkowita określająca pozycję indeksu transakcji, z której utworzono log. `null`, gdy jest to log oczekujący.
  - `transactionHash`: `DATA`, 32 bajty - hash transakcji, z której utworzono ten log. `null`, gdy jest to log oczekujący.
  - `blockHash`: `DATA`, 32 bajty - hash bloku, w którym znajdował się ten log. `null`, gdy jest oczekujący. `null`, gdy jest to log oczekujący.
  - `blockNumber`: `QUANTITY` - numer bloku, w którym znajdował się ten log. `null`, gdy jest oczekujący. `null`, gdy jest to log oczekujący.
  - `address`: `DATA`, 20 bajtów - adres, z którego pochodzi ten log.
  - `data`: `DATA` - nieindeksowane dane logu o zmiennej długości. (W języku _Solidity_: zero lub więcej 32-bajtowych nieindeksowanych argumentów logu.)
  - `topics`: `Array of DATA` - Tablica od 0 do 4 32-bajtowych `DATA` indeksowanych argumentów logu. (W języku _Solidity_: Pierwszy temat to _hash_ podpisu zdarzenia (np. `Deposit(address,bytes32,uint256)`), chyba że zdarzenie zostało zadeklarowane ze specyfikatorem `anonymous`.)

- **Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Wynik
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth-getfilterlogs}

Zwraca tablicę wszystkich logów pasujących do filtra o podanym identyfikatorze.

**Parametry**

1. `QUANTITY` - Identyfikator filtra.

```js
params: [
  "0x16", // 22
]
```

**Zwraca**
Zobacz [eth_getFilterChanges](#eth-getfilterchanges)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Wynik: zobacz [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Zwraca tablicę wszystkich logów pasujących do podanego obiektu filtru.

**Parametry**

1. `Object` - Opcje filtru:

- `fromBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Numer bloku jako liczba całkowita, lub `"latest"` dla ostatniego zaproponowanego bloku, `"safe"` dla najnowszego bezpiecznego bloku, `"finalized"` dla najnowszego sfinalizowanego bloku, lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `toBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Numer bloku jako liczba całkowita, lub `"latest"` dla ostatniego zaproponowanego bloku, `"safe"` dla najnowszego bezpiecznego bloku, `"finalized"` dla najnowszego sfinalizowanego bloku, lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `address`: `DATA|Array`, 20 bajtów - (opcjonalnie) Adres kontraktu lub lista adresów, z których powinny pochodzić logi.
- `topics`: `Array of DATA`, - (opcjonalnie) Tablica 32-bajtowych tematów `DATA`. Tematy zależą od kolejności. Każdy temat może być również tablicą DANYCH z opcjami „lub”.
- `blockHash`: `DATA`, 32 bajty - (opcjonalnie, **w przyszłości**) Wraz z dodaniem EIP-234, `blockHash` będzie nową opcją filtru, która ogranicza zwracane logi do pojedynczego bloku o 32-bajtowym hashu `blockHash`. Użycie `blockHash` jest równoznaczne z `fromBlock` = `toBlock` = numer bloku z hashem `blockHash`. Jeśli `blockHash` jest obecny w kryteriach filtru, to ani `fromBlock`, ani `toBlock` nie są dozwolone.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Zwraca**
Zobacz [eth_getFilterChanges](#eth-getfilterchanges)

**Przykład**

```js
// Żądanie
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Wynik zobacz w [eth_getFilterChanges](#eth-getfilterchanges)

## Przykład użycia {#usage-example}

### Wdrażanie kontraktu za pomocą JSON_RPC {#deploying-contract}

Ta sekcja zawiera demonstrację, jak wdrożyć kontrakt używając tylko interfejsu RPC. Istnieją alternatywne sposoby wdrażania kontraktów, w których ta złożoność jest ukryta — na przykład przy użyciu bibliotek zbudowanych na interfejsie RPC, takich jak [Web3.js](https://web3js.readthedocs.io/) i [Web3.py](https://github.com/ethereum/web3.py). Te abstrakcje są na ogół łatwiejsze do zrozumienia i mniej podatne na błędy, ale nadal warto wiedzieć, jak to działa od podszewki.

Poniżej znajduje się prosty inteligentny kontrakt o nazwie `Multiply7`, który zostanie wdrożony za pomocą interfejsu JSON-RPC w węźle Ethereum. Ten samouczek zakłada, że czytelnik ma już uruchomiony węzeł Geth. Więcej informacji o węzłach i klientach jest dostępnych [tutaj](/developers/docs/nodes-and-clients/run-a-node). Zapoznaj się z dokumentacją poszczególnych [klientów](/developers/docs/nodes-and-clients/), aby dowiedzieć się, jak uruchomić HTTP JSON-RPC dla klientów innych niż Geth. Większość klientów domyślnie nasłuchuje na `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Pierwszą rzeczą, którą należy zrobić, jest upewnienie się, że interfejs HTTP RPC jest włączony. Oznacza to, że podczas uruchamiania przekazujemy do Geth flagę `--http`. W tym przykładzie używamy węzła Geth w prywatnym łańcuchu deweloperskim. Dzięki takiemu podejściu nie potrzebujemy etheru w prawdziwej sieci.

```bash
geth --http --dev console 2>>geth.log
```

Spowoduje to uruchomienie interfejsu HTTP RPC na `http://localhost:8545`.

Możemy sprawdzić, czy interfejs działa, pobierając adres Coinbase (uzyskując pierwszy adres z tablicy kont) i saldo za pomocą [curl](https://curl.se). Należy pamiętać, że dane w tych przykładach będą się różnić w Twoim lokalnym węźle. Jeśli chcesz wypróbować te polecenia, zastąp parametry żądania w drugim wywołaniu curl wynikiem zwróconym z pierwszego.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Ponieważ liczby są zakodowane szesnastkowo, saldo jest zwracane w wei jako ciąg szesnastkowy. Jeśli chcemy uzyskać saldo w etherze jako liczbę, możemy użyć web3 z konsoli Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Teraz, gdy na naszym prywatnym łańcuchu deweloperskim znajduje się trochę etheru, możemy wdrożyć kontrakt. Pierwszym krokiem jest kompilacja kontraktu Multiply7 do kodu bajtowego, który może zostać wysłany do EVM. Aby zainstalować solc, kompilator Solidity, postępuj zgodnie z [dokumentacją Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Możesz chcieć użyć starszej wersji `solc`, aby dopasować ją do [wersji kompilatora użytej w naszym przykładzie](https://github.com/ethereum/solidity/releases/tag/v0.4.20)).

Kolejnym krokiem jest kompilacja kontraktu Multiply7 do kodu bajtowego, który może zostać wysłany do EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Teraz, gdy mamy skompilowany kod, musimy ustalić, ile gazu będzie kosztować jego wdrożenie. Interfejs RPC posiada metodę `eth_estimateGas`, która poda nam szacunkową wartość.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

I wreszcie wdrożyć kontrakt.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Transakcja zostaje zaakceptowana przez węzeł i zwracany jest hash transakcji. Ten hash może posłużyć do śledzenia transakcji. Kolejnym krokiem jest określenie adresu, pod którym wdrożono nasz kontrakt. Każda wykonana transakcja utworzy pokwitowanie. To pokwitowanie zawiera różne informacje o transakcji, takie jak to, w którym bloku transakcja została zawarta i ile gazu zużyła maszyna EVM. Jeśli transakcja
tworzy kontrakt, będzie również zawierać adres kontraktu. Możemy pobrać pokwitowanie za pomocą metody RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Nasz kontrakt został utworzony pod adresem `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Wynik null zamiast pokwitowania oznacza, że transakcja nie została jeszcze włączona do bloku. Poczekaj chwilę, sprawdź, czy Twój klient konsensusu jest uruchomiony i spróbuj ponownie.

#### Interakcja z inteligentnymi kontraktami {#interacting-with-smart-contract}

W tym przykładzie wyślemy transakcję za pomocą `eth_sendTransaction` do metody `multiply` kontraktu.

`eth_sendTransaction` wymaga kilku argumentów, w szczególności `from`, `to` i `data`. `From` to publiczny adres naszego konta, a `to` to adres kontraktu. Argument `data` zawiera ładunek (payload), który określa, jaka metoda ma zostać wywołana i z jakimi argumentami. W tym miejscu do gry wkracza [ABI (binarny interfejs aplikacji)](https://docs.soliditylang.org/en/latest/abi-spec.html). ABI to plik JSON, który określa, jak definiować i kodować dane dla EVM.

Bajty ładunku określają, która metoda w kontrakcie jest wywoływana. Są to pierwsze 4 bajty z hasha Keccak nazwy funkcji i typów jej argumentów, zakodowane szesnastkowo. Funkcja multiply przyjmuje uint, który jest aliasem dla uint256. Daje nam to:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Kolejnym krokiem jest zakodowanie argumentów. Mamy tylko jeden uint256, powiedzmy, wartość 6. ABI posiada sekcję, która określa, jak kodować typy uint256.

`int<M>: enc(X)` to kodowanie X w kodzie uzupełnień do dwóch w formacie big-endian, uzupełnione po stronie wyższego rzędu (z lewej) wartością 0xff dla ujemnego X i bajtami zerowymi dla dodatniego X, tak aby długość była wielokrotnością 32 bajtów.

Koduje się to jako `0000000000000000000000000000000000000000000000000000000000000006`.

Łącząc selektor funkcji i zakodowany argument, nasze dane będą miały postać `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Można to teraz wysłać do węzła:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Ponieważ transakcja została wysłana, zwrócono hash transakcji. Pobranie pokwitowania daje:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Pokwitowanie zawiera log. Ten log został wygenerowany przez EVM podczas wykonywania transakcji i dołączony do pokwitowania. Funkcja `multiply` pokazuje, że zdarzenie `Print` zostało wywołane z wartością wejściową pomnożoną przez 7. Ponieważ argumentem dla zdarzenia `Print` był uint256, możemy go zdekodować zgodnie z regułami ABI, co da nam oczekiwaną wartość dziesiętną 42. Oprócz danych warto zauważyć, że tematy (topics) mogą być użyte do określenia, które zdarzenie utworzyło log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

To było tylko krótkie wprowadzenie do niektórych z najczęstszych zadań, demonstrujące bezpośrednie użycie JSON-RPC.

## Powiązane tematy {#related-topics}

- [Specyfikacja JSON-RPC](http://www.jsonrpc.org/specification)
- [Węzły i klienty](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backendowe](/developers/docs/apis/backend/)
- [Klienty warstwy wykonawczej](/developers/docs/nodes-and-clients/#execution-clients)