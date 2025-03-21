---
title: Gasper
description: Εξήγηση του μηχανισμού απόδειξης συμμετοχής Gasper.
lang: el
---

Το Gasper είναι ένας συνδυασμός του Casper the Friendly Finality Gadget (Casper-FFG) και του αλγόριθμου επιλογής ενσωμάτωσης LMD-GHOST. Μαζί αυτά τα στοιχεία αποτελούν τον μηχανισμό συναίνεσης που εξασφαλίζει την απόδειξη συμμετοχής του Ethereum. Το Casper είναι ο μηχανισμός που αναβαθμίζει ορισμένα μπλοκ σε «οριστικοποιημένα» ώστε οι νέοι συμμετέχοντες στο δίκτυο να μπορούν να είναι σίγουροι ότι συγχρονίζουν την κανονική αλυσίδα. Ο αλγόριθμος επιλογής ενσωμάτωσης χρησιμοποιεί συσσωρευμένες ψήφους για να εξασφαλίσει ότι οι κόμβοι μπορούν εύκολα να επιλέξουν τον σωστό, όταν προκύπτουν διακλαδώσεις στην αλυσίδα μπλοκ.

**Σημειώνεται** ότι ο αρχικός ορισμός του Casper-FFG ενημερώθηκε ελαφρώς για την ένταξή του στο Gasper. Σε αυτή τη σελίδα λαμβάνουμε υπόψη την ενημερωμένη έκδοση.

## Προαπαιτούμενα

Για να κατανοήσετε αυτό το υλικό, είναι απαραίτητο να διαβάσετε την εισαγωγική σελίδα στο [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Ο ρόλος του Gasper {#role-of-gasper}

Το Gasper βασίζεται σε ένα blockchain απόδειξης συμμετοχής όπου οι κόμβοι παρέχουν ether ως εγγύηση ασφάλειας που μπορεί να καταστραφεί εάν είναι τεμπέληδες ή ανέντιμοι στην πρόταση ή επικύρωση μπλοκ. Το Gasper είναι ο μηχανισμός που ορίζει πώς οι επικυρωτές ανταμείβονται και τιμωρούνται, αποφασίζουν ποια μπλοκ να δεχτούν και να απορρίψουν και σε ποια διακλάδωση του blockchain να δημιουργήσουν.

## Τι είναι η οριστικοποίηση; {#what-is-finality}

Η οριστικοποίηση είναι μια ιδιότητα ορισμένων μπλοκ που σημαίνει ότι δεν μπορούν να αναστραφούν εκτός εάν έχει υπάρξει κρίσιμη αποτυχία συναίνεσης και ένας επιτιθέμενος έχει καταστρέψει τουλάχιστον το 1/3 του συνολικού αποθηκευμένου ether. Τα οριστικοποιημένα μπλοκ μπορούν να θεωρηθούν ως πληροφορίες για τις οποίες το blockchain είναι σίγουρο. Ένα μπλοκ πρέπει να περάσει από μια διαδικασία αναβάθμισης δύο βημάτων για να οριστικοποιηθεί ένα μπλοκ:

1. Τα δύο τρίτα του συνολικού αποθηκευμένου ether πρέπει να έχουν ψηφίσει υπέρ της συμπερίληψης του μπλοκ στην κανονική αλυσίδα. Αυτή η συνθήκη αναβαθμίζει το μπλοκ σε «αιτιολογημένο». Τα αιτιολογημένα μπλοκ είναι απίθανο να αναστραφούν, αλλά μπορούν να αναστραφούν υπό ορισμένες συνθήκες.
2. Όταν ένα άλλο μπλοκ αιτιολογείται πάνω από ένα αιτιολογημένο μπλοκ, αναβαθμίζεται σε «οριστικοποιημένο». Η οριστικοποίηση ενός μπλοκ είναι μια δέσμευση να συμπεριληφθεί το μπλοκ στην κανονική αλυσίδα. Δεν μπορεί να αναστραφεί εκτός εάν ένας επιτιθέμενος καταστρέψει εκατομμύρια ether (δισεκατομμύρια $USD).

Αυτές οι αναβαθμίσεις μπλοκ δεν συμβαίνουν σε κάθε χρονικό κενό. Αντιθέτως, μόνο τα τελευταία μπλοκ ορίων εποχής μπορούν να αιτιολογηθούν και να οριστικοποιηθούν. Αυτά τα μπλοκ είναι γνωστά ως «σημεία ελέγχου». Η αναβάθμιση εξετάζει ζεύγη σημείων ελέγχου. Πρέπει να υπάρχει ένας «σύνδεσμος υπερπλειοψηφίας» μεταξύ δύο διαδοχικών σημείων ελέγχου (δηλαδή τα δύο τρίτα του συνολικού αποθηκευμένου ether ψηφίζουν ότι το σημείο ελέγχου B είναι ο σωστός απόγονος του σημείου ελέγχου A) για να αναβαθμιστεί το λιγότερο πρόσφατο σημείο ελέγχου σε οριστικοποιημένο και το πιο πρόσφατο μπλοκ σε αιτιολογημένο.

Επειδή η οριστικοποίηση απαιτεί συμφωνία των δύο τρίτων ότι ένα μπλοκ είναι κανονικό, ένας επιτιθέμενος δεν μπορεί να δημιουργήσει μια εναλλακτική οριστικοποιημένη αλυσίδα χωρίς:

1. Να κατέχει ή να χειραγωγεί τα δύο τρίτα του συνολικού αποθηκευμένου ether.
2. Να καταστρέψει τουλάχιστον το ένα τρίτο του συνολικού αποθηκευμένου ether.

Η πρώτη συνθήκη προκύπτει επειδή απαιτούνται δύο τρίτα του αποθηκευμένου ether για να οριστικοποιηθεί μια αλυσίδα. Η δεύτερη συνθήκη προκύπτει επειδή, εάν τα δύο τρίτα του συνολικού αποθηκευμένου κεφαλαίου έχουν ψηφίσει υπέρ και των δύο ενσωματώσεων, τότε το ένα τρίτο πρέπει να έχει ψηφίσει και στα δύο. Η διπλή ψήφος είναι μια συνθήκη περικοπής που θα τιμωρούνταν στο μέγιστο βαθμό, και το ένα τρίτο του συνολικού αποθηκευμένου κεφαλαίου θα καταστρεφόταν. Από τον Μάιο του 2022, αυτό απαιτεί από έναν επιτιθέμενο να κάψει περίπου 10 δισεκατομμύρια δολάρια σε ether. Ο αλγόριθμος που αιτιολογεί και οριστικοποιεί τα μπλοκ στο Gasper είναι μια ελαφρώς τροποποιημένη μορφή του [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Κίνητρα και Περικοπές {#incentives-and-slashing}

Οι επικυρωτές ανταμείβονται για την ειλικρινή πρόταση και επικύρωση μπλοκ. Το ether προσφέρεται ως ανταμοιβή και προστίθεται στο αποθηκευμένο κεφάλαιό τους. Από την άλλη πλευρά, οι επικυρωτές που απουσιάζουν και δεν ενεργούν όταν καλούνται, χάνουν αυτές τις ανταμοιβές και μερικές φορές χάνουν ένα μικρό μέρος του υπάρχοντος αποθηκευμένου κεφαλαίου τους. Ωστόσο, οι ποινές για την εκτός σύνδεσης κατάσταση είναι μικρές και στις περισσότερες περιπτώσεις ισοδυναμούν με κόστη ευκαιρίας για τις χαμένες ανταμοιβές. Ωστόσο, ορισμένες ενέργειες επικυρωτή είναι πολύ δύσκολο να γίνουν κατά λάθος και υποδηλώνουν κάποια κακόβουλη πρόθεση, όπως η πρόταση πολλών μπλοκ για το ίδιο χρονικό κενό, η βεβαίωση για πολλαπλά μπλοκ για το ίδιο χρονικό κενό ή η αντίφαση με προηγούμενες ψήφους σημείου ελέγχου. Αυτές είναι «επιλήψιμες» συμπεριφορές που τιμωρούνται πιο αυστηρά, καθώς η περικοπή έχει ως αποτέλεσμα την καταστροφή ενός μέρους του αποθηκευμένου κεφαλαίου του επικυρωτή και την αφαίρεση του επικυρωτή από το δίκτυο των επικυρωτών. Αυτή η διαδικασία διαρκεί 36 ημέρες. Την πρώτη ημέρα, υπάρχει μια αρχική ποινή έως 1 ETH. Στη συνέχεια, τα ether του επικυρωτή που έχει υποστεί περικοπή σιγά σιγά εξαντλούνται κατά την περίοδο εξόδου, αλλά τη 18η ημέρα λαμβάνει μια «ποινή συσχέτισης», η οποία είναι μεγαλύτερη όταν περισσότεροι επικυρωτές υποβάλλονται σε περικοπές περίπου την ίδια στιγμή. Η μέγιστη ποινή είναι ολόκληρο το δεσμευμένο κεφάλαιο. Αυτές οι ανταμοιβές και ποινές έχουν σχεδιαστεί για να ενθαρρύνουν τους ειλικρινείς επικυρωτές και να αποθαρρύνουν τις επιθέσεις στο δίκτυο.

### Διαρροή λόγω αδράνειας {#inactivity-leak}

Εκτός από την ασφάλεια, το Gasper παρέχει επίσης την «εύλογη ζωτικότητα». Πρόκειται για την κατάσταση όπου, εφόσον τα δύο τρίτα του συνολικού αποθηκευμένου κεφαλαίου ether ψηφίζουν ειλικρινά και ακολουθούν το πρωτόκολλο, η αλυσίδα θα είναι σε θέση να οριστικοποιηθεί ανεξάρτητα από οποιαδήποτε άλλη δραστηριότητα (όπως επιθέσεις, προβλήματα καθυστέρησης ή περικοπές). Με άλλα λόγια, για να αποτραπεί η οριστικοποίηση της αλυσίδας, πρέπει να τεθεί σε κίνδυνο κατά κάποιο τρόπο το ένα τρίτο του συνολικού αποθηκευμένου κεφαλαίου ether. Στο Gasper, υπάρχει μια πρόσθετη γραμμή άμυνας έναντι μιας αποτυχίας ζωτικότητας, η οποία είναι γνωστή ως «διαρροή λόγω αδράνειας». Αυτός ο μηχανισμός ενεργοποιείται όταν η αλυσίδα δεν έχει οριστικοποιηθεί για περισσότερες από τέσσερις εποχές. Το κεφάλαιο των επικυρωτών που δεν επιβεβαιώνουν ενεργά την αλυσίδα πλειοψηφίας εξαντλείται σταδιακά, έως ότου η πλειοψηφία αποκτήσει τα δύο τρίτα του συνολικού κεφαλαίου, εξασφαλίζοντας ότι οι αποτυχίες ζωτικότητας είναι μόνο προσωρινές.

### Επιλογή αναβάθμισης {#fork-choice}

Ο αρχικός ορισμός του Casper-FFG περιελάμβανε έναν αλγόριθμο επιλογής ενσωμάτωσης που επέβαλε τον κανόνα: `ακολουθήστε την αλυσίδα που περιέχει το αιτιολογημένο σημείο ελέγχου που έχει το μεγαλύτερο ύψος`, όπου το ύψος ορίζεται ως η μεγαλύτερη απόσταση από το πρώτο μπλοκ. Στο Gasper, ο αρχικός κανόνας επιλογής ενσωμάτωσης καταργείται υπέρ ενός πιο εξελιγμένου αλγόριθμου που ονομάζεται LMD-GHOST. Είναι σημαντικό να συνειδητοποιήσουμε ότι υπό κανονικές συνθήκες, ένας αλγόριθμος επιλογής ενσωμάτωσης δεν είναι απαραίτητος. Υπάρχει ένας προτείνων μπλοκ για κάθε χρονικό κενό και οι ειλικρινείς επικυρωτές το βεβαιώνουν. Μόνο σε περιπτώσεις μεγάλης ασυγχρονίας δικτύου, ή όταν ένας ανέντιμος προτείνων μπλοκ έχει δημιουργήσει αμφιλογία, απαιτείται ένας αλγόριθμος επιλογής ενσωμάτωσης. Ωστόσο, όταν προκύπτουν αυτές οι περιπτώσεις, ο αλγόριθμος επιλογής ενσωμάτωσης είναι μια κρίσιμη άμυνα που ασφαλίζει τη σωστή αλυσίδα.

Το LMD-GHOST σημαίνει «τελευταίο μήνυμα που οδηγείται από το πιο αχόρταγο ως προς το βάρος του υπο-δέντρο». Με αυτόν τον εξεζητημένο όρο ορίζεται ένας αλγόριθμος που επιλέγει τη διακλάδωση με το μεγαλύτερο συσσωρευμένο βάρος βεβαιώσεων ως την κανονική (αχόρταγο ως προς το βάρος υπο-δέντρο). Εάν ληφθούν πολλαπλά μηνύματα από έναν επικυρωτή, μόνο το τελευταίο λαμβάνεται υπόψη (με γνώμονα το τελευταίο μήνυμα). Πριν προσθέσει το βαρύτερο μπλοκ στην κανονική του αλυσίδα, κάθε επικυρωτής αξιολογεί κάθε μπλοκ χρησιμοποιώντας αυτόν τον κανόνα.

## Περισσότερες πληροφορίες {#further-reading}

- [Gasper: Συνδυάζοντας GHOST και Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper το φιλικό εργαλείο οριστικοποίησης](https://arxiv.org/pdf/1710.09437.pdf)
