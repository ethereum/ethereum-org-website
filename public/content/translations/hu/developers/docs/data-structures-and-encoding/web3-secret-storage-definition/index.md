---
title: Web3 titkos tárhely meghatározása
description: A web3 titkos tárolás hivatalos definíciója
lang: hu
sidebarDepth: 2
---

Ahhoz, hogy az Ön alkalmazása az Ethereumon működjön, használhatja a web3 objektumot, amit a web3.js könyvtár biztosít. A háttérben RPC híváson keresztül egy helyi csomóponttal kommunikál. A [web3](https://github.com/ethereum/web3.js/) bármelyik Ethereum csomóponttal működőképes, mely nyilvánossá tesz egy RPC réteget.

A `web3` az `eth` objektumot tartalmazza: web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** result
 *               [ 'web3', 3 ]   web3 (v3) keyfile
 *  [ 'ethersale', undefined ]   Ethersale keyfile
 *                        null     invalid keyfile
 */
```

Ez a dokumentum a web3 titkos tárolási definíciójának **3. verzióját** dokumentálja.

## Definíció {#definition}

A fájl tényleges kódolása és dekódolása nagyrészt változatlan marad az 1. verzióhoz képest, kivéve, hogy a titkosítási algoritmus már nem AES-128-CBC-hez van kötve (az AES-128-CTR a minimális követelmény). A legtöbb jelentés és algoritmus hasonló az 1. verzióhoz, kivéve a `mac`, amely a származtatott kulcs bal szélső második 16 bájtjának és a teljes `ciphertextnek` a SHA3 (keccak-256) kombinációjaként van megadva.

A titkos kulcsfájlok közvetlenül a `~/.web3/keystore` (Unix-szerű rendszerekre) és a `~/AppData/Web3/keystore` (Windows esetén) mappákban vannak tárolva. A nevük bármi lehet, de egy jó elnevezési logika a `<uuid>.json`, ahol `<uuid>` a titkos kulcshoz adott 128 bites UUID (a titkos kulcs címének adatvédelmet biztosító proxy).

Minden ilyen fájlhoz tartozik egy jelszó. Egy adott `.json` fájl titkos kulcsának létrehozásához először a fájl titkosítási kulcsát kell létrehozni; ez úgy történik, hogy a fájl jelszavát fogjuk és átadjuk a `kdf` kulcs által megadott kulcskészítő függvénynek. A KDF-től függő statikus és dinamikus paraméterek a `kdfparams` kulcsban vannak leírva.

A PBKDF2-t minden minimálisan megfelelő implementációnak támogatnia kell az alábbi módon:

- `kdf`: `pbkdf2`

A PBKDF2-höz a kdfparams tartalmazza:

- `prf`: `hmac-sha256` kell legyen (talán a jövőben ki lesz terjesztve);
- `c`: iterációk száma;
- `salt`: a PBKDF-nek átadott salt;
- `dklen`: a létrehozott kulcs hossza. Muszáj, hogy >= 32 legyen.

Miután a fájl kulcsát létrehoztuk, azt a MAC származtatásával kell ellenőrizni. A MAC-et a származtatott kulcs bal szélső második 16 bájtjának és a `ciphertext` kulcs tartalmának összekapcsolásából képzett bájttömb SHA3 (keccak-256) hasheként kell kiszámítani:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(ahol a `++` az összeadási művelet)

Ezt az értéket össze kell hasonlítani a `mac` kulcs tartalmával; ha eltérnek, alternatív jelszót kell kérni (vagy a műveletet törölni).

A fájl kulcsának ellenőrzése után a titkosított szöveg (a fájlban szereplő `ciphertext` kulcs) visszafejthető a `cipher` kulcs által meghatározott és a `cipherparams` kulcson keresztül paraméterezett szimmetrikus titkosítási algoritmus segítségével. Ha a származtatott kulcs mérete és az algoritmus kulcsmérete nem egyezik, akkor a származtatott kulcs nullával kitöltött, jobb szélső bájtjait kell használni az algoritmus kulcsaként.

Minden minimálisan megfelelő implementációnak támogatnia kell az AES-128-CTR algoritmust, amelyet a következőkkel jelölnek:

- `cipher: aes-128-ctr`

Ez a titkosító a következő paramétereket veszi fel, amelyeket a cipherparams kulcshoz adott kulcsként kell megadni:

- `iv`: 128 bites inicializálási vektor a titkosításhoz.

A titkosítás kulcsa a származtatott kulcs bal szélső 16 bájtja, azaz `DK[0..15]`

A titkos kulcs létrehozása vagy titkosítása lényegében ezen utasítások fordítottja. Győződjön meg arról, hogy a `uuid`, `salt` és `iv` valóban véletlenszerű.

A `version` mezőn kívül, amelynek a verzió „kemény” azonosítójaként kell működnie, a megvalósítások használhatják a `minorversion` mezőt is a formátum kisebb, nem megszakított változásainak követésére.

## Tesztvektorok {#test-vectors}

Részletek:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

A tesztvektor `AES-128-CTR` és `PBKDF2-SHA-256` kódot használ:

A `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` fájltartalma:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Köztes értékek**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

A tesztvektor AES-128-CTR és Scrypt-et használ:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Köztes értékek**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d` `MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2` `MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c` `Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Módosítások az 1. változathoz képest {#alterations-from-v2}

Ez a verzió számos inkonzisztenciát javított ki az [itt](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst) publikált 1. verzióhoz képest. Ezek röviden:

- A nagybetűs írásmód indokolatlan és következetlen (scrypt kisbetűs, Kdf vegyes, MAC nagybetűs).
- A cím felesleges és veszélyezteti az adatvédelmet.
- `Salt` eredendően a kulcslétrehozási függvény paramétere, és ahhoz kell hozzárendelni, nem pedig általában a kriptográfiához.
- _SaltLen_ fölösleges (a Salt-ból le lehet vezetni).
- A kulcslétrehozási függvény adott, de a titkosítási algoritmus nehezen meghatározott.
- `Version` eredendően numerikus, mégis egy sztring (a strukturált verziókezelés lehetséges lenne egy sztringgel, de egy ritkán változó konfigurációs fájlformátum esetében ez nem releváns).
- `KDF` és `cipher` fogalmilag testvérek, mégis másképp szerveződnek.
- `MAC` egy szóköz agnosztikus adatdarabon keresztül kerül kiszámításra(!)

A formátumot úgy változtattuk meg, hogy a következő fájlt kapjuk, amely funkcionálisan megegyezik a korábban hivatkozott oldal példájával:

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## Módosítások az 2. változathoz képest {#alterations-from-v2}

A 2. verzió egy korai C++ implementáció volt számos hibával. Minden lényeges dolog változatlan maradt.
