---
title: Jak Połączenie wpłynęło na podaż ETH
description: Analiza wpływu Połączenia na podaż ETH
lang: pl
---

# Jak Połączenie wpłynęło na podaż ETH {#how-the-merge-impacts-ETH-supply}

Połączenie reprezentowało przejście sieci Ethereum z proof-of-work na proof-of-stake, które miało miejsce we wrześniu 2022. Sposób emitowania ETH uległ zmianie w czasie tego przejścia. Wcześniej nowe ETH było emitowane z dwóch źródeł: warstwy wykonawczej (tj. sieci głównej) i warstwy konsensusu (tj. łańcucha śledzącego). Od czasu Połączenia emisja na warstwie wykonawczej wynosi teraz zero. Przeanalizujmy to.

## Składniki emisji ETH {#components-of-eth-issuance}

Możemy podzielić podaż ETH na dwie główne siły: emisję i spalanie.

**Emisja** ETH to proces tworzenia ETH, które wcześniej nie istniało. **Spalanie** ETH ma miejsce, gdy ETH ulega zniszczeniu, skutkując jego usunięciem z obiegu. Prędkość emisji i spalania jest obliczana na podstawie kilku parametrów, a równowaga między nimi określa uzyskany wskaźnik inflacji/deflacji etheru.

<Card
emoji=":chart_decreasing:"
title="tldr emisji ETH">

- Przed przejściem na proof-of-stake górnicy emitowali około 13 000 ETH dziennie
- Stakerzy emitują około 1700 ETH dziennie na podstawie około 14 milionów zestakowanych ETH
- Dokładna emisja ze stakingu zmienia się w zależności od całkowitej liczby zestakowanych ETH
- **Od czasu Połączenia pozostało tylko około 1700 ETH na dzień, co oznacza spadek całkowitej emisji nowych ETH o około 88%**
- Spalanie: zmienia się w zależności od zapotrzebowania sieci. _Jeśli_ w danym dniu odnotowana zostanie średnia cena gazu wynosząca co najmniej 16 gwei, skutecznie równoważy to około 1700 ETH, które są wydawane walidatorom i sprowadza inflację netto ETH do zera lub niższego poziomu w danym dniu.

</Card>

## Przed połączeniem (historia) {#pre-merge}

### Emisja warstwy wykonawczej {#el-issuance-pre-merge}

W ramach proof-of-work górnicy wchodzili w interakcję tylko z warstwą wykonawczą i byli nagradzani nagrodami za blok, jeśli byli pierwszymi górnikami, którzy rozwiązali następny blok. Od czasu [aktualizacji Constantinople](/history/#constantinople) w 2019 r. nagroda ta wynosiła 2 ETH za blok. Górnicy byli również nagradzani za publikowanie bloków [ommer](/glossary/#ommer), które były poprawnymi blokami, które nie trafiły do najdłuższego/kanonicznego łańcucha. Nagrody te osiągnęły maksymalną wartość 1,75 ETH za ommer i były _dodatkiem do_ nagrody wydanej z bloku kanonicznego. Proces kopania był ekonomicznie intensywną działalnością, która w przeszłości wymagała wysokiego poziomu emisji ETH do podtrzymania.

### Emisja warstwy konsensusu {#cl-issuance-pre-merge}

[Łańcuch śledzący](/history/#beacon-chain-genesis) został uruchomiony w 2020 r. Zamiast górników jest on zabezpieczany przez walidatory wykorzystujące proof-of-stake. Łańcuch ten został uruchomiony przez użytkowników Ethereum wpłacających ETH w jedną stronę do inteligentnego kontraktu w sieci głównej (warstwa wykonawcza), którego nasłuchuje łańcuch śledzący, przyznając użytkownikowi taką samą ilość ETH w nowym łańcuchu. Dopóki nie nastąpiło Połączenie, walidatory łańcucha śledzącego nie przetwarzały transakcji i zasadniczo dochodziły do konsensusu na temat stanu samej puli walidatorów.

Walidatory w łańcuchu śledzącym są nagradzane ETH za poświadczanie stanu łańcucha i proponowanie bloków. Nagrody (lub kary) są obliczane i rozdzielane w każdej epoce (co 6,4 minuty) na podstawie wydajności walidatora. Nagrody walidatora są **znacznie** niższe niż nagrody za kopanie, które wcześniej były emitowane w ramach proof-of-work (2 ETH co około 13,5 sekundy), ponieważ obsługa węzła walidacyjnego nie jest tak intensywna ekonomicznie, a zatem nie wymaga ani nie gwarantuje tak wysokiej nagrody.

### Zestawienie emisji przed Połączeniem {#pre-merge-issuance-breakdown}

Całkowita podaż ETH: **około 120.520.000 ETH** (w momencie Połączenia we wrześniu 2022)

**Emisja warstwy wykonawczej:**

- Została oszacowana na 2,08 ETH na 13,3 sekundy\*: **około 4 930 000** ETH emitowanych w ciągu roku
- Skutkowała stopą inflacji wynoszącą **około 4,09%** (4,93 mln rocznie / 120,5 mln łącznie)
- \*Obejmuje to 2 ETH za blok kanoniczny plus średnio 0,08 ETH za czas z bloków ommer. Wykorzystuje również 13,3 sekundy podstawowego czasu bloku bez żadnego wpływu [bomby trudności](/glossary/#difficulty-bomb). ([Sprawdź źródło](https://bitinfocharts.com/ethereum/))

**Emisja warstwy konsensusu:**

- Przy wykorzystaniu 14 000 000 łącznych zestakowanych ETH tempo emisji ETH wynosi około 1700 ETH dziennie ([Sprawdź źródło](https://ultrasound.money/))
- Skutkuje emisją **około 620 500** ETH rocznie
- Skutkowała stopą inflacji wynoszącą **około 0,52%** (620,5 tys. rocznie / 119,3 mln łącznie)

<InfoBanner>
<strong>Łączna roczna stopa emisji (przed Połączeniem): około 4,61%</strong> (4,09% + 0,52%)<br/><br/>
<strong>około 88,7%</strong> emisji trafiło do górników w warstwie wykonawczej (4,09 / 4,61 * 100)<br/><br/>
<strong>około 11,3%</strong> emisji trafiło do stakerów w warstwie konsensusu (0,52 / 4,61 * 100)
</InfoBanner>

## Po Połączeniu (dzień dzisiejszy) {#post-merge}

### Emisja warstwy wykonawczej {#el-issuance-post-merge}

Od czasu Połączenia, emisja warstwy wykonawczej wynosi zero. Proof-of-work nie jest już używanym środkiem produkcji bloków w ramach ulepszonych zasad konsensusu. Cała aktywność warstwy wykonawczej zawiera się w „blokach śledzących”, które są publikowane i poświadczane przez walidatory proof-of-stake. Nagrody za poświadczanie i publikowanie bloków śledzących są rozliczane oddzielnie w warstwie konsensusu.

### Emisja warstwy konsensusu {#cl-issuance-post-merge}

Emisja warstwy konsensusu trwa dziś dalej tak, jak przed Połączeniem, z niewielkimi nagrodami dla walidatorów, które poświadczają i proponują bloki. Nagrody walidatorów są nadal wliczane do _sald walidatorów_, które są zarządzane w warstwie konsensusu. W przeciwieństwie do bieżących kont (kont „wykonawczych”), które mogą dokonywać transakcji w sieci głównej, te oddzielne konta Ethereum nie mogą swobodnie dokonywać transakcji z innymi kontami Ethereum. Środki na tych kontach mogą być wypłacane tylko na jeden określony adres realizacji.

Od aktualizacji Shanghai/Capella, która miała miejsce w kwietniu 2023, te wypłaty zostały odblokowane dla stakerów. Stakerzy są zachęcani do usuwania swoich _zarobków/nagród (saldo powyżej 32 ETH)_, ponieważ w przeciwnym razie środki te nie są wliczane do ich wagi stawki (która wynosi maksymalnie 32).

Stakerzy mogą również zdecydować się na wyjście i wypłacenie całego salda walidatora. Dla zapewnienia stabilności Ethereum liczba walidatorów opuszczających ją jednocześnie jest ograniczona.

Około 0,33% całkowitej liczby walidatorów może opuścić platformę w danym dniu. Domyślnie cztery (4) walidatory mogą opuścić platformę w danej epoce (co 6,4 minuty lub 900 dziennie). Jeden dodatkowy (1) walidator ma pozwolenie na opuszczenie platformy za każde 65 536 (2<sup>16</sup>) dodatkowych walidatorów powyżej 262 144 (2<sup>18</sup>). Na przykład przy ponad 327680 walidatorach, pięć (5) może opuścić platformę w danej epoce (1 125 dziennie). Sześć (6) otrzyma pozwolenie przy całkowitej liczbie aktywnych walidatorów powyżej 393 216 itd.

W miarę wychodzenia większej liczby walidatorów maksymalna liczba wychodzących walidatorów będzie stopniowo zmniejszana do minimum czterech, co ma zapobiec jednoczesnemu wycofywaniu dużych destabilizujących ilości zestakowanych ETH.

### Analiza inflacji po Połączeniu {#post-merge-inflation-breakdown}

- Całkowita podaż ETH: **około 120.520.000 ETH** (w momencie Połączenia we wrześniu 2022)
- Emisja warstwy wykonawczej: **0**
- Emisja warstwy konsensusu: Taka jak powyżej, **około 0,52%** rocznej stopy emisji (przy 14 mln zestakowanego ETH)

<InfoBanner>
Całkowita roczna stopa emisji: <strong>około 0,52%</strong><br/><br/>
Redukcja netto w rocznej emisji ETH: <strong>około 88,7%</strong> ((4,61% - 0,52%) / 4,61% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" /> Spalanie {#the-burn}

Siłą przeciwną do emisji ETH jest tempo, w jakim ETH jest spalane. Aby transakcja została wykonana na Ethereum, należy uiścić minimalną opłatę (zwaną „opłatą bazową”), która ciągle się zmienia (blok po bloku) w zależności od aktywności sieci. Opłata jest uiszczana w ETH i jest _wymagana_, aby transakcja została uznana za poprawną. Opłata ta jest _spalana_ podczas procesu transakcji, co skutkuje usunięciem jej z obiegu.

<InfoBanner>
Spalanie opłat weszło w życie wraz z <a href="/history/#london">aktualizacją London</a> w sierpniu 2021 i pozostaje niezmienione od czasu Połączenia.
</InfoBanner>

Oprócz spalania opłat wprowadzonych przez aktualizację London, walidatory mogą również ponosić kary za bycie offline lub, co gorsza, mogą zostać odcięte za złamanie określonych zasad, które zagrażają bezpieczeństwu sieci. Kary te skutkują potrąceniem ETH z salda danego walidatora, które nie jest bezpośrednio przekazywane jako nagroda na żadne inne konto, skutecznie spalając/usuwając je z obiegu.

### Obliczanie średniej ceny gazu przy deflacji {#calculating-average-gas-price-for-deflation}

Jak wspomnieliśmy powyżej, ilość wyemitowanych ETH w danym dniu zależy od łącznej ilości zestakowanych ETH. W chwili pisania tego tekstu jest to około 1700 ETH na dzień.

Aby określić średnią cenę gazu wymaganą do całkowitego zrównoważenia tej emisji w danym 24-godzinnym okresie, zaczniemy od obliczenia całkowitej liczby bloków w ciągu dnia, biorąc pod uwagę czas bloku wynoszący 12 sekund:

- `(1 blok / 12 sekund) * (60 sekund/minuta) = 5 bloków/minuta`
- `(5 bloków/minuta) * (60 minut/godzina) = 300 bloków/godzina`
- `(300 bloków/godzina) * (24 godziny/dzień) = 7200 bloków/dzień`

Każdy blok stara się uzyskać `15x10^6 gazu na blok` ([więcej o gazie](/developers/docs/gas/)). Korzystając z tego, możemy obliczyć średnią cenę gazu (w jednostkach gwei/gaz) wymaganą do zrównoważenia emisji, przyjmując, że całkowita dzienna emisja ETH wynosi 1700 ETH:

- `7200 bloków/dzień * 15x10^6 gazu/blok *`**`Y gwei/gaz`**`* 1 ETH/10^9 gwei = 1700 ETH/dzień`

Rozwiązanie dla `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (zaokrąglone do dwóch cyfr znaczących)

Innym sposobem na przekształcenie tego ostatniego kroku byłoby zastąpienie `1700` zmienną `X`, która reprezentuje dzienną emisję ETH, i uproszczenie reszty do:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Możemy to uprościć i zapisać jako funkcję `X`:

- `f(X) = X/108`, gdzie `X` to dzienna emisja ETH, a `f(X)` reprezentuje cenę gwei/gaz wymaganą do zrównoważenia wszystkich nowo wyemitowanych ETH.

Tak więc na przykład jeśli `X` (dzienna emisja ETH) wzrośnie do 1800 na podstawie całkowitej liczby zestakowanych ETH, `f(X)` (gwei wymagane do zrównoważenia całej emisji) wyniesie `17 gwei` (przy użyciu 2 cyfr znaczących)

## Dalsza lektura {#further-reading}

- [Połączenie](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) — _Pulpity nawigacyjne do wizualizacji emisji i spalania ETH w czasie rzeczywistym_
- [Tworzenie wykresów emisji Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) — _Jim McDonald 2020_
