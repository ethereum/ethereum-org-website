---
title: "Bezpieczeństwo inteligentnych kontraktów"
description: "Przegląd wskazówek dotyczących tworzenia bezpiecznych inteligentnych kontraktów Ethereum"
lang: pl
---

Inteligentne kontrakty są ekstremalnie elastyczne oraz zdolne kontrolować duże ilości wartości oraz danych oraz dane stosując niezmienną logikę opartą na kodzie wdrożonym na blockchainie. Powstał dzięki temu tętniący życiem ekosystem niewymagających zaufania i zdecentralizowanych aplikacji, które zapewniają szereg przewag wobec przestarzałych systemów. Stwarzają one również okazje dla napastników szukających zysku poprzez wykorzystanie słabych punktów inteligentnych kontraktów.

Publiczne blockchainy takie jak Ethereum, jeszcze bardziej komplikują zagadnienie zabezpieczeń inteligentnych kontraktów. Kod wdrożonego kontraktu _zazwyczaj_ nie może zostać zmieniony w celu załatania luk w zabezpieczeniach, podczas gdy aktywa skradzione z inteligentnych kontraktów są niezwykle trudne do wyśledzenia i w większości nie do odzyskania ze względu na niezmienność.

Źródła podają różne kwoty, ale można oszacować, że suma środków skradzionych lub straconych w wyniku defektów zabezpieczeń w inteligentnych kontraktach przekracza 1 miliard dolarów. Obejmuje to głośne incydenty, takie jak [atak na DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (skradziono 3,6 mln ETH, wartych dziś ponad 1 mld USD), [atak na portfel wielopodpisowy Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (hakerzy ukradli 30 mln USD) oraz [problem z zamrożonym portfelem Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (ponad 300 mln USD w ETH zablokowane na zawsze).

Wspomniane wcześniej problemy stwarzają programistom konieczność poświęcania uwagi i środków na tworzenie zabezpieczonych, solidnych i odpornych inteligentnych kontraktów. Bezpieczeństwo inteligentnych kontraktów jest poważną sprawą, o której powinien uczyć się każdy programista. W tym przewodniku omówione zostaną zagadnienia związane z bezpieczeństwem skierowane dla programistów Ethereum oraz zasoby ulepszania zabezpieczeń inteligentnych kontraktów.

## Wymagania wstępne {#prerequisites}

Przed zajęciem się kwestiami bezpieczeństwa upewnij się, że znasz [podstawy tworzenia inteligentnych kontraktów](/developers/docs/smart-contracts/).

## Wytyczne dotyczące budowania bezpiecznych inteligentnych kontraktów Ethereum {#smart-contract-security-guidelines}

### 1. Zaprojektuj odpowiednie mechanizmy kontroli dostępu {#design-proper-access-controls}

W inteligentnych kontraktach funkcje oznaczone jako `public` lub `external` mogą być wywoływane przez dowolne konta zewnętrzne (EOA) lub konta kontraktowe. Określenie publicznej widoczności funkcji jest konieczne, jeśli chcesz, aby inni mogli wchodzić w interakcje z twoim kontraktem. Funkcje oznaczone jako `private` mogą być jednak wywoływane tylko przez funkcje w ramach danego inteligentnego kontraktu, a nie przez konta zewnętrzne. Udzielanie każdemu użytkownikowi sieci dostępu do funkcji kontraktu może stwarzać problemy, szczególnie jeśli oznacza to, że każdy może przeprowadzać wrażliwe czynności (np. mintowanie nowych tokenów).

Aby uniemożliwić nieautoryzowane użycie funkcji inteligentnego kontraktu, niezbędna jest implementacja zabezpieczeń kontroli dostępu. Mechanizmy kontroli dostępu ograniczają możliwość użycia określonych funkcji inteligentnego kontraktu podmiotom innym niż aprobowane, czyli te konta, które odpowiedzialne są za zarządzanie kontraktem. Wzorce **Ownable** oraz **kontroli opartej na rolach** to dwa przydatne schematy implementacji kontroli dostępu w inteligentnych kontraktach:

#### Wzorzec Ownable {#ownable-pattern}

We wzorcu własności, adres oznaczony jest jako "właściciel" kontraktu podczas procesu tworzenia kontraktu. Funkcje chronione mają przypisany modyfikator `OnlyOwner`, który zapewnia, że kontrakt uwierzytelnia tożsamość adresu wywołującego przed wykonaniem funkcji. Wywołania funkcji objętych ochroną pochodzące od innych adresów oprócz właściciela kontraktu są zawsze pomijane, co uniemożliwia niechciany dostęp.

#### Kontrola dostępu oparta na rolach {#role-based-access-control}

Zarejestrowanie pojedynczego adresu jako `Owner` w inteligentnym kontrakcie wprowadza ryzyko centralizacji i stanowi pojedynczy punkt awarii. Jeśli klucze dostępu konta właściciela wpadną w niepowołane ręce, napastnicy mogą zaatakować kontrakt objęty własnością. Dlatego wykorzystanie wzorca dostępu opartego na rolach dla kilku kont administratorów może być lepszym rozwiązaniem.

W przypadku kontroli dostępu opartej na rolach dostęp do wrażliwych funkcji jest rozdysponowany pomiędzy zaufanymi uczestnikami. Na przykład jedno konto może być odpowiedzialne za mintowanie tokenów, a inne może mieć możliwość zatrzymania kontraktu lub jego aktualizacji. Decentralizowanie kontroli dostępu w taki sposób, eliminuje pojedyncze punkty awarii i ogranicza potrzebę użytkowników do powierzania zaufania.

##### Używanie portfelu multisig

Innym podejściem do implementacji bezpiecznej kontroli dostępu jest użycie [konta z wieloma podpisami](/developers/docs/smart-contracts/#multisig) do zarządzania kontraktem. W przeciwieństwie do EOA, konta multisig mają kilku właścicieli i wymagają podpisów od określonej minimalnej liczby kont — na przykład 3 z 5 — aby wykonać transakcję.

Używanie multisig do kontroli dostępu wprowadza dodatkową warstwę bezpieczeństwa, ponieważ czynności na docelowym kontrakcie wymagają zgody kilku stron. Jest to szczególnie użyteczne, kiedy wykorzystanie wzorca własności jest niezbędne, ponieważ czyni on manipulacje wrażliwymi funkcjami kontraktu w złośliwych celach trudniejszymi dla napastnika czy wewnętrznego sabotażysty.

### 2. Używaj instrukcji require(), assert() i revert() do ochrony operacji kontraktowych {#use-require-assert-revert}

Jak wspomniano, każdy może wywoływać funkcje publiczne w inteligentnym kontrakcie po jego wdrożeniu w blockchainie. Ponieważ nie można z góry przewidzieć, w jaki sposób konta zewnętrzne będą oddziaływać na umowę, najlepszym rozwiązaniem jest wdrożenie wewnętrznych zabezpieczeń chroniących przed problematycznymi operacjami przed wdrożeniem. Możesz wymusić poprawne zachowanie w inteligentnych kontraktach za pomocą instrukcji `require()`, `assert()` i `revert()`, aby wywoływać wyjątki i cofać zmiany stanu, jeśli wykonanie nie spełni określonych wymagań.

**`require()`**: Instrukcje `require` są definiowane na początku funkcji i zapewniają, że określone warunki są spełnione, zanim wywołana funkcja zostanie wykonana. Instrukcja `require` może być użyta do walidacji danych wejściowych użytkownika, sprawdzania zmiennych stanu lub uwierzytelniania tożsamości konta wywołującego przed kontynuowaniem wykonania funkcji.

**`assert()`**: `assert()` służy do wykrywania błędów wewnętrznych i sprawdzania naruszeń „niezmienników” w kodzie. Niezmiennik to logiczne założenie dotyczące stanu kontraktu, które powinno być prawdziwe dla wszystkich możliwych wykonań funkcji. Przykładowym niezmiennikiem jest maksymalna podaż całkowita lub saldo w kontrakcie tokena. Użycie `assert()` zapewnia, że kontrakt nigdy nie osiągnie stanu podatności na ataki, a jeśli tak się stanie, wszystkie zmiany w zmiennych stanu zostaną wycofane.

**`revert()`**: `revert()` może być użyte w instrukcji if-else, która wywołuje wyjątek, jeśli wymagany warunek nie jest spełniony. Poniższy przykładowy kontrakt wykorzystuje `revert()` do ochrony wykonywania funkcji:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Za mało Etheru.");
        // Dokonaj zakupu.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Testuj inteligentne kontrakty i weryfikuj poprawność kodu {#test-smart-contracts-and-verify-code-correctness}

Niezmienność kodu działającego w [Wirtualnej Maszynie Ethereum](/developers/docs/evm/) oznacza, że inteligentne kontrakty wymagają wyższego poziomu oceny jakości na etapie rozwoju. Dokładne testowane kontraktu i obserwowanie go w celu wychwycenia wszelkich nieoczekiwanych rezultatów, wzmocni znacząco jego bezpieczeństwo i, w dłuższym okresie, ochroni użytkowników.

Standardową metodą jest pisanie małych testów jednostkowych, używając nieprawdziwych danych, które powinny zostać dostarczone do kontraktu przez użytkowników. [Testowanie jednostkowe](/developers/docs/smart-contracts/testing/#unit-testing) jest dobre do testowania funkcjonalności poszczególnych funkcji i upewniania się, że inteligentny kontrakt działa zgodnie z oczekiwaniami.

Niestety testowanie jednostkowe jest niezbyt efektywne w kwestii zwiększania poziomu zabezpieczenia inteligentnego kontraktu, kiedy stosuje się je jako jedyną metodę. Test jednostkowy może dowieźć, że funkcja działa poprawnie dla nieprawdziwych danych, ale skuteczność testów jednostkowych ogranicza się do jakości napisanych testów. To zwiększa trudność wykrycia pominiętych przypadków granicznych czy słabych punktów, których wykorzystanie może złamać zabezpieczenia inteligentnego kontraktu.

Lepszym podejściem jest połączenie testowania jednostkowego z testowaniem opartym na właściwościach, przeprowadzanym przy użyciu [analizy statycznej i dynamicznej](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Analiza statyczna opiera się na reprezentacjach niskiego poziomu, takich jak [grafy przepływu sterowania](https://en.wikipedia.org/wiki/Control-flow_graph) i [abstrakcyjne drzewa składni](https://deepsource.io/glossary/ast/), w celu analizy osiągalnych stanów programu i ścieżek wykonania. Tymczasem techniki analizy dynamicznej, takie jak [fuzzing inteligentnych kontraktów](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), wykonują kod kontraktu z losowymi wartościami wejściowymi w celu wykrycia operacji naruszających właściwości bezpieczeństwa.

[Weryfikacja formalna](/developers/docs/smart-contracts/formal-verification) to kolejna technika weryfikacji właściwości bezpieczeństwa w inteligentnych kontraktach. W przeciwieństwie do zwykłego testowania weryfikacja formalna może jednoznacznie dowieźć braku obecności błędów w inteligentnym kontrakcie. Osiąga się to poprzez tworzenie formalnej specyfikacji, która określa pożądane właściwości zabezpieczeń i dowodzi, że model formalny kontraktów spełnia założenia tej specyfikacji.

### 4. Poproś o niezależny przegląd swojego kodu {#get-independent-code-reviews}

Po przetestowaniu kontraktu dobrze jest poprosić innego programistę o sprawdzenie kodu źródłowego w celu wykrycia problemów dotyczących zabezpieczeń. Testowanie nie odkryje każdej wady inteligentnego kontraktu, ale zapewnienie niezależnej recenzji zwiększy prawdopodobieństwo wykrycia słabych punktów.

#### Audyty {#audits}

Zlecenie audytu inteligentnego kontraktu jest jednym ze sposobów na przeprowadzenie niezależnej recenzji kodu. Audytorzy odgrywają ważną rolę w zapewnieniu bezpieczeństwa inteligentnemu kontraktowi oraz sprzyjają pozbyciu się defektów i błędów projektowych.

Nie powinno to jednak doprowadzić do sytuacji, w której audyty stanowią jedyne zastosowane rozwiązanie. Audyty inteligentnych kontraktów nie wyłapią każdego błędu i są głównie zaprojektowane, aby zapewnić dodatkowy cykl recenzji, który może pomóc w wykryciu problemów przeoczonych przez programistów podczas początkowych etapów programowania oraz testów. Powinno się również stosować do najlepszych praktyk we współpracy z audytorami, które obejmują odpowiednie dokumentowanie kodu oraz dodawanie komentarzy w celu maksymalizacji korzyści płynących z audytu inteligentnego kontraktu.

- [Porady i wskazówki dotyczące audytu inteligentnych kontraktów](https://twitter.com/tinchoabbate/status/1400170232904400897) – _@tinchoabbate_
- [Wykorzystaj w pełni swój audyt](https://inference.ag/blog/2023-08-14-tips/) – _Inference_

#### Nagrody za znalezienie błędów {#bug-bounties}

Zorganizowanie programu nagród za znalezienie błędu jest kolejnym podejściem do wdrożenia zewnętrznych recenzji kodu. Nagroda za znalezienie błędu jest finansową gratyfikacją przyznawaną osobom (zwykle hakerom w białych kapeluszach), które wykryją słabe punkty aplikacji.

Gdy są odpowiednio wykorzystane, nagrody za znalezienie błędu dają członkom społeczności hakerskiej zachętę do inspekcji kodu pod kątem wad krytycznych. Przykładem z życia wziętym jest „błąd nieskończonej ilości pieniędzy”, który pozwoliłby atakującemu na stworzenie nieograniczonej ilości etheru na [Optimism](https://www.optimism.io/), protokole [Warstwy 2](/layer-2/) działającym na Ethereum. Na szczęście haker w białym kapeluszu [odkrył tę wadę](https://www.saurik.com/optimism.html) i powiadomił zespół, [otrzymując przy tym dużą nagrodę](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Przydatną strategią jest ustalanie wysokości nagrody w proporcji do wartości zagrożonych środków. Podejście to, określane mianem „[skalowalnych nagród za błędy](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, zapewnia zachęty finansowe dla osób, które w sposób odpowiedzialny ujawniają luki w zabezpieczeniach, zamiast je wykorzystywać.

### 5. Postępuj zgodnie z najlepszymi praktykami podczas tworzenia inteligentnych kontraktów {#follow-smart-contract-development-best-practices}

Istnienie audytów i programów nagród za znalezienie błędu nie zwalnia z odpowiedzialności za pisanie kodu wysokiej jakości. Dobre zabezpieczenie inteligentnego kontraktu zaczyna się na etapie projektowania i programowania:

- Przechowuj całość kodu w systemie kontroli wersji takim jak git

- Dokonywać każdej modyfikacji kodu za pomocą żądania Pull

- Upewnić się, że żądania Pull mają przynajmniej jednego niezależnego recenzenta, co oznacza, że jeśli samodzielnie pracujesz przy projekcie, powinieneś rozważyć kontakt z innymi programistami w celu wymiany ocen kodu

- Używaj [środowiska deweloperskiego](/developers/docs/frameworks/) do testowania, kompilowania i wdrażania inteligentnych kontraktów

- Przetestuj swój kod za pomocą podstawowych narzędzi do analizy kodu, takich jak [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril i Slither. W idealnych warunkach powinno się robić to przed scaleniem każdego żądania pull, a następnie porównać różnice w danych wyjściowych

- Upewnić się, że kod kompiluje się bez błędów, oraz że kompilator Solidity nie pokazuje żadnych ostrzeżeń

- Odpowiednio dokumentuj swój kod (używając [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) i opisuj szczegóły dotyczące architektury kontraktu w łatwym do zrozumienia języku. Ułatwi to innym przeprowadzenie audytu i recenzji kodu.

### 6. Wdróż solidne plany odzyskiwania po awarii {#implement-disaster-recovery-plans}

Projektowanie bezpiecznej kontroli dostępu, implementowanie modyfikatorów funkcji oraz inne sugestie mogą zwiększyć bezpieczeństwo inteligentnego kontraktu, ale nie mogą wykluczyć ryzyka złośliwego wykorzystania. Tworzenie bezpiecznych inteligentnych kontraktów wymaga "przygotowania się na porażkę" oraz posiadania planu zapasowego na efektywną odpowiedź wobec ataku. Odpowiedni plan odzyskiwania w przypadku katastrofy powinien zawierać następujące komponenty:

#### Aktualizacje kontraktów {#contract-upgrades}

Pomimo tego, że standardowo inteligentne kontrakty Ethereum są niezmienne, możliwe jest osiągnięcie pewnego poziomu zmienności przy użyciu wzorców aktualizacji. Aktualizacja kontraktu jest niezbędne w przypadkach, w których wada krytyczna sprawia, że kontrakt staje się bezużyteczny, a wdrożenie nowej logiki jest najbardziej wykonalną możliwością.

Mechanizmy aktualizowania kontraktu działają na różne sposoby, ale "wzorzec proxy" jest jednym z najbardziej popularnych podejść do aktualizowania inteligentnych kontraktów. [Wzorce proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dzielą stan i logikę aplikacji między _dwa_ kontrakty. Pierwszy kontrakt (nazywany „kontraktem proxy”) przechowuje zmienne stanu (np. salda użytkowników), natomiast drugi kontrakt (nazywany „kontraktem logicznym”) zawiera kod do wykonywania funkcji kontraktu.

Konta wchodzą w interakcję z kontraktem proxy, który przekazuje wszystkie wywołania funkcji do kontraktu logicznego za pomocą niskopoziomowego wywołania [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). W przeciwieństwie do zwykłego wywołania wiadomości, `delegatecall()` zapewnia, że kod działający pod adresem kontraktu logicznego jest wykonywany w kontekście kontraktu wywołującego. Oznacza to, że kontrakt logiczny zawsze będzie zapisywał dane w pamięci masowej proxy (zamiast we własnej), a oryginalne wartości `msg.sender` i `msg.value` zostaną zachowane.

Delegowanie wywołań do kontraktu logicznego wymaga przechowywania jego adresu w pamięci kontraktu proxy. Dlatego aktualizacja logiki kontraktu jest jedynie kwestią wdrożenia kolejnego kontraktu logicznego i przechowania nowego adresu w kontrakcie proxy. Jako że kolejne wywołania kontraktu proxy są automatycznie przekierowane do nowego kontraktu logicznego, "aktualizacja" została dokonana właściwie bez modyfikacji kodu.

[Więcej o aktualizowaniu kontraktów](/developers/docs/smart-contracts/upgrading/).

#### Zatrzymania awaryjne {#emergency-stops}

Jak wspomniano wcześniej, nawet dokładne audyty i testowanie nie są w stanie odkryć dokładnie wszystkich błędów w inteligentnym kontrakcie. Jeśli luka w zabezpieczeniach ujawni się w kodzie już po wdrożeniu, załatanie jej nie jest możliwe, ponieważ nie można zmienić kodu uruchomionego pod adresem kontraktu. Ponadto, implementacja mechanizmów aktualizacji (np. wzorca proxy) mogą zająć czas (wymagają one często zgody wielu stron), co działa tylko na korzyść napastników, dając im więcej czasu na dokonanie szkód.

Opcją nuklearną jest implementacja funkcji "wyłącznika awaryjnego", która blokuje wywołania zagrożonych funkcji kontraktu. Wyłączniki awaryjne zawierają zwykle następujące komponenty:

1. Globalną zmienną logiczną, która wykazuje czy inteligentny kontrakt jest w stanie zatrzymania czy nie. Zmienna ta jest ustawiona na `false` podczas konfigurowania kontraktu, ale powróci do wartości `true`, gdy kontrakt zostanie zatrzymany.

2. Funkcje, które odnoszą się do zmiennej logicznej w swoim działaniu. Takie funkcje są dostępne, kiedy inteligentny kontrakt nie jest zatrzymany, a przestają być dostępne, kiedy funkcja awaryjnego wyłącznika zostaje aktywowana.

3. Podmiot, który ma dostęp do funkcji zatrzymania awaryjnego, która ustawia zmienną logiczną na `true`. Aby uniknąć złośliwych działań, wywołania tej funkcji mogą zostać ograniczone do zaufanych adresów (np. właściciela kontraktu).

Kiedy kontrakt aktywuje wyłącznik awaryjny, określone funkcje przestaną być dostępne. Osiąga się to poprzez opakowanie wybranych funkcji modyfikatorem, który odnosi się do zmiennej globalnej. Poniżej znajduje się [przykład](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) opisujący implementację tego wzorca w kontraktach:

```solidity
// Ten kod nie został profesjonalnie zaudytowany i nie daje żadnych gwarancji bezpieczeństwa ani poprawności. Używaj na własne ryzyko.

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
        // Tutaj odbywa się logika depozytu
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Tutaj odbywa się awaryjna wypłata
    }
}
```

Ten przykład ukazuje podstawowe cechy wyłączników awaryjnych:

- `isStopped` to zmienna logiczna, która na początku ma wartość `false`, a po przejściu kontraktu w tryb awaryjny – `true`.

- Modyfikatory funkcji `onlyWhenStopped` i `stoppedInEmergency` sprawdzają zmienną `isStopped`. `stoppedInEmergency` służy do kontrolowania funkcji, które powinny być niedostępne, gdy kontrakt jest podatny na ataki (np. `deposit()`). Wywołania tej funkcji po prostu zostaną anulowane.

`onlyWhenStopped` jest używany dla funkcji, które powinny być możliwe do wywołania w sytuacji awaryjnej (np. `emergencyWithdraw()`). Takie funkcje mogą pomóc w rozwiązaniu sytuacji, dlatego wykluczone są z listy "zastrzeżonych funkcji".

Użycie funkcji wyłącznika awaryjnego zapewnia efektywne rozwiązanie tymczasowe pozwalające poradzić sobie z poważnymi podatnościami inteligentnego kontraktu. Zwiększa jednak potrzebę zaufania wobec programistów, że nie użyją jej dla własnej korzyści. Aby się to tego odnieść, można użyć środków takich jak decentralizacja kontroli nad wyłącznikami awaryjnymi poprzez poddanie jej pod mechanizm głosowania onchain, zamku czasowego lub użycia do jej kontroli portfela multisig.

#### Monitorowanie zdarzeń {#event-monitoring}

[Zdarzenia](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) pozwalają śledzić wywołania funkcji inteligentnych kontraktów i monitorować zmiany zmiennych stanu. Zaleca się programowanie kontraktów w taki sposób, aby emitowały zdarzenie za każdym razem, gdy jakiś podmiot wykonuje czynność istotną z perspektywy zabezpieczeń (np. wypłatę środków).

Rejestrowanie zdarzeń i monitorowanie ich offchain zapewnia wgląd do operacji kontraktu i pomaga w szybszym odkrywaniu złośliwych czynności. Oznacza to, że zespół może szybciej odpowiedzieć na haki i zacząć działać, aby ograniczyć negatywny wpływ grożący użytkownikom, np. zatrzymując funkcje lub wykonując aktualizację.

Można również zdecydować się na gotowe narzędzie do monitorowania, które automatycznie przekazuje ostrzeżenia za każdym razem, kiedy ktoś wchodzi w interakcję z kontraktem. Narzędzia te pozwalają stworzyć niestandardowe powiadomienia wywoływane różnymi wyzwalaczami takimi jak wielkość wolumenu transakcji, częstotliwość wywoływania funkcji oraz użycie określonych funkcji. Na przykład można zaprogramować powiadomienie, który przychodzi, kiedy suma wypłacona w jednej transakcji przekracza określony próg.

### 7. Projektuj bezpieczne systemy zarządzania {#design-secure-governance-systems}

Warte rozważenia jest zdecentralizowanie aplikacji poprzez oddanie kontroli nad kluczowymi inteligentnymi kontraktami członkom społeczności. W tym przypadku system inteligentnego kontraktu będzie zawierał moduł zarządzający — mechanizm, który pozwala członkom społeczności aprobować czynności administracyjne poprzez system zarządzania onchain. Na przykład propozycja aktualizacji kontraktu proxy do nowej wersji może być poddana głosowaniu posiadaczom tokena.

Zdecentralizowane zarządzanie może być korzystne, ponieważ czyni zbieżnym interes programistów oraz użytkowników końcowych. Niemniej mechanizmy zarządzania inteligentnymi kontraktami mogą wprowadzić nowe ryzyka w przypadku niepoprawnej implementacji. Prawdopodobnym scenariuszem jest sytuacja, w której atakujący zdobywa ogromną siłę głosu (mierzoną liczbą posiadanych tokenów) poprzez wzięcie [błyskawicznej pożyczki](/defi/#flash-loans) i przeforsowuje złośliwą propozycję.

Jednym ze sposobów zapobiegania problemom związanym z zarządzaniem on-chain jest [użycie blokady czasowej (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Zamek czasowy powstrzymuje inteligentny kontrakt przed wykonaniem pewnej funkcji, zanim minie określona ilość czasu. Inne strategie przewidują nadanie "ciężaru głosu" każdemu tokenowi na bazie czasu, na jaki został zablokowany lub zmierzenie siły adresu w przeszłym okresie (na przykład 2 czy 3 bloki wstecz) zamiast w czasie aktualnego bloku. Obie metody obniżają ryzyko szybkiego gromadzenia siły głosu, aby przechylić na swoją korzyść głosowania onchain.

Więcej na temat [projektowania bezpiecznych systemów zarządzania](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [różnych mechanizmów głosowania w DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) oraz [powszechnych wektorów ataków na DAO wykorzystujących DeFi](https://dacian.me/dao-governance-defi-attacks) w udostępnionych linkach.

### 8. Ogranicz złożoność kodu do minimum {#reduce-code-complexity}

Programiści tradycyjnego oprogramowania są zaznajomieni z zasadą KISS ("ma być prosto głupku"), która odradza wprowadzania niepotrzebnej złożoności do projektu oprogramowania. Jest to zgodne ze znanym od dawana stwierdzeniem, że "złożone systemy zawodzą w złożone sposoby" oraz są najbardziej podatne na kosztowne błędy.

Zachowanie prostoty jest szczególnie ważne przy pisaniu inteligentnych kontraktów, jeśli weźmiemy pod wagę fakt, że inteligentne kontrakty mogą potencjalnie kontrolować aktywa o wysokiej wartości. Wskazówką pozwalającą na osiągnięcie prostoty podczas pisania inteligentnych kontraktów jest ponowne wykorzystywanie istniejących bibliotek, takich jak [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), tam, gdzie to możliwe. Biblioteki te bowiem poddane były dokładnym audytom oraz testom prowadzonym przez programistów. Używanie ich ogranicza ryzyko popełnienia błędu podczas pisania nowych funkcji od zera.

Inną powszechną wskazówką jest pisanie niewielkich funkcji i dbanie o modularność kontraktów poprzez rozdzielanie logiki biznesowej pomiędzy wiele kontraktów. Pisanie prostszego kodu nie tylko ogranicza powierzchnię potencjalnego ataku w inteligentnym kontrakcie, ale również ułatwia rozważania na temat poprawności całego systemu oraz szybkie wykrywanie możliwych błędów projektowych.

### 9. Chroń się przed powszechnymi lukami w zabezpieczeniach inteligentnych kontraktów {#mitigate-common-smart-contract-vulnerabilities}

#### Ponowne wejście (reentrancy) {#reentrancy}

EVM nie pozwala na współbieżność w takim znaczeniu, że dwa kontrakty biorące udział w wywołaniu komunikatu nie mogą działać jednocześnie. Zewnętrzne wywołanie zatrzymuje działanie kontraktu wywołującego oraz jego pamięć do czasu powrotu wywołania. Po tym fakcie działanie jest wznowione. Proces ten można formalnie opisać jako przekazanie [przepływu sterowania](https://www.computerhope.com/jargon/c/contflow.htm) do innego kontraktu.

W większości przypadków jest to nieszkodliwe, ale przenoszenie kontroli przepływu do niezaufanych kontaktów może powodować problemy takie jak atak rekurencyjny. Atak rekurencyjny występuje, gdy złośliwy kontrakt powraca wywołanie do narażonego kontraktu, zanim wywołanie właściwej funkcji dobiegnie końca. Najlepiej wyjaśnić to za pomocą przykładu.

Weźmy prosty inteligentny kontrakt ("Ofiarę"), który pozwala każdemu na deponowanie i wypłacanie eteru:

```solidity
// Ten kontrakt jest podatny na ataki. Nie używać w środowisku produkcyjnym

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

Ten kontrakt udostępnia funkcję `withdraw()`, aby umożliwić użytkownikom wypłatę ETH wcześniej zdeponowanego w kontrakcie. Przetwarzając wypłatę, kontrakt dokonuje następujących działań:

1. Sprawdza saldo ETH użytkownika
2. Wysyła środki na wywołujący adres
3. Resetuje ich saldo do 0 uniemożliwiając dalszych wypłat temu użytkownikowi

Funkcja `withdraw()` w kontrakcie `Victim` jest zgodna ze wzorcem „sprawdzenie-interakcje-efekty”. _Sprawdza_, czy warunki niezbędne do wykonania są spełnione (tj. użytkownik ma dodatnie saldo ETH) i wykonuje _interakcję_, wysyłając ETH na adres wywołującego, przed zastosowaniem _efektów_ transakcji (tj. zmniejszeniem salda użytkownika).

Jeśli funkcja `withdraw()` jest wywoływana z konta zewnętrznego (EOA), funkcja wykonuje się zgodnie z oczekiwaniami: `msg.sender.call.value()` wysyła ETH do wywołującego. Jeśli jednak `msg.sender` jest kontem inteligentnego kontraktu, które wywołuje `withdraw()`, wysłanie środków za pomocą `msg.sender.call.value()` spowoduje również uruchomienie kodu zapisanego pod tym adresem.

Wyobraź sobie, że to jest kod wdrożony na adresie kontraktu:

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

Ten kontrakt jest zaprojektowany, aby wykonywać trzy rzeczy:

1. Akceptować depozyt od innego konta (prawdopodobnie od EOA napastnika)
2. Dokonać depozytu 1 ETH na kontrakt Ofiary
3. Wypłacić ten 1 ETH przechowywany przez inteligentny kontrakt

Nie ma w tym nic złego, z wyjątkiem tego, że `Attacker` ma inną funkcję, która ponownie wywołuje `withdraw()` w `Victim`, jeśli ilość gazu pozostała z przychodzącego `msg.sender.call.value` jest większa niż 40 000. Daje to `Attacker` możliwość ponownego wejścia do `Victim` i wypłacenia większej ilości środków, _zanim_ pierwsze wywołanie `withdraw` zostanie zakończone. Cykl wygląda następująco:

```solidity
- EOA atakującego wywołuje `Attacker.beginAttack()` z 1 ETH
- `Attacker.beginAttack()` wpłaca 1 ETH do `Victim`
- `Attacker` wywołuje `withdraw()` w `Victim`
- `Victim` sprawdza saldo `Attacker` (1 ETH)
- `Victim` wysyła 1 ETH do `Attacker` (co uruchamia funkcję domyślną)
- `Attacker` ponownie wywołuje `Victim.withdraw()` (zauważ, że `Victim` nie zmniejszyło salda `Attacker` po pierwszej wypłacie)
- `Victim` sprawdza saldo `Attacker` (które wciąż wynosi 1 ETH, ponieważ nie zastosowano efektów pierwszego wywołania)
- `Victim` wysyła 1 ETH do `Attacker` (co uruchamia funkcję domyślną i pozwala `Attacker` na ponowne wejście do funkcji `withdraw`)
- Proces powtarza się, dopóki `Attacker` nie wyczerpie gazu, w którym to momencie `msg.sender.call.value` zwraca wartość bez uruchamiania dodatkowych wypłat
- `Victim` w końcu stosuje wyniki pierwszej (i kolejnych) transakcji do swojego stanu, więc saldo `Attacker` jest ustawiane na 0
```

Podsumowując, z uwagi na to, że saldo wywołującego nie jest ustawione na 0 dopóki wykonanie funkcji nie jest skończone, późniejsze wywołania osiągną sukces i pozwolą wywołującemu wypłacić środki wielokrotnie. Ten rodzaj ataku może być wykorzystany do drenażu środków z inteligentnego kontraktu, jak to miało miejsce podczas [ataku na DAO w 2016 roku](https://www.coindesk.com/learn/understanding-the-dao-attack). Ataki typu reentrancy są do dziś krytycznym problemem dla inteligentnych kontraktów, o czym świadczą [publiczne listy exploitów reentrancy](https://github.com/pcaversaccio/reentrancy-attacks).

##### Jak zapobiegać atakom rekurencyjnym

Jednym ze sposobów radzenia sobie z ponownym wejściem jest przestrzeganie [wzorca sprawdzenie-efekty-interakcje](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Ten wzorzec kieruje wykonaniem funkcji w taki sposób, że w pierwszej kolejności dokonuje niezbędnych sprawdzeń, następnie wykonuje kod zmieniający stan kontraktu, a na końcu kod, który wchodzi w interakcję z kontraktami lub EOA.

Wzorzec sprawdzenie-efekty-interakcje jest użyty w poprawionej wersji kontraktu `Victim` pokazanej poniżej:

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

Ten kontrakt wykonuje _sprawdzenie_ salda użytkownika, stosuje _efekty_ funkcji `withdraw()` (zerując saldo użytkownika), a następnie przechodzi do wykonania _interakcji_ (wysłania ETH na adres użytkownika). Dzięki temu kontrakt aktualizuje swoją pamięć przed zewnętrznym wywołaniem, eliminując tym samym warunki do ataku rekurencyjnego, które zaistniały wcześniej. Kontrakt `Attacker` wciąż może wywołać `NoLongerAVictim`, ale ponieważ `balances[msg.sender]` zostało ustawione na 0, dodatkowe wypłaty spowodują błąd.

Innym rozwiązaniem jest zastosowanie wzajemnie wykluczających się zamków (powszechnie znanych pod nazwą "mutex"), które zamykają część stanu kontraktu do czasu zakończenia wywołania funkcji. Jest to realizowane za pomocą zmiennej logicznej, która jest ustawiana na `true` przed wykonaniem funkcji i wraca do `false` po zakończeniu wywołania. Jak pokazuje poniższy przykład, używanie mutex zapewnia ochronę przed atakami rekurencyjnymi w czasie, kiedy pierwotne wywołanie wciąż jest przetwarzane.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Zablokowano przed ponownym wejściem.");
        locked = true;
        _;
        locked = false;
    }
    // Ta funkcja jest chroniona przez muteks, więc ponowne wywołania z wewnątrz `msg.sender.call` nie mogą ponownie wywołać `withdraw`.
    //  Instrukcja `return` zwraca `true`, ale nadal ocenia instrukcję `locked = false` w modyfikatorze
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Brak salda do wypłaty.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Można również użyć systemu [płatności typu pull](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment), który wymaga od użytkowników wypłacania środków z inteligentnych kontraktów, zamiast systemu „płatności typu push”, który wysyła środki na konta. Eliminuje to możliwość przypadkowego uruchomienia kodu pod nieznanymi adresami (i może również zapobiec niektórym atakom typu „odmowa usługi”).

#### Niedomiar i przepełnienie liczb całkowitych {#integer-underflows-and-overflows}

Przepełnienie całkowite występuje, gdy wyniki operacji arytmetycznej wykroczą poza dopuszczalny zakres wartości, powodując ich „przesunięcie” do najniższej możliwej do przedstawienia wartości. Na przykład `uint8` może przechowywać wartości tylko do 2^8-1=255. Operacje arytmetyczne, których wynik jest większy niż `255`, spowodują przepełnienie i zresetowanie `uint` do `0`, podobnie jak licznik kilometrów w samochodzie zeruje się po osiągnięciu maksymalnego przebiegu (999999).

Niedomiar liczb całkowitych zdarza się z podobnych powodów: wynik operacji arytmetycznej mieści się poniżej dopuszczalnego zakresu. Powiedzmy, że próbujesz dekrementować `0` w `uint8`, wynik po prostu „przewinie się” do maksymalnej reprezentowalnej wartości (`255`).

Zarówno przepełnienia, jak i niedopełnienia liczb całkowitych mogą prowadzić do nieoczekiwanych zmian zmiennych stanu kontraktu i skutkować nieplanowanym wykonaniem. Poniżej znajduje się przykład pokazujący, w jaki sposób atakujący może wykorzystać przepełnienie arytmetyczne w inteligentnym kontrakcie do wykonania nieprawidłowej operacji:

```
pragma solidity ^0.7.6;

// Ten kontrakt ma działać jako skarbiec czasowy.
// Użytkownik może wpłacać środki do tego kontraktu, ale nie może ich wypłacić przez co najmniej tydzień.
// Użytkownik może również wydłużyć czas oczekiwania poza 1-tygodniowy okres.

/*
1. Wdróż TimeLock
2. Wdróż Attack z adresem TimeLock
3. Wywołaj Attack.attack wysyłając 1 ether. Natychmiast będziesz mógł
   wypłacić swój ether.

Co się stało?
Atak spowodował przepełnienie TimeLock.lockTime i umożliwił wypłatę
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
        require(balances[msg.sender] > 0, "Niewystarczające środki");
        require(block.timestamp > lockTime[msg.sender], "Czas blokady nie upłynął");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Nie udało się wysłać Etheru");
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
        jeśli t = bieżący czas blokady, musimy znaleźć x takie, że
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

##### Jak zapobiegać niedomiarom i przepełnieniom całkowitym

Od wersji 0.8.0 kompilator Solidity odrzuca kod powodujący przepełnienia i niedopełnienia liczb całkowitych. Jednakże kontrakty skompilowane przy użyciu niższej wersji kompilatora powinny albo wykonywać sprawdzenia funkcji obejmujących operacje arytmetyczne, albo używać biblioteki (np. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)), która sprawdza niedomiar/przepełnienie.

#### Manipulacja wyroczniami {#oracle-manipulation}

[Wyrocznie](/developers/docs/oracles/) pozyskują informacje spoza łańcucha (off-chain) i przesyłają je do łańcucha (on-chain) do wykorzystania przez inteligentne kontrakty. Dzięki wyroczniom można projektować inteligentne kontrakty, które współpracują z systemami off-chain, takimi jak rynki kapitałowe, co znacznie rozszerza ich zastosowanie.

Jeśli jednak wyrocznia jest uszkodzona i wysyła nieprawidłowe informacje w łańcuchu, inteligentne kontrakty będą wykonywane w oparciu o błędne dane wejściowe, co może powodować problemy. To jest podstawa „problemu wyroczni”, który dotyczy zadania upewnienia się, że informacje z wyroczni blockchain są dokładne, aktualne i aktualne.

Podobnym problemem bezpieczeństwa jest korzystanie z wyroczni łańcuchowej, takiej jak zdecentralizowana giełda, w celu uzyskania bieżącej ceny aktywów. Platformy pożyczkowe w branży [zdecentralizowanych finansów (DeFi)](/defi/) często robią to, aby określić wartość zabezpieczenia użytkownika w celu ustalenia, ile może on pożyczyć.

Ceny DEX są często dokładne, głównie dzięki arbitrażystom przywracającym parytet na rynkach. Są one jednak podatne na manipulację, szczególnie jeśli wyrocznia on-chain oblicza ceny aktywów w oparciu o historyczne wzorce handlowe (co zwykle ma miejsce).

Przykładowo, atakujący może sztucznie zawyżać cenę spot aktywów, zaciągając pożyczkę błyskawiczną tuż przed podpisaniem umowy kredytowej. Zapytanie o cenę aktywów na giełdzie DEX zwróciłoby wyższą niż zwykle wartość (z powodu dużego „zlecenia kupna” atakującego, zaburzającego popyt na aktywa), co umożliwiłoby mu pożyczenie większej kwoty, niż powinien. Tego typu „błyskawiczne ataki kredytowe” wykorzystywano w celu wykorzystania zależności aplikacji DeFi od wyroczni cenowych, co kosztowało protokoły miliony dolarów w postaci utraconych środków.

##### Jak zapobiegać manipulacjom wyrocznią

Minimalnym wymogiem, aby [uniknąć manipulacji wyrocznią](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples), jest korzystanie ze zdecentralizowanej sieci wyroczni, która pobiera informacje z wielu źródeł, aby uniknąć pojedynczych punktów awarii. W większości przypadków zdecentralizowane wyrocznie mają wbudowane zachęty kryptoekonomiczne, które mają skłaniać węzły wyroczni do raportowania prawidłowych informacji, dzięki czemu są bezpieczniejsze niż wyrocznie scentralizowane.

Jeśli planujesz wysłać zapytanie do wyroczni onchain o ceny aktywów, rozważ użycie takiej, która implementuje mechanizm średniej ceny ważonej w czasie (TWAP). [Wyrocznia TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) wysyła zapytanie o cenę aktywa w dwóch różnych punktach w czasie (które można modyfikować) i oblicza cenę spot na podstawie uzyskanej średniej. Wybór dłuższych okresów czasu chroni protokół przed manipulacją cenami, ponieważ duże zlecenia zrealizowane niedawno nie mają wpływu na ceny aktywów.

## Zasoby dotyczące bezpieczeństwa inteligentnych kontraktów dla programistów {#smart-contract-security-resources-for-developers}

### Narzędzia do analizy inteligentnych kontraktów i weryfikacji poprawności kodu {#code-analysis-tools}

- **[Narzędzia i biblioteki testowe](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** – _Zbiór standardowych narzędzi i bibliotek do przeprowadzania testów jednostkowych oraz analizy statycznej i dynamicznej inteligentnych kontraktów._

- **[Narzędzia do weryfikacji formalnej](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** – _narzędzia do weryfikacji poprawności funkcjonalnej w inteligentnych kontraktach i sprawdzania niezmienników._

- **[Usługi audytu inteligentnych kontraktów](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** – _Lista organizacji świadczących usługi audytu inteligentnych kontraktów dla projektów deweloperskich Ethereum._

- **[Platformy nagród za błędy](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** – _Platformy do koordynowania nagród za błędy i nagradzania za odpowiedzialne ujawnianie krytycznych luk w zabezpieczeniach inteligentnych kontraktów._

- **[Fork Checker](https://forkchecker.hashex.org/)** – _Darmowe narzędzie online do sprawdzania wszystkich dostępnych informacji dotyczących sforkowanego kontraktu._

- **[ABI Encoder](https://abi.hashex.org/)** – _darmowa usługa online do kodowania funkcji kontraktu Solidity i argumentów konstruktora._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** – _Statyczny analizator Solidity, przechodzący przez Abstrakcyjne Drzewa Składni (AST) w celu wskazania podejrzanych luk w zabezpieczeniach i drukowania problemów w łatwym do przyswojenia formacie markdown._

### Narzędzia do monitorowania inteligentnych kontraktów {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** – _Narzędzie do otrzymywania powiadomień w czasie rzeczywistym, gdy na Twoich inteligentnych kontraktach lub w portfelach zdarzają się nietypowe lub nieoczekiwane zdarzenia._

### Narzędzia do bezpiecznego administrowania inteligentnymi kontraktami {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** – _portfel inteligentnego kontraktu działający na Ethereum, który wymaga minimalnej liczby osób do zatwierdzenia transakcji, zanim będzie mogła ona nastąpić (M-z-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** – _Biblioteki kontraktów do wdrażania funkcji administracyjnych, w tym własności kontraktu, uaktualnień, kontroli dostępu, zarządzania, możliwości wstrzymania i innych._

### Usługi audytu inteligentnych kontraktów {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** – _Usługa audytu inteligentnych kontraktów, która pomaga projektom w całym ekosystemie blockchain upewnić się, że ich protokoły są gotowe do uruchomienia i zbudowane w celu ochrony użytkowników._

- **[CertiK](https://www.certik.com/)** – _Firma zajmująca się bezpieczeństwem blockchain, pionier w stosowaniu najnowocześniejszej technologii weryfikacji formalnej w inteligentnych kontraktach i sieciach blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** – _Firma zajmująca się cyberbezpieczeństwem, która łączy badania nad bezpieczeństwem z mentalnością atakującego, aby zmniejszyć ryzyko i wzmocnić kod._

- **[PeckShield](https://peckshield.com/)** – _Firma zajmująca się bezpieczeństwem blockchain, oferująca produkty i usługi zapewniające bezpieczeństwo, prywatność i użyteczność całego ekosystemu blockchain._

- **[QuantStamp](https://quantstamp.com/)** – _Usługa audytorska ułatwiająca powszechne przyjęcie technologii blockchain poprzez usługi oceny bezpieczeństwa i ryzyka._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** – _Firma zajmująca się bezpieczeństwem inteligentnych kontraktów, która przeprowadza audyty bezpieczeństwa dla systemów rozproszonych._

- **[Runtime Verification](https://runtimeverification.com/)** – _Firma zajmująca się bezpieczeństwem, specjalizująca się w formalnym modelowaniu i weryfikacji inteligentnych kontraktów._

- **[Hacken](https://hacken.io)** – _Audytor cyberbezpieczeństwa Web3, który wprowadza kompleksowe podejście (360 stopni) do bezpieczeństwa blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** – _Usługi audytu Solidity i Cairo, zapewniające integralność inteligentnych kontraktów i bezpieczeństwo użytkowników w sieciach Ethereum i Starknet._

- **[HashEx](https://hashex.org/)** – _HashEx koncentruje się na audycie blockchain i inteligentnych kontraktów w celu zapewnienia bezpieczeństwa kryptowalut, świadcząc usługi takie jak tworzenie inteligentnych kontraktów, testy penetracyjne, doradztwo w zakresie blockchain._

- **[Code4rena](https://code4rena.com/)** – _Konkurencyjna platforma audytowa, która zachęca ekspertów ds. bezpieczeństwa inteligentnych kontraktów do znajdowania luk w zabezpieczeniach i pomaga uczynić web3 bezpieczniejszym._

- **[CodeHawks](https://codehawks.com/)** – _Konkurencyjna platforma audytowa organizująca konkursy audytu inteligentnych kontraktów dla badaczy bezpieczeństwa._

- **[Cyfrin](https://cyfrin.io)** – _potęga bezpieczeństwa Web3, inkubująca bezpieczeństwo kryptowalut poprzez produkty i usługi audytu inteligentnych kontraktów._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** – _Firma zajmująca się bezpieczeństwem Web3, oferująca audyty bezpieczeństwa systemów blockchain za pośrednictwem zespołu doświadczonych audytorów i najlepszych w swojej klasie narzędzi._

- **[Oxorio](https://oxor.io/)** – _Audyty inteligentnych kontraktów i usługi bezpieczeństwa blockchain z doświadczeniem w technologiach EVM, Solidity, ZK, Cross-chain dla firm kryptograficznych i projektów DeFi._

- **[Inference](https://inference.ag/)** – _Firma audytorska w zakresie bezpieczeństwa, specjalizująca się w audycie inteligentnych kontraktów dla blockchainów opartych na EVM._ Eksperci w dziedzinie audytów umiejący zidentyfikować potencjalne problemy i zasugerować działające rozwiązania do zastosowania przed wdrożeniem._

### Platformy bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** – _Platforma bug bounty dla inteligentnych kontraktów i projektów DeFi, na której badacze bezpieczeństwa przeglądają kod, ujawniają luki w zabezpieczeniach, otrzymują wynagrodzenie i sprawiają, że kryptowaluty są bezpieczniejsze._

- **[HackerOne](https://www.hackerone.com/)** – _Platforma koordynacji luk w zabezpieczeniach i nagród za błędy, która łączy firmy z testerami penetracyjnymi i badaczami cyberbezpieczeństwa._

- **[HackenProof](https://hackenproof.com/)** – _Ekspercka platforma nagród za błędy dla projektów kryptograficznych (DeFi, inteligentne kontrakty, portfele, CEX i inne), na której specjaliści ds. bezpieczeństwa świadczą usługi selekcji, a badacze otrzymują wynagrodzenie za odpowiednie, zweryfikowane raporty o błędach._

- **[Sherlock](https://www.sherlock.xyz/)** – _Gwarant w Web3 w zakresie bezpieczeństwa inteligentnych kontraktów, z wypłatami dla audytorów zarządzanymi za pośrednictwem inteligentnych kontraktów, aby zapewnić, że odpowiednie błędy są uczciwie opłacane._

- **[CodeHawks](https://www.codehawks.com/)** – _Konkurencyjna platforma bug bounty, na której audytorzy biorą udział w konkursach i wyzwaniach dotyczących bezpieczeństwa, a (wkrótce) także we własnych prywatnych audytach._

### Publikacje znanych luk w zabezpieczeniach inteligentnych kontraktów i exploitów {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Znane ataki na inteligentne kontrakty](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** – _Przyjazne dla początkujących wyjaśnienie najważniejszych luk w zabezpieczeniach kontraktów, z przykładowym kodem dla większości przypadków._

- **[Rejestr SWC](https://swcregistry.io/)** – _Wyselekcjonowana lista elementów Common Weakness Enumeration (CWE), które mają zastosowanie do inteligentnych kontraktów Ethereum._

- **[Rekt](https://rekt.news/)** – _Regularnie aktualizowana publikacja głośnych hacków i exploitów kryptograficznych, wraz ze szczegółowymi raportami pośmiertnymi._

### Wyzwania związane z nauką bezpieczeństwa inteligentnych kontraktów {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** – _Wyselekcjonowana lista gier wojennych, wyzwań i konkursów [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) z zakresu bezpieczeństwa blockchain oraz opisy rozwiązań._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** – _Gra wojenna do nauki bezpieczeństwa ofensywnego inteligentnych kontraktów DeFi oraz budowania umiejętności w polowaniu na błędy i audycie bezpieczeństwa._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** – _Gra wojenna oparta na Web3/Solidity, w której każdy poziom jest inteligentnym kontraktem, który należy „zhakować”._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** – _Wyzwanie hakerskie dotyczące inteligentnych kontraktów, osadzone w fantastycznej przygodzie._ Pomyślne ukończenie wyzwania daje również dostęp do prywatnego programu nagród za znalezienie błędu._

### Najlepsze praktyki w zakresie zabezpieczania inteligentnych kontraktów {#smart-contract-security-best-practices}

- **[ConsenSys: Najlepsze praktyki w zakresie bezpieczeństwa inteligentnych kontraktów Ethereum](https://consensys.github.io/smart-contract-best-practices/)** – _Kompleksowa lista wytycznych dotyczących zabezpieczania inteligentnych kontraktów Ethereum._

- **[Nascent: Prosty zestaw narzędzi bezpieczeństwa](https://github.com/nascentxyz/simple-security-toolkit)** – _Zbiór praktycznych przewodników i list kontrolnych dotyczących bezpieczeństwa w tworzeniu inteligentnych kontraktów._

- **[Wzorce Solidity](https://fravoll.github.io/solidity-patterns/)** – _Użyteczna kompilacja bezpiecznych wzorców i najlepszych praktyk dla języka programowania inteligentnych kontraktów Solidity._

- **[Dokumentacja Solidity: Kwestie bezpieczeństwa](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** – _Wytyczne dotyczące pisania bezpiecznych inteligentnych kontraktów za pomocą Solidity._

- **[Standard weryfikacji bezpieczeństwa inteligentnych kontraktów](https://github.com/securing/SCSVS)** – _Czternastoczęściowa lista kontrolna stworzona w celu standaryzacji bezpieczeństwa inteligentnych kontraktów dla programistów, architektów, recenzentów bezpieczeństwa i dostawców._

- **[Naucz się bezpieczeństwa i audytu inteligentnych kontraktów](https://updraft.cyfrin.io/courses/security)** – _Kompletny kurs bezpieczeństwa i audytu inteligentnych kontraktów, stworzony dla programistów inteligentnych kontraktów, którzy chcą podnieść swoje najlepsze praktyki w zakresie bezpieczeństwa i stać się badaczami bezpieczeństwa._

### Samouczki dotyczące bezpieczeństwa inteligentnych kontraktów {#tutorials-on-smart-contract-security}

- [Jak pisać bezpieczne inteligentne kontrakty](/developers/tutorials/secure-development-workflow/)

- [Jak używać Slither do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jak używać Manticore do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Wytyczne dotyczące bezpieczeństwa inteligentnych kontraktów](/developers/tutorials/smart-contract-security-guidelines/)

- [Jak bezpiecznie zintegrować swój kontrakt tokena z dowolnymi tokenami](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft – Pełny kurs na temat bezpieczeństwa i audytu inteligentnych kontraktów](https://updraft.cyfrin.io/courses/security)
