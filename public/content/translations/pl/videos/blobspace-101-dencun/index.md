---
title: "Kolejna aktualizacja Ethereum: blobspace 101"
description: "Domothy wyjaśnia blobspace, nową warstwę dostępności danych wprowadzoną przez aktualizację Dencun w Ethereum, omawiając, jak działają transakcje z blobami, dlaczego mają znaczenie dla skalowania Ethereum i co dalej z dostępnością danych."
lang: pl
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "skalowanie"
  - "bloby"
  - "dencun"
  - "aktualizacje"
format: interview
author: Bankless
breadcrumb: "Blobspace 101"
---

Ten wywiad omawia zasób przestrzeni blobów (blob space) w Ethereum, wprowadzony wraz z [EIP-4844 (proto-danksharding)](https://www.eip4844.com/). Badacz Ethereum, Domothy, dołącza do Davida Hoffmana i Ryana Seana Adamsa w podcaście Bankless, aby wyjaśnić historię mapy drogowej skoncentrowanej na rollupach, techniczne mechanizmy blobów oraz ekonomiczne implikacje oddzielenia przestrzeni bloków (block space) od przestrzeni blobów (blob space).

*Ten transkrypt jest przystępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=dFjyUY3e53Q) opublikowanego przez Bankless. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie do przestrzeni blobów (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Witamy w Bankless, gdzie odkrywamy granice internetowego pieniądza i internetowych finansów. Dowiecie się tutaj, jak zacząć, jak stawać się lepszym i jak wyprzedzać okazje. Jestem tu z Davidem Hoffmanem i jesteśmy po to, aby pomóc wam stać się bardziej niezależnymi od banków. Wiecie, jak mówimy, że blockchainy sprzedają bloki? Cóż, wkrótce Ethereum będzie sprzedawać coś więcej niż tylko bloki — będzie sprzedawać również bloby.

**David Hoffman:** Zgadza się, bloby. Jesteśmy zaledwie kilka miesięcy przed największą aktualizacją Ethereum od czasu The Merge i myślę, że nikt jeszcze w pełni nie przeanalizował jej konsekwencji, ale to będzie coś ogromnego. Ethereum zyskuje nowy produkt do sprzedaży. Nazywa się on przestrzenią blobów (blob space) i jest dodatkiem do przestrzeni bloków (block space). Koszt transakcji w warstwach 2 (L2) wkrótce spadnie niemal do zera. Ekonomia gazu ETH i jego spalania zmieni się na zawsze. Nazywamy tę aktualizację aktualizacją przestrzeni blobów, EIP-4844, proto-danksharding. Chcemy omówić wszystko, co musicie wiedzieć o przestrzeni blobów.

**Ryan Sean Adams:** Kilka kluczowych wniosków. Po pierwsze, omawiamy, czym jest przestrzeń blobów. Po drugie, przechodzimy przez historię tego, jak właściwie tu dotarliśmy — tę mapę drogową skoncentrowaną na rollupach. Po trzecie, przyglądamy się ekonomii. Co to oznacza dla ekonomii Ethereum, dla gromadzenia wartości przez ETH, dla ETH jako aktywa? David, dlaczego ten odcinek był dla ciebie ważny?

**David Hoffman:** Myślę, że jeśli jest jakiś obszar rozmów, który obaj naprawdę uwielbiamy, to jest to skrzyżowanie kryptografii i ekonomii — jak liczby i ich ekonomiczne manifestacje. Uwielbiam bawić się tymi protokołami.

**Ryan Sean Adams:** Tak, to nasz język miłości.

**David Hoffman:** Rozmawialiśmy o EIP-4844, rozmawialiśmy o proto-danksharding. To są te same rzeczy. Definiowaliśmy to kilka razy w różnych kontekstach. Ale nigdy nie zrobiliśmy tak głębokiego nurkowania w króliczą norę, by wyjść z drugiej strony z odpowiedziami na pytania o stronę ekonomiczną. Więc technicznie przeskalowaliśmy dostępność danych na poziomie technicznym — to jest ulepszenie protokołu. Ale jak to się łączy z rynkową stroną Ethereum? Jeden rynek dzieli się teraz na dwa: przestrzeń bloków i przestrzeń blobów to teraz dwa różne, niezależne rynki, które są zawarte wewnątrz bloku Ethereum.

Co to oznacza dla etheru? Co to oznacza dla rynków, które powstają wokół tych rzeczy? Jak równowaga podaży i popytu każdego z nich wpływa na siebie nawzajem? Co to oznacza dla skalowalności warstwy 2? Co to oznacza dla ekonomicznych przypadków użycia w warstwach 2? Zaczniemy od podstaw, ale potem wyjdziemy z drugiej strony króliczej nory, przechodząc do ekonomicznej strony tej rozmowy.

Zaprośmy naszego gościa, Doma, znanego również jako Domothy. Jest on badaczem w Fundacji Ethereum, pracującym nad badaniami i rozwojem kluczowych aktualizacji Ethereum, które wkrótce nadejdą, w tym EIP-4844 (dzisiejszy temat), pełnego dankshardingu i spalania MEV.

#### Historia mapy drogowej skoncentrowanej na rollupach (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Więc Dom, aby w pełni zrozumieć, jak dotarliśmy do przestrzeni blobów, myślę, że warto cofnąć się w czasie, aby zrozumieć pełnię mapy drogowej Ethereum, ponieważ doprowadziła ona do bardzo logicznego wniosku w postaci blobów i przestrzeni blobów. Czy możesz nas cofnąć w czasie? Ponieważ w pewnym momencie mapa drogowa Ethereum skoncentrowana na rollupach nie istniała. Mieliśmy coś, co nazywało się shardingiem wykonawczym, którego tak naprawdę nigdy nie otrzymaliśmy. W którym momencie historii mapy drogowej Ethereum należy się znaleźć, aby naprawdę zrozumieć pełny kontekst przestrzeni blobów?

**Domothy:** Jasne. Jeszcze przed uruchomieniem Ethereum pojawiały się myśli o tym, jak je skalować, ponieważ już wtedy wszyscy wiedzieli, że pojedynczy blockchain, w którym każdy węzeł uruchamia wszystko, nie wystarczy. Początkowo było więc mnóstwo różnych pomysłów na sharding. Pierwszą próbą faktycznego określenia jego specyfikacji był sharding z wykonaniem, w którym w zasadzie mamy, powiedzmy, 64 różne niezależne łańcuchy, które próbują się ze sobą komunikować. Okazuje się, że jest to trudne do zrobienia — wiąże się z tym duża złożoność.

Zostało to podzielone na różne fazy. Najpierw uruchomimy Beacon Chain, a następnie wymyślimy, jak właściwie połączyć go z obecną warstwą wykonawczą. Następnie zrobimy Fazę Pierwszą, czyli po prostu sharding danych — a więc bez wykonywania, tylko mniejsze blockchainy zawierające dane. A potem wymyślimy, jak zrobić sharding wykonawczy. Było to w dużej mierze wymyślanie na bieżąco, ale w bezpieczny sposób, abyśmy nie zrobili czegoś, czego później pożałujemy i nie zepsuli całego blockchaina, ponieważ toczy się na nim tak duża aktywność ekonomiczna.

**David Hoffman:** Aby podać szczegóły dotyczące shardingu wykonawczego — jest to losowe tasowanie walidatorów pomiędzy różnymi shardami blockchaina, przy czym każdy shard jest w zasadzie własnym mini-blockchainem działającym równolegle do Beacon Chain. Brzmi to trochę jak to, co mamy dzisiaj z rollupami, ale różnica polega na tym, że shardy Ethereum są w rzeczywistości częścią protokołu warstwy 1. Protokół warstwy 1 określa, czym są shardy, podczas gdy rollupy są rozłączne. Początkowo miały to być 64 takie shardy obsługiwane, zarządzane i produkowane przez protokół warstwy 1 Ethereum. Czy dobrze to ujmuję?

**Domothy:** Dokładnie. Uzyskanie skalowania wykonawczego w ten sposób jest bardziej pośrednie dzięki rollupom i shardingowi danych, ale z perspektywy badawczej to trochę jak kod na oszustwo, ponieważ warstwa 1 Ethereum ma znacznie mniej rzeczy do zrobienia i zmartwień. Reszta jest przenoszona na rollupy, co moim zdaniem jest lepsze niż pierwotny plan. W pierwotnym planie shardów na poziomie protokołu, wszystko jest takie samo — ten sam blockchain, ta sama maszyna wirtualna Ethereum (EVM), te same kompromisy. Teraz zamiast tego możemy mieć rollupy konkurujące ze sobą o uzyskanie najlepszego środowiska i kompromisów. Jeśli wolisz super prędkość od super bezpieczeństwa, możesz przejść na inny rollup. Masz wybór, innowacje i konkurencję w warstwie 2.

**Ryan Sean Adams:** Poruszmy temat modularnego świata, w którym znajduje się Ethereum. Istnieje warstwa konsensusu, warstwa dostępności danych i warstwa wykonawcza. Warstwa konsensusu definiuje, co jest prawdą — kolejność bloków. Warstwa dostępności danych to to, co się wydarzyło — warstwa danych. Zewnętrzna warstwa to warstwa wykonawcza, gdzie obecnie ma miejsce aktywność. Początkowo Ethereum łączyło wszystkie te trzy elementy w głównym łańcuchu.

Teraz to, co robimy z mapą drogową skoncentrowaną na rollupach, to wydzielanie wykonywania z głównego łańcucha do tych rollupów. Ale aby rollupy były w pełni zabezpieczone z podobnymi gwarancjami jak sieć główna Ethereum, muszą one przesyłać swoje dane z powrotem do sieci głównej Ethereum. Kiedy to robią, obecnie kosztuje to przestrzeń bloków i kosztuje to dużo pieniędzy. Powodem wprowadzenia proto-danksharding (EIP-4844) jest zmiana ekonomii w sposób bardzo korzystny dla rollupów. Dom, masz coś do dodania?

**Domothy:** Dodałbym tylko, że obecnie dostępność danych jest bardziej domyślna i sprowadza się do weryfikacji niewymagającej zaufania. Chcemy, aby każdy mógł samodzielnie zweryfikować łańcuch i nie musiał polegać na stronie trzeciej w stylu "uwierz mi na słowo". To jest wąskie gardło. Musisz być w stanie zweryfikować wszystko, co domyślnie oznacza, że musisz mieć dostępne dane, aby sprawdzić przejścia stanu.

Pod koniec 2020 roku ludzie zdali sobie sprawę, że rollupy stają się niesamowicie dobre i popularne, i rozwiązały nasz problem skalowania wykonawczego bez potrzeby shardingu wykonawczego. Wybierając ekosystem rollupów, zamiast próbować być jakimś maksymalistą warstwy 1, rollupy mogą iść na własne kompromisy, uruchamiać własne blockchainy i eksperymentować z nowatorskimi rzeczami. Ethereum zajmuje się weryfikacją — to jest sedno tego, czym jest blockchain.

#### Czym jest przestrzeń blobów? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Teraz przenieś nas do obecnego stanu, Dom. Mamy wiele rollupów korzystających z przestrzeni bloków warstwy 1 Ethereum, płacących wysokie opłaty za gaz, aby opublikować swoje dane stanu, tak aby każdy mógł je zweryfikować. Więc, Dom, czym jest blob?

**Domothy:** Blob to po prostu fragment danych — a w zasadzie duża, surowa tablica liczb. Blob w Ethereum ma obecnie stały rozmiar około 128 kilobajtów. Są to po prostu surowe dane dołączone do transakcji, znanej jako transakcja przenosząca bloby, którą przesyłasz do warstwy 1.

Kluczowym ograniczeniem projektowym jest tutaj to, że maszyna wirtualna Ethereum (EVM) warstwy 1 — silnik wykonawczy — nie ma dostępu do danych wewnątrz bloba. W standardowych blokach dane, takie jak dane wywołania, wymagają od systemu sprawdzenia, jakie funkcje są wywoływane, jakie pieniądze są przenoszone, i zweryfikowania zmian stanu. EVM ma do tego wszystkiego dostęp. Ale jeśli skalowanie warstwy 2 polega na publikowaniu danych rollupów dokładnie po to, aby pozałańcuchowy weryfikator mógł wykonać obliczenia, to *warstwa 1* Ethereum funkcjonalnie nie musi na nie patrzeć i ich wykonywać.

To w zasadzie zapieczętowana paczka. Warstwa 1 przyjmuje ją, gwarantuje, że każdy ma dostęp, aby zajrzeć do środka, jeśli chce ją fizycznie pobrać, ale sama główna warstwa wykonawcza przetwarzająca Ethereum nie odczytuje aktywnie i nie oblicza tych danych. Ponieważ nie odczytuje i nie oblicza danych w EVM, wymaga to radykalnie mniejszych zasobów obliczeniowych od węzłów. Dlatego jest to o wiele tańsze.

**David Hoffman:** Podsumowując: przestrzeń bloków dba o obliczenia, wykonywanie stanu i przechowywanie logiki. Przestrzeń blobów dba wyłącznie o dostępność danych. Warstwy 1 nie obchodzi, kto i co publikuje w tych blobach; zależy jej tylko na otrzymywaniu tych blobów i przetrzymywaniu ich przez wyznaczone okno dostępności, aby zainteresowane strony (takie jak sekwencery rollupów i użytkownicy) mogły je pobrać, zweryfikować, czy dane nie zostały złośliwie zatajone, i pójść dalej.

**Domothy:** Dokładnie. Kolejną kluczową właściwością blobów jest to, że są one automatycznie usuwane po pewnym czasie — obecnie po około 18 dniach. Powodem ich usuwania jest to, że aby zagwarantować weryfikację niewymagającą zaufania, jednostki potrzebują tych danych tylko po to, aby udowodnić ostateczność i konsensus co do stanu rollupa w określonym oknie wyzwania. Nie potrzebujesz tysiąca węzłów przechowujących bloby sprzed dwóch lat, aby zweryfikować swoją dzisiejszą transakcję. Kiedy okno wygasa, nie otrzymasz ich już z węzła Ethereum; pobierasz je od dostawców historii, indeksatorów lub natywnych eksploratorów bloków rollupa. Przechowywanie w Ethereum na zawsze jest szalenie drogie. Porzucenie wymogu przechowywania pozwala nam skalować przepustowość blobów bez niszczenia dysków twardych operatorów węzłów.

#### Ekonomia i pełny danksharding (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Wiemy, że 4844 to krok pierwszy — to, co nazywamy proto-danksharding. Ustanawia on format bloba i odizolowany rynek opłat, ale rzeczywista docelowa liczba blobów na blok jest początkowo ograniczona, aby była całkiem bezpieczna. Jak to wygląda w kontekście skalowania w kierunku pełnego dankshardingu?

**Domothy:** Obecnie, w ramach EIP-4844, celujemy w zasadzie w 3 bloby na blok, z twardym maksimum wynoszącym 6. Ogranicza to absolutną maksymalną przepustowość danych w warstwie 1 natychmiast po aktualizacji, aby zapobiec jakiemukolwiek obciążeniu sieci, podczas gdy my będziemy obserwować, jak ta funkcja działa w ciągłej produkcji.

Pełny danksharding dramatycznie to skaluje. Zmierza to w kierunku próbkowania dostępności danych (DAS). Dzięki DAS pełne węzły nie muszą już indywidualnie pobierać każdego pojedynczego bloba, aby zweryfikować, czy dane zostały udostępnione. Mogą one statystycznie próbkować maleńkie fragmenty danych bloba. Jeśli próbka statystyczna okaże się dostępna, matematyczne prawdopodobieństwo, że atakujący ukrywa dane, zbliża się do zera (jak szansa jedna na miliard). Gdy nie wymagasz pełnego pobrania całego bloba, możesz skalować pojemność blobów do dwucyfrowych lub wyższych wartości na blok.

**David Hoffman:** Tworzy to podzielony rynek opłat wewnątrz bloku Ethereum. Obecnie rollup warstwy 2 musi konkurować z traderami na Uniswap i OpenSea o te same zasoby przestrzeni bloków w bloku Ethereum. Ale są to fundamentalnie różne wzorce użytkowania. Jeśli na warstwie 1 Ethereum szaleje wybijanie NFT, gaz gwałtownie rośnie, a rollupy warstwy 2 próbujące opublikować swój stan danych nagle stają w obliczu niebotycznych kosztów biznesowych tylko po to, by wykonać swoje niezbędne obowiązki związane z bezpieczeństwem.

Dzięki dwuwymiarowemu rynkowi opłat — w zasadzie oddzielnej, odizolowanej drodze, po której mogą poruszać się bloby — to wybijanie NFT na warstwie 1 Ethereum powoduje taki sam wzrost gazu wykonawczego, ale nie zużywa przestrzeni blobów. Bloby pozostają całkowicie niezatłoczone i w efekcie kosztują grosze. Wielomilionowe wybijanie NFT w głównym łańcuchu ma zerowy wpływ na ekonomiczny koszt finalizacji transakcji na Arbitrum lub Optimism.

**Domothy:** Tak, są one całkowicie odłączone. I odwrotnie. Jeśli przepustowość warstwy 2 ogromnie wzrośnie, a tysiące rollupów będzie działać i zapychać przestrzeń blobów, wynikający z tego skok opłat podstawowych za bloby nie wpłynie na koszt wykonania prostej transakcji w sieci głównej Ethereum. Opłata podstawowa za blob działa dokładnie tak samo jak opłata podstawowa EIP-1559, ale w swoim własnym wymiarze. A wracając do twojego wcześniejszego pytania o spalanie — tak, opłata za blob generuje spalone ETH, aby zapłacić za włączenie danych do przestrzeni blobów, całkowicie niezależnie od spalania opłaty podstawowej za przestrzeń bloków.

#### Przyszłość skalowalności Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Chcę przejść do tego, co wydarzy się konkretnie w momencie wydania 4844. Początkowo istnieje oczywiście bardzo wysokie oczekiwanie, że kiedy pojemność blobów nagle się odblokuje, w tej samej mikrosekundzie nie będzie wystarczającego popytu ze strony rollupów, aby całkowicie ją wypełnić. Przestrzeń blobów będzie w momencie premiery wręcz komicznie tania. Ale czy nie istnieje prawo popytu indukowanego? Jeśli masz niewiarygodnie tanie zasoby, aplikacje, które je zużywają, eksplodują pod względem wolumenu.

**Domothy:** Początkowe przejście obniży opłaty w warstwie 2 w zasadzie niemal do zera, ponieważ wszystkie istniejące rollupy, które obecnie konkurują o drogą przestrzeń bloków, płynnie przejdą do prawie pustej, ogromnej puli przestrzeni blobów. To ogromne i natychmiastowe zwiększenie marży dla sieci warstwy 2, które zostanie przekazane bezpośrednio użytkownikom w momencie, gdy zintegrują oni swoją nową logikę dowodzenia z 4844.

Ale masz rację — tania przestrzeń bloków napędza projektowanie aplikacji o dużej prędkości. Kiedy nagle możesz zbudować grę onchain, która generuje miliony przejść mikro-stanów za ułamki grosza, ponieważ zniknął narzut związany z trwałością danych, całkowicie nowe klasyfikacje aplikacji stają się opłacalne ekonomicznie, co nie było możliwe przy standardowych ograniczeniach.

Tworzy to interesującą dynamikę ekonomiczną w sposobie, w jaki ETH gromadzi wartość. Jeśli transakcje w warstwie 2 eksplodują 10- lub 100-krotnie z powodu nowo możliwych aplikacji działających przy niemal darmowej dostępności danych, zagregowany wolumen ostatecznie zacznie konkurować o przestrzeń blobów. Wtedy opłata podstawowa za blob EIP-1559 naturalnie rośnie, aż rynek osiągnie równowagę, tworząc potęgującą się, ciągłą pętlę spalania ETH przy jednoczesnym rozszerzaniu użyteczności warstwy 2.

**David Hoffman:** Reprezentuje to sukces i dojrzewanie mapy drogowej skoncentrowanej na rollupach. Ethereum jako monolityczne środowisko wykonawcze uderzyło w mur, gdzie liniowe skalowanie przepustowości niszczyło jego mandat decentralizacji. Rollupy zapewniły sposób na ominięcie wąskiego gardła wykonawczego, ale nadal były uwiązane do wąskiego gardła danych warstwy 1. Przestrzeń blobów odblokowuje wąskie gardło danych w taki sam sposób, w jaki rollupy odblokowały wąskie gardło wykonawcze. Kiedy ta aktualizacja zostanie wdrożona, Ethereum w pełni przejdzie od przetwarzania pojedynczych transakcji do przetwarzania zweryfikowanych sieci wykonawczych.

**Ryan Sean Adams:** Podsumowując oś czasu, EIP-4844 pojawi się optymistycznie pod koniec roku lub na początku przyszłego, a pełny danksharding nastąpi w kolejnym cyklu rozwoju. To naprawdę jest rusztowanie infrastrukturalne wymagane, aby Ethereum mogło przyjąć na pokład całą planetę, i jesteśmy tak blisko jego działania w prawdziwym świecie. Dom, dziękujemy za przeprowadzenie nas przez to ogromne odblokowanie dla sieci.

**Domothy:** Dziękuję za zaproszenie.