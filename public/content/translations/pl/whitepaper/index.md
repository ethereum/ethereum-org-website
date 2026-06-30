---
title: Biała księga Ethereum
description: Dokument wprowadzający do Ethereum, opublikowany w 2013 roku przed jego uruchomieniem.
lang: pl
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Mimo że ma już kilka lat, zachowujemy poniższy oryginalny dokument, ponieważ nadal służy on jako przydatne źródło informacji i dokładne odzwierciedlenie [Ethereum](/) oraz jego wizji._

## Platforma inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp) nowej generacji {#a-next-generation-smart-contract-and-decentralized-application-platform}

Stworzenie Bitcoina przez Satoshiego Nakamoto w 2009 roku często było określane jako radykalny przełom w dziedzinie pieniądza i walut, będąc pierwszym przykładem aktywa cyfrowego, które jednocześnie nie ma pokrycia ani "[wartości wewnętrznej](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" oraz nie posiada scentralizowanego emitenta ani kontrolera. Jednakże inną, prawdopodobnie ważniejszą częścią eksperymentu z Bitcoinem jest leżąca u jego podstaw technologia blockchain jako narzędzie rozproszonego konsensusu, a uwaga szybko zaczyna przenosić się na ten właśnie aspekt Bitcoina. Powszechnie wymieniane alternatywne zastosowania technologii blockchain obejmują wykorzystanie aktywów cyfrowych na blockchainie do reprezentowania niestandardowych walut i instrumentów finansowych ("[kolorowe monety](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), własności bazowego urządzenia fizycznego ("[inteligentna własność](https://en.bitcoin.it/wiki/Smart_Property)"), aktywów niewymiennych, takich jak nazwy domen ("[Namecoin](http://namecoin.org)"), a także bardziej złożone aplikacje polegające na tym, że aktywa cyfrowe są bezpośrednio kontrolowane przez fragment kodu implementujący dowolne reguły ("[inteligentne kontrakty](https://nakamotoinstitute.org/smart-contracts/)") lub nawet oparte na blockchainie "[zdecentralizowane organizacje autonomiczne](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO). To, co zamierza zapewnić Ethereum, to blockchain z wbudowanym, w pełni funkcjonalnym, kompletnym w sensie Turinga językiem programowania, który może być użyty do tworzenia „kontraktów” służących do kodowania dowolnych funkcji przejścia stanu, co pozwala użytkownikom na tworzenie dowolnych z wyżej opisanych systemów, a także wielu innych, których jeszcze sobie nie wyobrażamy, po prostu poprzez napisanie logiki w kilku linijkach kodu.

## Wprowadzenie do Bitcoina i istniejących koncepcji {#introduction-to-bitcoin-and-existing-concepts}

### Historia {#history}

Koncepcja zdecentralizowanej waluty cyfrowej, a także alternatywnych zastosowań, takich jak rejestry własności, istnieje od dziesięcioleci. Anonimowe protokoły e-gotówki z lat 80. i 90., opierające się głównie na prymitywie kryptograficznym znanym jako ślepy podpis Chauma (Chaumian blinding), zapewniały walutę o wysokim stopniu prywatności, ale protokoły te w dużej mierze nie zyskały popularności z powodu ich zależności od scentralizowanego pośrednika. W 1998 roku [b-money](https://nakamotoinstitute.org/b-money/) Wei Daia stało się pierwszą propozycją wprowadzającą ideę tworzenia pieniędzy poprzez rozwiązywanie zagadek obliczeniowych, a także zdecentralizowany konsensus, ale propozycja ta zawierała niewiele szczegółów na temat tego, jak zdecentralizowany konsensus mógłby zostać faktycznie zaimplementowany. W 2005 roku Hal Finney wprowadził koncepcję „[wielokrotnych dowodów pracy](https://nakamotoinstitute.org/finney/rpow/)” (reusable proofs of work), systemu, który wykorzystuje pomysły z b-money wraz z trudnymi obliczeniowo zagadkami Hashcash Adama Backa do stworzenia koncepcji kryptowaluty, ale po raz kolejny minął się z ideałem, opierając się na zaufanym przetwarzaniu (trusted computing) jako zapleczu. W 2009 roku zdecentralizowana waluta została po raz pierwszy zaimplementowana w praktyce przez Satoshiego Nakamoto, łącząc ugruntowane prymitywy do zarządzania własnością za pomocą kryptografii klucza publicznego z algorytmem konsensusu do śledzenia, kto jest właścicielem monet, znanym jako „dowód pracy (PoW)”.

Mechanizm stojący za dowodem pracy (PoW) był przełomem w tej przestrzeni, ponieważ jednocześnie rozwiązywał dwa problemy. Po pierwsze, zapewniał prosty i umiarkowanie skuteczny algorytm konsensusu, pozwalając węzłom w sieci na wspólne uzgodnienie zestawu kanonicznych aktualizacji stanu księgi Bitcoina. Po drugie, zapewniał mechanizm umożliwiający swobodne wejście do procesu konsensusu, rozwiązując polityczny problem decydowania o tym, kto ma wpływ na konsensus, jednocześnie zapobiegając atakom Sybil. Robi to poprzez zastąpienie formalnej bariery uczestnictwa, takiej jak wymóg bycia zarejestrowanym jako unikalny podmiot na określonej liście, barierą ekonomiczną – waga pojedynczego węzła w procesie głosowania nad konsensusem jest wprost proporcjonalna do mocy obliczeniowej, jaką ten węzeł wnosi. Od tego czasu zaproponowano alternatywne podejście zwane _dowodem stawki (PoS)_, obliczające wagę węzła jako proporcjonalną do posiadanej przez niego waluty, a nie zasobów obliczeniowych; dyskusja na temat względnych zalet obu podejść wykracza poza zakres tego dokumentu, ale należy zauważyć, że oba podejścia mogą służyć jako szkielet kryptowaluty.

### Bitcoin jako system przejścia stanów {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Z technicznego punktu widzenia księgę kryptowaluty takiej jak Bitcoin można uważać za system przejścia stanów, w którym istnieje „stan” składający się ze statusu własności wszystkich istniejących bitcoinów oraz „funkcja przejścia stanu”, która przyjmuje stan i transakcję, a jako wynik zwraca nowy stan. W standardowym systemie bankowym na przykład stanem jest bilans, transakcja to żądanie przeniesienia X dolarów od A do B, a funkcja przejścia stanu zmniejsza wartość na koncie A o X dolarów i zwiększa wartość na koncie B o X dolarów. Jeśli konto A ma na początku mniej niż X dolarów, funkcja przejścia stanu zwraca błąd. Stąd można formalnie zdefiniować:

```
APPLY(S,TX) -> S' or ERROR
```

W zdefiniowanym powyżej systemie bankowym:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ale:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

„Stan” w Bitcoinie to zbiór wszystkich monet (technicznie rzecz biorąc, „niewydanych wyjść transakcji” lub UTXO), które zostały wyemitowane i jeszcze nie wydane, przy czym każde UTXO ma nominał i właściciela (zdefiniowanego przez 20-bajtowy adres, który w istocie jest kryptograficznym kluczem publicznym<sup>[fn1](#notes)</sup>). Transakcja zawiera jedno lub więcej wejść, z których każde zawiera odniesienie do istniejącego UTXO i podpis kryptograficzny wygenerowany przez klucz prywatny powiązany z adresem właściciela, oraz jedno lub więcej wyjść, z których każde zawiera nowe UTXO do dodania do stanu.

Funkcję przejścia stanu `APPLY(S,TX) -> S'` można zdefiniować w przybliżeniu następująco:

<ol>
  <li>
    Dla każdego wejścia w <code>TX</code>:
    <ul>
    <li>
        Jeśli wskazywanego UTXO nie ma w <code>S</code>, zwróć błąd.
    </li>
    <li>
        Jeśli podany podpis nie pasuje do właściciela UTXO, zwróć błąd.
    </li>
    </ul>
  </li>
  <li>
    Jeśli suma nominałów wszystkich wejściowych UTXO jest mniejsza niż suma nominałów wszystkich wyjściowych UTXO, zwróć błąd.
  </li>
  <li>
    Zwróć <code>S</code> ze wszystkimi usuniętymi wejściowymi UTXO i dodanymi wszystkimi wyjściowymi UTXO.
  </li>
</ol>

Pierwsza połowa pierwszego kroku zapobiega wydawaniu przez nadawców transakcji nieistniejących monet, druga połowa pierwszego kroku zapobiega wydawaniu przez nadawców transakcji cudzych monet, a drugi krok wymusza zachowanie wartości. Aby użyć tego do płatności, protokół wygląda następująco. Załóżmy, że Alice chce wysłać 11,7 BTC do Boba. Najpierw Alice poszuka zestawu dostępnych UTXO, których jest właścicielką, o łącznej wartości co najmniej 11,7 BTC. Realistycznie rzecz biorąc, Alice nie będzie w stanie uzyskać dokładnie 11,7 BTC; powiedzmy, że najmniejsza wartość, jaką może uzyskać, to 6+4+2=12. Następnie tworzy transakcję z tymi trzema wejściami i dwoma wyjściami. Pierwszym wyjściem będzie 11,7 BTC z adresem Boba jako właścicielem, a drugim wyjściem będzie pozostałe 0,3 BTC „reszty”, której właścicielką będzie sama Alice.

### Kopanie {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Gdybyśmy mieli dostęp do godnej zaufania scentralizowanej usługi, system ten byłby banalny w implementacji; można by go po prostu zakodować dokładnie tak, jak opisano, używając dysku twardego scentralizowanego serwera do śledzenia stanu. Jednak w przypadku Bitcoina próbujemy zbudować zdecentralizowany system walutowy, więc będziemy musieli połączyć system transakcji stanu z systemem konsensusu, aby upewnić się, że wszyscy zgadzają się co do kolejności transakcji. Zdecentralizowany proces konsensusu Bitcoina wymaga, aby węzły w sieci nieustannie próbowały tworzyć pakiety transakcji zwane „blokami”. Sieć ma za zadanie produkować mniej więcej jeden blok co dziesięć minut, przy czym każdy blok zawiera znacznik czasu, nonce, odniesienie do (tj. hash) poprzedniego bloku oraz listę wszystkich transakcji, które miały miejsce od czasu poprzedniego bloku. Z biegiem czasu tworzy to trwały, stale rosnący „blockchain”, który jest nieustannie aktualizowany, aby reprezentować najnowszy stan księgi Bitcoina.

Algorytm sprawdzania, czy blok jest ważny, wyrażony w tym paradygmacie, jest następujący:

1. Sprawdź, czy poprzedni blok, do którego odwołuje się dany blok, istnieje i jest ważny.
2. Sprawdź, czy znacznik czasu bloku jest większy niż znacznik czasu poprzedniego bloku<sup>[fn2](#notes)</sup> i mniejszy niż 2 godziny w przyszłość.
3. Sprawdź, czy dowód pracy (PoW) dla bloku jest ważny.
4. Niech `S[0]` będzie stanem na końcu poprzedniego bloku.
5. Załóżmy, że `TX` to lista transakcji bloku zawierająca `n` transakcji. Dla wszystkich `i` w `0...n-1`, ustaw `S[i+1] = APPLY(S[i],TX[i])` Jeśli jakakolwiek aplikacja zwróci błąd, zakończ i zwróć fałsz.
6. Zwróć prawdę i zarejestruj `S[n]` jako stan na końcu tego bloku.

Zasadniczo każda transakcja w bloku musi zapewniać prawidłowe przejście stanu z tego, co było stanem kanonicznym przed wykonaniem transakcji, do pewnego nowego stanu. Należy zauważyć, że stan nie jest w żaden sposób zakodowany w bloku; jest to czysta abstrakcja, o której musi pamiętać węzeł walidujący, i może być (bezpiecznie) obliczona dla dowolnego bloku tylko poprzez rozpoczęcie od stanu genezy i sekwencyjne zastosowanie każdej transakcji w każdym bloku. Dodatkowo należy zauważyć, że kolejność, w jakiej górnik włącza transakcje do bloku, ma znaczenie; jeśli w bloku znajdują się dwie transakcje A i B takie, że B wydaje UTXO utworzone przez A, to blok będzie ważny, jeśli A występuje przed B, ale nie w przeciwnym razie.

Jedynym warunkiem ważności obecnym na powyższej liście, którego nie można znaleźć w innych systemach, jest wymóg „dowodu pracy (PoW)”. Dokładny warunek jest taki, że podwójny hash SHA256 każdego bloku, traktowany jako liczba 256-bitowa, musi być mniejszy niż dynamicznie dostosowywany cel, który w momencie pisania tego tekstu wynosi w przybliżeniu 2<sup>187</sup>. Celem tego jest uczynienie tworzenia bloków obliczeniowo „trudnym”, zapobiegając w ten sposób atakującym Sybil przed przebudowaniem całego blockchaina na swoją korzyść. Ponieważ SHA256 został zaprojektowany jako całkowicie nieprzewidywalna funkcja pseudolosowa, jedynym sposobem na utworzenie ważnego bloku jest po prostu metoda prób i błędów, polegająca na wielokrotnym inkrementowaniu nonce i sprawdzaniu, czy nowy hash pasuje.

Przy obecnym celu wynoszącym ~2<sup>187</sup>, sieć musi wykonać średnio ~2<sup>69</sup> prób, zanim zostanie znaleziony ważny blok; ogólnie rzecz biorąc, cel jest rekalibrowany przez sieć co 2016 bloków, tak aby średnio nowy blok był produkowany przez jakiś węzeł w sieci co dziesięć minut. Aby zrekompensować górnikom tę pracę obliczeniową, górnik każdego bloku ma prawo dołączyć transakcję dającą mu 25 BTC znikąd. Dodatkowo, jeśli jakakolwiek transakcja ma wyższy łączny nominał na wejściach niż na wyjściach, różnica również trafia do górnika jako „opłata transakcyjna”. Nawiasem mówiąc, jest to również jedyny mechanizm, za pomocą którego emitowane są BTC; stan genezy nie zawierał w ogóle żadnych monet.

Aby lepiej zrozumieć cel kopania, przeanalizujmy, co dzieje się w przypadku złośliwego atakującego. Ponieważ wiadomo, że kryptografia leżąca u podstaw Bitcoina jest bezpieczna, atakujący weźmie na cel tę jedną część systemu Bitcoin, która nie jest bezpośrednio chroniona przez kryptografię: kolejność transakcji. Strategia atakującego jest prosta:

1. Wyślij 100 BTC do sprzedawcy w zamian za jakiś produkt (najlepiej dobro cyfrowe o szybkiej dostawie).
2. Poczekaj na dostawę produktu.
3. Utwórz kolejną transakcję wysyłającą te same 100 BTC do siebie.
4. Spróbuj przekonać sieć, że jego transakcja do samego siebie była tą, która pojawiła się jako pierwsza.

Gdy krok (1) zostanie wykonany, po kilku minutach jakiś górnik włączy transakcję do bloku, powiedzmy bloku numer 270000. Po około godzinie do łańcucha zostanie dodanych pięć kolejnych bloków po tym bloku, przy czym każdy z tych bloków będzie pośrednio wskazywał na transakcję, a tym samym ją „potwierdzał”. W tym momencie sprzedawca zaakceptuje płatność jako sfinalizowaną i dostarczy produkt; ponieważ zakładamy, że jest to dobro cyfrowe, dostawa jest natychmiastowa. Teraz atakujący tworzy kolejną transakcję wysyłającą 100 BTC do siebie. Jeśli atakujący po prostu opublikuje ją w sieci, transakcja nie zostanie przetworzona; górnicy spróbują uruchomić `APPLY(S,TX)` i zauważą, że `TX` zużywa UTXO, którego nie ma już w stanie. Zamiast tego atakujący tworzy „rozwidlenie” (fork) blockchaina, zaczynając od wykopania innej wersji bloku 270000 wskazującej na ten sam blok 269999 jako rodzica, ale z nową transakcją w miejscu starej. Ponieważ dane bloku są inne, wymaga to ponownego wykonania dowodu pracy (PoW). Co więcej, nowa wersja bloku 270000 atakującego ma inny hash, więc oryginalne bloki od 270001 do 270005 nie „wskazują” na niego; w ten sposób oryginalny łańcuch i nowy łańcuch atakującego są całkowicie oddzielne. Zasada jest taka, że w przypadku rozwidlenia najdłuższy blockchain jest uznawany za prawdziwy, więc uczciwi górnicy będą pracować nad łańcuchem 270005, podczas gdy sam atakujący pracuje nad łańcuchem 270000. Aby atakujący mógł uczynić swój blockchain najdłuższym, musiałby dysponować większą mocą obliczeniową niż reszta sieci razem wzięta, aby nadrobić zaległości (stąd „atak 51%”).

### Drzewa Merklego {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Po lewej: wystarczy przedstawić tylko niewielką liczbę węzłów w drzewie Merklego, aby dostarczyć dowód ważności gałęzi._

_Po prawej: jakakolwiek próba zmiany jakiejkolwiek części drzewa Merklego ostatecznie doprowadzi do niespójności gdzieś wyżej w łańcuchu._

Ważną cechą skalowalności Bitcoina jest to, że blok jest przechowywany w wielopoziomowej strukturze danych. „Hash” bloku to w rzeczywistości tylko hash nagłówka bloku, około 200-bajtowego fragmentu danych, który zawiera znacznik czasu, nonce, hash poprzedniego bloku oraz hash korzenia struktury danych zwanej drzewem Merklego, przechowującej wszystkie transakcje w bloku. Drzewo Merklego to rodzaj drzewa binarnego, składającego się z zestawu węzłów z dużą liczbą węzłów-liści na dole drzewa zawierających podstawowe dane, zestawu węzłów pośrednich, gdzie każdy węzeł jest hashem dwojga swoich dzieci, i wreszcie pojedynczego węzła korzenia, również utworzonego z hasha dwojga swoich dzieci, reprezentującego „szczyt” drzewa. Celem drzewa Merklego jest umożliwienie dostarczania danych w bloku po kawałku: węzeł może pobrać tylko nagłówek bloku z jednego źródła, niewielką część drzewa, która go dotyczy, z innego źródła, i nadal mieć pewność, że wszystkie dane są poprawne. Powodem, dla którego to działa, jest to, że hashe propagują się w górę: jeśli złośliwy użytkownik spróbuje podmienić fałszywą transakcję na dole drzewa Merklego, zmiana ta spowoduje zmianę w węźle powyżej, a następnie zmianę w węźle nad nim, ostatecznie zmieniając korzeń drzewa, a tym samym hash bloku, powodując, że protokół zarejestruje go jako zupełnie inny blok (prawie na pewno z nieważnym dowodem pracy (PoW)).

Protokół drzewa Merklego jest prawdopodobnie niezbędny dla długoterminowego zrównoważonego rozwoju. „Pełny węzeł” w sieci Bitcoin, taki, który przechowuje i przetwarza całość każdego bloku, zajmuje około 15 GB miejsca na dysku w sieci Bitcoin (stan na kwiecień 2014 r.) i rośnie o ponad gigabajt miesięcznie. Obecnie jest to wykonalne dla niektórych komputerów stacjonarnych, ale nie dla telefonów, a w przyszłości tylko firmy i hobbyści będą mogli w tym uczestniczyć. Protokół znany jako „uproszczona weryfikacja płatności” (SPV) pozwala na istnienie innej klasy węzłów, zwanych „lekkimi węzłami”, które pobierają nagłówki bloków, weryfikują dowód pracy (PoW) na nagłówkach bloków, a następnie pobierają tylko „gałęzie” powiązane z transakcjami, które ich dotyczą. Pozwala to lekkim węzłom określić z silną gwarancją bezpieczeństwa, jaki jest status dowolnej transakcji Bitcoin i ich obecne saldo, pobierając tylko bardzo małą część całego blockchaina.

### Alternatywne zastosowania blockchaina {#alternative-blockchain-applications}

Pomysł wzięcia podstawowej idei blockchaina i zastosowania jej do innych koncepcji również ma długą historię. W 2005 roku Nick Szabo przedstawił koncepcję „[bezpiecznych tytułów własności z autorytetem właściciela](https://nakamotoinstitute.org/library/secure-property-titles/)”, dokument opisujący, w jaki sposób „nowe postępy w technologii replikowanych baz danych” pozwolą na oparty na blockchainie system przechowywania rejestru tego, kto jest właścicielem jakiej ziemi, tworząc rozbudowane ramy obejmujące koncepcje takie jak osadnictwo (homesteading), zasiedzenie (adverse possession) i georgiański podatek gruntowy. Niestety w tamtym czasie nie był dostępny żaden skuteczny system replikowanych baz danych, więc protokół nigdy nie został zaimplementowany w praktyce. Jednak po 2009 roku, gdy opracowano zdecentralizowany konsensus Bitcoina, szybko zaczęło pojawiać się wiele alternatywnych zastosowań.

- **Namecoin** – stworzony w 2010 roku [Namecoin](https://namecoin.org/) najlepiej opisać jako zdecentralizowaną bazę danych rejestracji nazw. W zdecentralizowanych protokołach, takich jak Tor, Bitcoin i BitMessage, musi istnieć jakiś sposób identyfikacji kont, aby inni ludzie mogli z nimi wchodzić w interakcje, ale we wszystkich istniejących rozwiązaniach jedynym dostępnym rodzajem identyfikatora jest pseudolosowy hash, taki jak `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. W idealnym przypadku chciałoby się mieć możliwość posiadania konta o nazwie takiej jak „george”. Problem polega jednak na tym, że jeśli jedna osoba może utworzyć konto o nazwie „george”, to ktoś inny może użyć tego samego procesu, aby zarejestrować „george” również dla siebie i podszywać się pod nią. Jedynym rozwiązaniem jest paradygmat „kto pierwszy, ten lepszy” (first-to-file), w którym pierwsza rejestrująca osoba odnosi sukces, a druga ponosi porażkę – problem idealnie pasujący do protokołu konsensusu Bitcoina. Namecoin jest najstarszą i najbardziej udaną implementacją systemu rejestracji nazw wykorzystującą taki pomysł.
- **Kolorowe monety (Colored coins)** – celem [kolorowych monet](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) jest służenie jako protokół pozwalający ludziom na tworzenie własnych walut cyfrowych – lub, w ważnym trywialnym przypadku waluty z jedną jednostką, cyfrowych tokenów – na blockchainie Bitcoina. W protokole kolorowych monet „emituje się” nową walutę poprzez publiczne przypisanie koloru do określonego UTXO Bitcoina, a protokół rekurencyjnie definiuje kolor innych UTXO jako taki sam jak kolor wejść, które wydała tworząca je transakcja (pewne specjalne zasady mają zastosowanie w przypadku wejść o mieszanych kolorach). Pozwala to użytkownikom na utrzymywanie portfeli zawierających tylko UTXO o określonym kolorze i przesyłanie ich podobnie jak zwykłych bitcoinów, cofając się przez blockchain w celu określenia koloru dowolnego otrzymanego UTXO.
- **Metamonety (Metacoins)** – ideą stojącą za metamonetą jest posiadanie protokołu, który żyje na szczycie Bitcoina, wykorzystując transakcje Bitcoina do przechowywania transakcji metamonety, ale posiadając inną funkcję przejścia stanu, `APPLY'`. Ponieważ protokół metamonety nie może zapobiec pojawianiu się nieważnych transakcji metamonety w blockchainie Bitcoina, dodano regułę, że jeśli `APPLY'(S,TX)` zwróci błąd, protokół domyślnie przyjmuje `APPLY'(S,TX) = S`. Zapewnia to łatwy mechanizm tworzenia dowolnego protokołu kryptowaluty, potencjalnie z zaawansowanymi funkcjami, których nie można zaimplementować w samym Bitcoinie, ale przy bardzo niskich kosztach rozwoju, ponieważ złożoność kopania i sieci jest już obsługiwana przez protokół Bitcoina. Metamonety zostały wykorzystane do zaimplementowania niektórych klas kontraktów finansowych, rejestracji nazw i zdecentralizowanej giełdy.

Zatem ogólnie rzecz biorąc, istnieją dwa podejścia do budowy protokołu konsensusu: budowa niezależnej sieci i budowa protokołu na szczycie Bitcoina. To pierwsze podejście, choć w miarę udane w przypadku aplikacji takich jak Namecoin, jest trudne do zaimplementowania; każda indywidualna implementacja musi uruchomić niezależny blockchain, a także zbudować i przetestować cały niezbędny kod przejścia stanu i sieci. Dodatkowo przewidujemy, że zestaw zastosowań dla technologii zdecentralizowanego konsensusu będzie podążał za rozkładem potęgowym, w którym zdecydowana większość aplikacji byłaby zbyt mała, aby uzasadnić własny blockchain, i zauważamy, że istnieją duże klasy zdecentralizowanych aplikacji (dapp), w szczególności zdecentralizowanych organizacji autonomicznych, które muszą ze sobą współpracować.

Z drugiej strony podejście oparte na Bitcoinie ma tę wadę, że nie dziedziczy funkcji uproszczonej weryfikacji płatności Bitcoina. SPV działa dla Bitcoina, ponieważ może używać głębokości blockchaina jako wskaźnika ważności; w pewnym momencie, gdy przodkowie transakcji sięgają wystarczająco daleko w przeszłość, można śmiało powiedzieć, że byli oni prawowitą częścią stanu. Z kolei metaprotokoły oparte na blockchainie nie mogą wymusić na blockchainie, aby nie uwzględniał transakcji, które nie są ważne w kontekście ich własnych protokołów. Stąd w pełni bezpieczna implementacja metaprotokołu SPV musiałaby skanować wstecz aż do początku blockchaina Bitcoina, aby określić, czy pewne transakcje są ważne, czy nie. Obecnie wszystkie „lekkie” implementacje metaprotokołów opartych na Bitcoinie opierają się na zaufanym serwerze w celu dostarczenia danych, co jest prawdopodobnie wysoce nieoptymalnym wynikiem, zwłaszcza gdy jednym z głównych celów kryptowaluty jest wyeliminowanie potrzeby zaufania.

### Skryptowanie {#scripting}

Nawet bez żadnych rozszerzeń protokół Bitcoina w rzeczywistości ułatwia słabą wersję koncepcji „inteligentnych kontraktów”. UTXO w Bitcoinie mogą być własnością nie tylko klucza publicznego, ale także bardziej skomplikowanego skryptu wyrażonego w prostym języku programowania opartym na stosie. W tym paradygmacie transakcja wydająca to UTXO musi dostarczyć dane, które spełniają warunki skryptu. Rzeczywiście, nawet podstawowy mechanizm własności klucza publicznego jest zaimplementowany za pomocą skryptu: skrypt przyjmuje podpis na krzywej eliptycznej jako wejście, weryfikuje go względem transakcji i adresu, który jest właścicielem UTXO, i zwraca 1, jeśli weryfikacja się powiedzie, a 0 w przeciwnym razie. Istnieją inne, bardziej skomplikowane skrypty dla różnych dodatkowych przypadków użycia. Na przykład można skonstruować skrypt, który do walidacji wymaga podpisów z dwóch z trzech podanych kluczy prywatnych („multisig”), co jest konfiguracją przydatną dla kont firmowych, bezpiecznych kont oszczędnościowych i niektórych sytuacji depozytowych (escrow) sprzedawców. Skrypty mogą być również używane do wypłacania nagród za rozwiązania problemów obliczeniowych, a można nawet skonstruować skrypt, który mówi coś w stylu „to UTXO Bitcoina jest twoje, jeśli możesz dostarczyć dowód SPV, że wysłałeś mi transakcję Dogecoin o tym nominale”, co w zasadzie pozwala na zdecentralizowaną wymianę między kryptowalutami.

Jednak język skryptowy zaimplementowany w Bitcoinie ma kilka ważnych ograniczeń:

- **Brak kompletności Turinga** – to znaczy, chociaż istnieje duży podzbiór obliczeń, które obsługuje język skryptowy Bitcoina, to nie obsługuje on prawie wszystkiego. Główną kategorią, której brakuje, są pętle. Zrobiono to, aby uniknąć nieskończonych pętli podczas weryfikacji transakcji; teoretycznie jest to przeszkoda do pokonania dla programistów skryptów, ponieważ każdą pętlę można zasymulować, po prostu powtarzając podstawowy kod wiele razy za pomocą instrukcji if, ale prowadzi to do skryptów, które są bardzo nieefektywne pod względem zajmowanego miejsca. Na przykład zaimplementowanie alternatywnego algorytmu podpisu na krzywej eliptycznej prawdopodobnie wymagałoby 256 powtarzających się rund mnożenia, z których każda byłaby indywidualnie uwzględniona w kodzie.
- **Ślepota na wartość (Value-blindness)** – nie ma sposobu, aby skrypt UTXO zapewniał szczegółową kontrolę nad kwotą, którą można wypłacić. Na przykład jednym z potężnych przypadków użycia kontraktu wyroczni byłby kontrakt zabezpieczający (hedging), w którym A i B wpłacają BTC o wartości 1000 USD, a po 30 dniach skrypt wysyła BTC o wartości 1000 USD do A, a resztę do B. Wymagałoby to wyroczni do określenia wartości 1 BTC w USD, ale nawet wtedy jest to ogromna poprawa pod względem zaufania i wymagań infrastrukturalnych w stosunku do w pełni scentralizowanych rozwiązań, które są obecnie dostępne. Jednak ponieważ UTXO działają na zasadzie „wszystko albo nic”, jedynym sposobem na osiągnięcie tego jest bardzo nieefektywne obejście polegające na posiadaniu wielu UTXO o różnych nominałach (np. jedno UTXO o wartości 2<sup>k</sup> dla każdego k aż do 30) i zleceniu wyroczni wyboru, które UTXO wysłać do A, a które do B.
- **Brak stanu** – UTXO mogą być wydane lub niewydane; nie ma możliwości tworzenia wieloetapowych kontraktów ani skryptów, które utrzymywałyby jakikolwiek inny stan wewnętrzny poza tym. Utrudnia to tworzenie wieloetapowych kontraktów opcyjnych, zdecentralizowanych ofert wymiany lub dwuetapowych protokołów zobowiązań kryptograficznych (niezbędnych do bezpiecznych nagród obliczeniowych). Oznacza to również, że UTXO mogą być używane tylko do budowania prostych, jednorazowych kontraktów, a nie bardziej złożonych kontraktów „stanowych”, takich jak zdecentralizowane organizacje, i utrudnia implementację metaprotokołów. Stan binarny w połączeniu ze ślepotą na wartość oznacza również, że inna ważna aplikacja, limity wypłat, jest niemożliwa.
- **Ślepota na blockchain (Blockchain-blindness)** – UTXO są ślepe na dane blockchaina, takie jak nonce, znacznik czasu i hash poprzedniego bloku. Poważnie ogranicza to zastosowania w hazardzie i kilku innych kategoriach, pozbawiając język skryptowy potencjalnie cennego źródła losowości.

Zatem widzimy trzy podejścia do budowania zaawansowanych aplikacji na szczycie kryptowaluty: budowa nowego blockchaina, użycie skryptowania na szczycie Bitcoina i budowa metaprotokołu na szczycie Bitcoina. Budowa nowego blockchaina pozwala na nieograniczoną swobodę w budowaniu zestawu funkcji, ale kosztem czasu rozwoju, wysiłku związanego z uruchomieniem (bootstrapping) i bezpieczeństwa. Użycie skryptowania jest łatwe do zaimplementowania i ustandaryzowania, ale jest bardzo ograniczone w swoich możliwościach, a metaprotokoły, choć łatwe, cierpią na wady w skalowalności. Dzięki Ethereum zamierzamy zbudować alternatywne ramy, które zapewniają jeszcze większe korzyści w zakresie łatwości rozwoju, a także jeszcze silniejsze właściwości lekkiego klienta, jednocześnie pozwalając aplikacjom na współdzielenie środowiska gospodarczego i bezpieczeństwa blockchaina.

## Ethereum {#ethereum}

Intencją Ethereum jest stworzenie alternatywnego protokołu do budowania zdecentralizowanych aplikacji (dapp), zapewniającego inny zestaw kompromisów, który naszym zdaniem będzie bardzo przydatny dla dużej klasy zdecentralizowanych aplikacji, ze szczególnym naciskiem na sytuacje, w których ważny jest krótki czas programowania, bezpieczeństwo małych i rzadko używanych aplikacji oraz zdolność różnych aplikacji do bardzo wydajnej interakcji. Ethereum robi to poprzez zbudowanie czegoś, co w zasadzie jest ostateczną abstrakcyjną warstwą fundamentalną: blockchaina z wbudowanym kompletnym w sensie Turinga językiem programowania, pozwalającym każdemu pisać inteligentne kontrakty i zdecentralizowane aplikacje, w których mogą tworzyć własne, dowolne zasady własności, formaty transakcji i funkcje przejścia stanu. Podstawową wersję Namecoin można napisać w dwóch linijkach kodu, a inne protokoły, takie jak waluty i systemy reputacji, można zbudować w mniej niż dwudziestu. Inteligentne kontrakty, kryptograficzne „pudełka”, które zawierają wartość i odblokowują ją tylko po spełnieniu określonych warunków, mogą być również budowane na tej platformie, z o wiele większą mocą niż ta oferowana przez skrypty Bitcoin ze względu na dodatkowe możliwości kompletności Turinga, świadomości wartości, świadomości blockchaina i stanu.

### Konta Ethereum {#ethereum-accounts}

W Ethereum stan składa się z obiektów zwanych „kontami”, przy czym każde konto ma 20-bajtowy adres, a przejścia stanu są bezpośrednimi transferami wartości i informacji między kontami. Konto Ethereum zawiera cztery pola:

- **nonce**, licznik używany do upewnienia się, że każda transakcja może zostać przetworzona tylko raz
- Aktualne **saldo etheru** konta
- **Kod kontraktu** konta, jeśli jest obecny
- **Pamięć** konta (domyślnie pusta)

„Ether” jest głównym wewnętrznym krypto-paliwem Ethereum i służy do uiszczania opłat transakcyjnych. Ogólnie rzecz biorąc, istnieją dwa rodzaje kont: **konta posiadane zewnętrznie**, kontrolowane przez klucze prywatne, oraz **konta kontraktów**, kontrolowane przez ich kod kontraktu. Konto posiadane zewnętrznie nie ma kodu, a wiadomości z takiego konta można wysyłać poprzez utworzenie i podpisanie transakcji; w przypadku konta kontraktu, za każdym razem, gdy konto kontraktu otrzyma wiadomość, jego kod się aktywuje, pozwalając mu na odczyt i zapis w pamięci wewnętrznej oraz wysyłanie innych wiadomości lub tworzenie kolejnych kontraktów.

Należy zauważyć, że „kontrakty” w Ethereum nie powinny być postrzegane jako coś, co należy „wypełnić” lub „przestrzegać”; są one raczej jak „autonomiczni agenci”, którzy żyją wewnątrz środowiska wykonawczego Ethereum, zawsze wykonując określony fragment kodu, gdy zostaną „zaczepieni” przez wiadomość lub transakcję, i mając bezpośrednią kontrolę nad własnym saldem etheru oraz własnym magazynem klucz/wartość do śledzenia trwałych zmiennych.

### Wiadomości i transakcje {#messages-and-transactions}

Termin „transakcja” jest używany w Ethereum w odniesieniu do podpisanego pakietu danych, który przechowuje wiadomość do wysłania z konta posiadanego zewnętrznie. Transakcje zawierają:

- Odbiorcę wiadomości
- Podpis identyfikujący nadawcę
- Ilość etheru do przetransferowania od nadawcy do odbiorcy
- Opcjonalne pole danych
- Wartość `STARTGAS`, reprezentującą maksymalną liczbę kroków obliczeniowych, na które pozwala wykonanie transakcji
- Wartość `GASPRICE`, reprezentującą opłatę, którą nadawca płaci za każdy krok obliczeniowy

Pierwsze trzy to standardowe pola oczekiwane w każdej kryptowalucie. Pole danych domyślnie nie ma żadnej funkcji, ale maszyna wirtualna posiada kod operacji, za pomocą którego kontrakt może uzyskać dostęp do danych; jako przykładowy przypadek użycia, jeśli kontrakt funkcjonuje jako usługa rejestracji domen na blockchainie, może chcieć zinterpretować przekazywane mu dane jako zawierające dwa „pola”, z których pierwsze to domena do zarejestrowania, a drugie to adres IP, do którego ma zostać przypisana. Kontrakt odczytałby te wartości z danych wiadomości i odpowiednio umieścił je w pamięci.

Pola `STARTGAS` i `GASPRICE` są kluczowe dla modelu Ethereum zapobiegającego atakom typu odmowa usługi (DoS). Aby zapobiec przypadkowym lub wrogim nieskończonym pętlom lub innym stratom obliczeniowym w kodzie, każda transakcja musi określać limit liczby kroków obliczeniowych wykonania kodu, z których może skorzystać. Podstawową jednostką obliczeniową jest „gaz”; zazwyczaj krok obliczeniowy kosztuje 1 gaz, ale niektóre operacje kosztują większe ilości gazu, ponieważ są bardziej kosztowne obliczeniowo lub zwiększają ilość danych, które muszą być przechowywane jako część stanu. Istnieje również opłata w wysokości 5 jednostek gazu za każdy bajt w danych transakcji. Intencją systemu opłat jest wymaganie od atakującego proporcjonalnej zapłaty za każdy zasób, który zużywa, w tym obliczenia, przepustowość i pamięć; stąd każda transakcja, która prowadzi do zużycia przez sieć większej ilości któregokolwiek z tych zasobów, musi mieć opłatę za gaz w przybliżeniu proporcjonalną do tego przyrostu.

### Wiadomości {#messages}

Kontrakty mają możliwość wysyłania „wiadomości” do innych kontraktów. Wiadomości to wirtualne obiekty, które nigdy nie są serializowane i istnieją tylko w środowisku wykonawczym Ethereum. Wiadomość zawiera:

- Nadawcę wiadomości (niejawnie)
- Odbiorcę wiadomości
- Ilość etheru do przetransferowania wraz z wiadomością
- Opcjonalne pole danych
- Wartość `STARTGAS`

Zasadniczo wiadomość jest jak transakcja, z tą różnicą, że jest tworzona przez kontrakt, a nie przez zewnętrznego aktora. Wiadomość jest tworzona, gdy kontrakt aktualnie wykonujący kod wykonuje kod operacji `CALL`, który tworzy i wykonuje wiadomość. Podobnie jak transakcja, wiadomość prowadzi do uruchomienia kodu przez konto odbiorcy. W ten sposób kontrakty mogą mieć relacje z innymi kontraktami w dokładnie taki sam sposób, jak aktorzy zewnętrzni.

Należy zauważyć, że limit gazu przypisany przez transakcję lub kontrakt dotyczy całkowitego gazu zużytego przez tę transakcję i wszystkie podwykonania. Na przykład, jeśli zewnętrzny aktor A wyśle transakcję do B z 1000 jednostek gazu, a B zużyje 600 jednostek gazu przed wysłaniem wiadomości do C, a wewnętrzne wykonanie C zużyje 300 jednostek gazu przed powrotem, to B może wydać kolejne 100 jednostek gazu, zanim zabraknie mu gazu.

### Funkcja przejścia stanu Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Funkcję przejścia stanu Ethereum, `APPLY(S,TX) -> S'`, można zdefiniować w następujący sposób:

1. Sprawdź, czy transakcja jest poprawnie sformułowana (tj. ma odpowiednią liczbę wartości), podpis jest ważny, a nonce pasuje do nonce na koncie nadawcy. Jeśli nie, zwróć błąd.
2. Oblicz opłatę transakcyjną jako `STARTGAS * GASPRICE` i określ adres wysyłający na podstawie podpisu. Odejmij opłatę od salda konta nadawcy i zwiększ nonce nadawcy. Jeśli saldo jest niewystarczające do wydania, zwróć błąd.
3. Zainicjuj `GAS = STARTGAS` i odejmij określoną ilość gazu za bajt, aby zapłacić za bajty w transakcji.
4. Przetransferuj wartość transakcji z konta nadawcy na konto odbiorcy. Jeśli konto odbiorcy jeszcze nie istnieje, utwórz je. Jeśli konto odbiorcy jest kontraktem, uruchom kod kontraktu do zakończenia lub do momentu, gdy podczas wykonywania zabraknie gazu.
5. Jeśli transfer wartości nie powiódł się, ponieważ nadawca nie miał wystarczających środków, lub podczas wykonywania kodu zabrakło gazu, wycofaj wszystkie zmiany stanu z wyjątkiem uiszczenia opłat i dodaj opłaty do konta górnika.
6. W przeciwnym razie zwróć nadawcy opłaty za cały pozostały gaz i wyślij górnikowi opłaty uiszczone za zużyty gaz.

Załóżmy na przykład, że kod kontraktu to:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Należy zauważyć, że w rzeczywistości kod kontraktu jest napisany w niskopoziomowym kodzie EVM; ten przykład został napisany w Serpent, jednym z naszych języków wysokiego poziomu, dla jasności i może zostać skompilowany do kodu EVM. Załóżmy, że pamięć kontraktu jest początkowo pusta, a transakcja jest wysyłana z wartością 10 etherów, 2000 jednostek gazu, ceną gazu 0,001 etheru i 64 bajtami danych, przy czym bajty 0-31 reprezentują liczbę `2`, a bajty 32-63 reprezentują ciąg znaków `CHARLIE`<sup>[fn3](#notes)</sup>. Proces dla funkcji przejścia stanu w tym przypadku wygląda następująco:

1. Sprawdź, czy transakcja jest ważna i poprawnie sformułowana.
2. Sprawdź, czy nadawca transakcji ma co najmniej 2000 \* 0,001 = 2 ethery. Jeśli tak, odejmij 2 ethery z konta nadawcy.
3. Zainicjuj gaz = 2000; zakładając, że transakcja ma długość 170 bajtów, a opłata za bajt wynosi 5, odejmij 850, tak aby pozostało 1150 jednostek gazu.
4. Odejmij kolejne 10 etherów z konta nadawcy i dodaj je do konta kontraktu.
5. Uruchom kod. W tym przypadku jest to proste: sprawdza, czy pamięć kontraktu pod indeksem `2` jest używana, zauważa, że nie jest, więc ustawia pamięć pod indeksem `2` na wartość `CHARLIE`. Załóżmy, że zajmuje to 187 jednostek gazu, więc pozostała ilość gazu to 1150 - 187 = 963
6. Dodaj 963 \* 0,001 = 0,963 etheru z powrotem do konta nadawcy i zwróć wynikowy stan.

Gdyby na końcu odbiorczym transakcji nie było kontraktu, całkowita opłata transakcyjna byłaby po prostu równa podanej wartości `GASPRICE` pomnożonej przez długość transakcji w bajtach, a dane wysłane wraz z transakcją byłyby nieistotne.

Należy zauważyć, że wiadomości działają równoważnie do transakcji pod względem wycofań: jeśli podczas wykonywania wiadomości zabraknie gazu, to wykonanie tej wiadomości i wszystkie inne wykonania wywołane przez to wykonanie zostaną wycofane, ale wykonania nadrzędne nie muszą zostać wycofane. Oznacza to, że dla kontraktu „bezpieczne” jest wywołanie innego kontraktu, ponieważ jeśli A wywołuje B z G gazu, to wykonanie A ma gwarancję utraty co najwyżej G gazu. Na koniec należy zauważyć, że istnieje kod operacji, `CREATE`, który tworzy kontrakt; mechanika jego wykonywania jest ogólnie podobna do `CALL`, z tym wyjątkiem, że wynik wykonania określa kod nowo utworzonego kontraktu.

### Wykonywanie kodu {#code-execution}

Kod w kontraktach Ethereum jest napisany w niskopoziomowym, opartym na stosie języku kodu bajtowego, określanym jako „kod maszyny wirtualnej Ethereum” lub „kod EVM”. Kod składa się z serii bajtów, gdzie każdy bajt reprezentuje operację. Ogólnie rzecz biorąc, wykonywanie kodu to nieskończona pętla, która polega na wielokrotnym wykonywaniu operacji przy bieżącym liczniku programu (który zaczyna się od zera), a następnie zwiększaniu licznika programu o jeden, aż do osiągnięcia końca kodu lub wykrycia błędu albo instrukcji `STOP` lub `RETURN`. Operacje mają dostęp do trzech rodzajów przestrzeni, w których można przechowywać dane:

- **Stos**, kontener typu LIFO (ostatnie weszło, pierwsze wyszło), na który można odkładać i z którego można pobierać wartości
- **Pamięć operacyjna** (memory), nieskończenie rozszerzalna tablica bajtów
- Długoterminowa **pamięć** (storage) kontraktu, magazyn klucz/wartość. W przeciwieństwie do stosu i pamięci operacyjnej, które resetują się po zakończeniu obliczeń, pamięć (storage) utrzymuje się długoterminowo.

Kod może również uzyskać dostęp do wartości, nadawcy i danych przychodzącej wiadomości, a także danych nagłówka bloku, a ponadto kod może zwrócić tablicę bajtów danych jako wynik.

Formalny model wykonywania kodu EVM jest zaskakująco prosty. Podczas gdy maszyna wirtualna Ethereum działa, jej pełny stan obliczeniowy można zdefiniować za pomocą krotki `(block_state, transaction, message, code, memory, stack, pc, gas)`, gdzie `block_state` jest stanem globalnym zawierającym wszystkie konta i obejmuje salda oraz pamięć. Na początku każdej rundy wykonywania bieżąca instrukcja jest znajdowana poprzez pobranie `pc`-tego bajtu z `code` (lub 0, jeśli `pc >= len(code)`), a każda instrukcja ma własną definicję pod względem tego, jak wpływa na krotkę. Na przykład `ADD` pobiera dwa elementy ze stosu i odkłada ich sumę, zmniejsza `gas` o 1 i zwiększa `pc` o 1, a `SSTORE` pobiera dwa górne elementy ze stosu i wstawia drugi element do pamięci kontraktu pod indeksem określonym przez pierwszy element. Chociaż istnieje wiele sposobów na optymalizację wykonywania maszyny wirtualnej Ethereum poprzez kompilację w locie (JIT), podstawową implementację Ethereum można wykonać w kilkuset linijkach kodu.

### Blockchain i kopanie {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Blockchain Ethereum jest pod wieloma względami podobny do blockchaina Bitcoin, chociaż ma pewne różnice. Główną różnicą między Ethereum a Bitcoinem w odniesieniu do architektury blockchaina jest to, że w przeciwieństwie do Bitcoina, bloki Ethereum zawierają kopię zarówno listy transakcji, jak i najnowszego stanu. Poza tym w bloku przechowywane są również dwie inne wartości: numer bloku i trudność. Podstawowy algorytm walidacji bloku w Ethereum jest następujący:

1. Sprawdź, czy poprzedni blok, do którego się odwołano, istnieje i jest ważny.
2. Sprawdź, czy znacznik czasu bloku jest większy niż znacznik czasu poprzedniego bloku, do którego się odwołano, i mniejszy niż 15 minut w przyszłość.
3. Sprawdź, czy numer bloku, trudność, korzeń transakcji (transaction root), korzeń wujka (uncle root) i limit gazu (różne niskopoziomowe koncepcje specyficzne dla Ethereum) są ważne.
4. Sprawdź, czy dowód pracy (PoW) w bloku jest ważny.
5. Niech `S[0]` będzie stanem na końcu poprzedniego bloku.
6. Niech `TX` będzie listą transakcji bloku, z `n` transakcjami. Dla wszystkich `i` w `0...n-1`, ustaw `S[i+1] = APPLY(S[i],TX[i])`. Jeśli jakakolwiek aplikacja zwróci błąd lub jeśli całkowity gaz zużyty w bloku do tego momentu przekroczy `GASLIMIT`, zwróć błąd.
7. Niech `S_FINAL` będzie `S[n]`, ale z dodaniem nagrody za blok wypłaconej górnikowi.
8. Sprawdź, czy korzeń drzewa Merklego stanu `S_FINAL` jest równy końcowemu korzeniowi stanu podanemu w nagłówku bloku. Jeśli tak, blok jest ważny; w przeciwnym razie jest nieważny.

Podejście to może wydawać się na pierwszy rzut oka wysoce nieefektywne, ponieważ wymaga przechowywania całego stanu z każdym blokiem, ale w rzeczywistości wydajność powinna być porównywalna z wydajnością Bitcoina. Powodem jest to, że stan jest przechowywany w strukturze drzewa, a po każdym bloku tylko niewielka część drzewa musi zostać zmieniona. Zatem ogólnie rzecz biorąc, między dwoma sąsiednimi blokami zdecydowana większość drzewa powinna być taka sama, a zatem dane mogą być przechowywane raz i odwoływane dwukrotnie za pomocą wskaźników (tj. hashy poddrzew). Do osiągnięcia tego celu używany jest specjalny rodzaj drzewa znany jako „drzewo Patricia”, w tym modyfikacja koncepcji drzewa Merklego, która pozwala na wydajne wstawianie i usuwanie węzłów, a nie tylko ich zmianę. Dodatkowo, ponieważ wszystkie informacje o stanie są częścią ostatniego bloku, nie ma potrzeby przechowywania całej historii blockchaina – strategii, która, gdyby mogła zostać zastosowana do Bitcoina, można by obliczyć, że zapewniłaby 5-20-krotną oszczędność miejsca.

Często zadawanym pytaniem jest to, „gdzie” wykonywany jest kod kontraktu pod względem fizycznego sprzętu. Odpowiedź na to jest prosta: proces wykonywania kodu kontraktu jest częścią definicji funkcji przejścia stanu, która jest częścią algorytmu walidacji bloku, więc jeśli transakcja zostanie dodana do bloku `B`, wykonanie kodu wywołane przez tę transakcję zostanie wykonane przez wszystkie węzły, teraz i w przyszłości, które pobiorą i zwalidują blok `B`.

## Aplikacje {#applications}

Ogólnie rzecz biorąc, istnieją trzy typy aplikacji działających na Ethereum. Pierwsza kategoria to aplikacje finansowe, zapewniające użytkownikom potężniejsze sposoby zarządzania i zawierania kontraktów przy użyciu ich pieniędzy. Obejmuje to subwaluty, finansowe instrumenty pochodne, kontrakty zabezpieczające, portfele oszczędnościowe, testamenty, a ostatecznie nawet niektóre klasy pełnoprawnych umów o pracę. Druga kategoria to aplikacje półfinansowe, w których w grę wchodzą pieniądze, ale istnieje również silny aspekt niefinansowy tego, co jest robione; doskonałym przykładem są samowykonujące się nagrody za rozwiązania problemów obliczeniowych. Wreszcie, istnieją aplikacje takie jak głosowanie online i zdecentralizowane zarządzanie, które w ogóle nie mają charakteru finansowego.

### Systemy tokenów {#token-systems}

Systemy tokenów na blockchainie mają wiele zastosowań, począwszy od subwalut reprezentujących aktywa takie jak USD lub złoto, po akcje firm, pojedyncze tokeny reprezentujące inteligentną własność, bezpieczne, niemożliwe do podrobienia kupony, a nawet systemy tokenów bez żadnych powiązań z konwencjonalną wartością, używane jako systemy punktowe do motywowania. Systemy tokenów są zaskakująco łatwe do wdrożenia w Ethereum. Kluczową kwestią do zrozumienia jest to, że każda waluta lub system tokenów to w gruncie rzeczy baza danych z jedną operacją: odejmij X jednostek od A i daj X jednostek B, z zastrzeżeniem, że (i) A miał co najmniej X jednostek przed transakcją i (2) transakcja została zatwierdzona przez A. Wszystko, co jest potrzebne do wdrożenia systemu tokenów, to zaimplementowanie tej logiki w kontrakcie.

Podstawowy kod do wdrożenia systemu tokenów w języku Serpent wygląda następująco:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Jest to w zasadzie dosłowna implementacja funkcji przejścia stanu „systemu bankowego” opisanej wcześniej w tym dokumencie. Należy dodać kilka dodatkowych wierszy kodu, aby zapewnić początkowy krok dystrybucji jednostek waluty w pierwszej kolejności oraz obsłużyć kilka innych przypadków brzegowych, a w idealnym przypadku dodano by funkcję pozwalającą innym kontraktom na zapytanie o saldo adresu. Ale to wszystko. Teoretycznie systemy tokenów oparte na Ethereum działające jako subwaluty mogą potencjalnie zawierać inną ważną funkcję, której brakuje metawalutom onchain opartym na Bitcoinie: możliwość uiszczania opłat transakcyjnych bezpośrednio w tej walucie. Sposób, w jaki zostałoby to zaimplementowane, polega na tym, że kontrakt utrzymywałby saldo etheru, z którego zwracałby nadawcy ether użyty do uiszczenia opłat, i uzupełniałby to saldo, zbierając wewnętrzne jednostki waluty pobierane w ramach opłat i odsprzedając je na stale trwającej aukcji. Użytkownicy musieliby zatem „aktywować” swoje konta za pomocą etheru, ale gdy ether już tam będzie, będzie można go ponownie wykorzystać, ponieważ kontrakt zwracałby go za każdym razem.

### Finansowe instrumenty pochodne i waluty o stabilnej wartości {#financial-derivatives-and-stable-value-currencies}

Finansowe instrumenty pochodne są najczęstszym zastosowaniem „inteligentnego kontraktu” i jednym z najprostszych do zaimplementowania w kodzie. Głównym wyzwaniem we wdrażaniu kontraktów finansowych jest to, że większość z nich wymaga odniesienia do zewnętrznego wskaźnika cen; na przykład bardzo pożądaną aplikacją jest inteligentny kontrakt, który zabezpiecza przed zmiennością etheru (lub innej kryptowaluty) w stosunku do dolara amerykańskiego, ale zrobienie tego wymaga, aby kontrakt wiedział, jaka jest wartość ETH/USD. Najprostszym sposobem na to jest kontrakt „strumienia danych” utrzymywany przez określoną stronę (np. NASDAQ), zaprojektowany tak, aby ta strona miała możliwość aktualizacji kontraktu w razie potrzeby, oraz zapewniający interfejs, który pozwala innym kontraktom wysłać wiadomość do tego kontraktu i otrzymać odpowiedź z ceną.

Biorąc pod uwagę ten kluczowy składnik, kontrakt zabezpieczający wyglądałby następująco:

1. Poczekaj, aż strona A wprowadzi 1000 etherów.
2. Poczekaj, aż strona B wprowadzi 1000 etherów.
3. Zapisz w pamięci wartość 1000 etherów w USD, obliczoną na podstawie zapytania do kontraktu strumienia danych, powiedzmy, że jest to $x.
4. Po 30 dniach pozwól A lub B na „reaktywację” kontraktu w celu wysłania etheru o wartości $x (obliczonej poprzez ponowne zapytanie kontraktu strumienia danych w celu uzyskania nowej ceny) do A, a reszty do B.

Taki kontrakt miałby znaczny potencjał w krypto-handlu. Jednym z głównych problemów wymienianych w kontekście kryptowalut jest fakt, że są one zmienne; chociaż wielu użytkowników i sprzedawców może chcieć bezpieczeństwa i wygody w obrocie aktywami kryptograficznymi, mogą oni nie chcieć stawiać czoła perspektywie utraty 23% wartości swoich środków w ciągu jednego dnia. Do tej pory najczęściej proponowanym rozwiązaniem były aktywa zabezpieczone przez emitenta; pomysł polega na tym, że emitent tworzy subwalutę, w której ma prawo do emisji i unieważniania jednostek, oraz dostarcza jedną jednostkę waluty każdemu, kto dostarczy mu (offline) jedną jednostkę określonego aktywa bazowego (np. złota, USD). Emitent następnie obiecuje dostarczyć jedną jednostkę aktywa bazowego każdemu, kto odeśle jedną jednostkę kryptoaktywa. Mechanizm ten pozwala na „podniesienie” dowolnego niekryptograficznego aktywa do rangi aktywa kryptograficznego, pod warunkiem, że emitentowi można zaufać.

W praktyce jednak emitenci nie zawsze są godni zaufania, a w niektórych przypadkach infrastruktura bankowa jest zbyt słaba lub zbyt wroga, aby takie usługi mogły istnieć. Finansowe instrumenty pochodne stanowią alternatywę. Tutaj, zamiast pojedynczego emitenta dostarczającego środki na zabezpieczenie aktywa, rolę tę odgrywa zdecentralizowany rynek spekulantów, obstawiających, że cena kryptograficznego aktywa referencyjnego (np. ETH) wzrośnie. W przeciwieństwie do emitentów, spekulanci nie mają możliwości niewywiązania się ze swojej części umowy, ponieważ kontrakt zabezpieczający przechowuje ich środki w depozycie. Należy zauważyć, że to podejście nie jest w pełni zdecentralizowane, ponieważ nadal potrzebne jest zaufane źródło do dostarczania wskaźnika cen, chociaż można argumentować, że nawet wtedy jest to ogromna poprawa pod względem zmniejszenia wymagań infrastrukturalnych (w przeciwieństwie do bycia emitentem, wydawanie strumienia cen nie wymaga licencji i prawdopodobnie może być sklasyfikowane jako wolność słowa) oraz zmniejszenia potencjału oszustw.

### Systemy tożsamości i reputacji {#identity-and-reputation-systems}

Najwcześniejsza alternatywna kryptowaluta ze wszystkich, [Namecoin](http://namecoin.org/), próbowała wykorzystać blockchain podobny do Bitcoina, aby zapewnić system rejestracji nazw, w którym użytkownicy mogą rejestrować swoje nazwy w publicznej bazie danych wraz z innymi danymi. Głównym przytaczanym przypadkiem użycia jest system [DNS](https://wikipedia.org/wiki/Domain_Name_System), mapujący nazwy domen takie jak „bitcoin.org” (lub, w przypadku Namecoina, „bitcoin.bit”) na adres IP. Inne przypadki użycia obejmują uwierzytelnianie poczty e-mail i potencjalnie bardziej zaawansowane systemy reputacji. Oto podstawowy kontrakt zapewniający system rejestracji nazw podobny do Namecoina na Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontrakt jest bardzo prosty; to tylko baza danych wewnątrz sieci Ethereum, do której można dodawać dane, ale nie można ich modyfikować ani usuwać. Każdy może zarejestrować nazwę z pewną wartością, a ta rejestracja pozostaje na zawsze. Bardziej wyrafinowany kontrakt rejestracji nazw będzie miał również „klauzulę funkcji” pozwalającą innym kontraktom na odpytywanie go, a także mechanizm dla „właściciela” (tj. pierwszego rejestrującego) nazwy do zmiany danych lub transferu własności. Można nawet dodać na wierzchu funkcjonalność reputacji i sieci zaufania (web-of-trust).

### Zdecentralizowane przechowywanie plików {#decentralized-file-storage}

W ciągu ostatnich kilku lat pojawiło się wiele popularnych startupów oferujących przechowywanie plików online, z których najbardziej znanym jest Dropbox, starających się umożliwić użytkownikom przesyłanie kopii zapasowych ich dysków twardych, a usłudze przechowywanie tych kopii i umożliwienie użytkownikowi dostępu do nich w zamian za miesięczną opłatę. Jednak w tym momencie rynek przechowywania plików jest czasami stosunkowo nieefektywny; pobieżne spojrzenie na różne istniejące rozwiązania pokazuje, że szczególnie na poziomie „doliny niesamowitości” 20-200 GB, na którym nie obowiązują ani darmowe limity, ani zniżki na poziomie korporacyjnym, miesięczne ceny za główne koszty przechowywania plików są takie, że płacisz więcej niż koszt całego dysku twardego w ciągu jednego miesiąca. Kontrakty Ethereum mogą pozwolić na rozwój zdecentralizowanego ekosystemu przechowywania plików, w którym poszczególni użytkownicy mogą zarabiać niewielkie kwoty pieniędzy, wynajmując własne dyski twarde, a niewykorzystana przestrzeń może zostać wykorzystana do dalszego obniżenia kosztów przechowywania plików.

Kluczowym elementem takiego rozwiązania byłoby to, co nazwaliśmy „zdecentralizowanym kontraktem Dropbox”. Ten kontrakt działa następująco. Najpierw dzieli się żądane dane na bloki, szyfrując każdy blok w celu zapewnienia prywatności, i buduje z nich drzewo Merklego. Następnie tworzy się kontrakt z regułą, że co N bloków kontrakt wybierałby losowy indeks w drzewie Merklego (używając poprzedniego hasha bloku, dostępnego z kodu kontraktu, jako źródła losowości) i dawałby X etherów pierwszemu podmiotowi, który dostarczy transakcję z dowodem własności bloku pod tym konkretnym indeksem w drzewie, podobnym do uproszczonej weryfikacji płatności. Gdy użytkownik chce ponownie pobrać swój plik, może użyć protokołu kanału mikropłatności (np. zapłacić 1 szabo za 32 kilobajty), aby odzyskać plik; najbardziej efektywnym pod względem opłat podejściem jest to, aby płatnik nie publikował transakcji aż do samego końca, zamiast tego zastępując transakcję nieco bardziej lukratywną z tym samym nonce po każdych 32 kilobajtach.

Ważną cechą protokołu jest to, że chociaż może się wydawać, że ufa się wielu losowym węzłom, iż nie zdecydują się zapomnieć pliku, można zmniejszyć to ryzyko do niemal zera, dzieląc plik na wiele części za pomocą współdzielenia sekretu i obserwując kontrakty, aby upewnić się, że każda część nadal znajduje się w posiadaniu jakiegoś węzła. Jeśli kontrakt nadal wypłaca pieniądze, stanowi to kryptograficzny dowód, że ktoś tam nadal przechowuje plik.

### Zdecentralizowane organizacje autonomiczne {#decentralized-autonomous-organizations}

Ogólna koncepcja „zdecentralizowanej organizacji autonomicznej” to wirtualny podmiot, który ma określoną grupę członków lub udziałowców, którzy, być może większością 67%, mają prawo do wydawania środków podmiotu i modyfikowania jego kodu. Członkowie wspólnie decydowaliby o tym, jak organizacja powinna alokować swoje środki. Metody alokacji środków DAO mogłyby obejmować nagrody, pensje, a nawet bardziej egzotyczne mechanizmy, takie jak wewnętrzna waluta do nagradzania pracy. Zasadniczo replikuje to prawne ramy tradycyjnej firmy lub organizacji non-profit, ale wykorzystuje wyłącznie kryptograficzną technologię blockchain do egzekwowania prawa. Do tej pory wiele dyskusji wokół DAO dotyczyło „kapitalistycznego” modelu „zdecentralizowanej korporacji autonomicznej” (DAC) z udziałowcami otrzymującymi dywidendy i zbywalnymi akcjami; alternatywa, być może opisana jako „zdecentralizowana społeczność autonomiczna”, zakładałaby, że wszyscy członkowie mają równy udział w podejmowaniu decyzji i wymagałaby zgody 67% obecnych członków na dodanie lub usunięcie członka. Wymóg, aby jedna osoba mogła mieć tylko jedno członkostwo, musiałby być wtedy egzekwowany zbiorowo przez grupę.

Ogólny zarys tego, jak zakodować DAO, jest następujący. Najprostszy projekt to po prostu fragment samomodyfikującego się kodu, który zmienia się, jeśli dwie trzecie członków zgodzi się na zmianę. Chociaż kod jest teoretycznie niezmienny, można to łatwo obejść i uzyskać de facto zmienność, umieszczając fragmenty kodu w oddzielnych kontraktach i przechowując adresy kontraktów do wywołania w modyfikowalnej pamięci. W prostej implementacji takiego kontraktu DAO istniałyby trzy typy transakcji, rozróżniane na podstawie danych dostarczonych w transakcji:

- `[0,i,K,V]` aby zarejestrować propozycję z indeksem `i` w celu zmiany adresu pod indeksem pamięci `K` na wartość `V`
- `[1,i]` aby zarejestrować głos za propozycją `i`
- `[2,i]` aby sfinalizować propozycję `i`, jeśli oddano wystarczającą liczbę głosów

Kontrakt miałby następnie klauzule dla każdego z nich. Prowadziłby rejestr wszystkich otwartych zmian w pamięci, wraz z listą osób, które na nie głosowały. Miałby również listę wszystkich członków. Gdy jakakolwiek zmiana w pamięci uzyska głosy dwóch trzecich członków, transakcja finalizująca mogłaby wykonać zmianę. Bardziej wyrafinowany szkielet miałby również wbudowaną możliwość głosowania nad funkcjami takimi jak wysłanie transakcji, dodawanie członków i usuwanie członków, a nawet mógłby zapewniać delegowanie głosów w stylu [płynnej demokracji](https://wikipedia.org/wiki/Liquid_democracy) (tj. każdy może wyznaczyć kogoś do głosowania w jego imieniu, a przypisanie jest przechodnie, więc jeśli A wyznaczy B, a B wyznaczy C, to C decyduje o głosie A). Taki projekt pozwoliłby DAO na organiczny rozwój jako zdecentralizowanej społeczności, pozwalając ludziom ostatecznie delegować zadanie filtrowania tego, kto jest członkiem, specjalistom, chociaż w przeciwieństwie do „obecnego systemu” specjaliści mogą łatwo pojawiać się i znikać w czasie, gdy poszczególni członkowie społeczności zmieniają swoje sympatie.

Alternatywnym modelem jest zdecentralizowana korporacja, w której każde konto może mieć zero lub więcej akcji, a do podjęcia decyzji wymagane są dwie trzecie akcji. Kompletny szkielet obejmowałby funkcjonalność zarządzania aktywami, możliwość złożenia oferty kupna lub sprzedaży akcji oraz możliwość akceptowania ofert (najlepiej z mechanizmem dopasowywania zleceń wewnątrz kontraktu). Delegowanie istniałoby również w stylu płynnej demokracji, uogólniając koncepcję „zarządu”.

### Dalsze aplikacje {#further-applications}

**1. Portfele oszczędnościowe**. Załóżmy, że Alice chce zapewnić bezpieczeństwo swoim środkom, ale martwi się, że zgubi swój klucz prywatny lub ktoś go zhakuje. Wpłaca ether do kontraktu z Bobem, bankiem, w następujący sposób:

- Sama Alice może wypłacić maksymalnie 1% środków dziennie.
- Sam Bob może wypłacić maksymalnie 1% środków dziennie, ale Alice ma możliwość wykonania transakcji swoim kluczem, wyłączając tę możliwość.
- Alice i Bob razem mogą wypłacić wszystko.

Zazwyczaj 1% dziennie wystarcza Alice, a jeśli Alice chce wypłacić więcej, może skontaktować się z Bobem o pomoc. Jeśli klucz Alice zostanie zhakowany, biegnie do Boba, aby przenieść środki do nowego kontraktu. Jeśli zgubi klucz, Bob w końcu wyciągnie środki. Jeśli Bob okaże się złośliwy, może ona wyłączyć jego możliwość wypłaty.

**2. Ubezpieczenie upraw**. Można łatwo stworzyć kontrakt na finansowe instrumenty pochodne, ale używając strumienia danych o pogodzie zamiast jakiegokolwiek indeksu cen. Jeśli rolnik w stanie Iowa kupi instrument pochodny, który wypłaca środki odwrotnie proporcjonalnie do opadów w stanie Iowa, to w przypadku suszy rolnik automatycznie otrzyma pieniądze, a jeśli będzie wystarczająco dużo deszczu, rolnik będzie zadowolony, ponieważ jego uprawy będą dobrze rosły. Można to rozszerzyć ogólnie na ubezpieczenia od klęsk żywiołowych.

**3. Zdecentralizowany strumień danych**. W przypadku finansowych kontraktów na różnice kursowe może być faktycznie możliwe zdecentralizowanie strumienia danych za pośrednictwem protokołu o nazwie „[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)”. SchellingCoin w zasadzie działa następująco: N stron wprowadza do systemu wartość danej informacji (np. cenę ETH/USD), wartości są sortowane, a każdy między 25. a 75. percentylem otrzymuje jeden token jako nagrodę. Każdy ma motywację do udzielenia odpowiedzi, której udzielą wszyscy inni, a jedyną wartością, co do której duża liczba graczy może realistycznie się zgodzić, jest oczywista wartość domyślna: prawda. Tworzy to zdecentralizowany protokół, który teoretycznie może dostarczyć dowolną liczbę wartości, w tym cenę ETH/USD, temperaturę w Berlinie, a nawet wynik konkretnych trudnych obliczeń.

**4. Inteligentny depozyt multisig**. Bitcoin pozwala na kontrakty transakcyjne z wieloma podpisami (multisig), w których na przykład trzy z pięciu danych kluczy mogą wydać środki. Ethereum pozwala na większą szczegółowość; na przykład cztery z pięciu mogą wydać wszystko, trzy z pięciu mogą wydać do 10% dziennie, a dwa z pięciu mogą wydać do 0,5% dziennie. Dodatkowo, multisig w Ethereum jest asynchroniczny – dwie strony mogą zarejestrować swoje podpisy na blockchainie w różnym czasie, a ostatni podpis automatycznie wyśle transakcję.

**5. Przetwarzanie w chmurze**. Technologia EVM może być również wykorzystana do stworzenia weryfikowalnego środowiska obliczeniowego, pozwalającego użytkownikom prosić innych o przeprowadzenie obliczeń, a następnie opcjonalnie prosić o dowody, że obliczenia w pewnych losowo wybranych punktach kontrolnych zostały wykonane poprawnie. Pozwala to na stworzenie rynku przetwarzania w chmurze, w którym każdy użytkownik może uczestniczyć ze swoim komputerem stacjonarnym, laptopem lub wyspecjalizowanym serwerem, a wyrywkowe kontrole wraz z kaucjami zabezpieczającymi mogą być wykorzystane do zapewnienia, że system jest godny zaufania (tj. węzły nie mogą z zyskiem oszukiwać). Chociaż taki system może nie być odpowiedni do wszystkich zadań; na przykład zadania wymagające wysokiego poziomu komunikacji międzyprocesowej nie mogą być łatwo wykonane w dużej chmurze węzłów. Inne zadania są jednak znacznie łatwiejsze do zrównoleglenia; projekty takie jak SETI@home, folding@home i algorytmy genetyczne można łatwo zaimplementować na takiej platformie.

**6. Hazard peer-to-peer**. Dowolna liczba protokołów hazardowych peer-to-peer, takich jak [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) Franka Stajano i Richarda Claytona, może zostać zaimplementowana na blockchainie Ethereum. Najprostszym protokołem hazardowym jest w rzeczywistości po prostu kontrakt na różnice kursowe na następny hash bloku, a bardziej zaawansowane protokoły można budować na tej podstawie, tworząc usługi hazardowe z niemal zerowymi opłatami, które nie mają możliwości oszukiwania.

**7. Rynki predykcyjne**. Pod warunkiem istnienia wyroczni lub SchellingCoin, rynki predykcyjne są również łatwe do wdrożenia, a rynki predykcyjne wraz z SchellingCoin mogą okazać się pierwszym głównym zastosowaniem [futarchii](https://mason.gmu.edu/~rhanson/futarchy.html) jako protokołu zarządzania dla zdecentralizowanych organizacji.

**8. Zdecentralizowane rynki onchain**, wykorzystujące system tożsamości i reputacji jako bazę.

## Różne kwestie i obawy {#miscellanea-and-concerns}

### Zmodyfikowana implementacja GHOST {#modified-ghost-implementation}

Protokół „Greedy Heaviest Observed Subtree” (GHOST) to innowacja wprowadzona po raz pierwszy przez Yonatana Sompolinsky'ego i Aviva Zohara w [grudniu 2013 r.](https://eprint.iacr.org/2013/881.pdf) Motywacją stojącą za GHOST jest to, że blockchainy z krótkim czasem potwierdzenia cierpią obecnie na zmniejszone bezpieczeństwo z powodu wysokiego odsetka osieroconych bloków – ponieważ propagacja bloku w sieci zajmuje trochę czasu, jeśli górnik A wykopie blok, a następnie górnik B wykopie kolejny blok, zanim blok górnika A dotrze do B, blok górnika B zostanie zmarnowany i nie przyczyni się do bezpieczeństwa sieci. Co więcej, istnieje problem centralizacji: jeśli górnik A jest pulą wydobywczą posiadającą 30% mocy obliczeniowej, a B ma 10% mocy obliczeniowej, A będzie narażony na ryzyko wyprodukowania osieroconego bloku w 70% przypadków (ponieważ w pozostałych 30% przypadków to A wyprodukował ostatni blok, więc natychmiast otrzyma dane do kopania), podczas gdy B będzie narażony na ryzyko wyprodukowania osieroconego bloku w 90% przypadków. Zatem, jeśli odstęp między blokami jest na tyle krótki, że odsetek osieroconych bloków jest wysoki, A będzie znacznie bardziej wydajny po prostu ze względu na swój rozmiar. Biorąc pod uwagę te dwa efekty łącznie, blockchainy, które szybko produkują bloki, z dużym prawdopodobieństwem doprowadzą do sytuacji, w której jedna pula wydobywcza będzie miała wystarczająco duży procent mocy obliczeniowej sieci, aby sprawować de facto kontrolę nad procesem kopania.

Jak opisali Sompolinsky i Zohar, GHOST rozwiązuje pierwszy problem utraty bezpieczeństwa sieci poprzez uwzględnienie osieroconych bloków w obliczeniach, który łańcuch jest „najdłuższy”; to znaczy, nie tylko rodzic i dalsi przodkowie bloku, ale także osieroceni potomkowie przodka bloku (w żargonie Ethereum „wujkowie”) są dodawani do obliczeń, który blok ma za sobą największy całkowity dowód pracy (PoW). Aby rozwiązać drugi problem tendencji do centralizacji, wykraczamy poza protokół opisany przez Sompolinsky'ego i Zohara, a także zapewniamy nagrody za blok dla osieroconych bloków: osierocony blok otrzymuje 87,5% swojej podstawowej nagrody, a bratanek, który zawiera osierocony blok, otrzymuje pozostałe 12,5%. Opłaty transakcyjne nie są jednak przyznawane wujkom.

Ethereum implementuje uproszczoną wersję GHOST, która sięga tylko siedmiu poziomów w dół. Konkretnie, jest ona zdefiniowana w następujący sposób:

- Blok musi określać rodzica i musi określać 0 lub więcej wujków
- Wujek zawarty w bloku B musi mieć następujące właściwości:
  - Musi być bezpośrednim dzieckiem przodka k-tej generacji bloku B, gdzie `2 <= k <= 7`.
  - Nie może być przodkiem bloku B
  - Wujek musi być prawidłowym nagłówkiem bloku, ale nie musi być wcześniej zweryfikowanym ani nawet prawidłowym blokiem
  - Wujek musi różnić się od wszystkich wujków zawartych w poprzednich blokach i wszystkich innych wujków zawartych w tym samym bloku (brak podwójnego włączenia)
- Za każdego wujka U w bloku B, górnik bloku B otrzymuje dodatkowe 3,125% dodane do swojej nagrody coinbase, a górnik bloku U otrzymuje 93,75% standardowej nagrody coinbase.

Ta ograniczona wersja GHOST, z wujkami, których można włączyć tylko do 7 generacji, została użyta z dwóch powodów. Po pierwsze, nieograniczony GHOST wprowadziłby zbyt wiele komplikacji do obliczeń, którzy wujkowie dla danego bloku są prawidłowi. Po drugie, nieograniczony GHOST z rekompensatą, jak w Ethereum, usuwa zachętę dla górnika do kopania w głównym łańcuchu, a nie w łańcuchu publicznego atakującego.

### Opłaty {#fees}

Ponieważ każda transakcja opublikowana w blockchainie nakłada na sieć koszt związany z koniecznością jej pobrania i weryfikacji, istnieje potrzeba pewnego mechanizmu regulacyjnego, zazwyczaj obejmującego opłaty transakcyjne, aby zapobiec nadużyciom. Domyślne podejście, stosowane w sieci Bitcoin, polega na stosowaniu czysto dobrowolnych opłat, polegając na górnikach, którzy pełnią rolę strażników i ustalają dynamiczne minima. Podejście to zostało przyjęte bardzo przychylnie w społeczności Bitcoin, w szczególności dlatego, że opiera się na „zasadach rynkowych”, pozwalając podaży i popytowi między górnikami a nadawcami transakcji określić cenę. Problemem w tym toku rozumowania jest jednak to, że przetwarzanie transakcji nie jest rynkiem; chociaż intuicyjnie atrakcyjne jest interpretowanie przetwarzania transakcji jako usługi, którą górnik oferuje nadawcy, w rzeczywistości każda transakcja, którą górnik włączy, będzie musiała zostać przetworzona przez każdy węzeł w sieci, więc zdecydowana większość kosztów przetwarzania transakcji jest ponoszona przez strony trzecie, a nie przez górnika, który podejmuje decyzję o jej włączeniu. W związku z tym bardzo prawdopodobne jest wystąpienie problemów związanych z tragedią wspólnego pastwiska.

Jednak, jak się okazuje, ta wada mechanizmu rynkowego, przy przyjęciu pewnego niedokładnego założenia upraszczającego, w magiczny sposób znosi się sama. Argumentacja jest następująca. Załóżmy, że:

1. Transakcja prowadzi do `k` operacji, oferując nagrodę `kR` każdemu górnikowi, który ją włączy, gdzie `R` jest ustalane przez nadawcę, a `k` i `R` są (w przybliżeniu) widoczne dla górnika z wyprzedzeniem.
2. Operacja ma koszt przetwarzania wynoszący `C` dla dowolnego węzła (tj. wszystkie węzły mają równą wydajność)
3. Istnieje `N` węzłów wydobywczych, z których każdy ma dokładnie taką samą moc obliczeniową (tj. `1/N` całości)
4. Nie istnieją żadne pełne węzły, które nie zajmują się kopaniem.

Górnik byłby skłonny przetworzyć transakcję, jeśli oczekiwana nagroda jest większa niż koszt. Zatem oczekiwana nagroda wynosi `kR/N`, ponieważ górnik ma `1/N` szans na przetworzenie następnego bloku, a koszt przetwarzania dla górnika to po prostu `kC`. W związku z tym górnicy będą włączać transakcje, w których `kR/N > kC` lub `R > NC`. Należy zauważyć, że `R` to opłata za operację zapewniana przez nadawcę, a zatem stanowi dolną granicę korzyści, jaką nadawca czerpie z transakcji, a `NC` to koszt przetwarzania operacji dla całej sieci łącznie. W związku z tym górnicy mają zachętę do włączania tylko tych transakcji, dla których całkowita korzyść utylitarna przewyższa koszt.

Jednak w rzeczywistości istnieje kilka ważnych odstępstw od tych założeń:

1. Górnik płaci wyższy koszt za przetworzenie transakcji niż inne węzły weryfikujące, ponieważ dodatkowy czas weryfikacji opóźnia propagację bloku, a tym samym zwiększa szansę, że blok stanie się osierocony.
2. Istnieją pełne węzły, które nie zajmują się kopaniem.
3. Dystrybucja mocy wydobywczej może w praktyce okazać się radykalnie nierówna.
4. Spekulanci, wrogowie polityczni i szaleńcy, których funkcja użyteczności obejmuje wyrządzanie szkód w sieci, istnieją i mogą sprytnie konfigurować kontrakty, w których ich koszt jest znacznie niższy niż koszt ponoszony przez inne węzły weryfikujące.

(1) powoduje tendencję górnika do włączania mniejszej liczby transakcji, a
(2) zwiększa `NC`; stąd te dwa efekty przynajmniej częściowo się znoszą.<sup>[Jak?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) i (4) stanowią główny problem; aby go rozwiązać, po prostu wprowadzamy
płynny limit: żaden blok nie może mieć więcej operacji niż
`BLK_LIMIT_FACTOR` razy długoterminowa wykładnicza średnia krocząca.
Konkretnie:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` i `EMA_FACTOR` to stałe, które na razie zostaną ustawione na 65536 i 1,5, ale prawdopodobnie ulegną zmianie po dalszej analizie.

Istnieje jeszcze jeden czynnik zniechęcający do dużych rozmiarów bloków w sieci Bitcoin: duże bloki będą potrzebowały więcej czasu na propagację, a tym samym mają wyższe prawdopodobieństwo stania się osieroconymi. W Ethereum bloki zużywające dużo gazu mogą również wymagać więcej czasu na propagację, zarówno dlatego, że są fizycznie większe, jak i dlatego, że przetwarzanie przejść stanu transakcji w celu walidacji trwa dłużej. Ten czynnik zniechęcający w postaci opóźnienia jest istotną kwestią w sieci Bitcoin, ale w mniejszym stopniu w Ethereum ze względu na protokół GHOST; stąd poleganie na regulowanych limitach bloków zapewnia bardziej stabilną podstawę.

### Obliczenia i kompletność Turinga {#computation-and-turing-completeness}

Ważną uwagą jest to, że maszyna wirtualna Ethereum (EVM) jest kompletna w sensie Turinga; oznacza to, że kod EVM może zakodować dowolne obliczenia, które można sobie wyobrazić, w tym nieskończone pętle. Kod EVM umożliwia tworzenie pętli na dwa sposoby. Po pierwsze, istnieje instrukcja `JUMP`, która pozwala programowi przeskoczyć z powrotem do poprzedniego miejsca w kodzie, oraz instrukcja `JUMPI` do wykonywania skoków warunkowych, co pozwala na instrukcje takie jak `while x < 27: x = x * 2`. Po drugie, kontrakty mogą wywoływać inne kontrakty, potencjalnie pozwalając na zapętlanie poprzez rekurencję. To naturalnie prowadzi do problemu: czy złośliwi użytkownicy mogą w zasadzie wyłączyć górników i pełne węzły, zmuszając je do wejścia w nieskończoną pętlę? Kwestia ta pojawia się z powodu problemu w informatyce znanego jako problem stopu: w ogólnym przypadku nie ma sposobu, aby stwierdzić, czy dany program kiedykolwiek się zatrzyma.

Jak opisano w sekcji dotyczącej przejścia stanu, nasze rozwiązanie polega na wymaganiu od transakcji ustawienia maksymalnej liczby kroków obliczeniowych, które może ona wykonać, a jeśli wykonanie trwa dłużej, obliczenia są wycofywane, ale opłaty są nadal uiszczane. Wiadomości działają w ten sam sposób. Aby pokazać motywację stojącą za naszym rozwiązaniem, rozważmy następujące przykłady:

- Atakujący tworzy kontrakt, który uruchamia nieskończoną pętlę, a następnie wysyła transakcję aktywującą tę pętlę do górnika. Górnik przetworzy transakcję, uruchamiając nieskończoną pętlę i poczeka, aż zabraknie jej gazu. Mimo że podczas wykonywania brakuje gazu i zatrzymuje się ono w połowie, transakcja jest nadal ważna, a górnik nadal pobiera opłatę od atakującego za każdy krok obliczeniowy.
- Atakujący tworzy bardzo długą nieskończoną pętlę z zamiarem zmuszenia górnika do kontynuowania obliczeń przez tak długi czas, że do czasu ich zakończenia pojawi się kilka kolejnych bloków i górnik nie będzie mógł włączyć transakcji, aby odebrać opłatę. Jednak atakujący będzie musiał podać wartość dla `STARTGAS` ograniczającą liczbę kroków obliczeniowych, które może zająć wykonanie, więc górnik będzie wiedział z wyprzedzeniem, że obliczenia zajmą nadmiernie dużą liczbę kroków.
- Atakujący widzi kontrakt z kodem w postaci np. `send(A,contract.storage[A]); contract.storage[A] = 0` i wysyła transakcję z ilością gazu wystarczającą tylko do uruchomienia pierwszego kroku, ale nie drugiego (tj. dokonując wypłaty, ale nie pozwalając na spadek salda). Autor kontraktu nie musi się martwić o ochronę przed takimi atakami, ponieważ jeśli wykonanie zatrzyma się w połowie, zmiany zostaną wycofane.
- Kontrakt finansowy działa poprzez pobieranie mediany z dziewięciu zastrzeżonych strumieni cen w celu zminimalizowania ryzyka. Atakujący przejmuje jeden ze strumieni danych, który został zaprojektowany tak, aby można go było modyfikować za pomocą mechanizmu wywołania zmiennego adresu opisanego w sekcji o DAO, i konwertuje go do uruchomienia nieskończonej pętli, próbując w ten sposób wymusić, aby wszelkie próby roszczenia środków z kontraktu finansowego zakończyły się brakiem gazu. Jednak kontrakt finansowy może ustawić limit gazu dla wiadomości, aby zapobiec temu problemowi.

Alternatywą dla kompletności Turinga jest niekompletność Turinga, gdzie `JUMP` i `JUMPI` nie istnieją, a w stosie wywołań w danym momencie może istnieć tylko jedna kopia każdego kontraktu. W tym systemie opisany system opłat i niepewności wokół skuteczności naszego rozwiązania mogłyby nie być konieczne, ponieważ koszt wykonania kontraktu byłby ograniczony z góry przez jego rozmiar. Dodatkowo, niekompletność Turinga nie jest nawet tak dużym ograniczeniem; ze wszystkich przykładów kontraktów, które wymyśliliśmy wewnętrznie, do tej pory tylko jeden wymagał pętli, a nawet tę pętlę można było usunąć, wykonując 26 powtórzeń jednowierszowego fragmentu kodu. Biorąc pod uwagę poważne implikacje kompletności Turinga i ograniczone korzyści, dlaczego po prostu nie mieć języka niekompletnego w sensie Turinga? W rzeczywistości jednak niekompletność Turinga jest daleka od zgrabnego rozwiązania problemu. Aby zrozumieć dlaczego, rozważmy następujące kontrakty:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Teraz wyślij transakcję do A. W ten sposób w 51 transakcjach mamy kontrakt, który zajmuje 2<sup>50</sup> kroków obliczeniowych. Górnicy mogliby próbować wykryć takie bomby logiczne z wyprzedzeniem, utrzymując wartość obok każdego kontraktu określającą maksymalną liczbę kroków obliczeniowych, jakie może on wykonać, i obliczając to dla kontraktów wywołujących inne kontrakty rekurencyjnie, ale wymagałoby to od górników zakazania kontraktów, które tworzą inne kontrakty (ponieważ tworzenie i wykonywanie wszystkich 26 powyższych kontraktów można by łatwo zwinąć w jeden kontrakt). Kolejnym problematycznym punktem jest to, że pole adresu wiadomości jest zmienną, więc ogólnie rzecz biorąc, może nawet nie być możliwe określenie z wyprzedzeniem, które inne kontrakty wywoła dany kontrakt. Stąd, podsumowując, dochodzimy do zaskakującego wniosku: kompletność Turinga jest zaskakująco łatwa w zarządzaniu, a brak kompletności Turinga jest równie zaskakująco trudny w zarządzaniu, chyba że wdrożone są dokładnie te same mechanizmy kontrolne – ale w takim przypadku dlaczego po prostu nie pozwolić, aby protokół był kompletny w sensie Turinga?

### Waluta i emisja {#currency-and-issuance}

Sieć Ethereum zawiera własną wbudowaną walutę, ether, która służy podwójnemu celowi: zapewnieniu podstawowej warstwy płynności umożliwiającej wydajną wymianę między różnymi rodzajami aktywów cyfrowych oraz, co ważniejsze, zapewnieniu mechanizmu uiszczania opłat transakcyjnych. Dla wygody i uniknięcia przyszłych sporów (patrz obecna debata mBTC/uBTC/satoshi w sieci Bitcoin), nominały zostaną wstępnie nazwane:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Należy to traktować jako rozszerzoną wersję koncepcji „dolarów” i „centów” lub „BTC” i „satoshi”. W niedalekiej przyszłości spodziewamy się, że „ether” będzie używany do zwykłych transakcji, „finney” do mikrotransakcji, a „szabo” i „wei” do dyskusji technicznych na temat opłat i implementacji protokołu; pozostałe nominały mogą stać się przydatne później i nie powinny być na tym etapie uwzględniane w klientach.

Model emisji będzie następujący:

- Ether zostanie wyemitowany w ramach sprzedaży waluty po cenie 1000-2000 etherów za BTC, co jest mechanizmem mającym na celu sfinansowanie organizacji Ethereum i opłacenie rozwoju, który został z powodzeniem wykorzystany przez inne platformy, takie jak Mastercoin i NXT. Wcześniejsi nabywcy skorzystają z większych zniżek. BTC otrzymane ze sprzedaży zostaną w całości przeznaczone na wypłatę wynagrodzeń i nagród dla programistów oraz zainwestowane w różne projekty komercyjne i non-profit w ekosystemie Ethereum i kryptowalut.
- 0,099x całkowitej sprzedanej kwoty (60102216 ETH) zostanie przydzielone organizacji w celu zrekompensowania wczesnym współtwórcom i opłacenia wydatków denominowanych w ETH przed blokiem genezy.
- 0,099x całkowitej sprzedanej kwoty zostanie utrzymane jako długoterminowa rezerwa.
- 0,26x całkowitej sprzedanej kwoty będzie przydzielane górnikom rocznie na zawsze po tym momencie.

| Grupa | W momencie uruchomienia | Po 1 roku | Po 5 latach |
| ---------------------- | --------- | ------------ | ------------- |
| Jednostki waluty | 1,198X | 1,458X | 2,498X |
| Nabywcy | 83,5% | 68,6% | 40,0% |
| Rezerwa wydana przed sprzedażą | 8,26% | 6,79% | 3,96% |
| Rezerwa wykorzystana po sprzedaży | 8,26% | 6,79% | 3,96% |
| Górnicy | 0% | 17,8% | 52,0% |

#### Długoterminowa stopa wzrostu podaży (procent) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Pomimo liniowej emisji waluty, podobnie jak w przypadku sieci Bitcoin, z biegiem czasu stopa wzrostu podaży dąży jednak do zera._

Dwa główne wybory w powyższym modelu to (1) istnienie i wielkość puli kapitału żelaznego oraz (2) istnienie stale rosnącej podaży liniowej, w przeciwieństwie do ograniczonej podaży, jak w sieci Bitcoin. Uzasadnienie puli kapitału żelaznego jest następujące. Gdyby pula kapitału żelaznego nie istniała, a emisja liniowa została zmniejszona do 0,217x, aby zapewnić tę samą stopę inflacji, całkowita ilość etheru byłaby o 16,5% mniejsza, a zatem każda jednostka byłaby o 19,8% bardziej wartościowa. Stąd w stanie równowagi w sprzedaży zakupiono by o 19,8% więcej etheru, więc każda jednostka znów byłaby dokładnie tak samo wartościowa jak wcześniej. Organizacja miałaby wtedy również 1,198x więcej BTC, co można uznać za podzielone na dwie części: oryginalne BTC i dodatkowe 0,198x. Stąd sytuacja ta jest _dokładnie równoważna_ kapitałowi żelaznemu, ale z jedną ważną różnicą: organizacja posiada wyłącznie BTC, a zatem nie ma zachęty do wspierania wartości jednostki etheru.

Model stałego liniowego wzrostu podaży zmniejsza ryzyko tego, co niektórzy postrzegają jako nadmierną koncentrację bogactwa w sieci Bitcoin, i daje osobom żyjącym w obecnych i przyszłych epokach uczciwą szansę na nabycie jednostek waluty, przy jednoczesnym zachowaniu silnej zachęty do pozyskiwania i trzymania etheru, ponieważ „stopa wzrostu podaży” w ujęciu procentowym nadal dąży do zera w czasie. Teoretyzujemy również, że ponieważ monety są zawsze tracone z biegiem czasu z powodu nieostrożności, śmierci itp., a utratę monet można modelować jako procent całkowitej podaży rocznie, całkowita podaż waluty w obiegu w rzeczywistości ostatecznie ustabilizuje się na wartości równej rocznej emisji podzielonej przez wskaźnik utraty (np. przy wskaźniku utraty wynoszącym 1%, gdy podaż osiągnie 26X, wtedy 0,26X będzie kopane, a 0,26X tracone każdego roku, tworząc równowagę).

Należy zauważyć, że w przyszłości prawdopodobne jest, że Ethereum przejdzie na model dowodu stawki (PoS) w celu zapewnienia bezpieczeństwa, zmniejszając wymóg emisji do poziomu od zera do 0,05X rocznie. W przypadku, gdy organizacja Ethereum straci finansowanie lub z jakiegokolwiek innego powodu zniknie, pozostawiamy otwarty „kontrakt społeczny”: każdy ma prawo stworzyć przyszłą kandydującą wersję Ethereum, pod jedynym warunkiem, że ilość etheru musi być co najwyżej równa `60102216 * (1.198 + 0.26 * n)`, gdzie `n` to liczba lat po bloku genezy. Twórcy mogą swobodnie sprzedawać w ramach crowdsale lub w inny sposób przydzielać część lub całość różnicy między ekspansją podaży napędzaną przez PoS a maksymalną dopuszczalną ekspansją podaży, aby opłacić rozwój. Kandydujące aktualizacje, które nie są zgodne z kontraktem społecznym, mogą zostać w uzasadniony sposób rozwidlone do zgodnych wersji.

### Centralizacja kopania {#mining-centralization}

Algorytm kopania w sieci Bitcoin polega na tym, że górnicy obliczają SHA-256 na nieznacznie zmodyfikowanych wersjach nagłówka bloku miliony razy w kółko, aż w końcu jeden węzeł wymyśli wersję, której hash jest mniejszy niż cel (obecnie około 2<sup>192</sup>). Jednak ten algorytm kopania jest podatny na dwie formy centralizacji. Po pierwsze, ekosystem kopania został zdominowany przez układy ASIC (specjalizowane układy scalone), chipy komputerowe zaprojektowane do konkretnego zadania kopania Bitcoinów, a zatem tysiące razy bardziej wydajne w tym zadaniu. Oznacza to, że kopanie Bitcoinów nie jest już wysoce zdecentralizowanym i egalitarnym zajęciem, wymagającym milionów dolarów kapitału do skutecznego uczestnictwa. Po drugie, większość górników Bitcoin w rzeczywistości nie wykonuje walidacji bloku lokalnie; zamiast tego polegają na scentralizowanej puli wydobywczej, która dostarcza nagłówki bloków. Ten problem jest prawdopodobnie gorszy: w momencie pisania tego tekstu trzy największe pule wydobywcze pośrednio kontrolują około 50% mocy obliczeniowej w sieci Bitcoin, chociaż jest to łagodzone przez fakt, że górnicy mogą przełączyć się na inne pule wydobywcze, jeśli pula lub koalicja spróbuje przeprowadzić atak 51%.

Obecną intencją w Ethereum jest użycie algorytmu kopania, w którym górnicy są zobowiązani do pobierania losowych danych ze stanu, obliczania niektórych losowo wybranych transakcji z ostatnich N bloków w blockchainie i zwracania hasha wyniku. Ma to dwie ważne korzyści. Po pierwsze, kontrakty Ethereum mogą obejmować dowolny rodzaj obliczeń, więc układ ASIC dla Ethereum byłby w zasadzie układem ASIC do ogólnych obliczeń – tj. lepszym procesorem. Po drugie, kopanie wymaga dostępu do całego blockchaina, zmuszając górników do przechowywania całego blockchaina i przynajmniej bycia w stanie zweryfikować każdą transakcję. Usuwa to potrzebę scentralizowanych pul wydobywczych; chociaż pule wydobywcze mogą nadal pełnić uzasadnioną rolę wyrównywania losowości dystrybucji nagród, funkcja ta może być równie dobrze obsługiwana przez pule peer-to-peer bez centralnej kontroli.

Ten model jest niesprawdzony i po drodze mogą pojawić się trudności w uniknięciu pewnych sprytnych optymalizacji podczas korzystania z wykonywania kontraktów jako algorytmu kopania. Jednak jedną ze szczególnie interesujących cech tego algorytmu jest to, że pozwala każdemu „zatruć studnię”, wprowadzając do blockchaina dużą liczbę kontraktów specjalnie zaprojektowanych w celu utrudnienia działania niektórym układom ASIC. Istnieją zachęty ekonomiczne dla producentów układów ASIC, aby używali takiej sztuczki do atakowania się nawzajem. Zatem rozwiązanie, które opracowujemy, jest ostatecznie adaptacyjnym ekonomicznym rozwiązaniem ludzkim, a nie czysto technicznym.

### Skalowalność {#scalability}

Jedną z powszechnych obaw dotyczących Ethereum jest kwestia skalowalności. Podobnie jak Bitcoin, Ethereum cierpi na wadę polegającą na tym, że każda transakcja musi zostać przetworzona przez każdy węzeł w sieci. W przypadku sieci Bitcoin rozmiar obecnego blockchaina wynosi około 15 GB i rośnie o około 1 MB na godzinę. Gdyby sieć Bitcoin miała przetwarzać 2000 transakcji na sekundę, tak jak Visa, rosłaby o 1 MB na trzy sekundy (1 GB na godzinę, 8 TB rocznie). Ethereum prawdopodobnie doświadczy podobnego wzorca wzrostu, pogorszonego przez fakt, że na blockchainie Ethereum będzie wiele aplikacji, a nie tylko waluta, jak ma to miejsce w przypadku sieci Bitcoin, ale złagodzonego przez fakt, że pełne węzły Ethereum muszą przechowywać tylko stan, a nie całą historię blockchaina.

Problemem przy tak dużym rozmiarze blockchaina jest ryzyko centralizacji. Jeśli rozmiar blockchaina wzrośnie do, powiedzmy, 100 TB, prawdopodobnym scenariuszem byłoby to, że tylko bardzo mała liczba dużych firm uruchamiałaby pełne węzły, a wszyscy zwykli użytkownicy korzystaliby z lekkich węzłów SPV. W takiej sytuacji pojawia się potencjalna obawa, że pełne węzły mogłyby połączyć siły i wspólnie zgodzić się na oszukiwanie w jakiś opłacalny sposób (np. zmienić nagrodę za blok, przyznać sobie BTC). Lekkie węzły nie miałyby możliwości natychmiastowego wykrycia tego. Oczywiście prawdopodobnie istniałby co najmniej jeden uczciwy pełny węzeł, a po kilku godzinach informacje o oszustwie wyciekłyby przez kanały takie jak Reddit, ale w tym momencie byłoby już za późno: to zwykli użytkownicy musieliby zorganizować wysiłek w celu umieszczenia danych bloków na czarnej liście, co stanowiłoby ogromny i prawdopodobnie niewykonalny problem koordynacyjny na podobną skalę, jak przeprowadzenie udanego ataku 51%. W przypadku sieci Bitcoin jest to obecnie problem, ale istnieje modyfikacja blockchaina [zaproponowana przez Petera Todda](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/), która złagodzi ten problem.

W najbliższej perspektywie Ethereum zastosuje dwie dodatkowe strategie, aby poradzić sobie z tym problemem. Po pierwsze, ze względu na algorytmy kopania oparte na blockchainie, przynajmniej każdy górnik będzie zmuszony być pełnym węzłem, tworząc dolną granicę liczby pełnych węzłów. Po drugie i co ważniejsze, po przetworzeniu każdej transakcji włączymy do blockchaina pośredni korzeń drzewa stanu. Nawet jeśli walidacja bloku jest scentralizowana, dopóki istnieje jeden uczciwy węzeł weryfikujący, problem centralizacji można obejść za pomocą protokołu weryfikacji. Jeśli górnik opublikuje nieprawidłowy blok, blok ten musi być źle sformatowany lub stan `S[n]` jest nieprawidłowy. Ponieważ wiadomo, że `S[0]` jest prawidłowy, musi istnieć jakiś pierwszy stan `S[i]`, który jest nieprawidłowy, podczas gdy `S[i-1]` jest prawidłowy. Węzeł weryfikujący dostarczyłby indeks `i` wraz z „dowodem nieważności” składającym się z podzbioru węzłów drzewa Patricia potrzebnych do przetworzenia `APPLY(S[i-1],TX[i]) -> S[i]`. Węzły mogłyby użyć tych węzłów do uruchomienia tej części obliczeń i zobaczyć, że wygenerowany `S[i]` nie pasuje do dostarczonego `S[i]`.

Inny, bardziej wyrafinowany atak polegałby na publikowaniu przez złośliwych górników niekompletnych bloków, przez co pełne informacje nawet nie istnieją, aby określić, czy bloki są prawidłowe. Rozwiązaniem tego problemu jest protokół wyzwanie-odpowiedź: węzły weryfikujące wydają „wyzwania” w postaci docelowych indeksów transakcji, a po otrzymaniu węzła, lekki węzeł traktuje blok jako niezaufany, dopóki inny węzeł, czy to górnik, czy inny weryfikator, nie dostarczy podzbioru węzłów Patricia jako dowodu ważności.

## Podsumowanie {#conclusion}

Protokół Ethereum został pierwotnie pomyślany jako ulepszona wersja kryptowaluty, zapewniająca zaawansowane funkcje, takie jak usługi escrow na blockchainie, limity wypłat, kontrakty finansowe, rynki hazardowe i tym podobne, za pośrednictwem wysoce uniwersalnego języka programowania. Protokół Ethereum nie „obsługiwałby” żadnej z tych aplikacji bezpośrednio, ale istnienie kompletnego w sensie Turinga języka programowania oznacza, że teoretycznie można tworzyć dowolne kontrakty dla każdego typu transakcji lub aplikacji. Jednak tym, co jest bardziej interesujące w Ethereum, jest to, że protokół Ethereum wykracza daleko poza samą walutę. Protokoły dotyczące zdecentralizowanego przechowywania plików, zdecentralizowanych obliczeń i zdecentralizowanych rynków predykcyjnych, wśród dziesiątek innych tego typu koncepcji, mają potencjał do znacznego zwiększenia wydajności branży obliczeniowej i zapewnienia ogromnego impulsu dla innych protokołów peer-to-peer poprzez dodanie po raz pierwszy warstwy ekonomicznej. Wreszcie, istnieje również znaczna gama aplikacji, które nie mają w ogóle nic wspólnego z pieniędzmi.

Koncepcja dowolnej funkcji przejścia stanu, zaimplementowana przez protokół Ethereum, zapewnia platformę o unikalnym potencjale; zamiast być zamkniętym, jednocelowym protokołem przeznaczonym dla określonej gamy aplikacji w zakresie przechowywania danych, hazardu lub finansów, Ethereum jest z założenia otwarte i wierzymy, że doskonale nadaje się do pełnienia roli warstwy fundamentalnej dla bardzo dużej liczby zarówno finansowych, jak i niefinansowych protokołów w nadchodzących latach.

## Uwagi i dalsza lektura {#notes-and-further-reading}

### Uwagi {#notes}

1. Wnikliwy czytelnik może zauważyć, że w rzeczywistości adres Bitcoin to hash klucza publicznego krzywej eliptycznej, a nie sam klucz publiczny. Jednakże w terminologii kryptograficznej całkowicie uzasadnione jest nazywanie hasha klucza publicznego samym kluczem publicznym. Wynika to z faktu, że kryptografię Bitcoina można uznać za niestandardowy algorytm podpisu cyfrowego, w którym klucz publiczny składa się z hasha klucza publicznego ECC, podpis składa się z klucza publicznego ECC połączonego z podpisem ECC, a algorytm weryfikacji polega na sprawdzeniu klucza publicznego ECC w podpisie z hashem klucza publicznego ECC dostarczonym jako klucz publiczny, a następnie weryfikacji podpisu ECC za pomocą klucza publicznego ECC.
2. Technicznie rzecz biorąc, mediana z 11 poprzednich bloków.
3. Wewnętrznie, 2 i "CHARLIE" są liczbami, przy czym ta druga jest w reprezentacji o podstawie 256 w formacie big-endian. Liczby mogą wynosić co najmniej 0 i co najwyżej 2<sup>256</sup>-1.

### Dalsza lektura {#further-reading}

1. [Wartość wewnętrzna](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Inteligentna własność](https://en.bitcoin.it/wiki/Smart_Property)
3. [Inteligentne kontrakty](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](https://nakamotoinstitute.org/b-money/)
5. [Dowody pracy wielokrotnego użytku](https://nakamotoinstitute.org/finney/rpow/)
6. [Bezpieczne tytuły własności z uprawnieniami właściciela](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Biała księga Bitcoina](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Trójkąt Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Biała księga Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Biała księga Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Zdecentralizowane autonomiczne korporacje, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Uproszczona weryfikacja płatności](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Drzewa Merklego](https://wikipedia.org/wiki/Merkle_tree)
15. [Drzewa Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ i autonomiczni agenci, Jeff Garzik](https://garzikrants.blogspot.com/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn o inteligentnej własności na Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Drzewa Merkle Patricia w Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd o drzewach sum Merklego](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Historię białej księgi można znaleźć na [tej wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, podobnie jak wiele projektów oprogramowania open-source napędzanych przez społeczność, ewoluowało od czasu swojego powstania. Aby dowiedzieć się o najnowszych osiągnięciach Ethereum i o tym, jak wprowadzane są zmiany w protokole, polecamy [ten przewodnik](/learn/)._
