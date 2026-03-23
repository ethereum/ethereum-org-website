---
title: Przewodnik po aktualizacji Pectra 7702
description: "Dowiedz się więcej o aktualizacji Pectra 7702"
lang: pl
---

# Pectra 7702

## Streszczenie {#abstract}

EIP 7702 definiuje mechanizm dodawania kodu do konta zewnętrznego. Ta propozycja pozwala na wprowadzenie krótkoterminowych ulepszeń funkcjonalności dla kont Ethereum (EOA), co zwiększy użyteczność aplikacji. Można to zrobić, ustawiając wskaźnik do już wdrożonego kodu przy użyciu nowego typu transakcji: 4.

Ten nowy typ transakcji wprowadza listę autoryzacji. Każda krotka autoryzacji na liście jest zdefiniowana jako

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**adres** to delegacja (już wdrożony kod bajtowy, który będzie używany przez EOA)
**chain_id** blokuje autoryzację do określonego łańcucha (lub 0 dla wszystkich łańcuchów)
**nonce** blokuje autoryzację do określonego konta (nonce)
(**y_parity, r, s**) to sygnatura krotki autoryzacji, zdefiniowana jako keccak(0x05 || rlp ([chain_id ,adres, nonce])) przez klucz prywatny EOA, do którego odnosi się autoryzacja (zwany również autoryzacją)

Delegację można zresetować, delegując ją na adres zerowy.

Klucz prywatny EOA zachowuje pełną kontrolę nad kontem po delegowaniu. Na przykład delegowanie do konta Sejf nie sprawia, że ​​konto staje się kontem multisig, ponieważ nadal istnieje jeden klucz, który może ominąć wszelkie zasady podpisywania. W przyszłości programiści powinni projektować swoje rozwiązania, zakładając, że każdy uczestnik systemu może być inteligentną umową. Twórcy inteligentnych kontraktów nie mogą już zakładać, że `tx.origin` odnosi się do EOA.

## Najlepsze praktyki {#best-practices}

**Abstrakcja konta**: Umowa delegacji powinna być zgodna ze standardami szerszej abstrakcji konta (AA) Ethereum, aby zapewnić maksymalną kompatybilność. W szczególności powinien być zgodny lub kompatybilny ze standardem ERC-4337.

**Konstrukcja odporna na cenzurę i brak konieczności uzyskiwania zezwoleń**: Ethereum ceni sobie udział bez konieczności uzyskiwania zezwoleń. Umowa delegacyjna NIE MOŻE być zakodowana na stałe ani opierać się na pojedynczym „zaufanym” przekaźniku lub usłudze. Jeśli przekaźnik przejdzie w tryb offline, konto zostanie zablokowane. Funkcje takie jak przetwarzanie wsadowe (np. zatwierdzenie+transferFrom) mogą być używane przez sam EOA bez pośrednika. Deweloperzy aplikacji chcący korzystać z zaawansowanych funkcji włączonych w standardzie 7702 (pobieranie gazu, wypłaty z zachowaniem prywatności) będą potrzebować przekaźnika. Chociaż istnieją różne architektury przekaźników, naszym zaleceniem jest użycie [bundlerów 4337](https://www.erc4337.io/bundlers) wskazujących co najmniej [punkt wejścia 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0), ponieważ:

- Zapewniają standardowe interfejsy do przekazywania
- Zawiera wbudowane systemy płatności
- Zapewnij kompatybilność w przyszłości
- Możliwość wspierania oporu wobec cenzury poprzez [publiczną pulę pamięci](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Można wymagać, aby funkcja init była wywoływana wyłącznie z [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Innymi słowy, każdy powinien móc pełnić rolę sponsora/przekaźnika transakcji, pod warunkiem dostarczenia wymaganego prawidłowego podpisu lub operacji użytkownika z konta. Zapewnia to odporność na cenzurę: jeśli nie jest wymagana żadna specjalna infrastruktura, transakcje użytkownika nie mogą zostać arbitralnie zablokowane przez przekaźnik. Na przykład [zestaw narzędzi do delegowania MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) współpracuje jawnie z dowolnym pakietem ERC-4337 lub systemem płatności w dowolnym łańcuchu, zamiast wymagać serwera specyficznego dla MetaMask.

**Integracja dApps poprzez interfejsy portfela**:

Biorąc pod uwagę, że portfele będą umieszczać na białej liście określone umowy delegacji dla protokołu EIP-7702, aplikacje zdecentralizowane (dApps) nie powinny spodziewać się bezpośredniego żądania autoryzacji 7702. Zamiast tego integracja powinna odbywać się za pośrednictwem standardowych interfejsów portfela:

- **ERC-5792 (`wallet_sendCalls`)**: Umożliwia aplikacjom zdecentralizowanym żądanie od portfeli wykonywania zbiorczych wywołań, ułatwiając realizację takich funkcjonalności, jak grupowanie transakcji i abstrakcja gazu.

- **ERC-6900**: Umożliwia aplikacjom zdecentralizowanym korzystanie z modułowych funkcji inteligentnych kont, takich jak klucze sesji i odzyskiwanie kont, za pośrednictwem modułów zarządzanych z poziomu portfela.

Wykorzystując te interfejsy, zdecentralizowane aplikacje (dApps) mogą uzyskać dostęp do funkcji inteligentnych kont udostępnianych przez EIP-7702 bez konieczności bezpośredniego zarządzania delegacjami, co zapewnia kompatybilność i bezpieczeństwo w różnych implementacjach portfeli.

> Uwaga: Nie istnieje standardowa metoda umożliwiająca aplikacjom zdecentralizowanym bezpośrednie żądanie podpisów autoryzacyjnych 7702. DApps muszą opierać się na określonych interfejsach portfela, takich jak ERC-6900, aby móc korzystać z funkcji EIP-7702.

Więcej informacji:

- [ERC-5792 specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Unikanie uzależnienia od dostawcy**: Zgodnie z powyższym, dobra implementacja jest niezależna od dostawcy i interoperacyjna. Często oznacza to konieczność dostosowania się do nowych standardów dla inteligentnych kont. Na przykład [modułowe konto Alchemy](https://github.com/alchemyplatform/modular-account) wykorzystuje standard ERC-6900 dla modułowych kont inteligentnych i zostało zaprojektowane z myślą o „interoperacyjnym użytkowaniu bez konieczności uzyskiwania uprawnień”.

**Ochrona prywatności**: Mimo że prywatność w łańcuchu bloków jest ograniczona, umowa delegująca powinna dążyć do minimalizacji ujawniania danych i możliwości ich łączenia. Można to osiągnąć, obsługując takie funkcje, jak płatności za gaz w tokenach ERC-20 (w związku z czym użytkownicy nie muszą utrzymywać publicznego salda ETH, co poprawia prywatność i UX) oraz jednorazowe klucze sesyjne (zmniejszające konieczność korzystania z pojedynczego klucza długoterminowego). Przykładowo, EIP-7702 umożliwia płacenie gazem w tokenach za pośrednictwem sponsorowanych transakcji, a dobra implementacja ułatwi integrację takich płatników bez ujawniania większej ilości informacji, niż jest to konieczne. Ponadto delegowanie niektórych zatwierdzeń poza łańcuchem (przy użyciu podpisów weryfikowanych w łańcuchu) oznacza mniej transakcji w łańcuchu z kluczem podstawowym użytkownika, co sprzyja zachowaniu prywatności. Konta wymagające użycia przekaźnika zmuszają użytkowników do ujawnienia swojego adresu IP. PublicMempools rozwiązuje ten problem. Gdy transakcja/UserOp jest propagowana przez mempool, nie można stwierdzić, czy pochodzi ona z adresu IP, z którego została wysłana, czy też została przekazana przez protokół p2p.

**Rozszerzalność i modułowe zabezpieczenia**: Implementacje kont powinny być rozszerzalne, aby mogły ewoluować wraz z nowymi funkcjami i ulepszeniami bezpieczeństwa. Możliwość modernizacji jest wbudowana w EIP-7702 (gdyż EOA może zawsze delegować zadania do nowej umowy w przyszłości w celu modernizacji jej logiki). Oprócz możliwości aktualizacji, dobry projekt pozwala na modułowość – np. moduły wtyczek dla różnych schematów podpisów lub zasad wydatków – bez konieczności ponownego wdrażania w całości. Doskonałym przykładem jest zestaw narzędzi Account Kit firmy Alchemy, który umożliwia deweloperom instalację modułów walidacyjnych (dla różnych typów podpisów, takich jak ECDSA, BLS itp.) i moduły wykonawcze dla niestandardowej logiki. Aby osiągnąć większą elastyczność i bezpieczeństwo kont obsługujących protokół EIP-7702, deweloperzy powinni delegować zadania do kontraktu proxy, a nie bezpośrednio do konkretnej implementacji. Takie podejście pozwala na bezproblemową aktualizację i modułowość bez konieczności uzyskiwania dodatkowych autoryzacji EIP-7702 przy każdej zmianie.

Zalety wzorca proxy:

- **Możliwość aktualizacji**: Zaktualizuj logikę kontraktu, wskazując serwerowi proxy nowy kontrakt implementacyjny.

- **Niestandardowa logika inicjalizacji**: Zintegruj funkcje inicjalizacji w serwerze proxy, aby bezpiecznie skonfigurować niezbędne zmienne stanu.

Na przykład [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) pokazuje, w jaki sposób można wykorzystać serwer proxy do bezpiecznego inicjowania i zarządzania delegacjami na kontach zgodnych ze standardem EIP-7702.

Wady wzorca proxy:

- **Poleganie na podmiotach zewnętrznych**: Musisz polegać na zewnętrznym zespole, aby nie zmienić umowy na niebezpieczną.

## Zagadnienia bezpieczeństwa {#security-considerations}

**Ochrona przed ponownym wejściem**: Dzięki wprowadzeniu delegowania EIP-7702 konto użytkownika może dynamicznie przełączać się między kontem zewnętrznym (EOA) a inteligentnym kontraktem (SC). Taka elastyczność sprawia, że ​​konto może zarówno inicjować transakcje, jak i być celem połączeń. W rezultacie w scenariuszach, w których konto wywołuje samo siebie i wykonuje połączenia zewnętrzne, `msg.sender` będzie równe `tx.origin`, co podważa pewne założenia bezpieczeństwa, które wcześniej opierały się na założeniu, że `tx.origin` zawsze stanowi EOA.

Alternatywnie wdrożenie jawnej ochrony przed ponownym wprowadzeniem, zastosowanie z zabezpieczeniem reentracji ze wzorcami modyfikatorów `nonReentrant`. Podobnie, używanie `msg.sender == tx.origin` jako zabezpieczenia przed atakami reentrancy nie jest już niezawodną strategią.

W przyszłości programiści powinni projektować swoje rozwiązania, zakładając, że każdy uczestnik systemu może być inteligentną umową. Alternatywnie mogliby wdrożyć jawną ochronę przed reentrancją, korzystając z zabezpieczeń reentrancji ze wzorcami modyfikatorów `nonReentrant`. Zalecamy korzystanie ze zweryfikowanego modyfikatora, np. [Reentrancy Guard pakietu Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Mogą również wykorzystać [zmienną pamięci przejściowej](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Rozważania dotyczące bezpieczeństwa inicjalizacji**

Wdrożenie kontraktów delegacyjnych EIP-7702 wiąże się ze szczególnymi wyzwaniami w zakresie bezpieczeństwa, zwłaszcza dotyczącymi procesu inicjalizacji. Krytyczna luka w zabezpieczeniach powstaje, gdy funkcja inicjalizacji (`init`) jest atomowo sprzężona z procesem delegowania. W takich przypadkach osoba będąca liderem może przechwycić podpis delegacji i wykonać funkcję `init` ze zmienionymi parametrami, potencjalnie przejmując kontrolę nad kontem.

Ryzyko to jest szczególnie istotne w przypadku próby wykorzystania istniejących implementacji kont Smart Contract (SCA) z protokołem EIP-7702 bez modyfikowania ich mechanizmów inicjalizacji.

**Rozwiązania łagodzące luki w zabezpieczeniach inicjalizacji**

- Implementacja `initWithSig`
  Zastąp standardową funkcję `init` funkcją `initWithSig`, która wymaga od użytkownika podpisania parametrów inicjalizacji. Takie podejście gwarantuje, że inicjalizacja może być przeprowadzona wyłącznie po uzyskaniu wyraźnej zgody użytkownika, co zmniejsza ryzyko nieautoryzowanej inicjalizacji.

- Wykorzystaj punkt wejścia (EntryPoint) ERC-4337
  Wymagaj, aby funkcja inicjalizacji była wywoływana wyłącznie z kontraktu punktu wejścia (EntryPoint) ERC-4337. Metoda ta wykorzystuje standardowe ramy walidacji i wykonywania określone w standardzie ERC-4337, dodając dodatkową warstwę zabezpieczeń do procesu inicjalizacji.  
  _(See: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Dzięki zastosowaniu tych rozwiązań deweloperzy mogą zwiększyć bezpieczeństwo kontraktów delegacji EIP-7702, chroniąc się przed potencjalnymi atakami typu frontrunning w fazie inicjalizacji.

**Kolizje pamięci masowej** Delegowanie kodu nie czyści istniejącej pamięci masowej. Podczas migracji z jednej umowy delegacyjnej do innej, resztkowe dane z poprzedniej umowy pozostają niezmienione. Jeśli nowa umowa wykorzystuje te same sloty pamięci masowej, ale interpretuje je inaczej, może to prowadzić do niezamierzonych zachowań. Na przykład, jeśli początkowe delegowanie dotyczyło kontraktu, w którym slot pamięci masowej reprezentuje `bool`, a późniejsze delegowanie dotyczy kontraktu, w którym ten sam slot reprezentuje `uint`, niezgodność może doprowadzić do nieprzewidywalnych rezultatów.

**Ryzyko phishingu** Dzięki wdrożeniu delegowania EIP-7702 zasoby na koncie użytkownika mogą być w całości kontrolowane przez inteligentne kontrakty. Jeśli użytkownik nieświadomie udostępni swoje konto złośliwemu kontraktowi, atakujący może łatwo przejąć kontrolę i ukraść środki. W przypadku użycia `chain_id=0` delegacja jest stosowana do wszystkich identyfikatorów łańcucha. Deleguj tylko do niezmiennego kontraktu (nigdy nie deleguj do serwera proxy) i tylko do kontraktów wdrożonych przy użyciu CREATE2 (ze standardowym kodem initcode — bez kontraktów metamorficznych), aby wdrażający nie mógł wdrożyć czegoś innego pod tym samym adresem gdzie indziej. W przeciwnym wypadku Twoja delegacja narazi Twoje konto na ryzyko we wszystkich pozostałych łańcuchach EVM.

Gdy użytkownicy składają podpisy delegowane, umowa docelowa, której dotyczy delegacja, powinna być wyraźnie i widocznie wyświetlana, aby pomóc ograniczyć ryzyko phishingu.

**Minimalna powierzchnia zaufania i bezpieczeństwo**: Umowa delegująca, oferując jednocześnie elastyczność, powinna zachować swoją podstawową logikę na poziomie minimalnym i możliwym do zweryfikowania. Umowa stanowi w istocie przedłużenie EOA użytkownika, więc jakakolwiek wada może mieć katastrofalne skutki. Wdrożenia powinny być zgodne z najlepszymi praktykami stosowanymi przez społeczność zajmującą się bezpieczeństwem inteligentnych kontraktów. Na przykład funkcje konstruktora lub inicjatora muszą być starannie zabezpieczone – jak podkreśla Alchemy, w przypadku użycia wzorca proxy poniżej 7702 niezabezpieczony inicjator może umożliwić atakującemu przejęcie konta. Zespoły powinny starać się, aby kod on-chain był prosty: kontrakt 7702 Ambire składa się tylko z około 200 linii kodu Solidity, co pozwala na celowe ograniczenie złożoności w celu ograniczenia liczby błędów. Należy znaleźć równowagę między bogatą w funkcje logiką a prostotą ułatwiającą audyt.

### Znane implementacje {#known-implementations}

Ze względu na charakter protokołu EIP 7702 zaleca się, aby portfele zachowywały ostrożność, pomagając użytkownikom delegować zadania do umowy zewnętrznej. Poniżej znajduje się zbiór znanych implementacji, które zostały poddane audytowi:

| Adres umowy                                | Źródło                                                                                                                                     | Audyty                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audits](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Foundation AA team](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Wytyczne dotyczące portfela sprzętowego {#hardware-wallet-guidelines}

Portfele sprzętowe nie powinny ujawniać dowolnego delegowania. W obszarze portfeli sprzętowych panuje zgoda co do korzystania z listy zaufanych kontraktów delegujących. Sugerujemy dopuszczenie znanych implementacji wymienionych powyżej i rozważenie innych w każdym przypadku indywidualnie. Ponieważ delegowanie EOA do kontraktu daje kontrolę nad wszystkimi aktywami, właściciele portfeli sprzętowych powinni zachować ostrożność przy sposobie implementacji 7702.

### Scenariusze integracji dla aplikacji towarzyszących {#integration-scenarios-for-companion-apps}

#### Leniwy {#lazy}

Ponieważ EOA działa normalnie, nie ma nic do zrobienia.

Uwaga: niektóre zasoby mogą zostać automatycznie odrzucone przez kod delegacji, np. NFT ERC 1155, a dział wsparcia powinien o tym wiedzieć.

#### Świadomy {#aware}

Powiadom użytkownika, że ​​delegacja jest aktywna dla EOA, sprawdzając jej kod i opcjonalnie zaproponuj usunięcie delegacji.

#### Wspólna delegacja {#common-delegation}

Dostawca sprzętu umieszcza znane umowy delegacyjne na białej liście i implementuje ich obsługę w oprogramowaniu towarzyszącym. Zaleca się wybranie umowy z pełnym wsparciem ERC 4337.

Pozwolenia EOA przekazane innej osobie będą traktowane jako standardowe pozwolenia EOA.

#### Delegacja niestandardowa {#custom-delegation}

Dostawca sprzętu wdraża własną umowę delegacyjną i dodaje ją do list, a także wdraża jej wsparcie w oprogramowaniu towarzyszącym. Zaleca się utworzenie kontraktu z pełnym wsparciem ERC 4337.

Pozwolenia EOA przekazane innej osobie będą traktowane jako standardowe pozwolenia EOA.
