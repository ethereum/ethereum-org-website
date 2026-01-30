---
title: Aktualizowanie inteligentnych kontraktów
description: Przegląd wzorców uaktualnień dla inteligentnych kontraktów Ethereum
lang: pl
---

Inteligentne kontrakty na Ethereum to samowykonujące się programy, które działają w Wirtualnej Maszynie Ethereum (EVM). Programy te są z założenia niezmienne, co uniemożliwia jakiekolwiek aktualizacje logiki biznesowej po wdrożeniu kontraktu.

Chociaż niezmienność jest niezbędna dla braku zaufania, decentralizacji i bezpieczeństwa inteligentnych kontraktów, w niektórych przypadkach może być wadą. Na przykład, niezmienny kod może uniemożliwić deweloperom naprawę podatnych na ataki kontraktów.

Jednak wzmożone badania nad ulepszaniem inteligentnych kontraktów doprowadziły do wprowadzenia kilku wzorców uaktualnień. Te wzorce uaktualnień umożliwiają deweloperom uaktualnianie inteligentnych kontraktów (przy jednoczesnym zachowaniu niezmienności) poprzez umieszczanie logiki biznesowej w różnych kontraktach.

## Wymagania wstępne {#prerequisites}

Warto mieć dobre pojęcie o [inteligentnych kontraktach](/developers/docs/smart-contracts/), [anatomii inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/) i [Wirtualnej Maszynie Ethereum (EVM)](/developers/docs/evm/). Ten przewodnik zakłada również, że czytelnicy mają pojęcie o programowaniu inteligentnych kontraktów.

## Czym jest uaktualnienie inteligentnego kontraktu? {#what-is-a-smart-contract-upgrade}

Uaktualnienie inteligentnego kontraktu polega na zmianie logiki biznesowej inteligentnego kontraktu przy jednoczesnym zachowaniu jego stanu. Należy wyjaśnić, że możliwość uaktualniania i zmienność to nie to samo, zwłaszcza w kontekście inteligentnych kontraktów.

Nadal nie można zmienić programu wdrożonego pod danym adresem w sieci Ethereum. Można jednak zmienić kod, który jest wykonywany, gdy użytkownicy wchodzą w interakcję z inteligentnym kontraktem.

Można to zrobić za pomocą następujących metod:

1. Tworzenie wielu wersji inteligentnego kontraktu i migrowanie stanu (tj. danych) ze starego kontraktu do nowej instancji kontraktu.

2. Tworzenie oddzielnych kontraktów do przechowywania logiki biznesowej i stanu.

3. Używanie wzorców proxy do delegowania wywołań funkcji z niezmiennego kontraktu proxy do modyfikowalnego kontraktu logicznego.

4. Tworzenie niezmiennego kontraktu głównego, który współdziała i opiera się na elastycznych kontraktach satelitarnych w celu wykonywania określonych funkcji.

5. Używanie wzorca diamentowego do delegowania wywołań funkcji z kontraktu proxy do kontraktów logicznych.

### Mechanizm uaktualniania nr 1: migracja kontraktu {#contract-migration}

Migracja kontraktów opiera się na wersjonowaniu – idei tworzenia unikalnych stanów tego samego oprogramowania i zarządzania nimi. Migracja kontraktu polega na wdrożeniu nowej instancji istniejącego inteligentnego kontraktu i przeniesieniu pamięci oraz sald do nowego kontraktu.

Nowo wdrożony kontrakt będzie miał pustą pamięć, co pozwoli odzyskać dane ze starego kontraktu i zapisać je do nowej implementacji. Następnie trzeba będzie zaktualizować wszystkie kontrakty, które wchodziły w interakcję ze starym kontraktem, aby odzwierciedlały nowy adres.

Ostatnim krokiem w migracji kontraktu jest przekonanie użytkowników do przejścia na korzystanie z nowego kontraktu. Nowa wersja kontraktu zachowa salda i adresy użytkowników, co zapewnia niezmienność. Jeśli jest to kontrakt oparty na tokenach, konieczne będzie również skontaktowanie się z giełdami w celu odrzucenia starego kontraktu i użycia nowego.

Migracja kontraktów jest stosunkowo prostym i bezpiecznym sposobem na uaktualnienie inteligentnych kontraktów bez zakłócania interakcji z użytkownikiem. Jednak ręczne migrowanie pamięci i sald użytkowników do nowego kontraktu jest czasochłonne i może wiązać się z wysokimi kosztami gazu.

[Więcej o migracji kontraktów.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mechanizm uaktualniania nr 2: separacja danych {#data-separation}

Inną metodą uaktualniania inteligentnych kontraktów jest rozdzielenie logiki biznesowej i przechowywania danych na oddzielne kontrakty. Oznacza to, że użytkownicy wchodzą w interakcję z kontraktem logicznym, podczas gdy dane są przechowywane w kontrakcie pamięci.

Kontrakt logiczny zawiera kod wykonywany, gdy użytkownicy wchodzą w interakcję z aplikacją. Przechowuje on również adres kontraktu pamięci i wchodzi z nim w interakcję w celu pobierania i ustawiania danych.

Tymczasem kontrakt pamięci przechowuje stan powiązany z inteligentnym kontraktem, taki jak salda i adresy użytkowników. Należy pamiętać, że kontrakt pamięci jest własnością kontraktu logicznego i jest konfigurowany z adresem tego ostatniego w momencie wdrożenia. Zapobiega to wywoływaniu kontraktu pamięci lub aktualizowaniu jego danych przez nieautoryzowane kontrakty.

Domyślnie kontrakt pamięci jest niezmienny — można jednak zastąpić kontrakt logiczny, na który wskazuje, nową implementacją. Spowoduje to zmianę kodu działającego w EVM, przy jednoczesnym zachowaniu nienaruszonej pamięci i sald.

Użycie tej metody uaktualniania wymaga zaktualizowania adresu kontraktu logicznego w kontrakcie pamięci. Należy również skonfigurować nowy kontrakt logiczny z adresem kontraktu pamięci z powodów wyjaśnionych wcześniej.

Wzór separacji danych jest prawdopodobnie łatwiejszy do wdrożenia w porównaniu z migracją kontraktów. Jednakże trzeba będzie zarządzać wieloma kontraktami i wdrażać złożone schematy autoryzacji w celu ochrony inteligentnych kontraktów przed złośliwymi uaktualnieniami.

### Mechanizm uaktualniania nr 3: wzorce proxy {#proxy-patterns}

Wzorzec proxy wykorzystuje również separację danych do przechowywania logiki biznesowej i danych w oddzielnych kontraktach. Jednak we wzorcu proxy kontrakt pamięci (nazywany proxy) wywołuje kontrakt logiczny podczas wykonywania kodu. Jest to odwrócenie metody separacji danych, w której kontrakt logiczny wywołuje kontrakt pamięci.

Oto, co dzieje się we wzorcu proxy:

1. Użytkownicy wchodzą w interakcję z kontraktem proxy, który przechowuje dane, ale nie zawiera logiki biznesowej.

2. Kontrakt proxy przechowuje adres kontraktu logicznego i deleguje wszystkie wywołania funkcji do kontraktu logicznego (który przechowuje logikę biznesową) za pomocą funkcji `delegatecall`.

3. Po przekazaniu wywołania do kontraktu logicznego, dane zwrócone z kontraktu logicznego są pobierane i zwracane użytkownikowi.

Korzystanie z wzorców proxy wymaga zrozumienia funkcji **delegatecall**. Zasadniczo `delegatecall` to kod operacji, który pozwala jednemu kontraktowi wywołać inny, podczas gdy rzeczywiste wykonanie kodu odbywa się w kontekście kontraktu wywołującego. Implikacją użycia `delegatecall` we wzorcach proxy jest to, że kontrakt proxy odczytuje i zapisuje w swojej pamięci oraz wykonuje logikę przechowywaną w kontrakcie logicznym tak, jakby wywoływał funkcję wewnętrzną.

Z [dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Istnieje specjalny wariant wywołania komunikatu, nazwany **delegatecall**, który jest identyczny z wywołaniem komunikatu, z tą różnicą, że kod pod adresem docelowym jest wykonywany w kontekście (tj. pod adresem) kontraktu wywołującego, a `msg.sender` i `msg.value` nie zmieniają swoich wartości._ _Oznacza to, że kontrakt może dynamicznie ładować kod z innego adresu w czasie wykonywania. Pamięć, bieżący adres i saldo nadal odnoszą się do kontraktu wywołującego, tylko kod jest pobierany z wywoływanego adresu._

Kontrakt proxy wie, że ma wywołać `delegatecall` za każdym razem, gdy użytkownik wywoła funkcję, ponieważ ma wbudowaną funkcję `fallback`. W programowaniu w Solidity [funkcja zastępcza](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) jest wykonywana, gdy wywołanie funkcji nie pasuje do funkcji określonych w kontrakcie.

Aby wzorzec proxy zadziałał, należy napisać niestandardową funkcję zastępczą, która określa, w jaki sposób kontrakt proxy powinien obsługiwać wywołania funkcji, których nie obsługuje. W tym przypadku funkcja zastępcza proxy jest zaprogramowana do inicjowania wywołania delegatecall i przekierowywania żądania użytkownika do bieżącej implementacji kontraktu logicznego.

Kontrakt proxy jest domyślnie niezmienny, ale można tworzyć nowe kontrakty logiczne ze zaktualizowaną logiką biznesową. Przeprowadzenie uaktualnienia jest zatem kwestią zmiany adresu kontraktu logicznego, do którego odwołuje się kontrakt proxy.

Poprzez wskazanie kontraktu proxy na nowy kontrakt logiczny, zmienia się kod wykonywany, gdy użytkownicy wywołują funkcję kontraktu proxy. Pozwala to na uaktualnienie logiki kontraktu bez konieczności proszenia użytkowników o interakcję z nowym kontraktem.

Wzorce proxy są popularną metodą uaktualniania inteligentnych kontraktów, ponieważ eliminują trudności związane z migracją kontraktów. Jednak wzorce proxy są bardziej skomplikowane w użyciu i mogą wprowadzać krytyczne wady, takie jak [kolizje selektorów funkcji](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), jeśli są używane niewłaściwie.

[Więcej o wzorcach proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mechanizm uaktualniania nr 4: wzorzec strategii {#strategy-pattern}

Technika ta jest inspirowana [wzorcem strategii](https://en.wikipedia.org/wiki/Strategy_pattern), który zachęca do tworzenia programów, które współdziałają z innymi programami w celu implementacji określonych funkcji. Zastosowanie wzorca strategii w rozwoju Ethereum oznaczałoby zbudowanie inteligentnego kontraktu, który wywołuje funkcje z innych kontraktów.

Główny kontrakt w tym przypadku zawiera podstawową logikę biznesową, ale współdziała z innymi inteligentnymi kontraktami („kontraktami satelitarnymi”) w celu wykonania określonych funkcji. Ten główny kontrakt przechowuje również adres każdego kontraktu satelitarnego i może przełączać się między różnymi implementacjami kontraktu satelitarnego.

Można zbudować nowy kontrakt satelitarny i skonfigurować główny kontrakt z nowym adresem. Pozwala to na zmianę _strategii_ (tj. implementację nowej logiki) dla inteligentnego kontraktu.

Chociaż jest podobny do omówionego wcześniej wzorca proxy, wzorzec strategii jest inny, ponieważ główny kontrakt, z którym wchodzą w interakcję użytkownicy, przechowuje logikę biznesową. Korzystanie z tego wzorca daje możliwość wprowadzenia ograniczonych zmian do inteligentnego kontraktu bez wpływu na podstawową infrastrukturę.

Główną wadą jest to, że wzorzec ten jest przydatny głównie do wprowadzania drobnych uaktualnień. Ponadto, jeśli główny kontrakt zostanie naruszony (np. w wyniku włamania), nie można użyć tej metody uaktualniania.

### Mechanizm uaktualniania nr 5: wzorzec diamentowy {#diamond-pattern}

Wzorzec diamentowy można uznać za ulepszenie wzorca proxy. Wzorce diamentowe różnią się od wzorców proxy, ponieważ diamentowy kontrakt proxy może delegować wywołania funkcji do więcej niż jednego kontraktu logicznego.

Kontrakty logiczne we wzorcu diamentowym są znane jako _facety_. Aby wzorzec diamentowy zadziałał, należy utworzyć w kontrakcie proxy mapowanie, które mapuje [selektory funkcji](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) na różne adresy facet.

Gdy użytkownik wykonuje wywołanie funkcji, kontrakt proxy sprawdza mapowanie, aby znaleźć facet odpowiedzialny za wykonanie tej funkcji. Następnie wywołuje `delegatecall` (używając funkcji zastępczej) i przekierowuje wywołanie do odpowiedniego kontraktu logicznego.

Wzorzec uaktualniania diamentowego ma pewne zalety w stosunku do tradycyjnych wzorców uaktualniania proxy:

1. Pozwala uaktualnić niewielką część kontraktu bez zmiany całego kodu. Użycie wzorca proxy do uaktualnień wymaga utworzenia zupełnie nowego kontraktu logicznego, nawet w przypadku drobnych uaktualnień.

2. Wszystkie inteligentne kontrakty (w tym kontrakty logiczne używane we wzorcach proxy) mają limit rozmiaru 24 KB, co może być ograniczeniem — zwłaszcza w przypadku złożonych kontraktów wymagających większej liczby funkcji. Wzorzec diamentowy ułatwia rozwiązanie tego problemu poprzez podział funkcji na wiele kontraktów logicznych.

3. Wzorce proxy przyjmują uniwersalne podejście do kontroli dostępu. Podmiot mający dostęp do funkcji uaktualniania może zmienić _cały_ kontrakt. Wzorzec diamentowy umożliwia jednak modułowe podejście do uprawnień, w którym można ograniczyć podmioty do uaktualniania tylko określonych funkcji w ramach inteligentnego kontraktu.

[Więcej na temat wzorca diamentowego](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Zalety i wady uaktualniania inteligentnych kontraktów {#pros-and-cons-of-upgrading-smart-contracts}

| Zalety                                                                                                                                                         | Wady                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uaktualnienie inteligentnego kontraktu może ułatwić naprawę luk w zabezpieczeniach wykrytych w fazie po wdrożeniu.                             | Uaktualnianie inteligentnych kontraktów zaprzecza idei niezmienności kodu, co ma implikacje dla decentralizacji i bezpieczeństwa.                                       |
| Deweloperzy mogą używać uaktualnień logiki do dodawania nowych funkcji do zdecentralizowanych aplikacji.                                       | Użytkownicy muszą ufać deweloperom, że nie będą arbitralnie modyfikować inteligentnych kontraktów.                                                                      |
| Uaktualnienia inteligentnych kontraktów mogą poprawić bezpieczeństwo użytkowników końcowych, ponieważ błędy mogą być szybko naprawiane.        | Programowanie funkcjonalności uaktualniania w inteligentnych kontraktach dodaje kolejną warstwę złożoności i zwiększa możliwość wystąpienia krytycznych wad.            |
| Uaktualnienia kontraktów dają deweloperom więcej przestrzeni do eksperymentowania z różnymi funkcjami i ulepszania dapek w miarę upływu czasu. | Możliwość uaktualniania inteligentnych kontraktów może zachęcać deweloperów do szybszego uruchamiania projektów bez zachowania należytej staranności na etapie rozwoju. |
|                                                                                                                                                                | Niezabezpieczona kontrola dostępu lub centralizacja w inteligentnych kontraktach może ułatwić złośliwym podmiotom przeprowadzanie nieautoryzowanych uaktualnień.        |

## Kwestie do rozważenia przy uaktualnianiu inteligentnych kontraktów {#considerations-for-upgrading-smart-contracts}

1. Używaj bezpiecznych mechanizmów kontroli dostępu/autoryzacji, aby zapobiec nieautoryzowanym uaktualnieniom inteligentnych kontraktów, zwłaszcza w przypadku korzystania z wzorców proxy, wzorców strategii lub separacji danych. Przykładem jest ograniczenie dostępu do funkcji uaktualniania w taki sposób, aby tylko właściciel kontraktu mógł ją wywołać.

2. Uaktualnianie inteligentnych kontraktów jest złożonym działaniem i wymaga wysokiego poziomu staranności, aby zapobiec wprowadzeniu luk w zabezpieczeniach.

3. Zmniejsz założenia dotyczące zaufania poprzez decentralizację procesu wdrażania uaktualnień. Możliwe strategie obejmują użycie [kontraktu portfela z wieloma podpisami](/developers/docs/smart-contracts/#multisig) do kontrolowania uaktualnień lub wymaganie od [członków DAO](/dao/) głosowania w sprawie zatwierdzenia uaktualnienia.

4. Należy pamiętać o kosztach związanych z uaktualnianiem kontraktów. Na przykład kopiowanie stanu (np. sald użytkowników) ze starego kontraktu do nowego podczas migracji kontraktu może wymagać więcej niż jednej transakcji, co oznacza wyższe opłaty za gaz.

5. Rozważ wdrożenie **blokad czasowych** w celu ochrony użytkowników. Blokada czasowa odnosi się do opóźnienia narzuconego na zmiany w systemie. Blokady czasowe można połączyć z systemem zarządzania z wieloma podpisami w celu kontrolowania uaktualnień: jeśli proponowane działanie osiągnie wymagany próg zatwierdzenia, nie zostanie wykonane, dopóki nie upłynie z góry określony okres opóźnienia.

Blokady czasowe dają użytkownikom trochę czasu na opuszczenie systemu, jeśli nie zgadzają się z proponowaną zmianą (np. uaktualnieniem logiki lub nowymi schematami opłat). Bez blokad czasowych użytkownicy muszą ufać deweloperom, że nie wprowadzą arbitralnych zmian w inteligentnym kontrakcie bez uprzedniego powiadomienia. Wadą jest to, że blokady czasowe ograniczają możliwość szybkiego łatania luk w zabezpieczeniach.

## Zasoby {#resources}

**Wtyczki uaktualnień OpenZeppelin – _zestaw narzędzi do wdrażania i zabezpieczania uaktualnialnych inteligentnych kontraktów._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentacja](https://docs.openzeppelin.com/upgrades)

## Samouczki {#tutorials}

- [Uaktualnianie inteligentnych kontraktów | samouczek na YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) autorstwa Patricka Collinsa
- [Samouczek migracji inteligentnych kontraktów Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) autorstwa Austina Griffitha
- [Używanie wzorca proxy UUPS do uaktualniania inteligentnych kontraktów](https://blog.logrocket.com/author/praneshas/) autorstwa Pranesh A.S
- [Samouczek Web3: napisz uaktualnialny inteligentny kontrakt (proxy) za pomocą OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) autorstwa fangjun.eth

## Dalsza lektura {#further-reading}

- [Stan uaktualnień inteligentnych kontraktów](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) autorstwa Santiago Palladino
- [Wiele sposobów na uaktualnienie inteligentnego kontraktu Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) – blog Crypto Market Pool
- [Dowiedz się: uaktualnianie inteligentnych kontraktów](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) – dokumentacja OpenZeppelin
- [Wzorce proxy dla możliwości uaktualniania kontraktów Solidity: transparentne vs. UUPS proxy](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) autorstwa Naveena Sahu
- [Jak działają uaktualnienia diamentowe](https://dev.to/mudgen/how-diamond-upgrades-work-417j) autorstwa Nicka Mudge'a
