---
title: Aktywne obszary badań nad Ethereum
description: Poznaj różne obszary otwartych badań i dowiedz się, jak się zaangażować.
lang: pl
---

Jedną z głównych zalet Ethereum jest to, że aktywna społeczność badawcza i inżynieryjna stale je udoskonala. Wielu entuzjastycznych, wykwalifikowanych ludzi na całym świecie chciałoby zająć się nierozwiązanymi problemami w Ethereum, ale nie zawsze łatwo jest dowiedzieć się, czym one są. Ta strona przedstawia kluczowe aktywne obszary badawcze jako ogólny przewodnik po najnowocześniejszych rozwiązaniach Ethereum.

## Jak działają badania nad Ethereum {#how-ethereum-research-works}

Badania nad Ethereum są otwarte i przejrzyste, ucieleśniając zasady [zdecentralizowanej nauki (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Kultura ta polega na tym, aby narzędzia i wyniki badań były jak najbardziej otwarte i interaktywne, na przykład poprzez wykonywalne notatniki (executable notebooks). Badania nad Ethereum postępują szybko, a nowe odkrycia są publikowane i otwarcie dyskutowane na forach takich jak [ethresear.ch](https://ethresear.ch/), zamiast docierać do społeczności poprzez tradycyjne publikacje po wielu rundach recenzji naukowych.

## Ogólne zasoby badawcze {#general-research-resources}

Niezależnie od konkretnego tematu, bogactwo informacji na temat badań nad Ethereum można znaleźć na [ethresear.ch](https://ethresear.ch) oraz na [kanale Eth R&D na Discordzie](https://discord.gg/qGpsxSA). Są to główne miejsca, w których badacze Ethereum dyskutują o najnowszych pomysłach i możliwościach rozwoju.

Ten raport opublikowany w maju 2022 r. przez [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) stanowi dobry przegląd mapy drogowej Ethereum.

## Źródła finansowania {#sources-of-funding}

Możesz zaangażować się w badania nad Ethereum i otrzymywać za to wynagrodzenie! Na przykład [Fundacja Ethereum](/foundation/) przeprowadziła niedawno [rundę finansowania grantów akademickich](https://esp.ethereum.foundation/academic-grants). Informacje o aktywnych i nadchodzących możliwościach finansowania można znaleźć na [stronie grantów Ethereum](/community/grants/).

## Badania nad protokołem {#protocol-research}

Badania nad protokołem dotyczą warstwy bazowej Ethereum – zestawu reguł określających, w jaki sposób węzły łączą się, komunikują, wymieniają i przechowują dane Ethereum oraz osiągają konsensus co do stanu blockchaina. Badania nad protokołem dzielą się na dwie główne kategorie: konsensus i wykonanie.

### Konsensus {#consensus}

Badania nad konsensusem dotyczą [mechanizmu dowodu stawki (PoS) w Ethereum](/developers/docs/consensus-mechanisms/pos/). Przykładowe tematy badań nad konsensusem to:

- identyfikowanie i łatanie luk w zabezpieczeniach;
- kwantyfikacja bezpieczeństwa kryptoekonomicznego;
- zwiększanie bezpieczeństwa lub wydajności implementacji klientów;
- oraz rozwój lekkich klientów.

Oprócz badań wybiegających w przyszłość, badane są również pewne fundamentalne zmiany w projekcie protokołu, takie jak ostateczność w pojedynczym slocie, aby umożliwić znaczące ulepszenia Ethereum. Ponadto ważnymi tematami badawczymi są również wydajność, bezpieczeństwo i monitorowanie sieci peer-to-peer między klientami konsensusu.

#### Lektury uzupełniające {#background-reading}

- [Wprowadzenie do dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Dokument o Casper FFG](https://arxiv.org/abs/1710.09437)
- [Wyjaśnienie Casper FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Dokument o Gasper](https://arxiv.org/abs/2003.03052)

#### Najnowsze badania {#recent-research}

- [Konsensus na Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dylemat dostępności/ostateczności](https://arxiv.org/abs/2009.04987)
- [Ostateczność w pojedynczym slocie](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Separacja proponującego i budującego (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Wykonanie {#execution}

Warstwa wykonawcza zajmuje się wykonywaniem transakcji, uruchamianiem [Wirtualnej Maszyny Ethereum (EVM)](/developers/docs/evm/) i generowaniem ładunków wykonawczych (execution payloads) do przekazania do warstwy konsensusu. Istnieje wiele aktywnych obszarów badawczych, w tym:

- rozbudowa wsparcia dla lekkich klientów;
- badanie limitów gazu;
- oraz włączanie nowych struktur danych (np. drzewa Verkle).

#### Lektury uzupełniające {#background-reading-1}

- [Wprowadzenie do EVM](/developers/docs/evm)
- [Warstwa wykonawcza na Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Najnowsze badania {#recent-research-1}

- [Optymalizacje bazy danych](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Wygasanie stanu](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Ścieżki do wygasania stanu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Propozycja drzew Verkle i wygasania stanu](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Zarządzanie historią](https://eips.ethereum.org/EIPS/eip-4444)
- [Drzewa Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Próbkowanie dostępności danych (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Rozwój klientów {#client-development}

Klienty Ethereum to implementacje protokołu Ethereum. Rozwój klientów przekształca wyniki badań nad protokołem w rzeczywistość poprzez wbudowywanie ich w te klienty. Rozwój klientów obejmuje aktualizację specyfikacji klientów, a także budowanie konkretnych implementacji.

Węzeł Ethereum wymaga uruchomienia dwóch elementów oprogramowania:

1. klienta konsensusu do śledzenia czoła blockchaina, rozgłaszania bloków i obsługi logiki konsensusu
2. klienta warstwy wykonawczej do obsługi Wirtualnej Maszyny Ethereum oraz wykonywania transakcji i inteligentnych kontraktów

Zobacz [stronę o węzłach i klientach](/developers/docs/nodes-and-clients/), aby uzyskać więcej szczegółów na temat węzłów i klientów oraz listę wszystkich obecnych implementacji klientów. Historię wszystkich aktualizacji Ethereum można również znaleźć na [stronie historii](/ethereum-forks/).

### Klienty warstwy wykonawczej {#execution-clients}

- [Specyfikacja klienta warstwy wykonawczej](https://github.com/ethereum/execution-specs)
- [Specyfikacja API warstwy wykonawczej](https://github.com/ethereum/execution-apis)

### Klienty konsensusu {#consensus-clients}

- [Specyfikacja klienta konsensusu](https://github.com/ethereum/consensus-specs)
- [Specyfikacja Beacon API](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skalowanie i wydajność {#scaling-and-performance}

Skalowanie Ethereum to duży obszar zainteresowania badaczy Ethereum. Obecne podejścia obejmują przenoszenie transakcji na rollupy i czynienie ich tak tanimi, jak to możliwe, przy użyciu obiektów blob danych (data blobs). Wstępne informacje na temat skalowania Ethereum są dostępne na naszej [stronie o skalowaniu](/developers/docs/scaling).

### Warstwa 2 (L2) {#layer-2}

Obecnie istnieje kilka protokołów warstwy 2, które skalują Ethereum przy użyciu różnych technik wsadowania transakcji i zabezpieczania ich na warstwie 1 (L1) Ethereum. Jest to bardzo szybko rozwijający się temat z dużym potencjałem badawczo-rozwojowym.

#### Lektury uzupełniające {#background-reading-2}

- [Wprowadzenie do warstwy 2](/layer-2/)
- [Polynya: Rollupy, DA i łańcuchy modularne](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Najnowsze badania {#recent-research-2}

- [Sprawiedliwe porządkowanie dla sekwencerów w Arbitrum](https://eprint.iacr.org/2021/1465)
- [Warstwa 2 na Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Mapa drogowa skoncentrowana na rollupach](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Mosty {#bridges}

Jednym ze szczególnych obszarów warstwy 2, który wymaga więcej badań i rozwoju, są bezpieczne i wydajne mosty. Obejmuje to mosty między różnymi sieciami warstwy 2 oraz mosty między warstwą 1 a warstwą 2. Jest to szczególnie ważny obszar badań, ponieważ mosty są często celem ataków hakerów.

#### Lektury uzupełniające {#background-reading-3}

- [Wprowadzenie do mostów blockchain](/bridges/)
- [Vitalik o mostach](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artykuł o mostach blockchain](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Wartość zablokowana w mostach](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Najnowsze badania {#recent-research-3}

- [Walidacja mostów](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Sharding blockchaina Ethereum od dawna jest częścią mapy drogowej rozwoju. Jednak nowe rozwiązania skalujące, takie jak „danksharding”, zajmują obecnie centralne miejsce.

Prekursor pełnego dankshardingu, znany jako proto-danksharding, został uruchomiony wraz z aktualizacją sieci Cancun-Deneb („Dencun”).

[Więcej o aktualizacji Dencun](/roadmap/dencun/)

#### Lektury uzupełniające {#background-reading-4}

- [Notatki o proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Wideo Bankless o dankshardingu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Kompendium badań nad shardingiem Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Najnowsze badania {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik o shardingu i próbkowaniu dostępności danych (DAS)](https://hackmd.io/@vbuterin/sharding_proposal)

### Sprzęt {#hardware}

[Uruchamianie węzłów](/developers/docs/nodes-and-clients/run-a-node/) na skromnym sprzęcie ma fundamentalne znaczenie dla utrzymania zdecentralizowanego charakteru Ethereum. Dlatego aktywne badania nad minimalizacją wymagań sprzętowych do uruchamiania węzłów są ważnym obszarem badawczym.

#### Lektury uzupełniające {#background-reading-5}

- [Ethereum na ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Najnowsze badania {#recent-research-5}

- [ECDSA na układach FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Bezpieczeństwo {#security}

Bezpieczeństwo to szeroki temat, który może obejmować zapobieganie spamowi/oszustwom, bezpieczeństwo portfeli, bezpieczeństwo sprzętowe, bezpieczeństwo kryptoekonomiczne, poszukiwanie błędów (bug hunting) oraz testowanie aplikacji i oprogramowania klienckiego, a także zarządzanie kluczami. Wnoszenie wkładu w wiedzę w tych obszarach pomoże stymulować powszechną adopcję.

### Kryptografia i ZKP {#cryptography--zkp}

Dowody z wiedzą zerową (ZKP) i kryptografia mają kluczowe znaczenie dla budowania prywatności i bezpieczeństwa w Ethereum i jego aplikacjach. Wiedza zerowa to stosunkowo młoda, ale szybko rozwijająca się przestrzeń z wieloma otwartymi możliwościami badawczo-rozwojowymi. Niektóre możliwości obejmują opracowanie bardziej wydajnych implementacji [algorytmu haszowania Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), znalezienie lepszych zobowiązań wielomianowych (polynomial commitments) niż obecnie istniejące lub zmniejszenie kosztów generowania klucza publicznego ECDSA i obwodów weryfikacji podpisu.

#### Lektury uzupełniające {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Najnowsze badania {#recent-research-6}

- [Najnowsze postępy w kryptografii krzywych eliptycznych](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK na Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Portfele {#wallets}

Portfele Ethereum mogą być rozszerzeniami przeglądarki, aplikacjami na komputery stacjonarne i urządzenia mobilne lub inteligentnymi kontraktami na Ethereum. Prowadzone są aktywne badania nad portfelami z odzyskiwaniem społecznościowym, które zmniejszają część ryzyka związanego z zarządzaniem kluczami przez poszczególnych użytkowników. Z rozwojem portfeli wiążą się badania nad alternatywnymi formami abstrakcji konta, co jest ważnym obszarem nowo powstających badań.

#### Lektury uzupełniające {#background-reading-7}

- [Wprowadzenie do portfeli](/wallets/)
- [Wprowadzenie do bezpieczeństwa portfeli](/security/)
- [Bezpieczeństwo na Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: Abstrakcja konta](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: Abstrakcja konta](https://eips.ethereum.org/EIPS/eip-4337)

#### Najnowsze badania {#recent-research-7}

- [Portfele inteligentnych kontraktów skoncentrowane na walidacji](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Przyszłość kont](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: Kody operacji AUTH i AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publikowanie kodu pod adresem EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Społeczność, edukacja i zasięg {#community-education-and-outreach}

Onboarding nowych użytkowników do Ethereum wymaga nowych zasobów edukacyjnych i podejść do działań informacyjnych. Może to obejmować posty na blogach i artykuły, książki, podcasty, memy, materiały dydaktyczne, wydarzenia i wszystko inne, co buduje społeczności, wita nowych początkujących i edukuje ludzi na temat Ethereum.

### UX/UI {#uxui}

Aby przeprowadzić onboarding większej liczby osób do Ethereum, ekosystem musi poprawić UX/UI. Będzie to wymagało od projektantów i ekspertów produktowych ponownego przeanalizowania projektów portfeli i aplikacji.

#### Lektury uzupełniające {#background-reading-8}

- [UX/UI na Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Najnowsze badania {#recent-research-8}

- [Discord Web3 Design](https://discord.gg/FsCFPMTSm9)
- [Zasady projektowania Web3](https://www.web3designprinciples.com/)
- [Dyskusja o UX na Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomia {#economics}

Badania ekonomiczne w Ethereum zasadniczo podążają za dwoma podejściami: walidacją bezpieczeństwa mechanizmów opartych na zachętach ekonomicznych („mikroekonomia”) oraz analizą przepływów wartości między protokołami, aplikacjami i użytkownikami („makroekonomia”). Istnieją złożone czynniki kryptoekonomiczne związane z natywnym aktywem Ethereum (ether) i tokenami zbudowanymi na jego bazie (na przykład NFT i tokeny ERC-20).

#### Lektury uzupełniające {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Warsztaty ETHconomics na Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Najnowsze badania {#recent-research-9}

- [Analiza empiryczna EIP-1559](https://arxiv.org/abs/2201.05574)
- [Równowaga podaży w obiegu](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Kwantyfikacja MEV: Jak ciemny jest ten las?](https://arxiv.org/abs/2101.05511)

### Przestrzeń blokowa i rynki opłat {#blockspace-fee-markets}

Rynki przestrzeni blokowej (blockspace) zarządzają włączaniem transakcji użytkowników końcowych, bezpośrednio na Ethereum (warstwa 1) lub w zmostkowanych sieciach, np. rollupach (warstwa 2). W Ethereum transakcje są przesyłane na rynek opłat wdrożony w protokole jako EIP-1559, chroniąc łańcuch przed spamem i wyceniając zatory. Na obu warstwach transakcje mogą generować efekty zewnętrzne, znane jako maksymalna wartość do wyodrębnienia (MEV), które indukują nowe struktury rynkowe w celu przechwytywania lub zarządzania tymi efektami zewnętrznymi.

#### Lektury uzupełniające {#background-reading-10}

- [Projekt mechanizmu opłat transakcyjnych dla blockchaina Ethereum: Analiza ekonomiczna EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Symulacje EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Ekonomia rollupów od podstaw](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, zmiana kolejności transakcji i niestabilność konsensusu na zdecentralizowanych giełdach](https://arxiv.org/abs/1904.05234)

#### Najnowsze badania {#recent-research-10}

- [Prezentacja wideo o wielowymiarowym EIP-1559](https://youtu.be/QbR4MTgnCko)
- [MEV między domenami (Cross domain MEV)](https://arxiv.org/abs/2112.01472)
- [Aukcje MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Zachęty w dowodzie stawki (PoS) {#proof-of-stake-incentives}

Walidatorzy używają natywnego aktywa Ethereum (ether) jako zabezpieczenia przed nieuczciwym zachowaniem. Kryptoekonomia tego procesu determinuje bezpieczeństwo sieci. Zaawansowani walidatorzy mogą być w stanie wykorzystać niuanse warstwy zachęt do przeprowadzania jawnych ataków.

#### Lektury uzupełniające {#background-reading-11}

- [Masterclass z ekonomii Ethereum i model ekonomiczny](https://github.com/CADLabs/ethereum-economic-model)
- [Symulacje zachęt PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Najnowsze badania {#recent-research-11}

- [Zwiększanie odporności transakcji na cenzurę w ramach separacji proponującego i budującego (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Trzy ataki na PoS w Ethereum](https://arxiv.org/abs/2110.10086)

### Płynny staking i instrumenty pochodne {#liquid-staking-and-derivatives}

Płynny staking pozwala użytkownikom posiadającym mniej niż 32 ETH na otrzymywanie zysków ze stakingu poprzez wymianę etheru na token reprezentujący stakowany ether, który może być używany w DeFi. Jednak zachęty i dynamika rynku związane z płynnym stakingiem są wciąż odkrywane, podobnie jak jego wpływ na bezpieczeństwo Ethereum (np. ryzyko centralizacji).

#### Lektury uzupełniające {#background-reading-12}

- [Płynny staking na Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Droga do niewymagającego zaufania stakingu Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Wprowadzenie do protokołu stakingu](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Najnowsze badania {#recent-research-12}

- [Obsługa wypłat z Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Dane uwierzytelniające wypłaty](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Ryzyka związane z instrumentami pochodnymi płynnego stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testowanie {#testing}

### Weryfikacja formalna {#formal-verification}

Weryfikacja formalna to pisanie kodu w celu sprawdzenia, czy specyfikacje konsensusu Ethereum są poprawne i wolne od błędów. Istnieje wykonywalna wersja specyfikacji napisana w języku Python, która wymaga utrzymania i rozwoju. Dalsze badania mogą pomóc w ulepszeniu implementacji specyfikacji w języku Python i dodaniu narzędzi, które mogą solidniej weryfikować poprawność i identyfikować problemy.

#### Lektury uzupełniające {#background-reading-13}

- [Wprowadzenie do weryfikacji formalnej](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Weryfikacja formalna (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Najnowsze badania {#recent-research-13}

- [Weryfikacja formalna kontraktu depozytowego](https://github.com/runtimeverification/deposit-contract-verification)
- [Weryfikacja formalna specyfikacji Beacon Chain](https://github.com/runtimeverification/deposit-contract-verification)

## Nauka o danych i analityka {#data-science-and-analytics}

Istnieje potrzeba stworzenia większej liczby narzędzi do analizy danych i pulpitów nawigacyjnych, które dostarczają szczegółowych informacji o aktywności w Ethereum i kondycji sieci.

### Lektury uzupełniające {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Pulpit nawigacyjny różnorodności klientów](https://clientdiversity.org/)

#### Najnowsze badania {#recent-research-14}

- [Analiza danych Robust Incentives Group](https://rig.ethereum.org/)

## Aplikacje i narzędzia {#apps-and-tooling}

Warstwa aplikacji obsługuje zróżnicowany ekosystem programów, które rozliczają transakcje na warstwie bazowej Ethereum. Zespoły programistów nieustannie znajdują nowe sposoby na wykorzystanie Ethereum do tworzenia komponowalnych, niewymagających pozwoleń i odpornych na cenzurę wersji ważnych aplikacji Web2 lub tworzenia zupełnie nowych koncepcji natywnych dla Web3. Jednocześnie opracowywane są nowe narzędzia, które sprawiają, że budowanie zdecentralizowanych aplikacji (dapp) na Ethereum jest mniej skomplikowane.

### DeFi {#defi}

Zdecentralizowane finanse (DeFi) to jedna z głównych klas aplikacji zbudowanych na Ethereum. DeFi ma na celu stworzenie komponowalnych „klocków lego z pieniędzmi”, które pozwalają użytkownikom przechowywać, transferować, pożyczać i inwestować kryptoaktywa za pomocą inteligentnych kontraktów. DeFi to szybko rozwijająca się przestrzeń, która jest stale aktualizowana. Nieustannie potrzebne są badania nad bezpiecznymi, wydajnymi i dostępnymi protokołami.

#### Lektury uzupełniające {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Czym jest DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Najnowsze badania {#recent-research-15}

- [Zdecentralizowane finanse, scentralizowana własność?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Droga do transakcji poniżej dolara](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Wpływowym przypadkiem użycia Ethereum jest możliwość organizowania się w zdecentralizowany sposób poprzez wykorzystanie DAO. Prowadzi się wiele aktywnych badań nad tym, jak DAO na Ethereum mogą być rozwijane i wykorzystywane do wdrażania ulepszonych form zarządzania, jako narzędzie koordynacji o zminimalizowanym zaufaniu, znacznie poszerzając możliwości ludzi poza tradycyjne korporacje i organizacje.

#### Lektury uzupełniające {#background-reading-16}

- [Wprowadzenie do DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Najnowsze badania {#recent-research-16}

- [Mapowanie ekosystemu DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Narzędzia dla deweloperów {#developer-tools}

Narzędzia dla deweloperów Ethereum szybko się poprawiają. W tym ogólnym obszarze jest wiele do zrobienia w zakresie aktywnych badań i rozwoju.

#### Lektury uzupełniające {#background-reading-17}

- [Narzędzia według języka programowania](/developers/docs/programming-languages/)
- [Frameworki deweloperskie](/developers/docs/frameworks/)
- [Lista narzędzi deweloperskich dla konsensusu](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standardy tokenów](/developers/docs/standards/tokens/)
- [CryptoDevHub: Narzędzia EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Najnowsze badania {#recent-research-17}

- [Kanał Consensus Tooling na Discordzie Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Wyrocznie {#oracles}

Wyrocznie importują dane pozałańcuchowe do blockchaina w sposób zdecentralizowany i niewymagający pozwoleń. Wprowadzenie tych danych onchain umożliwia zdecentralizowanym aplikacjom (dapp) reagowanie na zjawiska w świecie rzeczywistym, takie jak wahania cen aktywów w świecie rzeczywistym, zdarzenia w aplikacjach pozałańcuchowych, a nawet zmiany pogody.

#### Lektury uzupełniające {#background-reading-18}

- [Wprowadzenie do wyroczni](/developers/docs/oracles/)

#### Najnowsze badania {#recent-research-18}

- [Przegląd wyroczni blockchain](https://arxiv.org/pdf/2004.07140.pdf)
- [Biała księga Chainlink](https://chain.link/whitepaper)

### Bezpieczeństwo aplikacji {#app-security}

Ataki hakerskie na Ethereum zazwyczaj wykorzystują luki w poszczególnych aplikacjach, a nie w samym protokole. Hakerzy i deweloperzy aplikacji toczą wyścig zbrojeń w celu opracowania nowych ataków i zabezpieczeń. Oznacza to, że zawsze wymagane są ważne badania i rozwój, aby chronić aplikacje przed atakami.

#### Lektury uzupełniające {#background-reading-19}

- [Raport o exploicie Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Lista analiz post-mortem ataków na kontrakty Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Najnowsze badania {#recent-research-19}

- [Aplikacje na Ethresear.ch](https://ethresear.ch/c/applications/18)

### Stos technologiczny {#technology-stack}

Decentralizacja całego stosu technologicznego Ethereum jest ważnym obszarem badawczym. Obecnie zdecentralizowane aplikacje (dapp) na Ethereum często mają pewne punkty centralizacji, ponieważ opierają się na scentralizowanych narzędziach lub infrastrukturze.

#### Lektury uzupełniające {#background-reading-20}

- [Stos Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Wprowadzenie do stosu Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Wprowadzenie do inteligentnych kontraktów](/developers/docs/smart-contracts/)
- [Wprowadzenie do zdecentralizowanego przechowywania danych](/developers/docs/storage/)

#### Najnowsze badania {#recent-research-20}

- [Kompozycyjność inteligentnych kontraktów](/developers/docs/smart-contracts/composability/)