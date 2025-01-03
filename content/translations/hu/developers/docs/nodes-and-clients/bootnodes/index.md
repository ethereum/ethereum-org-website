---
title: Bevezető az Ethereum betöltő csomópontjaiba (bootnode)
description: Alapvető információk a betöltő csomópontok megértéséhez
lang: hu
---

Amikor egy új csomópont csatlakozik az Ethereum hálózathoz, akkor a már hálózaton lévő csomópontokhoz kell kapcsolódnia, hogy új társakat tudjon találni. Ezeket az Ethereum hálózatba való belépőpontokat nevezik betöltő csomópontoknak. A kliensekbe bele van kódolva a betöltő csomópontok listája. Ezeket általában az Ethereum Alapítvány fejlesztőket vagy klienseket kezelő csapatai maguk működtetik. Érdemes megjegyezni, hogy a betöltő csomópontok nem azonosak a statikus csomópontokkal. A statikus csomópontokat ismételten meghívják, miközben a betöltő csomópontokat csak akkor, amikor nincs elég társ, akivel kapcsolódni lehetne, és a csomópontnak új kapcsolatokat kell felállítania.

## Kapcsolódás egy betöltő csomóponthoz {#connect-to-a-bootnode}

A legtöbb kliensbe bele van programozva a betöltő csomópontok listája, de egy felhasználó maga is futtathat betöltő csomópontot, vagy olyat is használhat, amely nem szerepel a kliensben. Ekkor a kliens indításakor kell megadni ezeket, ahogy a következő Geth példa mutatja (nézze meg a kliensének a dokumentációját):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Betöltő csomópont futtatása {#run-a-bootnode}

A betöltő csomópontok teljes csomópontok, amelyeket nem fed egy hálózati címfordítás ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Minden teljes csomópont működhet betöltőként, ha nyilvánosan elérhető.

Amikor egy csomópontot felállítanak, akkor [enode](/developers/docs/networking-layer/network-addresses/#enode) címet kell jegyezni rá, ami egy nyilvános azonosító, mellyel mások kapcsolódni tudnak hozzá.

Ez az enode minden újraindításnál újragenerálódik, ezért a betöltő csomópont esetében ellenőrizni kell a kliens dokumentációban, hogyan lehet állandó enode-ot létrehozni.

A betöltő csomópont hasznossága érdekében érdemes megnövelni azon társak maximális számát, akik kapcsolódhatnak hozzá. A betöltő csomópont futtatása sok kapcsolttal jelentősen megnöveli a szükséges sávszélességet.

## Az elérhető betöltő csomópontok {#available-bootnodes}

A go-ethereumhoz kapcsolódó beépített betöltő csomópontok listáját [itt találja](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Ezeket az Ethereum Alapítvány és a go-ethereum csapat tartja karban.

Más listák is léteznek a betöltő csomópontokról, amelyeket önkéntesek tartanak karban. Legalább egy hivatalos betöltő csomópontot mindenféleképpen használni kell, különben támadás alá kerülhet a csomópont (és elvágják a kapcsolataitól).
