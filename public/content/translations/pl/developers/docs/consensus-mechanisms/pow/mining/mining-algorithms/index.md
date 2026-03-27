---
title: Algorytmy kopania
description: "Szczegółowe spojrzenie na algorytmy używane do wydobywania Ethereum."
lang: pl
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
proof-of-work nie jest już podstawowym mechanizmem konsensusu Ethereum, co oznacza, że kopanie zostało wyłączone. Zamiast tego, sieć Ethereum jest zabezpieczona przez walidatorów, którzy stakują ETH. Możesz zacząć stakować swoje ETH już dziś. Przeczytaj więcej na <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a>, oraz <a href='/staking/'>staking</a>. Ta strona ma charakter wyłącznie historyczny.
</AlertDescription>
</AlertContent>
</Alert>

Wydobywanie Ethereum używało algorytmu znanego jako Ethash. Podstawowa idea algorytmu polega na tym, że górnik próbuje znaleźć wejście nonce za pomocą obliczeń siłowych, tak aby wynikowy hasz był mniejszy niż próg określony przez obliczoną trudność. Ten poziom trudności może być dynamicznie dostosowywany, co pozwala na tworzenie bloków w regularnych odstępach czasu.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznanie się z [konsensusem proof-of-work](/developers/docs/consensus-mechanisms/pow) i [wydobywaniem](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto był prekursorem algorytmu badawczego do wydobywania Ethereum, który został zastąpiony przez Ethash. Był to amalgamat dwóch różnych algorytmów: Dagger i Hashimoto. Była to tylko implementacja badawcza i została zastąpiona przez Ethash w momencie uruchomienia sieci głównej Ethereum.

[Dagger](http://www.hashcash.org/papers/dagger.html) polega na generowaniu [skierowanego grafu acyklicznego](https://en.wikipedia.org/wiki/Directed_acyclic_graph), którego losowe fragmenty są razem haszowane. Podstawową zasadą jest to, że każdy nonce wymaga tylko niewielkiej części dużego, całkowitego drzewa danych. Ponowne obliczanie poddrzewa dla każdego nonce jest zbyt kosztowne dla wydobywania — stąd potrzeba przechowywania drzewa — ale jest w porządku w przypadku weryfikacji wartości pojedynczego nonce. Dagger został zaprojektowany jako alternatywa dla istniejących algorytmów, takich jak Scrypt, które są trudne pamięciowo, ale trudne do zweryfikowania, gdy ich trudność pamięciowa wzrasta do prawdziwie bezpiecznych poziomów. Jednakże Dagger był podatny na akcelerację sprzętową pamięci współdzielonej i został porzucony na rzecz innych kierunków badań.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) to algorytm, który dodaje odporność na ASIC poprzez bycie ograniczonym przez operacje wejścia/wyjścia (I/O bound) (tzn. odczyty z pamięci są czynnikiem ograniczającym w procesie wydobycia). Teoria głosi, że pamięć RAM jest bardziej dostępna niż moc obliczeniowa; badania warte miliardy dolarów już zajmowały się optymalizacją pamięci RAM dla różnych przypadków użycia, które często obejmują wzorce dostępu bliskie losowemu (stąd „pamięć o dostępie swobodnym”). W rezultacie istniejąca pamięć RAM jest prawdopodobnie umiarkowanie bliska optymalnej do oceny algorytmu. Hashimoto używa blockchaina jako źródła danych, jednocześnie spełniając warunki (1) i (3) powyżej.

Dagger-Hashimoto używał zmodyfikowanych wersji algorytmów Dagger i Hashimoto. Różnica między Dagger Hashimoto a Hashimoto polega na tym, że zamiast używać blockchaina jako źródła danych, Dagger Hashimoto używa niestandardowego zestawu danych, który jest aktualizowany na podstawie danych z bloku co N bloków. Zestaw danych jest generowany przy użyciu algorytmu Dagger, co pozwala na wydajne obliczanie podzbioru specyficznego dla każdego nonce dla algorytmu weryfikacji lekkiego klienta. Różnica między Dagger Hashimoto a Dagger polega na tym, że w przeciwieństwie do oryginalnego Daggera zbiór danych używany do odpytywania bloku jest częściowo stały i aktualizowany tylko w określonych odstępach czasu (np. raz w tygodniu). Oznacza to, że część wysiłku związanego z generowaniem zbioru danych jest bliska zeru, więc argumenty Sergio Lernera dotyczące przyspieszenia pamięci współdzielonej stają się znikome.

Więcej o [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash był algorytmem wydobywczym, który był faktycznie używany w prawdziwej sieci głównej Ethereum w ramach przestarzałej już architektury proof-of-work. Ethash był w rzeczywistości nową nazwą nadaną określonej wersji Dagger-Hashimoto po tym, jak algorytm został znacznie zaktualizowany, jednocześnie dziedzicząc podstawowe zasady swojego poprzednika. Sieć główna Ethereum używała tylko Ethash — Dagger Hashimoto był wersją badawczo-rozwojową (R&D) algorytmu wydobywczego, który został zastąpiony, zanim rozpoczęto wydobywanie w sieci głównej Ethereum.

[Więcej o Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
