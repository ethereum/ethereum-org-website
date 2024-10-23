---
title: Przyszłościowe zabezpieczenie Ethereum
description: Te aktualizacje umacniają Ethereum jako odporną, zdecentralizowaną warstwę bazową na przyszłość, cokolwiek ona przyniesie.
lang: pl
image: /images/roadmap/roadmap-future.png
alt: "Plan działania Ethereum"
template: roadmap
---

Niektóre części planu działania niekoniecznie są wymagane do skalowania lub zabezpieczania Ethereum w najbliższej przyszłości, ale zapewniają Ethereum stabilność i niezawodność na dłuższą metę.

## Odporność kwantowa {#quantum-resistance}

Część [kryptografii](/glossary/#cryptography) zabezpieczającej obecne Ethereum zostanie naruszona, gdy obliczenia kwantowe staną się rzeczywistością. Chociaż minie pewnie wiele dziesięcioleci, zanim komputery kwantowe staną się prawdziwym zagrożeniem dla nowoczesnej kryptografii, Ethereum jest budowane tak, aby zapewnić bezpieczeństwo na wiele stuleci. Oznacza to, że [Ethereum ma stać się odporne na obliczenia kwantowe](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) tak szybko, jak to możliwe.

Wyzwanie stojące przed deweloperami Ethereum polega na tym, że obecny protokół [proof-of-stake](/glossary/#pos) opiera się na bardzo wydajnym schemacie podpisu znanym jako BLS do agregowania głosów na ważnych [blokach](/glossary/#block). Ten schemat podpisu jest łamany przez komputery kwantowe, a odporne na nie alternatywy nie są już tak wydajne.

[Schematy zobowiązań „KZG”](/roadmap/danksharding/#what-is-kzg) używane w kilku miejscach w Ethereum do generowania tajemnic kryptograficznych są znane z podatności na ataki kwantowe. Obecnie jest to rozwiązywane za pomocą „zaufanych konfiguracji”, w których wielu użytkowników generuje losowość, której nie można odtworzyć za pomocą komputera kwantowego. Idealnym rozwiązaniem byłoby jednak zastosowanie bezpiecznej kryptografii kwantowej. Istnieją dwa główne podejścia, które mogą stać się skutecznymi zamiennikami schematu BLS: podpisywanie [oparte na STARK](https://hackmd.io/@vbuterin/stark_aggregation) i podpisywanie [oparte na kratach](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Są one nadal badane i opracowywane**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Przeczytaj o KZG i zaufanych konfiguracjach</ButtonLink>

## Prostsze i wydajniejsze Ethereum {#simpler-more-efficient-ethereum}

Złożoność stwarza możliwości błędów lub luk, które mogą zostać wykorzystane przez atakujących. Dlatego też częścią planu działania jest uproszczenie Ethereum i usunięcie kodu, który pozostawał w różnych aktualizacjach, ale nie jest już potrzebny lub można go teraz ulepszyć. Szczuplejsza, prostsza baza kodu jest łatwiejsza w utrzymaniu i zrozumieniu dla programistów.

Istnieje kilka aktualizacji, które zostaną wprowadzone do [maszyny wirtualnej Ethereum (EVM)](/developers/docs/evm), aby zwiększyć jej prostotę i wydajność. Obejmują one [usunięcie kodu operacyjnego SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct) — rzadko używanego polecenia, które nie jest już potrzebne, a w niektórych okolicznościach może być niebezpieczne w użyciu, zwłaszcza w połączeniu z innymi przyszłymi aktualizacjami modelu przechowywania Ethereum. [Klienty Ethereum](/glossary/#consensus-client) nadal obsługują również niektóre stare typy transakcji, które można teraz całkowicie usunąć. Można również ulepszyć sposób obliczania [gazu](/glossary/#gas) i wprowadzić bardziej wydajne metody arytmetyczne leżące u podstaw niektórych operacji kryptograficznych.

Analogicznie istnieją aktualizacje, które można wprowadzić do innych części obecnych klientów Ethereum. Przykładem może być to, że obecne klienty wykonawcze i konsensusu używają różnych rodzajów kompresji danych. Udostępnianie danych między klientami będzie znacznie łatwiejsze i bardziej intuicyjne, gdy schemat kompresji zostanie ujednolicony w całej sieci.

## Aktualny postęp {#current-progress}

Większość uaktualnień wymaganych do przyszłościowego zabezpieczenia Ethereum jest **nadal w fazie badań i może minąć kilka lat**, zanim zostaną one wdrożone. Takie uaktualnienia, jak usunięcie SELFDESTRUCT i ujednolicenie schematu kompresji używanego w klientach wykonawczych i konsensusu, prawdopodobnie pojawią się wcześniej niż kryptografia odporna na komputery kwantowe.

**Dalsza lektura**

- [Paliwo](/developers/docs/gas)
- [Maszyna Wirtualna Ethereum (EVM)](/developers/docs/evm)
- [Data structures](/developers/docs/data-structures-and-encoding)
