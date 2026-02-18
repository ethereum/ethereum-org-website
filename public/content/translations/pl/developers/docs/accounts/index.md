---
title: Konta Ethereum
description: "Objaśnienie kont Ethereum – ich struktury danych i powiązania z kryptografią kluczy."
lang: pl
---

Konto Ethereum jest podmiotem dysponującym saldem eteru (ETH), które może wysyłać komunikaty na Ethereum. Konta mogą być kontrolowane przez użytkownika lub wdrażane jako inteligentne kontrakty.

## Wymagania wstępne {#prerequisites}

Aby pomóc Ci lepiej zrozumieć tę stronę, zalecamy najpierw przeczytanie naszego [wprowadzenia do Ethereum](/developers/docs/intro-to-ethereum/).

## Rodzaje kont {#types-of-account}

Ethereum ma dwa typy kont:

- Konto zewnętrzne (EOA) — kontrolowane przez każdego, kto ma klucze prywatne
- Konto kontraktu — inteligentny kontrakt wdrożony w sieci, kontrolowany przez kod. Dowiedz się więcej o [inteligentnych kontraktach](/developers/docs/smart-contracts/)

Oba typy kont mają możliwość:

- Odbierania, przechowywania i wysyłania ETH i tokenów
- Interakcji z wdrożonymi inteligentnymi kontraktami

### Kluczowe różnice {#key-differences}

**Konto zewnętrzne**

- Tworzenie konta nic nie kosztuje
- Może inicjować transakcje
- Transakcje między kontami zewnętrznymi mogą być tylko przelewami ETH/tokenów
- Składa się z pary kluczy kryptograficznych: kluczy publicznych i prywatnych, które kontrolują działania na koncie

**Kontrakt**

- Tworzenie kontraktu wiąże się z kosztami, ponieważ korzystasz z pamięci sieciowej
- Może wysyłać komunikaty jedynie w odpowiedzi na otrzymanie transakcji
- Transakcje z konta zewnętrznego na konto kontraktu mogą wyzwalać kod, który może wykonywać wiele różnych działań, takich jak przesyłanie tokenów, a nawet tworzenie nowego kontraktu
- Konta kontraktu nie mają kluczy prywatnych. W zamian są one kontrolowane przez logikę kodu inteligentnego kontraktu

## Analiza konta {#an-account-examined}

Konta Ethereum mają cztery pola:

- `nonce` – Licznik, który wskazuje liczbę transakcji wysłanych z konta należącego do podmiotu zewnętrznego lub liczbę kontraktów utworzonych przez konto kontraktu. Tylko jedna transakcja z danym nonce może być wykonana dla każdego konta, chroniąc przed atakami typu replay, w których podpisane transakcje są wielokrotnie rozgłaszane i ponownie wykonywane.
- `balance` – Liczba wei posiadanych przez ten adres. Wei to nominał ETH, a na jeden ETH przypada 1e+18 wei.
- `codeHash` – Ten hasz odnosi się do _kodu_ konta na Wirtualnej Maszynie Ethereum (EVM). Konta kontraktu mają zaprogramowane fragmenty kodu, które mogą wykonywać różne operacje. Ten kod EVM zostanie wykonany, jeśli konto otrzyma wiadomość wywoławczą. Nie można go zmienić, w przeciwieństwie do innych pól konta. Wszystkie takie fragmenty kodu są przechowywane w bazie danych stanu pod odpowiadającymi im skrótami w celu późniejszego odzyskania. Ta wartość hash jest znana jako codeHash. W przypadku kont zewnętrznych pole codeHash jest hashem pustego ciągu.
- `storageRoot` – Czasami określany jako hasz pamięci masowej. 256-bitowy hasz węzła głównego [drzewa Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), który koduje zawartość pamięci masowej konta (mapowanie między 256-bitowymi wartościami całkowitymi), zakodowany w drzewie jako mapowanie 256-bitowego haszu Keccak 256-bitowych kluczy całkowitych na zakodowane w RLP 256-bitowe wartości całkowite. Ten trie szyfruje hash zawartości pamięci tego konta i domyślnie jest pusty.

![Diagram przedstawiający budowę konta](./accounts.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Konta należące do podmiotów zewnętrznych i pary kluczy {#externally-owned-accounts-and-key-pairs}

Konto składa się z pary kryptograficznych kluczy: publicznego i prywatnego. Pomogą one udowodnić, że transakcja została faktycznie podpisana przez nadawcę i zapobiec fałszerstwom. Twój klucz prywatny jest tym, czego używasz do podpisywania transakcji, więc zapewnia Ci opiekę nad środkami powiązanymi z Twoim kontem. Tak naprawdę nigdy nie trzymasz kryptowaluty, trzymasz klucze prywatne – środki są zawsze w księdze Ethereum.

Zapobiega to nadawaniu fałszywych transakcji przez złośliwe podmioty, ponieważ zawsze możesz zweryfikować nadawcę transakcji.

Jeśli Alice chce wysłać ether ze swojego konta na konto Boba, Alice musi utworzyć prośbę o transakcję i wysłać ją do sieci w celu weryfikacji. Wykorzystanie kryptografii klucza publicznego przez Ethereum zapewnia, że ​​Alice może udowodnić, że pierwotnie zainicjowała żądanie transakcji. Bez mechanizmów kryptograficznych złośliwa Eve mogłaby po prostu publicznie rozesłać zapytanie, które wygląda jak „Wyślij 5 ETH z konta Alice na konto Eve”, i nikt nie byłby w stanie sprawdzić, czy nie pochodziło od Alice.

## Tworzenie konta {#account-creation}

Kiedy chcesz utworzyć konto, większość bibliotek wygeneruje losowy klucz prywatny.

Klucz prywatny składa się z 64 znaków szesnastkowych i może być zaszyfrowany hasłem.

Przykład:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Klucz publiczny jest generowany z klucza prywatnego przy użyciu [algorytmu podpisu cyfrowego krzywych eliptycznych](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Otrzymujesz publiczny adres dla swojego konta, biorąc ostatnie 20 bajtów haszu Keccak-256 klucza publicznego i dodając `0x` na początku.

Oznacza to, że konto należące do podmiotu zewnętrznego (EOA) ma 42-znakowy adres (20-bajtowy segment, który stanowi 40 znaków szesnastkowych plus prefiks `0x`).

Przykład:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Poniższy przykład pokazuje, jak używać narzędzia do podpisywania o nazwie [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) do generowania nowego konta. Clef to narzędzie do zarządzania kontami i podpisywania, które jest dołączone do klienta Ethereum, [Geth](https://geth.ethereum.org). Polecenie `clef newaccount` tworzy nową parę kluczy i zapisuje ją w zaszyfrowanym magazynie kluczy.

```
> clef newaccount --keystore <ścieżka>

Wprowadź hasło dla nowego konta, które ma zostać utworzone:
> <hasło>

------------
INFO [10-28|16:19:09.156] Wygenerowano nowy klucz address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Utwórz kopię zapasową pliku klucza path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Zapamiętaj swoje hasło!
Wygenerowano konto 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Dokumentacja Geth](https://geth.ethereum.org/docs)

Możliwe jest uzyskanie nowych kluczy publicznych z klucza prywatnego, ale nie można uzyskać klucza prywatnego z kluczy publicznych. Ważne jest, aby Twoje klucze prywatne były bezpieczne i, jak sama nazwa wskazuje, **PRYWATNE**.

Potrzebujesz klucza prywatnego do podpisywania wiadomości i transakcji, które generują podpis. Inni mogą wtedy wziąć podpis, aby uzyskać klucz publiczny, potwierdzając autora wiadomości. W swojej aplikacji możesz użyć biblioteki JavaScript do wysyłania transakcji do sieci.

## Konta kontraktów {#contract-accounts}

Konta kontraktu mają również 42-znakowy adres szesnastkowy:

Przykład:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Adres kontraktu jest zwykle podawany, gdy kontrakt jest wdrażany do Blockchainu Ethereum. Adres pochodzi z adresu twórcy i liczby transakcji wysłanych z tego adresu („nonce”).

## Klucze walidatora {#validators-keys}

W Ethereum istnieje również inny rodzaj klucza – został on wprowadzony, gdy Ethereum przeszło z konsensusu opartego na proof-of-work na proof-of-stake. Są to klucze „BLS”, służące do identyfikacji walidatorów. Klucze te mogą być skutecznie agregowane w celu zmniejszenia przepustowości wymaganej do osiągnięcia konsensusu w sieci. Bez tej agregacji kluczy minimalna stawka dla walidatora byłaby znacznie wyższa.

[Więcej o kluczach walidatora](/developers/docs/consensus-mechanisms/pos/keys/).

## Uwaga na temat portfeli {#a-note-on-wallets}

Konto nie jest portfelem. Portfel to interfejs lub aplikacja, która pozwala na wchodzenie w interakcję z Twoim kontem Ethereum, zarówno kontem zewnętrznym, jak i kontem kontraktu.

## Demonstracja wizualna {#a-visual-demo}

Obejrzyj, jak Austin opowiada o funkcji haszującej i parach kluczy.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Dalsza lektura {#further-reading}

- [Zrozumieć konta Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Transakcje](/developers/docs/transactions/)
