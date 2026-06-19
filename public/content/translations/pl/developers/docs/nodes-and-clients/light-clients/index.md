---
title: Lekkie klienty
description: Wprowadzenie do lekkich klientów Ethereum.
lang: pl
---

Uruchomienie pełnego węzła to najbardziej niewymagający zaufania, prywatny, zdecentralizowany i odporny na cenzurę sposób na interakcję z [Ethereum](/). Dzięki pełnemu węzłowi przechowujesz własną kopię blockchaina, którą możesz natychmiast odpytywać, i zyskujesz bezpośredni dostęp do sieci peer-to-peer Ethereum. Jednakże uruchomienie pełnego węzła wymaga znacznej ilości pamięci, przestrzeni dyskowej i mocy procesora. Oznacza to, że nie każdy ma możliwość uruchomienia własnego węzła. Na mapie drogowej Ethereum znajduje się kilka rozwiązań tego problemu, w tym bezstanowość, ale do ich wdrożenia pozostało jeszcze kilka lat. Krótkoterminową odpowiedzią jest rezygnacja z niektórych korzyści płynących z uruchomienia pełnego węzła na rzecz znacznej poprawy wydajności, co pozwala na działanie węzłów przy bardzo niskich wymaganiach sprzętowych. Węzły, które idą na ten kompromis, są znane jako lekkie węzły.

## Czym jest lekki klient {#what-is-a-light-client}

Lekki węzeł to węzeł z uruchomionym oprogramowaniem lekkiego klienta. Zamiast przechowywać lokalne kopie danych blockchaina i niezależnie weryfikować wszystkie zmiany, żądają one niezbędnych danych od jakiegoś dostawcy. Dostawcą może być bezpośrednie połączenie z pełnym węzłem lub scentralizowany serwer RPC. Dane są następnie weryfikowane przez lekki węzeł, co pozwala mu na bieżąco śledzić szczyt łańcucha. Lekki węzeł przetwarza tylko nagłówki bloków, jedynie sporadycznie pobierając rzeczywistą zawartość bloku. Węzły mogą różnić się stopniem swojej „lekkości”, w zależności od kombinacji oprogramowania lekkiego i pełnego klienta, które uruchamiają. Na przykład najlżejszą konfiguracją byłoby uruchomienie lekkiego klienta warstwy wykonawczej i lekkiego klienta konsensusu. Prawdopodobne jest również, że wiele węzłów zdecyduje się na uruchomienie lekkich klientów konsensusu z pełnymi klientami warstwy wykonawczej lub odwrotnie.

## Jak działają lekkie klienty? {#how-do-light-clients-work}

Kiedy Ethereum zaczęło korzystać z mechanizmu konsensusu opartego na dowodzie stawki (PoS), wprowadzono nową infrastrukturę specjalnie w celu obsługi lekkich klientów. Działa to w ten sposób, że co 1,1 dnia losowo wybierany jest podzbiór 512 walidatorów, którzy pełnią rolę **komitetu synchronizacyjnego**. Komitet synchronizacyjny podpisuje nagłówek ostatnich bloków. Każdy nagłówek bloku zawiera zagregowany podpis walidatorów z komitetu synchronizacyjnego oraz „pole bitowe” (bitfield), które pokazuje, którzy walidatorzy złożyli podpis, a którzy nie. Każdy nagłówek zawiera również listę walidatorów, od których oczekuje się udziału w podpisywaniu następnego bloku. Oznacza to, że lekki klient może szybko sprawdzić, czy komitet synchronizacyjny zatwierdził otrzymane dane, a także zweryfikować autentyczność komitetu synchronizacyjnego, porównując ten otrzymany z tym, którego oczekiwano na podstawie poprzedniego bloku. W ten sposób lekki klient może na bieżąco aktualizować swoją wiedzę o najnowszym bloku Ethereum bez konieczności pobierania samego bloku, a jedynie jego nagłówka, który zawiera informacje podsumowujące.

W warstwie wykonawczej nie ma jednej specyfikacji dla lekkiego klienta warstwy wykonawczej. Zakres lekkiego klienta warstwy wykonawczej może wahać się od „trybu lekkiego” pełnego klienta warstwy wykonawczej, który posiada całą funkcjonalność EVM i sieciową pełnego węzła, ale weryfikuje tylko nagłówki bloków bez pobierania powiązanych danych, po bardziej okrojonego klienta, który w dużej mierze opiera się na przekazywaniu żądań do dostawcy RPC w celu interakcji z Ethereum.

## Dlaczego lekkie klienty są ważne? {#why-are-light-clients-important}

Lekkie klienty mają znaczenie, ponieważ pozwalają użytkownikom weryfikować przychodzące dane, zamiast ślepo ufać, że ich dostawca danych jest poprawny i uczciwy, wykorzystując przy tym zaledwie ułamek zasobów obliczeniowych pełnego węzła. Dane otrzymywane przez lekkie klienty można sprawdzić z nagłówkami bloków, o których wiedzą, że zostały podpisane przez co najmniej 2/3 losowego zestawu 512 walidatorów Ethereum. Jest to bardzo silny dowód na to, że dane są poprawne.

Lekki klient zużywa tylko niewielką ilość mocy obliczeniowej, pamięci i przestrzeni dyskowej, dzięki czemu może być uruchamiany na telefonie komórkowym, wbudowany w aplikację lub jako część przeglądarki. Lekkie klienty to sposób na to, aby dostęp do Ethereum o zminimalizowanym zaufaniu był równie bezproblemowy, co zaufanie zewnętrznemu dostawcy.

Weźmy prosty przykład. Wyobraź sobie, że chcesz sprawdzić saldo swojego konta. Aby to zrobić, musisz wysłać żądanie do węzła Ethereum. Węzeł ten sprawdzi swoją lokalną kopię stanu Ethereum pod kątem Twojego salda i zwróci Ci wynik. Jeśli nie masz bezpośredniego dostępu do węzła, istnieją scentralizowani operatorzy, którzy dostarczają te dane jako usługę. Możesz wysłać do nich żądanie, oni sprawdzają swój węzeł i odsyłają Ci wynik. Problem polega na tym, że musisz wtedy zaufać dostawcy, że przekazuje Ci poprawne informacje. Nigdy nie możesz mieć pewności, że informacje są poprawne, jeśli nie możesz ich samodzielnie zweryfikować.

Lekki klient rozwiązuje ten problem. Nadal żądasz danych od jakiegoś zewnętrznego dostawcy, ale kiedy otrzymujesz je z powrotem, są one opatrzone dowodem, który Twój lekki węzeł może sprawdzić z informacjami otrzymanymi w nagłówku bloku. Oznacza to, że to Ethereum weryfikuje poprawność Twoich danych, a nie jakiś zaufany operator.

## Jakie innowacje umożliwiają lekkie klienty? {#what-innovations-do-light-clients-enable}

Główną korzyścią płynącą z lekkich klientów jest umożliwienie większej liczbie osób niezależnego dostępu do Ethereum przy znikomych wymaganiach sprzętowych i minimalnym poleganiu na stronach trzecich. Jest to dobre dla użytkowników, ponieważ mogą weryfikować własne dane, i jest to dobre dla sieci, ponieważ zwiększa liczbę i różnorodność węzłów weryfikujących łańcuch.

Możliwość uruchamiania węzłów Ethereum na urządzeniach o bardzo małej przestrzeni dyskowej, pamięci i mocy obliczeniowej to jeden z głównych obszarów innowacji odblokowanych przez lekkie klienty. Podczas gdy obecnie węzły Ethereum wymagają dużych zasobów obliczeniowych, lekkie klienty mogłyby być wbudowywane w przeglądarki, uruchamiane na telefonach komórkowych, a być może nawet na mniejszych urządzeniach, takich jak smartwatche. Oznacza to, że portfele Ethereum z wbudowanymi klientami mogłyby działać na telefonie komórkowym. Oznacza to, że portfele mobilne mogłyby być znacznie bardziej zdecentralizowane, ponieważ nie musiałyby ufać scentralizowanym dostawcom danych.

Rozszerzeniem tego jest obsługa urządzeń **internetu rzeczy (IoT)**. Lekki klient mógłby zostać użyty do szybkiego udowodnienia własności jakiegoś salda tokenów lub NFT, ze wszystkimi gwarancjami bezpieczeństwa zapewnianymi przez komitety synchronizacyjne, wyzwalając jakieś działanie w sieci IoT. Wyobraź sobie [wypożyczalnię rowerów](https://youtu.be/ZHNrAXf3RDE?t=929), która korzysta z aplikacji z wbudowanym lekkim klientem, aby szybko zweryfikować, czy posiadasz NFT wypożyczalni, a jeśli tak, odblokowuje rower, abyś mógł na nim odjechać!

Rollupy Ethereum również skorzystałyby na lekkich klientach. Jednym z dużych problemów dla rollupów były ataki hakerskie wymierzone w mosty, które umożliwiają transfer środków z sieci głównej Ethereum do rollupa. Jedną z luk w zabezpieczeniach są wyrocznie, których rollupy używają do wykrywania, że użytkownik dokonał depozytu w moście. Jeśli wyrocznia dostarczy błędne dane, może oszukać rollup, by ten pomyślał, że dokonano depozytu w moście, i nieprawidłowo uwolnił środki. Lekki klient wbudowany w rollup mógłby zostać użyty do ochrony przed uszkodzonymi wyroczniami, ponieważ depozyt w moście mógłby być opatrzony dowodem, który może zostać zweryfikowany przez rollup przed uwolnieniem jakichkolwiek tokenów. Tę samą koncepcję można by również zastosować do innych mosty międzyłańcuchowe.

Lekkie klienty mogłyby również posłużyć do ulepszenia portfeli Ethereum. Zamiast ufać danym dostarczanym przez dostawcę RPC, Twój portfel mógłby bezpośrednio weryfikować prezentowane Ci dane za pomocą wbudowanego lekkiego klienta. Zwiększyłoby to bezpieczeństwo Twojego portfela. Jeśli Twój dostawca RPC byłby nieuczciwy i dostarczyłby Ci nieprawidłowe dane, wbudowany lekki klient mógłby Cię o tym poinformować!

## Jaki jest obecny stan rozwoju lekkich klientów? {#current-state-of-development}

W fazie rozwoju znajduje się kilka lekkich klientów, w tym lekkie klienty warstwy wykonawczej, konsensusu oraz połączone lekkie klienty warstwy wykonawczej i konsensusu. Oto implementacje lekkich klientów, o których wiemy w momencie pisania tej strony:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): lekki klient konsensusu w języku TypeScript
- [Helios](https://github.com/a16z/helios): połączony lekki klient warstwy wykonawczej i konsensusu w języku Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): tryb lekki dla klienta warstwy wykonawczej (w fazie rozwoju) w języku Go
- [Nimbus](https://nimbus.guide/el-light-client.html): lekki klient konsensusu w języku Nim

Zgodnie z naszą wiedzą, żaden z nich nie jest jeszcze uważany za gotowy do wdrożenia produkcyjnego.

Trwa również wiele prac nad ulepszeniem sposobów, w jakie lekkie klienty mogą uzyskiwać dostęp do danych Ethereum. Obecnie lekkie klienty opierają się na żądaniach RPC do pełnych węzłów przy użyciu modelu klient-serwer, ale w przyszłości dane mogłyby być żądane w bardziej zdecentralizowany sposób przy użyciu dedykowanej sieci, takiej jak [Portal Network](https://www.ethportal.net/), która mogłaby dostarczać dane do lekkich klientów za pomocą protokołu plotkowania peer-to-peer.

Inne elementy [mapy drogowej](/roadmap/), takie jak [drzewa Verkle](/roadmap/verkle-trees/) i [bezstanowość](/roadmap/statelessness/), ostatecznie zrównają gwarancje bezpieczeństwa lekkich klientów z gwarancjami pełnych klientów.

## Dalsza lektura {#further-reading}

- [Zsolt Felfodhi o lekkich klientach Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling o sieciach lekkich klientów](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling o lekkich klientach po The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Kręta droga do funkcjonalnych lekkich klientów](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)