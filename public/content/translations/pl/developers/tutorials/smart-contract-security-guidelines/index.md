---
title: "Wytyczne dotyczące bezpieczeństwa inteligentnych kontraktów"
description: "Lista kontrolna wytycznych dotyczących bezpieczeństwa, które należy wziąć pod uwagę podczas tworzenia zdecentralizowanej aplikacji (dapp)"
author: "Trailofbits"
tags: ["Solidity", "inteligentne kontrakty", "bezpieczeństwo"]
skill: intermediate
breadcrumb: "Wytyczne dotyczące bezpieczeństwa"
lang: pl
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Postępuj zgodnie z tymi ogólnymi zaleceniami, aby tworzyć bezpieczniejsze inteligentne kontrakty.

## Wytyczne dotyczące projektowania {#design-guidelines}

Projekt kontraktu powinien zostać omówiony z wyprzedzeniem, przed napisaniem jakiejkolwiek linijki kodu.

### Dokumentacja i specyfikacje {#documentation-and-specifications}

Dokumentacja może być pisana na różnych poziomach i powinna być aktualizowana podczas wdrażania kontraktów:

- **Opis systemu w prostym języku**, opisujący, co robią kontrakty i wszelkie założenia dotyczące bazy kodu.
- **Schematy i diagramy architektoniczne**, w tym interakcje kontraktów i maszyna stanu systemu. [Drukarki Slither](https://github.com/crytic/slither/wiki/Printer-documentation) mogą pomóc w wygenerowaniu tych schematów.
- **Dokładna dokumentacja kodu**, dla języka Solidity można użyć [formatu NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html).

### Obliczenia onchain a pozałańcuchowe {#onchain-vs-offchain-computation}

- **Utrzymuj jak najwięcej kodu jako pozałańcuchowy.** Utrzymuj warstwę onchain jak najmniejszą. Przetwarzaj wstępnie dane za pomocą kodu pozałańcuchowego w taki sposób, aby weryfikacja onchain była prosta. Potrzebujesz uporządkowanej listy? Posortuj listę w sposób pozałańcuchowy, a następnie tylko sprawdź jej kolejność onchain.

### Możliwość aktualizacji {#upgradeability}

Omówiliśmy różne rozwiązania dotyczące możliwości aktualizacji w [naszym wpisie na blogu](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Przed napisaniem jakiegokolwiek kodu dokonaj świadomego wyboru, czy chcesz wspierać możliwość aktualizacji, czy nie. Ta decyzja wpłynie na strukturę Twojego kodu. Ogólnie rzecz biorąc, zalecamy:

- **Preferowanie [migracji kontraktu](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) zamiast możliwości aktualizacji.** Systemy migracji mają wiele takich samych zalet jak te z możliwością aktualizacji, ale bez ich wad.
- **Używanie wzorca separacji danych zamiast wzorca delegatecallproxy.** Jeśli Twój projekt ma wyraźny podział abstrakcji, możliwość aktualizacji przy użyciu separacji danych będzie wymagała tylko kilku dostosowań. Wzorzec delegatecallproxy wymaga wiedzy eksperckiej na temat EVM i jest wysoce podatny na błędy.
- **Udokumentowanie procedury migracji/aktualizacji przed wdrożeniem.** Jeśli będziesz musiał reagować w stresie bez żadnych wytycznych, popełnisz błędy. Zapisz procedurę do naśladowania z wyprzedzeniem. Powinna ona obejmować:
  - Wywołania, które inicjują nowe kontrakty
  - Gdzie przechowywane są klucze i jak uzyskać do nich dostęp
  - Jak sprawdzić wdrożenie! Opracuj i przetestuj skrypt po wdrożeniu.

## Wytyczne dotyczące implementacji {#implementation-guidelines}

**Dąż do prostoty.** Zawsze używaj najprostszego rozwiązania, które odpowiada Twojemu celowi. Każdy członek Twojego zespołu powinien być w stanie zrozumieć Twoje rozwiązanie.

### Kompozycja funkcji {#function-composition}

Architektura Twojej bazy kodu powinna ułatwiać jego przegląd. Unikaj wyborów architektonicznych, które zmniejszają możliwość wnioskowania o jego poprawności.

- **Podziel logikę swojego systemu**, albo poprzez wiele kontraktów, albo poprzez grupowanie podobnych funkcji (na przykład uwierzytelnianie, arytmetyka, ...).
- **Pisz małe funkcje o jasnym celu.** Ułatwi to przegląd i pozwoli na testowanie poszczególnych komponentów.

### Dziedziczenie {#inheritance}

- **Utrzymuj dziedziczenie na łatwym do zarządzania poziomie.** Dziedziczenie powinno być używane do podziału logiki, jednak Twój projekt powinien dążyć do zminimalizowania głębokości i szerokości drzewa dziedziczenia.
- **Użyj [drukarki dziedziczenia](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) narzędzia Slither, aby sprawdzić hierarchię kontraktów.** Drukarka dziedziczenia pomoże Ci przejrzeć rozmiar hierarchii.

### Zdarzenia {#events}

- **Loguj wszystkie kluczowe operacje.** Zdarzenia pomogą w debugowaniu kontraktu podczas rozwoju i monitorowaniu go po wdrożeniu.

### Unikaj znanych pułapek {#avoid-known-pitfalls}

- **Bądź świadomy najczęstszych problemów z bezpieczeństwem.** Istnieje wiele zasobów online, z których można dowiedzieć się o typowych problemach, takich jak [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) lub [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Zwróć uwagę na sekcje ostrzeżeń w [dokumentacji Solidity](https://docs.soliditylang.org/en/latest/).** Sekcje ostrzeżeń poinformują Cię o nieoczywistym zachowaniu języka.

### Zależności {#dependencies}

- **Używaj dobrze przetestowanych bibliotek.** Importowanie kodu z dobrze przetestowanych bibliotek zmniejszy prawdopodobieństwo napisania błędnego kodu. Jeśli chcesz napisać kontrakt ERC-20, użyj [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Używaj menedżera zależności; unikaj kopiowania i wklejania kodu.** Jeśli polegasz na zewnętrznym źródle, musisz je aktualizować zgodnie z oryginalnym źródłem.

### Testowanie i weryfikacja {#testing-and-verification}

- **Pisz dokładne testy jednostkowe.** Rozbudowany zestaw testów ma kluczowe znaczenie dla tworzenia oprogramowania wysokiej jakości.
- **Pisz niestandardowe sprawdzenia i właściwości dla narzędzi [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) i [Medusa](https://github.com/crytic/medusa).** Zautomatyzowane narzędzia pomogą zapewnić bezpieczeństwo Twojego kontraktu. Przejrzyj resztę tego przewodnika, aby dowiedzieć się, jak pisać skuteczne sprawdzenia i właściwości.
- **Uruchamiaj te narzędzia w ramach ciągłej integracji.** Uruchamianie narzędzia Slither i właściwości fuzzingu przy każdym pull requeście pozwala wychwycić regresje przed ich scaleniem.

### Solidity {#solidity}

- **Używaj jednej z nowszych wersji Solidity 0.8.x bez znanych poważnych błędów.** Solidity 0.8 domyślnie sprawdza operacje arytmetyczne pod kątem przepełnienia i niedomiaru, a starsze wersje nie mają nowszych weryfikacji bezpieczeństwa kompilatora. Zobacz [rekomendację dotyczącą wersji solc](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity) narzędzia Slither.
- **Używaj stabilnej wersji do kompilacji; używaj najnowszej wersji do sprawdzania ostrzeżeń.** Sprawdź, czy Twój kod nie ma zgłoszonych problemów w najnowszej wersji kompilatora. Jednakże Solidity ma szybki cykl wydawniczy i historię błędów kompilatora, więc unikaj wdrażania z wersją wydaną zaledwie kilka dni temu. Sprawdź [listę znanych błędów kompilatora](https://docs.soliditylang.org/en/latest/bugs.html) dla wybranej wersji.
- **Nie używaj wstawek w asemblerze.** Asembler wymaga eksperckiej wiedzy na temat EVM. Nie pisz kodu EVM, jeśli nie _opanowałeś_ żółtej księgi.

## Wytyczne dotyczące wdrożenia {#deployment-guidelines}

Po opracowaniu i wdrożeniu kontraktu:

- **Monitoruj swoje kontrakty.** Obserwuj logi i bądź gotowy do reakcji w przypadku naruszenia bezpieczeństwa kontraktu lub portfela.
- **Dodaj swoje dane kontaktowe do [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Ta lista pomaga stronom trzecim skontaktować się z Tobą w przypadku wykrycia luki w zabezpieczeniach.
- **Zabezpiecz portfele uprzywilejowanych użytkowników.** Postępuj zgodnie z naszymi [najlepszymi praktykami](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/), jeśli przechowujesz klucze w portfelach sprzętowych.
- **Miej plan reagowania na incydenty.** Weź pod uwagę, że Twoje inteligentne kontrakty mogą zostać naruszone. Nawet jeśli Twoje kontrakty są wolne od błędów, atakujący może przejąć kontrolę nad kluczami właściciela kontraktu.
