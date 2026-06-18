---
title: Lista kontrolna integracji tokenów
description: Lista kontrolna rzeczy do rozważenia podczas interakcji z tokenami
author: "Trailofbits"
lang: pl
tags: ["solidity", "inteligentne kontrakty", "bezpieczeństwo", "tokeny"]
skill: intermediate
breadcrumb: Integracja tokenów
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Postępuj zgodnie z tą listą kontrolną podczas interakcji z dowolnymi tokenami. Upewnij się, że rozumiesz ryzyko związane z każdym punktem i uzasadnij wszelkie wyjątki od tych reguł.

Dla wygody wszystkie [narzędzia](https://github.com/crytic/slither#tools) Slither można uruchomić bezpośrednio na adresie tokena, na przykład:

[Samouczek korzystania ze Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Aby postępować zgodnie z tą listą kontrolną, będziesz potrzebować następujących danych wyjściowych ze Slither dla tokena:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # wymaga konfiguracji oraz użycia Echidny i Manticore
```

## Kwestie ogólne {#general-considerations}

- **Kontrakt przeszedł audyt bezpieczeństwa.** Unikaj interakcji z kontraktami, które nie mają audytu bezpieczeństwa. Sprawdź długość oceny (tzw. „poziom wysiłku”), reputację firmy zajmującej się bezpieczeństwem oraz liczbę i wagę wykrytych problemów.
- **Skontaktowałeś się z programistami.** Możesz potrzebować powiadomić ich zespół o incydencie. Poszukaj odpowiednich kontaktów na [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mają listę mailingową dotyczącą bezpieczeństwa dla krytycznych ogłoszeń.** Ich zespół powinien informować użytkowników (takich jak Ty!), gdy zostaną znalezione krytyczne problemy lub gdy nastąpią aktualizacje.

## Zgodność z ERC {#erc-conformity}

Slither zawiera narzędzie [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), które sprawdza zgodność tokena z wieloma powiązanymi standardami ERC. Użyj slither-check-erc, aby sprawdzić, czy:

- **Funkcje transfer i transferFrom zwracają wartość logiczną (boolean).** Wiele tokenów nie zwraca wartości logicznej w tych funkcjach. W rezultacie ich wywołania w kontrakcie mogą się nie powieść.
- **Funkcje name, decimals i symbol są obecne, jeśli są używane.** Te funkcje są opcjonalne w standardzie ERC-20 i mogą nie być obecne.
- **Funkcja decimals zwraca uint8.** Wiele tokenów nieprawidłowo zwraca uint256. Jeśli tak jest, upewnij się, że zwracana wartość jest mniejsza niż 255.
- **Token łagodzi znany [wyścig (race condition) w ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC-20 ma znany problem wyścigu, który musi zostać złagodzony, aby zapobiec kradzieży tokenów przez atakujących.
- **Token nie jest tokenem ERC-777 i nie ma wywołań funkcji zewnętrznych w transfer i transferFrom.** Zewnętrzne wywołania w funkcjach transferu mogą prowadzić do ataków typu reentrancy.

Slither zawiera narzędzie [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), które generuje testy jednostkowe i właściwości bezpieczeństwa mogące odkryć wiele typowych błędów ERC. Użyj slither-prop, aby sprawdzić, czy:

- **Kontrakt przechodzi wszystkie testy jednostkowe i właściwości bezpieczeństwa ze slither-prop.** Uruchom wygenerowane testy jednostkowe, a następnie sprawdź właściwości za pomocą [Echidna](https://github.com/crytic/echidna) i [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Wreszcie, istnieją pewne cechy, które trudno zidentyfikować automatycznie. Sprawdź te warunki ręcznie:

- **Funkcje transfer i transferFrom nie powinny pobierać opłaty.** Tokeny deflacyjne mogą prowadzić do nieoczekiwanego zachowania.
- **Potencjalne odsetki zarobione z tokena są brane pod uwagę.** Niektóre tokeny dystrybuują odsetki do posiadaczy tokenów. Odsetki te mogą zostać uwięzione w kontrakcie, jeśli nie zostaną wzięte pod uwagę.

## Kompozycja kontraktu {#contract-composition}

- **Kontrakt unika niepotrzebnej złożoności.** Token powinien być prostym kontraktem; token ze złożonym kodem wymaga wyższego standardu przeglądu. Użyj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) w Slither, aby zidentyfikować złożony kod.
- **Kontrakt używa SafeMath.** Kontrakty, które nie używają SafeMath, wymagają wyższego standardu przeglądu. Ręcznie sprawdź kontrakt pod kątem użycia SafeMath.
- **Kontrakt ma tylko kilka funkcji niezwiązanych z tokenem.** Funkcje niezwiązane z tokenem zwiększają prawdopodobieństwo wystąpienia problemu w kontrakcie. Użyj [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) w Slither, aby ogólnie przejrzeć kod użyty w kontrakcie.
- **Token ma tylko jeden adres.** Tokeny z wieloma punktami wejścia do aktualizacji salda mogą zepsuć wewnętrzną księgowość opartą na adresie (np. `balances[token_address][msg.sender]` może nie odzwierciedlać rzeczywistego salda).

## Uprawnienia właściciela {#owner-privileges}

- **Token nie jest aktualizowalny (upgradeable).** Aktualizowalne kontrakty mogą z czasem zmieniać swoje zasady. Użyj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) w Slither, aby określić, czy kontrakt można aktualizować.
- **Właściciel ma ograniczone możliwości wybijania.** Złośliwi lub skompromitowani właściciele mogą nadużywać możliwości wybijania. Użyj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) w Slither, aby przejrzeć możliwości wybijania i rozważ ręczne przejrzenie kodu.
- **Token nie ma możliwości wstrzymania (pausable).** Złośliwi lub skompromitowani właściciele mogą uwięzić kontrakty polegające na wstrzymywanych tokenach. Zidentyfikuj ręcznie kod umożliwiający wstrzymanie.
- **Właściciel nie może umieścić kontraktu na czarnej liście.** Złośliwi lub skompromitowani właściciele mogą uwięzić kontrakty polegające na tokenach z czarną listą. Zidentyfikuj ręcznie funkcje czarnej listy.
- **Zespół stojący za tokenem jest znany i może zostać pociągnięty do odpowiedzialności za nadużycia.** Kontrakty z anonimowymi zespołami programistów lub znajdujące się w rajach prawnych powinny wymagać wyższego standardu przeglądu.

## Rzadkość tokena {#token-scarcity}

Przegląd pod kątem problemów z rzadkością tokena wymaga ręcznej weryfikacji. Sprawdź następujące warunki:

- **Żaden użytkownik nie posiada większości podaży.** Jeśli kilku użytkowników posiada większość tokenów, mogą oni wpływać na operacje w oparciu o podział tokena.
- **Całkowita podaż jest wystarczająca.** Tokeny o niskiej całkowitej podaży mogą być łatwo manipulowane.
- **Tokeny znajdują się na więcej niż kilku giełdach.** Jeśli wszystkie tokeny znajdują się na jednej giełdzie, kompromitacja giełdy może skompromitować kontrakt polegający na tym tokenie.
- **Użytkownicy rozumieją powiązane ryzyko związane z dużymi funduszami lub pożyczkami błyskawicznymi (flash loans).** Kontrakty polegające na saldzie tokenów muszą dokładnie brać pod uwagę atakujących dysponujących dużymi funduszami lub ataki za pomocą pożyczek błyskawicznych.
- **Token nie pozwala na błyskawiczne wybijanie (flash minting).** Błyskawiczne wybijanie może prowadzić do znacznych wahań salda i całkowitej podaży, co wymaga rygorystycznych i kompleksowych kontroli pod kątem przepełnienia w działaniu tokena.