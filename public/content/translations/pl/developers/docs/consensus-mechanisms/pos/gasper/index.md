---
title: Gasper
description: "Wyjaśnienie mechanizmu dowodu stawki (PoS) Gasper."
lang: pl
---

Gasper to połączenie Casper the Friendly Finality Gadget (Casper FFG) oraz algorytmu wyboru rozwidlenia LMD-GHOST. Razem te komponenty tworzą mechanizm konsensusu zabezpieczający Ethereum oparte na dowodzie stawki (PoS). Casper to mechanizm, który zmienia status niektórych bloków na „sfinalizowany”, dzięki czemu nowi uczestnicy sieci mogą mieć pewność, że synchronizują kanoniczny łańcuch. Algorytm wyboru rozwidlenia wykorzystuje zgromadzone głosy, aby zapewnić, że węzły mogą łatwo wybrać to właściwe, gdy w blockchainie pojawią się rozwidlenia.

**Uwaga:** oryginalna definicja Casper FFG została nieznacznie zaktualizowana w celu włączenia jej do Gasper. Na tej stronie omawiamy zaktualizowaną wersję.

## Wymagania wstępne {#prerequisites}

Aby zrozumieć ten materiał, konieczne jest przeczytanie strony wprowadzającej na temat [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Rola Gasper {#role-of-gasper}

Gasper działa na szczycie blockchaina opartego na dowodzie stawki, gdzie węzły dostarczają ether jako depozyt zabezpieczający, który może zostać zniszczony, jeśli są leniwe lub nieuczciwe podczas proponowania lub walidacji bloków. Gasper to mechanizm określający, w jaki sposób walidatory są nagradzane i karane, jak decydują, które bloki zaakceptować, a które odrzucić, oraz na którym rozwidleniu blockchaina budować.

## Czym jest ostateczność? {#what-is-finality}

Ostateczność to właściwość niektórych bloków, która oznacza, że nie mogą one zostać cofnięte, chyba że nastąpiła krytyczna awaria konsensusu, a atakujący zniszczył co najmniej 1/3 całkowitego stakowanego etheru. Sfinalizowane bloki można traktować jako informacje, co do których blockchain ma pewność. Aby blok został sfinalizowany, musi przejść przez dwuetapową procedurę zmiany statusu:

1. Dwie trzecie całkowitego stakowanego etheru musi oddać głos za włączeniem tego bloku do kanonicznego łańcucha. Ten warunek zmienia status bloku na „uzasadniony”. Uzasadnione bloki rzadko są cofane, ale może się to zdarzyć w określonych warunkach.
2. Kiedy kolejny blok zostanie uzasadniony na szczycie uzasadnionego bloku, jego status zmienia się na „sfinalizowany”. Sfinalizowanie bloku to zobowiązanie do włączenia go do kanonicznego łańcucha. Nie można go cofnąć, chyba że atakujący zniszczy miliony etherów (miliardy dolarów).

Te zmiany statusu bloków nie zdarzają się w każdym slocie. Zamiast tego tylko bloki na granicy epoki mogą zostać uzasadnione i sfinalizowane. Bloki te są znane jako „punkty kontrolne”. Zmiana statusu uwzględnia pary punktów kontrolnych. Pomiędzy dwoma kolejnymi punktami kontrolnymi musi istnieć „powiązanie większości kwalifikowanej” (tj. dwie trzecie całkowitego stakowanego etheru głosuje, że punkt kontrolny B jest właściwym potomkiem punktu kontrolnego A), aby zmienić status starszego punktu kontrolnego na sfinalizowany, a nowszego bloku na uzasadniony.

Ponieważ ostateczność wymaga zgody dwóch trzecich, że blok jest kanoniczny, atakujący nie może stworzyć alternatywnego sfinalizowanego łańcucha bez:

1. Posiadania lub manipulowania dwiema trzecimi całkowitego stakowanego etheru.
2. Zniszczenia co najmniej jednej trzeciej całkowitego stakowanego etheru.

Pierwszy warunek wynika z faktu, że do sfinalizowania łańcucha wymagane są dwie trzecie stakowanego etheru. Drugi warunek wynika z tego, że jeśli dwie trzecie całkowitej stawki zagłosowało za obydwoma rozwidleniami, to jedna trzecia musiała zagłosować na oba. Podwójne głosowanie to warunek cięcia, który zostałby maksymalnie ukarany, a jedna trzecia całkowitej stawki zostałaby zniszczona. Według stanu na maj 2022 r. wymaga to od atakującego spalenia etheru o wartości około 10 miliardów dolarów. Algorytm, który uzasadnia i finalizuje bloki w Gasper, jest nieco zmodyfikowaną formą [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Zachęty i cięcia {#incentives-and-slashing}

Walidatory są nagradzane za uczciwe proponowanie i walidację bloków. Ether jest przyznawany jako nagroda i dodawany do ich stawki. Z drugiej strony walidatory, które są nieobecne i nie podejmują działań, gdy są do tego wezwane, tracą te nagrody, a czasami tracą niewielką część swojej dotychczasowej stawki. Jednak kary za bycie offline są niewielkie i w większości przypadków sprowadzają się do kosztów alternatywnych utraconych nagród. Jednak niektóre działania walidatorów są bardzo trudne do wykonania przypadkowo i oznaczają złośliwą intencję, takie jak proponowanie wielu bloków dla tego samego slotu, poświadczanie wielu bloków dla tego samego slotu lub zaprzeczanie poprzednim głosom na punkty kontrolne. Są to zachowania „podlegające cięciu”, które są karane surowiej – cięcie skutkuje zniszczeniem części stawki walidatora i usunięciem go z sieci walidatorów. Proces ten trwa 36 dni. Pierwszego dnia nakładana jest początkowa kara w wysokości do 1 ETH. Następnie ether ściętego walidatora powoli wycieka przez cały okres wyjścia, ale 18. dnia otrzymuje on „karę korelacyjną”, która jest tym większa, im więcej walidatorów zostanie ściętych w tym samym czasie. Maksymalną karą jest cała stawka. Te nagrody i kary mają na celu zachęcenie uczciwych walidatorów i zniechęcenie do ataków na sieć.

### Wyciek za nieaktywność {#inactivity-leak}

Oprócz bezpieczeństwa Gasper zapewnia również „wiarygodną żywotność” (plausible liveness). Jest to warunek, w którym dopóki dwie trzecie całkowitego stakowanego etheru głosuje uczciwie i przestrzega protokołu, łańcuch będzie w stanie się sfinalizować niezależnie od jakiejkolwiek innej aktywności (takiej jak ataki, problemy z opóźnieniami lub cięcia). Innymi słowy, jedna trzecia całkowitego stakowanego etheru musi zostać w jakiś sposób skompromitowana, aby zapobiec sfinalizowaniu łańcucha. W Gasper istnieje dodatkowa linia obrony przed awarią żywotności, znana jako „wyciek za nieaktywność”. Mechanizm ten aktywuje się, gdy łańcuch nie zdoła się sfinalizować przez ponad cztery epoki. Walidatory, które nie poświadczają aktywnie łańcucha większościowego, mają stopniowo uszczuplaną stawkę, dopóki większość nie odzyska dwóch trzecich całkowitej stawki, co gwarantuje, że awarie żywotności są tylko tymczasowe.

### Wybór rozwidlenia {#fork-choice}

Oryginalna definicja Casper FFG zawierała algorytm wyboru rozwidlenia, który narzucał regułę: `follow the chain containing the justified checkpoint that has the greatest height`, gdzie wysokość jest definiowana jako największa odległość od bloku genezy. W Gasper oryginalna reguła wyboru rozwidlenia jest przestarzała na rzecz bardziej wyrafinowanego algorytmu o nazwie LMD-GHOST. Należy zdać sobie sprawę, że w normalnych warunkach reguła wyboru rozwidlenia jest niepotrzebna – dla każdego slotu istnieje jeden proponujący blok, a uczciwe walidatory go poświadczają. Algorytm wyboru rozwidlenia jest wymagany tylko w przypadkach dużej asynchroniczności sieci lub gdy nieuczciwy proponujący blok dopuścił się dwuznaczności (equivocation). Jednak gdy takie przypadki się pojawią, algorytm wyboru rozwidlenia stanowi krytyczną obronę, która zabezpiecza właściwy łańcuch.

LMD-GHOST to skrót od „latest message-driven greedy heaviest observed sub-tree” (zachłanne, najcięższe obserwowane poddrzewo sterowane najnowszymi wiadomościami). Jest to pełen żargonu sposób zdefiniowania algorytmu, który wybiera rozwidlenie z największą skumulowaną wagą poświadczeń jako kanoniczne (zachłanne najcięższe poddrzewo) i w którym, jeśli od walidatora otrzymano wiele wiadomości, brana jest pod uwagę tylko ta najnowsza (sterowane najnowszymi wiadomościami). Przed dodaniem najcięższego bloku do swojego kanonicznego łańcucha, każdy walidator ocenia każdy blok za pomocą tej reguły.

## Dalsza lektura {#further-reading}

- [Gasper: Combining GHOST and Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)