---
title: Optymistyczne pakiety zbiorcze
description: Wprowadzenie do optymistycznych pakietów zbiorczych — rozwiązania skalowania używanego przez społeczność Ethereum.
lang: pl
---

Optymistyczne pakiety zbiorcze to protokoły warstwy 2 (L2) zaprojektowane w celu zwiększenia przepustowości warstwy bazowej Ethereum. Redukują obciążenie obliczeniowe w głównym łańcuchu Ethereum poprzez przetwarzanie transakcji poza łańcuchem, oferując znaczną poprawę szybkości przetwarzania. W przeciwieństwie do innych rozwiązań skalujących, takich jak [łańcuchy poboczne](/developers/docs/scaling/sidechains/), rollupy optymistyczne czerpią bezpieczeństwo z sieci Mainnet, publikując wyniki transakcji w łańcuchu, lub [łańcuchy plasma](/developers/docs/scaling/plasma/), które również weryfikują transakcje w Ethereum za pomocą dowodów oszustwa, ale przechowują dane transakcji w innym miejscu.

Ponieważ obliczenia są powolną, kosztowną częścią korzystania z Ethereum, optymistyczne pakiety zbiorcze mogą oferować nawet 10-100 krotną poprawę skalowalności. Rollupy optymistyczne zapisują również transakcje do Ethereum jako `calldata` lub w [blobach](/roadmap/danksharding/), zmniejszając koszty gazu dla użytkowników.

## Wymagania wstępne {#prerequisites}

Należy przeczytać i zrozumieć nasze strony na temat [skalowania Ethereum](/developers/docs/scaling/) i [warstwy 2](/layer-2/).

## Czym jest optymistyczny pakiet zbiorczy? {#what-is-an-optimistic-rollup}

Rollup optymistyczny to podejście do skalowania Ethereum, które polega na przeniesieniu obliczeń i przechowywania stanu poza łańcuch. Rollupy optymistyczne wykonują transakcje poza Ethereum, ale publikują dane transakcji w sieci Mainnet jako `calldata` lub w [blobach](/roadmap/danksharding/).

Operatorzy rollupów optymistycznych łączą wiele transakcji poza łańcuchem w duże partie przed przesłaniem ich do Ethereum. Takie podejście umożliwia rozłożenie stałych kosztów na wiele transakcji w każdej partii, zmniejszając opłaty dla użytkowników końcowych. Optymistyczne pakiety zbiorcze wykorzystują również techniki kompresji w celu zmniejszenia ilości danych publikowanych w Ethereum.

Rollupy optymistyczne są uważane za „optymistyczne”, ponieważ zakładają, że transakcje poza łańcuchem są ważne i nie publikują dowodów ważności dla partii transakcji opublikowanych w łańcuchu. To odróżnia rollupy optymistyczne od [rollupów zerowej wiedzy](/developers/docs/scaling/zk-rollups), które publikują kryptograficzne [dowody ważności](/glossary/#validity-proof) dla transakcji poza łańcuchem.

Optymistyczne pakiety zbiorcze zamiast tego polegają na schemacie sprawdzania oszustw w celu wykrycia przypadków, w których transakcje nie są obliczane poprawnie. Po przesłaniu partii rollupu na Ethereum istnieje okno czasowe (zwane okresem wyzwania), w którym każdy może zakwestionować wyniki transakcji rollupu poprzez obliczenie [dowodu oszustwa](/glossary/#fraud-proof).

Jeśli dowód oszustwa się powiedzie, protokół pakietu zbiorczego ponownie wykonuje transakcję i odpowiednio aktualizuje stan pakietu zbiorczego. Innym skutkiem udanego dowodu oszustwa jest to, że sekwencer odpowiedzialny za włączenie nieprawidłowo wykonanej transakcji do bloku otrzymuje karę.

Jeśli partia pakietu zbiorczego pozostaje niekwestionowana (tj. wszystkie transakcje są poprawnie wykonane) po upływie okresu wyzwania, jest ona uznawana za ważną i akceptowaną w Ethereum. Inni mogą nadal budować na niepotwierdzonym bloku pakietu zbiorczego, ale z zastrzeżeniem: wyniki transakcji zostaną cofnięte, jeśli opierają się na nieprawidłowo wykonanej transakcji opublikowanej wcześniej.

## Jak optymistyczne pakiety zbiorcze wchodzą w interakcje z Ethereum? Rollupy optymistyczne a Ethereum {#optimistic-rollups-and-Ethereum}

Rollupy optymistyczne to [rozwiązania skalowania poza łańcuchem](/developers/docs/scaling/#offchain-scaling) zbudowane do działania na Ethereum. Każdy optymistyczny pakiet zbiorczy jest zarządzany przez zestaw inteligentnych kontraktów wdrożonych w sieci Ethereum. Rollupy optymistyczne przetwarzają transakcje poza głównym łańcuchem Ethereum, ale publikują transakcje poza łańcuchem (w partiach) do kontraktu rollupu w łańcuchu. Podobnie jak blockchain Ethereum, ten rejestr transakcji jest niezmienny i tworzy „łańcuch optymistycznych pakietów zbiorczych”

Architektura optymistycznego pakietu zbiorczego składa się z następujących części:

**Kontrakty w łańcuchu**: Działanie rollupów optymistycznych jest kontrolowane przez smart kontrakty działające na Ethereum. Obejmuje to kontrakty, które przechowują bloki pakietu zbiorczego, monitorują aktualizacje stanu pakietu zbiorczego i śledzą depozyty użytkownika. W tym sensie Ethereum służy jako warstwa podstawowa lub „warstwa 1” dla optymistycznych pakietów zbiorczych.

**Maszyna wirtualna poza łańcuchem (VM)**: Chociaż kontrakty zarządzające protokołem rollupu optymistycznego działają na Ethereum, protokół rollupu wykonuje obliczenia i przechowuje stan na innej maszynie wirtualnej, oddzielonej od [Wirtualnej Maszyny Ethereum](/developers/docs/evm/). Maszyna wirtualna poza łańcuchem jest miejscem, w którym działają aplikacje i wykonywane są zmiany stanu; służy jako górna warstwa lub „warstwa 2” dla rollupu optymistycznego.

Ponieważ rollupy optymistyczne są zaprojektowane do uruchamiania programów napisanych lub skompilowanych dla EVM, maszyna wirtualna poza łańcuchem zawiera wiele specyfikacji projektowych EVM. Dodatkowo, dowody oszustwa obliczone w łańcuchu pozwalają sieci Ethereum egzekwować ważność zmian stanu obliczonych w maszynie wirtualnej poza łańcuchem.

Optymistyczne pakiety zbiorcze są opisywane jako „hybrydowe rozwiązania skalowania”, ponieważ chociaż istnieją jako oddzielne protokoły, ich właściwości bezpieczeństwa pochodzą z Ethereum. Ethereum gwarantuje między innymi poprawność obliczeń rollupu poza łańcuchem i dostępność danych stojących za obliczeniami. To sprawia, że rollupy optymistyczne są bezpieczniejsze niż czyste protokoły skalowania poza łańcuchem (np. [łańcuchy poboczne](/developers/docs/scaling/sidechains/)), które nie opierają się na Ethereum w zakresie bezpieczeństwa.

Optymistyczne pakiety zbiorcze opierają się na głównym protokole Ethereum w następujących kwestiach:

### Dostępność danych {#data-availability}

Jak wspomniano, rollupy optymistyczne wysyłają dane transakcji do Ethereum jako `calldata` lub w [blobach](/roadmap/danksharding/). Ponieważ wykonanie łańcucha pakietów zbiorczych opiera się na przesłanych transakcjach, każdy może wykorzystać te informacje — zakotwiczone w warstwie bazowej Ethereum — do wykonania stanu pakietu zbiorczego i zweryfikowania poprawności przejść stanu.

[Dostępność danych](/developers/docs/data-availability/) jest kluczowa, ponieważ bez dostępu do danych o stanie, podmioty zgłaszające zastrzeżenia nie mogą konstruować dowodów oszustwa w celu zakwestionowania nieprawidłowych operacji rollupu. Ponieważ Ethereum zapewnia dostępność danych, ryzyko, że operatorzy pakietu zbiorczego uciekną od swoich złośliwych działań jest zmniejszone (np. przesyłania nieprawidłowych bloków).

### Odporność na cenzurę {#censorship-resistance}

Optymistyczne pakiety zbiorcze opierają się również na Ethereum w zakresie odporności na cenzurę. W optymistycznym pakiecie zbiorczym scentralizowany podmiot (operator) jest odpowiedzialny za przetwarzanie transakcji i przesyłanie bloków pakietu zbiorczego do Ethereum. Ma to pewne konsekwencje:

- Operatorzy pakietów zbiorczych mogą cenzurować użytkowników, przechodząc całkowicie w tryb offline lub odmawiając tworzenia bloków zawierających określone transakcje.

- Operatorzy pakietów zbiorczych mogą uniemożliwić użytkownikom wypłacanie środków zdeponowanych do kontraktu pakietu zbiorczego poprzez ukrywanie danych o stanie niezbędnych do przeprowadzenia dowodu własności Merkle. Ukrycie danych o stanie może również ukryć stan pakietu zbiorczego przed użytkownikami i uniemożliwić im interakcję z pakietem zbiorczym.

Optymistyczne pakiety zbiorcze rozwiązują ten problem, zmuszając operatorów do publikowania danych związanych z aktualizacjami stanu na Ethereum. Publikowanie danych rollupów w łańcuchu ma następujące zalety:

- Jeśli operator optymistycznego pakietu zbiorczego przejdzie w tryb offline lub przestanie produkować partie transakcji, inny węzeł może wykorzystać dostępne dane do odtworzenia ostatniego stanu pakietu zbiorczego i kontynuowania produkcji bloków.

- Użytkownicy mogą wykorzystywać dane transakcyjne do tworzenia dowodów Merkle potwierdzających własność środków i wypłacać swoje aktywa z pakietu zbiorczego.

- Użytkownicy mogą również przesyłać swoje transakcje do warstwy 1 zamiast do sekwencera, w którym to przypadku sekwencer musi uwzględnić transakcję w określonym limicie czasu, aby kontynuować produkcję ważnych bloków.

### Rozliczenie {#settlement}

Inną rolą Ethereum w kontekście optymistycznych pakietów zbiorczych jest warstwa rozliczeniowa. Warstwa rozliczeniowa zakotwicza cały ekosystem blockchainu, ustanawia bezpieczeństwo i zapewnia obiektywną finalizację w przypadku wystąpienia sporu w innym łańcuchu (w tym przypadku optymistycznych pakietów zbiorczych), który wymaga arbitrażu.

Sieć główna Ethereum zapewnia centrum dla optymistycznych pakietów zbiorczych w celu weryfikacji dowodów oszustwa i rozstrzygania sporów. Co więcej, transakcje przeprowadzone w rollupie są finalne dopiero _po_ zaakceptowaniu bloku rollupu na Ethereum. Gdy transakcja pakietu zbiorczego zostanie zatwierdzona w warstwie bazowej Ethereum, nie można jej wycofać (z wyjątkiem bardzo mało prawdopodobnego przypadku reorganizacji łańcucha).

## Jak działają optymistyczne pakiety zbiorcze? {#how-optimistic-rollups-work}

### Wykonywanie i agregacja transakcji {#transaction-execution-and-aggregation}

Użytkownicy przesyłają transakcje do „operatorów”, które są węzłami odpowiedzialnymi za przetwarzanie transakcji w optymistycznym pakiecie zbiorczym. Znany również jako „walidator” lub „agregator”, operator agreguje transakcje, kompresuje dane bazowe i publikuje blok w Ethereum.

Chociaż każdy może zostać walidatorem, walidatorzy rollupów optymistycznych muszą zapewnić zabezpieczenie (bond) przed produkcją bloków, podobnie jak w [systemie proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Zabezpieczenie to może zostać odcięte, jeśli walidator opublikuje nieprawidłowy blok lub buduje na starym, ale nieprawidłowym bloku (nawet jeśli jego blok jest ważny). W ten sposób optymistyczne pakiety zbiorcze wykorzystują zachęty kryptoekonomiczne, aby zapewnić, że walidatorzy działają uczciwie.

Oczekuje się, że inne walidatory w łańcuchu optymistycznego pakietu zbiorczego wykonają przesłane transakcje przy użyciu swojej kopii stanu pakietu zbiorczego. Jeśli stan końcowy walidatora różni się od stanu zaproponowanego przez operatora, może on rozpocząć wyzwanie i obliczyć dowód oszustwa.

Niektóre optymistyczne pakiety zbiorcze mogą zrezygnować z systemu walidatora bez uprawnień i użyć pojedynczego „sekwencera” do wykonania łańcucha. Podobnie jak walidator, sekwencer przetwarza transakcje, tworzy bloki pakietu zbiorczego i przesyła transakcje pakietu zbiorczego do łańcucha warstwy 1 (Ethereum).

Sekwencer różni się od zwykłego operatora pakietu zbiorczego, ponieważ ma większą kontrolę nad porządkowaniem kolejnością transakcji. Ponadto sekwencer ma priorytetowy dostęp do łańcucha rollupu i jest jedynym podmiotem upoważnionym do przesyłania transakcji do kontraktu w łańcuchu. Transakcje od węzłów innych niż sekwencer lub zwykłych użytkowników są po prostu umieszczane w kolejce w oddzielnej skrzynce odbiorczej, dopóki sekwencer nie włączy ich do nowej partii.

#### Przesyłanie bloków rollupów do Ethereum {#submitting-blocks-to-ethereum}

Jak wspomniano, operator rollupu optymistycznego łączy transakcje poza łańcuchem w partię i wysyła ją do Ethereum w celu notarialnego poświadczenia. Proces ten obejmuje kompresję danych związanych z transakcjami i publikowanie ich w Ethereum jako `calldata` lub w blobach.

`calldata` to niemodyfikowalny, nietrwały obszar w smart kontrakcie, który zachowuje się głównie jak [pamięć](/developers/docs/smart-contracts/anatomy/#memory). Chociaż `calldata` pozostaje w łańcuchu jako część [logów historycznych](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) blockchaina, nie jest przechowywana jako część stanu Ethereum. Ponieważ `calldata` nie dotyka żadnej części stanu Ethereum, jest tańsza niż stan do przechowywania danych w łańcuchu.

Słowo kluczowe `calldata` jest również używane w Solidity do przekazywania argumentów do funkcji smart kontraktu w czasie wykonywania. `calldata` identyfikuje funkcję wywoływaną podczas transakcji i przechowuje dane wejściowe do funkcji w postaci dowolnej sekwencji bajtów.

W kontekście rollupów optymistycznych, `calldata` jest używana do wysyłania skompresowanych danych transakcyjnych do kontraktu w łańcuchu. Operator pakietu zbiorczego dodaje nową partię poprzez wywołanie wymaganej funkcji w kontrakcie pakietu zbiorczego i przekazanie skompresowanych danych jako argumentów funkcji. Używanie `calldata` zmniejsza opłaty użytkownika, ponieważ większość kosztów ponoszonych przez rollupy pochodzi z przechowywania danych w łańcuchu.

Oto [przykład](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) przesłania partii rollupu, aby pokazać, jak działa ta koncepcja. Sekwencer wywołał metodę `appendSequencerBatch()` i przekazał skompresowane dane transakcji jako dane wejściowe za pomocą `calldata`.

Niektóre rollupy używają teraz blobów do publikowania partii transakcji w Ethereum.

Bloby są niemodyfikowalne i nietrwałe (podobnie jak `calldata`), ale są usuwane z historii po ~18 dniach. Więcej informacji na temat blobów można znaleźć w [Danksharding](/roadmap/danksharding).

### Zobowiązania dotyczące stanu {#state-commitments}

W dowolnym momencie stan rollupu optymistycznego (konta, salda, kod kontraktu itp.) jest zorganizowany jako [drzewo Merklego](/whitepaper/#merkle-trees) zwane „drzewem stanu”. Korzeń tego drzewa Merkle (korzeń stanu), który odwołuje się do najnowszego stanu pakietu zbiorczego, jest zahashowany i przechowywany w kontrakcie pakietu zbiorczego. Każde przejście stanu w łańcuchu tworzy nowy stan pakietu zbiorczego, do którego operator zobowiązuje się poprzez obliczenie nowego korzenia stanu.

Operator jest zobowiązany do przesłania zarówno starych, jak i nowych korzeni stanu podczas publikowania partii. Jeśli stary korzeń stanu pasuje do istniejącego korzenia stanu w kontrakcie w łańcuchu, ten ostatni jest odrzucany i zastępowany nowym korzeniem stanu.

Operator pakietu zbiorczego jest również zobowiązany do zatwierdzenia korzenia Merkle dla samej partii transakcji. Pozwala to każdemu udowodnić włączenie transakcji do partii (na L1) poprzez przedstawienie [dowodu Merklego](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Zobowiązania stanu, w szczególności korzenie stanu, są niezbędne do udowodnienia poprawności zmian stanu w optymistycznym pakiecie zbiorczym. Kontrakt pakietu zbiorczego akceptuje nowe korzenie stanu od operatorów natychmiast po ich przesłaniu, ale może później usunąć nieprawidłowe korzenie stanu, aby przywrócić pakiet zbiorczy do jego prawidłowego stanu.

### Dowodzenie oszustwa {#fraud-proving}

Jak wyjaśniono, rollupy optymistyczne pozwalają każdemu publikować bloki bez dostarczania dowodów ważności. Jednakże, aby zapewnić bezpieczeństwo łańcucha, rollupy optymistyczne określają okno czasowe, w którym każdy może zakwestionować przejście stanu. Dlatego bloki rollupu są nazywane „asercjami”, ponieważ każdy może zakwestionować ich ważność.

Jeśli ktoś zakwestionuje asercję, protokół rollupu zainicjuje obliczanie dowodu oszustwa. Każdy rodzaj dowodu oszustwa jest interaktywny — ktoś musi opublikować asercję, zanim inna osoba będzie mogła ją zakwestionować. Różnica polega na tym, ile rund interakcji jest wymaganych do obliczenia dowodu oszustwa.

Jednorundowe interaktywne schematy dowodzenia odtwarzają sporne transakcje na L1 w celu wykrycia nieprawidłowych asercji. Protokół rollupu emuluje ponowne wykonanie spornej transakcji na L1 (Ethereum) przy użyciu kontraktu weryfikującego, a obliczony korzeń stanu decyduje o tym, kto wygra wyzwanie. Jeśli roszczenie podmiotu zgłaszającego zastrzeżenia co do prawidłowego stanu rollupu jest poprawne, operator jest karany poprzez obcięcie (slashing) jego zabezpieczenia (bondu).

Jednak ponowne wykonywanie transakcji na L1 w celu wykrycia oszustwa wymaga publikowania zobowiązań stanu dla poszczególnych transakcji i zwiększa ilość danych, które rollupy muszą publikować w łańcuchu. Odtwarzanie transakcji wiąże się również ze znacznymi kosztami gazu. Z tych powodów rollupy optymistyczne przechodzą na wielorundowe dowodzenie interaktywne, które osiąga ten sam cel (tj. wykrywanie nieprawidłowych operacji rollupu) z większą wydajnością.

#### Wielorundowe dowodzenie interaktywne {#multi-round-interactive-proving}

Wielorundowe dowodzenie interaktywne obejmuje protokół wymiany informacji między stroną zgłaszającą asercję a stroną ją kwestionującą, nadzorowany przez kontrakt weryfikujący L1, który ostatecznie decyduje, która strona kłamie. Gdy węzeł L2 zakwestionuje asercję, strona zgłaszająca asercję jest zobowiązana do podzielenia spornej asercji na dwie równe połowy. Każda pojedyncza asercja w tym przypadku będzie zawierać tyle samo kroków obliczeniowych co druga.

Strona kwestionująca wybierze następnie, którą asercję chce zakwestionować. Proces dzielenia (zwany „protokołem bisekcji”) jest kontynuowany, dopóki obie strony nie spierają się o asercję dotyczącą _pojedynczego_ kroku wykonania. W tym momencie kontrakt L1 rozstrzygnie spór, oceniając instrukcję (i jej wynik) w celu wykrycia oszukującej strony.

Strona zgłaszająca asercję jest zobowiązana do dostarczenia „dowodu jednokrokowego” weryfikującego ważność spornego obliczenia jednokrokowego. Jeśli strona zgłaszająca asercję nie dostarczy dowodu jednokrokowego lub weryfikator L1 uzna dowód za nieważny, przegrywa wyzwanie.

Kilka uwag na temat tego rodzaju dowodu oszustwa:

1. Wielorundowe interaktywne dowodzenie oszustwa jest uważane za wydajne, ponieważ minimalizuje pracę, jaką łańcuch L1 musi wykonać w arbitrażu sporów. Zamiast odtwarzać całą transakcję, łańcuch L1 musi jedynie ponownie wykonać jeden krok w wykonaniu rollupu.

2. Protokoły bisekcji zmniejszają ilość danych publikowanych w łańcuchu (nie ma potrzeby publikowania zatwierdzeń stanu dla każdej transakcji). Ponadto transakcje rollupów optymistycznych nie są ograniczone limitem gazu Ethereum. Odwrotnie, rollupy optymistyczne ponownie wykonujące transakcje muszą upewnić się, że transakcja L2 ma niższy limit gazu, aby emulować jej wykonanie w ramach pojedynczej transakcji Ethereum.

3. Część zabezpieczenia (bondu) złośliwej strony zgłaszającej asercję jest przyznawana stronie kwestionującej, podczas gdy druga część jest spalana. Spalanie zapobiega zmowie między walidatorami; jeśli dwóch walidatorów zmówi się w celu zainicjowania fałszywych wyzwań, nadal stracą znaczną część całej stawki (stake).

4. Wielorundowe dowodzenie interaktywne wymaga, aby obie strony (zgłaszająca asercję i kwestionująca ją) wykonały ruchy w określonym oknie czasowym. Niewykonanie działania przed upływem terminu powoduje, że strona, która się go nie dotrzymała, przegrywa wyzwanie.

#### Dlaczego dowody oszustwa mają znaczenie dla rollupów optymistycznych {#fraud-proof-benefits}

Dowody oszustwa są ważne, ponieważ ułatwiają _finalizację niewymagającą zaufania_ w rollupach optymistycznych. Finalizacja niewymagająca zaufania to cecha rollupów optymistycznych, która gwarantuje, że transakcja — o ile jest ważna — zostanie ostatecznie potwierdzona.

Złośliwe węzły mogą próbować opóźnić potwierdzenie prawidłowego bloku rollupu, rozpoczynając fałszywe wyzwania. Jednakże, dowody oszustwa ostatecznie udowodnią ważność bloku rollupu i spowodują jego potwierdzenie.

Jest to również związane z inną właściwością bezpieczeństwa rollupów optymistycznych: ważność łańcucha zależy od istnienia _jednego_ uczciwego węzła. Uczciwy węzeł może prawidłowo rozwijać łańcuch, publikując prawidłowe asercje lub kwestionując nieprawidłowe asercje. W każdym przypadku złośliwe węzły, które wejdą w spór z uczciwym węzłem, stracą swoje stawki (stake) podczas procesu dowodzenia oszustwa.

### Interoperacyjność L1/L2 {#l1-l2-interoperability}

Rollupy optymistyczne są zaprojektowane pod kątem interoperacyjności z siecią Mainnet Ethereum i pozwalają użytkownikom przekazywać wiadomości i dowolne dane między L1 a L2. Są one również kompatybilne z EVM, więc można przenieść istniejące [dapki](/developers/docs/dapps/) do rollupów optymistycznych lub tworzyć nowe dapki za pomocą narzędzi deweloperskich Ethereum.

#### 1. Przenoszenie aktywów {#asset-movement}

##### Wejście do rollupu

Aby użyć rollupu optymistycznego, użytkownicy wpłacają ETH, tokeny ERC-20 i inne akceptowane aktywa do kontraktu [mostu](/developers/docs/bridges/) rollupu na L1. Kontrakt mostu przekaże transakcję do L2, gdzie równoważna ilość aktywów jest mintowana i wysyłana na wybrany adres użytkownika w rollupie optymistycznym.

Transakcje generowane przez użytkownika (jak depozyt z L1 do L2) są zwykle kolejkowane, dopóki sekwencer nie prześle ich ponownie do kontraktu rollupu. Jednakże, w celu zachowania odporności na cenzurę, rollupy optymistyczne pozwalają użytkownikom przesyłać transakcje bezpośrednio do kontraktu rollupu w łańcuchu, jeśli zostały one opóźnione poza maksymalny dozwolony czas.

Niektóre rollupy optymistyczne stosują bardziej bezpośrednie podejście, aby zapobiec cenzurowaniu użytkowników przez sekwencery. W tym przypadku blok jest definiowany przez wszystkie transakcje przesłane do kontraktu L1 od poprzedniego bloku (np. depozyty) oprócz transakcji przetwarzanych w łańcuchu rollupu. Jeśli sekwencer zignoruje transakcję L1, opublikuje (w sposób dający się udowodnić) niewłaściwy korzeń stanu; dlatego sekwencery nie mogą opóźniać wiadomości generowanych przez użytkowników po ich opublikowaniu na L1.

##### Wyjście z rollupu

Wycofanie się z rollupu optymistycznego do Ethereum jest trudniejsze ze względu na schemat dowodzenia oszustwa. Jeśli użytkownik inicjuje transakcję z L2 do L1 w celu wypłaty środków zdeponowanych na L1, musi poczekać, aż upłynie okres wyzwania — trwający około siedmiu dni. Niemniej jednak, sam proces wypłaty jest dość prosty.

Po zainicjowaniu żądania wypłaty w rollupie L2, transakcja jest włączana do następnej partii, podczas gdy aktywa użytkownika w rollupie są spalane. Gdy partia zostanie opublikowana na Ethereum, użytkownik może obliczyć dowód Merklego weryfikujący włączenie jego transakcji wyjścia do bloku. Następnie pozostaje kwestia odczekania okresu opóźnienia w celu sfinalizowania transakcji na L1 i wypłaty środków do sieci Mainnet.

Aby uniknąć tygodniowego oczekiwania przed wypłatą środków do Ethereum, użytkownicy rollupów optymistycznych mogą skorzystać z usług **dostawcy płynności** (LP). Dostawca płynności przejmuje własność oczekującej wypłaty z L2 i płaci użytkownikowi na L1 (w zamian za opłatę).

Dostawcy płynności mogą sprawdzić ważność żądania wypłaty użytkownika (samodzielnie wykonując łańcuch) przed zwolnieniem środków. W ten sposób mają pewność, że transakcja zostanie ostatecznie potwierdzona (tj. finalizacja niewymagająca zaufania).

#### 2. Kompatybilność z EVM {#evm-compatibility}

Dla deweloperów zaletą rollupów optymistycznych jest ich kompatybilność — lub, co jeszcze lepsze, równoważność — z [Wirtualną Maszyną Ethereum (EVM)](/developers/docs/evm/). Rollupy kompatybilne z EVM są zgodne ze specyfikacjami zawartymi w [Żółtej Księdze Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) i obsługują EVM na poziomie kodu bajtowego.

Kompatybilność z EVM w rollupach optymistycznych ma następujące zalety:

i. Deweloperzy mogą migrować istniejące smart kontrakty z Ethereum do łańcuchów rollupów optymistycznych bez konieczności obszernego modyfikowania baz kodu. Może to zaoszczędzić czas zespołów deweloperskich podczas wdrażania smart kontraktów Ethereum na L2.

ii. Deweloperzy i zespoły projektowe używające rollupów optymistycznych mogą korzystać z infrastruktury Ethereum. Obejmuje to języki programowania, biblioteki kodu, narzędzia testowe, oprogramowanie klienckie, infrastrukturę wdrożeniową i tak dalej.

Korzystanie z istniejących narzędzi jest ważne, ponieważ narzędzia te zostały gruntownie poddane audytowi, debugowaniu i ulepszaniu na przestrzeni lat. Eliminuje to również potrzebę uczenia się przez deweloperów Ethereum, jak budować z całkowicie nowym stosem deweloperskim.

#### 3. Wywołania kontraktów międzyłańcuchowych {#cross-chain-contract-calls}

Użytkownicy (konta posiadane zewnętrznie) wchodzą w interakcję z kontraktami L2, przesyłając transakcję do kontraktu rollupu lub zlecając to sekwencerowi lub walidatorowi. Rollupy optymistyczne pozwalają również kontom kontraktowym na Ethereum wchodzić w interakcję z kontraktami L2 przy użyciu kontraktów pomostowych do przekazywania wiadomości i danych między L1 a L2. Oznacza to, że można zaprogramować kontrakt L1 na sieci Mainnet Ethereum, aby wywoływał funkcje należące do kontraktów na rollupie optymistycznym L2.

Wywołania kontraktów międzyłańcuchowych odbywają się asynchronicznie, co oznacza, że wywołanie jest najpierw inicjowane, a następnie wykonywane w późniejszym czasie. Różni się to od wywołań między dwoma kontraktami na Ethereum, gdzie wywołanie daje natychmiastowe rezultaty.

Przykładem wywołania kontraktu międzyłańcuchowego jest opisany wcześniej depozyt tokenów. Kontrakt na L1 deponuje tokeny użytkownika i wysyła wiadomość do sparowanego kontraktu L2, aby wyemitować równoważną ilość tokenów w rollupie.

Ponieważ wywołania wiadomości międzyłańcuchowych skutkują wykonaniem kontraktu, nadawca jest zwykle zobowiązany do pokrycia [kosztów gazu](/developers/docs/gas/) za obliczenia. Zaleca się ustawienie wysokiego limitu gazu, aby zapobiec niepowodzeniu transakcji w docelowym łańcuchu. Scenariusz mostkowania tokenów jest dobrym przykładem; jeśli strona L1 transakcji (deponowanie tokenów) działa, ale strona L2 (mintowanie nowych tokenów) zawodzi z powodu niskiego gazu, depozyt staje się nieodwracalny.

Na koniec należy zauważyć, że wywołania wiadomości z L2 do L1 między kontraktami muszą uwzględniać opóźnienia (wywołania z L1 do L2 są zazwyczaj wykonywane po kilku minutach). Dzieje się tak, ponieważ wiadomości wysyłane do sieci Mainnet z rollupu optymistycznego nie mogą być wykonane, dopóki nie upłynie okno wyzwania.

## Jak działają opłaty za rollupy optymistyczne? {#how-do-optimistic-rollup-fees-work}

Rollupy optymistyczne używają schematu opłat za gaz, podobnie jak Ethereum, do określenia, ile użytkownicy płacą za transakcję. Opłaty pobierane w rollupach optymistycznych zależą od następujących składników:

1. **Zapis stanu**: Rollupy optymistyczne publikują dane transakcji i nagłówki bloków (składające się z haszu nagłówka poprzedniego bloku, korzenia stanu, korzenia partii) w Ethereum jako `blob`, czyli „duży obiekt binarny”. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) wprowadził opłacalne rozwiązanie do dołączania danych w łańcuchu. `blob` to nowe pole transakcji, które pozwala rollupom publikować skompresowane dane o przejściu stanu do warstwy L1 Ethereum. W przeciwieństwie do `calldata`, które pozostaje na stałe w łańcuchu, bloby są krótkotrwałe i mogą być usuwane z klientów po [4096 epokach](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (około 18 dni). Używając blobów do publikowania partii skompresowanych transakcji, rollupy optymistyczne mogą znacznie obniżyć koszt zapisywania transakcji na L1.

2. **Zużyty gaz za bloby**: Transakcje przenoszące bloby wykorzystują dynamiczny mechanizm opłat podobny do tego wprowadzonego przez [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Opłata za gaz dla transakcji typu 3 uwzględnia podstawową opłatę za bloby, która jest określana przez sieć na podstawie zapotrzebowania na przestrzeń dla blobów i wykorzystania przestrzeni dla blobów przez wysyłaną transakcję.

3. **Opłaty dla operatorów L2**: Jest to kwota płacona węzłom rollupu jako rekompensata za koszty obliczeniowe poniesione przy przetwarzaniu transakcji, podobnie jak opłaty za gaz na Ethereum. Węzły rollupów pobierają niższe opłaty transakcyjne, ponieważ warstwy L2 mają wyższą zdolność przetwarzania i nie borykają się z przeciążeniami sieci, które zmuszają walidatorów na Ethereum do priorytetowego traktowania transakcji z wyższymi opłatami.

Rollupy optymistyczne stosują kilka mechanizmów w celu obniżenia opłat dla użytkowników, w tym grupowanie transakcji i kompresowanie `calldata` w celu zmniejszenia kosztów publikacji danych. Możesz sprawdzić [narzędzie do śledzenia opłat L2](https://l2fees.info/), aby uzyskać przegląd w czasie rzeczywistym, ile kosztuje korzystanie z rollupów optymistycznych opartych na Ethereum.

## Jak rollupy optymistyczne skalują Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Jak wyjaśniono, rollupy optymistyczne publikują skompresowane dane transakcji na Ethereum, aby zagwarantować dostępność danych. Możliwość kompresji danych publikowanych w łańcuchu jest kluczowa dla skalowania przepustowości na Ethereum za pomocą rollupów optymistycznych.

Główny łańcuch Ethereum nakłada limity na to, ile danych mogą pomieścić bloki, wyrażone w jednostkach gazu ([średni rozmiar bloku](/developers/docs/blocks/#block-size) to 15 milionów gazu). Chociaż ogranicza to ilość gazu, jaką może zużyć każda transakcja, oznacza to również, że możemy zwiększyć liczbę transakcji przetwarzanych w bloku poprzez zmniejszenie ilości danych związanych z transakcjami — co bezpośrednio poprawia skalowalność.

Rollupy optymistyczne wykorzystują kilka technik w celu osiągnięcia kompresji danych transakcyjnych i poprawy wskaźników TPS. Na przykład, ten [artykuł](https://vitalik.eth.limo/general/2021/01/05/rollup.html) porównuje dane generowane przez podstawową transakcję użytkownika (wysyłanie etheru) w sieci Mainnet z ilością danych generowanych przez tę samą transakcję w rollupie:

| Parametr | Ethereum (L1)                     | Rollup (L2) |
| -------- | ---------------------------------------------------- | ------------------------------ |
| Nonce    | ~3                                   | 0                              |
| Gasprice | ~8                                   | 0-0.5          |
| Gaz      | 3                                                    | 0-0.5          |
| To       | 21                                                   | 4                              |
| Wartość  | 9                                                    | ~3             |
| Podpis   | ~68 (2 + 33 + 33) | ~0,5           |
| From     | 0 (odzyskane z sig)               | 4                              |
| **Suma** | **~112 bajtów**                      | **~12 bajtów** |

Wykonanie przybliżonych obliczeń na podstawie tych danych może pomóc pokazać ulepszenia skalowalności, jakie oferuje rollup optymistyczny:

1. Docelowy rozmiar każdego bloku to 15 milionów gazu, a weryfikacja jednego bajtu danych kosztuje 16 gazu. Podzielenie średniego rozmiaru bloku przez 16 gazu (15 000 000/16) pokazuje, że średni blok może pomieścić **937 500 bajtów danych**.
2. Jeśli podstawowa transakcja rollupu zużywa 12 bajtów, to średni blok Ethereum może przetworzyć **78 125 transakcji rollupu** (937 500/12) lub **39 partii rollupu** (jeśli każda partia zawiera średnio 2000 transakcji).
3. Jeśli nowy blok jest produkowany na Ethereum co 15 sekund, to szybkość przetwarzania rollupu wyniosłaby około **5 208 transakcji na sekundę**. Osiąga się to, dzieląc liczbę podstawowych transakcji rollupu, które może pomieścić blok Ethereum (**78 125**), przez średni czas bloku (**15 sekund**).

Jest to dość optymistyczne oszacowanie, biorąc pod uwagę, że transakcje rollupów optymistycznych nie mogą w całości wypełnić bloku na Ethereum. Może to jednak dać przybliżone pojęcie o tym, jak duże zyski w skalowalności mogą zapewnić rollupy optymistyczne użytkownikom Ethereum (obecne implementacje oferują do 2000 TPS).

Oczekuje się, że wprowadzenie [data shardingu](/roadmap/danksharding/) na Ethereum poprawi skalowalność w rollupach optymistycznych. Ponieważ transakcje rollupów muszą dzielić przestrzeń blokową z innymi transakcjami niebędącymi rollupami, ich zdolność przetwarzania jest ograniczona przez przepustowość danych w głównym łańcuchu Ethereum. Danksharding zwiększy dostępną przestrzeń dla łańcuchów L2 do publikowania danych na blok, używając tańszej, nietrwałej pamięci masowej „blob” zamiast drogiej, trwałej `CALLDATA`.

### Zalety i wady rollupów optymistycznych {#optimistic-rollups-pros-and-cons}

| Zalety                                                                                                                                                                                                    | Wady                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferuje ogromne ulepszenia w skalowalności bez poświęcania bezpieczeństwa lub braku konieczności zaufania.                                                                                | Opóźnienia w finalizacji transakcji z powodu potencjalnych wyzwań związanych z oszustwami.                                                                                                 |
| Dane transakcji są przechowywane w łańcuchu warstwy 1, co poprawia przejrzystość, bezpieczeństwo, odporność na cenzurę i decentralizację.                                                 | Scentralizowani operatorzy rollupów (sekwencery) mogą wpływać na kolejność transakcji.                                                                                  |
| Dowodzenie oszustwa gwarantuje finalizację niewymagającą zaufania i pozwala uczciwym mniejszościom zabezpieczyć łańcuch.                                                                  | Jeśli nie ma uczciwych węzłów, złośliwy operator może ukraść środki, publikując nieprawidłowe bloki i zatwierdzenia stanu.                                                                 |
| Obliczanie dowodów oszustwa jest otwarte dla zwykłych węzłów L2, w przeciwieństwie do dowodów ważności (używanych w rollupach ZK), które wymagają specjalnego sprzętu. | Model bezpieczeństwa opiera się na co najmniej jednym uczciwym węźle wykonującym transakcje rollupu i przesyłającym dowody oszustwa w celu zakwestionowania nieprawidłowych przejść stanu. |
| Rollupy korzystają z „żywotności niewymagającej zaufania” (każdy może zmusić łańcuch do postępu, wykonując transakcje i publikując asercje)                                            | Użytkownicy muszą czekać na wygaśnięcie tygodniowego okresu wyzwania, zanim wypłacą środki z powrotem do Ethereum.                                                                         |
| Rollupy optymistyczne opierają się na dobrze zaprojektowanych zachętach kryptoekonomicznych w celu zwiększenia bezpieczeństwa w łańcuchu.                                                 | Rollupy muszą publikować wszystkie dane transakcji w łańcuchu, co może zwiększyć koszty.                                                                                                   |
| Zgodność z EVM i Solidity pozwala programistom przenosić natywne smart kontrakty Ethereum do rollupów lub używać istniejących narzędzi do tworzenia nowych dapek.                         |                                                                                                                                                                                                            |

### Wizualne wyjaśnienie rollupów optymistycznych {#optimistic-video}

Jesteś raczej wzrokowcem? Zobacz, jak Finematics wyjaśnia rollupy optymistyczne:

<YouTube id="7pWxCklcNsU" start="263" />

## Dalsze informacje na temat rollupów optymistycznych

- [Jak działają rollupy optymistyczne (Kompletny przewodnik)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Czym jest rollup blockchain? Wprowadzenie techniczne](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Niezbędny przewodnik po Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Stan dowodów oszustwa w L2 Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Jak naprawdę działa rollup Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Dogłębna analiza OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Czym jest optymistyczna maszyna wirtualna?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
