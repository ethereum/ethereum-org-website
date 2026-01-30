---
title: "Połączenie"
description: "Dowiedz się więcej o Połączeniu — kiedy w sieci głównej Ethereum przyjęto dowód stawki (proof-of-stake)."
lang: pl
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: "Sieć główna Ethereum wykorzystuje mechanizm proof-of-stake, ale nie zawsze tak było."
summaryPoint2: "Przejście z oryginalnego mechanizmu proof-of-work na proof-of-stake zostało nazwane Połączeniem."
summaryPoint3: "Połączenie odnosi się do połączenia pierwotnej sieci głównej Ethereum z oddzielnym łańcuchem blockchain proof-of-stake nazywaną łańcuchem śledzącym, które teraz istnieją jako jeden łańcuch."
summaryPoint4: "Połączenie zmniejszyło zużycie energii przez Ethereum o około 99,95%."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Połączenie zostało przeprowadzone w dniu 15 września 2022 r. Zakończyło to przejście Ethereum na konsensus proof-of-stake i oficjalną rezygnację z mechanizmu proof-of-work, skutkujące zmniejszeniem zużycia energii o około 99,95%.
</UpgradeStatus>

## Czym było Połączenie? {#what-is-the-merge}

Połączenie to scalenie pierwotnej warstwy wykonawczej Ethereum (sieci głównej, która istnieje od [genezy](/ethereum-forks/#frontier)) z jej nową warstwą konsensusu proof-of-stake, Łańcuchem śledzącym. Wyeliminowało to potrzebę energochłonnego wydobycia, a zamiast tego umożliwiło zabezpieczenie sieci za pomocą stakowanych ETH. To był naprawdę ekscytujący krok w realizacji wizji Ethereum — większej skalowalności, bezpieczeństwa i zrównoważenia ekologicznego.

<MergeInfographic />

Początkowo [Łańcuch śledzący](/roadmap/beacon-chain/) został uruchomiony oddzielnie od [sieci głównej](/glossary/#mainnet). Sieć główna Ethereum – ze wszystkimi jej kontami, saldami, inteligentnymi kontraktami i stanem blockchain – nadal była zabezpieczana przez [proof-of-work](/developers/docs/consensus-mechanisms/pow/), podczas gdy Łańcuch śledzący działał równolegle przy użyciu [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Połączenie to moment, w którym te dwa systemy w końcu się połączyły, a mechanizm proof-of-work został na stałe zastąpiony przez mechanizm proof-of-stake.

Wyobraź sobie, że Ethereum to statek kosmiczny, który wystartował, zanim był gotowy do podróży międzygwiezdnej. Dzięki łańcuchowi śledzącemu społeczność zbudowała nowy silnik i wzmocniony kadłub. Po intensywnych testach nadszedł czas, aby w czasie jazdy zamienić stary silnik na nowy. To połączyło nowy, wydajniejszy silnik z istniejącym statkiem, dzięki czemu mógł on nabrać kosmicznej prędkości i wyruszyć na podbój wszechświata.

## Połączenie z siecią główną {#merging-with-mainnet}

Mechanizm proof-of-work zabezpieczał sieć główną Ethereum od chwili jej genezy aż do Połączenia. Dzięki temu w lipcu 2015 roku powstał blockchain Ethereum, do którego wszyscy jesteśmy przyzwyczajeni, ze wszystkimi znanymi funkcjami — transakcjami, inteligentnymi kontraktami, kontami itp.

Deweloperzy przygotowywali się do ostatecznego przejścia z proof-of-work na proof-of-stake przez całą historię Ethereum. 1 grudnia 2020 roku łańcuch śledzący utworzono jako działającą równolegle sieć blockchain oddzielną od sieci głównej.

Początkowo łańcuch śledzący nie przetwarzał transakcji w sieci głównej. Zamiast tego osiągał konsensus co do swojego stanu, uzgadniając aktywnych walidatorów i salda ich kont. Po intensywnych testach nadszedł czas, aby łańcuch śledzący osiągnął konsensus na rzeczywistych danych. Po Połączeniu łańcuch śledzący stał się mechanizmem konsensusu dla wszystkich danych sieci, w tym transakcji w warstwie wykonania i sald kont.

Połączenie oznaczało oficjalne przejście na używanie łańcucha śledzącego jako silnika produkcji bloków. Wydobywanie nie jest już środkiem do produkcji ważnych bloków. Zamiast tego rolę tę przejęli walidatorzy proof-of-stake, którzy są teraz odpowiedzialni za przetwarzanie ważności wszystkich transakcji i proponowanie bloków.

Podczas Połączenia nie została utracona żadna historia. Gdy sieć główna połączyła się z łańcuchem śledzącym, połączona została również cała historia transakcyjna Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
To przejście na proof-of-stake zmieniło sposób emisji etheru. Dowiedz się więcej o [emisji etheru przed i po Połączeniu](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Użytkownicy i posiadacze {#users-holders}

**Połączenie nie zmieniło niczego dla posiadaczy/użytkowników.**

_Warto to powtórzyć_: jako użytkownik lub posiadacz ETH lub dowolnego innego zasobu cyfrowego w Ethereum, a także staker nieobsługujący węzła, **nie musisz nic robić ze swoimi środkami ani portfelem w związku z Połączeniem.** ETH to po prostu ETH. Nie ma czegoś takiego jak „stare ETH” / „nowe ETH” ani „ETH1”/„ETH2”, a portfele po Połączeniu działają dokładnie tak samo jak przed połączeniem — osoby, które mówią Ci, że jest inaczej, to prawdopodobnie oszuści.

Mimo przejścia z proof-of-work cała historia Ethereum od genezy pozostała nienaruszona i niezmieniona przez przejście na proof-of-stake. Wszelkie środki znajdujące się w Twoim portfelu przed Połączeniem są nadal dostępne po Połączeniu. **Nie jest wymagane żadne działanie z Twojej strony, aby dokonać uaktualnienia.**

[Więcej o bezpieczeństwie Ethereum](/security/#eth2-token-scam)

### Operatorzy węzłów i deweloperzy dapków {#node-operators-dapp-developers}

<ExpandableCard
title="Operatorzy i dostawcy węzłów stakujących"
contentPreview="Jeśli jesteś stakerem prowadzącym własny węzeł lub dostawcą infrastruktury węzłów, jest kilka rzeczy, o których musisz wiedzieć po Połączeniu."
id="staking-node-operators">

Kluczowe działania obejmują:

1. Uruchomienie _zarówno_ klienta konsensusu, jak i klienta wykonania; punkty końcowe stron trzecich, które otrzymują dane wykonania, nie działają już od czasu Połączenia.
2. Uwierzytelnienie zarówno klienta wykonania, jak i klienta konsensusu za pomocą wspólnego klucza tajnego JWT, aby mogli się bezpiecznie komunikować.
3. Ustawienie adresu „odbiorcy opłat”, na który będziesz otrzymywać swoje zarobione napiwki z tytułu opłat transakcyjnych/MEV.

Niewykonanie dwóch pierwszych punktów spowoduje, że węzeł będzie widoczny jako „offline”, dopóki obie warstwy nie zostaną zsynchronizowane i uwierzytelnione.

Nieustawienie „odbiorcy opłat” sprawi, że walidator będzie zachowywać się jak zwykle, ale utracisz niespalone napiwki z tytułu opłat i wszystkie MEV, które w przeciwnym razie zarobił(a)byś w blokach proponowanych przez walidatora.
</ExpandableCard>

<ExpandableCard
title="Operatorzy niewalidujących węzłów i dostawcy infrastruktury"
contentPreview="Jeśli prowadzisz niewalidujący węzeł Ethereum, najważniejszą zmianą wprowadzoną przez Połączenie był wymóg uruchomienia klientów zarówno dla warstwy wykonawczej, jak i warstwy konsensusu."
id="node-operators">

Do czasu Połączenia klient wykonania (taki jak Geth, Erigon, Besu czy Nethermind) wystarczał, aby odbierać, odpowiednio walidować i propagować bloki przekazywane przez sieć. _Po Połączeniu_ ważność transakcji zawartych w ładunku wykonania zależy teraz również od ważności „bloku konsensusu”, w którym jest on zawarty.

W rezultacie pełny węzeł Ethereum wymaga teraz zarówno klienta wykonania, jak i klienta konsensusu. Ci dwaj klienci współpracują ze sobą za pomocą nowego interfejsu API mechanizmu. Interfejs API mechanizmu wymaga uwierzytelnienia za pomocą tajnego klucza JWT, który jest przekazywany obu klientom, co umożliwia bezpieczną komunikację.

Kluczowe działania obejmują:

- Zainstaluj klienta konsensusu oprócz klienta wykonawczego
- Uwierzytelnij klientów wykonawczego i konsensusu za pomocą współdzielonego sekretu JWT, aby mogli się bezpiecznie komunikować.

Niewykonanie powyższych działań spowoduje, że węzeł będzie wyświetlany jako „offline”, dopóki obie warstwy nie zostaną zsynchronizowane i uwierzytelnione.
</ExpandableCard>

<ExpandableCard
title="Deweloperzy dapek i smart kontraktów"
contentPreview="Połączenie zostało zaprojektowane tak, aby mieć minimalny wpływ na deweloperów smart kontraktów i dapek."
id="developers">

Połączenie nastąpiło wraz ze zmianami w konsensusie, które obejmują również zmiany związane z:

<ul>
  <li>struktura bloków</li>
  <li>taktowanie gniazda/bloku</li>
  <li>zmiany kodu operacyjnego</li>
  <li>źródła losowości onchain</li>
  <li>koncepcja <em>bezpiecznej głowy</em> i <em>sfinalizowanych bloków</em></li>
</ul>

Aby uzyskać więcej informacji, zapoznaj się z tym wpisem na blogu autorstwa Tima Beiko <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/"> Wpływ połączenia na warstwę aplikacji Ethereum </a>.
</ExpandableCard>

## Połączenie i zużycie energii {#merge-and-energy}

Połączenie oznaczało koniec stosowania mechanizmu proof-of-work na platformie Ethereum i rozpoczęcie ery bardziej zrównoważonej ekologicznie Ethereum. Zużycie energii przez sieć Ethereum spadło o około 99,95%, dzięki czemu Ethereum stało się ekologiczną siecią blockchain. Dowiedz się więcej o [zużyciu energii przez Ethereum](/energy-consumption/).

## Połączenie i skalowanie {#merge-and-scaling}

Połączenie przygotowało również grunt pod dalsze uaktualnienia skalowalności, niemożliwe do wykonania w ramach proof-of-work, przybliżając Ethereum o krok do osiągnięcia pełnej skali, bezpieczeństwa i zrównoważonego rozwoju, do których dąży [plan rozwoju](/roadmap/).

## Błędne przekonania na temat Połączenia {#misconceptions}

<ExpandableCard
title="Błędne przekonanie: "Uruchomienie węzła wymaga stakowania 32 ETH.""
contentPreview="Fałsz." Każdy może zsynchronizować swoją własną, samodzielnie zweryfikowaną kopię Ethereum (tj. uruchomić węzeł). Nie jest wymagane żadne ETH – ani przed Połączeniem, ani po Połączeniu, nigdy.">

Są dwa typy węzłów Ethereum: węzły, które mogą proponować bloki, i węzły, które tego nie mogą.

Węzły proponujące bloki stanowią jedynie niewielką część wszystkich węzłów w sieci Ethereum. Kategoria ta obejmuje węzły wydobycia w ramach mechanizmu proof-of-work (PoW) oraz węzły walidatorów w ramach mechanizmu proof-of-stake (PoS). Ta kategoria wymaga zaangażowania zasobów ekonomicznych (takich jak moc obliczeniowa GPU w sieci proof-of-work lub stakowanych ETH w sieci proof-of-stake) w zamian za możliwość okazjonalnego proponowania następnego bloku i zdobywania nagród protokołu.

Pozostałe węzły w sieci (czyli większość) nie muszą angażować żadnych zasobów ekonomicznych poza komputerem klasy konsumenckiej z 1–2 TB dostępnej pamięci masowej i połączeniem internetowym. Węzły te nie proponują bloków, ale nadal pełnią kluczową rolę w zabezpieczaniu sieci, gdyż rozliczają wszystkich proponujących bloki, nasłuchując nowych bloków i weryfikując ich ważność po przybyciu zgodnie z zasadami konsensusu sieci. Jeśli blok jest ważny, węzeł nadal propaguje go przez sieć. Jeśli blok jest nieważny z jakiegokolwiek powodu, oprogramowanie węzła odrzuci go jako nieważny i zatrzyma jego propagację.

Uruchomienie węzła nieprodukującego bloków jest możliwe dla każdego w ramach dowolnego mechanizmu konsensusu (proof-of-work lub proof-of-stake); jest to <em>mocno zalecane</em> dla wszystkich użytkowników, jeśli mają na to środki. Prowadzenie węzła jest niezwykle cenne dla Ethereum i daje dodatkowe korzyści każdej osobie, która go prowadzi, jak choćby zwiększone bezpieczeństwo, prywatność i odporność na cenzurę.

Możliwość uruchomienia własnego węzła przez każdego jest <em> absolutnie niezbędna </em> do utrzymania decentralizacji sieci Ethereum.

[Więcej o uruchamianiu własnego węzła](/run-a-node/)
</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: "Połączenie nie zmniejszyło opłat za gaz.""
contentPreview="Fałsz." Połączenie było zmianą mechanizmu konsensusu, a nie rozszerzeniem pojemności sieci i nigdy nie miało na celu obniżenia opłat za gaz.">

Opłaty za gaz są wypadkową zapotrzebowania na sieć i jej przepustowości. W wyniku Połączenia zrezygnowano z mechanizmu proof-of-work, przechodząc na mechanizm konsensusu proof-of-stake, ale nie zmieniono znacząco żadnych parametrów, które bezpośrednio wpływają na przepustowość sieci.

Poprzez <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">plan rozwoju oparty na rollupach</a> starania skupiają się na skalowaniu aktywności użytkowników na [drugiej warstwie](/layer-2/), podczas gdy warstwa pierwsza sieci głównej Ethereum służyć ma jako bezpieczna zdecentralizowana warstwa rozliczeniowa zoptymalizowana pod kątem przechowywania danych rollupów w celu wykładniczego zmniejszenia kosztów transakcji na rollupach. Przejście na proof-of-stake jest kluczowym prekursorem realizacji tego celu. [Więcej o gazie i opłatach](/developers/docs/gas/)
</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: "Transakcje zostały znacznie przyspieszone przez Połączenie.""
contentPreview="Fałsz." Chociaż istnieją pewne niewielkie zmiany, szybkość transakcji w warstwie 1 jest obecnie w większości taka sama, jak przed Połączeniem.">
„Szybkość” transakcji można mierzyć na kilka sposobów, w tym czas dołączenia do bloku i czas do finalizacji. Oba te czasy uległy niewielkiej zmianie, ale nie w taki sposób, aby użytkownicy je zauważyli.

Historycznie, w przypadku mechanizmu proof-of-work, celem było generowanie nowego bloku co około 13,3 sekundy. W przypadku mechanizmu proof-of-stake sloty pojawiają się dokładnie co 12 sekund, a każdy z nich stanowi dla walidatora okazję do opublikowania bloku. Większość slotów ma bloki, ale nie wszystkie (np. walidator jest w trybie offline). W przypadku mechanizmu proof-of-stake bloki są produkowane około 10% częściej niż w przypadku mechanizmu proof-of-work. To była dość mało znacząca zmiana i raczej nie zostanie zauważona przez użytkowników.

Mechanizm proof-of-stake wprowadził nieistniejące wcześniej pojęcie nieodwołalności transakcji. W przypadku mechanizmu proof-of-work możliwość odwrócenia bloku staje się wykładniczo trudniejsza z każdym kolejnym blokiem wydobytym na podstawie transakcji, ale nigdy nie osiąga zera. W przypadku mechanizmu proof-of-stake bloki są łączone w epoki (6,4-minutowe odcinki czasu zawierające 32 szanse dla bloków), na które głosują walidatorzy. Gdy epoka się kończy, walidatorzy głosują, czy uznać ją za „uzasadnioną”. Jeśli walidatorzy zgodzą się na uzasadnienie epoki, zostanie ona sfinalizowana w następnej epoce. Cofnięcie sfinalizowanych transakcji jest ekonomicznie nieopłacalne, ponieważ wymagałoby uzyskania i spalenia ponad jednej trzeciej całego stakowanego ETH.
</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: "Połączenie umożliwiło wypłaty ze stakowania.""
contentPreview="Fałsz, ale wypłaty ze stakowania zostały od tego czasu włączone w ramach aktualizacji Shanghai/Capella.">

Początkowo po połączeniu stakerzy mogli uzyskać dostęp tylko do napiwków i MEV, które zostały zarobione w wyniku propozycji blokowych. Nagrody te są przekazywane na konto kontrolowane przez walidatora (zwanego <em>odbiorcą opłaty</em>) i są dostępne natychmiast. Nagrody te są niezależne od nagród wynikających z protokołu za wykonywanie obowiązków walidatora.

Od czasu aktualizacji sieci Shanghai/Capella stakerzy mogą wyznaczać <em>adres wypłaty</em>, aby zacząć otrzymywać automatyczne wypłaty nadwyżki salda stakingu (ETH powyżej 32 z nagród wynikających z protokołu). Ta aktualizacja umożliwiła również walidatorowi odblokowanie i odzyskanie całego salda po wyjściu z sieci.

[Więcej na temat wypłat ze stakingu](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard
title="Błędne przekonanie: "Teraz, gdy Połączenie jest zakończone, a wypłaty są włączone, wszyscy stakerzy mogliby wyjść na raz.""
contentPreview="Fałsz." Wyjścia walidatorów podlegają ograniczeniom ze względów bezpieczeństwa.">
Odkąd aktualizacja Shanghai/Capella umożliwiła wypłaty, walidatorzy są zachęcani do wypłacania salda stakingu powyżej 32 ETH, ponieważ środki te nie zwiększają zysku i są w przeciwnym razie zablokowane. W zależności od APR (ustalanej na podstawie całkowitej ilości stakowanych ETH) użytkownicy mogą być zachęcani do wyjścia z walidatorów w celu odzyskania całego salda lub zestakowania jeszcze więcej i wykorzystania nagród do uzyskania większego zysku.

Ważnym zastrzeżeniem jest to, że pełne wyjścia walidatora są ograniczone przez protokół i tylko kilka walidatorów może wyjść w jednej epoce (co 6,4 minuty). Limit ten zmienia się w zależności od liczby aktywnych walidatorów, ale wynosi około 0,33% wszystkich stakowanych ETH, które mogą zostać usunięte z sieci w ciągu jednego dnia.

Zapobiega to masowemu odpływowi stakowanych środków. Ponadto uniemożliwia to potencjalnemu atakującemu, który ma dostęp do dużej części wszystkich zestakowanych ETH, popełnienie przestępstwa podlegającego odcięciu i opuszczeniu/wypłaceniu wszystkich naruszających sald walidatora w tej samej epoce, zanim protokół będzie mógł wyegzekwować karę za odcięcie.

APR jest również celowo dynamiczny, umożliwiając rynkowi stakerów zrównoważenie zapłaty, jaką są skłonni uiścić za pomoc w zabezpieczeniu sieci. Jeśli wskaźnik jest zbyt niski, walidatory będą wychodzić z częstotliwością ograniczoną przez protokół. Stopniowo podniesie to APR dla wszystkich, którzy pozostaną, przyciągając nowych lub powracających stakerów.
</ExpandableCard>

## Co się stało z „Eth2”? {#eth2}

Termin „Eth2” został odrzucony. Po połączeniu „Eth1” i „Eth2” w jeden łańcuch nie trzeba już rozróżniać
dwóch sieci Ethereum — jest tylko jedna sieć Ethereum.

Aby ograniczyć zamieszanie, społeczność zaktualizowała te warunki:

- „Eth1” jest teraz „warstwą wykonania”, która obsługuje transakcje i wykonanie.
- „Eth2” jest teraz „warstwą konsensusu”, która obsługuje konsensus dowodu stawki (proof-of-stake).

Te zmiany w terminologii dotyczą tylko kwestii nazewnictwa; nie zmieniają się cele ani plan działania Ethereum.

[Dowiedz się więcej o zmianie nazwy „Eth2”](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Związek między aktualizacjami {#relationship-between-upgrades}

Wszystkie uaktualnienia Ethereum są w pewnym stopniu wzajemnie powiązane. Podsumujmy więc, jak Połączenie ma się do innych uaktualnień.

### Połączenie i Łańcuch śledzący {#merge-and-beacon-chain}

Połączenie reprezentuje formalne przyjęcie łańcucha śledzącego jako nowej warstwy konsensusu w stosunku do pierwotnej warstwy wykonania sieci głównej. Od czasu Połączenia walidatorzy są przypisywani do zabezpieczania sieci głównej Ethereum, a wydobywanie w oparciu o [proof-of-work](/developers/docs/consensus-mechanisms/pow/) nie jest już prawidłowym sposobem produkcji bloków.

Bloki są natomiast proponowane przez węzły walidujące, które stakują ETH w zamian za prawo do udziału w konsensusie. Te uaktualnienia stanowią podstawę dla przyszłych uaktualnień skalowalności, w tym shardingu.

<ButtonLink href="/roadmap/beacon-chain/">
  Łańcuch śledzący
</ButtonLink>

### Połączenie i aktualizacja Shanghai {#merge-and-shanghai}

W celu zapewnienia uproszczenia i maksymalnego skupienia się na udanym przejściu na proof-of-stake uaktualnienie Połączenie nie zawierało pewnych oczekiwanych funkcji, takich jak możliwość wypłaty stakowanych ETH. Funkcja ta została włączona oddzielnie wraz z aktualizacją Shanghai/Capella.

Ciekawscy mogą dowiedzieć się więcej o tym, [co dzieje się po Połączeniu](https://youtu.be/7ggwLccuN5s?t=101), z prezentacji Vitalika podczas wydarzenia ETHGlobal w kwietniu 2021 roku.

### Połączenie i sharding {#merge-and-data-sharding}

Pierwotnie planowano prace nad shardingiem przed Połączeniem, aby rozwiązać problem skalowalności. Jednak wraz z boomem na [rozwiązania skalujące warstwy 2](/layer-2/), priorytetem stała się najpierw zamiana proof-of-work na proof-of-stake.

Plany dotyczące shardingu szybko ewoluują, ale ze względu na rozwój i sukces technologii warstwy 2 do skalowania wykonania transakcji plany shardingu przesunęły się w kierunku znalezienia optymalnego sposobu rozłożenia ciężaru przechowywania skompresowanych calldata z kontraktów pakietów zbiorczych, co pozwala na wykładniczy wzrost przepustowości sieci. Nie byłoby to możliwe bez wcześniejszego przejścia na proof-of-stake.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Dalsza lektura {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
