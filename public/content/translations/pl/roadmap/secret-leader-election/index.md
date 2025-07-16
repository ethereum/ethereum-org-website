---
title: Tajny wybór lidera
description: Wyjaśnienie, w jaki sposób tajny wybór lidera może pomóc chronić walidatory przed atakami
lang: pl
summaryPoints:
  - Adres IP proponenta bloków może być znany z wyprzedzeniem, co czyni go podatnym na ataki
  - Tajny wybór lidera ukrywa tożsamość walidatorów, dzięki czemu nie są oni znani z wyprzedzeniem
  - Rozszerzeniem tego pomysłu jest losowy wybór walidatora w każdym slocie.
---

# Tajny wybór lidera {#single-secret-leader-election}

W opbecnym mechanizmie konsensusu opartym na [proof-of-stake](/developers/docs/consensus-mechanisms/pos) lista nadchodzących proponentów bloków jest publiczna i możliwe jest mapowanie ich adresów IP. Oznacza to, że atakujący mogą zidentyfikować, które walidatory będą proponować blok i zaatakować je za pomocą ataku blokady usług (DOS), który uniemożliwi im zaproponowanie bloku na czas.

Może to stworzyć okazję dla atakującego do osiągnięcia korzyści. Na przykład proponent bloku wybrany do slotu `n+1` może blokować usługi (DOS) osobie proponującej w slocie `n`, tak że straci ona swoją szansę na zaproponowanie bloku. Umożliwiłoby to atakującemu proponentowi bloku wyodrębnienie MEV z obu slotów lub przejęcie wszystkich transakcji, które powinny zostać podzielone na dwa bloki i zamiast tego zawarcie ich wszystkich w jednym, wraz z uzyskaniem wszelkich powiązanych opłat. Prawdopodobnie wpływa to bardziej na walidatory domowe niż na wyrafinowane instytucjonalne walidatory, które mogą korzystać z bardziej zaawansowanych metod ochrony przed atakami DOS, a zatem mogą być siłą centralizującą.

Jest kilka rozwiązań tego problemu. Jednym z nich jest [technologia rozproszonego walidatora](https://github.com/ethereum/distributed-validator-specs), która ma na celu rozłożenie różnych zadań związanych z uruchomieniem walidatora na wiele komputerów wraz z redundancją, tak aby atakującemu było znacznie trudniej zapobiec zaproponowaniu bloku w określonym slocie. Jednak najbardziej niezawodnym rozwiązaniem jest **tajny wybór pojedynczego lidera (SSLE)**.

## Tajny wybór pojedynczego lidera (SSLE) {#secret-leader-election}

W SSLE wykorzystywana jest sprytna kryptografia, aby zapewnić, że tylko wybrany walidator wie, że został wybrany. Działa to w taki sposób, że każdy walidator składa zobowiązanie do tajemnicy, którą wszyscy dzielą. Zobowiązania są przemieszane i ponownie konfigurowane, aby nikt nie mógł mapować zobowiązań do walidatorów, ale każdy walidator wie, które zobowiązanie należy do niego. Następnie losowo wybierane jest jedno zobowiązanie. Jeśli walidator wykryje, że jego zobowiązanie zostało wybrane, wie, że nadeszła jego kolej na zaproponowanie bloku.

Główna implementacja tego pomysłu nosi nazwę [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Która działa w następujący sposób:

1. Walidatory zobowiązują się do wspólnej tajemnicy. Schemat zobowiązania jest zaprojektowany w taki sposób, aby można go było powiązać z tożsamością walidatora, ale jest także losowy, tak aby żadna strona trzecia nie mogła dokonać inżynierii wstecznej powiązania i połączyć określonego zobowiązania z określonym walidatorem.
2. Na początku każdej epoki, losowy zestaw walidatorów jest wybierany do próbkowania zobowiązań od 16.384 walidatorów przy użyciu RANDAO.
3. Przez następne 8182 sloty (1 dzień) proponenci bloków mieszają i losują podzbiór zobowiązań przy użyciu własnej prywatnej entropii.
4. Po zakończeniu mieszania, RANDAO jest używane do utworzenia uporządkowanej listy zobowiązań. Ta lista jest mapowana do slotów Ethereum.
5. Walidatory widzą, że ich zobowiązanie jest przypisane do określonego slotu, a gdy ten slot nadejdzie, proponują blok.
6. Powtórz te kroki, aby przypisanie zobowiązań do slotów zawsze znacznie wyprzedzało bieżący slot.

Dzięki temu atakujący nie wiedzą z wyprzedzeniem, który konkretny walidator będzie proponował następny blok, co zapobiega możliwości ataków DOS.

## Tajny wybór niepojedynczego lidera (SnSLE) {#secret-non-single-leader-election}

Istnieje również osobna propozycja, której celem jest stworzenie scenariusza, w którym każdy z walidatorów ma losową szansę na zaproponowanie bloku w każdym slocie, podobnie jak w przypadku proponowania bloku w ramach proof-of-work, znanego jako **tajny wybór niepojedynczego lidera (SnSLE)**. Jednym z prostych sposobów na to jest wykorzystanie funkcji RANDAO używanej do losowego wybierania walidatorów w obecnym protokole. Założenie RANDAO polega na tym, że wystarczająco losowa liczba jest generowana poprzez mieszanie hashów przesłanych przez wiele niezależnych walidatorów. W SnSLE te hashe mogą służyć do wyboru następnego proponenta bloku, na przykład poprzez wybór hashu o najniższej wartości. Zakres prawidłowych hashów można ograniczyć, aby dostosować prawdopodobieństwo wyboru poszczególnych walidatorów w każdym slocie. Zakładając, że hash musi wynosić mniej niż `2^256 * 5 / N`, gdzie `N` = liczba aktywnych walidatorów, szansa na wybranie dowolnego pojedynczego walidatora w każdym slocie wynosiłaby `5/N`. W tym przykładzie istniałoby 99,3% szans na to, że co najmniej jeden proponent wygeneruje prawidłowy hash w każdym slocie.

## Aktualny postęp {#current-progress}

SSLE i SnSLE wciąż znajdują się w fazie badań. Nie ma jeszcze ostatecznej specyfikacji dla żadnego z tych pomysłów. SSLE i SnSLE to konkurencyjne propozycje, których nie można wdrożyć jednocześnie. Przed wdrożeniem wymagają one dalszych badań i rozwoju, prototypowania i wdrażania w publicznych sieciach testowych.

## Dalsza lektura {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
