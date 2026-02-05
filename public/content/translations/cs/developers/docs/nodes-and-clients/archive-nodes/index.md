---
title: Archivní uzel Etherea
description: Přehled archivních uzlů
lang: cs
sidebarDepth: 2
---

Archivní uzel je instancí klienta sítě Ethereum, který je nakonfigurován k vytvoření archivu všech historických stavů. Jedná se o užitečný nástroj pro určité případy použití, ale jeho provoz může být složitější než u plného uzlu.

## Předpoklady {#prerequisites}

Měli byste rozumět konceptu [uzlu sítě Ethereum](/developers/docs/nodes-and-clients/), [jeho architektuře](/developers/docs/nodes-and-clients/node-architecture/), [strategiím synchronizace](/developers/docs/nodes-and-clients/#sync-modes) a postupům pro jejich [provoz](/developers/docs/nodes-and-clients/run-a-node/) a [používání](/developers/docs/apis/json-rpc/).

## Co je to archivní uzel

Abychom pochopili důležitost archivního uzlu, objasněme si pojem "stav". O Ethereu lze mluvit jako o _stavovém automatu založeném na transakcích_. Skládá se z účtů a aplikací, které provádějí transakce měnící jejich stav. Globální data s informacemi o každém účtu a kontraktu jsou uložena v databázi trie nazývané stav. O to se stará klient exekuční vrstvy (EL) a zahrnuje to:

- Zůstatky na účtech a hodnoty nonce
- Kód kontraktu a úložiště
- Data související s konsensem, např. vkladový kontrakt pro uzamčení

Aby mohly interagovat se sítí, ověřovat a vytvářet nové bloky, musí klienti Etherea držet krok s nejnovějšími změnami (špičkou řetězce), a tedy i s aktuálním stavem. Klient exekuční vrstvy nakonfigurovaný jako plný uzel ověřuje a sleduje nejnovější stav sítě, ale do mezipaměti ukládá pouze několik posledních stavů, např. stav spojený s posledními 128 bloky, aby mohl zpracovávat reorganizace řetězce a poskytovat rychlý přístup k nejnovějším datům. Poslední stav je to, co všichni klienti potřebují k ověření příchozích transakcí a používání sítě.

Stav si můžete představit jako okamžitý snímek sítě v daném bloku a archiv jako přehrání historie.

Historické stavy mohou být bezpečně odstraněny, protože nejsou nutné pro fungování sítě a bylo by zbytečně redundantní, aby si klient ponechával všechna zastaralá data. Stavy, které existovaly před nějakým nedávným blokem (např. 128 bloků před špičkou), jsou v podstatě zahozeny. Plné uzly uchovávají pouze historická data blockchainu (bloky a transakce) a příležitostné historické snímky, které mohou na požádání použít k obnovení starších stavů. Dělají to tak, že znovu provádějí minulé transakce v EVM, což může být výpočetně náročné, když je požadovaný stav daleko od nejbližšího snímku.

To však znamená, že přístup k historickému stavu na plném uzlu spotřebuje mnoho výpočetního výkonu. Klient může potřebovat provést všechny minulé transakce a vypočítat jeden historický stav od geneze. Archivní uzly to řeší tím, že ukládají nejen nejnovější stavy, ale všechny historické stavy vytvořené po každém bloku. V podstatě se jedná o kompromis s většími požadavky na místo na disku.

Je důležité si uvědomit, že síť nezávisí na archivních uzlech, které by uchovávaly a poskytovaly všechna historická data. Jak již bylo zmíněno, všechny historické přechodné stavy lze odvodit na plném uzlu. Transakce jsou uloženy na každém plném uzlu (v současnosti méně než 400 GB) a lze je znovu přehrát a vytvořit tak celý archiv.

### Případy použití

Běžné používání Etherea, jako je odesílání transakcí, nasazování kontraktů, ověřování konsensu atd., nevyžaduje přístup k historickým stavům. Uživatelé nikdy nepotřebují archivní uzel pro standardní interakci se sítí.

Hlavní výhodou stavového archivu je rychlý přístup k dotazům na historické stavy. Archivní uzel by například okamžitě vrátil výsledky jako:

- _Jaký byl zůstatek ETH na účtu 0x1337... v bloku 15537393?_
- _Jaký je zůstatek tokenu 0x v kontraktu 0x v bloku 1920000?_

Jak bylo vysvětleno výše, plný uzel by musel tato data generovat provedením EVM, které využívá procesor a zabere čas. Archivní uzly k nim přistupují na disku a okamžitě poskytují odpovědi. Jedná se o užitečnou funkci pro určité části infrastruktury, například:

- Poskytovatelé služeb, jako jsou prohlížeče bloků
- Výzkumníci
- Bezpečnostní analytici
- Vývojáři dapp
- Audit a dodržování předpisů

Existují různé bezplatné [služby](/developers/docs/nodes-and-clients/nodes-as-a-service/), které také umožňují přístup k historickým datům. Vzhledem k tomu, že provoz archivního uzlu je náročnější, je tento přístup většinou omezený a funguje pouze pro příležitostný přístup. Pokud váš projekt vyžaduje neustálý přístup k historickým datům, měli byste zvážit provoz vlastního uzlu.

## Implementace a použití

Archivní uzel v tomto kontextu znamená data poskytovaná klienty exekuční vrstvy, kteří se starají o databázi stavů a poskytují koncové body JSON-RPC. Možnosti konfigurace, doba synchronizace a velikost databáze se mohou u jednotlivých klientů lišit. Podrobnosti naleznete v dokumentaci poskytnuté vaším klientem.

Než spustíte vlastní archivní uzel, seznamte se s rozdíly mezi klienty a zejména s různými [hardwarovými požadavky](/developers/docs/nodes-and-clients/run-a-node/#requirements). Většina klientů není pro tuto funkci optimalizována a jejich archivy vyžadují více než 12 TB místa. Naproti tomu implementace jako Erigon mohou ukládat stejná data na méně než 3 TB, což z nich činí nejefektivnější způsob provozu archivního uzlu.

## Doporučené postupy

Kromě obecných [doporučení pro provoz uzlu](/developers/docs/nodes-and-clients/run-a-node/) může být archivní uzel náročnější na hardware a údržbu. S ohledem na [klíčové funkce](https://github.com/ledgerwatch/erigon#key-features) Erigonu je nejpraktičtějším přístupem použití klientské implementace [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware

Vždy si ověřte hardwarové požadavky pro daný režim v dokumentaci klienta.
Největším požadavkem pro archivní uzly je místo na disku. V závislosti na klientovi se pohybuje od 3 TB do 12 TB. I když by se pro velké objemy dat mohl disk HDD považovat za lepší řešení, jeho synchronizace a neustálá aktualizace špičky řetězce budou vyžadovat disky SSD. Disky [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) jsou dostatečně dobré, ale měly by být spolehlivé kvality, alespoň [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Disky lze umístit do stolního počítače nebo serveru s dostatečným počtem slotů. Tato vyhrazená zařízení jsou ideální pro provoz uzlu s vysokou dostupností. Je zcela možné jej provozovat na notebooku, ale přenosnost bude spojena s dalšími náklady.

Všechna data se musí vejít na jeden svazek, proto je třeba disky spojit, např. pomocí [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) nebo LVM. Za zvážení může stát také použití systému [ZFS](https://en.wikipedia.org/wiki/ZFS), protože podporuje funkci "Copy-on-write", která zajišťuje správný zápis dat na disk bez jakýchkoli nízkoúrovňových chyb.

Pro větší stabilitu a zabezpečení při prevenci náhodného poškození databáze, zejména v profesionálním prostředí, zvažte použití [paměti ECC](https://en.wikipedia.org/wiki/ECC_memory), pokud ji váš systém podporuje. Obecně se doporučuje, aby velikost paměti RAM byla stejná jako pro plný uzel, ale více paměti RAM může pomoci urychlit synchronizaci.

Během počáteční synchronizace provedou klienti v archivním režimu všechny transakce od geneze. Rychlost provádění je většinou omezena procesorem, takže rychlejší procesor může pomoci zkrátit dobu počáteční synchronizace. Na průměrném spotřebitelském počítači může počáteční synchronizace trvat až měsíc.

## Další čtení {#further-reading}

- [Plný uzel Etherea vs. archivní uzel](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, září 2022_
- [Vytvoření vlastního archivního uzlu Etherea](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, srpen 2021_
- [Jak nastavit Erigon, Erigon RPC a TrueBlocks (scrape a API) jako služby](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, aktualizováno v září 2022_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Provozování uzlu](/developers/docs/nodes-and-clients/run-a-node/)
