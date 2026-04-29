---
title: "Rollupy: ostateczna strategia skalowania Ethereum?"
description: "Szczegółowe spojrzenie na rollupy jako główną strategię skalowania Ethereum. Ten film wyjaśnia, jak działają optymistyczne rollupy (Arbitrum, Optimism) i rollupy z wiedzą zerową."
lang: pl
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollupy"
---

Materiał wyjaśniający od **Finematics** omawiający rollupy jako główną strategię skalowania Ethereum. Film porównuje optymistyczne rollupy (Arbitrum, Optimism) z rollupami ZK i analizuje, dlaczego rollupy stały się dominującą metodą skalowania Ethereum.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=7pWxCklcNsU) opublikowanego przez Finematics. Został on lekko zredagowany w celu poprawy czytelności.*

#### Warstwa 2 (1:17) {#layer-2-117}

Skalowanie Ethereum jest jednym z najczęściej dyskutowanych tematów w krypto. Debata na temat skalowania zazwyczaj przybiera na sile w okresach wysokiej aktywności sieci, takich jak szał na CryptoKitties w 2017 roku, lato zdecentralizowanych finansów (DeFi) w 2020 roku czy hossa na rynku krypto na początku 2021 roku. W tych okresach bezprecedensowy popyt na sieć Ethereum skutkował niezwykle wysokimi opłatami za gaz, co sprawiało, że codzienne opłacanie transakcji przez użytkowników stawało się drogie.

Aby rozwiązać ten problem, poszukiwanie ostatecznego rozwiązania skalującego stało się jednym z głównych priorytetów dla wielu zespołów i całej społeczności Ethereum.

Ogólnie rzecz biorąc, istnieją trzy główne sposoby na skalowanie Ethereum — a w zasadzie większości innych blockchainów: skalowanie samego blockchaina (skalowanie warstwy 1), budowanie na wierzchu warstwy 1 (skalowanie warstwy 2) oraz budowanie obok warstwy 1 (łańcuchy poboczne).

#### Poza warstwą 1 (1:58) {#outside-of-layer-1-158}

Jeśli chodzi o warstwę 1, Eth2 jest wybranym rozwiązaniem do skalowania blockchaina Ethereum. Eth2 odnosi się do zestawu powiązanych ze sobą zmian, takich jak migracja na dowód stawki (PoS), połączenie stanu blockchaina opartego na dowodzie pracy (PoW) z nowym łańcuchem opartym na dowodzie stawki oraz sharding. Sharding w szczególności może drastycznie zwiększyć przepustowość sieci Ethereum, zwłaszcza w połączeniu z rollupami.

Jeśli chodzi o skalowanie poza warstwą 1, wypróbowano wiele różnych rozwiązań skalujących z mieszanymi rezultatami. Z jednej strony mamy rozwiązania warstwy 2, takie jak kanały, które są w pełni zabezpieczone przez Ethereum, ale sprawdzają się dobrze tylko w przypadku określonego zestawu aplikacji. Z drugiej strony, łańcuchy poboczne są zazwyczaj kompatybilne z EVM i mogą skalować aplikacje ogólnego przeznaczenia. Główną wadą jest to, że są one mniej bezpieczne niż rozwiązania warstwy 2, ponieważ nie opierają się na bezpieczeństwie Ethereum, a zamiast tego mają własne modele konsensusu.

Większość rollupów ma na celu osiągnięcie tego, co najlepsze z obu tych światów, tworząc rozwiązanie skalujące ogólnego przeznaczenia, jednocześnie w pełni opierając się na bezpieczeństwie Ethereum. Jest to Święty Graal skalowania, ponieważ pozwala na wdrożenie wszystkich istniejących inteligentnych kontraktów obecnych na Ethereum do rollupa z niewielkimi zmianami lub bez nich, nie poświęcając przy tym bezpieczeństwa. Nic dziwnego, że rollupy są prawdopodobnie najbardziej oczekiwanym rozwiązaniem skalującym ze wszystkich.

Rollup to rodzaj rozwiązania skalującego, które działa poprzez wykonywanie transakcji poza warstwą 1, ale publikowanie danych transakcji w warstwie 1. Pozwala to rollupowi na skalowanie sieci i jednoczesne czerpanie bezpieczeństwa z konsensusu Ethereum. Przeniesienie obliczeń pozałańcuchowo pozwala w zasadzie na przetwarzanie większej liczby transakcji łącznie, ponieważ tylko część danych transakcji rollupa musi zmieścić się w blokach Ethereum.

Aby to osiągnąć, transakcje rollupa są wykonywane na oddzielnym łańcuchu, który może nawet uruchamiać specyficzną dla rollupa wersję EVM. Kolejnym krokiem po wykonaniu transakcji na rollupie jest zebranie ich w paczkę i opublikowanie w głównym łańcuchu Ethereum. Cały proces w zasadzie wykonuje transakcje, pobiera dane, kompresuje je i "zwija" (ang. rolls up) do głównego łańcucha w pojedynczej paczce — stąd nazwa "rollup".

Każdy rollup wdraża zestaw inteligentnych kontraktów w warstwie 1, które są odpowiedzialne za przetwarzanie depozytów i wypłat oraz weryfikację dowodów. Dowody to również miejsce, w którym pojawia się główne rozróżnienie między różnymi typami rollupów. Optymistyczne rollupy używają dowodów oszustwa, podczas gdy rollupy ZK używają dowodów ważności.

#### Optymistyczne rollupy (4:26) {#optimistic-rollups-426}

Optymistyczne rollupy publikują dane w warstwie 1 i zakładają, że są one poprawne — stąd nazwa "optymistyczne". Jeśli opublikowane dane są ważne, jesteśmy na właściwej drodze i nic więcej nie trzeba robić. Optymistyczny rollup korzysta na tym, że nie musi wykonywać żadnej dodatkowej pracy w optymistycznym scenariuszu.

W przypadku nieważnej transakcji system musi być w stanie ją zidentyfikować, przywrócić prawidłowy stan i ukarać stronę, która przesyła taką transakcję. Aby to osiągnąć, optymistyczne rollupy wdrażają system rozstrzygania sporów, który jest w stanie weryfikować dowody oszustwa, wykrywać fałszywe transakcje i zniechęcać złych aktorów do przesyłania innych nieważnych transakcji lub nieprawidłowych dowodów oszustwa.

W większości implementacji optymistycznych rollupów strona, która jest w stanie przesyłać paczki transakcji do warstwy 1, musi wnieść kaucję, zazwyczaj w postaci ETH. Każdy inny uczestnik sieci może przesłać dowód oszustwa, jeśli zauważy nieprawidłową transakcję. Po przesłaniu dowodu oszustwa system wchodzi w tryb rozstrzygania sporów. W tym trybie podejrzana transakcja jest wykonywana ponownie — tym razem w głównym łańcuchu Ethereum. Jeśli wykonanie udowodni, że transakcja była rzeczywiście fałszywa, strona, która przesłała tę transakcję, zostaje ukarana, zazwyczaj poprzez cięcie jej zablokowanego ETH.

Aby zapobiec spamowaniu sieci przez złych aktorów nieprawidłowymi dowodami oszustwa, strony chcące przesłać dowody oszustwa zazwyczaj również muszą wnieść kaucję, która może podlegać cięciu.

Aby móc wykonać transakcję rollupa w warstwie 1, optymistyczne rollupy muszą wdrożyć system, który jest w stanie odtworzyć transakcję z dokładnym stanem, jaki był obecny, gdy transakcja została pierwotnie wykonana na rollupie. Jest to jedna ze skomplikowanych części optymistycznych rollupów i zazwyczaj osiąga się to poprzez utworzenie oddzielnego kontraktu menedżera, który zastępuje pewne wywołania funkcji stanem z rollupa.

System może działać zgodnie z oczekiwaniami i wykrywać oszustwa, nawet jeśli istnieje tylko jedna uczciwa strona, która monitoruje stan rollupa i w razie potrzeby przesyła dowody oszustwa. Ze względu na odpowiednie zachęty w systemie rollupa, wejście w proces rozstrzygania sporów powinno być sytuacją wyjątkową, a nie czymś, co zdarza się cały czas.

Jeśli chodzi o rollupy ZK, w ogóle nie ma w nich rozstrzygania sporów. Jest to możliwe dzięki wykorzystaniu sprytnego elementu kryptografii zwanego dowodami z wiedzą zerową — stąd nazwa rollupy ZK. W tym modelu każda paczka opublikowana w warstwie 1 zawiera dowód kryptograficzny zwany ZK-SNARK. Dowód ten może zostać szybko zweryfikowany przez kontrakt warstwy 1 po przesłaniu paczki transakcji, a nieważne paczki mogą zostać natychmiast odrzucone.

#### Inne różnice (7:28) {#other-differences-728}

Ze względu na naturę procesu rozstrzygania sporów, optymistyczne rollupy muszą dać wszystkim uczestnikom sieci wystarczająco dużo czasu na przesłanie dowodów oszustwa przed sfinalizowaniem transakcji w warstwie 1. Okres ten jest zazwyczaj dość długi — aby upewnić się, że nawet w najgorszym scenariuszu fałszywe transakcje mogą nadal zostać zakwestionowane. Powoduje to, że wypłaty z optymistycznych rollupów trwają dość długo, ponieważ użytkownicy muszą czekać nawet tydzień lub dwa, aby móc wypłacić swoje środki z powrotem do warstwy 1.

Na szczęście istnieje kilka projektów pracujących nad poprawą tej sytuacji poprzez zapewnienie szybkich "wyjść płynności". Projekty te oferują niemal natychmiastowe wypłaty z powrotem do warstwy 1, innej warstwy 2, a nawet łańcucha pobocznego i pobierają niewielką opłatę za tę wygodę. Hop Protocol i Connext to projekty, którym warto się przyjrzeć.

Rollupy ZK nie mają problemu z długimi wypłatami, ponieważ środki są dostępne do wypłaty, gdy tylko paczka rollupa, wraz z dowodem ważności, zostanie przesłana do warstwy 1.

Jednak rollupy ZK mają swoje własne wady. Ze względu na złożoność technologii, znacznie trudniej jest stworzyć rollup ZK kompatybilny z EVM, co utrudnia skalowanie aplikacji ogólnego przeznaczenia bez konieczności przepisywania logiki aplikacji. Mimo to, zkSync robi znaczne postępy w tej dziedzinie i być może wkrótce uda im się uruchomić rollup ZK kompatybilny z EVM.

Optymistyczne rollupy mają nieco łatwiejsze zadanie z kompatybilnością z EVM. Nadal muszą uruchamiać własną wersję EVM z kilkoma modyfikacjami, ale 99% kontraktów można przenieść bez wprowadzania żadnych zmian. Rollupy ZK są również znacznie bardziej wymagające obliczeniowo niż optymistyczne rollupy, co oznacza, że węzły obliczające dowody ZK muszą być maszynami o wysokich parametrach, co utrudnia innym użytkownikom ich uruchomienie.

#### Ulepszenia skalowania (9:32) {#scaling-improvements-932}

Jeśli chodzi o ulepszenia skalowania, oba typy rollupów powinny być w stanie przeskalować Ethereum z około 15–45 transakcji na sekundę (w zależności od typu transakcji) do nawet 1000–4000 transakcji na sekundę. Warto zauważyć, że możliwe jest przetwarzanie jeszcze większej liczby transakcji na sekundę poprzez zaoferowanie większej przestrzeni dla paczek rollupów w warstwie 1.

To również powód, dla którego Eth2 może stworzyć ogromną synergię z rollupami, ponieważ zwiększa możliwą przestrzeń dostępności danych poprzez tworzenie wielu shardów — z których każdy jest w stanie przechowywać znaczną ilość danych. Połączenie Eth2 i rollupów mogłoby zwiększyć prędkość transakcji Ethereum do nawet 100 000 transakcji na sekundę.

Optimism i Arbitrum są obecnie najpopularniejszymi opcjami, jeśli chodzi o optymistyczne rollupy. Optimism został częściowo wdrożony w sieci głównej Ethereum z ograniczoną grupą partnerów, takich jak Synthetix i Uniswap, aby upewnić się, że technologia działa zgodnie z oczekiwaniami przed pełnym uruchomieniem. Arbitrum wdrożyło już swoją wersję w sieci głównej i rozpoczęło onboarding różnych projektów do swojego ekosystemu.

Niektóre z najbardziej godnych uwagi projektów uruchamianych na Arbitrum to Uniswap, Sushi, Bancor, Augur, Chainlink, Aave i wiele innych. Arbitrum ogłosiło również partnerstwo z Reddit, koncentrując się na uruchomieniu oddzielnego łańcucha rollupa w celu skalowania ich systemu nagród. Optimism współpracuje z MakerDAO w celu stworzenia mostu Optimism Dai Bridge i umożliwienia szybkich wypłat DAI i innych tokenów z powrotem do warstwy 1.

Chociaż zarówno Arbitrum, jak i Optimism próbują osiągnąć ten sam cel — zbudowanie rozwiązań optymistycznych rollupów kompatybilnych z EVM — istnieje kilka różnic w ich projektach. Arbitrum ma inny model rozstrzygania sporów. Zamiast ponownie uruchamiać całą transakcję w warstwie 1, aby sprawdzić, czy dowód oszustwa jest ważny, wymyślili interaktywny model wielorundowy, który pozwala zawęzić zakres sporu i potencjalnie wykonać tylko kilka instrukcji w warstwie 1, aby sprawdzić, czy podejrzana transakcja jest ważna.

Kolejną dużą różnicą jest podejście do obsługi kolejności transakcji i MEV. Arbitrum początkowo uruchomi sekwenser odpowiedzialny za porządkowanie transakcji, ale na dłuższą metę chcą go zdecentralizować. Optimism preferuje inne podejście, w którym kolejność transakcji — a co za tym idzie MEV — może zostać zlicytowana innym stronom na określony czas.

#### Rollupy ZK (13:10) {#zk-rollups-1310}

Chociaż wygląda na to, że społeczność Ethereum skupia się głównie na optymistycznych rollupach — przynajmniej w perspektywie krótkoterminowej — projekty pracujące nad rollupami ZK również rozwijają się niezwykle szybko.

Loopring wykorzystuje technologię rollupów ZK do skalowania swojej giełdy i protokołu płatności. Hermez i ZKTube pracują nad skalowaniem płatności za pomocą rollupów ZK, przy czym Hermez buduje również rollup ZK kompatybilny z EVM. Aztec koncentruje się na wprowadzeniu funkcji prywatności do swojej technologii rollupów ZK.

Rollupy oparte na StarkWare są już szeroko stosowane przez projekty takie jak DeversiFi, Immutable X i dYdX. Jak wspomniano wcześniej, zkSync pracuje nad maszyną wirtualną kompatybilną z EVM, która będzie w stanie w pełni obsługiwać dowolne inteligentne kontrakty napisane w Solidity.

#### DeFi (14:02) {#defi-1402}

Rollupy powinny mieć również duży wpływ na zdecentralizowane finanse (DeFi). Użytkownicy, którzy wcześniej nie byli w stanie przeprowadzać transakcji na Ethereum z powodu wysokich opłat transakcyjnych, będą mogli pozostać w ekosystemie, gdy następnym razem aktywność sieci będzie wysoka. Rollupy umożliwią również powstanie nowej generacji aplikacji, które wymagają tańszych transakcji i szybszego czasu potwierdzenia — a wszystko to przy pełnym zabezpieczeniu przez konsensus Ethereum. Wygląda na to, że rollupy mogą wywołać kolejny okres wysokiego wzrostu dla DeFi.

#### Wyzwania (14:29) {#challenges-1429}

Istnieje jednak kilka wyzwań, jeśli chodzi o rollupy. Kompozycyjność jest jednym z nich — aby skomponować transakcję, która wykorzystuje wiele protokołów, wszystkie z nich musiałyby zostać wdrożone na tym samym rollupie.

Kolejnym wyzwaniem jest rozdrobniona płynność. Bez nowych pieniędzy napływających do całego ekosystemu Ethereum, istniejąca płynność obecna w warstwie 1 w protokołach takich jak Uniswap czy Aave będzie dzielona między warstwę 1 a wiele implementacji rollupów. Niższa płynność zazwyczaj oznacza wyższy poślizg cenowy i gorszą realizację transakcji.

Oznacza to również, że naturalnie pojawią się zwycięzcy i przegrani. W tej chwili istniejący ekosystem Ethereum nie jest wystarczająco duży, aby wykorzystać wszystkie rozwiązania skalujące. Może to — i prawdopodobnie tak się stanie — ulec zmianie w dłuższej perspektywie, ale w krótkim okresie możemy zobaczyć, jak niektóre rollupy i inne rozwiązania skalujące stają się miastami duchów. W przyszłości możemy również zobaczyć użytkowników żyjących całkowicie w jednym ekosystemie rollupa i nie wchodzących w interakcje z głównym łańcuchem Ethereum i innymi rozwiązaniami skalującymi przez długi czas.

#### Zagrożenie dla łańcuchów pobocznych (15:44) {#threat-to-sidechains-1544}

Jednym z pytań, które pojawia się bardzo często podczas omawiania rollupów, jest to, czy stanowią one zagrożenie dla łańcuchów pobocznych. Łańcuchy poboczne nadal będą miały swoje miejsce w ekosystemie Ethereum. Chociaż koszt transakcji w warstwie 2 będzie znacznie niższy niż w warstwie 1, najprawdopodobniej nadal będzie wystarczająco wysoki, aby wykluczyć cenowo niektóre typy aplikacji, takie jak gry i inne aplikacje o dużej liczbie transakcji. Może się to zmienić, gdy Ethereum wprowadzi sharding, ale do tego czasu łańcuchy poboczne mogą stworzyć wystarczający efekt sieciowy, aby przetrwać w dłuższej perspektywie.

Ponadto opłaty na rollupach są wyższe niż na łańcuchach pobocznych, ponieważ każda paczka rollupa nadal musi płacić za przestrzeń w bloku Ethereum. Społeczność Ethereum kładzie ogromny nacisk na rollupy w strategii skalowania Ethereum — przynajmniej w perspektywie krótko- i średnioterminowej, a potencjalnie nawet dłuższej.