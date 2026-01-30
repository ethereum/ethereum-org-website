---
title: Łańcuchy plazmy
description: Wprowadzenie do łańcuchów plazmowych jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Łańcuch Plasma jest osobnym blockhainem zakotwiczonym w głównej sieci Ethereum, ale przetwarzającym transakcje offchain za pomocą własnego mechanizmu walidacji bloku. Łańcuchy Plasma są czasem nazywane łańcuchami "dziećmi", zasadniczo mniejszymi kopiami sieci głównej Ethereum. Łańcuchy Plasma używają [dowodów oszustwa](/glossary/#fraud-proof) (podobnie jak [rollupy optymistyczne](/developers/docs/scaling/optimistic-rollups/)) do rozstrzygania sporów.

Drzewa Merkle pozwalają tworzyć niekończący się stos takich łańcuchów, które mogą pracować, aby rozładować obciążenie sieci rodzica (w tym głównej sieci Ethereum). Jednakże, pomimo tego, że te łańcuchy dziedziczą część zabezpieczeń Ethereum (poprzez dowody oszustwa), to ich bezpieczeństwo oraz wydajność jest obarczona kilkoma ograniczeniami projektowymi.

## Wymagania wstępne {#prerequisites}

Wymagane jest dobre zrozumienie wszystkich podstawowych tematów i ogólna wiedza na temat [skalowania Ethereum](/developers/docs/scaling/).

## Czym jest Plasma?

Plasma jest platformą do ulepszania skalowania publicznych blockchainów takich jak Ethereum. Zgodnie z opisem w oryginalnej [dokumentacji Plasma](http://plasma.io/plasma.pdf) łańcuchy Plasma są zbudowane na innym blockchainie (nazywanym „łańcuchem głównym”). Każdy "łańcuch dziecko" wywodzi się z łańcucha głównego i jest zasadniczo zarządzany poprzez inteligentny kontrakt wdrożony na sieci rodzica.

Kontrakt Plasma funkcjonuje między innymi jako [most](/developers/docs/bridges/), umożliwiając użytkownikom przenoszenie aktywów między siecią główną Ethereum a łańcuchem Plasma. Chociaż czyni je to podobnymi do [łańcuchów pobocznych](/developers/docs/scaling/sidechains/), łańcuchy Plasma korzystają — przynajmniej do pewnego stopnia — z bezpieczeństwa sieci głównej Ethereum. W tym aspekcie różnią się od łańcuchów pobocznych, które w całości są odpowiedzialne za własne bezpieczeństwo.

## Jak działa Plasma?

Podstawowymi komponentami platformy Plasma są:

### Obliczenia poza łańcuchem {#offchain-computation}

Aktualnie przepustowość Ethereum ograniczona jest do 15-20 transakcji na sekundę, zmniejszając krótkoterminową możliwość skalowania w celu obsługi większej liczby użytkowników. Problem ten istnieje głównie dlatego, że [mechanizm konsensusu](/developers/docs/consensus-mechanisms/) Ethereum wymaga, aby wiele węzłów peer-to-peer weryfikowało każdą aktualizację stanu blockchaina.

Mechanizm konsensusu Ethereum jest niezbędny dla bezpieczeństwa, ale jego użycie nie sprawdza się dla każdej możliwości wykorzystania. Na przykład, Alicja niekoniecznie potrzebuje, aby jej codzienna płatność na rzecz Boba za kawę była weryfikowana przez całą sieć Ethereum, gdyż pomiędzy nimi istnieje pewna doza zaufania.

Plasma zakłada, że główna sieć Ethereum nie musi weryfikować wszystkich transakcji. Zamiast tego, możemy przetwarzać transakcje poza siecią główną, uwalniając węzły od konieczności potwierdzania każdej transakcji.

Obliczenia offchain są niezbędne z uwagi na to, że łańcuchy Plasma mogą optymalizować się pod względem szybkości oraz kosztów. Na przykład, łańcuch Plasma może, i zwykle tak się dzieje, użyć pojedynczego "operatora" do wykonywania transakcji oraz ustalania ich kolejności. Przy pojedynczym podmiocie weryfikującym transakcje, czas przetwarzania na łańcuchu Plasma jest krótszy niż na sieci głównej Ethereum.

### Zobowiązania dotyczące stanu {#state-commitments}

Łańcuch Plasma wykonuje transakcje offchian, ale są one finalizowane na warstwie wykonawczej Ethereum. W innym przypadku łańcuchy Plasma nie mogłyby korzystać z gwarancji bezpieczeństwa zapewnianej przez Ethereum. Jednak finalizacja transakcji offchain bez wiedzy o stanie łańcucha Plaska złamałaby model bezpieczeństwa i pozwoliła na rozpowszechnienie się niepoprawnych transakcji. Dlatego wymaga się, aby operator, czyli podmiot odpowiedzialny za tworzenie bloków na łańcuchy Plasma, publikował okresowo "zobowiązania stanu".

[Schemat zobowiązań](https://en.wikipedia.org/wiki/Commitment_scheme) to technika kryptograficzna służąca do poświadczenia wartości lub oświadczenia bez ujawniania go drugiej stronie. Zobowiązania są „wiążące” w tym sensie, że nie można zmienić wartości ani oświadczenia po jego poświadczeniu. Zobowiązania dotyczące stanu w Plasma przybierają formę „korzeni Merkle” (pochodzących z [drzewa Merklego](/whitepaper/#merkle-trees)), które operator w określonych odstępach czasu wysyła do kontraktu Plasma w łańcuchu Ethereum.

Korzenie Merkle to prymitywy kryptograficzne, które umożliwiają kompresję dużych ilości informacji. Korzeń Merkle (w tym przypadku nazywany również „korzeniem bloku”) może reprezentować wszystkie transakcje w bloku. Korzenie Merkle ułatwiają również weryfikację, czy niewielka część danych jest częścią większego zbioru danych. Na przykład użytkownik może przedstawić [dowód Merklego](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content), aby udowodnić włączenie transakcji do określonego bloku.

Korzenie Merkle są ważne dla dostarczania Ethereum informacji o stanie poza łańcuchem. Korzenie Merkle można traktować jako „punkty zapisu”: operator mówi: „To jest stan łańcucha Plasma w punkcie czasowym x, a to jest korzeń Merkle jako dowód”. Operator zatwierdza _bieżący stan_ łańcucha Plasma za pomocą korzenia Merkle, dlatego nazywa się to „zobowiązaniem dotyczącym stanu”.

### Wejścia i wyjścia {#entries-and-exits}

Aby użytkownicy Ethereum mogli korzystać z Plazmy, muszą istnieć mechanizmy do przenoszenia środków pomiędzy siecią główną a łańcuchem plazma. Nie można jednak dowolnie wysyłać eteru na adres ma łańcuchu plazma, ponieważ te łańcuchy nie są kompatybilne, więc transakcje nie dojdą do skutku lub przyniosą efekt w postaci utraconych środków.

Plazma używa kontraktu głównego działającego na Ethereum do przetwarzania wejść i wyjść użytkowników. Ten kontrakt główny jest odpowiedzialny za śledzenie zobowiązań stanowych (wyjaśnionych powyżej) i karanie nieuczciwych zachowań poprzez dowody oszustwa (o tym później).

#### Wejście do łańcucha Plasma {#entering-the-plasma-chain}

Aby wejść do łańcucha plazma, Alicja (użytkownik) musi dokonać depozytu ETH lub innego tokena ERC-20 na kontrakt plazmy. Operator plazmy, który obserwuje depozyty na kontrakcie, odtwarza kwotę równą pierwotnemu depozytowi Alicji i uwalnia ją na jej koncie na łańcuchu plazma. Wymaga się od Alicji poświadczenia otrzymania środków na łańcuchu potomnym, aby później mogła używać tych środków do transakcji.

#### Wyjście z łańcucha Plasma {#exiting-the-plasma-chain}

Wyjście z łańcucha plazma jest, z kilku powodów, bardziej skomplikowane niż wejście. Najważniejszym jest to, że pomimo posiadania przez Ethereum informacji na temat stanu łańcucha plazma, nie ma możliwości zweryfikowania czy są prawdziwe czy nie. Złośliwy użytkownik mógłby dokonać niepoprawnego poświadczenia ("Mam 1000 ETH") i mogłoby mu to ujść na sucho, jeśli użyłby fałszywych dowodów na poparcie swojego poświadczenia.

Aby uniemożliwić złośliwe wypłaty, wprowadzony został "okres wyzwania". Podczas okresu wyzwania (zwykle trwającego tydzień) każdy może wyzwać żądanie wypłaty, używając dowodu oszustwa. Jeśli wyzwanie zakończy się sukcesem, żądanie wypłaty spotka się z odmową.

Zwykle jednak użytkownicy są uczciwi i podają prawdziwe informacje na temat posiadanych przez siebie środków. W tym scenariuszu Alicja rozpoczyna żądanie wypłaty na łańcuchu źródłowym (Ethereum) poprzez zgłoszenie transakcji do kontraktu plazmy.

Musi również posłużyć się dowodem Merkle potwierdzającym, że transakcja, która stworzyła jej środki na łańcuchu plazma, została dołączona do bloku. Jest to konieczne w przypadku iteracji Plasma, takich jak [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), które wykorzystują model [niewydanych wyników transakcji (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Inne, jak [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), reprezentują środki jako [tokeny niewymienialne](/developers/docs/standards/tokens/erc-721/), a nie jako UTXO. Wypłata, w tym przypadku, wymaga dowodu własności tokena na łańcuchu Plazma. Polega to na tym, że zgłaszane są ostatnie dwie transakcje dotyczące tokena oraz przedstawiany jest dowód Merkle potwierdzający włączenie tych transakcji do bloku.

Użytkownik musi również kaucję do żądania wypłaty, jako gwarancję uczciwego zachowania. Jeśli rzucający wyzwanie udowodni, że żądanie wypłaty Alicji jest nieważne, jej kaucja zostaje ścięta, a część z niej trafia do rzucającego wyzwanie jako nagroda.

Jeśli w okresie wyzwania nikt nie przedstawi dowodu fałszerstwa, żądanie wypłaty Alicji zostaje uznane za ważne, co pozwala jej odzyskać depozyt z kontraktu Plazma na Ethereum.

### Rozstrzyganie sporów {#dispute-arbitration}

Podobnie jak każdy blockchain, łańcuchy Plasma potrzebują mechanizmu do egzekwowania integralności transakcji w przypadku, gdy uczestnicy działają w złej wierze (np. podwójne wydawanie środków). W tym celu łańcuchy plazma używają dowodów oszustwa w celu rozstrzygania sporów dotyczących poprawności zmian stanu oraz karania nieuczciwego zachowania. Dowody oszustwa są wykorzystywane jako mechanizm, przez który łańcuch potomny plazma składa zażalenie do swojego ojczystego łańcucha albo do łańcucha źródłowego.

Dowód oszustwa jest po prostu twierdzeniem, że konkretna zmiana stanu jest nieważna. Przykładowo, kiedy użytkownik (Alicja) próbuje wydać te same środki po raz drugi. Być może wydała UTXO w ramach transakcji z Bobem i chce wydać to samo UTXO (które teraz należy do Boba) w ramach innej transakcji.

Aby uniemożliwić wypłatę, Bob może stworzyć dowód oszustwa poprzez zaprezentowanie dowodu, że Alicja wydała rzeczone UTXO we wcześniejszej transakcji oraz dowód Merkle włączenia tej transakcji do bloku. Ten sam proces działa w Plasma Cash — Bob musiałby przedstawić dowód na to, że Alicja przesłała wcześniej tokeny, które próbuje wypłacić.

Jeśli wyzwanie rzuconego przez Boba odniesie sukces, żądanie wypłaty Alicji zostanie anulowane. To podejście jednak opiera się na zdolności Boba do obserwowania łańcucha pod kątem żądań wypłaty. Jeśli Bob jest offline, Alicja może przetworzyć złośliwą wypłatę, kiedy okres wyzwania minie.

## Problem masowego wyjścia w Plasma {#the-mass-exit-problem-in-plasma}

Problem masowego wyjścia powstaje, kiedy duża liczba użytkowników próbuje dokonać wypłaty z łańcucha plazma w tym samym czasie. Przyczyna istnienia tego problemu ma związek z jednym z największych problemów Plasma: **niedostępnością danych**.

Dostępność danych jest możliwością weryfikacji, że informacja do proponowanego bloku została naprawdę opublikowana w sieci blockchain. Blok jest "niedostępny" jeśli jego twórca publikuje sam blok, ale wstrzymuje publikację danych użytych do stworzenia bloku.

Bloki muszą być dostępne, jeśli węzły mają mieć możliwość pobrania bloku i weryfikacji poprawności transakcji. Blockchainy egzekwują dostępność danych poprzez zmuszenie twórcy bloku do zamieszczenia wszystkich danych transakcji onchain.

Dostępność danych pomaga również zabezpieczać protokoły skalowania offchain, które budują na warstwie głównej Ethereum. Przez zmuszenie operatorów na tych łańcuchach do publikacji danych transakcji na Ethereum powstaje możliwość dla każdego, aby rzucić wyzwanie niepoprawnym blokom, poprzez skonstruowanie dowodu oszustwa odnosząc się do poprawnego stanu łańcucha.

Łańcuchy Plasma przechowują dane transakcji głównie u operatora i **nie publikują żadnych danych w sieci głównej** (tj. oprócz okresowych zobowiązań dotyczących stanu). Oznacza to, że użytkownicy muszą opierać się na operatorze w celu uzyskania danych bloku, jeśli zamierzają stworzyć dowód oszusta, rzucając wyzwania niepoprawnej transakcji. Jeśli ten system działa, użytkownicy mogą zawsze używać dowodów oszustwa do zabezpieczenia środków.

Problem zaczyna się, gdy to operator, a nie zwykły użytkownik, jest stroną działającą w złej wierze. Ponieważ operator ma wyłączną kontrolę nad blockchainem, ma większą motywację do przeprowadzania nieprawidłowych zmian stanu na większą skalę, takich jak kradzież środków należących do użytkowników łańcucha Plasma.

W tym przypadku korzystanie z klasycznego systemu dowodów oszustwa nie działa. Operator mógłby z łatwością dokonać nieprawidłowej transakcji, przelewając środki Alicji i Boba do swojego portfela i ukryć dane niezbędne do stworzenia dowodu oszustwa. Jest to możliwe, ponieważ operator nie jest zobowiązany do udostępniania danych użytkownikom ani sieci głównej.

Dlatego najbardziej optymistycznym rozwiązaniem jest próba „masowego wyjścia” użytkowników z łańcucha Plasma. Masowe wyjście spowalnia plan złośliwego operatora dotyczący kradzieży środków i zapewnia pewien stopień ochrony użytkownikom. Zlecenia wypłaty są uporządkowane na podstawie czasu utworzenia każdego UTXO (lub tokena), co uniemożliwia złośliwym operatorom front-runningu wobec uczciwych użytkowników.

Niemniej jednak wciąż potrzebujemy sposobu na weryfikację ważności zleceń wypłaty podczas masowego wyjścia — aby uniemożliwić oportunistycznym osobom zarabianie na chaosie poprzez przetwarzanie nieprawidłowych wyjść. Rozwiązanie jest proste: wymagać od użytkowników opublikowania ostatniego **prawidłowego stanu łańcucha**, aby wycofać swoje pieniądze.

Ale to podejście wciąż ma problemy. Na przykład, jeśli wszyscy użytkownicy łańcucha Plasma muszą go opuścić (co jest możliwe w przypadku złośliwego operatora), cały prawidłowy stan łańcucha Plasma musi zostać jednocześnie zrzucony na warstwę bazową Ethereum. Biorąc pod uwagę dowolny rozmiar łańcuchów Plasma (wysoka przepustowość = więcej danych) i ograniczenia szybkości przetwarzania Ethereum, nie jest to idealne rozwiązanie.

Chociaż gry wyjścia brzmią dobrze w teorii, masowe wyjścia w rzeczywistości prawdopodobnie spowodują przeciążenie całej sieci na samym Ethereum. Oprócz szkody dla funkcjonalności Ethereum, źle skoordynowane masowe wyjście oznacza, że użytkownicy mogą nie być w stanie wypłacić środków, zanim operator opróżni każde konto w łańcuchu Plasma.

## Zalety i wady Plasma {#pros-and-cons-of-plasma}

| Zalety                                                                                                                                                                                                                                                                                            | Wady                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferuje wysoką przepustowość i niski koszt transakcji.                                                                                                                                                                                                                            | Nie obsługuje obliczeń ogólnych (nie można na nim uruchamiać inteligentnych kontraktów). Tylko podstawowe transfery, swapy i kilka innych typów transakcji są obsługiwane za pośrednictwem logiki predykatu. |
| Dobre w przypadku transakcji między dowolnymi użytkownikami (brak kosztów nadrzędnych na parę użytkowników, jeśli obydwaj są określeni w łańcuchu plazmowym)                                                                                                                   | Konieczność okresowego obserwowania sieci (wymóg aktywności) lub delegowania tej odpowiedzialności na kogoś innego w celu zapewnienia bezpieczeństwa Twoich środków.                                                         |
| Łańcuchy Plasma mogą być dostosowane do konkretnych przypadków użycia, które nie są powiązane z głównym łańcuchem. Każdy, w tym firmy, może dostosować inteligentne kontrakty Plasma, aby zapewnić skalowalną infrastrukturę, która działa w różnych kontekstach. | Polega na jednym lub kilku operatorach do przechowywania danych i dostarczania ich na żądanie.                                                                                                                                                  |
| Zmniejsza obciążenie sieci głównej Ethereum, przenosząc obliczenia i przechowywanie danych poza łańcuch.                                                                                                                                                                          | Wycofanie jest opóźnione o kilka dni, aby umożliwić kwestionowanie. W przypadku aktywów zamiennych można to złagodzić przez dostawców płynności, ale wiąże się to z kosztami kapitałowymi.                                      |
|                                                                                                                                                                                                                                                                                                   | Jeśli zbyt wielu użytkowników spróbuje wyjść jednocześnie, sieć główna Ethereum może ulec przeciążeniu.                                                                                                                                         |

## Plasma a protokoły skalowania warstwy 2 {#plasma-vs-layer-2}

Chociaż Plasma była kiedyś uważana za użyteczne rozwiązanie skalujące dla Ethereum, od tego czasu została porzucona na rzecz [protokołów skalowania warstwy 2 (L2)](/layer-2/). Rozwiązania skalujące L2 rozwiązują kilka problemów Plasma:

### Wydajność {#efficiency}

[Rollupy o zerowej wiedzy](/developers/docs/scaling/zk-rollups) generują dowody kryptograficzne ważności każdej partii transakcji przetwarzanych poza łańcuchem. Zapobiega to przeprowadzaniu przez użytkowników (i operatorów) nieprawidłowych zmian stanu, eliminując potrzebę okresów odwoławczych i gier wyjścia. Oznacza to również, że użytkownicy nie muszą okresowo obserwować łańcucha, aby zabezpieczyć swoje środki.

### Wsparcie dla inteligentnych kontraktów {#support-for-smart-contracts}

Innym problemem frameworka Plasma był [brak możliwości obsługi wykonywania inteligentnych kontraktów Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). W rezultacie większość implementacji Plasma została zbudowana głównie z myślą o prostych płatnościach lub wymianie tokenów ERC-20.

Z drugiej strony, rollupy optymistyczne są kompatybilne z [Wirtualną Maszyną Ethereum](/developers/docs/evm/) i mogą uruchamiać natywne dla Ethereum [inteligentne kontrakty](/developers/docs/smart-contracts/), co czyni je użytecznym i _bezpiecznym_ rozwiązaniem do skalowania [aplikacji zdecentralizowanych](/developers/docs/dapps/). Podobnie, trwają prace nad [stworzeniem implementacji EVM o zerowej wiedzy (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549), która pozwoliłaby rollupom ZK na przetwarzanie dowolnej logiki i wykonywanie inteligentnych kontraktów.

### Niedostępność danych {#data-unavailability}

Jak wyjaśniono wcześniej, Plasma cierpi na problem z dostępnością danych. Gdyby złośliwy operator przeprowadził nieprawidłową zmianę stanu w łańcuchu Plasma, użytkownicy nie byliby w stanie jej zakwestionować, ponieważ operator może wstrzymać dane potrzebne do stworzenia dowodu oszustwa. Rollupy rozwiązują ten problem, zmuszając operatorów do publikowania danych transakcji na Ethereum, co pozwala każdemu zweryfikować stan łańcucha i w razie potrzeby tworzyć dowody oszustwa.

### Problem masowego wyjścia {#mass-exit-problem}

Rollupy ZK i rollupy optymistyczne rozwiązują problem masowego wyjścia w Plasma na różne sposoby. Na przykład rollup ZK opiera się na mechanizmach kryptograficznych, które zapewniają, że operatorzy nie mogą ukraść środków użytkowników w żadnym scenariuszu.

Podobnie rollupy optymistyczne narzucają okres opóźnienia wypłat, podczas którego każdy może zainicjować odwołanie i zapobiec złośliwym zleceniom wypłaty. Chociaż jest to podobne do Plasma, różnica polega na tym, że weryfikatorzy mają dostęp do danych potrzebnych do tworzenia dowodów oszustwa. W związku z tym użytkownicy rollupów nie muszą angażować się w szaleńczą migrację „kto pierwszy, ten lepszy” do sieci głównej Ethereum.

## Czym Plasma różni się od łańcuchów pobocznych i shardingu? {#plasma-sidechains-sharding}

Plasma, łańcuchy poboczne i sharding są do siebie dość podobne, ponieważ wszystkie w jakiś sposób łączą się z siecią główną Ethereum. Jednak poziom i siła tych połączeń są różne, co wpływa na właściwości bezpieczeństwa każdego rozwiązania skalującego.

### Plasma a łańcuchy poboczne {#plasma-vs-sidechains}

[Łańcuch poboczny](/developers/docs/scaling/sidechains/) to niezależnie działający blockchain połączony z siecią główną Ethereum za pomocą dwukierunkowego mostu. [Mosty](/bridges/) umożliwiają użytkownikom wymianę tokenów między dwoma blockchainami w celu dokonywania transakcji na łańcuchu pobocznym, zmniejszając przeciążenie sieci głównej Ethereum i poprawiając skalowalność.
Łańcuchy poboczne wykorzystują osobny mechanizm konsensusu i są zwykle znacznie mniejsze niż główna sieć Ethereum. Skutkuje to tym, że przenoszenie aktywów na te łańcuchy wiąże się ze zwiększonym ryzykiem. Biorąc pod uwagę brak dziedziczenia gwarancji bezpieczeństwa od sieci głównej Ethereum w modelu łańcucha pobocznego, użytkownicy są narażeni na stratę środków w wyniku ataku na łańcuch poboczny.

Łańcuchy plazma z kolei dziedziczą zabezpieczenia od sieci głównej. To sprawia, że są znacznie bezpieczniejsze od łańcuchów pobocznych. Zarówno łańcuchy poboczne, jak i łańcuchy plazma mogą mieć różne protokoły konsensusu, ale różnica tkwi w tym, że łańcuchy plazma publikują korzeń Merkle dla każdego bloku na sieci głównej Ethereum. Korzenie bloków są małymi skrawkami informacji, które można użyć w celu weryfikacji informacji na temat transakcji, które mają miejsce na łańcuchu plazma. Jeśli wydarzy się atak na łańcuch plazma, użytkownicy mogą bezpiecznie wypłacić swoje środku z powrotem do sieci głównej, używając odpowiednich dowodów.

### Plasma a sharding {#plasma-vs-sharding}

Zarówno łańcuchy plazma, jak i łańcuchy shard okresowo publikują dowody kryptograficzne na sieci głównej Ethereum. Jednakże mają różne właściwości zabezpieczeń.

Łańcuchy shardów zatwierdzają w sieci głównej „nagłówki kolacji” zawierające szczegółowe informacje o każdym shardzie danych. Węzły w sieci głównej weryfikują i egzekwują ważność shardów danych, zmniejszając możliwość nieprawidłowych zmian stanu shardów i chroniąc sieć przed złośliwą aktywnością.

Plasma jest inna, ponieważ sieć główna otrzymuje tylko minimalne informacje o stanie łańcuchów potomnych. Oznacza to, że sieć główna nie może skutecznie weryfikować transakcji przeprowadzanych na łańcuchach potomnych, co czyni je mniej bezpiecznymi.

**Uwaga**: sharding blockchaina Ethereum nie jest już uwzględniony w planie rozwoju. Został on zastąpiony przez skalowanie za pomocą rollupów i [Dankshardingu](/roadmap/danksharding).

### Użyj Plasma {#use-plasma}

Wiele projektów dostarcza implementacje Plasma, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Polygon](https://polygon.technology/) (wcześniej Matic Network)

## Dalsza lektura {#further-reading}

- [Dowiedz się więcej o Plasma](https://www.learnplasma.org/en/)
- [Krótkie przypomnienie, co oznacza „współdzielone bezpieczeństwo” i dlaczego jest tak ważne](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Łańcuchy poboczne a Plasma a Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Zrozumieć Plasma, część 1: Podstawy](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Życie i śmierć Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
