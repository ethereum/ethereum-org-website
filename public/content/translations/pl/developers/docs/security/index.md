---
title: Ochrona
description: Kwestie bezpieczeństwa dla deweloperów Ethereum
lang: pl
---

Inteligentne kontrakty Ethereum są niezwykle elastyczne, zdolne zarówno do utrzymywania dużych ilości tokenów (często powyżej 1 mld USD), jak i do używania niezmiennej logiki opartej na wcześniej wdrożonym kodzie kontraktów inteligentnych. Stworzyło to wprawdzie dynamiczny i kreatywny ekosystem godny zaufania, ale powiązane ze sobą inteligentne kontrakty są również idealnym ekosystemem, który przyciąga atakujących poszukujących zysków poprzez wykorzystanie słabych punktów w inteligentnych kontraktach i nieoczekiwanych zachowań w Ethereum. Kodu inteligentnego kontraktu _zazwyczaj_ nie można zmienić w celu usunięcia luk w zabezpieczeniach; zasoby, które zostały skradzione z inteligentnych kontraktów, są nie do odzyskania, a skradzione aktywa są niezwykle trudne do śledzenia. Całkowita kwota wartości skradzionej lub utraconej z powodu problemów z inteligentnymi kontraktami z dużym prawdopodobieństwem sięga 1 mld USD. Do poważniejszych strat wynikających z błędów w kodowaniu kontraktów inteligentnych należą:

- [Problem kont Parity z wieloma podpisami nr 1 — utracono 30 mln USD](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problem kont Parity z wieloma podpisami nr 2 — zablokowane 300 mln USD](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [Zhakowanie The DAO na 3,6 mln ETH! Ponad 1 mld USD w dzisiejszych cenach ETH](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Warunki wstępne {#prerequisites}

W tej części zostanie omówione bezpieczeństwo [kontraktów inteligentnych](/developers/docs/smart-contracts/), więc wcześniej upewnij się, że dobrze orientujesz się w dotyczących ich kwestiach.

## Jak napisać bezpieczniejszy kod inteligentnego kontraktu {#how-to-write-more-secure-smart-contract-code}

Przed uruchomieniem jakiegokolwiek kodu w sieci głównej należy podjąć odpowiednie środki ostrożności, aby chronić wszystko, co ma wartość, którą powierzono Twojemu inteligentnemu kontraktowi. W tym artykule omówimy kilka konkretnych ataków, udostępnimy zasoby, z których można dowiedzieć się więcej na temat innych typów ataków, a także przedstawimy kilka podstawowych narzędzi i najlepszych praktyk, aby zapewnić prawidłowe i bezpieczne funkcjonowanie kontraktów.

## Audyty to nie srebrne pociski {#audits-are-not-a-silver-bullet}

Wiele lat wcześniej narzędzia do pisania, kompilowania, testowania i wdrażania inteligentnych kontraktów były bardzo niedojrzałe, co prowadziło do tego, że w wielu projektach kod Solidity był pisany w sposób chaotyczny i szybko przekazywany audytorowi, który go badał, aby upewnić się, że działa on bezpiecznie i zgodnie z oczekiwaniami. W 2020 roku procesy programistyczne i narzędzia wspierające pisanie Solidity są znacznie lepsze; wykorzystanie tych najlepszych praktyk nie tylko zapewnia łatwiejsze zarządzanie projektem, ale jest także istotną częścią bezpieczeństwa projektu. Audyt pod koniec pisania inteligentnego kontraktu nie jest już wystarczający jako jedyny czynnik bezpieczeństwa w projekcie. Bezpieczeństwo zaczyna się przed napisaniem pierwszego wiersza kodu inteligentnego kontraktu, **bezpieczeństwo zaczyna się od odpowiednich procesów projektowania i programowania**.

## Proces tworzenia inteligentnych kontraktów {#smart-contract-development-process}

Co najmniej:

- Wszystkie kody przechowywane w systemie z kontrolą wersji, takim jak git
- Wszystkie modyfikacje kodu dokonane za pośrednictwem Pull Request
- Wszystkie Pull Request mają przynajmniej jednego recenzenta. _Jeśli realizujesz projekt jednoosobowo, rozważ znalezienie innego autora pracującego solo i recenzji kodu handlowego!_
- Pojedyncze polecenie kompiluje, wdraża i uruchamia zestaw testów na Twoim kodzie przy użyciu programistycznego środowiska Ethereum
- Uruchomiłeś swój kod za pomocą podstawowych narzędzi do analizy kodu, takich jak Mythril i Slither, najlepiej przed scaleniem każdego pull request, porównując różnice w danych wyjściowych
- Solidity nie emituje ŻADNYCH ostrzeżeń kompilatora
- Twój kod jest dobrze udokumentowany

Można powiedzieć o wiele więcej na temat procesu rozwoju, ale te elementy są dobre do rozpoczęcia. Aby uzyskać więcej elementów i szczegółowe wyjaśnienia, zobacz [listę kontrolną jakości procesu dostarczoną przez DeFiSafety](https://docs.defisafety.com/audit-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) jest nieoficjalnym publicznym serwisem publikującym recenzje różnych dużych, publicznych aplikacji zdecentralizowanych Ethereum. Część systemu oceny programu DeFiSafety obejmuje zakres, w jakim projekt jest zgodny z tą listą kontrolną jakości procesów. Postępując zgodnie z tymi procesami:

- Stworzysz bardziej bezpieczny kod, wykonując odtwarzalne, automatyczne testy
- Audytorzy będą mogli skuteczniej przeglądać Twój projekt
- Łatwiejsze wdrożenie nowych deweloperów
- Pozwala deweloperom na szybkie iterowanie, testowanie i uzyskiwanie informacji zwrotnych na temat modyfikacji
- Mniej prawdopodobne, że Twój projekt doświadcza regresji

## Ataki i podatność na zagrożenia {#attacks-and-vulnerabilities}

Teraz, gdy piszesz kod Solidity za pomocą wydajnego procesu rozwoju, przyjrzyjmy się pewnym powszechnym słabościom Solidity, aby zobaczyć, co może pójść źle.

### Wielobieżność {#re-entrancy}

Wielobieżność jest jedną z największych i najistotniejszych kwestii bezpieczeństwa, które należy rozważyć podczas opracowywania inteligentnych kontraktów. Chociaż EVM nie może uruchamiać wielu kontraktów w tym samym czasie, kontrakt wywołujący inny kontrakt wstrzymuje wykonywanie kontraktu wywołującego i stan pamięci do momentu zwrotu wywołania, w którym to momencie wykonanie przebiega normalnie. Ta przerwa i ponowne uruchomienie może stworzyć podatność znaną jako „wielobieżność”.

Oto prosta wersja kontraktu, która jest podatna na wielobieżność:

```solidity
//TEN KONTRAKT JEST CELOWO PODATNY, NIE KOPIOWAĆ
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

Aby zezwolić użytkownikowi na wycofanie ETH, który wcześniej przechowywał w kontrakcie, funkcja ta

1. Odczytuje, ile salda ma użytkownik
2. Wysyła mu kwotę tego salda w ETH
3. Resetuje saldo do do 0, więc nie może ponownie wypłacić swojego salda.

W przypadku wywołania ze zwykłego konta (takiego jak własne konto MetaMask), działa to zgodnie z oczekiwaniami: msg.sender.call.value() po prostu wysyła ETH z twojego konta. Inteligentne kontrakty mogą jednak również wywoływać połączenia. Jeśli niestandardowy, złośliwy kontrakt jest tym, który wywołuje `withdraw()`, msg.sender.call.value() nie tylko wyśle `amount` w ETH, ale będzie także niejawnie wywoływać kontrakt, aby rozpocząć wykonywanie kodu. Wyobraź sobie, że ten złośliwy kontrakt:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Wywołanie Attacker.beginAttack() rozpocznie cykl, który wygląda następująco:

```
0.) Atakujący EOA wywołuje Attacker.beginAttack() z 1 ETH
0.) Attacker.beginAttack() deponuje 1 ETH na rzecz ofiary

  1.) Atakujący -> Victim.withdraw()
  1.) Ofiara odczytuje balanceOf[msg.sender]
  1.) Ofiara wysyła ETH do atakującego (który wykonuje domyślną funkcję)
    2.) Atakujący -> Victim.withdraw()
    2.) Ofiara odczytuje balanceOf[msg.sender]
    2.) Ofiara wysyła ETH do atakującego (który wykonuje domyślną funkcję)
      3.) Atakujący -> Victim.withdraw()
  3.) Ofiara odczytuje balanceOf[msg.sender]
      3.) Ofiara wysyła ETH do atakującego (który wykonuje domyślną funkcję)
    4.) Atakujący nie ma już wystarczającej ilości gazu, zwraca bez ponownego wywołania
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (już było 0)
  1.) balances[msg.sender] = 0; (już było 0)
```

Wywołanie Attacker.beginAttack z 1 ETH spowoduje atak ponownego wejścia na ofiarę, wycofanie więcej ETH niż zostało dostarczone (pobrane z sald innych użytkowników, powodując, że kontrakt ofiary stanie się niewystarczająco zabezpieczony)

### Jak radzić sobie z wielobieżnością (niewłaściwy sposób) {#how-to-deal-with-re-entrancy-the-wrong-way}

Można rozważyć pokonanie wielobieżności po prostu uniemożliwiając jakimkolwiek inteligentnym kontraktom interakcję z Twoim kodem. Wyszukujesz stackoverflow, znajdujesz ten fragment kodu z mnóstwem głosów za:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Wydaje się to mieć sens: kontrakty mają kod, jeśli wywołujący ma jakiś kod, nie zezwalaj na wpłatę. Dodajmy to:

```solidity
// TEN KONTRAKT JEST CELOWO PODATNY, NIE KOPIOWAĆ
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
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

Teraz, aby zdeponować ETH, nie wolno Ci mieć kodu inteligentnego kontraktu pod swoim adresem. Można to jednak łatwo pokonać za pomocą następującego kontraktu atakującego:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Podczas gdy pierwszy atak był atakiem na logikę kontraktu, ten jest atakiem atak na zachowanie wdrożenia kontraktu Ethereum. Podczas budowy kontrakt nie zwrócił jeszcze swojego kodu do wdrożenia pod jego adresem, ale zachowuje pełną kontrolę EVM PODCZAS tego procesu.

Z technicznego punktu widzenia możliwe jest zapobieżenie wywołaniu Twojego kodu przez inteligentne kontrakty, używając tego wiersza:

```solidity
require(tx.origin == msg.sender)
```

Nadal jednak nie jest to dobre rozwiązanie. Jednym z najbardziej ekscytujących aspektów Ethereum jest możliwość komponowania, inteligentne kontrakty integrują się ze sobą i nadbudowują się wzajemnie. Korzystając z powyższej linii, ograniczasz użyteczność swojego projektu.

### Jak radzić sobie z wielobieżnością (właściwy sposób) {#how-to-deal-with-re-entrancy-the-right-way}

Po prostu zmieniając kolejność aktualizacji pamięci masowej i wywołania zewnętrznego, zapobiegamy warunkowi wielobieżności, który umożliwił atak. Wywołanie zwrotne wycofania jest wprawdzie możliwe, ale atakujący na tym nie skorzysta, ponieważ pamięć `balances` będzie już ustawiona na 0.

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

Powyższy kod jest zgodny z wzorcem projektu „Checks-Effects-Interaction”, który pomaga chronić przed wielobieżnością. Możesz [przeczytać więcej na temat interakcji Checks-Effects-Interactions tutaj](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Jak radzić sobie z wielobieżnością (opcja nuklearna) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Za każdym razem, gdy wysyłasz ETH na niezaufany adres lub wchodzisz w interakcje z nieznanym kontraktem (np. wywołanie `transfer()` adresu tokenów dostarczonego przez użytkownika), otwiera się na możliwość wielobieżności. **Projektując kontrakty, które nie wysyłają ETH ani nie wywołują niezaufanych kontraktów, zapobiegasz możliwości wielobieżności!**

## Więcej rodzajów ataków {#more-attack-types}

Powyższe rodzaje ataków obejmują problemy z kodowaniem inteligentnych kontraktów (wielobieżność) i osobliwości Ethereum (działający kod wewnątrz konstruktorów, zanim kod będzie dostępny pod adresem kontraktowym). Istnieje wiele, wiele innych rodzajów ataków, o których należy wiedzieć, takich jak:

- Front-running
- Odrzucenie wysyłania ETH
- Przeładowanie/niedomiar liczby całkowitej

Dalsza lektura:

- [Consensys Smart Contract — znane ataki](https://consensys.github.io/smart-contract-best-practices/attacks/) — bardzo czytelne wyjaśnienie najważniejszych luk, z przykładowym kodem dla większości.
- [Rejestr SWC](https://swcregistry.io/docs/SWC-128) — wyselekcjonowana lista CWE, które mają zastosowanie do Ethereum i inteligentnych kontraktów

## Narzędzia bezpieczeństwa {#security-tools}

Chociaż nic nie zastąpi zrozumienia podstaw bezpieczeństwa Ethereum i zaangażowania profesjonalnej firmy audytorskiej w sprawdzenie kodu, dostępnych jest wiele narzędzi, które pomogą wskazać potencjalne problemy w kodzie.

### Bezpieczeństwo kontraktów inteligentnych {#smart-contract-security}

**Slither —** **_framework analizy statycznej Solidity napisany w Pythonie 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX —** **_API analizy bezpieczeństwa dla inteligentnych kontraktów Ethereum._**

- [mythx.io](https://mythx.io/)
- [Dokumentacja](https://docs.mythx.io/en/latest/)

**Mythril —** **_narzędzie do analizy bezpieczeństwa dla kodu bajtowego EVM._**

- [mithril](https://github.com/ConsenSys/mythril)
- [Dokumentacja](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore —** **_interfejs wiersza poleceń, który wykorzystuje symboliczne narzędzie do wykonywania inteligentnych kontraktów i plików binarnych._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentacja](https://github.com/trailofbits/manticore/wiki)

**Securify —** **_skaner bezpieczeństwa dla inteligentnych kontraktów Ethereum._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**Weryfikator ERC20 —** **_narzędzie weryfikacji używane do sprawdzenia, czy kontrakt jest zgodny ze standardem ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Weryfikacja formalna {#formal-verification}

**Informacje na temat weryfikacji formalnej**

- [Jak działa formalna weryfikacja inteligentnych kontaktów](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 lipca 2018 – Brian Marick_
- [Jak weryfikacja formalna może zapewnić bezbłędne inteligentne kontrakty](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 stycznia 2018 — Bernard Mueller_

### Korzystanie z narzędzi {#using-tools}

Dwa najpopularniejsze narzędzia do analizy bezpieczeństwa inteligentnych kontraktów to:

- [Slither](https://github.com/crytic/slither) autorstwa [Trail of Bits](https://www.trailofbits.com/) (hostowana wersja: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) autorstwa [ConsenSys](https://consensys.net/) (hostowana wersja: [MythX](https://mythx.io/))

Oba są użytecznymi narzędziami, które analizują Twój kod i zgłaszają problemy. Każdy ma wersję [commercial] hostowaną, ale są również dostępne za darmo do uruchomienia lokalnie. Poniżej znajduje się szybki przykład jak uruchomić Slither, który jest dostępny w wygodnym obrazie Docker `trailofbits/eth-security-toolbox`. Będziesz musiał [zainstalować Docker, jeśli jeszcze go nie masz](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Wygeneruje ten wynik:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither zidentyfikował tutaj możliwość wielobieżności, identyfikując kluczowe linie, w których może wystąpić problem, i podając nam link do dalszych szczegółów na temat problemu:

> Piśmiennictwo: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

pozwalający szybko dowiedzieć się o potencjalnych problemach z kodem. Podobnie jak wszystkie zautomatyzowane narzędzia testowe, Slither nie jest doskonały i popełnia zbyt wiele błędów, jeśli chodzi o raportowanie. Może ostrzec przed potencjalną wielobieżnością nawet jeśli nie ma podatności na zagrożenia. Często przeglądanie RÓŻNICY w danych wyjściowych Slither między zmianami w kodzie jest niezwykle pouczające, pomagając odkryć luki w zabezpieczeniach, które zostały wprowadzone znacznie wcześniej niż w przypadku czekania na ukończenie projektu.

## Dalsza lektura {#further-reading}

**Przewodnik po najlepszych praktykach bezpieczeństwa dotyczących inteligentnych kontraktów**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Zbiór zaleceń dotyczących bezpieczeństwa i najlepsze praktyki](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Standard weryfikacji bezpieczeństwa inteligentnych kontraktów (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane samouczki {#related-tutorials}

- [Bezpieczny proces tworzenia](/developers/tutorials/secure-development-workflow/)
- [Jak korzystać ze Slither, aby znaleźć błędy dotyczące inteligentnych kontraktów](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jak korzystać z Manticore, aby znaleźć błędy w inteligentnych kontraktach](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Wytyczne dotyczące bezpieczeństwa](/developers/tutorials/smart-contract-security-guidelines/)
- [Bezpieczeństwo tokena](/developers/tutorials/token-integration-checklist/)
