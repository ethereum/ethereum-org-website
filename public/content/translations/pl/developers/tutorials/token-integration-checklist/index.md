---
title: "Lista kontrolna integracji tokenów"
description: "Lista kontrolna rzeczy do rozważenia podczas interakcji z tokenami"
author: "Trailofbits"
lang: pl
tags:
  [
    "solidity",
    "smart kontrakty",
    "bezpieczeństwo",
    "tokeny"
  ]
skill: intermediate
published: 2020-08-13
source: "Tworzenie bezpiecznych kontraktów"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Postępuj zgodnie z tą listą kontrolną podczas interakcji z dowolnymi tokenami. Upewnij się, że rozumiesz ryzyko związane z każdym elementem i uzasadnij wszelkie wyjątki od tych zasad.

Dla wygody wszystkie [narzędzia](https://github.com/crytic/slither#tools) Slithera można uruchomić bezpośrednio na adresie tokena, na przykład:

[Samouczek korzystania ze Slithera](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Aby postępować zgodnie z tą listą kontrolną, potrzebne będą dane wyjściowe ze Slither dla danego tokena:

```bash
- slither-check-erc [target] [contractName] [opcjonalnie: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # wymaga konfiguracji oraz użycia Echidna i Manticore
```

## Ogólne uwagi {#general-considerations}

- **Kontrakt przeszedł audyt bezpieczeństwa.** Unikaj interakcji z kontraktami, które nie przeszły audytu bezpieczeństwa. Sprawdź długość oceny (tzw. „poziom włożonego wysiłku”), reputację firmy przeprowadzającej audyt bezpieczeństwa oraz liczbę i wagę wykrytych problemów.
- **Nawiązano kontakt z deweloperami.** Być może będziesz musiał(a) powiadomić ich zespół o incydencie. Poszukaj odpowiednich kontaktów w [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Posiadają listę mailingową dotyczącą bezpieczeństwa dla krytycznych ogłoszeń.** Ich zespół powinien informować użytkowników (takich jak Ty!) o wykryciu krytycznych problemów lub o wprowadzeniu uaktualnień.

## Zgodność z ERC {#erc-conformity}

Slither zawiera narzędzie, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), które sprawdza zgodność tokena z wieloma powiązanymi standardami ERC. Użyj slither-check-erc, aby sprawdzić, czy:

- **Funkcje transfer i transferFrom zwracają wartość logiczną (boolean).** Niektóre tokeny nie zwracają wartości logicznej w tych funkcjach. W rezultacie ich wywołania w kontrakcie mogą zakończyć się niepowodzeniem.
- **Funkcje name, decimals i symbol są obecne, jeśli są używane.** Funkcje te są opcjonalne w standardzie ERC20 i mogą nie być zaimplementowane.
- **Funkcja decimals zwraca uint8.** Niektóre tokeny nieprawidłowo zwracają uint256. W takim przypadku upewnij się, że zwracana wartość jest niższa niż 255.
- **Token łagodzi znany [problem „race condition” w ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC20 ma znany problem „race condition”, który musi być zaadresowany, aby uniemożliwić atakującym kradzież tokenów.
- **Token nie jest tokenem ERC777 i nie ma zewnętrznego wywołania funkcji w transfer i transferFrom.** Zewnętrzne wywołania w funkcjach transferu mogą prowadzić do reentrancy.

Slither zawiera narzędzie [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), które generuje testy jednostkowe i właściwości bezpieczeństwa, które mogą wykryć wiele typowych wad w standardzie ERC. Użyj slither-prop, aby sprawdzić, czy:

- **Kontrakt przechodzi wszystkie testy jednostkowe i weryfikacje właściwości bezpieczeństwa z slither-prop.** Uruchom wygenerowane testy jednostkowe, a następnie sprawdź właściwości za pomocą [Echidna](https://github.com/crytic/echidna) i [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Istnieją również pewne cechy, które trudno jest zidentyfikować automatycznie. Sprawdź ręcznie następujące warunki:

- **Funkcje transfer i transferFrom nie powinny pobierać opłaty.** Tokeny deflacyjne mogą prowadzić do nieoczekiwanego zachowania.
- **Potencjalne odsetki uzyskane z tokena są brane pod uwagę.** Niektóre tokeny rozdzielają odsetki pomiędzy posiadaczy tokenów. Te odsetki mogą zostać uwięzione w kontrakcie, jeśli nie zostaną uwzględnione.

## Kompozycja kontraktu {#contract-composition}

- **Kontrakt unika niepotrzebnej złożoności.** Token powinien być prostym kontraktem; token ze złożonym kodem wymaga wyższego standardu weryfikacji. Użyj narzędzia Slithera [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary), aby zidentyfikować złożony kod.
- **Kontrakt używa SafeMath.** Kontrakty, które nie używają SafeMath, wymagają wyższego standardu weryfikacji. Sprawdź ręcznie użycie SafeMath w kontrakcie.
- **Kontrakt ma tylko kilka funkcji niezwiązanych z tokenem.** Funkcje niezwiązane z tokenem zwiększają prawdopodobieństwo wystąpienia problemu w kontrakcie. Użyj narzędzia Slithera [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary), aby ogólnie przejrzeć kod użyty w kontrakcie.
- **Token ma tylko jeden adres.** Tokeny z wieloma punktami wejścia dla aktualizacji salda mogą zakłócić wewnętrzną księgowość opartą na adresie (np. `balances[token_address][msg.sender]` może nie odzwierciedlać rzeczywistego salda).

## Uprawnienia właściciela {#owner-privileges}

- **Token nie jest aktualizowalny.** Kontrakty aktualizowalne mogą z czasem zmieniać swoje zasady. Użyj narzędzia Slithera [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary), aby ustalić, czy kontrakt jest aktualizowalny.
- **Właściciel ma ograniczone możliwości mintingu (wybijania).** Złośliwi lub przejęci właściciele mogą nadużywać tych możliwości. Użyj narzędzia Slithera [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary), aby przejrzeć możliwości mintingu (wybijania) i rozważ ręczne przejrzenie kodu.
- **Token nie jest wstrzymywalny.** Złośliwi lub przejęci właściciele mogą zablokować kontrakty opierające się na wstrzymywalnych tokenach. Zidentyfikuj ręcznie kod umożliwiający wstrzymanie.
- **Właściciel nie może umieścić kontraktu na czarnej liście.** Złośliwi lub przejęci właściciele mogą zablokować kontrakty opierające się na tokenach z czarną listą. Zidentyfikuj ręcznie funkcje czarnej listy.
- **Zespół stojący za tokenem jest znany i może zostać pociągnięty do odpowiedzialności za nadużycia.** Kontrakty z anonimowymi zespołami deweloperskimi lub te, które znajdują się w rajach prawnych, powinny wymagać wyższego standardu weryfikacji.

## Rzadkość tokena {#token-scarcity}

Weryfikacja problemów związanych z rzadkością tokenów wymaga ręcznego sprawdzenia. Sprawdź następujące warunki:

- **Żaden użytkownik nie posiada większości podaży.** Jeśli kilku użytkowników posiada większość tokenów, mogą oni wpływać na operacje w zależności od podziału tokena.
- **Całkowita podaż jest wystarczająca.** Tokenami o niskiej całkowitej podaży można łatwo manipulować.
- **Tokeny znajdują się na więcej niż kilku giełdach.** Jeśli wszystkie tokeny znajdują się na jednej giełdzie, przejęcie kontroli nad tą giełdą może zagrozić kontraktowi opierającemu się na tym tokenie.
- **Użytkownicy rozumieją ryzyko związane z dużymi funduszami lub pożyczkami błyskawicznymi (flash loans).** Kontrakty opierające się na saldzie tokenów muszą starannie uwzględniać atakujących z dużymi funduszami lub ataki za pośrednictwem pożyczek błyskawicznych.
- **Token nie pozwala na błyskawiczny minting (flash minting)**. Błyskawiczny minting może prowadzić do znacznych wahań salda i całkowitej podaży, co wymaga ścisłych i kompleksowych kontroli przepełnienia (overflow) w działaniu tokena.
