---
title: "Definice tajného úložiště web3"
description: "Formální definice pro tajné úložiště web3"
lang: cs
sidebarDepth: 2
---

Aby vaše aplikace fungovala na síti Ethereum, můžete použít objekt web3 poskytovaný knihovnou web3.js. Na pozadí komunikuje s místním uzlem prostřednictvím volání RPC. [web3](https://github.com/ethereum/web3.js/) funguje s jakýmkoli uzlem Ethereum, který zpřístupňuje vrstvu RPC.

`web3` obsahuje objekt `eth` – web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** výsledek
 *               [ 'web3', 3 ]   soubor s klíčem web3 (v3)
 *  [ 'ethersale', undefined ]   soubor s klíčem Ethersale
 *                        null     neplatný soubor s klíčem
 */
```

Tento dokument popisuje **verzi 3** definice tajného úložiště Web3.

## Definice {#definition}

Vlastní kódování a dekódování souboru zůstává z velké části nezměněno oproti verzi 1, s tím rozdílem, že kryptoalgoritmus již není pevně nastaven na AES-128-CBC (minimálním požadavkem je nyní AES-128-CTR). Většina významů/algoritmů je podobná verzi 1, kromě `mac`, který je dán jako SHA3 (keccak-256) zřetězení druhých 16 bajtů zleva odvozeného klíče společně s úplným `ciphertextem`.

Soubory s tajným klíčem jsou uloženy přímo v `~/.web3/keystore` (pro systémy podobné Unixu) a `~/AppData/Web3/keystore` (pro Windows). Mohou být pojmenovány jakkoli, ale dobrou konvencí je `<uuid>.json`, kde `<uuid>` je 128bitový identifikátor UUID přiřazený tajnému klíči (proxy chránící soukromí pro adresu tajného klíče).

Všechny takové soubory mají přidružené heslo. Chcete-li odvodit tajný klíč daného souboru `.json`, nejprve odvoďte šifrovací klíč souboru; to se provede tak, že vezmete heslo souboru a předáte ho funkci pro odvození klíče, jak je popsáno v klíči `kdf`. Statické a dynamické parametry závislé na KDF pro funkci KDF jsou popsány v klíči `kdfparams`.

PBKDF2 musí být podporován všemi minimálně vyhovujícími implementacemi, označeno jako:

- `kdf`: `pbkdf2`

Pro PBKDF2 parametry kdfparams zahrnují:

- `prf`: Musí být `hmac-sha256` (může být v budoucnu rozšířen);
- `c`: počet iterací;
- `salt`: sůl předaná do PBKDF;
- `dklen`: délka odvozeného klíče. Musí být >= 32.

Jakmile byl klíč souboru odvozen, měl by být ověřen prostřednictvím odvození MAC. MAC by se měl vypočítat jako haš SHA3 (keccak-256) bajtového pole vytvořeného zřetězením druhých 16 bajtů zleva odvozeného klíče s obsahem klíče `ciphertext`, tj.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(kde `++` je operátor zřetězení)

Tato hodnota by se měla porovnat s obsahem klíče `mac`; pokud se liší, mělo by se vyžádat alternativní heslo (nebo operace zrušena).

Po ověření klíče souboru může být šifrovaný text (klíč `ciphertext` v souboru) dešifrován pomocí algoritmu symetrického šifrování specifikovaného klíčem `cipher` a parametrizovaného pomocí klíče `cipherparams`. Pokud se velikost odvozeného klíče a velikost klíče algoritmu neshodují, měly by se jako klíč k algoritmu použít nejvíce pravé bajty odvozeného klíče, doplněné nulami.

Všechny minimálně vyhovující implementace musí podporovat algoritmus AES-128-CTR, označený jako:

- `cipher: aes-128-ctr`

Tato šifra přebírá následující parametry, uvedené jako klíče ke klíči cipherparams:

- `iv`: 128bitový inicializační vektor pro šifru.

Klíčem pro šifru je 16 nejvíce levých bajtů odvozeného klíče, tj. `DK[0..15]`

Vytvoření/zašifrování tajného klíče by mělo být v podstatě opakem těchto pokynů. Ujistěte se, že `uuid`, `salt` a `iv` jsou skutečně náhodné.

Kromě pole `version`, které by mělo fungovat jako "tvrdý" identifikátor verze, mohou implementace také používat `minorversion` ke sledování menších změn formátu, které nenaruší zpětnou kompatibilitu.

## Testovací vektory {#test-vectors}

Podrobnosti:

- `Adresa`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Heslo`: `testpassword`
- `Tajný klíč`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

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

`Odvozený klíč`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Tělo MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Šifrovací klíč`: `f06d69cdc7da0faffb1008270bca38f5`

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

`Odvozený klíč`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Tělo MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Šifrovací klíč`: `7446f59ecc301d2d79bc3302650d8a5c`

## Změny oproti verzi 1 {#alterations-from-v2}

Tato verze opravuje několik nesrovnalostí s verzí 1 publikovanou [zde](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Stručně řečeno se jedná o:

- Použití velkých a malých písmen je neopodstatněné a nekonzistentní (scrypt malými písmeny, Kdf s různou velikostí písmen, MAC velkými písmeny).
- Adresa je zbytečná a ohrožuje soukromí.
- `Salt` je ze své podstaty parametrem funkce pro odvození klíče a zaslouží si být s ní spojena, nikoli s kryptem obecně.
- _SaltLen_ je zbytečné (stačí jej odvodit ze Salt).
- Funkce pro odvození klíče je dána, ale kryptoalgoritmus je pevně specifikován.
- `Version` je ze své podstaty číselná, ale je to řetězec (strukturované verzování by bylo možné s řetězcem, ale lze to považovat za nadbytečné pro formát konfiguračního souboru, který se mění jen zřídka).
- `KDF` a `cipher` jsou teoreticky sourozenecké koncepty, ale jsou organizovány odlišně.
- `MAC` se vypočítává z datového bloku, který ignoruje prázdné znaky (!)

Ve formátu byly provedeny změny tak, aby vznikl následující soubor, který je funkčně ekvivalentní příkladu uvedenému na dříve odkazované stránce:

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

## Změny oproti verzi 2 {#alterations-from-v2}

Verze 2 byla raná implementace v C++ s řadou chyb. Všechny základní věci v ní zůstávají beze změny.
