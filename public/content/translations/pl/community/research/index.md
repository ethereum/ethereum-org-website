---
title: Aktywne obszary badań nad Ethereum
description: Odkryj różne obszary otwartych badań i dowiedz się, jak się w nie zaangażować.
lang: pl
---

# Aktywne obszary badań nad Ethereum {#active-areas-of-ethereum-research}

Jedną z głównych zalet Ethereum jest to, że aktywna społeczność badawcza i techniczna stale ją ulepsza. Wiele wykwalifikowanych i utalentowanych osób na całym świecie chciałoby zająć się nierozstrzygniętymi problemami w Ethereum, ale nie zawsze łatwo jest dowiedzieć się, jakie to problemy. Ta strona przedstawia kluczowe aktywne obszary badawcze jako przybliżony przewodnik po najnowocześniejszych rozwiązaniach Ethereum.

## Jak działają badania nad Ethereum {#how-ethereum-research-works}

Badania nad Ethereum są otwarte i przejrzyste zgodnie z zasadami [zdecentralizowanej nauki (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Chodzi o sprawienie, aby narzędzia badawcze i wyniki były tak otwarte i interaktywne, jak to tylko możliwe, na przykład za pomocą wykonywalnych notatników. Badania nad Ethereum postępują szybko, a nowe odkrycia są publikowane i omawiane otwarcie na forach takich jak ethresear.ch](https://ethresear.ch/), zamiast docierać do społeczności poprzez tradycyjne publikacje po rundach wzajemnej weryfikacji.

## Ogólne zasoby badawcze {#general-research-resources}

Niezależnie od konkretnego tematu, można znaleźć wiele informacji o badaniach nad Ethereum na stronie [ethresear.ch](https://ethresear.ch) i [kanale Discord Eth R&D](https://discord.gg/qGpsxSA). Są to główne miejsca, w których badacze Ethereum omawiają najnowsze pomysły i możliwości rozwoju.

Ten raport opublikowany w maju 2022 przez [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) zawiera dobry przegląd planu działania Ethereum.

## Źródła finansowania {#sources-of-funding}

Możesz zaangażować się w badania nad Ethereum i otrzymać za to wynagrodzenie! Na przykład [Fundacja Ethereum](/foundation/) ostatnio zorganizowała [rundę finansowania grantów akademickich](https://esp.ethereum.foundation/academic-grants). Informacje na temat bieżących i nadchodzących możliwościach finansowania możesz znaleźć na [stronie grantów Ethereum](/community/grants/).

## Badania nad protokołami {#protocol-research}

Badania nad protokołami związane są z warstwą bazową Ethereum — zestawem zasad określających sposób, w jaki węzły łączą się, komunikują, wymieniają i przechowują dane Ethereum oraz dochodzą do konsensusu w sprawie stanu blockchainu. Badania nad protokołami dzielą się na dwie kategorie: konsensus i wykonanie.

### Konsensus {#consensus}

Badania konsensusu dotyczą [mechanizmu proof-of-stake Ethereum](/developers/docs/consensus-mechanisms/pos/). Przykładowe tematy badań nad konsensusem to:

- identyfikacja i łatanie luk w zabezpieczeniach;
- kwantyfikowanie bezpieczeństwa kryptoekonomicznego;
- zwiększanie bezpieczeństwa lub wydajności implementacji klienta;
- oraz rozwijanie lekkich klientów.

Oprócz badań wybiegających w przyszłość, badane są niektóre fundamentalne przeprojektowania protokołu, takie jak finalizacja pojedynczego slotu, w celu umożliwienia znaczących ulepszeń Ethereum. Co więcej, wydajność, bezpieczeństwo i monitorowanie sieci peer-to-peer między klientami konsensusu są również ważnymi tematami badawczymi.

#### Podstawowe informacje {#background-reading}

- [Wprowadzenie do proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Dokument Casper-FPG](https://arxiv.org/abs/1710.09437)
- [Objaśnienie Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Dokument Gasper](https://arxiv.org/abs/2003.03052)

#### Ostatnie badania {#recent-research}

- [Konsensus ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dylemat dostępności/finalizacji](https://arxiv.org/abs/2009.04987)
- [Finalizacja pojedynczego slotu](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Podział proponent-twórca](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Wykonanie {#execution}

Warstwa wykonawcza związana jest z wykonywaniem transakcji, uruchamianiem [wirtualnej maszyny Ethereum (EVM)](/developers/docs/evm/) i generowaniem ładunków wykonawczych w celu przekazania ich do warstwy konsensusu. Istnieje wiele aktywnych obszarów badań, w tym:

- budowanie wsparcia lekkich klientów;
- badanie limitów gazu;
- oraz włączanie nowych struktur danych (np. drzewa Verkle).

#### Podstawowe informacje {#background-reading-1}

- [Wprowadzenie do EVM](/developers/docs/evm)
- [Warstwa wykonawcza Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Ostatnie badania {#recent-research-1}

- [Optymalizacja bazy danych](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Wygasanie stanu](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Drogi do wygasania stanu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Propozycja Verkle i wygasania stanu](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Zarządzanie historią](https://eips.ethereum.org/EIPS/eip-4444)
- [Drzewa Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Próbkowanie dostępności danych](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Rozwój klientów {#client-development}

Klienty Ethereum są implementacjami protokołu Ethereum. Rozwój klientów sprawia, że wyniki badań protokołu stają się rzeczywistością poprzez wbudowanie ich w te klienty. Rozwój klientów obejmuje aktualizację specyfikacji klienta, a także tworzenie konkretnych implementacji.

Węzeł Ethereum wymaga uruchomienia dwóch elementów oprogramowania:

1. klienta konsensusu do śledzenia początku blockchainu, plotkowania bloków i obsługi logiki konsensusu
2. klienta wykonawczego do obsługi maszyny wirtualnej Ethereum oraz wykonywania transakcji i inteligentnych kontraktów

Więcej szczegółów na temat węzłów i klientów oraz lista wszystkich aktualnych implementacji klientów znajduje się na [strona węzłów i klientów](/developers/docs/nodes-and-clients/). Historię wszystkich uaktualnień Ethereum możesz również znaleźć na [stronie historii](/history/).

### Klienty wykonawcze {#execution-clients}

- [Specyfikacja klienta wykonawczego](https://github.com/ethereum/execution-specs)
- [Specyfikacja API wykonawczego](https://github.com/ethereum/execution-apis)

### Klienty konsensusu {#consensus-clients}

- [Specyfikacja klienta konsensusu](https://github.com/ethereum/consensus-specs)
- [Specyfikacja Beacon API](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Skalowanie i wydajność {#scaling-and-performance}

Skalowanie Ethereum jest głównym obszarem zainteresowania badaczy Ethereum. Obecne podejścia obejmują przenoszenie transakcji do pakietów zbiorczych i zapewnienie ich maksymalnej taniości przy użyciu blobów danych. Wstępne informacje na temat skalowania Ethereum są dostępne na naszej [stronie skalowania](/developers/docs/scaling).

### Warstwa 2 {#layer-2}

Obecnie istnieje kilka protokołów warstwy 2, które skalują Ethereum przy użyciu różnych technik łączenia transakcji i zabezpieczania ich w warstwie 1 Ethereum. Jest to bardzo szybko rozwijający się temat z dużym potencjałem badawczym i rozwojowym.

#### Podstawowe informacje {#background-reading-2}

- [Wprowadzenie do warstwy 2](/layer-2/)
- [Polynya: pakiety zbiorcze, dostępność danych i łańcuchy modułowe](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Ostatnie badania {#recent-research-2}

- [Sprawiedliwy porządek Arbitrum dla sekwencerów](https://eprint.iacr.org/2021/1465)
- [Warstwa 2 ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Plan działania skoncentrowany wokół pakietów zbiorczych](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Mosty {#bridges}

Jednym ze szczególnych obszarów warstwy 2, który wymaga dalszych badań i rozwoju, są bezpieczne i wydajne mosty. Obejmuje to mosty między różnymi warstwami 2 i mosty między warstwą 1 i warstwą 2. Jest to szczególnie ważny obszar badań, ponieważ mosty są często celem ataków hakerów.

#### Podstawowe informacje {#background-reading-3}

- [Wprowadzenie do mostów blockchain](/bridges/)
- [Vitalik o mostach](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Artykuł o mostach blockchain]](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Wartość zablokowana w mostach](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Ostatnie badania {#recent-research-3}

- [Walidacja mostów](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Sharding blockchainu Ethereum od dawna jest częścią rozwoju planu działania. Jednak obecnie w centrum uwagi są nowe rozwiązania skalowania, takie jak „Danksharding”.

Prekursor pełnego Dankshardingu, znany jako Proto-Danksharding, został wdrożony wraz z uaktualnieniem sieci Cancun-Deneb („Dencun”).

[Więcej na temat uaktualnienia Dencun](/roadmap/dencun/)

#### Podstawowe informacje {#background-reading-4}

- [Uwagi na temat Proto-Dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Wideo Bankless na temat Dankshardingu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Kompendium badań nad shardingiem Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Ostatnie badania {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik o shardingu i próbkowaniu dostępności danych](https://hackmd.io/@vbuterin/sharding_proposal)

### Sprzęt {#hardware}

[Uruchamianie węzłów](/developers/docs/nodes-and-clients/run-a-node/) na skromnym sprzęcie ma kluczowe znaczenie dla utrzymania zdecentralizowanego Ethereum. Dlatego aktywne badania nad minimalizacją wymagań sprzętowych do uruchamiania węzłów są ważnym obszarem badań.

#### Podstawowe informacje {#background-reading-5}

- [Ethereum na ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Ostatnie badania {#recent-research-5}

- [Ecdsa na układach FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Bezpieczeństwo {#security}

Bezpieczeństwo to szeroki temat, który może obejmować zapobieganie spamowi/oszustwom, bezpieczeństwo portfela, bezpieczeństwo sprzętu, bezpieczeństwo krypto-ekonomiczne, polowanie na błędy i testowanie aplikacji i oprogramowania klienta oraz zarządzanie kluczami. Przyczynianie się do poszerzania wiedzy w tych obszarach pomoże zwiększyć przyjęcie w głównym nurcie.

### Kryptografia i ZKP {#cryptography--zkp}

Dowody wiedzy zerowej (ZKP) i kryptografia mają kluczowe znaczenie dla budowania prywatności i bezpieczeństwa w Ethereum i jego aplikacjach. Wiedza zerowa to stosunkowo młoda, ale szybko rozwijająca się przestrzeń z wieloma otwartymi możliwościami badawczymi i rozwojowymi. Niektóre możliwości obejmują opracowywanie wydajniejszych implementacji [algorytmu haszującego Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), znajdowanie lepszych zobowiązań wielomianowych niż obecnie istniejące lub obniżenie kosztów generowania kluczy publicznych ecdsa i obwodów weryfikacji podpisów.

#### Podstawowe informacje {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Ostatnie badania {#recent-research-6}

- [Najnowsze postępy w kryptografii krzywych eliptycznych](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Dowody zerowe ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Portfele {#wallets}

Portfele Ethereum mogą być rozszerzeniami przeglądarki, aplikacjami komputerowymi i mobilnymi lub inteligentnymi kontraktami na Ethereum. Prowadzone są aktywne badania nad portfelami odzyskiwania społecznościowego, które zmniejszają część ryzyka związanego z zarządzaniem kluczami poszczególnych użytkowników. Wraz z rozwojem portfeli prowadzone są badania nad alternatywnymi formami abstrakcji kont, co jest ważnym obszarem rodzących się badań.

#### Podstawowe informacje {#background-reading-7}

- [Wprowadzenie do portfeli](/wallets/)
- [Wprowadzenie do bezpieczeństwa portfeli](/security/)
- [Bezpieczeństwo ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938 Abstrakcja kont](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Abstrakcja kont](https://eips.ethereum.org/EIPS/eip-4337)

#### Ostatnie badania {#recent-research-7}

- [Portfele inteligentnych kontraktów skoncentrowane na walidacji](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Przyszłość kont](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 Kody operacyjne AUTH i AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Publikowanie kodu na adresie konta zewnętrznego](https://eips.ethereum.org/EIPS/eip-5003)

## Społeczność, edukacja i zasięg {#community-education-and-outreach}

Wprowadzanie nowych użytkowników do Ethereum wymaga nowych zasobów edukacyjnych i podejścia do zasięgu. Mogą to być posty i artykuły na blogach, książki, podcasty, memy, materiały dydaktyczne, wydarzenia i wszystko inne, co tworzy społeczności, wita nowych użytkowników i edukuje ludzi na temat Ethereum.

### UX/UI {#uxui}

Aby wprowadzić więcej osób do Ethereum, ekosystem musi poprawić UX/UI. Będzie to wymagało od projektantów i ekspertów ds. produktów ponownego przeanalizowania projektów portfeli i aplikacji.

#### Podstawowe informacje {#background-reading-8}

- [UX/UI ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Ostatnie badania {#recent-research-8}

- [Discord projektu Web3](https://discord.gg/FsCFPMTSm9)
- [Zasady projektu Web3](https://www.web3designprinciples.com/)
- [Dyskusja na temat UX Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Ekonomia {#economics}

Badania ekonomiczne w Ethereum zasadniczo opierają się na dwóch podejściach: walidacji bezpieczeństwa mechanizmów opartych na zachętach ekonomicznych („mikroekonomia”) i analizie przepływów wartości między protokołami, aplikacjami i użytkownikami („makroekonomia”). Istnieją złożone czynniki krypto-ekonomiczne związane z natywnym aktywem Ethereum (ethereum) i tokenami zbudowanymi na nim (na przykład NFT i tokeny ERC20).

#### Podstawowe informacje {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [Warsztaty ETHconomics na Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Ostatnie badania {#recent-research-9}

- [Analiza empiryczna EIP1559](https://arxiv.org/abs/2201.05574)
- [Równowaga podaży w obiegu](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Kwantyfikacja MEV: jak ciemny jest las?](https://arxiv.org/abs/2101.05511)

### Rynki opłat i przestrzeni blokowej {#blockspace-fee-markets}

Rynki przestrzeni blokowej regulują uwzględnianie transakcji użytkowników końcowych, bezpośrednio w Ethereum (warstwa 1) lub w sieciach pomostowych, np. pakietach zbiorczych (warstwa 2). W Ethereum transakcje są przesyłane na rynek opłat wdrożony w protokole jako EIP-1559, chroniąc łańcuch przed spamem i zatorami cenowymi. W obu warstwach transakcje mogą generować efekty zewnętrzne, znane jako maksymalna wartość możliwa do wydobycia (MEV), które powodują nowe struktury rynkowe w celu przechwytywania lub zarządzania tymi efektami zewnętrznymi.

#### Podstawowe informacje {#background-reading-10}

- [Design mechanizmu opłat transakcyjnych dla blockchainu Ethereum: analiza ekonomiczna EIP-1559 (Tim Roughgarden, 2020 r.)](https://timroughgarden.org/papers/eip1559.pdf)
- [Symulacje EIP-1559 (Robust Incentives Group](https://ethereum.github.io/abm1559))
- [Ekonomia pakietów zbiorczych od podstaw](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, zmiana kolejności transakcji i niestabilność konsensusu na zdecentralizowanych giełdach](https://arxiv.org/abs/1904.05234)

#### Ostatnie badania {#recent-research-10}

- [Wielowymiarowa prezentacja wideo EIP-1559](https://youtu.be/QbR4MTgnCko)
- [Międzydomenowa MEV](http://arxiv.org/abs/2112.01472)
- [Aukcje MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Zachęty proof-of-stake {#proof-of-stake-incentives}

Walidatory wykorzystują natywne aktywo Ethereum (ether) jako zabezpieczenie przed nieuczciwym zachowaniem. Kryptoekonomia tego decyduje o bezpieczeństwie sieci. Wyrafinowane walidatory mogą być zdolne do wykorzystania niedoskonałości warstwy motywacyjnej do przeprowadzenia ataków.

#### Podstawowe informacje {#background-reading-11}

- [Mistrzowska klasa ekonomii Ethereum i model ekonomiczny](https://github.com/CADLabs/ethereum-economic-model)
- [Symulacje zachęt PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Ostatnie badania {#recent-research-11}

- [Zwiększanie odporności na cenzurę transakcji w ramach podziału proponent-twórca (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Trzy ataki na PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Płynny staking i derywatywy {#liquid-staking-and-derivatives}

Płynny staking pozwala użytkownikom posiadającym mniej niż 32 ETH na otrzymywanie zysków ze stakingu poprzez zamianę etheru na token reprezentujący zestakowany ether, który można wykorzystać w DeFi. Jednak zachęty i dynamika rynku związane z płynnym stakowaniem są wciąż odkrywane, podobnie jak ich wpływ na bezpieczeństwo Ethereum (np. ryzyko centralizacji).

#### Podstawowe informacje {#background-reading-12}

- [Płynny staking ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: droga do bezzaufaniowego stakingu na Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: wprowadzenie do protokołu stakingu](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Ostatnie badania {#recent-research-12}

- [Obsługiwanie wypłat z Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Poświadczenia wypłat](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Ryzyko derywatów płynnego stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testowanie {#testing}

### Formalna weryfikacja {#formal-verification}

Formalna weryfikacja polega na napisaniu kodu w celu zweryfikowania, czy specyfikacje konsensusu Ethereum są poprawne i wolne od błędów. Istnieje wykonywalna wersja specyfikacji napisana Pythonie, która wymaga konserwacji i rozwoju. Dalsze badania mogą pomóc w ulepszeniu wdrożenia specyfikacji w Pythonie i dodaniu narzędzi, które mogą solidniej weryfikować poprawność i identyfikować problemy.

#### Podstawowe informacje {#background-reading-13}

- [Wprowadzenie do formalnej weryfikacji](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formalna weryfikacja (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Ostatnie badania {#recent-research-13}

- [Formalna weryfikacja kontraktu depozytowego](https://github.com/runtimeverification/deposit-contract-verification)
- [Formalna weryfikacja specyfikacji łańcucha śledzącego](https://github.com/runtimeverification/deposit-contract-verification)

## Nauka i analityka danych {#data-science-and-analytics}

Istnieje zapotrzebowanie na więcej narzędzi do analizy danych i pulpitów nawigacyjnych, które dostarczają szczegółowych informacji o aktywności na Ethereum i kondycji sieci.

### Podstawowe informacje {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Pulpit nawigacyjny różnorodności klientów](https://clientdiversity.org/)

#### Ostatnie badania {#recent-research-14}

- [Analiza danych Robust Incentives Group](https://ethereum.github.io/rig/)

## Aplikacje i narzędzia {#apps-and-tooling}

Warstwa aplikacji obsługuje różnorodny ekosystem programów, które rozliczają transakcje w warstwie bazowej Ethereum. Zespoły programistów nieustannie znajdują nowe sposoby wykorzystania Ethereum do tworzenia złożonych, pozbawionych uprawnień i odpornych na cenzurę wersji ważnych aplikacji Web2 lub tworzenia zupełnie nowych koncepcji natywnych dla Web3. Jednocześnie opracowywane są nowe narzędzia, które sprawiają, że tworzenie zdecentralizowanych aplikacji na Ethereum jest mniej skomplikowane.

### DeFi {#defi}

Zdecentralizowane finanse (DeFi) to jedna z głównych kategorii aplikacji zbudowanych na Ethereum. DeFi ma na celu stworzenie złożonych „klocków pieniężnych”, które pozwolą użytkownikom przechowywać, przesyłać, pożyczać i inwestować krypto-aktywa za pomocą inteligentnych kontraktów. DeFi to szybko zmieniająca się przestrzeń, która jest stale aktualizowana. Badania nad bezpiecznymi, wydajnymi i dostępnymi protokołami są stale potrzebne.

#### Podstawowe informacje {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: czym jest DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Ostatnie badania {#recent-research-15}

- [Zdecentralizowane finansowanie, scentralizowana własność?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: droga do transakcji poniżej dolara](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Wpływowym przypadkiem użycia Ethereum jest możliwość organizowania się w sposób zdecentralizowany poprzez wykorzystanie DAO. Istnieje wiele aktywnych badań nad tym, w jaki sposób DAO na Ethereum mogą być rozwijane i wykorzystywane do wykonywania ulepszonych form zarządzania, jako narzędzia koordynacji zminimalizowanego zaufania, znacznie rozszerzając możliwości ludzi poza tradycyjne korporacje i organizacje.

#### Podstawowe informacje {#background-reading-16}

- [Wprowadzenie do DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Ostatnie badania {#recent-research-16}

- [Mapowanie ekosystemu DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Narzędzia programistyczne {#developer-tools}

Narzędzia dla programistów Ethereum szybko się poprawiają. W tym obszarze wymagane jest wiele aktywnych badań i prac rozwojowych.

#### Podstawowe informacje {#background-reading-17}

- [Narzędzia według języka programowania](/developers/docs/programming-languages/)
- [Frameworki programistyczne](/developers/docs/frameworks/)
- [Lista narzędzi programistycznych konsensusu](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Standardy tokenów](/developers/docs/standards/tokens/)
- [CryptoDevHub: narzędzia do EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Ostatnie badania {#recent-research-17}

- [Kanał na Discordzie Eth R&D z narzędziami konsensusu](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Wyrocznie {#oracles}

Wyrocznie importują dane spoza łańcucha do blockchainu w sposób zdecentralizowany i niewymagający uprawnień. Uzyskanie tych danych w łańcuchu umożliwia zdecentralizowanym aplikacjom reagowanie na zjawiska w świecie rzeczywistym, takie jak wahania cen aktywów w świecie rzeczywistym, wydarzenia w aplikacjach poza łańcuchem, a nawet zmiany pogody.

#### Podstawowe informacje {#background-reading-18}

- [Wprowadzenie do wyroczni](/developers/docs/oracles/)

#### Ostatnie badania {#recent-research-18}

- [Przegląd wyroczni blockchainowych](https://arxiv.org/pdf/2004.07140.pdf)
- [Biała księga Chainlink](https://chain.link/whitepaper)

### Bezpieczeństwo aplikacji {#app-security}

Włamania na Ethereum zazwyczaj wykorzystują luki w poszczególnych aplikacjach, a nie w samym protokole. Hakerzy i programiści aplikacji prowadzą wyścig zbrojeń, aby opracować nowe ataki i mechanizmy obronne. Oznacza to, że zawsze potrzebne są ważne badania i rozwój, aby chronić aplikacje przed włamaniami.

#### Podstawowe informacje {#background-reading-19}

- [Raport o exploicie Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Lista przypadków włamań na kontrakty w Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Wiadomości Rekt](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Ostatnie badania {#recent-research-19}

- [Aplikacje ethresear.ch](https://ethresear.ch/c/applications/18)

### Stos technologiczny {#technology-stack}

Decentralizacja całego stosu technologicznego Ethereum jest ważnym obszarem badawczym. Obecnie zdecentralizowane aplikacje na Ethereum zwykle mają pewne punkty centralizacji, ponieważ polegają na scentralizowanych narzędziach lub infrastrukturze.

#### Podstawowe informacje {#background-reading-20}

- [Stos Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: wprowadzenie do stosu Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Wprowadzenie do inteligentnych kontraktów](/developers/docs/smart-contracts/)
- [Wprowadzenie do zdecentralizowanej pamięci](/developers/docs/storage/)

#### Ostatnie badania {#recent-research-20}

- [Kompozycyjność inteligentnych kontraktów](/developers/docs/smart-contracts/composability/)
