---
title: "Stavové kanály"
description: "Úvod do stavových kanálů a platebních kanálů jako škálovacího řešení, které v současné době využívá komunita Etherea."
lang: cs
sidebarDepth: 3
---

Stavové kanály umožňují účastníkům bezpečně provádět transakce mimo řetězec a zároveň omezují interakci s hlavní sítí Ethereum na minimum. Partneři v tomto kanálu mohou provést libovolný počet transakcí mimo řetězec, přičemž na řetězec se zapisují pouze dvě transakce – jedna pro otevření kanálu a druhá pro jeho uzavření. Tím je dosaženo extrémně vysoké propustnosti transakcí a nižších nákladů pro uživatele.

## Předpoklady {#prerequisites}

Měli byste mít přečteny naše stránky o [škálování Etherea](/developers/docs/scaling/) a [vrstvě 2](/layer-2/).

## Co to jsou kanály? {#what-are-channels}

Veřejné blockchainy, jako je Ethereum, čelí výzvám v oblasti škálovatelnosti kvůli své distribuované architektuře: transakce na řetězci musí být vykonány všemi síťovými uzly. Ty musí být schopny zpracovat objem transakcí v bloku s použitím běžného hardwaru, což omezuje propustnost transakcí za účelem zachování decentralizace sítě. Blockchainové kanály tento problém řeší tím, že uživatelům umožňují komunikovat mimo řetězec a přitom se při konečném vypořádání stále spoléhat na bezpečnost hlavního řetězce.

Kanály jsou jednoduché peer-to-peer protokoly, které umožňují dvěma stranám provést mnoho transakcí mezi sebou a poté na blockchain zveřejnit pouze konečné výsledky. Kanál využívá kryptografii k prokázání, že souhrnná data, která generují, jsou skutečně výsledkem platné sady mezitransakcí. Chytrý kontrakt typu [„multisig“](/developers/docs/smart-contracts/#multisig) zajišťuje, že transakce jsou podepsány správnými stranami.

Ve stavových kanálech jsou změny stavu prováděny a ověřovány zainteresovanými stranami, což minimalizuje výpočty na exekuční vrstvě Etherea. To snižuje přetížení na Ethereu a zároveň zvyšuje rychlost zpracování transakcí uživatelů.

Každý kanál je spravován [chytrým kontraktem typu multisig](/developers/docs/smart-contracts/#multisig) běžícím na Ethereu. K otevření kanálu účastníci nasadí kontrakt kanálu na řetězec a vloží do něj prostředky. Obě strany společně podepíší aktualizaci stavu, aby inicializovaly stav kanálu, po čemž mohou rychle a volně provádět transakce mimo řetězec.

K uzavření kanálu účastníci předloží na řetězec poslední dohodnutý stav kanálu. Poté chytrý kontrakt rozdělí uzamčené prostředky podle zůstatku každého účastníka v konečném stavu kanálu.

Peer-to-peer kanály jsou užitečné zejména v situacích, kdy někteří účastníci chtějí provádět transakce s vysokou frekvencí bez viditelné režie. Blockchainové kanály spadají do dvou kategorií: **platební kanály** a **stavové kanály**.

## Platební kanály {#payment-channels}

Platební kanál je nejlépe popsán jako „obousměrná účetní kniha“, kterou společně spravují dva uživatelé. Počáteční zůstatek účetní knihy je součtem vkladů uzamčených v on-chain kontraktu během fáze otevření kanálu. Převody v platebním kanálu mohou být prováděny okamžitě a bez zapojení samotného blockchainu, s výjimkou počátečního jednorázového vytvoření kanálu na řetězci a jeho pozdějšího uzavření.

Aktualizace zůstatku účetní knihy (tj. stavu platebního kanálu) vyžaduje souhlas všech stran v kanálu. Aktualizace kanálu, podepsaná všemi účastníky kanálu, je považována za konečnou, podobně jako transakce na Ethereu.

Platební kanály patřily mezi první škálovací řešení navržená k minimalizaci nákladné on-chain aktivity jednoduchých uživatelských interakcí (např. převody ETH, atomické směny, mikroplatby). Účastníci kanálu mohou mezi sebou provádět neomezené množství okamžitých, bezpoplatkových transakcí, dokud čistá suma jejich převodů nepřekročí vložené tokeny.

## Stavové kanály {#state-channels}

Kromě podpory plateb mimo řetězec (offchain) se platební kanály neosvědčily pro zpracování obecné logiky přechodu stavu. Stavové kanály byly vytvořeny k vyřešení tohoto problému a ke zpřístupnění kanálů pro škálování obecného výpočtu.

Stavové kanály mají stále mnoho společného s platebními kanály. Například uživatelé komunikují výměnou kryptograficky podepsaných zpráv (transakcí), které musí podepsat i ostatní účastníci kanálu. Pokud navrhovaná aktualizace stavu není podepsána všemi účastníky, je považována za neplatnou.

Nicméně kromě držení zůstatků uživatelů kanál také sleduje aktuální stav úložiště kontraktu (tj. hodnoty proměnných kontraktu).

To umožňuje spustit chytrý kontrakt mimo řetězec mezi dvěma uživateli. V tomto scénáři vyžadují aktualizace interního stavu chytrého kontraktu pouze souhlas partnerů, kteří kanál vytvořili.

I když toto řeší dříve popsaný problém se škálovatelností, má to vliv na bezpečnost. Na Ethereu je platnost přechodů stavu vynucována konsensuálním protokolem sítě. To znemožňuje navrhnout neplatnou aktualizaci stavu chytrého kontraktu nebo změnit exekuci chytrého kontraktu.

Stavové kanály nemají stejné bezpečnostní záruky. Do určité míry je stavový kanál miniaturou Mainnetu. S omezeným počtem účastníků, kteří vynucují pravidla, se zvyšuje možnost podvodů (např. návrhu neplatných aktualizací stavu). Stavové kanály odvozují svoji bezpečnost z arbitrážního systému založeného na [důkazech podvodu](/glossary/#fraud-proof).

## Jak stavové kanály fungují {#how-state-channels-work}

V podstatě je aktivita ve stavovém kanálu relací interakcí zahrnujících uživatele a blockchainový systém. Uživatelé většinou komunikují mezi sebou mimo řetězec a s podkladovým blockchainem interagují pouze k otevření kanálu, uzavření kanálu nebo k řešení potenciálních sporů mezi účastníky.

Následující část popisuje základní pracovní tok stavového kanálu:

### Otevření kanálu {#opening-the-channel}

Otevření kanálu vyžaduje, aby účastníci vložili prostředky do chytrého kontraktu na Mainnetu. Tento vklad také funguje jako virtuální účet, takže účastníci mohou volně transakčně komunikovat bez potřeby okamžitého vypořádání plateb. Strany se vzájemně vyrovnají a vyberou si zbytek svých prostředků až poté, co je kanál finalizován na řetězci.

Tento vklad také slouží jako záruka čestného chování každého účastníka. Pokud jsou vkladatelé během fáze řešení sporů shledáni vinnými z nekalých praktik, kontrakt jim jejich vklad sníží.

Partneři v kanálu musí podepsat počáteční stav, na kterém se všichni shodnou. Tento stav slouží jako geneze stavového kanálu a poté mohou uživatelé začít transakčně komunikovat.

### Používání kanálu {#using-the-channel}

Po inicializaci stavu kanálu partneři komunikují podepisováním transakcí a jejich zasíláním ostatním ke schválení. Účastníci pomocí těchto transakcí zahajují aktualizace stavu a podepisují aktualizace stavu od ostatních. Každá transakce obsahuje následující:

- **Nonce**, tedy jedinečné číslo, které funguje jako unikátní ID transakcí a zabraňuje útokům opětovným opakováním transakcí. Také identifikuje pořadí, ve kterém došlo k aktualizacím stavu (což je důležité pro řešení sporů)

- Starý stav kanálu

- Nový stav kanálu

- Transakce, která spouští změnu stavu (např. Alice pošle Bobovi 5 ETH)

Aktualizace stavu v kanálu se neposílají na řetězec, jak se to obvykle dělá, když uživatelé interagují na Mainnetu, což je v souladu s cílem stavových kanálů minimalizovat stopu na řetězci. Pokud účastníci souhlasí s aktualizacemi stavu, jsou stejně závazné jako transakce na Ethereu. Účastníci se musí spoléhat na konsenzuální mechanismus Mainnetu pouze v případě sporu.

### Zavírání kanálu {#closing-the-channel}

Uzavření stavového kanálu vyžaduje předložení konečného, dohodnutého stavu kanálu on-chain chytrého kontraktu. Podrobnosti uvedené v aktualizaci stavu zahrnují počet kroků každého účastníka a seznam schválených transakcí.

Po ověření, že je aktualizace stavu platná (tj. je podepsána všemi stranami), chytrý kontrakt kanálu uzavře a rozdělí uzamčené prostředky podle výsledku kanálu. Platby provedené mimo řetězec se aplikují na stav Etherea a každý účastník obdrží svou zbývající část uzamčených prostředků.

Výše popsaný scénář představuje, co se děje v ideálním případě. Někdy se však může stát, že uživatelé nedosáhnou dohody a kanál neuzavřou (takzvaný „nešťastný případ“). Může nastat některá z následujících situací:

- Účastníci přestanou být online a nepodaří se jim navrhnout přechody stavu

- Účastníci odmítnou spolupodepsat platné aktualizace stavu

- Účastníci se pokusí kanál finalizovat tím, že on-chain kontraktu navrhnou starou aktualizaci stavu.

- Účastníci navrhnou neplatné přechody stavu k podepsání ostatním

Kdykoliv dojde k rozpadu konsenzu mezi účastníky kanálu, poslední možností je spolehnout se na konsenzuální mechanismus Mainnetu k vynucení konečného, platného stavu kanálu. V tomto případě vyžaduje uzavření stavového kanálu vyřešení sporů on-chain.

### Řešení sporů {#settling-disputes}

Obvykle se strany v kanálu předem dohodnou na uzavření kanálu a spolupodepíší poslední přechod stavu, který předloží chytrému kontraktu. Jakmile je aktualizace on-chain schválena, exekuce off-chain chytrého kontraktu končí a účastníci vystoupí z kanálu se svými prostředky.

Jedna strana však může podat on-chain žádost o ukončení provádění chytrého kontraktu a finalizaci kanálu – aniž by čekala na schválení od protistrany. Pokud nastane některá z výše popsaných situací narušujících konsenzus, může kterákoli ze stran aktivovat on-chain kontrakt k uzavření kanálu a distribuci finančních prostředků. Tím je zajištěna **nezávislost na důvěře**, což zaručuje, že poctivé strany mohou kdykoliv vybrat své vklady, bez ohledu na akce druhé strany.

Pro zpracování výstupu z kanálu musí uživatel předložit on-chain kontraktu poslední platnou aktualizaci stavu aplikace. Pokud je tato aktualizace schválena (tj. nese podpis všech stran), prostředky jsou přerozděleny v jejich prospěch.

Existuje však zpoždění při provádění žádostí o výstup od jediné strany. Pokud byla žádost o uzavření kanálu jednomyslně schválena, pak je on-chain výstupní transakce provedena okamžitě.

Zpoždění nastává při žádosti o výstup jen od jediné strany a to z důvodu možnosti podvodných akcí. Například účastník kanálu se může pokusit finalizovat kanál na Ethereu předložením starší aktualizace stavu on-chain.

Jako protiopatření umožňují stavové kanály poctivým uživatelům napadnout neplatné aktualizace stavu předložením nejnovějšího platného stavu kanálu on-chain. Stavové kanály jsou navrženy tak, že novější, domluvené aktualizace stavu mají přednost před staršími aktualizacemi stavu.

Jakmile některá ze stran vyvolá on-chain systém řešení sporů, druhá strana je povinna odpovědět v časovém limitu (tzv. „okno pro výzvy“). To umožňuje uživatelům napadnout výstupní transakci, zejména pokud druhá strana uplatňuje zastaralou aktualizaci.

Ať už je situace jakákoliv, uživatelé kanálu mají vždy silné záruky finality: Pokud je přechod stavu, který mají k dispozici, podepsán všemi členy a je to nejnovější aktualizace, má stejnou finalitu jako běžná on-chain transakce. Stále musí na řetězci vyzvat druhou stranu, ale jediným možným výsledkem je finalizace posledního platného stavu, který drží.

### Jak stavové kanály interagují s Ethereem? {#how-do-state-channels-interact-with-ethereum}

Ačkoli existují jako off-chain protokoly, stavové kanály mají on-chain komponentu: chytrý kontrakt nasazený na Ethereu při otevření kanálu. Tento kontrakt kontroluje aktiva vložená do kanálu, ověřuje aktualizace stavu a řeší spory mezi účastníky.

Stavové kanály nepublikují transakční data ani závazky stavu na Mainnetu, na rozdíl od škálovacích řešení [vrstvy 2](/layer-2/). Jsou však více propojeny s Mainnetem než například [postranní řetězce](/developers/docs/scaling/sidechains/), takže jsou o něco bezpečnější.

Stavové kanály se spoléhají na hlavní protokol Etherea v následujících bodech:

#### 1. Dostupnost {#liveness}

On-chain kontrakt nasazený při otevření kanálu je zodpovědný za funkčnost kanálu. Pokud kontrakt běží na Ethereu, pak je kanál vždy dostupný k použití. Naopak postranní řetězec může kdykoliv selhat, i když je Mainnet funkční, čímž jsou ohroženy prostředky uživatelů.

#### 2. Bezpečnost {#security}

Do určité míry se stavové kanály pro zajištění bezpečnosti a ochranu uživatelů před podvodníky spoléhají na Ethereum. Kanály používají mechanismus důkazu podvodu, který umožňuje uživatelům napadnout pokusy o uzavření kanálu s neplatnou nebo zastaralou aktualizací, což více rozebereme níže.

V takovém případě poskytuje poctivá strana nejnovější platný stav kanálu on-chain kontraktu k ověření jako důkaz podvodu. Důkazy podvodu umožňují vzájemně nedůvěřivým stranám provádět transakce mimo řetězec, aniž by při tom riskovaly své prostředky.

#### 3. Konečnost {#finality}

Aktualizace stavu, které společně podepsali uživatelé kanálu, jsou považovány za rovnocenné on-chain transakcím. Přesto veškerá aktivita v kanálu dosáhne skutečné finálnosti až tehdy, když je kanál uzavřen na Ethereu.

V optimistickém případě mohou obě strany spolupracovat, podepsat konečnou aktualizaci stavu a předložit ji on-chain, aby uzavřely kanál, po čemž jsou prostředky rozděleny podle konečného stavu kanálu. V pesimistickém případě, kdy se někdo pokusí podvádět tím, že zveřejní nesprávnou aktualizaci stavu on-chain, jeho transakce nebude finalizována, dokud neuplyne časové okno pro výzvy.

## Virtuální stavové kanály {#virtual-state-channels}

Naivní implementace stavového kanálu by spočívala v nasazení nového kontraktu, když si dva uživatelé přejí spustit aplikaci mimo řetězec. To je nejen neproveditelné, ale také to popírá nákladovou efektivitu stavových kanálů (náklady na on-chain transakce se mohou rychle sčítat).

K vyřešení tohoto problému byly vytvořeny „virtuální kanály“. Na rozdíl od běžných kanálů, které k otevření a ukončení vyžadují on-chain transakce, lze virtuální kanál otevřít, provést a finalizovat bez interakce s hlavním řetězcem. Pomocí této metody je dokonce možné řešit spory mimo řetězec.

Tento systém spoléhá na existenci tzv. „účetních kanálů“, které byly financovány on-chain. Virtuální kanály mezi dvěma stranami mohou být vytvořeny na vrcholu existujícího účetního kanálu, přičemž vlastník (či vlastníci) účetního kanálu slouží jako prostředník.

Uživatelé v každém virtuálním kanálu interagují prostřednictvím nové instance kontraktu, přičemž účetní kanál je schopen podporovat více instancí kontraktů. Stav účetního kanálu také obsahuje více než jeden stav úložiště kontraktu, což umožňuje paralelní provádění aplikací mimo řetězec mezi různými uživateli.

Stejně jako u běžných kanálů si uživatelé vyměňují aktualizace stavu za účelem rozvoje stavového stroje. Pokud nedojde ke sporu, prostředník musí být kontaktován pouze při otevírání nebo ukončování kanálu.

### Virtuální platební kanály {#virtual-payment-channels}

Virtuální platební kanály fungují na stejném principu jako virtuální stavové kanály: účastníci propojení ve stejné síti si mohou předávat zprávy, aniž by museli otevírat nový kanál on-chain. Ve virtuálních platebních kanálech jsou převody hodnot směrovány prostřednictvím jednoho nebo více prostředníků, přičemž je zaručeno, že pouze zamýšlený příjemce může obdržet převedené prostředky.

## Využití stavových kanálů {#applications-of-state-channels}

### Platby {#payments}

První blockchainové kanály byly jednoduché protokoly, které umožňovaly dvěma účastníkům provádět rychlé, nízkonákladové převody mimo řetězec, aniž by museli platit vysoké transakční poplatky na Mainnetu. Platební kanály jsou dodnes užitečné pro aplikace navržené ke směně a vkladům etheru a tokenů.

Platby založené na kanálech mají následující výhody:

1. **Propustnost**: Počet transakcí mimo řetězec na kanál nesouvisí s propustností sítě Ethereum, která je ovlivněna různými faktory, zejména velikostí bloku a časem bloku. Prováděním transakcí mimo řetězec mohou blockchainové kanály dosáhnout vyšší propustnosti.

2. **Soukromí**: Protože kanály existují mimo řetězec, podrobnosti o interakcích mezi účastníky nejsou zaznamenány na veřejném blockchainu Etherea. Uživatelé kanálu musí interagovat on-chain pouze při financování a uzavírání kanálů nebo řešení sporů. Proto jsou kanály užitečné pro jednotlivce, kteří si přejí více soukromí při provádění transakcí.

3. **Latence**: Transakce mimo řetězec prováděné mezi účastníky kanálu mohou být vypořádány okamžitě, pokud obě strany spolupracují, což snižuje zpoždění. Naproti tomu odeslání transakce na Mainnetu vyžaduje počkat, až síťové uzly zpracují transakci, vytvoří nový blok s transakcí a dosáhnou konsenzu. Uživatelé také mohou chtít čekat na potvrzení dalších bloků, než budou transakci považovat za finální.

4. **Náklady**: Stavové kanály jsou obzvláště užitečné v situacích, kdy si bude skupina účastníků vyměňovat mnoho aktualizací stavu po delší dobu. Jediné náklady, které vzniknou, jsou na otevření a uzavření chytrého kontraktu stavového kanálu; každá změna stavu mezi otevřením a uzavřením kanálu bude levnější než ta předchozí, protože se náklady na vypořádání rozdělí.

Implementace stavových kanálů v řešeních vrstvy 2, jako jsou [rollupy](/developers/docs/scaling/#rollups), by mohla učinit platby ještě atraktivnějšími. Zatímco kanály nabízejí levné platby, náklady na nastavení on-chain kontraktu na Mainnetu během fáze otevření mohou být drahé – zejména když se zvýší poplatky za gas. Rollupy založené na Ethereu nabízejí [nižší transakční poplatky](https://l2fees.info/) a mohou snížit režii pro účastníky kanálů tím, že snižují náklady na jejich nastavení.

### Mikrotransakce {#microtransactions}

Mikrotransakce jsou platby s nízkou hodnotou (např. nižší než zlomek dolaru), které firmy nemohou zpracovávat a zároveň u toho generovat zisk. Tyto subjekty musí platit poskytovatelům platebních služeb, což nemohou udělat, pokud je marže na platbách zákazníků příliš nízká na to, aby dosáhly zisku.

Platební kanály tento problém řeší tím, že snižují režii spojenou s mikrotransakcemi. Například poskytovatel internetových služeb (ISP) může otevřít platební kanál se zákazníkem, což mu umožní provádět malé platby pokaždé, když zákazník službu využívá.

Kromě nákladů na otevření a uzavření kanálu účastníkům nevznikají žádné další náklady na mikrotransakce (žádné poplatky za palivo). Je to výhodná situace pro obě strany, protože zákazníci mají větší flexibilitu v tom, kolik za služby platí, a podniky nepřicházejí o ziskové mikrotransakce.

### Decentralizované aplikace {#decentralized-applications}

Stejně jako platební kanály mohou stavové kanály dělat podmíněné platby podle konečných stavů stavového stroje. Stavové kanály mohou také podporovat libovolnou logiku přechodu stavu, což je činí užitečnými pro spouštění obecných aplikací mimo řetězec.

Stavové kanály jsou často omezeny na jednoduché tahové aplikace, protože to usnadňuje správu finančních prostředků vázaných na on-chain kontrakt. S omezeným počtem stran, které v intervalech aktualizují stav aplikace mimo řetězec, je také relativně snadné potrestat nečestné chování.

Efektivita aplikace stavového kanálu také závisí na jejím návrhu. Například vývojář může nasadit kontrakt kanálu aplikace on-chain jen jednou a umožnit ostatním hráčům znovu používat tuto aplikaci, aniž by museli na řetězec. V tomto případě slouží počáteční kanál aplikace jako účetní kanál podporující více virtuálních kanálů, z nichž každý provozuje novou instanci chytrého kontraktu aplikace mimo řetězec.

Potenciálním příkladem použití stavových kanálů jsou jednoduché hry pro dva hráče, kde jsou prostředky rozděleny na základě výsledku hry. Výhodou je, že hráči si nemusí důvěřovat (nedůvěryhodnost) a alokaci prostředků a řešení sporů (decentralizace) řídí on-chain kontrakt, nikoli hráči.

Další možná využití stavových kanálů zahrnují vlastnictví názvů v ENS, NFT účetní knihy a mnoho dalších.

### Atomické převody {#atomic-transfers}

První platební kanály byly omezeny na převody mezi dvěma stranami, což omezovalo jejich použitelnost. Zavedení virtuálních kanálů však jednotlivcům umožnilo směrovat převody přes prostředníky (tj. více p2p kanálů), aniž by museli otevírat nový kanál on-chain.

Běžně popisované jako „multi-hop převody“, směrované platby jsou atomické (tj. buď všechny části transakce uspějí, nebo transakce selže jako celek). Atomické převody využívají [hashované timelock kontrakty (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) k zajištění toho, že platba bude uvolněna pouze tehdy, pokud jsou splněny určité podmínky, což snižuje riziko podvodu protistrany.

## Nevýhody používání stavových kanálů {#drawbacks-of-state-channels}

### Předpoklady dostupnosti {#liveness-assumptions}

Aby byla zajištěna efektivita, stavové kanály stanovují časové limity, během kterých mohou účastníci kanálu reagovat na spory. Toto pravidlo předpokládá, že partneři budou vždy online, aby sledovali aktivitu kanálu a v případě potřeby zpochybnili výzvy.

Ve skutečnosti mohou uživatelé zůstat offline z důvodů mimo jejich kontrolu (např. špatné internetové připojení, mechanická porucha atd.). Pokud poctivý uživatel zůstane offline, může škodlivý partner situace využít tím, že předloží soudci staré mezistavy kontraktu a tak si přisvojí cizí prostředky.

Některé kanály používají „strážní věže“ (watchtowers) – entity odpovědné za sledování on-chain sporů jménem ostatních a za podnikání nezbytných kroků, jako je upozornění zúčastněných stran. To však může zvýšit náklady na používání stavového kanálu.

### Nedostupnost dat {#data-unavailability}

Jak jsme vysvětlili dříve, napadení neplatného sporu vyžaduje předložení nejnovějšího platného stavu stavového kanálu. Toto pravidlo je dalším pravidlem založeným na předpokladu, že uživatelé mají přístup k nejnovějšímu stavu kanálu.

Ačkoli je rozumné očekávat, že uživatelé kanálu budou uchovávat kopie stavu aplikace mimo řetězec, tato data mohou být ztracena v důsledku chyby nebo mechanické poruchy. Pokud uživatel nemá data zálohovaná, může jen doufat, že druhá strana nefinalizuje neplatnou žádost o výstup pomocí starých změn stavu, které má k dispozici.

Uživatelé Etherea se s tímto problémem nemusí potýkat, protože síť vynucuje pravidla o dostupnosti dat. Transakční data jsou uchovávána a šířena všemi síťovými uzly a jsou dostupná uživatelům ke stažení, kdykoli je to potřeba.

### Problémy s likviditou {#liquidity-issues}

Pro založení blockchainového kanálu musí účastníci uzamknout finanční prostředky v on-chain chytrém kontraktu po dobu životního cyklu kanálu. To snižuje likviditu uživatelů kanálu a také omezuje kanály na ty, které si mohou dovolit držet prostředky uzamčené na Mainnetu.

Problémy s likviditou uživatelů však mohou snížit účetní kanály – provozované off-chain poskytovatelem služeb (OSP). Dva partneři připojení k účetnímu kanálu mohou vytvořit virtuální kanál, který mohou kdykoli otevřít a finalizovat zcela mimo řetězec.

Poskytovatelé služeb mimo řetězec by také mohli otevřít kanály s více partnery, což je činí užitečnými pro směrování plateb. Uživatelé samozřejmě musí za služby OSP platit poplatky, což pro některé může být nežádoucí.

### Smuteční útoky {#griefing-attacks}

Smuteční útoky jsou běžným rysem systémů založených na důkazech podvodu. Takový útok nepřináší přímý prospěch útočníkovi, ale způsobuje „smutek“ (tj. újmu) oběti, což dává název tomuto útoku.

Důkazní systém podvodu je ke smutečním útokům náchylný, protože poctivá strana musí reagovat na každý spor, i neplatný, nebo riskovat ztrátu svých prostředků. Zlomyslný účastník se může rozhodnout opakovaně zveřejňovat zastaralé přechody stavu on-chain, což nutí poctivou stranu reagovat platným stavem. Náklady na tyto on-chain transakce se mohou rychle sčítat, což způsobuje, že poctivé strany v tomto procesu tratí.

### Předdefinované sestavy účastníků {#predefined-participant-sets}

Z povahy návrhu zůstává počet účastníků, kteří tvoří stavový kanál, pevně stanoven po celou dobu jeho životnosti. Je to proto, že aktualizace sady účastníků by komplikovala provoz kanálu, zejména při financování kanálu nebo řešení sporů. Přidání nebo odebrání účastníků by také vyžadovalo další on-chain aktivitu, což uživatelům zvyšuje režii.

I když to usnadňuje úvahy o stavových kanálech, omezuje to užitečnost návrhů kanálů pro vývojáře aplikací. To částečně vysvětluje, proč bylo od stavových kanálů upuštěno ve prospěch jiných škálovacích řešení, jako jsou rollupy.

### Zpracování paralelních transakcí {#parallel-transaction-processing}

Účastníci stavového kanálu posílají aktualizace stavu postupně, což je důvod, proč nejlépe fungují pro „aplikace založené na střídání tahů“ (např. šachová hra pro dva hráče). To eliminuje potřebu zpracovávat současné aktualizace stavu a snižuje práci, kterou musí on-chain kontrakt vykonat, aby potrestal ty, kteří zveřejňují zastaralé aktualizace. Vedlejším efektem tohoto návrhu však je, že transakce jsou na sobě závislé, což zvyšuje latenci a zhoršuje celkový uživatelský zážitek.

Některé stavové kanály řeší tento problém pomocí „full-duplex“ návrhu, který rozděluje off-chain stav na dva jednosměrné „simplexní“ stavy, což umožňuje souběžné aktualizace stavu. Takové návrhy zlepšují propustnost mimo řetězec a snižují zpoždění transakcí.

## Využijte stavové kanály {#use-state-channels}

Několik projektů poskytuje implementace stavových kanálů, které můžete integrovat do svých dappek:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Další čtení {#further-reading}

**Stavové kanály**

- [Porozumění škalovacím řešením na vrstvě 2 Etherea: Stavové kanály, Plasma a Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12. února 2018_
- [Stavové kanály - vysvětlení](https://www.jeffcoleman.ca/state-channels/) _6. listopadu 2015 – Jeff Coleman_
- [Základy stavových kanálů](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Stavové kanály na blockchainu: Špička blockchainu](https://ieeexplore.ieee.org/document/9627997)

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_
