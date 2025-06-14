---
title: Στρατηγικές αποθήκευσης δεδομένων Blockchain
description: Υπάρχουν διάφοροι τρόποι αποθήκευσης δεδομένων χρησιμοποιώντας το blockchain. Αυτό το άρθρο θα συγκρίνει τις διαφορετικές στρατηγικές, το κόστος και τους συμβιβασμούς τους, καθώς και τις απαιτήσεις για την ασφαλή χρήση τους.
lang: el
---

Υπάρχουν πολλοί τρόποι αποθήκευσης πληροφοριών είτε απευθείας στο blockchain είτε με τρόπο που να διασφαλίζεται από αυτό:

- EIP-4844 blobs
- Calldata
- Εκτός αλυσίδας με μηχανισμούς L1
- «Κώδικας» συμβολαίου
- Συμβάντα
- Αποθηκευτικός χώρος EVM

Η επιλογή της μεθόδου που θα χρησιμοποιηθεί βασίζεται σε διάφορα κριτήρια:

- Η πηγή των πληροφοριών. Οι πληροφορίες στα δεδομένα κλήσης δεν μπορούν να προέρχονται απευθείας από το ίδιο το blockchain.
- Ο προορισμός των πληροφοριών. Το Calldata είναι διαθέσιμο μόνο στη συναλλαγή που αφορά. Τα γεγονότα δεν είναι καθόλου προσβάσιμα στην αλυσίδα.
- Πόση ταλαιπωρία είναι αποδεκτή; Οι υπολογιστές που εκτελούν έναν κόμβο πλήρους κλίμακας μπορούν να εκτελέσουν περισσότερη επεξεργασία από έναν ελαφρύ πελάτη σε μια εφαρμογή που εκτελείται σε πρόγραμμα περιήγησης.
- Είναι απαραίτητο να διευκολυνθεί η εύκολη πρόσβαση στις πληροφορίες από κάθε κόμβο;
- Οι απαιτήσεις ασφαλείας.

## Οι απαιτήσεις ασφαλείας {#security-requirements}

Γενικά, η ασφάλεια πληροφοριών αποτελείται από τρία χαρακτηριστικά:

- _Εμπιστευτικότητα_, οι μη εξουσιοδοτημένες οντότητες δεν επιτρέπεται να διαβάζουν τις πληροφορίες. Αυτό είναι σημαντικό σε πολλές περιπτώσεις, αλλά όχι εδώ. _Δεν υπάρχουν μυστικά στο blockchain_. Τα blockchain λειτουργούν επειδή οποιοσδήποτε μπορεί να επαληθεύσει τις μεταβάσεις κατάστασης, επομένως είναι αδύνατο να χρησιμοποιηθούν για την απευθείας αποθήκευση μυστικών. Υπάρχουν τρόποι αποθήκευσης εμπιστευτικών πληροφοριών στο blockchain, αλλά όλοι βασίζονται σε κάποιο εξάρτημα εκτός αλυσίδας για την αποθήκευση τουλάχιστον ενός κλειδιού.

- _Integrity_, οι πληροφορίες είναι σωστές, δεν μπορούν να αλλάξουν από μη εξουσιοδοτημένες οντότητες ή με μη εξουσιοδοτημένους τρόπους (για παράδειγμα, μεταφορά [ERC-20 tokens](https://eips.ethereum.org/EIPS/eip-20#events) χωρίς ένα συμβάν «Μεταφοράς»). Στο blockchain, κάθε κόμβος επαληθεύει κάθε αλλαγή κατάστασης, η οποία διασφαλίζει την ακεραιότητα.

- _Διαθεσιμότητα_, οι πληροφορίες είναι διαθέσιμες σε κάθε εξουσιοδοτημένο φορέα. Στο blockchain, αυτό συνήθως επιτυγχάνεται έχοντας τις πληροφορίες διαθέσιμες σε κάθε [full node] (https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Οι διαφορετικές λύσεις εδώ έχουν όλες εξαιρετική ακεραιότητα, επειδή τα hashes δημοσιεύονται στο L1. Ωστόσο, έχουν διαφορετικές εγγυήσεις διαθεσιμότητας.

## Προαπαιτούμενα {#prerequisites}

Θα πρέπει να κατανοείτε καλά τις [βασικές αρχές του blockchain](/developers/docs/intro-to-ethereum/). Αυτή η σελίδα προϋποθέτει επίσης ότι ο αναγνώστης είναι εξοικειωμένος με τα [blocks](/developers/docs/blocks/), [transactions](/developers/docs/transactions/) και άλλα σχετικά θέματα.

## EIP-4844 blobs {#eip-4844-blobs}

Ξεκινώντας με [το Dencun hardfork](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) η κρυπτοαλυσίδα Ethereum περιλαμβάνει [EIP-4844](https:// eips.ethereum.org/EIPS/eip-4844), το οποίο προσθέτει στο Ethereum blobs δεδομένων με περιορισμένη διάρκεια ζωής (αρχικά περίπου [18 ημέρες](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Αυτά τα blobs τιμολογούνται ξεχωριστά από το [execution gas](/developers/docs/gas), αν και χρησιμοποιούν παρόμοιο μηχανισμό. Είναι ένας φθηνός τρόπος για να δημοσιεύσετε προσωρινά δεδομένα.

Η κύρια περίπτωση χρήσης για τα blobs EIP-4844 είναι για τα rollups που δημοσιεύουν τις συναλλαγές τους. Τα [Optimistic rollups](/developers/docs/scaling/optimistic-rollups) πρέπει να δημοσιεύουν τις συναλλαγές στα blockchains τους. Αυτές οι συναλλαγές πρέπει να είναι διαθέσιμες σε οποιονδήποτε κατά την [περίοδο πρόκλησης](https://docs.optimism.io/connect/resources/glossary#challenge-period) για να ενεργοποιηθούν οι [επικυρωτές](https://docs.optimism.io/connect/resources/glossary#validator) για να διορθώσετε το λάθος εάν ο [sequencer](https://docs.optimism.io/connect/resources/glossary#sequencer) του rollup δημοσιεύει ένα λανθασμένο root κατάστασης.

Ωστόσο, μόλις περάσει η περίοδος πρόκλησης και οριστικοποιηθεί το root κατάστασης, ο σκοπός που απομένει για τη γνώση αυτών των συναλλαγών είναι η αναπαραγωγή της τρέχουσας κατάστασης της αλυσίδας. Αυτή η κατάσταση είναι επίσης διαθέσιμη από κόμβους αλυσίδας, με πολύ λιγότερη απαίτηση επεξεργασίας. Επομένως, οι πληροφορίες συναλλαγών θα πρέπει να εξακολουθούν να διατηρούνται σε μερικά μέρη, όπως [εξερευνητές μπλοκ](/developers/docs/data-and-analytics/block-explorers), αλλά δε χρειάζεται να πληρώσετε για το επίπεδο αντίστασης λογοκρισίας που παρέχει το Ethereum.

Τα [Zero-knowledge rollups](/developers/docs/scaling/zk-rollups/#data-availability) δημοσιεύουν επίσης τα δεδομένα συναλλαγών τους για να επιτρέψουν σε άλλους κόμβους να αναπαράγουν την υπάρχουσα κατάσταση και να επαληθεύσουν τις αποδείξεις εγκυρότητας, αλλά και πάλι αυτό είναι βραχυπρόθεσμη απαίτηση.

Κατά τη σύνταξη της ανάρτησης στο EIP-4844 κοστίζει ένα wei (10<sup>-18</sup> ETH) ανά byte, το οποίο είναι αμελητέο σε σύγκριση με [το 21,000 gas εκτέλεσης που κοστίζει οποιαδήποτε συναλλαγή, συμπεριλαμβανομένης αυτής που δημοσιεύει blobs](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Μπορείτε να δείτε την τρέχουσα τιμή EIP-4844 στο [blobscan.com](https://blobscan.com/blocks).

Δείτε παρακάτω τις διευθύνσεις blobs που δημοσιεύτηκαν από μερικές διάσημα rollups.

| Πακέτο ενημέρωσης                    | Διεύθυνση                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Το Calldata αναφέρεται στα byte που αποστέλλονται ως μέρος της συναλλαγής. Αποθηκεύεται ως μέρος της μόνιμης εγγραφής του blockchain στο μπλοκ που περιλαμβάνει τη συγκεκριμένη συναλλαγή.

Αυτή είναι η φθηνότερη μέθοδος για μόνιμη τοποθέτηση δεδομένων στο blockchain. Το κόστος ανά byte είναι είτε 4 gas εκτέλεσης (αν το byte είναι μηδέν) είτε 16 gas (οποιαδήποτε άλλη αξία). Εάν τα δεδομένα είναι συμπιεσμένα, κάτι που είναι τυπική πρακτική, τότε κάθε τιμή byte είναι εξίσου πιθανή, επομένως το μέσο κόστος είναι περίπου 15.95 gas ανά byte.

Τη στιγμή σύνταξης του άρθρου, οι τιμές είναι 12 gwei/gas και 2300 $/ETH, που σημαίνει ότι το κόστος είναι περίπου 45 σεντς ανά kilobyte. Επειδή αυτή ήταν η φθηνότερη μέθοδος πριν από την EIP-4844, αυτή είναι η μέθοδος που τα rollups χρησιμοποιούνταν για την αποθήκευση πληροφοριών συναλλαγών, οι οποίες πρέπει να είναι διαθέσιμες για [προκλήσεις σφαλμάτων](https://docs.optimism.io/stack/protocol/overview#fault-proofs), αλλά δε χρειάζεται να είναι άμεσα προσβάσιμο στην αλυσίδα.

Δείτε παρακάτω τις διευθύνσεις συναλλαγών που δημοσιεύτηκαν από μερικά διάσημα rollups.

| Πακέτο ενημέρωσης                    | Διεύθυνση                                                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain με μηχανισμούς L1 {#offchain-with-l1-mechs}

Ανάλογα με τους συμβιβασμούς ασφαλείας σας, μπορεί να είναι αποδεκτό να τοποθετήσετε τις πληροφορίες αλλού και να χρησιμοποιήσετε έναν μηχανισμό που διασφαλίζει ότι τα δεδομένα είναι διαθέσιμα όταν χρειάζεται. Υπάρχουν δύο προϋποθέσεις για να λειτουργήσει αυτό:

1. Δημοσιεύστε ένα [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) των δεδομένων στο blockchain, που ονομάζεται _input commitment_. Αυτό μπορεί να είναι μια λέξη 32 byte, επομένως δεν είναι ακριβή. Εφόσον η δέσμευση εισόδου είναι διαθέσιμη, η ακεραιότητα είναι εξασφαλισμένη επειδή δεν είναι εφικτό να βρεθούν άλλα δεδομένα που θα κάνουν hash την ίδια τιμή. Έτσι, εάν παρέχονται λανθασμένα δεδομένα, μπορούν να εντοπιστούν.

2. Να έχετε έναν μηχανισμό που διασφαλίζει τη διαθεσιμότητα. Για παράδειγμα, στο [Redstone](https://redstone.xyz/docs/what-is-redstone) οποιοσδήποτε κόμβος μπορεί να υποβάλει μια πρόκληση διαθεσιμότητας. Εάν ο sequencer δεν ανταποκριθεί στην αλυσίδα εντός της προθεσμίας, η δέσμευση εισόδου απορρίπτεται, επομένως οι πληροφορίες θεωρείται ότι δεν έχουν δημοσιευτεί ποτέ.

Αυτό είναι αποδεκτό για ένα optimistic rollup, επειδή βασιζόμαστε ήδη στην ύπαρξη τουλάχιστον ενός ειλικρινούς επαληθευτή για το root της κατάστασης. Ένας τέτοιος ειλικρινής επαληθευτής θα βεβαιωθεί επίσης ότι διαθέτει τα δεδομένα για την επεξεργασία μπλοκ και θα εκδώσει μια πρόκληση διαθεσιμότητας εάν οι πληροφορίες δεν είναι διαθέσιμες εκτός αλυσίδας. Αυτός ο τύπος optimistic rollup ονομάζεται [plasma](/developers/docs/scaling/plasma/).

## Κώδικάς συμβολαίου {#contract-code}

Οι πληροφορίες που χρειάζεται να γραφτούν μόνο μία φορά, δεν αντικαθίστανται ποτέ και πρέπει να είναι διαθέσιμες στην αλυσίδα και να μπορούν να αποθηκευτούν ως κώδικας συμβολαίου. Αυτό σημαίνει ότι δημιουργούμε ένα "έξυπνο συμβόλαιο" με τα δεδομένα και στη συνέχεια χρησιμοποιούμε το [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) για να διαβάσουμε τις πληροφορίες. Το πλεονέκτημα είναι ότι η αντιγραφή κώδικα είναι σχετικά φθηνή.

Εκτός από το κόστος επέκτασης μνήμης, το "EXTCODECOPY" κοστίζει 2600 gas για την πρώτη πρόσβαση σε ένα συμβόλαιο (όταν είναι "κρύο") και 100 gas για επόμενα αντίγραφα από το ίδιο συμβόλαιο συν 3 gas ανά λέξη 32 byte. Σε σύγκριση με το calldata, που κοστίζει 15,95 ανά byte, αυτό είναι φθηνότερο ξεκινώντας από περίπου 200 byte. Με βάση [τον τύπο για το κόστος επέκτασης μνήμης](https://www.evm.codes/about#memoryexpansion), εφόσον δε χρειάζεστε περισσότερα από 4 MB μνήμης, το κόστος επέκτασης μνήμης είναι μικρότερο από το κόστος προσθήκη δεδομένων κλήσης.

Φυσικά, αυτό είναι μόνο το κόστος για την _ανάγνωση_ των δεδομένων. Η δημιουργία του συμβολαίου κοστίζει περίπου 32.000 gas + 200 gas/byte. Αυτή η μέθοδος είναι οικονομική μόνο όταν χρειάζεται να διαβαστούν πολλές φορές οι ίδιες πληροφορίες σε διαφορετικές συναλλαγές.

Ο κωδικός σύμβασης μπορεί να είναι χωρίς σημασία, αρκεί να μην ξεκινά με «0xEF». Οι συμβάσεις που ξεκινούν με "0xEF" ερμηνεύονται ως [μορφή αντικειμένου ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), η οποία έχει πολύ πιο αυστηρές απαιτήσεις.

## Γεγονότα {#events}

Τα [Συμβάντα](https://docs.alchemy.com/docs/solidity-events) εκπέμπονται από έξυπνα συμβόλαια και διαβάζονται από λογισμικό εκτός αλυσίδας.
Το πλεονέκτημά τους είναι ότι ο κώδικας εκτός αλυσίδας μπορεί να ακούει συμβάντα. Το κόστος είναι [gas](https://www.evm.codes/#a0?fork=cancun), 375 συν 8 αέριο ανά byte δεδομένων. Σε 12 gwei/gas και 2300 $/ETH, αυτό μεταφράζεται σε ένα σεντ συν 22 σεντ ανά κιλομπάιτ.

## Αποθηκευτικός χώρος {#storage}

Τα έξυπνα συμβόλαια έχουν πρόσβαση σε [μόνιμο αποθηκευτικό χώρο](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Ωστόσο, είναι πολύ ακριβό. Η εγγραφή μιας λέξης 32 byte σε μια προηγουμένως άδεια υποδοχή αποθήκευσης μπορεί να [κοστίζει 22.100 gas](https://www.evm.codes/#55?fork=cancun). Σε 12 gwei/gas και 2300 $/ETH, αυτό είναι περίπου 61 σεντς ανά λειτουργία εγγραφής ή 19,5 $ ανά kilobyte.

Αυτή είναι η πιο ακριβή μορφή αποθήκευσης στο Ethereum.

## Περίληψη {#summary}

Αυτός ο πίνακας συνοψίζει τις διαφορετικές επιλογές, τα πλεονεκτήματα και τα μειονεκτήματά τους.

| Τύπος αποθ. χώρου | Πηγή δεδομένων           | Εγγύηση διαθεσιμότητας                                                                                                                             | Διαθεσιμότητα στην αλυσίδα                                              | Πρόσθετοι περιορισμοί                                          |
| --------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| EIP-4844 blobs                    | Εκτός αλυσίδας           | Εγγύηση Ethereum για [~18 ημέρες](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Μόνο κατακερματισμός είναι διαθέσιμος                                   |                                                                |
| Calldata                          | Εκτός αλυσίδας           | Εγγύηση Ethereum για πάντα (μέρος του blockchain)                                                                               | Διατίθεται μόνο εάν εγγραφεί σε ένα συμβόλαιο και σε αυτήν τη συναλλαγή |                                                                |
| Εκτός αλυσίδας με μηχανισμούς L1  | Εκτός αλυσίδας           | Εγγύηση "Ένας έντιμος επαληθευτής" κατά την περίοδο πρόκλησης                                                                                      | Μόνο κατακερματισμός                                                    | Εγγύηση μηχανισμού πρόκλησης, κατά την περίοδο πρόκλησης       |
| Κώδικας συμβολαίου                | Εκτός ή επί της αλυσίδας | Εγγύηση Ethereum για πάντα (μέρος του blockchain)                                                                               | Ναι                                                                     | Γράφεται σε "τυχαία" διεύθυνση, δεν μπορεί να ξεκινά με `0xEF` |
| Συμβάντα                          | Επί της αλυσίδας         | Εγγύηση Ethereum για πάντα (μέρος του blockchain)                                                                               | Όχι                                                                     |                                                                |
| Αποθηκευτικός χώρος               | Επί της αλυσίδας         | Εγγύηση Ethereum για πάντα (μέρος του blockchain και την παρούσα κατάσταση μέχρι να αντικατασταθεί)                             | Ναι                                                                     |                                                                |
