---
title: Różnorodność klientów
description: Ogólne wyjaśnienie znaczenia różnorodności klientów Ethereum.
lang: pl
sidebarDepth: 2
---

Zachowanie węzła Ethereum jest kontrolowane przez uruchomione oprogramowanie klienta. Istnieje wiele klientów Ethereum na poziomie produkcyjnym, a każdy z nich jest rozwijany oraz utrzymywany w innym języku oraz przez różne zespoły. Klienty są tworzone zgodnie ze wspólną specyfikacją, która zapewnia im płynną komunikację i posiadanie tych samych funkcji oraz dostarczanie podobnych doświadczeń użytkownika. Jednak obecnie rozłożenie klientów między węzłami nie jest wystarczające równa, aby w pełni wykorzystać potencjał fortyfikacji tej sieci. Idealnie byłoby, gdyby użytkownicy byli mniej więcej równo podzieleni między różnymi klientami, co by zapewniło jak największą różnorodność w sieci.

## Wymagania wstępne {#prerequisites}

Jeśli jeszcze nie rozumiesz, czym są węzły i klienci, sprawdź [węzły i klienci](/developers/docs/nodes-and-clients/). Warstwy [wykonawcza](/glossary/#execution-layer) i [konsensusu](/glossary/#consensus-layer) są zdefiniowane w słowniku.

## Dlaczego istnieje wiele klientów? {#why-multiple-clients}

Istnieje wiele niezależnie rozwijanych oraz utrzymywanych klientów, ponieważ różnorodność klientów uodparnia sieć przed atakami i błędami. Jest to unikalna zaleta Ethereum — inne blockchainy opierają się na nieomylności pojedynczego klienta. Nie wystarczy jednak zwykłe posiadanie wielu klientów, muszą one zostać przyjęte przez społeczność, a wszystkie aktywne węzły muszą być rozłożone stosunkowo równomiernie między nimi.

## Dlaczego różnorodność klientów jest ważna? {#client-diversity-importance}

Posiadanie wielu niezależnie rozwijanych i utrzymywanych klientów jest kluczowe dla zdrowia zdecentralizowanej sieci. Dowiedzmy się zatem dlaczego.

### Błędy {#bugs}

Błąd w indywidualnym kliencie jest mniejszym zagrożeniem dla sieci, gdy stanowi on mniejszość węzłów Ethereum. Przy mniej więcej równomiernym rozłożeniu węzłów pomiędzy różnymi klientami, prawdopodobieństwo dzielenia wspólnego problemu przez większość klientów jest małe, co sprawia, że sieć jest bardziej wytrzymała.

### Odporność na ataki {#resilience}

Różnorodność klientów również zapewnia odporność na ataki. Na przykład atak, który [nakłoni konkretnego klienta](https://twitter.com/vdWijden/status/1437712249926393858) do przejścia na konkretną gałąź łańcucha, jest mało prawdopodobny, ponieważ inne klienty raczej nie będą podatne na wykorzystanie w ten sam sposób, a kanoniczny łańcuch pozostaje nienaruszony. Mała różnorodność klientów zwiększa ryzyko związane z włamaniem do dominującego klienta. Różnorodność klientów udowodniła już, że jest ważną obroną przed złośliwymi atakami na sieć, dla przykładu atak blokady usług w Szanghaju w 2016 roku był możliwy, ponieważ atakujący zdołali oszukać dominującego klienta (Geth) do wykonania powolnej operacji i/o dysku dziesiątki tysięcy razy na blok. Ponieważ inne klienty niedzielące tej luki były online, Ethereum mogło odeprzeć atak i kontynuować działanie, podczas gdy luka w Geth została naprawiona.

### Nieodwołalność w Proof-of-Stake {#finality}

Błąd w kliencie konsensusu z ponad 33% węzłów Ethereum mógłby uniemożliwić warstwie konsensusu finalizację, co oznaczałoby, że użytkownicy nie mogliby mieć pewności, że transakcje nie zostaną w pewnym momencie cofnięte lub zmienione. To byłoby bardzo problematyczne dla wielu aplikacji zbudowanych na Ethereum, w szczególności DeFi.

<Emoji text="🚨" className="me-4" /> Co gorsza, krytyczny błąd w kliencie z większością dwóch trzecich mógłby spowodować <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">nieprawidłowy podział i finalizację</a> łańcucha, co doprowadziłoby do utknięcia dużej grupy walidatorów w nieprawidłowym łańcuchu. Jeśli chcieliby ponownie dołączyć do właściwego łańcucha, to walidatorzy ci byliby narażeni na odcięcia lub powolną i droga dobrowolną wypłatę oraz reaktywację. Wielkość odcięć rośnie wraz z liczbą winnych węzłów, przy czym 2/3 większości sieci zostałoby odcięte maksymalnie (32 ETH).

Chociaż są to mało prawdopodobne scenariusze, to ekosystem Ethereum może zmniejszyć ryzyko, wyrównując rozkład klientów pośród aktywnych węzłów. Najlepiej byłoby, gdyby żaden klient konsensusu nigdy nie osiągnął 33% udziału wszystkich węzłów.

### Współdzielona odpowiedzialność {#responsibility}

Posiadanie większościowych klientów wiąże się również z ludzkimi kosztami. Nakłada to nadmiernie obciążenie i odpowiedzialność na mały zespół zajmujący się jego rozwojem. Im mniejsza jest różnorodność klientów tym większa odpowiedzialność na deweloperach utrzymujących klienta większościowego. Rozłożenie tej odpowiedzialności na wiele zespołów jest dobre zarówno dla zdrowia sieci węzłów Ethereum, jak i sieci ludzi.

## Obecna różnorodność klientów {#current-client-diversity}

### Klienty wykonawcze {#execution-clients-breakdown}

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
{ name: "Inne", value: 0.07 }
]}
/>

Ten diagram może być nieaktualny — przejdź na [ethernodes.org](https://ethernodes.org) i [clientdiversity.org](https://clientdiversity.org), aby uzyskać aktualne informacje.

Dwa powyższe wykresy kołowe przedstawiają migawki bieżącej różnorodności klientów dla warstwy wykonawczej i konsensusu (w chwili pisania, w październiku 2025 r.). Różnorodność klientów poprawiła się na przestrzeni lat, a w warstwie wykonawczej odnotowano spadek dominacji klienta [Geth](https://geth.ethereum.org/). Drugie miejsce z niewielką stratą zajmuje [Nethermind](https://www.nethermind.io/nethermind-client), trzecie [Besu](https://besu.hyperledger.org/), a czwarte [Erigon](https://github.com/ledgerwatch/erigon), przy czym pozostali klienci stanowią mniej niż 3% sieci. Najczęściej używany klient w warstwie konsensusu — [Lighthouse](https://lighthouse.sigmaprime.io/) — ma wynik zbliżony do drugiego najczęściej używanego klienta. [Prysm](https://prysmaticlabs.com/#projects) i [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) stanowią odpowiednio ~31% i ~14%, a pozostali klienci są rzadko używani.

Dane dotyczące warstwy wykonawczej zostały uzyskane z [supermajority.info](https://supermajority.info/) w dniu 26 października 2025 r. Dane dla klientów konsensusu uzyskano od [Michaela Sproula](https://github.com/sigp/blockprint). Dane klientów konsensusu są cięższe do uzyskania, ponieważ klienty warstwy konsensusu nie zawsze mają jednoznaczne ślady, które mogą zostać wykorzystane do ich zidentyfikowania. Dane zostały wygenerowane przy użyciu algorytmu klasyfikacji, który czasami myli niektórych klientów mniejszościowych (zobacz więcej szczegółów [tutaj](https://twitter.com/sproulM_/status/1440512518242197516)). Na powyższym diagramie te niejednoznaczne klasyfikacje zostały oznaczone etykietą „albo/albo” (np. Nimbus/Teku). Niemniej jednak jasne jest, że większość sieci korzysta z klienta Prysm. Pomimo tego, że są to tylko migawki, wartości na diagramach zapewniają dobry ogólny obraz obecnego stanu różnorodności klientów.

Aktualne dane dotyczące różnorodności klientów dla warstwy konsensusu są teraz dostępne na [clientdiversity.org](https://clientdiversity.org/).

## Warstwa wykonawcza {#execution-layer}

Dotąd, konwersacja na temat różnorodności klientów koncentrowała się głównie na warstwie konsensusu. Jednakże klient wykonawczy [Geth](https://geth.ethereum.org) stanowi obecnie około 85% wszystkich węzłów. Ten duży odsetek jest problematyczny z tych samych powodów co w przypadku klientów konsensusu. Dla przykładu błąd w Geth wpływający na obsługę transakcji lub tworzenie ładunków wykonawczych mógłby prowadzić do finalizowania problematycznych lub błędnych transakcji przez klientów konsensusu. Ethereum byłoby więc zdrowsze z bardziej zrównoważonym rozkładem klientów wykonawczych, w najlepszym przypadku z żadnym niereprezentującym ponad 33% sieci.

## Użyj klienta mniejszościowego {#use-minority-client}

Rozwiązanie kwestii różnorodności klientów wymaga czegoś więcej, niż tylko wybrania klienta mniejszościowego przez indywidualnych użytkowników — wymaga to również zmiany klientów przez pule walidatorów oraz instytucje, takie jak główne dapki i giełdy. Wszyscy użytkownicy mogą jednak przyczynić się do wyrównania obecnych dysproporcji oraz znormalizowania korzystania z całego dostępnego oprogramowania Ethereum. Po Połączeniu wszyscy operatorzy węzłów będą musieli uruchomić klienta wykonawczego i klienta konsensusu. Wybranie kombinacji klientów podanych poniżej, pomoże w zwiększeniu różnorodności klientów.

### Klienci wykonawczy {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Klienci konsensusu {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Techniczni użytkownicy mogą pomóc przyspieszyć ten proces, pisząc więcej samouczków i dokumentacji dla klientów mniejszościowych oraz zachęcają swoich operujących węzły rówieśników do migracji od dominujących klientów. Przewodniki dotyczące przełączenia się na mniejszościowego klienta konsensusu są dostępne na [clientdiversity.org](https://clientdiversity.org/).

## Pulpity nawigacyjne różnorodności klientów {#client-diversity-dashboards}

Szereg pulpitów nawigacyjnych zapewnia statystyki różnorodności klientów w czasie rzeczywistym dla warstwy wykonawczej i konsensusu.

**Warstwa wykonawcza:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Warstwa wykonawcza:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Dalsza lektura {#further-reading}

- [Różnorodność klientów w warstwie konsensusu Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [The Merge w Ethereum: Uruchamiaj klienta większościowego na własne ryzyko!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 marca 2022_
- [Znaczenie różnorodności klientów](https://our.status.im/the-importance-of-client-diversity/)
- [Lista usług węzłów Ethereum](https://ethereumnodes.com/)
- [„Pięć razy dlaczego” problemu różnorodności klientów](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Różnorodność w Ethereum i jak ją rozwiązać (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Powiązane tematy {#related-topics}

- [Uruchom węzeł Ethereum](/run-a-node/)
- [Węzły i klienci](/developers/docs/nodes-and-clients/)
