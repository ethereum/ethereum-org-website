---
title: "Optimistické rollupy"
description: "Úvod do optimistických rollupů – řešení škálování, které používá komunita Etherea."
lang: cs
---

Optimistické rollupy jsou protokoly vrstvy 2 (L2) navržené k rozšíření propustnosti základní vrstvy Etherea. Snižují výpočetní zátěž na hlavním [řetězci Etherea](/) tím, že zpracovávají transakce offchain, což nabízí významné zlepšení rychlosti zpracování. Na rozdíl od jiných řešení škálování, jako jsou [postranní řetězce (sidechains)](/developers/docs/scaling/sidechains/), odvozují optimistické rollupy svou bezpečnost z Mainnetu publikováním výsledků transakcí onchain, nebo [řetězců Plasma](/developers/docs/scaling/plasma/), které také ověřují transakce na Ethereu pomocí důkazů o podvodu, ale ukládají transakční data jinde.

Vzhledem k tomu, že výpočty jsou pomalou a drahou součástí používání Etherea, mohou optimistické rollupy nabídnout až 10–100násobné zlepšení škálovatelnosti. Optimistické rollupy také zapisují transakce do Etherea jako `calldata` nebo v [blobech](/roadmap/danksharding/), což uživatelům snižuje náklady na gas.

## Předpoklady {#prerequisites}

Měli byste si přečíst a porozumět našim stránkám o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2](/layer-2/).

## Co je to optimistický rollup? {#what-is-an-optimistic-rollup}

Optimistický rollup je přístup ke škálování Etherea, který zahrnuje přesun výpočtů a ukládání stavu offchain. Optimistické rollupy provádějí transakce mimo Ethereum, ale odesílají transakční data na Mainnet jako `calldata` nebo v [blobech](/roadmap/danksharding/).

Operátoři optimistických rollupů sdružují více offchain transakcí do velkých dávek před jejich odesláním do Etherea. Tento přístup umožňuje rozložit fixní náklady mezi více transakcí v každé dávce, což snižuje poplatky pro koncové uživatele. Optimistické rollupy také používají kompresní techniky ke snížení množství dat odesílaných do Etherea.

Optimistické rollupy jsou považovány za „optimistické“, protože předpokládají, že offchain transakce jsou platné, a nepublikují důkazy o platnosti pro dávky transakcí odeslané onchain. To odlišuje optimistické rollupy od [rollupů s nulovým vědomím](/developers/docs/scaling/zk-rollups), které publikují kryptografické [důkazy o platnosti](/glossary/#validity-proof) pro offchain transakce.

Optimistické rollupy se místo toho spoléhají na schéma dokazování podvodů k detekci případů, kdy transakce nejsou vypočítány správně. Po odeslání dávky rollupu do Etherea existuje časové okno (nazývané období pro zpochybnění), během kterého může kdokoli zpochybnit výsledky transakce rollupu výpočtem [důkazu o podvodu](/glossary/#fraud-proof).

Pokud je důkaz o podvodu úspěšný, protokol rollupu znovu provede transakci (nebo transakce) a odpovídajícím způsobem aktualizuje stav rollupu. Dalším důsledkem úspěšného důkazu o podvodu je, že sekvencer odpovědný za zahrnutí nesprávně provedené transakce do bloku obdrží penalizaci.

Pokud dávka rollupu zůstane nezpochybněna (tj. všechny transakce jsou provedeny správně) po uplynutí období pro zpochybnění, je považována za platnou a přijata na Ethereu. Ostatní mohou pokračovat ve stavění na nepotvrzeném bloku rollupu, ale s jedním háčkem: výsledky transakcí budou zrušeny, pokud jsou založeny na dříve publikované nesprávně provedené transakci.

## Jak optimistické rollupy interagují s Ethereem? {#optimistic-rollups-and-ethereum}

Optimistické rollupy jsou [offchain řešení škálování](/developers/docs/scaling/#offchain-scaling) postavená tak, aby fungovala nad Ethereem. Každý optimistický rollup je spravován sadou chytrých kontraktů nasazených v síti Ethereum. Optimistické rollupy zpracovávají transakce mimo hlavní řetězec Etherea, ale odesílají offchain transakce (v dávkách) do onchain kontraktu rollupu. Stejně jako blockchain Etherea je tento záznam transakcí neměnný a tvoří „řetězec optimistického rollupu“.

Architektura optimistického rollupu se skládá z následujících částí:

**Onchain kontrakty**: Provoz optimistického rollupu je řízen chytrými kontrakty běžícími na Ethereu. To zahrnuje kontrakty, které ukládají bloky rollupu, monitorují aktualizace stavu na rollupu a sledují vklady uživatelů. V tomto smyslu slouží Ethereum jako základní vrstva neboli „vrstva 1“ pro optimistické rollupy.

**Offchain virtuální stroj (VM)**: Ačkoli kontrakty spravující protokol optimistického rollupu běží na Ethereu, protokol rollupu provádí výpočty a ukládání stavu na jiném virtuálním stroji odděleném od [virtuálního stroje Etherea (EVM)](/developers/docs/evm/). Offchain VM je místo, kde žijí aplikace a kde se provádějí změny stavu; slouží jako horní vrstva neboli „vrstva 2“ pro optimistický rollup.

Vzhledem k tomu, že optimistické rollupy jsou navrženy ke spouštění programů napsaných nebo zkompilovaných pro EVM, offchain VM zahrnuje mnoho specifikací návrhu EVM. Navíc důkazy o podvodu vypočítané onchain umožňují síti Ethereum vynutit platnost změn stavu vypočítaných v offchain VM.

Optimistické rollupy jsou popisovány jako „hybridní řešení škálování“, protože ačkoli existují jako samostatné protokoly, jejich bezpečnostní vlastnosti jsou odvozeny od Etherea. Mimo jiné Ethereum zaručuje správnost offchain výpočtů rollupu a dostupnost dat za těmito výpočty. Díky tomu jsou optimistické rollupy bezpečnější než čistě offchain protokoly škálování (např. [postranní řetězce](/developers/docs/scaling/sidechains/)), které se nespoléhají na bezpečnost Etherea.

Optimistické rollupy se spoléhají na hlavní protokol Etherea v následujících ohledech:

### Dostupnost dat {#data-availability}

Jak již bylo zmíněno, optimistické rollupy odesílají transakční data do Etherea jako `calldata` nebo [bloby](/roadmap/danksharding/). Vzhledem k tomu, že provádění řetězce rollupu je založeno na odeslaných transakcích, kdokoli může tyto informace – ukotvené v základní vrstvě Etherea – použít k provedení stavu rollupu a ověření správnosti přechodů stavu.

[Dostupnost dat](/developers/docs/data-availability/) je kritická, protože bez přístupu ke stavovým datům nemohou zpochybňovatelé konstruovat důkazy o podvodu k napadení neplatných operací rollupu. Tím, že Ethereum poskytuje dostupnost dat, se snižuje riziko, že operátorům rollupu projdou škodlivé činy (např. odesílání neplatných bloků).

### Odolnost vůči cenzuře {#censorship-resistance}

Optimistické rollupy se také spoléhají na Ethereum ohledně odolnosti vůči cenzuře. V optimistickém rollupu je za zpracování transakcí a odesílání bloků rollupu do Etherea zodpovědná centralizovaná entita (operátor). To má určité důsledky:

- Operátoři rollupu mohou cenzurovat uživatele tím, že se zcela odpojí (přejdou offline), nebo tím, že odmítnou produkovat bloky, které obsahují určité transakce.

- Operátoři rollupu mohou uživatelům zabránit ve výběru prostředků vložených do kontraktu rollupu tím, že zadrží stavová data nezbytná pro Merkleovy důkazy vlastnictví. Zadržování stavových dat může také skrýt stav rollupu před uživateli a zabránit jim v interakci s rollupem.

Optimistické rollupy tento problém řeší tím, že nutí operátory publikovat data spojená s aktualizacemi stavu na Ethereu. Publikování dat rollupu onchain má následující výhody:

- Pokud se operátor optimistického rollupu odpojí nebo přestane produkovat dávky transakcí, jiný uzel může použít dostupná data k reprodukci posledního stavu rollupu a pokračovat v produkci bloků.

- Uživatelé mohou použít transakční data k vytvoření Merkleových důkazů prokazujících vlastnictví prostředků a vybrat svá aktiva z rollupu.

- Uživatelé mohou také odeslat své transakce na L1 místo sekvenceru, v takovém případě musí sekvencer zahrnout transakci do určitého časového limitu, aby mohl nadále produkovat platné bloky.

### Vypořádání {#settlement}

Další rolí, kterou Ethereum hraje v kontextu optimistických rollupů, je role vrstvy vypořádání. Vrstva vypořádání ukotvuje celý ekosystém blockchainu, zajišťuje bezpečnost a poskytuje objektivní finalitu, pokud na jiném řetězci (v tomto případě na optimistických rollupech) dojde ke sporu, který vyžaduje arbitráž.

Ethereum Mainnet poskytuje centrum pro optimistické rollupy k ověřování důkazů o podvodu a řešení sporů. Navíc transakce provedené na rollupu jsou konečné až _poté_, co je blok rollupu přijat na Ethereu. Jakmile je transakce rollupu zapsána do základní vrstvy Etherea, nelze ji vrátit zpět (s výjimkou vysoce nepravděpodobného případu reorganizace řetězce).

## Jak fungují optimistické rollupy? {#how-optimistic-rollups-work}

### Provádění a agregace transakcí {#transaction-execution-and-aggregation}

Uživatelé odesílají transakce „operátorům“, což jsou uzly zodpovědné za zpracování transakcí na optimistickém rollupu. Operátor, známý také jako „validátor“ nebo „agregátor“, agreguje transakce, komprimuje podkladová data a publikuje blok na Ethereu.

Ačkoli se validátorem může stát kdokoli, validátoři optimistického rollupu musí před produkcí bloků poskytnout kauci, podobně jako v [systému důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/). Tato kauce může být penalizována, pokud validátor odešle neplatný blok nebo staví na starém, ale neplatném bloku (i když je jeho blok platný). Tímto způsobem optimistické rollupy využívají kryptoekonomické pobídky k zajištění toho, aby validátoři jednali poctivě.

Očekává se, že ostatní validátoři na řetězci optimistického rollupu provedou odeslané transakce pomocí své kopie stavu rollupu. Pokud se konečný stav validátora liší od stavu navrženého operátorem, mohou zahájit zpochybnění a vypočítat důkaz o podvodu.

Některé optimistické rollupy mohou upustit od systému validátorů nevyžadujícího povolení a k provádění řetězce použít jediný „sekvencer“. Stejně jako validátor, sekvencer zpracovává transakce, produkuje bloky rollupu a odesílá transakce rollupu do řetězce L1 (Etherea).

Sekvencer se liší od běžného operátora rollupu tím, že má větší kontrolu nad řazením transakcí. Sekvencer má také prioritní přístup k řetězci rollupu a je jedinou entitou oprávněnou odesílat transakce do onchain kontraktu. Transakce z uzlů, které nejsou sekvencery, nebo od běžných uživatelů jsou jednoduše zařazeny do fronty v samostatné schránce, dokud je sekvencer nezahrne do nové dávky.

#### Odesílání bloků rollupu do Etherea {#submitting-blocks-to-ethereum}

Jak již bylo zmíněno, operátor optimistického rollupu sdružuje offchain transakce do dávky a odesílá ji do Etherea k notářskému ověření. Tento proces zahrnuje kompresi dat souvisejících s transakcemi a jejich publikování na Ethereu jako `calldata` nebo v blobech.

`calldata` je neměnitelná, neperzistentní oblast v chytrém kontraktu, která se chová většinou jako [paměť](/developers/docs/smart-contracts/anatomy/#memory). Ačkoli `calldata` přetrvává onchain jako součást [historických protokolů](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) blockchainu, není uložena jako součást stavu Etherea. Protože se `calldata` nedotýká žádné části stavu Etherea, je pro ukládání dat onchain levnější než stav.

Klíčové slovo `calldata` se v Solidity používá také k předávání argumentů funkci chytrého kontraktu v době provádění. `calldata` identifikuje funkci volanou během transakce a uchovává vstupy do funkce ve formě libovolné sekvence bajtů.

V kontextu optimistických rollupů se `calldata` používá k odesílání komprimovaných transakčních dat do onchain kontraktu. Operátor rollupu přidá novou dávku zavoláním požadované funkce v kontraktu rollupu a předáním komprimovaných dat jako argumentů funkce. Použití `calldata` snižuje poplatky uživatelů, protože většina nákladů, které rollupy mají, pochází z ukládání dat onchain.

Zde je [příklad](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) odeslání dávky rollupu, který ukazuje, jak tento koncept funguje. Sekvencer vyvolal metodu `appendSequencerBatch()` a předal komprimovaná transakční data jako vstupy pomocí `calldata`.

Některé rollupy nyní používají bloby k odesílání dávek transakcí do Etherea.

Bloby jsou neměnitelné a neperzistentní (stejně jako `calldata`), ale po přibližně 18 dnech jsou z historie prořezány. Další informace o blobech najdete v části [danksharding](/roadmap/danksharding).

### Závazky stavu {#state-commitments}

V jakémkoli okamžiku je stav optimistického rollupu (účty, zůstatky, kód kontraktu atd.) organizován jako [Merkleův strom](/whitepaper/#merkle-trees) nazývaný „stavový strom“. Kořen tohoto Merkleova stromu (stavový kořen), který odkazuje na nejnovější stav rollupu, je zahašován a uložen v kontraktu rollupu. Každý přechod stavu na řetězci vytváří nový stav rollupu, ke kterému se operátor zavazuje výpočtem nového stavového kořene.

Operátor je povinen při odesílání dávek odeslat jak staré stavové kořeny, tak nové stavové kořeny. Pokud se starý stavový kořen shoduje s existujícím stavovým kořenem v onchain kontraktu, je tento zahozen a nahrazen novým stavovým kořenem.

Operátor rollupu je také povinen zavázat se k Merkleho kořenu pro samotnou dávku transakcí. To umožňuje komukoli prokázat zahrnutí transakce do dávky (na L1) předložením [Merkleova důkazu](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Závazky stavu, zejména stavové kořeny, jsou nezbytné pro prokázání správnosti změn stavu v optimistickém rollupu. Kontrakt rollupu přijímá nové stavové kořeny od operátorů okamžitě po jejich odeslání, ale později může neplatné stavové kořeny smazat, aby obnovil rollup do jeho správného stavu.

### Dokazování podvodů {#fraud-proving}

Jak bylo vysvětleno, optimistické rollupy umožňují komukoli publikovat bloky bez poskytnutí důkazů o platnosti. Aby však bylo zajištěno, že řetězec zůstane bezpečný, optimistické rollupy specifikují časové okno, během kterého může kdokoli zpochybnit přechod stavu. Proto se bloky rollupu nazývají „tvrzení“ (assertions), protože kdokoli může zpochybnit jejich platnost.

Pokud někdo zpochybní tvrzení, protokol rollupu zahájí výpočet důkazu o podvodu. Každý typ důkazu o podvodu je interaktivní – někdo musí odeslat tvrzení, než ho může jiná osoba zpochybnit. Rozdíl spočívá v tom, kolik kol interakce je k výpočtu důkazu o podvodu zapotřebí.

Jednokolová interaktivní schémata dokazování přehrávají zpochybněné transakce na L1 k detekci neplatných tvrzení. Protokol rollupu emuluje opětovné provedení zpochybněné transakce na L1 (Ethereu) pomocí kontraktu ověřovatele, přičemž vypočítaný stavový kořen určuje, kdo vyhraje zpochybnění. Pokud je nárok zpochybňovatele ohledně správného stavu rollupu správný, je operátor penalizován stržením jeho kauce.

Opětovné provádění transakcí na L1 k detekci podvodu však vyžaduje publikování závazků stavu pro jednotlivé transakce a zvyšuje množství dat, která musí rollupy publikovat onchain. Přehrávání transakcí také přináší značné náklady na gas. Z těchto důvodů přecházejí optimistické rollupy na vícekolové interaktivní dokazování, které dosahuje stejného cíle (tj. detekce neplatných operací rollupu) s vyšší efektivitou.

#### Vícekolové interaktivní dokazování {#multi-round-interactive-proving}

Vícekolové interaktivní dokazování zahrnuje protokol vzájemné komunikace mezi tím, kdo tvrzení předkládá (asserter), a zpochybňovatelem (challenger), na který dohlíží kontrakt ověřovatele na L1, jenž nakonec rozhodne, která strana lže. Poté, co uzel L2 zpochybní tvrzení, je předkladatel povinen rozdělit zpochybněné tvrzení na dvě stejné poloviny. Každé jednotlivé tvrzení v tomto případě bude obsahovat stejný počet kroků výpočtu jako to druhé.

Zpochybňovatel si poté vybere, které tvrzení chce zpochybnit. Proces dělení (nazývaný „protokol půlení“) pokračuje, dokud obě strany nezpochybňují tvrzení o _jediném_ kroku provádění. V tomto okamžiku kontrakt L1 vyřeší spor vyhodnocením instrukce (a jejího výsledku), aby odhalil podvodnou stranu.

Předkladatel je povinen poskytnout „jednokrokový důkaz“ ověřující platnost zpochybněného jednokrokového výpočtu. Pokud předkladatel jednokrokový důkaz neposkytne, nebo pokud ověřovatel na L1 považuje důkaz za neplatný, prohrává zpochybnění.

Několik poznámek k tomuto typu důkazu o podvodu:

1. Vícekolové interaktivní dokazování podvodů je považováno za efektivní, protože minimalizuje práci, kterou musí řetězec L1 vykonat při arbitráži sporů. Místo přehrávání celé transakce stačí řetězci L1 znovu provést pouze jeden krok v provádění rollupu.

2. Protokoly půlení snižují množství dat odesílaných onchain (není nutné publikovat závazky stavu pro každou transakci). Transakce optimistického rollupu navíc nejsou omezeny limitem plynu Etherea. Naopak optimistické rollupy, které znovu provádějí transakce, musí zajistit, aby transakce L2 měla nižší limit plynu, aby bylo možné emulovat její provedení v rámci jediné transakce Etherea.

3. Část kauce škodlivého předkladatele je udělena zpochybňovateli, zatímco druhá část je spálena. Spálení zabraňuje tajným dohodám mezi validátory; pokud se dva validátoři dohodnou na zahájení falešných zpochybnění, stále přijdou o značnou část celého staku.

4. Vícekolové interaktivní dokazování vyžaduje, aby obě strany (předkladatel i zpochybňovatel) provedly kroky ve stanoveném časovém okně. Pokud strana nejedná před vypršením lhůty, prohrává zpochybnění.

#### Proč jsou důkazy o podvodu pro optimistické rollupy důležité {#fraud-proof-benefits}

Důkazy o podvodu jsou důležité, protože usnadňují _bezdůvěrnou finalitu_ v optimistických rollupech. Bezdůvěrná finalita je vlastnost optimistických rollupů, která zaručuje, že transakce – pokud je platná – bude nakonec potvrzena.

Škodlivé uzly se mohou pokusit zpozdit potvrzení platného bloku rollupu zahájením falešných zpochybnění. Důkazy o podvodu však nakonec prokážou platnost bloku rollupu a způsobí jeho potvrzení.

To souvisí i s další bezpečnostní vlastností optimistických rollupů: platnost řetězce se spoléhá na existenci _jednoho_ poctivého uzlu. Poctivý uzel může správně posouvat řetězec vpřed buď odesíláním platných tvrzení, nebo zpochybňováním neplatných tvrzení. Ať je to jakkoli, škodlivé uzly, které vstoupí do sporů s poctivým uzlem, ztratí během procesu dokazování podvodů své staky.

### Interoperabilita L1/L2 {#l1-l2-interoperability}

Optimistické rollupy jsou navrženy pro interoperabilitu s Ethereum Mainnetem a umožňují uživatelům předávat zprávy a libovolná data mezi L1 a L2. Jsou také kompatibilní s EVM, takže můžete přenést stávající [decentralizované aplikace (dapps)](/developers/docs/dapps/) na optimistické rollupy nebo vytvořit nové dapps pomocí vývojových nástrojů Etherea.

#### 1. Pohyb aktiv {#asset-movement}

##### Vstup do rollupu

K použití optimistického rollupu uživatelé vkládají ETH, tokeny ERC-20 a další přijímaná aktiva do kontraktu [mostu](/developers/docs/bridges/) rollupu na L1. Kontrakt mostu předá transakci na L2, kde je vyraženo ekvivalentní množství aktiv a odesláno na uživatelem zvolenou adresu na optimistickém rollupu.

Transakce generované uživateli (jako vklad L1 > L2) jsou obvykle zařazeny do fronty, dokud je sekvencer znovu neodešle do kontraktu rollupu. Aby se však zachovala odolnost vůči cenzuře, optimistické rollupy umožňují uživatelům odeslat transakci přímo do onchain kontraktu rollupu, pokud byla zpožděna nad maximální povolenou dobu.

Některé optimistické rollupy přijímají přímočařejší přístup, aby zabránily sekvencerům v cenzuře uživatelů. Zde je blok definován všemi transakcemi odeslanými do kontraktu L1 od předchozího bloku (např. vklady) navíc k transakcím zpracovaným na řetězci rollupu. Pokud sekvencer ignoruje transakci L1, publikuje (prokazatelně) nesprávný stavový kořen; proto sekvenceři nemohou zdržovat zprávy generované uživateli, jakmile jsou odeslány na L1.

##### Výstup z rollupu

Výběr z optimistického rollupu do Etherea je obtížnější kvůli schématu dokazování podvodů. Pokud uživatel iniciuje transakci L2 > L1 k výběru prostředků uložených v úschově na L1, musí počkat, dokud neuplyne období pro zpochybnění – trvající zhruba sedm dní. Nicméně samotný proces výběru je poměrně přímočarý.

Poté, co je na rollupu L2 iniciován požadavek na výběr, je transakce zahrnuta do další dávky, zatímco uživatelova aktiva na rollupu jsou spálena. Jakmile je dávka publikována na Ethereu, může uživatel vypočítat Merkleův důkaz ověřující zahrnutí jeho výstupní transakce do bloku. Pak už je to jen otázka čekání na uplynutí doby zpoždění k finalizaci transakce na L1 a výběru prostředků na Mainnet.

Aby se uživatelé optimistického rollupu vyhnuli týdennímu čekání před výběrem prostředků do Etherea, mohou využít **poskytovatele likvidity** (LP). Poskytovatel likvidity převezme vlastnictví čekajícího výběru z L2 a zaplatí uživateli na L1 (výměnou za poplatek).

Poskytovatelé likvidity mohou před uvolněním prostředků zkontrolovat platnost požadavku uživatele na výběr (tím, že sami provedou řetězec). Tímto způsobem mají jistotu, že transakce bude nakonec potvrzena (tj. bezdůvěrná finalita).

#### 2. Kompatibilita s EVM {#evm-compatibility}

Pro vývojáře je výhodou optimistických rollupů jejich kompatibilita – nebo ještě lépe ekvivalence – s [virtuálním strojem Etherea (EVM)](/developers/docs/evm/). Rollupy kompatibilní s EVM splňují specifikace v [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) a podporují EVM na úrovni bajtkódu.

Kompatibilita s EVM v optimistických rollupech má následující výhody:

i. Vývojáři mohou migrovat stávající chytré kontrakty na Ethereu na řetězce optimistických rollupů, aniž by museli rozsáhle upravovat kódové základny. To může vývojovým týmům ušetřit čas při nasazování chytrých kontraktů Etherea na L2.

ii. Vývojáři a projektové týmy používající optimistické rollupy mohou využívat infrastrukturu Etherea. To zahrnuje programovací jazyky, knihovny kódu, testovací nástroje, klientský software, infrastrukturu pro nasazení a tak dále.

Používání stávajících nástrojů je důležité, protože tyto nástroje byly v průběhu let rozsáhle auditovány, laděny a vylepšovány. Odstraňuje to také nutnost, aby se vývojáři Etherea učili, jak stavět se zcela novým vývojovým stackem.

#### 3. Meziřetězcová volání kontraktů {#cross-chain-contract-calls}

Uživatelé (externě vlastněné účty) interagují s kontrakty L2 odesláním transakce do kontraktu rollupu nebo tím, že to za ně udělá sekvencer nebo validátor. Optimistické rollupy také umožňují účtům kontraktů na Ethereu interagovat s kontrakty L2 pomocí přemosťovacích kontraktů k předávání zpráv a dat mezi L1 a L2. To znamená, že můžete naprogramovat kontrakt L1 na Ethereum Mainnetu tak, aby vyvolával funkce patřící kontraktům na optimistickém rollupu L2.

Meziřetězcová volání kontraktů probíhají asynchronně – to znamená, že volání je nejprve iniciováno a poté provedeno později. To se liší od volání mezi dvěma kontrakty na Ethereu, kde volání přináší výsledky okamžitě.

Příkladem meziřetězcového volání kontraktu je dříve popsaný vklad tokenů. Kontrakt na L1 uloží tokeny uživatele do úschovy a odešle zprávu spárovanému kontraktu L2, aby vyrazil stejné množství tokenů na rollupu.

Vzhledem k tomu, že meziřetězcová volání zpráv vedou k provedení kontraktu, odesílatel je obvykle povinen pokrýt [náklady na gas](/developers/docs/gas/) za výpočet. Doporučuje se nastavit vysoký limit plynu, aby se zabránilo selhání transakce na cílovém řetězci. Scénář přemostění tokenů je dobrým příkladem; pokud strana L1 transakce (vklad tokenů) funguje, ale strana L2 (ražení nových tokenů) selže kvůli nedostatku gasu, vklad se stane nenávratným.

Nakonec bychom měli poznamenat, že volání zpráv L2 > L1 mezi kontrakty musí počítat se zpožděním (volání L1 > L2 se obvykle provádějí po několika minutách). Je to proto, že zprávy odeslané na Mainnet z optimistického rollupu nelze provést, dokud nevyprší okno pro zpochybnění.

## Jak fungují poplatky u optimistických rollupů? {#how-do-optimistic-rollup-fees-work}

Optimistické rollupy používají schéma poplatků za plyn, podobně jako Ethereum, k označení toho, kolik uživatelé platí za transakci. Poplatky účtované na optimistických rollupech závisí na následujících součástech:

1. **Zápis stavu**: Optimistické rollupy publikují transakční data a hlavičky bloků (skládající se z hashe předchozí hlavičky bloku, stavového kořene, kořene dávky) do Etherea jako `blob`, neboli „binární velký objekt“ (binary large object). [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) představil nákladově efektivní řešení pro zahrnutí dat onchain. `blob` je nové pole transakce, které umožňuje rollupům odesílat komprimovaná data o přechodu stavu na Ethereum L1. Na rozdíl od `calldata`, která zůstává trvale onchain, jsou bloby krátkodobé a mohou být z klientů prořezány po [4096 epochách](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (přibližně 18 dní). Použitím blobů k odesílání dávek komprimovaných transakcí mohou optimistické rollupy výrazně snížit náklady na zápis transakcí na L1.

2. **Spotřebovaný gas za blob**: Transakce nesoucí bloby využívají mechanismus dynamických poplatků podobný tomu, který zavedl [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Poplatek za plyn pro transakce typu 3 zohledňuje základní poplatek za bloby, který je určován sítí na základě poptávky po prostoru pro bloby a využití prostoru pro bloby odesílanou transakcí.

3. **Poplatky operátora L2**: Jedná se o částku vyplácenou uzlům rollupu jako kompenzaci za výpočetní náklady vzniklé při zpracování transakcí, podobně jako poplatky za plyn na Ethereu. Uzly rollupu účtují nižší transakční poplatky, protože L2 mají vyšší zpracovatelské kapacity a nečelí přetížení sítě, které nutí validátory na Ethereu upřednostňovat transakce s vyššími poplatky.

Optimistické rollupy uplatňují několik mechanismů ke snížení poplatků pro uživatele, včetně dávkování transakcí a komprese `calldata` ke snížení nákladů na publikování dat. Můžete se podívat na [sledovač poplatků L2](https://l2fees.info/), kde najdete přehled v reálném čase o tom, kolik stojí používání optimistických rollupů založených na Ethereu.

## Jak optimistické rollupy škálují Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Jak bylo vysvětleno, optimistické rollupy publikují komprimovaná transakční data na Ethereu, aby zaručily dostupnost dat. Schopnost komprimovat data publikovaná onchain je klíčová pro škálování propustnosti na Ethereu pomocí optimistických rollupů.

Hlavní řetězec Etherea klade limity na to, kolik dat mohou bloky pojmout, vyjádřené v jednotkách gasu ([průměrná velikost bloku](/developers/docs/blocks/#block-size) je 15 milionů gasu). Ačkoli to omezuje, kolik gasu může každá transakce využít, znamená to také, že můžeme zvýšit počet transakcí zpracovaných na blok snížením dat souvisejících s transakcemi – což přímo zlepšuje škálovatelnost.

Optimistické rollupy používají několik technik k dosažení komprese transakčních dat a zlepšení rychlosti TPS (transakcí za sekundu). Například tento [článek](https://vitalik.eth.limo/general/2021/01/05/rollup.html) porovnává data, která základní uživatelská transakce (odeslání etheru) generuje na Mainnetu, s tím, kolik dat stejná transakce generuje na rollupu:

| Parametr | Ethereum (L1)          | Rollup (L2)   |
| --------- | ---------------------- | ------------- |
| Nonce     | ~3                     | 0             |
| Gasprice  | ~8                     | 0-0.5         |
| Gas       | 3                      | 0-0.5         |
| To        | 21                     | 4             |
| Value     | 9                      | ~3            |
| Signature | ~68 (2 + 33 + 33)      | ~0.5          |
| From      | 0 (obnoveno z podpisu) | 4             |
| **Celkem** | **\~112 bajtů**         | **\~12 bajtů** |

Provedení několika hrubých výpočtů na těchto číslech může pomoci ukázat zlepšení škálovatelnosti, které poskytuje optimistický rollup:

1. Cílová velikost pro každý blok je 15 milionů gasu a ověření jednoho bajtu dat stojí 16 gasu. Vydělením průměrné velikosti bloku 16 gasy (15 000 000 / 16) zjistíme, že průměrný blok pojme **937 500 bajtů dat**.
2. Pokud základní transakce rollupu využívá 12 bajtů, pak průměrný blok Etherea dokáže zpracovat **78 125 transakcí rollupu** (937 500 / 12) nebo **39 dávek rollupu** (pokud každá dávka obsahuje v průměru 2 000 transakcí).
3. Pokud je na Ethereu vyprodukován nový blok každých 15 sekund, pak by rychlost zpracování rollupu činila zhruba **5 208 transakcí za sekundu**. To se vypočítá vydělením počtu základních transakcí rollupu, které blok Etherea pojme (**78 125**), průměrným časem bloku (**15 sekund**).

Jedná se o poměrně optimistický odhad vzhledem k tomu, že transakce optimistického rollupu nemohou tvořit celý blok na Ethereu. Může to však poskytnout hrubou představu o tom, jaké zisky ve škálovatelnosti mohou optimistické rollupy uživatelům Etherea nabídnout (současné implementace nabízejí až 2 000 TPS).

Očekává se, že zavedení [shardingu dat](/roadmap/danksharding/) na Ethereu zlepší škálovatelnost v optimistických rollupech. Protože transakce rollupu musí sdílet prostor v bloku s jinými transakcemi, které nepatří rollupu, je jejich zpracovatelská kapacita omezena propustností dat na hlavním řetězci Etherea. Danksharding zvětší prostor dostupný pro řetězce L2 k publikování dat na blok pomocí levnějšího, nepermanentního úložiště „blobů“ namísto drahé, trvalé `CALLDATA`.

### Výhody a nevýhody optimistických rollupů {#optimistic-rollups-pros-and-cons}

| Výhody                                                                                                                                                  | Nevýhody                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nabízí masivní zlepšení škálovatelnosti bez obětování bezpečnosti nebo bezdůvěrnosti.                                                             | Zpoždění ve finalitě transakcí kvůli potenciálním zpochybněním kvůli podvodu.                                                                                   |
| Transakční data jsou uložena na řetězci vrstvy 1, což zlepšuje transparentnost, bezpečnost, odolnost vůči cenzuře a decentralizaci.                       | Centralizovaní operátoři rollupu (sekvenceři) mohou ovlivňovat řazení transakcí.                                                                       |
| Dokazování podvodů zaručuje bezdůvěrnou finalitu a umožňuje poctivým menšinám zabezpečit řetězec.                                                         | Pokud neexistují žádné poctivé uzly, může škodlivý operátor ukrást prostředky odesláním neplatných bloků a závazků stavu.                                  |
| Výpočet důkazů o podvodu je otevřený běžným uzlům L2, na rozdíl od důkazů o platnosti (používaných v ZK-rollupech), které vyžadují speciální hardware.                         | Bezpečnostní model se spoléhá na to, že alespoň jeden poctivý uzel provádí transakce rollupu a odesílá důkazy o podvodu ke zpochybnění neplatných přechodů stavu. |
| Rollupy těží z „bezdůvěrné živosti“ (kdokoli může vynutit postup řetězce prováděním transakcí a odesíláním tvrzení).                    | Uživatelé musí před výběrem prostředků zpět do Etherea počkat na vypršení týdenního období pro zpochybnění.                                              |
| Optimistické rollupy se spoléhají na dobře navržené kryptoekonomické pobídky ke zvýšení bezpečnosti na řetězci.                                                 | Rollupy musí odesílat všechna transakční data onchain, což může zvýšit náklady.                                                                          |
| Kompatibilita s EVM a Solidity umožňuje vývojářům přenášet chytré kontrakty nativní pro Ethereum na rollupy nebo používat stávající nástroje k vytváření nových dapps. |

### Vizuální vysvětlení optimistických rollupů {#optimistic-video}

Učíte se raději vizuálně? Podívejte se, jak Finematics vysvětluje optimistické rollupy:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Další čtení o optimistických rollupech {#further-reading-on-optimistic-rollups}

- [Jak fungují optimistické rollupy (Kompletní průvodce)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Co je to blockchainový rollup? Technický úvod](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Základní průvodce Arbitrem](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Praktický průvodce rollupy na Ethereu](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Stav důkazů o podvodu v L2 na Ethereu](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Jak vlastně funguje rollup Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Hluboký ponor do OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Co je to Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Návody: Optimistické rollupy a mosty na Ethereu {#tutorials}

- [Průvodce standardním kontraktem mostu Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Komentovaný průvodce kódem standardního mostu Optimism pro přesun aktiv mezi L1 a L2._