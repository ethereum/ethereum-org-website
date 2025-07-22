---
title: Zużycie energii przez Ethereum
description: Podstawowe informacje, których potrzebujesz, aby zrozumieć zużycie energii Ethereum.
lang: pl
---

# Wydatki energetyczne Ethereum {#proof-of-stake-energy}

Ethereum jest zielonym blockchainem. Mechanizm konsensusu Ethereum ([proof-of-stake](/developers/docs/consensus-mechanisms/pos)) wykorzystuje ETH zamiast [energii do zabezpieczenia sieci](/developers/docs/consensus-mechanisms/pow). Zużycie energii przez Ethereum wynosi około [0,0026 TWh/rok](https://carbon-ratings.com/eth-report-2022) w całej globalnej sieci.

Szacunkowe zużycie energii dla Ethereum pochodzi z badania [CCRI (Instytut Oceny Emisji Kryptowalut)](https://carbon-ratings.com). W ramach tego badania wygenerowano szacunkowe dane dotyczące zużycia energii i śladu węglowego sieci Ethereum ([zobacz raport](https://carbon-ratings.com/eth-report-2022)). Zmierzyli oni zużycie energii elektrycznej przez różne węzły z różnymi konfiguracjami sprzętu i oprogramowania klienckiego. Szacowane **2601 MWh** (0,0026 TWh) rocznego zużycia energii elektrycznej przez sieć odpowiada rocznej emisji dwutlenku węgla na poziomie **870 ton CO2e** przy uwzględnieniu regionalnych współczynników intensywności emisji dwutlenku węgla. Wartość ta zmienia się wraz z wchodzeniem i wychodzeniem węzłów z sieci — można ją śledzić, korzystając z 7-dniowego średniego oszacowania obliczanego przez [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (należy pamiętać, że używają oni nieco innej metody do swoich szacunków — szczegóły dostępne na ich stronie).

Aby zwizualizować zużycie energii przez Ethereum, możemy porównać roczne szacunki dla niektórych innych produktów i przemysłów. Pomoże nam to lepiej zrozumieć, czy oszacowania dla Ethereum są wysokie czy niskie.

<EnergyConsumptionChart />

Powyższy wykres przedstawia szacowane zużycie energii w TWh/rok dla Ethereum w porównaniu z kilkoma innymi produktami i przemysłami. Przedstawione szacunki pochodzą z publicznie dostępnych danych, które zebrano w lipcu 2023 r. Linki do źródeł są dostępne w poniższej tabeli.

|                        | Roczne zużycie energii (TWh) | Porównanie do PoS Ethereum |                                                                                      Źródło                                                                                       |
|:---------------------- |:----------------------------:|:--------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Światowe centra danych |             190              |          x 73 000          |                                    [źródło](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                |             149              |          x 53 000          |                                                                 [źródło](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Wydobycie złota        |             131              |          x 50 000          |                                                                 [źródło](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gaming w USA\*       |              34              |          x 13 000          |                 [źródło](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum           |              21              |           x 8100           |                                                                    [źródło](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google                 |              19              |           x 7300           |                                           [źródło](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                |            0,457             |           x 176            | [źródło](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                 |             0,26             |           x 100            |                                  [źródło](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf)                                   |
| AirBnB                 |             0,02             |            x 8             |                               [źródło](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf)                               |
| **PoS Ethereum**       |          **0,0026**          |          **x 1**           |                                                               [źródło](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Obejmuje urządzenia użytkowników końcowych, takie jak komputery, laptopy i konsole do gier.

Uzyskanie dokładnych szacunków dotyczących zużycia energii jest skomplikowane, zwłaszcza gdy mierzony produkt ma złożony łańcuch dostaw lub szczegóły wdrożenia, które wpływają na jego wydajność. Przykładowo, szacunki dotyczące zużycia energii przez Netflix i Google różnią się w zależności od tego, czy uwzględniają jedynie energię wykorzystywaną do utrzymania ich systemów i dostarczania treści użytkownikom (_wydatki bezpośrednie_), czy też obejmują wydatki wymagane do produkcji treści, prowadzenia biur korporacyjnych, promocji itp. (_wydatki pośrednie_). Wydatki pośrednie mogą również obejmować energię wymaganą do odbioru treści na urządzeniach użytkowników końcowych, takich jak telewizory, komputery i telefony komórkowe.

Powyższe szacunki nie są idealnymi porównaniami. Kwota uwzględnionych wydatków pośrednich różni się w zależności od źródła i rzadko obejmuje energię z urządzeń użytkowników końcowych. W każdym z przytoczonych źródeł można znaleźć więcej informacji na temat tego, co jest mierzone.

Powyższa tabela i wykres zawierają również porównania do Bitcoina i proof-of-work Ethereum. Należy zauważyć, że zużycie energii w sieciach proof-of-work nie jest stałe i zmienia się z dnia na dzień. Szacunki mogą również znacznie się różnić w zależności od źródła. Wokół tego tematu toczy się szczegółowa [debata](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/). Polemika dotyczy nie tylko ilości zużywanej energii, ale także źródeł tej energii i etyki jej pozyskiwania. Zużycie energii niekoniecznie dokładnie odzwierciedla ślad środowiskowy, ponieważ różne projekty mogą wykorzystywać różne źródła energii, w których mogą mieć mniejszy lub większy udział odnawialne źródła energii. Na przykład [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) wskazuje, że zapotrzebowanie sieci Bitcoin może być teoretycznie zasilane przez spalanie gazu lub energię elektryczną, która w przeciwnym razie zostałaby utracona podczas przesyłu i dystrybucji. Droga Ethereum do zrównoważonego rozwoju polegała na zastąpieniu energochłonnej części sieci zieloną alternatywą.

Na stronie [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) można przeglądać szacunki zużycia energii i emisji dwutlenku węgla dla wielu przemysłów.

## Szacunki na transakcję {#per-transaction-estimates}

Wiele artykułów szacuje wydatek energetyczny blockchainów „na transakcję”. Może to być mylące, ponieważ energia wymagana do zaproponowania i walidacji bloku jest niezależna od liczby transakcji w nim zawartych. Jednostka wydatku energetycznego na transakcję sugeruje, że mniejsza liczba transakcji prowadziłaby do mniejszych wydatków energetycznych i odwrotnie, co nie jest prawdą. Ponadto szacunki na transakcję są bardzo wrażliwe na sposób definiowania przepustowości transakcji blockchainu, a modyfikowanie tej definicji może być wykorzystywane do zwiększania lub zmniejszania wartości.

Na przykład w Ethereum przepustowość transakcji to nie tylko przepustowość warstwy podstawowej — to także suma przepustowości transakcji wszystkich jej pakietów zbiorczych „[warstwy 2](/layer-2/)”. Warstwy 2 nie są zwykle uwzględniane w obliczeniach, ale wzięcie pod uwagę dodatkowej energii zużywanej przez sekwencery (mało) i liczby przetwarzanych przez nie transakcji (dużo) prawdopodobnie drastycznie zmniejszyłoby szacunki na transakcję. Jest to jeden z powodów, dla których porównania zużycia energii na transakcję na różnych platformach mogą być mylące.

## Dług emisyjny Ethereum {#carbon-debt}

Wydatek energetyczny Ethereum jest bardzo niski, ale nie zawsze tak było. Ethereum pierwotnie wykorzystywało mechanizm proof-of-work, który wiązał się ze znacznie większymi obciążeniami środowiskowymi niż obecny mechanizm proof-of-stake.

Od samego początku Ethereum planowało wdrożyć mechanizm konsensusu proof-of-stake, ale zrobienie tego bez szkody dla bezpieczeństwa i decentralizacji wymagało lat ukierunkowanych badań i rozwoju. W związku z tym do uruchomienia sieci wykorzystano mechanizm proof-of-work. Proof-of-work wymaga od górników użycia ich sprzętu komputerowego do obliczania wartości, co zużywa energię.

![Porównanie zużycia energii przez Ethereum przed i po Połączeniu, przy użyciu wieży Eiffla (330 metrów wysokości) po lewej stronie, która symbolizuje wysokie zużycie energii przed Połączeniem, oraz małej figurki Lego o wysokości 4 cm po prawej stronie, która symbolizuje radykalnie zmniejszone zużycie energii po Połączeniu](energy_consumption_pre_post_merge.png)

CCRI szacuje, że Połączenie zmniejszyło roczne zużycie energii elektrycznej przez Ethereum o ponad **99,988%**. Podobnie, ślad węglowy Ethereum został zmniejszony o około **99,992%** (z 11 016 000 do 870 ton CO2e). Aby lepiej to unaocznić, można porównać redukcję emisji do różnicy wysokości między wieżą Eiffla a małą plastikową figurką, jak pokazano na powyższej ilustracji. W wyniku tego obciążenia środowiskowe związane z zabezpieczaniem sieci zostały drastycznie zmniejszone. Jednocześnie uważa się, że poprawiło się bezpieczeństwo sieci.

## Ekologiczna warstwa aplikacji {#green-applications}

Obecnie zużycie energii przez Ethereum jest bardzo niskie, a ponadto istnieje również pokaźna, rosnąca i bardzo aktywna społeczność zajmująca się [**finansami regeneracyjnymi (ReFi)**](/refi/). Aplikacje ReFi wykorzystują komponenty DeFi do tworzenia aplikacji finansowych, które mają pozytywny wpływ na środowisko. ReFi jest częścią szerszego ruchu [„solarpunk”](https://en.wikipedia.org/wiki/Solarpunk), który jest ściśle powiązany z Ethereum i ma na celu połączenie postępu technologicznego z ochroną środowiska. Zdecentralizowana, niewymagająca uprawnień i złożona natura Ethereum sprawia, że jest to idealna warstwa bazowa dla społeczności ReFi i solarpunk.

Natywne platformy Web3 do finansowania dóbr publicznych, takie jak [Gitcoin](https://gitcoin.co), przeprowadzają rundy klimatyczne w celu stymulowania świadomego i ekologicznego budowania w warstwie aplikacji Ethereum. Dzięki rozwojowi tych inicjatyw (i innych, takich jak [DeSci](/desci/)) Ethereum staje się technologią o pozytywnym wpływie środowiskowym i społecznym.

<InfoBanner emoji=":evergreen_tree:">
  Jeśli uważasz, że ta strona może być dokładniejsza, zgłoś problem lub PR. Statystyki na tej stronie są szacunkami opartymi na danych, które są dostępne publicznie — nie stanowią one oficjalnego oświadczenia ani obietnicy ze strony zespołu ethereum.org lub Fundacji Ethereum.
</InfoBanner>

## Dalsza lektura {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Raport Białego Domu na temat blockchainów proof-of-work](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisje Ethereum: wstępne oszacowanie](https://kylemcdonald.github.io/ethereum-emissions/) — _Kyle McDonald_
- [Indeks zużycia energii Ethereum](https://digiconomist.net/ethereum-energy-consumption/) — _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [Połączenie — wpływ na zużycie energii elektrycznej i ślad węglowy sieci Ethereum](https://carbon-ratings.com/eth-report-2022) — _CCRI_
- [Zużycie energii przez Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Powiązane tematy {#related-topics}

- [Wizja Ethereum](/roadmap/vision/)
- [Łańcuch śledzący](/roadmap/beacon-chain)
- [Połączenie](/roadmap/merge/)
