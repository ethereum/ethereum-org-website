---
title: Transakcje
description: Przegląd transakcji Ethereum – sposób działania, struktury danych i metody ich wysyłania za pośrednictwem aplikacji.
lang: pl
---

Transakcje to podpisane kryptograficznie instrukcje od kont. Konto inicjuje transakcję, aby zaktualizować stan sieci Ethereum. Najprostszą transakcją jest przeniesienie ETH z jednego konta na drugie.

## Warunki wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytanie rozdziału o [kontach](/developers/docs/accounts/) oraz naszym [wprowadzeniu do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest transakcja? {#whats-a-transaction}

Transakcja Ethereum odnosi się do działania zainicjowanego przez konto zewnętrzne, czyli takie, które jest zarządzane przez człowieka, a nie przez kontrakt. Na przykład, jeśli Bob wysyła Alice 1 ETH, na koncie Boba musi się pojawić obciążenie, a na koncie Alice uznanie. Ta zmiana stanu ma miejsce w ramach transakcji.

![Schemat pokazujący transakcję powodującą zmianę stanu](./tx.png) _Diagram zaadaptowany z [Ilustrowanego Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transakcje, które zmieniają stan EVM, muszą być rozesłane do całej sieci. Każdy węzeł może rozesłać prośbę o wykonanie transakcji na EVM; po tym wydarzeniu walidator wykona transakcję i roześle powstałą zmianę stanu do reszty sieci.

Transakcje wymagają opłaty i muszą być uwzględnione w ważnym bloku. Aby uprościć ten przegląd, omówimy opłaty za gaz i walidację w innym miejscu.

Przesłana transakcja zawiera następujące informacje:

- `from` — adres nadawcy, który będzie podpisywać transakcję. Będzie to konto zewnętrzne, ponieważ konta kontraktowe nie mogą wysyłać transakcji
- `to` — adres odbiorcy (jeśli jest to konto zewnętrzne, to transakcja przekaże wartość. Natomiast jeśli jest to konto kontraktowe to, transakcja wykona kod kontraktu)
- `signature` — identyfikator nadawcy. Jest on generowany, kiedy klucz prywatny nadawcy podpisuje transakcję i potwierdza, że nadawca autoryzował tę transakcję
- `nonce` — sekwencyjnie zwiększający się licznik, który wskazuje na numer transakcji konta
- `value` — kwota ETH do przesłania od nadawcy do odbiorcy (wyrażona w WEI, gdzie 1 ETH jest równy 1e+18wei)
- `input data` — opcjonalne pole do umieszczania dowolnych danych
- `gasLimit` — maksymalna ilość jednostek gazu, które mogą zostać zużyte w trakcie transakcji. [EVM](/developers/docs/evm/opcodes) określa, ile jednostek gazu wymaga każdy krok obliczeniowy
- `maxPriorityFeePerGas` — maksymalna cena zużytego gazu, która zostanie uwzględniona jako napiwek dla walidatora
- `maxFeePerGas` — maksymalna opłata za jednostkę gazu, jaką użytkownik jest w stanie zapłacić za transakcję (w tym `baseFeePerGas` i `maxPriorityFeePerGas`)

Gaz jest odniesieniem do obliczeń wymaganych do przetworzenia transakcji przez walidatora. Użytkownicy muszą zapłacić opłatę za to obliczenie. `gasLimit` i `maxPriorityFeePerGas` określają maksymalną opłatę transakcyjną płaconą walidatorowi. [Więcej na temat gazu](/developers/docs/gas/).

Obiekt transakcji będzie wyglądał mniej więcej w ten sposób:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Obiekt transakcji musi być podpisany jednak przy użyciu klucza prywatnego nadawcy. Dowodzi to, że transakcja mogła pochodzić jedynie od nadawcy i nie została wysłana w sposób nieuczciwy.

Klient Ethereum, jak Geth, będzie obsługiwać ten proces podpisywania.

Przykład wywołania [JSON-RPC](/developers/docs/apis/json-rpc):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Przykładowa odpowiedź:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` jest podpisaną transakcją w zakodowanym formacie [prefiksu o rekursywnej długości (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` jest podpisaną transakcją w formacie JSON

Dzięki hashowi podpisu można udowodnić kryptograficznie, że transakcja pochodzi od nadawcy i została przesłana do sieci.

### Pole danych {#the-data-field}

Zdecydowana większość transakcji uzyskuje dostęp do kontraktu z konta zewnętrznego. Większość kontraktów jest napisana w Solidity i interpretuje swoje pole danych zgodnie z [binarnym interfejsem aplikacji (ABI)](/glossary/#abi).

Pierwsze cztery bajty określają, które funkcje mają zostać wywołane, korzystając z hasha nazwy funkcji i jej argumentów. Możesz czasami zidentyfikować funkcję z selektora korzystając z [tej bazy danych](https://www.4byte.directory/signatures/).

Reszta danych wywoławczych to argumenty, [zakodowane zgodnie ze specyfikacją ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Spójrzmy dla przykładu na [tę transakcję](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Kliknij **Click to show more**, aby zobaczyć dane wywoławcze.

Selektorem funkcji jest `0xa9059cbb`. Istnieje kilka [znanych funkcji z tym podpisem](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). W tym przypadku [kod źródłowy kontraktu](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) został opublikowany na Etherscan, więc wiemy, że funkcją jest `transfer(address,uint256)`.

Reszta danych to:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Zgodnie ze specyfikacją ABI wartości całkowite (takie jak adresy, które są 20-bajtowymi wartościami całkowitymi) wyświetlają się w ABI jako 32-bajtowe słowa, uzupełnione zerami z przodu. Wiemy więc, że adres `to` wygląda tak [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). Wartość `value` wynosi 0x3b0559f4 = 990206452.

## Rodzaje transakcji {#types-of-transactions}

W Ethereum istnieje kilka różnych rodzajów transakcji:

- Zwykłe transakcje: transakcja z jednego konta na drugie.
- Transakcje wdrożenia kontraktu: transakcja bez adresu „to”, w którym pole danych jest wykorzystywane dla kodu kontraktu.
- Wykonanie kontraktu: transakcja, która wchodzi w interakcję z wdrożonym inteligentnym kontraktem. W tym przypadku adres „to” jest adresem inteligentnego kontraktu.

### Na temat gazu {#on-gas}

Jak już wspomniano, wykonanie transakcji kosztuje [gaz](/developers/docs/gas/). Proste transakcje transferu wymagają 21 000 jednostek gazu.

A więc, aby Bob mógł wysłać Alice 1 ETH przy `baseFeePerGas` wynoszącym 190 gwei i `maxPriorityFeePerGas` wynoszącym 10 gwei, Bob będzie musiał zapłacić następującą opłatę:

```
(190 + 10) * 21 000 = 4 200 000 gwei
--lub--
0,0042 ETH
```

Konto Boba zostanie obciążone kwotą **1,0042 ETH** (1 ETH dla Alice + 0,0042 ETH w opłatach za gaz)

Konto Alicji zostanie zasilone kwotą **1,0 ETH**

Podstawowa opłata wynosząca **0,00399 ETH** zostanie spalona

Walidator zatrzyma napiwek wynoszący **0,000210 ETH**


![Schemat pokazujący, w jaki sposób zwracany jest niewykorzystany gaz](./gas-tx.png) _Schemat zaadaptowany z [Ilustracja Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gaz niewykorzystany w transakcji jest zwracany na konto użytkownika.

### Interakcje z inteligentnymi kontraktami {#smart-contract-interactions}

Gaz jest wymagany dla każdej transakcji wiążącej się z inteligentnym kontraktem.

Inteligentne kontrakty mogą również zawierać funkcje takie jak [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) czy [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), które nie zmieniają stanu kontraktu. W związku z tym wywoływanie tych funkcji z konta zewnętrznego nie będzie wymagało żadnego gazu. Podstawowym wywołaniem RPC dla takiego scenariusza jest [`eth_call`](/developers/docs/apis/json-rpc#eth_call)

W przeciwieństwie do dostępu przy użyciu `eth_call`, funkcje `view` czy `pure` są również często wywoływane wewnętrznie (tj. z samego kontraktu lub od innego kontraktu) co już wymaga gazu.

## Cykl życiowy transakcji {#transaction-lifecycle}

Po przesłaniu transakcji dzieją się następujące wydarzenia:

1. Hash transakcji zostaje kryptograficznie wygenerowany: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transakcja zostaje następnie rozgłoszona do sieci i dodawana do puli transakcji składającej się z wszystkich innych oczekujących transakcji w sieci.
3. Walidator musi wybrać Twoją transakcję i uwzględnić ją w bloku, aby ją zweryfikować transakcję i uznać ją za „udaną”.
4. W miarę upływu czasu blok zawierający Twoją transakcję zostanie zaktualizowany do kategorii „uzasadniony”, a następnie „sfinalizowany”. Aktualizacje te znacznie zwiększają pewność, że Twoja transakcja zakończyła się sukcesem i nie będzie można jej zmienić. Po „sfinalizowaniu” bloku mógłby on zostać zmieniony tylko przez atak na poziomie sieci, który kosztowałby miliardy dolarów.

## Demo wizualne {#a-visual-demo}

Zobacz, jak Austin opowiada o transakcjach, gazie i kopaniu.

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope {#typed-transaction-envelope}

Ethereum pierwotnie miało jeden format transakcji. Każda transakcja zawierała nonce, cenę gazu, limit gazu, adres docelowy, wartość, dane, v, r oraz s. Pola te są [zakodowane w RLP](/developers/docs/data-structures-and-encoding/rlp/), aby wyglądały mniej więcej tak:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum wyewoluowało i wspiera wiele rodzajów transakcji, zezwalając na wdrażanie nowych funkcji takich jak listy dostępu i [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), bez wpływania na starsze formaty transakcji.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) jest tym, co umożliwia takie zachowanie. Transakcję są interpretowane jako:

`TransactionType || TransactionPayload`

Gdzie pola są definiowane jako:

- `TransactionType` — liczba z zakresu od 0 do 0x7f, zapewniająca w sumie 128 możliwych rodzajów transakcji.
- `TransactionPayload` — dowolna tablica bajtów zdefiniowana przez rodzaj transakcji.

Na podstawie wartości `TransactionType`, transakcje mogą być definiowane jako:

1. **Transakcje typu 0 (starsze):** oryginalny format transakcji używany od samego początku Ethereum. Nie zawierają funkcji z [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), takich jak dynamiczne obliczenia opłat za gaz czy list dostępu do inteligentnych kontraktów. Starsze transakcje nie mają określonego prefiksu wskazującego na ich typ w ich serializowanej formie, począwszy od bajtu `0xf8` przy użyciu kodowania [prefiksu o rekursywnej długości (RLP)](/developers/docs/data-structures-and-encoding/rlp). Wartość TransactionType dla tych transakcji wynosi `0x0`.

2. **Transakcje typu 1:** wprowadzone w [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) jako część [uaktualnienia Berlin](/history/#berlin) sieci Ethereum transakcje te zawierają parametr `accessList`. Ta lista określa adresy i klucze przechowywania, do których transakcja oczekuje dostępu, potencjalnie pomagając zmniejszyć koszty [gazu](/developers/docs/gas/) złożonych transakcji wykorzystujących inteligentne kontrakty. Zmiany rynku opłat EIP-1559 nie są uwzględnione w transakcjach typu 1. Transakcje typu 1 zawierają również parametr `yParity`, który może wynosić zarówno `0x0` jak i `0x1`, wskazując na parzystość wartości y podpisu secp256k1. Są identyfikowane przez początkowy bajt `0x01`, a ich wartość TransactionType wynosi `0x1`.

3. **Transakcje typu 2**, powszechnie określane jako transakcje EIP-1559, to transakcje wprowadzone w [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), w ramach [uaktualnienia London](/history/#london) sieci Ethereum. Stały się one standardowym rodzajem transakcji w sieci Ethereum. Transakcje te wprowadziły nowy mechanizm rynku opłat, który poprawia przewidywalność, rozdzielając opłaty transakcyjne na opłatę podstawową oraz opłatę priorytetową. Zaczynają się bajtem `0x02` i zawierają takie pola jak `maxPriorityFeePerGas` i `maxFeePerGas`. Transakcje typu 2 są teraz domyślnymi, ze względu na ich elastyczność i wydajność, są szczególnie preferowanie podczas okresów dużego przeciążenia sieci ze względu na zdolność pomagania użytkownikom w zarządzaniu opłatami transakcyjnymi w bardziej przewidywalny sposób. Wartość TransactionType dla tych transakcji wynosi `0x2`.



## Dodatkowo przeczytaj {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Konta](/developers/docs/accounts/)
- [Maszyna wirtualna Ethereum (EVM)](/developers/docs/evm/)
- [Paliwo](/developers/docs/gas/)
