---
title: Pakiety zbiorcze o wiedzy zerowej
description: "Wprowadzenie do pakietów zbiorczych o zerowej wiedzy — rozwiązania skalującego używanego przez społeczność Ethereum."
lang: pl
---

Pakiety zbiorcze o zerowej wiedzy (ZK-rollups) to [rozwiązania skalujące](/developers/docs/scaling/) warstwy 2, które zwiększają przepustowość w sieci głównej Ethereum poprzez przeniesienie obliczeń i przechowywania stanu poza łańcuch. ZK-rollupy mogą przetwarzać tysiące transakcji w jednej partii, a następnie publikować w sieci głównej tylko minimalne dane podsumowujące. Te dane podsumowujące definiują zmiany, które powinny zostać wprowadzone do stanu Ethereum, oraz zawierają kryptograficzny dowód na to, że zmiany te są prawidłowe.

## Wymagania wstępne {#prerequisites}

Należy przeczytać i zrozumieć naszą stronę na temat [skalowania Ethereum](/developers/docs/scaling/) i [warstwy 2](/layer-2).

## Czym są pakiety zbiorcze o zerowej wiedzy? {#what-are-zk-rollups}

**Pakiety zbiorcze o zerowej wiedzy (ZK-rollups)** grupują (lub „zwijają”) transakcje w partie, które są wykonywane poza łańcuchem. Obliczenia poza łańcuchem zmniejszają ilość danych, które muszą być opublikowane w blockchainie. Operatorzy ZK-rollup przesyłają podsumowanie zmian wymaganych do odzwierciedlenia wszystkich transakcji w partii, zamiast wysyłać każdą transakcję indywidualnie. Produkują oni również [dowody ważności](/glossary/#validity-proof), aby udowodnić poprawność swoich zmian.

Stan ZK-rollup jest utrzymywany przez inteligentny kontrakt wdrożony w sieci Ethereum. Aby zaktualizować ten stan, węzły ZK-rollup muszą przesłać dowód ważności do weryfikacji. Jak już wspomniano, dowód ważności jest kryptograficznym zapewnieniem, że zmiana stanu proponowana przez rollup jest rzeczywiście wynikiem wykonania danej partii transakcji. Oznacza to, że ZK-rollupy muszą jedynie dostarczyć dowody ważności, aby sfinalizować transakcje na Ethereum, zamiast publikować wszystkie dane transakcyjne w łańcuchu, jak [rollupy optymistyczne](/developers/docs/scaling/optimistic-rollups/).

Nie ma opóźnień przy przenoszeniu środków z ZK-rollup do Ethereum, ponieważ transakcje wyjścia są wykonywane, gdy tylko kontrakt ZK-rollup zweryfikuje dowód ważności. I odwrotnie, wypłacanie środków z rollupów optymistycznych podlega opóźnieniu, aby umożliwić każdemu zakwestionowanie transakcji wyjścia za pomocą [dowodu oszustwa](/glossary/#fraud-proof).

ZK-rollupy zapisują transakcje w Ethereum jako `calldata`. `calldata` to miejsce, w którym przechowywane są dane zawarte w zewnętrznych wywołaniach funkcji inteligentnych kontraktów. Informacje w `calldata` są publikowane w blockchainie, co pozwala każdemu na niezależne odtworzenie stanu rollupu. ZK-rollupy używają technik kompresji w celu zmniejszenia danych transakcyjnych — na przykład konta są reprezentowane przez indeks, a nie przez adres, co pozwala zaoszczędzić 28 bajtów danych. Publikacja danych w łańcuchu jest znaczącym kosztem dla rollupów, więc kompresja danych może zmniejszyć opłaty dla użytkowników.

## Jak ZK-rollupy wchodzą w interakcję z Ethereum? {#zk-rollups-and-ethereum}

Łańcuch ZK-rollup to protokół poznałańcuchowy, który działa na blockchainie Ethereum i jest zarządzany przez inteligentne kontrakty Ethereum w łańcuchu. ZK-rollupy wykonują transakcje poza siecią główną, ale okresowo zatwierdzają partie transakcji pozałańcuchowych do kontraktu rollupu w łańcuchu. Ten zapis transakcji jest niezmienny, podobnie jak blockchain Ethereum, i tworzy łańcuch ZK-rollup.

Podstawowa architektura ZK-rollup składa się z następujących komponentów:

1. **Kontrakty w łańcuchu**: Jak już wspomniano, protokół ZK-rollup jest kontrolowany przez inteligentne kontrakty działające na Ethereum. Obejmuje to główny kontrakt, który przechowuje bloki rollupu, śledzi depozyty i monitoruje aktualizacje stanu. Inny kontrakt w łańcuchu (kontrakt weryfikujący) weryfikuje dowody o zerowej wiedzy przesłane przez producentów bloków. W ten sposób Ethereum służy jako warstwa bazowa lub „warstwa 1” dla ZK-rollup.

2. **Wirtualna maszyna (VM) poza łańcuchem**: Chociaż protokół ZK-rollup działa na Ethereum, wykonywanie transakcji i przechowywanie stanu odbywają się na oddzielnej maszynie wirtualnej, niezależnej od [EVM](/developers/docs/evm/). Ta VM poza łańcuchem jest środowiskiem wykonawczym dla transakcji w ZK-rollup i służy jako warstwa wtórna lub „warstwa 2” dla protokołu ZK-rollup. Dowody ważności zweryfikowane w sieci głównej Ethereum gwarantują poprawność przejść stanów w VM poza łańcuchem.

ZK-rollupy to „hybrydowe rozwiązania skalujące” – protokoły pozałańcuchowe, które działają niezależnie, ale czerpią bezpieczeństwo z Ethereum. W szczególności sieć Ethereum egzekwuje ważność aktualizacji stanu w ZK-rollup i gwarantuje dostępność danych stojących za każdą aktualizacją stanu rollupu. W rezultacie ZK-rollupy są znacznie bezpieczniejsze niż czysto pozałańcuchowe rozwiązania skalujące, takie jak [łańcuchy poboczne](/developers/docs/scaling/sidechains/), które są odpowiedzialne za swoje właściwości bezpieczeństwa, lub [validia](/developers/docs/scaling/validium/), które również weryfikują transakcje na Ethereum za pomocą dowodów ważności, ale przechowują dane transakcji w innym miejscu.

ZK-rollupy opierają się na głównym protokole Ethereum w następujących kwestiach:

### Dostępność danych {#data-availability}

ZK-rollupy publikują dane stanu dla każdej transakcji przetworzonej poza łańcuchem w Ethereum. Dzięki tym danym osoby fizyczne lub firmy mogą odtworzyć stan rollupu i samodzielnie zwalidować łańcuch. Ethereum udostępnia te dane wszystkim uczestnikom sieci jako `calldata`.

ZK-rollupy nie muszą publikować wielu danych transakcyjnych w łańcuchu, ponieważ dowody ważności już weryfikują autentyczność przejść stanów. Niemniej jednak przechowywanie danych w łańcuchu jest nadal ważne, ponieważ pozwala na niewymagającą uprawnień, niezależną weryfikację stanu łańcucha L2, co z kolei pozwala każdemu na przesyłanie partii transakcji, uniemożliwiając złośliwym operatorom cenzurowanie lub zamrażanie łańcucha.

Dane w łańcuchu są wymagane, aby użytkownicy mogli wejść w interakcję z rollupem. Bez dostępu do danych o stanie użytkownicy nie mogą sprawdzić salda swojego konta ani inicjować transakcji (np. wypłat), które opierają się na informacjach o stanie.

### Nieodwołalność transakcji {#transaction-finality}

Ethereum działa jako warstwa rozliczeniowa dla ZK-rollupów: transakcje L2 są finalizowane tylko wtedy, gdy kontrakt L1 zaakceptuje dowód ważności. Eliminuje to ryzyko uszkodzenia łańcucha przez złośliwych operatorów (np. kradzieży środków z rollupu), ponieważ każda transakcja musi zostać zatwierdzona w sieci głównej. Ponadto Ethereum gwarantuje, że operacje użytkowników nie mogą być cofnięte po sfinalizowaniu na L1.

### Odporność na cenzurę {#censorship-resistance}

Większość ZK-rollupów używa „superwęzła” (operatora) do wykonywania transakcji, produkowania partii i przesyłania bloków do L1. Chociaż zapewnia to wydajność, zwiększa ryzyko cenzury: złośliwi operatorzy ZK-rollup mogą cenzurować użytkowników, odmawiając włączenia ich transakcji do partii.

Jako środek bezpieczeństwa ZK-rollupy pozwalają użytkownikom przesyłać transakcje bezpośrednio do kontraktu rollupu w sieci głównej, jeśli uważają, że są cenzurowani przez operatora. Pozwala to użytkownikom wymusić wyjście z ZK-rollup do Ethereum bez konieczności polegania na zgodzie operatora.

## Jak działają ZK-rollupy? {#how-do-zk-rollups-work}

### Transakcje {#transactions}

Użytkownicy w ZK-rollup podpisują transakcje i przesyłają je do operatorów L2 w celu przetworzenia i włączenia do następnej partii. W niektórych przypadkach operatorem jest scentralizowany podmiot, zwany sekwencerem, który wykonuje transakcje, agreguje je w partie i przesyła do L1. Sekwencer w tym systemie jest jedynym podmiotem uprawnionym do tworzenia bloków L2 i dodawania transakcji rollup do kontraktu ZK-rollup.

Inne ZK-rollupy mogą rotować rolę operatora przy użyciu zestawu walidatorów [dowodu stawki](/developers/docs/consensus-mechanisms/pos/). Potencjalni operatorzy wpłacają środki w kontrakcie rollupu, a wielkość każdej stawki wpływa na szanse stakera na wybór do wyprodukowania następnej partii rollupu. Stawka operatora może zostać obcięta, jeśli działa on w sposób złośliwy, co motywuje go do publikowania ważnych bloków.

#### Jak ZK-rollupy publikują dane transakcyjne na Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Jak wyjaśniono, dane transakcji są publikowane na Ethereum jako `calldata`. `calldata` to obszar danych w inteligentnym kontrakcie używany do przekazywania argumentów do funkcji i zachowuje się podobnie do [pamięci](/developers/docs/smart-contracts/anatomy/#memory). Chociaż `calldata` nie jest przechowywana jako część stanu Ethereum, utrzymuje się ona w łańcuchu jako część [dzienników historii](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) łańcucha Ethereum. `calldata` nie wpływa na stan Ethereum, co czyni go tanim sposobem przechowywania danych w łańcuchu.

Słowo kluczowe `calldata` często identyfikuje metodę inteligentnego kontraktu wywoływaną przez transakcję i przechowuje dane wejściowe do metody w postaci dowolnej sekwencji bajtów. ZK-rollupy używają `calldata` do publikowania skompresowanych danych transakcyjnych w łańcuchu; operator rollupu po prostu dodaje nową partię, wywołując wymaganą funkcję w kontrakcie rollupu i przekazuje skompresowane dane jako argumenty funkcji. Pomaga to obniżyć koszty dla użytkowników, ponieważ duża część opłat za rollup jest przeznaczona na przechowywanie danych transakcyjnych w łańcuchu.

### Zobowiązania dotyczące stanu {#state-commitments}

Stan ZK-rollup, który obejmuje konta L2 i salda, jest reprezentowany jako [drzewo Merkle'a](/whitepaper/#merkle-trees). Kryptograficzny hasz korzenia drzewa Merkle'a (korzeń Merkle'a) jest przechowywany w kontrakcie w łańcuchu, co pozwala protokołowi rollupu śledzić zmiany w stanie ZK-rollup.

Rollup przechodzi do nowego stanu po wykonaniu nowego zestawu transakcji. Operator, który zainicjował przejście stanu, jest zobowiązany do obliczenia nowego korzenia stanu i przesłania go do kontraktu w łańcuchu. Jeśli dowód ważności powiązany z partią zostanie uwierzytelniony przez kontrakt weryfikujący, nowy korzeń Merkle'a staje się kanonicznym korzeniem stanu ZK-rollup.

Oprócz obliczania korzeni stanu operator ZK-rollup tworzy również korzeń partii — korzeń drzewa Merkle'a zawierającego wszystkie transakcje w partii. Gdy nowa partia jest przesyłana, kontrakt rollupu przechowuje korzeń partii, co pozwala użytkownikom udowodnić, że transakcja (np. żądanie wypłaty) została uwzględniona w partii. Użytkownicy będą musieli podać szczegóły transakcji, korzeń partii i [dowód Merkle'a](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) pokazujący ścieżkę włączenia.

### Dowody ważności {#validity-proofs}

Nowy korzeń stanu, który operator ZK-rollup przesyła do kontraktu L1, jest wynikiem aktualizacji stanu rollupu. Powiedzmy, że Alicja wysyła 10 tokenów do Boba, operator po prostu zmniejsza saldo Alicji o 10 i zwiększa saldo Boba o 10. Operator następnie haszuje zaktualizowane dane konta, odbudowuje drzewo Merkle'a rollupu i przesyła nowy korzeń Merkle'a do kontraktu w łańcuchu.

Ale kontrakt rollupu nie zaakceptuje automatycznie proponowanego zobowiązania stanu, dopóki operator nie udowodni, że nowy korzeń Merkle'a powstał w wyniku poprawnych aktualizacji stanu rollupu. Operator ZK-rollup robi to, tworząc dowód ważności, zwięzłe zobowiązanie kryptograficzne weryfikujące poprawność transakcji wsadowych.

Dowody ważności pozwalają stronom udowodnić poprawność oświadczenia bez ujawniania samego oświadczenia — stąd też nazywane są dowodami o zerowej wiedzy. ZK-rollupy używają dowodów ważności do potwierdzenia poprawności przejść stanu poza łańcuchem bez konieczności ponownego wykonywania transakcji na Ethereum. Dowody te mogą mieć postać [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zwięzły Nieinteraktywny Argument Wiedzy o Zerowej Wiedzy) lub [ZK-STARK](https://eprint.iacr.org/2018/046) (Skalowalny Transparentny Argument Wiedzy o Zerowej Wiedzy).

Zarówno SNARK-i, jak i STARK-i pomagają poświadczyć integralność obliczeń poza łańcuchem w ZK-rollupach, chociaż każdy typ dowodu ma charakterystyczne cechy.

**ZK-SNARK-i**

Aby protokół ZK-SNARK działał, konieczne jest utworzenie wspólnego ciągu referencyjnego (CRS): CRS dostarcza publicznych parametrów do udowadniania i weryfikowania dowodów ważności. Bezpieczeństwo systemu dowodzenia zależy od konfiguracji CRS; jeśli informacje użyte do utworzenia parametrów publicznych wpadną w posiadanie złośliwych aktorów, mogą oni być w stanie generować fałszywe dowody ważności.

Niektóre ZK-rollupy próbują rozwiązać ten problem za pomocą [ceremonii obliczeń wielostronnych (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), z udziałem zaufanych osób, do generowania parametrów publicznych dla obwodu ZK-SNARK. Każda strona wnosi pewną losowość (nazywaną „toksycznym odpadem”) do konstrukcji CRS, którą musi natychmiast zniszczyć.

Zaufane konfiguracje są używane, ponieważ zwiększają bezpieczeństwo konfiguracji CRS. Dopóki jeden uczciwy uczestnik zniszczy swoje dane wejściowe, bezpieczeństwo systemu ZK-SNARK jest zagwarantowane. Mimo to podejście to wymaga zaufania do zaangażowanych osób, że usuną swoją próbkowaną losowość i nie podważą gwarancji bezpieczeństwa systemu.

Pomijając założenia o zaufaniu, ZK-SNARK-i są popularne ze względu na małe rozmiary dowodów i weryfikację w stałym czasie. Ponieważ weryfikacja dowodu na L1 stanowi większy koszt działania ZK-rollup, L2 używają ZK-SNARK-ów do generowania dowodów, które można szybko i tanio zweryfikować w sieci głównej.

**ZK-STARK-i**

Podobnie jak ZK-SNARK-i, ZK-STARK-i udowadniają ważność obliczeń poza łańcuchem bez ujawniania danych wejściowych. Jednak ZK-STARK-i są uważane za ulepszenie ZK-SNARK-ów ze względu na ich skalowalność i przejrzystość.

ZK-STARK-i są „przejrzyste”, ponieważ mogą działać bez zaufanej konfiguracji wspólnego ciągu referencyjnego (CRS). Zamiast tego ZK-STARK-i opierają się na publicznie weryfikowalnej losowości, aby skonfigurować parametry do generowania i weryfikacji dowodów.

ZK-STARK-i zapewniają również większą skalowalność, ponieważ czas potrzebny do udowodnienia i zweryfikowania dowodów ważności rośnie _quasi-liniowo_ w stosunku do złożoności podstawowych obliczeń. W przypadku ZK-SNARK-ów czas udowadniania i weryfikacji skaluje się _liniowo_ w stosunku do wielkości podstawowych obliczeń. Oznacza to, że ZK-STARK-i wymagają mniej czasu niż ZK-SNARK-i do udowodnienia i weryfikacji, gdy zaangażowane są duże zbiory danych, co czyni je przydatnymi w zastosowaniach o dużej objętości.

ZK-STARK-i są również bezpieczne przed komputerami kwantowymi, podczas gdy kryptografia krzywych eliptycznych (ECC) używana w ZK-SNARK-ach jest powszechnie uważana za podatną na ataki z użyciem komputerów kwantowych. Wadą ZK-STARK-ów jest to, że produkują one większe rozmiary dowodów, które są droższe do zweryfikowania na Ethereum.

#### Jak działają dowody ważności w ZK-rollupach? {#validity-proofs-in-zk-rollups}

##### Generowanie dowodu

Przed zaakceptowaniem transakcji operator wykona zwykłe kontrole. Obejmuje to potwierdzenie, że:

- Konta nadawcy i odbiorcy są częścią drzewa stanu.
- Nadawca ma wystarczającą ilość środków, aby przetworzyć transakcję.
- Transakcja jest poprawna i pasuje do klucza publicznego nadawcy w rollupie.
- Nonce nadawcy jest poprawny itd.

Gdy węzeł ZK-rollup ma wystarczającą liczbę transakcji, agreguje je w partię i kompiluje dane wejściowe dla obwodu dowodzącego, aby skompilować je w zwięzły dowód ZK. Obejmuje to:

- Korzeń drzewa Merkle'a obejmujący wszystkie transakcje w partii.
- Dowody Merkle'a dla transakcji w celu udowodnienia ich włączenia do partii.
- Dowody Merkle'a dla każdej pary nadawca-odbiorca w transakcjach, aby udowodnić, że te konta są częścią drzewa stanu rollupu.
- Zestaw pośrednich korzeni stanu, pochodzący z aktualizacji korzenia stanu po zastosowaniu aktualizacji stanu dla każdej transakcji (tj. zmniejszenie kont nadawców i zwiększenie kont odbiorców).

Obwód dowodzący oblicza dowód ważności, „zapętlając” się nad każdą transakcją i wykonując te same kontrole, które operator zakończył przed przetworzeniem transakcji. Najpierw weryfikuje, czy konto nadawcy jest częścią istniejącego korzenia stanu za pomocą dostarczonego dowodu Merkle'a. Następnie zmniejsza saldo nadawcy, zwiększa jego nonce, haszuje zaktualizowane dane konta i łączy je z dowodem Merkle'a, aby wygenerować nowy korzeń Merkle'a.

Ten korzeń Merkle'a odzwierciedla jedyną zmianę w stanie ZK-rollup: zmianę salda i nonce nadawcy. Jest to możliwe, ponieważ dowód Merkle'a użyty do udowodnienia istnienia konta jest używany do wyprowadzenia nowego korzenia stanu.

Obwód dowodzący wykonuje ten sam proces na koncie odbiorcy. Sprawdza, czy konto odbiorcy istnieje w pośrednim korzeniu stanu (używając dowodu Merkle'a), zwiększa jego saldo, ponownie haszuje dane konta i łączy je z dowodem Merkle'a, aby wygenerować nowy korzeń stanu.

Proces powtarza się dla każdej transakcji; każda „pętla” tworzy nowy korzeń stanu z aktualizacji konta nadawcy i kolejny nowy korzeń z aktualizacji konta odbiorcy. Jak wyjaśniono, każda aktualizacja korzenia stanu reprezentuje zmianę jednej części drzewa stanu rollupu.

Obwód dowodzący ZK iteruje po całej partii transakcji, weryfikując sekwencję aktualizacji, które skutkują ostatecznym korzeniem stanu po wykonaniu ostatniej transakcji. Ostatni obliczony korzeń Merkle'a staje się najnowszym kanonicznym korzeniem stanu ZK-rollup.

##### Weryfikacja dowodu

Po zweryfikowaniu przez obwód dowodzący poprawności aktualizacji stanu operator L2 przesyła obliczony dowód ważności do kontraktu weryfikującego na L1. Obwód weryfikacyjny kontraktu weryfikuje ważność dowodu, a także sprawdza publiczne dane wejściowe, które stanowią część dowodu:

- **Korzeń stanu przed**: stary korzeń stanu ZK-rollup (tj. przed wykonaniem transakcji wsadowych), odzwierciedlający ostatni znany ważny stan łańcucha L2.

- **Korzeń stanu po**: nowy korzeń stanu ZK-rollup (tj. po wykonaniu transakcji wsadowych), odzwierciedlający najnowszy stan łańcucha L2. Korzeń stanu po jest ostatecznym korzeniem uzyskanym po zastosowaniu aktualizacji stanu w obwodzie dowodzącym.

- **Korzeń partii**: Korzeń Merkle'a partii, uzyskany przez _merklizację_ transakcji w partii i haszowanie korzenia drzewa.

- **Dane wejściowe transakcji**: Dane powiązane z transakcjami wykonanymi w ramach przesłanej partii.

Jeśli dowód spełnia wymagania obwodu (tj. jest ważny), oznacza to, że istnieje sekwencja ważnych transakcji, które przenoszą rollup z poprzedniego stanu (kryptograficznie oznaczony odciskiem palca przez korzeń stanu przed) do nowego stanu (kryptograficznie oznaczony odciskiem palca przez korzeń stanu po). Jeśli korzeń stanu przed pasuje do korzenia przechowywanego w kontrakcie rollupu, a dowód jest ważny, kontrakt rollupu pobiera korzeń stanu po z dowodu i aktualizuje swoje drzewo stanu, aby odzwierciedlić zmieniony stan rollupu.

### Wejścia i wyjścia {#entries-and-exits}

Użytkownicy wchodzą do ZK-rollup, wpłacając tokeny do kontraktu rollupu wdrożonego w łańcuchu L1. Ta transakcja jest kolejkowana, ponieważ tylko operatorzy mogą przesyłać transakcje do kontraktu rollupu.

Jeśli kolejka oczekujących depozytów zacznie się zapełniać, operator ZK-rollup pobierze transakcje depozytowe i prześle je do kontraktu rollupu. Gdy środki użytkownika znajdą się w rollupie, może on rozpocząć transakcje, wysyłając je do operatora w celu przetworzenia. Użytkownicy mogą weryfikować salda na rollupie, haszując dane swojego konta, wysyłając hasz do kontraktu rollupu i dostarczając dowód Merkle'a w celu weryfikacji w odniesieniu do bieżącego korzenia stanu.

Wypłacanie środków z ZK-rollup do L1 jest proste. Użytkownik inicjuje transakcję wyjścia, wysyłając swoje aktywa na rollupie na określone konto w celu ich spalenia. Jeśli operator uwzględni transakcję w następnej partii, użytkownik może złożyć wniosek o wypłatę do kontraktu w łańcuchu. Ten wniosek o wypłatę będzie zawierał następujące elementy:

- Dowód Merkle'a dowodzący włączenia transakcji użytkownika na konto spalania w partii transakcji

- Dane transakcji

- Korzeń partii

- Adres L1 do otrzymania zdeponowanych środków

Kontrakt rollupu haszuje dane transakcji, sprawdza, czy istnieje korzeń partii i używa dowodu Merkle'a do sprawdzenia, czy hasz transakcji jest częścią korzenia partii. Następnie kontrakt wykonuje transakcję wyjścia i wysyła środki na wybrany przez użytkownika adres na L1.

## ZK-rollupy i kompatybilność z EVM {#zk-rollups-and-evm-compatibility}

W przeciwieństwie do rollupów optymistycznych, ZK-rollupy nie są łatwo kompatybilne z [Wirtualną Maszyną Ethereum (EVM)](/developers/docs/evm/). Udowadnianie ogólnego przeznaczenia obliczeń EVM w obwodach jest trudniejsze i bardziej zasobochłonne niż udowadnianie prostych obliczeń (takich jak opisany wcześniej transfer tokenów).

Jednak [postępy w technologii zerowej wiedzy](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) wzbudzają ponowne zainteresowanie opakowywaniem obliczeń EVM w dowody o zerowej wiedzy. Wysiłki te mają na celu stworzenie implementacji EVM o zerowej wiedzy (zkEVM), która może skutecznie weryfikować poprawność wykonania programu. zkEVM odtwarza istniejące kody operacyjne EVM do udowadniania/weryfikacji w obwodach, umożliwiając wykonywanie inteligentnych kontraktów.

Podobnie jak EVM, zkEVM przechodzi między stanami po wykonaniu obliczeń na niektórych danych wejściowych. Różnica polega na tym, że zkEVM tworzy również dowody o zerowej wiedzy w celu weryfikacji poprawności każdego kroku w wykonaniu programu. Dowody ważności mogłyby weryfikować poprawność operacji, które dotykają stanu VM (pamięć, stos, przechowywanie) i samego obliczenia (tj. czy operacja wywołała odpowiednie kody operacyjne i wykonała je poprawnie?).

Oczekuje się, że wprowadzenie kompatybilnych z EVM ZK-rollupów pomoże deweloperom wykorzystać skalowalność i gwarancje bezpieczeństwa dowodów o zerowej wiedzy. Co ważniejsze, kompatybilność z natywną infrastrukturą Ethereum oznacza, że deweloperzy mogą budować dapki przyjazne dla ZK przy użyciu znanych (i sprawdzonych w boju) narzędzi i języków.

## Jak działają opłaty za ZK-rollup? {#how-do-zk-rollup-fees-work}

To, ile użytkownicy płacą za transakcje na ZK-rollupach, zależy od opłaty za gaz, podobnie jak w sieci głównej Ethereum. Jednak opłaty za gaz działają inaczej na L2 i zależą od następujących kosztów:

1. **Zapis stanu**: Istnieje stały koszt zapisu do stanu Ethereum (tj. przesłania transakcji na blockchainie Ethereum). ZK-rollupy zmniejszają ten koszt poprzez grupowanie transakcji i rozłożenie stałych kosztów na wielu użytkowników.

2. Publikacja danych: ZK-rollupy publikują dane stanu dla każdej transakcji w Ethereum jako `calldata`. Koszty `calldata` są obecnie regulowane przez [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), który określa koszt 16 jednostek gazu za niezerowe bajty i 4 jednostki gazu za zerowe bajty `calldata`. Koszt zapłacony za każdą transakcję zależy od tego, ile `calldata` musi zostać opublikowane dla niej w łańcuchu.

3. **Opłaty operatora L2**: Jest to kwota płacona operatorowi rollupu jako rekompensata za koszty obliczeniowe poniesione przy przetwarzaniu transakcji, podobnie jak [„opłaty priorytetowe (napiwki)”](/developers/docs/gas/#how-are-gas-fees-calculated) w sieci głównej Ethereum.

4. **Generowanie i weryfikacja dowodu**: Operatorzy ZK-rollup muszą produkować dowody ważności dla partii transakcji, co jest zasobochłonne. Weryfikacja dowodów o zerowej wiedzy w sieci głównej również kosztuje gaz (~ 500 000 gazu).

Oprócz grupowania transakcji ZK-rollupy zmniejszają opłaty dla użytkowników poprzez kompresję danych transakcyjnych. Możesz [zobaczyć przegląd w czasie rzeczywistym](https://l2fees.info/) kosztów korzystania z ZK-rollupów Ethereum.

## Jak ZK-rollupy skalują Ethereum? {#scaling-ethereum-with-zk-rollups}

### Kompresja danych transakcyjnych {#transaction-data-compression}

ZK-rollupy zwiększają przepustowość warstwy bazowej Ethereum poprzez przeniesienie obliczeń poza łańcuch, ale prawdziwy impuls do skalowania pochodzi z kompresji danych transakcyjnych. [Rozmiar bloku](/developers/docs/blocks/#block-size) Ethereum ogranicza ilość danych, które każdy blok może pomieścić, a co za tym idzie, liczbę transakcji przetwarzanych w bloku. Poprzez kompresję danych związanych z transakcjami, ZK-rollupy znacznie zwiększają liczbę transakcji przetwarzanych w bloku.

ZK-rollupy mogą kompresować dane transakcyjne lepiej niż rollupy optymistyczne, ponieważ nie muszą publikować wszystkich danych wymaganych do walidacji każdej transakcji. Muszą jedynie opublikować minimalne dane wymagane do odtworzenia najnowszego stanu kont i sald na rollupie.

### Dowody rekurencyjne {#recursive-proofs}

Zaletą dowodów o zerowej wiedzy jest to, że dowody mogą weryfikować inne dowody. Na przykład pojedynczy ZK-SNARK może weryfikować inne ZK-SNARK-i. Takie „dowody dowodów” nazywane są dowodami rekurencyjnymi i znacznie zwiększają przepustowość na ZK-rollupach.

Obecnie dowody ważności są generowane na zasadzie blok po bloku i przesyłane do kontraktu L1 w celu weryfikacji. Jednak weryfikacja dowodów pojedynczych bloków ogranicza przepustowość, którą ZK-rollupy mogą osiągnąć, ponieważ tylko jeden blok może zostać sfinalizowany, gdy operator prześle dowód.

Dowody rekurencyjne umożliwiają jednak finalizację kilku bloków za pomocą jednego dowodu ważności. Dzieje się tak, ponieważ obwód dowodzący rekurencyjnie agreguje wiele dowodów bloków, aż do utworzenia jednego ostatecznego dowodu. Operator L2 przesyła ten rekurencyjny dowód, a jeśli kontrakt go zaakceptuje, wszystkie odpowiednie bloki zostaną natychmiast sfinalizowane. Dzięki dowodom rekurencyjnym zwiększa się liczba transakcji ZK-rollup, które można okresowo sfinalizować na Ethereum.

### Zalety i wady ZK-rollupów {#zk-rollups-pros-and-cons}

| Zalety                                                                                                                                                                                                                                                                                | Wady                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dowody ważności zapewniają poprawność transakcji poza łańcuchem i uniemożliwiają operatorom wykonywanie nieprawidłowych przejść stanu.                                                                                                                                | Koszt związany z obliczaniem i weryfikacją dowodów ważności jest znaczny i może zwiększyć opłaty dla użytkowników rollupów.                                                                                            |
| Oferuje szybszą nieodwołalność transakcji, ponieważ aktualizacje stanu są zatwierdzane po zweryfikowaniu dowodów ważności na L1.                                                                                                                                      | Budowa ZK-rollupów kompatybilnych z EVM jest trudna ze względu na złożoność technologii zerowej wiedzy.                                                                                                                |
| Opiera się na kryptograficznych mechanizmach niewymagających zaufania w celu zapewnienia bezpieczeństwa, a nie na uczciwości motywowanych aktorów, jak w przypadku [rollupów optymistycznych](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Produkcja dowodów ważności wymaga specjalistycznego sprzętu, co może sprzyjać scentralizowanej kontroli łańcucha przez kilka stron.                                                                                    |
| Przechowuje dane potrzebne do odzyskania stanu poza łańcuchem na L1, co gwarantuje bezpieczeństwo, odporność na cenzurę i decentralizację.                                                                                                                            | Scentralizowani operatorzy (sekwencery) mogą wpływać na kolejność transakcji.                                                                                                                       |
| Użytkownicy korzystają z większej efektywności kapitałowej i mogą wypłacać środki z L2 bez opóźnień.                                                                                                                                                                  | Wymagania sprzętowe mogą zmniejszyć liczbę uczestników, którzy mogą zmusić łańcuch do postępu, zwiększając ryzyko, że złośliwi operatorzy zamrożą stan rollupu i będą cenzurować użytkowników.                         |
| Nie zależy od założeń dotyczących żywotności, a użytkownicy nie muszą walidować łańcucha, aby chronić swoje środki.                                                                                                                                                   | Niektóre systemy dowodzenia (np. ZK-SNARK) wymagają zaufanej konfiguracji, która, jeśli zostanie niewłaściwie obsłużona, może potencjalnie naruszyć model bezpieczeństwa ZK-rollup. |
| Lepsza kompresja danych może pomóc w obniżeniu kosztów publikacji `calldata` na Ethereum i zminimalizować opłaty za rollup dla użytkowników.                                                                                                                          |                                                                                                                                                                                                                                        |

### Wizualne wyjaśnienie ZK-rollupów {#zk-video}

Zobacz, jak Finematics wyjaśnia ZK-rollupy:

<YouTube id="7pWxCklcNsU" start="406" />

## Kto pracuje nad zkEVM? {#zkevm-projects}

Projekty pracujące nad zkEVM to:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM to projekt finansowany przez Fundację Ethereum w celu opracowania kompatybilnego z EVM ZK-rollupu oraz mechanizmu generowania dowodów ważności dla bloków Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _to zdecentralizowany ZK Rollup w sieci głównej Ethereum, pracujący nad Wirtualną Maszyną Ethereum o zerowej wiedzy (zkEVM), która wykonuje transakcje Ethereum w przejrzysty sposób, w tym inteligentne kontrakty z walidacjami dowodu o zerowej wiedzy._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll to firma oparta na technologii, pracująca nad budową natywnego rozwiązania warstwy 2 zkEVM dla Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko to zdecentralizowany, równoważny z Ethereum ZK-rollup ([ZK-EVM typu 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era to kompatybilny z EVM ZK Rollup zbudowany przez Matter Labs, napędzany przez własny zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet to kompatybilne z EVM rozwiązanie skalujące warstwy 2 zbudowane przez StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph to hybrydowe rozwiązanie skalujące rollup, które wykorzystuje dowód ZK do rozwiązania problemu wyzwania stanu warstwy 2._

- **[Linea](https://linea.build)** - _Linea to równoważna z Ethereum warstwa 2 zkEVM zbudowana przez Consensys, w pełni zgodna z ekosystemem Ethereum._

## Dalsza lektura na temat ZK-rollupów {#further-reading-on-zk-rollups}

- [Czym są pakiety zbiorcze o wiedzy zerowej?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Czym są pakiety zbiorcze o wiedzy zerowej?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK-i vs SNARK-i](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Co to jest zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Typy ZK-EVM: równoważne z Ethereum, równoważne z EVM, typ 1, typ 4 i inne zagadkowe hasła](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Wprowadzenie do zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Czym są L2 ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Zasoby Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS pod lupą](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Jak SNARK-i są możliwe?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
