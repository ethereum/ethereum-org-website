---
title: Hálózatok
description: Egy áttekintő az Ethereum hálózatairól és hogy hol lehet tesztnet ethert (ETH) szerezni, hogy teszteld az alkalmazásaidat.
lang: hu
---

Az Ethereum-hálózatok olyan összekapcsolt számítógépek csoportjai, amelyek az Ethereum-protokoll segítségével kommunikálnak. Egyetlen Ethereum főhálózat létezik, de ugyanazt a protokollt használó, független hálózatokat is létre lehet hozni tesztelési és fejlesztési célból. Számos ilyen független hálózat létezik, amelyek a protokollt követik, de nem kommunikálnak egymással. Akár a saját számítógépén is létrehozhat egyet, hogy egy okosszerződést vagy egy web3 alkalmazást teszteljen.

Ethereum-számlája működni fog a különböző hálózatokon, de a számlaegyenlege és a tranzakciós előzmények nem kerülnek át az Ethereum fő hálózatából. Tesztelési célból hasznos tudni, hogy amely hálózatok állnak rendelkezésre, és hogy hogyan szerezhet egy teszthálózat ETH-t, amivel kipróbálhat dolgokat. Biztonsági okokból nem javasolt olyan számla használata a teszthálózaton, amely a főhálózathoz tartozik és fordítva.

## Előfeltételek {#prerequisites}

Érdemes tisztában lennie az [Ethereum alapjaival](/developers/docs/intro-to-ethereum/), mielőtt a különböző hálózatokról olvas, mivel ezek a teszthálózatok az Ethereum olcsó és biztonságos verziói, amelyekkel ki lehet próbálni dolgokat.

## Nyilvános hálózatok {#public-networks}

A nyilvános hálózatokat bárki elérheti szerte a világban egy internetkapcsolattal. Bárki olvashat és indíthat tranzakciókat egy nyilvános blokkláncon és hitelesítheti a tranzakciók végrehajtását. A tagok közötti konszenzus dönti el az új tranzakciók bedolgozását és a hálózat státuszát.

### Ethereum-főhálózat {#ethereum-mainnet}

A főhálózat az elsődleges nyilvános Ethereum produkciós blokklánc, ahol valós értékű tranzakciók történnek az elosztott főkönyvön.

Amikor az emberek és tőzsdék az ETH árfolyamon vitatkoznak, akkor a főhálózati ETH-ről beszélnek.

### Ethereum-teszthálózatok {#ethereum-testnets}

A főhálózat mellett vannak nyilvános tesztnetek. Ezeket a hálózatokat a protokoll fejlesztők vagy az okosszerződések fejlesztői használják, hogy teszteljék mind a protokoll frissítéseket, és a lehetséges okosszerződéseket egy produkciószerű környezetben a főhálózatba történő telepítés előtt. Úgy is gondolhatsz rá, mint a produkciós és a staging szerver analógiájára.

Általában fontos, hogy le legyen tesztelve egy teszthálózatra írt szerződéses kód, mielőtt a főhálózatra telepítenénk. Azoknál az alkalmazásoknál, ahol már meglévő okosszerződéssel kell kapcsolódni, a legtöbb projekt ezeknek a másolatát átteszi a teszthálózatra.

A legtöbb teszthálózat úgy indul, hogy egy engedélyezett proof-of-authority konszenzusmechanizmust használ. Ez azt jelenti, hogy a csomópontok egy kis csoportja van kiválasztva a tranzakciók validálására és új blokkok létrehozására - az identitásukat helyezik letétbe a folyamat alatt. Alternatívaként néhány teszthálózat egy nyitott proof-of-stake konszenzusmechanizmust vezet be, ahol mindenki futtathat validátort, ahogy az Ethereum főhálózaton is működik.

A teszthálózathoz tartozó ETH-nak elvileg nincs valós értéke. Ugyanakkor a ritka vagy nehezen megszerezhető teszthálózati ETH-nek mégis kialakulhat valamilyen piaca. Mivel ETH-re van szükség, hogy ténylegesen interakcióba lépjen az Ethereummal (még a teszthálózaton is), a legtöbb ember csapokból szerzi a teszthálózati ETH-t. A legtöbb csap egy web alkalmazás, ahol beírhatja a címét, amire ETH-t szeretne kapni.

#### Melyik teszthálózatot használja?

A két nyilvános teszthálózat, amelyet a kliens fejlesztők jelenleg fenntartanak a Sepolia és a Goerli. Sepolia egy hálózat a szerződés- és alkalmazásfejlesztők számára, ahol az alkalmazásaikat tesztelhetik. A Goerli-hálózat a protokollfejlesztőknek biztosít teret frissítéseik teszteléséhez, illetve a letétbe helyezőknek a validátorok futtatásához.

#### Sepolia {#sepolia}

**a Sepolia az ajánlott teszthálózat az alkalmazásfejlesztők számára.**. A Sepolia-hálózat egy engedélyezett validátorszettet használ. Viszonylag új, tehát kevés státusz és előzmény található rajta. Ezért gyorsan tud szinkronizálni, a csomópont futtatása pedig kevesebb tárhelyet igényel. Ez hasznos azoknak, akik gyorsan fel akarnak állítani egy csomópontot és közvetlenül kapcsolódni a hálózattal.

- Zárt validátorszett, amelyet a kliensek és a tesztelő csapatok irányítanak
- Új teszthálózat, amelyre kevesebb alkalmazás van telepítve
- Gyorsan szinkronizál és kevesebb tárhely kell a csomópont futtatáshoz

##### Források

- [Honlap](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Csapok

- [QuickNode Sepolia csap](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW csap](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet csap | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia csap](https://sepoliafaucet.com/)
- [Infura Sepolia csap](https://www.infura.io/faucet)
- [Chainstack Sepolia csap](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum-ökoszisztéma csap](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Goerli _(hosszútávú támogatás)_ {#goerli}

_Megjegyzés: [a Goerli teszthálózat lezárásra kerül](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) és a [Holesovice](https://github.com/eth-clients/holesovice) veszi át a helyét 2023-ban. Kérjük, hogy vigye át az alkalmazásait a Sepolia hálózatra._

A Goerli egy olyan teszthálózat, ahol a validálást és a letétbe helyezést lehet tesztelni. A Goerli hálózat minden olyan felhasználók számára elérhető, aki teszthálózati validátort szeretne futtatni. Ezt használhatják azok a letétesek is, akik tesztelni akarják a protokollfrissítéseket, mielőtt azok a főhálózatra kerülnének.

- Nyitott validátorszett, a letétesek tesztelhetik a hálózati frissítéseket
- Sok státusz elérhető, ezért alkalmas az okosszerződések komplex interakcióit letesztelni
- Hosszabb ideig tart a szinkronizálás és több tárhely kell a csomópont futtatáshoz

##### Erőforrások

- [Honlap](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)
- [Blockscout](https://eth-goerli.blockscout.com/)

##### Csapok

- [QuickNode Goerli csap](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW csap](https://goerli-faucet.pk910.de/)
- [Paradigm csap](https://faucet.paradigm.xyz/)
- [Alchemy Goerli csap](https://goerlifaucet.com/)
- [All That Node Goerli csap](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet csap | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Chainstack Goerli csap](https://faucet.chainstack.com/goerli-faucet)

Ha szeretne egy validátort indítani a Holesky teszthálózaton, akkor használja az ethstaker [„olcsó Holesky validátor” indítópultot](https://holesky.launchpad.ethstaker.cc/en/).

### Második blokkláncréteg (L2) teszthálózatok {#layer-2-testnets}

[A második blokkláncréteg (L2)](/layer-2/) az Ethereum skálázási megoldásait takarja. Az L2 egy elkülönült blokklánc, ami kiterjeszti az Ethereumot, örökölve annak biztonsági garanciáit. Az L2 teszthálózatok szorosan kapcsolódnak a nyilvános Ethereum teszthálózatokhoz.

#### Arbitrum Goerli {#arbitrum-goerli}

Teszthálózat az [Arbitrum-hoz](https://arbitrum.io/).

##### Csapok

- [Chainlink csap](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

Teszthálózat az [Optimism-hoz](https://www.optimism.io/).

##### Csapok

- [Paradigm csap](https://faucet.paradigm.xyz/)
- [Coinbase Wallet csap | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

Teszthálózat a [Starknethez](https://www.starknet.io).

##### Csapok

- [Starknet csap](https://faucet.goerli.starknet.io)

## Privát hálózatok {#private-networks}

Egy Ethereum hálózat privát, ha a csomópontok nem kapcsolódnak egy nyilvános hálózathoz (vagyis a főhálózathoz vagy egy teszthálózathoz). Ebben a kontextusban a privát azt jelenti, hogy elszigetelt és fenntartott, nem pedig azt, hogy védett vagy biztonságos.

### Fejlesztői hálózatok {#development-networks}

Egy Ethereum alkalmazás fejlesztésekor fontos, hogy egy privát hálózaton futtassa, hogy megnézze, hogyan működik telepítés előtt. Hasonlóan ahhoz, amikor egy lokális szervert futtat a számítógépén webfejlesztés céljából, egy lokális blokklánc-példányt is futtathat, ahol tesztelheti a dappot. Ez gyorsabb iterációt tesz lehetővé, mint egy nyilvános tesztnet.

Vannak olyan projektek és eszközök, amelyek ebben segítenek. Tudjon meg többet a [fejlesztői hálózatokról](/developers/docs/development-networks/).

### Konzorciumhálózatok {#consortium-networks}

Egy konszenzus folyamatot néhány előre meghatározott megbízható csomópont végzi. Például egy ismert tudományos intézmények magánhálózata, amelyek mindegyike egyetlen csomópontot irányít, és a blokkokat az aláírók küszöbértéke érvényesíti a hálózaton belül.

Ha egy nyilvános Ethereum hálózat olyan, mint a nyilvános internet, akkor úgy gondoljon a konzorcium hálózatra, mint egy privát intranetre.

## Kapcsolódó eszközök {#related-tools}

- [Chainlist](https://chainlist.org/) _– az EVM-hálózatok listája, hogy a tárcákat és a szolgáltatókat a megfelelő Chain ID és Network ID segítségével kapcsolják be_
- [EVM-alapú láncok](https://github.com/ethereum-lists/chains) _– GitHub könyvtár a lánc metaadatokból, amelyek a Chainlisten megjelennek_

## További olvasnivaló {#further-reading}

- [Javaslat: kiszámítható Ethereum teszthálózati életciklus](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Az Ethereum teszthálózatok evolúciója](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
