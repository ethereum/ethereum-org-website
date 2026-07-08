---
title: zkEVM pro verifikaci bloků na vrstvě 1
description: Zjistěte, jak mohou důkazy s nulovou znalostí verifikovat provádění bloků Etherea, což umožňuje vyšší propustnost a nižší požadavky na validátory.
lang: cs
---

zkEVM je technologie, která využívá [důkazy s nulovou znalostí](/zero-knowledge-proofs/) k verifikaci provádění bloků Etherea. Místo toho, aby každý [validátor](/glossary/#validator) musel znovu provádět všechny transakce v bloku, jediný specializovaný aktér (nazývaný „dokazovatel“) provede blok a vygeneruje kryptografický důkaz o tom, že provedení bylo správné. Jakýkoli uzel pak může tento důkaz verifikovat – tento proces je o několik řádů levnější než opětovné provádění všech transakcí.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Nezaměňovat se zkEVM rollupy</AlertTitle>
<AlertDescription>
Tato stránka se zabývá využitím zkEVM k verifikaci provádění bloků na vrstvě 1 (l1) Etherea. Pro zkEVM rollupy, které používají ZK důkazy ke škálování Etherea jako řešení na vrstvě 2 (l2), viz [rollupy s nulovým vědomím](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Problém opětovného provádění {#reexecution-problem}

Dnes Ethereum používá model verifikace „N z N“: každý validátor musí nezávisle znovu provést každou transakci v každém bloku, aby ověřil, že navrhované změny stavu jsou správné. Ačkoli je tento přístup maximálně nevyžadující důvěru, vytváří zásadní úzké hrdlo.

Problém spočívá v tom, že propustnost Etherea je omezena tím, co dokáže zpracovat průměrný validátor. Zvýšení [limitu plynu](/glossary/#gas-limit) by umožnilo více transakcí na blok, ale zároveň by to zvýšilo hardwarové požadavky na validátory. To ohrožuje decentralizaci – pokud provozování validátoru vyžaduje drahý hardware, může se na zabezpečení sítě podílet méně lidí.

zkEVM nabízí cestu z tohoto kompromisu. Přechodem od „všichni znovu provádějí“ k „jeden dokazuje, všichni verifikují“ může Ethereum bezpečně zvýšit limit plynu, aniž by se zvýšily hardwarové požadavky na validátory.

## Jak funguje verifikace zkEVM na vrstvě 1 {#how-it-works}

Verifikace zkEVM transformuje validaci bloku na model „1 z N“:

1. **Provedení**: Dokazovatel provede všechny transakce v bloku a sleduje každou změnu stavu.
2. **Dokazování**: Dokazovatel vygeneruje kryptografický důkaz ([SNARK nebo STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)), který potvrzuje správnost provedení.
3. **Verifikace**: Validátoři verifikují důkaz místo opětovného provádění transakcí – to je dramaticky levnější než úplné opětovné provedení.

Záruka bezpečnosti zůstává stejná: pokud bylo provedení nesprávné, nelze vygenerovat žádný platný důkaz. Nyní však místo toho, aby každý uzel prováděl nákladné výpočty, je provádí pouze dokazovatel – a verifikace je natolik levná, že neomezuje limit plynu.

### zkEVM typu 1 {#type-1-zkevm}

zkEVM se dělí na typy na základě jejich kompatibility s Ethereem:

- **Typ 1**: Plně ekvivalentní Ethereu. Žádné úpravy EVM, takže jakýkoli blok Etherea může být dokázán přesně tak, jak je.
- **Typ 2-4**: Dělají různé kompromisy a upravují chování EVM, aby usnadnily dokazování.

Pro verifikaci na vrstvě 1 (l1) je typ 1 nezbytný. zkEVM musí být schopen dokázat jakýkoli platný blok Etherea, včetně okrajových případů a historických bloků. Jakákoli odchylka od přesného chování Etherea by způsobila problémy s konsensem.

Výzkum zkEVM Nadace Ethereum se zaměřuje na implementace typu 1, které jsou plně kompatibilní se stávajícím prováděním Etherea.

## Výhody pro Ethereum {#benefits}

### Vyšší propustnost {#higher-throughput}

Když je verifikace levná, limit plynu se může bezpečně zvýšit. To rozšiřuje kapacitu sítě a pomáhá stabilizovat poplatky v obdobích vysoké poptávky. Současný limit plynu je částečně omezen hardwarem validátorů – zkEVM toto omezení odstraňuje.

### Silnější decentralizace {#stronger-decentralization}

S verifikací zkEVM stačí validátorům pouze verifikovat důkazy, místo aby prováděli transakce. To dramaticky snižuje hardwarové požadavky na provozování validátoru, což umožňuje více lidem podílet se na zabezpečení sítě. Větší rozmanitost validátorů posiluje odolnost Etherea vůči cenzuře a jeho celkovou odolnost.

Vezměte na vědomí, že samotné dokazování vyžaduje značné výpočetní zdroje, větší než u současného hardwaru validátorů. Na rozdíl od validace však dokazování nemusí být decentralizováno stejným způsobem: na každý blok je potřeba pouze jeden správný důkaz a kdokoli jej může rychle verifikovat. Výzkum trhů dokazovatelů, agregace důkazů a hardwarové akcelerace má za cíl zajistit, aby dokazování zůstalo konkurenceschopné a dostupné, a nekoncentrovalo se mezi několik velkých operátorů.

### Předvídatelná finalita {#predictable-finality}

Verifikace důkazů probíhá v konstantním čase bez ohledu na složitost bloku. Díky tomu je načasování atestací předvídatelnější a snižuje se počet zmeškaných atestací, ke kterým může dojít, když validátoři nestíhají včas zpracovat složité bloky.

## Výzvy dokazování v reálném čase {#realtime-proving}

Hlavní výzvou pro verifikaci zkEVM na vrstvě 1 je rychlost. Bloky Etherea jsou produkovány každých 12 sekund, což znamená, že důkazy musí být vygenerovány v podobném časovém rámci, aby byly užitečné pro konsensus.

Současným implementacím zkEVM může trvat minuty až hodiny, než dokážou jediný blok. Výzkum se zaměřuje na překlenutí této mezery prostřednictvím:

- **Paralelizace**: Rozdělení práce na dokazování mezi více strojů.
- **Specializovaný hardware**: Navrhování obvodů a hardwaru optimalizovaných pro ZK dokazování.
- **Algoritmická vylepšení**: Efektivnější systémy důkazů a návrhy obvodů.
- **Inkrementální dokazování**: Generování důkazů během provádění transakcí, nikoli až po něm.

## Současný výzkum a implementace {#current-research}

Nadace Ethereum financuje výzkum zkEVM prostřednictvím týmu [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Mezi klíčové směry výzkumu patří:

- **Dokazování v reálném čase**: Generování důkazů celých bloků v rámci 12sekundových slotů.
- **Integrace klientů**: Standardizace rozhraní mezi prováděcími klienty a dokazovateli.
- **Ekonomické pobídky**: Navrhování udržitelných trhů dokazovatelů a struktur poplatků.

### Stav implementace {#implementations}

Pro dokazování bloků Etherea se vyvíjí a testuje několik implementací zkVM:

| Implementace | Architektura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Tyto implementace používají virtuální stroje založené na RISC-V k provádění bajtkódu EVM a následně generují ZK důkazy o správném provedení. Aktuální výsledky testů a pokrok jsou sledovány v [nástroji pro sledování zkVM Nadace Ethereum](https://zkevm.ethereum.foundation/zkvm-tracker).

## Jak zkEVM zapadá do dalších vylepšení {#related-upgrades}

Verifikace zkEVM na vrstvě 1 se propojuje s několika dalšími položkami v roadmapě Etherea:

- **[Verkle stromy](/roadmap/verkle-trees/)**: Umožňují menší svědky pro bezstavovou verifikaci, čímž snižují množství dat, se kterými musí dokazovatelé pracovat.
- **[Bezstavovost](/roadmap/statelessness/)**: zkEVM je klíčovým předpokladem – se ZK důkazy o provedení uzly nepotřebují plný stav k verifikaci bloků.
- **[Oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs/)**: Tvůrci bloků by mohli potenciálně integrovat generování důkazů, nebo by mohl vzniknout samostatný trh dokazovatelů.
- **[Jednoslotová finalita](/roadmap/single-slot-finality/)**: Rychlejší generování důkazů by mohlo umožnit jednoslotovou finalitu s kryptografickými zárukami.

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Verifikace zkEVM na vrstvě 1 je předmětem aktivního výzkumu a zatím není integrována do produkčních klientů Etherea.
</AlertDescription>
</AlertContent>
</Alert>

## Další čtení {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) – Oficiální výzkumné centrum zkEVM Nadace Ethereum
- [Ethproofs](https://ethproofs.org/) – Sledujte závod o dokazování Etherea v reálném čase
- [zkevm.fyi](https://zkevm.fyi) – Technická kniha o zkEVM pro vrstvu 1
- [Specifikace PSE zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs) – Technické specifikace
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) – Vitalikův přehled vylepšení verifikace
- [Blog EF zkEVM](https://zkevm.ethereum.foundation/blog) – Analýza výkonu od týmu EF