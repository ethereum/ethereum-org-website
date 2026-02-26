---
title: Gasper
description: "Vysvětlení mechanismu důkazu podílem Gasper."
lang: cs
---

Gasper je kombinací Casper the Friendly Finality Gadget (Casper-FFG) a algoritmu pro výběr větve LMD-GHOST. Tyto komponenty společně tvoří mechanismus konsenzu, který zabezpečuje Ethereum na bázi důkazu podílem. Casper je mechanismus, který povyšuje určité bloky na „finalizované“, takže noví účastníci sítě si mohou být jisti, že synchronizují kanonický řetězec. Algoritmus pro výběr větve využívá nahromaděné hlasy, aby zajistil, že uzly mohou snadno vybrat tu správnou větev, když v blockchainu vzniknou větve.

**Upozornění:** Původní definice Casper-FFG byla pro zařazení do systému Gasper mírně aktualizována. Na této stránce se budeme zabývat aktualizovanou verzí.

## Předpoklady

Pro pochopení tohoto materiálu je nutné si přečíst úvodní stránku o [důkazu podílem](/developers/docs/consensus-mechanisms/pos/).

## Role systému Gasper {#role-of-gasper}

Gasper funguje na blockchainu s důkazem podílem, kde uzly poskytují ether jako bezpečnostní zálohu, která může být zničena, pokud jsou nečinné nebo nečestné při navrhování nebo validaci bloků. Gasper je mechanismus, který definuje, jak jsou validátoři odměňováni a trestáni, jak se rozhodují, které bloky přijmout a které odmítnout a na které větvi blockchainu stavět.

## Co je to finalita? {#what-is-finality}

Finalita je vlastnost určitých bloků, která znamená, že nemohou být vráceny zpět, pokud nedošlo ke kritickému selhání konsenzu a útočník nezničil alespoň 1/3 celkového uzamčeného etheru. Finalizované bloky lze považovat za informace, kterými si je blockchain jistý. Aby mohl být blok finalizován, musí projít dvoukrokovým procesem vylepšení:

1. Dvě třetiny z celkového uzamčeného etheru musí hlasovat pro zahrnutí tohoto bloku do kanonického řetězce. Tato podmínka povýší blok na „justifikovaný“. Je nepravděpodobné, že by justifikované bloky byly vráceny zpět, ale za určitých podmínek se to může stát.
2. Když je další blok justifikován nad justifikovaným blokem, je povýšen na „finalizovaný“. Finalizace bloku je závazek zahrnout daný blok do kanonického řetězce. Nelze jej vrátit zpět, pokud útočník nezničí miliony etheru (miliardy USD).

Tato vylepšení bloků se nedějí v každém slotu. Místo toho lze justifikovat a finalizovat pouze bloky na hranicích epoch. Tyto bloky jsou známé jako „checkpointy“. Vylepšení se týká dvojic checkpointů. Mezi dvěma po sobě jdoucími checkpointy musí existovat „propojení nadpoloviční většinou“ (tzn. dvě třetiny z celkového uzamčeného etheru hlasují, že checkpoint B je správným potomkem checkpointu A), aby se starší checkpoint povýšil na finalizovaný a novější blok na justifikovaný.

Protože finalita vyžaduje dvoutřetinovou shodu na tom, že blok je kanonický, útočník nemůže vytvořit alternativní finalizovaný řetězec, aniž by:

1. Vlastnil nebo manipuloval se dvěma třetinami z celkového uzamčeného etheru.
2. Zničil alespoň jednu třetinu z celkového uzamčeného etheru.

První podmínka vyplývá z toho, že k finalizaci řetězce jsou zapotřebí dvě třetiny uzamčeného etheru. Druhá podmínka vyplývá z toho, že pokud dvě třetiny z celkového podílu hlasovaly pro obě větve, pak jedna třetina musela hlasovat pro obě. Dvojí hlasování je podmínka pro slashing, která by byla maximálně potrestána a jedna třetina celkového podílu by byla zničena. K květnu 2022 to vyžaduje, aby útočník spálil ether v hodnotě zhruba 10 miliard dolarů. Algoritmus, který v systému Gasper justifikuje a finalizuje bloky, je mírně upravenou formou [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Pobídky a slashing {#incentives-and-slashing}

Validátoři jsou odměňováni za poctivé navrhování a validaci bloků. Ether je odměňován a přidáván k jejich podílu. Na druhou stranu validátoři, kteří jsou nepřítomní a nekonají, když jsou k tomu vyzváni, o tyto odměny přicházejí a někdy ztratí malou část svého stávajícího podílu. Sankce za offline stav jsou však malé a ve většině případů se rovnají nákladům ušlé příležitosti ze ztracených odměn. Některé akce validátorů je však velmi obtížné provést náhodou a značí nějaký zlovolný úmysl, jako je navrhování více bloků pro stejný slot, atestování více bloků pro stejný slot nebo protiřečení si s předchozími hlasy o checkpointech. Jedná se o chování, které je „trestatelné slashingem“ a které je trestáno přísněji – slashing má za následek zničení části podílu validátora a jeho odstranění ze sítě validátorů. Tento proces trvá 36 dní. První den je udělena počáteční pokuta až do výše 1 ETH. Poté ether slasheovaného validátora během doby odchodu pomalu odtéká, ale 18. den obdrží „korelační pokutu“, která je vyšší, když je ve stejnou dobu slasheováno více validátorů. Maximální trest je celý podíl. Tyto odměny a tresty jsou navrženy tak, aby motivovaly poctivé validátory a odrazovaly od útoků na síť.

### Únik z neaktivity {#inactivity-leak}

Kromě zabezpečení poskytuje Gasper také „pravděpodobnou živost“. Je to podmínka, že dokud dvě třetiny z celkového uzamčeného etheru hlasují poctivě a dodržují protokol, řetězec bude schopen finalizace bez ohledu na jakoukoli jinou aktivitu (jako jsou útoky, problémy s latencí nebo slashing). Jinými slovy, jedna třetina celkového uzamčeného etheru musí být nějakým způsobem kompromitována, aby se zabránilo finalizaci řetězce. V systému Gasper existuje další obranná linie proti selhání živosti, známá jako „únik z neaktivity“. Tento mechanismus se aktivuje, když se řetězci nepodařilo finalizovat déle než čtyři epochy. Validátorům, kteří aktivně neatestují většinový řetězec, se postupně odčerpává jejich podíl, dokud většina znovu nezíská dvoutřetinový podíl z celkového objemu, což zajišťuje, že selhání živosti jsou pouze dočasná.

### Výběr větve {#fork-choice}

Původní definice Casper-FFG zahrnovala algoritmus pro výběr větve, který zavedl pravidlo: `sledujte řetězec obsahující justifikovaný checkpoint, který má největší výšku`, kde výška je definována jako největší vzdálenost od genesis bloku. V systému Gasper je původní pravidlo pro výběr větve zastaralé a nahrazeno sofistikovanějším algoritmem zvaným LMD-GHOST. Je důležité si uvědomit, že za normálních podmínek není pravidlo pro výběr větve nutné – pro každý slot existuje jediný navrhovatel bloku a poctiví validátoři jej atestují. Algoritmus pro výběr větve je vyžadován pouze v případech velké asynchronicity sítě nebo když se nepoctivý navrhovatel bloku dopustil ekvivokace. Když však tyto případy nastanou, algoritmus pro výběr větve je kritickou obranou, která zajišťuje správný řetězec.

LMD-GHOST je zkratka pro „latest message-driven greedy heaviest observed sub-tree“ (nejnovější zprávou řízený chamtivý nejtěžší pozorovaný podstrom). Jedná se o odborný způsob, jak definovat algoritmus, který jako kanonickou větev vybere tu s největší nahromaděnou váhou atestací (chamtivý nejtěžší podstrom) a který v případě, že je od validátora přijato více zpráv, bere v úvahu pouze tu poslední (řízený nejnovější zprávou). Před přidáním nejtěžšího bloku do svého kanonického řetězce každý validátor posoudí každý blok pomocí tohoto pravidla.

## Další čtení {#further-reading}

- [Gasper: Kombinace GHOST a Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
