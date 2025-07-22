---
title: Bevezetés az ether világába
description: Bevezetés fejlesztőknek az ether kriptovalutába.
lang: hu
---

## Előfeltételek {#prerequisites}

Ennek az oldalnak a jobb megértése érdekében javasoljuk, hogy először olvassa el a [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/) oldalunkat.

## Mi az a kriptovaluta? {#what-is-a-cryptocurrency}

A kriptovaluta a csere eszköze, amelyet egy blokkláncalapú főkönyv biztosít.

A csere eszköze bármi lehet, amit széles körben elfogadnak az áruk és szolgáltatások kifizetésére, a főkönyv pedig egy adattároló, ahol a tranzakciókat követik. A blokklánc-technológia lehetővé teszi a felhasználóknak, hogy tranzakciókat végezzenek a főkönyvön, anélkül hogy egy harmadik félben kellene megbízniuk, aki a főkönyvet kezeli.

Az első kriptovaluta a Bitcoin volt, amelyet Satoshi Nakamoto hozott létre. A Bitcoin 2009-es elindulása óta az emberek ezernyi kriptovalutát hoztak létre számos különféle blokkláncon.

## Mi az ether? {#what-is-ether}

**Ether (ETH)** a kriptovaluta, amelyet számtalan dologra használnak az Ethereum hálózaton. Alapvetően ez az egyetlen elfogadott fizetési eszköz a tranzakciódíjakhoz, és a [Beolvadás](/roadmap/merge) után ether kell ahhoz, hogy blokkot javasoljanak és validáljanak a főhálózaton. Az ether emellett az elsődleges fedezet a [decentralizált pénzügyek (DeFi)](/defi) kölcsönzési piacain, az NFT (nem helyettesíthető token) piactereken könyvelési egység, fizetség a szolgáltatások nyújtásakor vagy termékeladáskor és még sok más esetben.

Az Ethereum lehetővé teszi a fejlesztők számára, hogy [**decentralizált alkalmazásokat (dapp)**](/developers/docs/dapps) hozzanak létre, amely ugyanazt a számítási kapacitást használja. Ez egy véges kapacitás, ezért az Ethereumnak szüksége van egy olyan mechanizmusra, amellyel megállapítható, hogy ki használja fel azt. Máskülönben egy alkalmazás véletlenül vagy rosszhiszeműen fel tudná használni a hálózat összes erőforrását, így mások nem férnének ahhoz hozzá.

Az ether kriptovaluta segíti az árazási mechanizmust az Ethereum számítógépes kapacitására vonatkozóan. Amikor a felhasználó tranzakciót akar indítani, ethert kell fizetnie, hogy ez a tranzakció bekerülhessen a blokkláncra. Ezt a felhasználói költséget [gázdíjnak (tranzakciós díj)](/developers/docs/gas/) nevezik, ami pedig attól függ, hogy az adott tranzakció végrehajtásához mennyi kapacitásra van szükség, illetve ugyanabban az időben mennyire van kereslet.

Ezért még ha egy rosszindulatú dapp egy végtelen körforgást indítana is el, a tranzakció végül kifogyna az etherből és leállna, így a hálózat visszatér a normális állapotba.

[Gyakori az, hogy összekapcsolják](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) az Ethereumot és az ethert – amikor az emberek az Ethereum árára gondolnak, akkor az ethernek az árát értik alatta.

## Az ether létrehozása (minting) {#minting-ether}

A minting az a folyamat, amikor új ethert hoznak létre az Ethereum főkönyvön. A mögöttes Ethereum protokoll kreálja az új ethert, a felhasználók nem tudnak ilyet tenni.

Az ether minden javasolt blokk jutalmaként keletkezik, illetve minden korszakban azért a validátori tevékenységért jár, ami a konszenzus létrehozását adja. A teljes kiadott összeg függ a validátorok számától, és hogy ők mennyi ethert helyeztek letétbe. Ez a teljes kiadás ideális esetben egyenlően oszlik el a validátorok között az, mivel minden validátor jóhiszemű és online van, de a valóságban változik a validátor teljesítménye alapján. A blokkjavasló a kiadott összeg 1/8-át kapja meg, a többi eloszlik a többi validátor között. A blokkjavasló emellett még borravalót kap a tranzakciós díjból és MEV-hez (maximálisan kinyerhető érték) kapcsolódó bevételt, ez azonban az újrahasznált etherből ered, nem az újból.

## Az ether elégetése {#burning-ether}

Ahogy új ether keletkezik a blokkhoz kapcsolódó jutalmak következtében, úgy meg is szűnik, amit elégetésnek nevezünk. Amikor az ethert elégetik, az örökre kivonódik a körforgásból.

Ez minden tranzakciónál megtörténik az Ethereumon. Amikor a felhasználó fizet a tranzakcióért, akkor az alap gázdíj, amit a kereslet alapján állapít meg a rendszer, megsemmisül. Ez megkönnyíti a tranzakciós illeték becslését az Ethereumon, tekintve, hogy a blokkméretek változóak és van egy maximális gázdíj. Amikor nagy a kereslet a hálózaton, akkor a [blokkok](https://etherscan.io/block/12965263) több ethert égetnek el, mint amennyit létrehoznak, tehát ellentételezik a kibocsátást.

Az alapdíj elégetése megakadályozza, hogy a blokk-készítők manipulálják a tranzakciókat. Például, ha egy blokk-készítő megkapná az alapdíjat, akkor a saját tranzakcióit ingyen tehetné be, míg a többiek díját megemelné. Alternatívaként vissza lehetne adni az alapdíjat a felhasználóknak láncon kívül, ami egy homályosabb és komplexebb tranzakciósilleték-piachoz vezetne.

## Az ether címletei {#denominations}

Mivel számos tranzakció értéke az Ethereumon viszonylag kicsi, ezért az ether számos címlettel bír, amelyek kisebb egységek. Ezekből a wei és a gwei a legfontosabbak.

Wei a legkisebb címlet, ezért sok technikai bevezetés, mint az [Ethereum Sárga könyv](https://ethereum.github.io/yellowpaper/paper.pdf) minden kalkulációt ebben végez.

Gwei vagyis giga wei általában a gázdíj meghatározásában jelenik meg az Ethereumon.

| Címlet | Érték etherben   | Gyakori használat                  |
| ------ | ---------------- | ---------------------------------- |
| Wei    | 10<sup>-18</sup> | Technikai implementáció            |
| Gwei   | 10<sup>-9</sup>  | A felhasználóknak érthető gázdíjak |

## Az ether küldése {#transferring-ether}

Az Ethereumon minden tranzakció tartalmaz egy `value` (érték) mezőt, ami az elküldendő ether összegét mutatja wei címletben, hogy a küldő címéről a fogadó címére érkezzen.

Amikor a fogadó címe egy [okosszerződés](/developers/docs/smart-contracts/), akkor ezt az elküldött ethert a gázdíjak fizetésére is használhatják, amikor az okosszerződés végrehajtja a programkódját.

[Bővebben a tranzakciókról](/developers/docs/transactions/)

## Az ether-egyenleg lekérdezése {#querying-ether}

A felhasználók bármelyik [számla](/developers/docs/accounts/) egyenlegét meg tudják nézni az adott számla `balance` (egyenleg) mezőjében, ami az ott lévő ethert weiben mutatja.

Az [Etherscan](https://etherscan.io) egy népszerű eszköz arra, hogy egy webalapú alkalmazásban megnézhessék egy adott cím egyenlegét. Például [ez az Etherscan oldal](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) megmutatja az Ethereum Alapítvány egyenlegét. A számlaegyenlegeket a tárcák lekérdezésével vagy a csomópontokon közvetlenül is meg lehet nézni.

## További olvasnivaló {#further-reading}

- [Az Ether és az Ethereum meghatározása](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Ethereum fehérkönyv](/whitepaper/): Az eredeti javaslat az Ethereum megalkotására. A jelen dokumentum az ether lényegét és a kialakításának célját írja le.
- [Gwei-kalkulátor](https://www.alchemy.com/gwei-calculator): Használja ezt a gwei-kalkulátort, hogy könnyedén váltson wei, gwei és ether címleteket. Egyszerűen adja meg az összeget weiben, gweiben vagy ETH-ban, és automatikusan kiszámolja az átváltást.

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_
