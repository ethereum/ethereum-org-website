---
title: Dostupnost dat
description: "Přehled problémů a řešení souvisejících s dostupností dat na Ethereu"
lang: cs
---

"Nevěř, ověř" je v ethereovské komunitě běžným rčením. Myšlenka za ním je taková, že váš síťový uzel může nezávisle ověřit, že informace, které obdrží, jsou správné, a to tak, že vykoná transakce v blocích, které přijme od ostatních uzlů, aby se ujistil, že navrhované změny přesně odpovídají těm, které tento uzel spočítal nezávisle na dalších síťových uzlech. To znamená, že uzly nemusí důvěřovat, že odesílatelé bloku jsou poctiví. To ale není možné, pokud data chybí.

**Dostupnost dat** se týká důvěry, kterou může mít uživatel v to, že data potřebná k ověření bloku jsou skutečně dostupná všem účastníkům sítě. Pro plné uzly na 1. vrstvě Etherea je to relativně jednoduché; plný uzel si stáhne kopii všech dat v každém bloku – data _musí_ být dostupná, aby bylo stahování možné. Blok s chybějícími daty by byl zamítnut, místo toho, aby byl přidán na blockchain. Jedná se o „dostupnost on-chain dat“ a je to vlastnost monolitických blockchainů. Úplné uzly není možné oklamat přijetím neplatných transakcí, protože samy stahují a exekuují každou transakci. Pro modulární blockchainy, rollupy druhé vrstvy a jednoduché klienty je však dostupnost dat složitější a vyžaduje sofistikovanější ověřovací postupy.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět [základům blockchainu](/developers/docs/intro-to-ethereum/) a zejména [mechanismům konsensu](/developers/docs/consensus-mechanisms/). Tato stránka také předpokládá, že čtenář je obeznámen s [bloky](/developers/docs/blocks/), [transakcemi](/developers/docs/transactions/), [uzly](/developers/docs/nodes-and-clients/), [řešeními škálovatelnosti](/developers/docs/scaling/) a dalšími relevantními tématy.

## Problém s dostupností dat {#the-data-availability-problem}

Problém dostupnosti dat spočívá v potřebě prokázat celé síti, že souhrnná forma nějakých transakčních dat, která jsou přidávána na blockchain, skutečně reprezentuje sadu platných transakcí, a to bez nutnosti, aby musely všechny síťové uzly stahovat všechna data. Úplná transakční data jsou nezbytná pro nezávislé ověřování bloků, ale požadavek na stažení všech transakčních dat všemi síťovými uzly je překážkou škálování. Řešení problému dostupnosti dat mají za úkol poskytnout dostatečné záruky, že všechna transakční data byla zpřístupněna pro ověření účastníkům sítě, kteří si tato data sami nestahují a neukládají.

[Lehké uzly](/developers/docs/nodes-and-clients/light-clients) a [rollupy 2. vrstvy](/developers/docs/scaling) jsou důležitými příklady účastníků sítě, kteří vyžadují silné záruky dostupnosti dat, ale nemohou si sami stahovat a zpracovávat transakční data. Vyhýbání se stahování transakčních dat je to, co dělá jednoduché uzly jednoduchými a umožňuje rollupům být efektivním řešením pro škálování.

Dostupnost dat je také kritickým problémem pro budoucí ["bezstavové"](/roadmap/statelessness) klienty Etherea, kteří nepotřebují stahovat a ukládat stavová data za účelem ověřování bloků. Bezstavoví klienti si stále potřebují být jisti, že data jsou _někde_ dostupná a že byla správně zpracována.

## Řešení dostupnosti dat {#data-availability-solutions}

### Vzorkování dostupnosti dat (DAS) {#data-availability-sampling}

Vzorkování dostupnosti dat (DAS) je způsob, jakým může síť ověřit, že data jsou dostupná, aniž by příliš zatěžovala jakýkoliv jednotlivý síťový uzel. Každý uzel (včetně nestakujících uzlů) stahuje malou, náhodně vybranou podmnožinu všech dat. Úspěšné stažení takových vzorků potvrzuje s vysokou jistotou, že všechna data jsou dostupná. To se opírá o mazací kódování (erasure coding), které rozšiřuje danou datovou sadu o redundantní informace (dělá se to tak, že se daty proloží funkce známá jako _polynom_ a tento polynom se vyhodnotí v dalších bodech). Tento proces umožňuje obnovit původní data z redundantních dat, pokud je to nutné. Důsledkem tohoto vytvoření dat je, že pokud _jakákoli_ z původních dat nejsou dostupná, bude chybět _polovina_ rozšířených dat! Množství datových vzorků stažených každým uzlem lze vyladit tak, aby bylo _extrémně_ pravděpodobné, že alespoň jeden z datových fragmentů, které každý klient vzorkuje, bude chybět, _pokud_ je skutečně k dispozici méně než polovina dat.

DAS se bude používat k zajištění toho, aby operátoři rollupů zpřístupnili svá transakční data po implementaci [úplného Dankshardingu](/roadmap/danksharding/#what-is-danksharding). Síťové uzly Etherea budou náhodně vzorkovat transakční data doručená v blobech pomocí výše popsaného redundantního schématu, aby ověřily, že všechna data existují. Stejnou techniku by bylo možné použít k zajištění toho, aby producenti bloků zpřístupnili všechna svá data pro zabezpečení jednoduchých klientů. Podobně v rámci [oddělení navrhovatele a stavitele bloku](/roadmap/pbs) by celý blok musel zpracovat pouze stavitel bloku – ostatní validátoři by jej ověřovali pomocí vzorkování dostupnosti dat.

### Komise pro dostupnost dat {#data-availability-committees}

Komise pro dostupnost dat (Data Availability Committees, DACs) jsou důvěryhodné strany, které zajišťují nebo potvrzují dostupnost dat. DAC lze použít místo DAS, [nebo v kombinaci s ním](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS). Záruky bezpečnosti, které DACs poskytují, závisí na konkrétním nastavení. Ethereum například využívá k potvrzení dostupnosti dat pro jednoduché klienty náhodně vybrané podskupiny validátorů.

DACs také využívají některá validia. V takovém případě hho tvoří důvěryhodná skupina uzlů, která uchovává kopie dat offline. DAC má povinnost tato data v případě sporu zpřístupnit. Členové DAC také publikují on-chain atestace, aby dokázali, že uvedená data jsou skutečně dostupná. Některá validia nahrazují DACs systémem validátorů založeným na proof of stake (PoS). Zde se kdokoli může stát validátorem a ukládat data offchain. Tito validátoři musí poskytnout „zástavu“, která je uložena ve smart kontraktu. V případě škodlivého chování, jako je zadržování dat, může být validátorovi tento vklad odebrán. DACs založené na proof of stake jsou výrazně bezpečnější než běžné DACs, protože jsou přímou motivací k poctivému chování.

## Dostupnost dat a lehké uzly {#data-availability-and-light-nodes}

[Lehké uzly](/developers/docs/nodes-and-clients/light-clients) potřebují ověřit správnost hlaviček bloků, které přijímají, aniž by stahovaly data bloku. Cena za tuto „jednoduchoou“ variantu je neschopnost nezávisle ověřit hlavičky bloků opětovným provedením transakcí na místní úrovni, jak to dělají úplné uzly.

Lehké uzly Etherea důvěřují náhodným sadám 512 validátorů, které byly přiřazeny k _synchronizační komisi_. Synchronizační komise funguje jako DAC, která pomocí kryptografického podpisu signalizuje jednoduchým klientům, že data v hlavičce jsou správná. Synchronizační komise se obnovuje denně. Každá hlavička bloku upozorní lehké uzly na to, od kterých validátorů se očekává podepsání _dalšího_ bloku, takže nemohou být oklamány škodlivou skupinou, která se vydává za skutečnou synchronizační komisi.

Co se ale stane, když se útočníkovi _podaří_ předat škodlivou hlavičku bloku lehkým klientům a přesvědčit je, že ji podepsala poctivá synchronizační komise? V takovém případě by útočník do hlavičky mohl zahrnout neplatné transakce a jednoduchý klient by je slepě přijal, protože nezávisle neověřuje všechny změny stavu zahrnuté v hlavičkách bloků. Aby se proti takovým případům efektivně bránil, může jednochý klient využít důkazy o podvodech (fraud proofs).

Tyto důkazy fungují tak, že úplný uzel, který zaznamená neplatnou změnu stavu, může rychle vytvořit malý datový soubor, který prokazuje, že navrhovaná změna stavu nemohla vzniknout z dané sady transakcí, a tento důkaz rozšíří mezi své kolegy. Jednoduché uzly mohou tyto důkazy o podvodech zachytit a použít je k zamítnutí podvodných hlaviček bloků, což jim zajistí, že zůstanou na stejné - správné - větvi řetězce jako úplné uzly.

Aby byla tato obrana funkční, musí mít úplné uzly přístup k úplným datům transakcí. Útočník, který se snaží hlavičku bloku podvrhnout a zároveň zajistí, aby byla data transakcí nedostupná, může zabránit úplným uzlům v generování důkazů o podvodu. Úplné uzly by sice mohly vydat varování před špatným blokem, ale nemohly by toto varování podložit žádným důkazem, protože data, ze kterých by bylo možné důkaz vytvořit, nebyla k dispozici!

Řešením tohoto problému s dostupností dat je technika DAS. Jednoduché uzly stahují velmi malé náhodné části všech dat a pomocí těchto vzorků ověřují, že je k dispozici celá sada dat. Skutečnou pravděpodobnost nesprávného předpokladu plné dostupnosti dat po stažení N náhodných částí lze vypočítat ([pro 100 částí je šance 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), tj. neuvěřitelně nepravděpodobné).

Dokonce i v tomto scénáři by si útoků, které zadržují jen několik bajtů dat, klienti, kteří by posílali náhodné požadavky na data, nemuseli všimnout. Kódování pomocí oprav chyb (erasure coding) tento problém řeší rekonstrukcí malých chybějících částí dat, které lze použít k ověření navrhovaných změn stavu. Poté by mohl být vytvořen důkaz o podvodu pomocí rekonstruovaných dat, což by zabránilo jednoduchým uzlům přijímat špatné hlavičky bloků.

**Poznámka:** DAS a důkazy o podvodu ještě nebyly implementovány pro lehké klienty Etherea s proof-of-stake, ale jsou v plánu a s největší pravděpodobností budou mít formu důkazů založených na ZK-SNARK. Dnes se jednoduchý klient spoléhá na DAC: Ověřuje identity synchronizační komise a poté důvěřuje podepsaným hlavičkám bloků, které dostává.

## Dostupnost dat a rollupy 2. vrstvy {#data-availability-and-layer-2-rollups}

[Řešení škálovatelnosti 2. vrstvy](/layer-2/), jako jsou [rollupy](/glossary/#rollups), snižují transakční náklady a zvyšují propustnost Etherea zpracováváním transakcí offchain. Transakce z rollupů jsou komprimovány a následně odesílány na Ethereum v balíčcích. Dávky představují tisíce jednotlivých offchain transakcí v jedné transakci na Ethereu. To snižuje přetížení základní vrstvy, stejně jako poplatky pro uživatele.

„Souhrnným“ transakcím zveřejněným na Ethereu je však možné důvěřovat pouze v případě, že navrhovanou změnu stavu lze nezávisle ověřit a potvrdit jako výsledek použití všech jednotlivých offchain transakcí. Pokud provozovatelé rollupů nezajistí dostupnost dat, pomocí kterých by to bylo možné ověřit, mohli by na Ethereum poslat nesprávná data.

[Optimistické rollupy](/developers/docs/scaling/optimistic-rollups/) zveřejňují komprimovaná transakční data na Ethereu a čekají určitou dobu (obvykle 7 dní), aby nezávislí ověřovatelé mohli data zkontrolovat. Pokud někdo najde problém, může vygenerovat důkaz o podvodu a rollup s ním konfrontovat. To by způsobilo vrácení řetězce a vynechání neplatného bloku. Toto je možné pouze tehdy, pokud jsou data dostupná. V současné době existují dva způsoby, jak optimistické rollupy odesílají transakční data na L1. Některé rollupy zpřístupňují data trvale jako `CALLDATA`, která jsou trvale onchain. S implementací EIP-4844 odesílají některé rollupy svá transakční data do levnějšího úložiště v blobech. Toto úložiště není permanentní. Nezávislí ověřovatelé se musí blobů dotazovat a vznést své námitky do ~ 18 dnů: před smazáním dat z první vrstvy Etherea. Dostupnost dat je zaručena protokolem Etherea pouze na tuto krátkou pevně stanovenou dobu. Poté se odpovědnost přenáší na jiné subjekty v ekosystému Etherea. Jakýkoli uzel může ověřit dostupnost dat pomocí DAS, tj. stažením malých náhodných vzorků blob dat.

[Rollupy s nulovou znalostí (ZK rollupy)](/developers/docs/scaling/zk-rollups) nemusí zveřejňovat transakční data, protože [důkazy platnosti s nulovou znalostí](/glossary/#zk-proof) zaručují správnost přechodů stavu. Dostupnost dat i tak představuje problém, protože nemůžeme zaručit funkčnost ZK-rollupu (nebo s ním interagovat) bez přístupu k jeho stavovým datům. Například uživatelé nemohou zjistit své zůstatky, pokud provozovatel zadrží podrobnosti o stavu rollupu. Také nemohou provádět změny stavu pomocí informací obsažených v nově přidaném bloku.

## Dostupnost dat vs. znovu-získatelnost dat {#data-availability-vs-data-retrievability}

Dostupnost dat se liší od opětovného získání dat liší. Dostupnost dat zaručuje, že úplné uzly měly přístup k úplné sadě transakcí spojené s konkrétním blokem a mohly je ověřit. To však nezaručuje, že data budou dostupná navždy.

Znovu-získatelnost dat je schopnost uzlů získat _historické informace_ z blockchainu. Tato historická data nejsou potřebná pro ověřování nových bloků, jsou nutná pouze pro synchronizaci úplných síťových uzlů od genesis bloku nebo pro vyřízení specifických historických požadavků.

Klíčový protokol Etherea se primárně zaměřuje na dostupnost dat, ne na jejich opětovnou dostupnost. Znovu-získatelnost dat může zajistit malá skupina archivních uzlů provozovaných třetími stranami, nebo může být distribuována po síti pomocí decentralizovaného úložiště souborů, jako je [Portal Network](https://www.ethportal.net/).

## Další čtení {#further-reading}

- [WTF je dostupnost dat?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Co je dostupnost dat?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Úvod do kontrol dostupnosti dat](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Vysvětlení návrhu tříštění + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Poznámka k dostupnosti dat a mazacímu kódování](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Komise pro dostupnost dat.](https://medium.com/starkware/data-availability-e5564c416424)
- [Komise pro dostupnost dat s proof-of-stake.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Řešení problému se znovu-získatelností dat](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Dostupnost dat aneb: Jak se rollupy naučily nedělat si starosti a milovat Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Zvýšení nákladů na Calldata](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
