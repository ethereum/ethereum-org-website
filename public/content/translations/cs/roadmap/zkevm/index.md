---
title: zkEVM pro ověřování bloků na první vrstvě (L1)
description: Zjistěte, jak mohou důkazy s nulovou znalostí ověřovat provádění bloků Etherea, což umožňuje vyšší propustnost a nižší požadavky na validátory.
lang: cs
---

# zkEVM pro ověřování bloků na první vrstvě (L1) {#zkevm-l1}

zkEVM je technologie, která využívá [důkazy s nulovou znalostí](/zero-knowledge-proofs/) k ověřování provádění bloků Etherea. Místo toho, aby každý [validátor](/glossary/#validator) musel znovu provádět všechny transakce v bloku, jediný specializovaný aktér (nazývaný „dokazovatel“ - prover) provede blok a vygeneruje kryptografický důkaz o tom, že provedení bylo správné. Jakýkoli síťový uzel pak může tento důkaz ověřit – proces, který je o několik řádů levnější než opětovné provádění všech transakcí.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Nezaměňovat se zkEVM rollupy</AlertTitle>
<AlertDescription>
Tato stránka pojednává o použití zkEVM k ověřování provádění bloků na první vrstvě (L1) Etherea. Pro zkEVM rollupy, které používají ZK důkazy ke škálování Etherea jako řešení na druhé vrstvě, viz [rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Problém opětovného provádění {#reexecution-problem}

Dnes Ethereum používá model ověřování „N z N“: každý validátor musí nezávisle znovu provést každou transakci v každém bloku, aby ověřil, že navrhované změny stavu jsou správné. Ačkoli je tento přístup maximálně bez nutnosti důvěry (trustless), vytváří zásadní úzké hrdlo.

Problém je v tom, že propustnost Etherea je omezena tím, co dokáže zpracovat průměrný validátor. Zvýšení [limitu transakčních poplatků](/glossary/#gas-limit) by umožnilo více transakcí na blok, ale také by to zvýšilo hardwarové požadavky na validátory. To ohrožuje decentralizaci – pokud provozování validátoru vyžaduje drahý hardware, může se na zabezpečení sítě podílet méně lidí.

zkEVM nabízí cestu z tohoto kompromisu. Přechodem od „všichni znovu provádějí“ k „jeden dokazuje, všichni ověřují“ může Ethereum bezpečně zvýšit limit transakčních poplatků, aniž by se zvýšily hardwarové požadavky na validátory.

## Jak funguje ověřování zkEVM na L1 {#how-it-works}

Ověřování pomocí zkEVM transformuje validaci bloků na model „1 z N“:

1. **Provedení (Execution)**: Dokazovatel provede všechny transakce v bloku a sleduje každou změnu stavu
2. **Dokazování (Proving)**: Dokazovatel vygeneruje kryptografický důkaz ([SNARK nebo STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)), který potvrzuje správnost provedení
3. **Ověřování (Verification)**: Validátoři ověřují důkaz místo opětovného provádění transakcí – to je dramaticky levnější než úplné opětovné provedení

Záruka bezpečnosti zůstává stejná: pokud bylo provedení nesprávné, nelze vygenerovat žádný platný důkaz. Ale nyní, místo aby každý síťový uzel prováděl nákladné výpočty, dělá to pouze dokazovatel – a ověření je dostatečně levné na to, aby neomezovalo limit transakčních poplatků.

### zkEVM typu 1 {#type-1-zkevm}

zkEVM se dělí na typy na základě jejich kompatibility s Ethereem:

- **Typ 1**: Plně ekvivalentní Ethereu. Žádné úpravy EVM, takže jakýkoli blok Etherea lze dokázat přesně tak, jak je
- **Typ 2-4**: Dělají různé kompromisy, upravují chování EVM, aby usnadnily dokazování

Pro ověřování na L1 je Typ 1 nezbytný. zkEVM musí být schopen dokázat jakýkoli platný blok Etherea, včetně okrajových případů a historických bloků. Jakákoli odchylka od přesného chování Etherea by vytvořila problémy s konsensem.

Výzkum zkEVM nadace Ethereum Foundation se zaměřuje na implementace Typu 1, které jsou plně kompatibilní se stávajícím prováděním Etherea.

## Výhody pro Ethereum {#benefits}

### Vyšší propustnost {#higher-throughput}

Když je ověřování levné, limit transakčních poplatků se může bezpečně zvýšit. To rozšiřuje kapacitu sítě a pomáhá stabilizovat poplatky v obdobích vysoké poptávky. Současný limit transakčních poplatků je částečně omezen hardwarem validátorů – zkEVM toto omezení odstraňuje.

### Silnější decentralizace {#stronger-decentralization}

S ověřováním pomocí zkEVM musí validátoři pouze ověřovat důkazy, nikoli provádět transakce. To dramaticky snižuje hardwarové požadavky na provozování validátoru, což umožňuje více lidem podílet se na zabezpečení sítě. Větší rozmanitost validátorů posiluje odolnost Etherea vůči cenzuře a jeho celkovou houževnatost.

Vezměte na vědomí, že samotné dokazování vyžaduje značné výpočetní zdroje, větší než u současného hardwaru validátorů. Na rozdíl od validace však dokazování nemusí být decentralizováno stejným způsobem: na každý blok je potřeba pouze jeden správný důkaz a kdokoli jej může rychle ověřit. Výzkum trhů s dokazovateli, agregace důkazů a hardwarové akcelerace má za cíl zajistit, aby dokazování zůstalo konkurenceschopné a dostupné, spíše než aby se koncentrovalo mezi několik velkých operátorů.

### Předvídatelná konečnost {#predictable-finality}

Ověřování důkazů probíhá v konstantním čase bez ohledu na složitost bloku. Díky tomu je načasování atestací předvídatelnější a snižuje se počet zmeškaných atestací, ke kterým může dojít, když mají validátoři potíže se včasným zpracováním složitých bloků.

## Výzvy dokazování v reálném čase {#realtime-proving}

Hlavní výzvou pro ověřování zkEVM na L1 je rychlost. Bloky Etherea jsou produkovány každých 12 sekund, což znamená, že důkazy musí být generovány v podobném časovém rámci, aby byly užitečné pro konsensus.

Současným implementacím zkEVM může trvat minuty až hodiny, než dokážou jediný blok. Výzkum se zaměřuje na překlenutí této mezery prostřednictvím:

- **Paralelizace**: Distribuce práce na dokazování mezi více strojů
- **Specializovaný hardware**: Navrhování obvodů a hardwaru optimalizovaného pro ZK dokazování
- **Algoritmická vylepšení**: Efektivnější systémy dokazování a návrhy obvodů
- **Inkrementální dokazování**: Generování důkazů během provádění transakcí, nikoli až po něm

## Současný výzkum a implementace {#current-research}

Nadace Ethereum Foundation financuje výzkum zkEVM prostřednictvím týmu [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Mezi klíčové směry výzkumu patří:

- **Dokazování v reálném čase**: Generování důkazů celých bloků v rámci 12sekundových slotů
- **Integrace klientů**: Standardizace rozhraní mezi exekučními klienty a dokazovateli
- **Ekonomické pobídky**: Navrhování udržitelných trhů s dokazovateli a struktur poplatků

### Stav implementace {#implementations}

Pro dokazování bloků Etherea se vyvíjí a testuje několik implementací zkVM:

| Implementace | Architektura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Tyto implementace používají virtuální stroje založené na RISC-V k provádění bajtkódu EVM a následně generují ZK důkazy o správném provedení. Aktuální výsledky testů a pokrok jsou sledovány na [zkVM trackeru nadace Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Jak zkEVM zapadá do dalších vylepšení {#related-upgrades}

Ověřování zkEVM na L1 se propojuje s několika dalšími položkami plánu vylepšení Etherea:

- **[Verkle stromy (Verkle Trees)](/roadmap/verkle-trees/)**: Umožňují menší svědky (witnesses) pro bezstavové ověřování, čímž snižují množství dat, se kterými musí dokazovatelé pracovat
- **[Bezstavovost (Statelessness)](/roadmap/statelessness/)**: zkEVM je klíčovým předpokladem – se ZK důkazy o provedení nepotřebují síťové uzly plný stav k ověřování bloků
- **[PBS](/roadmap/pbs/)**: Tvůrci bloků by mohli potenciálně integrovat generování důkazů, nebo by mohl vzniknout samostatný trh s dokazovateli
- **[Konečnost v jednom slotu (Single Slot Finality)](/roadmap/single-slot-finality/)**: Rychlejší generování důkazů by mohlo umožnit konečnost v jednom slotu s kryptografickými zárukami

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Ověřování zkEVM na L1 je ve fázi aktivního výzkumu a zatím není integrováno do produkčních klientů Etherea.
</AlertDescription>
</AlertContent>
</Alert>

## Další čtení {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) – Oficiální výzkumné centrum zkEVM nadace Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) – Sledujte závod o dokazování Etherea v reálném čase
- [zkevm.fyi](https://zkevm.fyi) – Technická kniha o zkEVM pro L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) – Technické specifikace
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) – Vitalikův přehled vylepšení ověřování
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) – Analýza výkonu od týmu EF