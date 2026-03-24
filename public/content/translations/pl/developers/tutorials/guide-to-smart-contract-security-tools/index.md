---
title: "Przewodnik po narzędziach bezpieczeństwa inteligentnych kontraktów"
description: "Przegląd trzech różnych technik testowania i analizy programu"
author: "Trailofbits"
lang: pl
tags: [ "solidity", "smart kontrakty", "bezpieczeństwo" ]
skill: intermediate
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Użyjemy trzech odrębnych technik testowania i analizy programu:

- **Analiza statyczna z użyciem [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Wszystkie ścieżki programu są aproksymowane i analizowane w tym samym czasie, poprzez różne reprezentacje programu (np. graf przepływu sterowania)
- **Fuzzing z użyciem [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kod jest wykonywany z pseudolosowym generowaniem transakcji. Fuzzer będzie próbował znaleźć sekwencję transakcji naruszającą daną właściwość.
- **Wykonanie symboliczne z użyciem [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Formalna technika weryfikacji, która tłumaczy każdą ścieżkę wykonania na formułę matematyczną, na której można sprawdzać ograniczenia.

Każda technika ma zalety i wady i będzie przydatna w [określonych przypadkach](#determining-security-properties):

| Technika              | Narzędzie | Zastosowanie                   | Szybkość | Pominięte błędy | Fałszywe alarmy |
| --------------------- | --------- | ------------------------------ | -------- | --------------- | --------------- |
| Analiza statyczna     | Slither   | CLI i skrypty                  | sekundy  | umiarkowany     | niski           |
| Fuzzing               | Echidna   | Właściwości Solidity           | minuty   | niski           | brak            |
| Wykonanie symboliczne | Manticore | Właściwości Solidity i skrypty | godziny  | brak\*          | brak            |

\* jeśli wszystkie ścieżki zostaną zbadane bez przekroczenia limitu czasu

**Slither** analizuje kontrakty w ciągu kilku sekund, jednak analiza statyczna może prowadzić do fałszywych alarmów i będzie mniej odpowiednia do złożonych sprawdzeń (np. sprawdzeń arytmetycznych). Uruchom Slither przez API, aby uzyskać łatwy dostęp do wbudowanych detektorów lub przez API, aby uzyskać dostęp do sprawdzeń zdefiniowanych przez użytkownika.

**Echidna** musi działać przez kilka minut i będzie generować tylko prawdziwie pozytywne wyniki. Echidna sprawdza właściwości bezpieczeństwa dostarczone przez użytkownika, napisane w Solidity. Może pominąć błędy, ponieważ opiera się na losowej eksploracji.

**Manticore** wykonuje analizę \ Podobnie jak Echidna, Manticore weryfikuje właściwości dostarczone przez użytkownika. Potrzebuje więcej czasu na uruchomienie, ale może udowodnić poprawność właściwości i nie zgłasza fałszywych alarmów.

## Sugerowany przepływ pracy {#suggested-workflow}

Zacznij od wbudowanych detektorów Slither, aby upewnić się, że żadne proste błędy nie są obecnie obecne ani nie zostaną wprowadzone później. Użyj Slither do sprawdzania właściwości związanych z dziedziczeniem, zależnościami zmiennych i problemami strukturalnymi. W miarę rozrastania się bazy kodu użyj Echidny do testowania bardziej złożonych właściwości maszyny stanu. Wróć do Slither, aby opracować niestandardowe sprawdzenia zabezpieczeń niedostępnych w Solidity, takie jak ochrona przed nadpisaniem funkcji. Na koniec użyj Manticore do przeprowadzenia ukierunkowanej weryfikacji krytycznych właściwości bezpieczeństwa, np. operacji arytmetycznych.

- Użyj CLI Slither do wykrywania typowych problemów
- Użyj Echidny do testowania właściwości bezpieczeństwa wysokiego poziomu Twojego kontraktu
- Użyj Slither do pisania niestandardowych sprawdzeń statycznych
- Użyj Manticore, aby uzyskać dogłębną pewność co do krytycznych właściwości bezpieczeństwa

**Uwaga na temat testów jednostkowych**. Testy jednostkowe są niezbędne do tworzenia oprogramowania wysokiej jakości. Jednakże techniki te nie są najlepiej przystosowane do znajdowania luk w zabezpieczeniach. Zazwyczaj są one używane do testowania pozytywnych zachowań kodu (tj. kod działa zgodnie z oczekiwaniami w normalnym kontekście), podczas gdy luki w zabezpieczeniach mają tendencję do występowania w przypadkach brzegowych, których deweloperzy nie wzięli pod uwagę. W naszym badaniu dziesiątek przeglądów bezpieczeństwa inteligentnych kontraktów, [pokrycie testami jednostkowymi nie miało wpływu na liczbę ani wagę luk w zabezpieczeniach](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/), które znaleźliśmy w kodzie naszych klientów.

## Określanie właściwości bezpieczeństwa {#determining-security-properties}

Aby skutecznie testować i weryfikować swój kod, musisz zidentyfikować obszary, które wymagają uwagi. Ponieważ Twoje zasoby przeznaczone na bezpieczeństwo są ograniczone, ważne jest określenie słabych lub wartościowych części Twojej bazy kodu, aby zoptymalizować Twój wysiłek. Modelowanie zagrożeń może pomóc. Rozważ przejrzenie:

- [Szybkie oceny ryzyka (Rapid Risk Assessments)](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nasze preferowane podejście, gdy brakuje czasu)
- [Przewodnik po modelowaniu zagrożeń systemu zorientowanego na dane](https://csrc.nist.gov/pubs/sp/800/154/ipd) (znany również jako NIST 800-154)
- [Modelowanie zagrożeń wg Shostacka](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Użycie asercji](https://blog.regehr.org/archives/1091)

### Komponenty {#components}

Wiedza o tym, co chcesz sprawdzić, pomoże Ci również w wyborze odpowiedniego narzędzia.

Szerokie obszary, które są często istotne dla inteligentnych kontraktów, obejmują:

- **Maszyna stanu.** Większość kontraktów można przedstawić jako maszynę stanu. Rozważ sprawdzenie, czy (1) nie można osiągnąć żadnego nieprawidłowego stanu, (2) jeśli stan jest prawidłowy, to można go osiągnąć, oraz (3) żaden stan nie blokuje kontraktu.

  - Echidna i Manticore to narzędzia, które należy preferować do testowania specyfikacji maszyn stanów.

- **Kontrola dostępu.** Jeśli Twój system ma uprzywilejowanych użytkowników (np. właściciela, kontrolerów, ...) musisz upewnić się, że (1) każdy użytkownik może wykonywać tylko autoryzowane działania oraz (2) żaden użytkownik nie może blokować działań bardziej uprzywilejowanego użytkownika.

  - Slither, Echidna i Manticore mogą sprawdzać poprawność kontroli dostępu. Na przykład Slither może sprawdzić, czy tylko funkcje z białej listy nie mają modyfikatora onlyOwner. Echidna i Manticore są przydatne do bardziej złożonej kontroli dostępu, takiej jak uprawnienie przyznawane tylko wtedy, gdy kontrakt osiągnie określony stan.

- **Operacje arytmetyczne.** Sprawdzanie poprawności operacji arytmetycznych ma kluczowe znaczenie. Używanie `SafeMath` wszędzie jest dobrym krokiem w celu zapobiegania przepełnieniom/niedopełnieniom, jednak nadal musisz brać pod uwagę inne wady arytmetyczne, w tym problemy z zaokrąglaniem i błędy, które blokują kontrakt.

  - Manticore jest tutaj najlepszym wyborem. Echidna może być używana, jeśli arytmetyka jest poza zakresem solwera SMT.

- **Poprawność dziedziczenia.** Kontrakty Solidity w dużym stopniu opierają się na wielokrotnym dziedziczeniu. Łatwo można wprowadzić błędy, takie jak przesłaniająca funkcja bez wywołania `super` i błędnie zinterpretowany porządek linearyzacji c3.

  - Slither jest narzędziem zapewniającym wykrycie tych problemów.

- **Interakcje zewnętrzne.** Kontrakty wchodzą w interakcje ze sobą, a niektórym kontraktom zewnętrznym nie należy ufać. Na przykład, jeśli Twój kontrakt opiera się na zewnętrznych oracle'ach, czy pozostanie bezpieczny, jeśli połowa dostępnych oracle'i zostanie naruszona?

  - Manticore i Echidna to najlepszy wybór do testowania zewnętrznych interakcji z Twoimi kontraktami. Manticore ma wbudowany mechanizm do zaślepiania zewnętrznych kontraktów.

- **Zgodność ze standardami.** Standardy Ethereum (np. ERC20) mają w swojej historii błędy projektowe. Bądź świadomy ograniczeń standardu, na którym budujesz.
  - Slither, Echidna i Manticore pomogą Ci wykryć odchylenia od danego standardu.

### Ściągawka doboru narzędzi {#tool-selection-cheatsheet}

| Komponent                | Narzędzia                   | Przykłady                                                                                                                                                                                                                                                                       |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Maszyna stanu            | Echidna, Manticore          |                                                                                                                                                                                                                                                                                 |
| Kontrola dostępu         | Slither, Echidna, Manticore | [Ćwiczenie 2 Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Ćwiczenie 2 Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operacje arytmetyczne    | Manticore, Echidna          | [Ćwiczenie 1 Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Ćwiczenia 1-3 Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)        |
| Poprawność dziedziczenia | Slither                     | [Ćwiczenie 1 Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                          |
| Interakcje zewnętrzne    | Manticore, Echidna          |                                                                                                                                                                                                                                                                                 |
| Zgodność ze standardem   | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                         |

Inne obszary będą wymagały sprawdzenia w zależności od Twoich celów, ale te ogólne obszary zainteresowania są dobrym punktem wyjścia dla każdego systemu inteligentnych kontraktów.

Nasze publiczne audyty zawierają przykłady zweryfikowanych lub przetestowanych właściwości. Rozważ przeczytanie sekcji `Automated Testing and Verification` w poniższych raportach, aby przejrzeć rzeczywiste właściwości bezpieczeństwa:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
