---
title: FAQ ke Cancun-Deneb (Dencun)
description: Často kladené dotazy k vylepšení sítě s názvem Cancun-Deneb (Dencun)
lang: cs
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) je vylepšení sítě Ethereum, které aktivuje **Proto-Danksharding (EIP-4844)**, zavádějící dočasné datové **bloby** za účelem zlevnění ukládání dat [druhých vrstev (L2)](/glossary/#layer-2) – rollupů.

Nový typ transakce umožňuje poskytovatelům rollupů ukládat data nákladově efektivněji v tzv. „blobech“. Bloby jsou s jistotou dostupné na blockchainu přibližně 18 dní (přesněji 4 096 [epoch](/glossary/#epoch)). Po tomto období jsou bloby ze sítě odstraněny, ale aplikace mohou i tak ověřovat platnost svých dat pomocí důkazů.

Toto výrazně snižuje náklady rollupů, omezuje nepřiměřený růst řetězce a podporuje více uživatelů při zachování bezpečnosti a decentralizovaného souboru operátorů uzlů.

## Kdy můžeme očekávat snížení poplatků rollupů díky Proto-Dankshardingu? {#when}

- Tento upgrade byl aktivován během epochy 269568, **13. března 2024 ve 13:55 (UTC)**
- Všichni hlavní poskytovatelé rollupů, jako Arbitrum nebo Optimism, oznámili, že bloby budou podporovány ihned po vylepšení
- Časový rámec pro podporu jednotlivých rollupů se může lišit, protože každý poskytovatel musí aktualizovat své systémy, aby mohl využívat nový prostor pro bloby

## Jak mohu posílat ETH po hard forku? {#scam-alert}

- **S vašimi prostředky nemusíte nic dělat**: Po vylepšení Ethereum Dencun není potřeba ETH převádět nebo vylepšovat. Zůstatky na vašem účtu se nezmění a ETH, které aktuálně držíte, zůstanou po hard forku přístupné ve své stávající podobě.
- **Pozor na podvody!** <Emoji text="⚠️" /> **Každý, kdo vás vyzývá k „upgradu“ vašich ETH, se vás snaží podvést.** V souvislosti s tímto vylepšením nemusíte podnikat žádné kroky. Vaše aktiva zůstanou nedotčena. Pamatujte, že informovanost je nejlepší obranou proti podvodům.

[Více o rozpoznávání a vyhýbání se podvodům](/security/)

## Jaký problém řeší upgrade sítě Dencun? {#network-impact}

Dencun se primárně zaměřuje na **škálovatelnost** (zvládání více transakcí a více uživatelů najednou) s **dostupnými poplatky**, při **zachování decentralizace** sítě.

Ethereovská komunita přijala pro svůj růst přístup „zaměřený na rollupy“, díky čemuž jsou rollupy druhé vrstvy primárním prostředkem pro bezpečnou podporu většího počtu uživatelů.

Sítě rollupů zpracovávají transakce odděleně od hlavní sítě a následně publikují kryptografický důkaz a/nebo komprimovaná transakční data výsledků transakcí zpět na hlavní síť, kde se zaznamenávají. Takový záznam nese náklady (ve formě [poplatků za palivo](/glossary/#gas)) a před Proto-Dankshardingem museli všichni operátoři síťových uzlů ukládat tyto informace trvale, což bylo velmi nákladné.

Zavedení Proto-Dankshardingu v rámci vylepšení Dencun umožňuje levnější úložiště pro tyto důkazy tím, že od operátorů uzlů vyžaduje ukládání těchto dat přibližně 18 dní, po kterých mohou být bezpečně odstraněna, což snižuje požadavky na hardware.  Vzhledem k tomu, že rollupy obvykle mají dobu výběru nastavenou na 7 dní, pokud jsou bloby dostupné na vrstvě L1 po tuto dobu, jejich bezpečnostní model zůstává nezměněn. 18denní okno tak znamená významnou rezervu.

[Další informace o škálování Etherea](/roadmap/scaling/)

## Jak se přistupuje ke starým datovým blobům? {#historical-access}

Zatímco běžné uzly Etherea budou vždy ukládat _aktuální stav_ sítě, historická data blobů mohou být odstraněna přibližně 18 dní po jejich uložení. Před odstraněním těchto dat Ethereum zajistí, aby byla zpřístupněna všem účastníkům sítě, čímž poskytne čas na:

- stažení a uložení dat, pokud je o to zájem,
- dokončení všech cyklů rollupů,
- finalizaci transakcí na rollupech.

_Historická_ data blobů mohou být potřebná z různých důvodů a mohou být uložena a zpřístupněna pomocí několika decentralizovaných protokolů:

- **Protokoly indexování třetích stran**, jako je The Graph, tato data ukládají prostřednictvím decentralizované sítě operátorů uzlů motivovaných krypto-ekonomickými mechanismy.
- **BitTorrent** je decentralizovaný protokol, kde mohou dobrovolníci ukládat a distribuovat tato data ostatním.
- Cílem **[ethereovské portálové sítě](/developers/docs/networking-layer/portal-network/)** je poskytnout přístup ke všem jeho datům prostřednictvím decentralizované sítě operátorů uzlů pomocí rozdělení dat mezi účastníky podobně jako BitTorrent.
- I **jednotliví uživatelé** si vždy mohou uložit své vlastní kopie jakýchkoliv dat, která si přejí uchovávat pro historické účely.
- **Poskytovatelé rollupů** jsou motivováni k ukládání a zlepšování uživatelských možností během interakce s rollupy.
- **Průzkumníci bloků** typicky provozují archivní uzly, které indexují a ukládají všechny tyto informace pro snadné historické odkazování, přístupné uživatelům prostřednictvím webového rozhraní.

Poznámka: Obnova historického stavu funguje na **modelu důvěry 1-z-N**. To znamená, že potřebujete data pouze z _jediného důvěryhodného zdroje_, abyste ověřili jejich správnost pomocí aktuálního stavu sítě.

## Jak tento upgrade přispívá k širšímu plánu Etherea? {#roadmap-impact}

Proto-Danksharding připravuje půdu pro úplnou implementaci [Dankshardingu](/roadmap/danksharding/). Danksharding je navržen tak, aby rozložil úložiště dat rollupů mezi operátory uzlů tak, aby každý operátor musel zpracovat pouze malou část z celkových dat. Toto rozložení zvýší počet datových blobů na jeden blok, což je nezbytné pro škálování Etherea za účelem podpory většího množství uživatelů a transakcí.

Tato škálovatelnost je zásadní pro [podporu miliard uživatelů na Ethereu](/roadmap/scaling/) s dostupnými poplatky a pokročilejšími aplikacemi při zachování decentralizované sítě. Bez těchto změn by požadavky na hardware pro operátory uzlů rostly, což by vedlo k potřebě stále dražšího vybavení. To by mohlo vyřadit menší operátory, což by vedlo ke koncentraci kontroly nad sítí mezi několik velkých operátorů, což by bylo v rozporu s principem decentralizace.

## Ovlivňuje tento upgrade všechny konsenzus klienty a validátory Etherea? {#client-impact}

Ano, Proto-Danksharding (EIP-4844) vyžaduje aktualizace jak pro klienty zajišťující posílání transakcí (exekuční klienty), tak pro konsenzus klienty. Všechny hlavní klienty Etherea vydaly verze podporující toto vylepšení. Aby operátoři uzlů po vylepšení udrželi synchronizaci se sítí Ethereum, musí si ověřit, že používají podporovanou verzi klienta. Nezapomínejte, že informace o vydání upgradů klientů jsou časově citlivé, a uživatelé by měli sledovat nejnovější aktualizace pro nejaktuálnější podrobnosti. [Další informace o podporovaných verzích klientů](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Konsenzus klienty spravují software _validátora_, který byl kompletně aktualizován, aby mohl tato vylepšení využívat.

## Jak ovlivňuje Cancun-Deneb (Dencun) Goerli nebo jiné testovací sítě Etherea? {#testnet-impact}

- Devnety, Goerli, Sepolia a Holesky prošly upgradem Dencun a mají plně funkční Proto-Danksharding.
- Vývojáři rollupů mohou využít tyto sítě pro testování EIP-4844.
- Většina uživatelů nebude touto změnou v jednotlivých testovacích sítích nijak ovlivněna.

## Budou všechny transakce na L2 nyní využívat dočasný prostor pro bloby, nebo si budu moci úložiště vybrat? {#calldata-vs-blobs}

Transakce rollupů na druhé vrstvě (L2) Etherea mají možnost využívat dva typy úložiště dat: dočasný prostor pro bloby nebo trvalý úložný prostor pro data chytrých kontraktů (calldata). Prostor pro bloby je ekonomickou volbou, která poskytuje dočasné úložiště za nižší cenu. Zaručuje dostupnost dat pro všechna potřebná období výzev. Na druhou stranu, calldata nabízí trvalé úložiště, to je ale dražší.

Rozhodnutí, zda použijí prostor pro bloby, nebo calldata, je primárně na poskytovatelích rollupů. Ti se rozhodují na základě aktuální poptávky po prostoru pro bloby. Pokud je poptávka po prostoru pro bloby v určitém momentu příliš vysoká, rollupy mohou zvolit calldata, aby zajistily včasné odeslání dat.

Ačkoliv je teoreticky možné, aby si uživatelé vybrali preferovaný typ úložiště, poskytovatelé rollupů tuto volbu obvykle dělají sami. Poskytnutí této volby uživatelům by přidalo na složitosti, zejména při nákladově efektivním seskupování transakcí. Pro konkrétní detaily ohledně této volby by uživatelé měli nahlédnout do dokumentace jednotlivých poskytovatelů rollupů.

## Sníží 4844 poplatky za palivo na vrstvě L1? {#l1-fee-impact}

Ne zásadně. Prostor pro bloby, který využívají poskytovatelé rollupů, má svůj vlastní nový trh s poplatky za palivo. _I když se poplatky na L1 mohou snížit díky přesunu dat rollupů do blobů, toto vylepšení se primárně zaměřuje na snížení poplatků na vrstvě L2. Snížení poplatků na L1 (hlavní síť) může nastat jako sekundární efekt v menší míře._

- Snížení poplatků na L1 bude úměrné adopci, tedy používání datových blobů poskytovateli rollupů.
- Poplatky za palivo na L1 pravděpodobně zůstanou konkurenceschopné, ale to bude díky činnostem, které s rollupy nesouvisejí.
- Rollupy, které budou prostor pro bloby využívat, budou potřebovat méně poplatků za palivo na L1, což pomůže krátkodobě snížit poplatky za palivo na L1.
- Prostor pro bloby je stále omezený, takže pokud budou bloby v rámci bloku nasyceny/plné, rollupy mohou být nuceny odesílat svá data do permanentního úložiště, což by mohlo zvýšit ceny paliva na L1 i L2.

## Sníží to poplatky na jiných EVM blockchainech vrstvy 1? {#alt-l1-fee-impact}

Ne. Výhody Proto-Dankshardingu jsou specifické pro rollupy druhé vrstvy Etherea, které ukládají své důkazy na vrstvě 1 (hlavní síť).

Pouhá kompatibilita s virtuálním strojem Etherea (EVM) neznamená, že síť bude mít z tohoto upgradu nějaký prospěch. Sítě, které fungují nezávisle na Ethereu (ať už jsou kompatibilní s EVM, nebo ne), neukládají svá data na Ethereum a z tohoto upgradu nebudou mít žádný prospěch.

[Další informace o rollupech druhé vrstvy](/layer-2/)

## Učíte se spíše vizuálně? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Unlocking Ethereum's Scaling, EIP-4844 – Finematics_

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 with Domothy – Bankless_

## Further reading {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transakce shard blobů (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Oznámení o spuštění vylepšení Dencun na hlavní síti](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) – _blog Ethereum Foundation_
- [Stopařův průvodce po Ethereu: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) – _Jon Charbonneau_
- [Často kladené otázky o Proto-Dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) – _Vitalik Buterin_
- [Podrobné vysvětlení EIP-4844: Jádro upgradu Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) – _Ebunker_
- [Aktualizace AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) – _Tim Beiko_
