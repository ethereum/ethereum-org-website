---
title: "Lista kontrolna integracji tokenów"
description: "Lista kontrolna rzeczy do rozważenia podczas interakcji z tokenami"
author: "Trailofbits"
lang: pl
tags: ["Solidity", "inteligentne kontrakty", "bezpieczeństwo", "tokeny"]
skill: intermediate
breadcrumb: "Integracja tokenów"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Postępuj zgodnie z tą listą kontrolną podczas interakcji z dowolnymi tokenami. Upewnij się, że rozumiesz ryzyko związane z każdym punktem i uzasadnij wszelkie wyjątki od tych reguł.

Dla wygody wszystkie [narzędzia](https://github.com/crytic/slither#tools) Slither można uruchomić bezpośrednio na adresie tokena, na przykład:

[Samouczek korzystania ze Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Pobieranie zweryfikowanego kodu źródłowego z Etherscan wymaga [klucza API Etherscan](https://docs.etherscan.io/set-up-your-api-key) (darmowy klucz wystarczy). Przekaż go za pomocą `--etherscan-apikey` lub ustaw zmienną środowiskową `ETHERSCAN_API_KEY`, którą Slither również odczytuje:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Bez klucza polecenie zakończy się błędem `Invalid etherscan API Key`.

Aby postępować zgodnie z tą listą kontrolną, będziesz potrzebować następujących danych wyjściowych ze Slither dla tokena:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # wymaga konfiguracji i użycia Echidny
```

## Kwestie ogólne {#general-considerations}

- **Kontrakt przeszedł audyt bezpieczeństwa.** Unikaj interakcji z kontraktami, które nie mają audytu bezpieczeństwa. Sprawdź długość oceny (tzw. „poziom wysiłku”), reputację firmy zajmującej się bezpieczeństwem oraz liczbę i wagę wykrytych problemów.
- **Skontaktowałeś się z programistami.** Możesz potrzebować powiadomić ich zespół o incydencie. Poszukaj odpowiednich kontaktów na [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Mają listę mailingową dotyczącą bezpieczeństwa dla krytycznych ogłoszeń.** Ich zespół powinien informować użytkowników (takich jak Ty!), gdy zostaną znalezione krytyczne problemy lub gdy nastąpią aktualizacje.

## Zgodność z ERC {#erc-conformity}

Slither zawiera narzędzie [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), które sprawdza zgodność tokena z wieloma powiązanymi standardami ERC. Użyj slither-check-erc, aby sprawdzić, czy:

- **Transfer i transferFrom zwracają wartość logiczną (boolean).** Wiele tokenów nie zwraca wartości logicznej w tych funkcjach. W rezultacie ich wywołania w kontrakcie mogą się nie powieść.
- **Funkcje name, decimals i symbol są obecne, jeśli są używane.** Te funkcje są opcjonalne w standardzie ERC-20 i mogą nie być obecne.
- **Decimals zwraca uint8.** Wiele tokenów niepoprawnie zwraca uint256. Jeśli tak jest, upewnij się, że zwracana wartość jest mniejsza niż 255.
- **Token łagodzi znany [wyścig (race condition) w ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Standard ERC-20 ma znany błąd wyścigu, który musi zostać złagodzony, aby zapobiec kradzieży tokenów przez atakujących.
- **Token nie jest tokenem ERC-777 i nie ma wywołań funkcji zewnętrznych w transfer i transferFrom.** Zewnętrzne wywołania w funkcjach transferu mogą prowadzić do ataków reentrancy.

Slither zawiera narzędzie [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), które generuje testy jednostkowe i właściwości bezpieczeństwa mogące wykryć wiele typowych błędów ERC. Użyj slither-prop, aby sprawdzić, czy:

- **Kontrakt przechodzi wszystkie testy jednostkowe i właściwości bezpieczeństwa ze slither-prop.** Uruchom wygenerowane testy jednostkowe, a następnie sprawdź właściwości za pomocą [Echidna](https://github.com/crytic/echidna).

Wreszcie, istnieją pewne cechy, które trudno zidentyfikować automatycznie. Sprawdź te warunki ręcznie:

- **Transfer i transferFrom nie powinny pobierać opłaty.** Tokeny deflacyjne mogą prowadzić do nieoczekiwanego zachowania.
- **Potencjalne odsetki zarobione z tokena są brane pod uwagę.** Niektóre tokeny dystrybuują odsetki do posiadaczy tokenów. Odsetki te mogą zostać uwięzione w kontrakcie, jeśli nie zostaną wzięte pod uwagę.

## Kompozycja kontraktu {#contract-composition}

- **Kontrakt unika niepotrzebnej złożoności.** Token powinien być prostym kontraktem; token ze złożonym kodem wymaga wyższego standardu przeglądu. Użyj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) w Slither, aby zidentyfikować złożony kod.
- **Kontrakt używa sprawdzanej arytmetyki.** Solidity 0.8 i nowsze domyślnie wycofują transakcję (revert) w przypadku przepełnienia (overflow) i niedomiaru (underflow); starsze kontrakty potrzebują SafeMath dla tej samej ochrony. Kontrakty skompilowane w starszych wersjach bez SafeMath lub używające bloków `unchecked` wymagają wyższego standardu przeglądu. Ręcznie sprawdź arytmetykę, zwłaszcza wewnątrz bloków `unchecked` i wstawek asemblerowych (inline assembly).
- **Kontrakt ma tylko kilka funkcji niezwiązanych z tokenem.** Funkcje niezwiązane z tokenem zwiększają prawdopodobieństwo wystąpienia problemu w kontrakcie. Użyj [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) w Slither, aby ogólnie przejrzeć kod użyty w kontrakcie.
- **Token ma tylko jeden adres.** Tokeny z wieloma punktami wejścia do aktualizacji salda mogą zepsuć wewnętrzną księgowość opartą na adresie (np. `balances[token_address][msg.sender]` może nie odzwierciedlać rzeczywistego salda).

## Uprawnienia właściciela {#owner-privileges}

- **Token nie jest aktualizowalny (upgradeable).** Aktualizowalne kontrakty mogą z czasem zmieniać swoje zasady. Użyj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) w Slither, aby określić, czy kontrakt można aktualizować.
- **Właściciel ma ograniczone możliwości wybijania.** Złośliwi lub skompromitowani właściciele mogą nadużywać możliwości wybijania. Użyj [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) w Slither, aby przejrzeć możliwości wybijania i rozważ ręczne przejrzenie kodu.
- **Token nie ma możliwości wstrzymania (pausable).** Złośliwi lub skompromitowani właściciele mogą uwięzić kontrakty polegające na wstrzymywanych tokenach. Zidentyfikuj ręcznie kod umożliwiający wstrzymanie.
- **Właściciel nie może umieścić kontraktu na czarnej liście.** Złośliwi lub skompromitowani właściciele mogą uwięzić kontrakty polegające na tokenach z czarną listą. Zidentyfikuj ręcznie funkcje czarnej listy.
- **Zespół stojący za tokenem jest znany i może zostać pociągnięty do odpowiedzialności za nadużycia.** Kontrakty z anonimowymi zespołami programistów lub znajdujące się w rajach prawnych powinny wymagać wyższego standardu przeglądu.

## Rzadkość tokena {#token-scarcity}

Przegląd pod kątem problemów z rzadkością tokena wymaga ręcznej weryfikacji. Sprawdź następujące warunki:

- **Żaden użytkownik nie posiada większości podaży.** Jeśli kilku użytkowników posiada większość tokenów, mogą oni wpływać na operacje w oparciu o podział tokena.
- **Całkowita podaż jest wystarczająca.** Tokeny o niskiej całkowitej podaży mogą być łatwo manipulowane.
- **Tokeny znajdują się na więcej niż kilku giełdach.** Jeśli wszystkie tokeny znajdują się na jednej giełdzie, kompromitacja giełdy może skompromitować kontrakt polegający na tym tokenie.
- **Użytkownicy rozumieją powiązane ryzyko związane z dużymi funduszami lub pożyczkami błyskawicznymi (flash loans).** Kontrakty polegające na saldzie tokenów muszą dokładnie brać pod uwagę atakujących dysponujących dużymi funduszami lub ataki za pośrednictwem pożyczek błyskawicznych.
- **Token nie pozwala na błyskawiczne wybijanie (flash minting).** Błyskawiczne wybijanie może prowadzić do znacznych wahań salda i całkowitej podaży, co wymaga rygorystycznych i kompleksowych kontroli przepełnienia w działaniu tokena.
## Znane niestandardowe tokeny ERC-20 {#known-non-standard-erc20-tokens}

Protokoły, które pozwalają na integrację z dowolnymi tokenami, muszą zadbać o prawidłową obsługę pewnych dobrze znanych niestandardowych tokenów ERC-20. Zapoznaj się z [listą niestandardowych tokenów](https://secure-contracts.com/development-guidelines/non-standard-tokens.html), aby poznać dobrze znane tokeny, które niosą ze sobą dodatkowe ryzyko.

## Tokeny ERC-721 {#erc721-tokens}

### Kontrole zgodności z ERC-721 {#erc721-conformity-checks}

Zachowanie niektórych kontraktów może różnić się od oryginalnej specyfikacji ERC. Ręcznie sprawdź następujące warunki:

- **Transfery tokenów na adres 0x0 są wycofywane (revert).** Niektóre tokeny pozwalają na transfery na adres 0x0 i uznają tokeny wysłane na ten adres za spalone; jednak standard ERC-721 wymaga, aby takie transfery były wycofywane.
- **Funkcje `safeTransferFrom` są zaimplementowane z poprawnym podpisem.** Niektóre kontrakty tokenów nie implementują tych funkcji. Transferowanie NFT do jednego z tych kontraktów może skutkować utratą aktywów.
- **Funkcje `name`, `decimals` i `symbol` są obecne, jeśli są używane.** Te funkcje są opcjonalne w standardzie ERC-721 i mogą nie być obecne.
- **Jeśli jest używana, funkcja `decimals` zwraca `uint8(0)`.** Inne wartości są nieprawidłowe.
- **Funkcje `name` i `symbol` mogą zwracać pusty ciąg znaków.** Takie zachowanie jest dozwolone przez standard.
- **Funkcja `ownerOf` wycofuje transakcję, jeśli `tokenId` jest nieprawidłowe lub odnosi się do tokena, który został już spalony.** Funkcja nie może zwrócić 0x0. Takie zachowanie jest wymagane przez standard, ale może nie zawsze być poprawnie zaimplementowane.
- **Transfer NFT czyści jego zatwierdzenia (approvals).** Jest to wymagane przez standard.
- **ID tokena NFT nie może zostać zmienione w trakcie jego życia.** Jest to wymagane przez standard.

### Typowe ryzyka standardu ERC-721 {#common-risks-of-the-erc721-standard}

Złagodź ryzyko związane z kontraktami ERC-721, przeprowadzając ręczny przegląd następujących warunków:

- **Wywołanie zwrotne (callback) `onERC721Received` jest brane pod uwagę.** Zewnętrzne wywołania w funkcjach transferu mogą prowadzić do ataków reentrancy, zwłaszcza gdy wywołanie zwrotne nie jest jawne (np. w wywołaniach [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)).
- **Kiedy NFT jest wybijane, jest bezpiecznie transferowane do inteligentnego kontraktu.** Jeśli istnieje funkcja wybijania, powinna zachowywać się podobnie do `safeTransferFrom` i odpowiednio obsługiwać wybijanie nowych tokenów do inteligentnego kontraktu, zapobiegając utracie aktywów.
- **Spalenie tokena czyści jego zatwierdzenia.** Jeśli istnieje funkcja spalania, powinna ona wyczyścić poprzednie zatwierdzenia tokena.
