---
title: "Blockchain — ETH.BUILD"
description: "Demonstracja tego, jak działa kopanie w blockchainie, w tym jak bloki są łączone w łańcuch, jak dowód pracy zabezpiecza blockchainy i co się dzieje, gdy ktoś próbuje manipulować danymi."
lang: pl
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "kopanie"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Blockchain (ETH.BUILD)"
---

Samouczek autorstwa **Austina Griffitha** demonstrujący, jak działa kopanie w blockchainie przy użyciu narzędzia do programowania wizualnego ETH.BUILD. Austin omawia konsensus oparty na dowodzie pracy (PoW), łączenie bloków w łańcuch, trudność kopania, nagrody za blok oraz niezmienność łańcucha.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) opublikowanego przez Austina Griffitha. Został on lekko zredagowany w celu poprawy czytelności.*

#### Problem koordynacji (0:00) {#the-problem-of-coordination-000}

Dzień dobry, szczęśliwego piątku z muszką (Bowtie Friday)! Ten odcinek ETH.BUILD skupia się na blockchainie — naprawdę fajna sprawa. Jesteśmy w tej samej łodzi, mamy na to naszą muszkę z Bitcoinem. Zaczynamy.

W dotychczasowym programie przerobiliśmy pary kluczy, hashe i księgi główne. Odkryliśmy, że jeśli chcemy przesyłać wartość w tę i z powrotem w rozproszonej sieci — a nie scentralizowanej — napotykamy problemy z koordynacją. Pojawia się problem, w którym nie możemy osiągnąć konsensusu między różnymi stronami, ponieważ wszystkie otrzymują różne transakcje w różnym czasie. Istnieje wiele różnych sposobów na rozwiązanie tego problemu, ale żaden z nich nie był świetny, dopóki nie pojawił się dowód pracy (PoW).

Omówiliśmy problem generałów bizantyjskich jako zadanie poboczne i dowiedzieliśmy się tam, że generałowie musieli udowodnić, że mają armię, gdy wysyłali wiadomości przez niezabezpieczoną sieć. Wtedy strona odbierająca mogła stwierdzić, że ta osoba rzeczywiście była generałem z armią, która zamierzała zaatakować, i mogli się skoordynować.

#### Bloki i nonce (1:04) {#blocks-and-the-nonce-104}

Więc do tej księgi pompujemy transakcje z sieci. Zamiast wymagać od każdego pojedynczego użytkownika udowadniania swojej pracy, wyabstrahujemy dowód pracy do bloku transakcji i pozwolimy górnikowi nad nim pracować.

Wprowadzamy blok, który przechowuje transakcje — cokolwiek przepływa przez sieć, ładujemy do tego bloku. Jeśli spojrzymy na strukturę tego bloku, ma on również nonce. Ten nonce pozwala nam modyfikować hash. Jeśli weźmiemy cały ten blok, zamienimy go na ciąg znaków i zahaszujemy, otrzymamy hash. Gdy transakcje się zmieniają, ten hash się zmienia, ale także gdy zmieniamy nonce, hash również ulega zmianie.

Wykonujemy tutaj pewną pracę — mamy losowy zestaw transakcji i zmieniamy nonce, dopóki hash nie będzie miał wiodącego zera. Jeśli oglądałeś zadanie poboczne o generałach bizantyjskich, wybraliśmy to wiodące zero jako arbitralną ilość pracy do udowodnienia. Więc nonce po prostu przechodzi przez każdą liczbę — jeden, dwa, trzy, cztery — a kiedy otrzymujemy wiodące zero, mówimy: to jest prawidłowy blok.

#### Dowód pracy w akcji (3:00) {#proof-of-work-in-action-300}

Jeśli weźmiemy wykopany blok, wyciągniemy hash i wrzucimy go do funkcji skrótu, możemy udowodnić, że ma wiodące zero — możemy udowodnić, że nad tym blokiem wykonano pracę.

Funkcja skrótu zużywa moc procesora (CPU), która jest ograniczonym zasobem. Wykorzystujemy całą naszą moc obliczeniową, próbując znaleźć hash z wiodącymi zerami. Kiedy to zrobimy, mamy prawidłowy blok — blok jest w zasadzie zamrożony. Jakiekolwiek transakcje znajdowały się w nim w tamtym czasie, są teraz w tym bloku, wszyscy go respektują i możemy przejść do następnego bloku.

#### Łączenie bloków w łańcuch (3:56) {#chaining-blocks-together-356}

Oto haczyk: bierzemy stary blok i podłączamy go do nowego bloku. Jeśli spojrzymy na strukturę, nowy blok nie ma transakcji i ma pusty nonce, ale ma rodzica z transakcjami. Poprzedni blok będzie częścią następnego bloku, więc będziemy mieli cały łańcuch.

Wrzucamy najnowsze transakcje z puli transakcji i pracujemy nad znalezieniem nonce. Blok numer dwa został wykopany — potrzebowaliśmy nonce o wartości dziesięć, aby te transakcje były prawidłowe. Następnie robimy to samo: podłączamy stary blok, wprowadzamy nowy, wrzucamy najnowsze transakcje i znów nad nim pracujemy. Po wystarczającej liczbie prób znaleźliśmy nonce dla bloku trzeciego. Blok czwarty — ten sam proces i idziemy dalej.

#### Trudność kopania (5:02) {#mining-difficulty-502}

To zbyt proste — jesteśmy w stanie bardzo szybko znaleźć prawidłowy blok, a chcemy, żeby było to trudniejsze. Zwiększę trudność do dwóch. Podłączamy blok piąty, wprowadzamy najnowsze transakcje i uruchamiamy licznik. Teraz kopiemy — używając naszej ograniczonej mocy procesora do arbitralnego rzucania losowymi haszami, dopóki nie znajdziemy hasha z dwoma wiodącymi zerami, ponieważ trudność została zwiększona. To trochę potrwa.

Teraz mamy ten blockchain składający się z pięciu bloków. Te bloki przechowują transakcje i każdy z nich odwołuje się do poprzedniego. Wyprodukowanie każdego bloku wymagało pewnej arbitralnej ilości pracy, a ilość tej pracy jest kontrolowana przez trudność.

#### Górnik (6:46) {#the-miner-646}

Przyjrzyjmy się, czym jest górnik. W problemie generałów bizantyjskich generał, który chciał „zaatakować o świcie”, potrzebował żołnierzy. To, co dzieje się wewnątrz każdego żołnierza, jest dokładnie tym, co robimy tutaj z naszym górnikiem — bierzemy wiadomość i nonce, i wrzucamy je do funkcji skrótu tak szybko, jak to możliwe, próbując uzyskać te wiodące zera. Wiodące zera to pewna arbitralna rzecz, na którą wszyscy się zgodziliśmy — to wystarczająca ilość pracy, aby udowodnić, że jesteś żołnierzem lub że możesz prowadzić wojnę.

Pozwólcie, że wprowadzę górnika i zrobię to trochę szybciej. Górnik zrobi to samo dla naszych bloków — bierze transakcje napływające z puli transakcji, pompuje je do bloku i po prostu nad nim pracuje, dopóki nie znajdzie prawidłowego hasha.

Górnik jest nieco bardziej wydajny. Jest bardziej skupiony na kopaniu. Losowo rzuca haszami — to dokładnie to, co nasz górnik robił wcześniej, tylko w sposób wyabstrahowany. Widzimy, jak działa w tle, po prostu przerzucając hashe. Znalazł to — blok szósty został wykopany.

#### Podwójne wydatkowanie i propagacja w sieci (10:00) {#double-spends-and-network-propagation-1000}

Mówiliśmy już o problemie podwójnego wydatkowania (double spending), a nawet o problemie propagacji w sieci. Kiedy mamy księgę główną i rozproszoną sieć, a ktoś wysyła transakcję, dociera ona do różnych osób w różnym czasie. W związku z tym moglibyśmy mieć w sieci dwóch górników, którzy wykopią blok dokładnie w tym samym czasie, a będą one zawierać różne transakcje.

Każdy z nich jest w danym momencie prawidłowy — obaj wykonali dowód pracy, oba mają wiodące zera. Ale nie mogą być jednocześnie kanoniczne. Nie mogą być jednocześnie prawdą. Potrzebujemy więc sposobu, aby sieć osiągnęła konsensus co do tego, który łańcuch jest tym prawdziwym.

#### Wielu górników i konsensus (12:27) {#multiple-miners-and-consensus-1227}

Pozwólcie, że wezmę ten blok i przeniosę go tutaj. Chcę, aby dwóch różnych górników pracowało nad tym samym problemem, niejako nasłuchując tej samej puli transakcji i niezależnie tworząc bloki. Mamy dwóch górników: Mallory i Mike'a. Zwiększyłem trudność do trzech i oboje pracują nad znalezieniem hasha z trzema wiodącymi zerami.

Więc Mallory znalazła blok jako pierwsza! Świetnie. Co się teraz dzieje — ponieważ jesteśmy w rozproszonej sieci, Mike może jeszcze nawet nie wiedzieć o bloku Mallory. Może nadal pracować nad własną wersją. I teraz Mike też znalazł swój blok. Mamy więc dwie prawidłowe ścieżki.

Jeśli jesteś jednym węzłem równorzędnym w sieci i najpierw zobaczysz blok Mallory, pomyślisz, że to jest główny blok. Później dociera blok Mike'a. Zatrzymujesz oba na wypadek, gdyby jeden z nich stał się najdłuższym łańcuchem. A zasada brzmi: podążaj za najdłuższym prawidłowym łańcuchem.

#### Coinbase i nagrody za blok (15:33) {#coinbase-and-block-rewards-1533}

Kiedy górnik wykopie blok, mówimy: oto wszystkie transakcje, których chcemy, oto nonce, oto rodzic — ale powiemy też, oto osoba, która wykopala ten blok. Nazywa się to coinbase — myślę, że jest teraz firma o tej nazwie, ale to co innego. Będziemy to po prostu nazywać „górnikiem”. Więc nasze bloki wymagają teraz pola górnika.

Więc Mike właśnie znalazł blok i Mike również otrzyma z tego wartość dziesięć. Musimy zachęcić górników do wykonania całej tej pracy, prawda? Wydają pieniądze na zakup tych koparek, aby w zasadzie zabezpieczyć sieć. Ci górnicy wydają pieniądze, aby zabezpieczyć sieć całą swoją mocą obliczeniową (hash power) — ze wszystkimi górnikami razem wziętymi, może dziesiątkami tysięcy. Płacą dobre pieniądze za budowę koparek, które pracują nad tymi haszami, a żeby ich zachęcić, dajemy im dolę zwaną nagrodą za blok z każdego wykopanego przez nich bloku.

#### Nagrody za blok i zachęty (16:52) {#block-rewards-and-incentives-1652}

Więc w tej wersji bloku Mallory ma dziesięć dolarów, ale w tej wersji Mike ma dziesięć dolarów. Każdy z tych dwóch graczy jest zmotywowany, aby kontynuować swój własny łańcuch, a reszta sieci musi znaleźć konsensus. W zasadzie sprowadza się to do tego, kto ma najdłuższy prawidłowy łańcuch.

Mike ustawi swój blok jako rodzica i zacznie pracować nad następnym blokiem. Mallory zrobi to samo. I wszystko sprowadza się do tego, kto jeszcze w sieci opowie się po czyjej stronie. Ponieważ nie chcemy karać ludzi ze słabym połączeniem sieciowym, jestem prawie pewien, że w Ethereum płacimy za bloki wujków (uncle blocks) — prawidłowe bloki, które nie trafiły do najdłuższego łańcucha — ponieważ nadal pomagają one zabezpieczać sieć.

Mieliśmy ten problem koordynacji i konsensusu, i rozwiązaliśmy go, wprowadzając tę arbitralną ilość pracy, która musi zostać wykonana, aby transakcje były prawidłowe. Mallory wykonała całą tę pracę, haszując i haszując, i haszując, aby znaleźć trzy wiodące zera hasha wszystkich tych transakcji i poprzedniego bloku.

#### Odpytywanie blockchaina (18:30) {#querying-the-blockchain-1830}

Możemy komunikować się z tym łańcuchem, który jest najdłuższy. Mike nie dotarł jeszcze do siódmego, więc widzimy, że wysokość tutaj to wciąż sześć. I możemy robić takie rzeczy, jak odpytywanie o salda użytkowników. Więc sprawdzamy saldo — co otrzymujemy? Pięćset dwadzieścia cztery. Więc Heidi siedzi na 524 czy czymkolwiek, co jest natywnym tokenem dla tego łańcucha. Widzimy jej nonce, możemy robić wszystko to, co mogliśmy robić z księgą główną, ale teraz układamy bloki jeden na drugim, a te bloki przechowują transakcje.

Wyabstrahowaliśmy pracę od użytkowników, którzy po prostu wysyłają pieniądze, do górników, i zmotywowaliśmy ich, dając im tę nagrodę za blok. Będzie też niewielka kwota, którą każda osoba płaci za transakcję, ale dojdziemy do tego w późniejszym odcinku. Nie chcemy teraz rozmawiać o gazie, ale warto wiedzieć, że istnieje zachęta nie tylko do wykopania bloku, ale do wykopania pełnego bloku z wieloma transakcjami. Ale to mniejsza zachęta — w końcu do tego dojdziemy.

#### Niezmienność łańcucha (19:51) {#chain-immutability-1951}

W miarę jak bloki są kopane, stają się coraz bardziej bezpieczne. Pozwólcie, że pokażę wam, co mam na myśli. Więc Mike wykopał blok, Mallory była tutaj, robiąc demonstrację i nie była w stanie wykopać bloku. Więc teraz łańcuch Mike'a będzie najdłuższy i rozejdzie się po sieci. Wszyscy go zobaczą i powiedzą: okej, ten łańcuch ma siedem bloków, wszystkie są prawidłowe — to jest ten, za którym będziemy podążać. Możesz mieć twarde rozwidlenia (hard forks), sporne rozwidlenia, w których zasady, według których gramy, ulegną zmianie, a różne grupy ludzi będą chciały podążać za różnymi łańcuchami. Fajna sprawa.

Okej, na koniec, jeśli wrócimy do bloku trzeciego i coś zmienimy — zmienimy jakikolwiek drobny szczegół — wejdę tutaj. Jest jakaś transakcja do Franka. Powiedzmy, że zamiast Franka zmienimy to na Eve. Teraz patrzcie, co się stanie, gdy kliknę okej: spójrzcie na to. Zmieniłem malutki kawałek bloku trzeciego i nagle cały łańcuch się rozpada. Nie jest już prawidłowy. Gdybym miał to rozgłosić w sieci, ludzie by mnie wyśmiali.

Nie możesz niczego zmienić po wykopaniu bloku, chyba że wrócisz i ponownie wykopiesz te rzeczy po ich zmianie. W zasadzie musiałbym z powrotem podłączyć tutaj górnika i spróbować mieć wystarczająco dużo mocy, aby dogonić Mike'a aż tutaj z siedmioma blokami. Byłoby to bardzo, bardzo trudne. Im głębiej znajduje się blok, tym trudniej jest z niego wrócić. Fakt, że ten blok trzeci tutaj, gdzie Carlos wysłał 84 do Boba — Bob może być całkiem spokojny, wiedząc, że wiele bloków w głąb, te pieniądze na pewno tam są. Nie ma mowy, żeby doszło tu do jakiegoś spornego rozwidlenia — jestem bezpieczny. To właśnie nazywamy ostatecznością.

#### Podsumowanie (22:00) {#summary-2200}

Zamiast mieć księgę główną i ten problem z konsensusem, używamy dowodu pracy do przerzucania hashy w celu zatwierdzenia bloku — a „prawidłowy” oznacza arbitralną liczbę wiodących zer. Nadal będziemy napotykać problemy podczas budowania łańcucha bloków, gdzie wykopane bloki mogą w rzeczywistości docierać do różnych miejsc w różnym czasie. Mamy więc kolejny algorytm konsensusu, który mówi: podążaj za najdłuższym łańcuchem, który jest prawidłowy i który przestrzega zestawu reguł, w którym chcesz uczestniczyć.

W porządku, szczęśliwego piątku z muszką! To był blockchain na ETH.BUILD. Zapiszę to i wrzucę tam, żebyście mogli po prostu kliknąć „załaduj” i mieć łańcuch do zabawy. Szczęśliwego piątku!