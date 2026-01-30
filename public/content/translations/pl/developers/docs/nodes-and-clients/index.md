---
title: Węzły i klienci
description: Przegląd węzłów Ethereum i oprogramowania klienta, a także instrukcja jak skonfigurować węzeł i dlaczego należy to zrobić.
lang: pl
sidebarDepth: 2
---

Ethereum jest rozproszoną siecią komputerów (znanych jako węzły), które mogą weryfikować bloki i dane transakcji. Aby przekształcić komputer w węzeł Ethereum, należy uruchomić na nim oprogramowanie. Dwa oddzielne elementy oprogramowania (znane jako „klienci”) są wymagane do stworzenia węzła.

## Wymagania wstępne {#prerequisites}

Zanim zagłębisz się w temat i uruchomisz własną instancję klienta Ethereum, powinieneś zrozumieć koncepcję sieci peer-to-peer oraz [podstawy EVM](/developers/docs/evm/). Zapoznaj się z naszym [wprowadzeniem do Ethereum](/developers/docs/intro-to-ethereum/).

Jeśli dopiero zaczynasz przygodę z węzłami, zalecamy najpierw zapoznanie się z naszym przyjaznym dla użytkownika wprowadzeniem na temat [uruchamiania węzła Ethereum](/run-a-node).

## Czym są węzły i klienci? {#what-are-nodes-and-clients}

„Węzeł” to dowolna instancja oprogramowania klienta Ethereum, która jest połączona z innymi komputerami, na których również działa oprogramowanie Ethereum, tworzące sieć. Klient to implementacja Ethereum, która weryfikuje dane zgodnie z zasadami protokołu i zapewnia bezpieczeństwo sieci. Węzeł musi uruchomić dwóch klientów: klienta konsensusu i klienta wykonawczego.

- Klient wykonania (zwany również mechanizmem wykonania, klientem EL lub, wcześniej, klientem Eth1) nasłuchuje nowych transakcji emitowanych w sieci, wykonuje je w EVM i przechowuje najnowszy stan i bazę danych wszystkich aktualnych danych Ethereum.
- Klient konsensusu (znany również jako węzeł śledzący, klient CL lub, wcześniej, klient Eth2) wdraża algorytm konsensusu proof-of-stake, który umożliwia sieci osiągnięcie porozumienia na podstawie zwalidowanych danych od klienta wykonawczego. Istnieje również trzeci element oprogramowania, znany jako „walidator”, który może zostać dodany do klienta konsensusu, pozwalając węzłowi na uczestniczenie w zabezpieczaniu sieci.

Te klienty działają razem, aby śledzić początek łańcucha Ethereum i umożliwić użytkownikom interakcję z siecią Ethereum. Modułowa konstrukcja z wieloma elementami oprogramowania współpracującymi ze sobą jest nazywana [złożonością hermetyzowaną](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Takie podejście ułatwiło płynne przeprowadzenie [The Merge](/roadmap/merge), ułatwia utrzymywanie i rozwijanie oprogramowania klienta i umożliwia ponowne wykorzystanie poszczególnych klientów, na przykład w [ekosystemie warstwy 2](/layer-2/).

![Połączone klienty wykonawcze i konsensusu](./eth1eth2client.png)
Uproszczony diagram połączonego klienta wykonawczego i konsensusu.

### Różnorodność klientów {#client-diversity}

Zarówno [klienci wykonawczy](/developers/docs/nodes-and-clients/#execution-clients), jak i [klienci konsensusu](/developers/docs/nodes-and-clients/#consensus-clients) istnieją w różnych językach programowania i są rozwijani przez różne zespoły.

Wiele implementacji klientów może wzmocnić sieć, zmniejszając jej zależność od jednej bazy kodu. Idealnym celem jest osiągnięcie różnorodności bez dominacji któregokolwiek klienta w sieci, co eliminuje potencjalny pojedynczy punkt awarii.
Różnorodność języków zachęca także szerszą społeczność programistów do tworzenia integracji w preferowanych przez nich językach.

Dowiedz się więcej o [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity/).

Wspólną cechą tych implementacji jest to, że wszystkie są zgodne z jedną specyfikacją. Specyfikacje określają sposób działania sieci Ethereum i blockchainu. Każdy szczegół techniczny został zdefiniowany, a specyfikacje można znaleźć jako:

- Pierwotnie, [Żółta Księga Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Specyfikacje wykonawcze](https://github.com/ethereum/execution-specs/)
- [Specyfikacje konsensusu](https://github.com/ethereum/consensus-specs)
- [EIP](https://eips.ethereum.org/) wdrożone w różnych [aktualizacjach sieci](/ethereum-forks/)

### Śledzenie węzłów w sieci {#network-overview}

Wiele trackerów oferuje w czasie rzeczywistym przegląd węzłów w sieci Ethereum. Należy pamiętać, że ze względu na naturę sieci zdecentralizowanych programy te mogą zapewnić jedynie ograniczony obraz sieci i mogą podawać różne wyniki.

- [Mapa węzłów](https://etherscan.io/nodetracker) od Etherscan
- [Ethernodes](https://ethernodes.org/) od Bitfly
- [Nodewatch](https://www.nodewatch.io/) od Chainsafe, przeszukujący węzły konsensusu
- [Monitoreth](https://monitoreth.io/) – od MigaLabs, rozproszone narzędzie do monitorowania sieci
- [Tygodniowe raporty o stanie sieci](https://probelab.io) – od ProbeLab, przy użyciu [crawlera Nebula](https://github.com/dennis-tra/nebula) i innych narzędzi

## Typy węzłów {#node-types}

Jeśli chcesz [uruchomić własny węzeł](/developers/docs/nodes-and-clients/run-a-node/), powinieneś wiedzieć, że istnieją różne typy węzłów, które w różny sposób wykorzystują dane. Klienty mogą prowadzić trzy różne typy węzłów: lekkie, pełne i archiwalne. Dostępne są również opcje różnych strategii synchronizacji, które umożliwiają skrócenie czasu synchronizacji. Synchronizacja odnosi się do tego, jak szybko uzyskiwane są aktualne informacje o stanie Ethereum.

### Pełny węzeł {#full-node}

Pełne węzły przeprowadzają walidację blockchainu blok po bloku, pobierając oraz weryfikując treść bloku i dane stanu dla każdego bloku. Istnieją różne klasy pełnych węzłów — niektóre zaczynają od bloku genezy i weryfikują każdy pojedynczy blok w całej historii blockchainu. Inne rozpoczynają weryfikację od nowszego bloku, który uznają za prawidłowy (np. „synchronizacja snap” w Geth). Niezależnie od miejsca rozpoczęcia weryfikacji, pełne węzły przechowują tylko lokalną kopię stosunkowo najnowszych danych (zazwyczaj najnowsze 128 bloków), pozwalając na usuwanie starszych danych w celu zaoszczędzenia miejsca na dysku. Starsze dane mogą zostać zregenerowanie, kiedy będą potrzebne.

- Przechowuje pełne dane sieci blockchain (chociaż są one okresowo przycinane, więc pełny węzeł nie przechowuje wszystkich danych stanu od samej genezy)
- Uczestniczy w walidacji bloków, weryfikuje wszystkie bloki i stany.
- Wszystkie stany mogą zostać pozyskane z pamięci lokalnej lub wygenerowane z „migawek” przez pełny węzeł.
- Obsługuje sieć i dostarcza dane na żądanie.

### Węzeł archiwalny {#archive-node}

Węzły archiwalne to pełne węzły, które weryfikują każdy blok od genezy i nigdy nie usuwają żadnych pobranych danych.

- Przechowuje wszystko w pełnym węźle i buduje archiwum stanów historycznych. Jest on potrzebny, jeśli chcesz sprawdzić przykładowo stan konta w bloku nr 4000000 lub po prostu niezawodnie przetestować własny zestaw transakcji bez potrzeby potwierdzania ich za pomocą śledzenia.
- Dane te reprezentują jednostki terabajtów, co sprawia, że ​​węzły archiwów są mniej atrakcyjne dla przeciętnych użytkowników, ale mogą być przydatne w przypadku usług takich jak eksploratory bloków, dostawcy portfeli i analizy łańcuchów.

Synchronizowanie klientów w trybie innym niż archiwalny spowoduje przycięcie danych blockchainu. To znaczy, że nie ma archiwum wszystkich historycznych stanów, ale pełny węzeł jest w stanie utworzyć je na żądanie.

Dowiedz się więcej o [węzłach archiwalnych](/developers/docs/nodes-and-clients/archive-nodes).

### Lekki węzeł {#light-node}

Zamiast pobierać każdy blok, lekkie węzły pobierają tylko nagłówki bloków. Nagłówki te zawierają podsumowane informacje dotyczące zawartości bloków. Wszelkie inne informacje, jakich potrzebuje lekki węzeł, są żądane od pełnego węzła. Lekki węzeł może wtedy niezależnie weryfikować otrzymane dane, porównując je ze źródłami stanu w nagłówkach bloków. Lekkie węzły umożliwiają użytkownikom uczestniczenie w sieci Ethereum bez mocnego sprzętu i dużej przepustowości wymaganej do uruchomienia pełnych węzłów. Ostatecznie lekkie węzły mogą działać na telefonach komórkowych lub urządzeniach wbudowanych. Lekkie węzły nie uczestniczą w konsensusie (tzn. nie mogą być walidatorami), ale mogą uzyskać dostęp do blockchaina Ethereum z taką samą funkcjonalnością i gwarancjami bezpieczeństwa jak pełny węzeł.

Lekkie klienty to obszar aktywnego rozwoju Ethereum i spodziewamy się wkrótce zobaczyć nowych lekkich klientów warstwy konsensusu i warstwy wykonawczej.
Istnieją również potencjalne sposoby dostarczania danych lekkich klientów przez [sieć gossip](https://www.ethportal.net/). Jest to korzystne, ponieważ sieć plotkująca mogłaby obsługiwać sieć lekkich węzłów, nie wymagając od pełnych węzłów obsługi żądań.

Ethereum nie obsługuje jeszcze dużej liczby lekkich węzłów, ale obsługa lekkich węzłów jest obszarem, który w najbliższej przyszłości zapewne będzie się szybko rozwijał. W szczególności klienci tacy jak [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) i [LodeStar](https://lodestar.chainsafe.io/) są obecnie mocno skoncentrowani na lekkich węzłach.

## Dlaczego należy uruchomić węzeł Ethereum? {#why-should-i-run-an-ethereum-node}

Uruchomienie węzła pozwala Ci na bezpośrednie, pozbawione zaufania i prywatne korzystanie z Ethereum, a jednocześnie wspieranie sieci poprzez zwiększanie jej niezawodności i decentralizacji.

### Korzyści dla Ciebie {#benefits-to-you}

Prowadzenie własnego węzła umożliwia korzystanie z Ethereum w sposób prywatny, samowystarczalny i pozbawiony zaufania. Nie musisz ufać sieci, ponieważ możesz samodzielnie zweryfikować dane za pomocą swojego klienta. „Nie ufaj, sprawdzaj” jest popularną mantrą blockchainu.

- Twój węzeł samodzielnie weryfikuje wszystkie transakcje i bloki pod względem zasad konsensusu. To znaczy, że nie musisz polegać na żadnych innych węzłach w sieci ani w pełni im ufać.
- Można używać portfela Ethereum z własnym węzłem. Można używać zdecentralizowanych aplikacji bezpieczniej i bardziej prywatnie, ponieważ nie musisz przekazywać swoich adresów i sald pośrednikom. Wszystko można sprawdzić za pomocą własnego klienta. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) i [wiele innych portfeli](/wallets/find-wallet/) oferuje importowanie RPC, co pozwala im na korzystanie z Twojego węzła.
- Możesz korzystać z innych usług, które zależą od danych z Ethereum, i samodzielnie je prowadzić. Na przykład mogą to być walidator łańcucha śledzącego, oprogramowanie warstwy 2, infrastruktura, eksploratory bloków, operatorzy płatności itd.
- Możesz udostępnić własne niestandardowe [punkty końcowe RPC](/developers/docs/apis/json-rpc/). Możesz nawet publicznie oferować te punkty końcowe społeczności, aby pomóc im uniknąć dużych scentralizowanych dostawców.
- Możesz połączyć się ze swoim węzłem za pomocą **komunikacji międzyprocesowej (IPC)** lub przepisać węzeł tak, aby ładował Twój program jako wtyczkę. Zapewnia to niską latencję, co bardzo pomaga, np. podczas przetwarzania dużej ilości danych przy użyciu bibliotek web3 lub gdy musisz jak najszybciej zastąpić swoje transakcje (tj. frontrunning).
- Możesz bezpośrednio stakować ETH, aby zabezpieczać sieć i zdobywać nagrody. Zobacz [solo staking](/staking/solo/), aby zacząć.

![Jak uzyskać dostęp do Ethereum za pośrednictwem aplikacji i węzłów](./nodes.png)

### Korzyści dla sieci {#network-benefits}

Różnorodny zestaw węzłów jest ważny dla dobrej kondycji, bezpieczeństwa i odporności operacyjnej Ethereum.

- Pełne węzły wymuszają zasady konsensusu, więc nie można ich oszukać w celu akceptowania bloków, które są niezgodne z tymi zasadami. Zapewnia to dodatkowe bezpieczeństwo w sieci, ponieważ gdyby wszystkie węzły były węzłami lekkimi, które nie dokonują pełnej weryfikacji, walidatorzy mogliby zaatakować sieć.
- W przypadku ataku, który pokona kryptoekonomiczną obronę [dowodu stawki](/developers/docs/consensus-mechanisms/pos/#what-is-pos), pełne węzły mogą przeprowadzić odzyskiwanie społeczne, wybierając podążanie za uczciwym łańcuchem.
- Większa liczba węzłów w sieci skutkuje bardziej zróżnicowaną i niezawodną siecią, stanowiącą ostateczny cel — decentralizację — i umożliwiającą system odporny na cenzurę i niezawodny.
- Pełne węzły zapewniają dostęp do danych blockchainu lekkim klientom, które są od nich zależne. Lekkie węzły nie przechowują całego łańcucha bloków, zamiast tego weryfikują dane za pomocą [korzeni stanu w nagłówkach bloków](/developers/docs/blocks/#block-anatomy). W razie potrzeby mogą zażądać dodatkowych informacji od pełnych węzłów.

Jeśli masz uruchomiony pełny węzeł, korzysta z niego cała sieć Ethereum, nawet jeśli jest on bez walidatora.

## Uruchamianie własnego węzła {#running-your-own-node}

Interesuje Cię prowadzenie własnego klienta Ethereum?

Aby uzyskać wprowadzenie przyjazne dla początkujących, odwiedź naszą stronę [uruchamianie węzła](/run-a-node), aby dowiedzieć się więcej.

Jeśli jesteś bardziej technicznym użytkownikiem, zagłęb się w więcej szczegółów i opcji dotyczących tego, jak [uruchomić własny węzeł](/developers/docs/nodes-and-clients/run-a-node/).

## Alternatywy {#alternatives}

Konfigurowanie własnego węzła może kosztować czas i zasoby, ale nie zawsze musisz uruchamiać własne wystąpienie. W tym przypadku możesz użyć zewnętrznego dostawcy API. Aby zapoznać się z omówieniem korzystania z tych usług, sprawdź [węzły jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Jeśli ktoś uruchamia węzeł Ethereum z publicznym interfejsem API w Twojej społeczności, możesz skierować swoje portfele do węzła społeczności za pośrednictwem niestandardowego RPC i zyskać większą prywatność, niż korzystając z losowej zaufanej strony trzeciej.

Z drugiej strony, jeśli prowadzisz klienta, możesz udostępniać go znajomym, którzy mogą tego potrzebować.

## Klienci wykonawczy {#execution-clients}

Społeczność Ethereum utrzymuje wielu klientów wykonania o otwartym kodzie źródłowym (znanych wcześniej jako „klienci Eth1” lub po prostu „klienci Ethereum”), opracowanych przez różne zespoły przy użyciu różnych języków programowania. To sprawia, że sieć jest silniejsza i bardziej [zróżnicowana](/developers/docs/nodes-and-clients/client-diversity/). Idealnym celem jest osiągnięcie różnorodności bez zdominowania przez żadnego klienta w celu zmniejszenia pojedynczych punktów awarii.

W tej tabeli przedstawiono podsumowanie poszczególnych klientów. Wszystkie z nich przechodzą [testy klienta](https://github.com/ethereum/tests) i są aktywnie utrzymywane, aby być na bieżąco z aktualizacjami sieci.

| Klient                                                                                      | Język                    | Systemy operacyjne    | Sieci                         | Strategie synchronizacji                                                            | Czyszczenie stanu |
| ------------------------------------------------------------------------------------------- | ------------------------ | --------------------- | ----------------------------- | ----------------------------------------------------------------------------------- | ----------------- |
| [Geth](https://geth.ethereum.org/)                                                          | Go                       | Linux, Windows, macOS | Sieć główna, Sepolia, Holesky | [Snap](#snap-sync), [Pełna](#full-sync)                                             | Archive, Pruned   |
| [Nethermind](https://www.nethermind.io/)                                                    | C#, .NET | Linux, Windows, macOS | Sieć główna, Sepolia, Holesky | [Snap](#snap-sync) (bez serwowania), Szybka, [Pełna](#full-sync) | Archive, Pruned   |
| [Besu](https://besu.hyperledger.org/en/stable/)                                             | Java                     | Linux, Windows, macOS | Sieć główna, Sepolia, Holesky | [Snap](#snap-sync), [Szybka](#fast-sync), [Pełna](#full-sync)                       | Archive, Pruned   |
| [Erigon](https://github.com/ledgerwatch/erigon)                                             | Go                       | Linux, Windows, macOS | Sieć główna, Sepolia, Holesky | [Pełna](#full-sync)                                                                 | Archive, Pruned   |
| [Reth](https://reth.rs/)                                                                    | Rust                     | Linux, Windows, macOS | Sieć główna, Sepolia, Holesky | [Pełna](#full-sync)                                                                 | Archive, Pruned   |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript               | Linux, Windows, macOS | Sepolia, Holesky              | [Pełna](#full-sync)                                                                 | Pruned            |

Więcej informacji o obsługiwanych sieciach znajdziesz w [sieciach Ethereum](/developers/docs/networks/).

Każdy klient ma unikalne zastosowania i zalety, więc należy wybrać jednego z nich odpowiednio do własnych preferencji. Różnorodność pozwala implementacjom skupić się na różnych funkcjach i odbiorcach. Możesz wybrać klienta na podstawie funkcji, wsparcia, języka programowania lub licencji.

### Besu {#besu}

Hyperledger Besu to klient Ethereum klasy korporacyjnej dla sieci publicznych i autoryzowanych. Obsługuje wszystkie funkcje sieci głównej Ethereum, od śledzenia do GraphQL, ma rozbudowany monitoring i jest obsługiwany przez ConsenSys, zarówno w otwartych kanałach społecznościowych, jak i poprzez komercyjne umowy SLA dla przedsiębiorstw. Jest napisany w języku Java i oferowany na licencji Apache 2.0.

Obszerna [dokumentacja](https://besu.hyperledger.org/en/stable/) Besu poprowadzi Cię przez wszystkie szczegóły dotyczące jego funkcji i konfiguracji.

### Erigon {#erigon}

Erigon, znany wcześniej jako Turbo-Geth, powstał jako fork Go Ethereum, nastawiony na szybkość i oszczędność miejsca na dysku. Erigon jest całkowicie przebudowaną implementacją Ethereum, obecnie napisaną w języku Go, ale trwają prace nad implementacją w innych językach. Celem Erigon jest zapewnienie szybszej, bardziej modułowej i zoptymalizowanej implementacji Ethereum. W ciągu 3 dni może wykonać pełną synchronizację węzła archiwum, wykorzystując około 2 TB miejsca na dysku.

### Go Ethereum {#geth}

Go Ethereum (w skrócie Geth) jest jedną z oryginalnych implementacji protokołu Ethereum. Obecnie jest to najbardziej rozpowszechniony klient z największą bazą użytkowników i różnorodnością narzędzi dla użytkowników i deweloperów. Jest napisany w języku Go, w pełni open source i oferowany na licencji GNU LGPL v3.

Dowiedz się więcej o Geth w jego [dokumentacji](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind to implementacja Ethereum stworzona w oparciu o technologię C# .NET, na licencji LGPL-3.0, działająca na wszystkich głównych platformach, w tym ARM. Oferuje wspaniałą wydajność dzięki:

- zoptymalizowanej maszynie wirtualnej;
- dostępowi do stanu;
- funkcjom sieciowym i bogatym funkcjom, takim jak pulpity nawigacyjne Prometheus/Grafana, obsługa rejestrowania sekwencyjnego dla przedsiębiorstw, śledzenie JSON-RPC i wtyczki analityczne.

Nethermind ma również [szczegółową dokumentację](https://docs.nethermind.io), silne wsparcie dla deweloperów, społeczność online i wsparcie 24/7 dostępne dla użytkowników premium.

### Reth {#reth}

Reth (skrót od Rust Ethereum) jest implementacją pełnego węzła Ethereum, która koncentruje się na byciu łatwym w obsłudze, dużej modułowości, szybkości oraz wydajności. Reth był pierwotnie stworzony i rozwijany przez Paradigm i jest licencjonowany na licencjach Apache oraz MIT.

Reth jest gotowy do produkcji i nadaje się do użytku w środowiskach o znaczeniu krytycznym takich jak staking czy usługi o wysokim czasie działania. Dobrze sprawdza się w przypadkach, w których wymagana jest duża wydajność z dużym marginesem takich jak RPC, MEV, indeksowanie, symulacje czy działania P2P.

Dowiedz się więcej, sprawdzając [Księgę Reth](https://reth.rs/) lub [repozytorium Reth na GitHubie](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### W fazie rozwoju {#execution-in-development}

Te klienty są nadal we wczesnej fazie rozwoju i nie zaleca się korzystania ich do celów produkcyjnych.

#### EthereumJS {#ethereumjs}

Klient wykonawczy EthereumJS jest napisany w TypeScript i składa się wielu pakietów, w tym podstawowych prymitywów Ethereum reprezentowanych przez klasy Block, Transaction i Merkle-Patricia Trie oraz podstawowych komponentów klienta, w tym implementacji maszyny wirtualnej Ethereum (EVM), klasy blockchainu i stosu sieciowiego DevP2P.

Dowiedz się więcej na ten temat, czytając jego [dokumentację](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Klienci konsensusu {#consensus-clients}

Istnieje wielu klientów konsensusu (wcześniej znanych jako klienci „Eth2”), którzy wspierają [aktualizacje konsensusu](/roadmap/beacon-chain/). Są one odpowiedzialne za całą logikę związaną z konsensusem, w tym algorytm wyboru forka, przetwarzanie atestacji oraz zarządzanie nagrodami i karami w ramach [dowodu stawki](/developers/docs/consensus-mechanisms/pos).

| Klient                                                        | Język      | Systemy operacyjne    | Sieci                                                      |
| ------------------------------------------------------------- | ---------- | --------------------- | ---------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Łańcuch śledzący, Holesky, Pyrmont, Sepolia i inne         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Łańcuch śledzący, Holesky, Sepolia i inne                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Łańcuch śledzący, Holesky, Sepolia i inne                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Łańcuch śledzący, Gnosis, Holesky, Pyrmont, Sepolia i inne |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Łańcuch śledzący, Gnosis, Holesky, Sepolia i inne          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Łańcuch śledzący, Holesky, Sepolia i inne                  |

### Lighthouse {#lighthouse}

Lighthouse jest implementacją klienta konsensusu napisaną w języku Rust na licencji Apache-2.0. Jest on utrzymywany przez Sigma Prime i jest stabilny i gotowy do produkcji od czasu genezy łańcucha śledzącego. Korzystają z niego różne firmy, pule stakingowe i osoby fizyczne. Ma być bezpieczny, wydajny i interoperacyjny w wielu środowiskach, od komputerów stacjonarnych po zaawansowane, zautomatyzowane wdrożenia.

Dokumentację można znaleźć w [Księdze Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar jest gotową do produkcji implementacją klienta konsensusu napisaną w języku Typescript na licencji LGPL-3.0. Jest on utrzymywany przez ChainSafe Systems i jest najnowszym klientem konsensusu dla solo-stakerów, deweloperów i badaczy. Lodestar składa się z węzła śledzącego i klienta walidatora obsługiwanego przez implementacje protokołów Ethereum w języku JavaScript. Lodestar ma na celu zwiększenie użyteczności Ethereum dzięki lekkim klientom, rozszerzeniu dostępności na większą grupę deweloperów i dalsze przyczynianie się do różnorodności ekosystemu.

Więcej informacji można znaleźć na [stronie internetowej Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus jest implementacją klienta konsensusu napisaną w języku Nim na licencji Apache 2.0. Jest to klient gotowy do produkcji, używany przez solo-stakerów i pule stakingu. Nimbus został zaprojektowany z myślą o efektywnym wykorzystaniu zasobów, dzięki czemu można go z równą łatwością uruchamiać na urządzeniach o ograniczonych zasobach, jak i w infrastrukturze przedsiębiorstwa, bez uszczerbku dla stabilności i wydajności osiągania nagród. Mniejsze obciążanie zasobów znaczy, że klient ma większy margines bezpieczeństwa, gdy sieć jest pod obciążeniem.

Dowiedz się więcej w [dokumentacji Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm to w pełni funkcjonalny klient konsensusu typu open-source napisany w języku Go na licencji GPL-3.0. Ma opcjonalny interfejs użytkownika aplikacji internetowej, a jego priorytetem jest wygoda użytkowania, dokumentacja i możliwość konfiguracji zarówno dla użytkowników-stakerów domowych, jak i instytucjonalnych.

Odwiedź [dokumentację Prysm](https://prysm.offchainlabs.com/docs/), aby dowiedzieć się więcej.

### Teku {#teku}

Teku jest jednym z oryginalnych klientów genezy łańcucha śledzącego. Oprócz zwykłych celów (bezpieczeństwo, niezawodność, stabilność, użyteczność, wydajność) Teku dąży do tego, by w pełni spełniać wymogi wszystkich standardów klienta konsensusu.

Teku oferuje bardzo elastyczne opcje wdrożenia. Węzeł śledzący i klient walidatora mogą być uruchomione razem jako jeden proces, co jest bardzo wygodne dla solo-stakerów, lub węzły można uruchomić oddzielnie w celu wykonywania zaawansowanych operacji stakingu. Ponadto Teku jest w pełni interoperacyjny z [Web3Signer](https://github.com/ConsenSys/web3signer/), co zapewnia bezpieczeństwo klucza do podpisu i ochronę przed slashingiem.

Teku jest napisany w języku Java na licencji Apache 2.0. Został opracowany przez zespół ds. protokołów w ConsenSys, który jest również odpowiedzialny za oprogramowanie Besu i Web3Signer. Dowiedz się więcej w [dokumentacji Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine to implementacja klienta konsensusu napisana w języku Rust na licencji GPL-3.0. Jest szybko, wysoce wydajny i lekki a utrzymuje go główny zespół Grandine. Odpowiada na potrzeby wszystkich stakujących — od stakujących solo na urządzeniach o niskich zasobach takich jak Raspberry Pi aż do dużych instytucjonalnych stakujących, którzy utrzymują tysiące walidatorów.

Dokumentację można znaleźć w [Księdze Grandine](https://docs.grandine.io/)

## Tryby synchronizacji {#sync-modes}

Aby śledzić i sprawdzać aktualne dane w sieci, klient Ethereum musi synchronizować się z najnowszym stanem sieci. Odbywa się to poprzez pobieranie danych z węzłów równorzędnych, kryptograficzną weryfikację ich integralności i budowanie lokalnej bazy danych blockchain.

Tryby synchronizacji reprezentują różne podejścia do tego procesu z różnymi kompromisami. Klienci różnią się także pod względem implementacji algorytmów synchronizacji. Szczegółowe informacje na temat implementacji można znaleźć w oficjalnej dokumentacji wybranego klienta.

### Tryby synchronizacji warstwy wykonawczej {#execution-layer-sync-modes}

Warstwa wykonawcza może być uruchomiona w różnych trybach, aby dopasować się do różnych przypadków użycia, od ponownego wykonania stanu blockchainu do synchronizowania tylko początku łańcucha od zaufanego punktu kontrolnego.

#### Pełna synchronizacja {#full-sync}

Pełna synchronizacja pobiera wszystkie bloki (w tym nagłówki i treści bloku) i generuje ponownie stan blockchainu przyrostowo, wykonując każdy blok od genezy.

- Minimalizuje zaufanie i zapewnia najwyższe bezpieczeństwo, weryfikując każdą transakcję.
- Przy rosnącej liczbie transakcji przetworzenie wszystkich transakcji może zająć od kilku dni do kilku tygodni.

[Węzły archiwalne](#archive-node) wykonują pełną synchronizację, aby zbudować (i zachować) pełną historię zmian stanu dokonanych przez każdą transakcję w każdym bloku.

#### Szybka synchronizacja {#fast-sync}

Podobnie jak w przypadku pełnej synchronizacji, szybka synchronizacja pobiera wszystkie bloki (w tym nagłówki, transakcję i potwierdzenia). Zamiast jednak odtwarzać historyczne transakcje, szybka synchronizacja opiera się na potwierdzeniach, dopóki nie dotrze do samego początku, kiedy to przełącza się na importowanie oraz przetwarzanie bloków, aby zapewnić pełny węzeł.

- Strategia szybkiej synchronizacji.
- Zmniejsza zapotrzebowanie na przetwarzanie na rzecz wykorzystania przepustowości.

#### Synchronizacja snap {#snap-sync}

Synchronizacje snap również weryfikują łańcuch blok po bloku. Jednak, zamiast zaczynać od bloku genezy, synchronizacja snap zaczyna od nowszego „zaufanego” punktu kontrolnego, który wiadomo, że jest częścią prawdziwego blockchainu. Węzeł zapisuje okresowe punkty kontrolne, usuwając dane starsze od określonego wieku. Te migawki zostają użyte do regeneracji danych stanu w razie potrzeby, zamiast przechowywania ich w nieskończoność.

- Najszybsza strategia synchronizacji, obecnie domyślna w sieci głównej Ethereum.
- Oszczędza wiele miejsca na dysku i przepustowości sieci bez poświęcania bezpieczeństwa.

[Więcej o synchronizacji snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Lekka synchronizacja {#light-sync}

W trybie lekkiego klienta pobierane są wszystkie nagłówki bloków, dane bloków i niektóre są sprawdzane losowo. Synchronizuje tylko końcówkę łańcucha z zaufanego punktu kontrolnego.

- Pobiera tylko najnowszy stan, opierając się na zaufaniu do deweloperów i mechanizmie konsensusu.
- Klient gotowy do użycia z bieżącym stanem sieci w ciągu kilku minut.

**Uwaga**: Lekka synchronizacja nie działa jeszcze z Ethereum w wersji z dowodem stawki – nowe wersje lekkiej synchronizacji powinny pojawić się wkrótce!

[Więcej o lekkich klientach](/developers/docs/nodes-and-clients/light-clients/)

### Tryby synchronizacji warstwy konsensusu {#consensus-layer-sync-modes}

#### Synchronizacja optymistyczna {#optimistic-sync}

Synchronizacja optymistyczna to strategia synchronizacji po Połączeniu, zaprojektowana jako możliwa do wybrania i zgodna wstecz, pozwalająca węzłom wykonania na synchronizację za pomocą ustalonych metod. Silnik wykonawczy może _optymistycznie_ importować bloki beacon bez ich pełnej weryfikacji, znajdować najnowszą głowicę, a następnie rozpocząć synchronizację łańcucha za pomocą powyższych metod. Następnie, gdy klient wykonania nadrobi zaległości, poinformuje klienta konsensusu o ważności transakcji w łańcuchu śledzącym.

[Więcej o synchronizacji optymistycznej](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Synchronizacja z punktu kontrolnego {#checkpoint-sync}

Synchronizacja punktów kontrolnych, znana także jako synchronizacja ze słabą podmiotowością, zapewnia użytkownikowi lepsze wrażenia z synchronizacji węzła śledzącego. Opiera się na założeniach o [słabej subiektywności](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/), co umożliwia synchronizację Łańcucha Śledzącego z ostatniego punktu kontrolnego słabej subiektywności, a nie od genezy. Synchronizacje z punktu kontrolnego znacznie skracają czas początkowej synchronizacji przy podobnych założeniach dotyczących zaufania, jak w przypadku synchronizacji od [bloku genezy](/glossary/#genesis-block).

W praktyce oznacza to, że węzeł łączy się z usługą zdalną, aby pobrać ostatnie sfinalizowane stany, i kontynuuje weryfikację danych od tego punktu. Stronie trzeciej dostarczającej danych trzeba zaufać i należy ją starannie wybrać.

[Więcej o synchronizacji z punktu kontrolnego](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Dalsza lektura {#further-reading}

- [Ethereum 101 – część 2 – Zrozumieć węzły](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 lutego 2019_
- [Uruchamianie pełnych węzłów Ethereum: przewodnik dla słabo zmotywowanych](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 listopada 2019_

## Powiązane tematy {#related-topics}

- [Bloki](/developers/docs/blocks/)
- [Sieci](/developers/docs/networks/)

## Powiązane samouczki {#related-tutorials}

- [Zamień swoje Raspberry Pi 4 w węzeł walidatorski poprzez wgranie obrazu na kartę MicroSD – instrukcja instalacji](/developers/tutorials/run-node-raspberry-pi/) _– Sporządź obraz urządzenia Raspberry Pi 4, podłącz kabel Ethernet, podłącz dysk SSD i włącz urządzenie, aby zamienić Raspberry Pi 4 w pełnoprawny węzeł Ethereum działający w warstwie wykonawczej (sieci głównej) i/lub warstwie konsensusu (Łańcuch śledzący / walidator)._
