---
title: Maksymalna wartość ekstrahowalna (MEV)
description: Wprowadzenie do maksymalnej możliwej do wyodrębnienia wartości ( MEV)
lang: pl
---

Maksymalna wartość ekstrakcji (MEV) odnosi się do maksymalnej wartości, którą można wydobyć z produkcji bloku ponad standardową nagrodę za blok i opłaty za gaz poprzez włączanie, wyłączanie i zmianę kolejności transakcji w bloku.

## Maksymalna wartość ekstrakcji {#maximal-extractable-value}

Maksymalna wartość ekstrakcji została po raz pierwszy zastosowana w kontekście [dowodu pracy](/developers/docs/consensus-mechanisms/pow/) i początkowo określano ją jako „wartość możliwa do wydobycia przez górnika”. Dzieje się tak, ponieważ w dowodzie pracy górnicy kontrolują włączanie, wyłączanie i porządkowanie transakcji. Jednak od czasu przejścia na dowód stawki poprzez [Połączenie](/roadmap/merge) za te role odpowiedzialni są walidatorzy, a wydobycie nie jest już częścią protokołu Ethereum. Metody ekstrakcji wartości nadal jednak istnieją, więc obecnie zamiast tego używa się terminu „maksymalna wartość ekstrakcji”.

## Wymagania wstępne {#prerequisites}

Upewnij się, że znasz [transakcje](/developers/docs/transactions/), [bloki](/developers/docs/blocks/), [dowód stawki](/developers/docs/consensus-mechanisms/pos) i [gaz](/developers/docs/gas/). Pomocna jest również znajomość [dapek](/apps/) i [DeFi](/defi/).

## Ekstrakcja MEV {#mev-extraction}

Teoretycznie MEV w całości przypada walidatorom, ponieważ są jedyną stroną, która może zagwarantować wykonanie dochodowej okazji MEV. W praktyce jednak duża część MEV jest wydobywana przez niezależnych uczestników sieci, zwanych „poszukiwaczami”. Poszukiwacze uruchamiają złożone algorytmy na danych blockchain w celu wykrycia dochodowych okazji MEV i posiadają boty do automatycznego przesyłania tych dochodowych transakcji do sieci.

Walidatorzy i tak otrzymują część pełnej kwoty MEV, ponieważ poszukiwacze są gotowi płacić wysokie opłaty za gaz (które trafiają do walidatora) w zamian za większe prawdopodobieństwo włączenia ich dochodowych transakcji do bloku. Zakładając, że poszukiwacze są racjonalni ekonomicznie, opłata za gaz, którą poszukiwacz jest skłonny zapłacić, będzie kwotą do 100% MEV poszukiwacza (ponieważ gdyby opłata za gaz była wyższa, poszukiwacz straciłby pieniądze).

W związku z tym, w przypadku niektórych wysoce konkurencyjnych okazji MEV, takich jak [arbitraż DEX](#mev-examples-dex-arbitrage), poszukiwacze mogą być zmuszeni do zapłacenia 90% lub nawet więcej swoich całkowitych przychodów z MEV w postaci opłat za gaz na rzecz walidatora, ponieważ tak wiele osób chce przeprowadzić tę samą dochodową transakcję arbitrażową. Dzieje się tak, ponieważ jedynym sposobem na zagwarantowanie, że ich transakcja arbitrażowa zostanie wykonana, jest przesłanie transakcji z najwyższą ceną gazu.

### Gas golfing {#mev-extraction-gas-golfing}

Ta dynamika sprawiła, że bycie dobrym w „gas golfing” – czyli programowaniu transakcji tak, aby zużywały jak najmniej gazu – stało się przewagą konkurencyjną, ponieważ pozwala poszukiwaczom ustawić wyższą cenę gazu przy jednoczesnym utrzymaniu stałych całkowitych opłat za gaz (ponieważ opłaty za gaz = cena gazu \* zużyty gaz).

Kilka dobrze znanych technik „gas golfing” to: używanie adresów, które zaczynają się od długiego ciągu zer (np. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), ponieważ zajmują mniej miejsca (a więc i gazu) do przechowywania; oraz pozostawianie niewielkich sald tokenów [ERC-20](/developers/docs/standards/tokens/erc-20/) w kontraktach, ponieważ więcej gazu kosztuje zainicjowanie slotu pamięci (w przypadku gdy saldo wynosi 0) niż zaktualizowanie go. Znajdowanie kolejnych technik zmniejszania zużycia gazu jest aktywnym obszarem badań wśród poszukiwaczy.

### Uogólnieni frontrunnerzy {#mev-extraction-generalized-frontrunners}

Zamiast programować złożone algorytmy do wykrywania dochodowych okazji MEV, niektórzy poszukiwacze uruchamiają uogólnionych frontrunnerów. Uogólnieni frontrunnerzy to boty, które obserwują mempool w celu wykrywania dochodowych transakcji. Frontrunner skopiuje kod potencjalnie dochodowej transakcji, zastąpi adresy adresem frontrunnera i uruchomi transakcję lokalnie, aby sprawdzić, czy zmodyfikowana transakcja przyniesie zysk na adres frontrunnera. Jeśli transakcja jest rzeczywiście dochodowa, frontrunner prześle zmodyfikowaną transakcję z zastąpionym adresem i wyższą ceną gazu, „wyprzedzając” pierwotną transakcję i uzyskując MEV pierwotnego poszukiwacza.

### Flashbots {#mev-extraction-flashbots}

Flashbots to niezależny projekt, który rozszerza klientów wykonawczych o usługę pozwalającą poszukiwaczom na przesyłanie transakcji MEV do walidatorów bez ujawniania ich w publicznym mempool. Zapobiega to wyprzedzaniu transakcji przez uogólnionych frontrunnerów.

## Przykłady MEV {#mev-examples}

MEV pojawia się w blockchain na kilka sposobów.

### Arbitraż na giełdach DEX {#mev-examples-dex-arbitrage}

Arbitraż na [zdecentralizowanych giełdach](/glossary/#dex) (DEX) jest najprostszą i najbardziej znaną okazją do uzyskania MEV. W rezultacie jest to również najbardziej konkurencyjna metoda.

Działa to w następujący sposób: jeśli dwie giełdy DEX oferują token po dwóch różnych cenach, ktoś może kupić token na giełdzie DEX o niższej cenie i sprzedać go na giełdzie DEX o wyższej cenie w ramach jednej, atomowej transakcji. Dzięki mechanice blockchaina jest to prawdziwy, pozbawiony ryzyka arbitraż.

[Oto przykład](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) dochodowej transakcji arbitrażowej, w której poszukiwacz zamienił 1000 ETH na 1045 ETH, wykorzystując różne ceny pary ETH/DAI na Uniswap i Sushiswap.

### Likwidacje {#mev-examples-liquidations}

Likwidacje w protokołach pożyczkowych stanowią kolejną dobrze znaną okazję do uzyskania MEV.

Protokoły pożyczkowe, takie jak Maker i Aave, wymagają od użytkowników zdeponowania pewnego zabezpieczenia (np. ETH). To zdeponowane zabezpieczenie jest następnie wykorzystywane do udzielania pożyczek innym użytkownikom.

Użytkownicy mogą następnie pożyczać aktywa i tokeny od innych w zależności od tego, czego potrzebują (np. możesz pożyczyć MKR, jeśli chcesz głosować w propozycji zarządzania MakerDAO) do określonego procentu zdeponowanego zabezpieczenia. Na przykład, jeśli kwota pożyczki wynosi maksymalnie 30%, użytkownik, który wpłaci do protokołu 100 DAI, może pożyczyć do 30 DAI w innym aktywie. Protokół określa dokładny procent zdolności pożyczkowej.

Wraz ze zmianą wartości zabezpieczenia pożyczkobiorcy, zmienia się również jego zdolność pożyczkowa. Jeśli z powodu wahań rynkowych wartość pożyczonych aktywów przekroczy, powiedzmy, 30% wartości ich zabezpieczenia (ponownie, dokładny procent jest określony przez protokół), protokół zazwyczaj pozwala każdemu na zlikwidowanie zabezpieczenia, natychmiast spłacając pożyczkodawców (jest to podobne do tego, jak działają [wezwania do uzupełnienia depozytu](https://www.investopedia.com/terms/m/margincall.asp) w tradycyjnych finansach). W przypadku likwidacji pożyczkobiorca musi zazwyczaj zapłacić wysoką opłatę likwidacyjną, której część trafia do likwidatora – i tu właśnie pojawia się okazja MEV.

Poszukiwacze konkurują w jak najszybszym parsowaniu danych blockchain, aby ustalić, którzy pożyczkobiorcy mogą zostać zlikwidowani, i jako pierwsi przesłać transakcję likwidacyjną i pobrać opłatę likwidacyjną dla siebie.

### Handel kanapkowy {#mev-examples-sandwich-trading}

Handel kanapkowy to kolejna popularna metoda ekstrakcji MEV.

Aby przeprowadzić atak kanapkowy, poszukiwacz obserwuje mempool w poszukiwaniu dużych transakcji na giełdach DEX. Załóżmy na przykład, że ktoś chce kupić 10 000 UNI za DAI na Uniswap. Transakcja tej wielkości będzie miała znaczący wpływ na parę UNI/DAI, potencjalnie znacznie podnosząc cenę UNI w stosunku do DAI.

Poszukiwacz może obliczyć przybliżony wpływ cenowy tej dużej transakcji na parę UNI/DAI i wykonać optymalne zlecenie kupna natychmiast _przed_ dużą transakcją, kupując UNI tanio, a następnie wykonać zlecenie sprzedaży natychmiast _po_ dużej transakcji, sprzedając je po wyższej cenie spowodowanej dużym zleceniem.

Atak kanapkowy jest jednak bardziej ryzykowny, ponieważ nie jest atomowy (w przeciwieństwie do arbitrażu DEX, jak opisano powyżej) i jest podatny na [atak salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV w NFT {#mev-examples-nfts}

MEV w przestrzeni NFT jest zjawiskiem nowym i niekoniecznie dochodowym.

Ponieważ jednak transakcje NFT odbywają się na tym samym blockchainie, który jest współdzielony przez wszystkie inne transakcje Ethereum, poszukiwacze mogą również stosować podobne techniki do tych używanych w tradycyjnych okazjach MEV na rynku NFT.

Na przykład, jeśli odbywa się popularny drop NFT, a poszukiwacz chce zdobyć określony NFT lub zestaw NFT, może zaprogramować transakcję tak, aby być pierwszym w kolejce do zakupu NFT, lub może kupić cały zestaw NFT w jednej transakcji. Lub jeśli NFT zostanie [omyłkowo wystawiony po niskiej cenie](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), poszukiwacz może wyprzedzić innych nabywców i zgarnąć go tanio.

Jeden z głośnych przykładów MEV w NFT miał miejsce, gdy poszukiwacz wydał 7 milionów dolarów, aby [kupić](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) każdego Cryptopunka po cenie minimalnej. Badacz blockchain [wyjaśnił na Twitterze](https://twitter.com/IvanBogatyy/status/1422232184493121538), w jaki sposób nabywca współpracował z dostawcą MEV, aby utrzymać swój zakup w tajemnicy.

### Długi ogon {#mev-examples-long-tail}

Arbitraż na giełdach DEX, likwidacje i handel kanapkowy to bardzo dobrze znane okazje MEV, które prawdopodobnie nie będą dochodowe dla nowych poszukiwaczy. Istnieje jednak długi ogon mniej znanych okazji MEV (MEV w NFT jest prawdopodobnie jedną z takich okazji).

Poszukiwacze, którzy dopiero zaczynają, mogą odnieść większy sukces, szukając MEV w tym dłuższym ogonie. [Tablica ofert pracy MEV](https://github.com/flashbots/mev-job-board) od Flashbots wymienia niektóre z pojawiających się możliwości.

## Skutki MEV {#effects-of-mev}

MEV nie jest do końca złe — istnieją zarówno pozytywne, jak i negatywne konsekwencje MEV w Ethereum.

### Zalety {#effects-of-mev-the-good}

Wiele projektów DeFi opiera się na racjonalnych ekonomicznie podmiotach w celu zapewnienia użyteczności i stabilności swoich protokołów. Na przykład arbitraż na giełdach DEX zapewnia użytkownikom najlepsze, najbardziej prawidłowe ceny ich tokenów, a protokoły pożyczkowe polegają na szybkich likwidacjach, gdy pożyczkobiorcy spadają poniżej wskaźników zabezpieczenia, aby zapewnić spłatę pożyczkodawców.

Bez racjonalnych poszukiwaczy, którzy wyszukują i naprawiają nieefektywności ekonomiczne oraz wykorzystują bodźce ekonomiczne protokołów, protokoły DeFi i ogólnie dapki mogłyby nie być tak solidne, jak są dzisiaj.

### Wady {#effects-of-mev-the-bad}

Na warstwie aplikacji niektóre formy MEV, takie jak handel kanapkowy, skutkują jednoznacznie gorszym doświadczeniem dla użytkowników. Użytkownicy, którzy padli ofiarą ataku kanapkowego, doświadczają zwiększonego poślizgu i gorszej realizacji swoich transakcji.

Na warstwie sieciowej uogólnieni frontrunnerzy i aukcje cen gazu, w których często uczestniczą (gdy dwóch lub więcej frontrunnerów konkuruje o włączenie ich transakcji do następnego bloku, stopniowo podnosząc cenę gazu dla własnych transakcji), powodują przeciążenie sieci i wysokie ceny gazu dla wszystkich innych próbujących przeprowadzić zwykłe transakcje.

Oprócz tego, co dzieje się _wewnątrz_ bloków, MEV może mieć szkodliwe skutki _pomiędzy_ blokami. Jeśli MEV dostępna w bloku znacznie przekracza standardową nagrodę za blok, walidatorzy mogą być zachęcani do reorganizacji bloków i przejęcia MEV dla siebie, powodując reorganizację blockchaina i niestabilność konsensusu.

Ta możliwość reorganizacji blockchaina została [wcześniej zbadana na blockchainie Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). W miarę jak nagroda za blok Bitcoina zmniejsza się o połowę, a opłaty transakcyjne stanowią coraz większą część nagrody za blok, pojawiają się sytuacje, w których dla górników staje się racjonalne ekonomicznie zrezygnowanie z nagrody za następny blok i ponowne wydobycie poprzednich bloków z wyższymi opłatami. Wraz z rozwojem MEV podobna sytuacja może wystąpić w Ethereum, zagrażając integralności blockchaina.

## Stan MEV {#state-of-mev}

Ekstrakcja MEV gwałtownie wzrosła na początku 2021 roku, co spowodowało niezwykle wysokie ceny gazu w pierwszych miesiącach roku. Pojawienie się przekaźnika MEV Flashbots zmniejszyło skuteczność uogólnionych frontrunnerów i przeniosło aukcje cen gazu poza łańcuch, obniżając ceny gazu dla zwykłych użytkowników.

Chociaż wielu poszukiwaczy wciąż zarabia dobre pieniądze na MEV, w miarę jak możliwości stają się coraz bardziej znane i coraz więcej poszukiwaczy konkuruje o te same okazje, walidatorzy będą przejmować coraz większą część całkowitych przychodów z MEV (ponieważ tego samego rodzaju aukcje gazowe, co pierwotnie opisano powyżej, również występują w Flashbots, aczkolwiek prywatnie, a walidatorzy przejmą wynikające z nich przychody z gazu). MEV nie jest również unikalne dla Ethereum, a w miarę jak możliwości stają się bardziej konkurencyjne w Ethereum, poszukiwacze przenoszą się na alternatywne blockchainy, takie jak Binance Smart Chain, gdzie istnieją podobne możliwości MEV jak w Ethereum, ale z mniejszą konkurencją.

Z drugiej strony, przejście z dowodu pracy na dowód stawki i trwające wysiłki w celu skalowania Ethereum za pomocą rollupów zmieniają krajobraz MEV w sposób, który wciąż jest nieco niejasny. Nie jest jeszcze dobrze wiadomo, jak posiadanie gwarantowanych proposerów bloków, znanych z niewielkim wyprzedzeniem, zmienia dynamikę ekstrakcji MEV w porównaniu z probabilistycznym modelem w dowodzie pracy, ani jak zostanie to zakłócone, gdy wdrożone zostaną [wybory jednego tajnego lidera](https://ethresear.ch/t/secret-non-single-leader-election/11789) i [technologia rozproszonych walidatorów](/staking/dvt/). Podobnie, dopiero okaże się, jakie możliwości MEV istnieją, gdy większość aktywności użytkowników zostanie przeniesiona z Ethereum na jego rollupy warstwy 2 i shardy.

## MEV w Ethereum z dowodem stawki (PoS) {#mev-in-ethereum-proof-of-stake}

Jak wyjaśniono, MEV ma negatywne konsekwencje dla ogólnego doświadczenia użytkownika i bezpieczeństwa warstwy konsensusu. Ale przejście Ethereum na konsensus dowodu stawki (nazwane „Połączenie”) potencjalnie wprowadza nowe ryzyka związane z MEV:

### Centralizacja walidatorów {#validator-centralization}

W Ethereum po Połączeniu walidatorzy (którzy wnieśli depozyty zabezpieczające w wysokości 32 ETH) osiągają konsensus co do ważności bloków dodawanych do Beacon Chain. Ponieważ 32 ETH mogą być poza zasięgiem wielu, [dołączenie do puli stakingu](/staking/pools/) może być bardziej wykonalną opcją. Niemniej jednak, zdrowy rozkład [stakerów indywidualnych](/staking/solo/) jest idealny, ponieważ łagodzi centralizację walidatorów i poprawia bezpieczeństwo Ethereum.

Uważa się jednak, że ekstrakcja MEV jest w stanie przyspieszyć centralizację walidatorów. Jest to częściowo spowodowane tym, że ponieważ walidatorzy [zarabiają mniej za proponowanie bloków](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) niż wcześniej górnicy, ekstrakcja MEV znacznie [wpłynęła na zarobki walidatorów](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) od czasu [Połączenia](/roadmap/merge/).

Większe pule stakingu prawdopodobnie będą miały więcej zasobów do inwestowania w niezbędne optymalizacje w celu przechwytywania możliwości MEV. Im więcej MEV te pule wydobędą, tym więcej zasobów będą miały na ulepszenie swoich możliwości ekstrakcji MEV (i zwiększenie ogólnych przychodów), zasadniczo tworząc [korzyści skali](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Z mniejszymi zasobami do dyspozycji, stakerzy indywidualni mogą nie być w stanie czerpać zysków z możliwości MEV. Może to zwiększyć presję na niezależnych walidatorów, aby dołączali do potężnych pul stakingu w celu zwiększenia swoich zarobków, zmniejszając decentralizację w Ethereum.

### Mempool z uprawnieniami {#permissioned-mempools}

W odpowiedzi na ataki kanapkowe i frontrunning, handlowcy mogą zacząć zawierać umowy pozałańcuchowe z walidatorami w celu zapewnienia prywatności transakcji. Zamiast wysyłać potencjalną transakcję MEV do publicznego mempool, handlowiec wysyła ją bezpośrednio do walidatora, który włącza ją do bloku i dzieli się zyskiem z handlowcem.

„Ciemne pule” są większą wersją tego układu i funkcjonują jako mempoole z uprawnieniami, dostępne tylko dla użytkowników gotowych zapłacić określone opłaty. Ten trend zmniejszyłby brak konieczności posiadania uprawnień i zaufania w Ethereum i potencjalnie przekształciłby blockchain w mechanizm „pay-to-play”, który faworyzuje najwyższego licytanta.

Mempool z uprawnieniami przyspieszyłby również ryzyko centralizacji opisane w poprzedniej sekcji. Duże pule obsługujące wielu walidatorów prawdopodobnie skorzystają na oferowaniu prywatności transakcji handlowcom i użytkownikom, zwiększając swoje przychody z MEV.

Zwalczanie tych problemów związanych z MEV w Ethereum po Połączeniu jest kluczowym obszarem badań. Do tej pory dwoma rozwiązaniami zaproponowanymi w celu zmniejszenia negatywnego wpływu MEV na decentralizację i bezpieczeństwo Ethereum po Połączeniu są [**Separacja Proposera-Buildera (PBS)**](/roadmap/pbs/) i [**Builder API**](https://github.com/ethereum/builder-specs).

### Separacja Proposera-Buildera {#proposer-builder-separation}

Zarówno w dowodzie pracy, jak i w dowodzie stawki, węzeł, który buduje blok, proponuje go do dodania do łańcucha innym węzłom uczestniczącym w konsensusie. Nowy blok staje się częścią kanonicznego łańcucha, gdy inny górnik zbuduje na nim kolejny blok (w PoW) lub otrzyma poświadczenia od większości walidatorów (w PoS).

Połączenie ról producenta bloków i proposera bloków jest tym, co wprowadza większość problemów związanych z MEV, które zostały opisane wcześniej. Na przykład węzły konsensusu są zachęcane do wywoływania reorganizacji łańcucha w [atakach typu time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack), aby zmaksymalizować zyski z MEV.

[Separacja proposera-buildera](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) ma na celu złagodzenie wpływu MEV, zwłaszcza na warstwie konsensusu. Główną cechą PBS jest rozdzielenie zasad producenta bloków i proposera bloków. Walidatorzy nadal są odpowiedzialni za proponowanie i głosowanie nad blokami, ale nowa klasa wyspecjalizowanych podmiotów, zwanych **builderami bloków**, ma za zadanie porządkowanie transakcji i budowanie bloków.

W ramach PBS builder bloków tworzy pakiet transakcji i składa ofertę na jego włączenie do bloku Beacon Chain (jako „ładunek wykonawczy”). Walidator wybrany do zaproponowania następnego bloku następnie sprawdza różne oferty i wybiera pakiet z najwyższą opłatą. PBS zasadniczo tworzy rynek aukcyjny, na którym builderzy negocjują z walidatorami sprzedającymi przestrzeń w bloku.

Obecne projekty PBS wykorzystują [schemat commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), w którym builderzy publikują jedynie kryptograficzne zobowiązanie do zawartości bloku (nagłówek bloku) wraz ze swoimi ofertami. Po zaakceptowaniu zwycięskiej oferty, proposer tworzy podpisaną propozycję bloku, która zawiera nagłówek bloku. Oczekuje się, że builder bloków opublikuje pełną treść bloku po zobaczeniu podpisanej propozycji bloku, a także musi otrzymać wystarczającą liczbę [poświadczeń](/glossary/#attestation) od walidatorów, zanim zostanie sfinalizowany.

#### Jak separacja proposera-buildera łagodzi wpływ MEV? {#how-does-pbs-curb-mev-impact}

Separacja proposera-buildera w protokole zmniejsza wpływ MEV na konsensus poprzez usunięcie ekstrakcji MEV z zakresu obowiązków walidatorów. Zamiast tego, builderzy bloków, którzy uruchamiają wyspecjalizowany sprzęt, będą odtąd wykorzystywać możliwości MEV.

Nie wyklucza to jednak całkowicie walidatorów z dochodów związanych z MEV, ponieważ builderzy muszą licytować wysoko, aby ich bloki zostały zaakceptowane przez walidatorów. Niemniej jednak, gdy walidatorzy nie są już bezpośrednio skoncentrowani na optymalizacji dochodów z MEV, zagrożenie atakami typu time-bandit maleje.

Separacja proposera-buildera zmniejsza również ryzyko centralizacji MEV. Na przykład, użycie schematu commit-reveal usuwa potrzebę, aby builderzy ufali walidatorom, że nie ukradną możliwości MEV ani nie ujawnią jej innym builderom. Obniża to barierę dla indywidualnych stakerów, aby mogli czerpać korzyści z MEV, w przeciwnym razie builderzy skłanialiby się ku faworyzowaniu dużych pul z reputacją poza łańcuchem i zawieraniu z nimi umów poza łańcuchem.

Podobnie walidatorzy nie muszą ufać builderom, że nie wstrzymają treści bloków ani nie opublikują nieprawidłowych bloków, ponieważ płatność jest bezwarunkowa. Opłata walidatora jest nadal przetwarzana, nawet jeśli proponowany blok jest niedostępny lub uznany za nieważny przez innych walidatorów. W tym drugim przypadku blok jest po prostu odrzucany, co zmusza buildera bloków do utraty wszystkich opłat transakcyjnych i przychodów z MEV.

### Builder API {#builder-api}

Chociaż separacja proposera-buildera obiecuje zmniejszyć skutki ekstrakcji MEV, jej wdrożenie wymaga zmian w protokole konsensusu. W szczególności reguła [wyboru forka](/developers/docs/consensus-mechanisms/pos/#fork-choice) na Beacon Chain musiałaby zostać zaktualizowana. [Builder API](https://github.com/ethereum/builder-specs) jest tymczasowym rozwiązaniem mającym na celu zapewnienie działającej implementacji separacji proposera-buildera, aczkolwiek z większymi założeniami dotyczącymi zaufania.

Builder API jest zmodyfikowaną wersją [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) używaną przez klientów warstwy konsensusu do żądania ładunków wykonawczych od klientów warstwy wykonawczej. Jak określono w [specyfikacji uczciwego walidatora](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), walidatorzy wybrani do obowiązków proponowania bloków żądają pakietu transakcji od podłączonego klienta wykonawczego, który włączają do proponowanego bloku Beacon Chain.

Builder API działa również jako oprogramowanie pośredniczące między walidatorami a klientami warstwy wykonawczej; ale jest inne, ponieważ pozwala walidatorom na Beacon Chain pozyskiwać bloki od zewnętrznych podmiotów (zamiast budować blok lokalnie za pomocą klienta wykonawczego).

Poniżej znajduje się przegląd działania Builder API:

1. Builder API łączy walidatora z siecią builderów bloków, którzy uruchamiają klientów warstwy wykonawczej. Podobnie jak w PBS, builderzy są wyspecjalizowanymi stronami, które inwestują w zasobochłonne budowanie bloków i stosują różne strategie w celu maksymalizacji dochodów z MEV i napiwków priorytetowych.

2. Walidator (uruchamiający klienta warstwy konsensusu) żąda ładunków wykonawczych wraz z ofertami od sieci builderów. Oferty od builderów będą zawierać nagłówek ładunku wykonawczego — kryptograficzne zobowiązanie do zawartości ładunku — oraz opłatę do zapłacenia walidatorowi.

3. Walidator przegląda przychodzące oferty i wybiera ładunek wykonawczy z najwyższą opłatą. Korzystając z Builder API, walidator tworzy „zaślepioną” propozycję bloku Beacon, która zawiera tylko jego podpis i nagłówek ładunku wykonawczego, i wysyła ją do buildera.

4. Oczekuje się, że builder uruchamiający Builder API odpowie pełnym ładunkiem wykonawczym po zobaczeniu zaślepionej propozycji bloku. Pozwala to walidatorowi na stworzenie „podpisanego” bloku Beacon, który propaguje w całej sieci.

5. Oczekuje się, że walidator korzystający z Builder API nadal będzie budował blok lokalnie w przypadku, gdy builder bloków nie odpowie w odpowiednim czasie, aby nie przegapić nagród za propozycję bloku. Jednak walidator nie może stworzyć kolejnego bloku, używając ani teraz ujawnionych transakcji, ani innego zestawu, ponieważ byłoby to równoznaczne z _dwuznacznością_ (podpisaniem dwóch bloków w tym samym slocie), co jest wykroczeniem podlegającym slashingowi.

Przykładem implementacji Builder API jest [MEV Boost](https://github.com/flashbots/mev-boost), ulepszenie [mechanizmu aukcji Flashbots](https://docs.flashbots.net/Flashbots-auction/overview) zaprojektowane w celu ograniczenia negatywnych efektów zewnętrznych MEV w Ethereum. Aukcja Flashbots pozwala walidatorom w systemie dowodu stawki zlecać pracę budowania dochodowych bloków wyspecjalizowanym stronom zwanym **poszukiwaczami**.
![Diagram szczegółowo pokazujący przepływ MEV](./mev.png)

Poszukiwacze szukają lukratywnych okazji MEV i wysyłają pakiety transakcji do proposerów bloków wraz z [ofertą w zamkniętej kopercie](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) w celu włączenia do bloku. Walidator uruchamiający mev-geth, sforkowaną wersję klienta go-ethereum (Geth), musi tylko wybrać pakiet z największym zyskiem i włączyć go jako część nowego bloku. Aby chronić proposerów bloków (walidatorów) przed spamem i nieprawidłowymi transakcjami, pakiety transakcji przechodzą przez **przekaźniki** w celu walidacji, zanim dotrą do proposera.

MEV Boost zachowuje te same zasady działania co oryginalna aukcja Flashbots, aczkolwiek z nowymi funkcjami zaprojektowanymi na potrzeby przejścia Ethereum na dowód stawki. Poszukiwacze wciąż znajdują dochodowe transakcje MEV do włączenia do bloków, ale nowa klasa wyspecjalizowanych stron, zwanych **builderami**, jest odpowiedzialna za agregowanie transakcji i pakietów w bloki. Builder akceptuje oferty w zamkniętych kopertach od poszukiwaczy i przeprowadza optymalizacje, aby znaleźć najbardziej dochodową kolejność.

Przekaźnik jest nadal odpowiedzialny za walidację pakietów transakcji przed przekazaniem ich do proposera. Jednak MEV Boost wprowadza **depozyty** odpowiedzialne za zapewnienie [dostępności danych](/developers/docs/data-availability/) poprzez przechowywanie treści bloków wysyłanych przez builderów i nagłówków bloków wysyłanych przez walidatorów. Tutaj walidator podłączony do przekaźnika prosi o dostępne ładunki wykonawcze i używa algorytmu porządkowania MEV Boost, aby wybrać nagłówek ładunku z najwyższą ofertą i napiwkami MEV.

#### Jak Builder API łagodzi wpływ MEV? {#how-does-builder-api-curb-mev-impact}

Podstawową zaletą Builder API jest jego potencjał do demokratyzacji dostępu do możliwości MEV. Używanie schematów commit-reveal eliminuje założenia dotyczące zaufania i zmniejsza bariery wejścia dla walidatorów pragnących czerpać korzyści z MEV. Powinno to zmniejszyć presję na indywidualnych stakerów, aby integrowali się z dużymi pulami stakingu w celu zwiększenia zysków z MEV.

Szerokie wdrożenie Builder API zachęci do większej konkurencji wśród builderów bloków, co zwiększa odporność na cenzurę. Ponieważ walidatorzy przeglądają oferty od wielu builderów, builder zamierzający cenzurować jedną lub więcej transakcji użytkownika musi przebić wszystkich innych niecenzurujących builderów, aby odnieść sukces. To znacznie zwiększa koszt cenzurowania użytkowników i zniechęca do tej praktyki.

Niektóre projekty, takie jak MEV Boost, używają Builder API jako części ogólnej struktury zaprojektowanej w celu zapewnienia prywatności transakcji niektórym stronom, takim jak handlowcy próbujący uniknąć ataków typu frontrunning/sandwiching. Osiąga się to poprzez zapewnienie prywatnego kanału komunikacji między użytkownikami a builderami bloków. W przeciwieństwie do opisanych wcześniej mempooli z uprawnieniami, to podejście jest korzystne z następujących powodów:

1. Istnienie wielu builderów na rynku sprawia, że cenzurowanie jest niepraktyczne, co przynosi korzyści użytkownikom. W przeciwieństwie do tego, istnienie scentralizowanych i opartych na zaufaniu ciemnych pul skoncentrowałoby władzę w rękach kilku builderów bloków i zwiększyło możliwość cenzury.

2. Oprogramowanie Builder API jest oprogramowaniem open-source, co pozwala każdemu oferować usługi budowania bloków. Oznacza to, że użytkownicy nie są zmuszeni do korzystania z żadnego konkretnego buildera bloków i poprawia neutralność i brak konieczności posiadania uprawnień w Ethereum. Co więcej, handlowcy szukający MEV nie będą nieumyślnie przyczyniać się do centralizacji, korzystając z prywatnych kanałów transakcyjnych.

## Powiązane zasoby {#related-resources}

- [Dokumentacja Flashbots](https://docs.flashbots.net/)
- [Flashbots na GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) – _Tracker ze statystykami w czasie rzeczywistym dla przekaźników MEV-Boost i builderów bloków_

## Dalsza lektura {#further-reading}

- [Czym jest wartość możliwa do wydobycia przez górnika (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV i ja](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum to mroczny las](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Ucieczka z mrocznego lasu](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Wyprzedzanie kryzysu MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Wątki MEV @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Architektura Flashbots gotowa na Połączenie](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [Czym jest MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Dlaczego warto uruchomić mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Autostopem przez Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
