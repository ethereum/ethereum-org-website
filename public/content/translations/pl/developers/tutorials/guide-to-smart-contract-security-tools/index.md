---
title: "Przewodnik po narzędziach bezpieczeństwa inteligentnych kontraktów"
description: "Przegląd trzech różnych technik testowania i analizy programów"
author: "Trailofbits"
lang: pl
tags: ["Solidity", "inteligentne kontrakty", "bezpieczeństwo"]
skill: intermediate
breadcrumb: "Narzędzia bezpieczeństwa"
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Zamierzamy użyć trzech charakterystycznych technik testowania i analizy programów:

- **Analiza statyczna za pomocą narzędzia [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Wszystkie ścieżki programu są aproksymowane i analizowane jednocześnie, poprzez różne reprezentacje programu (np. graf przepływu sterowania).
- **Fuzzing za pomocą [Echidny](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kod jest wykonywany z pseudolosowym generowaniem transakcji. Fuzzer spróbuje znaleźć sekwencję transakcji naruszającą daną właściwość.
- **Wykonywanie symboliczne za pomocą [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Technika weryfikacji formalnej, która tłumaczy każdą ścieżkę wykonania na wzór matematyczny, na którym można następnie sprawdzać ograniczenia.

Każda technika ma swoje zalety i wady, i będzie przydatna w [określonych przypadkach](#determining-security-properties):

| Technika | Narzędzie | Zastosowanie | Szybkość | Pominięte błędy | Fałszywe alarmy |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Analiza statyczna | Slither | CLI i skrypty | sekundy | umiarkowane | niskie |
| Fuzzing | Echidna | Właściwości Solidity | minuty | niskie | brak |
| Wykonywanie symboliczne | Manticore | Właściwości Solidity i skrypty | godziny | brak\* | brak |

\* jeśli wszystkie ścieżki zostaną zbadane bez przekroczenia limitu czasu (timeout)

**Slither** analizuje kontrakty w ciągu kilku sekund, jednak analiza statyczna może prowadzić do fałszywych alarmów i będzie mniej odpowiednia do złożonych weryfikacji (np. sprawdzeń arytmetycznych). Uruchom Slithera przez API, aby uzyskać natychmiastowy dostęp do wbudowanych detektorów, lub przez API dla sprawdzeń zdefiniowanych przez użytkownika.

**Echidna** wymaga działania przez kilka minut i generuje tylko prawdziwie pozytywne wyniki. Echidna sprawdza dostarczone przez użytkownika właściwości bezpieczeństwa, napisane w Solidity. Może pominąć błędy, ponieważ opiera się na losowej eksploracji.

**Manticore** przeprowadza „najcięższą” analizę. Podobnie jak Echidna, Manticore weryfikuje właściwości dostarczone przez użytkownika. Będzie potrzebować więcej czasu na działanie, ale może udowodnić poprawność właściwości i nie zgłosi fałszywych alarmów.

## Sugerowany przepływ pracy {#suggested-workflow}

Zacznij od wbudowanych detektorów Slithera, aby upewnić się, że żadne proste błędy nie są obecne teraz ani nie zostaną wprowadzone później. Użyj Slithera do sprawdzenia właściwości związanych z dziedziczeniem, zależnościami zmiennych i problemami strukturalnymi. W miarę rozrastania się bazy kodu, użyj Echidny do testowania bardziej złożonych właściwości maszyny stanu. Wróć do Slithera, aby opracować niestandardowe sprawdzenia dla zabezpieczeń niedostępnych w Solidity, takich jak ochrona przed nadpisaniem funkcji. Na koniec użyj Manticore do przeprowadzenia ukierunkowanej weryfikacji krytycznych właściwości bezpieczeństwa, np. operacji arytmetycznych.

- Użyj CLI Slithera, aby wychwycić typowe problemy
- Użyj Echidny do testowania wysokopoziomowych właściwości bezpieczeństwa Twojego kontraktu
- Użyj Slithera do pisania niestandardowych sprawdzeń statycznych
- Użyj Manticore, gdy potrzebujesz dogłębnej pewności co do krytycznych właściwości bezpieczeństwa

**Uwaga na temat testów jednostkowych**. Testy jednostkowe są niezbędne do tworzenia oprogramowania wysokiej jakości. Jednak te techniki nie są najlepiej przystosowane do znajdowania luk w zabezpieczeniach. Zazwyczaj służą do testowania pozytywnych zachowań kodu (tj. kod działa zgodnie z oczekiwaniami w normalnym kontekście), podczas gdy luki w zabezpieczeniach zwykle kryją się w przypadkach brzegowych, których programiści nie wzięli pod uwagę. W naszym badaniu kilkudziesięciu przeglądów bezpieczeństwa inteligentnych kontraktów, [pokrycie testami jednostkowymi nie miało wpływu na liczbę ani wagę luk w zabezpieczeniach](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/), które znaleźliśmy w kodzie naszych klientów.

## Określanie właściwości bezpieczeństwa {#determining-security-properties}

Aby skutecznie testować i weryfikować swój kod, musisz zidentyfikować obszary wymagające uwagi. Ponieważ zasoby przeznaczone na bezpieczeństwo są ograniczone, określenie zakresu słabych lub bardzo wartościowych części bazy kodu jest ważne dla optymalizacji wysiłków. Modelowanie zagrożeń może w tym pomóc. Rozważ zapoznanie się z:

- [Szybką oceną ryzyka (Rapid Risk Assessments)](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nasze preferowane podejście, gdy brakuje czasu)
- [Przewodnikiem po modelowaniu zagrożeń systemów zorientowanych na dane](https://csrc.nist.gov/pubs/sp/800/154/ipd) (znanym jako NIST 800-154)
- [Modelowaniem zagrożeń według Shostacka](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Wykorzystaniem asercji](https://blog.regehr.org/archives/1091)

### Komponenty {#components}

Wiedza o tym, co chcesz sprawdzić, pomoże Ci również w wyborze odpowiedniego narzędzia.

Szerokie obszary, które są często istotne dla inteligentnych kontraktów, obejmują:

- **Maszyna stanu.** Większość kontraktów można przedstawić jako maszynę stanu. Rozważ sprawdzenie, czy (1) nie można osiągnąć żadnego nieprawidłowego stanu, (2) jeśli stan jest prawidłowy, to można go osiągnąć, oraz (3) żaden stan nie blokuje kontraktu w pułapce.

  - Echidna i Manticore to narzędzia, które warto preferować do testowania specyfikacji maszyny stanu.

- **Kontrola dostępu.** Jeśli Twój system ma uprzywilejowanych użytkowników (np. właściciela, kontrolerów...), musisz upewnić się, że (1) każdy użytkownik może wykonywać tylko autoryzowane akcje i (2) żaden użytkownik nie może blokować akcji bardziej uprzywilejowanego użytkownika.

  - Slither, Echidna i Manticore mogą sprawdzać poprawność kontroli dostępu. Na przykład Slither może sprawdzić, czy tylko funkcje z białej listy nie mają modyfikatora onlyOwner. Echidna i Manticore są przydatne do bardziej złożonej kontroli dostępu, takiej jak uprawnienie nadawane tylko wtedy, gdy kontrakt osiągnie dany stan.

- **Operacje arytmetyczne.** Sprawdzanie poprawności operacji arytmetycznych jest krytyczne. Używanie `SafeMath` wszędzie to dobry krok, aby zapobiec przepełnieniu/niedomiarowi (overflow/underflow), jednak nadal musisz wziąć pod uwagę inne błędy arytmetyczne, w tym problemy z zaokrąglaniem i błędy, które blokują kontrakt.

  - Manticore jest tutaj najlepszym wyborem. Echidny można użyć, jeśli arytmetyka wykracza poza zakres solwera SMT.

- **Poprawność dziedziczenia.** Kontrakty w Solidity w dużym stopniu opierają się na wielokrotnym dziedziczeniu. Błędy takie jak przysłaniająca funkcja bez wywołania `super` i błędnie zinterpretowana kolejność linearyzacji C3 mogą zostać łatwo wprowadzone.

  - Slither to narzędzie zapewniające wykrywanie tych problemów.

- **Interakcje zewnętrzne.** Kontrakty wchodzą ze sobą w interakcje, a niektórym zewnętrznym kontraktom nie należy ufać. Na przykład, jeśli Twój kontrakt opiera się na zewnętrznych wyroczniach (oracles), czy pozostanie bezpieczny, jeśli połowa dostępnych wyroczni zostanie skompromitowana?

  - Manticore i Echidna to najlepszy wybór do testowania zewnętrznych interakcji z Twoimi kontraktami. Manticore ma wbudowany mechanizm do tworzenia zaślepek (stub) zewnętrznych kontraktów.

- **Zgodność ze standardami.** Standardy Ethereum (np. ERC-20) mają historię błędów w swoim projekcie. Bądź świadomy ograniczeń standardu, na którym budujesz.
  - Slither, Echidna i Manticore pomogą Ci wykryć odstępstwa od danego standardu.

### Ściągawka wyboru narzędzi {#tool-selection-cheatsheet}

| Komponent | Narzędzia | Przykłady |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Maszyna stanu | Echidna, Manticore |
| Kontrola dostępu | Slither, Echidna, Manticore | [Ćwiczenie 2 ze Slitherem](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Ćwiczenie 2 z Echidną](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operacje arytmetyczne | Manticore, Echidna | [Ćwiczenie 1 z Echidną](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Ćwiczenia 1 - 3 z Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Poprawność dziedziczenia | Slither | [Ćwiczenie 1 ze Slitherem](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Interakcje zewnętrzne | Manticore, Echidna |
| Zgodność ze standardami | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Inne obszary będą wymagały sprawdzenia w zależności od Twoich celów, ale te ogólne obszary skupienia są dobrym początkiem dla każdego systemu inteligentnych kontraktów.

Nasze publiczne audyty zawierają przykłady zweryfikowanych lub przetestowanych właściwości. Rozważ przeczytanie sekcji `Automated Testing and Verification` w poniższych raportach, aby zapoznać się z rzeczywistymi właściwościami bezpieczeństwa:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)