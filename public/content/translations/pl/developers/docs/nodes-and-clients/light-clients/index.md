---
title: Lekkie klienty
description: Wprowadzenie do lekkich klientów Ethereum.
lang: pl
---

Uruchomienie pełnego węzła jest najbardziej prywatnym, zdecentralizowanym, odpornym na cenzurę oraz niewymagającym zaufania sposobem na interakcję z Ethereum. Z pełnym węzłem zachowujesz swoją własną kopię blockchainu, którą możesz natychmiastowo przeszukiwać oraz otrzymujesz bezpośredni dostęp do sieci peer-to-peer Ethereum. Uruchomienie pełnego węzła wymaga jednak dużych zasobów pamięci, przestrzeni oraz procesora. Oznacza to, że nie każdy może uruchomić swój własny węzeł. Istnieje wiele rozwiązań na to w planie działania Ethereum, wliczając w to bezstanowość, ale minie jeszcze kilka lat, zanim zostaną one zaimplementowane. Rozwiązaniem w najbliższym czasie jest kompromis między niektórymi korzyściami płynącymi z uruchomienia pełnego węzła, a dużą poprawą wydajności, która pozwala węzłom na działanie z bardzo niskimi wymaganiami sprzętowymi. Węzły, które zapewniają ten kompromis, znane są jako lekkie węzły.

## Czym jest lekki klient? {#what-is-a-light-client}

Lekki węzeł to węzeł działający z oprogramowaniem lekkiego klienta. Zamiast przechowywać lokalną kopię danych blockchainu i niezależnie weryfikować wszystkie zmiany, żądają niezbędnych danych od jakiegoś dostawcy. Dostawcą może być bezpośrednie połączenie do pełnego węzła lub za pośrednictwem jakiegoś scentralizowanego serwera RPC. Dane zostają następnie zweryfikowane przez lekki węzeł, pozwalając mu na nadążenie za początkiem łańcucha. Lekki węzeł przetwarza tylko nagłówki bloków, okazjonalnie pobierając rzeczywistą zawartość bloku. Węzły mogą się różnić swoją lekkością w zależności od kombinacji oprogramowania lekkiego i pełnego klienta, które uruchamiają. Na przykład najlżejszą konfiguracją byłoby uruchomienie lekkiego klienta wykonawczego i lekkiego klienta konsensusu. Prawdopodobne jest również to, że wiele węzłów zdecyduje się na uruchomienie lekkiego klienta konsensusu z pełnym klientem wykonawczym lub na odwrót.

## Jak działają lekkie klienty? {#how-do-light-clients-work}

Kiedy Ethereum zaczęło korzystać z mechanizmu konsensusu opartego na proof-of-stake, wprowadzona została nowa infrastruktura specjalnie do obsługi lekkich klientów. Sposób działania polega na losowym wybieraniu podzbioru 512 walidatorów co każde 1,1 dnia, aby pełnili funkcję **komitetu synchronizacji**. Komitet synchronizacji podpisuje nagłówki najnowszych bloków. Każdy nagłówek bloku zawiera zagregowany podpis walidatorów w komitecie synchronizacji oraz „pole bitowe”, które pokazuje, który walidator podpisał, a który nie. Każdy nagłówek zawiera również listę wszystkich walidatorów, od których oczekuje się podpisania następnego bloku. Oznacza to, że lekki klient może szybko zobaczyć czy komitet synchronizacji podpisał otrzymane dane, a także może sprawdzić, czy komitet synchronizacji jest prawdziwy, porównując ten, który otrzymał z tym którego się spodziewał w poprzednim bloku. W ten sposób lekki klient może ciągle aktualizować swoją wiedzę na temat najnowszego bloku Ethereum bez faktycznego pobierania samego bloku, tylko nagłówka zawierającego podsumowane informacje.

W warstwie wykonawczej nie ma pojedynczej specyfikacji dla lekkiego klienta wykonawczego. Zakres lekkiego klienta wykonawczego może różnić się od „lekkiego trybu” pełnego klienta wykonawczego, który ma wszystkie funkcje EVM i sieciowe pełnego węzła, ale tylko weryfikuje nagłówki bloków bez pobierania powiązanych danych lub może to być bardziej okrojony klient, który w dużym stopniu opiera się na przekierowywaniu żądań do dostawcy RPC w celu interakcji z Ethereum.

## Dlaczego lekkie klienty są ważne? {#why-are-light-clients-important}

Lekkie klienty mają znaczenie, ponieważ pozwalają użytkownikom na weryfikowanie przychodzących danych, zamiast ufać na ślepo, że ich dostawca danych ma rację i jest uczciwy, wykorzystując małą cześć zasobów obliczeniowych pełnego węzła. Dane otrzymywane przez lekkie klienty mogą zostać sprawdzone pod kątem nagłówków bloków, o których wiadomo, że zostały podpisane przez co najmniej 2/3 losowego zbioru 512 walidatorów Ethereum. Jest to bardzo silny dowód na to, że dane są poprawne.

Lekki klient wykorzystuje tylko małą ilość mocy obliczeniowej, pamięci oraz przestrzeni, więc może on zostać uruchomiony na telefonie, osadzony w aplikacji lub jako część przeglądarki. Lekkie klienty są sposobem na zminimalizowany pod względem zaufania dostęp do Ethereum w sposób tak samo bezproblemowy jak zaufanie dostawcy strony trzeciej.

Rozważmy prosty przykład. Wyobraź sobie, że chcesz sprawdzić saldo swojego konta. Aby to zrobić, musisz wysłać żądanie do węzła Ethereum. Węzeł ten następnie sprawdzi swoją lokalną kopię stanu Ethereum pod kątem Twojego salda i Ci je zwróci. Jeśli nie masz bezpośredniego dostępu do węzła, to możesz skorzystać ze scentralizowanych operatorów, którzy dostarczą te dane w ramach usługi. Możesz wysłać do nich żądanie, oni sprawdzają swój węzeł, a następnie wysyłają wyniki do Ciebie. Problem z tym jest taki, że musisz zaufać dostawcy, że dostarcza Ci prawidłowe informacje. Nigdy nie możesz mieć pewności, że informacje są prawidłowe, jeśli ich samodzielnie nie możesz zweryfikować.

Lekkie klienty rozwiązują ten problem. Wciąż wysyłasz żądanie danych do jakiegoś zewnętrznego dostawcy, ale kiedy otrzymujesz je z powrotem, są one dostarczane z dowodem, który Twój lekki węzeł może sprawdzić z informacjami, które otrzymał w nagłówku bloku. Oznacza to, że Ethereum weryfikuje poprawność Twoich danych, a nie jakiś zaufany operator.

## Jakie innowacje umożliwiają lekkie klienty? {#what-innovations-do-light-clients-enable}

Główną zaletą lekkich klientów jest umożliwienie większej ilości osób na niezależny dostęp do Ethereum przy znikomych wymaganiach sprzętowych oraz minimalnej zależności od stron trzecich. Jest to dobre dla użytkowników, ponieważ mogą weryfikować swoje własne dane, oraz jest to dobre dla sieci, ponieważ zwiększa to liczbę oraz różnorodność węzłów weryfikujących łańcuch.

Możliwość uruchomienia węzłów Ethereum na urządzeniach z bardzo małą przestrzenią dyskową, pamięcią oraz mocą obliczeniową jest jednym z głównych obszarów innowacji umożliwionych przez lekkie klienty. Podczas gdy obecne węzły Ethereum wymagają dużych zasobów obliczeniowych, lekkie klienty mogłyby być osadzane w przeglądarkach, działać na telefonach, a może nawet na jeszcze mniejszych urządzeniach takich jak smartwatche. To oznacza, że portfele Ethereum ze wbudowanymi klientami mogłyby działać na telefonach. A to z kolei oznacza, że mobilne portfele mogłyby być bardziej zdecentralizowane, ponieważ nie musiałyby ufać scentralizowanym dostawcom danych odnośnie swoich danych.

Rozszerzeniem tego jest umożliwienie urządzeń **internetu rzeczy (IoT)**. Lekki klient może zostać wykorzystany do szybkiego udowodnienia własności salda jakiegoś tokena lub NFT, ze wszystkimi gwarancjami bezpieczeństwa zapewnionymi przez komitety synchronizacji, wywołując pewne działanie w sieci IoT. Wyobraź sobie [wypożyczalnię rowerów](https://youtu.be/ZHNrAXf3RDE?t=929), która wykorzystuje aplikację z wbudowanym lekkim klientem do szybkiego zweryfikowania, czy jesteś właścicielem NFT wypożyczalni, a jeśli tak, odblokowuje rower, na którym możesz odjechać!

Pakiety zbiorcze Ethereum również skorystałyby na lekkich klientach. Jednym z największych problemów związanym z pakietami zbiorczymi są włamania wymierzone w mosty, które pozwalają na transfer środków z sieci głównej Ethereum do pakietu zbiorczego. Jedną z luk w zabezpieczeniach są wyrocznie, których używają pakiety zbiorcze do wykrycia czy użytkownik dokonał wpłaty do mostu. Jeśli wyrocznia dostarczy złe dane, to mogłyby one oszukać pakiet zbiorczy do myślenia, że do mostu zostały wpłacone środki, co spowodowałoby nieprawidłowe wypłaty środków. Lekki klient wbudowany w pakiet zbiorczy mógłby zostać użyty do ochrony przed skorumpowanymi wyroczniami, ponieważ wpłata do mostu mogłaby przyjść z dowodem, który może zostać zweryfikowany przez pakiet zbiorczy przed wypłatą jakichkolwiek tokenów. Ta samo koncepcja mogłaby również zostać zastosowana w innych mostach międzyłańcuchowych.

Lekkie klienty mogłyby również zostać wykorzystanie do ulepszenia portfeli Ethereum. Zamiast ufać danym dostarczonym od dostawcy RPC, Twój portfel mógłby bezpośrednio zweryfikować te dane, używając wbudowanego lekkiego klienta. Zwiększyłoby to bezpieczeństwo Twojego portfela. Jeśli dostawca RPC byłby nieuczciwy i dostarczył Ci nieprawidłowe dane, to wbudowany lekki klient by o tym powiedział!

## Jaki jest obecny stan rozwoju lekkich klientów? {#current-state-of-development}

Istnieje wiele lekkich klientów w fazie rozwoju, w tym lekkie klienty wykonawcze, konsensusu, a nawet oba na raz. Oto implementacje lekkich klientów, o których wiemy w czasie pisania tej strony:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): lekki klient konsensusu w języku TypeScript
- [Helios](https://github.com/a16z/helios): połączony lekki klient wykonawczy i konsensusu w języku Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): tryb lekki dla klienta wykonawczego (w fazie rozwoju) w języku Go
- [Nimbus](https://nimbus.guide/el-light-client.html): lekki klient konsensusu w języku Nim

Z naszej wiedzy wynika, że żaden z tych nie jest jeszcze gotowy na poziomie produkcji.

Prowadzonym jest również wiele prac nad ulepszeniem sposobów, w jakie lekkie klienty mogą mieć dostęp do danych Ethereum. Obecnie lekkie klienty opierają się na żądaniach RPC do pełnych węzłów przy użyciu modelu klient/serwer, ale w przyszłości dane mogłyby być żądane w bardziej zdecentralizowany sposób przy użyciu dedykowanej sieci, takiej jak [Portal Network](https://www.ethportal.net/), która mogłaby obsługiwać dane dla lekkich klientów za pomocą protokołu plotkarskiego peer-to-peer.

Inne elementy [planu działania](/roadmap/) takie jak [drzewa Verkle](/roadmap/verkle-trees/) oraz [bezstanowość](/roadmap/statelessness/) ostatecznie zrównają gwarancje bezpieczeństwa lekkich klientów z gwarancjami pełnych klientów.

## Dalsza lektura {#further-reading}

- [Zsolt Felfodhi o lekkich klientach Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling o sieciach lekkich klientów](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling o lekkich klientach po The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Kręta droga do funkcjonalnych lekkich klientów](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
