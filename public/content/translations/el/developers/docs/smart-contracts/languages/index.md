---
title: Γλώσσες προγραμματισμού Έξυπνων Συμβολαίων
description: Μια επισκόπηση και σύγκριση των δύο κύριων γλωσσών προγραμματισμού έξυπνων συμβολαίων τις Solidity και Vyper.
lang: el
---

Ένα μεγάλο πλεονέκτημα του Ethereum είναι ότι τα έξυπνα συμβόλαια μπορούν να δημιουργηθούν με φιλικές στη χρήση γλώσσες προγραμματισμού. Εάν έχετε εμπειρία με την Python ή [παρόμοια γλώσσα](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), μπορείτε να βρείτε μια γλώσσα με οικεία προς εσάς σύνταξη.

Οι δύο κεντρικές και ενεργές γλώσσες είναι:

- Solidity
- Vyper

Το Remix IDE παρέχει ένα ολοκληρωμένο περιβάλλον ανάπτυξης για τη δημιουργία και τη δοκιμή συμβολαίων τόσο στο Solidity όσο και στο Vyper. [Δοκιμάστε το Remix IDE του προγράμματος περιήγησης](https://remix.ethereum.org) για να ξεκινήσετε την κωδικοποίηση.

Οι πιο έμπειροι προγραμματιστές μπορούν να χρησιμοποιήσουν τη Yul, μια ενδιάμεση γλώσσα για την [εικονική μηχανή Ethereum](/developers/docs/evm/), ή τη Yul+ μια επέκταση της Yul.

Αν είστε περίεργοι και σας αρέσει να βοηθάτε με τη δοκιμή νέων γλωσσών που είναι ακόμα υπό ανάπτυξη, μπορείτε να πειραματιστείτε με την Fe, μια νέα γλώσσα για έξυπνα συμβόλαια η οποία είναι ακόμα στα σπάργανα.

## Προαπαιτούμενα {#prerequisites}

Τυχών προηγούμενη εμπειρία με γλώσσες προγραμματισμού, ειδικά με τις JavaScript ή Python, μπορεί να σας βοηθήσει σημαντικά στον προγραμματισμό των έξυπνων συμβολαίων. Σας συνιστούμε επίσης να κατανοήσετε τα έξυπνα συμβόλαια ως έννοια πριν ξεκινήσετε με τη σύγκριση γλωσσών. [Εισαγωγή στα έξυπνα συμβόλαια](/developers/docs/smart-contracts/).

## Η Solidity {#solidity}

- Αντικειμενοστραφής, υψηλού επιπέδου γλώσσα προγραμματισμού για την υλοποίηση έξυπνων συμβολαίων.
- Γλώσσα Curly-bracket βαθιά επηρεασμένη από την C++.
- Στατική πληκτρολόγηση (ο τύπος μια μεταβλητής γνωστοποιείται μετά τη μεταγλώττιση).
- Υποστήριξη:
  - Κληρονομικότητα (μπορείτε να επεκτείνετε άλλα συμβόλαια).
  - Βιβλιοθήκες (μπορείτε να δημιουργήσετε επαναχρησιμοποιήσιμο κώδικα που μπορείτε να καλέσετε από διαφορετικά συμβόλαια – όπως κάποιες στατικές λειτουργίες σε μια στατική κλάση σε αντικείμενο άλλης γλώσσας προγραμματισμού).
  - Σύνθετοι τύποι καθορισμένοι από τον χρήστη.

### Σημαντικοί σύνδεσμοι {#important-links}

- [Έγγραφα](https://docs.soliditylang.org/en/latest/)
- [Πύλη γλώσσας Solidity](https://soliditylang.org/)
- [Παραδείγματα με Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- Το [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) συνδέθηκε στο [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Φύλλο σημειώσεων](https://reference.auditless.com/cheatsheet)
- [Ιστολόγιο της Solidity](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Παράδειγμα συμβολαίου {#example-contract}

```solidity
// Αναγνωριστικό-Άδεια-SPDX: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Η λέξη-κλειδί "public" δημιουργεί μεταβλητές
    // αποδεκτές από άλλα συμβόλαια
    address public minter;
    mapping (address => uint) public balances;

    // Τα γεγονότα επιτρέπουν στου πελάτες να αντιδράσει σε συγκεκριμένες
    // αλλαγές συμβολαίων που δηλώνετε
    event Sent(address from, address to, uint amount);

    // Ο κώδικας κατασκευαστή εκτελείτε μόνο όταν το συμβόλαιο
    // δημιουργείτε
    constructor() {
        minter = msg.sender;
    }

    // Αποστολή νέων κρυπτονομισμάτων σε μια διεύθυνση
    // Μπορεί να κληθεί μόνο από τον συντάκτη του συμβολαίου
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Αποστολή υπαρχόντων κρυπτονομσμάτων
    // από οποιονδήποτε επικαλεστεί τη διεύθυνση
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Αυτό το παράδειγμα θα σας δώσει ένα δείγμα σύνταξης συμβολαίου με τη Solidity. Για περισσότερη λεπτομερή περιγραφή των λειτουργιών και των μεταβλητών, [δείτε την τεκμηρίωση](https://docs.soliditylang.org/en/latest/contracts.html).

## Η Vyper {#vyper}

- Κοινά χαρακτηριστικά με τη Python
- Ισχυρή τυποποίηση
- Μικρός και κατανοητός κώδικας μεταγλώττισης
- Αποτελεσματική παραγωγή bytecode
- Έχει εσκεμμένα λιγότερα χαρακτηριστικά από τη Solidity με στόχο να καταστήσει τα συμβόλαια ασφαλέστερα και ευκολότερα στον έλεγχο. Η Vyper δεν υποστηρίζει:
  - Τροποποιητές
  - Κληρονομικότητα
  - Ενσωματωμένο συναρμολογητή
  - Υπερφόρτωση μεθόδων
  - Υπερφόρτωση τελεστών
  - Επανάληψη κλήσεων
  - Επανάληψη βρόγχων χωρίς όριο
  - Δυαδικά καθορισμένα σημεία

Για περισσότερες πληροφορίες, [διαβάστε το σκεπτικό της Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Σημαντικοί σύνδεσμοι {#important-links-1}

- [Τεκμηρίωση](https://vyper.readthedocs.io)
- [Παραδείγματα Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Περισσότερη Vyper από παράδειγμα](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Συνομιλία στο Discord της κοινότητας Vyper](https://discord.gg/SdvKC79cJk)
- [Φύλλο σημειώσεων](https://reference.auditless.com/cheatsheet)
- [Πλαίσια και εργαλεία ανάπτυξης έξυπνων συμβολαίων για Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - μάθετε να ασφαλίζετε και να χακάρετε τα έξυπνα συμβόλαια Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - παραδείγματα ευπάθειας Vyper](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub για ανάπτυξη](https://github.com/zcor/vyper-dev)
- [Παραδείγματα μεγαλύτερων επιτυχιών των έξυπνων συμβολαίων Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Καταπληκτικοί πόροι επιμελημένοι από τη Vyper](https://github.com/spadebuilders/awesome-vyper)

### Παράδειγμα {#example}

```python
# Ανοιχτή δημοπρασία

# Παράμετροι δημοπρασίας
# Ο δικαιούχος λαμβάνει χρήματα από τον υψηλότερο πλειοδότη
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Τρέχουσα κατάσταση δημοπρασίας
highestBidder: public(address)
highestBid: public(uint256)

# Εάν οριστεί σε αληθές (true) στο τέλος, δεν επιτρέπει αλλαγές
ended: public(bool)

# Παρακολουθήστε τις επιστροφές των προσφορών, ώστε να ακολουθήσουμε το μοτίβο ανάληψης
pendingReturns: public(HashMap[address, uint256])

# Δημιουργία απλού πλειστηριασμού με `_bidding_time`
# χρόνος υποβολής προσφορών για λογαριασμό της
# διεύθυνσης δικαιούχου `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Υποβολή προσφορών στη δημοπρασία με αποστολή της αξίας
# μαζί με τη συναλλαγή.
# Το ποσό θα επιστραφεί μόνο εάν
# δεν κερδηθεί η δημοπρασία.
@external
@payable
def bid():
    # Έλεγχος εάν έληξε ο χρόνος υποβολής προσφοράς.
    assert block.timestamp < self.auctionEnd
    # Έλεγχος εάν η προσφορά είναι αρκετή
    assert msg.value > self.highestBid
    # Παρακολούθηση της επιστροφής της προηγούμενης υψηλής προσφοράς
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Παρακολούθηση νέας υψηλότερης προσφοράς
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Ανάληψη προηγούμενης επιστρεφόμενης προσφοράς. Το μοτίβο ανάληψης
# χρησιμοποιείται για αποφυγή σφαλμάτων ασφαλείας. Εάν οι επιστροφές έγιναν απευθείας και
# στάλθηκαν ως μέρος της προσφοράς(), ένα κακόβουλο συμβόλαιο μπορεί να
# εμποδίσει αυτές τις επιστροφές και τα κομμάτια να ολοκληρωθούν.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Ολοκλήρωση της δημοπρασίας και αποστολή της
# υψηλότερης προσφοράς στο δικαιούχο.
@external
def endAuction():
    # Ένας καλός οδηγός κατασκευής μεταβλητών που αλληλεπιδρούν
    # με άλλα συμβόλαια (π.χ. κλήση μεταβλητών ή μεταφορά ether)
    # να χωρίζεται σε τρεις φάσεις:
    # 1. έλεγχος συνθηκών
    # 2. εκτέλεση ενεργειών (πιθανές αλλαγές συνθηκών)
    # 3. αλληλεπίδραση με άλλα συμβόλαια
    # Εάν οι φάσεις αναμειγνύονται, το άλλο συμβόλαιο μπορεί να καλέσει
    # πίσω στο τρέχων συμβόλαιο και να τροποποιήσει την κατάσταση που
    # προκάλεσε το θέμα (πληρωμή ether) για να εκτελεστεί πολλές φορές.
    # Εάν οι εσωτερικές μεταβλητές περιλαμβάνουν σχέση με εξωτερικά
    # συμβόλαια, πρέπει να ληφθούν ως αλληλεπίδραση με
    # εξωτερικά συμβόλαια.

    # 1. Προϋποθέσεις
    # Ελέγξτε το χρόνο λήξης της δημοπρασίας
    assert block.timestamp >= self.auctionEnd
    # Ελέγξτε εάν αυτή η μεταβλητή έχει ήδη κληθεί
    assert not self.ended

    # 2. Επηρεασμοί
    self.ended = True

    # 3. Αλληλεπίδραση
    send(self.beneficiary, self.highestBid)
```

Αυτό το παράδειγμα θα σας δώσει ένα δείγμα σύνταξης συμβολαίου με τη Vyper. Για περισσότερη λεπτομερή περιγραφή των λειτουργιών και των μεταβλητών, [δείτε την τεκμηρίωση](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul και Yul+ {#yul}

Αν είστε καινούργιοι στο Ethereum και δεν έχετε χρησιμοποιήσει τις γλώσσες έξυπνων συμβολαίων ακόμα, σας συνιστούμε να ξεκινήσετε με την Solidity ή τη Vyper. Ξεκινήστε με τις Yul ή Yul+ και μόλις εξοικειωθείτε με τις βέλτιστες πρακτικές ασφάλειας έξυπνων συμβολαίων και τις ιδιαιτερότητες της αλληλεπίδρασης με το EVM.

**Yul**

- Μια μέση γλώσσα προγραμματισμού για το Ethereum.
- Υποστηρίζει το [EVM](/developers/docs/evm) και το [Ewasm](https://github.com/ewasm), ένα Ethereum με στοιχεία WebAssembly και σχεδιασμό να λειτουργεί ως κοινός παρονομαστής μεταξύ των δύο πλατφορμών.
- Ένας καλός στόχος για υψηλού επιπέδου στάδια βελτιστοποίησης που μπορούν να ωφελήσουν εξίσου τις πλατφόρμες EVM και eWASM.

**Yul+**

- Μια χαμηλού επιπέδου και ιδιαίτερα αποτελεσματική επέκταση της Yul.
- Αρχικά σχεδιασμένη για συμβόλαια [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- Η Yul+ μπορεί να εξεταστεί ως μια πειραματική πρόταση αναβάθμισης της Yul, προσθέτοντας νέα χαρακτηριστικά.

### Σημαντικοί σύνδεσμοι {#important-links-2}

- [Τεκμηρίωση Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Τεκμηρίωση Yul+](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Yul+ Εισαγωγικό κείμενο](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Παράδειγμα συμβολαίου {#example-contract-2}

Το παρακάτω απλό παράδειγμα υλοποιεί μια λειτουργία ισχύος. Μπορεί να μεταγλωττιστεί με χρήση του `solc --strict-assembly --bin input.yul`. Το παράδειγμα θα πρέπει να αποθηκευθεί στο αρχείο input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Αν είστε ήδη εξοικειωμένοι με τα έξυπνα συμβόλαια, μια πλήρης εφαρμογή ERC20 με τη Yul μπορεί να βρεθεί [εδώ](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Στατική γλώσσα για την Εικονική Μηχανή του Ethereum (EVM).
- Εμπνευσμένη από την Python και τη Rust.
- Στοχεύει στην εύκολη εκμάθηση -- ακόμα και για προγραμματιστές που είναι νέοι στο οικοσύστημα του Ethereum.
- Η ανάπτυξη της Fe είναι ακόμα στα αρχικά της στάδια, η γλώσσα δημοσίευσε την άλφα έκδοσή της τον Ιανουάριο του 2021.

### Σημαντικοί σύνδεσμοι {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Ανακοινώσεις Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 χρονοδιάγραμμα](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Συνομιλία Fe Discord](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Παράδειγμα συμβολαίου {#example-contract-3}

Δείτε παρακάτω ένα απλό συμβόλαιο γραμμένο με τη FE.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Πώς να επιλέξετε {#how-to-choose}

Όπως και με κάθε άλλη γλώσσα προγραμματισμού, πρόκειται κυρίως για την επιλογή του κατάλληλου εργαλείου για τη σωστή εργασία αλλά και σύμφωνα με τις προσωπικές προτιμήσεις.

Δείτε παρακάτω μερικά στοιχεία προς εξέταση εάν δεν έχετε δοκιμάσει ακόμη καμία από τις γλώσσες:

### Τι κάνει σπουδαία τη Solidity; {#solidity-advantages}

- Αν είστε αρχάριος, μπορείτε να βρείτε πολλούς οδηγούς και εργαλεία εκμάθησης. Δείτε περισσότερα σχετικά με αυτό στην ενότητα [Μάθετε προγραμματίζοντας](/developers/learning-tools/).
- Διαθέσιμα εργαλεία προγραμματιστών.
- Η Solidity έχει μια μεγάλη κοινότητα προγραμματιστών, πράγμα που σημαίνει ότι πιθανότατα θα βρείτε απαντήσεις αρκετά γρήγορα.

### Τι κάνει σπουδαία τη Vyper; {#vyper-advatages}

- Εξαιρετικός τρόπος για να ξεκινήσετε προγραμματισμό με τη Python στη σύνταξη έξυπνων συμβολαίων.
- Η Vyper έχει μικρότερο αριθμό χαρακτηριστικών που το καθιστά σημαντικό στη γρήγορη πρωτοτυποποίηση ιδεών.
- Η Vyper στοχεύει να γίνει εύκολη στον έλεγχο και μέγιστα αναγνώσιμη από τον άνθρωπο.

### Τι κάνει σπουδαίες τις Yul και Yul+; {#yul-advantages}

- Απλουστευμένη και λειτουργική γλώσσα χαμηλού επιπέδου.
- Επιτρέπει να πλησιάσετε πολύ περισσότερο την επεξεργασία του EVM, όπου μπορεί να βοηθήσει στη βελτιστοποίηση του κόστους χρήσης των συμβολαίων.

## Συγκρίσεις γλωσσών {#language-comparisons}

Για συγκρίσεις της βασικής σύνταξης, του κύκλου ζωής των συμβολαίων, διεπαφές, χειριστές, των δομών δεδομένων, των λειτουργιών, της ροής ελέγχου και άλλα περισσότερα ελέγξτε το [φύλλο σημειώσεων από Auditless](https://reference.auditless.com/cheatsheet/)

## Περισσότερες πληροφορίες {#further-reading}

- [Βιβλιοθήκη Συμβολαίων Solidity του OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Παραδείγματα με Solidity](https://solidity-by-example.org)
