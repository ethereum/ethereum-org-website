---
title: Jak uruchomić lekki węzeł za pomocą Geth
description: Jak pobrać, zainstalować i uruchomić Geth. Obejmuje tryby synchronizacji, konsolę JavaScript i nie tylko
author: "Brian Gu"
tags:
  - "klienty"
  - "węzły"
skill: intermediate
lang: pl
published: 2020-06-14
---

Możesz być zainteresowany uruchomieniem [węzła Ethereum](/developers/docs/nodes-and-clients/). Jednym z najprostszych sposobów jest pobieranie, instalowanie i uruchamianie Geth. Dzięki Geth możemy uruchomić lekki węzeł w ciągu kilku minut.

Najpierw musisz [zainstalować Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth).

Po zainstalowaniu Getha uruchomienie pełnego węzła Ethereum jest tak proste, jak pisanie

```bash
$ geth
```

w wierszu poleceń (bez znaku dolara). Nie rób tego jeszcze! Po uruchomieniu `geth` Geth:

- Zainicjuje lokalną kopię EVM w stanie pustym
- Rozpocznie pobieranie wszystkich bloków w historii Ethereum, zaczynając od bloku 0.
- Powtórzy wszystkie transakcje we wszystkich blokach, aby zaktualizować stan EVM każdą transakcją, aż osiągnie stan bieżący.

Ten proces może trwać od godzin do dni i wymaga kilkuset GB wolnego miejsca. Na razie po prostu uruchomimy lekki węzeł w sieci testowej, aby zapoznać się z tym, jak korzystać z Getha. Aby to zrobić, będziemy musieli przejść przez kilka ważnych opcji i narzędzi wiersza poleceń.

## Główna sieć i testnet {#mainnet-and-testnet}

Domyślnie Geth uruchamia węzeł sieci głównej. Możesz uruchomić `geth --testnet`, aby uruchomić pełny węzeł sieci testowej Ropsten. Możesz uruchomić węzeł w Rinkeby, zamieniając `testnet` na `rinkeby`.

[Dowiedz się więcej o różnych sieciach](/developers/docs/networks/).

## Syncmode {#syncmode}

Geth ma trzy `syncmode`.

```bash
$ geth --syncmode "full"
$ geth --syncmode "fast"
$ geth --syncmode "light"
```

`"full"` uruchamia pełny węzeł dokładnie tak, jak można się spodziewać — twoja maszyna inicjuje lokalną kopię EVM w jej oryginalnym czystym stanie, pobiera każdy blok od początku łańcucha bloków i wykonuje każdą transakcję w każdym bloku, aktualizując stan EVM, aż osiągnie obecny stan EVM.

`"fast"` pobiera wszystkie bloki, ale także pobiera ostatnią migawkę stanu EVM z peera (obecnie stan 64 bloków EVM w przeszłości), wykonując transakcje tylko w najnowszych blokach do osiąga aktualny stan EVM. Zaletą `"fast"` jest to, że synchronizacja do obecnego stanu zajmuje znacznie mniej czasu; jednak opiera się na pełnym archiwalnym węźle równorzędnym dla migawki stanu, więc nie weryfikuje wszystkiego dla siebie.

Wreszcie, `"light"` uruchamia lekki węzeł, który omówiliśmy powyżej.

Aby wyjaśnić różnice pomiędzy trzema trybami synchronizacji, zobacz tę [odpowiedź giełdy](https://ethereum.stackexchange.com/questions/11297/what-is-geths-light-sync-and-why-is-it-so-fast).

## Dokumentacja i inne opcje wiersza poleceń {#documentation-and-other-command-line-options}

- [Pełna dokumentacja](https://geth.ethereum.org/docs/)
- [Wszystkie opcje wiersza poleceń](https://geth.ethereum.org/docs/interface/command-line-options)

## Uruchomienie lekkiego węzła {#running-your-light-node}

Uruchomimy lekki węzeł sieci testowej, aby zapoznać się z zarządzaniem węzłem i interakcją z nim. Aby to zrobić, po prostu uruchom

```bash
$ geth --testnet --syncmode "light"
```

Poczekaj kilka sekund i miejmy nadzieję, że otrzymasz dane wyjściowe, które wyglądają mniej więcej tak:

```bash
$ geth --testnet --syncmode "light"
INFO [11-18|14:04:47] Maximum peer count                       ETH=0 LES=100 total=25
INFO [11-18|14:04:47] Starting peer-to-peer node               instance=Geth/v1.8.11-stable/darwin-amd64/go1.10.3
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
INFO [11-18|14:04:47] Persisted trie from memory database      nodes=355 size=51.89kB time=561.839µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [11-18|14:04:47] Initialised chain configuration          config="{ChainID: 3 Homestead: 0 DAO: <nil> DAOSupport: true EIP150: 0 EIP155: 10 EIP158: 10 Byzantium: 1700000 Constantinople: <nil> Engine: ethash}"
INFO [11-18|14:04:47] Disk storage enabled for ethash caches   dir=/Users/bgu/Library/Ethereum/testnet/geth/ethash count=3
INFO [11-18|14:04:47] Disk storage enabled for ethash DAGs     dir=/Users/bgu/.ethash                              count=2
INFO [11-18|14:04:47] Added trusted checkpoint                 chain=ropsten block=3375103 hash=9017ab…249e89
INFO [11-18|14:04:47] Loaded most recent local header          number=0 hash=419410…ca4a2d td=1048576
INFO [11-18|14:04:47] Starting P2P networking
INFO [11-18|14:04:49] UDP listener up                          net=enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303
WARN [11-18|14:04:49] Light client mode is an experimental feature
INFO [11-18|14:04:49] RLPx listener up                         self="enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303?discport=0"
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
INFO [11-18|14:04:51] Mapped network port                      proto=udp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:04:51] Mapped network port                      proto=tcp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:08:55] Block synchronisation started
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=1.574s number=3375295 hash=62f6b1…95c47f ignored=0
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=127.088ms number=3375487 hash=ae759b…453ac5 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=960 elapsed=582.125ms number=3376447 hash=4cab62…445b82 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=169.936ms number=3376639 hash=470614…85ce15 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=384 elapsed=245.745ms number=3377023 hash=dad8ee…2862d2 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=128.514ms number=3377215 hash=ebcd84…ea26cb ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=125.427ms number=3377407 hash=fca10c…8ed04d ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.536ms number=3377599 hash=9aa141…f34080 ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.849ms number=3377791 hash=499f2d…e0c713 ignored=0
```

Uwaga: przez kilka minut, a nawet godzin, jeśli masz szczególnego pecha, możesz nie widzieć komunikatów „Block synchronisation started” i następnie „Imported new block headers”. W tym czasie Twój klient próbuje znaleźć równorzędne pełne węzły, które obsłużą klientów typu light. W powyższym przykładzie możemy stwierdzić po znacznikach czasu, że moja maszyna musiała odczekać około czterech minut między rozpoczęciem wyszukiwania równorzędnych węzłów a faktycznym znalezieniem takiego, z którego można pobrać bloki. Jest to obecnie otwarty problem w społeczności Ethereum — jak zachęcić ludzi do uruchamiania pełnych węzłów, które obsługują klientów typu light?

Gdy rozpocznie się synchronizacja bloków, Twoja maszyna będzie potrzebować kilku minut, aby nadrobić zaległości w najnowszych blokach w łańcuchu bloków. W tym momencie twój wynik zacznie wyglądać tak:

```bash
INFO [11-18|16:06:04.025] Imported new block headers               count=2   elapsed=6.253ms   number=4456862 hash=ce0a0b…6ab128
INFO [11-18|16:06:27.819] Imported new block headers               count=2   elapsed=5.982ms   number=4456864 hash=04a054…b4f661
INFO [11-18|16:06:34.080] Imported new block headers               count=2   elapsed=4.774ms   number=4456866 hash=15a43c…efc782
INFO [11-18|16:06:45.464] Imported new block headers               count=2   elapsed=5.213ms   number=4456868 hash=eb02d5…227564
INFO [11-18|16:07:11.630] Imported new block headers               count=2   elapsed=5.835ms   number=4456870 hash=67daa7…66892d
```

W tym momencie wiadomości zaczną przychodzić co 10-30 sekund, a wartość `count` będzie składać się z pojedynczych cyfr dla każdej wiadomości.

## Gdzie przechowywane są dane z blockchainu i EVM? {#where-is-the-blockchain-and-evm-data-stored}

Katalog, którego Geth używa do przechowywania nieprzetworzonych danych łańcucha bloków, zależy od systemu operacyjnego. Po uruchomieniu Geth poszukaj wiadomości, która wygląda jak

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

Ścieżka po `„database="` powinna Ci powiedzieć, gdzie dane łańcucha bloków są przechowywane na Twoim komputerze. Jeśli używasz pełnego węzła, ten katalog będzie zawierał wszystkie dane o każdym bloku, który kiedykolwiek został przekazany do łańcucha bloków. Ponieważ mamy lekki węzeł, ten katalog zawiera tylko nagłówki bloków.

Warto w tym miejscu podkreślić, że na najniższym poziomie to właśnie tutaj żyje blockchain. Pełna zawartość łańcucha bloków i stan EVM są przechowywane na każdym pełnym węźle w sieci Ethereum, w katalogach, które wyglądają bardzo podobnie do tego na twoim komputerze.

## Dołączanie do konsoli JavaScript {#attaching-to-the-javascript-console}

Uruchamianie węzła nie jest przydatne, chyba że faktycznie możemy z nim wchodzić w interakcje. Na przykład możemy chcieć rozgłaszać żądania transakcji lub wyszukiwać dane EVM/blockchainu (takie jak saldo konta). Geth ma wbudowaną konsolę JavaScript i interfejs API JavaScript o nazwie [web3js](https://github.com/ethereum/web3.js/), którego możesz użyć do interakcji z węzłem.

Aby użyć konsoli JavaScript:

1. Rozpocznij uruchamianie węzła w oknie terminala (zarówno pełny, jak i lekki węzeł są akceptowane).
2. Poszukaj wiadomości, która wygląda tak:

```bash
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
```

Ten komunikat powinien zostać zarejestrowany przed rozpoczęciem synchronizacji bloku.

3. Ten komunikat wskazuje ścieżkę do punktu końcowego IPC (komunikacja między procesami). Skopiuj tę ścieżkę (w powyższym przykładzie jest to `/Users/bgu/Library/Ethereum/testnet/geth.ipc`).
4. Otwórz nowe okno lub kartę terminala i uruchom następujące polecenie: `$ geth attach [ścieżka Twojego punktu końcowego IPC]`

To powinno otworzyć konsolę JavaScript. Możemy teraz używać web3js do interakcji z węzłem.

[Pełna dokumentacja web3js](http://web3js.readthedocs.io/)

Oto kilka przydatnych obiektów udostępnianych przez ten interfejs API. Dostęp do nich można uzyskać, wpisując je w konsoli JavaScript.

- `eth.syncing` zwraca obiekt, jeśli twój węzeł rozpoczął, ale nie zakończył synchronizacji bloku, lub wartość `false`, jeśli zakończył synchronizację lub nie został uruchomiony. Jeśli węzeł nadal się synchronizuje, `eth.syncing` poinformuje Cię o ostatnim numerze bloku, którego dane otrzymałeś, a także o całkowitej liczbie bloków w bieżącym łańcuchu bloków.
- `net.peerCount` zwraca liczbę peerów, z którymi jesteś połączony. Jeśli jest to 0, prawdopodobnie będziesz musiał poczekać kilka minut lub zacząć szukać rozwiązań w Google (może to być zapora sieciowa, problem z siecią lub coś innego).
- `admin.peers` da Ci listę wszystkich peerów z którymi Twój węzeł jest podłączony. Jeśli to jest puste, twój węzeł nie jest połączony z żadnymi innymi peerami.

Możemy również użyć web3js do inicjowania kont, pisania i wysyłania żądań transakcji do sieci, sprawdzania sald kont i metadanych i nie tylko. Omówimy te operacje w dalszej części; na razie spróbuj uruchomić następujące polecenie, aby sprawdzić saldo jednego z moich kont w sieci testowej Ropsten:

```js
eth.getBalance('0x85d918c2B7F172d033D190152AEc58709Fb6D048')
# returns 1059286000000000000 as of 11-18-2018. Ta wartość jest podana w "Wei".
# Jedno Wei jest nominałem, który jest równoważny 10^-18 ether.
# Saldo tego konta w ether wynosi około 1,059 eth.
```

## Zatrzymywanie i ponowne uruchamianie węzła {#stopping-and-restarting-your-node}

Możesz zatrzymać swój węzeł w każdej chwili. Jeśli chcesz zrestartować węzeł, ponowna synchronizacja Geth zajmie kilka sekund lub minut (pobranie bloków i/lub nagłówków bloków od miejsca, w którym zostało przerwane, gdy węzeł ostatnio przestał działać). Jeśli którakolwiek z powyższych instrukcji nie działa, pierwszą rzeczą, którą powinieneś zrobić, to spróbować zrestartować swój węzeł.

Jeśli jesteś zainteresowany uruchomieniem pełnego węzła Ethereum, najlepiej jest to zrobić z dedykowanej maszyny z dobrą łącznością sieciową, a nie z komputera osobistego. Oto przewodnik do uruchomienia węzła z AWS (jest to trochę przestarzałe, a AMI nie są już aktualne lub dostępne, abyś musiał zrobić trochę Googling): [Jak uruchomić węzeł na AWS](https://medium.com/mercuryprotocol/how-to-run-an-ethereum-node-on-aws-a8774ed3acf6)
