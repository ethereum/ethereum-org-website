---
title: Hálózati címek
description: Bevezetés a hálózati címekbe.
lang: hu
sidebarDepth: 2
---

Az Ethereum csomópontoknak azonosítaniuk kell magukat néhány alapvető információval, hogy a társaikhoz tudjanak kapcsolódni. Annak érdekében, hogy a lehetséges társak értelmezni tudják ezeket az információkat, három szabványosított formátumban továbbítják, amelyeket bármely Ethereum-csomópont megérthet: multiaddr, enode vagy Ethereum Node Records (ENRs). Az ENRs az Ethereum hálózati címek jelenlegi szabványa.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez érdemes megtekinteni az Ethereum [hálózati rétegéről](/developers/docs/networking-layer/) szóló oldalt.

## Multiaddr {#multiaddr}

Az eredeti Ethereum csomópontcím formátuma a multiaddr (a multi-addresses rövidítése) volt. A multiaddr egy egyetemes formátum a peer-to-peer hálózatokhoz. A címek kulcs-érték párokként jelennek meg, a kulcsok és az értékek perjellel vannak elválasztva. Például a multiaddr értéke a `192.168.22.27` IPv4-címmel rendelkező csomópontnak, ami a `33000` TCP-portot figyeli:

`/ip4/192.168.22.27/tcp/33000`

Az Ethereum csomópont esetében a multiaddr tartalmazza a csomópont-azonosítót (a nyilvános kulcs hashe):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Az enode az Ethereum-csomópontok azonosítására szolgál egy URL-címformátum segítségével. A hexadecimális csomópont-ID az URL felhasználónevet tartalmazó részében van kódolva, a hoszttól @ jellel elválasztva. A hosztnév csak IP-címként adható meg; DNS nevek nem engedélyezettek. A hosztnév szakaszban szereplő port a TCP figyelő port. Ha a TCP és UDP (felfedező) portok különböznek, az UDP portot a „discport” lekérdezési paraméterként kell megadni

A következő példában a csomópont URL-címe egy olyan csomópontot ír le, amelynek IP-címe `10.3.58.6`, TCP-portja `30303` és UDP felfedezőportja `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENRs) {#enr}

Az Ethereum Node Records (ENR) a hálózati címek szabványosított formátuma az Ethereumon. Ez váltotta fel a multiaddr és az enode használatát. Ezek különösen hasznosak, mert nagyobb információcserét tesznek lehetővé a csomópontok között. Az ENR tartalmaz egy aláírást, egy sorszámot és olyan mezőket, melyek az aláírások létrehozására és érvényesítésére használt azonosítási rendszert részletezik. Az ENR tetszőleges, kulcs-érték párokba rendezett adatokkal is feltölthető. Ezek a kulcs-érték párok tartalmazzák a csomópont IP-címét és a csomópont által használható alprotokollokra vonatkozó információkat. A konszenzus kliensek egy [specifikus ENR struktúrát](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) használnak a betöltőcsomópontok (bootnode) azonosítására, és tartalmaznak egy `eth2` mezőt is, amely az aktuális Ethereum elágazásról és a tanúsításpletyka alhálózatról tartalmaz információt (ez köti a csomópontot a társak egy adott csoportjához, akiknek tanúsításait aggregálják).

## További olvasnivaló {#further-reading}

[EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778) [Hálózati címek az Ethereumban](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
