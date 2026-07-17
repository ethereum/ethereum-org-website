---
title: Tajny wybór lidera
description: Wyjaśnienie, w jaki sposób tajny wybór lidera może pomóc chronić walidatorów przed atakami
lang: pl
summaryPoints:
  - Adres IP proponujących blok może być znany z wyprzedzeniem, co czyni ich podatnymi na ataki
  - Tajny wybór lidera ukrywa tożsamość walidatorów, dzięki czemu nie można ich poznać z wyprzedzeniem
  - Rozszerzeniem tego pomysłu jest losowy wybór walidatora w każdym slocie.
---

W dzisiejszym mechanizmie konsensusu opartym na [dowodzie stawki (PoS)](/developers/docs/consensus-mechanisms/pos), lista nadchodzących proponujących blok jest publiczna i możliwe jest zmapowanie ich adresów IP. Oznacza to, że atakujący mogliby zidentyfikować, którzy walidatorzy mają zaproponować blok, i obrać ich za cel ataku typu odmowa usługi (DOS), co uniemożliwiłoby im zaproponowanie bloku na czas.

Mogłoby to stworzyć atakującemu okazję do osiągnięcia zysku. Na przykład proponujący blok wybrany dla slotu `n+1` mógłby przeprowadzić atak DOS na proponującego w slocie `n`, aby ten stracił swoją szansę na zaproponowanie bloku. Pozwoliłoby to atakującemu proponującemu blok na wydobycie MEV z obu slotów lub przejęcie wszystkich transakcji, które powinny zostać podzielone na dwa bloki, i zamiast tego umieszczenie ich wszystkich w jednym, zyskując wszystkie powiązane opłaty. Prawdopodobnie dotknie to domowych walidatorów bardziej niż zaawansowanych walidatorów instytucjonalnych, którzy mogą stosować bardziej zaawansowane metody ochrony przed atakami DOS, i w związku z tym może stanowić siłę centralizującą.

Istnieje kilka rozwiązań tego problemu. Jednym z nich jest [technologia rozproszonych walidatorów (DVT)](https://github.com/ethereum/distributed-validator-specs), która ma na celu rozdzielenie różnych zadań związanych z uruchomieniem walidatora na wiele maszyn, z zachowaniem redundancji, dzięki czemu atakującemu znacznie trudniej jest zapobiec zaproponowaniu bloku w danym slocie. Jednak najbardziej solidnym rozwiązaniem jest **pojedynczy tajny wybór lidera (SSLE)**.

## Pojedynczy tajny wybór lidera {#secret-leader-election}

W SSLE wykorzystywana jest sprytna kryptografia, aby zapewnić, że tylko wybrany walidator wie, że został wybrany. Działa to w ten sposób, że każdy walidator przesyła zobowiązanie do wspólnego sekretu. Zobowiązania są tasowane i rekonfigurowane tak, aby nikt nie mógł przypisać zobowiązań do walidatorów, ale każdy walidator wie, które zobowiązanie należy do niego. Następnie jedno zobowiązanie jest wybierane losowo. Jeśli walidator wykryje, że wybrano jego zobowiązanie, wie, że nadeszła jego kolej na zaproponowanie bloku.

Wiodąca implementacja tego pomysłu nosi nazwę [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Działa ona w następujący sposób:

1. Walidatorzy zobowiązują się do wspólnego sekretu. Schemat zobowiązania jest zaprojektowany tak, aby można go było powiązać z tożsamością walidatora, ale także zrandomizować, aby żadna strona trzecia nie mogła odtworzyć powiązania i połączyć konkretnego zobowiązania z konkretnym walidatorem.
2. Na początku epoki wybierany jest losowy zestaw walidatorów do próbkowania zobowiązań od 16 384 walidatorów przy użyciu RANDAO.
3. Przez następne 8182 sloty (1 dzień) proponujący blok tasują i randomizują podzbiór zobowiązań, używając własnej prywatnej entropii.
4. Po zakończeniu tasowania RANDAO jest używane do utworzenia uporządkowanej listy zobowiązań. Lista ta jest mapowana na sloty Ethereum.
5. Walidatorzy widzą, że ich zobowiązanie jest przypisane do konkretnego slotu, a kiedy ten slot nadchodzi, proponują blok.
6. Kroki te są powtarzane, aby przypisanie zobowiązań do slotów zawsze znacznie wyprzedzało obecny slot.

Zapobiega to wcześniejszemu poznaniu przez atakujących, który konkretnie walidator zaproponuje następny blok, uniemożliwiając przeprowadzanie ataków DOS.

## Tajny wybór niepojedynczego lidera (SnSLE) {#secret-non-single-leader-election}

Istnieje również osobna propozycja, która ma na celu stworzenie scenariusza, w którym każdy z walidatorów ma losową szansę na zaproponowanie bloku w każdym slocie, podobnie jak propozycja bloku była rozstrzygana w ramach dowodu pracy (PoW), znana jako **tajny wybór niepojedynczego lidera (SnSLE)**. Jednym z prostych sposobów na osiągnięcie tego jest wykorzystanie funkcji RANDAO używanej do losowego wyboru walidatorów w dzisiejszym protokole. Idea RANDAO polega na tym, że wystarczająco losowa liczba jest generowana poprzez mieszanie hashy przesłanych przez wielu niezależnych walidatorów. W SnSLE te hashe mogłyby zostać użyte do wyboru następnego proponującego blok, na przykład poprzez wybór hasha o najniższej wartości. Zakres prawidłowych hashy można by ograniczyć, aby dostosować prawdopodobieństwo wyboru poszczególnych walidatorów w każdym slocie. Zakładając, że hash musi być mniejszy niż `2^256 * 5 / N`, gdzie `N` = liczba aktywnych walidatorów, szansa na wybranie dowolnego pojedynczego walidatora w każdym slocie wynosiłaby `5/N`. W tym przykładzie istniałoby 99,3% szans na to, że co najmniej jeden proponujący wygeneruje prawidłowy hash w każdym slocie.

## Obecny postęp {#current-progress}

Zarówno SSLE, jak i SnSLE znajdują się w fazie badań. Nie ma jeszcze sfinalizowanej specyfikacji dla żadnego z tych pomysłów. SSLE i SnSLE to konkurujące ze sobą propozycje, których nie można wdrożyć jednocześnie. Przed wydaniem wymagają one więcej badań i rozwoju, prototypowania oraz wdrożenia w publicznych sieciach testowych.

## Dalsza lektura {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)