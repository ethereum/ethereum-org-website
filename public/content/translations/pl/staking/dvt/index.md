---
title: Technologia rozproszonych walidatorów
description: Technologia rozproszonych walidatorów umożliwia rozproszone działanie walidatora Ethereum przez wiele stron.
lang: pl
---

Technologia rozproszonych walidatorów (DVT) to podejście do bezpieczeństwa walidatora, które rozdziela zarządzanie kluczami i obowiązki związane z podpisywaniem na wiele stron, aby zredukować pojedyncze punkty awarii i zwiększyć odporność walidatora.

Robi to poprzez **podział klucza prywatnego** używanego do zabezpieczenia walidatora **pomiędzy wiele komputerów** zorganizowanych w „klaster”. Zaletą tego rozwiązania jest to, że bardzo utrudnia atakującym uzyskanie dostępu do klucza, ponieważ nie jest on w całości przechowywany na żadnej pojedynczej maszynie. Pozwala to również niektórym węzłom na przejście w tryb offline, ponieważ niezbędne podpisywanie może być wykonane przez podzbiór maszyn w każdym klastrze. Zmniejsza to liczbę pojedynczych punktów awarii w sieci i sprawia, że cały zestaw walidatorów jest bardziej solidny.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Dlaczego potrzebujemy DVT? {#why-do-we-need-dvt}

### Bezpieczeństwo {#security}

Walidatory generują dwie pary kluczy publiczno-prywatnych: klucze walidatora do uczestnictwa w konsensusie oraz klucze wypłaty do uzyskiwania dostępu do środków. O ile walidatory mogą zabezpieczyć klucze wypłaty w tzw. zimnym portfelu (cold storage), prywatne klucze walidatora muszą być online 24/7. Jeśli klucz prywatny walidatora zostanie skompromitowany, atakujący może przejąć kontrolę nad walidatorem, co potencjalnie może prowadzić do cięcia (slashing) lub utraty ETH stakującego. DVT może pomóc zminimalizować to ryzyko. Oto jak to działa:

Korzystając z DVT, stakujący mogą uczestniczyć w stakingu, jednocześnie przechowując klucz prywatny walidatora w zimnym portfelu. Osiąga się to poprzez zaszyfrowanie oryginalnego, pełnego klucza walidatora, a następnie podzielenie go na udziały klucza (key shares). Udziały klucza są dostępne online i dystrybuowane do wielu węzłów, co umożliwia rozproszone działanie walidatora. Jest to możliwe, ponieważ walidatory [Ethereum](/) używają podpisów BLS, które są addytywne, co oznacza, że pełny klucz można zrekonstruować poprzez zsumowanie jego części składowych. Pozwala to stakującemu na bezpieczne przechowywanie pełnego, oryginalnego „głównego” klucza walidatora w trybie offline.

### Brak pojedynczych punktów awarii {#no-single-point-of-failure}

Kiedy walidator jest podzielony pomiędzy wielu operatorów i wiele maszyn, może przetrwać pojedyncze awarie sprzętu i oprogramowania bez przechodzenia w tryb offline. Ryzyko awarii można również zmniejszyć, stosując zróżnicowane konfiguracje sprzętowe i programowe w węzłach klastra. Taka odporność nie jest dostępna dla konfiguracji walidatorów z jednym węzłem – wynika ona z warstwy DVT.

Jeśli jeden z komponentów maszyny w klastrze ulegnie awarii (na przykład, jeśli w klastrze walidatorów jest czterech operatorów, a jeden z nich używa określonego klienta, który ma błąd), pozostali zapewniają, że walidator nadal działa.

### Decentralizacja {#decentralization}

Idealnym scenariuszem dla Ethereum jest posiadanie jak największej liczby niezależnie obsługiwanych walidatorów. Jednak kilku dostawców stakingu stało się bardzo popularnych i odpowiada za znaczną część całkowitego stakowanego ETH w sieci. DVT może pozwolić tym operatorom na istnienie przy jednoczesnym zachowaniu decentralizacji stawki. Wynika to z faktu, że klucze dla każdego walidatora są rozproszone na wielu maszynach i wymagałoby to znacznie większej zmowy, aby walidator stał się złośliwy.

Bez DVT dostawcom stakingu łatwiej jest obsługiwać tylko jedną lub dwie konfiguracje klientów dla wszystkich swoich walidatorów, co zwiększa wpływ błędu klienta. DVT można wykorzystać do rozłożenia ryzyka na wiele konfiguracji klientów i różny sprzęt, tworząc odporność poprzez różnorodność.

**DVT oferuje Ethereum następujące korzyści:**

1. **Decentralizacja** konsensusu dowodu stawki (PoS) Ethereum
2. Zapewnia **żywotność** (liveness) sieci
3. Tworzy **odporność na błędy** walidatora
4. Działanie walidatora ze **zminimalizowanym zaufaniem**
5. **Zminimalizowane ryzyko cięcia** (slashing) i przestojów
6. **Poprawia różnorodność** (klient, centrum danych, lokalizacja, regulacje itp.)
7. **Zwiększone bezpieczeństwo** zarządzania kluczami walidatora

## Jak działa DVT? {#how-does-dvt-work}

Rozwiązanie DVT składa się z następujących komponentów:

- **[Podział sekretu Shamira](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** – Walidatory używają [kluczy BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Poszczególne „udziały klucza” BLS mogą zostać połączone w jeden zagregowany klucz (podpis). W DVT klucz prywatny walidatora to połączony podpis BLS każdego operatora w klastrze.
- **[Schemat podpisu progowego](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** – Określa liczbę pojedynczych udziałów klucza, które są wymagane do obowiązków związanych z podpisywaniem, np. 3 z 4.
- **[Rozproszone generowanie kluczy (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** – Proces kryptograficzny, który generuje udziały klucza i służy do dystrybucji udziałów istniejącego lub nowego klucza walidatora do węzłów w klastrze.
- **[Obliczenia wielostronne (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** – Pełny klucz walidatora jest generowany w tajemnicy przy użyciu obliczeń wielostronnych. Pełny klucz nigdy nie jest znany żadnemu pojedynczemu operatorowi – znają oni tylko swoją własną jego część (swój „udział”).
- **Protokół konsensusu** – Protokół konsensusu wybiera jeden węzeł jako proponującego blok. Dzieli się on blokiem z innymi węzłami w klastrze, które dodają swoje udziały klucza do zagregowanego podpisu. Gdy zagregowana zostanie wystarczająca liczba udziałów klucza, blok jest proponowany w Ethereum.

Rozproszone walidatory mają wbudowaną odporność na błędy i mogą nadal działać, nawet jeśli niektóre z poszczególnych węzłów przejdą w tryb offline. Oznacza to, że klaster jest odporny, nawet jeśli niektóre z jego węzłów okażą się złośliwe lub leniwe.

## Przypadki użycia DVT {#dvt-use-cases}

DVT ma istotne implikacje dla szerszej branży stakingu:

### Samodzielni stakujący {#solo-stakers}

DVT umożliwia również niepowierniczy staking, pozwalając na dystrybucję klucza walidatora pomiędzy zdalne węzły, przy jednoczesnym zachowaniu pełnego klucza całkowicie offline. Oznacza to, że domowi stakujący niekoniecznie muszą ponosić wydatki na sprzęt, podczas gdy dystrybucja udziałów klucza może pomóc wzmocnić ich ochronę przed potencjalnymi atakami hakerskimi.

### Staking jako usługa (SaaS) {#saas}

Operatorzy (tacy jak pule stakingowe i stakujący instytucjonalni) zarządzający wieloma walidatorami mogą używać DVT w celu zmniejszenia swojego ryzyka. Rozpraszając swoją infrastrukturę, mogą dodać redundancję do swoich operacji i zdywersyfikować rodzaje używanego sprzętu.

DVT dzieli odpowiedzialność za zarządzanie kluczami na wiele węzłów, co oznacza, że niektóre koszty operacyjne mogą być również współdzielone. DVT może również zmniejszyć ryzyko operacyjne i koszty ubezpieczenia dla dostawców stakingu.

### Pule stakingowe {#staking-pools}

Ze względu na standardowe konfiguracje walidatorów, pule stakingowe i dostawcy płynnego stakingu są zmuszeni do posiadania różnego poziomu zaufania do pojedynczego operatora, ponieważ zyski i straty są uspołeczniane w całej puli. Są oni również zależni od operatorów w kwestii zabezpieczenia kluczy do podpisywania, ponieważ do tej pory nie było dla nich innej opcji.

Mimo że tradycyjnie podejmuje się wysiłki w celu rozłożenia ryzyka poprzez dystrybucję stawek pomiędzy wielu operatorów, każdy operator nadal niezależnie zarządza znaczną stawką. Poleganie na jednym operatorze stwarza ogromne ryzyko, jeśli osiąga on gorsze wyniki, napotyka przestoje, zostaje skompromitowany lub działa złośliwie.

Dzięki wykorzystaniu DVT zaufanie wymagane od operatorów jest znacznie mniejsze. **Pule mogą umożliwić operatorom utrzymywanie stawek bez konieczności sprawowania pieczy nad kluczami walidatora** (ponieważ wykorzystywane są tylko udziały klucza). Pozwala to również na dystrybucję zarządzanych stawek pomiędzy większą liczbę operatorów (np. zamiast jednego operatora zarządzającego 1000 walidatorów, DVT umożliwia zbiorowe zarządzanie tymi walidatorami przez wielu operatorów). Zróżnicowane konfiguracje operatorów zapewnią, że jeśli jeden operator ulegnie awarii, pozostali nadal będą w stanie poświadczać. Skutkuje to redundancją i dywersyfikacją, co prowadzi do lepszej wydajności i odporności, przy jednoczesnej maksymalizacji nagród.

Kolejną korzyścią z minimalizacji zaufania do pojedynczego operatora jest to, że pule stakingowe mogą pozwolić na bardziej otwarty i niewymagający pozwoleń udział operatorów. W ten sposób usługi mogą zmniejszyć swoje ryzyko i wspierać decentralizację Ethereum, korzystając zarówno z wyselekcjonowanych, jak i niewymagających pozwoleń zestawów operatorów, na przykład poprzez łączenie domowych lub mniejszych stakujących z większymi.

## Potencjalne wady korzystania z DVT {#potential-drawbacks-of-using-dvt}

- **Dodatkowy komponent** – wprowadzenie węzła DVT dodaje kolejną część, która może być wadliwa lub podatna na ataki. Sposobem na złagodzenie tego problemu jest dążenie do wielu implementacji węzła DVT, co oznacza wielu klientów DVT (podobnie jak istnieje wielu klientów dla warstw konsensusu i wykonawczej).
- **Koszty operacyjne** – ponieważ DVT rozdziela walidator pomiędzy wiele stron, do działania wymagana jest większa liczba węzłów zamiast tylko jednego, co wprowadza zwiększone koszty operacyjne.
- **Potencjalnie zwiększone opóźnienie** – ponieważ DVT wykorzystuje protokół konsensusu do osiągnięcia konsensusu pomiędzy wieloma węzłami obsługującymi walidator, może to potencjalnie wprowadzić zwiększone opóźnienie.

## Dalsza lektura {#further-reading}

- [Specyfikacje rozproszonego walidatora Ethereum (wysoki poziom)](https://github.com/ethereum/distributed-validator-specs)
- [Specyfikacje techniczne rozproszonego walidatora Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplikacja demonstracyjna podziału sekretu Shamira](https://iancoleman.io/shamir/)