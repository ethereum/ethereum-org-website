---
title: Technologie distribuovaných validátorů
description: Technologie distribuovaných validátorů umožňuje distribuovaný provoz validátoru Etherea více stranami.
lang: cs
---

Technologie distribuovaných validátorů (DVT) je přístup k zabezpečení validátorů, který rozděluje správu klíčů a odpovědnost za podepisování mezi více stran, aby se omezila jednotná místa selhání (single points of failure) a zvýšila odolnost validátorů.

Dělá to tak, že **rozdělí soukromý klíč** používaný k zabezpečení validátoru **mezi mnoho počítačů** organizovaných do „klastru“. Výhodou je, že to útočníkům velmi ztěžuje získání přístupu ke klíči, protože není uložen vcelku na žádném jednotlivém stroji. Umožňuje to také, aby některé uzly přešly do režimu offline, protože nezbytné podepisování může provést podmnožina strojů v každém klastru. To snižuje počet jednotných míst selhání v síti a činí celou sadu validátorů robustnější.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Proč potřebujeme DVT? {#why-do-we-need-dvt}

### Bezpečnost {#security}

Validátoři generují dva páry veřejných a soukromých klíčů: klíče validátoru pro účast na konsensu a klíče pro výběr pro přístup k prostředkům. Zatímco validátoři mohou zabezpečit klíče pro výběr v offline úložišti (cold storage), soukromé klíče validátoru musí být online 24/7. Pokud je soukromý klíč validátoru kompromitován, útočník může validátor ovládat, což může vést k penalizaci nebo ztrátě stakerova ETH. DVT může pomoci toto riziko zmírnit. Zde je návod, jak na to:

Pomocí DVT se mohou stakeři účastnit stakingu a zároveň uchovávat soukromý klíč validátoru v offline úložišti. Toho je dosaženo zašifrováním původního, úplného klíče validátoru a jeho následným rozdělením na části klíče (key shares). Tyto části klíče jsou online a jsou distribuovány do více uzlů, které umožňují distribuovaný provoz validátoru. To je možné, protože validátoři [Etherea](/) používají podpisy BLS, které jsou aditivní, což znamená, že úplný klíč lze rekonstruovat sečtením jeho jednotlivých částí. To umožňuje stakerovi udržovat úplný, původní „hlavní“ klíč validátoru bezpečně offline.

### Žádná jednotná místa selhání {#no-single-point-of-failure}

Když je validátor rozdělen mezi více operátorů a více strojů, dokáže odolat selháním jednotlivého hardwaru a softwaru, aniž by přešel do režimu offline. Riziko selhání lze také snížit použitím různých hardwarových a softwarových konfigurací napříč uzly v klastru. Tato odolnost není k dispozici pro konfigurace validátorů s jedním uzlem – pochází z vrstvy DVT.

Pokud některá z komponent stroje v klastru selže (například pokud jsou v klastru validátorů čtyři operátoři a jeden používá specifického klienta, který má chybu), ostatní zajistí, že validátor bude nadále fungovat.

### Decentralizace {#decentralization}

Ideálním scénářem pro Ethereum je mít co nejvíce nezávisle provozovaných validátorů. Několik poskytovatelů stakingu se však stalo velmi populárními a představují podstatnou část celkového stakovaného ETH v síti. DVT může těmto operátorům umožnit existovat při zachování decentralizace staku. Je to proto, že klíče pro každý validátor jsou distribuovány mezi mnoho strojů a vyžadovalo by to mnohem větší tajnou dohodu, aby se validátor stal škodlivým.

Bez DVT je pro poskytovatele stakingu snazší podporovat pouze jednu nebo dvě konfigurace klientů pro všechny své validátory, což zvyšuje dopad chyby klienta. DVT lze použít k rozložení rizika mezi více konfigurací klientů a různý hardware, čímž se vytváří odolnost prostřednictvím rozmanitosti.

**DVT nabízí Ethereu následující výhody:**

1. **Decentralizace** konsensu důkazu podílem (PoS) Etherea
2. Zajišťuje **živost (liveness)** sítě
3. Vytváří **odolnost proti chybám** validátoru
4. Provoz validátoru s **minimalizovanou potřebou důvěry**
5. **Minimalizovaná rizika penalizace** a prostojů
6. **Zlepšuje rozmanitost** (klient, datové centrum, lokalita, regulace atd.)
7. **Zvýšená bezpečnost** správy klíčů validátoru

## Jak DVT funguje? {#how-does-dvt-work}

Řešení DVT obsahuje následující komponenty:

- **[Shamirovo sdílení tajemství (Shamir's secret sharing)](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validátoři používají [klíče BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Jednotlivé „části klíče“ BLS (key shares) lze zkombinovat do jednoho agregovaného klíče (podpisu). V DVT je soukromý klíč pro validátor kombinovaným podpisem BLS každého operátora v klastru.
- **[Schéma prahového podpisu (Threshold signature scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Určuje počet jednotlivých částí klíče, které jsou vyžadovány pro povinnosti podepisování, např. 3 ze 4.
- **[Distribuované generování klíčů (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Kryptografický proces, který generuje části klíče a používá se k distribuci částí existujícího nebo nového klíče validátoru do uzlů v klastru.
- **[Vícestranné výpočty (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Úplný klíč validátoru je generován tajně pomocí vícestranných výpočtů. Úplný klíč není nikdy znám žádnému jednotlivému operátorovi – vždy znají pouze svou vlastní část (svůj „podíl“).
- **Protokol konsensu** - Protokol konsensu vybere jeden uzel jako navrhovatele bloku. Ten sdílí blok s ostatními uzly v klastru, které přidají své části klíče k agregovanému podpisu. Když je agregován dostatek částí klíče, blok je navržen na Ethereu.

Distribuované validátory mají vestavěnou odolnost proti chybám a mohou pokračovat v provozu, i když některé z jednotlivých uzlů přejdou do režimu offline. To znamená, že klastr je odolný, i když se ukáže, že některé uzly v něm jsou škodlivé nebo neaktivní.

## Případy užití DVT {#dvt-use-cases}

DVT má významné důsledky pro širší odvětví stakingu:

### Sóloví stakeři {#solo-stakers}

DVT také umožňuje nekustodiální staking tím, že vám dovoluje distribuovat váš klíč validátoru mezi vzdálené uzly, zatímco úplný klíč zůstává zcela offline. To znamená, že domácí stakeři nemusí nutně utrácet za hardware, zatímco distribuce částí klíče je může pomoci posílit proti potenciálním hackům.

### Staking jako služba (SaaS) {#saas}

Operátoři (jako jsou staking pooly a institucionální stakeři) spravující mnoho validátorů mohou použít DVT ke snížení svého rizika. Distribucí své infrastruktury mohou do svých operací přidat redundanci a diverzifikovat typy hardwaru, které používají.

DVT sdílí odpovědnost za správu klíčů mezi více uzly, což znamená, že lze sdílet i některé provozní náklady. DVT může také snížit provozní riziko a náklady na pojištění pro poskytovatele stakingu.

### Staking pooly {#staking-pools}

Kvůli standardním nastavením validátorů jsou staking pooly a poskytovatelé likvidního stakingu nuceni mít různé úrovně důvěry v jednoho operátora, protože zisky a ztráty jsou socializovány v celém poolu. Jsou také závislí na operátorech, že zabezpečí klíče pro podepisování, protože pro ně dosud neexistovala jiná možnost.

Přestože se tradičně vyvíjí úsilí o rozložení rizika distribucí staků mezi více operátorů, každý operátor stále spravuje významný stake nezávisle. Spoléhání se na jediného operátora představuje obrovská rizika, pokud podává nedostatečný výkon, narazí na prostoje, je kompromitován nebo jedná škodlivě.

Využitím DVT se výrazně snižuje důvěra vyžadovaná od operátorů. **Pooly mohou operátorům umožnit držet stake bez nutnosti úschovy klíčů validátoru** (protože se využívají pouze části klíče). Umožňuje také distribuci spravovaných staků mezi více operátorů (např. místo toho, aby jeden operátor spravoval 1000 validátorů, DVT umožňuje, aby tyto validátory byly kolektivně provozovány více operátory). Různorodé konfigurace operátorů zajistí, že pokud by jeden operátor selhal, ostatní budou stále schopni atestovat. To vede k redundanci a diverzifikaci, což přináší lepší výkon a odolnost při maximalizaci odměn.

Další výhodou minimalizace důvěry v jednoho operátora je, že staking pooly mohou umožnit otevřenější účast operátorů nevyžadující povolení. Tímto způsobem mohou služby snížit své riziko a podpořit decentralizaci Etherea pomocí kurátorovaných sad operátorů i sad nevyžadujících povolení, například spárováním domácích nebo menších stakerů s těmi většími.

## Potenciální nevýhody používání DVT {#potential-drawbacks-of-using-dvt}

- **Další komponenta** - zavedení uzlu DVT přidává další část, která může být případně vadná nebo zranitelná. Způsobem, jak to zmírnit, je usilovat o více implementací uzlu DVT, což znamená více klientů DVT (podobně jako existuje více klientů pro vrstvy konsensu a provádění).
- **Provozní náklady** - protože DVT distribuuje validátor mezi více stran, je k provozu zapotřebí více uzlů namísto pouze jednoho uzlu, což přináší zvýšené provozní náklady.
- **Potenciálně zvýšená latence** - protože DVT využívá protokol konsensu k dosažení konsensu mezi více uzly provozujícími validátor, může potenciálně způsobit zvýšenou latenci.

## Další čtení {#further-reading}

- [Specifikace distribuovaného validátoru Etherea (vysoká úroveň)](https://github.com/ethereum/distributed-validator-specs)
- [Technické specifikace distribuovaného validátoru Etherea](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Ukázková aplikace Shamirova sdílení tajemství](https://iancoleman.io/shamir/)