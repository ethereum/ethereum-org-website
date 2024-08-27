---
title: Hogyan lehet áthelyezni a tokeneket a második blokkláncrétegbe (L2)
description: Útmutató, hogyan tudja az Ethereumon lévő tokeneket L2-re áthelyezni híd használatával.
lang: hu
---

# Hogyan lehet áthelyezni a tokeneket a második blokkláncrétegbe (L2)

Ha sok tranzakció fut egyszerre az Ethereumon, akkor drágább a hálózatot használni. Erre az egyik megoldás az, hogy új rétegeket hoznak létre, tehát más hálózatokat, melyek az Ethereumhoz hasonlóan működnek. Ezek a második blokkláncrétegek (L2) csökkenthetik a tranzakciók mennyiségét és azok költségét is az Ethereumon azáltal, hogy sok tranzakciót kezelnek alacsonyabb díjért és ezeknek csak az eredményét tárolják az Ethereumon. Így az L2 megoldások gyorsabban működnek és kevesebb költséggel járnak. Számos népszerű kriptoprojekt az L2-re épít annak előnyei miatt. A legegyszerűbb módja a tokenek Ethereumról második blokkláncra (L2) való áthelyezésének a híd használata.

**Feltételek:**

- rendelkeznie kell egy kriptotárcával – ehhez kövesse a következő útmutatót: [Hogyan lehet létrehozni Ethereum-számlát](/guides/how-to-create-an-ethereum-account/)
- lennie kell pénzeszközöknek a tárcájában

## 1. Határozza meg, hogy melyik L2 hálózatot szeretné használni

További információkat a projektekről és a fontos hivatkozásokról a [második blokkláncréteg (L2) oldalon](/layer-2/) is szerezhet.

## 2. Lépjen a kiválasztott hídra

Néhány népszerű L2:

- [Arbitrum-híd](https://bridge.arbitrum.io/?l2ChainId=42161)
- [Optimism-híd](https://app.optimism.io/bridge/deposit)
- [Boba-hálózat hídja](https://gateway.boba.network/)

## 3. Kapcsolódjon a hídhoz a tárcájával

Győződjön meg arról, hogy tárcája az Ethereum-főhálózathoz kapcsolódik. Ha nem, akkor a weboldal automatikusan felhozza a hálózatváltási lehetőséget.

![Általános felület a tokenek áthelyezéséhez](./bridge1.png)

## 4. Határozza meg az összeget és helyezze át

Tekintse át az összeget, amit az L2-n kapni fog és a kapcsolódó díjakat, hogy ne érjék kellemetlen meglepetések.

![Általános felület a tokenek áthelyezéséhez](./bridge2.png)

## 5. Hagyja jóvá a tranzakciót a tárcájában

A tranzakcióért ETH formájában kell fizetnie.

![Általános felület a tokenek áthelyezéséhez](./bridge3.png)

## 6. Várja meg, amíg az eszközei átkerülnek

Ennek 10 perc alatt meg kell történnie.

## 7. Adja hozzá a kiválasztott L2 hálózatot a tárcájához (opcionális)

A [chainlist.org](http://chainlist.org) segít az adott hálózat RPC-adatait megtalálni. Amint a hálózat hozzáadásra kerül és a tranzakció végbemegy, a tokenek megjelennek a tárcájában.
<br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Szeretne többet megtudni?</div>
  <ButtonLink href="/guides/">
    Tekintse meg a további útmutatóinkat
  </ButtonLink>
</InfoBanner>

## Gyakran ismételt kérdések

### Mi van akkor, ha tőzsdén vannak eszközeim?

Bizonyos tőzsdékről lehetséges közvetlenül L2-re áthelyezni az eszközöket. Nézze meg az „Áthelyezés a második blokkláncrétegre (L2)” című részt az [L2 oldalon](/layer-2/) a további információkért.

### Visszavihetem a tokenjeimet az Ethereum-főhálózatra, miután áthelyeztem azokat az L2-re?

Igen, mindig visszaviheti az eszközeit a főhálózatra ugyanazon a hídon keresztül.
