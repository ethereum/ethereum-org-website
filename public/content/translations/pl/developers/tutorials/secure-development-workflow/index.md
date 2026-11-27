---
title: "Lista kontrolna bezpieczeństwa inteligentnych kontraktów"
description: "Sugerowany przepływ pracy przy pisaniu bezpiecznych inteligentnych kontraktów"
author: "Trailofbits"
tags: ["inteligentne kontrakty", "bezpieczeństwo", "Solidity"]
skill: intermediate
breadcrumb: "Lista kontrolna bezpieczeństwa"
lang: pl
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista kontrolna tworzenia inteligentnych kontraktów {#smart-contract-development-checklist}

Oto ogólny proces, który zalecamy stosować podczas pisania inteligentnych kontraktów.

Sprawdź znane problemy z bezpieczeństwem:

- Przeanalizuj swoje kontrakty za pomocą narzędzia [Slither](https://github.com/crytic/slither). Posiada ono ponad 100 wbudowanych detektorów typowych luk w zabezpieczeniach. Uruchamiaj je przy każdym zatwierdzeniu nowego kodu i upewnij się, że raport nie wykazuje błędów (lub użyj trybu selekcji, aby wyciszyć niektóre problemy).
- Uruchamiaj Slither w CI, na przykład za pomocą [slither-action](https://github.com/crytic/slither-action) na GitHubie, aby problemy z bezpieczeństwem pojawiały się w pull requestach.

Weź pod uwagę specjalne funkcje swojego kontraktu:

- Czy Twoje kontrakty można aktualizować? Przeanalizuj kod odpowiedzialny za aktualizacje pod kątem błędów za pomocą [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks). Udokumentowaliśmy 17 sposobów, w jakie aktualizacje mogą pójść nie tak.
- Czy Twoje kontrakty mają być zgodne ze standardami ERC? Sprawdź je za pomocą [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). To narzędzie natychmiast identyfikuje odstępstwa od sześciu popularnych specyfikacji.
- Czy integrujesz się z tokenami stron trzecich? Zapoznaj się z naszą [listą kontrolną integracji tokenów](/developers/tutorials/token-integration-checklist/), zanim zaczniesz polegać na zewnętrznych kontraktach.

Wizualnie sprawdź krytyczne funkcje bezpieczeństwa swojego kodu:

- Przejrzyj narzędzie drukujące [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) w Slither. Unikaj niezamierzonego przesłaniania (shadowing) i problemów z linearyzacją C3.
- Przejrzyj narzędzie drukujące [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) w Slither. Raportuje ono widoczność funkcji i kontrole dostępu.
- Przejrzyj narzędzie drukujące [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) w Slither. Raportuje ono kontrole dostępu do zmiennych stanu.

Udokumentuj krytyczne właściwości bezpieczeństwa i użyj zautomatyzowanych generatorów testów do ich oceny:

- Naucz się [dokumentować właściwości bezpieczeństwa dla swojego kodu](/developers/tutorials/guide-to-smart-contract-security-tools/). Na początku jest to trudne, ale to najważniejsza czynność pozwalająca osiągnąć dobry rezultat. Jest to również warunek wstępny do korzystania z jakichkolwiek zaawansowanych technik opisanych w tym samouczku.
- Zdefiniuj właściwości bezpieczeństwa w języku Solidity, do użytku z fuzzerami takimi jak [Echidna](https://github.com/crytic/echidna) i [Medusa](https://github.com/crytic/medusa), oraz z narzędziami do wykonywania symbolicznego, takimi jak [hevm](https://hevm.dev/). Skup się na swojej maszynie stanu, kontrolach dostępu, operacjach arytmetycznych, interakcjach zewnętrznych i zgodności ze standardami.
- Zdefiniuj właściwości bezpieczeństwa za pomocą [API języka Python w Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Skup się na dziedziczeniu, zależnościach zmiennych, kontrolach dostępu i innych kwestiach strukturalnych.
- Uruchamiaj testy właściwości przy każdym commicie w CI (na przykład w GitHub Actions), aby każdy w Twoim zespole mógł łatwo zobaczyć, że kończą się one powodzeniem. Nieudane testy mogą blokować scalanie (merge).

Na koniec pamiętaj o problemach, których zautomatyzowane narzędzia nie mogą łatwo znaleźć:

- Brak prywatności: wszyscy inni mogą zobaczyć Twoje transakcje, gdy są one w kolejce w puli
- Transakcje typu front-running
- Operacje kryptograficzne
- Ryzykowne interakcje z zewnętrznymi komponentami zdecentralizowanych finansów (DeFi)

## Poproś o pomoc {#ask-for-help}

[Godziny konsultacji Ethereum](https://meetings.hubspot.com/trailofbits/office-hours) odbywają się w każde wtorkowe popołudnie. Te godzinne sesje jeden na jeden to okazja, aby zadać nam wszelkie pytania dotyczące bezpieczeństwa, rozwiązać problemy za pomocą naszych narzędzi i uzyskać od ekspertów opinie na temat Twojego obecnego podejścia. Pomożemy Ci przejść przez ten przewodnik.

Dołącz do naszego Slacka: [Empire Hacking](https://slack.empirehacking.nyc/). Jesteśmy zawsze dostępni na kanałach #crytic i #ethereum, jeśli masz jakiekolwiek pytania.
