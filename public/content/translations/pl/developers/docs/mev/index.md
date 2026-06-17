---
title: "Maksymalna wartość do wyodrębnienia (MEV)"
description: "Wprowadzenie do maksymalnej wartości do wyodrębnienia (MEV)"
lang: pl
---

Maksymalna wartość do wyodrębnienia (MEV) odnosi się do maksymalnej wartości, jaką można wyodrębnić z produkcji bloku ponad standardową nagrodę za blok i opłaty za gaz poprzez włączanie, wykluczanie i zmianę kolejności transakcji w bloku.

## Maksymalna wartość do wyodrębnienia {#maximal-extractable-value}

Maksymalna wartość do wyodrębnienia została po raz pierwszy zastosowana w kontekście [dowodu pracy (PoW)](/developers/docs/consensus-mechanisms/pow/) i początkowo była określana jako „wartość do wyodrębnienia przez górnika” (ang. miner extractable value). Wynika to z faktu, że w dowodzie pracy górnicy kontrolują włączanie, wykluczanie i kolejność transakcji. Jednak od czasu przejścia na dowód stawki (PoS) poprzez [The Merge](/roadmap/merge), za te role odpowiedzialni są walidatorzy, a kopanie nie jest już częścią protokołu [Ethereum](/). Metody wyodrębniania wartości jednak nadal istnieją, dlatego obecnie używa się terminu „Maksymalna wartość do wyodrębnienia”.

## Wymagania wstępne {#prerequisites}

Upewnij się, że znasz pojęcia [transakcji](/developers/docs/transactions/), [bloków](/developers/docs/blocks/), [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos) i [gazu](/developers/docs/gas/). Przydatna będzie również znajomość [zdecentralizowanych aplikacji (dapp)](/apps/) oraz [zdecentralizowanych finansów (DeFi)](/defi/).

## Wyodrębnianie MEV {#mev-extraction}

W teorii MEV przypada w całości walidatorom, ponieważ są oni jedyną stroną, która może zagwarantować realizację zyskownej okazji MEV. W praktyce jednak duża część MEV jest wyodrębniana przez niezależnych uczestników sieci określanych jako „poszukiwacze”. Poszukiwacze uruchamiają złożone algorytmy na danych blockchaina, aby wykryć zyskowne okazje MEV, i posiadają boty, które automatycznie przesyłają te zyskowne transakcje do sieci.

Walidatorzy i tak otrzymują część pełnej kwoty MEV, ponieważ poszukiwacze są skłonni płacić wysokie opłaty za gaz (które trafiają do walidatora) w zamian za większe prawdopodobieństwo włączenia ich zyskownych transakcji do bloku. Zakładając, że poszukiwacze postępują racjonalnie pod względem ekonomicznym, opłata za gaz, którą poszukiwacz jest skłonny zapłacić, wyniesie do 100% jego MEV (ponieważ gdyby opłata za gaz była wyższa, poszukiwacz straciłby pieniądze).

W związku z tym, w przypadku niektórych wysoce konkurencyjnych okazji MEV, takich jak [arbitraż na DEX](#mev-examples-dex-arbitrage), poszukiwacze mogą musieć zapłacić 90% lub nawet więcej swoich całkowitych przychodów z MEV w postaci opłat za gaz dla walidatora, ponieważ tak wiele osób chce przeprowadzić tę samą zyskowną transakcję arbitrażową. Wynika to z faktu, że jedynym sposobem na zagwarantowanie realizacji ich transakcji arbitrażowej jest przesłanie jej z najwyższą ceną gazu.

### Optymalizacja gazu (Gas golfing) {#mev-extraction-gas-golfing}

Ta dynamika sprawiła, że bycie dobrym w „optymalizacji gazu” (ang. gas golfing) — programowaniu transakcji tak, aby zużywały jak najmniej gazu — stało się przewagą konkurencyjną, ponieważ pozwala poszukiwaczom na ustalenie wyższej ceny gazu przy jednoczesnym utrzymaniu całkowitych opłat za gaz na stałym poziomie (ponieważ opłaty za gaz = cena gazu \* zużyty gaz).

Kilka dobrze znanych technik optymalizacji gazu obejmuje: używanie adresów zaczynających się od długiego ciągu zer (np. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), ponieważ zajmują one mniej miejsca (a tym samym gazu) do przechowywania; oraz pozostawianie niewielkich sald tokenów [ERC-20](/developers/docs/standards/tokens/erc-20/) w kontraktach, ponieważ zainicjowanie slotu pamięci (co ma miejsce, gdy saldo wynosi 0) kosztuje więcej gazu niż jego aktualizacja. Znajdowanie kolejnych technik zmniejszania zużycia gazu jest aktywnym obszarem badań wśród poszukiwaczy.

### Uogólnione boty wyprzedzające (Generalized frontrunners) {#mev-extraction-generalized-frontrunners}

Zamiast programować złożone algorytmy do wykrywania zyskownych okazji MEV, niektórzy poszukiwacze uruchamiają uogólnione boty wyprzedzające (ang. generalized frontrunners). Są to boty, które obserwują mempool w celu wykrycia zyskownych transakcji. Bot wyprzedzający kopiuje kod potencjalnie zyskownej transakcji, zastępuje adresy swoim własnym adresem i uruchamia transakcję lokalnie, aby upewnić się, że zmodyfikowana transakcja przyniesie zysk na jego adres. Jeśli transakcja jest rzeczywiście zyskowna, bot prześle zmodyfikowaną transakcję z podmienionym adresem i wyższą ceną gazu, „wyprzedzając” oryginalną transakcję i przejmując MEV pierwotnego poszukiwacza.

### Flashbots {#mev-extraction-flashbots}

Flashbots to niezależny projekt, który rozszerza klientów warstwy wykonawczej o usługę pozwalającą poszukiwaczom na przesyłanie transakcji MEV do walidatorów bez ujawniania ich w publicznym mempoolu. Zapobiega to wyprzedzaniu transakcji przez uogólnione boty wyprzedzające.

## Przykłady MEV {#mev-examples}

MEV pojawia się na blockchainie na kilka sposobów.

### Arbitraż na DEX {#mev-examples-dex-arbitrage}

Arbitraż na [zdecentralizowanej giełdzie](/glossary/#dex) (DEX) to najprostsza i najbardziej znana okazja MEV. W rezultacie jest to również najbardziej konkurencyjny obszar.

Działa to w ten sposób: jeśli dwie giełdy DEX oferują token po dwóch różnych cenach, ktoś może kupić token na giełdzie o niższej cenie i sprzedać go na giełdzie o wyższej cenie w ramach pojedynczej, atomowej transakcji. Dzięki mechanice blockchaina jest to prawdziwy, pozbawiony ryzyka arbitraż.

[Oto przykład](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) zyskownej transakcji arbitrażowej, w której poszukiwacz zamienił 1000 ETH na 1045 ETH, wykorzystując różnicę w wycenie pary ETH/DAI na Uniswap w porównaniu do Sushiswap.

### Likwidacje {#mev-examples-liquidations}

Likwidacje w protokołach pożyczkowych stanowią kolejną dobrze znaną okazję MEV.

Protokoły pożyczkowe, takie jak Maker i Aave, wymagają od użytkowników zdeponowania pewnego zabezpieczenia (np. ETH). To zdeponowane zabezpieczenie jest następnie wykorzystywane do udzielania pożyczek innym użytkownikom.

Użytkownicy mogą następnie pożyczać aktywa i tokeny od innych w zależności od swoich potrzeb (np. możesz pożyczyć MKR, jeśli chcesz oddać głos w propozycji dotyczącej zarządzania MakerDAO) do określonego procentu zdeponowanego zabezpieczenia. Na przykład, jeśli maksymalna kwota pożyczki wynosi 30%, użytkownik, który zdeponuje 100 DAI w protokole, może pożyczyć inne aktywo o wartości do 30 DAI. Protokół określa dokładny procent zdolności pożyczkowej.

Ponieważ wartość zabezpieczenia pożyczkobiorcy ulega wahaniom, zmienia się również jego zdolność pożyczkowa. Jeśli z powodu wahań rynkowych wartość pożyczonych aktywów przekroczy, powiedzmy, 30% wartości ich zabezpieczenia (ponownie, dokładny procent określa protokół), protokół zazwyczaj pozwala każdemu na likwidację zabezpieczenia, natychmiast spłacając pożyczkodawców (działa to podobnie do [wezwań do uzupełnienia depozytu zabezpieczającego](https://www.investopedia.com/terms/m/margincall.asp) w tradycyjnych finansach). W przypadku likwidacji pożyczkobiorca zazwyczaj musi zapłacić wysoką opłatę za likwidację, z której część trafia do likwidatora — i to właśnie tutaj pojawia się okazja MEV.

Poszukiwacze rywalizują o jak najszybsze przeanalizowanie danych blockchaina, aby ustalić, którzy pożyczkobiorcy mogą zostać zlikwidowani, i jako pierwsi przesłać transakcję likwidacji, zgarniając opłatę za likwidację dla siebie.

### Handel kanapkowy (Sandwich trading) {#mev-examples-sandwich-trading}

Handel kanapkowy to kolejna powszechna metoda wyodrębniania MEV.

Aby zastosować tę metodę, poszukiwacz obserwuje mempool w poszukiwaniu dużych transakcji na DEX. Załóżmy na przykład, że ktoś chce kupić 10 000 UNI za DAI na Uniswap. Transakcja tej wielkości będzie miała znaczący wpływ na parę UNI/DAI, potencjalnie znacznie podnosząc cenę UNI w stosunku do DAI.

Poszukiwacz może obliczyć przybliżony wpływ tej dużej transakcji na cenę pary UNI/DAI i zrealizować optymalne zlecenie kupna bezpośrednio _przed_ dużą transakcją, kupując UNI tanio, a następnie zrealizować zlecenie sprzedaży bezpośrednio _po_ dużej transakcji, sprzedając je po wyższej cenie spowodowanej dużym zleceniem.

Handel kanapkowy jest jednak bardziej ryzykowny, ponieważ nie jest atomowy (w przeciwieństwie do opisanego powyżej arbitrażu na DEX) i jest podatny na [atak typu salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV w NFT {#mev-examples-nfts}

MEV w przestrzeni NFT to zjawisko dopiero się pojawiające i niekoniecznie zyskowne.

Ponieważ jednak transakcje NFT odbywają się na tym samym blockchainie, który jest współdzielony przez wszystkie inne transakcje Ethereum, poszukiwacze mogą stosować na rynku NFT techniki podobne do tych używanych w tradycyjnych okazjach MEV.

Na przykład, jeśli ma miejsce popularny zrzut (drop) NFT, a poszukiwacz chce zdobyć określony NFT lub zestaw NFT, może zaprogramować transakcję w taki sposób, aby być pierwszym w kolejce do zakupu NFT, lub może kupić cały zestaw NFT w jednej transakcji. Albo jeśli NFT zostanie [omyłkowo wystawiony po niskiej cenie](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), poszukiwacz może wyprzedzić innych kupujących i zgarnąć go tanio.

Jeden z głośnych przykładów MEV w NFT miał miejsce, gdy poszukiwacz wydał 7 milionów dolarów, aby [kupić](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) każdego Cryptopunka po cenie minimalnej (price floor). Badacz blockchaina [wyjaśnił na Twitterze](https://twitter.com/IvanBogatyy/status/1422232184493121538), w jaki sposób kupujący współpracował z dostawcą MEV, aby utrzymać swój zakup w tajemnicy.

### Długi ogon {#mev-examples-long-tail}

Arbitraż na DEX, likwidacje i handel kanapkowy to bardzo dobrze znane okazje MEV i jest mało prawdopodobne, aby były zyskowne dla nowych poszukiwaczy. Istnieje jednak długi ogon mniej znanych okazji MEV (MEV w NFT jest prawdopodobnie jedną z nich).

Poszukiwacze, którzy dopiero zaczynają, mogą odnieść większy sukces, szukając MEV w tym długim ogonie. [Tablica ogłoszeń MEV](https://github.com/flashbots/mev-job-board) projektu Flashbots wymienia niektóre z pojawiających się okazji.

## Skutki MEV {#effects-of-mev}

MEV nie jest całkowicie złe — istnieją zarówno pozytywne, jak i negatywne konsekwencje MEV w Ethereum.

### Pozytywy {#effects-of-mev-the-good}

Wiele projektów zdecentralizowanych finansów (DeFi) polega na racjonalnych ekonomicznie podmiotach, aby zapewnić użyteczność i stabilność swoich protokołów. Na przykład arbitraż na DEX zapewnia, że użytkownicy otrzymują najlepsze, najbardziej prawidłowe ceny za swoje tokeny, a protokoły pożyczkowe polegają na szybkich likwidacjach, gdy pożyczkobiorcy spadną poniżej wskaźników zabezpieczenia, aby zapewnić spłatę pożyczkodawców.

Bez racjonalnych poszukiwaczy szukających i naprawiających nieefektywności ekonomiczne oraz wykorzystujących zachęty ekonomiczne protokołów, protokoły DeFi i ogólnie zdecentralizowane aplikacje (dapp) mogłyby nie być tak solidne, jak są dzisiaj.

### Negatywy {#effects-of-mev-the-bad}

W warstwie aplikacji niektóre formy MEV, takie jak handel kanapkowy, skutkują jednoznacznie gorszymi doświadczeniami dla użytkowników. Użytkownicy, którzy padają ofiarą handlu kanapkowego, borykają się ze zwiększonym poślizgiem cenowym i gorszą realizacją swoich transakcji.

W warstwie sieciowej uogólnione boty wyprzedzające i aukcje cen gazu, w które często się angażują (gdy dwa lub więcej botów wyprzedzających rywalizuje o włączenie ich transakcji do następnego bloku poprzez stopniowe podnoszenie ceny gazu własnych transakcji), powodują przeciążenie sieci i wysokie ceny gazu dla wszystkich innych próbujących realizować zwykłe transakcje.

Poza tym, co dzieje się _wewnątrz_ bloków, MEV może mieć szkodliwe skutki _pomiędzy_ blokami. Jeśli MEV dostępne w bloku znacznie przekracza standardową nagrodę za blok, walidatorzy mogą być zachęcani do reorganizacji łańcucha i przejęcia MEV dla siebie, powodując reorganizację łańcucha blockchain i niestabilność konsensusu.

Ta możliwość reorganizacji łańcucha była [wcześniej badana na blockchainie Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Ponieważ nagroda za blok w sieci Bitcoin zmniejsza się o połowę, a opłaty transakcyjne stanowią coraz większą część nagrody za blok, pojawiają się sytuacje, w których dla górników staje się ekonomicznie racjonalne zrezygnowanie z nagrody za następny blok i zamiast tego ponowne wykopanie poprzednich bloków z wyższymi opłatami. Wraz ze wzrostem MEV podobna sytuacja mogłaby wystąpić w Ethereum, zagrażając integralności blockchaina.

## Stan MEV {#state-of-mev}

Wyodrębnianie MEV gwałtownie wzrosło na początku 2021 roku, co doprowadziło do niezwykle wysokich cen gazu w pierwszych miesiącach roku. Pojawienie się przekaźnika MEV od Flashbots zmniejszyło skuteczność uogólnionych botów wyprzedzających i przeniosło aukcje cen gazu pozałańcuchowo, obniżając ceny gazu dla zwykłych użytkowników.

Chociaż wielu poszukiwaczy nadal dobrze zarabia na MEV, w miarę jak okazje stają się coraz bardziej znane, a coraz więcej poszukiwaczy rywalizuje o tę samą okazję, walidatorzy będą przejmować coraz większą część całkowitych przychodów z MEV (ponieważ ten sam rodzaj aukcji gazu, jak pierwotnie opisano powyżej, występuje również we Flashbots, choć prywatnie, a walidatorzy przejmą wynikające z nich przychody z gazu). MEV nie jest również unikalne dla Ethereum, a w miarę jak okazje stają się coraz bardziej konkurencyjne na Ethereum, poszukiwacze przenoszą się na alternatywne blockchainy, takie jak Binance Smart Chain, gdzie istnieją podobne okazje MEV jak na Ethereum, ale przy mniejszej konkurencji.

Z drugiej strony, przejście z dowodu pracy (PoW) na dowód stawki (PoS) oraz trwające wysiłki na rzecz skalowania Ethereum za pomocą rollupów zmieniają krajobraz MEV w sposób, który wciąż jest nieco niejasny. Nie wiadomo jeszcze dokładnie, jak posiadanie gwarantowanych proponujących blok, znanych z niewielkim wyprzedzeniem, zmienia dynamikę wyodrębniania MEV w porównaniu z modelem probabilistycznym w dowodzie pracy, ani jak zostanie to zakłócone, gdy wdrożone zostaną [pojedyncze tajne wybory lidera (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) oraz [technologia rozproszonych walidatorów (DVT)](/staking/dvt/). Podobnie, okaże się, jakie okazje MEV będą istnieć, gdy większość aktywności użytkowników zostanie przeniesiona z Ethereum na jego rollupy warstwy 2 (L2) i shardy.

## MEV w dowodzie stawki (PoS) Ethereum {#mev-in-ethereum-proof-of-stake}

Jak wyjaśniono, MEV ma negatywne implikacje dla ogólnego doświadczenia użytkownika i bezpieczeństwa warstwy konsensusu. Jednak przejście Ethereum na konsensus dowodu stawki (nazwane „The Merge”) potencjalnie wprowadza nowe ryzyka związane z MEV:

### Centralizacja walidatorów {#validator-centralization}

W Ethereum po The Merge walidatorzy (po wpłaceniu depozytów zabezpieczających w wysokości 32 ETH) osiągają konsensus co do ważności bloków dodawanych do Beacon Chain. Ponieważ 32 ETH może być poza zasięgiem wielu osób, [dołączenie do puli stakingowej](/staking/pools/) może być bardziej wykonalną opcją. Niemniej jednak zdrowy rozkład [samodzielnych stakerów](/staking/solo/) jest idealny, ponieważ łagodzi centralizację walidatorów i poprawia bezpieczeństwo Ethereum.

Uważa się jednak, że wyodrębnianie MEV może przyspieszyć centralizację walidatorów. Wynika to częściowo z faktu, że ponieważ walidatorzy [zarabiają mniej za proponowanie bloków](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) niż wcześniej górnicy, wyodrębnianie MEV w znacznym stopniu [wpłynęło na zarobki walidatorów](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) od czasu [The Merge](/roadmap/merge/).

Większe pule stakingowe prawdopodobnie będą miały więcej zasobów do zainwestowania w niezbędne optymalizacje w celu przechwytywania okazji MEV. Im więcej MEV wyodrębniają te pule, tym więcej mają zasobów na ulepszanie swoich możliwości wyodrębniania MEV (i zwiększanie ogólnych przychodów), co w gruncie rzeczy tworzy [korzyści skali](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Dysponując mniejszymi zasobami, samodzielni stakerzy mogą nie być w stanie czerpać zysków z okazji MEV. Może to zwiększyć presję na niezależnych walidatorów, aby dołączali do potężnych pul stakingowych w celu zwiększenia swoich zarobków, co zmniejszy decentralizację w Ethereum.

### Mempoole wymagające zezwolenia {#permissioned-mempools}

W odpowiedzi na ataki typu handel kanapkowy i wyprzedzanie, inwestorzy mogą zacząć zawierać pozałańcuchowe umowy z walidatorami w celu zapewnienia prywatności transakcji. Zamiast wysyłać potencjalną transakcję MEV do publicznego mempoola, inwestor wysyła ją bezpośrednio do walidatora, który włącza ją do bloku i dzieli się zyskami z inwestorem.

„Ciemne pule” (ang. dark pools) to większa wersja tego układu i funkcjonują jako wymagające zezwolenia mempoole z ograniczonym dostępem, otwarte dla użytkowników skłonnych uiścić określone opłaty. Ten trend zmniejszyłby brak konieczności uzyskiwania zezwoleń i bezzaufaniowość Ethereum, potencjalnie przekształcając blockchain w mechanizm typu „płać, aby grać” (ang. pay-to-play), który faworyzuje tego, kto zaoferuje najwyższą cenę.

Mempoole wymagające zezwolenia przyspieszyłyby również ryzyko centralizacji opisane w poprzedniej sekcji. Duże pule obsługujące wielu walidatorów prawdopodobnie skorzystają na oferowaniu prywatności transakcji inwestorom i użytkownikom, zwiększając swoje przychody z MEV.

Zwalczanie tych problemów związanych z MEV w Ethereum po The Merge jest kluczowym obszarem badań. Do tej pory dwoma rozwiązaniami zaproponowanymi w celu zmniejszenia negatywnego wpływu MEV na decentralizację i bezpieczeństwo Ethereum po The Merge są [**separacja proponującego i budującego (PBS)**](/roadmap/pbs/) oraz [**Builder API**](https://github.com/ethereum/builder-specs).

### Separacja proponującego i budującego {#proposer-builder-separation}

Zarówno w dowodzie pracy, jak i w dowodzie stawki, węzeł, który buduje blok, proponuje go do dodania do łańcucha innym węzłom uczestniczącym w konsensusie. Nowy blok staje się częścią kanonicznego łańcucha po tym, jak inny górnik zbuduje na nim kolejny blok (w PoW) lub otrzyma poświadczenia od większości walidatorów (w PoS).

Połączenie ról producenta bloku i proponującego blok jest tym, co wprowadza większość opisanych wcześniej problemów związanych z MEV. Na przykład węzły konsensusu są zachęcane do wywoływania reorganizacji łańcucha w [atakach typu time-bandit](https://www.mev.wiki/attack-examples/time-bandit-attack) w celu maksymalizacji zarobków z MEV.

[Separacja proponującego i budującego](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) ma na celu złagodzenie wpływu MEV, zwłaszcza w warstwie konsensusu. Główną cechą PBS jest rozdzielenie ról producenta bloku i proponującego blok. Walidatorzy nadal są odpowiedzialni za proponowanie i głosowanie na bloki, ale nowa klasa wyspecjalizowanych podmiotów, zwanych **budowniczymi bloków**, ma za zadanie porządkowanie transakcji i budowanie bloków.

W ramach PBS budowniczy bloków tworzy pakiet transakcji i składa ofertę na jego włączenie do bloku Beacon Chain (jako „ładunek wykonawczy”). Walidator wybrany do zaproponowania następnego bloku sprawdza następnie różne oferty i wybiera pakiet z najwyższą opłatą. PBS w gruncie rzeczy tworzy rynek aukcyjny, na którym budowniczowie negocjują z walidatorami sprzedającymi przestrzeń w bloku.

Obecne projekty PBS wykorzystują [schemat zobowiązania i ujawnienia (commit-reveal)](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/), w którym budowniczowie publikują jedynie kryptograficzne zobowiązanie do zawartości bloku (nagłówek bloku) wraz ze swoimi ofertami. Po zaakceptowaniu zwycięskiej oferty proponujący tworzy podpisaną propozycję bloku, która zawiera nagłówek bloku. Oczekuje się, że budowniczy bloków opublikuje pełne ciało bloku po zobaczeniu podpisanej propozycji bloku, a przed sfinalizowaniem musi on również otrzymać wystarczającą liczbę [poświadczeń](/glossary/#attestation) od walidatorów.

#### W jaki sposób separacja proponującego i budującego łagodzi wpływ MEV? {#how-does-pbs-curb-mev-impact}

Wewnątrzprotokołowa separacja proponującego i budującego zmniejsza wpływ MEV na konsensus poprzez usunięcie wyodrębniania MEV z zakresu kompetencji walidatorów. Zamiast tego budowniczowie bloków korzystający ze specjalistycznego sprzętu będą w przyszłości przechwytywać okazje MEV.

Nie wyklucza to jednak walidatorów całkowicie z dochodów związanych z MEV, ponieważ budowniczowie muszą licytować wysoko, aby ich bloki zostały zaakceptowane przez walidatorów. Niemniej jednak, ponieważ walidatorzy nie skupiają się już bezpośrednio na optymalizacji dochodów z MEV, zagrożenie atakami typu time-bandit maleje.

Separacja proponującego i budującego zmniejsza również ryzyko centralizacji związane z MEV. Na przykład użycie schematu zobowiązania i ujawnienia eliminuje potrzebę ufania przez budowniczych walidatorom, że nie ukradną oni okazji MEV ani nie ujawnią jej innym budowniczym. Obniża to barierę dla samodzielnych stakerów, aby czerpać korzyści z MEV; w przeciwnym razie budowniczowie mieliby tendencję do faworyzowania dużych pul z pozałańcuchową reputacją i zawierania z nimi pozałańcuchowych umów.

Podobnie walidatorzy nie muszą ufać budowniczym, że nie zatają ciał bloków ani nie opublikują nieprawidłowych bloków, ponieważ płatność jest bezwarunkowa. Opłata dla walidatora jest nadal przetwarzana, nawet jeśli proponowany blok jest niedostępny lub uznany za nieważny przez innych walidatorów. W tym drugim przypadku blok jest po prostu odrzucany, zmuszając budowniczego bloków do utraty wszystkich opłat transakcyjnych i przychodów z MEV.

### Builder API {#builder-api}

Chociaż separacja proponującego i budującego obiecuje zmniejszyć skutki wyodrębniania MEV, jej wdrożenie wymaga zmian w protokole konsensusu. W szczególności należałoby zaktualizować regułę [wyboru rozwidlenia](/developers/docs/consensus-mechanisms/pos/#fork-choice) w Beacon Chain. [Builder API](https://github.com/ethereum/builder-specs) to tymczasowe rozwiązanie mające na celu zapewnienie działającej implementacji separacji proponującego i budującego, aczkolwiek z wyższymi założeniami dotyczącymi zaufania.

Builder API to zmodyfikowana wersja [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) używanego przez klientów warstwy konsensusu do żądania ładunków wykonawczych od klientów warstwy wykonawczej. Zgodnie ze [specyfikacją uczciwego walidatora](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), walidatorzy wybrani do obowiązków proponowania bloków żądają pakietu transakcji od podłączonego klienta warstwy wykonawczej, który włączają do proponowanego bloku Beacon Chain.

Builder API działa również jako oprogramowanie pośredniczące (middleware) między walidatorami a klientami warstwy wykonawczej; różni się jednak tym, że pozwala walidatorom w Beacon Chain na pozyskiwanie bloków od podmiotów zewnętrznych (zamiast budowania bloku lokalnie przy użyciu klienta warstwy wykonawczej).

Poniżej znajduje się przegląd działania Builder API:

1. Builder API łączy walidatora z siecią budowniczych bloków uruchamiających klientów warstwy wykonawczej. Podobnie jak w PBS, budowniczowie to wyspecjalizowane strony, które inwestują w zasobochłonne budowanie bloków i stosują różne strategie w celu maksymalizacji przychodów uzyskanych z MEV + napiwków priorytetowych.

2. Walidator (uruchamiający klienta warstwy konsensusu) żąda ładunków wykonawczych wraz z ofertami od sieci budowniczych. Oferty od budowniczych będą zawierać nagłówek ładunku wykonawczego — kryptograficzne zobowiązanie do zawartości ładunku — oraz opłatę do zapłacenia walidatorowi.

3. Walidator przegląda napływające oferty i wybiera ładunek wykonawczy z najwyższą opłatą. Korzystając z Builder API, walidator tworzy „zaślepioną” propozycję bloku śledzącego, która zawiera tylko jego podpis i nagłówek ładunku wykonawczego, a następnie wysyła ją do budowniczego.

4. Oczekuje się, że budowniczy uruchamiający Builder API odpowie pełnym ładunkiem wykonawczym po zobaczeniu zaślepionej propozycji bloku. Pozwala to walidatorowi na utworzenie „podpisanego” bloku śledzącego, który propaguje w całej sieci.

5. Od walidatora korzystającego z Builder API nadal oczekuje się lokalnego zbudowania bloku na wypadek, gdyby budowniczy bloków nie odpowiedział na czas, aby nie stracić nagród za propozycję bloku. Walidator nie może jednak utworzyć kolejnego bloku przy użyciu ujawnionych teraz transakcji lub innego zestawu, ponieważ byłoby to równoznaczne z _dwuznacznością_ (podpisaniem dwóch bloków w tym samym slocie), co jest wykroczeniem podlegającym karze cięcia (slashing).

Przykładową implementacją Builder API jest [MEV-Boost](https://github.com/flashbots/mev-boost), ulepszenie [mechanizmu aukcyjnego Flashbots](https://docs.flashbots.net/flashbots-auction/overview) zaprojektowane w celu ograniczenia negatywnych efektów zewnętrznych MEV w Ethereum. Aukcja Flashbots pozwala walidatorom w dowodzie stawki na zlecanie pracy polegającej na budowaniu zyskownych bloków wyspecjalizowanym stronom zwanym **poszukiwaczami**.
![A diagram showing the MEV flow in detail](./mev.png)

Poszukiwacze szukają lukratywnych okazji MEV i wysyłają pakiety transakcji do proponujących blok wraz z [ofertą z ukrytą ceną](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) za włączenie do bloku. Walidator uruchamiający mev-geth, rozwidloną wersję klienta Go Ethereum (Geth), musi jedynie wybrać pakiet z największym zyskiem i włączyć go jako część nowego bloku. Aby chronić proponujących blok (walidatorów) przed spamem i nieprawidłowymi transakcjami, pakiety transakcji przechodzą przez **przekaźniki** (relayers) w celu walidacji, zanim trafią do proponującego.

MEV-Boost zachowuje to samo działanie oryginalnej aukcji Flashbots, aczkolwiek z nowymi funkcjami zaprojektowanymi z myślą o przejściu Ethereum na dowód stawki. Poszukiwacze nadal znajdują zyskowne transakcje MEV do włączenia do bloków, ale nowa klasa wyspecjalizowanych stron, zwanych **budowniczymi**, jest odpowiedzialna za agregowanie transakcji i pakietów w bloki. Budowniczy akceptuje oferty z ukrytą ceną od poszukiwaczy i uruchamia optymalizacje w celu znalezienia najbardziej zyskownego uporządkowania.

Przekaźnik nadal jest odpowiedzialny za walidację pakietów transakcji przed przekazaniem ich proponującemu. Jednak MEV-Boost wprowadza **depozyty** (escrows) odpowiedzialne za zapewnienie [dostępności danych](/developers/docs/data-availability/) poprzez przechowywanie ciał bloków wysyłanych przez budowniczych i nagłówków bloków wysyłanych przez walidatorów. W tym przypadku walidator podłączony do przekaźnika prosi o dostępne ładunki wykonawcze i używa algorytmu porządkowania MEV-Boost, aby wybrać nagłówek ładunku z najwyższą ofertą + napiwkami MEV.

#### W jaki sposób Builder API łagodzi wpływ MEV? {#how-does-builder-api-curb-mev-impact}

Główną korzyścią z Builder API jest jego potencjał do demokratyzacji dostępu do okazji MEV. Korzystanie ze schematów zobowiązania i ujawnienia eliminuje założenia dotyczące zaufania i zmniejsza bariery wejścia dla walidatorów chcących czerpać korzyści z MEV. Powinno to zmniejszyć presję na samodzielnych stakerów, aby integrowali się z dużymi pulami stakingowymi w celu zwiększenia zysków z MEV.

Powszechne wdrożenie Builder API zachęci do większej konkurencji wśród budowniczych bloków, co zwiększa odporność na cenzurę. Ponieważ walidatorzy przeglądają oferty od wielu budowniczych, budowniczy zamierzający cenzurować jedną lub więcej transakcji użytkowników musi przelicytować wszystkich innych niecenzurujących budowniczych, aby odnieść sukces. To drastycznie zwiększa koszt cenzurowania użytkowników i zniechęca do tej praktyki.

Niektóre projekty, takie jak MEV-Boost, wykorzystują Builder API jako część ogólnej struktury zaprojektowanej w celu zapewnienia prywatności transakcji określonym stronom, takim jak inwestorzy próbujący uniknąć ataków typu wyprzedzanie/handel kanapkowy. Osiąga się to poprzez zapewnienie prywatnego kanału komunikacji między użytkownikami a budowniczymi bloków. W przeciwieństwie do opisanych wcześniej mempooli wymagających zezwolenia, to podejście jest korzystne z następujących powodów:

1. Istnienie wielu budowniczych na rynku sprawia, że cenzurowanie jest niepraktyczne, co przynosi korzyści użytkownikom. W przeciwieństwie do tego, istnienie scentralizowanych i opartych na zaufaniu ciemnych pul skoncentrowałoby władzę w rękach kilku budowniczych bloków i zwiększyłoby możliwość cenzurowania.

2. Oprogramowanie Builder API jest open-source, co pozwala każdemu na oferowanie usług budowniczego bloków. Oznacza to, że użytkownicy nie są zmuszani do korzystania z żadnego konkretnego budowniczego bloków, co poprawia neutralność i brak konieczności uzyskiwania zezwoleń w Ethereum. Ponadto inwestorzy poszukujący MEV nie przyczynią się nieumyślnie do centralizacji poprzez korzystanie z prywatnych kanałów transakcyjnych.

## Powiązane zasoby {#related-resources}

- [Dokumentacja Flashbots](https://docs.flashbots.net/)
- [GitHub Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Narzędzie śledzące ze statystykami w czasie rzeczywistym dla przekaźników MEV-Boost i budowniczych bloków_

## Dalsza lektura {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Merge ready Flashbots Architecture](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [What Is MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Why run mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [The Hitchhikers Guide To Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)