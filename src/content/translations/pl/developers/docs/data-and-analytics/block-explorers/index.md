---
title: Eksploratory bloków
description: Wprowadzenie do eksploratorów bloków, portalu do świata danych blockchain, w którym możesz wyszukiwać informacje o transakcjach, kontach, kontraktach i nie tylko.
lang: pl
sidebarDepth: 3
---

Eksploratory bloków są twoim portalem do danych Ethereum. Możesz ich użyć, aby zobaczyć dane w czasie rzeczywistym o blokach, transakcjach, górnikach, kontach i innych aktywnościach w łańcuchu dostaw.

## Warunki wstępne {#prerequisites}

Powinieneś zrozumieć podstawowe pojęcia Ethereum, abyś mógł zrozumieć dane, które daje Ci eksplorator bloków. Zacznij od [wprowadzenia do Ethereum](/developers/docs/intro-to-ethereum/).

## Usługi {#services}

- [Etherscan](https://etherscan.io/) – _dostępne również w języku chińskim, koreańskim, rosyjskim i japońskim_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/)
- [Blockchair](https://blockchair.com/ethereum) – _dostępne również w języku hiszpańskim, francuskim, włoskim, niderlandzkim, portugalskim, rosyjskim, chińskim i farsi_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Dane {#data}

Ethereum jest zgodnie z projektem przezroczyste, więc wszystko jest możliwe do zweryfikowania. Eksploratory bloków zapewniają interfejs do uzyskania tych informacji. Dotyczy to zarówno głównej sieci Ethereum, jak i sieci testowych, jeśli potrzebujesz tych danych.

Oto podsumowanie typów danych, które możesz uzyskać z eksploratora bloków.

### Bloki {#blocks}

Nowe bloki są dodawane do Ethereum co ~12 sekund (może się to wahać), istnieje niemal stały strumień danych, które zostają dodane do eksploratorów bloków. Bloki zawierają wiele ważnych danych, które mogą okazać się przydatne:

**Standardowe dane**

- Wysokość bloku – numer i długość blockchaina (w blokach) przy tworzeniu bieżącego bloku.
- Znacznik czasu – czas, w którym górnik wydobył blok.
- Transakcje – liczba transakcji objętych blokiem.
- Górnik – adres górnika, który wydobył blok.
- Nagroda – kwota ETH przyznana górnikowi za dodanie bloku (standardowa nagroda 2ETH + wszelkie opłaty transakcyjne z transakcji zawartych w bloku).
- Trudność – trudności związane z wydobyciem bloku.
- Rozmiar – rozmiar danych w obrębie bloku (mierzony w bajtach).
- Zużyty gaz – całkowita ilość jednostek gazu wykorzystanych w transakcjach w bloku.
- Limit emisji gazu – całkowite limity gazu określone w transakcjach w bloku.
- Dodatkowe dane – wszelkie dodatkowe dane zawarte przez górnika w bloku.

**Zaawansowane dane**

- Hash – skrót kryptograficzny reprezentujący nagłówek bloku (unikalny identyfikator bloku).
- Hash nadrzędny – skrót bloku, który pojawił się przed bieżącym blokiem.
- Sha3Uncles – łączny skrót wszystkich bloków-wujów danego bloku nadrzędnego.
- StateRoot – główny hash drzewa Merkle, który przechowuje cały stan systemu.
- Nonce – wartość używana do wykazania proof-of-work dla bloku przez górnika.

**Bloki-wuje**

Bloki-wuje powstają, gdy dwóch górników tworzy bloki niemal w tym samym czasie - tylko jeden blok może być potwierdzony przez węzły. Nie są one uwzględniane, ale nadal otrzymują nagrodę za pracę.

Eksploratory bloków dostarczają informacji o blokach-wujach, takie jak:

- Numer bloku-wuja.
- Czas jego wystąpienia.
- Wysokość bloku, na którym zostały utworzone.
- Kto wydobył.
- Nagroda ETH.

### Paliwo {#gas}

Eksploratory bloków nie tylko dostarczą Ci danych o zużyciu gazu w transakcjach i blokach, ale niektóre z nich podadzą Ci informacje o aktualnych cenach gazu w sieci. Pomoże to zrozumieć użycie sieci, przesłać bezpieczne transakcje i nadmiernie nie wydawać pieniędzy na gaz. Poszukaj API, które pomogą Ci uzyskać te informacje w interfejsie Twojego produktu. Dane odnoszące się do danego gazu obejmują:

- Szacunkowe jednostki gazu potrzebne do bezpiecznej, ale wolnej transakcji (+ szacowana cena i czas trwania).
- Szacowane jednostki gazu potrzebne do średniej transakcji (+ szacunkowa cena i czas trwania).
- Szacowane jednostki gazu potrzebne do szybkiej transakcji (+ szacunkowa cena i czas trwania).
- Średni czas potwierdzenia w oparciu o cenę gazu.
- Kontrakty, które zużywają gaz – innymi słowy popularne produkty, które widzą wiele zastosowań w sieci.
- Konta wydające gaz – innymi słowy częstych użytkowników sieci.

### Transakcje {#transactions}

Eksploratory bloków stały się powszechnym miejscem, w którym ludzie mogą śledzić postęp swoich transakcji. Dzieje się tak, ponieważ poziom szczegółowości, który możesz uzyskać zapewnia dodatkową pewność. Dane transakcji obejmują:

**Standardowe dane**

- Skrót transakcji – skrót generowany po złożeniu transakcji.
- Status – wskazanie, czy transakcja jest w toku, nie powiodła się, czy też zakończyła się sukcesem.
- Blok– blok, w którym uwzględniono transakcję.
- Znacznik czasu – czas, w którym górnik wydobywał transakcję.
- Od – adres konta, które przeprowadziło transakcję.
- Adres odbiorcy lub inteligentnego kontraktu, z którym transakcja wchodzi w interakcje.
- Przesłane tokeny – lista tokenów, które zostały przekazane jako część transakcji.
- Wartość – całkowita przekazywana wartość ETH.
- Opłata transakcyjna – kwota zapłacona górnikowi w celu przetworzenia transakcji (obliczona na podstawie ceny gazu\*użytego gazu).

**Zaawansowane dane**

- Limit gazu – maksymalna liczba jednostek gazu, jaką może zużyć dana transakcja.
- Zużyty gaz – faktyczna ilość gazu zużytego w ramach transakcji.
- Cena gazu – cena ustalona za jednostkę gazu.
- Nonce – numer transakcji dla adresu `od` (pamiętaj, że zaczyna się on od 0, więc nonce `100` byłby faktycznie 101. transakcją zgłoszoną przez to konto.
- Dane wejściowe – wszelkie dodatkowe informacje wymagane przez transakcję.

### Konta {#accounts}

Istnieje mnóstwo danych, które możesz uzyskać na temat konta. Dlatego często zaleca się używanie wielu kont, aby Twoje aktywa i wartość nie były łatwe do śledzenia. Istnieją również pewne rozwiązania, które sprawią, że transakcje i operacje na kontach będą bardziej prywatne. Oto dane, które są dostępne dla kont:

**Konta użytkowników**

- Adres konta – publiczny adres, na który możesz wysyłać środki.
- Saldo ETH – kwota ETH powiązana z tym kontem.
- Całkowita wartość ETH – wartość ETH.
- Tokeny – tokeny powiązane z kontem i ich wartość.
- Historia transakcji – lista wszystkich transakcji, w których to konto było nadawcą lub odbiorcą.

**Inteligentne kontrakty**

Konta inteligentnych kontraktów mają wszystkie dane, które będzie mieć konto użytkownika, ale niektóre eksploratory bloków będą również wyświetlać pewne informacje o kodzie. Przykłady:

- Twórca kontraktu – adres, który wdrożył kontrakt w sieci głównej.
- Transakcja utworzenia – transakcja, która obejmowała wdrożenie do sieci głównej.
- Kod źródłowy – kod solidity lub vyper inteligentnego kontraktu.
- ABI (Application Binary Interface) kontraktu – wywołania wykonywane przez umowę oraz otrzymane dane.
- Kod tworzenia kontraktu – skompilowany kod bajtowy inteligentnego kontraktu – utworzony podczas kompilacji inteligentnego kontraktu napisanego w Solidity lub Vyper itp.
- Wydarzenia kontraktu – historia metod wywołanych w inteligentnym kontrakcie. Zasadniczo sposób na sprawdzenie, w jaki sposób i jak często kontrakt jest wykorzystywany.

### Tokeny {#tokens}

Token jest rodzajem kontraktu, więc będzie mieć dane podobne do inteligentnego kontraktu. Ponieważ jednak tokeny mają wartość i mogą być przedmiotem obrotu, mają dodatkowe punkty danych:

- Typ – czy są one standardem ERC-20, ERC-721 czy innym standardem tokenów.
- Cena – jeśli są ERC-20, będą miały bieżącą wartość rynkową.
- Pułap rynkowy – jeśli są ERC-20, będą miały pułap rynkowy (obliczony na podstawie ceny\*całkowitej podaży).
- Całkowita podaż – liczba tokenów znajdujących się w obiegu.
- Posiadacze – liczba adresów, które posiadają token.
- Transfery – ile razy token został przeniesiony pomiędzy rachunkami.
- Historia transakcji – historia wszystkich transakcji zawierających token.
- Adres kontraktu – adres tokenu, który został wysłany do sieci głównej.
- Miejsca dziesiętne – tokeny ERC-20 są podzielne i mają miejsca dziesiętne.

### Sieć {#network}

Oczywiście są pewne dane, które mówią o stanie sieci. Są one dość specyficzne dla mechanizmu konsensusu proof-of-work Ethereum. Gdy Ethereum przejdzie do Eth2, niektóre z tych danych będą zbędne

- Trudność – aktualna trudność w wydobyciu.
- Częstotliwość haszowania – oszacowanie liczby hashów generowanych przez górników Ethereum próbujących rozwiązać bieżący blok Ethereum lub dowolny blok.
- Suma transakcji – liczba transakcji od czasu utworzenia Ethereum.
- Transakcje na sekundę – liczba transakcji możliwa do przetworzenia w ciągu sekundy.
- Cena ETH – bieżąca wycena 1 ETH.
- Całkowita podaż ETH – liczba ETH w obiegu – pamiętaj, że nowy ETH powstaje dzięki utworzeniu każdego bloku w formie nagród za bloki.
- Pułap rynkowy – obliczenie ceny\*podaży.

## Dane Eth2 {#consensus-layer-data}

Ulepszenia Eth2 są nadal w fazie rozwoju, ale warto wspomnieć o niektórych punktach danych, które eksplorery będą mogły Ci dostarczyć. W rzeczywistości wszystkie te dane są obecnie dostępne dla sieci testowych.

Jeśli brak Ci wiedzy o Eth2, sprawdź [nasz przegląd ulepszeń Eth2](/upgrades/).

### Epoka {#epoch}

Pierwsza aktualizacja Eth2, łańcuch śledzący Eth2, stworzy komitety walidatorów, które są losowo przydzielane na koniec każdej epoki (co 6,4 minuty) ze względów bezpieczeństwa. Dane dotyczące epoki obejmują:

- Numer epoki.
- Status końcowy – czy epoka została ukończona (Tak/Nie).
- Czas – czas zakończenia epoki.
- Poświadczenie – liczba poświadczeń w epoce (głosy za blokami w czasie).
- Depozyty – liczba depozytów ETH zawartych w epoce (walidatorzy muszą zestakować ETH, aby stać się walidatorami).
- Ograniczenia – liczba kar nałożonych na wnioskodawców bloków lub poświadczających.
- Udział w głosowaniu – ilość zestakowanego ETH użyta do poświadczenia bloków.
- Walidatory – liczba walidatorów aktywnych dla epoki.
- Średni bilans walidatora – średni bilans dla aktywnych walidatorów.
- Sloty – liczba slotów w epoce (sloty zawierają jeden ważny blok).

### Slot {#slot}

Sloty to możliwości tworzenia bloków, dane dostępne dla każdego slotu obejmują:

- Epoka – epoka, w której slot jest ważny.
- Numer slotu.
- Status – status slotu (zaproponowany/pominięty).
- Czas – znacznik czasowy slotu.
- Proponujący – walidator, który zaproponował blok do slotu.
- Block root — główne drzewo haszujące BeaconBlock.
- Root nadrzędny — skrót bloku, który pojawił się wcześniej.
- Root stanu — główne drzewo haszujące BeaconState.
- Podpis.
- Ujawnienie randao.
- Graffiti – proponujący blok może uwzględnić 32-bajtową wiadomość w propozycji bloku.
- Dane ETH1.
  - Hasz bloku.
  - Liczba wpłat.
  - Root wpłaty.
- Poświadczenia – liczba poświadczeń bloku w tym slocie.
- Depozyty – liczba depozytów w tym slocie.
- Dobrowolne wyjścia — liczba walidatorów, którzy opuścili slot.
- Ograniczenia – liczba kar nałożonych na wnioskodawców bloków lub poświadczających.
- Głosy - walidatorzy, którzy głosowali za blokiem w tym slocie.

### Bloki {#blocks-1}

W Eth2 bloki działają inaczej, ponieważ górnicy są zastępowani przez walidatorów, a łańcuch śledzący wprowadza sloty i epoki do Ethereum. Więc oznacza to nowe dane!

- Proponujący – walidator, który został wybrany algorytmicznie do zaproponowania nowego bloku.
- Epoka – epoka, w której zaproponowano blok.
- Slot – slot, w którym zaproponowano blok.
- Poświadczenia – liczba poświadczeń zawartych w slocie. Poświadczenia są jak głosy wskazujące, że blok jest gotowy do przejścia do łańcucha śledzącego.

### Walidatorzy {#validators}

Walidatorzy są odpowiedzialni za proponowanie bloków i poświadczanie ich w slotach.

- Numer walidatora – niepowtarzalny numer, który reprezentuje walidatora.
- Bieżące saldo – saldo walidatora, w tym nagrody.
- Efektywna równowaga – saldo walidatora, które jest wykorzystywane do stawkowania.
- Dochody – nagrody lub kary otrzymane przez walidatora.
- Status – czy walidator jest obecnie online i aktywny, czy nie.
- Skuteczność poświadczenia – średni czas potrzebny na włączenie poświadczeń walidatora do łańcucha.
- Kwalifikowalność do aktywacji – data (i epoka), kiedy walidator stał się dostępny do zatwierdzenia.
- Aktywne od – data (i epoka), kiedy walidator stał się aktywny.
- Proponowane bloki – blok zaproponowany przez walidatora.
- Poświadczenia – poświadczenia przedstawione przez walidatora.
- Depozyty – adres „od”, hash transakcji, numeru bloku, znacznik czasu, kwota i status depozytu zestakowanego przez walidatora.

### Poświadczenia {#attestations}

Poświadczenia to głosy za włączeniem bloków do łańcucha. Ich dane odnoszą się do zapisu poświadczenia i walidatorów poświadczających

- Slot – slot, w którym odbyło się poświadczenie.
- Indeks komitetu – indeks komitetu w danym slocie.
- Bity agregacji – zagregowane poświadczenia wszystkich walidatorów uczestniczących w poświadczeniu.
- Walidatorzy – walidatorzy, którzy dostarczyli poświadczenia.
- Beacon block root – wskazuje na blok poświadczany przez walidatorów.
- Źródło – wskazuje na ostatnią uzasadnioną epokę.
- Cel – wskazuje na na ostatnią granicę epoki.
- Podpis.

### Sieć {#network-1}

Dane najwyższego poziomu Eth2 obejmują:

- Bieżąca epoka.
- Bieżący slot.
- Aktywni walidatorzy – liczba aktywnych walidatorów.
- Oczekujący walidatorzy – liczba walidatorów oczekujących na aktywność.
- Zestakowane ETH – ilość ETH zestakowana w sieci.
- Średni bilans – średni bilans ETH walidatorów.

## Eksploratory bloków {#block-explorers}

- [Etherscan](https://etherscan.io/) – eksplorator bloków, którego możesz użyć do pobrania danych dla głównej sieci Ethereum, sieci testowej Ropsten, sieci testowej Kovan, sieci testowej Rinkeby i sieci testowej Goerli.
- [Blockscout](https://blockscout.com/) – koncentruje się na następujących sieciach:
  - xDai – mądre połączenie technologii stablecoin DAI MakerDAO, a także technologii łańcucha bocznego POA i tokenbridge.
  - POA – łańcuch boczny i autonomiczna sieć zabezpieczona przez grupę zaufanych walidatorów. Wszyscy walidatorzy w sieci są notariuszami Stanów Zjednoczonych, a ich informacje są publicznie dostępne.
  - POA Sokol Testnet.
  - ARTIS – blockchain zgodny z Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – L14 pełni funkcję pierwszej sieci testowej, aby umożliwić społeczności LUKSO budowę i przetestowanie wspólnej infrastruktury.
  - qDai.
- [Etherchain](https://www.etherchain.org/) – eksplorator bloków dla głównej sieci Ethereum.
- [Ethplorer](https://ethplorer.io/) – eksplorator bloków z naciskiem na tokeny dla sieci głównej Ethereum i testnetu Kovan.
- [Blockchair](https://blockchair.com/ethereum) – najbardziej prywatny eksplorator Ethereum. Także dla sortowania i filtrowania danych (mempool).

## Eksploratory bloków Eth2 {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://eth2stats.io/](https://eth2stats.io/medalla-testnet)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transakcje](/developers/docs/transactions/)
- [Konta](/developers/docs/accounts/)
- [Sieci](/developers/docs/networks/)
