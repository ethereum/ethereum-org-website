---
title: "Prezentacja: PRAWDZIWY stan L2"
description: "Prelekcja na temat obecnego stanu rozwiązań warstwy 2, badająca przepaść między obietnicami bezpieczeństwa rollupów a rzeczywistością oraz proponująca ścieżkę ku prawdziwej decentralizacji."
lang: pl
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "skalowanie-i-warstwa-2"
  - "rollupy"
  - "warstwa-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Stan L2"
---

Prezentacja **Bartka Kiepuszewskiego**, założyciela L2BEAT, na Devcon SEA, badająca obecny stan rozwiązań warstwy 2 (L2), przepaść między obietnicami bezpieczeństwa rollupów a rzeczywistością, nowe kategorie oceny oraz zobowiązanie L2BEAT do przeznaczenia znacznych zasobów na weryfikację systemów dowodzenia w nadchodzącym roku.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=ik2JxmHDmyw) opublikowanego przez Fundację Ethereum. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Będąc założycielem L2BEAT, mam wyjątkową okazję współpracować z niemal każdym zespołem L2 na rynku, a pracujemy z nimi od samego początku istnienia tej przestrzeni — czyli od jakichś czterech lat. To niesamowite. Czas leci bardzo szybko. Pracowaliśmy z wczesnymi pionierami technologii z wiedzą zerową (ZK), pracowaliśmy z Plasma Group, która zmieniła nazwę na Optimism, pracowaliśmy z Arbitrum. I z tej sceny chcę wyrazić uznanie dla wszystkich tych zespołów, ponieważ bez waszego wsparcia z pewnością by nas tu nie było. Jako L2BEAT jesteśmy niezwykle wdzięczni za całe wsparcie, jakie daje nam społeczność.

Spójrzmy więc na to, co udało nam się osiągnąć. Przede wszystkim udało nam się uruchomić prawie 50 rollupów i ponad 50 innych L2. To niesamowite osiągnięcie — to mnóstwo systemów, a w nadchodzących miesiącach mamy do uruchomienia prawie drugie tyle. Wprowadziliśmy do tych systemów również dużą wartość, dużą całkowitą wartość zablokowaną (TVL), a jeśli spojrzycie na wykresy, wszystkie one idą tylko w górę.

Rzecz w tym, że z całym tym wzrostem wiąże się również ogromna odpowiedzialność. Musimy zrozumieć, że użytkownicy końcowi korzystający z tych systemów wpłacają pieniądze do tych rollupów, ponieważ wierzą, że rollupy dziedziczą bezpieczeństwo Ethereum. Mając tę świadomość, moim zdaniem, musimy zacząć poważnie traktować bezpieczeństwo.

#### Skalowanie Ethereum (2:10) {#scaling-ethereum-210}

Udało nam się również przeskalować Ethereum. Ethereum radziło sobie całkiem nieźle, ale zaczęło stawać się naprawdę wolne w stosunku do popytu, a opłaty stawały się bardzo wysokie. Więc z pewnością się skalujemy — te liczby również rosną. To niesamowite.

Jest jednak pewne „ale”. Wiecie, zawsze jest jakieś „ale”, prawda? A ja jestem tu po to, by być z wami wszystkimi szczerym. Naprawdę chcę, aby ta przestrzeń stała się poważna, i to jest moja okazja, by prosić o wasze wsparcie, aby upewnić się, że nie zawiedziemy — nie zawiedziemy oczekiwań społeczności. Musimy zacząć naprawdę poważnie podchodzić do bezpieczeństwa tego, co budujemy.

Ponieważ, wiecie, zbyt długo używaliśmy kółek bocznych. Jeśli jesteś dorosłym używającym kółek bocznych — a powtarzam, minęły już cztery lata — to jesteś naprawdę niedojrzały. Używanie kółek bocznych jest w porządku, jeśli jesteś dzieckiem. Nie jest w porządku, jeśli jesteś dorosły. I myślę, że nadszedł czas, abyśmy wszyscy przestali się tego wstydzić. Wszyscy powinniśmy głośno o tym mówić i nie powinniśmy cierpieć na syndrom nowych szat króla.

#### Wielkie „ale”: brakujące systemy dowodzenia (4:30) {#the-big-but-missing-proof-systems-430}

Więc czym jest to wielkie „ale”? Cóż, po pierwsze, większość dzisiejszych L2 nie ma systemu dowodzenia, co jest dość zaskakujące, ponieważ wczesnym pionierom, takim jak StarkNet, zkSync czy Aztec — cztery lata temu, kiedy uruchamiali swoje pierwsze rollupy specyficzne dla aplikacji, nie brakowało systemów dowodzenia. Więc tak, możesz dziś uruchomić L2 jednym kliknięciem przycisku. Jednak czy to naprawdę jest L2? Czy to naprawdę jest rollup? To, co robisz, to uruchamianie czegoś, co jest zabezpieczone przez multisig. Nie sądzę, by to było wystarczająco dobre.

Stan ekosystemu dzisiaj wygląda mniej więcej tak, jak na tym diagramie. Po lewej stronie widać obecne L2 z systemem dowodzenia. Po prawej stronie widać obecne L2 bez systemu dowodzenia. I założyłbym się, że zdecydowana większość nadchodzących L2 nie będzie miała systemu dowodzenia. Obejmowałoby to w zasadzie każdy pojedynczy łańcuch OP Stack z wyjątkiem OP Mainnet i Base — i brawa dla nich, tak przy okazji, są jak mistrzowie. Jednak każdy inny łańcuch OP Stack po prostu nie ma systemu dowodzenia.

Ten wykres po prawej stronie obejmie również wszystkie stosy Orbit, które mają system dowodzenia, jednak w rzeczywistości kryje się on za często bardzo krótką, wymagającą zezwolenia białą listą. Czasami ta biała lista to tylko jeden podmiot — to ten sam, co proponujący stan. Zasadniczo jest to proponujący stan i tylko on może rzucić wyzwanie samemu sobie. Że co? Poważnie.

#### Rady bezpieczeństwa (6:00) {#security-councils-600}

Obecnie większość L2 nie korzysta z rad bezpieczeństwa. Co rozumiemy przez radę bezpieczeństwa? Rada bezpieczeństwa to w zasadzie multisig, który składa się z co najmniej ośmiu uczestników i wymaga progu konsensusu na poziomie 75%. Można więc o tym myśleć jak o dużym multisigu, ale nie chodzi tylko o rozmiar — chodzi o to, że chcemy, aby uczestnicy byli geograficznie zdecentralizowani. Być może słyszeliście wczoraj niesamowitą prezentację o potrzebie dywersyfikacji geograficznej. Tego właśnie oczekujemy od tych struktur. I w zasadzie chcemy, co najważniejsze, aby uczestnicy pochodzili z różnych firm i różnych jurysdykcji. To niezwykle ważne i pokażę wam kilka przykładów, dlaczego tak jest.

Pomyślcie o radach bezpieczeństwa jak o takich superdoładowanych multisigach. Kryje się za nimi bardzo ważna warstwa społeczna. Tak więc wygląda obecny stan rzeczy i znowu, jest bardzo źle. Mamy rady bezpieczeństwa tylko w Arbitrum, Optimism, Polygon, zkSync — i wiem, że StarkNet, Scroll i, co ciekawe, Fuel uruchamiają się z radą bezpieczeństwa. Wszyscy inni to w zasadzie bardzo mały, wewnętrzny, często prywatny multisig i szczerze mówiąc, niezwykle trudno jest odróżnić te multisigi od zwykłych kont zewnętrznych (EOA).

#### Założenia dotyczące zaufania w kwestii dostępności danych (7:25) {#data-availability-trust-assumptions-725}

Trzecią dużą rzeczą, którą zrobiliśmy źle, jest to, że większość L2 niebędących rollupami jest skonfigurowana z fatalnymi założeniami dotyczącymi zaufania w kwestii dostępności danych (DA). I używam słowa „fatalnymi” — po pierwsze, ponieważ je lubię, a po drugie, ponieważ jest naprawdę, naprawdę źle.

Spójrzcie na te przykłady po lewej stronie — Arbitrum, StarkEx, Immutable X. Jednak prawie wszyscy inni dosłownie publikują DA na swoim serwerze w piwnicy czy gdziekolwiek indziej. Nie mamy pojęcia. Dosłownie nie mamy pojęcia. Rzecz w tym, że są naprawdę słabi i wydaje się, że ich to nie obchodzi. Więc może użytkowników to nie obchodzi — nie wiemy. Ale musimy naprawdę przyjrzeć się tym danym i powiedzieć wszystkim: hej, to nie jest komitet dostępności danych.

Komitet dostępności danych został pierwotnie stworzony i promowany przez StarkWare dla wdrożeń StarkEx oraz przez Arbitrum. Ale nie o to chodziło — żeby móc powiedzieć: „Mam jeden serwer w piwnicy, mogę go nazwać komitetem dostępności danych”. Nie taki był cel tego przedsięwzięcia.

Podsumowując, przykro mi to mówić, ale w tej chwili w większości L2 operatorzy wymagający zezwolenia mogą ukraść lub zamrozić wasze środki. Jesteśmy tu po to, aby uświadomić to wam wszystkim. Przykro mi to mówić, ale musimy zmienić to nastawienie.

#### Dlaczego systemy dowodzenia mają znaczenie (8:40) {#why-proof-systems-matter-840}

Dlaczego powinniśmy dbać o systemy dowodzenia? Naszym zdaniem istnieją co najmniej trzy dobre powody, dla których wszyscy powinniśmy mieć działający system dowodzenia.

Jednym z nich jest to, że faktycznie pozwala to na niewymagające pozwoleń wyjście w przypadku, gdy wszyscy operatorzy przestaną działać — a mogą przestać działać z jakiegokolwiek powodu. Całkiem niedawno mieliśmy przypadek awarii dYdX. Ostrzegli użytkowników, wielu z nich nie wyszło. Jednak jeśli masz system dowodzenia, możesz zbudować system tak, aby w sposób niewymagający pozwoleń ktoś przejął kontrolę, lub możesz zbudować mechanizm ewakuacyjny, aby użytkownicy mogli odzyskać swoje środki. To niezwykle ważne. Bez systemu dowodzenia po prostu nie możesz tego zrobić — to niemożliwe.

Drugim powodem jest to, że możesz faktycznie poprawić założenia dotyczące zaufania rady bezpieczeństwa — zakładając oczywiście, że ją masz. A powód tego jest dość zniuansowany. To, co możesz teraz zrobić, to: zamiast sytuacji, w której złośliwy proponujący — a to jest diagram pokazujący standardowy optymistyczny rollup bez systemu dowodzenia, co można dziś zobaczyć w wielu łańcuchach OP Stack — istnieje bardzo silny multisig, który może nadpisać korzeń stanu, i jest proponujący, który proponuje korzenie stanu. Jeśli ta propozycja jest złośliwa, wszystko, co muszą zrobić, to przekupić mniejszość członków rady bezpieczeństwa, aby odwrócili wzrok — nie po to, by zrobili coś złośliwego, ale po prostu nic nie robili, w którym to przypadku złośliwa propozycja faktycznie przejdzie i ukradną środki.

Po wprowadzeniu systemu dowodzenia sytuacja staje się znacznie trudniejsza dla złośliwego proponującego, ponieważ teraz musi on przekupić **większość** rady bezpieczeństwa. Nie tylko musi przekupić większość, ale musi faktycznie zmusić ich do zrobienia czegoś złośliwego — a nie tylko odwrócenia wzroku. To zupełnie inna propozycja. Zmusić kogoś do odwrócenia wzroku to powiedzieć: „Hej, jeśli dam ci 10 milionów dolarów, po prostu zgubisz klucze lub udasz się w długi międzynarodowy lot”. Jeśli chcesz zmusić kogoś do zrobienia czegoś złośliwego, to zupełnie inna sprawa. Uważamy, że to fundamentalnie zmienia założenia dotyczące zaufania, zwłaszcza w przypadku publicznej rady bezpieczeństwa.

Wreszcie, systemy dowodzenia — jeśli jesteś na Etapie 2 (Stage 2) — pozwalają na usunięcie jakichkolwiek pośredników. Nie potrzebujesz rady bezpieczeństwa, a jeśli ją masz, to tylko w sytuacjach awaryjnych. Może to więc mieć głębokie implikacje regulacyjne. Możesz chcieć uruchomić swoje L2 jako system Etapu 2 od samego początku. Jest to możliwe, ale oczywiście musisz mieć system dowodzenia — w idealnym przypadku możesz chcieć mieć więcej niż jeden. Pojawiły się już pewne ogłoszenia o systemach, które to robią, jak niedawne ogłoszenie zespołu Nethermind budującego rollup, który ma być na Etapie 2 w momencie uruchomienia.

#### Dlaczego rady bezpieczeństwa, a nie multisigi (11:29) {#why-security-councils-not-multisigs-1129}

To było o systemach dowodzenia. Teraz, dlaczego rady bezpieczeństwa, a nie po prostu zwykłe multisigi? Powód jest taki: nie wierzcie, że multisigi to multisigi. To jest powód — chyba że istnieje warstwa społeczna, która może was faktycznie przekonać, że są one fundamentalnie zdywersyfikowane.

Mieliśmy kilka dużych wydarzeń w naszej historii. Mieliśmy Multichain, który twierdził, że jest bardzo zdecentralizowany, a okazało się, że nie, nie był — i jest to twierdzenie, którego nie można tak naprawdę zweryfikować niezależnie. Ogromny atak, robota z wewnątrz, czy oszustwo (rug pull) — nie jesteśmy pewni.

Następnie mieliśmy sytuację z Oasis, gdzie zwrócił się do nich brytyjski sąd i musieli faktycznie użyć multisiga, aby wydobyć pewne środki z protokołu. Byłoby to niemożliwe, gdyby istniała geopolitycznie zdywersyfikowana rada bezpieczeństwa, ponieważ nie ma nakazu sądowego, który mógłby faktycznie dotrzeć do wszystkich.

Wreszcie, całkiem niedawno mieliśmy atak na multisig. Nie myślcie ani przez chwilę, że multisigi nie mogą zostać zaatakowane. Ostatecznie musimy pozbyć się ich wszystkich.

Podsumowując: jeśli masz rollup na Etapie 0 bez rady bezpieczeństwa, w zasadzie złośliwy operator może zrobić z twoimi środkami, co tylko zechce. Jeśli jesteś rollupem na Etapie 0 z radą bezpieczeństwa, to atakujący musi przekupić mniejszość rady bezpieczeństwa — może to być trudne, ale znacznie łatwiejsze niż przekupienie większości rady bezpieczeństwa, co musiałbyś zrobić, gdyby twój rollup miał system dowodzenia. I wreszcie, nikt nie może ukraść twoich środków, jeśli jesteś na Etapie 2. To jest obietnica dotarcia do Etapu 2.

#### Proponowana reklasyfikacja (13:10) {#proposed-reclassification-1310}

Pytanie brzmi: czy mamy odpowiednie zachęty dla projektów, aby faktycznie się tym przejmowały? Problem polega na tym, że jedyną rzeczą, jaką możemy zrobić — my jako L2BEAT i my jako społeczność Ethereum — jest wywieranie presji społecznej. Vitalik powiedział, że od przyszłego roku planuje publicznie wspominać tylko o L2, które są na Etapie 1. Wcześniej powiedział nawet, że nie będzie nazywał systemów rollupami, jeśli nie są na Etapie 1.

Zastanawialiśmy się więc, co możemy zrobić. W tej chwili mamy etapy dla rollupów. Nie mamy etapów dla validium i optimium. Długo się zastanawialiśmy — może moglibyśmy wprowadzić „Etap 0+” dla systemów, które mają systemy dowodzenia, ale nie są jeszcze na Etapie 1. Ale po miesiącach dyskusji zdecydowaliśmy: nie, czas dorosnąć.

To, co proponujemy społeczności — i to trafi na forum w celu uzyskania opinii społeczności — to to. Po pierwsze, chcemy stworzyć osobną kategorię dla systemów. Główna różnica polega na tym, że będziesz musiał mieć system dowodzenia, aby być na Etapie 0. Więc na przykład StarkNet dzisiaj będzie na Etapie 0 w tej klasyfikacji. Wszystkie łańcuchy OP Stack, które nie mają systemu dowodzenia — z wyjątkiem Base i Optimism — nie znajdą się w tej kategorii. I oczywiście damy systemom czas na dostosowanie się. To jest główna kategoria i powinna to być swego rodzaju superliga systemów.

Następnie mamy kolejną kategorię systemów, które nie używają DA Ethereum. Używają one dodatkowych założeń dotyczące zaufania, które wiążą się z zewnętrznym DA. Nazywamy je „alt-DA”, ale obejmowałyby one validium, optimium i wszelkie konstrukcje hybrydowe, jakie można stworzyć. Muszą one jednak dawać rozsądne gwarancje DA — to nie może być twoja piwnica. To musi być komitet dostępności danych o rozsądnej wielkości, a jeśli używasz Celestii lub Avail, musisz użyć mostu.

#### Kategoria „inne” i zobowiązanie L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

A co z pozostałymi? Umieścimy je w trzeciej kategorii, którą nazywamy — i teraz czekam na opinie społeczności, jak nazwać te systemy — nasza robocza nazwa to „inne”. Rzecz w tym, że są one zabezpieczone przez multisigi, a my obnażymy te multisigi, pokazując, czym naprawdę są. To właśnie chcemy zrobić w naszym interfejsie użytkownika.

Interfejs użytkownika będzie wyglądał mniej więcej tak: zobaczysz ten podział — rollupy, validium i optimium oraz inne. A domyślne sortowanie będzie według bezpieczeństwa, a nie według TVL. Nie gońmy za TVL przy słabym bezpieczeństwie — to skończy się naprawdę źle.

Będziemy promować projekty z Etapu 1 i Etapu 2. Na projekty z Etapu 0 będziemy patrzeć jak na pretendentów. Jeśli chodzi o „inne”, chętnie je wymienimy — będziemy niezwykle liberalni. Musisz po prostu być w zasadzie zgodny z Ethereum i oczywiście mieć most, który pozwala na przenoszenie środków. Będziemy jednak przyglądać się założeniom dotyczącym zaufania i multisigom, i mamy nadzieję, że powoli, ale pewnie, systemy będą przechodzić z kategorii „inne” do validium/optimium lub do rollupów.

Tak naszym zdaniem wyglądałaby kategoria „inne” — to są prawdziwe dane na ten moment, prawdziwe systemy, które mogą wpaść do tej kategorii, jeśli nie wprowadzą systemu dowodzenia. Zobaczysz dokładnie, kto jest proponującym, kto jest rzucającym wyzwanie (challenger), a kto aktualizującym (upgrader). Zabawne jest to, że można to zobaczyć już dziś na L2BEAT — po prostu te informacje są tak głęboko ukryte na stronie ze szczegółami, że założę się, iż sprawdzają je tylko badacze i entuzjaści. To wszystko jest dostępne już dziś. Chcemy jednak udostępnić te dane użytkownikom końcowym. Chcemy, aby użytkownicy końcowi byli w pełni świadomi tego, co się dzieje, abyśmy wszyscy byli odpowiedzialni za systemy, które budujemy.

Czy wystarczy po prostu powiedzieć „Mam system dowodzenia”? Nie. Naszym zobowiązaniem wobec społeczności jako L2BEAT jest to, że w przyszłym roku przeznaczymy znaczne zasoby na to, aby naprawdę bardzo uważnie i głęboko przyjrzeć się tym systemom dowodzenia, aby upewnić się, że są one solidne i kompletne. Przeanalizujemy zarówno ZK, jak i optymistyczne. Wejdziemy w kod źródłowy, przyjrzymy się, jak stworzyliście swoją zaufaną konfigurację, przyjrzymy się waszym obwodom i zobaczymy, co dokładnie jest weryfikowane onchain. Chcemy, aby wszystko było super przejrzyste, aby założenia dotyczące zaufania były jasno komunikowane — i co ważniejsze, wasz system dowodzenia nie może być ukryty za nieracjonalnie małą białą listą.

Zatrudniamy badaczy. Wykonamy całą tę pracę. To jest nasze zobowiązanie na przyszły rok. Mam nadzieję, że przyszły rok będzie rokiem L2 i rollupów — jednak nie chodzi o uruchomienie rollupa jednym kliknięciem przycisku. Chodzi o to, aby móc uruchomić system z dobrym bezpieczeństwem. W idealnym przypadku chcesz odziedziczyć jak najwięcej bezpieczeństwa z Ethereum. Przed nami wszystkimi dużo pracy, aby to osiągnąć. Ale jeśli tego nie zrobimy, to w zasadzie jedyne, co robimy, to tworzenie tysięcy niezabezpieczonych łańcuchów pobocznych (sidechains). Myślę, że jako społeczność tego nie chcemy.

#### Pytania i odpowiedzi (18:45) {#qa-1845}

**Prowadzący:** Przejdźmy do pytań i odpowiedzi. Czy to ważne, aby rollupy miały zdecentralizowany sekwenser, czy też inne mechanizmy bezpieczeństwa są wystarczające?

**Bartek Kiepuszewski:** To bardzo dobre i ważne pytanie. Myślę, że zobaczymy różne projekty. Nie sądzę, aby decentralizacja sekwensera była super ważna dla bezpieczeństwa środków użytkowników, ale może być ważna dla odporności na cenzurę w czasie rzeczywistym w pewnych sytuacjach. Vitalik powiedział podczas swojego przemówienia otwierającego, że przyszłość może wyglądać tak, że zobaczymy rollupy oparte na warstwie bazowej (based rollups) — wykorzystujące infrastrukturę Ethereum do walki z cenzurą w czasie rzeczywistym — podczas gdy inne, jak powiedzmy MegaETH, mogą w rzeczywistości mieć bardzo scentralizowany sekwenser i polegać tylko na mechanizmie ewakuacyjnym. Możemy zobaczyć konstrukcje hybrydowe. Myślę, że przestrzeń projektowa jest ogromna, a teraz w L2BEAT naprawdę chcemy zobaczyć, co się wydarzy i jak to się rozwinie.

**Prowadzący:** Czy systemy dowodzenia oparte na TEE będą uważane za Etap 2, nawet jeśli implikują zaufanie do producenta sprzętu?

**Bartek Kiepuszewski:** Krótka odpowiedź brzmi: nie, ponieważ przy konstrukcjach, które widzimy dzisiaj, jeśli używasz SGX, Intel mógłby przesłać dowód i potencjalnie zablokować, ukraść lub zamrozić, co tylko zechce, bez niczyjej wiedzy — i bez wiedzy Ethereum. Jednak biorąc pod uwagę całą pracę wkładaną w tworzenie niewymagających zaufania, niewymagających pozwoleń TEE — powiedziano mi, że to w rzeczywistości niezwykle ekscytująca praca. Ale krótka odpowiedź: dzisiaj, nie.

**Prowadzący:** Dlaczego Optimism jest sklasyfikowany jako Etap 1? Na podstawie oceny nie są — Fundacja całkowicie kontroluje proces propozycji.

**Bartek Kiepuszewski:** W zasadzie spełniają wszystkie kryteria. Nie chodzi tak naprawdę o proces propozycji — chodzi o to, kto kontroluje środki. Możesz mieć scentralizowanego proponującego, jednak istnieje rozwiązanie awaryjne. Jeśli przestaną działać, cały system staje się bardziej niewymagający pozwoleń. Myślę, że ważne jest, aby rozpoznać, jaka jest rola rady bezpieczeństwa. Chcemy, aby systemy Etapu 1 pozwalały na wyjście, jeśli scentralizowany proponujący się zatrzyma. Na przykład w przypadku dYdX propozycja była super scentralizowana, jednak kiedy się zatrzymali, ludzie mogli wyjść. Więc nie chodzi o to, czy jesteś scentralizowany, czy zdecentralizowany — chodzi o to, czy faktycznie możesz wyjść w sposób niewymagający pozwoleń.

Spełnili wszystkie kryteria. Swoją drogą, dopracowywaliśmy je — kryteria to nie jest coś wyrytego w kamieniu, ponieważ wszystkie te systemy ewoluują, więc musimy ewoluować wraz z nimi. Kryteria mogą się nieco zmieniać, a my bardzo uważnie przyglądamy się zarówno Optimism, jak i Arbitrum, ponieważ wyraźnie są to dwaj liderzy. Jest wiele niuansów, w które nie mam czasu wchodzić. Ale to nie jest tak, że masz przypisany etap na zawsze — jeśli pojawią się nowe informacje lub coś, co mogliśmy pominąć lub przeoczyć, jest całkiem możliwe, że możesz stracić to oznaczenie.

**Prowadzący:** Jakie są główne powody, dla których projekty nie budują w kierunku Etapu 1?

**Bartek Kiepuszewski:** Złożoność, czas, koszty, talent. To zaskakująco kosztowne. Jak powiedziałem, pionierzy cztery lata temu w zasadzie budowali — dYdX był dosłownie jednym z pierwszych, jeśli nie pierwszym, rollupem ZK. Był specyficzny dla aplikacji, ale wciąż był pierwszy. I gdyby nie drobne niuanse, byłby to Etap 2 — tak naprawdę to proces zarządzania, którego wymagamy dla Etapu 2, zawodzi. Ale w każdym praktycznym sensie jest to system Etapu 2. Został zbudowany cztery lata temu, więc to nie tak, że to niemożliwe.

Myślę, że to, co sprawia, że dzisiaj wszystkim rollupom jest tak trudno to zrobić, szczerze mówiąc, to fakt, że większość rollupów nie jest budowana przez zespoły — są one uruchamiane przez dostawców usług typu rollup-as-a-service, a my musimy ich zachęcić, aby faktycznie robili to lepiej. I to jest trudne. Nikt nie mówił, że będzie łatwo.