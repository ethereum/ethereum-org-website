---
title: Aktywne obszary badań nad Ethereum
description: Poznaj różne obszary otwartych badań i dowiedz się, jak się zaangażować.
lang: pl
---

Jedną z głównych zalet Ethereum jest to, że aktywna społeczność badawcza i inżynieryjna stale je udoskonala. Wielu entuzjastycznych, wykwalifikowanych ludzi na całym świecie chciałoby zająć się nierozwiązanymi problemami w Ethereum, ale nie zawsze łatwo jest dowiedzieć się, czym one są. Ta strona przedstawia kluczowe aktywne obszary badawcze jako ogólny przewodnik po najnowocześniejszych rozwiązaniach Ethereum.

## Jak działają badania nad Ethereum {#how-ethereum-research-works}

Badania nad Ethereum są otwarte i przejrzyste. Kultura polega na tym, aby narzędzia i wyniki badań były jak najbardziej otwarte i interaktywne, na przykład poprzez wykonywalne notatniki (executable notebooks). Badania nad Ethereum postępują szybko, a nowe odkrycia są publikowane i otwarcie dyskutowane na forach takich jak [ethresear.ch](https://ethresear.ch/), zamiast docierać do społeczności poprzez tradycyjne publikacje po rundach recenzji naukowych. Fundacja Ethereum publikuje również to, co traktuje priorytetowo i dlaczego, dzięki czemu każdy może zobaczyć, które problemy są obecnie uważane za pilne.

## Ogólne zasoby badawcze {#general-research-resources}

Niezależnie od konkretnego tematu, bogactwo informacji na temat badań nad Ethereum można znaleźć na [ethresear.ch](https://ethresear.ch) oraz na [kanale Eth R&D na Discordzie](https://discord.gg/qGpsxSA). Są to główne miejsca, w których badacze Ethereum dyskutują o najnowszych pomysłach i możliwościach rozwoju.

Aby uzyskać przegląd tego, w jakim kierunku zmierza protokół, zacznij od [mapy drogowej Ethereum](/roadmap/), a następnie przeczytaj [Aktualizację priorytetów protokołu na 2026 r.](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) Fundacji Ethereum oraz [aktualizacje klastrów protokołu](https://blog.ethereum.org/2026/05/11/protocol-update-may-26), które raportują postępy w tym zakresie. [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) to ustrukturyzowany punkt wejścia dla osób, które chcą pracować nad samym protokołem.

## Źródła finansowania {#sources-of-funding}

Możesz zaangażować się w badania nad Ethereum i otrzymywać za to wynagrodzenie. [Fundacja Ethereum](/foundation/) finansuje badania i dobra publiczne poprzez swój [Program Wsparcia Ekosystemu (Ecosystem Support Program)](https://esp.ethereum.foundation/applicants), który publikuje listy życzeń i zapytania ofertowe opisujące problemy, które chciałaby rozwiązać. Informacje o aktywnych i nadchodzących możliwościach finansowania można znaleźć na [stronie grantów Ethereum](/community/grants/).

## Badania nad protokołem {#protocol-research}

Badania nad protokołem dotyczą warstwy bazowej Ethereum: zestawu reguł określających, w jaki sposób węzły łączą się, komunikują, wymieniają i przechowują dane Ethereum oraz osiągają konsensus co do stanu blockchaina. Jego dwiema długoletnimi kategoriami są konsensus i wykonanie, a kilka tematów badawczych obecnie obejmuje obie te dziedziny.

### Konsensus {#consensus}

Badania nad konsensusem dotyczą [mechanizmu dowodu stawki (PoS) w Ethereum](/developers/docs/consensus-mechanisms/pos/): bezpieczeństwa reguły wyboru rozwidlenia i gadżetu ostateczności, kryptoekonomii stakingu, sieci peer-to-peer, która przenosi bloki, atestacje i dane blob, a także kryptografii, za pomocą której podpisują się walidatory. Przykładowe tematy badań nad konsensusem to:

- identyfikowanie i łatanie luk w zabezpieczeniach;
- kwantyfikacja bezpieczeństwa kryptoekonomicznego;
- skrócenie czasu potrzebnego na to, aby blok osiągnął ostateczność;
- oraz poprawa wydajności, bezpieczeństwa i monitorowania sieci peer-to-peer między klientami konsensusu.

Większość z tych prac przeszła z fazy koncepcyjnej do specyfikacji. Próbkowanie dostępności danych (DAS) zostało wdrożone w aktualizacji [Fusaka](/roadmap/fusaka/), zmiany w sposobie budowania bloków i gwarantowania włączenia transakcji są określone dla nadchodzących aktualizacji, a długoterminowe przeprojektowanie znane jako „lean consensus” bada szybszą ostateczność wraz z podpisami postkwantowymi.

#### Lektury uzupełniające {#background-reading}

- [Wprowadzenie do dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Ostateczność w pojedynczym slocie](/roadmap/single-slot-finality/)
- [Dokument Casper FFG](https://arxiv.org/abs/1710.09437)
- [Dokument Gasper](https://arxiv.org/abs/2003.03052)
- [lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Najnowsze badania {#recent-research}

- [Konsensus na Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dylemat dostępności/ostateczności](https://arxiv.org/abs/2009.04987)
- [Ostateczność w 3 slotach: SSF nie dotyczy „pojedynczego” slotu](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Wykonanie {#execution}

Warstwa wykonawcza zajmuje się wykonywaniem transakcji, uruchamianiem [maszyny wirtualnej Ethereum (EVM)](/developers/docs/evm/) i generowaniem ładunków wykonawczych (execution payloads) do przekazania do warstwy konsensusu. Badania w tym obszarze dzielą się na dwa nurty: sprawienie, by stan był tani w utrzymaniu i udowadnianiu, oraz zwiększenie przepustowości bez nakładania większych kosztów na osoby prowadzące węzły. Istnieje wiele aktywnych obszarów badawczych, w tym:

- zmiana wyceny kosztów gazu dla operacji tworzących stan;
- wygasanie historii, której węzły nie muszą już obsługiwać;
- listy dostępu na poziomie bloku, które pozwalają na równoległą walidację transakcji;
- wielowymiarowe rynki opłat, które wyceniają stan, dane i obliczenia oddzielnie;
- oraz udowadnianie wykonania bloków warstwy 1 (L1) za pomocą zkEVM.

#### Lektury uzupełniające {#background-reading-1}

- [Wprowadzenie do EVM](/developers/docs/evm/)
- [Warstwa wykonawcza na Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Specyfikacje warstwy wykonawczej Ethereum](https://github.com/ethereum/execution-specs)
- [Optymalizacje bazy danych](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Najnowsze badania {#recent-research-1}

- [EIP-7928: Listy dostępu na poziomie bloku](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Wzrost kosztu gazu za tworzenie stanu](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Zunifikowany wielowymiarowy rynek opłat](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, wygasanie historii i prostsze pokwitowania](https://eips.ethereum.org/EIPS/eip-7642)
- [Wdrażanie zkEVM na L1: udowadnianie w czasie rzeczywistym](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Odporność na cenzurę i budowanie bloków {#censorship-resistance-and-block-building}

Większość bloków Ethereum jest obecnie składana przez niewielką liczbę wyspecjalizowanych budowniczych, co koncentruje władzę decydowania o tym, które transakcje zostaną włączone. Badania w tym obszarze obejmują wprowadzenie rynku budowniczych do samego protokołu, tak aby role proponującego i budującego blok były rozdzielone przez zasady konsensusu, a nie przez oprogramowanie spoza protokołu, oraz zapewnienie walidatorom sposobu na wymuszenie włączenia transakcji, które budowniczowie pomijają.

#### Lektury uzupełniające {#background-reading-21}

- [Separacja proponującego i budującego (PBS)](/roadmap/pbs/)
- [Wybór pojedynczego tajnego lidera (SSLE)](/roadmap/secret-leader-election/)

#### Najnowsze badania {#recent-research-21}

- [EIP-7732: Wbudowana separacja proponującego i budującego (PBS)](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Listy włączeń wymuszane przez wybór rozwidlenia](https://eips.ethereum.org/EIPS/eip-7805)
- [Zwiększenie odporności transakcji na cenzurę w ramach separacji proponującego i budującego](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Wzrost stanu i bezstanowość {#state-growth-and-statelessness}

Każdy pełny węzeł przechowuje stan Ethereum, więc tempo, w jakim ten stan rośnie, wyznacza dolną granicę kosztów jego prowadzenia. W perspektywie krótkoterminowej badania koncentrują się na zmianie wyceny operacji tworzących stan oraz na wygasaniu historii, której węzły nie muszą już przechowywać. W dłuższej perspektywie planuje się zastąpienie szesnastkowego drzewa Merkle-Patricia w Ethereum drzewem binarnym, które generuje znacznie mniejsze dowody, oraz przejście w kierunku bezstanowości, tak aby węzeł mógł weryfikować bloki bez przechowywania całego stanu. Wcześniejsze prace w tym obszarze zakładały drzewa Verkle; obecna propozycja to zunifikowane drzewo binarne, które przenosi harmonogram gazu dla świadka określony dla tego wcześniejszego kierunku prac.

#### Lektury uzupełniające {#background-reading-22}

- [Bezstanowość i wygasanie stanu](/roadmap/statelessness/)
- [Książka o bezstanowości Ethereum](https://stateless.fyi/)

#### Najnowsze badania {#recent-research-22}

- [EIP-7864: Stan Ethereum z wykorzystaniem zunifikowanego drzewa binarnego](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Zmiany kosztów gazu dla bezstanowości](https://eips.ethereum.org/EIPS/eip-4762)
- [Dlaczego zdecentralizowany stan jest ważny dla Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Kryptografia postkwantowa {#post-quantum-cryptography}

Podpisy walidatorów Ethereum i znaczna część jego warstwy aplikacji opierają się na kryptografii krzywych eliptycznych, którą wystarczająco wydajny komputer kwantowy mógłby złamać. Uczynienie Ethereum odpornym na komputery kwantowe oznacza zastąpienie tych podpisów alternatywami opartymi na hashowaniu lub kratach, utrzymanie agregacji podpisów na tyle wydajnej, by obsłużyć duży zestaw walidatorów, oraz zapewnienie istniejącym kontom ścieżki migracji. Fundacja Ethereum prowadzi dedykowany zespół ds. kryptografii postkwantowej i jest to jeden z programów o najdłuższym horyzoncie czasowym na mapie drogowej.

#### Lektury uzupełniające {#background-reading-23}

- [Odporność kwantowa](/roadmap/security/quantum-resistance/)
- [Postkwantowe Ethereum](https://pq.ethereum.org/)

#### Najnowsze badania {#recent-research-23}

- [lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Kryptografia na Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implementacje lean Ethereum](https://github.com/leanEthereum)

## Rozwój klientów {#client-development}

Klienty Ethereum to implementacje protokołu Ethereum. Rozwój klientów przekształca wyniki badań nad protokołem w rzeczywistość poprzez wbudowywanie ich w te klienty. Rozwój klientów obejmuje aktualizację specyfikacji klientów, a także budowanie konkretnych implementacji.

Węzeł Ethereum wymaga uruchomienia dwóch elementów oprogramowania:

1. klienta konsensusu do śledzenia czoła blockchaina, propagowania bloków (gossip) i obsługi logiki konsensusu
2. klienta warstwy wykonawczej do obsługi maszyny wirtualnej Ethereum oraz wykonywania transakcji i inteligentnych kontraktów

Obok tych dwóch prototypowane są nowe klasy klientów, w tym klienty, które udowadniają wykonanie bloków warstwy 1 (L1) oraz klienty „lean consensus” zbudowane wokół podpisów postkwantowych.

Zobacz stronę [węzły i klienty](/developers/docs/nodes-and-clients/), aby uzyskać więcej szczegółów na temat węzłów i klientów oraz listę wszystkich obecnych implementacji klientów. Historię wszystkich aktualizacji Ethereum można również znaleźć na [stronie historii](/ethereum-forks/).

### Klienty warstwy wykonawczej {#execution-clients}

- [Specyfikacja klienta warstwy wykonawczej](https://github.com/ethereum/execution-specs)
- [Specyfikacja API warstwy wykonawczej](https://github.com/ethereum/execution-apis)

### Klienty konsensusu {#consensus-clients}

- [Specyfikacja klienta konsensusu](https://github.com/ethereum/consensus-specs)
- [Specyfikacja Beacon API](https://ethereum.github.io/beacon-APIs/)

### Klienty zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Wdrażanie zkEVM na L1: fundamenty bezpieczeństwa](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Skalowanie i wydajność {#scaling-and-performance}

Skalowanie Ethereum to duży obszar zainteresowania badaczy Ethereum, który przebiega dwutorowo: zwiększanie przepustowości samej warstwy 1 (L1) oraz przenoszenie wykonania na rollupy, które publikują swoje dane w Ethereum. Obecne prace obejmują zwiększenie limitu gazu w bloku, zmianę wyceny wzrostu stanu, zwiększenie pojemności blobów dla danych z rollupów oraz zmniejszenie tego, co węzeł musi przechowywać i weryfikować. Wstępne informacje na temat skalowania Ethereum są dostępne na naszej [stronie o skalowaniu](/developers/docs/scaling/) oraz w [mapie drogowej skalowania](/roadmap/scaling/).

### Warstwa 2 {#layer-2}

Obecnie istnieje kilka protokołów warstwy 2 (L2), które skalują Ethereum przy użyciu różnych technik wsadowania transakcji i zabezpieczania ich w warstwie 1 Ethereum. Otwarte badania obejmują zmniejszenie opóźnień i kosztów udowadniania, skrócenie czasu potrzebnego na osiągnięcie przez transakcję niewymagającej zaufania ostateczności oraz zapewnienie użytkownikom spójnego doświadczenia w wielu rollupach.

#### Lektury uzupełniające {#background-reading-2}

- [Wprowadzenie do warstwy 2 (L2)](/layer-2/)
- [L2BEAT: podsumowanie skalowania](https://l2beat.com/scaling/summary)
- [Mapa drogowa Ethereum skoncentrowana na rollupach](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Najnowsze badania {#recent-research-2}

- [Warstwa 2 na Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: koszty onchain](https://l2beat.com/scaling/costs)
- [Budowanie na Ethereum w 2026 roku: co się zmieniło](/latest/building-on-ethereum-in-2026/)

### Interoperacyjność {#interoperability}

Użytkownicy i aktywa są rozproszeni w warstwie 1 Ethereum i wielu warstwach 2, a problem badawczy polega na umożliwieniu im przemieszczania się i działania w tych łańcuchach bez ufania pośrednikowi. Prace w tym obszarze obejmują transfery oparte na intencjach, ustandaryzowane adresowanie i nazewnictwo międzyłańcuchowe, ogólne przekazywanie wiadomości oraz abstrakcję łańcucha na poziomie portfela. Zastępuje to model, w którym mosty powiernicze (custodial bridges) przechowywały aktywa, a mosty historycznie były jednym z największych źródeł strat w ekosystemie, więc bezpieczeństwo każdego mechanizmu międzyłańcuchowego pozostaje głównym przedmiotem troski.

#### Lektury uzupełniające {#background-reading-3}

- [Wprowadzenie do mostów blockchain](/bridges/)
- [Sprawienie, by Ethereum znów działało jak jeden łańcuch](https://blog.ethereum.org/2025/11/18/eil)
- [Open Intents Framework](https://openintents.xyz/)
- [Walidacja mostów](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Najnowsze badania {#recent-research-3}

- [ERC-7683: Intencje międzyłańcuchowe](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Adresy interoperacyjne](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Nazwy interoperacyjne](https://eips.ethereum.org/EIPS/eip-7828)

### Dostępność danych i skalowanie blobów {#data-availability-and-blob-scaling}

Rollupy publikują swoje dane w Ethereum w postaci blobów, a skalowanie tej warstwy danych jest odrębnym problemem badawczym, niezależnym od skalowania wykonania. Ethereum wykorzystuje teraz próbkowanie dostępności danych (DAS), dzięki czemu walidatory mogą zweryfikować, czy dane bloba zostały opublikowane, próbkując ich części zamiast pobierać je w całości, a pojemność blobów jest stopniowo zwiększana poprzez dedykowane rozwidlenia (forki) dotyczące wyłącznie parametrów blobów. Otwarte pytania obejmują to, jak daleko można posunąć próbkowanie, jak utrzymać wymagania dotyczące przepustowości na poziomie możliwym do opanowania dla osób stakujących w domu oraz jak wycena blobów powinna reagować na popyt.

#### Lektury uzupełniające {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Aktualizacja Fusaka](/roadmap/fusaka/)
- [Danksharding](/roadmap/danksharding/)
- [Dostępność danych](/developers/docs/data-availability/)
- [EIP-4844: Transakcje blobów shardów](https://eips.ethereum.org/EIPS/eip-4844)
- [Notatki o proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Najnowsze badania {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Hardforki dotyczące wyłącznie parametrów blobów](https://eips.ethereum.org/EIPS/eip-7892)
- [Sharding na Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Sprzęt {#hardware}

[Uruchamianie węzłów](/developers/docs/nodes-and-clients/run-a-node/) na skromnym sprzęcie ma fundamentalne znaczenie dla utrzymania zdecentralizowanego charakteru Ethereum, więc każdy wzrost przepustowości musi być wyważony w stosunku do kosztów, jakie ponosi operator węzła. Wraz ze wzrostem limitu gazu w bloku i planowanymi dalszymi podwyżkami, aktywne badania obejmują wzrost stanu i sposób jego wyceny, wydajność synchronizacji i bazy danych przy większym stanie, oszczędności miejsca na dysku wynikające z wygasania historii, a ostatecznie bezstanowość.

#### Lektury uzupełniające {#background-reading-5}

- [Uruchom własny węzeł Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Bezstanowość i wygasanie stanu](/roadmap/statelessness/)
- [Ethereum na ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Najnowsze badania {#recent-research-5}

- [Skalowanie Ethereum: droga do wyższego limitu gazu i dalej](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Harmonogram limitu gazu](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Wzrost kosztu gazu za tworzenie stanu](https://eips.ethereum.org/EIPS/eip-8037)

## Bezpieczeństwo {#security}

Bezpieczeństwo to szeroki temat, który może obejmować zapobieganie spamowi i oszustwom, bezpieczeństwo portfeli, bezpieczeństwo sprzętowe, bezpieczeństwo kryptoekonomiczne, odporność na cenzurę, gotowość postkwantową, poszukiwanie błędów (bug hunting) oraz testowanie i weryfikację aplikacji i oprogramowania klienckiego. [Mapa drogowa bezpieczeństwa](/roadmap/security/) Ethereum obejmuje prace na poziomie protokołu.

### Kryptografia i ZKP {#cryptography--zkp}

Dowody z wiedzą zerową (ZKP) i kryptografia mają kluczowe znaczenie dla wbudowania prywatności i bezpieczeństwa w Ethereum i jego aplikacje. Udowadnianie z wiedzą zerową przeszło z fazy badań do infrastruktury produkcyjnej: provery, które udowadniają rzeczywiste bloki Ethereum, są teraz publicznie testowane pod kątem opóźnień, kosztów i solidności (soundness). Otwarte problemy przesunęły się odpowiednio w kierunku udowadniania bloków warstwy 1 (L1) na tyle szybko, aby robić to w czasie rzeczywistym, rygorystycznego rozliczania bezpieczeństwa używanych systemów dowodowych oraz przygotowania do kryptografii postkwantowej.

#### Lektury uzupełniające {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Prywatność](/roadmap/privacy/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Najnowsze badania {#recent-research-6}

- [ZK na Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Kryptografia na Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Kalkulator solidności dla systemów dowodowych zkEVM opartych na hashowaniu](https://github.com/ethereum/soundcalc)
- [Wdrażanie zkEVM na L1: fundamenty bezpieczeństwa](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Portfele {#wallets}

Portfele Ethereum mogą być rozszerzeniami przeglądarki, aplikacjami na komputery stacjonarne i urządzenia mobilne lub inteligentnymi kontraktami w Ethereum. Abstrakcja konta nie jest już eksperymentalna: ERC-4337 zapewnia inteligentne konta bez zmian w protokole, a EIP-7702 pozwala zwykłemu kontu ustawić kod tak, aby wsadowanie transakcji, sponsorowanie gazu i odzyskiwanie społecznościowe działały z adresem, który użytkownik już posiada. Otwarte badania koncentrują się obecnie na natywnej abstrakcji konta w samym protokole, na modułowych i audytowalnych architekturach kont oraz na zarządzaniu kluczami i ich odzyskiwaniu, które zwykli ludzie mogą bezpiecznie obsługiwać.

#### Lektury uzupełniające {#background-reading-7}

- [Wprowadzenie do portfeli](/wallets/)
- [Wprowadzenie do bezpieczeństwa portfeli](/security/)
- [Abstrakcja konta](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Bezpieczeństwo na Ethresear.ch](https://ethresear.ch/c/security/25)

#### Najnowsze badania {#recent-research-7}

- [EIP-8141: Transakcja ramowa (Frame transaction)](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API wywołań portfela](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Odkrywanie wielu wstrzykniętych dostawców (Multi injected provider discovery)](https://eips.ethereum.org/EIPS/eip-6963)
- [Portfele inteligentnych kontraktów skoncentrowane na walidacji](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Społeczność, edukacja i działania informacyjne {#community-education-and-outreach}

Onboarding nowych użytkowników do Ethereum wymaga nowych zasobów edukacyjnych i podejść do działań informacyjnych. Może to obejmować posty na blogach i artykuły, książki, podcasty, memy, materiały dydaktyczne, zdarzenia i wszystko inne, co buduje społeczności, wita nowych początkujących i edukuje ludzi na temat Ethereum.

### Projektowanie i UX {#design-and-ux}

Aby przeprowadzić onboarding większej liczby osób do Ethereum, ekosystem musi poprawić swój projekt i doświadczenie użytkownika (UX). Wymaga to od projektantów i ekspertów produktowych ponownego zbadania, jak działają portfele i aplikacje, i coraz częściej oznacza projektowanie w oparciu o już istniejące standardy: wsadowane wywołania portfela, sponsorowanie gazu, konta, które można odzyskać, oraz czytelne dla człowieka adresy, które niosą ze sobą informację o łańcuchu, do którego należą. Istnieje stosunkowo niewiele kanonicznych miejsc dla badań nad UX w Web3, więc opublikowane badania i wytyczne projektowe są zazwyczaj rozproszone.

#### Lektury uzupełniające {#background-reading-8}

- [Projektowanie i UX w Web3](/developers/docs/design-and-ux/)
- [Mapa drogowa doświadczeń użytkownika Ethereum](/roadmap/user-experience/)
- [Przewodnik projektowania Web3](https://learnweb3.design/)
- [Podręcznik projektowania UX w Web3](https://web3ux.design/)

#### Najnowsze badania {#recent-research-8}

- [UX/UI na Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API wywołań portfela](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Nazwy interoperacyjne](https://eips.ethereum.org/EIPS/eip-7828)

### Ekonomia {#economics}

Badania ekonomiczne w Ethereum zasadniczo podążają dwoma podejściami: walidacja bezpieczeństwa mechanizmów opartych na zachętach ekonomicznych („mikroekonomia”) oraz analiza przepływów wartości między protokołami, aplikacjami i użytkownikami („makroekonomia”). Istnieją złożone czynniki kryptoekonomiczne związane z natywnym aktywem Ethereum (ether) i tokenami zbudowanymi na jego bazie (na przykład NFT i tokeny ERC-20).

#### Lektury uzupełniające {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Masterclass z ekonomii Ethereum i model ekonomiczny](https://github.com/CADLabs/ethereum-economic-model)

#### Najnowsze badania {#recent-research-9}

- [Ekonomia na Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Równowaga podaży w obiegu](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Kwantyfikacja MEV: Jak ciemny jest las?](https://arxiv.org/abs/2101.05511)

### Przestrzeń blokowa i rynki opłat {#blockspace-fee-markets}

Rynki przestrzeni blokowej (blockspace) zarządzają włączaniem transakcji użytkowników końcowych, bezpośrednio w Ethereum (warstwa 1) lub w zmostkowanych sieciach, np. rollupach (warstwa 2). W Ethereum transakcje są przesyłane na rynek opłat wdrożony w protokole jako EIP-1559, chroniąc łańcuch przed spamem i wyceniając zatory. Na obu warstwach transakcje mogą generować efekty zewnętrzne, znane jako maksymalna wartość do wyodrębnienia (MEV), które indukują nowe struktury rynkowe w celu przechwycenia lub zarządzania tymi efektami zewnętrznymi. Obecne prace rozszerzają to na wycenę kilku zasobów jednocześnie, ponieważ stan, dane i obliczenia ulegają zatorom niezależnie, a także na zmianę tego, kto składa bloki i na jakich warunkach.

#### Lektury uzupełniające {#background-reading-10}

- [Projekt mechanizmu opłat transakcyjnych dla blockchaina Ethereum: Analiza ekonomiczna EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Symulacje EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Ekonomia rollupów od podstaw](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, zmiana kolejności transakcji i niestabilność konsensusu na zdecentralizowanych giełdach](https://arxiv.org/abs/1904.05234)

#### Najnowsze badania {#recent-research-10}

- [EIP-7999: Zunifikowany wielowymiarowy rynek opłat](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Listy dostępu na poziomie bloku](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV między domenami (Cross domain MEV)](https://arxiv.org/abs/2112.01472)

### Zachęty w dowodzie stawki (PoS) {#proof-of-stake-incentives}

Walidatory używają natywnego aktywa Ethereum (ether) jako zabezpieczenia przed nieuczciwym zachowaniem. Kryptoekonomia tego procesu determinuje bezpieczeństwo sieci. Zaawansowane walidatory mogą być w stanie wykorzystać niuanse warstwy zachęt do przeprowadzania jawnych ataków. Od czasu aktualizacji Pectra walidatory mogą również utrzymywać i zarabiać na znacznie większym saldzie efektywnym oraz konsolidować kilka walidatorów w jeden, co zmienia ekonomikę ich prowadzenia.

#### Lektury uzupełniające {#background-reading-11}

- [Maksymalne saldo efektywne](/roadmap/pectra/maxeb/)
- [Masterclass z ekonomii Ethereum i model ekonomiczny](https://github.com/CADLabs/ethereum-economic-model)
- [Symulacje zachęt PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Najnowsze badania {#recent-research-11}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Trzy ataki na PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Płynny staking i instrumenty pochodne {#liquid-staking-and-derivatives}

Płynny staking pozwala użytkownikom posiadającym mniej niż 32 ETH na otrzymywanie zysków ze stakingu poprzez wymianę etheru na token reprezentujący stakowany ether, który może być używany w zdecentralizowanych finansach (DeFi). Jednak zachęty i dynamika rynku związane z płynnym stakingiem są wciąż odkrywane, podobnie jak jego wpływ na bezpieczeństwo Ethereum (np. ryzyko centralizacji).

#### Lektury uzupełniające {#background-reading-12}

- [Płynny staking na Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Droga do niewymagającego zaufania stakingu Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Najnowsze badania {#recent-research-12}

- [Ryzyka związane z instrumentami pochodnymi płynnego stakingu (LSD)](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Obsługa wypłat z Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Testowanie {#testing}

### Testowanie klientów i sieci {#client-and-network-testing}

Specyfikacje Ethereum są wykonywalne, a wygenerowane z nich zestawy testowe (test fixtures) służą zespołom klienckim do sprawdzania swoich implementacji. Oprócz nich, współdzielone środowiska testowe (test harnesses) uruchamiają klienty przeciwko sobie i w celowo wrogich warunkach sieciowych, a publiczne sieci testowe sprawdzają aktualizacje, zanim dotrą one do Sieci głównej. Ulepszanie tej infrastruktury to jedna z najbardziej efektywnych dostępnych prac, ponieważ w ten sposób błędy są wyłapywane, zanim dotrą do użytkowników.

#### Lektury uzupełniające {#background-reading-24}

- [Specyfikacje warstwy wykonawczej Ethereum](https://github.com/ethereum/execution-specs)
- [Specyfikacja klienta konsensusu](https://github.com/ethereum/consensus-specs)

#### Najnowsze badania {#recent-research-24}

- [hive, kompleksowe środowisko testowe dla klientów](https://github.com/ethereum/hive)
- [Assertoor, narzędzie do testowania sieci testowych](https://github.com/ethpandaops/assertoor)

### Weryfikacja formalna {#formal-verification}

Weryfikacja formalna wykorzystuje sprawdzany maszynowo dowód matematyczny w celu ustalenia, czy specyfikacja lub implementacja zachowuje się zgodnie z zamierzeniami. W Ethereum obejmuje to udowadnianie, że implementacje EVM pasują do formalnej semantyki, udowadnianie solidności obwodów i systemów dowodowych, na których opierają się provery z wiedzą zerową, oraz weryfikację leżących u ich podstaw prymitywów kryptograficznych. Dalsze badania mogą wzmocnić te dowody i rozszerzyć je na większą część stosu technologicznego.

#### Lektury uzupełniające {#background-reading-13}

- [Zweryfikowane zkEVM](https://verified-zkevm.org/)
- [Weryfikacja formalna (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Najnowsze badania {#recent-research-13}

- [Przegląd projektu zweryfikowanego zkEVM](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semantyka EVM w K](https://github.com/runtimeverification/evm-semantics)
- [Weryfikacja formalna kontraktu depozytowego](https://github.com/runtimeverification/deposit-contract-verification)

## Nauka o danych i analityka {#data-science-and-analytics}

Istnieje potrzeba stworzenia większej liczby narzędzi do analizy danych i pulpitów nawigacyjnych (dashboards), które dostarczają szczegółowych informacji o aktywności w Ethereum i kondycji sieci. Większość podstawowych danych jest publiczna i można je odpytywać, więc luka zwykle dotyczy analizy i prezentacji, a nie dostępu.

### Lektury uzupełniające {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Pulpit nawigacyjny różnorodności klientów](https://clientdiversity.org/)
- [Specyfikacja API wykonawczego JSON-RPC Ethereum](https://ethereum.github.io/execution-apis/)

#### Najnowsze badania {#recent-research-14}

- [Analiza danych Robust Incentives Group](https://rig.ethereum.org/)
- [Otwarte dane ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: podsumowanie skalowania](https://l2beat.com/scaling/summary)

## Aplikacje i narzędzia {#apps-and-tooling}

Warstwa aplikacji obsługuje zróżnicowany ekosystem programów, które rozliczają transakcje w warstwie bazowej Ethereum. Zespoły programistyczne nieustannie znajdują nowe sposoby na wykorzystanie Ethereum do tworzenia komponowalnych, niewymagających pozwoleń i odpornych na cenzurę wersji ważnych aplikacji Web2 lub tworzenia zupełnie nowych koncepcji natywnych dla Web3. Jednocześnie opracowywane są nowe narzędzia, które sprawiają, że budowanie zdecentralizowanych aplikacji (dapp) na Ethereum jest mniej skomplikowane.

### DeFi {#defi}

Zdecentralizowane finanse (DeFi) to jedna z głównych klas aplikacji zbudowanych na Ethereum. DeFi ma na celu stworzenie komponowalnych „klocków lego z pieniędzmi”, które pozwalają użytkownikom przechowywać, transferować, pożyczać i inwestować kryptoaktywa za pomocą inteligentnych kontraktów. DeFi to szybko rozwijająca się przestrzeń, która jest stale aktualizowana. Badania nad bezpiecznymi, wydajnymi i dostępnymi protokołami są stale potrzebne.

#### Lektury uzupełniające {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Czym jest DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Najnowsze badania {#recent-research-15}

- [Zdecentralizowane finanse, scentralizowana własność?](https://arxiv.org/pdf/2012.09306.pdf)
- [Aplikacje na Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Wpływowym przypadkiem użycia Ethereum jest możliwość organizowania się w zdecentralizowany sposób poprzez wykorzystanie DAO. Prowadzi się wiele aktywnych badań nad tym, jak DAO na Ethereum mogą być rozwijane i wykorzystywane do wdrażania ulepszonych form zarządzania, jako narzędzie koordynacji o zminimalizowanym zaufaniu, znacznie poszerzając możliwości ludzi poza tradycyjne korporacje i organizacje.

#### Lektury uzupełniające {#background-reading-16}

- [Wprowadzenie do DAO](/dao/)

#### Najnowsze badania {#recent-research-16}

- [Mapowanie ekosystemu DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Narzędzia dla programistów {#developer-tools}

Narzędzia dla programistów Ethereum szybko się poprawiają. W tym ogólnym obszarze jest wiele do zrobienia w zakresie aktywnych badań i rozwoju.

#### Lektury uzupełniające {#background-reading-17}

- [Narzędzia według języka programowania](/developers/docs/programming-languages/)
- [Frameworki programistyczne](/developers/docs/frameworks/)
- [Wprowadzenie do zdecentralizowanych aplikacji (dapp)](/developers/docs/dapps/)
- [Standardy tokenów](/developers/docs/standards/tokens/)

#### Najnowsze badania {#recent-research-17}

- [Discord Eth R&D](https://discord.gg/qGpsxSA)
- [Specyfikacje API wykonawczego Ethereum](https://github.com/ethereum/execution-apis)

### Wyrocznie (Oracles) {#oracles}

Wyrocznie (oracles) importują dane pozałańcuchowe do blockchaina w sposób niewymagający pozwoleń i zdecentralizowany. Wprowadzenie tych danych onchain umożliwia zdecentralizowanym aplikacjom (dapp) reagowanie na zjawiska w świecie rzeczywistym, takie jak wahania cen aktywów w świecie rzeczywistym, zdarzenia w aplikacjach pozałańcuchowych, a nawet zmiany pogody.

#### Lektury uzupełniające {#background-reading-18}

- [Wprowadzenie do wyroczni (oracles)](/developers/docs/oracles/)

#### Najnowsze badania {#recent-research-18}

- [Przegląd wyroczni blockchain](https://arxiv.org/pdf/2004.07140.pdf)

### Bezpieczeństwo aplikacji {#app-security}

Ataki hakerskie na Ethereum na ogół wykorzystują luki w poszczególnych aplikacjach, a nie w samym protokole. Hakerzy i twórcy aplikacji toczą wyścig zbrojeń w celu opracowania nowych ataków i zabezpieczeń. Oznacza to, że zawsze potrzebne są ważne badania i rozwój, aby chronić aplikacje przed atakami hakerskimi.

#### Lektury uzupełniające {#background-reading-19}

- [Bezpieczeństwo inteligentnych kontraktów](/developers/docs/smart-contracts/security/)
- [Raport o exploicie Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Lista analiz post-mortem ataków na kontrakty Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Najnowsze badania {#recent-research-19}

- [Aplikacje na Ethresear.ch](https://ethresear.ch/c/applications/18)

### Stos technologiczny {#technology-stack}

Decentralizacja całego stosu technologicznego Ethereum jest ważnym obszarem badawczym. Obecnie zdecentralizowane aplikacje (dapp) na Ethereum często mają pewne punkty centralizacji, ponieważ opierają się na scentralizowanych narzędziach lub infrastrukturze. Zmniejszenie tej zależności oznacza uczynienie praktycznym dla aplikacji odczytywania Ethereum bez ufania jednemu dostawcy, w czym pomagają lekkie klienty i niewymagający zaufania dostęp do danych węzła.

#### Lektury uzupełniające {#background-reading-20}

- [Stos Ethereum](/developers/docs/ethereum-stack/)
- [Lekkie klienty](/developers/docs/nodes-and-clients/light-clients/)
- [Wprowadzenie do inteligentnych kontraktów](/developers/docs/smart-contracts/)
- [Wprowadzenie do zdecentralizowanego przechowywania](/developers/docs/storage/)

#### Najnowsze badania {#recent-research-20}

- [Kompozycyjność inteligentnych kontraktów](/developers/docs/smart-contracts/composability/)
- [Coinbase: Wprowadzenie do stosu Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)