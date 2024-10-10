---
title: Finalizacja pojedynczego slotu
description: Objaśnienie finalizacji pojedynczego slotu
lang: pl
---

# Finalizacja pojedynczego slotu {#single-slot-finality}

Finalizacja bloku Ethereum zajmuje około 15 minut. Możemy jednak sprawić, że mechanizm konsensusu Ethereum będzie weryfikował bloki efektywniej i znacznie skróci czas osiągnięcia finalizacji. Zamiast czekać piętnaście minut, bloki można by zaproponować i sfinalizować w tym samym slocie. Koncepcja ta znana jest jako **finalizacja pojedynczego slotu (SSF)**.

## Czym jest finalizacja? {#what-is-finality}

W mechanizmie konsensusu Ethereum opartym na proof-of-stake finalizacja odnosi się do gwarancji, że blok nie może zostać zmieniony lub usunięty z blockchainu bez spalenia co najmniej 33% wszystkich zestakowanych ETH. Jest to bezpieczeństwo „krypto-ekonomiczne”, ponieważ pewność wynika z niezwykle wysokich kosztów związanych ze zmianą kolejności lub zawartości łańcucha, która uniemożliwiłyby jakiemukolwiek racjonalnemu podmiotowi gospodarczemu podjęcie takiej próby.

## Po co dążyć do szybszej finalizacji? {#why-aim-for-quicker-finality}

Obecny czas finalizacji okazał się zbyt długi. Większość użytkowników nie chce czekać 15 minut na finalizację, a dla aplikacji i giełd, którym może zależeć na wysokiej przepustowości transakcji, niewygodnie jest czekać tak długo dla uzyskania pewności, że ich transakcje są trwałe. Opóźnienie między propozycją bloku a jego finalizacją stwarza również okazję do krótkich reorganizacji, które atakujący mógłby wykorzystać do cenzurowania niektórych bloków lub wyodrębnienia MEV. Mechanizm, który zajmuje się uaktualnianiem bloków etapami, jest również dość złożony i był kilkakrotnie łatany w celu usunięcia luk w zabezpieczeniach, co czyni go jedną z części bazy kodu Ethereum, w której istnieje większe prawdopodobieństwo wystąpienia drobnych błędów. Wszystkie te problemy można by wyeliminować skracając czas finalizacji do pojedynczego slotu.

## Kompromis decentralizacji / czasu / kosztów ogólnych {#the-decentralization-time-overhead-tradeoff}

Gwarancja finalizacji nie jest natychmiastową właściwością nowego bloku; finalizacja nowego bloku wymaga czasu. Wynika to z faktu, że walidatorzy reprezentujący co najmniej 2/3 wszystkich zestakowanych ETH w sieci muszą zagłosować za blokiem („poświadczyć”), aby został on uznany za sfinalizowany. Każdy węzeł walidujący w sieci musi przetwarzać poświadczenia z innych węzłów, aby wiedzieć, że blok osiągnął lub nie osiągnął tego progu 2/3.

Im krótszy czas finalizacji, tym większa moc obliczeniowa jest wymagana w każdym węźle, ponieważ przetwarzanie poświadczeń musi odbywać się szybciej. Ponadto im więcej węzłów walidujących istnieje w sieci, tym więcej poświadczeń musi zostać przetworzonych dla każdego bloku, co również zwiększa wymaganą moc obliczeniową. Im większa wymagana moc obliczeniowa, tym mniej osób może wziąć udział, ponieważ do uruchomienia każdego węzła walidacyjnego potrzebny jest droższy sprzęt. Wydłużenie czasu między blokami zmniejsza moc obliczeniową wymaganą w każdym węźle, ale także wydłuża czas finalizacji, ponieważ poświadczenia są przetwarzane wolniej.

W związku z tym istnieje kompromis między kosztami ogólnymi (moc obliczeniowa), decentralizacją (liczba węzłów, które mogą uczestniczyć w walidacji łańcucha) i czasem finalizacji. Idealny system równoważy minimalną moc obliczeniową, maksymalną decentralizację i minimalny czas finalizacji.

Obecny mechanizm konsensusu Ethereum zrównoważył te trzy parametry poprzez:

- **Ustawienie minimalnej stawki na 32 ETH**. Określa to górny limit liczby poświadczeń walidatorów, które muszą być przetwarzane przez poszczególne węzły, a tym samym górny limit wymagań obliczeniowych dla każdego węzła.
- **Ustawienie czasu finalizacji na około 15 minut**. Daje to wystarczająco dużo czasu walidatorom działającym na zwykłych komputerach domowych na bezpieczne przetworzenie poświadczeń dla każdego bloku.

Przy obecnej strukturze mechanizmu skrócenie czasu finalizacji wymaga zmniejszenia liczby walidatorów w sieci lub zwiększenia wymagań sprzętowych dla każdego węzła. Istnieją jednak ulepszenia, które można wprowadzić w sposobie przetwarzania poświadczeń, które mogą zezwolić na zliczanie większej liczby poświadczeń bez zwiększania obciążenia każdego węzła. Bardziej wydajne przetwarzanie pozwoli na określenie finalizacji w pojedynczym slocie, a nie w dwóch epokach.

## Drogi do SSF {#routes-to-ssf}

<ExpandableCard title= "Dlaczego obecnie nie możemy mieć SSF?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Obecny mechanizm konsensusu łączy poświadczenia od wielu walidatorów znanych jako komitety w celu zmniejszenia liczby wiadomości, jaką każdy walidator musi przetworzyć w celu walidacji bloku. Każdy walidator ma możliwość poświadczania w każdej epoce (32 sloty), ale w każdym slocie poświadcza tylko podzbiór walidatorów znanych jako „komitet”. Robią to, dzieląc się na podsieci, w których kilka walidatorów jest wybieranych jako „agregatory”. Każdy z tych agregatorów łączy wszystkie podpisy, które widzą od innych walidatorów w swojej podsieci, w jeden zagregowany podpis. Agregator, który uwzględni największą liczbę indywidualnych wkładów, podaje swój zagregowany podpis do proponenta bloków, który dołącza go do bloku wraz z innymi zagregowanymi podpisami od innych komitetów.

Proces ten zapewnia każdemu walidatorowi wystarczającą możliwość zagłosowania w każdej epoce, ponieważ `32 sloty * 64 komitety * 256 walidatorów na komitet = 524 288 walidatorów na epokę`. W czasie pisania tego tekstu (luty 2023) aktywnych jest około 513 000 walidatorów.

W tym schemacie każdy walidator może głosować na blok, rozdzielając jedynie swoje poświadczenia na całą epokę. Istnieją jednak potencjalne sposoby na polepszenie tego mechanizmu tak, aby _każdy walidator miał szansę na poświadczanie w każdym slocie_.
</ExpandableCard>

Od czasu zaprojektowania mechanizmu konsensusu Ethereum okazało się, że schemat agregacji podpisów (BSL) jest bardziej skalowalny niż początkowo sądzono, a zdolność klientów do przetwarzania i weryfikowania podpisów również uległa poprawie. Okazuje się, że przetwarzanie poświadczeń od dużej ilości walidatorów jest w rzeczywistości możliwe w pojedynczym slocie. Na przykład przy milionie walidatorów, z których każdy głosuje dwukrotnie w każdym slocie, i czasie slotu ustawionym na 16 sekund, od węzłów byłoby wymagane weryfikowanie podpisów z minimalną prędkością 125 000 agregacji na sekundę, aby przetworzyć cały milion poświadczeń w ramach jednego slotu. W rzeczywistości normalny komputer potrafi zweryfikować jeden podpis w czasie 500 nanosekund, co oznacza, że zweryfikowanie 125 000 podpisów zajęłoby około 62,5m s — o wiele mniej niż wymagany próg jednej sekundy.

Dalszy wzrost wydajności można by osiągnąć przez stworzenie superkomitetów składających się z np. 125 000 losowo wybranych walidatorów na slot. Tylko ci walidatorzy mogliby głosować na blok i dlatego tylko ten podzbiór walidatorów decydowałby o tym, czy blok zostanie sfinalizowany. To, czy jest to dobry pomysł, czy nie, sprowadza się do tego, jaki koszt skutecznego ataku na Ethereum preferowałaby społeczność. Zamiast posiadania 2/3 całego zestakowanego etheru, atakujący mógłby bowiem sfinalizować nieuczciwy blok przy pomocy 2/3 całego zestakowanego etheru _w tym superkomitecie_. Jest to wciąż aktywny obszar badań, ale wydaje się możliwe, że dla zbioru walidatorów dostatecznie dużego, aby w pierwszej kolejności wymagać powołania superkomitetów, koszt ataku na jeden z tych podkomitetów byłby wyjątkowo wysoki (np. koszt ataku wyrażony w ETH wynosiłby `2/3 * 125 000 * 32 = ~2,6 miliona ETH`). Koszt ataku można dostosować przez zwiększenie rozmiaru zbioru walidatorów (np. zmienienie ilości walidatorów tak, aby koszt ataku wynosił 1 mln ETH, 4 mln ETH, 10 mln ETH itp.). [Wstępne ankiety](https://youtu.be/ojBgyFl6-v4?t=755) wśród społeczności sugerują, że 1-2 mln etheru to akceptowalny koszt ataku, co oznaczałoby około 65 536 do 97 152 walidatorów na superkomitet.

Weryfikacja nie jest jednak prawdziwym wąskim gardłem — jest nim agregacja podpisów, które stanowi prawdziwe wyzwanie dla węzłów walidatora. Skalowanie agregacji podpisów będzie najprawdopodobniej wymagać zwiększenia ilości walidatorów w każdej podsieci, zwiększenia ilości podsieci lub dodania dodatkowych warstw agregacji (tj. wdrożenia komitetu komitetów). Częścią rozwiązania może być zezwolenie na wyspecjalizowanych agregatorów — podobnie jak tworzenie bloków i tworzenie poświadczeń dla danych pakietu zbiorczego będzie zlecone wyspecjalizowanym twórcom bloków w ramach podziału proponent-twórca (PBS) i Dankshardingu.

## Jak jest rola zasady wyboru forka w SSF? {#role-of-the-fork-choice-rule}

Obecny mechanizm konsensusu opiera się na ścisłym powiązaniu między gadżetem finalizacji (algorytmem, który określa, które 2/3 walidatorów poświadczyło określony łańcuch) i zasadą wyboru forka (algorytmem, który decyduje, który łańcuch jest prawidłowy, kiedy jest do wyboru parę opcji). Algorytm wyboru forka bierze pod uwagę tylko bloki _od_ ostatniego sfinalizowanego bloku. W SSF nie byłoby żadnych bloków do uwzględnienia zasady wyboru forka, ponieważ finalizacja odbywa się w tym samym slocie, w którym blok został zaproponowany. Oznacza to, że w SSF _albo_ algorytm wyboru forka, _albo_ gadżet finalizacji byłby aktywny cały czas. Gadżet finalizacji finalizowałby bloki, w których 2/3 walidatorów była online i uczciwie poświadczała. Jeśli blok nie jest w stanie przekroczyć progu 2/3, zasada wyboru forka określa, za którym łańcuchem podążać. Stwarza to również możliwość zachowania mechanizmu wycieku nieaktywności, który odzyskuje łańcuch, w którym >1/3 walidatorów przechodzi w tryb offline, jednakże z pewnymi dodatkowymi różnicami.

## Nierozstrzygnięte kwestie {#outstanding-issues}

Problem ze skalowaniem agregacji poprzez zwiększanie ilości walidatorów na podsieć polega na tym, że dochodzi do większego obciążenia sieci peer-to-peer. Natomiast problem z dodawaniem warstw agregacji polega na tym, że proces techniczny jest dość skomplikowany i zwiększa opóźnienie (tj. może upłynąć więcej czasu, zanim proponent bloku otrzyma informacje od wszystkich agregatorów podsieci). Nie do końca też wiadomo, jak poradzić sobie ze scenariuszem, w którym jest więcej aktywnych walidatorów w sieci niż może zostać przetworzone w każdym slocie, nawet z agregacją podpisów BLS. Możliwym rozwiązaniem mogłoby być to, że ponieważ wszyscy walidatorzy poświadczają w każdym slocie, a w SSF nie ma komitetów, limit 32 ETH efektywnego salda mógłby zostać całkowicie usunięty, co oznacza, że operatorzy zarządzający wieloma walidatorami mogliby skonsolidować swoje stawki i uruchomić mniejszą ich liczbę, zmniejszając liczbę wiadomości, które węzły walidacyjne musiałyby przetworzyć, aby uwzględnić cały zestaw walidatorów. Polega to na wspólnej zgodzie dużych stakerów na skonsolidowanie swoich walidatorów. Możliwe jest również w każdym momencie nałożenie stałego limitu na liczbę walidatorów bądź kwotę zestakowanego ETH. Wymaga to jednak mechanizmu, który decydowałby, które walidatory mogą, a które nie mogą uczestniczyć, co mogłoby powodować niepożądane efekty.

## Aktualny postęp {#current-progress}

SSF jest w fazie badań. Jego wdrożenia nie należy się spodziewać w najbliższych kilku latach - nastąpi to prawdopodobnie po innych znaczących uaktualnieniach, takich jak [drzewa Verkle](/roadmap/verkle-trees/) i [Danksharding](/roadmap/danksharding/).

## Dalsza lektura {#further-reading}

- [Vitalik o SSF na EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Uwagi Vitalika: Drogi do finalizacji pojedynczego slotu](https://notes.ethereum.org/@vbuterin/single_slot_finality)
