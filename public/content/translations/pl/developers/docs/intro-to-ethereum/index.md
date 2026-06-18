---
title: Techniczne wprowadzenie do Ethereum
description: Wprowadzenie do podstawowych koncepcji Ethereum dla programistów zdecentralizowanych aplikacji (dapp).
lang: pl
---

## Czym jest blockchain? {#what-is-a-blockchain}

Blockchain to publiczna baza danych, która jest aktualizowana i współdzielona przez wiele komputerów w sieci.

"Blok" odnosi się do danych i stanu przechowywanych w kolejnych grupach znanych jako "bloki". Jeśli wysyłasz ETH do kogoś innego, dane transakcji muszą zostać dodane do bloku, aby zakończyła się ona sukcesem.

"Łańcuch" odnosi się do faktu, że każdy blok kryptograficznie odwołuje się do swojego rodzica. Innymi słowy, bloki są ze sobą połączone w łańcuch. Dane w bloku nie mogą ulec zmianie bez zmiany wszystkich kolejnych bloków, co wymagałoby konsensusu całej sieci.

Każdy komputer w sieci musi wyrazić zgodę na każdy nowy blok i łańcuch jako całość. Te komputery są znane jako "węzły". Węzły zapewniają, że każdy wchodzący w interakcję z blockchainem ma te same dane. Aby osiągnąć to rozproszone porozumienie, blockchainy potrzebują mechanizmu konsensusu.

[Ethereum](/) wykorzystuje [mechanizm konsensusu oparty na dowodzie stawki (PoS)](/developers/docs/consensus-mechanisms/pos/). Każdy, kto chce dodawać nowe bloki do łańcucha, musi stakować ETH – natywną walutę w Ethereum – jako zabezpieczenie i uruchomić oprogramowanie walidatora. Ci "walidatorzy" mogą być następnie losowo wybierani do proponowania bloków, które inni walidatorzy sprawdzają i dodają do blockchaina. Istnieje system nagród i kar, który silnie motywuje uczestników do bycia uczciwymi i dostępnymi online tak często, jak to możliwe.

Jeśli chcesz zobaczyć, jak dane blockchaina są hashowane, a następnie dołączane do historii odniesień do bloków, koniecznie sprawdź [to demo](https://andersbrownworth.com/blockchain/blockchain) autorstwa Andersa Brownwortha i obejrzyj poniższy film.

Obejrzyj, jak Anders wyjaśnia hashe w blockchainach:

<VideoWatch slug="blockchain-101-visual-demo" />

## Czym jest Ethereum? {#what-is-ethereum}

Ethereum to blockchain z wbudowanym komputerem. Jest to fundament do budowania aplikacji i organizacji w sposób zdecentralizowany, niewymagający pozwoleń i odporny na cenzurę.

W świecie Ethereum istnieje jeden, kanoniczny komputer (zwany Maszyną Wirtualną Ethereum, ang. Ethereum Virtual Machine lub EVM), co do którego stanu zgadzają się wszyscy w sieci Ethereum. Każdy, kto uczestniczy w sieci Ethereum (każdy węzeł Ethereum), przechowuje kopię stanu tego komputera. Dodatkowo, każdy uczestnik może rozgłosić żądanie, aby ten komputer wykonał dowolne obliczenia. Za każdym razem, gdy takie żądanie jest rozgłaszane, inni uczestnicy w sieci weryfikują, walidują i przeprowadzają ("wykonują") te obliczenia. To wykonanie powoduje zmianę stanu w EVM, która jest zatwierdzana i propagowana w całej sieci.

Żądania obliczeń nazywane są żądaniami transakcji; zapis wszystkich transakcji i obecny stan EVM są przechowywane na blockchainie, który z kolei jest przechowywany i uzgadniany przez wszystkie węzły.

Mechanizmy kryptograficzne zapewniają, że po zweryfikowaniu transakcji jako ważnych i dodaniu ich do blockchaina, nie można przy nich później manipulować. Te same mechanizmy zapewniają również, że wszystkie transakcje są podpisywane i wykonywane z odpowiednimi "uprawnieniami" (nikt nie powinien móc wysyłać aktywów cyfrowych z konta Alice, z wyjątkiem samej Alice).

## Czym jest ether? {#what-is-ether}

**Ether (ETH)** to natywna kryptowaluta Ethereum. Celem ETH jest umożliwienie istnienia rynku obliczeń. Taki rynek zapewnia zachętę ekonomiczną dla uczestników do weryfikowania i wykonywania żądań transakcji oraz dostarczania zasobów obliczeniowych do sieci.

Każdy uczestnik, który rozgłasza żądanie transakcji, musi również zaoferować sieci pewną ilość ETH jako nagrodę. Sieć spali część tej nagrody, a resztę przyzna temu, kto ostatecznie wykona pracę polegającą na weryfikacji transakcji, jej wykonaniu, zatwierdzeniu w blockchainie i rozgłoszeniu w sieci.

Ilość zapłaconego ETH odpowiada zasobom wymaganym do wykonania obliczeń. Te nagrody zapobiegają również celowemu zapychaniu sieci przez złośliwych uczestników poprzez żądanie wykonania nieskończonych obliczeń lub innych skryptów wymagających dużych zasobów, ponieważ uczestnicy ci muszą płacić za zasoby obliczeniowe.

ETH jest również wykorzystywane do zapewnienia kryptoekonomicznego bezpieczeństwa sieci na trzy główne sposoby: 1) służy jako środek do nagradzania walidatorów, którzy proponują bloki lub demaskują nieuczciwe zachowanie innych walidatorów; 2) jest stakowane przez walidatorów, działając jako zabezpieczenie przed nieuczciwym zachowaniem – jeśli walidatorzy spróbują zachować się niewłaściwie, ich ETH może zostać zniszczone; 3) służy do ważenia "głosów" na nowo proponowane bloki, co stanowi część mechanizmu konsensusu odpowiedzialną za wybór rozwidlenia (fork-choice).

## Czym są inteligentne kontrakty? {#what-are-smart-contracts}

W praktyce uczestnicy nie piszą nowego kodu za każdym razem, gdy chcą zażądać obliczeń w EVM. Zamiast tego programiści aplikacji wdrażają programy (fragmenty kodu wielokrotnego użytku) do stanu EVM, a użytkownicy zgłaszają żądania wykonania tych fragmentów kodu z różnymi parametrami. Programy wdrożone do sieci i przez nią wykonywane nazywamy "inteligentnymi kontraktami".

Na bardzo podstawowym poziomie można myśleć o inteligentnym kontrakcie jak o automacie sprzedającym: skrypcie, który po wywołaniu z określonymi parametrami wykonuje pewne działania lub obliczenia, jeśli spełnione są określone warunki. Na przykład prosty inteligentny kontrakt sprzedawcy mógłby utworzyć i przypisać własność aktywa cyfrowego, jeśli wywołujący wyśle ETH do określonego odbiorcy.

Każdy programista może utworzyć inteligentny kontrakt i udostępnić go publicznie w sieci, wykorzystując blockchain jako warstwę danych, za opłatą uiszczaną na rzecz sieci. Każdy użytkownik może następnie wywołać inteligentny kontrakt, aby wykonać jego kod, ponownie za opłatą uiszczaną na rzecz sieci.

Dzięki inteligentnym kontraktom programiści mogą budować i wdrażać dowolnie złożone aplikacje i usługi skierowane do użytkowników, takie jak: rynki, instrumenty finansowe, gry itp.

## Terminologia {#terminology}

### Blockchain {#blockchain}

Sekwencja wszystkich bloków, które zostały zatwierdzone w sieci Ethereum w historii sieci. Nazwa wzięła się stąd, że każdy blok zawiera odniesienie do poprzedniego bloku, co pomaga nam utrzymać porządek wszystkich bloków (a tym samym dokładną historię).

### ETH {#eth}

**Ether (ETH)** to natywna kryptowaluta Ethereum. Użytkownicy płacą ETH innym użytkownikom za realizację ich żądań wykonania kodu.

[Więcej o ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Maszyna Wirtualna Ethereum (EVM) to globalny wirtualny komputer, którego stan przechowuje i uzgadnia każdy uczestnik sieci Ethereum. Każdy uczestnik może zażądać wykonania dowolnego kodu w EVM; wykonanie kodu zmienia stan EVM.

[Więcej o EVM](/developers/docs/evm/)

### Węzły {#nodes}

Rzeczywiste maszyny, które przechowują stan EVM. Węzły komunikują się ze sobą w celu propagowania informacji o stanie EVM i nowych zmianach stanu. Każdy użytkownik może również zażądać wykonania kodu, rozgłaszając żądanie wykonania kodu z węzła. Sama sieć Ethereum jest zbiorem wszystkich węzłów Ethereum i ich komunikacji.

[Więcej o węzłach](/developers/docs/nodes-and-clients/)

### Konta {#accounts}

Miejsce, w którym przechowywane jest ETH. Użytkownicy mogą inicjować konta, wpłacać na nie ETH i transferować ETH ze swoich kont do innych użytkowników. Konta i ich salda są przechowywane w dużej tabeli w EVM; są one częścią ogólnego stanu EVM.

[Więcej o kontach](/developers/docs/accounts/)

### Transakcje {#transactions}

"Żądanie transakcji" to formalne określenie żądania wykonania kodu w EVM, a "transakcja" to zrealizowane żądanie transakcji i powiązana z nim zmiana stanu EVM. Każdy użytkownik może rozgłosić żądanie transakcji do sieci z węzła. Aby żądanie transakcji wpłynęło na uzgodniony stan EVM, musi zostać zwalidowane, wykonane i "zatwierdzone w sieci" przez inny węzeł. Wykonanie dowolnego kodu powoduje zmianę stanu w EVM; po zatwierdzeniu ta zmiana stanu jest rozgłaszana do wszystkich węzłów w sieci. Kilka przykładów transakcji:

- Wyślij X ETH z mojego konta na konto Alice.
- Opublikuj kod inteligentnego kontraktu w stanie EVM.
- Wykonaj kod inteligentnego kontraktu pod adresem X w EVM, z argumentami Y.

[Więcej o transakcjach](/developers/docs/transactions/)

### Bloki {#blocks}

Wolumen transakcji jest bardzo wysoki, więc transakcje są "zatwierdzane" w partiach, czyli blokach. Bloki zazwyczaj zawierają od kilkudziesięciu do kilkuset transakcji.

[Więcej o blokach](/developers/docs/blocks/)

### Inteligentne kontrakty {#smart-contracts}

Fragment kodu wielokrotnego użytku (program), który programista publikuje w stanie EVM. Każdy może zażądać wykonania kodu inteligentnego kontraktu, składając żądanie transakcji. Ponieważ programiści mogą pisać dowolne aplikacje wykonywalne w EVM (gry, rynki, instrumenty finansowe itp.) poprzez publikowanie inteligentnych kontraktów, są one często nazywane [zdecentralizowanymi aplikacjami (dapp)](/developers/docs/dapps/).

[Więcej o inteligentnych kontraktach](/developers/docs/smart-contracts/)

## Co dalej {#where-to-go-next}

Większość czytelników czyta dokumentację po kolei, ale najkrótsza ścieżka zależy od tego, co próbujesz zbudować:

- **Zdecentralizowane aplikacje (dapp) wchodzące w interakcję z Ethereum:** [konta](/developers/docs/accounts/) i [transakcje](/developers/docs/transactions/), a następnie wybierz [framework](/developers/docs/frameworks/).
- **Tworzenie inteligentnych kontraktów:** [inteligentne kontrakty](/developers/docs/smart-contracts/) i [języki programowania](/developers/docs/programming-languages/).
- **Węzły i staking:** [węzły i klienci](/developers/docs/nodes-and-clients/), a następnie [mechanizmy konsensusu](/developers/docs/consensus-mechanisms/).

## Dalsza lektura {#further-reading}

- [Biała księga Ethereum](/whitepaper/)
- [Jak właściwie działa Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) – _Preethi Kasireddy_ (**Uwaga:** ten zasób jest nadal wartościowy, ale pamiętaj, że powstał przed [The Merge](/roadmap/merge) i dlatego nadal odnosi się do mechanizmu dowodu pracy (PoW) w Ethereum – obecnie Ethereum jest zabezpieczone za pomocą [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos))

### Wolisz uczyć się wzrokowo? {#visual-learner}

Ta seria filmów oferuje dokładne omówienie podstawowych tematów:

<VideoWatch slug="ethereum-basics-intro" />

[Playlista z podstawami Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane samouczki {#related-tutorials}

- [Przewodnik po Ethereum dla programistów, część 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Bardzo przyjazne dla początkujących wprowadzenie do Ethereum z użyciem języka Python i biblioteki web3.py_