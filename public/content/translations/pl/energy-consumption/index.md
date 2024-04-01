---
title: Zużycie energii przez Ethereum
description: Podstawowe informacje, których potrzebujesz, aby zrozumieć zużycie energii Ethereum.
lang: pl
---

# Wydatki energetyczne Ethereum {#proof-of-stake-energy}

Ethereum jest zielonym blockchainem. Mechanizm konsensusu Ethereum — [proof-of-stake](/developers/docs/consensus-mechanisms/pos) — wykorzystuje ETH zamiast [energii do zabezpieczenia sieci](/developers/docs/consensus-mechanisms/pow). Zużycie energii przez Ethereum wynosi około [0,0026 TWh/rok](https://carbon-ratings.com/eth-report-2022) w całej globalnej sieci.

Szacunkowe zużycie energii dla Ethereum pochodzi z badania [CCRI (Instytut Oceny Emisji Kryptowalut)](https://carbon-ratings.com). Wygenerowali oni szacunkowe dane dotyczące zużycia energii i śladu węglowego sieci Ethereum ([zobacz raport](https://carbon-ratings.com/eth-report-2022)). Zmierzyli oni zużycie energii elektrycznej przez różne węzły z różnymi konfiguracjami sprzętu i oprogramowania klienckiego. Szacowane **2.601 MWh** (0,0026 TWh) rocznego zużycia energii elektrycznej przez sieć odpowiada rocznej emisji dwutlenku węgla na poziomie **870 ton CO2e** przy uwzględnieniu regionalnych współczynników intensywności emisji dwutlenku węgla. Wartość ta zmienia się wraz z wchodzeniem i wychodzeniem węzłów z sieci — można ją śledzić za pomocą 7-dniowego średniego oszacowania przez [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (należy pamiętać, że używają oni nieco innej metody do swoich szacunków — szczegóły dostępne na ich stronie).

Aby zwizualizować zużycie energii przez Ethereum, możemy porównać roczne szacunki dla niektórych innych branż. Pomoże nam to lepiej zrozumieć, czy oszacowania dla Ethereum są wysokie czy niskie.

<EnergyConsumptionChart />

Powyższy wykres przedstawia szacowane roczne zużycie energii w TWh/rok dla Ethereum w porównaniu z kilkoma innymi branżami. Przedstawione szacunki pochodzą z publicznie dostępnych informacji, które uzyskano w maju 2023 r., z linkami do źródeł dostępnymi w poniższej tabeli:

|                                | Roczne zużycie energii (TWh) | Porównanie do PoS Ethereum | Źródło                                                                                                                                                                            |
| :----------------------------- | :--------------------------: | :------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Światowe centra danych         |             200              |          77.000x           | [źródło](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| Wydobycie złota                |             131              |          50.000x           | [źródło](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin                        |             131              |          50.000x           | [źródło](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| PoW Ethereum                   |              78              |          30.000x           | [źródło](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| YouTube (wydatki bezpośrednie) |              12              |           4600x            | [źródło](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| Gaming w USA                   |              34              |          13.000x           | [źródło](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix                        |            0,451             |            173x            | [źródło](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                         |             0,26             |            100x            | [źródło](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                         |             0,02             |             8x             | [źródło](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| PoS Ethereum                   |            0,0026            |             1x             | [źródło](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

Uzyskanie dokładnych szacunków dotyczących zużycia energii jest skomplikowane, zwłaszcza gdy mierzony produkt ma złożony łańcuch dostaw lub szczegóły wdrożenia, które wpływają na jego wydajność. Weźmy na przykład Netflix czy YouTube. Szacunki dotyczące zużycia energii różnią się w zależności od tego, czy uwzględniają tylko energię wykorzystywaną do utrzymania systemów i dostarczania treści użytkownikom (_wydatki bezpośrednie_), czy też uwzględniają wydatki wymagane do produkcji treści, prowadzenia biur korporacyjnych, reklam itp (_wydatki pośrednie_). Pośrednie zużycie może również obejmować energię wymaganą do korzystania z treści na urządzeniach użytkowników końcowych, takich jak telewizory, komputery i telefony, które z kolei zależy od tego, jakie urządzenia są używane.

Istnieje pewna dyskusja na ten temat na [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). W powyższej tabeli wartość podana dla Netflix obejmuje zgłoszone przez nich samych _bezpośrednie_ i _pośrednie_ wykorzystanie. YouTube podaje jedynie szacunkowe dane dotyczące własnych _bezpośrednich_ wydatków na energię, które wynoszą około [12 TWh/rok](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf).

Powyższa tabela i wykres zawierają również porównania do Bitcoina i proof-of-work Ethereum. Należy zauważyć, że zużycie energii w sieciach proof-of-work nie jest stałe — zmienia się z dnia na dzień. Wartość użyta do proof-of-work Ethereum pochodziła z okresu tuż przed [Połączeniem](/roadmap/merge/) do proof-of-stake, zgodnie z przewidywaniami [Digiconomist](https://digiconomist.net/ethereum-energy-consumption). Inne źródła, takie jak [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum/1) szacują, że zużycie energii było znacznie niższe (bliżej 20 TWh/rok). Szacunki zużycia energii przez Bitcoina również różnią się znacznie w zależności od źródła i jest to temat, który przyciąga wiele zróżnicowanych [debat](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) na temat nie tylko ilości zużywanej energii, ale także jej źródeł i związanej z tym etyki. Zużycie energii niekoniecznie dokładnie odzwierciedla ślad środowiskowy, ponieważ różne projekty mogą wykorzystywać różne źródła energii, na przykład mniejsze lub większe udziały odnawialnych źródeł energii. Na przykład [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) wskazuje, że zapotrzebowanie sieci Bitcoin może być teoretycznie zasilane przez spalanie gazu lub energię elektryczną, która w przeciwnym razie zostałaby utracona podczas przesyłu i dystrybucji. Droga Ethereum do zrównoważonego rozwoju polegała na zastąpieniu energochłonnej części sieci zieloną alternatywą.

Na stronie [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) można przeglądać szacunki zużycia energii i emisji dwutlenku węgla dla wielu branż.

## Szacunki na transakcję {#per-transaction-estimates}

Wiele artykułów szacuje wydatek energetyczny blockchainów „za transakcję”. Może to być mylące, ponieważ energia wymagana do zaproponowania i walidacji bloku jest niezależna od liczby transakcji w nim zawartych. Jednostka wydatku energetycznego na transakcję sugeruje, że mniejsza liczba transakcji prowadziłaby do mniejszych wydatków energetycznych i odwrotnie, co nie jest prawdą. Ponadto szacunki na transakcję są bardzo wrażliwe na sposób definiowania przepustowości transakcji blockchainu, a modyfikowanie tej definicji może być wykorzystywane do zwiększania lub zmniejszania wartości.

Na przykład w Ethereum przepustowość transakcji to nie tylko przepustowość warstwy podstawowej — to także suma przepustowości transakcji wszystkich jej pakietów zbiorczych „[warstwy 2](/layer-2/)”. Warstwy 2 nie są zwykle uwzględniane w obliczeniach, ale wzięcie pod uwagę dodatkowej energii zużywanej przez sekwencery (mało) i liczby przetwarzanych przez nie transakcji (dużo) prawdopodobnie drastycznie zmniejszyłoby szacunki na transakcję. Jest to jeden z powodów, dla których porównania zużycia energii na transakcję na różnych platformach mogą być mylące.

## Dług emisyjny Ethereum {#carbon-debt}

Wydatek energetyczny Ethereum jest bardzo niski, ale nie zawsze tak było. Ethereum pierwotnie wykorzystywało mechanizm proof-of-work, który wiązał się ze znacznie większymi obciążeniami środowiskowymi niż obecny mechanizm proof-of-stake.

Od samego początku Ethereum planowało wdrożyć mechanizm konsensusu proof-of-stake, ale zrobienie tego bez poświęcania bezpieczeństwa i decentralizacji wymagało lat ukierunkowanych badań i rozwoju. W związku z tym do uruchomienia sieci wykorzystano mechanizm proof-of-work. Proof-of-work wymaga od górników użycia ich sprzętu komputerowego do obliczenia wartości, zużywając przy tym energię.

![Porównanie zużycia energii przez Ethereum przed i po Połączeniu, przy użyciu wieży Eiffla (330 metrów wysokości) po lewej stronie, która symbolizuje wysokie zużycie energii przed Połączeniem, oraz małej figurki Lego o wysokości 4 cm po prawej stronie, która symbolizuje radykalnie zmniejszone zużycie energii po Połączeniu](energy_consumption_pre_post_merge.png)

CCRI szacuje, że Połączenie zmniejszyło roczne zużycie energii elektrycznej przez Ethereum o ponad **99,988%**. Podobnie, ślad węglowy Ethereum został zmniejszony o około **99,992%** (z 11.016.000 do 870 ton CO2e). Aby przedstawić to w perspektywie, redukcja emisji jest jak przejście z wysokości wieży Eiffla do małej plastikowej zabawkowej figurki, jak pokazano na powyższej ilustracji. W wyniku tego obciążenia środowiskowe związane z zabezpieczaniem sieci są drastycznie zmniejszone. Jednocześnie uważa się, że poprawiło się bezpieczeństwo sieci.

## Ekologiczna warstwa aplikacji {#green-applications}

Podczas gdy zużycie energii przez Ethereum jest bardzo niskie, istnieje również pokaźna, rosnąca i bardzo aktywna społeczność zajmująca się [**finansami regeneracyjnymi (ReFi)**](/refi/). Aplikacje ReFi wykorzystują komponenty DeFi do tworzenia aplikacji finansowych, które mają pozytywny wpływ na środowisko. ReFi jest częścią szerszego ruchu [„solarpunk”](https://en.wikipedia.org/wiki/Solarpunk), który jest ściśle powiązany z Ethereum i ma na celu połączenie postępu technologicznego z ochroną środowiska. Zdecentralizowana, niewymagająca uprawnień i złożona natura Ethereum sprawia, że jest to idealna warstwa bazowa dla społeczności ReFi i solarpunk.

Natywne platformy Web3 do finansowania dóbr publicznych, takie jak [Gitcoin](https://gitcoin.co), przeprowadzają rundy klimatyczne w celu stymulowania świadomego i ekologicznego budownictwa w warstwie aplikacji Ethereum. Dzięki rozwojowi tych inicjatyw (i innych, np. [DeSci](/desci/)), Ethereum staje się technologią pozytywną pod względem środowiskowym i społecznym.

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
