---
title: Technologie distribuovaných validátorů
description: Technologie distribuovaných validátorů umožňuje distribuovaný provoz validátoru Etherea více stranami.
lang: cs
template: staking
sidebarDepth: 2
summaryPoints:
  - Rozděluje podepisovací klíč validátoru mezi více strojů a operátorů, čímž odstraňuje jediný bod selhání.
  - Udržuje validátory online i při selhání jednotlivého hardwaru, softwaru nebo operátora.
  - Produkční infrastruktura, kterou dnes využívají sólo stakeři, služby pro staking a společný staking.
---

## Co je technologie distribuovaných validátorů? {#what-is-dvt}

Technologie distribuovaných validátorů (DVT) je přístup k zabezpečení validátoru, který rozděluje správu klíčů a odpovědnost za podepisování mezi více stran, aby se omezily jediné body selhání a zvýšila se odolnost validátoru.

DVT distribuuje správu klíčů a podepisování tím, že **rozdělí soukromý klíč** používaný k zabezpečení validátoru **mezi mnoho počítačů** uspořádaných do „klastru“. To umožňuje, aby některé uzly v klastru přešly do režimu offline, zatímco uzel validátoru zůstane aktivní, protože nezbytnou validační práci může provést podmnožina strojů v každém klastru. Tato distribuce snižuje počet jediných bodů selhání, díky čemuž je validátor robustnější. Další výhodou distribuce podepisování pomocí DVT je, že pro útočníky je velmi obtížné získat přístup ke klíči, protože není uložen v plném znění na žádném jednotlivém stroji.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

DVT není samostatný způsob stakingu. Je to softwarová vrstva, kterou může využít jakékoli nastavení stakingu:
- [Sólo stakeři](/staking/solo/) se mohou spojit a provozovat validátor společně, nebo může jednotlivec využít DVT ke zvýšení odolnosti svého nastavení pro sólo staking.
- [Služby pro staking](/staking/saas/) a [skupiny pro společný staking](/staking/pools/) mohou využít DVT ke zvýšení odolnosti a posílení své infrastruktury pro staking, nebo k distribuci operací validátoru mezi mnoho nezávislých operátorů.

## Proč potřebujeme DVT? {#why-do-we-need-dvt}

### Bezpečnost {#security}

Validátory generují dva páry veřejných a soukromých klíčů: klíče validátoru pro účast na konsensu a klíče pro výběr pro přístup k prostředkům. Zatímco validátory mohou zabezpečit klíče pro výběr v offline úložišti (cold storage), soukromé klíče validátoru musí být online 24/7, aby mohly nepřetržitě podepisovat úkoly, které jsou validátoru přiděleny, jako jsou atestace a návrhy bloků. Udržování klíče online jej vystavuje riziku krádeže a DVT toto riziko omezuje: online jsou vždy pouze části klíče (key shares), nikdy celý klíč.

Pokud je soukromý klíč validátoru kompromitován, útočník může validátor ovládat, což může vést k penalizaci (slashing) nebo ztrátě stakerova ETH. DVT toto riziko zmírňuje. S DVT je původní, úplný klíč validátoru zašifrován a rozdělen na části. Tyto části klíče jsou online, distribuované mezi více uzlů, které společně provozují validátor, zatímco úplný „hlavní“ klíč zůstává bezpečně offline. Tato distribuce je možná, protože validátory sítě [Ethereum](/) používají podpisy BLS, které jsou aditivní, což znamená, že úplný klíč lze zrekonstruovat sečtením jeho jednotlivých částí. Částečné podpisy vytvořené pomocí částí klíče se spojí do podpisu, který je platný pro úplný klíč, takže samotný úplný klíč není pro každodenní podepisování nikdy potřeba. Když klastr vygeneruje nový klíč validátoru pomocí distribuovaného generování klíčů, úplný soukromý klíč nikdy neexistuje na žádném jednotlivém stroji.

### Žádné jediné body selhání {#no-single-point-of-failure}

Když je validátor rozdělen mezi více operátorů a více strojů, dokáže odolat selháním jednotlivého hardwaru a softwaru, aniž by přešel do režimu offline. Riziko selhání lze také snížit použitím různých hardwarových a softwarových konfigurací napříč uzly v klastru. Distribuce mezi více operátorů není nativně dostupná pro konfigurace validátoru s jedním uzlem; pochází z middlewarové vrstvy DVT.

Pokud některá z komponent stroje v klastru selže (například pokud jsou v klastru validátoru čtyři operátoři a jeden používá specifického klienta, který má chybu), ostatní mohou zajistit, že validátor poběží dál.

### Decentralizace {#decentralization}

Ideálním scénářem pro Ethereum je mít co nejvíce nezávisle provozovaných validátorů. Několik poskytovatelů stakingu se však stalo velmi populárními a představují podstatnou část celkového stakovaného ETH v síti. DVT může těmto operátorům umožnit existovat a zároveň zachovat decentralizaci staku. Je to proto, že klíče pro každý validátor jsou distribuovány mezi mnoho strojů a k tomu, aby se validátor stal škodlivým, by byla zapotřebí mnohem větší tajná dohoda.

Bez DVT je pro poskytovatele stakingu snazší podporovat pouze jednu nebo dvě konfigurace klientů pro všechny své validátory, což zvyšuje dopad chyby klienta. DVT lze využít k rozložení rizika mezi více konfigurací klientů a různý hardware, čímž se vytváří odolnost prostřednictvím diverzity.

**DVT nabízí Ethereu následující výhody:**

1. **Decentralizace** konsensu důkaz podílem (PoS) Etherea
2. Zajišťuje **živost (liveness)** sítě
3. Vytváří **odolnost validátoru proti chybám**
4. Provoz validátoru s **minimalizovanou potřebou důvěry**
5. **Minimalizovaná rizika penalizace** a výpadků
6. **Zlepšuje diverzitu** (klient, datové centrum, lokalita, regulace atd.)
7. **Zvýšená bezpečnost** správy klíčů validátoru

## Jak DVT funguje? {#how-does-dvt-work}

Implementace DVT obvykle běží jako další software na každém stroji v klastru. Tento software funguje jako middleware, který se nachází mezi klientem validátoru uzlu a jeho konsensuálním klientem, kde koordinuje s ostatními uzly v klastru tak, aby byly úkoly validátoru podepisovány kolektivně.

Řešení DVT obsahuje následující komponenty:

- **[Shamirovo sdílení tajemství](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validátory používají [klíče BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Soukromý klíč validátoru lze rozdělit na více „částí klíče“ a protože podpisy BLS jsou aditivní, částečné podpisy vytvořené pomocí těchto částí klíče lze spojit do jediného podpisu, který je platný pro úplný klíč validátoru.
- **[Schéma prahového podpisu](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Určuje počet jednotlivých částí klíče, které jsou vyžadovány pro podepisování úkolů, např. 3 ze 4.
- **[Distribuované generování klíčů (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Kryptografický proces, který generuje části klíče a používá se k distribuci částí existujícího nebo nového klíče validátoru do uzlů v klastru.
- **[Vícestranné výpočty (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Úplný klíč validátoru je generován tajně pomocí vícestranných výpočtů. Úplný klíč není nikdy znám žádnému jednotlivému operátorovi – vždy znají pouze svou vlastní část (svůj „podíl“).
- **Protokol konsensu** - Protokol konsensu vybere jeden uzel jako navrhovatele bloku. Ten sdílí blok s ostatními uzly v klastru, které přidají své části klíče k agregovanému podpisu. Když je agregován dostatek částí klíče, je blok navržen v síti Ethereum.

Distribuované validátory mají vestavěnou odolnost proti chybám a mohou běžet dál, i když některé z jednotlivých uzlů přejdou do režimu offline. Klastr uzlu validátoru je odolný, i když se ukáže, že některé uzly v něm jsou škodlivé nebo neaktivní.

## DVT v produkci {#dvt-in-production}

Distribuované validátory dnes běží na síti Mainnet napříč sólo stakingem, službami pro staking a společným stakingem. Většinu této aktivity tvoří dvě sítě:

<ProductDisclaimer />

- **Obol** vyvíjí Charon, open-source middlewarového klienta DVT, který umožňuje klastru strojů společně provozovat validátor („squad staking“). Skupiny provádějí distribuované generování klíčů a konfigurují svůj klastr prostřednictvím [DV Launchpadu](https://docs.obol.org/learn/readme/launchpad) od Obolu. Klastry Obol jsou v produkci využívány [protokoly pro staking](/staking/pools/) a [službami pro staking](/staking/saas/), včetně modulu Simple DVT od Lido a programu Operation Solo Staker od EtherFi, který zapojuje domácí operátory do klastrů odolných proti chybám.
- **SSV Network** je síť nezávislých operátorů uzlů nevyžadující povolení. Klíč validátoru je rozdělen na části a distribuován vybrané sadě operátorů, kteří plní úkoly validátoru kolektivně; žádný jednotlivý operátor nikdy nedrží úplný klíč. Služby pro staking a skupiny pro společný staking provozují na SSV velké sady validátorů a stejně jako Obol jej využívá modul Simple DVT od Lido.

## Případy užití DVT {#dvt-use-cases}

DVT má významné důsledky pro širší odvětví stakingu:

### Sólo stakeři {#solo-stakers}

DVT umožňuje **squad staking**: malá skupina lidí, jako jsou přátelé, členové komunity nebo cizinci koordinovaní prostřednictvím launchpadu, kolektivně provozuje jeden validátor na svých vlastních strojích. Aby validátor mohl plnit své úkoly, musí být online prahová hodnota skupiny (například 3 ze 4), takže výpadek, selhání hardwaru nebo chyba žádného jednotlivého člena nevyřadí validátor z provozu. Když je klíč vytvořen pomocí distribuovaného generování klíčů, žádný člen nikdy nedrží úplný podepisovací klíč.

DVT také umožňuje nekustodiální staking tím, že vám dovoluje distribuovat váš klíč validátoru mezi vzdálené uzly, zatímco úplný klíč zůstává zcela offline. To znamená, že stakeři nemusí nutně provozovat svůj vlastní hardware a distribuce částí klíče pomáhá chránit před potenciálními hacky.

### Staking jako služba (SaaS) {#saas}

Operátoři (jako jsou skupiny pro společný staking a institucionální stakeři) spravující mnoho validátorů mohou využít DVT ke snížení svého rizika. Distribucí své infrastruktury mohou do svých operací přidat redundanci a diverzifikovat typy hardwaru, které používají.

DVT sdílí odpovědnost za správu klíčů mezi více uzly, což znamená, že lze sdílet i některé provozní náklady. DVT může také snížit provozní riziko a náklady na pojištění pro poskytovatele stakingu.

### Společný staking {#staking-pools}

Kvůli standardním nastavením validátoru musely skupiny pro společný staking a poskytovatelé likvidního stakingu historicky vkládat značnou důvěru do každého jednotlivého operátora, protože zisky a ztráty jsou socializovány v rámci celé skupiny. Byli také závislí na operátorech, že zabezpečí podepisovací klíče, protože do příchodu DVT pro ně neexistovala jiná možnost.

Přestože se tradičně vyvíjí úsilí o rozložení rizika distribucí staků mezi více operátorů, každý operátor stále spravuje významný stake nezávisle. Spoléhání se na jediného operátora představuje obrovská rizika, pokud podává nedostatečný výkon, zaznamená výpadek, je kompromitován nebo jedná škodlivě.

Využitím DVT lze snížit důvěru vyžadovanou od každého jednotlivého operátora. **Skupiny mohou operátorům umožnit držet stake bez nutnosti úschovy klíčů validátoru** (protože se využívají pouze části klíče). Umožňuje také distribuovat spravované staky mezi více operátorů (např. místo toho, aby jeden operátor spravoval 1000 validátorů, DVT umožňuje, aby tyto validátory byly kolektivně provozovány více operátory). Různorodé konfigurace operátorů pomáhají zajistit, že pokud jeden operátor vypadne, ostatní budou stále schopni atestovat. Výsledná redundance a diverzifikace může vést k lepšímu výkonu a odolnosti při současné maximalizaci odměn.

Další výhodou minimalizace důvěry v jediného operátora je, že skupiny pro společný staking mohou umožnit otevřenější účast operátorů nevyžadující povolení. Některé skupiny pro společný staking to dnes dělají v produkci. Klastry DVT s více operátory umožňují protokolům spárovat domácí stakery a menší operátory s většími profesionálními, čímž se kombinují kurátorované sady operátorů se sadami nevyžadujícími povolení.

## Potenciální nevýhody používání DVT {#potential-drawbacks-of-using-dvt}

- **Další komponenta** - zavedení uzlu DVT přidává další část, která může být případně vadná nebo zranitelná. To je zmírněno existencí více implementací softwaru DVT, stejně jako existuje více klientů pro konsensuální a exekuční vrstvu.
- **Provozní náklady** - protože DVT distribuuje validátor mezi více stran, je k provozu zapotřebí více uzlů namísto pouze jednoho uzlu, což přináší zvýšené provozní náklady.
- **Potenciálně zvýšená latence** - protože DVT využívá protokol konsensu k dosažení konsensu mezi více uzly provozujícími validátor, může potenciálně přinést zvýšenou latenci.

## Často kladené dotazy {#faq}

<ExpandableCard title="Potřebuji DVT ke stakingu?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Ne. Jeden stroj s klientem validátoru funguje bez jakéhokoli softwaru DVT a toto zůstává běžným nastavením pro domácí staking. DVT je volitelná vrstva, která přidává odolnost proti chybám a odstraňuje jediné body selhání. To je užitečné, pokud chcete, aby váš validátor přežil selhání jednotlivých strojů, nebo pokud chcete sdílet odpovědnost za provoz validátoru s ostatními.
</ExpandableCard>

<ExpandableCard title="Rozděluje DVT mé ETH nebo mé klíče pro výběr?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Ne. DVT rozděluje pouze _podepisovací_ klíč validátoru, který se používá pro úkoly konsensu, jako jsou atestace a návrhy bloků. Váš stake je vždy řízen adresou pro výběr nastavenou pro validátor, která není DVT ovlivněna. Od upgradu Pectra může držitel adresy pro výběr také spustit výstup validátoru přímo z exekuční vrstvy, aniž by vůbec potřeboval podepisovací klíč.
</ExpandableCard>

<ExpandableCard title="Co se stane, když budou uzly v clusteru offline?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Dokud zůstane online prahová hodnota uzlů (například 3 ze 4), validátor nadále plní své úkoly. Pokud přejde do režimu offline příliš mnoho uzlů najednou, validátor jednoduše přejde do režimu offline a přichází o odměny, dokud se nevrátí dostatek uzlů, stejně jako jakýkoli jiný offline validátor. Přechod do režimu offline není přestupek, za který by hrozila penalizace.
</ExpandableCard>

<ExpandableCard title="Musí být cluster 3 ze 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Ne. „3 ze 4“ je pouze nejmenší běžná konfigurace a na této stránce se používá jako příklad. Velikost klastru a prahová hodnota pro podepisování se volí při vytváření klastru.

Klastry jsou obvykle dimenzovány tak, aby prahovou hodnotou byla dvoutřetinová supervětšina uzlů, což klastru umožňuje pokračovat v podepisování a zároveň tolerovat vadné nebo offline členy. Klastr se 4 uzly podepisuje pomocí 3 a toleruje 1 selhání; 7 uzlů podepisuje pomocí 5 a toleruje 2; 10 uzlů podepisuje pomocí 7 a toleruje 3. Větší klastry získávají větší odolnost proti chybám za cenu více strojů, které je třeba provozovat, a větší koordinace mezi nimi.

[Více o velikosti klastru a odolnosti](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="Je DVT to samé jako společný staking?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Ne. Společný staking kombinuje ETH od mnoha lidí k financování validátorů a je jedním z několika [způsobů stakingu](/staking/). DVT je infrastruktura pro _provoz_ validátoru. Distribuuje podepisování jednoho validátoru mezi více strojů a operátorů. Tyto dvě věci se doplňují; mnoho skupin používá DVT k distribuci svých sad operátorů, ale samotné DVT nesdružuje ničí ETH.
</ExpandableCard>

## Další čtení {#further-reading}

- [Technologie distribuovaných validátorů (DVT) Etherea - Úplný úvod](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [Co je DVT a jak zlepšuje staking na Ethereu?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Specifikace distribuovaného validátoru Etherea (vysoká úroveň)](https://github.com/ethereum/distributed-validator-specs)
- [Technické specifikace distribuovaného validátoru Etherea](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Dokumentace Obol](https://docs.obol.org/)
- [Dokumentace SSV Network](https://docs.ssv.network/)
- [Modul Simple DVT od Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Demo aplikace Shamirova sdílení tajemství](https://iancoleman.io/shamir/)