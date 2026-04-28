---
title: Gasper
description: "Wyjaśnienie mechanizmu „Proof-of stake”."
lang: pl
---

Gasper jest kombinacją Casper the Friendly Finality Gadget (Casper-FFG) i algorytmu wyboru zmiany LMD-GHOST. Łącznie te elementy tworzą mechanizm konsensusu zabezpieczający przed atakiem na Ethereum. Casper to mechanizm, który unowocześnia niektóre bloki do „sfinalizowanych”, tak aby nowi uczestnicy sieci mogli mieć pewność, że synchronizują łańcuch kanoniczny. Algorytm wyboru forka wykorzystuje zgromadzone głosy, aby upewnić się, że węzły mogą z łatwością wybrać prawidłową pozycję, gdy forki pojawią się w łańcuchu bloków (ang. "Blockchain").

**Uwaga!** Pierwotna definicja Casper-FFG została odrobinę zaktualizowana w celu uwzględnienia w Gasperze. Na tej stronie rozważamy zaktualizowaną wersję.

## Wymogi wstępne

Aby zrozumieć ten materiał, należy przeczytać stronę wprowadzającą na temat [dowodu stawki](/developers/docs/consensus-mechanisms/pos/).

## Rola Gaspera {#role-of-gasper}

Gasper opiera się na podstawach łańcucha bloków proof-of-stake, w którym węzły dostarczają token ether jako depozyt zabezpieczający, który może zostać zniszczony, jeśli owe węzły są leniwe lub nieuczciwe w proponowaniu lub walidacji bloków. Gasper to mechanizm definiujący, w jaki sposób walidatorzy są nagradzani i karani, decydują, które bloki akceptować i odrzucać oraz na którym forku blockchaina budować.

## Czym jest finalizacja? {#what-is-finality}

Ostateczność jest właściwością niektórych bloków, która oznacza, że nie można ich odwrócić, chyba że doszło do krytycznej awarii konsensusu, a atakujący zniszczył co najmniej 1/3 całkowitego stakowanego etheru. Sfinalizowane bloki można traktować jako informacje, co do których blockchain ma pewność. Blok musi przejść przez dwuetapową procedurę uaktualnienia, aby został sfinalizowany:

1. Dwie trzecie całkowitego stakowanego etheru musi zagłosować za włączeniem tego bloku do łańcucha kanonicznego. Ten warunek uaktualnia blok do statusu "uzasadniony". Jest mało prawdopodobne, że uzasadnione bloki zostaną odwrócone, ale w pewnych warunkach jest to możliwe.
2. Gdy kolejny blok zostanie uzasadniony na bazie uzasadnionego bloku, zostaje on uaktualniony do statusu "sfinalizowany". Sfinalizowanie bloku jest zobowiązaniem do włączenia go do łańcucha kanonicznego. Nie można go odwrócić, chyba że atakujący zniszczy ether o wartości milionów (miliardów USD).

Te uaktualnienia bloków nie zdarzają się w każdym slocie. Zamiast tego, tylko bloki graniczne epoki mogą być uzasadniane i finalizowane. Te bloki są znane jako "punkty kontrolne". Uaktualnianie uwzględnia pary punktów kontrolnych. Między dwoma kolejnymi punktami kontrolnymi musi istnieć "łącze superwiększości" (tzn. dwie trzecie całego stakowanego etheru głosuje, że punkt kontrolny B jest prawidłowym potomkiem punktu kontrolnego A), aby uaktualnić starszy punkt kontrolny do statusu sfinalizowany, a nowszy blok do statusu uzasadniony.

Ponieważ ostateczność wymaga zgody dwóch trzecich, że blok jest kanoniczny, atakujący nie może utworzyć alternatywnego sfinalizowanego łańcucha bez:

1. Posiadania lub manipulowania dwiema trzecimi całkowitego stakowanego etheru.
2. Zniszczenia co najmniej jednej trzeciej całkowitego stakowanego etheru.

Pierwszy warunek wynika z faktu, że do sfinalizowania łańcucha wymagane są dwie trzecie stakowanego etheru. Drugi warunek wynika z faktu, że jeśli dwie trzecie całkowitej stawki zagłosowało za obydwoma forkami, to jedna trzecia musiała zagłosować za obydwoma. Podwójne głosowanie jest warunkiem slashingu, który byłby maksymalnie ukarany, a jedna trzecia całkowitej stawki zostałaby zniszczona. Według stanu na maj 2022 r. wymaga to od atakującego spalenia etheru o wartości około 10 miliardów USD. Algorytm, który uzasadnia i finalizuje bloki w Gasperze, jest nieznacznie zmodyfikowaną formą [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Zachęty i slashing {#incentives-and-slashing}

Walidatorzy są nagradzani za uczciwe proponowanie i walidowanie bloków. Ether jest przyznawany jako nagroda i dodawany do ich stawki. Z drugiej strony, walidatorzy, którzy są nieobecni i nie podejmują działań, gdy są do tego wezwani, tracą te nagrody, a czasami niewielką część swojej istniejącej stawki. Jednak kary za bycie offline są niewielkie i w większości przypadków sprowadzają się do kosztów alternatywnych w postaci utraconych nagród. Jednak niektóre działania walidatorów są bardzo trudne do wykonania przypadkowo i świadczą o złośliwych zamiarach, takie jak proponowanie wielu bloków dla tego samego slotu, poświadczanie wielu bloków dla tego samego slotu lub zaprzeczanie poprzednim głosowaniom w punktach kontrolnych. Są to zachowania "podlegające slashingowi", które są surowiej karane – slashing skutkuje zniszczeniem części stawki walidatora i usunięciem go z sieci walidatorów. Ten proces trwa 36 dni. W Dniu 1 nakładana jest kara początkowa w wysokości do 1 ETH. Następnie ether walidatora poddanego slashingowi powoli wyczerpuje się w okresie wyjścia, ale w Dniu 18 otrzymuje on "karę korelacyjną", która jest większa, gdy więcej walidatorów zostanie poddanych slashingowi w tym samym czasie. Maksymalna kara to cała stawka. Te nagrody i kary mają na celu zachęcanie uczciwych walidatorów i zniechęcanie do ataków na sieć.

### Wyciek z powodu braku aktywności {#inactivity-leak}

Oprócz bezpieczeństwa Gasper zapewnia również "wiarygodną żywotność". Jest to warunek, że tak długo, jak dwie trzecie całkowitego stakowanego etheru głosuje uczciwie i zgodnie z protokołem, łańcuch będzie mógł zostać sfinalizowany niezależnie od jakiejkolwiek innej aktywności (takiej jak ataki, opóźnienia lub slashingi). Innymi słowy, jedna trzecia całkowitego stakowanego etheru musi zostać w jakiś sposób naruszona, aby zapobiec sfinalizowaniu łańcucha. W Gasperze istnieje dodatkowa linia obrony przed awarią żywotności, znana jako "wyciek z powodu braku aktywności". Mechanizm ten aktywuje się, gdy łańcuch nie został sfinalizowany przez ponad cztery epoki. Stawka walidatorów, którzy nie poświadczają aktywnie łańcucha większościowego, jest stopniowo uszczuplana, aż większość odzyska dwie trzecie całkowitej stawki, zapewniając, że awarie żywotności są tylko tymczasowe.

### Wybór forka {#fork-choice}

Oryginalna definicja Casper-FFG zawierała algorytm wyboru forka, który narzucał zasadę: `follow the chain containing the justified checkpoint that has the greatest height`, gdzie wysokość jest definiowana jako największa odległość od bloku genezy. W Gasperze oryginalna zasada wyboru forka jest wycofana na rzecz bardziej zaawansowanego algorytmu o nazwie LMD-GHOST. Należy pamiętać, że w normalnych warunkach zasada wyboru forka jest niepotrzebna – w każdym slocie jest jeden proponent bloku, a uczciwi walidatorzy go poświadczają. Algorytm wyboru forka jest wymagany tylko w przypadkach dużej asynchroniczności sieci lub gdy nieuczciwy proponent bloku postąpił dwuznacznie. Jednak gdy takie przypadki mają miejsce, algorytm wyboru forka jest kluczową obroną, która zabezpiecza prawidłowy łańcuch.

LMD-GHOST to skrót od "latest message-driven greedy heaviest observed sub-tree". Jest to pełen żargonu sposób zdefiniowania algorytmu, który wybiera jako kanoniczny fork z największą skumulowaną wagą poświadczeń (greedy heaviest subtree) i że jeśli od walidatora zostanie odebranych wiele wiadomości, pod uwagę brana jest tylko najnowsza (latest-message driven). Przed dodaniem najcięższego bloku do swojego łańcucha kanonicznego, każdy walidator ocenia każdy blok za pomocą tej zasady.

## Dalsza lektura {#further-reading}

- [Gasper: Łączenie GHOST i Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
