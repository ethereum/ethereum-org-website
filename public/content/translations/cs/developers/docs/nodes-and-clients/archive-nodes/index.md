---
title: "Archivní uzel Etherea"
description: "Přehled archivních uzlů"
lang: cs
sidebarDepth: 2
---

Archivní uzel je instance klienta [Etherea](/) nakonfigurovaná tak, aby vytvářela archiv všech historických stavů. Je to užitečný nástroj pro určité případy použití, ale jeho provoz může být složitější než u plného uzlu.

## Předpoklady {#prerequisites}

Měli byste rozumět konceptu [uzlu Etherea](/developers/docs/nodes-and-clients/), [jeho architektuře](/developers/docs/nodes-and-clients/node-architecture/), [strategiím synchronizace](/developers/docs/nodes-and-clients/#sync-modes) a postupům při jejich [provozování](/developers/docs/nodes-and-clients/run-a-node/) a [používání](/developers/docs/apis/json-rpc/).

## Co je to archivní uzel {#what-is-an-archive-node}

Abychom pochopili důležitost archivního uzlu, pojďme si ujasnit koncept „stavu“. Ethereum lze označit jako _stavový automat založený na transakcích_. Skládá se z účtů a aplikací provádějících transakce, které mění jejich stav. Globální data s informacemi o každém účtu a kontraktu jsou uložena v trie databázi zvané stav. To zpracovává klient exekuční vrstvy (EL) a zahrnuje to:

- Zůstatky na účtech a nonce
- Kód a úložiště kontraktů
- Data související s konsensem, např. kontrakt pro stakingový vklad

Aby mohli klienti Etherea komunikovat se sítí, ověřovat a vytvářet nové bloky, musí držet krok s nejnovějšími změnami (vrcholem řetězce), a tedy i s aktuálním stavem. Klient exekuční vrstvy nakonfigurovaný jako plný uzel ověřuje a sleduje nejnovější stav sítě, ale do mezipaměti ukládá pouze několik minulých stavů, např. stav spojený s posledními 128 bloky, aby mohl zvládat reorganizace řetězce a poskytovat rychlý přístup k nedávným datům. Nedávný stav je to, co všichni klienti potřebují k ověřování příchozích transakcí a používání sítě.

Stav si můžete představit jako okamžitý snímek sítě v daném bloku a archiv jako přehrávání historie.

Historické stavy lze bezpečně prořezávat, protože nejsou pro fungování sítě nezbytné a pro klienta by bylo zbytečně redundantní uchovávat všechna neaktuální data. Stavy, které existovaly před nějakým nedávným blokem (např. 128 bloků před vrcholem), jsou efektivně zahozeny. Plné uzly uchovávají pouze historická data blockchainu (bloky a transakce) a občasné historické snímky, které mohou na vyžádání použít k regeneraci starších stavů. Dělají to opětovným provedením minulých transakcí v EVM, což může být výpočetně náročné, když je požadovaný stav daleko od nejbližšího snímku.

To však znamená, že přístup k historickému stavu na plném uzlu spotřebovává spoustu výpočetního výkonu. Klient by mohl potřebovat provést všechny minulé transakce a vypočítat jeden historický stav od genesis. Archivní uzly to řeší tak, že ukládají nejen nejnovější stavy, ale každý historický stav vytvořený po každém bloku. V podstatě jde o kompromis s většími požadavky na místo na disku.

Je důležité si uvědomit, že síť nezávisí na archivních uzlech, aby uchovávaly a poskytovaly všechna historická data. Jak bylo zmíněno výše, všechny historické mezistavy lze odvodit na plném uzlu. Transakce jsou ukládány jakýmkoli plným uzlem (v současnosti méně než 400 GB) a lze je přehrát pro sestavení celého archivu.

### Případy použití {#use-cases}

Běžné používání Etherea, jako je odesílání transakcí, nasazování kontraktů, ověřování konsensu atd., nevyžaduje přístup k historickým stavům. Uživatelé pro standardní interakci se sítí archivní uzel nikdy nepotřebují.

Hlavní výhodou archivu stavů je rychlý přístup k dotazům na historické stavy. Archivní uzel by například okamžitě vrátil výsledky jako:

- _Jaký byl zůstatek ETH na účtu 0x1337... v bloku 15537393?_
- _Jaký je zůstatek tokenu 0x v kontraktu 0x v bloku 1920000?_

Jak bylo vysvětleno výše, plný uzel by musel tato data generovat pomocí provádění v EVM, což využívá CPU a zabere to nějaký čas. Archivní uzly k nim přistupují na disku a okamžitě poskytují odpovědi. To je užitečná funkce pro určité části infrastruktury, například:

- Poskytovatelé služeb, jako jsou prohlížeče bloků
- Výzkumníci
- Bezpečnostní analytici
- Vývojáři decentralizovaných aplikací (dapp)
- Audit a dodržování předpisů

Existují různé bezplatné [služby](/developers/docs/nodes-and-clients/nodes-as-a-service/), které také umožňují přístup k historickým datům. Vzhledem k tomu, že provoz archivního uzlu je náročnější, je tento přístup většinou omezený a funguje pouze pro občasné použití. Pokud váš projekt vyžaduje neustálý přístup k historickým datům, měli byste zvážit provozování vlastního uzlu.

## Implementace a použití {#implementations-and-usage}

Archivní uzel v tomto kontextu znamená data poskytovaná klienty exekuční vrstvy orientovanými na uživatele, protože spravují databázi stavů a poskytují koncové body JSON-RPC. Možnosti konfigurace, doba synchronizace a velikost databáze se mohou u jednotlivých klientů lišit. Podrobnosti naleznete v dokumentaci poskytované vaším klientem.

Před spuštěním vlastního archivního uzlu se seznamte s rozdíly mezi klienty a zejména s různými [hardwarovými požadavky](/developers/docs/nodes-and-clients/run-a-node/#requirements). Většina klientů není pro tuto funkci optimalizována a jejich archivy vyžadují více než 12 TB prostoru. Naproti tomu implementace jako Erigon dokážou uložit stejná data na méně než 3 TB, což z nich dělá nejefektivnější způsob provozování archivního uzlu.

## Doporučené postupy {#recommended-practices}

Kromě obecných [doporučení pro provozování uzlu](/developers/docs/nodes-and-clients/run-a-node/) může být archivní uzel náročnější na hardware a údržbu. Vzhledem ke [klíčovým vlastnostem](https://github.com/ledgerwatch/erigon#key-features) Erigonu je nejpraktičtějším přístupem použití implementace klienta [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware {#hardware}

Vždy se ujistěte, že jste si ověřili hardwarové požadavky pro daný režim v dokumentaci klienta.
Největším požadavkem pro archivní uzly je místo na disku. V závislosti na klientovi se pohybuje od 3 TB do 12 TB. I když by HDD mohl být považován za lepší řešení pro velké množství dat, jeho synchronizace a neustálá aktualizace vrcholu řetězce bude vyžadovat SSD disky. Disky [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) jsou dostatečně dobré, ale měly by být spolehlivé kvality, alespoň [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Disky lze namontovat do stolního počítače nebo serveru s dostatkem slotů. Taková vyhrazená zařízení jsou ideální pro provozování uzlu s vysokou dostupností. Je naprosto možné jej provozovat na notebooku, ale přenositelnost bude spojena s dodatečnými náklady.

Všechna data se musí vejít na jeden svazek, proto musí být disky spojeny, např. pomocí [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) nebo LVM. Možná by také stálo za zvážení použití [ZFS](https://en.wikipedia.org/wiki/ZFS), protože podporuje „Copy-on-write“, což zajišťuje, že data jsou správně zapsána na disk bez jakýchkoli chyb na nízké úrovni.

Pro větší stabilitu a bezpečnost při prevenci náhodného poškození databáze, zejména v profesionálním nastavení, zvažte použití [paměti ECC](https://en.wikipedia.org/wiki/ECC_memory), pokud ji váš systém podporuje. Velikost paměti RAM se obecně doporučuje stejná jako u plného uzlu, ale více paměti RAM může pomoci urychlit synchronizaci.

Během počáteční synchronizace klienti v archivním režimu provedou každou transakci od genesis. Rychlost provádění je většinou omezena procesorem (CPU), takže rychlejší CPU může pomoci zkrátit dobu počáteční synchronizace. Na průměrném spotřebitelském počítači může počáteční synchronizace trvat až měsíc.

## Další čtení {#further-reading}

- [Plný uzel Etherea vs. archivní uzel](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, září 2022_
- [Budování vlastního archivního uzlu Etherea](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, srpen 2021_
- [Jak nastavit Erigon, RPC Erigonu a TrueBlocks (scrape a API) jako služby](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aktualizováno v září 2022_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Provozování uzlu](/developers/docs/nodes-and-clients/run-a-node/)