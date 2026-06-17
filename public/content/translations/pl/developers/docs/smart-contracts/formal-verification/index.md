---
title: Weryfikacja formalna inteligentnych kontraktów
description: Przegląd weryfikacji formalnej dla inteligentnych kontraktów Ethereum
lang: pl
---

[Inteligentne kontrakty](/developers/docs/smart-contracts/) umożliwiają tworzenie zdecentralizowanych, niewymagających zaufania i solidnych aplikacji, które wprowadzają nowe przypadki użycia i odblokowują wartość dla użytkowników. Ponieważ inteligentne kontrakty obsługują duże ilości wartości, bezpieczeństwo jest kluczową kwestią dla deweloperów.

Weryfikacja formalna jest jedną z zalecanych technik poprawy [bezpieczeństwa inteligentnych kontraktów](/developers/docs/smart-contracts/security/). Weryfikacja formalna, która wykorzystuje [metody formalne](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) do specyfikowania, projektowania i weryfikacji programów, jest od lat stosowana w celu zapewnienia poprawności krytycznych systemów sprzętowych i programowych.

Wdrożona w inteligentnych kontraktach weryfikacja formalna może dowieść, że logika biznesowa kontraktu spełnia z góry określoną specyfikację. W porównaniu z innymi metodami oceny poprawności kodu kontraktu, takimi jak testowanie, weryfikacja formalna daje silniejsze gwarancje, że inteligentny kontrakt jest poprawny funkcjonalnie.

## Czym jest weryfikacja formalna? {#what-is-formal-verification}

Weryfikacja formalna odnosi się do procesu oceny poprawności systemu w odniesieniu do formalnej specyfikacji. Mówiąc prościej, weryfikacja formalna pozwala nam sprawdzić, czy zachowanie systemu spełnia pewne wymagania (tj. czy robi to, co chcemy).

Oczekiwane zachowania systemu (w tym przypadku inteligentnego kontraktu) są opisywane za pomocą modelowania formalnego, podczas gdy języki specyfikacji umożliwiają tworzenie właściwości formalnych. Techniki weryfikacji formalnej mogą następnie zweryfikować, czy implementacja kontraktu jest zgodna z jego specyfikacją i wyprowadzić matematyczny dowód jej poprawności. Gdy kontrakt spełnia swoją specyfikację, określa się go jako „poprawny funkcjonalnie”, „poprawny z założenia” lub „poprawny z konstrukcji”.

### Czym jest model formalny? {#what-is-a-formal-model}

W informatyce [model formalny](https://en.wikipedia.org/wiki/Model_of_computation) to matematyczny opis procesu obliczeniowego. Programy są abstrahowane do funkcji matematycznych (równań), a model opisuje, w jaki sposób obliczane są wyniki funkcji dla danych wejściowych.

Modele formalne zapewniają poziom abstrakcji, na którym można ocenić analizę zachowania programu. Istnienie modeli formalnych pozwala na stworzenie _specyfikacji formalnej_, która opisuje pożądane właściwości danego modelu.

Do modelowania inteligentnych kontraktów na potrzeby weryfikacji formalnej stosuje się różne techniki. Na przykład niektóre modele są używane do wnioskowania o zachowaniu inteligentnego kontraktu na wysokim poziomie. Te techniki modelowania stosują podejście czarnej skrzynki do inteligentnych kontraktów, traktując je jako systemy, które przyjmują dane wejściowe i wykonują obliczenia na ich podstawie.

Modele wysokiego poziomu koncentrują się na relacjach między inteligentnymi kontraktami a zewnętrznymi agentami, takimi jak konta posiadane zewnętrznie (EOA), konta kontraktów i środowisko blockchain. Takie modele są przydatne do definiowania właściwości, które określają, jak kontrakt powinien zachowywać się w odpowiedzi na określone interakcje użytkownika.

Z kolei inne modele formalne skupiają się na zachowaniu inteligentnego kontraktu na niskim poziomie. Chociaż modele wysokiego poziomu mogą pomóc we wnioskowaniu o funkcjonalności kontraktu, mogą nie uchwycić szczegółów dotyczących wewnętrznego działania implementacji. Modele niskiego poziomu stosują podejście białej skrzynki do analizy programu i opierają się na reprezentacjach aplikacji inteligentnych kontraktów niższego poziomu, takich jak ślady programu i [grafy przepływu sterowania](https://en.wikipedia.org/wiki/Control-flow_graph), aby wnioskować o właściwościach istotnych dla wykonania kontraktu.

Modele niskiego poziomu są uważane za idealne, ponieważ reprezentują rzeczywiste wykonanie inteligentnego kontraktu w środowisku wykonawczym Ethereum (tj. [EVM](/developers/docs/evm/)). Techniki modelowania niskiego poziomu są szczególnie przydatne w ustalaniu krytycznych właściwości bezpieczeństwa w inteligentnych kontraktach i wykrywaniu potencjalnych luk.

### Czym jest specyfikacja formalna? {#what-is-a-formal-specification}

Specyfikacja to po prostu wymaganie techniczne, które musi spełniać dany system. W programowaniu specyfikacje reprezentują ogólne idee dotyczące wykonania programu (tj. co program powinien robić).

W kontekście inteligentnych kontraktów specyfikacje formalne odnoszą się do _właściwości_ – formalnych opisów wymagań, które kontrakt musi spełniać. Takie właściwości są określane jako „niezmienniki” i reprezentują logiczne asercje dotyczące wykonania kontraktu, które muszą pozostać prawdziwe w każdych możliwych okolicznościach, bez żadnych wyjątków.

Zatem możemy myśleć o specyfikacji formalnej jako o zbiorze instrukcji napisanych w języku formalnym, które opisują zamierzone wykonanie inteligentnego kontraktu. Specyfikacje obejmują właściwości kontraktu i definiują, jak kontrakt powinien zachowywać się w różnych okolicznościach. Celem weryfikacji formalnej jest ustalenie, czy inteligentny kontrakt posiada te właściwości (niezmienniki) i czy nie są one naruszane podczas wykonywania.

Specyfikacje formalne mają kluczowe znaczenie w tworzeniu bezpiecznych implementacji inteligentnych kontraktów. Kontrakty, które nie implementują niezmienników lub których właściwości są naruszane podczas wykonywania, są podatne na luki, które mogą zaszkodzić funkcjonalności lub spowodować złośliwe ataki.

## Rodzaje specyfikacji formalnych dla inteligentnych kontraktów {#formal-specifications-for-smart-contracts}

Specyfikacje formalne umożliwiają matematyczne wnioskowanie o poprawności wykonania programu. Podobnie jak w przypadku modeli formalnych, specyfikacje formalne mogą uchwycić właściwości wysokiego poziomu lub zachowanie implementacji kontraktu na niskim poziomie.

Specyfikacje formalne są wyprowadzane przy użyciu elementów [logiki programu](https://en.wikipedia.org/wiki/Logic_programming), które pozwalają na formalne wnioskowanie o właściwościach programu. Logika programu ma formalne reguły, które wyrażają (w języku matematycznym) oczekiwane zachowanie programu. Do tworzenia specyfikacji formalnych wykorzystuje się różne logiki programów, w tym [logikę osiągalności](https://en.wikipedia.org/wiki/Reachability_problem), [logikę temporalną](https://en.wikipedia.org/wiki/Temporal_logic) i [logikę Hoare'a](https://en.wikipedia.org/wiki/Hoare_logic).

Specyfikacje formalne dla inteligentnych kontraktów można ogólnie podzielić na specyfikacje **wysokiego poziomu** lub **niskiego poziomu**. Niezależnie od tego, do jakiej kategorii należy specyfikacja, musi ona odpowiednio i jednoznacznie opisywać właściwość analizowanego systemu.

### Specyfikacje wysokiego poziomu {#high-level-specifications}

Jak sama nazwa wskazuje, specyfikacja wysokiego poziomu (nazywana również „specyfikacją zorientowaną na model”) opisuje zachowanie programu na wysokim poziomie. Specyfikacje wysokiego poziomu modelują inteligentny kontrakt jako [maszynę skończenie stanową](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), która może przechodzić między stanami poprzez wykonywanie operacji, przy czym logika temporalna służy do definiowania formalnych właściwości dla modelu FSM.

[Logiki temporalne](https://en.wikipedia.org/wiki/Temporal_logic) to „reguły wnioskowania o zdaniach kwalifikowanych w czasie (np. „_zawsze_ jestem głodny” lub „_w końcu_ będę głodny”).” W zastosowaniu do weryfikacji formalnej logiki temporalne służą do formułowania asercji na temat poprawnego zachowania systemów modelowanych jako maszyny stanowe. W szczególności logika temporalna opisuje przyszłe stany, w jakich może znajdować się inteligentny kontrakt, oraz sposób, w jaki przechodzi on między stanami.

Specyfikacje wysokiego poziomu ogólnie ujmują dwie krytyczne właściwości temporalne dla inteligentnych kontraktów: **bezpieczeństwo** i **żywotność**. Właściwości bezpieczeństwa reprezentują ideę, że „nigdy nie dzieje się nic złego” i zazwyczaj wyrażają niezmienniczość. Właściwość bezpieczeństwa może definiować ogólne wymagania dotyczące oprogramowania, takie jak brak [zakleszczenia](https://www.techtarget.com/whatis/definition/deadlock), lub wyrażać właściwości specyficzne dla domeny kontraktów (np. niezmienniki kontroli dostępu do funkcji, dopuszczalne wartości zmiennych stanu lub warunki transferów tokenów).

Weźmy na przykład to wymaganie bezpieczeństwa, które obejmuje warunki korzystania z `transfer()` lub `transferFrom()` w kontraktach tokenów ERC-20: _„Saldo nadawcy nigdy nie jest niższe niż żądana liczba tokenów do wysłania”_. Ten opis niezmiennika kontraktu w języku naturalnym można przetłumaczyć na specyfikację formalną (matematyczną), którą można następnie rygorystycznie sprawdzić pod kątem poprawności.

Właściwości żywotności zapewniają, że „w końcu dzieje się coś dobrego” i dotyczą zdolności kontraktu do przechodzenia przez różne stany. Przykładem właściwości żywotności jest „płynność”, która odnosi się do zdolności kontraktu do transferu jego sald do użytkowników na żądanie. Jeśli ta właściwość zostanie naruszona, użytkownicy nie będą mogli wypłacić aktywów przechowywanych w kontrakcie, tak jak miało to miejsce w przypadku [incydentu z portfelem Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Specyfikacje niskiego poziomu {#low-level-specifications}

Specyfikacje wysokiego poziomu przyjmują za punkt wyjścia model skończenie stanowy kontraktu i definiują pożądane właściwości tego modelu. Z kolei specyfikacje niskiego poziomu (nazywane również „specyfikacjami zorientowanymi na właściwości”) często modelują programy (inteligentne kontrakty) jako systemy składające się ze zbioru funkcji matematycznych i opisują poprawne zachowanie takich systemów.

Mówiąc prościej, specyfikacje niskiego poziomu analizują _ślady programu_ i próbują zdefiniować właściwości inteligentnego kontraktu na podstawie tych śladów. Ślady odnoszą się do sekwencji wywołań funkcji, które zmieniają stan inteligentnego kontraktu; stąd specyfikacje niskiego poziomu pomagają określić wymagania dotyczące wewnętrznego wykonania kontraktu.

Formalne specyfikacje niskiego poziomu mogą być podane jako właściwości w stylu Hoare'a lub niezmienniki na ścieżkach wykonania.

### Właściwości w stylu Hoare'a {#hoare-style-properties}

[Logika Hoare'a](https://en.wikipedia.org/wiki/Hoare_logic) zapewnia zestaw formalnych reguł do wnioskowania o poprawności programów, w tym inteligentnych kontraktów. Właściwość w stylu Hoare'a jest reprezentowana przez trójkę Hoare'a `{P}c{Q}`, gdzie `c` to program, a `P` i `Q` to predykaty dotyczące stanu `c` (tj. programu), formalnie opisane odpowiednio jako _warunki wstępne_ i _warunki końcowe_.

Warunek wstępny to predykat opisujący warunki wymagane do poprawnego wykonania funkcji; użytkownicy wywołujący kontrakt muszą spełnić to wymaganie. Warunek końcowy to predykat opisujący warunek, który funkcja ustanawia, jeśli zostanie poprawnie wykonana; użytkownicy mogą oczekiwać, że ten warunek będzie prawdziwy po wywołaniu funkcji. _Niezmiennik_ w logice Hoare'a to predykat, który jest zachowywany przez wykonanie funkcji (tj. nie zmienia się).

Specyfikacje w stylu Hoare'a mogą gwarantować _częściową poprawność_ lub _całkowitą poprawność_. Implementacja funkcji kontraktu jest „częściowo poprawna”, jeśli warunek wstępny jest prawdziwy przed wykonaniem funkcji, a jeśli wykonanie się zakończy, warunek końcowy jest również prawdziwy. Dowód całkowitej poprawności uzyskuje się, jeśli warunek wstępny jest prawdziwy przed wykonaniem funkcji, wykonanie na pewno się zakończy, a gdy to nastąpi, warunek końcowy będzie prawdziwy.

Uzyskanie dowodu całkowitej poprawności jest trudne, ponieważ niektóre wykonania mogą się opóźniać przed zakończeniem lub nigdy się nie zakończyć. Niemniej jednak kwestia tego, czy wykonanie się zakończy, jest prawdopodobnie bezprzedmiotowa, ponieważ mechanizm gazu w Ethereum zapobiega nieskończonym pętlom programu (wykonanie kończy się pomyślnie lub z powodu błędu braku gazu).

Specyfikacje inteligentnych kontraktów utworzone przy użyciu logiki Hoare'a będą miały zdefiniowane warunki wstępne, warunki końcowe i niezmienniki dla wykonania funkcji i pętli w kontrakcie. Warunki wstępne często uwzględniają możliwość błędnych danych wejściowych do funkcji, a warunki końcowe opisują oczekiwaną reakcję na takie dane wejściowe (np. zgłoszenie określonego wyjątku). W ten sposób właściwości w stylu Hoare'a są skuteczne w zapewnianiu poprawności implementacji kontraktów.

Wiele frameworków weryfikacji formalnej wykorzystuje specyfikacje w stylu Hoare'a do dowodzenia semantycznej poprawności funkcji. Możliwe jest również dodanie właściwości w stylu Hoare'a (jako asercji) bezpośrednio do kodu kontraktu za pomocą instrukcji `require` i `assert` w Solidity.

Instrukcje `require` wyrażają warunek wstępny lub niezmiennik i są często używane do walidacji danych wejściowych użytkownika, podczas gdy `assert` przechwytuje warunek końcowy niezbędny dla bezpieczeństwa. Na przykład właściwą kontrolę dostępu do funkcji (przykład właściwości bezpieczeństwa) można osiągnąć, używając `require` jako sprawdzenia warunku wstępnego tożsamości konta wywołującego. Podobnie niezmiennik dotyczący dopuszczalnych wartości zmiennych stanu w kontrakcie (np. całkowitej liczby tokenów w obiegu) można chronić przed naruszeniem, używając `assert` do potwierdzenia stanu kontraktu po wykonaniu funkcji.

### Właściwości na poziomie śladu {#trace-level-properties}

Specyfikacje oparte na śladach opisują operacje, które przenoszą kontrakt między różnymi stanami, oraz relacje między tymi operacjami. Jak wyjaśniono wcześniej, ślady to sekwencje operacji, które w określony sposób zmieniają stan kontraktu.

Podejście to opiera się na modelu inteligentnych kontraktów jako systemów przejść stanów z pewnymi predefiniowanymi stanami (opisanymi przez zmienne stanu) wraz z zestawem predefiniowanych przejść (opisanych przez funkcje kontraktu). Ponadto do opisu semantyki operacyjnej kontraktu często używa się [grafu przepływu sterowania](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), który jest graficzną reprezentacją przepływu wykonania programu. Tutaj każdy ślad jest reprezentowany jako ścieżka na grafie przepływu sterowania.

Przede wszystkim specyfikacje na poziomie śladu służą do wnioskowania o wzorcach wewnętrznego wykonania w inteligentnych kontraktach. Tworząc specyfikacje na poziomie śladu, zapewniamy dopuszczalne ścieżki wykonania (tj. przejścia stanów) dla inteligentnego kontraktu. Korzystając z technik takich jak wykonanie symboliczne, możemy formalnie zweryfikować, czy wykonanie nigdy nie podąża ścieżką niezdefiniowaną w modelu formalnym.

Użyjmy przykładu kontraktu [DAO](/dao/), który ma kilka publicznie dostępnych funkcji, aby opisać właściwości na poziomie śladu. Tutaj zakładamy, że kontrakt DAO pozwala użytkownikom na wykonywanie następujących operacji:

- Deponowanie środków

- Głosowanie nad propozycją po zdeponowaniu środków

- Zgłoszenie roszczenia o zwrot, jeśli nie zagłosują nad propozycją

Przykładowymi właściwościami na poziomie śladu mogą być: _„użytkownicy, którzy nie zdeponują środków, nie mogą głosować nad propozycją”_ lub _„użytkownicy, którzy nie głosują nad propozycją, powinni zawsze móc odebrać zwrot”_. Obie właściwości zapewniają preferowane sekwencje wykonania (głosowanie nie może nastąpić _przed_ zdeponowaniem środków, a odebranie zwrotu nie może nastąpić _po_ głosowaniu nad propozycją).

## Techniki weryfikacji formalnej inteligentnych kontraktów {#formal-verification-techniques}

### Sprawdzanie modelowe (Model checking) {#model-checking}

Sprawdzanie modelowe to technika weryfikacji formalnej, w której algorytm sprawdza model formalny inteligentnego kontraktu pod kątem jego specyfikacji. W sprawdzaniu modelowym inteligentne kontrakty są często reprezentowane jako systemy przejść stanów, podczas gdy właściwości dotyczące dopuszczalnych stanów kontraktu są definiowane przy użyciu logiki temporalnej.

Sprawdzanie modelowe wymaga stworzenia abstrakcyjnej matematycznej reprezentacji systemu (tj. kontraktu) i wyrażenia właściwości tego systemu za pomocą formuł zakorzenionych w [rachunku zdań](https://www.baeldung.com/cs/propositional-logic). Upraszcza to zadanie algorytmu sprawdzania modelowego, a mianowicie udowodnienie, że model matematyczny spełnia daną formułę logiczną.

Sprawdzanie modelowe w weryfikacji formalnej służy przede wszystkim do oceny właściwości temporalnych, które opisują zachowanie kontraktu w czasie. Właściwości temporalne dla inteligentnych kontraktów obejmują _bezpieczeństwo_ i _żywotność_, które wyjaśniliśmy wcześniej.

Na przykład właściwość bezpieczeństwa związana z kontrolą dostępu (np. _Tylko właściciel kontraktu może wywołać `selfdestruct`_) może zostać zapisana w logice formalnej. Następnie algorytm sprawdzania modelowego może zweryfikować, czy kontrakt spełnia tę formalną specyfikację.

Sprawdzanie modelowe wykorzystuje eksplorację przestrzeni stanów, która polega na konstruowaniu wszystkich możliwych stanów inteligentnego kontraktu i próbie znalezienia osiągalnych stanów, które skutkują naruszeniem właściwości. Może to jednak prowadzić do nieskończonej liczby stanów (znanej jako „problem eksplozji stanów”), dlatego narzędzia do sprawdzania modelowego opierają się na technikach abstrakcji, aby umożliwić wydajną analizę inteligentnych kontraktów.

### Dowodzenie twierdzeń (Theorem proving) {#theorem-proving}

Dowodzenie twierdzeń to metoda matematycznego wnioskowania o poprawności programów, w tym inteligentnych kontraktów. Polega na przekształceniu modelu systemu kontraktu i jego specyfikacji w formuły matematyczne (zdania logiczne).

Celem dowodzenia twierdzeń jest weryfikacja logicznej równoważności między tymi zdaniami. „Równoważność logiczna” (nazywana również „biimplikacją logiczną”) to rodzaj relacji między dwoma zdaniami, w której pierwsze zdanie jest prawdziwe _wtedy i tylko wtedy_, gdy drugie zdanie jest prawdziwe.

Wymagana relacja (równoważność logiczna) między zdaniami o modelu kontraktu a jego właściwością jest formułowana jako zdanie możliwe do udowodnienia (zwane twierdzeniem). Korzystając z formalnego systemu wnioskowania, zautomatyzowany prover twierdzeń może zweryfikować prawdziwość twierdzenia. Innymi słowy, prover twierdzeń może ostatecznie udowodnić, że model inteligentnego kontraktu dokładnie odpowiada jego specyfikacjom.

Podczas gdy sprawdzanie modelowe modeluje kontrakty jako systemy przejść ze skończonymi stanami, dowodzenie twierdzeń może poradzić sobie z analizą systemów o nieskończonej liczbie stanów. Oznacza to jednak, że zautomatyzowany prover twierdzeń nie zawsze może wiedzieć, czy problem logiczny jest „rozstrzygalny”, czy nie.

W rezultacie często wymagana jest pomoc człowieka, aby pokierować proverem twierdzeń w wyprowadzaniu dowodów poprawności. Wykorzystanie wysiłku ludzkiego w dowodzeniu twierdzeń sprawia, że jest ono droższe w użyciu niż sprawdzanie modelowe, które jest w pełni zautomatyzowane.

### Wykonanie symboliczne {#symbolic-execution}

Wykonanie symboliczne to metoda analizy inteligentnego kontraktu poprzez wykonywanie funkcji przy użyciu _wartości symbolicznych_ (np. `x > 5`) zamiast _wartości konkretnych_ (np. `x == 5`). Jako technika weryfikacji formalnej, wykonanie symboliczne służy do formalnego wnioskowania o właściwościach na poziomie śladu w kodzie kontraktu.

Wykonanie symboliczne reprezentuje ślad wykonania jako formułę matematyczną na symbolicznych wartościach wejściowych, zwaną inaczej _predykatem ścieżki_. [Solwer SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) służy do sprawdzania, czy predykat ścieżki jest „spełnialny” (tj. czy istnieje wartość, która może spełnić formułę). Jeśli podatna na ataki ścieżka jest spełnialna, solwer SMT wygeneruje konkretną wartość, która skieruje wykonanie na tę ścieżkę.

Załóżmy, że funkcja inteligentnego kontraktu przyjmuje jako dane wejściowe wartość `uint` (`x`) i cofa transakcję (revert), gdy `x` jest większe niż `5` i jednocześnie mniejsze niż `10`. Znalezienie wartości dla `x`, która wyzwala błąd przy użyciu normalnej procedury testowej, wymagałoby przejrzenia dziesiątek przypadków testowych (lub więcej) bez pewności, że faktycznie znajdzie się dane wejściowe wyzwalające błąd.

Z kolei narzędzie do wykonania symbolicznego wykonałoby funkcję z wartością symboliczną: `X > 5 ∧ X < 10` (tj. `x` jest większe niż 5 ORAZ `x` jest mniejsze niż 10). Powiązany predykat ścieżki `x = X > 5 ∧ X < 10` zostałby następnie przekazany do solwera SMT w celu rozwiązania. Jeśli określona wartość spełnia formułę `x = X > 5 ∧ X < 10`, solwer SMT ją obliczy – na przykład solwer może wygenerować `7` jako wartość dla `x`.

Ponieważ wykonanie symboliczne opiera się na danych wejściowych do programu, a zbiór danych wejściowych do zbadania wszystkich osiągalnych stanów jest potencjalnie nieskończony, nadal jest to forma testowania. Jednak, jak pokazano na przykładzie, wykonanie symboliczne jest bardziej wydajne niż zwykłe testowanie w znajdowaniu danych wejściowych, które wyzwalają naruszenia właściwości.

Co więcej, wykonanie symboliczne generuje mniej fałszywych alarmów (false positives) niż inne techniki oparte na właściwościach (np. fuzzing), które losowo generują dane wejściowe do funkcji. Jeśli stan błędu zostanie wyzwolony podczas wykonania symbolicznego, możliwe jest wygenerowanie konkretnej wartości, która wyzwala błąd i odtworzenie problemu.

Wykonanie symboliczne może również zapewnić pewien stopień matematycznego dowodu poprawności. Rozważmy następujący przykład funkcji kontraktu z ochroną przed przepełnieniem:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Ślad wykonania, który skutkuje przepełnieniem liczby całkowitej, musiałby spełniać formułę: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Taka formuła jest mało prawdopodobna do rozwiązania, stąd służy jako matematyczny dowód, że funkcja `safe_add` nigdy nie ulega przepełnieniu.

### Dlaczego warto stosować weryfikację formalną dla inteligentnych kontraktów? {#benefits-of-formal-verification}

#### Potrzeba niezawodności {#need-for-reliability}

Weryfikacja formalna służy do oceny poprawności systemów o krytycznym znaczeniu dla bezpieczeństwa, których awaria może mieć katastrofalne skutki, takie jak śmierć, obrażenia lub ruina finansowa. Inteligentne kontrakty to aplikacje o wysokiej wartości, kontrolujące ogromne kwoty, a proste błędy w projekcie mogą prowadzić do [nieodwracalnych strat dla użytkowników](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Jednak formalna weryfikacja kontraktu przed wdrożeniem może zwiększyć gwarancje, że będzie on działał zgodnie z oczekiwaniami po uruchomieniu na blockchainie.

Niezawodność jest wysoce pożądaną cechą każdego inteligentnego kontraktu, zwłaszcza że kod wdrożony w Maszynie Wirtualnej [Ethereum](/) (EVM) jest zazwyczaj niezmienny. Ponieważ aktualizacje po uruchomieniu nie są łatwo dostępne, potrzeba zagwarantowania niezawodności kontraktów sprawia, że weryfikacja formalna jest konieczna. Weryfikacja formalna jest w stanie wykryć trudne problemy, takie jak niedomiar i przepełnienie liczb całkowitych, ataki re-entrancy oraz słabe optymalizacje gazu, które mogą umknąć audytorom i testerom.

#### Dowód poprawności funkcjonalnej {#prove-functional-correctness}

Testowanie programu jest najczęstszą metodą dowodzenia, że inteligentny kontrakt spełnia pewne wymagania. Polega to na wykonaniu kontraktu z próbką danych, które ma obsługiwać, i analizie jego zachowania. Jeśli kontrakt zwraca oczekiwane wyniki dla danych z próbki, deweloperzy mają obiektywny dowód jego poprawności.

Jednak to podejście nie może dowieść poprawnego wykonania dla wartości wejściowych, które nie są częścią próbki. Dlatego testowanie kontraktu może pomóc w wykryciu błędów (tj. jeśli niektóre ścieżki kodu nie zwracają pożądanych wyników podczas wykonywania), ale **nie może ostatecznie dowieść braku błędów**.

Z kolei weryfikacja formalna może formalnie dowieść, że inteligentny kontrakt spełnia wymagania dla nieskończonego zakresu wykonań _bez_ uruchamiania kontraktu w ogóle. Wymaga to stworzenia formalnej specyfikacji, która precyzyjnie opisuje poprawne zachowania kontraktu, oraz opracowania formalnego (matematycznego) modelu systemu kontraktu. Następnie możemy postępować zgodnie z formalną procedurą dowodową, aby sprawdzić spójność między modelem kontraktu a jego specyfikacją.

Dzięki weryfikacji formalnej kwestia sprawdzenia, czy logika biznesowa kontraktu spełnia wymagania, jest twierdzeniem matematycznym, które można udowodnić lub obalić. Formalnie dowodząc twierdzenia, możemy zweryfikować nieskończoną liczbę przypadków testowych za pomocą skończonej liczby kroków. W ten sposób weryfikacja formalna ma lepsze perspektywy udowodnienia, że kontrakt jest poprawny funkcjonalnie w odniesieniu do specyfikacji.

#### Idealne cele weryfikacji {#ideal-verification-targets}

Cel weryfikacji opisuje system, który ma zostać poddany weryfikacji formalnej. Weryfikacja formalna najlepiej sprawdza się w „systemach wbudowanych” (małych, prostych fragmentach oprogramowania, które stanowią część większego systemu). Są one również idealne dla wyspecjalizowanych domen, które mają niewiele reguł, ponieważ ułatwia to modyfikowanie narzędzi do weryfikacji właściwości specyficznych dla domeny.

Inteligentne kontrakty – przynajmniej do pewnego stopnia – spełniają oba te wymagania. Na przykład niewielki rozmiar kontraktów Ethereum sprawia, że są one podatne na weryfikację formalną. Podobnie EVM przestrzega prostych reguł, co ułatwia specyfikowanie i weryfikację właściwości semantycznych dla programów działających w EVM.

### Szybszy cykl rozwoju {#faster-development-cycle}

Techniki weryfikacji formalnej, takie jak sprawdzanie modelowe i wykonanie symboliczne, są na ogół bardziej wydajne niż zwykła analiza kodu inteligentnego kontraktu (przeprowadzana podczas testowania lub audytu). Dzieje się tak, ponieważ weryfikacja formalna opiera się na wartościach symbolicznych do testowania asercji („co jeśli użytkownik spróbuje wypłacić _n_ etherów?”), w przeciwieństwie do testowania, które wykorzystuje konkretne wartości („co jeśli użytkownik spróbuje wypłacić 5 etherów?”).

Symboliczne zmienne wejściowe mogą obejmować wiele klas konkretnych wartości, więc podejścia oparte na weryfikacji formalnej obiecują większe pokrycie kodu w krótszym czasie. Skutecznie stosowana weryfikacja formalna może przyspieszyć cykl rozwoju dla deweloperów.

Weryfikacja formalna usprawnia również proces budowania zdecentralizowanych aplikacji (dapp) poprzez redukcję kosztownych błędów projektowych. Aktualizacja kontraktów (tam, gdzie to możliwe) w celu naprawy luk wymaga obszernego przepisywania baz kodu i większego wysiłku włożonego w rozwój. Weryfikacja formalna może wykryć wiele błędów w implementacjach kontraktów, które mogą umknąć testerom i audytorom, i zapewnia szerokie możliwości naprawienia tych problemów przed wdrożeniem kontraktu.

## Wady weryfikacji formalnej {#drawbacks-of-formal-verification}

### Koszt pracy ręcznej {#cost-of-manual-labor}

Weryfikacja formalna, zwłaszcza weryfikacja półautomatyczna, w której człowiek kieruje proverem w celu wyprowadzenia dowodów poprawności, wymaga znacznej pracy ręcznej. Ponadto tworzenie specyfikacji formalnej jest złożoną czynnością, która wymaga wysokiego poziomu umiejętności.

Te czynniki (wysiłek i umiejętności) sprawiają, że weryfikacja formalna jest bardziej wymagająca i kosztowna w porównaniu ze zwykłymi metodami oceny poprawności kontraktów, takimi jak testowanie i audyty. Niemniej jednak poniesienie kosztów pełnego audytu weryfikacyjnego jest praktyczne, biorąc pod uwagę koszty błędów w implementacjach inteligentnych kontraktów.

### Fałszywie negatywne wyniki (False negatives) {#false-negatives}

Weryfikacja formalna może jedynie sprawdzić, czy wykonanie inteligentnego kontraktu jest zgodne z formalną specyfikacją. W związku z tym ważne jest, aby upewnić się, że specyfikacja właściwie opisuje oczekiwane zachowania inteligentnego kontraktu.

Jeśli specyfikacje są źle napisane, naruszenia właściwości – które wskazują na podatne na ataki wykonania – nie mogą zostać wykryte przez audyt weryfikacji formalnej. W takim przypadku deweloper może błędnie założyć, że kontrakt jest wolny od błędów.

### Problemy z wydajnością {#performance-issues}

Weryfikacja formalna napotyka na szereg problemów z wydajnością. Na przykład problemy z eksplozją stanów i ścieżek napotykane odpowiednio podczas sprawdzania modelowego i sprawdzania symbolicznego mogą wpływać na procedury weryfikacji. Ponadto narzędzia do weryfikacji formalnej często wykorzystują solwery SMT i inne solwery ograniczeń w swojej warstwie bazowej, a te solwery opierają się na procedurach wymagających dużej mocy obliczeniowej.

Ponadto weryfikatory programów nie zawsze są w stanie określić, czy właściwość (opisana jako formuła logiczna) może zostać spełniona, czy nie („[problem rozstrzygalności](https://en.wikipedia.org/wiki/Decision_problem)”), ponieważ program może nigdy się nie zakończyć. W związku z tym udowodnienie niektórych właściwości kontraktu może być niemożliwe, nawet jeśli jest on dobrze wyspecyfikowany.

## Narzędzia do weryfikacji formalnej dla inteligentnych kontraktów Ethereum {#formal-verification-tools}

### Języki specyfikacji do tworzenia specyfikacji formalnych {#specification-languages}

**Act**: _*Act pozwala na specyfikację aktualizacji pamięci masowej, warunków wstępnych/końcowych i niezmienników kontraktu. Jego pakiet narzędzi posiada również backendy dowodowe zdolne do udowodnienia wielu właściwości za pomocą Coq, solwerów SMT lub hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Dokumentacja](https://github.com/argotorg/act)

**Scribble** - _*Scribble przekształca adnotacje kodu w języku specyfikacji Scribble w konkretne asercje, które sprawdzają specyfikację.*_

- [Dokumentacja](https://docs.scribble.codes/)

**Dafny** - _*Dafny to gotowy do weryfikacji język programowania, który opiera się na adnotacjach wysokiego poziomu w celu wnioskowania i dowodzenia poprawności kodu.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Weryfikatory programów do sprawdzania poprawności {#program-verifiers}

**Certora Prover** - _Certora Prover to automatyczne narzędzie do weryfikacji formalnej służące do sprawdzania poprawności kodu w inteligentnych kontraktach. Specyfikacje są pisane w CVL (Certora Verification Language), a naruszenia właściwości są wykrywane za pomocą kombinacji analizy statycznej i rozwiązywania ograniczeń._

- [Strona internetowa](https://www.certora.com/)
- [Dokumentacja](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*SMTChecker w Solidity to wbudowane narzędzie do sprawdzania modelowego oparte na SMT (Satisfiability Modulo Theories) i rozwiązywaniu klauzul Horna. Potwierdza, czy kod źródłowy kontraktu jest zgodny ze specyfikacjami podczas kompilacji i statycznie sprawdza naruszenia właściwości bezpieczeństwa.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify to rozszerzona wersja kompilatora Solidity, która może przeprowadzać zautomatyzowaną weryfikację formalną kodu Solidity przy użyciu adnotacji i modułowej weryfikacji programu.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM to formalna semantyka Maszyny Wirtualnej Ethereum (EVM) napisana we frameworku K. KEVM jest wykonywalny i może udowodnić pewne asercje związane z właściwościami przy użyciu logiki osiągalności.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Dokumentacja](https://jellopaper.org/)

### Ramy logiczne do dowodzenia twierdzeń {#theorem-provers}

**Isabelle** - _Isabelle/HOL to asystent dowodzenia, który pozwala na wyrażanie formuł matematycznych w języku formalnym i dostarcza narzędzi do dowodzenia tych formuł. Głównym zastosowaniem jest formalizacja dowodów matematycznych, a w szczególności weryfikacja formalna, która obejmuje dowodzenie poprawności sprzętu komputerowego lub oprogramowania oraz dowodzenie właściwości języków komputerowych i protokołów._

- [GitHub](https://github.com/isabelle-prover)
- [Dokumentacja](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq to interaktywny prover twierdzeń, który pozwala definiować programy za pomocą twierdzeń i interaktywnie generować sprawdzone maszynowo dowody poprawności._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Dokumentacja](https://rocq-prover.org/docs)

### Narzędzia oparte na wykonaniu symbolicznym do wykrywania podatnych na ataki wzorców w inteligentnych kontraktach {#symbolic-execution-tools}

**Manticore** - _*Narzędzie do analizy kodu bajtowego EVM oparte na wykonaniu symbolicznym*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentacja](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm to silnik wykonania symbolicznego i narzędzie do sprawdzania równoważności dla kodu bajtowego EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Narzędzie do wykonania symbolicznego służące do wykrywania luk w inteligentnych kontraktach Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Dokumentacja](https://mythril-classic.readthedocs.io/en/develop/)

## Dalsza lektura {#further-reading}

- [Jak działa weryfikacja formalna inteligentnych kontraktów](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Przegląd projektów weryfikacji formalnej w ekosystemie Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Kompleksowa weryfikacja formalna inteligentnego kontraktu depozytowego Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Formalna weryfikacja najpopularniejszego na świecie inteligentnego kontraktu](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker i weryfikacja formalna](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)