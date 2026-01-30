---
title: "Testowanie inteligentnych kontraktów"
description: "Przegląd technik oraz wskazówek dotyczących testowania inteligentnych kontraktów Ethereum."
lang: pl
---

Publiczne blockchainy takie jak Ethereum są niezmienne, co sprawia, że trudne jest wprowadzenie zmian do inteligentnego kontraktu po jego wdrożeniu. [Wzorce aktualizacji kontraktów](/developers/docs/smart-contracts/upgrading/) służące do przeprowadzania "wirtualnych aktualizacji" istnieją, ale są trudne do wdrożenia i wymagają społecznego konsensusu. Co więcej, aktualizacja może naprawić błąd dopiero _po_ jego wykryciu — jeśli atakujący jako pierwszy odkryje podatność, Twój inteligentny kontrakt jest narażony na ryzyko exploita.

Z tych powodów testowanie inteligentnych kontraktów przed [wdrożeniem](/developers/docs/smart-contracts/deploying/) w sieci Mainnet jest minimalnym wymogiem dla [bezpieczeństwa](/developers/docs/smart-contracts/security/). Istnieje wiele technik testowania kontraktów i oceny poprawności kodu; wybór zależy od potrzeb. Niemniej, zestaw testów złożony z różnych narzędzi i podejść jest idealny do wychwycenia mniejszych i większych błędów w zabezpieczeniach kodu kontraktu.

## Wymagania wstępne {#prerequisites}

Ta strona wyjaśnia, w jaki sposób testować inteligentne kontrakty przed wdrożeniem ich do sieci Ethereum. Zakłada się, że znasz [inteligentne kontrakty](/developers/docs/smart-contracts/).

## Czym jest testowanie inteligentnych kontraktów? {#what-is-smart-contract-testing}
Testowanie inteligentnych kontraktów to proces weryfikacji poprawności pracy kodu inteligentnego kontraktu. Testowanie jest pomocne w celu sprawdzenia, czy dany inteligentny kontrakt spełnia wymagania niezawodności, używalności oraz bezpieczeństwa.

Pomimo tego, że istnieją różne podejścia, większość metod testowania wymaga uruchomienia inteligentnego kontraktu przy użyciu niewielkiej ilości próbnych danych, które powinien obsłużyć. Jeśli kontrakt da poprawny rezultat dla próbnych danych, zakłada się, że pracuje poprawnie. Większość narzędzi do testowania zapewnia zasoby do pisania i wykonywania [przypadków testowych](https://en.m.wikipedia.org/wiki/Test_case), aby sprawdzić, czy wykonanie kontraktu odpowiada oczekiwanym wynikom.

### Dlaczego testowanie inteligentnych kontraktów jest ważne? Znaczenie testowania inteligentnych kontraktów {#importance-of-testing-smart-contracts}

Ponieważ inteligentne kontrakty często zarządzają aktywami finansowymi o wysokiej wartości, drobne błędy programistyczne mogą prowadzić, i często prowadzą, do [ogromnych strat dla użytkowników](https://rekt.news/leaderboard/). Jednakże rygorystyczne testowanie może pomóc w znalezieniu defektów i problemów w kodzie inteligentnego kontraktu oraz naprawieniu ich przed wypuszczeniem na sieci głównej.

Chociaż możliwe jest zaktualizowanie kontraktu w przypadku odkrycia błędu, aktualizacje są skomplikowane i mogą [skutkować błędami](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/), jeśli są obsługiwane nieprawidłowo. Aktualizacja kontraktu podważa zasadę niezmienności i obarcza użytkowników dodatkową potrzebą zaufania. Z drugiej strony kompleksowy plan testowania kontraktu ogranicza ryzyka związane z bezpieczeństwem kontraktu i redukuje potrzebę wykonywania złożonych czynności niezbędnych do aktualizacji po wdrożeniu.

## Metody testowania inteligentnych kontraktów {#methods-for-testing-smart-contracts}

Metody testowania inteligentnych kontraktów Ethereum dzielą się na dwie szerokie kategorie: **testowanie zautomatyzowane** i **testowanie ręczne**. Zarówno testowanie zautomatyzowane, jak i testowanie manualne oferuje unikalne korzyści, ale też wady. Można jednak połączyć oba sposoby w celu stworzenia solidnego planu do analizy kontraktu.

### Testowanie zautomatyzowane {#automated-testing}

Testowanie zautomatyzowane wykorzystuje narzędzia, które automatycznie sprawdzają kod inteligentnego kontraktu pod kątem błędów działania. Zaleta testowania zautomatyzowanego polega na wykorzystaniu [skryptów](https://www.techtarget.com/whatis/definition/script?amp=1) do kierowania oceną funkcjonalności kontraktu. Testy oparte na skryptach mogą być przeprowadzone z minimalnym ludzkim wkładem, co czyni testowanie zautomatyzowane bardziej efektywnym niż testowanie manualne.

Testowanie zautomatyzowane jest szczególnie użyteczne, kiedy testy są powtarzalne i wymagające czasowo; trudne do przeprowadzenia manualnego; podatne na błąd ludzki lub obejmują ocenę krytycznych funkcji kontraktu. Jednak narzędzia do testowania zautomatyzowanego mogą mieć wady — mogą pominąć niektóre błędy i generować wiele [wyników fałszywie dodatnich](https://www.contrastsecurity.com/glossary/false-positive). Stąd łączenie testowania automatycznego oraz testowania manualnego inteligentnych kontraktów jest rozwiązaniem doskonałym.

### Testowanie ręczne {#manual-testing}

Testowanie manualne jest wspomagane przez człowieka i obejmuje uruchamianie każdego przypadku testowego z zestawu osobno w procesie analizowania poprawności inteligentnego kontraktu. To przeciwieństwo testowania zautomatyzowanego, które pozwala przeprowadzić wiele izolowanych testów na kontrakcie jednocześnie, otrzymując na koniec raport pokazujący wszystkie pozytywne i negatywne wyniki testu.

Testowanie manualne może być przeprowadzone przez jedną osobę realizującą pisemny plan testowy, który obejmuje różne scenariusze dotyczące testowania. Można również zaangażować do tego grupę osób, która będzie wchodziła w interakcję z inteligentnym kontraktem na przestrzeni konkretnego okresu w ramach testowania manualnego. Testerzy będą porównywali rzeczywiste zachowanie kontraktu z zachowaniem oczekiwanym, oznaczając każdą z różnic jako błąd.

Efektywne testowanie ręczne wymaga znacznych zasobów (umiejętności, czasu, pieniędzy i wysiłku), a z powodu błędów ludzkich możliwe jest przeoczenie pewnych błędów podczas wykonywania testów. Jednak ręczne testowanie może być również korzystne — na przykład tester (np. audytor) może kierować się intuicją, aby wykrywać skrajne przypadki, które nie zostałyby wykryte przez narzędzie do automatycznego testowania.

## Zautomatyzowane testowanie inteligentnych kontraktów {#automated-testing-for-smart-contracts}

### Testowanie jednostkowe {#unit-testing-for-smart-contracts}

Testowanie jednostkowe ocenia funkcje kontraktu osobno i sprawdza, czy każdy komponent działa poprawnie. Dobre testy jednostkowe powinny być proste, szybkie w wykonaniu i jasno wskazywać, co poszło nie tak, jeśli testy się nie powiodą.

Testy jednostkowe są przydatne do sprawdzania, czy funkcje zwracają oczekiwane wartości i czy przechowywanie kontraktów jest poprawnie aktualizowane po wykonaniu funkcji. Co więcej, uruchomienie testów jednostkowych po wprowadzeniu zmian w kodzie kontraktów gwarantuje, że dodanie nowej logiki nie poskutkuje błędami. Poniżej znaleźć można kilka wskazówek dotyczących wydajnego korzystania z testów jednostkowych:

#### Wskazówki dotyczące testowania jednostkowego inteligentnych kontraktów {#unit-testing-guidelines}

##### 1. Zrozum logikę biznesową swojego kontraktu oraz jego przepływ pracy

Przed napisaniem testów jednostkowych, zalecane jest poznanie funkcji oferowanych przez inteligentny kontrakt oraz sposobów, w jakie użytkownicy będą korzystali z tych funkcji. Jest to szczególnie przydatne do przeprowadzania [testów „szczęśliwej ścieżki”](https://en.m.wikipedia.org/wiki/Happy_path), które określają, czy funkcje w kontrakcie zwracają prawidłowe dane wyjściowe dla prawidłowych danych wejściowych użytkownika. Wyjaśnimy tę koncepcję na tym (skróconym) przykładzie [kontraktu aukcyjnego](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

To jest prosty kontrakt aukcyjny zaprojektowanym, aby przyjmować oferty podczas okresu oferowania. Jeśli `highestBid` wzrośnie, poprzedni licytant z najwyższą ofertą otrzymuje zwrot swoich pieniędzy; po zakończeniu okresu licytacji `beneficiary` wywołuje kontrakt, aby otrzymać swoje pieniądze.

Testy jednostkowe dla takiego kontraktu dotyczyłyby różnych funkcji, których mógłby użyć użytkownicy Przykładem może być test jednostkowy, który sprawdza, czy użytkownik może złożyć ofertę, gdy aukcja jest w toku (tj. wywołania `bid()` kończą się powodzeniem) lub taki, który sprawdza, czy użytkownik może złożyć wyższą ofertę niż bieżąca `highestBid`.

Zrozumienie operacyjnego przepływu pracy kontraktu pomaga również w pisaniu testów, które sprawdzają, czy wykonanie spełnia wymagania. Na przykład kontrakt aukcyjny określa, że użytkownicy nie mogą składać ofert po zakończeniu aukcji (tzn. gdy `auctionEndTime` jest mniejsze niż `block.timestamp`). W związku z tym programista może uruchomić test jednostkowy, który sprawdza, czy wywołania funkcji `bid()` kończą się powodzeniem, czy niepowodzeniem, gdy aukcja jest zakończona (tj. gdy `auctionEndTime` > `block.timestamp`).

##### 2. Oceń wszystkie założenia związanie z wykonaniem kontraktu

Ważnym jest dokumentowanie każdego założenia dotyczącego wykonania kontraktu i napisanie testu jednostkowego, który weryfikuje poprawność tego założenia. Poza zapewnieniem ochrony przez niespodziewanym wykonaniem, testowanie twierdzeń zmusza do przemyśleń na temat działań, które mogą doprowadzić do złamania zabezpieczeń inteligentnego kontraktu. Przydatną wskazówką jest wykroczenie poza "testy idealnego scenariusza" i napisanie testów negatywnych, które sprawdzają, czy funkcja kończy się niepowodzeniem, kiedy dane wejściowe są niewłaściwe.

Wiele środowisk testów jednostkowych pozwala na tworzenie twierdzeń-prostych zasad działania kontraktu, oraz uruchamianie testów sprawdzających te twierdzenia podczas wykonywania. Programista pracujący przy kontrakcie aukcyjnym opisanym powyżej, może sformułować następujące twierdzenia przed uruchomieniem testów negatywnych:

- Użytkownicy nie mogą składać ofert, kiedy aukcja się skończyła lub jeszcze się nie rozpoczęła.

- Kontrakt aukcyjny traci ważność, jeśli oferta jest niższa od minimalny progu.

- Użytkownicy, których oferta nie wygrała otrzymują zwrot środków

**Uwaga**: Innym sposobem testowania założeń jest pisanie testów, które wyzwalają [modyfikatory funkcji](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) w kontrakcie, zwłaszcza instrukcje `require`, `assert` i `if…else`.

##### 3. Zmierz stopień pokrycia kodu

[Pokrycie kodu](https://en.m.wikipedia.org/wiki/Code_coverage) to metryka testowania, która śledzi liczbę gałęzi, linii i instrukcji w kodzie wykonanych podczas testów. Testy powinny mieć dobre pokrycie, aby zminimalizować ryzyko nieprzetestowanych słabych punktów. Bez wystarczającego pokrycia, można niewłaściwie ocenić kontrakt, jako bezpieczny z uwagi na to, że wszystkie testy zakończyły się poprawnie, podczas gdy słabe punkty wciąż istnieją w nieprzetestowanych ścieżkach kodu. Odnotowanie wysokiego pokrycia kodu daje jednakże pewność, że wszystkie polecania i funkcje w inteligentnym kontrakcie zostały wystarczająco przetestowane pod kątem poprawności.

##### 4. Korzystaj z dobrze rozwiniętych struktur testowych

Jakość narzędzi używanych do testów jednostkowych twojego inteligentnego kontraktu jest kluczowa. Idealne środowisko testowe jest regularnie konserwowane; zawiera użyteczne funkcje (np. rejestrowanie logów czy raportowanie) oraz zostało szeroko wykorzystane przez innych doświadczonych programistów.

Środowiska testów jednostkowych dla inteligentnych kontraktów napisanych w Solidity, dostępne są w różnych językach programowania (głównie JavaScript, Python i Rust). Zapoznaj się z poniższymi przewodnikami w celu uzyskania informacji o przeprowadzaniu testów jednostkowych w różnych środowiskach:

- **[Uruchamianie testów jednostkowych za pomocą Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Uruchamianie testów jednostkowych za pomocą Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Uruchamianie testów jednostkowych za pomocą Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Uruchamianie testów jednostkowych za pomocą Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Uruchamianie testów jednostkowych za pomocą Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Uruchamianie testów jednostkowych za pomocą Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Uruchamianie testów jednostkowych za pomocą Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Testowanie integracyjne {#integration-testing-for-smart-contracts}

Podczas gdy testy jednostkowe służą do debugowania funkcji inteligentnych kontraktów odrębnie, testy integracyjne oceniają komponenty inteligentnego kontraktu jako całość. Testy integracyjne mogą wykryć problemy wynikające z wywołań międzykontraktowych lub interakcji pomiędzy różnymi funkcjami tego samego inteligentnego kontraktu. Na przykład testy integracyjne mogą pomóc sprawdzić, czy takie elementy jak [dziedziczenie](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) i wstrzykiwanie zależności działają prawidłowo.

Testowanie integracyjne jest przydatne, jeśli Twój kontrakt wykorzystuje architekturę modułową lub łączy się z innymi kontraktami on-chain w trakcie wykonywania. Jednym ze sposobów przeprowadzania testów integracyjnych jest [sforkowanie blockchaina](/glossary/#fork) na określonej wysokości (przy użyciu narzędzia takiego jak [Forge](https://book.getfoundry.sh/forge/fork-testing) lub [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) i symulowanie interakcji między Twoim kontraktem a wdrożonymi kontraktami.

Rozdzielony blockchain będzie zachowywał się podobnie do sieci głównej i będzie zawierał konta z przypisanymi im stanami i saldami. Działa jednak tylko jako lokalne środowisko programistyczne w trybie piaskownicy, co oznacza, że ​​nie będziesz potrzebować prawdziwego ETH do transakcji, a Twoje zmiany nie wpłyną na prawdziwy protokół Ethereum.

### Testowanie oparte na właściwościach {#property-based-testing-for-smart-contracts}

Testowanie oparte na właściwościach to proces sprawdzania, czy inteligentny kontrakt spełnia określone właściwości. Właściwości określają fakty dotyczące zachowania kontraktu, które mają pozostać prawdziwe w różnych scenariuszach. Przykładem właściwości inteligentnego kontraktu może być: „Operacje arytmetyczne w kontrakcie nigdy nie przekraczają ani nie przekraczają dozwolonego zakresu”.

**Analiza statyczna** i **analiza dynamiczna** to dwie powszechne techniki przeprowadzania testów opartych na właściwościach, a obie mogą zweryfikować, czy kod programu (w tym przypadku inteligentnego kontraktu) spełnia pewną predefiniowaną właściwość. Niektóre narzędzia do testowania opartego na właściwościach zawierają predefiniowane reguły dotyczące oczekiwanych właściwości kontraktu i sprawdzają, czy kod jest zgodny z tymi regułami, podczas gdy inne umożliwiają tworzenie niestandardowych właściwości dla inteligentnego kontraktu.

#### Analiza statyczna {#static-analysis}

Analizator statyczny przyjmuje jako dane wejściowe kod źródłowy inteligentnego kontraktu i zwraca wyniki deklarujące, czy kontrakt spełnia daną właściwość, czy nie. W przeciwieństwie do analizy dynamicznej analiza statyczna nie polega na wykonywaniu kontraktu w celu sprawdzenia jego poprawności. Analiza statyczna z kolei rozważa wszystkie możliwe ścieżki, którymi inteligentny kontrakt może podążyć podczas wykonywania (tj. bada strukturę kodu źródłowego, aby określić, jakie to będzie miało znaczenie dla działania kontraktu w czasie wykonywania).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) i [testowanie statyczne](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) to popularne metody przeprowadzania analizy statycznej kontraktów. Obie metody wymagają analizy niskopoziomowych reprezentacji wykonania kontraktu, takich jak [abstrakcyjne drzewa składni](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) i [grafy przepływu sterowania](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) generowane przez kompilator.

W większości przypadków analiza statyczna przydaje się do wykrywania problemów bezpieczeństwa, takich jak stosowanie niebezpiecznych konstrukcji, błędy składniowe lub naruszenia standardów kodowania w kodzie kontraktu. Wiadomo jednak, że analizatory statyczne generalnie słabo sobie radzą z wykrywaniem głębszych luk w zabezpieczeniach i mogą generować zbyt wiele fałszywych wyników dodatnich.

#### Analiza dynamiczna {#dynamic-analysis}

Analiza dynamiczna generuje symboliczne dane wejściowe (np. w [wykonaniu symbolicznym](https://en.m.wikipedia.org/wiki/Symbolic_execution)) lub konkretne dane wejściowe (np. w [fuzzingu](https://owasp.org/www-community/Fuzzing)) do funkcji inteligentnych kontraktów, aby sprawdzić, czy jakikolwiek ślad wykonania narusza określone właściwości. Ta forma testowania opartego na właściwościach różni się od testów jednostkowych tym, że przypadki testowe obejmują wiele scenariuszy, a generowaniem przypadków testowych zajmuje się program.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) jest przykładem dynamicznej techniki analitycznej służącej do weryfikacji dowolnych właściwości w inteligentnych kontraktach. Fuzzer wywołuje funkcje w kontrakcie docelowym z losowymi lub błędnymi wariantami zdefiniowanej wartości wejściowej. Jeśli inteligentny kontrakt wejdzie w stan błędu (np. taki, w którym potwierdzenie nie powiedzie się), problem zostanie oznaczony, a dane wejściowe kierujące wykonanie na podatną ścieżkę zostaną wygenerowane w raporcie.

Fuzzing jest przydatne do oceny mechanizmu walidacji danych wejściowych inteligentnych kontraktów, ponieważ niewłaściwa obsługa nieoczekiwanych danych wejściowych może skutkować niezamierzonym wykonaniem i wywołać niebezpieczne skutki. Ta forma testowania opartego na właściwościach może być idealna z wielu powodów:

1. **Pisanie przypadków testowych obejmujących wiele scenariuszy jest trudne.** Test właściwości wymaga jedynie zdefiniowania zachowania i zakresu danych, za pomocą których można przetestować to zachowanie — program automatycznie generuje przypadki testowe na podstawie zdefiniowanej właściwości.

2. **Zestaw testów może nie obejmować w wystarczającym stopniu wszystkich możliwych ścieżek w programie.** Nawet przy 100% pokryciu istnieje ryzyko pominięcia przypadków brzegowych.

3. **Testy jednostkowe sprawdzają, czy kontrakt wykonuje się poprawnie dla danych z próbki, ale nie wiadomo, czy kontrakt wykonuje się poprawnie dla danych wejściowych spoza próbki.** Testy właściwości wykonują docelowy kontrakt z wieloma wariantami danej wartości wejściowej w celu znalezienia śladów wykonania powodujących błędy asercji. Zatem test właściwości daje większą gwarancję, że kontrakt zostanie wykonany prawidłowo dla szerokiej klasy danych wejściowych.

### Wskazówki dotyczące przeprowadzania testów opartych na właściwościach dla inteligentnych kontraktów {#running-property-based-tests}

Przeprowadzanie testów opartych na właściwościach zazwyczaj rozpoczyna się od zdefiniowania właściwości (np. braku [przepełnień liczb całkowitych](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) lub zbioru właściwości, które chcesz zweryfikować w inteligentnym kontrakcie. Podczas pisania testów właściwości może być również konieczne zdefiniowanie zakresu wartości, w ramach których program może generować dane dla danych wejściowych transakcji.

Po poprawnym skonfigurowaniu narzędzie do testowania nieruchomości będzie wykonywać funkcje inteligentnych kontraktów przy użyciu losowo generowanych danych wejściowych. Jeśli wystąpią jakiekolwiek naruszenia asercji, powinieneś otrzymać raport z konkretnymi danymi wejściowymi, które naruszają ocenianą właściwość. Aby rozpocząć testowanie oparte na właściwościach za pomocą różnych narzędzi, zapoznaj się z poniższymi przewodnikami:

- **[Analiza statyczna inteligentnych kontraktów za pomocą Slither](https://github.com/crytic/slither)**
- **[Analiza statyczna inteligentnych kontraktów za pomocą Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Testowanie oparte na właściwościach za pomocą Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing kontraktów za pomocą Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing kontraktów za pomocą Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing kontraktów za pomocą Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Symboliczne wykonanie inteligentnych kontraktów za pomocą Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Symboliczne wykonanie inteligentnych kontraktów za pomocą Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Ręczne testowanie inteligentnych kontraktów {#manual-testing-for-smart-contracts}

Testowanie manualne inteligentnych kontraktów przeprowadzane jest często w późnym etapie cyklu rozwoju produktu, już po testach automatycznych. Ta forma testowania ocenia inteligentny kontrakt jako jeden w pełni zintegrowany produkt, aby sprawdzić, czy działa zgodnie ze specyfikacją techniczną.

### Testowanie kontraktów na lokalnym blockchainie {#testing-on-local-blockchain}

Podczas gdy testowanie zautomatyzowane przeprowadzone w lokalny środowisku programistycznym może zapewnić przydatne informacje o debugowaniu, warto wiedzieć również, jak inteligentny kontrakt zachowuje się w środowisku produkcyjnym. Jednakże wdrożenie do głównej sieci Ethereum wiąże się z opłatami gazowymi — nie wspominając już o tym, że użytkownicy mogą stracić prawdziwe pieniądze, jeśli Twój inteligentny kontrakt wciąż zawiera błędy.

Testowanie kontraktu na lokalnym blockchainie (znanym również jako [sieć deweloperska](/developers/docs/development-networks/)) jest zalecaną alternatywą dla testowania w sieci Mainnet. Blockchain lokalny jest kopią blockchainu Ethereum uruchomioną lokalnie na twoim komputerze, która symuluje zachowanie warstwy wykonawczej Ethereum. Dzięki temu możesz zaprogramować transakcje do interakcji z kontraktem bez konieczności ponoszenia znaczących kosztów.

Uruchamianie kontraktów na blockchainie lokalnym może być przydatną formą testowania manualnego. [Inteligentne kontrakty są wysoce komponowalne](/developers/docs/smart-contracts/composability/), co pozwala na integrację z istniejącymi protokołami — ale nadal trzeba się upewnić, że tak złożone interakcje na łańcuchu dają prawidłowe wyniki.

[Więcej o sieciach deweloperskich.](/developers/docs/development-networks/)

### Testowanie kontraktów w sieciach testowych {#testing-contracts-on-testnets}

Sieci testowe działają dokładnie jak sieć główna Ethereum z tą różnicą, że używają eteru (ETH), który nie ma rzeczywistej wartości. Wdrożenie kontraktu w [sieci testowej](/developers/docs/networks/#ethereum-testnets) oznacza, że każdy może wejść z nim w interakcję (np. za pośrednictwem frontendu dapki) bez narażania środków na ryzyko.

Ta forma testowania manualnego jest przydatna w szczegółowej ocenie przepływu aplikacji z perspektywy użytkownika. Tu beta testerzy mogą również przeprowadzać testy i raportować wszelkie problemy w logice biznesowej kontraktu oraz jego ogólnej funkcjonalności.

Wdrożenie na sieci testowej po testowaniu na lokalnym blockchainie jest idealne z uwagi na to, że w przypadku pierwszego zachowanie bliższe jest wirtualnej maszynie Ethereum. Jest zatem powszechne wśród wielu natywnych projektów Ethereum, aby wdrożyć dapkę na sieć testową w celu oceny inteligentnego kontraktu w warunkach odpowiadających tym ze świata rzeczywistego.

[Więcej o sieciach testowych Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Testowanie a weryfikacja formalna {#testing-vs-formal-verification}

Choć testowanie pomaga potwierdzić, że kontrakt daje zakładane rezultaty dla niektórych danych wejściowych, nie może ono jednoznacznie dowieźć tego samego dla danych wejściowych, które nie były użyte podczas testów. Testowanie inteligentnego kontraktu nie może zatem zagwarantować "poprawności funkcjonalnej" (tzn. nie może wykazać, że program zachowuje się zgodnie z wymaganiami dla _wszystkich_ zestawów wartości wejściowych).

Formalna weryfikacja jest podejściem do oceny poprawności oprogramowania poprzez sprawdzenie, czy formalny model programu zgadza się z formalną specyfikacją. Model formalny jest abstrakcyjną matematyczną reprezentacją programy, podczas gdy specyfikacja formalna definiuje własności programu (np. logiczne założenia na temat działania programu).

Ponieważ własności te zapisane są w jeżyku matematycznym, możliwym staje się zweryfikowanie czy formalnym (matematyczny) model systemu odpowiada specyfikacji, korzystając z logicznych reguł wnioskowaniu. Narzędzia formalnej weryfikacji mają zatem za zadanie dostarczyć "matematyczny dowód" poprawności systemu.

W przeciwieństwie do testowania weryfikacja formalna może być użyta do sprawdzenia, czy wykonanie inteligentnego kontraktu spełnia formalną specyfikację dla _wszystkich_ wykonań (tzn. nie ma błędów), bez potrzeby uruchamiania go na przykładowych danych. To nie tylko skraca czas poświęcony na przeprowadzenie wielu testów jednostkowych, ale również jest bardziej efektywne w wychwytywaniu ukrytych słabych punktów. Należy jednak pamiętać, że techniki formalnej weryfikacji prezentują całe spektrum trudności implementacji oraz użyteczności.

[Więcej o formalnej weryfikacji inteligentnych kontraktów.](/developers/docs/smart-contracts/formal-verification)

## Testowanie a audyty i programy bug bounty {#testing-vs-audits-bug-bounties}

Jak wspomniano powyżej, rygorystyczne testowanie rzadko może zagwarantować kompletny brak błędów w kontrakcie; podejście weryfikacji formalnej może zapewnić silniejsze przekonanie o poprawności, ale obecnie jest trudne w użyciu i kosztowne.

Można jednak jeszcze bardziej zwiększyć szansę na wyłapanie słabego punktu w kontrakcie poprzez przegląd kodu przeprowadzony przez niezależny podmiot. [Audyty inteligentnych kontraktów](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) i [programy bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) to dwa sposoby na zaangażowanie innych do analizy Twoich kontraktów.

Audyty przeprowadzane są przez audytorów doświadczonych w odnajdywaniu przypadków błędów zabezpieczeń i kiepskich rozwiązań programistycznych w inteligentnych kontraktach. Audyt zawiera zwykle testowanie (czasem również weryfikację formalną) jak również ręczny przegląd całej bazy kodu.

I na odwrót, program bug bounty zwykle polega na oferowaniu nagrody finansowej osobie (powszechnie określanej jako [haker w białym kapeluszu](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))), która odkryje lukę w zabezpieczeniach inteligentnego kontraktu i ujawni ją deweloperom. Nagrody za znalezienie błędu są podobne do audytów, ponieważ obejmują proszenie innych o pomoc w znalezieniu defektów inteligentnego kontraktu.

Główną różnicą jest to, że programy nagród za znalezienie błędów są otwarte dla szerszej społeczności programistów i hakerów. Przyciągają również szeroką grupę hakerów etycznych i niezależnych specjalistów od bezpieczeństwa wyposażonych w unikalne umiejętności i doświadczenie. To może być ich przewaga nad audytami, które bazują głównie na zespołach, które mogą mieć ograniczoną lub wąską ekspertyzę.

## Narzędzia i biblioteki do testowania {#testing-tools-and-libraries}

### Narzędzia do testowania jednostkowego {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** – _narzędzie do sprawdzania pokrycia kodu dla inteligentnych kontraktów napisanych w Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** – _framework do zaawansowanego tworzenia i testowania inteligentnych kontraktów (oparty na ethers.js)._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** – _narzędzie do testowania inteligentnych kontraktów w Solidity._ Działa pod wtyczką do Remix IDE pod nazwą "Solidity Unit Testing", która jest używana do pisania i przeprowadzania testów na kontrakcie._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** – _biblioteka asercji do testowania inteligentnych kontraktów Ethereum._ Upewnij się, że Twoje kontrakty zachowują się zgodnie z oczekiwaniami!_

- **[Framework do testów jednostkowych Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** – _Brownie wykorzystuje Pytest, bogaty w funkcje framework testowy, który pozwala pisać małe testy przy minimalnej ilości kodu, dobrze skaluje się w przypadku dużych projektów i jest wysoce rozszerzalny._

- **[Testy Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** – _Foundry oferuje Forge, szybki i elastyczny framework do testowania Ethereum, zdolny do wykonywania prostych testów jednostkowych, sprawdzania optymalizacji gazu i fuzzingu kontraktów._

- **[Testy Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** – _framework do testowania inteligentnych kontraktów oparty na ethers.js, Mocha i Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** – _oparty na Pythonie framework do tworzenia i testowania inteligentnych kontraktów dla Wirtualnej Maszyny Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** – _oparty na Pythonie framework do testowania jednostkowego i fuzzingu z zaawansowanymi możliwościami debugowania i obsługą testowania międzyłańcuchowego, wykorzystujący pytest i Anvil w celu uzyskania najlepszego doświadczenia użytkownika i wydajności._

### Narzędzia do testowania opartego na właściwościach {#property-based-testing-tools}

#### Narzędzia do analizy statycznej {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** – _oparty na Pythonie framework do statycznej analizy Solidity, służący do znajdowania luk w zabezpieczeniach, poprawy zrozumienia kodu i pisania niestandardowych analiz dla inteligentnych kontraktów._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** – _Linter do egzekwowania najlepszych praktyk w zakresie stylu i bezpieczeństwa dla języka programowania inteligentnych kontraktów Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** – _oparty na Rust analizator statyczny zaprojektowany specjalnie z myślą o bezpieczeństwie i rozwoju inteligentnych kontraktów Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** – _oparty na Pythonie framework do analizy statycznej z detektorami luk i jakości kodu, drukarkami do wyodrębniania przydatnych informacji z kodu oraz wsparciem dla pisania niestandardowych podmodułów._

- **[Slippy](https://github.com/fvictorio/slippy)** – _prosty i potężny linter dla Solidity._

#### Narzędzia do analizy dynamicznej {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** – _szybki fuzzer kontraktów do wykrywania luk w inteligentnych kontraktach poprzez testowanie oparte na właściwościach._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** – _zautomatyzowane narzędzie do fuzzingu przydatne do wykrywania naruszeń właściwości w kodzie inteligentnych kontraktów._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** – _dynamiczny framework do symbolicznego wykonywania analizy kodu bajtowego EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** – _narzędzie do oceny kodu bajtowego EVM do wykrywania luk w kontraktach przy użyciu analizy skażenia, analizy konkolikowej i sprawdzania przepływu sterowania._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** – _Scribble to język specyfikacji i narzędzie do weryfikacji w czasie wykonywania, które pozwala na adnotowanie inteligentnych kontraktów właściwościami, które umożliwiają automatyczne testowanie kontraktów za pomocą narzędzi takich jak Diligence Fuzzing lub MythX._

## Powiązane samouczki {#related-tutorials}

- [Przegląd i porównanie różnych produktów do testowania](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Jak używać Echidna do testowania inteligentnych kontraktów](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Jak używać Manticore do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Jak używać Slither do znajdowania błędów w inteligentnych kontraktach](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jak mockować kontrakty Solidity na potrzeby testowania](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Jak uruchamiać testy jednostkowe w Solidity przy użyciu Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Dalsza lektura {#further-reading}

- [Szczegółowy przewodnik po testowaniu inteligentnych kontraktów Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Jak testować inteligentne kontrakty Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Przewodnik po testowaniu jednostkowym dla programistów od MolochDAO](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Jak testować inteligentne kontrakty jak gwiazda rocka](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
