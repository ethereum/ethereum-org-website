---
title: Ορισμός μυστικού αποθηκευτικού χώρου Web3
description: Επίσημος ορισμός για τον μυστικό αποθηκευτικό χώρο web3
lang: el
sidebarDepth: 2
---

Για να κάνετε την εφαρμογή σας να λειτουργεί στο Ethereum, μπορείτε να χρησιμοποιήσετε το αντικείμενο web3 που παρέχεται από τη βιβλιοθήκη web3.js. Επικοινωνεί με έναν τοπικό κόμβο μέσω κλήσεων RPC. Το [web3](https://github.com/ethereum/web3.js/) λειτουργεί με οποιονδήποτε κόμβο Ethereum που εκθέτει ένα επίπεδο RPC.

Το `web3` περιέχει το αντικείμενο `eth` - web3.eth.

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

Αυτό τεκμηριώνει το **version 3** του ορισμού μυστικού αποθηκευτικού χώρου Web3.

## Επεξήγηση {#definition}

Η πραγματική κωδικοποίηση και αποκωδικοποίηση του αρχείου παραμένει σε μεγάλο βαθμό αμετάβλητη από την έκδοση 1, εκτός από το ότι ο αλγόριθμος κρυπτογράφησης δεν είναι πλέον σταθερός στο AES-128-CBC (το AES-128-CTR είναι πλέον η ελάχιστη απαίτηση). Οι περισσότερες έννοιες/αλγόριθμοι είναι παρόμοιες με την έκδοση 1, εκτός από το `mac`, το οποίο δίνεται ως SHA3 (keccak-256) των συνδέσεων του δεύτερου πιο αριστερού 16 bytes του παραγόμενου κλειδιού μαζί με το πλήρες `ciphertext`.

Τα αρχεία μυστικού κλειδιού αποθηκεύονται απευθείας στο `~/.web3/keystore` (για συστήματα τύπου Unix) και στο `~/AppData/Web3/keystore` (για Windows). Μπορεί να ονομάζονται οτιδήποτε, αλλά μια καλή σύμβαση είναι `<uuid>.json`, όπου `<uuid>` είναι το UUID 128-bit που δίνεται στο μυστικό κλειδί (ένα διατηρητέο - ιδιωτικό του μεσολαβητή για τη διεύθυνση του μυστικού κλειδιού).

Όλα αυτά τα αρχεία έχουν σχετικό κωδικό πρόσβασης. Για να εξαγάγετε το μυστικό κλειδί ενός αρχείου `.json`, εξάγετε το κλειδί κρυπτογράφησης του. Αυτό γίνεται με τη λήψη του κωδικού πρόσβασης του αρχείου και τη διέλευση του μέσω μιας λειτουργίας παραγωγής κλειδιού όπως περιγράφεται από το κλειδί `kdf`. Οι στατικές και δυναμικές παράμετροι που εξαρτώνται από το KDF για τη λειτουργία KDF περιγράφονται στο κλειδί `kdfparams`.

Το PBKDF2 πρέπει να υποστηρίζεται από όλες τις ελάχιστα συμβατές υλοποιήσεις, με την ένδειξη όμως:

- `kdf`: `pbkdf2`

Για PBKDF2, τα kdfparams συμπεριλαμβάνουν:

- `prf`: Πρέπει να είναι `hmac-sha256` (μπορεί να επεκταθεί στο μέλλον)˙
- `c`: αριθμός επαναλήψεων;
- `salt`: salt που μεταβιβάστηκε στο PBKDF
- `dklen`: μήκος για το προέρχοντα κλειδί. Πρέπει να είναι >= 32.

Μόλις ληφθεί το κλειδί του αρχείου, θα πρέπει να επαληθευτεί μέσω της παραγωγής του MAC. Το MAC θα πρέπει να υπολογιστεί ως ο κατακερματισμός SHA3 (keccak-256) του πίνακα byte που σχηματίζεται ως συνενώσεις των 16 πιο αριστερών byte του παραγόμενου κλειδιού με τα περιεχόμενα του κλειδιού `ciphertext`, π.χ.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(όπου `++` είναι ο τελεστής συνένωσης)

Αυτή η τιμή πρέπει να συγκριθεί με τα περιεχόμενα του κλειδιού `mac`. Εάν είναι διαφορετικοί, θα πρέπει να ζητηθεί εναλλακτικός κωδικός πρόσβασης (ή να ακυρωθεί η λειτουργία).

Αφού επαληθευτεί το κλειδί του αρχείου, το κείμενο κρυπτογράφησης (το κλειδί `κρυπτογραφημένο κείμενο` στο αρχείο) μπορεί να αποκρυπτογραφηθεί χρησιμοποιώντας τον αλγόριθμο συμμετρικής κρυπτογράφησης που καθορίζεται από το κλειδί `κρυπτογράφηση` και παραμετροποιείται μέσω του κλειδιού `cipherparams`. Εάν το παραγόμενο μέγεθος κλειδιού και το μέγεθος κλειδιού του αλγορίθμου δεν ταιριάζουν, τα μηδενικά συμπληρωμένα, δεξιά byte του παραγόμενου κλειδιού θα πρέπει να χρησιμοποιηθούν ως κλειδί στον αλγόριθμο.

Όλες οι ελάχιστα συμβατές υλοποιήσεις πρέπει να υποστηρίζουν τον αλγόριθμο AES-128-CTR, ο οποίος υποδηλώνεται ως εξής:

- `cipher: aes-128-ctr`

Αυτή η κρυπτογράφηση λαμβάνει τις ακόλουθες παραμέτρους, που δίνονται ως κλειδιά στο κλειδί cipherparams:

- `iv`: Διάνυσμα αρχικοποίησης 128-bit για την κρυπτογράφηση.

Το κλειδί για τον κρυπτογράφηση είναι τα αριστερά 16 byte του παραγόμενου κλειδιού, δηλαδή `DK[0..15]`

Η δημιουργία/κρυπτογράφηση ενός μυστικού κλειδιού θα πρέπει να είναι ουσιαστικά το αντίστροφο αυτών των οδηγιών. Βεβαιωθείτε ότι τα `uuid`, `salt` και `iv` είναι πραγματικά τυχαία.

Εκτός από το πεδίο `version`, το οποίο θα πρέπει να λειτουργεί ως "συμπαγές" αναγνωριστικό της έκδοσης, οι υλοποιήσεις μπορούν επίσης να χρησιμοποιούν την `minorversion` για την παρακολούθηση μικρότερων, μη παραβιαστικών αλλαγών στη μορφή.

## Δοκιμαστικά Vectors {#test-vectors}

Λεπτομέρειες:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Δοκιμή διανύσματος με χρήση `AES-128-CTR` και `PBKDF2-SHA-256`:

Περιεχόμενο αρχείου του `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Intermediates**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Δοκιμαστικό διάνυσμα χρησιμοποιώντας AES-128-CTR και Scrypt:

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

**Intermediates**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d` `MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2` `MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c` `Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Αλλαγές από την 'Εκδοση 1 {#alterations-from-v2}

Αυτή η έκδοση διορθώνει αρκετές ασυνέπειες με την έκδοση 1 που δημοσιεύτηκε [εδώ](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Συνοπτικά αυτές είναι:

- Η χρήση κεφαλαίων είναι αδικαιολόγητη και ασυνεπής (πεζά γράμματα κρυπτογράφησης, μικτά γράμματα Kdf, κεφαλαία MAC).
- Αντιμετωπίζει τα περιττά και θέτει σε κίνδυνο το απόρρητο.
- Το `Salt` είναι εγγενώς μια παράμετρος της συνάρτησης παραγωγής κλειδιού και αξίζει να συσχετιστεί με αυτό, όχι με το crypto γενικά.
- Το _SaltLen_ είναι περιττό (απλώς αντλήστε το από το Salt).
- Η συνάρτηση εξαγωγής κλειδιού δίνεται, ωστόσο ο αλγόριθμος κρυπτογράφησης είναι δύσκολο να καθοριστεί.
- Το `Version` είναι εγγενώς αριθμητικό, αλλά είναι συμβολοσειρά (η δομημένη έκδοση θα ήταν δυνατή με μια συμβολοσειρά, αλλά μπορεί να θεωρηθεί εκτός πεδίου εφαρμογής για μια σπάνια μεταβαλλόμενη μορφή αρχείου διαμόρφωσης).
- Το `KDF` και το `cipher` είναι πλασματικά αδερφικές έννοιες αλλά οργανώνονται διαφορετικά.
- Το `MAC` υπολογίζεται μέσω ενός αγνωστικού τμήματος δεδομένων κενού διαστήματος(!)

Έχουν γίνει αλλαγές στη μορφοποίηση για να δοθεί στο ακόλουθο αρχείο, λειτουργικότητα ισοδύναμη με το παράδειγμα που δόθηκε στην προηγούμενη συνδεδεμένη σελίδα:

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

## Αλλαγές από την Έκδοση 2 {#alterations-from-v2}

Η έκδοση 2 ήταν μια πρώιμη υλοποίηση της C++ με έναν αριθμό σφαλμάτων. Όλα τα βασικά παραμένουν αμετάβλητα από αυτό.
