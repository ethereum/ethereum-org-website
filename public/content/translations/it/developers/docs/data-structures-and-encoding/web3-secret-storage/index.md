---
title: Definizione dell'archiviazione dei segreti di Web3
description: Definizione formale per l'archiviazione dei segreti di web3
lang: it
sidebarDepth: 2
---

Per far funzionare la tua app su Ethereum, puoi usare l'oggetto web3 fornito dalla libreria web3.js. Dietro le quinte comunica con un nodo locale tramite chiamate RPC. [web3](https://github.com/ethereum/web3.js/) funziona con qualsiasi nodo Ethereum che espone un livello RPC.

`web3` contiene l'oggetto `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/* * risultato
 *               [ 'web3', 3 ]   keyfile web3 (v3)
 *  [ 'ethersale', undefined ]   keyfile Ethersale
 *                        null     keyfile non valido */





```

Questo documento descrive la **versione 3** della Definizione dell'Archiviazione dei Segreti di Web3 (Web3 Secret Storage Definition).

## Definizione {#definition}

L'effettiva codifica e decodifica del file rimane in gran parte invariata rispetto alla versione 1, tranne per il fatto che l'algoritmo crittografico non è più fisso su AES-128-CBC (AES-128-CTR è ora il requisito minimo). La maggior parte dei significati/algoritmi sono simili alla versione 1, tranne `mac`, che è fornito come SHA3 (keccak-256) delle concatenazioni dei secondi 16 byte da sinistra della chiave derivata insieme all'intero `ciphertext`.

I file delle chiavi segrete sono archiviati direttamente in `~/.web3/keystore` (per i sistemi Unix-like) e `~/AppData/Web3/keystore` (per Windows). Possono avere qualsiasi nome, ma una buona convenzione è `<uuid>.json`, dove `<uuid>` è l'UUID a 128 bit assegnato alla chiave segreta (un proxy che preserva la privacy per l'indirizzo della chiave segreta).

Tutti questi file hanno una password associata. Per derivare la chiave segreta di un dato file `.json`, prima deriva la chiave di crittografia del file; questo viene fatto prendendo la password del file e passandola attraverso una funzione di derivazione della chiave come descritto dalla chiave `kdf`. I parametri statici e dinamici dipendenti dalla KDF per la funzione KDF sono descritti nella chiave `kdfparams`.

PBKDF2 deve essere supportato da tutte le implementazioni minimamente conformi, indicato tramite:

- `kdf`: `pbkdf2`

Per PBKDF2, i kdfparams includono:

- `prf`: Deve essere `hmac-sha256` (potrebbe essere esteso in futuro);
- `c`: numero di iterazioni;
- `salt`: salt passato a PBKDF;
- `dklen`: lunghezza per la chiave derivata. Deve essere >= 32.

Una volta derivata la chiave del file, dovrebbe essere verificata attraverso la derivazione del MAC. Il MAC dovrebbe essere calcolato come l'hash SHA3 (keccak-256) dell'array di byte formato come le concatenazioni dei secondi 16 byte da sinistra della chiave derivata con i contenuti della chiave `ciphertext`, ovvero:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(dove `++` è l'operatore di concatenazione)

Questo valore dovrebbe essere confrontato con i contenuti della chiave `mac`; se sono diversi, dovrebbe essere richiesta una password alternativa (o l'operazione annullata).

Dopo che la chiave del file è stata verificata, il testo cifrato (la chiave `ciphertext` nel file) può essere decrittografato utilizzando l'algoritmo di crittografia simmetrica specificato dalla chiave `cipher` e parametrizzato tramite la chiave `cipherparams`. Se la dimensione della chiave derivata e la dimensione della chiave dell'algoritmo non corrispondono, i byte più a destra, riempiti di zeri, della chiave derivata dovrebbero essere usati come chiave per l'algoritmo.

Tutte le implementazioni minimamente conformi devono supportare l'algoritmo AES-128-CTR, indicato tramite:

- `cipher: aes-128-ctr`

Questo cifrario accetta i seguenti parametri, forniti come chiavi alla chiave cipherparams:

- `iv`: vettore di inizializzazione a 128 bit per il cifrario.

La chiave per il cifrario sono i 16 byte più a sinistra della chiave derivata, ovvero `DK[0..15]`

La creazione/crittografia di una chiave segreta dovrebbe essere essenzialmente l'inverso di queste istruzioni. Assicurati che `uuid`, `salt` e `iv` siano effettivamente casuali.

Oltre al campo `version`, che dovrebbe fungere da identificatore "rigido" della versione, le implementazioni possono anche utilizzare `minorversion` per tracciare modifiche più piccole e non bloccanti al formato.

## Vettori di Test {#test-vectors}

Dettagli:

- `Indirizzo`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Segreto`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Vettore di test che utilizza `AES-128-CTR` e `PBKDF2-SHA-256`:

Contenuti del file `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Intermedi**:

`Chiave derivata`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Corpo del MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Chiave del cifrario`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vettore di test che utilizza AES-128-CTR e Scrypt:

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

**Intermedi**:

`Chiave derivata`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Corpo del MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Chiave del cifrario`: `7446f59ecc301d2d79bc3302650d8a5c`

## Modifiche dalla Versione 1 {#alterations-from-v2}

Questa versione corregge diverse incongruenze con la versione 1 pubblicata [qui](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). In breve queste sono:

- L'uso delle maiuscole è ingiustificato e incoerente (scrypt minuscolo, Kdf misto, MAC maiuscolo).
- L'indirizzo non è necessario e compromette la privacy.
- `Salt` è intrinsecamente un parametro della funzione di derivazione della chiave e merita di esservi associato, non alla crittografia in generale.
- _SaltLen_ non è necessario (basta derivarlo da Salt).
- La funzione di derivazione della chiave è fornita, eppure l'algoritmo crittografico è fissato rigidamente.
- `Version` è intrinsecamente numerico eppure è una stringa (il controllo delle versioni strutturato sarebbe possibile con una stringa, ma può essere considerato fuori ambito per un formato di file di configurazione che cambia raramente).
- `KDF` e `cipher` sono concettualmente concetti fratelli eppure sono organizzati in modo diverso.
- `MAC` è calcolato attraverso un dato indipendente dagli spazi vuoti(!)

Sono state apportate modifiche al formato per fornire il seguente file, funzionalmente equivalente all'esempio fornito nella pagina precedentemente collegata:

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

## Modifiche dalla Versione 2 {#alterations-from-v2}

La versione 2 era una prima implementazione in C++ con una serie di bug. Tutti gli elementi essenziali rimangono invariati rispetto ad essa.