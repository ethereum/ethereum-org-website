---
title: JSON-RPC API
description: Ένα πρωτόκολλο απομακρυσμένης κλήσης διαδικασιών (RPC), χωρίς κατάσταση και ελαφρύ, για πελάτες Ethereum.
lang: el
---

Για να αλληλεπιδράσει μια εφαρμογή λογισμικού με το Ethereum blockchain —είτε διαβάζοντας δεδομένα blockchain είτε στέλνοντας συναλλαγές στο δίκτυο— πρέπει να συνδεθεί σε έναν κόμβο Ethereum.

Για αυτόν τον σκοπό, κάθε [πελάτης Ethereum](/developers/docs/nodes-and-clients/#execution-clients) υλοποιεί μια [προδιαγραφή JSON-RPC](https://github.com/ethereum/execution-apis), ώστε να υπάρχει ένα ενιαίο σύνολο μεθόδων στις οποίες μπορούν να βασίζονται οι εφαρμογές, ανεξάρτητα από τον συγκεκριμένο κόμβο ή την υλοποίηση του πελάτη.

Το [JSON-RPC](https://www.jsonrpc.org/specification) είναι ένα ελαφρύ πρωτόκολλο απομακρυσμένης κλήσης διαδικασιών (RPC) χωρίς κατάσταση. Ορίζει αρκετές δομές δεδομένων και τους κανόνες που διέπουν την επεξεργασία τους. Είναι συμβατό με τη μεταφορά, καθώς οι έννοιες μπορούν να χρησιμοποιηθούν εντός της ίδιας διαδικασίας, μέσω sockets, μέσω HTTP ή σε πολλά διαφορετικά περιβάλλοντα ανταλλαγής μηνυμάτων. Χρησιμοποιεί το JSON (RFC 4627) ως μορφή δεδομένων.

## Εφαρμογές Πελάτη {#client-implementations}

Οι εφαρμογές πελάτη Ethereum ενδέχεται να χρησιμοποιούν διαφορετικές γλώσσες προγραμματισμού κατά την υλοποίηση της προδιαγραφής JSON-RPC. Δείτε την [τεκμηρίωση του κάθε πελάτη](/developers/docs/nodes-and-clients/#execution-clients) για περισσότερες λεπτομέρειες σχετικά με συγκεκριμένες γλώσσες προγραμματισμού. Συνιστούμε να ελέγξετε την τεκμηρίωση κάθε πελάτη για τις πιο πρόσφατες πληροφορίες υποστήριξης API.

## Βιβλιοθήκες Παραγωγικότητας {#convenience-libraries}

Παρόλο που μπορείτε να επιλέξετε να αλληλεπιδράσετε απευθείας με πελάτες Ethereum μέσω της API JSON-RPC, συχνά υπάρχουν ευκολότερες επιλογές για τους προγραμματιστές dapp. Υπάρχουν πολλές βιβλιοθήκες [JavaScript](/developers/docs/apis/javascript/#available-libraries) και [API back-end](/developers/docs/apis/backend/#available-libraries) που παρέχουν wrapper πάνω από την API JSON-RPC. Με αυτές τις βιβλιοθήκες, οι προγραμματιστές μπορούν να γράφουν διαισθητικές, μονογραμμικές μεθόδους στη γλώσσα προγραμματισμού της επιλογής τους για να αρχικοποιήσουν αιτήματα JSON-RPC (κάτω από την επιφάνεια) που αλληλεπιδρούν με το Ethereum.

## ΑΡΙ εφαρμογών πελάτη συναίνεσης {#consensus-clients}

Αυτή η σελίδα ασχολείται κυρίως με την API JSON-RPC που χρησιμοποιείται από τους πελάτες εκτέλεσης Ethereum. Ωστόσο, οι πελάτες συναίνεσης έχουν επίσης μια API RPC που επιτρέπει στους χρήστες να υποβάλλουν ερωτήματα για πληροφορίες σχετικά με τον κόμβο, να ζητούν μπλοκ Beacon, κατάσταση Beacon και άλλες πληροφορίες σχετικές με τη συναίνεση απευθείας από έναν κόμβο. Αυτή η API είναι τεκμηριωμένη στην [ιστοσελίδα Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Μια εσωτερική API χρησιμοποιείται επίσης για επικοινωνία μεταξύ πελατών εντός ενός κόμβου, δηλαδή επιτρέπει στον πελάτη συναίνεσης και τον πελάτη εκτέλεσης να ανταλλάσσουν δεδομένα. Ονομάζεται «Engine API» και οι προδιαγραφές είναι διαθέσιμες στο [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Προδιαγραφές εφαρμογής πελάτη συναίνεσης {#spec}

[Διαβάστε την πλήρη προδιαγραφή API JSON-RPC στο GitHub](https://github.com/ethereum/execution-apis). Αυτή η API είναι τεκμηριωμένη στην [ιστοσελίδα API Εκτέλεσης](https://ethereum.github.io/execution-apis/api-documentation/) και περιλαμβάνει έναν επιθεωρητή για να δοκιμάσετε όλες τις διαθέσιμες μεθόδους.

## Συμβάσεις {#conventions}

### Κωδικοποίηση τιμής hex {#hex-encoding}

Δύο βασικοί τύποι δεδομένων μεταδίδονται μέσω JSON: μη μορφοποιημένοι πίνακες byte και ποσότητες. Και οι δύο περνούν με μια κωδικοποίηση hex αλλά με διαφορετικές απαιτήσεις μορφοποίησης.

#### Ποσότητες {#quantities-encoding}

Κατά την κωδικοποίηση ποσοτήτων (ακέραιοι, αριθμοί): κωδικοποιήστε ως hex, πρόθεμα με "0x", η πιο συμπαγής αναπαράσταση (μικρή εξαίρεση: το μηδέν πρέπει να αναπαριστάται ως "0x0").

Mερικά παραδείγματα:

- 0x41 (65 σε δεκαδικό)
- 0x400 (1024 σε δεκαδικό)
- ΛΑΘΟΣ: 0x (πρέπει πάντα να έχει τουλάχιστον ένα ψηφίο — το μηδέν είναι "0x0")
- ΛΑΘΟΣ: 0x0400 (δεν επιτρέπονται μηδενικά στην αρχή)
- ΛΑΘΟΣ: ff (πρέπει να προστεθεί το πρόθεμα 0x)

### Μη μορφοποιημένα δεδομένα {#unformatted-data-encoding}

Κατά την κωδικοποίηση μη μορφοποιημένων δεδομένων (πίνακες byte, διευθύνσεις λογαριασμών, κατακερματισμοί, πίνακες bytecode): κωδικοποιήστε ως hex, πρόθεμα με "0x", δύο ψηφία hex ανά byte.

Mερικά παραδείγματα:

- 0x41 (μέγεθος 1, "A")
- 0x004200 (μέγεθος 3, "0B0")
- 0x (μέγεθος 0, "")
- ΛΑΘΟΣ: 0xf0f0f (πρέπει να είναι ζυγός αριθμός ψηφίων)
- ΛΑΘΟΣ: 004200 (πρέπει να προστεθεί το πρόθεμα 0x)

### Η προεπιλεγμένη παράμετρος μπλοκ {#default-block}

Οι ακόλουθες μέθοδοι έχουν μια επιπλέον προεπιλεγμένη παράμετρο μπλοκ:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Όταν γίνονται αιτήματα που λειτουργούν στην κατάσταση του Ethereum, η τελευταία προεπιλεγμένη παράμετρος μπλοκ καθορίζει το ύψος του μπλοκ.

Οι ακόλουθες επιλογές είναι δυνατές για την παράμετρο defaultBlock:

- `HEX String` — έναν ακέραιο αριθμό μπλοκ
- `String "earliest"` για το αρχικό/πρώτο μπλοκ
- `String "latest"` — για το τελευταίο προτεινόμενο μπλοκ
- `String "safe"` — για το τελευταίο ασφαλές μπλοκ κεφαλής
- `String "finalized"` — για το τελευταίο οριστικοποιημένο μπλοκ
- `String "pending"` — για εκκρεμή κατάσταση/συναλλαγές

## Παραδείγματα

Σε αυτή τη σελίδα παρέχουμε παραδείγματα για το πώς να χρησιμοποιήσετε μεμονωμένα τελικά σημεία API JSON_RPC χρησιμοποιώντας το εργαλείο γραμμής εντολών, [curl](https://curl.se). Αυτά τα μεμονωμένα παραδείγματα τελικών σημείων παρουσιάζονται παρακάτω στην ενότητα [Παραδείγματα curl](#curl-examples). Ακόμα πιο κάτω στη σελίδα, παρέχουμε επίσης ένα [παράδειγμα από άκρο σε άκρο](#usage-example) για τη μεταγλώττιση και την ανάπτυξη ενός έξυπνου συμβολαίου χρησιμοποιώντας έναν κόμβο Geth, την API JSON_RPC και το curl.

## Παραδείγματα Curl {#curl-examples}

Παραδείγματα χρήσης της API JSON_RPC κάνοντας αιτήσεις [curl](https://curl.se) σε έναν κόμβο Ethereum παρέχονται παρακάτω. Κάθε παράδειγμα περιλαμβάνει μια περιγραφή του συγκεκριμένου τελικού σημείου, των παραμέτρων του, του τύπου επιστροφής και ενός επεξεργασμένου παραδείγματος για το πώς πρέπει να χρησιμοποιηθεί.

Οι αιτήσεις curl ενδέχεται να επιστρέψουν ένα μήνυμα σφάλματος σχετικά με τον τύπο περιεχομένου. Αυτό συμβαίνει επειδή η επιλογή `--data` ορίζει τον τύπο περιεχομένου σε `application/x-www-form-urlencoded`. Εάν ο κόμβος σας παραπονιέται για αυτό, ορίστε χειροκίνητα την κεφαλίδα τοποθετώντας `-H "Content-Type: application/json"` στην αρχή της κλήσης. Τα παραδείγματα δεν περιλαμβάνουν επίσης τον συνδυασμό διεύθυνσης URL/IP & θύρας που πρέπει να είναι το τελευταίο όρισμα που δίνεται στο curl (π.χ. `127.0.0.1:8545`). Μια πλήρης αίτηση curl που περιλαμβάνει αυτά τα πρόσθετα δεδομένα έχει την ακόλουθη μορφή:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Ενημέρωση, κατάσταση, ιστορικό {#gossip-state-history}

Μια σειρά από βασικές μεθόδους JSON_RPC απαιτούν δεδομένα από το δίκτυο Ethereum και χωρίζονται με σαφήνεια σε τρεις κύριες κατηγορίες: _Ενημέρωση (Gossip), Κατάσταση (State) και Ιστορικό (History)_. Χρησιμοποιήστε τους συνδέσμους σε αυτές τις ενότητες για να μεταβείτε σε κάθε μέθοδο ή χρησιμοποιήστε τον πίνακα περιεχομένων για να εξερευνήσετε ολόκληρη τη λίστα μεθόδων.

### Μέθοδοι ενημέρωσης {#gossip-methods}

> Αυτές οι μέθοδοι παρακολουθούν την κεφαλή της αλυσίδας. Παρακολουθούν, δηλαδή, τον τρόπο με τον οποίο οι συναλλαγές βρίσκουν τον δρόμο τους μέσα στο δίκτυο, βρίσκουν τον δρόμο τους για να ενσωματωθούν σε μπλοκ και πώς οι πελάτες μαθαίνουν για νέα μπλοκ.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Μέθοδοι κατάστασης {#state_methods}

> Μέθοδοι που αναφέρουν την τρέχουσα κατάσταση όλων των αποθηκευμένων δεδομένων. Η «κατάσταση» είναι σαν ένα μεγάλο κοινό κομμάτι RAM και περιλαμβάνει υπολοίπα λογαριασμών, δεδομένα έξυπνων συμβολαίων και εκτιμήσεις κρατήσεων (gas).

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Ιστορικό μεθόδων {#history_methods}

> Ανακτά τα ιστορικά αρχεία κάθε μπλοκ από τη γένεση και έπειτα. Είναι σαν ένα μεγάλο αρχείο μόνο προσθήκης και περιλαμβάνει όλες τις κεφαλίδες μπλοκ, τα σώματα μπλοκ, τα συγγενικά μπλοκ και τις αποδείξεις συναλλαγών.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API Playground

Μπορείτε να χρησιμοποιήσετε το [εργαλείο playground](https://ethereum-json-rpc.com) για να ανακαλύψετε και να δοκιμάσετε τις μεθόδους της API. Επίσης, σας δείχνει ποιες μέθοδοι και δίκτυα υποστηρίζονται από διάφορους παρόχους κόμβων.

## Μέθοδοι JSON-RPC API {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Επιστρέφει την τρέχουσα έκδοση του πελάτη.

**Παράμετροι**

Κανένα

**Returns**

`String` — Η τρέχουσα έκδοση του πελάτη

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Επιστρέφει Keccak-256 (_όχι_ το τυποποιημένο SHA3-256) των δεδομένων που δόθηκαν.

**Παράμετροι**

1. `DATA` — Τα δεδομένα που θα μετατραπούν σε SHA3 hash

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Returns**

`DATA` — Το αποτέλεσμα SHA3 της συμβολοσειράς που δόθηκε.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Επιστρέφει το τρέχον id δικτύου.

**Παράμετροι**

Κανένα

**Returns**

`String` — Το τρέχον id δικτύου.

Η πλήρης λίστα τρεχόντων ID δικτύου είναι διαθέσιμη στο [chainlist.org](https://chainlist.org). Δείτε περισσότερα στο:

- `1`: Κεντρικό δίκτυο Ethereum
- `5`: Δίκτυο δοκιμών Goerli
- `11155111`: Δίκτυο δοκιμών Sepolia

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Επιστρέφει `true` εάν ο πελάτης ακούει ενεργά για συνδέσεις δικτύου.

**Παράμετροι**

Κανένα

**Returns**

`Boolean` — `true` κατά την ακρόαση, διαφορετικά `false`.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Επιστρέφει τον αριθμό των ομότιμων που είναι συνδεδεμένοι αυτή τη στιγμή στον πελάτη.

**Παράμετροι**

Κανένα

**Returns**

`QUANTITY` — ακέραιος αριθμός των συνδεδεμένων ομότιμων.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Επιστρέφει την τρέχουσα έκδοση πρωτοκόλλου Ethereum. Σημειώνεται ότι αυτή η μέθοδος [δεν είναι διαθέσιμη στο Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Παράμετροι**

Κανένα

**Returns**

`String` — Η τρέχουσα έκδοση πρωτοκόλλου Ethereum

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Επιστρέφει ένα αντικείμενο με δεδομένα σχετικά με την κατάσταση συγχρονισμού ή `false`.

**Παράμετροι**

Κανένα

**Returns**

Τα ακριβή δεδομένα επιστροφής ποικίλλουν μεταξύ των υλοποιήσεων πελατών. Όλοι οι πελάτες επιστρέφουν `False` όταν ο κόμβος δεν συγχρονίζεται και όλοι οι πελάτες επιστρέφουν τα ακόλουθα πεδία.

`Object|Boolean`, Ένα αντικείμενο με δεδομένα κατάστασης συγχρονισμού ή `FALSE`, όταν δεν συγχρονίζεται:

- `startingBlock`: `QUANTITY` — Το μπλοκ στο οποίο ξεκίνησε η εισαγωγή (θα επαναρυθμιστεί μόνο, αφού ο συγχρονισμός φτάσει στην κεφαλή του)
- `currentBlock`: `QUANTITY` — Το τρέχον μπλοκ, ίδιο με το eth_blockNumber
- `highestBlock`: `QUANTITY` — Το εκτιμώμενο υψηλότερο μπλοκ

Ωστόσο, οι μεμονωμένοι πελάτες μπορούν επίσης να παρέχουν πρόσθετα δεδομένα. Για παράδειγμα, το Geth επιστρέφει τα εξής:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Ενώ το Besu επιστρέφει:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Ανατρέξτε στην τεκμηρίωση του συγκεκριμένου πελάτη σας για περισσότερες λεπτομέρειες.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Επιστρέφει τη διεύθυνση coinbase πελάτη.

> **Σημείωση:** Αυτή η μέθοδος έχει καταργηθεί από την έκδοση **v1.14.0** και δεν υποστηρίζεται πλέον. Η απόπειρα χρήσης αυτής της μεθόδου θα έχει ως αποτέλεσμα το σφάλμα «Η μέθοδος δεν υποστηρίζεται».

**Παράμετροι**

Κανένα

**Returns**

`DATA`, 20 byte — η τρέχουσα διεύθυνση coinbase.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Επιστρέφει το ID αλυσίδας που χρησιμοποιείται για την υπογραφή συναλλαγών που προστατεύονται από επανάληψη.

**Παράμετροι**

Κανένα

**Returns**

`chainId`, δεκαεξαδική τιμή ως συμβολοσειρά που αντιπροσωπεύει τον ακέραιο αριθμό του τρέχοντος ID αλυσίδας.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Επιστρέφει `true` εάν ο πελάτης εξορύσσει ενεργά νέα μπλοκ. Αυτό μπορεί να επιστρέψει `true` μόνο για δίκτυα απόδειξης εργασίας και ενδέχεται να μην είναι διαθέσιμο σε ορισμένους πελάτες από τη [Συγχώνευση](/roadmap/merge/).

**Παράμετροι**

Κανένα

**Returns**

`Boolean` — επιστρέφει `true` ότι ο πελάτης κάνει εξόρυξη, διαφορετικά `false`.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Επιστρέφει τον αριθμό των κατακερματισμών ανά δευτερόλεπτο με τους οποίους εξορύσσει ο κόμβος. Αυτό μπορεί να επιστρέψει `true` μόνο για δίκτυα απόδειξης εργασίας και ενδέχεται να μην είναι διαθέσιμο σε ορισμένους πελάτες από τη [Συγχώνευση](/roadmap/merge/).

**Παράμετροι**

Κανένα

**Returns**

`QUANTITY` — αριθμός κατακερματισμών ανά δευτερόλεπτο.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Εμφανίζει μια εκτίμηση της τρέχουσας τιμής ανά τέλος καυσίμου σε wei. Για παράδειγμα, ο πελάτης Besu εξετάζει τα τελευταία 100 μπλοκ και επιστρέφει τη διάμεση τιμή μονάδας καυσίμου από προεπιλογή.

**Παράμετροι**

Κανένα

**Returns**

`QUANTITY` — ακέραιος αριθμός της τρέχουσας τιμής τέλους καυσίμου σε wei.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Επιστρέφει μια λίστα διευθύνσεων που ανήκουν στον πελάτη.

**Παράμετροι**

Κανένα

**Returns**

`Array of DATA`, 20 Byte — διευθύνσεις που ανήκουν στον πελάτη.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Επιστρέφει τον αριθμό του πιο πρόσφατου μπλοκ.

**Παράμετροι**

Κανένα

**Returns**

`QUANTITY` — ακέραιος αριθμός του τρέχοντος αριθμού μπλοκ στον οποίο βρίσκεται ο πελάτης.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Επιστρέφει το υπόλοιπο του λογαριασμού της δεδομένης διεύθυνσης.

**Παράμετροι**

1. `DATA`, 20 Byte — διεύθυνση για έλεγχο υπολοίπου.
2. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"latest"`, `"earliest"`, `"pending"`, `"safe"` ή `"finalized"`, δείτε την [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Returns**

`QUANTITY` — ακέραιος αριθμός του τρέχοντος υπολοίπου σε wei.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Επιστρέφει την τιμή από μια θέση αποθήκευσης σε μια δεδομένη διεύθυνση.

**Παράμετροι**

1. `DATA`, 20 Bytes — διεύθυνση της αποθήκευσης.
2. `QUANTITY` — ακέραιος της θέσης στην αποθήκευση.
3. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, δείτε την [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block)

**Returns**

`DATA` — η τιμή σε αυτή τη θέση αποθήκευσης.

**Παράδειγμα** Ο υπολογισμός της σωστής θέσης εξαρτάται από την αποθήκευση που πρέπει να ανακτηθεί. Εξετάστε το ακόλουθο έξυπνο συμβόλαιο που αναπτύχθηκε στη διεύθυνση `0x295a70b2de5e3953354a6a8344e616ed314d7251` από τη διεύθυνση `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Η ανάκτηση της τιμής του pos0 είναι απλή:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Η ανάκτηση ενός στοιχείου του χάρτη είναι πιο δύσκολη. Η θέση ενός στοιχείου στον χάρτη υπολογίζεται με:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Αυτό σημαίνει ότι για να ανακτήσουμε την αποθήκευση στο pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] πρέπει να υπολογίσουμε τη θέση με:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Η κονσόλα geth που συνοδεύει τη βιβλιοθήκη web3 μπορεί να χρησιμοποιηθεί για να κάνετε τον υπολογισμό:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Τώρα για να ανακτήσουμε την αποθήκευση:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Επιστρέφει τον αριθμό των συναλλαγών που _αποστέλλονται_ από μια διεύθυνση.

**Παράμετροι**

1. `DATA`, 20 Bytes — διεύθυνση.
2. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"latest"`, `"earliest"`, `"pending"`, `"safe"` ή `"finalized"`, δείτε την [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Returns**

`QUANTITY` — ακέραιος αριθμός των συναλλαγών που αποστέλλονται από αυτή τη διεύθυνση.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Επιστρέφει τον αριθμό των συναλλαγών σε ένα μπλοκ από ένα μπλοκ που ταιριάζει με το δεδομένο hash μπλοκ.

**Παράμετροι**

1. `ΔΕΔΟΜΕΝΑ`, 32 Bytes -— hash ενός μπλοκ

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Returns**

`QUANTITY` — ακέραιος αριθμός συναλλαγών σε αυτό το μπλοκ.

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Αποτέλεσμα
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Επιστρέφει τον αριθμό των συναλλαγών σε ένα μπλοκ που αντιστοιχεί στον συγκεκριμένο αριθμό μπλοκ.

**Παράμετροι**

1. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"earliest"`, `"latest"`, `"pending"`, `"safe"` ή `"finalized"`, όπως στην [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Returns**

`QUANTITY` — ακέραιος αριθμός συναλλαγών σε αυτό το μπλοκ.

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Αποτέλεσμα
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Επιστρέφει τον αριθμό των συγγενών σε ένα μπλοκ από ένα μπλοκ που ταιριάζει με τον δεδομένο κατακερματισμό μπλοκ.

**Παράμετροι**

1. `ΔΕΔΟΜΕΝΑ`, 32 Bytes -— hash ενός μπλοκ

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Returns**

`QUANTITY` — ακέραιος αριθμός των θείων σε αυτό το μπλοκ.

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Αποτέλεσμα
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Επιστρέφει τον αριθμό των θείων σε ένα μπλοκ από ένα μπλοκ που ταιριάζει με τον δεδομένο αριθμό μπλοκ.

**Παράμετροι**

1. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"latest"`, `"earliest"`, `"pending"`, `"safe"` ή `"finalized"`, δείτε την [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**Returns**

`QUANTITY` — ακέραιος αριθμός των θείων σε αυτό το μπλοκ.

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Αποτέλεσμα
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Επιστρέφει τον κωδικό σε μια δεδομένη διεύθυνση.

**Παράμετροι**

1. `DATA`, 20 Byte — διεύθυνση
2. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"latest"`, `"earliest"`, `"pending"`, `"safe"` ή `"finalized"`, δείτε την [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Returns**

`DATA` — ο κωδικός από τη δεδομένη διεύθυνση.

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Αποτέλεσμα
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Η μέθοδος υπογραφής υπολογίζει μια ειδική υπογραφή Ethereum με: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Η προσθήκη ενός προθέματος στο μήνυμα καθιστά την υπολογισμένη υπογραφή αναγνωρίσιμη ως μια ειδική υπογραφή Ethereum. Αυτό αποτρέπει την κακή χρήση όπου μια κακόβουλη εφαρμογή μπορεί να υπογράψει αυθαίρετα δεδομένα (π.χ. συναλλαγή) και να χρησιμοποιήσει την υπογραφή για να υποδυθεί το θύμα.

Σημείωση: η διεύθυνση με την οποία τοποθετείται η υπογραφή πρέπει να είναι ξεκλειδωμένη.

**Παράμετροι**

1. `DATA`, 20 Byte — διεύθυνση
2. `DATA`, N Bytes — μήνυμα για υπογραφή

**Returns**

`DATA`: Υπογραφή

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Υπογράφει μια συναλλαγή που μπορεί να υποβληθεί στο δίκτυο σε μεταγενέστερο χρόνο χρησιμοποιώντας το [eth_sendRawTransaction](#eth_sendrawtransaction).

**Παράμετροι**

1. `Object` — Το αντικείμενο συναλλαγής

- `type`:
- `from`: `DATA`, 20 Bytes — Η διεύθυνση από την οποία αποστέλλεται η συναλλαγή.
- `to`: `DATA`, 20 Bytes — (προαιρετικό κατά τη δημιουργία νέου έξυπνου συμβολαίου) Η διεύθυνση στην οποία αποστέλλεται η συναλλαγή.
- `gas`: `QUANTITY` — (προαιρετικό, προεπιλογή: 90000) Ακέραιος του τέλους καυσίμου που παρέχεται για την εκτέλεση της συναλλαγής. Θα επιστρέψει αχρησιμοποίητο gas.
- `gasPrice`: `QUANTITY` — (προαιρετικό, προεπιλογή: To-Be-Determined) Ακέραιος της τιμής gasPrice που χρησιμοποιείται για κάθε πληρωμένο τέλος καυσίμου, σε Wei.
- `value`: `QUANTITY` — (προαιρετικό) Ακέραιος της αξίας που αποστέλλεται με αυτή τη συναλλαγή, σε Wei.
- `data`: `DATA` — Ο μεταγλωττισμένος κώδικας ενός έξυπνου συμβολαίου Ή ο hash της υπογραφής της επικαλούμενης μεθόδου και των κωδικοποιημένων παραμέτρων.
- `nonce`: `QUANTITY` — (προαιρετικό) Ακέραιος ενός nonce. Αυτό επιτρέπει την αντικατάσταση των δικών σας εκκρεμών συναλλαγών που χρησιμοποιούν το ίδιο nonce.

**Returns**

`DATA`, Το αντικείμενο συναλλαγής κωδικοποιημένο βάσει RLP που υπογράφεται από τον καθορισμένο λογαριασμό.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Δημιουργεί μια νέα συναλλαγή κλήσης μηνύματος ή μια δημιουργία έξυπνου συμβολαίου, εάν το πεδίο δεδομένων περιέχει κώδικα, και το υπογράφει χρησιμοποιώντας τον λογαριασμό που καθορίζεται στο `from`.

**Παράμετροι**

1. `Object` — Το αντικείμενο συναλλαγής

- `from`: `DATA`, 20 Bytes — Η διεύθυνση από την οποία αποστέλλεται η συναλλαγή.
- `to`: `DATA`, 20 Bytes — (προαιρετικό κατά τη δημιουργία νέου έξυπνου συμβολαίου) Η διεύθυνση στην οποία αποστέλλεται η συναλλαγή.
- `gas`: `QUANTITY` — (προαιρετικό, προεπιλογή: 90000) Ακέραιος του τέλους καυσίμου που παρέχεται για την εκτέλεση της συναλλαγής. Θα επιστρέψει αχρησιμοποίητο gas.
- `gasPrice`: `QUANTITY` — (προαιρετικό, προεπιλογή: To-Be-Determined) Ακέραιος της τιμής gasPrice που χρησιμοποιείται για κάθε πληρωμένο τέλος καυσίμου.
- `value`: `QUANTITY` — (προαιρετικό) Ακέραιος της αξίας που αποστέλλεται με αυτή τη συναλλαγή.
- `input`: `DATA` — Ο μεταγλωττισμένος κώδικας ενός έξυπνου συμβολαίου Ή ο hash της υπογραφής της επικαλούμενης μεθόδου και των κωδικοποιημένων παραμέτρων.
- `nonce`: `QUANTITY` — (προαιρετικό) Ακέραιος ενός nonce. Αυτό επιτρέπει την αντικατάσταση των δικών σας εκκρεμών συναλλαγών που χρησιμοποιούν το ίδιο nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Returns**

`DATA`, 32 Byte — ο κατακερματισμός της συναλλαγής ή ο μηδενικός κατακερματισμός εάν η συναλλαγή δεν είναι ακόμη διαθέσιμη.

Χρησιμοποιήστε το [eth_getTransactionReceipt](#eth_gettransactionreceipt) για να λάβετε τη διεύθυνση του έξυπνου συμβολαίου, μετά την πρόταση της συναλλαγής σε ένα μπλοκ, όταν δημιουργήσατε ένα έξυπνο συμβόλαιο.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Δημιουργεί νέα συναλλαγή κλήσης μηνύματος ή δημιουργία έξυπνου συμβολαίου για υπογεγραμμένες συναλλαγές.

**Παράμετροι**

1. `DATA`, Τα υπογεγραμμένα δεδομένα συναλλαγής.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Returns**

`DATA`, 32 Byte — ο κατακερματισμός της συναλλαγής ή ο μηδενικός κατακερματισμός εάν η συναλλαγή δεν είναι ακόμη διαθέσιμη.

Χρησιμοποιήστε το [eth_getTransactionReceipt](#eth_gettransactionreceipt) για να λάβετε τη διεύθυνση του έξυπνου συμβολαίου, μετά την πρόταση της συναλλαγής σε ένα μπλοκ, όταν δημιουργήσατε ένα έξυπνο συμβόλαιο.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Εκτελεί μια νέα κλήση μηνύματος αμέσως χωρίς να δημιουργεί μια συναλλαγή στην κρυπτοαλυσίδα. Χρησιμοποιείται συχνά για την εκτέλεση συναρτήσεων έξυπνου συμβολαίου μόνο για ανάγνωση, για παράδειγμα το `balanceOf` για ένα συμβόλαιο ERC-20.

**Παράμετροι**

1. `Object` — Το αντικείμενο κλήσης συναλλαγής

- `from`: `DATA`, 20 Bytes — (προαιρετικό) Η διεύθυνση από την οποία αποστέλλεται η συναλλαγή.
- `to`: `DATA`, 20 Bytes — Η διεύθυνση στην οποία απευθύνεται η συναλλαγή.
- `gas`: `QUANTITY` — (προαιρετικό) Ακέραιος του τέλους καυσίμου που παρέχεται για την εκτέλεση της συναλλαγής. Το eth_call καταναλώνει μηδενικό καύσιμο, αλλά αυτή η παράμετρος μπορεί να είναι απαραίτητη για ορισμένες εκτελέσεις.
- `gasPrice`: `QUANTITY` — (προαιρετικό) Ακέραιος της τιμής gasPrice που χρησιμοποιείται για κάθε πληρωμένο τέλος καυσίμου
- `value`: `QUANTITY` — (προαιρετικό) Ακέραιος της αξίας που αποστέλλεται με αυτή τη συναλλαγή
- `input`: `DATA` — (προαιρετικό) Hash της υπογραφής μεθόδου και κωδικοποιημένων παραμέτρων. Για λεπτομέρειες, δείτε [Ethereum Contract ABI στην τεκμηρίωση Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"latest"`, `"earliest"`, `"pending"`, `"safe"` ή `"finalized"`, δείτε την [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block)

**Returns**

`DATA` — η επιστρεφόμενη τιμή του εκτελεσθέντος συμβολαίου.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Δημιουργεί και επιστρέφει μια εκτίμηση της ποσότητας καυσίμου που είναι απαραίτητη για να ολοκληρωθεί η συναλλαγή. Η συναλλαγή δεν θα προστεθεί στην κρυπτοαλυσίδα. Σημειώνεται ότι η εκτίμηση μπορεί να είναι σημαντικά μεγαλύτερη από την ποσότητα καυσίμου που χρησιμοποιείται πραγματικά από τη συναλλαγή, για διάφορους λόγους, συμπεριλαμβανομένης της μηχανικής EVM και της απόδοσης του κόμβου.

**Παράμετροι**

Δείτε τις παραμέτρους [eth_call](#eth_call), εκτός από το ότι όλες οι ιδιότητες είναι προαιρετικές. Εάν δεν καθοριστεί κανένα όριο καυσίμου, το geth χρησιμοποιεί το όριο καυσίμου μπλοκ από το εκκρεμές μπλοκ ως ανώτατο όριο. Ως αποτέλεσμα, η επιστρεφόμενη εκτίμηση μπορεί να μην είναι αρκετή για την εκτέλεση της κλήσης/συναλλαγής όταν η ποσότητα καυσίμου είναι υψηλότερη από το όριο καυσίμου του εκκρεμούς μπλοκ.

**Returns**

`QUANTITY` — η ποσότητα του καυσίμου που χρησιμοποιήθηκε.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Επιστρέφει πληροφορίες σχετικά με ένα μπλοκ από το hash.

**Παράμετροι**

1. `DATA`, 32 Bytes — Hash ενός μπλοκ.
2. `Boolean` — Εάν είναι `true`, επιστρέφει τα πλήρη αντικείμενα συναλλαγών, εάν είναι `false` μόνο τα hash των συναλλαγών.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Returns**

`Object` — Ένα αντικείμενο μπλοκ ή `null` όταν δεν βρέθηκε κανένα μπλοκ:

- `number`: `QUANTITY` — ο αριθμός του μπλοκ. `null` όταν εκκρεμεί μπλοκ.
- `hash`: `DATA`, 32 Bytes — hash του μπλοκ. `null` όταν εκκρεμεί μπλοκ.
- `parentHash`: `DATA`, 32 Bytes — hash του γονικού μπλοκ.
- `nonce`: `DATA`, 8 Bytes — hash της δημιουργημένης απόδειξης εργασίας. `null` όταν εκκρεμεί μπλοκ.
- `sha3Uncles`: `DATA`, 32 Bytes — SHA3 των δεδομένων των θείων στο μπλοκ.
- `logsBloom`: `DATA`, 256 Bytes — το φίλτρο bloom για τα log του μπλοκ. `null` όταν εκκρεμεί μπλοκ.
- `transactionsRoot`: `DATA`, 32 Bytes — η ρίζα του trie συναλλαγών του μπλοκ.
- `stateRoot`: `DATA`, 32 Bytes — η ρίζα του τελικού trie κατάστασης του μπλοκ.
- `receiptsRoot`: `DATA`, 32 Bytes — η ρίζα του trie αποδείξεων του μπλοκ.
- `miner`: `DATA`, 20 Bytes — η διεύθυνση του δικαιούχου στον οποίο δόθηκαν οι ανταμοιβές κρυπτόρυξης.
- `difficulty`: `QUANTITY` — ακέραιος της δυσκολίας για αυτό το μπλοκ.
- `totalDifficulty`: `QUANTITY` — ακέραιος της συνολικής δυσκολίας της αλυσίδας μέχρι αυτό το μπλοκ.
- `extraData`: `DATA` — το πεδίο «extra data» αυτού του μπλοκ.
- `size`: `QUANTITY` — ακέραιος το μέγεθος αυτού του μπλοκ σε bytes.
- `gasLimit`: `QUANTITY` — η μέγιστη επιτρεπόμενη αμοιβή gas σε αυτό το μπλοκ.
- `gasUsed`: `QUANTITY` — το συνολικό χρησιμοποιημένο καύσιμο από όλες τις συναλλαγές σε αυτό το μπλοκ.
- `timestamp`: `QUANTITY` — η χρονική σήμανση unix για το πότε συνενώθηκε το μπλοκ.
- `transactions`: `Array` — Πίνακας αντικειμένων συναλλαγών ή hash συναλλαγών 32 Bytes ανάλογα με την τελευταία δεδομένη παράμετρο.
- `uncles`: `Array` — Πίνακας hash θείων.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
{
"jsonrpc": "2.0",
"id": 1,
"result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
}
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Επιστρέφει πληροφορίες σχετικά με ένα μπλοκ από τον αριθμό μπλοκ.

**Παράμετροι**

1. `QUANTITY|TAG` — ακέραιος αριθμός μπλοκ ή η συμβολοσειρά `"earliest"`, `"latest"`, `"pending"`, `"safe"` ή `"finalized"`, όπως στην [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block).
2. `Boolean` — Εάν είναι `true`, επιστρέφει τα πλήρη αντικείμενα συναλλαγών, εάν είναι `false` μόνο τα hash των συναλλαγών.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Επιστρέφει** Δείτε [eth_getBlockByHash](#eth_getblockbyhash)

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Αποτέλεσμα δείτε [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Επιστρέφει τις πληροφορίες σχετικά με μια συναλλαγή που ζητήθηκε από το hash συναλλαγής.

**Παράμετροι**

1. `DATA`, 32 Bytes — hash μιας συναλλαγής

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Returns**

`Object` — Ένα αντικείμενο συναλλαγής ή `null` όταν δεν βρέθηκε καμία συναλλαγή:

- `blockHash`: `DATA`, 32 Bytes — hash του μπλοκ όπου ήταν αυτή η συναλλαγή. `null` όταν εκκρεμεί.
- `blockNumber`: `QUANTITY` — αριθμός μπλοκ όπου βρισκόταν αυτή η συναλλαγή. `null` όταν εκκρεμεί.
- `from`: `DATA`, 20 Bytes — διεύθυνση του αποστολέα.
- `gas`: `QUANTITY` — αμοιβή που παρέχεται από τον αποστολέα.
- `gasPrice`: `QUANTITY` — τιμή καυσίμου που παρέχεται από τον αποστολέα σε Wei.
- `hash`: `DATA`, 32 Bytes — hash της συναλλαγής.
- `input`: `DATA` — τα δεδομένα που αποστέλλονται μαζί με τη συναλλαγή.
- `nonce`: `QUANTITY` — ο αριθμός των συναλλαγών που έγιναν από τον αποστολέα πριν από αυτήν.
- `to`: `DATA`, 20 Bytes — διεύθυνση του παραλήπτη. `null` όταν πρόκειται για συναλλαγή δημιουργίας έξυπνου συμβολαίου.
- `transactionIndex`: `QUANTITY` — ακέραιος της θέσης ευρετηρίου συναλλαγών στο μπλοκ. `null` όταν εκκρεμεί.
- `value`: `QUANTITY` — μεταφερόμενη αξία σε Wei.
- `v`: `QUANTITY` — id ανάκτησης ECDSA
- `r`: `QUANTITY` — υπογραφή r ECDSA
- `s`: `QUANTITY` — υπογραφή s ECDSA

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Επιστρέφει πληροφορίες σχετικά με μια συναλλαγή ανά κατακερματισμό μπλοκ και θέση δείκτη συναλλαγών.

**Παράμετροι**

1. `DATA`, 32 Byte — κατακερματισμός ενός μπλοκ.
2. `QUANTITY` — ακέραιος αριθμός της θέσης ευρετηρίου συναλλαγών.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Αποτελέσματα** Δείτε [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Ανατρέξτε στο αποτέλεσμα [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Επιστρέφει πληροφορίες σχετικά με μια συναλλαγή κατά αριθμό μπλοκ και θέση δείκτη συναλλαγής.

**Παράμετροι**

1. `QUANTITY|TAG` — αριθμός μπλοκ ή η συμβολοσειρά `"earliest"`, `"latest"`, `"pending"`, `"safe"` ή `"finalized"`, όπως στην [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` — η θέση δείκτη συναλλαγών.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Αποτελέσματα** Δείτε [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Ανατρέξτε στο αποτέλεσμα [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Επιστρέφει την απόδειξη μιας συναλλαγής με κατακερματισμό συναλλαγής.

**Σημειώνεται** ότι η απόδειξη δεν είναι διαθέσιμη για εκκρεμείς συναλλαγές.

**Παράμετροι**

1. `DATA`, 32 Bytes — hash μιας συναλλαγής

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Επιστρέφει** `Object` — Ένα αντικείμενο απόδειξης συναλλαγής ή `null` όταν δεν βρέθηκε απόδειξη:

- `transactionHash`: `DATA`, 32 Bytes — hash της συναλλαγής.
- `transactionIndex`: `QUANTITY` — ακέραιος της θέσης ευρετηρίου συναλλαγών στο μπλοκ.
- `blockHash`: `DATA`, 32 Bytes — hash του μπλοκ όπου ήταν αυτή η συναλλαγή.
- `blockNumber`: `QUANTITY` — αριθμός μπλοκ όπου βρισκόταν αυτή η συναλλαγή.
- `from`: `DATA`, 20 Bytes — διεύθυνση του αποστολέα.
- `to`: `DATA`, 20 Bytes — διεύθυνση του παραλήπτη. null όταν πρόκειται για συναλλαγή δημιουργίας έξυπνου συμβολαίου.
- `cumulativeGasUsed` : `QUANTITY` — Η συνολική ποσότητα καυσίμου που χρησιμοποιήθηκε όταν εκτελέστηκε αυτή η συναλλαγή στο μπλοκ.
- `effectiveGasPrice` : `QUANTITY` - Το άθροισμα της βασικής αμοιβής και φιλοδωρήματος που καταβλήθηκε ανά μονάδα καυσίμου.
- `gasUsed`: `QUANTITY` — Η ποσότητα καυσίμου που χρησιμοποιήθηκε από αυτή τη συγκεκριμένη συναλλαγή μόνο.
- `contractAddress`: `DATA`, 20 Bytes — Η διεύθυνση του έξυπνου συμβολαίου που δημιουργήθηκε, εάν η συναλλαγή ήταν δημιουργία έξυπνου συμβολαίου, διαφορετικά `null`.
- `logs`: `Array` — Πίνακας αντικειμένων καταγραφής, τα οποία δημιούργησε αυτή η συναλλαγή.
- `logsBloom`: `DATA`, 256 Bytes — Φίλτρο bloom για ελαφρούς πελάτες για γρήγορη ανάκτηση σχετικών καταγραφών.
- `type`: `QUANTITY` — ακέραιος του τύπου συναλλαγής, `0x0` για παλιές συναλλαγές, `0x1` για τύπους λίστας πρόσβασης, `0x2` για δυναμικές αμοιβές.

Επιστρέφει επίσης _είτε_:

- `root` : `DATA` 32 bytes της ρίζας κατάστασης μετά τη συναλλαγή (προ Byzantium)
- `status`: `QUANTITY` είτε `1` (επιτυχία) ή `0` (αποτυχία)

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Επιστρέφει πληροφορίες σχετικά με έναν θείο ενός μπλοκ με hash και θέση δείκτη θείου.

**Παράμετροι**

1. `DATA`, 32 Bytes — Το hash του μπλοκ.
2. `QUANTITY` — Η θέση δείκτη του θείου.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Επιστρέφει** Δείτε [eth_getBlockByHash](#eth_getblockbyhash)

**Παράδειγμα**

```js
// Αίτημα
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Αποτέλεσμα δείτε [eth_getBlockByHash](#eth_getblockbyhash)

**Σημείωση**: Ο θείος δεν περιέχει μεμονωμένες συναλλαγές.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Επιστρέφει πληροφορίες σχετικά με έναν θείο ενός μπλοκ με βάση τον αριθμό του μπλοκ και τη θέση δείκτη του θείου.

**Παράμετροι**

1. `QUANTITY|TAG` — αριθμός μπλοκ, ή συμβολοσειρά `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, όπως είναι στην [προεπιλεγμένη παράμετρο μπλοκ](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` — η θέση του δείκτη του θείου.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Επιστρέφει** Δείτε [eth_getBlockByHash](#eth_getblockbyhash)

**Σημείωση**: Ο θείος δεν περιέχει μεμονωμένες συναλλαγές.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Αποτέλεσμα δείτε [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Δημιουργεί ένα αντικείμενο φίλτρου, με βάση τις επιλογές φίλτρου, για να ειδοποιεί όταν αλλάζει η κατάσταση (logs). Για να ελέγξετε εάν έχει αλλάξει η κατάσταση, καλέστε το [eth_getFilterChanges](#eth_getfilterchanges).

**Μια σημείωση σχετικά με τα φίλτρα θέματος:** Τα θέματα εξαρτώνται από τη σειρά. Μια συναλλαγή με έναν λογάριθμο με θέματα [A, B] θα ταιριάζει με τα ακόλουθα φίλτρα θέματος:

- `[]` "οτιδήποτε"
- `[A]` "A στην πρώτη θέση (και οτιδήποτε μετά)"
- `[null, B]` "οτιδήποτε στην πρώτη θέση ΚΑΙ B στη δεύτερη θέση (και οτιδήποτε μετά)"
- `[A, B]` "A στην πρώτη θέση ΚΑΙ B στη δεύτερη θέση (και οτιδήποτε μετά)"
- `[[A, B], [A, B]]` "(A Ή B) στην πρώτη θέση ΚΑΙ (A Ή B) στη δεύτερη θέση (και οτιδήποτε μετά)"
- **Παράμετροι**

1. `Object` - Οι επιλογές φίλτρου:

- `fromBlock`: `QUANTITY|TAG` - (προαιρετικό, προεπιλογή: `"latest"`) Ακέραιος αριθμός μπλοκ ή `"latest"` για το τελευταίο προτεινόμενο μπλοκ, `"safe"` για το τελευταίο ασφαλές μπλοκ, `"finalized"` για το τελευταίο οριστικοποιημένο μπλοκ ή `"pending"`, `"earliest"` για συναλλαγές που δεν είναι ακόμα σε μπλοκ.
- `toBlock`: `QUANTITY|TAG` - (προαιρετικό, προεπιλογή: `"latest"`) Ακέραιος αριθμός μπλοκ ή `"latest"` για το τελευταίο προτεινόμενο μπλοκ, `"safe"` για το τελευταίο ασφαλές μπλοκ, `"finalized"` για το τελευταίο οριστικοποιημένο μπλοκ ή `"pending"`, `"earliest"` για συναλλαγές που δεν είναι ακόμα σε μπλοκ.
- `address`: `DATA|Array`, 20 Bytes — (προαιρετικό) Διεύθυνση έξυπνου συμβολαίου ή λίστα διευθύνσεων από τις οποίες πρέπει να προέρχονται τα log.
- `topics`: `Array of DATA`, — (προαιρετικό) Πίνακας θεμάτων `DATA` των 32 Bytes. Τα θέματα εξαρτώνται από τη σειρά. Κάθε θέμα μπορεί επίσης να είναι ένας πίνακας DATA με επιλογές "ή".

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Επιστρέφει** `QUANTITY` — id φίλτρου.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Δημιουργεί ένα φίλτρο στον κόμβο, για να ειδοποιεί όταν φτάνει ένα νέο μπλοκ. Για να ελέγξετε εάν έχει αλλάξει η κατάσταση, καλέστε το [eth_getFilterChanges](#eth_getfilterchanges).

**Παράμετροι** None

**Επιστρέφει** `QUANTITY` — id φίλτρου.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Δημιουργεί ένα φίλτρο στον κόμβο, για να ειδοποιεί όταν φτάνουν νέες εκκρεμείς συναλλαγές. Για να ελέγξετε εάν έχει αλλάξει η κατάσταση, καλέστε το [eth_getFilterChanges](#eth_getfilterchanges).

**Παράμετροι** None

**Επιστρέφει** `QUANTITY` — id φίλτρου.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Αφαιρεί ένα φίλτρο με συγκεκριμένο αναγνωριστικό. Πρέπει πάντα να καλείται όταν δεν χρειάζεται πλέον η παρακολούθηση. Επιπλέον, τα φίλτρα λήγουν όταν δεν ζητηθούν με [eth_getFilterChanges](#eth_getfilterchanges) για κάποιο χρονικό διάστημα.

**Παράμετροι**

1. `QUANTITY` — Το id φίλτρου.

```js
params: [
  "0xb", // 11
]
```

**Επιστρέφει** `Boolean` — `true` εάν το φίλτρο αφαιρέθηκε με επιτυχία, διαφορετικά `false`.

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Μέθοδος δημοσκόπησης για ένα φίλτρο, το οποίο επιστρέφει έναν πίνακα καταγραφών που προέκυψαν από την τελευταία δημοσκόπηση.

**Παράμετροι**

1. `QUANTITY` - αναγνωριστικό φίλτρου.

```js
params: [
  "0x16", // 22
]
```

**Επιστρέφει** `Array` — Πίνακας αντικειμένων καταγραφής ή ένας κενός πίνακας εάν δεν έχει αλλάξει τίποτα από την τελευταία δημοσκόπηση.

- Για φίλτρα που δημιουργήθηκαν με `eth_newBlockFilter`, επιστρέφουν τον κατακερματισμό του μπλοκ (`DATA`, 32 Bytes), π.χ. `["0x3454645634534..."]`.
- Για φίλτρα που δημιουργήθηκαν με `eth_newPendingTransactionFilter`, επιστρέφουν τον κατακερματισμό συναλλαγής (`DATA`, 32 Bytes), π.χ. `["0x6345343454645..."]`.
- Για φίλτρα που δημιουργήθηκαν με `eth_newFilter` αρχεία καταγραφών είναι αντικείμενα με τις παρακάτω παραμέτρους:
  - `removed`: `TAG` — `true` όταν αφαιρέθηκε το αρχείο καταγραφής, λόγω αναδιοργάνωσης της αλυσίδας. `false` εάν είναι έγκυρο αρχείο καταγραφής.
  - `logIndex`: `QUANTITY` — ακέραιος της θέσης του δείκτη καταγραφής στο μπλοκ. `null` όταν το αρχείο καταγραφής εκκρεμεί.
  - `transactionIndex`: `QUANTITY` — ακέραιος αριθμός της καταγραφής θέσης δείκτη συναλλαγών απ' όπου δημιουργήθηκε. `null` όταν το αρχείο καταγραφής εκκρεμεί.
  - `transactionHash`: `DATA`, 32 Bytes — κατακερματισμός των συναλλαγών από τις οποίες δημιουργήθηκε αυτό το αρχείο καταγραφής. `null` όταν το αρχείο καταγραφής εκκρεμεί.
  - `blockHash`: `DATA`, 32 Bytes — κατακερματισμός του μπλοκ στο οποίο βρισκόταν αυτό το αρχείο καταγραφής. `null` όταν εκκρεμεί. `null` όταν το αρχείο καταγραφής εκκρεμεί.
  - `blockNumber`: `QUANTITY` — αριθμός μπλοκ στο οποίο βρισκόταν αυτό το αρχείο καταγραφής. `null` όταν εκκρεμεί. `null` όταν το αρχείο καταγραφής εκκρεμεί.
  - `address`: `DATA`, 20 Bytes— διεύθυνση από την οποία προήλθε αυτό το αρχείο καταγραφής.
  - `data`: `DATA` - περιέχει μηδέν ή περισσότερα 32 Byte μη ευρετηριασμένα ορίσματα του αρχείου καταγραφής.
  - `topics`: `Array of DATA` — Πίνακας από 0 έως 4 32 Bytes `DATA` από ορίσματα καταγραφής με ευρετήριο. (Στη _solidity_: Το πρώτο θέμα είναι το _hash_ της υπογραφής του συμβάντος (π.χ. `Deposit(address,bytes32,uint256)`), εκτός εάν δηλώσατε το συμβάν με τον προδιαγραφέα `anonymous`.)
- **Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Επιστρέφει μια σειρά από όλα τα αρχεία καταγραφής που ταιριάζουν με το φίλτρο με το δεδομένο id.

**Παράμετροι**

1. `QUANTITY` — Το id φίλτρου.

```js
params: [
  "0x16", // 22
]
```

**Επιστρέφει** Δείτε [eth_getFilterChanges](#eth_getfilterchanges)

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Δείτε αποτέλεσμα [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Επιστρέφει έναν πίνακα όλων των αρχείων καταγραφής που ταιριάζουν με συγκεκριμένο αντικείμενο φίλτρου.

**Παράμετροι**

1. `Object` - Οι επιλογές φίλτρου:

- `fromBlock`: `QUANTITY|TAG` - (προαιρετικό, προεπιλογή: `"latest"`) Ακέραιος αριθμός μπλοκ ή `"latest"` για το τελευταίο προτεινόμενο μπλοκ, `"safe"` για το τελευταίο ασφαλές μπλοκ, `"finalized"` για το τελευταίο οριστικοποιημένο μπλοκ ή `"pending"`, `"earliest"` για συναλλαγές που δεν είναι ακόμα σε μπλοκ.
- `toBlock`: `QUANTITY|TAG` - (προαιρετικό, προεπιλογή: `"latest"`) Ακέραιος αριθμός μπλοκ ή `"latest"` για το τελευταίο προτεινόμενο μπλοκ, `"safe"` για το τελευταίο ασφαλές μπλοκ, `"finalized"` για το τελευταίο οριστικοποιημένο μπλοκ ή `"pending"`, `"earliest"` για συναλλαγές που δεν είναι ακόμα σε μπλοκ.
- `address`: `DATA|Array`, 20 Bytes — (προαιρετικό) Διεύθυνση έξυπνου συμβολαίου ή λίστα διευθύνσεων από τις οποίες πρέπει να προέρχονται τα log.
- `topics`: `Array of DATA`, — (προαιρετικό) Πίνακας θεμάτων `DATA` των 32 Bytes. Τα θέματα εξαρτώνται από τη σειρά. Κάθε θέμα μπορεί επίσης να είναι ένας πίνακας DATA με επιλογές "ή".
- `blockhash`: `DATA`, 32 Byte — (προαιρετικό, **μελλοντικό**) Με την προσθήκη του EIP-234, το `blockHash` θα είναι μια νέα επιλογή φίλτρου που περιορίζει τα αρχεία καταγραφής που επιστρέφονται στο μεμονωμένο μπλοκ με τον κατακερματισμό 32 byte `blockHash`. Η χρήση του `blockHash` ισοδυναμεί με `fromBlock` = `toBlock` = τον αριθμό μπλοκ με κατακερματισμό `blockHash`. Εάν υπάρχει `blockHash` στα κριτήρια φίλτρου, τότε δεν επιτρέπονται ούτε `fromBlock` ούτε `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Επιστρέφει** Δείτε [eth_getFilterChanges](#eth_getfilterchanges)

**Παράδειγμα**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Δείτε αποτέλεσμα [eth_getFilterChanges](#eth_getfilterchanges)

## Παράδειγμα χρήσης {#usage-example}

### Ανάπτυξη ενός συμβολαίου με χρήση JSON_RPC {#deploying-contract}

Αυτή η ενότητα περιλαμβάνει μια επίδειξη του τρόπου ανάπτυξης ενός συμβολαίου χρησιμοποιώντας μόνο τη διεπαφή RPC. Υπάρχουν εναλλακτικές διαδρομές για την ανάπτυξη έξυπνων συμβολαίων όπου αυτή η πολυπλοκότητα αποκρύπτεται, χρησιμοποιώντας, για παράδειγμα, βιβλιοθήκες που είναι χτισμένες πάνω από τη διεπαφή RPC όπως [web3.js](https://web3js.readthedocs.io/) και [web3.py](https://github.com/ethereum/web3.py). Αυτές οι αφηρημένες έννοιες είναι γενικά πιο εύκολα κατανοητές και λιγότερο επιρρεπείς σε σφάλματα, αλλά εξακολουθεί να είναι χρήσιμο να καταλάβουμε τι συμβαίνει στο παρασκήνιο.

Το παρακάτω είναι ένα απλό έξυπνο συμβόλαιο που ονομάζεται `Multiply7` το οποίο θα αναπτυχθεί χρησιμοποιώντας τη διεπαφή JSON-RPC σε έναν κόμβο Ethereum. Αυτός ο οδηγός προϋποθέτει ότι ο αναγνώστης εκτελεί ήδη έναν κόμβο Geth. Περισσότερες πληροφορίες σχετικά με τους κόμβους και τους πελάτες είναι διαθέσιμες [εδώ](/developers/docs/nodes-and-clients/run-a-node). Ανατρέξτε στην τεκμηρίωση του κάθε [πελάτη](/developers/docs/nodes-and-clients/) για να δείτε πώς να ξεκινήσετε το HTTP JSON-RPC για πελάτες εκτός Geth. Οι περισσότεροι πελάτες εξυπηρετούν από προεπιλογή στο `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Το πρώτο πράγμα που πρέπει να κάνετε είναι να βεβαιωθείτε ότι η διεπαφή HTTP RPC είναι ενεργοποιημένη. Αυτό σημαίνει ότι παρέχουμε στην Geth τη σημαία `--http` κατά την εκκίνηση. Σε αυτό το παράδειγμα, χρησιμοποιούμε τον κόμβο Geth σε μια ιδιωτική αλυσίδα ανάπτυξης. Χρησιμοποιώντας αυτή την προσέγγιση δεν χρειαζόμαστε ether στο πραγματικό δίκτυο.

```bash
geth --http --dev console 2>>geth.log
```

Αυτό θα ξεκινήσει τη διεπαφή HTTP RPC στο `http://localhost:8545`.

Μπορούμε να επαληθεύσουμε ότι η διεπαφή εκτελείται ανακτώντας τη διεύθυνση coinbase (λαμβάνοντας την πρώτη διεύθυνση από τον πίνακα λογαριασμών) και το υπόλοιπο χρησιμοποιώντας το [curl](https://curl.se). Λάβετε υπόψη ότι τα δεδομένα σε αυτά τα παραδείγματα θα διαφέρουν στον τοπικό σας κόμβο. Εάν θέλετε να δοκιμάσετε αυτές τις εντολές, αντικαταστήστε τις παραμέτρους αίτησης στη δεύτερη εντολή curl με το αποτέλεσμα που επιστράφηκε από την πρώτη.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[]", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Επειδή οι αριθμοί είναι κωδικοποιημένοι σε hex, το υπόλοιπο επιστρέφεται σε wei ως συμβολοσειρά hex. Εάν θέλουμε να έχουμε το υπόλοιπο σε ether ως αριθμό μπορούμε να χρησιμοποιήσουμε το web3 από την κονσόλα Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Τώρα που έχουμε ether στην ιδιωτική μας αλυσίδα ανάπτυξης, μπορούμε να αναπτύξουμε το έξυπνο συμβόλαιο. Το πρώτο βήμα είναι να μεταγλωττίσουμε το έξυπνο συμβόλαιο Multiply7 σε κώδικα byte που μπορεί να σταλεί στο EVM. Για να εγκαταστήσετε το solc, τον μεταγλωττιστή Solidity, ακολουθήστε την [τεκμηρίωση Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Ίσως θέλετε να χρησιμοποιήσετε μια παλαιότερη έκδοση `solc` για να ταιριάζει με την [έκδοση του μεταγλωττιστή που χρησιμοποιείται για το παράδειγμά μας](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Το επόμενο βήμα είναι να μεταγλωττίσουμε το έξυπνο συμβόλαιο Multiply7 σε κώδικα byte που μπορεί να σταλεί στο EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Τώρα που έχουμε τον μεταγλωττισμένο κώδικα πρέπει να προσδιορίσουμε πόσο καύσιμο κοστίζει η ανάπτυξή του. Η διεπαφή RPC έχει μια μέθοδο `eth_estimateGas` που θα μας δώσει μια εκτίμηση.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Και, τέλος, αναπτύξτε το συμβόλαιο.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Η συναλλαγή γίνεται αποδεκτή από τον κόμβο και επιστρέφεται ένα hash συναλλαγής. Αυτό το hash μπορεί να χρησιμοποιηθεί για την παρακολούθηση της συναλλαγής. Το επόμενο βήμα είναι να καθορίσουμε τη διεύθυνση όπου θα αναπτυχθεί το συμβόλαιο μας. Κάθε συναλλαγή που εκτελείται θα δημιουργεί μια απόδειξη. Αυτή η απόδειξη περιέχει διάφορες πληροφορίες σχετικά με τη συναλλαγή, όπως σε ποιο μπλοκ συμπεριλήφθηκε η συναλλαγή και πόσο καύσιμο χρησιμοποιήθηκε από το EVM. Εάν μια συναλλαγή δημιουργεί ένα συμβόλαιο, θα περιέχει επίσης τη διεύθυνση του συμβολαίου. Μπορούμε να ανακτήσουμε την απόδειξη με τη μέθοδο RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Το συμβόλαιό μας δημιουργήθηκε στο `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Ένα αποτέλεσμα null αντί για απόδειξη σημαίνει ότι η συναλλαγή δεν έχει συμπεριληφθεί ακόμη σε μπλοκ. Περιμένετε για λίγο και ελέγξτε εάν εκτελείται ο πελάτης συναίνεσης και δοκιμάστε ξανά.

#### Αλληλεπίδραση με έξυπνα συμβόλαια {#interacting-with-smart-contract}

Σε αυτό το παράδειγμα θα στείλουμε μια συναλλαγή χρησιμοποιώντας το `eth_sendTransaction` στη μέθοδο `multiply` του συμβολαίου.

Το `eth_sendTransaction` απαιτεί πολλά ορίσματα, συγκεκριμένα `from`, `to` και `data`. Το `From` είναι η δημόσια διεύθυνση του λογαριασμού μας και το `to` είναι η διεύθυνση του συμβολαίου. Το όρισμα `data` περιέχει ένα φορτίο εκτέλεσης που ορίζει ποια μέθοδος πρέπει να κληθεί και με ποια ορίσματα. Εδώ είναι που μπαίνει στην εξίσωση το [ABI (δυαδική διεπαφή εφαρμογής)](https://docs.soliditylang.org/en/latest/abi-spec.html). Το ABI είναι ένα αρχείο JSON που ορίζει τον τρόπο ορισμού και κωδικοποίησης δεδομένων για το EVM.

Τα byte του φορτίου εκτέλεσης ορίζουν ποια μέθοδος στο έξυπνο συμβόλαιο καλείται. Αυτά είναι τα πρώτα 4 byte από το Keccak hash πάνω από το όνομα της συνάρτησης και τους τύπους των ορισμάτων της, κωδικοποιημένα σε hex. Η συνάρτηση multiply δέχεται ένα uint που είναι ένα ψευδώνυμο για το uint256. Αυτό έχει αποτέλεσμα:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Το επόμενο βήμα είναι να κωδικοποιήσουμε τα ορίσματα. Υπάρχει μόνο ένα uint256, ας πούμε, η τιμή 6. Το ABI έχει μια ενότητα που καθορίζει τον τρόπο κωδικοποίησης των τύπων uint256.

`int<M>: enc(X)` είναι η κωδικοποίηση συμπληρώματος μεγακρικού δύο του X, γεμισμένη στην υψηλότερη τάξη (αριστερά) με 0xff για αρνητικό X και με μηδενικά > byte για θετικό X έτσι ώστε το μήκος να είναι πολλαπλάσιο των 32 byte.

Αυτό κωδικοποιεί σε `0000000000000000000000000000000000000000000000000000000000000006`.

Συνδυάζοντας τον επιλογέα λειτουργίας και το κωδικοποιημένο όρισμα, τα δεδομένα μας θα είναι `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Αυτό μπορεί τώρα να σταλεί στον κόμβο:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Εφόσον στάλθηκε μια συναλλαγή, επιστράφηκε ένας hash συναλλαγής. Η ανάκτηση της απόδειξης δίνει:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Η απόδειξη περιέχει ένα αρχείο καταγραφής. Αυτό το αρχείο καταγραφής δημιουργήθηκε από το EVM κατά την εκτέλεση της συναλλαγής και συμπεριλήφθηκε στην απόδειξη. Η λειτουργία `multiply` δείχνει ότι το συμβάν `Print` αυξήθηκε με τους χρόνους εισαγωγής 7. Εφόσον το όρισμα για το συμβάν `Print` ήταν ένα uint256, μπορούμε να το αποκωδικοποιήσουμε σύμφωνα με τους κανόνες ABI οι οποίοι θα μας αφήσουν με το αναμενόμενο δεκαδικό 42. Εκτός από τα δεδομένα αξίζει να σημειωθεί ότι τα θέματα μπορούν να χρησιμοποιηθούν για να προσδιοριστεί ποιο συμβάν δημιούργησε το log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Αυτή ήταν απλώς μια σύντομη εισαγωγή σε μερικές από τις πιο κοινές εργασίες, που δείχνει την άμεση χρήση του JSON-RPC.

## Σχετικά θέματα {#related-topics}

- [Προδιαγραφή JSON-RPC](http://www.jsonrpc.org/specification)
- [ Κόμβοι και πελάτες](/developers/docs/nodes-and-clients/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [Backend APIs](/developers/docs/apis/backend/)
- [Λογισμικό πελάτη](/developers/docs/nodes-and-clients/#execution-clients)
