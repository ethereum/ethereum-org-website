---
title: Definizione di archiviazione segreta di Web3
description: Definizione formale di archiviazione segreta di Web3
lang: it
sidebarDepth: 2
---

Per far funzionare la tua app su Ethereum, puoi utilizzare l'oggetto web3 fornito dalla libreria di web3.js. Fondamentalmente, comunica a un nodo locale tramite chiamate RPC. Il [web3](https://github.com/ethereum/web3.js/) funziona con qualsiasi nodo di Ethereum che esponga un livello RPC.

Il `web3` contiene l'oggetto `eth`: web3.eth.

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

Questo documenta la **versione 3** della Definizione di Archiviazione Segreta del Web3.

## Definizione {#definition}

La codifica e decofica effettiva del file resta largamente immutata dalla versione 1, tranne nel fatto che l'algoritmo cripto non è più fisso ad AES-128-CBC (AES-128-CTR è ora il requisito minimo). Gran parte dei significati e dell'algoritmo sono simili alla versione 1, tranne `mac`, indicato come lo SHA3 (keccak-256) delle concatenazioni dei secondi 16 byte da sinistra della chiave derivata, insieme al `ciphertext` completo.

I file della chiave segreta sono memorizzati direttamente in `~/.web3/keystore` (per i sistemi come Unix) e `~/AppData/Web3/keystore` (per Windows). Potrebbero esser denominati in qualsiasi modo, ma una buona convenzione è `<uuid>.json`, dove `<uuid>` è l'UUID da 128 bit dato alla chiave segreta (un proxy che preserva l'anonimato per l'indirizzo della chiave segreta).

Tutti questi file sono associati a una password. Per derivare una certa chiave segreta del file `.json`, deriva prima la chiave di crittografia del file; ciò avviene prendendone la password e passandola per una funzione di derivazione della chiave, come descritto dalla chaive `kdf`. I parametri statici e dinamici dipendenti da KDF alla funzione KDF sono descritti nella chiave `kdfparams`.

PBKDF2 dev'essere supportato da tutte le implementazioni minimamente conformi, denotato però:

- `kdf`: `pbkdf2`

Per PBKDF2, kdfparams include:

- `prf`: deve essere `hmac-sha256` (potrebbe essere esteso in futuro);
- `c`: numero di iterazioni;
- `salt`: salt passati a PBKDF;
- `dklen`: lunghezza per la chiave derivata. Dev'essere >= 32.

Una volta derivata la chiave del file, dovrebbe essere verificata tramite la derivazione del MAC. Il MAC dovrebbe essere calcolato come l'hash SHA3 (keccak-256) dell'insieme di byte formato come le concatenazioni dei secondi 16 byte da sinistra della chiave derivata, con i contenuti della chiave `ciphertext`, cioè:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(dove `++` è l'operatore di concatenazione)

Questo valore dovrebbe essere confrontato ai contenuti della chiave `mac`; se sono differenti, una password alternativa dovrebbe essere richiesta (o l'operazione dovrebbe essere annullata).

Dopo la verifica della chiave del file, il testo di cifratura (la chiave `ciphertext` nel file) potrebbe essere decrittografato usando l'algoritmo crittografico simmetrico specificato dalla chiave `cipher` e parametrato tramite la chiave `cipherparams`. Se la dimensione della chiave derivata e la dimensione della chiave dell'algoritmo non corrispondono, lo zero è riempito, i byte a destra della chiave derivata dovrebbero essere utilizzati come la chiave per l'algoritmo.

Tutte le implementazioni minimamente conformi devono supportare l'algoritmo AES-128-CTR, denotato tramite:

- `cipher: aes-128-ctr`

Questa cifratura prende i seguenti parametri, dati come chiavi alla chiave cipherparams:

- `iv`: Vettore di inizializzazione a 128 bit per la cifratura.

La chiave per la cifra è composta dai 16 bit a sinistra della chiave derivata, ossia, `DK[0..15]`

La creazione/crittografia di una chiave segreta dovrebbe essere essenzialmente l'inverso di queste istruzioni. Assicurati che `uuid`, `salt` e `iv` siano effettivamente casuali.

Oltre al campo `version`, che dovrebbe agire da identificatore "rigido" della versione, le implementazioni potrebbero anche utilizzare `minorversion` per tracciare le modifiche più piccole e non divisibili al formato.

## Vettori di Prova {#test-vectors}

Dettagli:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Vettore di prova che utilizza `AES-128-CTR` e `PBKDF2-SHA-256`:

Contenuti del file di `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vettore di prova che utilizza AES-128-CTR e Scrypt:

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

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d` `MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2` `MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c` `Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Alterazioni dalla Versione 1 {#alterations-from-v2}

Questa versione corregge diverse incongruenze con la versione 1 pubblicata [qui](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). In breve sono:

- Capitalizzazione ingiustificata e incoerente (scrypt minuscolo, maiuscole miste in Kdf e MAC maiuscolo).
- Indirizzo non necessario e compromette l'anonimato.
- `Salt` è intrinsecamente un parametro della funzione di derivazione della chiave e deve essere associato a esso, non con le cripto in generale.
- _SaltLen_ non necessario (basta derivarlo da Salt).
- La funzione di derivazione della chiave è data, ma l'algoritmo cripto è specificato rigidamente.
- `Version` è intrinsecamente numerica, ma è comunque una stringa (il versionamento strutturato sarebbe possibile con una stringa, ma è considerabile fuori ambito per un formato di file di configurazione che cambia raramnte).
- `KDF` e `cipher` sono concetti notoriamente fratelli, seppur organizzati diversamente.
- `MAC` è calcolato tramite un pezzo di dati indipendente dalla spaziatura(!)

Le modifiche sono state apportate al formato per restituire il seguente file, funzionalmente equivalente all'esempio dato sulla pagina collegata in precedenza:

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

La versione 2 era un'implementazione iniziale in C++ con numerosi bug. Tutti gli elementi essenziali restano immutati da essa.
