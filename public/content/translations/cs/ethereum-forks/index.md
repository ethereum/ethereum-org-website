---
title: Časová osa všech větví sítě Ethereum (2014 až současnost)
description: Historie blockchainu Etherea zahrnující hlavní milníky, verze a větve.
lang: cs
sidebarDepth: 1
---

# Časová osa všech větví sítě Ethereum (2014 až současnost) {#the-history-of-ethereum}

Časová osa všech hlavních milníků, větví a aktualizací blockchainu Etherea.

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Větve se tvoří, když je třeba provést zásadní technické upgrady nebo změny sítě – obvykle vycházejí z [návrhů na zlepšení Etherea (EIP)](/eips/) a mění „pravidla“ protokolu.

Když je potřeba upgradovat tradiční, centrálně řízený software, společnost pro koncové uživatele jednoduše vydá novou verzi. Blockchainy fungují jinak, protože neexistuje žádné centrální vlastnictví. [Klienti Etherea](/developers/docs/nodes-and-clients/) musí aktualizovat svůj software, aby implementovali nová pravidla větve. Navíc tvůrci bloků (těžaři ve světě důkazu prací, validátoři ve světě důkazu podílem) a uzly musí vytvářet bloky a ověřovat je podle nových pravidel. [Více o mechanismech konsensu](/developers/docs/consensus-mechanisms/)

Tyto změny pravidel mohou v síti způsobit dočasné rozdělení. Nové bloky by mohly být vytvářeny podle nových nebo starých pravidel. Větve jsou obvykle odsouhlaseny předem, aby klienti přijali změny jednotně a větev s upgrady se stala hlavním řetězcem. Ve vzácných případech však mohou neshody ohledně větví způsobit trvalé rozdělení sítě – nejznámějším příkladem je vytvoření sítě Ethereum Classic pomocí <a href="#dao-fork">větve DAO</a>.

</ExpandableCard>

<ExpandableCard title="Why do some upgrades have multiple names?" contentPreview="Upgrades names follow a pattern">

Software, na kterém Ethereum funguje, se skládá ze dvou polovin, známých jako [exekuční vrstva](/glossary/#execution-layer) a [konsensuální vrstva](/glossary/#consensus-layer).

**Pojmenování upgradů exekuční vrstvy**

Od roku 2021 jsou upgrady **exekuční vrstvy** pojmenovávány podle názvů měst, kde se v minulosti konal [Devcon](https://devcon.org/en/past-events/), v chronologickém pořadí:

| Název upgradu | Rok konání Devconu | Číslo Devconu | Datum upgradu                          |
| ------------- | ------------------ | ------------- | -------------------------------------- |
| Berlin        | 2014               | 0             | 15. dubna 2021  |
| London        | 2015               | I             | 5. srpna 2021   |
| Shanghai      | 2016               | II            | 12. dubna 2023  |
| Cancun        | 2017               | III           | 13. března 2024 |
| **Prague**    | 2018               | IV            | Bude určeno – příští                   |
| _Osaka_       | 2019               | V             | Bude určeno                            |
| _Bogota_      | 2022               | VI            | Bude určeno                            |
| _Bangkok_     | 2024               | VII           | Bude určeno                            |

**Pojmenování upgradů konsensuální vrstvy**

Od spuštění řetězce [Beacon Chain](/glossary/#beacon-chain) jsou upgrady **konsensuální vrstvy** pojmenovávány podle hvězd, jejichž počáteční písmena následují v abecedním pořadí:

| Název upgradu                                                   | Datum upgradu                           |
| --------------------------------------------------------------- | --------------------------------------- |
| Geneze Beacon Chainu                                            | 1. prosince 2020 |
| [Altair](https://cs.wikipedia.org/wiki/Altair)                  | 27. října 2021   |
| [Bellatrix](https://cs.wikipedia.org/wiki/Bellatrix)            | 6. září 2022     |
| [Capella](https://cs.wikipedia.org/wiki/Capella)                | 12. dubna 2023   |
| [Deneb](https://cs.wikipedia.org/wiki/Deneb)                    | 13. března 2024  |
| [**Electra**](https://cs.wikipedia.org/wiki/Elektra_\(hvězda\)) | Bude určeno – příští                    |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))           | Bude určeno                             |

**Kombinované pojmenování**

Upgrady exekuční a konsensuální vrstvy byly zpočátku zaváděny v různou dobu, ale po [sloučení (The Merge)](/roadmap/merge/) v roce 2022 jsou nasazovány současně. Proto se objevily hovorové termíny, které zjednodušují odkazy na tyto upgrady pomocí jediného spojeného výrazu. Začalo to upgradem _Shanghai-Capella_, běžně označovaným jako „**Shapella**“, a pokračuje upgrady _Cancun-Deneb_ (**Dencun**) a _Prague-Electra_ (**Pectra**).

| Upgrade exekuční vrstvy | Upgrade konsensuální vrstvy | Zkratka    |
| ----------------------- | --------------------------- | ---------- |
| Shanghai                | Capella                     | „Shapella“ |
| Cancun                  | Deneb                       | „Dencun“   |
| Prague                  | Electra                     | „Pectra“   |
| Osaka                   | Fulu                        | „Fusaka“   |

</ExpandableCard>

Přejít rovnou k informacím o některých obzvláště důležitých minulých upgradech: [Beacon Chain](/roadmap/beacon-chain/), [sloučení (The Merge)](/roadmap/merge/) a [EIP-1559](#london)

Hledáte budoucí upgrady protokolu? [Zjistěte více o nadcházejících upgradech v plánu rozvoje sítě Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka („Fusaka“) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Více o upgradu Fusaka](/roadmap/fusaka/)

### Prague-Electra („Pectra“) {#pectra}

<NetworkUpgradeSummary name="pectra" />

Upgrade Prague-Electra („Pectra“) zahrnoval několik vylepšení protokolu Ethereum zaměřených na zlepšení zkušeností pro všechny uživatele, sítě 2. vrstvy, stakery a provozovatele uzlů.

Staking získal upgrade díky složeným účtům validátorů a vylepšenou kontrolu nad stakovanými prostředky pomocí adresy pro výběr z exekuční vrstvy. EIP-7251 zvýšil maximální efektivní zůstatek pro jednoho validátora na 2048, což zlepšilo kapitálovou efektivitu pro stakery. EIP-7002 umožnil exekučnímu účtu bezpečně spouštět akce validátora, včetně opuštění nebo výběru části prostředků, což zlepšilo zkušenost pro stakery ETH a zároveň pomohlo posílit odpovědnost provozovatelů uzlů.

Další části upgradu se zaměřily na zlepšení zkušeností pro běžné uživatele. EIP-7702 přinesl možnost, aby běžný účet, který není chytrým kontraktem ([EOA](/glossary/#eoa)), spouštěl kód podobně jako chytrý kontrakt. Tím se odemkla neomezená nová funkcionalita pro tradiční účty Ethereum, jako je dávkování transakcí, sponzorování transakčních poplatků, alternativní ověřování, programovatelné kontroly výdajů, mechanismy obnovy účtu a další.

<ExpandableCard title="Pectra EIPs" contentPreview="Official improvements included in this upgrade.">

Lepší uživatelská zkušenost:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> – <em>nastavení kódu účtu EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> – <em>zvýšení propustnosti blobů</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> – <em>zvýšení ceny za calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> – <em>přidání plánu blobů do konfiguračních souborů EL</em></li>
</ul>

Lepší zkušenost se stakingem:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> – <em>zvýšení <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> – <em>výstupy spouštěné exekuční vrstvou</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> – <em>obecné požadavky na exekuční vrstvu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> – <em>poskytování vkladů validátorů na řetězci</em></li>
</ul>

Zlepšení efektivity a zabezpečení protokolu:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> – <em>předkompilace pro operace s křivkou BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> – <em>ukládání historických hašů bloků ve stavu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> – <em>přesunutí indexu výboru mimo atestaci</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Jak Pectra vylepší zážitek ze stakingu](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Přečtěte si specifikace upgradu Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Často kladené otázky k Prague-Electra („Pectra“)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb („Dencun“) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Shrnutí upgradu Cancun {#cancun-summary}

Upgrade Cancun obsahuje soubor vylepšení _exekuce_ v síti Ethereum, které mají za cíl zlepšit škálovatelnost, a to v tandemu s upgrady konsensuální vrstvy Deneb.

Zejména zahrnuje EIP-4844, známý jako **Proto-Danksharding**, který výrazně snižuje náklady na ukládání dat pro rollupy 2. vrstvy. Toho je dosaženo zavedením datových „blobů“, což umožňuje rollupům posílat data na Mainnet na krátkou dobu. To má za následek výrazně nižší transakční poplatky pro uživatele rollupů 2. vrstvy.

<ExpandableCard title="Cancun EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> – <em>operační kódy pro dočasné úložiště</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> – <em>kořen bloku Beacon v EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> – <em>transakce shard blobů (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> – <em><code>MCOPY</code> – instrukce pro kopírování paměti</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> – <em><code>SELFDESTRUCT</code> pouze ve stejné transakci</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> – <em>operační kód <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Rollupy 2. vrstvy](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Přečtěte si specifikace upgradu Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Shrnutí upgradu Deneb {#deneb-summary}

Upgrade Deneb obsahuje sadu vylepšení _konsensu_ sítě Ethereum zaměřených na zlepšení škálovatelnosti. Tento upgrade přichází společně s upgrady exekuční vrstvy Cancun, aby se umožnil Proto-Danksharding (EIP-4844), spolu s dalšími vylepšeními Beacon Chainu.

Předem vygenerované podepsané „dobrovolné zprávy o odchodu“ již nemají platnost, což dává větší kontrolu uživatelům stakujícím své prostředky u provozovatele uzlu třetí strany. S touto podepsanou zprávou o odchodu mohou stakeři delegovat provoz uzlu a zároveň si zachovat schopnost kdykoli bezpečně odejít a vybrat své prostředky, aniž by museli někoho žádat o svolení.

EIP-7514 zpřísňuje vydávání ETH tím, že omezuje „churn“ míru, s níž se validátoři mohou připojit k síti, na osm (8) za epochu. Protože je vydávání ETH úměrné celkovému stakovanému množství ETH, omezení počtu připojujících se validátorů omezuje _rychlost růstu_ nově vydávaných ETH a zároveň snižuje hardwarové nároky na provozovatele uzlů, což napomáhá decentralizaci.

<ExpandableCard title="Deneb EIPs" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> – <em>kořen bloku Beacon v EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> – <em>transakce shard blobů</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> – <em>trvale platné podepsané dobrovolné odchody</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> – <em>zvýšení maximálního slotu pro zařazení atestace</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> – <em>přidání maximálního limitu churnu za epochu</em></li>
</ul>

</ExpandableCard>

- [Přečtěte si specifikace upgradu Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Často kladené otázky k Cancun-Deneb („Dencun“)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella („Shapella“) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shrnutí upgradu Shanghai {#shanghai-summary}

Upgrade Shanghai přinesl výběry ze stakingu na exekuční vrstvu. Spolu s upgradem Capella to umožnilo blokům přijímat operace výběru, což stakerům umožňuje vybrat své ETH z Beacon Chainu na exekuční vrstvu.

<ExpandableCard title="Shanghai EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>spouští adresu <code>COINBASE</code> jako „warm“</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>nová instrukce <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>omezení a měření initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>výběry z Beacon Chainu jako operace</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> – <em>zastarání <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Přečtěte si specifikace upgradu Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Shrnutí upgradu Capella {#capella-summary}

Upgrade Capella byl třetím velkým upgradem konsensuální vrstvy (Beacon Chain) a umožnil výběry ze stakingu. Capella proběhla synchronně s upgradem exekuční vrstvy, Shanghai, a umožnila funkcionalitu výběru ze stakingu.

Tento upgrade konsensuální vrstvy přinesl stakerům, kteří při svém počátečním vkladu neposkytli přihlašovací údaje pro výběr, možnost tak učinit, čímž se výběry umožnily.

Upgrade také poskytl funkci automatického „sweeping“ účtů, která nepřetržitě zpracovává účty validátorů pro jakékoli dostupné platby odměn nebo úplné výběry.

- [Více o výběrech ze stakingu](/staking/withdrawals/).
- [Přečtěte si specifikace upgradu Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Shrnutí {#paris-summary}

Upgrade Paris byl spuštěn, když blockchain proof-of-work překročil [koncovou celkovou obtížnost (terminal total difficulty)](/glossary/#terminal-total-difficulty) 58750000000000000000000. Stalo se tak v bloku 15537393 dne 15. září 2022, což v následujícím bloku spustilo upgrade Paris. Paris byl přechod na [sloučení (The Merge)](/roadmap/merge/) – jeho hlavní funkcí bylo vypnutí algoritmu těžby [proof-of-work](/developers/docs/consensus-mechanisms/pow) a související logiky konsensu a místo toho zapnutí [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Samotný Paris byl upgradem pro [exekuční klienty](/developers/docs/nodes-and-clients/#execution-clients) (ekvivalent Bellatrixu na konsensuální vrstvě), který jim umožnil přijímat instrukce od připojených [konsensuálních klientů](/developers/docs/nodes-and-clients/#consensus-clients). To vyžadovalo aktivaci nové sady interních metod API, souhrnně známých jako [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Byl to pravděpodobně nejvýznamnější upgrade v historii Etherea od [Homesteadu](#homestead)!

- [Přečtěte si specifikace upgradu Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>upgrade konsensu na Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>nahrazení operačního kódu DIFFICULTY za PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Shrnutí {#bellatrix-summary}

Upgrade Bellatrix byl druhý plánovaný upgrade pro [Beacon Chain](/roadmap/beacon-chain), který připravil řetězec na [sloučení (The Merge)](/roadmap/merge/). Zvyšuje postihy pro validátory na jejich plnou hodnotu za nečinnost a postižitelné přestupky. Bellatrix také obsahuje aktualizaci pravidel pro výběr větve, která připraví řetězec na sloučení (The Merge) a přechod z posledního bloku proof-of-work na první blok proof-of-stake. To zahrnuje informování konsensuálních klientů o [koncové celkové obtížnosti (terminal total difficulty)](/glossary/#terminal-total-difficulty) 58750000000000000000000.

- [Přečtěte si specifikace upgradu Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Shrnutí {#gray-glacier-summary}

Síťový upgrade Gray Glacier odsunul [bombu obtížnosti](/glossary/#difficulty-bomb) o tři měsíce. Toto je jediná změna zavedená v tomto upgradu a je svou povahou podobná upgradům [Arrow Glacier](#arrow-glacier) a [Muir Glacier](#muir-glacier). Podobné změny byly provedeny při síťových upgradech [Byzantium](#byzantium), [Constantinople](#constantinople) a [London](#london).

- [Blog nadace EF – oznámení upgradu Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>odkládá bombu obtížnosti do září 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Shrnutí {#arrow-glacier-summary}

Síťový upgrade Arrow Glacier odsunul [bombu obtížnosti](/glossary/#difficulty-bomb) o několik měsíců. Toto je jediná změna zavedená v tomto upgradu a je svou povahou podobná upgradu [Muir Glacier](#muir-glacier). Podobné změny byly provedeny při síťových upgradech [Byzantium](#byzantium), [Constantinople](#constantinople) a [London](#london).

- [Blog nadace EF – oznámení upgradu Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders – upgrade Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>odkládá bombu obtížnosti do června 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Shrnutí {#altair-summary}

Upgrade Altair byl první plánovaný upgrade pro [Beacon Chain](/roadmap/beacon-chain). Přidal podporu pro „synchronizační výbory“ – umožňující lehké klienty a zvýšil postihy za nečinnost a slashing validátorů, jak se vývoj posouval směrem ke sloučení (The Merge).

- [Přečtěte si specifikace upgradu Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Zajímavost! {#altair-fun-fact}

Altair byl první velký síťový upgrade, který měl přesný čas zavedení. Každý předchozí upgrade byl založen na deklarovaném čísle bloku v řetězci proof-of-work, kde se časy bloků liší. Beacon Chain nevyžaduje řešení proof-of-work a místo toho funguje na systému epoch založeném na čase, který se skládá z 32 dvanáctisekundových „slotů“, během nichž mohou validátoři navrhovat bloky. Proto jsme přesně věděli, kdy dosáhneme epochy 74 240 a Altair byl spuštěn!

- [Čas bloku](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Shrnutí {#london-summary}

Upgrade London zavedl [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), který reformoval trh s transakčními poplatky, spolu se změnami ve způsobu zpracování vracení transakčních poplatků a harmonogramem [doby ledové (Ice Age)](/glossary/#ice-age).

#### Co byl upgrade London / EIP-1559? {#eip-1559}

Před upgradem London mělo Ethereum bloky s pevnou velikostí. V dobách vysoké poptávky po síti fungovaly tyto bloky na plnou kapacitu. V důsledku toho museli uživatelé často čekat na snížení poptávky, aby byli zařazeni do bloku, což vedlo ke špatné uživatelské zkušenosti. Upgrade London zavedl do sítě Ethereum bloky s proměnnou velikostí.

Způsob výpočtu transakčních poplatků v síti Ethereum se změnil s [upgradem London](/ethereum-forks/#london) v srpnu 2021. Před upgradem London se poplatky počítaly bez oddělení `základních` a `prioritních` poplatků, a to následovně:

Řekněme, že Alice musela zaplatit Bobovi 1 ETH. V transakci je limit transakčních poplatků 21 000 jednotek a cena za transakční poplatek je 200 gwei.

Celkový poplatek by byl: `Jednotky transakčního poplatku (limit) * Cena transakčního poplatku za jednotku`, tj. `21 000 * 200 = 4 200 000 gwei` neboli 0,0042 ETH

Implementace [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) v upgradu London zkomplikovala mechanismus transakčních poplatků, ale učinila poplatky za plyn předvídatelnějšími, což vedlo k efektivnějšímu trhu s transakčními poplatky. Uživatelé mohou odesílat transakce s `maxFeePerGas` odpovídající tomu, kolik jsou ochotni zaplatit za provedení transakce, s vědomím, že nezaplatí více než tržní cenu za transakční poplatek (`baseFeePerGas`), a dostanou zpět jakoukoli přebytečnou částku, mínus jejich spropitné.

Toto video vysvětluje EIP-1559 a výhody, které přináší: [Vysvětlení EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Jste vývojář dapp? Nezapomeňte upgradovat své knihovny a nástroje.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Přečtěte si vysvětlení od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>vylepšuje trh s transakčními poplatky</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>vrací <code>BASEFEE</code> z bloku</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> – <em>snižuje vracení transakčních poplatků za operace EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> – <em>zabraňuje nasazení kontraktů začínajících na <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>odkládá dobu ledovou (Ice Age) do prosince 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Shrnutí {#berlin-summary}

Upgrade Berlin optimalizoval cenu za transakční poplatek pro určité akce EVM a zvyšuje podporu pro více typů transakcí.

- [Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Přečtěte si vysvětlení od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>snižuje cenu za transakční poplatek u ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>usnadňuje podporu více typů transakcí</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>zvýšení ceny za transakční poplatek u operačních kódů pro přístup ke stavu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>přidává volitelné seznamy přístupů</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneze Beacon Chainu {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Shrnutí {#beacon-chain-genesis-summary}

[Beacon Chain](/roadmap/beacon-chain/) potřeboval 16 384 vkladů ve výši 32 stakovaných ETH, aby mohl být bezpečně spuštěn. K tomu došlo 27. listopadu a Beacon Chain začal vytvářet bloky 1. prosince 2020.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Řetězová vazba
</DocLink>

---

### Nasazen vkladový kontrakt pro staking {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Shrnutí {#deposit-contract-summary}

Vkladový kontrakt pro staking zavedl [staking](/glossary/#staking) do ekosystému Ethereum. Ačkoli se jednalo o kontrakt na [Mainnetu](/glossary/#mainnet), měl přímý dopad na časový plán spuštění [Beacon Chainu](/roadmap/beacon-chain/), což je důležitý [upgrade Etherea](/roadmap/).

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Shrnutí {#muir-glacier-summary}

Větev Muir Glacier způsobila zpoždění [bomby obtížnosti](/glossary/#difficulty-bomb). Zvýšení obtížnosti bloku mechanismu konsensu [proof-of-work](/developers/docs/consensus-mechanisms/pow/) ohrožovalo použitelnost Etherea prodloužením doby čekání na odeslání transakcí a používání dapps.

- [Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Přečtěte si vysvětlení od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>odkládá bombu obtížnosti o dalších 4 000 000 bloků, tj. o ~611 dní.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Shrnutí {#istanbul-summary}

Větev Istanbul:

- Optimalizoval cenu za [transakční poplatek](/glossary/#gas) u některých akcí v [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Zlepšila odolnost proti útokům odepření služby.
- Zvýšila výkonnost řešení [škálování 2. vrstvy](/developers/docs/scaling/#layer-2-scaling) založených na SNARK a STARK.
- Umožnila interoperabilitu sítí Ethereum a Zcash.
- Umožnila kontraktům zavádět kreativnější funkce.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>umožňuje, aby Ethereum pracovalo s měnou Zcash, která chrání soukromí.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>levnější kryptografie pro snížení nákladů na [transakční poplatky](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>chrání Ethereum před útoky přehráním přidáním [operačního kódu](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>optimalizace cen za transakční poplatky u operačních kódů na základě spotřeby.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>snižuje náklady na CallData, aby se do bloků vešlo více dat – což je dobré pro [škálování 2. vrstvy](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>další změny cen za transakční poplatky u operačních kódů.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Shrnutí {#constantinople-summary}

Větev Constantinople:

- Snížila odměny za [těžbu](/developers/docs/consensus-mechanisms/pow/mining/) bloků z 3 na 2 ETH.
- Zajistila, aby blockchain nezamrzl před [implementací proof-of-stake](#beacon-chain-genesis).
- Optimalizoval cenu za [transakční poplatek](/glossary/#gas) u některých akcí v [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Přidala možnost interagovat s adresami, které ještě nebyly vytvořeny.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimalizuje náklady na určité on-chain akce.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>umožňuje interakci s adresami, které teprve budou vytvořeny.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>zavádí instrukci <code>EXTCODEHASH</code> pro získání haše kódu jiného kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>zajišťuje, aby blockchain nezamrzl před proof-of-stake, a snižuje odměnu za blok z 3 na 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Shrnutí {#byzantium-summary}

Větev Byzantium:

- Snížila odměny za [těžbu](/developers/docs/consensus-mechanisms/pow/mining/) bloků z 5 na 3 ETH.
- Odložila [bombu obtížnosti](/glossary/#difficulty-bomb) o rok.
- Přidala schopnost provádět volání jiných kontraktů, která nemění stav.
- Přidala určité kryptografické metody, které umožňují [škálování 2. vrstvy](/developers/docs/scaling/#layer-2-scaling).

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>přidává operační kód <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>do potvrzení transakce bylo přidáno pole stavu, které udává úspěch nebo neúspěch.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>přidává eliptickou křivku a skalární násobení pro umožnění [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>přidává eliptickou křivku a skalární násobení pro umožnění [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>umožňuje ověřování podpisu RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>přidává podporu pro návratové hodnoty s proměnnou délkou.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>přidává operační kód <code>STATICCALL</code>, který umožňuje volání jiných kontraktů, která nemění stav.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>mění vzorec pro úpravu obtížnosti.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>odkládá [bombu obtížnosti](/glossary/#difficulty-bomb) o 1 rok a snižuje odměnu za blok z 5 na 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Shrnutí {#spurious-dragon-summary}

Větev Spurious Dragon byla druhou reakcí na útoky typu odepření služby (DoS) na síť (září/říjen 2016) a zahrnovala:

- doladění cen operačních kódů, aby se zabránilo budoucím útokům na síť.
- umožnění „vyčištění“ stavu blockchainu.
- přidání ochrany proti útoku přehráním.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>zabraňuje tomu, aby transakce z jednoho řetězce Ethereum byly znovu vysílány na alternativním řetězci, například aby transakce z testnetu byla přehrána na hlavním řetězci Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>upravuje ceny operačního kódu <code>EXP</code> – ztěžuje zpomalení sítě prostřednictvím výpočetně náročných operací kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>umožňuje odstranění prázdných účtů přidaných prostřednictvím útoků DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>mění maximální velikost kódu, kterou může mít kontrakt na blockchainu, na 24 576 bajtů.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Shrnutí {#tangerine-whistle-summary}

Větev Tangerine Whistle byla první reakcí na útoky typu odepření služby (DoS) na síť (září/říjen 2016) a zahrnovala:

- řešení naléhavých problémů se stavem sítě týkajících se podceněných operačních kódů.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>zvyšuje náklady na transakční poplatky u operačních kódů, které lze použít při spamových útocích.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>snižuje velikost stavu odstraněním velkého počtu prázdných účtů, které byly do stavu vloženy za velmi nízkou cenu kvůli chybám v dřívějších verzích protokolu Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Větev DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Shrnutí {#dao-fork-summary}

Větev DAO byla reakcí na [útok na DAO v roce 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), kdy bylo z nezabezpečeného kontraktu [DAO](/glossary/#dao) při hackerském útoku odčerpáno více než 3,6 milionu ETH. Větev přesunula prostředky z chybného kontraktu do [nového kontraktu](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) s jedinou funkcí: výběr. Každý, kdo přišel o prostředky, si mohl vybrat 1 ETH za každých 100 tokenů DAO ve své peněžence.

Tento postup byl odhlasován ethereovskou komunitou. Každý držitel ETH mohl hlasovat prostřednictvím transakce na [hlasovací platformě](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Rozhodnutí o forku získalo více než 85 % hlasů.

Někteří těžaři odmítli větev, protože incident DAO nebyl vadou v protokolu. Ti dále vytvořili [Ethereum Classic](https://ethereumclassic.org/).

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Shrnutí {#homestead-summary}

Větev Homestead se dívala do budoucnosti. Zahrnovala několik změn protokolu a síťovou změnu, která dala síti Ethereum schopnost provádět další síťové upgrady.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>provádí úpravy v procesu vytváření kontraktů.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>přidává nový operační kód: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>zavádí požadavky na dopřednou kompatibilitu devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Rozmrazení Frontieru {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Shrnutí {#frontier-thawing-summary}

Větev rozmrazení Frontieru zrušila limit 5 000 [transakčních poplatků](/glossary/#gas) na [blok](/glossary/#block) a nastavila výchozí cenu za transakční poplatek na 51 [gwei](/glossary/#gwei). To umožnilo transakce – transakce vyžadují 21 000 transakčních poplatků. Byla zavedena [bomba obtížnosti](/glossary/#difficulty-bomb), aby byla zajištěna budoucí hard-fork na [proof-of-stake](/glossary/#pos).

- [Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Přečtěte si aktualizaci protokolu Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Shrnutí {#frontier-summary}

Frontier byl živou, ale základní implementací projektu Ethereum. Následoval po úspěšné testovací fázi Olympic. Byl určen pro technické uživatele, konkrétně pro vývojáře. [Bloky](/glossary/#block) měly [limit transakčních poplatků](/glossary/#gas) 5 000. Toto „období rozmrazování“ umožnilo těžařům zahájit své operace a prvním uživatelům nainstalovat své klienty, aniž by museli spěchat.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Prodej etheru {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether se oficiálně prodával 42 dní. Mohli jste ho koupit za BTC.

[Přečtěte si oznámení nadace Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Vydána žlutá kniha {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Žlutá kniha, jejímž autorem je Dr. Gavin Wood, je technickou definicí protokolu Ethereum.

[Zobrazit žlutou knihu](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Vydána bílá kniha {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Úvodní dokument, který v roce 2013 publikoval Vitalik Buterin, zakladatel Etherea, před spuštěním projektu v roce 2015.

<DocLink href="/whitepaper/">
  Bílá kniha
</DocLink>
