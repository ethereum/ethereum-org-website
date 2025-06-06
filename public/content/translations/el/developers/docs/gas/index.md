---
title: Κρατήσεις και τέλη
metaTitle: "Ethereum gas και χρεώσεις: τεχνική επισκόπηση"
description:
lang: el
---

Το «gas» είναι απαραίτητο για το δίκτυο του Ethereum. Είναι το καύσιμο που του επιτρέπει να λειτουργεί, με τον ίδιο τρόπο που ένα αυτοκίνητο χρειάζεται βενζίνη για να λειτουργήσει.

## Προαπαιτούμενα {#prerequisites}

Για να κατανοήσετε καλύτερα αυτή τη σελίδα, σας συνιστούμε να διαβάσετε πρώτα το άρθρο [συναλλαγές](/developers/docs/transactions/) και το [EVM](/developers/docs/evm/).

## Τι είναι το «gas»; {#what-is-gas}

Το «gas» αναφέρεται στη μονάδα που μετρά το ποσό της υπολογιστικής προσπάθειας που απαιτείται για την εκτέλεση συγκεκριμένων εργασιών στο δίκτυο του Ethereum.

Κάθε συναλλαγή στο Ethereum απαιτεί υπολογιστικούς πόρους για να εκτελεστεί καθώς αυτοί οι πόροι πρέπει να πληρωθούν ώστε να διασφαλιστεί ότι το Ethereum δεν είναι ευάλωτο σε επιθέσεις και ότι δε θα κολλήσει σε άπειρες υπολογιστικές λούπες. Η πληρωμή για τους υπολογισμούς πραγματοποιείται με τη μορφή του «gas».

Η χρέωση «gas» είναι η **ποσότητα που χρησιμοποιείται για την εκτέλεση κάποιας λειτουργίας, πολλαπλασιαζόμενη με το κόστος ανά μονάδα «gas»**. Η χρέωση πληρώνεται ανεξάρτητα από το αν η συναλλαγή πραγματοποιηθεί με επιτυχία ή όχι.

![Ένα διάγραμμα που δείχνει πού χρειάζονται κρατήσεις (gas) στις λειτουργίες EVM](./gas.png) _Διάγραμμα προσαρμοσμένο από το [Ethereum EVM που απεικονίζεται](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Οι χρεώσεις «gas» πρέπει να πληρώνονται στο νόμισμα του Ethereum, το ether (ETH). Οι τιμές «gas» συνήθως αναφέρονται σε «gwei», που είναι μια υποδιαίρεση του ETH. Κάθε «gwei» ισούται με το ένα δισεκατομμυριοστό ενός ETH (0.000000001 ETH ή 10<sup>-9</sup> ETH).

Για παράδειγμα, αντί να λέτε ότι τα καύσιμά σας κοστίζουν 0.0000001 ether, μπορείτε να πείτε το κόστος του καυσίμου σας ως 1 gwei.

Η λέξη «gwei» είναι μια συντομογραφία του «giga-wei», που σημαίνει «ένα δισεκατομμύριο wei».  Ένα gwei ισούται με ένα δισεκατομμύριο wei. Το Wei (πήρε το όνομά του από τον [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), τον δημιουργό του [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) είναι η μικρότερη υποδιαίρεση του ETH.

## Πώς υπολογίζονται οι κρατήσεις «gas»; {#how-are-gas-fees-calculated}

Μπορείτε να ορίσετε την ποσότητα gas που είστε διατεθειμένοι να πληρώσετε όταν υποβάλετε μια συναλλαγή. Προσφέροντας μια συγκεκριμένη ποσότητα gas, υποβάλλετε προσφορά ώστε η συναλλαγή σας να συμπεριληφθεί στο επόμενο μπλοκ. Εάν προσφέρετε πολύ λίγα, οι επικυρωτές είναι λιγότερο πιθανό να επιλέξουν τη συναλλαγή σας για συμπερίληψη, πράγμα που σημαίνει ότι η συναλλαγή σας μπορεί να εκτελεστεί καθυστερημένα ή καθόλου. Εάν προσφέρετε υπερβολικά, μπορεί να σπαταλήσετε μερικά ETH. Λοιπόν, πώς μπορείτε να υπολογίσετε πόσο πρέπει να πληρώσετε;

Το συνολικό gas που πληρώνετε διαιρείται σε δύο μέρη: το `βασικό τέλος` και το `τέλος προτεραιότητας` (φιλοδώρημα).

Το `βασικό τέλος` ορίζεται από το πρωτόκολλο - πρέπει να πληρώσετε τουλάχιστον αυτό το ποσό για να θεωρηθεί έγκυρη η συναλλαγή σας. Το `τέλος προτεραιότητας` είναι ένα φιλοδώρημα που προσθέτετε στο βασικό τέλος για να κάνετε τη συναλλαγή σας ελκυστική για τους επικυρωτές, ώστε να την επιλέξουν για συμπερίληψη στο επόμενο μπλοκ.

Μια συναλλαγή που πληρώνει μόνο το `βασικό τέλος` είναι τεχνικά έγκυρη, αλλά είναι απίθανο να συμπεριληφθεί, επειδή δεν προσφέρει κίνητρο στους επικυρωτές να την επιλέξουν έναντι οποιασδήποτε άλλης συναλλαγής. Το «σωστό» τέλος `προτεραιότητας` καθορίζεται από τη χρήση του δικτύου τη στιγμή που στέλνετε τη συναλλαγή σας — εάν υπάρχει μεγάλη ζήτηση, ίσως χρειαστεί να ορίσετε υψηλότερο τέλος `προτεραιότητας`, αλλά όταν υπάρχει μικρότερη ζήτηση, μπορείτε να πληρώσετε λιγότερα.

Για παράδειγμα, ας υποθέσουμε ότι ο Jordan πρέπει να πληρώσει την Taylor 1 ETH. Μια μεταφορά ETH απαιτεί 21.000 μονάδες gas, και η βασική χρέωση είναι 10 gwei. Ο Jordan περιλαμβάνει ένα φιλοδώρημα από 2 gwei.

Η συνολική χρέωση θα ισούται τώρα με:

`μονάδες gas που χρησιμοποιούνται * (βασική τέλος + αμοιβή προτεραιότητας)`

όπου το `βασικό τέλος` είναι μια τιμή που ορίζεται από το πρωτόκολλο και το `τέλος προτεραιότητας` είναι μια τιμή που ορίζεται από τον χρήστη ως φιλοδώρημα προς τον επικυρωτή.

π.χ. `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Όταν ο Jordan στείλει τα χρήματα, 1.000252 ETH θα αφαιρεθεί από τον λογαριασμό του. Ο Taylor θα πιστωθεί 1.0000 ETH. Ο επικυρωτής λαμβάνει το φιλοδώρημα των 0.000042 ETH. Το `βασικό τέλος` 0,00021 ETH καίγεται.

### Βασικό τέλος {#base-fee}

Κάθε μπλοκ έχει ένα βασικό τέλος που λειτουργεί ως τιμή αποθεματικού. Για να είναι επιλέξιμη για συμπερίληψη σε ένα μπλοκ, η προσφερόμενη τιμή ανά καύσιμο πρέπει τουλάχιστον να ισούται με το βασικό τέλος. Το βασικό τέλος υπολογίζεται ανεξάρτητα από το τρέχοντα μπλοκ και καθορίζεται από τα μπλοκ πριν από αυτό, κάνοντας τα τέλη συναλλαγών πιο προβλέψιμα για τους χρήστες. Όταν δημιουργείται το μπλοκ, αυτό το **βασικό τέλος «καίγεται»**, και αφαιρείται από την κυκλοφορία.

Το βασικό τέλος υπολογίζεται με έναν τύπο που συγκρίνει το μέγεθος του προηγούμενου μπλοκ (την ποσότητα gas που χρησιμοποιήθηκε για όλες τις συναλλαγές) με το μέγεθος-στόχο. Το βασικό τέλος θα αυξηθεί κατά 12,5% κατ' ανώτατο όριο ανά μπλοκ, εάν ξεπεραστεί το μέγεθος αυτού του μπλοκ. Αυτή η εκθετική ανάπτυξη καθιστά οικονομικά μη βιώσιμο το μέγεθος του μπλοκ να παραμένει υψηλό επ' αόριστον.

| Αριθμός Μπλοκ | Περιλαμβάνονται οι κρατήσεις | Αύξηση τελών | Τρέχων βασικό τέλος |
| ------------- | ----------------------------:| ------------:| -------------------:|
| 1             |                          15M |           0% |            100 gwei |
| 2             |                          30M |           0% |            100 gwei |
| 3             |                          30M |        12.5% |          112.5 gwei |
| 4             |                          30M |        12.5% |          126.6 gwei |
| 5             |                          30M |        12.5% |          142.4 gwei |
| 6             |                          30M |        12.5% |          160.2 gwei |
| 7             |                          30M |        12.5% |          180.2 gwei |
| 8             |                          30M |        12.5% |          202.7 gwei |

Ακολουθώντας τον παραπάνω πίνακα — για να δημιουργήσετε μια συναλλαγή στο μπλοκ αριθμός 9, ένα πορτοφόλι θα ενημερώσει τον χρήστη με βεβαιότητα ότι το **μέγιστο βασικό τέλος** που θα προστεθεί στο επόμενο μπλοκ είναι το `τρέχον βασικό τέλος * 112,5%` ή `202,7 gwei * 112,5% = 228,1 gwei`.

Είναι επίσης σημαντικό να σημειωθεί ότι είναι απίθανο να δούμε εκτεταμένες κατακόρυφες αυξήσεις πλήρων μπλοκ λόγω της ταχύτητας με την οποία αυξάνεται το βασικό τέλος πριν από ένα πλήρες μπλοκ.

| Αριθμός Μπλοκ | Περιλαμβάνονται οι κρατήσεις | Αύξηση τελών | Τρέχων βασικό τέλος |
| ------------- | ----------------------------:| ------------:| -------------------:|
| 30            |                          30M |        12.5% |         2705.6 gwei |
| ...           |                          ... |        12.5% |                 ... |
| 50            |                          30M |        12.5% |        28531.3 gwei |
| ...           |                          ... |        12.5% |                 ... |
| 100           |                          30M |        12.5% |     10302608.6 gwei |

### Τέλος προτεραιότητας (φιλοδώρημα) {#priority-fee}

Το τέλος προτεραιότητας (φιλοδώρημα) δίνει κίνητρα στους επικυρωτές να συμπεριλάβουν μια συναλλαγή στο μπλοκ. Χωρίς φιλοδωρήματα, οι επικυρωτές θα θεωρούσαν οικονομικά βιώσιμο την εξόρυξη κενών μπλοκ, καθώς θα λάμβαναν την ίδια ανταμοιβή μπλοκ. Τα μικρά φιλοδωρήματα δίνουν στους επικυρωτές ένα ελάχιστο κίνητρο να συμπεριλάβουν μια συναλλαγή. Για συναλλαγές που θέλατε να εκτελούνται κατά προτίμηση πριν από άλλες συναλλαγές στο ίδιο μπλοκ, μπορεί να προστεθεί ένα υψηλότερο φιλοδώρημα για να προσπαθήσετε να πλειοδοτήσετε έναντι των ανταγωνιστικών συναλλαγών.

### Μέγιστη χρέωση {#maxfee}

Για την εκτέλεση μιας συναλλαγής στο δίκτυο, οι χρήστες μπορούν να καθορίσουν ένα μέγιστο όριο που είναι διατεθειμένοι να πληρώσουν για να εκτελεστεί η συναλλαγή τους. Αυτή η προαιρετική παράμετρος είναι γνωστή ως `μέγιστο τέλος ανά gas (maxFeePerGas)`. Για να εκτελεστεί μια συναλλαγή, το μέγιστο τέλος πρέπει να υπερβαίνει το άθροισμα του βασικού τέλους και του φιλοδωρήματος. Στον αποστολέα της συναλλαγής επιστρέφεται η διαφορά μεταξύ του μέγιστου τέλους και του αθροίσματος του βασικού τέλους και φιλοδωρήματος.

### Μέγεθος μπλοκ {#block-size}

Κάθε μπλοκ έχει ένα μέγεθος στόχο 15 εκατομμύρια καύσιμα, αλλά το μέγεθος των μπλοκ θα αυξάνεται ή θα μειώνεται σύμφωνα με τη ζήτηση του δικτύου, μέχρι το όριο μπλοκ των 30 εκατομμυρίων καύσιμων (2x το μέγεθος του στόχου μπλοκ). Το πρωτόκολλο επιτυγχάνει ένα μέσο μέγεθος μπλοκ 15 εκατομμυρίων μέσω της διαδικασίας του _tâtonnement_. Αυτό σημαίνει ότι εάν το μέγεθος του μπλοκ είναι μεγαλύτερο από το μέγεθος του μπλοκ που στοχεύουμε, το πρωτόκολλο θα αυξήσει το βασικό τέλος για το επόμενο μπλοκ. Ομοίως, το πρωτόκολλο θα μειώσει τα βασικά τέλη εάν το μέγεθος του μπλοκ είναι μικρότερο από το μέγεθος του στόχου μπλοκ. Το ποσό με το οποίο προσαρμόζεται το βασικό τέλος είναι ανάλογο με το πόσο απέχει το τρέχον μέγεθος μπλοκ από τον στόχο. [Περισσότερα για τα μπλοκ](/developers/docs/blocks/).

### Υπολογισμός κρατήσεων «gas» στην πράξη {#calculating-fees-in-practice}

Μπορείτε να δηλώσετε ρητά πόσα είστε διατεθειμένοι να πληρώσετε για να εκτελεστεί η συναλλαγή σας. Ωστόσο, οι περισσότεροι πάροχοι πορτοφολιών ορίζουν αυτόματα ένα προτεινόμενο τέλος συναλλαγής (βασικό τέλος + προτεινόμενο τέλος προτεραιότητας) για να μειώσουν την πολυπλοκότητα για τους χρήστες τους.

## Γιατί υπάρχουν τα τέλη «gas»; {#why-do-gas-fees-exist}

Εν ολίγοις, τα τέλη καυσίμου βοηθούν στη διατήρηση του δικτύου Ethereum ασφαλή. Με το να απαιτείται αμοιβή για κάθε υπολογισμό που εκτελείται στο δίκτυο, αποτρέπουμε τους κακούς χρήστες από το να διαπράξουν κακόβουλες ενέργειες στο δίκτυο. Για την αποφυγή τυχαίων ή εχθρικών άπειρων βρόχων ή άλλης υπολογιστικής σπατάλης στον κώδικα, κάθε συναλλαγή απαιτείται να θέσει ένα όριο στο πόσα υπολογιστικά βήματα εκτέλεσης κώδικα μπορεί να χρησιμοποιήσει. Η θεμελιώδης μονάδα υπολογισμού είναι το «gas».

Παρόλο που μια συναλλαγή περιλαμβάνει ένα όριο, τυχόν gas που δεν χρησιμοποιείται σε μια συναλλαγή επιστρέφεται στον χρήστη (δηλαδή επιστρέφεται `μέγιστο τέλος - (βασικό τέλος + φιλοδώρημα)`).

![Διάγραμμα που δείχνει τον τρόπο επιστροφής των αχρησιμοποίητων gas](../transactions/gas-tx.png) _Διάγραμμα προσαρμοσμένο από το [Ethereum EVM που απεικονίζεται](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Ποιο είναι το όριο «gas»; {#what-is-gas-limit}

Το όριο gas αναφέρεται στη μέγιστη ποσότητα gas που είστε διατεθειμένοι να καταναλώσετε σε μια συναλλαγή. Οι πιο περίπλοκες συναλλαγές που περιλαμβάνουν [έξυπνα συμβόλαια](/developers/docs/smart-contracts/) απαιτούν περισσότερη υπολογιστική εργασία, επομένως απαιτούν υψηλότερο όριο gas από μια απλή πληρωμή. Μια τυπική μεταφορά ETH απαιτεί όριο gas 21.000 μονάδων gas.

Για παράδειγμα, αν βάλετε όριο gas 50.000 για μια απλή μεταφορά ETH, το EVM θα καταναλώσει 21.000 και θα λάβετε πίσω τα υπόλοιπα 29.000. Ωστόσο, εάν καθορίσετε πολύ λίγο gas, για παράδειγμα, όριο gas 20.000 για μια απλή μεταφορά ETH, η συναλλαγή θα αποτύχει κατά τη φάση επικύρωσης. Θα απορριφθεί πριν συμπεριληφθεί σε ένα μπλοκ και δε θα καταναλωθεί gas. Από την άλλη πλευρά, εάν μια συναλλαγή εξαντληθεί από gas κατά την εκτέλεση (π.χ., ένα έξυπνο συμβόλαιο καταναλώνει όλο το gas μέχρι τη μέση), το EVM θα επαναφέρει τυχόν αλλαγές, αλλά όλο το παρεχόμενο gasθα εξακολουθεί να καταναλώνεται για την εργασία που εκτελείται.

## Γιατί μπορούν τα τέλη gas να είναι τόσο υψηλά; {#why-can-gas-fees-get-so-high}

Τα υψηλά τέλη gas οφείλονται στη δημοτικότητα του Ethereum. Εάν υπάρχει υπερβολική ζήτηση, οι χρήστες πρέπει να προσφέρουν υψηλότερα ποσά φιλοδωρήματος για να προσπαθήσουν να πλειοδοτήσουν έναντι των συναλλαγών άλλων χρηστών. Ένα υψηλότερο φιλοδώρημα μπορεί να κάνει πιο πιθανή τη συμπερίληψη της συναλλαγής σας στο επόμενο μπλοκ. Επίσης, οι πιο σύνθετες εφαρμογές έξυπνων συμβολαίων μπορεί να εκτελούν πολλές λειτουργίες για να υποστηρίξουν τις λειτουργίες τους, καταναλώνοντας έτσι πολύ gas.

## Πρωτοβουλίες για μείωση του κόστους gas {#initiatives-to-reduce-gas-costs}

Οι [αναβαθμίσεις επεκτασιμότητας](/roadmap/) του Ethereum θα πρέπει τελικά να αντιμετωπίσουν ορισμένα από τα ζητήματα των τελών gas, τα οποία, με τη σειρά τους, θα επιτρέψουν στην πλατφόρμα να επεξεργάζεται χιλιάδες συναλλαγές ανά δευτερόλεπτο και να κλιμακωθεί παγκοσμίως.

Η κλιμάκωση του επιπέδου 2 είναι μια βασική πρωτοβουλία για τη σημαντική βελτίωση του κόστους gas, της εμπειρίας χρήστη και της επεκτασιμότητας. [Περισσότερα για την κλιμάκωση των επιπέδων 2](/developers/docs/scaling/#layer-2-scaling).

## Παρακολούθηση τελών gas {#monitoring-gas-fees}

Εάν θέλετε να παρακολουθείτε τις τιμές του gas, ώστε να μπορείτε να στείλετε τα ETH σας για λιγότερα, μπορείτε να χρησιμοποιήσετε πολλά διαφορετικά εργαλεία όπως:

- [Etherscan](https://etherscan.io/gastracker) _Εκτιμητής τιμής gas συναλλαγής_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Παρακολουθήστε και ελέγξτε το Ethereum και τις τιμές gas L2 για να μειώσετε τα τέλη συναλλαγής και να εξοικονομήσετε χρήματα_
- [Εκτιμητής ETH Gas Blocknative](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Επέκταση Chrome εκτίμησης gas που υποστηρίζει συναλλαγές παλαιού τύπου 0 και συναλλαγές τύπου 2 EIP-1559._
- [Υπολογιστής τελών Gas Cryptoneur](https://www.cryptoneur.xyz/gas-fees-calculator) _Υπολογίστε τις χρεώσεις gas στο τοπικό σας νόμισμα για διαφορετικούς τύπους συναλλαγών σε Mainnet, Arbitrum και Polygon._

## Σχετικά εργαλεία {#related-tools}

- [Πλατφόρμα gas Blocknative](https://www.blocknative.com/gas) _API εκτίμησης gas που υποστηρίζεται από την παγκόσμια πλατφόρμα δεδομένων mempool της Blocknative_

## Περισσότερες πληροφορίες {#further-reading}

- [Επεξήγηση του gas στο Ethereum](https://defiprime.com/gas)
- [Μείωση της κατανάλωσης gas των έξυπνων συμβολαίων σας](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Απόδειξη Συμμετοχής ή Απόδειξης Εργασίας](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Στρατηγικές βελτιστοποίησης gas για Προγραμματιστές](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Έγγραφα EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Πόροι EIP-1559 του Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Διαχωρίζοντας Μηχανισμούς από Μιμίδια](https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
