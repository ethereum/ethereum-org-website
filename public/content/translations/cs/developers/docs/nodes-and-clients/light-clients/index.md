---
title: "Jednoduché klienty"
description: "Úvod do lehkých klientů Etherea."
lang: cs
---

Provozování plného uzlu je způsob interakce s Ethereem, který nevyžaduje důvěru, je soukromý, decentralizovaný a odolný vůči cenzuře. S plným uzlem si uchováváte vlastní kopii blockchainu, na kterou se můžete okamžitě dotazovat, a získáte přímý přístup do peer-to-peer sítě Etherea. Provozování plného uzlu však vyžaduje značné množství paměti, úložiště a CPU. To znamená, že není pro každého proveditelné, aby provozoval svůj vlastní uzel. V plánu Etherea existuje několik řešení, včetně bezstavovosti, ale od jejich implementace nás dělí několik let. Krátkodobým řešením je vyměnit některé výhody provozování plného uzlu za velké zlepšení výkonu, které umožňuje provozovat uzly s velmi nízkými hardwarovými nároky. Uzly, které dělají tento kompromis, jsou známé jako lehké uzly.

## Co je to lehký klient {#what-is-a-light-client}

Lehký uzel je uzel, který provozuje software lehkého klienta. Místo toho, aby si uchovávaly místní kopie dat blockchainu a nezávisle ověřovaly všechny změny, požadují potřebná data od poskytovatele. Poskytovatelem může být přímé připojení k plnému uzlu nebo centralizovaný RPC server. Data jsou poté ověřena lehkým uzlem, což mu umožňuje držet krok s čelem řetězce. Lehký uzel zpracovává pouze hlavičky bloků a jen příležitostně stahuje skutečný obsah bloků. Uzly se mohou lišit ve své „lehkosti“ v závislosti na kombinacích softwaru lehkých a plných klientů, které provozují. Nejlehčí konfigurací by bylo například spuštění lehkého exekučního klienta a lehkého konsensuálního klienta. Je také pravděpodobné, že mnoho uzlů se rozhodne provozovat lehké konsensuální klienty s plnými exekučními klienty, nebo naopak.

## Jak fungují lehcí klienti? {#how-do-light-clients-work}

Když Ethereum začalo používat mechanismus konsensu založený na důkazu podílem, byla zavedena nová infrastruktura speciálně pro podporu lehkých klientů. Funguje to tak, že se každých 1,1 dne náhodně vybere podmnožina 512 validátorů, kteří fungují jako **synchronizační výbor**. Synchronizační výbor podepisuje hlavičku posledních bloků. Každá hlavička bloku obsahuje agregovaný podpis validátorů v synchronizačním výboru a „bitové pole“, které ukazuje, kteří validátoři podepsali a kteří ne. Každá hlavička také obsahuje seznam validátorů, od kterých se očekává, že se zúčastní podepisování dalšího bloku. To znamená, že lehký klient může rychle zjistit, že synchronizační výbor podepsal data, která obdrží, a může také zkontrolovat, že synchronizační výbor je ten pravý, porovnáním toho, který obdrží, s tím, který mu bylo řečeno očekávat v předchozím bloku. Tímto způsobem si může lehký klient udržovat aktuální znalosti o nejnovějším bloku Etherea, aniž by stahoval samotný blok, ale pouze hlavičku, která obsahuje souhrnné informace.

Na exekuční vrstvě neexistuje jednotná specifikace pro lehkého exekučního klienta. Rozsah lehkého exekučního klienta se může lišit od „lehkého režimu“ plného exekučního klienta, který má všechny funkce EVM a síťové funkce plného uzlu, ale ověřuje pouze hlavičky bloků bez stahování souvisejících dat, nebo to může být více osekaný klient, který se silně spoléhá na předávání požadavků poskytovateli RPC pro interakci s Ethereem.

## Proč jsou lehcí klienti důležití? {#why-are-light-clients-important}

Lehcí klienti jsou důležití, protože umožňují uživatelům ověřovat příchozí data, místo aby slepě důvěřovali, že jejich poskytovatel dat je správný a poctivý, a přitom využívají jen malý zlomek výpočetních zdrojů plného uzlu. Data, která lehcí klienti obdrží, lze zkontrolovat vůči hlavičkám bloků, o kterých vědí, že byly podepsány alespoň 2/3 náhodné sady 512 validátorů Etherea. To je velmi silný důkaz, že data jsou správná.

Lehký klient využívá jen malé množství výpočetního výkonu, paměti a úložiště, takže ho lze spustit na mobilním telefonu, vložit do aplikace nebo jako součást prohlížeče. Lehcí klienti jsou způsob, jak učinit přístup k Ethereu s minimalizovanou důvěrou stejně bezproblémovým jako důvěřování poskytovateli třetí strany.

Uveďme si jednoduchý příklad. Představte si, že si chcete zkontrolovat zůstatek na účtu. K tomu musíte odeslat požadavek na uzel Etherea. Tento uzel zkontroluje svou místní kopii stavu Etherea pro váš zůstatek a vrátí vám ho. Pokud nemáte přímý přístup k uzlu, existují centralizovaní operátoři, kteří tato data poskytují jako službu. Můžete jim poslat požadavek, oni zkontrolují svůj uzel a pošlou vám výsledek zpět. Problém je v tom, že pak musíte důvěřovat poskytovateli, že vám poskytuje správné informace. Nikdy si nemůžete být jisti, že jsou informace správné, pokud si je nemůžete sami ověřit.

Lehký klient tento problém řeší. Stále si vyžadujete data od externího poskytovatele, ale když data obdržíte zpět, přijdou s důkazem, který si váš lehký uzel může zkontrolovat vůči informacím, které obdržel v hlavičce bloku. To znamená, že správnost vašich dat ověřuje Ethereum namísto nějakého důvěryhodného operátora.

## Jaké inovace lehcí klienti umožňují? {#what-innovations-do-light-clients-enable}

Hlavním přínosem lehkých klientů je umožnit více lidem nezávislý přístup k Ethereu se zanedbatelnými hardwarovými nároky a minimální závislostí na třetích stranách. To je dobré pro uživatele, protože si mohou ověřit svá vlastní data, a je to dobré pro síť, protože to zvyšuje počet a rozmanitost uzlů, které ověřují řetězec.

Schopnost provozovat uzly Etherea na zařízeních s velmi malým úložištěm, pamětí a výpočetním výkonem je jednou z hlavních oblastí inovací, které lehcí klienti odemykají. Zatímco dnes uzly Etherea vyžadují mnoho výpočetních zdrojů, lehcí klienti by mohli být vloženi do prohlížečů, spuštěni na mobilních telefonech a možná i na menších zařízeních, jako jsou chytré hodinky. To znamená, že peněženky Ethereum s vestavěnými klienty by mohly běžet na mobilním telefonu. To znamená, že mobilní peněženky by mohly být mnohem více decentralizované, protože by nemusely důvěřovat centralizovaným poskytovatelům dat pro svá data.

Rozšířením toho je podpora zařízení **internetu věcí (IoT)**. Lehký klient by mohl být použit k rychlému prokázání vlastnictví nějakého zůstatku tokenu nebo NFT, se všemi bezpečnostními zárukami poskytovanými synchronizačními výbory, což by vyvolalo nějakou akci v síti IoT. Představte si [půjčovnu kol](https://youtu.be/ZHNrAXf3RDE?t=929), která používá aplikaci s vestavěným lehkým klientem k rychlému ověření, že vlastníte NFT půjčovny, a pokud ano, odemkne vám kolo, na kterém můžete odjet!

Z lehkých klientů by také těžily rollupy Etherea. Jedním z velkých problémů pro rollupy byly hackerské útoky zaměřené na přemostění, která umožňují převod prostředků z hlavní sítě Etherea na rollup. Jednou ze zranitelností jsou orákula, která rollupy používají k detekci, že uživatel provedl vklad na přemostění. Pokud orákulum dodá špatná data, mohlo by přimět rollup k tomu, aby si myslel, že došlo k vkladu na přemostění, a nesprávně uvolnil prostředky. Lehký klient zabudovaný v rollupu by mohl být použit k ochraně proti poškozeným orákulům, protože vklad do přemostění by mohl přijít s důkazem, který si rollup může ověřit před uvolněním jakýchkoli tokenů. Stejný koncept by se dal použít i na jiná meziřetězcová přemostění.

Lehké klienty by bylo možné použít také k vylepšení peněženek Ethereum. Místo důvěřování datům poskytovaným poskytovatelem RPC by si vaše peněženka mohla přímo ověřit data, která vám jsou předkládána, pomocí vestavěného lehkého klienta. To by zvýšilo bezpečnost vaší peněženky. Pokud by byl váš poskytovatel RPC nečestný a poskytl vám nesprávná data, vestavěný lehký klient by vás na to mohl upozornit!

## Jaký je současný stav vývoje lehkých klientů? {#current-state-of-development}

Ve vývoji je několik lehkých klientů, včetně exekučních, konsensuálních a kombinovaných exekučních/konsensuálních lehkých klientů. Toto jsou implementace lehkých klientů, o kterých víme v době psaní této stránky:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): konsensuální lehký klient v TypeScriptu
- [Helios](https://github.com/a16z/helios): kombinovaný exekuční a konsensuální lehký klient v Rustu
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): lehký režim pro exekučního klienta (ve vývoji) v Go
- [Nimbus](https://nimbus.guide/el-light-client.html): konsensuální lehký klient v Nimu

Podle našich informací žádný z nich zatím není považován za připravený pro produkční nasazení.

Probíhá také mnoho práce na zlepšení způsobů, jakými mohou lehcí klienti přistupovat k datům Etherea. V současné době se lehcí klienti spoléhají na RPC požadavky na plné uzly pomocí modelu klient/server, ale v budoucnu by data mohla být požadována decentralizovanějším způsobem pomocí vyhrazené sítě, jako je [Portal Network](https://www.ethportal.net/), která by mohla data lehkým klientům poskytovat pomocí protokolu peer-to-peer gossip.

Další položky [plánu](/roadmap/), jako jsou [Verkle stromy](/roadmap/verkle-trees/) a [bezstavovost](/roadmap/statelessness/), nakonec přinesou bezpečnostní záruky lehkých klientů na úroveň plných klientů.

## Další čtení {#further-reading}

- [Zsolt Felfodhi o lehkých klientech Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling o síťování lehkých klientů](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling o lehkých klientech po Sloučení](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Trnitá cesta k funkčním lehkým klientům](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
