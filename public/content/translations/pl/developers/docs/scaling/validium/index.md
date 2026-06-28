---
title: Validium
description: "Wprowadzenie do validium jako rozwiązania skalującego obecnie wykorzystywanego przez społeczność Ethereum."
lang: pl
sidebarDepth: 3
---

Validium to [rozwiązanie skalujące](/developers/docs/scaling/), które wymusza integralność transakcji za pomocą dowodów ważności, podobnie jak [ZK-rollupy](/developers/docs/scaling/zk-rollups/), ale nie przechowuje danych transakcji w sieci głównej [Ethereum](/). Chociaż pozałańcuchowa dostępność danych wprowadza pewne kompromisy, może prowadzić do ogromnej poprawy skalowalności (validium może przetwarzać [\~9000 transakcji lub więcej na sekundę](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Wymagania wstępne {#prerequisites}

Należy przeczytać i zrozumieć nasze strony o [skalowaniu Ethereum](/developers/docs/scaling/) oraz [warstwie 2 (L2)](/layer-2).

## Czym jest validium? {#what-is-validium}

Validium to rozwiązania skalujące, które wykorzystują pozałańcuchową dostępność danych i obliczenia zaprojektowane w celu poprawy przepustowości poprzez przetwarzanie transakcji poza siecią główną Ethereum. Podobnie jak rollupy z wiedzą zerową (ZK-rollupy), validium publikują [dowody z wiedzą zerową](/glossary/#zk-proof) w celu weryfikacji transakcji pozałańcuchowych w Ethereum. Zapobiega to nieprawidłowym przejściom stanu i zwiększa gwarancje bezpieczeństwa łańcucha validium.

Te „dowody ważności” mogą przybierać formę ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) lub ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Więcej o [dowodach z wiedzą zerową](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Środki należące do użytkowników validium są kontrolowane przez inteligentny kontrakt w Ethereum. Validium oferują niemal natychmiastowe wypłaty, podobnie jak ZK-rollupy; po zweryfikowaniu dowodu ważności dla żądania wypłaty w Sieci głównej, użytkownicy mogą wypłacić środki, dostarczając [dowody Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Dowód Merkle'a weryfikuje włączenie transakcji wypłaty użytkownika do zweryfikowanej partii transakcji, umożliwiając kontraktowi onchain przetworzenie wypłaty.

Jednak użytkownicy validium mogą mieć zamrożone środki i ograniczone wypłaty. Może się tak zdarzyć, jeśli menedżerowie dostępności danych w łańcuchu validium zatają przed użytkownikami pozałańcuchowe dane stanu. Bez dostępu do danych transakcji użytkownicy nie mogą obliczyć dowodu Merkle'a wymaganego do udowodnienia własności środków i wykonania wypłat.

To jest główna różnica między validium a ZK-rollupami — ich pozycja w spektrum dostępności danych. Oba rozwiązania podchodzą do przechowywania danych w różny sposób, co ma implikacje dla bezpieczeństwa i bezzaufaniowości.

## Jak validium wchodzą w interakcję z Ethereum? {#how-do-validiums-interact-with-ethereum}

Validium to protokoły skalujące zbudowane na wierzchu istniejącego łańcucha Ethereum. Chociaż wykonuje transakcje pozałańcuchowo, łańcuch validium jest zarządzany przez zbiór inteligentnych kontraktów wdrożonych w Sieci głównej, w tym:

1. **Kontrakt weryfikatora**: Kontrakt weryfikatora weryfikuje ważność dowodów przedłożonych przez operatora validium podczas dokonywania aktualizacji stanu. Obejmuje to dowody ważności poświadczające poprawność transakcji pozałańcuchowych oraz dowody dostępności danych weryfikujące istnienie pozałańcuchowych danych transakcji.

2. **Główny kontrakt**: Główny kontrakt przechowuje zobowiązania stanu (korzenie drzewa Merklego) przesłane przez producentów bloków i aktualizuje stan validium po zweryfikowaniu dowodu ważności onchain. Kontrakt ten przetwarza również depozyty i wypłaty z łańcucha validium.

Validium polegają również na głównym łańcuchu Ethereum w następujących kwestiach:

### Rozrachunek {#settlement}

Transakcje wykonane w validium nie mogą zostać w pełni potwierdzone, dopóki łańcuch nadrzędny nie zweryfikuje ich ważności. Wszystkie operacje przeprowadzane w validium muszą ostatecznie zostać rozliczone w Sieci głównej. Blockchain Ethereum zapewnia również „gwarancje rozrachunku” dla użytkowników validium, co oznacza, że transakcje pozałańcuchowe nie mogą zostać cofnięte ani zmienione po ich zatwierdzeniu onchain.

### Bezpieczeństwo {#security}

Ethereum, działając jako warstwa rozrachunku, gwarantuje również ważność przejść stanu w validium. Transakcje pozałańcuchowe wykonywane w łańcuchu validium są weryfikowane za pośrednictwem inteligentnego kontraktu w bazowej warstwie Ethereum.

Jeśli kontrakt weryfikatora onchain uzna dowód za nieważny, transakcje zostaną odrzucone. Oznacza to, że operatorzy muszą spełnić warunki ważności wymuszane przez protokół Ethereum przed aktualizacją stanu validium.

## Jak działa validium? {#how-does-validium-work}

### Transakcje {#transactions}

Użytkownicy przesyłają transakcje do operatora, węzła odpowiedzialnego za wykonywanie transakcji w łańcuchu validium. Niektóre validium mogą korzystać z jednego operatora do wykonywania łańcucha lub polegać na mechanizmie [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/) w celu rotacji operatorów.

Operator agreguje transakcje w partię i wysyła ją do obwodu dowodzącego w celu udowodnienia. Obwód dowodzący przyjmuje partię transakcji (i inne istotne dane) jako dane wejściowe i generuje dowód ważności weryfikujący, że operacje zostały wykonane poprawnie.

### Zobowiązania stanu {#state-commitments}

Stan validium jest haszowany jako drzewo Merklego z korzeniem przechowywanym w głównym kontrakcie w Ethereum. Korzeń drzewa Merklego, znany również jako korzeń stanu, działa jako kryptograficzne zobowiązanie do bieżącego stanu kont i sald w validium.

Aby przeprowadzić aktualizację stanu, operator musi obliczyć nowy korzeń stanu (po wykonaniu transakcji) i przesłać go do kontraktu onchain. Jeśli dowód ważności zostanie zweryfikowany pomyślnie, proponowany stan zostaje zaakceptowany, a validium przełącza się na nowy korzeń stanu.

### Depozyty i wypłaty {#deposits-and-withdrawals}

Użytkownicy przenoszą środki z Ethereum do validium, deponując ETH (lub dowolny token zgodny z ERC) w kontrakcie onchain. Kontrakt przekazuje zdarzenie depozytu do validium pozałańcuchowo, gdzie adres użytkownika zostaje zasilony kwotą równą jego depozytowi. Operator włącza również tę transakcję depozytu do nowej partii.

Aby przenieść środki z powrotem do Sieci głównej, użytkownik validium inicjuje transakcję wypłaty i przesyła ją do operatora, który weryfikuje żądanie wypłaty i włącza je do partii. Aktywa użytkownika w łańcuchu validium są również niszczone, zanim będą mogły opuścić system. Po zweryfikowaniu dowodu ważności powiązanego z partią, użytkownik może wywołać główny kontrakt, aby wypłacić resztę swojego początkowego depozytu.

Jako mechanizm antycenzorski, protokół validium pozwala użytkownikom na wypłatę bezpośrednio z kontraktu validium bez pośrednictwa operatora. W tym przypadku użytkownicy muszą dostarczyć dowód Merkle'a do kontraktu weryfikatora, wykazując włączenie konta do korzenia stanu. Jeśli dowód zostanie zaakceptowany, użytkownik może wywołać funkcję wypłaty głównego kontraktu, aby wyprowadzić swoje środki z validium.

### Przesyłanie partii {#batch-submission}

Po wykonaniu partii transakcji operator przesyła powiązany dowód ważności do kontraktu weryfikatora i proponuje nowy korzeń stanu głównemu kontraktowi. Jeśli dowód jest ważny, główny kontrakt aktualizuje stan validium i finalizuje wyniki transakcji w partii.

W przeciwieństwie do ZK-rollupa, producenci bloków w validium nie są zobowiązani do publikowania danych transakcji dla partii transakcji (tylko nagłówki bloków). Czyni to validium czysto pozałańcuchowym protokołem skalującym, w przeciwieństwie do „hybrydowych” protokołów skalujących (tj. [warstwy 2 (L2)](/layer-2/)), które publikują dane stanu w głównym łańcuchu Ethereum przy użyciu danych blob, `calldata` lub kombinacji obu.

### Dostępność danych {#data-availability}

Jak wspomniano, validium wykorzystują model pozałańcuchowej dostępności danych, w którym operatorzy przechowują wszystkie dane transakcji poza siecią główną Ethereum. Niewielki ślad danych onchain validium poprawia skalowalność (przepustowość nie jest ograniczona przez zdolność przetwarzania danych Ethereum) i zmniejsza opłaty dla użytkowników (koszt publikowania danych onchain jest niższy).

Pozałańcuchowa dostępność danych stwarza jednak problem: dane niezbędne do tworzenia lub weryfikacji dowodów Merkle'a mogą być niedostępne. Oznacza to, że użytkownicy mogą nie być w stanie wypłacić środków z kontraktu onchain, jeśli operatorzy będą działać złośliwie.

Różne rozwiązania validium próbują rozwiązać ten problem poprzez decentralizację przechowywania danych stanu. Obejmuje to zmuszanie producentów bloków do wysyłania danych bazowych do „menedżerów dostępności danych” odpowiedzialnych za przechowywanie danych pozałańcuchowych i udostępnianie ich użytkownikom na żądanie.

Menedżerowie dostępności danych w validium poświadczają dostępność danych dla transakcji pozałańcuchowych, podpisując każdą partię validium. Podpisy te stanowią formę „dowodu dostępności”, który kontrakt weryfikatora onchain sprawdza przed zatwierdzeniem aktualizacji stanu.

Validium różnią się podejściem do zarządzania dostępnością danych. Niektóre polegają na zaufanych stronach w celu przechowywania danych stanu, podczas gdy inne używają do tego zadania losowo przypisanych walidatorów.

#### Komitet dostępności danych (DAC) {#data-availability-committee}

Aby zagwarantować dostępność danych pozałańcuchowych, niektóre rozwiązania validium wyznaczają grupę zaufanych podmiotów, znanych łącznie jako komitet dostępności danych (DAC), do przechowywania kopii stanu i dostarczania dowodu dostępności danych. DAC są łatwiejsze do wdrożenia i wymagają mniejszej koordynacji, ponieważ liczba członków jest niewielka.

Jednak użytkownicy muszą ufać, że DAC udostępni dane, gdy będą potrzebne (np. do generowania dowodów Merkle'a). Istnieje możliwość, że członkowie komitetów dostępności danych [zostaną skompromitowani przez złośliwego aktora](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), który może następnie zataić dane pozałańcuchowe.

[Więcej o komitetach dostępności danych w validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Dostępność danych zabezpieczona kaucją {#bonded-data-availability}

Inne validium wymagają od uczestników odpowiedzialnych za przechowywanie danych offline zdeponowania stawki (tj. zablokowania) tokenów w inteligentnym kontrakcie przed objęciem swoich ról. Ta stawka służy jako „kaucja” gwarantująca uczciwe zachowanie wśród menedżerów dostępności danych i zmniejsza założenia dotyczące zaufania. Jeśli ci uczestnicy nie udowodnią dostępności danych, kaucja podlega cięciu.

W schemacie dostępności danych zabezpieczonej kaucją każdy może zostać przypisany do przechowywania danych pozałańcuchowych po dostarczeniu wymaganej stawki. Rozszerza to pulę kwalifikujących się menedżerów dostępności danych, zmniejszając centralizację, która wpływa na komitety dostępności danych (DAC). Co ważniejsze, to podejście opiera się na zachętach kryptoekonomicznych, aby zapobiegać złośliwym działaniom, co jest znacznie bezpieczniejsze niż wyznaczanie zaufanych stron do zabezpieczania danych offline w validium.

[Więcej o dostępności danych zabezpieczonej kaucją w validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions i validium {#volitions-and-validium}

Validium oferują wiele korzyści, ale wiążą się z kompromisami (przede wszystkim z dostępnością danych). Jednak, podobnie jak w przypadku wielu rozwiązań skalujących, validium są dostosowane do konkretnych przypadków użycia — dlatego właśnie stworzono volitions.

Volitions łączą ZK-rollup i łańcuch validium oraz pozwalają użytkownikom przełączać się między tymi dwoma rozwiązaniami skalującymi. Dzięki volitions użytkownicy mogą korzystać z pozałańcuchowej dostępności danych validium dla niektórych transakcji, zachowując jednocześnie swobodę przełączenia się na rozwiązanie dostępności danych onchain (ZK-rollup) w razie potrzeby. Zasadniczo daje to użytkownikom swobodę wyboru kompromisów podyktowanych ich unikalnymi okolicznościami.

Zdecentralizowana giełda (DEX) może preferować korzystanie ze skalowalnej i prywatnej infrastruktury validium do transakcji o dużej wartości. Może również korzystać z ZK-rollupa dla użytkowników, którzy chcą wyższych gwarancji bezpieczeństwa i bezzaufaniowości ZK-rollupa.

## Validium i kompatybilność z EVM {#validiums-and-evm-compatibility}

Podobnie jak ZK-rollupy, validium są w większości dostosowane do prostych aplikacji, takich jak wymiany tokenów i płatności. Obsługa ogólnych obliczeń i wykonywania inteligentnych kontraktów w validium jest trudna do wdrożenia, biorąc pod uwagę znaczny narzut związany z dowodzeniem instrukcji [EVM](/developers/docs/evm/) w obwodzie dowodu z wiedzą zerową.

Niektóre projekty validium próbują ominąć ten problem poprzez kompilację języków kompatybilnych z EVM (np. Solidity, Vyper) w celu stworzenia niestandardowego kodu bajtowego zoptymalizowanego pod kątem wydajnego dowodzenia. Wadą tego podejścia jest to, że nowe maszyny wirtualne przyjazne dla dowodów z wiedzą zerową mogą nie obsługiwać ważnych kodów operacyjnych EVM, a programiści muszą pisać bezpośrednio w języku wysokiego poziomu, aby uzyskać optymalne wrażenia. Stwarza to jeszcze więcej problemów: zmusza programistów do budowania zdecentralizowanych aplikacji (dapp) przy użyciu zupełnie nowego stosu technologicznego i psuje kompatybilność z obecną infrastrukturą Ethereum.

Niektóre zespoły próbują jednak zoptymalizować istniejące kody operacyjne EVM dla obwodów dowodzących ZK. Doprowadzi to do opracowania wirtualnej maszyny Ethereum z wiedzą zerową (zkEVM), maszyny wirtualnej kompatybilnej z EVM, która generuje dowody w celu weryfikacji poprawności wykonania programu. Dzięki zkEVM łańcuchy validium mogą wykonywać inteligentne kontrakty pozałańcuchowo i przesyłać dowody ważności w celu weryfikacji obliczeń pozałańcuchowych (bez konieczności ich ponownego wykonywania) w Ethereum.

[Więcej o zkEVM](https://www.alchemy.com/overviews/zkevm).

## Jak validium skalują Ethereum? {#scaling-ethereum-with-validiums}

### 1. Pozałańcuchowe przechowywanie danych {#offchain-data-storage}

Projekty skalowania warstwy 2 (L2), takie jak optymistyczne rollupy i ZK-rollupy, wymieniają nieskończoną skalowalność czysto pozałańcuchowych protokołów skalujących (np. [Plasma](/developers/docs/scaling/plasma/)) na bezpieczeństwo, publikując niektóre dane transakcji w warstwie 1 (L1). Oznacza to jednak, że właściwości skalowalności rollupów są ograniczone przez przepustowość danych w sieci głównej Ethereum (z tego powodu [sharding danych](/roadmap/danksharding/) proponuje poprawę pojemności przechowywania danych w Ethereum).

Validium osiągają skalowalność, przechowując wszystkie dane transakcji pozałańcuchowo i publikując tylko zobowiązania stanu (oraz dowody ważności) podczas przekazywania aktualizacji stanu do głównego łańcucha Ethereum. Istnienie dowodów ważności daje jednak validium wyższe gwarancje bezpieczeństwa niż inne czysto pozałańcuchowe rozwiązania skalujące, w tym Plasma i [łańcuchy poboczne](/developers/docs/scaling/sidechains/). Zmniejszając ilość danych, które Ethereum musi przetworzyć przed zatwierdzeniem transakcji pozałańcuchowych, projekty validium znacznie zwiększają przepustowość w Sieci głównej.

### 2. Dowody rekurencyjne {#recursive-proofs}

Dowód rekurencyjny to dowód ważności, który weryfikuje ważność innych dowodów. Te „dowody dowodów” są generowane poprzez rekurencyjne agregowanie wielu dowodów, aż do utworzenia jednego ostatecznego dowodu weryfikującego wszystkie poprzednie dowody. Dowody rekurencyjne skalują prędkość przetwarzania blockchaina poprzez zwiększenie liczby transakcji, które można zweryfikować na jeden dowód ważności.

Zazwyczaj każdy dowód ważności, który operator validium przesyła do Ethereum w celu weryfikacji, weryfikuje integralność pojedynczego bloku. Natomiast pojedynczy dowód rekurencyjny może zostać użyty do potwierdzenia ważności kilku bloków validium w tym samym czasie — jest to możliwe, ponieważ obwód dowodzący może rekurencyjnie agregować kilka dowodów bloków w jeden ostateczny dowód. Jeśli kontrakt weryfikatora onchain zaakceptuje dowód rekurencyjny, wszystkie bazowe bloki zostaną natychmiast sfinalizowane.

## Plusy i minusy validium {#pros-and-cons-of-validium}

| Plusy                                                                                                                                                    | Minusy                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dowody ważności wymuszają integralność transakcji pozałańcuchowych i zapobiegają finalizowaniu przez operatorów nieprawidłowych aktualizacji stanu. | Tworzenie dowodów ważności wymaga specjalnego sprzętu, co stwarza ryzyko centralizacji.                                                              |
| Zwiększa efektywność kapitałową dla użytkowników (brak opóźnień w wypłacaniu środków z powrotem do Ethereum).                                 | Ograniczone wsparcie dla ogólnych obliczeń/inteligentnych kontraktów; do programowania wymagane są specjalistyczne języki.                                             |
| Brak podatności na niektóre ataki ekonomiczne, z którymi borykają się systemy oparte na dowodach oszustwa w aplikacjach o dużej wartości.                | Wysoka moc obliczeniowa wymagana do generowania dowodów ZK; nieopłacalne dla aplikacji o niskiej przepustowości.                                         |
| Zmniejsza opłaty za gaz dla użytkowników poprzez niepublikowanie danych wywołania w sieci głównej Ethereum.                                                  | Wolniejszy subiektywny czas ostateczności (10-30 min na wygenerowanie dowodu ZK), ale szybszy do pełnej ostateczności, ponieważ nie ma opóźnienia czasu sporu.               |
| Odpowiednie dla konkretnych przypadków użycia, takich jak handel lub gry blockchain, w których priorytetem jest prywatność transakcji i skalowalność.  | Użytkownicy mogą zostać pozbawieni możliwości wypłaty środków, ponieważ generowanie dowodów własności Merkle'a wymaga, aby dane pozałańcuchowe były dostępne przez cały czas.      |
| Pozałańcuchowa dostępność danych zapewnia wyższy poziom przepustowości i zwiększa skalowalność.                              | Model bezpieczeństwa opiera się na założeniach dotyczących zaufania i zachętach kryptoekonomicznych, w przeciwieństwie do ZK-rollupów, które opierają się wyłącznie na kryptograficznych mechanizmach bezpieczeństwa. |

### Korzystanie z validium/volitions {#use-validium-and-volitions}

Wiele projektów zapewnia implementacje validium i volitions, które można zintegrować ze swoimi zdecentralizowanymi aplikacjami (dapp):

**StarkWare StarkEx** - _StarkEx to rozwiązanie skalowalności warstwy 2 (L2) Ethereum, które opiera się na dowodach ważności. Może działać w trybach dostępności danych ZK-Rollup lub Validium._

- [Dokumentacja](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Strona internetowa](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter to protokół skalowania warstwy 2 (L2) rozwiązujący problem dostępności danych za pomocą hybrydowego podejścia, które łączy idee zkRollup i shardingu. Może obsługiwać dowolnie wiele shardów, z których każdy ma własną politykę dostępności danych._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentacja](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Strona internetowa](https://zksync.io/)

## Dalsza lektura {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [The Practical Guide to Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)