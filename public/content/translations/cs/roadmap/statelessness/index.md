---
title: Bezstavovost, exspirace stavu a exspirace historie
description: Vysvětlení exspirace historie a bezstavového Etherea
lang: cs
---

Schopnost provozovat [Ethereum](/) uzly na skromném hardwaru je kritická pro skutečnou decentralizaci. Je to proto, že provozování uzlu dává uživatelům možnost ověřovat informace nezávislým prováděním kryptografických kontrol, místo aby důvěřovali třetí straně, že jim bude dodávat data. Provozování uzlu umožňuje uživatelům odesílat transakce přímo do peer-to-peer sítě Etherea, místo aby museli důvěřovat zprostředkovateli. Decentralizace není možná, pokud jsou tyto výhody dostupné pouze uživatelům s drahým hardwarem. Místo toho by uzly měly být schopny běžet s extrémně skromnými požadavky na zpracování a paměť, aby mohly běžet na mobilních telefonech, mikropočítačích nebo nepozorovaně na domácím počítači.

Dnes jsou vysoké požadavky na místo na disku hlavní překážkou bránící univerzálnímu přístupu k uzlům. To je primárně způsobeno nutností ukládat velké části dat stavu Etherea. Tato data stavu obsahují kritické informace potřebné ke správnému zpracování nových bloků a transakcí. V době psaní tohoto textu se pro provoz plného uzlu Etherea doporučuje rychlý 2TB SSD disk. U uzlu, který nepromazává žádná starší data, roste požadavek na úložiště o zhruba 14 GB týdně a archivní uzly, které ukládají všechna data od genesis bloku, se blíží 12 TB (v době psaní tohoto textu, v únoru 2023).

K ukládání starších dat lze použít levnější pevné disky, ale ty jsou příliš pomalé na to, aby držely krok s příchozími bloky. Zachování současných modelů úložiště pro klienty a zároveň zlevnění a usnadnění ukládání dat je pouze dočasným a částečným řešením problému, protože růst stavu Etherea je „neomezený“, což znamená, že požadavky na úložiště se mohou pouze zvyšovat a technologická vylepšení budou muset vždy držet krok s neustálým růstem stavu. Místo toho musí klienti najít nové způsoby ověřování bloků a transakcí, které nespoléhají na vyhledávání dat z lokálních databází.

## Snížení úložiště pro uzly {#reducing-storage-for-nodes}

Existuje několik způsobů, jak snížit množství dat, které musí každý uzel ukládat, přičemž každý vyžaduje aktualizaci základního protokolu Etherea v jiném rozsahu:

- **Exspirace historie**: umožňuje uzlům zahodit data stavu starší než X bloků, ale nemění způsob, jakým klienti Etherea nakládají s daty stavu.
- **Exspirace stavu**: umožňuje, aby se data stavu, která se často nepoužívají, stala neaktivními. Neaktivní data mohou klienti ignorovat, dokud nejsou obnovena.
- **Slabá bezstavovost**: přístup k úplným datům stavu potřebují pouze tvůrci bloků, ostatní uzly mohou ověřovat bloky bez lokální databáze stavu.
- **Silná bezstavovost**: žádné uzly nepotřebují přístup k úplným datům stavu.

## Exspirace dat {#data-expiry}

### Exspirace historie {#history-expiry}

Exspirace historie znamená, že klienti promazávají starší data, která pravděpodobně nebudou potřebovat, takže ukládají pouze malé množství historických dat a při příchodu nových dat ta starší zahazují. Existují dva důvody, proč klienti vyžadují historická data: synchronizace a obsluha datových požadavků. Původně se klienti museli synchronizovat od genesis bloku a ověřovat, že každý následující blok je správný až k vrcholu řetězce. Dnes klienti používají „kontrolní body slabé subjektivity“, aby se dostali k vrcholu řetězce. Tyto kontrolní body jsou důvěryhodné výchozí body, jako byste měli genesis blok blízko současnosti, a ne na samém začátku Etherea. To znamená, že klienti mohou zahodit všechny informace před nejnovějším kontrolním bodem slabé subjektivity, aniž by ztratili schopnost synchronizace s vrcholem řetězce. Klienti v současnosti obsluhují požadavky (přicházející přes JSON-RPC) na historická data tak, že je získávají ze svých lokálních databází. S exspirací historie to však nebude možné, pokud byla požadovaná data promazána. Právě při poskytování těchto historických dat jsou zapotřebí inovativní řešení.

Jednou z možností je, že klienti požadují historická data od peerů pomocí řešení, jako je Portal Network. Portal Network je vyvíjená peer-to-peer síť pro poskytování historických dat, kde každý uzel ukládá malý kousek historie Etherea tak, že celá historie existuje distribuovaně napříč sítí. Požadavky jsou obsluhovány vyhledáním peerů, kteří ukládají příslušná data, a jejich vyžádáním od nich. Alternativně, protože přístup k historickým datům obecně vyžadují aplikace, může se stát jejich odpovědností je ukládat. V prostoru Etherea může být také dostatek altruistických aktérů, kteří by byli ochotni udržovat historické archivy. Mohla by to být DAO, která vznikne za účelem správy úložiště historických dat, nebo to v ideálním případě bude kombinace všech těchto možností. Tito poskytovatelé by mohli data poskytovat mnoha způsoby, například přes torrent, FTP, Filecoin nebo IPFS.

Exspirace historie je poněkud kontroverzní, protože Ethereum dosud vždy implicitně zaručovalo dostupnost jakýchkoli historických dat. Plná synchronizace od genesis bloku byla vždy standardně možná, i když spoléhá na obnovu některých starších dat ze snímků. Exspirace historie přesouvá odpovědnost za poskytování této záruky mimo základní protokol Etherea. To by mohlo přinést nová rizika cenzury, pokud by historická data nakonec poskytovaly centralizované organizace.

EIP-4444 ještě není připraveno k nasazení, ale aktivně se o něm diskutuje. Zajímavé je, že výzvy spojené s EIP-4444 nejsou ani tak technické, jako spíše komunitní. Aby mohlo být nasazeno, je zapotřebí podpora komunity, která zahrnuje nejen dohodu, ale také závazky k ukládání a poskytování historických dat od důvěryhodných subjektů.

Tento upgrade zásadně nemění způsob, jakým uzly Etherea nakládají s daty stavu, pouze mění způsob přístupu k historickým datům.

### Exspirace stavu {#state-expiry}

Exspirace stavu znamená odstranění stavu z jednotlivých uzlů, pokud k němu v nedávné době nebylo přistupováno. Existuje několik způsobů, jak by to mohlo být implementováno, včetně:

- **Exspirace podle nájmu**: účtování „nájmu“ účtům a jejich exspirace, když jejich nájem klesne na nulu
- **Exspirace podle času**: zneaktivnění účtů, pokud na daném účtu po určitou dobu neprobíhá žádné čtení/zápis

Exspirace podle nájmu by mohla představovat přímý nájem účtovaný účtům za jejich udržení v databázi aktivního stavu. Exspirace podle času by mohla probíhat odpočítáváním od poslední interakce s účtem, nebo by mohlo jít o periodickou exspiraci všech účtů. Mohly by existovat i mechanismy, které kombinují prvky modelů založených na čase i nájmu, například jednotlivé účty zůstanou v aktivním stavu, pokud před časovou exspirací zaplatí nějaký malý poplatek. U exspirace stavu je důležité poznamenat, že neaktivní stav **není smazán**, je pouze uložen odděleně od aktivního stavu. Neaktivní stav lze obnovit do aktivního stavu.

Způsob, jakým by to fungovalo, by pravděpodobně spočíval v existenci stromu stavu pro konkrétní časová období (např. ~1 rok). Kdykoli začne nové období, začne i zcela nový strom stavu. Upravovat lze pouze aktuální strom stavu, všechny ostatní jsou neměnné. Očekává se, že uzly Etherea budou uchovávat pouze aktuální strom stavu a ten bezprostředně předcházející. To vyžaduje způsob, jak opatřit adresu časovým razítkem s obdobím, ve kterém existuje. Existuje [několik možných způsobů](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607), jak to udělat, ale hlavní možnost vyžaduje [prodloužení adres](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), aby se do nich vešly dodatečné informace, s přidanou výhodou, že delší adresy jsou mnohem bezpečnější. Položka v roadmapě, která to řeší, se nazývá [rozšíření adresního prostoru](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Podobně jako u exspirace historie je v rámci exspirace stavu odpovědnost za ukládání starých dat stavu odebrána jednotlivým uživatelům a přesunuta na jiné subjekty, jako jsou centralizovaní poskytovatelé, altruističtí členové komunity nebo futurističtější decentralizovaná řešení, jako je Portal Network.

Exspirace stavu je stále ve fázi výzkumu a zatím není připravena k nasazení. K exspiraci stavu může dojít později než k bezstavovým klientům a exspiraci historie, protože tyto upgrady činí velké velikosti stavu snadno zvládnutelnými pro většinu validátorů.

## Bezstavovost {#statelessness-2}

Bezstavovost je trochu zavádějící pojem, protože neznamená, že by byl koncept „stavu“ eliminován, ale zahrnuje změny v tom, jak uzly Etherea nakládají s daty stavu. Samotná bezstavovost se vyskytuje ve dvou variantách: slabá bezstavovost a silná bezstavovost. Slabá bezstavovost umožňuje většině uzlů přejít do bezstavového režimu tím, že přenese odpovědnost za ukládání stavu na několik málo z nich. Silná bezstavovost zcela odstraňuje potřebu jakéhokoli uzlu ukládat úplná data stavu. Jak slabá, tak silná bezstavovost nabízejí běžným validátorům následující výhody:

- téměř okamžitá synchronizace
- schopnost ověřovat bloky mimo pořadí
- uzly schopné běžet s velmi nízkými hardwarovými požadavky (např. na telefonech)
- uzly mohou běžet na levných pevných discích, protože není vyžadováno žádné čtení/zápis na disk
- kompatibilita s budoucími upgrady kryptografie Etherea

### Slabá bezstavovost {#weak-statelessness}

Slabá bezstavovost sice zahrnuje změny ve způsobu, jakým uzly Etherea ověřují změny stavu, ale zcela neeliminuje potřebu ukládání stavu ve všech uzlech v síti. Místo toho slabá bezstavovost přenáší odpovědnost za ukládání stavu na navrhovatele bloků, zatímco všechny ostatní uzly v síti ověřují bloky bez ukládání úplných dat stavu.

**Při slabé bezstavovosti vyžaduje navrhování bloků přístup k úplným datům stavu, ale ověřování bloků nevyžaduje žádná data stavu**

Aby k tomu mohlo dojít, musí být v klientech Etherea již implementovány [Verkle stromy](/roadmap/verkle-trees/). Verkle stromy jsou náhradní datovou strukturou pro ukládání dat stavu Etherea, která umožňuje předávat mezi peery malé „svědky“ pevné velikosti k datům a používat je k ověřování bloků namísto ověřování bloků vůči lokálním databázím. Vyžaduje se také [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs/), protože to umožňuje, aby tvůrci bloků byli specializovanými uzly s výkonnějším hardwarem, a právě ti vyžadují přístup k úplným datům stavu.

<ExpandableCard title="Proč je v pořádku spoléhat se na méně navrhovatelů bloků?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Bezstavovost spoléhá na to, že tvůrci bloků udržují kopii úplných dat stavu, aby mohli generovat svědky, které lze použít k ověření bloku. Ostatní uzly nepotřebují přístup k datům stavu, všechny informace potřebné k ověření bloku jsou k dispozici ve svědkovi. To vytváří situaci, kdy je navrhování bloku drahé, ale ověřování bloku je levné, což znamená, že uzel navrhující bloky bude provozovat méně operátorů. Decentralizace navrhovatelů bloků však není kritická, pokud co nejvíce účastníků může nezávisle ověřit, že jimi navržené bloky jsou platné.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Přečtěte si více v Dankradových poznámkách</ButtonLink>
</ExpandableCard>

Navrhovatelé bloků používají data stavu k vytvoření „svědků“ – minimální sady dat, která prokazuje hodnoty stavu, jež jsou měněny transakcemi v bloku. Ostatní validátoři nedrží stav, ukládají pouze kořen stavu (hash celého stavu). Přijmou blok a svědka a použijí je k aktualizaci svého kořene stavu. Díky tomu je validující uzel extrémně nenáročný.

Slabá bezstavovost je v pokročilém stádiu výzkumu, ale spoléhá na to, že bude implementováno oddělení navrhovatele a tvůrce (PBS) a Verkle stromy, aby bylo možné mezi peery předávat malé svědky. To znamená, že slabá bezstavovost je pravděpodobně ještě několik let vzdálena od nasazení na Ethereum Mainnet.

[zkEVM pro ověřování na vrstvě 1 (l1)](/roadmap/zkevm/) je doplňková technologie, která by mohla dále vylepšit bezstavové ověřování. Místo pouhé kontroly svědků by validátoři mohli ověřit důkaz s nulovou znalostí, že celý blok byl proveden správně – což by poskytlo kryptografickou jistotu bez nutnosti znovu provádět transakce.

### Silná bezstavovost {#strong-statelessness}

Silná bezstavovost odstraňuje potřebu jakéhokoli uzlu ukládat data stavu. Místo toho jsou transakce odesílány se svědky, které mohou tvůrci bloků agregovat. Tvůrci bloků jsou pak zodpovědní za ukládání pouze toho stavu, který je potřebný pro generování svědků pro příslušné účty. Odpovědnost za stav je téměř zcela přesunuta na uživatele, protože ti posílají svědky a „seznamy přístupů“, aby deklarovali, se kterými účty a klíči úložiště interagují. To by umožnilo extrémně nenáročné uzly, ale existují zde kompromisy, včetně ztížení provádění transakcí s chytrými kontrakty.

Silná bezstavovost byla zkoumna výzkumníky, ale v současné době se neočekává, že by byla součástí roadmapy Etherea – je pravděpodobnější, že pro potřeby škálování Etherea bude dostačující slabá bezstavovost.

## Současný pokrok {#current-progress}

Slabá bezstavovost, exspirace historie a exspirace stavu jsou všechny ve fázi výzkumu a očekává se, že budou nasazeny za několik let. Neexistuje žádná záruka, že všechny tyto návrhy budou implementovány; například pokud bude jako první implementována exspirace stavu, možná nebude nutné implementovat také exspiraci historie. Existují také další položky roadmapy, jako jsou [Verkle stromy](/roadmap/verkle-trees) a [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs), které je třeba dokončit jako první.

## Další čtení {#further-reading}

- [Co je bezstavové Ethereum?](https://stateless.fyi/)
- [Vitalikovo AMA o bezstavovosti](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teorie správy velikosti stavu](https://hackmd.io/@vbuterin/state_size_management)
- [Omezení stavu s minimalizací konfliktů při obnově](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Cesty k bezstavovosti a exspiraci stavu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Specifikace EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes o EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Proč je tak důležité přejít na bezstavovost](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Původní poznámky ke konceptu bezstavového klienta](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Více o exspiraci stavu](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Ještě více o exspiraci stavu](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Informační stránka o bezstavovém Ethereu](https://stateless.fyi)