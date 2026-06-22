---
title: Jak The Merge wpłynęło na podaż ETH
description: Szczegółowe zestawienie wpływu The Merge na podaż ETH
lang: pl
---

The Merge stanowiło przejście sieci [Ethereum](/) z dowodu pracy (PoW) na dowód stawki (PoS), które miało miejsce we wrześniu 2022 roku. Sposób emisji ETH uległ zmianie w momencie tego przejścia. Wcześniej nowe ETH było emitowane z dwóch źródeł: warstwy wykonawczej (tj. Sieci głównej) i warstwy konsensusu (tj. Beacon Chain). Od czasu The Merge emisja w warstwie wykonawczej wynosi zero. Przeanalizujmy to szczegółowo.

## Składniki emisji ETH {#components-of-eth-issuance}

Podaż ETH możemy podzielić na dwie główne siły: emisję i spalanie.

**Emisja** ETH to proces tworzenia ETH, które wcześniej nie istniało. **Spalanie** ETH ma miejsce, gdy istniejące ETH zostaje zniszczone, co usuwa je z obiegu. Wskaźnik emisji i spalania jest obliczany na podstawie kilku parametrów, a równowaga między nimi określa wynikową stopę inflacji/deflacji etheru.

<Card
emoji=":chart_decreasing:"
title="Emisja ETH w skrócie">

- Przed przejściem na dowód stawki (PoS), górnicy otrzymywali z emisji około 13 000 ETH dziennie
- Osoby stakujące otrzymują z emisji około 1700 ETH dziennie, przy założeniu około 14 milionów całkowitego stakowanego ETH
- Dokładna emisja ze stakingu waha się w zależności od całkowitej ilości stakowanego ETH
- **Od czasu The Merge pozostało tylko ~1700 ETH dziennie, co zmniejszyło całkowitą emisję nowego ETH o ~88%**
- Spalanie: Waha się w zależności od popytu w sieci. _Jeśli_ w danym dniu średnia cena gazu wynosi co najmniej 16 gwei, skutecznie równoważy to ~1700 ETH emitowanych dla walidatorów i sprowadza inflację netto ETH do zera lub poniżej zera w tym dniu.

</Card>

## Przed The Merge (historycznie) {#pre-merge}

### Emisja w warstwie wykonawczej {#el-issuance-pre-merge}

W ramach dowodu pracy (PoW), górnicy wchodzili w interakcję tylko z warstwą wykonawczą i otrzymywali nagrody za blok, jeśli jako pierwsi rozwiązali kolejny blok. Od czasu aktualizacji [Konstantynopol](/ethereum-forks/#constantinople) w 2019 roku nagroda ta wynosiła 2 ETH za blok. Górnicy byli również nagradzani za publikowanie bloków [ommer](/glossary/#ommer), które były prawidłowymi blokami, ale nie trafiły do najdłuższego/kanonicznego łańcucha. Nagrody te wynosiły maksymalnie 1,75 ETH za ommer i były przyznawane _dodatkowo_ do nagrody z bloku kanonicznego. Proces kopania był działalnością intensywną ekonomicznie, która historycznie wymagała wysokiego poziomu emisji ETH do utrzymania.

### Emisja w warstwie konsensusu {#cl-issuance-pre-merge}

[Beacon Chain](/ethereum-forks/#beacon-chain-genesis) został uruchomiony w 2020 roku. Zamiast górników, jest on zabezpieczany przez walidatory wykorzystujące dowód stawki (PoS). Łańcuch ten został zainicjowany przez użytkowników Ethereum, którzy jednokierunkowo deponowali ETH w inteligentnym kontrakcie w Sieci głównej (warstwie wykonawczej), którego Beacon Chain nasłuchuje, przypisując użytkownikowi równą kwotę ETH w nowym łańcuchu. Do czasu The Merge walidatory Beacon Chain nie przetwarzały transakcji i w zasadzie osiągały konsensus co do stanu samej puli walidatorów.

Walidatory w Beacon Chain są nagradzane ETH za poświadczanie stanu łańcucha i proponowanie bloków. Nagrody (lub kary) są obliczane i rozdzielane w każdej epoce (co 6,4 minuty) na podstawie wydajności walidatora. Nagrody dla walidatorów są **znacznie** niższe niż nagrody za kopanie, które były wcześniej emitowane w ramach dowodu pracy (2 ETH co ~13,5 sekundy), ponieważ obsługa węzła walidującego nie jest tak intensywna ekonomicznie, a zatem nie wymaga ani nie uzasadnia tak wysokiej nagrody.

### Zestawienie emisji przed The Merge {#pre-merge-issuance-breakdown}

Całkowita podaż ETH: **~120 520 000 ETH** (w momencie The Merge we wrześniu 2022 r.)

**Emisja w warstwie wykonawczej:**

- Szacowano ją na 2,08 ETH na 13,3 sekundy\*: **~4 930 000** ETH wyemitowanych w ciągu roku
- Skutkowało to stopą inflacji na poziomie **około 4,09%** (4,93 mln rocznie / 120,5 mln łącznie)
- \*Obejmuje to 2 ETH za blok kanoniczny oraz średnio 0,08 ETH w czasie z bloków ommer. Wykorzystuje również 13,3 sekundy, czyli docelowy bazowy czas bloku bez żadnego wpływu [bomby trudności](/glossary/#difficulty-bomb). ([Zobacz źródło](https://bitinfocharts.com/ethereum/))

**Emisja w warstwie konsensusu:**

- Przy 14 000 000 całkowitego stakowanego ETH, wskaźnik emisji ETH wynosi około 1700 ETH dziennie ([Zobacz źródło](https://ultrasound.money/))
- Daje to **~620 500** ETH wyemitowanych w ciągu roku
- Skutkowało to stopą inflacji na poziomie **około 0,52%** (620,5 tys. rocznie / 119,3 mln łącznie)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Całkowita roczna stopa emisji (przed The Merge): ~4,61%** (4,09% + 0,52%)

**~88,7%** emisji trafiało do górników w warstwie wykonawczej (4,09 / 4,61 * 100)

**~11,3%** było emitowane dla osób stakujących w warstwie konsensusu (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Po The Merge (obecnie) {#post-merge}

### Emisja w warstwie wykonawczej {#el-issuance-post-merge}

Emisja w warstwie wykonawczej od czasu The Merge wynosi zero. Dowód pracy nie jest już prawidłowym sposobem produkcji bloków zgodnie ze zaktualizowanymi zasadami konsensusu. Cała aktywność warstwy wykonawczej jest pakowana w „bloki beacon”, które są publikowane i poświadczane przez walidatory dowodu stawki. Nagrody za poświadczanie i publikowanie bloków beacon są rozliczane oddzielnie w warstwie konsensusu.

### Emisja w warstwie konsensusu {#cl-issuance-post-merge}

Emisja w warstwie konsensusu jest kontynuowana dzisiaj tak samo jak przed The Merge, z niewielkimi nagrodami dla walidatorów, którzy poświadczają i proponują bloki. Nagrody dla walidatorów nadal gromadzą się na _saldach walidatorów_, które są zarządzane w warstwie konsensusu. W przeciwieństwie do bieżących kont (kont „wykonawczych”), które mogą przeprowadzać transakcje w Sieci głównej, są to oddzielne konta Ethereum, które nie mogą swobodnie przeprowadzać transakcji z innymi kontami Ethereum. Środki z tych kont można wypłacić tylko na jeden określony adres wykonawczy.

Od czasu aktualizacji Szanghaj/Capella, która miała miejsce w kwietniu 2023 r., wypłaty te zostały udostępnione dla osób stakujących. Osoby stakujące są zachęcane do wypłacania swoich _zarobków/nagród (saldo powyżej 32 ETH)_, ponieważ w przeciwnym razie środki te nie przyczyniają się do wagi ich stawki (która wynosi maksymalnie 32).

Osoby stakujące mogą również zdecydować się na wyjście i wypłacenie całego salda walidatora. Aby zapewnić stabilność Ethereum, liczba walidatorów opuszczających sieć w tym samym czasie jest ograniczona.

Około 0,33% całkowitej liczby walidatorów może wyjść w danym dniu. Domyślnie czterech (4) walidatorów może wyjść w każdej epoce (co 6,4 minuty, czyli 900 dziennie). Dodatkowy jeden (1) walidator może wyjść na każde 65 536 (2<sup>16</sup>) dodatkowych walidatorów powyżej 262 144 (2<sup>18</sup>). Na przykład przy ponad 327 680 walidatorach, pięciu (5) może wyjść w każdej epoce (1125 dziennie). Sześciu (6) będzie dozwolonych przy całkowitej liczbie aktywnych walidatorów powyżej 393 216 i tak dalej.

W miarę jak coraz więcej walidatorów będzie się wycofywać, maksymalna liczba wychodzących walidatorów będzie stopniowo zmniejszana do minimum czterech, aby celowo zapobiec jednoczesnemu wycofywaniu dużych, destabilizujących ilości stakowanego ETH.

### Zestawienie inflacji po The Merge {#post-merge-inflation-breakdown}

- [Całkowita podaż ETH](/eth/supply/): **~120 520 000 ETH** (w momencie The Merge we wrześniu 2022 r.)
- Emisja w warstwie wykonawczej: **0**
- Emisja w warstwie konsensusu: Tak samo jak powyżej, **~0,52%** rocznej stopy emisji (przy 14 milionach całkowitego stakowanego ETH)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Całkowita roczna stopa emisji: **~0,52%**

Zmniejszenie netto rocznej emisji ETH: **~88,7%** ((4,61% - 0,52%) / 4,61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Spalanie {#the-burn}

Siłą przeciwną do emisji ETH jest tempo, w jakim ETH jest spalane. Aby transakcja została wykonana w Ethereum, należy uiścić minimalną opłatę (znaną jako „opłata podstawowa”), która stale się waha (z bloku na blok) w zależności od aktywności sieci. Opłata jest uiszczana w ETH i jest _wymagana_, aby transakcja została uznana za ważną. Opłata ta zostaje _spalona_ podczas procesu transakcji, co usuwa ją z obiegu.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Spalanie opłat zostało uruchomione wraz z [aktualizacją London](/ethereum-forks/#london) w sierpniu 2021 r. i pozostaje niezmienione od czasu The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Oprócz spalania opłat wdrożonego w ramach aktualizacji London, walidatory mogą również ponosić kary za bycie offline lub, co gorsza, mogą zostać ukarane cięciem za złamanie określonych zasad, które zagrażają bezpieczeństwu sieci. Kary te skutkują zmniejszeniem ilości ETH z salda tego walidatora, które nie jest bezpośrednio przyznawane żadnemu innemu kontu, co skutecznie spala/usuwa je z obiegu.

### Obliczanie średniej ceny gazu dla deflacji {#calculating-average-gas-price-for-deflation}

Jak omówiono powyżej, ilość ETH wyemitowanego w danym dniu zależy od całkowitego stakowanego ETH. W momencie pisania tego tekstu jest to około 1700 ETH dziennie.

Aby określić średnią cenę gazu wymaganą do całkowitego zrównoważenia tej emisji w danym okresie 24 godzin, zaczniemy od obliczenia całkowitej liczby bloków w ciągu dnia, przy założeniu czasu bloku wynoszącego 12 sekund:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Każdy blok ma docelowo `15x10^6 gas/block` ([więcej o gazie](/developers/docs/gas/)). Korzystając z tego, możemy obliczyć średnią cenę gazu (w jednostkach gwei/gaz) wymaganą do zrównoważenia emisji, przy założeniu całkowitej dziennej emisji ETH na poziomie 1700 ETH:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

Rozwiązując dla `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (zaokrąglając do dwóch cyfr znaczących)

Innym sposobem na przekształcenie tego ostatniego kroku byłoby zastąpienie `1700` zmienną `X`, która reprezentuje dzienną emisję ETH, i uproszczenie reszty do:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Możemy to uprościć i zapisać jako funkcję `X`:

- `f(X) = X/108` gdzie `X` to dzienna emisja ETH, a `f(X)` reprezentuje cenę gwei/gaz wymaganą do zrównoważenia całego nowo wyemitowanego ETH.

Zatem na przykład, jeśli `X` (dzienna emisja ETH) wzrośnie do 1800 na podstawie całkowitego stakowanego ETH, `f(X)` (gwei wymagane do zrównoważenia całej emisji) wyniesie wtedy `17 gwei` (przy użyciu 2 cyfr znaczących)

## Dalsza lektura {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _Pulpity nawigacyjne dostępne do wizualizacji emisji i spalania ETH w czasie rzeczywistym_
- [Wykresy emisji Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020_
