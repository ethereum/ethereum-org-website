---
title: "Stos prywatności Ethereum: prywatne odczyty, sieci i ukryte wycieki"
description: "Andy Guzman wyjaśnia, w jaki sposób metadane wyciekają, gdy portfele odczytują dane z Ethereum, oraz jak badania nad prywatnymi odczytami i sieciami w ramach mapy drogowej prywatności zamykają wyciek w warstwie dostępu."
lang: pl
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Stos prywatności Ethereum"
---

Prelekcja **Andy'ego Guzmana**, lidera zespołu Privacy Stewards of Ethereum (PSE) w Fundacji Ethereum, na EthBoulder 2026. Ujawnia on główny martwy punkt w prywatności Ethereum: nawet użytkownicy, którzy nigdy nie podpisują transakcji, ujawniają szczegółowe dane behawioralne poprzez codzienne zapytania. Przedstawia stos prywatności Ethereum, obejmujący prywatne odczyty (PIR), prywatność ruchu (trasowanie cebulowe i mixnety) oraz prace nad wydajnością, takie jak ujednolicone drzewa binarne (unified binary trees) i stan weryfikowalny za pomocą ZK (ZK-verifiable state).

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=tvAqDJXCBaA) opublikowanego przez EthBoulder. Został on lekko zredagowany w celu poprawy czytelności.*

#### Fikcyjny list od dostawcy RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Cześć wszystkim, jestem Andy i chciałem przedstawić temat, który nie jest często omawiany w ekosystemie Ethereum, a jest niezwykle ważny. Jak mogliście zauważyć na slajdzie i we wstępie, jest on związany z prywatnością i tym, jak jesteśmy niedostatecznie chronieni, nawet tego nie zauważając.

Pozwólcie, że zacznę od listu, który ktoś do was napisał.

„Drogi, wartościowy użytkowniku, dziękujemy za 847 zapytań, które złożyłeś w tym miesiącu. Bardzo nam się podobało poznawanie ciebie. Wiemy, że trzymasz ETH w trzech różnych portfelach. Wiemy, że w zeszły wtorek sprawdzałeś cenę ETH 94 razy. To był bardzo trudny dzień dla wszystkich, więc nie oceniamy. Sprawdzałeś również cenę BTC, co jest interesujące, ponieważ nie posiadasz żadnego Bitcoina. Myślisz o dywersyfikacji? To zostanie między nami i oczywiście naszymi partnerami analitycznymi. Bardzo uważnie obserwujesz również dwie pule Uniswap i w zeszłym tygodniu 14 razy sprawdzałeś swój wskaźnik zdrowia (health factor) na Aave. Może powinieneś się zrelaksować albo po prostu dodać trochę zabezpieczenia. W czwartek sprawdzałeś go trzy razy w ciągu 12 minut i byłeś bardzo zmartwiony. Sprawdzałeś cztery różne nazwy ENS, więc albo zaczynasz nowy projekt, albo masz kryzys tożsamości. I zawsze milkniesz między 23:00 a 7:00 czasu górskiego (Mountain time).”

#### Jak ujawniasz dane bez podpisywania transakcji (1:34) {#how-you-leak-data-without-signing-transactions-134}

„Jesteśmy więc dość pewni, że mieszkasz w Boulder lub w pobliżu. Nigdy nie podpisałeś za naszym pośrednictwem ani jednej transakcji. Nigdy nie musiałeś. Twoja ciekawość powiedziała nam wszystko. Z serdecznymi pozdrowieniami, twój dostawca RPC.”

Oczywiście jest to fikcyjny list, ale opisuje coś, co naprawdę ujawniamy każdego dnia. Nawet jeśli nie wykonujesz ani jednej transakcji lub jakiejkolwiek akcji onchain, w zasadzie mówisz wszystko każdej firmie analitycznej, która z chęcią położyłaby ręce na tych danych i twoich zachowaniach.

#### Prywatne zapisy a prywatne odczyty (2:07) {#private-writes-vs-private-reads-207}

Co więc tak naprawdę dzieje się teraz w świecie prywatności? Widzę, że kładziemy duży nacisk na prywatność onchain, lub to, co w PSE nazywamy prywatnymi zapisami: wszystkie akcje, które wykonujesz onchain. I to ma sens, prawda? Te akcje są zapisywane na zawsze i przesyłane po całym świecie, więc ma sens, aby nie ujawniać swojego adresu przy konkretnej akcji. Kładziemy również duży nacisk na narzędzia: źródła danych, dowody, języki DSL i języki programowania, których możemy użyć, aby dać deweloperom więcej narzędzi do wyrażania i budowania silniejszych aplikacji, które mają więcej prywatności onchain.

Ale w tej prezentacji chcę udowodnić, że nie poświęcamy wystarczająco dużo uwagi i wysiłku tym innym dziedzinom: temu, co nazywamy prywatnymi odczytami, ponieważ za każdym razem, gdy pobierasz dane z blockchaina, ujawniasz wiele informacji, oraz prywatnym sieciom, ponieważ zanim cokolwiek trafi onchain, cały twój ruch wycieka.

Przechodząc do nieco bardziej technicznych kwestii: wszystkie wywołania RPC, takie jak eth_getBalance, eth_call i eth_getLogs, to żądania w postaci zwykłego tekstu, które trafiają do dostawców RPC i są korelowane z twoim adresem IP.

#### Dlaczego większa aktywność zwiększa ryzyko profilowania (3:20) {#why-more-activity-increases-profiling-risk-320}

Dzięki tym informacjom bardzo łatwo jest profilować ludzi, segmentować ich i modelować zachowania. A to może zostać użyte przeciwko tobie. Jak można sobie wyobrazić, informacja to potęga, a im więcej informacji ludzie mają o tobie i twoim zachowaniu, tym większą mają nad tobą władzę.

Większość ludzi nie zdaje sobie z tego sprawy. Większość ludzi powie: okej, cóż, to nie ma większego znaczenia, ponieważ nie są to krytyczne informacje. Albo mogą pomyśleć: im większa aktywność, tym bardziej będę chroniony. To całkowita nieprawda i jest to sprzeczne z intuicją. W przypadku akcji onchain, wszędzie tam, gdzie występują zbiory anonimowości, to pomaga: im więcej użytkowników, tym więcej prywatności i tym łatwiej się wtopić w tłum. Ale w przypadku odczytów jest odwrotnie, ponieważ zapytania nie są wymienne. Im więcej aktywności przesyłasz, im więcej działań podejmujesz, tym bogatsza jest powierzchnia korelacji i tym łatwiej jest zbudować profil twoich działań.

Więc za każdym razem, gdy pojawia się mania na zdecentralizowane finanse (DeFi) lub szaleństwo na punkcie NFT, ludzie stają się bardziej niechlujni. Bezpieczeństwo operacyjne (OpSec) oczywiście idzie w odstawkę i staje się znacznie, znacznie łatwiejsze do zdeanominizowania ludzi na podstawie wzorców aktywności, w które wpada większość z nich.

#### Wprowadzenie do stosu prywatności Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Chcę zacząć od ogólnego obrazu: gdzie powinniśmy uderzyć, co jest potrzebne i kto nad czym pracuje. Ta prelekcja poruszy nieco bardziej techniczne tematy, a także te bardziej ogólne i koncepcyjne, aby każdy mógł z niej coś wynieść.

Chcę zaprezentować to, co nazywam stosem prywatności Ethereum, lub warstwami stosu prywatności Ethereum, i myślę, że warto o tym pomyśleć. Jeśli naprawdę chcemy prywatności, nie potrzebujemy tylko prywatności onchain; potrzebujemy również prywatności we wszystkich tych warstwach stosu, podobnie jak w cyklu życia transakcji lub modelu OSI i jego warstwach technologicznych. Twierdzę, że moglibyśmy stworzyć standard lub pewnego rodzaju ogólnosystemowe uznanie, że te warstwy istnieją. Być może nie jest to ostateczna forma, ale uważam, że już teraz jest to przydatne.

#### Warstwa po warstwie: gdzie wyciekają twoje dane (5:41) {#layer-by-layer-where-you-leak-541}

Na samej górze znajduje się warstwa aplikacji. Za każdym razem, gdy odwiedzasz stronę internetową, oczywiście ujawniasz to, co odwiedzasz, a ludzie mogą zacząć profilowanie: zbiory anonimowości, dane uwierzytelniające, łączenie twojego adresu IP z tym, co odwiedzasz, nawet jeśli nic nie robisz.

Następna jest warstwa portfela. Za każdym razem, gdy podejmujesz działanie, ujawniasz informacje nie tylko warstwie aplikacji, ale także bramom (gateways). Portfele są obecnie bardzo złożone, integrują się z wieloma innymi systemami i usługami, a ty ujawniasz znacznie więcej informacji, niż sobie wyobrażasz. Nawet jeśli po prostu otworzysz swój portfel, a on zapyta o cenę ETH lub twoje saldo, ujawniasz wszystko.

Następnie mamy bramy: RPC, serwery proxy, przekaźniki (relayers). Znowu ujawniasz więcej metadanych. Następnie to, co ludzie wyobrażają sobie jako element onchain, czyli za każdym razem, gdy rzeczy są odpytywane w EVM, takie jak stan lub wzorce wykonywania. Na przykład zapytanie o saldo czegoś lub stan inteligentnego kontraktu. I wreszcie konsensus, gdzie znajdują się wszystkie walidatory. W zależności od tego, czy zapisujesz onchain, czy odczytujesz onchain, możesz również dotknąć mempoola.

Istnieje również inny pion, który nazywamy sieciami (networking), który jest poprzeczny i przecina wszystkie te warstwy. Na przykład: teraz odwiedzasz stronę internetową, a serwer zna twój adres IP. Ale co by było, gdybyś odwiedził tę stronę przez sieć Tor lub inną anonimową sieć? Znałbyś adres IP strony internetowej, ale oni nie znaliby twojego. A co, jeśli ta strona jest hostowana w kraju, który niedawno zaczął cenzurować wszystko, co związane z krypto? Ta strona i firma również chciałyby ukryć swój adres IP i chciałyby ukryć swoją domenę za domeną cebulową (onion domain).

To są tego typu rzeczy, które mają sens: musimy iść warstwa po warstwie, wzmacniając wszystko, analizując przez pryzmat bardzo destrukcyjnego atakującego, który chce wszystko ocenzurować. Nawet jeśli tego nie zrobimy i powiemy, że żyjemy w wystarczająco dobrym państwie, te informacje są teraz rejestrowane i będą hostowane na zawsze przez wielu ludzi, których nawet nie znasz, firmy, które zaczną sprzedawać twoje dane. W końcu, za pięć lat, ktoś może zakazać krypto i powiedzieć: „każdy, kto używał Uniswap w ciągu ostatnich pięciu lat, jestem z urzędu skarbowego, zacznę pukać do drzwi i wsadzę was do więzienia” czy coś w tym stylu. Te dystopijne scenariusze mają obecnie miejsce w różnych krajach na całym świecie.

#### Prywatne odczyty i prywatne sieci (8:24) {#private-reads-and-private-networking-824}

Okej, więc mamy stos prywatności Ethereum. Na czym powinniśmy się skupić? W tej prezentacji chcę porozmawiać o tych dwóch obszarach. Prywatne odczyty: za każdym razem, gdy uzyskujesz dostęp do stanu z onchain, dotykasz wszystkich tych warstw, od aplikacji, powiedzmy, że chcę sprawdzić cenę ETH, przez portfel, bramy, aż po węzeł, na którym działa Ethereum i EVM, a następnie z powrotem. Zasadniczo dostawca RPC lub indeksator. Oraz prywatne sieci, czyli wszystkie akcje, które dzieją się w warstwie sieciowej. To właśnie chcemy wzmocnić.

#### Trzy filary: dane, ruch, wydajność (9:05) {#three-pillars-data-traffic-performance-905}

Istnieją trzy filary, które moim zdaniem są kluczowe, abyśmy to osiągnęli. Chcemy ukryć i uczynić prywatnymi same dane. Chcemy ukryć i uczynić prywatnym sam ruch. A następnie chcemy, aby było to wydajne, użyteczne, praktyczne i tanie. Podsumowuje to wiele informacji o tym, co dzieje się w ekosystemie, ale myślę, że warto nakreślić ogólną sytuację i zidentyfikować punkty nacisku, w których możemy przyspieszyć.

#### Ukrywanie danych: od serwerów proxy do PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

A więc dane. Co chcemy chronić? Chcemy ukryć to, o jakie informacje prosisz te serwery, i chcemy ukryć wzorce tego, jak uzyskujesz dostęp do tych danych. Nie tylko treść, ale także wzorce.

Istnieją różne poziomy technik. Pierwszy to nic: po prostu ujawniasz wszystko. Za każdym razem, gdy podłączasz swój portfel, wiążesz swój adres IP z kontraktem, o który pytasz, z konkretnym eth_getBalance dla konkretnego adresu i to wszystko. Nawet jeśli używasz protokołu prywatności, powiedzmy Tornado Cash, i chcesz zapytać o stan drzewa Merklego, musisz albo pobrać całe drzewo, co nie jest zbyt wydajne, albo ujawniasz, o którą ścieżkę i liście pytasz, zmniejszając swój zbiór anonimowości. Więc nawet użycie silnego protokołu prywatności, takiego jak Tornado Cash, nie wystarczy, jeśli nie chronisz swojej sieci i wzorców dostępu do danych.

Następny poziom to swego rodzaju serwery proxy lub przekaźniki: wiele maszyn, które nie wiedzą, skąd pochodzi żądanie, i ostatecznie pobierają dane. Nie jest to zbyt praktyczne i nie jest to rozwiązanie niewymagające zaufania.

Następnie mamy TEE (Trusted Execution Environments), które są krokiem naprzód, i to tutaj niektóre zespoły i firmy oferują usługi. Myślę, że to dobry krok naprzód, ale niewystarczający, ponownie dlatego, że koszt ataku i korumpowania TEE znacznie spada. W przypadku niektórych krytycznych przypadków użycia to nie wystarczy; w wielu codziennych sytuacjach może to być wystarczające.

Są też inne zespoły pracujące nad OMAP (oblivious map access patterns) i ORAM (Oblivious RAM). Są to podobne techniki, które próbują zaciemnić to, do których części zestawu danych próbujesz uzyskać dostęp. Zamiast mówić „chcę saldo z tego adresu ETH”, losowo uzyskujesz dostęp do różnych rzeczy, więc serwer o tym nie wie.

I twierdziłbym, że ostatecznym celem tego wszystkiego będzie PIR (private information retrieval - prywatne pobieranie informacji), co oznacza, że serwer nie wie, o co pytasz, i niczego się o tym nie dowiaduje.

#### Wyjaśnienie prywatnego pobierania informacji (PIR) (12:03) {#private-information-retrieval-explained-1203}

Prywatne pobieranie informacji to super potężna technika w kryptografii i będzie ona często używana. Istnieją dwa warianty: index PIR, którego można użyć, jeśli ma się ustrukturyzowane dane pod indeksem, oraz keyword PIR, gdzie, jak sama nazwa wskazuje, zapytania są oparte na słowach kluczowych. Bardzo trudno jest mieć jeden schemat, który działa do wszystkiego.

Stan Ethereum jest ogromny i bardzo zróżnicowany. Logi, jak dowiedziałem się wczoraj, są tylko do dopisywania (append-only), ale model konta jest inny: niektóre stany są aktualizowane bardzo często, inne nie. W zależności od tego, jak to podzielisz i przeanalizujesz, możesz mieć megabajty, gigabajty lub terabajty danych o bardzo różnych wzorcach dostępu.

#### Wieloagentowa architektura PIR (12:48) {#a-multi-agent-pir-architecture-1248}

Propozycja, nad którą pracujemy w ramach PSE – i tutaj będę mówił koncepcyjnie, a następnie o konkretnych projektach, które realizujemy w PSE, i innych rzeczach, które widzę w ekosystemie – to architektura wieloagentowa. Nie ma jednego schematu, który byłby idealny dla całego stanu Ethereum. Ale jeśli możemy podzielić stan Ethereum według typu lub wzorca dostępu, możemy znaleźć bardzo dobre schematy dla każdego z nich.

Co by było, gdybyśmy mieli usługę, która uruchamia tę wieloagentową architekturę i w zależności od typu zapytań oraz tego, gdzie mogą się one znajdować w stanie Ethereum, uruchamia jeden lub drugi schemat? To już bardzo zbliża nas do czegoś, co jest wykonalne, gotowe do produkcji i możliwe do zaoferowania ekosystemowi. Będzie to wymagało czegoś w rodzaju ujednoliconego API, aby portfele, indeksatory, użytkownicy i deweloperzy zdecentralizowanych aplikacji (dapp) nie musieli się martwić o to, który schemat jest używany i jak go wywołać. Masz po prostu standardowe API, a ktoś inny martwi się o szczegóły implementacji.

Już to robimy i wdrażamy dwa różne schematy. Otworzymy granty i staramy się skoordynować więcej osób w ekosystemie, aby zajęły się niektórymi z nich i sprawdziły, które z nich są najbardziej potrzebne dla Ethereum.

Oto kilka liczb dotyczących różnych schematów PIR: przepustowość, narzut komunikacyjny i tak dalej. To trudne, ponieważ różne aplikacje mają różne wzorce dostępu. Niektóre uzyskują dostęp do wielu paragonów (receipts), inne chcą uzyskać większy dostęp do stanu, jak Rotki, a jeszcze inne uzyskują dostęp do większej liczby transakcji, jak Helios. Nie ma złotego środka i najprawdopodobniej pomocna będzie architektura mieszana. Przeprowadzamy również systematyzację wiedzy, więc jeśli jest to dla ciebie interesujące, możemy się tym podzielić. A oto tylko niektóre z zespołów pracujących w tych obszarach. Wybaczcie, jeśli jesteście częścią zespołu, a was nie uwzględniłem; jeśli ktoś ogląda nagranie i kogoś brakuje, dajcie mi znać, a zacznę was dodawać.

#### Ukrywanie ruchu: trasowanie cebulowe i Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Omówiliśmy dane. Drugim dużym obszarem jest ruch. Jak ukryć ruch i co chcemy ukryć? Mówiąc bardzo prosto, chcemy ukryć adresy IP klienta i serwera przed sobą nawzajem oraz przed resztą świata, która może podsłuchiwać ruch. Mamy różne techniki: usługi cebulowe (onion services), mixnety, VPN-y, DC-nety i mogą istnieć inne klasyfikacje. Opowiem tylko o pierwszych dwóch.

Techniki trasowania cebulowego szyfrują warstwowo, a ruch jest również deszyfrowany warstwowo. Ludzie pośrodku nigdy nie mogą poznać pochodzenia, niektórzy nigdy nie mogą poznać miejsca docelowego, a niektórzy nigdy niczego się nie dowiadują; działają po prostu jako routery.

W skrócie (TL;DR): co by było, gdyby cały ruch w ekosystemie Ethereum mógł być kierowany przez sieć Tor, że tak powiem? Są też inne opcje. Pomoglibyśmy chronić adres IP nadawcy: twój telefon lub laptop nie wyciekłby podczas wysyłania transakcji lub żądania informacji. I oczywiście chronilibyśmy również odbiorcę, serwer. Wyobraź sobie, że w Iranie, Chinach, Korei Północnej lub Wenezueli ktoś próbuje hostować protokół zdecentralizowanych finansów (DeFi) lub usługę i jest to cenzurowane przez jego kraj. To opcja, która mogłaby chronić ich życie. Omija cenzurę, a także ukrywa ruch przed dostawcami usług internetowych (ISP), którzy, jak wszyscy wiemy, są podsłuchiwani przez agencje wywiadowcze, które wtykają nos we wszystko.

Celem jest posiadanie gotowego zamiennika (drop-in replacement): SDK, aby portfele, deweloperzy zdecentralizowanych aplikacji (dapp) i dostawcy infrastruktury nie musieli się martwić o szczegóły implementacji. Wiedzą tylko, że jeśli użyją tego SDK, ruch zostanie „ucebulowiony” (onionized), zaszyfrowany i wzmocniony.

Jest zespół, o którym chcę wspomnieć, zespół Brume Wallet, który stworzył Echalote, otwartoźródłową implementację Tora dla sieci web. To istnieje już teraz: są klienci Tora, ale są napisani w C i muszą działać w specjalnej przeglądarce. A co, jeśli chcę dodać to do MetaMask, do portfela Kohaku, albo do Ambire, Rabby i wszystkich innych? Potrzebujemy SDK w JavaScript i to właśnie zapoczątkowało Echalote.

Następnie, Projekt Tor ma nową rozwijaną implementację o nazwie Arti, następną generację ich klienta. Ale potrzebujemy wbudowanego Arti. Arti jest oparte na języku Rust i musi zostać skompilowane do WASM, aby mogło działać w twojej przeglądarce, dzięki czemu możesz je naprawdę łatwo zaimportować. Zasadniczo współpracujemy z zespołem Tora: dzwonimy do siebie co tydzień i mamy wspólne projekty oraz partnerstwa.

#### Mixnety dla Ethereum (18:16) {#mixnets-for-ethereum-1816}

Jeśli chodzi o mixnety, chcę wyróżnić kilka zespołów, które do tego podchodzą: zespół Nym; HOPR, również jeden z pierwszych; VPN-y takie jak Gnosis VPN; i kilka innych, które były dla mnie nowe, jak Anyone Protocol, i myślę, że ktoś z tego zespołu powinien być tutaj w Denver, plus kilka innych nowych. Istnieje wiele zespołów pracujących nad mixnetami, VPN-ami i innymi podejściami.

Chcemy zobaczyć: co by było, gdybyśmy stworzyli specjalnie zbudowany mixnet dla Ethereum, w którym moglibyśmy kierować ruchem RPC? Mixnety mają silne gwarancje, ale dodają dużo opóźnień. W niektórych przypadkach użycia to w porządku: nie ma znaczenia, czy potrwa to trochę dłużej, o ile masz prywatność. Ale w przypadku rzeczy takich jak zdecentralizowane finanse (DeFi) i handel, jest niezwykle mało prawdopodobne, że zostaną one przyjęte, jeśli dodadzą opóźnienia. Więc jak szybko możemy działać przy najwyższych gwarancjach prywatności? Ponownie, pozdrowienia dla niektórych z tych zespołów, a jeśli ktoś pracuje w tych obszarach, a ja was nie dodałem, z przyjemnością porozmawiam.

#### Wydajność: ujednolicone drzewa binarne i akceleracja GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Ostatnią rzeczą, o której chcę porozmawiać, trzecim filarem, który ma to urzeczywistnić, jest wydajność. Chcemy, aby te rzeczy działały szybko i tanio. Mam taką zasadę: te rzeczy nie zostaną przyjęte, jeśli koszt będzie wyższy niż korzyść. Koszt oznacza doświadczenie użytkownika, czas i wysiłek dla użytkownika, ale także koszt dla deweloperów i infrastruktury: czy uruchomienie tego jest bardzo drogie? Musimy obniżyć koszty tak bardzo, jak to możliwe, i są dwie inicjatywy wysokiego szczebla, o których mogę opowiedzieć.

Jedną z nich jest UBT (ujednolicone drzewa binarne). W zależności od tego, jak bardzo jesteś zaangażowany w propozycje ulepszeń protokołu (EIP), mogłeś o tym słyszeć. Obecnie mamy drzewo Merkle Patricia, które jest przydatne, ale niezbyt przydatne dla ZK i innych rodzajów kryptografii. Istnieje propozycja, EIP-7864, przechodząca nie na drzewa Verkle, ale na ujednolicone drzewa binarne. Jest to znacznie bardziej wydajne do odpytywania stanu, a następnie wykonywania na nim operacji kryptograficznych, takich jak ZK.

Mamy projekt tworzący weryfikowalne UBT: dodajesz sidecar do dowolnego klienta Ethereum, który zamiast uruchamiać bazę danych MPT, ma bazę danych stanu UBT, a następnie udowadniasz, że ta transformacja z MPT do UBT jest prawidłowa przy użyciu zkVM. To już jest bardzo potężne. Kiedy uda nam się to zrobić, lekkie klienty (light clients) mogłyby tego użyć do zwiększenia swojej wydajności, a rzeczy takie jak PIR mogłyby działać znacznie szybciej.

Innym aspektem jest akceleracja GPU. Możemy uruchamiać te rzeczy znacznie szybciej, jeśli zoptymalizujemy niższe poziomy stosu: GPU to jedno, ale także akceleracja CPU. Te rzeczy prawdopodobnie będą działać na serwerach, a nie na telefonach, więc bardzo cenne jest również rozpoczęcie eksploracji tego, jak możemy stworzyć te biblioteki niższego poziomu, aby działały znacznie szybciej.

Podsumowując dotychczasowe informacje: mamy te pięć warstw i chcemy pokryć te przypadki użycia. Istnieją trzy filary: dane, ruch i wydajność. Dla danych mamy serwery proxy, TEE, ORAM, OMAP i PIR. Dla ruchu mamy mixnety, trasowanie cebulowe i inne. Dla wydajności mamy UBT i akcelerację GPU. Jeśli chcesz przeczytać więcej, przynajmniej o wkładzie, jaki wnosi PSE, możesz wejść na stronę pse.dev/research.

#### Mierzenie sukcesu (22:15) {#measuring-success-2215}

Czym więc jest sukces i jak możemy go zmierzyć? Wracając do tych warstw: jeśli chcę móc twierdzić, że Ethereum jest najbardziej prywatnym łańcuchem, jaki jest ostateczny cel? Musiałbym czuć się komfortowo z tym, że wszystkie te warstwy są niezwykle wzmocnione. Jak bym to zmierzył? Oczekiwałbym, że więcej stron internetowych i frontendów zdecentralizowanych aplikacji (dapp) będzie hostowanych za domenami cebulowymi. Bardzo bym chciał, aby portfele natywnie korzystały z anonimowego trasowania, a także bramy, dostawcy RPC i indeksatory. I mierzyłbym to w procentach.

Pytanie brzmi: ile z obecnych frontendów ekosystemu Ethereum jest hostowanych za domeną cebulową? Powiedziałbym, że niezwykle mało, 1%, jeśli w ogóle. Abym czuł się dobrze i powiedział, że nam się udało, prawdopodobnie potrzebowalibyśmy ponad 80% na wszystkich tych warstwach. Ile portfeli obecnie kieruje ruch przez techniki anonimowego trasowania? Bardzo, bardzo mało. To samo z dostawcami RPC: czy ci dostawcy oferują PIR? Nie. Więc dla mnie ogłoszenie sukcesu oznacza, że aktorzy na wszystkich tych warstwach przyjmują tego typu technologie, co najmniej 80% zespołów, ruchu lub zapytań.

#### Porównanie węzłów cebulowych Bitcoina (23:39) {#bitcoins-onion-node-comparison-2339}

To jedna rzecz, której możemy zazdrościć Bitcoinowi. Mimo całej krytyki, z jaką się spotykają, to jest obraz z listopada zeszłego roku: 64% ich osiągalnych pełnych węzłów jest ukrytych za domenami cebulowymi.

Czy możemy to zrobić sami? To jest prywatność niższego poziomu, na poziomie konsensusu, ale czy moglibyśmy powiedzieć, że nasze pełne węzły i węzły walidatorów znajdują się za siecią cebulową lub mixnetami? Zdecydowanie uważam, że powinniśmy, a prawdopodobnie jesteśmy na poziomie poniżej 1%. Mamy inne wyzwania, których oni nie mają: działamy znacznie szybciej, a nasz konsensus jest inny. Ale bardzo chciałbym mieć takie pulpity nawigacyjne i móc powiedzieć, że ponad 80% portfeli przyjęło tego typu technologie, a także dostawcy RPC, eksploratory, frontendy, systemy równoważenia obciążenia (load balancers) i SDK. Bardzo bym chciał, aby ta lista rosła.

#### Porównanie Ethereum do Monero i Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Pozwoliłem sobie, wczoraj wieczorem i przedwczoraj, zacząć sprawdzać, jak przez pryzmat tych warstw ekosystem Ethereum wypada w porównaniu z takimi projektami jak Solana, Bitcoin, Zcash i Monero. Rzeczy zaznaczone na żółto to techniki opcjonalne (opt-in) i myślę, że jesteśmy w tym bardzo dobrzy. Rzeczy na niebiesko to propozycje, niektóre z nich to propozycje protokołu. Rzeczy na zielono są wymuszane w warstwie protokołu.

Ze względu na naszą 10-letnią historię bycia publicznym łańcuchem, myślę, że trudno będzie dogonić Monero i Zcash w uczynieniu prywatności natywną. Ale myślę, że możemy wykonać naprawdę dobrą robotę w uzyskaniu opcjonalnej adopcji oraz kulturowym i społecznym wpływaniu na zespoły i użytkowników, aby przyjęli więcej z tych technik. Bitcoin i Solana mają swoje własne wyzwania i myślę, że będą dalej w tyle, przynajmniej w kwestiach prywatności.

#### Wyzwanie: najbardziej prywatny programowalny ekosystem (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Moim celem i celem, który chcę wam zaszczepić w głowach, jest to, aby Ethereum stało się najbardziej prywatnym, niewymagającym pozwoleń, niewymagającym zaufania i programowalnym ekosystemem na świecie. Mamy inne prywatne łańcuchy płatnicze i to świetnie, są bardzo dobre, ale myślę, że będą miały znacznie trudniejsze zadanie, aby stać się programowalnymi i stworzyć ekosystem, który my stworzyliśmy.

Moim wyzwaniem dla was, a oczywiście także dla mnie i mojego zespołu, jest to, abyśmy stali się, spośród programowalnych ekosystemów, tym najbardziej niewymagającym pozwoleń, niewymagającym zaufania i prywatnym. Nie możemy skupiać się tylko na elementach onchain. Musimy skupić się na wszystkich tych warstwach.

Więc jeśli pracujesz nad prywatnymi odczytami, sieciami, implementacjami PIR, akceleracją GPU, strukturami danych, UBT, infrastrukturą lub walidatorami, z przyjemnością porozmawiam z tobą po prezentacji. Bardzo dziękuję. Ethereum jest dla prywatności.