---
title: Separacja proponujący-budujący
description: Dowiedz się, w jaki sposób i dlaczego walidatory Ethereum podzielą swoje obowiązki związane z tworzeniem i rozpowszechnianiem bloków.
lang: pl
---

# Separacja proponujący-budujący {#proposer-builder-separation}

Obecne walidatory Ethereum tworzą _i_ rozpowszechniają bloki. Łączą transakcje, o których dowiedziały się za pośrednictwem sieci plotek i grupują je w blok, który jest wysyłany do ich odpowiedników w sieci Ethereum. **Podział proponujący-twórca (PBS)** dzieli te zadania na wiele walidatorów. Twórcy bloków stają się odpowiedzialni za tworzenie bloków i oferowanie ich proponentom bloków w każdym slocie. Proponent bloku nie może zobaczyć zawartości bloku; po prostu wybiera ten najbardziej opłacalny, uiszczając opłatę na rzecz twórcy bloku przed wysłaniem bloku do swoich odpowiedników.

Jest to ważne uaktualnienie z kilku powodów. Po pierwsze, stwarza to możliwości zapobiegania cenzurze transakcji na poziomie protokołu. Po drugie, zapobiega to prześciganiu walidatorów działających hobbystycznie przez uczestników instytucjonalnych, którzy mogą lepiej zoptymalizować rentowność tworzenia ich bloków. Po trzecie, pomaga to w skalowaniu Ethereum poprzez umożliwienie uaktualnienia Dankshardingu.

## PBS i odporność na cenzurę {#pbs-and-censorship-resistance}

Podział na twórców bloków i proponentów bloków znacznie utrudnia twórcom bloków cenzurowanie transakcji. Dzieje się tak, ponieważ można dodać stosunkowo złożone kryteria włączenia, które zapewniają, że przed zaproponowaniem bloku nie doszło do cenzury. Ponieważ proponent bloku jest podmiotem odrębnym od twórcy bloku, może on przyjąć rolę obrońcy przed cenzurowaniem twórców bloków.

Na przykład można wprowadzić listy włączenia, aby w przypadku, gdy walidatory wiedzą o transakcjach, ale nie widzą ich zawartych w blokach, mogli narzucić je jako obowiązkowe w następnym bloku. Lista włączenia jest generowana z lokalnego mempoolu proponenta bloku (lista transakcji, o których wie) i wysyłana do jego odpowiedników tuż przed zaproponowaniem bloku. Jeśli brakuje którejkolwiek z transakcji z listy włączenia, proponent może albo odrzucić blok i dodać brakujące transakcje przed jego zaproponowaniem, albo zaproponować go i pozwolić, aby został odrzucony przez inne walidatory, gdy go otrzymają. Istnieje również potencjalnie bardziej wydajna wersja tego pomysłu, która zakłada, że twórcy muszą w pełni wykorzystać dostępną przestrzeń bloku, a jeśli tego nie zrobią, transakcje są dodawane z listy włączenia proponenta. Jest to nadal obszar aktywnych badań, a optymalna konfiguracja list włączenia nie została jeszcze ustalona.

[ Zaszyfrowane mempoole](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) mogą również uniemożliwić twórcom i proponentom ustalenie, które transakcje są zawarte w bloku, dopóki blok nie zostanie już rozpowszechniony.

<ExpandableCard title="Jakie rodzaje cenzury rozwiązuje PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Potężne organizacje mogą naciskać na walidatorów, aby cenzurowali transakcje z określonych adresów lub na nie. Walidatory stosują się do tej presji, wykrywając adresy z czarnej listy w swojej puli transakcji i pomijając je w proponowanych przez siebie blokach. Po PBS nie będzie to już możliwe, ponieważ osoby proponujące bloki nie będą wiedziały, które transakcje rozpowszechniają w swoich blokach. Dla niektórych osób lub aplikacji ważne może być przestrzeganie zasad cenzury, na przykład gdy jest to prawo obowiązujące w ich regionie. W takich przypadkach zgodność odbywa się na poziomie aplikacji, podczas gdy protokół pozostaje wolny od uprawnień i cenzury.

</ExpandableCard>

## PBS i MEV {#pbs-and-mev}

** Maksymalna wartość możliwa do wydobycia (MEV)** odnosi się do walidatorów maksymalizujących swoją rentowność poprzez korzystne sortowanie transakcji. Typowe przykłady obejmują arbitraż zamian na zdecentralizowanych giełdach (np. wyprzedzenie dużej sprzedaży lub zakupu) lub identyfikowanie okazji do upłynnienia pozycji DeFi. Maksymalizacja MEV wymaga zaawansowanej wiedzy technicznej i niestandardowego oprogramowania dołączonego do zwykłych walidatorów, co znacznie zwiększa prawdopodobieństwo, że operatorzy instytucjonalni osiągną lepsze wyniki niż pojedyncze osoby i walidatory hobbystyczne przy ekstrakcji MEV. Oznacza to, że zwroty ze stakingu będą prawdopodobnie większe w przypadku scentralizowanych operatorów, tworząc siłę centralizującą, która zniechęca do domowego stakingu.

PBS rozwiązuje ten problem poprzez rekonfigurację ekonomii MEV. Zamiast samodzielnego wyszukiwania MEV, proponent bloku po prostu wybiera blok spośród wielu oferowanych mu przez twórców bloków. Twórcy bloków mogli dokonać zaawansowanej ekstrakcji MEV, ale nagroda za to trafia do proponenta bloku. Oznacza to, że nawet jeśli niewielka pula wyspecjalizowanych twórców bloków zdominuje ekstrakcję MEV, nagroda za to może trafić do dowolnego walidatora w sieci, w tym do indywidualnych stakerów domowych.

<ExpandableCard title="Dlaczego centralizacja budowania bloków jest słuszna?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Poszczególne jednostki mogą być zachęcane do stakowania w pulach, a nie samodzielnie, ze względu na zwiększone nagrody oferowane przez wyrafinowane strategie MEV. Oddzielenie budowania bloku od jego proponowania oznacza, że wydobyta MEV zostanie rozłożona na większą liczbę walidatorów zamiast centralizacji z najbardziej efektywnym poszukiwaczem MEV. Jednocześnie zezwolenie na istnienie wyspecjalizowanych twórców bloków zdejmuje ciężar tworzenia bloków z jednostek, a także uniemożliwia jednostkom kradzież MEV dla siebie, jednocześnie maksymalizując liczbę indywidualnych, niezależnych walidatorów, które mogą sprawdzić, czy bloki są uczciwe. Ważną koncepcją jest „asymetria udowadniający-weryfikujący”, która odnosi się do idei, że scentralizowana produkcja bloków jest słuszna, o ile istnieje solidna i maksymalnie zdecentralizowana sieć walidatorów zdolnych do udowodnienia, że bloki są uczciwe. Decentralizacja jest środkiem, a nie celem końcowym — chcemy uczciwych bloków.
</ExpandableCard>

## PBS i Danksharding {#pbs-and-danksharding}

Danksharding to sposób, w jaki Ethereum będzie skalować się do >100 000 transakcji na sekundę i minimalizować opłaty dla użytkowników pakietów zbiorczych. Opiera się on na PBS, ponieważ zwiększa obciążenie twórców bloków, którzy będą musieli obliczyć dowody dla maksymalnie 64 MB danych pakietu zbiorczego w czasie krótszym niż 1 sekunda. Prawdopodobnie będzie to wymagało wyspecjalizowanych twórców, którzy mogą poświęcić dość znaczny sprzęt do tego zadania. Jednak w obecnej sytuacji budowanie bloków może stać się coraz bardziej scentralizowane wokół bardziej wyrafinowanych i potężnych operatorów ze względu na ekstrakcję MEV. Separacja proponujący-budujący jest sposobem na uwzględnienie tej rzeczywistości i zapobieganie wywieraniu przez nią scentralizowanej siły na walidację bloków (ważną część) lub dystrybucję nagród za stakowanie. Wielką korzyścią uboczną jest to, że wyspecjalizowani twórcy bloków są również chętni i zdolni do obliczania niezbędnych dowodów danych dla Dankshardingu.

## Aktualny postęp {#current-progress}

PBS znajduje się na zaawansowanym etapie badań, ale nadal istnieje kilka ważnych kwestii projektowych, które należy rozwiązać, zanim będzie można go prototypować w klientach Ethereum. Nie ma jeszcze ostatecznej specyfikacji. Oznacza to, że PBS doczekamy się prawdopodobnie nie wcześniej niż za rok. Sprawdź najnowszy [stan badań](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Dalsza lektura {#further-reading}

- [Stan badań: odporność na cenzurę w PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Struktury rynku opłat przyjazne dla PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS i odporność na cenzurę](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listy włączenia](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
