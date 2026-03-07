---
title: Glamsterdam
description: Zjistěte více o upgradu protokol Glamsterdam
lang: cs
---
# Glamsterdam {#glamsterdam}

**Glamsterdam je nadcházející upgrade Etherea plánovaný na první pololetí roku 2026**


<Alert variant="update">
<AlertContent>
<AlertDescription>
Aktualizace Glamsterdam je jen jedním z kroků v rámci dlouhodobých vývojových cílů Etherea. Zjistěte více o [plán vylepšení protokol](/roadmap/) a [předchozích aktualizacích](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Nadcházející upgrade [sítě Ethereum](/) s názvem Glamsterdam má připravit cestu pro další generaci škálování. Glamsterdam je název vzniklý spojením „Amsterdam“ (upgrade exekuční vrstva, pojmenovaný podle předchozího místa konání Devconnect) a „Glaas“ (upgrade konsensuální vrstva, pojmenovaný podle hvězdy).

Po pokroku dosaženém při upgradu [Fusaka](/roadmap/fusaka/) se Glamsterdam zaměřuje na škálování L1 reorganizací způsobu, jakým síť zpracovává transakce a spravuje svou rostoucí databázi, a zásadně aktualizuje způsob, jakým Ethereum vytváří a ověřuje bloky.

Zatímco se Fusaka zaměřila na základní vylepšení, Glamsterdam posouvá cíle „Scale L1“ a „Scale Blobs“ tím, že zakotvuje oddělení povinností mezi různými účastníky síť a zavádí efektivnější způsoby zpracování dat, aby se <GlossaryTooltip termKey="state">stav</GlossaryTooltip> připravil na vysoce výkonnou paralelizaci. 

Tato vylepšení zajišťují, že Ethereum zůstane rychlé, cenově dostupné a decentralizované i při zpracování většího objemu aktivit, přičemž hardwarové požadavky zůstanou zvládnutelné pro lidi, kteří provozují <GlossaryTooltip termKey="node">uzly</GlossaryTooltip> doma.

<YouTube id="GgKveVMLnoo" />

***
## Zvažují se vylepšení pro Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Poznámka: Tento článek v současné době upozorňuje na výběr EIP, které se zvažují pro zařazení do Glamsterdamu. Nejnovější aktualizace stavu naleznete v [upgradu Glamsterdam na Forkcastu](https://forkcast.org/upgrade/glamsterdam). 

Pokud chcete přidat EIP, které je zvažováno pro Glamsterdam, ale ještě nebylo přidáno na tuto stránku, [zjistěte zde, jak přispět na ethereum.org](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Vylepšení Glamsterdam se zaměřuje na tři hlavní cíle:

- Zrychlení zpracování (paralelizace): Reorganizace způsobu, jakým síť zaznamenává datové závislosti, aby mohla bezpečně zpracovávat mnoho transakce současně namísto pomalého, postupného zpracování.
- Rozšíření kapacity: Rozdělení náročné práce na vytváření a ověřování bloky, což dává síť více času na šíření větších objemů dat bez zpomalení.
- Zabránění nadměrnému nárůstu databáze (udržitelnost): Úprava síť poplatků tak, aby přesně odrážely dlouhodobé náklady na hardware pro ukládání nových dat, odblokování budoucího zvýšení limit transakčních poplatků a zároveň zabránění zhoršení výkonu hardwaru.

Stručně řečeno, Glamsterdam zavede strukturální změny, které zajistí, že s rostoucí kapacitou síť zůstane udržitelná a její výkon vysoký.

## Škálování L1 a paralelní zpracování {#scale-l1}

Smysluplné škálování L1 vyžaduje odklon od předpokladů důvěry mimo protokol a omezení sériového provádění. Glamsterdam to řeší zakotvením oddělení určitých povinností při sestavování bloků a zavedením nových datových struktur, které síť umožňují připravit se na paralelní zpracování.

### Hlavní návrh: Zavedení oddělení navrhovatele a sestavovatele (ePBS) {#epbs}

- Odstraňuje předpoklady důvěry mimo protokol a závislost na uzavřených relé.
- Umožňuje škálování L1 tím, že umožňuje mnohem větší datové zatížení prostřednictvím rozšířených oken šíření.
- Zavádí bezdůvěrové platby pro tvůrce a šifrované transakce pro anonymní tvůrce.

V současné době proces navrhování a sestavování bloky zahrnuje předání mezi blok a sestavovateli blok. Vztah mezi navrhovateli a sestavovateli není součástí základního protokol Etherea, takže se spoléhá na proprietární software třetích stran (relé) a také na mimoprotokolovou důvěru mezi entitami. 

Mimořádný vztah mezi navrhovateli a tvůrci bloků také vytváří „horkou cestu“ během ověřování blok, která nutí <GlossaryTooltip termKey="validator">validátoři</GlossaryTooltip> k rychlému vysílání a provádění transakce v úzkém dvousekundovém okně, což omezuje množství dat, které síť dokáže zpracovat.

**Zavedení oddělení navrhovatele a sestavovatele (ePBS neboli EIP-7732)** formálně odděluje práci navrhovatele (který vybírá blok) od sestavovatele (který sestavuje transakce), čímž se tento proces „zakotvuje“ přímo do protokol Ethereum, aby se odstranila nutnost důvěry mimo protokol. Zavádí také Výbor pro včasnost dat (PTC) a logiku dvojitého termínu, přičemž validátoři potvrzují včasnost a dostupnost dat samostatně, aby se maximalizoval výkon. 

<YouTube id="u8XvkTrjITs" />

Oddělení rolí navrhovatele a tvůrce na úrovni protokol rozšiřuje okno šíření (neboli čas dostupný pro šíření dat po síť) z 2 sekund na přibližně 9 sekund. 

ePBS snižuje závislost na dodatečném softwaru třetích stran a umožňuje Ethereu bezpečně zpracovávat mnohem větší množství dat (například více blobů pro <GlossaryTooltip termKey="layer-2">vrstvu 2</GlossaryTooltip> ), aniž by to zatěžovalo síť.

**Zdroje**: [Technická specifikace EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Návrh hlavního tématu: Seznamy přístupů na úrovni bloků (BAL) {#bals}

- Eliminuje úzká místa sekvenčního zpracování tím, že poskytuje předběžnou mapu všech transakce závislostí, čímž vytváří podmínky pro to, aby validátoři zpracovávali mnoho transakce paralelně namísto jednu po druhé.
- Umožňuje uzlům aktualizovat své záznamy čtením konečných výsledků bez nutnosti přehrávat každou transakce (synchronizace bez spuštění), což výrazně urychluje synchronizaci síťový uzel se síť. 
- Eliminuje dohadování a umožňuje validátoři předem načíst všechna potřebná data najednou, namísto aby je objevovali krok za krokem, což výrazně urychluje validaci. 

Dnešní Ethereum je jako jednopruhová silnice; protože síť neví, jaká data transakce bude potřebovat nebo měnit (například kterých účtů se transakce dotkne), dokud se transakce nespustí, validátoři musí transakce zpracovávat jednu po druhé v přísném, sekvenčním pořadí. Pokud by se pokusili zpracovat transakce najednou, aniž by znali tyto závislosti, dvě transakce by se mohly omylem pokusit změnit přesně stejná data ve stejnou dobu, což by způsobilo chyby.

**Seznamy přístupů na úrovni bloků (BAL, neboli EIP-7928)** jsou jako mapa, která je součástí každého blok a která síť sděluje, ke kterým částem databáze bude přistupováno před zahájením práce. BAL vyžadují, aby každý blok obsahoval haš každé změny účet, které se transakce dotknou, spolu s konečnými výsledky těchto změn ( haš záznamu všech přístupů ke stav a hodnot po provedení). 

Protože poskytují okamžitý přehled o tom, které transakce se nepřekrývají, umožňují BAL uzlům provádět paralelní čtení z disku a načítat informace pro mnoho transakce současně. síť může bezpečně seskupovat nesouvisející transakce a zpracovávat je paralelně. 

Vzhledem k tomu, že BAL zahrnuje konečné výsledky transakce (hodnoty po provedení), mohou uzly sítě při synchronizaci s aktuálním stav sítě zkopírovat tyto konečné výsledky a aktualizovat tak své záznamy. Validátoři již nemusí přehrávat všechny složité transakce od začátku, aby věděli, co se stalo, což urychluje a usnadňuje připojení nových uzlů k síť. 

Paralelní čtení disků umožněné protokolem BAL bude významným krokem k budoucnosti, kdy Ethereum bude moci zpracovávat mnoho transakce najednou, což výrazně zvýší rychlost sítě.

#### eth/71 výměna seznamu blok přístupů {#bale}

Výměna seznamů přístupů k blokům (eth/71 nebo EIP-8159) je přímým síťovým doplňkem k seznamům přístupů na úrovni bloků. Zatímco BALy odemykají paralelní provádění, eth/71 vylepšuje protokol peer-to-peer, aby uzly mohly tyto seznamy skutečně sdílet přes síť. Implementace výměny seznamů přístupů k blok umožní rychlejší synchronizaci a umožní uzlům provádět aktualizace stav bez provádění.

**Zdroje**: 
- [Technická specifikace EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Technická specifikace EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Udržitelnost sítě {#network-sustainability}

Vzhledem k tomu, že síť Ethereum roste stále rychleji, je důležité zajistit, aby náklady na její používání odpovídaly opotřebení hardwaru, na kterém Ethereum běží. síť musí zvýšit své celkové limity kapacity, aby mohla bezpečně škálovat a zpracovávat více transakce. 

### Zvýšení nákladů na palivo při vytváření stavu {#state-creation-gas-cost-increase}

- Zajišťuje, aby poplatky za vytvoření nových účtů nebo chytrých kontraktů přesně odrážely dlouhodobou zátěž, kterou kladou na databázi Etherea.
- Automaticky upravuje tyto poplatky za vytváření dat na základě celkové kapacity sítě a zaměřuje se na bezpečnou a předvídatelnou míru růstu, aby standardní fyzický hardware mohl nadále provozovat síť.
- Odděluje účtování těchto specifických poplatků do nového úložiště, odstraňuje staré transakce limity a umožňuje vývojářům nasazovat větší a složitější aplikace.

Přidávání nových účtů, tokenů a <GlossaryTooltip termKey="smart-contract">chytrých kontraktů</GlossaryTooltip> vytváří trvalá data (známá jako „stav“), která musí každý počítač spouštějící síť ukládat na dobu neurčitou. Současné poplatky za přidání nebo čtení těchto dat jsou nekonzistentní a nemusí nutně odrážet skutečnou, dlouhodobou zátěž, kterou kladou na hardware sítě.

Některé akce, které vytvářejí stav na Ethereu, jako je vytváření nových účtů nebo nasazování velkých chytrých kontraktů, byly relativně levné ve srovnání s trvalým úložným prostorem, který zabírají na uzlech sítě. Například nasazení kontraktu je výrazně levnější na bajt než vytvoření úložných slotů. 

Bez úprav by se stav Etherea mohl zvětšovat o téměř 200 GiB ročně, pokud se síť rozšíří na limit transakčních poplatků, což by nakonec předčilo běžný hardware. 

**Zvýšení nákladů na palivo při vytváření stavu (nebo EIP-8037)** harmonizuje náklady tím, že je váže na skutečnou velikost vytvářených dat, a aktualizuje poplatky tak, aby byly úměrné množství trvalých dat, která operace vytváří nebo ke kterým přistupuje. 

EIP-8037 také zavádí model zásobníku pro předvídatelnější správu těchto nákladů; poplatky za stav palivo se čerpají nejprve z `state_gas_reservoir` a operační kód `GAS` vrací pouze `gas_left`, čímž zabraňuje rámcům provádění chybně vypočítat dostupný palivo.

Před EIP-8037 sdílely jak výpočetní práce (aktivní zpracování), tak trvalé ukládání dat (ukládání smart kontrakt do databáze sítě) stejný limit transakčních poplatků. Model zásobníku rozděluje účtování: limit transakčních poplatků pro skutečnou výpočetní práci transakce (zpracování) a pro dlouhodobé ukládání dat (stav palivo). Oddělení těchto dvou složek pomáhá zabránit tomu, aby samotná velikost dat aplikace vyčerpala limit transakčních poplatků; pokud vývojáři poskytnou dostatek prostředků k naplnění zásobníku pro ukládání dat, mohou nasadit mnohem větší a složitější chytré kontrakty. 

Přesnější a předvídatelnější stanovení cen za ukládání dat pomůže Ethereu bezpečně zvýšit rychlost a kapacitu, aniž by se databáze zbytečně nafukovala. Tato udržitelnost umožní provozovatelům síťový uzel používat (relativně) cenově dostupný hardware po mnoho dalších let, čímž se zachová dostupnost domácího staking pro udržení decentralizace sítě.

**Zdroje**: [Technická specifikace EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aktualizace nákladů na palivo pro státní přístup {#state-access-gas-cost-update}

- Zvyšuje náklady na palivo pro případ, kdy aplikace čtou nebo aktualizují informace trvale uložené v Ethereu (operační kódy pro přístup ke stavu), aby přesně odpovídaly výpočetní práci, kterou tyto příkazy vyžadují.

S tím, jak se stav Etherea rozrůstal, se proces vyhledávání a čtení starých dat („přístup ke stav “) stal pro uzly náročnějším a pomalejším. Poplatky za tyto akce zůstaly stejné, i když je nyní vyhledávání informací (z hlediska výpočetního výkonu) o něco dražší. 

V důsledku toho jsou některé specifické příkazy v současné době podhodnoceny vzhledem k práci, kterou nutí síťový uzel vykonávat. Například `EXTCODESIZE` a `EXTCODECOPY` jsou podhodnoceny, protože vyžadují dvě samostatná čtení z databáze – jedno pro objekt účet a druhé pro skutečnou velikost kódu nebo bajtového kódu.

**Aktualizace nákladů na palivo pro přístup ke stavu (nebo EIP-8038)** zvyšuje konstanty palivo pro operační kódy přístupu ke stavu, jako je vyhledávání dat účet a smluv, aby se přizpůsobily výkonu moderního hardwaru a velikosti stav. 

Sjednocení nákladů na přístup ke stavu také pomáhá zvýšit odolnost Etherea. Protože jsou tyto náročné operace čtení dat uměle levné, mohl by škodlivý útočník zaplavit síť tisíci složitých datových požadavků v jednom blok, než dosáhne limitu poplatků sítě, což by potenciálně mohlo způsobit zastavení nebo zhroucení síť (útok typu „Denial-of-Service“). I bez zlého úmyslu nejsou vývojáři ekonomicky motivováni k vytváření efektivních aplikací, pokud je čtení síť dat příliš levné.

Přesnějším oceňováním akcí vyžadujících přístup ke stavu může být Ethereum odolnější vůči náhodným nebo úmyslným zpomalením, zatímco sladění nákladů síť s hardwarovým zatížením se ukazuje jako udržitelnější základ pro budoucí zvyšování limit transakčních poplatků.

**Zdroje**: [Technická specifikace EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Odolnost sítě 

Vylepšení povinností validátor a výstupních procesů zajišťují stabilitu síť během hromadných penalizací a demokratizují likviditu. Tato vylepšení zvyšují stabilitu síť a zajišťují, že se se všemi účastníky, velkými i malými, zachází spravedlivě.

### Vyloučit penalizované validátoři z navrhování {#exclude-slashed-validators}

- Zabrání penalizovaným (sníženým) validátoři v tom, aby byli vybíráni k navrhování budoucích bloky, čímž se eliminují zaručeně propásnuté sloty.
- Zajišťuje hladký a spolehlivý chod Etherea a zabraňuje vážným výpadkům v případě hromadného useknutí.

V současné době, i když je validátor penalizován (za porušení pravidel nebo nefungování podle očekávání), systém si ho může v blízké budoucnosti stále vybrat k vedení blok, když generuje budoucí návrhy navrhovatelů. 

Vzhledem k tomu, že bloky od „seknutých“ navrhovatelů jsou automaticky odmítány jako neplatné, dochází k tomu, že síť propásne sloty a zpožďuje se obnova síť během hromadného „useknutí “. 

**Vyloučení penalizovaných validátoři z navrhování (nebo EIP-8045)** jednoduše odfiltruje penalizované validátoři z výběru pro budoucí úkoly. Tím se zlepšuje odolnost řetězce tím, že se zajišťuje, že pro navrhování bloky jsou vybíráni pouze zdraví validátoři, což udržuje kvalitu služeb během síť poruch.

**Zdroje**: [Technická specifikace EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Povolit výstupům používat konsolidační frontu {#let-exits-use-the-consolidation-queue}

- Uzavírá mezeru, která umožňuje validátoři s vysokým zůstatkem opustit síť rychleji než menším validátoři prostřednictvím konsolidační fronty. 
- Umožňuje pravidelným výběrům přejít do této druhé fronty, když má volnou kapacitu, čímž se zkracuje doba staking vkladů během období s vysokým objemem.
- Udržuje přísné zabezpečení, aby se zabránilo změně základních bezpečnostních limitů Etherea nebo oslabení síť.

Vzhledem k tomu, že [upgrade Pectra](/roadmap/pectra) zvýšil maximální efektivní zůstatek pro validátoři Etherea z 32 ETH na 2 048 ETH, technická mezera umožňuje validátoři s vysokým zůstatkem opustit síť rychleji než menším validátoři prostřednictvím konsolidační fronty.

**Umožnění použití konsolidační fronty pro všechny výstupy (nebo EIP-8080)** demokratizuje konsolidační frontu pro všechny výstupy ze staking a vytváří tak jednotnou a spravedlivou frontu pro všechny.  

Jak to dnes funguje:

- Limit churnu u Etherea je bezpečnostní limit pro rychlost, s jakou mohou validátoři vstupovat, vystupovat nebo slučovat (konsolidovat) svůj stakovaný ETH, aby byla zajištěna bezpečnost sítě.
- Protože konsolidace validátor je náročnější akce s více pohyblivými částmi než standardní ukončení validátor, spotřebuje větší část tohoto bezpečnostního rozpočtu (limit churn). 
- Konkrétně protokol stanoví, že přesné bezpečnostní náklady jednoho standardního výstupu jsou dvě třetiny (2/3) nákladů jednoho konsolidovaného výstupu.

Spravedlivější fronty pro výběry umožní standardním výběrům půjčovat si nevyužitý prostor z konsolidační fronty v obdobích vysoké poptávky po výběrech, a to s použitím směnného kurzu „3 za 2“ (za každá 2 nevyužitá konsolidační místa může síť bezpečně zpracovat 3 standardní výběry). Tento faktor obratu 3/2 vyrovnává poptávku mezi konsolidační a výběrovou frontou.

Demokratizace přístupu ke konsolidační frontě zvýší rychlost, s jakou mohou uživatelé ukončit svůj vklad během období vysoké poptávky, až 2,5krát, aniž by došlo ke snížení bezpečnosti síť.

**Zdroje**: [Technická specifikace EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Zlepšete uživatelský a vývojářský zážitek {#improve-user-developer-experience}

Aktualizace Glamsterdam pro Ethereum si klade za cíl zlepšit uživatelskou zkušenost, zvýšit dohledatelnost dat a zvládnout rostoucí velikosti zpráv, aby se předešlo selháním synchronizace. Díky tomu je snazší sledovat, co se děje na blockchainu, a zároveň se předchází technickým zádrhelům při škálování síť.

### Snížení vnitřních nákladů na transakce palivo {#reduce-intrinsic-transaction-gas-costs}

- Snižuje základní poplatek za transakce, čímž snižuje celkové náklady na jednoduchou nativní platbu v ETH. 
- Díky tomu jsou menší převody cenově dostupnější, což zvyšuje životaschopnost Etherea jako běžného platebního prostředku.

Všechny transakce v síti Ethereum mají dnes stejný základní transakční poplatek, bez ohledu na to, jak jednoduché nebo složité je jejich zpracování. **Snížení vnitřního palivo za transakce (nebo EIP-2780)** navrhuje snížení tohoto základní poplatek, aby se standardní převod ETH mezi stávajícími účty zlevnil až o 71%. 

Snižte vnitřní transakce palivo tím, že transakční poplatek rozdělíte tak, aby odrážel pouze základní, nezbytnou práci, kterou počítače provozující síť skutečně vykonávají, jako je ověřování digitální podpis a aktualizace zůstatku. Protože základní platba ETH nevykonává složitý kód ani nepřenáší další data, tento návrh by snížil její poplatek tak, aby odpovídal její nenáročné povaze. 

Návrh zavádí výjimku pro vytváření zcela nových účtů, aby se zabránilo tomu, že nižší poplatky zahltí stav sítě. Pokud převod odešle ETH na prázdnou, neexistující adresa, musí síť pro ni vytvořit trvalý nový záznam. Za vytvoření tohoto účet je přidán příplatek za palivo, který pomáhá pokrýt dlouhodobou zátěž spojenou s jeho ukládáním. 

Cílem EIP-2780 je společně učinit každodenní převody mezi stávajícími účty cenově dostupnějšími a zároveň zajistit, aby síť byla stále chráněna proti zahlcení databáze přesným oceňováním skutečného růstu stav.

**Zdroje**: [Technická specifikace EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministické přednasazení továrny {#deterministic-factory-predeploy}

- Poskytuje vývojářům nativní způsob nasazení aplikací a peněženek s smart kontrakt na přesně stejnou adresa napříč více řetězci.
- Umožňuje uživatelům mít stejnou adresa inteligentní peněženka v několika sítích druhé vrstvy (L2), čímž snižuje kognitivní zátěž, snižuje zmatky a snižuje riziko náhodné ztráty finančních prostředků. 
- Nahrazuje dosavadní řešení, která vývojáři v současnosti používají k dosažení této rovnocennosti, a usnadňuje a zabezpečuje vytváření peněženek a aplikací pro více řetězců.

Pokud má uživatel v současnosti peněženka s smart kontrakt s účty napříč několika řetězci kompatibilními s virtuálním strojem Ethereum (EVM), často skončí s úplně jinou adresa v různých sítích. To je nejen matoucí, ale může to vést k náhodné ztrátě finančních prostředků. 

**Deterministické tovární přednasazení (nebo EIP-7997)** poskytuje vývojářům nativní, vestavěný způsob, jak nasadit své decentralizované aplikace a peněženky s smart kontrakt na přesně stejnou adresa napříč více řetězci EVM, včetně hlavní sítě Ethereum, sítí druhé vrstvy (L2) a dalších. Pokud by bylo přijato, umožnilo by uživatelům mít přesně stejnou adresa na každém zúčastněném řetězci, což by výrazně snížilo kognitivní zátěž a potenciál pro uživatelské chyby.

Deterministické předběžné nasazení továrny funguje tak, že trvale umístí minimální, specializovaný tovární program na identické místo (konkrétně na adresa 0x12) na každém zúčastněném řetězci kompatibilním s EVM. Jeho cílem je poskytnout univerzální, standardní tovární kontrakt, který může být přijat jakoukoli síť kompatibilní s EVM; dokud se řetězec EVM účastní a přijme tento standard, vývojáři jej budou moci použít k nasazení svých chytrých kontraktů na přesně stejnou adresa v této síť. 

Tato standardizace zjednodušuje vývojářům a širšímu ekosystému vytváření a správu aplikací napříč řetězci. Vývojáři již nemusí vytvářet vlastní, řetězcově specifický kód pro propojení svého softwaru napříč různými sítěmi, místo toho používají tuto univerzální továrnu k vygenerování přesně stejné adresa pro svou aplikaci všude. Kromě toho mohou prohlížeče blok, sledovací služby a peněženky snadněji identifikovat a propojit tyto aplikace a účty napříč různými řetězci, čímž vytvářejí jednotnější a bezproblémovější prostředí pro všechny účastníky založené na Ethereu. 

**Zdroje**: [Technická specifikace EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Převody a pálení ETH se zaznamenávají do protokolu. {#eth-transfers-and-burns-emit-a-log}

- Automaticky generuje trvalý záznam (protokol) při každém převodu nebo spálení ETH.
- Odstraňuje historické slepé místo, které umožňuje aplikacím, burzám a můstkům spolehlivě detekovat vklady uživatelů bez ad hoc nástrojů pro sledování.

Na rozdíl od tokenů (ERC-20) běžné převody ETH mezi chytrými kontrakty nevydávají jasné potvrzení (standardní protokol), což burzám a aplikacím ztěžuje jejich sledování.

Převody a pálení ETH generují protokol (nebo EIP-7708), který vyžaduje, aby síť generovala standardní protokolovou událost pokaždé, když je přesunuto nebo spáleno nenulové množství ETH.

Díky tomu bude pro peněženky, burzy a provozovatele přemostění mnohem snazší a spolehlivější přesně sledovat vklady a pohyby bez nutnosti používat vlastní nástroje.

**Zdroje**: [Technická specifikace EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 seznamy částečných blok {#eth-70-partial-block-receipt-lists}

S tím, jak zvyšujeme množství práce, kterou může Ethereum vykonávat, se seznamy potvrzení pro tyto akce (datové záznamy těchto transakce) stávají tak velkými, že by potenciálně mohly způsobit selhání uzlů sítě při pokusu o synchronizaci dat mezi sebou. 

Seznamy částečných blok (nebo EIP-7975) zavádí nový způsob komunikace mezi uzly (eth/70), který umožňuje rozdělit tyto velké seznamy na menší, lépe spravovatelné části. eth/70 zavádí systém stránkování pro komunikační protokol sítě, který umožňuje uzlům rozdělit seznamy blok a bezpečně vyžádat data v menších, lépe spravovatelných blocích.

Tato změna by zabránila selhání síť synchronizace v obdobích vysoké aktivity. V konečném důsledku to připravuje cestu pro Ethereum, aby v budoucnu zvýšilo svou blok kapacitu a zpracovávalo více transakce na blok, aniž by přetížilo fyzický hardware synchronizující řetězec.

**Zdroje**: [Technická specifikace EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Další četba {#further-reading}

- [plán vylepšení Etherea](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773) 
- [Aktualizace priorit protokolu pro rok 2026 – oznámení na blogu](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel – Postkvantové Ethereum, Glamsterdam se blíží](https://www.youtube.com/watch?v=qx9sd50uQjQ) 

## Často kladené dotazy {#faq}

### Jak lze převést ETH po velké rozvětvení Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Není třeba provádět žádné akce s vašimi ETH**: Po upgradu Glamsterdam není třeba vaše ETH převádět ani upgradovat. Zůstatky na vašich účet zůstanou stejné a ETH, které v současné době držíte, zůstane po velké rozvětvení přístupné v jeho stávající podobě.
- **Pozor na podvody!**<Emoji text="⚠️" /> **Každý, kdo vás nabádá k „upgradu“ vašich ETH, se vás snaží podvést.** V souvislosti s tímto upgradem nemusíte nic dělat. Vaše aktiva zůstanou zcela nedotčena. Pamatujte, že informovanost je nejlepší obranou proti podvodům.

[Další informace o rozpoznávání a vyhýbání se podvodům](/security/)

### Ovlivní upgrade Glamsterdam všechny uzly a validátoři Etherea? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ano, upgrade Glamsterdam vyžaduje aktualizace [exekučních klientů i konsensuálních klientů](/developers/docs/nodes-and-clients/). Jelikož tento upgrade zavádí Enshrined Proposer-Builder Separation (ePBS), operátoři síťový uzel budou muset zajistit, aby jejich klienty byly aktualizovány tak, aby zvládaly nové způsoby sestavování, ověřování a potvrzování bloky síť. 

Všichni hlavní klienti Etherea vydají verze podporující velké rozvětvení označený jako vysoká priorita. O tom, kdy budou tyto verze k dispozici, se můžete dozvědět v repozitářích klientů na Githubu, na jejich [kanálech Discord](https://ethstaker.org/support), na [Discordu EthStaker](https://dsc.gg/ethstaker) nebo se můžete přihlásit k odběru blogu Etherea pro aktualizace protokol. 

Pro udržení synchronizace se síť Ethereum po upgradu musí provozovatelé síťový uzel zajistit, že používají podporovanou verzi klient. Upozorňujeme, že informace o vydáních klient jsou časově citlivé a uživatelé by se měli pro nejaktuálnější podrobnosti řídit nejnovějšími aktualizacemi.

### Co musím jako staker udělat pro upgrade Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Stejně jako u každé aktualizace síť nezapomeňte aktualizovat své klienty na nejnovější verze označené podporou Glamsterdam. Sledujte aktualizace v diskusním seznamu a [oznámení o protokolu na blogu EF](https://blog.ethereum.org/category/protocol), abyste byli informováni o vydáních.

Chcete-li ověřit nastavení před aktivací Glamsterdamu na Mainnet, můžete spustit validátor na testnets. Informace o testnet jsou rovněž zveřejňovány v e-mailovém seznamu a na blogu.

### Jaká vylepšení bude Glamsterdam zahrnovat pro škálování L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Hlavní funkcí je ePBS (EIP-7732), která odděluje náročný úkol ověřování síť transakce od úkolu dosažení konsensus. Tím se rozšiřuje okno pro šíření dat z 2 sekund na zhruba 9 sekund, což odblokuje schopnost Etherea bezpečně zvládat mnohem vyšší propustnost transakce a pojmout více datových bloků pro sítě druhé vrstvy.

### Sníží Glamsterdam poplatky na Ethereu (vrstva 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ano, Glamsterdam s největší pravděpodobností sníží poplatky pro běžné uživatele! Snížení vnitřního transakce palivo (neboli EIP-2780) snižuje základní poplatek za odesílání ETH, čímž se používání ETH pro každodenní platby stává mnohem levnějším.

Kromě toho Glamsterdam zavádí pro dlouhodobou udržitelnost seznamy přístupů na úrovni bloků (Block-Level Access Lists – BAL). To umožňuje paralelní zpracování a připravuje L1 na bezpečné zvládání vyšších celkových limitů palivo v budoucnu, což pravděpodobně sníží náklady na palivo na transakci s rostoucí kapacitou.

### Dojde po Glamsterdamu k nějakým změnám v mých stávajících chytrých kontraktech? {#will-my-smart-contracts-change}

Stávající smlouvy budou i po spuštění Glamsterdamu fungovat normálně. Vývojáři pravděpodobně získají několik nových nástrojů a měli by zkontrolovat svou spotřebu palivo:
- Zvýšení maximální velikosti kontraktu (nebo EIP-7954) umožňuje vývojářům nasazovat větší aplikace, čímž se zvyšuje limit maximální velikosti kontraktu z přibližně 24 KiB na 32 KiB. 
- Deterministické přednasazení továrny (nebo EIP-7997) zavádí univerzální, vestavěnou tovární smlouvu. Umožňuje vývojářům nasadit své aplikace a peněženky smart kontrakt na přesně stejnou adresa napříč všemi zúčastněnými řetězci EVM.
- Pokud vaše aplikace spoléhá na složité sledování pro vyhledávání převodů ETH, převody a pálení ETH generují protokol (nebo EIP-7708), což vám umožní přejít na používání protokolů pro jednodušší a spolehlivější účetnictví.
- Zvýšení nákladů na palivo pro vytváření stavu (neboli EIP-8037) a aktualizace nákladů na palivo pro přístup ke stavu (neboli EIP-8038) zavádějí nové modely udržitelnosti, které změní určité náklady na nasazení smluv, protože vytváření nových účtů nebo trvalého úložiště bude mít dynamicky se upravující poplatek. 

### Jak Glamsterdam ovlivní požadavky na úložiště a hardware síťový uzel? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Několik EIP, které se zvažují pro Glamsterdam, adresa problém výkonnostního propadu stav růstu: 
- Zvýšení nákladů na palivo pro vytváření stavu (nebo EIP-8037) zavádí dynamický cenový model, jehož cílem je dosáhnout rychlosti růstu databáze stav 100 GiB/rok, což zajistí, že standardní fyzický hardware bude moci i nadále efektivně provozovat síť. 
- Seznamy částečných potvrzení blok eth/70 (nebo EIP-7975) umožňují uzlům požadovat stránkované potvrzení blok, což rozděluje datově náročné seznamy potvrzení blok na menší části, aby se zabránilo pádům a synchronizacím při škálování Etherea.

