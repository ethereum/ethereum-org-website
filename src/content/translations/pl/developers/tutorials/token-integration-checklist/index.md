---
title: Lista kontrolna integracji tokenów
description: Lista kontrolna rzeczy do rozważenia podczas interakcji z tokenami
author: "Trailofbits"
lang: pl
tags:
  - "solidity"
  - "inteligentne kontrakty"
  - "ochrona"
  - "tokeny"
skill: intermediate
published: 2020-08-13
source: Tworzenie bezpiecznych kontraktów
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Postępuj zgodnie z tą listą kontrolną podczas interakcji z dowolnymi tokenami. Upewnij się, że rozumiesz ryzyko związane z każdym produktem i uzasadnij wszelkie wyjątki od tych zasad.

Dla wygody wszystkie [narzędzia](https://github.com/crytic/slither#tools) Slithera można uruchomić bezpośrednio na adresie tokena, takim jak:

[Korzystanie z samouczka Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Aby postępować zgodnie z tą listą kontrolną, będziesz chciał uzyskać dane wyjściowe ze Slither dla tokena:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## Uwagi ogólne {#general-considerations}

- **Kontrakt obejmuje przegląd bezpieczeństwa.** Unikaj interakcji z umowami, które nie mają przeglądu bezpieczeństwa. Sprawdź długość oceny (inaczej „poziom nakładu pracy”), reputację firmy zabezpieczającej oraz liczbę i wagę ustaleń.
- **Skontaktowałeś się z programistami.** Może być konieczne powiadomienie ich zespołu o incydencie. Poszukaj odpowiednich kontaktów na [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mają listę dyskusyjną dotyczącą bezpieczeństwa dla krytycznych ogłoszeń.** Ich zespół powinien informować użytkowników (takich jak Ty!) w przypadku wykrycia krytycznych problemów lub aktualizacji.

## Zgodność ERC {#erc-conformity}

Slither zawiera narzędzie [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), które sprawdza zgodność tokenu z wieloma powiązanymi ERC standardami. Użyj slither-check-erc, aby sprawdzić, czy:

- **Transfer i transferFrom zwracają wartość logiczną.** Kilka tokenów nie zwraca wartości logicznych w tych funkcjach. W rezultacie ich połączenia w kontrakcie mogą się nie powieść.
- **Nazwa, miejsca dziesiętne i funkcje symboli są obecne, jeśli są używane.** Te funkcje są opcjonalne w standardzie ERC20 i mogą nie być obecne.
- **Ułamki dziesiętne zwracają uint8.** Kilka tokenów nieprawidłowo zwraca uint256. W takim przypadku należy zapewnić, aby zwrócona wartość była niższa niż 255.
- **Token ogranicza znany [wyścig ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC20 ma znaną sytuację wyścigu ERC20, którą należy ograniczyć, aby uniemożliwić atakującym kradzież tokenów.
- **Token nie jest tokenem ERC777 i nie ma zewnętrznego wywołania w funkcjach transfer i transferFrom.** Wywołania zewnętrzne w funkcjach transferu mogą prowadzić do wielobieżności.

Slither zawiera narzędzie [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), które generuje testy jednostkowe i właściwości bezpieczeństwa, które mogą wykryć wiele popularnych wad ERC. Użyj slither-prop, aby sprawdzić, czy:

- **Kontrakt przekazuje wszystkie testy jednostkowe i właściwości zabezpieczeń z slither-prop.** Uruchom wygenerowane testy jednostkowe, a następnie sprawdź właściwości za pomocą [Echidna](https://github.com/crytic/echidna) i [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Wreszcie istnieją pewne cechy, które trudno zidentyfikować automatycznie. Sprawdź te warunki ręcznie:

- **Transfer i transferFrom nie powinny wiązać się z opłatami.** Tokeny deflacyjne mogą prowadzić do nieoczekiwanego zachowania.
- **Potencjalne odsetki uzyskane z tokena są brane pod uwagę.** Niektóre tokeny rozdzielają odsetki na posiadaczy tokenów. Te odsetki mogą zostać zablokowane w kontrakcie, jeśli nie zostanie on wzięty pod uwagę.

## Kompozycja kontraktu {#contract-composition}

- **Kontrakt pozwala uniknąć niepotrzebnej złożoności.** Token powinien być prostą umową; token ze złożonym kodem wymaga wyższego standardu weryfikacji. Użyj [drukarki podsumowań ludzkich](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slithera, aby zidentyfikować złożony kod.
- **Kontrakt korzysta z SafeMath.** Kontrakty, które nie korzystają z SafeMath, wymagają wyższego standardu weryfikacji. Sprawdź umowę ręcznie pod kątem użycia SafeMath.
- **Kontrakt ma tylko kilka funkcji niezwiązanych z tokenem.** Funkcje niezwiązane z tokenem zwiększają prawdopodobieństwo wystąpienia problemu w kontrakcie. Skorzystaj z [drukarki podsumowań kontraktów](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slithera, aby ogólnie zapoznać się z kodem użytym w kontrakcie.
- **Token ma tylko jeden adres.** Tokeny z wieloma punktami wejścia do aktualizacji salda mogą zepsuć wewnętrzną księgowość na podstawie adresu (np. `balances[token_address][msg.sender]` może nie odzwierciedlać faktycznego salda).

## Uprawnienia właściciela {#owner-privileges}

- **Tokenu nie można uaktualnić.** Umowy z możliwością uaktualnienia mogą z czasem zmienić swoje zasady. Użyj [drukarki podsumowania ludzkiego](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slithera, aby określić, czy kontrakt można uaktualnić.
- **Właściciel ma ograniczone możliwości bicia tokenów.** Złośliwi lub nieuczciwi właściciele mogą nadużywać możliwości bicia tokenów. Użyj [drukarki podsumowania ludzkiego](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slithera, aby przejrzeć możliwości wybijania tokenów i rozważ ręczne przejrzenie kodu.
- **Token nie można wstrzymywać.** Złośliwi lub nieuczciwi właściciele mogą blokować umowy oparte na tokenach, które można wstrzymywać. Zidentyfikuj ręcznie kod, który można wstrzymać.
- **Właściciel nie może umieścić kontraktu na czarnej liście.** Złośliwi lub nieuczciwi właściciele mogą za pomocą czarnej listy blokować umowy oparte na tokenach Ręczne identyfikowanie funkcji czarnej listy.
- **Zespół odpowiedzialny za token jest znany i może zostać pociągnięty do odpowiedzialności za nadużycia.** Umowy z anonimowymi zespołami programistów lub przebywającymi w legalnych schroniskach powinny wymagać wyższego standardu weryfikacji.

## Niedobór tokenów {#token-scarcity}

Przeglądy pod kątem problemów związanych z niedoborem tokenów wymagają ręcznego sprawdzenia. Sprawdź te warunki:

- **Żaden użytkownik nie jest właścicielem większości zasobów.** Jeśli kilku użytkowników posiada większość tokenów, mogą wpływać na operacje na podstawie podziału tokena.
- **Całkowita podaż jest wystarczająca.** Tokenami o niskiej łącznej podaży można łatwo manipulować.
- **Tokeny znajdują się na więcej niż kilku giełdach.** Jeśli wszystkie tokeny znajdują się na jednej giełdzie, kompromis giełdy może naruszyć kontrakt polegający na tokenie.
- **Użytkownicy rozumieją ryzyko związane z dużymi funduszami lub błyskawicznymi pożyczkami.** Kontrakty opierające się na saldzie tokenów muszą uwzględniać osoby atakujące z dużymi funduszami lub ataki za pośrednictwem błyskawicznych pożyczek.
- **Token nie pozwala na błyskawiczne wybijanie**. Błyskawiczne wybijanie może prowadzić do znacznych wahań salda i całkowitej podaży, co wymaga ścisłych i kompleksowych kontroli przepełnienia w działaniu tokena.
