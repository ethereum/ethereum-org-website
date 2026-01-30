---
title: Jak Połączenie wpłynęło na podaż ETH
description: Analiza wpływu Połączenia na podaż ETH
lang: pl
---

# Jak Połączenie wpłynęło na podaż ETH {#how-the-merge-impacts-ETH-supply}

Połączenie reprezentowało przejście sieci Ethereum z proof-of-work na proof-of-stake, które miało miejsce we wrześniu 2022. Sposób emitowania ETH uległ zmianie w czasie tego przejścia. Wcześniej nowe ETH było emitowane z dwóch źródeł: warstwy wykonawczej (tj. sieci głównej) i warstwy konsensusu (tj. Łańcucha śledzącego). Od czasu Połączenia emisja na warstwie wykonawczej wynosi teraz zero. Przeanalizujmy to.

## Składniki emisji ETH {#components-of-eth-issuance}

Możemy podzielić podaż ETH na dwie główne siły: emisję i spalanie.

**Emisja** ETH to proces tworzenia ETH, które wcześniej nie istniało. **Spalanie** ETH ma miejsce, gdy istniejące ETH ulega zniszczeniu, co skutkuje jego usunięciem z obiegu. Prędkość emisji i spalania jest obliczana na podstawie kilku parametrów, a równowaga między nimi określa uzyskany wskaźnik inflacji/deflacji etheru.

<Card
emoji=":chart_decreasing:"
title="Emisja ETH w skrócie">

- Przed przejściem na proof-of-stake górnicy otrzymywali w ramach emisji około 13 000 ETH/dzień
- Stakerzy otrzymują w ramach emisji około 1700 ETH/dzień, przy około 14 milionach zestakowanych ETH
- Dokładna emisja ze stakowania zmienia się w zależności od całkowitej kwoty zestakowanego ETH
- **Od czasu Połączenia pozostaje tylko ~1700 ETH/dzień, co obniża całkowitą nową emisję ETH o ~88%**
- Spalanie: Waha się w zależności od zapotrzebowania sieci. _Jeśli_ w danym dniu odnotowana zostanie średnia cena gazu wynosząca co najmniej 16 gwei, skutecznie równoważy to około 1700 ETH, które są wydawane walidatorom i sprowadza inflację netto ETH do zera lub niższego poziomu w danym dniu.

</Card>

## Przed Połączeniem (dane historyczne) {#pre-merge}

### Emisja warstwy wykonawczej {#el-issuance-pre-merge}

W ramach proof-of-work górnicy wchodzili w interakcję tylko z warstwą wykonawczą i byli nagradzani nagrodami za blok, jeśli byli pierwszymi górnikami, którzy rozwiązali następny blok. Od aktualizacji [Constantinople](/ethereum-forks/#constantinople) w 2019 r. nagroda ta wynosiła 2 ETH za blok. Górnicy byli również nagradzani za publikowanie bloków [ommer](/glossary/#ommer), które były prawidłowymi blokami, które nie trafiły do najdłuższego/kanonicznego łańcucha. Nagrody te wynosiły maksymalnie 1,75 ETH za ommer i były _dodatkiem_ do nagrody wydawanej za blok kanoniczny. Proces kopania był ekonomicznie intensywną działalnością, która w przeszłości wymagała wysokiego poziomu emisji ETH do podtrzymania.

### Emisja warstwy konsensusu {#cl-issuance-pre-merge}

[Beacon Chain](/ethereum-forks/#beacon-chain-genesis) został uruchomiony w 2020 r. Zamiast górników jest on zabezpieczany przez walidatory wykorzystujące proof-of-stake. Łańcuch ten został uruchomiony przez użytkowników Ethereum wpłacających ETH w jedną stronę do inteligentnego kontraktu w sieci głównej (warstwa wykonawcza), którego nasłuchuje łańcuch śledzący, przyznając użytkownikowi taką samą ilość ETH w nowym łańcuchu. Dopóki nie nastąpiło Połączenie, walidatory łańcucha śledzącego nie przetwarzały transakcji i zasadniczo dochodziły do konsensusu na temat stanu samej puli walidatorów.

Walidatory w łańcuchu śledzącym są nagradzane ETH za poświadczanie stanu łańcucha i proponowanie bloków. Nagrody (lub kary) są obliczane i rozdzielane w każdej epoce (co 6,4 minuty) na podstawie wydajności walidatora. Nagrody dla walidatorów są **znacznie** niższe niż nagrody za wydobycie, które były wcześniej emitowane w ramach proof-of-work (2 ETH co ~13,5 sekundy), ponieważ obsługa węzła walidacyjnego nie jest tak intensywna ekonomicznie i w związku z tym nie wymaga tak wysokiej nagrody.

### Podział emisji przed Połączeniem {#pre-merge-issuance-breakdown}

Całkowita podaż ETH: **~120 520 000 ETH** (w momencie Połączenia we wrześniu 2022 r.)

**Emisja warstwy wykonawczej:**

- Została oszacowana na 2,08 ETH na 13,3 sekundy\*: **~4 930 000** ETH emitowanych w ciągu roku
- Skutkowało to stopą inflacji wynoszącą **około 4,09%** (4,93 mln rocznie / 120,5 mln łącznie)
- \*Obejmuje to 2 ETH za blok kanoniczny plus średnio 0,08 ETH za czas z bloków ommer. Używa również 13,3 sekundy, docelowego bazowego czasu bloku bez żadnego wpływu [bomby trudności](/glossary/#difficulty-bomb). ([Zobacz źródło](https://bitinfocharts.com/ethereum/))

**Emisja warstwy konsensusu:**

- Przy 14 000 000 ETH w stakowaniu, wskaźnik emisji ETH wynosi około 1700 ETH/dzień ([Zobacz źródło](https://ultrasound.money/))
- Skutkuje to emisją **~620 500** ETH w ciągu roku
- Skutkowało to stopą inflacji wynoszącą **około 0,52%** (620,5 tys. rocznie / 119,3 mln łącznie)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Całkowita roczna stopa emisji (przed Połączeniem): ~4,61%** (4,09% + 0,52%)

**~88,7%** emisji trafiało do górników w warstwie wykonawczej (4,09 / 4,61 \* 100)

**~11,3%** było emitowane dla stakerów w warstwie konsensusu (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Po Połączeniu (obecnie) {#post-merge}

### Emisja warstwy wykonawczej {#el-issuance-post-merge}

Emisja warstwy wykonawczej od czasu Połączenia wynosi zero. Proof-of-work nie jest już prawidłowym sposobem produkcji bloków w ramach zaktualizowanych zasad konsensusu. Cała aktywność warstwy wykonawczej jest pakowana w \"bloki śledzące\", które są publikowane i poświadczane przez walidatorów proof-of-stake. Nagrody za poświadczanie i publikowanie bloków śledzących są rozliczane oddzielnie w warstwie konsensusu.

### Emisja warstwy konsensusu {#cl-issuance-post-merge}

Emisja w warstwie konsensusu trwa do dziś, tak jak przed Połączeniem, z niewielkimi nagrodami dla walidatorów, którzy poświadczają i proponują bloki. Nagrody dla walidatorów są nadal doliczane do _sald walidatorów_, które są zarządzane w warstwie konsensusu. W przeciwieństwie do istniejących kont (kont \"wykonawczych\"), które mogą przeprowadzać transakcje w sieci Mainnet, te oddzielne konta Ethereum nie mogą swobodnie przeprowadzać transakcji z innymi kontami Ethereum. Środki z tych kont można wypłacić tylko na jeden określony adres wykonawczy.

Od aktualizacji Shanghai/Capella, która miała miejsce w kwietniu 2023 r., wypłaty te zostały włączone dla stakerów. Stakerzy są zachęcani do wypłacania swoich _zarobków/nagród (salda powyżej 32 ETH)_, ponieważ w przeciwnym razie środki te nie powiększają wagi ich stawki (która wynosi maksymalnie 32).

Stakerzy mogą również zdecydować się na wyjście i wypłatę całego salda walidatora. Aby zapewnić stabilność Ethereum, liczba walidatorów opuszczających sieć jednocześnie jest ograniczona.

Około 0,33% całkowitej liczby walidatorów może wyjść w ciągu jednego dnia. Domyślnie czterech (4) walidatorów może wyjść na epokę (co 6,4 minuty, czyli 900 dziennie). Dodatkowy jeden (1) walidator może wyjść na każde 65 536 (2<sup>16</sup>) dodatkowych walidatorów powyżej 262 144 (2<sup>18</sup>). Na przykład, przy ponad 327 680 walidatorach, pięciu (5) może wyjść na epokę (1125 dziennie). Sześciu (6) będzie mogło wyjść przy łącznej liczbie aktywnych walidatorów powyżej 393 216 i tak dalej.

W miarę jak coraz więcej walidatorów dokonuje wypłaty, maksymalna liczba wychodzących walidatorów będzie stopniowo zmniejszana do minimum czterech, aby celowo zapobiec jednoczesnemu wycofywaniu dużych, destabilizujących kwot zestakowanego ETH.

### Podział inflacji po Połączeniu {#post-merge-inflation-breakdown}

- Całkowita podaż ETH: **~120 520 000 ETH** (w momencie Połączenia we wrześniu 2022 r.)
- Emisja warstwy wykonawczej: **0**
- Emisja w warstwie konsensusu: Tak samo jak powyżej, roczna stopa emisji na poziomie **~0,52%** (przy 14 milionach zestakowanych ETH)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Całkowita roczna stopa emisji: **~0,52%**

Redukcja netto rocznej emisji ETH: **~88,7%** ((4,61% - 0,52%) / 4,61% \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> Spalanie {#the-burn}

Siłą przeciwną do emisji ETH jest tempo, w jakim ETH jest spalane. Aby transakcja została wykonana na Ethereum, należy uiścić minimalną opłatę (zwaną „opłatą bazową”), która ciągle się zmienia (blok po bloku) w zależności od aktywności sieci. Opłata jest uiszczana w ETH i jest _wymagana_, aby transakcja została uznana za ważną. Opłata ta jest _spalana_ w trakcie procesu transakcji, co powoduje usunięcie jej z obiegu.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Spalanie opłat zostało wprowadzone wraz z [aktualizacją London](/ethereum-forks/#london) w sierpniu 2021 r. i pozostaje niezmienione od czasu Połączenia. </AlertDescription> </AlertContent> </Alert>

Oprócz spalania opłat wprowadzonych przez aktualizację London, walidatory mogą również ponosić kary za bycie offline lub, co gorsza, mogą zostać odcięte za złamanie określonych zasad, które zagrażają bezpieczeństwu sieci. Kary te skutkują potrąceniem ETH z salda danego walidatora, które nie jest bezpośrednio przekazywane jako nagroda na żadne inne konto, skutecznie spalając/usuwając je z obiegu.

### Obliczanie średniej ceny gazu dla deflacji {#calculating-average-gas-price-for-deflation}

Jak wspomnieliśmy powyżej, ilość wyemitowanych ETH w danym dniu zależy od łącznej ilości zestakowanych ETH. W chwili pisania tego tekstu jest to około 1700 ETH na dzień.

Aby określić średnią cenę gazu wymaganą do całkowitego zrównoważenia tej emisji w danym 24-godzinnym okresie, zaczniemy od obliczenia całkowitej liczby bloków w ciągu dnia, biorąc pod uwagę czas bloku wynoszący 12 sekund:

- `(1 blok / 12 sekund) * (60 sekund/minuta) = 5 bloków/minuta`
- `(5 bloków/minuta) * (60 minut/godzina) = 300 bloków/godzina`
- `(300 bloków/godzina) * (24 godziny/dzień) = 7200 bloków/dzień`

Każdy blok ma docelowo `15x10^6 gazu/blok` ([więcej o gazie](/developers/docs/gas/)). Korzystając z tego, możemy obliczyć średnią cenę gazu (w jednostkach gwei/gaz) wymaganą do zrównoważenia emisji, przyjmując, że całkowita dzienna emisja ETH wynosi 1700 ETH:

- `7200 bloków/dzień * 15x10^6 gazu/blok * `**`Y gwei/gaz`**` * 1 ETH/10^9 gwei = 1700 ETH/dzień`

Rozwiązanie dla `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (w zaokrągleniu do dwóch cyfr znaczących)

Innym sposobem na przekształcenie tego ostatniego kroku byłoby zastąpienie `1700` zmienną `X`, która reprezentuje dzienną emisję ETH i uproszczenie reszty do:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Możemy to uprościć i zapisać jako funkcję `X`:

- `f(X) = X/108`, gdzie `X` to dzienna emisja ETH, a `f(X)` reprezentuje cenę gwei/gaz wymaganą do zrównoważenia wszystkich nowo wyemitowanych ETH.

Tak więc, na przykład, jeśli `X` (dzienna emisja ETH) wzrośnie do 1800 w oparciu o całkowitą liczbę zestakowanych ETH, `f(X)` (gwei wymagane do zrównoważenia całej emisji) wyniesie `17 gwei` (przy użyciu 2 cyfr znaczących)

## Dalsza lektura {#further-reading}

- [Połączenie](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _pulpity nawigacyjne dostępne do wizualizacji emisji i spalania ETH w czasie rzeczywistym_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020_
