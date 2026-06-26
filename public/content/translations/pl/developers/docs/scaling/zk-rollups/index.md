---
title: "Rollupy z wiedzą zerową"
description: "Wprowadzenie do rollupów z wiedzą zerową — rozwiązania skalującego używanego przez społeczność Ethereum."
lang: pl
---

Rollupy z wiedzą zerową (ZK-rollupy) to [rozwiązania skalujące](/developers/docs/scaling/) warstwy 2 (L2), które zwiększają przepustowość w sieci głównej [Ethereum](/) poprzez przeniesienie obliczeń i przechowywania stanu do środowiska pozałańcuchowego. ZK-rollupy mogą przetwarzać tysiące transakcji we wsadzie, a następnie publikować tylko minimalne dane podsumowujące w sieci głównej. Te dane podsumowujące definiują zmiany, które powinny zostać wprowadzone do stanu Ethereum, oraz pewien dowód kryptograficzny, że te zmiany są poprawne.

## Wymagania wstępne {#prerequisites}

Powinieneś przeczytać i zrozumieć naszą stronę o [skalowaniu Ethereum](/developers/docs/scaling/) oraz [warstwie 2 (L2)](/layer-2).

## Czym są rollupy z wiedzą zerową? {#what-are-zk-rollups}

**Rollupy z wiedzą zerową (ZK-rollupy)** grupują (lub „zwijają”) transakcje we wsady, które są wykonywane w sposób pozałańcuchowy. Pozałańcuchowe obliczenia zmniejszają ilość danych, które muszą zostać opublikowane na blockchainie. Operatorzy ZK-rollupów przesyłają podsumowanie zmian wymaganych do reprezentowania wszystkich transakcji we wsadzie, zamiast wysyłać każdą transakcję osobno. Generują oni również [dowody ważności](/glossary/#validity-proof), aby udowodnić poprawność swoich zmian.

Stan ZK-rollupa jest utrzymywany przez inteligentny kontrakt wdrożony w sieci Ethereum. Aby zaktualizować ten stan, węzły ZK-rollupa muszą przesłać dowód ważności do weryfikacji. Jak wspomniano, dowód ważności to kryptograficzna gwarancja, że zmiana stanu zaproponowana przez rollup jest w rzeczywistości wynikiem wykonania danej partii transakcji. Oznacza to, że ZK-rollupy muszą jedynie dostarczyć dowody ważności, aby sfinalizować transakcje w Ethereum, zamiast publikować wszystkie dane transakcji onchain, jak robią to [optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups/).

Nie ma opóźnień przy przenoszeniu środków z ZK-rollupa do Ethereum, ponieważ transakcje wyjścia są wykonywane, gdy tylko kontrakt ZK-rollupa zweryfikuje dowód ważności. Z kolei wypłata środków z optymistycznych rollupów podlega opóźnieniu, aby umożliwić każdemu zakwestionowanie transakcji wyjścia za pomocą [dowodu oszustwa](/glossary/#fraud-proof).

ZK-rollupy zapisują transakcje w Ethereum jako `calldata`. `calldata` to miejsce, w którym przechowywane są dane zawarte w zewnętrznych wywołaniach funkcji inteligentnych kontraktów. Informacje w `calldata` są publikowane na blockchainie, co pozwala każdemu na niezależne zrekonstruowanie stanu rollupa. ZK-rollupy wykorzystują techniki kompresji w celu zmniejszenia ilości danych transakcyjnych — na przykład konta są reprezentowane przez indeks, a nie adres, co pozwala zaoszczędzić 28 bajtów danych. Publikacja danych onchain jest znaczącym kosztem dla rollupów, więc kompresja danych może obniżyć opłaty dla użytkowników.

## Jak ZK-rollupy współpracują z Ethereum? {#zk-rollups-and-ethereum}

Łańcuch ZK-rollupa to pozałańcuchowy protokół, który działa na wierzchu blockchaina Ethereum i jest zarządzany przez inteligentne kontrakty onchain Ethereum. ZK-rollupy wykonują transakcje poza siecią główną, ale okresowo przesyłają pozałańcuchowe wsady transakcji do kontraktu rollupa onchain. Ten zapis transakcji jest niezmienny, podobnie jak blockchain Ethereum, i tworzy łańcuch ZK-rollupa.

Podstawowa architektura ZK-rollupa składa się z następujących komponentów:

1. **Kontrakty onchain**: Jak wspomniano, protokół ZK-rollupa jest kontrolowany przez inteligentne kontrakty działające w Ethereum. Obejmuje to główny kontrakt, który przechowuje bloki rollupa, śledzi depozyty i monitoruje aktualizacje stanu. Inny kontrakt onchain (kontrakt weryfikatora) weryfikuje dowody z wiedzą zerową przesłane przez producentów bloków. W ten sposób Ethereum służy jako warstwa bazowa lub „warstwa 1 (L1)” dla ZK-rollupa.

2. **Pozałańcuchowa maszyna wirtualna (VM)**: Chociaż protokół ZK-rollupa istnieje w Ethereum, wykonywanie transakcji i przechowywanie stanu odbywa się na oddzielnej maszynie wirtualnej, niezależnej od [EVM](/developers/docs/evm/). Ta pozałańcuchowa maszyna wirtualna jest środowiskiem wykonawczym dla transakcji w ZK-rollupie i służy jako warstwa wtórna lub „warstwa 2 (L2)” dla protokołu ZK-rollupa. Dowody ważności weryfikowane w sieci głównej Ethereum gwarantują poprawność przejść stanu w pozałańcuchowej maszynie wirtualnej.

ZK-rollupy to „hybrydowe rozwiązania skalujące” — pozałańcuchowe protokoły, które działają niezależnie, ale czerpią bezpieczeństwo z Ethereum. W szczególności sieć Ethereum wymusza ważność aktualizacji stanu w ZK-rollupie i gwarantuje dostępność danych stojących za każdą aktualizacją stanu rollupa. W rezultacie ZK-rollupy są znacznie bezpieczniejsze niż czysto pozałańcuchowe rozwiązania skalujące, takie jak [łańcuchy poboczne (sidechains)](/developers/docs/scaling/sidechains/), które same odpowiadają za swoje właściwości bezpieczeństwa, lub [validium](/developers/docs/scaling/validium/), które również weryfikują transakcje w Ethereum za pomocą dowodów ważności, ale przechowują dane transakcji w innym miejscu.

ZK-rollupy polegają na głównym protokole Ethereum w następujących kwestiach:

### Dostępność danych {#data-availability}

ZK-rollupy publikują w Ethereum dane stanu dla każdej transakcji przetwarzanej w sposób pozałańcuchowy. Dzięki tym danym osoby fizyczne lub firmy mogą odtworzyć stan rollupa i samodzielnie zweryfikować łańcuch. Ethereum udostępnia te dane wszystkim uczestnikom sieci jako `calldata`.

ZK-rollupy nie muszą publikować wielu danych transakcyjnych onchain, ponieważ dowody ważności już weryfikują autentyczność przejść stanu. Niemniej jednak przechowywanie danych onchain jest nadal ważne, ponieważ pozwala na niewymagającą pozwoleń, niezależną weryfikację stanu łańcucha L2, co z kolei pozwala każdemu na przesyłanie wsadów transakcji, zapobiegając cenzurowaniu lub zamrażaniu łańcucha przez złośliwych operatorów.

Dostępność onchain jest wymagana, aby użytkownicy mogli wchodzić w interakcje z rollupem. Bez dostępu do danych stanu użytkownicy nie mogą sprawdzać salda swojego konta ani inicjować transakcji (np. wypłat), które opierają się na informacjach o stanie.

### Ostateczność transakcji {#transaction-finality}

Ethereum działa jako warstwa rozrachunku dla ZK-rollupów: transakcje L2 są sfinalizowane tylko wtedy, gdy kontrakt L1 zaakceptuje dowód ważności. Eliminuje to ryzyko uszkodzenia łańcucha przez złośliwych operatorów (np. kradzieży środków z rollupa), ponieważ każda transakcja musi zostać zatwierdzona w sieci głównej. Ponadto Ethereum gwarantuje, że operacje użytkowników nie mogą zostać cofnięte po ich sfinalizowaniu w L1.

### Odporność na cenzurę {#censorship-resistance}

Większość ZK-rollupów używa „superwęzła” (operatora) do wykonywania transakcji, tworzenia wsadów i przesyłania bloków do L1. Chociaż zapewnia to wydajność, zwiększa ryzyko cenzury: złośliwi operatorzy ZK-rollupów mogą cenzurować użytkowników, odmawiając włączenia ich transakcji do wsadów.

Jako środek bezpieczeństwa, ZK-rollupy pozwalają użytkownikom na przesyłanie transakcji bezpośrednio do kontraktu rollupa w sieci głównej, jeśli uważają, że są cenzurowani przez operatora. Pozwala to użytkownikom wymusić wyjście z ZK-rollupa do Ethereum bez konieczności polegania na pozwoleniu operatora.

## Jak działają ZK-rollupy? {#how-do-zk-rollups-work}

### Transakcje {#transactions}

Użytkownicy w ZK-rollupie podpisują transakcje i przesyłają je do operatorów L2 w celu przetworzenia i włączenia do następnego wsadu. W niektórych przypadkach operatorem jest scentralizowany podmiot, zwany sekwenserem, który wykonuje transakcje, agreguje je we wsady i przesyła do L1. Sekwenser w tym systemie jest jedynym podmiotem uprawnionym do tworzenia bloków L2 i dodawania transakcji rollupa do kontraktu ZK-rollupa.

Inne ZK-rollupy mogą rotować rolę operatora, używając zestawu walidatorów [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/). Potencjalni operatorzy deponują środki w kontrakcie rollupa, a wielkość każdej stawki wpływa na szanse stakującego na zostanie wybranym do wyprodukowania następnego wsadu rollupa. Stawka operatora może zostać poddana cięciu, jeśli działa on złośliwie, co zachęca go do publikowania ważnych bloków.

#### Jak ZK-rollupy publikują dane transakcyjne w Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Jak wyjaśniono, dane transakcyjne są publikowane w Ethereum jako `calldata`. `calldata` to obszar danych w inteligentnym kontrakcie używany do przekazywania argumentów do funkcji i zachowuje się podobnie do [pamięci (memory)](/developers/docs/smart-contracts/anatomy/#memory). Chociaż `calldata` nie jest przechowywane jako część stanu Ethereum, utrzymuje się onchain jako część [dzienników historii](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) łańcucha Ethereum. `calldata` nie wpływa na stan Ethereum, co czyni go tanim sposobem na przechowywanie danych onchain.

Słowo kluczowe `calldata` często identyfikuje metodę inteligentnego kontraktu wywoływaną przez transakcję i przechowuje dane wejściowe do metody w postaci dowolnej sekwencji bajtów. ZK-rollupy używają `calldata` do publikowania skompresowanych danych transakcyjnych onchain; operator rollupa po prostu dodaje nowy wsad, wywołując wymaganą funkcję w kontrakcie rollupa i przekazuje skompresowane dane jako argumenty funkcji. Pomaga to obniżyć koszty dla użytkowników, ponieważ duża część opłat za rollup jest przeznaczana na przechowywanie danych transakcyjnych onchain.

### Zobowiązania stanu {#state-commitments}

Stan ZK-rollupa, który obejmuje konta i salda L2, jest reprezentowany jako [drzewo Merklego](/whitepaper/#merkle-trees). Kryptograficzny hash korzenia drzewa Merklego (korzeń drzewa Merklego) jest przechowywany w kontrakcie onchain, co pozwala protokołowi rollupa na śledzenie zmian w stanie ZK-rollupa.

Rollup przechodzi do nowego stanu po wykonaniu nowego zestawu transakcji. Operator, który zainicjował przejście stanu, jest zobowiązany do obliczenia nowego korzenia stanu i przesłania go do kontraktu onchain. Jeśli dowód ważności powiązany z wsadem zostanie uwierzytelniony przez kontrakt weryfikatora, nowy korzeń drzewa Merklego staje się kanonicznym korzeniem stanu ZK-rollupa.

Oprócz obliczania korzeni stanu, operator ZK-rollupa tworzy również korzeń wsadu — korzeń drzewa Merklego obejmujący wszystkie transakcje we wsadzie. Po przesłaniu nowego wsadu kontrakt rollupa przechowuje korzeń wsadu, umożliwiając użytkownikom udowodnienie, że transakcja (np. żądanie wypłaty) została uwzględniona we wsadzie. Użytkownicy będą musieli podać szczegóły transakcji, korzeń wsadu oraz [dowód Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) pokazujący ścieżkę włączenia.

### Dowody ważności {#validity-proofs}

Nowy korzeń stanu, który operator ZK-rollupa przesyła do kontraktu L1, jest wynikiem aktualizacji stanu rollupa. Załóżmy, że Alice wysyła 10 tokenów do Boba, operator po prostu zmniejsza saldo Alice o 10 i zwiększa saldo Boba o 10. Następnie operator haszuje zaktualizowane dane konta, przebudowuje drzewo Merklego rollupa i przesyła nowy korzeń drzewa Merklego do kontraktu onchain.

Ale kontrakt rollupa nie zaakceptuje automatycznie proponowanego zobowiązania stanu, dopóki operator nie udowodni, że nowy korzeń drzewa Merklego wynika z poprawnych aktualizacji stanu rollupa. Operator ZK-rollupa robi to, generując dowód ważności, zwięzłe zobowiązanie kryptograficzne weryfikujące poprawność wsadowanych transakcji.

Dowody ważności pozwalają stronom udowodnić poprawność stwierdzenia bez ujawniania samego stwierdzenia — stąd nazywane są również dowodami z wiedzą zerową. ZK-rollupy używają dowodów ważności do potwierdzenia poprawności pozałańcuchowych przejść stanu bez konieczności ponownego wykonywania transakcji w Ethereum. Dowody te mogą mieć postać [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) lub [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Zarówno SNARK, jak i STARK pomagają poświadczyć integralność pozałańcuchowych obliczeń w ZK-rollupach, chociaż każdy typ dowodu ma charakterystyczne cechy.

**ZK-SNARK**

Aby protokół ZK-SNARK działał, konieczne jest utworzenie wspólnego ciągu referencyjnego (CRS): CRS zapewnia publiczne parametry do dowodzenia i weryfikacji dowodów ważności. Bezpieczeństwo systemu dowodzenia zależy od konfiguracji CRS; jeśli informacje użyte do utworzenia parametrów publicznych wpadną w ręce złośliwych aktorów, mogą oni być w stanie wygenerować fałszywe dowody ważności.

Niektóre ZK-rollupy próbują rozwiązać ten problem, używając [ceremonii wielostronnych obliczeń (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), z udziałem zaufanych osób, do wygenerowania publicznych parametrów dla obwodu ZK-SNARK. Każda ze stron wnosi pewną losowość (zwaną „toksycznymi odpadami”) do konstrukcji CRS, którą musi natychmiast zniszczyć.

Zaufane konfiguracje są używane, ponieważ zwiększają bezpieczeństwo konfiguracji CRS. Dopóki jeden uczciwy uczestnik zniszczy swoje dane wejściowe, bezpieczeństwo systemu ZK-SNARK jest gwarantowane. Mimo to podejście to wymaga zaufania do zaangażowanych osób, że usuną one swoją próbkowaną losowość i nie podważą gwarancji bezpieczeństwa systemu.

Pomijając założenia dotyczące zaufania, ZK-SNARKi są popularne ze względu na małe rozmiary dowodów i weryfikację w stałym czasie. Ponieważ weryfikacja dowodów w L1 stanowi większy koszt operacyjny ZK-rollupa, L2 używają ZK-SNARKów do generowania dowodów, które można szybko i tanio zweryfikować w sieci głównej.

**ZK-STARK**

Podobnie jak ZK-SNARKi, ZK-STARKi dowodzą ważności pozałańcuchowych obliczeń bez ujawniania danych wejściowych. Jednak ZK-STARKi są uważane za ulepszenie w stosunku do ZK-SNARKów ze względu na ich skalowalność i przejrzystość.

ZK-STARKi są „przejrzyste”, ponieważ mogą działać bez zaufanej konfiguracji wspólnego ciągu referencyjnego (CRS). Zamiast tego ZK-STARKi opierają się na publicznie weryfikowalnej losowości w celu skonfigurowania parametrów do generowania i weryfikacji dowodów.

ZK-STARKi zapewniają również większą skalowalność, ponieważ czas potrzebny na udowodnienie i weryfikację dowodów ważności rośnie _prawie liniowo_ w stosunku do złożoności podstawowych obliczeń. W przypadku ZK-SNARKów czas dowodzenia i weryfikacji skaluje się _liniowo_ w stosunku do rozmiaru podstawowych obliczeń. Oznacza to, że ZK-STARKi wymagają mniej czasu niż ZK-SNARKi na dowodzenie i weryfikację, gdy w grę wchodzą duże zbiory danych, co czyni je użytecznymi w aplikacjach o dużej objętości.

ZK-STARKi są również bezpieczne przed komputerami kwantowymi, podczas gdy kryptografia krzywych eliptycznych (ECC) używana w ZK-SNARKach jest powszechnie uważana za podatną na ataki z użyciem komputerów kwantowych. Wadą ZK-STARKów jest to, że generują one większe rozmiary dowodów, które są droższe w weryfikacji w Ethereum.

#### Jak działają dowody ważności w ZK-rollupach? {#validity-proofs-in-zk-rollups}

##### Generowanie dowodów
Przed zaakceptowaniem transakcji operator przeprowadzi zwykłe kontrole. Obejmuje to potwierdzenie, że:

- Konta nadawcy i odbiorcy są częścią drzewa stanu.
- Nadawca ma wystarczające środki do przetworzenia transakcji.
- Transakcja jest poprawnna i pasuje do klucza publicznego nadawcy w rollupie.
- Nonce nadawcy jest poprawne itp.

Gdy węzeł ZK-rollupa ma wystarczającą liczbę transakcji, agreguje je we wsad i kompiluje dane wejściowe dla obwodu dowodzącego, aby skompilować je w zwięzły dowód z wiedzą zerową. Obejmuje to:

- Korzeń drzewa Merklego obejmujący wszystkie transakcje we wsadzie.
- Dowody Merkle'a dla transakcji w celu udowodnienia włączenia do wsadu.
- Dowody Merkle'a dla każdej pary nadawca-odbiorca w transakcjach w celu udowodnienia, że te konta są częścią drzewa stanu rollupa.
- Zestaw pośrednich korzeni stanu, pochodzących z aktualizacji korzenia stanu po zastosowaniu aktualizacji stanu dla każdej transakcji (tj. zmniejszeniu kont nadawców i zwiększeniu kont odbiorców).

Obwód dowodzący oblicza dowód ważności, „zapętlając” każdą transakcję i wykonując te same kontrole, które operator ukończył przed przetworzeniem transakcji. Najpierw weryfikuje, czy konto nadawcy jest częścią istniejącego korzenia stanu, używając dostarczonego dowodu Merkle'a. Następnie zmniejsza saldo nadawcy, zwiększa jego nonce, haszuje zaktualizowane dane konta i łączy je z dowodem Merkle'a w celu wygenerowania nowego korzenia drzewa Merklego.

Ten korzeń drzewa Merklego odzwierciedla jedyną zmianę w stanie ZK-rollupa: zmianę salda i nonce nadawcy. Jest to możliwe, ponieważ dowód Merkle'a użyty do udowodnienia istnienia konta jest używany do wyprowadzenia nowego korzenia stanu.

Obwód dowodzący wykonuje ten sam proces na koncie odbiorcy. Sprawdza, czy konto odbiorcy istnieje pod pośrednim korzeniem stanu (używając dowodu Merkle'a), zwiększa jego saldo, ponownie haszuje dane konta i łączy je z dowodem Merkle'a w celu wygenerowania nowego korzenia stanu.

Proces powtarza się dla każdej transakcji; każda „pętla” tworzy nowy korzeń stanu z aktualizacji konta nadawcy i kolejny nowy korzeń z aktualizacji konta odbiorcy. Jak wyjaśniono, każda aktualizacja korzenia stanu reprezentuje zmianę jednej części drzewa stanu rollupa.

Obwód dowodzący z wiedzą zerową iteruje po całym wsadzie transakcji, weryfikując sekwencję aktualizacji, które skutkują końcowym korzeniem stanu po wykonaniu ostatniej transakcji. Ostatni obliczony korzeń drzewa Merklego staje się najnowszym kanonicznym korzeniem stanu ZK-rollupa.

##### Weryfikacja dowodów
Po tym, jak obwód dowodzący zweryfikuje poprawność aktualizacji stanu, operator L2 przesyła obliczony dowód ważności do kontraktu weryfikatora w L1. Obwód weryfikacyjny kontraktu weryfikuje ważność dowodu, a także sprawdza publiczne dane wejściowe, które stanowią część dowodu:

- **Korzeń stanu początkowego (Pre-state root)**: Stary korzeń stanu ZK-rollupa (tj. przed wykonaniem wsadowanych transakcji), odzwierciedlający ostatni znany ważny stan łańcucha L2.

- **Korzeń stanu końcowego (Post-state root)**: Nowy korzeń stanu ZK-rollupa (tj. po wykonaniu wsadowanych transakcji), odzwierciedlający najnowszy stan łańcucha L2. Korzeń stanu końcowego to ostateczny korzeń wyprowadzony po zastosowaniu aktualizacji stanu w obwodzie dowodzącym.

- **Korzeń wsadu**: Korzeń drzewa Merklego wsadu, wyprowadzony poprzez _merklizację_ transakcji we wsadzie i haszowanie korzenia drzewa.

- **Dane wejściowe transakcji**: Dane powiązane z transakcjami wykonanymi w ramach przesłanego wsadu.

Jeśli dowód zadowala obwód (tj. jest ważny), oznacza to, że istnieje sekwencja ważnych transakcji, które przenoszą rollup z poprzedniego stanu (kryptograficznie oznaczonego przez korzeń stanu początkowego) do nowego stanu (kryptograficznie oznaczonego przez korzeń stanu końcowego). Jeśli korzeń stanu początkowego pasuje do korzenia przechowywanego w kontrakcie rollupa, a dowód jest ważny, kontrakt rollupa pobiera korzeń stanu końcowego z dowodu i aktualizuje swoje drzewo stanu, aby odzwierciedlić zmieniony stan rollupa.

### Wejścia i wyjścia {#entries-and-exits}

Użytkownicy wchodzą do ZK-rollupa, deponując tokeny w kontrakcie rollupa wdrożonym w łańcuchu L1. Ta transakcja jest kolejkowana, ponieważ tylko operatorzy mogą przesyłać transakcje do kontraktu rollupa.

Jeśli kolejka oczekujących depozytów zacznie się zapełniać, operator ZK-rollupa pobierze transakcje depozytowe i prześle je do kontraktu rollupa. Gdy środki użytkownika znajdą się w rollupie, może on rozpocząć transakcje, wysyłając je do operatora w celu przetworzenia. Użytkownicy mogą weryfikować salda w rollupie, haszując dane swojego konta, wysyłając hash do kontraktu rollupa i dostarczając dowód Merkle'a do weryfikacji z bieżącym korzeniem stanu.

Wypłata z ZK-rollupa do L1 jest prosta. Użytkownik inicjuje transakcję wyjścia, wysyłając swoje aktywa w rollupie na określone konto, aby je spalić. Jeśli operator uwzględni transakcję w następnym wsadzie, użytkownik może przesłać żądanie wypłaty do kontraktu onchain. To żądanie wypłaty będzie obejmować następujące elementy:

- Dowód Merkle'a udowadniający włączenie transakcji użytkownika na konto spalania we wsadzie transakcji

- Dane transakcji

- Korzeń wsadu

- Adres L1 do odbioru zdeponowanych środków

Kontrakt rollupa haszuje dane transakcji, sprawdza, czy korzeń wsadu istnieje, i używa dowodu Merkle'a, aby sprawdzić, czy hash transakcji jest częścią korzenia wsadu. Następnie kontrakt wykonuje transakcję wyjścia i wysyła środki na wybrany przez użytkownika adres w L1.

## ZK-rollupy a kompatybilność z EVM {#zk-rollups-and-evm-compatibility}

W przeciwieństwie do optymistycznych rollupów, ZK-rollupy nie są łatwo kompatybilne z [Maszyną Wirtualną Ethereum (EVM)](/developers/docs/evm/). Dowodzenie obliczeń EVM ogólnego przeznaczenia w obwodach jest trudniejsze i bardziej zasobochłonne niż dowodzenie prostych obliczeń (takich jak opisany wcześniej transfer tokenów).

Jednak [postępy w technologii wiedzy zerowej](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) rozbudzają ponowne zainteresowanie opakowywaniem obliczeń EVM w dowody z wiedzą zerową. Wysiłki te mają na celu stworzenie implementacji zkEVM, która może skutecznie weryfikować poprawność wykonania programu. zkEVM odtwarza istniejące kody operacyjne (opcodes) EVM do dowodzenia/weryfikacji w obwodach, umożliwiając wykonywanie inteligentnych kontraktów.

Podobnie jak EVM, zkEVM przechodzi między stanami po wykonaniu obliczeń na pewnych danych wejściowych. Różnica polega na tym, że zkEVM tworzy również dowody z wiedzą zerową w celu weryfikacji poprawności każdego kroku w wykonaniu programu. Dowody ważności mogłyby weryfikować poprawność operacji, które dotykają stanu maszyny wirtualnej (pamięci, stosu, pamięci masowej) oraz samych obliczeń (tj. czy operacja wywołała właściwe kody operacyjne i wykonała je poprawnie?).

Oczekuje się, że wprowadzenie ZK-rollupów kompatybilnych z EVM pomoże deweloperom wykorzystać gwarancje skalowalności i bezpieczeństwa dowodów z wiedzą zerową. Co ważniejsze, kompatybilność z natywną infrastrukturą Ethereum oznacza, że deweloperzy mogą budować zdecentralizowane aplikacje (dapp) przyjazne dla ZK, używając znanych (i sprawdzonych w boju) narzędzi i języków.

## Jak działają opłaty w ZK-rollupach? {#how-do-zk-rollup-fees-work}

To, ile użytkownicy płacą za transakcje w ZK-rollupach, zależy od opłaty za gaz, podobnie jak w sieci głównej Ethereum. Jednak opłaty za gaz działają inaczej w L2 i zależą od następujących kosztów:

1. **Zapis stanu**: Istnieje stały koszt zapisu do stanu Ethereum (tj. przesłania transakcji na blockchainie Ethereum). ZK-rollupy zmniejszają ten koszt poprzez wsadowanie transakcji i rozkładanie stałych kosztów na wielu użytkowników.

2. **Publikacja danych**: ZK-rollupy publikują w Ethereum dane stanu dla każdej transakcji jako `calldata`. Koszty `calldata` są obecnie regulowane przez [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), który określa koszt 16 jednostek gazu za niezerowe bajty i 4 jednostek gazu za zerowe bajty `calldata`. Koszt płacony za każdą transakcję zależy od tego, ile `calldata` musi zostać opublikowane onchain dla tej transakcji.

3. **Opłaty operatora L2**: Jest to kwota płacona operatorowi rollupa jako rekompensata za koszty obliczeniowe poniesione podczas przetwarzania transakcji, podobnie jak [„opłaty priorytetowe (napiwki)” za transakcje](/developers/docs/gas/#how-are-gas-fees-calculated) w sieci głównej Ethereum.

4. **Generowanie i weryfikacja dowodów**: Operatorzy ZK-rollupów muszą generować dowody ważności dla wsadów transakcji, co jest zasobochłonne. Weryfikacja dowodów z wiedzą zerową w sieci głównej również kosztuje gaz (~ 500 000 jednostek gazu).

Oprócz wsadowania transakcji, ZK-rollupy obniżają opłaty dla użytkowników poprzez kompresję danych transakcyjnych. Możesz [zobaczyć przegląd w czasie rzeczywistym](https://l2fees.info/) kosztów korzystania z ZK-rollupów Ethereum.

## Jak ZK-rollupy skalują Ethereum? {#scaling-ethereum-with-zk-rollups}

### Kompresja danych transakcyjnych {#transaction-data-compression}

ZK-rollupy zwiększają przepustowość w warstwie bazowej Ethereum poprzez przeniesienie obliczeń do środowiska pozałańcuchowego, ale prawdziwy impuls do skalowania pochodzi z kompresji danych transakcyjnych. [Rozmiar bloku](/developers/docs/blocks/#block-size) Ethereum ogranicza ilość danych, które może pomieścić każdy blok, a co za tym idzie, liczbę transakcji przetwarzanych w bloku. Kompresując dane związane z transakcjami, ZK-rollupy znacznie zwiększają liczbę transakcji przetwarzanych w bloku.

ZK-rollupy mogą kompresować dane transakcyjne lepiej niż optymistyczne rollupy, ponieważ nie muszą publikować wszystkich danych wymaganych do walidacji każdej transakcji. Muszą jedynie opublikować minimalne dane wymagane do odbudowania najnowszego stanu kont i sald w rollupie.

### Dowody rekurencyjne {#recursive-proofs}

Zaletą dowodów z wiedzą zerową jest to, że dowody mogą weryfikować inne dowody. Na przykład pojedynczy ZK-SNARK może weryfikować inne ZK-SNARKi. Takie „dowody dowodów” nazywane są dowodami rekurencyjnymi i drastycznie zwiększają przepustowość w ZK-rollupach.

Obecnie dowody ważności są generowane blok po bloku i przesyłane do kontraktu L1 w celu weryfikacji. Jednak weryfikacja dowodów pojedynczych bloków ogranicza przepustowość, jaką mogą osiągnąć ZK-rollupy, ponieważ tylko jeden blok może zostać sfinalizowany, gdy operator prześle dowód.

Dowody rekurencyjne umożliwiają jednak sfinalizowanie kilku bloków za pomocą jednego dowodu ważności. Dzieje się tak, ponieważ obwód dowodzący rekurencyjnie agreguje wiele dowodów bloków, aż do utworzenia jednego końcowego dowodu. Operator L2 przesyła ten dowód rekurencyjny, a jeśli kontrakt go zaakceptuje, wszystkie odpowiednie bloki zostaną natychmiast sfinalizowane. Dzięki dowodom rekurencyjnym wzrasta liczba transakcji ZK-rollupa, które mogą być finalizowane w Ethereum w określonych odstępach czasu.

### Plusy i minusy ZK-rollupów {#zk-rollups-pros-and-cons}

| Plusy                                                                                                                                                                                                   | Minusy                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dowody ważności zapewniają poprawność pozałańcuchowych transakcji i zapobiegają wykonywaniu przez operatorów nieprawidłowych przejść stanu.                                                                           | Koszt związany z obliczaniem i weryfikacją dowodów ważności jest znaczny i może zwiększyć opłaty dla użytkowników rollupa.                                                                            |
| Oferuje szybszą ostateczność transakcji, ponieważ aktualizacje stanu są zatwierdzane po zweryfikowaniu dowodów ważności w L1.                                                                                              | Budowa ZK-rollupów kompatybilnych z EVM jest trudna ze względu na złożoność technologii wiedzy zerowej.                                                                                                    |
| Opiera się na niewymagających zaufania mechanizmach kryptograficznych w celu zapewnienia bezpieczeństwa, a nie na uczciwości motywowanych aktorów, jak w przypadku [optymistycznych rollupów](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Generowanie dowodów ważności wymaga specjalistycznego sprzętu, co może zachęcać do scentralizowanej kontroli łańcucha przez kilka stron.                                                                    |
| Przechowuje dane potrzebne do odzyskania stanu pozałańcuchowego w L1, co gwarantuje bezpieczeństwo, odporność na cenzurę i decentralizację.                                                                       | Scentralizowani operatorzy (sekwensery) mogą wpływać na kolejność transakcji.                                                                                                                     |
| Użytkownicy korzystają z większej efektywności kapitałowej i mogą wypłacać środki z L2 bez opóźnień.                                                                                                           | Wymagania sprzętowe mogą zmniejszyć liczbę uczestników, którzy mogą wymusić postęp łańcucha, zwiększając ryzyko zamrożenia stanu rollupa i cenzurowania użytkowników przez złośliwych operatorów. |
| Nie zależy od założeń dotyczących żywotności, a użytkownicy nie muszą weryfikować łańcucha, aby chronić swoje środki.                                                                                              | Niektóre systemy dowodzenia (np. ZK-SNARK) wymagają zaufanej konfiguracji, która w przypadku niewłaściwego postępowania może potencjalnie zagrozić modelowi bezpieczeństwa ZK-rollupa.                                                     |
| Lepsza kompresja danych może pomóc obniżyć koszty publikowania `calldata` w Ethereum i zminimalizować opłaty za rollup dla użytkowników.                                                                             |                                                                                                                                                                                                    |

### Wizualne wyjaśnienie ZK-rollupów {#zk-video}

Obejrzyj, jak Finematics wyjaśnia ZK-rollupy:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Kto pracuje nad zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM dla L2 a L1</AlertTitle>
<AlertDescription>
Poniższe projekty wykorzystują technologię zkEVM do budowy rollupów warstwy 2 (L2). Prowadzone są również badania nad wykorzystaniem zkEVM do [weryfikacji bloków L1](/roadmap/zkevm/), co umożliwiłoby walidatorom weryfikację bloków Ethereum bez ponownego wykonywania transakcji.
</AlertDescription>
</AlertContent>
</Alert>

Projekty pracujące nad zkEVM obejmują:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM to projekt finansowany przez Fundację Ethereum w celu opracowania ZK-rollupa kompatybilnego z EVM oraz mechanizmu generowania dowodów ważności dla bloków Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _to zdecentralizowany ZK-rollup w sieci głównej Ethereum pracujący nad Maszyną Wirtualną Ethereum z wiedzą zerową (zkEVM), która wykonuje transakcje Ethereum w przejrzysty sposób, w tym inteligentne kontrakty z walidacją dowodów z wiedzą zerową._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll to firma technologiczna pracująca nad budową natywnego rozwiązania warstwy 2 (L2) zkEVM dla Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko to zdecentralizowany, równoważny z Ethereum ZK-rollup ([ZK-EVM typu 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era to kompatybilny z EVM ZK-rollup zbudowany przez Matter Labs, zasilany przez własny zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet to kompatybilne z EVM rozwiązanie skalujące warstwy 2 (L2) zbudowane przez StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph to hybrydowe rozwiązanie skalujące typu rollup, które wykorzystuje dowód z wiedzą zerową (zk-proof) do rozwiązania problemu wyzwań stanu warstwy 2 (L2)._

- **[Linea](https://linea.build)** - _Linea to równoważna z Ethereum warstwa 2 (L2) zkEVM zbudowana przez ConsenSys, w pełni zgodna z ekosystemem Ethereum._

## Dalsza lektura na temat ZK-rollupów {#further-reading-on-zk-rollups}

- [Czym są rollupy z wiedzą zerową?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Czym są rollupy z wiedzą zerową?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK a SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Czym jest zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Typy ZK-EVM: równoważne z Ethereum, równoważne z EVM, Typ 1, Typ 4 i inne tajemnicze hasła](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Wprowadzenie do zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Czym są L2 oparte na ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Zasoby Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARK od podszewki](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Jak możliwe są SNARKi?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Samouczki: Prywatność i wiedza zerowa w Ethereum {#tutorials}

- [Wykorzystanie wiedzy zerowej do tajnego stanu](/developers/tutorials/secret-state/) _– Jak używać dowodów ZK i pozałańcuchowych komponentów serwera do utrzymywania tajnego stanu gry onchain._
- [Korzystanie z ukrytych adresów (stealth addresses)](/developers/tutorials/stealth-addr/) _– Jak ukryte adresy ERC-5564 umożliwiają anonimowe transfery ETH przy użyciu kryptograficznego wyprowadzania kluczy._
- [Wykorzystanie Ethereum do uwierzytelniania Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Jak zintegrować podpisy portfela Ethereum z systemami uwierzytelniania Web2 opartymi na SAML._