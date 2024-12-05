---
title: Optimistické rollupy
description: Úvod do optimistických rollapů – řešení pro škálování, které používá komunita Etherea.
lang: cs
---

Optimistické rollupy jsou protokoly druhé vrstvy (L2) navržené k rozšíření propustnosti základní vrstvy Etherea. Snižují výpočetní zátěž na hlavním řetězci Ethereua tím, že zpracovávají transakce mimo řetězec, což vede k významnému zlepšení rychlosti jejich zpracování. Na rozdíl od jiných škálovacích řešení, jako jsou [sidechainy](/developers/docs/scaling/sidechains/), využívají optimistické rollupy bezpečnost Mainnetu tím, že zveřejňují výsledky transakcí na řetězci, podobně jako [plasma chainy](/developers/docs/scaling/plasma/), které také ověřují transakce na Ethereu pomocí důkazů podvodů, ale ukládají data transakcí jinde.

Protože výpočty jsou pomalou a nákladnou součástí používání Etherea, mohou optimistické rollupy nabídnout 10x až 100x lepší škálovatelnost. Optimistické rollupy také zapisují transakce na Ethereum jako `calldata` nebo v [blobech](/roadmap/danksharding/), což uživatelům snižuje náklady na transakce.

## Předpoklady {#prerequisites}

Měli byste si přečíst a porozumět našim stránkám o [škálování Etherea](/developers/docs/scaling/) a [druhé vrstvě](/layer-2/).

## Co je to optimistický rollup? {#what-is-an-optimistic-rollup}

Optimistický rollup je přístup ke škálování Etherea, který zahrnuje přesun výpočtů a ukládání stavu mimo řetězec. Optimistické rollupy provádějí transakce mimo Ethereum, ale zveřejňují data transakcí na Mainnetu jako `calldata` nebo v [blobech](/roadmap/danksharding/).

Operátoři optimistických rollupů seskupují více transakcí mimo řetězec do velkých balíčků, které následně odesílají na Ethereum. Tento přístup umožňuje rozložit fixní náklady mezi více transakcí v každém balíčku, což snižuje poplatky pro koncové uživatele. Optimistické rollupy ke snížení množství dat zveřejňovaných na Ethereum využívají i kompresní techniky.

Optimistické rollupy jsou považovány za „optimistické“, protože předpokládají, že transakce mimo řetězec jsou platné a nezveřejňují důkazy o platnosti balíčků transakcí zveřejněných na řetězci. Tím se optimistické rollupy liší od rollupů s [nulovou znalostí (zero-knowledge rollups)](/developers/docs/scaling/zk-rollups), které zveřejňují kryptografické důkazy o platnosti transakcí mimo řetězec.

Místo toho se optimistické rollupy spoléhají na schéma prokázání podvodu (fraud-proving scheme), aby zjistily případy, kdy nejsou transakce správně vypočteny. Poté, co rollup odešle balíček na Ethereum, začne běžet časové okno (nazývané doba výzvy), během kterého může kdokoliv zpochybnit výsledky transakce rollupu vypočtením [důkazu podvodu](/glossary/#fraud-proof).

Pokud důkaz podvodu uspěje, protokol rollupu transakce znovu provede a podle toho aktualizuje stav rollupu. Dalším důsledkem úspěšného důkazu podvodu je, že sekvencer odpovědný za zahrnutí nesprávně provedené transakce do bloku obdrží trest.

Pokud balíček rollupu zůstane bez výzvy (tj. všechny transakce jsou správně provedeny) po skončení časového okna, je považován za platný a přijatý na Ethereum. Ostatní mohou nadále stavět na nepotvrzeném bloku rollupu, ale s podmínkou: Výsledky transakcí budou zrušeny, pokud budou založeny na nesprávně provedené transakci.

## Jak optimistické rollupy interagují s Ethereum? {#optimistic-rollups-and-Ethereum}

Optimistické rollupy jsou [řešení pro škálování mimo řetězec](/developers/docs/scaling/#off-chain-scaling) navržená k provozu nad Ethereum. Každý optimistický rollup je spravován sadou smart kontraktů nasazených na síti Ethereum. Optimistické rollupy zpracovávají transakce mimo hlavní řetězec Ethereum, ale odesílají transakce mimo řetězec (v balíčcích) do rollupového kontraktu na řetězci. Stejně jako blockchain Ethereum je tento záznam transakcí neměnný a tvoří „optimistický rollupový řetězec“.

Architektura optimistického rollupu se skládá z následujících částí:

**On-chain kontrakty**: Provoz optimistických rollupů je řízen smart kontrakty běžícími na Ethereu. To zahrnuje kontrakty, které ukládají bloky rollupu, monitorují aktualizace stavu na rollupu a sledují vklady uživatelů. V tomto smyslu slouží Ethereum jako základní vrstva nebo „vrstva 1“ pro optimistické rollupy.

**Off-chain virtuální stroj (VM)**: Ačkoliv kontrakty spravující protokol optimistických rollupů běží na Ethereu, protokol rollupu provádí výpočty a ukládání stavu na jiném virtuálním stroji, odděleném od [Virtuálního stroje Etherea](/developers/docs/evm/). Off-chain VM je místem, kde žijí aplikace a kde jsou prováděny změny stavu; slouží jako horní vrstva nebo „vrstva 2“ pro optimistický rollup.

Protože optimistické rollupy jsou navrženy tak, aby spouštěly programy buď psané, nebo kompilované pro EVM, off-chain VM obsahuje mnoho specifikací návrhu EVM. Navíc důkazy podvodu vypočítané na řetězci umožňují síti Ethereum vynucovat platnost změn stavů vypočítaných v off-chain VM.

Optimistické rollupy jsou popisovány jako „hybridní škálovací řešení“, protože, ačkoliv existují jako samostatné protokoly, jejich bezpečnostní vlastnosti jsou odvozeny od Etherea. Ethereum zaručuje kromě jiného správnost výpočtů mimo řetězec a dostupnost dat za těmito výpočty. To činí optimistické rollupy bezpečnějšími než čistě off-chain škálovací protokoly (např. [sidechainy](/developers/docs/scaling/sidechains/)), které se pro zajištění bezpečnosti nespoléhají na Ethereum.

Optimistické rollupy se spoléhají na hlavní protokol Etherea z následujících důvodů:

### Dostupnost dat {#data-availability}

Jak již bylo zmíněno, optimistické rollupy zveřejňují data transakcí na Ethereu jako `calldata` nebo v [blobech](/roadmap/danksharding/). Jelikož je exekuce řetězce rollupu založena na odeslaných transakcích, kdokoli může využít tyto informace – uložené na základní vrstvě Etherea – k vykonání stavu rollupu a ověření správnosti změn stavů.

[Dostupnost dat](/developers/docs/data-availability/) je klíčová, protože bez přístupu k datům o stavu nemohou vyzyvatelé sestavit důkaz podvodu, aby zpochybnili neplatné operace rollupu. Díky tomu, že Ethereum poskytuje dostupnost dat, riziko, že se operátorům rollupů podaří uniknout se zlomyslnými činy (např. odeslání neplatných bloků), se snižuje.

### Odolnost proti cenzuře {#censorship-resistance}

Optimistické rollupy se také spoléhají na Ethereum v otázce odolnosti proti cenzuře. V optimistickém rollupu je centralizovaná entita (operátor) odpovědná za zpracování transakcí a odesílání bloků rollupu na Ethereum. To má několik důsledků:

- Operátoři rollupu mohou cenzurovat uživatele tím, že se zcela odpojí, nebo tím, že odmítnou vytvářet bloky, které obsahují určité transakce.

- Operátoři rollupu mohou zabránit uživatelům v možnosti vybrat prostředky uložené v kontraktu rollupu tím, že zadrží data stavu, která jsou nezbytná pro důkazy o vlastnictví. Zadržování dat stavu může také uživatelům skrýt stav rollupu a zabránit jim v interakci s rollupem.

Optimistické rollupy řeší tento problém tím, že nutí operátory zveřejňovat data spojená s aktualizacemi stavu na Ethereu. Zveřejňování dat rollupu na řetězci má následující výhody:

- Pokud se operátor optimistického rollupu odpojí nebo přestane vytvářet balíčky transakcí, může jiný síťový uzel použít dostupná data k reprodukci posledního stavu rollupu a pokračovat ve vytváření bloků.

- Uživatelé mohou použít data transakcí k vytvoření Merkle důkazů prokázání vlastnictví prostředků a vybrat svá aktiva z rollupu.

- Uživatelé mohou také odesílat své transakce na L1 místo na sekvencer, v takovém případě musí sekvencer transakci zahrnout do určitého časového limitu, aby mohl pokračovat ve vytváření platných bloků.

### Vyrovnání {#settlement}

Další rolí Etherea v kontextu optimistických rollupů je role vyrovnávací vrstvy. Ta ukotvuje celý ekosystém blockchainu, zajišťuje bezpečnost a poskytuje objektivní finalitu v případě, že dojde ke sporu na jiném řetězci (v tomto případě optimistických rollupech), který vyžaduje arbitráž.

Ethereum Mainnet poskytuje centrum pro ověřování důkazů podvodu a řešení sporů na optimistických rollupech. Navíc jsou transakce provedené na rollupu považovány za finální až _poté_, co je blok rollupu přijat na Ethereum. Jakmile je transakce rollupu zapsána do základní vrstvy Etherea, nelze ji vrátit zpět (s výjimkou velmi nepravděpodobného případu reorganizace řetězce).

## Jak fungují optimistické rollupy? {#how-optimistic-rollups-work}

### Exekuce a agregace transakcí {#transaction-execution-and-aggregation}

Uživatelé odesílají transakce „operátorům“, což jsou síťové uzly odpovědné za zpracování transakcí na optimistickém rollupu. Operátor, také známý jako „validátor“ nebo „agregátor“, agreguje transakce, komprimuje podkladová data a zveřejňuje bloky na Ethereu.

Ačkoli se validátorem může stát kdokoli, validátoři optimistických rollupů musí před vytvořením bloků složit zálohu, podobně jako v [systému proof of stake](/developers/docs/consensus-mechanisms/pos/). Z této zálohy může být zaplacena pokuta, pokud validátor zveřejní neplatný blok nebo postaví na starém, ale neplatném bloku (i když jeho blok platný je). Tímto způsobem optimistické rollupy využívají kryptografické ekonomické pobídky k zajištění poctivého chování validátorů.

Ostatní validátoři na řetězci optimistického rollupu mají za úkol exekuovat odeslané transakce pomocí své kopie stavu rollupu. Pokud se konečný stav validátora liší od navrhovaného stavu operátora, mohou zahájit výzvu a vypočítat důkaz podvodu.

Některé optimistické rollupy mohou upustit od systému validátorů bez povolení a k exekuci řetězce použít jediný „sekvencer“. Stejně jako validátor zpracovává sekvencer transakce, vytváří bloky rollupu a odesílá transakce rollupu na řetězec L1 (Ethereum).

Sekvencer se liší od běžného operátora rollupu tím, že má větší kontrolu nad pořadím transakcí. Také má prioritní přístup k řetězci rollupu a je jediným subjektem, který je oprávněn odesílat transakce do on-chain kontraktu. Transakce ze síťových uzlů, které nejsou sekvencery, nebo od běžných uživatelů jsou jednoduše zařazeny do samostatné fronty, dokud je sekvencer nezahrne do nového balíčku.

#### Odesílání bloků rollupu na Ethereum {#submitting-blocks-to-ethereum}

Jak již bylo zmíněno, operátor optimistického rollupu seskupuje transakce mimo řetězec do balíčku a odesílá jej na Ethereum za účelem ověření. Tento proces zahrnuje kompresi dat souvisejících s transakcemi a jejich zveřejnění na Ethereu jako `calldata` nebo v blobech.

`Calldata` je nemodifikovatelná a nepersistentní oblast ve smart kontraktu, která se většinou chová jako [paměť](/developers/docs/smart-contracts/anatomy/#memory). Zatímco `calldata` zůstávají na řetězci jako součást [historických záznamů blockchainu](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs), nejsou uložena jako součást stavu Etherea. Protože `calldata` se nedotýkají žádné části stavu Etherea, jsou levnější než stav pro ukládání dat na řetězci.

Klíčové slovo `calldata` se také používá v jazyce Solidity k předání argumentů funkci smart kontraktu během jeho exekuce. `calldata` identifikuje funkci, která je volána během transakce, a drží vstupy pro tuto funkci ve formě libovolné sekvence bytů.

V kontextu optimistických rollupů se `calldata` používá k odesílání komprimovaných dat transakcí do on-chain kontraktu. Operátor rollupu přidá nový balíček tím, že zavolá požadovanou funkci v kontraktu rollupu a předá komprimovaná data jako argumenty funkce. Použití `calldata` snižuje poplatky pro uživatele, protože většina nákladů, které rollupy přinášejí, pochází z ukládání dat na řetězci.

Zde je [příklad](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) odeslání balíčku rollupu, který ukazuje, jak tento koncept funguje. Sekvencer vyvolal `metodu appendSequencerBatch()` a předal komprimovaná data transakcí jako vstupy pomocí `calldata`.

Některé rollupy nyní používají k odesílání balíčků transakcí na Ethereum bloby.

Bloby jsou nemodifikovatelné a nepersistentní (stejně jako `calldata`), ale jsou odstraněny z historie po ~18 dnech. Pro více informací o blobech viz [Danksharding](/roadmap/danksharding).

### Závazky stavu {#state-commitments}

V každém časovém bodě je stav optimistického rollupu (účty, zůstatky, kód kontraktu atd.) organizován jako [Merkle tree](/whitepaper/#merkle-trees), nazývaný „strom stavu“. Kořen tohoto Merkle tree (state root), který odkazuje na nejnovější stav rollupu, je hashován a uložen v kontraktu rollupu. Každý přechod stavu na řetězci produkuje nový stav rollupu, ke kterému se operátor zavazuje tím, že vypočítá nový state root.

Operátor je povinen odeslat jak staré, tak nové state roots při zveřejňování balíčků. Pokud starý state root odpovídá stávajícímu state rootu v on-chain kontraktu, je vyřazen a nahrazen novým state rootem.

Operátor rollupu je také povinen se zavázat k Merkle kořeni samotného balíčku transakcí. To komukoliv umožňuje prokázat zahrnutí transakce do balíčku (na L1) předložením [Merkle důkazu](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Závazky stavu, zejména state roots, jsou nezbytné pro prokázání správnosti změn stavu v optimistickém rollupu. Rollupový kontrakt přijímá nové state rooty od operátorů okamžitě po jejich odeslání, ale později může odstranit neplatné state rooty, aby obnovil správný stav rollupu.

### Prokazování podvodu {#fraud-proving}

Jak bylo vysvětleno, optimistické rollupy umožňují komukoli zveřejňovat bloky bez poskytnutí důkazů o platnosti. Aby se však zajistilo, že řetězec zůstane bezpečný, optimistické rollupy určují časové okno, během kterého může kdokoliv zpochybnit změnu stavu. Bloky rollupu se proto nazývají „tvrzení“, protože jejich platnost může kdokoliv zpochybnit.

Pokud někdo zpochybní tvrzení, protokol rollupu zahájí výpočet důkazu podvodu. Každý typ důkazu podvodu je interaktivní – někdo musí zveřejnit tvrzení, než jej může někdo jiný zpochybnit. Rozdíl spočívá v tom, kolik kol interakce je k výpočtu důkazu podvodu vyžadováno.

Schémata interaktivního prokazování v jednom kole znovu přehrají sporné transakce na L1, aby detekovala neplatná tvrzení. Protokol rollupu napodobuje opětovné provedení sporné transakce na L1 (Ethereum) pomocí verifikátoru, přičemž vypočítaný state root určuje, kdo vyhraje výzvu. Pokud má vyzyvatel pravdu ohledně správného stavu rollupu, operátor je penalizován stržením určité částky z jeho zálohy.

Opětovné provádění transakcí na L1 k detekci podvodu však vyžaduje zveřejnění závazků stavu pro jednotlivé transakce a zvyšuje množství dat, která musí rollupy na řetězci zveřejnit. Opakování transakcí také přináší významné náklady na palivo. Z těchto důvodů přecházejí optimistické rollupy na interaktivní prokazování ve více kolech, které dosahuje stejného cíle (tj. detekování neplatných operací rollupu) s větší efektivitou.

#### Vícekolové interaktivní prokazování {#multi-round-interactive-proving}

Vícekolové interaktivní prokazování zahrnuje protokol vzájemného dialogu mezi prosazovatelem a vyzyvatelem, který je řízen verifikačním kontraktem na L1, jenž nakonec rozhoduje o tom, která strana lže. Po zpochybnění tvrzení uzlem L2 je asserter povinen rozdělit sporné tvrzení na dvě stejné poloviny. Každé jednotlivé tvrzení v tomto případě obsahuje stejné množství kroků výpočtu jako druhé.

Vyzyvatel si poté vybere, které tvrzení chce zpochybnit. Proces rozdělování (nazývaný „bisekční protokol“) pokračuje, dokud obě strany nezpochybňují tvrzení o _jediném_ kroku provádění. V tomto okamžiku kontrakt na L1 vyřeší spor vyhodnocením instrukce (a jejího výsledku), aby odhalil podvodníka.

Asserter je povinen předložit „jednokrokový důkaz“ ověřující platnost sporného jednokrokového výpočtu. Pokud asserter neposkytne tento důkaz nebo pokud L1 verifikátor považuje důkaz za neplatný, prohrává výzvu.

Uvádíme také několik poznámek k tomuto typu důkazu podvodu:

1. Vícekolové interaktivní prokazování podvodu je považováno za efektivní, protože minimalizuje práci, kterou musí L1 řetězec vykonat při arbitráži sporu. Místo replikace celé transakce musí L1 řetězec znovu provést pouze jeden krok v exekuci rollupu.

2. Bisekční protokoly snižují množství dat zveřejněných na řetězi (není třeba zveřejňovat závazky stavu pro každou transakci). Kromě toho nejsou transakce optimistických rollupů omezeny limitem paliva Etherea. Naopak při opětovném provádění transakcí musí optimistické rollupy zajistit, aby transakce na L2 měly nižší limit paliva, aby mohly napodobovat svoji exekuci v rámci jedné transakce na Ethereu.

3. Část zálohy zlovolného prosazovatele je převedena vyzyvateli, zatímco druhá část je spálena. Tím se předchází tajné dohodě mezi validátory; pokud by dva validátoři kolaborovali a zahájili falešné výzvy, stále by ztratili značnou část celé zástavy.

4. Vícekolové interaktivní prokazování vyžaduje, aby obě strany (prosazovatel a vyzyvatel) podnikly kroky ve stanoveném časovém okně. Pokud jedna strana nestihne jednat před vypršením lhůty, výzvu prohrává.

#### Proč jsou důkazy podvodu důležité pro optimistické rollupy {#fraud-proof-benefits}

Důkazy podvodu jsou důležité, protože umožňují dosažení _důvěryhodné finality_ v optimistických rollupech. Důvěryhodná finalita je vlastnost optimistických rollupů, která zaručuje, že transakce – pokud je platná – bude nakonec potvrzena.

Zlovolné uzly se mohou pokusit o zdržení potvrzení platného bloku rollupu zahájením falešných výzev. Nicméně důkazy podvodu nakonec potvrdí platnost bloku rollupu a vedou k jeho potvrzení.

Tato vlastnost souvisí také s další bezpečnostní vlastností optimistických rollupů: platnost řetězce závisí na existenci _jednoho_ poctivého uzlu. Poctivý uzel může řetězec správně rozvíjet buď tím, že zveřejní platná tvrzení, nebo zpochybní neplatná tvrzení. V každém případě zlovolné uzly, které vstoupí do sporu s poctivým uzlem, během procesu prokazování podvodu přijdou o své zástavy.

### Interoperabilita mezi L1 a L2 {#l1-l2-interoperability}

Optimistické rollupy jsou navrženy pro interoperabilitu s Ethereum Mainnetem a umožňují uživatelům přenášet zprávy a libovolná data mezi L1 a L2. Jsou také kompatibilní s EVM, takže můžete přenést [existující dappky](/developers/docs/dapps/) na optimistické rollupy nebo pomocí vývojových nástrojů Etherea vytvořit nové dappky.

#### 1. Pohyb aktiv {#asset-movement}

##### Vstup do rollupu

Pro použití optimistického rollupu uživatelé vkládají ETH, ERC-20 tokeny a další přijatá aktiva do kontraktu [přemostění](/developers/docs/bridges/) příslušného rollupu na L1. Toto přemostění přenese transakci na L2, kde je ekvivalentní množství aktiv vyraženo a odesláno na vybranou adresu uživatele na optimistickém rollupu.

Uživatelem generované transakce (jako je vklad L1 > L2) jsou obvykle zařazeny do fronty, dokud je sekvencer znovu neodešle do kontraktu rollupu. Nicméně aby se zachovala odolnost proti cenzuře, optimistické rollupy umožňují uživatelům odeslat transakci přímo do on-chain kontraktu rollupu, pokud byla zpožděna o více než je maximální povolený čas.

Některé optimistické rollupy přijímají jednodušší přístup k zabránění cenzurování uživatelů ze strany sekvencerů. V takovém případě je blok definován všemi transakcemi odeslanými do L1 kontraktu od předchozího bloku (např. vklady) spolu s transakcemi zpracovanými na řetězci rollupu. Pokud sekvencer ignoruje transakci na L1, zveřejní (prokazatelně) nesprávný state root; proto sekvencery nemohou zpožďovat uživatelem generované zprávy, jakmile jsou zveřejněny na L1.

##### Výstup z rollupu

Výběr z optimistického rollupu na Ethereu je složitější kvůli schématu prokazování podvodu. Pokud uživatel zahájí transakci L2 > L1 k výběru prostředků uložených na L1, musí počkat, než vyprší doba, po kterou je možné zahájit výzvu – trvající zhruba sedm dní. Nicméně samotný proces výběru je poměrně přímočarý.

Po zahájení požadavku na výběr na L2 rollupu je transakce zahrnuta do dalšího balíčku, zatímco aktiva uživatele na rollupu jsou spálena. Jakmile je balíček zveřejněn na Ethereu, může uživatel vypočítat Merkle důkaz prokazující zahrnutí jejich výstupní transakce do bloku. Poté už jen zbývá počkat, až uplyne doba zpoždění, aby mohla být transakce na L1 finalizována a prostředky vybrány na Mainnet.

Aby se uživatelé optimistických rollupů vyhnuli čekání na týdenní výběr prostředků na Ethereum, mohou využít **poskytovatele likvidity** (LP). Poskytovatel likvidity převezme vlastnictví čekajícího výběru na L2 a vyplatí uživateli prostředky na L1 (za poplatek).

Poskytovatelé likvidity mohou před uvolněním prostředků ověřit platnost požadavku na výběr uživatele (tím, že sami exekuují řetězec). Tímto způsobem mají jistotu, že transakce bude nakonec potvrzena (tj. dojde k dosažení důvěryhodné finality).

#### 2. Kompatibilita s EVM {#evm-compatibility}

Pro vývojáře je výhodou optimistických rollupů jejich kompatibilita – nebo ještě lépe, ekvivalence – s [Virtuálním strojem Etherea (EVM)](/developers/docs/evm/). Rollupy kompatibilní s EVM splňují specifikace uvedené v [Ethereum Yellow Paperu](https://ethereum.github.io/yellowpaper/paper.pdf) a podporují EVM na úrovni bytekódu.

Kompatibilita s EVM v optimistických rollupech přináší následující výhody:

i. Vývojáři mohou migrovat existující smart kontrakty na Ethereu na řetězce optimistických rollupů, aniž by museli rozsáhle upravovat zdrojový kód. To může ušetřit vývojovým týmům čas při nasazování smart kontraktů Etherea na L2.

ii. Vývojáři a projektové týmy používající optimistické rollupy mohou využívat infrastrukturu Etherea. To zahrnuje programovací jazyky, knihovny kódu, nástroje pro testování, klientský software, infrastrukturu pro nasazení a podobně.

Použití existujících nástrojů je důležité, protože tyto nástroje byly během let důkladně auditovány, laděny a vylepšovány. Rovněž to eliminuje potřebu, aby se vývojáři Etherea učili pracovat s úplně novou vývojovou sadou.

#### 3. Meziblockchainové volání kontraktů {#cross-chain-contract-calls}

Uživatelé (externě vlastněné účty) interagují s kontrakty na L2 tak, že odešlou transakci do kontraktu rollupu nebo to za ně udělá sekvencer či validátor. Optimistické rollupy také umožňují kontraktům na Ethereu interagovat s kontrakty na L2 pomocí kontraktů přemostění, které přenášejí zprávy a data mezi L1 a L2. To znamená, že můžete naprogramovat L1 kontrakt na Ethereum Mainnetu, aby volal funkce náležící kontraktům na L2 optimistickém rollupu.

Meziblockchainové volání kontraktů probíhá asynchronně – tj. volání je zahájeno, ale je vykonáno později. To se liší od volání mezi dvěma kontrakty na Ethereu, kde volání produkuje výsledky okamžitě.

Příkladem meziblockchainového volání kontraktů je dříve popsaný vklad tokenů. Kontrakt na L1 uschová tokeny uživatele a pošle zprávu spárovanému kontraktu na L2, aby na rollupu vydal odpovídající množství tokenů.

Jelikož cross-chain volání zpráv vede k exekuci kontraktu, odesílatel je obvykle povinen pokrýt [náklady na palivo](/developers/docs/gas/) za tento výpočet. Doporučuje se nastavit vysoký limit paliva, aby se předešlo selhání transakce na cílovém řetězci. Scénář přemostění tokenů je dobrým příkladem; pokud L1 část transakce (vklad tokenů) funguje, ale L2 část (vydání nových tokenů) selže kvůli nízkému limitu paliva, vklad se stává nevratně ztraceným.

Je třeba poznamenat, že zprávy L2 > L1 mezi kontrakty musí počítat se zpožděním (zprávy L1 > L2 jsou obvykle vykonány po několika minutách). To proto, že zprávy zaslané na Mainnet z optimistického rollupu nelze vykonat, dokud neuplyne okno, během kterého je možné podat výzvu.

## Jak fungují poplatky na optimistických rollupech? {#how-do-optimistic-rollup-fees-work}

Optimistické rollupy používají systém poplatků za palivo podobně jako Ethereum, aby bylo možné vyčíslit, kolik uživatelé platí za transakci. Poplatky účtované u optimistických rollupů závisí na následujících složkách:

1. **Zápis stavu**: Optimistické rollupy posílají data transakcí a hlavičky bloků (sestávající z hashe hlavičky předchozího bloku, state rootu a batch rootu) na Ethereum jako `blob` nebo „velký binární objekt“. [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) zavedl nákladově efektivní řešení pro zahrnutí dat na řetězec. `Blob` je nové pole transakce, které umožňuje rollupům zveřejnit komprimovaná data o přechodu stavu na Ethereum L1. Na rozdíl od `calldata`, které zůstává na řetězi trvale, jsou bloby krátkodobé a mohou být odstraněny z klientů po [4 096 epochách](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (přibližně 18 dnech). Použitím blobů pro zveřejnění balíčků komprimovaných transakcí mohou optimistické rollupy výrazně snížit náklady na zápis transakcí na L1.

2. **Palivo spotřebované blobem**: Transakce s blobem používají dynamický mechanismus poplatků podobný tomu, který byl zaveden [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Poplatek za palivo pro typ-3 transakce zohledňuje základní poplatek za bloby, který je určen sítí na základě poptávky po blobovém prostoru a využití blobového prostoru transakcí, která je odesílána.

3. **Poplatky operátorů L2**: Toto je částka zaplacená síťovým uzlům rollupu jako kompenzace za výpočetní náklady vzniklé při zpracování transakcí, podobně jako poplatky za palivo na Ethereu. Uzel rollupu účtuje nižší transakční poplatky, protože L2 má vyšší kapacitu zpracování a není konfrontován s přetížením sítě, které nutí validátory na Ethereu upřednostňovat transakce s vyššími poplatky.

Optimistické rollupy využívají několik mechanismů ke snížení poplatků pro uživatele, včetně seskupování transakcí a komprese `calldata` pro snížení nákladů na publikaci dat. Pro přehled v reálném čase o tom, kolik stojí používání optimistických rollupů na Ethereu, se můžete podívat na [L2 fee tracker](https://l2fees.info/).

## Jak optimistické rollupy škálují Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Jak bylo vysvětleno, optimistické rollupy zveřejňují komprimovaná data transakcí na Ethereum, aby zajistily dostupnost dat. Schopnost komprimovat data zveřejněná na řetězi je klíčová pro škálování propustnosti na Ethereu s optimistickými rollupy.

Hlavní řetězec Etherea klade limity na množství dat, která mohou být v blocích, což je vyjádřeno v jednotkách paliva ([průměrná velikost bloku](/developers/docs/blocks/#block-size) je 15 milionů paliva). Zatímco toto omezuje množství paliva, které může každá transakce použít, také to znamená, že můžeme zvýšit počet transakcí zpracovaných na blok snížením množství dat souvisejících s transakcemi – což přímo zlepšuje škálovatelnost.

Optimistické rollupy používají k dosažení komprese dat transakcí a zlepšení rychlosti TPS (transakcí za sekundu) několik technik. Například tento [článek](https://vitalik.eth.limo/general/2021/01/05/rollup.html) porovnává data generovaná základní uživatelskou transakcí (posílání etheru) na Mainnetu a množství dat, která generuje stejná transakce na rollupu:

| Parametr                | Ethereum (L1)         | Rollup (L2)   |
| ----------------------- | --------------------- | ------------- |
| Jedinečné číslo (nonce) | ~3                    | 0             |
| Cena paliva             | ~8                    | 0–0,5         |
| Palivo                  | 3                     | 0–0,5         |
| Pro                     | 21                    | 4             |
| Hodnota                 | 9                     | ~3            |
| Podpis                  | ~68 (2 + 33 + 33)     | ~0,5          |
| Od                      | 0 (získáno z podpisu) | 4             |
| **Celkem**              | **~112 bajtů**        | **~12 bajtů** |

Provádění hrubých výpočtů na těchto číslech může ukázat, jaké zlepšení škálovatelnosti optimistické rollupy poskytují:

1. Cílová velikost pro každý blok je 15 milionů jednotek paliva a ověřit jeden bajt dat stojí 16 jednotek paliva. Vydělení průměrné velikosti bloku 16 jednotkami paliva (15 000 000/16) ukazuje, že průměrný blok může obsahovat **937 500 bajtů dat**.
2. Pokud základní transakce rollupu spotřebuje 12 bajtů, pak průměrný blok Etherea může zpracovat **78 125 transakcí rollupu** (937 500/12) nebo **39 balíčků rollupu** (pokud každý balíček obsahuje průměrně 2 000 transakcí).
3. Pokud je nový blok na Ethereu produkován každých 15 sekund, pak by rychlost zpracování rollupu činila přibližně **5 208 transakcí za sekundu**. To se vypočítá tak, že se počet základních transakcí rollupu, které může blok Etherea obsahovat (**78 125)**, vydělí průměrnou dobou bloku (**15 sekund**).

Toto je poměrně optimistický odhad, protože transakce optimistického rollupu nemohou tvořit celý blok na Ethereu. Nicméně to může poskytnout hrubou představu o tom, jaké výhody v oblasti škálovatelnosti mohou optimistické rollupy uživatelům Etherea nabídnout (aktuální implementace nabízejí až 2 000 TPS).

Zavedení [datového shardingu](/roadmap/danksharding/) na Ethereu by mělo zlepšit škálovatelnost optimistických rollupů. Protože transakce rollupu musí sdílet prostor bloku s ostatními netransakcemi rollupu, jejich zpracovatelská kapacita je omezena propustností dat na hlavním řetězci Etherea. Danksharding zvýší prostor dostupný pro L2 řetězce k publikaci dat na blok, využívající levnější, dočasné „blobové“ úložiště místo drahého, trvalého `CALLDATA`.

### Výhody a nevýhody optimistických rollupů {#optimistic-rollups-pros-and-cons}

| Plusy                                                                                                                                                                | Minusy                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nabízejí masivní zlepšení škálovatelnosti, aniž by obětovaly bezpečnost nebo důvěryhodnost.                                                                          | Zpoždění finality transakcí kvůli potenciálním výzvám kvůli podvodům.                                                                                      |
| Data transakcí jsou uložena na vrstvě 1, což zlepšuje transparentnost, bezpečnost, odolnost proti cenzuře a decentralizaci.                                          | Centralizovaní operátoři rollupu (sekvencery) mohou ovlivnit pořadí transakcí.                                                                             |
| Prokázání podvodu zaručuje důvěryhodnou finalitu a umožňuje poctivým minoritám zabezpečit řetězec.                                                                   | Pokud neexistují poctivé síťové uzly, může zlovolný operátor ukrást prostředky zveřejněním neplatných bloků a stavu.                                       |
| Výpočet důkazů podvodu je přístupný všem běžným uzlům L2, na rozdíl od důkazů platnosti (používaných v ZK-rollupech), které vyžadují speciální hardware.             | Bezpečnostní model se spoléhá na alespoň jeden poctivý uzel, který provádí transakce rollupu a podává důkazy podvodu ke zpochybnění neplatných změn stavu. |
| Rollupy těží z „důvěryhodného života“ (kdokoli může přinutit řetězec, aby pokračoval tím, že vykoná transakce a zveřejní tvrzení).                                   | Uživatelé musí počkat, až uplyne týdenní období pro podání výzvy, než si mohou vybrat prostředky zpět na Ethereum.                                         |
| Optimistické rollupy se v otázce zvýšení bezpečnosti řetězce spoléhají na dobře navržené kryptografické ekonomické pobídky.                                          | Rollupy musí zveřejňovat všechna data transakcí na řetězci, což může zvýšit náklady.                                                                       |
| Kompatibilita s EVM a Solidity umožňuje vývojářům přenášet smart kontrakty nativní na Ethereu na rollupy nebo používat stávající nástroje k vytváření nových dappek. |                                                                                                                                                            |

### Vizualizace optimistických rollupů {#optimistic-video}

Učíte se spíše vizuálně? Podívejte se na video od Finematics, které vysvětluje optimistické rollupy:

<YouTube id="7pWxCklcNsU" start="263" />


## Další čtení o optimistických rollupech

- [Jak fungují optimistické rollupy (kompletní průvodce)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Co je to Blockchain Rollup? Technický úvod](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Zásadní průvodce pro Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Jak skutečně funguje rollup od Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [Hloubkový rozbor OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Co je to Virtuální stroj Optimistic?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
