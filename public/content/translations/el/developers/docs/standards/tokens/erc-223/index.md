---
title: Πρότυπο ERC-223 Ψηφιακών Στοιχείων
description: Μια επισκόπηση του προτύπου ανταλλάξιμου ψηφιακού στοιχείου ERC-223, πώς λειτουργεί και σύγκριση με το ERC-20.
lang: el
---

## Εισαγωγή {#introduction}

### Τι είναι το ERC-223; {#what-is-erc223}

Το ERC-223 είναι ένα πρότυπο για ανταλλάξιμα ψηφιακά στοιχεία, παρόμοιο με το πρότυπο ERC-20. Η βασική διαφορά είναι ότι το ERC-223 ορίζει όχι μόνο το API του ψηφιακού στοιχείου, αλλά και τη λογική για τη μεταφορά του από τον αποστολέα στον παραλήπτη. Εισάγει ένα μοντέλο επικοινωνίας που επιτρέπει τη διαχείριση των μεταφορών ψηφιακών στοιχείων από την πλευρά του παραλήπτη.

### Διαφορές από το ERC-20 {#erc20-differences}

Το ERC-223 αντιμετωπίζει ορισμένους περιορισμούς του ERC-20 και εισάγει μια νέα μέθοδο αλληλεπίδρασης μεταξύ του συμβολαίου του ψηφιακού στοιχείου και ενός συμβολαίου που ενδέχεται να λάβει τα ψηφιακά στοιχεία. Υπάρχουν λίγα πράγματα που είναι δυνατά με το ERC-223, αλλά όχι με το ERC-20:

- Διαχείριση μεταφοράς ψηφιακού στοιχείου από την πλευρά του παραλήπτη: Οι παραλήπτες μπορούν να ανιχνεύσουν ότι κατατίθεται ένα ψηφιακό στοιχείο ERC-223.
- Απόρριψη ψηφιακών στοιχείων που αποστέλλονται ακατάλληλα: Εάν ένας χρήστης στείλει ένα ψηφιακό στοιχείο ERC-223 σε ένα συμβόλαιο που δεν υποτίθεται ότι θα λάβει ψηφιακά στοιχεία, το συμβόλαιο μπορεί να απορρίψει τη συναλλαγή, αποτρέποντας την απώλεια των ψηφιακών στοιχείων.
- Μεταδεδομένα σε μεταφορές: Τα ψηφιακά στοιχεία ERC-223 μπορούν να περιλαμβάνουν μεταδεδομένα, επιτρέποντας την προσάρτηση αυθαίρετων πληροφοριών σε συναλλαγές ψηφιακών στοιχείων.

## Προαπαιτούμενα {#prerequisites}

- [Λογαριασμοί](/developers/docs/accounts)
- [Έξυπνα συμβόλαια](/developers/docs/smart-contracts/)
- [Πρότυπα κρυπτονομισμάτων](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Κορμός {#body}

Το ERC-223 είναι ένα πρότυπο ψηφιακού στοιχείου που υλοποιεί ένα API για ψηφιακά στοιχεία εντός έξυπνων συμβολαίων. Δηλώνει επίσης ένα API για συμβόλαια που υποτίθεται ότι θα λάβουν ψηφιακά στοιχεία ERC-223. Τα συμβόλαια που δεν υποστηρίζουν το ERC-223 Receiver API δεν μπορούν να λάβουν ψηφιακά στοιχεία ERC-223, αποτρέποντας το σφάλμα χρήστη.

Εάν ένα έξυπνο συμβόλαιο υλοποιεί τις ακόλουθες μεθόδους και συμβάντα, μπορεί να ονομαστεί συμβόλαιο ψηφιακού στοιχείου συμβατό με ERC-223. Μόλις αναπτυχθεί, θα είναι υπεύθυνο να παρακολουθεί τα ψηφιακά στοιχεία που δημιουργήθηκαν στο Ethereum.

Το συμβόλαιο δεν είναι υποχρεωμένο να έχει μόνο αυτές τις λειτουργίες και ένας προγραμματιστής μπορεί να προσθέσει οποιοδήποτε άλλο χαρακτηριστικό από διαφορετικά πρότυπα ψηφιακού στοιχείου σε αυτό το συμβόλαιο. Για παράδειγμα, οι συναρτήσεις `approve` και `transferFrom` δεν αποτελούν μέρος του προτύπου ERC-223, αλλά αυτές οι συναρτήσεις θα μπορούσαν να υλοποιηθούν εάν είναι απαραίτητο.

Από [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Μέθοδοι {#methods}

Το ψηφιακό στοιχείο ERC-223 πρέπει να υποστηρίζει τις ακόλουθες μεθόδους:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Ένα συμβόλαιο που υποτίθεται ότι λαμβάνει ψηφιακά στοιχεία ERC-223 πρέπει να υλοποιεί την ακόλουθη μέθοδο:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Εάν τα ψηφιακά στοιχεία ERC-223 αποστέλλονται σε ένα συμβόλαιο που δεν υλοποιεί τη συνάρτηση `tokenReceived(..)`, τότε η μεταφορά πρέπει να αποτύχει και τα ψηφιακά στοιχεία δεν πρέπει να μετακινηθούν από το υπόλοιπο του αποστολέα.

### Γεγονότα {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Παραδείγματα {#examples}

Το API του ψηφιακού στοιχείου ERC-223 είναι παρόμοιο με αυτό του ERC-20, επομένως από την άποψη της ανάπτυξης UI δεν υπάρχει διαφορά. Η μόνη εξαίρεση εδώ είναι ότι τα ψηφιακά στοιχεία ERC-223 ενδέχεται να μην έχουν συναρτήσεις `approve` + `transferFrom`, καθώς αυτές είναι προαιρετικές για αυτό το πρότυπο.

#### Παραδείγματα Solidity {#solidity-example}

Το ακόλουθο παράδειγμα απεικονίζει τον τρόπο λειτουργίας ενός βασικού συμβολαίου ψηφιακού στοιχείου ERC-223:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Τώρα θέλουμε ένα άλλο συμβόλαιο να δέχεται καταθέσεις του `tokenA`, υποθέτοντας ότι το tokenA είναι ένα ψηφιακό στοιχείο ERC-223. Το συμβόλαιο πρέπει να δέχεται μόνο το tokenA και να απορρίπτει οποιαδήποτε άλλα ψηφιακά στοιχεία. Όταν το συμβόλαιο λαμβάνει το tokenA, πρέπει να εκπέμπει ένα γεγονός `Deposit()` και να αυξάνει την τιμή της εσωτερικής μεταβλητής `deposits`.

Δείτε παρακάτω τον κώδικα:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Συχνές ερωτήσεις {#faq}

### Τι θα συμβεί εάν στείλουμε κάποιο tokenB στο συμβόλαιο; {#sending-tokens}

Η συναλλαγή θα αποτύχει και η μεταφορά των ψηφιακών στοιχείων δε θα πραγματοποιηθεί. Τα κρυπτονομίσματα θα επιστραφούν στη διεύθυνση αποστολέα.

### Πώς μπορούμε να κάνουμε μια κατάθεση σε αυτό το συμβόλαιο; {#contract-deposits}

Καλέστε τη συνάρτηση `transfer(address,uint256)` ή `transfer(address,uint256,bytes)` του ψηφιακού στοιχείου ERC-223, καθορίζοντας τη διεύθυνση του `RecipientContract`.

### Τι θα συμβεί εάν μεταφέρουμε ένα ψηφιακό στοιχείο ERC-20 σε αυτό το συμβόλαιο; {#erc-20-transfers}

Εάν ένα ψηφιακό στοιχείο ERC-20 αποσταλεί στο `RecipientContract`, τα ψηφιακά στοιχεία θα μεταφερθούν, αλλά η μεταφορά δε θα αναγνωριστεί (δε θα ενεργοποιηθεί κανένα συμβάν `Deposit()` και η τιμή των καταθέσεων δε θα αλλάξει). Οι ανεπιθύμητες καταθέσεις ERC-20 δεν μπορούν να φιλτραριστούν ή να αποτραπούν.

### Τι γίνεται αν θέλουμε να εκτελέσουμε κάποια συνάρτηση μετά την ολοκλήρωση της κατάθεσης ψηφιακού στοιχείου; {#function-execution}

Υπάρχουν πολλοί τρόποι για να το κάνετε αυτό. Σε αυτό το παράδειγμα θα ακολουθήσουμε τη μέθοδο που κάνει τις μεταφορές ERC-223 πανομοιότυπες με τις μεταφορές ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Όταν το `RecipientContract` λάβει ένα ψηφιακό στοιχείο ERC-223, το συμβόλαιο θα εκτελέσει μια συνάρτηση κωδικοποιημένη ως παράμετρος `_data` της συναλλαγής ψηφιακού στοιχείου, πανομοιότυπη με τον τρόπο με τον οποίο οι συναλλαγές ether κωδικοποιούν τις κλήσεις συναρτήσεων ως `δεδομένα` συναλλαγών. Διαβάστε το [πεδίο δεδομένων](https://ethereum.org/en/developers/docs/transactions/#the-data-field) για περισσότερες πληροφορίες.

Στο παραπάνω παράδειγμα, ένα ψηφιακό στοιχείο ERC-223 πρέπει να μεταφερθεί στη διεύθυνση του `RecipientContract` με τη συνάρτηση `transfer(address,uin256,bytes calldata _data)`. Εάν η παράμετρος δεδομένων είναι `0xc2985578` (η υπογραφή μιας συνάρτησης `foo()`), τότε η συνάρτηση foo() θα κληθεί μετά τη λήψη της κατάθεσης ψηφιακού στοιχείου και το συμβάν Foo() θα ενεργοποιηθεί.

Οι παράμετροι μπορούν επίσης να κωδικοποιηθούν στα `δεδομένα` της μεταφοράς ψηφιακού στοιχείου, για παράδειγμα μπορούμε να καλέσουμε τη συνάρτηση bar() με την τιμή 12345 για το `_someNumber`. Σε αυτή την περίπτωση το `δεδομένα` πρέπει να είναι `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` όπου `0x0423a132` είναι η υπογραφή της συνάρτησης `bar(uint256)` και το `00000000000000000000000000000000000000000000000000000000000004d2` είναι 12345 ως uint256.

## Περιορισμοί {#limitations}

Ενώ το ERC-223 αντιμετωπίζει διάφορα προβλήματα που εντοπίζονται στο πρότυπο ERC-20, δεν είναι χωρίς τους δικούς του περιορισμούς:

- Υιοθέτηση και Συμβατότητα: Το ERC-223 δεν έχει ακόμη υιοθετηθεί ευρέως, γεγονός που μπορεί να περιορίσει τη συμβατότητά του με τα υπάρχοντα εργαλεία και πλατφόρμες.
- Αντίστροφη Συμβατότητα: Το ERC-223 δεν είναι συμβατό με το ERC-20, που σημαίνει ότι τα υπάρχοντα συμβόλαια και εργαλεία ERC-20 δε θα λειτουργούν με τα ψηφιακά στοιχεία ERC-223 χωρίς τροποποιήσεις.
- Κόστος Gas: Οι πρόσθετοι έλεγχοι και λειτουργίες στις μεταφορές ERC-223 μπορεί να οδηγήσουν σε υψηλότερο κόστος αερίου σε σύγκριση με τις συναλλαγές ERC-20.

## Περαιτέρω υλικό για διάβασμα {#further-reading}

- [EIP-223: Πρότυπο Token ERC-223[(https://eips.ethereum.org/EIPS/eip-223)
- [Αρχική πρόταση ERC-223](https://github.com/ethereum/eips/issues/223)
