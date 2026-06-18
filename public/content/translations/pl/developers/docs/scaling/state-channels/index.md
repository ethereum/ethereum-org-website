---
title: Kanały stanu
description: Wprowadzenie do kanałów stanu i kanałów płatności jako rozwiązania skalującego obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
sidebarDepth: 3
---

Kanały stanu pozwalają uczestnikom na bezpieczne przeprowadzanie transakcji pozałańcuchowo, ograniczając do minimum interakcję z [siecią główną](/) Ethereum. Węzły równorzędne kanału mogą przeprowadzać dowolną liczbę transakcji pozałańcuchowych, przesyłając tylko dwie transakcje onchain w celu otwarcia i zamknięcia kanału. Pozwala to na niezwykle wysoką przepustowość transakcji i skutkuje niższymi kosztami dla użytkowników.

## Wymagania wstępne {#prerequisites}

Powinieneś przeczytać i zrozumieć nasze strony o [skalowaniu Ethereum](/developers/docs/scaling/) oraz [warstwie 2 (L2)](/layer-2/).

## Czym są kanały? {#what-are-channels}

Publiczne blockchainy, takie jak Ethereum, stoją przed wyzwaniami związanymi ze skalowalnością ze względu na swoją rozproszoną architekturę: transakcje onchain muszą być wykonywane przez wszystkie węzły. Węzły muszą być w stanie obsłużyć wolumen transakcji w bloku przy użyciu skromnego sprzętu, co nakłada limit na przepustowość transakcji, aby utrzymać zdecentralizowany charakter sieci. Kanały blockchain rozwiązują ten problem, pozwalając użytkownikom na interakcję pozałańcuchową, jednocześnie polegając na bezpieczeństwie głównego łańcucha w celu ostatecznego rozrachunku.

Kanały to proste protokoły peer-to-peer, które pozwalają dwóm stronom na zawieranie wielu transakcji między sobą, a następnie publikowanie tylko ostatecznych wyników na blockchainie. Kanał wykorzystuje kryptografię, aby udowodnić, że generowane przez nie dane podsumowujące są w rzeczywistości wynikiem prawidłowego zestawu transakcji pośrednich. Inteligentny kontrakt typu [„multisig”](/developers/docs/smart-contracts/#multisig) zapewnia, że transakcje są podpisywane przez właściwe strony.

Dzięki kanałom zmiany stanu są wykonywane i weryfikowane przez zainteresowane strony, co minimalizuje obliczenia w warstwie wykonawczej Ethereum. Zmniejsza to zatory w sieci Ethereum, a także zwiększa prędkość przetwarzania transakcji dla użytkowników.

Każdy kanał jest zarządzany przez [inteligentny kontrakt multisig](/developers/docs/smart-contracts/#multisig) działający na Ethereum. Aby otworzyć kanał, uczestnicy wdrażają kontrakt kanału onchain i wpłacają do niego środki. Obie strony wspólnie podpisują aktualizację stanu, aby zainicjować stan kanału, po czym mogą szybko i swobodnie przeprowadzać transakcje pozałańcuchowo.

Aby zamknąć kanał, uczestnicy przesyłają ostatni uzgodniony stan kanału onchain. Następnie inteligentny kontrakt rozdziela zablokowane środki zgodnie z saldem każdego uczestnika w ostatecznym stanie kanału.

Kanały peer-to-peer są szczególnie przydatne w sytuacjach, w których niektórzy z góry określeni uczestnicy chcą przeprowadzać transakcje z dużą częstotliwością bez ponoszenia widocznych kosztów ogólnych. Kanały blockchain dzielą się na dwie kategorie: **kanały płatności** i **kanały stanu**.

## Kanały płatności {#payment-channels}

Kanał płatności najlepiej opisać jako „dwukierunkową księgę” wspólnie prowadzoną przez dwóch użytkowników. Początkowe saldo księgi to suma depozytów zablokowanych w kontrakcie onchain podczas fazy otwierania kanału. Transfery w kanale płatności mogą być wykonywane natychmiastowo i bez udziału samego blockchaina, z wyjątkiem początkowego, jednorazowego utworzenia onchain i ostatecznego zamknięcia kanału.

Aktualizacje salda księgi (tj. stanu kanału płatności) wymagają zatwierdzenia przez wszystkie strony w kanale. Aktualizacja kanału, podpisana przez wszystkich uczestników kanału, jest uważana za sfinalizowaną, podobnie jak transakcja na Ethereum.

Kanały płatności były jednymi z najwcześniejszych rozwiązań skalujących zaprojektowanych w celu zminimalizowania kosztownej aktywności onchain dla prostych interakcji użytkowników (np. transferów ETH, swapów atomowych, mikropłatności). Uczestnicy kanału mogą przeprowadzać między sobą nieograniczoną liczbę natychmiastowych, bezprowizyjnych transakcji, o ile suma netto ich transferów nie przekracza zdeponowanych tokenów.

## Kanały stanu {#state-channels}

Oprócz obsługi płatności pozałańcuchowych, kanały płatności nie okazały się przydatne do obsługi ogólnej logiki przejścia stanu. Kanały stanu zostały stworzone, aby rozwiązać ten problem i uczynić kanały użytecznymi do skalowania obliczeń ogólnego przeznaczenia.

Kanały stanu nadal mają wiele wspólnego z kanałami płatności. Na przykład użytkownicy wchodzą w interakcje, wymieniając kryptograficznie podpisane wiadomości (transakcje), które inni uczestnicy kanału również muszą podpisać. Jeśli proponowana aktualizacja stanu nie zostanie podpisana przez wszystkich uczestników, jest uważana za nieważną.

Jednak oprócz przechowywania sald użytkowników, kanał śledzi również bieżący stan pamięci kontraktu (tj. wartości zmiennych kontraktu).

Dzięki temu możliwe jest wykonanie inteligentnego kontraktu pozałańcuchowo między dwoma użytkownikami. W tym scenariuszu aktualizacje wewnętrznego stanu inteligentnego kontraktu wymagają jedynie zatwierdzenia przez węzły równorzędne, które utworzyły kanał.

Chociaż rozwiązuje to opisany wcześniej problem skalowalności, ma to implikacje dla bezpieczeństwa. Na Ethereum ważność przejść stanu jest egzekwowana przez protokół konsensusu sieci. Uniemożliwia to zaproponowanie nieprawidłowej aktualizacji stanu inteligentnego kontraktu lub zmianę jego wykonania.

Kanały stanu nie mają takich samych gwarancji bezpieczeństwa. W pewnym stopniu kanał stanu jest miniaturową wersją Sieci głównej. Przy ograniczonej grupie uczestników egzekwujących zasady, wzrasta prawdopodobieństwo złośliwego zachowania (np. proponowania nieprawidłowych aktualizacji stanu). Kanały stanu czerpią swoje bezpieczeństwo z systemu arbitrażu sporów opartego na [dowodach oszustwa](/glossary/#fraud-proof).

## Jak działają kanały stanu {#how-state-channels-work}

Zasadniczo aktywność w kanale stanu to sesja interakcji obejmująca użytkowników i system blockchain. Użytkownicy komunikują się ze sobą głównie pozałańcuchowo i wchodzą w interakcję z bazowym blockchainem tylko w celu otwarcia kanału, zamknięcia kanału lub rozstrzygnięcia potencjalnych sporów między uczestnikami.

Poniższa sekcja przedstawia podstawowy przepływ pracy kanału stanu:

### Otwieranie kanału {#opening-the-channel}

Otwarcie kanału wymaga od uczestników zablokowania środków w inteligentnym kontrakcie w Sieci głównej. Depozyt działa również jako wirtualny rachunek, dzięki czemu uczestniczące podmioty mogą swobodnie przeprowadzać transakcje bez konieczności natychmiastowego rozliczania płatności. Dopiero gdy kanał zostanie sfinalizowany onchain, strony rozliczają się ze sobą i wypłacają to, co zostało z ich rachunku.

Depozyt ten służy również jako kaucja gwarantująca uczciwe zachowanie każdego uczestnika. Jeśli deponenci zostaną uznani za winnych złośliwych działań podczas fazy rozwiązywania sporów, kontrakt tnie (slashing) ich depozyt.

Węzły równorzędne kanału muszą podpisać stan początkowy, na który wszyscy się zgadzają. Służy to jako geneza kanału stanu, po której użytkownicy mogą rozpocząć przeprowadzanie transakcji.

### Korzystanie z kanału {#using-the-channel}

Po zainicjowaniu stanu kanału, węzły równorzędne wchodzą w interakcje, podpisując transakcje i wysyłając je do siebie nawzajem w celu zatwierdzenia. Uczestnicy inicjują aktualizacje stanu za pomocą tych transakcji i podpisują aktualizacje stanu od innych. Każda transakcja składa się z następujących elementów:

- **Nonce**, który działa jako unikalny identyfikator transakcji i zapobiega atakom typu replay. Identyfikuje również kolejność, w jakiej wystąpiły aktualizacje stanu (co jest ważne dla rozwiązywania sporów)

- Stary stan kanału

- Nowy stan kanału

- Transakcja, która wyzwala przejście stanu (np. Alice wysyła 5 ETH do Boba)

Aktualizacje stanu w kanale nie są rozgłaszane onchain, jak ma to zwykle miejsce, gdy użytkownicy wchodzą w interakcje w Sieci głównej, co jest zgodne z celem kanałów stanu, jakim jest zminimalizowanie śladu onchain. Dopóki uczestnicy zgadzają się co do aktualizacji stanu, są one równie ostateczne jak transakcja Ethereum. Uczestnicy muszą polegać na konsensusie Sieci głównej tylko w przypadku sporu.

### Zamykanie kanału {#closing-the-channel}

Zamknięcie kanału stanu wymaga przesłania ostatecznego, uzgodnionego stanu kanału do inteligentnego kontraktu onchain. Szczegóły, do których odnosi się aktualizacja stanu, obejmują liczbę ruchów każdego uczestnika oraz listę zatwierdzonych transakcji.

Po zweryfikowaniu, że aktualizacja stanu jest ważna (tj. jest podpisana przez wszystkie strony), inteligentny kontrakt finalizuje kanał i rozdziela zablokowane środki zgodnie z wynikiem kanału. Płatności dokonane pozałańcuchowo są stosowane do stanu Ethereum, a każdy uczestnik otrzymuje swoją pozostałą część zablokowanych środków.

Opisany powyżej scenariusz przedstawia to, co dzieje się w optymistycznym przypadku. Czasami użytkownicy mogą nie być w stanie osiągnąć porozumienia i sfinalizować kanału (pesymistyczny przypadek). W takiej sytuacji może wystąpić dowolna z poniższych okoliczności:

- Uczestnicy przechodzą w tryb offline i nie proponują przejść stanu

- Uczestnicy odmawiają współpodpisania ważnych aktualizacji stanu

- Uczestnicy próbują sfinalizować kanał, proponując starą aktualizację stanu do kontraktu onchain

- Uczestnicy proponują nieprawidłowe przejścia stanu do podpisania przez innych

Ilekroć konsensus między uczestniczącymi podmiotami w kanale załamuje się, ostatnią opcją jest poleganie na konsensusie Sieci głównej w celu wyegzekwowania ostatecznego, ważnego stanu kanału. W tym przypadku zamknięcie kanału stanu wymaga rozstrzygnięcia sporów onchain.

### Rozstrzyganie sporów {#settling-disputes}

Zazwyczaj strony w kanale zgadzają się na wcześniejsze zamknięcie kanału i współpodpisują ostatnie przejście stanu, które przesyłają do inteligentnego kontraktu. Gdy aktualizacja zostanie zatwierdzona onchain, wykonywanie inteligentnego kontraktu pozałańcuchowego kończy się, a uczestnicy wychodzą z kanału ze swoimi pieniędzmi.

Jednak jedna ze stron może złożyć żądanie onchain o zakończenie wykonywania inteligentnego kontraktu i sfinalizowanie kanału — bez czekania na zatwierdzenie przez drugą stronę. Jeśli wystąpi którakolwiek z opisanych wcześniej sytuacji łamiących konsensus, każda ze stron może wyzwolić kontrakt onchain, aby zamknąć kanał i rozdzielić środki. Zapewnia to **bezzaufaniowość**, gwarantując, że uczciwe strony mogą wycofać swoje depozyty w dowolnym momencie, niezależnie od działań drugiej strony.

Aby przetworzyć wyjście z kanału, użytkownik musi przesłać ostatnią ważną aktualizację stanu aplikacji do kontraktu onchain. Jeśli to się zgadza (tj. nosi podpis wszystkich stron), środki są redystrybuowane na ich korzyść.

Istnieje jednak opóźnienie w wykonywaniu żądań wyjścia pojedynczego użytkownika. Jeśli żądanie zakończenia kanału zostało jednogłośnie zatwierdzone, transakcja wyjścia onchain jest wykonywana natychmiast.

Opóźnienie wchodzi w grę w przypadku wyjść pojedynczego użytkownika ze względu na możliwość oszukańczych działań. Na przykład uczestnik kanału może próbować sfinalizować kanał na Ethereum, przesyłając starszą aktualizację stanu onchain.

Jako środek zaradczy, kanały stanu pozwalają uczciwym użytkownikom na kwestionowanie nieprawidłowych aktualizacji stanu poprzez przesłanie najnowszego, ważnego stanu kanału onchain. Kanały stanu są zaprojektowane tak, aby nowsze, uzgodnione aktualizacje stanu miały pierwszeństwo przed starszymi aktualizacjami stanu.

Gdy węzeł równorzędny uruchomi system rozwiązywania sporów onchain, druga strona jest zobowiązana do udzielenia odpowiedzi w określonym czasie (zwanym oknem wyzwania). Pozwala to użytkownikom na zakwestionowanie transakcji wyjścia, zwłaszcza jeśli druga strona stosuje nieaktualną aktualizację.

Niezależnie od przypadku, użytkownicy kanału zawsze mają silne gwarancje ostateczności: jeśli posiadane przez nich przejście stanu zostało podpisane przez wszystkich członków i jest najnowszą aktualizacją, to ma ono taką samą ostateczność jak zwykła transakcja onchain. Nadal muszą zakwestionować drugą stronę onchain, ale jedynym możliwym wynikiem jest sfinalizowanie ostatniego ważnego stanu, który posiadają.

### Jak kanały stanu wchodzą w interakcję z Ethereum? {#how-do-state-channels-interact-with-ethereum}

Chociaż istnieją jako protokoły pozałańcuchowe, kanały stanu mają komponent onchain: inteligentny kontrakt wdrożony na Ethereum podczas otwierania kanału. Kontrakt ten kontroluje aktywa zdeponowane w kanale, weryfikuje aktualizacje stanu i rozstrzyga spory między uczestnikami.

Kanały stanu nie publikują danych transakcji ani zobowiązań stanu w Sieci głównej, w przeciwieństwie do rozwiązań skalujących [warstwy 2 (L2)](/layer-2/). Są one jednak bardziej powiązane z Siecią główną niż na przykład [łańcuchy poboczne](/developers/docs/scaling/sidechains/), co czyni je nieco bezpieczniejszymi.

Kanały stanu polegają na głównym protokole Ethereum w następujących kwestiach:

#### 1. Żywotność (Liveness) {#liveness}

Kontrakt onchain wdrożony podczas otwierania kanału jest odpowiedzialny za funkcjonalność kanału. Jeśli kontrakt działa na Ethereum, kanał jest zawsze dostępny do użytku. Z kolei łańcuch poboczny zawsze może ulec awarii, nawet jeśli Sieć główna działa, narażając środki użytkowników na ryzyko.

#### 2. Bezpieczeństwo {#security}

W pewnym stopniu kanały stanu polegają na Ethereum w celu zapewnienia bezpieczeństwa i ochrony użytkowników przed złośliwymi węzłami równorzędnymi. Jak omówiono w dalszych sekcjach, kanały wykorzystują mechanizm dowodu oszustwa, który pozwala użytkownikom kwestionować próby sfinalizowania kanału za pomocą nieprawidłowej lub nieaktualnej aktualizacji.

W tym przypadku uczciwa strona dostarcza najnowszy ważny stan kanału jako dowód oszustwa do kontraktu onchain w celu weryfikacji. Dowody oszustwa umożliwiają wzajemnie nieufnym stronom przeprowadzanie transakcji pozałańcuchowych bez ryzykowania swoich środków w tym procesie.

#### 3. Ostateczność {#finality}

Aktualizacje stanu wspólnie podpisane przez użytkowników kanału są uważane za równie dobre jak transakcje onchain. Mimo to cała aktywność w kanale osiąga prawdziwą ostateczność dopiero po zamknięciu kanału na Ethereum.

W optymistycznym przypadku obie strony mogą współpracować i podpisać ostateczną aktualizację stanu oraz przesłać ją onchain, aby zamknąć kanał, po czym środki są rozdzielane zgodnie z ostatecznym stanem kanału. W pesymistycznym przypadku, w którym ktoś próbuje oszukiwać, publikując nieprawidłową aktualizację stanu onchain, jego transakcja nie jest sfinalizowana, dopóki nie upłynie okno wyzwania.

## Wirtualne kanały stanu {#virtual-state-channels}

Naiwną implementacją kanału stanu byłoby wdrożenie nowego kontraktu, gdy dwóch użytkowników chce wykonać aplikację pozałańcuchowo. Jest to nie tylko niewykonalne, ale także neguje opłacalność kanałów stanu (koszty transakcji onchain mogą szybko rosnąć).

Aby rozwiązać ten problem, stworzono „kanały wirtualne”. W przeciwieństwie do zwykłych kanałów, które wymagają transakcji onchain do otwarcia i zakończenia, kanał wirtualny może zostać otwarty, wykonany i sfinalizowany bez interakcji z głównym łańcuchem. Za pomocą tej metody możliwe jest nawet rozstrzyganie sporów pozałańcuchowo.

System ten opiera się na istnieniu tak zwanych „kanałów księgi” (ledger channels), które zostały zasilone onchain. Wirtualne kanały między dwiema stronami mogą być budowane na wierzchu istniejącego kanału księgi, przy czym właściciel(e) kanału księgi pełni(ą) rolę pośrednika.

Użytkownicy w każdym wirtualnym kanale wchodzą w interakcje za pośrednictwem nowej instancji kontraktu, a kanał księgi może obsługiwać wiele instancji kontraktu. Stan kanału księgi zawiera również więcej niż jeden stan pamięci kontraktu, co pozwala na równoległe wykonywanie aplikacji pozałańcuchowo między różnymi użytkownikami.

Podobnie jak w przypadku zwykłych kanałów, użytkownicy wymieniają aktualizacje stanu, aby posuwać maszynę stanu do przodu. O ile nie dojdzie do sporu, z pośrednikiem należy się kontaktować tylko podczas otwierania lub zamykania kanału.

### Wirtualne kanały płatności {#virtual-payment-channels}

Wirtualne kanały płatności działają w oparciu o ten sam pomysł co wirtualne kanały stanu: uczestnicy podłączeni do tej samej sieci mogą przekazywać wiadomości bez konieczności otwierania nowego kanału onchain. W wirtualnych kanałach płatności transfery wartości są kierowane przez jednego lub więcej pośredników, z gwarancją, że tylko zamierzony odbiorca może otrzymać przetransferowane środki.

## Zastosowania kanałów stanu {#applications-of-state-channels}

### Płatności {#payments}

Wczesne kanały blockchain były prostymi protokołami, które pozwalały dwóm uczestnikom na przeprowadzanie szybkich transferów z niskimi opłatami pozałańcuchowo, bez konieczności płacenia wysokich opłat transakcyjnych w Sieci głównej. Obecnie kanały płatności są nadal przydatne w aplikacjach przeznaczonych do wymiany i deponowania etheru oraz tokenów.

Płatności oparte na kanałach mają następujące zalety:

1. **Przepustowość**: Ilość transakcji pozałańcuchowych na kanał nie jest powiązana z przepustowością Ethereum, na którą wpływają różne czynniki, zwłaszcza rozmiar bloku i czas bloku. Wykonując transakcje pozałańcuchowo, kanały blockchain mogą osiągnąć wyższą przepustowość.

2. **Prywatność**: Ponieważ kanały istnieją pozałańcuchowo, szczegóły interakcji między uczestnikami nie są rejestrowane na publicznym blockchainie Ethereum. Użytkownicy kanałów muszą wchodzić w interakcje onchain tylko podczas zasilania i zamykania kanałów lub rozstrzygania sporów. W związku z tym kanały są przydatne dla osób, które pragną bardziej prywatnych transakcji.

3. **Opóźnienie**: Transakcje pozałańcuchowe przeprowadzane między uczestnikami kanału mogą być rozliczane natychmiastowo, jeśli obie strony współpracują, co zmniejsza opóźnienia. W przeciwieństwie do tego, wysłanie transakcji w Sieci głównej wymaga oczekiwania na przetworzenie transakcji przez węzły, wyprodukowanie nowego bloku z transakcją i osiągnięcie konsensusu. Użytkownicy mogą również musieć poczekać na więcej potwierdzeń bloków, zanim uznają transakcję za sfinalizowaną.

4. **Koszt**: Kanały stanu są szczególnie przydatne w sytuacjach, w których grupa uczestników będzie wymieniać wiele aktualizacji stanu przez długi czas. Jedyne ponoszone koszty to otwarcie i zamknięcie inteligentnego kontraktu kanału stanu; każda zmiana stanu między otwarciem a zamknięciem kanału będzie tańsza niż poprzednia, ponieważ koszt rozrachunku jest odpowiednio rozkładany.

Wdrożenie kanałów stanu w rozwiązaniach warstwy 2 (L2), takich jak [rollupy](/developers/docs/scaling/#rollups), mogłoby uczynić je jeszcze bardziej atrakcyjnymi dla płatności. Chociaż kanały oferują tanie płatności, koszty konfiguracji kontraktu onchain w Sieci głównej podczas fazy otwierania mogą być wysokie — zwłaszcza gdy opłaty za gaz gwałtownie rosną. Rollupy oparte na Ethereum oferują [niższe opłaty transakcyjne](https://l2fees.info/) i mogą zmniejszyć koszty ogólne dla uczestników kanału poprzez obniżenie opłat konfiguracyjnych.

### Mikrotransakcje {#microtransactions}

Mikrotransakcje to płatności o niskiej wartości (np. niższe niż ułamek dolara), których firmy nie mogą przetwarzać bez ponoszenia strat. Podmioty te muszą płacić dostawcom usług płatniczych, czego nie mogą zrobić, jeśli marża na płatnościach klientów jest zbyt niska, aby wygenerować zysk.

Kanały płatności rozwiązują ten problem, zmniejszając koszty ogólne związane z mikrotransakcjami. Na przykład dostawca usług internetowych (ISP) może otworzyć kanał płatności z klientem, umożliwiając mu strumieniowe przesyłanie małych płatności za każdym razem, gdy korzysta z usługi.

Poza kosztem otwarcia i zamknięcia kanału, uczestnicy nie ponoszą dalszych kosztów mikrotransakcji (brak opłat za gaz). Jest to sytuacja korzystna dla obu stron, ponieważ klienci mają większą elastyczność w zakresie tego, ile płacą za usługi, a firmy nie tracą na zyskownych mikrotransakcjach.

### Zdecentralizowane aplikacje (dapps) {#decentralized-applications}

Podobnie jak kanały płatności, kanały stanu mogą dokonywać płatności warunkowych zgodnie z ostatecznymi stanami maszyny stanu. Kanały stanu mogą również obsługiwać dowolną logikę przejścia stanu, co czyni je użytecznymi do wykonywania ogólnych aplikacji pozałańcuchowo.

Kanały stanu są często ograniczone do prostych aplikacji turowych, ponieważ ułatwia to zarządzanie środkami zablokowanymi w kontrakcie onchain. Ponadto, przy ograniczonej liczbie stron aktualizujących stan aplikacji pozałańcuchowej w odstępach czasu, karanie nieuczciwego zachowania jest stosunkowo proste.

Wydajność aplikacji kanału stanu zależy również od jej projektu. Na przykład programista może wdrożyć kontrakt kanału aplikacji onchain raz i pozwolić innym graczom na ponowne korzystanie z aplikacji bez konieczności wchodzenia onchain. W tym przypadku początkowy kanał aplikacji służy jako kanał księgi obsługujący wiele wirtualnych kanałów, z których każdy uruchamia nową instancję inteligentnego kontraktu aplikacji pozałańcuchowo.

Potencjalnym przypadkiem użycia aplikacji kanałów stanu są proste gry dla dwóch graczy, w których środki są rozdzielane na podstawie wyniku gry. Korzyścią jest to, że gracze nie muszą sobie ufać (bezzaufaniowość), a kontrakt onchain, a nie gracze, kontroluje alokację środków i rozstrzyganie sporów (decentralizacja).

Inne możliwe przypadki użycia aplikacji kanałów stanu obejmują własność nazw ENS, księgi NFT i wiele innych.

### Transfery atomowe {#atomic-transfers}

Wczesne kanały płatności były ograniczone do transferów między dwiema stronami, co ograniczało ich użyteczność. Jednak wprowadzenie kanałów wirtualnych pozwoliło osobom fizycznym na kierowanie transferów przez pośredników (tj. wiele kanałów p2p) bez konieczności otwierania nowego kanału onchain.

Powszechnie określane jako „transfery wieloskokowe” (multi-hop transfers), kierowane płatności są atomowe (tj. albo wszystkie części transakcji kończą się sukcesem, albo cała transakcja kończy się niepowodzeniem). Transfery atomowe wykorzystują [kontrakty HTLC (Hashed Timelock Contracts)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts), aby zapewnić, że płatność zostanie zwolniona tylko po spełnieniu określonych warunków, zmniejszając w ten sposób ryzyko kontrahenta.

## Wady korzystania z kanałów stanu {#drawbacks-of-state-channels}

### Założenia dotyczące żywotności {#liveness-assumptions}

Aby zapewnić wydajność, kanały stanu nakładają limity czasowe na zdolność uczestników kanału do reagowania na spory. Zasada ta zakłada, że węzły równorzędne będą zawsze online, aby monitorować aktywność kanału i w razie potrzeby kwestionować wyzwania.

W rzeczywistości użytkownicy mogą przejść w tryb offline z przyczyn od nich niezależnych (np. słabe połączenie internetowe, awaria mechaniczna itp.). Jeśli uczciwy użytkownik przejdzie w tryb offline, złośliwy węzeł równorzędny może wykorzystać sytuację, przedstawiając stare stany pośrednie kontraktowi orzekającemu i kradnąc zablokowane środki.

Niektóre kanały używają „wież strażniczych” (watchtowers) — podmiotów odpowiedzialnych za obserwowanie zdarzeń spornych onchain w imieniu innych i podejmowanie niezbędnych działań, takich jak ostrzeganie zainteresowanych stron. Może to jednak zwiększyć koszty korzystania z kanału stanu.

### Niedostępność danych {#data-unavailability}

Jak wyjaśniono wcześniej, zakwestionowanie nieprawidłowego sporu wymaga przedstawienia najnowszego, ważnego stanu kanału stanu. Jest to kolejna zasada oparta na założeniu — że użytkownicy mają dostęp do najnowszego stanu kanału.

Chociaż oczekiwanie, że użytkownicy kanału będą przechowywać kopie stanu aplikacji pozałańcuchowej, jest rozsądne, dane te mogą zostać utracone z powodu błędu lub awarii mechanicznej. Jeśli użytkownik nie ma kopii zapasowej danych, może tylko mieć nadzieję, że druga strona nie sfinalizuje nieprawidłowego żądania wyjścia przy użyciu starych przejść stanu, które posiada.

Użytkownicy Ethereum nie muszą borykać się z tym problemem, ponieważ sieć egzekwuje zasady dotyczące dostępności danych. Dane transakcji są przechowywane i propagowane przez wszystkie węzły oraz dostępne dla użytkowników do pobrania w razie potrzeby.

### Problemy z płynnością {#liquidity-issues}

Aby ustanowić kanał blockchain, uczestnicy muszą zablokować środki w inteligentnym kontrakcie onchain na czas cyklu życia kanału. Zmniejsza to płynność użytkowników kanału, a także ogranicza kanały do tych, których stać na utrzymywanie zablokowanych środków w Sieci głównej.

Jednak kanały księgi — obsługiwane przez dostawcę usług pozałańcuchowych (OSP) — mogą zmniejszyć problemy z płynnością dla użytkowników. Dwa węzły równorzędne podłączone do kanału księgi mogą utworzyć kanał wirtualny, który mogą otworzyć i sfinalizować całkowicie pozałańcuchowo, w dowolnym momencie.

Dostawcy usług pozałańcuchowych mogliby również otwierać kanały z wieloma węzłami równorzędnymi, co czyni je użytecznymi do kierowania płatności. Oczywiście użytkownicy muszą uiszczać opłaty na rzecz OSP za ich usługi, co dla niektórych może być niepożądane.

### Ataki typu griefing {#griefing-attacks}

Ataki typu griefing są powszechną cechą systemów opartych na dowodach oszustwa. Atak typu griefing nie przynosi bezpośrednich korzyści atakującemu, ale powoduje żal (tj. szkodę) ofiary, stąd nazwa.

Dowodzenie oszustwa jest podatne na ataki typu griefing, ponieważ uczciwa strona musi reagować na każdy spór, nawet ten nieważny, w przeciwnym razie ryzykuje utratę swoich środków. Złośliwy uczestnik może zdecydować się na wielokrotne publikowanie nieaktualnych przejść stanu onchain, zmuszając uczciwą stronę do odpowiedzi z ważnym stanem. Koszty tych transakcji onchain mogą szybko rosnąć, powodując, że uczciwe strony tracą w tym procesie.

### Z góry określone zestawy uczestników {#predefined-participant-sets}

Z założenia liczba uczestników tworzących kanał stanu pozostaje stała przez cały okres jego istnienia. Wynika to z faktu, że aktualizacja zestawu uczestników skomplikowałaby działanie kanału, zwłaszcza podczas zasilania kanału lub rozstrzygania sporów. Dodawanie lub usuwanie uczestników wymagałoby również dodatkowej aktywności onchain, co zwiększa koszty ogólne dla użytkowników.

Chociaż ułatwia to wnioskowanie o kanałach stanu, ogranicza to użyteczność projektów kanałów dla twórców aplikacji. Częściowo wyjaśnia to, dlaczego zrezygnowano z kanałów stanu na rzecz innych rozwiązań skalujących, takich jak rollupy.

### Równoległe przetwarzanie transakcji {#parallel-transaction-processing}

Uczestnicy w kanale stanu wysyłają aktualizacje stanu na zmianę, dlatego najlepiej sprawdzają się one w „aplikacjach turowych” (np. gra w szachy dla dwóch graczy). Eliminuje to potrzebę obsługi jednoczesnych aktualizacji stanu i zmniejsza pracę, jaką musi wykonać kontrakt onchain, aby ukarać osoby publikujące nieaktualne aktualizacje. Jednak efektem ubocznym tego projektu jest to, że transakcje są od siebie zależne, co zwiększa opóźnienia i pogarsza ogólne wrażenia użytkownika.

Niektóre kanały stanu rozwiązują ten problem, stosując projekt „pełnego dupleksu” (full-duplex), który dzieli stan pozałańcuchowy na dwa jednokierunkowe stany „simplex”, umożliwiając jednoczesne aktualizacje stanu. Takie projekty poprawiają przepustowość pozałańcuchową i zmniejszają opóźnienia transakcji.

## Korzystaj z kanałów stanu {#use-state-channels}

Wiele projektów zapewnia implementacje kanałów stanu, które można zintegrować ze swoimi zdecentralizowanymi aplikacjami (dapps):

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Dalsza lektura {#further-reading}

**Kanały stanu**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 lutego 2018 r._
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _6 listopada 2015 r. - Jeff Coleman_
- [Basics of State Channels](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blockchain State Channels: A State of the Art](https://ieeexplore.ieee.org/document/9627997)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_