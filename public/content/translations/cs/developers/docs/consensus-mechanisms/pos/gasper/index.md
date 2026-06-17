---
title: Gasper
description: Vysvětlení mechanismu Gasper v rámci důkazu podílem (PoS).
lang: cs
---

Gasper je kombinací Casper the Friendly Finality Gadget (Casper FFG) a algoritmu volby forku LMD-GHOST. Společně tyto komponenty tvoří mechanismus konsensu, který zabezpečuje Ethereum na bázi důkazu podílem (PoS). Casper je mechanismus, který povyšuje určité bloky na „finalizované“, takže noví účastníci v síti si mohou být jisti, že synchronizují kanonický řetězec. Algoritmus volby forku využívá nashromážděné hlasy k zajištění toho, aby uzly mohly snadno vybrat ten správný, když v blockchainu vzniknou forky.

**Poznámka:** Původní definice Casper FFG byla pro začlenění do Gasperu mírně upravena. Na této stránce se zabýváme aktualizovanou verzí.

## Předpoklady {#prerequisites}

Pro pochopení tohoto materiálu je nutné si přečíst úvodní stránku o [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Role Gasperu {#role-of-gasper}

Gasper funguje nad blockchainem s důkazem podílem (PoS), kde uzly poskytují ether jako bezpečnostní zálohu, která může být zničena, pokud jsou při navrhování nebo validaci bloků líné nebo nečestné. Gasper je mechanismus definující, jak jsou validátory odměňovány a trestány, jak rozhodují, které bloky přijmout a odmítnout, a na kterém forku blockchainu stavět.

## Co je to finalita? {#what-is-finality}

Finalita je vlastnost určitých bloků, která znamená, že nemohou být zvráceny, pokud nedojde ke kritickému selhání konsensu a útočník nezničí alespoň 1/3 celkového etheru vloženého jako stake. Finalizované bloky lze chápat jako informace, kterými si je blockchain jistý. Aby byl blok finalizován, musí projít dvoukrokovým procesem povýšení:

1. Dvě třetiny celkového etheru vloženého jako stake musí hlasovat pro zahrnutí tohoto bloku do kanonického řetězce. Tato podmínka povyšuje blok na „ospravedlněný“. Je nepravděpodobné, že by ospravedlněné bloky byly zvráceny, ale za určitých podmínek se tak může stát.
2. Když je další blok ospravedlněn nad již ospravedlněným blokem, je povýšen na „finalizovaný“. Finalizace bloku je závazek zahrnout blok do kanonického řetězce. Nemůže být zvrácen, pokud útočník nezničí miliony etherů (miliardy USD).

Tato povyšování bloků se nedějí v každém slotu. Místo toho mohou být ospravedlněny a finalizovány pouze bloky na hranici epochy. Tyto bloky jsou známé jako „kontrolní body“. Povyšování zvažuje dvojice kontrolních bodů. Mezi dvěma po sobě jdoucími kontrolními body musí existovat „spojení supervětšiny“ (tj. dvě třetiny celkového etheru vloženého jako stake hlasují, že kontrolní bod B je správným potomkem kontrolního bodu A), aby se starší kontrolní bod povýšil na finalizovaný a novější blok na ospravedlněný.

Protože finalita vyžaduje dvoutřetinovou shodu na tom, že je blok kanonický, útočník nemůže vytvořit alternativní finalizovaný řetězec bez toho, aby:

1. Vlastnil nebo manipuloval se dvěma třetinami celkového etheru vloženého jako stake.
2. Zničil alespoň jednu třetinu celkového etheru vloženého jako stake.

První podmínka vyplývá z toho, že k finalizaci řetězce jsou potřeba dvě třetiny etheru vloženého jako stake. Druhá podmínka vzniká proto, že pokud dvě třetiny celkového staku hlasovaly pro oba forky, pak jedna třetina musela hlasovat pro oba. Dvojité hlasování je podmínkou pro penalizaci, která by byla maximálně potrestána, a jedna třetina celkového staku by byla zničena. K květnu 2022 by to vyžadovalo, aby útočník spálil ether v hodnotě přibližně 10 miliard dolarů. Algoritmus, který ospravedlňuje a finalizuje bloky v Gasperu, je mírně upravenou formou [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Pobídky a penalizace {#incentives-and-slashing}

Validátory jsou odměňovány za poctivé navrhování a validaci bloků. Ether je vyplácen jako odměna a přidáván k jejich staku. Na druhou stranu validátory, které jsou nepřítomné a nekonají, když jsou k tomu vyzvány, přicházejí o tyto odměny a někdy ztrácejí malou část svého stávajícího staku. Tresty za to, že jsou offline, jsou však malé a ve většině případů představují pouze náklady obětované příležitosti v podobě ušlých odměn. Některé akce validátorů je však velmi obtížné provést omylem a naznačují zlý záměr, jako je navrhování více bloků pro stejný slot, atestování více bloků pro stejný slot nebo odporování předchozím hlasům pro kontrolní body. Jedná se o chování podléhající penalizaci, které je trestáno přísněji – penalizace vede ke zničení části staku validátoru a k jeho odstranění ze sítě validátorů. Tento proces trvá 36 dní. První den je udělena počáteční penalizace až do výše 1 ETH. Poté ether penalizovaného validátoru pomalu uniká během období výstupu, ale 18. den obdrží „korelační penalizaci“, která je tím větší, čím více validátorů je penalizováno ve stejnou dobu. Maximálním trestem je celý stake. Tyto odměny a tresty jsou navrženy tak, aby motivovaly poctivé validátory a odrazovaly od útoků na síť.

### Únik za neaktivitu {#inactivity-leak}

Kromě bezpečnosti poskytuje Gasper také „pravděpodobnou živost“ (plausible liveness). To je podmínka, že dokud dvě třetiny celkového etheru vloženého jako stake hlasují poctivě a dodržují protokol, řetězec bude schopen finalizovat bez ohledu na jakoukoli jinou aktivitu (jako jsou útoky, problémy s latencí nebo penalizace). Jinými slovy, jedna třetina celkového etheru vloženého jako stake musí být nějakým způsobem kompromitována, aby se zabránilo finalizaci řetězce. V Gasperu existuje další obranná linie proti selhání živosti, známá jako „únik za neaktivitu“. Tento mechanismus se aktivuje, když se řetězci nepodaří finalizovat po dobu delší než čtyři epochy. Validátorům, které aktivně neatestují většinový řetězec, je jejich stake postupně odčerpáván, dokud většina nezíská zpět dvě třetiny celkového staku, což zajišťuje, že selhání živosti jsou pouze dočasná.

### Volba forku {#fork-choice}

Původní definice Casper FFG zahrnovala algoritmus volby forku, který ukládal pravidlo: `follow the chain containing the justified checkpoint that has the greatest height`, kde výška je definována jako největší vzdálenost od genesis bloku. V Gasperu je původní pravidlo volby forku zavrženo ve prospěch sofistikovanějšího algoritmu zvaného LMD-GHOST. Je důležité si uvědomit, že za normálních podmínek není pravidlo volby forku nutné – pro každý slot existuje jediný navrhovatel bloku a poctivé validátory jej atestují. Algoritmus volby forku je vyžadován pouze v případech velké asynchronicity sítě nebo když nečestný navrhovatel bloku jedná dvojznačně. Když však tyto případy nastanou, algoritmus volby forku je kritickou obranou, která zabezpečuje správný řetězec.

LMD-GHOST je zkratka pro „latest message-driven greedy heaviest observed sub-tree“ (nejtěžší pozorovaný podstrom řízený nejnovějšími zprávami). Jedná se o žargonem nabitý způsob definice algoritmu, který vybírá fork s největší nashromážděnou váhou atestací jako ten kanonický (greedy heaviest subtree) a který v případě, že je od validátoru přijato více zpráv, bere v úvahu pouze tu nejnovější (latest-message driven). Před přidáním nejtěžšího bloku do svého kanonického řetězce každý validátor posoudí každý blok pomocí tohoto pravidla.

## Další čtení {#further-reading}

- [Gasper: Kombinace GHOST a Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)