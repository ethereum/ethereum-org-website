---
title: Πρότυπο Ψηφιακού Στοιχείου ERC-20
description:
lang: el
---

## Εισαγωγή {#introduction}

**Τι είναι ένα Ψηφιακό Στοιχείο;**

Τα Ψηφιακά Στοιχεία μπορούν να αντιπροσωπεύουν σχεδόν τα πάντα στο Ethereum:

- πόντους φήμης σε μια πλατφόρμα στο διαδίκτυο
- ικανότητες του χαρακτήρα σε ένα παιχνίδι
- χρηματοοικονομικά στοιχεία όπως μετοχές εταιρείας
- ένα νόμισμα όπως το USD
- μια ουγγιά χρυσού
- και πολλά άλλα...

Ένα τόσο ισχυρό χαρακτηριστικό του Ethereum πρέπει να χειρίζεται από ένα ισχυρό πρότυπο; Αυτό είναι ακριβώς όπου το ERC-20 παίζει το ρόλο του! Αυτό το πρότυπο επιτρέπει στους προγραμματιστές να δημιουργούν εφαρμογές ψηφιακών στοιχείων που είναι διαλειτουργικές με άλλα προϊόντα και υπηρεσίες. Το πρότυπο ERC-20 χρησιμοποιείται επίσης για την παροχή πρόσθετης λειτουργικότητας στο [ether](/glossary/#ether).

**Τι είναι το ERC-20;**

Το ERC-20 εισάγει ένα πρότυπο για ανταλλάξιμα ψηφιακά στοιχεία, με άλλα λόγια, έχουν μια ιδιότητα που κάνει κάθε ψηφιακό στοιχείο να είναι ακριβώς το ίδιο (σε τύπο και αξία) με ένα άλλο. Για παράδειγμα, ένα ψηφιακό στοιχείο ERC-20 λειτουργεί ακριβώς όπως το ETH, που σημαίνει ότι 1 ψηφιακό στοιχείο ισούται και θα ισούται πάντα με όλα τα άλλα.

## Προαπαιτούμενα {#prerequisites}

- [Λογαριασμοί](/developers/docs/accounts)
- [Έξυπνα Συμβόλαια](/developers/docs/smart-contracts/)
- [Πρότυπα ψηφιακού στοιχείου](/developers/docs/standards/tokens/)

## Κορμός {#body}

Το ERC-20 (Ethereum Request for Comments 20), που προτάθηκε από τον Fabian Vogelsteller τον Νοέμβριο του 2015, είναι ένα πρότυπο ψηφιακού στοιχείου που υλοποιεί ένα API για ψηφιακά στοιχεία εντός έξυπνων συμβολαίων.

Παραδείγματα λειτουργιών που παρέχει το ERC-20:

- μεταφορά token από έναν λογαριασμό σε έναν άλλο
- λήψη του τρέχοντος υπολοίπου token ενός λογαριασμού
- Λήψη συνολικού κεφαλαίου του ψηφιακού στοιχείου που είναι διαθέσιμο στο δίκτυο
- Έγκριση εάν ένα ποσό ψηφιακού στοιχείου ενός λογαριασμού μπορεί να δαπανηθεί από έναν τρίτο λογαριασμό

Εάν ένα έξυπνο συμβόλαιο εφαρμόζει τις ακόλουθες μεθόδους και συμβάντα μπορεί να ονομαστεί συμβόλαιο ψηφιακού στοιχείου ERC-20 και, όταν αναπτυχθεί, θα είναι υπεύθυνο για την παρακολούθηση των ψηφιακών στοιχείων που θα δημιουργηθούν στο Ethereum.

Από το [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Μέθοδοι {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### Συμβάντα {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Παραδείγματα {#web3py-example}

Ας δούμε πώς ένα πρότυπο είναι τόσο σημαντικό για να μας διευκολύνει να επιθεωρήσουμε οποιοδήποτε έξυπνο συμβόλαιο ERC-20 Token στο Ethereum. Χρειαζόμαστε μόνο το Διασύνδεσμο Δυαδικού Κώδικα Εφαρμογής Συμβολαίου (ABI) για να δημιουργήσουμε μια διεπαφή σε οποιοδήποτε ERC-20 Token. Όπως μπορείτε να δείτε παρακάτω, θα χρησιμοποιήσουμε ένα απλοποιημένο ABI, για να το κάνουμε ένα παράδειγμα χαμηλής τριβής.

#### Παράδειγμα Web3.py {#web3py-example}

Αρχικά, βεβαιωθείτε ότι έχετε εγκαταστήσει τη βιβλιοθήκη της Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
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
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Γνωστά ζητήματα {#erc20-issues}

### Πρόβλημα λήψης αποδεικτικού ERC-20 {#reception-issue}

Όταν αποστέλλονται token ERC-20 σε ένα έξυπνο συμβόλαιο που δεν έχει σχεδιαστεί να χειρίζεται token ERC-20, αυτά τα token μπορούν να χαθούν μόνιμα. Αυτό συμβαίνει επειδή το συμβαλλόμενο μέρος που λαμβάνει δεν έχει τη λειτουργικότητα να αναγνωρίζει ή να ανταποκρίνεται στα εισερχόμενα token και δεν υπάρχει μηχανισμός στο πρότυπο ERC-20 για να ειδοποιήσει το συμβαλλόμενο μέρος που λαμβάνει σχετικά με τα εισερχόμενα token. Οι κύριοι τρόποι με τους οποίους εμφανίζεται αυτό το ζήτημα είναι μέσω:

1.  Μηχανισμός μεταφοράς κρυπτονομισμάτων
  - Τα ψηφιακά στοιχεία ERC-20 μεταφέρονται χρησιμοποιώντας τις συναρτήσεις transfer ή transferFrom
    -   Όταν ένας χρήστης στέλνει κρύπτο σε μια διεύθυνση συμβολαίου χρησιμοποιώντας αυτές τις συναρτήσεις, αυτά μεταφέρονται ανεξάρτητα από το εάν το συμβαλλόμενο μέρος που λαμβάνει έχει σχεδιαστεί για να τα χειρίζεται
2.  Έλλειψη ειδοποίησης
    -   Το συμβαλλόμενο μέρος δε λαμβάνει ειδοποίηση ή ενημέρωση ότι του έχουν σταλεί ψηφιακά στοιχεία
    -   Εάν το συμβαλλόμενο μέρος που λαμβάνει δε διαθέτει μηχανισμό για τη διαχείριση κρύπτο (π.χ. μια συνάρτηση fallback ή μια ειδική συνάρτηση για τη διαχείριση λήψης κρύπτο), τα ψηφιακά στοιχεία είναι ουσιαστικά κολλημένα στη διεύθυνση του συμβολαίου.
3.  Χωρίς ενσωματωμένη διαχείριση
    -   Το πρότυπο ERC-20 δεν περιλαμβάνει υποχρεωτική συνάρτηση για την εφαρμογή συμβαλλόμενων μερών που λαμβάνουν, οδηγώντας σε μια κατάσταση όπου πολλά συμβόλαια δεν είναι σε θέση να διαχειρίζονται σωστά τα εισερχόμενα token

Μερικά εναλλακτικά πρότυπα προέκυψαν από αυτό το ζήτημα, όπως το [ERC-223](/developers/docs/standards/tokens/erc-223)

## Περισσότερες πληροφορίες {#further-reading}

- [EIP-20: ERC-20 Πρότυπο Ψηφιακού Στοιχείου](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Ψηφιακά Στοιχεία](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Εφαρμογή του ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Οδηγός για Solidity ERC20 Tokens](https://www.alchemy.com/overviews/erc20-solidity)


## Άλλα πρότυπα ανταλλάξιμων ψηφιακών στοιχείων {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Θησαυροφυλάκια με κρυπτονομίσματα](/developers/docs/standards/tokens/erc-4626)