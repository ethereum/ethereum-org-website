---
title: Ανταμοιβές και ποινές της απόδειξης συμμετοχής
description: Μάθετε για τα κίνητρα εντός του πρωτοκόλλου στο Ethereum της απόδειξης συμμετοχής.
lang: el
---

Το Ethereum ασφαλίζεται μέσω της χρήσης του εγγενούς κρυπτονομίσματός του, το ether (ETH). Οι χειριστές κόμβων που επιθυμούν να συμμετάσχουν στην επικύρωση μπλοκ και στην αναγνώριση της κεφαλίδας της αλυσίδας, καταθέτουν ether μέσα στο [συμβόλαιο κατάθεσης](/staking/deposit-contract/) στο Ethereum. Στη συνέχεια, πληρώνονται σε ether για να τρέξουν λογισμικό επικύρωσης που ελέγχει την εγκυρότητα των νέων μπλοκ που λαμβάνονται μέσω του δικτύου peer-to-peer και εφαρμόζει τον αλγόριθμο επιλογής ενσωμάτωσης για να προσδιορίσει την κεφαλή της αλυσίδας.

Υπάρχουν δύο κύριοι ρόλοι για έναν επικυρωτή: 1) ο έλεγχος νέων μπλοκ και η χορήγηση «βεβαίωσης» τους εάν είναι έγκυροι, 2) η πρόταση νέων μπλοκ όταν επιλέγονται τυχαία από τη συνολική ομάδα επικυρωτών. Εάν ο επικυρωτής αποτύχει να κάνει κάποια από αυτές τις εργασίες όταν του ζητηθεί, χάνει μια πληρωμή ether. Οι επικυρωτές είναι επίσης μερικές φορές επιφορτισμένοι με τη συγκέντρωση υπογραφών και τη συμμετοχή σε επιτροπές συγχρονισμού.

Υπάρχουν επίσης ορισμένες ενέργειες που είναι πολύ δύσκολο να γίνουν κατά λάθος και υποδηλώνουν κάποια κακόβουλη πρόθεση, όπως η πρόταση πολλαπλών μπλοκ για το ίδιο χρονικό κενό ή η βεβαίωση πολλαπλών μπλοκ για το ίδιο χρονικό κενό. Πρόκειται για «επιλήψιμες» συμπεριφορές που έχουν ως αποτέλεσμα το πρόγραμμα επικύρωσης να κάψει κάποια ποσότητα ether (έως 1 ETH) προτού αφαιρεθεί ο επικυρωτής από το δίκτυο, κάτι που διαρκεί 36 ημέρες. Το ether του επικυρωτή που έχει υποβληθεί σε ποινή περικοπής εξαντλείται σιγά σιγά κατά τη διάρκεια της περιόδου εξόδου, αλλά τη 18η Ημέρα λαμβάνουν μια «ποινή συσχέτισης» η οποία είναι μεγαλύτερη όταν περισσότεροι επικυρωτές υποβάλλονται σε περικοπές περίπου την ίδια στιγμή. Επομένως, η δομή κινήτρων του μηχανισμού συναίνεσης πληρώνει την ειλικρίνεια και τιμωρεί τα κακόβουλα στοιχεία.

Όλες οι ανταμοιβές και οι ποινές εφαρμόζονται μία φορά ανά εποχή.

Διαβάστε παρακάτω για περισσότερες λεπτομέρειες...

## Επιβραβεύσεις και κυρώσεις {#rewards}

### Ανταμοιβές {#rewards}

Οι επικυρωτές λαμβάνουν ανταμοιβές όταν κάνουν ψήφους που είναι συνεπείς με την πλειοψηφία των άλλων επικυρωτών, όταν προτείνουν μπλοκ και όταν συμμετέχουν σε επιτροπές συγχρονισμού. Η αξία των ανταμοιβών σε κάθε εποχή υπολογίζεται από ένα `base_reward`. Αυτή είναι η βασική μονάδα από την οποία υπολογίζονται άλλες ανταμοιβές. Το `base_reward` αντιπροσωπεύει τη μέση ανταμοιβή που λαμβάνει ένας επικυρωτής υπό άριστες συνθήκες ανά εποχή. Αυτό υπολογίζεται από το πραγματικό υπόλοιπο του επικυρωτή και τον συνολικό αριθμό των ενεργών επικυρωτών ως εξής:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

όπου `base_reward_factor` είναι 64, `base_rewards_per_epoch` είναι 4 και `sum(active balance)` είναι το συνολικό αποθηκευμένο ether μεταξύ όλων των ενεργών επικυρωτών.

Αυτό σημαίνει ότι η βασική ανταμοιβή είναι ανάλογη με το πραγματικό υπόλοιπο του επικυρωτή και αντιστρόφως ανάλογη με τον αριθμό των επικυρωτών στο δίκτυο. Όσο περισσότεροι επικυρωτές, τόσο μεγαλύτερη είναι η συνολική έκδοση (ως `sqrt(N)` αλλά τόσο μικρότερη η `base_reward` ανά επικυρωτή (ως `1/sqrt(N)`). Αυτοί οι παράγοντες επηρεάζουν το APR για έναν κόμβο αποθήκευσης. Διαβάστε το σκεπτικό για αυτό στις [σημειώσεις του Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Στη συνέχεια, η συνολική ανταμοιβή υπολογίζεται ως το άθροισμα πέντε συστατικών που το καθένα έχει μια στάθμιση που καθορίζει πόσο προσθέτει κάθε συστατικό στη συνολική ανταμοιβή. Τα συστατικά είναι:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Οι σταθμίσεις για κάθε συστατικό είναι οι εξής:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

Το άθροισμα αυτών των σταθμίσεων είναι 64. Η ανταμοιβή υπολογίζεται ως το άθροισμα των ισχυόντων σταθμίσεων διαιρούμενο με το 64. Ένας επικυρωτής που έχει κάνει έγκαιρες ψηφοφορίες πηγής, στόχου και κεφαλής, έχει προτείνει ένα μπλοκ και συμμετείχε σε μια επιτροπή συγχρονισμού θα μπορούσε να λάβει `64/64 * base_reward == base_reward`. Ωστόσο, ένας επικυρωτής δεν είναι συνήθως προτείνων μπλοκ. Επομένως, η μέγιστη ανταμοιβή του είναι `64-8 /64 * base_reward == 7/8 * base_reward`. Οι επικυρωτές που δεν είναι ούτε προτείνοντες μπλοκ ούτε σε επιτροπή συγχρονισμού μπορούν να λάβουν `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Προστίθεται μια επιπλέον ανταμοιβή για την παροχή κινήτρων για γρήγορες βεβαιώσεις. Είναι το `inclusion_delay_reward`. Έχει αξία ίση με το `base_reward` πολλαπλασιασμένο επί `1/delay` όπου `delay` είναι ο αριθμός των χρονικών κενών που χωρίζουν την πρόταση μπλοκ και τη βεβαίωση. Για παράδειγμα, εάν η βεβαίωση υποβληθεί εντός ενός χρονικού κενού από την πρόταση μπλοκ, ο εκδότης της βεβαίωσης λαμβάνει `base_reward * 1/1 == base_reward`. Εάν η βεβαίωση φτάσει στο επόμενο χρονικό κενό, ο εκδότης της βεβαίωσης λαμβάνει `base_reward * 1/2` και ούτω καθεξής.

Οι προτείνοντες μπλοκ λαμβάνουν `8 / 64 * base_reward` για **κάθε έγκυρη βεβαίωση** που περιλαμβάνεται στο μπλοκ, επομένως η πραγματική αξία της ανταμοιβής κλιμακώνεται με τον αριθμό των επικυρωτών που χορηγούν βεβαιώσεις. Οι προτείνοντες μπλοκ μπορούν επίσης να αυξήσουν την ανταμοιβή τους συμπεριλαμβάνοντας αποδεικτικά στοιχεία κακής συμπεριφοράς από άλλους επικυρωτές στο προτεινόμενο μπλοκ τους. Αυτές οι ανταμοιβές είναι τα «καρότα» που ενθαρρύνουν την ειλικρίνεια των επικυρωτών. Ένα προτεινόμενο μπλοκ που περιλαμβάνει περικοπή θα ανταμειφθεί με το `slashed_validators_effective_balance / 512`.

### Κυρώσεις {#penalties}

Μέχρι στιγμής ασχοληθήκαμε με επικυρωτές με εξαιρετική συμπεριφορά. Τι γίνεται, όμως, με τους επικυρωτές που δεν καταθέτουν εγκαίρως ψήφους κεφαλής, πηγής και στόχου ή αργούν να το κάνουν;

Οι ποινές για την απώλεια των ψήφων στόχου και πηγής είναι ίσες με τις ανταμοιβές που θα λάμβανε ο εκδότης της βεβαίωσης εάν τις είχε υποβάλει. Αυτό σημαίνει ότι αντί να προστεθεί η ανταμοιβή στο υπόλοιπό τους, αφαιρείται ποσό ίσης αξίας από το υπόλοιπό τους. Δεν υπάρχει τιμωρία για την απώλεια της ψήφου κεφαλής (δηλαδή οι ψήφοι κεφαλής επιβραβεύονται μόνο, ποτέ δεν τιμωρούνται). Δεν υπάρχει ποινή που να σχετίζεται με την `inclusion_delay` — η ανταμοιβή απλά δεν θα προστεθεί στο υπόλοιπο του επικυρωτή. Επίσης, δεν υπάρχει ποινή για την παράλειψη πρότασης μπλοκ.

Διαβάστε περισσότερα σχετικά με τις ανταμοιβές και τις ποινές στις [προδιαγραφές συναίνεσης](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Οι ανταμοιβές και οι ποινές προσαρμόστηκαν στην αναβάθμιση του Bellatrix — παρακολουθήστε τον Danny Ryan και τον Vitalik να το συζητούν σε αυτό το [Peep an EIP video](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Περικοπή {#slashing}

Η περικοπή είναι μια πιο σοβαρή ενέργεια που έχει ως αποτέλεσμα τη βίαιη αφαίρεση ενός επικυρωτή από το δίκτυο και τη σχετική απώλεια του αποθηκευμένου κεφαλαίου ether του. Υπάρχουν τρεις τρόποι με τους οποίους μπορεί να περικοπεί ένας επικυρωτής, όλοι εκ των οποίων σχετίζονται με την ανέντιμη πρόταση ή τη βεβαίωση μπλοκ:

- Πρόταση και υπογραφή δύο διαφορετικών μπλοκ για το ίδιο χρονικό κενό
- Έκδοση βεβαίωσης ενός μπλοκ που «περιβάλλει» ένα άλλο (αλλάζοντας ουσιαστικά το ιστορικό)
- «Διπλή ψηφοφορία» μέσω βεβαίωσης δύο υποψηφίων για το ίδιο μπλοκ

Εάν εντοπιστούν αυτές οι ενέργειες, ο επικυρωτής υποβάλλεται σε περικοπή. Αυτό σημαίνει ότι το 0,0078125 καίγεται αμέσως για έναν επικυρωτή 32 ETH (κλιμακώνεται γραμμικά με το ενεργό υπόλοιπο) και στη συνέχεια ξεκινά μια περίοδος αφαίρεσης 36 ημερών. Κατά τη διάρκεια αυτής της περιόδου απομάκρυνσης το αποθηκευμένο κεφάλαιο του επικυρωτή σταδιακά μειώνεται. Στο μέσο σημείο (Ημέρα 18) εφαρμόζεται μια πρόσθετη ποινή της οποίας το μέγεθος κλιμακώνεται με το συνολικό δεσμευμένο ether όλων των περικομμένων επικυρωτών στις 36 ημέρες πριν από το γεγονός περικοπής. Αυτό σημαίνει ότι όταν περικόπτονται περισσότεροι επικυρωτές, το μέγεθος της περικοπής αυξάνεται. Η μέγιστη περικοπή είναι το πλήρες πραγματικό υπόλοιπο όλων των περικομμένων επικυρωτών (δηλαδή, εάν υπάρχουν πολλοί επικυρωτές που υποβάλλονται σε περικοπή, θα μπορούσαν να χάσουν ολόκληρο το κεφάλαιό τους). Από την άλλη πλευρά, ένα μεμονωμένο γεγονός περικοπής καίει μόνο ένα μικρό μέρος του αποθηκευμένου κεφαλαίου του επικυρωτή. Αυτή η ποινή του μέσου σημείου που κλιμακώνεται με τον αριθμό των περικομμένων επικυρωτών ονομάζεται «ποινή συσχέτισης».

## Διαρροή αδράνειας {#inactivity-leak}

Εάν περάσουν περισσότερες από τέσσερις εποχές χωρίς να οριστικοποιηθεί το επίπεδο συναίνεσης, ενεργοποιείται ένα πρωτόκολλο έκτακτης ανάγκης που ονομάζεται «διαρροή λόγω αδράνειας». Ο απώτερος στόχος της διαρροής λόγω αδράνειας είναι να δημιουργηθούν οι προϋποθέσεις που απαιτούνται για την αποκατάσταση της οριστικότητας της αλυσίδας. Όπως εξηγήθηκε παραπάνω, η οριστικότητα απαιτεί την επίτευξη συμφωνίας από τα 2/3 της πλειοψηφίας του συνολικού αποθηκευμένου ether ως προς τα σημεία ελέγχου πηγής και στόχου. Εάν οι επικυρωτές που αντιπροσωπεύουν περισσότερο από το 1/3 των συνολικών επικυρωτών βγουν εκτός σύνδεσης ή δεν υποβάλουν σωστές βεβαιώσεις, τότε δεν είναι δυνατό για τα 2/3 της υπερπλειοψηφίας να οριστικοποιήσουν τα σημεία ελέγχου. Η διαρροή λόγω αδράνειας επιτρέπει στο αποθηκευμένο κεφάλαιο που ανήκει στους ανενεργούς επικυρωτές να εξαντληθεί σταδιακά, μέχρι να φτάσουν σε σημείο να ελέγχουν λιγότερο από το 1/3 του συνολικού αποθηκευμένου κεφαλαίου, επιτρέποντας στους υπόλοιπους ενεργούς επικυρωτές να οριστικοποιήσουν την αλυσίδα. Όσο μεγάλη κι αν είναι η ομάδα των ανενεργών επικυρωτών, οι εναπομείναντες ενεργοί επικυρωτές θα ελέγχουν τελικά >2/3 του κεφαλαίου. Η απώλεια αποθηκευμένου κεφαλαίου είναι ένα ισχυρό κίνητρο για τους ανενεργούς επικυρωτές να επανενεργοποιηθούν το συντομότερο δυνατό! Ένα σενάριο διαρροής λόγω αδράνειας παρουσιάστηκε στο δίκτυο δοκιμής Medalla, όταν < 66% των ενεργών επικυρωτών μπόρεσαν να συμφωνήσουν σχετικά με την τρέχουσα κεφαλή της αλυσίδας. Η διαρροή λόγω αδράνειας ενεργοποιήθηκε και τελικά αποκαταστάθηκε η οριστικότητα!

Ο σχεδιασμός ανταμοιβής, ποινής και περικοπής του μηχανισμού συναίνεσης ενθαρρύνει μεμονωμένους επικυρωτές να συμπεριφέρονται σωστά. Ωστόσο, από αυτές τις επιλογές σχεδιασμού αναδύεται ένα σύστημα που παρέχει ισχυρά κίνητρα για την ίση κατανομή των επικυρωτών σε πολλούς πελάτες, και θα πρέπει να αποθαρρύνεται σθεναρά η επικράτηση ενός μεμονωμένου πελάτη.

## Περισσότερες πληροφορίες {#further-reading}

- [Αναβάθμιση του Ethereum: Το επίπεδο των κινήτρων](https://eth2book.info/altair/part2/incentives)
- [Κίνητρα στο υβριδικό πρωτόκολλο Casper του Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Προδιαγραφή με σχόλια του Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Συμβουλές αποτροπής περικοπής Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Επεξήγηση EIP-7251: Αύξηση του μέγιστου αποτελεσματικού υπολοίπου για επικυρωτές](https://research.2077.xyz/eip-7251_Increase_MAX_EFFECTIVE_BALANCE)
- [Ανάλυση περικοπών ποινών βάσει του EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Πηγές_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
