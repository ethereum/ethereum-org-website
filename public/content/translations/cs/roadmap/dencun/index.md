---
title: Cancún-Deneb (Dencun)
metaTitle: Cancún-Deneb (Dencun) FAQ
description: Často kladené dotazy týkající se aktualizace sítě Cancún-Deneb (Dencun)
lang: cs
---

Cancún-Deneb (Dencun) je aktualizace sítě Ethereum, která aktivuje **proto-danksharding (EIP-4844)** a zavádí dočasné datové **bloby** pro levnější úložiště rollupů na [vrstvě 2 (l2)](/glossary/#layer-2).

Nový typ transakce umožňuje poskytovatelům rollupů ukládat data nákladově efektivněji do takzvaných „blobů“. U blobů je zaručeno, že budou pro síť dostupné po dobu přibližně 18 dnů (přesněji 4096 [epoch](/glossary/#epoch)). Po uplynutí této doby jsou bloby ze sítě odstraněny, ale aplikace mohou stále ověřovat platnost svých dat pomocí důkazů. 

To významně snižuje náklady na rollupy, omezuje růst řetězce a pomáhá podporovat více uživatelů při zachování bezpečnosti a decentralizované sady provozovatelů uzlů.

## Kdy očekáváme, že se v rollupech projeví nižší poplatky díky proto-dankshardingu? {#when}

- Tato aktualizace byla aktivována v epoše 269568, dne **13. března 2024 ve 13:55 (UTC)**
- Všichni hlavní poskytovatelé rollupů, jako jsou Arbitrum nebo Optimism, signalizovali, že bloby budou podporovány bezprostředně po aktualizaci
- Časová osa podpory u jednotlivých rollupů se může lišit, protože každý poskytovatel musí aktualizovat své systémy, aby mohl využívat nový prostor pro bloby

## Jak lze převést ETH po hard forku? {#scam-alert}

- **Pro vaše ETH není vyžadována žádná akce**: Po aktualizaci Dencun na síti Ethereum není nutné vaše ETH nijak převádět ani aktualizovat. Zůstatky na vašem účtu zůstanou stejné a ETH, které aktuálně držíte, zůstane po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **kdokoli, kdo vás nabádá k „aktualizaci“ vašeho ETH, se vás snaží podvést.** V souvislosti s touto aktualizací nemusíte dělat vůbec nic. Vaše aktiva zůstanou zcela nedotčena. Pamatujte, že nejlepší obranou proti podvodům je být informován.

[Více o tom, jak rozpoznat podvody a jak se jim vyhnout](/security/)

## Jaký problém řeší aktualizace sítě Dencun? {#network-impact}

Dencun primárně řeší **škálovatelnost** (zvládnutí více uživatelů a více transakcí) s **dostupnými poplatky**, a to při **zachování decentralizace** sítě.

Komunita Etherea zaujala ke svému růstu přístup „zaměřený na rollupy“, který staví rollupy na vrstvě 2 (l2) do pozice primárního prostředku pro bezpečné podporování více uživatelů.

Sítě rollupů zpracovávají (neboli „provádějí“) transakce odděleně od Mainnetu a poté publikují kryptografický důkaz a/nebo komprimovaná transakční data s výsledky zpět na Mainnet pro účely uchování záznamů. Ukládání těchto důkazů s sebou nese náklady (ve formě [gasu](/glossary/#gas)), které před zavedením proto-dankshardingu museli trvale ukládat všichni provozovatelé uzlů v síti, což z toho činilo nákladný úkol.

Zavedení proto-dankshardingu v aktualizaci Dencun přidává levnější datové úložiště pro tyto důkazy tím, že od provozovatelů uzlů vyžaduje uchovávání těchto dat pouze po dobu přibližně 18 dnů, po které mohou být data bezpečně odstraněna, aby se zabránilo nárůstu hardwarových požadavků. Protože rollupy mají obvykle lhůtu pro výběr 7 dnů, jejich bezpečnostní model zůstává nezměněn, dokud jsou bloby dostupné na vrstvě 1 (l1) po tuto dobu. Osmnáctidenní okno pro prořezávání (pruning) poskytuje pro toto období významnou rezervu.

[Více o škálování Etherea](/roadmap/scaling/)

## Jak se přistupuje ke starým datům blobů? {#historical-access}

Zatímco běžné uzly Etherea budou vždy uchovávat _aktuální stav_ sítě, historická data blobů mohou být zahozena přibližně 18 dní po jejich zavedení. Před zahozením těchto dat Ethereum zajišťuje, že byla zpřístupněna všem účastníkům sítě, což poskytuje čas na:

- Stažení a uložení dat zainteresovanými stranami.
- Dokončení všech lhůt pro zpochybnění (challenge periods) rollupů.
- Finalizaci transakcí rollupů.

_Historická_ data blobů mohou být žádoucí z různých důvodů a lze je ukládat a přistupovat k nim pomocí několika decentralizovaných protokolů:

- **Indexovací protokoly třetích stran**, jako je The Graph, ukládají tato data prostřednictvím decentralizované sítě provozovatelů uzlů motivovaných kryptoekonomickými mechanismy.
- **BitTorrent** je decentralizovaný protokol, kde dobrovolníci mohou tato data uchovávat a distribuovat ostatním.
- **[Portal Network Etherea](/developers/docs/networking-layer/portal-network/)** si klade za cíl poskytovat přístup ke všem datům Etherea prostřednictvím decentralizované sítě provozovatelů uzlů distribucí dat mezi účastníky podobně jako BitTorrent.
- **Jednotliví uživatelé** si mohou vždy svobodně ukládat vlastní kopie jakýchkoli dat, která si přejí uchovat pro historické účely.
- **Poskytovatelé rollupů** jsou motivováni k ukládání těchto dat, aby zlepšili uživatelský zážitek ze svého rollupu.
- **Průzkumníci bloků (block explorers)** obvykle provozují archivní uzly, které indexují a ukládají všechny tyto informace pro snadné historické vyhledávání, přístupné uživatelům přes webové rozhraní.

Je důležité si uvědomit, že obnova historického stavu funguje na **modelu důvěry 1 z N**. To znamená, že k ověření správnosti pomocí aktuálního stavu sítě potřebujete data pouze z _jednoho důvěryhodného zdroje_.

## Jak tato aktualizace přispívá k širší roadmapě Etherea? {#roadmap-impact}

Proto-danksharding připravuje půdu pro plnou implementaci [dankshardingu](/roadmap/danksharding/). Danksharding je navržen tak, aby distribuoval ukládání dat rollupů mezi provozovatele uzlů, takže každý provozovatel musí zpracovávat pouze malou část celkových dat. Tato distribuce zvýší počet datových blobů na blok, což je nezbytné pro škálování Etherea, aby zvládlo více uživatelů a transakcí.

Tato škálovatelnost je klíčová pro [podporu miliard uživatelů na Ethereu](/roadmap/scaling/) s dostupnými poplatky a pokročilejšími aplikacemi, a to při zachování decentralizované sítě. Bez těchto změn by se hardwarové nároky na provozovatele uzlů stupňovaly, což by vedlo k potřebě stále dražšího vybavení. To by mohlo vytlačit menší provozovatele, což by vedlo ke koncentraci kontroly nad sítí mezi několika velkými provozovateli, což by bylo v rozporu s principem decentralizace.

## Ovlivňuje tato aktualizace všechny klienty konsensu a validátorů Etherea? {#client-impact}

Ano, proto-danksharding (EIP-4844) vyžaduje aktualizace jak exekučních klientů, tak klientů konsensu. Všichni hlavní klienti Etherea vydali verze podporující tuto aktualizaci. Pro udržení synchronizace se sítí Ethereum po aktualizaci musí provozovatelé uzlů zajistit, že používají podporovanou verzi klienta. Upozorňujeme, že informace o vydáních klientů jsou časově citlivé a uživatelé by měli sledovat nejnovější aktualizace pro nejaktuálnější podrobnosti. [Podívejte se na podrobnosti o podporovaných vydáních klientů](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Klienti konsensu spravují software _validátoru_, který byl kompletně aktualizován, aby se přizpůsobil této aktualizaci.

## Jak Cancún-Deneb (Dencun) ovlivňuje testnety Etherea? {#testnet-impact}

- Devnety, Sepolia a Holesky již prošly aktualizací Dencun a proto-danksharding na nich plně funguje
- Vývojáři rollupů mohou tyto sítě využít k testování EIP-4844
- Většina uživatelů nebude touto změnou na jednotlivých testnetech vůbec ovlivněna

## Budou nyní všechny transakce na L2 využívat dočasný prostor blobů, nebo si budete moci vybrat? {#calldata-vs-blobs}

Transakce rollupů na vrstvě 2 (l2) Etherea mají možnost využívat dva typy ukládání dat: dočasný prostor blobů nebo trvalá data volání (calldata) chytrých kontraktů. Prostor blobů je ekonomická volba, která poskytuje dočasné úložiště za nižší cenu. Zaručuje dostupnost dat pro všechny nezbytné lhůty pro zpochybnění. Na druhou stranu data volání chytrých kontraktů nabízejí trvalé úložiště, ale jsou dražší.

Rozhodnutí mezi použitím prostoru blobů nebo dat volání činí primárně poskytovatelé rollupů. Toto rozhodnutí zakládají na aktuální poptávce po prostoru blobů. Pokud je po prostoru blobů vysoká poptávka, rollupy se mohou rozhodnout pro data volání, aby zajistily včasné odeslání dat.

Ačkoli je teoreticky možné, aby si uživatelé vybrali preferovaný typ úložiště, tuto volbu obvykle spravují poskytovatelé rollupů. Nabídnutí této možnosti uživatelům by přidalo na složitosti, zejména u nákladově efektivního sdružování transakcí. Pro konkrétní podrobnosti o této volbě by se uživatelé měli obrátit na dokumentaci poskytovanou jednotlivými poskytovateli rollupů.

## Sníží EIP-4844 gas na L1? {#l1-fee-impact}

Ne nijak významně. Zavádí se nový trh s gasem výhradně pro prostor blobů, který budou využívat poskytovatelé rollupů. _Ačkoli se poplatky na vrstvě 1 (l1) mohou snížit přesunutím dat rollupů do blobů, tato aktualizace se primárně zaměřuje na snížení poplatků na vrstvě 2 (l2). Ke snížení poplatků na L1 (Mainnet) může dojít v menší míře jako k efektu druhého řádu._

- Snížení gasu na L1 bude úměrné přijetí/využívání dat blobů poskytovateli rollupů
- Gas na L1 pravděpodobně zůstane konkurenční kvůli aktivitám nesouvisejícím s rollupy
- Rollupy, které přijmou využívání prostoru blobů, budou vyžadovat méně gasu na L1, což v krátkodobém horizontu pomůže tlačit poplatky za gas na L1 dolů
- Prostor blobů je stále omezený, takže pokud jsou bloby v rámci bloku nasycené/plné, může být od rollupů mezitím vyžadováno, aby svá data odesílaly jako trvalá data, což by hnalo ceny gasu na L1 a L2 nahoru

## Sníží to poplatky na jiných EVM blockchainech na vrstvě 1? {#alt-l1-fee-impact}

Ne. Výhody proto-dankshardingu jsou specifické pro rollupy na vrstvě 2 (l2) Etherea, které ukládají své důkazy na vrstvě 1 (Mainnet).

Pouhá kompatibilita s virtuálním strojem Etherea (EVM) neznamená, že síť z této aktualizace získá nějaký prospěch. Sítě, které fungují nezávisle na Ethereu (ať už jsou kompatibilní s EVM, nebo ne), neukládají svá data na Ethereu a z této aktualizace nebudou mít žádný užitek.

[Více o rollupech na vrstvě 2](/layer-2/)

## Učíte se raději vizuálně? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Odemykání škálování Etherea, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 s Domothym — Bankless_

## Další čtení {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transakce shardových blobů (proto-danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Oznámení o Dencunu na Mainnetu](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog Ethereum Foundation_
- [Stopařův průvodce po Ethereu: Proto-danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Často kladené dotazy k proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Hloubkové vysvětlení EIP-4844: Jádro aktualizace Cancún](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Aktualizace AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_