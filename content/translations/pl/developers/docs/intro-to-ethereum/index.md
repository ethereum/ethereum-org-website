---
title: Wprowadzenie do Ethereum
description: Wprowadzenie programisty aplikacji zdecentralizowanych do podstawowych pojęć Ethereum.
lang: pl
---

## Czym jest blockchain? {#what-is-a-blockchain}

Blockchain to publiczna baza danych, która jest aktualizowana i udostępniana na wielu komputerach w sieci.

„Blok” odnosi się do faktu, że dane i stan są przechowywane w sekwencyjnych partiach lub „blokach”. Jeśli wysyłasz ETH do kogoś innego, dane transakcji muszą zostać dodane do bloku, aby mogły być skuteczne.

„Chain” odnosi się do faktu, że każdy blok kryptograficznie odwołuje się do swojego rodzica (nadrzędnego elementu). Innymi słowy, bloki są łączone w łańcuchy. Dane w bloku nie mogą ulec zmianie bez zmiany wszystkich kolejnych bloków, co wymagałoby konsensusu całej sieci.

Każdy komputer w sieci musi zgodzić się na każdy nowy blok i łańcuch jako całość. Te komputery nazywane są „węzłami”. Węzły zapewniają, że każda osoba wchodząca w interakcję z blockchainem ma te same dane. Aby osiągnąć to rozproszone porozumienie, blockchainy potrzebują mechanizmu konsensusu.

Ethereum wykorzystuje [mechanizm konsensusu oparty na proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Każdy, kto chce dodać nowe bloki do łańcucha, musi stakować ETH — natywną walutę Ethereum — jako zabezpieczenie i uruchomić oprogramowanie walidatora. Te „walidatory” mogą być następnie losowo wybierane do proponowania bloków, które inne walidatory sprawdzają i dodają do blockchainu. Istnieje system nagród i kar, który silnie motywuje uczestników do bycia uczciwymi i dostępnymi online tak długo, jak to możliwe.

Jeśli chcesz zobaczyć, jak dane blockchainu są hashowane, a następnie dołączane do historii odniesień bloków, koniecznie sprawdź [to demo](https://andersbrownworth.com/blockchain/blockchain) Andersa Brownwortha i obejrzyj jego film poniżej.

Zobacz, jak Anders wyjaśnia hashe w blockchainach:

<YouTube id="_160oMzblY8" />

## Co to jest Ethereum? {#what-is-ethereum}

Ethereum to blockchain z wbudowanym komputerem. Jest on podstawą do tworzenia zdecentralizowanych aplikacji i organizacji w sposób zdecentralizowany, niewymagający uprawnień i odporny na cenzurę.

We wszechświecie Ethereum istnieje jeden, kanoniczny komputer (zwany maszyną wirtualną Ethereum lub EVM), z którego stanem zgadzają się wszyscy w sieci Ethereum. Każdy uczestnik sieci Ethereum (każdy węzeł Ethereum) przechowuje kopię stanu tego komputera. Ponadto każdy uczestnik może przesłać do tego komputera żądanie wykonania dowolnych obliczeń. Za każdym razem, gdy takie żądanie jest przesyłane, inni uczestnicy sieci weryfikują, zatwierdzają i przeprowadzają („wykonują”) obliczenia. To wykonanie powoduje zmianę stanu EVM, która jest zatwierdzana i rozpowszechniana w całej sieci.

Żądania o wykonanie obliczeń są nazywane żądaniami transakcji; zapis wszystkich transakcji oraz aktualny stan EVM jest przechowywany w blockchainie, który z kolei jest przechowywany i uzgadniany przez wszystkie węzły.

Mechanizmy kryptograficzne gwarantują, że po zweryfikowaniu transakcji jako poprawnych i dodaniu ich do blockchainu nie można ich później modyfikować. Te same mechanizmy zapewniają również, że wszystkie transakcje są podpisywane i wykonywane z odpowiednimi „uprawnieniami” (nikt nie powinien być w stanie wysyłać zasobów cyfrowych z konta Alice, z wyjątkiem samej Alice).

## Czym jest ether? {#what-is-ether}

**Ether (ETH)** jest natywną kryptowalutą Ethereum. Celem ETH jest umożliwienie rynku obliczeń. Taki rynek stanowi ekonomiczną zachętę dla uczestników do weryfikowania i wykonywania żądań transakcji oraz dostarczania zasobów obliczeniowych do sieci.

Każdy uczestnik, który wysyła żądanie transakcji, musi również zaoferować pewną ilość ETH do sieci jako nagrodę. Sieć spali część tej nagrody, a resztę przyzna temu, kto ostatecznie wykona pracę polegającą na weryfikacji transakcji, wykonaniu jej, zatwierdzeniu jej w blockchainie i rozesłaniu jej do sieci.

Ilość zapłaconych ETH odpowiada zasobom wymaganym do wykonania obliczeń. Nagrody te zapobiegają również celowemu zatykaniu sieci przez złośliwych uczestników poprzez żądanie wykonania nieskończonych obliczeń lub innych skryptów wymagających dużej ilości zasobów, ponieważ uczestnicy ci muszą zapłacić za zasoby obliczeniowe.

ETH jest również wykorzystywane do zapewnienia bezpieczeństwa kryptoekonomicznego sieci na trzy główne sposoby: 1) jest wykorzystywane jako środek do nagradzania walidatorów, którzy proponują bloki lub ujawniają nieuczciwe zachowanie innych walidatorów; 2) jest stakowane przez walidatorów, działając jako zabezpieczenie przed nieuczciwym zachowaniem — jeśli walidatory próbują niewłaściwie postępować, ich ETH mogą zostać zniszczone; 3) jest wykorzystywane do ważenia „głosów” dla nowo proponowanych bloków, zasilając część mechanizmu konsensusu dotyczącą wyboru forka.

## Czym są inteligentne kontrakty? {#what-are-smart-contracts}

W praktyce uczestnicy nie piszą nowego kodu za każdym razem, gdy chcą zażądać obliczeń na EVM. Jest raczej tak, że programiści aplikacji przesyłają programy (fragmenty kodu wielokrotnego użytku) do stanu EVM, a użytkownicy wysyłają żądania wykonania tych fragmentów kodu z różnymi parametrami. Programy przesyłane do sieci i wykonywane przez nią nazywamy inteligentnymi kontraktami.

Na bardzo podstawowym poziomie można myśleć o inteligentnym kontrakcie jak o swego rodzaju automacie: skrypcie, który po wywołaniu z określonymi parametrami wykonuje pewne czynności lub obliczenia, jeśli spełnione są określone warunki. Na przykład, prosty inteligentny kontrakt sprzedawcy może utworzyć i przypisać własność cyfrowego zasobu, jeśli wywołujący wyśle ETH do określonego odbiorcy.

Każdy programista może stworzyć inteligentny kontrakt i upublicznić go w sieci, z użyciem blockchainu jako swojej warstwy danych, za opłatą uiszczoną na rzecz sieci. Każdy użytkownik może następnie wywołać inteligentny kontrakt, aby wykonał jego kod, ponownie za opłatą uiszczoną na rzecz sieci.

Dzięki inteligentnym kontraktom deweloperzy mogą tworzyć i wdrażać dowolnie złożone aplikacje i usługi skierowane do użytkowników, takie jak: rynki, instrumenty finansowe, gry itp.

## Terminologia {#terminology}

### Blockchain {#blockchain}

Sekwencja wszystkich bloków, które zostały zatwierdzone w sieci Ethereum w historii sieci. Nazwa pochodzi od tego, że każdy blok zawiera odniesienie do poprzedniego bloku, co pomaga nam zachować porządek we wszystkich blokach (a tym samym w dokładnej historii).

### ETH {#eth}

**Ether (ETH)** jest natywną kryptowalutą Ethereum. Użytkownicy płacą ETH innym użytkownikom, aby ich żądania wykonania kodu zostały spełnione.

[Więcej na temat ETH](/developers/docs/intro-to-ether/)

### Maszyna Wirtualna Ethereum (EVM) {#evm}

Maszyna wirtualna Ethereum to globalny komputer wirtualny, którego stan przechowuje i akceptuje każdy uczestnik sieci Ethereum. Każdy uczestnik może zażądać wykonania dowolnego kodu na EVM; wykonanie kodu zmienia stan EVM.

[Więcej o EVM](/developers/docs/evm/)

### Węzły {#nodes}

Rzeczywiste maszyny, które przechowują stan EVM. Węzły komunikują się ze sobą w celu rozpowszechniania informacji o stanie EVM i nowych zmianach stanu. Każdy użytkownik może również zażądać wykonania kodu, wysyłając żądanie wykonania kodu z węzła. Sama sieć Ethereum jest sumą wszystkich węzłów Ethereum i ich komunikacji.

[Więcej o węzłach](/developers/docs/nodes-and-clients/)

### Konta {#accounts}

Gdzie przechowywane jest ETH. Użytkownicy mogą inicjować konta, wpłacać ETH na konta i przesyłać ETH ze swoich kont do innych użytkowników. Konta i salda kont są przechowywane w dużej tabeli w EVM; są one częścią ogólnego stanu EVM.

[Więcej o kontach](/developers/docs/accounts/)

### Transakcje {#transactions}

„Żądanie transakcji” to formalny termin oznaczający żądanie wykonania kodu na EVM, a „transakcja” to spełnione żądanie transakcji i związana z nim zmiana stanu EVM. Każdy użytkownik może wysłać żądanie transakcji do sieci z węzła. Aby żądanie transakcji mogło wpłynąć na uzgodniony stan EVM, musi zostać zatwierdzone, wykonane i „zatwierdzone do sieci” przez inny węzeł. Wykonanie dowolnego kodu powoduje zmianę stanu EVM; po zatwierdzeniu ta zmiana stanu jest przesyłana do wszystkich węzłów w sieci. Przykładowe transakcje:

- Wyślij X ETH z mojego konta na konto Alice.
- Opublikuj kod inteligentnego kontraktu do stanu EVM.
- Wykonaj kod inteligentnego kontraktu pod adresem X w EVM, z argumentami Y.

[Więcej o transakcjach](/developers/docs/transactions/)

### Bloki {#blocks}

Wolumen transakcji jest bardzo wysoki, więc transakcje są „zatwierdzane” w partiach lub blokach. Bloki zazwyczaj zawierają od kilkudziesięciu do kilkuset transakcji.

[Więcej o blokach](/developers/docs/blocks/)

### Inteligentne kontrakty {#smart-contracts}

Fragment kodu wielokrotnego użytku (program), który programista umieszcza w stanie EVM. Każdy może zażądać wykonania kodu inteligentnego kontraktu składając żądanie transakcji. Ponieważ programiści mogą pisać dowolne aplikacje wykonywalne w EVM (gry, rynki, instrumenty finansowe itp.) poprzez publikowanie inteligentnych kontraktów, są one często określane jako [dapps lub zdecentralizowane aplikacje](/developers/docs/dapps/).

[Więcej na temat inteligentnych kontraktów](/developers/docs/smart-contracts/)

## Dalsza lektura {#further-reading}

- [Dokumentacja Ethereum](/whitepaper/)
- [Jak w ogóle działa Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) — _Preethi Kasireddy_ (**Chociaż** ten zasób jest nadal wartościowy, należy pamiętać, że pochodzi on sprzed czasu [Połączenia](/roadmap/merge) i dlatego nadal odnosi się do mechanizmu proof-of-work Ethereum — Ethereum jest obecnie zabezpieczone za pomocą [proof-of-stake](/developers/docs/consensus-mechanisms/pos))

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane samouczki {#related-tutorials}

- [Przewodnik programisty po Ethereum, część 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _ — bardzo przyjazne dla początkujących odkrywanie Ethereum przy użyciu Pythona i web3.py_
