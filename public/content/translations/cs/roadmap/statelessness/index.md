---
title: Bezstavovost, expirace stavu a expirace historie
description: Vysvětlení expirace historie a bezstavového Etherea
lang: cs
---

# Bezstavovost, expirace stavu a expirace historie {#statelessness}

Možnost provozovat uzly Etherea na obyčejném hardwaru je pro skutečnou decentralizaci zásadní. A to z toho důvodu, že provozování uzlu dává uživatelům možnost ověřovat informace nezávislým prováděním kryptografických kontrol, místo aby se spoléhali na třetí stranu, která jim poskytne data. Provozování uzlu umožňuje uživatelům odesílat transakce přímo do peer-to-peer sítě Etherea, aniž by museli důvěřovat zprostředkovateli. Decentralizace není možná, pokud jsou tyto výhody dostupné pouze uživatelům s drahým hardwarem. Místo toho by uzly měly být schopny fungovat se skromnými požadavky na zpracování a paměť, aby mohly fungovat na mobilních telefonech, mikropočítačích nebo na domácím počítači, aniž by zpomalily jeho výkon.

Dnes je hlavní překážkou bránící univerzálnímu přístupu k uzlům vysoká potřeba úložného prostoru. To je primárně způsobeno nutností ukládat velké množství stavových dat Etherea. Tato stavová data obsahují kritické informace potřebné pro správné zpracování nových bloků a transakcí. V době psaní tohoto textu je pro provozování plného uzlu na Ethereu doporučováno rychlé SSD s kapacitou 2 TB. U uzlu, který neodstraňuje žádná starší data, rostou požadavky na úložiště přibližně o 14 GB týdně a archivační uzly, které ukládají všechna data od vzniku sítě, se blíží 12 TB (v době psaní, únor 2023).

Levnější pevné disky mohou být použity k ukládání starších dat, ale ty jsou příliš pomalé na to, aby držely krok s příchozími bloky. Zachování současných modelů úložiště pro klienty, při současném zlevnění a zjednodušení ukládání dat, je pouze dočasným a částečným řešením problému, protože růst stavových dat Etherea je „neomezený“, což znamená, že požadavky na úložiště se mohou pouze zvyšovat a technologické zlepšení bude muset neustále držet krok s pokračujícím růstem stavu. Proto musí klienti hledat nové způsoby, jak ověřovat bloky a transakce, které nezávisí na vyhledávání dat z místních databází.

## Redukce úložiště uzlů {#reducing-storage-for-nodes}

Existuje několik způsobů, jak snížit množství dat, která musí každý uzel ukládat, přičemž každý z nich vyžaduje odlišný rozsah aktualizace základního protokolu Etherea:

- **Expirace historie**: Dovoluje uzlům odstraňovat stavová data starší než X bloků, aniž by se změnil způsob, jakým klienty Etherea s těmito daty pracují.
- **Vypršení stavu**: Dovoluje stavovým datům, která nejsou často používána, aby se stala neaktivními. Neaktivní data mohou klienty ignorovat, dokud nebudou znovu oživena.
- **Slabá bezstavovost**: Pouze producenti bloků potřebují přístup k plným stavovým datům, ostatní uzly mohou ověřovat bloky bez místní stavové databáze.
- **Silná bezstavovost**: Žádné uzly nepotřebují přístup k úplným stavovým datům.

## Expirace dat {#data-expiry}

### Expirace historie {#history-expiry}

Expirace historie znamená, že klienty mažou data, která pravděpodobně nebudou potřebovat, takže ukládají pouze malé množství historických dat a odstraňují starší data, když přijdou nová. Klienty vyžadují historická data ze dvou důvodů: synchronizace a zpracování žádostí o data. Původně se klienty musely synchronizovat od genesis bloku, ověřováním, že každý následující blok je správný, až k hlavě řetězce. Dnes klienti používají „slabé kontrolní body subjektivity“ k bootstrapování cesty k hlavě řetězce. Tyto kontrolní body jsou důvěryhodné výchozí body, jako kdyby genesis blok byl blízko přítomnosti, spíše než první blok Etherea. To znamená, že klienty mohou odstranit všechna data před posledním slabým kontrolním bodem subjektivity, aniž by ztratili schopnost synchronizovat se s hlavou řetězce. Klienty v současnosti zpracovávají žádosti (přicházející přes JSON-RPC) o historická data doručováním ze svých místních databází. Se zavedením expirace historie to však nebude možné, pokud budou požadovaná data odstraněna. Sdílení těchto historických dat je oblastí, ve které jsou potřeba inovativní řešení.

Jedním z řešení je, že klienty budou požadovat historická data od peerů pomocí projektů, jako je Portal Network. Portal Network je rozvíjející se peer-to-peer síť pro poskytování historických dat, kam každý uzel ukládá malý kousek historie Etherea, takže celá historie je distribuována po celé síti. Žádosti jsou v tomto případě zpracovávány vyhledáváním peerů, kteří ukládají příslušná data, a vysíláním žádostí o tato data směrem k nim. Alternativně, protože historická data obecně vyžadují hlavně aplikace, může být jejich odpovědností je ukládat. V prostoru Etherea by také mohl být dostatek altruistických aktérů, kteří by byli ochotni udržovat historické archivy. Mohla by to být DAO, která by vznikla za účelem správy úložiště historických dat, nebo ideálně by to byla kombinace všech těchto možností. Tito poskytovatelé by mohli šířit data různými způsoby, např. prostřednictvím torrentu, FTP, Filecoinu nebo IPFS.

Expirace historie je poněkud kontroverzní, protože dosud Ethereum vždy implicitně zaručovalo dostupnost jakýchkoliv historických dat. Plná synchronizace od vzniku sítě byla standardně možná, i když se někdy spoléhala na obnovu některých starších dat ze snapshotů. Expirace historie přesouvá odpovědnost za poskytování této záruky mimo hlavní protokol Etherea. To by mohlo zavést nová rizika cenzury, pokud by se poskytování historických dat ujaly centralizované organizace.

EIP-4444 ještě není připraveno k implementaci, ale je předmětem aktivní diskuse. Zajímavostí je, že výzvy spojené s EIP-4444 nejsou ani tak technické, ale spíše souvisejí s řízením komunity. Aby bylo možné tento návrh na vylepšení Etherea uvést do chodu, musí získat podporu komunity, což zahrnuje nejen souhlas, ale také závazky k ukládání a poskytování historických dat od důvěryhodných subjektů.

Toto vylepšení zásadně nemění způsob, jakým uzly Etherea pracují se stavovými daty, mění pouze způsob přístupu k historickým datům.

### Expirace stavu {#state-expiry}

Expirace stavu znamená odstranění stavových dat z jednotlivých uzlů v případě, že nebyl v poslední době využit. Existuje několik způsobů implementace, včetně:

- **Expirace na základě nájmu**: Počítání „nájmu“ účtům a jejich expirace, když je nájem roven nule.
- **Expirace na základě času**: Deaktivace účtů, pokud po určitou dobu nedošlo k jejich čtení/zápisu.

Expirace na základě nájmu by mohla spočívat v přímém počítání nájmu účtům za účelem jejich udržení v aktivní stavové databázi. Expirace na základě času by mohla být odpočítáváním od poslední interakce s účtem, nebo by mohlo jít o periodickou expiraci všech účtů. Mohly by také existovat mechanismy, které kombinují prvky obou modelů založených na čase a nájmu, např. jednotlivé účty by zůstaly v aktivním stavu, pokud by zaplatily malý poplatek před vypršením času. Při expiraci stavu je důležité si uvědomit, že neaktivní stav **není smazán**, pouze je uložen odděleně od aktivního stavu. Neaktivní stav může být obnoven do aktivního stavu.

To by mohlo fungovat tak, že by existoval stavový strom pro specifická časová období (řekněme ~1 rok). Kdykoli začne nové období, začíná i zcela nový stavový strom. Pouze aktuální stavový strom může být modifikován, všechny ostatní jsou neměnné. Od uzlů Etherea se očekává, že budou držet pouze aktuální stavový strom a nejnovější předchozí strom. K tomu je zapotřebí najít způsob, jak spojit adresu s obdobím, ve kterém existuje. Existuje [několik možných způsobů](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607), jak toho dosáhnout, ale jedna z hlavních možností vyžaduje [prodloužení adres](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485), aby se do nich vešla dodatečná informace, s přidaným benefitem, že delší adresy jsou mnohem bezpečnější. Plánovaná položka v plánu, která toto umožňuje, se nazývá [rozšíření adresního prostoru (address space extension)](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Podobně jako u expirace historie, v případě expirací stavu je odpovědnost za ukládání starých stavových dat odebrána jednotlivým uživatelům a přenesena na jiné subjekty, jako jsou centralizovaní poskytovatelé, altruističtí členové komunity nebo futurističtější decentralizovaná řešení, jako je Portal Network.

Expirace stavu je stále ve fázi výzkumu a v současné době není připravena ke spuštění. Expirace stavu bude pravděpodobně spuštěna později než bezstavové klienty a expirace historie, protože tato vylepšení umožňují většině validátorů snadné zpracování velkých stavových objemů.

## Bezstavovost {#statelessness}

Bezstavovost je trochu zavádějící termín, protože neznamená, že by byl koncept „stavu“ eliminován, ale zahrnuje změny ve způsobu, jakým uzly Etherea pracují se stavovými daty. Bezstavovost sama o sobě má dvě podoby: slabou bezstavovost a silnou bezstavovost. Slabá bezstavovost umožňuje většině uzlů být bezstavovými tím, že přenáší odpovědnost za ukládání stavu na méně uzlů. Silná bezstavovost úplně odstraňuje potřebu jakéhokoliv uzlu ukládat plná stavová data. Slabá i silná bezstavovost nabízí běžným validátorům následující výhody:

- téměř okamžitou synchronizaci,
- schopnost ověřovat bloky mimo pořadí,
- uzly mohou být spuštěny s velmi nízkými hardwarovými požadavky (např. na telefonech),
- uzly mohou být spuštěny na levných pevných discích, protože neexistuje potřeba čtení/zápisu na disk,
- kompatibilitu s budoucími vylepšeními kryptografie Etherea.

### Slabá bezstavovost {#weak-statelessness}

Slabá bezstavovost zahrnuje změny ve způsobu, jakým uzly Etherea ověřují změny stavu, ale zcela neodstraňuje potřebu ukládání stavových dat ve všech uzlech sítě. Místo toho slabá bezstavovost přenáší odpovědnost za ukládání stavových dat na navrhovatele bloků, zatímco všechny ostatní uzly v síti ověřují bloky bez uložení plných stavových dat.

**Při slabé bezstavovosti vyžaduje navrhování bloků přístup k plným stavovým datům, ale ověřování bloků nevyžaduje žádná stavová data.**

Aby to bylo možné, musí už být v klientských verzích Etherea implementovány [Verkle trees](/roadmap/verkle-trees/). Verkle trees jsou nová datová struktura pro ukládání stavových dat Etherea, která umožňuje předávat mezi peery malé, stejně velké „svědky“ dat, jež mohou být použity k ověřování bloků namísto ověřování bloků proti místním databázím. Je také nutné zavést [oddělení navrhovatelů a sestavovatelů bloků](/roadmap/pbs/), protože to umožňuje, aby sestavovatelé byli specializované uzly s výkonnějším hardwarem, které vyžadují přístup k plným stavovým datům.

<ExpandableCard title="Proč je v pořádku spoléhat se na méně navrhovatelů bloků?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Bezstavovost spoléhá na to, že sestavovatelé bloků udržují kopii plných stavových dat, aby mohli generovat svědky, kteří mohou být použiti k ověření bloku. Ostatní síťové uzly nepotřebují přístup ke stavovým datům, všechny informace potřebné k ověření bloku jsou dostupné ve svědkovi. To vede k situaci, kdy je navrhování bloku nákladné, ale ověřování bloku je levné, což naznačuje, že méně operátorů bude provozovat uzly navrhující bloky. Decentralizace navrhovatelů bloků však není kritická, pokud si co nejvíce účastníků může nezávisle ověřit, že bloky, které navrhují, jsou platné.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Další informace najdete v Dankradových poznámkách</ButtonLink>
</ExpandableCard>

Navrhovatelé bloků používají stavová data k vytvoření „svědků“ – minimální sady dat, která prokazuje hodnoty stavů, jež jsou transakcemi v bloku změněny. Ostatní validátoři stavová data neuchovávají, pouze ukládají kořen stavu (hash celého stavu). Dostanou blok a svědka a jejich pomocí aktualizují svůj kořen stavu. Díky tomu je ověřovací uzel tak lehký.

Slabá bezstavovost je v pokročilém stadiu výzkumu, ale spoléhá na implementaci oddělení navrhovatelů a sestavovatelů bloků a Verkle trees, aby malí svědci mohli být předáváni mezi peery. To znamená, že slabá bezstavovost bude pravděpodobně na hlavní síti Etherea spuštěna až za několik let.

### Silná bezstavovost {#strong-statelessness}

Silná bezstavovost odstraňuje potřebu jakéhokoliv uzlu uchovávat stavová data. Místo toho jsou transakce odesílány se svědky, kteří mohou být sdružováni producenty bloků. Producenti bloků jsou pak zodpovědní za ukládání pouze těch stavových dat, která jsou potřeba pro generování svědků k příslušným účtům. Odpovědnost za stav se téměř úplně přesouvá na uživatele, kteří posílají svědky a „přístupové seznamy“, aby deklarovali, s jakými účty a klíči úložiště interagují. To by umožnilo extrémně lehké uzly, ale za cenu kompromisů, včetně toho, že transakce s chytrými kontrakty by byly obtížnější.

Silnou bezstavovost zkoumali výzkumní vývojáři, ale v současnosti se neočekává, že by byla součástí plánu Etherea – jako pravděpodobnější varianta se jeví, že slabá bezstavovost bude pro potřeby škálování Etherea dostatečná.

## Aktuální průběh {#current-progress}

Slabá bezstavovost, expirace historie a expirace stavu jsou všechny ve fázi výzkumu a očekává se, že budou nasazeny za několik let. Neexistuje žádná záruka, že všechny tyto návrhy budou implementovány, např. pokud bude nejdříve implementována expirace stavu, nemusí být nutné implementovat i expiraci historie. Existují také další položky v plánu, jako jsou [Verkle trees](/roadmap/verkle-trees) a [oddělení navrhovatelů a sestavovatelů bloků](/roadmap/pbs), které je třeba dokončit jako první.

## Další informace {#further-reading}

- [AMA s Vitalikem o bezstavovosti](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Teorie řízení velikosti stavu](https://hackmd.io/@vbuterin/state_size_management)
- [Znovuobnovení konfliktů a minimalizace omezení stavu](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Cesty k bezstavovosti a expiraci stavu](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Specifikace EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes o EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Proč je tak důležité přejít na bezstavovost](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Původní poznámky ke konceptu bezstavového klienta](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Další informace o expiraci stavu](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Ještě více informací o expiraci stavu](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
