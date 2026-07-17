---
title: "Aktualizacja inteligentnych kontraktów"
description: "Przegląd wzorców aktualizacji dla inteligentnych kontraktów Ethereum"
lang: pl
---

Inteligentne kontrakty na Ethereum to samowykonujące się programy działające w maszynie wirtualnej Ethereum (EVM). Programy te są z założenia niezmienne, co zapobiega jakimkolwiek aktualizacjom logiki biznesowej po wdrożeniu kontraktu.

Chociaż niezmienność jest niezbędna dla bezzaufaniowości, decentralizacji i bezpieczeństwa inteligentnych kontraktów, w pewnych przypadkach może być wadą. Na przykład niezmienny kod może uniemożliwić programistom naprawienie podatnych na ataki kontraktów.

Jednakże zintensyfikowane badania nad ulepszaniem inteligentnych kontraktów doprowadziły do wprowadzenia kilku wzorców aktualizacji. Te wzorce aktualizacji umożliwiają programistom aktualizację inteligentnych kontraktów (przy jednoczesnym zachowaniu niezmienności) poprzez umieszczenie logiki biznesowej w różnych kontraktach.

## Wymagania wstępne {#prerequisites}

Powinieneś dobrze rozumieć [inteligentne kontrakty](/developers/docs/smart-contracts/), [anatomię inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/) oraz [maszynę wirtualną Ethereum (EVM)](/developers/docs/evm/). Ten przewodnik zakłada również, że czytelnicy mają pojęcie o programowaniu inteligentnych kontraktów.

## Czym jest aktualizacja inteligentnego kontraktu? {#what-is-a-smart-contract-upgrade}

Aktualizacja inteligentnego kontraktu polega na zmianie logiki biznesowej inteligentnego kontraktu przy jednoczesnym zachowaniu stanu kontraktu. Ważne jest, aby wyjaśnić, że możliwość aktualizacji i zmienność to nie to samo, zwłaszcza w kontekście inteligentnych kontraktów.

Nadal nie można zmienić programu wdrożonego pod danym adresem w sieci Ethereum. Można jednak zmienić kod, który jest wykonywany, gdy użytkownicy wchodzą w interakcję z inteligentnym kontraktem.

Można to zrobić za pomocą następujących metod:

1. Tworzenie wielu wersji inteligentnego kontraktu i migracja stanu (tj. danych) ze starego kontraktu do nowej instancji kontraktu.

2. Tworzenie oddzielnych kontraktów do przechowywania logiki biznesowej i stanu.

3. Używanie wzorców proxy do delegowania wywołań funkcji z niezmiennego kontraktu proxy do modyfikowalnego kontraktu logiki.

4. Tworzenie niezmiennego kontraktu głównego, który łączy się z elastycznymi kontraktami satelitarnymi i polega na nich w celu wykonywania określonych funkcji.

5. Używanie wzorca diamentowego (diamond pattern) do delegowania wywołań funkcji z kontraktu proxy do kontraktów logiki.

### Mechanizm aktualizacji nr 1: Migracja kontraktu {#contract-migration}

Migracja kontraktu opiera się na wersjonowaniu — idei tworzenia i zarządzania unikalnymi stanami tego samego oprogramowania. Migracja kontraktu polega na wdrożeniu nowej instancji istniejącego inteligentnego kontraktu oraz przeniesieniu pamięci masowej i sald do nowego kontraktu.

Nowo wdrożony kontrakt będzie miał pustą pamięć masową, co pozwoli na odzyskanie danych ze starego kontraktu i zapisanie ich w nowej implementacji. Następnie konieczna będzie aktualizacja wszystkich kontraktów, które wchodziły w interakcję ze starym kontraktem, aby odzwierciedlały nowy adres.

Ostatnim krokiem w migracji kontraktu jest przekonanie użytkowników do przejścia na korzystanie z nowego kontraktu. Nowa wersja kontraktu zachowa salda i adresy użytkowników, co pozwala zachować niezmienność. Jeśli jest to kontrakt oparty na tokenach, konieczny będzie również kontakt z giełdami w celu odrzucenia starego kontraktu i użycia nowego.

Migracja kontraktu jest stosunkowo prostym i bezpiecznym środkiem aktualizacji inteligentnych kontraktów bez przerywania interakcji użytkowników. Jednak ręczna migracja pamięci masowej i sald użytkowników do nowego kontraktu jest czasochłonna i może wiązać się z wysokimi kosztami gazu.

[Więcej o migracji kontraktów.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mechanizm aktualizacji nr 2: Separacja danych {#data-separation}

Inną metodą aktualizacji inteligentnych kontraktów jest rozdzielenie logiki biznesowej i przechowywania danych na oddzielne kontrakty. Oznacza to, że użytkownicy wchodzą w interakcję z kontraktem logiki, podczas gdy dane są przechowywane w kontrakcie pamięci masowej.

Kontrakt logiki zawiera kod wykonywany, gdy użytkownicy wchodzą w interakcję z aplikacją. Przechowuje on również adres kontraktu pamięci masowej i wchodzi z nim w interakcję w celu pobierania i ustawiania danych.

Tymczasem kontrakt pamięci masowej przechowuje stan powiązany z inteligentnym kontraktem, taki jak salda i adresy użytkowników. Należy pamiętać, że kontrakt pamięci masowej jest własnością kontraktu logiki i jest konfigurowany z adresem tego drugiego podczas wdrożenia. Zapobiega to wywoływaniu kontraktu pamięci masowej lub aktualizowaniu jego danych przez nieautoryzowane kontrakty.

Domyślnie kontrakt pamięci masowej jest niezmienny — ale można zastąpić kontrakt logiki, na który wskazuje, nową implementacją. Zmieni to kod działający w EVM, zachowując jednocześnie nienaruszoną pamięć masową i salda.

Użycie tej metody aktualizacji wymaga zaktualizowania adresu kontraktu logiki w kontrakcie pamięci masowej. Należy również skonfigurować nowy kontrakt logiki z adresem kontraktu pamięci masowej z powodów wyjaśnionych wcześniej.

Wzorzec separacji danych jest prawdopodobnie łatwiejszy do wdrożenia w porównaniu z migracją kontraktu. Będziesz jednak musiał zarządzać wieloma kontraktami i wdrożyć złożone schematy autoryzacji, aby chronić inteligentne kontrakty przed złośliwymi aktualizacjami.

### Mechanizm aktualizacji nr 3: Wzorce proxy {#proxy-patterns}

Wzorzec proxy również wykorzystuje separację danych, aby utrzymać logikę biznesową i dane w oddzielnych kontraktach. Jednak we wzorcu proxy kontrakt pamięci masowej (zwany proxy) wywołuje kontrakt logiki podczas wykonywania kodu. Jest to odwrotność metody separacji danych, w której kontrakt logiki wywołuje kontrakt pamięci masowej.

Oto co dzieje się we wzorcu proxy:

1. Użytkownicy wchodzą w interakcję z kontraktem proxy, który przechowuje dane, ale nie zawiera logiki biznesowej.

2. Kontrakt proxy przechowuje adres kontraktu logiki i deleguje wszystkie wywołania funkcji do kontraktu logiki (który zawiera logikę biznesową) za pomocą funkcji `delegatecall`.

3. Po przekazaniu wywołania do kontraktu logiki, zwrócone dane z kontraktu logiki są pobierane i zwracane użytkownikowi.

Korzystanie ze wzorców proxy wymaga zrozumienia funkcji **delegatecall**. Zasadniczo `delegatecall` to kod operacji, który pozwala kontraktowi wywołać inny kontrakt, podczas gdy faktyczne wykonanie kodu odbywa się w kontekście kontraktu wywołującego. Konsekwencją użycia `delegatecall` we wzorcach proxy jest to, że kontrakt proxy odczytuje i zapisuje w swojej pamięci masowej oraz wykonuje logikę przechowywaną w kontrakcie logiki tak, jakby wywoływał funkcję wewnętrzną.

Z [dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Istnieje specjalny wariant wywołania wiadomości o nazwie **delegatecall**, który jest identyczny z wywołaniem wiadomości, z tą różnicą, że kod pod adresem docelowym jest wykonywany w kontekście (tj. pod adresem) kontraktu wywołującego, a `msg.sender` i `msg.value` nie zmieniają swoich wartości._ _Oznacza to, że kontrakt może dynamicznie ładować kod z innego adresu w czasie wykonywania. Pamięć masowa, bieżący adres i saldo nadal odnoszą się do kontraktu wywołującego, tylko kod jest pobierany z wywoływanego adresu._

Kontrakt proxy wie, że ma wywołać `delegatecall` za każdym razem, gdy użytkownik wywołuje funkcję, ponieważ ma wbudowaną funkcję `fallback`. W programowaniu w Solidity [funkcja rezerwowa](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) jest wykonywana, gdy wywołanie funkcji nie pasuje do funkcji określonych w kontrakcie.

Aby wzorzec proxy działał, konieczne jest napisanie niestandardowej funkcji rezerwowej, która określa, w jaki sposób kontrakt proxy powinien obsługiwać wywołania funkcji, których nie obsługuje. W tym przypadku funkcja rezerwowa proxy jest zaprogramowana tak, aby zainicjować delegatecall i przekierować żądanie użytkownika do bieżącej implementacji kontraktu logiki.

Kontrakt proxy jest domyślnie niezmienny, ale można tworzyć nowe kontrakty logiki ze zaktualizowaną logiką biznesową. Przeprowadzenie aktualizacji polega wówczas na zmianie adresu kontraktu logiki, do którego odwołuje się kontrakt proxy.

Poprzez wskazanie kontraktowi proxy nowego kontraktu logiki, zmienia się kod wykonywany, gdy użytkownicy wywołują funkcję kontraktu proxy. Pozwala to na aktualizację logiki kontraktu bez proszenia użytkowników o interakcję z nowym kontraktem.

Wzorce proxy są popularną metodą aktualizacji inteligentnych kontraktów, ponieważ eliminują trudności związane z migracją kontraktów. Jednak wzorce proxy są bardziej skomplikowane w użyciu i mogą wprowadzać krytyczne wady, takie jak [kolizje selektorów funkcji](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), jeśli są używane niewłaściwie.

[Więcej o wzorcach proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mechanizm aktualizacji nr 4: Wzorzec strategii {#strategy-pattern}

Technika ta jest inspirowana [wzorcem strategii](https://en.wikipedia.org/wiki/Strategy_pattern), który zachęca do tworzenia programów komputerowych współpracujących z innymi programami w celu wdrożenia określonych funkcji. Zastosowanie wzorca strategii w programowaniu na Ethereum oznaczałoby zbudowanie inteligentnego kontraktu, który wywołuje funkcje z innych kontraktów.

Główny kontrakt w tym przypadku zawiera podstawową logikę biznesową, ale łączy się z innymi inteligentnymi kontraktami („kontraktami satelitarnymi”) w celu wykonywania określonych funkcji. Ten główny kontrakt przechowuje również adres każdego kontraktu satelitarnego i może przełączać się między różnymi implementacjami kontraktu satelitarnego.

Możesz zbudować nowy kontrakt satelitarny i skonfigurować główny kontrakt z nowym adresem. Pozwala to na zmianę _strategii_ (tj. wdrożenie nowej logiki) dla inteligentnego kontraktu.

Chociaż jest podobny do omówionego wcześniej wzorca proxy, wzorzec strategii różni się tym, że główny kontrakt, z którym użytkownicy wchodzą w interakcję, zawiera logikę biznesową. Użycie tego wzorca daje możliwość wprowadzenia ograniczonych zmian w inteligentnym kontrakcie bez wpływu na podstawową infrastrukturę.

Główną wadą jest to, że ten wzorzec jest przydatny głównie do wprowadzania drobnych aktualizacji. Ponadto, jeśli główny kontrakt zostanie naruszony (np. w wyniku ataku hakerskiego), nie można użyć tej metody aktualizacji.

### Mechanizm aktualizacji nr 5: Wzorzec diamentowy {#diamond-pattern}

Wzorzec diamentowy można uznać za ulepszenie wzorca proxy. Wzorce diamentowe różnią się od wzorców proxy tym, że kontrakt proxy diamentu może delegować wywołania funkcji do więcej niż jednego kontraktu logiki.

Kontrakty logiki we wzorcu diamentowym są znane jako _fasety_. Aby wzorzec diamentowy działał, należy utworzyć mapowanie w kontrakcie proxy, które mapuje [selektory funkcji](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) na różne adresy faset.

Gdy użytkownik wykonuje wywołanie funkcji, kontrakt proxy sprawdza mapowanie, aby znaleźć fasetę odpowiedzialną za wykonanie tej funkcji. Następnie wywołuje `delegatecall` (używając funkcji rezerwowej) i przekierowuje wywołanie do odpowiedniego kontraktu logiki.

Diamentowy wzorzec aktualizacji ma pewne zalety w stosunku do tradycyjnych wzorców aktualizacji proxy:

1. Pozwala na aktualizację małej części kontraktu bez zmiany całego kodu. Użycie wzorca proxy do aktualizacji wymaga stworzenia całkowicie nowego kontraktu logiki, nawet w przypadku drobnych aktualizacji.

2. Wszystkie inteligentne kontrakty (w tym kontrakty logiki używane we wzorcach proxy) mają limit rozmiaru 24 KB, co może być ograniczeniem — zwłaszcza w przypadku złożonych kontraktów wymagających większej liczby funkcji. Wzorzec diamentowy ułatwia rozwiązanie tego problemu poprzez podział funkcji na wiele kontraktów logiki.

3. Wzorce proxy przyjmują podejście „wszystko albo nic” do kontroli dostępu. Podmiot mający dostęp do funkcji aktualizacji może zmienić _cały_ kontrakt. Jednak wzorzec diamentowy umożliwia modułowe podejście do uprawnień, w którym można ograniczyć podmiotom możliwość aktualizacji tylko określonych funkcji w ramach inteligentnego kontraktu.

[Więcej o wzorcu diamentowym](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Plusy i minusy aktualizacji inteligentnych kontraktów {#pros-and-cons-of-upgrading-smart-contracts}

| Plusy                                                                                                                                          | Minusy                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktualizacja inteligentnego kontraktu może ułatwić naprawę luk w zabezpieczeniach odkrytych w fazie po wdrożeniu.                              | Aktualizacja inteligentnych kontraktów neguje ideę niezmienności kodu, co ma implikacje dla decentralizacji i bezpieczeństwa.                                           |
| Programiści mogą używać aktualizacji logiki do dodawania nowych funkcji do zdecentralizowanych aplikacji.                                      | Użytkownicy muszą ufać programistom, że nie będą arbitralnie modyfikować inteligentnych kontraktów.                                                                     |
| Aktualizacje inteligentnych kontraktów mogą poprawić bezpieczeństwo użytkowników końcowych, ponieważ błędy można szybko naprawiać.             | Zaprogramowanie funkcjonalności aktualizacji w inteligentnych kontraktach dodaje kolejną warstwę złożoności i zwiększa prawdopodobieństwo wystąpienia krytycznych wad.  |
| Aktualizacje kontraktów dają programistom więcej miejsca na eksperymentowanie z różnymi funkcjami i ulepszanie zdecentralizowanych aplikacji (dapp) z biegiem czasu. | Możliwość aktualizacji inteligentnych kontraktów może zachęcać programistów do szybszego uruchamiania projektów bez zachowania należytej staranności w fazie rozwoju. |
|                                                                                                                                                | Niezabezpieczona kontrola dostępu lub centralizacja w inteligentnych kontraktach może ułatwić złośliwym podmiotom przeprowadzanie nieautoryzowanych aktualizacji.       |

## Kwestie do rozważenia przy aktualizacji inteligentnych kontraktów {#considerations-for-upgrading-smart-contracts}

1. Używaj bezpiecznych mechanizmów kontroli dostępu/autoryzacji, aby zapobiec nieautoryzowanym aktualizacjom inteligentnych kontraktów, zwłaszcza w przypadku korzystania ze wzorców proxy, wzorców strategii lub separacji danych. Przykładem jest ograniczenie dostępu do funkcji aktualizacji w taki sposób, aby mógł ją wywołać tylko właściciel kontraktu.

2. Aktualizacja inteligentnych kontraktów jest złożonym działaniem i wymaga wysokiego poziomu staranności, aby zapobiec wprowadzeniu luk w zabezpieczeniach.

3. Zmniejsz założenia dotyczące zaufania poprzez decentralizację procesu wdrażania aktualizacji. Możliwe strategie obejmują użycie [kontraktu portfela z wieloma podpisami (multi-sig)](/developers/docs/smart-contracts/#multisig) do kontrolowania aktualizacji lub wymaganie od [członków DAO](/dao/) oddania głosu w celu zatwierdzenia aktualizacji.

4. Bądź świadomy kosztów związanych z aktualizacją kontraktów. Na przykład kopiowanie stanu (np. sald użytkowników) ze starego kontraktu do nowego kontraktu podczas migracji kontraktu może wymagać więcej niż jednej transakcji, co oznacza wyższe opłaty za gaz.

5. Rozważ wdrożenie **blokad czasowych (timelocks)** w celu ochrony użytkowników. Blokada czasowa odnosi się do opóźnienia wymuszonego na zmianach w systemie. Blokady czasowe można połączyć z systemem zarządzania multi-sig w celu kontrolowania aktualizacji: jeśli proponowane działanie osiągnie wymagany próg zatwierdzenia, nie zostanie wykonane, dopóki nie upłynie z góry określony czas opóźnienia.

Blokady czasowe dają użytkownikom trochę czasu na wyjście z systemu, jeśli nie zgadzają się z proponowaną zmianą (np. aktualizacją logiki lub nowymi schematami opłat). Bez blokad czasowych użytkownicy muszą ufać programistom, że nie wprowadzą arbitralnych zmian w inteligentnym kontrakcie bez wcześniejszego powiadomienia. Wadą tego rozwiązania jest to, że blokady czasowe ograniczają możliwość szybkiego łatania luk w zabezpieczeniach.

## Zasoby {#resources}

**Wtyczki OpenZeppelin Upgrades - _Zestaw narzędzi do wdrażania i zabezpieczania aktualizowalnych inteligentnych kontraktów._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Dokumentacja](https://docs.openzeppelin.com/upgrades)

## Samouczki {#tutorials}

- [Aktualizacja inteligentnych kontraktów | Samouczek na YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) autorstwa Patricka Collinsa
- [Samouczek migracji inteligentnych kontraktów Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) autorstwa Austina Griffitha
- [Używanie wzorca proxy UUPS do aktualizacji inteligentnych kontraktów](https://blog.logrocket.com/author/praneshas/) autorstwa Pranesha A.S
- [Samouczek Web3: Pisanie aktualizowalnego inteligentnego kontraktu (proxy) przy użyciu OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) autorstwa fangjun.eth

## Dalsza lektura {#further-reading}

- [Stan aktualizacji inteligentnych kontraktów](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) autorstwa Santiago Palladino
- [Wiele sposobów na aktualizację inteligentnego kontraktu w Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - blog Crypto Market Pool
- [Nauka: Aktualizacja inteligentnych kontraktów](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Dokumentacja OpenZeppelin
- [Wzorce proxy dla możliwości aktualizacji kontraktów w Solidity: Transparent vs UUPS Proxies](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) autorstwa Naveena Sahu
- [Jak działają aktualizacje diamentowe](https://dev.to/mudgen/how-diamond-upgrades-work-417j) autorstwa Nicka Mudge'a