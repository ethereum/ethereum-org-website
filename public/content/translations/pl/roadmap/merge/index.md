---
title: The Merge
description: "Dowiedz się o The Merge – kiedy sieć główna Ethereum przeszła na dowód stawki (PoS)."
lang: pl
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - Sieć główna Ethereum wykorzystuje dowód stawki (PoS), ale nie zawsze tak było.
  - Aktualizacja z oryginalnego mechanizmu dowodu pracy (PoW) do dowodu stawki (PoS) została nazwana The Merge.
  - The Merge odnosi się do połączenia oryginalnej sieci głównej Ethereum z oddzielnym blockchainem opartym na dowodzie stawki zwanym Beacon Chain, które teraz istnieją jako jeden łańcuch.
  - The Merge zmniejszyło zużycie energii przez Ethereum o około 99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge zostało przeprowadzone 15 września 2022 roku. Zakończyło to przejście Ethereum na konsensus oparty na dowodzie stawki (PoS), oficjalnie wycofując dowód pracy (PoW) i zmniejszając zużycie energii o około 99,95%.
</UpgradeStatus>

## Czym było The Merge? {#what-is-the-merge}

The Merge było połączeniem oryginalnej warstwy wykonawczej Ethereum (sieci głównej, która istniała od [bloku genezy](/ethereum-forks/#frontier)) z jej nową warstwą konsensusu opartą na dowodzie stawki (PoS), czyli Beacon Chain. Wyeliminowało to potrzebę energochłonnego kopania i zamiast tego umożliwiło zabezpieczenie sieci za pomocą stakowanego ETH. Był to niezwykle ekscytujący krok w realizacji wizji [Ethereum](/) – większej skalowalności, bezpieczeństwa i zrównoważonego rozwoju.

<MergeInfographic />

Początkowo [Beacon Chain](/roadmap/beacon-chain/) został uruchomiony oddzielnie od [sieci głównej](/glossary/#mainnet). Sieć główna Ethereum – ze wszystkimi swoimi kontami, saldami, inteligentnymi kontraktami i stanem blockchaina – nadal była zabezpieczana przez [dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/), nawet gdy Beacon Chain działał równolegle, wykorzystując [dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos/). The Merge to moment, w którym te dwa systemy w końcu się połączyły, a dowód pracy został na stałe zastąpiony dowodem stawki.

Wyobraź sobie, że Ethereum to statek kosmiczny, który wystartował, zanim był w pełni gotowy na podróż międzygwiezdną. Dzięki Beacon Chain społeczność zbudowała nowy silnik i wzmocniony kadłub. Po intensywnych testach nadszedł czas, aby w trakcie lotu wymienić stary silnik na nowy. W ten sposób nowy, bardziej wydajny silnik został zintegrowany z istniejącym statkiem, umożliwiając mu pokonanie wielu lat świetlnych i podbój wszechświata.

## Połączenie z siecią główną {#merging-with-mainnet}

Dowód pracy zabezpieczał sieć główną Ethereum od bloku genezy aż do The Merge. Pozwoliło to blockchainowi Ethereum, do którego wszyscy jesteśmy przyzwyczajeni, powstać w lipcu 2015 roku ze wszystkimi jego znanymi funkcjami – transakcjami, inteligentnymi kontraktami, kontami itp.

Przez całą historię Ethereum deweloperzy przygotowywali się do ostatecznego odejścia od dowodu pracy na rzecz dowodu stawki. 1 grudnia 2020 roku Beacon Chain został utworzony jako oddzielny blockchain w stosunku do sieci głównej, działający równolegle.

Beacon Chain początkowo nie przetwarzał transakcji z sieci głównej. Zamiast tego osiągał konsensus co do własnego stanu, uzgadniając aktywne walidatory i salda ich kont. Po szeroko zakrojonych testach nadszedł czas, aby Beacon Chain zaczął osiągać konsensus na danych ze świata rzeczywistego. Po The Merge, Beacon Chain stał się silnikiem konsensusu dla wszystkich danych sieciowych, w tym transakcji warstwy wykonawczej i sald kont.

The Merge stanowiło oficjalne przejście na korzystanie z Beacon Chain jako silnika produkcji bloków. Kopanie nie jest już sposobem na tworzenie ważnych bloków. Zamiast tego rolę tę przejęły walidatory oparte na dowodzie stawki, które są teraz odpowiedzialne za przetwarzanie ważności wszystkich transakcji i proponowanie bloków.

Podczas The Merge nie utracono żadnej historii. Kiedy sieć główna połączyła się z Beacon Chain, połączyła również całą historię transakcji Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
To przejście na dowód stawki zmieniło sposób emisji etheru. Dowiedz się więcej o [emisji etheru przed i po The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Użytkownicy i posiadacze {#users-holders}

**The Merge nie zmieniło niczego dla posiadaczy/użytkowników.**

_Warto to powtórzyć_: Jako użytkownik lub posiadacz ETH, lub jakiegokolwiek innego aktywa cyfrowego na Ethereum, a także jako staker nieobsługujący węzła, **nie musisz nic robić ze swoimi środkami ani portfelem w związku z The Merge.** ETH to po prostu ETH. Nie ma czegoś takiego jak „stare ETH”/„nowe ETH” czy „Eth1”/„Eth2”, a portfele działają dokładnie tak samo po The Merge, jak przed nim – osoby twierdzące inaczej to prawdopodobnie oszuści.

Mimo rezygnacji z dowodu pracy, cała historia Ethereum od bloku genezy pozostała nienaruszona i niezmieniona przez przejście na dowód stawki. Wszelkie środki przechowywane w Twoim portfelu przed The Merge są nadal dostępne po The Merge. **Z Twojej strony nie są wymagane żadne działania w celu aktualizacji.**

[Więcej o bezpieczeństwie Ethereum](/security/#eth2-token-scam)

### Operatorzy węzłów i deweloperzy dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Operatorzy i dostawcy węzłów do stakingu"
contentPreview="Jeśli jesteś stakerem prowadzącym własną konfigurację węzła lub dostawcą infrastruktury węzłów, jest kilka rzeczy, o których musisz wiedzieć po The Merge."
id="staking-node-operators">

Kluczowe działania obejmują:

1. Uruchomienie _zarówno_ klienta konsensusu, jak i klienta warstwy wykonawczej; punkty końcowe stron trzecich do uzyskiwania danych wykonawczych nie działają od czasu The Merge.
2. Uwierzytelnienie zarówno klienta warstwy wykonawczej, jak i klienta konsensusu za pomocą współdzielonego sekretu JWT, aby mogły się bezpiecznie komunikować.
3. Ustawienie adresu `fee recipient`, aby otrzymywać zarobione napiwki z opłat transakcyjnych/MEV.

Niewykonanie dwóch pierwszych z powyższych punktów spowoduje, że Twój węzeł będzie widoczny jako „offline”, dopóki obie warstwy nie zostaną zsynchronizowane i uwierzytelnione.

Nieustawienie `fee recipient` nadal pozwoli Twojemu walidatorowi działać normalnie, ale stracisz niespalone napiwki z opłat i wszelkie MEV, które w przeciwnym razie zarobiłbyś w blokach proponowanych przez Twój walidator.
</ExpandableCard>

<ExpandableCard
title="Operatorzy węzłów niewalidujących i dostawcy infrastruktury"
contentPreview="Jeśli obsługujesz niewalidujący węzeł Ethereum, najbardziej znaczącą zmianą, jaka nadeszła wraz z The Merge, był wymóg uruchomienia klientów ZARÓWNO dla warstwy wykonawczej, JAK I warstwy konsensusu."
id="node-operators">

Aż do The Merge, klient warstwy wykonawczej (taki jak Go Ethereum (Geth), Erigon, Besu lub Nethermind) wystarczał do odbierania, prawidłowego walidowania i propagowania bloków rozsyłanych w sieci. _Po The Merge_, ważność transakcji zawartych w ładunku wykonawczym zależy teraz również od ważności „bloku konsensusu”, w którym się on znajduje.

W rezultacie pełny węzeł Ethereum wymaga teraz zarówno klienta warstwy wykonawczej, jak i klienta konsensusu. Te dwa klienty współpracują ze sobą za pomocą nowego Engine API. Engine API wymaga uwierzytelnienia za pomocą sekretu JWT, który jest dostarczany obu klientom, umożliwiając bezpieczną komunikację.

Kluczowe działania obejmują:

- Zainstalowanie klienta konsensusu oprócz klienta warstwy wykonawczej
- Uwierzytelnienie klienta warstwy wykonawczej i klienta konsensusu za pomocą współdzielonego sekretu JWT, aby mogły się ze sobą bezpiecznie komunikować.

Niewykonanie powyższych punktów spowoduje, że Twój węzeł będzie widoczny jako „offline”, dopóki obie warstwy nie zostaną zsynchronizowane i uwierzytelnione.

</ExpandableCard>

<ExpandableCard
title="Twórcy dapp i inteligentnych kontraktów"
contentPreview="The Merge zostało zaprojektowane tak, aby miało minimalny wpływ na twórców inteligentnych kontraktów i dapp."
id="developers">

The Merge wprowadziło zmiany w konsensusie, które obejmują również zmiany związane z:

<ul>
  <li>strukturą bloku</li>
  <li>czasem trwania slotu/bloku</li>
  <li>zmianami kodów operacji (opcode)</li>
  <li>źródłami losowości onchain</li>
  <li>koncepcją <em>bezpiecznej głowy (safe head)</em> i <em>sfinalizowanych bloków</em></li>
</ul>

Aby uzyskać więcej informacji, sprawdź ten wpis na blogu autorstwa Tima Beiko na temat tego, <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">jak The Merge wpływa na warstwę aplikacji Ethereum</a>.

</ExpandableCard>

## The Merge a zużycie energii {#merge-and-energy}

The Merge wyznaczyło koniec dowodu pracy dla Ethereum i zapoczątkowało erę bardziej zrównoważonego, ekologicznego Ethereum. Zużycie energii przez Ethereum spadło o szacunkowe 99,95%, czyniąc Ethereum zielonym blockchainem. Dowiedz się więcej o [zużyciu energii przez Ethereum](/energy-consumption/).

## The Merge a skalowanie {#merge-and-scaling}

The Merge przygotowało również grunt pod dalsze aktualizacje skalowalności, które nie były możliwe w ramach dowodu pracy, przybliżając Ethereum o krok do osiągnięcia pełnej skali, bezpieczeństwa i zrównoważonego rozwoju, do których dąży [jego mapa drogowa](/roadmap/).

## Błędne przekonania na temat The Merge {#misconceptions}

<ExpandableCard
title="Błędne przekonanie: &quot;Uruchomienie węzła wymaga stakowania 32 ETH.&quot;"
contentPreview="Fałsz. Każdy może swobodnie zsynchronizować własną, zweryfikowaną przez siebie kopię Ethereum (tj. uruchomić węzeł). Żadne ETH nie jest wymagane — ani przed The Merge, ani po The Merge, ani nigdy.">

Istnieją dwa rodzaje węzłów Ethereum: węzły, które mogą proponować bloki, oraz węzły, które tego nie robią.

Węzły proponujące bloki stanowią tylko niewielką część wszystkich węzłów w Ethereum. Kategoria ta obejmuje węzły kopiące w ramach dowodu pracy (PoW) oraz węzły walidatorów w ramach dowodu stawki (PoS). Kategoria ta wymaga zaangażowania zasobów ekonomicznych (takich jak moc obliczeniowa GPU w dowodzie pracy lub stakowane ETH w dowodzie stawki) w zamian za możliwość okazjonalnego zaproponowania następnego bloku i zdobycia nagród z protokołu.

Pozostałe węzły w sieci (czyli większość) nie muszą angażować żadnych zasobów ekonomicznych poza komputerem klasy konsumenckiej z 1-2 TB dostępnej pamięci masowej i połączeniem z internetem. Węzły te nie proponują bloków, ale nadal odgrywają kluczową rolę w zabezpieczaniu sieci, pociągając wszystkich proponujących bloki do odpowiedzialności poprzez nasłuchiwanie nowych bloków i weryfikowanie ich ważności po przybyciu zgodnie z zasadami konsensusu sieci. Jeśli blok jest ważny, węzeł kontynuuje jego propagację w sieci. Jeśli blok jest nieważny z jakiegokolwiek powodu, oprogramowanie węzła zignoruje go jako nieważny i zatrzyma jego propagację.

Uruchomienie węzła nieprodukującego bloków jest możliwe dla każdego w ramach dowolnego mechanizmu konsensusu (dowodu pracy lub dowodu stawki); jest to <em>zdecydowanie zalecane</em> dla wszystkich użytkowników, jeśli mają ku temu środki. Prowadzenie węzła jest niezwykle cenne dla Ethereum i daje dodatkowe korzyści każdej osobie, która go prowadzi, takie jak zwiększone bezpieczeństwo, prywatność i odporność na cenzurę.

Możliwość uruchomienia własnego węzła przez każdego jest <em>absolutnie niezbędna</em> do utrzymania decentralizacji sieci Ethereum.

[Więcej o uruchamianiu własnego węzła](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: &quot;The Merge nie obniżyło opłat za gaz.&quot;"
contentPreview="Fałsz. The Merge było zmianą mechanizmu konsensusu, a nie rozszerzeniem przepustowości sieci, i nigdy nie miało na celu obniżenia opłat za gaz.">

Opłaty za gaz są wynikiem popytu w sieci w stosunku do jej przepustowości. The Merge wycofało użycie dowodu pracy, przechodząc na dowód stawki w celu osiągnięcia konsensusu, ale nie zmieniło znacząco żadnych parametrów, które bezpośrednio wpływają na pojemność lub przepustowość sieci.

Dzięki <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">mapie drogowej skoncentrowanej na rollupach</a>, wysiłki skupiają się na skalowaniu aktywności użytkowników w [warstwie 2 (L2)](/layer-2/), jednocześnie umożliwiając sieci głównej w warstwie 1 (L1) działanie jako bezpieczna, zdecentralizowana warstwa rozrachunku zoptymalizowana pod kątem przechowywania danych rollupów, aby pomóc w wykładniczym obniżeniu kosztów transakcji rollupów. Przejście na dowód stawki jest kluczowym krokiem poprzedzającym realizację tego celu. [Więcej o gazie i opłatach.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: &quot;Transakcje zostały znacznie przyspieszone przez The Merge.&quot;"
contentPreview="Fałsz. Chociaż istnieją pewne niewielkie zmiany, prędkość transakcji na warstwie 1 jest obecnie w większości taka sama, jak przed The Merge.">
„Szybkość” transakcji można mierzyć na kilka sposobów, w tym czas do włączenia do bloku i czas do ostateczności. Oba te parametry uległy niewielkiej zmianie, ale nie w sposób zauważalny dla użytkowników.

Historycznie, w dowodzie pracy, celem było tworzenie nowego bloku co około 13,3 sekundy. W ramach dowodu stawki sloty występują dokładnie co 12 sekund, z których każdy jest okazją dla walidatora do opublikowania bloku. Większość slotów ma bloki, ale niekoniecznie wszystkie (np. gdy walidator jest offline). W dowodzie stawki bloki są produkowane o około 10% częściej niż w dowodzie pracy. Była to dość nieznaczna zmiana i jest mało prawdopodobne, aby została zauważona przez użytkowników.

Dowód stawki wprowadził koncepcję ostateczności transakcji, która wcześniej nie istniała. W dowodzie pracy możliwość odwrócenia bloku staje się wykładniczo trudniejsza z każdym kolejnym blokiem wykopanym na wierzchu transakcji, ale nigdy nie spada całkowicie do zera. W ramach dowodu stawki bloki są grupowane w epoki (6,4-minutowe przedziały czasu zawierające 32 szanse na bloki), nad którymi głosują walidatory. Kiedy epoka dobiega końca, walidatory oddają głos na to, czy uznać epokę za „uzasadnioną”. Jeśli walidatory zgodzą się uzasadnić epokę, zostaje ona sfinalizowana w następnej epoce. Cofnięcie sfinalizowanych transakcji jest ekonomicznie nieopłacalne, ponieważ wymagałoby uzyskania i spalenia ponad jednej trzeciej całkowitego stakowanego ETH.

</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: &quot;The Merge umożliwiło wypłaty ze stakingu.&quot;"
contentPreview="Fałsz, ale wypłaty ze stakingu zostały od tego czasu włączone poprzez aktualizację Szanghaj/Capella.">

Początkowo po The Merge stakerzy mieli dostęp tylko do napiwków z opłat i MEV, które zostały zarobione w wyniku propozycji bloków. Nagrody te są dopisywane do konta niestakującego kontrolowanego przez walidatora (znanego jako <em>odbiorca opłat</em>) i są dostępne natychmiast. Nagrody te są oddzielone od nagród z protokołu za wykonywanie obowiązków walidatora.

Od czasu aktualizacji sieci Szanghaj/Capella stakerzy mogą teraz wyznaczyć <em>adres wypłaty</em>, aby zacząć otrzymywać automatyczne wypłaty wszelkich nadwyżek salda stakowania (ETH powyżej 32 z nagród z protokołu). Aktualizacja ta umożliwiła również walidatorowi odblokowanie i odzyskanie całego salda po wyjściu z sieci.

[Więcej o wypłatach ze stakowania](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: &quot;Teraz, gdy The Merge zostało zakończone, a wypłaty są włączone, wszyscy stakerzy mogliby wyjść naraz.&quot;"
contentPreview="Fałsz. Wyjścia walidatorów są limitowane ze względów bezpieczeństwa.">
Ponieważ aktualizacja Szanghaj/Capella umożliwiła wypłaty, walidatory są zachęcane do wypłacania swojego salda stakowania powyżej 32 ETH, ponieważ środki te nie zwiększają zysku i w przeciwnym razie są zablokowane. W zależności od APR (określanego przez całkowitą ilość stakowanego ETH), mogą być zachęcani do wyjścia ze swojego walidatora (lub walidatorów), aby odzyskać całe saldo lub potencjalnie stakować jeszcze więcej, wykorzystując swoje nagrody do uzyskania większego zysku.

Ważne zastrzeżenie: pełne wyjścia walidatorów są ograniczone przez protokół i tylko określona liczba walidatorów może wyjść w każdej epoce (co 6,4 minuty). Limit ten waha się w zależności od liczby aktywnych walidatorów, ale wynosi w przybliżeniu 0,33% całkowitego stakowanego ETH, które może zostać wycofane z sieci w ciągu jednego dnia.

Zapobiega to masowemu odpływowi stakowanych środków. Ponadto zapobiega to sytuacji, w której potencjalny atakujący z dostępem do dużej części całkowitego stakowanego ETH popełnia wykroczenie podlegające cięciu (slashing) i wychodzi/wypłaca wszystkie salda naruszających zasady walidatorów w tej samej epoce, zanim protokół zdąży wyegzekwować karę cięcia.

APR jest również celowo dynamiczne, co pozwala rynkowi stakerów zrównoważyć to, ile chcą otrzymać za pomoc w zabezpieczaniu sieci. Jeśli stawka jest zbyt niska, walidatory będą wychodzić w tempie ograniczonym przez protokół. Stopniowo podniesie to APR dla wszystkich, którzy pozostaną, ponownie przyciągając nowych lub powracających stakerów.
</ExpandableCard>

## Co się stało z „Eth2”? {#eth2}

Termin „Eth2” został wycofany. Po połączeniu „Eth1” i „Eth2” w jeden łańcuch nie ma już potrzeby rozróżniania dwóch sieci Ethereum; istnieje po prostu Ethereum.

Aby ograniczyć zamieszanie, społeczność zaktualizowała te terminy:

- „Eth1” to teraz „warstwa wykonawcza”, która obsługuje transakcje i wykonanie.
- „Eth2” to teraz „warstwa konsensusu”, która obsługuje konsensus oparty na dowodzie stawki.

Te aktualizacje terminologii zmieniają jedynie konwencje nazewnictwa; nie zmienia to celów ani mapy drogowej Ethereum.

[Dowiedz się więcej o zmianie nazwy „Eth2”](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Związek między aktualizacjami {#relationship-between-upgrades}

Wszystkie aktualizacje Ethereum są ze sobą w pewien sposób powiązane. Podsumujmy więc, jak The Merge ma się do innych aktualizacji.

### The Merge a Beacon Chain {#merge-and-beacon-chain}

The Merge stanowi formalne przyjęcie Beacon Chain jako nowej warstwy konsensusu dla oryginalnej warstwy wykonawczej sieci głównej. Od czasu The Merge walidatory są przypisane do zabezpieczania sieci głównej Ethereum, a kopanie w oparciu o [dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/) nie jest już ważnym sposobem produkcji bloków.

Zamiast tego bloki są proponowane przez węzły walidujące, które stakowały ETH w zamian za prawo do uczestnictwa w konsensusie. Te aktualizacje przygotowują grunt pod przyszłe aktualizacje skalowalności, w tym sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  Beacon Chain
</ButtonLink>

### The Merge a aktualizacja Szanghaj {#merge-and-shanghai}

W celu uproszczenia i maksymalnego skupienia się na udanym przejściu na dowód stawki, aktualizacja The Merge nie obejmowała pewnych oczekiwanych funkcji, takich jak możliwość wypłaty stakowanego ETH. Ta funkcjonalność została włączona oddzielnie wraz z aktualizacją Szanghaj/Capella.

Dla ciekawskich, dowiedz się więcej o tym, [co dzieje się po The Merge](https://youtu.be/7ggwLccuN5s?t=101), co zaprezentował Vitalik na wydarzeniu ETHGlobal w kwietniu 2021 roku.

### The Merge a sharding {#merge-and-data-sharding}

Początkowo plan zakładał pracę nad shardingiem przed The Merge, aby rozwiązać problem skalowalności. Jednak wraz z boomem na [rozwiązania skalujące warstwy 2 (L2)](/layer-2/), priorytet przesunął się na zamianę dowodu pracy na dowód stawki w pierwszej kolejności.

Plany dotyczące shardingu szybko ewoluują, ale biorąc pod uwagę rozwój i sukces technologii warstwy 2 w skalowaniu wykonywania transakcji, plany shardingu przesunęły się na znalezienie najbardziej optymalnego sposobu dystrybucji ciężaru przechowywania skompresowanych danych wywołania (call data) z kontraktów rollupów, co pozwoli na wykładniczy wzrost przepustowości sieci. Nie byłoby to możliwe bez wcześniejszego przejścia na dowód stawki.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Dalsza lektura {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
