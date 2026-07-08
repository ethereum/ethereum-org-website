---
title: MaxEB
metaTitle: Pectra MaxEB
description: Dowiedz się więcej o MaxEB w aktualizacji Pectra
lang: pl
authors: ["Nixo"]
---

*W skrócie:* Twarde rozwidlenie Pectra pozwala walidatorom Ethereum na dobrowolne przejście na wyższe maksymalne saldo efektywne i kapitalizację odsetek poprzez konwersję danych uwierzytelniających wypłaty z **Typu 1** na **Typ 2**. Oficjalnym narzędziem do tego celu jest Launchpad. Ta operacja jest nieodwracalna.

## Przegląd {#overview}

### Kogo to dotyczy? {#who-is-affected}

Każdego, kto uruchamia walidator – prawdopodobnie jest to ktoś, kto zna indeks (np. [Walidator #12345](https://beaconcha.in/validator/12345)) kontrolowanego przez siebie walidatora. Jeśli używasz protokołu do uruchomienia walidatora (np. Lido CSM lub Rocket Pool), musisz sprawdzić u nich, czy i kiedy będą obsługiwać MaxEB.

Jeśli stakujesz używając tokena płynnego stakingu (LST) (np. rETH lub stETH), żadne działanie nie jest wymagane ani zalecane.

### Czym jest „MaxEB”? {#what-is-maxeb}

MaxEB = maksymalne saldo efektywne (MAXimum Effective Balance) walidatora. Do czasu twardego rozwidlenia Pectra, każdy walidator zarabia na maksymalnie 32 ETH. Po aktualizacji Pectra, walidatory mają możliwość zarabiania na dowolnym saldzie od 32 do 2048 ETH, w krokach co 1 ETH, decydując się na tę zmianę.

### Jak walidator może dołączyć? {#how-does-a-validator-opt-in}

Walidator decyduje się na zmianę MaxEB poprzez konwersję danych uwierzytelniających wypłaty z **Typu 1** na **Typ 2**. Można to zrobić na platformie [Launchpad (Akcje walidatora)](https://launchpad.ethereum.org/validator-actions) po wejściu w życie twardego rozwidlenia Pectra. Podobnie jak w przypadku **Typu 0** → **Typ 1**, konwersja z **Typu 1** → **Typ 2** jest procesem nieodwracalnym.

### Czym są dane uwierzytelniające wypłaty? {#whats-a-withdrawal-credential}

Kiedy uruchamiasz walidator, posiadasz zestaw danych uwierzytelniających wypłaty. Można je znaleźć w pliku JSON z danymi depozytu lub wyświetlić w [zakładce depozytów](https://beaconcha.in/validator/12345#deposits) Twojego walidatora na beaconcha.in.

1. Dane uwierzytelniające wypłaty **Typu 0**: Jeśli dane uwierzytelniające wypłaty Twojego walidatora zaczynają się od `0x00...`, dokonałeś depozytu przed twardym rozwidleniem Shapella i nie masz jeszcze ustawionego adresu wypłaty.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Dane uwierzytelniające wypłaty **Typu 1**: Jeśli dane uwierzytelniające wypłaty Twojego walidatora zaczynają się od `0x01...`, dokonałeś depozytu po twardym rozwidleniu Shapella lub już przekonwertowałeś swoje dane uwierzytelniające **Typu 0** na **Typ 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Dane uwierzytelniające wypłaty **Typu 2**: Ten nowy typ danych uwierzytelniających wypłaty będzie zaczynał się od `0x02...` i zostanie włączony po aktualizacji Pectra. Walidatory z danymi uwierzytelniającymi wypłaty **Typu 2** są czasami nazywane „**walidatorami kapitalizującymi**”

| **Dozwolone** | **Niedozwolone** |
| --- | --- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2 |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0 |
|  | ❌ Typ 2 → Typ 1 |
|  | ❌ Typ 2 → Typ 0 |

### Ryzyka {#risks}

MaxEB umożliwia walidatorowi przesłanie całego swojego salda do innego walidatora. Użytkownicy przesyłający propozycję konsolidacji powinni zweryfikować źródło i zawartość transakcji, którą podpisują. Oficjalnym narzędziem do korzystania z funkcji MaxEB jest Launchpad. Jeśli zdecydujesz się na użycie narzędzia innej firmy, powinieneś zweryfikować, czy:

- Klucz publiczny i adres wypłaty walidatora źródłowego pasują do kontrolowanego przez nich walidatora
- Klucz publiczny walidatora docelowego jest poprawny i należy do nich
- Żądanie jest konwersją, a nie konsolidacją, jeśli nie zamierzają wysyłać środków do innego walidatora
- Transakcja jest podpisywana przez właściwy adres wypłaty

**Zdecydowanie zalecamy** omówienie każdego narzędzia innej firmy, którego planujesz użyć, ze [społecznością EthStaker](https://ethstaker.org/about). To pomocne miejsce, aby zweryfikować swoje podejście i uniknąć błędów. Jeśli użyjesz złośliwego lub źle skonfigurowanego narzędzia, **całe saldo Twojego walidatora może zostać wysłane do walidatora, którego nie kontrolujesz** — bez możliwości jego odzyskania.

## Szczegóły techniczne {#technical-details}

### Przepływ {#the-flow}

Będą dwa zastosowania operacji `ConsolidationRequest`:

1. Konwersja istniejącego walidatora z **Typu 1** na walidator **Typu 2**
2. Konsolidacja innych walidatorów w istniejący walidator **Typu 2**

W przypadku konwersji walidatora z **Typu 1** na **Typ 2**, zarówno *źródłem*, jak i *celem* będzie walidator, którego konwertujesz. Operacja ta będzie kosztować gaz i zostanie umieszczona w kolejce za innymi żądaniami konsolidacji. Ta kolejka jest **oddzielna** od kolejki depozytów, nie mają na nią wpływu nowe depozyty walidatorów i można ją sprawdzić na stronie [pectrified.com](https://pectrified.com/).

Aby skonsolidować walidatory, musisz posiadać *walidator docelowy*, który ma dane uwierzytelniające wypłaty **Typu 2**. Jest to miejsce docelowe dla wszelkich konsolidowanych sald walidatorów, a jego indeks zostaje zachowany.

### Wymagania dotyczące konwersji na Typ 2 {#requirements-for-converting-to-type-2}

Będzie to wymagane dla pierwszego walidatora, którego konwertujesz na **Typ 2**. Indeks tego walidatora zostaje zachowany i jest aktywny. W przypadku konwersji, *walidator źródłowy* == *walidator docelowy*.

Walidator musi...

- być aktywny
- posiadać dane uwierzytelniające wypłaty **Typu 1**
- nie być w stanie wyjścia (ani po cięciu)
- nie mieć oczekujących, ręcznie wyzwalanych wypłat (nie dotyczy to automatycznych transferów, tzw. sweeps)

![conversion illustration](./conversion.png)

### Wymagania dotyczące konsolidacji {#requirements-for-consolidating}

Jest to *ta sama operacja* co konwersja, ale ma miejsce, gdy *walidator źródłowy* różni się od *walidatora docelowego*. Indeks walidatora docelowego zostaje zachowany i przyjmuje on saldo od walidatora źródłowego. Indeks walidatora źródłowego przechodzi w stan `EXITED`.

W tym przypadku walidator źródłowy musi spełniać wszystkie powyższe wymagania, a dodatkowo:

- być aktywny przez co najmniej ~27,3 godziny (jeden `SHARD_COMMITTEE_PERIOD`)

Walidator docelowy musi

- posiadać dane uwierzytelniające wypłaty **Typu 2**
- nie być w stanie wyjścia.

![consolidation illustration](./consolidation.png)

### Żądanie konsolidacji {#the-consolidation-request}

Żądanie konsolidacji zostanie podpisane przez adres wypłaty powiązany z walidatorem źródłowym i będzie zawierać:

1. Adres walidatora źródłowego (np. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Klucz publiczny walidatora źródłowego (np. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Klucz publiczny walidatora docelowego

W przypadku konwersji, punkty 2 i 3 będą takie same. Tę operację można wykonać na [Launchpadzie](https://launchpad.ethereum.org/).

### Wymagania dotyczące podpisywania {#signing-requirements}

Aby przesłać `ConsolidationRequest`, **adres wypłaty walidatora źródłowego** musi podpisać żądanie. Dowodzi to kontroli nad środkami walidatora.

### Co jest podpisywane? {#what-is-signed}

Używany jest oddzielony domeną [korzeń podpisywania (signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) obiektu `ConsolidationRequest`.

- **Domena:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Pola korzenia podpisywania:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Wynikowy **podpis BLS** jest przesyłany wraz z żądaniem.

Uwaga: Podpisywanie jest wykonywane przez adres wypłaty, a nie klucz walidatora.

### Częściowe wypłaty {#partial-withdrawals}

Walidatory z danymi uwierzytelniającymi **Typu 1** otrzymują automatyczne, darmowe (bez opłat za gaz) transfery (sweeps) nadwyżki salda (wszystko powyżej 32 ETH) na swój adres wypłaty. Ponieważ **Typ 2** pozwala walidatorowi na kapitalizację sald w krokach co 1 ETH, nie będzie on automatycznie transferował sald, dopóki nie osiągnie 2048 ETH. Częściowe wypłaty z walidatorów **Typu 2** muszą być wyzwalane ręcznie i będą kosztować gaz.

## Narzędzia do konsolidacji {#consolidation-tooling}

Dostępnych jest kilka narzędzi do zarządzania konsolidacjami. Oficjalnym narzędziem, stworzonym przez Fundację Ethereum, jest [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Istnieją również narzędzia innych firm stworzone przez podmioty ze społeczności stakingowej, które mogą oferować funkcje niedostępne w Launchpadzie. Chociaż wymienione tu narzędzia nie są audytowane ani wspierane przez Fundację Ethereum, poniżej znajdują się narzędzia open source stworzone przez znanych członków społeczności.

| Narzędzie | Strona internetowa | Open source | Twórca | Audytowane | Interfejs | Godne uwagi funkcje |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Tak, Apache 2.0 | [Pier Two](https://piertwo.com/) | Nie | Interfejs WWW | WalletConnect, działa z SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Tak, MIT | [Luganodes](https://www.luganodes.com/) | Tak, Quantstamp [Maj 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Wiersz poleceń | Wsadowanie, dla wielu walidatorów jednocześnie |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Tak, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Nie | Wiersz poleceń | Pełny zestaw funkcji do zarządzania walidatorem i węzłem |
| Siren | [GitHub](https://github.com/sigp/siren) | Tak, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Nie | Częściowo wiersz poleceń, ale głównie interfejs WWW | Działa tylko wtedy, gdy używasz klienta konsensusu Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Tak, licencje MIT | [Stakely](https://stakely.io/) | Nie | Interfejs WWW, hostowany przez stakely i gotowy do darmowego samodzielnego hostowania | Obsługuje główne połączenia portfeli, w tym safe z WalletConnect |

## Często zadawane pytania (FAQ) {#faq}

### Czy dołączenie zmienia moje szczęście w propozycjach lub nagrody? {#change-luck-or-rewards}

Nie. Dołączenie nie zmniejsza Twoich szans na propozycję – Twoje obowiązki i wybór propozycji pozostają takie same. Na przykład, jeśli masz dwa walidatory po 32 ETH w porównaniu do jednego walidatora z 64 ETH, będziesz miał takie same łączne szanse na to, że zostaniesz wybrany do zaproponowania bloku i zdobycia nagród.

### Czy dołączenie zmienia moje ryzyko cięcia? {#change-slashing-risk}

Dla mniejszych lub nieprofesjonalnych operatorów krótka odpowiedź brzmi: nie. Dłuższa odpowiedź jest taka, że dla profesjonalnych operatorów uruchamiających wiele walidatorów na węzeł z szybkim systemem powiadomień, konsolidacja w mniejszą liczbę walidatorów może zmniejszyć ich zdolność do reagowania na cięcie i zapobiegania zdarzeniom kaskadowym. Początkowa *kara* za cięcie dla wszystkich walidatorów została drastycznie zmniejszona z 1 ETH (na 32 ETH) do 0,0078125 ETH (na 32 ETH), aby zrekompensować to ryzyko.

### Czy muszę wyjść z mojego walidatora, aby dokonać konwersji? {#exit-validator}

Nie. Możesz dokonać konwersji w miejscu, bez wyjścia.

### Jak długo potrwa konwersja / konsolidacja? {#how-long}

Minimum 27,3 godziny, ale konsolidacje również podlegają kolejce. Ta kolejka jest niezależna od kolejek depozytów i wypłat i nie mają one na nią wpływu.

### Czy mogę zachować mój indeks walidatora? {#keep-validator-index}

Tak. Konwersja w miejscu zachowuje ten sam indeks walidatora. Jeśli skonsolidujesz wiele walidatorów, będziesz mógł zachować tylko indeks *walidatora docelowego*.

### Czy przegapię atestacje? {#miss-attestations}

Podczas konsolidacji w inny walidator, walidator źródłowy zostaje wyłączony (wyjście) i następuje około 27-godzinny okres oczekiwania, zanim saldo stanie się aktywne na walidatorze docelowym. Ten okres **nie wpływa na wskaźniki wydajności**.

### Czy poniosę kary? {#incur-penalties}

Nie. Dopóki Twój walidator jest online, nie poniesiesz kar.

### Czy adresy wypłat konsolidowanych walidatorów muszą się zgadzać? {#withdrawal-addresses-match}

Nie. Ale *źródło* musi autoryzować żądanie ze swojego własnego adresu.

### Czy moje nagrody będą się kapitalizować po konwersji? {#rewards-compound}

Tak. Dzięki danym uwierzytelniającym **Typu 2**, nagrody powyżej 32 ETH są automatycznie ponownie stakowane — ale nie natychmiast. Ze względu na mały bufor (zwany [*histerezą*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), Twoje saldo musi osiągnąć **około 1,25 ETH więcej**, zanim nadwyżka zostanie ponownie stakowana. Zatem zamiast kapitalizacji przy 33,0 ETH, następuje to przy 33,25 (saldo efektywne = 33 ETH), następnie 34,25 (saldo efektywne = 34 ETH) i tak dalej.

### Czy nadal mogę otrzymywać automatyczne transfery (sweeps) po konwersji? {#automatic-sweep}

Automatyczne transfery będą miały miejsce tylko w przypadku nadwyżek sald powyżej 2048. W przypadku wszystkich innych częściowych wypłat będziesz musiał wyzwalać je ręcznie.

### Czy mogę zmienić zdanie i wrócić z Typu 2 do Typu 1? {#go-back-to-type1}

Nie. Konwersja na **Typ 2** jest nieodwracalna.

### Jeśli chcę skonsolidować wiele walidatorów, czy muszę najpierw przekonwertować każdy z nich na Typ 2? {#consolidate-multiple-validators}

Nie! Przekonwertuj jeden walidator na Typ 2, a następnie użyj go jako celu. Wszystkie inne walidatory skonsolidowane w ten cel Typu 2 mogą być Typu 1 lub Typu 2.

### Mój walidator jest offline lub ma poniżej 32 ETH - czy nadal mogę go przekonwertować? {#offline-or-below-32eth}

Tak. Dopóki jest aktywny (nie wyszedł) i możesz podpisać za pomocą jego adresu wypłaty, możesz go przekonwertować.

## Zasoby {#resources}

- [Specyfikacje konsensusu Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): To jest „najprawdziwsza” wersja, na której powinieneś polegać. W razie wątpliwości przeczytaj specyfikacje.
- Nie każdy czuje się komfortowo przedzierając się przez kod, więc [ten maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) może pomóc w interpretacji specyfikacji. *Zastrzeżenie: Należy polegać na specyfikacjach, a nie na sztucznej inteligencji, jako na prawdzie, ponieważ sztuczna inteligencja może błędnie zinterpretować informacje lub halucynować odpowiedzi.*
- [pectrified.com](https://pectrified.com/): Zobacz stan konsolidacji, depozytów i czasy oczekiwania w kolejce.
- [Ethereal](https://github.com/wealdtech/ethereal): Stworzone przez społeczność narzędzie CLI do zarządzania typowymi zadaniami walidatora.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Stworzony przez społeczność kontrakt, który pozwala na zdeponowanie wielu walidatorów Ethereum w jednej transakcji.