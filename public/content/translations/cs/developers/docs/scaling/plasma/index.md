---
title: "Řetězce Plasma"
description: "Úvod do řetězců Plasma jako řešení škálování, které v současnosti využívá komunita Etherea."
lang: cs
incomplete: true
sidebarDepth: 3
---

Řetězec Plasma je samostatný blockchain ukotvený k [Ethereum](/) Mainnetu, který ale provádí transakce offchain s vlastním mechanismem pro validaci bloku. Řetězce Plasma se někdy označují jako „dceřiné“ řetězce, což jsou v podstatě menší kopie Ethereum Mainnetu. Řetězce Plasma používají k řešení sporů [důkazy o podvodu](/glossary/#fraud-proof) (podobně jako [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/)).

Merkleovy stromy umožňují vytvoření nekonečného zásobníku těchto řetězců, které mohou fungovat tak, aby odlehčily šířku pásma mateřským řetězcům (včetně Ethereum Mainnetu). Ačkoli však tyto řetězce odvozují určitou bezpečnost z Etherea (prostřednictvím důkazů o podvodu), jejich bezpečnost a efektivita jsou ovlivněny několika konstrukčními omezeními.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět všem základním tématům a mít obecný přehled o [škálování Etherea](/developers/docs/scaling/).

## Co je Plasma? {#what-is-plasma}

Plasma je framework pro zlepšení škálovatelnosti ve veřejných blockchainech, jako je Ethereum. Jak je popsáno v původní [bílé knize Plasmy](https://plasma.io/plasma.pdf), řetězce Plasma jsou postaveny na jiném blockchainu (nazývaném „kořenový řetězec“). Každý „dceřiný řetězec“ vychází z kořenového řetězce a je obecně spravován chytrým kontraktem nasazeným na mateřském řetězci.

Kontrakt Plasmy funguje mimo jiné jako [most](/developers/docs/bridges/), který uživatelům umožňuje přesouvat aktiva mezi Ethereum Mainnetem a řetězcem Plasma. Ačkoli jsou díky tomu podobné [postranním řetězcům](/developers/docs/scaling/sidechains/), řetězce Plasma těží – alespoň do určité míry – z bezpečnosti Ethereum Mainnetu. To je rozdíl oproti postranním řetězcům, které jsou za svou bezpečnost zodpovědné samy.

## Jak Plasma funguje? {#how-does-plasma-work}

Základní komponenty frameworku Plasma jsou:

### Výpočty offchain {#offchain-computation}

Současná rychlost zpracování Etherea je omezena na ~ 15–20 transakcí za sekundu, což snižuje krátkodobou možnost škálování pro zvládnutí více uživatelů. Tento problém existuje hlavně proto, že [mechanismus konsensu](/developers/docs/consensus-mechanisms/) Etherea vyžaduje, aby mnoho peer-to-peer uzlů ověřilo každou aktualizaci stavu blockchainu.

Ačkoli je mechanismus konsensu Etherea nezbytný pro bezpečnost, nemusí se vztahovat na každý případ použití. Například Alice možná nepotřebuje, aby její každodenní platby Bobovi za šálek kávy ověřovala celá síť Etherea, protože mezi oběma stranami existuje určitá důvěra.

Plasma předpokládá, že Ethereum Mainnet nemusí ověřovat všechny transakce. Místo toho můžeme transakce zpracovávat mimo Mainnet, čímž uzly osvobodíme od nutnosti validovat každou transakci.

Výpočty offchain jsou nezbytné, protože řetězce Plasma mohou optimalizovat rychlost a náklady. Například řetězec Plasma může – a nejčastěji to tak dělá – používat jediného „operátora“ ke správě řazení a provádění transakcí. S jedinou entitou ověřující transakce jsou doby zpracování na řetězci Plasma rychlejší než na Ethereum Mainnetu.

### Stavové závazky {#state-commitments}

Zatímco Plasma provádí transakce offchain, jsou vypořádány na hlavní exekuční vrstvě Etherea – jinak by řetězce Plasma nemohly těžit z bezpečnostních záruk Etherea. Ale finalizace offchain transakcí bez znalosti stavu řetězce Plasma by narušila bezpečnostní model a umožnila šíření neplatných transakcí. Proto je operátor, entita zodpovědná za produkci bloků na řetězci Plasma, povinen pravidelně publikovat „stavové závazky“ na Ethereu.

[Závazkové schéma](https://en.wikipedia.org/wiki/Commitment_scheme) je kryptografická technika pro zavázání se k hodnotě nebo tvrzení, aniž by byla odhalena druhé straně. Závazky jsou „závazné“ v tom smyslu, že jakmile se k hodnotě nebo tvrzení zavážete, nemůžete je změnit. Stavové závazky v Plasmě mají podobu „Merkleho kořenů“ (odvozených z [Merkleova stromu](/whitepaper/#merkle-trees)), které operátor v intervalech odesílá do kontraktu Plasmy na řetězci Etherea.

Merkleho kořeny jsou kryptografická primitiva, která umožňují kompresi velkého množství informací. Merkleho kořen (v tomto případě nazývaný také „kořen bloku“) by mohl představovat všechny transakce v bloku. Merkleho kořeny také usnadňují ověření, že malý kousek dat je součástí většího datového souboru. Například uživatel může vytvořit [Merkleův důkaz](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content), aby prokázal zahrnutí transakce do konkrétního bloku.

Merkleho kořeny jsou důležité pro poskytování informací o stavu offchainu Ethereu. Merkleho kořeny si můžete představit jako „body uložení“: operátor říká: „Toto je stav řetězce Plasma v čase x a toto je Merkleho kořen jako důkaz.“ Operátor se zavazuje k _aktuálnímu stavu_ řetězce Plasma pomocí Merkleho kořene, a proto se tomu říká „stavový závazek“.

### Vstupy a výstupy {#entries-and-exits}

Aby uživatelé Etherea mohli využívat Plasmu, musí existovat mechanismus pro přesun prostředků mezi Mainnetem a řetězci Plasma. Nemůžeme však libovolně posílat ether na adresu na řetězci Plasma – tyto řetězce jsou nekompatibilní, takže by transakce buď selhala, nebo by vedla ke ztrátě prostředků.

Plasma používá hlavní kontrakt běžící na Ethereu ke zpracování uživatelských vstupů a výstupů. Tento hlavní kontrakt je také zodpovědný za sledování stavových závazků (vysvětleno dříve) a trestání nečestného chování prostřednictvím důkazů o podvodu (více o tom později).

#### Vstup do řetězce Plasma {#entering-the-plasma-chain}

Pro vstup do řetězce Plasma bude muset Alice (uživatelka) vložit ETH nebo jakýkoli ERC-20 token do kontraktu Plasmy. Operátor Plasmy, který sleduje vklady do kontraktu, znovu vytvoří částku rovnající se počátečnímu vkladu Alice a uvolní ji na její adresu na řetězci Plasma. Alice je povinna potvrdit přijetí prostředků na dceřiném řetězci a poté může tyto prostředky použít pro transakce.

#### Výstup z řetězce Plasma {#exiting-the-plasma-chain}

Výstup z řetězce Plasma je z několika důvodů složitější než vstup do něj. Tím největším je, že ačkoli má Ethereum informace o stavu řetězce Plasma, nemůže ověřit, zda jsou tyto informace pravdivé, či nikoli. Zlomyslný uživatel by mohl učinit nesprávné tvrzení („Mám 1000 ETH“) a projít mu to poskytnutím falešných důkazů na podporu tohoto nároku.

Aby se zabránilo zlomyslným výběrům, je zavedeno „období pro zpochybnění“. Během období pro zpochybnění (obvykle jeden týden) může kdokoli zpochybnit žádost o výběr pomocí důkazu o podvodu. Pokud je zpochybnění úspěšné, žádost o výběr je zamítnuta.

Obvykle je však situace taková, že uživatelé jsou čestní a vznášejí správné nároky na prostředky, které vlastní. V tomto scénáři Alice iniciuje žádost o výběr na kořenovém řetězci (Ethereu) odesláním transakce do kontraktu Plasmy.

Musí také poskytnout Merkleův důkaz ověřující, že transakce vytvářející její prostředky na řetězci Plasma byla zahrnuta do bloku. To je nezbytné pro iterace Plasmy, jako je Plasma MVP, které používají model [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Jiné, jako Plasma Cash, představují prostředky jako [nezaměnitelné tokeny](/developers/docs/standards/tokens/erc-721/) namísto UTXO. Výběr v tomto případě vyžaduje důkaz o vlastnictví tokenů na řetězci Plasma. To se provádí odesláním dvou nejnovějších transakcí týkajících se tokenu a poskytnutím Merkleova důkazu ověřujícího zahrnutí těchto transakcí do bloku.

Uživatel musí k žádosti o výběr také přidat kauci jako záruku čestného chování. Pokud zpochybňovatel prokáže, že je žádost Alice o výběr neplatná, její kauce je penalizována a část z ní připadne zpochybňovateli jako odměna.

Pokud období pro zpochybnění uplyne, aniž by kdokoli poskytl důkaz o podvodu, žádost Alice o výběr je považována za platnou, což jí umožní získat vklady z kontraktu Plasmy na Ethereu.
### Řešení sporů {#dispute-arbitration}

Jako každý blockchain, i řetězce Plasma potřebují mechanismus pro prosazování integrity transakcí pro případ, že by účastníci jednali zlomyslně (např. dvojí útrata prostředků). Za tímto účelem používají řetězce Plasma důkazy o podvodu k řešení sporů týkajících se platnosti přechodů stavu a k penalizaci špatného chování. Důkazy o podvodu se používají jako mechanismus, jehož prostřednictvím dceřiný řetězec Plasma podává stížnost svému mateřskému řetězci nebo kořenovému řetězci.

Důkaz o podvodu je jednoduše tvrzení, že konkrétní přechod stavu je neplatný. Příkladem je, když se uživatel (Alice) pokusí utratit stejné prostředky dvakrát. Možná utratila UTXO v transakci s Bobem a chce utratit stejné UTXO (které je nyní Bobovo) v jiné transakci.

Aby Bob zabránil výběru, zkonstruuje důkaz o podvodu poskytnutím důkazu o tom, že Alice utratila zmíněné UTXO v předchozí transakci, a Merkleova důkazu o zahrnutí transakce do bloku. Stejný proces funguje v Plasma Cash – Bob by musel poskytnout důkaz, že Alice dříve převedla tokeny, které se snaží vybrat.

Pokud je Bobovo zpochybnění úspěšné, žádost Alice o výběr je zrušena. Tento přístup však spoléhá na Bobovu schopnost sledovat řetězec kvůli žádostem o výběr. Pokud je Bob offline, pak může Alice zpracovat zlomyslný výběr, jakmile uplyne období pro zpochybnění.

## Problém hromadného výstupu v Plasmě {#the-mass-exit-problem-in-plasma}

Problém hromadného výstupu nastává, když se velké množství uživatelů pokusí vybrat prostředky z řetězce Plasma ve stejnou dobu. Důvod existence tohoto problému souvisí s jedním z největších problémů Plasmy: **nedostupností dat**.

Dostupnost dat je schopnost ověřit, že informace pro navrhovaný blok byly skutečně publikovány na blockchainové síti. Blok je „nedostupný“, pokud producent publikuje samotný blok, ale zadrží data použitá k vytvoření bloku.

Bloky musí být dostupné, aby uzly mohly blok stáhnout a ověřit platnost transakcí. Blockchainy zajišťují dostupnost dat tím, že nutí producenty bloků zveřejňovat všechna transakční data onchain.

Dostupnost dat také pomáhá se zabezpečením offchain škálovacích protokolů, které staví na základní vrstvě Etherea. Tím, že jsou operátoři na těchto řetězcích nuceni publikovat transakční data na Ethereu, může kdokoli zpochybnit neplatné bloky zkonstruováním důkazů o podvodu odkazujících na správný stav řetězce.

Řetězce Plasma primárně ukládají transakční data u operátora a **nepublikují žádná data na Mainnetu** (tj. kromě pravidelných stavových závazků). To znamená, že uživatelé se musí spoléhat na operátora, že poskytne data bloku, pokud potřebují vytvořit důkazy o podvodu zpochybňující neplatné transakce. Pokud tento systém funguje, pak uživatelé mohou vždy použít důkazy o podvodu k zabezpečení prostředků.

Problém začíná, když je operátor, a ne jen tak ledajaký uživatel, stranou jednající zlomyslně. Protože má operátor výhradní kontrolu nad blockchainem, má větší motivaci prosazovat neplatné přechody stavu ve větším měřítku, jako je krádež prostředků patřících uživatelům na řetězci Plasma.

V tomto případě použití klasického systému důkazů o podvodu nefunguje. Operátor by mohl snadno provést neplatnou transakci převádějící prostředky Alice a Boba do své peněženky a skrýt data nezbytná pro vytvoření důkazu o podvodu. To je možné, protože operátor není povinen zpřístupnit data uživatelům nebo Mainnetu.

Proto je nejoptimističtějším řešením pokusit se o „hromadný výstup“ uživatelů z řetězce Plasma. Hromadný výstup zpomaluje plán zlomyslného operátora na krádež prostředků a poskytuje uživatelům určitou míru ochrany. Žádosti o výběr jsou seřazeny na základě toho, kdy bylo každé UTXO (nebo token) vytvořeno, což brání zlomyslným operátorům v předbíhání čestných uživatelů.

Nicméně stále potřebujeme způsob, jak ověřit platnost žádostí o výběr během hromadného výstupu – abychom zabránili oportunistickým jednotlivcům vydělat na chaosu zpracováním neplatných výstupů. Řešení je jednoduché: požadovat po uživatelích, aby zveřejnili poslední **platný stav řetězce**, aby mohli vybrat své peníze.

Tento přístup má však stále problémy. Například pokud potřebují vystoupit všichni uživatelé na řetězci Plasma (což je v případě zlomyslného operátora možné), pak musí být celý platný stav řetězce Plasma naráz vyklopen na základní vrstvu Etherea. Vzhledem k libovolné velikosti řetězců Plasma (vysoká propustnost = více dat) a omezením rychlosti zpracování Etherea to není ideální řešení.

Ačkoli výstupní hry znějí teoreticky hezky, hromadné výstupy v reálném životě pravděpodobně vyvolají celosíťové přetížení na samotném Ethereu. Kromě poškození funkčnosti Etherea znamená špatně koordinovaný hromadný výstup, že uživatelé možná nebudou moci vybrat prostředky dříve, než operátor vysaje každý účet na řetězci Plasma.

## Výhody a nevýhody Plasmy {#pros-and-cons-of-plasma}

| Výhody                                                                                                                                                                                                                             | Nevýhody                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nabízí vysokou propustnost a nízké náklady na transakci.                                                                                                                                                                             | Nepodporuje obecné výpočty (nemůže spouštět chytré kontrakty). Prostřednictvím predikátové logiky jsou podporovány pouze základní převody tokenů, swapy a několik dalších typů transakcí.    |
| Dobré pro transakce mezi libovolnými uživateli (žádná režie na pár uživatelů, pokud jsou oba etablováni na řetězci Plasma).                                                                                                            | Je nutné pravidelně sledovat síť (požadavek na živost) nebo delegovat tuto odpovědnost na někoho jiného, aby byla zajištěna bezpečnost vašich prostředků.                          |
| Řetězce Plasma lze přizpůsobit konkrétním případům použití, které nesouvisejí s hlavním řetězcem. Kdokoli, včetně podniků, si může přizpůsobit chytré kontrakty Plasmy tak, aby poskytovaly škálovatelnou infrastrukturu, která funguje v různých kontextech. | Spoléhá na jednoho nebo více operátorů, kteří ukládají data a poskytují je na vyžádání.                                                                                                     |
| Snižuje zátěž Ethereum Mainnetu přesunem výpočtů a úložiště offchain.                                                                                                                                                    | Výběry jsou zpožděny o několik dní, aby bylo možné provést zpochybnění. U zaměnitelných aktiv to mohou zmírnit poskytovatelé likvidity, ale je s tím spojen kapitálový náklad. |
|                                                                                                                                                                                                                                  | Pokud se příliš mnoho uživatelů pokusí vystoupit současně, Ethereum Mainnet by se mohl přetížit.                                                                                          |

## Plasma vs. protokoly škálování vrstvy 2 (l2) {#plasma-vs-layer-2}

Zatímco Plasma byla kdysi považována za užitečné řešení škálování pro Ethereum, od té doby byla opuštěna ve prospěch [protokolů škálování vrstvy 2 (l2)](/layer-2/). Řešení škálování L2 napravují několik problémů Plasmy:

### Efektivita {#efficiency}

[Rollupy s nulovým vědomím](/developers/docs/scaling/zk-rollups) generují kryptografické důkazy o platnosti každé dávky transakcí zpracovaných offchain. To brání uživatelům (a operátorům) v prosazování neplatných přechodů stavu, čímž se eliminuje potřeba období pro zpochybnění a výstupních her. Znamená to také, že uživatelé nemusí pravidelně sledovat řetězec, aby zabezpečili své prostředky.

### Podpora chytrých kontraktů {#support-for-smart-contracts}

Dalším problémem frameworku Plasma byla [neschopnost podporovat provádění chytrých kontraktů Etherea](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). V důsledku toho byla většina implementací Plasmy většinou postavena pro jednoduché platby nebo výměnu ERC-20 tokenů.

Naopak optimistické rollupy jsou kompatibilní s [Ethereum Virtual Machine](/developers/docs/evm/) a mohou spouštět nativní [chytré kontrakty](/developers/docs/smart-contracts/) Etherea, což z nich činí užitečné a _bezpečné_ řešení pro škálování [decentralizovaných aplikací (dapp)](/developers/docs/dapps/). Podobně probíhají plány na [vytvoření implementace EVM s nulovým vědomím (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549), která by umožnila ZK-rollupům zpracovávat libovolnou logiku a spouštět chytré kontrakty.

### Nedostupnost dat {#data-unavailability}

Jak bylo vysvětleno dříve, Plasma trpí problémem dostupnosti dat. Pokud by zlomyslný operátor prosadil neplatný přechod na řetězci Plasma, uživatelé by jej nemohli zpochybnit, protože operátor může zadržet data potřebná k vytvoření důkazu o podvodu. Rollupy tento problém řeší tím, že nutí operátory zveřejňovat transakční data na Ethereu, což komukoli umožňuje ověřit stav řetězce a v případě potřeby vytvořit důkazy o podvodu.

### Problém hromadného výstupu {#mass-exit-problem}

ZK-rollupy i optimistické rollupy řeší problém hromadného výstupu Plasmy různými způsoby. Například ZK-rollup spoléhá na kryptografické mechanismy, které zajišťují, že operátoři nemohou za žádného scénáře ukrást prostředky uživatelů.

Podobně optimistické rollupy ukládají na výběry období zpoždění, během kterého může kdokoli iniciovat zpochybnění a zabránit zlomyslným žádostem o výběr. Ačkoli je to podobné Plasmě, rozdíl je v tom, že ověřovatelé mají přístup k datům potřebným k vytvoření důkazů o podvodu. Uživatelé rollupů se tedy nemusí zapojovat do zběsilé migrace na Ethereum Mainnet ve stylu „kdo dřív přijde, ten dřív mele“.

## Jak se Plasma liší od postranních řetězců a shardingu? {#plasma-sidechains-sharding}

Plasma, postranní řetězce a sharding jsou si docela podobné, protože se všechny nějakým způsobem připojují k Ethereum Mainnetu. Úroveň a síla těchto spojení se však liší, což ovlivňuje bezpečnostní vlastnosti každého řešení škálování.

### Plasma vs. postranní řetězce {#plasma-vs-sidechains}

[Postranní řetězec](/developers/docs/scaling/sidechains/) je nezávisle provozovaný blockchain připojený k Ethereum Mainnetu prostřednictvím obousměrného mostu. [Mosty](/bridges/) umožňují uživatelům vyměňovat tokeny mezi dvěma blockchainy za účelem provádění transakcí na postranním řetězci, což snižuje přetížení na Ethereum Mainnetu a zlepšuje škálovatelnost.
Postranní řetězce používají samostatný mechanismus konsensu a jsou obvykle mnohem menší než Ethereum Mainnet. V důsledku toho přemostění aktiv na tyto řetězce zahrnuje zvýšené riziko; vzhledem k nedostatku bezpečnostních záruk zděděných z Ethereum Mainnetu v modelu postranního řetězce riskují uživatelé ztrátu prostředků při útoku na postranní řetězec.

Naopak řetězce Plasma odvozují svou bezpečnost z Mainnetu. Díky tomu jsou měřitelně bezpečnější než postranní řetězce. Jak postranní řetězce, tak řetězce Plasma mohou mít různé protokoly konsensu, ale rozdíl je v tom, že řetězce Plasma publikují Merkleho kořeny pro každý blok na Ethereum Mainnetu. Kořeny bloků jsou malé kousky informací, které můžeme použít k ověření informací o transakcích, ke kterým dochází na řetězci Plasma. Pokud dojde k útoku na řetězec Plasma, uživatelé mohou bezpečně vybrat své prostředky zpět na Mainnet pomocí příslušných důkazů.

### Plasma vs. sharding {#plasma-vs-sharding}

Jak řetězce Plasma, tak shardové řetězce pravidelně publikují kryptografické důkazy na Ethereum Mainnet. Oba však mají odlišné bezpečnostní vlastnosti.

Shardové řetězce odesílají na Mainnet „hlavičky kolací“ (collation headers) obsahující podrobné informace o každém datovém shardu. Uzly na Mainnetu ověřují a prosazují platnost datových shardů, čímž snižují možnost neplatných přechodů shardů a chrání síť před zlomyslnou aktivitou.

Plasma je odlišná, protože Mainnet dostává pouze minimální informace o stavu dceřiných řetězců. To znamená, že Mainnet nemůže efektivně ověřovat transakce prováděné na dceřiných řetězcích, což je činí méně bezpečnými.

**Poznámka:** Sharding blockchainu Etherea již není v plánu (roadmap). Byl nahrazen škálováním pomocí rollupů a [dankshardingu](/roadmap/danksharding).

### Použití Plasmy {#use-plasma}

Několik projektů poskytuje implementace Plasmy, které můžete integrovat do svých decentralizovaných aplikací (dapp):

- [Polygon](https://polygon.technology/) (dříve Matic Network)

## Další čtení {#further-reading}

- [Rychlé připomenutí toho, co znamená „sdílená bezpečnost“ a proč je tak důležitá](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Postranní řetězce vs. Plasma vs. sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Porozumění Plasmě, část 1: Základy](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Život a smrt Plasmy](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
## Návody: Řetězce Plasma na Ethereu {#tutorials}

- [Napište Plasmu specifickou pro aplikaci, která zachovává soukromí](/developers/tutorials/app-plasma/) _– Vytvořte aplikaci Plasma zachovávající soukromí pomocí důkazů s nulovou znalostí a offchain komponent._
