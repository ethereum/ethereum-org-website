---
title: Časová osa všech forků Etherea (od roku 2014 do současnosti)
description: Historie blockchainu Ethereum včetně hlavních milníků, vydání a forků.
lang: cs
sidebarDepth: 1
authors: ["Nixo"]
---

Časová osa všech hlavních milníků, forků a aktualizací blockchainu [Ethereum](/).

<ExpandableCard title="Co jsou forky?" contentPreview="Změny pravidel protokolu Ethereum, které často zahrnují plánované technické aktualizace.">

K forkům dochází, když je potřeba provést hlavní technické aktualizace nebo změny sítě – obvykle vycházejí z [Návrhů na vylepšení Etherea (EIPs)](/eips/) a mění „pravidla“ protokolu.

Když jsou potřeba aktualizace v tradičním, centrálně řízeném softwaru, společnost jednoduše vydá novou verzi pro koncového uživatele. Blockchainy fungují jinak, protože neexistuje žádné centrální vlastnictví. [Klienti Etherea](/developers/docs/nodes-and-clients/) musí aktualizovat svůj software, aby implementovali nová pravidla forku. Navíc tvůrci bloků (těžaři ve světě důkazu prací (PoW), validátoři ve světě důkazu podílem (PoS)) a uzly musí vytvářet bloky a validovat je podle nových pravidel. [Více o mechanismech konsensu](/developers/docs/consensus-mechanisms/)

Tyto změny pravidel mohou vytvořit dočasné rozdělení sítě. Nové bloky by mohly být produkovány podle nových nebo starých pravidel. Na forcích se obvykle dohodne předem, aby klienti přijali změny jednotně a fork s aktualizacemi se stal hlavním řetězcem. V ojedinělých případech však mohou neshody ohledně forků způsobit trvalé rozdělení sítě – nejznámějším případem je vznik sítě Ethereum Classic při <a href="#dao-fork">DAO forku</a>.

</ExpandableCard>

<ExpandableCard title="Proč mají některé aktualizace více názvů?" contentPreview="Názvy aktualizací se řídí určitým vzorem">

Software, na kterém je Ethereum založeno, se skládá ze dvou polovin, známých jako [exekuční vrstva](/glossary/#execution-layer) a [vrstva konsensu](/glossary/#consensus-layer).

**Pojmenování aktualizací exekuční vrstvy**

Od roku 2021 jsou aktualizace **exekuční vrstvy** pojmenovávány podle jmen měst [předchozích míst konání konferencí Devcon a Devconnect](https://devcon.org/en/past-events/) v chronologickém pořadí:

| Název aktualizace | Rok Devcon(nect)u | Číslo Devconu | Datum aktualizace     |
| ----------------- | ----------------- | ------------- | --------------------- |
| Berlín            | 2014              | 0             | 15. dubna 2021        |
| Londýn            | 2015              | I             | 5. srpna 2021         |
| Šanghaj           | 2016              | II            | 12. dubna 2023        |
| Cancún            | 2017              | III           | 13. března 2024       |
| Praha             | 2018              | IV            | 7. května 2025        |
| Ósaka             | 2019              | V             | 3. prosince 2025      |
| **Amsterdam**     | 2022              | Devconnect    | Bude oznámeno - Další |
| _Bogotá_          | 2022              | VI            | Bude oznámeno         |
| _Istanbul_        | 2023              | Devconnect    | Bude oznámeno         |
| _Bangkok_         | 2024              | VII           | Bude oznámeno         |
| _Buenos Aires_    | 2025              | Devconnect    | Bude oznámeno         |
| _Mumbai_          | 2026              | VIII          | Bude oznámeno         |

**Pojmenování aktualizací vrstvy konsensu**

Od spuštění [Beacon chainu](/glossary/#beacon-chain) jsou aktualizace **vrstvy konsensu** pojmenovávány po hvězdách začínajících na písmena v abecedním pořadí:

| Název aktualizace                                         | Datum aktualizace     |
| --------------------------------------------------------- | --------------------- |
| Geneze Beacon chainu                                      | 1. prosince 2020      |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27. října 2021        |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6. září 2022          |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12. dubna 2023        |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13. března 2024       |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7. května 2025        |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3. prosince 2025      |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | Bude oznámeno - Další |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Bude oznámeno         |

**Kombinované pojmenování**

Aktualizace exekuční vrstvy a vrstvy konsensu byly zpočátku zaváděny v různých časech, ale po [Merge](/roadmap/merge/) v roce 2022 jsou nasazovány současně. Proto vznikly hovorové výrazy, které zjednodušují odkazování na tyto aktualizace pomocí jediného spojeného termínu. Začalo to aktualizací _Šanghaj-Capella_, běžně označovanou jako „**Shapella**“, a pokračuje to i u následujících aktualizací.

| Aktualizace exekuční vrstvy | Aktualizace vrstvy konsensu | Krátký název  |
| --------------------------- | --------------------------- | ------------- |
| Šanghaj                     | Capella                     | „Shapella“    |
| Cancún                      | Deneb                       | „Dencun“      |
| Praha                       | Electra                     | „Pectra“      |
| Ósaka                       | Fulu                        | „Fusaka“      |
| Amsterdam                   | Gloas                       | „Glamsterdam“ |
| Bogotá                      | Heze                        | „Hegotá“      |

</ExpandableCard>

Přeskočte rovnou na informace o některých obzvláště důležitých minulých aktualizacích: [Beacon chain](/roadmap/beacon-chain/); [Merge](/roadmap/merge/); a [EIP-1559](#london)

Hledáte budoucí aktualizace protokolu? [Přečtěte si o nadcházejících aktualizacích v roadmapě Etherea](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka („Fusaka“) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Více o Fusaka](/roadmap/fusaka/)

### Prague-Electra („Pectra“)
<NetworkUpgradeSummary name="pectra" />

Aktualizace Prague-Electra („Pectra“) zahrnovala několik vylepšení protokolu Ethereum zaměřených na zlepšení uživatelské zkušenosti pro všechny uživatele, sítě vrstvy 2, stakery a provozovatele uzlů.

Staking byl vylepšen o účty validátorů se složeným úročením a o lepší kontrolu nad stakovanými prostředky pomocí exekuční adresy pro výběr. EIP-7251 zvýšil maximální efektivní zůstatek pro jednoho validátora na 2048, což zlepšuje kapitálovou efektivitu pro stakery. EIP-7002 umožnil exekučnímu účtu bezpečně spouštět akce validátora, včetně výstupu nebo výběru části prostředků, což zlepšuje zkušenost pro stakery ETH a zároveň pomáhá posílit odpovědnost provozovatelů uzlů.

Další části aktualizace se zaměřily na zlepšení zkušenosti běžných uživatelů. EIP-7702 přinesl běžným účtům, které nejsou chytrými kontrakty ([EOA](/glossary/#eoa)), schopnost spouštět kód podobně jako chytrý kontrakt. To odemklo neomezené nové funkce pro tradiční účty Etherea, jako je dávkování transakcí, sponzorování gasu, alternativní ověřování, programovatelné kontroly výdajů, mechanismy obnovy účtu a další.

<ExpandableCard title="EIP pro Pectru" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

Lepší uživatelská zkušenost:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Nastavení kódu EOA účtu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Zvýšení propustnosti blobů</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Zvýšení ceny za data volání</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Přidání plánu blobů do konfiguračních souborů EL</em></li>
</ul>

Lepší zkušenost se stakingem:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Zvýšení <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Výstupy spustitelné exekuční vrstvou</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Požadavky exekuční vrstvy pro obecné účely</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Poskytování vkladů validátorů onchain</em></li>
</ul>

Zlepšení efektivity a bezpečnosti protokolu:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Předkompilovaný kontrakt pro operace na křivce BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Ukládání historických hashů bloků do stavu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Přesun indexu výboru mimo atestaci</em></li>
</ul>

</ExpandableCard>

- [Jak Pectra zlepší zkušenost se stakingem](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Přečtěte si specifikace aktualizace Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Časté dotazy k aktualizaci Prague-Electra („Pectra“)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancún-Deneb („Dencun“) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Shrnutí aktualizace Cancún {#cancun-summary}

Aktualizace Cancún obsahuje sadu vylepšení _exekuce_ Etherea zaměřených na zlepšení škálovatelnosti, a to v tandemu s aktualizacemi konsensu Deneb.

Zejména to zahrnuje EIP-4844, známý jako **proto-danksharding**, který významně snižuje náklady na ukládání dat pro rollupy vrstvy 2. Toho je dosaženo zavedením datových „blobů“, které umožňují rollupům odesílat data na Mainnet na krátkou dobu. To má za následek výrazně nižší transakční poplatky pro uživatele rollupů vrstvy 2.

<ExpandableCard title="EIP pro Cancún" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Operační kódy pro dočasné úložiště</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Kořen beacon bloku v EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transakce shardových blobů (proto-danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instrukce pro kopírování paměti</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> pouze ve stejné transakci</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Operační kód <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Rollupy vrstvy 2](/layer-2/)
- [Proto-danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Přečtěte si specifikaci aktualizace Cancún](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Shrnutí aktualizace Deneb {#deneb-summary}

Aktualizace Deneb obsahuje sadu vylepšení _konsensu_ Etherea zaměřených na zlepšení škálovatelnosti. Tato aktualizace přichází v tandemu s exekučními aktualizacemi Cancún, aby umožnila proto-danksharding (EIP-4844), spolu s dalšími vylepšeními pro Beacon chain.

Předem vygenerované podepsané „zprávy o dobrovolném výstupu“ již nevyprší, což dává větší kontrolu uživatelům, kteří provádějí staking svých prostředků u provozovatele uzlu třetí strany. S touto podepsanou zprávou o výstupu mohou stakeři delegovat provoz uzlu a zároveň si zachovat možnost kdykoli bezpečně provést výstup a výběr svých prostředků, aniž by museli kohokoli žádat o povolení.

EIP-7514 přináší zpřísnění emise ETH tím, že omezuje limit fluktuace, se kterým se mohou validátoři připojit k síti, na osm (8) za epochu. Vzhledem k tomu, že emise ETH je úměrná celkovému množství ETH ve stakingu, omezení počtu připojujících se validátorů zastropuje _tempo růstu_ nově emitovaných ETH a zároveň snižuje hardwarové požadavky na provozovatele uzlů, což pomáhá decentralizaci.

<ExpandableCard title="EIP pro Deneb" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Kořen beacon bloku v EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transakce shardových blobů</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Trvale platné podepsané dobrovolné výstupy</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Zvýšení maximálního slotu pro zahrnutí atestace</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Přidání maximálního limitu fluktuace pro epochu</em></li>
</ul>

</ExpandableCard>

- [Přečtěte si specifikace aktualizace Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Časté dotazy k aktualizaci Cancún-Deneb („Dencun“)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Šanghaj-Capella („Shapella“) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shrnutí aktualizace Šanghaj {#shanghai-summary}

Aktualizace Šanghaj přinesla výběry ze stakingu do exekuční vrstvy. V tandemu s aktualizací Capella to umožnilo blokům přijímat operace výběru, což stakerům umožňuje vybírat své ETH z Beacon chainu do exekuční vrstvy.

<ExpandableCard title="EIP pro Šanghaj" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Zahřívá adresu <code>COINBASE</code> při startu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nová instrukce <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Omezení a měření initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Výběry odesílané z Beacon chainu jako operace</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Zavržení <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Přečtěte si specifikaci aktualizace Šanghaj](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Shrnutí aktualizace Capella {#capella-summary}

Aktualizace Capella byla třetí velkou aktualizací vrstvy konsensu (Beacon chain) a umožnila výběry ze stakingu. Capella proběhla synchronně s aktualizací exekuční vrstvy, Šanghaj, a umožnila funkcionalitu výběrů ze stakingu.

Tato aktualizace vrstvy konsensu přinesla stakerům, kteří při svém počátečním vkladu neposkytli pověření k výběru, možnost tak učinit, čímž se umožnily výběry.

Aktualizace také poskytla funkci automatického vybírání účtů (sweeping), která nepřetržitě zpracovává účty validátorů a hledá dostupné výplaty odměn nebo úplné výběry.

- [Více o výběrech ze stakingu](/staking/withdrawals/).
- [Přečtěte si specifikace aktualizace Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paříž (Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Shrnutí {#paris-summary}

Aktualizace Paříž byla spuštěna tím, že blockchain využívající důkaz prací (PoW) překročil [konečnou celkovou obtížnost](/glossary/#terminal-total-difficulty) 58750000000000000000000. K tomu došlo v bloku 15537393 dne 15. září 2022, což spustilo aktualizaci Paříž v následujícím bloku. Paříž představovala přechod na [Merge](/roadmap/merge/) – její hlavní funkcí bylo vypnutí těžebního algoritmu [PoW](/developers/docs/consensus-mechanisms/pow) a související logiky konsensu a místo toho zapnutí [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos). Samotná Paříž byla aktualizací [exekučních klientů](/developers/docs/nodes-and-clients/#execution-clients) (ekvivalent aktualizace Bellatrix na vrstvě konsensu), která jim umožnila přijímat instrukce od připojených [klientů konsensu](/developers/docs/nodes-and-clients/#consensus-clients). To vyžadovalo aktivaci nové sady interních metod API, souhrnně označovaných jako [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Šlo pravděpodobně o nejvýznamnější aktualizaci v historii Etherea od [Homestead](#homestead)!

- [Přečtěte si specifikaci aktualizace Paříž](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP pro Paříž" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Aktualizace konsensu na důkaz podílem (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Nahrazení operačního kódu DIFFICULTY za PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Shrnutí {#bellatrix-summary}

Aktualizace Bellatrix byla druhou plánovanou aktualizací pro [Beacon chain](/roadmap/beacon-chain), která připravovala řetězec na [Merge](/roadmap/merge/). Přináší plnou výši sankcí pro validátory za neaktivitu a penalizovatelné prohřešky. Bellatrix také zahrnuje aktualizaci pravidel volby forku, aby se řetězec připravil na Merge a přechod z posledního bloku PoW na první blok PoS. To zahrnuje informování klientů konsensu o [konečné celkové obtížnosti](/glossary/#terminal-total-difficulty) 58750000000000000000000.

- [Přečtěte si specifikaci aktualizace Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Shrnutí {#gray-glacier-summary}

Síťová aktualizace Gray Glacier odložila [bombu obtížnosti](/glossary/#difficulty-bomb) o tři měsíce. Jedná se o jedinou změnu zavedenou v této aktualizaci a svou povahou je podobná aktualizacím [Arrow Glacier](#arrow-glacier) a [Muir Glacier](#muir-glacier). Podobné změny byly provedeny při síťových aktualizacích [Byzantium](#byzantium), [Konstantinopol](#constantinople) a [Londýn](#london).

- [Blog EF – Oznámení o aktualizaci Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP pro Gray Glacier" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>odkládá bombu obtížnosti do září 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Shrnutí {#arrow-glacier-summary}

Aktualizace sítě Arrow Glacier odložila [bombu obtížnosti](/glossary/#difficulty-bomb) o několik měsíců. Jedná se o jedinou změnu zavedenou v této aktualizaci a svou povahou je podobná aktualizaci [Muir Glacier](#muir-glacier). Podobné změny byly provedeny při aktualizacích sítě [Byzantium](#byzantium), [Konstantinopol](#constantinople) a [London](#london).

- [Blog Nadace Ethereum – Oznámení o aktualizaci Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders – Aktualizace Etherea Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP pro Arrow Glacier" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>odkládá bombu obtížnosti do června 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Shrnutí {#altair-summary}

Aktualizace Altair byla první plánovanou aktualizací pro [Beacon chain](/roadmap/beacon-chain). Přidala podporu pro „výbory pro synchronizaci“ (sync committees) – což umožnilo fungování lehkých klientů – a zvýšila postihy za neaktivitu validátorů a penalizace (slashing), jak vývoj postupoval směrem k Merge.

- [Přečtěte si specifikaci aktualizace Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Zajímavost! {#altair-fun-fact}

Altair byla první velká aktualizace sítě, která měla přesný čas spuštění. Každá předchozí aktualizace byla založena na deklarovaném čísle bloku v řetězci s důkazem prací (PoW), kde se časy bloků liší. Beacon chain nevyžaduje řešení důkazu prací (PoW) a místo toho funguje na systému epoch založeném na čase, který se skládá z 32 dvanáctisekundových časových „slotů“, ve kterých mohou validátoři navrhovat bloky. Proto jsme přesně věděli, kdy dosáhneme epochy 74 240 a Altair bude spuštěn!

- [Čas bloku](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Shrnutí {#london-summary}

Aktualizace London zavedla [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), který reformoval trh s transakčními poplatky, spolu se změnami ve způsobu zpracování vratek gasu a harmonogramu [doby ledové (Ice Age)](/glossary/#ice-age).

#### Co byla aktualizace London / EIP-1559? {#eip-1559}

Před aktualizací London mělo Ethereum bloky s pevnou velikostí. V dobách vysoké poptávky v síti fungovaly tyto bloky na plnou kapacitu. V důsledku toho museli uživatelé často čekat, až poptávka klesne, aby byli zahrnuti do bloku, což vedlo ke špatné uživatelské zkušenosti. Aktualizace London zavedla do Etherea bloky s proměnlivou velikostí.

Způsob výpočtu transakčních poplatků v síti Ethereum se změnil s [aktualizací London](/ethereum-forks/#london) v srpnu 2021. Před aktualizací London se poplatky počítaly bez oddělení poplatků `base` a `priority` následovně:

Řekněme, že Alice musela zaplatit Bobovi 1 ETH. V transakci je limit plynu 21 000 jednotek a cena plynu je 200 Gwei.

Celkový poplatek by byl: `Gas units (limit) * Gas price per unit` tj. `21,000 * 200 = 4,200,000 gwei` neboli 0,0042 ETH

Implementace [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) v aktualizaci London učinila mechanismus transakčních poplatků složitějším, ale poplatky za gas se staly předvídatelnějšími, což vedlo k efektivnějšímu trhu s transakčními poplatky. Uživatelé mohou odesílat transakce s `maxFeePerGas` odpovídajícím tomu, kolik jsou ochotni zaplatit za provedení transakce, s vědomím, že nezaplatí více, než je tržní cena za gas (`baseFeePerGas`), a případný přeplatek, po odečtení jejich prioritního poplatku, dostanou zpět.

Toto video vysvětluje EIP-1559 a výhody, které přináší: [Vysvětlení EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Jste vývojář decentralizovaných aplikací (dapp)? Nezapomeňte aktualizovat své knihovny a nástroje.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Přečtěte si vysvětlení od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP pro Londýn" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>zlepšuje trh s transakčními poplatky</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>vrací <code>BASEFEE</code> z bloku</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>snižuje vratky gasu pro operace EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>zabraňuje nasazení kontraktů začínajících na <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>odkládá dobu ledovou (Ice Age) do prosince 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlín {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Shrnutí {#berlin-summary}

Aktualizace Berlín optimalizovala náklady na gas pro určité akce EVM a zvyšuje podporu pro více typů transakcí.

- [Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Přečtěte si vysvětlení od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP pro Berlín" contentPreview="Oficiální vylepšení zahrnutá v této aktualizaci.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>snižuje náklady na gas pro MODEXP</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>umožňuje snazší podporu pro více typů transakcí</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>zvyšuje náklady na gas pro operační kódy přistupující ke stavu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>přidává volitelné seznamy přístupů</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneze Beacon chainu {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Shrnutí {#beacon-chain-genesis-summary}

[Beacon chain](/roadmap/beacon-chain/) potřeboval 16 384 vkladů ve výši 32 stakovaných ETH k bezpečnému spuštění. K tomu došlo 27. listopadu a Beacon chain začal produkovat bloky 1. prosince 2020.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Beacon chain
</DocLink>

---

### Nasazení kontraktu pro stakingový vklad {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Shrnutí {#deposit-contract-summary}

Kontrakt pro stakingový vklad přinesl [staking](/glossary/#staking) do ekosystému Etherea. Ačkoli se jednalo o kontrakt na [Mainnetu](/glossary/#mainnet), měl přímý dopad na harmonogram spuštění [Beacon chainu](/roadmap/beacon-chain/), důležité [aktualizace Etherea](/roadmap/).

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Shrnutí {#muir-glacier-summary}

Fork Muir Glacier přinesl odklad [bomby obtížnosti](/glossary/#difficulty-bomb). Zvyšování obtížnosti bloků mechanismu konsensu [důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow/) hrozilo zhoršením použitelnosti Etherea prodloužením čekacích dob na odesílání transakcí a používání decentralizovaných aplikací (dapp).

- [Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Přečtěte si vysvětlení od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP pro Muir Glacier" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>odkládá bombu obtížnosti o dalších 4 000 000 bloků, tedy o ~611 dní.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Shrnutí {#istanbul-summary}

Fork Istanbul:

- Optimalizoval náklady na [gas](/glossary/#gas) u určitých akcí v [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Zlepšil odolnost proti útokům typu denial-of-service.
- Zvýšil výkon řešení pro [škálování na vrstvě 2](/developers/docs/scaling/#layer-2-scaling) založených na SNARK a STARK.
- Umožnil interoperabilitu mezi Ethereem a Zcash.
- Umožnil kontraktům zavádět kreativnější funkce.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP pro Istanbul" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>umožňuje Ethereu spolupracovat s měnami chránícími soukromí, jako je Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>levnější kryptografie pro zlepšení nákladů na [gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>chrání Ethereum proti replay útokům přidáním [operačního kódu](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>optimalizace cen plynu operačních kódů na základě spotřeby.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>snižuje náklady na data volání (CallData), aby bylo možné do bloků vložit více dat – dobré pro [škálování na vrstvě 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>další úpravy cen plynu operačních kódů.</em></li>
</ul>

</ExpandableCard>

---

### Konstantinopol {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Shrnutí {#constantinople-summary}

Constantinople fork:

- Snížil odměny za [těžbu](/developers/docs/consensus-mechanisms/pow/mining/) bloků ze 3 na 2 ETH.
- Zajistil, že blockchain nezamrzne před [implementací důkazu podílem (PoS)](#beacon-chain-genesis).
- Optimalizoval náklady na [gas](/glossary/#gas) u určitých akcí v [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Přidal možnost interagovat s adresami, které ještě nebyly vytvořeny.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP pro Konstantinopol" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimalizuje náklady na určité onchain akce.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>umožňuje interagovat s adresami, které ještě nebyly vytvořeny.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>zavádí instrukci <code>EXTCODEHASH</code> pro získání hashe kódu jiného kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>zajišťuje, že blockchain nezamrzne před přechodem na důkaz podílem (PoS), a snižuje odměnu za blok ze 3 na 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Shrnutí {#byzantium-summary}

Byzantium fork:

- Snížil odměny za [těžbu](/developers/docs/consensus-mechanisms/pow/mining/) bloku z 5 na 3 ETH.
- Odložil [bombu obtížnosti](/glossary/#difficulty-bomb) o rok.
- Přidal možnost provádět volání jiných kontraktů, která nemění stav.
- Přidal určité kryptografické metody umožňující [škálování na vrstvě 2](/developers/docs/scaling/#layer-2-scaling).

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP pro Byzantium" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>přidává operační kód <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>do potvrzení o transakci bylo přidáno pole stavu, které indikuje úspěch nebo selhání.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>přidává eliptickou křivku a skalární násobení, což umožňuje [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>přidává eliptickou křivku a skalární násobení, což umožňuje [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>umožňuje ověřování podpisů RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>přidává podporu pro návratové hodnoty s proměnnou délkou.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>přidává operační kód <code>STATICCALL</code>, který umožňuje volání jiných kontraktů bez změny stavu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>mění vzorec pro úpravu obtížnosti.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>odkládá [bombu obtížnosti](/glossary/#difficulty-bomb) o 1 rok a snižuje odměnu za blok z 5 na 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Shrnutí {#spurious-dragon-summary}

Fork Spurious Dragon byl druhou reakcí na útoky odepření služby (DoS) na síť (září/říjen 2016), která zahrnovala:

- úpravu cen operačních kódů, aby se zabránilo budoucím útokům na síť.
- umožnění „odlehčení“ (debloat) stavu blockchainu.
- přidání ochrany proti replay útokům.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP pro Spurious Dragon" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>zabraňuje tomu, aby byly transakce z jednoho řetězce Etherea znovu vysílány na alternativním řetězci, například aby byla transakce z testnetu znovu přehrána na hlavním řetězci Etherea.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>upravuje ceny operačního kódu <code>EXP</code> – ztěžuje zpomalení sítě prostřednictvím výpočetně náročných operací kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>umožňuje odstranění prázdných účtů přidaných prostřednictvím DOS útoků.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>mění maximální velikost kódu, kterou může mít kontrakt na blockchainu – na 24576 bajtů.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Shrnutí {#tangerine-whistle-summary}

Fork Tangerine Whistle byl první reakcí na útoky odepření služby (DoS) na síť (září/říjen 2016), která zahrnovala:

- řešení naléhavých problémů se zdravím sítě týkajících se podhodnocených operačních kódů.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP pro Tangerine Whistle" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>zvyšuje náklady na gas u operačních kódů, které mohou být použity při spamových útocích.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>zmenšuje velikost stavu odstraněním velkého množství prázdných účtů, které byly do stavu vloženy za velmi nízkou cenu kvůli chybám v dřívějších verzích protokolu Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### DAO fork {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Shrnutí {#dao-fork-summary}

DAO fork byl reakcí na [útok na DAO v roce 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), při kterém byl z nezabezpečeného [DAO](/glossary/#dao) kontraktu při hacku odčerpán více než 3,6 milionu ETH. Fork přesunul prostředky z chybného kontraktu do [nového kontraktu](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) s jedinou funkcí: výběr (withdraw). Kdokoli, kdo přišel o prostředky, si mohl vybrat 1 ETH za každých 100 DAO tokenů ve své peněžence.

O tomto postupu hlasovala komunita Etherea. Každý držitel ETH mohl hlasovat prostřednictvím transakce na [hlasovací platformě](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Rozhodnutí provést fork dosáhlo více než 85 % hlasů.

Někteří těžaři odmítli fork přijmout, protože incident s DAO nebyl chybou v protokolu. Následně vytvořili [Ethereum Classic](https://ethereumclassic.org/).

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Shrnutí {#homestead-summary}

Fork Homestead, který hleděl do budoucnosti. Zahrnoval několik změn protokolu a změnu sítě, která Ethereu poskytla možnost provádět další upgrady sítě.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP pro Homestead" contentPreview="Oficiální vylepšení zahrnutá v tomto forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>upravuje proces vytváření kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>přidává nový operační kód: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>zavádí požadavky na dopřednou kompatibilitu devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Rozmrazování Frontieru {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Shrnutí {#frontier-thawing-summary}

Fork rozmrazování Frontieru zrušil limit 5 000 [gasu](/glossary/#gas) na [blok](/glossary/#block) a nastavil výchozí cenu gasu na 51 [Gwei](/glossary/#gwei). To umožnilo provádět transakce – transakce vyžadují 21 000 gasu. Byla zavedena [bomba obtížnosti](/glossary/#difficulty-bomb), aby zajistila budoucí hard fork na [důkaz podílem (PoS)](/glossary/#pos).

- [Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Přečtěte si aktualizaci protokolu Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Shrnutí {#frontier-summary}

Frontier byl živou, ale minimalistickou implementací projektu Ethereum. Následoval po úspěšné testovací fázi Olympic. Byl určen pro technické uživatele, konkrétně vývojáře. [Bloky](/glossary/#block) měly limit 5 000 [gasu](/glossary/#gas). Toto období „rozmrazování“ umožnilo těžařům zahájit své operace a prvním uživatelům nainstalovat své klienty, aniž by museli „spěchat“.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Prodej etheru {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether šel oficiálně do prodeje na 42 dní. Mohli jste si ho koupit za BTC.

[Přečtěte si oznámení Nadace Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Vydání yellow paperu {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Yellow paper, jehož autorem je Dr. Gavin Wood, je technickou definicí protokolu Ethereum.

[Zobrazit yellow paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Vydání bílé knihy {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Úvodní dokument, který v roce 2013 publikoval Vitalik Buterin, zakladatel Etherea, před spuštěním projektu v roce 2015.

<DocLink href="/whitepaper/">
  Bílá kniha
</DocLink>
