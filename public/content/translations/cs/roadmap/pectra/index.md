---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: "Přečtěte si o aktualizaci protokolu Pectra"
lang: cs
authors: ["Nixo", "Mario Havel"]
---

Aktualizace sítě Pectra následovala po aktualizaci [Dencun](/roadmap/dencun/) a přinesla změny jak do exekuční vrstvy, tak do vrstvy konsensu Etherea. Zkrácený název Pectra je kombinací slov Prague a Electra, což jsou příslušné názvy pro změny specifikací exekuční vrstvy a vrstvy konsensu. Společně tyto změny přinášejí řadu vylepšení pro uživatele, vývojáře a validátory [Etherea](/).

Tato aktualizace byla úspěšně aktivována na síti Ethereum Mainnet v epoše `364032`, dne **7. května 2025 v 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Aktualizace Pectra je pouze jedním krokem v dlouhodobých cílech vývoje Etherea. Přečtěte si více o [plánu vývoje protokolu](/roadmap/) a [předchozích aktualizacích](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Vylepšení v aktualizaci Pectra {#new-improvements}

Pectra přináší největší počet [EIP](https://eips.ethereum.org/) ze všech předchozích aktualizací! Obsahuje mnoho drobných změn, ale také některé významné nové funkce. Úplný seznam změn a technické detaily naleznete v jednotlivých zahrnutých EIP.

### Kód účtu EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) představuje významný krok k širokému rozšíření [abstrakce účtu](/roadmap/account-abstraction/). Díky této funkci mohou uživatelé nastavit svou adresu ([EOA](/glossary/#eoa)) tak, aby byla rozšířena o chytrý kontrakt. Toto EIP zavádí nový typ transakce se specifickou funkcí – umožňuje vlastníkům adres podepsat autorizaci, která nastaví jejich adresu tak, aby napodobovala zvolený chytrý kontrakt. 

S tímto EIP se uživatelé mohou rozhodnout pro programovatelné peněženky, které umožňují nové funkce, jako je sdružování transakcí, transakce bez poplatků za gas a vlastní přístup k aktivům pro alternativní schémata obnovy. Tento hybridní přístup kombinuje jednoduchost EOA s programovatelností účtů založených na kontraktech. 

Přečtěte si podrobnější informace o EIP-7702 [zde](/roadmap/pectra/7702/)

### Zvýšení maximálního efektivního zůstatku {#7251}

Současný efektivní zůstatek validátora je přesně 32 ETH. Je to minimální nezbytná částka pro účast na konsensu, ale zároveň maximum, které může jeden validátor vložit jako stake.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) zvyšuje maximální možný efektivní zůstatek na 2048 ETH, což znamená, že jeden validátor nyní může vložit jako stake částku mezi 32 a 2048 ETH. Místo násobků 32 si nyní mohou stakeři zvolit libovolnou částku ETH pro staking a získávat odměny za každé 1 ETH nad minimum. Pokud například zůstatek validátora vzroste díky odměnám na 33 ETH, toto 1 ETH navíc je také považováno za součást efektivního zůstatku a získává odměny.

Výhoda lepšího systému odměn pro validátory je však pouze částí tohoto vylepšení. [Stakeři](/staking/) provozující více validátorů je nyní mohou agregovat do jednoho, což usnadňuje provoz a snižuje režii sítě. Protože každý validátor v Beacon chainu odesílá podpis v každé epoše, požadavky na šířku pásma rostou s větším počtem validátorů a velkým množstvím podpisů k šíření. Agregace validátorů sníží zátěž sítě a otevře nové možnosti škálování při zachování stejné ekonomické bezpečnosti.

Přečtěte si podrobnější informace o MaxEB [zde](/roadmap/pectra/maxeb/)

### Zvýšení propustnosti blobů {#7691}

Bloby poskytují [dostupnost dat](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) pro L2. Byly představeny v [předchozí aktualizaci sítě](/roadmap/dencun/). 

V současné době síť cílí na průměrně 3 bloby na blok s maximem 6 blobů. S [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) se průměrný počet blobů zvýší na 6, s maximem 9 na blok, což povede ke zvýšení kapacity pro Ethereum rollupy. Toto EIP pomáhá překlenout mezeru, dokud [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) neumožní ještě vyšší počty blobů.

### Zvýšení nákladů na data volání {#7623}

Před zavedením [blobů v aktualizaci Dencun](/roadmap/danksharding) používaly L2 k ukládání svých dat v Ethereu [data volání](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata). Bloby i data volání ovlivňují využití šířky pásma Etherea. Zatímco většina bloků využívá pouze minimální množství dat volání, datově náročné bloky, které navíc obsahují mnoho blobů, mohou být pro p2p síť Etherea škodlivé. 

K vyřešení tohoto problému zvyšuje [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) cenu za data volání, ale pouze u datově náročných transakcí. Tím se omezuje velikost bloku v nejhorším případě, poskytuje se motivace pro L2, aby používaly pouze bloby, a více než 99 % transakcí zůstává nedotčeno.

### Výstupy spustitelné z exekuční vrstvy {#7002}

V současné době je výstup validátora a [výběr stakovaných ETH](/staking/withdrawals/) operací vrstvy konsensu, která vyžaduje aktivní klíč validátora, tedy stejný klíč BLS, který validátor používá k plnění aktivních povinností, jako jsou atestace. Pověření k výběru je samostatný studený klíč (cold key), který přijímá vybraný stake, ale nemůže spustit výstup. Jediným způsobem, jak mohou stakeři provést výstup, je odeslat do sítě Beacon chain speciální zprávu podepsanou pomocí aktivního klíče validátora. To je omezující ve scénářích, kdy pověření k výběru a klíč validátora drží různé subjekty, nebo když dojde ke ztrátě klíče validátora.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) zavádí nový kontrakt, který lze použít ke spuštění výstupu pomocí pověření k výběru na exekuční vrstvě. Stakeři budou moci provést výstup svého validátora zavoláním funkce v tomto speciálním kontraktu, aniž by vůbec potřebovali svůj podepisovací klíč validátora nebo přístup k Beacon chainu. Důležité je, že povolení výběrů validátorů onchain umožňuje staking protokoly se sníženými předpoklady důvěry vůči provozovatelům uzlů.

### Vklady validátorů onchain {#6110}

Vklady validátorů jsou v současné době zpracovávány pomocí [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), což je funkce na Beacon chainu, která načítá data z exekuční vrstvy. Je to jakýsi technický dluh z dob před aktualizací Merge, kdy byl Beacon chain samostatnou sítí a musel se zabývat reorganizacemi v rámci důkazu prací (PoW). 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) je nový způsob doručování vkladů z exekuční vrstvy do vrstvy konsensu, který umožňuje okamžité zpracování s menší složitostí implementace. Je to bezpečnější způsob zpracování vkladů, který je nativní pro sloučené Ethereum. Pomáhá také připravit protokol na budoucnost, protože k zavedení uzlu nevyžaduje historické vklady, což je nezbytné pro exspiraci historie.

### Předkompilovaný kontrakt pro BLS12-381 {#2537}

Předkompilované kontrakty jsou speciální sadou chytrých kontraktů zabudovaných přímo do virtuálního stroje Etherea ([EVM](/developers/docs/evm/)). Na rozdíl od běžných kontraktů nejsou předkompilované kontrakty nasazovány uživateli, ale jsou součástí samotné implementace klienta, napsané v jeho nativním jazyce (např. Go, Java atd., nikoli Solidity). Předkompilované kontrakty slouží pro široce používané a standardizované funkce, jako jsou kryptografické operace. Vývojáři chytrých kontraktů mohou volat předkompilované kontrakty jako běžný kontrakt, ale s větší bezpečností a efektivitou.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) přidává nové předkompilované kontrakty pro operace na eliptické křivce nad [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Tato eliptická křivka se stala široce používanou v ekosystémech kryptoměn díky svým praktickým vlastnostem. Konkrétněji byla přijata vrstvou konsensu Etherea, kde ji používají validátoři.

Nový předkompilovaný kontrakt přidává každému vývojáři možnost snadno, efektivně a bezpečně provádět kryptografické operace pomocí této křivky, například ověřování podpisů. Onchain aplikace, které na této křivce závisí, se mohou stát efektivnějšími z hlediska poplatků za gas a bezpečnějšími, pokud se spolehnou na předkompilovaný kontrakt namísto nějakého vlastního kontraktu. To platí hlavně pro aplikace, které chtějí pracovat s validátory uvnitř EVM, např. staking pooly, [restaking](/restaking/), lehké klienty, mosty, ale také důkazy s nulovým vědomím.

### Poskytování historických hashů bloků ze stavu {#2935}

EVM v současné době poskytuje operační kód `BLOCKHASH`, který umožňuje vývojářům kontraktů získat hash bloku přímo v exekuční vrstvě. To je však omezeno pouze na posledních 256 bloků a v budoucnu by to mohlo být problematické pro bezstavové klienty.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) vytváří nový systémový kontrakt, který může poskytovat posledních 8192 hashů bloků jako úložné sloty. To pomáhá připravit protokol na budoucnost pro bezstavovou exekuci a stává se efektivnějším při přijetí Verkle stromů. Kromě toho z toho však mohou okamžitě těžit rollupy, protože se mohou dotazovat kontraktu přímo s delším historickým oknem.

### Přesun indexu výboru mimo atestaci {#7549}

Konsensus Beacon chainu je založen na tom, že validátoři odevzdávají své hlasy pro nejnovější blok a finalizovanou epochu. Atestace obsahuje 3 prvky, z nichž 2 jsou hlasy a třetím je hodnota indexu výboru.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) přesouvá tento index mimo podepsanou zprávu atestace, což usnadňuje ověřování a agregaci hlasů konsensu. To umožní vyšší efektivitu v každém konsensuálním klientovi a může přinést významná vylepšení výkonu obvodům s nulovým vědomím pro dokazování konsensu Etherea.

### Přidání plánu blobů do konfiguračních souborů exekuční vrstvy {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) je jednoduchá změna, která přidává nové pole do konfigurace klienta exekuční vrstvy. Konfiguruje počet bloků, což umožňuje dynamické nastavení cílového a maximálního počtu blobů na blok a také úpravu poplatku za blob. S přímo definovanou konfigurací se klienti mohou vyhnout složitosti výměny těchto informací prostřednictvím Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Chcete-li se dozvědět více o tom, jak vás Pectra konkrétně ovlivní jako uživatele, vývojáře nebo validátora Etherea, podívejte se na <a href="https://epf.wiki/#/wiki/pectra-faq">často kladené dotazy (FAQ) k aktualizaci Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Ovlivňuje tato aktualizace všechny uzly a validátory Etherea? {#client-impact}

Ano, aktualizace Pectra vyžaduje aktualizace jak [klientů exekuční vrstvy, tak konsensuálních klientů](/developers/docs/nodes-and-clients/). Všichni hlavní klienti Etherea vydají verze podporující tento hard fork označené jako s vysokou prioritou. Pro udržení synchronizace se sítí Ethereum po aktualizaci musí provozovatelé uzlů zajistit, že používají podporovanou verzi klienta. Upozorňujeme, že informace o vydáních klientů jsou časově citlivé a uživatelé by měli sledovat nejnovější aktualizace pro nejaktuálnější podrobnosti.

## Jak lze převést ETH po hard forku? {#scam-alert}

- **Pro vaše ETH není vyžadována žádná akce**: Po aktualizaci Etherea Pectra není nutné vaše ETH nijak převádět ani aktualizovat. Zůstatky na vašich účtech zůstanou stejné a ETH, které v současné době držíte, zůstane po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **Kdokoli, kdo vás nabádá k „aktualizaci“ vašeho ETH, se vás snaží podvést.** V souvislosti s touto aktualizací nemusíte dělat vůbec nic. Vaše aktiva zůstanou zcela nedotčena. Pamatujte, že nejlepší obranou proti podvodům je být informován.

[Více o rozpoznávání a předcházení podvodům](/security/)

## Učíte se raději vizuálně? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Co přináší aktualizace Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Aktualizace Etherea Pectra: Co potřebují vědět stakeři — Blockdaemon_

## Další čtení {#further-reading}

- [Plán vývoje Etherea](/roadmap/)
- [Často kladené dotazy (FAQ) k aktualizaci Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Jak Pectra zlepšuje zkušenosti stakerů](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Informační stránka EIP-7702](https://eip7702.io/)
- [Devnety aktualizace Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
