---
title: Transakcje
description: Przegląd transakcji w Ethereum – jak działają, ich struktura danych oraz jak je wysyłać za pośrednictwem aplikacji.
lang: pl
---

Transakcje to kryptograficznie podpisane instrukcje pochodzące z kont. Konto inicjuje transakcję w celu aktualizacji stanu sieci [Ethereum](/). Najprostszą transakcją jest transfer ETH z jednego konta na drugie.

## Wymagania wstępne {#prerequisites}

Aby pomóc Ci lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [kontach](/developers/docs/accounts/) oraz nasze [wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest transakcja? {#whats-a-transaction}

Transakcja w Ethereum odnosi się do akcji zainicjowanej przez konto posiadane zewnętrznie, czyli konto zarządzane przez człowieka, a nie przez kontrakt. Na przykład, jeśli Bob wysyła Alice 1 ETH, konto Boba musi zostać obciążone, a konto Alice uznane. Ta zmieniająca stan akcja ma miejsce w ramach transakcji.

![Diagram showing a transaction cause state change](./tx.png)
_Schemat na podstawie [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transakcje, które zmieniają stan EVM, muszą zostać rozgłoszone w całej sieci. Każdy węzeł może rozgłosić żądanie wykonania transakcji w EVM; po tym walidator wykona transakcję i roześle wynikową zmianę stanu do reszty sieci.

Transakcje wymagają opłaty i muszą zostać włączone do zwalidowanego bloku. Aby uprościć ten przegląd, opłaty za gaz i walidację omówimy w innym miejscu.

Przesłana transakcja zawiera następujące informacje:

- `from` – adres nadawcy, który będzie podpisywał transakcję. Będzie to konto posiadane zewnętrznie, ponieważ konta kontraktów nie mogą wysyłać transakcji
- `to` – adres odbiorcy (jeśli jest to konto posiadane zewnętrznie, transakcja przetransferuje wartość. Jeśli jest to konto kontraktu, transakcja wykona kod kontraktu)
- `signature` – identyfikator nadawcy. Jest on generowany, gdy klucz prywatny nadawcy podpisuje transakcję i potwierdza, że nadawca autoryzował tę transakcję
- `nonce` - sekwencyjnie rosnący licznik, który wskazuje numer transakcji z danego konta
- `value` – ilość ETH do przetransferowania od nadawcy do odbiorcy (wyrażona w wei, gdzie 1 ETH równa się 1e+18 wei)
- `input data` – opcjonalne pole do dołączenia dowolnych danych
- `gasLimit` – maksymalna ilość jednostek gazu, która może zostać zużyta przez transakcję. [EVM](/developers/docs/evm/opcodes) określa jednostki gazu wymagane przez każdy krok obliczeniowy
- `maxPriorityFeePerGas` - maksymalna cena zużytego gazu, która ma zostać uwzględniona jako opłata priorytetowa dla walidatora
- `maxFeePerGas` - maksymalna opłata za jednostkę gazu, jaką użytkownik jest skłonny zapłacić za transakcję (obejmuje `baseFeePerGas` oraz `maxPriorityFeePerGas`)

Gaz odnosi się do obliczeń wymaganych do przetworzenia transakcji przez walidatora. Użytkownicy muszą uiścić opłatę za te obliczenia. `gasLimit` oraz `maxPriorityFeePerGas` określają maksymalną opłatę transakcyjną płaconą walidatorowi. [Więcej o gazie](/developers/docs/gas/).

Obiekt transakcji będzie wyglądał mniej więcej tak:

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

Jednak obiekt transakcji musi zostać podpisany przy użyciu klucza prywatnego nadawcy. Dowodzi to, że transakcja mogła pochodzić tylko od nadawcy i nie została wysłana w sposób oszukańczy.

Klient Ethereum, taki jak Geth, zajmie się tym procesem podpisywania.

Przykładowe wywołanie [JSON-RPC](/developers/docs/apis/json-rpc):

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

- `raw` to podpisana transakcja w formie zakodowanej za pomocą [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` to podpisana transakcja w formacie JSON

Dzięki hashowi podpisu można kryptograficznie udowodnić, że transakcja pochodzi od nadawcy i została przesłana do sieci.

### Pole danych {#the-data-field}

Zdecydowana większość transakcji uzyskuje dostęp do kontraktu z konta posiadanego zewnętrznie.
Większość kontraktów jest napisana w języku Solidity i interpretuje swoje pole danych zgodnie z [binarnym interfejsem aplikacji (ABI)](/glossary/#abi).

Pierwsze cztery bajty określają, którą funkcję wywołać, używając hasha nazwy funkcji i jej argumentów.
Czasami można zidentyfikować funkcję na podstawie selektora, korzystając z [tej bazy danych](https://www.4byte.directory/signatures/).

Reszta danych wywołania to argumenty, [zakodowane zgodnie ze specyfikacją ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Na przykład, spójrzmy na [tę transakcję](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Użyj **Click to see More**, aby zobaczyć dane wywołania.

Selektor funkcji to `0xa9059cbb`. Istnieje kilka [znanych funkcji z tym podpisem](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
W tym przypadku [kod źródłowy kontraktu](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) został przesłany do Etherscan, więc wiemy, że funkcja to `transfer(address,uint256)`.

Reszta danych to:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Zgodnie ze specyfikacją ABI, wartości całkowite (takie jak adresy, które są 20-bajtowymi liczbami całkowitymi) pojawiają się w ABI jako 32-bajtowe słowa, uzupełnione zerami z przodu.
Więc wiemy, że adres `to` to [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` to 0x3b0559f4 = 990206452.

### Deskryptory transakcji {#transaction-descriptors}

Ponieważ pole danych zawiera nieprzejrzyste bajty szesnastkowe, weryfikacja tego, jaką akcję faktycznie wykona transakcja, może być niezwykle trudna. Ta podatność związana z „ślepym podpisywaniem” (blind signing) jest rozwiązywana przez **[Clear Signing](https://clearsigning.org/)** poprzez użycie [deskryptorów transakcji](https://eips.ethereum.org/EIPS/eip-7730) (zdefiniowanych przez ERC-7730).  

Specyfikacja ERC-7730 wykorzystuje deskryptory transakcji (często ustrukturyzowane jako pliki JSON) do wzbogacania danych znajdujących się w ABI i ustrukturyzowanych wiadomościach, takich jak dane wywołania transakcji EVM, wiadomości EIP-712 oraz operacje użytkownika (User Operations) EIP-4337. Programiści używają tych deskryptorów do mapowania określonych zmiennych transakcji bezpośrednio na szablony formatowania, zapewniając, że podstawowe dane pozostają czytelne maszynowo dla aplikacji.

Na frontendzie portfele używają tego kontekstu formatowania do tłumaczenia nieprzejrzystego kodu bajtowego na jasne, czytelne dla człowieka informacje. Dzięki automatycznemu rozwiązywaniu wartości, takich jak adresy tokenów na rozpoznawalne symbole (tickery) lub kwoty na ułamki dziesiętne, użytkownikom przedstawiane jest podsumowanie dokładnej intencji transakcji w prostym języku (np. „Wymiana 1000 USDC na co najmniej 0,25 WETH”) przed jej podpisaniem.

## Typy transakcji {#types-of-transactions}

W Ethereum istnieje kilka różnych typów transakcji:

- Zwykłe transakcje: transakcja z jednego konta na drugie.
- Transakcje wdrożenia kontraktu: transakcja bez adresu „do” (to), w której pole danych jest używane na kod kontraktu.
- Wykonanie kontraktu: transakcja, która wchodzi w interakcję z wdrożonym inteligentnym kontraktem. W tym przypadku adresem „do” (to) jest adres inteligentnego kontraktu.

### O gazie {#on-gas}

Jak wspomniano, wykonanie transakcji kosztuje [gaz](/developers/docs/gas/). Proste transakcje transferu wymagają 21000 jednostek gazu.

Więc aby Bob mógł wysłać Alice 1 ETH przy `baseFeePerGas` wynoszącej 190 gwei i `maxPriorityFeePerGas` wynoszącej 10 gwei, Bob będzie musiał zapłacić następującą opłatę:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Konto Boba zostanie obciążone kwotą **-1,0042 ETH** (1 ETH dla Alice + 0,0042 ETH w opłatach za gaz)

Konto Alice zostanie uznane kwotą **+1,0 ETH**

Opłata podstawowa zostanie spalona **-0,00399 ETH**

Walidator zatrzymuje opłatę priorytetową **+0,000210 ETH**


![Diagram showing how unused gas is refunded](./gas-tx.png)
_Schemat na podstawie [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Wszelki gaz niewykorzystany w transakcji jest zwracany na konto użytkownika.

### Interakcje z inteligentnymi kontraktami {#smart-contract-interactions}

Gaz jest wymagany dla każdej transakcji, która obejmuje inteligentny kontrakt.

Inteligentne kontrakty mogą również zawierać funkcje znane jako funkcje [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) lub [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), które nie zmieniają stanu kontraktu. W związku z tym wywoływanie tych funkcji z EOA nie będzie wymagało żadnego gazu. Podstawowym wywołaniem RPC dla tego scenariusza jest [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

W przeciwieństwie do dostępu za pomocą `eth_call`, te funkcje `view` lub `pure` są również powszechnie wywoływane wewnętrznie (tj. z samego kontraktu lub z innego kontraktu), co kosztuje gaz.

## Cykl życia transakcji {#transaction-lifecycle}

Po przesłaniu transakcji dzieje się co następuje:

1. Hash transakcji jest generowany kryptograficznie:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transakcja jest następnie rozgłaszana w sieci i dodawana do puli transakcji składającej się ze wszystkich innych oczekujących transakcji sieciowych.
3. Walidator musi wybrać Twoją transakcję i włączyć ją do bloku, aby zweryfikować transakcję i uznać ją za „udaną”.
4. Z upływem czasu blok zawierający Twoją transakcję zostanie zaktualizowany do statusu „uzasadniony”, a następnie „sfinalizowany”. Te aktualizacje dają znacznie większą pewność, że Twoja transakcja zakończyła się sukcesem i nigdy nie zostanie zmieniona. Gdy blok zostanie „sfinalizowany”, mógłby zostać zmieniony tylko przez atak na poziomie sieci, który kosztowałby wiele miliardów dolarów.

## Wizualne demo {#a-visual-demo}

Zobacz, jak Austin przeprowadza Cię przez transakcje, gaz i kopanie.

<VideoWatch slug="transactions-eth-build" />

## Typed Transaction Envelope {#typed-transaction-envelope}

Ethereum początkowo miało jeden format transakcji. Każda transakcja zawierała nonce, cenę gazu, limit gazu, adres odbiorcy (to), wartość, dane, v, r oraz s. Pola te są [zakodowane w RLP](/developers/docs/data-structures-and-encoding/rlp/), aby wyglądać mniej więcej tak:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum ewoluowało, aby obsługiwać wiele typów transakcji, co pozwala na wdrożenie nowych funkcji, takich jak listy dostępu i [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), bez wpływu na starsze formaty transakcji.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) to to, co pozwala na takie zachowanie. Transakcje są interpretowane jako:

`TransactionType || TransactionPayload`

Gdzie pola są zdefiniowane jako:

- `TransactionType` - liczba od 0 do 0x7f, co daje łącznie 128 możliwych typów transakcji.
- `TransactionPayload` - dowolna tablica bajtów zdefiniowana przez typ transakcji.

Na podstawie wartości `TransactionType`, transakcję można sklasyfikować jako:

1. **Transakcje typu 0 (Legacy):** Oryginalny format transakcji używany od uruchomienia Ethereum. Nie zawierają one funkcji z [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), takich jak dynamiczne obliczanie opłat za gaz czy listy dostępu dla inteligentnych kontraktów. Starsze transakcje nie mają określonego prefiksu wskazującego ich typ w zserializowanej formie, zaczynając się od bajtu `0xf8` przy użyciu kodowania [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp). Wartość TransactionType dla tych transakcji to `0x0`.

2. **Transakcje typu 1:** Wprowadzone w [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) jako część [aktualizacji Berlin](/ethereum-forks/#berlin) w Ethereum, transakcje te zawierają parametr `accessList`. Lista ta określa adresy i klucze pamięci masowej, do których transakcja spodziewa się uzyskać dostęp, pomagając potencjalnie zmniejszyć koszty [gazu](/developers/docs/gas/) dla złożonych transakcji obejmujących inteligentne kontrakty. Zmiany na rynku opłat z EIP-1559 nie są uwzględnione w transakcjach typu 1. Transakcje typu 1 zawierają również parametr `yParity`, który może wynosić `0x0` lub `0x1`, wskazując parzystość wartości y podpisu secp256k1. Są one identyfikowane przez to, że zaczynają się od bajtu `0x01`, a ich wartość TransactionType to `0x1`.

3. **Transakcje typu 2**, powszechnie określane jako transakcje EIP-1559, to transakcje wprowadzone w [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), w aktualizacji London w Ethereum. Stały się one standardowym typem transakcji w sieci Ethereum. Transakcje te wprowadzają nowy mechanizm rynku opłat, który poprawia przewidywalność poprzez rozdzielenie opłaty transakcyjnej na opłatę podstawową i opłatę priorytetową. Zaczynają się od bajtu `0x02` i zawierają pola takie jak `maxPriorityFeePerGas` oraz `maxFeePerGas`. Transakcje typu 2 są obecnie domyślne ze względu na ich elastyczność i wydajność, szczególnie preferowane w okresach dużego przeciążenia sieci ze względu na ich zdolność do pomagania użytkownikom w bardziej przewidywalnym zarządzaniu opłatami transakcyjnymi. Wartość TransactionType dla tych transakcji to `0x2`.

4. **Transakcje typu 3 (Blob)** zostały wprowadzone w [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) jako część [aktualizacji Dencun](/ethereum-forks/#dencun) w Ethereum. Transakcje te są zaprojektowane do wydajniejszej obsługi danych typu „blob” (Binary Large Objects), co w szczególności przynosi korzyści rollupom warstwy 2 (L2), zapewniając sposób na publikowanie danych w sieci Ethereum po niższych kosztach. Transakcje blob zawierają dodatkowe pola, takie jak `blobVersionedHashes`, `maxFeePerBlobGas` oraz `blobGasPrice`. Zaczynają się od bajtu `0x03`, a ich wartość TransactionType to `0x3`. Transakcje blob stanowią znaczną poprawę w zakresie dostępności danych i możliwości skalowania Ethereum.

5. **Transakcje typu 4** zostały wprowadzone w [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) jako część [aktualizacji Pectra](/roadmap/pectra/) w Ethereum. Transakcje te są zaprojektowane tak, aby były kompatybilne w przód z abstrakcją konta. Pozwalają one kontom EOA tymczasowo zachowywać się jak konta kontraktów bez narażania ich oryginalnej funkcjonalności. Zawierają one parametr `authorization_list`, który określa inteligentny kontrakt, któremu EOA deleguje swoje uprawnienia. Po transakcji pole kodu EOA będzie zawierało adres delegowanego inteligentnego kontraktu.

## Dalsza lektura {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Konta](/developers/docs/accounts/)
- [Wirtualna maszyna Ethereum (EVM)](/developers/docs/evm/)
- [Gaz](/developers/docs/gas/)