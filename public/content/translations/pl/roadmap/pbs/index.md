---
title: Separacja proponującego i budującego
description: Dowiedz się, jak i dlaczego walidatorzy Ethereum podzielą swoje obowiązki związane z budowaniem i rozgłaszaniem bloków.
lang: pl
---

Obecni walidatorzy [Ethereum](/) tworzą _i_ rozgłaszają bloki. Grupują transakcje, o których dowiedzieli się za pośrednictwem sieci plotkującej (gossip network), i pakują je w blok, który jest wysyłany do węzłów partnerskich w sieci Ethereum. **Separacja proponującego i budującego (PBS)** dzieli te zadania między wielu walidatorów. Budowniczowie bloków stają się odpowiedzialni za tworzenie bloków i oferowanie ich proponującemu blok w każdym slocie. Proponujący blok nie widzi zawartości bloku, po prostu wybiera ten najbardziej opłacalny, otrzymując opłatę od budowniczego bloków (lub budowniczy płaci stawkę proponującemu) przed wysłaniem bloku do swoich węzłów partnerskich.

Jest to ważna aktualizacja z kilku powodów. Po pierwsze, stwarza możliwości zapobiegania cenzurze transakcji na poziomie protokołu. Po drugie, zapobiega wypieraniu hobbystycznych walidatorów przez graczy instytucjonalnych, którzy mogą lepiej optymalizować zyskowność budowania swoich bloków. Po trzecie, pomaga w skalowaniu Ethereum, umożliwiając aktualizacje danksharding.

## PBS a odporność na cenzurę {#pbs-and-censorship-resistance}

Oddzielenie budowniczych bloków od proponujących bloki znacznie utrudnia budowniczym bloków cenzurowanie transakcji. Wynika to z faktu, że można dodać stosunkowo złożone kryteria włączenia, które zapewniają, że przed zaproponowaniem bloku nie miała miejsca żadna cenzura. Ponieważ proponujący blok jest odrębnym podmiotem od budowniczego bloków, może on przyjąć rolę obrońcy przed cenzurującymi budowniczymi bloków.

Na przykład można wprowadzić listy włączenia (inclusion lists), dzięki którym walidatorzy, wiedząc o transakcjach, ale nie widząc ich w blokach, mogą narzucić je jako obowiązkowe w następnym bloku. Lista włączenia jest generowana z lokalnego mempoola proponującego blok (listy transakcji, o których wie) i wysyłana do węzłów partnerskich tuż przed zaproponowaniem bloku. Jeśli brakuje którejkolwiek z transakcji z listy włączenia, proponujący może odrzucić blok, dodać brakujące transakcje przed jego zaproponowaniem lub zaproponować go i pozwolić, aby został odrzucony przez innych walidatorów po jego otrzymaniu. Istnieje również potencjalnie bardziej wydajna wersja tego pomysłu, która zakłada, że budowniczowie muszą w pełni wykorzystać dostępną przestrzeń bloku, a jeśli tego nie zrobią, transakcje są dodawane z listy włączenia proponującego. Jest to wciąż obszar aktywnych badań, a optymalna konfiguracja list włączenia nie została jeszcze ustalona.

[Zaszyfrowane mempoole](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) mogłyby również uniemożliwić budowniczym i proponującym poznanie, które transakcje włączają do bloku, dopóki blok nie zostanie już rozgłoszony.

<ExpandableCard title="Jakie rodzaje cenzury rozwiązuje PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Potężne organizacje mogą wywierać presję na walidatorów, aby cenzurowali transakcje do lub z określonych adresów. Walidatorzy ulegają tej presji, wykrywając adresy z czarnej listy w swojej puli transakcji i pomijając je w blokach, które proponują. Po wprowadzeniu PBS nie będzie to już możliwe, ponieważ proponujący bloki nie będą wiedzieć, jakie transakcje rozgłaszają w swoich blokach. Przestrzeganie zasad cenzury może być ważne dla niektórych osób lub aplikacji, na przykład gdy staje się to prawem w ich regionie. W takich przypadkach zgodność z przepisami odbywa się na poziomie aplikacji, podczas gdy protokół pozostaje niewymagający pozwoleń i wolny od cenzury.

</ExpandableCard>

## PBS a MEV {#pbs-and-mev}

**Maksymalna wartość do wyodrębnienia (MEV)** odnosi się do walidatorów maksymalizujących swoją zyskowność poprzez korzystne porządkowanie transakcji. Typowe przykłady obejmują arbitraż wymian na zdecentralizowanych giełdach (np. frontrunning dużej sprzedaży lub zakupu) lub identyfikowanie możliwości likwidacji pozycji w zdecentralizowanych finansach (DeFi). Maksymalizacja MEV wymaga zaawansowanej wiedzy technicznej i niestandardowego oprogramowania dołączonego do zwykłych walidatorów, co znacznie zwiększa prawdopodobieństwo, że operatorzy instytucjonalni osiągną lepsze wyniki w wyodrębnianiu MEV niż osoby prywatne i hobbystyczni walidatorzy. Oznacza to, że zwroty ze stakingu będą prawdopodobnie wyższe u scentralizowanych operatorów, tworząc siłę centralizującą, która zniechęca do domowego stakingu.

PBS rozwiązuje ten problem poprzez rekonfigurację ekonomii MEV. Zamiast proponującego blok, który sam zajmuje się poszukiwaniem MEV, po prostu wybiera on blok spośród wielu zaoferowanych mu przez budowniczych bloków. Budowniczowie bloków mogli dokonać zaawansowanego wyodrębnienia MEV, ale nagroda za to trafia do proponującego blok. Oznacza to, że nawet jeśli niewielka pula wyspecjalizowanych budowniczych bloków zdominuje wyodrębnianie MEV, nagroda za to może trafić do dowolnego walidatora w sieci, w tym do indywidualnych domowych stakerów.

<ExpandableCard title="Dlaczego centralizacja budowania bloków jest w porządku?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Osoby prywatne mogłyby być zachęcane do stakowania w pulach, a nie na własną rękę, ze względu na zwiększone nagrody oferowane przez zaawansowane strategie MEV. Oddzielenie budowania bloku od propozycji bloku oznacza, że wyodrębnione MEV zostanie rozdzielone na większą liczbę walidatorów, zamiast centralizować się u najskuteczniejszego poszukiwacza MEV. Jednocześnie umożliwienie istnienia wyspecjalizowanych budowniczych bloków zdejmuje ciężar budowania bloków z osób prywatnych, a także zapobiega kradzieży MEV przez jednostki dla siebie, maksymalizując jednocześnie liczbę indywidualnych, niezależnych walidatorów, którzy mogą sprawdzić, czy bloki są uczciwe. Ważną koncepcją jest „asymetria provera i weryfikatora” (prover-verifier asymmetry), która odnosi się do idei, że scentralizowana produkcja bloków jest w porządku, o ile istnieje solidna i maksymalnie zdecentralizowana sieć walidatorów zdolnych udowodnić, że bloki są uczciwe. Decentralizacja jest środkiem, a nie celem samym w sobie – to, czego chcemy, to uczciwe bloki.
</ExpandableCard>

## PBS a danksharding {#pbs-and-danksharding}

Danksharding to sposób, w jaki Ethereum przeskaluje się do >100 000 transakcji na sekundę i zminimalizuje opłaty dla użytkowników rollupów. Opiera się na PBS, ponieważ zwiększa obciążenie pracą budowniczych bloków, którzy będą musieli obliczać dowody dla maksymalnie 64 MB danych rollupa w czasie krótszym niż 1 sekunda. Prawdopodobnie będzie to wymagało wyspecjalizowanych budowniczych, którzy będą w stanie przeznaczyć na to zadanie dość znaczny sprzęt. Jednak w obecnej sytuacji budowanie bloków i tak mogłoby stawać się coraz bardziej scentralizowane wokół bardziej zaawansowanych i potężnych operatorów ze względu na wyodrębnianie MEV. Separacja proponującego i budującego to sposób na zaakceptowanie tej rzeczywistości i zapobieżenie wywieraniu przez nią siły centralizującej na walidację bloku (ważna część) lub dystrybucję nagród za staking. Ogromną korzyścią poboczną jest to, że wyspecjalizowani budowniczowie bloków są również chętni i zdolni do obliczania niezbędnych dowodów danych dla dankshardingu.

## Obecny postęp {#current-progress}

PBS znajduje się w zaawansowanym stadium badań, ale wciąż pozostaje kilka ważnych pytań projektowych, które należy rozwiązać, zanim będzie można stworzyć jego prototyp w klientach Ethereum. Nie ma jeszcze sfinalizowanej specyfikacji. Oznacza to, że do wdrożenia PBS pozostał prawdopodobnie rok lub więcej. Sprawdź najnowszy [stan badań](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Dalsza lektura {#further-reading}

- [Stan badań: odporność na cenzurę w ramach PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Projekty rynku opłat przyjazne dla PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS a odporność na cenzurę](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listy włączenia](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)