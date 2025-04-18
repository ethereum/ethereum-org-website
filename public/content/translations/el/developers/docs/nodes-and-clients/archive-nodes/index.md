---
title: Κόμβος Αρχειοθέτησης Ethereum
description: Μια επισκόπηση των κόμβων αρχειοθέτησης
lang: el
sidebarDepth: 2
---

Ένας κόμβος αρχειοθέτησης είναι μια λειτουργία ενός πελάτη Ethereum που έχει ρυθμιστεί να διατηρεί αρχείο όλων των ιστορικών καταστάσεων. Είναι ένα χρήσιμο εργαλείο για ορισμένες περιπτώσεις χρήσης, αλλά μπορεί να είναι πιο δύσκολο να εκτελεστεί από έναν πλήρη κόμβο.

## Προαπαιτούμενα {#prerequisites}

Θα πρέπει να κατανοήσετε τις έννοιες ενός [κόμβου Ethereum](/developers/docs/nodes-and-clients/), την [αρχιτεκτονική](/developers/docs/nodes-and-clients/node-architecture/), τις [στρατηγικές συγχρονισμού](/developers/docs/nodes-and-clients/#sync-modes) καθώς και τις πρακτικές [εκτέλεσης](/developers/docs/nodes-and-clients/run-a-node/) και [χρήσης](/developers/docs/apis/json-rpc/).

## Τι είναι ένας κόμβος αρχειοθέτησης

Για να κατανοήσουμε τη σημασία ενός κόμβου αρχειοθέτησης, ας διευκρινίσουμε την έννοια της «κατάστασης» Το Ethereum μπορεί να αναφέρεται ως _μηχανή κατάστασης που βασίζεται σε συναλλαγές_. Αποτελείται από λογαριασμούς και εφαρμογές που εκτελούν συναλλαγές αλλάζοντας την κατάστασή τους. Τα παγκόσμια δεδομένα με πληροφορίες για κάθε λογαριασμό και συμβόλαιο, αποθηκεύονται σε μια βάση δεδομένων trie που ονομάζεται κατάσταση. Αυτό το χειρίζεται ο πελάτης του επιπέδου εκτέλεσης (EL) και περιλαμβάνει:

- Υπόλοιπα λογαριασμών και μοναδικότητας
- Κώδικες συμβολαίων και αποθήκευσης
- Δεδομένα που σχετίζονται με τη συναίνεση, π.χ. Συμβόλαιο κατάθεσης για αποθήκευση κεφαλαίου

Για να αλληλεπιδράσουν με το δίκτυο, να επαληθεύσουν και να δημιουργήσουν νέα μπλοκ, οι πελάτες Ethereum πρέπει να συμβαδίζουν με τις πιο πρόσφατες αλλαγές (την κορυφή της αλυσίδας) και επομένως την τρέχουσα κατάσταση. Ένας πελάτης επιπέδου εκτέλεσης που έχει διαμορφωθεί ως πλήρης κόμβος, επαληθεύει και ακολουθεί την πιο πρόσφατη κατάσταση του δικτύου, αλλά αποθηκεύει μόνο τις τελευταίες καταστάσεις π.χ. η κατάσταση που σχετίζεται με τα τελευταία 128 μπλοκ, ώστε να μπορεί να χειρίζεται τα αρχεία αλυσίδων και να παρέχει γρήγορη πρόσβαση σε πρόσφατα δεδομένα. Η πρόσφατη κατάσταση είναι αυτό που χρειάζονται όλοι οι πελάτες για να επαληθεύσουν τις εισερχόμενες συναλλαγές και να χρησιμοποιήσουν το δίκτυο.

Μπορείτε να φανταστείτε την κατάσταση ως στιγμιότυπο του δικτύου σε ένα δεδομένο μπλοκ και το αρχείο ως επανάληψη της ιστορίας.

Οι ιστορικές καταστάσεις μπορούν να σβηστούν με ασφάλεια επειδή δεν είναι απαραίτητες για τη λειτουργία του δικτύου και θα ήταν ανώφελο για τον πελάτη να διατηρεί όλα τα μη ενημερωμένα δεδομένα. Οι καταστάσεις που υπήρχαν πριν από κάποιο πρόσφατο μπλοκ (π.χ. 128 μπλοκ πριν από την κεφαλή) ουσιαστικά απορρίπτονται. Οι πλήρεις κόμβοι διατηρούν μόνο ιστορικά δεδομένα blockchain (μπλοκ και συναλλαγές) και περιστασιακά ιστορικά στιγμιότυπα που μπορούν να χρησιμοποιήσουν για την αναγέννηση παλαιότερων καταστάσεων κατόπιν αιτήματος. Το κάνουν αυτό εκτελώντας εκ νέου προηγούμενες συναλλαγές στο EVM, οι οποίες μπορεί να είναι υπολογιστικά απαιτητικές όταν η επιθυμητή κατάσταση απέχει πολύ από το πλησιέστερο στιγμιότυπο.

Ωστόσο, αυτό σημαίνει ότι η πρόσβαση σε μια ιστορική κατάσταση σε έναν πλήρη κόμβο καταναλώνει υπολογιστική ισχύ. Ο πελάτης μπορεί να χρειαστεί να εκτελέσει όλες τις προηγούμενες συναλλαγές και να υπολογίσει μια ιστορική κατάσταση από τη γένεση. Οι κόμβοι αρχειοθέτησης το λύνουν αυτό αποθηκεύοντας όχι μόνο τις πιο πρόσφατες καταστάσεις αλλά και κάθε ιστορική κατάσταση που δημιουργείται μετά από κάθε μπλοκ. Βασικά κάνει ένα συμβιβασμό με μεγαλύτερη απαίτηση χώρου στο δίσκο.

Είναι σημαντικό να σημειωθεί ότι το δίκτυο δεν εξαρτάται από κόμβους αρχειοθέτησης για τη διατήρηση και την παροχή όλων των ιστορικών δεδομένων. Όπως αναφέρθηκε παραπάνω, όλες οι ενδιάμεσες ιστορικές καταστάσεις μπορούν να συμπληρωθούν σε έναν πλήρη κόμβο. Οι συναλλαγές αποθηκεύονται από οποιονδήποτε πλήρη κόμβο (επί του παρόντος λιγότερο από 400G) και μπορούν να αναπαραχθούν ξανά για τη δημιουργία ολόκληρου του αρχείου.

### Περιπτώσεις χρήσης

Η τακτική χρήση του Ethereum, όπως η αποστολή συναλλαγών, η ανάπτυξη συμβάσεων, η επαλήθευση της συναίνεσης κ. λπ. δεν απαιτεί πρόσβαση σε ιστορικές καταστάσεις. Οι χρήστες δε χρειάζονται ποτέ έναν κόμβο αρχειοθέτησης για μια τυπική αλληλεπίδραση με το δίκτυο.

Το κύριο πλεονέκτημα του αρχείου κατάστασης είναι η γρήγορη πρόσβαση σε ερωτήματα σχετικά με ιστορικές καταστάσεις. Για παράδειγμα, ο κόμβος αρχειοθέτησης θα επέστρεφε αμέσως αποτελέσματα όπως:

- _Ποιο ήταν το υπόλοιπο ETH του λογαριασμού 0x1337... στο μπλοκ 15537393;_
- _Ποιο είναι το υπόλοιπο του κρυπτονομίσματος 0x στο συμβόλαιο 0x στο μπλοκ 1920000;_

Όπως εξηγήθηκε παραπάνω, ένας πλήρης κόμβος θα χρειαστεί να δημιουργήσει αυτά τα δεδομένα με την εκτέλεση EVM που χρησιμοποιεί το CPU και απαιτεί χρόνο. Οι κόμβοι αρχειοθέτησης έχουν πρόσβαση σε αυτούς στο δίσκο και εξυπηρετούν τις απαντήσεις αμέσως. Αυτή είναι μια χρήσιμη δυνατότητα για ορισμένα μέρη της υποδομής, για παράδειγμα:

- Πάροχοι υπηρεσιών όπως οι εξερευνητές μπλοκ
- Ερευνητές
- Αναλυτές ασφαλείας
- Προγραμματιστές dapp
- Έλεγχος και συμμόρφωση

Υπάρχουν διάφορες δωρεάν [υπηρεσίες](/developers/docs/nodes-and-clients/nodes-as-a-service/) που επίσης επιτρέπουν πρόσβαση σε ιστορικά δεδομένα. Καθώς είναι πιο απαιτητικό η εκτέλεση ενός κόμβου αρχειοθέτησης, αυτή η πρόσβαση είναι ως επί το πλείστον περιορισμένη και λειτουργεί μόνο για περιστασιακή πρόσβαση. Εάν το έργο σας απαιτεί συνεχή πρόσβαση σε ιστορικά δεδομένα, θα πρέπει να εξετάσετε το ενδεχόμενο να εκτελέσετε ένα μόνοι σας.

## Εφαρμογές και χρήσεις

Ο κόμβος αρχειοθέτησης σε αυτό το πλαίσιο σημαίνει δεδομένα που εξυπηρετούνται από πελάτες επιπέδου εκτέλεσης που αντιμετωπίζουν οι χρήστες καθώς χειρίζονται τη βάση δεδομένων κατάστασης και παρέχουν τελικά σημεία JSON-RPC. Οι επιλογές διαμόρφωσης, ο χρόνος συγχρονισμού και το μέγεθος της βάσης δεδομένων ενδέχεται να διαφέρουν ανάλογα με τον πελάτη. Για λεπτομέρειες, ανατρέξτε στην τεκμηρίωση που παρέχεται από τον πελάτη σας.

Πριν ξεκινήσετε τον δικό σας κόμβο αρχειοθέτησης, μάθετε για τις διαφορές μεταξύ των πελατών και ιδιαίτερα τα διάφορα [απαιτήσεις σε υλικό](/developers/docs/nodes-and-clients/run-a-node/#requirements). Οι περισσότεροι πελάτες δεν είναι βελτιστοποιημένοι για αυτήν τη δυνατότητα και τα αρχεία τους απαιτούν περισσότερο από 12TB χώρου. Αντίθετα, υλοποιήσεις όπως το Erigon μπορούν να αποθηκεύσουν τα ίδια δεδομένα με λιγότερο από 3TB, γεγονός που τις καθιστά τον πιο αποτελεσματικό τρόπο εκτέλεσης ενός κόμβου αρχειοθέτησης.

## Συνιστώμενες πρακτικές

Εκτός από τις γενικές [προτάσεις για την εκτέλεση ενός κόμβου](/developers/docs/nodes-and-clients/run-a-node/), ένας κόμβος αρχειοθέτησης μπορεί να είναι πιο απαιτητικός σε υλικό και συντήρηση. Λαμβάνοντας υπόψη τα [βασικά χαρακτηριστικά](https://github.com/ledgerwatch/erigon#key-features) του Erigons, η πιο πρακτική προσέγγιση είναι η χρήση της εφαρμογής πελάτη [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Εξοπλισμός

Να φροντίζετε πάντα να επαληθεύετε τις απαιτήσεις υλικού για μια δεδομένη λειτουργία στην τεκμηρίωση ενός πελάτη. Η μεγαλύτερη απαίτηση για τους κόμβους αρχειοθέτησης είναι ο χώρος στο δίσκο. Ανάλογα με τον πελάτη, ποικίλλει από 3TB έως 12TB. Ακόμα και αν ο HDD μπορεί να θεωρηθεί καλύτερη λύση για μεγάλες ποσότητες δεδομένων, ο συγχρονισμός του και η συνεχής ενημέρωση της κεφαλής της αλυσίδας θα απαιτήσουν μονάδες SSD. Οι μονάδες [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) είναι αρκετά καλές, αλλά θα πρέπει να είναι αξιόπιστης ποιότητας, τουλάχιστον [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Οι δίσκοι μπορούν να τοποθετηθούν σε έναν επιτραπέζιο υπολογιστή ή σε έναν διακομιστή με αρκετές υποδοχές. Τέτοιες αποκλειστικές συσκευές είναι ιδανικές για τη λειτουργία κόμβου υψηλού χρόνου λειτουργίας. Είναι απολύτως δυνατό να το εκτελέσετε σε φορητό υπολογιστή, αλλά η φορητότητα θα έχει επιπλέον κόστος.

Όλα τα δεδομένα πρέπει να χωρούν σε έναν τόμο, επομένως οι δίσκοι πρέπει να ενωθούν, π.χ. με [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) ή LVM. Ίσως αξίζει επίσης να εξετάσετε το ενδεχόμενο χρήσης του [ZFS](https://en.wikipedia.org/wiki/ZFS) καθώς υποστηρίζει "Copy-on-write" που διασφαλίζει ότι τα δεδομένα εγγράφονται σωστά στο δίσκο χωρίς σφάλματα χαμηλού επιπέδου.

Για περισσότερη σταθερότητα και ασφάλεια στην αποφυγή τυχαίας καταστροφής της βάσης δεδομένων, ειδικά σε μια επαγγελματική εγκατάσταση, σκεφτείτε να χρησιμοποιήσετε [μνήμη ECC](https://en.wikipedia.org/wiki/ECC_memory) εάν το σύστημά σας την υποστηρίζει. Το μέγεθος της μνήμης RAM γενικά συνιστάται να είναι το ίδιο όπως για έναν πλήρη κόμβο, αλλά περισσότερη μνήμη RAM μπορεί να βοηθήσει στην επιτάχυνση του συγχρονισμού.

Κατά τον αρχικό συγχρονισμό, οι πελάτες σε λειτουργία αρχειοθέτησης θα εκτελέσουν κάθε συναλλαγή από τη γένεση. Η ταχύτητα εκτέλεσης περιορίζεται κυρίως από το CPU, επομένως ταχύτερο CPU μπορεί να βοηθήσει στον αρχικό χρόνο συγχρονισμού. Σε έναν υπολογιστή μέσου χρήστη, ο αρχικός συγχρονισμός μπορεί να διαρκέσει έως και έναν μήνα.

## Περισσότερες πληροφορίες {#further-reading}

- [Ethereum πλήρης κόμβος ή κόμβος αρχείου](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Σεπτέμβριος 2022_
- [Δημιουργήστε τον δικό σας κόμβο αρχείου Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Αύγουστος 2021_
- [Πώς να ρυθμίσετε το Erigon, το Erigon’s RPC και το TrueBlocks (scrape και API) ως υπηρεσίες](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, ενημερώθηκε Σεπτέμβριο 2022_

## Σχετικά θέματα {#related-topics}

- [ Κόμβοι και πελάτες](/developers/docs/nodes-and-clients/)
- [Εκτέλεση κόμβου](/developers/docs/nodes-and-clients/run-a-node/)
