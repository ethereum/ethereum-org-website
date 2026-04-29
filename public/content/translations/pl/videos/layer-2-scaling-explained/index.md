---
title: "Wyjaśnienie skalowania warstwy 2 Ethereum"
description: "Przegląd rozwiązań skalowania warstwy 2 dla Ethereum, w tym rollupów, sieci Plasma, kanałów stanu i łańcuchów pobocznych."
lang: pl
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "skalowanie"
  - "warstwa-2"
format: explainer
author: Finematics
breadcrumb: "Skalowanie warstwy 2"
---

Materiał wyjaśniający od **Finematics** omawiający rozwiązania skalowania warstwy 2 (L2) dla Ethereum — w tym kanały, sieć Plasma, łańcuchy poboczne i rollupy, a także dlaczego rollupy stają się dominującą strategią skalowania. Dowiedz się, jak te technologie obniżają koszty i zwiększają przepustowość, jednocześnie dziedzicząc bezpieczeństwo Ethereum.

*Ten transkrypt jest przystępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=BgCgauWVTs0) opublikowanego przez Finematics. Został on lekko zredagowany w celu poprawy czytelności.*

#### Skalowanie Ethereum (0:31) {#ethereum-scaling-031}

Skalowanie Ethereum jest jednym z najczęściej dyskutowanych tematów niemal od momentu uruchomienia sieci. Debata na temat skalowania zawsze przybiera na sile po okresie znacznego przeciążenia sieci.

Jednym z pierwszych takich okresów była hossa krypto w 2017 roku, kiedy to niesławne CryptoKitties wraz z ICO zdołały zapchać całą sieć Ethereum, powodując ogromny wzrost opłat za gaz. W tym roku przeciążenie sieci powróciło ze zdwojoną siłą, tym razem spowodowane popularnością zdecentralizowanych finansów (DeFi) i yield farmingu. Były okresy, kiedy nawet opłaty za gaz sięgające ponad 500 gwei nie pozwalały na weryfikację transakcji przez dłuższy czas.

#### Skalowanie blockchainów (1:20) {#scaling-blockchains-120}

Jeśli chodzi o skalowanie Ethereum lub blockchainów w ogóle, istnieją dwa główne sposoby: skalowanie samej warstwy bazowej — warstwy 1 (L1) — lub skalowanie sieci poprzez przeniesienie części pracy do innej warstwy — warstwy 2 (L2).

Warstwa 1 to standardowa bazowa warstwa konsensusu, w której obecnie rozliczana jest większość transakcji. Koncepcja warstw nie jest specyficzna tylko dla Ethereum; inne blockchainy, takie jak Bitcoin czy Zcash, również z niej intensywnie korzystają.

Warstwa 2 to kolejna warstwa zbudowana na warstwie 1. Jest tu kilka ważnych kwestii: warstwa 2 nie wymaga żadnych zmian w warstwie 1 — może być po prostu zbudowana na warstwie 1 przy użyciu jej istniejących elementów, takich jak inteligentne kontrakty. Warstwa 2 wykorzystuje również bezpieczeństwo warstwy 1, zakotwiczając swój stan w warstwie 1.

Ethereum może obecnie przetwarzać około 15 transakcji na sekundę w swojej warstwie bazowej. Skalowanie warstwy 2 może drastycznie zwiększyć liczbę transakcji — w zależności od rozwiązania, przetwarzając od 2000 do 4000 transakcji na sekundę.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

A co z Ethereum 2.0? Czy to nie miało skalować Ethereum? Tak — Ethereum 2.0 wprowadza dowód stawki (PoS) i sharding, które drastycznie zwiększą przepustowość transakcji w warstwie bazowej.

Czy to oznacza, że nie potrzebujemy skalowania warstwy 2 (L2), gdy pojawi się Ethereum 2.0? Nie do końca — nawet z shardingiem, Ethereum nadal będzie potrzebować skalowania warstwy 2, aby w przyszłości móc obsługiwać setki tysięcy, a nawet miliony transakcji na sekundę.

#### Trylemat skalowalności (3:15) {#scalability-trilemma-315}

W tym miejscu do gry wkracza również słynny trylemat skalowalności. W teorii moglibyśmy całkowicie pominąć warstwę 2 (L2) i skupić się na skalowaniu warstwy bazowej. Wymagałoby to wysoce wyspecjalizowanych węzłów do obsługi zwiększonego obciążenia, co doprowadziłoby do większej centralizacji, a tym samym obniżyłoby bezpieczeństwo i odporność sieci na cenzurę.

Trzymając się faktu, że skalowalność nigdy nie powinna odbywać się kosztem bezpieczeństwa i decentralizacji, w przyszłości pozostaje nam połączenie skalowania warstwy 1 (L1) i warstwy 2.

#### Skalowanie warstwy 2 (3:52) {#layer-2-scaling-352}

Skalowanie warstwy 2 (L2) to zbiorcze określenie rozwiązań, które pomagają zwiększyć możliwości warstwy 1 (L1) poprzez obsługę transakcji pozałańcuchowo. Dwie główne możliwości, które można poprawić, to szybkość transakcji i przepustowość transakcji. Ponadto rozwiązania warstwy 2 mogą znacznie obniżyć opłaty za gaz.

Jeśli chodzi o rzeczywiste rozwiązania skalujące, dostępnych jest wiele opcji. Niektóre z nich są dostępne już teraz i mogą zwiększyć przepustowość sieci Ethereum w perspektywie krótko- i średnioterminowej, podczas gdy inne celują w horyzont średnio- i długoterminowy. Niektóre rozwiązania są specyficzne dla danej aplikacji — na przykład kanały płatności — podczas gdy inne, takie jak optymistyczne rollupy, mogą być używane do wykonywania dowolnych kontraktów.

#### Kanały (5:03) {#channels-503}

Kanały są jednym z pierwszych szeroko dyskutowanych rozwiązań skalujących. Pozwalają one uczestnikom na wielokrotną wymianę transakcji przy jednoczesnym przesłaniu tylko dwóch transakcji do warstwy bazowej. Najpopularniejszymi rodzajami kanałów są kanały stanu i ich podtyp, kanały płatności.

Chociaż kanały mają potencjał do łatwego przetwarzania tysięcy transakcji na sekundę, wiążą się z kilkoma wadami. Nie oferują otwartego uczestnictwa — uczestnicy muszą być znani z góry, a użytkownicy muszą zablokować swoje środki w kontrakcie multisig. Ponadto to rozwiązanie skalujące jest specyficzne dla danej aplikacji i nie może być używane do skalowania inteligentnych kontraktów ogólnego przeznaczenia.

Głównym projektem, który wykorzystuje moc kanałów stanu na Ethereum, jest Raiden. Koncepcja kanałów płatności jest również intensywnie wykorzystywana przez Lightning Network na Bitcoinie.

#### Plasma (6:04) {#plasma-604}

Plasma to rozwiązanie skalowania warstwy 2 (L2), które zostało pierwotnie zaproponowane przez Josepha Poona i Vitalika Buterina. Jest to framework do budowania skalowalnych aplikacji na Ethereum.

Plasma wykorzystuje inteligentne kontrakty i drzewa Merkle'a, aby umożliwić tworzenie nieograniczonej liczby łańcuchów potomnych — kopii macierzystego blockchaina Ethereum. Przeniesienie transakcji z głównego łańcucha do łańcuchów potomnych pozwala na szybkie i tanie transakcje.

Jedną z wad sieci Plasma jest długi okres oczekiwania dla użytkowników, którzy chcą wypłacić swoje środki z warstwy 2. Plasma, podobnie jak kanały, nie może być używana do skalowania inteligentnych kontraktów ogólnego przeznaczenia. OMG Network jest zbudowana na własnej implementacji sieci Plasma o nazwie More Viable Plasma. Matic Network to kolejny przykład platformy wykorzystującej zaadaptowaną wersję frameworka Plasma.

#### Łańcuchy poboczne (7:08) {#sidechains-708}

Łańcuchy poboczne to niezależne, kompatybilne z Ethereum blockchainy z własnymi modelami konsensusu i parametrami bloków. Interoperacyjność z Ethereum jest możliwa dzięki wykorzystaniu tej samej Maszyny Wirtualnej Ethereum (EVM), więc kontrakty wdrożone w warstwie bazowej Ethereum mogą być bezpośrednio wdrożone w łańcuchu pobocznym.

xDai jest jednym z przykładów takiego łańcucha pobocznego.

#### Rollupy ZK (8:11) {#zk-rollups-811}

Rollupy zapewniają skalowanie poprzez grupowanie — lub „zwijanie” — transakcji łańcucha pobocznego w jedną transakcję i generowanie dowodu kryptograficznego, znanego również jako SNARK (Succinct Non-interactive Argument of Knowledge). Tylko ten dowód jest przesyłany do warstwy bazowej. W przypadku rollupów cały stan transakcji i ich wykonywanie są obsługiwane w łańcuchach pobocznych; główny łańcuch Ethereum przechowuje jedynie dane transakcji.

Istnieją dwa rodzaje rollupów: rollupy ZK (z wiedzą zerową) i optymistyczne rollupy.

Rollupy ZK, choć szybsze i bardziej wydajne niż optymistyczne rollupy, nie zapewniają łatwego sposobu na migrację istniejących inteligentnych kontraktów do warstwy 2 (L2).

Optymistyczne rollupy uruchamiają kompatybilną z EVM maszynę wirtualną o nazwie OVM (Optimistic Virtual Machine), która pozwala na wykonywanie tych samych inteligentnych kontraktów, co na Ethereum. Jest to bardzo ważne, ponieważ ułatwia istniejącym inteligentnym kontraktom utrzymanie ich kompozycyjności, co jest niezwykle istotne w zdecentralizowanych finansach (DeFi), gdzie wszystkie główne inteligentne kontrakty zostały już przetestowane w boju.

Jednym z głównych projektów pracujących nad optymistycznymi rollupami jest Optimism, który zbliża się coraz bardziej do uruchomienia swojej Sieci głównej. Jeśli chodzi o rollupy ZK, Loopring i DeversiFi są dobrymi przykładami zdecentralizowanych giełd zbudowanych na warstwie 2. Ponadto mamy zkSync, który umożliwia skalowalne płatności krypto.

#### Mapa drogowa skoncentrowana na rollupach (9:18) {#a-rollup-centric-roadmap-918}

Skalowalność rollupów może zostać również spotęgowana przez Ethereum 2.0. W rzeczywistości, ponieważ rollupy potrzebują jedynie skalowania warstwy danych, mogą one zyskać ogromny impuls już w Fazie 1 Ethereum 2.0, która dotyczy shardingu danych.

Pomimo dostępności całego spektrum rozwiązań skalowania warstwy 2 (L2), wygląda na to, że społeczność Ethereum skłania się ku podejściu polegającemu głównie na skalowaniu poprzez rollupy i sharding danych w Fazie 1 Ethereum 2.0. Podejście to zostało również potwierdzone w niedawnym poście Vitalika Buterina zatytułowanym „A Rollup-Centric Ethereum Roadmap”.

W przyszłych filmach przyjrzymy się skalowaniu warstwy bazowej za pomocą Ethereum 2.0 oraz temu, jak skalowanie zarówno warstwy 1 (L1), jak i warstwy 2 może pomóc w uczynieniu zdecentralizowanych finansów (DeFi) bardziej dostępnymi dla każdego.