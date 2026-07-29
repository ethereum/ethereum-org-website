---
title: "Stack soukromí Etherea: privátní čtení, sítě a skrytý únik"
description: "Andy Guzman vysvětluje, jak unikají metadata, když peněženky čtou data z Etherea, a jak výzkum privátního čtení a sítí v roadmapě soukromí tento únik na přístupové vrstvě uzavírá."
lang: cs
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Stack soukromí Etherea"
---

Přednáška **Andyho Guzmana**, vedoucího týmu Privacy Stewards of Ethereum (PSE) v Nadaci Ethereum, na konferenci EthBoulder 2026. Odhaluje zásadní slepé místo v soukromí Etherea: i uživatelé, kteří nikdy nepodepíší transakci, prozrazují podrobná data o svém chování prostřednictvím každodenních dotazů. Představuje stack soukromí Etherea, který pokrývá privátní čtení (PIR), soukromí provozu (onion routing a mixnety) a práci na výkonu, jako jsou unifikované binární stromy a ZK-ověřitelný stav.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=tvAqDJXCBaA) zveřejněného organizací EthBoulder. Byl lehce upraven pro lepší čitelnost.*

#### Fiktivní dopis od poskytovatele RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Ahoj všichni, já jsem Andy a chtěl jsem představit téma, o kterém se v ekosystému Etherea často nemluví a které je nesmírně důležité. Jak jste si možná všimli ze slidu a úvodu, týká se soukromí a toho, jak jsme nedostatečně chráněni, aniž bychom si to vůbec uvědomovali.

Dovolte mi začít dopisem, který vám někdo napsal.

„Vážený uživateli, děkujeme za 847 dotazů, které jste tento měsíc vznesl. Opravdu nás bavilo vás poznávat. Víme, že držíte ETH ve třech různých peněženkách. Víme, že jste minulý úterý 94krát zkontroloval cenu ETH. Byl to pro všechny velmi těžký den, takže vás nesoudíme. Zkontroloval jste také cenu BTC, což je zajímavé, protože žádný Bitcoin nedržíte. Přemýšlíte o diverzifikaci? To zůstane mezi námi a samozřejmě našimi analytickými partnery. Také velmi pečlivě sledujete dva pooly na Uniswapu a minulý týden jste 14krát zkontroloval svůj health factor na Aave. Možná byste si měl odpočinout, nebo prostě přidat nějaké zajištění. Ve čtvrtek jste ho zkontroloval třikrát během 12 minut a měl jste velké obavy. Podíval jste se na čtyři různá jména ENS, takže buď začínáte nový projekt, nebo máte krizi identity. A vždy se odmlčíte mezi 23:00 a 7:00 horského času.“

#### Jak prozrazujete data bez podepisování transakcí (1:34) {#how-you-leak-data-without-signing-transactions-134}

„Takže jsme si docela jistí, že sídlíte v Boulderu nebo někde poblíž. Nikdy jste přes nás nepodepsal jedinou transakci. Nikdy jste nemusel. Vaše zvědavost nám řekla všechno. S pozdravem, váš poskytovatel RPC.“

Samozřejmě je to fiktivní dopis, ale popisuje něco, co skutečně každý den prozrazujeme. I když neprovádíte jedinou transakci nebo jakoukoli onchain akci, v podstatě říkáte všechno jakékoli analytické společnosti, která by se ráda dostala k těmto datům a vašemu chování.

#### Privátní zápisy vs. privátní čtení (2:07) {#private-writes-vs-private-reads-207}

Co se tedy právě teď děje ve světě soukromí? Vidím, že klademe velký důraz na onchain soukromí, nebo na to, co v PSE nazýváme privátní zápisy: všechny akce, které provádíte onchain. A dává to smysl, že? Tyto akce se navždy zaznamenávají a přenášejí po celém světě, takže dává smysl neprozrazovat svou adresu při konkrétní akci. Klademe také velký důraz na nástroje: zdroje dat, důkazy, DSL a jazyky, které můžeme použít, abychom vývojářům poskytli více nástrojů k vyjádření a budování silnějších aplikací, které mají více onchain soukromí.

V této prezentaci chci ale argumentovat tím, že nevěnujeme zdaleka dostatek pozornosti a úsilí těmto dalším oblastem: tomu, co nazýváme privátní čtení, protože kdykoli se dotazujete na data z blockchainu, prozrazujete spoustu informací, a privátním sítím, protože ještě předtím, než cokoli dorazí onchain, uniká veškerý váš provoz.

Abychom byli trochu techničtější: všechna volání RPC, jako eth_getBalance, eth_call a eth_getLogs, jsou požadavky v prostém textu, které jdou k poskytovatelům RPC a jsou korelovány s vaší IP adresou.

#### Proč větší aktivita zvyšuje riziko profilování (3:20) {#why-more-activity-increases-profiling-risk-320}

S těmito informacemi je velmi snadné lidi profilovat, segmentovat je a modelovat jejich chování. A to může být použito proti vám. Jak si asi dokážete představit, informace jsou moc, a čím více informací o vás a vašem chování lidé mají, tím větší moc nad vámi mají.

Většina lidí si to neuvědomuje. Většina lidí řekne, dobře, na tom vlastně nezáleží, protože to nejsou kritické informace. Nebo si mohou myslet: čím více aktivity bude, tím více budu chráněn. To vůbec není pravda a je to neintuitivní. U onchain akcí, kdekoli existují množiny anonymity, to pomáhá: čím více uživatelů, tím více soukromí a tím snazší je splynout s davem. Ale u čtení je to naopak, protože dotazy nejsou zaměnitelné. Čím více aktivity přenášíte, čím více akcí provádíte, tím bohatší je korelační plocha a tím snazší je vytvořit profil vašich akcí.

Takže kdykoli nastane mánie kolem decentralizovaných financí (DeFi) nebo šílenství kolem NFT, lidé začnou být nedbalí. OpSec (operační bezpečnost) jde samozřejmě stranou a stává se mnohem, mnohem snazším lidi deanonymizovat na základě vzorců aktivity, do kterých většina lidí spadne.

#### Představení stacku soukromí Etherea (4:43) {#introducing-the-ethereum-privacy-stack-443}

Chci začít celkovým pohledem: na co bychom se měli zaměřit, co je potřeba a kdo na čem pracuje. Tato přednáška se dotkne jak techničtějších témat, tak i těch koncepčnějších na vyšší úrovni, aby si z ní každý mohl něco odnést.

Chci představit to, co nazývám stackem soukromí Etherea, neboli vrstvy stacku soukromí Etherea, a myslím, že je užitečné o tom takto uvažovat. Pokud opravdu chceme soukromí, nepotřebujeme soukromí pouze onchain; potřebujeme soukromí také ve všech těchto vrstvách stacku, podobně jako u životního cyklu transakce nebo modelu OSI a jeho technologických vrstev. Řekl bych, že bychom mohli vytvořit standard nebo nějaké celoekosystémové uznání, že tyto vrstvy existují. Možná to není konečná podoba, ale myslím, že už teď je to prokazatelně užitečné.

#### Vrstva po vrstvě: kde dochází k únikům (5:41) {#layer-by-layer-where-you-leak-541}

Úplně nahoře je aplikační vrstva. Kdykoli navštívíte webovou stránku, samozřejmě prozrazujete, co navštěvujete, a lidé mohou začít s profilováním: množiny anonymity, přihlašovací údaje, propojování vaší IP adresy s tím, co navštěvujete, i když nic neděláte.

Další je vrstva peněženky. Kdykoli provedete nějakou akci, neprozrazujete informace pouze aplikační vrstvě, ale také bránám. Peněženky jsou v současnosti velmi komplexní, integrují se s mnoha dalšími systémy a službami a vy prozrazujete mnohem více informací, než si dokážete představit. I když jen otevřete svou peněženku a ta se dotáže na cenu ETH nebo váš zůstatek, prozrazujete všechno.

Pak tu máte brány: RPC, proxy servery, relayery. Znovu prozrazujete další metadata. Pak to, co by si lidé představili jako onchain prvek, což je kdykoli, když se dotazujete na věci v EVM, jako je stav nebo vzorce provádění. Například dotazování na zůstatek něčeho nebo na stav chytrého kontraktu. A nakonec konsensus, kde jsou všechny validátory. V závislosti na tom, zda zapisujete onchain nebo čtete onchain, se můžete dotknout také mempoolu.

A je tu další vertikála, kterou nazýváme sítě, a ta je průřezová, protíná všechny tyto vrstvy. Například: právě teď navštívíte webovou stránku a server zná vaši IP adresu. Ale co kdybyste tuto webovou stránku navštívili přes Tor nebo jinou anonymní síť? Znali byste IP adresu webové stránky, ale oni by neznali tu vaši. A co když je tato webová stránka hostována v zemi, která nedávno začala cenzurovat všechny krypto věci? Tato webová stránka a společnost by také chtěly skrýt svou IP adresu a chtěly by skrýt svou doménu za onion doménu.

To jsou typy věcí, které dávají smysl: musíme jít vrstvu po vrstvě, všechno zabezpečit a analyzovat to optikou velmi destruktivního útočníka, který chce všechno cenzurovat. I když to neuděláme a řekneme si, že žijeme v dostatečně dobrém stavu, tyto informace se nyní zaznamenávají a budou navždy hostovány spoustou lidí, které ani neznáte, společnostmi, které začnou prodávat vaše data. Nakonec, za pět let, může někdo zakázat krypto a říct: „Každý, kdo v posledních pěti letech použil Uniswap, já jsem finanční úřad, začnu klepat na dveře a pošlu vás do vězení,“ nebo tak něco. Tyto dystopické scénáře se právě teď dějí v různých zemích po celém světě.

#### Privátní čtení a privátní sítě (8:24) {#private-reads-and-private-networking-824}

Dobře, takže máme stack soukromí Etherea. Na co bychom se měli zaměřit? V této prezentaci chci mluvit o těchto dvou oblastech. Privátní čtení: kdykoli přistupujete ke stavu z onchain, dotýkáte se všech těchto vrstev, od aplikace, řekněme, že se chci dotázat na cenu ETH, přes peněženku, brány, až po uzel, na kterém běží Ethereum a EVM, a pak zpět. V podstatě poskytovatel RPC nebo indexer. A privátní sítě, což jsou všechny akce, které se dějí na síťové vrstvě. To je to, co chceme zabezpečit.

#### Tři pilíře: data, provoz, výkon (9:05) {#three-pillars-data-traffic-performance-905}

Existují tři pilíře, které jsou podle mě pro dosažení tohoto cíle kritické. Chceme skrýt a učinit privátními samotná data. Chceme skrýt a učinit privátním samotný provoz. A pak chceme, aby to bylo výkonné, užitečné, praktické a levné. To shrnuje spoustu informací o věcech, které se dějí v ekosystémech, ale myslím, že je užitečné nastínit celkovou situaci a identifikovat klíčové body, kde můžeme zrychlit.

#### Skrývání dat: od proxy serverů po PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Takže, data. Co přesně chceme chránit? Chceme skrýt, na jaké informace se těchto serverů ptáte, a chceme skrýt vzorce toho, jak k těmto datům přistupujete. Nejen obsah, ale i vzorce.

Existují různé úrovně technik. První je nic: prostě prozradíte všechno. Kdykoli připojíte svou peněženku, svážete svou IP adresu s kontraktem, na který se dotazujete, s konkrétním eth_getBalance pro konkrétní adresu, a to je vše. I když používáte protokol pro soukromí, řekněme Tornado Cash, a chcete se dotázat na stav Merkleova stromu, musíte si buď stáhnout celý strom, což není příliš výkonné, nebo prozradíte, na jakou cestu a listy se dotazujete, čímž zmenšíte svou množinu anonymity. Takže ani použití silného protokolu pro soukromí, jako je Tornado Cash, nestačí, pokud nechráníte své sítě a vzorce přístupu k datům.

Další úrovní jsou nějaké druhy proxy serverů nebo relayerů: spousta strojů, které nevědí, odkud požadavek pochází, a nakonec data načtou. To není příliš praktické a není to zrovna bez nutnosti důvěry.

Pak tu máte TEE (Trusted Execution Environments), což je krok vpřed, a právě zde některé týmy a společnosti nabízejí své služby. Myslím, že je to dobrý krok vpřed, ale nestačí to, opět proto, že náklady na útok a kompromitaci TEE velmi klesají. Pro určité kritické případy použití to nestačí; pro mnoho každodenních by mohlo.

Jsou tu další týmy, které pracují na OMAPs (oblivious map access patterns) a ORAM (Oblivious RAM). Jsou to podobné techniky, které se snaží zamlžit, k jakým částem datové sady se snažíte přistoupit. Místo abyste řekli „Chci zůstatek z této ETH adresy“, přistupujete náhodně k různým věcem, takže server to neví.

A řekl bych, že konečným cílem těchto snah bude PIR, privátní získávání informací (private information retrieval), což znamená, že server neví, na co se dotazujete, a nic se o tom nedozví.

#### Vysvětlení privátního získávání informací (12:03) {#private-information-retrieval-explained-1203}

Privátní získávání informací je super mocná technika v kryptografii a bude se hodně používat. Existují dvě varianty: indexové PIR, které můžete použít, pokud máte strukturovaná data pod indexem, a klíčové PIR, kde se, jak název napovídá, dotazujete podle klíčového slova. Je velmi těžké mít jedno schéma, které funguje pro všechno.

Stav Etherea je obrovský a velmi rozmanitý. Logy, jak jsem se včera dozvěděl, se pouze přidávají (append-only), ale model účtů je jiný: některý stav se aktualizuje velmi často, jiný ne. V závislosti na tom, jak si to rozdělíte, můžete mít megabajty, gigabajty nebo terabajty dat s velmi odlišnými vzorci přístupu.

#### Multi-agentní architektura PIR (12:48) {#a-multi-agent-pir-architecture-1248}

Návrh, na kterém pracujeme v rámci PSE, a zde budu mluvit koncepčně a pak o konkrétních projektech, které děláme v PSE, a dalších věcech, které vidím v ekosystému, je multi-agentní architektura. Neexistuje jediné schéma, které by bylo dokonalé pro veškerý stav Etherea. Ale pokud dokážeme rozdělit stav Etherea podle typu nebo podle vzorce přístupu, můžeme najít velmi dobrá schémata pro každý z nich.

Co kdybychom měli službu, která provozuje tuto multi-agentní architekturu, a v závislosti na typu dotazů a na tom, kde se mohou nacházet ve stavu Etherea, spustí jedno nebo druhé schéma? To už nás dostává velmi blízko k něčemu, co je proveditelné, schopné produkčního nasazení a co lze nabídnout ekosystému. To bude vyžadovat něco jako unifikované API, aby se peněženky, indexery, uživatelé a vývojáři decentralizovaných aplikací (dapp) nemuseli starat o to, jaké schéma se používá a jak ho volat. Prostě máte standardní API a o implementační detaily se stará někdo jiný.

Už to děláme a implementujeme dvě různá schémata. Otevřeme granty a snažíme se koordinovat více lidí v ekosystému, aby se s některými z nich vypořádali a zjistili, které jsou pro Ethereum nejvíce potřeba.

Zde je několik čísel o různých schématech PIR: propustnosti, komunikační režie a tak dále. Je to těžké, protože různé aplikace mají různé vzorce přístupu. Některé přistupují k mnoha účtenkám (receipts), některé chtějí přistupovat k větší části stavu, jako Rotki, a některé přistupují k více transakcím, jako Helios. Neexistuje žádné univerzální řešení a s největší pravděpodobností bude užitečná smíšená architektura. Děláme také systematizaci znalostí, takže pokud vás to zajímá, můžeme se o ni podělit. A zde jsou jen některé z týmů pracujících v těchto oblastech. Odpusťte mi, pokud jste součástí nějakého týmu a nezahrnul jsem vás; pokud někdo uvidí záznam a chybí tam, dejte mi prosím vědět a mohu vás začít přidávat.

#### Skrývání provozu: onion routing a Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Probrali jsme data. Dalším velkým balíkem je provoz. Jak skryjeme provoz a co chceme skrýt? Velmi zjednodušeně řečeno, chceme skrýt IP adresy klienta a serveru navzájem před sebou a před zbytkem světa, který by mohl provoz sledovat. Máme různé techniky: onion služby, mixnety, VPN, DC-nety a možná existují i další klasifikace. Budu mluvit jen o prvních dvou.

Techniky onion routingu šifrují ve vrstvách a provoz se také ve vrstvách dešifruje. Lidé uprostřed se nikdy nemohou dozvědět původ, někteří se nikdy nemohou dozvědět cíl a někteří se nedozvědí vůbec nic; fungují jen jako směrovače.

Ve zkratce (TL;DR): co kdyby veškerý provoz ekosystému Etherea mohl být směrován přes síť Tor, abych tak řekl? Existují i další možnosti. Pomohli bychom chránit IP adresu odesílatele: váš telefon nebo notebook by nebyl prozrazen, když odesíláte transakce nebo žádáte o informace. A samozřejmě bychom chránili i příjemce, server. Představte si, že v Íránu, Číně, Severní Koreji nebo Venezuele se někdo snaží hostovat DeFi protokol nebo službu a jeho země to cenzuruje. Toto je možnost, která by mohla ochránit jejich životy. Obchází to cenzuru a také to skrývá provoz před poskytovateli internetových služeb (ISP), o kterých všichni víme, že jsou napíchnuti zpravodajskými službami, které všechno sleduují.

Cílem je mít přímou náhradu (drop-in replacement): SDK, aby se peněženky, vývojáři dapp a poskytovatelé infrastruktury nemuseli starat o implementační detaily. Prostě vědí, že pokud použijí toto SDK, provoz se „onionizuje“, zašifruje a zabezpečí.

Je tu jeden tým, který chci vyzdvihnout, tým Brume Wallet, který vytvořil Echalote, open source implementaci Toru pro web. To už existuje: existují klienti Toru, ale jsou napsáni v C a musí běžet ve speciálním prohlížeči. Co když to chci přidat do MetaMasku, nebo do peněženky Kohaku, nebo do Ambire, Rabby a všech ostatních? Potřebujeme JavaScript SDK, a to je to, s čím Echalote začalo.

Dále má projekt Tor ve vývoji novou implementaci zvanou Arti, další generaci jejich klienta. Ale my potřebujeme vložené (embedded) Arti. Arti je založeno na jazyce Rust a musí být zkompilováno do WASM, aby mohlo běžet ve vašem prohlížeči, takže si ho můžete velmi snadno importovat. V podstatě spolupracujeme s týmem Toru: máme hovory každý týden a společné projekty a partnerství.

#### Mixnety pro Ethereum (18:16) {#mixnets-for-ethereum-1816}

Na straně mixnetů chci vyzdvihnout několik týmů, které k tomu přistupují: tým Nym; HOPR, také jeden z prvních; VPN jako Gnosis VPN; a pár dalších, které pro mě byly nové, jako Anyone Protocol, a myslím, že někdo z tohoto týmu by měl být tady v Denveru, plus některé další nové. Na mixnetech, VPN a dalších přístupech pracuje mnoho týmů.

Chceme zjistit: co kdybychom vytvořili účelový mixnet pro Ethereum, přes který bychom mohli směrovat RPC provoz? Mixnety mají silné záruky, ale přidávají velkou latenci. Pro některé případy použití je to v pořádku: nezáleží na tom, jestli to trvá o něco déle, pokud máte soukromí. Ale u věcí jako DeFi a obchodování je extrémně nepravděpodobné, že se ujmou, pokud přidají latenci. Takže, jak nejrychleji můžeme běžet s nejvyššími zárukami soukromí? Znovu zdravím některé z těchto týmů, a pokud někdo pracuje v těchto oblastech a nepřidal jsem vás, rád si s vámi popovídám.

#### Výkon: unifikované binární stromy a akcelerace GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Poslední věc, o které chci mluvit, třetí pilíř k tomu, aby se to stalo skutečností, je výkon. Chceme, aby tyto věci běžely rychle a levně. Mám takovou zásadu: tyto věci se neujmou, pokud budou náklady vyšší než přínos. Náklady znamenají uživatelskou zkušenost, čas a úsilí pro uživatele, ale také náklady pro vývojáře a infrastrukturu: je to velmi drahé na provoz? Musíme snížit náklady, jak jen to půjde, a existují dvě iniciativy na vysoké úrovni, o kterých mohu mluvit.

Jednou z nich je UBT (Unified Binary Tree). V závislosti na tom, jak moc se angažujete v návrzích EIP protokolu, jste o tom možná slyšeli. Právě teď máme Merkle-Patricia trie, což je užitečné, ale ne příliš užitečné pro ZK a další typy kryptografie. Existuje návrh, EIP-7864, který nepřechází na Verkle stromy, ale na unifikované binární stromy. To je mnohem efektivnější pro dotazování na stav a následné provádění kryptografických operací, jako je ZK, nad ním.

Máme projekt, který dělá ověřitelné UBT: přidáte sidecar k jakémukoli klientovi Etherea, který místo databáze MPT používá databázi stavu UBT, a pak pomocí zkVM dokážete, že tato transformace z MPT na UBT je platná. To je už samo o sobě velmi mocné. Jakmile se nám to podaří, lehcí klienti by to mohli využít ke zvýšení svého výkonu a věci jako PIR by mohly běžet mnohem rychleji.

Druhým aspektem je akcelerace GPU. Tyto věci můžeme spouštět mnohem rychleji, pokud optimalizujeme nižší vrstvy stacku: GPU je jednou z nich, nebo také akcelerace CPU. Tyto věci pravděpodobně poběží na serverech, ne na telefonech, takže je také velmi cenné začít zkoumat, jak můžeme vytvořit tyto nízkoúrovňové knihovny, aby běžely mnohem rychleji.

Když to zatím shrneme: máme těchto pět vrstev a chceme pokrýt tyto případy použití. Jsou tu tři pilíře: data, provoz a výkon. Pro data máme proxy servery, TEE, ORAM, OMAP a PIR. Pro provoz máme mixnety, onion routing a další. Pro výkon máme UBT a akceleraci GPU. Pokud si chcete přečíst více, alespoň o příspěvcích, které dělá PSE, můžete jít na pse.dev/research.

#### Měření úspěchu (22:15) {#measuring-success-2215}

Co je tedy úspěch a jak ho můžeme měřit? Když se vrátíme k těmto vrstvám: pokud chci mít možnost tvrdit, že Ethereum je ten nejvíce privátní řetězec, jaký je konečný cíl? Musel bych mít jistotu, že všechny tyto vrstvy jsou extrémně zabezpečené. Jak bych to měřil? Očekával bych, že více webových stránek a frontendů dapp bude hostováno za onion doménami. Byl bych rád, kdyby peněženky nativně používaly anonymní směrování, a stejně tak brány, poskytovatelé RPC a indexery. A měřil bych to v procentech.

Otázkou je: kolik ze současných frontendů v ekosystému Etherea je hostováno za onion doménou? Řekl bych, že extrémně málo, 1 %, pokud vůbec. Abych měl dobrý pocit a mohl říct, že jsme to dokázali, potřebovali bychom pravděpodobně více než 80 % na všech těchto vrstvách. Kolik peněženek právě teď směruje provoz přes techniky anonymního směrování? Velmi, velmi málo. To samé platí pro poskytovatele RPC: nabízejí tito poskytovatelé PIR? Ne. Takže pro mě tvrzení o úspěchu znamená, že aktéři na všech těchto vrstvách přijmou tyto typy technologií, alespoň 80 % týmů, provozu nebo dotazů.

#### Srovnání s onion uzly Bitcoinu (23:39) {#bitcoins-onion-node-comparison-2339}

To je jedna věc, kterou můžeme Bitcoinu závidět. Přes veškerou kritiku, které se jim dostává, toto je obrázek z listopadu loňského roku: 64 % jejich dosažitelných plných uzlů je skryto za onion doménami.

Můžeme to udělat sami? Toto je soukromí na nižší úrovni, na úrovni konsensu, ale mohli bychom říct, že naše plné uzly a validátory jsou za onion sítí nebo mixnety? Rozhodně si myslím, že bychom měli, a pravděpodobně jsme na méně než 1 %. Máme jiné výzvy, které oni nemají: běžíme mnohem rychleji a náš konsensus je jiný. Ale moc rád bych měl takovéto dashboardy a mohl říct, že více než 80 % peněženek přijalo tyto typy technologií, a poskytovatelé RPC, průzkumníci (explorers), frontendy, load balancery a SDK také. Byl bych moc rád, kdyby se tento seznam rozrůstal.

#### Srovnání Etherea s Monerem a Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Dovolil jsem si včera a předevčírem večer začít zkoumat, jak si ekosystém Etherea optikou těchto vrstev stojí v porovnání s věcmi jako Solana, Bitcoin, Zcash a Monero. Věci žlutě jsou volitelné (opt-in) techniky a myslím, že v tom jsme velmi dobří. Věci modře jsou návrhy, některé z nich jsou návrhy protokolu. Věci zeleně jsou vynucovány na vrstvě protokolu.

Vzhledem k naší desetileté historii veřejného řetězce si myslím, že bude těžké dohnat Monero a Zcash v tom, aby bylo soukromí nativní. Ale myslím si, že můžeme odvést opravdu dobrou práci v získávání volitelného (opt-in) přijetí a v kulturním a sociálním ovlivňování týmů a uživatelů, aby přijali více těchto technik. Bitcoin a Solana mají své vlastní výzvy a myslím, že budou více pozadu, alespoň v těchto věcech týkajících se soukromí.

#### Výzva: nejvíce privátní programovatelný ekosystém (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Mým cílem, a cílem, který vám chci vštípit do paměti, je, aby se Ethereum stalo tím nejvíce privátním, programovatelným ekosystémem na světě, nevyžadujícím povolení a nevyžadujícím důvěru. Máme jiné privátní platební řetězce, a to je skvělé, jsou velmi dobré, ale myslím si, že budou mít mnohem těžší úkol stát se programovatelnými a vytvořit ekosystém, který jsme vytvořili my.

Mojí výzvou pro vás, a samozřejmě i pro mě a můj tým, je stát se z programovatelných ekosystémů tím nejvíce nevyžadujícím povolení, nevyžadujícím důvěru a privátním. Nemůžeme se zaměřit pouze na onchain prvky. Musíme se zaměřit na všechny tyto vrstvy.

Takže pokud pracujete na privátním čtení, sítích, implementacích PIR, akceleraci GPU, datových strukturách, UBT, infrastruktuře nebo validátorech, moc rád si s vámi potom popovídám. Mnohokrát děkuji. Ethereum je pro soukromí.