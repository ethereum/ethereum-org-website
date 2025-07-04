---
title: Απόδειξη μηδενικής γνώσης
description: Μία μη τεχνική εισαγωγή σχετικά με την απόδειξη της μηδενικής γνώσης για αρχάριους.
lang: el
---

# Τι είναι η απόδειξη μηδενικής γνώσης; {#what-are-zk-proofs}

Μια απόδειξη μηδενικής γνώσης είναι ένας τρόπος απόδειξης της εγκυρότητας μιας δήλωσης χωρίς να αποκαλύπτεται η ίδια η δήλωση. Η μία πλευρά προσπαθεί να αποδείξει τη συναλλαγή, καθώς ο επικυρωτής είναι υπεύθυνος για την επιβεβαίωση αυτής της συναλλαγής.

Η απόδειξη μηδενικής γνώσης παρουσιάστηκε για πρώτη φορά σε μια εργασία το 1985 με τίτλο [«Η πολυπλοκότητα της γνώσης των διαδραστικών συστημάτων απόδειξης»](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf), η οποία δίνει έναν ορισμό των αποδείξεων μηδενικής γνώσης που χρησιμοποιούνται ευρέως σήμερα:

> Ένα πρωτόκολλο απόδειξης μηδενικής γνώσης είναι μία μέθοδος μέσω της οποίας το ένα μέρος (αυτός που αποδεικνύει) **μπορεί να αποδείξει** στο άλλο μέρος (αυτόν που επικυρώνει) ότι **κάτι είναι αληθές, χωρίς να αποκαλύπτει κάποια πληροφορία** εκτός από το γεγονός ότι η συγκεκριμένη δήλωση είναι αληθής.

Οι αποδείξεις μηδενικής γνώσεις έχουν βελτιωθεί στην πάροδο των χρόνων και τώρα χρησιμοποιούνται σε διάφορες εφαρμογές του πραγματικού κόσμου.

<YouTube id="fOGdb1CTu5c" />

## Γιατί χρειαζόμαστε αποδείξεις μηδενικής γνώσης; {#why-zero-knowledge-proofs-are-important}

Οι αποδείξεις μηδενικής γνώσης εκπροσωπούν μία καινοτομία στην εφαρμοσμένη κρυπτογραφία, αφού υπόσχονται να βελτιώσουν την ασφάλεια της πληροφορίας για όλους. Σκεφτείτε πώς θα αποδεικνύατε μία δήλωση (π.χ είμαι κάτοικος μίας χώρας) σε κάποιον άλλο (π.χ τον πάροχο μίας υπηρεσίας). Θα χρειαζόταν να παρέχετε αποδείξεις για να ισχυριστείτε τη δήλωσή σας, όπως το διαβατήριο ή το δίπλωμα οδήγησης.

Υπάρχουν όμως προβλήματα με αυτή την προσέγγιση, κυρίως όσον αφορά την έλλειψη ιδιωτικότητας. Τα προσωπικά αναγνωρίσιμα στοιχεία (PII) τα οποία διαμοιράζονται με κάποιον τρίτο, αποθηκεύονται σε κεντρικές βάσεις δεδομένων, οι οποίες είναι ευάλωτες σε παραβιάσεις. Με την κλοπή ταυτοτήτων να γίνεται ένα κρίσιμο ζήτημα, υπάρχει ζήτηση για μέσα προστασίας της ιδιωτικότητας των οποίων θα διαμοιράζονται οι ευαίσθητες πληροφορίες.

Οι αποδείξεις μηδενικής γνώσης λύνουν αυτό το πρόβλημα, **εξαλείφοντας την ανάγκη να αποκαλύπτεται οποιαδήποτε πληροφορία για να αποδειχθεί η εγκυρότητα των συναλλαγών**. Το πρωτόκολλο μηδενικής απόδειξης χρησιμοποιεί τη δήλωση (αποκαλούμενη ως «μάρτυρας») σαν καταχώρηση για να παράξει μία περιεκτική απόδειξη εγκυρότητας. Αυτή η απόδειξη παρέχει ισχυρή εγγύηση ότι η δήλωση είναι αληθής, χωρίς να αποκαλύπτονται πληροφορίες που χρησιμοποιήθηκαν για να δημιουργηθεί.

Πίσω στο προηγούμενο παράδειγμα, η μόνη απόδειξη που χρειάζεστε για να αποδείξετε την υπηκοότητα σας είναι μία απόδειξη μηδενικής γνώσης. Αυτός που επικυρώνει χρειάζεται μόνο να ελέγξει εάν ορισμένες ιδιότητες της απόδειξης ισχύουν, για να πειστεί ότι η υποκείμενη δήλωση ισχύει επίσης.

## Χρήσεις των αποδείξεων μηδενικής γνώσης {#use-cases-for-zero-knowledge-proofs}

### Ανώνυμες πληρωμές {#anonymous-payments}

Οι πληρωμές με πιστωτική κάρτα είναι συχνά ορατές σε πολλά μέρη, συμπεριλαμβανομένου του παρόχου πληρωμών, των τραπεζών και άλλων ενδιαφερόμενων μερών (π.χ., κυβερνητικές αρχές). Ενώ η οικονομική παρακολούθηση έχει οφέλη στον εντοπισμό παράνομων δραστηριοτήτων, υπονομεύει επίσης το απόρρητο των απλών πολιτών.

Τα κρυπτονομίσματα προορίζονταν να παρέχουν στους χρήστες έναν τρόπο για να διεξάγουν ιδιωτικές συναλλαγές peer-to-peer. Όμως, οι περισσότερες συναλλαγές κρυπτονομισμάτων είναι ευρέως ορατές σε δημόσια blockchains. Οι ταυτότητες χρηστών είναι συχνά ψεύτικες και είτε συνδέονται σκόπιμα με πραγματικές ταυτότητες (π.χ. συμπεριλαμβάνοντας διευθύνσεις ETH σε προφίλ Twitter ή GitHub) είτε μπορούν να συσχετιστούν με πραγματικές ταυτότητες χρησιμοποιώντας βασική ανάλυση δεδομένων εντός και εκτός αλυσίδας.

Υπάρχουν συγκεκριμένα «νομίσματα απορρήτου» σχεδιασμένα για εντελώς ανώνυμες συναλλαγές. Blockchain εστιασμένα στο απόρρητο, όπως τα Zcash και Monero, αποκρύπτουν λεπτομέρειες συναλλαγών, συμπεριλαμβανομένων των διευθύνσεων αποστολέα/λήπτη, του τύπου ψηφιακού στοιχείου, της ποσότητας και του χρονοδιαγράμματος συναλλαγών.

Ενσωματώνοντας την τεχνολογία αποδείξεων μηδενικής γνώσης στο πρωτόκολλο, τα δίκτυα [blockchain](/glossary/#blockchain) που εστιάζουν στο απόρρητο, επιτρέπουν στους [κόμβους](/glossary/#node) να επικυρώνουν συναλλαγές χωρίς να χρειάζεται να αποκτήσουν πρόσβαση σε δεδομένα συναλλαγών. Το [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) είναι ένα παράδειγμα προτεινόμενου σχεδιασμού που θα επιτρέψει εγγενείς ιδιωτικές μεταφορές αξίας στο blockchain Ethereum. Ωστόσο, τέτοιες προτάσεις είναι δύσκολο να εφαρμοστούν λόγω ενός μείγματος ανησυχιών για την ασφάλεια, τους ρυθμιστικούς κανόνες και το UX.

**Οι αποδείξεις μηδενικής γνώσης εφαρμόζονται επίσης στην ανωνυμοποίηση συναλλαγών σε δημόσια blockchain**. Ένα παράδειγμα είναι το Tornado Cash, μια αποκεντρωμένη υπηρεσία χωρίς επιμέλεια που επιτρέπει στους χρήστες να διεξάγουν ιδιωτικές συναλλαγές στο Ethereum. Το Tornado Cash χρησιμοποιεί αποδείξεις μηδενικής γνώσης για να αποκρύψει τις λεπτομέρειες των συναλλαγών και να εγγυηθεί το οικονομικό απόρρητο. Δυστυχώς, επειδή αυτά είναι εργαλεία απορρήτου «opt-in», συνδέονται με παράνομες δραστηριότητες. Για να ξεπεραστεί αυτό, το απόρρητο πρέπει τελικά να γίνει ο προεπιλεγμένος τρόπος λειτουργίας στα δημόσια blockchain.

### Προστασία ταυτότητας {#identity-protection}

Τα τρέχοντα συστήματα διαχείρισης ταυτότητας θέτουν σε κίνδυνο τα προσωπικά δεδομένα. Οι αποδείξεις μηδενικής γνώσης μπορούν να βοηθήσουν τους χρήστες να επικυρώσουν την ταυτότητά τους ενώ παράλληλα να προστατεύσουν τις ευαίσθητες πληροφορίες.

Οι αποδείξεις μηδενικής γνώσης είναι ιδιαίτερα χρήσιμες στο πλαίσιο της [αποκεντρωμένης ταυτότητας](/decentralized-identity/). Η αποκεντρωμένη ταυτότητα (περιγράφεται επίσης ως «αυτοκυρίαρχη ταυτότητα») δίνει στο χρήστη τη δυνατότητα να ελέγχει την πρόσβαση σε προσωπικά στοιχεία αναγνώρισης. Ένα καλό παράδειγμα του πώς η τεχνολογία μηδενικής γνώσης επιτρέπει την αποκεντρωμένη ταυτότητα είναι η απόδειξη της ιθαγένειάς σας χωρίς να αποκαλύψετε τα στοιχεία του ΑΦΜ ή του διαβατηρίου σας.

### Πιστοποίηση {#authentication}

Η χρήση online υπηρεσιών απαιτεί την απόδειξη της ταυτότητάς σας και του δικαιώματός πρόσβασης σε αυτές τις πλατφόρμες. Αυτό συχνά απαιτεί την παροχή προσωπικών πληροφοριών, όπως ονόματα, διευθύνσεις email, ημερομηνίες γέννησης κ.λπ. Επίσης, μπορεί να χρειαστεί να απομνημονεύσετε μεγάλους κωδικούς πρόσβασης, διακινδυνεύοντας έτσι να χάσετε την πρόσβαση.

Ωστόσο, οι αποδείξεις μηδενικής γνώσης μπορούν να απλοποιήσουν την επικύρωση για τις πλατφόρμες και τους χρήστες. Αφού δημιουργηθεί μια απόδειξη μηδενικής γνώσης χρησιμοποιώντας δημόσια δεδομένα (π.χ., δεδομένα που πιστοποιούν τη συμμετοχή του χρήστη στην πλατφόρμα) και ιδιωτικά δεδομένα (π.χ., τα στοιχεία του χρήστη), ο χρήστης μπορεί απλά να την παρουσιάσει για να επικυρώσει την ταυτότητά του όταν χρειαστεί να αποκτήσει πρόσβαση στην υπηρεσία. Αυτό βελτιώνει την εμπειρία για τους χρήστες και απαλλάσσει τους οργανισμούς από την ανάγκη να αποθηκεύουν τεράστιο όγκο πληροφοριών για τους χρήστες.

### Επαληθεύσιμη υπολογιστική {#verifiable-computation}

Η επαληθεύσιμη υπολογιστική είναι άλλη μια εφαρμογή της τεχνολογίας των αποδείξεων μηδενικής γνώσης για τη βελτίωση των σχεδιασμών blockchain. Η επαληθεύσιμη υπολογιστική μας επιτρέπει να αναθέτουμε υπολογισμούς σε μια άλλη οντότητα διατηρώντας παράλληλα επαληθεύσιμα αποτελέσματα. Η οντότητα υποβάλλει το αποτέλεσμα μαζί με μια απόδειξη που επιβεβαιώνει ότι το πρόγραμμα εκτελέστηκε σωστά.

Η επαληθεύσιμη υπολογιστική είναι **κρίσιμη για τη βελτίωση των ταχυτήτων επεξεργασίας στα blockchain** χωρίς να μειωθεί η ασφάλεια. Για να το καταλάβουμε αυτό, πρέπει να γνωρίζουμε τις διαφορές στις προτεινόμενες λύσεις για την κλιμάκωση του Ethereum.

Οι [λύσεις κλιμάκωσης εντός αλυσίδας](/developers/docs/scaling/#onchain-scaling), όπως η τμηματοποίηση, απαιτούν εκτεταμένες τροποποιήσεις στο βασικό επίπεδο του blockchain. Ωστόσο, αυτή η προσέγγιση είναι πολύπλοκη και τα σφάλματα στην υλοποίηση μπορούν να υπονομεύσουν το μοντέλο ασφαλείας του Ethereum.

Οι [λύσεις κλιμάκωσης εκτός αλυσίδας](/developers/docs/scaling/#offchain-scaling) δεν απαιτούν επανασχεδιασμό του πυρήνα του πρωτοκόλλου Ethereum. Αντίθετα, βασίζονται σε ένα μοντέλο υπολογισμού εκτός αλυσίδας για να βελτιώσουν την απόδοση στο βασικό επίπεδο του Ethereum.

Δείτε πώς λειτουργεί στην πράξη:

- Αντί να επεξεργάζεται κάθε συναλλαγή, το Ethereum μεταθέτει την εκτέλεση σε μια ξεχωριστή αλυσίδα.

- Αφού επεξεργαστεί τις συναλλαγές, η άλλη αλυσίδα επιστρέφει τα αποτελέσματα για να εφαρμοστούν στην κατάσταση του Ethereum.

Το όφελος εδώ είναι ότι το Ethereum δε χρειάζεται να κάνει καμία εκτέλεση και χρειάζεται μόνο να εφαρμόσει αποτελέσματα από εξωτερικούς υπολογισμούς στην κατάστασή του. Αυτό μειώνει τη συμφόρηση του δικτύου και βελτιώνει επίσης τις ταχύτητες των συναλλαγών (τα πρωτόκολλα εκτός αλυσίδας βελτιστοποιούνται για ταχύτερη εκτέλεση).

Η αλυσίδα χρειάζεται έναν τρόπο για να επικυρώσει τις συναλλαγές εκτός αλυσίδας χωρίς να τις εκτελέσει ξανά, διαφορετικά χάνεται η αξία της εκτέλεσης εκτός αλυσίδας.

Εδώ έρχεται στο παιχνίδι η επαληθεύσιμη υπολογιστική. Όταν ένας κόμβος εκτελεί μια συναλλαγή εκτός του Ethereum, υποβάλλει μια απόδειξη μηδενικής γνώσης για να αποδείξει την ορθότητα της εκτέλεσης εκτός αλυσίδας. Αυτή η απόδειξη (που ονομάζεται [απόδειξη εγκυρότητας](/glossary/#validity-proof)) εγγυάται ότι μια συναλλαγή είναι έγκυρη, επιτρέποντας στο Ethereum να εφαρμόσει το αποτέλεσμα στην κατάστασή του, χωρίς να περιμένει κανέναν να το αμφισβητήσει.

Τα [πακέτα ενημέρωσης μηδενικής γνώσης](/developers/docs/scaling/zk-rollups) και τα [validiums](/developers/docs/scaling/validium/) είναι δύο λύσεις κλιμάκωσης εκτός αλυσίδας που χρησιμοποιούν αποδείξεις εγκυρότητας για να παρέχουν ασφαλή αναβαθμισιμότητα. Αυτά τα πρωτόκολλα εκτελούν χιλιάδες συναλλαγές εκτός αλυσίδας και υποβάλλουν αποδείξεις για επαλήθευση στο Ethereum. Αυτά τα αποτελέσματα μπορούν να εφαρμοστούν άμεσα μόλις επαληθευτεί η απόδειξη, επιτρέποντας στο Ethereum να επεξεργαστεί περισσότερες συναλλαγές χωρίς να αυξήσει τους υπολογισμούς στο βασικό επίπεδο.

### Μείωση της δωροδοκίας και της συνεννόησης στην ψηφοφορία εντός αλυσίδας {#secure-blockchain-voting}

Τα συστήματα ψηφοφορίας εντός κρυπτοαλυσίδας έχουν πολλά ευνοϊκά χαρακτηριστικά: είναι πλήρως ελεγμένα, ασφαλή έναντι επιθέσεων, ανθεκτικά στη λογοκρισία και απαλλαγμένα από γεωγραφικούς περιορισμούς. Ωστόσο, ούτε καν τα συστήματα ψηφοφορίας εντός αλυσίδας είναι απρόσβλητα στο πρόβλημα της **συνεννόησης**.

Η συνεννόηση, που ορίζεται ως «συντονισμός για τον περιορισμό του ανοιχτού ανταγωνισμού μέσω της εξαπάτησης, της απάτης και της παραπλάνησης», μπορεί να λάβει τη μορφή ενός κακόβουλου παράγοντα που επηρεάζει την ψηφοφορία προσφέροντας δωροδοκίες. Για παράδειγμα, η Αλίκη μπορεί να λάβει δωροδοκία από τον Μπομπ για να ψηφίσει την `επιλογή Β` σε μια ψηφοφορία ακόμα και αν προτιμά την `επιλογή Α`.

Η δωροδοκία και η συνεννόηση περιορίζουν την αποτελεσματικότητα οποιασδήποτε διαδικασίας που χρησιμοποιεί την ψηφοφορία ως μηχανισμό σηματοδότησης (ειδικά όταν οι χρήστες μπορούν να αποδείξουν πώς ψήφισαν). Αυτό μπορεί να έχει σημαντικές συνέπειες, ειδικά όταν οι ψήφοι είναι υπεύθυνες για την κατανομή σπάνιων πόρων.

Για παράδειγμα, οι [μηχανισμοί τετραγωνικής χρηματοδότησης](https://www.radicalxchange.org/concepts/plural-funding/) βασίζονται σε δωρεές για να μετρήσουν την προτίμηση για ορισμένες επιλογές μεταξύ διαφορετικών έργων δημόσιου αγαθού. Κάθε δωρεά μετράει ως «ψήφος» για ένα συγκεκριμένο έργο, με τα έργα που λαμβάνουν περισσότερες ψήφους να λαμβάνουν περισσότερα κεφάλαια από το αντίστοιχο ταμείο.

Η χρήση της ψηφοφορίας εντός αλυσίδας κάνει την τετραγωνική χρηματοδότηση ευαίσθητη στη συνεννόηση: οι συναλλαγές κρυπτοαλυσίδας είναι δημόσιες, επομένως οι δωροδοκούντες μπορούν να ελέγξουν τη δραστηριότητα εντός αλυσίδας του δωροδοκούμενου για να δουν πώς «ψήφισε». Με αυτόν τον τρόπο, η τετραγωνική χρηματοδότηση παύει να αποτελεί αποτελεσματικό μέσο για την κατανομή κεφαλαίων με βάση τις συγκεντρωτικές προτιμήσεις της κοινότητας.

Ευτυχώς, νεότερες λύσεις όπως το MACI (Minimum Anti-Collusion Infrastructure) χρησιμοποιούν αποδείξεις μηδενικής γνώσης για να καταστήσουν την ψηφοφορία εντός αλυσίδας (π. χ., μηχανισμοί τετραγωνικής χρηματοδότησης) ανθεκτική στη δωροδοκία και τη συνεννόηση. Το MACI είναι ένα σύνολο έξυπνων συμβάσεων και σεναρίων που επιτρέπουν σε έναν κεντρικό διαχειριστή (που ονομάζεται «συντονιστής») να συγκεντρώνει ψήφους και να καταμετρά αποτελέσματα _χωρίς_ να αποκαλύπτει λεπτομέρειες για το πώς ψήφισε κάθε άτομο. Ακόμα και έτσι, εξακολουθεί να είναι δυνατό να επαληθεύσετε ότι οι ψήφοι καταμετρήθηκαν σωστά ή να επιβεβαιώσετε ότι ένα συγκεκριμένο άτομο συμμετείχε στην ψηφοφορία.

#### Πώς λειτουργεί το MACI με αποδείξεις μηδενικής γνώσης; {#how-maci-works-with-zk-proofs}

Αρχικά, ο συντονιστής δημοσιεύει το συμβόλαιο MACI στο Ethereum και στη συνέχεια οι χρήστες μπορούν να εγγραφούν για ψηφοφορία (καταχωρώντας το δημόσιο κλειδί τους στο έξυπνο συμβόλαιο). Οι χρήστες ψηφίζουν στέλνοντας μηνύματα κρυπτογραφημένα με το δημόσιο κλειδί τους στο έξυπνο συμβόλαιο (μια έγκυρη ψήφος πρέπει να υπογραφεί με το πιο πρόσφατο δημόσιο κλειδί που σχετίζεται με την ταυτότητα του χρήστη, μεταξύ άλλων κριτηρίων). Στη συνέχεια, ο συντονιστής επεξεργάζεται όλα τα μηνύματα μόλις λήξει η περίοδος ψηφοφορίας, καταμετρά τις ψήφους και επαληθεύει τα αποτελέσματα εντός αλυσίδας.

Στο MACI, οι αποδείξεις μηδενικής γνώσης χρησιμοποιούνται για να διασφαλιστεί η ορθότητα των υπολογισμών, καθιστώντας αδύνατο για τον συντονιστή να επεξεργαστεί εσφαλμένα τις ψήφους και να μετρήσει τα αποτελέσματα. Αυτό επιτυγχάνεται απαιτώντας από τον συντονιστή να δημιουργήσει αποδείξεις ZK-SNARK που να αποδεικνύουν ότι α) όλα τα μηνύματα έχουν υποστεί επεξεργασία σωστά και β) το τελικό αποτέλεσμα αντιστοιχεί στο άθροισμα όλων των _έγκυρων_ ψήφων.

Έτσι, ακόμη και χωρίς να κοινοποιηθεί η κατανομή των ψήφων ανά χρήστη (όπως συμβαίνει συνήθως), το MACI εγγυάται την ακεραιότητα των αποτελεσμάτων που υπολογίζονται κατά τη διάρκεια της καταμέτρησης. Αυτό το χαρακτηριστικό είναι χρήσιμο για τη μείωση της αποτελεσματικότητας των βασικών σχεδίων συνεννόησης. Μπορούμε να εξερευνήσουμε αυτήν την περίπτωση χρησιμοποιώντας το προηγούμενο παράδειγμα του Μπομπ που δωροδοκεί την Αλίκη να ψηφίσει για μια επιλογή:

- Η Αλίκη δηλώνει συμμετοχή στην ψηφοφορία στέλνοντας το δημόσιο κλειδί της σε ένα έξυπνο συμβόλαιο.
- Η Αλίκη συμφωνεί να ψηφίσει την `επιλογή Β` έναντι δωροδοκίας από τον Μπομπ.
- Η Αλίκη ψηφίζει για την `επιλογή Β`.
- Η Αλίκη στέλνει κρυφά μια κρυπτογραφημένη συναλλαγή για να αλλάξει το δημόσιο κλειδί που σχετίζεται με την ταυτότητά της.
- Η Αλίκη στέλνει ένα άλλο (κρυπτογραφημένο) μήνυμα στο έξυπνο συμβόλαιο ψηφίζοντας για την `επιλογή Α` χρησιμοποιώντας το νέο δημόσιο κλειδί.
- Η Αλίκη δείχνει στον Μπομπ μια συναλλαγή που δείχνει ότι ψήφισε για την `επιλογή Β` (η οποία είναι άκυρη αφού το δημόσιο κλειδί δε σχετίζεται πλέον με την ταυτότητα της Αλίκης στο σύστημα).
- Κατά την επεξεργασία των μηνυμάτων, ο συντονιστής παραλείπει την ψήφο της Αλίκης για την `επιλογή Β` και μετράει μόνο την ψήφο για την `επιλογή Α`. Επομένως, η προσπάθεια του Μπομπ να συνεννοηθεί με την Αλίκη και να χειραγωγήσει την ψηφοφορία εντός αλυσίδας αποτυγχάνει.

Η χρήση του MACI _απαιτεί_ εμπιστοσύνη στον συντονιστή ότι δε θα συνεννοηθεί με δωροδοκούντες ή δε θα επιχειρήσει να δωροδοκήσει ο ίδιος τους ψηφοφόρους. Ο συντονιστής μπορεί να αποκρυπτογραφήσει τα μηνύματα των χρηστών (αυτό είναι απαραίτητο για τη δημιουργία της απόδειξης), πράγμα που σημαίνει ότι μπορεί να επαληθεύσει με ακρίβεια πώς ψήφισε κάθε άτομο.

Το MACI εξακολουθεί να αποτελεί ένα ισχυρό εργαλείο για την εξασφάλιση της ακεραιότητας των ψηφοφοριών εντός αλυσίδας, υπό την προϋπόθεση ότι ο συντονιστής παραμένει αξιόπιστος. Αυτό εξηγεί τη δημοτικότητά του μεταξύ των εφαρμογών τετραγωνικής χρηματοδότησης (π.χ., [clr.fund](https://clr.fund/#/about/maci)) που βασίζονται σε μεγάλο βαθμό στην ακεραιότητα των επιλογών ψηφοφορίας κάθε ατόμου.

[Μάθετε περισσότερα για το MACI](https://privacy-scaling-explorations.github.io/maci/).

## Πώς λειτουργεί η απόδειξη μηδενικής γνώσης; {#how-do-zero-knowledge-proofs-work}

Μία απόδειξη μηδενικής γνώσης σάς επιτρέπει να αποδείξετε την εγκυρότητα μίας δήλωσης χωρίς να διαμοιράζεστε το περιεχόμενο της δήλωσης ή να αποκαλύπτετε πώς ανακαλύψατε την αλήθεια. Για να γίνει αυτό δυνατό, τα πρωτόκολλα μηδενικής γνώσης βασίζονται σε αλγόριθμους που λαμβάνουν ορισμένα δεδομένα σαν στοιχεία και επιστρέφουν «σωστό» ή «λάθος» ως αποτέλεσμα.

Ένα πρωτόκολλο μηδενικής γνώσης πρέπει να πληροί τα ακόλουθα κριτήρια:

1. **Πληρότητα:** Αν τα δεδομένα είναι έγκυρα, το πρωτόκολλο μηδενικής γνώσης πάντα επιστρέφει «σωστό». Έτσι, αν η υποκείμενη δήλωση είναι αληθής και τόσο αυτός που αποδεικνύει όσο και αυτός που επικυρώνει, είναι ειλικρινής, η απόδειξη γίνεται δεκτή.

2. **Αυστηρότητα:** Εάν τα δεδομένα δεν είναι έγκυρα, είναι θεωρητικά αδύνατο να εξαπατήσετε το πρωτόκολλο μηδενικής γνώσης για να επιστρέψετε το «σωστό». Ως εκ τούτου, ένας επαληθευτής που λέει ψέματα δεν μπορεί να ξεγελάσει έναν ειλικρινή επαληθευτή ώστε να πιστέψει ότι μία μη έγκυρη δήλωση είναι έγκυρη (εκτός από ένα μικρό περιθώριο πιθανότητας).

3. **Μηδενική γνώση:** Ο επαληθευτής δε μαθαίνει τίποτα περισσότερο σχετικά με μία δήλωση πέρα από την εγκυρότητα ή την απόρριψη (έχουν μηδενική γνώση της δήλωσης). Αυτή η απαίτηση εμποδίζει επίσης τον επαληθευτή να αντλήσει τα αρχικά δεδομένα (τα περιεχόμενα της δήλωσης) από την απόδειξη.

Σε βασική μορφή, μία απόδειξη μηδενικής γνώσης αποτελείται από τρία στοιχεία: τον **μάρτυρα**, την **πρόκληση** και την **απάντηση**.

- **Μάρτυρας:** Οι αποδείξεις μηδενικής γνώσης επιτρέπουν σε κάποιον να αποδείξει σε κάποιον άλλο ότι κατέχει μια συγκεκριμένη πληροφορία, χωρίς να αποκαλύψει την ίδια την πληροφορία. Ο «μάρτυρας» δεν αποκαλύπτεται ποτέ σε αυτόν που κάνει επαλήθευση, αλλά η ύπαρξή του και η γνώση του καθορίζουν ένα σύνολο πιθανών ερωτήσεων. Αυτές οι ερωτήσεις μπορούν να απαντηθούν σωστά μόνο από κάποιον που κατέχει πραγματικά την πληροφορία. Η διαδικασία της απόδειξης ξεκινά, με αυτόν που αποδεικνύει, να επιλέγει τυχαία μια ερώτηση από αυτό το σύνολο και να υπολογίζει την απάντηση. Στη συνέχεια, στέλνει την απάντηση σε αυτόν που θα κάνει την επαλήθευση. Αυτή η διαδικασία θα μπορούσε να θεωρηθεί σαν μια «δοκιμασία γνώσεων» που βασίζεται στον μυστικό μάρτυρα.

- **Πρόκληση:** Ο επαληθευτής επιλέγει τυχαία μια νέα ερώτηση από το ίδιο σύνολο ερωτήσεων που σχετίζονται με τον μάρτυρα. Αυτή η ερώτηση είναι διαφορετική από την αρχική ερώτηση.

- **Απόκριση:** Αυτός που θα αποδείξει αποδέχεται την ερώτηση, υπολογίζει την απάντηση και την επιστρέφει στον επαληθευτή. Η απάντηση αυτού που θα αποδείξει επιτρέπει στον επαληθευτή να ελέγξει την εγκυρότητα της γνώσης του μάρτυρα. Για να είναι σίγουρος ο επαληθευτής ότι δε γίνονται τυχαίες ερωτήσεις, δεν αρκεί μόνο μία σωστή απάντηση. Έτσι, υποβάλλονται περισσότερες ερωτήσεις για επιβεβαίωση. Με την επανάληψη αυτής της αλληλεπίδρασης πολλές φορές, η πιθανότητα αυτός που κάνει την απόδειξη να προσποιηθεί ότι γνωρίζει τον μάρτυρα μειώνεται σημαντικά μέχρι να πειστεί ο επαληθευτής.

Τα παραπάνω περιγράφουν τη δομή μιας «διαδραστικής απόδειξης μηδενικής γνώσης». Τα πρώιμα πρωτόκολλα μηδενικής γνώσης χρησιμοποιούσαν διαδραστική απόδειξη, όπου η επαλήθευση της εγκυρότητας μιας δήλωσης απαιτούσε συνεχή επικοινωνία μεταξύ αυτού που αποδεικνύει και του επαληθευτή.

Ένα καλό παράδειγμα που δείχνει πώς λειτουργούν οι διαδραστικές αποδείξεις είναι η διάσημη ιστορία της [σπηλιάς του Αλί Μπαμπά](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) από τον Jean-Jacques Quisquater. Στην ιστορία, η Πέγκυ (ως αυτός που κάνει την απόδειξη) θέλει να αποδείξει στον Βίκτωρα (τον επαληθευτή) ότι γνωρίζει τη μυστική φράση για να ανοίξει μια μαγική πόρτα, χωρίς όμως να αποκαλύψει την ίδια τη φράση.

### Αποδείξεις μηδενικής γνώσης χωρίς αλληλεπίδραση {#non-interactive-zero-knowledge-proofs}

Οι διαδραστικές αποδείξεις μηδενικής γνώσης, παρόλο που αποτέλεσαν επανάσταση, είχαν περιορισμένη χρησιμότητα. Αυτό συνέβαινε επειδή απαιτούσαν οι δύο εμπλεκόμενοι (αυτός που αποδεικνύει και αυτός που επαληθεύει) να είναι διαθέσιμοι και να αλληλεπιδρούν επανειλημμένα. Ακόμα και αν ο επαληθευτής ήταν πεπεισμένος για την ειλικρίνεια του αυτού που αποδεικνύει, η απόδειξη δεν μπορούσε να επαληθευτεί ανεξάρτητα από κάποιον άλλο (για να υπολογιστεί μια νέα απόδειξη απαιτούνταν νέα μηνύματα μεταξύ τους).

Για να λύσουν αυτό το πρόβλημα, ο Manuel Blum, ο Paul Feldman και ο Silvio Micali πρότειναν τις πρώτες [αποδείξεις μηδενικής γνώσης χωρίς αλληλεπίδραση](https://dl.acm.org/doi/10.1145/62212.62222), όπου αυτός που αποδεικνύει και ο επαληθευτής έχουν ένα κοινό κλειδί. Αυτό επιτρέπει σε αυτόν που αποδεικνύει, να αποδείξει τη γνώση του για κάποια πληροφορία (πχ μάρτυρας) χωρίς να αποκαλύψει την ίδια την πληροφορία.

Σε αντίθεση με τις διαδραστικές αποδείξεις, οι αποδείξεις χωρίς αλληλεπίδραση απαιτούν μόνο έναν γύρο επικοινωνίας μεταξύ τους (αυτού που αποδεικνύει και του επαληθευτή). Αυτός που αποδεικνύει υποβάλλει τις μυστικές πληροφορίες σε έναν ειδικό αλγόριθμο για να υπολογιστεί η απόδειξη μηδενικής γνώσης. Στη συνέχεια, η απόδειξη αποστέλλεται στον επαληθευτή, ο οποίος ελέγχει ότι αυτός που έστειλε την απόδειξη γνωρίζει τη μυστική πληροφορία με χρήση άλλου αλγορίθμου.

Οι μη διαδραστικές αποδείξεις μειώνουν την επικοινωνία μεταξύ αυτού που αποδεικνύει με αυτόν που επαληθεύει, καθιστώντας τις αποδείξεις μηδενικής γνώσεις πιο αποδοτικές. Μόλις δημιουργηθεί μια απόδειξη, μπορεί να την επαληθεύσει οποιοδήποτε άτομο (με πρόσβαση στο κοινό κλειδί και τον αλγόριθμο επαλήθευσης).

Αυτές οι βελτιώσεις στις μη διαδραστικές αποδείξεις μηδενικής γνώσης αποτέλεσαν σημαντική εξέλιξη και οδήγησαν στην ανάπτυξη των συστημάτων απόδειξης που χρησιμοποιούνται σήμερα. Θα συζητήσουμε αυτούς τους τύπους αποδείξεων αναλυτικότερα παρακάτω.

### Τύποι απόδειξης μηδενικής γνώσης {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

Το ZK-SNARK αποτελεί συντομογραφία του όρου **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge (Μηδενικής Γνώσης, Συνοπτική, Μη-Διαδραστική Διατριβή Γνώσης)**. Το πρωτόκολλο ZK-SNARK διαθέτει τα ακόλουθα χαρακτηριστικά:

- **Μηδενική Γνώση:** Ένας επαληθευτής μπορεί να επικυρώσει την ακεραιότητα μιας δήλωσης, χωρίς να γνωρίζει τίποτα άλλο για τη δήλωση αυτή. Ο επαληθευτής γνωρίζει μόνο εάν η δήλωση είναι αληθής ή ψευδής.

- **Συνοπτική:** Η απόδειξη μηδενικής γνώσης είναι μικρότερη σε μέγεθος από τον μάρτυρα και μπορεί να επαληθευτεί γρήγορα.

- **Μη-Διαδραστική:** Η απόδειξη είναι «μη-διαδραστική» επειδή αυτός που αποδεικνύει και ο επαληθευτής αλληλεπιδρούν μόνο μία φορά, σε αντίθεση με τις διαδραστικές αποδείξεις που απαιτούν πολλαπλούς γύρους επικοινωνίας.

- **Διαφωνία:** Η απόδειξη ικανοποιεί την απαίτηση της «αυστηρότητας» (soundness), επομένως η εξαπάτηση είναι εξαιρετικά απίθανη.

- **Γνώση:** Η απόδειξη μηδενικής γνώσης δεν μπορεί να δημιουργηθεί χωρίς πρόσβαση στην κρυφή πληροφορία (μάρτυρας). Είναι δύσκολο, αν όχι αδύνατο, για αυτόν που αποδεικνύει που δε γνωρίζει τον μάρτυρα να υπολογίσει μια έγκυρη απόδειξη μηδενικής γνώσης.

Πρότερη αναφορά στον «κοινό κλειδί» αφορά σε δημόσιες παραμέτρους που συμφωνούν να χρησιμοποιήσουν τον αποδεικνύων και τον επαληθευτή για τη δημιουργία και την επαλήθευση αποδείξεων. Η δημιουργία των δημοσίων παραμέτρων (γνωστών ως Common Reference String (CRS)) είναι μια ευαίσθητη λειτουργία λόγω της σημασίας της για την ασφάλεια του πρωτοκόλλου. Εάν η εντροπία (τυχαιότητα) που χρησιμοποιείται στη δημιουργία του CRS περιέλθει σε χέρια ανέντιμου αποδεικνύοντα, μπορεί να υπολογίσει ψευδείς αποδείξεις.

Ο [υπολογισμός πολλαπλών μερών (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) είναι ένας τρόπος μείωσης των κινδύνων κατά τη δημιουργία δημοσίων παραμέτρων. Πολλαπλά μέρη συμμετέχουν σε μια [τελετή εγκατάστασης που θεωρείται αξιόπιστη](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), όπου κάθε άτομο συνεισφέρει κάποιες τυχαίες τιμές για να δημιουργήσει το CRS. Εφόσον ένα έντιμο μέρος καταστρέψει το μερίδιο της εντροπίας του, το πρωτόκολλο ZK-SNARK διατηρεί την υπολογιστική ορθότητα.

Οι αξιόπιστες εγκαταστάσεις απαιτούν από τους χρήστες να εμπιστεύονται τους συμμετέχοντες στη δημιουργία παραμέτρων. Ωστόσο, η ανάπτυξη των ZK-STARKs έχει επιτρέψει την απόδειξη πρωτοκόλλων που λειτουργούν με εγκατάσταση μη εμπιστοσύνης.

#### ZK-STARKs {#zk-starks}

Τα ZK-STARK είναι συντομογραφία για το **Zero-Knowledge Scalable Transparent Argument of Knowledge**. Τα ZK-STARKs μοιάζουν με τα ZK-SNARKs, εκτός από το ότι είναι:

- **Διαβαθμίσιμα**: Το ZK-STARK είναι πιο γρήγορο από το ZK-SNARK στη δημιουργία και επαλήθευση αποδείξεων όταν το μέγεθος του μάρτυρα είναι μεγαλύτερο. Με τις αποδείξεις STARK, οι χρόνοι απόδειξης και επαλήθευσης αυξάνονται ελάχιστα μόνο καθώς αυξάνεται ο μάρτυρας (οι χρόνοι απόδειξης και επαλήθευσης SNARK αυξάνονται γραμμικά με το μέγεθος του μάρτυρα).

- **Διαφανή**: Το ZK-STARK βασίζεται σε δημόσια επαληθεύσιμη τυχαιότητα για τη δημιουργία δημοσίων παραμέτρων για απόδειξη και επαλήθευση αντί για μια αξιόπιστη εγκατάσταση. Επομένως, είναι πιο διαφανή σε σύγκριση με τα ZK-SNARK.

Τα ZK-STARK παράγουν μεγαλύτερες αποδείξεις από τα ZK-SNARK, πράγμα που σημαίνει ότι γενικά έχουν υψηλότερο κόστος επαλήθευσης. Εντούτοις, υπάρχουν περιπτώσεις (όπως η απόδειξη μεγάλων συνόλων δεδομένων) όπου τα ZK-STARK μπορεί να είναι πιο οικονομικά αποδοτικά από τα ZK-SNARK.

## Μειονεκτήματα χρήσης αποδείξεων μηδενικής γνώσης {#drawbacks-of-using-zero-knowledge-proofs}

### Κόστος εξοπλισμού {#hardware-costs}

Η δημιουργία αποδείξεων μηδενικής γνώσης περιλαμβάνει πολύπλοκους υπολογισμούς που εκτελούνται καλύτερα σε εξειδικευμένα μηχανήματα. Επειδή αυτά τα μηχανήματα είναι ακριβά, συχνά βρίσκονται εκτός εμβέλειας των απλών χρηστών. Επιπλέον, οι εφαρμογές που θέλουν να χρησιμοποιήσουν τεχνολογία μηδενικής γνώσης πρέπει να λάβουν υπόψη το κόστος υλικού, το οποίο μπορεί να αυξήσει το κόστος για τους τελικούς χρήστες.

### Κόστος επαλήθευσης αποδείξεων {#proof-verification-costs}

Η επαλήθευση αποδείξεων απαιτεί επίσης σύνθετους υπολογισμούς και αυξάνει το κόστος εφαρμογής της τεχνολογίας μηδενικής γνώσης στις εφαρμογές. Αυτό το κόστος είναι ιδιαίτερα σημαντικό στο πλαίσιο της απόδειξης υπολογισμού. Για παράδειγμα, τα ZK-rollup πληρώνουν περίπου 500.000 gas για να επαληθεύσουν μια μόνο απόδειξη ZK-SNARK στο Ethereum, με τα ZK-STARK να απαιτούν ακόμη υψηλότερα τέλη.

### Ζητήματα εμπιστοσύνης {#trust-assumptions}

Στα ZK-SNARK, το κοινό reference string (δημόσιες παράμετροι) δημιουργείται μία φορά και είναι διαθέσιμο για επαναχρησιμοποίηση σε άτομα που επιθυμούν να συμμετάσχουν στο πρωτόκολλο μηδενικής γνώσης. Οι δημόσιες παράμετροι δημιουργούνται μέσω μιας τελετής εγκατάστασης που θεωρείται αξιόπιστη, όπου θεωρείται ότι οι συμμετέχοντες είναι έντιμοι.

Αλλά δεν υπάρχει πραγματικός τρόπος για τους χρήστες να αξιολογήσουν την εντιμότητα των συμμετεχόντων και οι χρήστες πρέπει να εμπιστευτούν τους προγραμματιστές. Τα ZK-STARK είναι αξιόπιστα, καθώς η τυχαιότητα που χρησιμοποιείται στη δημιουργία της συμβολοσειράς είναι δημόσια επαληθεύσιμη. Εν τω μεταξύ, οι ερευνητές εργάζονται σε εγκαταστάσεις μη εμπιστοσύνης για ZK-SNARK για να αυξήσουν την ασφάλεια των μηχανισμών απόδειξης.

### Απειλές κβαντικού υπολογισμού {#quantum-computing-threats}

Το ZK-SNARK χρησιμοποιεί κρυπτογράφηση ελλειπτικής καμπύλης για κρυπτογράφηση. Ενώ το πρόβλημα διακριτού λογαρίθμου ελλειπτικής καμπύλης θεωρείται προς το παρόν δυσανάλυτο, η ανάπτυξη κβαντικών υπολογιστών θα μπορούσε να σπάσει αυτό το μοντέλο ασφαλείας στο μέλλον.

Το ZK-STARK θεωρείται απρόσβλητο στην απειλή του κβαντικού υπολογισμού, καθώς βασίζεται μόνο σε συναρτήσεις κατακερματισμού ανθεκτικές για την ασφάλειά του. Σε αντίθεση με τα ζεύγη δημόσιου-ιδιωτικού κλειδιού που χρησιμοποιούνται στην κρυπτογράφηση ελλειπτικής καμπύλης, ο κατακερματισμός είναι ανθεκτικός είναι πιο δύσκολο να σπάσει από αλγορίθμους κβαντικού υπολογισμού.

## Περισσότερες πληροφορίες {#further-reading}

- [Επισκόπηση περιπτώσεων χρήσης για αποδείξεις μηδενικής γνώσης](https://pse.dev/projects) — _Ομάδα έρευνας ιδιωτικότητας και επεκτασιμότητας_
- [SNARKs vs. STARKS vs. Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Μια απόδειξη μηδενικής γνώσης: Βελτίωση του απορρήτου σε ένα Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Ένα ρεαλιστικό παράδειγμα μηδενικής γνώσης και εμβάθυνση](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Δημιουργήστε επαληθεύσιμη εμπιστοσύνη, ακόμη και ενάντια στους κβαντικούς υπολογιστές](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Μια κατά προσέγγιση εισαγωγή στον τρόπο με τον οποίο είναι δυνατές οι zk-SNARKs](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Γιατί οι Αποδείξεις μηδενικής γνώσης (ZKPs) αλλάζουν το παιχνίδι για την αυτοκυρίαρχη ταυτότητα](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Επεξήγηση: Ενεργοποίηση ιδιωτικών μεταφορών στο Ethereum με ZK Proofs](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
