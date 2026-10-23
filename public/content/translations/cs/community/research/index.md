---
title: "Aktivní oblasti výzkumu Etherea"
description: "Prozkoumejte různé oblasti otevřeného výzkumu a zjistěte, jak se zapojit."
lang: cs
---

Jednou z hlavních předností Etherea je, že ho neustále vylepšuje aktivní výzkumná a inženýrská komunita. Mnoho nadšených a kvalifikovaných lidí po celém světě by se rádo věnovalo nevyřešeným problémům v Ethereu, ale není vždy snadné zjistit, o jaké problémy se jedná. Tato stránka nastiňuje klíčové aktivní oblasti výzkumu jako hrubého průvodce po špičkových inovacích Etherea.

## Jak funguje výzkum Etherea {#how-ethereum-research-works}

Výzkum Etherea je otevřený a transparentní. Kulturou je vytvářet výzkumné nástroje a výstupy co nejotevřenější a nejinteraktivnější, například prostřednictvím spustitelných zápisníků (notebooků). Výzkum Etherea postupuje rychle, přičemž nová zjištění jsou zveřejňována a otevřeně diskutována na fórech, jako je [ethresear.ch](https://ethresear.ch/), spíše než aby se ke komunitě dostávala prostřednictvím tradičních publikací po kolech vzájemného hodnocení (peer review). Nadace Ethereum také zveřejňuje, co upřednostňuje a proč, takže každý může vidět, které problémy jsou v současné době považovány za naléhavé.

## Obecné zdroje pro výzkum {#general-research-resources}

Bez ohledu na konkrétní téma lze na [ethresear.ch](https://ethresear.ch) a na [kanálu Eth R&D na Discordu](https://discord.gg/qGpsxSA) najít nepřeberné množství informací o výzkumu Etherea. Toto jsou hlavní místa, kde výzkumníci Etherea diskutují o nejnovějších nápadech a příležitostech k vývoji.

Pro přehled o tom, kam protokol směřuje, začněte s [plánem vývoje (roadmapou) Etherea](/roadmap/), poté si přečtěte [Aktualizaci priorit protokolu pro rok 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) od Nadace Ethereum a [aktualizace klastrů protokolu](https://blog.ethereum.org/2026/05/11/protocol-update-may-26), které informují o dosaženém pokroku. [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) je strukturovaný vstupní bod pro lidi, kteří chtějí pracovat na samotném protokolu.

## Zdroje financování {#sources-of-funding}

Můžete se zapojit do výzkumu Etherea a dostat za to zaplaceno. [Nadace Ethereum](/foundation/) financuje výzkum a veřejné statky prostřednictvím svého [Programu na podporu ekosystému](https://esp.ethereum.foundation/applicants), který zveřejňuje položky ze seznamu přání a žádosti o návrhy popisující problémy, které by ráda viděla vyřešené. Informace o aktivních a nadcházejících možnostech financování najdete na [stránce grantů Etherea](/community/grants/).

## Výzkum protokolu {#protocol-research}

Výzkum protokolu se zabývá základní vrstvou Etherea: sadou pravidel definujících, jak se uzly připojují, komunikují, vyměňují a ukládají data Etherea a jak dosahují konsenzu o stavu blockchainu. Jeho dvěma dlouhodobými kategoriemi jsou konsensus a exekuce, přičemž několik výzkumných témat se nyní prolíná oběma.

### Konsensus {#consensus}

Výzkum konsenzu se zabývá [mechanismem důkaz podílem (PoS) Etherea](/developers/docs/consensus-mechanisms/pos/): bezpečností pravidla volby forku a mechanismu finality, kryptoekonomií stakingu, peer-to-peer sítí, která přenáší bloky, atestace a data blobů, a kryptografií, kterou validátory podepisují. Některé příklady témat výzkumu konsenzu jsou:

- identifikace a oprava zranitelností;
- kvantifikace kryptoekonomické bezpečnosti;
- zkrácení doby, za kterou se blok stane finálním;
- a zlepšení efektivity, bezpečnosti a monitorování peer-to-peer sítí mezi konsensuálními klienty.

Velká část této práce se přesunula z papíru do specifikace. Vzorkování dostupnosti dat (data availability sampling) bylo dodáno v aktualizaci [Fusaka](/roadmap/fusaka/), změny ve způsobu sestavování bloků a zaručení zahrnutí transakcí jsou specifikovány pro nadcházející aktualizace a dlouhodobější redesign známý jako štíhlý konsensus (lean consensus) zkoumá rychlejší finalitu společně s postkvantovými podpisy.

#### Doporučená četba {#background-reading}

- [Úvod do důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Jednoslotová finalita](/roadmap/single-slot-finality/)
- [Dokument o Casper FFG](https://arxiv.org/abs/1710.09437)
- [Dokument o Gasper](https://arxiv.org/abs/2003.03052)
- [Štíhlé Ethereum (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Nedávný výzkum {#recent-research}

- [Konsensus na Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Dilema dostupnosti/finality](https://arxiv.org/abs/2009.04987)
- [3slotová finalita: SSF není o „jednom“ slotu](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Exekuce {#execution}

Exekuční vrstva se zabývá prováděním transakcí, spouštěním [virtuálního stroje Etherea (EVM)](/developers/docs/evm/) a generováním exekučních dat (payloads), která se předávají vrstvě konsenzu. Výzkum se zde dělí do dvou směrů: zlevnění uchovávání a dokazování stavu a zvýšení propustnosti bez toho, aby se zvyšovaly náklady pro lidi provozující uzly. Existuje mnoho aktivních oblastí výzkumu, včetně:

- přecenění nákladů na gas u operací, které vytvářejí stav;
- exspirace historie, kterou uzly již nepotřebují poskytovat;
- seznamy přístupů na úrovni bloku, které umožňují paralelní validaci transakcí;
- vícerozměrné trhy s poplatky, které oceňují stav, data a výpočty odděleně;
- a dokazování exekuce bloků vrstvy 1 (L1) pomocí zkEVM.

#### Doporučená četba {#background-reading-1}

- [Úvod do EVM](/developers/docs/evm/)
- [Exekuční vrstva na Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Specifikace exekuční vrstvy Etherea](https://github.com/ethereum/execution-specs)
- [Optimalizace databáze](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Nedávný výzkum {#recent-research-1}

- [EIP-7928: Seznamy přístupů na úrovni bloku](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Zvýšení nákladů na gas při vytváření stavu](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Jednotný vícerozměrný trh s poplatky](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, exspirace historie a jednodušší účtenky](https://eips.ethereum.org/EIPS/eip-7642)
- [Dodání L1 zkEVM: dokazování v reálném čase](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Odolnost proti cenzuře a sestavování bloků {#censorship-resistance-and-block-building}

Většinu bloků Etherea v současnosti sestavuje malý počet specializovaných tvůrců, což koncentruje moc rozhodovat o tom, které transakce budou zahrnuty. Výzkum v této oblasti zahrnuje začlenění trhu tvůrců do samotného protokolu, takže role navrhování a sestavování bloku jsou odděleny pravidly konsenzu spíše než softwarem mimo protokol, a poskytnutí způsobu validátorům, jak vynutit zahrnutí transakcí, které tvůrci vynechají.

#### Doporučená četba {#background-reading-21}

- [Oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs/)
- [Volba jediného tajného lídra (SSLE)](/roadmap/secret-leader-election/)

#### Nedávný výzkum {#recent-research-21}

- [EIP-7732: Zakořeněné oddělení navrhovatele a tvůrce](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Seznamy zahrnutí vynucené volbou forku](https://eips.ethereum.org/EIPS/eip-7805)
- [Zvýšení odolnosti transakcí proti cenzuře při oddělení navrhovatele a tvůrce](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Růst stavu a bezstavovost {#state-growth-and-statelessness}

Každý plný uzel ukládá stav Etherea, takže rychlost, jakou tento stav roste, stanovuje spodní hranici nákladů na jeho provoz. V krátkodobém horizontu se výzkum zaměřuje na přecenění operací, které vytvářejí stav, a na exspiraci historie, kterou uzly již nepotřebují uchovávat. V delším horizontu je v plánu nahradit hexární Merkle-Patricia trie Etherea binárním stromem, který produkuje mnohem menší důkazy, a posunout se směrem k bezstavovosti, aby uzel mohl ověřovat bloky bez nutnosti uchovávat celý stav. Dřívější práce v této oblasti předpokládaly Verkle stromy; současným návrhem je jednotný binární strom, který přebírá plán gasu pro svědky (witness gas schedule) specifikovaný pro tuto dřívější linii práce.

#### Doporučená četba {#background-reading-22}

- [Bezstavovost a exspirace stavu](/roadmap/statelessness/)
- [Kniha o bezstavovosti Etherea](https://stateless.fyi/)

#### Nedávný výzkum {#recent-research-22}

- [EIP-7864: Stav Etherea pomocí jednotného binárního stromu](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Změny nákladů na gas pro bezstavovost](https://eips.ethereum.org/EIPS/eip-4762)
- [Proč je decentralizovaný stav pro Ethereum důležitý](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Postkvantová kryptografie {#post-quantum-cryptography}

Podpisy validátorů Etherea a velká část jeho aplikační vrstvy spoléhají na kryptografii eliptických křivek, kterou by dostatečně schopný kvantový počítač prolomil. Učinit Ethereum odolným vůči kvantovým počítačům znamená nahradit tyto podpisy alternativami založenými na hashi nebo mřížkách, zachovat agregaci podpisů dostatečně efektivní pro velkou sadu validátorů a poskytnout stávajícím účtům cestu k migraci. Nadace Ethereum provozuje specializovaný postkvantový tým a jedná se o jeden z programů s nejdelším horizontem v plánu vývoje.

#### Doporučená četba {#background-reading-23}

- [Kvantová odolnost](/roadmap/security/quantum-resistance/)
- [Postkvantové Ethereum](https://pq.ethereum.org/)

#### Nedávný výzkum {#recent-research-23}

- [Štíhlé Ethereum (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Kryptografie na Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Implementace štíhlého Etherea](https://github.com/leanEthereum)

## Vývoj klientů {#client-development}

Klienti Etherea jsou implementace protokolu Ethereum. Vývoj klientů převádí výsledky výzkumu protokolu do reality tím, že je zabudovává do těchto klientů. Vývoj klientů zahrnuje aktualizaci specifikací klientů i vytváření konkrétních implementací.

Uzel Etherea vyžaduje spuštění dvou částí softwaru:

1. konsensuální klient pro sledování hlavy blockchainu, šíření bloků (gossip) a zpracování logiky konsenzu
2. exekuční klient pro podporu virtuálního stroje Etherea (EVM) a provádění transakcí a chytrých kontraktů

Vedle těchto dvou se prototypují nové třídy klientů, včetně klientů, kteří dokazují exekuci bloků vrstvy 1 (L1), a štíhlých konsensuálních klientů postavených na postkvantových podpisech.

Další podrobnosti o uzlech a klientech a seznam všech aktuálních implementací klientů najdete na [stránce o uzlech a klientech](/developers/docs/nodes-and-clients/). Historii všech aktualizací Etherea najdete také na [stránce historie](/ethereum-forks/).

### Exekuční klienti {#execution-clients}

- [Specifikace exekučního klienta](https://github.com/ethereum/execution-specs)
- [Specifikace exekučního API](https://github.com/ethereum/execution-apis)

### Konsensuální klienti {#consensus-clients}

- [Specifikace konsensuálního klienta](https://github.com/ethereum/consensus-specs)
- [Specifikace Beacon API](https://ethereum.github.io/beacon-APIs/)

### Klienti zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Dodání L1 zkEVM: bezpečnostní základy](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Škálování a výkon {#scaling-and-performance}

Škálování Etherea je velkou oblastí zájmu výzkumníků Etherea a probíhá ve dvou směrech současně: zvyšování propustnosti samotné vrstvy 1 (L1) a přesun exekuce na rollupy, které odesílají svá data do Etherea. Současná práce zahrnuje zvýšení limitu plynu bloku, přecenění růstu stavu, rozšíření kapacity blobů pro data rollupů a snížení toho, co musí uzel ukládat a ověřovat. Úvodní informace o škálování Etherea jsou k dispozici na naší [stránce o škálování](/developers/docs/scaling/) a v [plánu vývoje škálování](/roadmap/scaling/).

### Vrstva 2 (L2) {#layer-2}

Nyní existuje několik protokolů vrstvy 2 (L2), které škálují Ethereum pomocí různých technik pro dávkování transakcí a jejich zabezpečení na vrstvě 1 Etherea. Otevřený výzkum zahrnuje snížení latence a nákladů na dokazování, zkrácení doby, za kterou transakce dosáhne finality nevyžadující důvěru, a poskytnutí jednotného a soudržného uživatelského zážitku napříč mnoha rollupy.

#### Doporučená četba {#background-reading-2}

- [Úvod do vrstvy 2 (L2)](/layer-2/)
- [L2BEAT: shrnutí škálování](https://l2beat.com/scaling/summary)
- [Plán vývoje Etherea zaměřený na rollupy](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Nedávný výzkum {#recent-research-2}

- [Vrstva 2 na Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: onchain náklady](https://l2beat.com/scaling/costs)
- [Budování na Ethereu v roce 2026: co se změnilo](/latest/building-on-ethereum-in-2026/)

### Interoperabilita {#interoperability}

Uživatelé a aktiva jsou rozprostřeni napříč vrstvou 1 Etherea a mnoha sítěmi vrstvy 2 a výzkumným problémem je umožnit jim pohybovat se a jednat napříč těmito řetězci bez důvěry ve zprostředkovatele. Práce zde zahrnuje převody založené na záměrech (intents), standardizované meziřetězcové adresování a pojmenovávání, obecné předávání zpráv a abstrakci řetězců na úrovni peněženky. To nahrazuje model, ve kterém aktiva držely úschovné (custodial) mosty, a mosty byly historicky jedním z největších zdrojů ztrát v ekosystému, takže bezpečnost jakéhokoli meziřetězcového mechanismu zůstává ústředním problémem.

#### Doporučená četba {#background-reading-3}

- [Úvod do blockchainových mostů](/bridges/)
- [Jak zajistit, aby Ethereum opět působilo jako jeden řetězec](https://blog.ethereum.org/2025/11/18/eil)
- [Open Intents Framework](https://openintents.xyz/)
- [Validace mostů](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Nedávný výzkum {#recent-research-3}

- [ERC-7683: Meziřetězcové záměry](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Interoperabilní adresy](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Interoperabilní jména](https://eips.ethereum.org/EIPS/eip-7828)

### Dostupnost dat a škálování blobů {#data-availability-and-blob-scaling}

Rollupy odesílají svá data do Etherea v blobech a škálování této datové vrstvy je výzkumným problémem samo o sobě, odděleným od škálování exekuce. Ethereum nyní používá vzorkování dostupnosti dat, takže validátory mohou ověřit, že data blobu byla publikována, vzorkováním jejich částí namísto stahování celého obsahu, a kapacita blobů se postupně zvyšuje prostřednictvím vyhrazených forků pouze pro parametry blobů. Otevřené otázky zahrnují, jak daleko lze vzorkování posunout, jak udržet požadavky na šířku pásma zvládnutelné pro lidi provádějící staking doma a jak by mělo oceňování blobů reagovat na poptávku.

#### Doporučená četba {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Aktualizace Fusaka](/roadmap/fusaka/)
- [Danksharding](/roadmap/danksharding/)
- [Dostupnost dat](/developers/docs/data-availability/)
- [EIP-4844: Transakce shardových blobů](https://eips.ethereum.org/EIPS/eip-4844)
- [Poznámky k proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Nedávný výzkum {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Hardforky pouze pro parametry blobů](https://eips.ethereum.org/EIPS/eip-7892)
- [Sharding na Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Hardware {#hardware}

[Provozování uzlů](/developers/docs/nodes-and-clients/run-a-node/) na skromném hardwaru je zásadní pro udržení decentralizace Etherea, takže každé zvýšení propustnosti musí být zváženo s ohledem na to, co to stojí provozovatele uzlu. S rostoucím limitem plynu bloku a plánovaným dalším zvyšováním pokrývá aktivní výzkum růst stavu a způsob jeho oceňování, výkon synchronizace a databáze při větším stavu, úspory na disku dostupné díky exspiraci historie a nakonec bezstavovost.

#### Doporučená četba {#background-reading-5}

- [Spusťte si vlastní uzel Etherea](/developers/docs/nodes-and-clients/run-a-node/)
- [Bezstavovost a exspirace stavu](/roadmap/statelessness/)
- [Ethereum na ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Nedávný výzkum {#recent-research-5}

- [Škálování Etherea: cesta k vyššímu limitu plynu a dále](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Plán limitu plynu](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Zvýšení nákladů na gas při vytváření stavu](https://eips.ethereum.org/EIPS/eip-8037)

## Bezpečnost {#security}

Bezpečnost je široké téma, které může zahrnovat prevenci spamu a podvodů, bezpečnost peněženek, hardwarovou bezpečnost, kryptoekonomickou bezpečnost, odolnost proti cenzuře, připravenost na postkvantovou éru, hledání chyb (bug hunting) a testování a verifikaci aplikací a klientského softwaru. [Plán vývoje bezpečnosti](/roadmap/security/) Etherea pokrývá práci na úrovni protokolu.

### Kryptografie a ZKP {#cryptography--zkp}

Důkazy s nulovou znalostí (ZKP) a kryptografie jsou klíčové pro budování soukromí a bezpečnosti v Ethereu a jeho aplikacích. Dokazování s nulovou znalostí se přesunulo z výzkumu do produkční infrastruktury: dokazovatelé (provers), kteří dokazují skutečné bloky Etherea, jsou nyní veřejně testováni (benchmarked) z hlediska latence, nákladů a spolehlivosti (soundness). Otevřené problémy se odpovídajícím způsobem posunuly směrem k dokazování bloků L1 dostatečně rychle na to, aby to bylo možné v reálném čase, k důslednému zohlednění bezpečnosti používaných systémů dokazování a k přípravě na postkvantovou kryptografii.

#### Doporučená četba {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Soukromí](/roadmap/privacy/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Nedávný výzkum {#recent-research-6}

- [ZK na Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Kryptografie na Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Kalkulačka spolehlivosti pro systémy dokazování zkEVM založené na hashi](https://github.com/ethereum/soundcalc)
- [Dodání L1 zkEVM: bezpečnostní základy](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Peněženky {#wallets}

Peněženky Etherea mohou být rozšíření prohlížeče, desktopové a mobilní aplikace nebo chytré kontrakty na Ethereu. Abstrakce účtu již není experimentální: ERC-4337 poskytuje chytré účty bez změn protokolu a EIP-7702 umožňuje běžnému účtu nastavit kód tak, aby dávkování transakcí, sponzorování gasu a sociální obnova fungovaly s adresou, kterou uživatel již má. Otevřený výzkum se nyní soustředí na nativní abstrakci účtu v samotném protokolu, na modulární a auditovatelné architektury účtů a na správu a obnovu klíčů, kterou mohou běžní lidé bezpečně ovládat.

#### Doporučená četba {#background-reading-7}

- [Úvod do peněženek](/wallets/)
- [Úvod do bezpečnosti peněženek](/security/)
- [Abstrakce účtu](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Bezpečnost na Ethresear.ch](https://ethresear.ch/c/security/25)

#### Nedávný výzkum {#recent-research-7}

- [EIP-8141: Rámcová transakce](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API pro volání peněženky](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Objevování více vložených poskytovatelů](https://eips.ethereum.org/EIPS/eip-6963)
- [Peněženky s chytrými kontrakty zaměřené na validaci](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Komunita, vzdělávání a osvěta {#community-education-and-outreach}

Onboarding nových uživatelů do Etherea vyžaduje nové vzdělávací zdroje a přístupy k osvětě. To může zahrnovat příspěvky na blozích a články, knihy, podcasty, memy, výukové materiály, události a cokoli dalšího, co buduje komunity, vítá nováčky a vzdělává lidi o Ethereu.

### Design a UX {#design-and-ux}

Aby se do Etherea zapojilo více lidí, musí ekosystém zlepšit svůj design a uživatelskou zkušenost (UX). To vyžaduje, aby designéři a produktoví experti přehodnotili, jak fungují peněženky a aplikace, a stále častěji to znamená navrhovat podle standardů, které již existují: dávková volání peněženek, sponzorování gasu, účty, které lze obnovit, a lidsky čitelné adresy, které nesou informaci o řetězci, do kterého patří. Existuje poměrně málo kanonických míst pro výzkum UX ve Web3, takže publikované studie a pokyny k designu bývají roztříštěné.

#### Doporučená četba {#background-reading-8}

- [Design a UX ve Web3](/developers/docs/design-and-ux/)
- [Plán vývoje uživatelské zkušenosti Etherea](/roadmap/user-experience/)
- [Příručka designu Web3](https://learnweb3.design/)
- [Příručka UX designu Web3](https://web3ux.design/)

#### Nedávný výzkum {#recent-research-8}

- [UX/UI na Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API pro volání peněženky](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Interoperabilní jména](https://eips.ethereum.org/EIPS/eip-7828)

### Ekonomie {#economics}

Ekonomický výzkum v Ethereu obecně sleduje dva přístupy: ověřování bezpečnosti mechanismů spoléhajících na ekonomické pobídky („mikroekonomie“) a analýzu toků hodnoty mezi protokoly, aplikacemi a uživateli („makroekonomie“). Existují složité kryptoekonomické faktory týkající se nativního aktiva Etherea (etheru) a tokenů postavených na něm (například NFT a tokeny ERC-20).

#### Doporučená četba {#background-reading-9}

- [Skupina pro robustní pobídky (Robust Incentives Group)](https://rig.ethereum.org/)
- [Masterclass ekonomie Etherea a ekonomický model](https://github.com/CADLabs/ethereum-economic-model)

#### Nedávný výzkum {#recent-research-9}

- [Ekonomie na Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Rovnováha obíhající nabídky](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Kvantifikace MEV: Jak temný je les?](https://arxiv.org/abs/2101.05511)

### Blokový prostor a trhy s poplatky {#blockspace-fee-markets}

Trhy s blokovým prostorem (blockspace) řídí zahrnutí transakcí koncových uživatelů, a to buď přímo na Ethereu (vrstva 1), nebo na přemostěných sítích, např. rollupech (vrstva 2). Na Ethereu jsou transakce odesílány na trh s poplatky nasazený v protokolu jako EIP-1559, který chrání řetězec před spamem a oceňuje přetížení. Na obou vrstvách mohou transakce vytvářet externality, známé jako maximální extrahovatelná hodnota (MEV), které vyvolávají nové tržní struktury k zachycení nebo řízení těchto externalit. Současná práce to rozšiřuje na oceňování několika zdrojů najednou, protože stav, data a výpočty se přetěžují nezávisle na sobě, a na změnu toho, kdo sestavuje bloky a za jakých podmínek.

#### Doporučená četba {#background-reading-10}

- [Návrh mechanismu transakčních poplatků pro blockchain Etherea: Ekonomická analýza EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulace EIP-1559 (Skupina pro robustní pobídky)](https://ethereum.github.io/abm1559)
- [Ekonomie rollupů od základních principů](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, změna pořadí transakcí a nestabilita konsenzu na decentralizovaných burzách](https://arxiv.org/abs/1904.05234)

#### Nedávný výzkum {#recent-research-10}

- [EIP-7999: Jednotný vícerozměrný trh s poplatky](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Seznamy přístupů na úrovni bloku](https://eips.ethereum.org/EIPS/eip-7928)
- [Mezidoménové MEV](https://arxiv.org/abs/2112.01472)

### Pobídky důkazu podílem (PoS) {#proof-of-stake-incentives}

Validátory používají nativní aktivum Etherea (ether) jako zajištění proti nečestnému chování. Kryptoekonomie tohoto procesu určuje bezpečnost sítě. Sofistikované validátory mohou být schopny využít nuancí vrstvy pobídek k zahájení explicitních útoků. Od aktualizace Pectra mohou validátory také držet a vydělávat na mnohem větším efektivním zůstatku a konsolidovat několik validátorů do jednoho, což mění ekonomiku jejich provozu.

#### Doporučená četba {#background-reading-11}

- [Maximální efektivní zůstatek](/roadmap/pectra/maxeb/)
- [Masterclass ekonomie Etherea a ekonomický model](https://github.com/CADLabs/ethereum-economic-model)
- [Simulace pobídek PoS (Skupina pro robustní pobídky)](https://ethereum.github.io/beaconrunner/)

#### Nedávný výzkum {#recent-research-11}

- [Skupina pro robustní pobídky (Robust Incentives Group)](https://rig.ethereum.org/)
- [Tři útoky na PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Likvidní staking a deriváty {#liquid-staking-and-derivatives}

Likvidní staking umožňuje uživatelům s méně než 32 ETH získávat výnosy ze stakingu výměnou etheru za token představující stakovaný ether, který lze použít v DeFi. Pobídky a tržní dynamika spojené s likvidním stakingem se však stále objevují, stejně jako jeho vliv na bezpečnost Etherea (např. rizika centralizace).

#### Doporučená četba {#background-reading-12}

- [Likvidní staking na Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Cesta ke stakingu Etherea nevyžadujícímu důvěru](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Nedávný výzkum {#recent-research-12}

- [Rizika derivátů likvidního stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Zpracování výběrů z Lida](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Testování {#testing}

### Testování klientů a sítě {#client-and-network-testing}

Specifikace Etherea jsou spustitelné a testovací sady (test fixtures) z nich vygenerované jsou tím, vůči čemu klientské týmy kontrolují své implementace. Kromě toho sdílené testovací nástroje (test harnesses) spouštějí klienty proti sobě navzájem a proti záměrně nepřátelským síťovým podmínkám a veřejné testnety zkoušejí aktualizace předtím, než se dostanou na Mainnet. Zlepšování této infrastruktury je jednou z nejefektivnějších dostupných prací, protože tak se zachycují chyby dříve, než se dostanou k uživatelům.

#### Doporučená četba {#background-reading-24}

- [Specifikace exekuční vrstvy Etherea](https://github.com/ethereum/execution-specs)
- [Specifikace konsensuálního klienta](https://github.com/ethereum/consensus-specs)

#### Nedávný výzkum {#recent-research-24}

- [hive, end-to-end testovací nástroj pro klienty](https://github.com/ethereum/hive)
- [Assertoor, nástroj pro testování testnetů](https://github.com/ethpandaops/assertoor)

### Formální verifikace {#formal-verification}

Formální verifikace využívá strojově kontrolovaný matematický důkaz k prokázání, že se specifikace nebo implementace chová tak, jak bylo zamýšleno. V Ethereu to zahrnuje dokazování, že implementace EVM odpovídají formální sémantice, dokazování spolehlivosti obvodů a systémů dokazování, na které spoléhají dokazovatelé s nulovou znalostí, a ověřování kryptografických primitiv pod nimi. Další výzkum může tyto důkazy posílit a rozšířit je na větší část technologického zásobníku (stacku).

#### Doporučená četba {#background-reading-13}

- [Ověřené zkEVM](https://verified-zkevm.org/)
- [Formální verifikace (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Nedávný výzkum {#recent-research-13}

- [Přehled projektu ověřeného zkEVM](https://github.com/Verified-zkEVM/Overview)
- [KEVM: sémantika EVM v K](https://github.com/runtimeverification/evm-semantics)
- [Formální verifikace depozitního kontraktu](https://github.com/runtimeverification/deposit-contract-verification)

## Datová věda a analytika {#data-science-and-analytics}

Je potřeba více nástrojů pro analýzu dat a řídicích panelů (dashboards), které poskytují podrobné informace o aktivitě na Ethereu a zdraví sítě. Velká část podkladových dat je veřejná a dotazovatelná, takže mezera je obvykle spíše v analýze a prezentaci než v přístupu.

### Doporučená četba {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Řídicí panel klientské diverzity](https://clientdiversity.org/)
- [Specifikace exekučního API JSON-RPC Etherea](https://ethereum.github.io/execution-apis/)

#### Nedávný výzkum {#recent-research-14}

- [Analýza dat Skupiny pro robustní pobídky](https://rig.ethereum.org/)
- [Otevřená data ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: shrnutí škálování](https://l2beat.com/scaling/summary)

## Aplikace a nástroje {#apps-and-tooling}

Aplikační vrstva podporuje rozmanitý ekosystém programů, které vypořádávají transakce na základní vrstvě Etherea. Vývojové týmy neustále nacházejí nové způsoby, jak využít Ethereum k vytvoření komponovatelných verzí důležitých aplikací Web2 nevyžadujících povolení a odolných proti cenzuře, nebo k vytvoření zcela nových konceptů nativních pro Web3. Zároveň se vyvíjejí nové nástroje, díky nimž je budování decentralizovaných aplikací (dapps) na Ethereu méně složité.

### DeFi {#defi}

Decentralizované finance (DeFi) jsou jednou z hlavních tříd aplikací postavených na Ethereu. Cílem DeFi je vytvořit komponovatelné „peněžní lego“, které uživatelům umožní ukládat, převádět, půjčovat, vypůjčovat si a investovat kryptoaktiva pomocí chytrých kontraktů. DeFi je rychle se rozvíjející prostor, který se neustále aktualizuje. Neustále je zapotřebí výzkum bezpečných, efektivních a přístupných protokolů.

#### Doporučená četba {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Co je DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Nedávný výzkum {#recent-research-15}

- [Decentralizované finance, centralizované vlastnictví?](https://arxiv.org/pdf/2012.09306.pdf)
- [Aplikace na Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Působivým případem použití Etherea je schopnost organizovat se decentralizovaným způsobem pomocí DAO. Probíhá mnoho aktivního výzkumu o tom, jak lze DAO na Ethereu vyvíjet a využívat k provádění vylepšených forem správy jako koordinačního nástroje s minimalizovanou důvěrou, což výrazně rozšiřuje možnosti lidí nad rámec tradičních korporací a organizací.

#### Doporučená četba {#background-reading-16}

- [Úvod do DAO](/dao/)

#### Nedávný výzkum {#recent-research-16}

- [Mapování ekosystému DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Vývojářské nástroje {#developer-tools}

Nástroje pro vývojáře Etherea se rychle zlepšují. V této obecné oblasti je třeba provést mnoho aktivního výzkumu a vývoje.

#### Doporučená četba {#background-reading-17}

- [Nástroje podle programovacího jazyka](/developers/docs/programming-languages/)
- [Vývojářské frameworky](/developers/docs/frameworks/)
- [Úvod do decentralizovaných aplikací (dapps)](/developers/docs/dapps/)
- [Standardy tokenů](/developers/docs/standards/tokens/)

#### Nedávný výzkum {#recent-research-17}

- [Discord Eth R&D](https://discord.gg/qGpsxSA)
- [Specifikace exekučního API Etherea](https://github.com/ethereum/execution-apis)

### Orákula {#oracles}

Orákula importují offchain data do blockchainu decentralizovaným způsobem nevyžadujícím povolení. Získání těchto dat onchain umožňuje decentralizovaným aplikacím (dapps) reagovat na jevy v reálném světě, jako jsou kolísání cen reálných aktiv, události v offchain aplikacích nebo dokonce změny počasí.

#### Doporučená četba {#background-reading-18}

- [Úvod do orákul](/developers/docs/oracles/)

#### Nedávný výzkum {#recent-research-18}

- [Průzkum blockchainových orákul](https://arxiv.org/pdf/2004.07140.pdf)

### Bezpečnost aplikací {#app-security}

Hacky na Ethereu obecně zneužívají zranitelnosti v jednotlivých aplikacích spíše než v samotném protokolu. Hackeři a vývojáři aplikací jsou uvězněni v závodech ve zbrojení při vývoji nových útoků a obran. To znamená, že je vždy zapotřebí důležitý výzkum a vývoj, aby byly aplikace v bezpečí před hacky.

#### Doporučená četba {#background-reading-19}

- [Bezpečnost chytrých kontraktů](/developers/docs/smart-contracts/security/)
- [Zpráva o zneužití Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Seznam post-mortem analýz hacků kontraktů na Ethereu](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Nedávný výzkum {#recent-research-19}

- [Aplikace na Ethresear.ch](https://ethresear.ch/c/applications/18)

### Technologický zásobník (stack) {#technology-stack}

Decentralizace celého technologického zásobníku Etherea je důležitou oblastí výzkumu. V současné době mají decentralizované aplikace (dapps) na Ethereu běžně určité body centralizace, protože spoléhají na centralizované nástroje nebo infrastrukturu. Snížení této závislosti znamená učinit praktickým, aby aplikace četly Ethereum bez důvěry v jediného poskytovatele, a právě zde přicházejí na řadu lehcí klienti a přístup k datům uzlů nevyžadující důvěru.

#### Doporučená četba {#background-reading-20}

- [Zásobník Etherea](/developers/docs/ethereum-stack/)
- [Lehcí klienti](/developers/docs/nodes-and-clients/light-clients/)
- [Úvod do chytrých kontraktů](/developers/docs/smart-contracts/)
- [Úvod do decentralizovaného úložiště](/developers/docs/storage/)

#### Nedávný výzkum {#recent-research-20}

- [Skládatelnost chytrých kontraktů](/developers/docs/smart-contracts/composability/)
- [Coinbase: Úvod do zásobníku Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)