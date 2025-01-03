---
title: Wprowadzenie do stosu Ethereum
description: Omówienie różnych warstw stosu Ethereum i sposobu, w jaki się ze sobą łączą.
lang: pl
---

Podobnie jak każdy stos oprogramowania, kompletny stos Ethereum będzie się różnił w zależności od projektu w zależności od Twoich celów biznesowych.

Istnieją jednak podstawowe technologie Ethereum, które pomagają stworzyć model interakcji oprogramowania z blockchainem Ethereum. Zrozumienie warstw stosu pomoże Ci zrozumieć różne sposoby integracji Ethereum z projektami oprogramowania.

## Warstwa 1: Wirtualna Maszyna Ethereum {#ethereum-virtual-machine}

Wirtualna Maszyna Ethereum ([Ethereum Virtual Machine, EVM](/developers/docs/evm/)) jest środowiskiem uruchomieniowym inteligentnych kontraktów w Ethereum. Wszystkie inteligentne kontrakty i zmiany stanu w blockchain Ethereum są wykonywane przez [transakcje](/developers/docs/transactions/). EVM obsługuje cały proces przetwarzania transakcji w sieci Ethereum.

Podobnie jak w przypadku dowolnej maszyny wirtualnej, EVM tworzy poziom abstrakcji pomiędzy kodem wykonującym a maszyną wykonującą (węzeł Ethereum). Obecnie EVM działa w tysiącach węzłów rozmieszczonych na całym świecie.

EVM używa zbioru instrukcji kodów operacyjnych w celu wykonywania konkretnych zadań. Tych (140 unikatowych) kodów operacji pozwala EVM na [kompletność Turinga](https://pl.wikipedia.org/wiki/Kompletno%C5%9B%C4%87_Turinga) co znaczy tyle, że EVM jest w stanie przetworzyć praktycznie wszystko, jeśli posiada wystarczająco dużo zasobów.

Jako programiści zdecentralizowanych aplikacji nie musimy wiedzieć zbyt wiele na temat EVM poza tym, że istnieje i że niezawodnie zasila wszystkie aplikacje w Ethereum bez przestojów.

## Warstwa 2: Inteligentne kontrakty (Smart Contracts) {#smart-contracts}

[Inteligentne kontrakty](/developers/docs/smart-contracts/) to programy wykonywalne, które działają w łańcuchu bloków Ethereum.

Inteligentne kontrakty są napisane przy użyciu określonych [języków programowania](/developers/docs/smart-contracts/languages/) , które kompilują do bytecode EVM (niskopoziomowe instrukcje maszynowe zwane opcode).

Inteligentne kontrakty służą nie tylko jako biblioteki open source, ale są to zasadniczo otwarte usługi API, które działają 24/7 i nie mogą zostać zlikwidowane. Inteligentne kontrakty zapewniają funkcje publiczne, z którymi aplikacje ([dapps](/developers/docs/dapps/)) mogą wchodzić w interakcje bez konieczności uzyskania zezwolenia. Każda aplikacja może zintegrować się z wdrożonymi inteligentnymi kontraktami w celu stworzenia funkcjonalności (takich jak kanały danych lub zdecentralizowana wymiana). Każdy może wdrożyć nowe inteligentne kontrakty do Ethereum w celu dodania niestandardowych funkcji, aby zaspokoić potrzeby ich aplikacji.

Jako dewelopera dapp musisz zapisać inteligentne kontrakty tylko wtedy, gdy chcesz dodać niestandardowe funkcje w blockchainu Ethereum. Możesz znaleźć że możesz osiągnąć większość lub wszystkie potrzeby swojego projektu jedynie poprzez integrację z istniejącymi inteligentnymi kontraktami, na przykład jeśli chcesz wspierać płatności w stabilnych monetach lub włączyć zdecentralizowaną wymianę tokenów.

## Warstwa 3: Węzły Ethereum {#ethereum-nodes}

Aby aplikacja mogła komunikować się z blockchainem Ethereum (np. pobierać dane z blockchainu lub wysyłać transakcje do sieci), musi być podłączona do [węzła w sieci Ethereum](/developers/docs/nodes-and-clients/).

Węzły Ethereum są komputerami, które obsługują oprogramowanie - klienta Ethereum. Klient jest implementacją Ethereum, która za zadanie ma weryfikację wszystkich transakcji w kolejnych blokach, utrzymywać bezpieczeństwo sieci i poprawność danych. Węzły Ethereum SĄ blockchainem Ethereum. Kolektywnie przechowują stan sieci Ethereum i ustalają konsensus nad transakcjami, aby zmienić stan blockchainu.

Poprzez połączenie swojej aplikacji z węzłem Ethereum (przez specyfikację JSON RPC), nasza aplikacja jest w stanie czytać dane pochodzące z blockchinu (takie jak bilans konta użytkownika), jak również rozgłaszać nowe transakcje do sieci (jak transfer ETH pomiędzy kontami użytkowników lub wykonywanie inteligentnych kontraktów).

## Warstwa 4: Interfejsy API klienta Ethereum {#ethereum-client-apis}

Wiele wygodnych bibliotek (zbudowanych i utrzymywanych przez otwartą społeczność Ethereum) pozwala aplikacjom dla użytkowników końcowych na połączenie i komunikowanie z blockchianem Ethereum.

Jeśli twoja aplikacja skierowana do użytkownika jest aplikacją internetową, możesz wybrać `npm install` a [JavaScript API](/developers/docs/apis/javascript/) bezpośrednio w Twojej witrynie. Możemy także wybrać zainstalowanie tej funkcji po stronie serwera przy użyciu [Pythona](/developers/docs/programming-languages/python/) lub [Javy](/developers/docs/programming-languages/java/).

Chociaż API te nie są niezbędnymi elementami stosu, odsuwają one wiele bezpośrednich interakcyjnych złożoności z węzłem Ethereum. Zapewniają one także użyteczne funkcje (np. konwersję ETH na Gwei), dzięki czemu jako programiści możemy spędzić mniej czasu na zajmowaniu się zawiłościami klientów, a skupić się w głównej mierze na unikalnej funkcji naszej aplikacji.

## Warstwa 5: Aplikacje użytkownika końcowego {#end-user-applications}

Na samej górze stosu są aplikacje komunikujące się bezpośrednio z użytkownikiem. Są to standardowe aplikacje regularnie używane i budowane w dzisiejszych czasach: głównie aplikacje webowe i mobilne.

Sposób, w jaki tworzone są te interfejsy użytkownika, pozostaje w gruncie rzeczy niezmieniony. Często użytkownicy nie muszą wiedzieć, że używana przez nich aplikacja została utworzona przy użyciu blockchainu.

## Gotowy do stworzenia swojego stosu? {#ready-to-choose-your-stack}

Sprawdź w przewodniku, w jaki sposób [przygotować lokalne środowisko deweloperskie](/developers/local-environment/) dla Twojej aplikacji na Ethereum.

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
