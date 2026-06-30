---
title: Różnorodność klientów
description: Ogólne wyjaśnienie znaczenia różnorodności klientów Ethereum.
lang: pl
sidebarDepth: 2
---

Zachowanie węzła [Ethereum](/) jest kontrolowane przez oprogramowanie klienta, które na nim działa. Istnieje kilka klientów Ethereum na poziomie produkcyjnym, z których każdy jest rozwijany i utrzymywany w różnych językach przez oddzielne zespoły. Klienty są budowane zgodnie ze wspólną specyfikacją, która zapewnia, że płynnie komunikują się ze sobą, mają tę samą funkcjonalność i zapewniają równoważne doświadczenie użytkownika. Jednak obecnie dystrybucja klientów w węzłach nie jest wystarczająco równomierna, aby w pełni zrealizować ten potencjał wzmocnienia sieci. W idealnym przypadku użytkownicy dzielą się mniej więcej po równo między różnymi klientami, aby zapewnić sieci jak największą różnorodność klientów.

## Wymagania wstępne {#prerequisites}

Jeśli jeszcze nie rozumiesz, czym są węzły i klienty, zapoznaj się z sekcją [węzły i klienty](/developers/docs/nodes-and-clients/). [Warstwa wykonawcza](/glossary/#execution-layer) i [warstwa konsensusu](/glossary/#consensus-layer) są zdefiniowane w słowniczku.

## Dlaczego istnieje wiele klientów? {#why-multiple-clients}

Wiele niezależnie rozwijanych i utrzymywanych klientów istnieje, ponieważ różnorodność klientów sprawia, że sieć jest bardziej odporna na ataki i błędy. Wiele klientów to siła unikalna dla Ethereum – inne łańcuchy bloków polegają na nieomylności jednego klienta. Jednak nie wystarczy po prostu mieć dostępnych wielu klientów, muszą one zostać przyjęte przez społeczność, a całkowita liczba aktywnych węzłów musi być stosunkowo równomiernie między nie rozłożona.

## Dlaczego różnorodność klientów jest ważna? {#client-diversity-importance}

Posiadanie wielu niezależnie rozwijanych i utrzymywanych klientów ma kluczowe znaczenie dla zdrowia zdecentralizowanej sieci. Przyjrzyjmy się powodom, dla których tak jest.

### Błędy {#bugs}

Błąd w pojedynczym kliencie stanowi mniejsze ryzyko dla sieci, gdy reprezentuje on mniejszość węzłów Ethereum. Przy mniej więcej równomiernym rozkładzie węzłów na wielu klientów, prawdopodobieństwo, że większość klientów ucierpi z powodu wspólnego problemu, jest małe, w wyniku czego sieć jest bardziej solidna.

### Odporność na ataki {#resilience}

Różnorodność klientów zapewnia również odporność na ataki. Na przykład atak, który [oszukuje konkretnego klienta](https://twitter.com/vdWijden/status/1437712249926393858), aby przeszedł na określoną gałąź łańcucha, prawdopodobnie się nie powiedzie, ponieważ inne klienty raczej nie będą podatne na wykorzystanie w ten sam sposób, a kanoniczny łańcuch pozostanie nienaruszony. Niska różnorodność klientów zwiększa ryzyko związane z atakiem hakerskim na dominującego klienta. Różnorodność klientów już udowodniła, że jest ważną obroną przed złośliwymi atakami na sieć, na przykład atak typu „odmowa usługi” (DoS) w Szanghaju w 2016 roku był możliwy, ponieważ atakujący byli w stanie oszukać dominującego klienta (Geth), zmuszając go do wykonywania powolnej operacji wejścia/wyjścia na dysku dziesiątki tysięcy razy na blok. Ponieważ alternatywne klienty, które nie miały tej luki, były również online, Ethereum było w stanie oprzeć się atakowi i kontynuować działanie, podczas gdy luka w Geth została naprawiona.

### Ostateczność dowodu stawki (PoS) {#finality}

Błąd w kliencie konsensusu obsługującym ponad 33% węzłów Ethereum mógłby uniemożliwić warstwie konsensusu osiągnięcie ostateczności, co oznacza, że użytkownicy nie mogliby ufać, że transakcje nie zostaną w pewnym momencie cofnięte lub zmienione. Byłoby to bardzo problematyczne dla wielu zdecentralizowanych aplikacji (dapp) zbudowanych na Ethereum, w szczególności dla zdecentralizowanych finansów (DeFi).

<Emoji text="🚨" className="me-4" /> Co gorsza, krytyczny błąd w kliencie posiadającym większość kwalifikowaną (dwie trzecie) mógłby spowodować, że łańcuch <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">nieprawidłowo się podzieli i osiągnie ostateczność</a>, co doprowadziłoby do utknięcia dużej grupy walidatorów na nieprawidłowym łańcuchu. Jeśli chcieliby oni ponownie dołączyć do prawidłowego łańcucha, walidatorzy ci narażają się na cięcie lub powolną i kosztowną dobrowolną wypłatę i ponowną aktywację. Wielkość cięcia skaluje się wraz z liczbą winnych węzłów, przy czym większość kwalifikowana (dwie trzecie) jest karana maksymalnym cięciem (32 ETH).

Chociaż są to mało prawdopodobne scenariusze, ekosystem Ethereum może zminimalizować ich ryzyko poprzez wyrównanie dystrybucji klientów w aktywnych węzłach. W idealnym przypadku żaden klient konsensusu nigdy nie osiągnąłby 33% udziału we wszystkich węzłach.

### Współdzielona odpowiedzialność {#responsibility}

Posiadanie klientów większościowych wiąże się również z kosztami ludzkimi. Nakłada to nadmierne obciążenie i odpowiedzialność na mały zespół programistów. Im mniejsza różnorodność klientów, tym większy ciężar odpowiedzialności spoczywa na programistach utrzymujących klienta większościowego. Rozłożenie tej odpowiedzialności na wiele zespołów jest dobre zarówno dla zdrowia sieci węzłów Ethereum, jak i sieci tworzących ją ludzi.

## Obecna różnorodność klientów {#current-client-diversity}

### Klienty warstwy wykonawczej {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Klienty konsensusu {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Ten diagram może być nieaktualny — przejdź do [ethernodes.org](https://ethernodes.org) i [clientdiversity.org](https://clientdiversity.org), aby uzyskać aktualne informacje.

Dwa powyższe wykresy kołowe przedstawiają migawki obecnej różnorodności klientów dla warstwy wykonawczej i warstwy konsensusu (w momencie pisania tego tekstu w październiku 2025 r.). Różnorodność klientów poprawiła się na przestrzeni lat, a w warstwie wykonawczej zaobserwowano zmniejszenie dominacji [Geth](https://geth.ethereum.org/), przy czym [Nethermind](https://www.nethermind.io/nethermind-client) zajmuje bliskie drugie miejsce, [Besu](https://besu.hyperledger.org/) trzecie, a [Erigon](https://github.com/ledgerwatch/erigon) czwarte, podczas gdy inne klienty stanowią mniej niż 3% sieci. Najczęściej używany klient w warstwie konsensusu — [Lighthouse](https://lighthouse.sigmaprime.io/) — jest bardzo blisko drugiego najczęściej używanego. [Prysm](https://prysmaticlabs.com/#projects) i [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) stanowią odpowiednio ~31% i ~14%, a inne klienty są rzadko używane.

Dane dotyczące warstwy wykonawczej uzyskano z [supermajority.info](https://supermajority.info/) w dniu 26 października 2025 r. Dane dotyczące klientów konsensusu uzyskano od [Michaela Sproula](https://github.com/sigp/blockprint). Dane dotyczące klientów konsensusu są trudniejsze do uzyskania, ponieważ klienty warstwy konsensusu nie zawsze pozostawiają jednoznaczne ślady, które można wykorzystać do ich identyfikacji. Dane zostały wygenerowane przy użyciu algorytmu klasyfikacji, który czasami myli niektóre klienty mniejszościowe (zobacz [tutaj](https://twitter.com/sproulM_/status/1440512518242197516), aby uzyskać więcej szczegółów). Na powyższym diagramie te niejednoznaczne klasyfikacje są traktowane etykietą „albo/albo” (np. Nimbus/Teku). Niemniej jednak jasne jest, że większość sieci działa na kliencie Prysm. Mimo że są to tylko migawki, wartości na diagramie dają dobre ogólne pojęcie o obecnym stanie różnorodności klientów.

Aktualne dane dotyczące różnorodności klientów dla warstwy konsensusu są teraz dostępne na stronie [clientdiversity.org](https://clientdiversity.org/).

## Warstwa wykonawcza {#execution-layer}

Do tej pory dyskusja na temat różnorodności klientów skupiała się głównie na warstwie konsensusu. Jednak klient warstwy wykonawczej [Geth](https://geth.ethereum.org) stanowi obecnie około 85% wszystkich węzłów. Ten odsetek jest problematyczny z tych samych powodów, co w przypadku klientów konsensusu. Na przykład błąd w Geth wpływający na obsługę transakcji lub konstruowanie ładunków wykonawczych (execution payloads) mógłby doprowadzić do tego, że klienty konsensusu osiągnęłyby ostateczność dla problematycznych lub błędnych transakcji. Dlatego Ethereum byłoby zdrowsze przy bardziej równomiernym rozkładzie klientów warstwy wykonawczej, w idealnym przypadku bez żadnego klienta reprezentującego więcej niż 33% sieci.

## Użyj klienta mniejszościowego {#use-minority-client}

Rozwiązanie problemu różnorodności klientów wymaga czegoś więcej niż tylko wybierania klientów mniejszościowych przez indywidualnych użytkowników – wymaga to również zmiany klientów przez pule walidatorów i instytucje, takie jak główne zdecentralizowane aplikacje (dapp) i giełdy. Jednak wszyscy użytkownicy mogą odegrać swoją rolę w naprawieniu obecnej nierównowagi i znormalizowaniu korzystania z całego dostępnego oprogramowania Ethereum. Po The Merge wszyscy operatorzy węzłów będą musieli uruchomić klienta warstwy wykonawczej i klienta konsensusu. Wybór kombinacji klientów zasugerowanych poniżej pomoże zwiększyć różnorodność klientów.

### Klienty warstwy wykonawczej {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Klienty konsensusu {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Użytkownicy techniczni mogą pomóc przyspieszyć ten proces, pisząc więcej samouczków i dokumentacji dla klientów mniejszościowych oraz zachęcając swoich współpracowników obsługujących węzły do migracji z dominujących klientów. Przewodniki dotyczące przejścia na mniejszościowego klienta konsensusu są dostępne na stronie [clientdiversity.org](https://clientdiversity.org/).

## Panele różnorodności klientów {#client-diversity-dashboards}

Kilka paneli udostępnia statystyki różnorodności klientów w czasie rzeczywistym dla warstwy wykonawczej i warstwy konsensusu.

**Warstwa konsensusu:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Warstwa wykonawcza:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Dalsza lektura {#further-reading}

- [Różnorodność klientów w warstwie konsensusu Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Uruchamiasz klienta większościowego na własne ryzyko!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 marca 2022 r._
- [Znaczenie różnorodności klientów](https://our.status.im/the-importance-of-client-diversity/)
- [Lista usług węzłów Ethereum](https://ethereumnodes.com/)
- [„Pięć dlaczego” problemu różnorodności klientów](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Różnorodność Ethereum i jak ją rozwiązać (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Powiązane tematy {#related-topics}

- [Uruchom węzeł Ethereum](/run-a-node/)
- [Węzły i klienty](/developers/docs/nodes-and-clients/)