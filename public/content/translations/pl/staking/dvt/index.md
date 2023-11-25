---
title: Technologia rozproszonego walidatora
description: Technologia rozproszonego walidatora umożliwia rozproszoną obsługę walidatora Ethereum przez wiele podmiotów.
lang: pl
---

# Technologia rozproszonego walidatora {#distributed-validator-technology}

Technologia rozproszonego walidatora (DVT) to podejście do bezpieczeństwa walidatora, które rozkłada zarządzanie kluczami i obowiązki podpisywania na wiele podmiotów, aby zmniejszyć liczbę pojedynczych punktów awarii i zwiększyć odporność walidatora.

Robi to poprzez **rozdzielenie klucza prywatnego** używanego do zabezpieczenia walidatora **pomiędzy wiele komputerów** zorganizowanych w „klaster”. Zaletą tego rozwiązania jest to, że atakującym bardzo trudno jest uzyskać dostęp do klucza, ponieważ nie jest on przechowywany w całości na żadnym komputerze. Pozwala to również na wyłączenie niektórych węzłów, ponieważ niezbędne podpisywanie może być wykonywane przez podzbiór komputerów w każdym klastrze. Zmniejsza to liczbę pojedynczych punktów awarii w sieci i sprawia, że cały zestaw walidatorów jest bardziej niezawodny.

![Schemat pokazujący, w jaki sposób pojedynczy klucz walidatora jest dzielony na udziały klucza i dystrybuowany do wielu węzłów z różnymi komponentami.](./dvt-cluster.png)

## Dlaczego potrzebujemy DVT? {#why-do-we-need-dvt}

### Bezpieczeństwo {#security}

Walidatory generują dwie pary kluczy publiczno-prywatnych: klucze walidatora do uczestniczenia w konsensusie i klucze wypłaty do uzyskiwania dostępu do funduszy. Podczas gdy walidatory mogą zabezpieczyć klucze wypłat w zimnych danych (cold storage), klucze prywatne walidatorów muszą być online 24/7. Jeśli klucz prywatny walidatora zostanie naruszony, atakujący może kontrolować walidator, potencjalnie prowadząc do odcięcia lub utraty ETH stakera. DVT może pomóc zmniejszyć to ryzyko. Oto jak:

Korzystając z DVT, stakerzy mogą uczestniczyć w stakowaniu, jednocześnie przechowując klucz prywatny walidatora w zimnych danych. Osiąga się to poprzez zaszyfrowanie oryginalnego, pełnego klucza walidatora, a następnie podzielenie go na udziały klucza. Udziały klucza działają w trybie online i są dystrybuowane do wielu węzłów, co umożliwia rozproszone działanie walidatora. Jest to możliwe, ponieważ walidatory Ethereum używają podpisów BLS, które są addytywne, co oznacza, że pełny klucz można zrekonstruować, sumując ich części składowe. Pozwala to stakerowi na bezpieczne przechowywanie pełnego, oryginalnego „głównego” klucza walidatora offline.

### Brak pojedynczych punktów awarii {#no-single-point-of-failure}

Gdy walidator jest podzielony między wielu operatorów i wiele komputerów, może wytrzymać indywidualne awarie sprzętu i oprogramowania bez przechodzenia w tryb offline. Ryzyko awarii można również zmniejszyć, stosując różne konfiguracje sprzętu i oprogramowania w węzłach klastra. Ta odporność nie jest dostępna dla konfiguracji walidatorów z jednym węzłem — pochodzi z warstwy DVT.

Jeśli jeden z komponentów maszyny w klastrze ulegnie awarii (na przykład, jeśli w klastrze walidatora jest czterech operatorów, a jeden z nich korzysta z określonego klienta, który ma błąd), pozostali zapewniają ciągłość działania walidatora.

### Decentralizacja {#decentralization}

Idealnym scenariuszem dla Ethereum jest posiadanie jak największej liczby niezależnie obsługiwanych walidatorów. Jednak kilku dostawców stakowania stało się bardzo popularnych i odpowiada za znaczną część całkowitego stakowanego ETH w sieci. DVT może pozwolić tym operatorom na istnienie przy jednoczesnym zachowaniu decentralizacji stawek. Wynika to z faktu, że klucze dla każdego walidatora są rozproszone na wielu maszynach i potrzeba znacznie większej zmowy, aby walidator stał się złośliwy.

Bez DVT dostawcom stakingu łatwiej jest obsługiwać tylko jedną lub dwie konfiguracje klienta dla wszystkich swoich walidatorów, zwiększając wpływ błędu klienta. DVT można wykorzystać do rozłożenia ryzyka na wiele konfiguracji klienta i różnych urządzeń, tworząc odporność poprzez różnorodność.

**DVT oferuje następujące korzyści dla Ethereum:**

1. **Decentralizacja** konsensusu Ethereum proof-of-stake
2. Zapewnia **żywotność** sieci
3. Tworzy **tolerancję na błędy** walidatora
4. Działanie walidatora z **minimalizacją zaufania**
5. **Zminimalizowane ryzyko odcięć** i przestojów
6. **Zwiększa różnorodność** (klient, centrum danych, lokalizacja, przepisy itp.)
7. **Zwiększone bezpieczeństwo** zarządzania kluczami walidatora

## Jak działa DVT? {#how-does-dvt-work}

Rozwiązanie DVT zawiera następujące składniki:

- **[Dzielenie sekretu protokołem Shamira](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** — Walidatory używają [kluczy BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Poszczególne „udziały klucza” BLS („udziały klucza”) mogą być łączone w jeden zagregowany klucz (podpis). W DVT klucz prywatny dla walidatora jest połączonym podpisem BLS każdego operatora w klastrze.
- **[Schemat podpisów progowych](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** — Określa liczbę indywidualnych udziałów klucza, które są wymagane do podpisywania obowiązków, np. 3 z 4.
- **[Rozproszone generowanie kluczy (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** — Proces kryptograficzny, który generuje udziały klucza i jest używany do dystrybucji udziałów istniejącego lub nowego klucza walidatora do węzłów w klastrze.
- **[Obliczenia wielostronne (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** — Pełny klucz walidatora jest generowany w tajemnicy przy użyciu obliczeń wielostronnych. Pełen klucz nigdy nie jest znany żadnemu indywidualnemu operatorowi — zna on tylko swoją część („udział”).
- **Protokół konsensusu** — Protokół konsensusu wybiera jeden węzeł, aby proponował bloki. Współdzielą blok z innymi węzłami w klastrze, które dodają swoje udziały klucza do zagregowanego podpisu. Po zagregowaniu wystarczającej liczby udziałów klucza blok jest proponowany na Ethereum.

Rozproszone walidatory mają wbudowaną tolerancję na błędy i mogą działać nawet wtedy, gdy niektóre z poszczególnych węzłów przejdą w tryb offline. Oznacza to, że klaster jest odporny, nawet jeśli niektóre z jego węzłów okażą się złośliwe lub leniwe.

## Przypadki użycia DVT {#dvt-use-cases}

DVT ma znaczące implikacje dla szerszej branży stakingowej:

### Stakerzy solo {#solo-stakers}

DVT pozwala również na stakowanie bez nadzoru, umożliwiając dystrybucję klucza walidatora w zdalnych węzłach, przy jednoczesnym zachowaniu pełnego klucza całkowicie offline. Oznacza to, że stakerzy domowi niekoniecznie muszą wydawać pieniądze na sprzęt, a dystrybucja udziałów w kluczach może pomóc wzmocnić ich przed potencjalnymi włamaniami.

### Usługi stakingowe (SaaS) {#saas}

Operatorzy (tacy jak stakowanie w puli i stakerzy instytucjonalni) zarządzający wieloma walidatorami mogą korzystać z DVT, aby zmniejszyć swoje ryzyko. Dystrybucja infrastruktury pozwala na zwiększenie redundancji operacji i dywersyfikację typów używanego sprzętu.

DVT dzieli odpowiedzialność za zarządzanie kluczami na wiele węzłów, co oznacza, że niektóre koszty operacyjne mogą być również dzielone. DVT może również zmniejszyć ryzyko operacyjne i koszty ubezpieczenia dla dostawców stakingu.

### Staking pools {#staking-pools}

Ze względu na standardowe konfiguracje walidatorów, stakowanie w puli i dostawcy płynnych stakingów są zmuszeni do posiadania różnych poziomów zaufania pojedynczego operatora, ponieważ zyski i straty są uspołeczniane w całej puli. Są one również zależne od operatorów w zakresie ochrony kluczy podpisujących, ponieważ do tej pory nie było dla nich innej opcji.

Mimo że tradycyjnie podejmowane są wysiłki w celu rozłożenia ryzyka poprzez dystrybucję udziałów na wielu operatorów, każdy z nich nadal zarządza znaczącym udziałem niezależnie. Poleganie na jednym operatorze wiąże się z ogromnym ryzykiem, jeśli nie osiągnie on zadowalających wyników, napotka przestoje, zostanie naruszony lub będzie działał złośliwie.

Wykorzystując DVT, zaufanie wymagane od operatorów jest znacznie zmniejszone. **Pule mogą umożliwić operatorom posiadanie udziałów bez konieczności przechowywania kluczy walidatora** (ponieważ wykorzystywane są tylko udziały kluczy). Pozwala również na dystrybucję zarządzanych udziałów między większą liczbą operatorów (np. zamiast jednego operatora zarządzającego 1000 walidatorów, DVT umożliwia zbiorowe uruchamianie tych walidatorów przez wielu operatorów). Zróżnicowane konfiguracje operatorów zapewnią, że jeśli jeden z nich ulegnie awarii, pozostali nadal będą w stanie poświadczać. Skutkuje to redundancją i dywersyfikacją, co prowadzi do lepszej wydajności i odporności, przy jednoczesnej maksymalizacji zysków.

Kolejną korzyścią płynącą z minimalizowania zaufania pojedynczego operatora jest to, że stakowanie w puli może pozwolić na bardziej otwarte i niewymagające uprawnień uczestnictwo operatora. W ten sposób usługi mogą zmniejszyć swoje ryzyko i wspierać decentralizację Ethereum, wykorzystując zarówno wyselekcjonowane, jak i pozbawione uprawnień zestawy operatorów, na przykład poprzez łączenie domowych lub mniejszych stakerów z większymi.

## Potencjalne wady korzystania z DVT {#potential-drawbacks-of-using-dvt}

- **Dodatkowy komponent** — wprowadzenie węzła DVT dodaje kolejną część, która może być wadliwa lub podatna na ataki. Sposobem na złagodzenie tego jest dążenie do wielu implementacji węzła DVT, co oznacza wielu klientów DVT (podobnie jak istnieje wielu klientów dla warstw konsensusu i wykonania).
- **Koszty operacyjne** — ponieważ DVT dystrybuuje walidator między wieloma podmiotami, do działania wymagana jest większa liczba węzłów zamiast tylko jednego węzła, co powoduje wzrost kosztów operacyjnych.
- **Potencjalnie zwiększone opóźnienie** — ponieważ DVT wykorzystuje protokół konsensusu do osiągnięcia konsensusu między wieloma węzłami obsługującymi walidator, może potencjalnie wprowadzić zwiększone opóźnienie.

## Dalsza lektura {#further-reading}

- [Specyfikacja rozproszonego walidatora Ethereum (wysoki poziom)](https://github.com/ethereum/distributed-validator-specs)
- [Specyfikacja techniczna rozproszonego walidatora Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplikacja demo do dzielenia sekretu protokołem Shamira](https://iancoleman.io/shamir/)
