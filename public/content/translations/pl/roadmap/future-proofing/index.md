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

Część [kryptografii](/glossary/#cryptography) zabezpieczającej obecne Ethereum zostanie naruszona, gdy obliczenia kwantowe staną się rzeczywistością. Chociaż minie pewnie wiele dziesięcioleci, zanim komputery kwantowe staną się prawdziwym zagrożeniem dla nowoczesnej kryptografii, Ethereum jest budowane tak, aby zapewnić bezpieczeństwo na wiele stuleci. Oznacza to, że [Ethereum musi jak najszybciej stać się odporne na ataki kwantowe](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/).

Wyzwanie stojące przed deweloperami Ethereum polega na tym, że obecny protokół [proof-of-stake](/glossary/#pos) opiera się na bardzo wydajnym schemacie podpisu znanym jako BLS do agregowania głosów na ważnych [blokach](/glossary/#block). Ten schemat podpisu jest łamany przez komputery kwantowe, a odporne na nie alternatywy nie są już tak wydajne.

[Schematy zobowiązań „KZG”](/roadmap/danksharding/#what-is-kzg) używane w kilku miejscach w Ethereum do generowania tajemnic kryptograficznych są znane z podatności na ataki kwantowe. Obecnie problem ten omijany jest poprzez zastosowanie „zaufanych konfiguracji” (których główna ceremonia konfiguracji zakończyła się sukcesem w 2023 roku), w ramach których wielu użytkowników generowało losowość, której nie można odtworzyć za pomocą komputera kwantowego. Jednak idealnym, długoterminowym rozwiązaniem będzie zastosowanie kryptografii odpornej na komputery kwantowe. Istnieją dwa wiodące podejścia, które mogłyby stać się wydajnymi zamiennikami schematu BLS: podpisy [oparte na STARK](https://hackmd.io/@vbuterin/stark_aggregation) oraz [oparte na kratach](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Są one nadal aktywnie badane i opracowywane**.

[Przeczytaj o KZG i zaufanych konfiguracjach](/roadmap/danksharding#what-is-kzg)

## Prostsze i bardziej wydajne Ethereum {#simpler-more-efficient-ethereum}

Złożoność tworzy możliwości wystąpienia błędów lub podatności, które mogą być wykorzystane przez atakujących. Dlatego też częścią planu działania jest uproszczenie Ethereum oraz usunięcie lub zmodyfikowanie kodu, który pozostawał w różnych aktualizacjach, ale nie jest już potrzebny lub można go teraz ulepszyć. Smuklejsza i prostsza baza kodu jest łatwiejsza w utrzymaniu i zrozumieniu dla deweloperów.

Aby uczynić [Wirtualną Maszynę Ethereum (EVM)](/developers/docs/evm) prostszą i wydajniejszą, nieustannie prowadzone są badania i wdrażane usprawnienia. Obejmuje to zarówno modyfikację lub usunięcie starszych komponentów, jak i wprowadzenie nowych optymalizacji.

**Ostatnio wprowadzone zmiany:**

- **Przebudowa obliczania gazu:** Sposób, w jaki obliczany jest [gaz](/glossary/#gas), został znacznie ulepszony dzięki **EIP-1559 (wdrożonemu w aktualizacji London w 2021 r.)**, wprowadzając mechanizm podstawowej opłaty i spalania dla bardziej przewidywalnych cen transakcji.
- **Ograniczenie `SELFDESTRUCT`:** Kod operacyjny `SELFDESTRUCT`, choć rzadko używany, stwarzał potencjalne zagrożenia. Jego funkcjonalność została mocno **ograniczona w aktualizacji Dencun (marzec 2024) poprzez EIP-6780** w celu zmniejszenia zagrożeń, zwłaszcza dotyczących zarządzania stanem.
- **Zmodernizowane typy transakcji:** Wprowadzono nowe formaty transakcji (np. za pośrednictwem **EIP-2718** i **EIP-4844** dla blobów w aktualizacji Dencun) w celu obsługi nowych funkcji i poprawy wydajności w porównaniu ze starszymi typami.

**Bieżące i przyszłe cele:**

- **Dalsze postępowanie z `SELFDESTRUCT`:** Mimo ograniczeń, **potencjalne całkowite usunięcie** kodu operacyjnego `SELFDESTRUCT` jest nadal rozważane w przyszłych aktualizacjach, aby jeszcze bardziej uprościć stan EVM. ([Więcej informacji o problemach z SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Wycofywanie starszych typów transakcji:** Chociaż [klienty Ethereum](/glossary/#consensus-client) wciąż obsługują starsze typy transakcji dla zapewnienia wstecznej kompatybilności, celem jest zachęcenie do migracji do nowszych typów i **potencjalne wycofanie lub całkowite usunięcie obsługi najstarszych formatów** w przyszłości.
- **Kontynuacja badań nad wydajnością gazu:** Trwają prace nad **dalszymi udoskonaleniami obliczania gazu**, potencjalnie obejmującymi koncepcje, takie jak gaz wielowymiarowy, aby lepiej odzwierciedlić zużycie zasobów.
- **Zoptymalizowane operacje kryptograficzne:** Trwają prace nad **wprowadzeniem bardziej wydajnych metod arytmetycznych**, które stanowią podstawę operacji kryptograficznych używanych w EVM.

Podobnie, istnieją aktualizacje, które można wprowadzić w innych częściach obecnych klientów Ethereum. Przykładowo obecne klienty wykonawcze i konsensusu korzystają z różnych rodzajów kompresji danych. Ujednolicenie schematu kompresji w całej sieci znacznie ułatwi i uprości wymianę danych między klientami. Pozostaje to jednak obszarem wciąż wymagającym badań.

## Aktualny postęp {#current-progress}

Wiele długoterminowych aktualizacji zapewniających odporność na przyszłość, w szczególności **pełna odporność kwantowa dla podstawowych protokołów, jest wciąż w fazie badań i może upłynąć kilka lat**, zanim zostaną wdrożone.

Jednak **poczyniono już znaczne postępy w zakresie uproszczeń.** Na przykład kluczowe zmiany, takie jak **ograniczenie `SELFDESTRUCT` (EIP-6780)** i wprowadzenie **transakcji przenoszących bloby (EIP-4844)**, zostały zaimplementowane w **aktualizacji Dencun (marzec 2024)**. Prace nad ujednoliceniem schematów kompresji klientów i innymi usprawnieniami wydajności nadal trwają.

**Przeczytaj także**

- [Gaz](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Struktury danych](/developers/docs/data-structures-and-encoding)