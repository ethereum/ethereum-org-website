---
title: Plazmové řetězce
description: Úvod do plazmových řetězců jako škálovacího řešení, které v současnosti využívá komunita Etherea.
lang: cs
incomplete: true
sidebarDepth: 3
---

Plazmový řetězec je samostatný blockchain ukotvený na Ethereum Mainnet, ale provádějící transakce mimo řetězec s vlastním mechanismem pro validaci bloků. Plazmové řetězce jsou někdy označovány jako „dceřiné“ řetězce, což jsou v podstatě menší kopie Ethereum Mainnetu. Plazmové řetězce k arbitráži sporů využívají [důkazy podvodů](/glossary/#fraud-proof) (podobně jako [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/)).

Merkle trees umožňují vytvoření nekonečného počtu těchto řetězců, které mohou posloužit k odlehčení šířky pásma mateřských řetězců (včetně Ethereum Mainnetu). Nicméně zatímco tyto řetězce odvozují část své bezpečnosti od Etherea (prostřednictvím důkazů podvodů), jejich bezpečnost a efektivita jsou ovlivněny několika konstrukčními omezeními.

## Předpoklady {#prerequisites}

Pro pochopení tohoto článku byste měli dobře rozumět všem základním tématům a skvěle chápat [škálování Etherea](/developers/docs/scaling/).

## Co je Plasma?

Plasma je vývojová platforma pro zlepšení škálovatelnosti na veřejných blockchainech, jako je Ethereum. Jak je popsáno v původním [whitepaperu Plasmy](http://plasma.io/plasma.pdf), plazmové řetězce jsou postaveny na jiném blockchainu (nazývaném „kořenový řetězec“). Každý „dceřiný řetězec“ se rozšiřuje z kořenového řetězce a je obecně spravován smart kontraktem nasazeným na mateřském řetězci.

Funkce plazmového kontraktu, mimo jiné, slouží jako [přemostění](/developers/docs/bridges/), které umožňuje uživatelům přesouvat aktiva mezi Ethereum Mainnetem a plazmovým řetězcem. Ačkoliv to je činí podobnými [postranním řetězcům](/developers/docs/scaling/sidechains/), plazmové řetězce těží – alespoň do určité míry – z bezpečnosti Mainnetu Etherea. A tím se od postranním řetězců, které jsou zodpovědné za svou bezpečnost samy, odlišují.

## Jak Plasma funguje?

Základními komponentami vývojového rámce Plasma jsou:

### Výpočty mimo blockchain {#off-chain-computation}

Současná rychlost zpracování Etherea je omezena na přibližně 15–20 transakcí za sekundu, což snižuje krátkodobou možnost škálování pro obsloužení většího počtu uživatelů. Tento problém existuje hlavně proto, že [konsensuální mechanismus](/developers/docs/consensus-mechanisms/) Etherea vyžaduje, aby spousta peer-to-peer uzlů ověřila každou aktualizaci stavu blockchainu.

Ačkoli je konsensuální mechanismus Etherea nezbytný pro bezpečnost, nemusí se vztahovat na každý případ použití. Například Alice možná nepotřebuje, aby její denní platby Bobovi za šálek kávy ověřila celá síť Etherea, protože mezi oběma stranami existuje určitá míra důvěry.

Plasma předpokládá, že Ethereum Mainnet nemusí ověřovat všechny transakce. Místo toho můžeme zpracovávat transakce mimo Mainnet, čímž se usnadní práce síťovým uzlům, které tak nebudou muset validovat každou transakci.

Výpočty mimo řetězec jsou nezbytné, protože plazmové řetězce mohou optimalizovat rychlost a náklady. Například plazmový řetězec může – a nejčastěji také používá – jediného „operátora“ pro správu pořadí a exekuci transakcí. S jediným subjektem ověřujícím transakce jsou doby zpracování na plazmovém řetězci rychlejší než na Ethereum Mainnetu.

### Závazky stavu {#state-commitments}

I když Plasma provádí transakce mimo řetězec, vypořádány jsou na hlavní výkonné vrstvě Etherea – jinak by plazmové řetězce nemohly těžit z bezpečnostních záruk Etherea. Ale finalizace transakcí mimo řetězec bez znalosti stavu plazmového řetězce by narušila bezpečnostní model a umožnila rozšíření neplatných transakcí. Proto je operátor, subjekt odpovědný za produkci bloků na plazmovém řetězci, povinen pravidelně zveřejňovat „závazky stavu“ na Ethereu.

[Schéma závazků](https://en.wikipedia.org/wiki/Commitment_scheme) je kryptografická technika pro zavázání se k hodnotě nebo výroku, aniž by tato hodnota nebo výrok byly odhaleny jiné straně. Závazky jsou „závazné“ v tom smyslu, že nemůžete změnit hodnotu nebo tvrzení, jakmile jste se k němu zavázali. Závazky stavu v Plasmě mají podobu „Merkle kořenů“ (odvozených od [Merkle tree](/whitepaper/#merkle-trees)), které operátor v pravidelných intervalech zasílá do plazmového kontraktu na Ethereu.

Kořeny Merkle jsou kryptografické prvky, které umožňují kompresi velkého množství informací. Merkle kořen (v tomto případě také nazývaný „kořen bloku“) může reprezentovat všechny transakce v bloku. Merkle kořeny také usnadňují ověření, že malý kousek dat je součástí většího datového souboru. Například uživatel může předložit [Merkle důkaz](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) k prokázání zahrnutí transakce do konkrétního bloku.

Merkle kořeny jsou důležité pro poskytování informací o stavu mimo řetězec Ethereu. Merkle kořeny si můžete představit jako „ukládací body“ – operátor říká: „Toto je stav plazmového řetězce v bodě času x a toto je Merkle kořen jako důkaz.“ Operátor se zavazuje k _aktuálnímu stavu_ plazmového řetězce pomocí Merkle kořene, což je důvod, proč se tomu říká „závazek stavu“.

### Vstupy a výstupy {#entries-and-exits}

Aby uživatelé Etherea mohli využívat výhody Plasmy, musí existovat mechanismus pro přesun prostředků mezi Mainnetem a plazmovými řetězci. Nemůžeme však svévolně poslat ether na adresu na plazmovém řetězci – tyto řetězce nejsou kompatibilní, takže by transakce buď selhala, nebo by vedla ke ztrátě prostředků.

Plasma využívá hlavní kontrakt běžící na Ethereu ke zpracování vstupů a výstupů uživatelů. Tento hlavní kontrakt je také odpovědný za sledování závazků stavu (vysvětleno dříve) a za trestání nepoctivého chování pomocí důkazů podvodů (více o tom později).

#### Vstup do plazmového řetězce {#entering-the-plasma-chain}

Aby Alice (uživatel) mohla vstoupit do plazmového řetězce, musí vložit ETH nebo jakýkoli ERC-20 token do plazmového kontraktu. Operátor plazmy, který sleduje vklady do kontraktu, znovu vytvoří částku rovnající se původnímu vkladu Alice a pošle ji na její adresu na plazmovém řetězci. Alice musí potvrdit přijetí prostředků na dceřiném řetězci a poté může tyto prostředky použít pro transakce.

#### Výstup z plazmového řetězce {#exiting-the-plasma-chain}

Výstup z plazmového řetězce je složitější než vstup, a to hned z několika důvodů. Největším je, že zatímco Ethereum má informace o stavu plazmového řetězce, nemůže ověřit, zda jsou tyto informace pravdivé. Podvodník by mohl učinit nesprávné tvrzení („mám 1 000 ETH“) a utéct bez postihu, kdyby poskytl falešné důkazy na podporu tohoto tvrzení.

Aby se předešlo podvodným výběrům, zavádí se „období výzvy“. Během období výzvy (obvykle týden) může kdokoli zpochybnit žádost o výběr pomocí důkazu podvodu. Pokud je výzva úspěšná, žádost o výběr je zamítnuta.

Obvykle jsou však uživatelé poctiví a o prostředcích, které vlastní, mluví pravdu. V tomto scénáři Alice zahájí žádost o výběr na kořenovém řetězci (Ethereum) odesláním transakce do plazmového kontraktu.

Alice musí také poskytnout Merkle důkaz ověřující, že transakce, která vytvořila její prostředky na plazmovém řetězci, byla zahrnuta do bloku. To je nezbytné pro varianty Plasmy, jako je [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), které používají model [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Jiné varianty, jako je [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), představují prostředky, jako jsou [nezaměnitelné tokeny](/developers/docs/standards/tokens/erc-721/) místo UTXO. V tomto případě je pro výběr nutné předložit důkaz o vlastnictví tokenů na plazmovém řetězci. Toho je možné docílit předložením dvou nejnovějších transakcí zahrnujících token a poskytnutím Merkle důkazu ověřujícího zahrnutí těchto transakcí do bloku.

Uživatel musí také přidat k žádosti o výběr zástavu jako záruku poctivého chování. Pokud vyzyvatel prokáže neplatnost žádosti o výběr Alice, její záloha je penalizována a část z ní jde vyzyvateli jako odměna.

Pokud uplyne období výzvy, aniž by kdokoli poskytl důkaz podvodu, žádost Alice o výběr je považována za platnou, což jí umožňuje vybrat vklady z plazmového kontraktu na Ethereu.

### Arbitráž sporů {#dispute-arbitration}

Stejně jako u jakéhokoli jiného blockchainu, plazmové řetězce potřebují mechanismus pro vynucení integrity transakcí v případě, že se účastníci chovají podvodně (např. dvojité utrácení prostředků). Za tímto účelem plazmové řetězce používají důkazy podvodů k arbitráži sporů týkajících se platnosti přechodů stavu a k trestání podvodného chování. Důkazy podvodů jsou použity jako mechanismus, kterým plazmový dceřiný řetězec podává stížnost svému mateřskému řetězci nebo kořenovému řetězci.

Důkaz podvodu je jednoduše tvrzení, že určitá změna stavu je neplatná. Příkladem je, když se uživatel (Alice) pokusí utratit stejné prostředky dvakrát. Možná utratila UTXO v transakci s Bobem a chce utratit stejné UTXO (které je nyní Bobovo) v jiné transakci.

Aby zabránil výběru, Bob sestaví důkaz podvodu poskytnutím důkazu o tom, že Alice utratila uvedené UTXO v předchozí transakci, a Merkle důkazu o zahrnutí transakce do bloku. Stejný postup funguje v Plasma Cash – Bob by musel poskytnout důkaz, že Alice dříve převedla tokeny, které se nyní pokouší vybrat.

Pokud je Bobova výzva úspěšná, žádost Alice o výběr je zrušena. Tento přístup však spoléhá na Bobovu schopnost sledovat řetězec. Pokud je Bob offline, může Alice zpracovat zlovolný výběr, jakmile uplyne období výzvy.

## Problém hromadného výběru z plazmového řetězce {#the-mass-exit-problem-in-plasma}

Problém hromadného výběru nastává, když se velký počet uživatelů naráz pokusí vybrat prostředky z plazmového řetězce. Tento problém existuje kvůli jednomu z největších problémů Plasmy: **nedostupnosti dat**.

Dostupnost dat je schopnost ověřit, že informace pro navrhovaný blok byly skutečně zveřejněny na blockchainové síti. Blok je „nedostupný“, pokud producent zveřejní samotný blok, ale zadrží data použitá k vytvoření bloku.

Bloky musí být dostupné, pokud mají být síťové uzly schopny stáhnout blok a ověřit platnost transakcí. Blockchainy zajišťují dostupnost dat tím, že nutí producenty bloků zveřejnit všechna data transakcí na řetězci.

Dostupnost dat také pomáhá zabezpečit škálovací protokoly mimo řetězec, které staví na základní vrstvě Etherea. Tím, že nutí operátory na těchto řetězcích zveřejnit data transakcí na Ethereu, může kdokoli zpochybnit neplatné bloky sestavením důkazů podvodu odkazujících na správný stav řetězce.

Plazmové řetězce primárně ukládají data o transakcích u operátora a **nezveřejňují žádná data na Mainnetu** (tj. kromě pravidelných závazků stavu). To znamená, že uživatelé se musí spoléhat na to, že operátor poskytne data bloků, pokud potřebují vytvořit důkazy podvodu a zpochybnit neplatné transakce. Pokud tento systém funguje, mohou uživatelé vždy využít důkazů podvodu k ochraně svých prostředků.

Problém nastává, když podvodníkem není běžný uživatel, ale přímo operátor. Protože operátor má plnou kontrolu nad blockchainem, má větší motivaci prosazovat neplatné změny stavu ve větším měřítku, například krást prostředky uživatelů na plazmovém řetězci.

V tomto případě klasický systém důkazů podvodu nefunguje. Operátor by mohl snadno provést neplatnou transakci, která převede prostředky Alice a Boba do jeho peněženky, a skrýt data potřebná pro vytvoření důkazu podvodu. To je možné, protože operátor není povinen zpřístupnit data uživatelům nebo Mainnetu.

Nejoptimističtějším řešením v této situaci je pokus o „hromadný výběr“ uživatelů z plazmového řetězce. Hromadný výběr zpomalí podvodný plán operátora na krádež prostředků a poskytne uživatelům určitou míru ochrany. Žádosti o výběr jsou seřazeny podle toho, kdy bylo vytvořeno každé UTXO (nebo token), čímž se zabrání tomu, aby podvodní operátoři předběhli poctivé uživatele.

Nicméně stále potřebujeme způsob, jak ověřit platnost žádostí o výběr během hromadného výběru, aby se zabránilo tomu, že by oportunističtí jednotlivci využili chaosu a neplatně vybrali prostředky. Řešení je jednoduché: vyžadovat, aby uživatelé jako podmínku výběru svých peněz předložili poslední **platný stav řetězce**.

Tento přístup má však stále své mouchy. Například pokud všichni uživatelé na plazmovém řetězci potřebují provést výběr (což je možné v případě podvodného operátora), pak musí být celý platný stav plazmového řetězce naráz přenesen na základní vrstvu Etherea. Vzhledem k arbitrární velikosti plazmových řetězců (vyšší propustnost = více dat) a omezením rychlosti zpracování Ethereem to není ideální řešení.

Ačkoli výstupní strategie zní teoreticky dobře, skutečné hromadné výběry pravděpodobně vyvolají přetížení sítě na samotném Ethereu. Kromě poškození funkčnosti Etherea může špatně koordinovaný hromadný výběr znamenat, že uživatelé nebudou schopni vybrat své prostředky dříve, než operátor odčerpá prostředky ze všech účtů na plazmovém řetězci.

## Výhody a nevýhody plazmových řetězců {#pros-and-cons-of-plasma}

| Plusy                                                                                                                                                                                                                                                 | Mínusy                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nabízí vysokou propustnost a nízké náklady na transakci.                                                                                                                                                                                              | Nepodporuje obecné výpočty (nemůže spouštět smart kontrakty. Podporuje pouze základní tokenové transakce, směnu a několik dalších typů transakcí prostřednictvím predikátové logiky. |
| Vhodné pro transakce mezi libovolnými uživateli (bez režie páru uživatelů, pokud jsou oba etablováni na plazmovém řetězci)                                                                                                                            | Nutnost pravidelně sledovat síť (je třeba být připojen) nebo tuto odpovědnost delegovat na někoho jiného, aby byla zajištěna bezpečnost vašich prostředků.                           |
| Plazmové řetězce lze přizpůsobit specifickým případům použití, které nesouvisejí s hlavním řetězcem. Každý, včetně firem, si může plazmové smart kontrakty přizpůsobit a poskytnout škálovatelnou infrastrukturu, která funguje v různých kontextech. | Spoléhá na jednoho nebo více operátorů, aby uchovávali data a na požádání je poskytovali.                                                                                            |
| Snižuje zatížení Ethereum Mainnetu přesunem výpočtů a úložiště mimo řetězec.                                                                                                                                                                          | Výběry jsou zpožděny o několik dní, aby bylo možné podávat výzvy. U zaměnitelných aktiv to mohou zmírnit poskytovatelé likvidity, ale s tím jsou spojeny kapitálové náklady.         |
|                                                                                                                                                                                                                                                       | Pokud se příliš mnoho uživatelů pokusí o výběr současně, může se Ethereum Mainnet přetížit.                                                                                          |

## Plasma versus škálovací protokoly druhé vrstvy {#plasma-vs-layer-2}

Ačkoli byla Plasma kdysi považována za užitečné škálovací řešení pro Ethereum, od tohoto názoru bylo časem upuštěno ve prospěch [škálovacích protokolů druhé vrstvy (L2)](/layer-2/). Řešení škálování na druhé vrstvě napravují několik problémů Plasmy:

### Efektivita {#efficiency}

[Zero-Knowledge rollupy](/developers/docs/scaling/zk-rollups) generují kryptografické důkazy o platnosti každého balíčku transakcí zpracovaných mimo řetězec. To brání uživatelům (a operátorům) v prosazování neplatných změn stavu, čímž se eliminuje potřeba výzev a výstupních strategií. Také to znamená, že uživatelé nemusí pravidelně sledovat řetězec, aby zabezpečili své prostředky.

### Podpora smart kontraktů {#support-for-smart-contracts}

Dalším problémem vývojové platformy Plasma byla [neschopnost podporovat exekuci smart kontraktů Etherea](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). V důsledku toho byla většina implementací Plasmy vytvořena především pro jednoduché platby nebo směnu tokenů ERC-20.

Naopak optimistické rollupy jsou kompatibilní s [Virtuálním strojem Etherea](/developers/docs/evm/) a mohou spouštět [smart kontrakty](/developers/docs/smart-contracts/) nativní pro Ethereum, což z nich činí užitečné a _bezpečné_ řešení pro škálování [decentralizovaných aplikací](/developers/docs/dapps/). Podobně se [připravují plány na vytvoření zero-knowledge implementace EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549), která by umožnila ZK-rollupům zpracovávat libovolnou logiku a exekuovat smart kontrakty.

### Nedostupnost dat {#data-unavailability}

Jak bylo vysvětleno dříve, Plasma trpí problémem nedostupnosti dat. Pokud by zlovolný operátor prosadil neplatnou změnu na plazmovém řetězci, uživatelé by ji nemohli zpochybnit, protože operátor může zadržet data potřebná k vytvoření důkazu podvodu. Rollupy tento problém řeší tím, že nutí operátory zveřejnit data transakcí na Ethereu, což umožňuje komukoli ověřit stav řetězce a v případě potřeby vytvořit důkazy podvodu.

### Problém hromadného výběru {#mass-exit-problem}

ZK-rollupy i optimistické rollupy řeší problém hromadného výběru v Plasmě různými způsoby. Například ZK-rollup spoléhá na kryptografické mechanismy, které zajišťují, že operátoři nemohou za žádných okolností ukrást prostředky uživatelů.

Podobně optimistické rollupy zavádějí období zpoždění u výběrů, během něhož může kdokoli zahájit výzvu a zabránit podvodným žádostem o výběr. Ačkoli je to podobné jako v Plasmě, rozdíl spočívá v tom, že ověřovatelé mají přístup k datům potřebným k vytvoření důkazů podvodu. Proto není nutné, aby uživatelé rollupu podstupovali zběsilou migraci „kdo dřív přijde, ten dřív mele“ na Ethereum Mainnet.

## Jak se Plasma liší od postranních řetězců a shardingu? {#plasma-sidechains-sharding}

Plasma, postranní řetězce a sharding jsou si poměrně podobné, protože se všechny nějakým způsobem připojují k Ethereum Mainnetu. Úroveň a síla těchto propojení se však liší, což ovlivňuje bezpečnostní vlastnosti každého škálovacího řešení.

### Plasma vs postranní řetězce {#plasma-vs-sidechains}

[Postranní řetězec](/developers/docs/scaling/sidechains/) je nezávisle provozovaný blockchain připojený k Ethereum Mainnetu prostřednictvím obousměrného přemostění. [Přemostění](/bridges/) umožňují uživatelům směňovat tokeny mezi oběma blockchainy, aby mohli transakce provádět na postranním řetězci, což snižuje přetížení Ethereum Mainnetu a zlepšuje škálovatelnost. Postranní řetězce používají samostatný konsensuální mechanismus a jsou obvykle mnohem menší než Ethereum Mainnet. V důsledku toho je přesun aktiv na tyto řetězce spojen s vyšším rizikem; vzhledem k nedostatku bezpečnostních záruk, které se dědí z Ethereum Mainnetu v modelu postranního řetězce, hrozí uživatelům při útoku na postranní řetězec ztráta prostředků.

Naopak plazmové řetězce odvozují svou bezpečnost od Mainnetu. To je činí měřitelně bezpečnějšími než postranní řetězce. Oba typy řetězců mohou mít různé konsensuální protokoly, ale rozdíl je v tom, že plazmové řetězce zveřejňují Merkle kořeny pro každý blok na Ethereum Mainnetu. Kořeny bloků jsou malé části informací, které můžeme použít k ověření informací o transakcích, které se odehrávají na plazmovém řetězci. Pokud dojde k útoku na plazmový řetězec, uživatelé mohou bezpečně vybrat své prostředky zpět na Mainnet pomocí příslušných důkazů.

### Plasma versus sharding {#plasma-vs-sharding}

Jak plazmové řetězce, tak i shardovací řetězce pravidelně zveřejňují kryptografické důkazy na Ethereum Mainnet. Oba však mají různé bezpečnostní vlastnosti.

Shardovací řetězce odesílají na Mainnet „srovnávací hlavičky“, které obsahují podrobné informace o každém datovém shardu. Síťový uzel na Mainnetu ověřuje a vynucuje platnost datových shardů, čímž snižuje možnost neplatných změn shardů a chrání síť před podvodnými aktivitami.

Plasma se liší v tom, že Mainnet přijímá pouze minimální informace o stavu dceřiných řetězců. To znamená, že Mainnet nemůže účinně ověřovat transakce provedené na dceřiných řetězcích, což je činí méně bezpečnými.

**Je třeba poznamenat**, že sharding blockchainu Ethereum již není v plánu vylepšení. Byl nahrazen škálováním prostřednictvím rollupů a [Dankshardingu](/roadmap/danksharding).

### Použití Plasmy {#use-plasma}

Několik projektů poskytuje implementace Plasmy, které můžete integrovat do svých dappek:

- [Polygon](https://polygon.technology/) (dříve Matic Network)

## Další informace {#further-reading}

- [Učte se o Plasmě](https://www.learnplasma.org/en/)
- [Rychlá připomínka toho, co znamená „sdílená bezpečnost“ a proč je tak důležitá](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Postranní řetězce vs Plasma vs Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Pochopení Plasmy, část 1: Základy](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Život a smrt Plasmy](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ji!_
