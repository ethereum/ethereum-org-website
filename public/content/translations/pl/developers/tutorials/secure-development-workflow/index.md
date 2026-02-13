---
title: "Lista kontrolna bezpieczeństwa inteligentnych kontraktów"
description: "Sugerowany przepływ pracy do pisania bezpiecznych inteligentnych kontraktów"
author: "Trailofbits"
tags: [ "smart kontrakty", "bezpieczeństwo", "solidity" ]
skill: intermediate
lang: pl
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista kontrolna tworzenia inteligentnych kontraktów {#smart-contract-development-checklist}

Oto ogólny proces, który zalecamy stosować podczas pisania inteligentnych kontraktów.

Sprawdź, czy nie występują znane problemy z bezpieczeństwem:

- Sprawdź swoje kontrakty za pomocą [Slither](https://github.com/crytic/slither). Ma ponad 40 wbudowanych detektorów dla popularnych luk w zabezpieczeniach. Uruchamiaj go przy każdym zatwierdzeniu nowego kodu i upewnij się, że generuje czysty raport (lub użyj trybu triage, aby wyciszyć niektóre problemy).
- Sprawdź swoje kontrakty za pomocą [Crytic](https://crytic.io/). Sprawdza 50 problemów, których Slither nie wykrywa. Crytic może również pomóc Twojemu zespołowi w bieżącej kontroli, łatwo ujawniając problemy z bezpieczeństwem w żądaniach Pull Request na GitHub.

Rozważ specjalne cechy swojego kontraktu:

- Czy Twoje kontrakty można aktualizować? Sprawdź swój kod pod kątem błędów w możliwości aktualizacji za pomocą [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) lub [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Udokumentowaliśmy 17 sposobów, w jakie aktualizacje mogą pójść nie tak.
- Czy Twoje kontrakty mają być zgodne z ERC? Sprawdź je za pomocą [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). To narzędzie natychmiast identyfikuje odchylenia od sześciu popularnych specyfikacji.
- Czy integrujesz się z tokenami stron trzecich? Zapoznaj się z naszą [listą kontrolną integracji tokenów](/developers/tutorials/token-integration-checklist/) zanim zaczniesz polegać na zewnętrznych kontraktach.

Sprawdź wizualnie krytyczne funkcje bezpieczeństwa swojego kodu:

- Przejrzyj narzędzie Slithera [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph). Unikaj niezamierzonego przesłaniania (shadowing) i problemów z linearyzacją C3.
- Przejrzyj narzędzie Slithera [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary). Raportuje widoczność funkcji i kontrolę dostępu.
- Przejrzyj narzędzie Slithera [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization). Raportuje kontrolę dostępu do zmiennych stanu.

Udokumentuj krytyczne właściwości bezpieczeństwa i użyj automatycznych generatorów testów, aby je ocenić:

- Naucz się [dokumentować właściwości bezpieczeństwa swojego kodu](/developers/tutorials/guide-to-smart-contract-security-tools/). Na początku jest to trudne, ale jest to najważniejsza czynność dla osiągnięcia dobrego wyniku. Jest to również warunek wstępny do użycia którejkolwiek z zaawansowanych technik w tym samouczku.
- Zdefiniuj właściwości bezpieczeństwa w Solidity, do użytku z [Echidna](https://github.com/crytic/echidna) i [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Skup się na swojej maszynie stanu, kontroli dostępu, operacjach arytmetycznych, interakcjach zewnętrznych i zgodności ze standardami.
- Zdefiniuj właściwości bezpieczeństwa za pomocą [API Pythona Slithera](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Skup się na dziedziczeniu, zależnościach zmiennych, kontroli dostępu i innych problemach strukturalnych.
- Uruchamiaj testy właściwości przy każdym zatwierdzeniu (commit) za pomocą [Crytic](https://crytic.io). Crytic może wykorzystywać i oceniać testy właściwości bezpieczeństwa, dzięki czemu każdy w Twoim zespole może łatwo zobaczyć na GitHubie, że zostały one zaliczone. Niezaliczone testy mogą blokować zatwierdzenia (commit).

Na koniec pamiętaj o problemach, których zautomatyzowane narzędzia nie mogą łatwo znaleźć:

- Brak prywatności: wszyscy inni mogą zobaczyć Twoje transakcje, gdy są w kolejce w puli
- Wykonywanie transakcji z wyprzedzeniem (front-running)
- Operacje kryptograficzne
- Ryzykowne interakcje z zewnętrznymi komponentami DeFi

## Poproś o pomoc {#ask-for-help}

[Godziny konsultacji Ethereum](https://calendly.com/dan-trailofbits/office-hours) odbywają się w każdy wtorek po południu. Te godzinne, indywidualne sesje są okazją, aby zadać nam wszelkie pytania dotyczące bezpieczeństwa, rozwiązać problemy z użyciem naszych narzędzi i uzyskać opinie ekspertów na temat Twojego obecnego podejścia. Pomożemy Ci przejść przez ten przewodnik.

Dołącz do naszego Slacka: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Jesteśmy zawsze dostępni na kanałach #crytic i #ethereum, jeśli masz jakieś pytania.
