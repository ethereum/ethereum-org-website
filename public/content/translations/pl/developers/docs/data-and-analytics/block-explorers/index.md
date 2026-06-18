---
title: Eksploratory bloków
description: Wprowadzenie do eksploratorów bloków, Twojego portalu do świata danych blockchain, gdzie możesz wyszukiwać informacje o transakcjach, kontach, kontraktach i nie tylko.
lang: pl
sidebarDepth: 3
---

Eksploratory bloków to Twój portal do danych Ethereum. Możesz ich używać do przeglądania w czasie rzeczywistym danych o blokach, transakcjach, walidatorach, kontach i innej aktywności onchain.

## Wymagania wstępne {#prerequisites}

Powinieneś zrozumieć podstawowe koncepcje Ethereum, aby móc zinterpretować dane, które dostarcza eksplorator bloków. Zacznij od [wprowadzenia do Ethereum](/developers/docs/intro-to-ethereum/).

## Narzędzia open source {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) – Eksplorator Ethereum bez reklam, który umożliwia pobieranie jego zestawów danych (open-core: główne moduły są open source)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Usługi {#services}

- [Blockchair](https://blockchair.com/ethereum) – Prywatny eksplorator Ethereum. Służy również do sortowania i filtrowania danych (mempool). Dostępny w języku hiszpańskim, francuskim, włoskim, holenderskim, portugalskim, rosyjskim, chińskim i perskim
- [Chainlens](https://www.chainlens.com/)
- [Eksplorator bloków DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) – Dostępny również w języku chińskim, koreańskim, rosyjskim i japońskim
- [Ethplorer](https://ethplorer.io/) – Eksplorator bloków skupiający się na tokenach. Dostępny również w języku chińskim, hiszpańskim, francuskim, tureckim, rosyjskim, koreańskim i wietnamskim
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Dane {#data}

Ethereum jest z założenia transparentne, więc wszystko można zweryfikować. Eksploratory bloków zapewniają interfejs do uzyskiwania tych informacji. Dotyczy to zarówno głównej sieci Ethereum, jak i sieci testowych, jeśli potrzebujesz takich danych. Dane dzielą się na dane wykonawcze i dane konsensusu. Dane wykonawcze odnoszą się do transakcji, które zostały wykonane w określonym bloku. Dane konsensusu odnoszą się do samych bloków i walidatorów, którzy je zaproponowali.

Oto podsumowanie rodzajów danych, które można uzyskać z eksploratora bloków.

### Dane wykonawcze {#execution-data}

Nowe bloki są dodawane do Ethereum co 12 sekund (chyba że proponujący blok pominie swoją kolej), więc do eksploratorów bloków trafia niemal stały strumień danych. Bloki zawierają wiele ważnych danych, które mogą okazać się przydatne:

**Dane standardowe**

- Wysokość bloku – Numer bloku i długość blockchaina (w blokach) w momencie utworzenia bieżącego bloku
- Znacznik czasu – Czas, w którym blok został zaproponowany
- Transakcje – Liczba transakcji zawartych w bloku
- Odbiorca opłaty – Adres, który otrzymał napiwki z opłat za gaz z transakcji
- Nagroda za blok – Ilość ETH przyznana walidatorowi, który zaproponował blok
- Rozmiar – Rozmiar danych w bloku (mierzony w bajtach)
- Zużyty gaz – Całkowita liczba jednostek gazu zużytych przez transakcje w bloku
- Limit gazu – Całkowite limity gazu ustalone przez transakcje w bloku
- Opłata podstawowa za gaz – Minimalny mnożnik wymagany, aby transakcja została włączona do bloku
- Spalone opłaty – Ilość ETH spalona w bloku
- Dodatkowe dane – Wszelkie dodatkowe dane, które budowniczy dołączył do bloku

**Dane zaawansowane**

- Hash – Kryptograficzny hash reprezentujący nagłówek bloku (unikalny identyfikator bloku)
- Hash rodzica – Hash bloku, który poprzedzał bieżący blok
- StateRoot – Główny hash drzewa Merkle, które przechowuje cały stan systemu

### Gaz {#gas}

Eksploratory bloków nie tylko dostarczają danych o zużyciu gazu w transakcjach i blokach, ale niektóre z nich podają również informacje o aktualnych cenach gazu w sieci. Pomoże Ci to zrozumieć wykorzystanie sieci, przesyłać bezpieczne transakcje i nie przepłacać za gaz. Zwróć uwagę na API, które mogą pomóc Ci zintegrować te informacje z interfejsem Twojego produktu. Dane specyficzne dla gazu obejmują:

- Szacunkową liczbę jednostek gazu potrzebnych do bezpiecznej, ale wolnej transakcji (+ szacunkowa cena i czas trwania)
- Szacunkową liczbę jednostek gazu potrzebnych do przeciętnej transakcji (+ szacunkowa cena i czas trwania)
- Szacunkową liczbę jednostek gazu potrzebnych do szybkiej transakcji (+ szacunkowa cena i czas trwania)
- Średni czas potwierdzenia na podstawie ceny gazu
- Kontrakty zużywające gaz – innymi słowy, popularne produkty, które są intensywnie używane w sieci
- Konta wydające gaz – innymi słowy, częstych użytkowników sieci

### Transakcje {#transactions}

Eksploratory bloków stały się powszechnym miejscem, w którym ludzie śledzą postęp swoich transakcji. Wynika to z faktu, że poziom szczegółowości, jaki można uzyskać, zapewnia dodatkową pewność. Dane transakcji obejmują:

**Dane standardowe**

- Hash transakcji – Hash generowany w momencie przesłania transakcji
- Status – Wskazanie, czy transakcja jest oczekująca, zakończona niepowodzeniem, czy sukcesem
- Blok – Blok, w którym transakcja została zawarta
- Znacznik czasu – Czas, w którym transakcja została włączona do bloku zaproponowanego przez walidatora
- Od (From) – Adres konta, które przesłało transakcję
- Do (To) – Adres odbiorcy lub inteligentnego kontraktu, z którym transakcja wchodzi w interakcję
- Przesłane tokeny – Lista tokenów, które zostały przesłane w ramach transakcji
- Wartość – Całkowita przesyłana wartość ETH
- Opłata transakcyjna – Kwota zapłacona walidatorowi za przetworzenie transakcji (obliczana jako cena gazu \* zużyty gaz)

**Dane zaawansowane**

- Limit gazu – Maksymalna liczba jednostek gazu, jaką może zużyć ta transakcja
- Zużyty gaz – Rzeczywista liczba jednostek gazu zużytych przez transakcję
- Cena gazu – Cena ustalona za jednostkę gazu
- Nonce – Numer transakcji dla adresu `from` (pamiętaj, że zaczyna się od 0, więc nonce wynoszące `100` byłoby w rzeczywistości 101. transakcją przesłaną przez to konto)
- Dane wejściowe – Wszelkie dodatkowe informacje wymagane przez transakcję

### Konta {#accounts}

Istnieje wiele danych, do których można uzyskać dostęp na temat konta. Dlatego często zaleca się korzystanie z wielu kont, aby Twoje aktywa i ich wartość nie mogły być łatwo śledzone. Opracowywane są również rozwiązania mające na celu zwiększenie prywatności transakcji i aktywności na koncie. Oto dane dostępne dla kont:

**Konta użytkowników**

- Adres konta – Publiczny adres, na który można wysyłać środki
- Saldo ETH – Ilość ETH powiązana z tym kontem
- Całkowita wartość ETH – Wartość posiadanego ETH
- Tokeny – Tokeny powiązane z kontem i ich wartość
- Historia transakcji – Lista wszystkich transakcji, w których to konto było nadawcą lub odbiorcą

**Inteligentne kontrakty**

Konta inteligentnych kontraktów posiadają wszystkie dane, które ma konto użytkownika, ale niektóre eksploratory bloków wyświetlają również pewne informacje o kodzie. Przykłady obejmują:

- Twórca kontraktu – Adres, który wdrożył kontrakt do Sieci głównej
- Transakcja utworzenia – Transakcja, która obejmowała wdrożenie do Sieci głównej
- Kod źródłowy – Kod w języku Solidity lub Vyper inteligentnego kontraktu
- ABI kontraktu – Interfejs binarny aplikacji (ABI) kontraktu — wywołania wykonywane przez kontrakt i otrzymywane dane
- Kod tworzenia kontraktu – Skompilowany kod bajtowy inteligentnego kontraktu — tworzony podczas kompilacji inteligentnego kontraktu napisanego w Solidity, Vyper itp.
- Zdarzenia kontraktu – Historia metod wywoływanych w inteligentnym kontrakcie — w zasadzie sposób na sprawdzenie, jak kontrakt jest używany i jak często

### Tokeny {#tokens}

Tokeny są rodzajem kontraktu, więc będą miały dane podobne do inteligentnego kontraktu. Ponieważ jednak mają wartość i można nimi handlować, posiadają dodatkowe punkty danych:

- Typ – Czy jest to ERC-20, ERC-721, czy inny standard tokena
- Cena – Jeśli są to tokeny ERC-20, będą miały aktualną wartość rynkową
- Kapitalizacja rynkowa – Jeśli są to tokeny ERC-20, będą miały kapitalizację rynkową (obliczaną jako cena \* całkowita podaż)
- Całkowita podaż – Liczba tokenów w obiegu
- Posiadacze – Liczba adresów, które przechowują token
- Transfery – Liczba transferów tokena między kontami
- Historia transakcji – Historia wszystkich transakcji obejmujących token
- Adres kontraktu – Adres tokena, który został wdrożony do Sieci głównej
- Miejsca dziesiętne – Tokeny ERC-20 są podzielne i mają miejsca dziesiętne

### Sieć {#network}

Niektóre dane bloków dotyczą kondycji Ethereum w sposób bardziej całościowy.

- Całkowita liczba transakcji – Liczba transakcji od momentu powstania Ethereum
- Transakcje na sekundę – Liczba transakcji możliwych do przetworzenia w ciągu sekundy
- Cena ETH – Aktualna wycena 1 ETH
- Całkowita podaż ETH – Liczba ETH w obiegu — pamiętaj, że nowe ETH jest tworzone wraz z utworzeniem każdego bloku w formie nagród za blok
- Kapitalizacja rynkowa – Obliczenie cena \* podaż

## Dane warstwy konsensusu {#consensus-layer-data}

### Epoka {#epoch}

Ze względów bezpieczeństwa pod koniec każdej epoki (co 6,4 minuty) tworzone są losowe komitety walidatorów. Dane epoki obejmują:

- Numer epoki
- Status sfinalizowania – Czy epoka została sfinalizowana (Tak/Nie)
- Czas – Czas zakończenia epoki
- Poświadczenia – Liczba poświadczeń w epoce (głosy na bloki w ramach slotów)
- Depozyty – Liczba depozytów ETH uwzględnionych w epoce (walidatorzy muszą stakować ETH, aby zostać walidatorami)
- Cięcia (slashings) – Liczba kar nałożonych na proponujących bloki lub poświadczających
- Udział w głosowaniu – Ilość stakowanego ETH użytego do poświadczania bloków
- Walidatorzy – Liczba walidatorów aktywnych w danej epoce
- Średnie saldo walidatora – Średnie saldo aktywnych walidatorów
- Sloty – Liczba slotów zawartych w epoce (sloty zawierają jeden prawidłowy blok)

### Slot {#slot}

Sloty to okazje do tworzenia bloków, dane dostępne dla każdego slotu obejmują:

- Epoka – Epoka, w której slot jest ważny
- Numer slotu
- Status – Status slotu (Zaproponowany/Pominięty)
- Czas – Znacznik czasu slotu
- Proponujący – Walidator, który zaproponował blok dla slotu
- Główny hash bloku (Block root) – Główny hash drzewa (hash-tree-root) bloku śledzącego (BeaconBlock)
- Główny hash rodzica (Parent root) – Hash bloku, który go poprzedzał
- Główny hash stanu (State root) – Główny hash drzewa (hash-tree-root) stanu śledzącego (BeaconState)
- Podpis
- Ujawnienie RANDAO
- Graffiti – Proponujący blok może dołączyć 32-bajtową wiadomość do swojej propozycji bloku
- Dane wykonawcze
  - Hash bloku
  - Liczba depozytów
  - Główny hash depozytu (Deposit root)
- Poświadczenia – Liczba poświadczeń dla bloku w tym slocie
- Depozyty – Liczba depozytów w tym slocie
- Dobrowolne wyjścia – Liczba walidatorów, którzy odeszli w trakcie trwania slotu
- Cięcia (slashings) – Liczba kar nałożonych na proponujących bloki lub poświadczających
- Głosy – Walidatorzy, którzy głosowali na blok w tym slocie

### Bloki {#blocks-1}

Dowód stawki (PoS) dzieli czas na sloty i epoki. Oznacza to nowe dane!

- Proponujący – Walidator, który został algorytmicznie wybrany do zaproponowania nowego bloku
- Epoka – Epoka, w której zaproponowano blok
- Slot – Slot, w którym zaproponowano blok
- Poświadczenia – Liczba poświadczeń uwzględnionych w slocie — poświadczenia są jak głosy wskazujące, że blok jest gotowy do przejścia do Beacon Chain

### Walidatorzy {#validators}

Walidatorzy są odpowiedzialni za proponowanie bloków i poświadczanie ich w ramach slotów.

- Numer walidatora – Unikalny numer reprezentujący walidatora
- Bieżące saldo – Saldo walidatora uwzględniające nagrody
- Saldo efektywne – Saldo walidatora, które jest używane do stakingu
- Dochód – Nagrody lub kary otrzymane przez walidatora
- Status – Czy walidator jest obecnie online i aktywny, czy nie
- Skuteczność poświadczeń – Średni czas potrzebny na włączenie poświadczeń walidatora do łańcucha
- Kwalifikowalność do aktywacji – Data (i epoka), kiedy walidator stał się dostępny do walidacji
- Aktywny od – Data (i epoka), kiedy walidator stał się aktywny
- Zaproponowane bloki – Bloki, które walidator zaproponował
- Poświadczenia – Poświadczenia, które walidator dostarczył
- Depozyty – Adres nadawcy, hash transakcji, numer bloku, znacznik czasu, kwota i status depozytu stakingowego złożonego przez walidatora

### Poświadczenia {#attestations}

Poświadczenia to głosy na „tak” za włączeniem bloków do łańcucha. Ich dane odnoszą się do zapisu poświadczenia i walidatorów, którzy poświadczyli

- Slot – Slot, w którym miało miejsce poświadczenie
- Indeks komitetu – Indeks komitetu w danym slocie
- Bity agregacji – Reprezentują zagregowane poświadczenie wszystkich walidatorów uczestniczących w poświadczeniu
- Walidatorzy – Walidatorzy, którzy dostarczyli poświadczenia
- Główny hash bloku śledzącego (Beacon block root) – Wskazuje na blok, który walidatorzy poświadczają
- Źródło – Wskazuje na ostatnią uzasadnioną epokę
- Cel – Wskazuje na granicę ostatniej epoki
- Podpis

### Sieć {#network-1}

Dane najwyższego poziomu warstwy konsensusu obejmują:

- Bieżąca epoka
- Bieżący slot
- Aktywni walidatorzy – Liczba aktywnych walidatorów
- Oczekujący walidatorzy – Liczba walidatorów oczekujących na aktywację
- Stakowane ETH – Ilość ETH stakowanego w sieci
- Średnie saldo – Średnie saldo ETH walidatorów

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Transakcje](/developers/docs/transactions/)
- [Konta](/developers/docs/accounts/)
- [Sieci](/developers/docs/networks/)