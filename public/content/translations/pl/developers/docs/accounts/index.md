---
title: Konta Ethereum
description: "Wyjaśnienie kont Ethereum – ich struktur danych i związku z kryptografią par kluczy."
lang: pl
---

[Konto](/) Ethereum to jednostka z saldem etheru (ETH), która może wysyłać wiadomości w sieci Ethereum. Konta mogą być kontrolowane przez użytkowników lub wdrożone jako inteligentne kontrakty.

## Wymagania wstępne {#prerequisites}

Aby pomóc Ci lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać nasze [wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Rodzaje kont {#types-of-account}

Ethereum ma dwa rodzaje kont:

- Konto posiadane zewnętrznie (EOA - Externally-owned account) – kontrolowane przez każdego, kto posiada klucze prywatne
- Konto kontraktu – inteligentny kontrakt wdrożony w sieci, kontrolowany przez kod. Dowiedz się więcej o [inteligentnych kontraktach](/developers/docs/smart-contracts/)

Oba rodzaje kont mają możliwość:

- Otrzymywania, przechowywania i wysyłania ETH oraz tokenów
- Interakcji z wdrożonymi inteligentnymi kontraktami

### Kluczowe różnice {#key-differences}

**Posiadane zewnętrznie (EOA)**

- Utworzenie konta nic nie kosztuje
- Może inicjować transakcje
- Transakcje między kontami posiadanymi zewnętrznie mogą być tylko transferami ETH/tokenów
- Składa się z kryptograficznej pary kluczy: klucza publicznego i prywatnego, które kontrolują aktywność konta

**Kontrakt**

- Utworzenie kontraktu wiąże się z kosztami, ponieważ wykorzystujesz pamięć sieci
- Może wysyłać wiadomości tylko w odpowiedzi na otrzymaną transakcję
- Transakcje z konta zewnętrznego na konto kontraktu mogą wyzwolić kod, który może wykonać wiele różnych akcji, takich jak transfer tokenów lub nawet utworzenie nowego kontraktu
- Konta kontraktów nie mają kluczy prywatnych. Zamiast tego są kontrolowane przez logikę kodu inteligentnego kontraktu

## Analiza konta {#an-account-examined}

Konta Ethereum mają cztery pola:

- `nonce` – Licznik wskazujący liczbę transakcji wysłanych z konta posiadanego zewnętrznie lub liczbę kontraktów utworzonych przez konto kontraktu. Dla każdego konta może zostać wykonana tylko jedna transakcja z danym nonce, co chroni przed atakami typu replay (powtórzenia), w których podpisane transakcje są wielokrotnie rozgłaszane i ponownie wykonywane.
- `balance` – Liczba wei posiadanych przez ten adres. Wei to nominał ETH, a na 1 ETH przypada 1e+18 wei.
- `codeHash` – Ten hash odnosi się do _kodu_ konta w Wirtualnej Maszynie Ethereum (EVM). Konta kontraktów mają zaprogramowane fragmenty kodu, które mogą wykonywać różne operacje. Ten kod EVM jest wykonywany, jeśli konto otrzyma wywołanie wiadomości. Nie można go zmienić, w przeciwieństwie do innych pól konta. Wszystkie takie fragmenty kodu są zawarte w bazie danych stanu pod odpowiadającymi im hashami w celu późniejszego pobrania. Ta wartość hasha jest znana jako codeHash. W przypadku kont posiadanych zewnętrznie pole codeHash jest hashem pustego ciągu znaków.
- `storageRoot` – Czasami znany jako hash pamięci (storage hash). 256-bitowy hash węzła głównego [drzewa Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), który koduje zawartość pamięci konta (mapowanie między 256-bitowymi wartościami całkowitymi), zakodowany w drzewie jako mapowanie z 256-bitowego hasha Keccak 256-bitowych kluczy całkowitych na zakodowane w RLP 256-bitowe wartości całkowite. To drzewo koduje hash zawartości pamięci tego konta i domyślnie jest puste.

![A diagram showing the make up of an account](./accounts.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Konta posiadane zewnętrznie i pary kluczy {#externally-owned-accounts-and-key-pairs}

Konto składa się z pary kluczy kryptograficznych: publicznego i prywatnego. Pomagają one udowodnić, że transakcja została faktycznie podpisana przez nadawcę i zapobiegają fałszerstwom. Twój klucz prywatny to to, czego używasz do podpisywania transakcji, więc daje Ci on pieczę nad środkami powiązanymi z Twoim kontem. Tak naprawdę nigdy nie posiadasz kryptowaluty, posiadasz klucze prywatne – środki zawsze znajdują się w księdze głównej Ethereum.

Zapobiega to rozgłaszaniu fałszywych transakcji przez złośliwych aktorów, ponieważ zawsze można zweryfikować nadawcę transakcji.

Jeśli Alice chce wysłać ether ze swojego konta na konto Boba, musi utworzyć żądanie transakcji i wysłać je do sieci w celu weryfikacji. Wykorzystanie przez Ethereum kryptografii klucza publicznego gwarantuje, że Alice może udowodnić, iż to ona pierwotnie zainicjowała żądanie transakcji. Bez mechanizmów kryptograficznych złośliwy przeciwnik Eve mógłby po prostu publicznie rozgłosić żądanie wyglądające mniej więcej tak: „wyślij 5 ETH z konta Alice na konto Eve”, a nikt nie byłby w stanie zweryfikować, że nie pochodzi ono od Alice.

## Tworzenie konta {#account-creation}

Kiedy chcesz utworzyć konto, większość bibliotek wygeneruje dla Ciebie losowy klucz prywatny.

Klucz prywatny składa się z 64 znaków szesnastkowych i może być zaszyfrowany hasłem.

Przykład:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Klucz publiczny jest generowany z klucza prywatnego przy użyciu [algorytmu podpisu cyfrowego opartego na krzywych eliptycznych (Elliptic Curve Digital Signature Algorithm)](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Otrzymujesz publiczny adres dla swojego konta, biorąc ostatnie 20 bajtów hasha Keccak-256 klucza publicznego i dodając `0x` na początku.

Oznacza to, że konto posiadane zewnętrznie (EOA) ma 42-znakowy adres (20-bajtowy segment, czyli 40 znaków szesnastkowych plus prefiks `0x`).

Przykład:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Poniższy przykład pokazuje, jak użyć narzędzia do podpisywania o nazwie [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) do wygenerowania nowego konta. Clef to narzędzie do zarządzania kontami i podpisywania, które jest dołączone do klienta Ethereum, [Geth](https://geth.ethereum.org). Polecenie `clef newaccount` tworzy nową parę kluczy i zapisuje je w zaszyfrowanym magazynie kluczy.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Dokumentacja Geth](https://geth.ethereum.org/docs)

Możliwe jest wyprowadzenie nowych kluczy publicznych z klucza prywatnego, ale nie można wyprowadzić klucza prywatnego z kluczy publicznych. Niezwykle ważne jest, aby dbać o bezpieczeństwo swoich kluczy prywatnych i, jak sama nazwa wskazuje, zachować je jako **PRYWATNE**.

Potrzebujesz klucza prywatnego do podpisywania wiadomości i transakcji, co generuje podpis. Inni mogą następnie użyć tego podpisu do wyprowadzenia Twojego klucza publicznego, udowadniając w ten sposób autora wiadomości. W swojej aplikacji możesz użyć biblioteki JavaScript do wysyłania transakcji do sieci.

## Konta kontraktów {#contract-accounts}

Konta kontraktów również mają 42-znakowy adres szesnastkowy:

Przykład:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Adres kontraktu jest zazwyczaj nadawany, gdy kontrakt jest wdrażany na blockchainie Ethereum. Adres pochodzi od adresu twórcy i liczby transakcji wysłanych z tego adresu („nonce”).

## Klucze walidatora {#validators-keys}

W Ethereum istnieje również inny rodzaj klucza, wprowadzony, gdy Ethereum przeszło z konsensusu opartego na dowodzie pracy (PoW) na dowód stawki (PoS). Są to klucze „BLS” i służą do identyfikacji walidatorów. Klucze te mogą być wydajnie agregowane w celu zmniejszenia przepustowości wymaganej przez sieć do osiągnięcia konsensusu. Bez tej agregacji kluczy minimalna stawka dla walidatora byłaby znacznie wyższa.

[Więcej o kluczach walidatora](/developers/docs/consensus-mechanisms/pos/keys/).

## Uwaga na temat portfeli {#a-note-on-wallets}

Konto to nie portfel. Portfel to interfejs lub aplikacja, która pozwala na interakcję z Twoim kontem Ethereum, niezależnie od tego, czy jest to konto posiadane zewnętrznie, czy konto kontraktu.

## Prezentacja wizualna {#a-visual-demo}

Zobacz, jak Austin przeprowadzi Cię przez funkcje hashujące i pary kluczy.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Dalsza lektura {#further-reading}

- [Zrozumienie kont Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Inteligentne kontrakty](/developers/docs/smart-contracts/)
- [Transakcje](/developers/docs/transactions/)