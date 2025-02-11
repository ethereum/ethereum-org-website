---
title: Βιβλιοθήκες API της JavaScript
description: Μια εισαγωγή στις βιβλιοθήκες API ενός πελάτη στη JavaScript που σας επιτρέπουν να αλληλεπιδράσετε από την εφαρμογή σας με την κεντρική αλυσίδα.
lang: el
---

Προκειμένου μια εφαρμογή ιστού να αλληλεπιδράσει με την κεντρική αλυσίδα του Ethereum (π.χ. ανάγνωση δεδομένων και/ή αποστολή συναλλαγών στο δίκτυο), πρέπει να συνδεθεί με έναν κόμβο του δικτύου Ethereum.

Για αυτό τον σκοπό, κάθε εφαρμογή πελάτη Ethereum εφαρμόζει την προδιαγραφή [JSON-RPC](/developers/docs/apis/json-rpc/), ώστε να υπάρχει ένα ομοιόμορφο σύνολο [μεθόδων](/developers/docs/apis/json-rpc/#json-rpc-methods) όπου μπορούν να βασίζονται οι εφαρμογές.

Εάν θέλετε να χρησιμοποιήσετε τη JavaScript για να συνδεθείτε με έναν κόμβο Ethereum, είναι δυνατό να χρησιμοποιήσετε το vanilla JavaScript καθώς υπάρχουν πολλές βιβλιοθήκες εντός του οικοσυστήματος που το καθιστούν πολύ πιο εύκολο. Με αυτές τις βιβλιοθήκες, οι προγραμματιστές μπορούν να γράφουν διαισθητικές μεθόδους μίας γραμμής για την αρχικοποίηση αιτημάτων JSON RPC (έμμεσα) που αλληλεπιδρούν με το Ethereum.

Παρακαλούμε σημειώστε ότι από τη [Συγχώνευση](/roadmap/merge/), δύο συνδεδεμένα κομμάτια λογισμικού Ethereum, ένας πελάτης εκτέλεσης και ένας πελάτης συναίνεσης, απαιτούνται για να λειτουργήσει ένας κόμβος. Παρακαλούμε βεβαιωθείτε ότι ο κόμβος σας περιλαμβάνει τόσο το εκτελεστικό όσο και το συναινετικό τμήμα της εφαρμογής πελάτη. Εάν ο κόμβος σας δε βρίσκεται στον τοπικό σας υπολογιστή (π.χ. ο κόμβος σας εκτελείται σε ένα σύστημα AWS) ενημερώστε ανάλογα τις διευθύνσεις IP στον οδηγό λειτουργίας. Για περισσότερες πληροφορίες δείτε τη σελίδα μας [εκτελώντας έναν κόμβο](/developers/docs/nodes-and-clients/run-a-node/).

## Προαπαιτούμενα {#prerequisites}

Εκτός από την κατανόηση της JavaScript, θα ήταν χρήσιμο να κατανοήσουμε τη σημασία της [αποθήκευση κεφαλαίου Ethereum](/developers/docs/ethereum-stack/) και των [εφαρμογών πελάτη του Ethereum](/developers/docs/nodes-and-clients/).

## Γιατί να χρησιμοποιήσετε μια βιβλιοθήκη; {#why-use-a-library}

Αυτές οι βιβλιοθήκες εκτελούν το μεγαλύτερο μέρος της πολυπλοκότητας της άμεσης αλληλεπίδρασης με έναν κόμβο του Ethereum. Παρέχουν επίσης χρήσιμες λειτουργίες (π.χ. μετατροπή από ETH σε Gwei) έτσι ώστε ένας προγραμματιστής να χρειαστεί λιγότερο χρόνο για τη διασύνδεση της εφαρμογής πελάτη του με το δίκτυο του Ethereum, επικεντρώνοντας στη μοναδική λειτουργικότητα της εφαρμογής.

## Χαρακτηριστικά βιβλιοθήκης {#library-features}

### Σύνδεση σε κόμβους του Ethereum {#connect-to-ethereum-nodes}

Χρησιμοποιώντας τους παρόχους, αυτές οι βιβλιοθήκες σας επιτρέπουν να συνδεθείτε στο Ethereum και να διαβάσετε τα δεδομένα του, είτε αυτό είναι μέσω JSON-RPC, INFURA, Etherscan, Alchemy ή MetaMask.

**Παράδειγμα Ethers**

```js
// Το BrowserProvider περικλείει ένα τυπικό Web3 πάροχο, ο οποίος είναι
// αυτό που παρέχει το Metamask με το window.ethereum σε κάθε σελίδα
const provider = new ethers.BrowserProvider(window.ethereum)

// Το πρόσθετο Metamask επιτρέπει επίσης την υπογραφή συναλλαγών
// για αποστολή ether και πληρωμή για αλλαγή κατάστασης εσωτερικά
// στην κεντρική αλυσίδα.
// Γι' αυτό χρειαζόμαστε τη σύνδεση με το λογαριασμό...
const signer = provider.getSigner()
```

**Παράδειγμα Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// ή
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// αλλαγή παρόχου
web3.setProvider("ws://localhost:8546")
// ή
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Με χρήση του παρόχου IPC σε node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// ή
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // διαδρομή για mac os
// σε windows η διαδρομή είναι: "\\\\.\\pipe\\geth.ipc"
// σε linux η διαδρομή είναι: "/users/myuser/.ethereum/geth.ipc"
```

Μόλις ρυθμιστεί μπορείτε να αναζητήσετε στην κεντρική αλυσίδα για:

- Τους αριθμούς των μπλοκ
- Την εκτίμηση του ύψους των κρατήσεων
- Νέα για έξυπνα συμβόλαια
- Την ταυτότητα του δικτύου
- Και πολλά άλλα...

### Λειτουργικότητα πορτοφολιού {#wallet-functionality}

Αυτές οι βιβλιοθήκες σας δίνουν τη δυνατότητα να δημιουργήσετε πορτοφόλια, να διαχειριστείτε τα κλειδιά και να υπογράψετε συναλλαγές.

Δείτε ένα παράδειγμα από το Ethers

```js
// Δημιουργήστε ένα πορτοφόλι με χρήση της φράσης ασφαλείας...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...ή από ιδιοτικό κλειδί
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// αληθές

// Η διεύθυνση ως Υπόσχεση ανά Signer API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Μια διεύθυνση Πορτοφολιού είναι επίσης ταυτόχρονα διαθέσιμη
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Εσωτερικά κρυπτογραφημένα αντικείμενα
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Το μνημονικό πορτοφολιού
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Σημείωση: Ένα πορτοφόλι που δημιουργείται με ιδιωτικό κλειδί δεν
//       έχει μνημονικό (το αποτρέπει το παράγωγο)
walletPrivateKey.mnemonic
// null

// Υπογραφή μηνύματος
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Υπογραφή συναλλαγής
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Η μέθοδος σύνδεσης επιστρέφει μια νέα κατάσταση του
// πορτοφολιού συνδεδεμένο με πάροχο
wallet = walletMnemonic.connect(provider)

// Αναμονή δικτύου
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Αποστολή ether
wallet.sendTransaction(tx)
```

[Ανάγνωση της πλήρη τεκμηρίωση](https://docs.ethers.io/v5/api/signer/#Wallet)

Μόλις ρυθμιστεί θα μπορείτε να:

- Δημιουργήσετε λογαριασμούς
- Στείλετε συναλλαγές
- Υπογράψετε συναλλαγές
- Και πολλά άλλα...

### Αλληλεπίδραση με τις λειτουργίες ενός έξυπνου συμβολαίου {#interact-with-smart-contract-functions}

Οι βιβλιοθήκες της JavaScript για εφαρμογή πελάτη, σας επιτρέπουν να καλέσετε τις λειτουργίες έξυπνου συμβολαίου διαβάζοντας το Application Binary Interface (ABI) ενός ολοκληρωμένου συμβολαίου.

Το ABI εξηγεί ουσιαστικά τις λειτουργίες του συμβολαίου σε μορφή JSON και σας επιτρέπει να το χρησιμοποιήσετε σαν ένα κανονικό αντικείμενο της JavaScript.

Έτσι το ακόλουθο συμβόλαιο με τη Solidity θα ήταν:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Και θα έχει ως αποτέλεσμα τα παρακάτω σε JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Αυτό σημαίνει ότι μπορείτε:

- Να στείλετε μια συναλλαγή στο έξυπνο συμβόλαιο και να εκτελέστε τη μέθοδό του
- Να ζητήσετε εκτίμηση κόστους των κρατήσεων που θα απαιτηθούν με τη χρήση στην EVM
- Να αναπτύξετε ένα συμβόλαιο
- Και πολλά άλλα...

### Βοηθητικές λειτουργίες {#utility-functions}

Οι βοηθητικές λειτουργίες σας παρέχουν χρήσιμες συντομεύσεις προς υποβοήθηση του έργου σας.

Οι τιμές του ETH είναι σε Wei από προεπιλογή. 1 ETH = 1,000,000,000,000,000,000,000 WEI – αυτό σημαίνει ότι έχετε να κάνετε με πολλούς αριθμούς! `web3.utils.toWei` μετατροπή ether σε Wei.

Σε ethers θα μοιάζει όπως παρακάτω:

```js
// Ανάγνωση του υπόλοιπου ενός λογαριασμού (ανά διεύθυνση ή όνομα ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Συχνά χρειάζεται να προσαρμόζεται το αποτέλεσμα για το χρήστη
// που προτιμά να δει τις τιμές σε ether (και όχι σε wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Βοηθητικές λειτουργίες Web3js](https://docs.web3js.org/api/web3-utils)
- [Βοηθητικές λειτουργίες Ethers](https://docs.ethers.io/v5/api/utils/)

## Διαθέσιμες βιβλιοθήκες {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [Τεκμηρίωση](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Ολοκληρωμένη εφαρμογή πορτοφολιού Ethereum και βοηθητικά προγράμματα με χρήση JavaScript και TypeScript._**

- [Τεκμηρίωση](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Ένα πρωτόκολλο δημιουργίας ευρετηρίου δεδομένων στο Ethereum και IPFS καθώς και την αναζήτηση με χρήση GraphQL._**

- [The Graph](https://thegraph.com/)
- [Φυλλομετρητής Graph](https://thegraph.com/explorer/)
- [Τεκμηρίωση](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Μια υψηλού επιπέδου βιβλιοθήκη της JS βελτιστοποιημένη για ελαφρές εφαρμογές πελάτη._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Η Typescript ως εναλλακτική της Web3.js._**

- [Τεκμηρίωση](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Η συνάρτηση Wrapper σε συνδυασμό με Web3.js και αυτόματες επαναπροσπάθειες καθώς και ενισχυμένα apis._**

- [Τεκμηρίωση](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_API για τη λήψη δεδομένων NFT, συμπεριλαμβανομένης της ιδιοκτησίας, των χαρακτηριστικών μεταδεδομένων και άλλων._**

- [Τεκμηρίωση](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_Διεπαφή TypeScript για το Ethereum._**

- [Τεκμηρίωση](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

## Περισσότερες πληροφορίες {#further-reading}

_Γνωρίζετε κάποιο πόρο της κοινότητας που σας βοήθησε; Επεξεργαστείτε αυτή τη σελίδα και προσθέστε το!_

## Σχετικά θέματα {#related-topics}

- [ Κόμβοι και πελάτες](/developers/docs/nodes-and-clients/)
- [Πλαίσια ανάπτυξης](/developers/docs/frameworks/)

## Σχετικοί οδηγοί {#related-tutorials}

- [Ρυθμίστε το Web3js να χρησιμοποιεί την κεντρική αλυσίδα του Ethereum σε JavasScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Οδηγίες ρύθμισης του web3.js για το έργο σας._
- [Σύνδεση ενός έξυπνου συμβολαίου με τη JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Με χρήση του κρυπτονομίσματος DAI, δείτε πως μπορείτε να χρησιμοποιήσετε λειτουργίες συμβολαίου με τη JavaScript._
- [Αποστολή συναλλαγών με χρήση web3 και Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Οδηγός βήμα προς βήμα για την αποστολή συναλλαγών από το σύστημα._
