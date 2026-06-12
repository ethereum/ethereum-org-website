---
title: Pectra 7702
metaTitle: Wytyczne Pectra 7702
description: Dowiedz się więcej o 7702 w aktualizacji Pectra
lang: pl
---

## Streszczenie {#abstract}

EIP-7702 definiuje mechanizm dodawania kodu do EOA. Ta propozycja pozwala EOA, starszym kontom Ethereum, na otrzymywanie krótkoterminowych ulepszeń funkcjonalności, zwiększając użyteczność aplikacji. Odbywa się to poprzez ustawienie wskaźnika na już wdrożony kod bajtowy przy użyciu nowego typu transakcji: 4.

Ten nowy typ transakcji wprowadza listę autoryzacji. Każda krotka autoryzacji na liście jest zdefiniowana jako

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** to delegowanie (już wdrożony kod bajtowy, który będzie używany przez EOA)
**chain_id** blokuje autoryzację do określonego łańcucha (lub 0 dla wszystkich łańcuchów)
**nonce** blokuje autoryzację do określonego nonce konta
(**y_parity, r, s**) to podpis krotki autoryzacji, zdefiniowany jako keccak(0x05 || rlp ([chain_id ,address, nonce])) za pomocą klucza prywatnego EOA, którego dotyczy autoryzacja (zwanego również autorytetem)

Delegowanie można zresetować, delegując na adres zerowy (null address).

Klucz prywatny EOA zachowuje pełną kontrolę nad kontem po delegowaniu. Na przykład delegowanie do Safe nie sprawia, że konto staje się multisig, ponieważ nadal istnieje pojedynczy klucz, który może ominąć dowolną politykę podpisywania. W przyszłości programiści powinni projektować z założeniem, że każdy uczestnik systemu może być inteligentnym kontraktem. Dla programistów inteligentnych kontraktów nie jest już bezpieczne zakładanie, że `tx.origin` odnosi się do EOA.

## Najlepsze praktyki {#best-practices}

**Abstrakcja konta**: Kontrakt delegowania powinien być zgodny z szerszymi standardami abstrakcji konta (AA) Ethereum, aby zmaksymalizować kompatybilność. W szczególności powinien idealnie być zgodny lub kompatybilny z ERC-4337.

**Projekt niewymagający pozwoleń i odporny na cenzurę**: Ethereum ceni uczestnictwo niewymagające pozwoleń. Kontrakt delegowania NIE MOŻE kodować na sztywno ani polegać na żadnym pojedynczym „zaufanym” przekaźniku (relayer) lub usłudze. Zablokowałoby to konto, gdyby przekaźnik przestał działać. Funkcje takie jak wsadowanie (np. approve+transferFrom) mogą być używane przez samo EOA bez przekaźnika. Programiści aplikacji, którzy chcą korzystać z zaawansowanych funkcji udostępnianych przez 7702 (abstrakcja gazu, wypłaty chroniące prywatność), będą potrzebować przekaźnika. Chociaż istnieją różne architektury przekaźników, naszą rekomendacją jest użycie [bundlerów 4337](https://www.erc4337.io/bundlers) wskazujących co najmniej na [punkt wejścia (entry point) 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0), ponieważ:

- Zapewniają ustandaryzowane interfejsy do przekazywania
- Zawierają wbudowane systemy paymaster
- Zapewniają kompatybilność w przód
- Mogą wspierać odporność na cenzurę poprzez [publiczny mempool](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Mogą wymagać, aby funkcja inicjująca była wywoływana tylko z [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Innymi słowy, każdy powinien móc działać jako sponsor/przekaźnik transakcji, o ile dostarczy wymagany ważny podpis lub operację użytkownika (UserOperation) z konta. Zapewnia to odporność na cenzurę: jeśli nie jest wymagana żadna niestandardowa infrastruktura, transakcje użytkownika nie mogą być arbitralnie blokowane przez przekaźnik pełniący rolę strażnika (gatekeepera). Na przykład [Delegation Toolkit od MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) jawnie współpracuje z dowolnym bundlerem ERC-4337 lub paymasterem na dowolnym łańcuchu, zamiast wymagać serwera specyficznego dla MetaMask.

**Integracja zdecentralizowanych aplikacji (dapp) przez interfejsy portfeli**:

Biorąc pod uwagę, że portfele będą umieszczać na białej liście określone kontrakty delegowania dla EIP-7702, dappy nie powinny oczekiwać bezpośredniego żądania autoryzacji 7702. Zamiast tego integracja powinna odbywać się poprzez ustandaryzowane interfejsy portfeli:

- **ERC-5792 (`wallet_sendCalls`)**: Umożliwia dappom żądanie od portfeli wykonywania wywołań wsadowych, ułatwiając funkcjonalności takie jak wsadowanie transakcji i abstrakcja gazu.

- **ERC-6900**: Pozwala dappom na wykorzystanie możliwości modułowych inteligentnych kont, takich jak klucze sesji i odzyskiwanie konta, poprzez moduły zarządzane przez portfel.

Wykorzystując te interfejsy, dappy mogą uzyskać dostęp do funkcjonalności inteligentnego konta zapewnianych przez EIP-7702 bez bezpośredniego zarządzania delegowaniami, zapewniając kompatybilność i bezpieczeństwo w różnych implementacjach portfeli.

> Uwaga: Nie ma ustandaryzowanej metody dla dappów do bezpośredniego żądania podpisów autoryzacji 7702. Dappy muszą polegać na określonych interfejsach portfeli, takich jak ERC-6900, aby skorzystać z funkcji EIP-7702.

Więcej informacji:

- [Specyfikacja ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Specyfikacja ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Unikanie uzależnienia od dostawcy (Vendor Lock-In)**: Zgodnie z powyższym, dobra implementacja jest neutralna dla dostawców i interoperacyjna. Często oznacza to przestrzeganie pojawiających się standardów dla inteligentnych kont. Na przykład [Modular Account od Alchemy](https://github.com/alchemyplatform/modular-account) wykorzystuje standard ERC-6900 dla modułowych inteligentnych kont i jest zaprojektowane z myślą o „interoperacyjnym użyciu niewymagającym pozwoleń”.

**Ochrona prywatności**: Chociaż prywatność onchain jest ograniczona, kontrakt delegowania powinien dążyć do zminimalizowania ujawniania danych i możliwości ich powiązania. Można to osiągnąć poprzez wspieranie funkcji takich jak płatności za gaz w tokenach ERC-20 (dzięki czemu użytkownicy nie muszą utrzymywać publicznego salda ETH, co poprawia prywatność i UX) oraz jednorazowe klucze sesji (które zmniejszają zależność od pojedynczego klucza długoterminowego). Na przykład EIP-7702 umożliwia płacenie za gaz w tokenach poprzez sponsorowane transakcje, a dobra implementacja ułatwi integrację takich paymasterów bez ujawniania większej ilości informacji, niż jest to konieczne. Dodatkowo, pozałańcuchowe delegowanie niektórych zatwierdzeń (przy użyciu podpisów, które są weryfikowane onchain) oznacza mniej transakcji onchain z użyciem głównego klucza użytkownika, co wspomaga prywatność. Kontonta, które wymagają użycia przekaźnika, zmuszają użytkowników do ujawnienia swoich adresów IP. Publiczne mempoole (PublicMempools) to poprawiają; gdy transakcja/operacja użytkownika (UserOp) propaguje się przez mempool, nie można stwierdzić, czy pochodzi z adresu IP, który ją wysłał, czy tylko została przez niego przekazana za pośrednictwem protokołu p2p.

**Rozszerzalność i modułowe bezpieczeństwo**: Implementacje kont powinny być rozszerzalne, aby mogły ewoluować wraz z nowymi funkcjami i ulepszeniami bezpieczeństwa. Możliwość aktualizacji jest z natury możliwa dzięki EIP-7702 (ponieważ EOA może zawsze delegować do nowego kontraktu w przyszłości, aby zaktualizować swoją logikę). Poza możliwością aktualizacji, dobry projekt pozwala na modułowość – np. moduły wtyczek dla różnych schematów podpisów lub polityk wydatków – bez konieczności całkowitego ponownego wdrażania. Account Kit od Alchemy jest doskonałym przykładem, pozwalającym programistom na instalowanie modułów walidacji (dla różnych typów podpisów, takich jak ECDSA, BLS itp.) oraz modułów wykonawczych dla niestandardowej logiki. Aby osiągnąć większą elastyczność i bezpieczeństwo w kontach obsługujących EIP-7702, zachęca się programistów do delegowania do kontraktu proxy (proxy contract) zamiast bezpośrednio do konkretnej implementacji. Takie podejście pozwala na płynne aktualizacje i modułowość bez wymagania dodatkowych autoryzacji EIP-7702 dla każdej zmiany.

Korzyści ze wzorca Proxy:

- **Możliwość aktualizacji**: Aktualizacja logiki kontraktu poprzez wskazanie przez proxy nowego kontraktu implementacji.

- **Niestandardowa logika inicjalizacji**: Włączenie funkcji inicjujących w ramach proxy w celu bezpiecznego skonfigurowania niezbędnych zmiennych stanu.

Na przykład [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) demonstruje, jak można wykorzystać proxy do bezpiecznego inicjowania i zarządzania delegowaniami w kontach kompatybilnych z EIP-7702.

Wady wzorca Proxy:

- **Zależność od podmiotów zewnętrznych**: Musisz polegać na zewnętrznym zespole, że nie zaktualizuje kontraktu do niebezpiecznej wersji.

## Kwestie bezpieczeństwa {#security-considerations}

**Zabezpieczenie przed ponownym wejściem**: Wraz z wprowadzeniem delegowania EIP-7702, konto użytkownika może dynamicznie przełączać się między kontem posiadanym zewnętrznie (EOA) a inteligentnym kontraktem (SC). Ta elastyczność umożliwia kontu zarówno inicjowanie transakcji, jak i bycie celem wywołań. W rezultacie scenariusze, w których konto wywołuje samo siebie i wykonuje wywołania zewnętrzne, będą miały `msg.sender` równe `tx.origin`, co podważa pewne założenia bezpieczeństwa, które wcześniej opierały się na tym, że `tx.origin` zawsze jest EOA.

Dla programistów inteligentnych kontraktów nie jest już bezpieczne zakładanie, że `tx.origin` odnosi się do EOA. Podobnie, używanie `msg.sender == tx.origin` jako zabezpieczenia przed atakami reentrancji nie jest już niezawodną strategią.

W przyszłości programiści powinni projektować z założeniem, że każdy uczestnik systemu może być inteligentnym kontraktem. Alternatywnie mogliby zaimplementować jawną ochronę przed reentrancją, używając zabezpieczeń przed ponownym wejściem ze wzorcami modyfikatorów `nonReentrant`. Zalecamy stosowanie audytowanego modyfikatora, np. [Reentrancy Guard od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Mogą również użyć [zmiennej pamięci przejściowej (transient storage)](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Kwestie bezpieczeństwa inicjalizacji**

Wdrażanie kontraktów delegowania EIP-7702 wprowadza specyficzne wyzwania związane z bezpieczeństwem, w szczególności dotyczące procesu inicjalizacji. Krytyczna podatność pojawia się, gdy funkcja inicjująca (`init`) jest atomowo powiązana z procesem delegowania. W takich przypadkach frontrunner mógłby przechwycić podpis delegowania i wykonać funkcję `init` ze zmienionymi parametrami, potencjalnie przejmując kontrolę nad kontem.

Ryzyko to jest szczególnie istotne przy próbie użycia istniejących implementacji inteligentnych kont (SCA) z EIP-7702 bez modyfikowania ich mechanizmów inicjalizacji.

**Rozwiązania łagodzące podatności inicjalizacji**

- Zaimplementuj `initWithSig`  
  Zastąp standardową funkcję `init` funkcją `initWithSig`, która wymaga od użytkownika podpisania parametrów inicjalizacji. Takie podejście zapewnia, że inicjalizacja może być kontynuowana tylko za wyraźną zgodą użytkownika, co łagodzi ryzyko nieautoryzowanej inicjalizacji.

- Wykorzystaj EntryPoint z ERC-4337  
  Wymagaj, aby funkcja inicjująca była wywoływana wyłącznie z kontraktu EntryPoint ERC-4337. Ta metoda wykorzystuje ustandaryzowane ramy walidacji i wykonywania zapewniane przez ERC-4337, dodając dodatkową warstwę bezpieczeństwa do procesu inicjalizacji.  
  _(Zobacz: [Dokumentacja Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Przyjmując te rozwiązania, programiści mogą zwiększyć bezpieczeństwo kontraktów delegowania EIP-7702, chroniąc przed potencjalnymi atakami typu frontrunning podczas fazy inicjalizacji.

**Kolizje pamięci (Storage Collisions)** Delegowanie kodu nie czyści istniejącej pamięci. Podczas migracji z jednego kontraktu delegowania do drugiego, pozostają resztkowe dane z poprzedniego kontraktu. Jeśli nowy kontrakt wykorzystuje te same sloty pamięci, ale interpretuje je inaczej, może to spowodować niezamierzone zachowanie. Na przykład, jeśli początkowe delegowanie dotyczyło kontraktu, w którym slot pamięci reprezentuje `bool`, a kolejne delegowanie dotyczy kontraktu, w którym ten sam slot reprezentuje `uint`, niedopasowanie może prowadzić do nieprzewidywalnych rezultatów.

**Ryzyko phishingu** Wraz z wdrożeniem delegowania EIP-7702, aktywa na koncie użytkownika mogą być całkowicie kontrolowane przez inteligentne kontrakty. Jeśli użytkownik nieświadomie deleguje swoje konto do złośliwego kontraktu, atakujący może łatwo przejąć kontrolę i ukraść środki. Podczas używania `chain_id=0` delegowanie jest stosowane do wszystkich identyfikatorów łańcuchów (chain ids). Deleguj tylko do niezmiennego kontraktu (nigdy nie deleguj do proxy) i tylko do kontraktów, które zostały wdrożone przy użyciu CREATE2 (ze standardowym kodem inicjującym - bez kontraktów metamorficznych), aby wdrażający nie mógł wdrożyć czegoś innego pod tym samym adresem w innym miejscu. W przeciwnym razie Twoje delegowanie naraża Twoje konto na ryzyko na wszystkich innych łańcuchach EVM.

Gdy użytkownicy wykonują delegowane podpisy, docelowy kontrakt otrzymujący delegowanie powinien być wyraźnie i widocznie wyświetlany, aby pomóc złagodzić ryzyko phishingu.

**Minimalna zaufana powierzchnia i bezpieczeństwo**: Oferując elastyczność, kontrakt delegowania powinien utrzymywać swoją podstawową logikę na minimalnym poziomie i umożliwiać jej audyt. Kontrakt jest w rzeczywistości rozszerzeniem EOA użytkownika, więc każda wada może być katastrofalna. Implementacje powinny postępować zgodnie z najlepszymi praktykami społeczności zajmującej się bezpieczeństwem inteligentnych kontraktów. Na przykład funkcje konstruktora lub inicjatora muszą być starannie zabezpieczone – jak podkreśla Alchemy, w przypadku korzystania ze wzorca proxy w ramach 7702, niezabezpieczony inicjator mógłby pozwolić atakującemu na przejęcie konta. Zespoły powinny dążyć do zachowania prostoty kodu onchain: kontrakt 7702 od Ambire ma tylko ~200 linii w Solidity, celowo minimalizując złożoność w celu zmniejszenia liczby błędów. Należy znaleźć równowagę między bogatą w funkcje logiką a prostotą, która ułatwia audyt.

### Znane implementacje {#known-implementations}

Ze względu na naturę EIP-7702, zaleca się, aby portfele zachowały ostrożność podczas pomagania użytkownikom w delegowaniu do kontraktu strony trzeciej. Poniżej znajduje się zbiór znanych implementacji, które zostały poddane audytowi:

| Adres kontraktu                            | Źródło                                                                                                                                     | Audyty                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audyty](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audyty](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audyty](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audyty](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Zespół AA Fundacji Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audyty](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audyty](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Wytyczne dla portfeli sprzętowych {#hardware-wallet-guidelines}

Portfele sprzętowe nie powinny udostępniać arbitralnego delegowania. Konsensus w przestrzeni portfeli sprzętowych polega na używaniu listy zaufanych kontraktów delegujących. Sugerujemy zezwolenie na znane implementacje wymienione powyżej i rozpatrywanie innych indywidualnie dla każdego przypadku. Ponieważ delegowanie EOA do kontraktu daje kontrolę nad wszystkimi aktywami, portfele sprzętowe powinny zachować ostrożność w sposobie implementacji 7702.

### Scenariusze integracji dla aplikacji towarzyszących {#integration-scenarios-for-companion-apps}

#### Leniwa (Lazy) {#lazy}

Ponieważ EOA nadal działa jak zwykle, nie ma nic do zrobienia.

Uwaga: niektóre aktywa mogą zostać automatycznie odrzucone przez kod delegowania, takie jak NFT ERC-1155, a wsparcie techniczne powinno być tego świadome.

#### Świadoma (Aware) {#aware}

Powiadom użytkownika, że dla EOA istnieje delegowanie, sprawdzając jego kod, i opcjonalnie zaoferuj usunięcie delegowania.

#### Wspólne delegowanie {#common-delegation}

Dostawca sprzętu umieszcza na białej liście znane kontrakty delegowania i implementuje ich obsługę w oprogramowaniu towarzyszącym. Zaleca się wybór kontraktu z pełną obsługą ERC-4337.

EOA delegowane do innego kontraktu będą traktowane jako standardowe EOA.

#### Niestandardowe delegowanie {#custom-delegation}

Dostawca sprzętu implementuje własny kontrakt delegowania i dodaje go do list, implementując jego obsługę w oprogramowaniu towarzyszącym. Zaleca się zbudowanie kontraktu z pełną obsługą ERC-4337.

EOA delegowane do innego kontraktu będą traktowane jako standardowe EOA.