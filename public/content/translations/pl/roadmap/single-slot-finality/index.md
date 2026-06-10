---
title: Ostateczność w pojedynczym slocie
description: Wyjaśnienie ostateczności w pojedynczym slocie
lang: pl
---

Sfinalizowanie bloku [Ethereum](/) zajmuje około 15 minut. Możemy jednak sprawić, by mechanizm konsensusu Ethereum weryfikował bloki wydajniej i drastycznie skrócić czas do ostateczności. Zamiast czekać piętnaście minut, bloki mogłyby być proponowane i finalizowane w tym samym slocie. Koncepcja ta jest znana jako **ostateczność w pojedynczym slocie (SSF)**.

## Czym jest ostateczność? {#what-is-finality}

W opartym na dowodzie stawki (PoS) mechanizmie konsensusu Ethereum, ostateczność odnosi się do gwarancji, że blok nie może zostać zmieniony ani usunięty z blockchaina bez spalenia co najmniej 33% całkowitego stakowanego ETH. Jest to bezpieczeństwo „kryptoekonomiczne”, ponieważ pewność wynika z niezwykle wysokich kosztów związanych ze zmianą kolejności lub zawartości łańcucha, co powstrzymałoby każdego racjonalnego aktora ekonomicznego przed podjęciem takiej próby.

## Dlaczego dążyć do szybszej ostateczności? {#why-aim-for-quicker-finality}

Obecny czas do ostateczności okazał się zbyt długi. Większość użytkowników nie chce czekać 15 minut na ostateczność, a dla aplikacji i giełd, które mogą wymagać wysokiej przepustowości transakcji, konieczność tak długiego oczekiwania na pewność, że ich transakcje są trwałe, jest niewygodna. Opóźnienie między propozycją bloku a jego sfinalizowaniem stwarza również okazję do krótkich reorganizacji, które atakujący mógłby wykorzystać do cenzurowania określonych bloków lub ekstrakcji MEV. Mechanizm zajmujący się etapowym ulepszaniem bloków jest również dość złożony i był kilkakrotnie łatany w celu usunięcia luk w zabezpieczeniach, co czyni go jedną z części bazy kodu Ethereum, w której częściej mogą pojawiać się subtelne błędy. Wszystkie te problemy można by wyeliminować, skracając czas do ostateczności do pojedynczego slotu.

## Kompromis między decentralizacją, czasem a narzutem {#the-decentralization-time-overhead-tradeoff}

Gwarancja ostateczności nie jest natychmiastową właściwością nowego bloku; sfinalizowanie nowego bloku wymaga czasu. Powodem tego jest fakt, że walidatory reprezentujące co najmniej 2/3 całkowitego stakowanego ETH w sieci muszą zagłosować na blok („poświadczyć”), aby został on uznany za sfinalizowany. Każdy węzeł walidujący w sieci musi przetwarzać poświadczenia z innych węzłów, aby wiedzieć, czy blok osiągnął próg 2/3, czy nie.

Im krótszy czas na osiągnięcie ostateczności, tym więcej mocy obliczeniowej wymaga każdy węzeł, ponieważ przetwarzanie poświadczeń musi odbywać się szybciej. Ponadto, im więcej węzłów walidujących istnieje w sieci, tym więcej poświadczeń musi zostać przetworzonych dla każdego bloku, co również zwiększa wymaganą moc obliczeniową. Im więcej wymaganej mocy obliczeniowej, tym mniej osób może uczestniczyć, ponieważ do uruchomienia każdego węzła walidującego potrzebny jest droższy sprzęt. Wydłużenie czasu między blokami zmniejsza moc obliczeniową wymaganą w każdym węźle, ale także wydłuża czas do ostateczności, ponieważ poświadczenia są przetwarzane wolniej.

Dlatego istnieje kompromis między narzutem (mocą obliczeniową), decentralizacją (liczbą węzłów, które mogą uczestniczyć w walidacji łańcucha) a czasem do ostateczności. Idealny system równoważy minimalną moc obliczeniową, maksymalną decentralizację i minimalny czas do ostateczności.

Obecny mechanizm konsensusu Ethereum zrównoważył te trzy parametry poprzez:

- **Ustalenie minimalnej stawki na 32 ETH**. Ustanawia to górny limit liczby poświadczeń walidatorów, które muszą być przetwarzane przez poszczególne węzły, a tym samym górny limit wymagań obliczeniowych dla każdego węzła.
- **Ustalenie czasu do ostateczności na ~15 minut**. Daje to wystarczająco dużo czasu walidatorom uruchomionym na zwykłych komputerach domowych na bezpieczne przetwarzanie poświadczeń dla każdego bloku.

Przy obecnym projekcie mechanizmu, aby skrócić czas do ostateczności, konieczne jest zmniejszenie liczby walidatorów w sieci lub zwiększenie wymagań sprzętowych dla każdego węzła. Istnieją jednak ulepszenia, które można wprowadzić w sposobie przetwarzania poświadczeń, co pozwoli na zliczenie większej liczby poświadczeń bez zwiększania narzutu w każdym węźle. Bardziej wydajne przetwarzanie pozwoli na określenie ostateczności w pojedynczym slocie, a nie w ciągu dwóch epok.

## Drogi do SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Obecny mechanizm konsensusu łączy poświadczenia od wielu walidatorów, znanych jako komitety, aby zmniejszyć liczbę wiadomości, które każdy walidator musi przetworzyć w celu zwalidowania bloku. Każdy walidator ma możliwość poświadczania w każdej epoce (32 sloty), ale w każdym slocie poświadcza tylko podzbiór walidatorów, znany jako „komitet”. Robią to, dzieląc się na podsieci, w których kilku walidatorów jest wybieranych na „agregatorów”. Każdy z tych agregatorów łączy wszystkie podpisy, które widzi od innych walidatorów w swojej podsieci, w jeden zbiorczy podpis. Agregator, który zawiera największą liczbę indywidualnych wkładów, przekazuje swój zbiorczy podpis proponującemu blok, który włącza go do bloku wraz ze zbiorczym podpisem z innych komitetów.

Proces ten zapewnia wystarczającą przepustowość, aby każdy walidator mógł zagłosować w każdej epoce, ponieważ `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. W momencie pisania tego tekstu (luty 2023 r.) istnieje ~513 000 aktywnych walidatorów.

W tym schemacie każdy walidator może zagłosować na blok tylko poprzez rozłożenie swoich poświadczeń na całą epokę. Istnieją jednak potencjalne sposoby na ulepszenie mechanizmu, tak aby _każdy walidator miał szansę poświadczyć w każdym slocie_.
</ExpandableCard>

Od czasu zaprojektowania mechanizmu konsensusu Ethereum, schemat agregacji podpisów (BLS) okazał się znacznie bardziej skalowalny, niż początkowo sądzono, a zdolność klientów do przetwarzania i weryfikacji podpisów również uległa poprawie. Okazuje się, że przetwarzanie poświadczeń od ogromnej liczby walidatorów jest w rzeczywistości możliwe w pojedynczym slocie. Na przykład, przy milionie walidatorów, z których każdy głosuje dwa razy w każdym slocie, a czas slotu jest dostosowany do 16 sekund, węzły musiałyby weryfikować podpisy z minimalną prędkością 125 000 agregacji na sekundę, aby przetworzyć wszystkie 1 milion poświadczeń w ramach slotu. W rzeczywistości weryfikacja jednego podpisu zajmuje zwykłemu komputerowi około 500 nanosekund, co oznacza, że 125 000 można wykonać w ~62,5 ms – znacznie poniżej progu jednej sekundy.

Dalszy wzrost wydajności można by osiągnąć poprzez tworzenie superkomitetów składających się np. z 125 000 losowo wybranych walidatorów na slot. Tylko ci walidatorzy mogą głosować na blok, a zatem tylko ten podzbiór walidatorów decyduje o tym, czy blok zostanie sfinalizowany. To, czy jest to dobry pomysł, czy nie, sprowadza się do tego, jak kosztowny według społeczności powinien być udany atak na Ethereum. Dzieje się tak, ponieważ zamiast wymagać 2/3 całkowitego stakowanego etheru, atakujący mógłby sfinalizować nieuczciwy blok za pomocą 2/3 stakowanego etheru _w tym superkomitecie_. Jest to wciąż aktywny obszar badań, ale wydaje się prawdopodobne, że w przypadku zestawu walidatorów wystarczająco dużego, aby w ogóle wymagać superkomitetów, koszt ataku na jeden z tych podkomitetów będzie niezwykle wysoki (np. koszt ataku denominowany w ETH wynosiłby `2/3 * 125,000 * 32 = ~2.6 million ETH`). Koszt ataku można dostosować, zwiększając rozmiar zestawu walidatorów (np. dostosowując rozmiar walidatora tak, aby koszt ataku był równy 1 milionowi etherów, 4 milionom etherów, 10 milionom etherów itp.). [Wstępne ankiety](https://youtu.be/ojBgyFl6-v4?t=755) społeczności zdają się sugerować, że 1-2 miliony etherów to akceptowalny koszt ataku, co oznacza ~65 536 - 97 152 walidatorów na superkomitet.

Jednak weryfikacja nie jest prawdziwym wąskim gardłem – to agregacja podpisów stanowi prawdziwe wyzwanie dla węzłów walidatorów. Skalowanie agregacji podpisów będzie prawdopodobnie wymagało zwiększenia liczby walidatorów w każdej podsieci, zwiększenia liczby podsieci lub dodania dodatkowych warstw agregacji (tj. wdrożenia komitetów komitetów). Częścią rozwiązania może być zezwolenie na wyspecjalizowanych agregatorów – podobnie jak budowanie bloków i generowanie zobowiązań dla danych rollupów zostanie zlecone wyspecjalizowanym budującym bloki w ramach separacji proponującego i budującego (PBS) oraz dankshardingu.

## Jaka jest rola reguły wyboru rozwidlenia w SSF? {#role-of-the-fork-choice-rule}

Dzisiejszy mechanizm konsensusu opiera się na ścisłym powiązaniu między gadżetem ostateczności (algorytmem, który określa, czy 2/3 walidatorów poświadczyło dany łańcuch) a regułą wyboru rozwidlenia (algorytmem wyboru rozwidlenia, który decyduje, który łańcuch jest właściwy, gdy istnieje wiele opcji). Algorytm wyboru rozwidlenia bierze pod uwagę tylko bloki _od_ ostatniego sfinalizowanego bloku. W ramach SSF nie byłoby żadnych bloków do rozważenia przez regułę wyboru rozwidlenia, ponieważ ostateczność następuje w tym samym slocie, w którym proponowany jest blok. Oznacza to, że w ramach SSF w danym momencie aktywny byłby _albo_ algorytm wyboru rozwidlenia, _albo_ gadżet ostateczności. Gadżet ostateczności finalizowałby bloki, w których 2/3 walidatorów było online i uczciwie poświadczało. Jeśli blok nie jest w stanie przekroczyć progu 2/3, reguła wyboru rozwidlenia wkroczyłaby, aby określić, którym łańcuchem podążać. Stwarza to również okazję do utrzymania mechanizmu wycieku za nieaktywność, który odzyskuje łańcuch, w którym >1/3 walidatorów przechodzi w tryb offline, aczkolwiek z pewnymi dodatkowymi niuansami.

## Nierozwiązane problemy {#outstanding-issues}

Problem ze skalowaniem agregacji poprzez zwiększanie liczby walidatorów na podsieć polega na tym, że prowadzi to do większego obciążenia sieci peer-to-peer. Problem z dodawaniem warstw agregacji polega na tym, że jest to dość skomplikowane w inżynierii i dodaje opóźnienia (tj. proponujący blok może potrzebować więcej czasu, aby usłyszeć od wszystkich agregatorów podsieci). Nie jest również jasne, jak poradzić sobie ze scenariuszem, w którym w sieci jest więcej aktywnych walidatorów, niż można wykonalnie przetworzyć w każdym slocie, nawet przy agregacji podpisów BLS. Jednym z potencjalnych rozwiązań jest to, że ponieważ wszyscy walidatorzy poświadczają w każdym slocie i nie ma komitetów w ramach SSF, limit 32 ETH na saldo efektywne mógłby zostać całkowicie zniesiony, co oznacza, że operatorzy zarządzający wieloma walidatorami mogliby skonsolidować swoją stawkę i uruchamiać ich mniej, zmniejszając liczbę wiadomości, które węzły walidujące muszą przetworzyć, aby uwzględnić cały zestaw walidatorów. Opiera się to na zgodzie dużych stakujących na konsolidację swoich walidatorów. Możliwe jest również nałożenie stałego limitu na liczbę walidatorów lub ilość stakowanego ETH w dowolnym momencie. Wymaga to jednak pewnego mechanizmu decydowania, którzy walidatorzy mogą uczestniczyć, a którzy nie, co może powodować niepożądane efekty wtórne.

## Obecny postęp {#current-progress}

SSF jest w fazie badań. Nie oczekuje się, że zostanie wdrożony przez kilka lat, prawdopodobnie po innych istotnych aktualizacjach, takich jak [drzewa Verkle](/roadmap/verkle-trees/) i [danksharding](/roadmap/danksharding/).

## Dalsza lektura {#further-reading}

- [Vitalik o SSF na EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Notatki Vitalika: Ścieżki do ostateczności w pojedynczym slocie](https://notes.ethereum.org/@vbuterin/single_slot_finality)