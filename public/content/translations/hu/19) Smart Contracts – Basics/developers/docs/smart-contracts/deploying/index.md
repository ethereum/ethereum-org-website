---
title: Okos szerződések telepítése
description:
lang: hu
---

Telepítenie kell az okosszerződését azért, hogy az Ethereum hálózat felhasználói számára elérhető legyen.

Egy okosszerződés telepítéséhez csak el kell küldenie egy Ethereum-tranzakciót, mely tartalmazza az átfordított kódot címzett megadása nélkül.

## Előfeltételek {#prerequisites}

Érdemes tisztában lennie az [Ethereum hálózatokkal](/developers/docs/networks/), a [tranzakciókkal](/developers/docs/transactions/) és az [okosszerződések anatómiájával](/developers/docs/smart-contracts/anatomy/) mielőtt belefog az okosszerződéstelepítésbe.

A szerződés telepítéséért ETH-t kell fizetni, így érdemes ismernie a [gázt és a díjakat](/developers/docs/gas/) az Ethereumon.

Végül át kell fordítani a szerződést telepítés előtt, ezért előtte tekintse meg az [okosszerződések telepítése](/developers/docs/smart-contracts/compiling/) című cikket.

## Hogyan telepítse az okosszerződését {#how-to-deploy-a-smart-contract}

### Mire lesz szükséged {#what-youll-need}

- A szerződés bájtkódjára – ez az [átfordítás](/developers/docs/smart-contracts/compiling/) alatt generálódik
- ETH a gázra – meg kell adni a gázlimitet, mint bármely más tranzakciónál, de fontos tudni, hogy a szerződéstelepítés sokkal több gázt igényel, mint egy egyszerű ETH átutalás
- egy telepítőszkript vagy plugin
- hozzáférés egy [Ethereum-csomóponthoz](/developers/docs/nodes-and-clients/) a sajátja futtatásával, egy nyilvános csomóponthoz történő csatlakozással vagy egy API-kulcson keresztül egy [csomópontszolgáltatás](/developers/docs/nodes-and-clients/nodes-as-a-service/) használatával

### Az okosszerződés telepítésének lépései {#steps-to-deploy}

A konkrét lépések az adott fejlesztői keretrendszertől függenek. Például megtekintheti a [Hardhat dokumentációt a szerződéstelepítésről](https://hardhat.org/guides/deploying.html) vagy a [Foundry dokumentációt az okosszerződések telepítéséről és ellenőrzéséről](https://book.getfoundry.sh/forge/deploying). A telepítés után a szerződésének lesz egy Ethereum-címe, ahogy a többi [számlának](/developers/docs/accounts/) is, és ez a [forráskód-ellenőrző eszközök](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) segítségével lesz ellenőrizhető.

## Kapcsolódó eszközök {#related-tools}

**Remix – _A Remix IDE lehetővé teszi az okosszerződések fejlesztését, telepítését és kezelését az Ethereumhoz hasonló blokkláncokon_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _Web3-fejlesztői platform, amely okosszerződés fejlesztéséhez, teszteléséhez, felügyeletéhez és működtetéséhez biztosít hibakeresési, megfigyelési és infrastruktúrához kapcsolódó építőelemeket_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentáció](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _Fejlesztői környezet Ethereum-szoftverek átfordításához, telepítéséhez, teszteléséhez és a hibakereséshez_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentáció a szerződéstelepítésről](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb – _Könnyű telepítés bármely szerződés esetében bármelyik EVM-kompatibilis láncra egyetlen parancssorral_**

- [Dokumentáció](https://portal.thirdweb.com/deploy/)

**Crossmint _– Vállalati szintű web3 fejlesztési platform okosszerződések telepítéséhez, hitelkártyás és láncok közötti fizetések lehetővé tételéhez, valamint API-ok használatára NFT-k létrehozása, terjesztése, értékesítése, tárolása és szerkesztése érdekében._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentáció](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Kapcsolódó útmutatók {#related-tutorials}

- [Az első okosszerződés telepítése](/developers/tutorials/deploying-your-first-smart-contract/) _– Bevezetés az első okosszerződés telepítésébe egy Ethereum-teszthálózaton._
- [Hello World | okosszerződés-útmutató](/developers/tutorials/hello-world-smart-contract/) _– Egyszerűen követhető útmutató egy alap okosszerződés létrehozásához és telepítéséhez az Ethereumon._
- [Más szerződésekkel való interakció a Solidity által](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Hogyan telepítsen okosszerződést egy létező szerződésből és kapcsolódjon azzal._
- [Hogyan csökkenthető a szerződés mérete](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Hogyan csökkentheti a szerződés méretét, hogy a határ alatt legyen és gázt takarítson meg_

## További olvasnivaló {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Telepítse szerződéseit a Hardhat segítségével](https://hardhat.org/guides/deploying.html) – _Nomic Labs_

_Van olyan közösségi erőforrása, amely segített Önnek? Szerkessze ezt az oldalt, és adja hozzá!_

## Kapcsolódó témák {#related-topics}

- [Fejlesztői keretrendszerek](/developers/docs/frameworks/)
- [Ethereum-csomópont futtatása](/developers/docs/nodes-and-clients/run-a-node/)
- [Csomópont, mint szolgáltatás](/developers/docs/nodes-and-clients/nodes-as-a-service)
