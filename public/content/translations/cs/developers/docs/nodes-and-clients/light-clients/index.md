---
title: "Lehcí klienti"
description: "Úvod do lehkých klientů Etherea."
lang: cs
---

Provozování plného uzlu je způsob interakce s [Ethereem](/), který je nejvíce soukromý, decentralizovaný, odolný vůči cenzuře a nevyžadující důvěru. S plným uzlem si udržujete vlastní kopii blockchainu, na kterou se můžete okamžitě dotazovat, a získáváte přímý přístup k peer-to-peer síti Etherea. Provozování plného uzlu však vyžaduje značné množství paměti, úložiště a výkonu procesoru. To znamená, že není reálné, aby každý provozoval svůj vlastní uzel. V roadmapě Etherea existuje několik řešení tohoto problému, včetně bezstavovosti, ale jejich implementace je ještě několik let vzdálená. Krátkodobým řešením je obětovat některé výhody provozování plného uzlu výměnou za velká zlepšení výkonu, která umožňují běh uzlů s velmi nízkými hardwarovými požadavky. Uzly, které dělají tento kompromis, jsou známé jako lehké uzly.

## Co je to lehký klient {#what-is-a-light-client}

Lehký uzel je uzel, na kterém běží software lehkého klienta. Místo toho, aby uchovávaly lokální kopie dat blockchainu a nezávisle ověřovaly všechny změny, vyžadují potřebná data od nějakého poskytovatele. Poskytovatelem může být přímé připojení k plnému uzlu nebo nějaký centralizovaný RPC server. Data jsou následně ověřena lehkým uzlem, což mu umožňuje držet krok s vrcholem řetězce. Lehký uzel zpracovává pouze hlavičky bloků a jen občas stahuje samotný obsah bloku. Uzly se mohou lišit ve své „lehkosti“ v závislosti na kombinaci softwaru lehkého a plného klienta, který provozují. Například nejlehčí konfigurací by bylo provozovat lehkého exekučního klienta a lehkého konsensuálního klienta. Je také pravděpodobné, že mnoho uzlů se rozhodne provozovat lehké konsensuální klienty s plnými exekučními klienty, nebo naopak.

## Jak fungují lehcí klienti? {#how-do-light-clients-work}

Když Ethereum začalo používat mechanismus konsensu založený na důkazu podílem (PoS), byla zavedena nová infrastruktura speciálně pro podporu lehkých klientů. Funguje to tak, že se každých 1,1 dne náhodně vybere podmnožina 512 validátorů, kteří fungují jako **synchronizační komise**. Synchronizační komise podepisuje hlavičku nedávných bloků. Každá hlavička bloku obsahuje agregovaný podpis validátorů v synchronizační komisi a „bitové pole“, které ukazuje, kteří validátoři podepsali a kteří ne. Každá hlavička také obsahuje seznam validátorů, u kterých se očekává, že se zúčastní podepisování dalšího bloku. To znamená, že lehký klient může rychle zjistit, že synchronizační komise schválila data, která obdrží, a může také zkontrolovat, zda je synchronizační komise pravá, porovnáním té, kterou obdrží, s tou, kterou měl očekávat podle předchozího bloku. Tímto způsobem může lehký klient neustále aktualizovat své znalosti o nejnovějším bloku Etherea, aniž by musel stahovat samotný blok, ale pouze hlavičku, která obsahuje souhrnné informace.

Na exekuční vrstvě neexistuje žádná jednotná specifikace pro lehkého exekučního klienta. Rozsah lehkého exekučního klienta se může lišit od „lehkého režimu“ plného exekučního klienta, který má všechny funkce EVM a sítě plného uzlu, ale pouze ověřuje hlavičky bloků bez stahování souvisejících dat, až po více ořezaného klienta, který při interakci s Ethereem silně spoléhá na přeposílání požadavků poskytovateli RPC.

## Proč jsou lehcí klienti důležití? {#why-are-light-clients-important}

Na lehkých klientech záleží, protože umožňují uživatelům ověřovat příchozí data, místo aby slepě důvěřovali, že jejich poskytovatel dat je správný a čestný, a to při využití jen nepatrného zlomku výpočetních zdrojů plného uzlu. Data, která lehcí klienti obdrží, lze zkontrolovat proti hlavičkám bloků, o kterých vědí, že byly podepsány alespoň 2/3 náhodné sady 512 validátorů Etherea. To je velmi silný důkaz, že data jsou správná.

Lehký klient využívá pouze nepatrné množství výpočetního výkonu, paměti a úložiště, takže jej lze spustit na mobilním telefonu, vložit do aplikace nebo jako součást prohlížeče. Lehcí klienti představují způsob, jak učinit přístup k Ethereu s minimalizovanou důvěrou stejně bezproblémový jako důvěřovat poskytovateli třetí strany.

Vezměme si jednoduchý příklad. Představte si, že chcete zkontrolovat zůstatek na svém účtu. K tomu musíte odeslat požadavek na uzel Etherea. Tento uzel zkontroluje svou lokální kopii stavu Etherea ohledně vašeho zůstatku a vrátí vám jej. Pokud nemáte přímý přístup k uzlu, existují centralizovaní operátoři, kteří tato data poskytují jako službu. Můžete jim poslat požadavek, oni zkontrolují svůj uzel a pošlou vám výsledek zpět. Problém je v tom, že pak musíte důvěřovat poskytovateli, že vám dává správné informace. Nikdy nemůžete s jistotou vědět, že jsou informace správné, pokud si je nemůžete sami ověřit.

Lehký klient tento problém řeší. Stále požadujete data od nějakého externího poskytovatele, ale když data obdržíte zpět, přicházejí s důkazem, který může váš lehký uzel zkontrolovat proti informacím, které obdržel v hlavičce bloku. To znamená, že správnost vašich dat ověřuje Ethereum namísto nějakého důvěryhodného operátora.

## Jaké inovace umožňují lehcí klienti? {#what-innovations-do-light-clients-enable}

Hlavní výhodou lehkých klientů je to, že umožňují více lidem přistupovat k Ethereu nezávisle se zanedbatelnými hardwarovými požadavky a minimálním spoléháním se na třetí strany. To je dobré pro uživatele, protože si mohou ověřovat svá vlastní data, a je to dobré pro síť, protože to zvyšuje počet a rozmanitost uzlů, které ověřují řetězec.

Schopnost provozovat uzly Etherea na zařízeních s velmi malým úložištěm, pamětí a výpočetním výkonem je jednou z hlavních oblastí inovací, které lehcí klienti odemykají. Zatímco dnes uzly Etherea vyžadují spoustu výpočetních zdrojů, lehcí klienti by mohli být zabudováni do prohlížečů, běžet na mobilních telefonech a možná i na menších zařízeních, jako jsou chytré hodinky. To znamená, že peněženky Etherea se zabudovanými klienty by mohly běžet na mobilním telefonu. To znamená, že mobilní peněženky by mohly být mnohem více decentralizované, protože by nemusely důvěřovat centralizovaným poskytovatelům dat ohledně svých dat.

Rozšířením tohoto konceptu je podpora zařízení **internetu věcí (IoT)**. Lehký klient by mohl být použit k rychlému prokázání vlastnictví nějakého zůstatku tokenů nebo NFT se všemi bezpečnostními zárukami poskytovanými synchronizačními komisemi, což by spustilo nějakou akci v síti IoT. Představte si [půjčovnu kol](https://youtu.be/ZHNrAXf3RDE?t=929), která používá aplikaci se zabudovaným lehkým klientem k rychlému ověření, že vlastníte NFT půjčovny, a pokud ano, odemkne vám kolo, abyste na něm mohli odjet!

Rollupy Etherea by také těžily z lehkých klientů. Jedním z velkých problémů pro rollupy byly hacky zaměřené na mosty, které umožňují převod prostředků z Ethereum Mainnetu na rollup. Jednou ze zranitelností jsou orákula, která rollupy používají k detekci toho, že uživatel provedl vklad do mostu. Pokud orákulum dodá špatná data, mohlo by rollup oklamat, aby si myslel, že došlo k vkladu do mostu, a nesprávně uvolnit prostředky. Lehký klient zabudovaný v rollupu by mohl být použit k ochraně před zkorumpovanými orákuly, protože vklad do mostu by mohl přijít s důkazem, který může rollup ověřit před uvolněním jakýchkoli tokenů. Stejný koncept by mohl být aplikován i na další meziřetězcové mosty.

Lehcí klienti by také mohli být použiti k vylepšení peněženek Etherea. Místo důvěřování datům poskytnutým od poskytovatele RPC by vaše peněženka mohla přímo ověřovat data, která jsou vám předkládána, pomocí zabudovaného lehkého klienta. To by vaší peněžence přidalo na bezpečnosti. Pokud by váš poskytovatel RPC nebyl čestný a poskytl vám nesprávná data, zabudovaný lehký klient by vám to mohl říct!

## Jaký je současný stav vývoje lehkých klientů? {#current-state-of-development}

Ve vývoji je několik lehkých klientů, včetně exekučních, konsensuálních a kombinovaných exekučních/konsensuálních lehkých klientů. Toto jsou implementace lehkých klientů, o kterých víme v době psaní této stránky:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): konsensuální lehký klient v TypeScriptu
- [Helios](https://github.com/a16z/helios): kombinovaný exekuční a konsensuální lehký klient v Rustu
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): lehký režim pro exekučního klienta (ve vývoji) v Go
- [Nimbus](https://nimbus.guide/el-light-client.html): konsensuální lehký klient v Nimu

Pokud víme, žádný z nich zatím není považován za připravený pro produkční nasazení.

Probíhá také spousta práce na zlepšení způsobů, jakými mohou lehcí klienti přistupovat k datům Etherea. V současné době se lehcí klienti spoléhají na požadavky RPC na plné uzly pomocí modelu klient/server, ale v budoucnu by data mohla být vyžadována decentralizovanějším způsobem pomocí vyhrazené sítě, jako je [Portal Network](https://www.ethportal.net/), která by mohla data lehkým klientům poskytovat pomocí peer-to-peer gossip protokolu.

Další položky [roadmapy](/roadmap/), jako jsou [Verkle stromy](/roadmap/verkle-trees/) a [bezstavovost](/roadmap/statelessness/), nakonec přinesou bezpečnostní záruky lehkých klientů na úroveň plných klientů.

## Další čtení {#further-reading}

- [Zsolt Felfodhi o lehkých klientech Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling o síťování lehkých klientů](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling o lehkých klientech po Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Klikatá cesta k funkčním lehkým klientům](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)