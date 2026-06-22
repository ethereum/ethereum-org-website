---
title: Ufafanuzi wa hifadhi ya siri ya Web3
description: Ufafanuzi rasmi wa hifadhi ya siri ya Web3
lang: sw
sidebarDepth: 2
---

Ili kufanya programu yako ifanye kazi kwenye Ethereum, unaweza kutumia kipengee cha web3 kinachotolewa na maktaba ya web3.js. Kiufundi, inawasiliana na nodi ya ndani kupitia miito ya RPC. [web3](https://github.com/ethereum/web3.js/) inafanya kazi na nodi yoyote ya Ethereum inayoweka wazi safu ya RPC.

`web3` ina kipengee cha `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** matokeo
 *               [ 'web3', 3 ]   faili la ufunguo la Web3 (v3)
 *  [ 'ethersale', undefined ]   faili la ufunguo la Ethersale
 *                        null     faili la ufunguo batili
 */
```

Hii inaandika **toleo la 3** la Ufafanuzi wa Hifadhi ya Siri ya Web3.

## Ufafanuzi {#definition}

Usimbaji na usimbuaji halisi wa faili unabaki bila kubadilika sana kutoka toleo la 1, isipokuwa kwamba algoriti ya kripto haijafungwa tena kwenye AES-128-CBC (AES-128-CTR sasa ni hitaji la chini kabisa). Maana/algoriti nyingi zinafanana na toleo la 1, isipokuwa `mac`, ambayo inatolewa kama SHA3 (keccak-256) ya miunganisho ya baiti 16 za pili kutoka kushoto za ufunguo uliotolewa pamoja na `ciphertext` kamili.

Faili za ufunguo wa siri zinahifadhiwa moja kwa moja katika `~/.web3/keystore` (kwa mifumo kama ya Unix) na `~/AppData/Web3/keystore` (kwa Windows). Zinaweza kuitwa chochote, lakini utaratibu mzuri ni `<uuid>.json`, ambapo `<uuid>` ni UUID ya biti 128 iliyotolewa kwa ufunguo wa siri (wakala wa kuhifadhi faragha kwa anwani ya ufunguo wa siri).

Faili zote kama hizo zina nenosiri linalohusiana. Ili kupata ufunguo wa siri wa faili fulani ya `.json`, kwanza pata ufunguo wa usimbaji fiche wa faili; hii inafanywa kwa kuchukua nenosiri la faili na kulipitisha kwenye kitendakazi cha kutoa ufunguo kama ilivyoelezwa na ufunguo wa `kdf`. Vigezo tuli na badilifu vinavyotegemea KDF kwa kitendakazi cha KDF vinaelezwa katika ufunguo wa `kdfparams`.

PBKDF2 lazima iungwe mkono na utekelezaji wote unaokidhi viwango vya chini, unaoonyeshwa kupitia:

- `kdf`: `pbkdf2`

Kwa PBKDF2, kdfparams zinajumuisha:

- `prf`: Lazima iwe `hmac-sha256` (inaweza kupanuliwa katika siku zijazo);
- `c`: idadi ya marudio;
- `salt`: salt iliyopitishwa kwa PBKDF;
- `dklen`: urefu wa ufunguo uliotolewa. Lazima iwe >= 32.

Mara tu ufunguo wa faili unapopatikana, unapaswa kuthibitishwa kupitia utoaji wa MAC. MAC inapaswa kuhesabiwa kama heshi ya SHA3 (keccak-256) ya safu ya baiti iliyoundwa kama miunganisho ya baiti 16 za pili kutoka kushoto za ufunguo uliotolewa na yaliyomo kwenye ufunguo wa `ciphertext`, yaani,:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(ambapo `++` ni opereta ya muunganisho)

Thamani hii inapaswa kulinganishwa na yaliyomo kwenye ufunguo wa `mac`; ikiwa ni tofauti, nenosiri mbadala linapaswa kuombwa (au operesheni ighairiwe).

Baada ya ufunguo wa faili kuthibitishwa, maandishi ya siri (ufunguo wa `ciphertext` kwenye faili) yanaweza kusimbuliwa kwa kutumia algoriti ya usimbaji fiche linganifu iliyobainishwa na ufunguo wa `cipher` na kuwekewa vigezo kupitia ufunguo wa `cipherparams`. Ikiwa ukubwa wa ufunguo uliotolewa na ukubwa wa ufunguo wa algoriti haulingani, baiti za kulia kabisa zilizojazwa sifuri za ufunguo uliotolewa zinapaswa kutumika kama ufunguo wa algoriti.

Utekelezaji wote unaokidhi viwango vya chini lazima uunge mkono algoriti ya AES-128-CTR, inayoonyeshwa kupitia:

- `cipher: aes-128-ctr`

Sifa hii ya siri inachukua vigezo vifuatavyo, vilivyotolewa kama funguo kwa ufunguo wa cipherparams:

- `iv`: vekta ya uanzishaji ya biti 128 kwa sifa ya siri.

Ufunguo wa sifa ya siri ni baiti 16 za kushoto kabisa za ufunguo uliotolewa, yaani, `DK[0..15]`

Uundaji/usimbaji fiche wa ufunguo wa siri unapaswa kuwa kinyume cha maagizo haya. Hakikisha `uuid`, `salt` na `iv` ni za nasibu kweli.

Mbali na uga wa `version`, ambao unapaswa kufanya kazi kama kitambulisho "kigumu" cha toleo, utekelezaji unaweza pia kutumia `minorversion` kufuatilia mabadiliko madogo, yasiyovunja muundo.

## Vekta za Majaribio {#test-vectors}

Maelezo:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

Vekta ya majaribio kwa kutumia `AES-128-CTR` na `PBKDF2-SHA-256`:

Yaliyomo kwenye faili la `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vekta ya majaribio kwa kutumia AES-128-CTR na Scrypt:

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

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Mabadiliko kutoka Toleo la 1 {#alterations-from-v2}

Toleo hili linarekebisha kutofautiana kadhaa na toleo la 1 lililochapishwa [hapa](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Kwa ufupi haya ni:

- Uwekaji wa herufi kubwa hauna msingi na haulingani (scrypt herufi ndogo, Kdf herufi mchanganyiko, MAC herufi kubwa).
- Anwani si ya lazima na inahatarisha faragha.
- `Salt` kimsingi ni kigezo cha kitendakazi cha kutoa ufunguo na inastahili kuhusishwa nacho, si na kripto kwa ujumla.
- _SaltLen_ si ya lazima (itoe tu kutoka kwa Salt).
- Kitendakazi cha kutoa ufunguo kimetolewa, lakini algoriti ya kripto imebainishwa kwa uthabiti.
- `Version` kimsingi ni nambari lakini ni mfuatano (utolewaji wa matoleo uliopangwa ungewezekana kwa mfuatano, lakini unaweza kuchukuliwa kuwa nje ya upeo kwa muundo wa faili ya usanidi unaobadilika mara chache).
- `KDF` na `cipher` kinadharia ni dhana ndugu lakini zimepangwa tofauti.
- `MAC` inahesabiwa kupitia kipande cha data kisichojali nafasi tupu(!)

Mabadiliko yamefanywa kwenye muundo ili kutoa faili ifuatayo, inayolingana kiutendaji na mfano uliotolewa kwenye ukurasa uliounganishwa hapo awali:

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

## Mabadiliko kutoka Toleo la 2 {#alterations-from-v2-2}

Toleo la 2 lilikuwa utekelezaji wa mapema wa C++ wenye hitilafu kadhaa. Mambo yote muhimu yanabaki bila kubadilika kutoka kwake.