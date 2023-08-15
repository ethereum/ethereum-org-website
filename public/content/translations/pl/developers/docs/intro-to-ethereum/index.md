---
title: Wprowadzenie do Ethereum
description: Wprowadzenie dla dewelopera aplikacji zdecentralizowanych do podstawowych pojęć Ethereum.
lang: pl
---

## Czym jest blockchain? {#what-is-a-blockchain}

Blockchain jest najlepiej opisany jako publiczna baza danych, która jest aktualizowana i udostępniana przez wiele komputerów w sieci.

„Blok” odnosi się do faktu, że dane i stan są przechowywane w sekwencyjnych partiach lub „blokach”. Jeśli wysyłasz ETH do kogoś innego, dane transakcji muszą zostać dodane do bloku, aby mogły być skuteczne.

„Chain” odnosi się do faktu, że każdy blok kryptograficznie odwołuje się do swojego nadrzędnego elementu. Dane bloku nie mogą zostać zmienione bez zmiany wszystkich kolejnych bloków, co wymagałoby konsensusu całej sieci.

Każdy nowy blok i cały łańcuch muszą zostać uzgodnione przez każdy węzeł w sieci. Tak więc każdy ma te same dane. Aby to działało, łańcuchy bloków potrzebują mechanizmu konsensusu.

Ethereum korzysta obecnie z mechanizmu konsensusu proof-of-work. Oznacza to, że każdy, kto chce dodać nowe bloki do łańcucha, musi rozwiązać trudną łamigłówkę, co wymaga dużo energii obliczeniowej. Rozwiązywanie łamigłówki dowodzi, że wydałeś zasoby obliczeniowe. Takie działanie jest znane jako [wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/). Wydobywanie może odbywać się metodą prób i błędów, ale pomyślne dodanie bloku jest nagradzane w Eth. Z drugiej strony przesyłanie fałszywych bloków nie jest atrakcyjną opcją, biorąc pod uwagę środki, które wydałeś na produkcję bloku.

Nowe bloki są transmitowane do węzłów w sieci, sprawdzane i weryfikowane, aktualizując stan dla wszystkich.

Podsumowując, kiedy wysyłasz ETH do kogoś, transakcja musi zostać wykopana i uwzględniona w nowym bloku. Zaktualizowany stan jest następnie udostępniany całej sieci. Poniżej podajemy szczegóły.

Zobacz, jak Austin oprowadza Cię po blockchainach:

<YouTube id="zcX7OJ-L8XQ" />

## Co to jest Ethereum? {#what-is-ethereum}

We wszechświecie Ethereum istnieje jeden, kanoniczny komputer (zwany maszyną wirtualną Ethereum lub EVM), którego stan wszyscy w sieci Ethereum akceptują. Każdy, kto uczestniczy w sieci Ethereum (każdy węzeł Ethereum) przechowuje kopię stanu tego komputera. Ponadto każdy uczestnik może przesłać żądanie wykonania dowolnych obliczeń dla tego komputera. W przypadku gdy taki wniosek jest rozsyłany, inni uczestnicy sieci weryfikują, potwierdzają i przeprowadzają obliczenia. Powoduje to zmianę stanu EVM, która zostaje zatwierdzona i rozpowszechniona w całej sieci.

Wnioski o wykonanie obliczeń nazywane są wnioskami transakcyjnymi; zapis wszystkich transakcji oraz aktualny stan EVM przechowywany jest w blockchainie, który z kolei jest przechowywany i uzgadniany przez wszystkie węzły.

Mechanizmy kryptograficzne gwarantują, że gdy transakcje zostaną zweryfikowane jako prawidłowe i dodane do blockchainu, nie będą mogły być później naruszone; te same mechanizmy gwarantują również, że wszystkie transakcje są podpisywane i realizowane za pomocą odpowiednich „zezwoleń” (nikt nie powinien być w stanie wysyłać zasobów cyfrowych z rachunku Alice z wyjątkiem Alice).

## Czym jest eter? {#what-is-ether}

Celem Ether – kryptowaluty – jest umożliwienie istnienia rynku obliczeniowego. Taki rynek stanowi ekonomiczną zachętę dla uczestników do weryfikowania i realizacji wniosków o transakcje oraz dostarczania zasobów obliczeniowych dla sieci.

Każdy uczestnik, który rozsyła wniosek o transakcję, musi również zaoferować pewną ilość eteru w sieci, jako nagrodę przyznawaną każdemu, kto ostatecznie wykonuje pracę polegającą na weryfikacji transakcji, wykonując go, przekazując go do sieci blockchain, i rozsyłając go do sieci.

Ilość płaconego eteru jest funkcją długości obliczeń. Uniemożliwia to również złośliwym uczestnikom celowe rejestrowanie sieci poprzez żądanie wykonania nieskończonych pętli lub skryptów intensywnie wykorzystujących zasoby, ponieważ podmioty te będą stale obciążane.

## Czym są aplikacje zdecentralizowane? {#what-are-dapps}

W praktyce uczestnicy nie zapisują nowego kodu za każdym razem, gdy chcą poprosić o obliczenie na EVM. Deweloperzy aplikacji przesyłają programy (wielokrotne użycie kodu) do przechowywania w EVM, a następnie użytkownicy zwracają się o wykonanie tych fragmentów kodu z różnymi parametrami. Programy przesyłane do sieci i przez nią wykonywane nazywamy inteligentnymi kontraktami.

Na bardzo podstawowym poziomie, można myśleć o inteligentnym kontrakcie jak o swego rodzaju automacie: skrypcie, który po wywołaniu z określonymi parametrami, wykonuje pewne działania lub obliczenia, jeśli spełnione są określone warunki. Na przykład, prosty inteligentny kontrakt sprzedawcy mógłby stworzyć i przypisać własność zasobu cyfrowego, jeśli wywołujący wyśle eter do określonego odbiorcy.

Każdy programista może stworzyć inteligentny kontrakt i upublicznić go w sieci, wykorzystując blockchain jako warstwę danych, za opłatą wniesioną do sieci. Każdy użytkownik może wtedy wezwać inteligentny kontrakt do wykonania swojego kodu, ponownie za opłatą uiszczaną na rzecz sieci.

Dzięki inteligentnym kontraktom deweloperzy mogą tworzyć i wdrażać dowolnie złożone aplikacje i usługi skierowane do użytkownika: rynki, instrumenty finansowe, gry itp.

## Terminologia {#terminology}

### Blockchain {#blockchain}

Sekwencja wszystkich bloków, które były zaangażowane w sieć Ethereum w historii sieci. Nazwany tak, ponieważ każdy blok zawiera odniesienie do poprzedniego bloku, co pomaga nam zachować porządek we wszystkich blokach (a tym samym w dokładnej historii).

### ETH {#eth}

Natywna kryptowaluta Ethereum. Użytkownicy płacą Ethereum innym użytkownikom za spełnienie ich żądań wykonania kodu.

### Maszyna Wirtualna Ethereum (EVM) {#evm}

Maszyna wirtualna Ethereum jest globalnym wirtualnym komputerem, którego stan przechowuje i akceptuje każdy uczestnik sieci Ethereum. Każdy uczestnik może zwrócić się o wykonanie arbitralnego kodu EVM; wykonanie kodu zmienia stan EVM.

[Więcej na temat EVM](/developers/docs/evm/)

### Węzły {#nodes}

Rzeczywiste maszyny, które przechowują stan EVM. Węzły komunikują się ze sobą w celu rozpowszechniania informacji o stanie EVM i nowych zmianach stanu. Każdy użytkownik może również zażądać wykonania kodu poprzez nadawanie żądania wykonania kodu z węzła. Sama sieć Ethereum jest agregatem wszystkich węzłów Ethereum i ich komunikacji.

[Więcej o węzłach](/developers/docs/nodes-and-clients/)

### Konta {#accounts}

Gdzie jest przechowywany eter. Użytkownicy mogą inicjować konta, zdeponować na kontach i przelewać ether ze swoich kont do innych użytkowników. Konta i salda rachunków są przechowywane w dużej tabeli w EVM; są one częścią ogólnego stanu EVM.

[Więcej o kontach](/developers/docs/accounts/)

### Transakcje {#transactions}

„Wniosek o transakcję” jest formalnym terminem składania wniosku o wykonanie kodu w EVM, a „transakcja” jest zrealizowanym żądaniem transakcji i powiązaną zmianą w stanie EVM. Każdy użytkownik może rozsyłać żądanie transakcji do sieci z węzła. Aby żądanie transakcji miało rzeczywisty wpływ na uzgodniony stan EVM, musi być zatwierdzone, wykonane i „zatwierdzone w sieci” przez inny węzeł. Wykonanie dowolnego kodu powoduje zmianę stanu EVM; po zatwierdzeniu ta zmiana stanu jest rozsyłana do wszystkich węzłów w sieci. Niektóre przykłady transakcji:

- Wyślij eter X z mojego konta na konto Alice.
- Opublikuj kod inteligentnego kontraktu w pamięci EVM.
- Wykonaj kod inteligentnego kontraktu pod adresem X w EVM, z argumentami Y.

[Więcej o transakcjach](/developers/docs/transactions/)

### Bloki {#blocks}

Wolumen transakcji jest bardzo wysoki, więc transakcje są „zatwierdzane” w partiach lub blokach. Bloki zazwyczaj zawierają dziesiątki lub setki transakcji.

[Więcej o blokach](/developers/docs/blocks/)

### Inteligentne kontrakty {#smart-contracts}

Wycinek kodu (program) wielokrotnego użytku, który programista umieszcza w pamięci EVM. Każdy może zażądać wykonania kodu inteligentnego kontraktu, składając żądanie transakcji. Ponieważ deweloperzy mogą tworzyć dowolne aplikacje wykonywalne w EVM (gry, rynki, instrumenty finansowe, itp.) poprzez publikowanie inteligentnych kontraktów, są one często nazywane również [aplikacjami zdecentralizowanymi, dapps](/developers/docs/dapps/).

[Więcej na temat inteligentnych kontraktów](/developers/docs/smart-contracts/)

## Dalsza lektura {#further-reading}

- [Dokumentacja Ethereum](/whitepaper/)

## Powiązane samouczki {#related-tutorials}

- [Przewodnik programisty po Ethereum, część 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– A bardzo przyjazna dla początkujących eksploracja Ethereum za pomocą Pythona i web3.py_
