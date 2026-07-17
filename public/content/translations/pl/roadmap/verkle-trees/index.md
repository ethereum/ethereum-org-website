---
title: Drzewa Verkle
description: Opis wysokiego poziomu drzew Verkle i tego, jak zostaną wykorzystane do aktualizacji Ethereum
lang: pl
summaryPoints:
  - Dowiedz się, czym są drzewa Verkle
  - Przeczytaj, dlaczego drzewa Verkle są przydatną aktualizacją dla Ethereum
---

Drzewa Verkle (zbitka wyrazowa od „Vector commitment” – zobowiązanie wektorowe i „Merkle Trees” – drzewa Merklego) to struktura danych, która może zostać użyta do aktualizacji węzłów [Ethereum](/), aby mogły przestać przechowywać duże ilości danych stanu bez utraty zdolności do walidacji bloków.

## Bezstanowość {#statelessness}

Drzewa Verkle są kluczowym krokiem na drodze do bezstanowych klientów Ethereum. Klienci bezstanowi to tacy, którzy nie muszą przechowywać całej bazy danych stanu, aby walidować przychodzące bloki. Zamiast używać własnej lokalnej kopii stanu Ethereum do weryfikacji bloków, klienci bezstanowi używają „świadka” (ang. witness) danych stanu, który przybywa wraz z blokiem. Świadek to zbiór pojedynczych fragmentów danych stanu, które są wymagane do wykonania określonego zestawu transakcji, oraz dowód kryptograficzny, że świadek jest w rzeczywistości częścią pełnych danych. Świadek jest używany _zamiast_ bazy danych stanu. Aby to zadziałało, świadkowie muszą być bardzo mali, aby można ich było bezpiecznie rozgłaszać w sieci na tyle szybko, by walidatorzy zdążyli ich przetworzyć w ciągu 12-sekundowego slotu. Obecna struktura danych stanu nie jest odpowiednia, ponieważ świadkowie są zbyt duzi. Drzewa Verkle rozwiązują ten problem, umożliwiając tworzenie małych świadków, co usuwa jedną z głównych barier dla klientów bezstanowych.

<ExpandableCard title="Dlaczego chcemy klientów bezstanowych?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Klienci Ethereum używają obecnie struktury danych znanej jako drzewo Patricia Merkle (Patricia Merkle Trie) do przechowywania danych stanu. Informacje o poszczególnych kontach są przechowywane jako liście w drzewie, a pary liści są wielokrotnie hashowane, aż pozostanie tylko jeden hash. Ten końcowy hash jest znany jako „korzeń” (root). Aby zweryfikować bloki, klienci Ethereum wykonują wszystkie transakcje w bloku i aktualizują swoje lokalne drzewo stanu. Blok jest uważany za ważny, jeśli korzeń lokalnego drzewa jest identyczny z tym dostarczonym przez proponującego blok, ponieważ jakiekolwiek różnice w obliczeniach wykonanych przez proponującego blok i węzeł walidujący spowodowałyby, że hash korzenia byłby całkowicie inny. Problem polega na tym, że weryfikacja blockchaina wymaga od każdego klienta przechowywania całego drzewa stanu dla bloku na szczycie (head block) i kilku bloków historycznych (domyślnie w Geth przechowuje się dane stanu dla 128 bloków wstecz). Wymaga to od klientów dostępu do dużej ilości miejsca na dysku, co stanowi barierę w uruchamianiu pełnych węzłów na tanim sprzęcie o niskiej mocy. Rozwiązaniem tego problemu jest aktualizacja drzewa stanu do bardziej wydajnej struktury (drzewa Verkle), którą można podsumować za pomocą małego „świadka” danych, który może być udostępniany zamiast pełnych danych stanu. Przeformatowanie danych stanu na drzewo Verkle jest krokiem milowym w kierunku przejścia na klientów bezstanowych.

</ExpandableCard>

## Czym jest świadek i dlaczego go potrzebujemy? {#what-is-a-witness}

Weryfikacja bloku oznacza ponowne wykonanie transakcji zawartych w bloku, zastosowanie zmian w drzewie stanu Ethereum i obliczenie nowego hasha korzenia. Zweryfikowany blok to taki, którego obliczony hash korzenia stanu jest taki sam jak ten dostarczony z blokiem (ponieważ oznacza to, że proponujący blok naprawdę wykonał obliczenia, o których mówi). W dzisiejszych klientach Ethereum aktualizacja stanu wymaga dostępu do całego drzewa stanu, które jest dużą strukturą danych, która musi być przechowywana lokalnie. Świadek zawiera tylko te fragmenty danych stanu, które są wymagane do wykonania transakcji w bloku. Walidator może wtedy użyć tylko tych fragmentów, aby zweryfikować, czy proponujący blok wykonał transakcje bloku i poprawnie zaktualizował stan. Oznacza to jednak, że świadek musi być przesyłany między węzłami peer-to-peer w sieci Ethereum na tyle szybko, aby każdy węzeł mógł go bezpiecznie odebrać i przetworzyć w ciągu 12-sekundowego slotu. Jeśli świadek jest zbyt duży, pobranie go i nadążenie za łańcuchem może zająć niektórym węzłom zbyt dużo czasu. Jest to siła centralizująca, ponieważ oznacza, że tylko węzły z szybkim połączeniem internetowym mogą uczestniczyć w walidacji bloków. Dzięki drzewom Verkle nie ma potrzeby przechowywania stanu na dysku twardym; _wszystko_, czego potrzebujesz do weryfikacji bloku, znajduje się w samym bloku. Niestety, świadkowie, których można wygenerować z drzew Merklego, są zbyt duzi, aby obsługiwać klientów bezstanowych.

## Dlaczego drzewa Verkle umożliwiają tworzenie mniejszych świadków? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktura drzewa Merklego sprawia, że rozmiary świadków są bardzo duże – zbyt duże, aby bezpiecznie rozgłaszać je między węzłami peer-to-peer w ciągu 12-sekundowego slotu. Dzieje się tak, ponieważ świadek jest ścieżką łączącą dane, które są przechowywane w liściach, z hashem korzenia. Aby zweryfikować dane, konieczne jest posiadanie nie tylko wszystkich pośrednich hashów, które łączą każdy liść z korzeniem, ale także wszystkich węzłów „rodzeństwa” (sibling nodes). Każdy węzeł w dowodzie ma rodzeństwo, z którym jest hashowany, aby utworzyć kolejny hash w górę drzewa. To bardzo dużo danych. Drzewa Verkle zmniejszają rozmiar świadka poprzez skrócenie odległości między liśćmi drzewa a jego korzeniem, a także eliminują potrzebę dostarczania węzłów rodzeństwa do weryfikacji hasha korzenia. Jeszcze większą oszczędność miejsca uzyska się dzięki zastosowaniu potężnego schematu zobowiązania wielomianowego (polynomial commitment) zamiast zobowiązania wektorowego opartego na hashach. Zobowiązanie wielomianowe pozwala świadkowi mieć stały rozmiar niezależnie od liczby liści, których dowodzi.

W ramach schematu zobowiązania wielomianowego świadkowie mają łatwe do zarządzania rozmiary, które można łatwo przesyłać w sieci peer-to-peer. Pozwala to klientom na weryfikację zmian stanu w każdym bloku przy użyciu minimalnej ilości danych.

<ExpandableCard title="O ile dokładnie drzewa Verkle mogą zmniejszyć rozmiar świadka?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Rozmiar świadka różni się w zależności od liczby liści, które obejmuje. Zakładając, że świadek obejmuje 1000 liści, świadek dla drzewa Merklego miałby około 3,5 MB (zakładając 7 poziomów drzewa). Świadek dla tych samych danych w drzewie Verkle (zakładając 4 poziomy drzewa) miałby około 150 kB – **około 23 razy mniej**. To zmniejszenie rozmiaru świadka pozwoli na to, aby świadkowie klientów bezstanowych byli akceptowalnie mali. Świadkowie wielomianowi mają od 0,128 do 1 kB w zależności od tego, które konkretnie zobowiązanie wielomianowe jest używane.

</ExpandableCard>

## Jaka jest struktura drzewa Verkle? {#what-is-the-structure-of-a-verkle-tree}

Drzewa Verkle to pary `(key,value)`, w których klucze są 32-bajtowymi elementami złożonymi z 31-bajtowego _rdzenia_ (stem) i jednobajtowego _sufiksu_. Klucze te są zorganizowane w węzły _rozszerzeń_ (extension nodes) i węzły _wewnętrzne_ (inner nodes). Węzły rozszerzeń reprezentują pojedynczy rdzeń dla 256 dzieci z różnymi sufiksami. Węzły wewnętrzne również mają 256 dzieci, ale mogą to być inne węzły rozszerzeń. Główną różnicą między strukturą drzewa Verkle a drzewa Merklego jest to, że drzewo Verkle jest znacznie bardziej płaskie, co oznacza, że istnieje mniej węzłów pośrednich łączących liść z korzeniem, a zatem potrzeba mniej danych do wygenerowania dowodu.

![Diagram of a Verkle tree data structure](./verkle.png)

[Przeczytaj więcej o strukturze drzew Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Obecny postęp {#current-progress}

Sieci testowe drzew Verkle już działają, ale wciąż istnieją znaczne zaległe aktualizacje klientów, które są wymagane do obsługi drzew Verkle. Możesz pomóc przyspieszyć postęp, wdrażając kontrakty w sieciach testowych lub uruchamiając klientów sieci testowej.

[Obejrzyj, jak Guillaume Ballet wyjaśnia sieć testową Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (zauważ, że sieć testowa Condrieu opierała się na dowodzie pracy (PoW) i została teraz zastąpiona przez sieć testową Verkle Gen Devnet 6).

## Dalsza lektura {#further-reading}

- [Drzewa Verkle dla bezstanowości](https://verkle.info/)
- [Dankrad Feist wyjaśnia drzewa Verkle w PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Drzewa Verkle dla reszty z nas](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia dowodu Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet wyjaśnia drzewa Verkle na ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [„Jak drzewa Verkle sprawiają, że Ethereum jest lekkie i wydajne” autorstwa Guillaume'a Balleta na Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam o klientach bezstanowych z ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist wyjaśnia drzewa Verkle i bezstanowość w podcaście Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin o drzewach Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist o drzewach Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Dokumentacja EIP drzewa Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)