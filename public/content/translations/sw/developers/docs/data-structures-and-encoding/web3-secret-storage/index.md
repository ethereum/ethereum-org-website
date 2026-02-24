---
title: Tovuti ya tatu ufafanuzi wa uhifadhi
description: Ufafanuzi rasmi wa ghala ya siri ya web3
lang: sw
sidebarDepth: 2
---

Ili kufanya programu yako ifanye kazi kwenye Ethereum, unaweza kutumia kitu cha web3 kinachotolewa na maktaba ya web3.js. Kimsingi huwasiliana na nodi ya ndani kupitia wito za RPC. [web3](https://github.com/ethereum/web3.js/) hufanya kazi na nodi yoyote ya Ethereum ambayo inaonyesha safu ya RPC.

`web3` ina kitu cha `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** matokeo
 *               [ 'web3', 3 ]   faili la ufunguo la web3 (v3)
 *  [ 'ethersale', undefined ]   Faili la ufunguo la Ethersale
 *                        null     faili la ufunguo batili
 */
```

Hati hii inaandika **toleo la 3** la Ufafanuzi wa Ghala la Siri la Web3.

## Ufafanuzi {#definition}

Usimbaji na uondoaji usimbaji halisi wa faili haujabadilika kwa kiasi kikubwa kutoka toleo la 1, isipokuwa kwamba algoriti ya kripto haijawekwa tena kwa AES-128-CBC (AES-128-CTR sasa ndiyo hitaji la chini kabisa). Maana/algoriti nyingi ni sawa na toleo la 1, isipokuwa `mac`, ambayo hutolewa kama SHA3 (keccak-256) ya miunganisho ya baiti 16 za pili kutoka kushoto za ufunguo uliotolewa pamoja na `ciphertext` kamili.

Faili za ufunguo wa siri huhifadhiwa moja kwa moja katika `~/.web3/keystore` (kwa mifumo inayofanana na Unix) na `~/AppData/Web3/keystore` (kwa Windows). Zinaweza kupewa jina lolote, lakini utaratibu mzuri ni `<uuid>.json`, ambapo `<uuid>` ni UUID ya biti 128 iliyopewa ufunguo wa siri (wakala wa kuhifadhi faragha kwa anwani ya ufunguo wa siri).

Faili zote kama hizo zina nenosiri linalohusishwa. Ili kupata ufunguo wa siri wa faili fulani ya `.json`, kwanza pata ufunguo wa usimbaji fiche wa faili; hii inafanywa kwa kuchukua nenosiri la faili na kulipitisha kupitia kitendakazi cha kupata ufunguo kama ilivyoelezwa na ufunguo wa `kdf`. Vigezo vya kudumu na vinavyobadilika vinavyotegemea KDF kwa kitendakazi cha KDF vimeelezwa katika ufunguo wa `kdfparams`.

PBKDF2 lazima iungwe mkono na utekelezaji wote unaokidhi viwango vya chini kabisa, unaoonyeshwa kupitia:

- `kdf`: `pbkdf2`

Kwa PBKDF2, kdfparams zinajumuisha:

- `prf`: Lazima iwe `hmac-sha256` (inaweza kupanuliwa siku zijazo);
- `c`: idadi ya marudio;
- `salt`: chumvi iliyopitishwa kwa PBKDF;
- `dklen`: urefu wa ufunguo uliotolewa. Lazima iwe >= 32.

Mara ufunguo wa faili utakapopatikana, unapaswa kuthibitishwa kupitia upatikanaji wa MAC. MAC inapaswa kukokotolewa kama hashi ya SHA3 (keccak-256) ya safu ya baiti iliyoundwa kama miunganisho ya baiti 16 za pili kutoka kushoto za ufunguo uliotolewa na yaliyomo kwenye ufunguo wa `ciphertext`, yaani:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(ambapo `++` ni kiendeshaji cha kuunganisha)

Thamani hii inapaswa kulinganishwa na yaliyomo kwenye ufunguo wa `mac`; ikiwa ni tofauti, nenosiri mbadala linapaswa kuombwa (au operesheni isitishwe).

Baada ya ufunguo wa faili kuthibitishwa, maandishi ya kificho (ufunguo wa `ciphertext` katika faili) yanaweza kuondolewa usimbaji kwa kutumia algoriti ya usimbaji fiche linganifu iliyoainishwa na ufunguo wa `cipher` na kuwekewa vigezo kupitia ufunguo wa `cipherparams`. Ikiwa saizi ya ufunguo uliotolewa na saizi ya ufunguo wa algoriti hazifanani, baiti za kulia kabisa za ufunguo uliotolewa, zilizojazwa na sifuri, zinapaswa kutumika kama ufunguo wa algoriti.

Utekelezaji wote unaokidhi viwango vya chini kabisa lazima uunge mkono algoriti ya AES-128-CTR, inayoonyeshwa kupitia:

- `cipher: aes-128-ctr`

Kificho hiki huchukua vigezo vifuatavyo, vilivyotolewa kama funguo za ufunguo wa cipherparams:

- `iv`: vekta ya kuanzisha ya biti 128 kwa kificho.

Ufunguo wa kificho ni baiti 16 za kushoto kabisa za ufunguo uliotolewa, yaani, `DK[0..15]`

Uundaji/usimbaji fiche wa ufunguo wa siri unapaswa kuwa kinyume cha maagizo haya kimsingi. Hakikisha `uuid`, `salt` na `iv` ni za kubahatisha.

Mbali na sehemu ya `version`, ambayo inapaswa kufanya kazi kama kitambulisho "kigumu" cha toleo, utekelezaji unaweza pia kutumia `minorversion` kufuatilia mabadiliko madogo, yasiyovunja, kwa umbizo.

## Vekta za Majaribio {#test-vectors}

Maelezo:

- `Anwani`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Nenosiri`: `testpassword`
- `Siri`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Vekta ya majaribio inayotumia `AES-128-CTR` na `PBKDF2-SHA-256`:

Yaliyomo kwenye faili ya `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Hatua za kati**:

`Ufunguo uliotolewa`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Mwili wa MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Ufunguo wa kificho`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vekta ya majaribio inayotumia AES-128-CTR na Scrypt:

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

**Hatua za kati**:

`Ufunguo uliotolewa`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Mwili wa MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Ufunguo wa kificho`: `7446f59ecc301d2d79bc3302650d8a5c`

## Mabadiliko kutoka Toleo la 1 {#alterations-from-v2}

Toleo hili linarekebisha kutofautiana kadhaa na toleo la 1 lililochapishwa [hapa](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Kwa ufupi haya ni:

- Matumizi ya herufi kubwa hayana msingi na hayana msimamo (scrypt herufi ndogo, Kdf mchanganyiko, MAC herufi kubwa).
- Anwani sio ya lazima na inahatarisha faragha.
- `Chumvi` kimsingi ni kigezo cha kitendakazi cha kupata ufunguo na inastahili kuhusishwa nacho, sio na kripto kwa ujumla.
- _SaltLen_ sio ya lazima (ipate tu kutoka kwa Chumvi).
- Kitendakazi cha kupata ufunguo kimetolewa, lakini algoriti ya kripto imebainishwa kwa ukali.
- `Toleo` kimsingi ni nambari lakini ni mfuatano (utoaji toleo uliopangwa ungewezekana na mfuatano, lakini unaweza kuzingatiwa kuwa nje ya wigo wa umbizo la faili la usanidi linalobadilika mara chache).
- `KDF` na `cipher` ni dhana ndugu kinadharia lakini zimepangwa tofauti.
- `MAC` inakokotolewa kupitia kipande cha data kisichojali nafasi tupu(!)

Mabadiliko yamefanywa kwenye umbizo ili kutoa faili ifuatayo, ambayo ni sawa kiutendaji na mfano uliotolewa kwenye ukurasa uliounganishwa hapo awali:

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

## Mabadiliko kutoka Toleo la 2 {#alterations-from-v2}

Toleo la 2 lilikuwa utekelezaji wa mapema wa C++ na idadi ya hitilafu. Mambo yote muhimu hayajabadilika kutoka humo.
