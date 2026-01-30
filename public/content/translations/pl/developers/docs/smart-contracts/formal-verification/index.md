---
title: Formalna weryfikacja inteligentnych kontraktów
description: Przegląd formalnej weryfikacji inteligentnych kontraktów Ethereum
lang: pl
---

[Inteligentne kontrakty](/developers/docs/smart-contracts/) umożliwiają tworzenie zdecentralizowanych, niewymagających zaufania i solidnych aplikacji, które wprowadzają nowe przypadki użycia i odblokowują wartość dla użytkowników. Ponieważ inteligentne kontrakty obsługują duże ilości wartości, bezpieczeństwo jest kluczową kwestią dla deweloperów.

Weryfikacja formalna jest jedną z zalecanych technik poprawy [bezpieczeństwa inteligentnych kontraktów](/developers/docs/smart-contracts/security/). Weryfikacja formalna, która wykorzystuje [metody formalne](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) do specyfikacji, projektowania i weryfikacji programów, jest od lat stosowana w celu zapewnienia poprawności krytycznych systemów sprzętowych i oprogramowania.

Gdy jest zaimplementowana w inteligentnych kontraktach, weryfikacja formalna może udowodnić, że logika biznesowa kontraktu spełnia predefiniowaną specyfikację. W porównaniu z innymi metodami oceny poprawności kodu kontraktu, takimi jak testowanie, weryfikacja formalna daje silniejsze gwarancje, że inteligentny kontrakt jest funkcjonalnie poprawny.

## Czym jest weryfikacja formalna? {#what-is-formal-verification}

Weryfikacja formalna odnosi się do procesu oceny poprawności systemu w odniesieniu do formalnej specyfikacji. Mówiąc prościej, weryfikacja formalna pozwala nam sprawdzić, czy zachowanie systemu spełnia pewne wymagania (tj. czy robi to, co chcemy).

Oczekiwane zachowania systemu (w tym przypadku inteligentnego kontraktu) są opisywane za pomocą modelowania formalnego, podczas gdy języki specyfikacji umożliwiają tworzenie właściwości formalnych. Techniki weryfikacji formalnej mogą następnie zweryfikować, czy implementacja kontraktu jest zgodna z jego specyfikacją i uzyskać matematyczny dowód poprawności tej pierwszej. Gdy kontrakt spełnia swoją specyfikację, określa się go jako „funkcjonalnie poprawny”, „poprawny z założenia” lub „poprawny z konstrukcji”.

### Czym jest model formalny? {#what-is-a-formal-model}

W informatyce [model formalny](https://en.wikipedia.org/wiki/Model_of_computation) to matematyczny opis procesu obliczeniowego. Programy są abstrahowane do funkcji matematycznych (równań), a model opisuje, jak obliczane są wyniki funkcji dla danego wejścia.

Modele formalne zapewniają poziom abstrakcji, na którym można ocenić analizę zachowania programu. Istnienie modeli formalnych pozwala na stworzenie _specyfikacji formalnej_, która opisuje pożądane właściwości danego modelu.

Do modelowania inteligentnych kontraktów do weryfikacji formalnej używane są różne techniki. Na przykład, niektóre modele są używane do wnioskowania o zachowaniu wysokopoziomowym inteligentnego kontraktu. Te techniki modelowania stosują widok czarnej skrzynki do inteligentnych kontraktów, postrzegając je jako systemy, które akceptują dane wejściowe i wykonują obliczenia na ich podstawie.

Modele wysokopoziomowe koncentrują się na relacji między inteligentnymi kontraktami a agentami zewnętrznymi, takimi jak konta zewnętrzne (EOA), konta kontraktów i środowisko blockchain. Takie modele są przydatne do definiowania właściwości, które określają, jak kontrakt powinien się zachowywać w odpowiedzi na określone interakcje użytkownika.

Odwrotnie, inne modele formalne koncentrują się na niskopoziomowym zachowaniu inteligentnego kontraktu. Podczas gdy modele wysokopoziomowe mogą pomóc w rozumowaniu o funkcjonalności kontraktu, mogą nie uchwycić szczegółów dotyczących wewnętrznego działania implementacji. Modele niskopoziomowe stosują widok białej skrzynki do analizy programu i opierają się na reprezentacjach niższego poziomu aplikacji inteligentnych kontraktów, takich jak ślady programu i [grafy przepływu sterowania](https://en.wikipedia.org/wiki/Control-flow_graph), w celu wnioskowania o właściwościach istotnych dla wykonania kontraktu.

Modele niskopoziomowe są uważane za idealne, ponieważ reprezentują rzeczywiste wykonanie inteligentnego kontraktu w środowisku wykonawczym Ethereum (tj. [EVM](/developers/docs/evm/)). Techniki modelowania niskopoziomowego są szczególnie przydatne w ustanawianiu krytycznych właściwości bezpieczeństwa w inteligentnych kontraktach i wykrywaniu potencjalnych luk w zabezpieczeniach.

### Czym jest specyfikacja formalna? {#what-is-a-formal-specification}

Specyfikacja to po prostu wymaganie techniczne, które dany system musi spełniać. W programowaniu specyfikacje reprezentują ogólne idee dotyczące wykonania programu (tj. co program powinien robić).

W kontekście inteligentnych kontraktów specyfikacje formalne odnoszą się do _właściwości_ — formalnych opisów wymagań, które kontrakt musi spełniać. Takie właściwości są opisywane jako „niezmienniki” i reprezentują logiczne stwierdzenia dotyczące wykonania kontraktu, które muszą pozostać prawdziwe w każdych możliwych okolicznościach, bez żadnych wyjątków.

Możemy więc myśleć o specyfikacji formalnej jako o zbiorze oświadczeń napisanych w języku formalnym, które opisują zamierzone wykonanie inteligentnego kontraktu. Specyfikacje obejmują właściwości kontraktu i definiują, jak kontrakt powinien zachowywać się w różnych okolicznościach. Celem weryfikacji formalnej jest ustalenie, czy inteligentny kontrakt posiada te właściwości (niezmienniki) i czy te właściwości nie są naruszane podczas wykonywania.

Specyfikacje formalne mają kluczowe znaczenie w tworzeniu bezpiecznych implementacji inteligentnych kontraktów. Kontrakty, które nie implementują niezmienników lub których właściwości są naruszane podczas wykonywania, są podatne na luki w zabezpieczeniach, które mogą zaszkodzić funkcjonalności lub spowodować złośliwe exploity.

## Rodzaje specyfikacji formalnych dla inteligentnych kontraktów {#formal-specifications-for-smart-contracts}

Specyfikacje formalne umożliwiają matematyczne rozumowanie na temat poprawności wykonania programu. Podobnie jak w przypadku modeli formalnych, specyfikacje formalne mogą przechwytywać właściwości wysokiego poziomu lub niskopoziomowe zachowanie implementacji kontraktu.

Specyfikacje formalne są tworzone przy użyciu elementów [logiki programu](https://en.wikipedia.org/wiki/Logic_programming), które pozwalają na formalne rozumowanie na temat właściwości programu. Logika programu ma formalne zasady, które wyrażają (w języku matematycznym) oczekiwane zachowanie programu. Do tworzenia specyfikacji formalnych wykorzystywane są różne logiki programów, w tym [logika osiągalności](https://en.wikipedia.org/wiki/Reachability_problem), [logika temporalna](https://en.wikipedia.org/wiki/Temporal_logic) i [logika Hoare'a](https://en.wikipedia.org/wiki/Hoare_logic).

Specyfikacje formalne dla inteligentnych kontraktów można ogólnie podzielić na specyfikacje **wysokiego poziomu** lub **niskiego poziomu**. Niezależnie od kategorii, do której należy specyfikacja, musi ona w sposób adekwatny i jednoznaczny opisywać właściwość analizowanego systemu.

### Specyfikacje wysokopoziomowe {#high-level-specifications}

Jak sama nazwa wskazuje, specyfikacja wysokiego poziomu (nazywana również „specyfikacją zorientowaną na model”) opisuje zachowanie programu na wysokim poziomie. Specyfikacje wysokiego poziomu modelują inteligentny kontrakt jako [automat skończony](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), który może przechodzić między stanami, wykonując operacje, a logika temporalna jest używana do definiowania formalnych właściwości dla modelu FSM.

[Logiki temporalne](https://en.wikipedia.org/wiki/Temporal_logic) to „zasady rozumowania o zdaniach kwalifikowanych w kategoriach czasu (np. „Jestem _zawsze_ głodny” lub „W końcu _będę_ głodny”).” W przypadku zastosowania do weryfikacji formalnej logiki temporalne służą do przedstawiania twierdzeń o poprawnym zachowaniu systemów modelowanych jako automaty stanowe. W szczególności logika temporalna opisuje przyszłe stany, w jakich może znajdować się inteligentny kontrakt i jak przechodzi między stanami.

Specyfikacje wysokiego poziomu zazwyczaj obejmują dwie krytyczne właściwości czasowe dla inteligentnych kontraktów: **bezpieczeństwo** i **żywotność**. Właściwości bezpieczeństwa reprezentują ideę, że „nic złego się nigdy nie dzieje” i zwykle wyrażają niezmienność. Właściwość bezpieczeństwa może definiować ogólne wymagania dotyczące oprogramowania, takie jak brak [zakleszczenia](https://www.techtarget.com/whatis/definition/deadlock), lub wyrażać właściwości specyficzne dla domeny dla kontraktów (np. niezmienniki dotyczące kontroli dostępu do funkcji, dopuszczalne wartości zmiennych stanu lub warunki transferów tokenów).

Weźmy na przykład to wymaganie bezpieczeństwa, które obejmuje warunki korzystania z `transfer()` lub `transferFrom()` w kontraktach tokenów ERC-20: _„Saldo nadawcy nigdy nie jest niższe niż żądana kwota tokenów do wysłania”_. Ten opis w języku naturalnym niezmiennika kontraktu można przetłumaczyć na formalną (matematyczną) specyfikację, którą można następnie rygorystycznie sprawdzić pod kątem poprawności.

Właściwości żywotności zapewniają, że „w końcu dzieje się coś dobrego” i dotyczą zdolności kontraktu do przechodzenia przez różne stany. Przykładem właściwości żywotności jest „płynność”, która odnosi się do zdolności kontraktu do przekazywania sald użytkownikom na żądanie. Jeśli ta właściwość zostanie naruszona, użytkownicy nie będą mogli wypłacić aktywów przechowywanych w kontrakcie, tak jak to miało miejsce w przypadku [incydentu z portfelem Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Specyfikacje niskopoziomowe {#low-level-specifications}

Specyfikacje wysokopoziomowe przyjmują za punkt wyjścia model automatu skończonego kontraktu i definiują pożądane właściwości tego modelu. W przeciwieństwie do tego, specyfikacje niskopoziomowe (nazywane również „specyfikacjami zorientowanymi na właściwości”) często modelują programy (inteligentne kontrakty) jako systemy składające się z kolekcji funkcji matematycznych i opisują poprawne zachowanie takich systemów.

Mówiąc prościej, specyfikacje niskopoziomowe analizują _ślady programu_ i próbują zdefiniować właściwości inteligentnego kontraktu w oparciu o te ślady. Ślady odnoszą się do sekwencji wykonań funkcji, które zmieniają stan inteligentnego kontraktu; w związku z tym specyfikacje niskopoziomowe pomagają określić wymagania dotyczące wewnętrznego wykonania kontraktu.

Niskopoziomowe specyfikacje formalne można podać jako właściwości w stylu Hoare'a lub jako niezmienniki na ścieżkach wykonania.

### Właściwości w stylu Hoare'a {#hoare-style-properties}

[Logika Hoare'a](https://en.wikipedia.org/wiki/Hoare_logic) dostarcza zbiór formalnych zasad do rozumowania o poprawności programów, w tym inteligentnych kontraktów. Właściwość w stylu Hoare'a jest reprezentowana przez trójkę Hoare'a `{P}c{Q}`, gdzie `c` jest programem, a `P` i `Q` są predykatami stanu `c` (tj. programu), formalnie opisanymi odpowiednio jako _warunki wstępne_ i _warunki końcowe_.

Warunek wstępny to predykat opisujący warunki wymagane do poprawnego wykonania funkcji; użytkownicy wywołujący kontrakt muszą spełnić to wymaganie. Warunek końcowy to predykat opisujący warunek, który funkcja ustanawia, jeśli jest poprawnie wykonana; użytkownicy mogą oczekiwać, że ten warunek będzie prawdziwy po wywołaniu funkcji. _Niezmiennik_ w logice Hoare'a jest predykatem, który jest zachowywany przez wykonanie funkcji (tj. nie zmienia się).

Specyfikacje w stylu Hoare'a mogą gwarantować _częściową poprawność_ lub _całkowitą poprawność_. Implementacja funkcji kontraktu jest „częściowo poprawna”, jeśli warunek wstępny jest prawdziwy przed wykonaniem funkcji, a jeśli wykonanie się zakończy, warunek końcowy jest również prawdziwy. Dowód całkowitej poprawności uzyskuje się, jeśli warunek wstępny jest prawdziwy przed wykonaniem funkcji, wykonanie ma gwarancję zakończenia, a gdy to nastąpi, warunek końcowy jest prawdziwy.

Uzyskanie dowodu całkowitej poprawności jest trudne, ponieważ niektóre wykonania mogą się opóźniać przed zakończeniem lub nigdy się nie kończyć. To powiedziawszy, pytanie, czy wykonanie się kończy, jest prawdopodobnie kwestią sporną, ponieważ mechanizm gazu Ethereum zapobiega nieskończonym pętlom programu (wykonanie kończy się pomyślnie lub z powodu błędu „braku gazu”).

Specyfikacje inteligentnych kontraktów utworzone przy użyciu logiki Hoare'a będą miały zdefiniowane warunki wstępne, warunki końcowe i niezmienniki dla wykonywania funkcji i pętli w kontrakcie. Warunki wstępne często uwzględniają możliwość błędnych danych wejściowych do funkcji, a warunki końcowe opisują oczekiwaną odpowiedź na takie dane wejściowe (np. zgłoszenie określonego wyjątku). W ten sposób właściwości w stylu Hoare'a są skuteczne w zapewnianiu poprawności implementacji kontraktów.

Wiele frameworków weryfikacji formalnej wykorzystuje specyfikacje w stylu Hoare'a do udowadniania poprawności semantycznej funkcji. Możliwe jest również dodawanie właściwości w stylu Hoare'a (jako asercji) bezpośrednio do kodu kontraktu za pomocą instrukcji `require` i `assert` w Solidity.

Instrukcje `require` wyrażają warunek wstępny lub niezmiennik i są często używane do walidacji danych wejściowych użytkownika, podczas gdy `assert` przechwytuje warunek końcowy niezbędny dla bezpieczeństwa. Na przykład, właściwą kontrolę dostępu do funkcji (przykład właściwości bezpieczeństwa) można osiągnąć za pomocą `require` jako sprawdzenia warunku wstępnego tożsamości konta wywołującego. Podobnie, niezmiennik dotyczący dopuszczalnych wartości zmiennych stanu w kontrakcie (np. całkowita liczba tokenów w obiegu) może być chroniony przed naruszeniem za pomocą `assert` do potwierdzenia stanu kontraktu po wykonaniu funkcji.

### Właściwości na poziomie śladu {#trace-level-properties}

Specyfikacje oparte na śladach opisują operacje, które przenoszą kontrakt między różnymi stanami oraz relacje między tymi operacjami. Jak wyjaśniono wcześniej, ślady to sekwencje operacji, które w określony sposób zmieniają stan kontraktu.

To podejście opiera się na modelu inteligentnych kontraktów jako systemów przejść stanów z pewnymi predefiniowanymi stanami (opisanymi przez zmienne stanu) wraz ze zbiorem predefiniowanych przejść (opisanych przez funkcje kontraktu). Ponadto do opisu semantyki operacyjnej kontraktu często wykorzystywany jest [graf przepływu sterowania](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), który jest graficzną reprezentacją przepływu wykonania programu. W tym przypadku każdy ślad jest reprezentowany jako ścieżka na grafie przepływu sterowania.

Przede wszystkim specyfikacje na poziomie śladu są używane do wnioskowania o wzorcach wewnętrznego wykonania w inteligentnych kontraktach. Tworząc specyfikacje na poziomie śladu, potwierdzamy dopuszczalne ścieżki wykonania (tj. przejścia stanu) dla inteligentnego kontraktu. Używając technik, takich jak wykonanie symboliczne, możemy formalnie zweryfikować, że wykonanie nigdy nie podąża ścieżką niezdefiniowaną w modelu formalnym.

Użyjmy przykładu kontraktu [DAO](/dao/), który ma kilka publicznie dostępnych funkcji do opisania właściwości na poziomie śladu. Tutaj zakładamy, że kontrakt DAO pozwala użytkownikom na wykonanie następujących operacji:

- Wpłać środki

- Głosuj nad propozycją po wpłaceniu środków

- Zażądaj zwrotu pieniędzy, jeśli nie zagłosujesz nad propozycją

Przykładowe właściwości na poziomie śladu mogą brzmieć: _„użytkownicy, którzy nie wpłacają środków, nie mogą głosować nad propozycją”_ lub _„użytkownicy, którzy nie głosują nad propozycją, powinni zawsze mieć możliwość ubiegania się o zwrot pieniędzy”_. Obie właściwości potwierdzają preferowane sekwencje wykonania (głosowanie nie może odbyć się _przed_ wpłatą środków, a ubieganie się o zwrot pieniędzy nie może odbyć się _po_ zagłosowaniu nad propozycją).

## Techniki formalnej weryfikacji inteligentnych kontraktów {#formal-verification-techniques}

### Sprawdzanie modelu {#model-checking}

Sprawdzanie modelu to technika weryfikacji formalnej, w której algorytm sprawdza formalny model inteligentnego kontraktu pod kątem jego specyfikacji. W sprawdzaniu modeli inteligentne kontrakty są często reprezentowane jako systemy przejść stanów, podczas gdy właściwości dopuszczalnych stanów kontraktów są definiowane za pomocą logiki temporalnej.

Sprawdzanie modelu wymaga stworzenia abstrakcyjnej reprezentacji matematycznej systemu (tj. kontraktu) i wyrażenia właściwości tego systemu za pomocą formuł zakorzenionych w [logice zdań](https://www.baeldung.com/cs/propositional-logic). Upraszcza to zadanie algorytmu sprawdzania modelu, a mianowicie udowodnienie, że model matematyczny spełnia daną formułę logiczną.

Sprawdzanie modelu w weryfikacji formalnej jest używane głównie do oceny właściwości czasowych, które opisują zachowanie kontraktu w czasie. Właściwości czasowe inteligentnych kontraktów obejmują _bezpieczeństwo_ i _żywotność_, które wyjaśniliśmy wcześniej.

Na przykład właściwość bezpieczeństwa związana z kontrolą dostępu (np. _tylko właściciel kontraktu może wywołać `selfdestruct`_) może być zapisana w logice formalnej. Następnie algorytm sprawdzania modelu może zweryfikować, czy kontrakt spełnia tę formalną specyfikację.

Sprawdzanie modelu wykorzystuje eksplorację przestrzeni stanów, która polega na konstruowaniu wszystkich możliwych stanów inteligentnego kontraktu i próbie znalezienia osiągalnych stanów, które skutkują naruszeniem właściwości. Może to jednak prowadzić do nieskończonej liczby stanów (znanej jako „problem eksplozji stanów”), dlatego narzędzia do sprawdzania modeli opierają się na technikach abstrakcji, aby umożliwić wydajną analizę inteligentnych kontraktów.

### Dowodzenie twierdzeń {#theorem-proving}

Dowodzenie twierdzeń to metoda matematycznego rozumowania na temat poprawności programów, w tym inteligentnych kontraktów. Polega na przekształceniu modelu systemu kontraktu i jego specyfikacji w formuły matematyczne (stwierdzenia logiczne).

Celem dowodzenia twierdzeń jest weryfikacja logicznej równoważności między tymi stwierdzeniami. „Równoważność logiczna” (nazywana również „bi-implikacją logiczną”) to rodzaj relacji między dwoma stwierdzeniami, w której pierwsze stwierdzenie jest prawdziwe _wtedy i tylko wtedy_, gdy drugie stwierdzenie jest prawdziwe.

Wymagana relacja (równoważność logiczna) między stwierdzeniami dotyczącymi modelu kontraktu a jego właściwością jest sformułowana jako stwierdzenie możliwe do udowodnienia (nazywane twierdzeniem). Korzystając z formalnego systemu wnioskowania, zautomatyzowany dowodziciel twierdzeń może zweryfikować ważność twierdzenia. Innymi słowy, dowodziciel twierdzeń może jednoznacznie udowodnić, że model inteligentnego kontraktu dokładnie odpowiada jego specyfikacjom.

Podczas gdy sprawdzanie modeli modeluje kontrakty jako systemy przejść ze skończonymi stanami, dowodzenie twierdzeń może obsługiwać analizę systemów o nieskończonych stanach. Oznacza to jednak, że zautomatyzowany dowodziciel twierdzeń nie zawsze może wiedzieć, czy problem logiczny jest „rozstrzygalny”, czy nie.

W rezultacie często wymagana jest pomoc człowieka, aby poprowadzić dowodziciela twierdzeń w uzyskiwaniu dowodów poprawności. Wykorzystanie wysiłku ludzkiego w dowodzeniu twierdzeń sprawia, że jest ono droższe w użyciu niż sprawdzanie modeli, które jest w pełni zautomatyzowane.

### Wykonanie symboliczne {#symbolic-execution}

Wykonanie symboliczne to metoda analizy inteligentnego kontraktu poprzez wykonywanie funkcji przy użyciu _wartości symbolicznych_ (np. `x > 5`) zamiast _wartości konkretnych_ (np. `x == 5`). Jako technika weryfikacji formalnej, wykonanie symboliczne jest używane do formalnego rozumowania na temat właściwości na poziomie śladu w kodzie kontraktu.

Wykonanie symboliczne reprezentuje ślad wykonania jako formułę matematyczną nad symbolicznymi wartościami wejściowymi, zwaną inaczej _predykatem ścieżki_. Do sprawdzenia, czy predykat ścieżki jest „spełnialny” (tzn. istnieje wartość, która może spełnić formułę), używany jest [solver SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories). Jeśli ścieżka podatna na zagrożenia jest spełnialna, solver SMT wygeneruje konkretną wartość, która wyzwala i kieruje wykonanie w kierunku tej ścieżki.

Załóżmy, że funkcja inteligentnego kontraktu przyjmuje jako dane wejściowe wartość `uint` (`x`) i cofa się, gdy `x` jest większe niż `5`, a także mniejsze niż `10`. Znalezienie wartości `x`, która wywołuje błąd przy użyciu normalnej procedury testowania, wymagałoby przejrzenia dziesiątek przypadków testowych (lub więcej) bez gwarancji faktycznego znalezienia danych wejściowych wywołujących błąd.

Odwrotnie, narzędzie do wykonywania symbolicznego wykonałoby funkcję z wartością symboliczną: `X > 5 ∧ X < 10` (tj. `x` jest większe niż 5 I `x` jest mniejsze niż 10). Powiązany predykat ścieżki `x = X > 5 ∧ X < 10` zostałby następnie przekazany do rozwiązania solverowi SMT. Jeśli dana wartość spełnia formułę `x = X > 5 ∧ X < 10`, solver SMT ją obliczy — na przykład solver może wygenerować `7` jako wartość dla `x`.

Ponieważ wykonanie symboliczne opiera się na danych wejściowych do programu, a zbiór danych wejściowych do zbadania wszystkich osiągalnych stanów jest potencjalnie nieskończony, nadal jest to forma testowania. Jednak, jak pokazano na przykładzie, wykonanie symboliczne jest bardziej wydajne niż zwykłe testowanie w celu znalezienia danych wejściowych, które wyzwalają naruszenia właściwości.

Co więcej, wykonanie symboliczne generuje mniej fałszywych alarmów niż inne techniki oparte na właściwościach (np. fuzzing), które losowo generują dane wejściowe do funkcji. Jeśli podczas wykonywania symbolicznego zostanie wyzwolony stan błędu, możliwe jest wygenerowanie konkretnej wartości, która wyzwala błąd i odtworzenie problemu.

Wykonanie symboliczne może również zapewnić pewien stopień matematycznego dowodu poprawności. Rozważ następujący przykład funkcji kontraktu z zabezpieczeniem przed przepełnieniem:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Ślad wykonania, który powoduje przepełnienie liczby całkowitej, musiałby spełniać formułę: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Taka formuła jest mało prawdopodobna do rozwiązania, dlatego służy jako matematyczny dowód, że funkcja `safe_add` nigdy nie ulega przepełnieniu.

### Dlaczego warto stosować weryfikację formalną dla inteligentnych kontraktów? {#benefits-of-formal-verification}

#### Potrzeba niezawodności {#need-for-reliability}

Weryfikacja formalna służy do oceny poprawności systemów o krytycznym znaczeniu dla bezpieczeństwa, których awaria może mieć katastrofalne skutki, takie jak śmierć, obrażenia lub ruina finansowa. Inteligentne kontrakty to aplikacje o wysokiej wartości, kontrolujące ogromne ilości wartości, a proste błędy w projektowaniu mogą prowadzić do [nieodwracalnych strat dla użytkowników](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Formalne zweryfikowanie kontraktu przed wdrożeniem może jednak zwiększyć gwarancje, że będzie on działał zgodnie z oczekiwaniami po uruchomieniu na blockchainie.

Niezawodność jest wysoce pożądaną cechą każdego inteligentnego kontraktu, zwłaszcza że kod wdrożony w Wirtualnej Maszynie Ethereum (EVM) jest zazwyczaj niezmienny. Przy braku łatwo dostępnych uaktualnień po uruchomieniu, potrzeba zagwarantowania niezawodności kontraktów sprawia, że weryfikacja formalna jest konieczna. Weryfikacja formalna jest w stanie wykryć trudne problemy, takie jak niedopełnienie i przepełnienie liczb całkowitych, reentrancy i słabe optymalizacje gazu, które mogą umknąć audytorom i testerom.

#### Udowodnij poprawność funkcjonalną {#prove-functional-correctness}

Testowanie programu jest najczęstszą metodą udowodnienia, że inteligentny kontrakt spełnia pewne wymagania. Polega to na wykonaniu kontraktu z próbką danych, które ma obsługiwać, i analizie jego zachowania. Jeśli kontrakt zwróci oczekiwane wyniki dla danych próbnych, deweloperzy mają obiektywny dowód jego poprawności.

Podejście to nie może jednak udowodnić poprawnego wykonania dla wartości wejściowych, które nie są częścią próbki. Dlatego testowanie kontraktu może pomóc w wykryciu błędów (tj. jeśli niektóre ścieżki kodu nie zwrócą pożądanych wyników podczas wykonywania), ale **nie może jednoznacznie udowodnić braku błędów**.

Odwrotnie, weryfikacja formalna może formalnie udowodnić, że inteligentny kontrakt spełnia wymagania dla nieskończonego zakresu wykonań _bez_ uruchamiania kontraktu. Wymaga to stworzenia formalnej specyfikacji, która precyzyjnie opisuje poprawne zachowania kontraktu i opracowania formalnego (matematycznego) modelu systemu kontraktu. Następnie możemy postępować zgodnie z formalną procedurą dowodową, aby sprawdzić spójność między modelem kontraktu a jego specyfikacją.

Dzięki weryfikacji formalnej pytanie, czy logika biznesowa kontraktu spełnia wymagania, jest propozycją matematyczną, którą można udowodnić lub obalić. Poprzez formalne udowodnienie propozycji możemy zweryfikować nieskończoną liczbę przypadków testowych w skończonej liczbie kroków. W ten sposób weryfikacja formalna ma lepsze perspektywy udowodnienia, że kontrakt jest funkcjonalnie poprawny w odniesieniu do specyfikacji.

#### Idealne cele weryfikacji {#ideal-verification-targets}

Cel weryfikacji opisuje system, który ma być formalnie zweryfikowany. Weryfikacja formalna jest najlepiej stosowana w „systemach wbudowanych” (małych, prostych fragmentach oprogramowania, które stanowią część większego systemu). Są również idealne dla wyspecjalizowanych domen, które mają niewiele reguł, ponieważ ułatwia to modyfikację narzędzi do weryfikacji właściwości specyficznych dla domeny.

Inteligentne kontrakty — przynajmniej do pewnego stopnia — spełniają oba te wymagania. Na przykład niewielki rozmiar kontraktów Ethereum sprawia, że nadają się one do weryfikacji formalnej. Podobnie, EVM przestrzega prostych zasad, co ułatwia specyfikowanie i weryfikację właściwości semantycznych dla programów działających w EVM.

### Szybszy cykl rozwoju {#faster-development-cycle}

Techniki weryfikacji formalnej, takie jak sprawdzanie modeli i wykonanie symboliczne, są na ogół bardziej wydajne niż regularna analiza kodu inteligentnego kontraktu (przeprowadzana podczas testowania lub audytu). Dzieje się tak, ponieważ weryfikacja formalna opiera się na wartościach symbolicznych do testowania twierdzeń („co, jeśli użytkownik spróbuje wypłacić _n_ ether?”) w przeciwieństwie do testowania, które wykorzystuje konkretne wartości („co, jeśli użytkownik spróbuje wypłacić 5 ether?”).

Symboliczne zmienne wejściowe mogą obejmować wiele klas konkretnych wartości, więc podejścia do weryfikacji formalnej obiecują większe pokrycie kodu w krótszym czasie. Gdy jest stosowana skutecznie, weryfikacja formalna może przyspieszyć cykl rozwoju dla deweloperów.

Weryfikacja formalna poprawia również proces budowania dapki, zmniejszając kosztowne błędy projektowe. Aktualizowanie kontraktów (tam, gdzie to możliwe) w celu naprawienia luk w zabezpieczeniach wymaga obszernego przepisywania baz kodu i większego wysiłku włożonego w rozwój. Weryfikacja formalna może wykryć wiele błędów w implementacjach kontraktów, które mogą umknąć testerom i audytorom, i zapewnia wiele możliwości naprawienia tych problemów przed wdrożeniem kontraktu.

## Wady weryfikacji formalnej {#drawbacks-of-formal-verification}

### Koszt pracy ręcznej {#cost-of-manual-labor}

Weryfikacja formalna, zwłaszcza półautomatyczna weryfikacja, w której człowiek kieruje dowodzącym w celu uzyskania dowodów poprawności, wymaga znacznej pracy ręcznej. Co więcej, tworzenie specyfikacji formalnej jest złożonym działaniem, które wymaga wysokiego poziomu umiejętności.

Czynniki te (wysiłek i umiejętności) sprawiają, że weryfikacja formalna jest bardziej wymagająca i kosztowna w porównaniu ze zwykłymi metodami oceny poprawności kontraktów, takimi jak testowanie i audyty. Niemniej jednak, poniesienie kosztu pełnego audytu weryfikacyjnego jest praktyczne, biorąc pod uwagę koszt błędów w implementacjach inteligentnych kontraktów.

### Wyniki fałszywie ujemne {#false-negatives}

Weryfikacja formalna może jedynie sprawdzić, czy wykonanie inteligentnego kontraktu jest zgodne ze specyfikacją formalną. W związku z tym ważne jest, aby upewnić się, że specyfikacja prawidłowo opisuje oczekiwane zachowania inteligentnego kontraktu.

Jeśli specyfikacje są źle napisane, naruszenia właściwości — które wskazują na podatne na zagrożenia wykonania — nie mogą zostać wykryte przez audyt weryfikacji formalnej. W takim przypadku deweloper może błędnie założyć, że kontrakt jest wolny od błędów.

### Problemy z wydajnością {#performance-issues}

Weryfikacja formalna napotyka szereg problemów z wydajnością. Na przykład problemy z eksplozją stanów i ścieżek napotykane odpowiednio podczas sprawdzania modeli i sprawdzania symbolicznego mogą wpływać na procedury weryfikacyjne. Ponadto narzędzia do weryfikacji formalnej często wykorzystują solvery SMT i inne solvery ograniczeń w swojej warstwie podstawowej, a solvery te opierają się na procedurach intensywnych obliczeniowo.

Ponadto nie zawsze jest możliwe, aby weryfikatory programu ustaliły, czy właściwość (opisana jako formuła logiczna) może być spełniona, czy nie („[problem rozstrzygalności](https://en.wikipedia.org/wiki/Decision_problem)”), ponieważ program może nigdy się nie zakończyć. W związku z tym udowodnienie niektórych właściwości kontraktu może być niemożliwe, nawet jeśli jest on dobrze określony.

## Narzędzia do weryfikacji formalnej dla inteligentnych kontraktów Ethereum {#formal-verification-tools}

### Języki specyfikacji do tworzenia specyfikacji formalnych {#specification-languages}

**Act**: __Act umożliwia specyfikację aktualizacji przechowywania, warunków wstępnych/końcowych i niezmienników kontraktu. Jego zestaw narzędzi ma również backendy dowodowe zdolne do udowodnienia wielu właściwości za pomocą Coq, solverów SMT lub hevm.__

- [GitHub](https://github.com/ethereum/act)
- [Dokumentacja](https://github.com/argotorg/act)

**Scribble** - __Scribble przekształca adnotacje kodu w języku specyfikacji Scribble w konkretne asercje, które sprawdzają specyfikację.__

- [Dokumentacja](https://docs.scribble.codes/)

**Dafny** - __Dafny to gotowy do weryfikacji język programowania, który opiera się na adnotacjach wysokiego poziomu w celu wnioskowania i udowadniania poprawności kodu.__

- [GitHub](https://github.com/dafny-lang/dafny)

### Weryfikatory programu do sprawdzania poprawności {#program-verifiers}

**Certora Prover** – _Certora Prover to automatyczne narzędzie do weryfikacji formalnej służące do sprawdzania poprawności kodu w inteligentnych kontraktach. Specyfikacje są pisane w CVL (Certora Verification Language), a naruszenia właściwości są wykrywane za pomocą kombinacji analizy statycznej i rozwiązywania ograniczeń._

- [Strona internetowa](https://www.certora.com/)
- [Dokumentacja](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - __SMTChecker w Solidity to wbudowane narzędzie do sprawdzania modeli oparte na SMT (Satisfiability Modulo Theories) i rozwiązywaniu problemów Horna. Potwierdza, czy kod źródłowy kontraktu pasuje do specyfikacji podczas kompilacji i statycznie sprawdza naruszenia właściwości bezpieczeństwa.__

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - __solc-verify to rozszerzona wersja kompilatora Solidity, która może przeprowadzać zautomatyzowaną weryfikację formalną kodu Solidity przy użyciu adnotacji i modułowej weryfikacji programu.__

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - __KEVM to formalna semantyka Wirtualnej Maszyny Ethereum (EVM) napisana w frameworku K. KEVM jest wykonywalny i może udowodnić pewne twierdzenia związane z właściwościami za pomocą logiki osiągalności.__

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentacja](https://jellopaper.org/)

### Frameworki logiczne do dowodzenia twierdzeń {#theorem-provers}

**Isabelle** - _Isabelle/HOL to asystent dowodzenia, który pozwala na wyrażanie formuł matematycznych w języku formalnym i dostarcza narzędzi do dowodzenia tych formuł. Głównym zastosowaniem jest formalizacja dowodów matematycznych, a w szczególności weryfikacja formalna, która obejmuje dowodzenie poprawności sprzętu lub oprogramowania komputerowego oraz dowodzenie właściwości języków komputerowych i protokołów._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentacja](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq to interaktywny dowodziciel twierdzeń, który pozwala definiować programy za pomocą twierdzeń i interaktywnie generować sprawdzane maszynowo dowody poprawności._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentacja](https://rocq-prover.org/docs)

### Narzędzia oparte na wykonaniu symbolicznym do wykrywania podatnych na ataki wzorców w inteligentnych kontraktach {#symbolic-execution-tools}

**Manticore** - __Narzędzie do analizy kodu bajtowego EVM oparte na wykonaniu symbolicznym_._

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentacja](https://github.com/trailofbits/manticore/wiki)

**hevm** - __hevm to silnik wykonania symbolicznego i kontroler równoważności dla kodu bajtowego EVM.__

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** – _narzędzie do wykonywania symbolicznego do wykrywania luk w zabezpieczeniach w inteligentnych kontraktach Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentacja](https://mythril-classic.readthedocs.io/en/develop/)

## Dalsza lektura {#further-reading}

- [Jak działa formalna weryfikacja inteligentnych kontraktów](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Jak formalna weryfikacja może zapewnić bezbłędne inteligentne kontrakty](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Przegląd projektów weryfikacji formalnej w ekosystemie Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Kompleksowa weryfikacja formalna kontraktu depozytowego Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formalna weryfikacja najpopularniejszego na świecie inteligentnego kontraktu](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker i weryfikacja formalna](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
