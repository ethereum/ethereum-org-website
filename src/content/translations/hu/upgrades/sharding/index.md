---
title: Shard láncok
description: Tudj meg többet shard láncokról - a hálózat partícióiról, melyek nagyobb tranzakciós kapacitást és könnyebb futást biztosítanak az Ethereumnak.
lang: hu
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: A sharding egy többfázisú fejlesztés az Ethereum skálázhatóságának és kapacitásának növelésére.
summaryPoint2: A shard láncok 64 új láncon osztják szét a hálózat terhelését.
summaryPoint3: Könnyebbé teszik a csomópont futtatását a hardver követelmény alacsonyan tartásával.
summaryPoint4: A technikai ütemtervek tartalmazzák a shard láncokhoz tartozó munkát a "Fázis 1"-ben és potenciálisan a "Fázis 2"-ben.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    A shard láncokat nagyjából 2023 körül kellene bevezetni attól függően, hogy milyen előrelépések történnek <a href="/upgrades/beacon-chain/">a Beacon Chain</a> elindítása után. Ezek a shardok az Ethereum számára nagyobb tárolási és elérési kapacitást tesznek lehetővé, de kód futtatásra nem lehet majd használni. Annak részletei még kialakulóban vannak.
</UpgradeStatus>

## Mi az a sharding? {#what-is-sharding}

A sharding egy folyamat, melynek során egy adatbázist horizontálisan feldarabolunk, hogy szétosszuk a terhelést - ez egy általános fogalom a számítástechnikában. Az Ethereum esetében a sharding csökkenteni fogja a hálózati torlódást és új láncok létrehozásával növeli a másodpercenkénti tranzakciók számát, melyeket "shardoknak" hívunk.

Ez a skálázhatóság mellett több szempontból is fontos.

## A sharding tulajdonságai {#features-of-sharding}

### Mindenki tud csomópontot üzemeltetni {#everyone-can-run-a-node}

Egy meglévő adatbázis méretének megnövelésével szemben a sharding egy jó skálázási módszer, ha decentralizáltan szeretnéd tartani a dolgokat. Így a hálózati validátorok nehezebben férnének hozzá az Ethereumhoz, mivel így erősebb és drágább számítógépeket kellene használniuk. A shard láncoknál a validátoroknak csak a validált shardhoz tartozó adatot kell tárolniuk/futtatniuk, nem pedig a teljes hálózatot (mint, ahogy most történik). Ez felgyorsítja a dolgokat és drasztikusan csökkenti a hardverkövetelményeket.

### Nagyobb hálózati részvétel {#more-network-participation}

A sharding végsősoron lehetővé teszi az Ethereum futtatását a saját laptopodon vagy mobilodon. Így több ember tud majd résztvenni, vagy egy [klienst](/developers/docs/nodes-and-clients/) futtatni a shardolt Ethereumban. Ez növelni fogja a biztonságot, mivel minél decentralizáltabb a hálózat, annál kisebb a támadási felület.

Az alacsonyabb hardver követelményekkel a sharding megkönnyíti a [kliensek](/developers/docs/nodes-and-clients/) önálló futtatását, anélkül, hogy köztes szolgáltatásra kellene támaszkodnod. És ha van rá lehetőséged, érdemes fontolóra venni több kliens futtatását. Ez egészségesebbé teszi a hálózatot a hiba lehetőségek csökkentésével. [Eth2 kliens futtatása](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Először is egy főhálózati klienst kell futtatnod az Eth2 klienseddel egy időben. <a href="https://launchpad.ethereum.org" target="_blank">Az indítópult</a> végigvezet a hardverkövetelményeken és a folyamaton. Alternatívaként használhatsz egy <a href="/developers/docs/apis/backend/#available-libraries">backend API-t</a>.
</InfoBanner>

## Shard láncok verzió 1: adat elérhetőség {#data-availability}

Amikor a shard láncokat először bevezetik csak extra adatot fognak biztosítani a hálózatnak. Nem fognak tranzakciókat vagy okosszerződéseket kezelni. De még így is hihetetlen javulásokat fognak biztosítani a másodpercenkénti tranzakciós sebességben a rollupokkal kombinálva.

A rollupok egy "layer 2" technológia részei, melyek ma is léteznek. Lehetővé teszik a dappok számára, hogy off-chain módon több tranzakciók összekötegeljenek vagy "feltekerjenek (roll-up)" egy tranzakcióba, majd egy kriptográfiai bizonyítékot generálnak, ezután pedig továbbítják azt a láncra. Ez csökkenti egy adott tranzakció számára szükséges adatot. Ha ezt kombináljuk az extra adat elérhetőséggel, amit a shardok biztosítanak, akkor 100,000 tranzakció is lehetséges egy másodperc alatt.

[Bővebben a rollupokról](/developers/docs/scaling/#rollups)

## Shard láncok verzió 2: kódfuttatás {#code-execution}

Mindig is az volt a terv, hogy shardok extra funkciókat kapjanak, és minél inkább hasonlítsanak a jelenlegi [Ethereum főhálózatra](/glossary/#mainnet). Ez lehetővé tenné számukra, hogy okosszerződéseket tároljanak és futtassanak valamint számlákat kezeljenek. De tekintve a tranzakciós sebességet, amit az 1-es verziójú shardok biztosítanak, tényleg szükséges ennek megtörténnie? Ez még mindig vita tárgya a közösségen belül, és úgy tűnik, hogy jópár lehetséges megoldás létezik.

### Kell a shardoknak kódot futtatniuk? {#do-shards-need-code-execution}

Amikor Vitalik Buterin a Bankless podcaston beszélt, három megvitatásra érdemes potenciális lehetőséget mutatott be.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Állapot-futtatás nem szükséges {#state-execution-not-needed}

Ez azt jelentené, hogy a shardok számára nem tesszük lehetővé, hogy okosszerződéseket kezeljenek és csak adattárolóként funkcionálnának.

#### 2. Van pár futtatást végző shard {#some-execution-shards}

Lehet, hogy van olyan kompromisszum, ahol nem szükséges minden shardnak (64 van betervezve jelenleg) okosabbnak lennie. Némelyik shardhoz hozzáadhatjuk ezt a funkcionalitást, a többit pedig hagyjuk. Ez felgyorsíthatja a bevezetést.

#### 3. Várunk addig, amíg elérhetővé válnak a Zero Knowledge (ZK) snarkok {#wait-for-zk-snarks}

Végül lehet, hogy akkor érdemes újra elővenni ezt a vitát, amikor a ZK snarkok életbe lépnek. Ez egy olyan technológia, mely lehetővé tenné a valóban privát tranzakciókat a hálózaton. Valószínűleg okosabb shardokat igényelnének, de még kutatás és fejlesztés alatt állnak.

#### További források {#other-sources}

Itt van néhány gondolatébresztő ugyanezen a vonalon:

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Ez még mindig aktívan vitatott pont. Frissítjük ezeket az oldalakat, amint többet megtudunk.

## A fejlesztések közötti kapcsolat {#relationship-between-upgrades}

Az Eth2 fejlesztések némileg összefüggnek. Foglaljuk össze tehát, hogy a shard láncok bevezetése hogyan hat a többi fejlesztésre.

### Shardok és a Beacon Chain {#shards-and-beacon-chain}

A beacon chain tartalmazza a shardok biztonságához és szinkronizáltságához szükséges összes információt. A beacon chain fogja koordinálni a letétbe helyezőket a hálózaton úgy, hogy shardokat oszt ki nekik, amin dolgozniuk kell. És megkönnyíti a shardok közötti kommunikációt azáltal, hogy shardok tranzakciós adatait fogadja és tárolja, amelyekhez más shardok is hozzáférhetnek. Ez a shardoknak egy pillanatképet fog adni az Ethereum állapotáról, hogy minden naprakész legyen.

<ButtonLink to="/upgrades/beacon-chain/">A Beacon Chain</ButtonLink>

### A shardok és a dokkolás {#shards-and-docking}

Az Ethereum főhálózat a ma ismert formában fog létezni a shardok bevezetése után is. Azonban egy ponton a főhálózatnak is egy sharddá kell válnia, hogy a letétbe helyezési átmenet megtörténjen. Később kiderül majd, hogy a főhálózat lesz-e végül az egyedüli "okos" shard, ami kódlefutást fog végezni - de így vagy úgy, ezt a döntést meg kell majd hozni a shardolás 2-es fázisában.

<ButtonLink to="/upgrades/merge/">A dokkolás</ButtonLink>

<Divider />

### Bővebben {#read-more}

<ShardChainsList />
