---
title: Węzły i klienty
description: Przegląd węzłów Ethereum i oprogramowania klienckiego, a także informacje o tym, jak skonfigurować węzeł i dlaczego warto to zrobić.
lang: pl
sidebarDepth: 2
---

[Ethereum](/) to rozproszona sieć komputerów (znanych jako węzły) z uruchomionym oprogramowaniem, które może weryfikować bloki i dane transakcji. Oprogramowanie to musi zostać uruchomione na Twoim komputerze, aby przekształcić go w węzeł Ethereum. Do utworzenia węzła wymagane są dwa oddzielne programy (znane jako „klienty”).

## Wymagania wstępne {#prerequisites}

Zanim zagłębisz się w temat i uruchomisz własną instancję klienta Ethereum, powinieneś zrozumieć koncepcję sieci peer-to-peer oraz [podstawy EVM](/developers/docs/evm/). Zapoznaj się z naszym [wprowadzeniem do Ethereum](/developers/docs/intro-to-ethereum/).

Jeśli jesteś nowy w temacie węzłów, zalecamy najpierw zapoznać się z naszym przystępnym wprowadzeniem na temat [uruchamiania węzła Ethereum](/run-a-node).

## Czym są węzły i klienty? {#what-are-nodes-and-clients}

„Węzeł” to dowolna instancja oprogramowania klienckiego Ethereum, która jest połączona z innymi komputerami również z uruchomionym oprogramowaniem Ethereum, tworząc sieć. Klient to implementacja Ethereum, która weryfikuje dane zgodnie z zasadami protokołu i dba o bezpieczeństwo sieci. Węzeł musi uruchamiać dwa klienty: klienta konsensusu i klienta warstwy wykonawczej.

- Klient warstwy wykonawczej (znany również jako silnik wykonawczy, klient EL lub dawniej klient Eth1) nasłuchuje nowych transakcji rozgłaszanych w sieci, wykonuje je w EVM i przechowuje najnowszy stan oraz bazę danych wszystkich bieżących danych Ethereum.
- Klient konsensusu (znany również jako węzeł Beacon, klient CL lub dawniej klient Eth2) implementuje algorytm konsensusu dowodu stawki (PoS), który umożliwia sieci osiągnięcie porozumienia na podstawie zweryfikowanych danych od klienta warstwy wykonawczej. Istnieje również trzeci element oprogramowania, znany jako „walidator”, który można dodać do klienta konsensusu, co pozwala węzłowi uczestniczyć w zabezpieczaniu sieci.

Te klienty współpracują ze sobą, aby śledzić szczyt łańcucha Ethereum i umożliwiać użytkownikom interakcję z siecią Ethereum. Modułowa konstrukcja z wieloma współpracującymi ze sobą elementami oprogramowania nazywana jest [hermetyzacją złożoności](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Takie podejście ułatwiło płynne przeprowadzenie [The Merge](/roadmap/merge), sprawia, że oprogramowanie klienckie jest łatwiejsze w utrzymaniu i rozwoju, a także umożliwia ponowne wykorzystanie poszczególnych klientów, na przykład w [ekosystemie warstwy 2 (L2)](/layer-2/).

![Coupled execution and consensus clients](./eth1eth2client.png)
Uproszczony schemat połączonego klienta warstwy wykonawczej i konsensusu.

### Różnorodność klientów {#client-diversity}

Zarówno [klienty warstwy wykonawczej](/developers/docs/nodes-and-clients/#execution-clients), jak i [klienty konsensusu](/developers/docs/nodes-and-clients/#consensus-clients) istnieją w różnych językach programowania i są rozwijane przez różne zespoły.

Wiele implementacji klientów może wzmocnić sieć, zmniejszając jej zależność od pojedynczej bazy kodu. Idealnym celem jest osiągnięcie różnorodności bez dominacji żadnego klienta w sieci, co eliminuje potencjalny pojedynczy punkt awarii.
Różnorodność języków przyciąga również szerszą społeczność programistów i pozwala im tworzyć integracje w preferowanym przez nich języku.

Dowiedz się więcej o [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity/).

Tym, co łączy te implementacje, jest to, że wszystkie opierają się na jednej specyfikacji. Specyfikacje dyktują, jak funkcjonuje sieć i blockchain Ethereum. Każdy szczegół techniczny jest zdefiniowany, a specyfikacje można znaleźć jako:

- Pierwotnie [żółta księga Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Specyfikacje warstwy wykonawczej](https://github.com/ethereum/execution-specs/)
- [Specyfikacje konsensusu](https://github.com/ethereum/consensus-specs)
- [EIP](https://eips.ethereum.org/) zaimplementowane w różnych [aktualizacjach sieci](/ethereum-forks/)

### Śledzenie węzłów w sieci {#network-overview}

Wiele narzędzi śledzących oferuje przegląd węzłów w sieci Ethereum w czasie rzeczywistym. Należy pamiętać, że ze względu na naturę zdecentralizowanych sieci, te roboty indeksujące mogą zapewnić jedynie ograniczony widok sieci i mogą zgłaszać różne wyniki.

- [Mapa węzłów](https://etherscan.io/nodetracker) od Etherscan
- [Ethernodes](https://ethernodes.org/) od Bitfly
- [Nodewatch](https://www.nodewatch.io/) od Chainsafe, indeksujący węzły konsensusu
- [Monitoreth](https://monitoreth.io/) – od MigaLabs, rozproszone narzędzie do monitorowania sieci
- [Cotygodniowe raporty o stanie sieci](https://probelab.io) – od ProbeLab, wykorzystujące [robota indeksującego Nebula](https://github.com/dennis-tra/nebula) i inne narzędzia

## Typy węzłów {#node-types}

Jeśli chcesz [uruchomić własny węzeł](/developers/docs/nodes-and-clients/run-a-node/), powinieneś zrozumieć, że istnieją różne typy węzłów, które w różny sposób konsumują dane. W rzeczywistości klienty mogą uruchamiać trzy różne typy węzłów: lekkie, pełne i archiwalne. Istnieją również opcje różnych strategii synchronizacji, które umożliwiają szybszy czas synchronizacji. Synchronizacja odnosi się do tego, jak szybko węzeł może uzyskać najbardziej aktualne informacje o stanie Ethereum.

### Pełny węzeł {#full-node}

Pełne węzły przeprowadzają walidację blockchaina blok po bloku, w tym pobieranie i weryfikację zawartości bloku oraz danych stanu dla każdego bloku. Istnieją różne klasy pełnych węzłów – niektóre zaczynają od bloku genezy i weryfikują każdy pojedynczy blok w całej historii blockchaina. Inne rozpoczynają weryfikację od nowszego bloku, któremu ufają, że jest prawidłowy (np. „snap sync” w Geth). Niezależnie od tego, gdzie rozpoczyna się weryfikacja, pełne węzły przechowują tylko lokalną kopię stosunkowo nowych danych (zazwyczaj 128 najnowszych bloków), co pozwala na usunięcie starszych danych w celu zaoszczędzenia miejsca na dysku. Starsze dane mogą zostać wygenerowane ponownie, gdy będą potrzebne.

- Przechowuje pełne dane blockchaina (chociaż są one okresowo przycinane, więc pełny węzeł nie przechowuje wszystkich danych stanu aż do genezy).
- Uczestniczy w walidacji bloku, weryfikuje wszystkie bloki i stany.
- Wszystkie stany mogą być pobrane z pamięci lokalnej lub wygenerowane ponownie z „migawek” przez pełny węzeł.
- Obsługuje sieć i dostarcza dane na żądanie.

### Węzeł archiwalny {#archive-node}

Węzły archiwalne to pełne węzły, które weryfikują każdy blok od genezy i nigdy nie usuwają żadnych pobranych danych.

- Przechowuje wszystko to, co pełny węzeł, i buduje archiwum stanów historycznych. Jest to potrzebne, jeśli chcesz sprawdzić na przykład saldo konta w bloku nr 4 000 000 lub po prostu i niezawodnie przetestować własny zestaw transakcji bez ich walidacji za pomocą śledzenia.
- Dane te zajmują terabajty, co sprawia, że węzły archiwalne są mniej atrakcyjne dla przeciętnych użytkowników, ale mogą być przydatne dla usług takich jak eksploratory bloków, dostawcy portfeli i analityka łańcucha.

Synchronizacja klientów w dowolnym trybie innym niż archiwalny spowoduje przycięcie danych blockchaina. Oznacza to, że nie ma archiwum wszystkich stanów historycznych, ale pełny węzeł jest w stanie zbudować je na żądanie.

Dowiedz się więcej o [węzłach archiwalnych](/developers/docs/nodes-and-clients/archive-nodes).

### Lekki węzeł {#light-node}

Zamiast pobierać każdy blok, lekkie węzły pobierają tylko nagłówki bloków. Nagłówki te zawierają podsumowanie informacji o zawartości bloków. Wszelkie inne informacje, których potrzebuje lekki węzeł, są żądane od pełnego węzła. Lekki węzeł może następnie niezależnie zweryfikować otrzymane dane w oparciu o korzenie stanu w nagłówkach bloków. Lekkie węzły umożliwiają użytkownikom uczestnictwo w sieci Ethereum bez potężnego sprzętu lub dużej przepustowości wymaganej do uruchomienia pełnych węzłów. Docelowo lekkie węzły mogą działać na telefonach komórkowych lub urządzeniach wbudowanych. Lekkie węzły nie uczestniczą w konsensusie (tj. nie mogą być walidatorami), ale mogą uzyskać dostęp do blockchaina Ethereum z taką samą funkcjonalnością i gwarancjami bezpieczeństwa jak pełny węzeł.

Lekkie klienty to obszar aktywnego rozwoju Ethereum i spodziewamy się wkrótce zobaczyć nowe lekkie klienty dla warstwy konsensusu i warstwy wykonawczej.
Istnieją również potencjalne ścieżki dostarczania danych lekkich klientów przez [sieć plotkarską (gossip network)](https://www.ethportal.net/). Jest to korzystne, ponieważ sieć plotkarska mogłaby obsługiwać sieć lekkich węzłów bez konieczności obsługi żądań przez pełne węzły.

Ethereum nie obsługuje jeszcze dużej populacji lekkich węzłów, ale wsparcie dla lekkich węzłów to obszar, który ma się szybko rozwijać w niedalekiej przyszłości. W szczególności klienty takie jak [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) i [Lodestar](https://lodestar.chainsafe.io/) są obecnie mocno skoncentrowane na lekkich węzłach.

## Dlaczego powinienem uruchomić węzeł Ethereum? {#why-should-i-run-an-ethereum-node}

Uruchomienie węzła pozwala na bezpośrednie, niewymagające zaufania i prywatne korzystanie z Ethereum, jednocześnie wspierając sieć poprzez utrzymywanie jej bardziej solidnej i zdecentralizowanej.

### Korzyści dla Ciebie {#benefits-to-you}

Uruchomienie własnego węzła umożliwia korzystanie z Ethereum w sposób prywatny, samowystarczalny i niewymagający zaufania. Nie musisz ufać sieci, ponieważ możesz samodzielnie zweryfikować dane za pomocą swojego klienta. „Nie ufaj, weryfikuj” to popularna mantra w świecie blockchaina.

- Twój węzeł samodzielnie weryfikuje wszystkie transakcje i bloki zgodnie z zasadami konsensusu. Oznacza to, że nie musisz polegać na żadnych innych węzłach w sieci ani w pełni im ufać.
- Możesz używać portfela Ethereum z własnym węzłem. Możesz korzystać ze zdecentralizowanych aplikacji (dapp) bezpieczniej i bardziej prywatnie, ponieważ nie będziesz musiał ujawniać swoich adresów i sald pośrednikom. Wszystko można sprawdzić za pomocą własnego klienta. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) i [wiele innych portfeli](/wallets/find-wallet/) oferuje importowanie RPC, co pozwala im na korzystanie z Twojego węzła.
- Możesz uruchamiać i samodzielnie hostować inne usługi, które zależą od danych z Ethereum. Na przykład może to być walidator Beacon Chain, oprogramowanie takie jak warstwa 2 (L2), infrastruktura, eksploratory bloków, procesory płatności itp.
- Możesz udostępniać własne, niestandardowe [punkty końcowe RPC](/developers/docs/apis/json-rpc/). Możesz nawet zaoferować te punkty końcowe publicznie społeczności, aby pomóc im uniknąć dużych, scentralizowanych dostawców.
- Możesz połączyć się ze swoim węzłem za pomocą **komunikacji międzyprocesowej (IPC)** lub przepisać węzeł, aby załadować swój program jako wtyczkę. Zapewnia to niskie opóźnienia, co bardzo pomaga, np. podczas przetwarzania dużej ilości danych przy użyciu bibliotek Web3 lub gdy musisz jak najszybciej zastąpić swoje transakcje (tj. frontrunning).
- Możesz bezpośrednio stakować ETH, aby zabezpieczyć sieć i zdobywać nagrody. Zobacz [staking solo](/staking/solo/), aby zacząć.

![How you access Ethereum via your application and nodes](./nodes.png)

### Korzyści dla sieci {#network-benefits}

Zróżnicowany zestaw węzłów jest ważny dla kondycji, bezpieczeństwa i odporności operacyjnej Ethereum.

- Pełne węzły egzekwują zasady konsensusu, więc nie można ich oszukać, aby zaakceptowały bloki, które ich nie przestrzegają. Zapewnia to dodatkowe bezpieczeństwo w sieci, ponieważ gdyby wszystkie węzły były lekkimi węzłami, które nie przeprowadzają pełnej weryfikacji, walidatory mogłyby zaatakować sieć.
- W przypadku ataku, który pokona kryptoekonomiczne mechanizmy obronne [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos), pełne węzły mogą przeprowadzić odzyskiwanie społecznościowe, decydując się na podążanie za uczciwym łańcuchem.
- Większa liczba węzłów w sieci skutkuje bardziej zróżnicowaną i solidną siecią, co jest ostatecznym celem decentralizacji, umożliwiającym stworzenie niezawodnego systemu odpornego na cenzurę.
- Pełne węzły zapewniają dostęp do danych blockchaina dla lekkich klientów, które od nich zależą. Lekkie węzły nie przechowują całego blockchaina, zamiast tego weryfikują dane za pomocą [korzeni stanu w nagłówkach bloków](/developers/docs/blocks/#block-anatomy). W razie potrzeby mogą zażądać więcej informacji od pełnych węzłów.

Jeśli uruchomisz pełny węzeł, skorzysta na tym cała sieć Ethereum, nawet jeśli nie uruchomisz walidatora.

## Uruchamianie własnego węzła {#running-your-own-node}

Jesteś zainteresowany uruchomieniem własnego klienta Ethereum?

Aby uzyskać przyjazne dla początkujących wprowadzenie, odwiedź naszą stronę [uruchom węzeł](/run-a-node), aby dowiedzieć się więcej.

Jeśli jesteś bardziej zaawansowanym technicznie użytkownikiem, zagłęb się w szczegóły i opcje dotyczące tego, jak [postawić własny węzeł](/developers/docs/nodes-and-clients/run-a-node/).

## Alternatywy {#alternatives}

Konfiguracja własnego węzła może kosztować Cię czas i zasoby, ale nie zawsze musisz uruchamiać własną instancję. W takim przypadku możesz skorzystać z usług zewnętrznego dostawcy API. Aby zapoznać się z przeglądem korzystania z tych usług, sprawdź [węzły jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Jeśli ktoś w Twojej społeczności prowadzi węzeł Ethereum z publicznym API, możesz skierować swoje portfele do węzła społecznościowego za pośrednictwem niestandardowego RPC i zyskać większą prywatność niż w przypadku jakiejś losowej, zaufanej strony trzeciej.

Z drugiej strony, jeśli uruchomisz klienta, możesz udostępnić go znajomym, którzy mogą go potrzebować.

## Klienty warstwy wykonawczej {#execution-clients}

Społeczność Ethereum utrzymuje wiele klientów warstwy wykonawczej o otwartym kodzie źródłowym (wcześniej znanych jako „klienty Eth1” lub po prostu „klienty Ethereum”), rozwijanych przez różne zespoły przy użyciu różnych języków programowania. Dzięki temu sieć jest silniejsza i bardziej [zróżnicowana](/developers/docs/nodes-and-clients/client-diversity/). Idealnym celem jest osiągnięcie różnorodności bez dominacji żadnego klienta, aby zredukować pojedyncze punkty awarii.

Poniższa tabela podsumowuje różne klienty. Wszystkie z nich przechodzą [testy klientów](https://github.com/ethereum/tests) i są aktywnie utrzymywane, aby być na bieżąco z aktualizacjami sieci.

| Klient                                                                   | Język      | Systemy operacyjne    | Sieci                   | Strategie synchronizacji                                   | Przycinanie stanu    |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | -------------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Sieć główna, Sepolia, Hoodi | [Snap](#snap-sync), [Pełna](#full-sync)                     | Archiwalny, Przycięty |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Sieć główna, Sepolia, Hoodi | [Snap](#snap-sync), Szybka, [Pełna](#full-sync)               | Archiwalny, Przycięty |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Sieć główna, Sepolia, Hoodi | [Snap](#snap-sync), [Szybka](#fast-sync), [Pełna](#full-sync) | Archiwalny, Przycięty |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Sieć główna, Sepolia, Hoodi | [Pełna](#full-sync)                                         | Archiwalny, Przycięty |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Sieć główna, Sepolia, Hoodi | [Pełna](#full-sync)                                         | Archiwalny, Przycięty |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [Pełna](#full-sync)                                         | Przycięty            |

Aby dowiedzieć się więcej o obsługiwanych sieciach, przeczytaj o [sieciach Ethereum](/developers/docs/networks/).

Każdy klient ma unikalne przypadki użycia i zalety, więc powinieneś wybrać jeden w oparciu o własne preferencje. Różnorodność pozwala implementacjom skupić się na różnych funkcjach i grupach odbiorców. Możesz chcieć wybrać klienta na podstawie funkcji, wsparcia, języka programowania lub licencji.

### Besu {#besu}

Hyperledger Besu to klient Ethereum klasy korporacyjnej dla sieci publicznych i wymagających zezwolenia. Obsługuje wszystkie funkcje sieci głównej Ethereum, od śledzenia po GraphQL, ma rozbudowane monitorowanie i jest wspierany przez ConsenSys, zarówno w otwartych kanałach społecznościowych, jak i poprzez komercyjne umowy SLA dla przedsiębiorstw. Jest napisany w języku Java i udostępniany na licencji Apache-2.0.

Obszerna [dokumentacja](https://besu.hyperledger.org/en/stable/) Besu poprowadzi Cię przez wszystkie szczegóły dotyczące jego funkcji i konfiguracji.

### Erigon {#erigon}

Erigon, wcześniej znany jako Turbo-Geth, rozpoczął się jako rozwidlenie Go Ethereum zorientowane na szybkość i wydajność przestrzeni dyskowej. Erigon to całkowicie przeprojektowana implementacja Ethereum, obecnie napisana w języku Go, ale z implementacjami w innych językach w fazie rozwoju. Celem Erigon jest zapewnienie szybszej, bardziej modułowej i zoptymalizowanej implementacji Ethereum. Może wykonać pełną synchronizację węzła archiwalnego przy użyciu około 2 TB przestrzeni dyskowej w czasie poniżej 3 dni.

### Go Ethereum {#geth}

Go Ethereum (w skrócie Geth) to jedna z oryginalnych implementacji protokołu Ethereum. Obecnie jest to najbardziej rozpowszechniony klient z największą bazą użytkowników i różnorodnością narzędzi dla użytkowników i programistów. Jest napisany w języku Go, w pełni open source i licencjonowany na warunkach GNU LGPL v3.

Dowiedz się więcej o Geth w jego [dokumentacji](https://geth.ethereum.org/docs).

### Nethermind {#nethermind}

Nethermind to implementacja Ethereum stworzona przy użyciu stosu technologicznego C# .NET, licencjonowana na warunkach LGPL-3.0, działająca na wszystkich głównych platformach, w tym ARM. Oferuje doskonałą wydajność dzięki:

- zoptymalizowanej maszynie wirtualnej
- dostępowi do stanu
- obsłudze sieci i bogatym funkcjom, takim jak pulpity nawigacyjne Prometheus/Grafana, obsługa logowania korporacyjnego seq, śledzenie JSON-RPC i wtyczki analityczne.

Nethermind posiada również [szczegółową dokumentację](https://docs.nethermind.io), silne wsparcie dla programistów, społeczność online i całodobowe wsparcie dostępne dla użytkowników premium.

### Reth {#reth}

Reth (skrót od Rust Ethereum) to implementacja pełnego węzła Ethereum, która koncentruje się na byciu przyjazną dla użytkownika, wysoce modułową, szybką i wydajną. Reth został pierwotnie zbudowany i rozwijany przez Paradigm i jest licencjonowany na warunkach licencji Apache i MIT.

Reth jest gotowy do produkcji i nadaje się do użytku w środowiskach o znaczeniu krytycznym, takich jak staking lub usługi o wysokiej dostępności. Sprawdza się w przypadkach użycia, w których wymagana jest wysoka wydajność z dużymi marginesami, takich jak RPC, MEV, indeksowanie, symulacje i działania P2P.

Dowiedz się więcej, sprawdzając [Reth Book](https://reth.rs/) lub [repozytorium Reth na GitHubie](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### W fazie rozwoju {#execution-in-development}

Te klienty są nadal we wczesnych fazach rozwoju i nie są jeszcze zalecane do użytku produkcyjnego.

#### EthereumJS {#ethereumjs}

Klient warstwy wykonawczej EthereumJS (EthereumJS) jest napisany w języku TypeScript i składa się z wielu pakietów, w tym podstawowych prymitywów Ethereum reprezentowanych przez klasy Block, Transaction i Merkle-Patricia Trie oraz podstawowych komponentów klienta, w tym implementacji maszyny wirtualnej Ethereum (EVM), klasy blockchain i stosu sieciowego devp2p.

Dowiedz się więcej na ten temat, czytając jego [dokumentację](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## Klienty konsensusu {#consensus-clients}

Istnieje wiele klientów konsensusu (wcześniej znanych jako klienty „Eth2”) wspierających [aktualizacje konsensusu](/roadmap/beacon-chain/). Są one odpowiedzialne za całą logikę związaną z konsensusem, w tym algorytm wyboru rozwidlenia, przetwarzanie atestacji oraz zarządzanie nagrodami i karami w ramach [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos).

| Klient                                                        | Język      | Systemy operacyjne    | Sieci                                                   |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Pyrmont, Sepolia i inne            |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia i inne                     |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia i inne                     |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Pyrmont, Sepolia i inne    |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Hoodi, Sepolia i inne             |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Beacon Chain, Hoodi, Sepolia i inne                     |

### Lighthouse {#lighthouse}

Lighthouse to implementacja klienta konsensusu napisana w języku Rust na licencji Apache-2.0. Jest utrzymywana przez Sigma Prime i jest stabilna oraz gotowa do produkcji od czasu genezy Beacon Chain. Polegają na niej różne przedsiębiorstwa, pule stakingowe i osoby prywatne. Jej celem jest zapewnienie bezpieczeństwa, wydajności i interoperacyjności w szerokim zakresie środowisk, od komputerów stacjonarnych po zaawansowane zautomatyzowane wdrożenia.

Dokumentację można znaleźć w [Lighthouse Book](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar to gotowa do produkcji implementacja klienta konsensusu napisana w języku TypeScript na licencji LGPL-3.0. Jest utrzymywana przez ChainSafe Systems i jest najnowszym z klientów konsensusu dla osób stakujących solo, programistów i badaczy. Lodestar składa się z węzła Beacon i klienta walidatora zasilanych przez implementacje protokołów Ethereum w języku JavaScript. Lodestar ma na celu poprawę użyteczności Ethereum dzięki lekkim klientom, rozszerzenie dostępności dla większej grupy programistów i dalsze przyczynianie się do różnorodności ekosystemu.

Więcej informacji można znaleźć na [stronie internetowej Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus to implementacja klienta konsensusu napisana w języku Nim na licencji Apache-2.0. Jest to gotowy do produkcji klient używany przez osoby stakujące solo i pule stakingowe. Nimbus został zaprojektowany z myślą o oszczędności zasobów, co ułatwia jego uruchamianie na urządzeniach o ograniczonych zasobach i infrastrukturze korporacyjnej z równą łatwością, bez uszczerbku dla stabilności lub wydajności nagród. Mniejsze zużycie zasobów oznacza, że klient ma większy margines bezpieczeństwa, gdy sieć jest obciążona.

Dowiedz się więcej w [dokumentacji Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm to w pełni funkcjonalny klient konsensusu o otwartym kodzie źródłowym napisany w języku Go na licencji GPL-3.0. Posiada opcjonalny interfejs użytkownika aplikacji internetowej i priorytetowo traktuje doświadczenie użytkownika, dokumentację oraz możliwości konfiguracji zarówno dla użytkowników stakujących w domu, jak i instytucjonalnych.

Odwiedź [dokumentację Prysm](https://prysm.offchainlabs.com/docs/), aby dowiedzieć się więcej.

### Teku {#teku}

Teku to jeden z oryginalnych klientów genezy Beacon Chain. Oprócz standardowych celów (bezpieczeństwo, solidność, stabilność, użyteczność, wydajność), Teku ma na celu pełną zgodność ze wszystkimi różnymi standardami klientów konsensusu.

Teku oferuje bardzo elastyczne opcje wdrożenia. Węzeł Beacon i klient walidatora mogą być uruchamiane razem jako pojedynczy proces, co jest niezwykle wygodne dla osób stakujących solo, lub węzły mogą być uruchamiane oddzielnie w przypadku zaawansowanych operacji stakingowych. Ponadto Teku jest w pełni interoperacyjny z [Web3Signer](https://github.com/ConsenSys/web3signer/) w celu zapewnienia bezpieczeństwa klucza podpisywania i ochrony przed cięciem (slashing).

Teku jest napisany w języku Java i udostępniany na licencji Apache-2.0. Jest rozwijany przez zespół Protocols w ConsenSys, który jest również odpowiedzialny za Besu i Web3Signer. Dowiedz się więcej w [dokumentacji Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine to implementacja klienta konsensusu, napisana w języku Rust na licencji GPL-3.0. Jest utrzymywana przez Grandine Core Team i jest szybka, wysoce wydajna i lekka. Pasuje do szerokiego grona stakujących, od osób stakujących solo na urządzeniach o niskich zasobach, takich jak Raspberry Pi, po dużych stakujących instytucjonalnych obsługujących dziesiątki tysięcy walidatorów.

Dokumentację można znaleźć w [Grandine Book](https://docs.grandine.io/)

## Tryby synchronizacji {#sync-modes}

Aby śledzić i weryfikować bieżące dane w sieci, klient Ethereum musi zsynchronizować się z najnowszym stanem sieci. Odbywa się to poprzez pobieranie danych od węzłów równorzędnych (peers), kryptograficzną weryfikację ich integralności i budowanie lokalnej bazy danych blockchaina.

Tryby synchronizacji reprezentują różne podejścia do tego procesu z różnymi kompromisami. Klienty różnią się również implementacją algorytmów synchronizacji. Zawsze odwołuj się do oficjalnej dokumentacji wybranego klienta, aby uzyskać szczegółowe informacje na temat implementacji.

### Tryby synchronizacji warstwy wykonawczej {#execution-layer-sync-modes}

Warstwa wykonawcza może być uruchamiana w różnych trybach, aby dopasować się do różnych przypadków użycia, od ponownego wykonania stanu świata blockchaina po synchronizację tylko ze szczytem łańcucha z zaufanego punktu kontrolnego.

#### Pełna synchronizacja {#full-sync}

Pełna synchronizacja pobiera wszystkie bloki (w tym nagłówki i zawartość bloków) i przywraca stan blockchaina przyrostowo, wykonując każdy blok od genezy.

- Minimalizuje zaufanie i oferuje najwyższe bezpieczeństwo poprzez weryfikację każdej transakcji.
- Wraz z rosnącą liczbą transakcji przetwarzanie wszystkich transakcji może zająć od kilku dni do kilku tygodni.

[Węzły archiwalne](#archive-node) wykonują pełną synchronizację, aby zbudować (i zachować) pełną historię zmian stanu wprowadzonych przez każdą transakcję w każdym bloku.

#### Szybka synchronizacja {#fast-sync}

Podobnie jak pełna synchronizacja, szybka synchronizacja pobiera wszystkie bloki (w tym nagłówki, transakcje i paragony). Jednak zamiast ponownie przetwarzać historyczne transakcje, szybka synchronizacja opiera się na paragonach, dopóki nie osiągnie najnowszego szczytu, kiedy to przełącza się na importowanie i przetwarzanie bloków, aby zapewnić pełny węzeł.

- Strategia szybkiej synchronizacji.
- Zmniejsza zapotrzebowanie na przetwarzanie na rzecz wykorzystania przepustowości.

#### Synchronizacja Snap {#snap-sync}

Synchronizacja Snap również weryfikuje łańcuch blok po bloku. Jednak zamiast zaczynać od bloku genezy, synchronizacja Snap rozpoczyna się od nowszego „zaufanego” punktu kontrolnego, o którym wiadomo, że jest częścią prawdziwego blockchaina. Węzeł zapisuje okresowe punkty kontrolne, usuwając dane starsze niż określony wiek. Te migawki są używane do ponownego generowania danych stanu w razie potrzeby, zamiast przechowywać je na zawsze.

- Najszybsza strategia synchronizacji, obecnie domyślna w sieci głównej Ethereum.
- Oszczędza dużo miejsca na dysku i przepustowości sieci bez poświęcania bezpieczeństwa.

[Więcej o synchronizacji Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Lekka synchronizacja {#light-sync}

Tryb lekkiego klienta pobiera wszystkie nagłówki bloków, dane bloków i weryfikuje niektóre z nich losowo. Synchronizuje tylko szczyt łańcucha z zaufanego punktu kontrolnego.

- Pobiera tylko najnowszy stan, polegając na zaufaniu do programistów i mechanizmu konsensusu.
- Klient gotowy do użycia z bieżącym stanem sieci w ciągu kilku minut.

**Uwaga:** Lekka synchronizacja nie działa jeszcze z Ethereum opartym na dowodzie stawki (PoS) – nowe wersje lekkiej synchronizacji powinny pojawić się wkrótce!

[Więcej o lekkich klientach](/developers/docs/nodes-and-clients/light-clients/)

### Tryby synchronizacji warstwy konsensusu {#consensus-layer-sync-modes}

#### Optymistyczna synchronizacja {#optimistic-sync}

Optymistyczna synchronizacja to strategia synchronizacji po The Merge, zaprojektowana jako opcjonalna i wstecznie kompatybilna, umożliwiająca węzłom warstwy wykonawczej synchronizację za pomocą ustalonych metod. Silnik wykonawczy może _optymistycznie_ importować bloki Beacon bez ich pełnej weryfikacji, znaleźć najnowszy szczyt, a następnie rozpocząć synchronizację łańcucha za pomocą powyższych metod. Następnie, po tym jak klient warstwy wykonawczej nadrobi zaległości, poinformuje klienta konsensusu o ważności transakcji w Beacon Chain.

[Więcej o optymistycznej synchronizacji](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### Synchronizacja punktu kontrolnego {#checkpoint-sync}

Synchronizacja punktu kontrolnego, znana również jako synchronizacja słabej subiektywności, zapewnia doskonałe wrażenia użytkownika podczas synchronizacji węzła Beacon. Opiera się na założeniach [słabej subiektywności](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/), co umożliwia synchronizację Beacon Chain z niedawnego punktu kontrolnego słabej subiektywności zamiast z genezy. Synchronizacja punktu kontrolnego znacznie przyspiesza początkowy czas synchronizacji przy podobnych założeniach dotyczących zaufania, jak w przypadku synchronizacji z [genezy](/glossary/#genesis-block).

W praktyce oznacza to, że Twój węzeł łączy się ze zdalną usługą w celu pobrania ostatnich sfinalizowanych stanów i kontynuuje weryfikację danych od tego momentu. Strona trzecia dostarczająca dane jest zaufana i powinna być starannie wybrana.

Więcej o [synchronizacji punktu kontrolnego](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Dalsza lektura {#further-reading}

- [Ethereum 101 – Część 2 – Zrozumienie węzłów](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 lutego 2019 r._
- [Uruchamianie pełnych węzłów Ethereum: Przewodnik dla ledwo zmotywowanych](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 listopada 2019 r._

## Powiązane tematy {#related-topics}

- [Bloki](/developers/docs/blocks/)
- [Sieci](/developers/docs/networks/)

## Powiązane samouczki {#related-tutorials}

- [Zmień swoje Raspberry Pi 4 w węzeł walidatora po prostu flashując kartę MicroSD – Przewodnik instalacji](/developers/tutorials/run-node-raspberry-pi/) _– Sflashuj swoje Raspberry Pi 4, podłącz kabel Ethernet, podłącz dysk SSD i włącz urządzenie, aby zmienić Raspberry Pi 4 w pełny węzeł Ethereum z uruchomioną warstwą wykonawczą (sieć główna) i/lub warstwą konsensusu (Beacon Chain / walidator)._