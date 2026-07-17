---
title: Dostupnost dat
description: "Přehled problémů a řešení týkajících se dostupnosti dat v Ethereu"
lang: cs
---

„Nedůvěřuj, prověřuj“ je v Ethereu běžné pravidlo. Myšlenka spočívá v tom, že váš uzel může nezávisle ověřit správnost přijatých informací tím, že provede všechny transakce v blocích, které obdrží od ostatních uzlů, aby se ujistil, že navrhované změny přesně odpovídají těm, které uzel nezávisle vypočítal. To znamená, že uzly nemusí důvěřovat tomu, že odesílatelé bloku jsou poctiví. To není možné, pokud data chybí.

**Dostupnost dat** označuje jistotu uživatele, že data potřebná k ověření bloku jsou skutečně dostupná všem účastníkům sítě. Pro plné uzly na [Ethereu](/) na vrstvě 1 (l1) je to poměrně jednoduché; plný uzel stáhne kopii všech dat v každém bloku – data _musí_ být dostupná, aby bylo stažení možné. Blok s chybějícími daty by byl zahozen, místo aby byl přidán do blockchainu. Jedná se o „onchain dostupnost dat“ a je to vlastnost monolitických blockchainů. Plné uzly nelze oklamat, aby přijaly neplatné transakce, protože si každou transakci samy stáhnou a provedou. U modulárních blockchainů, rollupů na vrstvě 2 (l2) a lehkých klientů je však situace ohledně dostupnosti dat složitější a vyžaduje sofistikovanější postupy ověřování.

## Předpoklady {#prerequisites}

Měli byste dobře rozumět [základům blockchainu](/developers/docs/intro-to-ethereum/), zejména [mechanismům konsensu](/developers/docs/consensus-mechanisms/). Tato stránka také předpokládá, že čtenář je obeznámen s [bloky](/developers/docs/blocks/), [transakcemi](/developers/docs/transactions/), [uzly](/developers/docs/nodes-and-clients/), [řešeními škálování](/developers/docs/scaling/) a dalšími relevantními tématy.

## Problém dostupnosti dat {#the-data-availability-problem}

Problém dostupnosti dat spočívá v nutnosti prokázat celé síti, že shrnutá forma určitých transakčních dat přidávaných do blockchainu skutečně představuje sadu platných transakcí, a to bez nutnosti, aby všechny uzly stahovaly všechna data. Úplná transakční data jsou nezbytná pro nezávislé ověřování bloků, ale požadavek, aby všechny uzly stahovaly všechna transakční data, je překážkou pro škálování. Řešení problému dostupnosti dat mají za cíl poskytnout dostatečné záruky, že úplná transakční data byla zpřístupněna k ověření účastníkům sítě, kteří si data sami nestahují a neukládají.

[Lehké uzly](/developers/docs/nodes-and-clients/light-clients) a [rollupy na vrstvě 2 (l2)](/developers/docs/scaling) jsou důležitými příklady účastníků sítě, kteří vyžadují silné záruky dostupnosti dat, ale nemohou sami stahovat a zpracovávat transakční data. Právě to, že se vyhnou stahování transakčních dat, dělá lehké uzly lehkými a umožňuje rollupům být efektivními řešeními škálování.

Dostupnost dat je také kritickým problémem pro budoucí [„bezstavové“ (stateless)](/roadmap/statelessness) klienty Etherea, kteří nepotřebují stahovat a ukládat data o stavu, aby mohli ověřovat bloky. Bezstavoví klienti si stále musí být jisti, že data jsou _někde_ dostupná a že byla správně zpracována.

## Řešení dostupnosti dat {#data-availability-solutions}

### Vzorkování dostupnosti dat (DAS) {#data-availability-sampling}

Vzorkování dostupnosti dat (DAS) je způsob, jakým může síť zkontrolovat, zda jsou data dostupná, aniž by to příliš zatěžovalo jakýkoli jednotlivý uzel. Každý uzel (včetně uzlů, které neprovádějí staking) stáhne malou, náhodně vybranou podmnožinu celkových dat. Úspěšné stažení vzorků s vysokou jistotou potvrzuje, že jsou dostupná všechna data. To spoléhá na výmazové kódování dat, které rozšiřuje danou datovou sadu o redundantní informace (to se provádí tak, že se na data aplikuje funkce známá jako _polynom_ a tento polynom se vyhodnotí v dalších bodech). To umožňuje v případě potřeby obnovit původní data z redundantních dat. Důsledkem tohoto vytváření dat je, že pokud _jakákoli_ část původních dat není dostupná, bude chybět _polovina_ rozšířených dat! Množství vzorků dat stahovaných každým uzlem lze vyladit tak, aby bylo _extrémně_ pravděpodobné, že alespoň jeden z fragmentů dat vzorkovaných každým klientem bude chybět, _pokud_ je skutečně dostupná méně než polovina dat.

DAS se bude používat k zajištění toho, aby operátoři rollupů zpřístupnili svá transakční data po implementaci [plného dankshardingu](/roadmap/danksharding/#what-is-danksharding). Uzly Etherea budou náhodně vzorkovat transakční data poskytovaná v blobech pomocí výše vysvětleného schématu redundance, aby se zajistilo, že všechna data existují. Stejnou techniku by bylo možné použít také k zajištění toho, aby producenti bloků zpřístupnili všechna svá data pro zabezpečení lehkých klientů. Podobně by v rámci [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs) byl pouze tvůrce bloku povinen zpracovat celý blok – ostatní validátory by prováděly ověření pomocí vzorkování dostupnosti dat.

### Výbory pro dostupnost dat {#data-availability-committees}

Výbory pro dostupnost dat (DAC) jsou důvěryhodné strany, které poskytují nebo potvrzují dostupnost dat. DAC lze použít místo DAS [nebo v kombinaci s ním](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS). Bezpečnostní záruky, které výbory přinášejí, závisí na konkrétním nastavení. Ethereum například používá náhodně vzorkované podmnožiny validátorů k potvrzení dostupnosti dat pro lehké uzly.

DAC používají také některá validia. DAC je důvěryhodná sada uzlů, která ukládá kopie dat offline. DAC je povinen zpřístupnit data v případě sporu. Členové DAC také publikují onchain potvrzení, aby dokázali, že uvedená data jsou skutečně dostupná. Některá validia nahrazují DAC systémem validátorů na bázi důkazu podílem (PoS). Zde se kdokoli může stát validátorem a ukládat data offchain. Musí však poskytnout „kauci“, která je uložena v chytrém kontraktu. V případě škodlivého chování, jako je například zadržování dat validátorem, může být kauce penalizována. Výbory pro dostupnost dat založené na důkazu podílem jsou podstatně bezpečnější než běžné DAC, protože přímo motivují k poctivému chování.

## Dostupnost dat a lehké uzly {#data-availability-and-light-nodes}

[Lehké uzly](/developers/docs/nodes-and-clients/light-clients) potřebují ověřit správnost hlaviček bloků, které obdrží, aniž by stahovaly data bloku. Daní za tuto lehkost je nemožnost nezávisle ověřit hlavičky bloků lokálním opětovným provedením transakcí tak, jak to dělají plné uzly.

Lehké uzly Etherea důvěřují náhodným sadám 512 validátorů, kteří byli přiděleni do _synchronizační komise_. Synchronizační komise funguje jako DAC, který pomocí kryptografického podpisu signalizuje lehkým klientům, že data v hlavičce jsou správná. Každý den se synchronizační komise obnovuje. Každá hlavička bloku upozorňuje lehké uzly na to, od kterých validátorů mají očekávat podepsání _dalšího_ bloku, takže je nelze oklamat, aby důvěřovaly škodlivé skupině předstírající, že je skutečnou synchronizační komisí.

Co se však stane, pokud se útočníkovi nějakým způsobem _podaří_ předat lehkým klientům škodlivou hlavičku bloku a přesvědčit je, že byla podepsána poctivou synchronizační komisí? V takovém případě by útočník mohl zahrnout neplatné transakce a lehký klient by je slepě přijal, protože nezávisle nekontroluje všechny změny stavu shrnuté v hlavičce bloku. K ochraně proti tomu by lehký klient mohl použít důkazy o podvodu.

Tyto důkazy o podvodu fungují tak, že plný uzel, který vidí neplatný přechod stavu šířící se sítí, by mohl rychle vygenerovat malý kousek dat prokazující, že navrhovaný přechod stavu nemohl vzejít z dané sady transakcí, a odeslat tato data ostatním uzlům. Lehké uzly by mohly tyto důkazy o podvodu zachytit a použít je k zahození špatných hlaviček bloků, čímž by zajistily, že zůstanou na stejném poctivém řetězci jako plné uzly.

To spoléhá na to, že plné uzly mají přístup k úplným transakčním datům. Útočník, který odešle špatnou hlavičku bloku a zároveň nezpřístupní transakční data, by mohl zabránit plným uzlům ve generování důkazů o podvodu. Plné uzly by sice mohly signalizovat varování před špatným blokem, ale nemohly by své varování podložit důkazem, protože data nebyla zpřístupněna, aby z nich bylo možné důkaz vygenerovat!

Řešením tohoto problému s dostupností dat je DAS. Lehké uzly stahují velmi malé náhodné kousky úplných dat o stavu a používají tyto vzorky k ověření, že je dostupná celá datová sada. Skutečnou pravděpodobnost nesprávného předpokladu plné dostupnosti dat po stažení N náhodných kousků lze vypočítat ([pro 100 kousků je šance 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), tj. neuvěřitelně nepravděpodobné).

I v tomto scénáři by útoky, které zadrží jen několik bajtů, mohly reálně uniknout pozornosti klientů provádějících náhodné požadavky na data. Výmazové kódování to řeší rekonstrukcí malých chybějících kousků dat, které lze použít ke kontrole navrhovaných změn stavu. Pomocí rekonstruovaných dat by pak mohl být vytvořen důkaz o podvodu, který by zabránil lehkým uzlům v přijímání špatných hlaviček.

**Poznámka:** DAS a důkazy o podvodu zatím nebyly implementovány pro lehké klienty Etherea na bázi důkazu podílem (PoS), ale jsou v plánu, s největší pravděpodobností ve formě důkazů založených na ZK-SNARK. Dnešní lehcí klienti spoléhají na formu DAC: ověřují identity synchronizační komise a poté důvěřují podepsaným hlavičkám bloků, které obdrží.

## Dostupnost dat a rollupy na vrstvě 2 {#data-availability-and-layer-2-rollups}

[Řešení škálování na vrstvě 2 (l2)](/layer-2/), jako jsou [rollupy](/glossary/#rollups), snižují transakční náklady a zvyšují propustnost Etherea zpracováním transakcí offchain. Transakce rollupů jsou komprimovány a odesílány do Etherea v dávkách. Dávky představují tisíce jednotlivých offchain transakcí v jediné transakci na Ethereu. To snižuje přetížení základní vrstvy a snižuje poplatky pro uživatele.

„Souhrnným“ transakcím odeslaným do Etherea je však možné důvěřovat pouze tehdy, pokud lze navrhovanou změnu stavu nezávisle ověřit a potvrdit, že je výsledkem aplikace všech jednotlivých offchain transakcí. Pokud operátoři rollupů nezpřístupní transakční data pro toto ověření, mohli by do Etherea odeslat nesprávná data.

[Optimistické rollupy](/developers/docs/scaling/optimistic-rollups/) odesílají komprimovaná transakční data do Etherea a čekají určitou dobu (obvykle 7 dní), aby umožnily nezávislým ověřovatelům data zkontrolovat. Pokud někdo zjistí problém, může vygenerovat důkaz o podvodu a použít jej k napadnutí rollupu. To by způsobilo vrácení řetězce zpět a vynechání neplatného bloku. To je možné pouze v případě, že jsou data dostupná. V současné době existují dva způsoby, jak optimistické rollupy odesílají transakční data na vrstvu 1 (l1). Některé rollupy zpřístupňují data trvale jako `CALLDATA`, která žijí trvale onchain. S implementací EIP-4844 odesílají některé rollupy svá transakční data raději do levnějšího úložiště blobů. Nejedná se o trvalé úložiště. Nezávislí ověřovatelé se musí dotazovat na bloby a vznést své námitky do ~18 dnů, než budou data z vrstvy 1 Etherea smazána. Dostupnost dat je protokolem Etherea zaručena pouze pro toto krátké pevné okno. Poté se stává odpovědností jiných subjektů v ekosystému Etherea. Jakýkoli uzel může ověřit dostupnost dat pomocí DAS, tj. stažením malých, náhodných vzorků dat blobu.

[Rollupy s nulovým vědomím (ZK rollupy)](/developers/docs/scaling/zk-rollups) nepotřebují odesílat transakční data, protože [důkazy platnosti s nulovou znalostí](/glossary/#zk-proof) zaručují správnost přechodů stavu. Dostupnost dat je však stále problémem, protože nemůžeme zaručit funkčnost ZK-rollupu (nebo s ním interagovat) bez přístupu k jeho datům o stavu. Uživatelé například nemohou znát své zůstatky, pokud operátor zadržuje podrobnosti o stavu rollupu. Také nemohou provádět aktualizace stavu pomocí informací obsažených v nově přidaném bloku.

## Dostupnost dat vs. získatelnost dat {#data-availability-vs-data-retrievability}

Dostupnost dat se liší od získatelnosti dat (data retrievability). Dostupnost dat je záruka, že plné uzly měly přístup k úplné sadě transakcí spojených s konkrétním blokem a mohly ji ověřit. Z toho nutně nevyplývá, že data jsou přístupná navždy.

Získatelnost dat je schopnost uzlů získat _historické informace_ z blockchainu. Tato historická data nejsou potřebná pro ověřování nových bloků, jsou vyžadována pouze pro synchronizaci plných uzlů od genesis bloku nebo pro obsluhu specifických historických požadavků.

Jádro protokolu Etherea se primárně zabývá dostupností dat, nikoli získatelností dat. Získatelnost dat může být zajištěna malou populací archivních uzlů provozovaných třetími stranami, nebo může být distribuována napříč sítí pomocí decentralizovaného úložiště souborů, jako je [Portal Network](https://www.ethportal.net/).

## Další čtení {#further-reading}

- [Co to sakra je dostupnost dat?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Co je dostupnost dat?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Úvod do kontrol dostupnosti dat](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Vysvětlení návrhu sharding + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Poznámka k dostupnosti dat a výmazovému kódování](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Výbory pro dostupnost dat.](https://medium.com/starkware/data-availability-e5564c416424)
- [Výbory pro dostupnost dat na bázi důkazu podílem.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Řešení problému získatelnosti dat](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Dostupnost dat aneb: Jak se rollupy naučily nedělat si starosti a milovat Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Zvýšení nákladů na data volání (calldata)](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)