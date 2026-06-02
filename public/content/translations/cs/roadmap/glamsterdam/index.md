---
title: Glamsterdam
description: Přečtěte si o upgradu protokolu Glamsterdam
lang: cs
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam je nadcházející upgrade Etherea plánovaný na druhou polovinu roku 2026
</AlertTitle>
<AlertDescription>
Upgrade Glamsterdam je pouze jedním krokem v dlouhodobých cílech vývoje Etherea. Přečtěte si více o [plánu vývoje protokolu](/roadmap/) a [předchozích upgradech](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

[Ethereový](/) nadcházející upgrade Glamsterdam je navržen tak, aby uvolnil cestu pro další generaci škálování. Glamsterdam je pojmenován kombinací slov „Amsterdam“ (upgrade exekuční vrstvy, pojmenovaný podle předchozího místa konání Devconnectu) a „Gloas“ (upgrade vrstvy konsensu, pojmenovaný podle hvězdy).

V návaznosti na pokrok dosažený v upgradu [Fusaka](/roadmap/fusaka/) se Glamsterdam zaměřuje na škálování vrstvy 1 (l1) reorganizací způsobu, jakým síť zpracovává transakce a spravuje svou rostoucí databázi, čímž zásadně aktualizuje způsob, jakým Ethereum vytváří a ověřuje bloky.

Zatímco Fusaka se zaměřila na základní vylepšení, Glamsterdam posouvá cíle „Škálování l1“ a „Škálování blobů“ tím, že zakotvuje rozdělení povinností mezi různé účastníky sítě a zavádí efektivnější způsoby nakládání s daty, aby připravil [stav](/glossary/#state) na paralelizaci s vysokou propustností.

Tato vylepšení zajišťují, že Ethereum zůstane rychlé, cenově dostupné a decentralizované i při zvládání větší aktivity, a zároveň udržují hardwarové požadavky zvládnutelné pro lidi provozující [uzly](/glossary/#node) doma.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Vylepšení zvažovaná pro Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Poznámka: Tento článek v současné době zdůrazňuje výběr EIP zvažovaných pro zahrnutí do upgradu Glamsterdam. Mezi další návrhy aktivně testované v devnetech patří EIP-7778, EIP-7843, EIP-7976, EIP-7981 a EIP-8024. Nejnovější aktualizace stavu najdete v [upgradu Glamsterdam na Forkcastu](https://forkcast.org/upgrade/glamsterdam).

Pokud chcete přidat EIP, které se zvažuje pro Glamsterdam, ale ještě nebylo na tuto stránku přidáno, [zjistěte, jak přispět na ethereum.org zde](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Upgrade Glamsterdam se soustředí na tři hlavní cíle:

- Zrychlení zpracování (paralelizace): Reorganizace způsobu, jakým síť zaznamenává datové závislosti, aby mohla bezpečně zpracovávat mnoho transakcí současně namísto pomalé sekvence jedné po druhé.
- Rozšíření kapacity: Rozdělení náročné práce při vytváření a ověřování bloků, což síti poskytne více času na šíření většího množství dat bez zpomalení.
- Prevence bobtnání databáze (udržitelnost): Úprava síťových poplatků tak, aby přesně odrážely dlouhodobé hardwarové náklady na ukládání nových dat, odblokování budoucího zvyšování limitu plynu a zároveň zabránění degradaci výkonu hardwaru.

Stručně řečeno, Glamsterdam zavede strukturální změny, které zajistí, že s rostoucí kapacitou sítě zůstane udržitelná a výkon zůstane vysoký.

## Škálování l1 a paralelní zpracování {#scale-l1}

Smysluplné škálování vrstvy 1 (l1) vyžaduje odklon od mimoprotokolových předpokladů důvěry a omezení sériového provádění. Glamsterdam to řeší zakotvením oddělení určitých povinností při vytváření bloků a zavedením nových datových struktur, které síti umožňují připravit se na paralelní zpracování.

### Hlavní návrh: Zakotvené oddělení navrhovatele a tvůrce (ePBS) {#epbs}

- Odstraňuje mimoprotokolové předpoklady důvěry a spoléhání se na relé třetích stran
- Podporuje škálování l1 tím, že umožňuje mnohem větší exekuční payloady prostřednictvím rozšířených oken pro šíření
- Zavádí platby tvůrcům nevyžadující důvěru přímo do protokolu 
- Vyžaduje architektonické aktualizace pro staking pooly, aby bylo umožněno monitorování nevyžadující důvěru, ačkoli celková uživatelská zkušenost se stakingem je vylepšena zdokonaleným procesem výběru tvůrce

V současné době proces navrhování a vytváření bloků zahrnuje předání mezi navrhovateli bloků a tvůrci bloků. Vztah mezi navrhovateli a tvůrci není součástí základního protokolu Etherea, takže se spoléhá na důvěryhodný middleware třetích stran, software (relé) a mimoprotokolovou důvěru mezi subjekty.

Mimoprotokolový vztah mezi navrhovateli a tvůrci také vytváří „horkou cestu“ během validace bloku, která nutí [validátory](/glossary/#validator) spěchat s vysíláním a prováděním transakcí v těsném 2sekundovém okně, což omezuje množství dat, které síť dokáže zpracovat.

**Zakotvené oddělení navrhovatele a tvůrce (ePBS, neboli EIP-7732)** formálně odděluje práci navrhovatele (který vybírá blok konsensu) od tvůrce (který sestavuje exekuční payload) a zakotvuje toto předání přímo do protokolu. 

Zabudování výměny payloadu bloku za platbu nevyžadující důvěru přímo do protokolu odstraňuje potřebu middlewaru třetích stran (jako je MEV-Boost). Tvůrci a navrhovatelé se však stále mohou rozhodnout používat mimoprotokolová relé nebo middleware pro složité funkce, které ještě nejsou součástí základního protokolu. 

K vyřešení úzkého hrdla „horké cesty“ zavádí ePBS také výbor pro včasnost payloadu (Payload Timeliness Committee - PTC) a logiku dvojího termínu, což validátorům umožňuje samostatně atestovat blok konsensu a včasnost exekučního payloadu pro maximalizaci propustnosti.

<VideoWatch slug="proposer-builder-separation" />

Oddělení rolí navrhovatele a tvůrce na úrovni protokolu rozšiřuje okno pro šíření (neboli čas dostupný pro šíření dat po síti) ze 2 sekund na přibližně 9 sekund.

Nahrazením mimoprotokolového middlewaru a relé vnitroprotokolovými mechanismy snižuje ePBS závislosti na důvěře a umožňuje Ethereu bezpečně zpracovávat mnohem větší množství dat (jako je více blobů pro [vrstvy 2 (l2)](/glossary/#layer-2)) bez zatěžování sítě.

**Zdroje**: [Technická specifikace EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Hlavní návrh: Seznamy přístupů na úrovni bloku (BALs) {#bals}

- Eliminuje úzká hrdla sekvenčního zpracování poskytnutím předběžné mapy všech transakčních závislostí, čímž připravuje půdu pro to, aby validátory zpracovávaly mnoho transakcí paralelně namísto jedné po druhé
- Umožňuje uzlům aktualizovat své záznamy čtením konečných výsledků bez nutnosti přehrávat každou transakci (synchronizace bez exekuce), což výrazně zrychluje synchronizaci uzlu se sítí
- Eliminuje dohady a umožňuje validátorům předem načíst všechna potřebná data najednou namísto jejich postupného objevování, což výrazně zrychluje validaci

Dnešní Ethereum je jako jednoproudá silnice; protože síť neví, jaká data bude transakce potřebovat nebo měnit (například kterých účtů se transakce dotkne), dokud není transakce spuštěna, musí validátory zpracovávat transakce jednu po druhé v přísné, sekvenční řadě. Pokud by se pokusily zpracovat transakce všechny najednou, aniž by znaly tyto závislosti, dvě transakce by se mohly náhodně pokusit změnit přesně stejná data ve stejnou dobu, což by způsobilo chyby.

**Seznamy přístupů na úrovni bloku (Block-Level Access Lists - BALs, neboli EIP-7928)** fungují jako mapa pro síť, která podrobně popisuje, ke kterým částem databáze se bude přistupovat před zahájením práce. Exekuční vrstva ukládá úplný seznam přístupů k bloku, včetně každé změny účtu, které se transakce dotknou, spolu s konečnými výsledky těchto změn (všechny přístupy ke stavu a hodnoty po exekuci). Aby byly bloky lehké, hlavička bloku obsahuje nové pole s jedinečným digitálním otiskem (záznam hash) tohoto seznamu.

Protože poskytují okamžitý přehled o tom, které transakce se nepřekrývají, umožňují BALs uzlům provádět paralelní čtení z disku a načítat informace pro mnoho transakcí současně. Síť může bezpečně seskupovat nesouvisející transakce a zpracovávat je paralelně.

Vzhledem k tomu, že BAL obsahuje konečné výsledky transakcí (hodnoty po exekuci), když se uzly sítě potřebují synchronizovat s aktuálním stavem sítě, mohou tyto konečné výsledky zkopírovat a aktualizovat své záznamy. Validátory již nemusí přehrávat všechny složité transakce od začátku, aby věděly, co se stalo, což novým uzlům zrychluje a usnadňuje připojení k síti.

Paralelní čtení z disku umožněné pomocí BALs bude významným krokem k budoucnosti, kdy Ethereum bude moci zpracovávat mnoho transakcí najednou, což výrazně zvýší rychlost sítě.

#### eth/71 Výměna seznamu přístupů k bloku {#bale}

Výměna seznamu přístupů k bloku (Block Access List Exchange - eth/71 neboli EIP-8159) je přímým síťovým doplňkem k seznamům přístupů na úrovni bloku. Zatímco BALs odemykají paralelní provádění, eth/71 upgraduje peer-to-peer protokol, aby uzlům umožnil tyto seznamy skutečně sdílet po síti. Výměna seznamu přístupů k bloku, která je nyní vyžadována pro všechny klienty exekuční vrstvy, umožní rychlejší synchronizaci a umožní uzlům provádět aktualizace stavu bez exekuce.

**Zdroje**:

- [Technická specifikace EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Technická specifikace EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Udržitelnost sítě {#network-sustainability}

S tím, jak síť Ethereum roste rychleji, je důležité zajistit, aby náklady na její používání odpovídaly opotřebení hardwaru, na kterém Ethereum běží. Síť musí zvýšit své celkové kapacitní limity, aby mohla bezpečně škálovat a zpracovávat více transakcí.

### Zvýšení nákladů na gas za vytvoření stavu {#state-creation-gas-cost-increase}

- Zajišťuje, že poplatky za vytvoření nových účtů nebo chytrých kontraktů přesně odrážejí dlouhodobou zátěž, kterou představují pro databázi Etherea
- Stanovuje pevnou **cenu za bajt stavu (cost per state byte - CPSB)** s cílem bezpečné a předvídatelné rychlosti růstu 120 GiB/rok, což zajišťuje, že standardní fyzický hardware může i nadále provozovat síť
- Odděluje účtování těchto specifických poplatků do nového rezervoáru, čímž odstraňuje staré transakční limity a umožňuje vývojářům nasadit větší a složitější aplikace

Přidávání nových účtů, tokenů a [chytrých kontraktů](/glossary/#smart-contract) vytváří trvalá data (známá jako „stav“), která musí každý počítač provozující síť uchovávat donekonečna. Současné poplatky za přidávání nebo čtení těchto dat jsou nekonzistentní a nemusí nutně odrážet skutečnou dlouhodobou zátěž úložiště, kterou představují pro hardware sítě.

Některé akce, které vytvářejí stav na Ethereu, jako je vytváření nových účtů nebo nasazení velkých chytrých kontraktů, byly relativně levné ve srovnání s trvalým úložným prostorem, který zabírají na uzlech sítě, například nasazení kontraktu je na bajt výrazně levnější než vytváření úložných slotů.

Bez úprav by se růst stavu Etherea stal neudržitelným, protože síť škáluje směrem k hranici limitu plynu 200 milionů umožněné Glamsterdamem (přičemž vývojáři v současné době testují s referenčním limitem plynu bloku 150 milionů, aby odvodili přesné ceny stavu).

**Zvýšení nákladů na gas za vytvoření stavu (neboli EIP-8037)** harmonizuje náklady tím, že je váže na skutečnou velikost vytvářených dat, a aktualizuje poplatky tak, aby byly úměrné množství trvalých dat, která operace vytváří nebo ke kterým přistupuje.

EIP-8037 také zavádí model rezervoáru pro předvídatelnější řízení těchto nákladů; poplatky za gas stavu čerpají nejprve z `state_gas_reservoir` a operační kód `GAS` vrací pouze `gas_left`, což zabraňuje exekučním rámcům ve špatném výpočtu dostupného gasu. Na podporu toho dostávají základní úlohy na pozadí dodatečný povolený limit paliva, který jde přímo do této vyhrazené rezervy, což zajišťuje, že kritické síťové operace neselžou jen proto, že ukládání trvalých dat vyžaduje více zdrojů.

Před EIP-8037 sdílely výpočetní práce (aktivní zpracování) i trvalé ukládání dat (uložení chytrého kontraktu do databáze sítě) stejný limit plynu. Model rezervoáru rozděluje účtování: limit plynu pro skutečnou výpočetní práci transakce (zpracování) a pro dlouhodobé ukládání dat (gas stavu). Oddělení těchto dvou pomáhá zabránit tomu, aby samotná velikost dat aplikace vyčerpala limit plynu; pokud vývojáři poskytnou dostatek prostředků k naplnění rezervoáru pro ukládání dat, mohou nasadit mnohem větší a složitější chytré kontrakty.

Přesnější a předvídatelnější oceňování ukládání dat pomůže Ethereu bezpečně zvýšit jeho rychlost a kapacitu bez bobtnání databáze. Tato udržitelnost umožní provozovatelům uzlů nadále používat (relativně) cenově dostupný hardware po mnoho let, čímž udrží domácí staking přístupný pro zachování decentralizace sítě.

**Zdroje**: [Technická specifikace EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Aktualizace nákladů na gas za přístup ke stavu {#state-access-gas-cost-update}

- Zvyšuje náklady na gas, když aplikace čtou nebo aktualizují informace trvale uložené na Ethereu (operační kódy pro přístup ke stavu), aby přesně odpovídaly výpočetní práci, kterou tyto příkazy vyžadují
- Posiluje odolnost sítě tím, že zabraňuje útokům typu odepření služby (denial-of-service), které zneužívají uměle levné operace čtení dat

S tím, jak rostl stav Etherea, se vyhledávání a čtení starých dat („přístup ke stavu“) stalo pro uzly náročnějším a pomalejším na zpracování. Poplatky za tyto akce zůstaly stejné, i když je nyní vyhledávání informací o něco dražší (z hlediska výpočetního výkonu).

V důsledku toho jsou některé specifické příkazy v současné době podhodnocené vzhledem k práci, kterou nutí uzel vykonat. Například `EXTCODESIZE` a `EXTCODECOPY` jsou podhodnocené, protože vyžadují dvě samostatná čtení z databáze – jedno pro objekt účtu a druhé pro skutečnou velikost kódu nebo bajtkód.

**Aktualizace nákladů na gas za přístup ke stavu (neboli EIP-8038)** zvyšuje konstanty gasu pro operační kódy pro přístup ke stavu, jako je vyhledávání dat účtů a kontraktů, aby odpovídaly výkonu moderního hardwaru a velikosti stavu.

Sladění nákladů na přístup ke stavu také pomáhá učinit Ethereum odolnějším. Protože tyto náročné akce čtení dat jsou uměle levné, mohl by škodlivý útočník spamovat síť tisíci složitých datových požadavků v jediném bloku, než by dosáhl limitu poplatků sítě, což by mohlo způsobit zastavení nebo pád sítě (útok typu odepření služby). I bez škodlivého úmyslu nejsou vývojáři ekonomicky motivováni k vytváření efektivních aplikací, pokud je čtení síťových dat příliš levné.

Přesnějším oceněním akcí přístupu ke stavu může být Ethereum odolnější vůči náhodným nebo úmyslným zpomalením, zatímco sladění síťových nákladů s hardwarovou zátěží se ukazuje jako udržitelnější základ pro budoucí zvyšování limitu plynu.

**Zdroje**: [Technická specifikace EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Odolnost sítě {#network-resilience}

Vylepšení povinností validátorů a procesů výstupu zajišťují stabilitu sítě během událostí hromadné penalizace a demokratizují likviditu. Tato vylepšení činí síť stabilnější a zajišťují, že se všemi účastníky, velkými i malými, je zacházeno spravedlivě.

### Vyloučení penalizovaných validátorů z navrhování {#exclude-slashed-validators}

- Zastavuje výběr penalizovaných validátorů pro navrhování budoucích bloků, čímž eliminuje zaručeně zmeškané sloty
- Udržuje Ethereum v hladkém a spolehlivém chodu a zabraňuje vážným výpadkům v případě události hromadné penalizace

V současné době, i když je validátor penalizován (potrestán za porušení pravidel nebo nefunguje podle očekávání), systém jej může stále vybrat, aby vedl blok v blízké budoucnosti, když generuje budoucí výhledy navrhovatelů.

Protože bloky od penalizovaných navrhovatelů jsou automaticky odmítnuty jako neplatné, způsobuje to, že síť zmešká sloty a zpožďuje obnovu sítě během událostí hromadné penalizace.

**Vyloučení penalizovaných validátorů z navrhování (neboli EIP-8045)** jednoduše odfiltruje penalizované validátory z výběru pro budoucí povinnosti. To zlepšuje odolnost řetězce tím, že zajišťuje, aby byli k navrhování bloků vybíráni pouze zdraví validátoři, čímž se udržuje kvalita služeb během výpadků sítě.

**Zdroje**: [Technická specifikace EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Umožnění výstupům používat konsolidační frontu {#let-exits-use-the-consolidation-queue}

- Uzavírá mezeru, která umožňuje validátorům s vysokým zůstatkem opustit síť rychleji než menším validátorům prostřednictvím konsolidační fronty
- Umožňuje běžným výstupům přetéct do této druhé fronty, když má volnou kapacitu, což zkracuje dobu výběru ze stakingu během období s vysokým objemem
- Udržuje přísnou bezpečnost, aby se zabránilo změně základních bezpečnostních limitů Etherea nebo oslabení sítě

Vzhledem k tomu, že [upgrade Pectra](/roadmap/pectra) zvýšil maximální efektivní zůstatek pro validátory Etherea z 32 ETH na 2 048 ETH, technická mezera umožňuje validátorům s vysokým zůstatkem opustit síť rychleji než menším validátorům prostřednictvím konsolidační fronty.

**Umožnění výstupům používat konsolidační frontu (neboli EIP-8080)** demokratizuje konsolidační frontu pro všechny výstupy ze stakingu a vytváří jedinou spravedlivou frontu pro všechny.

Abychom si rozebrali, jak to funguje dnes:

- Limit fluktuace Etherea je bezpečnostní limit rychlosti, jakou mohou validátoři vstupovat, vystupovat nebo slučovat (konsolidovat) své stakované ETH, aby se zajistilo, že bezpečnost sítě nebude nikdy destabilizována
- Protože konsolidace validátoru je náročnější akce s více pohyblivými částmi než standardní výstup validátoru, spotřebovává větší část tohoto bezpečnostního rozpočtu (limitu fluktuace)
- Konkrétně protokol diktuje, že přesné bezpečnostní náklady na jeden standardní výstup jsou dvě třetiny (2/3) nákladů na jednu konsolidaci

Spravedlivější fronty výstupů umožní standardním výstupům vypůjčit si nevyužité místo z konsolidační fronty během období vysoké poptávky po výstupech s uplatněním směnného kurzu „3 za 2“ (na každá 2 nevyužitá konsolidační místa může síť bezpečně zpracovat 3 standardní výstupy). Tento faktor fluktuace 3/2 vyrovnává poptávku napříč konsolidačními a výstupními frontami.

Demokratizace přístupu ke konsolidační frontě zvýší rychlost, jakou mohou uživatelé vybrat svůj stake během období vysoké poptávky, až 2,5krát, aniž by byla ohrožena bezpečnost sítě.

**Zdroje**: [Technická specifikace EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Zlepšení uživatelské a vývojářské zkušenosti {#improve-user-developer-experience}

Upgrade Glamsterdam Etherea si klade za cíl zlepšit uživatelskou zkušenost, vylepšit objevitelnost dat a zvládnout rostoucí velikosti zpráv, aby se zabránilo selháním synchronizace. To usnadňuje sledování toho, co se děje onchain, a zároveň zabraňuje technickým zádrhelům při škálování sítě.

### Snížení vnitřních nákladů na gas transakce {#reduce-intrinsic-transaction-gas-costs}

- Snižuje základní poplatek za transakce, čímž snižuje celkové náklady na jednoduchou nativní platbu v ETH
- Činí menší převody dostupnějšími, čímž zvyšuje životaschopnost Etherea jako běžného prostředku směny

Všechny transakce na Ethereu mají dnes paušální základní poplatek za plyn, bez ohledu na to, jak jednoduché nebo složité je jejich zpracování. **Snížení vnitřního gasu transakce (neboli EIP-2780)** navrhuje snížení tohoto základního poplatku, aby byl standardní převod ETH mezi existujícími účty až o **71 % levnější**.

Snížení vnitřního gasu transakce funguje tak, že rozděluje transakční poplatek tak, aby odrážel pouze základní, nezbytnou práci, kterou počítače provozující síť skutečně dělají, jako je ověření digitálního podpisu a aktualizace zůstatku. Protože základní platba v ETH neprovádí složitý kód ani nenese další data, tento návrh by snížil její poplatek tak, aby odpovídal její lehké stopě.

Návrh zavádí výjimku pro vytváření zcela nových účtů, aby nižší poplatky nezahltily stav sítě. Pokud převod odešle ETH na prázdnou, neexistující adresu, síť pro ni musí vytvořit trvalý nový záznam. K tomuto vytvoření účtu se přidává přirážka za gas, která pomáhá pokrýt jeho dlouhodobou zátěž úložiště.

Společně si EIP-2780 klade za cíl učinit každodenní převody mezi existujícími účty dostupnějšími a zároveň zajistit, aby byla síť stále chráněna proti bobtnání databáze přesným oceněním skutečného růstu stavu.

**Zdroje**: [Technická specifikace EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministické předběžné nasazení továrny {#deterministic-factory-predeploy}

- Poskytuje vývojářům nativní způsob, jak nasadit aplikace a peněženky s chytrými kontrakty na přesně stejnou adresu napříč více řetězci
- Umožňuje uživatelům mít stejnou adresu chytré peněženky na více sítích vrstvy 2 (l2), což snižuje kognitivní zátěž, snižuje zmatek a snižuje riziko náhodné ztráty prostředků
- Nahrazuje zástupná řešení, která vývojáři v současnosti používají k dosažení této parity, což usnadňuje a činí bezpečnějším vytváření meziřetězcových peněženek a aplikací

Pokud má dnes uživatel peněženku s chytrým kontraktem s účty napříč více řetězci kompatibilními s Ethereum Virtual Machine (EVM), často skončí se zcela odlišnou adresou na různých sítích. To je nejen matoucí, ale může to vést k náhodné ztrátě prostředků.

**Deterministické předběžné nasazení továrny (neboli EIP-7997)** poskytuje vývojářům nativní, vestavěný způsob, jak nasadit své decentralizované aplikace a peněženky s chytrými kontrakty na přesně stejnou adresu napříč více EVM řetězci, včetně Ethereum Mainnet, sítí vrstvy 2 (l2) a dalších. Pokud by byl přijat, umožnil by uživateli mít přesně stejnou adresu na každém zúčastněném řetězci, což by výrazně snížilo kognitivní zátěž a potenciál pro chybu uživatele.

Deterministické předběžné nasazení továrny funguje tak, že trvale umístí minimální, specializovaný tovární program na identické místo (konkrétně na adresu 0x12) na každém zúčastněném řetězci kompatibilním s EVM. Jeho cílem je poskytnout univerzální, standardní tovární kontrakt, který může přijmout jakákoli síť kompatibilní s EVM; pokud se EVM řetězec účastní a přijme tento standard, vývojáři jej budou moci použít k nasazení svých chytrých kontraktů na přesně stejnou adresu v této síti.

Tato standardizace zjednodušuje vytváření a správu meziřetězcových aplikací pro vývojáře a širší ekosystém. Vývojáři již nemusí vytvářet vlastní kód specifický pro daný řetězec, aby propojili svůj software napříč různými sítěmi, místo toho používají tuto univerzální továrnu k vygenerování přesně stejné adresy pro svou aplikaci všude. Kromě toho mohou průzkumníci bloků, sledovací služby a peněženky snadněji identifikovat a propojit tyto aplikace a účty napříč různými řetězci, čímž se vytvoří jednotnější a plynulejší meziřetězcové prostředí pro všechny účastníky založené na Ethereu.

**Zdroje**: [Technická specifikace EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Převody a spalování ETH emitují log {#eth-transfers-and-burns-emit-a-log}

- Automaticky generuje trvalý záznam (log) pokaždé, když je ETH převedeno nebo spáleno
- Opravuje historické slepé místo, které umožňuje aplikacím, burzám a mostům spolehlivě detekovat vklady uživatelů bez ad-hoc sledovacích nástrojů

Na rozdíl od tokenů (ERC-20) běžné převody ETH mezi chytrými kontrakty neemitují jasnou stvrzenku (standardní log), což ztěžuje jejich sledování burzami a aplikacemi.

Převody a spalování ETH emitují log (neboli EIP-7708) činí pro síť povinným emitovat standardní událost logu pokaždé, když je přesunuto nebo spáleno nenulové množství ETH.

To peněženkám, burzám a provozovatelům mostů mnohem usnadní a zpolehliví přesné sledování vkladů a pohybů bez vlastních nástrojů.

**Zdroje**: [Technická specifikace EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 částečné seznamy stvrzenek bloku {#eth-70-partial-block-receipt-lists}

S tím, jak zvyšujeme množství práce, kterou může Ethereum vykonat, se seznamy stvrzenek za tyto akce (datové záznamy těchto transakcí) stávají tak velkými, že by mohly potenciálně způsobit selhání uzlů sítě při pokusu o vzájemnou synchronizaci dat.

Nyní jako požadavek pro všechny klienty exekuční vrstvy, eth/70 částečné seznamy stvrzenek bloku (neboli EIP-7975) zavádí nový způsob, jak spolu uzly komunikují (eth/70), který umožňuje rozdělit tyto velké seznamy na menší, lépe spravovatelné části. eth/70 zavádí systém stránkování pro komunikační protokol sítě, který umožňuje uzlům rozdělit seznamy stvrzenek bloku a bezpečně požadovat data v menších, lépe spravovatelných blocích.

Tato změna by zabránila selháním synchronizace sítě během období silné aktivity. V konečném důsledku to připravuje půdu pro to, aby Ethereum v budoucnu zvýšilo kapacitu svých bloků a zpracovávalo více transakcí na blok, aniž by došlo k zahlcení fyzického hardwaru synchronizujícího řetězec.

**Zdroje**: [Technická specifikace EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Další čtení {#further-reading}

- [Plán vývoje Etherea](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Oznámení na blogu o aktualizaci priorit protokolu pro rok 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Postkvantové Ethereum, Glamsterdam se blíží](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Často kladené dotazy {#faq}

### Jak lze převést ETH po hard forku Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Pro vaše ETH není nutná žádná akce**: Po upgradu Glamsterdam není nutné vaše ETH převádět ani upgradovat. Zůstatky na vašem účtu zůstanou stejné a ETH, které v současné době držíte, zůstane po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **kdokoli, kdo vám dává pokyn k „upgradu“ vašeho ETH, se vás snaží podvést.** V souvislosti s tímto upgradem nemusíte dělat vůbec nic. Vaše aktiva zůstanou zcela nedotčena. Pamatujte, že být informován je nejlepší obranou proti podvodům.

[Více o rozpoznávání a vyhýbání se podvodům](/security/)

### Ovlivní upgrade Glamsterdam všechny uzly a validátory Etherea? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ano, upgrade Glamsterdam vyžaduje aktualizace jak [exekučních klientů, tak klientů konsensu](/developers/docs/nodes-and-clients/). Protože tento upgrade zavádí zakotvené oddělení navrhovatele a tvůrce (ePBS), provozovatelé uzlů budou muset zajistit, aby jejich klienti byli aktualizováni tak, aby zvládali nové způsoby, jakými jsou bloky vytvářeny, validovány a atestovány sítí.

Všichni hlavní klienti Etherea vydají verze podporující hard fork označené jako vysoká priorita. O tom, kdy budou tyto verze k dispozici, se můžete informovat v repozitářích klientů na GitHubu, na jejich [kanálech na Discordu](https://ethstaker.org/support), na [Discordu EthStaker](https://dsc.gg/ethstaker) nebo přihlášením k odběru blogu Etherea pro aktualizace protokolu.

Pro udržení synchronizace se sítí Ethereum po upgradu musí provozovatelé uzlů zajistit, že používají podporovanou verzi klienta. Upozorňujeme, že informace o vydáních klientů jsou časově citlivé a uživatelé by se měli řídit nejnovějšími aktualizacemi pro nejaktuálnější podrobnosti.

### Co musím jako staker udělat pro upgrade Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Stejně jako u každého upgradu sítě se ujistěte, že jste aktualizovali své klienty na nejnovější verze označené podporou Glamsterdamu. Sledujte aktualizace v e-mailové konferenci a [Oznámení o protokolu na blogu EF](https://blog.ethereum.org/category/protocol), abyste byli informováni o vydáních.

Chcete-li ověřit své nastavení předtím, než se Glamsterdam aktivuje na Mainnetu, můžete spustit validátor na testnetech. Forky testnetů jsou také oznamovány v e-mailové konferenci a na blogu.

### Jaká vylepšení bude Glamsterdam zahrnovat pro škálování l1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Hlavní funkcí je ePBS (EIP-7732), která odděluje náročný úkol validace síťových transakcí od úkolu dosažení konsensu. To rozšiřuje okno pro šíření dat ze 2 sekund na zhruba 9 sekund, čímž se odblokovává schopnost Etherea bezpečně zvládnout mnohem vyšší propustnost transakcí a pojmout více datových blobů pro sítě vrstvy 2 (l2).

### Sníží Glamsterdam poplatky na Ethereu (vrstva 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ano, Glamsterdam s největší pravděpodobností sníží poplatky pro běžné uživatele! Snížení vnitřního gasu transakce (neboli EIP-2780) snižuje základní poplatek za odesílání ETH, díky čemuž je používání ETH pro každodenní platby mnohem levnější.

Kromě toho pro dlouhodobou udržitelnost zavádí Glamsterdam seznamy přístupů na úrovni bloku (BALs). To umožňuje paralelní zpracování a připravuje vrstvu 1 (l1) na bezpečné zvládnutí vyšších celkových limitů plynu v budoucnu, což pravděpodobně sníží náklady na gas na transakci s rostoucí kapacitou.

### Dojde po Glamsterdamu k nějakým změnám v mých stávajících chytrých kontraktech? {#will-my-smart-contracts-change}

Stávající kontrakty budou po Glamsterdamu nadále normálně fungovat. Vývojáři pravděpodobně získají několik nových nástrojů a měli by zkontrolovat své využití gasu:

- Zvýšení maximální velikosti kontraktu (neboli EIP-7954) umožňuje vývojářům nasadit větší aplikace, čímž se zvyšuje limit maximální velikosti kontraktu ze zhruba 24 KiB na 32 KiB.
- Deterministické předběžné nasazení továrny (neboli EIP-7997) zavádí univerzální, vestavěný tovární kontrakt. Umožňuje vývojářům nasadit své aplikace a peněženky s chytrými kontrakty na přesně stejnou adresu napříč všemi zúčastněnými EVM řetězci.
- Pokud se vaše aplikace spoléhá na složité sledování při hledání převodů ETH, Převody a spalování ETH emitují log (neboli EIP-7708) vám umožní přejít na používání logů pro jednodušší a spolehlivější účtování.
- Zvýšení nákladů na gas za vytvoření stavu (neboli EIP-8037) a aktualizace nákladů na gas za přístup ke stavu (neboli EIP-8038) zavádějí nové modely udržitelnosti, které změní určité náklady na nasazení kontraktu, protože vytváření nových účtů nebo trvalého úložiště bude mít nový standardizovaný pevný poplatek založený na velikosti vytvořených dat.

### Jak Glamsterdam ovlivní úložiště uzlů a hardwarové požadavky? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Několik EIP zvažovaných pro Glamsterdam řeší výkonnostní propad růstu stavu:

- Zvýšení nákladů na gas za vytvoření stavu (neboli EIP-8037) zavádí rámec fixních nákladů (CPSB) s cílem dosáhnout rychlosti růstu stavové databáze 120 GiB/rok, což zajišťuje, že standardní fyzický hardware může i nadále efektivně provozovat síť.
- eth/70 částečné seznamy stvrzenek bloku (neboli EIP-7975) umožňuje uzlům požadovat stránkované stvrzenky bloku, což rozděluje datově náročné seznamy stvrzenek bloku na menší části, aby se zabránilo pádům a problémům se synchronizací při škálování Etherea.