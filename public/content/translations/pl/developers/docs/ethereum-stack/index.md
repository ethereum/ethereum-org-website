---
title: Wprowadzenie do stosu technologicznego Ethereum
description: "Przegląd różnych warstw stosu technologicznego Ethereum i tego, jak do siebie pasują."
lang: pl
---

Podobnie jak w przypadku każdego stosu oprogramowania, kompletny „stos Ethereum” będzie się różnić w zależności od projektu i jego celów.

Istnieją jednak podstawowe komponenty Ethereum, które pomagają stworzyć model mentalny tego, jak aplikacje wchodzą w interakcję z blockchainem Ethereum. Zrozumienie warstw stosu pomoże ci pojąć różne sposoby integracji Ethereum z projektami oprogramowania.

## Poziom 1: Maszyna Wirtualna Ethereum (EVM) {#ethereum-virtual-machine}

[Maszyna Wirtualna Ethereum (EVM)](/developers/docs/evm/) to środowisko uruchomieniowe dla inteligentnych kontraktów w Ethereum. Wszystkie inteligentne kontrakty i zmiany stanu na blockchainie Ethereum są wykonywane przez [transakcje](/developers/docs/transactions/). EVM obsługuje całe przetwarzanie transakcji w sieci Ethereum.

Podobnie jak każda maszyna wirtualna, EVM tworzy poziom abstrakcji między wykonywanym kodem a maszyną wykonującą (węzłem Ethereum). Obecnie EVM działa na tysiącach węzłów rozproszonych po całym świecie.

Wewnętrznie EVM używa zestawu instrukcji kodów operacji do wykonywania określonych zadań. Te (140 unikalnych) kody operacji sprawiają, że EVM jest [kompletna w sensie Turinga](https://en.wikipedia.org/wiki/Turing_completeness), co oznacza, że EVM jest w stanie obliczyć niemal wszystko, jeśli dysponuje wystarczającymi zasobami.

Jako programista zdecentralizowanych aplikacji (dapp), nie musisz wiedzieć o EVM wiele więcej poza tym, że istnieje i niezawodnie napędza wszystkie aplikacje na Ethereum bez przestojów.

## Poziom 2: Inteligentne kontrakty {#smart-contracts}

[Inteligentne kontrakty](/developers/docs/smart-contracts/) to wykonywalne programy działające na blockchainie Ethereum.

Inteligentne kontrakty są pisane przy użyciu określonych [języków programowania](/developers/docs/smart-contracts/languages/), które kompilują się do kodu bajtowego EVM (niskopoziomowych instrukcji maszynowych zwanych kodami operacji).

Inteligentne kontrakty nie tylko służą jako biblioteki open source, ale są w zasadzie otwartymi usługami API, które działają bez przerwy i nie mogą zostać wyłączone. Inteligentne kontrakty udostępniają publiczne funkcje, z którymi użytkownicy i aplikacje ([dappy](/developers/docs/dapps/)) mogą wchodzić w interakcje bez konieczności uzyskiwania pozwolenia. Każda aplikacja może zintegrować się z wdrożonymi inteligentnymi kontraktami, aby komponować funkcjonalności, takie jak dodawanie [kanałów danych](/developers/docs/oracles/) lub obsługa wymiany tokenów. Dodatkowo każdy może wdrożyć nowe inteligentne kontrakty w Ethereum, aby dodać niestandardową funkcjonalność spełniającą potrzeby jego aplikacji.

Jako programista dappów, będziesz musiał pisać inteligentne kontrakty tylko wtedy, gdy zechcesz dodać niestandardową funkcjonalność na blockchainie Ethereum. Może się okazać, że zaspokoisz większość lub wszystkie potrzeby swojego projektu, po prostu integrując się z istniejącymi inteligentnymi kontraktami, na przykład jeśli chcesz obsługiwać płatności w stablecoinach lub umożliwić zdecentralizowaną wymianę tokenów.

## Poziom 3: Węzły Ethereum {#ethereum-nodes}

Aby aplikacja mogła wchodzić w interakcję z blockchainem Ethereum, musi połączyć się z [węzłem Ethereum](/developers/docs/nodes-and-clients/). Połączenie z węzłem pozwala na odczytywanie danych z blockchaina i/lub wysyłanie transakcji do sieci.

Węzły Ethereum to komputery z uruchomionym oprogramowaniem – klientem Ethereum. Klient to implementacja Ethereum, która weryfikuje wszystkie transakcje w każdym bloku, dbając o bezpieczeństwo sieci i dokładność danych. **Węzły Ethereum to blockchain Ethereum**. Wspólnie przechowują one stan blockchaina Ethereum i osiągają konsensus w sprawie transakcji w celu zmiany stanu blockchaina.

Łącząc swoją aplikację z węzłem Ethereum (za pośrednictwem [API JSON-RPC](/developers/docs/apis/json-rpc/)), twoja aplikacja jest w stanie odczytywać dane z blockchaina (takie jak salda kont użytkowników), a także rozgłaszać nowe transakcje do sieci (takie jak przesyłanie ETH między kontami użytkowników lub wykonywanie funkcji inteligentnych kontraktów).

## Poziom 4: API klientów Ethereum {#ethereum-client-apis}

Wiele wygodnych bibliotek (tworzonych i utrzymywanych przez społeczność open source Ethereum) pozwala twoim aplikacjom łączyć się i komunikować z blockchainem Ethereum.

Jeśli twoja aplikacja skierowana do użytkownika jest aplikacją internetową, możesz zdecydować się na `npm install` [API JavaScript](/developers/docs/apis/javascript/) bezpośrednio w swoim frontendzie. A może wolisz zaimplementować tę funkcjonalność po stronie serwera, używając API [Python](/developers/docs/programming-languages/python/) lub [Java](/developers/docs/programming-languages/java/).

Chociaż te API nie są niezbędnym elementem stosu, abstrahują one znaczną część złożoności bezpośredniej interakcji z węzłem Ethereum. Zapewniają również funkcje narzędziowe (np. konwersję ETH na gwei), dzięki czemu jako programista możesz spędzać mniej czasu na radzeniu sobie z zawiłościami klientów Ethereum, a więcej na skupieniu się na funkcjonalności specyficznej dla twojej aplikacji.

## Poziom 5: Aplikacje dla użytkowników końcowych {#end-user-applications}

Na najwyższym poziomie stosu znajdują się aplikacje skierowane do użytkownika. Są to standardowe aplikacje, których regularnie używasz i które dziś budujesz: przede wszystkim aplikacje internetowe i mobilne.

Sposób tworzenia tych interfejsów użytkownika pozostaje w zasadzie niezmieniony. Często użytkownicy nie będą musieli wiedzieć, że aplikacja, z której korzystają, jest zbudowana przy użyciu blockchaina.

## Gotowy na wybór swojego stosu? {#ready-to-choose-your-stack}

Sprawdź nasz przewodnik, aby [skonfigurować lokalne środowisko programistyczne](/developers/local-environment/) dla swojej aplikacji Ethereum.

## Dalsza lektura {#further-reading}

- [Architektura aplikacji Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Znasz zasób społeczności, który ci pomógł? Edytuj tę stronę i dodaj go!_