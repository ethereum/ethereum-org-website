---
title: Kanały uzyskiwania informacji
description: Wprowadzenie do kanałów uzyskiwania informacji i kanałów płatności jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
sidebarDepth: 3
---

Kanały stanu pozwalają uczestnikom bezpiecznie przeprowadzać transakcje poza łańcuchem, ograniczając interakcję z siecią główną Ethereum do minimum. Uczestnicy kanału mogą przeprowadzić dowolną liczbę transakcji poza łańcuchem, przesyłając tylko dwie transakcje w łańcuchu, aby otworzyć i zamknąć kanał. Pozwala to na uzyskanie bardzo wysokiej przepustowości transakcji i skutkuje niższymi kosztami dla użytkowników.

## Wymagania wstępne {#prerequisites}

Należy przeczytać i zrozumieć nasze strony na temat [skalowania Ethereum](/developers/docs/scaling/) i [warstwy 2](/layer-2/).

## Czym są kanały? {#what-are-channels}

Publiczne łańcuchy bloków, takie jak Ethereum, borykają się z wyzwaniami w zakresie skalowalności ze względu na swoją rozproszoną architekturę: transakcje w łańcuchu muszą być wykonywane przez wszystkie węzły. Węzły muszą być w stanie obsłużyć wolumen transakcji w bloku przy użyciu skromnego sprzętu, co narzuca limit przepustowości transakcji w celu utrzymania decentralizacji sieci. Kanały blockchain rozwiązują ten problem, pozwalając użytkownikom na interakcję poza łańcuchem, jednocześnie opierając się na bezpieczeństwie głównego łańcucha w celu ostatecznego rozliczenia.

Kanały to proste protokoły peer-to-peer, które pozwalają dwóm stronom na dokonywanie wielu transakcji między sobą, a następnie publikowanie tylko ostatecznych wyników w blockchainie. Kanał wykorzystuje kryptografię, aby udowodnić, że generowane przez niego dane podsumowujące są rzeczywiście wynikiem prawidłowego zestawu transakcji pośrednich. Inteligentny kontrakt [„multisig”](/developers/docs/smart-contracts/#multisig) zapewnia, że transakcje są podpisywane przez właściwe strony.

Dzięki kanałom zmiany stanu są wykonywane i zatwierdzane przez zainteresowane strony, co minimalizuje obliczenia na warstwie wykonawczej Ethereum. Zmniejsza to przeciążenie w Ethereum, a także zwiększa szybkość przetwarzania transakcji dla użytkowników.

Każdy kanał jest zarządzany przez [inteligentny kontrakt multisig](/developers/docs/smart-contracts/#multisig) działający na Ethereum. Aby otworzyć kanał, uczestnicy wdrażają kontrakt kanału w łańcuchu i wpłacają na niego środki. Obie strony wspólnie podpisują aktualizację stanu w celu zainicjowania stanu kanału, po czym mogą szybko i swobodnie dokonywać transakcji poza łańcuchem.

Aby zamknąć kanał, uczestnicy przesyłają ostatni uzgodniony stan kanału w łańcuchu. Następnie inteligentny kontrakt rozdziela zablokowane środki zgodnie z saldem każdego uczestnika w końcowym stanie kanału.

Kanały peer-to-peer są szczególnie przydatne w sytuacjach, w których niektórzy predefiniowani uczestnicy chcą dokonywać transakcji z dużą częstotliwością bez ponoszenia widocznych kosztów ogólnych. Kanały blockchain dzielą się na dwie kategorie: **kanały płatności** i **kanały stanu**.

## Kanały płatności {#payment-channels}

Kanał płatności najlepiej opisać jako „dwukierunkowy rejestr” wspólnie prowadzony przez dwóch użytkowników. Początkowe saldo rejestru to suma depozytów zablokowanych w kontrakcie w łańcuchu podczas fazy otwierania kanału. Transfery w kanale płatności mogą być wykonywane natychmiastowo i bez udziału samego blockchaina, z wyjątkiem jednorazowego początkowego utworzenia w łańcuchu i ewentualnego zamknięcia kanału.

Aktualizacje salda rejestru (tj. stanu kanału płatności) wymagają zgody wszystkich stron w kanale. Aktualizacja kanału, podpisana przez wszystkich jego uczestników, jest uważana za sfinalizowaną, podobnie jak transakcja w Ethereum.

Kanały płatności były jednymi z najwcześniejszych rozwiązań skalujących, zaprojektowanych w celu zminimalizowania kosztownej aktywności w łańcuchu prostych interakcji użytkownika (np. transferów ETH, swapów atomowych, mikropłatności). Uczestnicy kanału mogą przeprowadzać między sobą nieograniczoną liczbę natychmiastowych, bezpłatnych transakcji, o ile suma netto ich transferów nie przekracza zdeponowanych tokenów.

## Kanały stanu {#state-channels}

Oprócz obsługi płatności poza łańcuchem, kanały płatności nie okazały się przydatne do obsługi logiki ogólnych przejść stanów. Kanały stanu zostały stworzone, aby rozwiązać ten problem i uczynić kanały użytecznymi do skalowania obliczeń ogólnego przeznaczenia.

Kanały stanu wciąż mają wiele wspólnego z kanałami płatności. Na przykład użytkownicy wchodzą w interakcje, wymieniając kryptograficznie podpisane komunikaty (transakcje), które pozostali uczestnicy kanału również muszą podpisać. Jeśli proponowana aktualizacja stanu nie zostanie podpisana przez wszystkich uczestników, jest ona uważana za nieważną.

Jednak oprócz przechowywania sald użytkowników, kanał śledzi również bieżący stan pamięci kontraktu (tj. wartości zmiennych kontraktu).

Umożliwia to wykonanie inteligentnego kontraktu poza łańcuchem pomiędzy dwoma użytkownikami. W tym scenariuszu aktualizacje stanu wewnętrznego inteligentnego kontraktu wymagają jedynie zgody partnerów, którzy utworzyli kanał.

Chociaż rozwiązuje to opisany wcześniej problem skalowalności, ma to również implikacje dla bezpieczeństwa. W Ethereum ważność przejść stanów jest egzekwowana przez protokół konsensusu sieci. Uniemożliwia to zaproponowanie nieprawidłowej aktualizacji stanu inteligentnego kontraktu lub zmianę jego wykonania.

Kanały stanu nie posiadają takich samych gwarancji bezpieczeństwa. W pewnym stopniu kanał stanu jest miniaturową wersją sieci głównej. Przy ograniczonym zestawie uczestników egzekwujących zasady wzrasta możliwość złośliwego zachowania (np. proponowania nieprawidłowych aktualizacji stanu). Kanały stanu czerpią swoje bezpieczeństwo z systemu rozstrzygania sporów opartego na [dowodach oszustwa](/glossary/#fraud-proof).

## Jak działają kanały stanu {#how-state-channels-work}

Zasadniczo, aktywność w kanale stanu jest sesją interakcji obejmujących użytkowników i system blockchain. Użytkownicy komunikują się głównie ze sobą poza łańcuchem i wchodzą w interakcję z podstawowym blockchainem tylko w celu otwarcia kanału, zamknięcia kanału lub rozstrzygnięcia potencjalnych sporów między uczestnikami.

Poniższa sekcja przedstawia podstawowy przepływ pracy w kanale stanu:

### Otwieranie kanału {#opening-the-channel}

Otwarcie kanału wymaga od uczestników zdeponowania środków w inteligentnym kontrakcie w sieci głównej. Depozyt funkcjonuje również jako wirtualny rachunek, dzięki czemu uczestnicy mogą swobodnie dokonywać transakcji bez konieczności natychmiastowego regulowania płatności. Dopiero gdy kanał zostanie sfinalizowany w łańcuchu, strony rozliczają się nawzajem i wypłacają to, co pozostało z ich rachunku.

Depozyt ten służy również jako zabezpieczenie gwarantujące uczciwe zachowanie każdego z uczestników. Jeśli depozytariusze zostaną uznani za winnych złośliwych działań w fazie rozstrzygania sporów, kontrakt redukuje (ang. slashing) ich depozyt.

Partnerzy kanału muszą podpisać stan początkowy, na który wszyscy się zgadzają. Służy to jako geneza kanału stanu, po której użytkownicy mogą rozpocząć dokonywanie transakcji.

### Korzystanie z kanału {#using-the-channel}

Po zainicjowaniu stanu kanału, partnerzy wchodzą w interakcje, podpisując transakcje i wysyłając je sobie nawzajem do zatwierdzenia. Uczestnicy inicjują aktualizacje stanu za pomocą tych transakcji i podpisują aktualizacje stanu od innych. Każda transakcja zawiera:

- **Nonce**, który działa jako unikalny identyfikator transakcji i zapobiega atakom typu replay. Identyfikuje również kolejność, w jakiej nastąpiły aktualizacje stanu (co jest ważne przy rozstrzyganiu sporów)

- Stary stan kanału

- Nowy stan kanału

- Transakcja, która wyzwala przejście stanu (np. Alicja wysyła 5 ETH do Boba)

Aktualizacje stanu w kanale nie są rozgłaszane w łańcuchu, jak to zwykle bywa, gdy użytkownicy wchodzą w interakcje w sieci głównej, co jest zgodne z celem kanałów stanu, jakim jest zminimalizowanie śladu w łańcuchu. Dopóki uczestnicy zgadzają się na aktualizacje stanu, są one tak samo ostateczne jak transakcja w Ethereum. Uczestnicy muszą polegać na konsensusie sieci głównej tylko w przypadku powstania sporu.

### Zamykanie kanału {#closing-the-channel}

Zamknięcie kanału stanu wymaga przesłania ostatecznego, uzgodnionego stanu kanału do inteligentnego kontraktu w łańcuchu. Szczegóły zawarte w aktualizacji stanu obejmują liczbę ruchów każdego uczestnika oraz listę zatwierdzonych transakcji.

Po zweryfikowaniu, że aktualizacja stanu jest ważna (tzn. jest podpisana przez wszystkie strony), inteligentny kontrakt finalizuje kanał i rozdziela zablokowane środki zgodnie z wynikiem kanału. Płatności dokonane poza łańcuchem są stosowane do stanu Ethereum, a każdy z uczestników otrzymuje pozostałą część zablokowanych środków.

Opisany powyżej scenariusz przedstawia to, co dzieje się w przypadku pomyślnym. Czasami użytkownicy mogą nie być w stanie osiągnąć porozumienia i sfinalizować kanału (przypadek niepomyślny). Możliwe, że zachodzi jedna z następujących sytuacji:

- Uczestnicy przechodzą w tryb offline i nie proponują przejść stanów

- Uczestnicy odmawiają współpodpisania prawidłowych aktualizacji stanu

- Uczestnicy próbują sfinalizować kanał, proponując starą aktualizację stanu do kontraktu w łańcuchu

- Uczestnicy proponują nieprawidłowe przejścia stanów do podpisania przez innych

W przypadku załamania konsensusu między uczestnikami kanału ostatnią opcją jest oparcie się na konsensusie sieci głównej w celu wyegzekwowania ostatecznego, ważnego stanu kanału. W tym przypadku zamknięcie kanału stanu wymaga rozstrzygnięcia sporów w łańcuchu.

### Rozstrzyganie sporów {#settling-disputes}

Zazwyczaj strony w kanale z góry zgadzają się na jego zamknięcie i wspólnie podpisują ostatnie przejście stanu, które przesyłają do inteligentnego kontraktu. Gdy aktualizacja zostanie zatwierdzona w łańcuchu, wykonanie inteligentnego kontraktu poza łańcuchem kończy się, a uczestnicy opuszczają kanał ze swoimi pieniędzmi.

Jednakże jedna ze stron może złożyć wniosek w łańcuchu o zakończenie wykonywania inteligentnego kontraktu i sfinalizowanie kanału — bez czekania na zgodę drugiej strony. Jeśli wystąpi którakolwiek z opisanych wcześniej sytuacji zagrażających konsensusowi, każda ze stron może uruchomić kontrakt w łańcuchu, aby zamknąć kanał i rozdysponować środki. Zapewnia to **brak konieczności zaufania**, gwarantując, że uczciwe strony mogą w dowolnym momencie wycofać swoje depozyty, niezależnie od działań drugiej strony.

Aby przetworzyć wyjście z kanału, użytkownik musi przesłać ostatnią ważną aktualizację stanu aplikacji do kontraktu w łańcuchu. Jeśli to się zgadza (tzn. jest to opatrzone podpisem wszystkich stron), wówczas środki są redystrybuowane na ich korzyść.

Istnieje jednak opóźnienie w realizacji wniosków o wyjście złożonych przez jednego użytkownika. Jeśli wniosek o zamknięcie kanału został jednomyślnie zatwierdzony, transakcja wyjścia w łańcuchu jest wykonywana natychmiast.

Opóźnienie pojawia się w przypadku wyjść inicjowanych przez jednego użytkownika ze względu na możliwość oszukańczych działań. Na przykład uczestnik kanału może spróbować sfinalizować kanał w Ethereum, przesyłając starszą aktualizację stanu w łańcuchu.

Jako środek zaradczy, kanały stanu pozwalają uczciwym użytkownikom na kwestionowanie nieprawidłowych aktualizacji stanu poprzez przesłanie najnowszego, ważnego stanu kanału w łańcuchu. Kanały stanu są tak zaprojektowane, że nowsze, uzgodnione aktualizacje stanu mają pierwszeństwo przed starszymi aktualizacjami stanu.

Gdy partner uruchomi system rozstrzygania sporów w łańcuchu, druga strona jest zobowiązana do odpowiedzi w określonym terminie (zwanym oknem na zakwestionowanie). Pozwala to użytkownikom na zakwestionowanie transakcji wyjścia, zwłaszcza jeśli druga strona stosuje nieaktualną aktualizację.

Niezależnie od przypadku, użytkownicy kanału zawsze mają silne gwarancje nieodwołalności: jeśli posiadane przez nich przejście stanu zostało podpisane przez wszystkich członków i jest najnowszą aktualizacją, ma ono taką samą nieodwołalność jak zwykła transakcja w łańcuchu. Nadal muszą kwestionować drugą stronę w łańcuchu, ale jedynym możliwym wynikiem jest sfinalizowanie ostatniego ważnego stanu, który posiadają.

### Jak kanały stanu wchodzą w interakcję z Ethereum? {#how-do-state-channels-interact-with-ethereum}

Chociaż istnieją jako protokoły poza łańcuchem, kanały stanu mają komponent w łańcuchu: inteligentny kontrakt wdrożony na Ethereum podczas otwierania kanału. Kontrakt ten kontroluje aktywa zdeponowane w kanale, weryfikuje aktualizacje stanu i rozstrzyga spory między uczestnikami.

Kanały stanu nie publikują danych transakcyjnych ani zobowiązań dotyczących stanu w sieci głównej, w przeciwieństwie do rozwiązań skalujących [warstwy 2](/layer-2/). Są one jednak bardziej powiązane z siecią główną niż na przykład [łańcuchy poboczne](/developers/docs/scaling/sidechains/), co czyni je nieco bezpieczniejszymi.

Kanały stanu opierają się na głównym protokole Ethereum w następujących kwestiach:

#### 1. Żywotność {#liveness}

Kontrakt w łańcuchu wdrożony podczas otwierania kanału jest odpowiedzialny za jego funkcjonalność. Jeśli kontrakt działa na Ethereum, kanał jest zawsze dostępny do użytku. I odwrotnie, łańcuch poboczny zawsze może ulec awarii, nawet jeśli sieć główna działa, narażając środki użytkowników na ryzyko.

#### 2. Bezpieczeństwo {#security}

W pewnym stopniu kanały stanu polegają na Ethereum, aby zapewnić bezpieczeństwo i chronić użytkowników przed złośliwymi partnerami. Jak omówiono w późniejszych sekcjach, kanały wykorzystują mechanizm dowodu oszustwa, który pozwala użytkownikom kwestionować próby sfinalizowania kanału z nieprawidłową lub nieaktualną aktualizacją.

W tym przypadku uczciwa strona dostarcza najnowszy ważny stan kanału jako dowód oszustwa do kontraktu w łańcuchu w celu weryfikacji. Dowody oszustwa umożliwiają stronom, które sobie nie ufają, przeprowadzanie transakcji poza łańcuchem bez ryzykowania przy tym swoich środków.

#### 3. Nieodwołalność {#finality}

Aktualizacje stanu wspólnie podpisane przez użytkowników kanału są uważane za tak samo dobre jak transakcje w łańcuchu. Mimo to cała aktywność wewnątrz kanału osiąga prawdziwą nieodwołalność dopiero po zamknięciu kanału na Ethereum.

W optymistycznym przypadku obie strony mogą współpracować, podpisać ostateczną aktualizację stanu i przesłać ją do łańcucha w celu zamknięcia kanału, po czym środki są rozdzielane zgodnie z ostatecznym stanem kanału. W pesymistycznym przypadku, gdy ktoś próbuje oszukać, publikując w łańcuchu nieprawidłową aktualizację stanu, jego transakcja nie jest finalizowana, dopóki nie upłynie okno na zakwestionowanie.

## Wirtualne kanały stanu {#virtual-state-channels}

Naiwną implementacją kanału stanu byłoby wdrożenie nowego kontraktu, gdy dwóch użytkowników chce wykonać aplikację poza łańcuchem. Jest to nie tylko niewykonalne, ale także niweczy opłacalność kanałów stanu (koszty transakcji w łańcuchu mogą szybko wzrosnąć).

Aby rozwiązać ten problem, stworzono „kanały wirtualne”. W przeciwieństwie do zwykłych kanałów, które wymagają transakcji w łańcuchu do otwarcia i zamknięcia, kanał wirtualny można otworzyć, wykonać i sfinalizować bez interakcji z głównym łańcuchem. Za pomocą tej metody możliwe jest nawet rozstrzyganie sporów poza łańcuchem.

System ten opiera się na istnieniu tak zwanych „kanałów rejestru”, które zostały sfinansowane w łańcuchu. Wirtualne kanały między dwiema stronami mogą być budowane na bazie istniejącego kanału rejestru, przy czym właściciel(e) kanału rejestru pełnią rolę pośrednika.

Użytkownicy w każdym kanale wirtualnym wchodzą w interakcję za pośrednictwem nowej instancji kontraktu, przy czym kanał rejestru może obsługiwać wiele instancji kontraktów. Stan kanału rejestru zawiera również więcej niż jeden stan przechowywania kontraktu, co pozwala na równoległe wykonywanie aplikacji poza łańcuchem między różnymi użytkownikami.

Podobnie jak w przypadku zwykłych kanałów, użytkownicy wymieniają aktualizacje stanu, aby rozwijać maszynę stanu. O ile nie powstanie spór, z pośrednikiem trzeba się kontaktować tylko przy otwieraniu lub zamykaniu kanału.

### Wirtualne kanały płatności {#virtual-payment-channels}

Wirtualne kanały płatności działają na tej samej zasadzie co wirtualne kanały stanu: uczestnicy podłączeni do tej samej sieci mogą przesyłać komunikaty bez konieczności otwierania nowego kanału w łańcuchu. W wirtualnych kanałach płatności transfery wartości są kierowane przez jednego lub więcej pośredników, z gwarancją, że tylko zamierzony odbiorca może otrzymać przelane środki.

## Zastosowania kanałów stanu {#applications-of-state-channels}

### Płatności {#payments}

Wczesne kanały blockchain były prostymi protokołami, które pozwalały dwóm uczestnikom na przeprowadzanie szybkich, tanich transferów poza łańcuchem bez konieczności ponoszenia wysokich opłat transakcyjnych w sieci głównej. Obecnie kanały płatności są nadal przydatne w aplikacjach przeznaczonych do wymiany i deponowania etheru i tokenów.

Płatności oparte na kanałach mają następujące zalety:

1. **Przepustowość**: Liczba transakcji poza łańcuchem na kanał nie jest powiązana z przepustowością Ethereum, na którą wpływają różne czynniki, zwłaszcza rozmiar bloku i czas bloku. Wykonując transakcje poza łańcuchem, kanały blockchain mogą osiągnąć wyższą przepustowość.

2. **Prywatność**: Ponieważ kanały istnieją poza łańcuchem, szczegóły interakcji między uczestnikami nie są rejestrowane w publicznym blockchainie Ethereum. Użytkownicy kanałów muszą wchodzić w interakcję w łańcuchu tylko podczas finansowania i zamykania kanałów lub rozstrzygania sporów. Dlatego kanały są przydatne dla osób, które pragną bardziej prywatnych transakcji.

3. **Opóźnienie**: Transakcje poza łańcuchem przeprowadzane między uczestnikami kanału mogą być rozliczane natychmiast, jeśli obie strony współpracują, co zmniejsza opóźnienia. W przeciwieństwie do tego, wysłanie transakcji w sieci głównej wymaga oczekiwania na przetworzenie transakcji przez węzły, wyprodukowanie nowego bloku z transakcją i osiągnięcie konsensusu. Użytkownicy mogą również potrzebować poczekać na więcej potwierdzeń bloków, zanim uznają transakcję za sfinalizowaną.

4. **Koszt**: Kanały stanu są szczególnie przydatne w sytuacjach, w których zestaw uczestników będzie wymieniał wiele aktualizacji stanu przez długi okres. Jedyne poniesione koszty to otwarcie i zamknięcie inteligentnego kontraktu kanału stanu; każda zmiana stanu między otwarciem a zamknięciem kanału będzie tańsza od poprzedniej, ponieważ koszt rozliczenia jest odpowiednio rozłożony.

Implementacja kanałów stanu na rozwiązaniach warstwy 2, takich jak [rollupy](/developers/docs/scaling/#rollups), może uczynić je jeszcze bardziej atrakcyjnymi dla płatności. Chociaż kanały oferują tanie płatności, koszty utworzenia kontraktu w łańcuchu w sieci głównej podczas fazy otwierania mogą być wysokie — zwłaszcza gdy gwałtownie rosną opłaty za gaz. Rollupy oparte na Ethereum oferują [niższe opłaty transakcyjne](https://l2fees.info/) i mogą zmniejszyć koszty ogólne dla uczestników kanału poprzez obniżenie opłat instalacyjnych.

### Mikrotransakcje {#microtransactions}

Mikrotransakcje to płatności o niskiej wartości (np. niższej niż ułamek dolara), których firmy nie mogą przetwarzać bez ponoszenia strat. Podmioty te muszą płacić dostawcom usług płatniczych, czego nie mogą zrobić, jeśli marża na płatnościach od klientów jest zbyt niska, aby osiągnąć zysk.

Kanały płatności rozwiązują ten problem, zmniejszając koszty ogólne związane z mikrotransakcjami. Na przykład dostawca usług internetowych (ISP) może otworzyć kanał płatności z klientem, umożliwiając mu przesyłanie strumieniowe małych płatności za każdym razem, gdy korzysta z usługi.

Poza kosztem otwarcia i zamknięcia kanału, uczestnicy nie ponoszą dalszych kosztów z tytułu mikrotransakcji (brak opłat za gaz). Jest to sytuacja korzystna dla obu stron, ponieważ klienci mają większą elastyczność w zakresie tego, ile płacą za usługi, a firmy nie tracą na dochodowych mikrotransakcjach.

### Zdecentralizowane aplikacje {#decentralized-applications}

Podobnie jak kanały płatności, kanały stanu mogą dokonywać płatności warunkowych zgodnie z ostatecznymi stanami maszyny stanu. Kanały stanu mogą również obsługiwać dowolną logikę przejścia stanu, co czyni je użytecznymi do wykonywania ogólnych aplikacji poza łańcuchem.

Kanały stanu są często ograniczone do prostych aplikacji turowych, ponieważ ułatwia to zarządzanie środkami zdeponowanymi w kontrakcie w łańcuchu. Ponadto, przy ograniczonej liczbie stron aktualizujących stan aplikacji poza łańcuchem w odstępach czasu, karanie nieuczciwego zachowania jest stosunkowo proste.

Wydajność aplikacji kanału stanu zależy również od jej projektu. Na przykład deweloper może jednorazowo wdrożyć kontrakt kanału aplikacji w łańcuchu i pozwolić innym graczom na ponowne korzystanie z aplikacji bez konieczności przechodzenia do łańcucha. W tym przypadku początkowy kanał aplikacji służy jako kanał rejestru obsługujący wiele kanałów wirtualnych, z których każdy uruchamia nową instancję inteligentnego kontraktu aplikacji poza łańcuchem.

Potencjalnym zastosowaniem aplikacji kanałów stanu są proste gry dwuosobowe, w których środki są rozdzielane na podstawie wyniku gry. Zaletą jest to, że gracze nie muszą sobie ufać (brak konieczności zaufania), a kontrakt w łańcuchu, a nie gracze, kontroluje alokację środków i rozstrzyganie sporów (decentralizacja).

Inne możliwe zastosowania aplikacji kanałów stanu obejmują własność nazw ENS, rejestry NFT i wiele innych.

### Transfery atomowe {#atomic-transfers}

Wczesne kanały płatności były ograniczone do transferów między dwiema stronami, co ograniczało ich użyteczność. Jednak wprowadzenie kanałów wirtualnych pozwoliło poszczególnym osobom na kierowanie transferów przez pośredników (tj. wiele kanałów p2p) bez konieczności otwierania nowego kanału w łańcuchu.

Powszechnie opisywane jako „transfery wieloskokowe”, płatności kierowane są atomowe (tzn. albo wszystkie części transakcji kończą się powodzeniem, albo cała transakcja kończy się niepowodzeniem). Transfery atomowe wykorzystują [kontrakty Hashed Timelock (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts), aby zapewnić, że płatność zostanie zwolniona tylko wtedy, gdy zostaną spełnione określone warunki, zmniejszając w ten sposób ryzyko kontrahenta.

## Wady korzystania z kanałów stanu {#drawbacks-of-state-channels}

### Założenia dotyczące żywotności {#liveness-assumptions}

Aby zapewnić wydajność, kanały stanu nakładają ograniczenia czasowe na zdolność uczestników kanału do reagowania na spory. Zasada ta zakłada, że partnerzy będą zawsze online, aby monitorować aktywność kanału i w razie potrzeby kwestionować zakwestionowania.

W rzeczywistości użytkownicy mogą przejść w tryb offline z przyczyn od nich niezależnych (np. słabe połączenie internetowe, awaria mechaniczna itp.). Jeśli uczciwy użytkownik przejdzie w tryb offline, złośliwy partner może wykorzystać sytuację, przedstawiając stare stany pośrednie do kontraktu rozstrzygającego i kradnąc zdeponowane środki.

Niektóre kanały wykorzystują „wieże strażnicze” — podmioty odpowiedzialne za obserwowanie zdarzeń sporów w łańcuchu w imieniu innych i podejmowanie niezbędnych działań, takich jak powiadamianie zainteresowanych stron. Może to jednak zwiększyć koszty korzystania z kanału stanu.

### Niedostępność danych {#data-unavailability}

Jak wyjaśniono wcześniej, zakwestionowanie nieprawidłowego sporu wymaga przedstawienia najnowszego, ważnego stanu kanału stanu. Jest to kolejna zasada oparta na założeniu — że użytkownicy mają dostęp do najnowszego stanu kanału.

Chociaż oczekiwanie, że użytkownicy kanału będą przechowywać kopie stanu aplikacji poza łańcuchem, jest rozsądne, dane te mogą zostać utracone z powodu błędu lub awarii mechanicznej. Jeśli użytkownik nie ma kopii zapasowej danych, może jedynie mieć nadzieję, że druga strona nie sfinalizuje nieprawidłowego wniosku o wyjście, używając starych przejść stanów będących w jej posiadaniu.

Użytkownicy Ethereum nie muszą radzić sobie z tym problemem, ponieważ sieć egzekwuje zasady dotyczące dostępności danych. Dane transakcyjne są przechowywane i propagowane przez wszystkie węzły i dostępne dla użytkowników do pobrania w razie potrzeby.

### Problemy z płynnością {#liquidity-issues}

Aby utworzyć kanał blockchain, uczestnicy muszą zablokować środki w inteligentnym kontrakcie w łańcuchu na czas życia kanału. Zmniejsza to płynność użytkowników kanału, a także ogranicza kanały do tych, którzy mogą sobie pozwolić na utrzymywanie zablokowanych środków w sieci głównej.

Jednak kanały rejestru — obsługiwane przez dostawcę usług poza łańcuchem (OSP) — mogą zmniejszyć problemy z płynnością dla użytkowników. Dwóch partnerów podłączonych do kanału rejestru może utworzyć kanał wirtualny, który mogą otworzyć i sfinalizować całkowicie poza łańcuchem, kiedy tylko zechcą.

Dostawcy usług poza łańcuchem mogą również otwierać kanały z wieloma partnerami, co czyni ich przydatnymi do kierowania płatności. Oczywiście, użytkownicy muszą płacić opłaty OSP za ich usługi, co dla niektórych może być niepożądane.

### Ataki typu griefing {#griefing-attacks}

Ataki typu griefing są częstą cechą systemów opartych na dowodach oszustwa. Atak typu griefing nie przynosi bezpośredniej korzyści atakującemu, ale powoduje szkodę (ang. grief) u ofiary, stąd nazwa.

Dowody oszustwa są podatne na ataki typu griefing, ponieważ uczciwa strona musi reagować na każdy spór, nawet nieprawidłowy, w przeciwnym razie ryzykuje utratę swoich środków. Złośliwy uczestnik może zdecydować się na wielokrotne publikowanie nieaktualnych przejść stanów w łańcuchu, zmuszając uczciwą stronę do odpowiedzi ważnym stanem. Koszt tych transakcji w łańcuchu może szybko wzrosnąć, powodując straty dla uczciwych stron.

### Predefiniowane zestawy uczestników {#predefined-participant-sets}

Z założenia liczba uczestników tworzących kanał stanu pozostaje stała przez cały okres jego istnienia. Dzieje się tak, ponieważ aktualizacja zestawu uczestników skomplikowałaby działanie kanału, zwłaszcza przy jego finansowaniu lub rozstrzyganiu sporów. Dodawanie lub usuwanie uczestników wymagałoby również dodatkowej aktywności w łańcuchu, co zwiększa koszty ogólne dla użytkowników.

Chociaż ułatwia to analizę kanałów stanu, ogranicza to użyteczność projektów kanałów dla deweloperów aplikacji. Częściowo wyjaśnia to, dlaczego kanały stanu zostały porzucone na rzecz innych rozwiązań skalujących, takich jak rollupy.

### Równoległe przetwarzanie transakcji {#parallel-transaction-processing}

Uczestnicy kanału stanu wysyłają aktualizacje stanu na zmianę, dlatego najlepiej sprawdzają się w „aplikacjach turowych” (np. dwuosobowej partii szachów). Eliminuje to potrzebę obsługi jednoczesnych aktualizacji stanu i zmniejsza pracę, jaką kontrakt w łańcuchu musi wykonać, aby ukarać publikujących nieaktualne aktualizacje. Jednak efektem ubocznym tego projektu jest to, że transakcje są od siebie zależne, co zwiększa opóźnienia i pogarsza ogólne wrażenia użytkownika.

Niektóre kanały stanu rozwiązują ten problem, stosując projekt „pełnego dupleksu”, który rozdziela stan poza łańcuchem na dwa jednokierunkowe stany „simpleks”, co pozwala na jednoczesne aktualizacje stanu. Takie projekty poprawiają przepustowość poza łańcuchem i zmniejszają opóźnienia transakcji.

## Użyj kanałów stanu {#use-state-channels}

Wiele projektów dostarcza implementacje kanałów uzyskiwania informacji, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Dalsza lektura {#further-reading}

**Kanały uzyskiwania informacji**

- [Zrozumieć rozwiązania skalujące warstwy 2 Ethereum: kanały stanu, Plasma i Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 lutego 2018_
- [Kanały stanu — wyjaśnienie](https://www.jeffcoleman.ca/state-channels/) _6 listopada 2015 – Jeff Coleman_
- [Podstawy kanałów stanu](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Kanały stanu blockchain: stan wiedzy](https://ieeexplore.ieee.org/document/9627997)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
