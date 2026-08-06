---
title: "EIP-7805: Listy włączeń wymuszane przez wybór rozwidlenia (FOCIL)"
description: "Badacze Ethereum, Thomas Thiery i Julian Ma, omawiają EIP-7805 (FOCIL), który wykorzystuje zagregowane lokalne listy włączeń, aby zagwarantować, że ważne transakcje nie będą mogły być cenzurowane przez budowniczych bloków."
lang: pl
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Odcinek 141 **PEEPanEIP** przygotowany przez Ethereum Cat Herders. Do prowadzącej Pooji Ranjan dołączają **Thomas Thiery** i **Julian Ma**, badacze z grupy Robust Incentives Group w Fundacji Ethereum oraz współautorzy [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), aby wyjaśnić listy włączeń wymuszane przez wybór rozwidlenia (FOCIL): dlaczego Ethereum potrzebuje odporności na cenzurę na poziomie protokołu, jak działa ten mechanizm i na jakim etapie jest jego wdrożenie.

*Ten transkrypt jest przystępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=cUGyLx-mf6I) opublikowanego przez Ethereum Cat Herders. Został on poddany lekkiej redakcji w celu poprawy czytelności.*

#### Wprowadzenie (0:35) {#introduction-035}

**Pooja Ranjan:** Witajcie w PEEPanEIP, jedynym w swoim rodzaju programie, w którym szczegółowo omawiamy Propozycje Ulepszeń Ethereum i badamy ich wpływ na ekosystem. To jest odcinek 141, przygotowany przez Ethereum Cat Herders. Jestem waszą prowadzącą, Pooja Ranjan, a dzisiaj rozmawiamy o EIP-7805, czyli listach włączeń wymuszanych przez wybór rozwidlenia (Fork-choice enforced Inclusion Lists).

Udokumentowana w listopadzie 2024 roku, EIP-7805 to główna propozycja ze ścieżki standardów, która obecnie ma status szkicu. Propozycja ta ma na celu umożliwienie komitetowi walidatorów wymuszenie włączenia zestawu transakcji do każdego bloku. Współautorami propozycji są Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann i Jihoon Song, a sama propozycja jest aktywnie dyskutowana w kontekście przyszłej aktualizacji.

W tym odcinku przyjrzymy się szczegółom EIP-7805, jego implikacjom oraz potencjalnemu wpływowi na ekosystem Ethereum. Aby porozmawiać więcej o tej propozycji, dołączyli do nas Thomas Thiery i Julian Ma. Witamy w PEEPanEIP.

**Thomas Thiery:** Dzięki za zaproszenie.

**Julian Ma:** Tak, bardzo dziękujemy za zaproszenie.

**Pooja Ranjan:** Jesteśmy podekscytowani, mogąc poznać ogólny zarys tej propozycji, jej obecny status oraz to, jak szybko będziemy mogli zobaczyć ją w sieci głównej Ethereum. Zanim jednak zaczniemy, nasza społeczność uwielbia poznawać badaczy i deweloperów stojących za tą pracą. Czy moglibyście opowiedzieć trochę o sobie, projekcie, w który jesteście obecnie zaangażowani, oraz waszej drodze w ekosystemie Ethereum?

#### Przedstawienie gości (2:14) {#guest-introductions-214}

**Julian Ma:** Jasne, mogę zacząć. Jestem Julian, badacz w Robust Incentives Group, podobnie jak Thomas, w Fundacji Ethereum. Robust Incentives Group zajmuje się bardzo szeroko pojętą ekonomią protokołu. Niektórzy z nas przyglądali się mechanizmom opłat transakcyjnych, takim jak EIP-1559, a inni badali ataki na warstwę konsensusu, głównie te motywowane zachętami ekonomicznymi.

Jeśli chodzi o mnie, zacząłem od stażu, podczas którego badałem instrumenty pochodne oparte na opłacie podstawowej, a następnie dołączyłem na pełen etat. Pracowałem głównie nad separacją proponującego i budującego (PBS) oraz tematami związanymi z MEV, a teraz skupiam się na listach włączeń za pośrednictwem FOCIL w ramach tego EIP i z niecierpliwością czekam na separację poświadczającego i proponującego. Powiedziałbym, że najbardziej ekscytuje mnie wprowadzanie badań do produkcji poprzez ten proces, zaczynając od bardziej teoretycznej pracy i przekształcając ją w EIP, który, miejmy nadzieję, zostanie zaproponowany i wdrożony w Ethereum.

**Thomas Thiery:** Jestem Thomas. Również pracuję w Fundacji Ethereum w Robust Incentives Group, prowadząc badania. Z wykształcenia mam doktorat z neuronauki, co było zupełnie inną dziedziną. Zaczęły mnie jednak ciekawić blockchainy i systemy rozproszone, chciałem spróbować czegoś nieco innego i dołączyłem do firmy zajmującej się danymi krypto o nazwie Dune. Zostałem tam przez jakiś czas, ale potem zatęskniłem za pracą badawczą i miałem to szczęście, że mogłem dołączyć do EF i Robust Incentives Group, co jak dotąd jest wspaniałym doświadczeniem.

Pracowałem nad podobnymi tematami. Kiedy dołączyłem, temat MEV był dość głośny. Co ciekawe, moje pierwsze posty badawcze były bardzo krótkie, ale dotyczyły opóźnień we włączaniu transakcji i odporności na cenzurę. Tak naprawdę nie zagłębiałem się w to aż do niedawna. Przez ostatnie pół roku do roku byłem bardziej aktywny w kwestiach odporności na cenzurę i włączania transakcji. To było naprawdę miłe móc zacząć od pomysłów badawczych, ulepszyć poprzednie koncepcje, które były bardzo interesujące, ale nie zawierały niektórych szczegółów, o których będziemy rozmawiać, stworzyć propozycję, a teraz mieć implementacje i sieci deweloperskie, które zdaniem większości osób, z którymi rozmawiałem, byłyby dobrym dodatkiem do Ethereum.

**Pooja Ranjan:** Dziękuję za podzielenie się tym z nami. Poznawanie historii deweloperów jest zawsze inspirujące. To ciekawe, że wywodzą się z różnych dziedzin, a ostatecznie wnoszą wkład w ekosystem Ethereum. Rozumiem, że mamy dzisiaj prezentację. Więc bez zbędnych ceregieli, rzućmy na nią okiem.

#### Prezentacja: cele FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Doskonale, bardzo dziękuję. Chciałbym zacząć od krótkiej prezentacji na temat tego, jak działa EIP-7805, czyli FOCIL, i dlaczego dokładnie chcemy to wdrożyć. Ma to na celu rozpoczęcie rozmowy, więc nie będę wchodził w zbytnie szczegóły, aby zostawić trochę miejsca na późniejszą dyskusję.

Głównym celem FOCIL jest zwiększenie wiarygodnej neutralności Ethereum. FOCIL robi to poprzez usunięcie monopolu na włączanie transakcji, który obecnie posiada pojedynczy proponujący lub budowniczy bloków w ramach danego slotu. Zamiast tego, FOCIL pozwala wielu walidatorom na wkład w budowanie bloku poprzez włączanie transakcji do każdego bloku.

Celem wyższego rzędu jest dążenie do właściwości, którą nazywamy neutralnością łańcucha, co oznacza, że każda oczekująca transakcja uiszczająca opłatę powinna zostać włączona, jeśli jest dostępna i jeśli jest na nią miejsce onchain. Wierzymy, że jeśli ta właściwość zostanie w wystarczającym stopniu spełniona, to zwiększymy wiarygodną neutralność Ethereum.

#### Dlaczego potrzebujemy FOCIL i dlaczego właśnie teraz? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Dlaczego potrzebujemy czegoś takiego? Obecnie prawie wszystkie walidatory zlecają budowę bloków do MEV-Boost, który jest rynkiem poza protokołem, gdzie budowniczowie licytują prawa do budowy bloków. Na tym rynku dominują tak naprawdę tylko dwa podmioty, co oznacza, że 90% bloków jest budowanych przez zaledwie dwa podmioty.

Widzimy tutaj, że Ethereum nie może już czerpać swojej wiarygodnej neutralności z lokalnego budowania bloków. Kiedyś tak było. Zaczęło się od tego, że proponujący znajdowali się na całym świecie, a każdy z nich budował swoje bloki lokalnie, co oznaczało, że wszystkie transakcje były uwzględniane. Ale teraz, gdy budowanie bloków jest zlecane tym zaawansowanym podmiotom, to już nie wystarcza. Konieczne jest zatem wdrożenie solidniejszych środków antycenzorskich, a FOCIL jest najlepiej znanym sposobem, aby to zrobić.

Dlaczego powinniśmy wdrożyć FOCIL właśnie teraz? Można by pomyśleć, że budowniczowie obecnie nie cenzurują tak bardzo, ale mogą zacząć to robić w dowolnym momencie, czy to z powodów regulacyjnych, czy ekonomicznych. A cenzury ekonomicznej zdecydowanie nie należy bagatelizować. Dobrze jest również wprowadzić FOCIL, gdy cenzura jest stosunkowo niewielka, ponieważ wtedy wprowadza się go jako wartość bazową i domyślną. Wszystkie walidatory tworzą listy włączeń niezależnie od swojej jurysdykcji czy zachęt ekonomicznych, co powoduje niewielką niestabilność rynku. Natomiast gdybyśmy mieli wprowadzić FOCIL, gdy wszyscy budowniczowie cenzurują, być może byłoby to trudniejsze.

Ponadto, based rollupy stają się obecnie coraz bardziej popularne i będą one w dużym stopniu polegać na procesie budowania bloków w Ethereum. Jeśli chcemy zapewnić sekwencjonowanie, jakie posiada Ethereum, konieczne jest zapewnienie tutaj wiarygodnej neutralności za pomocą FOCIL.

Potencjalnie FOCIL mógłby również pomóc w skalowaniu, w zależności od tego, kogo zapytasz. Obecnie Ethereum wciąż czerpie swoją odporność na cenzurę z lokalnego budowania bloków. Jeśli Ethereum będzie mogło czerpać odporność na cenzurę z innego źródła, na przykład poprzez FOCIL, to być może będziemy mogli zwiększyć oczekiwania wobec budowniczych bloków i pozwolić na przykład na więcej blobów. Ale potencjalnie można by to zrobić również bez FOCIL. Dlatego zaproponowano wdrożenie FOCIL w aktualizacji Fusaka.

#### Jak działa FOCIL (8:10) {#how-focil-works-810}

**Julian Ma:** Teraz opowiem wam, jak działa FOCIL. Zaczniemy od podstaw i krok po kroku przejdziemy do pełnego mechanizmu, a następnie zbadamy, w jaki sposób ten pełny mechanizm spełnia pożądane przez nas właściwości.

Podstawowa idea listy inkluzji, która była już wcześniej proponowana przez Mike'a Neudera, polega na tym, że istnieje lista transakcji, która w pewien sposób ogranicza blok. Mamy więc na przykład listę inkluzji, która zawiera transakcje A i B, jest podpisana przez kogoś rozpoznawanego przez protokół, a następnie te transakcje muszą zostać włączone do jakiegoś bloku. FOCIL tego nie zmienia. Opiera się na tym, a bardziej skupia się na tym, kto tworzy tę listę i jak jest ona egzekwowana.

Więc kto tworzy tę listę? To pierwszy krok działania protokołu FOCIL. W każdym slocie 16 walidatorów jest wybieranych jako członkowie komitetu listy inkluzji. Każdy z członków tego komitetu obserwuje mempool i konstruuje własną listę inkluzji. Lista inkluzji powinna mieć około 8 kilobajtów, czyli około 20 średnich transakcji, co daje łącznie około 320 średnich transakcji.

Drugim krokiem jest dystrybucja tych list inkluzji. Członkowie komitetu listy inkluzji rozpowszechniają swoje listy inkluzji w globalnym temacie i sami nie włączają ich do bloku. Muszą to zrobić przed 9. sekundą slotu, kiedy to atestatorzy zamrażają swój widok lokalnych list inkluzji. Jak zobaczymy w następnym kroku, to właśnie atestatorzy faktycznie egzekwują te listy inkluzji, jak sama nazwa wskazuje: listy inkluzji egzekwowane przez wybór rozwidlenia (fork-choice enforced inclusion lists). Zamrażają oni swój widok tego, które listy inkluzji będą egzekwować w 9. sekundzie, co zapobiega atakom typu split-view. Producent bloku wciąż ma kilka dodatkowych sekund na obserwację list inkluzji i upewnienie się, że nie wpłynie na niego negatywnie brak jakichkolwiek list inkluzji, więc w tym scenariuszu producent bloku nie ponosi żadnego ryzyka.

Następnie przechodzimy do ostatniego kroku, którym jest egzekwowanie. Jak już wspomniałem, egzekwowanie odbywa się poprzez wybór rozwidlenia. Atestatorzy zagłosują na blok tylko wtedy, gdy spełnia on warunek listy inkluzji. Robią to, obserwując listy inkluzji, które zostały wysłane w globalnym temacie, tworząc zagregowaną listę transakcji, które widzieli na tych listach inkluzji, a następnie sprawdzając, czy wszystkie te transakcje znajdują się w bloku. Jeśli to sprawdzenie przebiegnie pomyślnie, głosują na blok. Może się również zdarzyć, że nie wszystkie transakcje z list inkluzji znajdują się w bloku, ale blok jest pełny. W takim przypadku atestatorzy również głosują na blok. Zatem atestatorzy głosują na blok, chyba że nie zawiera on tych transakcji i nie jest pełny.

Podsumowując cały mechanizm: w każdym slocie 16 członków komitetu jest wybieranych jako członkowie komitetu listy inkluzji. Obserwują oni mempool i konstruują obiekty list inkluzji, które rozpowszechniają w globalnym temacie przed upływem terminu, w tym przypadku 9. sekundy. Budowniczy obserwuje te listy inkluzji i włącza wszystkie transakcje, które widział, do swojego bloku. Następnie atestatorzy sprawdzają, czy wszystkie transakcje, które widzieli przed 9. sekundą na listach inkluzji, rzeczywiście znajdują się w bloku. Jeśli to sprawdzenie przebiegnie pomyślnie, głosują na blok i przechodzimy do następnego slotu, gdzie cała procedura powtarza się od nowa.

#### IL Boost i niepodatność na wypychanie (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Jedną z głównych obaw dotyczących list włączeń, wyrażaną w odniesieniu do poprzedniego EIP od Mike'a oraz podczas późniejszych prac rozwojowych, jest „IL Boost”, czyli niepodatność na wypychanie (uncrowdability). Odnosi się to do faktu, że proponujący listy włączeń mogliby chcieć sprzedawać swoje prawa do jej budowania. Jest to bardzo logiczna obawa, ponieważ widzimy, że dzieje się tak w przypadku konstrukcji bloków: sprzedaż tego prawa prowadzi do scentralizowanego rynku zaawansowanych budowniczych.

Twierdzimy, że FOCIL jest odporny na tego typu rynki w stylu MEV-Boost, potocznie znane jako IL Boost, ze względu na następujące właściwości. FOCIL nie gwarantuje żadnego uporządkowania transakcji. Niezależnie od tego, gdzie umieścisz swoją transakcję na liście włączeń, zostanie ona uporządkowana w sposób, jaki budowniczy bloków uzna za stosowny. Jeśli na przykład umieścisz na liście transakcję arbitrażową, jest wysoce nieprawdopodobne, że budowniczy umieści ją na samym szczycie bloku, tak aby faktycznie wykonała arbitraż. Zamiast tego budowniczy prawdopodobnie zrobi to sam.

Co więcej, prywatny przepływ zleceń nie jest możliwy. Te listy włączeń są dystrybuowane w ramach globalnego tematu, więc twoje transakcje są publiczne, zanim budowniczy zbuduje blok. Nie ma możliwości, aby prywatny przepływ zleceń trafił do bloku za pośrednictwem listy włączeń.

Po trzecie, na każdy slot przypada wielu proponujących listy włączeń. Nawet gdyby było coś wartościowego do sprzedania, wszystkich 16 członków komitetu listy włączeń ma taką samą możliwość skonstruowania tej listy, więc konkurencja między tymi proponującymi listę włączeń obniżyłaby tę wartość do zera.

I wreszcie, te listy włączeń są tworzone na 3 sekundy przed działaniem producenta bloku. Istnieją 3 sekundy dodatkowych informacji, które zazwyczaj są niezwykle istotne dla transakcji typu MEV, a które napływają po zatwierdzeniu listy włączeń i przed działaniem producenta bloku, co oznacza, że przewaga informacyjna jest bardzo niewielka. Właściwie, ci, którzy próbują wykorzystać listy włączeń jako narzędzie dla MEV, znajdują się w niekorzystnej sytuacji informacyjnej.

Z tych powodów uważamy, że żaden pojedynczy proponujący listę włączeń nie ma władzy włączania, porządkowania ani wykluczania, co jest podstawową definicją MEV. Dlatego listy włączeń nie powinny podlegać MEV.

#### Podsumowanie prezentacji (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Podsumowując tę krótką prezentację: FOCIL pozwala wielu walidatorom na udział w budowaniu bloków, zapobiegając monopolowi na włączanie transakcji przez pojedynczego proponującego i wzmacniając wiarygodną neutralność Ethereum. Uważamy, że wdrożenie FOCIL jest teraz konieczne, ponieważ obecnie istnieje tylko dwóch dominujących budowniczych, którzy mogliby w każdej chwili zacząć cenzurować, a mogłoby to wynikać z przyczyn ekonomicznych, z których mogliby czerpać korzyści. Budowanie bloków może nieść ze sobą większy ciężar, ponieważ bazowe rollupy będą chciały korzystać z właściwości sekwencjonowania Ethereum. Wprowadzenie FOCIL przebiegnie znacznie płynniej, gdy będzie niewiele cenzurujących stron: po pierwsze dlatego, że oznacza to, iż domyślnym działaniem dla walidatorów jest tworzenie list włączeń, a po drugie dlatego, że oznacza to mniejszą niestabilność rynku między budowniczymi, którzy cenzurują, a tymi, którzy tego nie robią. I wreszcie, FOCIL może potencjalnie pomóc w skalowaniu, co jest być może tematem, w który możemy zagłębić się bardziej.

Dziękuję za czas na przedstawienie tej krótkiej prezentacji. Chciałem tylko pokazać kod QR, który prowadzi do EIP, dla osób zainteresowanych.

**Pooja Ranjan:** Bardzo dziękuję za tę krótką prezentację i omówienie propozycji.

#### Q&A: czym EIP-7805 różni się od EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Chciałabym rozpocząć sekcję Q&A od pierwszego pytania, dotyczącego wcześniejszej propozycji, która również została wspomniana w waszej prezentacji: propozycja 7547, listy włączeń (inclusion lists), autorstwa Mike'a Neudera. Chcę zrozumieć podstawową różnicę między tamtą propozycją a FOCIL, który mamy w 7805. W swojej prezentacji częściowo poruszyliście temat IL Boost i uncrowdability (braku możliwości wypychania). Czy moglibyście wyjaśnić to trochę bardziej?

**Julian Ma:** Być może Thomas najlepiej nadaje się do odpowiedzi na pytanie, czym 7805 różni się od 7547, ale ja mogę powiedzieć o tym kilka słów. Przede wszystkim, FOCIL dotyczy tego samego slotu, podczas gdy 7547 dotyczył następnego slotu. Właściwość tego samego slotu ułatwia pewne rzeczy, ponieważ oznacza, że lista włączeń nie musi być przechowywana onchain.

Jeśli chodzi o właściwość uncrowdability, jest ona bardzo interesująca i subtelna. W ramach 7547, która była świetną propozycją, na której opiera się nasza propozycja, lista włączeń jest bezwarunkowo dołączana na końcu bloku i tworzona przez jedną osobę. Ma to kilka innych właściwości niż nasza. Po pierwsze, transakcje są uporządkowane. Może się zdarzyć, że w przyszłości bardzo cenny będzie arbitraż na końcu bloku, a w rzeczywistości niektóre badania Thomasa podkreśliły, że może to być potencjalnie cenne miejsce. Posiadanie praw do budowania listy włączeń oznacza, że jesteś ostatnią osobą, która działa w bloku, co w niektórych przypadkach może być cenne. Po drugie, jest ona tworzona przez jedną osobę, więc nie ma tego efektu rywalizacji wśród członków komitetu listy włączeń. Jednoosobowy komitet ma pełne prawo do włączania transakcji na końcu bloku, co również może uczynić go bardziej wartościowym. Po trzecie, istnieje ta bezwarunkowa właściwość, co oznacza, że niezależnie od tego, co zrobi producent bloku, twoja transakcja i tak zostanie włączona onchain. Ma więc kilka dodatkowych gwarancji, wykraczających poza niezbędne minimum do włączenia, co może w pewnym stopniu czynić ją wartościową.

**Thomas Thiery:** Dużą różnicą jest również liczba proponujących listę włączeń, których mamy. W poprzedniej propozycji istniał mechanizm, w którym proponujący slotu n tworzy listę włączeń, którą proponujący slotu n+1 musi wyegzekwować. Dwie ważne rzeczy w tym przypadku: po pierwsze, występuje opóźnienie o jeden slot, więc transakcje z listy włączeń muszą zostać włączone dopiero w następnym slocie przez następnego proponującego. I jest tylko jeden proponujący, który faktycznie tworzy listę włączeń. W przypadku FOCIL mamy ich 16. Robi to ogromną różnicę, ponieważ teraz potrzebujemy tylko jednego z 16 członków komitetu IL, aby był uczciwy, żeby cały mechanizm działał zgodnie z zamierzeniami. Zwiększa to szanse na posiadanie dobrego mechanizmu odpornego na cenzurę, podczas gdy wcześniej polegało się na jednej stronie.

A następnie kilka bardziej technicznych szczegółów: istniały pewne niezgodności z abstrakcją konta i trudno było poradzić sobie z ekwiwokacją IL, co oznacza kogoś, kto wysyła dwie różne listy włączeń. Ekwiwokacja bloku jest znaną rzeczą i jest karana przez protokół, ale ponieważ w poprzedniej propozycji wszystko szło onchain, trzeba było również radzić sobie z dziwnymi przypadkami brzegowymi, a nie było łatwo się do nich dostosować. W przypadku FOCIL listy włączeń nie trafiają onchain. Są one po prostu rozgłaszane w sieci P2P warstwy konsensusu. Jest to trochę techniczne, ale robi dużą różnicę w radzeniu sobie z tymi przypadkami brzegowymi spowodowanymi przez abstrakcję konta lub atakami, w których dzieli się sieć na dwa widoki za pomocą ekwiwokacji IL.

**Pooja Ranjan:** Bardzo dziękuję. Dla osób, które chciałyby dowiedzieć się więcej o propozycji 7547, mamy nagrany odcinek z Mikiem Neuderem, odcinek 130 PEEPanEIP, który zapewnia ogólny przegląd. Zawsze uwielbiam widzieć konkurujące ze sobą propozycje, ponieważ wiem, że służy to poprawie ekosystemu i łańcucha. Widzę na czacie, że jest kilka pytań. Chciałabym zaprosić Katayę do podzielenia się swoim pytaniem.

#### Czy proponujący musi uwzględnić wszystkie 16 list? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Witam, dziękuję. Moje pytanie brzmiało: czy proponujący blok otrzymuje 16 list włączeń, po jednej od każdego członka komitetu, i czy musi uwzględnić wszystkie transakcje z tych list?

**Thomas Thiery:** Tak, zgadza się. Bierze się sumę wszystkich transakcji ze wszystkich list, w naszym przypadku z 16 list. Oczywiście mogą się one pokrywać, więc bierze się sumę i usuwa duplikaty, ale tak, wszystkie transakcje ze wszystkich list muszą zostać uwzględnione w bloku, aby został on uznany za ważny przez atestujących.

**Pooja Ranjan:** Następne pytanie na czacie pochodzi od Justina. Justin, czy chciałbyś przeczytać swoje pytanie naszym gościom?

#### Prywatne transakcje z mempoola na listach włączeń (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Zadaję tak wiele pytań. Chciałem zapytać, co stoi na przeszkodzie, aby umieścić transakcję z prywatnego mempoola na liście włączeń, i myślę, że to zostało dość dobrze wyjaśnione. Wygląda na to, że jest to całkowicie w porządku, biorąc pod uwagę, że budowniczy i tak uporządkuje je tak, jak uzna to za stosowne, a twoja transakcja staje się publiczna, gdy trafia na listę włączeń (IL). Myślę więc, że ma to sens. Dziękuję.

**Thomas Thiery:** To była jedna z kwestii, o których wspomniał Julian. Naprawdę nie chcieliśmy, aby FOCIL i listy włączeń były używane do dołączania transakcji MEV, prywatnego przepływu zleceń czy wstępnych potwierdzeń, ponieważ ostatecznie zależy nam na odporności na cenzurę, a jeśli nie zachowa się ostrożności, mechanizm ten może bardzo łatwo stać się narzędziem do dołączania wartościowych transakcji. Fakt, że po umieszczeniu transakcji na liście włączeń staje się ona automatycznie publiczna, każdy może ją zobaczyć, nie ma gwarancji kolejności i może zostać umieszczona przez budowniczego w dowolnym miejscu w bloku, sprawia, że nie nadaje się ona zbytnio do wartościowych transakcji.

Więc albo masz publiczną transakcję i możesz po prostu przesłać ją do publicznego mempoola, aby została uwzględniona na liście włączeń, albo masz wartościowe prywatne transakcje i wtedy nie korzystałbyś z FOCIL, ponieważ są na to lepsze sposoby. Skontaktowałbyś się bezpośrednio z budowniczym i wysłał ją prywatnymi kanałami.

**Pooja Ranjan:** Dziękuję za podzielenie się tym. Widzę, że kolejne pytanie ma Ladislaus.

#### FOCIL i skalowanie (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Cześć wszystkim. Odnoszę się do kwestii, którą poruszyliście w kontekście FOCIL i skalowania. Ostatnio, jak my wszyscy, widziałem trochę dyskusji na temat skalowania Ethereum i, jak słusznie zauważyliście, istnieje to wąskie gardło w postaci zaledwie kilku budowniczych. Osobiście lubię myśleć o FOCIL jako o ponownym wzmocnieniu lokalnego budowania i uważam, że konieczne jest zapisanie tego w protokole, zanim zwiększymy wymagania dotyczące przepustowości lub ogólne wymagania dla węzłów. Może moglibyście rozwinąć, co o tym myślicie, a także omówić potencjalne inne sposoby na skalowanie, być może bez FOCIL, o czym wspomnieliście.

**Julian Ma:** Dziękuję za to pytanie. Po pierwsze, kwestia skalowania za pomocą FOCIL. Obecnie 90% walidatorów zleca konstrukcję bloków na zewnątrz poprzez MEV-Boost, a te zaawansowane podmioty mają oczywiście większą przepustowość niż minimalne wymagania sprzętowe. Mogłyby na przykład uwzględnić więcej blobów w swoich blokach, nie powodując przy tym żadnych problemów. Ciekawą rzeczą jest jednak to, że Ethereum polega na lokalnym budowaniu bloków w celu zapewnienia wiarygodnej neutralności, czyli odporności na cenzurę, ponieważ te dwa zaawansowane podmioty nie są tymi, na których można oprzeć odporność Ethereum na cenzurę.

Dlatego protokół Ethereum musi być nadal projektowany tak, aby możliwe było lokalne budowanie bloków, i w rzeczywistości projektujemy go tak, aby nie było to nieopłacalne w porównaniu z MEV-Boost. Wynika to z projektu Ethereum, ale w praktyce MEV-Boost jest oczywiście znacznie bardziej opłacalny: po pierwsze dlatego, że ci zaawansowani budowniczowie bloków mają bardziej złożone algorytmy, a po drugie dlatego, że mają znacznie więcej prywatnego przepływu zleceń. Niedawne badania przeprowadzone przez Data Always pokazały, że bloki MEV-Boost zawierają znacznie więcej transakcji. Już samo to prowadzi do większych zysków.

Mimo to protokół jest zaprojektowany tak, aby w ramach jego zasad nie działały żadne siły, które czyniłyby jednego walidatora mniej opłacalnym od drugiego. Jeśli chcemy utrzymać tę zasadę, to FOCIL jest niezbędny, ponieważ wtedy lokalni budowniczowie bloków mogą wnosić wkład do list włączeń i tym samym podtrzymywać odporność na cenzurę. Moglibyśmy jednak również pozbyć się tej zasady i w zasadzie powiedzieć, że lokalni budowniczowie bloków mogą uwzględnić określoną liczbę blobów, ale bardziej zaawansowani budowniczowie bloków mogliby uwzględnić więcej blobów, do tego stopnia, że lokalni budowniczowie bloków nie byliby w stanie poradzić sobie z tym obciążeniem podczas samodzielnego tworzenia bloku. Jeśli więc chcemy zachować zasadę, że maksimum jest ustalane na podstawie najniższych wymagań sprzętowych, to potrzebujemy FOCIL. Jeśli nie mamy nic przeciwko złagodzeniu tej zasady, to potencjalnie nie potrzebujemy FOCIL do skalowania.

**Thomas Thiery:** Myślę, że to bardzo podobne, ale obecnie na Ethereum jesteśmy w dziwnej sytuacji, ponieważ polegamy na zaawansowanych budowniczych przy budowaniu większości bloków, a to nie jest dobre dla odporności na cenzurę, ponieważ to tylko dwie strony. Jeśli z jakiegoś arbitralnego powodu zdecydują się cenzurować transakcje lub niektóre adresy, to w zasadzie nie mamy odporności na cenzurę ani braku konieczności uzyskiwania pozwoleń (permissionlessness), co również jest bardzo ważne. Oznacza to, że mogą cenzurować lub powstrzymywać dowolnych aktorów przed uczestnictwem onchain, co jest bardzo złe.

A właściwości odporności na cenzurę, które zachowujemy, nie są rewelacyjne, prawda? Ponieważ większość bloków jest budowana przez tych dwóch budowniczych, w zasadzie trzeba czekać, aż jeden lokalny budowniczy bloków zostanie wybrany i zaproponuje blok, który zawiera wszystkie te transakcje, które normalnie są cenzurowane, co nie jest zbyt dobrym rozwiązaniem. Oznacza to, że ci użytkownicy będą musieli poczekać 10, 12, nie wiem, wiele bloków, zanim ich transakcje zostaną faktycznie uwzględnione onchain.

Dlatego naprawdę chcemy zatrzymać domowych stakerów i lokalnych budowniczych bloków, ponieważ to oni zachowują odporność na cenzurę. Jednocześnie dzisiaj nawet korzystanie z nich nie jest idealne, ponieważ nadal trzeba czekać dużo czasu na uwzględnienie transakcji, jeśli jest ona cenzurowana przez tych dwóch budowniczych. Dzięki FOCIL przenosimy się do świata, w którym uczestnicy gwarantujący odporność na cenzurę, w naszym przypadku członkowie komitetu listy włączeń, mogą być inni niż osoby budujące bloki. Myślę, że otwiera to bardzo interesujący krajobraz, ponieważ teraz nie musimy polegać na dokładnie tym samym uczestniku, aby zarówno budował wartościowe bloki, jak i przyczyniał się do odporności na cenzurę. FOCIL można również uznać za pierwszy krok w tym ważnym kierunku, ponieważ mamy dwa bardzo różne obowiązki, a dzisiaj prosimy dokładnie te same węzły walidatorów o wykonywanie obu, co rodzi duże napięcia.

**Pooja Ranjan:** Bardzo dziękuję. Myślę, że kolejne pytanie ma Luis.

#### Kryteria wyboru transakcji (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Dołączyłem kilka minut po rozpoczęciu, ale wygląda mi na to, że to decentralizuje wybór transakcji w sieci jako całości. Moim zdaniem to bardzo dobrze; walczy to z MEV i cenzurą. I zdecydowanie podoba mi się część, w której atestatorzy wykonują to zadanie, ponieważ w przyszłości będą mieli niższe wymagania sprzętowe niż budowniczowie, a tym bardziej dzięki bezstanowości i klientom bezstanowym. Ponieważ będzie można to uruchomić na bardzo słabym sprzęcie, czyni to wszystko bardzo zdecentralizowanym. Myślę, że głównym wyzwaniem jest tutaj zdefiniowanie kryteriów wyboru transakcji dla tych list inkluzji, niezależnie od tego, czy wybierze się opłaty priorytetowe, czy liczbę blobów; jest tak wiele zmiennych. Czy ustaliliście już zestaw kryteriów, które zamierzacie egzekwować?

**Thomas Thiery:** To świetne pytanie. Odpowiedź jest dwojaka. Pierwszy z nich jest bardzo ważny i dotyczy próby oddzielenia atestatorów od osób budujących lub proponujących blok. To cały kierunek badań nad separacją atestatora i proponującego (APS); Julian sporo nad tym pracował. Nazywamy to rozdzielaniem ról, aby ściślej odpowiadały obowiązkom protokołu. Napisałem post, którym właśnie się podzieliłem, o możliwej separacji, która jest bardzo otwarta na dyskusję, i bardzo chciałbym usłyszeć więcej opinii od innych. W tym poście dokonuję podziału na atestatorów, włączających (includers), którymi są teraz członkowie komitetu IL, oraz proponujących wykonanie, czyli budowniczych. Myślę, że są to fundamentalnie różne obowiązki i być może powinniśmy mieć dla nich różne role.

Jeśli chodzi o regułę inkluzji, to bardzo dobre pytanie. Sporo o tym myśleliśmy i wydaje mi się, że doszliśmy do dwóch wniosków. Pierwszy z nich jest taki, że chcemy różnorodności reguł. Nie chcemy jednej, pojedynczej reguły, na przykład sortowania malejąco według opłat priorytetowych dla wszystkich klientów, ponieważ wtedy można by było manipulować i próbować zmieniać kolejność w mempoolu tak, aby tylko twoje transakcje były włączane do list inkluzji (IL). Ale jeśli mamy różnorodność reguł, w tym jedną, która bierze pod uwagę również czas oczekiwania transakcji w mempoolu, a różni klienci implementują różne reguły, wszystkie w podobnym duchu, głównie wokół opłat priorytetowych i czasu oczekiwania w mempoolu, to bardzo, bardzo trudno jest tym manipulować, co czyni protokół jeszcze bardziej solidnym. Myślę, że to również dobry sposób na wykorzystanie różnorodności klientów, którą mamy dzisiaj w Ethereum, i pozwolenie klientom na dokonywanie własnych, zdecydowanych wyborów. Mamy na myśli pewne reguły, ale uważamy, że klienci mogą również wybrać te najlepsze dla siebie. Dopóki nie wszyscy mają dokładnie tę samą regułę sortowania według opłat priorytetowych, wszystko będzie w porządku.

**Luis Pinto:** Okej, czyli również rozpraszacie te kryteria, pozwalając tym, którzy budują listy inkluzji, na posiadanie własnych kryteriów. Czy to będzie część protokołu?

**Julian Ma:** Reguła inkluzji nie będzie częścią protokołu. Po pierwsze, bardzo trudno jest ją wyegzekwować, a po drugie, w rzeczywistości lepiej jest niczego nie narzucać. Jeśli pozwolimy członkom komitetu decydować samodzielnie lub pozwolimy zespołom klienckim działać w ich imieniu w kwestii tego, jak włączają transakcje, to stworzymy pewną odporność w sieci. Osoby o różnych preferencjach będą dokonywać włączeń na różne sposoby, co oznacza, że trudniej jest zaatakować system.

**Luis Pinto:** Okej, dziękuję.

#### Kompatybilność z EIP-7702, ePBS i PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Bardzo dziękuję. Z tego, co rozumiem, ta propozycja jest już proponowana do aktualizacji po Pectra, czyli Fusaka. A biorąc pod uwagę, że Fusaka może, ale nie musi, obejmować inne EIP, które są w toku, zastanawiam się, jaki jest status kompatybilności FOCIL w odniesieniu do propozycji takich jak 7702, która dotyczy abstrakcji konta, ePBS i PeerDAS.

**Thomas Thiery:** Świetne pytanie. Mieliśmy tu pewną przewagę ze względu na historię list włączeń (inclusion lists). Jak wspomnieliśmy, 7547 był rozważany do włączenia, a następnie odrzucony z powodu braku kompatybilności. Dlatego bardzo uważaliśmy, aby je rozwiązać przed złożeniem nowej propozycji, ponieważ wiedzieliśmy, że ludzie będą na nią patrzeć przez pryzmat tych samych pytań, co ma sens.

Jesteśmy bardzo pewni swego, ponieważ rozmawialiśmy również z zespołami zajmującymi się abstrakcją konta, a także dużo rozmawialiśmy z Potuzem i Terence'em. Terence aktywnie nam pomagał i pracował zarówno nad ePBS, jak i FOCIL, więc bardzo łatwo było nam sprawdzić, czy to również jest kompatybilne. Naprawdę nie sądzę, aby istniały niekompatybilności z jakimikolwiek innymi EIP. W przypadku ePBS trzeba uważać na harmonogram, ponieważ oddziela się ładunek wykonawczy od bloku konsensusu, więc zmienia się cały czas trwania slotu, a teraz dodaje się również tworzenie list włączeń (IL), które muszą zostać utworzone przed zaproponowaniem ładunku. Trzeba więc uważać na czasy, ale jeśli dobrze pamiętam z naszej ostatniej rozmowy z Potuzem i Terence'em, nie było absolutnie żadnej kluczowej niekompatybilności. Myślę, że jeśli chodzi o kompatybilność, wyglądamy dobrze.

**Pooja Ranjan:** Dobrze wiedzieć. Zauważyłam, że Jihoon udostępnił również dokument HackMD, który dodamy do zasobów dla osób, które chciałyby dowiedzieć się więcej o kompatybilności konkretnie z ePBS. I tak, pamiętam z ostatniej rozmowy z Mikiem, że propozycja nie została włączona z powodu braku kompatybilności z abstrakcją konta. Więc dobrze wiedzieć, że to zostało już załatwione.

#### FOCIL i wieloslotowe MEV (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Przeglądałam dokumenty i szczegóły dodane na stronę internetową FOCIL, meetfocil.eth.limo, i dowiedziałam się o terminie zwanym wieloslotowym MEV. Julian wspomniał również, że MEV-Boost ogólnie jest opłacalne, pomimo chęci i wysiłków podejmowanych przez deweloperów, aby utrzymać je na zrównoważonym poziomie. Zastanawiam się, jak FOCIL temu zapobiegnie.

**Julian Ma:** Dziękuję za to pytanie. Najpierw powiem coś o FOCIL i MEV, a potem możemy przejść do wieloslotowego MEV. FOCIL niekoniecznie zapobiega MEV, a to właśnie dlatego, że chcemy rozdzielić części dotyczące MEV i części dotyczące włączania. Naszym zdaniem jest to ważne, ponieważ w przeciwnym razie pojawiają się rynki w stylu IL Boost. Idąc tym tokiem rozumowania, jeśli lista włączeń mogłaby ograniczyć ilość MEV możliwego do wydobycia, to budowanie listy włączeń stałoby się bardzo wartościowe, a ludzie tworzyliby wokół niej rynki. Nasz projekt ma tak naprawdę na celu zapewnienie minimalnej gwarancji włączenia, co oznacza, że bycie członkiem komitetu listy włączeń nie jest aż tak wartościowe, a jest ich 16, co oznacza, że nie ma rynku zaawansowanych producentów.

Przechodząc do wieloslotowego MEV: FOCIL łagodzi niektóre z problemów, ale nie rozwiązuje ich całkowicie. Wynika to ponownie z tej niekompatybilności między zapewnieniem zarówno odporności na cenzurę, jak i rozwiązania dla MEV. To, co robi FOCIL, to umożliwienie włączenia dowolnej transakcji, o ile uiszcza ona opłaty, co do pewnego stopnia rozwiązuje problem wieloslotowego MEV. Wieloslotowe MEV polega tutaj na tym, że strona jest w stanie wydobyć więcej MEV, jeśli kontroluje dwa bloki z rzędu.

FOCIL łagodzi niektóre problemy, ponieważ pozwala na wstawienie swojej transakcji. Na przykład, jeśli musisz wstawić transakcję likwidującą zły dług na jakiejś pozycji, jesteś w stanie to zrobić, nawet jeśli proponujący próbuje cię ocenzurować i wydobyłby z ciebie MEV w następnym bloku.

Powodem, dla którego nie rozwiązuje to wszystkich problemów, jest negatywna selekcja (adverse selection), właściwość ekonomiczna, w której jedna osoba ma więcej informacji niż inna. Jednym z przykładów wieloslotowego MEV byłoby wydobycie arbitrażu na przestrzeni dwóch bloków, gdzie budowniczy bloków nie wydobywa arbitrażu w pierwszym bloku, a robi to w drugim bloku. Istnieją pewne teoretyczne wyniki pokazujące, że może to być bardziej opłacalne dla budowniczego bloków niż wydobywanie arbitrażu w obu slotach. Można by pomyśleć, że FOCIL tutaj pomaga, ponieważ arbitrzy mogliby w zasadzie umieścić swoją transakcję na liście włączeń i tym samym wymusić wystąpienie jakiegoś rodzaju arbitrażu. Chociaż tak jest, przesyłanie transakcji do FOCIL nie jest zgodne z zachętami dla arbitrów, ponieważ wciąż mijają 3 sekundy między przesłaniem ich transakcji a momentem, w którym budowniczy bloków może zadziałać. Jeśli próbujesz dokonać arbitrażu, a cena na jakimś zewnętrznym rynku stale się zmienia, nie chcesz angażować się z 3-sekundowym wyprzedzeniem, ponieważ masz znacznie mniej informacji niż budowniczy bloków, który działa później niż ty. Negatywna selekcja wchodzi do gry, ponieważ budowniczy ma więcej informacji: pozwoli ci wygrać, jeśli jest to dla ciebie niekorzystne, jeśli cena na rynku zewnętrznym zmieniła się na twoją niekorzyść w ciągu tych trzech dodatkowych sekund, i pozwoli wygrać sobie, jeśli jest to dla niego lepsze.

Więc FOCIL rozwiązuje te części wieloslotowego MEV, w których transakcje nie cierpią z powodu negatywnej selekcji. W przypadku transakcji, w których występuje negatywna selekcja, jest to nieco bardziej skomplikowane, ale do pewnego stopnia łagodzi problem. W zasadzie poprawia to sytuację w stosunku do tego, co jest teraz, ale wciąż jest trochę pracy do wykonania.

**Pooja Ranjan:** Bardzo dobrze, dziękuję bardzo za podzielenie się tym. Rozumiem, że trwają intensywne badania mające na celu rozwiązanie kwestii MEV, więc dobrze wiedzieć, że przynajmniej w teorii pomoże to bardziej niż w obecnym scenariuszu.

#### Kompromisy i wyzwania (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Mam jedno pytanie związane z tym, o czym Thomas wspomniał wcześniej w kontekście ekwiwokacji IL. Zauważyłam, że w sekcji dotyczącej kwestii bezpieczeństwa tej propozycji wymieniono całkiem sporo punktów, takich jak żywotność konsensusu, ekwiwokacja IL oraz konstrukcja ładunku. Co uznałbyś za największy kompromis lub coś, co może wymagać dalszych badań i potencjalnie powstrzymać tę propozycję przed wejściem do kolejnej aktualizacji w obecnej formie?

**Thomas Thiery:** Szczerze mówiąc, myślę, że sekcja dotycząca kwestii bezpieczeństwa miała głównie na celu pokazanie, że przemyśleliśmy i rozwiązaliśmy obawy związane z bezpieczeństwem. Chodziło o to, a nie o pozostawienie otwartych pytań dotyczących kwestii bezpieczeństwa, o których nic nie wiemy. Nie sądzę, aby istniały jakiekolwiek duże blokady lub problemy z punktu widzenia bezpieczeństwa.

Jeśli chodzi o kompromisy: patrząc z bardzo wąskiej perspektywy, to prawda, że FOCIL dodaje pewne zadania walidatorom, zarówno wtedy, gdy muszą zaproponować listę inkluzyjną, jak i atestującym, gdy muszą sprawdzić jeszcze jeden warunek, aby upewnić się, że blok jest ważny zgodnie z listami inkluzyjnymi. Dodaje to również drobne zadanie dla proponującego, ponieważ teraz musi on upewnić się, że jego ładunek faktycznie zawiera transakcje z list IL. Dla mnie to jedyny kompromis, a te zadania nie są ani uciążliwe, ani skomplikowane. Członek komitetu IL po prostu monitoruje publiczny mempool i dołącza transakcje do listy, którą wysyła. Nie wymaga to żadnych specjalnych umiejętności ani zaawansowania, co uważam za duży plus. Z drugiej strony, jak już wspomnieliśmy, może to odblokować znaczące ulepszenia w zakresie skalowania oraz lepszy podział ról i obowiązków między uczestnikami w ramach protokołu.

Mogę być nieobiektywny, ale nie widzę tu dużych kompromisów. Uważam jednak, że to w pewnym sensie wywraca wszystko do góry nogami, jeśli chodzi o odporność na cenzurę. Teraz wystarczy, że zaledwie 15% sieci będzie uczciwe, aby wszystkie transakcje, w tym te, które mogą być cenzurowane przez budowniczych, zostały włączone do następnego bloku, co jest ogromną poprawą. Szczerze mówiąc, nie sądzę, żebyśmy szli tu na wiele kompromisów.

**Pooja Ranjan:** Dobrze to wiedzieć. W większości propozycji zauważamy, że sekcja dotycząca kwestii bezpieczeństwa nie zawiera żadnych lub zawiera bardzo mało informacji, więc dobrze wiedzieć, że przeprowadzono badania w tym zakresie i jesteśmy świadomi potencjalnych kwestii bezpieczeństwa. Cieszę się, że nie jest to blokada ani potencjalne wyzwanie dla wdrożenia i adopcji w przyszłości.

#### Mechanizmy opłat transakcyjnych dla list włączeń (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Mam pytanie dotyczące kilku otwartych kwestii, które znalazłam na samej stronie internetowej, a mianowicie mechanizmu opłat transakcyjnych. Zastanawiam się, czy są jakieś nowości, albo czy chcielibyście podzielić się czymś więcej na temat najlepszego sposobu pobierania opłat i ich dystrybucji za włączenie do listy włączeń.

**Thomas Thiery:** Mamy trwający grant, który bada konkretnie ten temat oraz mechanizmy zachęt do nagradzania członków komitetu IL (list włączeń). To nie jest łatwe. To skomplikowane i niezależnie od tego, jak do tego podejdziesz, są to również bardzo duże zmiany. Zmiana opłat w Ethereum, niezależnie od tego, czy zmieniasz opłatę, dodajesz nową, czy dodajesz nową emisję, to wszystko są duże zmiany, które wymagają wielu przemyśleń i ostrożności. Ale jest to badane, a pomysły dotyczące dystrybucji opłat, na przykład wśród członków komitetu, którzy włączają transakcję, wydają się całkiem sensowne. Ma to w pewnym sensie właściwości, których oczekujemy, ponieważ chcemy nagradzać ludzi za włączanie transakcji, których inni mogliby nie chcieć włączyć. Więc myślimy o tym dość głęboko i mamy trwający grant.

Pojawia się również pytanie, czy w ogóle chcemy przekazywać opłaty członkom komitetu IL, ponieważ nagradzanie mniejszych uczestników rozproszonych po całym świecie jest wyjątkowo trudne. Nie chcemy ataków Sybil i nie chcemy, aby duzi uczestnicy z dużą stawką wyparli zbiór komitetu IL. Jak temu zapobiec? To bardzo trudne. Trzeba więc wziąć pod uwagę wiele kwestii projektowych.

Jednym z moich ostatnich przemyśleń jest: co by było, gdybyśmy dodali do FOCIL kilka fajnych funkcji, takich jak prywatność, dzięki czemu tak naprawdę nie wiadomo by było, kto zaproponował daną listę transakcji? Wiesz, że był to ktoś faktycznie wybrany na członka komitetu IL, ale nie wiesz dokładnie, kto zaproponował którą listę, więc nie możesz powiązać członków komitetu IL z zestawem transakcji na ich listach. Jeśli uda nam się to osiągnąć i sprawić, że rola w komitecie IL będzie w pewnym sensie opcjonalna (opt-in), to prawdopodobnie mielibyśmy uczciwych uczestników w protokole, polegających na altruistycznym zachowaniu, i być może w ogóle nie musielibyśmy tworzyć mechanizmu opłat. To bardzo świeże, subiektywne spojrzenie, które jest obecnie intensywnie badane. Wszystko to są dyskusje o „przyszłości FOCIL”; nie mają one znaleźć się w obecnym EIP.

**Julian Ma:** Dodając do tego, ta ostatnia część jest również bardzo ważna: EIP-7805 nie zawiera żadnego mechanizmu opłat transakcyjnych, aby ułatwić jego wdrożenie. Jest to w zasadzie najmniejszy możliwy sposób, w jaki możemy zapewnić właściwości odporności na cenzurę, ale jest on bardzo rozszerzalny. Badamy to. Thomas wykonał sporo pracy, przyglądając się oddzielnym opłatom transakcyjnym dla włączających i proponujących. Następnie, jak wspomniał Thomas, mamy trwający grant ze świetnym badaczem z Nethermind, który zajmuje się stworzeniem mechanizmu opłat transakcyjnych dla FOCIL, i jest to bardzo obiecujące. I wreszcie, trwają prace nad mechanizmem opłat transakcyjnych dla wariantu FOCIL o nazwie AUCIL, opartego na aukcjach projektu listy włączeń zaproponowanego przez Sarishta Wadhwę, Fana Zhanga i Kartika Nayaka wraz z kilkoma autorami FOCIL, który szuka sposobów na zachęcenie członków komitetu listy włączeń.

Nawiązując do wcześniejszej uwagi Luisa, zachęcanie w dużej mierze dotyczy tego, jak tworzone są listy włączeń. Oznacza to, że protokół chce narzucić pewien pogląd na to, jak powinni zachowywać się członkowie komitetu listy włączeń. Zazwyczaj sprowadza się to do tego, że chce, aby określeni uczestnicy robili różne rzeczy. Na przykład, może uporządkować członków komitetu i przypisać im określone transakcje poprzez skorelowaną równowagę, aby nadal zachować pewne zróżnicowane zachowanie między członkami komitetu. Nie jest to więc część obecnej propozycji, ale zdecydowanie się temu przyglądamy i wpisuje się to w ramy rozszerzalności FOCIL.

**Pooja Ranjan:** Och, to interesujące. Powinniśmy więc z niecierpliwością czekać na pewne dodatkowe propozycje w przyszłości, które ulepszą obecne funkcje FOCIL.

#### Rozmiar listy włączeń (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Mam jeszcze jedno pytanie. Nie jestem pewna, czy powinno to być częścią obecnej propozycji, ale jestem ciekawa, czy są jakieś nowości dotyczące rozmiaru IL. Listy włączeń prawdopodobnie muszą mieć ograniczony rozmiar, aby zapobiec nadmiernemu zużyciu przepustowości. Czy mamy jakieś dalsze badania lub aktualizacje na temat tego, jak można określić optymalny rozmiar listy włączeń?

**Thomas Thiery:** Mamy teraz stały rozmiar w specyfikacji i jest on tam od jakiegoś czasu: 8 kilobajtów. Podajemy to w kilobajtach, ponieważ to, co FOCIL i IL tak naprawdę zużywają, to przepustowość i to w zasadzie tyle. Jeśli weźmiemy pod uwagę medianę rozmiaru transakcji, otrzymamy około 40 transakcji na IL, a jeśli wszystkie transakcje są unikalne, daje to około 640 transakcji, które można by połączyć ze sobą w ramach wszystkich 16 członków komitetu.

Nie wiem, czy jest potrzeba prowadzenia zbyt wielu badań nad dokładnym optymalnym rozmiarem. Zdecydowaliśmy się na: 16 razy 8 kilobajtów to w zasadzie rozmiar bloba, więc łącznie nie jest to ogromna ilość przepustowości. A ponieważ kombinacja transakcji w ramach IL jest większa niż blok, nie sądzę, abyśmy napotkali tu na problemy.

W przyszłości można by zwiększyć rozmiar IL, ale można by również rozważyć zwiększenie liczby członków komitetu IL. Pozwala to na jeszcze większe szanse na uzyskanie jednego uczciwego członka komitetu IL, jeśli większość sieci zdecyduje się rozpocząć cenzurowanie. Więc to również jest coś, co moglibyśmy zrobić. Na razie wydaje się, że 16 będzie w zupełności w porządku i wystarczy, ale zdecydowanie można bawić się tymi parametrami w przyszłości, jeśli cenzura stanie się bardzo szalona lub jeśli będziemy musieli podjąć więcej działań.

#### Metryki do śledzenia adopcji (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Mam tu tylko dodatkowe pytanie: czy macie na myśli jakieś metryki, które możemy śledzić, aby zrozumieć adopcję lub sukces tej propozycji?

**Julian Ma:** To świetne pytanie. Pozwól, że szybko odpowiem, a potem przekażę pałeczkę Thomasowi. Kilka prostych metryk to po prostu to, ile proponowanych list włączeń nie jest pustych. Można też pomyśleć o dashboardach, takich jak seria „.pics” od Toniego Wahrstättera, gdzie jest może więcej szczegółów, przypisujących pewną miarę jakości do tych list włączeń. W zasadzie jednak tylko jedna osoba na slot musi stworzyć odpowiednią listę włączeń, aby zapewnić odporność na cenzurę.

Myślę, że to tak ważna kwestia, że istotne jest, aby wdrożyć FOCIL wkrótce, ponieważ teraz znajdujemy się w tym magicznym stanie, w którym budowniczowie bloków nie cenzurują zbyt wiele i walidatorzy nie cenzurują zbyt wiele. Powiedziałbym, że jest to bardzo kruche. Do tej pory budowniczowie bloków cenzurowali przez długi czas, a jeśli wprowadzimy FOCIL teraz, mamy możliwość uczynienia tego standardem, tak aby wszyscy ci walidatorzy go przyjęli i tworzyli listy włączeń, które mają znaczenie. Ponieważ budowniczowie bloków nie cenzurują, nie powstaje tu żadna niestabilność rynku. Jeśli poczekamy, aż pojawi się cenzura wśród budowniczych, znacznie trudniej będzie wprowadzić FOCIL, i wyobrażam sobie, że wszystkie metryki, które posłużyłyby do pomiaru adopcji, byłyby znacznie gorsze.

**Thomas Thiery:** Jedną z kluczowych metryk, na którą warto również zwrócić uwagę, jest dosłownie opóźnienie włączenia dla transakcji w publicznym mempoolu. Bierzesz wszystkie transakcje, które oczekują w publicznym mempoolu i sprawdzasz, jak szybko zostają włączone. Jeśli FOCIL działa, wszystkie zostaną włączone w następnym bloku. Jeśli nie, oznacza to, że duża część walidatorów cenzuruje. Zatem inną metryką, na którą możemy spojrzeć, jest to, kto cenzuruje i jaka część sieci cenzuruje. Będziemy mieli dashboardy i bardzo przejrzyste metryki, aby to śledzić, ponieważ w zasadzie to właśnie ma robić FOCIL. Jeśli publiczne transakcje nie zostaną włączone w następnym bloku, oznacza to, że bardzo duża część sieci faktycznie cenzuruje te transakcje.

**Pooja Ranjan:** Bardzo ciekawe. Więc może to coś dla badaczy: potencjalna lista życzeń dla aktualizacji, aby dashboardy i narzędzia do śledzenia metryk były udostępniane przez deweloperów dla danej propozycji, za każdym razem, gdy jest ona włączana do aktualizacji sieci.

#### Status implementacji klienta (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Jak wspomniał Julian, ta propozycja może wymagać wdrożenia tak szybko, jak to możliwe. Jestem ciekawa, na jakim etapie jesteśmy z implementacją w klientach, ponieważ pamiętam, że podczas ostatniego spotkania dotyczącego sieci testowej Paritosh wspomniał o dodaniu pewnego wsparcia dla sieci deweloperskich (devnetów). Więc jak to u nas wygląda?

**Thomas Thiery:** Idzie nam całkiem dobrze. Przede wszystkim, to było wspaniałe zobaczyć, jak ludzie podeszli do kwestii implementacji FOCIL, ponieważ nie jestem deweloperem, jestem badaczem. Od początku współpracowałem z deweloperami, ale to nie ja implementuję rzeczy w klientach.

Osoby, które stanęły na czele, to ta trójka: mamy Terence'a z Prysm oraz Jihoona, który bardzo pomagał Terence'owi przy Prysm, ale pracował również nad Geth. Więc teraz mamy działającą sieć deweloperską dla Prysm i Geth, co jest świetne, i trwają intensywne testy. Obecnie staramy się również, aby FOCIL był widoczny w eksploratorze Dora. Następnie mamy Jacoba, który pracował nad Lighthouse i Reth, i wiem, że wciąż trwają tam pewne prace. Zespół Lodestar był ostatnio bardzo aktywny; myślę, że są bardzo blisko uruchomienia swojego devnetu. Dzisiaj otrzymaliśmy wieści od Nethermind, że mają prototyp, co jest super. Mam wrażenie, że o kimś zapominam... Nimbus również dołącza, jak mówi Jihoon. To naprawdę wspaniałe.

Ogólnie rzecz biorąc, mamy coraz więcej gotowych i działających sieci deweloperskich, lokalnych devnetów, oraz coraz więcej kombinacji między klientami warstwy wykonawczej i warstwy konsensusu. Poczyniono naprawdę dobre postępy i miło to widzieć, ponieważ wszyscy wiemy, że deweloperzy są teraz dość zajęci nadchodzącą aktualizacją Pectra, a także pracują już nad PeerDAS i innymi rzeczami. To było naprawdę wspaniałe zobaczyć, jak bardzo ludziom w Ethereum zależy na odporności na cenzurę. Większość zespołów, z którymi nie kontaktowałem się bezpośrednio, po prostu dołączyła do inicjatywy i pracuje teraz nad devnetami oraz testowaniem.

**Pooja Ranjan:** Dziękuję, że się tym podzieliłeś. Z niecierpliwością czekam na kolejne aktualizacje dotyczące sieci deweloperskich. Nie jestem pewna, ile iteracji tego devnetu powstanie, ale cieszę się, że to nadchodzi. Widzę, że Justin ma tutaj pytanie. Justin, proszę, mów.

#### FOCIL w Fusace czy Glamsterdamie? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Okej, zapnijcie pasy. Zwróciłeś uwagę na bardzo ważną rzecz, że najlepszym czasem na rozwiązanie problemu cenzury jest czas, zanim ona w ogóle nastąpi, prawda? Zatem: FOCIL w Fusace, czy może poczekać na Glamsterdam? I za czym powinienem się opowiadać jako deweloper?

**Thomas Thiery:** Otworzyliśmy PR i został on scalony, a FOCIL został zaproponowany do Fusaki. Uważamy, że powinien trafić do Fusaki. Częściowo wynika to z faktu, że niektóre klienty rozpoczęły już nad nim prace i nie napotkały zbyt wielu przeszkód. To nie jest tak jak z innymi propozycjami, które są znacznie trudniejsze do wdrożenia i wymagają o wiele więcej pracy. Nie jest to też zbyt kontrowersyjne. Nie sądzę, by ktokolwiek opowiadał się przeciwko odporności na cenzurę, i wszyscy w pewnym sensie zgadzają się, że należy to uwzględnić tak szybko, jak to możliwe. Więc ja opowiadałbym się za Fusaką.

Nie wiem, czy to może poczekać, czy nie. Propozycje i aktualizacje zawsze mogą poczekać. Chcę po prostu uniknąć świata, w którym wdrożenie tych zmian nie będzie już takie proste. Sytuacja może się bardzo szybko odwrócić. Jak widzieliśmy, poszło to w drugą stronę: kilka miesięcy temu jeden z głównych budowniczych po prostu ni stąd, ni zowąd przestał cenzurować. Zapytaliśmy dlaczego, a odpowiedź brzmiała: "tak po prostu zdecydowaliśmy". W tym przypadku było to dobre, ponieważ zadziałało na naszą korzyść, ale sytuacja może się całkowicie odwrócić, a wtedy moglibyśmy mieć dwóch budowniczych cenzurujących niektóre transakcje i wrócilibyśmy do bardzo złego punktu.

Inna rzecz, o której chcę wspomnieć, ponieważ uważam ją za ważną: jeśli pójdziemy w kierunku niektórych rzeczy, o których rozmawialiśmy, takich jak APS, gdzie można faktycznie oddzielić atestatora i proponującego za pomocą niektórych projektów, nad którymi pracowaliśmy, musimy mieć FOCIL wdrożony wcześniej i musimy wiedzieć, że FOCIL działa. Potrzebujemy FOCIL w sieci głównej przez sześć miesięcy, rok, aby mieć pewność, że spełnia on swój cel, którym jest utrzymanie i poprawa właściwości odporności na cenzurę w Ethereum. Więc kolejną pilną kwestią, przynajmniej dla mnie, jest to, że jeśli chcemy chronić atestatorów przed grami na czas i kilkoma innymi problemami, którymi chcemy się zająć za pomocą APS, musimy wdrożyć FOCIL tak szybko, jak to możliwe.

**Pooja Ranjan:** Czasami smutno jest patrzeć, gdy propozycje nie zostają wybrane do następnej lub najbliższej aktualizacji, ale w jednej aktualizacji można uwzględnić tylko ograniczoną liczbę propozycji. Naprawdę doceniam całą ciężką pracę włożoną w zgłoszenie propozycji, jej gotowość, a także testy, które się z tym wiążą. Bardzo dziękuję za całą pracę, którą wykonujecie dla ekosystemu Ethereum.

#### Szybka runda (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Zanim skończymy, mamy szybką rundę pytań. Jedynym warunkiem jest to, że odpowiedź powinna składać się z jednego słowa lub jednego zdania, i postaramy się to zrobić z zegarkiem w ręku, może po 30 sekund na każde. Jeśli jesteście gotowi, zacznijmy od Juliana. Jaki jest obecnie najtrudniejszy problem w badaniach nad blockchainem?

**Julian Ma:** Nie będę zbytnio memiczny, więc odpowiem poważnie. Powiedziałbym, że najtrudniejszym problemem jest przyszłość stakingu: co oznacza przyszłość stakingu, jakie role pełnią poszczególni dostawcy usług, jak są za to wynagradzani i jak się do siebie odnoszą.

**Pooja Ranjan:** Jaki jest jeden przypadek użycia blockchaina, który nie został wystarczająco zbadany?

**Julian Ma:** Powiedziałbym, że FOCIL.

**Pooja Ranjan:** Jakie jest dziś największe zagrożenie dla bezpieczeństwa Ethereum?

**Julian Ma:** Szczerze mówiąc, powiedziałbym, że odporność na cenzurę jest tutaj bardzo krytyczna, ze względu na rzeczy takie jak wieloblokowe MEV, które mogą stanowić ogromne zagrożenie dla bezpieczeństwa, na przykład dla warstw 2 (L2).

**Pooja Ranjan:** Czy MEV powinno być minimalizowane, akceptowane, czy coś pomiędzy?

**Julian Ma:** W dużej mierze zgadzam się tutaj z podejściem Flashbots, że powinno być zdemokratyzowane, co oznacza, że powinno być maksymalizowane tam, gdzie jest to konieczne, i minimalizowane w warstwie aplikacji.

**Pooja Ranjan:** Czy decentralizacja jest zawsze warta kompromisów?

**Julian Ma:** Zazwyczaj jest warta kompromisów.

**Pooja Ranjan:** Jaka jest największa innowacja, którą Ethereum przyniosło światu?

**Julian Ma:** Tutaj chciałbym zacytować wystąpienie Mike'a Neudera z Devconu na temat cyfrowych praw własności. Powiedziałbym, że odporne na cenzurę cyfrowe prawa własności, które naprawdę zmieniają świat.

**Pooja Ranjan:** Bardzo dziękuję, świetna odpowiedź. Moja następna seria pytań jest do Thomasa. Więc, gdyby Ethereum nie istniało, nad jakim blockchainem byś pracował?

**Thomas Thiery:** Myślę, że będę bardzo memiczny, a Julian trochę mnie ubiegł, bo myślałem, że zrobi to samo. Tym blockchainem byłby FOCIL.

**Pooja Ranjan:** Jaki jest najbardziej przereklamowany przypadek użycia blockchaina?

**Thomas Thiery:** Żaden przypadek użycia nie jest wart szumu bez FOCIL.

**Pooja Ranjan:** Jaka jest jedna rzecz, którą Ethereum musi poprawić jak najszybciej?

**Thomas Thiery:** Odporność na cenzurę, za pomocą FOCIL.

**Pooja Ranjan:** Jedno słowo, by opisać decentralizację?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Czy myślisz, że Ethereum w pełni rozwiąże problem skalowalności?

**Thomas Thiery:** Ethereum z FOCIL, tak.

**Pooja Ranjan:** Skalowanie warstwy 1 (L1) czy skalowanie warstwy 2 (L2), co wygrywa?

**Thomas Thiery:** Nieskończone warstwy, wszystkie z FOCIL.

**Pooja Ranjan:** Bardzo dobrze, dziękuję ci bardzo, Thomas. Dziękuję za odpowiedzi na wszystkie te pytania. Zbliżając się do końca, chciałabym dać wam tę możliwość: czy macie jakąś wiadomość dla społeczności na temat tej propozycji, lub ogólnie dla społeczności Ethereum.

#### Wiadomości dla społeczności (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Właściwie to bardzo ważna kwestia, ponieważ cały czas prowadzimy aktywne dyskusje i wszystko jest publicznie dostępne na Discordzie. Na początku był nacisk, aby wszystko było publiczne, i ludzie faktycznie to robią, z czego bardzo się cieszę. Możecie śledzić dyskusje i postępy na publicznym Discordzie Eth R&D, na kanale inclusion-list. To w zasadzie tam wszystko się teraz dzieje. Możecie też skontaktować się z nami na Twitterze, Telegramie, gdziekolwiek. Śmiało.

Im z większą liczbą osób porozmawiamy i im więcej zaangażujemy, tym lepszy będzie projekt i lepsza będzie implementacja. Więc jeśli możecie w jakikolwiek sposób pomóc, odezwijcie się, a my chętnie pomożemy na wszystkich frontach, nawet po stronie badawczej. Myślę, że jeszcze bardziej pasuje nam współpraca z ludźmi, którzy chcą pracować nad przyszłością FOCIL. Wspomnieliśmy o prywatności, wspomnieliśmy o mechanizmach opłat transakcyjnych, i zamierzamy również mocno skupić się na FOCIL dla blobów. Wszystkie te rzeczy wymagają ludzi i wysiłku badawczego. Jeśli jesteście zainteresowani, odezwijcie się. Wielkie dzięki za zaproszenie i dziękujemy również za całą pracę, którą wykonujecie dla Ethereum.

**Julian Ma:** Dodam tylko, że mam nadzieję, iż udało nam się wzbudzić w niektórych entuzjazm do FOCIL. Jeśli jesteście entuzjastycznie nastawieni, dajcie nam znać. A jeśli nadal macie jakieś pytania, z przyjemnością na nie odpowiemy i mamy nadzieję, że uda nam się was przekonać, że FOCIL to rzeczywiście właściwa droga. Bardzo dziękuję. To była prawdziwa przyjemność tu być i dziękuję za poprowadzenie tej sesji. I oczywiście dziękuję również wszystkim za obecność.

#### Słowa końcowe (59:52) {#closing-words-5952}

**Pooja Ranjan:** Dziękuję. To by było na tyle. Ogromne podziękowania dla Thomasa i Juliana za dołączenie do nas dzisiaj i podzielenie się swoimi spostrzeżeniami na temat EIP-7805. Dziękuję wszystkim uczestnikom; wasze pytania są budujące i pouczające. Dziękujemy za uwagę. Jeśli podobała wam się ta rozmowa, pamiętajcie, aby polubić, zasubskrybować i udostępnić ten odcinek innym entuzjastom Ethereum. W programie PEEPanEIP będziemy wam przybliżać kolejne propozycje EIP i postępy w badaniach. Do zobaczenia następnym razem, mruczcie z zadowolenia ze zdobytej wiedzy i grasujcie po Ethereum razem z Ethereum Cat Herders. Życzę wspaniałej reszty dnia.