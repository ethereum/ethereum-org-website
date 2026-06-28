---
title: "Stavové kanály"
description: "Úvod do stavových a platebních kanálů jako řešení škálování, které v současnosti využívá komunita Etherea."
lang: cs
sidebarDepth: 3
---

Stavové kanály umožňují účastníkům bezpečně provádět transakce offchain a zároveň udržovat interakci se sítí [Ethereum](/) Mainnet na minimu. Peery v kanálu mohou provádět libovolný počet offchain transakcí, přičemž odesílají pouze dvě onchain transakce k otevření a zavření kanálu. To umožňuje extrémně vysokou propustnost transakcí a vede k nižším nákladům pro uživatele.

## Předpoklady {#prerequisites}

Měli byste si přečíst a porozumět našim stránkám o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2 (l2)](/layer-2/).

## Co jsou kanály? {#what-are-channels}

Veřejné blockchainy, jako je Ethereum, čelí výzvám v oblasti škálovatelnosti kvůli své distribuované architektuře: onchain transakce musí být provedeny všemi uzly. Uzly musí být schopny zvládnout objem transakcí v bloku pomocí skromného hardwaru, což omezuje propustnost transakcí, aby síť zůstala decentralizovaná. Blockchainové kanály tento problém řeší tím, že umožňují uživatelům interagovat offchain, přičemž se pro konečné vypořádání stále spoléhají na bezpečnost hlavního řetězce.

Kanály jsou jednoduché peer-to-peer protokoly, které umožňují dvěma stranám provádět mezi sebou mnoho transakcí a poté na blockchain odeslat pouze konečné výsledky. Kanál využívá kryptografii k prokázání, že souhrnná data, která generují, jsou skutečně výsledkem platné sady průběžných transakcí. Chytrý kontrakt typu [„multisig“](/developers/docs/smart-contracts/#multisig) zajišťuje, že transakce jsou podepsány správnými stranami.

Díky kanálům jsou změny stavu prováděny a ověřovány zúčastněnými stranami, což minimalizuje výpočty na exekuční vrstvě Etherea. To snižuje přetížení Etherea a také zvyšuje rychlost zpracování transakcí pro uživatele.

Každý kanál je spravován [multisig chytrým kontraktem](/developers/docs/smart-contracts/#multisig) běžícím na Ethereu. Pro otevření kanálu účastníci nasadí kontrakt kanálu onchain a vloží do něj prostředky. Obě strany společně podepíší aktualizaci stavu pro inicializaci stavu kanálu, po které mohou rychle a volně provádět transakce offchain.

Pro zavření kanálu účastníci odešlou poslední dohodnutý stav kanálu onchain. Poté chytrý kontrakt rozdělí uzamčené prostředky podle zůstatku každého účastníka v konečném stavu kanálu.

Peer-to-peer kanály jsou obzvláště užitečné pro situace, kdy si někteří předem definovaní účastníci přejí provádět transakce s vysokou frekvencí bez viditelné režie. Blockchainové kanály spadají do dvou kategorií: **platební kanály** a **stavové kanály**.

## Platební kanály {#payment-channels}

Platební kanál lze nejlépe popsat jako „obousměrnou účetní knihu“ společně spravovanou dvěma uživateli. Počáteční zůstatek účetní knihy je součtem vkladů uzamčených v onchain kontraktu během fáze otevírání kanálu. Převody v platebním kanálu lze provádět okamžitě a bez zapojení samotného blockchainu, s výjimkou počátečního jednorázového onchain vytvoření a případného uzavření kanálu.

Aktualizace zůstatku účetní knihy (tj. stavu platebního kanálu) vyžadují schválení všech stran v kanálu. Aktualizace kanálu podepsaná všemi účastníky kanálu je považována za finalizovanou, podobně jako transakce na Ethereu.

Platební kanály patřily mezi první řešení škálování navržená k minimalizaci drahé onchain aktivity u jednoduchých uživatelských interakcí (např. převody ETH, atomické swapy, mikroplatby). Účastníci kanálu mohou mezi sebou provádět neomezené množství okamžitých transakcí bez poplatků, pokud čistý součet jejich převodů nepřesáhne vložené tokeny.

## Stavové kanály {#state-channels}

Kromě podpory offchain plateb se platební kanály neukázaly jako užitečné pro zpracování obecné logiky přechodu stavu. Stavové kanály byly vytvořeny k vyřešení tohoto problému a k tomu, aby byly kanály užitečné pro škálování obecných výpočtů.

Stavové kanály mají s platebními kanály stále mnoho společného. Například uživatelé interagují výměnou kryptograficky podepsaných zpráv (transakcí), které musí podepsat i ostatní účastníci kanálu. Pokud navrhovaná aktualizace stavu není podepsána všemi účastníky, je považována za neplatnou.

Kromě držení zůstatků uživatelů však kanál také sleduje aktuální stav úložiště kontraktu (tj. hodnoty proměnných kontraktu).

To umožňuje provádět chytrý kontrakt offchain mezi dvěma uživateli. V tomto scénáři vyžadují aktualizace vnitřního stavu chytrého kontraktu pouze schválení peerů, kteří kanál vytvořili.

Ačkoli to řeší dříve popsaný problém se škálovatelností, má to důsledky pro bezpečnost. Na Ethereu je platnost přechodů stavu vynucována protokolem konsensu sítě. To znemožňuje navrhnout neplatnou aktualizaci stavu chytrého kontraktu nebo změnit provádění chytrého kontraktu.

Stavové kanály nemají stejné bezpečnostní záruky. Do jisté míry je stavový kanál miniaturní verzí Mainnetu. S omezenou skupinou účastníků vynucujících pravidla se zvyšuje možnost škodlivého chování (např. navrhování neplatných aktualizací stavu). Stavové kanály odvozují svou bezpečnost ze systému rozhodování sporů založeného na [důkazech o podvodu](/glossary/#fraud-proof).

## Jak fungují stavové kanály {#how-state-channels-work}

V zásadě je aktivita ve stavovém kanálu relací interakcí zahrnujících uživatele a blockchainový systém. Uživatelé spolu většinou komunikují offchain a s podkladovým blockchainem interagují pouze za účelem otevření kanálu, zavření kanálu nebo vypořádání případných sporů mezi účastníky.

Následující část nastiňuje základní pracovní postup stavového kanálu:

### Otevření kanálu {#opening-the-channel}

Otevření kanálu vyžaduje, aby účastníci vložili prostředky do chytrého kontraktu na Mainnetu. Vklad funguje také jako virtuální účet, takže zúčastnění aktéři mohou volně provádět transakce, aniž by museli platby okamžitě vypořádat. Teprve když je kanál finalizován onchain, strany se navzájem vypořádají a vyberou si to, co zbylo na jejich účtu.

Tento vklad slouží také jako kauce zaručující poctivé chování každého účastníka. Pokud jsou vkladatelé během fáze řešení sporů shledáni vinnými ze škodlivých akcí, kontrakt jejich vklad zabaví (slashing).

Peery v kanálu musí podepsat počáteční stav, na kterém se všichni shodnou. To slouží jako geneze stavového kanálu, po které mohou uživatelé začít provádět transakce.

### Používání kanálu {#using-the-channel}

Po inicializaci stavu kanálu peery interagují podepisováním transakcí a jejich vzájemným odesíláním ke schválení. Účastníci těmito transakcemi iniciují aktualizace stavu a podepisují aktualizace stavu od ostatních. Každá transakce se skládá z následujícího:

- **Nonce**, která funguje jako jedinečné ID pro transakce a zabraňuje útokům typu replay. Identifikuje také pořadí, ve kterém k aktualizacím stavu došlo (což je důležité pro řešení sporů).

- Starý stav kanálu

- Nový stav kanálu

- Transakce, která spouští přechod stavu (např. Alice pošle 5 ETH Bobovi)

Aktualizace stavu v kanálu nejsou vysílány onchain, jak je tomu běžně při interakci uživatelů na Mainnetu, což je v souladu s cílem stavových kanálů minimalizovat onchain stopu. Dokud se účastníci shodnou na aktualizacích stavu, jsou stejně konečné jako transakce na Ethereu. Účastníci se musí spoléhat na konsensus Mainnetu pouze v případě, že dojde ke sporu.

### Zavření kanálu {#closing-the-channel}

Zavření stavového kanálu vyžaduje odeslání konečného, dohodnutého stavu kanálu do onchain chytrého kontraktu. Podrobnosti odkazované v aktualizaci stavu zahrnují počet tahů každého účastníka a seznam schválených transakcí.

Po ověření, že je aktualizace stavu platná (tj. je podepsána všemi stranami), chytrý kontrakt finalizuje kanál a rozdělí uzamčené prostředky podle výsledku kanálu. Platby provedené offchain jsou aplikovány na stav Etherea a každý účastník obdrží svou zbývající část uzamčených prostředků.

Výše popsaný scénář představuje to, co se stane v ideálním případě. Někdy uživatelé nemusí být schopni dosáhnout dohody a finalizovat kanál (horší případ). V takové situaci může platit kterákoli z následujících možností:

- Účastníci se odpojí (jsou offline) a nenavrhnou přechody stavu

- Účastníci odmítnou spolupodepsat platné aktualizace stavu

- Účastníci se snaží finalizovat kanál navržením staré aktualizace stavu onchain kontraktu

- Účastníci navrhují neplatné přechody stavu, aby je ostatní podepsali

Kdykoli se konsensus mezi zúčastněnými aktéry v kanálu zhroutí, poslední možností je spolehnout se na konsensus Mainnetu k vynucení konečného, platného stavu kanálu. V tomto případě vyžaduje zavření stavového kanálu vypořádání sporů onchain.

### Vypořádání sporů {#settling-disputes}

Strany v kanálu se obvykle předem dohodnou na zavření kanálu a spolupodepíší poslední přechod stavu, který odešlou do chytrého kontraktu. Jakmile je aktualizace schválena onchain, provádění offchain chytrého kontraktu končí a účastníci provedou výstup z kanálu se svými penězi.

Jedna strana však může odeslat onchain žádost o ukončení provádění chytrého kontraktu a finalizaci kanálu – aniž by čekala na schválení svého protějšku. Pokud nastane některá z dříve popsaných situací narušujících konsensus, může kterákoli ze stran spustit onchain kontrakt k zavření kanálu a rozdělení prostředků. To poskytuje **bezdůvěrnost**, což zajišťuje, že poctivé strany mohou kdykoli vybrat své vklady, bez ohledu na kroky druhé strany.

Pro zpracování výstupu z kanálu musí uživatel odeslat poslední platnou aktualizaci stavu aplikace do onchain kontraktu. Pokud je to v pořádku (tj. nese to podpis všech stran), pak jsou prostředky přerozděleny v jejich prospěch.

Při provádění žádostí o výstup jednoho uživatele však dochází ke zpoždění. Pokud byla žádost o uzavření kanálu jednomyslně schválena, pak je onchain transakce výstupu provedena okamžitě.

Zpoždění vstupuje do hry u výstupů jednoho uživatele kvůli možnosti podvodných akcí. Například účastník kanálu se může pokusit finalizovat kanál na Ethereu odesláním starší aktualizace stavu onchain.

Jako protiopatření umožňují stavové kanály poctivým uživatelům zpochybnit neplatné aktualizace stavu odesláním nejnovějšího, platného stavu kanálu onchain. Stavové kanály jsou navrženy tak, že novější, dohodnuté aktualizace stavu přebíjejí starší aktualizace stavu.

Jakmile peer spustí onchain systém řešení sporů, druhá strana je povinna odpovědět v časovém limitu (nazývaném okno pro zpochybnění). To umožňuje uživatelům zpochybnit transakci výstupu, zejména pokud druhá strana aplikuje zastaralou aktualizaci.

Ať už je případ jakýkoli, uživatelé kanálu mají vždy silné záruky finality: pokud byl přechod stavu v jejich držení podepsán všemi členy a je nejnovější aktualizací, pak má stejnou finalitu jako běžná onchain transakce. Stále musí zpochybnit druhou stranu onchain, ale jediným možným výsledkem je finalizace posledního platného stavu, který drží.

### Jak stavové kanály interagují s Ethereem? {#how-do-state-channels-interact-with-ethereum}

Ačkoli existují jako offchain protokoly, stavové kanály mají onchain komponentu: chytrý kontrakt nasazený na Ethereu při otevírání kanálu. Tento kontrakt kontroluje aktiva vložená do kanálu, ověřuje aktualizace stavu a rozhoduje spory mezi účastníky.

Stavové kanály nepublikují transakční data ani závazky stavu na Mainnet, na rozdíl od řešení škálování na [vrstvě 2 (l2)](/layer-2/). Jsou však více propojeny s Mainnetem než například [postranní řetězce](/developers/docs/scaling/sidechains/), což je činí o něco bezpečnějšími.

Stavové kanály se spoléhají na hlavní protokol Etherea v následujícím:

#### 1. Liveness {#liveness}

Onchain kontrakt nasazený při otevírání kanálu je zodpovědný za funkčnost kanálu. Pokud kontrakt běží na Ethereu, pak je kanál vždy k dispozici pro použití. Naopak postranní řetězec může vždy selhat, i když je Mainnet funkční, což ohrožuje prostředky uživatelů.

#### 2. Security {#security}

Do jisté míry se stavové kanály spoléhají na Ethereum, že poskytne bezpečnost a ochrání uživatele před škodlivými peery. Jak je diskutováno v pozdějších částech, kanály používají mechanismus důkazu o podvodu, který umožňuje uživatelům zpochybnit pokusy o finalizaci kanálu s neplatnou nebo zastaralou aktualizací.

V tomto případě poctivá strana poskytne nejnovější platný stav kanálu jako důkaz o podvodu onchain kontraktu k ověření. Důkazy o podvodu umožňují vzájemně nedůvěřivým stranám provádět offchain transakce, aniž by přitom riskovaly své prostředky.

#### 3. Finality {#finality}

Aktualizace stavu společně podepsané uživateli kanálu jsou považovány za stejně dobré jako onchain transakce. Přesto veškerá aktivita v kanálu dosáhne skutečné finality až po zavření kanálu na Ethereu.

V optimistickém případě mohou obě strany spolupracovat, podepsat konečnou aktualizaci stavu a odeslat ji onchain k zavření kanálu, po čemž jsou prostředky rozděleny podle konečného stavu kanálu. V pesimistickém případě, kdy se někdo pokusí podvádět odesláním nesprávné aktualizace stavu onchain, není jeho transakce finalizována, dokud neuplyne okno pro zpochybnění.

## Virtuální stavové kanály {#virtual-state-channels}

Naivní implementací stavového kanálu by bylo nasadit nový kontrakt, když si dva uživatelé přejí spustit aplikaci offchain. To je nejen neproveditelné, ale také to popírá nákladovou efektivitu stavových kanálů (náklady na onchain transakce se mohou rychle sčítat).

K vyřešení tohoto problému byly vytvořeny „virtuální kanály“. Na rozdíl od běžných kanálů, které k otevření a ukončení vyžadují onchain transakce, lze virtuální kanál otevřít, provést a finalizovat bez interakce s hlavním řetězcem. Pomocí této metody je dokonce možné řešit spory offchain.

Tento systém se spoléhá na existenci takzvaných „kanálů účetní knihy“ (ledger channels), které byly financovány onchain. Virtuální kanály mezi dvěma stranami mohou být postaveny na existujícím kanálu účetní knihy, přičemž vlastník (vlastníci) kanálu účetní knihy slouží jako zprostředkovatel.

Uživatelé v každém virtuálním kanálu interagují prostřednictvím nové instance kontraktu, přičemž kanál účetní knihy je schopen podporovat více instancí kontraktu. Stav kanálu účetní knihy také obsahuje více než jeden stav úložiště kontraktu, což umožňuje paralelní provádění aplikací offchain mezi různými uživateli.

Stejně jako u běžných kanálů si uživatelé vyměňují aktualizace stavu, aby posunuli stavový automat. Pokud nedojde ke sporu, zprostředkovatele je nutné kontaktovat pouze při otevírání nebo ukončování kanálu.

### Virtuální platební kanály {#virtual-payment-channels}

Virtuální platební kanály fungují na stejném principu jako virtuální stavové kanály: účastníci připojení ke stejné síti si mohou předávat zprávy, aniž by museli otevírat nový kanál onchain. Ve virtuálních platebních kanálech jsou převody hodnot směrovány přes jednoho nebo více zprostředkovatelů se zárukami, že převedené prostředky může přijmout pouze zamýšlený příjemce.

## Aplikace stavových kanálů {#applications-of-state-channels}

### Platby {#payments}

Rané blockchainové kanály byly jednoduché protokoly, které umožňovaly dvěma účastníkům provádět rychlé převody s nízkými poplatky offchain, aniž by museli platit vysoké transakční poplatky na Mainnetu. Dnes jsou platební kanály stále užitečné pro aplikace určené k výměně a vkladům etheru a tokenů.

Platby založené na kanálech mají následující výhody:

1. **Propustnost**: Množství offchain transakcí na kanál nesouvisí s propustností Etherea, která je ovlivněna různými faktory, zejména velikostí bloku a časem bloku. Prováděním transakcí offchain mohou blockchainové kanály dosáhnout vyšší propustnosti.

2. **Soukromí**: Protože kanály existují offchain, podrobnosti o interakcích mezi účastníky nejsou zaznamenávány na veřejném blockchainu Etherea. Uživatelé kanálu musí interagovat onchain pouze při financování a zavírání kanálů nebo při řešení sporů. Kanály jsou tedy užitečné pro jednotlivce, kteří touží po soukromějších transakcích.

3. **Latence**: Offchain transakce prováděné mezi účastníky kanálu mohou být vypořádány okamžitě, pokud obě strany spolupracují, což snižuje zpoždění. Naproti tomu odeslání transakce na Mainnet vyžaduje čekání, až uzly transakci zpracují, vytvoří nový blok s transakcí a dosáhnou konsensu. Uživatelé mohou také muset počkat na více potvrzení bloku, než budou považovat transakci za finalizovanou.

4. **Náklady**: Stavové kanály jsou obzvláště užitečné v situacích, kdy si skupina účastníků bude vyměňovat mnoho aktualizací stavu po dlouhou dobu. Jedinými vzniklými náklady jsou otevření a zavření chytrého kontraktu stavového kanálu; každá změna stavu mezi otevřením a zavřením kanálu bude levnější než ta předchozí, protože náklady na vypořádání se odpovídajícím způsobem rozloží.

Implementace stavových kanálů na řešeních vrstvy 2 (l2), jako jsou [rollupy](/developers/docs/scaling/#rollups), by je mohla učinit ještě atraktivnějšími pro platby. Ačkoli kanály nabízejí levné platby, náklady na nastavení onchain kontraktu na Mainnetu během fáze otevírání se mohou prodražit – zejména když poplatky za gas prudce stoupnou. Rollupy založené na Ethereu nabízejí [nižší transakční poplatky](https://l2fees.info/) a mohou snížit režii pro účastníky kanálu snížením poplatků za nastavení.

### Mikrotransakce {#microtransactions}

Mikrotransakce jsou platby nízké hodnoty (např. nižší než zlomek dolaru), které podniky nemohou zpracovat, aniž by utrpěly ztráty. Tyto subjekty musí platit poskytovatelům platebních služeb, což nemohou udělat, pokud je marže na platbách zákazníků příliš nízká na to, aby vytvořila zisk.

Platební kanály tento problém řeší snížením režie spojené s mikrotransakcemi. Například poskytovatel internetových služeb (ISP) může se zákazníkem otevřít platební kanál, což mu umožní streamovat malé platby pokaždé, když službu použije.

Kromě nákladů na otevření a zavření kanálu nevznikají účastníkům žádné další náklady na mikrotransakce (žádné poplatky za gas). Je to oboustranně výhodná situace, protože zákazníci mají větší flexibilitu v tom, kolik platí za služby, a podniky nepřicházejí o ziskové mikrotransakce.

### Decentralizované aplikace {#decentralized-applications}

Stejně jako platební kanály mohou stavové kanály provádět podmíněné platby podle konečných stavů stavového automatu. Stavové kanály mohou také podporovat libovolnou logiku přechodu stavu, což je činí užitečnými pro provádění obecných aplikací offchain.

Stavové kanály jsou často omezeny na jednoduché tahové aplikace, protože to usnadňuje správu prostředků vložených do onchain kontraktu. Také s omezeným počtem stran, které v intervalech aktualizují stav offchain aplikace, je potrestání nepoctivého chování poměrně přímočaré.

Efektivita aplikace stavového kanálu závisí také na jejím návrhu. Například vývojář může nasadit kontrakt kanálu aplikace onchain jednou a umožnit ostatním hráčům aplikaci znovu použít, aniž by museli jít onchain. V tomto případě slouží počáteční kanál aplikace jako kanál účetní knihy podporující více virtuálních kanálů, z nichž každý spouští novou instanci chytrého kontraktu aplikace offchain.

Potenciálním případem použití pro aplikace stavových kanálů jsou jednoduché hry pro dva hráče, kde jsou prostředky rozdělovány na základě výsledku hry. Výhodou zde je, že si hráči nemusí navzájem důvěřovat (bezdůvěrnost) a onchain kontrakt, nikoli hráči, řídí alokaci prostředků a řešení sporů (decentralizace).

Další možné případy použití pro aplikace stavových kanálů zahrnují vlastnictví jmen ENS, účetní knihy NFT a mnoho dalších.

### Atomické převody {#atomic-transfers}

Rané platební kanály byly omezeny na převody mezi dvěma stranami, což omezovalo jejich použitelnost. Zavedení virtuálních kanálů však umožnilo jednotlivcům směrovat převody přes zprostředkovatele (tj. více p2p kanálů), aniž by museli otevírat nový kanál onchain.

Směrované platby, běžně označované jako „víceskokové převody“ (multi-hop transfers), jsou atomické (tj. buď jsou všechny části transakce úspěšné, nebo transakce zcela selže). Atomické převody používají [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts), aby zajistily, že platba bude uvolněna pouze při splnění určitých podmínek, čímž se snižuje riziko protistrany.

## Nevýhody používání stavových kanálů {#drawbacks-of-state-channels}

### Předpoklady dostupnosti (Liveness) {#liveness-assumptions}

Pro zajištění efektivity stanovují stavové kanály časové limity na schopnost účastníků kanálu reagovat na spory. Toto pravidlo předpokládá, že peery budou vždy online, aby mohly sledovat aktivitu kanálu a v případě potřeby zpochybnit výzvy.

Ve skutečnosti se uživatelé mohou odpojit z důvodů, které nemohou ovlivnit (např. špatné připojení k internetu, mechanická závada atd.). Pokud se poctivý uživatel odpojí, může škodlivý peer situaci zneužít tím, že předloží staré průběžné stavy rozhodčímu kontraktu a ukradne vložené prostředky.

Některé kanály používají „strážní věže“ (watchtowers) – subjekty odpovědné za sledování onchain událostí sporů jménem ostatních a přijímání nezbytných opatření, jako je upozornění dotčených stran. To však může zvýšit náklady na používání stavového kanálu.

### Nedostupnost dat {#data-unavailability}

Jak bylo vysvětleno dříve, zpochybnění neplatného sporu vyžaduje předložení nejnovějšího, platného stavu stavového kanálu. Toto je další pravidlo založené na předpokladu – že uživatelé mají přístup k nejnovějšímu stavu kanálu.

Ačkoli je rozumné očekávat, že uživatelé kanálu budou ukládat kopie stavu offchain aplikace, tato data mohou být ztracena v důsledku chyby nebo mechanické závady. Pokud uživatel nemá data zálohovaná, může jen doufat, že druhá strana nefinalizuje neplatnou žádost o výstup pomocí starých přechodů stavu, které má ve svém držení.

Uživatelé Etherea se s tímto problémem nemusí potýkat, protože síť vynucuje pravidla pro dostupnost dat. Transakční data jsou ukládána a šířena všemi uzly a jsou uživatelům k dispozici ke stažení, pokud a kdy je to nutné.

### Problémy s likviditou {#liquidity-issues}

K vytvoření blockchainového kanálu musí účastníci uzamknout prostředky v onchain chytrém kontraktu po dobu životního cyklu kanálu. To snižuje likviditu uživatelů kanálu a také omezuje kanály na ty, kteří si mohou dovolit udržovat prostředky uzamčené na Mainnetu.

Kanály účetní knihy – provozované poskytovatelem offchain služeb (OSP) – však mohou snížit problémy s likviditou pro uživatele. Dva peery připojené ke kanálu účetní knihy mohou vytvořit virtuální kanál, který mohou otevřít a finalizovat zcela offchain, kdykoli budou chtít.

Poskytovatelé offchain služeb by také mohli otevírat kanály s více peery, což by je učinilo užitečnými pro směrování plateb. Uživatelé samozřejmě musí platit poplatky OSP za jejich služby, což může být pro některé nežádoucí.

### Griefing útoky {#griefing-attacks}

Griefing útoky jsou běžným rysem systémů založených na důkazech o podvodu. Griefing útok nepřináší útočníkovi přímý prospěch, ale způsobuje oběti zármutek (tj. škodu), odtud ten název.

Prokazování podvodu je náchylné ke griefing útokům, protože poctivá strana musí reagovat na každý spor, dokonce i na ten neplatný, jinak riskuje ztrátu svých prostředků. Škodlivý účastník se může rozhodnout opakovaně odesílat zastaralé přechody stavu onchain, čímž nutí poctivou stranu reagovat platným stavem. Náklady na tyto onchain transakce se mohou rychle sčítat, což způsobuje, že poctivé strany v tomto procesu tratí.

### Předem definované sady účastníků {#predefined-participant-sets}

Z podstaty návrhu zůstává počet účastníků, kteří tvoří stavový kanál, po celou dobu jeho životnosti pevný. Je to proto, že aktualizace sady účastníků by zkomplikovala provoz kanálu, zejména při financování kanálu nebo řešení sporů. Přidání nebo odebrání účastníků by také vyžadovalo další onchain aktivitu, což zvyšuje režii pro uživatele.

Ačkoli to usnadňuje uvažování o stavových kanálech, omezuje to užitečnost návrhů kanálů pro vývojáře aplikací. To částečně vysvětluje, proč byly stavové kanály opuštěny ve prospěch jiných řešení škálování, jako jsou rollupy.

### Paralelní zpracování transakcí {#parallel-transaction-processing}

Účastníci ve stavovém kanálu odesílají aktualizace stavu střídavě, a proto fungují nejlépe pro „tahové aplikace“ (např. šachová partie pro dva hráče). To eliminuje potřebu zpracovávat současné aktualizace stavu a snižuje práci, kterou musí onchain kontrakt vykonat k potrestání těch, kteří odesílají zastaralé aktualizace. Vedlejším účinkem tohoto návrhu však je, že transakce jsou na sobě závislé, což zvyšuje latenci a zhoršuje celkový uživatelský zážitek.

Některé stavové kanály tento problém řeší použitím „plně duplexního“ (full-duplex) návrhu, který rozděluje offchain stav na dva jednosměrné „simplexní“ stavy, což umožňuje souběžné aktualizace stavu. Takové návrhy zlepšují offchain propustnost a snižují zpoždění transakcí.

## Použití stavových kanálů {#use-state-channels}

Několik projektů poskytuje implementace stavových kanálů, které můžete integrovat do svých decentralizovaných aplikací (dapp):

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Další čtení {#further-reading}

**Stavové kanály**

- [Jak porozumět řešením škálování vrstvy 2 na Ethereu: Stavové kanály, Plasma a Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12. února 2018_
- [Stavové kanály - vysvětlení](https://www.jeffcoleman.ca/state-channels/) _6. listopadu 2015 - Jeff Coleman_
- [Základy stavových kanálů](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Blockchainové stavové kanály: Současný stav](https://ieeexplore.ieee.org/document/9627997)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_