---
title: Ethereum virtuális gép (EVM)
description: Bevezetés az Ethereum virtuális gépbe és arról, hogy hogyan kapcsolódik az állapothoz, tranzakciókhoz és okosszerződésekhez.
lang: hu
---

Az Ethereum Virtual Machine (EVM) egy decentralizált virtuális környezet, amely következetesen és biztonságosan hajtja végre a kódot az Ethereum összes csomópontján. A csomópontok az EVM-et futtatják az intelligens szerződések végrehajtására, a „[gáz](/gas/)” használatával mérik a [műveletekhez](/developers/docs/evm/opcodes/) szükséges számítási erőfeszítést, biztosítva az erőforrások hatékony elosztását és a hálózat biztonságát.

## Előfeltételek {#prerequisites}

Alapvető számítástudományi fogalmak ismerete, mint például a [bájtok](https://wikipedia.org/wiki/Byte), [memória](https://wikipedia.org/wiki/Computer_memory), és a [stack](https://wikipedia.org/wiki/Stack_(abstract_data_type)) szükségesek ahhoz, hogy megértse az EVM-et. Érdemes tisztában lenni egy pár kriptográfiai/blokklánc fogalommal úgy, mint a [hash függvények](https://wikipedia.org/wiki/Cryptographic_hash_function) és a [Merkle-fa](https://wikipedia.org/wiki/Merkle_tree).

## Főkönyvtől az állapot gépig {#from-ledger-to-state-machine}

Az 'elosztott főkönyv' analógiáját gyakran használjuk olyan blokkláncok jellemzésére, mint a Bitcoin, mely lehetővé egy decentralizált valuta létrehozását alapvető kriptográfiai eszközök használatával. A főkönyv tartalmazza a történések rekordjait, amelynek meg kell felelnie bizonyos szabályoknak, ami azt irányítja, hogy mit tehet meg és mit nem tehet meg valaki a főkönyv módosításához. Például egy Bitcoin cím nem költhet el több bitcoint, mint amennyit előzőleg megkapott. Ezek a szabályok támasztják alá az összes Bitcoin tranzakciót és sok más blokkláncot is.

Míg az Ethereumnak megvan a saját natív kriptovalutája (Ether), amely ugyanazokat az intuitív szabályokat követi, emellett lehetőséget ad egy másik hathatós funkciónak is: [az okosszerződéseknek](/developers/docs/smart-contracts/). Ehhez a bonyolultabb funkcióhoz egy szofisztikáltabb analógia szükségeltetik. Egy elosztott főkönyv helyett az Ethereum egy elosztott [állapot gép](https://wikipedia.org/wiki/Finite-state_machine). Az Ethereum állapota egy nagy adatstruktúra, mely nem csak a számlákat és az egyenlegeket tárolja, de egy _állapot gépet_ is, mely blokkról blokkra változhat egy előre meghatározott szabályrendszer szerint és tetszőleges gépi kódot tud végrehajtani. Az állatot blokkról blokkra történő megváltozásának specifikus szabályait az EVM rögzíti.

![Egy diagram mely az EVM felépítését mutatja be](./evm.png) _Diagram átvéve az [Ethereum EVM illusztrálva](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

## Az Ethereum állapot átmeneti függvény {#the-ethereum-state-transition-function}

Az EVM úgy viselkedik, mint egy matematikai függvény: Adott egy bemenet, mely egy determinisztikus kimenetet generál. Ezért nagyon hasznos, ha az Ethereumot formálisabban úgy írjuk le, mint egy **állapot átmeneti függvényt**:

```
Y(S, T)= S'
```

Adott egy régebbi érvényes állapot `(S)` és egy új érvényes tranzakciókból álló halmaz `(T)`, az Ethereum állapot átmeneti függvény `Y(S, T)` létrehoz egy új érvényes kimeneti állapotot `S'`

### Állapot {#state}

Az Ethereum kontextusában az állapot egy hatalmas adatstruktúra, amelyet úgy hívnak, hogy [módosított Merkle Patricia-fa](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), amely az összes [számlát](/developers/docs/accounts/) hashekkel köti össze és redukálja egy gyökér hash-é, amelyet a blokklánc tárol.

### Tranzakciók {#transactions}

A tranzakciók számlákból származó kriptográfiailag aláírt instrukciók. A tranzakcióknak két típusa van: azok, amelyek üzenet hívásokat eredményeznek és azok melyek szerződés létrehozásokat.

A szerződés létrehozás egy új szerződéses számla létrehozásával jár, mely a fordított [okosszerződés](/developers/docs/smart-contracts/anatomy/) bájtkódot tartalmazza. Amikor egy másik számla egy üzenet hívást intéz ehhez a szerződéshez, végrehajtja a bájtkódját.

## EVM Utasítások {#evm-instructions}

Az EVM egy [veremgépként](https://wikipedia.org/wiki/Stack_machine) fut 1024 elemes mélységgel. Mindegyik tétel egy 256 bites szó, amelyet a 256 bitet kriptográfia használata miatt választottak (mint amilyen a Keccak-256 hash-e vagy secp256k1 aláírások).

A végrehajtás alatt az EVM egy tranziens _memóriát_ tart fenn (mint egy szócímzett bájttömböt), amely nem folytatólagos a tranzakciók között.

A szerződések azonban tartalmaznak egy Merkle Patricia _tároló_ fát (mint egy szócímezhető szótömböt), amely hozzá van rendelve a kérdéses számlához és része a globális státusznak.

A befordított okosszerződés bájtkódja EVM-[opcode-ként](/developers/docs/evm/opcodes) fut le, amely standard stack művelet, mint a `XOR`, `AND`, `ADD`, `SUB` stb. Az EVM egy pár blokklánc-specifikus stack-műveletet is implementál, mint az `ADDRESS`, `BALANCE`, `BLOCKHASH` stb.

![Egy diagram, amely azt mutatja, hogy hol van szükség gázra az EVM-műveleteknél](../gas/gas.png) _Diagramok átvéve az [Illusztrált Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_ anyagból

## EVM Implementációk {#evm-implementations}

Az összes EVM-implementációnak meg kell felelnie az Ethereum sárgakönyvben megfogalmazott specifikációnak.

Az Ethereum kilenc éves története alatt az EVM több revízión átesett és számos EVM-implementáció létezik különböző programozási nyelveken.

Az [Ethereum végrehajtási kliensek](/developers/docs/nodes-and-clients/#execution-clients) tartalmaznak egy EVM-implementációt. Továbbá több önálló implementáció létezik, ilyen például:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## További olvasnivaló {#further-reading}

- [Ethereum sárga könyv](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jello könyv, vagyis a KEVM: az EVM szemantikái K-ban](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Ethereum Virtuális Gép Opcode-ok](https://www.ethervm.io/)
- [Ethereum Virtuális Gép operációskódjainak interaktív referenciája](https://www.evm.codes/)
- [Rövid bevezetés a Solidity dokumentációjába](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Az Ethereum elsajátítása - az Ethereum virtuális gép](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## Kapcsolódó témák {#related-topics}

- [Gáz](/developers/docs/gas/)
