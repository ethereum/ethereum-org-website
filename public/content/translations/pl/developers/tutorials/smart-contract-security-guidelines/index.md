---
title: Wskazówki dotyczące bezpieczeństwa kontraktów inteligentnych
description: Lista kontrolna wytycznych bezpieczeństwa do rozważenia podczas tworzenia aplikacji zdecentralizowanych
author: "Trailofbits"
tags:
  - "solidity"
  - "inteligentne kontrakty"
  - "ochrona"
skill: intermediate
lang: pl
published: 2020-09-06
source: Tworzenie bezpiecznych kontraktów
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Postępuj zgodnie z tymi ogólnymi zaleceniami, aby tworzyć bezpieczniejsze inteligentne kontrakty.

## Wytyczne dotyczące projektowania {#design-guidelines}

Projekt kontraktu powinien być omówiony z wyprzedzeniem, przed napisaniem jakiejkolwiek linijki kodu.

### Dokumentacja i specyfikacje {#documentation-and-specifications}

Dokumentacja może być pisana na różnych poziomach i powinna być aktualizowana w trakcie realizacji umów:

- **Prosty opis systemu w języku angielskim**, przedstawiający działanie kontraktów i wszelkie założenia dotyczące bazy kodu.
- **Diagramy schematów i architektury**, w tym interakcje kontraktów i maszyna stanu systemu. [Drukarki Slither](https://github.com/crytic/slither/wiki/Printer-documentation) mogą pomóc w wygenerowaniu tych schematów.
- **Dokładna dokumentacja kodu**, [format Natspec](https://solidity.readthedocs.io/en/develop/natspec-format.html) może być używany do Solidity.

### Obliczenia on-chain vs off-chain {#on-chain-vs-off-chain-computation}

- **Zachowaj jak najwięcej kodu off-chain.** Zatrzymaj niewielką warstwę on-chain. Wstępnie przetwarzaj dane z kodem off-chain w taki sposób, aby weryfikacja on-chain była prosta. Potrzebujesz uporządkowanej listy? Posortuj listę off-chain, a następnie sprawdź tylko jej kolejność on-chain.

### Możliwość uaktualnienia {#upgradeability}

Omówiliśmy różne rozwiązania dotyczące możliwości uaktualnień w [poście na blogu](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Dokonaj rozważnego wyboru, czy wspierać możliwość uaktualniania, czy nie, przed napisaniem jakiegokolwiek kodu. Decyzja wpłynie na sposób, w jaki ustrukturyzujesz kod. Generalnie zalecamy:

- **Przedkładanie [migracji kontraktu](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) nad możliwość uaktualnienia.** System migracji ma wiele takich samych zalet, jak możliwość uaktualnienia, bez ich wad.
- **Używanie wzorca separacji danych zamiast wzorca delegatecalproxy.** Jeśli projekt ma wyraźną separację abstrakcji, możliwość uaktualnienia przy użyciu separacji danych będzie wymagać tylko kilku dostosowań. Delegatecallproxy wymaga wiedzy specjalistycznej o EVM i jest wysoce podatny na błędy.
- **Dokumentowanie procedury migracji/uaktualnienia przed wdrożeniem.** Jeśli będziesz musiał reagować w stresie bez żadnych wytycznych, popełnisz błędy. Zapisz procedurę do wykonania z wyprzedzeniem. Powinna ona obejmować:
  - Wywołania inicjujące nowe kontrakty
  - Gdzie są przechowywane klucze i jak uzyskać dostęp do nich
  - Jak sprawdzić wdrożenie! Opracowanie i przetestowanie skryptu po wdrożeniu.

## Wytyczne dotyczące wdrażania {#implementation-guidelines}

**Poszukaj prostoty.** Zawsze używaj najprostszego rozwiązania, które pasuje do Twojego celu. Każdy członek twojego zespołu powinien być w stanie zrozumieć Twoje rozwiązanie.

### Skład funkcji {#function-composition}

Architektura Twojej bazy kodu powinna ułatwić sprawdzenie twojego kodu. Unikaj wyborów architektonicznych, które zmniejszają zdolność rozumowania o jego poprawności.

- **Podziel logikę swojego systemu** poprzez wiele umów lub grupowanie podobnych funkcji (na przykład uwierzytelniające, arytmetyczne, ...).
- **Pisz małe funkcje o wyraźnym celu celu.** To ułatwi sprawdzenie i umożliwi testowanie poszczególnych komponentów.

### Dziedziczenie {#inheritance}

- **Zachowaj dziedziczenie do zarządzania.** Dziedzictwo powinno być używane do dzielenia logiki, jednak Twój projekt powinien mieć na celu zminimalizowanie głębokości i szerokości drzewa dziedziczenia.
- **Użyj [drukarki dziedziczenia Slither'a](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph), aby sprawdzić hierarchię kontraktów.** Drukarka dziedziczenia pomoże Ci sprawdzić rozmiar hierarchii.

### Zdarzenia {#events}

- **Rejestruj wszystkie kluczowe operacje.** Zdarzenia pomogą debugować kontrakt podczas jego oprawcowywania i będą go monitorować po wdrożeniu.

### Unikanie znanych pułapek {#avoid-known-pitfalls}

- **Bądź świadomy najczęstszych problemów z bezpieczeństwem.** Istnieje wiele zasobów online do poznania wspólnych problemów, takich jak [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Zajmij Ether](https://capturetheether.com/)lub [Nie tak inteligentne kontrakty](https://github.com/crytic/not-so-smart-contracts/).
- **Zwróć uwagę na sekcje ostrzeżeń w [dokumentacji Solidity](https://solidity.readthedocs.io/en/latest/).** Sekcje z ostrzeżeniami poinformują Cię o nieoczywistym zachowaniu języka.

### Zależności {#dependencies}

- **Używaj dobrze przetestowanych bibliotek.** Importowanie kodu z dobrze przetestowanych bibliotek zmniejszy prawdopodobieństwo, że napiszesz kod z błędami. Jeśli chcesz napisać kontrakt ERC20, użyj [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Użyj menedżera zależności; unikaj kopiowania kodu.** Jeśli opierasz się na źródle zewnętrznym, musisz na bieżąco aktualizować je w stosunku do źródła oryginalnego.

### Testy i weryfikacja {#testing-and-verification}

- **Zapisz dokładne testy jednostkowe.** Rozległy zestaw testowy ma kluczowe znaczenie dla budowy oprogramowania wysokiej jakości.
- **Napisz niestandardowe kontrole i właściwości dla narzędzi [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) i [Manticore](https://github.com/trailofbits/manticore).** Automatyczne narzędzia pomogą zapewnić bezpieczeństwo umowy. Przejrzyj resztę tego przewodnika, aby dowiedzieć się, jak pisać skuteczne kontrole i właściwości.
- **Użyj [crytic.io](https://crytic.io/).** Crytic integruje się z Githubem, zapewnia dostęp do prywatnych detektorów Slither, i uruchamia niestandardowe kontrole właściwości z Echidny.

### Solidity {#solidity}

- **Favor Solidity 0.5 ponad 0.4 i 0.6.** Naszym zdaniem Solidity 0.5 jest bezpieczniejszy i ma lepsze wbudowane praktyki niż 0.4. Solidity 0.6 okazała się zbyt niestabilna do produkcji i wymaga czasu, aby dojrzeć.
- **Użyj stabilnej wersji do kompilacji; użyj najnowszej wersji, aby sprawdzić ostrzeżenia.** Sprawdź, czy Twój kod nie ma zgłoszonych problemów z najnowszą wersją kompilatora. Solidity ma jednak szybki cykl wydawniczy i ma historię błędów kompilatora, więc nie zalecamy wdrażania najnowszej wersji (zobacz [zalecenie wersji Solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Nie używaj wbudowanego asemblera.** Asemblacja wymaga wiedzy fachowej na temat EVM. Nie pisz kodu EVM, jeśli nie _opanowałeś_ żółtej księgi.

## Wytyczne dotyczące wdrażania {#deployment-guidelines}

Po opracowaniu i wdrożeniu kontraktu:

- **Monitoruj swoje kontrakty.** Obserwuj dzienniki i bądź gotowy do reagowania w przypadku naruszenia kontraktu lub portfela.
- **Dodaj swoje dane kontaktowe do [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Ta lista pomaga firmom zewnętrznym skontaktować się z Tobą w przypadku wykrycia luki w zabezpieczeniach.
- **Zabezpiecz portfele uprzywilejowanych użytkowników.** Postępuj zgodnie z naszymi [najlepszymi praktykami](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/), jeśli przechowujesz klucze w portfelach sprzętowych.
- **Opracuj plan reakcji na incydent.** Weź pod uwagę, że Twoje inteligentne kontrakty mogą zostać naruszone. Nawet jeśli twoje kontrakty są wolne od błędów, atakujący może przejąć kontrolę nad kluczami właściciela umowy.
