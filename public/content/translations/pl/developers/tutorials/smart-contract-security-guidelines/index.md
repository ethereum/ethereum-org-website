---
title: "Wskazówki dotyczące bezpieczeństwa kontraktów inteligentnych"
description: "Lista kontrolna wytycznych bezpieczeństwa do rozważenia podczas tworzenia aplikacji zdecentralizowanych"
author: "Trailofbits"
tags: [ "solidity", "smart kontrakty", "bezpieczeństwo" ]
skill: intermediate
lang: pl
published: 2020-09-06
source: "Tworzenie bezpiecznych kontraktów"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Postępuj zgodnie z tymi ogólnymi zaleceniami, aby tworzyć bezpieczniejsze inteligentne kontrakty.

## Wytyczne projektowe {#design-guidelines}

Projekt kontraktu powinien być omówiony z wyprzedzeniem, przed napisaniem jakiejkolwiek linijki kodu.

### Dokumentacja i specyfikacje {#documentation-and-specifications}

Dokumentacja może być pisana na różnych poziomach i powinna być aktualizowana w trakcie realizacji umów:

- **Prosty opis systemu w języku angielskim**, opisujący działanie kontraktów i wszelkie założenia dotyczące bazy kodu.
- **Schematy i diagramy architektury**, w tym interakcje kontraktów i maszyna stanu systemu. [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) mogą pomóc w generowaniu tych schematów.
- **Dokładna dokumentacja kodu**, dla Solidity można użyć [formatu Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html).

### Obliczenia on-chain a off-chain {#onchain-vs-offchain-computation}

- **Jak najwięcej kodu trzymaj off-chain.** Utrzymuj jak najmniejszą warstwę on-chain. Wstępnie przetwarzaj dane za pomocą kodu off-chain w taki sposób, aby weryfikacja on-chain była prosta. Potrzebujesz uporządkowanej listy? Posortuj listę off-chain, a następnie sprawdź tylko jej kolejność on-chain.

### Możliwość aktualizacji {#upgradeability}

Omówiliśmy różne rozwiązania dotyczące możliwości aktualizacji w [naszym wpisie na blogu](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Dokonaj rozważnego wyboru, czy wspierać możliwość uaktualniania, czy nie, przed napisaniem jakiegokolwiek kodu. Decyzja wpłynie na to, jak ustrukturyzujesz swój kod. Generalnie zalecamy:

- **Preferowanie [migracji kontraktów](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) zamiast możliwości aktualizacji.** Systemy migracji mają wiele tych samych zalet co systemy z możliwością aktualizacji, a przy tym są pozbawione ich wad.
- **Stosowanie wzorca separacji danych zamiast wzorca delegatecallproxy.** Jeśli Twój projekt ma wyraźną separację abstrakcji, możliwość aktualizacji z wykorzystaniem separacji danych będzie wymagać tylko kilku dostosowań. Delegatecallproxy wymaga wiedzy specjalistycznej o EVM i jest wysoce podatny na błędy.
- **Udokumentuj procedurę migracji/aktualizacji przed wdrożeniem.** Jeśli będziesz musiał(a) reagować w stresie bez żadnych wytycznych, popełnisz błędy. Zapisz procedurę do wykonania z wyprzedzeniem. Powinna ona obejmować:
  - Wywołania inicjujące nowe kontrakty
  - Gdzie są przechowywane klucze i jak uzyskać dostęp do nich
  - Jak sprawdzić wdrożenie! Opracowanie i przetestowanie skryptu po wdrożeniu.

## Wytyczne dotyczące implementacji {#implementation-guidelines}

**Dąż do prostoty.** Zawsze używaj najprostszego rozwiązania, które odpowiada Twoim celom. Każdy członek twojego zespołu powinien być w stanie zrozumieć Twoje rozwiązanie.

### Składanie funkcji {#function-composition}

Architektura Twojej bazy kodu powinna ułatwić sprawdzenie twojego kodu. Unikaj wyborów architektonicznych, które zmniejszają zdolność rozumowania o jego poprawności.

- **Podziel logikę swojego systemu** na wiele kontraktów lub grupuj podobne funkcje (np. uwierzytelnianie, arytmetyka itp.).
- **Pisz małe funkcje o jasno określonym celu.** Ułatwi to przegląd i pozwoli na testowanie poszczególnych komponentów.

### Dziedziczenie {#inheritance}

- **Utrzymuj dziedziczenie na łatwym do zarządzania poziomie.** Dziedziczenie powinno służyć do podziału logiki, jednak projekt powinien dążyć do zminimalizowania głębokości i szerokości drzewa dziedziczenia.
- **Użyj [inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) Slithera, aby sprawdzić hierarchię kontraktów.** Narzędzie to pomoże Ci przeanalizować rozmiar hierarchii.

### Zdarzenia {#events}

- **Rejestruj wszystkie kluczowe operacje.** Zdarzenia pomogą w debugowaniu kontraktu podczas jego tworzenia i monitorowaniu go po wdrożeniu.

### Unikaj znanych pułapek {#avoid-known-pitfalls}

- **Bądź świadomy(-a) najczęstszych problemów z bezpieczeństwem.** Istnieje wiele zasobów online, z których można dowiedzieć się o powszechnych problemach, takich jak [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) lub [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Zwróć uwagę na sekcje z ostrzeżeniami w [dokumentacji Solidity](https://docs.soliditylang.org/en/latest/).** Sekcje z ostrzeżeniami poinformują Cię o nieoczywistym zachowaniu języka.

### Zależności {#dependencies}

- **Używaj dobrze przetestowanych bibliotek.** Importowanie kodu z dobrze przetestowanych bibliotek zmniejszy prawdopodobieństwo, że napiszesz kod z błędami. Jeśli chcesz napisać kontrakt ERC20, użyj [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Używaj menedżera zależności; unikaj kopiowania kodu.** Jeśli polegasz na zewnętrznym źródle, musisz je na bieżąco aktualizować zgodnie z oryginalnym źródłem.

### Testowanie i weryfikacja {#testing-and-verification}

- **Pisz dokładne testy jednostkowe.** Rozbudowany pakiet testów ma kluczowe znaczenie dla tworzenia oprogramowania wysokiej jakości.
- **Pisz niestandardowe testy i właściwości dla narzędzi [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) i [Manticore](https://github.com/trailofbits/manticore).** Zautomatyzowane narzędzia pomogą zapewnić bezpieczeństwo Twojego kontraktu. Przejrzyj resztę tego przewodnika, aby dowiedzieć się, jak pisać skuteczne kontrole i właściwości.
- **Użyj [crytic.io](https://crytic.io/).** Crytic integruje się z GitHubem, zapewnia dostęp do prywatnych detektorów Slither i uruchamia niestandardowe testy właściwości z Echidny.

### Solidity {#solidity}

- **Preferuj Solidity 0.5 zamiast 0.4 i 0.6.** Naszym zdaniem Solidity 0.5 jest bezpieczniejszy i ma lepsze wbudowane praktyki niż 0.4. Solidity 0.6 okazała się zbyt niestabilna do produkcji i wymaga czasu, aby dojrzeć.
- **Użyj stabilnej wersji do kompilacji; użyj najnowszej wersji, aby sprawdzić ostrzeżenia.** Sprawdź, czy Twój kod nie ma zgłoszonych problemów z najnowszą wersją kompilatora. Jednakże Solidity ma szybki cykl wydawniczy i historię błędów kompilatora, dlatego nie zalecamy najnowszej wersji do wdrożenia (zobacz [rekomendację wersji solc od Slithera](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Nie używaj asemblera wstawkowego.** Używanie asemblera wymaga specjalistycznej wiedzy na temat EVM. Nie pisz kodu EVM, jeśli nie _opanowałeś(-aś)_ do perfekcji żółtej księgi.

## Wytyczne dotyczące wdrażania {#deployment-guidelines}

Po opracowaniu i wdrożeniu kontraktu:

- **Monitoruj swoje kontrakty.** Obserwuj logi i bądź gotów(-owa) do reakcji w przypadku naruszenia bezpieczeństwa kontraktu lub portfela.
- **Dodaj swoje dane kontaktowe do [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Ta lista pomaga stronom trzecim skontaktować się z Tobą w przypadku odkrycia luki w zabezpieczeniach.
- **Zabezpiecz portfele uprzywilejowanych użytkowników.** Postępuj zgodnie z naszymi [najlepszymi praktykami](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/), jeśli przechowujesz klucze w portfelach sprzętowych.
- **Opracuj plan reakcji na incydenty.** Weź pod uwagę, że Twoje inteligentne kontrakty mogą zostać naruszone. Nawet jeśli twoje kontrakty są wolne od błędów, atakujący może przejąć kontrolę nad kluczami właściciela umowy.
