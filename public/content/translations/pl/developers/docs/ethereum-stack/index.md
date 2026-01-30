---
title: Wprowadzenie do stosu Ethereum
description: Omówienie różnych warstw stosu Ethereum i sposobu, w jaki się ze sobą łączą.
lang: pl
---

Podobnie jak każdy stos oprogramowania, kompletny „stos Ethereum” będzie się różnił w zależności od projektu w zależności od Twoich celów.

Istnieją jednak podstawowe komponenty Ethereum, które pomagają stworzyć model mentalny tego, jak aplikacje wchodzą w interakcję z blockchainem Ethereum. Zrozumienie warstw stosu pomoże Ci zrozumieć różne sposoby integracji Ethereum z projektami oprogramowania.

## Poziom 1: Wirtualna Maszyna Ethereum {#ethereum-virtual-machine}

[Wirtualna Maszyna Ethereum (EVM)](/developers/docs/evm/) to środowisko uruchomieniowe dla inteligentnych kontraktów w Ethereum. Wszystkie inteligentne kontrakty i zmiany stanu na blockchainie Ethereum są wykonywane przez [transakcje](/developers/docs/transactions/). EVM obsługuje cały proces przetwarzania transakcji w sieci Ethereum.

Podobnie jak w przypadku dowolnej maszyny wirtualnej, EVM tworzy poziom abstrakcji pomiędzy kodem wykonującym a maszyną wykonującą (węzeł Ethereum). Obecnie EVM działa na tysiącach węzłów rozmieszczonych na całym świecie.

EVM używa zbioru instrukcji kodów operacyjnych w celu wykonywania konkretnych zadań. Te (140 unikalnych) kodów operacyjnych pozwala EVM być [kompletnym w sensie Turinga](https://en.wikipedia.org/wiki/Turing_completeness), co oznacza, że EVM jest w stanie obliczyć prawie wszystko, przy założeniu posiadania wystarczających zasobów.

Jako programista dapek nie musisz wiedzieć zbyt wiele o EVM, poza tym, że istnieje i że niezawodnie zasila wszystkie aplikacje w Ethereum bez przestojów.

## Poziom 2: Inteligentne kontrakty {#smart-contracts}

[Inteligentne kontrakty](/developers/docs/smart-contracts/) to programy wykonywalne, które działają na blockchainie Ethereum.

Inteligentne kontrakty są pisane przy użyciu określonych [języków programowania](/developers/docs/smart-contracts/languages/), które kompilują się do kodu bajtowego EVM (niskopoziomowych instrukcji maszynowych zwanych kodami operacyjnymi).

Inteligentne kontrakty służą nie tylko jako biblioteki open source, ale są w zasadzie otwartymi usługami API, które działają cały czas i nie można ich wyłączyć. Inteligentne kontrakty udostępniają funkcje publiczne, z którymi użytkownicy i aplikacje ([dapki](/developers/docs/dapps/)) mogą wchodzić w interakcję bez konieczności uzyskania pozwolenia. Każda aplikacja może integrować się z wdrożonymi inteligentnymi kontraktami w celu komponowania funkcjonalności, na przykład dodając [źródła danych](/developers/docs/oracles/) lub obsługując wymianę tokenów. Dodatkowo każdy może wdrożyć nowe inteligentne kontrakty w Ethereum, aby dodać niestandardową funkcjonalność w celu zaspokojenia potrzeb swojej aplikacji.

Jako dewelopera dapp musisz zapisać inteligentne kontrakty tylko wtedy, gdy chcesz dodać niestandardowe funkcje w blockchainu Ethereum. Możesz znaleźć że możesz osiągnąć większość lub wszystkie potrzeby swojego projektu jedynie poprzez integrację z istniejącymi inteligentnymi kontraktami, na przykład jeśli chcesz wspierać płatności w stabilnych monetach lub włączyć zdecentralizowaną wymianę tokenów.

## Poziom 3: Węzły Ethereum {#ethereum-nodes}

Aby aplikacja mogła wejść w interakcję z blockchainem Ethereum, musi połączyć się z [węzłem Ethereum](/developers/docs/nodes-and-clients/). Połączenie z węzłem umożliwia odczytywanie danych blockchainu Ethereum i/lub wysyłanie transakcji do sieci.

Węzły Ethereum są komputerami, które obsługują oprogramowanie - klienta Ethereum. Klient jest implementacją Ethereum, która za zadanie ma weryfikację wszystkich transakcji w kolejnych blokach, utrzymywać bezpieczeństwo sieci i poprawność danych. **Węzły Ethereum SĄ blockchainem Ethereum**. Kolektywnie przechowują stan sieci Ethereum i ustalają konsensus nad transakcjami, aby zmienić stan blockchainu.

Łącząc swoją aplikację z węzłem Ethereum (za pośrednictwem [API JSON-RPC](/developers/docs/apis/json-rpc/)), może ona odczytywać dane z blockchainu (takie jak salda kont użytkowników), a także rozgłaszać nowe transakcje w sieci (takie jak przesyłanie ETH między kontami użytkowników lub wykonywanie funkcji inteligentnych kontraktów).

## Poziom 4: API klienta Ethereum {#ethereum-client-apis}

Wiele bibliotek ułatwiających (tworzonych i utrzymywanych przez społeczność open source Ethereum) pozwala aplikacjom łączyć się i komunikować z blockchainem Ethereum.

Jeśli Twoja aplikacja dla użytkownika jest aplikacją internetową, możesz zainstalować za pomocą `npm install` [API JavaScript](/developers/docs/apis/javascript/) bezpośrednio w swoim frontendzie. Możesz też zaimplementować tę funkcjonalność po stronie serwera, używając API w języku [Python](/developers/docs/programming-languages/python/) lub [Java](/developers/docs/programming-languages/java/).

Chociaż API te nie są niezbędnymi elementami stosu, odsuwają one wiele bezpośrednich interakcyjnych złożoności z węzłem Ethereum. Zapewniają one również funkcje pomocnicze (np. konwersję ETH na Gwei), dzięki czemu jako deweloper możesz spędzać mniej czasu na zmaganiu się ze złożonością klientów Ethereum, a więcej na funkcjonalności specyficznej dla Twojej aplikacji.

## Poziom 5: Aplikacje dla użytkowników końcowych {#end-user-applications}

Na samej górze stosu są aplikacje komunikujące się bezpośrednio z użytkownikiem. Są to standardowe aplikacje regularnie używane i budowane w dzisiejszych czasach: głównie aplikacje webowe i mobilne.

Sposób, w jaki tworzone są te interfejsy użytkownika, pozostaje w gruncie rzeczy niezmieniony. Często użytkownicy nie muszą wiedzieć, że używana przez nich aplikacja została utworzona przy użyciu blockchainu.

## Gotowy do stworzenia swojego stosu? Gotowy, by wybrać swój stack? {#ready-to-choose-your-stack}

Sprawdź nasz przewodnik po [konfiguracji lokalnego środowiska deweloperskiego](/developers/local-environment/) dla Twojej aplikacji Ethereum.

## Dalsza lektura {#further-reading}

- [Architektura aplikacji Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
