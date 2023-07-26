---
title: Transakcje
description: Przegląd transakcji Ethereum – sposób działania, struktury danych i metody wysyłania za pośrednictwem aplikacji.
lang: pl
isOutdated: true
---

Transakcje to podpisane kryptograficznie instrukcje od kont. Konto inicjuje transakcję, aby zaktualizować stan sieci Ethereum. Najprostszą transakcją jest przeniesienie ETH z jednego konta na drugie.

## Warunki wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytanie rozdziału <a href="/developers/docs/accounts/">Konta</a> i naszego [Wprowadzenia do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest transakcja? {#whats-a-transaction}

Transakcja Ethereum odnosi się do działania zainicjowanego przez konto będące własnością zewnętrzną, innymi słowy konto zarządzane przez człowieka, a nie przez kontrakt. Na przykład, jeśli Bob wysyła Alice 1 ETH, na koncie Boba musi się pojawić obciążenie, a na koncie Alice uznanie. Ta zmiana stanu ma miejsce w ramach transakcji.

![Schemat pokazujący transakcję powodującą zmianę stanu](../../../../../developers/docs/transactions/tx.png) _Schemat zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transakcje, które zmieniają stan EVM, muszą być transmitowane na całą sieć. Każdy węzeł może rozesłać prośbę o wykonanie transakcji na EVM; po tym wydarzeniu górnik wykona transakcję i roześle powstałą zmianę stanu do reszty sieci.

Transakcje wymagają opłaty i muszą być wydobyte, aby stały się ważne. Aby uprościć ten przegląd, omówimy opłaty za gaz i wydobycie w innym miejscu.

Przedłożona transakcja zawiera następujące informacje:

- `recipient` – adres odbiorcy (w przypadku konta z właścicielem zewnętrznym transakcja przekaże wartość. W przypadku konta kontraktu transakcja wykona kod konta)
- `signature` – identyfikator nadawcy. Jest generowany, gdy klucz prywatny nadawcy podpisuje transakcję i potwierdza, że nadawca autoryzował tę transakcję
- `value` – kwota ETH do przelania od nadawcy do odbiorcy (w WEI, wartość nominalna ETH)
- `data` – opcjonalne pole do umieszczenia dowolnych danych
- `gasLimit` – maksymalna ilość jednostek gazu, które mogą zostać zużyte w trakcie transakcji. Jednostki gazu reprezentują kroki obliczeniowe
- `gasPrice` – opłata wnoszona przez nadawcę za jednostkę gazu

Gaz jest odniesieniem do obliczeń wymaganych do przetworzenia transakcji przez górnika. Użytkownicy muszą wnieść opłatę za to obliczenie. `gasLimit` i `gasPrice` określają maksymalną opłatę transakcyjną na rzecz górnika. [Więcej o gazie](/developers/docs/gas/).

Obiekt transakcji będzie wyglądał mniej więcej w ten sposób:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  gasPrice: "200",
  nonce: "0",
  value: "10000000000",
}
```

Obiekt transakcji musi być podpisany przy użyciu klucza prywatnego nadawcy. Dowodzi to, że transakcja mogła pochodzić jedynie od nadawcy i nie została wysłana w sposób oszukańczy.

Klient Ethereum, taki jak Geth obsługuje ten proces podpisywania.

Przykład wywołania [JSON-RPC](https://eth.wiki/json-rpc/API):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "gasPrice": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Przykład odpowiedzi:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "gasPrice": "0x1234",
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

- `raw` to podpisana transakcja w kodowanym formacie RLP
- `tx` jest podpisaną transakcją w formacie JSON

Dzięki skrótowi podpisu można udowodnić kryptograficznie, że transakcja pochodzi od nadawcy i została przesłana do sieci.

### Gaz {#on-gas}

Jak już wspomniano, wykonanie transakcji kosztuje [gaz](/developers/docs/gas/). Proste transakcje transferu wymagają 21 000 jednostek gazu.

Więc aby Bob wysłał Alice 1 ETH przy `gasPrice` 200 Gwei, będzie musiał wnieść następującą opłatę:

```
200*21000 = 4 200 000 GWEI
--lub--
0,0042 ETH
```

Konto Boba zostanie obciążone **-1,0042 ETH**

Konto Alicji zostanie zasilone **+1,0 ETH**

Górnik przetwarzający transakcję otrzyma **+0,0042 ETH**

Gaz jest również potrzebny do każdej interakcji kontraktów inteligentnych.

![Schemat przedstawiający sposób zwrotu kosztów niewykorzystanego gazu](../../../../../developers/docs/transactions/gas-tx.png) _Schemat zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gaz niewykorzystany w transakcji jest zwracany na konto użytkownika.

## Cykl życiowy transakcji {#transaction-lifecycle}

Po przesłaniu transakcji nastąpią następujące wydarzenia:

1. Po wysłaniu transakcji kryptografia generuje hash: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Transakcja jest następnie rozsyłana w sieci i włączana do puli obejmującej wiele innych transakcji.
3. Górnik musi wybrać transakcję i umieścić w bloku, aby ją zweryfikować transakcję i uznać za „udaną”.
   - Możesz skończyć, oczekując na tym etapie, jeśli sieć jest zajęta i górnicy nie są w stanie nadążyć. Górnicy zawsze będą traktować priorytetowo transakcje z wyższą `GASPRICE`, ponieważ będą mogli zatrzymać opłaty.
4. Twoja transakcja otrzyma również numer potwierdzenia bloku. Jest to liczba bloków utworzonych od bloku, w którym Twoja transakcja została uwzględniona. Im większa liczba, tym większa pewność, że transakcja została przetworzona i rozpoznana przez sieć. Dzieje się tak dlatego, że czasami blok, w którym zawarta była Twoja transakcja, mógł nie trafić do łańcucha.
   - Im większy numer potwierdzenia bloku, tym bardziej niezmienna jest transakcja. Tak więc w przypadku transakcji o wyższej wartości pożądane może być więcej potwierdzeń bloków.

## Demo wizualne {#a-visual-demo}

Zobacz, jak Austin przeprowadzi Cię przez transakcje, gaz i wydobycie.

<YouTube id="er-0ihqFQB0" />

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Konta](/developers/docs/accounts/)
- [Maszyna wirtualna Ethereum (EVM)](/developers/docs/evm/)
- [Paliwo](/developers/docs/gas/)
- [Wydobycie](/developers/docs/consensus-mechanisms/pow/mining/)
