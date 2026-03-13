---
title: Glamsterdam
description: "Dowiedz się więcej o aktualizacji protokół Glamsterdam"
lang: pl
---
# Glamsterdam {#glamsterdam}


<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam to nadchodząca aktualizacja Ethereum zaplanowana na pierwszą połowę 2026 roku
</AlertTitle>
<AlertDescription>
Aktualizacja Glamsterdam to tylko jeden z kroków w długoterminowych celach rozwojowych Ethereum. Dowiedz się więcej o [plan działania protokół](/roadmap/) i [poprzednich aktualizacjach](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Nadchodząca aktualizacja [Ethereum](/) o nazwie Glamsterdam ma na celu przygotowanie gruntu pod kolejną generację skalowanie. Nazwa Glamsterdam pochodzi od połączenia „Amsterdam” (aktualizacja warstwa wykonawcza, nazwana na cześć poprzedniej lokalizacji Devconnect) i „Gloas” (aktualizacja warstwa konsensusu, nazwana na cześć gwiazdy).

Po postępach poczynionych w ramach aktualizacji [Fusaka](/roadmap/fusaka/), Glamsterdam skupia się na skalowanie L1 poprzez reorganizację sposobu, w jaki sieć przetwarza transakcje i zarządza swoją rosnącą bazą danych, fundamentalnie aktualizując sposób, w jaki Ethereum tworzy i weryfikuje bloki.

Podczas gdy Fusaka skupiała się na podstawowych udoskonaleniach, Glamsterdam realizuje cele „Scale L1” i „Scale Blobs”, ustanawiając podział obowiązków między różnymi uczestnikami sieć i wprowadzając bardziej wydajne sposoby obsługi danych w celu przygotowania [stan](/glossary/#state) do wysokowydajnej paralelizacji. 

Te ulepszenia zapewniają, że Ethereum pozostaje szybki, przystępny cenowo i zdecentralizowany w miarę obsługi większej liczby działań, przy jednoczesnym utrzymaniu rozsądnych wymagań sprzętowych dla osób uruchamiających [węzły](/glossary/#node) w domu.

<YouTube id="GgKveVMLnoo" />

## Rozważane ulepszenia dla Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Uwaga: Ten artykuł przedstawia wybrane EIP, które są rozważane do włączenia do Glamsterdam. Najnowsze informacje o statusie można znaleźć w [aktualizacji Glamsterdam na Forkcast](https://forkcast.org/upgrade/glamsterdam). 

Jeśli chcesz dodać EIP, który jest rozważany dla Glamsterdam, ale nie został jeszcze dodany do tej strony, [dowiedz się, jak wnieść swój wkład w ethereum.org tutaj](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Ulepszenie Glamsterdam koncentruje się na trzech głównych celach:

- Przyspieszenie przetwarzania (paralelizacja): reorganizacja sposobu, w jaki sieć rejestruje zależności danych, tak aby mogła bezpiecznie przetwarzać wiele transakcje jednocześnie, zamiast w powolnej sekwencji jedna po drugiej.
- Zwiększenie wydajności: Rozdzielenie ciężkich zadań związanych z tworzeniem i weryfikacją bloki, co daje sieć więcej czasu na propagację większych ilości danych bez spowalniania.
- Zapobieganie rozrastaniu się bazy danych (zrównoważony rozwój): Dostosowanie opłat sieć w celu dokładnego odzwierciedlenia długoterminowych kosztów sprzętowych związanych z przechowywaniem nowych danych, odblokowanie przyszłych podwyżek limit gazu przy jednoczesnym zapobieganiu pogorszeniu wydajności sprzętu.

Krótko mówiąc, Glamsterdam wprowadzi zmiany strukturalne, aby zapewnić, że w miarę zwiększania przepustowości sieć, pozostanie ona zrównoważona, a jej wydajność wysoka.

## Skalowanie L1 i przetwarzanie równoległe {#scale-l1}

Znaczące skalowanie L1 wymaga odejścia od założeń zaufania poza protokołem i ograniczeń wykonywania szeregowego. Glamsterdam rozwiązuje ten problem, wprowadzając podział niektórych obowiązków związanych z tworzeniem bloków i nowe struktury danych, które pozwalają sieć przygotować się do równoległego przetwarzania.

### Propozycja główna: Ustanowienie rozdzielenia ról proponent bloku-builder (ePBS) {#epbs}

- Eliminuje założenia dotyczące zaufania spoza protokołu i poleganie na przekaźnikach zewnętrznych
- Umożliwia skalowanie L1, pozwalając na przesyłanie znacznie większych ładunków dzięki rozszerzonym oknom propagacji
- Wprowadza bezpośrednie, bezdowierzeniale płatności dla builderów do protokołu

Obecnie proces proponowania i tworzenia bloków obejmuje przekazywanie zadań między podmiotami proponującymi bloki a podmiotami je tworzącymi. Relacja między podmiotami proponującymi a tworzącymi bloki nie jest częścią podstawowego protokołu Ethereum, więc opiera się na zaufanym oprogramowaniu pośredniczącym innych firm (przekaźnikach) oraz na zaufaniu między podmiotami poza protokołem.

Pozaprotokołowe relacje między proponentami bloków a builderami tworzą również „gorącą ścieżkę” podczas walidacji bloków, która zmusza [walidatorów](/glossary/#validator) do szybkiego nadawania i wykonywania transakcji w ścisłym 2-sekundowym oknie, ograniczając ilość danych, jaką sieć może obsłużyć.

**Ustanowienie rozdzielenia ról proponent-builder (ePBS lub EIP-7732)** formalnie rozdziela zadanie proponenta (który wybiera blok konsensusu) od zadania buildera (który składa ładunek wykonawczy), wpisując ten proces bezpośrednio w protokół.

Wbudowanie bezdowierzenialnej wymiany ładunku bloku za płatność bezpośrednio w protokole eliminuje potrzebę korzystania z oprogramowania pośredniczącego innych firm (takiego jak MEV-Boost). Jednakże builderzy i proponenci mogą nadal korzystać z przekaźników lub oprogramowania pośredniczącego spoza protokołu w celu obsługi złożonych funkcji, które nie są jeszcze częścią podstawowego protokołu.

Aby rozwiązać problem wąskiego gardła „gorącej ścieżki”, ePBS wprowadza również Payload Timeliness Committee (PTC) i logikę podwójnego terminu, pozwalając walidatorom poświadczać blok konsensusu i terminowość ładunku wykonawczego oddzielnie, aby zmaksymalizować przepustowość.

<YouTube id=”u8XvkTrjITs” />

Oddzielenie ról proponującego i konstruktora na poziomie protokołu rozszerza okno propagacji (lub czas dostępny do rozpowszechniania danych w sieci) z 2 sekund do około 9 sekund.

Zastąpienie oprogramowania pośredniczącego i przekaźników spoza protokołu mechanizmami wbudowanymi w protokół pozwala ePBS zmniejszyć zależności od zaufania i umożliwia Ethereum bezpiecznie przetwarzać znacznie większe ilości danych (takie jak więcej blobów dla [warstw 2](/glossary/#layer-2)) bez obciążania sieci.

**Zasoby**: [Specyfikacja techniczna EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Propozycja główna: Listy kontroli dostępu na poziomie bloku (BAL) {#bals}

- Eliminuje wąskie gardła w przetwarzaniu sekwencyjnym, zapewniając wstępną mapę wszystkich zależności transakcja, co umożliwia walidatorzy przetwarzanie wielu transakcje równolegle, zamiast jednej po drugiej.
- Umożliwia węzłom aktualizowanie swoich rekordów poprzez odczytywanie ostatecznych wyników bez konieczności odtwarzania każdej transakcja (synchronizacja bez wykonywania), dzięki czemu synchronizacja węzeł z sieć jest znacznie szybsza. 
- Eliminuje zgadywanie, umożliwiając walidatorzy wstępne załadowanie wszystkich niezbędnych danych jednocześnie, zamiast odkrywania ich krok po kroku, co znacznie przyspiesza walidację. 

Dzisiejszy Ethereum jest jak droga jednopasmowa; ponieważ sieć nie wie, jakich danych będzie potrzebować transakcja lub jakie dane zmieni (np. które konta transakcja dotknie), dopóki transakcja nie zostanie uruchomiona, walidatorzy muszą przetwarzać transakcje pojedynczo w ścisłej, sekwencyjnej kolejności. Gdyby próbowali przetwarzać transakcje wszystkie naraz, nie znając tych zależności, dwie transakcje mogłyby przypadkowo próbować zmienić dokładnie te same dane w tym samym czasie, powodując błędy.

**Listy dostępu na poziomie bloków (BAL, lub EIP-7928)** są jak mapa dołączona do każdego blok, która informuje sieć, do których części bazy danych będzie dostęp przed rozpoczęciem pracy. BAL wymagają, aby każdy blok zawierał hasz każdej zmiany konto, której dotkną transakcje, wraz z ostatecznymi wynikami tych zmian (rekord hasz wszystkich dostępów do stan i wartości po wykonaniu). 

Ponieważ zapewniają natychmiastową widoczność transakcje, które się nie pokrywają, BAL-e umożliwiają węzłom równoległe odczyty z dysku, pobierając informacje dla wielu transakcje jednocześnie. sieć może bezpiecznie grupować niezwiązane transakcje i przetwarzać je równolegle. 

Ponieważ BAL zawiera ostateczne wyniki transakcje (wartości po wykonaniu), gdy węzły sieci muszą zsynchronizować się z bieżącym stan sieci, mogą skopiować te ostateczne wyniki, aby zaktualizować swoje dane. Walidatory nie muszą już odtwarzać wszystkich skomplikowanych transakcje od zera, aby wiedzieć, co się stało, co sprawia, że dołączenie nowych węzłów do sieć jest szybsze i łatwiejsze. 

Równoległe odczyty dysków, umożliwione przez BAL-e, będą znaczącym krokiem w kierunku przyszłości, w której Ethereum będzie mogło przetwarzać wiele transakcje jednocześnie, znacznie zwiększając szybkość sieci.

#### eth/71 wymiana listy dostępu do blok {#bale}

Wymiana list dostępu do bloków (eth/71 lub EIP-8159) jest bezpośrednim uzupełnieniem sieciowym list dostępu na poziomie bloków. Podczas gdy listy dostępu do bloków odblokowują równoległe wykonanie, eth/71 ulepsza protokół peer-to-peer, aby umożliwić węzłom faktyczne udostępnianie tych list w sieć. Wdrożenie wymiany list dostępu do blok umożliwi szybszą synchronizację i pozwoli węzłom na wykonywanie aktualizacji stan bez wykonania.

**Zasoby**: 
- [Specyfikacja techniczna EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Specyfikacja techniczna EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Zrównoważony rozwój sieci {#network-sustainability}

W miarę szybszego rozwoju sieć Ethereum ważne jest, aby upewnić się, że koszt jej użytkowania odpowiada zużyciu sprzętu, na którym działa Ethereum. sieć musi zwiększyć swoje ogólne limity pojemności, aby bezpiecznie skalować i przetwarzać więcej transakcje. 

### Wzrost kosztów gaz przy tworzeniu stanu {#state-creation-gas-cost-increase}

- Zapewnia, że opłaty za tworzenie nowych kont lub inteligentnych kontraktów dokładnie odzwierciedlają długoterminowe obciążenie, jakie nakładają one na bazę danych Ethereum.
- Automatycznie dostosowuje te opłaty za tworzenie danych w oparciu o ogólną wydajność sieci, dążąc do bezpiecznego i przewidywalnego tempa wzrostu, aby standardowy sprzęt fizyczny mógł nadal obsługiwać sieć.
- Oddziela rozliczanie tych konkretnych opłat do nowego zasobu, usuwając stare limity transakcja i umożliwiając programistom wdrażanie większych, bardziej złożonych aplikacji.

Dodawanie nowych kont, tokenów i [inteligentnych kontraktów](/glossary/#smart-contract) tworzy trwałe dane (znane jako „stan”), które każdy komputer działający w sieć musi przechowywać bezterminowo. Obecne opłaty za dodawanie lub odczytywanie tych danych są niespójne i niekoniecznie odzwierciedlają rzeczywiste, długoterminowe obciążenie pamięci, jakie nakładają na sprzęt sieciowy.

Niektóre działania, które tworzą stan w sieci Ethereum, takie jak tworzenie nowych kont lub wdrażanie dużych inteligentnych kontraktów, były stosunkowo tanie w porównaniu do trwałego miejsca do przechowywania, które zajmują w węzłach sieci. Na przykład wdrożenie kontraktu jest znacznie tańsze za bajt niż tworzenie miejsc do przechowywania. 

Bez dostosowania stan Ethereum mógłby wzrosnąć o prawie 200 GiB rocznie, jeśli sieć skalowałaby się do limitu 100M gazu, ostatecznie przewyższając możliwości typowego sprzętu. 

**Zwiększenie kosztów gaz przy tworzeniu stanu (lub EIP-8037)** harmonizuje koszty, wiążąc je z rzeczywistym rozmiarem tworzonych danych, aktualizując opłaty tak, aby były proporcjonalne do ilości trwałych danych, które operacja tworzy lub do których uzyskuje dostęp. 

EIP-8037 wprowadza również model rezerwuaru, aby zarządzać tymi kosztami w bardziej przewidywalny sposób; opłaty za gaz stan pobierane są najpierw z `state_gas_reservoir`, a kod operacji `GAS` zwraca tylko `gas_left`, zapobiegając błędnemu obliczeniu dostępnego gaz przez ramki wykonania.

Przed EIP-8037 zarówno praca obliczeniowa (aktywne przetwarzanie), jak i trwałe przechowywanie danych (zapisywanie inteligentny kontrakt w bazie danych sieci) miały ten sam limit gazu. Model zbiornika rozdziela rozliczanie: limit gazu dla faktycznej pracy obliczeniowej transakcja (przetwarzania) i dla długoterminowego przechowywania danych ( gaz stan ). Rozdzielenie tych dwóch elementów pomaga zapobiec temu, aby sam rozmiar danych aplikacji nie przekraczał limit gazu; dopóki deweloperzy zapewnią wystarczające środki do wypełnienia zbiornika do przechowywania danych, mogą wdrażać znacznie większe i bardziej złożone inteligentne umowy. 

Dokładniejsze i bardziej przewidywalne wycenianie przechowywania danych pomoże Ethereum bezpiecznie zwiększyć swoją szybkość i pojemność bez nadmiernego rozrastania bazy danych. Ta zrównoważona polityka pozwoli operatorom węzeł na dalsze używanie (stosunkowo) przystępnego cenowo sprzętu przez wiele lat, utrzymując dostępność staking w warunkach domowych w celu zachowania zdecentralizowanej sieci.

**Zasoby**: [Specyfikacja techniczna EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aktualizacja kosztów gaz w ramach programu State-Access {#state-access-gas-cost-update}

- Zwiększa koszty gaz dla aplikacji odczytujących lub aktualizujących informacje trwale przechowywane w Ethereum (kody operacji dostępu do stanu), aby dokładnie odpowiadały pracy obliczeniowej wymaganej przez te polecenia.
- Wzmacnia odporność sieci poprzez zapobieganie atakom typu odmowa usługi, które wykorzystują sztucznie zaniżone koszty operacji odczytu danych

W miarę jak stan Ethereum rósł, wyszukiwanie i odczytywanie starych danych („dostęp do stan ”) stawało się coraz bardziej obciążające i wolniejsze dla węzłów. Opłaty za te działania pozostały takie same, mimo że wyszukiwanie informacji jest teraz nieco droższe (pod względem mocy obliczeniowej). 

W rezultacie niektóre konkretne polecenia są obecnie niedoceniane w stosunku do pracy, którą zmuszają węzeł do wykonania. Na przykład `EXTCODESIZE` i `EXTCODECOPY` są niedoceniane, ponieważ wymagają dwóch oddzielnych odczytów z bazy danych — jednego dla obiektu konto i drugiego dla rzeczywistego rozmiaru kodu lub bajtkodu.

**Aktualizacja kosztów gaz dla dostępu do stanu (lub EIP-8038)** zwiększa stałe gaz dla kodów operacji dostępu do stanu, takich jak wyszukiwanie danych konto i kontraktu, aby dostosować je do wydajności nowoczesnego sprzętu i rozmiaru stan. 

Ujednolicenie kosztów dostępu do stanu pomaga również zwiększyć odporność sieci Ethereum. Ponieważ te intensywne operacje odczytu danych są sztucznie tanie, złośliwy atakujący mógłby zasypać sieć tysiącami złożonych żądań danych w jednym blok, zanim osiągnie limit opłat sieci, potencjalnie powodując sieć spowolnienie lub awarię (atak typu DoS). Nawet bez złych intencji, deweloperzy nie są ekonomicznie zachęcani do tworzenia wydajnych aplikacji, jeśli odczyt danych sieć jest zbyt tani.

Dzięki dokładniejszemu wycenianiu działań związanych z dostępem do stanu, Ethereum może być bardziej odporne na przypadkowe lub celowe spowolnienia, a dostosowanie kosztów sieć do obciążenia sprzętowego okazuje się bardziej zrównoważoną podstawą do przyszłych podwyżek limit gazu.

**Zasoby**: [Specyfikacja techniczna EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Odporność sieci 

Usprawnienia w obowiązkach walidator i procesach wyjścia zapewniają stabilność sieć podczas masowych zdarzeń slashingowych i demokratyzują płynność. Te ulepszenia sprawiają, że sieć jest bardziej stabilna i zapewniają, że wszyscy uczestnicy, zarówno duzi, jak i mali, są traktowani sprawiedliwie.

### Wyklucz walidatorzy z obniżonym limitem z proponowania {#exclude-slashed-validators}

- Uniemożliwia wybór ukaranych (zdyskwalifikowanych) walidatorzy do proponowania przyszłych bloki, eliminując gwarantowane pominięte sloty.
- Zapewnia płynne i niezawodne działanie Ethereum, zapobiegając poważnym przestojom w przypadku masowego cięcie.

Obecnie, nawet jeśli walidator zostanie ukarany (za naruszenie zasad lub niedziałanie zgodnie z oczekiwaniami), system może nadal wybrać go do prowadzenia blok w niedalekiej przyszłości, gdy generuje przyszłe podpowiedzi dla propozytora. 

Ponieważ bloki od proponentów bloku, których stawki zostały obcięte, są automatycznie odrzucane jako nieprawidłowe, powoduje to, że sieć pomija sloty i opóźnia odzyskiwanie sieć podczas masowych cięcie stawek. 

**Wykluczenie ukaranych walidatorzy z proponowania (lub EIP-8045)** po prostu odfiltrowuje ukaranych walidatorzy z wyboru do przyszłych zadań. Poprawia to odporność łańcucha, zapewniając, że tylko zdrowi walidatorzy są wybierani do proponowania bloki, utrzymując jakość usług podczas zakłóceń sieć.

**Zasoby**: [Specyfikacja techniczna EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Zezwól wyjściom na korzystanie z kolejki konsolidacji {#let-exits-use-the-consolidation-queue}

- Zamyka lukę prawną, która pozwala walidatorzy z dużymi saldami opuszczać sieć szybciej niż walidatorzy z mniejszymi saldami za pośrednictwem kolejki konsolidacyjnej. 
- Umożliwia regularnym wypłatom przechodzenie do tej drugiej kolejki, gdy ma ona wolną przestrzeń, skracając czas wypłat środków ze staking w okresach wzmożonego ruchu.
- Utrzymuje ścisłe zabezpieczenia, aby uniknąć zmiany podstawowych limitów bezpieczeństwa Ethereum lub osłabienia sieć.

Ponieważ [aktualizacja Pectra](/roadmap/pectra) zwiększyła maksymalny efektywny depozyt dla walidatorzy Ethereum z 32 ETH do 2048 ETH, luka techniczna pozwala walidatorzy z wysokimi depozytami na szybsze wyjście z sieć niż walidatorzy z mniejszymi depozytami za pośrednictwem kolejki konsolidacyjnej.

**Zezwolenie na używanie kolejki konsolidacyjnej (lub EIP-8080) przez wyjścia** demokratyzuje kolejkę konsolidacyjną dla wszystkich wyjść ze staking, tworząc jedną, sprawiedliwą kolejkę dla wszystkich.  

Oto jak to działa obecnie:

- Limit churnu Ethereum to limit bezpieczeństwa dotyczący szybkości, z jaką walidatorzy mogą wchodzić, wychodzić lub łączyć (konsolidować) swoje postawione ETH, aby zapewnić, że bezpieczeństwo sieci nigdy nie zostanie zdestabilizowane.
- Ponieważ konsolidacja walidator jest cięższą akcją z większą liczbą ruchomych części niż standardowe wyjście walidator, zużywa ona większą część tego budżetu bezpieczeństwa (limit churn). 
- Dokładniej, protokół określa, że dokładny koszt bezpieczeństwa jednego standardowego wyjścia wynosi dwie trzecie (2/3) kosztu jednej konsolidacji.

Sprawiedliwsze kolejki wyjściowe pozwolą standardowym wyjściom pożyczać niewykorzystane miejsce z kolejki konsolidacyjnej w okresach dużego zapotrzebowania na wyjścia, stosując kurs wymiany „3 za 2” (na każde 2 niewykorzystane miejsca konsolidacyjne sieć może bezpiecznie przetworzyć 3 standardowe wyjścia). Ten współczynnik rotacji 3/2 równoważy popyt w kolejkach konsolidacyjnych i wyjściowych.

Demokratyzacja dostępu do kolejki konsolidacyjnej zwiększy do 2,5x szybkość, z jaką użytkownicy mogą wyjść ze swojej stawka w okresach wysokiego popytu, bez uszczerbku dla bezpieczeństwa sieć.

**Zasoby**: [Specyfikacja techniczna EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Poprawa doświadczeń użytkowników i deweloperów {#improve-user-developer-experience}

Aktualizacja Glamsterdam dla Ethereum ma na celu poprawę komfortu użytkowania, zwiększenie możliwości wyszukiwania danych i obsługę rosnących rozmiarów wiadomości w celu zapobiegania błędom synchronizacji. Ułatwia to śledzenie tego, co dzieje się na łańcuchu, jednocześnie zapobiegając problemom technicznym w miarę skalowania sieć.

### Zmniejsz wewnętrzne koszty gaz transakcja {#reduce-intrinsic-transaction-gas-costs}

- Obniża podstawowa opłata za transakcje, zmniejszając całkowity koszt prostej, natywnej płatności w ETH. 
- Dzięki temu mniejsze przelewy stają się bardziej przystępne cenowo, co zwiększa rentowność Ethereum jako rutynowego środka wymiany.

Wszystkie transakcje Ethereum mają dziś stałą podstawową opłata za gaz, niezależnie od tego, jak proste lub złożone jest ich przetwarzanie. **Zmniejszenie wewnętrznego gaz transakcja (lub EIP-2780)** proponuje obniżenie tej podstawowa opłata, aby standardowy transfer ETH między istniejącymi kontami był do 71% tańszy. 

Zmniejszenie wewnętrznego zużycia gaz transakcja poprzez rozbicie opłata transakcyjna tak, aby odzwierciedlała jedynie podstawową, niezbędną pracę, którą faktycznie wykonują komputery obsługujące sieć, taką jak weryfikacja podpis cyfrowy i aktualizacja salda. Ponieważ podstawowa płatność ETH nie wykonuje złożonego kodu ani nie przenosi dodatkowych danych, ta propozycja zmniejszyłaby jej opłatę, aby odpowiadała jej niewielkiemu obciążeniu. 

Propozycja wprowadza wyjątek dla tworzenia zupełnie nowych kont, aby niższe opłaty nie przeciążyły stan sieci. Jeśli transfer wysyła ETH na pusty, nieistniejący adres, sieć musi utworzyć dla niego trwały nowy rekord. Za utworzenie tego konto dodawana jest dopłata za gaz, aby pomóc pokryć długoterminowe koszty jego przechowywania. 

Ogólnie rzecz biorąc, EIP-2780 ma na celu obniżenie kosztów codziennych przelewów między istniejącymi kontami, jednocześnie zapewniając ochronę sieć przed nadmiernym rozmiarem bazy danych poprzez dokładne wycenianie rzeczywistego wzrostu stan.

**Zasoby**: [Specyfikacja techniczna EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministyczne wstępne wdrożenie fabryczne {#deterministic-factory-predeploy}

- Zapewnia programistom natywny sposób wdrażania aplikacji i portfeli inteligentny kontrakt pod dokładnie tym samym adres w wielu łańcuchach.
- Umożliwia użytkownikom posiadanie tego samego adres inteligentnego portfel w wielu sieciach warstwy 2 (L2), zmniejszając obciążenie poznawcze, redukując zamieszanie i zmniejszając ryzyko przypadkowej utraty środków. 
- Zastępuje obejścia, których obecnie używają programiści, aby osiągnąć tę równość, dzięki czemu tworzenie portfeli i aplikacji wielołańcuchowych jest łatwiejsze i bezpieczniejsze.

Jeśli użytkownik posiada dziś portfel inteligentny kontrakt z kontami w wielu sieciach kompatybilnych z maszyną wirtualną Ethereum (EVM), często kończy się to posiadaniem zupełnie innych adres w różnych sieciach. Jest to nie tylko mylące, ale może również prowadzić do przypadkowej utraty środków. 

**Deterministyczne fabryczne wdrożenie wstępne (lub EIP-7997)** zapewnia programistom natywny, wbudowany sposób wdrażania zdecentralizowany aplikacji i portfeli inteligentny kontrakt pod dokładnie tym samym adres w wielu sieciach EVM, w tym w sieci głównej Ethereum, sieciach warstwy 2 (L2) i innych. Jeśli zostanie przyjęte, umożliwi użytkownikom posiadanie dokładnie tego samego adres w każdym uczestniczącym łańcuchu, znacznie zmniejszając obciążenie poznawcze i potencjalne błędy użytkownika.

Deterministyczne fabryczne wstępne wdrożenie działa poprzez trwałe umieszczenie minimalnego, wyspecjalizowanego programu fabrycznego w identycznej lokalizacji (konkretnie adres 0x12) na każdym uczestniczącym łańcuchu kompatybilnym z EVM. Jego celem jest zapewnienie uniwersalnej, standardowej umowy fabrycznej, która może zostać przyjęta przez dowolną sieć kompatybilną z EVM; dopóki łańcuch EVM uczestniczy i przyjmuje ten standard, deweloperzy będą mogli go używać do wdrażania swoich inteligentnych kontraktów pod dokładnie tym samym adres w tej sieć. 

Ta standaryzacja upraszcza tworzenie i zarządzanie aplikacjami międzyłańcuchowymi dla programistów i szerszego ekosystemu. Programiści nie muszą już tworzyć niestandardowego, specyficznego dla danego łańcucha kodu, aby połączyć swoje oprogramowanie w różnych sieciach, zamiast tego używają tej uniwersalnej fabryki do generowania dokładnie tego samego adres dla swojej aplikacji wszędzie. Ponadto eksploratory blok, usługi śledzenia i portfele mogą łatwiej identyfikować i łączyć te aplikacje i konta w różnych łańcuchach, tworząc bardziej ujednolicone i płynne środowisko wielołańcuchowe dla wszystkich uczestników opartych na Ethereum. 

**Zasoby**: [Specyfikacja techniczna EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Przelewy i spalanie ETH emitują log {#eth-transfers-and-burns-emit-a-log}

- Automatycznie generuje trwały zapis (dziennik) za każdym razem, gdy ETH jest przesyłane lub spalane.
- Usuwa historyczną lukę, która pozwala aplikacjom, giełdom i mostom na niezawodne wykrywanie wpłat użytkowników bez użycia doraźnych narzędzi do śledzenia.

W przeciwieństwie do tokenów (ERC-20), zwykłe transfery ETH między inteligentnymi kontraktami nie generują wyraźnego potwierdzenia (standardowego logu), co utrudnia ich śledzenie przez giełdy i aplikacje.

Przelewy i spalanie ETH emitują log (lub EIP-7708), co sprawia, że sieć musi emitować standardowe zdarzenie logu za każdym razem, gdy przenoszona lub spalana jest niezerowa ilość ETH.

Dzięki temu portfele, giełdy i operatorzy most będą mogli znacznie łatwiej i bardziej niezawodnie śledzić depozyty i przepływy środków bez potrzeby stosowania niestandardowych narzędzi.

**Zasoby**: [Specyfikacja techniczna EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 częściowe listy odbiorców blok {#eth-70-partial-block-receipt-lists}

W miarę zwiększania ilości pracy, jaką może wykonać Ethereum, listy potwierdzeń tych działań (zapisy danych tych transakcje) stają się tak duże, że mogą potencjalnie spowodować awarię węzłów sieci podczas próby synchronizacji danych między sobą. 

eth/70 (lub EIP-7975) wprowadza nowy sposób komunikacji między węzłami (eth/70), który pozwala na podzielenie dużych list potwierdzeń blok na mniejsze, łatwiejsze do zarządzania części. eth/70 wprowadza system stronicowania dla protokół komunikacyjnego sieci, który pozwala węzłom dzielić listy potwierdzeń blok i bezpiecznie żądać danych w mniejszych, łatwiejszych do zarządzania fragmentach.

Ta zmiana zapobiegnie awariom synchronizacji sieć w okresach wzmożonej aktywności. Ostatecznie utoruje ona drogę dla Ethereum do zwiększenia pojemności blok i przetwarzania większej transakcje na blok w przyszłości, bez przeciążania fizycznego sprzętu synchronizującego łańcuch.

**Zasoby**: [Specyfikacja techniczna EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Dalsza lektura {#further-reading}

- [plan działania Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773) 
- [Aktualizacja priorytetów protokołu na 2026 r. – ogłoszenie na blogu](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel – Post-kwantowe Ethereum, nadchodzi Glamsterdam](https://www.youtube.com/watch?v=qx9sd50uQjQ) 

## Często zadawane pytania {#faq}

### Jak można przekonwertować ETH po hard fork Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Brak konieczności podejmowania działań w odniesieniu do Twoich ETH**: Po aktualizacji Glamsterdam nie ma potrzeby konwertowania ani ulepszania Twoich ETH. Salda Twoich konto pozostaną bez zmian, a ETH, które obecnie posiadasz, pozostanie dostępne w obecnej formie po hard fork.
- **Uważaj na oszustwa!**<Emoji text="⚠️" /> **Każdy, kto instruuje Cię, aby „uaktualnić” swoje ETH, próbuje Cię oszukać.** Nie musisz nic robić w związku z tą aktualizacją. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie poinformowanym to najlepsza obrona przed oszustwami.

[Więcej o rozpoznawaniu i unikaniu oszustw](/security/)

### Czy aktualizacja Glamsterdam dotyczy wszystkich węzłów i walidatorzy Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Tak, aktualizacja Glamsterdam wymaga aktualizacji zarówno [klientów wykonawczych, jak i klientów konsensusu](/developers/docs/nodes-and-clients/). Ponieważ ta aktualizacja wprowadza Enshrined Proposer-Builder Separation (ePBS), operatorzy węzeł będą musieli upewnić się, że ich klienci są zaktualizowani, aby obsługiwać nowe sposoby tworzenia, walidacji i poświadczania bloki przez sieć. 

Wszyscy główni klienci Ethereum wydadzą wersje obsługujące hard fork oznaczony jako wysoki priorytet. Możesz śledzić, kiedy te wersje będą dostępne w repozytoriach klient na GitHubie, na ich [kanałach Discord](https://ethstaker.org/support), na [Discordzie EthStaker](https://dsc.gg/ethstaker) lub subskrybując blog Ethereum, aby otrzymywać aktualizacje protokół. 

Aby utrzymać synchronizację z sieć Ethereum po aktualizacji, operatorzy węzeł muszą upewnić się, że używają obsługiwanej wersji klient. Należy pamiętać, że informacje o wydaniach klient są ograniczone czasowo, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne informacje.

### Co jako stakujący muszę zrobić w związku z aktualizacją Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Jak w przypadku każdej aktualizacji sieć, upewnij się, że zaktualizowałeś swoje oprogramowanie klienckie do najnowszych wersji oznaczonych jako wspierane przez Glamsterdam. Śledź aktualizacje na liście mailingowej i [ogłoszenia dotyczące protokołu na blogu EF,](https://blog.ethereum.org/category/protocol) aby być na bieżąco z wydaniami.

Aby zweryfikować swoją konfigurację przed aktywacją Glamsterdam w sieci głównej, możesz uruchomić walidator w sieciach testowych. Informacje o rozgałęzieniach sieci testowych są również ogłaszane na liście mailingowej i blogu.

### Jakie ulepszenia wprowadzi Glamsterdam w zakresie skalowania L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Główną funkcją jest ePBS (EIP-7732), która oddziela ciężkie zadanie walidacji transakcje sieć od zadania osiągania konsensus. Rozszerza to okno propagacji danych z 2 sekund do około 9 sekund, odblokowując zdolność Ethereum do bezpiecznego obsługiwania znacznie większej przepustowości transakcja i uwzględniania większej liczby bloków danych dla sieci warstwy 2.

### Czy Glamsterdam obniży opłaty za Ethereum (warstwa 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Tak, Glamsterdam najprawdopodobniej obniży opłaty dla codziennych użytkowników! Zmniejszenie wewnętrznego gaz transakcja (lub EIP-2780) obniża podstawowa opłata za wysyłanie ETH, dzięki czemu korzystanie z ETH do codziennych płatności jest znacznie tańsze.

Ponadto, w celu zapewnienia długoterminowej zrównoważoności, Glamsterdam wprowadza listy dostępu na poziomie bloków (Block-Level Access Lists – BAL). Umożliwia to równoległe przetwarzanie i przygotowuje warstwę L1 do bezpiecznego obsługiwania wyższych ogólnych limitów gaz w przyszłości, co prawdopodobnie zmniejszy koszty gaz za transakcję w miarę wzrostu przepustowości.

### Czy po Glamsterdamie nastąpią jakieś zmiany w moich dotychczasowych inteligentnych kontraktach? {#will-my-smart-contracts-change}

Istniejące kontrakty będą nadal działać normalnie po Glamsterdamie. Deweloperzy prawdopodobnie otrzymają kilka nowych narzędzi i powinni sprawdzić zużycie gaz:
- Zwiększenie maksymalnego rozmiaru kontraktu (lub EIP-7954) pozwala programistom wdrażać większe aplikacje, podnosząc maksymalny limit rozmiaru kontraktu z około 24 KiB do 32 KiB. 
- Deterministyczne fabryki predeploy (lub EIP-7997) wprowadzają uniwersalną, wbudowaną fabrykę kontraktów. Pozwala ona deweloperom wdrażać swoje aplikacje i portfele inteligentny kontrakt pod dokładnie tym samym adres we wszystkich uczestniczących łańcuchach EVM.
- Jeśli Twoja aplikacja polega na złożonym śledzeniu w celu znalezienia transferów ETH, transfery i spalanie ETH emitują log (lub EIP-7708), co pozwoli Ci przełączyć się na używanie logów w celu prostszego i bardziej niezawodnego rozliczania.
- Wzrost kosztów gaz przy tworzeniu stanu (lub EIP-8037) i aktualizacja kosztów gaz przy dostępie do stanu (lub EIP-8038) wprowadzają nowe modele zrównoważonego rozwoju, które zmienią pewne koszty wdrożenia kontraktu, ponieważ tworzenie nowych kont lub pamięci trwałej będzie miało dynamicznie dostosowywaną opłatę. 

### Jak Glamsterdam wpłynie na przechowywanie danych w węzeł i wymagania sprzętowe? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Wiele EIP rozważanych dla Glamsterdam adres się do problemu wydajności w miarę wzrostu stan: 
- Zwiększenie kosztów gaz przy tworzeniu stanu (lub EIP-8037) wprowadza dynamiczny model cenowy, którego celem jest osiągnięcie tempa wzrostu bazy danych stan na poziomie 100 GiB/rok, zapewniając, że standardowy sprzęt fizyczny będzie mógł nadal wydajnie obsługiwać sieć. 
- eth/70 częściowe listy potwierdzeń blok (lub EIP-7975) pozwalają węzłom na żądanie potwierdzeń blok w podziale na strony, co dzieli listy potwierdzeń blok o dużej objętości danych na mniejsze fragmenty, aby zapobiec awariom i synchronizacjom w miarę skalowania Ethereum.

