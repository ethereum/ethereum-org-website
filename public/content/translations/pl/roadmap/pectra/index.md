---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: "Dowiedz się więcej o aktualizacji protokołu Pectra"
lang: pl
authors: ["Nixo", "Mario Havel"]
---

Aktualizacja sieci Pectra nastąpiła po aktualizacji [Dencun](/roadmap/dencun/) i wprowadziła zmiany zarówno w warstwie wykonawczej, jak i warstwie konsensusu Ethereum. Skrócona nazwa Pectra to połączenie słów Prague i Electra, które są odpowiednimi nazwami zmian w specyfikacji warstwy wykonawczej i warstwy konsensusu. Razem te zmiany przynoszą szereg ulepszeń dla użytkowników, deweloperów i walidatorów [Ethereum](/).

Ta aktualizacja została pomyślnie aktywowana w sieci głównej Ethereum w epoce `364032`, w dniu **7 maja 2025 r. o 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Aktualizacja Pectra to tylko jeden krok w długoterminowych celach rozwojowych Ethereum. Dowiedz się więcej o [mapie drogowej protokołu](/roadmap/) i [poprzednich aktualizacjach](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Ulepszenia w Pectra {#new-improvements}

Pectra wprowadza największą liczbę [EIP](https://eips.ethereum.org/) ze wszystkich dotychczasowych aktualizacji! Zawiera wiele drobnych zmian, ale także kilka znaczących nowych funkcji. Pełną listę zmian i szczegóły techniczne można znaleźć w poszczególnych dołączonych EIP.

### Kod konta EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) stanowi ważny krok w kierunku powszechnej [abstrakcji konta](/roadmap/account-abstraction/). Dzięki tej funkcji użytkownicy mogą ustawić swój adres ([EOA](/glossary/#eoa)), aby został rozszerzony o inteligentny kontrakt. Ten EIP wprowadza nowy typ transakcji o określonej funkcji – pozwala właścicielom adresów podpisać autoryzację, która sprawia, że ich adres naśladuje wybrany inteligentny kontrakt. 

Dzięki temu EIP użytkownicy mogą zdecydować się na programowalne portfele, które umożliwiają nowe funkcje, takie jak grupowanie transakcji, transakcje bez gazu i niestandardowy dostęp do aktywów dla alternatywnych schematów odzyskiwania. To hybrydowe podejście łączy prostotę EOA z programowalnością kont opartych na kontraktach. 

Przeczytaj szczegółową analizę 7702 [tutaj](/roadmap/pectra/7702/)

### Zwiększenie maksymalnego salda efektywnego {#7251}

Obecne saldo efektywne walidatora wynosi dokładnie 32 ETH. Jest to minimalna kwota niezbędna do uczestnictwa w konsensusie, ale jednocześnie maksymalna, jaką pojedynczy walidator może stakować.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) podnosi maksymalne możliwe saldo efektywne do 2048 ETH, co oznacza, że pojedynczy walidator może teraz stakować od 32 do 2048 ETH. Zamiast wielokrotności 32, stakujący mogą teraz wybrać dowolną kwotę ETH do stakowania i otrzymywać nagrody za każde 1 ETH powyżej minimum. Na przykład, jeśli saldo walidatora wzrośnie wraz z jego nagrodami do 33 ETH, dodatkowe 1 ETH jest również uważane za część salda efektywnego i otrzymuje nagrody.

Jednak korzyść z lepszego systemu nagród dla walidatorów to tylko część tego ulepszenia. [Stakujący](/staking/) obsługujący wiele walidatorów mogą teraz połączyć je w jeden, co ułatwia obsługę i zmniejsza obciążenie sieci. Ponieważ każdy walidator w Beacon Chain przesyła podpis w każdej epoce, wymagania dotyczące przepustowości rosną wraz z większą liczbą walidatorów i dużą liczbą podpisów do propagacji. Agregacja walidatorów odciąży sieć i otworzy nowe opcje skalowania przy zachowaniu tego samego bezpieczeństwa ekonomicznego.

Przeczytaj szczegółową analizę MaxEB [tutaj](/roadmap/pectra/maxeb/)

### Zwiększenie przepustowości blobów {#7691}

Bloby zapewniają [dostępność danych](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) dla warstw L2. Zostały one wprowadzone w [poprzedniej aktualizacji sieci](/roadmap/dencun/). 

Obecnie sieć celuje w średnio 3 bloby na blok, z maksymalnie 6 blobami. Dzięki [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) średnia liczba blobów zostanie zwiększona do 6, z maksymalnie 9 na blok, co przełoży się na zwiększoną pojemność dla rollupów Ethereum. Ten EIP pomaga wypełnić lukę, dopóki [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) nie umożliwi jeszcze większej liczby blobów.

### Zwiększenie kosztu danych wywołania {#7623}

Przed wprowadzeniem [blobów w aktualizacji Dencun](/roadmap/danksharding), warstwy L2 używały [danych wywołania](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) do przechowywania swoich danych w Ethereum. Zarówno bloby, jak i dane wywołania wpływają na wykorzystanie przepustowości Ethereum. Chociaż większość bloków wykorzystuje tylko minimalną ilość danych wywołania, bloki obciążone danymi, które zawierają również wiele blobów, mogą być szkodliwe dla sieci p2p Ethereum. 

Aby rozwiązać ten problem, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) zwiększa ceny danych wywołania, ale tylko dla transakcji obciążonych danymi. Ogranicza to rozmiar bloku w najgorszym przypadku, stanowi zachętę dla warstw L2 do używania wyłącznie blobów i pozostawia ponad 99% transakcji bez zmian.

### Wyjścia wyzwalane w warstwie wykonawczej {#7002}

Obecnie wyjście walidatora i [wypłata stakowanego ETH](/staking/withdrawals/) to operacja w warstwie konsensusu, która wymaga aktywnego klucza walidatora, tego samego klucza BLS używanego przez walidatora do wykonywania aktywnych obowiązków, takich jak poświadczenia. Dane uwierzytelniające wypłaty to oddzielny zimny klucz, który otrzymuje wycofaną stawkę, ale nie może wyzwolić wyjścia. Jedynym sposobem na wyjście dla stakujących jest wysłanie specjalnej wiadomości do sieci Beacon Chain podpisanej przy użyciu aktywnego klucza walidatora. Jest to ograniczające w scenariuszach, w których dane uwierzytelniające wypłaty i klucz walidatora są w posiadaniu różnych podmiotów lub gdy klucz walidatora zostanie utracony.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) wprowadza nowy kontrakt, który może zostać użyty do wyzwolenia wyjścia przy użyciu danych uwierzytelniających wypłaty z warstwy wykonawczej. Stakujący będą mogli wyjść ze swojego walidatora, wywołując funkcję w tym specjalnym kontrakcie bez potrzeby posiadania klucza podpisującego walidatora ani dostępu do Beacon Chain. Co ważne, umożliwienie wypłat walidatorów onchain pozwala na protokoły stakingu ze zmniejszonymi założeniami dotyczące zaufania wobec operatorów węzłów.

### Depozyty walidatorów onchain {#6110}

Depozyty walidatorów są obecnie przetwarzane przez [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), co jest funkcją w Beacon Chain, która pobiera dane z warstwy wykonawczej. Jest to swego rodzaju dług technologiczny z czasów przed The Merge, kiedy Beacon Chain był oddzielną siecią i musiał zajmować się reorganizacjami dowodu pracy (PoW). 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) to nowy sposób dostarczania depozytów z warstwy wykonawczej do warstwy konsensusu, który pozwala na natychmiastowe przetwarzanie przy mniejszej złożoności implementacji. Jest to bezpieczniejszy sposób obsługi depozytów natywny dla połączonego Ethereum. Pomaga to również zabezpieczyć protokół na przyszłość, ponieważ nie wymaga historycznych depozytów do uruchomienia węzła, co jest niezbędne do wygasania historii.

### Prekompilat dla BLS12-381 {#2537}

Prekompilaty to specjalny zestaw inteligentnych kontraktów wbudowanych bezpośrednio w Maszynę Wirtualną Ethereum ([EVM](/developers/docs/evm/)). W przeciwieństwie do zwykłych kontraktów, prekompilaty nie są wdrażane przez użytkowników, ale są częścią samej implementacji klienta, napisane w jego natywnym języku (np. Go, Java itp., a nie Solidity). Prekompilaty służą do szeroko stosowanych i ustandaryzowanych funkcji, takich jak operacje kryptograficzne. Deweloperzy inteligentnych kontraktów mogą wywoływać prekompilaty jak zwykły kontrakt, ale z większym bezpieczeństwem i wydajnością.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) dodaje nowe prekompilaty dla operacji na krzywej eliptycznej [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Ta krzywa eliptyczna stała się szeroko stosowana w ekosystemach kryptowalut dzięki swoim praktycznym właściwościom. Mówiąc dokładniej, została przyjęta przez warstwę konsensusu Ethereum, gdzie jest używana przez walidatorów.

Nowy prekompilat dodaje każdemu deweloperowi możliwość łatwego, wydajnego i bezpiecznego wykonywania operacji kryptograficznych przy użyciu tej krzywej, na przykład weryfikacji podpisów. Aplikacje onchain, które zależą od tej krzywej, mogą stać się bardziej wydajne pod względem gazu i bezpieczniejsze, polegając na prekompilacie zamiast na jakimś niestandardowym kontrakcie. Dotyczy to głównie aplikacji, które chcą wnioskować o walidatorach wewnątrz EVM, np. puli stakingowych, [restakingu](/restaking/), lekkich klientów, mostów, ale także rozwiązań z wiedzą zerową.

### Udostępnianie historycznych hashów bloków ze stanu {#2935}

EVM obecnie udostępnia kod operacji `BLOCKHASH`, który umożliwia deweloperom kontraktów pobranie hasha bloku bezpośrednio w warstwie wykonawczej. Jest to jednak ograniczone tylko do ostatnich 256 bloków i może stać się problematyczne dla bezstanowych klientów w przyszłości.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) tworzy nowy kontrakt systemowy, który może udostępniać ostatnie 8192 hashe bloków jako sloty pamięci masowej. Pomaga to zabezpieczyć protokół na przyszłość pod kątem bezstanowego wykonywania i staje się bardziej wydajne po przyjęciu drzew Verkle. Jednak poza tym, rollupy mogą z tego skorzystać od razu, ponieważ mogą bezpośrednio odpytywać kontrakt z dłuższym oknem historycznym.

### Przeniesienie indeksu komitetu poza poświadczenie {#7549}

Konsensus Beacon Chain opiera się na walidatorach oddających swoje głosy na najnowszy blok i sfinalizowaną epokę. Poświadczenie składa się z 3 elementów, z których 2 to głosy, a trzeci to wartość indeksu komitetu.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) przenosi ten indeks poza podpisaną wiadomość poświadczenia, co ułatwia weryfikację i agregację głosów konsensusu. Umożliwi to większą wydajność w każdym kliencie konsensusu i może przynieść znaczną poprawę wydajności obwodów z wiedzą zerową do udowadniania konsensusu Ethereum.

### Dodanie harmonogramu blobów do plików konfiguracyjnych warstwy wykonawczej {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) to prosta zmiana, która dodaje nowe pole do konfiguracji klienta warstwy wykonawczej. Konfiguruje liczbę bloków, umożliwiając dynamiczne ustawienie docelowej i maksymalnej liczby blobów na blok, a także dostosowanie opłaty za blob. Dzięki bezpośrednio zdefiniowanej konfiguracji klienty mogą uniknąć złożoności wymiany tych informacji za pośrednictwem Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Aby dowiedzieć się więcej o tym, jak Pectra wpływa na Ciebie jako użytkownika, dewelopera lub walidatora Ethereum, zapoznaj się z <a href="https://epf.wiki/#/wiki/pectra-faq">FAQ dotyczącym Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Czy ta aktualizacja dotyczy wszystkich węzłów i walidatorów Ethereum? {#client-impact}

Tak, aktualizacja Pectra wymaga aktualizacji zarówno [klientów warstwy wykonawczej, jak i klientów konsensusu](/developers/docs/nodes-and-clients/). Wszystkie główne klienty Ethereum wydadzą wersje obsługujące twarde rozwidlenie oznaczone jako wysoki priorytet. Aby utrzymać synchronizację z siecią Ethereum po aktualizacji, operatorzy węzłów muszą upewnić się, że używają obsługiwanej wersji klienta. Należy pamiętać, że informacje o wydaniach klientów są wrażliwe na czas, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne szczegóły.

## Jak można przekonwertować ETH po twardym rozwidleniu? {#scam-alert}

- **Twoje ETH nie wymaga żadnych działań**: Po aktualizacji Ethereum Pectra nie ma potrzeby konwertowania ani aktualizowania Twojego ETH. Salda Twoich kont pozostaną takie same, a posiadane obecnie ETH pozostanie dostępne w dotychczasowej formie po twardym rozwidleniu.
- **Uwaga na oszustwa!** <Emoji text="⚠️" /> **każdy, kto instruuje Cię, aby „zaktualizować” Twoje ETH, próbuje Cię oszukać.** Nie musisz nic robić w związku z tą aktualizacją. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie poinformowanym to najlepsza obrona przed oszustwami.

[Więcej o rozpoznawaniu i unikaniu oszustw](/security/)

## Wolisz uczyć się wzrokowo? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Co wchodzi w skład aktualizacji Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Aktualizacja Ethereum Pectra: Co stakujący muszą wiedzieć — Blockdaemon_

- [Mapa drogowa Ethereum](/roadmap/)
- [FAQ dotyczące Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Jak Pectra poprawia doświadczenie stakujących](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Strona informacyjna EIP7702](https://eip7702.io/)
- [Sieci deweloperskie Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
