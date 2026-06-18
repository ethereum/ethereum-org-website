---
title: Łańcuchy Plasma
description: Wprowadzenie do łańcuchów Plasma jako rozwiązania skalującego obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Łańcuch Plasma to oddzielny blockchain zakotwiczony w [sieci głównej Ethereum](/), ale wykonujący transakcje pozałańcuchowo z własnym mechanizmem walidacji bloku. Łańcuchy Plasma są czasami nazywane łańcuchami „potomnymi”, będącymi w zasadzie mniejszymi kopiami sieci głównej Ethereum. Łańcuchy Plasma używają [dowodów oszustwa](/glossary/#fraud-proof) (podobnie jak [optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups/)) do rozstrzygania sporów.

Drzewa Merklego umożliwiają tworzenie nieskończonego stosu tych łańcuchów, które mogą odciążyć przepustowość łańcuchów nadrzędnych (w tym sieci głównej Ethereum). Jednakże, chociaż łańcuchy te czerpią pewne bezpieczeństwo z Ethereum (poprzez dowody oszustwa), na ich bezpieczeństwo i wydajność wpływa kilka ograniczeń projektowych.

## Wymagania wstępne {#prerequisites}

Powinieneś dobrze rozumieć wszystkie podstawowe tematy oraz mieć ogólne pojęcie o [skalowaniu Ethereum](/developers/docs/scaling/).

## Czym jest Plasma? {#what-is-plasma}

Plasma to framework poprawiający skalowalność w publicznych blockchainach, takich jak Ethereum. Jak opisano w oryginalnej [białej księdze Plasma](https://plasma.io/plasma.pdf), łańcuchy Plasma są budowane na innym blockchainie (zwanym „łańcuchem głównym”). Każdy „łańcuch potomny” rozszerza łańcuch główny i jest zazwyczaj zarządzany przez inteligentny kontrakt wdrożony w łańcuchu nadrzędnym.

Kontrakt Plasma działa między innymi jako [most](/developers/docs/bridges/), pozwalając użytkownikom na przenoszenie aktywów między siecią główną Ethereum a łańcuchem Plasma. Chociaż czyni to je podobnymi do [łańcuchów pobocznych](/developers/docs/scaling/sidechains/), łańcuchy Plasma korzystają — przynajmniej do pewnego stopnia — z bezpieczeństwa sieci głównej Ethereum. W przeciwieństwie do łańcuchów pobocznych, które są wyłącznie odpowiedzialne za własne bezpieczeństwo.

## Jak działa Plasma? {#how-does-plasma-work}

Podstawowe komponenty frameworka Plasma to:

### Obliczenia pozałańcuchowe {#offchain-computation}

Obecna prędkość przetwarzania Ethereum jest ograniczona do ~ 15-20 transakcji na sekundę, co zmniejsza krótkoterminową możliwość skalowania w celu obsługi większej liczby użytkowników. Problem ten istnieje głównie dlatego, że [mechanizm konsensusu](/developers/docs/consensus-mechanisms/) Ethereum wymaga, aby wiele węzłów peer-to-peer weryfikowało każdą aktualizację stanu blockchaina.

Chociaż mechanizm konsensusu Ethereum jest niezbędny dla bezpieczeństwa, może nie mieć zastosowania w każdym przypadku użycia. Na przykład Alice może nie potrzebować, aby jej codzienne płatności dla Boba za filiżankę kawy były weryfikowane przez całą sieć Ethereum, ponieważ między obiema stronami istnieje pewne zaufanie.

Plasma zakłada, że sieć główna Ethereum nie musi weryfikować wszystkich transakcji. Zamiast tego możemy przetwarzać transakcje poza Siecią główną, uwalniając węzły od konieczności walidacji każdej transakcji.

Obliczenia pozałańcuchowe są konieczne, ponieważ łańcuchy Plasma mogą optymalizować pod kątem szybkości i kosztów. Na przykład łańcuch Plasma może — i najczęściej to robi — używać pojedynczego „operatora” do zarządzania kolejnością i wykonywaniem transakcji. Dzięki temu, że tylko jeden podmiot weryfikuje transakcje, czas przetwarzania w łańcuchu Plasma jest krótszy niż w sieci głównej Ethereum.

### Zobowiązania stanu {#state-commitments}

Podczas gdy Plasma wykonuje transakcje pozałańcuchowo, są one rozliczane w głównej warstwie wykonawczej Ethereum — w przeciwnym razie łańcuchy Plasma nie mogłyby korzystać z gwarancji bezpieczeństwa Ethereum. Jednak finalizowanie transakcji pozałańcuchowych bez znajomości stanu łańcuchów Plasma złamałoby model bezpieczeństwa i pozwoliłoby na rozprzestrzenianie się nieprawidłowych transakcji. Dlatego operator, podmiot odpowiedzialny za tworzenie bloków w łańcuchu Plasma, jest zobowiązany do okresowego publikowania „zobowiązań stanu” w Ethereum.

[Schemat zobowiązania](https://en.wikipedia.org/wiki/Commitment_scheme) to technika kryptograficzna służąca do zobowiązania się do wartości lub oświadczenia bez ujawniania ich innej stronie. Zobowiązania są „wiążące” w tym sensie, że nie można zmienić wartości ani oświadczenia po tym, jak się do nich zobowiązano. Zobowiązania stanu w Plasmie przyjmują formę „korzeni drzewa Merklego” (pochodzących z [drzewa Merklego](/whitepaper/#merkle-trees)), które operator wysyła w odstępach czasu do kontraktu Plasma w łańcuchu Ethereum.

Korzenie drzewa Merklego to prymitywy kryptograficzne, które umożliwiają kompresję dużych ilości informacji. Korzeń drzewa Merklego (w tym przypadku nazywany również „korzeniem bloku”) może reprezentować wszystkie transakcje w bloku. Korzenie drzewa Merklego ułatwiają również weryfikację, czy mały fragment danych jest częścią większego zbioru danych. Na przykład użytkownik może wygenerować [dowód Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content), aby udowodnić włączenie transakcji do określonego bloku.

Korzenie drzewa Merklego są ważne dla dostarczania informacji o stanie pozałańcuchowym do Ethereum. Możesz myśleć o korzeniach drzewa Merklego jako o „punktach zapisu”: operator mówi: „To jest stan łańcucha Plasma w punkcie x w czasie, a to jest korzeń drzewa Merklego jako dowód”. Operator zobowiązuje się do _obecnego stanu_ łańcucha Plasma za pomocą korzenia drzewa Merklego, dlatego nazywa się to „zobowiązaniem stanu”.

### Wejścia i wyjścia {#entries-and-exits}

Aby użytkownicy Ethereum mogli korzystać z Plasmy, musi istnieć mechanizm przenoszenia środków między Siecią główną a łańcuchami Plasma. Nie możemy jednak arbitralnie wysłać etheru na adres w łańcuchu Plasma — te łańcuchy są niekompatybilne, więc transakcja albo by się nie powiodła, albo doprowadziłaby do utraty środków.

Plasma używa głównego kontraktu działającego na Ethereum do przetwarzania wejść i wyjść użytkowników. Ten główny kontrakt jest również odpowiedzialny za śledzenie zobowiązań stanu (wyjaśnionych wcześniej) i karanie nieuczciwych zachowań za pomocą dowodów oszustwa (więcej o tym później).

#### Wejście do łańcucha Plasma {#entering-the-plasma-chain}

Aby wejść do łańcucha Plasma, Alice (użytkownik) będzie musiała zdeponować ETH lub dowolny token ERC-20 w kontrakcie Plasma. Operator Plasmy, który obserwuje depozyty w kontrakcie, odtwarza kwotę równą początkowemu depozytowi Alice i uwalnia ją na jej adres w łańcuchu Plasma. Alice jest zobowiązana do poświadczenia otrzymania środków w łańcuchu potomnym, a następnie może użyć tych środków do transakcji.

#### Wyjście z łańcucha Plasma {#exiting-the-plasma-chain}

Wyjście z łańcucha Plasma jest bardziej złożone niż wejście do niego z kilku powodów. Największym z nich jest to, że chociaż Ethereum ma informacje o stanie łańcucha Plasma, nie może zweryfikować, czy te informacje są prawdziwe, czy nie. Złośliwy użytkownik mógłby złożyć nieprawdziwe oświadczenie („Mam 1000 ETH”) i uniknąć kary, dostarczając fałszywe dowody na poparcie tego roszczenia.

Aby zapobiec złośliwym wypłatom, wprowadzono „okres wyzwania” (challenge period). W okresie wyzwania (zazwyczaj tydzień) każdy może zakwestionować żądanie wypłaty za pomocą dowodu oszustwa. Jeśli wyzwanie się powiedzie, żądanie wypłaty zostaje odrzucone.

Zazwyczaj jednak użytkownicy są uczciwi i zgłaszają poprawne roszczenia dotyczące posiadanych środków. W tym scenariuszu Alice zainicjuje żądanie wypłaty w łańcuchu głównym (Ethereum), przesyłając transakcję do kontraktu Plasma.

Musi również dostarczyć dowód Merkle'a weryfikujący, że transakcja tworząca jej środki w łańcuchu Plasma została włączona do bloku. Jest to konieczne w przypadku iteracji Plasmy, takich jak [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), które używają modelu [UTXO](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Inne, takie jak [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), reprezentują środki jako [niewymienialne tokeny](/developers/docs/standards/tokens/erc-721/) zamiast UTXO. Wypłata w tym przypadku wymaga dowodu własności tokenów w łańcuchu Plasma. Odbywa się to poprzez przesłanie dwóch najnowszych transakcji obejmujących token i dostarczenie dowodu Merkle'a weryfikującego włączenie tych transakcji do bloku.

Użytkownik musi również dodać kaucję do żądania wypłaty jako gwarancję uczciwego zachowania. Jeśli rzucający wyzwanie udowodni, że żądanie wypłaty Alice jest nieważne, jej kaucja podlega cięciu, a jej część trafia do rzucającego wyzwanie jako nagroda.

Jeśli okres wyzwania upłynie bez dostarczenia przez kogokolwiek dowodu oszustwa, żądanie wypłaty Alice jest uważane za ważne, co pozwala jej na odzyskanie depozytów z kontraktu Plasma w Ethereum.

### Rozstrzyganie sporów {#dispute-arbitration}

Podobnie jak każdy blockchain, łańcuchy Plasma potrzebują mechanizmu egzekwowania integralności transakcji w przypadku złośliwego działania uczestników (np. podwójne wydatkowanie środków). W tym celu łańcuchy Plasma używają dowodów oszustwa do rozstrzygania sporów dotyczących ważności przejść stanu i karania złego zachowania. Dowody oszustwa są używane jako mechanizm, za pomocą którego łańcuch potomny Plasma składa skargę do swojego łańcucha nadrzędnego lub do łańcucha głównego.

Dowód oszustwa to po prostu roszczenie, że określone przejście stanu jest nieważne. Przykładem jest sytuacja, w której użytkownik (Alice) próbuje wydać te same środki dwukrotnie. Być może wydała UTXO w transakcji z Bobem i chce wydać to samo UTXO (które jest teraz własnością Boba) w innej transakcji.

Aby zapobiec wypłacie, Bob skonstruuje dowód oszustwa, dostarczając dowód na to, że Alice wydała wspomniane UTXO w poprzedniej transakcji, oraz dowód Merkle'a na włączenie transakcji do bloku. Ten sam proces działa w Plasma Cash — Bob musiałby dostarczyć dowód, że Alice wcześniej przetransferowała tokeny, które próbuje wypłacić.

Jeśli wyzwanie Boba się powiedzie, żądanie wypłaty Alice zostanie anulowane. Jednak to podejście opiera się na zdolności Boba do obserwowania łańcucha pod kątem żądań wypłaty. Jeśli Bob jest offline, Alice może przetworzyć złośliwą wypłatę po upływie okresu wyzwania.

## Problem masowego wyjścia w Plasmie {#the-mass-exit-problem-in-plasma}

Problem masowego wyjścia występuje, gdy duża liczba użytkowników próbuje jednocześnie wypłacić środki z łańcuchów Plasma. Powód istnienia tego problemu ma związek z jednym z największych problemów Plasmy: **niedostępnością danych**.

Dostępność danych (DA) to zdolność do weryfikacji, czy informacje dla proponowanego bloku zostały faktycznie opublikowane w sieci blockchain. Blok jest „niedostępny”, jeśli producent publikuje sam blok, ale zataja dane użyte do jego utworzenia.

Bloki muszą być dostępne, aby węzły mogły pobrać blok i zweryfikować ważność transakcji. Blockchainy zapewniają dostępność danych, zmuszając producentów bloków do publikowania wszystkich danych transakcji onchain.

Dostępność danych pomaga również w zabezpieczaniu pozałańcuchowych protokołów skalowania, które opierają się na warstwie bazowej Ethereum. Zmuszając operatorów w tych łańcuchach do publikowania danych transakcji w Ethereum, każdy może zakwestionować nieprawidłowe bloki, konstruując dowody oszustwa odnoszące się do prawidłowego stanu łańcucha.

Łańcuchy Plasma przechowują dane transakcji głównie u operatora i **nie publikują żadnych danych w Sieci głównej** (tj. poza okresowymi zobowiązaniami stanu). Oznacza to, że użytkownicy muszą polegać na operatorze w zakresie dostarczania danych bloku, jeśli muszą utworzyć dowody oszustwa kwestionujące nieprawidłowe transakcje. Jeśli ten system działa, użytkownicy mogą zawsze używać dowodów oszustwa do zabezpieczenia środków.

Problem zaczyna się, gdy to operator, a nie zwykły użytkownik, jest stroną działającą złośliwie. Ponieważ operator ma wyłączną kontrolę nad blockchainem, ma większą motywację do wprowadzania nieprawidłowych przejść stanu na większą skalę, takich jak kradzież środków należących do użytkowników w łańcuchu Plasma.

W tym przypadku użycie klasycznego systemu dowodów oszustwa nie działa. Operator mógłby łatwo wykonać nieprawidłową transakcję przenoszącą środki Alice i Boba do swojego portfela i ukryć dane niezbędne do utworzenia dowodu oszustwa. Jest to możliwe, ponieważ operator nie jest zobowiązany do udostępniania danych użytkownikom ani Sieci głównej.

Dlatego najbardziej optymistycznym rozwiązaniem jest próba „masowego wyjścia” użytkowników z łańcuchów Plasma. Masowe wyjście spowalnia plan złośliwego operatora polegający na kradzieży środków i zapewnia użytkownikom pewien stopień ochrony. Żądania wypłaty są uporządkowane na podstawie tego, kiedy każde UTXO (lub token) zostało utworzone, co zapobiega wyprzedzaniu transakcji uczciwych użytkowników przez złośliwych operatorów.

Niemniej jednak nadal potrzebujemy sposobu na weryfikację ważności żądań wypłaty podczas masowego wyjścia — aby zapobiec oportunistycznym jednostkom zarabiającym na chaosie poprzez przetwarzanie nieprawidłowych wyjść. Rozwiązanie jest proste: wymagać od użytkowników opublikowania ostatniego **ważnego stanu łańcucha**, aby wypłacić swoje pieniądze.

Ale to podejście nadal ma problemy. Na przykład, jeśli wszyscy użytkownicy w łańcuchu Plasma muszą wyjść (co jest możliwe w przypadku złośliwego operatora), to cały ważny stan łańcucha Plasma musi zostać zrzucony do warstwy bazowej Ethereum naraz. Biorąc pod uwagę arbitralny rozmiar łańcuchów Plasma (wysoka przepustowość = więcej danych) i ograniczenia prędkości przetwarzania Ethereum, nie jest to idealne rozwiązanie.

Chociaż gry wyjścia (exit games) brzmią dobrze w teorii, w rzeczywistości masowe wyjścia prawdopodobnie wywołają zatory w całej sieci Ethereum. Oprócz szkodzenia funkcjonalności Ethereum, słabo skoordynowane masowe wyjście oznacza, że użytkownicy mogą nie być w stanie wypłacić środków, zanim operator opróżni każde konto w łańcuchu Plasma.

## Plusy i minusy Plasmy {#pros-and-cons-of-plasma}

| Plusy                                                                                                                                                                                                                            | Minusy                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferuje wysoką przepustowość i niski koszt transakcji.                                                                                                                                                                           | Nie obsługuje ogólnych obliczeń (nie może uruchamiać inteligentnych kontraktów). Tylko podstawowe transfery tokenów, swapy i kilka innych typów transakcji są obsługiwane za pomocą logiki predykatów. |
| Dobre dla transakcji między dowolnymi użytkownikami (brak narzutu na parę użytkowników, jeśli obaj są ustanowieni w łańcuchu Plasma)                                                                                             | Konieczność okresowego obserwowania sieci (wymóg żywotności) lub delegowania tej odpowiedzialności na kogoś innego, aby zapewnić bezpieczeństwo swoich środków.              |
| Łańcuchy Plasma można dostosować do konkretnych przypadków użycia, które nie są związane z łańcuchem głównym. Każdy, w tym firmy, może dostosować inteligentne kontrakty Plasma, aby zapewnić skalowalną infrastrukturę działającą w różnych kontekstach. | Opiera się na jednym lub kilku operatorach do przechowywania danych i udostępniania ich na żądanie.                                                                          |
| Zmniejsza obciążenie sieci głównej Ethereum poprzez przeniesienie obliczeń i przechowywania pozałańcuchowo.                                                                                                                      | Wypłaty są opóźnione o kilka dni, aby umożliwić wyzwania. W przypadku aktywów wymienialnych można to złagodzić za pomocą dostawców płynności, ale wiąże się to z kosztami kapitałowymi. |
|                                                                                                                                                                                                                                  | Jeśli zbyt wielu użytkowników spróbuje wyjść jednocześnie, sieć główna Ethereum może ulec zatorowi.                                                                          |

## Plasma a protokoły skalowania warstwy 2 {#plasma-vs-layer-2}

Chociaż Plasma była kiedyś uważana za przydatne rozwiązanie skalujące dla Ethereum, od tego czasu została porzucona na rzecz [protokołów skalowania warstwy 2 (L2)](/layer-2/). Rozwiązania skalujące L2 naprawiają kilka problemów Plasmy:

### Wydajność {#efficiency}

[Rollupy z wiedzą zerową](/developers/docs/scaling/zk-rollups) generują kryptograficzne dowody ważności każdej partii transakcji przetwarzanych pozałańcuchowo. Zapobiega to wprowadzaniu przez użytkowników (i operatorów) nieprawidłowych przejść stanu, eliminując potrzebę okresów wyzwań i gier wyjścia. Oznacza to również, że użytkownicy nie muszą okresowo obserwować łańcucha, aby zabezpieczyć swoje środki.

### Obsługa inteligentnych kontraktów {#support-for-smart-contracts}

Kolejnym problemem z frameworkiem Plasma była [niezdolność do obsługi wykonywania inteligentnych kontraktów Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). W rezultacie większość implementacji Plasmy była budowana głównie z myślą o prostych płatnościach lub wymianie tokenów ERC-20.

Z kolei optymistyczne rollupy są kompatybilne z [Maszyną Wirtualną Ethereum](/developers/docs/evm/) i mogą uruchamiać natywne dla Ethereum [inteligentne kontrakty](/developers/docs/smart-contracts/), co czyni je użytecznym i _bezpiecznym_ rozwiązaniem do skalowania [zdecentralizowanych aplikacji (dapp)](/developers/docs/dapps/). Podobnie trwają plany [stworzenia implementacji EVM z wiedzą zerową (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549), która pozwoliłaby ZK-rollupom na przetwarzanie dowolnej logiki i wykonywanie inteligentnych kontraktów.

### Niedostępność danych {#data-unavailability}

Jak wyjaśniono wcześniej, Plasma cierpi na problem dostępności danych. Jeśli złośliwy operator wprowadziłby nieprawidłowe przejście w łańcuchu Plasma, użytkownicy nie byliby w stanie go zakwestionować, ponieważ operator może zataić dane potrzebne do utworzenia dowodu oszustwa. Rollupy rozwiązują ten problem, zmuszając operatorów do publikowania danych transakcji w Ethereum, co pozwala każdemu na weryfikację stanu łańcucha i tworzenie dowodów oszustwa w razie potrzeby.

### Problem masowego wyjścia {#mass-exit-problem}

Zarówno ZK-rollupy, jak i optymistyczne rollupy rozwiązują problem masowego wyjścia Plasmy na różne sposoby. Na przykład ZK-rollup opiera się na mechanizmach kryptograficznych, które zapewniają, że operatorzy nie mogą ukraść środków użytkowników w żadnym scenariuszu.

Podobnie optymistyczne rollupy nakładają okres opóźnienia na wypłaty, podczas którego każdy może zainicjować wyzwanie i zapobiec złośliwym żądaniom wypłaty. Chociaż jest to podobne do Plasmy, różnica polega na tym, że weryfikatorzy mają dostęp do danych potrzebnych do tworzenia dowodów oszustwa. Dzięki temu użytkownicy rollupów nie muszą angażować się w gorączkową migrację „kto pierwszy, ten lepszy” do sieci głównej Ethereum.

## Czym Plasma różni się od łańcuchów pobocznych i shardingu? {#plasma-sidechains-sharding}

Plasma, łańcuchy poboczne i sharding są dość podobne, ponieważ wszystkie w jakiś sposób łączą się z siecią główną Ethereum. Jednak poziom i siła tych połączeń są różne, co wpływa na właściwości bezpieczeństwa każdego rozwiązania skalującego.

### Plasma a łańcuchy poboczne {#plasma-vs-sidechains}

[Łańcuch poboczny](/developers/docs/scaling/sidechains/) to niezależnie obsługiwany blockchain połączony z siecią główną Ethereum za pomocą dwukierunkowego mostu. [Mosty](/bridges/) pozwalają użytkownikom na wymianę tokenów między dwoma blockchainami w celu przeprowadzania transakcji w łańcuchu pobocznym, zmniejszając zatory w sieci głównej Ethereum i poprawiając skalowalność.
Łańcuchy poboczne używają oddzielnego mechanizmu konsensusu i są zazwyczaj znacznie mniejsze niż sieć główna Ethereum. W rezultacie przenoszenie aktywów przez most do tych łańcuchów wiąże się ze zwiększonym ryzykiem; biorąc pod uwagę brak gwarancji bezpieczeństwa odziedziczonych po sieci głównej Ethereum w modelu łańcucha pobocznego, użytkownicy ryzykują utratę środków w przypadku ataku na łańcuch poboczny.

Z kolei łańcuchy Plasma czerpią swoje bezpieczeństwo z Sieci głównej. Czyni to je wymiernie bezpieczniejszymi niż łańcuchy poboczne. Zarówno łańcuchy poboczne, jak i łańcuchy Plasma mogą mieć różne protokoły konsensusu, ale różnica polega na tym, że łańcuchy Plasma publikują korzenie drzewa Merklego dla każdego bloku w sieci głównej Ethereum. Korzenie bloku to małe fragmenty informacji, których możemy użyć do weryfikacji informacji o transakcjach, które mają miejsce w łańcuchu Plasma. Jeśli w łańcuchu Plasma nastąpi atak, użytkownicy mogą bezpiecznie wypłacić swoje środki z powrotem do Sieci głównej, używając odpowiednich dowodów.

### Plasma a sharding {#plasma-vs-sharding}

Zarówno łańcuchy Plasma, jak i łańcuchy shardów okresowo publikują dowody kryptograficzne w sieci głównej Ethereum. Jednak oba mają różne właściwości bezpieczeństwa.

Łańcuchy shardów przekazują do Sieci głównej „nagłówki zestawień” (collation headers) zawierające szczegółowe informacje o każdym shardzie danych. Węzły w Sieci głównej weryfikują i egzekwują ważność shardów danych, zmniejszając możliwość nieprawidłowych przejść shardów i chroniąc sieć przed złośliwą aktywnością.

Plasma różni się tym, że Sieć główna otrzymuje tylko minimalne informacje o stanie łańcuchów potomnych. Oznacza to, że Sieć główna nie może skutecznie weryfikować transakcji przeprowadzanych w łańcuchach potomnych, co czyni je mniej bezpiecznymi.

**Uwaga:** sharding blockchaina Ethereum nie znajduje się już na mapie drogowej. Został on zastąpiony przez skalowanie za pomocą rollupów i [dankshardingu](/roadmap/danksharding).

### Użyj Plasmy {#use-plasma}

Wiele projektów dostarcza implementacje Plasmy, które możesz zintegrować ze swoimi zdecentralizowanymi aplikacjami (dapp):

- [Polygon](https://polygon.technology/) (wcześniej Matic Network)

## Dalsza lektura {#further-reading}

- [Poznaj Plasmę](https://www.learnplasma.org/en/)
- [Szybkie przypomnienie, co oznacza „współdzielone bezpieczeństwo” i dlaczego jest tak ważne](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Łańcuchy poboczne a Plasma a Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Zrozumieć Plasmę, część 1: Podstawy](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Życie i śmierć Plasmy](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Samouczki: Łańcuchy Plasma na Ethereum {#tutorials}

- [Napisz specyficzną dla aplikacji Plasmę, która zachowuje prywatność](/developers/tutorials/app-plasma/) _– Zbuduj aplikację Plasma chroniącą prywatność, używając dowodów z wiedzą zerową i komponentów pozałańcuchowych._