---
title: Pectra MaxEB
description: Dowiedz się więcej o MaxEB w wydaniu Pectra
lang: pl
---

# MaxEB {#maxeb}

_tl;dr:_ Hard fork Pectra pozwala walidatorom Ethereum na zdecydowanie się na wyższe maksymalne efektywne saldo i kapitalizację poprzez konwersję poświadczeń wypłat z **Typu 1** na **Typ 2**. Oficjalnym narzędziem do tego jest Launchpad. Ta operacja jest nieodwracalna.

## Przegląd {#overview}

### Kogo to dotyczy? {#who-is-affected}

Każdy, kto uruchamia walidatora – to prawdopodobnie ktoś, kto zna indeks (np. [Walidator #12345](https://beaconcha.in/validator/12345)) walidatora, którego kontroluje. Jeśli używasz protokołu do uruchomienia walidatora (np. Lido CSM lub Rocket Pool), musisz sprawdzić u nich, czy i kiedy będą obsługiwać maxEB.

Jeśli stakujesz za pomocą tokenu płynnego stakowania (np. rETH lub stETH), żadne działanie nie jest wymagane ani zalecane.

### Czym jest "maxEB"? {#what-is-maxeb}

maxEB = MAXymalne Efektywne Saldo walidatora. Do czasu hard forka Pectra każdy walidator zarabia na maksymalnie 32 ETH. Po Pectra walidatorzy mają możliwość zarabiania na dowolnym saldzie między 32 a 2048 ETH, w przyrostach co 1 ETH, decydując się na tę zmianę.

### Jak walidator może się na to zdecydować? {#how-does-a-validator-opt-in}

Walidator decyduje się na zmianę maxEB poprzez konwersję poświadczeń wypłat z **Typu 1** na **Typ 2**. Można to zrobić na [Launchpad (Akcje walidatora)](https://launchpad.ethereum.org/validator-actions) po uruchomieniu hard forka Pectra. Podobnie jak w przypadku **Typu 0** → **Typu 1**, konwersja z **Typu 1** → **Typu 2** jest procesem nieodwracalnym.

### Czym są poświadczenia wypłaty? {#whats-a-withdrawal-credential}

Gdy uruchamiasz walidatora, masz zestaw poświadczeń wypłaty. Można je znaleźć w pliku json z danymi depozytu lub można je zobaczyć na stronie beaconcha.in swojego walidatora w [zakładce depozytów](https://beaconcha.in/validator/12345#deposits).

1. **Poświadczenia wypłat typu 0**: Jeśli poświadczenia wypłat Twojego walidatora zaczynają się od `0x00...`, dokonałeś/aś depozytu przed hard forkiem Shapella i nie masz jeszcze ustawionego adresu wypłat.

![Poświadczenie wypłaty typu 0](./0x00-wd.png)

2. **Poświadczenia wypłat typu 1**: Jeśli poświadczenia wypłat Twojego walidatora zaczynają się od `0x01...`, dokonałeś/aś depozytu po hard forku Shapella lub już dokonałeś/aś konwersji swoich poświadczeń **typu 0** na poświadczenia **typu 1**.

![Poświadczenie wypłaty typu 1](./0x01-wd.png)

3. **Poświadczenia wypłat typu 2**: Ten nowy typ poświadczeń wypłat będzie zaczynać się od `0x02...` i zostanie włączony po Pectra. Walidatorzy z poświadczeniami wypłat **typu 2** są czasami nazywani "**walidatorami kapitalizującymi**"

| **Dozwolone**   | **Niedozwolone** |
| --------------- | ---------------- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2  |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0  |
|                 | ❌ Typ 2 → Typ 1  |
|                 | ❌ Typ 2 → Typ 0  |

### Zagrożenia {#risks}

MaxEB umożliwia walidatorowi wysłanie całego swojego salda do innego walidatora. Użytkownicy przesyłający żądanie konsolidacji powinni zweryfikować źródło i zawartość transakcji, którą podpisują. Oficjalnym narzędziem do korzystania z funkcji maxEB jest Launchpad. Jeśli zdecydujesz się na użycie narzędzia innej firmy, powinieneś/aś zweryfikować, czy:

- Klucz publiczny i adres wypłat walidatora źródłowego odpowiadają walidatorowi, którego kontrolują
- Klucz publiczny walidatora docelowego jest prawidłowy i należy do nich
- Żądanie jest konwersją, a nie konsolidacją, jeśli nie zamierzają wysyłać środków do innego walidatora
- Transakcja jest podpisywana przez prawidłowy adres wypłat

**Zdecydowanie zalecamy** omówienie każdego narzędzia innej firmy, którego planujesz użyć, ze [społecznością EthStaker](https://ethstaker.org/about). To pomocne miejsce do sprawdzenia poprawności swojego podejścia i uniknięcia błędów. Jeśli użyjesz złośliwego lub źle skonfigurowanego narzędzia, **całe saldo Twojego walidatora może zostać wysłane do walidatora, którego nie kontrolujesz** — bez możliwości odzyskania go.

## Szczegóły techniczne {#technical-details}

### Przepływ {#the-flow}

Będą dwa zastosowania operacji `ConsolidationRequest`:

1. Konwersja istniejącego walidatora z walidatora **Typu 1** na **Typ 2**
2. Konsolidacja innych walidatorów w istniejącym walidatorze **Typu 2**

W przypadku konwersji walidatora **Typu 1** na walidatora **Typu 2** zarówno _źródłem_, jak i _celem_ będzie walidator, którego konwertujesz. Operacja będzie kosztować gaz i zostanie umieszczona w kolejce za innymi żądaniami konsolidacji. Ta kolejka jest **oddzielna** od kolejki depozytów, nie wpływają na nią nowe depozyty walidatorów i można ją zobaczyć na [pectrified.com](https://pectrified.com/).

Aby skonsolidować walidatorów, musisz mieć _walidatora docelowego_, który posiada poświadczenie wypłaty **Typu 2**. Jest to miejsce docelowe wszelkich konsolidowanych sald walidatorów oraz zachowywany indeks.

### Wymagania dotyczące konwersji na Typ 2 {#requirements-for-converting-to-type-2}

Będzie to wymagane dla pierwszego walidatora, którego konwertujesz na **Typ 2**. Indeks tego walidatora jest zachowany i aktywny. W przypadku konwersji, _walidator źródłowy_ == _walidator docelowy_.

Walidator musi...

- być aktywny
- posiadać poświadczenia wypłat **Typu 1**
- nie być w stanie wyjścia (ani po slashingu)
- nie mieć oczekujących, ręcznie uruchomionych wypłat (nie dotyczy operacji sweep)

![ilustracja konwersji](./conversion.png)

### Wymagania dotyczące konsolidacji {#requirements-for-consolidating}

Jest to _ta sama operacja_ co konwersja, ale ma miejsce, gdy _walidator źródłowy_ jest inny niż _walidator docelowy_. Indeks walidatora docelowego jest zachowany i akceptuje saldo od walidatora źródłowego. Indeks walidatora źródłowego jest przełączany w stan `EXITED`.

W tym przypadku walidator źródłowy ma wszystkie te same wymagania co powyżej, a dodatkowo:

- był aktywny przez co najmniej ~27,3 godziny (jeden `SHARD_COMMITTEE_PERIOD`)

Walidator docelowy musi

- posiadać poświadczenia wypłat **Typu 2**
- nie być w stanie wyjścia.

![ilustracja konsolidacji](./consolidation.png)

### Żądanie konsolidacji {#the-consolidation-request}

Żądanie konsolidacji zostanie podpisane przez adres wypłat powiązany z walidatorem źródłowym i będzie zawierać:

1. Adres walidatora źródłowego (np. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Klucz publiczny walidatora źródłowego (np. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Klucz publiczny tego walidatora docelowego

W przypadku konwersji pozycje 2 i 3 będą takie same. Tę operację można wykonać w [Launchpadzie](https://launchpad.ethereum.org/).

### Wymagania dotyczące podpisywania {#signing-requirements}

Aby przesłać `ConsolidationRequest`, **adres wypłat walidatora źródłowego** musi podpisać żądanie. Dowodzi to kontroli nad środkami walidatora.

### Co jest podpisywane? {#what-is-signed}

Używany jest oddzielony domeną [główny element podpisu (signing root)](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) obiektu `ConsolidationRequest`.

- **Domena:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Pola głównego elementu podpisu:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Wynikowy **podpis BLS** jest przesyłany wraz z żądaniem.

Uwaga: Podpis jest składany przez adres wypłat, a nie przez klucz walidatora.

### Wypłaty częściowe {#partial-withdrawals}

Walidatorzy z poświadczeniami **Typu 1** otrzymują automatyczne, bezgazowe operacje sweep nadwyżki salda (wszystko powyżej 32 ETH) na swój adres wypłat. Ponieważ **Typ 2** pozwala walidatorowi na kapitalizację salda w przyrostach co 1 ETH, nie będzie automatycznie wykonywał operacji sweep salda, dopóki nie osiągnie ono 2048 ETH. Wypłaty częściowe na walidatorach **Typu 2** muszą być uruchamiane ręcznie i będą kosztować gaz.

## Narzędzia do konsolidacji {#consolidation-tooling}

Dostępnych jest kilka narzędzi do zarządzania konsolidacjami. Oficjalnym narzędziem, stworzonym przez Fundację Ethereum, jest [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Istnieją również narzędzia firm trzecich, stworzone przez podmioty ze społeczności stakingowej, które mogą oferować funkcje niedostępne w Launchpadzie. Chociaż przedstawione tutaj narzędzia nie są audytowane ani wspierane przez Fundację Ethereum, poniżej znajdują się narzędzia open-source stworzone przez znanych członków społeczności.

| Narzędzie                          | Strona internetowa                                                                                        | Otwarte źródło                  | Twórca                                         | Skontrolowany                                                                                                                                       | Interfejs                                                                                  | Warte uwagi funkcje                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Pectra Staking Manager             | pectrastaking.com                                                                         | Tak, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Nie                                                                                                                                                 | Interfejs sieciowy                                                                         | Wallet Connect, działa z SAFE                                    |
| Narzędzie CLI Pectra Validator Ops | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Tak, MIT                        | [Luganodes](https://www.luganodes.com/)        | Tak, Quantstamp [Maj 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Wiersz poleceń                                                                             | Przetwarzanie wsadowe, dla wielu walidatorów jednocześnie        |
| Ethereal                           | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Tak, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Nie                                                                                                                                                 | Wiersz poleceń                                                                             | Pełny zestaw funkcji do zarządzania walidatorami i węzłami       |
| Siren                              | [GitHub](https://github.com/sigp/siren)                                                                   | Tak, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Nie                                                                                                                                                 | Częściowo wiersz poleceń, ale głównie interfejs sieciowy                                   | Działa tylko, jeśli używasz klienta konsensusu Lighthouse        |
| Consolideth.app    | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Tak, licencje MIT               | [Stakely](https://stakely.io/)                 | Nie                                                                                                                                                 | Interfejs sieciowy, hostowany przez Stakely i gotowy do darmowego samodzielnego hostowania | Obsługuje główne połączenia portfeli, w tym Safe z WalletConnect |

## FAQ {#faq}

### Czy przystąpienie zmienia moje szczęście w propozycjach lub nagrody? {#change-luck-or-rewards}

Nie. Przystąpienie nie zmniejsza szansy na propozycję – Twoje obowiązki i wybór propozycji pozostają takie same. Na przykład, jeśli masz dwa walidatory 32 ETH w porównaniu z jednym walidatorem 64 ETH, będziesz mieć takie same całkowite szanse na wybór do zaproponowania bloku i zdobycia nagród.

### Czy przystąpienie zmienia moje ryzyko slashingu? {#change-slashing-risk}

Dla mniejszych lub nieprofesjonalnych operatorów krótka odpowiedź brzmi: nie. Dłuższa odpowiedź jest taka, że dla profesjonalnych operatorów uruchamiających wiele walidatorów na węzeł z szybkim systemem ostrzegania, konsolidacja w mniejszą liczbę walidatorów może zmniejszyć ich zdolność do reagowania na slashing i zapobiegania zdarzeniom kaskadowym. Początkowa _kara_ za slashing dla wszystkich walidatorów została drastycznie zmniejszona z 1 ETH (na 32 ETH) do 0,0078125 ETH (na 32 ETH), aby zrównoważyć to ryzyko.

### Czy muszę wyjść z walidatora, aby dokonać konwersji? {#exit-validator}

Nie. Możesz dokonać konwersji na miejscu, bez wychodzenia.

### Jak długo potrwa konwersja/konsolidacja? {#how-long}

Minimum 27,3 godziny, ale konsolidacje podlegają również kolejce. Ta kolejka jest niezależna od kolejek depozytów i wypłat i nie ma na nią wpływu.

### Czy mogę zachować swój indeks walidatora? {#keep-validator-index}

Tak. Konwersja na miejscu zachowuje ten sam indeks walidatora. Jeśli konsolidujesz wielu walidatorów, będziesz mógł zachować tylko indeks _walidatora docelowego_.

### Czy przegapię atestacje? {#miss-attestations}

Podczas konsolidacji w innego walidatora, walidator źródłowy jest wyłączany i następuje ~27-godzinny okres oczekiwania, zanim saldo stanie się aktywne na walidatorze docelowym. Okres ten **nie wpływa na wskaźniki wydajności**.

### Czy poniosę kary? {#incur-penalties}

Nie. Dopóki Twój walidator jest online, nie poniesiesz żadnych kar.

### Czy adresy wypłat konsolidowanych walidatorów muszą się zgadzać? {#withdrawal-addresses-match}

Nie. Ale _źródło_ musi autoryzować żądanie z własnego adresu.

### Czy moje nagrody będą się kapitalizować po konwersji? {#rewards-compound}

Tak. Z poświadczeniami **Typu 2** nagrody powyżej 32 ETH są automatycznie restakowane — ale nie natychmiast. Z powodu małego bufora (zwanego [_histerezą_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) Twoje saldo musi osiągnąć **około 1,25 ETH więcej**, zanim nadwyżka zostanie restakowana. Więc zamiast kapitalizacji przy 33,0 ETH, dzieje się to przy 33,25 (efektywne saldo = 33 ETH), potem przy 34,25 (efektywne saldo = 34 ETH) i tak dalej.

### Czy po konwersji nadal będę otrzymywać automatyczne operacje sweep? {#automatic-sweep}

Automatyczne operacje sweep będą miały miejsce tylko w przypadku sald przekraczających 2048. W przypadku wszystkich innych wypłat częściowych należy je uruchamiać ręcznie.

### Czy mogę zmienić zdanie i wrócić z Typu 2 do Typu 1? {#go-back-to-type1}

Nie. Konwersja na **Typ 2** jest nieodwracalna.

### Jeśli chcę skonsolidować wielu walidatorów, czy muszę najpierw przekonwertować każdego z nich na Typ 2? {#consolidate-multiple-validators}

Nie! Przekonwertuj jednego walidatora na Typ 2, a następnie użyj go jako celu. Wszystkie pozostałe walidatory skonsolidowane w tym celu typu 2 mogą być typu 1 lub typu 2

### Mój walidator jest offline lub ma poniżej 32 ETH - czy nadal mogę go przekonwertować? {#offline-or-below-32eth}

Tak. Dopóki jest aktywny (nie wyszedł z sieci) i możesz podpisywać się jego adresem wypłat, możesz go przekonwertować.

## Zasoby {#resources}

- [Specyfikacje konsensusu Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): To jest „najprawdziwsza” wersja, na której powinieneś/aś polegać. W razie wątpliwości przeczytaj specyfikacje
- Nie każdy czuje się komfortowo, przeglądając kod, więc [ten maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) może pomóc w interpretacji specyfikacji. _Zastrzeżenie: Należy polegać na specyfikacjach, a nie na sztucznej inteligencji, ponieważ sztuczna inteligencja może błędnie interpretować informacje lub generować halucynacje._
- [pectrified.com](https://pectrified.com/): Zobacz stan konsolidacji, depozytów i czasów oczekiwania w kolejce
- [Ethereal](https://github.com/wealdtech/ethereal): Stworzone przez społeczność narzędzie CLI do zarządzania typowymi zadaniami walidatora
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Stworzony przez społeczność kontrakt, który umożliwia zdeponowanie wielu walidatorów Ethereum w jednej transakcji
