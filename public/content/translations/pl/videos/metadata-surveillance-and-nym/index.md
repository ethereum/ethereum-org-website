---
title: "Wydanie specjalne z okazji Dnia Ochrony Danych Osobowych – inwigilacja metadanych i Nym"
description: "Rozmowa z okazji Dnia Ochrony Danych Osobowych na temat inwigilacji metadanych: co metadane mówią o Tobie, nawet gdy treść wiadomości jest zaszyfrowana, oraz jak narzędzia ochrony prywatności na poziomie sieci, takie jak Nym, działają w celu ich ochrony."
lang: pl
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Prywatność"
---

Materiał od **Nym** z udziałem głównej badaczki Nym, Claudii Diaz, zgłębiający mechanikę metadanych, ich kluczową rolę we współczesnej inwigilacji, dane osobowe, które ujawniają, oraz kroki, jakie możemy podjąć, aby odzyskać naszą prywatność.

*Poniższa transkrypcja jest przystępną kopią [oryginalnej transkrypcji wideo](https://www.youtube.com/watch?v=QBX5AK3DXqw) opublikowanej przez Nym. Została ona poddana lekkiej redakcji w celu poprawy czytelności.*

### Wprowadzenie (0:04) {#intro-004}

Czym są metadane komunikacyjne? Odnoszą się one do wszystkiego, co dotyczy komunikacji, a nie jest samą treścią tego, co faktycznie zostało powiedziane. Obejmuje to na przykład źródło komunikacji, miejsce docelowe, czas wysłania informacji, ilość wysłanych informacji oraz wszelkie wykrywalne wzorce, w tym czas i rozmiar wymienianych pakietów.

### Metadane komunikacyjne (0:27) {#communications-metadata-027}

Metadane komunikacyjne są domyślnie ujawniane we wszystkich protokołach internetowych: TCP/IP, HTTP, UDP, FTP. Nawet bezpieczne protokoły, takie jak TLS czy bezpieczny DNS, które chronią treść za pomocą szyfrowania typu end-to-end, nadal pokazują metadane komunikacyjne: źródło, miejsce docelowe, czas, długość i tak dalej.

Więc te informacje są ujawniane, ale komu? Kto może je zdobyć?

### Kto ma dostęp do metadanych (1:10) {#who-gets-access-to-metadata-110}

Istnieje wiele podmiotów będących pośrednikami w komunikacji internetowej, które mają dostęp do tych metadanych komunikacyjnych. Obejmuje to dużych graczy w infrastrukturze internetowej, takich jak dostawcy usług internetowych, punkty wymiany ruchu, systemy autonomiczne, routery BGP i ogólnie uczestnicy szkieletu internetu; mogą oni uzyskać dostęp do ogromnej ilości metadanych komunikacyjnych. 

Ale nawet mniejsi gracze, tacy jak ktokolwiek, kto zarządza routerem Wi-Fi lub siecią lokalną, albo ktoś, kto jest w stanie podsłuchiwać lokalnie, również uzyskują dostęp do metadanych komunikacyjnych. I oczywiście wiadomo, że przeciwnicy na poziomie państwowym, tacy jak NSA, gromadzą metadane na dużą skalę i analizują je w celu pozyskania wszelkiego rodzaju danych wywiadowczych.

### Dlaczego metadane są ważne (2:00) {#why-is-metadata-important-200}

Istnieje więcej powodów, dla których metadane są bardzo interesującym rodzajem danych do gromadzenia i wykorzystywania. Są one czytelne dla maszyn, ponieważ mówią językiem komputerów; to w zasadzie język, dzięki któremu komputery mogą w odpowiedni sposób kierować komunikację ze źródła do miejsca docelowego. Są więc czytelne dla maszyn, a to oznacza, że maszyny mogą je bardzo łatwo zrozumieć na dużą skalę, w przeciwieństwie do naturalnego języka ludzkiego, który jest znacznie trudniejszy do zinterpretowania, ponieważ ludzie mogą używać słów w określony sposób lub mają one niuanse, co znacznie utrudnia interpretację. Z kolei metadane są naprawdę proste.

Mają one również znacznie mniejszą objętość niż treść. Jeśli pomyślisz na przykład o filmie na YouTube, sama treść może zajmować wiele gigabajtów, ale metadane obejmowałyby tylko adres URL filmu, liczbę bajtów, które zawiera, oraz czas, w którym był oglądany. Może to być więc znacznie mniej niż rzeczywista treść, a ponadto jest to łatwe do zarządzania pod względem rozmiaru.

Metadane mają również znacznie słabszą ochronę niż treść. Zwykłe przechwytywanie komunikacji ludzi i zaglądanie do jej treści nie jest zgodne z prawem, jest to chronione prawnie. Ale metadane, ponieważ nie są uważane za aż tak wrażliwe, mają znacznie słabszą ochronę. Wiele podmiotów może więc zgodnie z prawem gromadzić te metadane i analizować je, aby dowiedzieć się, co ludzie robią w internecie.

Czy to zatem duży problem? Możemy powiedzieć: „Cóż, to tylko metadane. Dopóki nie wiesz, co mówię, czy naprawdę powinienem się martwić, że wiesz, z kim i o której godzinie rozmawiam?” 

Istnieje kilka cytatów, które pokazują, jak bardzo metadane są w rzeczywistości uważane za niezwykle cenne. Główny radca prawny NSA, Stewart Baker, powiedział, że metadane absolutnie mówią wszystko o czyimś życiu – jeśli masz wystarczająco dużo metadanych, tak naprawdę nie potrzebujesz treści. Właśnie tak potężne są one w możliwości zrozumienia, czym ktoś się interesuje, jaka jest jego sieć społeczna, jakie ma hobby, jakie ma intencje i zainteresowania. Właściwie nie musisz słyszeć, co mówią; wystarczy, że jesteś w stanie obserwować wszystkie metadane.

Z kolei Whitfield Diffie i Susan Landau w swojej książce *Privacy on the Line* twierdzą, że to analiza ruchu, a nie kryptoanaliza, jest kręgosłupem wywiadu komunikacyjnego. Dzieje się tak, ponieważ można ją gromadzić na dużą skalę, analizować na dużą skalę i daje ona wszystkie główne wzorce, pełny obraz sytuacji, co następnie pozwala na przybliżenie w celu włamania się do konkretnych celów, które uznasz za najbardziej interesujące. Ale najpierw znajdujesz je za pomocą analizy ruchu na metadanych.

Analiza ruchu metadanych może być nawet wykorzystana do odzyskania zaszyfrowanej treści bez łamania kryptografii. Załóżmy, że mamy idealną kryptografię: żadna kryptoanaliza nie jest w stanie jej złamać, a tajne klucze są całkowicie tajne. Powinniśmy mieć pewność, że ta treść jest chroniona, a przeciwnik nie jest w stanie się o niej dowiedzieć. 

Istnieje jednak wiele sytuacji, w których analiza ruchu metadanych komunikacyjnych może działać jako kanał boczny, który ujawnia tę zaszyfrowaną treść.

### Inwigilacja metadanych (5:15) {#metadata-surveillance-515}

Jednym z przykładów jest przeglądanie strony internetowej za pomocą protokołu HTTPS. W zasadzie, ponieważ komunikacja z tą stroną jest zaszyfrowana, ktoś, kto obserwuje Twoją komunikację, nie może stwierdzić, do jakiej konkretnej podstrony w witrynie uzyskujesz dostęp. Na przykład, jeśli wchodzisz na WebMD, aby sprawdzić choroby, obserwator lub podsłuchujący będzie w stanie zobaczyć: „Okej, sprawdzasz informacje medyczne na WebMD”, ale nie będzie w stanie powiedzieć, jakiej konkretnie choroby szukasz.

Jednak sposobem na dowiedzenie się, co ktoś robi w tym scenariuszu, byłoby dla przeciwnika najpierw pobranie wszystkich podstron w witrynie i zarejestrowanie dla każdej z nich wzorca pakietów, które są widoczne na linii komunikacyjnej. Zasadniczo, jaka liczba pakietów idzie w którym kierunku, jakie są rozmiary tych pakietów i jaki jest odstęp czasu między jednym pakietem a kolejnym. 

Robiąc to, można zbudować odcisk palca każdej z tych stron, tak że gdy cel pobiera stronę z zaszyfrowanej witryny, jesteś w stanie dopasować liczbę pakietów w każdym kierunku i ich rozmiary, aby odgadnąć, na którą konkretnie stronę internetową patrzy, mimo że sama strona jest zaszyfrowana i nie powinieneś być w stanie poznać tej treści.

To oczywiście niepokojące. Mimo że możemy mieć szyfrowanie typu end-to-end, jesteśmy bardzo daleko od zakończenia prac w zakresie ochrony prywatności naszej komunikacji.

### Lista życzeń dla prywatnej komunikacji (6:40) {#a-wish-list-for-private-communications-640}

Więc gdybyśmy chcieli stworzyć listę życzeń tego, co oferowałaby idealnie bezpieczna sieć komunikacyjna, jakich właściwości byśmy oczekiwali? 

Oczywiście chcemy chronić to, co użytkownik mówi przez zaszyfrowany kanał, a szyfrowanie typu end-to-end jest już bardzo ważnym krokiem do osiągnięcia tego celu. Ale nie tylko to, chcemy również ukryć, z kim użytkownik się komunikuje, czyli kim jest partner w komunikacji, od kogo otrzymujesz pakiety lub do kogo je wysyłasz. Także lokalizację, czyli skąd się komunikujesz; kiedy i jak długo się komunikujesz; ile bajtów danych wymieniasz; oraz wszelkie inne wzorce w komunikacji. Można by nawet posunąć się do stwierdzenia, że chcemy ukryć, czy ktoś w ogóle się komunikuje, czy nie.

Wszystko to są właściwości, które anonimowe systemy komunikacyjne starają się zapewnić, a w przestrzeni rozwiązań sieci miksujące (mixnets) są jednym z najlepszych rozwiązań, jakie mamy, aby zapewnić tego rodzaju właściwości.