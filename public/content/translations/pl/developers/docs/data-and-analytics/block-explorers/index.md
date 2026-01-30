---
title: Eksploratory bloków
description: Wprowadzenie do eksploratorów bloków, portalu do świata danych blockchain, w którym możesz wyszukiwać informacje o transakcjach, kontach, kontraktach i nie tylko.
lang: pl
sidebarDepth: 3
---

Eksploratory bloków są twoim portalem do danych Ethereum. Można używać ich do śledzenia w czasie rzeczywistym danych o blokach, transakcjach, walidatorach, kontach oraz innych aktywnościach na łańcuchu.

## Wymagania wstępne {#prerequisites}

Powinieneś zrozumieć podstawowe pojęcia Ethereum, abyś mógł zrozumieć dane, które daje Ci eksplorator bloków. Zacznij od [wprowadzenia do Ethereum](/developers/docs/intro-to-ethereum/).

## Usługi {#services}

- [Etherscan](https://etherscan.io/) – _Dostępny również w języku chińskim, koreańskim, rosyjskim i japońskim_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) – _Dostępny również w języku hiszpańskim, francuskim, włoskim, holenderskim, portugalskim, rosyjskim, chińskim i perskim_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [Eksplorator bloków DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) – _Dostępny również w języku chińskim, hiszpańskim, francuskim, tureckim, rosyjskim, koreańskim i wietnamskim_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Ethseer](https://ethseer.io)

## Narzędzia open source {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Dane {#data}

Ethereum jest zgodnie z projektem przezroczyste, więc wszystko jest możliwe do zweryfikowania. Eksploratory bloków zapewniają interfejs do uzyskania tych informacji. Dotyczy to zarówno głównej sieci Ethereum, jak i sieci testowych, jeśli potrzebujesz tych danych. Dane są podzielone na dane wykonania i dane konsensusu. Dane wykonania odnoszą się do transakcji, które zostały zrealizowane w określonym bloku. Dane konsensusu odnoszą się do samych bloków i walidatorów, którzy je zaproponowali.

Oto podsumowanie typów danych, które możesz uzyskać z eksploratora bloków.

### Dane wykonania {#execution-data}

Nowe bloki są dodawane do Ethereum co 12 sekund (chyba że wnioskodawca bloku przegapi swoją kolej), więc eksploratory bloków otrzymują niemal ciągły strumień danych. Bloki zawierają wiele ważnych danych, które mogą okazać się przydatne:

**Dane standardowe**

- Wysokość bloku — numer i długość blockchaina (w blokach) w chwili utworzenia bieżącego bloku
- Znacznik czasowy — czas zaproponowania bloku
- Transakcje — liczba transakcji zawartych w bloku
- Odbiorca opłaty — adres, który otrzymał napiwki z transakcji od opłat za gaz
- Nagroda za blok — kwota w ETH przyznana walidatorowi, który zaproponował blok
- Rozmiar — rozmiar danych w bloku (mierzony w bajtach)
- Zużyty gaz — całkowita ilość jednostek gazu zużyta przez transakcje w bloku
- Limit gazu — całkowite limity gazu określone przez transakcje w bloku
- Opłata podstawowa za gaz — minimalny mnożnik wymagany do uwzględnienia transakcji w bloku
- Spalone opłaty — ile ETH spalono w bloku
- Dodatkowe dane — wszystkie dodatkowe dane, które programista dołączyć do bloku

**Dane zaawansowane**

- Hash — skrót kryptograficzny reprezentujący nagłówek bloku (unikalny identyfikator bloku)
- Hash nadrzędny — skrót bloku, który pojawił się przed bieżącym blokiem
- StateRoot — główny hash drzewa Merkle, który przechowuje cały stan systemu

### Gaz {#gas}

Eksploratory bloków nie tylko dostarczą Ci danych o zużyciu gazu w transakcjach i blokach — niektóre z nich podadzą Ci też informacje o aktualnych cenach gazu w sieci. Pomoże Ci to zrozumieć wykorzystanie sieci, dokonywać bezpiecznych transakcji i nie wydawać zbyt dużo na gaz. Poszukaj interfejsów API, które pomogą Ci uzyskać te informacje w interfejsie Twojego produktu. Dane zależne od gazu obejmują:

- Szacunkowa liczba jednostek gazu potrzebna do bezpiecznej, ale powolnej transakcji (+ szacowana cena i czas trwania)
- Szacowana liczba jednostek gazu potrzebna do przeciętnej transakcji (+ szacunkowa cena i czas trwania)
- Szacowana liczba jednostek gazu potrzebna do szybkiej transakcji (+ szacunkowa cena i czas trwania)
- Średni czas potwierdzenia w zależności od ceny gazu
- Kontrakty, które zużywają gaz — innymi słowy popularne produkty, które mają wiele zastosowań w sieci
- Konta wydające gaz — innymi słowy, regularni użytkownicy sieci

### Transakcje {#transactions}

Eksploratory bloków stały się popularnym miejscem, w którym ludzie mogą śledzić postęp swoich transakcji. Dzieje się tak, ponieważ możliwy do uzyskania poziom szczegółowości zapewnia dodatkową pewność. Dane transakcji obejmują:

**Dane standardowe**

- Hash transakcji — skrót generowany po przesłaniu transakcji
- Status — wskazanie, czy transakcja jest w toku, nie powiodła się, czy też zakończyła się sukcesem
- Blok — blok, w którym uwzględniono transakcję
- Znacznik czasu — dokładny czas włączenia transakcji do bloku zaproponowanego przez walidatora
- Od — adres konta, które przesłało transakcję
- Do — adres odbiorcy lub inteligentnego kontraktu, z którym transakcja wchodzi w interakcję
- Przesłane tokeny — lista tokenów, które zostały przekazane w ramach transakcji
- Wartość — całkowita przekazywana wartość w ETH
- Opłata transakcyjna — kwota zapłacone walidatorowi w celu przetworzenia transakcji (obliczona tak: cena gazu\*użyty gaz)

**Dane zaawansowane**

- Limit gazu — maksymalna liczba jednostek gazu, jaką może zużyć dana transakcja
- Zużyty gaz — faktyczna ilość jednostek gazu zużyta w ramach transakcji
- Cena gazu — ustalona cena jednostki gazu
- Nonce – numer transakcji dla adresu `from` (pamiętaj, że zaczyna się od 0, więc nonce o wartości `100` byłby w rzeczywistości 101. transakcją wysłaną przez to konto)
- Dane wejściowe — wszelkie dodatkowe informacje wymagane przez transakcję

### Konta {#accounts}

Jest mnóstwo danych, które możesz uzyskać na temat konta. Dlatego często zalecane jest używanie wielu kont, aby utrudnić śledzenie Twoich aktywów i wartości. Dostępne są również pewne rozwiązania, dzięki którym transakcje i operacje na kontach będą bardziej prywatne. Oto dostępne dane kont:

**Konta użytkowników**

- Adres konta — publiczny adres, na który możesz wysyłać środki
- Saldo ETH — kwota ETH powiązana z danym kontem
- Całkowita wartość ETH — wartość ETH
- Tokeny — tokeny powiązane z kontem i ich wartość
- Historia transakcji — lista wszystkich transakcji, w których to konto było nadawcą lub odbiorcą

**Inteligentne kontrakty**

Konta inteligentnych kontraktów zawierają wszystkie dane, które zawiera konto użytkownika, ale niektóre eksploratory bloków będą również wyświetlać pewne informacje o kodzie. Przykłady:

- Twórca kontraktu — adres, który wdrożył kontrakt w sieci głównej
- Transakcja utworzenia — transakcja, która obejmowała wdrożenie w sieci głównej
- Kod źródłowy — kod Solidity lub Vyper inteligentnego kontraktu
- ABI (Application Binary Interface) kontraktu — wywołania wykonywane przez kontrakt oraz otrzymane dane
- Kod tworzenia kontraktu — skompilowany kod bajtowy inteligentnego kontraktu, tworzony podczas kompilacji inteligentnego kontraktu napisanego w Solidity lub Vyper itd.
- Zdarzenia kontraktu — historia metod wywołanych w inteligentnym kontrakcie; zasadniczo jest to sposób sprawdzenia, w jaki sposób kontrakt jest używany i jak często

### Tokeny {#tokens}

Token jest typem kontraktu, więc będzie mieć dane podobne do inteligentnego kontraktu. Tokeny mają jednak wartość i mogą być przedmiotem obrotu, mają więc dodatkowe punkty danych:

- Typ — czy są one tokenami standardu ERC-20, ERC-721, czy też innego standardu tokenów
- Cena — jeśli są tokenami ERC-20, będą mieć bieżącą wartość rynkową
- Kapitalizacja rynkowa — jeśli są tokenami ERC-20, będą mieć kapitalizację rynkową (obliczoną na podstawie ceny \ \*całkowitej podaży)
- Całkowita podaż — liczba tokenów znajdujących się w obiegu
- Posiadacze — liczba adresów, które posiadają token
- Transfery — ile razy token został przeniesiony między kontami
- Historia transakcji — historia wszystkich transakcji zawierających token
- Adres kontraktu — adres tokena, który został wdrożony w sieci głównej
- Miejsca dziesiętne — tokeny ERC-20 są podzielne i mają miejsca dziesiętne

### Sieć {#network}

Niektóre dane bloków dotyczą kondycji Ethereum w bardziej holistycznym ujęciu.

- Suma transakcji — liczba transakcji od czasu utworzenia Ethereum
- Transakcje na sekundę — liczba transakcji, które można przetworzyć w ciągu sekundy
- Cena ETH — bieżąca wycena 1 ETH
- Całkowita podaż ETH — liczba ETH w obiegu. Pamiętaj, że nowy ETH powstaje dzięki utworzeniu każdego bloku w postaci nagród za bloki
- Kapitalizacja rynkowa — obliczenie ceny\*podaży

## Dane warstwy konsensusu {#consensus-layer-data}

### Epoka {#epoch}

Ze względów bezpieczeństwa pod koniec każdej epoki (co 6,4 minuty) tworzone są losowe komitety walidatorów. Dane dotyczące epoki obejmują:

- Numer epoki
- Status końcowy — czy epoka została ukończona (Tak/Nie)
- Czas — czas zakończenia epoki
- Poświadczenia — liczba poświadczeń w epoce (głosy za blokami w slotach)
- Depozyty — liczba depozytów ETH zawartych w epoce (walidatorzy muszą zestakować ETH, aby stać się walidatorami)
- Cięcia — liczba kar nałożonych na proponentów bloków lub poświadczających
- Udział w głosowaniu — ilość zestakowanego ETH użyta do poświadczenia bloków
- Walidatorzy — liczba aktywnych walidatorów epoki
- Średnie saldo walidatora — średnie saldo aktywnych walidatorów
- Sloty — liczba slotów w epoce (sloty zawierają jeden ważny blok)

### Slot {#slot}

Sloty to możliwości tworzenia bloków, dane dostępne w przypadku każdego slotu obejmują:

- Epoka — epoka, w której slot jest ważny
- Numer slotu
- Status — status slotu (zaproponowany/pominięty)
- Czas — znacznik czasowy slotu
- Proponujący — walidator, który zaproponował blok do slotu
- Block root — główne drzewo haszujące BeaconBlock
- Root nadrzędny — skrót bloku, który pojawił się wcześniej
- Root stanu — główne drzewo haszujące BeaconState
- Podpis
- Ujawnienie ranDAO
- Graffiti — proponent bloku może zawrzeć 32-bajtową wiadomość w propozycji bloku
- Dane wykonania
  - Hash bloku
  - Liczba depozytów
  - Root depozytu
- Poświadczenia — liczba poświadczeń bloku w tym slocie
- Depozyty — liczba depozytów w tym slocie
- Dobrowolne wyjścia — liczba walidatorów, którzy opuścili slot
- Cięcia — liczba kar nałożonych na proponentów bloków lub poświadczających
- Głosy — walidatorzy, którzy głosowali za blokiem w danym slocie

### Bloki {#blocks-1}

Proof-of stake dzieli czas na sloty i epoki. Oznacza to nowe dane!

- Proponujący — walidator, który został wybrany algorytmicznie do zaproponowania nowego bloku
- Epoka — epoka, w której zaproponowano blok
- Slot — slot, w którym zaproponowano blok
- Poświadczenia — liczba poświadczeń zawartych w slocie. Poświadczenia są jak głosy wskazujące, że blok jest gotowy do przekazania do łańcucha śledzącego

### Walidatorzy {#validators}

Walidatorzy są odpowiedzialni za proponowanie bloków i poświadczanie ich w slotach.

- Numer walidatora — niepowtarzalny numer, który reprezentuje walidatora
- Bieżące saldo — saldo walidatora, w tym nagrody
- Efektywne saldo — saldo walidatora, które jest używane do stakowania
- Dochody — nagrody lub kary otrzymane przez walidatora
- Status — wskazuje, czy walidator jest obecnie online i czy jest aktywny
- Skuteczność poświadczenia — średni czas potrzebny na włączenie poświadczeń walidatora do łańcucha
- Kwalifikowalność do aktywacji — data (i epoka), kiedy walidator stał się dostępny do walidacji
- Aktywny od — data (i epoka), kiedy walidator stał się aktywny
- Proponowane bloki — blok zaproponowany przez walidatora
- Poświadczenia — poświadczenia przedstawione przez walidatora
- Depozyty — adres „od”, hash transakcji, numer bloku, znacznik czasu, kwota i status depozytu zestakowanego przez walidatora

### Poświadczenia {#attestations}

Poświadczenia to głosy „za” włączeniem bloków do łańcucha. Ich dane odnoszą się do zapisu poświadczenia i walidatorów poświadczających

- Slot — slot, w którym odbyło się poświadczenie
- Indeks komitetu — indeks komitetu w danym slocie
- Bity agregacji — zagregowane poświadczenia wszystkich walidatorów uczestniczących w poświadczeniu
- Walidatorzy — walidatorzy, którzy dostarczyli poświadczenia
- Root bloku śledzącego — wskazuje na blok poświadczany przez walidatorów
- Źródło — wskazuje na ostatnią uzasadnioną epokę
- Cel — wskazuje na granicę najnowszej epoki
- Podpis

### Sieć {#network-1}

Dane najwyższego poziomu warstwy konsensusu obejmują:

- Bieżąca epoka
- Bieżący slot
- Aktywni walidatorzy — liczba aktywnych walidatorów
- Walidatorzy oczekujący — liczba walidatorów oczekujących na aktywowanie
- Zestakowane ETH — ilość ETH zestakowana w sieci
- Średnie saldo — średnie saldo walidatorów w ETH

## Eksploratory bloków {#block-explorers}

- [Etherscan](https://etherscan.io/) – eksplorator bloków, którego można użyć do pobierania danych z sieci głównej Ethereum i sieci testowej
- [3xpl](https://3xpl.com/ethereum) – wolny od reklam, open-source'owy eksplorator Ethereum, który umożliwia pobieranie zestawów danych
- [Beaconcha.in](https://beaconcha.in/) – eksplorator bloków open source dla sieci głównej Ethereum i sieci testowej
- [Blockchair](https://blockchair.com/ethereum) – najbardziej prywatny eksplorator Ethereum. Także do sortowania i filtrowania danych (mempool)
- [Etherchain](https://www.etherchain.org/) – eksplorator bloków dla sieci głównej Ethereum
- [Ethplorer](https://ethplorer.io/) – eksplorator bloków skoncentrowany na tokenach dla sieci głównej Ethereum i sieci testowej Kovan

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Transakcje](/developers/docs/transactions/)
- [Konta](/developers/docs/accounts/)
- [Sieci](/developers/docs/networks/)
