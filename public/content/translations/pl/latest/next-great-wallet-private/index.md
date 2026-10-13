---
title: "Kolejny wspaniały portfel będzie prywatny"
description: "Twój portfel widzi każdy adres, który posiadasz, każdą zdecentralizowaną aplikację (dapp), z którą się łączysz, i każde żądanie, które wysyłasz. Ta sama pozycja pozwala mu to wszystko chronić. Praktyczne spojrzenie na narzędzia prywatności, ustawienia domyślne i niewdrożone pomysły, które zdefiniują następną generację portfeli Ethereum."
author: "Elliott Alexander"
team: ""
tags:
  - "prywatność"
  - "portfele"
  - "dowody z wiedzą zerową"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Kolejny wspaniały portfel"
lang: pl
---

Zrób zrzut z dwóch minut, które spędzasz w swoim portfelu. Otwierasz aplikację, zerkasz na saldo, łączysz się ze zdecentralizowaną aplikacją (dapp), którą chciałeś wypróbować, zatwierdzasz transakcję, która pojawia się na ekranie, i wysyłasz znajomemu ETH, które jesteś mu winien za lunch.

Nic nie wskazuje na to, że jesteś obserwowany. Nikt nie pytał o Twoje imię. Zamykasz aplikację i wracasz do swoich zajęć.

Teraz policzmy, co tak naprawdę wyciekło. Przy uruchomieniu, zanim cokolwiek zrobiłeś, stos usług analitycznych poznał Twój adres IP i dowiedział się, że używasz tego portfela. Serwer, przez który Twój portfel odczytuje łańcuch, zobaczył każdy adres, który posiadasz, odpytany z jednego IP – całe Twoje portfolio, zgrabnie pogrupowane dla każdego, kto przechowuje logi. Zdecentralizowana aplikacja (dapp) otrzymała Twój aktywny adres, co wystarczy każdemu, aby sprawdzić całą jego historię. A płatność dla znajomego to trwały, publiczny zapis łączący Twój portfel z jego portfelem.

Każdy z tych wycieków przeszedł przez ten sam fragment oprogramowania. Portfel załadował analitykę, wybrał ten serwer, przekazał adres, zbudował transakcję. Ale ta sama pozycja działa w obie strony: warstwa, która widzi wszystko, jest również warstwą, która może wszystko chronić.

Wiele portfeli ma modele biznesowe oparte na gromadzeniu tych informacji, ale istnieją sposoby, aby to robić bez narażania użytkowników na ryzyko. Część tego, co jest do tego potrzebne, leży na półce, działa i jest ignorowana. Części z tego nikt jeszcze nie wymyślił. Obie te połowy stanowią szansę, a ten, kto się ich podejmie, zbuduje kolejny wspaniały portfel.

## Co Twój portfel zdradza onchain {#what-your-wallet-gives-away-onchain}

Zacznijmy onchain, od tego, co jest publiczne bez względu na to, jakiego portfela używasz. Adres nie nosi imienia, a ten jeden fakt daje duże poczucie komfortu. Ale każda płatność, którą otrzymałeś, każdy kontrakt, z którym miałeś do czynienia, wielkość Twojego salda w tym momencie i pełna lista wszystkich, z którymi kiedykolwiek przeprowadziłeś transakcję, są jawne i każdy może je sprawdzić. Pseudonimowość oznacza tylko tyle, że wszystko jest zapisane pod symbolem zastępczym zamiast Twojego imienia.

Standardową obroną jest rozłożenie swojej aktywności na kilka adresów, co robi większość doświadczonych użytkowników. Pomaga to jednak mniej, niż mogłoby się wydawać. Zasil dwa adresy z tego samego źródła lub pozwól im raz zapłacić sobie nawzajem, a dla każdego, kto przeprowadza analizę klastrów, połączą się one w jeden podmiot.

Jeszcze w 2020 roku [badanie](https://fc20.ifca.ai/preproceedings/31.pdf) pierwszych czterech lat istnienia Ethereum potrafiło już sklastrować 17,9% wszystkich aktywnych kont zewnętrznych, ujawniając ponad 340 000 podmiotów kontrolujących wiele adresów. To było sześć lat i jeden boom na sztuczną inteligencję temu. Twoja staranna separacja jest o kilka kroków od zniweczenia.

Prędzej czy później klaster zostaje powiązany z prawdziwą osobą. Zarejestruj nazwę ENS, która nawiązuje do Twojego pseudonimu w mediach społecznościowych, wypłać raz środki z giełdy, która przechowuje skan Twojego paszportu, lub otrzymaj płatność od kogoś, kto trzyma opisane adresy w arkuszu kalkulacyjnym, a klaster przestanie być abstrakcyjny.

Naruszenia danych również robią swoje – e-mail, który wyciekł wraz z adresem domowym, dopasowany do nazwy ENS, która wygląda jak ten e-mail. Nic z tego nie wymaga już wezwania do sądu ani specjalisty. Sztuczna inteligencja zmieniła przeszukiwanie milionów rekordów w poszukiwaniu jednego dobrego dopasowania w zadanie, które wykonuje się przez noc, a koszty stale spadają.

## Co Twój portfel zdradza, zanim dokonasz transakcji {#what-your-wallet-gives-away-before-you-transact}

Ślad onchain wymagał przynajmniej przeprowadzenia transakcji. Ten pozałańcuchowy zaczyna się wcześniej. Na początku 2026 roku pewien badacz [przepuścił trzynaście popularnych portfeli przez sniffer pakietów](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) na czystym urządzeniu i zarejestrował, co każdy z nich robił przy pierwszym uruchomieniu, zanim jeszcze istniało jakiekolwiek konto. Przeciętny portfel łączył się z około czternastoma domenami. Najgorszy skontaktował się z 26 domenami pod 41 adresami IP, w tym z wywołaniami infrastruktury salda do trzech oddzielnych dostawców, w przypadku użytkownika, który jeszcze nie utworzył portfela. Inny portfel w teście dostarczył usługę fingerprintingu urządzenia wraz z ośmioma subdomenami atrybucji marketingowej.

Wszystko to są zwykłe filary aplikacji konsumenckich – analityka, raportowanie awarii, atrybucja marketingowa – ale to nie jest Candy Crush, to aplikacja, której głównym założeniem jest samosuwerenność. Ten sam test wykazał [jeden portfel](https://cakewallet.com/), który nie wysłał absolutnie nic przy pierwszym uruchomieniu: zero pakietów, zero żądań DNS. Nic w portfelu nie wymaga takiego gadulstwa.

Jest też wyciek, który nigdy się nie zamyka. Twój portfel nie przechowuje kopii łańcucha; za każdym razem, gdy odczytuje saldo lub wysyła transakcję, pyta serwer zwany dostawcą RPC (Remote Procedure Call). O ile nie uruchomisz własnego węzła, każde żądanie przechodzi przez jednego z nich, a domyślny dostawca widzi Twoją pełną listę adresów, Twoje IP i czas wszystkiego, co robisz. Dopasowanie tego IP do nazwiska subskrybenta to rutynowe żądanie udostępnienia danych dla rządu.

Kiedy domyślny dostawca MetaMask [przyznał w 2022 roku](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash), że logował adresy IP wraz z adresami portfeli, ostra reakcja zmusiła go do [skrócenia czasu retencji do siedmiu dni](https://consensys.io/blog/consensys-data-retention-update). Należy oddać sprawiedliwość, ale to lekarstwo jest tylko polityką, a architektura pod spodem pozostaje niezmieniona: jeden serwer nadal odbiera każde Twoje żądanie. A taki log nie musi być wcale żądany, aby wyrządzić szkody; wystarczy, że istnieje. Bazy danych są naruszane, sprzedawane i po cichu łączone z innymi, a log, który sam w sobie nic nie znaczył, może zostać powiązany z Tobą lata po jego zapisaniu.

Rzeczą, na którą należy zwrócić uwagę w całej tej warstwie, jest to, że użytkownik nigdy jej nie widzi. Wysyłanie pieniędzy przynajmniej wyświetla ekran potwierdzenia; metadane nie mają ekranu. Nikt nie zatwierdza podróżowania swojej listy adresów wraz z adresem IP, a żaden monit o podpisywanie nie obejmuje analityki.

Te ustawienia domyślne pochodzą ze standardowego podręcznika aplikacji konsumenckich – solidna infrastruktura, przydatne raporty o awariach, wskaźniki wzrostu – zastosowane bez większego namysłu do aplikacji, która przechowuje pieniądze ludzi. Co jest budujące: każdy wyciek wspomniany w tej sekcji sprowadza się do decyzji, którą może podjąć budowniczy portfela.

## Kto patrzy {#whos-looking}

Zacznijmy od gapiów, których najmniej byś chciał. Przestępcy zorientowali się, że publiczna księga służy również jako katalog osób, których oszczędności można odebrać siłą. Ataki z użyciem klucza francuskiego (ang. wrench attacks) – napady, w których klucz jest wydobywany za pomocą przemocy lub groźby jej użycia – [wzrosły o 75% w 2025 roku](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), a ofiary straciły około [101 milionów dolarów tylko w pierwszych czterech miesiącach 2026 roku](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). Wzorzec przesunął się w kierunku tego, co śledczy nazywają celowaniem opartym na danych, gdzie atakujący profilują zasoby ofiary onchain, zanim w ogóle zapukają do drzwi. W ponad połowie ostatnich incydentów dotarli do współmałżonka, dziecka lub rodzica jako karty przetargowej. Saldo portfela, które prowadzi prosto do Twoich drzwi wejściowych, to stałe zaproszenie dla przestępców.

Są też gapie z odznakami. Przejrzysta księga to system nadzoru, którego żaden rząd nie musi budować: kompletny zapis tego, kto komu zapłacił, kiedy i ile, dostępny publicznie, na wyciągnięcie ręki bez wezwania do sądu. To, jak bardzo powinno Cię to martwić, zależy od tego, kto Tobą rządzi, a dla milionów ludzi odpowiedzią jest rząd, który karze za darowiznę na rzecz partii opozycyjnej, subskrypcję VPN lub oszczędności trzymane w walucie, której państwo nie może wydrukować.

Dla tych użytkowników ekspozycja finansowa jest modelem zagrożenia, a domyślne ustawienia portfela decydują o tym, jak bardzo są narażeni.

Oba rodzaje gapiów otrzymują to samo ulepszenie. Sztuczna inteligencja sprawia, że obserwowanie z każdym rokiem staje się tańsze, a wszystko, co kiedykolwiek zapisano w łańcuchu, pozostaje zapisane, dostępne dla każdej nowej techniki analizy, która nadejdzie. Nic z tego nie jest oskarżeniem publicznej księgi; przejrzystość jest tym, co pozwala każdemu zweryfikować łańcuch. Ekspozycja żyje w śladzie łączącym zapis z Tobą – wzorcach finansowania, ponownie używanych adresach, logach serwera.

Portfele jak dotąd pozostawiały ten ślad, ponieważ jego pozostawienie jest linią najmniejszego oporu, zarówno dla oprogramowania, jak i dla użytkownika. Jest to również dokładnie to, co portfel jest w stanie zniwelować.

## Dlaczego to w portfelu naprawia się prywatność {#why-the-wallet-is-where-privacy-gets-fixed}

Słusznie można zapytać, dlaczego to wszystko jest zadaniem portfela. Trwają [aktywne poszukiwania w kierunku prywatności](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) w warstwie bazowej Ethereum, a protokół może ostatecznie udźwignąć część tego ciężaru. Ale łańcuch aktualizuje się poprzez twarde rozwidlenia, w najlepszym razie dwa razy w roku, a zmiany istotne dla prywatności rozłożą się na kilka z nich. To oś czasu mierzona w latach i decydowana przez proces, którego nie należy przyspieszać.

Tymczasem poszczególne osoby decydują właśnie teraz, czy bezpiecznie jest otrzymywać płatności onchain, przekazywać darowizny, trzymać tam oszczędności. Potrzebują prywatności, która nadejdzie szybciej, niż może to zapewnić proces konsensusu społecznego Ethereum i harmonogram rozwidleń.

Warstwa aplikacji ma niewłaściwy kształt dla tego problemu. Nawet gdyby każda zdecentralizowana aplikacja (dapp) dostarczyła własną funkcję prywatności, każda mogłaby chronić tylko aktywność w swoich własnych ścianach, na swój własny sposób, z własnymi dziwactwami i sekretami, którymi użytkownik musiałby zarządzać. To, co Cię demaskuje, to połączenia biegnące przez nie wszystkie – współdzielone adresy, ślady finansowania, linki prowadzące z powrotem do Ciebie – a te połączenia żyją w przestrzeni między aplikacjami. Rozwiązywanie problemu prywatności aplikacja po aplikacji oznacza rozwiązywanie go wszędzie, z wyjątkiem miejsca, w którym problem faktycznie występuje. Zdecentralizowane aplikacje (dapps) nie są miejscem, w którym może żyć prawdziwe rozwiązanie.

Pozostaje portfel. To jedyny fragment oprogramowania, który widzi każdą zdecentralizowaną aplikację (dapp), z którą się łączysz, każdy adres, który kontrolujesz, i każde żądanie, które wysyłasz. Ta sama widoczność, która sprawia, że nieszczelny portfel jest tak kosztowny, pozwala ostrożnemu portfelowi koordynować prywatność we wszystkim, co robisz: wybierając, który adres jest widoczny dla której aplikacji, kierując odczyty tak, aby żaden serwer nie uzyskał pełnego obrazu, prowadząc księgowość, której wymagają protokoły prywatności.

A te protokoły są bardziej zaawansowane, niż zakłada większość budowniczych. [Railgun](https://railgun.org/) przetworzył ponad [5 miliardów dolarów skumulowanego wolumenu](https://dune.com/railgun_project/railgun) i przechowuje dziś około [80 milionów dolarów](https://defillama.com/protocol/railgun), narzędzia do adresów ukrytych (stealth addresses), takie jak [Umbra](https://www.techflowpost.com/en-US/article/30477), wygenerowały dziesiątki tysięcy jednorazowych adresów, a według [jednych z szacunków](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) ponad 35 zespołów realizuje kilkanaście różnych podejść do prywatnych transferów.

Nic z tego nie jest jeszcze głównym nurtem i autentycznie brakuje pewnych elementów. Ale protokoły działają, przepływają przez nie prawdziwe pieniądze, a to, czego im brakuje, to miejsce w głównym przepływie użytkownika. Właśnie w tym miejscu wkracza myślący przyszłościowo portfel.

## Co tak naprawdę robi portfel chroniący prywatność {#what-a-privacy-preserving-wallet-actually-does}

Odrzuć żargon, a większość pracy nad prywatnością to księgowość. Użyj tutaj świeżego adresu, skieruj depozyt tamtędy, strzeż tej notatki, poczekaj przed wypłatą, nigdy nie pozwól, aby te dwa konta się zetknęły. To dyscyplina, w której ludzie są słabi, a oprogramowanie jest do niej stworzone, a dziś spoczywa ona niemal w całości na użytkowniku.

Portfel chroniący prywatność to taki, który sam prowadzi księgowość, zamiast zrzucać to na użytkownika. Użytkownik decyduje, co zrobić; portfel upewnia się, że zrobienie tego nie pozostawi śladu prowadzącego z powrotem do niego.

Zacznijmy od tego, co działa. Pule osłonięte (shielded pools) działają już dziś: Railgun utrzymuje prywatne saldo obok Twojego publicznego, a gdy środki znajdą się w środku, płatność na zewnątrz nie ujawnia niczego o Twoich pozostałych zasobach. Koszty są realne – wyższe opłaty niż w przypadku zwykłego transferu, generowanie dowodów mierzone w sekundach, pewne poleganie na przekaźnikach (relayers) – ale protokół przeniósł miliardy w wolumenie nawet przy tych kompromisach.

Połącz to z nawykiem, do którego nie jest potrzebny żaden protokół: świeży adres dla każdego kontrahenta. Kiedy użytkownik łączy się z nową zdecentralizowaną aplikacją (dapp), portfel może zaoferować dla niej dedykowany adres, zasilony z osłoniętego salda, dzięki czemu aplikacja widzi konto bez historii i bez powiązań. Adresy ukryte ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) rozszerzają ten sam ruch na otrzymywanie płatności. Miksery takie jak [Tornado Cash](https://tornadocash.eth.limo/) i [Privacy Pools](https://privacypools.com/) wykonują prostsze, węższe zadanie: środki wchodzą z jednego adresu i wychodzą na inny, a połączenie między nimi zostaje zerwane. To narzędzie do zasilania świeżego adresu, którego nikt nie może wyśledzić – a brakującym elementem jest portfel generujący taki adres na żądanie, zamiast pozostawiać ten rytuał użytkownikowi. Nic z tego nie czeka na twarde rozwidlenie ani grant badawczy. Czeka na portfel chętny do prowadzenia księgowości w imieniu użytkowników.

Strona sieciowa to w dużej mierze decyzje. Wypuszczenie produktu z zerową analityką stron trzecich to wybór, a co najmniej jeden portfel na rynku już go dokonał. Jeśli chodzi o ekspozycję RPC, większość portfeli już pozwala na zmianę dostawców, więc opcjonalność istnieje, ukryta na stronie ustawień, którą odwiedzają zaawansowani użytkownicy, a której wszyscy inni nigdy nie znajdują.

Niewdrożonym ruchem jest separacja: przypisanie różnych dostawców do różnych adresów, aby żaden pojedynczy serwer nigdy nie widział pełnej listy, oraz umieszczenie proxy między portfelem a dostawcą, aby IP i adresy nigdy nie podróżowały razem. Lekki klient, taki jak [Helios](https://github.com/a16z/helios) lub [Colibri](https://github.com/corpus-core/colibri-stateless), pozwala portfelowi weryfikować otrzymywane odpowiedzi zamiast przyjmować je na wiarę. Każde z tych rozwiązań kosztuje coś w infrastrukturze, opóźnieniach lub czasie inżynieryjnym, ale żadne z nich nie wymaga nowej kryptografii.

Następnie jest Frontier. Odczytywanie sald dzisiaj oznacza ujawnienie zestawu adresów każdemu, kto obsługuje zapytanie, a prace nad naprawieniem tego trwają właśnie teraz: zaufane środowiska wykonawcze (Trusted Execution Environments) w połączeniu z Oblivious RAM, prywatne pobieranie informacji i lekkie klienty zmierzające w kierunku w pełni prywatnych odczytów. Nic z tego nie jest jeszcze na tyle ustalone, aby skopiować to z implementacji referencyjnej, co jest dokładnie tym, co czyni ten obszar wartym zdobycia.

Strona zapisu ma ten sam kształt: transmisja peer-to-peer i mixnety zapobiegłyby przenoszeniu Twojego IP na serwer przez transakcję. Portfele, które jako pierwsze wdrożą te elementy, będą tymi, do których będzie mierzona reszta stawki.

Oto poprzeczka i zauważ, że jest to poprzeczka doświadczenia użytkownika, a nie nowatorskiej kryptografii. Weźmy sekcję, od której zaczął się ten artykuł – uruchom, połącz, zatwierdź, zapłać – i zachowajmy ją jako rozpoznawalną sesję. Będą kompromisy; wygenerowanie dowodu zajmuje sekundy, osłonięty transfer kosztuje więcej, a jedna lub dwie nowe koncepcje mogą wymagać nazwy w interfejsie.

To, jak małe wydają się te różnice, jest kunsztem integracji i oddzieli portfele, które zrobią to dobrze, od tych, które technicznie to oferują, ale w sposób utrudniający życie użytkownikom. Co musi się całkowicie zmienić: żadna analityka nie uruchamia się przy starcie, każda nowa zdecentralizowana aplikacja (dapp) napotyka adres bez historii, a płatność dla znajomego nie ujawnia niczego o kontach, które za nią stoją.

Prywatność, która wymaga od użytkownika stania się inną osobą, nigdy się nie rozprzestrzenia. Kiedy pojawia się w ramach doświadczenia, które użytkownicy już rozumieją, jest to po prostu lepszy portfel.

## Pomysły warte kradzieży {#ideas-worth-stealing}

Poza podstawami znajduje się warstwa funkcji, których, o ile mi wiadomo, nikt jeszcze nie wdrożył. To tylko kilka pomysłów, ale każdy z nich jest czymś, co mogłoby uczynić jeden portfel oczywistym wyborem.

Zacznijmy od czasu. Zbiory anonimowości potrzebują czasu, aby urosnąć między krokami, a Twoje znaczniki czasu po cichu ujawniają więcej, niż myślisz – kiedy nie śpisz, w jakiej strefie czasowej przebywasz, w jakie dni dokonujesz transakcji. Portfel mógłby kolejkować to, co nie jest pilne, i uruchamiać to w nietypowych godzinach: depozyt osłaniający rozlicza się przez noc, środki są gotowe rano, a żaden rytm Twojego życia nigdy nie formuje się onchain.

Następnie przycisk ułatwienia. Użytkownik, który pojawia się dzisiaj, jest w pełni wyeksponowany – jedna dobrze używana fraza odzyskiwania, lata historii za nią. Pozwól mu ją wprowadzić, a portfel przygotuje plan migracji, który będzie mógł zatwierdzić – tyle do Railgun, tyle do Privacy Pools, dostosuj podział, jak chcesz. Później, gdy środki są potrzebne na zewnątrz, pojawiają się gotowe i nieujawnione: świeży adres, nietypowa godzina, kwota, która nie odzwierciedla tego, co weszło. A często nie ma w ogóle potrzeby wychodzenia. Wewnątrz ekosystemu Railgun użytkownik może dokonywać transferów i handlować bez konieczności ujawniania się, oszczędzając przy tym na opłatach za wyjście. Użytkownik, który w poniedziałek był otwartą księgą, do piątku staje się nieczytelny, a jedyne, co zrobił, to zatwierdził plan.

Portfel mógłby również przeprowadzać analizę (linting) pod kątem prywatności. Heurystyki klastrowania z pierwszej połowy tego artykułu są publiczne, więc skieruj je na własną oczekującą transakcję użytkownika i ostrzeż przed podpisem: ta płatność połączy te dwa konta, ta wypłata pasuje do Twojego depozytu co do centa. Portfele już symulują transakcje, aby wyłapać kradzież środków. Symulowanie tego, czego dowiaduje się obserwator, to ten sam ruch wycelowany w inne ryzyko.

I pokaż ludziom to, co obserwator już widzi. Pulpit nawigacyjny, który przeprowadza analizę klastrów na własnych kontach użytkownika, zamienia abstrakcyjne zagrożenie w coś, na co użytkownicy czują potrzebę zareagowania: te pięć adresów to dla obserwatora jeden podmiot, to konto jest czyste, ta nazwa ENS łączy te dwa. Daje to również wspomnianej wyżej funkcji przycisku ułatwienia jej efekt przed i po.

## Kroki do podjęcia {#action-steps}

### Dla budowniczych {#for-builders}

Każda sekcja tego artykułu kończy się w tym samym miejscu: wyborem, którego może dokonać portfel.

Sposobem na dokonywanie tych wyborów są rozsądne ustawienia domyślne, które użytkownik może nadpisać, każde z nich. Domyślnie wybieraj ścieżkę prywatną, ponieważ większość użytkowników pozostanie przy ustawieniach domyślnych. Pozostaw jednak otwartą opcjonalność kierowaną przez użytkownika, ponieważ użytkownik, który nie może skierować swojego portfela na inny serwer RPC lub własny węzeł, tak naprawdę nie otrzymał suwerenności.

Nie musisz zaczynaować od zera. [Kohaku SDK](https://github.com/ethereum/kohaku) pakuje kilka prymitywów z tego artykułu – osłonięte salda, miksery, lekkie klienty – dzięki czemu portfel może je zaadoptować bez przebudowywania każdego protokołu od podstaw. Elementy leżą na półce. Niektóre rzeczy mają znaczenie na długo przed tym, zanim ktokolwiek o nie poprosi. Nikt nie widział też mas petycji o szyfrowanie end-to-end; zostało ono dostarczone jako domyślne, miliardy ludzi otrzymały je, nie zauważając tego ani się tym nie przejmując, a teraz aplikacja komunikatora bez niego wydaje się zepsuta i naruszająca prywatność.

Pieniądze, których nie można użyć do znalezienia Cię, sprofilowania lub obrania za cel, należą do tej samej kategorii. Portfel, który traktuje je w ten sposób, będzie kolejnym wspaniałym portfelem.

### Dla użytkowników {#for-users}

Portfel, którego używasz, jest tym, który promujesz jako normę. Wybieraj portfele, które poważnie traktują Twoją prywatność i bezpieczeństwo. Może to oznaczać poświęcenie najpłynniejszego interfejsu na rzecz najbezpieczniejszego i najbardziej prywatnego. W tej chwili prawdopodobnie oznacza to bycie na bieżąco z nowościami na [Walletbeat](https://www.walletbeat.fyi/), sprawdzanie, które portfele zmierzają w kierunku umożliwienia prywatności użytkowników, i poświęcenie czasu na ich wypróbowanie.

## Do dalszej eksploracji {#for-further-exploration}

- [Karta wyników prywatności portfeli](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) – Ekspozycja sieciowa 13 portfeli przy pierwszym uruchomieniu
- [ERC-5564: Adresy ukryte (Stealth Addresses)](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) i [Tornado Cash](https://tornadocash.eth.limo/)
- Lekkie klienty [Helios](https://github.com/a16z/helios) i [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) – SDK prywatności dla budowniczych portfeli
- [Walletbeat](https://www.walletbeat.fyi/) – Jak wypadają istniejące portfele