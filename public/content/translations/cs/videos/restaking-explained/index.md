---
title: "Vysvětlení restakingu"
description: "Vysvětlení restakingu, který využívá již stakovaný ETH k zajištění bezpečnosti dalších protokolů a služeb nad rámec základní vrstvy Etherea."
lang: cs
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "bezpečnost"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Prezentace **Mika Neudera** na akci CBER Forum, která vysvětluje, jak funguje restaking. Prezentace definuje self-staking (vlastní staking), delegovaný staking, nativní a nenativní restaking, mechanismy likvidního stakingu a tokenů likvidního restakingu a to, jak se penalizace projevuje u restakovaných pozic.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=rOJo7VwPh7I) zveřejněného fórem CBER. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:00) {#introduction-000}

Ahoj všichni, já jsem Mike. Budu mluvit o tokenech likvidního restakingu (LRT) a tokenech likvidního stakingu (LST). LRT — je restaking novým stakingem? Začnu druhou otázkou a využiji ji k motivaci diskuse o LST a LRT a k definování toho, co to vlastně je. Jedná se převážně o grafickou prezentaci, takže doufám, že můžeme začít od začátku a postupně na tom stavět.

Rychlý přehled: začneme úplně od začátku a definujeme si dva režimy stakingu. Prvním je self-staking (vlastní staking), druhým je delegovaný staking. Poté se dostaneme ke konceptu restakingu a jeho definici. Chci prozkoumat čtyři různé modely — s využitím rozdělení na vlastní a delegovaný, a poté se zaměřím na nativní restaking oproti nenativnímu restakingu. Pak přejdeme k likviditě a budeme mluvit o likvidních tokenech — tokenech likvidního stakingu a tokenech likvidního restakingu. To si zdůvodníme pohledem na penalizaci a restaking a následně na oba typy tokenů. Nakonec to zakončíme několika daty o stakingu, jak dnes existuje v Ethereu.

#### Vlastní staking (0:48) {#self-staking-048}

Začneme-li úplně od začátku, máme tu staking, který Alice provádí sama. Komunikuje přímo s protokolem, vloží do protokolu svůj stake a je za to odměněna prostřednictvím emise nativního tokenu. V případě Etherea Alice stakuje 32 ETH a za účast na konsensu je odměněna v ETH.

Zde je třeba se zaměřit na dvě věci. Zaprvé, staking slouží jako tento Anti-Sybil mechanismus — nemůžete síť oklamat tvrzením, že máte mnoho identit, protože každá identita stojí určité množství z této fixní zásoby tokenů. Zadruhé je to zajištění v ohrožení — to jsou pravidla protokolu týkající se penalizace. Pokud se Alice zachová nesprávně podle nějaké velmi přesně definované specifikace, protokol jí odebere kapitál a potrestá ji za to.

#### Delegovaný staking (2:52) {#delegated-staking-252}

Delegovaný staking přidává další vrstvu doprostřed mezi Alici a protokol. Alice nyní deleguje na Boba, který stakuje do protokolu Ethereum. Odměny jsou zasílány Bobovi a odměny po odečtení poplatků jsou přeposílány Alici. Toto je nejjednodušší verze delegovaného stakingu — Alice nechce sama provozovat software, možná nemá celých 32 ETH, nebo nemá hardware či technické znalosti k provozování validátoru.

Existuje mnoho různých režimů této delegace s různými úrovněmi důvěry. Nejdůvěryhodnější verze je kustodiální — pošlete své ETH na Coinbase a řeknete „stakujte mým jménem“. V podstatě jim plně důvěřujete, protože spravují aktivum vaším jménem. Existuje nekustodiální verze řízená DAO, kde delegujete svůj stake na někoho, koho určí DAO, které hlasuje o tom, kdo bude provozovat uzly — to je staking ve stylu Lido. Třetí je verze s minimalizovanou důvěrou, kde Alice i Bob poskytnou nějaké zajištění. Alice dotuje zbytek Bobova zajištění, a pokud se Bob zachová nesprávně a je penalizován, jeho zajištění je první tranší, která je odebrána. Říkám „s minimalizovanou důvěrou“ a ne „nevyžadující důvěru“, protože ať se děje co se děje, existují situace, ve kterých je Alicino zajištění zcela vymazáno v závislosti na tom, co Bob udělá.

#### Vlastní restaking s nativním ETH (4:42) {#self-restaking-with-native-eth-442}

Nyní si můžeme říct, co je to restaking. Je to zcela nový koncept — existuje od doby, kdy Sreeram a EigenLayer tento termín zavedli, možná před rokem a půl nebo dvěma lety.

V tomto modelu dělá Alice to samé, co dělala předtím — pošle svůj stake do protokolu Ethereum a získá odměny za účast na konsensu. Nyní tu máme nový protokol — říkejme mu „Retheum“ — do kterého Alice restakuje. Důležité zde je, že k zabezpečení tohoto druhého protokolu používá stejné tokeny, které stakuje v protokolu Ethereum.

Za to získává odměny. To zní skvěle — Alice má nyní potenciálně dvojnásobnou odměnu za stejnou velikost staku. Riziko však spočívá v tom, že kapitál, který stakovala v obou protokolech, je nyní zatížen pravidly obou protokolů. Pokud se Alice v Ethereu zachová nesprávně, může o svůj kapitál přijít tím, že bude penalizována. Pokud se zachová nesprávně v „Retheum“, může být také penalizována. S dodatečným výnosem přicházejí dodatečné povinnosti — chování protokolu, které je nařízeno a trestáno dalšími způsoby, pokud svůj stakovací token zatížíte napříč mnoha různými protokoly.

#### Delegovaný nativní restaking (8:28) {#delegated-native-restaking-828}

Druhou verzí je delegovaný restaking s nativním ETH. Alice stakuje v Ethereu a nyní chce využít Boba k delegování svého staku do protokolu „Retheum“. Deleguje na Boba, Bob restakuje, protokol vydá odměny Bobovi a Bob vydá odměny po odečtení poplatků Alici.

V tomto modelu je 32 ETH v protokolu Ethereum zodpovědných za činy Alice i Boba — dvou lidí, kteří by potenciálně mohli způsobit penalizaci tohoto ETH. Token je zatížen dvěma různými sadami pravidel protokolu.

**Dotaz z publika:** Když stakujete ETH v protokolu Ethereum, protokol vám musí dát něco, co pak předložíte — co je to něco?

V této nativní verzi Alice stakuje a má to, čemu se říká pověření k výběru z ekosystému Etherea. Toto pověření k výběru může být nasměrováno na kontrakt na Ethereu, který řeší druhou vrstvu stakingu. Je to kontrakt, který kontroluje aktiva, když je vyberete z Etherea — je to jako úschova nevyžadující důvěru v chytrém kontraktu, který vynucuje druhou vrstvu penalizačních postihů.

Proč se to nazývá „nativní“? Protože Alice stále komunikuje přímo s Ethereem — její stake je 32 ETH, které vlastní a které se používají k zabezpečení vrstvy konsensu Etherea.

#### Nenativní restaking (10:57) {#non-native-restaking-1057}

Vlastní restaking v nenativním prostředí: Alice komunikuje pouze s protokolem „Retheum“. Neprovozuje uzel na Ethereu. Restakuje — ačkoli dávám „re“ do uvozovek, protože ve skutečnosti nerestakuje, je to v první řadě staking. Jediný důvod, proč se to nazývá restaking, je ten, že to probíhá prostřednictvím protokolu, který usnadňuje i jiné typy restakingu.

Vezme nenativní tokeny — může to být USDC, eurový stablecoin, zabalený Bitcoin, cokoli — poskytne je jako ekonomické zabezpečení a odolnost proti Sybil útokům protokolu a získává odměny. Tím se restaking nově definuje jako tržiště pro decentralizovanou důvěru, kde důvěra odkazuje na ekonomickou hodnotu ohroženého kapitálu.

Delegovaný restaking s nenativními tokeny se řídí stejným vzorem — Alice deleguje prostřednictvím Boba a dostává odměny po odečtení poplatků.

#### Penalizace a restaking (13:55) {#slashing-and-restaking-1355}

Než se dostaneme k likviditě, promluvme si o penalizaci. V normálním režimu penalizace Alice stakuje v protokolu Ethereum. Pokud udělá něco, co protokol považuje za špatné — například ekvivokaci, kdy použije svůj kryptografický klíč k podepsání dvou informací, které jsou ve vzájemném rozporu — je to objektivní chyba. Každý si může ověřit, že oba podpisy podepsala Alice, a to je dostatečný důkaz k penalizaci jejích tokenů.

Jak se vzájemně ovlivňují restaking a penalizace? V nejjednodušší verzi — vlastní restaking s nativním aktivem — Alice stakuje do Etherea a také restakuje prostřednictvím „Retheum“. Pokud Alice nadále plní svou práci na protokolu „Retheum“, ale dopustí se ekvivokace na Ethereu, máme tu problém: je penalizována na Ethereu, ale „Retheum“ nezaznamenalo nic, co by jí bylo možné přičíst a co by bylo podle jejich pravidel špatně. Mezi oběma protokoly musí probíhat nějaká komunikace.

Tento směr komunikace je vlastně docela snadný, protože „Retheum“ je chytrý kontrakt na Ethereu — může číst ze stavu Etherea a říct „tento validátor byl podle Etherea penalizován“, takže na protokolu druhého řádu je Alice penalizována také.

Druhý směr je těžší. Pokud by byla Alice penalizována na restakovací platformě, Ethereum by o tom muselo být informováno. Ethereum je však záměrně nevšímavé ke všemu, co se děje na jeho vrstvě kontraktů z hlediska mechanismu konsensu.

**Dotaz z publika:** Proč by na tom záleželo? Ethereum potřebuje stake pro to, co dělá, ale restakovaná částka je derivátem originálu.

Problém je v tom, že pokud je Alice penalizována na restakovací platformě, ve skutečnosti už tento stake nevlastní. Může si na protokolu Ethereum dělat, co chce, aniž by byl v ohrožení nějaký skutečný kapitál — což je vůbec hlavní smysl toho, proč se stake používá. Je to, jako byste používali peníze na dvě věci, na jedné věci zmizely a ta druhá věc si musí uvědomit, že ty peníze už nejsou vaše. V určitém smyslu to má stále ekonomickou hodnotu, ale vy to neovládáte — takže je vám jedno, co se s tím stane, protože už je to pryč.