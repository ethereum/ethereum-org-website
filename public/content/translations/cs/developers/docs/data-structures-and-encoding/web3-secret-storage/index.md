---
title: "Definice tajného úložiště Web3"
description: "Formální definice pro tajné úložiště Web3"
lang: cs
sidebarDepth: 2
---

Aby vaše aplikace fungovala na Ethereu, můžete použít objekt web3, který poskytuje knihovna web3.js. Interně komunikuje s lokálním uzlem prostřednictvím RPC volání. [web3](https://github.com/ethereum/web3.js/) funguje s jakýmkoli uzlem Etherea, který vystavuje RPC vrstvu.

`web3` obsahuje objekt `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** výsledek
 *               [ 'web3', 3 ]   soubor s klíči Web3 (v3)
 *  [ 'ethersale', undefined ]   soubor s klíči Ethersale
 *                        null     neplatný soubor s klíči
 */
```

Tento dokument popisuje **verzi 3** definice tajného úložiště Web3 (Web3 Secret Storage Definition).

## Definice {#definition}

Samotné kódování a dekódování souboru zůstává z velké části nezměněno oproti verzi 1, s výjimkou toho, že krypto algoritmus již není pevně stanoven na AES-128-CBC (minimálním požadavkem je nyní AES-128-CTR). Většina významů/algoritmů je podobná verzi 1, kromě `mac`, který je dán jako SHA3 (Keccak-256) zřetězení druhých 16 bajtů zleva odvozeného klíče společně s celým `ciphertext`.

Soubory s tajným klíčem jsou uloženy přímo v `~/.web3/keystore` (pro systémy unixového typu) a `~/AppData/Web3/keystore` (pro Windows). Mohou se jmenovat jakkoli, ale dobrou konvencí je `<uuid>.json`, kde `<uuid>` je 128bitové UUID přidělené tajnému klíči (zástupce pro adresu tajného klíče, který zachovává soukromí).

Všechny takové soubory mají přidružené heslo. Pro odvození tajného klíče daného souboru `.json` nejprve odvoďte šifrovací klíč souboru; to se provede tak, že se vezme heslo souboru a předá se funkci pro odvození klíče, jak je popsáno klíčem `kdf`. Statické a dynamické parametry závislé na KDF pro funkci KDF jsou popsány v klíči `kdfparams`.

PBKDF2 musí být podporováno všemi minimálně vyhovujícími implementacemi, což je označeno pomocí:

- `kdf`: `pbkdf2`

Pro PBKDF2 zahrnují parametry kdfparams:

- `prf`: Musí být `hmac-sha256` (v budoucnu může být rozšířeno);
- `c`: počet iterací;
- `salt`: sůl předaná do PBKDF;
- `dklen`: délka odvozeného klíče. Musí být >= 32.

Jakmile je klíč souboru odvozen, měl by být ověřen prostřednictvím odvození MAC. MAC by měl být vypočítán jako hash SHA3 (Keccak-256) pole bajtů vytvořeného zřetězením druhých 16 bajtů zleva odvozeného klíče s obsahem klíče `ciphertext`, tj.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(kde `++` je operátor zřetězení)

Tato hodnota by měla být porovnána s obsahem klíče `mac`; pokud se liší, mělo by být vyžádáno alternativní heslo (nebo by měla být operace zrušena).

Po ověření klíče souboru může být šifrovaný text (klíč `ciphertext` v souboru) dešifrován pomocí symetrického šifrovacího algoritmu specifikovaného klíčem `cipher` a parametrizovaného prostřednictvím klíče `cipherparams`. Pokud se velikost odvozeného klíče a velikost klíče algoritmu neshodují, měly by být jako klíč pro algoritmus použity nulami doplněné bajty odvozeného klíče nejvíce vpravo.

Všechny minimálně vyhovující implementace musí podporovat algoritmus AES-128-CTR, označený pomocí:

- `cipher: aes-128-ctr`

Tato šifra přijímá následující parametry, zadané jako klíče ke klíči cipherparams:

- `iv`: 128bitový inicializační vektor pro šifru.

Klíčem pro šifru je 16 bajtů odvozeného klíče nejvíce vlevo, tj. `DK[0..15]`

Vytvoření/šifrování tajného klíče by mělo být v podstatě opakem těchto pokynů. Ujistěte se, že `uuid`, `salt` a `iv` jsou skutečně náhodné.

Kromě pole `version`, které by mělo fungovat jako „tvrdý“ identifikátor verze, mohou implementace také použít `minorversion` ke sledování menších, zpětně kompatibilních změn formátu.

## Testovací vektory {#test-vectors}

Podrobnosti:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

Testovací vektor používající `AES-128-CTR` a `PBKDF2-SHA-256`:

Obsah souboru `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Mezivýsledky**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Testovací vektor používající AES-128-CTR a Scrypt:

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

**Mezivýsledky**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Změny oproti verzi 1 {#alterations-from-v2}

Tato verze opravuje několik nesrovnalostí s verzí 1 publikovanou [zde](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Stručně řečeno, jedná se o:

- Používání velkých písmen je neopodstatněné a nekonzistentní (scrypt malými písmeny, Kdf kombinovaně, MAC velkými písmeny).
- Adresa je zbytečná a ohrožuje soukromí.
- `Salt` je ze své podstaty parametrem funkce pro odvození klíče a zaslouží si být s ní spojen, nikoli s kryptem obecně.
- _SaltLen_ je zbytečné (stačí jej odvodit ze Salt).
- Funkce pro odvození klíče je dána, přesto je krypto algoritmus pevně specifikován.
- `Version` je ze své podstaty číselné, přesto je to řetězec (strukturované verzování by bylo s řetězcem možné, ale lze jej považovat za přesahující rámec pro zřídka se měnící formát konfiguračního souboru).
- `KDF` a `cipher` jsou teoreticky sourozenecké koncepty, přesto jsou organizovány odlišně.
- `MAC` se počítá prostřednictvím dat, která ignorují bílé znaky(!)

Ve formátu byly provedeny změny, aby vznikl následující soubor, funkčně ekvivalentní příkladu uvedenému na dříve odkazované stránce:

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

## Změny oproti verzi 2 {#alterations-from-v2-2}

Verze 2 byla raná implementace v C++ s řadou chyb. Všechny podstatné věci z ní zůstávají nezměněny.