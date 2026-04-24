---
title: Postkvantová kryptografie na Ethereu
description: Jak se Ethereum připravuje na postkvantovou éru, co je zranitelné a co se buduje pro jeho ochranu.
lang: cs
image: /images/roadmap/roadmap-future.png
alt: "Plán vývoje Etherea"
template: roadmap
summaryPoints:
  - Kvantové počítače nakonec ohrozí kryptografii, kterou Ethereum dnes používá
  - Nadace Ethereum má specializovaný postkvantový výzkumný tým a strukturovaný plán „Lean Ethereum“, jehož cílem je plná postkvantová ochrana do roku 2029
  - Vaše prostředky jsou dnes v bezpečí a software peněženky vás provede budoucí migrací
---

Kvantové počítače nakonec dokážou prolomit kryptografické metody, které dnes zabezpečují Ethereum a většinu dalších digitálních systémů. Tato stránka vysvětluje, co to znamená, jak síť proaktivně vyvíjí vylepšení ke zmírnění tohoto rizika a co potřebujete vědět.

## Proč je postkvantová kryptografie důležitá {#why-post-quantum-matters}

Ethereum spoléhá na několik forem [kryptografie](/glossary/#cryptography), aby udrželo síť v bezpečí a chránilo prostředky uživatelů. Nejdůležitější jsou:

- **Algoritmus digitálního podpisu na bázi eliptických křivek (ECDSA)**: Kryptografie používaná k podepisování transakcí. Na tom závisí bezpečnost vašeho účtu na Ethereu.
- **Podpisy BLS**: Používají je [validátoři](/glossary/#validator) k dosažení [konsensu](/glossary/#consensus) o stavu sítě.
- **Polynomiální závazky KZG**: Používají se pro [dostupnost dat](/glossary/#data-availability) v plánu škálování Etherea.
- **Systémy důkazů s nulovou znalostí (ZK-proof)**: Používají je rollupy a další aplikace k ověřování výpočtů offchain.

Všechny tyto metody spoléhají na matematické struktury, jako jsou Abelovy grupy, které jsou pro klasické počítače obtížné, ale kvantový počítač je dokáže efektivně vyřešit pomocí [Shorova algoritmu](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Kdy kvantové počítače ohrozí Ethereum? {#when-will-quantum-computers-threaten-ethereum}

V březnu 2026 publikovala společnost Google Quantum AI výzkum, který odhaduje, že prolomení 256bitové kryptografie eliptických křivek (typ, který Ethereum používá pro podpisy účtů) by mohlo vyžadovat zhruba 1 200 logických qubitů. Předchozí odhady uváděly toto číslo mnohem vyšší. Google si stanovil interní termín do roku 2029 pro migraci svých vlastních systémů na postkvantovou kryptografii.

Současný kvantový hardware má k tomuto měřítku daleko a pracuje s několika tisíci zašuměnými fyzickými qubity. Logické qubity (které opravují chyby a provádějí spolehlivé výpočty) vyžadují každý mnoho fyzických qubitů. **Mezera mezi současným hardwarem a tím, co je potřeba k prolomení kryptografie Etherea, zůstává značná, ale zmenšuje se rychleji, než mnozí očekávali.** Za zmínku stojí, že americký Národní institut standardů a technologie (NIST) předpokládá ukončení podpory ECDSA do roku 2030 a jeho zákaz do roku 2035.

Nejedná se o bezprostřední hrozbu. Kryptografické přechody však trvají roky a bezpečnostní model Etherea je navržen tak, aby vydržel staletí. Odpovědí Etherea je plán **Lean Ethereum**, promyšlená, víceletá mise s cílem přebudovat Ethereum na primitivech, která přežijí jakoukoli kryptografickou hrozbu.

## Čtyři oblasti zranitelné vůči kvantovému útoku {#four-vulnerable-areas}

V únoru 2026 Vitalik Buterin [zveřejnil plán](https://x.com/VitalikButerin/status/2027075026378543132), který identifikuje čtyři odlišné oblasti kryptografie Etherea, jež potřebují postkvantová vylepšení. Každá z nich má jiné výzvy a jiné cesty k řešení.

### 1. Podpisy BLS na vrstvě konsensu {#consensus-bls}

**Co to dělá**: Protokol [důkaz podílem (PoS)](/glossary/#pos) Etherea používá podpisy BLS k agregaci hlasů od stovek tisíc validátorů. BLS umožňuje spojit mnoho podpisů do jednoho, čímž udržuje síť efektivní.

**Proč je to zranitelné**: Podpisy BLS spoléhají na párování eliptických křivek, které by kvantový počítač mohl prolomit.

**Přístup**: Plán Lean Consensus zahrnuje vývoj dvou doplňujících se nástrojů:
- **leanXMSS**: Ethereum nahradí podpisy BLS pomocí leanXMSS, což je schéma podpisů založené na hashi pro validátory. Podpisy založené na hashi jsou považovány za kvantově bezpečné, protože spoléhají pouze na bezpečnost hashovacích funkcí, které kvantové počítače sice oslabují, ale neprolomí.
- **leanVM**: Minimální zkVM (virtuální stroj s nulovým vědomím) pro agregaci podpisů založenou na SNARK. Protože podpisy založené na hashi jsou výrazně větší (zhruba 3 000 bajtů ve srovnání s 96 bajty u BLS), přechod na leanXMSS by produkoval podstatně více dat na slot. K vyřešení tohoto problému funguje leanVM jako agregační engine, který komprimuje data 250krát. Tím se zachovávají výhody efektivity spojení mnoha podpisů do jednoho, a to i po přechodu na kvantově bezpečná schémata.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Vlastnost agregace, díky které je BLS efektivní (spojení stovek tisíc podpisů do jednoho), nemá zřejmý kvantově bezpečný ekvivalent. Postkvantové podpisy jsou také mnohem větší než podpisy BLS. Pouhá výměna jednoho za druhý by způsobila, že by vrstva konsensu Etherea byla výrazně pomalejší a dražší. Proto tým buduje leanVM, nástroj, který využívá důkazy s nulovou znalostí k efektivní agregaci kvantově bezpečných podpisů.

</ExpandableCard>

### 2. Dostupnost dat: Závazky KZG {#data-availability-kzg}

**Co to dělá**: Polynomiální závazky KZG zajišťují, že data (zejména data [blobů](/glossary/#blob) z rollupů) jsou v síti dostupná, aniž by každý uzel musel stahovat všechna.

**Proč je to zranitelné**: Závazky KZG spoléhají na párování eliptických křivek, stejnou matematickou strukturu, na kterou mohou kvantové počítače zaútočit.

**Současné zmírnění**: Závazky KZG používají „důvěryhodné nastavení“, do kterého mnoho účastníků přispělo náhodností. Dokud byl alespoň jeden účastník čestný a zahodil své tajemství, je nastavení bezpečné, a to i proti kvantovým počítačům, které by se ho pokusily zpětně analyzovat.

**Dlouhodobé řešení**: Nahradit KZG kvantově bezpečným schématem závazků. Dva hlavní kandidáti jsou:
- **Závazky založené na STARK**: Spoléhají na hashovací funkce spíše než na eliptické křivky. Již se používají v některých ZK-rollupech.
- **Závazky založené na mřížkách**: Spoléhají na obtížnost mřížkových problémů, o kterých se předpokládá, že jsou kvantově odolné.

Oba přístupy jsou stále zkoumány z hlediska efektivity a praktičnosti v měřítku Etherea.

### 3. Podpisy účtů: ECDSA {#eoa-signatures}

**Co to dělá**: Každý standardní účet na Ethereu (externě vlastněný účet, neboli [EOA](/glossary/#eoa)) používá ECDSA na křivce secp256k1 k podepisování transakcí. To je to, co chrání vaše prostředky.

**Proč je to zranitelné**: U každého účtu, který odeslal transakci, je veřejný klíč odhalen onchain. Kvantový počítač by mohl odvodit soukromý klíč z těchto odhalených dat veřejného klíče.

**Důležitá nuance**: Účty, které pouze přijaly ether a nikdy neodeslaly transakci, neodhalily svůj veřejný klíč. Viditelná je pouze adresa (hash veřejného klíče), což poskytuje určitou dodatečnou ochranu.

**Přístup**: Spíše než jedinou migraci v rámci celého protokolu plánuje Ethereum použít [abstrakci účtu](/roadmap/account-abstraction/) (konkrétně EIP-8141, o kterém se uvažuje pro Hegotá ve druhé polovině roku 2026), aby uživatelům poskytlo **agilitu podpisů**. Jednotlivé účty by mohly přejít na postkvantové schéma podpisů, aniž by musely čekat na změnu celého protokolu.

Jedná se o pragmatický přístup. Uživatelé a peněženky, kteří chtějí postkvantovou ochranu dříve, ji mohou přijmout dobrovolně, zatímco širší migrace proběhne postupně.

### 4. Důkazy s nulovou znalostí (ZK-proofs) na aplikační vrstvě {#zk-proofs}

**Co to dělá**: Systémy důkazů s nulovou znalostí používají rollupy na vrstvě 2 (L2) a další aplikace k ověřování výpočtů bez odhalení podkladových dat.

**Proč je to zranitelné**: Mnoho populárních systémů ZK-proof (SNARK využívající párování eliptických křivek) spoléhá na předpoklady zranitelné vůči kvantovým počítačům.

**Přístup**: STARK, které spoléhají na hashovací funkce spíše než na eliptické křivky, jsou již kvantově odolné a používá je několik rollupů. Přirozené přijetí systémů založených na STARK v ekosystému již poskytuje postkvantovou bezpečnost na aplikační vrstvě.

## Standardy NIST {#nist-standards}

V srpnu 2024 americký Národní institut standardů a technologie (NIST) [finalizoval tři standardy postkvantové kryptografie](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Ty jsou důležité, protože poskytují celému technologickému průmyslu, včetně Etherea, sdílenou sadu prověřených algoritmů, na kterých lze stavět, místo aby každý projekt vymýšlel své vlastní.

| Standard | Název | Typ | Případ užití |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Založeno na mřížkách | Zapouzdření klíče (výměna klíčů) |
| FIPS 204 | ML-DSA (Dilithium) | Založeno na mřížkách | Digitální podpisy |
| FIPS 205 | SLH-DSA (SPHINCS+) | Založeno na hashi | Digitální podpisy |

Tyto standardy poskytují základ pro postkvantový přechod širšího průmyslu. Práce Etherea na nich staví a rozšiřuje je, se zvláštním zaměřením na jedinečné výzvy decentralizované sítě, kde záleží na efektivitě a agregaci.

## Přístup Nadace Ethereum {#ef-approach}

Nadace Ethereum vytvořila v lednu 2026 specializovaný tým pro postkvantovou bezpečnost (Post-Quantum Security), který vede Thomas Coratger. Práce týmu je veřejně sledována na [pq.ethereum.org](https://pq.ethereum.org).

### Současná aktivita (k dubnu 2026) {#current-activity}

- **Týdenní devnety pro interoperabilitu**: Více než 10 klientských týmů se účastní pravidelného testování postkvantové interoperability, včetně Lighthouse, Grandine, Zeam, Ream Labs a PierTwo.
- **Cena Poseidon**: Výzkumná cena ve výši 1 milionu dolarů zaměřená na vylepšení kryptografických primitiv založených na hashi.
- **Open-source implementace**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) a leanMultisig jsou všechny dostupné v rámci [organizace leanEthereum na GitHubu](https://github.com/leanEthereum).
- **2. ročník PQ Research Retreat**: Plánováno na 9. až 12. října 2026 v Cambridge ve Velké Británii.
- **Soulad s NIST**: Práce Etherea staví na standardech postkvantové kryptografie, které NIST finalizoval v srpnu 2024 (jako jsou ML-KEM, ML-DSA a SLH-DSA).

### Milníky migrace {#migration-milestones}

Tým nastínil řadu upgradů protokolu, které mají do Etherea postupně zavést postkvantovou kryptografii. Jedná se o plánovací milníky, nikoli o zaručené závazky. Názvy a pořadí se mohou změnit.

| Milník | Co přináší |
|-----------|--------------------|
| I* | Registr PQ klíčů. Validátoři mohou registrovat postkvantové veřejné klíče vedle stávajících klíčů BLS. |
| J* | Prekompilace pro ověřování PQ podpisů. Chytré kontrakty a peněženky mohou nativně ověřovat PQ podpisy. |
| L* | PQ atestace a důkazy na vrstvě konsensu v reálném čase prostřednictvím leanVM. Validátoři začínají používat PQ podpisy pro konsensus. |
| M* | Plná agregace PQ podpisů a PQ bezpečné závazky blobů. |

**Cíl**: Strukturované milníky forků cílí na dokončení základní postkvantové infrastruktury přibližně do roku 2029. Plná migrace prováděcí vrstvy a ekosystému přesahuje tento rámec.

## Co musí uživatelé udělat? {#what-users-need-to-do}

**Právě teď: nic.** Vaše prostředky jsou v bezpečí. Žádný dnešní kvantový počítač nemůže ohrozit kryptografii Etherea.

**V budoucnu**: Jakmile budou postkvantová schémata podpisů na Ethereu široce podporována (očekává se po hard forku Hegotá a implementaci EIP-8141), budete chtít migrovat svůj účet na kvantově bezpečné podpisy. Software peněženky vás tímto přechodem provede.

Pokud váš účet nikdy neodeslal transakci (což znamená, že váš veřejný klíč nebyl odhalen onchain), má další vrstvu ochrany. Všechny účty by však měly nakonec migrovat.

Otázka, jak naložit s neaktivními peněženkami (účty, jejichž majitelé si možná nejsou vědomi nutnosti migrace), je otevřeným tématem správy. Komunita Etherea v této věci zatím nedosáhla konsensu.

## Často kladené otázky {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Ne.** Žádný dnešní kvantový počítač nedokáže prolomit kryptografii Etherea. Současný kvantový hardware má k potřebnému měřítku daleko. Práce popsaná na této stránce je přípravou na budoucnost, nikoli reakcí na aktivní hrozbu.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Odhady se liší. Výzkum společnosti Google z března 2026 naznačuje, že hardware potřebný k prolomení 256bitové kryptografie eliptických křivek by mohl dorazit nejdříve někdy kolem konce tohoto desetiletí, ale stále zbývají značné inženýrské výzvy. Většina výzkumníků považuje realistickou hrozbu za vzdálenou minimálně několik let. Upřímná odpověď zní, že nikdo nezná přesnou časovou osu, což je přesně ten důvod, proč je důležité se připravit již nyní.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Nakonec ano. Jakmile budou na Ethereu k dispozici postkvantová schémata podpisů, uživatelé budou chtít migrovat své účty. Software peněženky tento přechod pravděpodobně zvládne za vás. Prozatím nemusíte dělat nic. Až bude potřeba jednat, komunita Etherea a vývojáři peněženek poskytnou jasné pokyny a nástroje.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Aktiva na Ethereu jsou řízena podpisy účtů. Jakmile je váš účet migrován na kvantově bezpečné schéma podpisů, vše na tomto účtu je chráněno. Nemusíte migrovat každé aktivum zvlášť. Chytré kontrakty, které drží prostředky (jako protokoly decentralizovaných financí (DeFi)), mohou potřebovat vlastní upgrady v závislosti na tom, jaká kryptografická primitiva interně používají.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Ne. Ethereum má jeden z nejstrukturovanějších postkvantových programů ze všech blockchainů: specializovaný tým, financovaný výzkum, týdenní devnety a zveřejněný plán migrace, přičemž s kvantovými výpočty zachází jako s prvořadým omezením návrhu. Žádný blockchain zatím nedokončil plný postkvantový přechod. Podle odhadů Nadace Ethereum je expozice neaktivních prostředků Etherea zranitelných vůči kvantovým počítačům přibližně 0,1 %, což je drasticky méně než u jiných velkých blockchainových sítí.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

„Sklízej teď, dešifruj později“ (Harvest now, decrypt later) je útok, při kterém někdo dnes zaznamená zašifrovaná data nebo odhalené veřejné klíče a později šifrování prolomí, jakmile bude existovat dostatečně výkonný kvantový počítač. Pro Ethereum je to nejrelevantnější u účtů, jejichž veřejné klíče jsou již odhaleny onchain (jakýkoli účet, který odeslal transakci). To je jeden z důvodů, proč komunita považuje postkvantovou migraci za časově citlivou, i když kvantová hrozba ještě není bezprostřední.

</ExpandableCard>

## Další čtení {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Nadace Ethereum_
- [Projekt postkvantové kryptografie](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Standardy postkvantové kryptografie NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Ochrana kryptoměn zodpovědným zveřejňováním kvantových zranitelností](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Kvantové hranice mohou být blíž, než se zdá](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG a důvěryhodná nastavení](/roadmap/danksharding/#what-is-kzg)
- [Zdroje z workshopu leanVM + PQ na Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Hovory ACD Breakout k PQ podpisům transakcí](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Nadace Ethereum_
- [Hovory ACD Breakout k PQ interoperabilitě](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Nadace Ethereum_
- [Playlist Lean Ethereum a postkvantová bezpečnost na YouTube](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Nadace Ethereum_
- [Panelový rozhovor o postkvantové odolnosti](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Abstrakce účtu na Ethereu](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Architektura EF_
- [Superpositioned: Analýza průmyslu kvantových výpočtů](https://www.superpositioned.co/) - _Saneel Sreeni_