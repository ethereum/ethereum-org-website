---
title: Zużycie energii przez Ethereum
metaTitle: Zużycie energii przez Ethereum
description: Podstawowe informacje, których potrzebujesz, aby zrozumieć zużycie energii przez Ethereum.
lang: pl
---

[Ethereum](/) to ekologiczny blockchain. [Dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos) jako mechanizm konsensusu Ethereum wykorzystuje ETH zamiast [energii do zabezpieczania sieci](/developers/docs/consensus-mechanisms/pow). Zużycie energii przez Ethereum wynosi około [~0,0026 TWh/rok](https://carbon-ratings.com/eth-report-2022) w całej globalnej sieci.

Szacunki dotyczące zużycia energii przez Ethereum pochodzą z badania [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Wygenerowali oni oddolne szacunki zużycia energii elektrycznej i śladu węglowego sieci Ethereum ([zobacz raport](https://carbon-ratings.com/eth-report-2022)). Zmierzyli zużycie energii elektrycznej przez różne węzły o różnych konfiguracjach sprzętowych i oprogramowania klienckiego. Szacowane **2601 MWh** (0,0026 TWh) rocznego zużycia energii elektrycznej przez sieć odpowiada rocznej emisji dwutlenku węgla na poziomie **870 ton CO2e** przy zastosowaniu specyficznych dla danego regionu wskaźników intensywności emisji. Wartość ta zmienia się w miarę jak węzły dołączają do sieci i ją opuszczają – można to śledzić za pomocą 7-dniowej średniej kroczącej szacowanej przez [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (należy pamiętać, że używają oni nieco innej metody do swoich szacunków – szczegóły dostępne na ich stronie).

Aby nadać kontekst zużyciu energii przez Ethereum, możemy porównać roczne szacunki dla niektórych innych produktów i branż. Pomaga nam to lepiej zrozumieć, czy szacunki dla Ethereum są wysokie, czy niskie.

<EnergyConsumptionChart />

Powyższy wykres przedstawia szacowane zużycie energii w TWh/rok dla Ethereum w porównaniu z kilkoma innymi produktami i branżami. Przedstawione szacunki pochodzą z publicznie dostępnych informacji, do których uzyskano dostęp w lipcu 2023 r., a linki do źródeł są dostępne w poniższej tabeli.

|                     | Roczne zużycie energii (TWh) | Porównanie z PoS Ethereum |                                                                                      Źródło                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Globalne centra danych |                 190                 |          73 000x           |                                    [źródło](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53 000x           |                                                                 [źródło](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Wydobycie złota     |                 131                 |          50 000x           |                                                                 [źródło](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Gry w USA\*         |                 34                  |          13 000x           |                 [źródło](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW Ethereum        |                 21                  |           8 100x           |                                                                    [źródło](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7 300x           |                                           [źródło](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [źródło](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [źródło](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [źródło](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS Ethereum**    |             **0,0026**              |           **1x**           |                                                               [źródło](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Obejmuje urządzenia użytkowników końcowych, takie jak komputery PC, laptopy i konsole do gier.

Uzyskanie dokładnych szacunków zużycia energii jest skomplikowane, zwłaszcza gdy to, co jest mierzone, ma złożony łańcuch dostaw lub szczegóły wdrożenia, które wpływają na jego wydajność. Na przykład szacunki zużycia energii dla Netflix i Google różnią się w zależności od tego, czy obejmują one tylko energię zużywaną do utrzymania ich systemów i dostarczania treści użytkownikom (_wydatki bezpośrednie_), czy też obejmują wydatki wymagane do produkcji treści, prowadzenia biur korporacyjnych, reklamowania się itp. (_wydatki pośrednie_). Wydatki pośrednie mogą również obejmować energię wymaganą do konsumpcji treści na urządzeniach użytkowników końcowych, takich jak telewizory, komputery i telefony komórkowe.

Powyższe szacunki nie są idealnymi porównaniami. Kwota uwzględnionych wydatków pośrednich różni się w zależności od źródła i rzadko obejmuje energię z urządzeń użytkowników końcowych. Każde źródło bazowe zawiera więcej szczegółów na temat tego, co jest mierzone.

Powyższa tabela i wykres zawierają również porównania do Bitcoina i Ethereum opartego na dowodzie pracy (PoW). Należy zauważyć, że zużycie energii przez sieci oparte na dowodzie pracy nie jest statyczne i zmienia się z dnia na dzień. Szacunki mogą się również znacznie różnić w zależności od źródła. Temat ten przyciąga zniuansowaną [debatę](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), nie tylko na temat ilości zużywanej energii, ale także na temat źródeł tej energii i związanej z tym etyki. Zużycie energii niekoniecznie przekłada się precyzyjnie na ślad środowiskowy, ponieważ różne projekty mogą wykorzystywać różne źródła energii, w tym mniejszy lub większy odsetek odnawialnych źródeł energii. Na przykład [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) wskazuje, że zapotrzebowanie sieci Bitcoin mogłoby teoretycznie być zasilane przez spalanie gazu (gas flaring) lub energię elektryczną, która w przeciwnym razie zostałaby utracona podczas przesyłu i dystrybucji. Drogą Ethereum do zrównoważonego rozwoju było zastąpienie energochłonnej części sieci zieloną alternatywą.

Możesz przeglądać szacunki zużycia energii i emisji dwutlenku węgla dla wielu branż na [stronie Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Szacunki na transakcję {#per-transaction-estimates}

Wiele artykułów szacuje zużycie energii „na transakcję” dla blockchainów. Może to być mylące, ponieważ energia wymagana do zaproponowania i zatwierdzenia bloku jest niezależna od liczby zawartych w nim transakcji. Jednostka zużycia energii na transakcję sugeruje, że mniejsza liczba transakcji prowadziłaby do mniejszego zużycia energii i odwrotnie, co nie jest prawdą. Ponadto szacunki na transakcję są bardzo wrażliwe na to, jak zdefiniowana jest przepustowość transakcji blockchaina, a modyfikowanie tej definicji może być wykorzystywane do sprawienia, by wartość wydawała się większa lub mniejsza.

W Ethereum na przykład przepustowość transakcji to nie tylko przepustowość warstwy bazowej – to także suma przepustowości transakcji wszystkich jej rollupów „[warstwy 2 (L2)](/layer-2/)”. Warstwy 2 na ogół nie są uwzględniane w obliczeniach, ale uwzględnienie dodatkowej energii zużywanej przez sekwencery (niewielkiej) i liczby przetwarzanych przez nie transakcji (dużej) prawdopodobnie drastycznie zmniejszyłoby szacunki na transakcję. Jest to jeden z powodów, dla których porównania zużycia energii na transakcję na różnych platformach mogą być mylące.

## Dług węglowy Ethereum {#carbon-debt}

Zużycie energii przez Ethereum jest bardzo niskie, ale nie zawsze tak było. Ethereum pierwotnie korzystało z dowodu pracy, który miał znacznie wyższy koszt środowiskowy niż obecny mechanizm dowodu stawki.

Od samego początku Ethereum planowało wdrożenie mechanizmu konsensusu opartego na dowodzie stawki, ale zrobienie tego bez poświęcania bezpieczeństwa i decentralizacji wymagało lat ukierunkowanych badań i rozwoju. Dlatego do uruchomienia sieci użyto mechanizmu dowodu pracy. Dowód pracy wymaga od górników użycia ich sprzętu komputerowego do obliczenia wartości, co wiąże się ze zużyciem energii w tym procesie.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI szacuje, że The Merge zmniejszyło roczne zużycie energii elektrycznej przez Ethereum o ponad **99,988%**. Podobnie ślad węglowy Ethereum został zmniejszony o około **99,992%** (z 11 016 000 do 870 ton CO2e). Aby uświadomić sobie skalę, redukcja emisji jest jak przejście od wysokości Wieży Eiffla do małej plastikowej figurki, jak zilustrowano na powyższym rysunku. W rezultacie koszt środowiskowy zabezpieczenia sieci został drastycznie zmniejszony. Jednocześnie uważa się, że bezpieczeństwo sieci uległo poprawie.

## Zielona warstwa aplikacji {#green-applications}

Chociaż zużycie energii przez Ethereum jest bardzo niskie, istnieje również znaczna, rosnąca i wysoce aktywna społeczność [**finansów regeneracyjnych (ReFi)**](/refi/) budująca na Ethereum. Aplikacje ReFi wykorzystują komponenty zdecentralizowanych finansów (DeFi) do budowania aplikacji finansowych, które mają pozytywne efekty zewnętrzne przynoszące korzyści środowisku. ReFi jest częścią szerszego ruchu [„solarpunk”](https://en.wikipedia.org/wiki/Solarpunk), który jest ściśle powiązany z Ethereum i ma na celu połączenie postępu technologicznego z dbałością o środowisko. Zdecentralizowany, niewymagający pozwoleń i komponowalny charakter Ethereum czyni go idealną warstwą bazową dla społeczności ReFi i solarpunk.

Natywne dla Web3 platformy finansowania dóbr publicznych, takie jak [Gitcoin](https://gitcoin.co), prowadzą rundy klimatyczne, aby stymulować świadome ekologicznie budowanie w warstwie aplikacji Ethereum. Poprzez rozwój tych inicjatyw (i innych, np. [zdecentralizowanej nauki (DeSci)](/desci/)), Ethereum staje się technologią o pozytywnym wpływie netto na środowisko i społeczeństwo.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Jeśli uważasz, że ta strona może być dokładniejsza, zgłoś problem (issue) lub utwórz pull request (PR). Statystyki na tej stronie są szacunkami opartymi na publicznie dostępnych danych – nie stanowią oficjalnego oświadczenia ani obietnicy ze strony zespołu ethereum.org ani Fundacji Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Dalsza lektura {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Raport Białego Domu na temat blockchainów opartych na dowodzie pracy](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisje Ethereum: Szacunki oddolne](https://kylemcdonald.github.io/ethereum-emissions/) – _Kyle McDonald_
- [Indeks zużycia energii przez Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge – Wpływ na zużycie energii elektrycznej i ślad węglowy sieci Ethereum](https://carbon-ratings.com/eth-report-2022) – _CCRI_
- [Zużycie energii przez Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Powiązane tematy {#related-topics}

- [Beacon Chain](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)