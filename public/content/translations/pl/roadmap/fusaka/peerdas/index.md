---
title: PeerDAS
description: Dowiedz się o PeerDAS w ramach aktualizacji protokołu Ethereum o nazwie Fusaka
lang: pl
authors: ["Nixo", "Mario Havel"]
---

Protokół [Ethereum](/) przechodzi swoją najbardziej znaczącą aktualizację skalowania od czasu [wprowadzenia transakcji blob wraz z EIP-4844](/roadmap/danksharding/). W ramach [aktualizacji Fusaka](/roadmap/fusaka/), PeerDAS wprowadza nowy sposób obsługi danych blob, zapewniając mniej więcej o rząd wielkości większą pojemność **[dostępności danych (DA)](/developers/docs/data-availability/)** dla warstw 2 (L2).

[Więcej o mapie drogowej skalowania blobów](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Skalowalność {#scalability}

Wizją Ethereum jest bycie neutralną, bezpieczną i zdecentralizowaną platformą dostępną dla każdego na świecie. Wraz ze wzrostem wykorzystania sieci wymaga to zrównoważenia trylematu skali, bezpieczeństwa i decentralizacji sieci. Gdyby Ethereum po prostu zwiększyło ilość danych obsługiwanych przez sieć w ramach jej obecnego projektu, naraziłoby się na ryzyko przeciążenia [węzłów, na których Ethereum opiera swoją decentralizację](/developers/docs/nodes-and-clients/). Skalowalność wymaga rygorystycznego projektowania mechanizmów, które minimalizują kompromisy.

Jedną ze strategii osiągnięcia tego celu jest umożliwienie istnienia zróżnicowanego ekosystemu rozwiązań skalujących warstwy 2, zamiast przetwarzania wszystkich transakcji w Sieci głównej [warstwy 1 (L1)](/glossary/#layer-1). [Warstwy 2 (L2)](/glossary/#layer-2) lub [rollupy](/glossary#rollups) przetwarzają transakcje na swoich własnych, oddzielnych łańcuchach i wykorzystują Ethereum do weryfikacji i bezpieczeństwa. Publikowanie tylko krytycznych dla bezpieczeństwa zobowiązań i kompresowanie ładunków pozwala warstwom L2 na wydajniejsze korzystanie z pojemności DA Ethereum. Z kolei L1 przenosi mniej danych bez narażania gwarancji bezpieczeństwa, podczas gdy warstwy L2 przyciągają więcej użytkowników przy niższych kosztach gazu. Początkowo warstwy L2 publikowały dane jako `calldata` w zwykłych transakcjach, co konkurowało z transakcjami L1 o gaz i było niepraktyczne dla masowej dostępności danych.

## Proto-danksharding {#proto-danksharding}

Pierwszym ważnym krokiem w kierunku skalowania L2 była aktualizacja Dencun, która wprowadziła [proto-danksharding](/roadmap/danksharding/) (EIP-4844). Ta aktualizacja stworzyła nowy, wyspecjalizowany typ danych dla rollupów zwany blobami. [Bloby](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs) (ang. binary large objects) to efemeryczne fragmenty dowolnych danych, które nie wymagają wykonania w EVM, a węzły przechowują je tylko przez ograniczony czas. To wydajniejsze przetwarzanie pozwoliło warstwom L2 na publikowanie większej ilości danych w Ethereum i jeszcze większe skalowanie. 

Pomimo tego, że korzystanie z blobów przynosi już duże korzyści dla skalowania, jest to tylko część ostatecznego celu. W obecnym protokole każdy węzeł w sieci nadal musi pobrać każdy blob. Wąskim gardłem staje się przepustowość wymagana od poszczególnych węzłów, a ilość danych, które należy pobrać, rośnie bezpośrednio wraz z większą liczbą blobów. 

Ethereum nie idzie na kompromis w kwestii decentralizacji, a przepustowość jest jednym z najbardziej wrażliwych parametrów. Nawet przy potężnej mocy obliczeniowej dostępnej powszechnie dla każdego, kogo na to stać, [ograniczenia przepustowości wysyłania](https://www.speedtest.net/global-index) nawet w wysoce zurbanizowanych miastach w krajach rozwiniętych (takich jak [Niemcy](https://www.speedtest.net/global-index/germany), [Belgia](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) czy [Stany Zjednoczone](https://www.speedtest.net/global-index/united-states)) mogłyby ograniczyć możliwość uruchamiania węzłów tylko do centrów danych, jeśli wymagania dotyczące przepustowości nie zostaną starannie dostrojone.

Operatorzy węzłów mają coraz wyższe wymagania dotyczące przepustowości i przestrzeni dyskowej w miarę wzrostu liczby blobów. Rozmiar i ilość blobów są ograniczone przez te restrykcje. Każdy blob może przenosić do 128 kb danych, przy średnio 6 blobach na blok. Był to dopiero pierwszy krok w kierunku przyszłego projektu, który wykorzystuje bloby w jeszcze bardziej wydajny sposób.

## Próbkowanie dostępności danych (DAS) {#das}

[Dostępność danych](/developers/docs/data-availability/) to gwarancja, że wszystkie dane potrzebne do niezależnej walidacji łańcucha są dostępne dla wszystkich uczestników sieci. Zapewnia to, że dane zostały w pełni opublikowane i mogą być użyte do bezufnościowej weryfikacji nowego stanu łańcucha lub przychodzących transakcji. 

Bloby Ethereum zapewniają silną gwarancję dostępności danych, która zapewnia bezpieczeństwo warstw L2. Aby to zrobić, węzły Ethereum muszą pobierać i przechowywać bloby w całości. Ale co by było, gdybyśmy mogli wydajniej dystrybuować bloby w sieci i uniknąć tego ograniczenia? 

Innym podejściem do przechowywania danych i zapewnienia ich dostępności jest **próbkowanie dostępności danych (DAS)**. Zamiast każdego komputera z uruchomionym Ethereum w pełni przechowującego każdy pojedynczy blob, DAS wprowadza zdecentralizowany podział pracy. Rozbija to ciężar przetwarzania danych poprzez dystrybucję mniejszych, łatwiejszych do zarządzania zadań w całej sieci węzłów. Bloby są dzielone na części, a każdy węzeł pobiera tylko kilka części, korzystając z mechanizmu jednolitej, losowej dystrybucji we wszystkich węzłach. 

Wprowadza to nowy problem – udowodnienie dostępności i integralności danych. Jak sieć może zagwarantować, że dane są dostępne i wszystkie są poprawne, gdy poszczególne węzły przechowują tylko małe fragmenty? Złośliwy węzeł mógłby serwować fałszywe dane i łatwo złamać silne gwarancje dostępności danych! W tym miejscu z pomocą przychodzi kryptografia. 

Aby zapewnić integralność danych, EIP-4844 został już zaimplementowany z zobowiązaniami KZG. Są to dowody kryptograficzne tworzone po dodaniu nowego bloba do sieci. Niewielki dowód jest dołączany do każdego bloku, a węzły mogą zweryfikować, czy otrzymane bloby odpowiadają zobowiązaniu KZG bloku.

DAS to mechanizm, który opiera się na tym i zapewnia, że dane są zarówno poprawne, jak i dostępne. Próbkowanie to proces, w którym węzeł odpytuje tylko niewielką część danych i weryfikuje ją pod kątem zobowiązania. KZG to schemat zobowiązań wielomianowych, co oznacza, że każdy pojedynczy punkt na krzywej wielomianowej może zostać zweryfikowany. Sprawdzając tylko kilka punktów na wielomianie, klient wykonujący próbkowanie może mieć silną probabilistyczną gwarancję, że dane są dostępne. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) to konkretna propozycja, która implementuje mechanizm DAS w Ethereum, stanowiąc prawdopodobnie największą aktualizację od czasu The Merge. PeerDAS ma na celu rozszerzenie danych blob, dzieląc je na kolumny i dystrybuując podzbiór do węzłów.

Ethereum zapożycza sprytną matematykę, aby to osiągnąć: stosuje kodowanie wymazań w stylu Reeda-Solomona do danych blob. Dane blob są reprezentowane jako wielomian, którego współczynniki kodują dane, a następnie oceniają ten wielomian w dodatkowych punktach, aby utworzyć rozszerzony blob, podwajając liczbę ocen. Ta dodana redundancja umożliwia odzyskiwanie po wymazaniu: nawet jeśli brakuje niektórych ocen, oryginalny blob można zrekonstruować, o ile dostępna jest co najmniej połowa wszystkich danych, w tym rozszerzone fragmenty.

![Extended polynomial](./polynomial.png)

W rzeczywistości ten wielomian ma tysiące współczynników. Zobowiązania KZG to wartości rzędu kilku bajtów, coś w rodzaju hasha, znane wszystkim węzłom. Każdy węzeł posiadający wystarczającą liczbę punktów danych może [skutecznie zrekonstruować pełny zestaw danych blob](https://arxiv.org/abs/2207.11079). 

> Ciekawostka: ta sama technika kodowania była używana w płytach DVD. Jeśli porysowałeś płytę DVD, odtwarzacz nadal był w stanie ją odczytać dzięki kodowaniu Reeda-Solomona, które dodaje brakujące fragmenty wielomianu. 

Historycznie dane w łańcuchach bloków, czy to bloki, czy bloby, były rozgłaszane do wszystkich węzłów. Dzięki podejściu PeerDAS polegającemu na podziale i próbkowaniu, rozgłaszanie wszystkiego do wszystkich nie jest już konieczne. Po aktualizacji Fusaka, sieć warstwy konsensusu jest zorganizowana w tematy/podsieci protokołu plotkowania: kolumny blobów są przypisywane do określonych podsieci, a każdy węzeł subskrybuje z góry określone podzbiory i przechowuje tylko te fragmenty.

Dzięki PeerDAS rozszerzone dane blob są dzielone na 128 części zwanych kolumnami. Dane są dystrybuowane do tych węzłów za pośrednictwem dedykowanego protokołu plotkowania w określonych podsieciach, które subskrybują. Każdy zwykły węzeł w sieci uczestniczy w co najmniej 8 losowo wybranych podsieciach kolumn. Otrzymywanie danych z zaledwie 8 ze 128 podsieci oznacza, że ten domyślny węzeł otrzymuje tylko 1/16 wszystkich danych, ale ponieważ dane zostały rozszerzone, jest to 1/8 oryginalnych danych. 

Pozwala to na nowy teoretyczny limit skalowania wynoszący 8-krotność obecnego schematu „każdy pobiera wszystko”. Ponieważ węzły subskrybują różne losowe podsieci obsługujące kolumny blobów, prawdopodobieństwo jest bardzo wysokie, że są one równomiernie rozłożone, a zatem każdy fragment danych istnieje gdzieś w sieci. Węzły uruchamiające walidatory są zobowiązane do subskrybowania większej liczby podsieci z każdym uruchamianym walidatorem.

> Każdy węzeł ma unikalny, losowo wygenerowany identyfikator, który zwykle służy jako jego publiczna tożsamość dla połączeń. W PeerDAS liczba ta jest używana do określenia losowego zestawu podsieci, które musi subskrybować, co skutkuje jednolitą losową dystrybucją wszystkich danych blob.

Gdy węzeł pomyślnie zrekonstruuje oryginalne dane, redystrybuuje odzyskane kolumny z powrotem do sieci, aktywnie naprawiając wszelkie luki w danych i zwiększając ogólną odporność systemu. Węzły połączone z walidatorami o łącznym saldzie ≥4096 ETH muszą być superwęzłami, a zatem muszą subskrybować wszystkie podsieci kolumn danych i przechowywać wszystkie kolumny. Te superwęzły będą stale naprawiać luki w danych. Probabilistycznie samonaprawiająca się natura protokołu pozwala na silne gwarancje dostępności, jednocześnie nie ograniczając domowych operatorów przechowujących tylko części danych. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

Dostępność danych może zostać potwierdzona przez dowolny węzeł przechowujący tylko niewielki podzbiór danych blob dzięki opisanemu powyżej mechanizmowi próbkowania. Ta dostępność jest wymuszana: walidatory muszą przestrzegać nowych reguł wyboru rozwidlenia (fork-choice), co oznacza, że będą akceptować i oddawać głos na bloki dopiero po zweryfikowaniu dostępności danych.

Bezpośrednim wpływem na użytkowników (szczególnie użytkowników L2) są niższe opłaty. Dzięki 8-krotnie większej przestrzeni na dane rollupów, operacje użytkowników na ich łańcuchu z czasem stają się jeszcze tańsze. Jednak niższe opłaty po aktualizacji Fusaka będą wymagały czasu i będą zależeć od BPO.

## Blob-Parameter-Only (BPO) {#bpo}

Sieć teoretycznie będzie w stanie przetwarzać 8 razy więcej blobów, ale wzrost liczby blobów to zmiana, która musi zostać odpowiednio przetestowana i bezpiecznie wdrożona w sposób krokowy. Sieci testowe dają wystarczającą pewność, aby wdrożyć te funkcje w Sieci głównej, ale musimy zapewnić stabilność sieci p2p przed włączeniem znacznie większej liczby blobów. 

Aby stopniowo zwiększać docelową liczbę blobów na blok bez przeciążania sieci, Fusaka wprowadza rozwidlenia **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. W przeciwieństwie do zwykłych rozwidleń, które wymagają szerokiej koordynacji ekosystemu, porozumienia i aktualizacji oprogramowania, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) to wstępnie zaprogramowane aktualizacje, które z czasem zwiększają maksymalną liczbę blobów bez interwencji.

Oznacza to, że natychmiast po aktywacji Fusaka i uruchomieniu PeerDAS liczba blobów pozostanie niezmieniona. Liczba blobów zacznie się podwajać co kilka tygodni, aż osiągnie maksimum 48, podczas gdy programiści będą monitorować, aby upewnić się, że mechanizm działa zgodnie z oczekiwaniami i nie ma negatywnego wpływu na węzły obsługujące sieć.

## Przyszłe kierunki {#future-directions}

PeerDAS to tylko krok [w kierunku większej wizji skalowania FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), czyli dankshardingu. Podczas gdy PeerDAS wykorzystuje kodowanie wymazań 1D dla każdego bloba z osobna, pełny danksharding będzie wykorzystywał pełniejszy schemat kodowania wymazań 2D w całej macierzy danych blob. Rozszerzenie danych w dwóch wymiarach tworzy jeszcze silniejsze właściwości redundancji oraz wydajniejszą rekonstrukcję i weryfikację. Realizacja FullDAS będzie wymagała znacznych optymalizacji sieci i protokołu, a także dodatkowych badań.

## Dalsza lektura {#further-reading}

- [PeerDAS: Peer Data Availability sampling autorstwa Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Dokumentacja PeerDAS w Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Udowodnienie bezpieczeństwa PeerDAS bez AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik o PeerDAS, jego wpływie i testowaniu Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)