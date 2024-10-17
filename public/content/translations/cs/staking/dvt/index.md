---
title: Technologie distribuovaných validátorů
description: Technologie distribuovaných validátorů umožňuje distribuovaný provoz ethereovského validátoru více stranami.
lang: cs
---

# Technologie distribuovaných validátorů {#distributed-validator-technology}

Technologie distribuovaných validátorů (DVT) je přístup k zabezpečení validátoru, který dělí odpovědnost za přístupová hesla a podepisování mezi více stran, a to za účelem snížení pravděpodobnosti selhání a zvýšení odolnosti validátoru.

Principem je **rozdělení privátního klíče** používaného k zabezpečení validátoru **mezi více počítačů** organizovaných do klastru. Výhodou tohoto rozdělení je, že útočníci musí vynaložit mnohem více energie, aby se dostali k privátnímu klíči, protože na žádném počítači není uložen celý. Taktéž umožňuje vypnutí některých síťových uzlů, protože potřebné podpisy mohou být generovány podmnožinou počítačů v každém klastru. To snižuje pravděpodobnost selhání a zvyšuje odolnost celého souboru validátorů.

![Diagram znázorňující, jak je klíč validátora rozdělen na části a distribuován mezi více síťových uzlů s různými komponenty.](./dvt-cluster.png)

## Proč potřebujeme DVT? {#why-do-we-need-dvt}

### Bezpečnost {#security}

Validátory generují dva páry privátních a veřejných klíčů: Klíče pro účast v konsensu a klíče pro výběr finančních prostředků. Zatímco klíče pro výběr je možné uchovávat v bezpečí cold storage, privátní klíče validátorů musí být neustále online. Pokud je privátní klíč odhalen, útočník může tento validátor ovládnout a potenciálně dojde k trestu nebo ztrátě vloženého ETH. DVT může validátorům pomoci toto riziko snížit. Jak to funguje:

Vkladatelé se mohou podílet na vkládání a zároveň uchovávat privátní klíč svého validátoru v cold storage, pokud používají DVT. Původní privátní klíč je totiž zašifrován a poté rozdělen na několik částí. Tyto části jsou online sdíleny mezi více síťových uzlů, což umožňuje distribuovaný provoz validátoru. To je možné díky tomu, že validátory Etherea používají BLS podpisy, které jsou aditivní, což znamená, že úplný klíč lze obnovit součtem jeho složek. To umožňuje vkladateli uchovávat plný původní „master“ klíč validátoru v bezpečí offline.

### Žádná slabá místa {#no-single-point-of-failure}

Když je validátor rozdělen mezi více provozovatelů a více strojů, dokáže odolat individuálním hardwarovým a softwarovým poruchám bez toho, aby byl odpojen. Riziko selhání lze také snížit tím, že se použijí různé konfigurace hardwaru a softwaru na síťových uzlech v klastru. Tato odolnost je nedostupná pro konfigurace validátorů s jedním síťovým uzlem - pochází právě z vrstvy DVT.

Pokud některá z komponent počítače v klastru selže (například pokud jsou v klastru validátorů čtyři provozovatelé a jeden používá specifického klienta, který má chybu), ostatní provozovatelé zajistí, že validátor bude nadále fungovat.

### Decentralizace {#decentralization}

Ideálním scénářem pro Ethereum je existence co nejvíce nezávisle provozovaných validátorů. Nicméně několik poskytovatelů vkládání je v současné době velmi populárních a spravuje značnou část celkově vložených ETH. DVT umožňuje provoz těchto validátorů, aniž by utrpěla decentralizace vloženého kapitálu. A to díky tomu, že klíče každého validátoru jsou distribuovány mezi více počítačů a bylo by třeba, aby se na případné podvodné aktivitě validátoru shodlo mnohem větší množství držitelů těchto částí klíče.

Bez DVT je snazší, aby poskytovatelé vkládání používali pouze jednu nebo dvě konfigurace klienta pro všechny své validátory, což zvyšuje dopad případné chyby v klientu. DVT lze použít k rozložení rizika mezi různé konfigurace klienta a různý hardware a díky této rozmanitosti se zvyšuje odolnost.

**DVT poskytuje Ethereu tyto výhody:**

1. **Decentralizuje** ethereovský konsensus důkazu podílem.
2. Zabezpečuje **životaschopnost** sítě.
3. Vytváří **toleranci validátorů k chybám**.
4. **Snižuje důvěru** operací validátoru.
5. **Minimalizuje tresty** a rizika výpadku.
6. **Vylepšuje rozmanitost** (klient, datové centrum, lokace, regulace, atd.).
7. **Zvyšuje bezpečnost** klíčů validátorů.

## Jak DVT funguje? {#how-does-dvt-work}

DVT obsahuje tyto komponenty:

- **[Shamirův systém tajného sdílení](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** – Validátory používají [BLS klíče](https://en.wikipedia.org/wiki/BLS_digital_signature). Jednotlivé BLS „části klíče“ („key shares“) lze sloučit do jediného agregovaného klíče (podpisu). V DVT je privátní klíč validátora kombinovaným BLS podpisem každého operátora v klastru.
- **[Schéma minimálního podpisu](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** – Určuje, kolik částí klíče je potřeba pro podpis, například 3 ze 4.
- **[Distribuované generování klíčů (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** – Kryptografický proces, který generuje jednotlivé části klíče a slouží k distribuci podílů existujícího nebo nového klíče validátoru síťovým uzlům v klastru.
- **[Vícestranný výpočet (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** – Kompletní klíč validátoru je generován tajně pomocí vícestranného výpočtu. Celý klíč není znám žádnému operátorovi – každý zná pouze svoji část (svůj „podíl“).
- **Konsenzuální protokol** – Konsenzuální protokol vybere jeden síťový uzel, který se stane navrhovatelem bloku. Tento síťový uzel sdílí blok s ostatními síťovými uzly v klastru, které přidávají své části klíče k agregovanému podpisu. Jakmile je agregován dostatečný počet částí klíče, blok je navržen na Ethereum.

Distribuované validátory mají naprogramovanou toleranci k chybám a mohou pokračovat v provozu i v případě, že se některé individuální síťové uzly odpojí. To znamená, že klastr je odolný i v případě, že jsou některé síťové uzly v něm napadeny nebo že jsou nefunkční.

## Příklady použití DVT {#dvt-use-cases}

DVT má významné důsledky pro širší ekosystém vkládání:

### Samostatní vkladatelé {#solo-stakers}

DVT umožňuje i vkládání bez prostředníka a to tak, že rozloží klíč validátoru mezi vzdálené síťové uzly, přičemž celý klíč zůstane úplně offline. To znamená, že vkladatelé, kteří pracují z domova, nemusí nutně vynakládat finanční prostředky na hardware, zatímco distribuce částí klíče jim může pomoci zvýšit odolnost proti potenciálním hackům.

### Staking as a service (SaaS) {#saas}

Operátoři (jako jsou vkladové fondy a institucionální vkladatelé), kteří spravují více validátorů, mohou pomocí DVT snížit svá rizika. Distribuováním infrastruktury mohou přidat do svých výpočtů redundanci a diverzifikovat druhy hardware, který při vkládání používají.

DVT sdílí odpovědnost za správu klíčů mezi více síťových uzlů, což znamená, že i některé provozní náklady mohou být sdíleny. DVT může také snížit operační riziko a náklady na pojištění pro poskytovatele vkládání.

### Staking pools {#staking-pools}

Díky standardním nastavením validátorů jsou vkladové fondy a poskytovatelé likvidního vkládání nuceni mít různé úrovně důvěry jednotlivým operátorům, protože zisky a ztráty jsou sdíleny v rámci fondu. Musejí se také spoléhat na operátory, kterým svěřují zabezpečení podpisového klíče, protože dosud pro ně neexistovala jiná možnost.

I když se tradičně snažili o rozložení rizika tím, že se vklad rozdělil mezi více operátorů, každý operátor i tak samostatně spravoval významné částky. Pokud by operátor nebyl schopen provádět dané úkony, měl výpadek, byl napaden nebo se dopustil podvodného jednání, představuje přístup, kdy se na něj spoléhá celý fond, obrovské riziko.

Pokud ale pool využívá DVT, je míra potřebné důvěry v operátory významně snížena. **Fondy mohou operátorům umožnit držet staky, aniž by potřebovali spravovat klíč validátoru** (jsou využívány pouze části klíče). DVT dále umožňuje rozdělit spravované vklady mezi více operátorů (například místo toho, aby jeden operátor spravoval 1 000 validátorů, DVT umožňuje, aby byly tyto validátory provozovány kolektivně více operátory). Různé konfigurace operátorů zajistí, že pokud jeden operátor selže, ostatní budou stále schopni fungovat. To vede k redundanci a diverzifikaci systému, což vede ke zlepšení výkonu a odolnosti a zároveň maximalizaci odměn poolu.

Další výhodou minimalizace důvěry vůči jednotlivým operátorům je to, že vkladové fondy mohou umožnit otevřenější účast bez nutnosti schvalování operátorů. Tímto způsobem mohou snížit svá rizika a podpořit decentralizaci Etherea tím, že budou zapojovat jak supervizované operátory, tak operátory bez nutnosti schvalování, například tím, že budou spojovat domácí nebo menší vkladatele s těmi většími.

## Potenciální nevýhody DVT {#potential-drawbacks-of-using-dvt}

- **Dodatečná komponenta** – zavedení DVT síťového uzlu přidává do systému další část, která může být potenciálně poruchová nebo zranitelná. Eliminovat tento problém je možné pomocí implementace dalších DVT síťových uzlů, což znamená více DVT klientů (stejně jako existuje více klientů pro konsenzuální a exekuční vrstvy).
- **Provozní náklady** – protože DVT distribuuje validátor mezi více účastníků, je k provozu zapotřebí více síťových uzlů namísto jednoho, což zvyšuje provozní náklady.
- **Potenciálně zvýšená latence** – protože DVT využívá konsenzuální protokol k dosažení konsenzu mezi více síťovými uzly, které provozují validátor, může potenciálně způsobit zvýšenou latenci.

## Další informace {#further-reading}

- [Specifikace distribuovaných validátorů Etherea (pro pokročilé)](https://github.com/ethereum/distributed-validator-specs)
- [Technická specifikace distribuovaných validátorů Etherea](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Demo aplikace pro Shamirovo sdílení hesel](https://iancoleman.io/shamir/)
