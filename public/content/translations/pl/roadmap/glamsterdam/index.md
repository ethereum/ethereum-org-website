---
title: Glamsterdam
description: "Dowiedz się więcej o aktualizacji protokołu Glamsterdam"
lang: pl
template: upgrade
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam to nadchodząca aktualizacja Ethereum zaplanowana na drugą połowę 2026 roku
</AlertTitle>
<AlertDescription>
Aktualizacja Glamsterdam to tylko jeden krok w długoterminowych celach rozwojowych Ethereum. Dowiedz się więcej o [mapie drogowej protokołu](/roadmap/) i [poprzednich aktualizacjach](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Nadchodząca aktualizacja Glamsterdam w sieci [Ethereum](/) ma na celu utorowanie drogi dla nowej generacji skalowania. Nazwa Glamsterdam pochodzi z połączenia słów „Amsterdam” (aktualizacja warstwy wykonawczej, nazwana na cześć poprzedniej lokalizacji Devconnect) i „Gloas” (aktualizacja warstwy konsensusu, nazwana na cześć gwiazdy).

W ślad za postępami poczynionymi w aktualizacji [Fusaka](/roadmap/fusaka/), Glamsterdam skupia się na skalowaniu warstwy 1 (L1) poprzez reorganizację sposobu, w jaki sieć przetwarza transakcje i zarządza swoją rosnącą bazą danych, fundamentalnie aktualizując sposób, w jaki Ethereum tworzy i weryfikuje bloki.

Podczas gdy Fusaka skupiała się na fundamentalnych ulepszeniach, Glamsterdam posuwa naprzód cele „Skalowania L1” i „Skalowania blobów” poprzez włączenie do protokołu podziału obowiązków między różnymi uczestnikami sieci oraz wprowadzenie bardziej wydajnych sposobów obsługi danych, aby przygotować [stan](/glossary/#state) na równoległość o wysokiej przepustowości.

Te ulepszenia zapewniają, że Ethereum pozostanie szybkie, przystępne cenowo i zdecentralizowane w miarę obsługiwania większej aktywności, przy jednoczesnym utrzymaniu wymagań sprzętowych na rozsądnym poziomie dla osób uruchamiających [węzły](/glossary/#node) w domu.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Ulepszenia rozważane dla Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Uwaga: Ten artykuł wyróżnia wybrane propozycje EIP zaplanowane do włączenia w aktualizacji Glamsterdam. Dodatkowe zaplanowane propozycje testowane w sieciach deweloperskich (devnets) obejmują EIP-7610, EIP-7688, EIP-7778, EIP-7843, EIP-7976, EIP-7981, EIP-8024, EIP-8246 i EIP-8282. Aby uzyskać najnowsze informacje o statusie, zobacz [aktualizację Glamsterdam na Forkcast](https://forkcast.org/upgrade/glamsterdam).

Jeśli chcesz dodać EIP, który jest rozważany dla Glamsterdam, ale nie został jeszcze dodany do tej strony, [dowiedz się, jak współtworzyć ethereum.org tutaj](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Aktualizacja Glamsterdam skupia się na trzech głównych celach:

- Przyspieszenie przetwarzania (równoległość): Reorganizacja sposobu, w jaki sieć rejestruje zależności danych, aby mogła bezpiecznie przetwarzać wiele transakcji w tym samym czasie, zamiast w powolnej sekwencji jedna po drugiej.
- Zwiększenie pojemności: Podział ciężkiej pracy związanej z tworzeniem i weryfikacją bloków, dając sieci więcej czasu na propagację większych ilości danych bez spowalniania.
- Zapobieganie rozrostowi bazy danych (zrównoważony rozwój): Dostosowanie opłat sieciowych, aby dokładnie odzwierciedlały długoterminowy koszt sprzętowy przechowywania nowych danych, odblokowując przyszłe wzrosty limitu gazu, jednocześnie zapobiegając spadkowi wydajności sprzętu.

Krótko mówiąc, Glamsterdam wprowadzi zmiany strukturalne, aby zapewnić, że w miarę jak sieć zwiększa pojemność, pozostaje zrównoważona, a wydajność utrzymuje się na wysokim poziomie.

## Skalowanie warstwy 1 (L1) i przetwarzanie równoległe {#scale-l1}

Znaczące skalowanie warstwy 1 (L1) wymaga odejścia od założeń dotyczących zaufania poza protokołem i ograniczeń związanych z wykonywaniem szeregowym. Glamsterdam rozwiązuje ten problem poprzez włączenie do protokołu podziału niektórych obowiązków związanych z budowaniem bloków i wprowadzenie nowych struktur danych, które pozwalają sieci przygotować się do przetwarzania równoległego.

### Główna propozycja: Wbudowana w protokół separacja proponującego i budującego (ePBS) {#epbs}

- Usuwa założenia dotyczące zaufania poza protokołem i poleganie na przekaźnikach (relays) stron trzecich
- Wspiera skalowanie warstwy 1 (L1), pozwalając na znacznie większe ładunki dzięki wydłużonym oknom propagacji
- Wprowadza niewymagające zaufania płatności dla budowniczych bezpośrednio do protokołu 
- Wymaga aktualizacji architektonicznych dla pul stakingowych, aby umożliwić niewymagające zaufania monitorowanie, chociaż ogólne doświadczenie użytkownika związane ze stakingiem ulega poprawie dzięki udoskonalonemu procesowi wyboru budowniczego

Obecnie proces proponowania i budowania bloków obejmuje przekazanie zadań między proponującymi bloki a budowniczymi bloków. Relacja między proponującymi a budowniczymi nie jest częścią głównego protokołu Ethereum, więc opiera się na zaufanym oprogramowaniu pośredniczącym stron trzecich, oprogramowaniu (przekaźnikach) i zaufaniu poza protokołem między podmiotami.

Relacja poza protokołem między proponującymi a budowniczymi tworzy również „gorącą ścieżkę” podczas walidacji bloku, która zmusza [walidatorów](/glossary/#validator) do pośpiesznego rozgłaszania i wykonywania transakcji w wąskim, 2-sekundowym oknie, ograniczając ilość danych, z którymi sieć może sobie poradzić.

**Wbudowana w protokół separacja proponującego i budującego (ePBS, czyli EIP-7732)** formalnie oddziela zadanie proponującego (który wybiera blok konsensusu) od budowniczego (który składa ładunek wykonawczy), włączając to przekazanie bezpośrednio do protokołu. 

Wbudowanie niewymagającej zaufania wymiany ładunku bloku na płatność bezpośrednio w protokół eliminuje potrzebę korzystania z oprogramowania pośredniczącego stron trzecich (takiego jak MEV-Boost). Jednak budowniczowie i proponujący mogą nadal decydować się na korzystanie z przekaźników lub oprogramowania pośredniczącego poza protokołem w przypadku złożonych funkcji, które nie są jeszcze częścią głównego protokołu. 

Aby rozwiązać problem wąskiego gardła „gorącej ścieżki”, ePBS wprowadza również Komitet Terminowości Ładunku (Payload Timeliness Committee - PTC) i logikę podwójnego terminu, pozwalając walidatorom na oddzielne poświadczanie bloku konsensusu i terminowości ładunku wykonawczego w celu maksymalizacji przepustowości.

<VideoWatch slug="proposer-builder-separation" />

Oddzielenie ról proponującego i budowniczego na poziomie protokołu wydłuża okno propagacji (czyli czas dostępny na rozpowszechnienie danych w sieci) z 2 sekund do około 9 sekund.

Zastępując oprogramowanie pośredniczące i przekaźniki poza protokołem mechaniką wewnątrz protokołu, ePBS zmniejsza zależności od zaufania i pozwala Ethereum bezpiecznie przetwarzać znacznie większe ilości danych (takie jak więcej blobów dla [warstw 2 (L2)](/glossary/#layer-2)) bez obciążania sieci.

**Zasoby**: [Specyfikacja techniczna EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Główna propozycja: Listy dostępu na poziomie bloku (BALs) {#bals}

- Eliminuje wąskie gardła przetwarzania sekwencyjnego, dostarczając z góry mapę wszystkich zależności transakcji, przygotowując grunt dla walidatorów do przetwarzania wielu transakcji równolegle zamiast jednej po drugiej
- Pozwala węzłom na aktualizację swoich rekordów poprzez odczytanie ostatecznych wyników bez konieczności ponownego odtwarzania każdej transakcji (synchronizacja bez wykonywania), co znacznie przyspiesza synchronizację węzła z siecią
- Eliminuje zgadywanie, pozwalając walidatorom na wstępne załadowanie wszystkich niezbędnych danych na raz, zamiast odkrywania ich krok po kroku, co znacznie przyspiesza walidację

Dzisiejsze Ethereum przypomina drogę jednopasmową; ponieważ sieć nie wie, jakich danych będzie potrzebować lub jakie zmieni transakcja (np. jakich kont dotknie transakcja), dopóki transakcja nie zostanie wykonana, walidatorzy muszą przetwarzać transakcje jedna po drugiej w ścisłej, sekwencyjnej kolejności. Gdyby spróbowali przetworzyć transakcje wszystkie na raz, nie znając tych zależności, dwie transakcje mogłyby przypadkowo spróbować zmienić dokładnie te same dane w tym samym czasie, powodując błędy.

**Listy dostępu na poziomie bloku (Block-Level Access Lists - BALs, czyli EIP-7928)** działają jak mapa dla sieci, wyszczególniając, do których części bazy danych nastąpi dostęp przed rozpoczęciem pracy. Warstwa wykonawcza przechowuje pełną listę dostępu do bloku, w tym każdą zmianę konta, której dotkną transakcje, wraz z ostatecznymi wynikami tych zmian (wszystkie dostępy do stanu i wartości po wykonaniu). Aby utrzymać lekkość bloków, nagłówek bloku zawiera nowe pole z unikalnym cyfrowym odciskiem palca (rekord hash) tej listy.

Ponieważ dają one natychmiastowy wgląd w to, które transakcje się nie nakładają, BALs pozwalają węzłom na wykonywanie równoległych odczytów z dysku, pobierając informacje dla wielu transakcji jednocześnie. Sieć może bezpiecznie grupować niepowiązane transakcje i przetwarzać je równolegle.

Ponieważ BAL zawiera ostateczne wyniki transakcji (wartości po wykonaniu), gdy węzły sieci muszą zsynchronizować się z obecnym stanem sieci, mogą skopiować te ostateczne wyniki, aby zaktualizować swoje rekordy. Walidatorzy nie muszą już odtwarzać wszystkich skomplikowanych transakcji od zera, aby wiedzieć, co się stało, co sprawia, że dołączanie nowych węzłów do sieci jest szybsze i łatwiejsze.

Równoległe odczyty z dysku umożliwione przez BALs będą znaczącym krokiem w kierunku przyszłości, w której Ethereum będzie mogło przetwarzać wiele transakcji na raz, znacznie zwiększając prędkość sieci.

#### Wymiana listy dostępu do bloku eth/71 {#bale}

Wymiana listy dostępu do bloku (Block Access List Exchange - eth/71 lub EIP-8159) jest bezpośrednim sieciowym uzupełnieniem list dostępu na poziomie bloku. Podczas gdy BALs odblokowują równoległe wykonywanie, eth/71 aktualizuje protokół peer-to-peer, aby umożliwić węzłom faktyczne udostępnianie tych list w sieci. Wymiana listy dostępu do bloku, obecnie wymagana dla wszystkich klientów warstwy wykonawczej, umożliwi szybszą synchronizację i pozwoli węzłom na wykonywanie aktualizacji stanu bez wykonywania (executionless).

**Zasoby**:

- [Specyfikacja techniczna EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Specyfikacja techniczna EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)


## Zrównoważony rozwój sieci {#network-sustainability}

W miarę jak sieć Ethereum staje się coraz szybsza, ważne jest, aby upewnić się, że koszt korzystania z niej odpowiada zużyciu sprzętu, na którym działa Ethereum. Sieć musi zwiększyć swoje ogólne limity pojemności, aby bezpiecznie się skalować i przetwarzać więcej transakcji.

### Wzrost kosztu gazu za tworzenie stanu {#state-creation-gas-cost-increase}

- Zapewnia, że opłaty za tworzenie nowych kont lub inteligentnych kontraktów dokładnie odzwierciedlają długoterminowe obciążenie, jakie nakładają one na bazę danych Ethereum
- Ustala stały **koszt za bajt stanu (cost per state byte - CPSB)**, celując w bezpieczne i przewidywalne tempo wzrostu na poziomie 120 GiB/rok, zapewniając, że standardowy sprzęt fizyczny może nadal obsługiwać sieć
- Oddziela księgowanie tych konkretnych opłat do nowego rezerwuaru, usuwając stare limity transakcji i pozwalając deweloperom na wdrażanie większych, bardziej złożonych aplikacji

Dodawanie nowych kont, tokenów i [inteligentnych kontraktów](/glossary/#smart-contract) tworzy trwałe dane (znane jako „stan”), które każdy komputer obsługujący sieć musi przechowywać w nieskończoność. Obecne opłaty za dodawanie lub odczytywanie tych danych są niespójne i niekoniecznie odzwierciedlają rzeczywiste, długoterminowe obciążenie pamięci masowej, jakie nakładają one na sprzęt sieciowy.

Niektóre działania, które tworzą stan w Ethereum, takie jak tworzenie nowych kont lub wdrażanie dużych inteligentnych kontraktów, były stosunkowo tanie w porównaniu do trwałej przestrzeni dyskowej, którą zajmują na węzłach sieci, na przykład wdrożenie kontraktu jest znacznie tańsze w przeliczeniu na bajt niż tworzenie slotów pamięci masowej.

Bez dostosowania, wzrost stanu Ethereum stałby się niezrównoważony w miarę skalowania sieci w kierunku dolnego limitu gazu wynoszącego 200 milionów, umożliwionego przez Glamsterdam (przy czym deweloperzy obecnie testują przy referencyjnym limicie gazu bloku wynoszącym 150 milionów, aby uzyskać dokładną wycenę stanu).

**Wzrost kosztu gazu za tworzenie stanu (czyli EIP-8037)** harmonizuje koszty, wiążąc je z rzeczywistym rozmiarem tworzonych danych, aktualizując opłaty tak, aby były proporcjonalne do ilości trwałych danych, które operacja tworzy lub do których uzyskuje dostęp.

EIP-8037 wprowadza również model rezerwuaru, aby zarządzać tymi kosztami w bardziej przewidywalny sposób; opłaty za gaz stanu są pobierane w pierwszej kolejności z `state_gas_reservoir`, a kod operacji `GAS` zwraca tylko `gas_left`, zapobiegając błędnemu obliczaniu dostępnego gazu przez ramki wykonawcze. Aby to wesprzeć, niezbędne zadania w tle otrzymują dodatkowy przydział paliwa, który trafia prosto do tej dedykowanej rezerwy, zapewniając, że krytyczne operacje sieciowe nie zakończą się niepowodzeniem tylko dlatego, że przechowywanie trwałych danych wymaga więcej zasobów.

Przed EIP-8037 zarówno praca obliczeniowa (aktywne przetwarzanie), jak i trwałe przechowywanie danych (zapisywanie inteligentnego kontraktu w bazie danych sieci) dzieliły ten sam limit gazu. Model rezerwuaru dzieli księgowanie: limit gazu na rzeczywistą pracę obliczeniową transakcji (przetwarzanie) i na długoterminowe przechowywanie danych (gaz stanu). Oddzielenie tych dwóch elementów pomaga zapobiec sytuacji, w której sam rozmiar danych aplikacji wyczerpuje limit gazu; dopóki deweloperzy zapewniają wystarczające środki na wypełnienie rezerwuaru na przechowywanie danych, mogą wdrażać znacznie większe i bardziej złożone inteligentne kontrakty.

Dokładniejsze i bardziej przewidywalne wycenianie przechowywania danych pomoże Ethereum bezpiecznie zwiększyć swoją prędkość i pojemność bez rozrostu bazy danych. Ten zrównoważony rozwój pozwoli operatorom węzłów na dalsze korzystanie ze (stosunkowo) przystępnego cenowo sprzętu przez nadchodzące lata, utrzymując dostępność domowego stakingu w celu zachowania decentralizacji sieci.

**Zasoby**: [Specyfikacja techniczna EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aktualizacja kosztu gazu za dostęp do stanu {#state-access-gas-cost-update}

- Zwiększa koszty gazu, gdy aplikacje odczytują lub aktualizują informacje trwale przechowywane w Ethereum (kody operacji dostępu do stanu), aby dokładnie odpowiadały pracy obliczeniowej wymaganej przez te polecenia
- Wzmacnia odporność sieci, zapobiegając atakom typu odmowa usługi (denial-of-service), które wykorzystują sztucznie tanie operacje odczytu danych

W miarę jak stan Ethereum rósł, czynność wyszukiwania i odczytywania starych danych („dostęp do stanu”) stała się cięższa i wolniejsza do przetworzenia dla węzłów. Opłaty za te działania pozostały takie same, mimo że wyszukiwanie informacji jest teraz nieco droższe (pod względem mocy obliczeniowej).

W rezultacie niektóre konkretne polecenia są obecnie niedoszacowane w stosunku do pracy, do której zmuszają węzeł. Na przykład `EXTCODESIZE` i `EXTCODECOPY` są niedoszacowane, ponieważ wymagają dwóch oddzielnych odczytów z bazy danych — jednego dla obiektu konta, a drugiego dla rzeczywistego rozmiaru kodu lub kodu bajtowego.

**Aktualizacja kosztu gazu za dostęp do stanu (czyli EIP-8038)** zwiększa stałe gazu dla kodów operacji dostępu do stanu, takich jak wyszukiwanie danych konta i kontraktu, aby dostosować je do wydajności nowoczesnego sprzętu i rozmiaru stanu.

Dostosowanie kosztu dostępu do stanu pomaga również uczynić Ethereum bardziej odpornym. Ponieważ te ciężkie działania polegające na odczycie danych są sztucznie tanie, złośliwy atakujący mógłby spamować sieć tysiącami złożonych żądań danych w jednym bloku przed osiągnięciem limitu opłat sieciowych, potencjalnie powodując zatrzymanie lub awarię sieci (atak typu odmowa usługi). Nawet bez złośliwych intencji, deweloperzy nie są ekonomicznie zachęcani do budowania wydajnych aplikacji, jeśli odczytywanie danych sieciowych jest zbyt tanie.

Dzięki dokładniejszemu wycenianiu działań związanych z dostępem do stanu, Ethereum może być bardziej odporne na przypadkowe lub celowe spowolnienia, podczas gdy dostosowanie kosztów sieciowych do obciążenia sprzętu stanowi bardziej zrównoważoną podstawę dla przyszłych wzrostów limitu gazu.

**Zasoby**: [Specyfikacja techniczna EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)


## Odporność sieci {#network-resilience}

Udoskonalenia obowiązków walidatorów i procesów wyjścia zapewniają stabilność sieci podczas zdarzeń masowego cięcia (mass-slashing) i demokratyzują płynność. Te ulepszenia sprawiają, że sieć jest bardziej stabilna i zapewniają, że wszyscy uczestnicy, duzi i mali, są traktowani sprawiedliwie.

### Wykluczenie ukaranych cięciem walidatorów z proponowania {#exclude-slashed-validators}

- Powstrzymuje ukaranych (poddanych cięciu) walidatorów przed wyborem do proponowania przyszłych bloków, eliminując gwarantowane pominięte sloty
- Utrzymuje płynne i niezawodne działanie Ethereum, zapobiegając poważnym przestojom w przypadku zdarzenia masowego cięcia

Obecnie, nawet jeśli walidator zostanie ukarany cięciem (ukarany za złamanie zasad lub niedziałanie zgodnie z oczekiwaniami), system może nadal wybrać go do prowadzenia bloku w niedalekiej przyszłości, gdy generuje przyszłe prognozy proponujących.

Ponieważ bloki od ukaranych cięciem proponujących są automatycznie odrzucane jako nieważne, powoduje to, że sieć pomija sloty i opóźnia odzyskiwanie sieci podczas zdarzeń masowego cięcia.

**Wykluczenie ukaranych cięciem walidatorów z proponowania (czyli EIP-8045)** po prostu odfiltrowuje ukaranych cięciem walidatorów z wyboru do przyszłych obowiązków. Poprawia to odporność łańcucha, zapewniając, że tylko zdrowi walidatorzy są wybierani do proponowania bloków, utrzymując jakość usług podczas zakłóceń w sieci.

**Zasoby**: [Specyfikacja techniczna EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Zwiększenie limitu rotacji dla wyjść i konsolidacji {#increase-exit-and-consolidation-churn}

- Znacznie skraca czas wypłat ze stakingu, pozwalając na skalowanie pojemności wyjść wraz z całkowitą ilością stakowanego ETH, zamiast ograniczania jej do stałej wartości
- Daje konsolidacjom walidatorów ich własną, dedykowaną pojemność kolejki, przyspieszając przejście na większe, bardziej wydajne walidatory
- Utrzymuje bezpieczeństwo sieci poprzez starannie przeanalizowane parametry bezpieczeństwa

Limit rotacji w Ethereum to limit bezpieczeństwa określający tempo, w jakim walidatory mogą wchodzić, wychodzić lub łączyć (konsolidować) swoje stakowane ETH, aby zapewnić, że bezpieczeństwo sieci nigdy nie zostanie zdestabilizowane. Obecnie wyjścia i aktywacje współdzielą jeden ograniczony limit, więc w okresach wysokiego popytu stakerzy mogą napotkać długie czasy oczekiwania na wypłatę swojego ETH. Konsolidacje, w których walidatory łączą się w większe, posiadające do 2048 ETH (umożliwione przez [aktualizację Pectra](/roadmap/pectra)), również konkurują o tę ograniczoną pojemność, co oznacza, że skonsolidowanie pełnego zestawu walidatorów zajęłoby lata przy obecnym tempie.

**Zwiększenie limitu rotacji dla wyjść i konsolidacji (czyli EIP-8061)** reorganizuje te limity w oddzielne ścieżki:

- Aktywacje walidatorów zachowują swój obecny, ograniczony limit bez zmian
- Wyjścia nie są już ograniczone i zamiast tego skalują się wraz z całkowitą ilością stakowanego ETH
- Konsolidacje otrzymują własną, dedykowaną pojemność, stanowiącą mniej więcej połowę połączonego limitu aktywacji i wyjść

Przy obecnych poziomach stakingu zwiększa to pojemność wyjść około 4-krotnie, a pojemność konsolidacji około 2-krotnie, co oznacza, że stakerzy mogą wypłacać swoje ETH znacznie szybciej w okresach wysokiego popytu, a sieć szybciej przechodzi na mniejszy, bardziej wydajny zestaw walidatorów.

Ponieważ stawka może szybciej wchodzić i wychodzić z sieci, zmiana ta w przybliżeniu o połowę skraca czas, przez jaki węzeł może pozostać offline, zanim będzie potrzebował niedawnego zaufanego punktu kontrolnego, aby bezpiecznie ponownie dołączyć do sieci (okres słabej subiektywności, z około 15,7 dnia do około 7 dni). Ten kompromis został starannie przeanalizowany, aby zapewnić utrzymanie bezpieczeństwa sieci.

**Zasoby**: [Specyfikacja techniczna EIP-8061](https://eips.ethereum.org/EIPS/eip-8061)

## Poprawa doświadczenia użytkowników i deweloperów {#improve-user-developer-experience}

Aktualizacja Glamsterdam w Ethereum ma na celu poprawę doświadczenia użytkownika, zwiększenie wykrywalności danych i obsługę rosnących rozmiarów wiadomości, aby zapobiec awariom synchronizacji. Ułatwia to śledzenie tego, co dzieje się onchain, jednocześnie zapobiegając problemom technicznym w miarę skalowania sieci.

### Zmniejszenie wewnętrznych kosztów gazu transakcji {#reduce-intrinsic-transaction-gas-costs}

- Obniża opłatę podstawową za transakcje, zmniejszając całkowity koszt prostej natywnej płatności w ETH
- Sprawia, że mniejsze transfery są bardziej przystępne cenowo, zwiększając opłacalność Ethereum jako rutynowego środka wymiany

Wszystkie transakcje Ethereum mają dziś zryczałtowaną podstawową opłatę za gaz, niezależnie od tego, jak proste lub złożone jest ich przetworzenie. **Zmniejszenie wewnętrznego gazu transakcji (czyli EIP-2780)** proponuje obniżenie tej opłaty podstawowej, aby standardowy transfer ETH między istniejącymi kontami był nawet o **71% tańszy**.

Zmniejszenie wewnętrznego gazu transakcji działa poprzez rozbicie opłaty transakcyjnej tak, aby odzwierciedlała tylko podstawową, niezbędną pracę, którą faktycznie wykonują komputery obsługujące sieć, taką jak weryfikacja podpisu cyfrowego i aktualizacja salda. Ponieważ podstawowa płatność w ETH nie wykonuje złożonego kodu ani nie przenosi dodatkowych danych, ta propozycja obniżyłaby jej opłatę, aby dopasować ją do jej lekkiego charakteru.

Propozycja wprowadza wyjątek dla tworzenia zupełnie nowych kont, aby zapobiec przytłoczeniu stanu sieci przez niższe opłaty. Jeśli transfer wysyła ETH na pusty, nieistniejący adres, sieć musi utworzyć dla niego nowy, trwały rekord. Do tworzenia tego konta dodawana jest dopłata za gaz, aby pomóc pokryć obciążenie związane z jego długoterminowym przechowywaniem.

Razem, EIP-2780 ma na celu uczynienie codziennych transferów między istniejącymi kontami bardziej przystępnymi cenowo, przy jednoczesnym zapewnieniu, że sieć jest nadal chroniona przed rozrostem bazy danych poprzez dokładne wycenianie prawdziwego wzrostu stanu.

**Zasoby**: [Specyfikacja techniczna EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministyczne wstępne wdrożenie fabryki (Deterministic Factory Predeploy) {#deterministic-factory-predeploy}

- Daje deweloperom natywny sposób na wdrażanie aplikacji i portfeli inteligentnych kontraktów pod dokładnie tym samym adresem w wielu łańcuchach
- Pozwala użytkownikom na posiadanie tego samego adresu inteligentnego portfela w wielu sieciach warstwy 2 (L2), zmniejszając obciążenie poznawcze, redukując zamieszanie i zmniejszając ryzyko przypadkowej utraty środków
- Zastępuje obejścia, których deweloperzy obecnie używają do osiągnięcia tego parytetu, ułatwiając i zwiększając bezpieczeństwo budowania wielołańcuchowych portfeli i aplikacji

Jeśli użytkownik posiada dziś portfel inteligentnych kontraktów z kontami w wielu łańcuchach kompatybilnych z Maszyną Wirtualną Ethereum (EVM), często kończy z zupełnie innym adresem w różnych sieciach. Jest to nie tylko mylące, ale może prowadzić do przypadkowej utraty środków.

**Deterministyczne wstępne wdrożenie fabryki (czyli EIP-7997)** daje deweloperom natywny, wbudowany sposób na wdrażanie ich zdecentralizowanych aplikacji i portfeli inteligentnych kontraktów pod dokładnie tym samym adresem w wielu łańcuchach EVM, w tym w sieci głównej Ethereum, sieciach warstwy 2 (L2) i innych. Jeśli zostanie przyjęte, pozwoliłoby to użytkownikowi na posiadanie dokładnie tego samego adresu w każdym uczestniczącym łańcuchu, znacznie zmniejszając obciążenie poznawcze i potencjał błędu użytkownika.

Deterministyczne wstępne wdrożenie fabryki działa poprzez trwałe umieszczenie minimalnego, wyspecjalizowanego programu fabryki w identycznej lokalizacji (konkretnie pod adresem 0x12) w każdym uczestniczącym łańcuchu kompatybilnym z EVM. Jego celem jest zapewnienie uniwersalnego, standardowego kontraktu fabryki, który może zostać przyjęty przez dowolną sieć kompatybilną z EVM; dopóki łańcuch EVM uczestniczy i przyjmuje ten standard, deweloperzy będą mogli go używać do wdrażania swoich inteligentnych kontraktów pod dokładnie tym samym adresem w tej sieci.

Ta standaryzacja upraszcza budowanie i zarządzanie aplikacjami międzyłańcuchowymi dla deweloperów i szerszego ekosystemu. Deweloperzy nie muszą już pisać niestandardowego, specyficznego dla łańcucha kodu, aby połączyć swoje oprogramowanie w różnych sieciach, zamiast tego używając tej uniwersalnej fabryki do wygenerowania dokładnie tego samego adresu dla swojej aplikacji wszędzie. Ponadto eksploratory bloków, usługi śledzenia i portfele mogą łatwiej identyfikować i łączyć te aplikacje i konta w różnych łańcuchach, tworząc bardziej zunifikowane i płynne środowisko wielołańcuchowe dla wszystkich uczestników opartych na Ethereum.

**Zasoby**: [Specyfikacja techniczna EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transfery i spalanie ETH emitują log {#eth-transfers-and-burns-emit-a-log}

- Automatycznie generuje trwały rekord (log) za każdym razem, gdy ETH jest transferowane lub spalane
- Naprawia historyczny martwy punkt, co pozwala aplikacjom, giełdom i mostom na niezawodne wykrywanie depozytów użytkowników bez narzędzi do śledzenia ad-hoc

W przeciwieństwie do tokenów (ERC-20), regularne transfery ETH między inteligentnymi kontraktami nie emitują wyraźnego pokwitowania (standardowego logu), co utrudnia giełdom i aplikacjom ich śledzenie.

Transfery i spalanie ETH emitują log (czyli EIP-7708) sprawia, że sieć ma obowiązek emitować standardowe zdarzenie logu za każdym razem, gdy niezerowa ilość ETH jest przenoszona lub spalana.

Sprawi to, że dokładne śledzenie depozytów i ruchów bez niestandardowych narzędzi będzie znacznie łatwiejsze i bardziej niezawodne dla portfeli, giełd i operatorów mostów.

**Zasoby**: [Specyfikacja techniczna EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Częściowe listy pokwitowań bloków eth/70 {#eth-70-partial-block-receipt-lists}

W miarę jak zwiększamy ilość pracy, którą może wykonać Ethereum, listy pokwitowań dla tych działań (rekordy danych tych transakcji) stają się tak duże, że mogłyby potencjalnie spowodować awarię węzłów sieci podczas próby synchronizacji danych między sobą.

Częściowe listy pokwitowań bloków eth/70 (czyli EIP-7975), będące obecnie wymogiem dla wszystkich klientów warstwy wykonawczej, wprowadzają nowy sposób komunikacji między węzłami (eth/70), który pozwala na podzielenie tych dużych list na mniejsze, łatwiejsze do zarządzania części. eth/70 wprowadza system paginacji dla protokołu komunikacyjnego sieci, który pozwala węzłom na dzielenie list pokwitowań bloków i bezpieczne żądanie danych w mniejszych, łatwiejszych do zarządzania fragmentach.

Ta zmiana zapobiegłaby awariom synchronizacji sieci w okresach dużej aktywności. Ostatecznie toruje to drogę dla Ethereum do zwiększenia pojemności bloków i przetwarzania większej liczby transakcji na blok w przyszłości, bez przytłaczania fizycznego sprzętu synchronizującego łańcuch.

**Zasoby**: [Specyfikacja techniczna EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)


## Dalsza lektura {#further-reading}

- [Mapa drogowa Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Ogłoszenie na blogu: Aktualizacja priorytetów protokołu na 2026 rok](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Post-kwantowe Ethereum, nadchodzi Glamsterdam](https://www.youtube.com/watch?v=qx9sd50uQjQ)


## Często zadawane pytania (FAQ) {#faq}

### Jak można przekonwertować ETH po twardym rozwidleniu Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Twoje ETH nie wymaga żadnych działań**: Nie ma potrzeby konwertowania ani aktualizowania ETH po aktualizacji Glamsterdam. Salda Twoich kont pozostaną takie same, a ETH, które obecnie posiadasz, pozostanie dostępne w swojej dotychczasowej formie po twardym rozwidleniu.
- **Uważaj na oszustwa!** <Emoji text="⚠️" /> **każdy, kto instruuje Cię, aby „zaktualizować” Twoje ETH, próbuje Cię oszukać.** Nie musisz nic robić w związku z tą aktualizacją. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie poinformowanym to najlepsza obrona przed oszustwami.

[Więcej o rozpoznawaniu i unikaniu oszustw](/security/)

### Czy aktualizacja Glamsterdam wpływa na wszystkie węzły i walidatory Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Tak, aktualizacja Glamsterdam wymaga aktualizacji zarówno [klientów wykonawczych, jak i klientów konsensusu](/developers/docs/nodes-and-clients/). Ponieważ ta aktualizacja wprowadza wbudowaną w protokół separację proponującego i budującego (ePBS), operatorzy węzłów będą musieli upewnić się, że ich klienci są zaktualizowani, aby obsługiwać nowe sposoby budowania, walidacji i poświadczania bloków przez sieć.

Wszyscy główni klienci Ethereum wydadzą wersje obsługujące twarde rozwidlenie oznaczone jako wysoki priorytet. Możesz śledzić, kiedy te wydania będą dostępne w repozytoriach klientów na GitHub, na ich [kanałach Discord](https://ethstaker.org/support), na [Discordzie EthStaker](https://dsc.gg/ethstaker) lub subskrybując blog Ethereum, aby otrzymywać aktualizacje protokołu.

Aby utrzymać synchronizację z siecią Ethereum po aktualizacji, operatorzy węzłów muszą upewnić się, że używają obsługiwanej wersji klienta. Należy pamiętać, że informacje o wydaniach klientów są wrażliwe na czas, a użytkownicy powinni odnosić się do najnowszych aktualizacji, aby uzyskać najbardziej aktualne szczegóły.

### Jako staker, co muszę zrobić w związku z aktualizacją Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Podobnie jak w przypadku każdej aktualizacji sieci, upewnij się, że zaktualizowałeś swoich klientów do najnowszych wersji oznaczonych jako obsługujące Glamsterdam. Śledź aktualizacje na liście mailingowej i [Ogłoszenia dotyczące protokołu na blogu EF](https://blog.ethereum.org/category/protocol), aby być na bieżąco z wydaniami.

Aby zweryfikować swoją konfigurację przed aktywacją Glamsterdam w sieci głównej (Mainnet), możesz uruchomić walidator w sieciach testowych. Rozwidlenia sieci testowych są również ogłaszane na liście mailingowej i blogu.

### Jakie ulepszenia dla skalowania warstwy 1 (L1) będzie zawierać Glamsterdam? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Główną funkcją jest ePBS (EIP-7732), która oddziela ciężkie zadanie walidacji transakcji sieciowych od zadania osiągania konsensusu. Wydłuża to okno propagacji danych z 2 sekund do około 9 sekund, odblokowując zdolność Ethereum do bezpiecznej obsługi znacznie wyższej przepustowości transakcji i pomieszczenia większej liczby blobów danych dla sieci warstwy 2 (L2).

### Czy Glamsterdam obniży opłaty w Ethereum (warstwa 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Tak, Glamsterdam najprawdopodobniej obniży opłaty dla codziennych użytkowników! Zmniejszenie wewnętrznego gazu transakcji (czyli EIP-2780) obniża opłatę podstawową za wysyłanie ETH, sprawiając, że używanie ETH do codziennych płatności będzie znacznie tańsze.

Ponadto, w celu zapewnienia długoterminowego zrównoważonego rozwoju, Glamsterdam wprowadza listy dostępu na poziomie bloku (BALs). Umożliwia to przetwarzanie równoległe i przygotowuje warstwę 1 (L1) do bezpiecznej obsługi wyższych ogólnych limitów gazu w przyszłości, co prawdopodobnie obniży koszty gazu na transakcję w miarę wzrostu pojemności.

### Jak Glamsterdam wpłynie na pamięć masową węzłów i wymagania sprzętowe? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Wiele propozycji EIP rozważanych dla Glamsterdam rozwiązuje problem spadku wydajności związanego ze wzrostem stanu:

- Wzrost kosztu gazu za tworzenie stanu (czyli EIP-8037) wprowadza ramy stałych kosztów (CPSB), aby celować w tempo wzrostu bazy danych stanu na poziomie 120 GiB/rok, zapewniając, że standardowy sprzęt fizyczny może nadal wydajnie obsługiwać sieć.
- Częściowe listy pokwitowań bloków eth/70 (czyli EIP-7975) pozwalają węzłom na żądanie paginowanych pokwitowań bloków, co dzieli ciężkie pod względem danych listy pokwitowań bloków na mniejsze fragmenty, aby zapobiec awariom i problemom z synchronizacją w miarę skalowania Ethereum.
