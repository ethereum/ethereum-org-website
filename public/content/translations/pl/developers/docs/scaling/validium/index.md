---
title: Validium
description: Wprowadzenie do Validium jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
sidebarDepth: 3
---

Validium to [rozwiązanie skalujące](/developers/docs/scaling/), które wymusza integralność transakcji za pomocą dowodów ważności, takich jak [ZK-rollupy](/developers/docs/scaling/zk-rollups/), ale nie przechowuje danych transakcji w sieci głównej Ethereum. Chociaż dostępność danych poza łańcuchem wiąże się z pewnymi kompromisami, może prowadzić do ogromnej poprawy skalowalności (validia mogą przetwarzać [~9000 lub więcej transakcji na sekundę](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Wymagania wstępne {#prerequisites}

Należy przeczytać i zrozumieć naszą stronę na temat [skalowania Ethereum](/developers/docs/scaling/) i [warstwy 2](/layer-2).

## Czym jest validium? {#what-is-validium}

Validium to skalowalne rozwiązania wykorzystujące dostępność danych poza łańcuchem i obliczenia, mające na celu poprawę przepustowości poprzez przetwarzanie transakcji poza główną siecią Ethereum. Podobnie jak rollupy o zerowej wiedzy (ZK-rollupy), validia publikują [dowody zerowej wiedzy](/glossary/#zk-proof) w celu weryfikacji transakcji poza łańcuchem na Ethereum. Zapobiega to nieprawidłowym zmianom stanów i zwiększa gwarancje bezpieczeństwa łańcucha validium.

Tego typu „dowody ważności” mogą przybierać formę ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) lub ZK-STARKs (Zero-Knowledge Scalable Transparent Argument of Knowledge). Więcej o [dowodach zerowej wiedzy](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Środki należące do użytkowników validium są kontrolowane przez inteligentny kontrakt w Ethereum. Validia oferują niemal natychmiastowe wypłaty, podobnie jak ZK-rollupy; gdy dowód ważności żądania wypłaty zostanie zweryfikowany w sieci głównej, użytkownicy mogą wypłacić środki, przedstawiając [dowody Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Dowód Merkle’a weryfikuje uwzględnienie transakcji wypłaty użytkownika w zweryfikowanej partii transakcji, umożliwiając kontraktowi onchain przetworzenie wypłaty.

Jednak użytkownicy validium mogą mieć zamrożone środki i ograniczone możliwości wypłat. Może się tak zdarzyć, jeśli menedżerowie dostępności danych w łańcuchu validium wstrzymują się z udostępnianiem użytkownikom danych o stanie poza łańcuchem. Bez dostępu do danych transakcyjnych użytkownicy nie mogą obliczyć dowodu Merkle'a wymaganego do potwierdzenia własności środków i dokonywania wypłat.

To jest główna różnica między validium a ZK-rollupami — ich pozycją na spektrum dostępności danych. Oba rozwiązania podchodzą do przechowywania danych w odmienny sposób, co ma wpływ na bezpieczeństwo i brak zaufania.

## W jaki sposób validium wchodzą w interakcję z Ethereum? Jak validia wchodzą w interakcję z Ethereum? {#how-do-validiums-interact-with-ethereum}

Validium to skalowalne protokoły zbudowane na bazie istniejącego łańcucha Ethereum. Mimo że transakcje są wykonywane poza łańcuchem, łańcuchem validium zarządza zbiór inteligentnych kontraktów wdrożonych w sieci głównej, w tym:

1. **Kontrakt weryfikatora**: Kontrakt weryfikatora sprawdza ważność dowodów przesłanych przez operatora validium podczas dokonywania aktualizacji stanu. Obejmuje to dowody ważności potwierdzające prawidłowość transakcji poza łańcuchem oraz dowody dostępności danych weryfikujące istnienie danych transakcji poza łańcuchem.

2. **Główny kontrakt**: Główny kontrakt przechowuje zobowiązania stanu (korzenie Merkle'a) przesłane przez producentów bloków i aktualizuje stan validium, gdy dowód ważności zostanie zweryfikowany w łańcuchu. Umowa ta obejmuje również przetwarzanie wpłat i wypłat z sieci validium.

Validium bazuje także na głównym łańcuchu Ethereum w następujących kwestiach:

### Rozliczenie {#settlement}

Transakcje wykonywane w validium nie mogą zostać w pełni potwierdzone, dopóki łańcuch nadrzędny nie zweryfikuje ich ważności. Wszystkie sprawy prowadzone za pośrednictwem validium muszą być ostatecznie rozstrzygane w sieci głównej. Blockchain Ethereum zapewnia również „gwarancje rozliczeń” użytkownikom validium, co oznacza, że ​​transakcji poza łańcuchem nie można cofnąć ani zmienić po ich zatwierdzeniu w łańcuchu.

### Bezpieczeństwo {#security}

Ethereum, działając jako warstwa rozliczeniowa, gwarantuje również poprawność przejść stanu w validium. Transakcje poza łańcuchem realizowane w łańcuchu validium są weryfikowane za pośrednictwem inteligentnego kontraktu na warstwie bazowej Ethereum.

Jeśli kontrakt weryfikatora on-chain uzna dowód za nieważny, transakcje zostaną odrzucone. Oznacza to, że operatorzy muszą spełnić warunki ważności narzucone przez protokół Ethereum przed aktualizacją stanu validium.

## Jak działa validium? {#how-does-validium-work}

### Transakcje {#transactions}

Użytkownicy przesyłają transakcje do operatora, czyli węzła odpowiedzialnego za realizację transakcji w łańcuchu validium. Niektóre validia mogą korzystać z jednego operatora do obsługi łańcucha lub opierać się na mechanizmie [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/) do rotacji operatorów.

Operator zbiera transakcje w partie, a następnie przesyła ją do obwodu udowadniającego w celu wygenerowania dowodu. .

### Zobowiązania dotyczące stanu {#state-commitments}

Stan validium jest zakodowany jako drzewo Merkle o korzeniu przechowywanym w głównym kontrakcie na Ethereum. Korzeń Merkle, znany również jako korzeń stanu, działa jako kryptograficzne potwierdzenie obecnego stanu kont oraz ich sald na validium.

Aby wykonać aktualizację stanu, operator musi opracować nowy korzeń stanu (po wykonaniu transakcji) i zgłosić go do kontraktu onchain. Jeśli dowód ważności potwierdzi się, zaproponowany stan zostaje zaakceptowany a validium przestawia się na nowy korzeń stanu.

### Wpłaty i wypłaty {#deposits-and-withdrawals}

Użytkownicy przenoszą środki z Ethereum do validium poprzez deponowanie ETH (lub innego tokena zgodnego z ERC) na kontrakcie onchain. Kontrakt przekazuje zdarzenie depozytu do validium offchain, gdzie adres użytkownika zostaje zasilony kwotą równą wielkości jego depozytu. Operator dołącza również transakcję depozytu do nowej partii.

Aby przenieś środki z powrotem do Ethereum, użytkownik validium rozpoczyna transakcję wypłaty i zgłasza ją do operatora, który potwierdza żądanie wypłaty i dołącza je do partii. Środki użytkownika na łańcuchu validium są również niszczone, zanim mogą opuścić system. Kiedy dowód ważności powiązany z partią jest zweryfikowany, użytkownik może wywołać główny kontrakt w celu wypłaty pozostałości jego pierwotnego depozytu.

Jako mechanizm antycenzuralny protokół validium pozwala użytkownikom wypłacać bezpośrednio z kontraktu validium z pominięciem operatora. W tym przypadku użytkownicy muszą przedstawić dowód Merkle kontraktowi weryfikującego, wykazując w ten sposób fakt włączenia konta do korzenia stanu. Jeśli dowód zostanie zaakceptowany, użytkownik może wywołać funkcję wypłaty kontraktu głównego, aby wypłacić swoje środku z validium.

### Przesyłanie wsadowe {#batch-submission}

Po wykonaniu partii transakcji operator zgłasza powiązany dowód ważności kontraktowi weryfikującemu i proponuje nowy korzeń stanu do kontraktu głównego. Jeśli dowód jest ważny, kontrakt główny aktualizuje stan validium i finalizuje wyniki transakcji w partii.

W przeciwieństwie do rollupu zerowej wiedzy, twórcy bloków na validium nie są zobowiązani, aby publikować dane transakcji dla partii transakcji (tylko nagłówki bloków). To sprawia, że validium jest protokołem skalującym czysto offchain, w przeciwieństwie do „hybrydowych” protokołów skalowania (tj. [warstwy 2](/layer-2/)), które publikują dane o stanie w głównym łańcuchu Ethereum, używając danych blob, `calldata` lub kombinacji obu.

### Dostępność danych {#data-availability}

Jak wspomniano, validium używa modelu dostępności danych offchain, w którym operatorzy przechowują wszystkie dane transakcji poza główną siecią Ethereum. Niskie zapotrzebowanie na dane onchain validium zwiększa możliwość skalowania (przepustowość nie jest ograniczona przez możliwości procesowania danych Ethereum) i ogranicza opłaty poniesione przez użytkownika (koszt publikacji danych onchain jest niższy).

Dostępność danych offchain wprowadza jednak jeden problem: dane niezbędne do tworzenia i weryfikacji dowodów Merkle mogą być niedostępne. Oznacza to, że użytkownicy mogą nie mieć możliwości wypłaty swoich środków z kontraktu onchian, jeśli operatorzy zachowają się w sposób wrogi.

Wiele rozwiązań validium próbuje pokonać problem poprzez decentralizację przechowywania danych stanu. To obejmuje zmuszenie twórców bloków do przesłania potrzebnych danych do "managerów dostępności danych" odpowiedzialnych za przechowywanie danych offchain i udostępnianie ich użytkownikom na żądanie.

Managerowie dostępności danych potwierdzają dostępność danych dla transakcji offchain poprzez podpisywanie każdej partii validium. Te podpisy stanowią formę "dowodu dostępności", które są sprawdzane onchain przez kontrakt weryfikujący przed zatwierdzeniem aktualizacji stanu.

Różne rodzaje validium różnią się między sobą podejściem do zarządzania dostępnością danych. Niektóre polegają na podmiotach zewnętrznych, które przechowują dane stanu, a inne wykorzystują do tego zdania losowo przypisanych walidatorów.

#### Komitet ds. dostępności danych (DAC) {#data-availability-committee}

W celu zagwarantowania dostępności danych offchain niektóre rozwiązania validium wyznaczają grupę zaufanych podmiotów, znanych kolektywnie jako komitet dostępności danych (DAC), w celu przechowywania kopii stanu oraz zapewniania dowodu dostępności danych. DAC są łatwiejsze w implementacji oraz wymagają mniej koordynacji z uwagi na niską liczbę członków.

Użytkownicy muszą jednak ufać, że DAC zapewni dostępność danych, kiedy będzie to potrzebne (np. do generowania dowodów Merkle). Istnieje możliwość, że członkowie komitetów ds. dostępności danych [zostaną skompromitowani przez złośliwego aktora](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), który może następnie wstrzymać dane offchain.

[Więcej o komitetach ds. dostępności danych w validiach](https://medium.com/starkware/data-availability-e5564c416424).

#### Dostępność danych z zabezpieczeniem {#bonded-data-availability}

Inne validium wymagają, aby uczestnicy odpowiadający za przechowywanie danych offchain  Ten wkład służy jako "kaucja" aby zagwarantować uczciwe zachowanie wśród managerów dostępności danych i zredukować konieczność zaufania. Jeśli co uczestnicy nie udowodnią dostępności danych, zabezpieczenie jest ucinane.

W schemacie zabezpieczonej dostępności danych każdy może zostać wyznaczony do przechowywania danych offchain, kiedy tylko wpłacą odpowiednią sumę. To rozszerza pulę kwalifikujących się managerów dostępności danych, zmniejszając centralizację, która wpływa na komitety dostępności danych (DAC). Co ważniejsze, to podejście opiera się na zachętach kryptoekonomicznych w celu zapobieżenia złośliwej aktywności, co jest znacząco bardziej bezpieczne niż wyznaczenie zaufanych podmiotów do zabezpieczenia danych offline w validium.

[Więcej o dostępności danych z zabezpieczeniem w validiach](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition i validium {#volitions-and-validium}

Validium oferuje wiele korzyści, ale ma też swoje wady (najbardziej znacząca to dostępność danych). Jednak, jak w przypadku wielu rozwiązań do skalowania, validium jest odpowiednie do konkretnych zastosowań — właśnie dlatego zostało stworzone.

Systemy wyboru łączą rollup zerowej wiedzy oraz sieć validium oraz pozwalają użytkownikowi na przełączanie się pomiędzy tymi dwoma rozwiązaniami do skalowania. W przypadku systemów wyboru użytkownicy mogą korzystać z, oferowanej przez validium, dostępności danych offchain dla niektórych transakcji, zachowując jednak możliwość przełączenia się na rozwiązanie dostępności danych onchain (rollup zerowej wiedzy) jeśli jest to potrzebne. To w gruncie rzeczy daje użytkownikom możliwość wyboru kompromisów podyktowanych ich unikalnymi okolicznościami.

Zdecentralizowana giełda (DEX) może preferować skalowalną i prywatną infrastrukturę validium dla handlu o wysokiej wartości. Użytkownicy, którym zależy na większym bezpieczeństwie i zaufaniu, mogą również skorzystać z pakietu ZK-rollup.

## Validia a kompatybilność z EVM {#validiums-and-evm-compatibility}

Podobnie jak ZK-rollupy, validium nadają się głównie do prostych zastosowań, takich jak wymiana tokenów i płatności. Obsługa ogólnych obliczeń i wykonywania inteligentnych kontraktów pomiędzy validiami jest trudna do wdrożenia, biorąc pod uwagę znaczny narzut związany z dowodzeniem instrukcji [EVM](/developers/docs/evm/) w obwodzie dowodowym zerowej wiedzy.

Niektóre projekty validium próbują ominąć ten problem, kompilując języki zgodne z EVM (np. Solidity, Vyper) w celu utworzenia niestandardowego kodu bajtowego zoptymalizowanego pod kątem efektywnego dowodzenia. Wadą tego podejścia jest to, że nowe maszyny wirtualne obsługujące dowody zerowej wiedzy mogą nie obsługiwać ważnych kodów operacji EVM, a programiści muszą pisać bezpośrednio w języku wysokiego poziomu, aby uzyskać optymalne działanie. Stwarza to jeszcze więcej problemów: zmusza deweloperów do tworzenia zdecentralizowanych aplikacji przy użyciu zupełnie nowego stosu programistycznego i uniemożliwia kompatybilność z obecną infrastrukturą Ethereum.

Niektóre zespoły próbują jednak zoptymalizować istniejące kody operacji EVM pod kątem obwodów sprawdzających ZK. Rezultatem będzie opracowanie maszyny wirtualnej Ethereum o zerowej wiedzy (zkEVM), która będzie zgodna z EVM i będzie generować dowody weryfikujące poprawność wykonywania programu. Dzięki zkEVM łańcuchy validium mogą wykonywać inteligentne kontrakty poza łańcuchem i przesyłać dowody ważności w celu weryfikacji obliczeń poza łańcuchem (bez konieczności ponownego ich wykonywania) w sieci Ethereum.

[Więcej o zkEVM](https://www.alchemy.com/overviews/zkevm).

## Jak validium skalują Ethereum? Skalowanie Ethereum za pomocą validiów {#scaling-ethereum-with-validiums}

### 1. Przechowywanie danych poza łańcuchem {#offchain-data-storage}

Projekty skalowania warstwy 2, takie jak rollupy optymistyczne i ZK-rollupy, wymieniają nieskończoną skalowalność czystych protokołów skalowania offchain (np. [Plasma](/developers/docs/scaling/plasma/)) na bezpieczeństwo, publikując niektóre dane transakcyjne w warstwie 1. Oznacza to jednak, że skalowalność rollupów jest ograniczona przepustowością danych w sieci głównej Ethereum (dlatego [sharding danych](/roadmap/danksharding/) ma na celu poprawę pojemności przechowywania danych Ethereum).

Validium osiąga skalowalność dzięki przechowywaniu wszystkich danych transakcyjnych poza łańcuchem i publikowaniu zobowiązań dotyczących stanu (oraz dowodów ważności) tylko przy przekazywaniu aktualizacji stanu do głównego łańcucha Ethereum. Jednak istnienie dowodów ważności daje validiom wyższe gwarancje bezpieczeństwa niż inne czysto offchainowe rozwiązania skalujące, w tym Plasma i [łańcuchy poboczne](/developers/docs/scaling/sidechains/). Zmniejszając ilość danych, które Ethereum musi przetworzyć przed zatwierdzeniem transakcji poza łańcuchem, rozwiązania validium znacznie zwiększają przepustowość sieci głównej.

### 2. Dowody rekurencyjne {#recursive-proofs}

Dowód rekurencyjny to dowód poprawności, który weryfikuje poprawność innych dowodów. Te „dowody dowodów” są generowane poprzez rekurencyjne agregowanie wielu dowodów, aż do momentu utworzenia ostatecznego dowodu weryfikującego wszystkie poprzednie dowody. Dowody rekurencyjne zwiększają szybkość przetwarzania blockchain poprzez zwiększenie liczby transakcji, które można zweryfikować przy użyciu jednego dowodu ważności.

Z reguły każdy dowód ważności przesyłany przez operatora validium do Ethereum w celu weryfikacji potwierdza integralność pojedynczego bloku. Podczas gdy pojedynczy dowód rekurencyjny może zostać użyty do potwierdzenia prawidłowości kilku bloków validium jednocześnie — jest to możliwe, ponieważ obwód dowodzący może rekurencyjnie agregować kilka dowodów blokowych w jeden ostateczny dowód. Jeśli kontrakt weryfikatora on-chain zaakceptuje dowód rekurencyjny, wszystkie bazowe bloki zostaną natychmiast sfinalizowane.

## Zalety i wady validium {#pros-and-cons-of-validium}

| Zalety                                                                                                                                                                             | Wady                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dowody ważności wymuszają integralność transakcji poza łańcuchem i zapobiegają finalizowaniu przez operatorów nieprawidłowych aktualizacji stanu.                  | Do tworzenia dowodów ważności wymagany jest specjalistyczny sprzęt, co stwarza ryzyko centralizacji.                                                                                                                  |
| Zwiększa efektywność kapitału dla użytkowników (brak opóźnień w wypłacaniu środków z powrotem do Ethereum)                                                      | Ograniczone wsparcie dla ogólnych obliczeń/inteligentnych kontraktów; do rozwoju wymagane są specjalistyczne języki.                                                                                                  |
| Niepodatność na niektóre ataki gospodarcze, z którymi borykają się systemy oparte na oszustwach w zastosowaniach o wysokiej wartości.                              | Do generowania dowodów ZK wymagana jest duża moc obliczeniowa; nieopłacalne rozwiązanie w przypadku aplikacji o niskiej przepustowości.                                                                               |
| Zmniejsza opłaty za gaz dla użytkowników, ponieważ nie przesyłają danych połączeń do głównej sieci Ethereum.                                                       | Dłuższy czas subiektywnej ostateczności (10–30 minut na wygenerowanie dowodu ZK), ale szybsze osiągnięcie pełnej ostateczności, ponieważ nie występuje opóźnienie czasowe związane z sporem.       |
| Nadaje się do konkretnych zastosowań, takich jak handel lub gry oparte na technologii blockchain, w których priorytetem jest prywatność transakcji i skalowalność. | Użytkownikom można uniemożliwić wypłacanie środków, ponieważ generowanie dowodów własności Merkle wymaga ciągłej dostępności danych spoza łańcucha.                                                                   |
| Dostępność danych poza łańcuchem zapewnia wyższy poziom przepustowości i zwiększa skalowalność.                                                                    | Model bezpieczeństwa opiera się na założeniach dotyczących zaufania i zachętach kryptoekonomicznych, w przeciwieństwie do ZK-rollupów, które opierają się wyłącznie na kryptograficznych mechanizmach bezpieczeństwa. |

### Użyj Validium/Volition {#use-validium-and-volitions}

Istnieje wiele projektów, które zapewniają implementacje Validium i Volitions, które można zintegrować z aplikacjami zdecentralizowanymi:

**StarkWare StarkEx** – _StarkEx to rozwiązanie skalowalności warstwy 2 (L2) Ethereum, oparte na dowodach ważności._ Może działać w trybie dostępności danych ZK-Rollup lub Validium._

- [Dokumentacja](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Strona internetowa](https://starkware.co/starkex/)

**Matter Labs zkPorter** – _zkPorter to protokół skalowania warstwy 2, który podchodzi do kwestii dostępności danych w sposób hybrydowy, łącząc idee zkRollup i shardingu._ Może obsługiwać dowolną liczbę shardów, z których każdy ma własną politykę dostępności danych._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Dokumentacja](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Strona internetowa](https://zksync.io/)

## Dalsza lektura {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums, and Volitions: Learn About the Hottest Ethereum Scaling Solutions](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
