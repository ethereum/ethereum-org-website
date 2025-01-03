---
title: Hogyan használja a tárcát
description: Útmutató a tokenek küldéséről és fogadásáról, valamint a web3-projektekhez való kapcsolódásról.
lang: hu
---

# Hogyan használja a tárcát

Ismerje meg, hogyan működnek a tárca alapvető funkciói. Ha még nem rendelkezik tárcával, akkor tekintse meg a [Hogyan lehet Ethereum-számlát létrehozni](/guides/how-to-create-an-ethereum-account/) című útmutatót.

## Nyissa ki tárcáját

Egy irányítópult jelenik meg, amelyen az egyenlege, valamint a tokenek küldésére és fogadására vonatkozó gombok láthatók.

## Kriptovaluta fogadása

Szeretne kriptovalutát fogadni a tárcájába?

Minden Ethereum-számla rendelkezik saját fogadócímmel, amely egy egyedi, számokat és betűket tartalmazó sor. A cím úgy működik, akár egy bankszámlaszám. Az Ethereum-címek mindig „0x” kezdetűek. Ezt a címet bárkivel megoszthatja: ez biztonságos.

A cím olyan, mint a lakhelyének a címe: elmondja az embernek, hogy odataláljanak Önhöz. Ez azért is biztonságos, mert be tudja zárni az ajtót egy másik kulccsal, amivel csak Ön rendelkezik, így nem tudnak bejutni, hiába tudják a címét.

Ha valaki pénzt akar küldeni Önnek, akkor meg kell adnia a nyilvános címét. Számos tárca megengedi, hogy kimásolja azt vagy QR-kódként megossza, hogy könnyebb legyen a használata. Ne gépelje be manuálisan. Ez könnyen hibákhoz és a pénzeszköz elvesztéséhez vezethet.

Előfordulhat, hogy a különböző alkalmazások eltérnek egymástól vagy más nyelvet használnak, de hasonló folyamaton vezetik végig, ha eszközöket kíván mozgatni.

1. Nyissa meg a tárcaalkalmazást.
2. Kattintson a „Fogadás” (vagy hasonló nevű) gombra.
3. Másolja Ethereum-címét a vágólapra.
4. Adja meg a küldőnek a fogadó Ethereum-címét.

## Kriptovaluta küldése

Szeretne ETH-t küldeni egy másik tárcába?

1. Nyissa meg a tárcaalkalmazást.
2. Kérje el a fogadó címét, és győződjön meg arról, hogy ugyanahhoz a hálózathoz kapcsolódik, mint a fogadó fél.
3. Másolja be a címet vagy szkennelje be a QR-kódot a kamerával, így nem kell manuálisan megadnia.
4. Kattintson a Küldés (vagy hasonló nevű) gombra a tárcájában.

![A kriptoszámla küldő mezője](./send.png)
<br/>

5. Számos eszköz, mint a DAI vagy USDC, egyszerre több hálózaton is létezik. Amikor kriptotokeneket küld, győződjön meg arról, hogy a fogadó fél is ugyanazt a hálózatot használja, mert ezek nem átjárhatók.
6. Biztosítsa, hogy a tárcája elegendő ETH-t tartalmaz, hogy lefedje a tranzakciós díjat is, amely a hálózati feltételek miatt változó összeg. A legtöbb tárca automatikusan hozzáadja a tranzakcióhoz a javasolt díjat, amit Ön jóváhagy.
7. Amint a tranzakció végbement, a kripto összege megjelenik a fogadó fél számláján. Ez a hálózat használóinak számától függően néhány pillanatig vagy percig is eltarthat.

## Kapcsolódás projektekhez

Az Ön címe minden Ethereum-projekt esetében azonos. Nem kell regisztrálnia külön sehol. A tárcával bármilyen más információ megadása nélkül kapcsolódni tud az Ethereum-projektekhez. Nincs szükség e-mail-címre vagy egyéb személyes adatokra.

1. Látogasson el bármelyik projekt oldalára.
2. Ha a projekt oldala csak egy tájékoztató leírás, akkor kattintson az Alkalmazás megnyitása gombra a menüben, ami elvezeti Önt a valódi alkalmazáshoz.
3. Az alkalmazáson belül kattintson a „Kapcsolódás” gombra.

![Gomb a felhasználó számára, melynek segítségével tárcájával a weboldalhoz kapcsolódhat](./connect1.png)

4. Válassza ki a tárcáját a megadott opciók listájából. Ha nem látja a tárcáját, akkor nézze meg a „WalletConnect” lehetőség alatt.

![Kiválasztás a tárcák listájából a kapcsolódáshoz](./connect2.png)

5. Erősítse meg az aláírási kérést a tárcájában ahhoz, hogy a kapcsolat létrejöjjön. **Az üzenet aláírása nem kerül ETH-pénzeszközbe**.
6. Készen is van! Kezdje el használni az alkalmazást. Számos érdekes projektet találhat a [dapp oldalunkon](/dapps/#explore). <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Szeretne többet megtudni?</div>
  <ButtonLink href="/guides/">
    Tekintse meg a további útmutatóinkat
  </ButtonLink>
</InfoBanner>

## Gyakran ismételt kérdések

### Ha rendelkezek ETH-címmel, akkor ugyanazt a címet más blokkláncokon is használhatom?

Ugyanazt a címet használhatja minden EVM-kompatibilis blokkláncon (ha az Ön tárcájához tartozik visszaállítási kulcsmondat). Ez a [lista](https://chainlist.org/) megmutatja, hogy melyik blokkláncokon működik ugyanaz a cím. Néhány blokklánc, mint a Bitcoin, teljesen más hálózati szabályok alapján üzemel, ezért ott egy másik címre van szükség, amely más formátummal is bír. Ha okosszerződéses tárcával rendelkezik, akkor a terméktájékoztatóból kiderül, hogy melyik blokkláncokat támogatja.

### Használhatom ugyanazt a címet több eszközön?

Igen, több eszközön is lehet ugyanazt a címet használni. A tárca valójában csak egy felület, hogy Ön láthassa az egyenlegét és tranzakciókat indítson, a számla nem a tárcán belül található, hanem a blokkláncon.

### Nem kaptam meg a kriptót, hol tudom a tranzakció státuszát ellenőrizni?

Használhatja a [blokkfelfedezőket](/developers/docs/data-and-analytics/block-explorers/), hogy valós időben követni tudja a tranzakció státuszát. Ehhez csak a tárca címére vagy a tranzakció azonosítójára kell rákeresnie.

### A tranzakciókat le tudom állítani vagy visszafordítani?

Nem, a jóváhagyás után nem lehet leállítani.
