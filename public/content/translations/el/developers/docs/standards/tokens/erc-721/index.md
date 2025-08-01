---
title: ERC-721 Πρότυπο Μη Εναλλάξιμων Κρυπτοπαραστατικών
description:
lang: el
---

## Εισαγωγή {#introduction}

**Τι είναι το Μη Εναλλάξιμο Κρυπτοπαραστατικό;**

Το Μη Εναλλάξιμο Κρυπτοπαραστατικό (NFT) χρησιμοποιείται για να προσδιορίσει κάτι ή κάποιον με έναν μοναδικό τρόπο. Αυτός ο τύπος Ψηφιακού Στοιχείου είναι τέλειος για να χρησιμοποιηθεί σε πλατφόρμες που προσφέρουν συλλεκτικά αντικείμενα, κλειδιά πρόσβασης, εισιτήρια λαχειοφόρων αγορών, αριθμημένες θέσεις για συναυλίες, αθλητικούς αγώνες, κλπ. Αυτός ο ειδικός τύπος Ψηφιακού Στοιχείου έχει καταπληκτικές δυνατότητες, οπότε του αξίζει ένα κατάλληλο Πρότυπο, το ERC-721 που ήρθε για να δώσει λύση σε αυτό!

**Τι είναι το ERC-721;**

Το ERC-721 εισάγει ένα πρότυπο για τα NFT. Αυτός ο τύπος ψηφιακών στοιχείων είναι μοναδικός και μπορεί να έχει διαφορετική αξία από κάποιο άλλο ψηφιακό στοιχείο που προέρχεται από το ίδιο Έξυπνο Συμβόλαιο, ίσως λόγω της ηλικίας του, της σπανιότητάς του ή ακόμα και κάποιου άλλου χαρακτηριστικού, όπως η εμφάνισή του. Περιμένετε, εικονικό;

Ναι! Όλα τα NFT έχουν μια μεταβλητή `uint256` που ονομάζεται `tokenId`, επομένως για οποιοδήποτε συμβόλαιο ERC-721, το ζεύγος `contract address, uint256 tokenId` πρέπει να είναι καθολικά μοναδικό. Επομένως, μια dapp μπορεί να έχει έναν "μετατροπέα" που χρησιμοποιεί το `tokenId` ως είσοδο και εξάγει μια εικόνα κάτι ωραίου, όπως ζόμπι, όπλα, δεξιότητες ή καταπληκτικά γατάκια!

## Προαπαιτούμενα {#prerequisites}

- [Λογαριασμοί](/developers/docs/accounts/)
- [Έξυπνα Συμβόλαια](/developers/docs/smart-contracts/)
- [Πρότυπα ψηφιακού στοιχείου](/developers/docs/standards/tokens/)

## Κορμός {#body}

Το ERC-721 (Ethereum Request for Comments 721), που προτάθηκε από τους William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs τον Ιανουάριο του 2018, είναι ένα Πρότυπο Μη Εναλλάξιμων Κρυπτοπαραστατικών που υλοποιεί ένα API για ψηφιακά στοιχεία εντός των Έξυπνων Συμβολαίων.

Παρέχει λειτουργίες όπως η μεταφορά ψηφιακών στοιχείων από έναν λογαριασμό σε έναν άλλο, η λήψη του τρέχοντος υπολοίπου ενός λογαριασμού, η λήψη του κατόχου ενός συγκεκριμένου ψηφιακού στοιχείου και επίσης η συνολική προσφορά των διαθέσιμων ψηφιακών στοιχείων στο δίκτυο. Έχει επίσης κάποιες άλλες λειτουργίες, όπως η έγκριση ότι ένα ποσό ψηφιακών στοιχείων από έναν λογαριασμό μπορεί να μετακινηθεί από έναν λογαριασμό τρίτου μέρους.

Εάν ένα Έξυπνο Συμβόλαιο υλοποιεί τις ακόλουθες μεθόδους και συμβάντα, μπορεί να ονομαστεί Συμβόλαιο Μη Εναλλάξιμων Κρυπτοπαραστατικών ERC-721 και μόλις αναπτυχθεί θα είναι υπεύθυνο για την παρακολούθηση των στοιχείων που δημιουργήθηκαν στο Ethereum.

Από το [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Μέθοδοι {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool)˙
```

### Εκδηλώσεις {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Παραδείγματα {#web3py-example}

Ας δούμε πώς ένα πρότυπο είναι τόσο σημαντικό για να διευκολύνει να επιθεωρήσουμε οποιοδήποτε έξυπνο συμβόλαιο ψηφιακών στοιχείων ERC-721 στο Ethereum. Χρειαζόμαστε μόνο το Διασύνδεσμο Δυαδικού Κώδικα Εφαρμογής Συμβολαίου (ABI) για να δημιουργήσουμε μια διεπαφή σε οποιοδήποτε ψηφιακό στοιχείο ERC-721. Όπως μπορείτε να δείτε παρακάτω, θα χρησιμοποιήσουμε ένα απλοποιημένο ABI, για να το κάνουμε ένα παράδειγμα χαμηλής τριβής.

#### Παράδειγμα Web3.py {#web3py-example}

Αρχικά, βεβαιωθείτε ότι έχετε εγκαταστήσει τη βιβλιοθήκη Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - Increase the number of blocks up from 120 if no Transfer event is returned.
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Το συμβόλαιο CryptoKitties έχει κάποια ενδιαφέροντα Γεγονότα εκτός από τα Τυπικά.

Ας δούμε δύο από αυτά το `Pregnant` και το `Birth`.

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Δημοφιλή NFT {#popular-nfts}

- Το [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) αναφέρεται στο κορυφαίο NFT στο Ethereum ανά όγκο μεταφορών.
- Το [CryptoKitties](https://www.cryptokitties.co/) είναι ένα παιχνίδι με επίκεντρο τα αναπαραγωγικά, συλλεκτικά και τόσο αξιολάτρευτα πλάσματα που ονομάζουμε CryptoKitties.
- Το [Sorare](https://sorare.com/) είναι ένα παγκόσμιο παιχνίδι φαντασίας ποδοσφαίρου όπου μπορείτε να συλλέξετε περιορισμένες εκδόσεις συλλεκτικών, να διαχειριστείτε ομάδες και να διαγωνιστείτε για βραβεία.
- Το [The Ethereum Name Service (ENS)](https://ens.domains/) προσφέρει ένα ασφαλές & αποκεντρωμένο τρόπο αντιμετώπισης πόρων και των δύο εντός και εκτός του blockchain χρησιμοποιώντας απλά, ευανάγνωστα από τον άνθρωπο ονόματα.
- Το [POAP](https://poap.xyz) παρέχει δωρεάν NFT σε άτομα που παρακολουθούν εκδηλώσεις ή ολοκληρώνουν συγκεκριμένες ενέργειες. Τα POAP είναι δωρεάν για δημιουργία και διανομή.
- Το [Unstoppable Domains](https://unstoppabledomains.com/) είναι μια εταιρεία με έδρα το Σαν Φρανσίσκο που χτίζει τομείς blockchains. Οι τομείς Blockchain αντικαθιστούν τις διευθύνσεις κρυπτονομισμάτων με ονόματα αναγνώσιμα από τον άνθρωπο και μπορούν να χρησιμοποιηθούν για την ενεργοποίηση ιστοσελίδων ανθεκτικών στη λογοκρισία.
- Το [Gods Unchained Cards](https://godsunchained.com/) είναι ένα TCG στο Ethereum blockchain που χρησιμοποιεί NFT για δημιουργία πραγματικής ιδιοκτησίας στα στοιχεία του παιχνιδιού.
- Το [Bored Ape Yacht Club](https://boredapeyachtclub.com) είναι μια συλλογή από 10,000 μοναδικά NFT, τα οποία εκτός από το να είναι αποδεδειγμένα σπάνια έργα τέχνης, λειτουργούν ως σύμβολο συμμετοχής στο κλαμπ, παρέχοντας προνόμια και οφέλη μελών που αυξάνονται με την πάροδο του χρόνου ως αποτέλεσμα των προσπαθειών της κοινότητας.

## Περισσότερες πληροφορίες {#further-reading}

- [EIP-721: Πρότυπο για Mη Εναλλάξιμο Κρυπτοπαραστατικό](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Τεκμηρίωση](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Εφαρμογή του ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
