---
title: Bezpieczniejsze Ethereum
description: Mapa drogowa Ethereum wzmacnia dziś produkcję bloków i odporność na cenzurę, jednocześnie przygotowując protokół na erę kwantową i dziesięciolecia niezawodnego działania.
lang: pl
image: /images/roadmap/roadmap-security.png
alt: Mapa drogowa Ethereum
template: roadmap
summaryPoints:
  - Krótkoterminowe aktualizacje wzmacniające, takie jak wbudowana separacja proponującego i budującego (PBS) oraz listy włączeń, są w fazie aktywnego rozwoju
  - Przygotowania na erę postkwantową trwają na wiele lat przed pojawieniem się jakiegokolwiek wiarygodnego zagrożenia kwantowego
  - Uproszczenie protokołu usuwa złożoność i zmniejsza powierzchnię ataku na Ethereum
---

Ethereum jest już bardzo bezpieczną, zdecentralizowaną platformą [inteligentnych kontraktów](/glossary/#smart-contract). Mapa drogowa ma na celu utrzymanie tego stanu przez dziesięciolecia poprzez **wzmocnienie sieci już dziś, przy jednoczesnym przygotowaniu na zagrożenia, które mogą pojawić się dopiero za wiele lat**. Krótkoterminowe aktualizacje można śledzić na stronie [forkcast.org](https://forkcast.org), a długoterminowy projekt mapy drogowej jest publikowany na stronie [strawmap.org](https://strawmap.org).

<ExpandableCard title="Czy Ethereum jest dzisiaj bezpieczne?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Tak. Ethereum działa nieprzerwanie od 2015 roku bez żadnych przestojów. Ulepszenia opisane na tej stronie sprawiają, że i tak już bezpieczna sieć jest trudniejsza do zaatakowania, cenzurowania lub zakłócenia.

</ExpandableCard>

## Niewymagające zaufania budowanie bloków {#trustless-block-building}

Większość bloków Ethereum jest dziś tworzona dzięki podziałowi pracy: wyspecjalizowani budowniczowie bloków konstruują najbardziej wartościowy blok, jaki potrafią, a [walidator](/glossary/#validator), na którego przypada kolej, proponuje najlepszą ofertę. Zapobiega to koncentracji [stawki](/glossary/#staking) wśród największych operatorów w wyniku profesjonalnego budowania bloków, ale od 2022 roku opiera się to na oprogramowaniu spoza protokołu, którego sieć nie może zweryfikować.

**Wbudowana separacja proponującego i budującego (ePBS, lub EIP-7732)** przenosi ten podział do protokołu, usuwając potrzebę ufania przekaźnikom (relays), czyli zewnętrznym pośrednikom, którzy obecnie przekazują bloki między budowniczymi a walidatorami. ePBS jest głównym punktem nadchodzącej aktualizacji [Glamsterdam](/roadmap/glamsterdam/), planowanej na 2026 rok. Nie ustalono jeszcze daty wdrożenia w Sieci głównej (Mainnet); zespoły klientów testują to rozwiązanie w sieciach deweloperskich (tymczasowych sieciach testowych).

<ButtonLink variant="outline" href="/roadmap/pbs/">Więcej o separacji proponującego i budującego</ButtonLink>

## Odporność na cenzurę {#censorship-resistance}

Sieć odporna na cenzurę oznacza, że nikt nie może powstrzymać prawidłowej transakcji przed dotarciem do łańcucha. **Listy włączeń wymuszane przez wybór rozwidlenia (FOCIL, lub EIP-7805)** dają wielu walidatorom głos w sprawie tego, co musi zawierać blok: publikują oni listy oczekujących transakcji, które budowniczy bloków ma obowiązek uwzględnić. Żaden pojedynczy podmiot nie może po cichu pominąć Twojej transakcji.

FOCIL jest głównym elementem warstwy konsensusu w aktualizacji Hegotá, która następuje po Glamsterdam i jest planowana na 2027 rok. Została ona celowo zaplanowana po aktualizacji Glamsterdam, aby ePBS i FOCIL nigdy nie zostały wdrożone jako jedna, niesprawdzona kombinacja. Trwają badania nad szyfrowanymi mempoolami, które ukrywałyby zawartość oczekujących transakcji do momentu ich bezpiecznego włączenia do bloku.

## Szybsza ostateczność {#faster-finality}

Dla użytkowników [ostateczność](/glossary/#finality) to moment, w którym transakcja staje się trwała, a jej odwrócenie kosztowałoby atakującego ogromną ilość stakowanego ETH. Obecnie ostateczność zajmuje około 15 minut, a **badacze chcą to drastycznie skrócić**. Prace rozpoczęły się od ostateczności w jednym slocie, ewoluowały w ostateczność w trzech slotach, a obecnie są kontynuowane jako Minimmit, jednorundowy protokół konsensusu w programie Lean Ethereum wprowadzonym w lipcu 2025 roku. Ostateczność liczona w sekundach to długoterminowy cel na projekcie mapy drogowej, planowany na około 2029 rok. Pozostaje to przedmiotem aktywnych badań i żadna aktualizacja dotycząca ostateczności nie została jeszcze przypisana do żadnego rozwidlenia.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Więcej o badaniach nad szybszą ostatecznością</ButtonLink>

## Odporni walidatorzy {#resilient-validators}

Walidator to zazwyczaj jedna maszyna przechowująca jeden klucz do podpisywania. **Technologia rozproszonych walidatorów (DVT)** zastępuje tę pojedynczą maszynę komitetem maszyn, które współdzielą klucz i wspólnie składają podpis, dzięki czemu awaria jednego komputera lub kradzież jednego klucza nie powoduje wyłączenia walidatora. DVT działa w środowisku produkcyjnym i jest używane przez operatorów stakingu na dużą skalę. W styczniu 2026 roku Vitalik Buterin przedstawił uproszczony wariant na poziomie protokołu o nazwie DVT-lite; jest to wczesna propozycja bez zaplanowanego rozwidlenia.

Sieć chroni się również poprzez [różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/): Ethereum działa na kilku niezależnie zbudowanych implementacjach oprogramowania, więc błąd w jednym kliencie nie powoduje awarii reszty sieci.

Dwa wcześniejsze pomysły badawcze, view-merge i tajny wybór lidera, nie są już aktywnymi elementami mapy drogowej.

<ButtonLink variant="outline" href="/staking/dvt/">Więcej o technologii rozproszonych walidatorów</ButtonLink>

## Odporność kwantowa {#quantum-resistance}

Ethereum wykorzystuje [kryptografię](/glossary/#cryptography), aby zapewnić bezpieczeństwo sieci i chronić środki użytkowników. Z czasem niektóre z tych metod kryptograficznych staną się **podatne na ataki komputerów kwantowych**, które potrafią rozwiązywać określone problemy matematyczne wykładniczo szybciej niż klasyczne maszyny.

**Obecnie żaden komputer kwantowy nie jest w stanie złamać kryptografii Ethereum.** Wymagany do tego sprzęt jeszcze nie istnieje na odpowiednią skalę. Jednak najnowsze badania sugerują, że ta luka zmniejsza się szybciej, niż wcześniej oczekiwano. W marcu 2026 roku Google Quantum AI opublikowało artykuł, w którym oszacowano, że złamanie 256-bitowej kryptografii opartej na krzywych eliptycznych (typu używanego przez Ethereum do podpisów kont) może wymagać około 1200 logicznych kubitów, czyli około 20 razy mniej niż we wcześniejszych szacunkach.

Przejścia kryptograficzne wymagają lat planowania i bezpiecznego wykonania, dlatego przygotowania trwają już teraz, na długo przed powstaniem odpowiedniego sprzętu. Zidentyfikowano cztery obszary wymagające aktualizacji postkwantowych: podpisy konsensusu walidatorów (BLS), schematy zobowiązań używane do dostępności danych (KZG), podpisy kont (ECDSA) oraz systemy dowodów z wiedzą zerową używane przez [rollupy](/glossary/#rollups).

Fundacja Ethereum utworzyła dedykowany **zespół ds. bezpieczeństwa postkwantowego** w styczniu 2026 roku, a jego prace można śledzić publicznie na stronie [pq.ethereum.org](https://pq.ethereum.org). Aktywne prace obejmują oparte na hashu podpisy walidatorów (leanXMSS) w połączeniu z minimalną maszyną wirtualną zkVM (leanVM), która wydajnie agreguje większe podpisy odporne na ataki kwantowe, a także cotygodniowe sieci deweloperskie (interop devnets) z udziałem ponad 10 zespołów klientów.

Kluczowym elementem strategii przejścia jest **EIP-8141**, który wprowadza natywną [abstrakcję konta](/roadmap/account-abstraction/). Pozwala to poszczególnym kontom na wybór własnej weryfikacji podpisu, co oznacza, że użytkownicy mogliby przejść na podpisy odporne na ataki kwantowe bez czekania na jedną, ogólnoprotokołową migrację. EIP-8141 jest rozważany do włączenia w aktualizacji Hegotá. Główne kamienie milowe infrastruktury postkwantowej mają zostać osiągnięte do około 2029 roku. Są to cele planistyczne i mogą ulec zmianie.

<ExpandableCard title="Czy komputery kwantowe mogą dzisiaj ukraść moje ETH?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Nie. Obecnie żaden komputer kwantowy nie jest w stanie złamać kryptografii Ethereum. Prace opisane na tej stronie to wczesne przygotowania na zagrożenie, które jest jeszcze odległe o lata. Kiedy portfele postkwantowe staną się dostępne, oprogramowanie portfela przeprowadzi Cię przez proces migracji. Na ten moment nie musisz nic robić.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Więcej o odporności kwantowej</ButtonLink>

## Prostszy i bardziej wydajny protokół {#simpler-and-more-efficient-protocol}

Złożoność stwarza okazje do powstawania błędów i luk w zabezpieczeniach. Część mapy drogowej skupia się na **uproszczeniu Ethereum i usunięciu długu technologicznego**, aby protokół był łatwiejszy w utrzymaniu, audytowaniu i analizowaniu. Prostszy protokół daje również atakującym mniejszą powierzchnię do badania.

Dostarczone do tej pory:

- **[Pectra (maj 2025)](/roadmap/pectra/)**: Wprowadzono EIP-7702, który pozwala kontom zewnętrznym tymczasowo delegować uprawnienia do kodu inteligentnego kontraktu, co jest krokiem w kierunku pełnej abstrakcji konta.
- **[Fusaka (grudzień 2025)](/roadmap/fusaka/)**: Wdrożono PeerDAS (EIP-7594), który rozdziela obciążenie związane z dostępnością danych w całej sieci. Zwiększono również parametry blobów, zwiększając przepustowość danych dla rollupów.
- **[Dencun (marzec 2024)](/roadmap/dencun/)**: Wprowadzono transakcje typu blob (EIP-4844) w celu obniżenia kosztów danych rollupów oraz ograniczono `SELFDESTRUCT` (EIP-6780), aby usunąć długotrwałe źródło złożoności.
- **[Shapella (kwiecień 2023)](/staking/withdrawals/)**: Umożliwiono walidatorom wypłatę stakowanego ETH (EIP-4895), usuwając wczesne ograniczenie stakingu opartego na [dowodzie stawki (PoS)](/glossary/#pos).
- **London (sierpień 2021)**: Przebudowano wycenę gazu za pomocą EIP-1559, wprowadzając opłatę podstawową i mechanizm spalania w celu uzyskania bardziej przewidywalnych kosztów transakcji.

W toku:

- **Glamsterdam (planowane na 2026)**: Głównymi elementami są ePBS (EIP-7732) i listy dostępu na poziomie bloku (EIP-7928), rozważana jest również zmiana wyceny gazu.
- **Hegotá (planowane na 2027)**: FOCIL (EIP-7805) jest głównym elementem warstwy konsensusu. Rozważane do włączenia: EIP-8141 (natywna abstrakcja konta).
- **Trwające**: Wysiłki mające na celu uproszczenie [EVM](/developers/docs/evm/), harmonizację implementacji klientów i wycofywanie przestarzałych funkcji są kontynuowane przez zespoły klientów. Prace nad bezstanowością (pozwalającą uczestnikom na weryfikację łańcucha bez przechowywania wszystkich jego danych) są przeprojektowywane w oparciu o odporne na ataki kwantowe binarne drzewa hashy, a ostateczne podejście nie zostało jeszcze potwierdzone.

## Obecny postęp {#current-progress}

Stan na połowę 2026 roku:

- **Budowanie bloków i odporność na cenzurę**: ePBS i listy dostępu na poziomie bloku działają w sieciach deweloperskich Glamsterdam. FOCIL jest planowany dla aktualizacji Hegotá, przewidzianej na 2027 rok.
- **Ostateczność**: Minimmit i szersze prace nad konsensusem Lean Ethereum pozostają w fazie aktywnych badań, bez przypisania do konkretnego rozwidlenia.
- **Odporność kwantowa**: Działają cotygodniowe postkwantowe sieci deweloperskie, a główne kamienie milowe infrastruktury są planowane na około 2029 rok.
- **Uproszczenie**: Pectra i Fusaka zostały wdrożone; Glamsterdam i Hegotá przyniosą kolejną rundę porządków.

Żadna część tych prac nie jest jeszcze zakończona, a wszystkie ramy czasowe są szacunkowe i mogą ulec zmianie.

## Dalsza lektura {#further-reading}

- [Forkcast: narzędzie do śledzenia aktualizacji sieci Ethereum](https://forkcast.org)
- [Strawmap: projekt mapy drogowej warstwy 1 (L1) Ethereum](https://strawmap.org) – _EF Architecture_
- [Postkwantowe Ethereum](https://pq.ethereum.org) – _Fundacja Ethereum_
- [Narzędzie do śledzenia mapy drogowej Lean Ethereum](https://leanroadmap.org) – _ReamLabs_
- [Dowód stawki (PoS) i ostateczność](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)