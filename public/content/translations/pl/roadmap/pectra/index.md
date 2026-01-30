---
title: Prague-Electra (Pectra)
description: Poznaj uaktualnienie protokołu Pectra
lang: pl
---

# Pectra {#pectra}

Uaktualnienie sieci Pectra nastąpiło po [Dencun](/roadmap/dencun/) i przyniosło zmiany zarówno w warstwie wykonawczej, jak i konsensusu sieci Ethereum. Skrócona nazwa Pectra to połączenie nazw Prague oraz Electra, które odnoszą się odpowiednio do zmian specyfikacji warstwy wykonawczej i konsensusu. Razem, zmiany te przynoszą szereg usprawnień dla użytkowników, deweloperów i walidatorów Ethereum.

Uaktualnienie zostało pomyślnie aktywowane w sieci głównej Ethereum w epoce `364032`, dnia **7 maja 2025 roku o godzinie 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Uaktualnienie Pectra to tylko jeden z etapów długoterminowych celów rozwojowych Ethereum. Dowiedz się więcej o [planie działania protokołu](/roadmap/) oraz [poprzednich uaktualnieniach](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Usprawnienia wprowadzone w Pectra {#new-improvements}

Pectra wprowadza największą liczbę [EIP-ów](https://eips.ethereum.org/) spośród wszystkich dotychczasowych uaktualnień! Zawiera wiele drobnych zmian, ale także kilka znaczących nowych funkcji. Pełna lista zmian i szczegóły techniczne znajdują się w poszczególnych EIP-ach.

### Kod konta EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) stanowi duży krok w kierunku powszechnej [abstrakcji kont](/roadmap/account-abstraction/). Dzięki tej funkcji użytkownicy mogą ustawić swój adres ([EOA](/glossary/#eoa)) tak, aby został rozszerzony o inteligentny kontakt. EIP wprowadza nowy typ transakcji ze specyficzną funkcją — pozwala właścicielowi adresu podpisać autoryzację, która ustawia jego adres tak, by naśladował wybrany inteligentny kontrakt.

Dzięki temu EIP użytkownicy mogą zdecydować się na portfele programowalne, które umożliwiają korzystanie z nowych funkcji, takich jak grupowanie transakcji, bezgazowe transakcje oraz niestandardowy dostęp do aktywów dla alternatywnych schematów odzyskiwania. To hybrydowe podejście łączy prostotę kont EOA z programowalnością kont opartych na kontraktach.

Więcej informacji na temat EIP-7702 znajdziesz [tutaj](/roadmap/pectra/7702/)

### Zwiększenie maksymalnego efektywnego salda {#7251}

Obecne efektywne saldo walidatora wynosi dokładnie 32 ETH. Jest to minimalna wymagana kwota potrzebna do uczestniczenia w konsensusie, ale jednocześnie maksymalna, jaką pojedynczy walidator może stakować.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) podnosi maksymalne możliwe efektywne saldo do 2048 ETH, co oznacza, że pojedynczy walidator może teraz stakować od 32 do 2048 ETH. Zamiast wielokrotności 32, stakerzy mogą teraz wybrać dowolną kwotę ETH do stakowania i otrzymywać nagrody za każde dodatkowe 1 ETH powyżej minimum. Na przykład, jeśli saldo walidatora wzrośnie dzięki nagrodom do 33 ETH, dodatkowy 1 ETH zostaje również uznany za część efektywnego salda i otrzymuje nagrody.

Korzyść w postaci lepszego systemu nagród dla walidatorów to jednak tylko część tego usprawnienia. [Stakerzy](/staking/) obsługujący wiele walidatorów mogą teraz połączyć je w jednego, co umożliwia łatwiejszą obsługę i zmniejsza obciążenie sieci. Ponieważ każdy walidator w łańcuchu śledzącym przesyła podpis w każdej epoce, wymagania dotyczące przepustowości rosną wraz z większą liczbą walidatorów i podpisów do rozpropagowania. Łączenie walidatorów odciąży sieć i otworzy nowe możliwości skalowania przy zachowaniu tego samego poziomu ekonomicznego bezpieczeństwa.

Więcej informacji na temat maksymalnego efektywnego salda (maxEB) znajdziesz [tutaj](/roadmap/pectra/maxeb/)

### Zwiększenie przepustowości blobów {#7691}

Bloby zapewniają [dostępność danych](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) dla warstw 2. Zostały one wprowadzone w [poprzednim uaktualnieniu sieci](/roadmap/dencun/).

Obecnie sieć celuje w średnio 3 bloby na blok z maksimum wynoszącym 6 blobów. Dzięki [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) średnia liczba blobów zostanie zwiększona do 6, z maksimum wynoszącym 9 blobów na blok, co przełoży się na zwiększoną pojemność dla pakietów zbiorczych Ethereum. Ten EIP pomaga wypełnić lukę do czasu, aż [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) umożliwi jeszcze większe liczby blobów.

### Zwiększenie kosztu calldata {#7623}

Przed wprowadzeniem [blobów w uaktualnieniu Dencun](/roadmap/danksharding), warstwy 2 używały [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) do przechowywania swoich danych w Ethereum. Zarówno bloby, jak i calldata wpływają na wykorzystanie przepustowości Ethereum. Choć większość bloków używa tylko minimalnej ilości calldata, bloki z dużą ilością danych, które zawierają również wiele blobów, mogą być szkodliwe dla sieci p2p Ethereum.

Aby temu zaradzić, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) zwiększa koszty calldata, ale tylko dla transakcji zawierających duże ilości danych. Dzięki temu ograniczany jest najgorszy możliwy rozmiar bloku, warstwy 2 są zachęcane do korzystania wyłącznie z blobów, a ponad 99% transakcji pozostaje bez zmian.

### Wyjścia wyzwalane z warstwy wykonawczej {#7002}

Obecnie wyjście walidatora i [wypłata zestakowanego ETH](/staking/withdrawals/) to operacja wykonywana w warstwie konsensusu, która wymaga aktywnego klucza walidatora, czyli tego samego klucza BLS, którego walidator używa do wykonywania obowiązków, takich jak poświadczanie. Poświadczenia wypłaty to osobny, zimny klucz, który otrzymuje wycofaną stawkę, ale nie może zainicjować wyjścia. Jedynym sposobem stakerów na wyjście jest wysłanie specjalnej wiadomości do sieci łańcucha śledzącego podpisanej aktywnym kluczem walidatora. To ograniczenie jest problematyczne w sytuacjach, gdy poświadczenia wypłaty i klucz walidatora są w posiadaniu różnych podmiotów lub gdy klucz walidatora zostanie zgubiony.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) wprowadza nowy kontrakt, który pozwala wyzwolić wyjście przy użyciu poświadczeń wypłaty z warstwy wykonawczej. Stakerzy będą mogli wyjść swoim walidatorem wywołując funkcję w tym specjalnym kontrakcie, bez potrzeby posiadania klucza walidatora ani bezpośredniego dostępu do łańcucha śledzącego. Co ważne, umożliwienie wypłat walidatorów w łańcuchu pozwala na stosowanie protokołów stakingowych przy zmniejszonym poziomie zaufania do operatorów węzłów.

### Depozyty walidatorów w łańcuchu {#6110}

Obecnie depozyty walidatorów są przetwarzane przez [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), czyli funkcję w łańcuchu śledzącym, która pobiera dane z warstwy wykonawczej. To swego rodzaju dług techniczny z czasów sprzed Połączenia, kiedy łańcuch śledzący był osobną siecią i musiał brać pod uwagę reorganizacje proof-of-work.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) wprowadza nowy sposób przekazywania depozytów z warstwy wykonawczej do warstwy konsensusu, co umożliwia natychmiastowe przetwarzanie i zmniejsza złożoność implementacyjną. To bezpieczniejszy sposób obsługi depozytów, natywny po Połączeniu Ethereum. Pomaga to również zabezpieczyć protokół na przyszłość, ponieważ nie wymaga on historycznych depozytów do uruchomienia węzła, co jest istotne w kontekście wygasania historii.

### Prekompilacja dla BLS12-381 {#2537}

Prekompilacje to specjalny zestaw inteligentnych kontraktów wbudowanych bezpośrednio w maszynę wirtualną Ethereum ([EVM](/developers/docs/evm/)). W przeciwieństwie do zwykłych kontraktów, prekompilacje nie są wdrażane przez użytkowników, lecz stanowią część implementacji klienta, napisaną w jego natywnym języku (np. Go, Java, itp., a nie Solidity). Prekompilacje służą do szeroko stosowanych i znormalizowanych funkcji, takich jak operacje kryptograficzne. Deweloperzy inteligentnych kontraktów mogą wywoływać prekompilacje tak samo, jak zwykłe kontrakty, zyskując przy tym większą wydajność i bezpieczeństwo.

[EIP-2547](https://eips.ethereum.org/EIPS/eip-2537) dodaje nowe prekompilacje dla operacji krzywych w [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Ta krzywa eliptyczna stała się powszechnie stosowana w ekosystemach kryptowalut dzięki swoim praktycznym właściwościom. Dokładniej rzecz biorąc, została ona przyjęta przez warstwę konsensusu Ethereum, gdzie jest używana przez walidatorów.

Nowa prekompilacja umożliwia każdemu deweloperowi łatwe, wydajne i bezpieczne wykonywanie operacji kryptograficznych przy użyciu tej krzywej, np. weryfikację podpisów. Aplikacje w łańcuchu, które polegają na tej krzywej, mogą stać się bardziej wydajne pod względem zużycia gazu i bezpieczniejsze, opierając się na prekompilacji zamiast na niestandardowych kontraktach. Dotyczy to głównie aplikacji, które chcą analizować walidatory wewnątrz EVM, np. pule stakingowe, [restaking](/restaking/), lekkie klienty, mosty, ale także rozwiązania o wiedzy zerowej.

### Obsługa historycznych hashy bloków ze stanu {#2935}

EVM zapewnia obecnie kod operacyjny `BLOCKHASH`, który pozwala deweloperom kontraktów pozyskać hash bloku bezpośrednio w warstwie wykonawczej. Jednak dostępny jest tylko zakres ostatnich 256 bloków, co w przyszłości może stać się problematyczne dla bezstanowych klientów.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) tworzy nowy kontrakt systemowy, który może obsługiwać ostatnie 8192 hashy bloków jako sloty pamięci. Pomaga to zabezpieczyć protokół na przyszłość pod kątem bezstanowego wykonywania i zwiększa jego wydajność w przypadku przyjęcia drzew trie Verkle. Co więcej, pakiety zbiorcze mogą od razu skorzystać z tej zmiany, ponieważ mogą bezpośrednio wysyłać zapytania do kontraktu z dłuższym oknem historycznym.

### Przeniesienie indeksu komitetu poza poświadczenie {#7549}

Konsensus łańcucha śledzącego opiera się na głosach walidatorów oddawanych na najnowszy blok i sfinalizowaną epokę. Poświadczenie składa się z 3 elementów, z których 2 to głosy, a trzeci to wartość indeksu komitetu.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) przenosi ten indeks poza podpisaną wiadomość poświadczającą, co ułatwia weryfikację i agregację głosów konsensusu. Umożliwi to większą wydajność każdego klienta konsensusu i może przynieść znaczną poprawę wydajności obwodów o wiedzy zerowej, które dowodzą konsensus Ethereum.

### Dodanie harmonogramu blobów do plików konfiguracyjnych warstwy wykonawczej {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) to prosta zmiana polegająca na dodaniu nowego pola do konfiguracji klientów warstwy wykonawczej. Pole to definiuje liczbę bloków, umożliwiając dynamiczne ustawianie docelowej i maksymalnej liczby blobów na blok, a także dostosowywanie opłat za bloby. Dzięki bezpośrednio określonej konfiguracji klienty mogą uniknąć złożoności związanej z wymianą tych informacji przez Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Aby dowiedzieć się, jak Pectra wpływa konkretnie na użytkowników Ethereum, deweloperów czy walidatorów, zajrzyj do <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra FAQ</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Czy to uaktualnienie wpływa na wszystkie węzły i walidatory Ethereum? {#client-impact}

Tak, uaktualnienie Pectra wymaga aktualizacji zarówno w [klientach wykonawczych, jak i klientach konsensusu](/developers/docs/nodes-and-clients/). Wszystkie główne klienty Ethereum wydadzą wersję obsługujące ten hard fork oznaczone jako priorytetowe. Aby zachować synchronizację z siecią Ethereum po uaktualnieniu, operatorzy węzłów muszą się upewnić, że korzystają z obsługiwanej wersji klienta. Należy pamiętać, że informacje o wersjach klienta zależą od czasu, a użytkownicy powinni zapoznać się z najnowszymi aktualizacjami, aby uzyskać najbardziej aktualne szczegóły.

## Jak można przekonwertować ETH po hard forku? {#scam-alert}

- **Nic nie musisz robić ze swoim ETH**: po uaktualnieniu Pectra nie ma żadnej potrzeby konwersji lub ulepszenia ETH. Salda Twoich kont pozostaną takie same, a ETH, które obecnie posiadasz, pozostanie dostępne w tej samej formie po hard forku.
- **Uważaj na oszustwa!** <Emoji text="⚠️" /> **Każdy, kto mówi Ci, aby „ulepszyć” ETH, próbuje cię oszukać.** Nie musisz nic robić w związku z tym uaktualnieniem. Twoje aktywa pozostaną całkowicie nienaruszone. Pamiętaj, że bycie na bieżąco jest najlepszą formą obrony przed oszustwami.

[Więcej na temat rozpoznawania i unikania oszustw](/security/)

## Jesteś raczej wzrokowcem? Dla wzrokowców {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Co wprowadza uaktualnienie Pectra? — Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Uaktualnienie Pectra: co muszą wiedzieć stakerzy — Blockdaemon_

## Dalsza lektura {#further-reading}

- [Plan działania Ethereum](/roadmap/)
- [Pectra FAQ](https://epf.wiki/#/wiki/pectra-faq)
- [Strona informacyjna pectra.wtf](https://pectra.wtf)
- [Jak Pectra poprawia doświadczenia użytkowników](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Strona informacyjna EIP7702](https://eip7702.io/)
- [Sieci deweloperskie Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
