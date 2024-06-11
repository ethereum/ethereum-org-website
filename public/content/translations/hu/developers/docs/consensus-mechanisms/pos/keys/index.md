---
title: Kulcsok a proof-of-stake Ethereumban
description: Az Ethereum proof-of-stake konszenzusmechanizmusában használt kulcsok ismertetése
lang: hu
---

Az Ethereum a nyilvános-privát kulcspáron alapuló kriptográfia segítségével biztosítja a felhasználói eszközöket. A nyilvános kulcs az Ethereum-cím alapjául szolgál, tehát látható a nyilvánosság számára, és egyedi azonosítóként használják. A privát (vagy titkos) kulcshoz mindig csak a számla tulajdonosa férhet hozzá. A privát kulcsot tranzakciók és adatok aláírására használják, hogy a kriptográfia bizonyítani tudja, hogy a tulajdonos jóváhagyja az adott privát kulcs műveletét.

Az Ethereum kulcsait [elliptikus görbe kriptográfiával](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) generálják.

Amikor azonban az Ethereum [proof-of-work](/developers/docs/consensus-mechanisms/pow) mechanizmusról [proof-of-stake-re](/developers/docs/consensus-mechanisms/pos) váltott, egy új típusú kulcs került az Ethereumba. Az eredeti kulcsok továbbra is pontosan ugyanúgy működnek, mint korábban – a számlákat biztosító elliptikus görbén alapuló kulcsok nem változtak. A felhasználóknak azonban új típusú kulcsra volt szükségük ahhoz, hogy részt vehessenek a proof-of-stake-ben az ETH letétbe helyezésével és a validátorok futtatásával. Ez az igény a skálázhatóság miatt érdekes, hogy a nagyszámú validátorok közötti üzenetekhez olyan kriptográfiai módszer legyen, amely könnyen aggregálható, így csökkenti a hálózati konszenzus kommunikációs igényét.

Ez az új típusú kulcs a [**Boneh-Lynn-Shacham (BLS)** aláírási sémát használja](https://wikipedia.org/wiki/BLS_digital_signature). A BLS lehetővé teszi az aláírások nagyon hatékony aggregálását, ugyanakkor az aggregált egyedi validátorkulcsok visszafejtését is, és ideális a validátorok közötti műveletek kezelésére.

## A validátorkulcsok két típusa {#two-types-of-keys}

A proof-of-stake-re való átállás előtt az Ethereum-felhasználóknak csak egyetlen elliptikus görbén alapuló privát kulccsal volt hozzáférésük a pénzükhöz. A proof-of-stake bevezetésével az önálló letétbe helyezőknek szükségük volt egy **validátorkulcsra** és egy **kivételi kulcsra** is.

### A validátorkulcs {#validator-key}

A validátor aláírókulcs két elemből áll:

- Validátor **privát** kulcs
- Validátori **nyilvános** kulcs

A validátor privát kulcsának célja a láncon belül végrehajtott műveletek, például a blokkjavaslatok és a tanúsítások aláírása. Emiatt ezeket a kulcsokat egy „forró” tárcában kell tartani (mindig online és elérhető legyen).

Ennek a rugalmasságnak az az előnye, hogy a validátor aláírókulcsok gyorsan mozgathatók egyik eszközről a másikra, azonban ha elvesznek vagy ellopják azokat, a tolvaj többféleképpen is képes lehet **visszaélni** azokkal:

- A validátort súlyos és kizárással járó büntetés éri:
  - Amikor blokkelőterjesztő, akkor két különböző Beacon blokkot javasol és ír alá ugyanarra a slotra
  - Tanúsítóként olyan tanúsítást hagy jóvá, amely „körbeölel” egy másikat
  - Tanúsítóként két eltérő tanúsítást ír alá ugyanarra a dologra
- Önkéntes kilépésre kényszeríti, amely a validátor letétjét feloldja és a kivételi kulcs tulajdonosa hozzáfér az ETH-egyenleghez

A **validátor nyilvános kulcsa** szerepel a tranzakció adataiban, amikor egy felhasználó ETH-t fizet be a letéti szerződésbe. Ez az úgynevezett _letéti adat_, amely lehetővé teszi az Ethereum számára a validátor azonosítását.

### Kivételi hitelesítő adatok {#withdrawal-credentials}

Minden validátor rendelkezik egy tulajdonsággal, amelyet _visszavonási hitelesítő adatoknak_ neveznek. Ez a 32 bájtos mező vagy `0x00`-val kezdődik, ami a BLS kivonási hitelesítő adatokat jelenti, vagy az eleje` 0x01`, ami a végrehajtási címre mutató hitelesítő adatokat jelenti.

A `0x00` BLS kulcsokkal rendelkező validátoroknak frissíteniük kell ezeket a hitelesítő adatokat, hogy azok egy végrehajtási címre mutassanak a többletegyenleg kifizetéséhez vagy a letétkivonáshoz. Ezt úgy lehet megtenni, hogy a kezdeti kulcsgenerálás során a letétbe helyezési adatokban megadunk egy végrehajtási címet, _VAGY_ úgy, hogy a kivételi kulcsot egy későbbi időpontban felhasználjuk egy `BLSToExecutionChange` üzenet aláírására és továbbítására.

### A kivételi kulcs {#withdrawal-key}

A kivételi kulcsra a kivételi hitelesítő adatok frissítéséhez van szükség, hogy azok egy végrehajtási címre mutassanak, ha a kezdeti befizetés során ezt nem állították be. Ez lehetővé teszi a felhasználók számára a többletegyenleg-kifizetések feldolgozásának elindítását, és a letétbe helyezett ETH teljes kivételét is.

Ahogy a validátorkulcsok, a kivételi kulcsok is két elemből állnak:

- Kivételi **privát** kulcs
- Kivételi **nyilvános** kulcs

Ennek a kulcsnak az elvesztése a kivételi hitelesítő adatok `0x01` típusra történő frissítése előtt a validátoregyenleghez való hozzáférés elvesztését jelenti. A validátor továbbra is aláírhatja a tanúsításokat és a blokkokat, mivel ezekhez a műveletekhez a validátor privát kulcsa szükséges, azonban a kivételi kulcsok elvesztése miatt erre igen kevés a motivációja.

A validátorkulcsok és az Ethereum-számlakulcsok szétválasztása lehetővé teszi, hogy egyetlen felhasználó több validátort is futtasson.

![validátorkulcs ábrája](validator-key-schematic.png)

## Kulcsok származtatása egy kulcsmondatból {#deriving-keys-from-seed}

Ha minden 32 ETH feltöltéséhez 2 független kulcsból álló új készletre lenne szükség, a kulcskezelés nehézkessé válna, különösen a több validátort futtató felhasználók számára. Ehelyett több validátorkulcsot lehet egyetlen titokból levezetni, és ennek a titoknak a tárolása lehetővé teszi a hozzáférést több validátorkulcshoz.

[Az emlékeztető kódszó](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) és az útvonalak olyan kiemelkedő jellemzők, amelyekkel a felhasználók gyakran találkoznak, amikor [hozzáférnek](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) a tárcájukhoz. Az emlékeztető kódszó egy szavakból álló sorozat, amely a privát kulcs kezdeti magjaként szolgál. További adatokkal kombinálva az emlékeztető kódszó egy „mesterkulcs” néven ismert hasht generál. Ezt úgy lehet elképzelni, mint egy fa gyökerét. Ebből a gyökérből hierarchikus útvonal segítségével elágazások vezethetők le, így a gyermek csomópontok a szülői csomópont hashjének és a fán belüli indexének kombinációjaként létezhetnek. Tekintse meg a [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) és [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) szabványokat az emlékeztetőkódszó-alapú kulcsgeneráláshoz.

Ezek az útvonalak a következőképpen néznek ki, ami ismerős lehet azoknak, akik már dolgoztak hardvertárcákkal:

```
m/44'/60'/0'/0`
```

Az ebben az elérési útvonalban lévő perjelek a következőképpen választják el a privát kulcs összetevőit:

```
master_key / purpose / coin_type / account / change / address_index
```

Ez a logika lehetővé teszi a felhasználók számára, hogy egyetlen **emlékeztető kódszóhoz** a lehető legtöbb validátort csatolják, mivel a fa gyökere közös lehet, és a differenciálás az elágazásokban történhet. A felhasználó **az emlékeztető kódszóból tetszőleges számú kulcsot** származtathat.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Az egyes ágakat `/` választja el egymástól, így `m/2` azt jelenti, hogy a mesterkulccsal kezdjük, és a 2. ágat követjük. Az alábbi ábrán egyetlen emlékeztető kódszót használunk három kivételi kulcs tárolására, mindegyikhez két validátor tartozik.

![validátorkulcs-logika](multiple-keys.png)

## További olvasnivaló {#further-reading}

- [Ethereum Alapítvány blogbejegyzés Carl Beekhuizentől](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 BLS12-381 kulcsgenerálás](https://eips.ethereum.org/EIPS/eip-2333)
