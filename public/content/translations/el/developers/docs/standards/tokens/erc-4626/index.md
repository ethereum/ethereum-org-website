---
title: Πρότυπο ERC-4626 ψηφιοποίηση θησαυροφυλακίου
description: Πρότυπο για θησαυροφυλάκια απόδοσης.
lang: el
---

## Εισαγωγή {#introduction}

Το ERC-4626 είναι ένα πρότυπο για τη βελτιστοποίηση και ενοποίηση των τεχνικών παραμέτρων των θησαυροφυλακίων απόδοσης. Παρέχει ένα τυποποιημένο API για tokenized θησαυροφυλάκια απόδοσης που αντιπροσωπεύουν μετοχές ενός ενιαίου υποκείμενου ψηφιακού στοιχείου ERC-20. Το ERC-4626 περιγράφει επίσης μια προαιρετική επέκταση για tokenized θησαυροφυλάκια που χρησιμοποιούν ERC-20, προσφέροντας βασικές λειτουργίες για κατάθεση, ανάληψη token και ανάγνωση υπολοίπων.

**Ο ρόλος του ERC-4626 στα θησαυροφυλάκια απόδοσης**

Οι αγορές δανεισμού, οι λειτουργίες συγκέντρωσης και τα εγγενώς ψηφιακά στοιχεία απόδοσης, βοηθούν τους χρήστες να βρουν την καλύτερη απόδοση στα κρυπτονομίσματά τους εκτελώντας διαφορετικές στρατηγικές. Αυτές οι στρατηγικές γίνονται με μικρές διαφοροποιήσεις, οι οποίες μπορεί να είναι επιρρεπείς σε σφάλματα ή να σπαταλούν πόρους ανάπτυξης.

Το ERC-4626 στα θησαυροφυλάκια απόδοσης θα μειώσει την προσπάθεια ενσωμάτωσης και θα ξεκλειδώσει την πρόσβαση στην απόδοση σε διάφορες εφαρμογές με μικρή εξειδικευμένη προσπάθεια από τους προγραμματιστές δημιουργώντας πιο συνεπή και ισχυρά πρότυπα εφαρμογής.

Το token ERC-4626 περιγράφεται πλήρως στο [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Επέκταση ασύγχρονων θησαυροφυλακίων (ERC-7540)**

Το ERC-4626 είναι βελτιστοποιημένο για ατομικές καταθέσεις και αναλήψεις μέχρι ένα όριο. Αν φτάσει το όριο, δεν μπορούν να υποβληθούν νέες καταθέσεις ή αναλήψεις. Αυτός ο περιορισμός δε λειτουργεί καλά για οποιοδήποτε σύστημα έξυπνων συμβολαίων που απαιτεί ασύγχρονες ενέργειες ή καθυστερήσεις ως προϋπόθεση για τη διασύνδεση με το Θησαυροφυλάκιο (π.χ. πρωτόκολλα πραγματικών περιουσιακών στοιχείων, πρωτόκολλα δανεισμού χωρίς επαρκείς εγγυήσεις, πρωτόκολλα δανεισμού μεταξύ αλυσίδων, tokens ρευστοποίησης συμμετοχής ή ασφαλιστικές μονάδες προστασίας).

Το ERC-7540 επεκτείνει τη χρησιμότητα των Θησαυροφυλακίων ERC-4626 για ασύγχρονες περιπτώσεις χρήσης. Η υπάρχουσα διεπαφή του Θησαυροφυλακίου (`deposit`/`withdraw`/`mint`/`redeem`) χρησιμοποιείται πλήρως για την αξίωση ασύγχρονων Αιτημάτων.

Η επέκταση ERC-7540 περιγράφεται πλήρως στο [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Επέκταση θησαυροφυλακίων πολλαπλών περιουσιακών στοιχείων (ERC-7575)**

Μία περίπτωση χρήσης που λείπει και δεν υποστηρίζεται από το ERC-4626 είναι τα Θησαυροφυλάκια που διαθέτουν πολλαπλά περιουσιακά στοιχεία ή σημεία εισόδου, όπως Tokens Παρόχων Ρευστότητας (LP Tokens). Αυτά γενικά είναι δύσχρηστα ή μη συμβατά λόγω της απαίτησης του ERC-4626 να είναι το ίδιο ένα ERC-20.

Το ERC-7575 προσθέτει υποστήριξη για Θησαυροφυλάκια με πολλαπλά περιουσιακά στοιχεία εξωτερικεύοντας την υλοποίηση του token ERC-20 από την υλοποίηση του ERC-4626.

Η επέκταση ERC-7575 περιγράφεται πλήρως στο [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Προαπαιτούμενα {#prerequisites}

Για να κατανοήσετε καλύτερα αυτή τη σελίδα, σας συνιστούμε να διαβάσετε πρώτα για τα [πρότυπα token](/developers/docs/standards/tokens/), [ERC-721](/developers/docs/standards/tokens/erc-20/).

## ERC-4626 Λειτουργίες και χαρακτηριστικά: {#body}

### Μέθοδοι {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Αυτή η συνάρτηση επιστρέφει τη διεύθυνση του υποκείμενου διακριτικού που χρησιμοποιείται για το θησαυροφυλάκιο για λογιστική, κατάθεση και ανάληψη.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Αυτή η συνάρτηση επιστρέφει το συνολικό ποσό των υποκείμενων περιουσιακών στοιχείων που κατέχονται από το θησαυροφυλάκιο.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Αυτή η συνάρτηση επιστρέφει το ποσό των `shares` που θα ανταλλάσσονταν από το θησαυροφυλάκιο για το ποσό των `assets` που παρέχονται.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Αυτή η συνάρτηση επιστρέφει το ποσό των `shares` που θα ανταλλάσσονταν από το θησαυροφυλάκιο για το ποσό των `assets` που παρέχονται.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Αυτή η συνάρτηση επιστρέφει το μέγιστο ποσό των υποκείμενων περιουσιακών στοιχείων που μπορεί να κατατεθεί σε μία μόνο κλήση του [`deposit`](#deposit) από τον `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Αυτή η λειτουργία επιτρέπει στους χρήστες να προσομοιώνουν τα αποτελέσματα της κατάθεσής τους στο τρέχον μπλοκ.

#### κατάθεση {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Αυτή η συνάρτηση καταθέτει `assets` των υποκείμενων κρυπτονομισμάτων στο θησαυροφυλάκιο και παραχωρεί την κυριότητα των `shares` στον `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Αυτή η συνάρτηση επιστρέφει το μέγιστο ποσό μετοχών που μπορούν να «κοπούν» σε μία κλήση [`mint`](#mint) από τον `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Αυτή η λειτουργία επιτρέπει στους χρήστες να προσομοιώνουν τα αποτελέσματα της «κοπής» τους στο τρέχον μπλοκ.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Αυτή η συνάρτηση «κόβει» ακριβώς `shares` μερίδια θησαυροφυλακίου στον `receiver` καταθέτοντας `assets` των υποκείμενων διακριτικών.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Αυτή η συνάρτηση επιστρέφει το μέγιστο ποσό των υποκείμενων περιουσιακών στοιχείων που μπορούν να γίνουν ανάληψη από το υπόλοιπο του `owner` με μία μόνο κλήση [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Αυτή η λειτουργία επιτρέπει στους χρήστες να προσομοιώνουν τα αποτελέσματα της ανάληψής τους στο τρέχον μπλοκ.

#### ανάληψη {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Αυτή η συνάρτηση «καίει» `shares` από τον `owner` και στέλνει ακριβώς το διακριτικό `assets` από το θησαυροφυλάκιο στον `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Αυτή η συνάρτηση επιστρέφει το μέγιστο ποσό μετοχών που μπορούν να εξαργυρωθούν από το υπόλοιπο του `owner` μέσω μιας κλήσης [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Αυτή η λειτουργία επιτρέπει στους χρήστες να προσομοιώνουν τα αποτελέσματα της εξαργύρωσής τους στο τρέχον μπλοκ.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Αυτή η συνάρτηση εξαργυρώνει έναν συγκεκριμένο αριθμό `shares` από τον `owner` και στέλνει `assets` του υποκείμενου κρυπτονομίσματος από το θησαυροφυλάκιο στον `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Επιστρέφει τον συνολικό αριθμό των μη εξαργυρωμένων μετοχών θησαυροφυλακίου σε κυκλοφορία.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Επιστρέφει το συνολικό ποσό των μετοχών του θησαυροφυλακίου που έχει αυτή τη στιγμή ο `owner`.

### Χάρτης της διεπαφής {#mapOfTheInterface}

![Χάρτης της διεπαφής ERC-4626](./map-of-erc-4626.png)

### Εκδηλώσεις {#events}

#### Πράξη κατάθεσης

**ΠΡΕΠΕΙ** να αποστέλλονται όταν τα κρυπτονομίσματα κατατίθενται στο θησαυροφυλάκιο μέσω του [`mint`](#mint) και τις μεθόδους [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Όπου `sender` είναι ο χρήστης που έκανε την ανταλλαγή `assets` με `shares` και μετέφερε αυτές τις `shares` στον `owner`.

#### Γεγονός ανάληψης

**ΠΡΕΠΕΙ** να αποστέλλονται όταν οι μετοχές αποσύρονται από το θησαυροφυλάκιο από έναν καταθέτη με τις μεθόδους [`redeem`](#redeem) ή [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Όπου `Sender` είναι ο χρήστης που ενεργοποίησε την ανάληψη και αντάλλαξε `shares`, που ανήκουν στον `owner`, με `assets`. Ο `receiver` είναι ο χρήστης που έλαβε τα `assets` που έγιναν ανάληψη.

## Περισσότερες πληροφορίες {#further-reading}

- [ΕΙΡ-4626: Πρότυπο ψηφιοποίησης θησαυροφυλακίου](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Αποθετήριο GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
