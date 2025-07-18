---
title: Προσθήκη επιπέδου 2s
description: Η πολιτική που χρησιμοποιούμε κατά την προσθήκη ενός επιπέδου 2 στο ethereum.org
lang: el
---

# Προσθήκη επιπέδου 2s {#adding-layer-2}

Θέλουμε να βεβαιωθούμε ότι παραθέτουμε τους καλύτερους δυνατούς πόρους, ώστε οι χρήστες να μπορούν να πλοηγούνται στον χώρο του επιπέδου 2 με ασφάλεια και σιγουριά.

Οποιοσδήποτε μπορεί να προτείνει ελεύθερα την προσθήκη ενός επιπέδου 2 στο ethereum.org. Αν υπάρχει κάποιο επίπεδο 2 που μας έχει διαφύγει, **[προτείνετέ το](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

Αυτή τη στιγμή καταχωρούμε L2 στις ακόλουθες σελίδες:

- [Πακέτα ενημέρωσης optimistic](/developers/docs/scaling/optimistic-rollups/)
- [Rollup μηδενικής γνώσης](/developers/docs/scaling/zk-rollups/)
- [Επίπεδο 2](/layer-2/)

Το επίπεδο 2 είναι ένα σχετικά νέο και συναρπαστικό υπόδειγμα για το Ethereum. Προσπαθήσαμε να δημιουργήσουμε ένα δίκαιο πλαίσιο προς εξέταση στο ethereum.org, αλλά τα κριτήρια καταχώρισης θα αλλάξουν και θα εξελιχθούν με την πάροδο του χρόνου.

## Το πλαίσιο λήψης αποφάσεων {#decision-framework}

### Κριτήρια για ένταξη: τα απαραίτητα {#criteria-for-inclusion-the-must-haves}

**Δημοσίευση στο L2BEAT**

- Για να ληφθεί υπόψη, αυτό το έργο πρέπει να καταχωρηθεί στο [L2BEAT](https://l2beat.com). Το L2BEAT παρέχει μια ισχυρή εκτίμηση κινδύνου για έργα επιπέδου 2 στην οποία βασιζόμαστε για την αξιολόγηση έργων L2. **Εάν το έργο δεν εμφανίζεται στο L2BEAT, δεν θα το καταχωρήσουμε ως L2 στο ethereum.org.**
- [Μάθε πώς μπορείς να προσθέσεις το έργο L2 σου στο L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**Ανοιχτού κώδικα**

- Ο κώδικάς σας πρέπει να είναι προσβάσιμος και θα πρέπει να δέχεστε PR από την ευρύτερη κοινότητα.

**Κατηγορία επιπέδου 2**

Επί του παρόντος θεωρούμε ότι οι ακόλουθες λύσεις είναι επίπεδου 2:

- Πακέτο ενημέρωσης optimistic
- Πακέτο ενημέρωσης μηδενικής γνώσης

_Δεν θεωρούμε ότι ανήκουν στο επίπεδο 2 οι άλλες λύσεις κλιμάκωσης που δεν χρησιμοποιούν το Ethereum για διαθεσιμότητα δεδομένων ή ασφάλεια._

**Ethereum για διαθεσιμότητα δεδομένων**

- Η διαθεσιμότητα δεδομένων είναι ένας σημαντικός παράγοντας διαφοροποίησης μεταξύ άλλων λύσεων κλιμάκωσης και του επιπέδου 2. Ένα έργο **πρέπει** να χρησιμοποιεί το Ethereum Mainnet για διαθεσιμότητα δεδομένων για να ληφθεί υπόψη προς καταχώριση.

**Γέφυρες**

- Πώς μπορούν να ενταχθούν στο επίπεδο 2 οι χρήστες;

**Η ημερομηνία κυκλοφορίας του έργου**

- Ένα επίπεδο 2 που κυκλοφορεί «ζωντανά» στο Κεντρικό Δίκτυο για πάνω από 6 μήνες

- Τα νεότερα έργα που δεν έχουν δοκιμαστεί στο πεδίο μάχης πολλές φορές από τους χρήστες είναι λιγότερο πιθανό να καταχωριστούν.

**Εξωτερικός έλεγχος ασφάλειας**

- Είτε μέσω ελέγχου είτε μέσω ομάδας εσωτερικής ασφάλειας ή άλλης μεθόδου, η ασφάλεια του προϊόντος σας πρέπει να ελεγχθεί με αξιόπιστο τρόπο. Αυτό μειώνει τον κίνδυνο για τους χρήστες μας και μας δείχνει ότι λαμβάνετε σοβαρά υπόψη την ασφάλεια.

**Συντηρημένη βάση χρηστών**

- Θα εξετάσουμε μετρικά στοιχεία όπως το ιστορικό TVL, τα στατιστικά στοιχεία συναλλαγών και αν χρησιμοποιείται από γνωστές εταιρείες ή έργα

**Ενεργή ομάδα ανάπτυξης**

- Δεν θα καταχωρίσουμε ένα επίπεδο 2 που δεν έχει μια ενεργή ομάδα να εργάζεται στο έργο.

**Εξερευνητής μπλοκ**

- Τα έργα που καταχωρίζονται απαιτούν έναν λειτουργικό εξερευνητή μπλοκ έτσι ώστε οι χρήστες να μπορούν να πλοηγούνται εύκολα στην αλυσίδα.

### Άλλα κριτήρια: τα καλά {#nice-to-haves}

**Υποστήριξη ανταλλακτηρίου για το έργο**

- Μπορούν οι χρήστες να κάνουν κατάθεση και/ή ανάληψη απευθείας από ένα ανταλλακτήριο;

**Σύνδεσμοι για dapp στο οικοσύστημα επιπέδου 2**

- Θέλουμε να είμαστε σε θέση να παρέχουμε πληροφορίες σχετικά με το τι να αναμένουν ότι μπορούν να κάνουν οι χρήστες σε αυτό το επίπεδο 2. (π.χ. https://portal.arbitrum.io/, https://www.optimism.io/apps)

**Λίστες συμβολαίων κρυπτονομισμάτων**

- Εφόσον τα περιουσιακά στοιχεία θα έχουν νέα διεύθυνση στο επίπεδο 2, εάν υπάρχει διαθέσιμος πόρος λίστας token, κοινοποιήστε τον.

**Υποστήριξη εγγενούς πορτοφολιού**

- Υπάρχουν πορτοφόλια που υποστηρίζουν από κατασκευής τους το L2;

## Προσθέστε το επίπεδο 2 σας {#add-exchange}

Εάν θέλετε να προσθέσετε ένα επίπεδο 2 στο ethereum.org, δημιουργήστε ένα ζήτημα στο GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  Δημιουργήστε ένα ζήτημα
</ButtonLink>
