---
title: Hálózatok
description: Egy áttekintő az Ethereum hálózatairól és hogy hol lehet tesztnet ethert (ETH) szerezni, hogy teszteld az alkalmazásaidat.
lang: hu
---

Mivel az Ethereum egy protokoll, ami azt jelenti, hogy több, a protokollnak megfelelő "hálózat" létezhet, amelyek nem lépnek kölcsönhatásba egymással.

A hálózatok különböző Ethereum környezetek, amelyekhez hozzáférhetsz fejlesztési, tesztelési vagy gyártási felhasználási esetek céljából. Ethereum számlád fog működni a különböző hálózatokon, de a számlaegyenleged és a tranzakcióid előzményei nem kerülnek át az Ethereum fő hálózatából. Tesztelési célból hasznos tudni, hogy mely hálózatok állnak rendelkezésre, és hogy hogyan szerezhetsz tesztnet ETH-t, amivel játszhatsz.

## Előfeltételek {#prerequisites}

Érdemes tisztában lenned az Ethereum alapjaival, mielőtt a különböző hálózatokról olvasol, mivel ezek a hálózatok az Ethereum olcsó és biztonságos verziói, amivel el játszogathatsz. Nézd meg ezt: [bevezetés az Ethereumba](/developers/docs/intro-to-ethereum/).

## Nyilvános hálózatok {#public-networks}

A nyilvános hálózatokat bárki elérheti szerte a világban egy internetkapcsolattal. Bárki olvashat és indíthat tranzakciókat egy nyilvános blokkláncon és hitelesítheti a tranzakciók végrehajtását. A tranzakciókról és a hálózat állapotáról való megállapodást a peerek konszenzusa hozza meg.

### Főhálózat {#mainnet}

A főhálózat az elsődleges nyilvános Ethereum produkciós blokklánc, ahol valós értékű tranzakciók történnek az elosztott főkönyvön.

Amikor az emberek és tőzsdék az ETH árfolyamon vitatkoznak, akkor a főhálózati ETH-ről beszélnek.

### Tesztnetek {#testnets}

A főhálózat mellett vannak nyilvános tesztnetek. Ezeket a hálózatokat a protokoll fejlesztők vagy az okosszerződések fejlesztői használják, hogy teszteljék mind a protokoll frissítéseket, és a lehetséges okosszerződéseket egy produkciószerű környezetben a főhálózatba történő telepítés előtt. Úgy is gondolhatsz rá, mint a produkciós és a staging szerver analógiájára.

Általában fontos, hogy le legyen tesztelve egy tesztnetre írt szerződéses kód, mielőtt a főhálózatra telepítenénk. Ha egy dappot fejlesztesz, mely meglévő okosszerződéseket integrál, akkor a legtöbb projekt másolatát megtalálhatod a tesztneteken, amikkel interakcióba léphetsz.

A legtöbb tesztnet egy proof-of-authority konszenzus mechanizmust használ. Ez azt jelenti, hogy a csomópontok egy kis csoportja van kiválasztva a tranzakciók validálására és új blokkok létrehozására - az identitásukat helyezik letétbe a folyamat alatt. Nehéz ösztönözni a bányászatot egy proof-of-work tesztneten, mely így sérülékeny maradhat.

#### Görli {#goerli}

Egy proof-of-authority tesztnet, mely a több klienssel is működik.

#### Kovan {#kovan}

Egy proof-of-authority tesztnet az OpenEthereum kliensek számára.

#### Rinkeby {#rinkeby}

Egy proof-of-authority tesztnet a Geth kliensek számára.

#### Ropsten {#ropsten}

Egy proof-of-work tesztnet. Ez azt jelenti, hogy ez reprezentálja leginkább az Ethereumot.

### Tesztnet csapok {#testnet-faucets}

Az ETH-nek a tesztneteken nincs valós értéke; így nincsen piaca sem a tesztnet ETH-nek. Mivel ETH-re van szükséged, hogy ténylegesen interakcióba lépj az Ethereummal, a legtöbb ember csapokból szerzi a tesztnet ETH-et. A legtöbb csap egy web app, ahol beírhatod a címedet, amire ETH-et szeretnél kapni.

- [Görli csap](https://faucet.goerli.mudit.blog/)
- [Kovan csap](https://faucet.kovan.network/)
- [Rinkeby csap](https://faucet.rinkeby.io/)

## Privát hálózatok {#private-networks}

Egy Ethereum hálózat privát hálózat, ha a csomópontok nem kapcsolódnak egy nyilvános hálózathoz (vagyis a főhálózathoz vagy egy tesztnethez). Ebben a kontextusban a privát azt jelenti, hogy elszigetelt és fenntartott, nem pedig azt, hogy védett vagy biztonságos.

### Fejlesztői hálózatok {#development-networks}

Egy Ethereum alkalmazás fejlesztésekor fontos, hogy egy privát hálózaton futtasd, hogy megnézd hogyan működik telepítés előtt. Hasonlóan ahhoz, amikor egy lokális szervert futtatsz a számítógépeden webfejlesztés céljából, futtathatsz egy lokális blokklánc példányt, ahol tesztelheted a dappodat. Ez gyorsabb iterációt tesz lehetővé, mint egy nyilvános tesztnet.

Vannak olyan projektek és eszközök, melyek ebben segítenek. Tudj meg többet a [fejlesztői hálózatokról](/developers/docs/development-networks/).

### Konzorcium hálózatok {#consortium-networks}

Egy konszenzus folyamatot néhány előre meghatározott megbízható csomópont végzi. Például egy ismert tudományos intézmények magánhálózata, amelyek mindegyike egyetlen csomópontot irányít, és a blokkokat az aláírók küszöbértéke érvényesíti a hálózaton belül.

Ha egy nyilvános Ethereum hálózat olyan, mint a nyilvános internet, akkor úgy gondolhatsz a konzorcium hálózatra, mint egy privát intranetre.

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, amely segített neked? Módosítsd az oldalt és add hozzá!_
