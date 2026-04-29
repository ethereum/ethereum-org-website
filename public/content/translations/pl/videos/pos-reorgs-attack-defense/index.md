---
title: "Gra w reorganizacje w Ethereum opartym na dowodzie stawki"
description: "Caspar Schwarz-Schilling prezentuje badania nad atakami polegającymi na reorganizacji bloków w Ethereum opartym na dowodzie stawki, omawiając wektory ataków, mechanizmy obronne i wdrożone środki zaradcze na poziomie protokołu."
lang: pl
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "konsensus"
  - "pos"
  - "bezpieczeństwo"
format: presentation
author: LisCon
breadcrumb: "Reorganizacje w PoS"
---

Ta prezentacja analizuje rodzaje reorganizacji bloków możliwe w Ethereum opartym na dowodzie stawki (PoS) oraz środki zaradcze mające im zapobiegać. Caspar Schwarz-Schilling, badacz w grupie Robust Incentives Group Fundacji Ethereum, omawia mechanikę reorganizacji ex-post i ex-ante, porównując krajobraz bezpieczeństwa między dowodem pracy (PoW) a dowodem stawki.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=xcPxwhrg3Ao) opublikowanego przez LisCon. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie i tło (0:03) {#introduction-and-background-003}

Witam serdecznie. Dzisiaj opowiem o reorganizacjach, które są możliwe w Ethereum opartym na dowodzie stawki (PoS).

Niedawno dołączyłem do Fundacji Ethereum, a dokładniej do grupy Robust Incentives Group. W zasadzie jesteśmy zespołem badawczym skupiającym się na wszystkim, co dotyczy zachęt. Będę się streszczał — ta prezentacja jest pełna materiału, a większość naszej pracy można znaleźć na GitHubie.

#### Dwa rodzaje reorganizacji (0:44) {#two-types-of-reorgs-044}

Dzisiaj chcę porozmawiać o reorganizacjach, a w szczególności chcę nakreślić dwa różne rodzaje reorganizacji, które są możliwe w sferze Ethereum opartego na dowodzie stawki.

Z jednej strony mamy **reorganizacje ex-post**, a z drugiej **reorganizacje ex-ante**. Wybaczcie mi nieco pretensjonalne łacińskie nazewnictwo, ale spełnia ono swoje zadanie.

Reorganizacje ex-post to mniej więcej to, o czym zazwyczaj myślimy, mówiąc o reorganizacjach. Przeciwnik widzi blok — jeśli jest wartościowy, może spróbować go zreorganizować. Na tym schemacie widzimy, że blok N+1 to blok, który atakujący chce usunąć poprzez reorganizację, a budując na tym samym bloku nadrzędnym N, jeśli to zadziała, blok N+3 jest następnie budowany na bloku N+2. To standardowa procedura.

Z kolei reorganizacje ex-ante są nieco inne. Chodzi o to, że atakujący musi rozpocząć atak, zanim w ogóle dowie się, jaki blok zamierza zreorganizować. Jak to mniej więcej działa? Na bardzo ogólnym poziomie, blok N+1 jest budowany na bloku N, ale nie jest natychmiast publikowany. Uczciwe węzły nawet nie wiedzą, że N+1 istnieje, więc będą kontynuować budowanie na N. Następnie, poprzez pewien mechanizm, N+1 zostaje opublikowany, a N+3 może uznać, że N+1 prowadzi i zbudować na nim, w wyniku czego N+2 zostaje faktycznie usunięty w ramach reorganizacji.

Można się zastanawiać, dlaczego w ogóle ktoś chciałby przeprowadzić taką reorganizację. Cóż, wciąż jest MEV do przechwycenia. Jeśli masz szczęście, blok N+2 ma dużo MEV — możesz to przechwycić, po prostu kopiując i wklejając zawartość tego bloku. W najgorszym przypadku masz w zasadzie transakcje z dwóch slotów do nasłuchiwania.

#### Reorganizacje ex-post w dowodzie pracy (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Zanim przejdę do reorganizacji ex-ante, które są głównym tematem tej prezentacji, pozwolę sobie krótko podsumować reorganizacje ex-post, zaczynając w szczególności od kontekstu dowodu pracy (PoW).

W zasadzie jest to podsumowanie wpisu na blogu autorstwa stałych bywalców — Georgiosa i Vitalika. Po prostu go przeczytajcie, jest świetny.

Krótko mówiąc, w Ethereum opartym na dowodzie pracy reorganizacje ex-post są trudne, ale nie są niewykonalne. Górnik posiadający 10% mocy obliczeniowej ma stosunkowo duże szanse na wykopanie kilku bloków z rzędu, a jeśli zachęta jest wystarczająco wysoka — wyobraźmy sobie jeden blok z MEV o wartości 100 ETH do przechwycenia — to być może jednoprocentowy wskaźnik sukcesu może faktycznie wystarczyć, aby opłacało się spróbować reorganizacji.

#### Reorganizacje ex-post w dowodzie stawki (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

W dowodzie stawki to zupełnie inna bajka. Mówimy o absurdalnej wymaganej kwocie stawki. Przeprowadzę was przez to, jak można by do tego podejść, aby tylko podkreślić, jak absurdalnie jest to trudne.

Może najpierw trochę podstaw. Czas w Ethereum opartym na dowodzie stawki płynie w slotach. Każdy slot trwa 12 sekund. W każdym slocie występują dwie role: mamy proponującego — dokładnie jednego proponującego — oraz komitet tysięcy poświadczających, którzy mają za zadanie poświadczać bloki, o których usłyszą w warstwie P2P. Określają oni szczyt łańcucha, uruchamiając algorytm wyboru rozwidlenia, który w zasadzie jest funkcją przyjmującą drzewo bloków jako dane wejściowe i zwracającą szczyt łańcucha.

Masz poświadczać bloki, jeśli usłyszysz prawidłowy blok, lub w czwartej sekundzie trwania slotu — w zależności od tego, co nastąpi wcześniej. Więc jeśli z jakiegoś powodu proponujący blok N+1 jest offline i nie ma bloku w czwartej sekundzie slotu, poświadczasz blok N. Jeśli usłyszysz go na czas, poświadczasz blok N+1. Proste.

Wszystkie te poświadczenia nadają wagę blokom, a ta waga jest wykorzystywana przez wybór rozwidlenia do określenia, co jest najnowszym szczytem.

Teraz prześledźmy reorganizację jednego bloku. Na początku wszystko toczy się normalnie — wszyscy poświadczają blok N, nawet atakujący. Następnie N+1 jest budowany na N, a ponieważ atakujący nie chce nadawać wagi blokowi, który próbuje zreorganizować, zamiast tego poświadcza blok N. Blok N zyskuje dużą wagę, ponieważ atakujący ma dwie trzecie komitetu — co oznacza, że musi kontrolować, z grubsza rzecz biorąc, dwie trzecie całej stawki.

Jedna trzecia uczciwych uczestników poświadczyła N+1, dwie trzecie N. Teraz pojawia się blok N+2 — oczywiście atakujący buduje go na N i poświadcza swój własny blok. Z punktu widzenia uczciwych walidatorów, N+1 wciąż prowadzi pod względem wagi, ponieważ zarówno N+1, jak i N+2 dziedziczą całą wagę bloku N, ale N+1 ma również tę jedną trzecią poświadczeń, której brakuje N+2.

Jeśli to podsumujemy — blok N+1 ma poświadczenia warte jedną trzecią plus jedną trzecią, co daje dwie trzecie, a blok N+2 również ma dwie trzecie. Dla uproszczenia załóżmy, że rozstrzygnięcie remisu działa na korzyść atakującego. Wtedy N+3 uzna N+2 za prowadzący i zostanie na nim zbudowany.

Aby dać wam wyobrażenie, jak absurdalne są te założenia — nawet jeśli byłbyś stakującym posiadającym 65% stawki, prawdopodobieństwo kontrolowania dwóch trzecich komitetu w dowolnym slocie wynosi 0,05%. To pokazuje, że siła równoległych poświadczeń jest realna — reorganizacje ex-post są niezwykle trudne, jeśli nie praktycznie niemożliwe, w Ethereum opartym na dowodzie stawki.

#### Mechanika ataku reorganizacji ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Teraz opowiem o reorganizacjach ex-ante. Ten atak opiera się na artykule Neudera i innych. Niedawno znacznie ulepszyliśmy ten atak. Napisaliśmy również o nim artykuł i udało nam się go przesłać na arXiv w samą porę.

Z góry też zaznaczam — nie martwcie się, istnieją środki zaradcze. Zostaną one wdrożone przed The Merge.

Jak działa atak reorganizacji ex-ante? Początkowo, blok N — wszystko w normie, wszyscy go poświadczają. Teraz jesteś proponującym N+1. Proponujesz go i poświadczasz prywatnie za pomocą pojedynczego walidatora. Co ważne, zachowujesz go w tajemnicy — nie publikujesz go i nie propagujesz w warstwie P2P.

Dzieje się tak, że uczciwi uczestnicy nie widzą bloku N+1, więc poświadczą blok N. Na tym polega sztuczka — dziedziczysz tę wagę i nie musisz z nią faktycznie walczyć.

Załóżmy na chwilę zerowe opóźnienie. W slocie N+2, jako atakujący, publikujemy blok N+1 i prywatne poświadczenie w tym samym czasie. Uczciwi walidatorzy w slocie N+2 muszą poświadczyć blok. Z ich perspektywy widzą blok N+2 oraz blok N+1 z tym jednym prywatnym poświadczeniem. Jeśli uruchomią wybór rozwidlenia, odkryją, że blok N+1 ma większą wagę niż blok N+2, ponieważ N+1 ma prywatne poświadczenie, którego N+2 nie posiada. Nawet wszyscy uczciwi walidatorzy faktycznie poświadczą blok N+1. W N+3, co oczywiste, N+1 będzie postrzegany jako szczyt łańcucha.

#### Opóźnienia w sieci a atak (10:25) {#network-latency-and-the-attack-1025}

Założyłem zerowe opóźnienie, co oczywiście tak nie działa. Opóźnienia istnieją — propagacja bloków i wiadomości w warstwie P2P wymaga czasu.

Sposobem, w jaki atakujący wciąż może przeprowadzić tego rodzaju atak, jest posiadanie wielu węzłów w różnych lokalizacjach w topologii P2P. Kiedy uczciwy proponujący w slocie N+2 proponuje ten blok, dowiadujesz się o tym bardzo wcześnie w procesie propagacji. W rezultacie możesz opublikować swój prywatny blok ze wszystkich tych różnych lokalizacji w taki sposób, że większość usłyszy o bloku N+1, zanim usłyszy o bloku N+2 — co oznacza, że zobaczą, iż blok N+1 prowadzi pod względem wagi i faktycznie go poświadczą.

Aby jeszcze raz podkreślić, co się tutaj dzieje: mamy proponującego z pojedynczym poświadczającym, któremu udaje się przeprowadzić reorganizację jednego bloku. Delikatnie mówiąc, nie jest to idealne.

#### Strategie równoważenia dla dłuższych reorganizacji (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Jeśli chcesz zaszaleć, możesz przeprowadzić dłuższe reorganizacje, stosując strategię równoważenia. Chodzi o to, aby podzielić uczciwy komitet na różne wizje łańcucha.

Publikujesz swój prywatny blok w taki sposób, że mniej więcej połowa uczciwych węzłów słyszy o twoim prywatnym bloku i poświadczeniu, zanim usłyszy o bloku N+2 — więc poświadczają twój blok. Chcesz, aby druga połowa nie usłyszała twojego bloku, zanim poświadczy N+2.

Teraz masz połowę uczciwego komitetu poświadczającą N+1, a drugą połowę poświadczającą N+2. W czym to pomaga? Uczciwy komitet teraz wzajemnie się znosi, a ty jako atakujący nawet nie musisz z nimi walczyć — co w zasadzie jest spełnieniem marzeń atakującego.

Przechodząc przez schemat: blok N w normie, blok N+1 — ta sama historia, nie publikujesz go. Uczciwi walidatorzy poświadczają blok N. Pojawia się blok N+2, dowiadujesz się o nim wcześnie i publikujesz blok N+1 z jednym poświadczeniem — „głosem decydującym” — w taki sposób, że połowa uczciwego komitetu widzi go przed, a połowa po. Połowa głosuje na N+1, druga połowa na N+2. Właściwie zależy ci na podziale z różnicą jednego głosu, tak aby N+2 miał o jedno poświadczenie więcej, dzięki czemu N+3 buduje na N+2 i kontynuuje reorganizację.

Aby zakończyć reorganizację dwóch bloków: proponowany jest blok N+3, słyszysz go wcześnie, publikujesz blok N+1 i swoje dwa pozostałe poświadczenia, zalewając warstwę P2P, tak aby większość uczciwych uczestników zagłosowała na blok N+1 — w taki sposób, że ma on większą wagę niż blok N+3, a N+4 jest budowany na N+1.

Jeśli się nad tym zastanowić, przeprowadzenie tych reorganizacji przy takich założeniach jest stosunkowo tanie. Nawet jeśli nie masz idealnych podziałów, ponieważ warstwa P2P jest tak duża, masz rozkład prawdopodobieństwa, w który możesz celować, tak że koszt ataku rośnie proporcjonalnie do pierwiastka kwadratowego z rozmiaru komitetu.

#### Środek zaradczy w postaci premii proponującego (15:17) {#proposer-boost-mitigation-1517}

Porozmawiajmy o środkach zaradczych. Jaka jest podstawowa idea? Damy proponującemu trochę więcej władzy. Jeśli prawidłowy blok dotrze na czas, zwiększmy wagę tego bloku na czas trwania slotu. Po zakończeniu tego slotu wznawiamy zwykłą punktację LMD-GHOST i wszystko wraca do normy.

Więc jeśli blok N+2 zostanie zaproponowany na czas i jest prawidłowy, blok ten otrzyma premię — powiedzmy 80% rozmiaru komitetu. Teraz to urocze, małe poświadczenie N+1 od atakującego nie wystarczy. Nie ma mowy.

Kwestie równoważenia również już nie działają, ponieważ masz podział 50/50, ale premia zawsze przechyla szalę w jednym kierunku. Nie ma możliwości utrzymania tego podziału 50/50.

Chodzi o to, że po wdrożeniu tego środka zaradczego poświadczenia przeciwnika muszą konkurować z premią, aby przekonać uczciwych walidatorów do głosowania zgodnie z ich upodobaniami. To niszczy strategie równoważenia i w zasadzie całkowicie uniemożliwia wszelkie reorganizacje. Dobre wieści — istnieje otwarty PR, więc w zasadzie zostanie to wdrożone przed The Merge.

#### Kluczowe wnioski (16:48) {#key-takeaways-1648}

Kilka kluczowych wniosków. Omówiłem różnice między reorganizacjami ex-post i ex-ante. Krótko nakreśliłem różne krajobrazy dla reorganizacji w dowodzie pracy w porównaniu z dowodem stawki. Pokazałem, jak przeprowadzić reorganizację ex-ante, ale co równie ważne, jak to naprawić.

Jeśli was to interesuje, istnieje artykuł — znacznie bardziej szczegółowy, z większą ilością niuansów. Slajdy zostaną udostępnione. Podejdźcie porozmawiać, jeśli jesteście zainteresowani, możecie mnie również znaleźć na Twitterze.

Mam nadzieję, że było to dla was interesujące. Bardzo dziękuję.