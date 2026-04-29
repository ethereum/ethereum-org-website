---
title: "Dowody z wiedzą zerową wyjaśnione na 5 poziomach trudności"
description: "Informatyk wyjaśnia dowody z wiedzą zerową na pięciu różnych poziomach złożoności, od dziecka do eksperta."
lang: pl
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "prywatność-i-bezpieczeństwo"
  - "dowody-z-wiedzą-zerową"
  - "kryptografia"
format: explainer
author: WIRED
breadcrumb: "Dowody z wiedzą zerową"
---

Informatyk **Amit Sahai**, profesor w UCLA Samueli School of Engineering, wyjaśnia dowody z wiedzą zerową na pięciu poziomach złożoności, od dziecka do eksperta, w tej produkcji **WIRED**. Koncepcja ta jest demonstrowana za pomocą fizycznych analogii i omawiana z rosnącą szczegółowością techniczną, dzięki czemu jedno z najważniejszych pojęć kryptografii staje się przystępne dla każdego.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=fOGdb1CTu5c) opublikowanego przez WIRED. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

**Amit Sahai:** Cześć, nazywam się Amit Sahai i jestem profesorem informatyki w UCLA Samueli School of Engineering. Dziś poproszono mnie o wyjaśnienie dowodów z wiedzą zerową na pięciu poziomach o rosnącej złożoności.

Dowód z wiedzą zerową to sposób, w jaki prover może przekonać weryfikatora, że dane twierdzenie jest prawdziwe, nie ujawniając przy tym żadnych dodatkowych informacji poza samym faktem, że twierdzenie to jest prawdziwe. Dowody z wiedzą zerową są wykorzystywane w blockchainach i kryptowalutach. Kryptografowie są podekscytowani wiedzą zerową ze względu na jej niesamowite właściwości matematyczne, ale także ze względu na jej niezwykłe zastosowanie w wielu różnych scenariuszach.

#### Poziom 1: dziecko (0:41) {#level-1-child-041}

**Amit Sahai:** Jaki jest twój ulubiony przedmiot?

**Chelsea:** Powiedziałabym, że matematyka. Niektóre z małych problemów mogą być w rzeczywistości bardzo duże i skomplikowane. To jak układanka.

**Amit Sahai:** Uwielbiam matematykę z tego samego powodu. Dziś opowiem ci o czymś, co nazywa się dowodem z wiedzą zerową. W dowodzie z wiedzą zerową biorą udział dwie osoby — prover i weryfikator. Chcę ci udowodnić, że coś jest prawdą, ale dziwne jest to, że chcę ci to udowodnić, nie podając żadnych powodów, dlaczego tak jest. Pamiętam, że kiedy usłyszałem o tym po raz pierwszy, pomyślałem: zaraz, co? Jak to w ogóle możliwe?

Więc co widzisz na tym zdjęciu?

**Chelsea:** Dużo pingwinów.

**Amit Sahai:** Tak. Wśród tych wszystkich pingwinów ukryty jest maskonur. Chcesz spróbować go poszukać? Widzisz, gdzie jest? Ja wiem, gdzie on jest, ale nie chcę ci powiedzieć. Wierzysz mi?

**Chelsea:** Tak.

**Amit Sahai:** A co, jeśli mógłbym ci udowodnić, że wiem, gdzie jest maskonur, nie ujawniając ci jego położenia? Pozwól, że ci pokażę. Wziąłem to zdjęcie i umieściłem je za tym plakatem. Dlaczego nie spojrzysz przez ten otwór?

**Chelsea:** Widzę maskonura.

**Amit Sahai:** Więc kiedy patrzysz na tę planszę, nie wiemy, gdzie było zdjęcie, prawda? Czy zdjęcie miało róg tutaj, w którym to przypadku maskonur byłby całkowicie po tej stronie? Czy też zdjęcie miało róg tutaj, w którym to przypadku maskonur byłby po drugiej stronie? To jest naprawdę prosty przykład dowodu z wiedzą zerową. Przekonałem cię, że wiem, gdzie jest maskonur, ale nie dowiedziałaś się niczego więcej.

**Chelsea:** Dlaczego badasz dowody z wiedzą zerową?

**Amit Sahai:** Kiedy po raz pierwszy się o nich dowiedziałem, po prostu pomyślałem, że są super. Ale okazuje się, że są również bardzo przydatne — nie tylko do szukania maskonurów. Jeśli po prostu wpiszesz swoje hasło, a haker włamie się do komputera, może je po prostu zdobyć. A co, jeśli zamiast tego moglibyśmy w jakiś sposób użyć dowodu z wiedzą zerową do logowania? Mogłabyś po prostu udowodnić, że jesteś Chelsea, nie ujawniając im niczego. Gdybyś mogła to zrobić, byłoby to niesamowite, ponieważ nawet gdyby haker włamał się do komputera, niczego by się nie dowiedział — ponieważ nawet komputer niczego się nie dowiaduje.

Więc Chelsea, twoimi własnymi słowami, czym jest dowód z wiedzą zerową?

**Chelsea:** Dowód z wiedzą zerową to dowód na jakieś twierdzenie. Nie pokazujesz im dlaczego ani co. Po prostu pokazujesz im mały fragment lub robisz jakąś dziwną sztuczkę magiczną, która tak naprawdę nie jest sztuczką magiczną, a oni będą przekonani. I nie pokazałeś im dlaczego, ani niczego w tym stylu.

#### Poziom 2: nastolatek (3:31) {#level-2-teen-331}

**Amit Sahai:** Czy słyszałeś kiedyś wcześniej termin dowód z wiedzą zerową?

**Teen:** Nie, nie słyszałem.

**Amit Sahai:** To sposób, w jaki prover może przekonać weryfikatora, że coś jest prawdą, nie ujawniając niczego na temat tego, dlaczego jest to prawdą, co brzmi całkowicie dziwacznie. Chcę ci udowodnić, że znam tę kombinację, nie ujawniając ci jej. A ty mógłbyś napisać małą notatkę, sekret, którego na pewno bym nie znał. Złóż ją i włóż tutaj. A potem, jeśli znam kombinację, powinienem być w stanie to otworzyć i powiedzieć ci, co napisałeś.

W porządku. „Mój pies wabi się Doug”.

**Teen:** Czy zorientowałeś się, jaka była kombinacja?

**Amit Sahai:** Nie. Więc nigdzie w tej interakcji nie zobaczyłeś żadnych informacji, których byś już nie znał. A jednak przekonałem cię, że znam kombinację.

**Teen:** Więc jaki jest dokładny cel dowodu z wiedzą zerową? Czy to jak udowadnianie czegoś, ale bez podawania wystarczającej ilości informacji, które mogłyby zagrozić temu, co udowadniasz?

**Amit Sahai:** Ludzie sobie nie ufają. A gdybym był w stanie udowodnić komuś, że zrobiłem coś poprawnie, bez konieczności ujawniania moich sekretów, to ta osoba ufałaby mi bardziej.

**Teen:** Jak to się ma do technologii komputerowej? Czy to interakcja osobista?

**Amit Sahai:** Załóżmy, że chciałbyś wymieniać wiadomości z kimś, kogo znasz. Prawdopodobnie najpierw byście się spotkali i wymyślili jakiś tajny kod, prawda? A potem pisalibyście do siebie wiadomości w tym kodzie. Ale co, jeśli nigdy wcześniej nie spotkałeś tej osoby? Co, jeśli chcesz wymieniać ze mną tajne wiadomości, a my nigdy wcześniej się nie spotkaliśmy? Jak moglibyśmy to zrobić?

**Teen:** Nie mam pojęcia.

**Amit Sahai:** Brzmi to niemożliwie, prawda? Ale tak nie jest. Nie użyłbyś fizycznego zamka ani fizycznego pudełka. Zamiast tego użylibyśmy matematyki do robienia tego typu rzeczy. Mógłbyś wziąć wiadomość i zaszyfrować ją za pomocą matematyki. A potem mógłbym ci udowodnić, że znam klucz, otworzyć ją i odesłać z powrotem do ciebie. W ten sposób udowodniłbym ci, że znam matematyczny klucz do matematycznej skrytki.

Więc na podstawie tego, o czym dzisiaj rozmawialiśmy, twoimi własnymi słowami, czym jest dowód z wiedzą zerową?

**Teen:** To tak, jakbyś miał ten naprawdę ważny sekret, o którym chcesz, żeby ktoś wiedział, ale nie chcesz mu mówić wszystkiego. Możesz użyć dowodu z wiedzą zerową, aby udowodnić im ten sekret, ale nie zdradzać go w całości.

#### Poziom 3: student (6:13) {#level-3-college-student-613}

**Amit Sahai:** Co studiujesz?

**College Student:** Jestem studentem pierwszego roku informatyki na USC Viterbi. Interesuję się wszystkim, co dotyczy danych, internetu, blockchaina i kryptowalut.

**Amit Sahai:** Czy słyszałeś kiedyś o dowodach z wiedzą zerową?

**College Student:** Tylko przelotnie.

**Amit Sahai:** Właściwie przestrzeń blockchain to jedno z miejsc, w których widzimy wdrażanie dowodów z wiedzą zerową — i myślę, że to dopiero początek. W swojej istocie dowód z wiedzą zerową to interakcja między dwiema osobami. Powinienem być w stanie przekonać cię, że jakieś twierdzenie jest prawdziwe, ale nie będziesz miał pojęcia, dlaczego jest prawdziwe.

Sposób, w jaki do tego podejdziemy, to coś, co nazywa się NP-zupełnością. Problem NP-zupełny to problem, który jest naprawdę trudny do rozwiązania. Ale jeśli potrafisz go rozwiązać, możesz rozwiązać każdy problem z klasy NP — a to obejmuje ogromną liczbę problemów. Użyjemy problemu NP-zupełnego, aby w rzeczywistości udowodnić niesamowitą różnorodność twierdzeń za pomocą dowodu z wiedzą zerową. Konkretny problem NP-zupełny, któremu się przyjrzymy, nazywa się problemem trójkolorowania mapy.

Mamy tutaj mapę z wieloma krajami, ułożonymi tak, że żadne kraje o tym samym kolorze nie dzielą granicy. To właśnie sprawia, że taka mapa jest poprawnie pokolorowana. Okazuje się, że to, czy mapę można w ten sposób pokolorować trzema kolorami, jest przykładem problemu NP-zupełnego.

Być może to, co naprawdę chcesz zrobić, to przedstawić dowód z wiedzą zerową, że masz co najmniej 0,3 Bitcoin, nie ujawniając adresu swojego konta. Okazuje się, że mogę wziąć to twierdzenie i przekształcić je w mapę krajów. Ta mapa krajów będzie mogła być pokolorowana trzema kolorami tylko wtedy, gdy masz co najmniej 0,2 Bitcoin.

**College Student:** Jak moglibyśmy zamienić coś takiego w dowód z wiedzą zerową?

**Amit Sahai:** Oczywiście pierwszym krokiem jest wymazanie wszystkich kolorów. Włożyłem kolor do każdej z tych kopert. Skąd wiesz, że to poprawne kolorowanie? Nie wiesz. Musisz wybrać dowolne dwa sąsiadujące kraje — możesz je wybrać jak chcesz, losowo.

**College Student:** Mogę wziąć te dwa?

**Amit Sahai:** Tutaj mamy zielony, a tutaj niebieski. Jak widzisz, to dwa różne kolory. Więc masz trochę pewności, że udało mi się to poprawnie pokolorować — ale nie aż tak dużą, ponieważ pokazałem ci tylko dwa kraje. Jednym ze sposobów na uzyskanie większej pewności jest otwarcie większej ich liczby, ale to ujawniłoby ci informacje. Nie chcę tego robić.

Więc zamiast tego poproszę cię, żebyś się odwrócił. A teraz zmieńmy te kolory.

Czy możesz wybrać losowo dwa kraje, a my ponownie odkryjemy dwa kolory.

**College Student:** Wezmę ten i ten.

**Amit Sahai:** To mądre z twojej strony, że sprawdzasz ten sam, który już miałeś. Ale jak zobaczysz, teraz nie jest zielony — jest niebieski. A ten z kolei jest zielony. Kolory, które pokazałem ci ostatnio, nie pasują do tych nowych kolorów. Ale to działa dla tego kolorowania, które pokazuję ci w tej chwili. Więc to, co zrobiliśmy, to uniemożliwiliśmy ci poskładanie elementów w całość. A jeśli zrobisz to tysiąc razy, a ja za każdym razem poprawnie pokażę ci różne kolory, będziesz naprawdę przekonany. I to wszystko — to jest cały dowód z wiedzą zerową.

**College Student:** Więc czy to jest jak dowód probabilistyczny?

**Amit Sahai:** Tak. W rzeczywistych implementacjach nie użylibyśmy kopert — użylibyśmy szyfrowania. Ale to jest protokół.

**College Student:** Więc jakie są szersze implikacje dowodów z wiedzą zerową? Czy mają być bardziej praktyczne we wdrożeniu, czy też mają coś strukturalnie udowadniać?

**Amit Sahai:** Nie chodzi o to, by uczynić coś bardziej wydajnym. Chodzi o robienie rzeczy, których po prostu wcześniej nie potrafiliśmy zrobić. Mogę ci w rzeczywistości udowodnić, nie ujawniając żadnych moich sekretów, że zachowuję się uczciwie. Mógłbym ci udowodnić, że poprawnie podpisałem jakiś zaszyfrowany dokument, nie ujawniając, czym był ten tajny dokument. Ta zdolność do zmiany reguł gry — do rzeczywistej zmiany tego, co możemy zrobić — jest tym, co wnosi wiedza zerowa.

**College Student:** Gdzie twoim zdaniem moglibyśmy zbudować więcej zaufania, używając dowodów z wiedzą zerową?

**Amit Sahai:** Jednym ze świetnych przykładów są wybory. Gdybyś mógł udowodnić, że wybory zostały przeprowadzone poprawnie — że każdy głos został policzony i wszystko złożyło się na wygraną jednej osoby z określoną sumą — z wiedzą zerową, to nie musiałbyś ujawniać rzeczywistych głosów żadnej osoby. A jednak każdy mógłby zobaczyć, że zostało to zrobione poprawnie.

#### Poziom 4: doktorant (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Wspaniale, że tu jesteś i mogę z tobą porozmawiać, Eli. Czy możesz mi opowiedzieć trochę o swoich badaniach?

**Eli:** Moje badania dotyczą kryptografii. Konkretnie pracuję nad pewnymi protokołami wielostronnych obliczeń. Ten, nad którym obecnie pracuję, to system do obliczania zagregowanych statystyk, dzięki któremu dostawcy usług, tacy jak Google Chrome czy Tesla, mogą zbierać te statystyki, nie dowiadując się niczego o danych poszczególnych użytkowników. Ja, jako użytkownik, nie muszę informować Firefoksa, że moją ulubioną stroną internetową jest mylittlepony.com. Ale mogą wiedzieć, ilu użytkowników wchodzi na mylittlepony.com każdego dnia.

**Amit Sahai:** To niesamowite. Wielostronne obliczenia są mi bardzo bliskie. Oczywiście dowody z wiedzą zerową polegają na udowadnianiu rzeczy innej osobie bez ujawniania szczegółów tego, co udowadniasz. Ale w moim odczuciu wiedza zerowa idzie jeszcze dalej. To nadrzędna koncepcja, którą często można dostrzec w wielostronnych obliczeniach, gdzie chcesz wykonać jakieś zadanie, nie ujawniając niczego więcej niż to, co jest dokładnie potrzebne do jego wykonania.

**Eli:** Zgadza się, i pozwala to udowodnić, że zachowywałeś się uczciwie, bez ujawniania jakichkolwiek związanych z tym sekretów, których używasz, aby faktycznie zachowywać się uczciwie. Wiemy, że dowody z wiedzą zerową dla języków NP-zupełnych odgrywają tak ogromną rolę w kryptografii. Jakie było twoje pierwsze doświadczenie z NP-zupełnością?

**Amit Sahai:** Moje pierwsze spotkanie miało miejsce na moich pierwszych zajęciach z algorytmów na studiach licencjackich. Język NP-zupełny to ten niesamowity problem, który nie tylko mówi ci o sobie, ale rozwiązanie tego problemu może w rzeczywistości powiedzieć ci o całej klasie naprawdę interesujących problemów.

**Eli:** Kiedy po raz pierwszy zacząłeś myśleć o dowodach jako o interaktywnej grze, w której ze sobą rozmawiamy, czy to sprawiło, że wiedza zerowa stała się możliwa?

**Amit Sahai:** Absolutnie. A pomysł, że losowość może być przydatna do udowodnienia czegoś — znowu, wydaje się tak sprzeczny z intuicją, jeśli pomyślimy o platońskim ideale dowodu. Nie ma tam losowości, nie ma niedeterminizmu.

**Eli:** Ma to związek z całą tą ideą wywrócenia dowodu do góry nogami. W starym, klasycznym dowodzie losowość jest wyraźnie sprzeczna z celem tego, co próbujesz zrobić, ponieważ próbujesz uczynić wszystko oczywistym i ujawnić przepływ informacji. Ale kiedy wywrócisz to do góry nogami i już nie próbujesz tego robić, nagle wszystkie złe właściwości losowości stają się dobre.

**Amit Sahai:** Dokładnie. Losowość jest nieprzewidywalna, a tego właśnie chcemy. Chcemy, aby ta nieprzewidywalność w rzeczywistości ukrywała informacje, które chcemy ukryć. Jak wykorzystałeś wiedzę zerową w projektach, nad którymi pracowałeś? Jakie wyzwania napotykasz?

**Eli:** Zazwyczaj najtrudniejszą częścią jest dokładne ustalenie, gdzie najlepiej jej użyć. Napisałem kilka artykułów, w których wykorzystano wiedzę zerową w bardziej teoretyczny sposób, ale jeśli chodzi o zastosowania, jedne z najbardziej ekscytujących zastosowań, jakie do tej pory widziałem, miały miejsce w przestrzeni blockchain.

**Amit Sahai:** Jakie są niektóre z wąskich gardeł wydajności?

**Eli:** Jedną z najfajniejszych rzeczy w dowodach z wiedzą zerową jest to, że jest ich tak wiele rodzajów — lubię nazywać je smakami. Ogólnie rzecz biorąc, kiedy używasz dowodów z wiedzą zerową w aplikacji, główne wąskie gardło zwykle leży po stronie provera.

**Amit Sahai:** Czy możesz wziąć zadanie provera i podzielić je na wiele równoległych obliczeń?

**Eli:** To bardzo ciekawe pytanie. Myślę, że jako dziedzina wciąż nie znamy na nie odpowiedzi. Jedną z najfajniejszych rzeczy, jakie widziałem w ciągu ostatnich trzech lub czterech lat, jest przejście od teorii do zastosowań — obserwowanie, jak wszystkie te niesamowite systemy, o których ludzie myśleli przez ostatnie 30 lat, zaczynają być na tyle wydajne, że można je stworzyć.

**Amit Sahai:** Bez wątpienia. A zwłaszcza w przypadku przetwarzania w chmurze — wykorzystanie mocy chmury do umożliwienia dowodów z wiedzą zerową byłoby niesamowite. Również w przestrzeni blockchain, jeśli chcesz przyspieszyć generowanie dowodów, gdyby można to było zrobić w sposób rozproszony, byłoby świetnie. Jedną z moich nadziei jest to, że siła wielostronnych obliczeń polega na łączeniu ludzi, którzy są wobec siebie nieufni. Czy możemy wziąć tę moc kryptografii i użyć jej, aby pomóc w rozwiązaniu problemu ogromnego poziomu nieufności, jaki istnieje obecnie w społeczeństwie?

**Eli:** Myślę, że to jeden z powodów, dla których tak bardzo pociągały mnie wielostronne obliczenia. Jednym z najważniejszych problemów na świecie jest fakt, że tak wielu ludzi sobie nie ufa. Możliwość wykorzystania matematyki do stworzenia technologii, która pozwala ludziom współpracować bez konieczności ufania sobie nawzajem, to naprawdę fajna i niesamowita misja.

#### Poziom 5: ekspert (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, wspaniale cię znów widzieć. Myślę, że ostatni raz spotkaliśmy się w 2017 roku czy coś koło tego.

**Shang-Hua:** Myślę, że raz rozmawialiśmy na Zoomie podczas pandemii, ale dobrze cię widzieć osobiście. Właściwie w '86 roku chodziłem na zajęcia z krypto z profesorem Leonardem Adlemanem, literą A w RSA. Przydzielił mi pracę Goldwasser, Micaliego i Charliego Rackoffa na temat dowodu z wiedzą zerową. Więc to była moja pierwsza w życiu prezentacja w tym kraju — na temat wiedzy zerowej.

**Amit Sahai:** To niesamowite. To niemal hipnotyzująca koncepcja.

**Shang-Hua:** Ciekawe jest również to, jak matematycznie sformułować te koncepcje. Na przykład mamy dane. Ostatecznie z danych, poprzez eksplorację danych, można uzyskać informacje. A potem mamy to słowo zwane „wiedzą”. Wiedza była długo dyskutowana nawet w filozofii. Czym jest wiedza? Ale oto bardzo fascynujący sposób, w jaki matematycy lub informatycy chcą uchwycić tę wiedzę. Nie powiedziano „dowód z zerową informacją”. Więc jakie jest twoje zdanie na temat tego, dlaczego „wiedza”, a nie „informacja” lub „dowód z zerowymi danymi”? Wyraźnie są tam dane, więc nie mogą to być zerowe dane.

**Amit Sahai:** Absolutnie. Nie sądzę, byśmy wciąż mieli w pełni satysfakcjonującą odpowiedź na to pytanie. Tym, co było tak pięknym spostrzeżeniem, jest idea, że wiedza zerowa to coś, co można już przewidzieć. Jeśli potrafisz już przewidzieć odpowiedź, to nie możesz zdobywać żadnej wiedzy dzięki tej interakcji. To spostrzeżenie — o możliwości dokładnego przewidywania przyszłości i o tym, że jest to dowód na brak nowej wiedzy — było tak pięknym, niesamowitym spostrzeżeniem.

**Shang-Hua:** Cóż, nie ma tu zerowej informacji. Zasadniczo, z perspektywy obliczeń i bezpieczeństwa, liczy się to, ile wiedzy zdobywasz, bardziej niż to, ile informacji zdobyłeś i ile masz danych. Dane nie oznaczają od razu wiedzy. Ale ludzie nie zawsze potrafią to rozróżnić.

**Amit Sahai:** Racja. Na przykład w badaniach medycznych — jak niesamowite byłoby posiadanie leku i udowodnienie, że działa on w tym modelu, bez konieczności ujawniania struktury związku?

**Shang-Hua:** Jakie według ciebie są kolejne kierunki w tej przestrzeni?

**Amit Sahai:** Ta koncepcja programów z wiedzą zerową pozwoliłaby na przeprowadzanie całkowicie dowolnych obliczeń w sposób z wiedzą zerową, bez żadnej interakcji. Mogę po prostu wziąć program, przekonwertować go na program z wiedzą zerową — lub program zaciemniony — a następnie po prostu wysłać go do ciebie. Możesz go uruchomić i czerpać korzyści z tych obliczeń, nie musząc już ze mną rozmawiać.

**Shang-Hua:** Zgadza się. Ma to charakter nieinteraktywny. Ale jest w tym weryfikowalność. W blockchainie zaczęto również włączać bardziej ogólny dowód z wiedzą zerową do księgi głównej.

**Amit Sahai:** Zdecydowanie jesteśmy teraz w momencie, w którym wiedza zerowa będzie wykorzystywana coraz częściej. Jest tak wiele konferencji i spotkań w przestrzeni wiedzy zerowej, na które ty i ja nie jesteśmy zapraszani — ponieważ są one dla ludzi, którzy tworzą, ludzi, którzy programują, a nie dla nas, matematyków. I myślę, że to znak. To znak, że nasze dziecko dorosło i nadszedł czas, aby je rozwijać.

**Shang-Hua:** Myślę, że to głębokie, studenci często pytają mnie, jakie są przyszłe kierunki — zarówno pod względem krypto, dowodu z wiedzą zerową, w prawdziwym świecie, jak i w obliczeniach matematycznych.

**Amit Sahai:** To świetne pytanie. Chciałbym móc zobaczyć przyszłość. Nie potrafię, ale spróbuję. Myślę, że zrobiliśmy tak wiele w kryptografii w ciągu ostatnich kilku dekad, ale tak mało rozumiemy. Najbardziej fundamentalnym aspektem jest zrozumienie trudności — jak uzyskujemy trudne problemy? Jak właściwie budujemy matematycznie trudne problemy, abyśmy mogli następnie użyć ich do budowy wydajnych programów i dowodów z wiedzą zerową?

**Shang-Hua:** Zgaduję również, że w obliczeniach kwantowych potrzebne są jeszcze trudniejsze problemy.

**Amit Sahai:** Rzeczywiście. Teraz, gdy zbliża się do nas widmo obliczeń kwantowych, wszyscy wiemy, że komputery kwantowe mogą złamać wiele systemów kryptograficznych. To ogromne wyzwanie. Czy możemy więc znaleźć nowe źródła trudności, które są odporne na ataki kwantowe — których nawet komputery kwantowe nie mogą złamać? To coś, nad czym pracuję od kilku ostatnich lat.

**Shang-Hua:** Ale jestem pewien, że zmotywują one do stworzenia pięknej matematyki.

**Amit Sahai:** Tak, zgadza się. Jedną z wspaniałych rzeczy w prawdziwym świecie jest to, że ludzie w prawdziwym świecie mają wymagania. A te wymagania często brzmią niemożliwie. I tu wkraczamy my — naszym zadaniem jest uczynienie niemożliwego możliwym.