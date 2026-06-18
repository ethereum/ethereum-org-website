---
title: Optymistyczne rollupy
description: "Wprowadzenie do optymistycznych rollupów — rozwiązania skalującego używanego przez społeczność Ethereum."
lang: pl
---

Optymistyczne rollupy to protokoły warstwy 2 (L2) zaprojektowane w celu zwiększenia przepustowości warstwy bazowej Ethereum. Zmniejszają one ilość obliczeń w głównym łańcuchu [Ethereum](/) poprzez przetwarzanie transakcji pozałańcuchowo (offchain), oferując znaczną poprawę szybkości przetwarzania. W przeciwieństwie do innych rozwiązań skalujących, takich jak [łańcuchy poboczne (sidechains)](/developers/docs/scaling/sidechains/), optymistyczne rollupy czerpią bezpieczeństwo z Sieci głównej (Mainnet), publikując wyniki transakcji onchain, lub [łańcuchów Plasma](/developers/docs/scaling/plasma/), które również weryfikują transakcje w Ethereum za pomocą dowodów oszustwa, ale przechowują dane transakcji w innym miejscu.

Ponieważ obliczenia są powolną i kosztowną częścią korzystania z Ethereum, optymistyczne rollupy mogą zaoferować od 10 do 100-krotnej poprawy skalowalności. Optymistyczne rollupy zapisują również transakcje w Ethereum jako `calldata` lub w [blobach](/roadmap/danksharding/), zmniejszając koszty gazu dla użytkowników.

## Wymagania wstępne {#prerequisites}

Powinieneś przeczytać i zrozumieć nasze strony o [skalowaniu Ethereum](/developers/docs/scaling/) i [warstwie 2](/layer-2/).

## Czym jest optymistyczny rollup? {#what-is-an-optimistic-rollup}

Optymistyczny rollup to podejście do skalowania Ethereum, które polega na przeniesieniu obliczeń i przechowywania stanu pozałańcuchowo. Optymistyczne rollupy wykonują transakcje poza Ethereum, ale przesyłają dane transakcji do Sieci głównej jako `calldata` lub w [blobach](/roadmap/danksharding/).

Operatorzy optymistycznych rollupów łączą wiele transakcji pozałańcuchowych w duże partie (wsady) przed przesłaniem ich do Ethereum. Takie podejście umożliwia rozłożenie stałych kosztów na wiele transakcji w każdym wsadzie, zmniejszając opłaty dla użytkowników końcowych. Optymistyczne rollupy wykorzystują również techniki kompresji w celu zmniejszenia ilości danych przesyłanych do Ethereum.

Optymistyczne rollupy są uważane za „optymistyczne”, ponieważ zakładają, że transakcje pozałańcuchowe są ważne i nie publikują dowodów ważności dla partii transakcji przesyłanych onchain. Odróżnia to optymistyczne rollupy od [rollupów z wiedzą zerową](/developers/docs/scaling/zk-rollups), które publikują kryptograficzne [dowody ważności](/glossary/#validity-proof) dla transakcji pozałańcuchowych.

Zamiast tego optymistyczne rollupy opierają się na schemacie dowodzenia oszustw w celu wykrywania przypadków, w których transakcje nie są obliczane poprawnie. Po przesłaniu partii rollupa do Ethereum następuje okno czasowe (zwane okresem wyzwania), podczas którego każdy może zakwestionować wyniki transakcji rollupa, obliczając [dowód oszustwa](/glossary/#fraud-proof).

Jeśli dowód oszustwa się powiedzie, protokół rollupa ponownie wykonuje transakcję (lub transakcje) i odpowiednio aktualizuje stan rollupa. Innym skutkiem udanego dowodu oszustwa jest to, że sekwenser odpowiedzialny za włączenie niepoprawnie wykonanej transakcji do bloku otrzymuje karę.

Jeśli partia rollupa pozostanie niezakwestionowana (tj. wszystkie transakcje zostaną wykonane poprawnie) po upływie okresu wyzwania, zostaje uznana za ważną i zaakceptowana w Ethereum. Inni mogą kontynuować budowanie na niepotwierdzonym bloku rollupa, ale z pewnym zastrzeżeniem: wyniki transakcji zostaną cofnięte, jeśli będą oparte na niepoprawnie wykonanej transakcji opublikowanej wcześniej.

## Jak optymistyczne rollupy wchodzą w interakcję z Ethereum? {#optimistic-rollups-and-ethereum}

Optymistyczne rollupy to [pozałańcuchowe rozwiązania skalujące](/developers/docs/scaling/#offchain-scaling) zbudowane do działania na wierzchu Ethereum. Każdy optymistyczny rollup jest zarządzany przez zestaw inteligentnych kontraktów wdrożonych w sieci Ethereum. Optymistyczne rollupy przetwarzają transakcje poza głównym łańcuchem Ethereum, ale przesyłają transakcje pozałańcuchowe (w partiach) do kontraktu rollupa onchain. Podobnie jak blockchain Ethereum, ten zapis transakcji jest niezmienny i tworzy „łańcuch optymistycznego rollupa”.

Architektura optymistycznego rollupa składa się z następujących części:

**Kontrakty onchain**: Działanie optymistycznego rollupa jest kontrolowane przez inteligentne kontrakty działające w Ethereum. Obejmuje to kontrakty, które przechowują bloki rollupa, monitorują aktualizacje stanu w rollupie i śledzą depozyty użytkowników. W tym sensie Ethereum służy jako warstwa bazowa lub „warstwa 1 (L1)” dla optymistycznych rollupów.

**Pozałańcuchowa maszyna wirtualna (VM)**: Chociaż kontrakty zarządzające protokołem optymistycznego rollupa działają w Ethereum, protokół rollupa wykonuje obliczenia i przechowuje stan na innej maszynie wirtualnej, oddzielnej od [Maszyny Wirtualnej Ethereum (EVM)](/developers/docs/evm/). Pozałańcuchowa maszyna wirtualna to miejsce, w którym żyją aplikacje i wykonywane są zmiany stanu; służy jako górna warstwa lub „warstwa 2 (L2)” dla optymistycznego rollupa.

Ponieważ optymistyczne rollupy są zaprojektowane do uruchamiania programów napisanych lub skompilowanych dla EVM, pozałańcuchowa maszyna wirtualna zawiera wiele specyfikacji projektowych EVM. Dodatkowo, dowody oszustwa obliczane onchain pozwalają sieci Ethereum egzekwować ważność zmian stanu obliczonych w pozałańcuchowej maszynie wirtualnej.

Optymistyczne rollupy są opisywane jako „hybrydowe rozwiązania skalujące”, ponieważ chociaż istnieją jako oddzielne protokoły, ich właściwości bezpieczeństwa wywodzą się z Ethereum. Między innymi Ethereum gwarantuje poprawność pozałańcuchowych obliczeń rollupa i dostępność danych stojących za tymi obliczeniami. Czyni to optymistyczne rollupy bezpieczniejszymi niż czysto pozałańcuchowe protokoły skalujące (np. [łańcuchy poboczne](/developers/docs/scaling/sidechains/)), które nie polegają na Ethereum w kwestii bezpieczeństwa.

Optymistyczne rollupy polegają na głównym protokole Ethereum w następujących kwestiach:

### Dostępność danych {#data-availability}

Jak wspomniano, optymistyczne rollupy przesyłają dane transakcji do Ethereum jako `calldata` lub [bloby](/roadmap/danksharding/). Ponieważ wykonanie łańcucha rollupa opiera się na przesłanych transakcjach, każdy może użyć tych informacji — zakotwiczonych w warstwie bazowej Ethereum — do wykonania stanu rollupa i zweryfikowania poprawności przejść stanu.

[Dostępność danych (DA)](/developers/docs/data-availability/) jest krytyczna, ponieważ bez dostępu do danych stanu, rzucający wyzwanie nie mogą konstruować dowodów oszustwa, aby kwestionować nieprawidłowe operacje rollupa. Dzięki temu, że Ethereum zapewnia dostępność danych, ryzyko, że operatorom rollupów ujdą na sucho złośliwe działania (np. przesyłanie nieprawidłowych bloków), jest zmniejszone.

### Odporność na cenzurę {#censorship-resistance}

Optymistyczne rollupy polegają również na Ethereum w kwestii odporności na cenzurę. W optymistycznym rollupie scentralizowany podmiot (operator) jest odpowiedzialny za przetwarzanie transakcji i przesyłanie bloków rollupa do Ethereum. Ma to pewne implikacje:

- Operatorzy rollupów mogą cenzurować użytkowników, całkowicie przechodząc w tryb offline lub odmawiając tworzenia bloków, które zawierają określone transakcje.

- Operatorzy rollupów mogą uniemożliwić użytkownikom wypłatę środków zdeponowanych w kontrakcie rollupa, zatajając dane stanu niezbędne do dowodów Merkle'a potwierdzających własność. Zatajanie danych stanu może również ukryć stan rollupa przed użytkownikami i uniemożliwić im interakcję z rollupem.

Optymistyczne rollupy rozwiązują ten problem, zmuszając operatorów do publikowania danych związanych z aktualizacjami stanu w Ethereum. Publikowanie danych rollupa onchain ma następujące korzyści:

- Jeśli operator optymistycznego rollupa przejdzie w tryb offline lub przestanie tworzyć partie transakcji, inny węzeł może użyć dostępnych danych do odtworzenia ostatniego stanu rollupa i kontynuowania produkcji bloków.

- Użytkownicy mogą użyć danych transakcji do tworzenia dowodów Merkle'a potwierdzających własność środków i wypłacić swoje aktywa z rollupa.

- Użytkownicy mogą również przesyłać swoje transakcje w warstwie 1 (L1) zamiast do sekwensera, w którym to przypadku sekwenser musi uwzględnić transakcję w określonym limicie czasu, aby kontynuować tworzenie ważnych bloków.

### Rozrachunek {#settlement}

Inną rolą, jaką Ethereum odgrywa w kontekście optymistycznych rollupów, jest rola warstwy rozrachunku. Warstwa rozrachunku zakotwicza cały ekosystem blockchain, ustanawia bezpieczeństwo i zapewnia obiektywną ostateczność, jeśli na innym łańcuchu (w tym przypadku w optymistycznych rollupach) wystąpi spór wymagający arbitrażu.

Sieć główna Ethereum stanowi centrum dla optymistycznych rollupów do weryfikacji dowodów oszustwa i rozwiązywania sporów. Co więcej, transakcje przeprowadzane w rollupie są ostateczne dopiero _po_ zaakceptowaniu bloku rollupa w Ethereum. Gdy transakcja rollupa zostanie zatwierdzona w warstwie bazowej Ethereum, nie można jej cofnąć (z wyjątkiem wysoce nieprawdopodobnego przypadku reorganizacji łańcucha).

## Jak działają optymistyczne rollupy? {#how-optimistic-rollups-work}

### Wykonywanie i agregacja transakcji {#transaction-execution-and-aggregation}

Użytkownicy przesyłają transakcje do „operatorów”, którymi są węzły odpowiedzialne za przetwarzanie transakcji w optymistycznym rollupie. Znany również jako „walidator” lub „agregator”, operator agreguje transakcje, kompresuje podstawowe dane i publikuje blok w Ethereum.

Chociaż każdy może zostać walidatorem, walidatory optymistycznych rollupów muszą wnieść kaucję przed wyprodukowaniem bloków, podobnie jak w [systemie dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/). Ta kaucja może zostać ukarana cięciem, jeśli walidator opublikuje nieprawidłowy blok lub będzie budował na starym, ale nieprawidłowym bloku (nawet jeśli jego blok jest prawidłowy). W ten sposób optymistyczne rollupy wykorzystują zachęty kryptoekonomiczne, aby zapewnić uczciwe działanie walidatorów.

Oczekuje się, że inne walidatory w łańcuchu optymistycznego rollupa wykonają przesłane transakcje przy użyciu swojej kopii stanu rollupa. Jeśli stan końcowy walidatora różni się od stanu zaproponowanego przez operatora, może on rozpocząć wyzwanie i obliczyć dowód oszustwa.

Niektóre optymistyczne rollupy mogą zrezygnować z niewymagającego pozwoleń systemu walidatorów i używać pojedynczego „sekwensera” do wykonywania łańcucha. Podobnie jak walidator, sekwenser przetwarza transakcje, tworzy bloki rollupa i przesyła transakcje rollupa do łańcucha L1 (Ethereum).

Sekwenser różni się od zwykłego operatora rollupa tym, że ma większą kontrolę nad kolejnością transakcji. Ponadto sekwenser ma priorytetowy dostęp do łańcucha rollupa i jest jedynym podmiotem upoważnionym do przesyłania transakcji do kontraktu onchain. Transakcje z węzłów niebędących sekwenserami lub od zwykłych użytkowników są po prostu kolejkowane w oddzielnej skrzynce odbiorczej, dopóki sekwenser nie włączy ich do nowej partii.

#### Przesyłanie bloków rollupa do Ethereum {#submitting-blocks-to-ethereum}

Jak wspomniano, operator optymistycznego rollupa łączy transakcje pozałańcuchowe w partię i wysyła ją do Ethereum w celu notaryzacji. Proces ten obejmuje kompresję danych związanych z transakcjami i publikowanie ich w Ethereum jako `calldata` lub w blobach.

`calldata` to niemodyfikowalny, nietrwały obszar w inteligentnym kontrakcie, który zachowuje się w dużej mierze jak [pamięć](/developers/docs/smart-contracts/anatomy/#memory). Chociaż `calldata` utrzymuje się onchain jako część [dzienników historii](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) blockchaina, nie jest przechowywane jako część stanu Ethereum. Ponieważ `calldata` nie dotyka żadnej części stanu Ethereum, jest tańsze niż stan do przechowywania danych onchain.

Słowo kluczowe `calldata` jest również używane w języku Solidity do przekazywania argumentów do funkcji inteligentnego kontraktu w czasie wykonywania. `calldata` identyfikuje funkcję wywoływaną podczas transakcji i przechowuje dane wejściowe do funkcji w postaci dowolnej sekwencji bajtów.

W kontekście optymistycznych rollupów `calldata` służy do wysyłania skompresowanych danych transakcji do kontraktu onchain. Operator rollupa dodaje nową partię, wywołując wymaganą funkcję w kontrakcie rollupa i przekazując skompresowane dane jako argumenty funkcji. Użycie `calldata` zmniejsza opłaty dla użytkowników, ponieważ większość kosztów ponoszonych przez rollupy wynika z przechowywania danych onchain.

Oto [przykład](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) przesłania partii rollupa, aby pokazać, jak działa ta koncepcja. Sekwenser wywołał metodę `appendSequencerBatch()` i przekazał skompresowane dane transakcji jako dane wejściowe za pomocą `calldata`.

Niektóre rollupy używają teraz blobów do przesyłania partii transakcji do Ethereum.

Bloby są niemodyfikowalne i nietrwałe (podobnie jak `calldata`), ale są usuwane z historii po około 18 dniach. Więcej informacji na temat blobów można znaleźć w sekcji [danksharding](/roadmap/danksharding).

### Zobowiązania stanu {#state-commitments}

W dowolnym momencie stan optymistycznego rollupa (konta, salda, kod kontraktu itp.) jest zorganizowany jako [drzewo Merklego](/whitepaper/#merkle-trees) zwane „drzewem stanu”. Korzeń tego drzewa Merklego (korzeń stanu), który odnosi się do najnowszego stanu rollupa, jest hashowany i przechowywany w kontrakcie rollupa. Każde przejście stanu w łańcuchu tworzy nowy stan rollupa, do którego operator zobowiązuje się, obliczając nowy korzeń stanu.

Operator jest zobowiązany do przesłania zarówno starych, jak i nowych korzeni stanu podczas publikowania partii. Jeśli stary korzeń stanu pasuje do istniejącego korzenia stanu w kontrakcie onchain, ten drugi jest odrzucany i zastępowany nowym korzeniem stanu.

Operator rollupa jest również zobowiązany do zatwierdzenia korzenia Merklego dla samej partii transakcji. Pozwala to każdemu udowodnić włączenie transakcji do partii (w L1) poprzez przedstawienie [dowodu Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Zobowiązania stanu, zwłaszcza korzenie stanu, są niezbędne do udowodnienia poprawności zmian stanu w optymistycznym rollupie. Kontrakt rollupa akceptuje nowe korzenie stanu od operatorów natychmiast po ich opublikowaniu, ale może później usunąć nieprawidłowe korzenie stanu, aby przywrócić rollup do jego prawidłowego stanu.

### Dowodzenie oszustw {#fraud-proving}

Jak wyjaśniono, optymistyczne rollupy pozwalają każdemu publikować bloki bez dostarczania dowodów ważności. Jednak aby zapewnić bezpieczeństwo łańcucha, optymistyczne rollupy określają okno czasowe, w którym każdy może zakwestionować przejście stanu. Dlatego bloki rollupa nazywane są „twierdzeniami” (asercjami), ponieważ każdy może zakwestionować ich ważność.

Jeśli ktoś zakwestionuje twierdzenie, protokół rollupa zainicjuje obliczanie dowodu oszustwa. Każdy rodzaj dowodu oszustwa jest interaktywny — ktoś musi opublikować twierdzenie, zanim inna osoba będzie mogła je zakwestionować. Różnica polega na tym, ile rund interakcji jest wymaganych do obliczenia dowodu oszustwa.

Jednorundowe interaktywne schematy dowodzenia odtwarzają sporne transakcje w L1 w celu wykrycia nieprawidłowych twierdzeń. Protokół rollupa emuluje ponowne wykonanie spornej transakcji w L1 (Ethereum) przy użyciu kontraktu weryfikatora, a obliczony korzeń stanu określa, kto wygrywa wyzwanie. Jeśli roszczenie rzucającego wyzwanie dotyczące prawidłowego stanu rollupa jest poprawne, operator zostaje ukarany cięciem swojej kaucji.

Jednak ponowne wykonywanie transakcji w L1 w celu wykrycia oszustwa wymaga publikowania zobowiązań stanu dla poszczególnych transakcji i zwiększa ilość danych, które rollupy muszą publikować onchain. Odtwarzanie transakcji wiąże się również ze znacznymi kosztami gazu. Z tych powodów optymistyczne rollupy przechodzą na wielorundowe interaktywne dowodzenie, które osiąga ten sam cel (tj. wykrywanie nieprawidłowych operacji rollupa) z większą wydajnością.

#### Wielorundowe interaktywne dowodzenie {#multi-round-interactive-proving}

Wielorundowe interaktywne dowodzenie obejmuje protokół wymiany informacji między twierdzącym a rzucającym wyzwanie, nadzorowany przez kontrakt weryfikatora L1, który ostatecznie decyduje, która strona kłamie. Po tym, jak węzeł L2 zakwestionuje twierdzenie, twierdzący jest zobowiązany do podzielenia spornego twierdzenia na dwie równe połowy. Każde pojedyncze twierdzenie w tym przypadku będzie zawierało tyle samo kroków obliczeniowych, co drugie.

Rzucający wyzwanie wybierze następnie, które twierdzenie chce zakwestionować. Proces podziału (zwany „protokołem bisekcji”) trwa do momentu, aż obie strony będą kwestionować twierdzenie dotyczące _pojedynczego_ kroku wykonania. W tym momencie kontrakt L1 rozwiąże spór, oceniając instrukcję (i jej wynik), aby złapać oszukującą stronę.

Twierdzący jest zobowiązany do dostarczenia „dowodu jednokrokowego” weryfikującego ważność spornych obliczeń jednokrokowych. Jeśli twierdzący nie dostarczy dowodu jednokrokowego lub weryfikator L1 uzna dowód za nieważny, przegrywa on wyzwanie.

Kilka uwag na temat tego typu dowodu oszustwa:

1. Wielorundowe interaktywne dowodzenie oszustw jest uważane za wydajne, ponieważ minimalizuje pracę, jaką łańcuch L1 musi wykonać w arbitrażu sporów. Zamiast odtwarzać całą transakcję, łańcuch L1 musi jedynie ponownie wykonać jeden krok w wykonaniu rollupa.

2. Protokoły bisekcji zmniejszają ilość danych publikowanych onchain (nie ma potrzeby publikowania zobowiązań stanu dla każdej transakcji). Ponadto transakcje optymistycznego rollupa nie są ograniczone przez limit gazu Ethereum. Z kolei optymistyczne rollupy ponownie wykonujące transakcje muszą upewnić się, że transakcja L2 ma niższy limit gazu, aby emulować jej wykonanie w ramach pojedynczej transakcji Ethereum.

3. Część kaucji złośliwego twierdzącego jest przyznawana rzucającemu wyzwanie, podczas gdy druga część jest spalana. Spalanie zapobiega zmowie między walidatorami; jeśli dwa walidatory wejdą w zmowę w celu zainicjowania fałszywych wyzwań, i tak stracą znaczną część całej stawki.

4. Wielorundowe interaktywne dowodzenie wymaga od obu stron (twierdzącego i rzucającego wyzwanie) wykonania ruchów w określonym oknie czasowym. Brak działania przed upływem terminu powoduje, że strona zwlekająca przegrywa wyzwanie.

#### Dlaczego dowody oszustwa mają znaczenie dla optymistycznych rollupów {#fraud-proof-benefits}

Dowody oszustwa są ważne, ponieważ ułatwiają _ostateczność niewymagającą zaufania_ w optymistycznych rollupach. Ostateczność niewymagająca zaufania to cecha optymistycznych rollupów, która gwarantuje, że transakcja — o ile jest ważna — zostanie ostatecznie potwierdzona.

Złośliwe węzły mogą próbować opóźnić potwierdzenie ważnego bloku rollupa, rozpoczynając fałszywe wyzwania. Jednak dowody oszustwa ostatecznie udowodnią ważność bloku rollupa i spowodują jego potwierdzenie.

Wiąże się to również z inną właściwością bezpieczeństwa optymistycznych rollupów: ważność łańcucha opiera się na istnieniu _jednego_ uczciwego węzła. Uczciwy węzeł może poprawnie posuwać łańcuch do przodu, publikując ważne twierdzenia lub kwestionując nieważne twierdzenia. W każdym przypadku złośliwe węzły, które wejdą w spór z uczciwym węzłem, stracą swoje stawki podczas procesu dowodzenia oszustwa.

### Interoperacyjność L1/L2 {#l1-l2-interoperability}

Optymistyczne rollupy są zaprojektowane z myślą o interoperacyjności z siecią główną Ethereum i pozwalają użytkownikom na przekazywanie wiadomości i dowolnych danych między L1 a L2. Są one również kompatybilne z EVM, więc możesz przenieść istniejące [zdecentralizowane aplikacje (dapp)](/developers/docs/dapps/) do optymistycznych rollupów lub tworzyć nowe dappy przy użyciu narzędzi programistycznych Ethereum.

#### 1. Przemieszczanie aktywów {#asset-movement}

##### Wejście do rollupa {#}

Aby skorzystać z optymistycznego rollupa, użytkownicy deponują ETH, tokeny ERC-20 i inne akceptowane aktywa w kontrakcie [mostu](/developers/docs/bridges/) rollupa w L1. Kontrakt mostu przekaże transakcję do L2, gdzie równoważna ilość aktywów jest wybijana i wysyłana na wybrany przez użytkownika adres w optymistycznym rollupie.

Transakcje generowane przez użytkowników (takie jak depozyt L1 > L2) są zazwyczaj kolejkowane, dopóki sekwenser nie prześle ich ponownie do kontraktu rollupa. Jednak aby zachować odporność na cenzurę, optymistyczne rollupy pozwalają użytkownikom na przesłanie transakcji bezpośrednio do kontraktu rollupa onchain, jeśli została ona opóźniona powyżej maksymalnego dozwolonego czasu.

Niektóre optymistyczne rollupy przyjmują bardziej bezpośrednie podejście, aby zapobiec cenzurowaniu użytkowników przez sekwensery. Tutaj blok jest definiowany przez wszystkie transakcje przesłane do kontraktu L1 od poprzedniego bloku (np. depozyty) oprócz transakcji przetwarzanych w łańcuchu rollupa. Jeśli sekwenser zignoruje transakcję L1, opublikuje (możliwy do udowodnienia) błędny korzeń stanu; dlatego sekwensery nie mogą opóźniać wiadomości generowanych przez użytkowników po ich opublikowaniu w L1.

##### Wyjście z rollupa {#}

Wypłata z optymistycznego rollupa do Ethereum jest trudniejsza ze względu na schemat dowodzenia oszustw. Jeśli użytkownik zainicjuje transakcję L2 > L1 w celu wypłaty środków zdeponowanych w L1, musi poczekać, aż upłynie okres wyzwania — trwający około siedmiu dni. Niemniej jednak sam proces wypłaty jest dość prosty.

Po zainicjowaniu żądania wypłaty w rollupie L2, transakcja jest włączana do następnej partii, podczas gdy aktywa użytkownika w rollupie są spalane. Po opublikowaniu partii w Ethereum użytkownik może obliczyć dowód Merkle'a weryfikujący włączenie jego transakcji wyjścia do bloku. Następnie pozostaje tylko przeczekać okres opóźnienia, aby sfinalizować transakcję w L1 i wypłacić środki do Sieci głównej.

Aby uniknąć czekania tygodnia przed wypłatą środków do Ethereum, użytkownicy optymistycznego rollupa mogą skorzystać z usług **dostawcy płynności** (LP). Dostawca płynności przejmuje własność oczekującej wypłaty L2 i płaci użytkownikowi w L1 (w zamian za opłatę).

Dostawcy płynności mogą sprawdzić ważność żądania wypłaty użytkownika (samodzielnie wykonując łańcuch) przed uwolnieniem środków. W ten sposób mają pewność, że transakcja zostanie ostatecznie potwierdzona (tj. ostateczność niewymagająca zaufania).

#### 2. Kompatybilność z EVM {#evm-compatibility}

Dla programistów zaletą optymistycznych rollupów jest ich kompatybilność — a jeszcze lepiej, równoważność — z [Maszyną Wirtualną Ethereum (EVM)](/developers/docs/evm/). Rollupy kompatybilne z EVM są zgodne ze specyfikacjami zawartymi w [żółtej księdze Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) i obsługują EVM na poziomie kodu bajtowego.

Kompatybilność z EVM w optymistycznych rollupach ma następujące korzyści:

i. Programiści mogą migrować istniejące inteligentne kontrakty w Ethereum do łańcuchów optymistycznych rollupów bez konieczności wprowadzania rozległych modyfikacji w bazach kodu. Może to zaoszczędzić zespołom programistycznym czas podczas wdrażania inteligentnych kontraktów Ethereum w L2.

ii. Programiści i zespoły projektowe korzystające z optymistycznych rollupów mogą korzystać z infrastruktury Ethereum. Obejmuje to języki programowania, biblioteki kodu, narzędzia testowe, oprogramowanie klienckie, infrastrukturę wdrożeniową i tak dalej.

Korzystanie z istniejących narzędzi jest ważne, ponieważ narzędzia te były przez lata intensywnie audytowane, debugowane i ulepszane. Eliminuje to również potrzebę uczenia się przez programistów Ethereum, jak budować przy użyciu całkowicie nowego stosu technologicznego.

#### 3. Międzyłańcuchowe wywołania kontraktów {#cross-chain-contract-calls}

Użytkownicy (konta posiadane zewnętrznie) wchodzą w interakcję z kontraktami L2, przesyłając transakcję do kontraktu rollupa lub zlecając to sekwenserowi lub walidatorowi. Optymistyczne rollupy pozwalają również kontom kontraktów w Ethereum na interakcję z kontraktami L2 za pomocą kontraktów mostujących do przekazywania wiadomości i danych między L1 a L2. Oznacza to, że możesz zaprogramować kontrakt L1 w sieci głównej Ethereum, aby wywoływał funkcje należące do kontraktów w optymistycznym rollupie L2.

Międzyłańcuchowe wywołania kontraktów odbywają się asynchronicznie — co oznacza, że wywołanie jest najpierw inicjowane, a następnie wykonywane w późniejszym czasie. Różni się to od wywołań między dwoma kontraktami w Ethereum, gdzie wywołanie natychmiast przynosi rezultaty.

Przykładem międzyłańcuchowego wywołania kontraktu jest opisany wcześniej depozyt tokenów. Kontrakt w L1 deponuje tokeny użytkownika i wysyła wiadomość do sparowanego kontraktu L2, aby wybić równą ilość tokenów w rollupie.

Ponieważ międzyłańcuchowe wywołania wiadomości skutkują wykonaniem kontraktu, nadawca jest zazwyczaj zobowiązany do pokrycia [kosztów gazu](/developers/docs/gas/) za obliczenia. Zaleca się ustawienie wysokiego limitu gazu, aby zapobiec niepowodzeniu transakcji w łańcuchu docelowym. Scenariusz mostowania tokenów jest dobrym przykładem; jeśli strona L1 transakcji (deponowanie tokenów) zadziała, ale strona L2 (wybijanie nowych tokenów) nie powiedzie się z powodu małej ilości gazu, depozyt staje się nie do odzyskania.

Na koniec należy zauważyć, że wywołania wiadomości L2 > L1 między kontraktami muszą uwzględniać opóźnienia (wywołania L1 > L2 są zazwyczaj wykonywane po kilku minutach). Dzieje się tak, ponieważ wiadomości wysyłane do Sieci głównej z optymistycznego rollupa nie mogą zostać wykonane, dopóki nie wygaśnie okno wyzwania.

## Jak działają opłaty w optymistycznych rollupach? {#how-do-optimistic-rollup-fees-work}

Optymistyczne rollupy wykorzystują schemat opłat za gaz, podobnie jak Ethereum, aby określić, ile użytkownicy płacą za transakcję. Opłaty pobierane w optymistycznych rollupach zależą od następujących elementów:

1. **Zapis stanu**: Optymistyczne rollupy publikują dane transakcji i nagłówki bloków (składające się z hasha poprzedniego nagłówka bloku, korzenia stanu, korzenia partii) w Ethereum jako `blob` lub „duży obiekt binarny” (binary large object). [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) wprowadziło opłacalne rozwiązanie do włączania danych onchain. `blob` to nowe pole transakcji, które pozwala rollupom na przesyłanie skompresowanych danych przejścia stanu do Ethereum L1. W przeciwieństwie do `calldata`, które pozostaje na stałe onchain, bloby są krótkotrwałe i mogą zostać usunięte z klientów po [4096 epokach](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (około 18 dni). Używając blobów do przesyłania partii skompresowanych transakcji, optymistyczne rollupy mogą znacznie obniżyć koszt zapisywania transakcji w L1.

2. **Zużyty gaz bloba**: Transakcje przenoszące bloby wykorzystują mechanizm dynamicznych opłat podobny do tego wprowadzonego przez [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Opłata za gaz dla transakcji typu 3 uwzględnia opłatę podstawową za bloby, która jest określana przez sieć na podstawie popytu na przestrzeń blobów i wykorzystania przestrzeni blobów przez wysyłaną transakcję.

3. **Opłaty operatora L2**: Jest to kwota płacona węzłom rollupa jako rekompensata za koszty obliczeniowe poniesione podczas przetwarzania transakcji, podobnie jak opłaty za gaz w Ethereum. Węzły rollupa pobierają niższe opłaty transakcyjne, ponieważ L2 mają wyższe możliwości przetwarzania i nie borykają się z przeciążeniami sieci, które zmuszają walidatory w Ethereum do priorytetyzowania transakcji z wyższymi opłatami.

Optymistyczne rollupy stosują kilka mechanizmów w celu obniżenia opłat dla użytkowników, w tym wsadowanie transakcji i kompresję `calldata` w celu zmniejszenia kosztów publikacji danych. Możesz sprawdzić [narzędzie do śledzenia opłat L2](https://l2fees.info/), aby uzyskać wgląd w czasie rzeczywistym w to, ile kosztuje korzystanie z optymistycznych rollupów opartych na Ethereum.

## Jak optymistyczne rollupy skalują Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Jak wyjaśniono, optymistyczne rollupy publikują skompresowane dane transakcji w Ethereum, aby zagwarantować dostępność danych. Zdolność do kompresji danych publikowanych onchain ma kluczowe znaczenie dla skalowania przepustowości w Ethereum za pomocą optymistycznych rollupów.

Główny łańcuch Ethereum nakłada limity na to, ile danych mogą pomieścić bloki, wyrażone w jednostkach gazu ([średni rozmiar bloku](/developers/docs/blocks/#block-size) to 15 milionów gazu). Chociaż ogranicza to ilość gazu, jaką może zużyć każda transakcja, oznacza to również, że możemy zwiększyć liczbę transakcji przetwarzanych na blok poprzez zmniejszenie danych związanych z transakcjami — bezpośrednio poprawiając skalowalność.

Optymistyczne rollupy wykorzystują kilka technik w celu osiągnięcia kompresji danych transakcji i poprawy wskaźników TPS. Na przykład ten [artykuł](https://vitalik.eth.limo/general/2021/01/05/rollup.html) porównuje dane, które podstawowa transakcja użytkownika (wysyłanie etheru) generuje w Sieci głównej, z tym, ile danych ta sama transakcja generuje w rollupie:

| Parametr | Ethereum (L1) | Rollup (L2) |
| --------- | ---------------------- | ------------- |
| Nonce | ~3 | 0 |
| Cena gazu | ~8 | 0-0.5 |
| Gaz | 3 | 0-0.5 |
| Do | 21 | 4 |
| Wartość | 9 | ~3 |
| Podpis | ~68 (2 + 33 + 33) | ~0.5 |
| Od | 0 (odzyskane z podpisu) | 4 |
| **Razem** | **\~112 bajtów** | **\~12 bajtów** |

Wykonanie zgrubnych obliczeń na tych liczbach może pomóc pokazać poprawę skalowalności zapewnianą przez optymistyczny rollup:

1. Docelowy rozmiar każdego bloku to 15 milionów gazu, a weryfikacja jednego bajtu danych kosztuje 16 gazu. Podzielenie średniego rozmiaru bloku przez 16 gazu (15 000 000/16) pokazuje, że średni blok może pomieścić **937 500 bajtów danych**.
2. Jeśli podstawowa transakcja rollupa zużywa 12 bajtów, to średni blok Ethereum może przetworzyć **78 125 transakcji rollupa** (937 500/12) lub **39 partii rollupa** (jeśli każda partia zawiera średnio 2000 transakcji).
3. Jeśli nowy blok jest produkowany w Ethereum co 15 sekund, to prędkość przetwarzania rollupa wyniosłaby około **5208 transakcji na sekundę**. Oblicza się to, dzieląc liczbę podstawowych transakcji rollupa, które może pomieścić blok Ethereum (**78 125**), przez średni czas bloku (**15 sekund**).

Jest to dość optymistyczne oszacowanie, biorąc pod uwagę, że transakcje optymistycznego rollupa nie mogą stanowić całego bloku w Ethereum. Może to jednak dać ogólne pojęcie o tym, jak duże zyski w zakresie skalowalności optymistyczne rollupy mogą zapewnić użytkownikom Ethereum (obecne implementacje oferują do 2000 TPS).

Oczekuje się, że wprowadzenie [shardingu danych](/roadmap/danksharding/) w Ethereum poprawi skalowalność w optymistycznych rollupach. Ponieważ transakcje rollupa muszą dzielić przestrzeń bloku z innymi transakcjami niebędącymi rollupami, ich zdolność przetwarzania jest ograniczona przepustowością danych w głównym łańcuchu Ethereum. Danksharding zwiększy przestrzeń dostępną dla łańcuchów L2 do publikowania danych na blok, wykorzystując tańsze, nietrwałe przechowywanie w „blobach” zamiast drogiego, trwałego `CALLDATA`.

### Plusy i minusy optymistycznych rollupów {#optimistic-rollups-pros-and-cons}

| Plusy | Minusy |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferuje ogromną poprawę skalowalności bez poświęcania bezpieczeństwa ani bezzaufaniowości. | Opóźnienia w ostateczności transakcji z powodu potencjalnych wyzwań dotyczących oszustw. |
| Dane transakcji są przechowywane w łańcuchu warstwy 1, co poprawia przejrzystość, bezpieczeństwo, odporność na cenzurę i decentralizację. | Scentralizowani operatorzy rollupów (sekwensery) mogą wpływać na kolejność transakcji. |
| Dowodzenie oszustw gwarantuje ostateczność niewymagającą zaufania i pozwala uczciwym mniejszościom zabezpieczyć łańcuch. | Jeśli nie ma uczciwych węzłów, złośliwy operator może ukraść środki, publikując nieprawidłowe bloki i zobowiązania stanu. |
| Obliczanie dowodów oszustwa jest otwarte dla zwykłych węzłów L2, w przeciwieństwie do dowodów ważności (używanych w ZK-rollupach), które wymagają specjalnego sprzętu. | Model bezpieczeństwa opiera się na co najmniej jednym uczciwym węźle wykonującym transakcje rollupa i przesyłającym dowody oszustwa w celu zakwestionowania nieprawidłowych przejść stanu. |
| Rollupy korzystają z „żywotności niewymagającej zaufania” (każdy może wymusić postęp łańcucha, wykonując transakcje i publikując twierdzenia). | Użytkownicy muszą poczekać na wygaśnięcie tygodniowego okresu wyzwania przed wypłatą środków z powrotem do Ethereum. |
| Optymistyczne rollupy opierają się na dobrze zaprojektowanych zachętach kryptoekonomicznych w celu zwiększenia bezpieczeństwa w łańcuchu. | Rollupy muszą publikować wszystkie dane transakcji onchain, co może zwiększyć koszty. |
| Kompatybilność z EVM i Solidity pozwala programistom na przenoszenie natywnych inteligentnych kontraktów Ethereum do rollupów lub korzystanie z istniejących narzędzi do tworzenia nowych dappów. |

### Wizualne wyjaśnienie optymistycznych rollupów {#optimistic-video}

Wolisz uczyć się wzrokowo? Zobacz, jak Finematics wyjaśnia optymistyczne rollupy:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Dalsza lektura na temat optymistycznych rollupów {#further-reading-on-optimistic-rollups}

- [Jak działają optymistyczne rollupy (Kompletny przewodnik)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Czym jest rollup blockchaina? Wprowadzenie techniczne](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Niezbędny przewodnik po Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Stan dowodów oszustwa w L2 Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Jak naprawdę działa rollup Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Szczegółowe omówienie OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Czym jest Optymistyczna Maszyna Wirtualna?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Samouczki: Optymistyczne rollupy i mosty w Ethereum {#tutorials}

- [Przewodnik po standardowym kontrakcie mostu Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Przewodnik po kodzie z adnotacjami dla standardowego mostu Optimism do przenoszenia aktywów między L1 a L2._