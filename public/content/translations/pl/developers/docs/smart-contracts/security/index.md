---
title: "Bezpieczeństwo inteligentnych kontraktów"
description: "Przegląd wytycznych dotyczących tworzenia bezpiecznych inteligentnych kontraktów w Ethereum"
lang: pl
---

Inteligentne kontrakty są niezwykle elastyczne i potrafią kontrolować ogromne ilości wartości oraz danych, jednocześnie wykonując niezmienną logikę opartą na kodzie wdrożonym na blockchainie. Stworzyło to tętniący życiem ekosystem niewymagających zaufania i zdecentralizowanych aplikacji, które zapewniają wiele korzyści w porównaniu ze starszymi systemami. Stanowią one również okazję dla atakujących, którzy chcą czerpać zyski z wykorzystywania luk w zabezpieczeniach inteligentnych kontraktów.

Publiczne blockchainy, takie jak [Ethereum](/), dodatkowo komplikują kwestię zabezpieczania inteligentnych kontraktów. Wdrożony kod kontraktu _zazwyczaj_ nie może zostać zmieniony w celu załatania luk w zabezpieczeniach, podczas gdy aktywa skradzione z inteligentnych kontraktów są niezwykle trudne do wyśledzenia i w większości niemożliwe do odzyskania ze względu na niezmienność.

Choć szacunki są różne, ocenia się, że całkowita wartość skradziona lub utracona z powodu luk w zabezpieczeniach inteligentnych kontraktów z łatwością przekracza 1 miliard dolarów. Obejmuje to głośne incydenty, takie jak [atak na DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (skradziono 3,6 mln ETH, wartych ponad 1 mld USD w dzisiejszych cenach), [atak na portfel wielopodpisowy Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (30 mln USD utraconych na rzecz hakerów) oraz [problem zamrożonego portfela Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (ponad 300 mln USD w ETH zablokowanych na zawsze).

Wyżej wymienione problemy sprawiają, że programiści muszą koniecznie inwestować wysiłek w tworzenie bezpiecznych, solidnych i odpornych inteligentnych kontraktów. Bezpieczeństwo inteligentnych kontraktów to poważna sprawa, z którą każdy programista powinien się zapoznać. Ten przewodnik omówi kwestie bezpieczeństwa dla programistów Ethereum i przedstawi zasoby pozwalające na poprawę bezpieczeństwa inteligentnych kontraktów.

## Wymagania wstępne {#prerequisites}

Upewnij się, że znasz [podstawy tworzenia inteligentnych kontraktów](/developers/docs/smart-contracts/), zanim zajmiesz się bezpieczeństwem.

## Wytyczne dotyczące tworzenia bezpiecznych inteligentnych kontraktów Ethereum {#smart-contract-security-guidelines}

### 1. Zaprojektuj odpowiednie kontrole dostępu {#design-proper-access-controls}

W inteligentnych kontraktach funkcje oznaczone jako `public` lub `external` mogą być wywoływane przez dowolne konta posiadane zewnętrznie (EOA) lub konta kontraktów. Określenie publicznej widoczności funkcji jest konieczne, jeśli chcesz, aby inni mogli wchodzić w interakcje z Twoim kontraktem. Jednak funkcje oznaczone jako `private` mogą być wywoływane tylko przez funkcje wewnątrz inteligentnego kontraktu, a nie przez konta zewnętrzne. Zapewnienie każdemu uczestnikowi sieci dostępu do funkcji kontraktu może powodować problemy, zwłaszcza jeśli oznacza to, że każdy może wykonywać wrażliwe operacje (np. wybijanie nowych tokenów).

Aby zapobiec nieautoryzowanemu użyciu funkcji inteligentnego kontraktu, konieczne jest wdrożenie bezpiecznych kontroli dostępu. Mechanizmy kontroli dostępu ograniczają możliwość korzystania z określonych funkcji w inteligentnym kontrakcie do zatwierdzonych podmiotów, takich jak konta odpowiedzialne za zarządzanie kontraktem. **Wzorzec Ownable** i **kontrola oparta na rolach** to dwa wzorce przydatne do wdrażania kontroli dostępu w inteligentnych kontraktach:

#### Wzorzec Ownable {#ownable-pattern}

We wzorcu Ownable adres jest ustawiany jako „właściciel” kontraktu podczas procesu jego tworzenia. Chronionym funkcjom przypisuje się modyfikator `OnlyOwner`, który zapewnia, że kontrakt uwierzytelnia tożsamość adresu wywołującego przed wykonaniem funkcji. Wywołania chronionych funkcji z adresów innych niż właściciel kontraktu zawsze powodują wycofanie, zapobiegając niepożądanemu dostępowi.

#### Kontrola dostępu oparta na rolach {#role-based-access-control}

Rejestracja pojedynczego adresu jako `Owner` w inteligentnym kontrakcie wprowadza ryzyko centralizacji i stanowi pojedynczy punkt awarii. Jeśli klucze konta właściciela zostaną przejęte, atakujący mogą zaatakować posiadany kontrakt. Dlatego użycie wzorca kontroli dostępu opartego na rolach z wieloma kontami administracyjnymi może być lepszą opcją.

W kontroli dostępu opartej na rolach dostęp do wrażliwych funkcji jest rozdzielony między grupę zaufanych uczestników. Na przykład jedno konto może być odpowiedzialne za wybijanie tokenów, podczas gdy inne konto wykonuje aktualizacje lub wstrzymuje kontrakt. Zdecentralizowanie kontroli dostępu w ten sposób eliminuje pojedyncze punkty awarii i zmniejsza założenia dotyczące zaufania dla użytkowników.

##### Korzystanie z portfeli z wielopodpisem {#}

Innym podejściem do wdrożenia bezpiecznej kontroli dostępu jest użycie [konta z wielopodpisem](/developers/docs/smart-contracts/#multisig) do zarządzania kontraktem. W przeciwieństwie do zwykłego EOA, konta z wielopodpisem są własnością wielu podmiotów i wymagają podpisów od minimalnej liczby kont — powiedzmy 3 z 5 — do wykonania transakcji.

Użycie multisig do kontroli dostępu wprowadza dodatkową warstwę bezpieczeństwa, ponieważ działania na docelowym kontrakcie wymagają zgody wielu stron. Jest to szczególnie przydatne, jeśli konieczne jest użycie wzorca Ownable, ponieważ utrudnia to atakującemu lub nieuczciwemu pracownikowi manipulowanie wrażliwymi funkcjami kontraktu w złośliwych celach.

### 2. Używaj instrukcji require(), assert() i revert() do ochrony operacji kontraktu {#use-require-assert-revert}

Jak wspomniano, każdy może wywoływać publiczne funkcje w Twoim inteligentnym kontrakcie po jego wdrożeniu na blockchainie. Ponieważ nie możesz z góry wiedzieć, w jaki sposób konta zewnętrzne będą wchodzić w interakcje z kontraktem, idealnym rozwiązaniem jest wdrożenie wewnętrznych zabezpieczeń przed problematycznymi operacjami przed wdrożeniem. Możesz wymusić prawidłowe zachowanie w inteligentnych kontraktach, używając instrukcji `require()`, `assert()` i `revert()` do wyzwalania wyjątków i wycofywania zmian stanu, jeśli wykonanie nie spełni określonych wymagań.

**`require()`**: Instrukcje `require` są definiowane na początku funkcji i zapewniają spełnienie z góry określonych warunków przed wykonaniem wywołanej funkcji. Instrukcja `require` może być użyta do walidacji danych wejściowych użytkownika, sprawdzania zmiennych stanu lub uwierzytelniania tożsamości konta wywołującego przed przejściem do funkcji.

**`assert()`**: Asercja `assert()` służy do wykrywania błędów wewnętrznych i sprawdzania naruszeń „niezmienników” w kodzie. Niezmiennik to logiczna asercja dotycząca stanu kontraktu, która powinna być prawdziwa dla wszystkich wykonań funkcji. Przykładowym niezmiennikiem jest maksymalna całkowita podaż lub saldo kontraktu tokena. Użycie `assert()` zapewnia, że Twój kontrakt nigdy nie osiągnie podatnego na ataki stanu, a jeśli tak się stanie, wszystkie zmiany zmiennych stanu zostaną wycofane.

**`revert()`**: Instrukcja `revert()` może być użyta w instrukcji if-else, która wyzwala wyjątek, jeśli wymagany warunek nie jest spełniony. Poniższy przykładowy kontrakt używa `revert()` do ochrony wykonywania funkcji:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Wykonaj zakup.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testuj inteligentne kontrakty i weryfikuj poprawność kodu {#test-smart-contracts-and-verify-code-correctness}

Niezmienność kodu działającego w [Maszynie Wirtualnej Ethereum](/developers/docs/evm/) oznacza, że inteligentne kontrakty wymagają wyższego poziomu oceny jakości w fazie rozwoju. Dokładne testowanie kontraktu i obserwowanie go pod kątem nieoczekiwanych wyników znacznie poprawi bezpieczeństwo i ochroni użytkowników na dłuższą metę.

Zwykłą metodą jest pisanie małych testów jednostkowych przy użyciu fałszywych danych (mock data), których kontrakt ma oczekiwać od użytkowników. [Testowanie jednostkowe](/developers/docs/smart-contracts/testing/#unit-testing) jest dobre do testowania funkcjonalności określonych funkcji i upewniania się, że inteligentny kontrakt działa zgodnie z oczekiwaniami.

Niestety, testowanie jednostkowe jest minimalnie skuteczne w poprawie bezpieczeństwa inteligentnych kontraktów, gdy jest stosowane w izolacji. Test jednostkowy może udowodnić, że funkcja wykonuje się poprawnie dla fałszywych danych, ale testy jednostkowe są tylko tak skuteczne, jak napisane testy. Utrudnia to wykrycie pominiętych przypadków brzegowych i luk w zabezpieczeniach, które mogłyby naruszyć bezpieczeństwo Twojego inteligentnego kontraktu.

Lepszym podejściem jest połączenie testowania jednostkowego z testowaniem opartym na właściwościach, wykonywanym przy użyciu [analizy statycznej i dynamicznej](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Analiza statyczna opiera się na reprezentacjach niskiego poziomu, takich jak [grafy przepływu sterowania](https://en.wikipedia.org/wiki/Control-flow_graph) i [drzewa składni abstrakcyjnej](https://deepsource.io/glossary/ast/), w celu analizy osiągalnych stanów programu i ścieżek wykonania. Tymczasem techniki analizy dynamicznej, takie jak [fuzzing inteligentnych kontraktów](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), wykonują kod kontraktu z losowymi wartościami wejściowymi w celu wykrycia operacji naruszających właściwości bezpieczeństwa.

[Weryfikacja formalna](/developers/docs/smart-contracts/formal-verification) to kolejna technika weryfikacji właściwości bezpieczeństwa w inteligentnych kontraktach. W przeciwieństwie do zwykłego testowania, weryfikacja formalna może ostatecznie udowodnić brak błędów w inteligentnym kontrakcie. Osiąga się to poprzez stworzenie formalnej specyfikacji, która ujmuje pożądane właściwości bezpieczeństwa, i udowodnienie, że formalny model kontraktów jest zgodny z tą specyfikacją.

### 4. Poproś o niezależny przegląd swojego kodu {#get-independent-code-reviews}

Po przetestowaniu kontraktu dobrze jest poprosić innych o sprawdzenie kodu źródłowego pod kątem ewentualnych problemów z bezpieczeństwem. Testowanie nie odkryje każdej wady w inteligentnym kontrakcie, ale uzyskanie niezależnego przeglądu zwiększa prawdopodobieństwo zauważenia luk w zabezpieczeniach.

#### Audyty {#audits}

Zlecenie audytu inteligentnego kontraktu to jeden ze sposobów na przeprowadzenie niezależnego przeglądu kodu. Audytorzy odgrywają ważną rolę w zapewnieniu, że inteligentne kontrakty są bezpieczne i wolne od wad jakościowych oraz błędów projektowych.

Mimo to należy unikać traktowania audytów jako złotego środka. Audyty inteligentnych kontraktów nie wyłapią każdego błędu i są w większości zaprojektowane tak, aby zapewnić dodatkową rundę przeglądów, co może pomóc w wykryciu problemów pominiętych przez programistów podczas początkowego rozwoju i testowania. Należy również przestrzegać najlepszych praktyk współpracy z audytorami, takich jak odpowiednie dokumentowanie kodu i dodawanie komentarzy w kodzie, aby zmaksymalizować korzyści z audytu inteligentnego kontraktu.

- [Wskazówki i triki dotyczące audytu inteligentnych kontraktów](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Wykorzystaj w pełni swój audyt](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Programy bug bounty {#bug-bounties}

Ustanowienie programu bug bounty to kolejne podejście do wdrażania zewnętrznych przeglądów kodu. Bug bounty to nagroda finansowa przyznawana osobom (zazwyczaj hakerom whitehat), które odkryją luki w zabezpieczeniach aplikacji.

Odpowiednio wykorzystane programy bug bounty dają członkom społeczności hakerskiej zachętę do sprawdzania Twojego kodu pod kątem krytycznych wad. Prawdziwym przykładem jest „błąd nieskończonych pieniędzy”, który pozwoliłby atakującemu na stworzenie nieograniczonej ilości etheru w sieci [Optimism](https://www.optimism.io/), protokole [warstwy 2 (L2)](/layer-2/) działającym na Ethereum. Na szczęście haker whitehat [odkrył lukę](https://www.saurik.com/optimism.html) i powiadomił zespół, [zarabiając przy tym dużą wypłatę](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Przydatną strategią jest ustalenie wypłaty z programu bug bounty proporcjonalnie do kwoty zagrożonych środków. Opisywane jako „[skalujące się bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, podejście to zapewnia zachęty finansowe dla osób do odpowiedzialnego ujawniania luk w zabezpieczeniach zamiast ich wykorzystywania.

### 5. Przestrzegaj najlepszych praktyk podczas tworzenia inteligentnych kontraktów {#follow-smart-contract-development-best-practices}

Istnienie audytów i programów bug bounty nie zwalnia Cię z odpowiedzialności za pisanie kodu wysokiej jakości. Dobre bezpieczeństwo inteligentnych kontraktów zaczyna się od przestrzegania odpowiednich procesów projektowania i rozwoju:

- Przechowuj cały kod w systemie kontroli wersji, takim jak git

- Wprowadzaj wszystkie modyfikacje kodu za pomocą pull requestów

- Upewnij się, że pull requesty mają co najmniej jednego niezależnego recenzenta — jeśli pracujesz nad projektem w pojedynkę, rozważ znalezienie innych programistów i wymianę przeglądów kodu

- Używaj [środowiska programistycznego](/developers/docs/frameworks/) do testowania, kompilacji i wdrażania inteligentnych kontraktów

- Przepuść swój kod przez podstawowe narzędzia do analizy kodu, takie jak [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril i Slither. Najlepiej byłoby to zrobić przed scaleniem każdego pull requesta i porównać różnice w wynikach

- Upewnij się, że Twój kod kompiluje się bez błędów, a kompilator Solidity nie emituje żadnych ostrzeżeń

- Odpowiednio udokumentuj swój kod (używając [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) i opisz szczegóły dotyczące architektury kontraktu w łatwym do zrozumienia języku. Ułatwi to innym audytowanie i przeglądanie Twojego kodu.

### 6. Wdróż solidne plany odzyskiwania po awarii {#implement-disaster-recovery-plans}

Zaprojektowanie bezpiecznych kontroli dostępu, wdrożenie modyfikatorów funkcji i inne sugestie mogą poprawić bezpieczeństwo inteligentnych kontraktów, ale nie mogą wykluczyć możliwości złośliwych exploitów. Budowanie bezpiecznych inteligentnych kontraktów wymaga „przygotowania się na awarię” i posiadania planu awaryjnego w celu skutecznego reagowania na ataki. Odpowiedni plan odzyskiwania po awarii będzie obejmował niektóre lub wszystkie z poniższych elementów:

#### Aktualizacje kontraktów {#contract-upgrades}

Chociaż inteligentne kontrakty Ethereum są domyślnie niezmienne, możliwe jest osiągnięcie pewnego stopnia zmienności poprzez użycie wzorców aktualizacji. Aktualizacja kontraktów jest konieczna w przypadkach, gdy krytyczna wada sprawia, że stary kontrakt staje się bezużyteczny, a wdrożenie nowej logiki jest najbardziej wykonalną opcją.

Mechanizmy aktualizacji kontraktów działają różnie, ale „wzorzec proxy” jest jednym z bardziej popularnych podejść do aktualizacji inteligentnych kontraktów. [Wzorce proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dzielą stan i logikę aplikacji między _dwa_ kontrakty. Pierwszy kontrakt (zwany „kontraktem proxy”) przechowuje zmienne stanu (np. salda użytkowników), podczas gdy drugi kontrakt (zwany „kontraktem logiki”) przechowuje kod do wykonywania funkcji kontraktu.

Konta wchodzą w interakcję z kontraktem proxy, który wysyła wszystkie wywołania funkcji do kontraktu logiki za pomocą wywołania niskiego poziomu [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). W przeciwieństwie do zwykłego wywołania wiadomości, `delegatecall()` zapewnia, że kod działający pod adresem kontraktu logiki jest wykonywany w kontekście kontraktu wywołującego. Oznacza to, że kontrakt logiki zawsze będzie zapisywał w pamięci masowej proxy (zamiast we własnej pamięci masowej), a oryginalne wartości `msg.sender` i `msg.value` zostaną zachowane.

Delegowanie wywołań do kontraktu logiki wymaga przechowywania jego adresu w pamięci masowej kontraktu proxy. Dlatego aktualizacja logiki kontraktu to tylko kwestia wdrożenia kolejnego kontraktu logiki i zapisania nowego adresu w kontrakcie proxy. Ponieważ kolejne wywołania kontraktu proxy są automatycznie kierowane do nowego kontraktu logiki, „zaktualizowałbyś” kontrakt bez faktycznego modyfikowania kodu.

[Więcej o aktualizacji kontraktów](/developers/docs/smart-contracts/upgrading/).

#### Zatrzymania awaryjne {#emergency-stops}

Jak wspomniano, szeroko zakrojone audyty i testy nie mogą odkryć wszystkich błędów w inteligentnym kontrakcie. Jeśli luka w zabezpieczeniach pojawi się w Twoim kodzie po wdrożeniu, jej załatanie jest niemożliwe, ponieważ nie możesz zmienić kodu działającego pod adresem kontraktu. Ponadto wdrożenie mechanizmów aktualizacji (np. wzorców proxy) może zająć trochę czasu (często wymagają one zatwierdzenia przez różne strony), co daje atakującym więcej czasu na wyrządzenie większych szkód.

Opcją nuklearną jest wdrożenie funkcji „zatrzymania awaryjnego”, która blokuje wywołania podatnych na ataki funkcji w kontrakcie. Zatrzymania awaryjne zazwyczaj składają się z następujących elementów:

1. Globalna zmienna logiczna (Boolean) wskazująca, czy inteligentny kontrakt jest w stanie zatrzymania, czy nie. Zmienna ta jest ustawiona na `false` podczas konfigurowania kontraktu, ale zmieni się na `true` po zatrzymaniu kontraktu.

2. Funkcje, które odwołują się do zmiennej logicznej podczas ich wykonywania. Takie funkcje są dostępne, gdy inteligentny kontrakt nie jest zatrzymany, i stają się niedostępne po uruchomieniu funkcji zatrzymania awaryjnego.

3. Podmiot, który ma dostęp do funkcji zatrzymania awaryjnego, która ustawia zmienną logiczną na `true`. Aby zapobiec złośliwym działaniom, wywołania tej funkcji mogą być ograniczone do zaufanego adresu (np. właściciela kontraktu).

Gdy kontrakt aktywuje zatrzymanie awaryjne, niektórych funkcji nie będzie można wywołać. Osiąga się to poprzez opakowanie wybranych funkcji w modyfikator, który odwołuje się do zmiennej globalnej. Poniżej znajduje się [przykład](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) opisujący implementację tego wzorca w kontraktach:

```solidity
// Ten kod nie przeszedł profesjonalnego audytu i nie daje żadnych gwarancji dotyczących bezpieczeństwa ani poprawności. Używaj na własne ryzyko.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Tutaj sprawdź autoryzację msg.sender
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Tutaj znajduje się logika depozytu
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Tutaj odbywa się awaryjna wypłata
    }
}
```

Ten przykład pokazuje podstawowe cechy zatrzymań awaryjnych:

- `isStopped` to zmienna logiczna, która na początku ma wartość `false`, a gdy kontrakt wchodzi w tryb awaryjny, przyjmuje wartość `true`.

- Modyfikatory funkcji `onlyWhenStopped` i `stoppedInEmergency` sprawdzają zmienną `isStopped`. `stoppedInEmergency` służy do kontrolowania funkcji, które powinny być niedostępne, gdy kontrakt jest podatny na ataki (np. `deposit()`). Wywołania tych funkcji po prostu spowodują wycofanie.

`onlyWhenStopped` jest używany dla funkcji, które powinny być wywoływane podczas awarii (np. `emergencyWithdraw()`). Takie funkcje mogą pomóc w rozwiązaniu sytuacji, stąd ich wykluczenie z listy „funkcji zastrzeżonych”.

Użycie funkcji zatrzymania awaryjnego zapewnia skuteczne rozwiązanie tymczasowe w radzeniu sobie z poważnymi lukami w zabezpieczeniach w Twoim inteligentnym kontrakcie. Zwiększa to jednak potrzebę zaufania użytkowników do programistów, że nie aktywują jej z egoistycznych powodów. W tym celu możliwymi rozwiązaniami są decentralizacja kontroli nad zatrzymaniem awaryjnym poprzez poddanie jej mechanizmowi głosowania onchain, blokadzie czasowej (timelock) lub zatwierdzeniu z portfela multisig.

#### Monitorowanie zdarzeń {#event-monitoring}

[Zdarzenia](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) pozwalają na śledzenie wywołań funkcji inteligentnego kontraktu i monitorowanie zmian zmiennych stanu. Idealnie jest zaprogramować inteligentny kontrakt tak, aby emitował zdarzenie za każdym razem, gdy jakaś strona podejmuje działanie krytyczne dla bezpieczeństwa (np. wypłata środków).

Rejestrowanie zdarzeń i monitorowanie ich pozałańcuchowo (offchain) zapewnia wgląd w operacje kontraktu i pomaga w szybszym odkrywaniu złośliwych działań. Oznacza to, że Twój zespół może szybciej reagować na włamania i podejmować działania w celu złagodzenia wpływu na użytkowników, takie jak wstrzymywanie funkcji lub przeprowadzanie aktualizacji.

Możesz również zdecydować się na gotowe narzędzie do monitorowania, które automatycznie przesyła alerty za każdym razem, gdy ktoś wchodzi w interakcję z Twoimi kontraktami. Narzędzia te pozwolą Ci na tworzenie niestandardowych alertów w oparciu o różne wyzwalacze, takie jak wolumen transakcji, częstotliwość wywołań funkcji lub określone zaangażowane funkcje. Na przykład możesz zaprogramować alert, który pojawia się, gdy kwota wypłacona w pojedynczej transakcji przekroczy określony próg.

### 7. Zaprojektuj bezpieczne systemy zarządzania {#design-secure-governance-systems}

Możesz chcieć zdecentralizować swoją aplikację, przekazując kontrolę nad głównymi inteligentnymi kontraktami członkom społeczności. W tym przypadku system inteligentnych kontraktów będzie zawierał moduł zarządzania — mechanizm, który pozwala członkom społeczności na zatwierdzanie działań administracyjnych za pośrednictwem systemu zarządzania onchain. Na przykład propozycja aktualizacji kontraktu proxy do nowej implementacji może zostać poddana pod głosowanie przez posiadaczy tokenów.

Zdecentralizowane zarządzanie może być korzystne, zwłaszcza że dostosowuje interesy programistów i użytkowników końcowych. Niemniej jednak mechanizmy zarządzania inteligentnymi kontraktami mogą wprowadzać nowe ryzyka, jeśli zostaną wdrożone nieprawidłowo. Prawdopodobnym scenariuszem jest sytuacja, w której atakujący zyskuje ogromną siłę głosu (mierzoną liczbą posiadanych tokenów), zaciągając [błyskawiczną pożyczkę](/defi/#flash-loans) i przeforsowuje złośliwą propozycję.

Jednym ze sposobów zapobiegania problemom związanym z zarządzaniem onchain jest [użycie blokady czasowej (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Blokada czasowa zapobiega wykonaniu przez inteligentny kontrakt określonych działań, dopóki nie upłynie określony czas. Inne strategie obejmują przypisanie „wagi głosu” do każdego tokena na podstawie tego, jak długo był zablokowany, lub pomiar siły głosu adresu w okresie historycznym (na przykład 2-3 bloki w przeszłości) zamiast w bieżącym bloku. Obie metody zmniejszają możliwość szybkiego gromadzenia siły głosu w celu zmiany wyników głosowań onchain.

Więcej o [projektowaniu bezpiecznych systemów zarządzania](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [różnych mechanizmach głosowania w DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) oraz [powszechnych wektorach ataków na DAO wykorzystujących DeFi](https://dacian.me/dao-governance-defi-attacks) w udostępnionych linkach.

### 8. Zredukuj złożoność kodu do minimum {#reduce-code-complexity}

Tradycyjni programiści znają zasadę KISS („keep it simple, stupid”), która odradza wprowadzanie niepotrzebnej złożoności do projektowania oprogramowania. Wynika to z od dawna utrzymywanego przekonania, że „złożone systemy psują się w złożony sposób” i są bardziej podatne na kosztowne błędy.

Utrzymywanie prostoty ma szczególne znaczenie podczas pisania inteligentnych kontraktów, biorąc pod uwagę, że inteligentne kontrakty potencjalnie kontrolują duże ilości wartości. Wskazówką do osiągnięcia prostoty podczas pisania inteligentnych kontraktów jest ponowne wykorzystanie istniejących bibliotek, takich jak [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), tam gdzie to możliwe. Ponieważ te biblioteki zostały gruntownie zbadane i przetestowane przez programistów, ich użycie zmniejsza szanse na wprowadzenie błędów poprzez pisanie nowej funkcjonalności od zera.

Inną powszechną radą jest pisanie małych funkcji i utrzymywanie modułowości kontraktów poprzez dzielenie logiki biznesowej na wiele kontraktów. Pisanie prostszego kodu nie tylko zmniejsza powierzchnię ataku w inteligentnym kontrakcie, ale także ułatwia wnioskowanie o poprawności całego systemu i wczesne wykrywanie możliwych błędów projektowych.

### 9. Broń się przed powszechnymi lukami w zabezpieczeniach inteligentnych kontraktów {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrancja {#reentrancy}

EVM nie pozwala na współbieżność, co oznacza, że dwa kontrakty zaangażowane w wywołanie wiadomości nie mogą działać jednocześnie. Zewnętrzne wywołanie wstrzymuje wykonanie i pamięć kontraktu wywołującego do momentu powrotu wywołania, po czym wykonanie przebiega normalnie. Proces ten można formalnie opisać jako przeniesienie [przepływu sterowania](https://www.computerhope.com/jargon/c/contflow.htm) do innego kontraktu.

Chociaż w większości nieszkodliwe, przeniesienie przepływu sterowania do niezaufanych kontraktów może powodować problemy, takie jak reentrancja. Atak reentrancji ma miejsce, gdy złośliwy kontrakt wywołuje z powrotem podatny na ataki kontrakt, zanim pierwotne wywołanie funkcji zostanie zakończone. Ten typ ataku najlepiej wyjaśnić na przykładzie.

Rozważmy prosty inteligentny kontrakt („Ofiara”), który pozwala każdemu na wpłacanie i wypłacanie etheru:

```solidity
// Ten kontrakt jest podatny na ataki. Nie używaj w środowisku produkcyjnym

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Ten kontrakt udostępnia funkcję `withdraw()`, aby umożliwić użytkownikom wypłatę ETH wcześniej zdeponowanego w kontrakcie. Podczas przetwarzania wypłaty kontrakt wykonuje następujące operacje:

1. Sprawdza saldo ETH użytkownika
2. Wysyła środki na adres wywołujący
3. Zeruje ich saldo, zapobiegając dodatkowym wypłatom przez użytkownika

Funkcja `withdraw()` w kontrakcie `Victim` podąża za wzorcem „sprawdzenia-interakcje-efekty” (checks-interactions-effects). Najpierw _sprawdza_ (checks), czy warunki niezbędne do wykonania są spełnione (tj. użytkownik ma dodatnie saldo ETH), i wykonuje _interakcję_ (interaction), wysyłając ETH na adres wywołującego, przed zastosowaniem _efektów_ (effects) transakcji (tj. zmniejszeniem salda użytkownika).

Jeśli `withdraw()` jest wywoływana z konta posiadanego zewnętrznie (EOA), funkcja wykonuje się zgodnie z oczekiwaniami: `msg.sender.call.value()` wysyła ETH do wywołującego. Jednakże, jeśli `msg.sender` jest kontem inteligentnego kontraktu wywołującym `withdraw()`, wysłanie środków za pomocą `msg.sender.call.value()` spowoduje również uruchomienie kodu zapisanego pod tym adresem.

Wyobraź sobie, że to jest kod wdrożony pod adresem kontraktu:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Ten kontrakt jest zaprojektowany do robienia trzech rzeczy:

1. Przyjęcie depozytu z innego konta (prawdopodobnie EOA atakującego)
2. Zdeponowanie 1 ETH w kontrakcie Ofiary
3. Wypłacenie 1 ETH przechowywanego w inteligentnym kontrakcie

Nie ma w tym nic złego, z wyjątkiem tego, że `Attacker` ma inną funkcję, która ponownie wywołuje `withdraw()` w `Victim`, jeśli gaz pozostały z przychodzącego `msg.sender.call.value` wynosi więcej niż 40 000. Daje to `Attacker` możliwość ponownego wejścia (reenter) do `Victim` i wypłacenia większej ilości środków _przed_ zakończeniem pierwszego wywołania `withdraw`. Cykl wygląda następująco:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

Podsumowując, ponieważ saldo wywołującego nie jest ustawiane na 0, dopóki wykonanie funkcji nie zostanie zakończone, kolejne wywołania zakończą się sukcesem i pozwolą wywołującemu na wielokrotną wypłatę swojego salda. Tego rodzaju atak może zostać użyty do opróżnienia inteligentnego kontraktu z jego środków, tak jak miało to miejsce w [ataku na DAO w 2016 roku](https://www.coindesk.com/learn/understanding-the-dao-attack). Ataki reentrancji są nadal krytycznym problemem dla inteligentnych kontraktów, co pokazują [publiczne listy exploitów reentrancji](https://github.com/pcaversaccio/reentrancy-attacks).

##### Jak zapobiegać atakom reentrancji {#}

Podejściem do radzenia sobie z reentrancją jest podążanie za [wzorcem sprawdzenia-efekty-interakcje (checks-effects-interactions)](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Wzorzec ten porządkuje wykonywanie funkcji w taki sposób, że kod wykonujący niezbędne sprawdzenia przed przejściem do wykonania jest na pierwszym miejscu, następnie kod manipulujący stanem kontraktu, a kod wchodzący w interakcje z innymi kontraktami lub EOA jest na końcu.

Wzorzec sprawdzenia-efekty-interakcje jest używany w poprawionej wersji kontraktu `Victim` pokazanej poniżej:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Ten kontrakt wykonuje _sprawdzenie_ (check) salda użytkownika, stosuje _efekty_ (effects) funkcji `withdraw()` (poprzez wyzerowanie salda użytkownika) i przechodzi do wykonania _interakcji_ (interaction) (wysłanie ETH na adres użytkownika). Zapewnia to, że kontrakt aktualizuje swoją pamięć masową przed zewnętrznym wywołaniem, eliminując warunek reentrancji, który umożliwił pierwszy atak. Kontrakt `Attacker` nadal mógłby wywołać z powrotem `NoLongerAVictim`, ale ponieważ `balances[msg.sender]` zostało ustawione na 0, dodatkowe wypłaty wyrzucą błąd.

Inną opcją jest użycie blokady wzajemnego wykluczania (powszechnie określanej jako „mutex”), która blokuje część stanu kontraktu do momentu zakończenia wywołania funkcji. Jest to implementowane za pomocą zmiennej logicznej, która jest ustawiana na `true` przed wykonaniem funkcji i powraca do `false` po zakończeniu wywołania. Jak widać w poniższym przykładzie, użycie mutexu chroni funkcję przed wywołaniami rekurencyjnymi, podczas gdy pierwotne wywołanie jest nadal przetwarzane, skutecznie zatrzymując reentrancję.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // Ta funkcja jest chroniona przez muteks, więc wywołania z reentrancją z wnętrza `msg.sender.call` nie mogą ponownie wywołać `withdraw`.
    //  Instrukcja `return` zwraca `true`, ale nadal wykonuje instrukcję `locked = false` w modyfikatorze
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Możesz również użyć systemu [płatności typu pull (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment), który wymaga od użytkowników wypłacania środków z inteligentnych kontraktów, zamiast systemu „płatności typu push” (push payments), który wysyła środki na konta. Usuwa to możliwość nieumyślnego uruchomienia kodu pod nieznanymi adresami (i może również zapobiec niektórym atakom typu odmowa usługi - DoS).

#### Niedomiar i przepełnienie liczb całkowitych {#integer-underflows-and-overflows}

Przepełnienie liczby całkowitej (integer overflow) występuje, gdy wynik operacji arytmetycznej wykracza poza dopuszczalny zakres wartości, powodując jego „przewinięcie” do najniższej możliwej do reprezentowania wartości. Na przykład `uint8` może przechowywać tylko wartości do 2^8-1=255. Operacje arytmetyczne, których wynikiem są wartości wyższe niż `255`, spowodują przepełnienie i zresetują `uint` do `0`, podobnie jak licznik kilometrów w samochodzie resetuje się do 0 po osiągnięciu maksymalnego przebiegu (999999).

Niedomiar liczby całkowitej (integer underflow) zdarza się z podobnych powodów: wynik operacji arytmetycznej spada poniżej dopuszczalnego zakresu. Załóżmy, że próbowałeś zmniejszyć `0` w `uint8`, wynik po prostu przewinąłby się do maksymalnej możliwej do reprezentowania wartości (`255`).

Zarówno przepełnienie, jak i niedomiar liczb całkowitych mogą prowadzić do nieoczekiwanych zmian zmiennych stanu kontraktu i skutkować nieplanowanym wykonaniem. Poniżej znajduje się przykład pokazujący, jak atakujący może wykorzystać przepełnienie arytmetyczne w inteligentnym kontrakcie do wykonania nieprawidłowej operacji:

```
pragma solidity ^0.7.6;

// Ten kontrakt jest zaprojektowany jako skarbiec czasowy.
// Użytkownik może wpłacać do tego kontraktu, ale nie może wypłacać przez co najmniej tydzień.
// Użytkownik może również wydłużyć czas oczekiwania poza 1-tygodniowy okres oczekiwania.

/*
1. Wdróż TimeLock
2. Wdróż Attack z adresem TimeLock
3. Wywołaj Attack.attack wysyłając 1 ether. Będziesz mógł natychmiast
   wypłacić swój ether.

Co się stało?
Attack spowodował przepełnienie TimeLock.lockTime i był w stanie wypłacić
przed upływem 1-tygodniowego okresu oczekiwania.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        jeśli t = obecny czas blokady, to musimy znaleźć x takie, że
        x + t = 2**256 = 0
        więc x = -t
        2**256 = type(uint).max + 1
        więc x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Jak zapobiegać niedomiarom i przepełnieniom liczb całkowitych {#}

Począwszy od wersji 0.8.0, kompilator Solidity odrzuca kod, który powoduje niedomiar i przepełnienie liczb całkowitych. Jednakże kontrakty skompilowane w niższej wersji kompilatora powinny albo przeprowadzać sprawdzanie funkcji obejmujących operacje arytmetyczne, albo używać biblioteki (np. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)), która sprawdza niedomiar/przepełnienie.

#### Manipulacja wyrocznią {#oracle-manipulation}

[Wyrocznie](/developers/docs/oracles/) pozyskują informacje pozałańcuchowe (offchain) i wysyłają je onchain do wykorzystania przez inteligentne kontrakty. Dzięki wyroczniom możesz projektować inteligentne kontrakty, które współpracują z systemami pozałańcuchowymi, takimi jak rynki kapitałowe, znacznie rozszerzając ich zastosowanie.

Ale jeśli wyrocznia jest uszkodzona i wysyła nieprawidłowe informacje onchain, inteligentne kontrakty zostaną wykonane na podstawie błędnych danych wejściowych, co może powodować problemy. Jest to podstawa „problemu wyroczni”, który dotyczy zadania upewnienia się, że informacje z wyroczni blockchainowej są dokładne, aktualne i terminowe.

Powiązanym problemem bezpieczeństwa jest użycie wyroczni onchain, takiej jak zdecentralizowana giełda, w celu uzyskania ceny spot dla aktywa. Platformy pożyczkowe w branży [zdecentralizowanych finansów (DeFi)](/defi/) często robią to, aby określić wartość zabezpieczenia użytkownika w celu ustalenia, ile może on pożyczyć.

Ceny na DEX są często dokładne, w dużej mierze dzięki arbitrażystom przywracającym parytet na rynkach. Są one jednak podatne na manipulacje, zwłaszcza jeśli wyrocznia onchain oblicza ceny aktywów na podstawie historycznych wzorców handlowych (jak to zazwyczaj bywa).

Na przykład atakujący mógłby sztucznie zawyżyć cenę spot aktywa, zaciągając błyskawiczną pożyczkę tuż przed wejściem w interakcję z Twoim kontraktem pożyczkowym. Zapytanie DEX o cenę aktywa zwróciłoby wyższą niż normalnie wartość (z powodu dużego „zlecenia kupna” atakującego, które zniekształca popyt na aktywo), pozwalając mu pożyczyć więcej, niż powinien. Takie „ataki z użyciem błyskawicznych pożyczek” były wykorzystywane do eksploatacji polegania na wyroczniach cenowych wśród aplikacji DeFi, kosztując protokoły miliony utraconych środków.

##### Jak zapobiegać manipulacji wyrocznią {#}

Minimalnym wymogiem, aby [uniknąć manipulacji wyrocznią](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples), jest użycie zdecentralizowanej sieci wyroczni, która pobiera informacje z wielu źródeł, aby uniknąć pojedynczych punktów awarii. W większości przypadków zdecentralizowane wyrocznie mają wbudowane zachęty kryptoekonomiczne, aby zachęcić węzły wyroczni do zgłaszania prawidłowych informacji, co czyni je bezpieczniejszymi niż scentralizowane wyrocznie.

Jeśli planujesz odpytywać wyrocznię onchain o ceny aktywów, rozważ użycie takiej, która implementuje mechanizm średniej ceny ważonej w czasie (TWAP). [Wyrocznia TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) odpytuje o cenę aktywa w dwóch różnych punktach w czasie (które można modyfikować) i oblicza cenę spot na podstawie uzyskanej średniej. Wybór dłuższych okresów chroni Twój protokół przed manipulacją cenami, ponieważ duże zlecenia zrealizowane niedawno nie mogą wpłynąć na ceny aktywów.

## Zasoby dotyczące bezpieczeństwa inteligentnych kontraktów dla deweloperów {#smart-contract-security-resources-for-developers}

### Narzędzia do analizy inteligentnych kontraktów i weryfikacji poprawności kodu {#code-analysis-tools}

- **[Narzędzia i biblioteki do testowania](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Zbiór standardowych w branży narzędzi i bibliotek do przeprowadzania testów jednostkowych, analizy statycznej i analizy dynamicznej inteligentnych kontraktów._

- **[Narzędzia do weryfikacji formalnej](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Narzędzia do weryfikacji poprawności funkcjonalnej w inteligentnych kontraktach i sprawdzania niezmienników._

- **[Usługi audytu inteligentnych kontraktów](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Lista organizacji świadczących usługi audytu inteligentnych kontraktów dla projektów deweloperskich na Ethereum._

- **[Platformy bug bounty](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Platformy do koordynowania programów bug bounty i nagradzania odpowiedzialnego ujawniania krytycznych luk w inteligentnych kontraktach._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Darmowe narzędzie online do sprawdzania wszystkich dostępnych informacji dotyczących rozwidlonego kontraktu._

- **[ABI Encoder](https://abi.hashex.org/)** - _Darmowa usługa online do kodowania funkcji kontraktów w Solidity i argumentów konstruktora._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analizator statyczny dla Solidity, który przeszukuje drzewa składni abstrakcyjnej (AST), aby wskazać podejrzane luki i wypisać problemy w łatwym do przyswojenia formacie markdown._

### Narzędzia do monitorowania inteligentnych kontraktów {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Narzędzie do otrzymywania powiadomień w czasie rzeczywistym, gdy w Twoich inteligentnych kontraktach lub portfelach wystąpią nietypowe lub nieoczekiwane zdarzenia._

### Narzędzia do bezpiecznego administrowania inteligentnymi kontraktami {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Portfel oparty na inteligentnym kontrakcie działający na Ethereum, który wymaga minimalnej liczby osób do zatwierdzenia transakcji, zanim będzie mogła zostać zrealizowana (M-z-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Biblioteki kontraktów do wdrażania funkcji administracyjnych, w tym własności kontraktu, aktualizacji, kontroli dostępu, zarządzania, możliwości wstrzymania i innych._

### Usługi audytu inteligentnych kontraktów {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Usługa audytu inteligentnych kontraktów pomagająca projektom w całym ekosystemie blockchain upewnić się, że ich protokoły są gotowe do uruchomienia i zbudowane tak, aby chronić użytkowników._

- **[CertiK](https://www.certik.com/)** - _Firma zajmująca się bezpieczeństwem blockchain, pionier w wykorzystaniu najnowocześniejszej technologii weryfikacji formalnej w inteligentnych kontraktach i sieciach blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Firma zajmująca się cyberbezpieczeństwem, która łączy badania nad bezpieczeństwem z mentalnością atakującego, aby zmniejszyć ryzyko i wzmocnić kod._

- **[PeckShield](https://peckshield.com/)** - _Firma zajmująca się bezpieczeństwem blockchain, oferująca produkty i usługi w zakresie bezpieczeństwa, prywatności i użyteczności całego ekosystemu blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Usługa audytorska ułatwiająca powszechną adopcję technologii blockchain poprzez usługi oceny bezpieczeństwa i ryzyka._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Firma zajmująca się bezpieczeństwem inteligentnych kontraktów, zapewniająca audyty bezpieczeństwa dla systemów rozproszonych._

- **[Runtime Verification](https://runtimeverification.com/)** - _Firma zajmująca się bezpieczeństwem, specjalizująca się w formalnym modelowaniu i weryfikacji inteligentnych kontraktów._

- **[Hacken](https://hacken.io)** - _Audytor cyberbezpieczeństwa Web3 wprowadzający kompleksowe podejście do bezpieczeństwa blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Usługi audytu w Solidity i Cairo, zapewniające integralność inteligentnych kontraktów i bezpieczeństwo użytkowników w sieciach Ethereum i Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx koncentruje się na audytach blockchain i inteligentnych kontraktów w celu zapewnienia bezpieczeństwa kryptowalut, świadcząc usługi takie jak rozwój inteligentnych kontraktów, testy penetracyjne i doradztwo w zakresie blockchain._

- **[Code4rena](https://code4rena.com/)** - _Platforma audytów oparta na rywalizacji, która motywuje ekspertów ds. bezpieczeństwa inteligentnych kontraktów do znajdowania luk i pomagania w zwiększaniu bezpieczeństwa Web3._

- **[CodeHawks](https://codehawks.com/)** - _Platforma audytów oparta na rywalizacji, organizująca konkursy audytu inteligentnych kontraktów dla badaczy bezpieczeństwa._

- **[Cyfrin](https://cyfrin.io)** - _Potęga w dziedzinie bezpieczeństwa Web3, inkubująca bezpieczeństwo krypto poprzez produkty i usługi audytu inteligentnych kontraktów._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Firma zajmująca się bezpieczeństwem Web3, oferująca audyty bezpieczeństwa systemów blockchain dzięki zespołowi doświadczonych audytorów i najlepszym w swojej klasie narzędziom._

- **[Oxorio](https://oxor.io/)** - _Audyty inteligentnych kontraktów i usługi bezpieczeństwa blockchain z doświadczeniem w EVM, Solidity, ZK i technologiach międzyłańcuchowych dla firm krypto i projektów zdecentralizowanych finansów (DeFi)._

- **[Inference](https://inference.ag/)** - _Firma audytorska ds. bezpieczeństwa, specjalizująca się w audytach inteligentnych kontraktów dla blockchainów opartych na EVM. Dzięki swoim ekspertom identyfikują potencjalne problemy i sugerują praktyczne rozwiązania w celu ich naprawy przed wdrożeniem._

### Platformy bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Platforma bug bounty dla inteligentnych kontraktów i projektów DeFi, na której badacze bezpieczeństwa przeglądają kod, ujawniają luki, otrzymują wynagrodzenie i sprawiają, że krypto jest bezpieczniejsze._

- **[HackerOne](https://www.hackerone.com/)** - _Platforma do koordynacji luk w zabezpieczeniach i programów bug bounty, która łączy firmy z testerami penetracyjnymi i badaczami cyberbezpieczeństwa._

- **[HackenProof](https://hackenproof.com/)** - _Ekspercka platforma bug bounty dla projektów krypto (DeFi, inteligentne kontrakty, portfele, CEX i inne), na której specjaliści ds. bezpieczeństwa świadczą usługi selekcji, a badacze otrzymują wynagrodzenie za istotne, zweryfikowane raporty o błędach._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Gwarant w Web3 dla bezpieczeństwa inteligentnych kontraktów, z wypłatami dla audytorów zarządzanymi za pośrednictwem inteligentnych kontraktów, aby zapewnić uczciwe wynagrodzenie za istotne błędy._

-  **[CodeHawks](https://www.codehawks.com/)** - _Platforma bug bounty oparta na rywalizacji, na której audytorzy biorą udział w konkursach i wyzwaniach związanych z bezpieczeństwem, a (wkrótce) we własnych prywatnych audytach._

### Publikacje znanych luk i exploitów w inteligentnych kontraktach {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Znane ataki na inteligentne kontrakty](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Przyjazne dla początkujących wyjaśnienie najważniejszych luk w kontraktach, z przykładowym kodem dla większości przypadków._

- **[Rejestr SWC](https://swcregistry.io/)** - _Wyselekcjonowana lista elementów Common Weakness Enumeration (CWE), które mają zastosowanie do inteligentnych kontraktów Ethereum._

- **[Rekt](https://rekt.news/)** - _Regularnie aktualizowana publikacja o głośnych włamaniach i exploitach krypto, wraz ze szczegółowymi raportami post-mortem._

### Wyzwania do nauki bezpieczeństwa inteligentnych kontraktów {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Wyselekcjonowana lista gier wojennych (wargames) dotyczących bezpieczeństwa blockchain, wyzwań i zawodów [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) oraz opisów rozwiązań._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Gra wojenna (wargame) do nauki ofensywnego bezpieczeństwa inteligentnych kontraktów DeFi i budowania umiejętności w zakresie poszukiwania błędów oraz audytu bezpieczeństwa._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Gra wojenna (wargame) oparta na Web3/Solidity, w której każdy poziom to inteligentny kontrakt, który należy „zhakować”._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Wyzwanie hakerskie dotyczące inteligentnych kontraktów, osadzone w przygodzie fantasy. Pomyślne ukończenie wyzwania daje również dostęp do prywatnego programu bug bounty._

### Najlepsze praktyki zabezpieczania inteligentnych kontraktów {#smart-contract-security-best-practices}

- **[ConsenSys: Najlepsze praktyki bezpieczeństwa inteligentnych kontraktów Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Kompleksowa lista wytycznych dotyczących zabezpieczania inteligentnych kontraktów Ethereum._

- **[Nascent: Prosty zestaw narzędzi bezpieczeństwa](https://github.com/nascentxyz/simple-security-toolkit)** - _Zbiór praktycznych przewodników i list kontrolnych ukierunkowanych na bezpieczeństwo przy tworzeniu inteligentnych kontraktów._

- **[Wzorce Solidity](https://fravoll.github.io/solidity-patterns/)** - _Przydatne zestawienie bezpiecznych wzorców i najlepszych praktyk dla języka programowania inteligentnych kontraktów Solidity._

- **[Dokumentacja Solidity: Kwestie bezpieczeństwa](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Wytyczne dotyczące pisania bezpiecznych inteligentnych kontraktów w Solidity._

- **[Standard weryfikacji bezpieczeństwa inteligentnych kontraktów](https://github.com/securing/SCSVS)** - _Czternastoczęściowa lista kontrolna stworzona w celu ujednolicenia bezpieczeństwa inteligentnych kontraktów dla deweloperów, architektów, audytorów bezpieczeństwa i dostawców._

- **[Nauka bezpieczeństwa i audytu inteligentnych kontraktów](https://updraft.cyfrin.io/courses/security)** - _Kompleksowy kurs bezpieczeństwa i audytu inteligentnych kontraktów, stworzony dla deweloperów inteligentnych kontraktów, którzy chcą podnieść poziom swoich najlepszych praktyk bezpieczeństwa i zostać badaczami bezpieczeństwa._

### Samouczki dotyczące bezpieczeństwa inteligentnych kontraktów {#tutorials-on-smart-contract-security}

- [Jak pisać bezpieczne inteligentne kontrakty](/developers/tutorials/secure-development-workflow/)

- [Jak używać narzędzia Slither do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jak używać narzędzia Manticore do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Wytyczne dotyczące bezpieczeństwa inteligentnych kontraktów](/developers/tutorials/smart-contract-security-guidelines/)

- [Jak bezpiecznie zintegrować swój kontrakt tokena z dowolnymi tokenami](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Pełny kurs bezpieczeństwa i audytu inteligentnych kontraktów](https://updraft.cyfrin.io/courses/security)