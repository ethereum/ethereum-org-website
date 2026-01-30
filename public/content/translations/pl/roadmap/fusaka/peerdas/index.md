---
title: PeerDAS
description: Dowiedz się o PeerDAS w ramach uaktualnienia protokołu Ethereum o nazwie Fusaka
lang: pl
---

# PeerDAS {#peer-das}

Protokół Ethereum przechodzi swoje najważniejsze uaktualnienie skalowalności od czasu [wprowadzenia transakcji typu blob w ramach EIP-4844](/roadmap/danksharding/). W ramach [uaktualnienia Fusaka](/roadmap/fusaka/) PeerDAS wprowadza nowy sposób obsługi danych typu blob, zapewniając w przybliżeniu dziesięciokrotny wzrost pojemności **[dostępności danych (DA)](/developers/docs/data-availability/)** dla warstw L2.

[Więcej o planie działania skalowania blobów](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Skalowalność {#scalability}

Wizją Ethereum jest bycie neutralną, bezpieczną i zdecentralizowaną platformą dostępną dla każdego na świecie. W miarę wzrostu wykorzystania sieci wymaga to zrównoważenia trylematu skali, bezpieczeństwa i decentralizacji sieci. Gdyby Ethereum po prostu zwiększyło ilość danych obsługiwanych przez sieć w ramach jej obecnej konstrukcji, istniałoby ryzyko przeciążenia [węzłów, na których Ethereum opiera swoją decentralizację](/developers/docs/nodes-and-clients/). Skalowalność wymaga rygorystycznego projektowania mechanizmów, które minimalizują kompromisy.

Jedną ze strategii osiągnięcia tego celu jest umożliwienie istnienia zróżnicowanego ekosystemu rozwiązań skalujących warstwy 2, zamiast przetwarzania wszystkich transakcji w sieci głównej [warstwy 1 (L1)](/glossary/#layer-1). [Warstwy 2 (L2)](/glossary/#layer-2) lub [pakiety zbiorcze (rollups)](/glossary#rollups) przetwarzają transakcje na swoich własnych, oddzielnych łańcuchach i używają Ethereum do weryfikacji i zapewnienia bezpieczeństwa. Publikowanie tylko krytycznych dla bezpieczeństwa zobowiązań i kompresowanie ładunków pozwala warstwom L2 na bardziej efektywne wykorzystanie pojemności DA Ethereum. W rezultacie warstwa L1 przenosi mniej danych bez naruszania gwarancji bezpieczeństwa, podczas gdy L2 wdrażają więcej użytkowników przy niższych kosztach gazu. Początkowo warstwy L2 publikowały dane jako `calldata` w zwykłych transakcjach, co konkurowało o gaz z transakcjami L1 i było niepraktyczne dla masowej dostępności danych.

## Proto-Danksharding {#proto-danksharding}

Pierwszym dużym krokiem w kierunku skalowania L2 było uaktualnienie Dencun, które wprowadziło [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). To uaktualnienie stworzyło nowy, wyspecjalizowany typ danych dla pakietów zbiorczych zwany blobami. [Bloby](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), czyli binarne duże obiekty, to efemeryczne fragmenty dowolnych danych, które nie wymagają wykonania przez EVM, a węzły przechowują je tylko przez ograniczony czas. To bardziej wydajne przetwarzanie pozwoliło warstwom L2 publikować więcej danych w Ethereum i skalować się jeszcze bardziej.

Pomimo już istniejących dużych korzyści dla skalowania używanie blobów jest tylko częścią ostatecznego celu. W obecnym protokole każdy węzeł w sieci nadal musi pobierać każdy blob. Wąskim gardłem staje się przepustowość wymagana od poszczególnych węzłów, a ilość danych do pobrania rośnie wprost proporcjonalnie do liczby blobów.

Ethereum nie idzie na kompromis w kwestii decentralizacji, a przepustowość jest jednym z najbardziej wrażliwych parametrów. Nawet przy dużej mocy obliczeniowej, szeroko dostępnej dla każdego, kogo na nią stać, [ograniczenia przepustowości wysyłania](https://www.speedtest.net/global-index) nawet w wysoko zurbanizowanych miastach krajów rozwiniętych (takich jak [Niemcy](https://www.speedtest.net/global-index/germany), [Belgia](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) czy [Stany Zjednoczone](https://www.speedtest.net/global-index/united-states)) mogą ograniczyć działanie węzłów tylko do centrów danych, jeśli wymagania dotyczące przepustowości nie zostaną starannie dostrojone.

Operatorzy węzłów mają coraz wyższe wymagania dotyczące przepustowości i przestrzeni dyskowej w miarę wzrostu liczby blobów. Rozmiar i ilość blobów są ograniczone przez te ograniczenia. Każdy blob może przenosić do 128 kb danych przy średniej 6 blobów na blok. To był tylko pierwszy krok w kierunku przyszłego projektu, który wykorzystuje bloby w jeszcze bardziej efektywny sposób.

## Próbkowanie dostępności danych {#das}

[Dostępność danych](/developers/docs/data-availability/) to gwarancja, że wszystkie dane potrzebne do niezależnej walidacji łańcucha są dostępne dla wszystkich uczestników sieci. Zapewnia to, że dane zostały w pełni opublikowane i mogą być użyte do weryfikacji bez zaufania nowego stanu łańcucha lub przychodzących transakcji.

Bloby Ethereum zapewniają silną gwarancję dostępności danych, co zapewnia bezpieczeństwo warstw L2. Aby to zrobić, węzły Ethereum muszą pobierać i przechowywać bloby w całości. A co jeśli możemy dystrybuować bloby w sieci bardziej efektywnie i uniknąć tego ograniczenia?

Innym podejściem do przechowywania danych i zapewnienia ich dostępności jest **próbkowanie dostępności danych (DAS)**. Zamiast tego, aby każdy komputer uruchamiający Ethereum w pełni przechowywał każdy blob, DAS wprowadza zdecentralizowany podział pracy. Rozkłada obciążenie przetwarzania danych poprzez dystrybucję mniejszych, łatwiejszych do zarządzania zadań w całej sieci węzłów. Bloby są dzielone na części i każdy węzeł pobiera tylko kilka części za pomocą mechanizmu zapewniającego jednolitą losową dystrybucję we wszystkich węzłach.

Wprowadza to nowy problem – dowodzenie dostępności i integralności danych. Jak sieć może zagwarantować, że dane są dostępne i wszystkie są poprawne, skoro poszczególne węzły przechowują tylko małe fragmenty? Złośliwy węzeł mógłby serwować fałszywe dane i łatwo złamać silne gwarancje dostępności danych! Tu z pomocą przychodzi kryptografia.

Aby zapewnić integralność danych, EIP-4844 został już wdrożony ze zobowiązaniami KZG. Są to dowody kryptograficzne tworzone, gdy nowy blob jest dodawany do sieci. Mały dowód jest zawarty w każdym bloku, a węzły mogą zweryfikować, czy otrzymane bloby odpowiadają zobowiązaniu KZG bloku.

DAS to mechanizm, który na tym bazuje i zapewnia, że dane są zarówno poprawne, jak i dostępne. Próbkowanie to proces, w którym węzeł odpytuje tylko małą część danych i weryfikuje je na podstawie zobowiązania. KZG to schemat zobowiązań wielomianowych, co oznacza, że każdy pojedynczy punkt na krzywej wielomianowej może zostać zweryfikowany. Sprawdzając tylko kilka punktów na wielomianie, klient przeprowadzający próbkowanie może mieć silną probabilistyczną gwarancję, że dane są dostępne.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) to konkretna propozycja, która implementuje mechanizm DAS w Ethereum, stanowiąc prawdopodobnie największe uaktualnienie od czasu The Merge. PeerDAS został zaprojektowany do rozszerzania danych blob, dzieląc je na kolumny i dystrybuując podzbiór do węzłów.

Ethereum pożycza trochę sprytnej matematyki, aby to osiągnąć: stosuje kodowanie wymazujące w stylu Reeda-Solomona do danych typu blob. Dane bloba są reprezentowane jako wielomian, którego współczynniki kodują dane, następnie ten wielomian jest obliczany w dodatkowych punktach, aby utworzyć rozszerzony blob, podwajając liczbę ewaluacji. Ta dodana nadmiarowość umożliwia odzyskiwanie po wymazaniu: nawet jeśli brakuje niektórych ewaluacji, oryginalny blob może zostać zrekonstruowany, o ile dostępna jest co najmniej połowa wszystkich danych, w tym rozszerzonych fragmentów.

![Rozszerzony wielomian](./polynomial.png)

W rzeczywistości ten wielomian ma tysiące współczynników. Zobowiązania KZG to wartości o wielkości kilku bajtów, coś w rodzaju hasha, znane wszystkim węzłom. Każdy węzeł przechowujący wystarczającą liczbę punktów danych może [efektywnie zrekonstruować pełny zestaw danych bloba](https://arxiv.org/abs/2207.11079).

> Ciekawostka: ta sama technika kodowania była używana przez płyty DVD. Jeśli zarysowałeś płytę DVD, odtwarzacz nadal był w stanie ją odczytać dzięki kodowaniu Reeda-Solomona, które dodaje brakujące fragmenty wielomianu.

Historycznie dane w blockchainach, czy to bloki, czy bloby, były rozgłaszane do wszystkich węzłów. Dzięki podejściu PeerDAS polegającym na dzieleniu i próbkowaniu rozgłaszanie wszystkiego do wszystkich nie jest już konieczne. Po wprowadzeniu Fusaka sieć warstwy konsensusu jest zorganizowana w tematy/podsieci plotek (gossip): kolumny blobów są przypisywane do określonych podsieci, a każdy węzeł subskrybuje z góry określone podzestawy i przechowuje tylko te fragmenty.

W PeerDAS rozszerzone dane bloba są dzielone na 128 części zwanych kolumnami. Dane są dystrybuowane do tych węzłów za pośrednictwem dedykowanego protokołu plotek (gossip) w określonych podsieciach, które subskrybują. Każdy zwykły węzeł w sieci uczestniczy w co najmniej 8 losowo wybranych podsieciach kolumn. Odbieranie danych tylko z 8 ze 128 podsieci oznacza, że ten domyślny węzeł otrzymuje tylko 1/16 wszystkich danych, ale ponieważ dane zostały rozszerzone, stanowi to 1/8 oryginalnych danych.

Pozwala to na nowy teoretyczny limit skalowania 8x w stosunku do obecnego schematu „każdy pobiera wszystko”. Gdy węzły subskrybują różne losowe podsieci obsługujące kolumny blobów, prawdopodobieństwo, że są one jednolicie rozproszone, jest bardzo wysokie i dlatego każdy fragment danych istnieje gdzieś w sieci. Węzły uruchamiające walidatory są zobowiązane do subskrybowania większej liczby podsieci z każdym uruchomionym walidatorem.

> Każdy węzeł ma unikalny, losowo wygenerowany identyfikator, który normalnie służy jako jego publiczna tożsamość dla połączeń. W PeerDAS liczba ta jest używana do określenia losowego zestawu podsieci, które musi subskrybować, co skutkuje jednolitą losową dystrybucją wszystkich danych bloba.

Gdy węzeł pomyślnie zrekonstruuje oryginalne dane, redystrybuuje odzyskane kolumny z powrotem do sieci, aktywnie uzupełniając wszelkie luki w danych i zwiększając ogólną odporność systemu. Węzły połączone z walidatorami o łącznym saldzie ≥4096 ETH muszą być superwęzłem i dlatego muszą subskrybować wszystkie podsieci kolumn danych i przechowywać wszystkie kolumny. Te superwęzły będą stale uzupełniać luki w danych. Probabilistycznie samonaprawiająca się natura protokołu pozwala na silne gwarancje dostępności, nie ograniczając jednocześnie operatorów domowych przechowujących tylko części danych.

![Węzły subskrybujące kolumny dystrybuowane przez podsieci](./subnets.png)

Dostępność danych może być potwierdzona przez dowolny węzeł przechowujący tylko mały podzbiór danych bloba dzięki opisanemu powyżej mechanizmowi próbkowania. Ta dostępność jest egzekwowana: walidatorzy muszą przestrzegać nowych zasad wyboru forka, co oznacza, że będą akceptować i głosować na bloki dopiero po zweryfikowaniu dostępności danych.

Bezpośrednim wpływem na użytkowników (w szczególności użytkowników L2) są niższe opłaty. Dzięki 8-krotnie większej przestrzeni na dane pakietów zbiorczych operacje użytkowników na ich łańcuchu stają się z czasem jeszcze tańsze. Ale niższe opłaty po wprowadzeniu Fusaka będą wymagały czasu i będą zależeć od BPO.

## Tylko parametry bloba (BPO) {#bpo}

Sieć teoretycznie będzie w stanie przetworzyć 8 razy więcej blobów, ale zwiększenie liczby blobów to zmiana, która musi być odpowiednio przetestowana i bezpiecznie wdrożona w sposób stopniowy. Sieci testowe dają wystarczającą pewność, aby wdrożyć funkcje w sieci głównej, ale musimy zapewnić stabilność sieci p2p przed włączeniem znacznie większej liczby blobów.

Aby stopniowo zwiększać docelową liczbę blobów na blok bez przeciążania sieci, Fusaka wprowadza forki **[Tylko parametry bloba (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. W przeciwieństwie do zwykłych forków, które wymagają szerokiej koordynacji ekosystemu, porozumienia i aktualizacji oprogramowania, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) to zaprogramowane uaktualnienia, które zwiększają maksymalną liczbę blobów w czasie bez interwencji.

Oznacza to, że natychmiast po aktywacji Fusaka i uruchomieniu PeerDAS liczba blobów pozostanie niezmieniona. Liczba blobów zacznie się podwajać co kilka tygodni, aż osiągnie maksimum 48, podczas gdy deweloperzy będą monitorować, aby upewnić się, że mechanizm działa zgodnie z oczekiwaniami i nie ma negatywnego wpływu na węzły działające w sieci.

## Przyszłe kierunki {#future-directions}

PeerDAS to tylko krok [w kierunku większej wizji skalowania FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), czyli Dankshardingu. Podczas gdy PeerDAS używa kodowania wymazującego 1D do każdego bloba indywidualnie, pełny Danksharding będzie używał bardziej kompletnego schematu kodowania wymazującego 2D na całej matrycy danych bloba. Rozszerzanie danych w dwóch wymiarach tworzy jeszcze silniejsze właściwości nadmiarowości oraz bardziej wydajną rekonstrukcję i weryfikację. Realizacja FullDAS będzie wymagać znacznych optymalizacji sieci i protokołu, a także dodatkowych badań.

## Dalsza lektura {#further-reading}

- [PeerDAS: Próbkowanie dostępności danych peer autorstwa Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Dokumentacja PeerDAS w Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Dowodzenie bezpieczeństwa PeerDAS bez AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik o PeerDAS, jego wpływie i testowaniu Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)