---
title: Bevezetés az Ethereum stack-be
description: Egy áttekintő az Ethereum stack különböző rétegeiről és arról, hogyan illenek egymásba.
lang: hu
---

Mint bármely szoftverstack, az „Ethereum-stack” is változni fog projektről projektre az Ön céljaitól függően.

Vannak azonban alap Ethereum technológiák, melyek segítenek egy mentális modellt szolgáltatni arról, hogy a szoftver alkalmazások hogyan lépnek interakcióba az Ethereum blokklánccal. A stack rétegeinek megértése segíteni fog megérteni az Ethereum szoftver projektekbe történő integrálásának különböző módjait.

## Első szint: Ethereum Virtuális Gép {#ethereum-virtual-machine}

Az [Ethereum virtuális gép (EVM)](/developers/docs/evm/) egy futtatókörnyezet az Ethereumon az okosszerződések számára. Az Ethereum blokkláncon minden okosszerződést és állapot változást [tranzakciók](/developers/docs/transactions/) hajtanak végre. Az EVM kezeli az összes tranzakció feldolgozását az Ethereum hálózaton.

Mint bármilyen virtuális gép esetében, az EVM egy absztrakciós szintet hoz létre a kód végrehajtás és a végrehajtó gép (egy Ethereum csomópont) között. Az EVM jelenleg több ezer csomóponton fut szerte a világban.

A háttérben az EVM opcode utasítások sorozatát használja meghatározott feladatok végrehajtásához. Ez a (140 egyedi) operációs kód lehetővé teszi az EVM számára, hogy [Turing-teljes](https://en.wikipedia.org/wiki/Turing_completeness) legyen, tehát az EVM bármit ki tud számolni, ha elég erőforrás áll rendelkezésre.

Dapp fejlesztőként nem kell sokat tudnod az EVM-ről azon kívül, hogy létezik és megbízhatóan működteti az összes Ethereum alkalmazást állásidő nélkül.

## Második szint: Okosszerződések {#smart-contracts}

Az [okosszerződések](/developers/docs/smart-contracts/) olyan futtatható programok, melyek az Ethereum blokkláncon futnak.

Az okosszerződéseket specifikus [programozási nyelveken](/developers/docs/smart-contracts/languages/) írják, melyek EVM bájtkódra fordítódnak (alacsony szintű gépi instrukciók, melyeket opcode-nak nevezünk).

Az okosszerződések nem csak nyílt forráskódú könyvtáraknak felelnek meg, hanem lényegében nyílt API szolgáltatásokként működnek, melyek 24/7-ben futnak és nem lehet őket leállítani. Az okosszerződések nyilvános függvényeket szolgáltatnak, amelyeket a felhasználók és az alkalmazások ([dappok](/developers/docs/dapps/)) engedély nélkül meghívhatnak. Bármelyik alkalmazás összekapcsolható a működő okosszerződésekkel, hogy valamilyen funkcionalitást alkosson, mint például [adatok használata](/developers/docs/oracles/), illetve támogassa a tokenek átváltását. Bárki telepíthet új okosszerződéseket az Ethereumra, hogy tetszőleges funkcionalitást adjon, mely egyezik az alkalmazás szükségleteivel.

Dapp fejlesztőként csak akkor kell okosszerződéseket írnia, ha szeretne egyedi funkciókat hozzáadni az Ethereum blokklánchoz. Hamar rájöhetsz, hogy a projekted legtöbb célját elérheted csupán a létező okosszerződések integrálásával, például ha szeretnéd használni a stablecoin fizetéseket vagy lehetővé tenni a tokenek decentralizált cseréjét.

## Harmadik szint: Ethereum csomópontok {#ethereum-nodes}

Ahhoz, hogy az alkalmazás az Ethereum-blokklánccal működni tudjon, egy [Ethereum-csomóponthoz](/developers/docs/nodes-and-clients/) kell kapcsolódnia. Egy ilyen csomópont lehetővé teszi, hogy elérje a blokkláncon lévő adatokat és/vagy tranzakciókat küldjön a hálózatnak.

Az Ethereum csomópontok egy szoftvert - Ethereum klienst - futtató számítógépek. Egy kliens egy Ethereum implementáció, mely hitelesíti az összes tranzakciót az egyes blokkokban, így a hálózat biztonságos marad az adatok pedig pontosak. **Az Ethereum-csomópontok összessége az Ethereum-blokklánc**. Kollektívan tárolják az Ethereum blokklánc állapotát és konszenzust érnek el a tranzakciókon, melyek a blokklánc állapotot megváltoztatják.

Hogyha összekapcsolja az alkalmazást egy Ethereum-csomóponttal ([JSON RPC-n](/developers/docs/apis/json-rpc/) keresztül), akkor az alkalmazás képes lesz adatokat leolvasni a blokkláncról (például felhasználóiszámla-egyenlegek), illetve új tranzakciókat közvetíteni a hálózatra (például ETH-átutalás felhasználói számlák között, illetve okosszerződés-függvények futtatása).

## Négyes szint: Ethereum kliens API-ok {#ethereum-client-apis}

Sok kényelmi könyvtár (melyet az Ethereum nyílt forráskódú közössége fejleszt és tart karban) lehetővé teszi a végfelhasználói alkalmazásodnak, hogy rácsatlakozzon és kommunikáljon az Ethereum blokklánccal.

Ha a felhasználó oldali alkalmazásod egy web app, akkor érdemes `npm install`-lal telepítened egy [JavaScript API-t](/developers/docs/apis/javascript/) közvetlenül a frontendedre. Vagy lehet, hogy érdemesebb ezt a funkcionalitást a szerver oldalon implementálni egy [Python](/developers/docs/programming-languages/python/) vagy egy [Java](/developers/docs/programming-languages/java/) API-on keresztül.

Annak ellenére, hogy ezek az API-ok nem szükséges elemei a stack-nek, sok komplexitást egyszerűsítenek le, amikor egy Ethereum csomóponttal szeretnénk kommunikálni. Ezen kívül használati függvényeket is szolgáltatnak (pl.: ETH konvertálása Gwei-be), így fejlesztőként kevesebb időt kell az Ethereum kliensek bonyodalmaival foglalkoznod és több időd jut egyedi funkcionalitást kialakítani az alkalmazásodnak.

## Ötös szint: Végfelhasználói alkalmazások {#end-user-applications}

A stack tetején a felhasználó oldali alkalmazások állnak. Ezek a standard alkalmazások, melyeket rendszeresen használsz és fejlesztesz manapság: főleg web és mobil alkalmazások.

Ahogy ezeket a felhasználói felületeket fejleszted lényegében nem változott. Gyakran a felhasználóknak nem kell tudniuk arról, hogy az alkalmazás amit használnak, egy blokkláncot használ.

## Készen áll kiválasztani a stacket? {#ready-to-choose-your-stack}

Nézze meg az útmutatónkat, hogy[felállítson egy helyi fejlesztői környezetet](/developers/local-environment/) az Ethereum alkalmazásának.

## További olvasnivaló {#further-reading}

- [A web 3.0 alkalmazások architektúrája](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_
