---
title: Biała księga Ethereum
description: Dokument wprowadzający do Ethereum, opublikowany w 2013 r. przed jego uruchomieniem.
lang: pl
sidebarDepth: 2
---

# Biała księga Ethereum {#ethereum-whitepaper}

_Ten dokument wprowadzający został pierwotnie opublikowany w 2013 r. przez Vitalika Buterina, założyciela [Ethereum](/what-is-ethereum/), przed uruchomieniem projektu w 2015 r. Warto zauważyć, że Ethereum, podobnie jak wiele projektów oprogramowania opartych na społecznościach, rozwija się od czasu jego początkowego powstania._

_Przez okres kilkunastu lat, utrzymujemy ten dokument, ponieważ nadal służy on jako użyteczny punkt odniesienia i dokładna reprezentacja Ethereum i jego wizji. Aby dowiedzieć się o najnowszych zmianach w Ethereum i jak wprowadzone są zmiany w protokole, zalecamy [ten przewodnik](/learn/)._

## Inteligentny kontrakt nowej generacji i zdecentralizowana platforma aplikacji {#a-next-generation-smart-contract-and-decentralized-application-platform}

Rozwój Bitcoina przez Satoshi Nakamoto w 2009 roku był często chwalony jako radykalny rozwój pieniądza i waluty, będący pierwszym przykładem zasobu cyfrowego, który jednocześnie nie ma wsparcia lub [wartości](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/) i brak scentralizowanego emitenta lub kontrolera. Jednak kolejna - prawdopodobnie ważniejsza - część eksperymentu Bitcoin to podstawowa technologia blockchain jako narzędzie rozproszonego konsensusu i uwaga szybko zaczyna się przechodzić na ten inny aspekt Bitcoina. Często cytowane alternatywne zastosowania technologii blockchain obejmują użycie zasobów cyfrowych w blockchain do reprezentowania niestandardowych walut oraz instrumentów finansowych ([kolorowych monet](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)), własność podstawowego urządzenia fizycznego ([smart property](https://en.bitcoin.it/wiki/Smart_Property)), aktywów niezamiennych takich jak nazwy domen ([Namecoin](http://namecoin.org)), dodatkowo jako bardziej złożone aplikacje polegające na tym, że aktywa cyfrowe są kontrolowane bezpośrednio przez element kodu, wdrażający arbitralne reguły ([inteligentnych kontraktów](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)) lub nawet blockchain [zdecentralizowanych autonomicznych organizacji](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/) (DAO). To, co zamierza zapewnić Ethereum, to blockchain z wbudowanym w pełni rozwiniętym językiem programowania Turinga, którego można użyć, by tworzyć „kontrakty”, które mogą być użyte do zakodowania dowolnej zmiany stanu funkcji, pozwalającej użytkownikom na tworzenie dowolnych z opisanych powyżej systemów, a także wiele innych, których jeszcze nie wyobrażaliśmy sobie, po prostu pisząc logikę w kilku linijkach kodu.

## Wprowadzenie do Bitcoina i istniejących koncepcji {#introduction-to-bitcoin-and-existing-concepts}

### Historia {#history}

Koncepcja zdecentralizowanej waluty cyfrowej, a także alternatywnych aplikacji, takich jak rejestry nieruchomości, istnieje od dziesięcioleci. Anonimowe protokoły e-gotówki z lat 80. i 90., oparte głównie na prymitywie kryptografii znanym jako oślepienie Chaumiana, głównym założeniem było że będzie to waluta o wysokim stopniu prywatności, ale protokoły w dużej mierze zawiodły. zyskały przyczepność ze względu na ich zależność od scentralizowanego pośrednika. W 1998 r. Wei Dai's [b-money](http://www.weidai.com/bmoney.txt) stał się pierwszą propozycją wprowadzenia pomysłu tworzenia pieniędzy poprzez rozwiązywanie zadań obliczeniowych oraz zdecentralizowanego konsensusu, jednak wniosek nie zawierał szczegółowych informacji na temat tego, w jaki sposób zdecentralizowany konsensus mógłby zostać faktycznie wdrożony. W 2005 roku Hal Finney wprowadził koncepcję [nadającego się do wielokrotnego użytku dowody pracy](http://nakamotoinstitute.org/finney/rpow/), system który wykorzystuje pomysły z b-money wraz z obliczeniami Adama Backa trudne zagadki Hashcash do stworzenia koncepcji kryptowaluty, ale po raz kolejny nie spełnił ideału, opierając się na zaufanych komputerach jako zaplecza. W 2009 r. zdecentralizowana waluta została po raz pierwszy wdrożona w praktyce przez Satoshi Nakamoto, połączenie ustanowionych prymitywów do zarządzania własnością za pomocą kryptografii klucza publicznego z algorytmem konsensusu do śledzenia tego, kto jest właścicielem monet, znany jako „dowód pracy”.

Mechanizm dowodu pracy był przełomem w przestrzeni ponieważ jednocześnie rozwiązał dwa problemy. Po pierwsze, zapewnił prosty i umiarkowanie skuteczny algorytm konsensusu, umożliwiający węzłom w sieci do wspólnego uzgodnienia zestawu kanonicznych aktualizacji do to stanu księgi Bitcoin. Po drugie, zapewnił mechanizm pozwalający na swobodne wejście do procesu konsensusu, rozwiązanie politycznego problemu decydowania o tym, kto ma wpływ na konsensus, przy czym jednocześnie zapobiega atakom sybili. Czyni to, zastępując formalną barierę dla uczestnictwa, np. wymóg rejestracji jako niepowtarzalny podmiot w określonym wykazie, z ekonomiczną barierą - waga pojedynczego węzła w procesie głosowania konsensualnego jest wprost proporcjonalna do mocy obliczeniowej, którą tworzy węzeł. Od tamego czasu zaproponowano alternatywne podejście zwane _dowodem stawki_, obliczanie wagi węzła jako proporcjonalnej do jego waluty i zasobów obliczeniowych; dyskusja nad względnymi zaletami tych dwóch podejść wykracza poza zakres niniejszego dokumentu, ale należy zauważyć, że oba podejścia mogą służyć jako szkielet kryptowaluty.

Oto wpis na blogu od Vitalika Buterina, założyciela Ethereum, na temat [prehistorii Ethereum](https://vitalik.ca/general/2017/09/14/prehistory.html). [Tutaj](https://blog.ethereum.org/2016/02/09/cut-and-try-building-a-dream/) jest kolejny post przedstawiający więcej informacji o historii.

### Bitcoin jako system przejścia między stanami {#bitcoin-as-a-state-transition-system}

![Zmiana stanu Ethereum](./ethereum-state-transition.png)

Z technicznego punktu widzenia księga kryptowalut takich jak Bitcoin może być uważana za system transformacji stanu, gdzie jest "stan" składający się ze statusu własności wszystkich istniejących bitcoinów i "funkcja transformacji stanu", która przyjmuje stan i transakcję oraz wygeneruje nowy stan, który jest rezultatem. Przykładowo w standardowym systemie bankowym stan jest bilansem, transakcja jest prośbą o przeniesienie $X z A do B, a funkcja przejścia stanu zmniejsza wartość na koncie A o $X i zwiększa wartość na koncie B o $X. Jeśli konto A ma w pierwszej kolejności mniej niż X Usd, to stan funkcja przejścia zwraca błąd. Można zatem formalnie zdefiniować:

    ZASTOSUJ(S,TX) —>> S' lub BŁĄD

W systemie bankowym zdefiniowanym powyżej:

    Zastosuj ({ Alice: $50, Bob: $50 },"wyślij $20 z Alice do Bob") = { Alice: $30, Bob: $70 }

Ale:

    ZASTOSUJ({ Alice: $50, Bob: $50 }:,"wyślij 70 USD od Alicji do Roberta") = BŁĄD

"Stan" w Bitcoinach to kolekcja wszystkich monet (technicznie, "niewykorzystane wyniki transakcji" lub UTXO, które zostały wydobyte i jeszcze nie zostały wydane, z każdym UTXO o nazwie i właścicielu (określonym przez 20-bajtowy adres, który zasadniczo jest publicznym kluczem kryptograficznym<sup>[fn. 1](#notes)</sup>). Transakcja zawiera jedno lub więcej danych wejściowych, przy każdym wejściu zawierającym odniesienie do istniejącego UTXO i podpisu kryptograficznego wygenerowanego przez prywatny klucz powiązany z adresem właściciela, i jedno lub więcej wyjść z każdym wyjściem zawierającym nowe UTXO dodawane do stanu.

Funkcja przejścia stanu `APPLY(S,TX) -> S'` może być zdefiniowana w przybliżeniu w następujący sposób:

1.  Dla każdego wejścia w `TX`:

    - Jeśli odniesienie UTXO nie jest w `S`, zwraca błąd.
    - Jeśli podany podpis nie pasuje do właściciela UTXO, zwraca błąd.

2.  Jeśli suma nominałów wszystkich wejściowych UTXO jest mniejsza niż suma nominałów wszystkich wyjściowych UTXO, zwraca błąd.
3.  Zwraca `S'` z usuniętymi wszystkimi wprowadzonymi wartościami UTXO i wszystkimi dodanymi wartościami UTXO.

Pierwsza połowa pierwszego kroku uniemożliwia nadawcom transakcji wydawanie monet, które nie istnieją, druga połowa pierwszego kroku uniemożliwia nadawcom transakcji wydawanie monet innych ludzi, a drugi wymusza zachowanie wartości. Aby użyć tego do płatności, protokół jest następujący. Załóżmy, że Alice chce wysłać 11,7 BTC do pracy. Najpierw Alice będzie szukać zestawu dostępnych UTXO które posiada w sumie do co najmniej 11.7 BTC. Realistycznie rzecz biorąc, Alice nie będzie w stanie uzyskać dokładnie 11,7 BTC; powiedzmy, że najmniejsza z nich to 6+4+2=12. Następnie tworzy transakcję z tymi trzema wejściami i dwoma wyjściami. Pierwsze wejście będzie miało wartość 11.7 BTC z adresem Boba jako jego właścicielem, a drugie będzie wartością 0. BTC "change",, a właścicielem jest Alice.

### Wydobycie {#mining}

![Bloki Ethereum](./ethereum-blocks.png)

Gdybyśmy mieli dostęp do godnej zaufania usługi scentralizowanej, ten system byłby błahy do wdrożenia; można je po prostu zakodować dokładnie tak, jak to opisano, za pomocą scentralizowanego dysku twardy serwera, aby śledzić stan serwera. Jednak za pomocą Bitcoina próbujemy zbudować zdecentralizowaną walutę systemu, więc będziemy musieli połączyć system przejścia stanów z system konsensusu w celu zapewnienia, że ​​wszyscy zgadzają się na kolejność transakcji. Zdecentralizowany proces konsensusu Bitcoina wymaga węzłów w sieci, aby nieustannie próbować tworzyć pakiety transakcji zwanych "blokami". Sieć ma produkować z grubsza jeden blok co dziesięć minut, z każdym blokiem zawierającym znacznik czasu, a nonce, odwołanie do (tj. hash of) poprzedniego bloku i lista wszystkich transakcji, które miały miejsce od poprzedniego bloku. Z czasem tworzy to trwały, ciągle rozwijający się "blockchain", który stale aktualizuje, aby reprezentować najnowszy stan księgi Bitcoin.

Algorytm sprawdzający, czy blok jest prawidłowy, wyrażony w tym paradygmatze, jest następujący:

1.  Sprawdź, czy poprzedni blok odwołany przez blok istnieje i jest ważny.
2.  Sprawdź, czy znacznik czasu bloku jest większy niż w poprzednim bloku<sup>[fn. 2](#notes)</sup> i niecałe 2 godziny w przyszłość
3.  Sprawdź, czy dowód pracy na bloku jest ważny.
4.  Niech `S[0]` będzie stanem na końcu poprzedniego bloku.
5.  Załóżmy, że `TX` jest listą transakcji z `n` transakcji. Za wszystkie `i` w `0... -1`, ustaw `S[i+1] = APPLY(S[i], X[i])` Jeśli jakakolwiek aplikacja zwróci błąd, wyjdź i zwróć fałsz.
6.  Zwróć true i zarejestruj `S[n]` jako stan na końcu tego bloku.

Zasadniczo, każda transakcja w bloku musi zapewniać prawidłowy stan przejścia od stanu kanonicznego przed wykonaniem transakcji do nowego stanu. Należy zauważyć, że stan nie jest zakodowany w bloku. jest to wyłącznie abstrakcja, która ma być zapamiętana przez węzeł walidacyjny i może być (bezpiecznie) obliczona tylko dla każdego bloku przez zaczynając od stanu genezy i sekwencyjnie stosując każdą transakcję w każdym bloku. Ponadto należy zwrócić uwagę, że kolejność, w której górnik zawiera transakcje w bloku ma znaczenie; jeżeli w bloku są dwie transakcje A i B takie, że B wydaje UTXO stworzone przez A, wtedy blok będzie prawidłowy, jeśli A pojawi się przed B, ale nie w przeciwnym wypadku.

Jednym z warunków ważności obecnych na powyższej liście, który nie jest znaleziony w innych systemach, jest wymóg „dowodu pracy”. Dokładny warunek polega na tym, że podwójny skrót SHA256 każdego bloku, traktowany jako liczba 256-bitowa, musi być mniejsza niż dynamicznie dostosowany cel, który od czasu pisania wynosi około 2<sup>187</sup>. Ma to na celu spowodowanie tworzenia bloków w sposób obliczeniowy "utwardzony", uniemożliwiając tym samym atakującym sybil retworzenie całego łańcucha bloków na ich korzyść. Ponieważ SHA256 jest zaprojektowany jako funkcja całkowicie nieprzewidywalna, jedynym sposobem na stworzenie poprawnego bloku jest po prostu próba i błąd, wielokrotne zwiększanie liczby nonce i patrząc, czy nowy skrót pasuje.

Przy obecnym celu \~2<sup>187</sup> sieć musi wykonać średnia z \~2<sup>69</sup> prób przed znalezieniem prawidłowego bloku; w ogólnie, cel jest rekalibrowany przez sieć co 2016 bloki, więc że średnio nowy blok jest tworzony przez jakiś węzeł w sieci co dziesięć minut. Aby zrekompensować górnikom to obliczenie pracy, górnik każdego bloku ma prawo do zawarcia transakcji dając sobie 12,5 BTC znikąd. Dodatkowo, jeśli jakakolwiek transakcja ma wyższy nominał całkowity na wejściu niż na wyjściach, różnica trafia również do górnika jako „opłata transakcyjna”. Nawiasem mówiąc, jest to jedyny mechanizm, za pomocą którego BTC są emitowane; stan genetyczny nie zawierał żadnych monet.

Aby lepiej zrozumieć cel górnictwa, zbadajmy co dzieje się w przypadku złośliwego atakującego. Ponieważ kryptografia bazowa Bitcoina jest znana jako bezpieczna, atakujący będzie kierował do jednej części systemu Bitcoin, która nie jest chroniona przez kryptografię bezpośrednio: kolejność transakcji. Strategia atakującego jest prosta:

1.  Wyślij 100 BTC do sprzedawcy w zamian za jakiś produkt (najlepiej szybką dostawę cyfrową)
2.  Poczekaj na dostawę produktu
3.  Wyprodukuj inną transakcję wysyłającą te same 100 BTC do siebie
4.  Staraj się przekonać sieć, że jego transakcja dla siebie to taka, która pojawiła się pierwszy.

Po wykonaniu kroku (1) po kilku minutach jakiś górnik uwzględni transakcję w bloku, powiedzmy numer bloku 270. Po około jednej godziny, pięć kolejnych bloków zostanie dodanych do łańcucha po tym bloku, z każdym z bloków pośrednio wskazującym transakcję, a tym samym „potwierdzającą”. W tym momencie sprzedawca zaakceptuje płatności w sfinalizowanej wersji i dostarczy produkt; ponieważ zakładamy, że to dobro cyfrowe, dostawa jest natychmiastowa. Teraz atakujący tworzy kolejną transakcję wysyłającą 100 BTC do siebie. Jeśli napastnik po prostu uwolni go do środowiska naturalnego, transakcja nie zostanie przetworzona; górnicy będą próbowali uruchomić `APPLY(S, X)` i zauważą, że `TX` zużywa UTXO, który już nie jest w stanie. Zamiast tego, napastnik tworzy "widek" blockchain, rozpoczynając od wydobycia innej wersji bloku 270 wskazującej na ten sam blok 269 jako element nadrzędny, ale z nową transakcją zamiast starej. Ponieważ dane bloku są różne, wymaga to ponownego potwierdzenia pracy. Ponadto nowa wersja bloku 270 atakującego ma inny hash, tak aby oryginalne bloki od 271 do 275 nie wskazywały na nią; w ten sposób oryginalny łańcuch i nowy łańcuch atakującego są całkowicie oddzielone. Reguła jest, że w forku najdłuższy blockchain jest prawdą, i tak legalni górnicy będą pracować w łańcuchu 275, podczas gdy sam atakujący pracuje w łańcuchu 270. Aby jego blockchain stał się najdłuższy, musiałby mieć więcej mocy obliczeniowej niż pozostała część sieci połączona w celu nadrabiania zaległości (tj. "51% ataku").

### Drzewa Merkle {#merkle-trees}

![SPV w Bitcoinie](./spv-bitcoin.png)

_Po lewej: wystarczy przedstawić tylko niewielką liczbę węzłów w drzewie Merkle, aby przedstawić dowód ważności gałęzi._

_Prawo: każda próba zmiany dowolnej części drzewa Merkle ostatecznie doprowadzi do niespójności w górę łańcucha._

Ważną funkcją skalowalności Bitcoina jest to, że blok jest przechowywany w wielopoziomowej strukturze danych. "hash" bloku to w rzeczywistości tylko skrót nagłówka bloku, około 200 bajtowych danych, które zawierają znacznik czasu, non, poprzedni skrót bloku i główny skrót struktury danych zwanej drzewem Merkle przechowującym wszystkie transakcje w bloku. Drzewo Merkle jest typem drzewa binarnego, złożony z węzłów z dużą liczbą węzłów liściowych u dołu drzewa zawierających podstawowe dane, zbiór węzłów pośrednich, w których każdy węzeł jest skrótem jego dwóch podrzędnych, a w końcu pojedynczym węzłem głównym, utworzono również z hashu jego dwóch dzieci, reprezentując "góra" drzewa. Drzewo Merkle ma na celu umożliwienie dostarczenia danych w bloku w części – węzeł może pobrać tylko nagłówek bloku z jednego źródła, niewielka część drzewa odnosząca się do nich z innego źródła i nadal musi być zapewniona, że wszystkie dane są poprawne. Powodem tego działania jest to, że hashuje szerzenie się w górę: jeśli złośliwy użytkownik próbuje zamienić fałszywą transakcję na dole drzewa Merkle, ta zmiana spowoduje zmianę w węźle powyżej, a, a następnie zmianę w węźle powyżej w końcu zmienia korzenie drzewa i tym samym skrót bloku, spowodowanie, że protokół zarejestruje go jako zupełnie inny blok (prawie na pewno z niepoprawnym dowodem pracy).

Protokół drzewa Merkle jest niewątpliwie niezbędny do zapewnienia stabilności w dłuższej perspektywie. „Pełny węzeł” w sieci Bitcoin, który przechowuje i przetwarza cały każdy blok, zajmuje od kwietnia 2014 r. około 15 GB dysku w sieci Bitcoin, i rośnie o ponad gigabajt miesięcznie. Obecnie jest to opłacalne dla niektórych komputerów stacjonarnych, a nie telefonów, a później w przyszłości tylko przedsiębiorstwa i hobbyści będą mogli wziąć w nim udział. Protokół znany jako "uproszczona weryfikacja płatności (SPV) pozwala na istnienie innej klasy węzłów, zwana "lekkie węzły", które pobierają nagłówki bloków, sprawdź dowód pracy na nagłówkach bloku, a następnie pobierz tylko "branches" związane z transakcjami, które są dla nich istotne. Pozwala to węzłom świetlnych określić ich mocną gwarancję bezpieczeństwa, jaki jest status każdej transakcji Bitcoin, i ich obecne saldo jest podczas pobierających tylko bardzo małą część całego łańcucha bloków.

### Alternatywne aplikacje Blockchain {#alternative-blockchain-applications}

Pomysł przejęcia podstawowej idei blockchain i zastosowania go do innych pojęć ma również długą historię. W 1998 roku pojawił się Nick Szabo z koncepcją [bezpiecznych tytułów własności z właścicielem autorytet](http://nakamotoinstitute.org/secure-property-titles/), a dokument opisujący „nowe postępy w technologii replikowanych baz danych” pozwoli na system oparty na blockchain do przechowywania rejestru osób posiada jaką ziemię, tworząc rozbudowane ramy zawierające koncepcje takie jak jako gospodarstwo rolne, zawłaszczenie i kastralny podatek gruntowy. Niestety nie był dostępny w tym czasie skuteczny system baz danych i dlatego protokół nigdy nie był wdrażany w praktyce. Jednak po 2009 roku, kiedy zdecentralizowany konsensus Bitcoina został opracowany szereg alternatywnych aplikacji, które szybko zaczęły się pojawić się.

- **Namecoin** - stworzony w 2010 roku, [Namecoin](https://namecoin.org/) jest go najlepiej opisać jako zdecentralizowaną bazę danych rejestracji nazw. W zdecentralizowanych protokołach, takich jak Tor, Bitcoin i BitMessage, musi być jakiś sposób identyfikacji kont, aby inni ludzie mogli z nimi współdziałać, ale we wszystkich istniejących rozwiązaniach jedynym dostępnym identyfikatorem jest pseudorandom hash, taki jak `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Najlepiej byłoby, gdyby było w stanie posiadać konto o nazwie takiej jak "george". Jednak problem polega na tym, że jeśli jedna osoba może utworzyć konto o nazwie "george", ktoś inny może użyć tego samego procesu do rejestracji "george" również dla siebie i podszywać się pod nie. Jedynym rozwiązaniem jest pierwszy do pliku, gdzie pierwszy rejestrator zakończył się sukcesem, a drugi porażka - problem doskonale pasujący do protokołu konsensusu Bitcoin. Naamecoin jest najstarszym i najbardziej udanym wdrożeniem systemu rejestracji nazw za pomocą takiego pomysłu.
- **Kolorowe monety** - celem [kolorowych monet](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) jest służyć jako protokół umożliwiający ludziom tworzenie własnych walut cyfrowych - lub w ważnym trywialnym przypadku waluty z jedną jednostką, tokenami cyfrowymi, na blockchainie Bitcoin. W protokole z kolorowych monet, jeden „wydaje” nową walutę publicznie przypisanie koloru do konkretnego Bitcoin UTXO i protokołu rekursywnie definiuje kolor innego UTXO tak, aby był taki sam jak kolor danych wejściowych, które wydała transakcja je tworząca (niektóre specjalne zasady obowiązują w przypadku wejść mieszanych kolorów). Pozwala użytkownikom na utrzymywanie portfeli zawierających tylko UTXO o określonym kolorze i wysyłanie ich w pobliżu podobnych do zwykłych bitcoinów, śledzenie wsteczne przez łańcuch bloków, aby określić kolor każdego UTXO, który otrzymuje.
- **Metacoiny** – ideą stojącą za metacoinem jest posiadanie protokołu który żyje na szczycie Bitcoina, używając transakcji Bitcoin do przechowywania transakcje metacoin, ale z innym przejściem stanu funkcja, `ZASTOSUJ'`. Ponieważ protokół metacoin nie może zapobiec nieprawidłowym transakcjom metacoin pojawiającym się w blockchain Bitcoina, dodawana jest reguła, że ​​jeśli `ZASTOSUJ'(S,TX)` zwraca błąd, protokół domyślnie to `ZASTOSUJ'(S,TX) = S`. Zapewnia to łatwy mechanizm tworzenia arbitralnego protokołu kryptowalutowego, potencjalnie z zaawansowanymi funkcjami, które nie mogą być zaimplementowane wewnątrz samego Bitcoina, ale przy bardzo niskich kosztach rozwoju od czasu złożoności wydobycia i tworzenia sieci są już przedmiotem protokołu Bitcoin. Metacoins zostały użyte do implementacji niektórych klas umów finansowych, rejestracji nazw i zdecentralizowanej wymiany.

Tak więc, ogólnie rzecz biorąc, istnieją dwa podejścia do budowania protokołu konsensusu: budowanie niezależnej sieci, i zbudowanie protokołu na górze Bitcoin. Trudno jest wdrożyć pierwsze podejście, choć w przypadku aplikacji takich jak Namecoin; każda indywidualna implementacja wymaga bootstrap niezależnego łańcucha bloków, oraz budowy i testowanie wszystkich niezbędnych zmian stanu i kodeksu tworzenia sieci. Dodatkowo, przewidujemy, że zestaw aplikacji dla zdecentralizowanej technologii konsensualnej będzie przebiegał zgodnie z rozdziałem prawa w którym zdecydowana większość aplikacji byłaby zbyt mała, aby uzasadnić ich własny blockchain, i zwracamy uwagę, że istnieją duże klasy zdecentralizowanych aplikacji, w szczególności autonomiczne organizacje, które muszą ze sobą współpracować.

Z drugiej strony podejście oparte na Bitcoinach ma wadę, że nie dziedziczy uproszczonych funkcji weryfikacji płatności Bitcoina. SPV działa dla Bitcoina, ponieważ może użyć głębokości blockchain jako proxy dla ważności; w pewnym momencie, gdy przodkowie transakcji pójdą wystarczająco daleko wstecz, można bezpiecznie powiedzieć, że byli oni legalnie częścią stanu. Z drugiej strony, metaprotokoły oparte na technologii blockchain nie można zmusić blockchain do nieuwzględniania transakcji, które nie są ważne w kontekście ich własnych protokołów. Stąd w pełni bezpieczna implementacja meta-protokołu SPV musiałaby zeskanować wstecz na początek blockchaina Bitcoin, aby ustalić, czy określone transakcje są prawidłowe. Obecnie wszystkie "lekkie" implementacje meta-protokołów bazujących na Bitcoinach opierają się na zaufanym serwerze, aby dostarczyć dane, Prawdopodobnie wysoce nieoptymalny wynik, zwłaszcza gdy jednym z podstawowych celów kryptowaluty jest wyeliminowanie konieczności zaufania.

### Skrypty {#scripting}

Nawet bez żadnych rozszerzeń, protokół Bitcoin w rzeczywistości ułatwia słabą wersję pojęcia "inteligentnych umów". UTXO in Bitcoin może być własnością nie tylko klucza publicznego; ale także bardziej skomplikowanym skryptem wyrażonym w prostym języku programowania. W tym paradygmacie wydatki transakcyjne, które UTXO musi podać dane, które spełniają wymagania skryptu. Nawet podstawowy mechanizm własności klucza publicznego jest wdrażany za pomocą skryptu: skrypt przyjmuje eliptyczny podpis krzywej jako dane wejściowe, weryfikuje ją w odniesieniu do transakcji i adresu będącego właścicielem UTXO i zwraca 1 jeśli weryfikacja jest udana i 0 w innym przypadku. Inne, bardziej skomplikowane skrypty istnieją dla różnych dodatkowych przypadków użycia. Na przykład można zbudować skrypt wymagający podpisów z dwóch z trzech wybranych kluczy prywatnych do walidacji ("multisig"), konfiguracja przydatna dla kont korporacyjnych, zabezpiecz konta oszczędnościowe i niektóre sytuacje powiernika. Skrypty mogą również być używane do płacenia nagród za rozwiązania problemów obliczeniowych i jeden może nawet skonstruować skrypt, który mówi coś w stylu „ten Bitcoin UTXO jest twój, jeśli możesz dostarczyć dowód SPV, że wysłałeś Dogecoin transakcja tego nominału do mnie”, zasadniczo pozwalająca na zdecentralizowaną wymianę między kryptowalutami.

Jednak język skryptu zaimplementowany w Bitcoinach ma kilka ważnych ograniczeń:

- **Brak kompletności w sensie Turinga ** - to znaczy, że choć istnieje duży podzbiór obliczeń, które obsługuje język skryptowy Bitcoin, nie obsługuje on jednak wszystkiego. Główna kategoria, której brakuje, to pętle. Wykonuje się to w celu uniknięcia nieskończonych pętli podczas weryfikacji transakcji; teoretycznie jest to przeszkoda dla programistów skryptów, ponieważ dowolna pętla może być symulowana przez po prostu wielokrotne powtarzanie kodu bazowego z instrukcją, ale prowadzi to do bardzo nieefektywnych w przestrzeni skryptów. Na przykład implementacja alternatywnego algorytmu podpisu eliptycznego prawdopodobnie wymagałaby 256 powtarzanych mnożeń zaokrągla wszystkie osobno zawarte w kodzie.
- **Ślepota na wartości** - nie ma sposobu, aby skrypt UTXO zapewniał szczegółową kontrolę kwoty, która może zostać pobrana. Na przykład jednym potężnym przypadkiem wykorzystania kontraktu wyroczni byłby kontrakt zabezpieczający, gdzie A i B umieściły BTC o wartości 1000 USD i po 30 dniach, skrypt wysyła BTC o wartości 1000 USD do A, a resztę do B. Wymagałoby to wyroczni do określenia wartości 1 BTC w USD, ale nawet wtedy jest to ogromna poprawa pod względem zaufania i potrzeba infrastruktury nad w pełni scentralizowanymi rozwiązaniami, które są obecnie dostępne. Jednakże, ponieważ UTXO są typu "wszystko albo nic", jedynym sposobem, aby to osiągnąć jest bardzo nieefektywny hacking polegający na posiadaniu wielu UTXO o różnych nominałach (np. jedno UTXO o wartości 2<sup>k</sup> na każde k do 30) i posiadaniu O wyboru, które UTXO wysłać do A, a które do B.
- **Brak stanu** – [UTXO można wydać lub zostawić niewykorzystane](https://bitcoin.org/en/glossary/unspent-transaction-output); nie ma możliwości na wieloetapowe kontrakty czy skrypty, które utrzymują jakikolwiek inny wewnętrzny stan poza tym. To sprawia, że trudno jest tworzyć wieloetapowe kontrakty opcji, zdecentralizowane oferty wymiany lub dwuetapowe protokoły zobowiązań kryptograficznych (niezbędne do zabezpieczenia pól obliczeniowych). Oznacza to również, że UTXO może być używany tylko do: buduj proste, jednorazowe kontrakty i nie bardziej złożone „stanowe” kontrakty, takie jak zdecentralizowane organizacje i sprawia, meta-protokoły trudne do wdrożenia. Stan binarny w połączeniu z ślepotą wartości oznacza również, że inna ważna aplikacja, limity wypłaty jest niemożliwa.
- **Blockchain-blindness** - UTXO są ślepe na dane blockchain, takie jak nonce znacznik czasu i poprzedni hash bloku. To bardzo ogranicza zastosowania w grach i kilku innych kategoriach, przez pozbawienie języka skryptowego potencjalnie cennego źródła losowości.

Widzimy zatem trzy podejścia do budowania zaawansowanych aplikacji bazujących na kryptowalucie: budowanie nowego blockchaina, używanie skryptów bazujących na Bitcoin i budowanie metaprotokołu opartego na Bitcoin. Budowanie nowego blockchainu pozwala na nieograniczoną swobodę w budowaniu zestawu funkcji, ale kosztem czasu rozwoju, wysiłku przy uruchamianiu i bezpieczeństwa. Korzystanie ze skryptów jest łatwe do wdrożenia i standaryzacji, ale jest bardzo ograniczone w swoich możliwościach, a metaprotokoły, choć łatwe, cierpią z powodu błędów w skalowalności. Dzięki Ethereum zamierzamy zbudować alternatywny framework, który zapewnia jeszcze większe korzyści w łatwości rozwoju, jak również jak również jeszcze silniejsze właściwości lekkiego klienta, a jednocześnie pozwala aplikacjom na współdzielenie środowiska ekonomicznego i bezpieczeństwa blockchainu.

## Ethereum {#ethereum}

Celem Ethereum jest stworzenie alternatywnego protokołu do budowy zdecentralizowanych aplikacji, zapewnienie innego zestawu kompromisów, które uważamy za bardzo przydatne dla dużej klasy zdecentralizowanych aplikacji, ze szczególnym naciskiem na sytuacje, w których szybki czas rozwoju, bezpieczeństwo dla małych i rzadkich zastosowań i zdolność różnych aplikacji do bardzo efektywnej interakcji jest istotna. Ethereum robi to budując to, co zasadniczo jest najlepszą abstrakcyjną warstwą podstawową: blockchain z wbudowanym językiem programowania, umożliwienie każdemu pisania inteligentnych kontraktów i zdecentralizowanych aplikacji, w których mogą tworzyć własne arbitralne zasady własności, formaty transakcji i funkcje przemiany stanu. Wersję „gołej kości” Namecoina można zapisać w dwóch linijkach kodu, a inne protokoły, takie jak waluty i systemy reputacji, mogą być zbudowany w czasie poniżej dwudziestu lat. Inteligentne kontrakty, „skrzynki” kryptograficzne, które zawierają wartość i odblokowują je tylko wtedy, gdy spełnione są określone warunki, można również budować na platformie z znacznie większą mocą niż oferowaną przez skryptowanie Bitcoina z powodu dodatkowych potęg Trójkompletność, świadomość wartości, świadomość blockchain-a i stan.

### Filozofia {#philosophy}

Ethereum ma być zaprojektowane zgodnie z następującymi zasadami:

1.  **Prostota**: protokół Ethereum powinien być jak najprostszy. Nawet kosztem mniejszej efektywności przechowywania danych lub czasu <sup>[fd. 3](#notes)</sup> Średni programista powinien być w stanie śledzić i implementować całą specyfikację,<sup>[fn. 4](#notes)</sup> tak, aby w pełni wykorzystać bezprecedensowy potencjał demokratyzacji, który kryptowaluta wnosi i rozwija wizję Ethereum jako protokół, który jest otwarty dla wszystkich. Żadna optymalizacja która zwiększa złożoność nie powinna być uwzględniona, chyba że optymalizacja ta zapewnia znaczną korzyść.
2.  **Uniwersalność**: zasadnicza część filozofii projektowej Ethereum jest taka, że Ethereum nie posiada "funkcji".<sup>[fn. 5](#notes)</sup> Zamiast tego Ethereum zapewnia wewnętrzny Skrypt Turing-complete język, który programista może użyć do budowy inteligentnej umowy lub typu transakcji, które mogą być zdefiniowane matematycznie. Chcesz wynaleźć własną finansową pochodną? Z Ethereum, możesz. Chcesz stworzyć własną walutę? Skonfiguruj jako kontrakt Ethereum. Chcesz skonfigurować całą skalę Daemona lub Skynet? Być może będziesz potrzebować kilku tysiący powiązanych umów i pamiętaj, aby je nakarmić hojnie, ale nic Cię nie powstrzymuje z Ethereum i Twoimi opuszkami palców.
3.  **Modularność**: części protokołu Ethereum powinny być zaprojektowane tak, aby były tak modułowe i możliwe do oddzielenia. W trakcie rozwoju, naszym celem jest stworzenie programu, w którym gdybyś miał wykonać małą modyfikację protokołu w jednym miejscu, stos aplikacji nadal funkcjonowałby bez żadnych dalszych modyfikacji. Innowacje takie jak Ethash (patrz [Żółty papier załącznik](https://ethereum.github.io/yellowpaper/paper.pdf#appendix.J) lub [artykuł wiki](https://github.com/ethereum/wiki/wiki/Ethash)), zmodyfikowanych drzew Patricia ([Żółty papier](https://ethereum.github.io/yellowpaper/paper.pdf#appendix.D), [wiki](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)) i RLP ([YP](https://ethereum.github.io/yellowpaper/paper.pdf#appendix.B) [wiki](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)) powinien być i jest wdrożony jako oddzielna, funkcjonalnie wypełniona biblioteka. Jest to takie, że nawet jeśli są używane w Ethereum, nawet jeśli Ethereum nie wymaga pewnych funkcji, takie funkcje są nadal przydatne również w innych protokołach. Rozwój Ethereum powinien być maksymalnie wykonany, aby przynieść korzyści całemu ekosystemowi kryptowalut, a nie tylko samemu.
4.  **Zdolność**: szczegóły protokołu Ethereum nie są ustawione w kamieniach. Chociaż będziemy bardzo roztropni w zakresie wprowadzania zmian do konstrukcji wysokiego szczebla, na przykład z [odcięciem mapy drogowej](https://ethresear.ch/t/sharding-phase-1-spec/1407/), abstrakcyjnym wykonaniem, przy czym tylko dostępność danych zapisana jest w konsensusie. Testy obliczeniowe później w procesie opracowywania mogą prowadzić do odkrycia, że niektóre modyfikacje, np. do architektury protokołu lub do maszyny wirtualnej Ethereum (EVM) znacząco zwiększą skalowalność lub bezpieczeństwo. Jeśli znajdziemy takie możliwości, wykorzystamy je.
5.  **Niedyskryminacja** i **niecenzura**: protokół powinien nie próbować aktywnie ograniczać lub zapobiegać określonym kategoriom stosowania. Wszystkie mechanizmy regulacyjne zawarte w protokole powinny być zaprojektowane w taki sposób, aby bezpośrednio regulować szkody i nie próbować sprzeciwiać się określonym niepożądanym aplikacjom. Programista może nawet uruchomić nieskończoną pętlę na szczycie Ethereum tak długo, jak długo będą chciały utrzymać płacenie opłaty transakcyjnej.

### Konta Ethereum {#ethereum-accounts}

W Ethereum stan składa się z obiektów zwanych "kontami", z każdym kontem o 20-bajtowym adresie i przejściach stanu są bezpośrednie transfery wartości i informacji pomiędzy kontami. Konta Ethereum mają cztery pola:

- **nonce**, licznik używany do upewnienia się, że każda transakcja może być przetworzona tylko raz
- Bieżące saldo **etheru konta**
- **kod umowy konta**, jeśli jest obecny
- Pamięć **konta** (pusta domyślnie)

„Ether” jest główną wewnętrzną kryptowalutą Ethereum używaną do uiszczania opłat transakcyjnych. Ogólnie rzecz biorąc, istnieją dwa rodzaje kont: **rachunki zewnętrzne**, kontrolowane przez klucze prywatne oraz **konta kont kontraktowych**, kontrolowane przez ich kod kontraktu. Zewnętrznie posiadane konto nie posiada kodu i można wysyłać wiadomości z zewnętrznego konta poprzez tworzenie i podpisywanie transakcji; w koncie, za każdym razem, gdy konto kontraktowe otrzymuje komunikat o kodzie aktywuje, pozwala na odczytywanie i zapisywanie do pamięci wewnętrznej i wysyłanie innych wiadomości lub tworzenie kontraktów z kolei.

Należy zauważyć, że „kontraktów” w Ethereum nie należy postrzegać jako czegoś, co powinno być „spełniane” lub „przestrzegane”; są raczej takie jak „czynniki autonomiczne”, które żyją w środowisku Ethereum execution, zawsze wykonując określony fragment kodu, gdy jest "poked" przez wiadomość lub transakcję, i sprawowanie bezpośredniej kontroli nad własnym eterem oraz ich własnym sklepem kluczowy/wartości w celu śledzenia trwałych zmiennych.

### Wiadomości i Transakcje {#messages-and-transactions}

Termin "transakcja" jest używany w Ethereum do odwoływania się do podpisanego pakietu danych, który przechowuje wiadomość, która ma być wysłana z zewnętrznego konta. Transakcje zawierają:

- Odbiorca wiadomości
- Podpis identyfikujący nadawcę
- Ilość etheru do przeniesienia od nadawcy do odbiorcy
- Opcjonalne pole danych
- Wartość `STARTGAS` przedstawiająca maksymalną liczbę kroków do wykonania transakcji
- Wartość `GASPRICE`, przedstawiająca opłatę, którą nadawca płaci za krok obliczeniowy

Pierwsze trzy pola to pola standardowe w każdej kryptowalucie. Pole danych nie posiada domyślnie żadnej funkcji, ale maszyna wirtualna posiada opcode, które kontrakt może wykorzystać do uzyskania dostępu do danych; jako przykład użyj, jeśli kontrakt działa jako usługa rejestracyjna domeny blockchain, następnie może zinterpretować dane przekazane do niego jako zawierające dwa "pola", pierwsze pole jest domeną do rejestracji, a drugie pole jest adresem IP do rejestracji. Umowa odczytałaby te wartości z danych wiadomości i odpowiednio umieściłaby je w pamięci.

Pola `STARTGAS` i `GASPRICE` są kluczowe dla antynegowania modelu serwisowego. Aby zapobiec przypadkowemu lub wrogim nieskończonym pętlom lub innym stratom obliczeniowym w kodzie, każda transakcja jest wymagana, aby ustawić limit do ile kroków obliczeniowych wykonania kodu, które może użyć. Podstawową jednostką obliczeniową jest „gaz”; Zazwyczaj krok obliczeniowy kosztuje 1 gaz, ale niektóre operacje kosztują więcej gazu, ponieważ są bardziej kosztowne, lub zwiększyć ilość danych, które muszą być przechowywane jako część stanu. Za każdy bajt danych transakcji pobiera się również opłatę w wysokości 5 gazów. Zamiarem systemu opłat jest wymaganie od atakującego zapłaty proporcjonalnie za każdy zasób, który konsumowają, w tym obliczenia, szerokość pasma i przechowywanie; stąd jakakolwiek transakcja, która powoduje, że sieć zużywająca większą ilość dowolnego z tych zasobów musi mieć opłatę gazową w przybliżeniu proporcjonalną do przyrostu ilości.

### Wiadomości {#messages}

Umowy mają możliwość wysyłania „wiadomości” do innych umów. Wiadomości są obiektami wirtualnymi, które nigdy nie są serializowane i istnieją tylko w środowisku wykonania Ethereum. Wiadomość zawiera:

- Nadawca wiadomości (niejawny)
- Odbiorca wiadomości
- Ilość etheru do przeniesienia wraz z wiadomością
- Opcjonalne pole danych
- Wartość `STARTGAS`

Wiadomość jest zasadniczo jak transakcja, z wyjątkiem tego, że jest generowana przez kontrakt, a nie przez podmiot zewnętrzny. Wiadomość jest generowana, gdy kontrakt aktualnie wykonujący kod wykonuje kod `CALL` opcode, który tworzy i wykonuje wiadomość. Podobnie jak transakcja, wiadomość prowadzi do konta odbiorcy z jego kodem. Tak więc kontrakty mogą mieć relacje z innymi kontraktami w dokładnie taki sam sposób, jak podmioty zewnętrzne.

Zauważ, że przydział gazu przydzielony przez transakcję lub umowę ma zastosowanie do całkowitej ilości gazu zużywanego przez tę transakcję i do wszystkich zleceń. Na przykład, jeśli zewnętrzny podmiot A wysyła transakcję do B z 1000 gazów, i B zużywa 600 gazu przed wysłaniem wiadomości do C, a wewnętrzna realizacja C zużywa 300 gazu przed powrotem, następnie B może wydać kolejne 100 gazu przed wyczerpaniem gazu.

### Funkcja Przejścia Stanów Ethereum {#ethereum-state-transition-function}

![Zmiana stanu etheru](./ether-state-transition.png)

Funkcja zmiany stanu Ethereum, `ZASTOSUJ-(S,TX) -> S'` może być zdefiniowane w następujący sposób:

1.  Sprawdź, czy transakcja jest dobrze sformułowana (tj. ma prawą liczbę wartości), podpis jest prawidłowy, a nonce odpowiada nonce na koncie nadawcy. Jeśli nie, zwracaj błąd.
2.  Oblicz opłatę transakcyjną jako `STARTGAS * GASPRICE`, i ustaw adres wysyłający na podstawie podpisu. Odejmij opłatę z salda konta nadawcy i pomnóż wartość jednorazową nadawcy. Jeśli nie ma wystarczającego salda do wydania, zwróć błąd.
3.  Inicjalizacja `GAS = STARTGAS`, i odebrać pewną ilość gazu na bajt, aby zapłacić za bajty w transakcji.
4.  Przenieś wartość transakcji z konta nadawcy na konto odbiorcze. Jeśli konto odbierające jeszcze nie istnieje, utwórz je. Jeśli konto otrzymujące jest umową, uruchom kod kontraktu albo w celu dokończenia lub do czasu wygaśnięcia wykonania gazu.
5.  Jeśli transfer wartości nie powiódł się, ponieważ nadawca nie miał wystarczającej ilości pieniędzy lub podczas wykonanie kodu skończył się gaz, przywróć wszystkie zmiany stanu z wyjątkiem płatności opłat i dodać opłaty do konta kopalni.
6.  W przeciwnym razie zwrot opłat za cały pozostały gaz nadawcy i wyślij opłaty zapłacone za gaz zużywany górnikowi.

Na przykład należy przyjąć, że kod kontraktu jest:

    if !self.storage[calldataload(0)]:
        self.storage[calldataload(0)] = calldataload(32)

Zauważ, że w rzeczywistości kod umowy jest zapisany w kodzie EVM o niskim poziomie; ten przykład jest napisany w Serpent, jednym z naszych języków wysokiego szczebla, dla jasności i może być skompilowany do kodu EVM. Załóżmy, że magazyn umowy zaczyna się od pustego, a transakcja jest wysyłana o wartości 10 eterów, 2000 gazu, 0. 01 cena gazu dla eteru i 64 bajty danych, z bajtami 0-31 reprezentującymi liczbę `2` i bajty 32-63 reprezentujące ciąg `CHARLIE`.<sup>[fn. 6](#notes)</sup> Proces dla funkcji przejścia stanu w tym przypadku jest następujący:

1.  Sprawdź, czy transakcja jest prawidłowa i dobrze sformowana.
2.  Sprawdź, czy nadawca transakcji ma co najmniej 2000 \* 0.001 = 2 każdego z nich. Jeśli tak, wówczas odjąć 2 ether od konta nadawcy.
3.  Rozpoczęcie gazu = 2000; zakładając, że transakcja ma 170 bajtów a opłata bajtowa wynosi 5, odjąć 850 tak, że pozostało 1150 gazów.
4.  Odejmij więcej 10 etherów od konta nadawcy i dodaj je do konta kontraktu.
5.  Uruchom kod. W tym przypadku jest to proste: sprawdza, czy użyto magazynu w kontrakcie `2`, zauważa, że nie jest, i, aby ustawić pamięć w indeksie `2` na wartość `CHARLIE`. Załóżmy, że to zajmuje 187 gazu, więc pozostała ilość gazu wynosi 1150 - 187 = 963
6.  Dodaj 963 \* 0.001 = 0.963 ether z powrotem na konto nadawcy i zwróć otrzymany stan.

W przypadku braku kontraktu na dzień otrzymania transakcji, następnie całkowita opłata transakcyjna byłaby po prostu równa dostarczonej `GASPRICE` pomnożonej przez długość transakcji wyrażonej w bajtach, i dane przesyłane wraz z transakcją byłyby nieistotne.

Zauważ, że wiadomości działają równorzędnie do transakcji pod względem powracają: jeśli wykonanie wiadomości kończy się gazem, następnie tego komunikatu wykonania i wszystkich innych egzekucji wyzwalanych przez to wykonanie, cofnięcie,, ale wykonania nadrzędne nie muszą być przywrócone. Oznacza to, że "bezpiecznie" kontraktu na inną umowę, tak jak w przypadku połączeń B z gazem G, wówczas realizacja A jest gwarantowana utratą co najwyżej gazu G. Na koniec, weź pod uwagę, że istnieje opcode, `STWÓRZ`, który tworzy umowę; jego mechaniki wykonania są na ogół podobne do `CALL`, z wyjątkiem, że wyjście wykonania określa kod nowo utworzonej umowy.

### Wykonanie kodu {#code-execution}

Kod w kontraktach Ethereum jest napisany w niskopoziomowym, opartym na stosie języku kodowym bytecode, zwanym "Ethereum virtual machincode" lub "EVM code". Kod składa się z serii bajtów, gdzie każdy bajt reprezentuje operację. Zasadniczo wykonanie kodu jest nieskończoną pętlą polegającą na wielokrotnym przeprowadzaniu operacji w bieżącym liczniku programu (co rozpoczyna się od zera), a następnie zwiększaniu licznika programu o jeden, do momentu osiągnięcia końca kodu lub wykrycia błędu lub `STOP` lub `RETURN`. Operacje mają dostęp do trzech typów przestrzeni do przechowywania danych:

- **stos**, kontener ostatniej w pierwszej kolejności, do którego wartości można wcisnąć i wyciąć
- **Pamięć**, nieskończenie rozszerzalna tablica bajtów
- Długoterminowa pamięć **kontraktu**, sklep klucz/wartość. W odróżnieniu od stosu i pamięci, które resetują się po zakończeniu obliczeń, pamięć utrzymuje się przez długi czas.

Kod może również uzyskać dostęp do wartości, nadawcy i danych przychodzących wiadomości, jak również dane nagłówka bloku, a kod może również zwracać bajt tablicy danych jako dane wyjściowe.

Formalny model realizacji kodu EVM jest zaskakująco prosty. Podczas gdy maszyna wirtualna Ethereum jest uruchomiona, jej pełny stan obliczeniowy może być zdefiniowany przez kropkę `(block_state, transakcja, wiadomość, kod, pamięć, stack, pc, gaz)`, gdzie `block_state` jest stanem globalnym zawierającym wszystkie konta, także zawiera salda i pamięć. Na początku każdej rundy egzekucji bieżąca instrukcja jest odnajdywana przez pobranie `pc`-tego bajtu `code` (lub 0, jeśli `pc >= len(kod)`), a każda instrukcja ma własną definicję pod względem tego, jak wpływa na krotkę. Na przykład `ADD` wyświetla dwa elementy poza stos i pycha ich sumę, zmniejsza `gaz` o 1 i przyrosty `pc` o 1, i `PRZECHOWYWANIE` wyświetla dwa najlepsze elementy poza stosem i wstawia drugą pozycję do magazynu kontraktu w indeksie określonym przez pierwszą pozycję. Chociaż istnieje wiele sposobów optymalizacji Ethereum wykonywania maszyny wirtualnej poprzez kompilację just-in-time podstawowa implementacja Ethereum może być wykonana za kilkaset linii kodu.

### Łańcuch bloków i górnictwo {#blockchain-and-mining}

![Schemat blokowy zastosowania Ethereum](./ethereum-apply-block-diagram.png)

Blockchain Ethereum jest pod wieloma względami podobny do łańcucha bloków Bitcoin, choć ma pewne różnice. Główna różnica między Ethereum i Bitcoinem w odniesieniu do architektury blockchain polega na tym, że w odróżnieniu od Bitcoin(który zawiera tylko kopię listy transakcji), Bloki Ethereum zawierają kopię zarówno listy transakcji, jak i najnowszego stanu. Oprócz tego, dwie inne wartości, liczba bloku i trudności, są również przechowywane w bloku. Podstawowy blok algorytm walidacji w Ethereum jest następujący:

1.  Sprawdź, czy poprzedni blok odwołany przez blok istnieje i jest ważny.
2.  Sprawdź, czy znacznik czasu bloku jest większy niż w poprzedni blok i mniej niż 15 minut w przyszłości
3.  Sprawdź, czy numer bloku, poziom trudności, korzeń transakcji, wujek limit root i gazu (różne koncepcje specyficzne dla Ethereum niskiego poziomu) są ważne.
4.  Sprawdź, czy dowód pracy na bloku jest ważny.
5.  Niech `S[0]` będzie stanem na końcu poprzedniego bloku.
6.  Załóżmy, że `TX` jest listą transakcji z `n` transakcji. Dla wszystkich `i` w `0...n-1`, ustaw `S[i+1] = APPLY(S[i],TX[i])`. Jeśli którakolwiek z aplikacji zwraca błąd, lub jeśli całkowity gaz zużywany w bloku w górę aż do momentu, gdy ten punkt przekroczy `GASLIMIT`, zwróć błąd.
7.  Pozwól `S_FINAL` być `S[n]`, ale dodaj nagrodę za blok zapłaconą górnikowi.
8.  Sprawdź, czy pierwiastek drzewa Merkle stanu `S_FINAL` jest równy końcowemu pierwiastkowi stanu podanemu w nagłówku bloku. Jeśli tak, blok jest ważny; w przeciwnym razie jest nieprawidłowy.

Podejście na pierwszy rzut oka może wydawać się wysoce nieskuteczne, ponieważ musi przechowywać cały stan z każdym blokiem, ale w rzeczywistości wydajność powinna być porównywalna do wydajności Bitcoin. Powodem jest to, że stan jest przechowywany w strukturze drzewa, i po każdym bloku tylko mała część drzewa musi zostać zmieniona. Tak więc ogólnie pomiędzy dwoma sąsiadującymi blokami zdecydowana większość drzewa powinna być taka sama, i dlatego dane mogą być przechowywane raz i odsyłane dwukrotnie za pomocą wskaźników (tj. hashy subdrzewa). Aby to osiągnąć, użyto specjalnego rodzaju drzewa znanego jako "drzewo Patricia". łącznie z modyfikacją pojęcia drzewa Merkle, która pozwala na wstawienie węzłów i usunięcie, a nie tylko na sprawne zmiany. Dodatkowo, ponieważ wszystkie informacje o stanie są częścią ostatniego bloku, nie ma potrzeby przechowywania całej historii blockchain - strategii, która jeśli może być zastosowany do Bitcoina, można obliczyć aby zapewnić 5-20x oszczędności w przestrzeni.

Często zadawane pytanie brzmi: "gdzie" kod kontraktu w kategoriach fizycznego sprzętu. Ma to prostą odpowiedź: proces wykonywania kodu kontraktu jest częścią definicji funkcji przejścia stanu, który jest częścią algorytmu walidacji bloku, więc jeśli transakcja jest dodana do bloku `B` kod wygenerowany przez tę transakcję zostanie wykonany przez wszystkie węzły, teraz i w przyszłości, ten pobierz i zweryfikuj blok `B`.

## Aplikacje {#applications}

Ogólnie rzecz biorąc, oprócz Ethereum istnieją trzy rodzaje zastosowań. Pierwsza kategoria to aplikacje finansowe, dające użytkownikom potężniejsze sposoby zarządzania i zawierania umów przy użyciu pieniędzy. Obejmuje to podzlecenia, pochodne instrumenty finansowe, kontrakty zabezpieczające, portfele oszczędnościowe, testamenty, a ostatecznie nawet niektóre klasy umów o pracę. Druga kategoria to aplikacje półfinansowe, w których zaangażowane są pieniądze, ale istnieje również ciężka strona niepieniężna tego, co się dzieje; Doskonałym przykładem jest samowymuszanie odbić się na rozwiązaniach problemów obliczeniowych. Wreszcie istnieją takie aplikacje, jak głosowanie online i zdecentralizowane zarządzanie które w ogóle nie są finansowe.

### Systemy tokenów {#token-systems}

Systemy tokenów blockchain mają wiele zastosowań, począwszy od podwalut reprezentujących aktywa takie jak USD lub złoto po firmę, indywidualne tokeny reprezentujące inteligentną nieruchomość, zabezpiecz nieprzerobione kupony, a nawet systemy tokenów bez powiązań z konwencjonalną wartością w ogóle używane jako systemy motywacyjne. Systemy tokenów są zaskakująco łatwe do wdrożenia w Ethereum. Kluczowym punktem do jest to, że waluta lub system tokenów, zasadniczo jest bazą danych z jedną operacją: odjąć X jednostki od A i dać X jednostkom B, z przepisem, że (1) A posiadała co najmniej X jednostek przed transakcją oraz (2) transakcja jest zatwierdzona przez A. Wszystko, czego potrzebuje do wdrożenia systemu tokenów to wdrożenie tej logiki do umowy.

Podstawowy kod do implementacji systemu tokenów w Serpent wygląda tak: następuje:

    def wyślij (do, wartość):
        jeśli siebie. torage[msg.sender] >= wartość:
            siebie. torage[msg.sender] = self.storage[msg.sender] - wartość
            samo. torage[to] = samodzielny.magazyn[to] + wartość

Jest to zasadniczo dosłowne wdrożenie „systemu bankowego” funkcji transformacji stanu, opisanej powyżej w niniejszym dokumencie. Kilka dodatkowych linii kodu, aby zapewnić początkowy etap dystrybucji jednostek waluty w pierwszym miejscu i kilka innych skrzynek krawędziowych, i idealnie funkcja zostałaby dodana, aby umożliwić innym umowom zapytanie o saldo adresu. Ale to wszystko jest w porządku. Teoretycznie Systemy tokenów ethereum, działające jako subwaluty, mogą potencjalnie zawierać inną ważną funkcję, której w łańcuchu meta-waluty bazujące na Bitcoinach brakuje: możliwość uiszczania opłat za transakcje bezpośrednio w tej walucie. Sposób, w jaki miałaby być wdrożony, jest taki, że kontrakt utrzymałby saldo eteru, z którym zwrócił ether użyty do uiszczenia opłat na rzecz nadawcy, i napełniłby saldo pobierając wewnętrzne jednostki walutowe, które pobiera, i odsprzedając je na ciągłej aukcji. Użytkownicy musieliby zatem "aktywować" swoje konta z eterem, ale kiedy ether będzie tam taki, będzie mógł zostać ponownie użyty, ponieważ kontrakt będzie go zwracał za każdym razem.

### Instrumenty pochodne i waluty o stabilnej wartości {#financial-derivatives-and-stable-value-currencies}

Finansowe instrumenty pochodne są najczęstszym zastosowaniem „inteligentnego kontraktu ” i jednym z najprostszych do wdrożenia w kodzie. Głównym wyzwaniem dla realizacji umów finansowych jest to, że większość z nich wymaga odniesienia do zewnętrznego wskaźnika ceny; Na przykład bardzo pożądane zastosowanie jest inteligentnym kontraktem, który zabezpiecza się przed zmiennością eteru (lub innej kryptowaluty) w stosunku do amerykańskiego dolara, ale wykonanie tego wymaga od kontraktu wiedzieć, jaka jest wartość ETH/USD. Najprostszym sposobem na to jest kontrakt "kanał danych" utrzymywany przez konkretną stronę (np. NASDAQ) zaprojektowany tak, aby strona miała możliwość aktualizowania kontraktu w razie potrzeby, i udostępnienie interfejsu umożliwiającego innym kontraktom wysłanie wiadomości do tego kontraktu i odzyskanie odpowiedzi podającej cenę.

Biorąc pod uwagę ten krytyczny składnik, kontrakt hedgingowy wyglądałby tak: następuje:

1.  Poczekaj, aż strona A wprowadzi 1000 etherów.
2.  Poczekaj, aż strona B wprowadzi 1000 etherów.
3.  Nagrywaj wartość USD 1000 eterów, obliczoną przez zapytanie o kontraktu na kanał w pamięci, powiedzmy, że to jest $x.
4.  Po 30 dniach, zezwól A lub B na "reaktywację" kontraktu, aby wysłać $x wartość etheru (obliczoną przez ponowne zapytanie kontraktu w celu uzyskania nowej ceny) do A i reszty do B.

Taka umowa miałaby znaczny potencjał w handlu kryptowalutami. Jeden z głównych wymienionych problemów dotyczących kryptowaluty jest fakt, że jest lotny; chociaż wielu użytkowników i sprzedawców może chcieć bezpieczeństwa i wygoda obchodzenia się z zasobami kryptograficznymi, mogą nie chcieć zmierzyć się z perspektywą utraty 23% wartości swoich środków w jednym dzień. Do tej pory najczęściej proponowanym rozwiązaniem było aktywów zabezpieczonych emitentami; emitent tworzy subwalutę, w której ma prawo do emisji i cofania jednostek uczestnictwa, i podaj jedną jednostkę waluty każdemu, kto dostarcza ją (offline) jedną jednostkę określonego składnika aktywów bazowych (np. Złoto, USD). Emitent obiecuje dostarczyć jedną jednostkę bazowego składnika aktywów każdemu, kto odsyła z powrotem jedną jednostkę kryptowaluty. Mechanizm ten pozwala każdemu niekryptograficznemu aktywowi "przekształcić go w aktywa kryptograficzne, pod warunkiem że emitent może być zaufany.

W praktyce jednak emitenci nie zawsze są wiarygodni, a w niektórych przypadkach infrastruktura bankowa jest zbyt słaba lub zbyt wroga, aby takie usługi mogły istnieć. Alternatywnym rozwiązaniem są finansowe instrumenty pochodne. Tutaj, zamiast jednego emitenta dostarczającego środki do wykonania kopii zapasowej, zdecentralizowany rynek spekulantów, zakładający cenę kryptograficznego referencyjnego składnika aktywów (np. ETH) przejdzie do przodu, odgrywając tę rolę. W odróżnieniu od emitentów, spekulanci nie mają możliwości niewywiązania się ze zobowiązań z umowy, ponieważ kontrakt zabezpieczający przechowuje swoje środki w escrow. Zauważ, że to podejście nie jest w pełni zdecentralizowane, ponieważ zaufane źródło jest nadal potrzebne do zapewnienia znacznika ceny, chociaż jest to nawet nadal ogromna poprawa pod względem zmniejszenia wymogów w zakresie infrastruktury (w przeciwieństwie do emitenta, wystawienie ceny kanału nie wymaga żadnych licencji i może być sklasyfikowane jako swoboda wypowiedzi) i ograniczenie możliwości oszustw.

### Systemy identyfikacji i reputacji {#identity-and-reputation-systems}

Najwcześniejsza alternatywna kryptowaluta, [Namecoin](http://namecoin.org/), próbowała użyć blockchain podobny do Bitcoina, aby zapewnić system rejestracji nazwy, gdzie użytkownicy mogą rejestrować swoje nazwy w publicznej bazie danych wraz z innymi danymi. Główny cytowany przypadek użycia dotyczy a System [DNS](https://wikipedia.org/wiki/Domain_Name_System), mapowanie nazwy domen, takie jak „bitcoin.org” (lub, w przypadku Namecoin, „bitcoin.bit”) na adres IP. Inne przypadki użycia obejmują uwierzytelnianie poczty elektronicznej i potencjalnie bardziej zaawansowane systemy reputacji. Oto podstawowa umowa, aby dostarczyć system rejestracji nazw podobnych do Namecoin na Ethereum:

    def register(nazwa, wartość):
        if !self.storage[name]:
            self.storage[name] = wartość

Umowa jest bardzo prosta; wszystko to jest baza danych wewnątrz sieci Ethereum, która może być dodawana do sieci ale nie modyfikowana ani usuwana. Każdy może zarejestrować nazwę z pewną wartością, a ta rejestracja zostanie zachowana na zawsze. Bardziej zaawansowana umowa rejestracji nazw będzie również zawierać "klauzulę funkcji" umożliwiającą innym umowom zapytanie o nie, jak również mechanizm dla "właściciela" (tj. pierwszy rejestrujący) nazwy mającej na celu zmianę danych lub przeniesienie własności. Można nawet dodać reputację i funkcji sieciowej zaufania.

### Zdecentralizowane przechowywanie plików {#decentralized-file-storage}

W ciągu ostatnich kilku lat pojawiło się wiele popularnych startów przechowywania plików online, z których najważniejszym jest Dropbox, szukanie pozwolenia użytkownikom na przesłanie kopii zapasowej dysku twardego i przechowywanie kopii zapasowej i umożliwienie użytkownikowi dostępu do niej w zamian za miesięczną opłatę. Jednak w tym momencie rynek przechowywania plików jest stosunkowo nieefektywny; kursory spojrzą na różne [istniejące rozwiązania](http://online-storage-service-review.toptenreviews.com/) pokazuje, że: w szczególności na poziomie 20–200 GB na poziomie, w którym nie pojawiają się żadne wolne kwoty ani rabaty na poziomie przedsiębiorstwa, miesięczne ceny głównego przechowywania plików są takie, że płacisz za więcej niż koszt całego dysku twardego w jednym miesiącu. Kontrakty Ethereum mogą umożliwić opracowanie zdecentralizowanego ekosystemu przechowywania plików, gdzie indywidualni użytkownicy mogą zarobić małe ilości pieniędzy poprzez wynajem własnych twardych dysków, a niewykorzystane miejsce może zostać wykorzystane do dalszego obniżenia kosztów przechowywania plików.

Kluczowym elementem takiego urządzenia byłoby to, co nazwaliśmy "zdecentralizowanym kontraktem Dropbox". Umowa ta działa w następujący sposób. Najpierw dzieli żądane dane na bloki, szyfrując każdy blok dla prywatności i buduje z tego drzewo Merkle. Jeden z nich tworzy kontraktu z regułą, że każdy N bloków, kontrakt wybierze losowy indeks w drzewie Merkle (używając poprzedniego skrótu bloku, dostępny z kodu kontraktu, jako źródło losowania), i dać X eterowi pierwszemu podmiotowi, który dostarczył transakcję z uproszczonym dowodem posiadania tego bloku w tym określonym indeksie drzewa. Gdy użytkownik chce ponownie pobrać swój plik, może użyć protokołu kanału mikropłatności (np. zapłać 1 szabo per 32 kilobajtów) za odzyskanie pliku; najbardziej opłacalnym podejściem jest dla zleceniodawcy, aby nie publikować transakcji do końca, zamiast zastąpienie transakcji nieco bardziej dochodową transakcją tą samą nraz po 32 kilobajtach.

Ważną cechą protokołu jest to, że: chociaż może wydawać się, że jeden ufa wielu losowym węzłom, aby nie zdecydowały się zapomnieć o pliku, jeden może zmniejszyć to ryzyko do niemal zera dzieląc plik na wiele kawałków poprzez tajne udostępnianie, i oglądanie kontraktów, aby zobaczyć każdy element jest nadal w posiadaniu jakiegoś węzła. Jeśli kontrakt nadal płaci pieniędze, to stanowi dowód kryptograficzny, że ktoś tam nadal przechowuje plik.

### Zdecentralizowana Organizacja Autonomiczna {#decentralized-autonomous-organizations}

Ogólna koncepcja „zdecentralizowanej organizacji autonomicznej” jest taka: wirtualnego podmiotu, który ma określony zestaw członków lub udziałowców które, być może z większością 67%, mają prawo do wydawania środków finansowych podmiotu funduszy i modyfikować jego kod. Członkowie wspólnie decydują, w jaki sposób organizacja powinna przydzielić swoje środki. Metody przydzielania a Fundusze DAO mogą obejmować nagrody, pensje, a nawet bardziej egzotyczne mechanizmy, takie jak wewnętrzna waluta, aby nagradzać pracę. Zasadniczo replikuje legalne obrazy tradycyjnej firmy lub non-profit, ale przy użyciu wyłącznie kryptograficznej technologii blockchain. Jak dotąd wiele rozmów o DAO-ach dotyczyło modelu „kapitalistycznego” „zdecentralizowanej autonomicznej korporacji” (DAC) z dywidendą otrzymującą udziałowców i zbywalnymi akcjami; alternatywę opisaną być może jako „zdecentralizowana społeczność autonomiczna”, gdyby wszyscy członkowie mieli równy udział w procesie podejmowania decyzji i wymagali, aby 67% istniejących członków wyraziło zgodę na dodanie lub usunięcie członka. Wymaganie, że jedna osoba może mieć tylko jedno członkostwo, musiałoby być wtedy wyegzekwowane wspólnie przez grupę.

Ogólny zarys kodowania DAO przedstawia się następująco. Najprostszy projekt to po prostu fragment samomodyfikującego się kodu, który zmienia się, jeśli dwie trzecie członków zgadza się na zmianę. Chociaż kod teoretycznie jest niezmienny, można łatwo dotrzeć do tego i mieć faktyczną zmienność poprzez posiadanie fragmentów kodu w osobnych kontraktach, oraz posiadanie adresów, z których kontrakty na wezwanie do przechowywania przechowywane w zmodyfikowanym magazynie. W prostej realizacji takiej umowy DAO będą trzy typy transakcji, wyróżnione danymi dostarczonymi w transakcji:

- `Struktura danych]` aby zarejestrować propozycję z indeksem `i` aby zmienić adres w indeksie magazynu `K` na wartość `V`
- `[1,i]` aby zarejestrować głos za wnioskiem `i`
- `[2,i]` aby sfinalizować propozycję `i` jeśli została złożona wystarczająca ilość głosów

Umowa zawierałaby wówczas klauzule dla każdego z nich. Przechowuje zapis wszystkich otwartych zmian pamięci, wraz z listą osób, na które zagłosowały. Miałaby również listę wszystkich członków. Gdy jakakolwiek zmiana pamięci dostanie się do dwóch trzecich głosujących na nią członków, finalizacja transakcji może wykonać zmianę. Bardziej zaawansowany szkielet miałby również wbudowaną możliwość głosowania na funkcje takie jak wysyłanie transakcji, dodawanie członków i usuwanie członków, a nawet może przewidywać dla [Płynnej Demokracji](https://wikipedia.org/wiki/Delegative_democracy)- delegacji (np. każdy może przypisać kogoś do głosowania, i przypisanie jest translityczne, więc jeśli A przypisuje B i B przypisuje C wtedy C określa głos A). Ten projekt pozwoliłby DAO na rozwój organiczny jako społeczności zdecentralizowanej, umożliwienie ludziom w końcu delegowania zadania filtrowania, kto jest członkiem specjalistów, chociaż w odróżnieniu od „obecnego systemu” specjaliści mogą z łatwością wyskakać i z czasem przebywać w sytuacji, gdy indywidualni członkowie społeczności zmieniają swoje dostosowania.

Alternatywnym modelem jest zdecentralizowana korporacja, gdzie każdy rachunek może mieć zero lub więcej akcji, a dwie trzecie akcji jest zobowiązane do podjęcia decyzji. Kompletny szkielet obejmowałby funkcje zarządzania aktywami, możliwość złożenia oferty kupna lub sprzedaży akcji, oraz zdolność przyjmowania ofert (najlepiej z mechanizmem dopasowania zleceń w ramach umowy). Delegacja istniałaby również w stylu płynnej demokracji, generalizując koncepcję rady dyrektorów.

### Dalsze zastosowania {#further-applications}

**1. Portfele oszczędzające**. Załóżmy, że Alice chce zabezpieczyć swoje fundusze, ale obawia się, że straci lub ktoś zhakuje swój klucz prywatny. Wstawia ether w kontrakt z Bob, bankiem, w następujący sposób:

- Sama Alice może wypłacić maksymalnie 1% środków dziennie.
- Tylko Bob może wypłacić maksymalnie 1% środków dziennie, ale Alice ma możliwość dokonania transakcji z jej kluczem wyłączającym tę zdolność.
- Alice i Bob razem mogą wycofać wszystko.

Zwykle 1% dziennie jest wystarczające dla Alice i jeśli Alice chce wycofać więcej może skontaktować się z Bobem w celu uzyskania pomocy. Jeśli klucz Alice zostanie zhakowany, biegnie do Boba, aby przenieść środki do nowego kontraktu. Jeśli straci swój klucz, Bob otrzyma ostatecznie środki. Jeśli Bob okaże się złośliwy, Alice może utracić możliwość wypłacenia środków.

**2. Ubezpieczenie upraw**. Można łatwo stworzyć kontrakt pochodny poprzez wykorzystanie źródła danych pogodowych zamiast indeksu ceny. Jeśli rolnik z Iowa kupi instrument pochodny, który się opłaca odwrotnie w oparciu o opady w stanie Iowa, to jeśli jest susza, rolnik automatycznie otrzyma pieniądze, a jeśli będzie wystarczająco dużo deszczu, rolnik będzie szczęśliwy, ponieważ ich plony będą dobrze sobie radzić. Można go rozszerzyć na ogólne ubezpieczenie od klęsk żywiołowych.

**3. Zdecentralizowany kanał danych**. W przypadku umów finansowych na różnica, faktycznie może być możliwa decentralizacja strumienia danych za pośrednictwem protokołu o nazwie [SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/). SchellingCoin działa zasadniczo w następujący sposób: N stron wstawionych do systemu wartości danego odniesienia (np. cena ETH/USD), wartości są sortowane, a każdy między 25. a 75. percentylem otrzymuje jeden token jako nagrodę. Każdy ma motywację do udzielenia odpowiedzi, która wszyscy inni zapewnią, i jedyną wartością, na którą wiele graczy może realistycznie się zgodzić, jest oczywisty domyślny: prawda. Tworzy to zdecentralizowany protokół, który teoretycznie może dostarczyć dowolną liczbę wartości, włączając w to cenę ETH/USD, temperaturę w Berlinie lub nawet wynik konkretnego twardego obliczenia.

**4. Inteligentna escrow z multipodpisem**. Bitcoin pozwala na podpisywanie umów transakcji, na które na przykład trzy z pięciu kluczy mogą wydać środki. Ethereum pozwala na bardziej szczegółowość; na przykład czterech na pięć może wydawać wszystko, trzy na pięć mogą wydać do 10% na dobę, a dwa na pięć mogą wydać do 0. % dziennie. Dodatkowo, Ethereum multisig jest asynchroniczny - dwie strony mogą zarejestrować swoje podpisy w blockchain w różnych momentach, a ostatni podpis automatycznie wyśle transakcję.

**5. Chmura obliczeniowa**. Technologia EVM może być również używana do tworzenia weryfikowalnego środowiska obliczeniowego, pozwalając użytkownikom na zwrócenie się do innych o przeprowadzenie obliczeń, a następnie opcjonalnie poproś o dowody na to, że obliczenia w wybranych losowo punktach kontrolnych zostały wykonane poprawnie. Pozwala to na stworzenie rynku przetwarzania w chmurze, na którym każdy użytkownik może uczestniczyć za pomocą komputera stacjonarnego, laptopa lub specjalnego serwera, i kontrola punktowa wraz z depozytami zabezpieczającymi może być wykorzystana w celu upewnienia się, że system jest wiarygodny (tj. węzły nie mogą dochodowo oszukiwać). Chociaż taki system może nie być odpowiedni dla wszystkich zadań; zadań, które wymagają wysokiego poziomu komunikacji międzyprocesowej, na przykład nie można łatwo wykonać na dużej chmurze węzłów. Inne zadania są jednak znacznie łatwiejsze do równoległe; projekty takie jak SETI@home, folding@home i genetyczne algorytmy mogą być z łatwością zaimplementowane na tej platformie.

**6. Gry typu peer-to-peer**. Dowolna liczba protokołów gier hazardowych typu peer-to-peer, takich jak Frank Stajano i Richard Clayton [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf), może być zaimplementowane w blockchainu Ethereum. Najprostszy protokół gier to po prostu kontrakt na różnicę w następnym bloku hash, i bardziej zaawansowane protokoły można z nich opracować, tworząc usługi w zakresie gier hazardowych z opłatami niemal zerowymi, które nie mają możliwości oszukania.

**7. Rynki prognostyczne**. Pod warunkiem, że wyścig lub SchellingCoin, rynki prognoz są również łatwe do wdrożenia, rynki prognozowania wraz z SchellingCoin mogą okazać się pierwszym głównym punktem zastosowania [futarchii](http://hanson.gmu.edu/futarchy.html) jako protokołu zarządzania zdecentralizowanymi organizacjami.

**8. Zdecentralizowane rynki**w łańcuchu przy użyciu systemu tożsamości i reputacji jako bazy.

## Różne obszary i obawy {#miscellanea-and-concerns}

### Zmodyfikowane wdrożenie GHOST {#modified-ghost-implementation}

Protokół GHOST to innowacja po raz pierwszy wprowadzony przez Yonatana Sompolinsky'ego i Aviva Zohara w [grudniu 2013](https://eprint.iacr.org/2013/881.pdf). Motywacja uzasadniająca wprowadzenie GHOST polega na tym, że blockchain z szybkim czasem potwierdzania cierpi z powodu zmniejszonego bezpieczeństwa ze względu na wysoką przeżywalność - ponieważ bloki potrzebują czasu pewien czas rozesłanie w sieci. Jeśli górnik A wydobywa blok, a następnie zdarzy się, że górnik B wydobędzie kolejny blok, zanim blok wydobycia A rozpropaguje się na B, blok górnika B zmarnuje się i nie przyczyni się do bezpieczeństwa sieci. Ponadto istnieje problem centralizacji: jeśli górnik A stanowi pulę wydobycia o 30% mocy hash, a B ma 10% mocy hash, Istnieje ryzyko wytworzenia przestarzałego bloku przez 70% czasu (ponieważ pozostałe 30% czasu A wyprodukował ostatni blok, a więc natychmiast uzyska dane kopalniane), podczas gdy B będzie ryzykował wytworzenia przestarzałego bloku przez 90% czasu. Zatem, jeśli interwał bloku jest wystarczająco krótki, aby przestarzała szybkość była wysoka, Będzie znacznie bardziej efektywny ze względu na jego wielkość. Z tymi dwoma objawami łącznie. blockchain, które szybko produkują bloki, bardzo prawdopodobne jest, że doprowadzi do jednej puli wydobywczej posiadającej wystarczająco dużo energii sieciowej, aby faktycznie sprawować kontrolę nad procesem wydobywania.

Jak opisali Sompolinsky i Zohar, GHOST rozwiązuje pierwszy problem traty bezpieczeństwa sieci poprzez uwzględnienie przestarzałych bloków w obliczeniach , który łańcuch jest „najdłuższy”; to znaczy nie tylko rodzici kolejni przodkowie bloku, ale także starsi potomkowie bloku (w żargonie Ethereum „wujkowie”) zostają dodani do wyliczenia, który blok jest zabezpieczony nawiększą łączną liczbą proof of work. Aby rozwiązać drugą kwestię błędu centralizacji, wychodzimy poza protokół opisany przez Sompolinskiego i Zohara oraz zapewniamy nagrody za przestarzałe bloki: przestarzały blok otrzymuje 87,5 % nagrody bazowej nagród, a siostrzeniec, który zawiera przestarzały blok, otrzymuje pozostałe 12,5%. Opłaty transakcyjne nie są jednak przyznawane wujom.

Ethereum wdraża uproszczoną wersję GHOST, która obniża się tylko o 7 poziomów. W szczególności definiuje się je w następujący sposób:

- Blok musi określać nadrzędny i musi określać 0 lub więcej wujków
- Wujek zawarty w bloku `B` musi mieć następujące właściwości:
- Musi być bezpośrednim dzieckiem `k`-th generator `B`, gdzie `2 <= k <= 7`.
- Nie może być przodkiem `B`
- Wujek musi być prawidłowym nagłówkiem bloku, ale nie musi być wcześniej zweryfikowanym lub nawet poprawnym blokiem
- Wujek musi różnić się od wszystkich wujków zawartych w poprzednich blokach i wszystkich innych wujków zawartych w tym samym bloku (brak podwójnego włączenia)
- Za każdego wujka `U` w bloku `B`, górnik `B` otrzymuje dodatkowe 3,125% dodanych do swojej nagrody z bazy monet, a górnik z U otrzymuje 93,75% standardowej nagrody z bazy monet.

Ta ograniczona wersja GHOST, z wujkami włączanymi tylko do 7 generacji, była używana z dwóch powodów. Po pierwsze, nieograniczony GHOSTmógłby uwzględnić zbyt wiele komplikacji w obliczeniach, którzy wujkowie dla danego bloku są ważni. Po drugie, nieograniczony GHOST z rekompensatą używaną w Ethereum usuwa zachętę dla górnika do wydobywania w głównym łańcuchu, a nie w łańcuchu publicznego atakującego.

### Opłaty {#fees}

Ponieważ każda transakcja publikowana w blockchain nakłada na sieć koszt pobrania i zweryfikowania, istnieje potrzeba mechanizmu regulacyjnego, zazwyczaj obejmującego opłaty transakcyjne, aby zapobiec nadużyciom. Domyślnym podejściem, stosowanym w Bitcoini, jest wprowadzenie czysto dobrowolnych opłat, polegając na tym, że górnicy będą działać jako strażnicy i ustalać dynamiczne minima. Ta metoda została przyjęta bardzo pozytywnie w społeczności Bitcoin, w szczególności dlatego, że jest ona „oparta na rynku”, umożliwiając, by podaż i popyu między górnikami a nadawcami transakcji określała ceny. Problem z tym rozumowaniem polega jednak na tym, że przetwarzanie transakcji nie jest rynkiem; chociaż intuicyjnie atrakcyjne jest konstruowanie przetwarzania transakcji jako usługi, którą górnik oferuje nadawcy, w rzeczywistości każda transakcja, którą górnik uwzględnia, będzie musiała być przetwarzana przez każdy węzeł w sieci, więc ogromną większość kosztów przetwarzania transakcji ponosi strona trzecia, a nie górnik, który podejmuje decyzję o uwzględnieniu. Dlatego bardzo prawdopodobne jest wystąpienie problemów typu „tragedia wspólnego pastwiska”.

Jak się jednak okazuje, ta wada mechanizmu rynkowego, po przyjęciu konkretnego, nieprecyzyjnego założenia upraszczającego, magicznie się usuwa. Argumentacja jest następująca. Załóżmy, że:

1.  Transakcja prowadzi do operacji `k`, oferującej nagrodę `kR` każdemu górnikowi, który tę transakcję uwzględnia, gdzie `R` jest ustawiony przez nadawcę, a `k` i `R` są (z grubsza) wcześniej widoczne dla górnika.
2.  Operacja ma koszt przetwarzania `C` dla każdego węzła (tj. wszystkie węzły mają taką samą wydajność)
3.  Jest `N` węzłów kopalnych, każdy z nich ma dokładnie taką samą moc przetwarzania (tj. `1/N` razem)
4.  Nie ma żadnych pełnych węzłów niekopalnych.

Górnik byłby skłonny przetworzyć transakcję, jeśli oczekiwana nagroda jest wyższa niż koszt. Tak więc oczekiwana nagroda to `kR/N`, ponieważ górnik ma `1/N` szans na przetworzenie następnego bloku, a koszt przetwarzania dla górnika wynosi po prostu `kC`. A zatem górnicy będą uwzględniać transakcje, w których `kR/N > kC` lub `R > NC`. Zauważ, że `R` jest opłatą na operację dostarczoną przez nadawcę, a zatem jest niższą wartością korzyści, jakie nadawca uzyskuje transakcji, i `NC` to koszt dla całej sieci razem z przetwarzaniem operacji. W związku z tym górnicy mają motywację do uwzględniania tylko tych transakcji, dla których całkowita korzyść użytkowa przewyższa koszt.

Istnieje jednak kilka istotnych odstępstw od tych założeń w rzeczywistości:

1.  Górnik ponosi wyższe koszty przetwarzania transakcji niż innych weryfikujących węzłów, ponieważ dodatkowy czas weryfikacji opóźnia propagację bloku i tym samym zwiększa szansę, że blok stanie się przestarzały.
2.  Istnieją pełne węzły niekopalne.
3.  Dystrybucja energii wydobywczeh może w praktyce stać się radykalnie nieegalitarna.
4.  Spekulanci, wrogowie polityczni i maszyny, których funkcja użyteczności obejmuje wyrządzanie szkód w sieci, już istnieją, i mogą sprytnie tworzyć kontrakty, w których ich koszt jest znacznie niższy niż koszt zapłacony przez inne weryfikujące węzły.

(1) daje górnikowi tendencję do uwzględniania mniejszej liczby transakcji, a (2) wzrasta `NC`; w związku z tym te dwa efekty co najmniej częściowo znoszą się nawzajem <sup>[Jak?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) i (4) są głównymi problemami; aby je rozwiązać, tworzymy zmienną pokrywę: żaden blok nie może mieć więcej operacji niż `BLK_LIMIT_FACTOR` razy długoterminowa wykładnicza średnia ruchoma. Konkretnie:

    blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
    floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)

`BLK_LIMIT_FACTOR` i `EMA_FACTOR` to stałe, które zostaną na razie ustawione na 65536 i 1,5, ale prawdopodobnie zostaną zmienione po dalszej analizie.

Istnieje kolejny czynnik zniechęcający do dużych rozmiarów bloków w Bitcoin: propagacja dużych bloków trwa dłużej i dlatego występuje większe prawdopodobieństwo, że staną się przestarzałe. W Ethereum bloki o wysokim zużyciu gazu mogą również wymagać więcej czasu na propagację, zarówno dlatego, że są fizycznie większe, jak i dlatego, że przetwarzanie przejścia stanu transakcji do walidacji trwa dłużej. Ten czynnik zniechęcający do opóźnień jest istotnym czynnikiem w Bitcoinie, ale mniej istotnym w Ethereum ze względu na protokół GHOST; dlatego poleganie na regulowanych limitach bloków zapewnia bardziej stabilną podstawę.

### Obliczanie i kompletność w sensie Turinga {#computation-and-turing-completeness}

Ważną informacją jest to, że maszyna wirtualna Ethereum jest kompletna w sensie Turinga; oznacza to, że kod EVM może kodować każde obliczenie które może zostać przeprowadzone, w tym nieskończone pętle. Kod EVM umożliwia zapętlenie na dwa sposoby. Po pierwsze, istnieje instrukcja `JUMP`, która pozwala programowi wrócić do poprzedniego miejsca w kodzie, i instrukcje `JUMPI` przeskoku warunkowego, dopuszczanie wyrażeń takich jak `while x < 27: x = x * 2`. Po drugie, kontrakty mogą wywoływać inne kontrakty, potencjalnie umożliwiając zapętlenie poprzez rekurencję. To naturalnie prowadzi do problemu: czy złośliwi użytkownicy mogą zasadniczo wyłączyć górników i pełne węzły, zmuszając ich do wejścia w nieskończoną pętlę? Kwestia ta pojawia się z powodu problemu w informatyce znanego jako problem zatrzymania: nie ma sposobu, aby powiedzieć, w ogólnym przypadku, czy dany program kiedykolwiek się zatrzyma.

Jak opisano w sekcji dotyczącej zmiany stanu, nasze rozwiązanie działa w ten sposób, że wymagamy od transakcji określenia maksymalnej liczby kroków obliczeniowych, które może ona wykonać, a jeśli wykonanie trwa dłużej, obliczenia są przerywane, ale opłaty są nadal uiszczane. Komunikaty działają w ten sam sposób. Aby pokazać motywację uzasadniającą nasze rozwiązanie, weźmy pod uwagę następujące przykłady:

- Atakujący tworzy kontrakt, który uruchamia nieskończoną pętlę, a następnie wysyła transakcję aktywującą tę pętlę do górnika. Górnik przetwarza transakcję, uruchamia nieskończoną pętlę i czeka, aż skończy się gaz. Nawet jeśli w trakcie wykonywania transakcji zabraknie paliwa i zatrzyma się ona w połowie, transakcja jest nadal ważna, a górnik nadal żąda od atakującego opłaty za każdy krok obliczeniowy.
- Atakujący tworzy bardzo długą nieskończoną pętlę z zamiarem zmuszenia górnika do kontynuowania obliczeń przez tak długi czas, że do czasu zakończenia obliczeń pojawi się jeszcze kilka bloków i nie będzie możliwe, aby górnik uwzględnił transakcję, aby zażądać opłaty. Niemniej jednak napastnik będzie musiał przesłać wartość `STARTGAS`, ograniczając liczbę kroków obliczeniowych wykonania, więc górnik dowie się wcześniej, że obliczenie będzie wymagać zbyt dużej liczby kroków.
- Atakujący widzi kontrakt z kodem w jakiejś formie jak `send(A,contract.storage[A]); contract.storage[A] = 0`, i wysyła transakcję z wystarczającą ilością gazu, aby wykonać pierwszy krok, ale nie drugi (tzn. dokonać wypłaty, ale nie pozwolić na zmniejszenie salda). Autor kontraktu nie musi się martwić o ochronę przed takimi atakami, ponieważ jeśli wykonanie kontraktu zatrzyma się w połowie zmian, zostaną one cofnięte.
- Kontrakt finansowy działa poprzez przyjęcie mediany dziewięciu zastrzeżonych kanałów danych w celu zminimalizowania ryzyka. Atakujący przejmuje jeden z kanałów danych, który jest zaprojektowany do modyfikowania za pomocą mechanizmu wywołania zmiennego adresu opisanego w sekcji dotyczącej DAO i konwertuje go do uruchomienia nieskończonej pętli, próbując w ten sposób wymusić wszelkie próby odzyskania środków z kontraktu finansowego do wyczerpania gazu. Jednak umowa finansowa może ustalić limit gazu na komunikacie, aby zapobiec temu problemowi.

Alternatywą dla kompletności transakcji jest niekompletność, gdzie `JUMP` i `JUMPI` nie istnieją i tylko jedna kopia każdego kontraktu może istnieć w danym momencie. W tym systemie opisany system opłat i niepewność dotycząca skuteczności naszego rozwiązania mogą nie być konieczne, ponieważ koszt wykonania kontraktu byłby ograniczony wielkością kontraktu. Ponadto, niekompletność w sensie Turinga nie jest nawet tak dużym ograniczeniem; ze wszystkich przykładów kontraktów, które wymyśliliśmy wewnętrznie, jak dotąd tylko jeden wymagał pętli, a nawet ta pętla mogła być usunięta przez wykonanie 26 powtórzeń jednowierszowego fragmentu kodu. Biorąc pod uwagę poważne następstwa kompletności w sensie Turinga i ograniczone korzyści, dlaczego nie ma po prostu języka Turinga niekompletnego w sensie Turinga? W rzeczywistości jednak niekompletność jest daleka od czystego rozwiązania problemu. Aby zobaczyć dlaczego, zastanów się nad następującymi kontraktami:

    C0: call(C1); call(C1);
    C1: call(C2); call(C2);
    C2: call(C3); call(C3);
    ...
    C49: call(C50); call(C50);
    C50: (uruchom jeden krok programu i zapisz zmianę w pamięci)

Teraz wyślij transakcję do A. Zatem w 51 transakcjach mamy kontrakt, który zajmuje 2<sup>50</sup> kroków obliczeniowych. Górnicy mogliby spróbować wykryć takie bomby logiczne z wyprzedzeniem, utrzymując przy każdym kontrakcie wartość określającą maksymalną liczbę kroków obliczeniowych, jakie może on wykonać, i obliczając ją dla kontraktów wywołujących rekurencyjnie inne kontrakty, ale wymagałoby to od górników zakazania kontraktów, które tworzą inne kontrakty (ponieważ tworzenie i wykonywanie wszystkich 26 powyższych kontraktów można by łatwo połączyć w jeden kontrakt). Innym problematycznym punktem jest to, że pole adresowe komunikatu jest zmienne, więc w zasadzie nie można nawet powiedzieć, które inne kontrakty będą wywoływane przez dany kontrakt z wyprzedzeniem. W związku z tym mamy zaskakujący wniosek: kompletność w sensie Turinga jest zaskakująco łatwa do opanowania, a jej brak kompletności jest równie zaskakująco trudny do opanowania, chyba że zastosuje się dokładnie takie same kontrole – ale w takim przypadku dlaczego nie pozwolić, by protokół był kompletny w sensie Turinga?

### Waluta i emisja {#currency-and-issuance}

Sieć Ethereum zawiera własną, wbudowaną walutę, ether, która służy podwójnemu celowi: zapewnia podstawową warstwę płynności, umożliwiając efektywną wymianę między różnymi rodzajami aktywów cyfrowych oraz, co ważniejsze, zapewniając mechanizm uiszczania opłat za transakcje. Dla wygody i w celu uniknięcia przyszłych sporów (patrz obecna debata mBTC/uBTC/satoshi w Bitcoin), nominały będą wstępnie oznaczone:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Należy to traktować jako rozszerzoną wersję pojęcia „dolarów” i „centów” lub „BTC” i „satoshi”. W najbliższej przyszłości oczekujemy, że „ether” będzie używany do zwykłych transakcji, „finney” do mikrotransakcji, a „szabo” i „wei” do dyskusji technicznych na temat opłat i implementacji protokołu; pozostałe nominały mogą stać się użyteczne później i nie powinny być w tym momencie włączane do klientów.

Model emisji będzie następujący:

- Ether zostanie opublikowany w sprzedaży walutowej po cenie 1000-2000 etheru na BTC, mechanizm służący finansowaniu organizacji Ethereum i opłacie za rozwój, który został wykorzystany z powodzeniem przez inne platformy, takie jak Mastercoin i NXT. Wcześni nabywcy odniosą korzyści z większych rabatów. BTC otrzymany ze sprzedaży zostanie całkowicie wykorzystany do wypłacania wynagrodzenia programistom i zainwestowanyc w różne projekty for-profit i non-profit w ekosystemu Ethereum i kryptowaluty.
- 0.099x całkowita kwota sprzedana (60102216 ETH) zostanie przeznaczona dla organizacji w celu wynagrodzenia wczesnych uczestników i zapłacenia wydatków denominowanych w ETH przed blokiem genezy.
- 0,099x łączna ilość sprzedanych produktów będzie utrzymana jako długoterminowa rezerwa.
- 0,26x łączna sprzedana ilość zostanie przydzielona górnikom na rok na zawsze po tym punkcie.

| Grupa                             | Przy wprowadzeniu | Po 1 roku | Po 5 latach |
| --------------------------------- | ----------------- | --------- | ----------- |
| Jednostki waluty                  | 1,198X            | 1,458X    | 2,498X      |
| Kupujący                          | 83,5%             | 68,6%     | 40,0%       |
| Rezerwa wydana przed sprzedażą    | 8,26%             | 6,79%     | 3,96%       |
| Rezerwa wykorzystana po sprzedaży | 8,26%             | 6,79%     | 3,96%       |
| Górnicy                           | 0%                | 17,8%     | 52,0%       |

**Długoterminowy wzrost podaży (w procentach)**

![Inflacja w Ethereum](./ethereum-inflation.png)

_Pomimo liniowej emisji waluty, podobnie jak w przypadku Bitcoina z czasem stopa wzrostu podaży dąży jednak do zera_

Dwa główne wybory w powyższym modelu to (1) istnienie i wielkość puli zasobów oraz (2) istnienie stale rosnącej liniowej podaży, w przeciwieństwie do ograniczonej podaży, jak w przypadku Bitcoina. Uzasadnienie puli zasobów jest następujące. Jeśli by pula zasobów nie istniała, a liniowa emisja zmniejszyła się do 0. 17x dla zapewnienia tej samej stopy inflacji, a następnie całkowita ilość eteru wynosiłaby 16,5% mniej, więc każda jednostka byłaby warta o 19,8% więcej. Tak więc w równowadze 19,8% więcej etheru zostałoby zakupione w sprzedaży, więc każda jednostka byłaby znów tak samo cenna jak poprzednio. Organizacja miałaby wtedy również 1,198x więcej BTC, które można uznać za podzielone na dwie części: oryginalny BTC i dodatkowe 0,198x. W związku z tym ta sytuacja jest _dokładnie równoważna_ z zaopatrzeniem, ale przy jednej istotnej różnicy: organizacja posiada wyłącznie BTC, a więc nie jest zachęcana do wspierania wartości jednostki etheru.

Stały model liniowego wzrostu podaży zmniejsza ryzyko tego, co niektórzy postrzegają jako nadmierne stężenie bogactwa w Bitcoin, i daje osobom jednostek waluty, jednocześnie zachowując silną zachętę do uzyskania i wstrzymania eteru, ponieważ „stopa wzrostu podaży” wyrażona jako procent nadal wynosi w miarę upływu czasu. Teoretyzujemy również, że ponieważ monety są zawsze tracone z czasem z powodu nieostrożności, śmierci, itp., a utrata monet może być modelowana jako procent całkowitej podaży na rok, że całkowita podaż waluty w obiegu w rzeczywistości ostatecznie ustabilizuje się na wartości równej rocznej emisji podzielonej przez wskaźnik utraty (np. przy stopie strat 1%, gdy podaż osiągnie 26X, 0,26X będzie wydobywane i 0,26X tracone każdego roku, tworząc równowagę).

Zauważ, że w przyszłości Ethereum przełączy się na model proof-of-stake dla bezpieczeństwa, ograniczając wymaganie emisji do jakiejś wartości między zerem a 0,05X rocznie. W przypadku, gdy organizacja Ethereum straci fundusze lub z jakiegokolwiek innego powodu zniknie, pozostawiamy otwartą „umowę społeczną”: każdy ma prawo do stworzenia przyszłej wersji kandydata Ethereum, pod jedynym warunkiem, że ilość eteru musi być co najwyżej równa `60102216 * (1. 198 + 0.26 * n)` gdzie `n` jest liczbą lat po bloku genezy. Twórcy mogą swobodnie sprzedać lub w inny sposób przypisać część lub całość różnicy między zwiększeniem podaży napędzanym przez PoS a maksymalnym dopuszczalnym zwiększeniem podaży do zapłaty za rozwój. Aktualizacje kandydujące, które nie są zgodne z umową społeczną, mogą być w uzasadniony sposób rozwidlone na wersje zgodne.

### Centralizacja wydobycia {#mining-centralization}

Algorytm wydobywczy Bitcoin działa w ten sposób, że górnicy obliczają SHA256 na lekko zmodyfikowanych wersjach nagłówka bloku miliony razy w kółko, aż w końcu jeden z węzłów znajdzie wersję, której hash jest mniejszy niż docelowy (obecnie około 2<sup>192</sup>). Ten algorytm wydobywania jest jednak podatny na dwie formy centralizacji. Po pierwsze, ekosystem górniczy został zdominowany przez ASIC (układy scalone specyficzne dla zastosowań), chipy komputerowe zaprojektowane dla konkretnego zadania wydobycia Bitcoina, a zatem tysiące razy bardziej wydajne. Oznacza to, że wydobycie bitcoinów nie jest już wysoce zdecentralizowanym i egalitarnym przedsięwzięciem, wymagającym milionów dolarów kapitału, aby efektywnie w nim uczestniczyć. Po drugie, większość górników Bitcoin nie wykonuje walidacji bloków lokalnie; zamiast tego polegają na scentralizowanej puli wydobywczej, która dostarcza nagłówki bloków. Ten problem jest prawdopodobnie poważniejszy: w czasie pisania tego tekstu trzy największe pule górnicze pośrednio kontrolują około 50% mocy obliczeniowej w sieci Bitcoin, chociaż jest to złagodzone przez fakt, że górnicy mogą przejść do innych pul górniczych, jeśli jakaś pula lub koalicja próbuje ataku 51%.

Obecnym zamiarem w Ethereum jest wykorzystanie algorytmu wydobywczego, w którym górnicy są zobowiązani do pobierania losowych danych ze stanu, obliczania kilku losowo wybranych transakcji z ostatnich N bloków w blockchainie i zwracania skrótu wyniku. Ma to dwie ważne korzyści. Po pierwsze, kontrakty Ethereum mogą zawierać wszelkiego rodzaju obliczenia, więc Ethereum ASIC byłby zasadniczo ASIC do obliczeń ogólnych – np. lepszy CPU. Po drugie, wydobywanie wymaga dostępu do całego łańcucha bloków, co zmusza górników do przechowywania całego łańcucha bloków i przynajmniej weryfikowania każdej transakcji. Eliminuje to potrzebę istnienia scentralizowanych pul wydobywczych; chociaż pule wydobywcze mogą nadal pełnić uzasadnioną rolę wyrównywania losowości dystrybucji nagród, funkcja ta może być równie dobrze pełniona przez pule peer-to-peer bez centralnej kontroli.

Niniejszy model nie jest testowany, i mogą pojawić się trudności w unikaniu pewnych inteligentnych optymalizacji podczas korzystania z wykonania kontraktu jako algorytmu górniczego. Jednak szczególnie interesującą cechą tego algorytmu jest to, że pozwala on każdemu na „zatrucie studni”, poprzez wprowadzenie do blockchainu dużej liczby kontraktów zaprojektowanych specjalnie po to, by powstrzymać pewne układy ASIC. Dla producentów ASIC istnieją zachęty ekonomiczne, aby używali tego rodzaju sztuczki do wzajemnego atakowania. Zatem rozwiązaniem, które opracowujemy, jest ostatecznie adaptacyjne rozwiązanie ekonomiczne, a nie czysto techniczne.

### Skalowalność {#scalability}

Jedną z powszechnych obaw związanych z Ethereum jest kwestia skalowalności. Podobnie jak w przypadku Bitcoina, wada Ethereum polega na tym, że każda transakcja musi być przetwarzana przez każdy węzeł w sieci. W przypadku Bitcoina, rozmiar obecnego łańcucha bloków wynosi około 15 GB, wzrastając o około 1 MB na godzinę. Jeśli sieć Bitcoin miała przetwarzać 2000 transakcji Visa na sekundę, rosłaby o 1 MB na trzy sekundy (1 GB na godzinę, 8 TB na rok). Ethereum prawdopodobnie doświadczy podobnego wzorca wzrostu, pogorszonego przez to, że na górze blockchainu Ethereum będzie wiele aplikacji zamiast tylko waluty, jak ma to miejsce w przypadku Bitcoina, ale złagodzi to fakt, że pełne węzły Ethereum muszą przechowywać tylko stan zamiast całej historii blockchainu.

Problem z tak dużą wielkością blockchainu to ryzyko centralizacji. Jeśli rozmiar łańcucha bloków wzrasta na przykład do 100 TB, wtedy prawdopodobnym scenariuszem byłby fakt, że tylko bardzo mała liczba dużych przedsiębiorstw prowadziłaby pełnych węzłów, ze wszystkimi regularnymi użytkownikami używającymi lekkich węzłów SPV. W takiej sytuacji pojawia się potencjalna obawa, że wszystkie węzły mogłyby wspólnie i wszyscy zgadzają się na oszukiwanie w sposób przynoszący zyski (np. zmień nagrodę bloku, daj sobie BTC). Lekkie węzły nie miałyby sposobu na natychmiastowe wykrycie. Oczywiście przynajmniej jeden uczciwy pełny węzeł prawdopodobnie istniałby, a po kilku godzinach informacje o oszustwo wyciekłyby kanałami takimi jak Reddit, ale w tym momencie byłoby już za późno: zwykli użytkownicy zajmą się organizacją próby umieszczenia na czarnej liście podanych bloków, ogromnym i prawdopodobnie niewykonalnym problem koordynacji o podobnej skali, jak próba poderwania się na udany atak 51%. W przypadku Bitcoina, jest to obecnie problem, ale istnieje modyfikacja blockchain [zasugerowana przez Petera Todda](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/), która poprawi ten problem.

W najbliższym czasie Ethereum wykorzysta dwie dodatkowe strategie w celu rozwiązania tego problemu. Po pierwsze, z powodu algorytmów kopania opartych na blockchain, co najmniej każdy górnik będzie zmuszony do bycia pełnym węzłem, tworząc dolną granicę liczby pełnych węzłów. Drugie i więcej ważne jest jednak, że po przetworzeniu każdej transakcji znajdziemy pośrednie drzewo stanowe w łańcuchu bloków. Nawet jeśli blok jest scentralizowany, dopóki istnieje jeden uczciwy węzeł, problem centralizacji można obejść za pomocą protokołu weryfikacji. Jeśli górnik publikuje nieprawidłowy blok, ten blok musi być albo źle sformatowany, albo stan `S[n]` jest nieprawidłowy. Skoro `S[0]` jest znany jako poprawny, musi być jakiś pierwszy stan `S[i]` niepoprawny gdzie `S[i-1]` jest poprawny. Serwer weryfikujący dostarczy indeks `i`, wraz z „dowodem inwalidztwa” składającym się z podzbioru węzłów drzew Patricia, które muszą przetworzyć `APPLY(S[i-1], X[i]) -> S[i]`. Węzły będą mogły używać węzłów Patricia do uruchomienia tej części obliczeń, i zobacz, że wygenerowany `S[i]` nie pasuje do podanego `S[i]`.

Inny, bardziej zaawansowany atak obejmowałby złośliwych górników publikowania niekompletnych bloków, więc pełna informacja nawet nie istnieje, aby określić, czy bloki są poprawne. Rozwiązaniem tego jest protokół wyzwania-odpowiedzi: węzły weryfikacyjne problem "wyzwania" w postaci docelowych wskaźników transakcji, i po otrzymaniu węzła węzeł świetlny traktuje blok jako niezaufany do czasu, aż inny węzeł, czy górnik lub inny weryfikator dostarcza podzbiór węzłów Patricia jako dowód ważności.

## Podsumowanie {#conclusion}

Protokół Ethereum został pierwotnie zaprojektowany jako zaktualizowana wersja kryptowaluty, zapewniająca zaawansowane funkcje, takie jak escrow- w blockchain, limity odstąpienia, umowy finansowe, rynki gier hazardowych i, np. poprzez wysoce uogólniony język programowania. Protokół Ethereum nie będzie "wspierał" żadnej aplikacji bezpośrednio, ale istnienie kompletnego języka programowania oznacza, że dowolny kontrakty można teoretycznie utworzyć dla każdego rodzaju transakcji lub aplikacji. Bardziej interesujące jest jednak to, że protokół Ethereum przesuwa się daleko poza samą walutę. Protokoły wokół zdecentralizowanego przechowywania plików, zdecentralizowanych obliczeń i zdecentralizowanych rynków przewidywania wśród dziesiątków innych takich koncepcji, mają potencjał znacznego zwiększenia wydajności przemysłu obliczeniowego, i stanowi ogromny bodziec dla innych protokołów peer-to-peer przez dodanie warstwy ekonomicznej. Wreszcie, istnieje również znaczna gama aplikacji, które w ogóle nie mają nic wspólnego z pieniędzmi.

Koncepcja arbitralnej funkcji przejściowej państwa wdrożonej przez protokołu Ethereum zapewnia platformę o unikalnym potencjale; zamiast być zamkniętym, jednofunkcyjnym protokołem przeznaczonym do konkretnych zastosowań w przechowywaniu danych, gra hazardowa lub finansowa, Ethereum jest otwarte przez projekt, i uważamy, że w nadchodzących latach jest on niezwykle dobrze przygotowany do pełnienia funkcji podstawy dla bardzo dużej liczby protokołów finansowych i niefinansowych.

## Uwagi i dalsze lektury {#notes-and-further-reading}

### Uwagi {#notes}

1.  Czytelnik może zauważyć, że w rzeczywistości adres Bitcoin jest skrótem klucza publicznego krzywej eliptycznej, a nie klucz publiczny. Jednak w rzeczywistości całkowicie uzasadniona jest terminologia kryptograficzna określająca hash pubkey jako sam klucz publiczny. , ponieważ kryptografię Bitcoina można uznać za niestandardową algorytm podpisu cyfrowego, w przypadku gdy klucz publiczny składa się z skrótu pubke'a ECC, podpis składa się z pubkey ECC połączony z podpisem ECC, i algorytm weryfikacji obejmuje sprawdzanie pubkey ECC w podpisze za pomocą skrótu pubkey ECC dostarczonego jako klucz publiczny, a następnie weryfikację podpisu ECC za pomocą pubkey ECC.
2.  Technicznie mediana 11 poprzednich bloków.
3.  Protokół Ethereum powinien być tak prosty, jak to możliwe, ale może być konieczne do uzyskania dość wysokiego stopnia złożoności, na przykład do skali, do internalizacji kosztów przechowywania, szerokości pasma i I/O, dla bezpieczeństwa, prywatności, przejrzystości itp. W przypadku gdy złożoność jest konieczna, dokumentacja powinna być możliwie jak najwyraźniejsza, zwięzła i aktualna, aby ktoś całkowicie nieszkolony w Ethereum mógł nauczyć się tego i stać się ekspertem.
4.  Zobacz [Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) dla maszyny wirtualnej Ethereum (która jest przydatna jako specyfikacja i punkt odniesienia dla budowania klienta Ethereum od podstaw), podczas gdy jest również wiele tematów w [Ethereum wiki](https://github.com/ethereum/wiki/wiki), takich jak rozwój, Podstawowy rozwój, rozwój aplikacji, badania, Casper R&D i protokoły sieciowe. Do badań i możliwej przyszłości implementacja istnieje [ethresear.ch](https://ethresear.ch).
5.  Innym sposobem wyrażania tego jest abstrakcja. [najnowsza mapa drogowa](https://ethresear.ch/t/sharding-phase-1-spec/1407/67) planuje abstrakcję wykonania, zezwalanie na nie silnikom wykonującym musi być zgodne z jedną specyfikacją kanoniczną, ale na przykład może być dostosowany do konkretnej aplikacji, a do fragmentu. (Ta heterogeniczność silników egzekucyjnych nie jest wyraźnie podana w mapie drogowej. Istnieje również niejednorodny sharding, który Konceptualizuje Vlada Zamfira.)
6.  Wewnętrznie 2 i „CHARLIE” to liczby, przy czym ta ostatnia to w reprezentacji big-endian base 256. Liczby mogą wynosić co najmniej 0 i co najwyżej 2<sup>256</sup>-1.

### Czytaj Dalej {#further-reading}

1.  [Wartość wewnętrzna](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2.  [Inteligentna własność](https://en.bitcoin.it/wiki/Smart_Property)
3.  [Inteligentne kontrakty](https://en.bitcoin.it/wiki/Contracts)
4.  [B- pieniądze](http://www.weidai.com/bmoney.txt)
5.  [Dowody pracy wielokrotnego użytku](https://nakamotoinstitute.org/finney/rpow/)
6.  [Zabezpieczenie tytułów własności na podstawie uprawnień właściciela](https://nakamotoinstitute.org/secure-property-titles/)
7.  [Biała księga Bitcoin](http://bitcoin.org/bitcoin.pdf)
8.  [Namecoin](https://namecoin.org/)
9.  [Trójkąt Zooko's](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Biała księga kolorowych monet](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Biała księga Mastercoina](https://github.com/mastercoin-MSC/spec)
12. [Zdecentralizowane autonomiczne korporacje, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Uproszczona weryfikacja płatności](https://en.bitcoin.it/wiki/Scalability#Simplifiedpaymentverification)
14. [Drzewa Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Drzewa Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ i agenci autonomiczni, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn na temat Inteligentnej Własności podczas Festiwalu Turinga](http://www.youtube.com/watch?v=Pu4PAMFPo5Y)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Drzewa Patricia Merkle w Ethereum](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd na temat sumy drzew Merkle](http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Historia białej księgi znajduje się na stronie https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md_

_Warto zauważyć, że Ethereum, podobnie jak wiele projektów oprogramowania opartych na społecznościach, rozwija się od czasu jego początkowego powstania. Aby dowiedzieć się o najnowszych zmianach w Ethereum i jak wprowadzone są zmiany w protokole, zalecamy [ten przewodnik](/learn/)._
