---
title: Bezstavovost, exspirace stavu a exspirace historie
description: "Zjistěte, jak by exspirace historie, exspirace stavu a bezstavovost mohly snížit místo na disku potřebné k provozování uzlu Etherea, a tím zachovat síť decentralizovanou."
lang: cs
template: roadmap
---

Schopnost provozovat uzly [Etherea](/) na skromném hardwaru je pro skutečnou decentralizaci kritická. Provozování uzlu totiž uživatelům dává možnost ověřovat informace prováděním nezávislých kryptografických kontrol, namísto toho, aby důvěřovali třetí straně, která jim data poskytuje. Provozování uzlu umožňuje uživatelům odesílat transakce přímo do peer-to-peer sítě Etherea, aniž by museli důvěřovat zprostředkovateli. Decentralizace není možná, pokud jsou tyto výhody dostupné pouze uživatelům s drahým hardwarem. Namísto toho by uzly měly být schopny běžet s extrémně skromnými požadavky na zpracování a paměť, aby mohly fungovat na mobilních telefonech, mikropočítačích nebo nepozorovaně na domácím počítači.

Dnes jsou vysoké požadavky na místo na disku hlavní překážkou bránící univerzálnímu přístupu k uzlům. Je to primárně způsobeno nutností ukládat velké části dat stavu Etherea. Tato data stavu obsahují kritické informace potřebné ke správnému zpracování nových bloků a transakcí. V době psaní tohoto textu se pro provozování plného uzlu Etherea doporučuje rychlý 4TB SSD disk, který při zachování celé historie řetězce (k září 2026) využívá téměř 2 TB. Archivní uzly, které ukládají veškerý historický stav, potřebují v závislosti na klientovi od zhruba 2 TB do více než 12 TB.

K ukládání starších dat lze použít levnější pevné disky, ale ty jsou příliš pomalé na to, aby držely krok s příchozími bloky. Zachování současných modelů úložiště pro klienty při současném zlevnění a usnadnění ukládání dat je pouze dočasným a částečným řešením problému, protože růst stavu Etherea je „neomezený“, což znamená, že požadavky na úložiště se mohou pouze neustále zvyšovat a technologická vylepšení budou muset vždy držet krok s neustálým růstem stavu. Namísto toho musí klienti najít nové způsoby ověřování bloků a transakcí, které nespoléhají na vyhledávání dat v lokálních databázích.

## Snížení úložiště pro uzly {#reducing-storage-for-nodes}

Existuje několik způsobů, jak snížit množství dat, které musí každý uzel ukládat, přičemž každý vyžaduje aktualizaci základního protokolu Etherea v jiném rozsahu:

- **Exspirace historie**: umožňuje uzlům zahodit data stavu starší než X bloků, ale nemění způsob, jakým klienti Etherea nakládají s daty stavu.
- **Exspirace stavu**: umožňuje, aby se data stavu, která se často nepoužívají, stala neaktivními. Neaktivní data mohou klienti ignorovat, dokud nejsou obnovena.
- **Slabá bezstavovost**: přístup k úplným datům stavu potřebují pouze tvůrci bloků, ostatní uzly mohou ověřovat bloky bez lokální databáze stavu.
- **Silná bezstavovost**: žádné uzly nepotřebují přístup k úplným datům stavu.

## Exspirace dat {#data-expiry}

### Exspirace historie {#history-expiry}

Exspirace historie znamená, že klienti promazávají starší data, která pravděpodobně nebudou potřebovat, takže ukládají pouze malé množství historických dat a starší data zahazují, když dorazí nová. Existují dva důvody, proč klienti vyžadují historická data: synchronizace a obsluha datových požadavků. Původně se klienti museli synchronizovat od genesis bloku a ověřovat, že každý následující blok je správný až k vrcholu řetězce. Dnes klienti k rychlému dosažení vrcholu řetězce používají „kontrolní body slabé subjektivity“. Tyto kontrolní body jsou důvěryhodné výchozí body, podobně jako mít genesis blok blízko současnosti, spíše než na samém začátku Etherea. To znamená, že klienti mohou zahodit všechny informace před nejnovějším kontrolním bodem slabé subjektivity, aniž by ztratili schopnost synchronizace s vrcholem řetězce. Klienti v současnosti obsluhují požadavky na historická data (přicházející přes JSON-RPC) tak, že je získávají ze svých lokálních databází. S exspirací historie to však nebude možné, pokud byla požadovaná data promazána. Právě pro poskytování těchto historických dat jsou zapotřebí inovativní řešení.

Jednou z možností je, že si klienti vyžádají historická data od peerů pomocí řešení, jako je Portal Network. [Portal Network](/developers/docs/networking-layer/portal-network/) je peer-to-peer síť pro poskytování historických dat, kde každý uzel ukládá malou část historie Etherea, takže celá historie existuje distribuovaně napříč sítí. Požadavky jsou obsluhovány vyhledáním peerů, kteří uchovávají příslušná data, a jejich vyžádáním. Alternativně, jelikož jsou to obecně aplikace, které vyžadují přístup k historickým datům, může se stát jejich odpovědností je ukládat. V prostoru Etherea může být také dostatek altruistických aktérů, kteří by byli ochotni udržovat historické archivy. Mohla by to být decentralizovaná autonomní organizace (DAO), která vznikne za účelem správy úložiště historických dat, nebo v ideálním případě půjde o kombinaci všech těchto možností. Tito poskytovatelé by mohli data nabízet mnoha způsoby, například přes torrent, FTP, Filecoin nebo IPFS.

Exspirace historie je poněkud kontroverzní, protože Ethereum doposud vždy implicitně zaručovalo dostupnost jakýchkoli historických dat. Plná synchronizace od genesis bloku byla vždy standardně možná, i když se spoléhá na obnovu některých starších dat ze snapshotů. Exspirace historie přesouvá odpovědnost za poskytování této záruky mimo jádro protokolu Etherea. To by mohlo přinést nová rizika cenzury, pokud by historická data nakonec poskytovaly centralizované organizace.

První krok již byl nasazen: od [částečné exspirace historie](https://blog.ethereum.org/2025/07/08/partial-history-exp) v červenci 2025 mohou exekuční klienti zahodit těla a účtenky (receipts) každého bloku před Merge. Tato historie je stále dostupná z archivů, torrentů a sítě Portal Network. Průběžná exspirace historie, jak navrhuje EIP-4444, je stále předmětem diskuse. Zajímavé je, že výzvy spojené s EIP-4444 nejsou ani tak technické, jako spíše komunitní. Aby k nasazení došlo, je zapotřebí podpora komunity, která zahrnuje nejen shodu, ale také závazky k ukládání a poskytování historických dat od důvěryhodných subjektů.

Tento upgrade zásadně nemění způsob, jakým uzly Etherea nakládají s daty stavu, mění pouze způsob přístupu k historickým datům.

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

Slabá bezstavovost sice zahrnuje změny ve způsobu, jakým uzly Etherea ověřují změny stavu, ale zcela neeliminuje potřebu ukládání stavu ve všech uzlech v síti. Místo toho přesouvá slabá bezstavovost odpovědnost za ukládání stavu na navrhovatele bloků, zatímco všechny ostatní uzly v síti ověřují bloky bez ukládání úplných dat stavu.

**U slabé bezstavovosti vyžaduje navrhování bloků přístup k úplným datům stavu, ale ověřování bloků nevyžaduje žádná data stavu.**

Aby se tak stalo, musí klienti Etherea nejprve přijmout novou datovou strukturu pro ukládání dat stavu Etherea, která umožňuje předávání malých „svědků“ o datech mezi peery a jejich použití k ověřování bloků namísto ověřování bloků vůči lokálním databázím. Aktuálním návrhem je jednotný binární strom ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)), který nahradil dřívější návrh [Verkle stromu](/roadmap/verkle-trees/). Vyžaduje se také [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs/), protože to umožňuje, aby tvůrci bloků byli specializovanými uzly s výkonnějším hardwarem, a právě ti vyžadují přístup k úplným datům stavu.

<ExpandableCard title="Proč je v pořádku spoléhat se na méně navrhovatelů bloků?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Bezstavovost spoléhá na to, že tvůrci bloků udržují kopii úplných dat stavu, aby mohli generovat svědky, které lze použít k ověření bloku. Ostatní uzly nepotřebují přístup k datům stavu, všechny informace potřebné k ověření bloku jsou k dispozici ve svědkovi. To vytváří situaci, kdy je navrhování bloku nákladné, ale ověřování bloku je levné, což znamená, že uzel pro navrhování bloků bude provozovat méně operátorů. Decentralizace navrhovatelů bloků však není kritická, pokud co nejvíce účastníků dokáže nezávisle ověřit, že jimi navržené bloky jsou platné.

<ButtonLink variant="outline" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Přečtěte si více v poznámkách Dankrada</ButtonLink>
</ExpandableCard>

Navrhovatelé bloků používají data stavu k vytvoření „svědků“ – minimální sady dat, která dokazuje hodnoty stavu, jež jsou měněny transakcemi v bloku. Ostatní validátoři neuchovávají stav, ukládají pouze kořen stavu (hash celého stavu). Přijmou blok a svědka a použijí je k aktualizaci svého kořene stavu. Díky tomu je ověřovací uzel extrémně nenáročný.

Slabá bezstavovost je v pokročilé fázi výzkumu, ale spoléhá na to, že bude implementováno oddělení navrhovatele a tvůrce (PBS) a nový strom stavu, aby bylo možné mezi peery předávat malé svědky. To znamená, že slabá bezstavovost je pravděpodobně ještě několik let vzdálena od nasazení na Ethereum Mainnet.

[zkEVM pro ověřování na vrstvě 1 (L1)](/roadmap/zkevm/) je doplňková technologie, která by mohla dále vylepšit bezstavové ověřování. Namísto pouhé kontroly svědků by validátoři mohli ověřit důkaz s nulovou znalostí, že celý blok byl proveden správně – což poskytuje kryptografickou jistotu bez nutnosti opětovného provádění transakcí.

### Silná bezstavovost {#strong-statelessness}

Silná bezstavovost odstraňuje potřebu jakéhokoli uzlu ukládat data stavu. Místo toho jsou transakce odesílány se svědky, které mohou tvůrci bloků agregovat. Tvůrci bloků jsou pak zodpovědní za ukládání pouze toho stavu, který je potřebný pro generování svědků pro příslušné účty. Odpovědnost za stav je téměř zcela přesunuta na uživatele, protože ti posílají svědky a „seznamy přístupů“, aby deklarovali, se kterými účty a klíči úložiště interagují. To by umožnilo extrémně nenáročné uzly, ale existují zde kompromisy, včetně ztížení provádění transakcí s chytrými kontrakty.

Silná bezstavovost byla zkoumna výzkumníky, ale v současné době se neočekává, že by byla součástí roadmapy Etherea – je pravděpodobnější, že pro potřeby škálování Etherea bude dostačující slabá bezstavovost.

## Současný pokrok {#current-progress}

Částečná exspirace historie byla nasazena v červenci 2025, což exekučním klientům umožňuje zahodit historii z doby před Merge. Slabá bezstavovost, průběžná exspirace historie a exspirace stavu jsou stále ve fázi výzkumu a očekává se, že budou nasazeny za několik let. Neexistuje žádná záruka, že všechny tyto návrhy budou implementovány; například pokud bude nejprve implementována exspirace stavu, možná nebude nutné implementovat i exspiraci historie. Existují také další položky v roadmapě, jako je nový strom stavu (v současnosti navrhovaný jako binární strom v [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) a [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs), které musí být dokončeny jako první.

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
