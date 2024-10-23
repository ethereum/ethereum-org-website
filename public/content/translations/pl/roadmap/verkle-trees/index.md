---
title: Drzewa Verkle
description: Szczegółowy opis drzew Verkle oraz sposobu, w jaki zostaną wykorzystane do ulepszenia Ethereum
lang: pl
summaryPoints:
  - Odkryj, czym są drzewa Verkle
  - Przeczytaj, czemu drzewa Verkle są przydatnym ulepszeniem Ethereum
---

# Drzewa Verkle {#verkle-trees}

Drzewa Verkle (połączenie „Vector commitment” oraz „Merkle Trees”) to struktura danych, którą można wykorzystać do ulepszenia węzłów Ethereum, aby mogły przestać przechowywać duże ilości danych o stanie bez utraty możliwości walidacji bloków.

## Bezstanowość {#statelessness}

Drzewa Verkle są kluczowym krokiem w drodze do bezstanowych klientów Ethereum. Bezstanowe klienty to takie, które nie muszą przechowywać całej bazy danych o stanie w celu walidacji nadchodzących bloków. Zamiast wykorzystywać własną lokalną kopię stanu Ethereum do weryfikacji bloków, bezstanowe klienty wykorzystują „świadka” do danych o stanie, który przychodzi z blokiem. Świadek jest zbiorem indywidualnych części danych o stanie, które są wymagane do wykonania określonego zestawu transakcji, oraz kryptograficznym dowodem na to, że świadek naprawdę jest częścią wszystkich danych. Świadek wykorzystywany jest _zamiast_ bazy danych o stanie. Aby to działało, świadkowie muszą być bardzo mali, tak aby można ich było bezpiecznie rozgłaszać w sieci w czasie umożliwiającym walidatorom przetworzenie ich w ciągu 12-sekundowego slotu. Obecna struktura danych o stanie nie jest odpowiednia, ponieważ świadkowie są zbyt duzi. Drzewa Verkle rozwiązują ten problem, zezwalając na małych świadków, co usuwa jedną z głównych przeszkód dla bezstanowych klientów.

<ExpandableCard title="Dlaczego chcemy bezstanowych klientów?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Klienty Ethereum obecnie wykorzystują strukturę danych znaną jako drzewo trie Patricia Merkle do przechowywania swoich danych o stanie. Informacje o poszczególnych kontach są przechowywanie jako liście w drzewie trie, a pary liści są wielokrotnie hashowane, dopóki nie pozostanie tylko pojedynczy hash. Ten finałowy hash znany jest jako „korzeń”. Aby zweryfikować bloki, klienty Ethereum wykonują wszystkie transakcje w bloku i aktualizują swoje lokalne drzewo trie stanu. Blok uznawany jest za prawidłowy, jeśli korzeń lokalnego drzewa jest identyczny jak ten dostarczany przez proponenta bloku, ponieważ jakakolwiek różnica w obliczeniach wykonanych przez proponenta bloku oraz węzeł walidacyjny sprawiłaby, że hash korzenia byłby całkowicie inny. Problem polega tu na tym, że weryfikowanie blockchainu wymaga od każdego klienta przechowywania całęgo drzewa trie stanu dla najnowszego bloku oraz kilkunastu historycznych bloków (domyślnie w Geth przechowywane są dane o stanie dla 128 bloków znajdujących się za najnowszym blokiem). Wymaga to od klientów dostępu do dużej ilości miejsca na dysku, co jest barierą do uruchomiania pełnego węzła na tanim sprzęcie niemającym dużo mocy. Rozwiązaniem tego jest zaktualizowanie drzewa trie stanu do bardziej wydajnej struktury (drzewa Verkle), którą można podsumować przy użyciu małego „świadka” danych, którego można udostępnić zamiast pełnych danych o stanie. Przekształcenie danych o stanie w drzewo Verkle jest krokiem do przejścia do klientów bezstanowych.

</ExpandableCard>

## Czym jest świadek i dlaczego ich potrzebujemy? {#what-is-a-witness}

Weryfikowanie bloku oznacza ponowne wykonanie transakcji zawartych w bloku, z zastosowaniem zmian do drzewa trie stanu Ethereum i obliczeniem nowego hasha korzenia. Zweryfikowany blok to taki, którego obliczony hash korzenia stanu jest taki sam jak ten dostarczony z blokiem (ponieważ oznacza to, że proponent bloku naprawdę wykonał obliczenia, o których mówi, że je wykonał). W obecnych klientach Ethereum aktualizowanie stanu wymaga dostępu do całego drzewa trie stanu, które jest dużą strukturą danych i musi być przechowywane lokalnie. Świadek zawiera tylko fragmenty danych o stanie, które są wymagane do wykonania transakcji w bloku. Walidator może następnie wykorzystać tylko te fragmenty do zweryfikowania, że proponent bloku wykonał transakcje w bloku i poprawnie zaktualizował stan. Oznacza to jednak, że świadek musi być rozsyłany między użytkownikami w sieci Ethereum wystarczająco szybko, aby każdy węzeł mógł go bezpiecznie otrzymać i przetworzyć w ciągu 12 sekund. Jeśli świadek jest za duży, pobranie go i nadążenie za łańcuchem może zająć niektórym węzłom zbyt długo. Jest to siła centralizująca, ponieważ tylko węzły z szybkim połączeniem internetowym mogą uczestniczyć w walidacji bloków. Dzięki drzewom Verkle nie jest konieczne przechowywanie stanu na swoim dysku twardym; _wszystko_ czego potrzebujesz, aby zweryfikować blok, znajduje się w samym bloku. Niestety świadkowie, którzy mogą zostać stworzeni przez drzewa trie Merkle, są zbyt duzi, aby obsługiwać bezstanowe klienty.

## Dlaczego drzewa Verkle pozwalają na mniejszych świadków? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktura drzewa trie Merkle sprawia, że rozmiary świadków są bardzo duże — zbyt duże, aby bezpiecznie rozsyłać je między użytkownikami w ciągu 12-sekundowego slotu. Dzieje się tak, ponieważ świadkowie są ścieżką łączącą dane, które są przechowywane w liściach do hasha korzenia. Aby zweryfikować dane, wymagane jest posiadanie nie tylko wszystkich pośrednich hashy, które łączą każdy liść z korzeniem, ale również wszystkich „sąsiednich” węzłów. Każdy węzeł w dowodzie ma swojego sąsiada, z którym jest hashowany, aby utworzyć kolejny hash w górę drzewa trie. To bardzo dużo danych. Drzewa Verkle zmniejszają rozmiar świadka poprzez skrócenie dystansu między liśćmi drzewa a jego korzeniem oraz wyeliminowanie konieczności dostarczania sąsiednich węzłów do weryfikacji hasha korzenia. Jeszcze większą wydajność przestrzenną można uzyskać dzięki zastosowaniu potężnego schematu zobowiązania wielomianowego zamiast zobowiązania wektorowego w stylu hashowym. Zobowiązanie wielomianowe pozwala świadkowi na zachowanie stałego rozmiaru bez względu na liczbę liści, które udowadnia.

W schemacie zobowiązania wielomianowego świadkowie mają rozsądne rozmiary, które można z łatwością przesłać w sieci peer-to-peer. Pozwala to klientom weryfikować zmiany stanu w każdym bloku przy użyciu minimalnej ilości danych.

<ExpandableCard title="O ile dokładnie drzewa Verkle mogą zmniejszyć rozmiar świadka?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Rozmiar świadka różni się w zależności od liczby liści, które zawiera. Zakładając, że świadek obejmuje 1000 liści, świadek w drzewie trie Merkle zajmowałby około 3,5 MB (przy założeniu 7 poziomów w drzewie trie). Świadek takich samych danych w drzewie Verkle (przy założeniu 4 poziomów w drzewie) zajmowałby około 150 kB — **około 23 razy mniej**. To zmniejszenie rozmiaru świadka zezwoli na dopuszczalnie małe rozmiary świadków bezstanowych klientów. Świadkowie wielomianowi zajmują 0,128-1 kB w zależności od tego, które konkretne zobowiązanie wielomianowe zostało wykorzystane.

</ExpandableCard>

## Jaka jest struktura drzewa Verkle? {#what-is-the-structure-of-a-verkle-tree}

Drzewa Verkle to pary `(key,value)`, w których klucze są 32-bajtowymi elementami składającymi się z 31-bajtowego _rdzenia_ oraz pojedynczego bajtu jako _sufiksu_. Klucze te są dzielą się na węzły _rozszerzeń_ oraz węzły _wewnętrzne_. Węzły rozszerzeń reprezentują pojedynczy rdzeń dla 256 potomków z różnymi sufiksami. Węzły wewnętrzne również mają 256 potomków, ale mogą nimi być inne węzły rozszerzeń. Główna różnica między strukturą drzewa Verkle a drzewa Merkle jest taka, że drzewo Verkle jest znacznie bardziej płaskie, co oznacza, że istnieje mniej węzłów pośrednich łączących liście z korzeniem, co sprawia, że potrzebna jest mniejsza ilość danych do wygenerowania dowodu.

![](./verkle.png)

[Poczytaj więcej o strukturze drzew Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Aktualny postęp {#current-progress}

Sieci testowe drzew Verkle są już dostępne, ale wciąż istnieją spore zaległości co do aktualizacji klientów, które są wymagane do obsługi drzew Verkle. Możesz jeszcze bardziej przyspieszyć postęp wdrażając kontrakty do sieci testowych lub uruchamiając klientów sieci testowych.

[Odkryj sieć testową Verkle Gen Devnet 2](https://verkle-gen-devnet-2.ethpandaops.io/)

[Zobacz jak Guillaume Ballet objaśnia sieć testową Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (zaznaczamy, że sieć testowa Condrieu stanowiła proof-of-work i została zastąpiona przez sieć testową Verkle Gen Devnet 2).

## Dalsza lektura {#further-reading}

- [Drzewa Verkle dla bezstanowości](https://verkle.info/)
- [Dankrad Feist wyjaśnia czym są drzewa Verkle w PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet wyjaśnia drzewa Verkle na ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [„Jak drzewa Verkle sprawiają, że Ethereum jest w dobrej kondycji” — Guillaume Ballet na Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam o bezstanowych klientach na ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest objaśnia drzewa Verkle i bezstanowość w podcaście Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin o drzewach Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist o drzewach Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Dokumentacja EIP drzew Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
