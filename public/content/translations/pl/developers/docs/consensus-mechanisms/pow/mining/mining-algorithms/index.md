---
title: Algorytmy kopania
description: "Szczegółowe spojrzenie na algorytmy używane do kopania w Ethereum."
lang: pl
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Dowód pracy (PoW) nie jest już podstawą mechanizmu konsensusu Ethereum, co oznacza, że kopanie zostało wyłączone. Zamiast tego Ethereum jest zabezpieczane przez walidatorów, którzy stakują ETH. Możesz zacząć stakować swoje ETH już dziś. Przeczytaj więcej o <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>dowodzie stawki (PoS)</a> i <a href='/staking/'>stakingu</a>. Ta strona ma wyłącznie wartość historyczną.
</AlertDescription>
</AlertContent>
</Alert>

Kopanie w Ethereum wykorzystywało algorytm znany jako Ethash. Podstawową ideą tego algorytmu jest to, że górnik próbuje znaleźć wartość wejściową nonce za pomocą obliczeń siłowych (brute force), tak aby wynikowy hash był mniejszy niż próg określony przez obliczoną trudność. Ten poziom trudności może być dynamicznie dostosowywany, co pozwala na produkcję bloków w regularnych odstępach czasu.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [konsensusem opartym na dowodzie pracy (PoW)](/developers/docs/consensus-mechanisms/pow) oraz [kopaniem](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto był prekursorskim, badawczym algorytmem do kopania w Ethereum, który został zastąpiony przez Ethash. Był to amalgamat dwóch różnych algorytmów: Dagger i Hashimoto. Był on jedynie implementacją badawczą i został zastąpiony przez Ethash do czasu uruchomienia sieci głównej Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) obejmuje generowanie [skierowanego grafu acyklicznego (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), którego losowe fragmenty są ze sobą hashowane. Główną zasadą jest to, że każdy nonce wymaga tylko niewielkiej części dużego, całkowitego drzewa danych. Ponowne obliczanie poddrzewa dla każdego nonce jest zaporowe dla kopania – stąd potrzeba przechowywania drzewa – ale akceptowalne dla weryfikacji pojedynczego nonce. Dagger został zaprojektowany jako alternatywa dla istniejących algorytmów, takich jak Scrypt, które są trudne pamięciowo (memory-hard), ale trudne do zweryfikowania, gdy ich trudność pamięciowa wzrasta do prawdziwie bezpiecznych poziomów. Jednakże Dagger był podatny na akcelerację sprzętową współdzielonej pamięci i został porzucony na rzecz innych kierunków badań.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) to algorytm, który dodaje odporność na układy ASIC poprzez ograniczenie wejścia/wyjścia (I/O bound) (tj. odczyty z pamięci są czynnikiem ograniczającym w procesie kopania). Teoria zakłada, że pamięć RAM jest bardziej dostępna niż moc obliczeniowa; miliardy dolarów przeznaczono już na badania nad optymalizacją pamięci RAM dla różnych przypadków użycia, które często obejmują wzorce dostępu zbliżone do losowych (stąd „pamięć o dostępie swobodnym” – random access memory). W rezultacie istniejąca pamięć RAM jest prawdopodobnie umiarkowanie bliska optymalnej do ewaluacji algorytmu. Hashimoto wykorzystuje blockchain jako źródło danych, jednocześnie spełniając powyższe punkty (1) i (3).

Dagger-Hashimoto wykorzystywał zmienione wersje algorytmów Dagger i Hashimoto. Różnica między Dagger-Hashimoto a Hashimoto polega na tym, że zamiast używać blockchaina jako źródła danych, Dagger-Hashimoto używa niestandardowo wygenerowanego zestawu danych, który aktualizuje się na podstawie danych bloku co N bloków. Zestaw danych jest generowany przy użyciu algorytmu Dagger, co pozwala na wydajne obliczanie podzbioru specyficznego dla każdego nonce dla algorytmu weryfikacji przez lekkiego klienta. Różnica między Dagger-Hashimoto a Daggerem polega na tym, że w przeciwieństwie do oryginalnego Daggera, zestaw danych używany do odpytywania bloku jest półtrwały i aktualizowany tylko w sporadycznych odstępach czasu (np. raz w tygodniu). Oznacza to, że część wysiłku związanego z generowaniem zestawu danych jest bliska zeru, więc argumenty Sergio Lernera dotyczące przyspieszenia pamięci współdzielonej stają się nieistotne.

Więcej o [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash był algorytmem kopania, który był faktycznie używany w prawdziwej sieci głównej Ethereum w ramach przestarzałej już architektury dowodu pracy (PoW). Ethash był w rzeczywistości nową nazwą nadaną konkretnej wersji Dagger-Hashimoto po tym, jak algorytm został znacznie zaktualizowany, jednocześnie dziedzicząc podstawowe zasady swojego poprzednika. Sieć główna Ethereum używała wyłącznie Ethash – Dagger-Hashimoto był wersją badawczo-rozwojową (R&D) algorytmu kopania, która została zastąpiona przed rozpoczęciem kopania w sieci głównej Ethereum.

[Więcej o Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_