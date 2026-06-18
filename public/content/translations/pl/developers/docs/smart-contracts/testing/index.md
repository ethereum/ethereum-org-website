---
title: Testowanie inteligentnych kontraktów
description: Przegląd technik i zagadnień związanych z testowaniem inteligentnych kontraktów Ethereum.
lang: pl
---

Publiczne blockchainy, takie jak Ethereum, są niezmienne, co utrudnia zmianę kodu inteligentnego kontraktu po wdrożeniu. Istnieją [wzorce aktualizacji kontraktów](/developers/docs/smart-contracts/upgrading/) do przeprowadzania „wirtualnych aktualizacji”, ale są one trudne do wdrożenia i wymagają konsensusu społecznego. Co więcej, aktualizacja może naprawić błąd tylko _po_ jego odkryciu — jeśli atakujący odkryje lukę jako pierwszy, Twój inteligentny kontrakt jest narażony na exploit.

Z tych powodów testowanie inteligentnych kontraktów przed [wdrożeniem](/developers/docs/smart-contracts/deploying/) do sieci głównej (Mainnet) jest minimalnym wymogiem dla [bezpieczeństwa](/developers/docs/smart-contracts/security/). Istnieje wiele technik testowania kontraktów i oceny poprawności kodu; to, co wybierzesz, zależy od Twoich potrzeb. Niemniej jednak zestaw testów składający się z różnych narzędzi i podejść jest idealny do wychwytywania zarówno drobnych, jak i poważnych luk w zabezpieczeniach w kodzie kontraktu.

## Wymagania wstępne {#prerequisites}

Ta strona wyjaśnia, jak testować inteligentne kontrakty przed wdrożeniem w sieci Ethereum. Zakłada, że znasz już [inteligentne kontrakty](/developers/docs/smart-contracts/).

## Czym jest testowanie inteligentnych kontraktów? {#what-is-smart-contract-testing}

Testowanie inteligentnych kontraktów to proces weryfikacji, czy kod inteligentnego kontraktu działa zgodnie z oczekiwaniami. Testowanie jest przydatne do sprawdzania, czy dany inteligentny kontrakt spełnia wymagania dotyczące niezawodności, użyteczności i bezpieczeństwa.

Chociaż podejścia są różne, większość metod testowania wymaga wykonania inteligentnego kontraktu z małą próbką danych, które ma obsługiwać. Jeśli kontrakt generuje poprawne wyniki dla danych przykładowych, zakłada się, że działa prawidłowo. Większość narzędzi testowych zapewnia zasoby do pisania i wykonywania [przypadków testowych](https://en.m.wikipedia.org/wiki/Test_case), aby sprawdzić, czy wykonanie kontraktu jest zgodne z oczekiwanymi wynikami.

### Dlaczego testowanie inteligentnych kontraktów jest ważne? {#importance-of-testing-smart-contracts}

Ponieważ inteligentne kontrakty często zarządzają aktywami finansowymi o dużej wartości, drobne błędy programistyczne mogą i często prowadzą do [ogromnych strat dla użytkowników](https://rekt.news/leaderboard/). Rygorystyczne testowanie może jednak pomóc wcześnie odkryć wady i problemy w kodzie inteligentnego kontraktu i naprawić je przed uruchomieniem w sieci głównej.

Chociaż możliwa jest aktualizacja kontraktu w przypadku wykrycia błędu, aktualizacje są złożone i mogą [skutkować błędami](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/), jeśli zostaną przeprowadzone nieprawidłowo. Aktualizacja kontraktu dodatkowo neguje zasadę niezmienności i obciąża użytkowników dodatkowymi założeniami dotyczącymi zaufania. Z drugiej strony, kompleksowy plan testowania kontraktu łagodzi ryzyko związane z bezpieczeństwem inteligentnych kontraktów i zmniejsza potrzebę przeprowadzania złożonych aktualizacji logiki po wdrożeniu.

## Metody testowania inteligentnych kontraktów {#methods-for-testing-smart-contracts}

Metody testowania inteligentnych kontraktów Ethereum dzielą się na dwie szerokie kategorie: **testowanie automatyczne** i **testowanie ręczne**. Testowanie automatyczne i ręczne oferują unikalne korzyści i kompromisy, ale można połączyć oba, aby stworzyć solidny plan analizy kontraktów.

### Testowanie automatyczne {#automated-testing}

Testowanie automatyczne wykorzystuje narzędzia, które automatycznie sprawdzają kod inteligentnego kontraktu pod kątem błędów w wykonaniu. Korzyść z testowania automatycznego wynika z użycia [skryptów](https://www.techtarget.com/whatis/definition/script?amp=1) do kierowania oceną funkcjonalności kontraktu. Oskryptowane testy można zaplanować tak, aby były uruchamiane wielokrotnie przy minimalnej interwencji człowieka, co czyni testowanie automatyczne bardziej wydajnym niż ręczne podejścia do testowania.

Testowanie automatyczne jest szczególnie przydatne, gdy testy są powtarzalne i czasochłonne; trudne do przeprowadzenia ręcznie; podatne na błędy ludzkie; lub obejmują ocenę krytycznych funkcji kontraktu. Narzędzia do testowania automatycznego mogą jednak mieć wady — mogą przeoczyć niektóre błędy i generować wiele [fałszywie pozytywnych wyników](https://www.contrastsecurity.com/glossary/false-positive). Dlatego idealnym rozwiązaniem jest połączenie testowania automatycznego z testowaniem ręcznym inteligentnych kontraktów.

### Testowanie ręczne {#manual-testing}

Testowanie ręczne jest wspomagane przez człowieka i polega na wykonywaniu każdego przypadku testowego w zestawie testów jeden po drugim podczas analizy poprawności inteligentnego kontraktu. Różni się to od testowania automatycznego, w którym można jednocześnie uruchomić wiele izolowanych testów na kontrakcie i uzyskać raport pokazujący wszystkie nieudane i udane testy.

Testowanie ręczne może być przeprowadzane przez jedną osobę zgodnie z pisemnym planem testów, który obejmuje różne scenariusze testowe. Można również zaangażować wiele osób lub grup do interakcji z inteligentnym kontraktem w określonym czasie w ramach testowania ręcznego. Testerzy porównają rzeczywiste zachowanie kontraktu z oczekiwanym zachowaniem, oznaczając każdą różnicę jako błąd.

Skuteczne testowanie ręczne wymaga znacznych zasobów (umiejętności, czasu, pieniędzy i wysiłku) i możliwe jest — z powodu błędu ludzkiego — przeoczenie pewnych błędów podczas wykonywania testów. Testowanie ręczne może być jednak również korzystne — na przykład tester (np. audytor) może użyć intuicji do wykrycia przypadków brzegowych, które narzędzie do testowania automatycznego by przeoczyło.

## Automatyczne testowanie inteligentnych kontraktów {#automated-testing-for-smart-contracts}

### Testy jednostkowe {#unit-testing-for-smart-contracts}

Testy jednostkowe oceniają funkcje kontraktu oddzielnie i sprawdzają, czy każdy komponent działa poprawnie. Dobre testy jednostkowe powinny być proste, szybkie w uruchomieniu i zapewniać jasny obraz tego, co poszło nie tak, jeśli testy się nie powiodą.

Testy jednostkowe są przydatne do sprawdzania, czy funkcje zwracają oczekiwane wartości i czy pamięć kontraktu jest prawidłowo aktualizowana po wykonaniu funkcji. Co więcej, uruchamianie testów jednostkowych po wprowadzeniu zmian w bazie kodu kontraktu gwarantuje, że dodanie nowej logiki nie wprowadzi błędów. Poniżej znajdują się pewne wytyczne dotyczące przeprowadzania skutecznych testów jednostkowych:

#### Wytyczne dotyczące testów jednostkowych inteligentnych kontraktów {#unit-testing-guidelines}

##### 1. Zrozum logikę biznesową i przepływ pracy swojego kontraktu {#integration-testing-for-smart-contracts}

Przed napisaniem testów jednostkowych warto wiedzieć, jakie funkcjonalności oferuje inteligentny kontrakt oraz w jaki sposób użytkownicy będą uzyskiwać dostęp do tych funkcji i z nich korzystać. Jest to szczególnie przydatne do uruchamiania [testów ścieżki optymistycznej (happy path)](https://en.m.wikipedia.org/wiki/Happy_path), które określają, czy funkcje w kontrakcie zwracają prawidłowe dane wyjściowe dla prawidłowych danych wejściowych użytkownika. Wyjaśnimy tę koncepcję na (skróconym) przykładzie [kontraktu aukcyjnego](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Jest to prosty kontrakt aukcyjny zaprojektowany do przyjmowania ofert w okresie licytacji. Jeśli `highestBid` wzrośnie, poprzedni licytant, który zaoferował najwyższą kwotę, otrzymuje swoje pieniądze z powrotem; po zakończeniu okresu licytacji `beneficiary` wywołuje kontrakt, aby otrzymać swoje pieniądze.

Testy jednostkowe dla takiego kontraktu obejmowałyby różne funkcje, które użytkownik może wywołać podczas interakcji z kontraktem. Przykładem może być test jednostkowy, który sprawdza, czy użytkownik może złożyć ofertę w trakcie trwania aukcji (tj. wywołania `bid()` kończą się sukcesem) lub taki, który sprawdza, czy użytkownik może złożyć wyższą ofertę niż obecna `highestBid`.

Zrozumienie operacyjnego przepływu pracy kontraktu pomaga również w pisaniu testów jednostkowych, które sprawdzają, czy wykonanie spełnia wymagania. Na przykład kontrakt aukcyjny określa, że użytkownicy nie mogą składać ofert po zakończeniu aukcji (tj. gdy `auctionEndTime` jest mniejsze niż `block.timestamp`). W związku z tym deweloper może uruchomić test jednostkowy, który sprawdza, czy wywołania funkcji `bid()` kończą się sukcesem, czy niepowodzeniem po zakończeniu aukcji (tj. gdy `auctionEndTime` > `block.timestamp`).

##### 2. Oceń wszystkie założenia związane z wykonaniem kontraktu {#property-based-testing-for-smart-contracts}

Ważne jest, aby udokumentować wszelkie założenia dotyczące wykonania kontraktu i napisać testy jednostkowe w celu zweryfikowania ich poprawności. Oprócz zapewnienia ochrony przed nieoczekiwanym wykonaniem, testowanie asercji zmusza do myślenia o operacjach, które mogłyby złamać model bezpieczeństwa inteligentnego kontraktu. Przydatną wskazówką jest wyjście poza „testy optymistyczne” i napisanie testów negatywnych, które sprawdzają, czy funkcja kończy się niepowodzeniem dla błędnych danych wejściowych.

Wiele frameworków do testów jednostkowych pozwala na tworzenie asercji — prostych instrukcji określających, co kontrakt może, a czego nie może zrobić — i uruchamianie testów w celu sprawdzenia, czy te asercje są spełnione podczas wykonywania. Deweloper pracujący nad opisanym wcześniej kontraktem aukcyjnym mógłby sformułować następujące asercje dotyczące jego zachowania przed uruchomieniem testów negatywnych:

- Użytkownicy nie mogą składać ofert, gdy aukcja się zakończyła lub jeszcze się nie rozpoczęła.

- Kontrakt aukcyjny cofa transakcję (revert), jeśli oferta jest poniżej akceptowalnego progu.

- Użytkownicy, którym nie uda się wygrać licytacji, otrzymują zwrot swoich środków.

**Uwaga**: Innym sposobem testowania założeń jest pisanie testów, które wyzwalają [modyfikatory funkcji](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) w kontrakcie, w szczególności instrukcje `require`, `assert` i `if…else`.

##### 3. Mierz pokrycie kodu {#static-analysis}

[Pokrycie kodu](https://en.m.wikipedia.org/wiki/Code_coverage) to metryka testowania, która śledzi liczbę gałęzi, wierszy i instrukcji w kodzie wykonanych podczas testów. Testy powinny mieć dobre pokrycie kodu, aby zminimalizować ryzyko nietestowanych luk w zabezpieczeniach. Bez wystarczającego pokrycia można błędnie założyć, że kontrakt jest bezpieczny, ponieważ wszystkie testy kończą się powodzeniem, podczas gdy luki w zabezpieczeniach nadal istnieją w nietestowanych ścieżkach kodu. Odnotowanie wysokiego pokrycia kodu daje jednak pewność, że wszystkie instrukcje/funkcje w inteligentnym kontrakcie zostały wystarczająco przetestowane pod kątem poprawności.

##### 4. Używaj dobrze rozwiniętych frameworków testowych {#dynamic-analysis}

Jakość narzędzi używanych do przeprowadzania testów jednostkowych dla inteligentnych kontraktów ma kluczowe znaczenie. Idealny framework testowy to taki, który jest regularnie utrzymywany; zapewnia przydatne funkcje (np. możliwości logowania i raportowania); i musi być szeroko stosowany oraz sprawdzony przez innych deweloperów.

Frameworki do testów jednostkowych dla inteligentnych kontraktów w języku Solidity są dostępne w różnych językach (głównie JavaScript, Python i Rust). Zapoznaj się z poniższymi przewodnikami, aby uzyskać informacje o tym, jak rozpocząć uruchamianie testów jednostkowych za pomocą różnych frameworków testowych:

- **[Uruchamianie testów jednostkowych za pomocą Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Uruchamianie testów jednostkowych za pomocą Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Uruchamianie testów jednostkowych za pomocą Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Uruchamianie testów jednostkowych za pomocą Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Uruchamianie testów jednostkowych za pomocą Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Uruchamianie testów jednostkowych za pomocą Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Uruchamianie testów jednostkowych za pomocą Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Testy integracyjne {#running-property-based-tests}

Podczas gdy testy jednostkowe debugują funkcje kontraktu w izolacji, testy integracyjne oceniają komponenty inteligentnego kontraktu jako całość. Testy integracyjne mogą wykryć problemy wynikające z wywołań między kontraktami lub interakcji między różnymi funkcjami w tym samym inteligentnym kontrakcie. Na przykład testy integracyjne mogą pomóc sprawdzić, czy takie rzeczy jak [dziedziczenie](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) i wstrzykiwanie zależności działają prawidłowo.

Testowanie integracyjne jest przydatne, jeśli Twój kontrakt przyjmuje architekturę modułową lub łączy się z innymi kontraktami onchain podczas wykonywania. Jednym ze sposobów przeprowadzania testów integracyjnych jest [rozwidlenie (fork) blockchaina](/glossary/#fork) na określonej wysokości (przy użyciu narzędzia takiego jak [Forge](https://book.getfoundry.sh/forge/fork-testing) lub [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) i symulowanie interakcji między Twoim kontraktem a wdrożonymi kontraktami.

Rozwidlony blockchain będzie zachowywał się podobnie do sieci głównej (Mainnet) i będzie miał konta z powiązanymi stanami i saldami. Działa on jednak tylko jako lokalne środowisko programistyczne w piaskownicy (sandbox), co oznacza, że nie będziesz potrzebować prawdziwego ETH do transakcji, a Twoje zmiany nie wpłyną na rzeczywisty protokół Ethereum.

### Testowanie oparte na właściwościach {#manual-testing-for-smart-contracts}

Testowanie oparte na właściwościach to proces sprawdzania, czy inteligentny kontrakt spełnia pewną zdefiniowaną właściwość. Właściwości potwierdzają fakty dotyczące zachowania kontraktu, które powinny pozostać prawdziwe w różnych scenariuszach — przykładem właściwości inteligentnego kontraktu może być „Operacje arytmetyczne w kontrakcie nigdy nie powodują przepełnienia (overflow) ani niedomiaru (underflow)”.

**Analiza statyczna** i **analiza dynamiczna** to dwie powszechne techniki wykonywania testów opartych na właściwościach, a obie mogą zweryfikować, czy kod programu (w tym przypadku inteligentnego kontraktu) spełnia pewną predefiniowaną właściwość. Niektóre narzędzia do testowania opartego na właściwościach są wyposażone w predefiniowane reguły dotyczące oczekiwanych właściwości kontraktu i sprawdzają kod pod kątem tych reguł, podczas gdy inne pozwalają na tworzenie niestandardowych właściwości dla inteligentnego kontraktu.

#### Analiza statyczna {#testing-on-local-blockchain}

Analizator statyczny przyjmuje jako dane wejściowe kod źródłowy inteligentnego kontraktu i generuje wyniki deklarujące, czy kontrakt spełnia właściwość, czy nie. W przeciwieństwie do analizy dynamicznej, analiza statyczna nie obejmuje wykonywania kontraktu w celu przeanalizowania go pod kątem poprawności. Zamiast tego analiza statyczna wnioskuje o wszystkich możliwych ścieżkach, które inteligentny kontrakt mógłby obrać podczas wykonywania (tj. badając strukturę kodu źródłowego w celu określenia, co oznaczałoby to dla działania kontraktu w czasie wykonywania).

[Lintowanie](https://www.perforce.com/blog/qac/what-is-linting) i [testowanie statyczne](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) to powszechne metody przeprowadzania analizy statycznej na kontraktach. Obie wymagają analizy niskopoziomowych reprezentacji wykonania kontraktu, takich jak [drzewa składni abstrakcyjnej](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) i [grafy przepływu sterowania](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) generowane przez kompilator.

W większości przypadków analiza statyczna jest przydatna do wykrywania problemów z bezpieczeństwem, takich jak użycie niebezpiecznych konstrukcji, błędy składniowe lub naruszenia standardów kodowania w kodzie kontraktu. Wiadomo jednak, że analizatory statyczne są na ogół zawodne w wykrywaniu głębszych luk w zabezpieczeniach i mogą generować nadmierną liczbę fałszywie pozytywnych wyników.

#### Analiza dynamiczna {#testing-contracts-on-testnets}

Analiza dynamiczna generuje symboliczne dane wejściowe (np. w [wykonywaniu symbolicznym](https://en.m.wikipedia.org/wiki/Symbolic_execution)) lub konkretne dane wejściowe (np. w [fuzzingu](https://owasp.org/www-community/Fuzzing)) do funkcji inteligentnego kontraktu, aby sprawdzić, czy jakikolwiek ślad wykonania narusza określone właściwości. Ta forma testowania opartego na właściwościach różni się od testów jednostkowych tym, że przypadki testowe obejmują wiele scenariuszy, a program obsługuje generowanie przypadków testowych.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) jest przykładem techniki analizy dynamicznej do weryfikacji dowolnych właściwości w inteligentnych kontraktach. Fuzzer wywołuje funkcje w docelowym kontrakcie z losowymi lub zniekształconymi wariacjami zdefiniowanej wartości wejściowej. Jeśli inteligentny kontrakt wejdzie w stan błędu (np. taki, w którym asercja kończy się niepowodzeniem), problem jest oznaczany, a dane wejściowe, które kierują wykonanie w stronę podatnej ścieżki, są generowane w raporcie.

Fuzzing jest przydatny do oceny mechanizmu walidacji danych wejściowych inteligentnego kontraktu, ponieważ niewłaściwa obsługa nieoczekiwanych danych wejściowych może skutkować niezamierzonym wykonaniem i wywołać niebezpieczne skutki. Ta forma testowania opartego na właściwościach może być idealna z wielu powodów:

1. **Pisanie przypadków testowych obejmujących wiele scenariuszy jest trudne.** Test właściwości wymaga jedynie zdefiniowania zachowania i zakresu danych, za pomocą których zachowanie to ma być testowane — program automatycznie generuje przypadki testowe na podstawie zdefiniowanej właściwości.

2. **Twój zestaw testów może nie pokrywać w wystarczającym stopniu wszystkich możliwych ścieżek w programie.** Nawet przy 100% pokryciu możliwe jest przeoczenie przypadków brzegowych.

3. **Testy jednostkowe dowodzą, że kontrakt wykonuje się poprawnie dla danych przykładowych, ale to, czy kontrakt wykonuje się poprawnie dla danych wejściowych spoza próbki, pozostaje nieznane.** Testy właściwości wykonują docelowy kontrakt z wieloma wariacjami danej wartości wejściowej, aby znaleźć ślady wykonania, które powodują niepowodzenia asercji. W ten sposób test właściwości zapewnia więcej gwarancji, że kontrakt wykonuje się poprawnie dla szerokiej klasy danych wejściowych.

### Wytyczne dotyczące przeprowadzania testów opartych na właściwościach dla inteligentnych kontraktów {#testing-vs-formal-verification}

Uruchamianie testów opartych na właściwościach zazwyczaj rozpoczyna się od zdefiniowania właściwości (np. braku [przepełnienia liczb całkowitych](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) lub zbioru właściwości, które chcesz zweryfikować w inteligentnym kontrakcie. Podczas pisania testów właściwości może być również konieczne zdefiniowanie zakresu wartości, w ramach którego program może generować dane dla wejść transakcji.

Po prawidłowym skonfigurowaniu narzędzie do testowania właściwości wykona funkcje inteligentnego kontraktu z losowo wygenerowanymi danymi wejściowymi. Jeśli wystąpią jakiekolwiek naruszenia asercji, powinieneś otrzymać raport z konkretnymi danymi wejściowymi, które naruszają ocenianą właściwość. Zapoznaj się z poniższymi przewodnikami, aby rozpocząć przeprowadzanie testów opartych na właściwościach za pomocą różnych narzędzi:

- **[Analiza statyczna inteligentnych kontraktów za pomocą Slither](https://github.com/crytic/slither)**
- **[Analiza statyczna inteligentnych kontraktów za pomocą Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Testowanie oparte na właściwościach za pomocą Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing kontraktów za pomocą Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing kontraktów za pomocą Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing kontraktów za pomocą Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Wykonywanie symboliczne inteligentnych kontraktów za pomocą Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Wykonywanie symboliczne inteligentnych kontraktów za pomocą Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Ręczne testowanie inteligentnych kontraktów {#testing-vs-audits-bug-bounties}

Ręczne testowanie inteligentnych kontraktów często pojawia się na późniejszym etapie cyklu rozwoju, po uruchomieniu testów automatycznych. Ta forma testowania ocenia inteligentny kontrakt jako jeden w pełni zintegrowany produkt, aby sprawdzić, czy działa on zgodnie z wymaganiami technicznymi.

### Testowanie kontraktów na lokalnym blockchainie {#testing-tools-and-libraries}

Chociaż zautomatyzowane testowanie przeprowadzane w lokalnym środowisku programistycznym może dostarczyć przydatnych informacji do debugowania, będziesz chciał wiedzieć, jak Twój inteligentny kontrakt zachowuje się w środowisku produkcyjnym. Jednak wdrożenie do głównego łańcucha Ethereum wiąże się z opłatami za gaz — nie wspominając o tym, że Ty lub Twoi użytkownicy możecie stracić prawdziwe pieniądze, jeśli Twój inteligentny kontrakt nadal ma błędy.

Testowanie kontraktu na lokalnym blockchainie (znanym również jako [sieć deweloperska](/developers/docs/development-networks/)) jest zalecaną alternatywą dla testowania w sieci głównej (Mainnet). Lokalny blockchain to kopia blockchaina Ethereum działająca lokalnie na Twoim komputerze, która symuluje zachowanie warstwy wykonawczej Ethereum. W związku z tym możesz programować transakcje w celu interakcji z kontraktem bez ponoszenia znacznych kosztów ogólnych.

Uruchamianie kontraktów na lokalnym blockchainie może być przydatne jako forma ręcznego testowania integracyjnego. [Inteligentne kontrakty są wysoce komponowalne](/developers/docs/smart-contracts/composability/), co pozwala na integrację z istniejącymi protokołami — ale nadal musisz upewnić się, że tak złożone interakcje onchain przynoszą prawidłowe wyniki.

[Więcej o sieciach deweloperskich.](/developers/docs/development-networks/)

### Testowanie kontraktów w sieciach testowych {#unit-testing-tools}

Sieć testowa (testnet) działa dokładnie tak samo jak sieć główna Ethereum, z tą różnicą, że używa etheru (ETH) bez rzeczywistej wartości. Wdrożenie kontraktu w [sieci testowej](/developers/docs/networks/#ethereum-testnets) oznacza, że każdy może wejść z nim w interakcję (np. za pośrednictwem frontendu zdecentralizowanej aplikacji (dapp)), nie narażając środków na ryzyko.

Ta forma testowania ręcznego jest przydatna do oceny kompleksowego przepływu aplikacji z punktu widzenia użytkownika. W tym przypadku beta testerzy mogą również przeprowadzać uruchomienia próbne i zgłaszać wszelkie problemy z logiką biznesową kontraktu i ogólną funkcjonalnością.

Wdrożenie w sieci testowej po przetestowaniu na lokalnym blockchainie jest idealne, ponieważ ta pierwsza jest bliższa zachowaniu Wirtualnej Maszyny Ethereum (EVM). Dlatego powszechne jest, że wiele natywnych projektów Ethereum wdraża dappy w sieciach testowych, aby ocenić działanie inteligentnych kontraktów w warunkach rzeczywistych.

[Więcej o sieciach testowych Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Testowanie a weryfikacja formalna {#property-based-testing-tools}

Chociaż testowanie pomaga potwierdzić, że kontrakt zwraca oczekiwane wyniki dla niektórych danych wejściowych, nie może jednoznacznie udowodnić tego samego dla danych wejściowych nieużywanych podczas testów. Testowanie inteligentnego kontraktu nie może zatem zagwarantować „poprawności funkcjonalnej” (tj. nie może wykazać, że program zachowuje się zgodnie z wymaganiami dla _wszystkich_ zestawów wartości wejściowych).

Weryfikacja formalna to podejście do oceny poprawności oprogramowania poprzez sprawdzenie, czy formalny model programu jest zgodny z formalną specyfikacją. Model formalny to abstrakcyjna matematyczna reprezentacja programu, podczas gdy specyfikacja formalna definiuje właściwości programu (tj. logiczne asercje dotyczące wykonania programu).

Ponieważ właściwości są zapisane w terminach matematycznych, możliwe staje się zweryfikowanie, czy formalny (matematyczny) model systemu spełnia specyfikację przy użyciu logicznych reguł wnioskowania. W związku z tym mówi się, że narzędzia do weryfikacji formalnej dostarczają „matematycznego dowodu” poprawności systemu.

W przeciwieństwie do testowania, weryfikacja formalna może być użyta do sprawdzenia, czy wykonanie inteligentnego kontraktu spełnia formalną specyfikację dla _wszystkich_ wykonań (tj. nie ma błędów) bez konieczności wykonywania go z danymi przykładowymi. Nie tylko skraca to czas spędzony na uruchamianiu dziesiątek testów jednostkowych, ale jest również bardziej skuteczne w wychwytywaniu ukrytych luk w zabezpieczeniach. Niemniej jednak techniki weryfikacji formalnej leżą w pewnym spektrum w zależności od trudności ich wdrożenia i użyteczności.

[Więcej o weryfikacji formalnej inteligentnych kontraktów.](/developers/docs/smart-contracts/formal-verification)

## Testowanie a audyty i programy bug bounty {#static-analysis-tools}

Jak wspomniano, rygorystyczne testowanie rzadko może zagwarantować brak błędów w kontrakcie; podejścia oparte na weryfikacji formalnej mogą zapewnić silniejsze gwarancje poprawności, ale obecnie są trudne w użyciu i wiążą się ze znacznymi kosztami.

Mimo to możesz dodatkowo zwiększyć prawdopodobieństwo wychwycenia luk w kontraktach, zlecając niezależny przegląd kodu. [Audyty inteligentnych kontraktów](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) i [programy bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) to dwa sposoby na to, aby inni przeanalizowali Twoje kontrakty.

Audyty są przeprowadzane przez audytorów doświadczonych w znajdowaniu przypadków luk w zabezpieczeniach i złych praktyk programistycznych w inteligentnych kontraktach. Audyt zazwyczaj obejmuje testowanie (i ewentualnie weryfikację formalną), a także ręczny przegląd całej bazy kodu.

Z kolei program bug bounty zazwyczaj polega na zaoferowaniu nagrody finansowej osobie (powszechnie określanej jako [hakerzy whitehat](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)), która odkryje lukę w inteligentnym kontrakcie i ujawni ją deweloperom. Programy bug bounty są podobne do audytów, ponieważ polegają na proszeniu innych o pomoc w znalezieniu wad w inteligentnych kontraktach.

Główna różnica polega na tym, że programy bug bounty są otwarte dla szerszej społeczności deweloperów/hakerów i przyciągają szeroką klasę etycznych hakerów oraz niezależnych specjalistów ds. bezpieczeństwa o unikalnych umiejętnościach i doświadczeniu. Może to być przewagą nad audytami inteligentnych kontraktów, które opierają się głównie na zespołach mogących posiadać ograniczoną lub wąską wiedzę specjalistyczną.

## Narzędzia i biblioteki do testowania {#dynamic-analysis-tools}

### Narzędzia do testów jednostkowych {#related-tutorials}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Narzędzie do pomiaru pokrycia kodu dla inteligentnych kontraktów napisanych w języku Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework do zaawansowanego tworzenia i testowania inteligentnych kontraktów (oparty na Ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Narzędzie do testowania inteligentnych kontraktów w języku Solidity. Działa pod wtyczką „Solidity Unit Testing” w Remix IDE, która służy do pisania i uruchamiania przypadków testowych dla kontraktu._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Biblioteka asercji do testowania inteligentnych kontraktów Ethereum. Upewnij się, że Twoje kontrakty zachowują się zgodnie z oczekiwaniami!_

- **[Framework do testów jednostkowych Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie wykorzystuje Pytest, bogaty w funkcje framework testowy, który pozwala pisać małe testy przy użyciu minimalnej ilości kodu, dobrze skaluje się w przypadku dużych projektów i jest wysoce rozszerzalny._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry oferuje Forge, szybki i elastyczny framework testowy Ethereum zdolny do wykonywania prostych testów jednostkowych, sprawdzania optymalizacji gazu i fuzzingu kontraktów._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework do testowania inteligentnych kontraktów oparty na Ethers.js, Mocha i Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Oparty na języku Python framework do programowania i testowania inteligentnych kontraktów przeznaczonych dla Wirtualnej Maszyny Ethereum (EVM)._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Oparty na języku Python framework do testów jednostkowych i fuzzingu z silnymi możliwościami debugowania i obsługą testowania międzyłańcuchowego (cross-chain), wykorzystujący pytest i Anvil w celu zapewnienia najlepszego doświadczenia użytkownika i wydajności._

### Narzędzia do testowania opartego na właściwościach {#further-reading}

#### Narzędzia do analizy statycznej {#tutorials}

- **[Slither](https://github.com/crytic/slither)** - _Oparty na języku Python framework do analizy statycznej Solidity służący do znajdowania luk w zabezpieczeniach, poprawy zrozumienia kodu i pisania niestandardowych analiz dla inteligentnych kontraktów._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter do wymuszania najlepszych praktyk w zakresie stylu i bezpieczeństwa dla języka programowania inteligentnych kontraktów Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Oparty na języku Rust analizator statyczny zaprojektowany specjalnie z myślą o bezpieczeństwie i rozwoju inteligentnych kontraktów Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Oparty na języku Python framework do analizy statycznej z detektorami luk w zabezpieczeniach i jakości kodu, drukarkami do wyodrębniania przydatnych informacji z kodu oraz obsługą pisania niestandardowych podmodułów._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Prosty i potężny linter dla Solidity._

#### Narzędzia do analizy dynamicznej

- **[Echidna](https://github.com/crytic/echidna/)** - _Szybki fuzzer kontraktów do wykrywania luk w zabezpieczeniach w inteligentnych kontraktach poprzez testowanie oparte na właściwościach._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Zautomatyzowane narzędzie do fuzzingu przydatne do wykrywania naruszeń właściwości w kodzie inteligentnego kontraktu._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework do dynamicznego wykonywania symbolicznego służący do analizy kodu bajtowego EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Narzędzie do oceny kodu bajtowego EVM służące do wykrywania luk w kontraktach przy użyciu analizy skażenia (taint analysis), analizy konkolowej (concolic analysis) i sprawdzania przepływu sterowania._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble to język specyfikacji i narzędzie do weryfikacji w czasie wykonywania, które pozwala na adnotowanie inteligentnych kontraktów właściwościami umożliwiającymi automatyczne testowanie kontraktów za pomocą narzędzi takich jak Diligence Fuzzing lub MythX._

## Powiązane samouczki

- [Przegląd i porównanie różnych produktów do testowania](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Jak używać Echidna do testowania inteligentnych kontraktów](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Jak używać Manticore do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Jak używać Slither do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jak mockować kontrakty Solidity do testowania](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Jak uruchamiać testy jednostkowe w Solidity za pomocą Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Dalsza lektura

- [Szczegółowy przewodnik po testowaniu inteligentnych kontraktów Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Jak testować inteligentne kontrakty Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Przewodnik MolochDAO po testach jednostkowych dla deweloperów](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Jak testować inteligentne kontrakty jak gwiazda rocka](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Samouczki: Testowanie inteligentnych kontraktów na Ethereum

- [Jak stworzyć i przetestować dApp w lokalnej, wieloklienckiej sieci testowej](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Przewodnik po wdrażaniu inteligentnego kontraktu w lokalnej sieci testowej i przeprowadzaniu testów._
- [Jak mockować inteligentne kontrakty Solidity do testowania](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Średniozaawansowany samouczek dotyczący korzystania z danych mockowanych i wdrażania testów jednostkowych._
- [Jak używać Echidna do testowania inteligentnych kontraktów](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Zaawansowane podejście do fuzzingu i testowania inteligentnych kontraktów._