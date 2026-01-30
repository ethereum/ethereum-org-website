---
title: API JSON-RPC
description: Bezstanowy, lekki protokół zdalnego wywoływania procedur (RPC) dla klientów Ethereum.
lang: pl
---

Aby aplikacja mogła wchodzić w interakcję z blockchainem Ethereum – odczytywać dane blockchainu lub wysyłać transakcje do sieci – musi łączyć się z węzłem Ethereum.

W tym celu każdy [klient Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementuje [specyfikację JSON-RPC](https://github.com/ethereum/execution-apis), więc istnieje jednolity zestaw metod, na których aplikacje mogą polegać niezależnie od konkretnej implementacji węzła lub klienta.

[JSON-RPC](https://www.jsonrpc.org/specification) to bezstanowy, lekki protokół zdalnego wywoływania procedur (RPC). Definiuje kilka struktur danych i zasady dotyczące ich przetwarzania. Jest niezależny od transportu, ponieważ koncepcje te mogą być używane w ramach tego samego procesu, przez gniazda, przez HTTP lub w wielu różnych środowiskach przekazywania komunikatów. Używa formatu danych JSON (RFC 4627).

## Implementacje klienta {#client-implementations}

Klienci Ethereum mogą wykorzystywać różne języki programowania podczas wdrażania specyfikacji JSON-RPC. Więcej szczegółów na temat konkretnych języków programowania można znaleźć w dokumentacji poszczególnych [klientów](/developers/docs/nodes-and-clients/#execution-clients). Zalecamy sprawdzenie dokumentacji każdego klienta w celu uzyskania najnowszych informacji o obsłudze API.

## Biblioteki ułatwiające {#convenience-libraries}

Chociaż można zdecydować się na bezpośrednią interakcję z klientami Ethereum za pośrednictwem interfejsu API JSON-RPC, często istnieją łatwiejsze opcje dla deweloperów dapp. Istnieje wiele bibliotek [JavaScript](/developers/docs/apis/javascript/#available-libraries) i [API backendowych](/developers/docs/apis/backend/#available-libraries), które zapewniają wrappery na API JSON-RPC. Dzięki tym bibliotekom deweloperzy mogą pisać intuicyjne, jednowierszowe metody w wybranym przez siebie języku programowania, aby inicjować żądania JSON-RPC (w tle), które wchodzą w interakcję z Ethereum.

## Interfejsy API klienta konsensusu {#consensus-clients}

Ta strona dotyczy głównie interfejsu API JSON-RPC używanego przez klientów wykonawczych Ethereum. Jednak klienci konsensusu mają również interfejs API RPC, który pozwala użytkownikom na wysyłanie zapytań o informacje o węźle, żądanie bloków Beacon, stanu Beacon i innych informacji związanych z konsensusem bezpośrednio z węzła. Ten interfejs API jest udokumentowany na [stronie internetowej Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Wewnętrzny interfejs API jest również używany do komunikacji między klientami w węźle – to znaczy, umożliwia klientowi konsensusu i klientowi wykonawczemu wymianę danych. Nazywa się to „Engine API”, a specyfikacje są dostępne na [GitHubie](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Specyfikacja klienta wykonawczego {#spec}

[Przeczytaj pełną specyfikację API JSON-RPC na GitHubie](https://github.com/ethereum/execution-apis). Ten interfejs API jest udokumentowany na [stronie Execution API](https://ethereum.github.io/execution-apis/) i zawiera Inspektor, który pozwala wypróbować wszystkie dostępne metody.

## Konwencje {#conventions}

### Kodowanie wartości szesnastkowych {#hex-encoding}

Dwa kluczowe typy danych są przekazywane przez JSON: niesformatowane tablice bajtów i ilości. Oba są przekazywane z kodowaniem szesnastkowym, ale z różnymi wymaganiami dotyczącymi formatowania.

#### Ilości {#quantities-encoding}

Podczas kodowania ilości (liczb całkowitych, liczb): zakoduj jako hex, poprzedź prefiksem "0x", najbardziej kompaktowa reprezentacja (niewielki wyjątek: zero powinno być reprezentowane jako "0x0").

Oto kilka przykładów:

- 0x41 (65 dziesiętnie)
- 0x400 (1024 dziesiętnie)
- BŁĄD: 0x (powinien zawsze mieć co najmniej jedną cyfrę - zero to "0x0")
- BŁĄD: 0x0400 (niedozwolone zera wiodące)
- BŁĄD: ff (musi być poprzedzone 0x)

### Dane niesformatowane {#unformatted-data-encoding}

Podczas kodowania niesformatowanych danych (tablice bajtów, adresy kont, hasze, tablice kodu bajtowego): koduj jako hex, poprzedź prefiksem "0x", dwie cyfry szesnastkowe na bajt.

Oto kilka przykładów:

- 0x41 (rozmiar 1, "A")
- 0x004200 (rozmiar 3, "0B0")
- 0x (rozmiar 0, "")
- BŁĄD: 0xf0f0f (musi być parzysta liczba cyfr)
- BŁĄD: 004200 (musi być poprzedzone 0x)

### Parametr bloku {#block-parameter}

Następujące metody mają parametr bloku:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Kiedy składane są żądania dotyczące stanu Ethereum, podany parametr bloku określa wysokość bloku.

Dla parametru bloku możliwe są następujące opcje:

- `Ciąg HEX` - numer bloku w postaci liczby całkowitej
- `Ciąg znaków "earliest"` dla najwcześniejszego/genezy bloku
- `Ciąg znaków "latest"` – dla ostatniego zaproponowanego bloku
- `Ciąg znaków "safe"` – dla ostatniego bezpiecznego bloku głównego
- `Ciąg znaków "finalized"` – dla ostatniego sfinalizowanego bloku
- `Ciąg znaków "pending"` – dla oczekującego stanu/transakcji

## Przykłady

Na tej stronie przedstawiamy przykłady użycia poszczególnych punktów końcowych API JSON_RPC za pomocą narzędzia wiersza poleceń, [curl](https://curl.se). Te indywidualne przykłady punktów końcowych znajdują się poniżej w sekcji [Przykłady Curl](#curl-examples). W dalszej części strony przedstawiamy również [kompletny przykład](#usage-example) kompilowania i wdrażania inteligentnego kontraktu za pomocą węzła Geth, interfejsu API JSON_RPC i curl.

## Przykłady Curl {#curl-examples}

Poniżej przedstawiono przykłady użycia interfejsu API JSON_RPC poprzez wysyłanie żądań [curl](https://curl.se) do węzła Ethereum. Każdy przykład
zawiera opis konkretnego punktu końcowego, jego parametrów, typu zwrotnego i praktyczny przykład jego użycia.

Żądania curl mogą zwrócić komunikat o błędzie związany z typem zawartości. Dzieje się tak, ponieważ opcja `--data` ustawia typ zawartości na `application/x-www-form-urlencoded`. Jeśli twój węzeł zgłasza ten problem, ręcznie ustaw nagłówek, umieszczając `-H "Content-Type: application/json"` na początku wywołania. Przykłady nie zawierają również kombinacji URL/IP i portu, która musi być ostatnim argumentem podanym do curl (np. `127.0.0.1:8545`). Pełne żądanie curl zawierające te dodatkowe dane ma następującą postać:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Plotki, stan, historia {#gossip-state-history}

Kilka podstawowych metod JSON-RPC wymaga danych z sieci Ethereum i dzieli się na trzy główne kategorie: _Plotki, Stan i Historia_. Użyj linków w tych sekcjach, aby przejść do każdej metody, lub użyj spisu treści, aby przejrzeć całą listę metod.

### Metody plotkowania {#gossip-methods}

> Metody te śledzą nagłówek łańcucha. W ten sposób transakcje krążą po sieci, trafiają do bloków, a klienci dowiadują się o nowych blokach.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Metody stanu {#state_methods}

> Metody, które raportują aktualny stan wszystkich przechowywanych danych. "Stan" jest jak jeden duży, współdzielony fragment pamięci RAM i obejmuje salda kont, dane kontraktów i szacunki gazu.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Metody historii {#history_methods}

> Pobiera historyczne zapisy każdego bloku aż do bloku genezy. Jest to jak jeden duży plik tylko do dołączania i zawiera wszystkie nagłówki bloków, treści bloków, bloki uncle i potwierdzenia transakcji.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Plac zabaw API JSON-RPC

Możesz użyć [narzędzia placu zabaw](https://ethereum-json-rpc.com), aby odkryć i wypróbować metody API. Pokazuje również, które metody i sieci są obsługiwane przez różnych dostawców węzłów.

## Metody API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Zwraca bieżącą wersję klienta.

**Parametry**

Brak

**Zwraca**

`String` - aktualna wersja klienta

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Zwraca Keccak-256 (_nie_ standaryzowany SHA3-256) podanych danych.

**Parametry**

1. `DATA` - dane do przekształcenia w hasz SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Zwraca**

`DATA` - wynik SHA3 podanego ciągu.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Zwraca bieżący identyfikator sieci.

**Parametry**

Brak

**Zwraca**

`String` - bieżący identyfikator sieci.

Pełna lista aktualnych identyfikatorów sieci jest dostępna na stronie [chainlist.org](https://chainlist.org). Niektóre z popularnych to:

- `1`: Sieć główna Ethereum
- `11155111`: Sieć testowa Sepolia
- `560048` : Sieć testowa Hoodi

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Zwraca `true`, jeśli klient aktywnie nasłuchuje połączeń sieciowych.

**Parametry**

Brak

**Zwraca**

`Boolean` - `true` podczas słuchania, w przeciwnym razie `false`.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Zwraca liczbę peerów aktualnie podłączonych do klienta.

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba całkowita połączonych peerów.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Zwraca aktualną wersję protokołu Ethereum. Należy pamiętać, że ta metoda jest [niedostępna w Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parametry**

Brak

**Zwraca**

`String` - bieżąca wersja protokołu Ethereum

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Zwraca obiekt z danymi o stanie synchronizacji lub `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

Dokładne zwracane dane różnią się w zależności od implementacji klienta. Wszyscy klienci zwracają `False`, gdy węzeł nie jest synchronizowany, i wszyscy klienci zwracają następujące pola.

`Object|Boolean`, obiekt z danymi o stanie synchronizacji lub `FALSE`, gdy nie synchronizuje:

- `startingBlock`: `QUANTITY` - blok, od którego rozpoczął się import (zostanie zresetowany dopiero po osiągnięciu przez synchronizację nagłówka)
- `currentBlock`: `QUANTITY` - bieżący blok, tak samo jak eth_blockNumber
- `highestBlock`: `QUANTITY` - szacowany najwyższy blok

Jednak poszczególni klienci mogą również dostarczać dodatkowe dane. Na przykład Geth zwraca następujące informacje:

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

Więcej szczegółów można znaleźć w dokumentacji konkretnego klienta.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Zwraca adres coinbase klienta.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

> **Uwaga:** ta metoda została wycofana od wersji **v1.14.0** i nie jest już obsługiwana. Próba użycia tej metody spowoduje błąd "Metoda nie jest obsługiwana".

**Parametry**

Brak

**Zwraca**

`DATA`, 20 bajtów - aktualny adres coinbase.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Zwraca identyfikator łańcucha używany do podpisywania transakcji chronionych przed powtórzeniem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`chainId`, wartość szesnastkowa jako ciąg reprezentujący liczbę całkowitą bieżącego identyfikatora łańcucha.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Zwraca `true`, jeśli klient aktywnie wydobywa nowe bloki. Może to zwrócić `true` tylko dla sieci proof-of-work i może nie być dostępne w niektórych klientach od czasu [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`Boolean` - zwraca `true`, jeśli klient wydobywa, w przeciwnym razie `false`.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Zwraca liczbę haszy na sekundę, z jaką kopie węzeł. Może to zwrócić `true` tylko dla sieci proof-of-work i może nie być dostępne w niektórych klientach od czasu [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba haszy na sekundę.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Zwraca szacunkową bieżącą cenę za gaz w wei. Na przykład klient Besu domyślnie sprawdza ostatnie 100 bloków i zwraca medianę ceny jednostki gazu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba całkowita bieżącej ceny gazu w wei.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Zwraca listę adresów należących do klienta.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`Array of DATA`, 20 bajtów - adresy należące do klienta.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Zwraca numer ostatniego bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Brak

**Zwraca**

`QUANTITY` - liczba całkowita bieżącego numeru bloku, na którym znajduje się klient.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Zwraca saldo konta pod podanym adresem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres do sprawdzenia salda.
2. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Zwraca**

`QUANTITY` - liczba całkowita bieżącego salda w wei.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Zwraca wartość z pozycji przechowywania pod danym adresem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres pamięci masowej.
2. `QUANTITY` - liczba całkowita pozycji w pamięci.
3. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Zwraca**

`DATA` - wartość w tej pozycji pamięci.

**Przykład**
Obliczenie prawidłowej pozycji zależy od pamięci, którą należy pobrać. Rozważ następujący kontrakt wdrożony pod adresem `0x295a70b2de5e3953354a6a8344e616ed314d7251` z adresu `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

Pobranie elementu mapy jest trudniejsze. Pozycję elementu w mapie oblicza się za pomocą:

```js
keccak(LeftPad32(klucz, 0), LeftPad32(pozycja w mapie, 0))
```

Oznacza to, że aby pobrać pamięć z pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] musimy obliczyć pozycję za pomocą:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Konsola geth, która jest dostarczana z biblioteką web3, może być użyta do wykonania obliczeń:

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

### eth_getTransactionCount {#eth_gettransactioncount}

Zwraca liczbę transakcji _wysłanych_ z adresu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres.
2. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // stan w ostatnim bloku
]
```

**Zwraca**

`QUANTITY` - liczba całkowita transakcji wysłanych z tego adresu.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Zwraca liczbę transakcji w bloku z bloku pasującego do podanego haszu bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hasz bloku

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Zwraca**

`QUANTITY` - liczba całkowita liczby transakcji w tym bloku.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Zwraca liczbę transakcji w bloku pasującym do podanego numeru bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - liczba całkowita numeru bloku lub ciąg `"earliest"`, `"latest"`, `"pending"`, `"safe"` lub `"finalized"`, jak w [parametrze bloku](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Zwraca**

`QUANTITY` - liczba całkowita liczby transakcji w tym bloku.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Zwraca liczbę bloków uncle w bloku pasującym do podanego haszu bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hasz bloku

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Zwraca**

`QUANTITY` - liczba całkowita liczby bloków uncle w tym bloku.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Zwraca liczbę bloków uncle w bloku pasującym do podanego numeru bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Zwraca**

`QUANTITY` - liczba całkowita liczby bloków uncle w tym bloku.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Zwraca kod pod podanym adresem.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 20 bajtów - adres
2. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

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
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Metoda podpisu oblicza specyficzny dla Ethereum podpis za pomocą: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Dodanie prefiksu do komunikatu sprawia, że obliczony podpis jest rozpoznawalny jako podpis specyficzny dla Ethereum. Zapobiega to nadużyciom, w których złośliwa dappka może podpisywać dowolne dane (np. transakcję) i używać podpisu do podszywania się pod ofiarę.

Uwaga: adres, którym się podpisujesz, musi być odblokowany.

**Parametry**

1. `DATA`, 20 bajtów - adres
2. `DATA`, N bajtów - komunikat do podpisania

**Zwraca**

`DATA`: Podpis

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Podpisuje transakcję, która może być przesłana do sieci w późniejszym czasie za pomocą [eth_sendRawTransaction](#eth_sendrawtransaction).

**Parametry**

1. `Object` – obiekt transakcji

- `type`:
- `from`: `DATA`, 20 bajtów - adres, z którego wysyłana jest transakcja.
- `to`: `DATA`, 20 bajtów - (opcjonalnie przy tworzeniu nowego kontraktu) adres, na który kierowana jest transakcja.
- `gas`: `QUANTITY` - (opcjonalnie, domyślnie: 90000) Liczba całkowita gazu przeznaczonego na wykonanie transakcji. Zwróci niewykorzystany gaz.
- `gasPrice`: `QUANTITY` - (opcjonalne, domyślne: do ustalenia) Liczba całkowita gasPrice używana dla każdego opłaconego gazu, w Wei.
- `value`: `QUANTITY` - (opcjonalnie) Liczba całkowita wartości wysłanej z tą transakcją, w Wei.
- `data`: `DATA` - skompilowany kod kontraktu LUB hasz wywołanej sygnatury metody i zakodowanych parametrów.
- `nonce`: `QUANTITY` - (opcjonalne) Liczba całkowita nonce. Pozwala to na nadpisanie własnych oczekujących transakcji, które używają tego samego nonce.

**Zwraca**

`DATA`, obiekt transakcji zakodowany w RLP i podpisany przez określone konto.

**Przykład**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Tworzy nową transakcję wywołania komunikatu lub tworzy kontrakt, jeśli pole danych zawiera kod, i podpisuje ją za pomocą konta określonego w `from`.

**Parametry**

1. `Object` – obiekt transakcji

- `from`: `DATA`, 20 bajtów - adres, z którego wysyłana jest transakcja.
- `to`: `DATA`, 20 bajtów - (opcjonalnie przy tworzeniu nowego kontraktu) adres, na który kierowana jest transakcja.
- `gas`: `QUANTITY` - (opcjonalnie, domyślnie: 90000) Liczba całkowita gazu przeznaczonego na wykonanie transakcji. Zwróci niewykorzystany gaz.
- `gasPrice`: `QUANTITY` - (opcjonalne, domyślne: do ustalenia) Liczba całkowita gasPrice używana dla każdego opłaconego gazu.
- `value`: `QUANTITY` - (opcjonalnie) Liczba całkowita wartości wysłanej w ramach tej transakcji.
- `input`: `DATA` - skompilowany kod kontraktu LUB hasz wywołanej sygnatury metody i zakodowanych parametrów.
- `nonce`: `QUANTITY` - (opcjonalne) Liczba całkowita nonce. Pozwala to na nadpisanie własnych oczekujących transakcji, które używają tego samego nonce.

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

`DATA`, 32 bajty - hasz transakcji lub hasz zerowy, jeśli transakcja nie jest jeszcze dostępna.

Użyj [eth_getTransactionReceipt](#eth_gettransactionreceipt), aby uzyskać adres kontraktu po zaproponowaniu transakcji w bloku, gdy utworzyłeś kontrakt.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Tworzy nową transakcję wywołania wiadomości lub tworzenie kontraktu dla podpisanych transakcji.

**Parametry**

1. `DATA`, dane podpisanej transakcji.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Zwraca**

`DATA`, 32 bajty - hasz transakcji lub hasz zerowy, jeśli transakcja nie jest jeszcze dostępna.

Użyj [eth_getTransactionReceipt](#eth_gettransactionreceipt), aby uzyskać adres kontraktu po zaproponowaniu transakcji w bloku, gdy utworzyłeś kontrakt.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Wykonuje natychmiastowe wywołanie nowego komunikatu bez tworzenia transakcji na blockchainie. Często używane do wykonywania funkcji inteligentnych kontraktów tylko do odczytu, na przykład `balanceOf` dla kontraktu ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `Object` - obiekt wywołania transakcji

- `from`: `DATA`, 20 bajtów - (opcjonalnie) adres, z którego wysyłana jest transakcja.
- `to`: `DATA`, 20 bajtów - adres, na który kierowana jest transakcja.
- `gas`: `QUANTITY` - (opcjonalnie) Liczba całkowita gazu przeznaczonego na wykonanie transakcji. eth_call zużywa zero gazu, ale ten parametr może być potrzebny w niektórych wykonaniach.
- `gasPrice`: `QUANTITY` - (opcjonalne) Liczba całkowita gasPrice użyta dla każdego opłaconego gazu
- `value`: `QUANTITY` - (opcjonalnie) Liczba całkowita wartości wysłanej w tej transakcji
- `input`: `DATA` - (opcjonalnie) hasz sygnatury metody i zakodowanych parametrów. Szczegółowe informacje można znaleźć w [ABI kontraktu Ethereum w dokumentacji Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - numer bloku w postaci liczby całkowitej lub ciąg znaków `"latest"`, `"earliest"`, `"pending"`, `"safe"` lub `"finalized"`, zobacz [parametr bloku](/developers/docs/apis/json-rpc/#block-parameter)

**Zwraca**

`DATA` - wartość zwracana przez wykonany kontrakt.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Generuje i zwraca oszacowanie, ile gazu jest potrzebne, aby transakcja mogła zostać ukończona. Transakcja nie zostanie dodana do blockchainu. Należy pamiętać, że szacunkowa wartość może być znacznie wyższa niż ilość gazu faktycznie zużytego przez transakcję z różnych powodów, w tym z powodu mechaniki EVM i wydajności węzła.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

Zobacz parametry [eth_call](#eth_call), z wyjątkiem tego, że wszystkie właściwości są opcjonalne. Jeśli nie określono limitu gazu, geth używa limitu gazu z bloku oczekującego jako górnej granicy. W rezultacie zwrócona estymacja może nie być wystarczająca do wykonania wywołania/transakcji, gdy ilość gazu jest wyższa niż limit gazu w oczekującym bloku.

**Zwraca**

`QUANTITY` - ilość zużytego gazu.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Zwraca informacje o bloku po haszu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hasz bloku.
2. `Boolean` - jeśli `true`, zwraca pełne obiekty transakcji, jeśli `false`, tylko hasze transakcji.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Zwraca**

`Object` - obiekt bloku lub `null`, jeśli nie znaleziono bloku:

- `number`: `QUANTITY` - numer bloku. `null`, gdy jest to blok oczekujący.
- `hash`: `DATA`, 32 bajty - hasz bloku. `null`, gdy jest to blok oczekujący.
- `parentHash`: `DATA`, 32 bajty - hasz bloku nadrzędnego.
- `nonce`: `DATA`, 8 bajtów - hasz wygenerowanego dowodu pracy. `null`, gdy jest to blok oczekujący, `0x0` dla bloków proof-of-stake (od czasu The Merge)
- `sha3Uncles`: `DATA`, 32 bajty - SHA3 danych bloków uncle w bloku.
- `logsBloom`: `DATA`, 256 bajtów - filtr Blooma dla logów bloku. `null`, gdy jest to blok oczekujący.
- `transactionsRoot`: `DATA`, 32 bajty - korzeń drzewa transakcji bloku.
- `stateRoot`: `DATA`, 32 bajty - korzeń końcowego drzewa stanu bloku.
- `receiptsRoot`: `DATA`, 32 bajty - korzeń drzewa potwierdzeń bloku.
- `miner`: `DATA`, 20 bajtów - adres beneficjenta, któremu przyznano nagrody za blok.
- `difficulty`: `QUANTITY` - liczba całkowita trudności dla tego bloku.
- `totalDifficulty`: `QUANTITY` - liczba całkowita całkowitej trudności łańcucha aż do tego bloku.
- `extraData`: `DATA` - pole "dodatkowych danych" tego bloku.
- `size`: `QUANTITY` - liczba całkowita rozmiaru tego bloku w bajtach.
- `gasLimit`: `QUANTITY` - maksymalna ilość gazu dozwolona w tym bloku.
- `gasUsed`: `QUANTITY` - całkowity zużyty gaz przez wszystkie transakcje w tym bloku.
- `timestamp`: `QUANTITY` - znacznik czasu uniksowego, kiedy blok został zebrany.
- `transactions`: `Array` - tablica obiektów transakcji lub 32-bajtowe hasze transakcji w zależności od ostatniego podanego parametru.
- `uncles`: `Array` - tablica haszy bloków uncle.

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

### eth_getBlockByNumber {#eth_getblockbynumber}

Zwraca informacje o bloku po numerze bloku.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - liczba całkowita numeru bloku lub ciąg `"earliest"`, `"latest"`, `"pending"`, `"safe"` lub `"finalized"`, jak w [parametrze bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - jeśli `true`, zwraca pełne obiekty transakcji, jeśli `false`, tylko hasze transakcji.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Zwraca**
Zobacz [eth_getBlockByHash](#eth_getblockbyhash)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Wynik zobacz [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Zwraca informacje o transakcji żądanej przez hasz transakcji.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hasz transakcji

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Zwraca**

`Object` - obiekt transakcji lub `null`, gdy nie znaleziono transakcji:

- `blockHash`: `DATA`, 32 bajty - hasz bloku, w którym znajdowała się ta transakcja. `null`, gdy oczekuje.
- `blockNumber`: `QUANTITY` - numer bloku, w którym znajdowała się ta transakcja. `null`, gdy oczekuje.
- `from`: `DATA`, 20 bajtów - adres nadawcy.
- `gas`: `QUANTITY` - gaz dostarczony przez nadawcę.
- `gasPrice`: `QUANTITY` - cena gazu podana przez nadawcę w Wei.
- `hash`: `DATA`, 32 bajty - hasz transakcji.
- `input`: `DATA` - dane wysyłane wraz z transakcją.
- `nonce`: `QUANTITY` - liczba transakcji wykonanych przez nadawcę przed tą.
- `to`: `DATA`, 20 bajtów - adres odbiorcy. `null`, gdy jest to transakcja utworzenia kontraktu.
- `transactionIndex`: `QUANTITY` - liczba całkowita indeksu pozycji transakcji w bloku. `null`, gdy oczekuje.
- `value`: `QUANTITY` - wartość przeniesiona w Wei.
- `v`: `QUANTITY` - identyfikator odzyskiwania ECDSA
- `r`: `QUANTITY` - podpis ECDSA r
- `s`: `QUANTITY` - podpis ECDSA s

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Zwraca informacje o transakcji według haszu bloku i pozycji indeksu transakcji.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hasz bloku.
2. `QUANTITY` - liczba całkowita pozycji indeksu transakcji.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Zwraca**
Zobacz [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Wynik zobacz [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Zwraca informacje o transakcji według numeru bloku i pozycji indeksu transakcji.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - numer bloku lub ciąg `"earliest"`, `"latest"`, `"pending"`, `"safe"` lub `"finalized"`, jak w [parametrze bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - pozycja indeksu transakcji.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Zwraca**
Zobacz [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Wynik zobacz [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Zwraca potwierdzenie transakcji według haszu transakcji.

**Uwaga** Potwierdzenie nie jest dostępne dla oczekujących transakcji.

**Parametry**

1. `DATA`, 32 bajty - hasz transakcji

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Zwraca**
`Object` - obiekt potwierdzenia transakcji lub `null`, gdy nie znaleziono potwierdzenia:

- `transactionHash `: `DATA`, 32 bajty - hasz transakcji.
- `transactionIndex`: `QUANTITY` - liczba całkowita indeksu pozycji transakcji w bloku.
- `blockHash`: `DATA`, 32 bajty - hasz bloku, w którym znajdowała się ta transakcja.
- `blockNumber`: `QUANTITY` - numer bloku, w którym znajdowała się ta transakcja.
- `from`: `DATA`, 20 bajtów - adres nadawcy.
- `to`: `DATA`, 20 bajtów - adres odbiorcy. null, gdy jest to transakcja utworzenia kontraktu.
- `cumulativeGasUsed`: `QUANTITY ` - całkowita ilość gazu zużytego podczas wykonywania tej transakcji w bloku.
- `effectiveGasPrice`: `QUANTITY` - suma opłaty podstawowej i napiwku zapłaconego za jednostkę gazu.
- `gasUsed `: `QUANTITY ` - ilość gazu zużytego tylko przez tę konkretną transakcję.
- `contractAddress `: `DATA`, 20 bajtów – adres utworzonego kontraktu, jeśli transakcja była utworzeniem kontraktu, w przeciwnym razie `null`.
- `logs`: `Array` - tablica obiektów logów, które wygenerowała ta transakcja.
- `logsBloom`: `DATA`, 256 bajtów - filtr Blooma dla lekkich klientów do szybkiego pobierania powiązanych logów.
- `type`: `QUANTITY` - liczba całkowita typu transakcji, `0x0` dla transakcji starszego typu, `0x1` dla typów z listą dostępu, `0x2` dla opłat dynamicznych.

Zwraca również _albo_ :

- `root` : `DATA` 32 bajty korzenia stanu po transakcji (przed Byzantium)
- `status`: `QUANTITY` albo `1` (sukces), albo `0` (niepowodzenie)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string adresu, jeśli został utworzony
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

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Zwraca informacje o bloku-stryju na podstawie jego haszu i pozycji indeksu stryja.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `DATA`, 32 bajty - hasz bloku.
2. `QUANTITY` - pozycja indeksu bloku uncle.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Zwraca**
Zobacz [eth_getBlockByHash](#eth_getblockbyhash)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Wynik zobacz [eth_getBlockByHash](#eth_getblockbyhash)

**Uwaga**: blok uncle nie zawiera pojedynczych transakcji.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Zwraca informacje o bloku-stryju na podstawie jego numeru i pozycji indeksu stryja.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Wypróbuj punkt końcowy w placu zabaw
</ButtonLink>

**Parametry**

1. `QUANTITY|TAG` - numer bloku lub ciąg `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, jak w [parametrze bloku](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - pozycja indeksu bloku uncle.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Zwraca**
Zobacz [eth_getBlockByHash](#eth_getblockbyhash)

**Uwaga**: blok uncle nie zawiera pojedynczych transakcji.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Wynik zobacz [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Tworzy obiekt filtra w oparciu o opcje filtrowania, aby powiadamiać o zmianie stanu (logi).
Aby sprawdzić, czy stan się zmienił, wywołaj [eth_getFilterChanges](#eth_getfilterchanges).

**Uwaga dotycząca określania filtrów tematów:**
Tematy zależą od kolejności. Transakcja z logiem z tematami [A, B] będzie dopasowana przez następujące filtry tematów:

- `[]` "cokolwiek"
- `[A]` "A na pierwszej pozycji (i cokolwiek po)"
- `[null, B]` "cokolwiek na pierwszej pozycji ORAZ B na drugiej pozycji (i cokolwiek po)"
- `[A, B]` "A na pierwszej pozycji ORAZ B na drugiej pozycji (i cokolwiek po)"
- `[[A, B], [A, B]]` "(A LUB B) na pierwszej pozycji ORAZ (A LUB B) na drugiej pozycji (i cokolwiek po)"
- **Parametry**

1. `Object` – opcje filtra:

- `fromBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Liczba całkowita numeru bloku lub `"latest"` dla ostatniego proponowanego bloku, `"safe"` dla ostatniego bezpiecznego bloku, `"finalized"` dla ostatniego sfinalizowanego bloku lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `toBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Liczba całkowita numeru bloku lub `"latest"` dla ostatniego proponowanego bloku, `"safe"` dla ostatniego bezpiecznego bloku, `"finalized"` dla ostatniego sfinalizowanego bloku lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `address`: `DATA|Array`, 20 bajtów - (opcjonalnie) Adres kontraktu lub lista adresów, z których powinny pochodzić logi.
- `topics`: `Array of DATA` - (opcjonalnie) Tablica 32-bajtowych tematów `DATA`. Tematy zależą od kolejności. Każdy temat może być również tablicą DATA z opcjami "lub".

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
`QUANTITY` - identyfikator filtra.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Tworzy filtr w węźle, aby powiadamiać o nadejściu nowego bloku.
Aby sprawdzić, czy stan się zmienił, wywołaj [eth_getFilterChanges](#eth_getfilterchanges).

**Parametry**
Brak

**Zwraca**
`QUANTITY` - identyfikator filtra.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Tworzy filtr w węźle, aby powiadamiać o nadejściu nowych oczekujących transakcji.
Aby sprawdzić, czy stan się zmienił, wywołaj [eth_getFilterChanges](#eth_getfilterchanges).

**Parametry**
Brak

**Zwraca**
`QUANTITY` - identyfikator filtra.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Odinstalowuje filtr o podanym identyfikatorze. Należy zawsze wywoływać, gdy obserwacja nie jest już potrzebna.
Dodatkowo filtry ulegają przedawnieniu, jeśli przez pewien czas nie są wywoływane za pomocą [eth_getFilterChanges](#eth_getfilterchanges).

**Parametry**

1. `QUANTITY` - identyfikator filtra.

```js
params: [
  "0xb", // 11
]
```

**Zwraca**
`Boolean` - `true`, jeśli filtr został pomyślnie odinstalowany, w przeciwnym razie `false`.

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Metoda odpytywania filtra, która zwraca tablicę logów, które wystąpiły od ostatniego odpytania.

**Parametry**

1. `QUANTITY` - identyfikator filtra.

```js
params: [
  "0x16", // 22
]
```

**Zwraca**
`Array` - tablica obiektów logów lub pusta tablica, jeśli od ostatniego odpytania nic się nie zmieniło.

- Dla filtrów utworzonych za pomocą `eth_newBlockFilter` zwracane są hasze bloków (`DATA`, 32 bajty), np. `["0x3454645634534..."]`.

- Dla filtrów utworzonych za pomocą `eth_newPendingTransactionFilter` zwracane są hasze transakcji (`DATA`, 32 bajty), np. `["0x6345343454645..."]`.

- Dla filtrów utworzonych za pomocą `eth_newFilter` logi są obiektami z następującymi parametrami:
  - `removed`: `TAG` - `true`, gdy log został usunięty z powodu reorganizacji łańcucha. `false`, jeśli jest to prawidłowy log.
  - `logIndex`: `QUANTITY` - liczba całkowita indeksu pozycji logu w bloku. `null`, gdy jest to log oczekujący.
  - `transactionIndex`: `QUANTITY` - liczba całkowita indeksu pozycji transakcji, z której utworzono log. `null`, gdy jest to log oczekujący.
  - `transactionHash`: `DATA`, 32 bajty - hasz transakcji, z których ten log został utworzony. `null`, gdy jest to log oczekujący.
  - `blockHash`: `DATA`, 32 bajty - hasz bloku, w którym znajdował się ten log. `null`, gdy oczekuje. `null`, gdy jest to log oczekujący.
  - `blockNumber`: `QUANTITY` - numer bloku, w którym znajdował się ten log. `null`, gdy oczekuje. `null`, gdy jest to log oczekujący.
  - `address`: `DATA`, 20 bajtów - adres, z którego pochodzi ten log.
  - `data`: `DATA` - nieindeksowane dane logu o zmiennej długości. (W _solidity_: zero lub więcej 32-bajtowych nieindeksowanych argumentów logu).
  - `topics`: `Array of DATA` - tablica od 0 do 4 32-bajtowych `DATA` indeksowanych argumentów logów. (W _solidity_: Pierwszym tematem jest _hasz_ sygnatury zdarzenia (np. `Deposit(address,bytes32,uint256)`), chyba że zadeklarowano zdarzenie ze specyfikatorem `anonymous`).

- **Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
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

### eth_getFilterLogs {#eth_getfilterlogs}

Zwraca tablicę wszystkich logów pasujących do filtra o podanym identyfikatorze.

**Parametry**

1. `QUANTITY` - identyfikator filtra.

```js
params: [
  "0x16", // 22
]
```

**Zwraca**
Zobacz [eth_getFilterChanges](#eth_getfilterchanges)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Wynik zobacz [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Zwraca tablicę wszystkich logów pasujących do danego obiektu filtra.

**Parametry**

1. `Object` – opcje filtra:

- `fromBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Liczba całkowita numeru bloku lub `"latest"` dla ostatniego proponowanego bloku, `"safe"` dla ostatniego bezpiecznego bloku, `"finalized"` dla ostatniego sfinalizowanego bloku lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `toBlock`: `QUANTITY|TAG` - (opcjonalnie, domyślnie: `"latest"`) Liczba całkowita numeru bloku lub `"latest"` dla ostatniego proponowanego bloku, `"safe"` dla ostatniego bezpiecznego bloku, `"finalized"` dla ostatniego sfinalizowanego bloku lub `"pending"`, `"earliest"` dla transakcji, które nie są jeszcze w bloku.
- `address`: `DATA|Array`, 20 bajtów - (opcjonalnie) Adres kontraktu lub lista adresów, z których powinny pochodzić logi.
- `topics`: `Array of DATA` - (opcjonalnie) Tablica 32-bajtowych tematów `DATA`. Tematy zależą od kolejności. Każdy temat może być również tablicą DATA z opcjami "lub".
- `blockHash`: `DATA`, 32 bajty - (opcjonalnie, **w przyszłości**) Wraz z dodaniem EIP-234, `blockHash` będzie nową opcją filtra, która ogranicza zwracane logi do pojedynczego bloku z 32-bajtowym haszem `blockHash`. Użycie `blockHash` jest równoznaczne z `fromBlock` = `toBlock` = numer bloku z haszem `blockHash`. Jeśli `blockHash` jest obecny w kryteriach filtra, to ani `fromBlock`, ani `toBlock` nie są dozwolone.

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
Zobacz [eth_getFilterChanges](#eth_getfilterchanges)

**Przykład**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Wynik zobacz [eth_getFilterChanges](#eth_getfilterchanges)

## Przykład użycia {#usage-example}

### Wdrażanie kontraktu za pomocą JSON_RPC {#deploying-contract}

Ta sekcja zawiera demonstrację, jak wdrożyć kontrakt, używając tylko interfejsu RPC. Istnieją alternatywne sposoby wdrażania kontraktów, w których ta złożoność jest ukryta — na przykład za pomocą bibliotek zbudowanych na bazie interfejsu RPC, takich jak [web3.js](https://web3js.readthedocs.io/) i [web3.py](https://github.com/ethereum/web3.py). Te abstrakcje są na ogół łatwiejsze do zrozumienia i mniej podatne na błędy, ale nadal warto zrozumieć, co dzieje się pod spodem.

Poniżej znajduje się prosty inteligentny kontrakt o nazwie `Multiply7`, który zostanie wdrożony za pomocą interfejsu JSON-RPC na węźle Ethereum. Ten samouczek zakłada, że czytelnik ma już uruchomiony węzeł Geth. Więcej informacji o węzłach i klientach jest dostępnych [tutaj](/developers/docs/nodes-and-clients/run-a-node). Proszę zapoznać się z dokumentacją poszczególnych [klientów](/developers/docs/nodes-and-clients/), aby dowiedzieć się, jak uruchomić HTTP JSON-RPC dla klientów innych niż Geth. Większość klientów domyślnie działa na `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Pierwszą rzeczą, którą należy zrobić, jest upewnienie się, że interfejs HTTP RPC jest włączony. Oznacza to, że przy uruchomieniu Geth podajemy flagę `--http`. W tym przykładzie używamy węzła Geth w prywatnym łańcuchu deweloperskim. Używając tego podejścia nie potrzebujemy etheru w prawdziwej sieci.

```bash
geth --http --dev console 2>>geth.log
```

Spowoduje to uruchomienie interfejsu HTTP RPC pod adresem `http://localhost:8545`.

Możemy zweryfikować, czy interfejs działa, pobierając adres coinbase (uzyskując pierwszy adres z tablicy kont) i saldo za pomocą [curl](https://curl.se). Proszę zauważyć, że dane w tych przykładach będą się różnić na Twoim lokalnym węźle. Jeśli chcesz wypróbować te polecenia, zastąp parametry żądania w drugim żądaniu curl wynikiem zwróconym z pierwszego.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Ponieważ liczby są kodowane szesnastkowo, saldo jest zwracane w wei jako ciąg szesnastkowy. Jeśli chcemy mieć saldo w etherze jako liczbę, możemy użyć web3 z konsoli Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Teraz, gdy mamy trochę etheru w naszym prywatnym łańcuchu deweloperskim, możemy wdrożyć kontrakt. Pierwszym krokiem jest skompilowanie kontraktu Multiply7 do kodu bajtowego, który można wysłać do EVM. Aby zainstalować solc, kompilator Solidity, postępuj zgodnie z [dokumentacją Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Możesz chcieć użyć starszej wersji `solc`, aby dopasować ją do [wersji kompilatora użytej w naszym przykładzie](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Następnym krokiem jest skompilowanie kontraktu Multiply7 do kodu bajtowego, który można wysłać do EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binarny:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Teraz, gdy mamy skompilowany kod, musimy określić, ile gazu kosztuje jego wdrożenie. Interfejs RPC ma metodę `eth_estimateGas`, która da nam szacunkową wartość.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

I w końcu wdrożenie kontraktu.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Transakcja jest akceptowana przez węzeł i zwracany jest hasz transakcji. Ten hasz może być użyty do śledzenia transakcji. Następnym krokiem jest ustalenie adresu, pod którym wdrożono nasz kontrakt. Każda wykonana transakcja utworzy potwierdzenie. To potwierdzenie zawiera różne informacje o transakcji, takie jak blok, w którym transakcja została uwzględniona, i ile gazu zużyła EVM. Jeśli transakcja
tworzy kontrakt, będzie również zawierać adres kontraktu. Możemy pobrać potwierdzenie za pomocą metody RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Nasz kontrakt został utworzony pod adresem `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Wynik null zamiast potwierdzenia oznacza, że transakcja nie została jeszcze uwzględniona w bloku. Poczekaj chwilę, sprawdź, czy Twój klient konsensusu jest uruchomiony i spróbuj ponownie.

#### Interakcja z inteligentnymi kontraktami {#interacting-with-smart-contract}

W tym przykładzie wyślemy transakcję za pomocą `eth_sendTransaction` do metody `multiply` kontraktu.

`eth_sendTransaction` wymaga kilku argumentów, w szczególności `from`, `to` i `data`. `From` to adres publiczny naszego konta, a `to` to adres kontraktu. Argument `data` zawiera ładunek, który definiuje, która metoda musi zostać wywołana i z jakimi argumentami. W tym miejscu do gry wchodzi [ABI (binarny interfejs aplikacji)](https://docs.soliditylang.org/en/latest/abi-spec.html). ABI to plik JSON, który definiuje sposób definiowania i kodowania danych dla EVM.

Bajty ładunku definiują, która metoda w kontrakcie jest wywoływana. Są to pierwsze 4 bajty z haszu Keccak nazwy funkcji i typów jej argumentów, zakodowane szesnastkowo. Funkcja multiply akceptuje uint, który jest aliasem dla uint256. Pozostawia nas to z:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Następnym krokiem jest zakodowanie argumentów. Jest tylko jeden uint256, powiedzmy, o wartości 6. ABI ma sekcję, która określa, jak kodować typy uint256.

`int<M>: enc(X)` jest kodowaniem X w uzupełnieniu do dwóch w porządku big-endian, dopełnionym po stronie wyższego rzędu (lewej) wartością 0xff dla ujemnego X i zerowymi bajtami dla dodatniego X, tak aby długość była wielokrotnością 32 bajtów.

Koduje się to do `0000000000000000000000000000000000000000000000000000000000000006`.

Łącząc selektor funkcji i zakodowany argument, nasze dane będą wyglądać następująco: `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Można to teraz wysłać do węzła:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Ponieważ transakcja została wysłana, zwrócony został jej hasz. Pobranie potwierdzenia daje:

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

Potwierdzenie zawiera log. Ten log został wygenerowany przez EVM podczas wykonywania transakcji i zawarty w potwierdzeniu. Funkcja `multiply` pokazuje, że zdarzenie `Print` zostało wywołane z wartością wejściową pomnożoną przez 7. Ponieważ argumentem dla zdarzenia `Print` był uint256, możemy go zdekodować zgodnie z regułami ABI, co pozostawi nas z oczekiwaną wartością dziesiętną 42. Oprócz danych warto zauważyć, że tematy można wykorzystać do określenia, które zdarzenie utworzyło log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

To było tylko krótkie wprowadzenie do niektórych z najczęstszych zadań, demonstrujące bezpośrednie użycie JSON-RPC.

## Powiązane tematy {#related-topics}

- [Specyfikacja JSON-RPC](http://www.jsonrpc.org/specification)
- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [Backendowe API](/developers/docs/apis/backend/)
- [Klienci wykonawczy](/developers/docs/nodes-and-clients/#execution-clients)
