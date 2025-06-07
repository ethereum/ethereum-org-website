---
title: Ιστορικό και Αναβαθμίσεις του Ethereum
description: Το ιστορικό της κεντρικής κρυπτοαλυσίδας του Ethereum, που περιλαμβάνει σημαντικά ορόσημα, ανακοινώσεις και ενσωματώσεις.
lang: el
sidebarDepth: 1
---

# Η ιστορία του Ethereum {#the-history-of-ethereum}

Ένα χρονοδιάγραμμα με όλα τα μεγάλα ορόσημα, τις ενσωματώσεις και τις ενημερώσεις της κεντρικής αλυσίδας του Ethereum.

<ExpandableCard title="Τι είναι οι ενσωματώσεις;" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Οι ενσωματώσεις πραγματοποιούνται όταν απαιτούνται σημαντικές τεχνικές αλλαγές ή αναβαθμίσεις στο δίκτυο - συνήθως προέρχονται από τις προτάσεις βελτίωσης <a href="/eips/">Ethereum Improvement Proposals (EIPs)</a> και τροποποιούν τους «κανόνες» του πρωτοκόλλου.

Όταν απαιτούνται αναβαθμίσεις στο παραδοσιακό, κεντρικά ελεγχόμενο λογισμικό, η εταιρεία θα δημοσιεύσει απλώς μια νέα έκδοση για τον τελικό χρήστη. Οι κρυπτοαλυσίδες λειτουργούν διαφορετικά καθώς δεν υπάρχει κεντρική ιδιοκτησία. Οι <a href="/developers/docs/nodes-and-clients/">Πελάτες Ethereum</a> πρέπει να ενημερώσουν το λογισμικό τους για να εφαρμόσουν τους νέους κανόνες της αναβάθμισης. Επιπλέον, οι δημιουργοί των μπλοκ (οι κρυπτορύχοι που λειτουργούν με την απόδειξη εργασίας, καθώς και οι επαληθευτές με χρήση της απόδειξης συμμετοχής) και οι κόμβοι θα πρέπει να δημιουργήσουν νέα μπλοκ και να επικυρώσουν με βάση τους νέους κανόνες. <a href="/developers/docs/consensus-mechanisms/">Περισσότερα για τους μηχανισμούς συναίνεσης</a>

Αυτές οι αλλαγές κανόνων μπορεί να δημιουργήσουν ένα προσωρινό διαχωρισμό στο δίκτυο. Τα νέα μπλοκ θα μπορούσαν να παραχθούν σύμφωνα με τους νέους κανόνες ή τους παλιούς. Οι αναβαθμίσεις καθορίζονται έγκαιρα, έτσι ώστε οι εφαρμογές πελάτη να μπορέσουν να υιοθετήσουν και να εφαρμόσουν τις αλλαγές κατά την ενημέρωση, ώστε και η ενσωμάτωση με τις αναβαθμίσεις να καταστεί ως η νέα κύρια αλυσίδα. Ωστόσο, σε σπάνιες περιπτώσεις, κάποιες διαφωνίες σχετικά με τις αναβαθμίσεις μπορούν να προκαλέσουν μόνιμο διαχωρισμό του δικτύου, όπως τη δημιουργία του Ethereum Classic με την <a href="#dao-fork">προσθήκη DAO</a>.

</ExpandableCard>

<ExpandableCard title="Γιατί μερικές αναβαθμίσεις έχουν πολλά ονόματα;" contentPreview="Upgrades names follow a pattern">

Το λογισμικό που βρίσκεται κάτω από το Ethereum αποτελείται από δύο μισά, γνωστά ως [επίπεδο εκτέλεσης](/glossary/#execution-layer) και το [επίπεδο συναίνεσης](/glossary/#consensus-layer).

**Ονοματολογία αναβάθμισης επιπέδου εκτέλεσης**

Από το 2021, οι αναβαθμίσεις στο επίπεδο εκτέλεσης ονομάζονται σύμφωνα με τα ονόματα πόλεων προηγούμενων τοποθεσιών Devcon με χρονολογική σειρά:

| Όνομα Αναβάθμισης | Έτος Devcon | Αριθμός Devcon | Ημερομηνία Αναβάθμισης |
| ------------ | ----------- | ------------- | ------------ |
| Βερολίνο       | 2014        | 0             | 15 Απρ 2021 |
| Λονδίνο       | 2015        | I             | 5 Αυγ 2021  |
| Σαγκάη     | 2016        | II            | 12 Απρ 2023 |
| Κανκούν       | 2017        | III           | 13 Μαρ 2024 |
| **Πράγα**   | 2018        | IV            | TBD - Επόμενη   |
| _Οσάκα_      | 2019        | V             | TBD          |
| _Μπογκοτά_     | 2022        | VI            | TBD          |
| _Μπανγκόκ_    | 2024        | VII           | TBD          |

**Ονοματολογία αναβάθμισης επιπέδου συναίνεσης**

Από την έναρξη της [Beacon Chain](/glossary/#beacon-chain), οι αναβαθμίσεις στο **επίπεδο συναίνεσης** παίρνουν το όνομά τους από ουράνια άστρα που ξεκινούν με γράμματα που ακολουθούν αλφαβητική σειρά:
| Όνομα Αναβάθμισης                                                  | Ημερομηνία Αναβάθμισης |
| ------------------------------------------------------------- | ------------ |
| Γένεση Beacon Chain                                          | 1 Δεκ 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 Οκτ 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 Σεπ 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 Απρ 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 Μαρ 2024 |
| [**Electra**](<https:>) | TBD - Επόμενη   |
| [_Fulu_](<https:>)         | TBD          |

**Συνδυασμένη ονομασία**

Οι αναβαθμίσεις στα επίπεδα εκτέλεσης και συναίνεσης κυκλοφόρησαν αρχικά σε διαφορετικές χρονικές στιγμές, αλλά μετά τη [Συγχώνευση](/roadmap/merge/) το 2022, αναπτύσσονται ταυτόχρονα. Ως εκ τούτου, οι όροι στην καθομιλουμένη έχουν προκύψει για να απλοποιήσουν τις αναφορές σε αυτές των αναβαθμίσεων χρησιμοποιώντας έναν μόνο συνδυασμένο όρο. Αυτό ξεκίνησε με την αναβάθμιση _Shanghai-Capella_, που συνήθως αναφέρεται ως "**Shapella**", και συνεχίζεται με τις αναβαθμίσεις _Cancun-Deneb_ (**Dencun**) και _Prague-Electra_ (**Pectra**).

| Αναβαθμ. Εκτελεστικού | Αναβάθμ. Συναινετικού | Σύντμηση |
| ----------------- | ----------------- | ---------- |
| Shanghai          | Capella           | "Shapella" |
| Cancun            | Deneb             | "Dencun"   |
| Prague            | Electra           | "Pectra"   |
| Osaka             | Fulu              | "Fusaka"   |

</ExpandableCard>

Μετάβαση κατευθείαν σε πληροφορίες σχετικά με τις ιδιαίτερα σημαντικές προηγούμενες αναβαθμίσεις: [Η Κεντρική Αλυσίδα](/roadmap/beacon-chain/), [Η συγχώνευση](/roadmap/merge/) και [EIP-1559](#london)

Αναζητείτε μελλοντικές αναβαθμίσεις πρωτοκόλλου; [Μάθετε για τις επερχόμενες αναβαθμίσεις οδικού χάρτη Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Η αναβάθμιση Prague-Electra ("Pectra") περιελάμβανε αρκετές βελτιώσεις στο πρωτόκολλο Ethereum με στόχο τη βελτίωση της εμπειρίας για όλους τους χρήστες, τα δίκτυα επιπέδου 2, τους χρήστες με δεσμευμένο κεφάλαιο και τους χειριστές κόμβων.

Η δέσμευση κεφαλαίων αναβαθμίστηκε με ανατοκισμό λογαριασμών επικύρωσης και βελτίωσε τον έλεγχο των δεσμευμένων κεφαλαίων χρησιμοποιώντας τη διεύθυνση εκτέλεσης ανάληψης. Το EIP-7251 αύξησε το μέγιστο αποτελεσματικό υπόλοιπο για έναν μόνο επικυρωτή σε 2048, βελτιώνοντας την κεφαλαιακή αποδοτικότητα για τους χρήστες με δέσμευση κεφαλαίου. Το EIP-7002 επέτρεψε σε έναν λογαριασμό επιπέδου εκτέλεσης να ενεργοποιεί με ασφάλεια ενέργειες επικυρωτή, συμπεριλαμβανομένης της εξόδου ή της ανάληψης τμημάτων των κεφαλαίων, βελτιώνοντας την εμπειρία για τους παίκτες με δέσμευση ETH, ενώ βοηθά στην ενίσχυση της λογοδοσίας για τους διαχειριστές κόμβων.

Άλλα μέρη της αναβάθμισης επικεντρώθηκαν στη βελτίωση της εμπειρίας για τους τακτικούς χρήστες. Το EIP-7702 εισήγαγε τη δυνατότητα ενός τακτικού λογαριασμού που δεν είναι έξυπνο συμβόλαιο ([EOA](/glossary/#eoa)) να εκτελεί κώδικα παρόμοιο με ένα έξυπνο συμβόλαιο. Αυτό ξεκλείδωσε απεριόριστες νέες λειτουργίες για τους παραδοσιακούς λογαριασμούς Ethereum, όπως ομαδοποίηση συναλλαγών, χορηγία gas, εναλλακτική αυθεντικοποίηση, προγραμματιζόμενοι έλεγχοι δαπανών, μηχανισμοί ανάκτησης λογαριασμού και άλλα.

<ExpandableCard title="Pectra EIPs" contentPreview="Official improvements included in this upgrade.">

Καλύτερη εμπειρία χρήστη:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Ορισμός κώδικα λογαριασμού EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Αύξηση της διακίνησης blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Αύξηση κόστους calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Προσθήκη χρονοδιαγράμματος blob στα αρχεία διαμόρφωσης EL</em></li>
</ul>

Καλύτερη εμπειρία δέσμευσης κεφαλαίου:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Αύξηση του <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Ενεργοποιήσιμες έξοδοι από το επίπεδο εκτέλεσης</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Αιτήματα επιπέδου εκτέλεσης γενικού σκοπού</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Παροχή καταθέσεων επικυρωτών στην αλυσίδα</em></li>
</ul>

Αναβαθμίσεις αποδοτικότητας και ασφάλειας πρωτοκόλλου:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Προμεταγλωττιστής για λειτουργίες καμπύλης BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Αποθήκευση ιστορικών κατακερματισμών μπλοκ στην κατάσταση</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Μετακίνηση του δείκτη επιτροπής εκτός της Βεβαίωσης</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Πώς η Pectra θα βελτιώσει την εμπειρία δέσμευσης κεφαλαίου](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Διαβάστε τις προδιαγραφές αναβάθμισης Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Prague-Electra ("Pectra") FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Περίληψη Cancun {#cancun-summary}

Η αναβάθμιση Cancun περιέχει ένα σύνολο βελτιώσεων στο επίπεδο _εκτέλεσης_ του Ethereum με στόχο τη βελτίωση της επεκτασιμότητας, παράλληλα με τις αναβαθμίσεις του επιπέδου συναίνεσης της Deneb.

Ειδικότερα, αυτό περιλαμβάνει το EIP-4844, γνωστό ως **Proto-Danksharding**, το οποίο μειώνει σημαντικά το κόστος αποθήκευσης δεδομένων για πακέτα ενημέρωσης επιπέδου 2. Αυτό επιτυγχάνεται μέσω της εισαγωγής των δεδομένων «blobs» που επιτρέπει στα πακέτα δεδομένων να δημοσιεύουν δεδομένα στο Κεντρικό Δίκτυο για σύντομο χρονικό διάστημα. Αυτό έχει ως αποτέλεσμα σημαντικά χαμηλότερες χρεώσεις συναλλαγών για τους χρήστες πακέτων δεδομένων επιπέδου 2.

<ExpandableCard title="Cancun EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Παροδική αποθήκευση opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em> Συναλλαγές τομέων blob (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Οδηγίες αντιγραφής μνήμης</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> μόνο για την ίδια συναλλαγή</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>

</ExpandableCard>

- [Πακέτα ενημέρωσης επιπέδου 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Διαβάστε τις προδιαγραφές αναβάθμισης της Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Περίληψη Deneb {#deneb-summary}

Η αναβάθμιση Deneb περιέχει ένα σύνολο βελτιώσεων στο επίπεδο _συναίνεσης_ του Ethereum με στόχο τη βελτίωση της επεκτασιμότητας. Αυτή η αναβάθμιση έρχεται παράλληλα με τις αναβαθμίσεις επιπέδου εκτέλεσης Cancun για την ενεργοποίηση του Proto-Danksharding (EIP-4844), μαζί με άλλες βελτιώσεις στην Κύρια Αλυσίδα.

Τα προ δημιουργημένα και υπογεγραμμένα «μηνύματα εθελουσίας εξόδου» δε λήγουν πλέον, δίνοντας έτσι περισσότερο έλεγχο στους χρήστες που αποθηκεύουν τα χρήματά τους σε έναν τρίτο χειριστή κόμβου. Με αυτό το υπογεγραμμένο μήνυμα εξόδου, οι χρήστες με αποθηκευμένο κεφάλαιο μπορούν να αναθέσουν τη λειτουργία του κόμβου, διατηρώντας παράλληλα τη δυνατότητα ασφαλούς εξόδου και ανάληψης των κεφαλαίων τους ανά πάσα στιγμή, χωρίς να χρειάζεται να ζητήσουν την άδεια από κανέναν.

Το EIP-7514 φέρνει αυστηριοποίηση στην έκδοση ETH, περιορίζοντας το ποσοστό «ανατροπής» που οι επικυρωτές μπορούν να ενταχθούν στο δίκτυο σε οκτώ (8) ανά εποχή. Δεδομένου ότι το σύνολο ETH είναι ανάλογο με το συνολικό αποθηκευμένο κεφάλαιο σε ETH, περιορίζοντας τον αριθμό των επικυρωτών που ενώνουν τα ανώτατα όρια στον _ρυθμό ανάπτυξης_ του νεοεκδοθέντος ETH, ενώ παράλληλα μειώνονται οι απαιτήσεις υλικού για τους χειριστές κόμβων, βοηθώντας την αποκέντρωση.

<ExpandableCard title="Deneb EIPs" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Συναλλαγέν τομέων blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Διαρκώς έγκυρες υπογεγραμμένες εθελοντικές αποχωρήσεις</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Αύξηση της μέγιστης θέσης συμπερίληψης βεβαίωσης</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Προσθήκη μέγιστου ορίου εκτροπής εποχής</em></li>
</ul>

</ExpandableCard>

- [Διαβάστε τις προδιαγραφές αναβάθμισης Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Συχνές ερωτήσεις Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Περίληψη Shanghai {#shanghai-summary}

Η αναβάθμιση Shanghai έφερε τη δυνατότητα αναλήψεων στο επίπεδο εκτέλεσης. Σε συνδυασμό με την αναβάθμιση Capella, αυτό επιτρέπει στα μπλοκ να πραγματοποιήσουν εργασίες ανάληψης, επιτρέποντας στους ενδιαφερόμενους να αποσύρουν τα ETH τους από την Κύρια Αλυσίδα στο επίπεδο εκτέλεσης.

<ExpandableCard title="Shanghai EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Ξεκινά την προειδοποίηση διεύθυνσης του <code>COINBASE</code> </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Νέα οδηγία <code>PUSH0</code> </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Όριο και μέτρηση initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Λειτουργία επιβολής αναλήψεων στην Κύρια Αλυσίδα</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Διαβάστε τις προδιαγραφές αναβάθμισης της Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Περίληψη Capella {#capella-summary}

Η αναβάθμιση Capella ήταν η τρίτη σημαντική αναβάθμιση στο επίπεδο συναίνεσης (Beacon Chain), ενεργοποιώντας την ανάληψη αποθηκευμένου κεφαλαίου. Η αναβάθμιση Capella συνέβη συγχρονισμένα με την αναβάθμιση του επιπέδου εκτέλεσης Shanghai και την ενεργοποιημένη λειτουργία ανάληψης κεφαλαίου.

Αυτό το επίπεδο συναίνεσης αναβάθμισε την ικανότητα των χρηστών με αποθηκευμένο κεφάλαιο, που δεν παρέχουν διαπιστευτήρια ανάληψης με την αρχική τους κατάθεση να το πράξουν, επιτρέποντας έτσι τις αναλήψεις.

Η αναβάθμιση παρέχει επίσης αυτόματη λειτουργία σάρωσης λογαριασμού, η οποία επεξεργάζεται συνεχώς λογαριασμούς επικυρωτή για τυχόν διαθέσιμες πληρωμές ανταμοιβών ή πλήρη αναλήψεων.

- [Περισσότερα για τις αναλήψεις αποθηκευμένου κεφαλαίου](/staking/withdrawals/).
- [Διαβάστε τις προδιαγραφές αναβάθμισης Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Η Συγχώνευση) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Περίληψη {#paris-summary}

Η αναβάθμιση Paris προκλήθηκε από το blockchain της απόδειξης εργασίας περνώντας μια [συνολική δυσκολία](/glossary/#terminal-total-difficulty) 5875000000000000000000000. Αυτό συνέβη στο μπλοκ 15537393 στις 15 Σεπτεμβρίου 2022, προκαλώντας την αναβάθμιση Paris στο επόμενο μπλοκ. Το Paris ήταν η μετάβαση στη [Συγχώνευση](/roadmap/merge/), όπου το κύριο χαρακτηριστικό της ήταν η απενεργοποίηση του αλγορίθμου κρυπτόρυξης με την [απόδειξη εργασίας](/developers/docs/consensus-mechanisms/pow) και η σχετική λογική συναίνεσης και η μετάβαση στην [απόδειξη συμμετοχής](/developers/docs/consensus-mechanisms/pos). Η Paris αναβάθμισε τους [πελάτες εκτέλεσης](/developers/docs/nodes-and-clients/#execution-clients) (που ισοδυναμεί με την Bellatrix στο επίπεδο συναίνεσης) που τους έδωσε τη δυνατότητα να λάβουν οδηγίες από τους συνδεδεμένους [πελάτες συναίνεσης](/developers/docs/nodes-and-clients/#consensus-clients). Αυτό απαιτούσε να ενεργοποιηθεί ένα νέο σύνολο εσωτερικών μεθόδων API, κοινώς γνωστό ως [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Ήταν αναμφισβήτητα η πιο σημαντική αναβάθμιση στην ιστορία του Ethereum από το [Homestead](#homestead)!

- [Διαβάστε τις προδιαγραφές αναβάθμισης της Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Αναβάθμιση συναίνεσης στην απόδειξη συμμετοχής</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Υποστήριξη ΔΥΣΚΟΛΙΑΣ opcode με PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Σύνοψη {#bellatrix-summary}

Η αναβάθμιση Bellatrix ήταν η δεύτερη προγραμματισμένη αναβάθμιση της [Κύριας Αλυσίδας](/roadmap/beacon-chain)>, προετοιμάζοντας την αλυσίδα για [Την Συγχώνευση](/roadmap/merge/). Επιφέρει κυρώσεις στους επαληθευτές έως και τις πλήρεις αξίες τους για την αδράνεια και τις παραβάσεις. Η αναβάθμιση Bellatrix περιλαμβάνει επίσης μια ενημέρωση των κανόνων επιλογής της ενσωμάτωσης για την προετοιμασία της αλυσίδας για τη συγχώνευση και τη μετάβαση από το τελευταίο μπλοκ της απόδειξης εργασίας στο πρώτο μπλοκ με την απόδειξη συμμετοχής. Αυτό περιλαμβάνει την ευαισθητοποίηση των πελατών για τον [συνολικό βαθμό δυσκολίας](/glossary/#terminal-total-difficulty) 58750000000000000000000.

- [Διαβάστε τις προδιαγραφές αναβάθμισης της Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Σύνοψη {#gray-glacier-summary}

Η αναβάθμιση «Gray Glacier» του δικτύου ώθησε τον [βαθμό δυσκολίας](/glossary/#difficulty-bomb) κατά τρεις μήνες πίσω. Αυτή είναι η μόνη αλλαγή που προστέθηκε σε αυτήν την αναβάθμιση και είναι παρόμοια με τη λογική των αναβαθμίσεων [Arrow Glacier](#arrow-glacier) και [Muir Glacier](#muir-glacier). Παρόμοιες αλλαγές έχουν γίνει με τις αναβαθμίσεις [Byzantium](#byzantium), [Constantinople](#constantinople) και [London](#london).

- [Ιστολόγιο EF - Ανακοίνωση αναβάθμισης Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>καθυστερεί τη «βόμβα δυσκολίας» έως τον Σεπτέμβριο 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Σύνοψη {#arrow-glacier-summary}

Η αναβάθμιση «Arrow Glacier» του δικτύου ώθησε τον [βαθμό δυσκολίας](/glossary/#difficulty-bomb) κατά αρκετούς μήνες πίσω. Αυτή είναι η μόνη αλλαγή που προστέθηκε σε αυτήν την αναβάθμιση και είναι παρόμοια με τη λογική της αναβάθμισης [Muir Glacier](#muir-glacier). Παρόμοιες αλλαγές έχουν γίνει με τις αναβαθμίσεις [Byzantium](#byzantium), [Constantinople](#constantinople) και [London](#london).

- [Ιστολόγιο EF - Ανακοίνωση αναβάθμισης Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Αναβάθμιση Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>καθυστερεί τη "βόμβα δυσκολίας" έως τον Ιούνιο 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Σύνοψη {#altair-summary}

Η αναβάθμιση Altair ήταν η πρώτη προγραμματισμένη αναβάθμιση για την [Κύρια Αλυσίδα](/roadmap/beacon-chain). Πρόσθεσε υποστήριξη για τις λεγόμενες «επιτροπές συγχρονισμού», ενεργοποιώντας τη χρήση εφαρμογών ελαφρού πελάτη και αύξησε τις ποινές σε περιπτώσεις κακόβουλων ενεργειών και αδράνειας καθώς η ανάπτυξη προχωρούσε προς τη «Συγχώνευση».

- [Διαβάστε τις προδιαγραφές αναβάθμισης της Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} classname="me-2" />Πραγματικό γεγονός! {#altair-fun-fact}

Η Altair ήταν η πρώτη σημαντική αναβάθμιση του δικτύου με ακριβή χρόνο έναρξης. Κάθε προηγούμενη αναβάθμιση είχε βασιστεί σε ένα δηλωμένο αριθμό μπλοκ στην αλυσίδα με απόδειξη εργασία, όπου οι χρόνοι των μπλοκ ποικίλλουν. Η Κύρια Αλυσίδα δεν απαιτεί επίλυση για την απόδειξη εργασίας και λειτουργεί σε ένα σύστημα εποχής βασισμένο σε χρόνο που αποτελείται από 32 «θέσεις» των δώδεκα δευτερολέπτων όπου οι επαληθευτές μπορούν να προτείνουν μπλοκ. Αυτός είναι ο λόγος που γνωρίζαμε ακριβώς πότε θα εφαρμοστεί η εποχή 74,240 και η αναβάθμιση Altair θα γινόταν πραγματικότητα!

- [Χρόνος μπλοκ](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Περίληψη {#london-summary}

Η αναβάθμιση London εισήγαγε το [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), όπου μεταρρύθμισε την αγορά των τελών συναλλαγής, μαζί με αλλαγές στον τρόπο χειρισμού των επιστροφών των κρατήσεων και τον προγραμματισμό της αναβάθμισης [Ice Age](/glossary/#ice-age).

#### Τι ήταν η αναβάθμιση London / EIP-1559; {#eip-1559}

Πριν την αναβάθμιση London, το Ethereum είχε μπλοκ σταθερού μεγέθους. Σε περιόδους υψηλής ζήτησης του δικτύου, αυτά τα μπλοκ λειτουργούσαν με πλήρη χωρητικότητα. Ως αποτέλεσμα, οι χρήστες συχνά έπρεπε να περιμένουν τη ζήτηση να μειωθεί για να συμπεριληφθούν σε ένα μπλοκ, κάτι το οποίο οδήγησε σε μια κακή εμπειρία χρήστη. Η αναβάθμιση London εισήγαγε μπλοκ μεταβλητού μεγέθους στο Ethereum.

Ο τρόπος υπολογισμού των τελών συναλλαγών στο δίκτυο του Ethereum άλλαξε με [την αναβάθμιση London](/history/#london) τον Αύγουστο 2021. Πριν από την αναβάθμιση London, οι χρεώσεις υπολογίζονταν χωρίς διαχωρισμό των τελών `βασικής` και `προτεραιότητας`, ως εξής:

Ας πούμε ότι η Αλίκη έπρεπε να πληρώσει τον Μπομπ 1 ETH. Σε αυτή τη συναλλαγή, το όριο του καυσίμου είναι 21.000 μονάδες, και η τιμή του είναι 200 gwei.

Τα συνολικά τέλη θα ήταν: `μονάδες Gas (όριο) * Τιμή gas ανά μονάδα` π.χ `21,000 * 200 = 4,200,000 gwei` ή 0.0042 ETH

Η εφαρμογή του [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) στην αναβάθμιση London κατέστησε τον μηχανισμό κρατήσεων των συναλλαγών πιο περίπλοκο, αλλά έκανε τα τέλη πιο προβλέψιμα, με αποτέλεσμα πιο αποτελεσματική αγορά τελών συναλλαγών. Οι χρήστες μπορούν να υποβάλλουν συναλλαγές με `maxFeePerGas` που αντιστοιχεί στο ποσό που είναι διατεθειμένοι να πληρώσουν για την εκτέλεση συναλλαγής, γνωρίζοντας ότι δε θα πληρώσουν περισσότερο από την τιμή αγοράς για το gas (`baseFeePerGas`) και λάβετε επιστροφή χρημάτων, μείον το φιλοδώρημα.

Αυτό το βίντεο εξηγεί το EIP-1559 και τα οφέλη που προσφέρει: [EIP-1559 Επεξήγηση](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Είστε προγραμματιστής dapp; Φροντίστε να αναβαθμίσετε τις βιβλιοθήκες και τα εργαλεία σας.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Διαβάστε την ανάλυση των Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>βελτίωση προμήθειας συναλλαγής της αγοράς</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>επιστροφή του <code>BASEFEE</code> από το μπλοκ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>μείωση επιστροφής κρατήσεων για εργασίες EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>αποτροπή ανάπτυξη συμβολαίων που ξεκινούν με <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>καθυστέρηση του Ice Age έως τον Δεκέμβριο 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Σύνοψη {#berlin-summary}

Η αναβάθμιση Berlin βελτιστοποιεί το κόστος κρατήσεων για ορισμένες ενέργειες της EVM και αυξάνει την υποστήριξη πολλαπλών τύπων συναλλαγών.

- [Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Διαβάστε την ανάλυση των Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>μείωση κόστους κρατήσεων ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>επιτρέπει την ευκολότερη υποστήριξη για πολλαπλούς τύπους συναλλαγών</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>αυξήσεις κόστους κρατήσεων για πρόσβαση opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>προσθέτει προαιρετικές λίστες πρόσβασης</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Η γένεση της κύρια αλυσίδας {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Σύνοψη {#beacon-chain-genesis-summary}

Η [Κύρια Αλυσίδα](/roadmap/beacon-chain/) χρειαζόταν 16384 καταθέσεις των 32 ETH ώστε να ξεκινήσει με ασφάλεια. Αυτό συνέβη στις 27 Νοεμβρίου, όταν δηλαδή η Κύρια Αλυσίδα ξεκίνησε την παραγωγή μπλοκ στις 1 Δεκεμβρίου 2020. Ένα σημαντικό πρώτο βήμα για την επίτευξη του [οράματος του Ethereum](/roadmap/vision/).

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Η κύρια αλυσίδα
</DocLink>

---

### Ανάπτυξη του συμβολαίου αποθήκευσης κεφαλαίου {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Σύνοψη {#deposit-contract-summary}

Το συμβόλαιο δέσμευσης καταθέσεων εισήγαγε την [αποθήκευση](/glossary/#staking) στο οικοσύστημα του Ethereum. Ένα συμβόλαιο του [Κεντρικού Δικτύου](/glossary/#mainnet), είχε άμεση επίδραση στο χρονοδιάγραμμα έναρξης της [Κύριας Αλυσίδας](/roadmap/beacon-chain/), μια σημαντική [αναβάθμιση του Ethereum](/roadmap/).

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Αποθήκευση κεφαλαίου
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Σύνοψη {#muir-glacier-summary}

Η ενσωμάτωση Muir Glacier εισήγαγε μια καθυστέρηση στην κρυπτόρυξη, την επονομαζόμενη [βόμβα δυσκολίας](/glossary/#difficulty-bomb). Η αύξηση του βαθμού δυσκολίας του μηχανισμού συναίνεσης με χρήση της [απόδειξης εργασίας](/developers/docs/consensus-mechanisms/pow/), απείλησε να υποβαθμίσει τη χρηστικότητα του Ethereum αυξάνοντας το χρόνο αναμονής για την αποστολή συναλλαγών και τη χρήση των αποκεντρωμένων εφαρμογών.

- [Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Διαβάστε την ανάλυση των Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>καθυστερεί τη βόμβα δυσκολίας για άλλα 4.000.000 μπλοκ ή ~611 ημέρες.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Σύνοψη {#istanbul-summary}

Η ενσωμάτωση Istanbul:

- Βελτιστοποίησε το ύψος των [κρατήσεων](/glossary/#gas) για ορισμένες ενέργειες στο [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Προηγμένη ανθεκτικότητα σε επίθεση denial-of-service.
- Καθιέρωσε περισσότερο αποτελεσματικές λύσεις ανάλογα με την [Επεκτασιμότητα επιπέδου 2](/developers/docs/scaling/#layer-2-scaling) βασισμένες στα SNARKs και STARKs.
- Ενεργοποιημένη διαλειτουργικότητα Ethereum και Zcash.
- Επιτρέπεται στις συμβάσεις να εισαγάγουν πιο δημιουργικές λειτουργίες.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>επιτρέπει στο Ethereum να λειτουργεί με κρυπτονόμισμα διατήρησης της ιδιωτικότητας όπως το Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>φθηνότερη κρυπτογραφία για τη βελτίωση <a href="/glossary/#gas">του κόστους κρατήσεων</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>προστατεύει το Ethereum από επιθέσεις επανάληψης, προσθέτοντας <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">opcode</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>βελτιστοποίηση των τιμών κρατήσεων opcode με βάση την κατανάλωση.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>μειώνει το κόστος των CallData για να επιτρέψει περισσότερα δεδομένα σε μπλοκ. Χρήσιμο για την <a href="/developers/docs/scaling/#layer-2-scaling">κλιμάκωση Layer 2</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>λοιπές εναλλακτικές τιμών κρατήσεων opcode.</em></li>
</ul>

</ExpandableCard>

---

### Κωνσταντινούπολη {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Σύνοψη {#constantinople-summary}

Η ενσωμάτωση Κωνσταντινούπολη:

- Μειώνει την απόδοση [κρυπτόρυξης](/developers/docs/consensus-mechanisms/pow/mining/) μπλοκ από 3 σε 2 ETH.
- Εξασφάλισε ότι η κρυπτοαλυσίδα δεν πάγωσε πριν από την εφαρμογή της [απόδειξης συμμετοχής](#beacon-chain-genesis).
- Βελτιστοποίησε το ύψος των [κρατήσεων](/glossary/#gas) για ορισμένες ενέργειες στο [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Προστέθηκε η δυνατότητα αλληλεπίδρασης με διευθύνσεις που δεν έχουν δημιουργηθεί ακόμα.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>βελτιστοποιεί το κόστος ορισμένων ενεργειών επί της αλυσίδας.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>επιτρέπει να αλληλεπιδράσετε με διευθύνσεις που δεν έχουν ακόμη δημιουργηθεί.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>παρουσιάζει την οδηγία <code>EXTCODEHASH</code> για την ανάκτηση του κατακερματισμού του κωδικού άλλου συμβολαίου.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>διασφαλίζει τη λειτουργία της κρυπτοαλυσίδα έως την απόδειξη συμμετοχής και μειώνει την απόδοση μπλοκ από 3 σε 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Βυζάντιο {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Περίληψη {#byzantium-summary}

Η ενσωμάτωση Byzantium:

- Μείωση των ανταμοιβών [κρυπτόρυξης](/developers/docs/consensus-mechanisms/pow/mining/) μπλοκ από 5 σε 3 ΕΤΗ.
- Καθυστέρηση της [βόμβας δυσκολίας](/glossary/#difficulty-bomb) κατά ένα έτος.
- Προστέθηκε η δυνατότητα επίκλησης άλλων συμβολαίων χωρίς αλλαγή της κατάστασης.
- Προστέθηκαν ορισμένες μέθοδοι κρυπτογράφησης που επιτρέπουν την [επεκτασιμότητα του επιπέδου 2](/developers/docs/scaling/#layer-2-scaling).

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>προσθήκη <code>REVERT</code> opcode.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>προστέθηκε το πεδίο κατάστασης στις αποδείξεις συναλλαγής για να εμφανίζει την επιτυχία ή αποτυχία.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>προσθέτει ελλειπτική καμπύλη και πολλαπλασιασμό βαθμιδωτού ρυθμού για να επιτρέψει το <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>προσθέτει ελλειπτική καμπύλη και πολλαπλασιασμό βαθμιδωτού ρυθμού για να επιτρέψει το <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>επιτρέπει την επαλήθευση υπογραφής RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>προσθέτει υποστήριξη για τιμές επιστροφής μεταβλητού μήκους.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>προσθέτει <code>STATICCALL</code> opcode, επιτρέποντας κλήσεις που δεν αλλάζουν κατάσταση σε άλλα συμβόλαια.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>αλλάζει τον τύπο προσαρμογής της δυσκολίας.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>καθυστερεί την <a href="/glossary/#difficulty-bomb">βόμβας δυσκολίας</a> κατά 1 χρόνο και μειώνει την ανταμοιβή μπλοκ από 5 σε 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Σύνοψη {#spurious-dragon-summary}

Η ενσωμάτωση Spurious Dragon ήταν η δεύτερη αντίδραση στην επίθεση που δέχθηκε το δίκτυο με denial of service (DoS) τον Σεπτέμβριο/Οκτώβριο 2016 συμπεριλαμβάνοντας:

- Ρύθμιση της τιμής opcode για την πρόληψη μελλοντικών επιθέσεων στο δίκτυο.
- Ενεργοποίηση του “debloat” της κατάστασης της κρυπτοαλυσίδας.
- Προσθήκη προστασίας από επιθέσεις που επαναλαμβάνονται.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>αποτρέπει την αναμετάδοση των συναλλαγών από μια αλυσίδα Ethereum σε μια εναλλακτική αλυσίδα, για παράδειγμα μια συναλλαγή δικτύου δοκιμών που αναπαράγεται στην κύρια αλυσίδα Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>προσαρμόζει τις τιμές του opcode <code>EXP</code>, το οποίο καθιστά πιο δύσκολη την επιβράδυνση του δικτύου μέσω υπολογιστικά δαπανηρών εργασιών συμβολαίου.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>επιτρέπει την αφαίρεση κενών λογαριασμών που προστέθηκαν μέσω επιθέσεων DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>αλλάζει το μέγιστο μέγεθος κώδικα που μπορεί να έχει ένα συμβόλαιο στην κρυπτοαλυσίδα, σε 24576 bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Περίληψη {#tangerine-whistle-summary}

Η ενσωμάτωση Tangerine Whistle ήταν η πρώτη αντίδραση στην επίθεση που δέχθηκε το δίκτυο με denial of service (DoS) (Σεπτέμβριο/Οκτώβριο 2016) συμπεριλαμβάνοντας:

- Αντιμετώπιση επειγόντων ζητημάτων υγείας του δικτύου που αφορούν χαμηλούς κώδικες λειτουργίας.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>αυξάνει το κόστος κρατήσεων των opcodes που μπορούν να χρησιμοποιηθούν σε επιθέσεις spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>μειώνει το μέγεθος της κατάστασης αφαιρώντας ένα μεγάλο αριθμό κενών λογαριασμών, που τοποθετήθηκαν με πολύ χαμηλό κόστος λόγω ελαττωμάτων σε προηγούμενες εκδόσεις του πρωτοκόλλου Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Η ενσωμάτωση DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Σύνοψη {#dao-fork-summary}

Η ενσωμάτωση DAO ήταν η απάντηση στην [επίθεση DAO το 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), όπου ένα επισφαλές συμβόλαιο [DAO](/glossary/#dao) είχε εξαντληθεί σε πάνω από 3.6 εκατομμύρια ETH σε μια επίθεση. Η ενσωμάτωση μετέφερε τα κεφάλαια από το ελαττωματικό συμβόλαιο σε ένα [νέο συμβόλαιο](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) με την απλή λειτουργία: ανάληψη. Όσοι έχασαν χρήματα θα μπορούσαν να αποσύρουν 1 ETH για κάθε 100 DAO στο πορτοφόλι τους.

Αυτός ο τρόπος αντιμετώπισης ψηφίστηκε από την κοινότητα του Ethereum. Κάθε κάτοχος ETH ήταν σε θέση να ψηφίσει μέσω μιας συναλλαγής στη [πλατφόρμα ψηφοφορίας](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Η απόφαση για την εφαρμογή της ενσωμάτωσης έφτασε πάνω από το 85% των ψήφων.

Μερικοί κρυπτορύχοι αρνήθηκαν να εφαρμόσουν την ενσωμάτωση επειδή το συμβάν DAO δεν ήταν ένα ελάττωμα στο πρωτόκολλο. Συνέχισαν με την υλοποίηση του [Ethereum Classic](https://ethereumclassic.org/).

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Σύνοψη {#homestead-summary}

Η ενσωμάτωση Homestead με βλέμμα στο μέλλον. Περιλαμβάνει διάφορες αλλαγές πρωτοκόλλου και δικτύου δίνοντας τη δυνατότητα στο Ethereum να πραγματοποιήσει επιπλέον αναβαθμίσεις.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>κάνει αλλαγές στη διαδικασία δημιουργίας συμβολαίου.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>προσθήκη νέου opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>εισάγει απαιτήσεις συμβατότητας devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Σύνοψη {#frontier-thawing-summary}

Η ενσωμάτωση Frontier thawing άλλαξε το όριο των 5,000 [κρατήσεων](/glossary/#gas) ανά [μπλοκ](/glossary/#block) και εφάρμοσε την προεπιλεγμένη τιμή κρατήσεων σε 51 [gwei](/glossary/#gwei). Αυτό επιτρέπεται για συναλλαγές – οι συναλλαγές απαιτούν αέριο 21,000. Η [βόμβα δυσκολίας](/glossary/#difficulty-bomb) εισήχθη για να εξασφαλίσει μια μελλοντική ενσωμάτωση, την [Απόδειξη συμμετοχής](/glossary/#pos).

- [Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Διαβάστε την αναβάθμιση 1 του πρωτοκόλλου Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Σύνοψη {#frontier-summary}

Η ενσωμάτωση Frontier εφαρμόστηκε αλλά ήταν ένας λιτός τρόπος υλοποίησης του έργου Ethereum. Ακολούθησε η επιτυχημένη φάση των Ολυμπιακών δοκιμών. Προορίζονταν για χρήστες με τεχνικές γνώσεις, ειδικά για προγραμματιστές. [Τα μπλοκ](/glossary/#block) είχαν όριο [κρατήσεων](/glossary/#gas) τις 5,000. Η περίοδος «thawing» επέτρεψε στους κρυπτορύχους να ξεκινήσουν τις δραστηριότητές τους και για τους πρώτους που θα εγκαταστήσουν την εφαρμογή πελάτη τους χωρίς να χρειάζεται να ‘βιαστούν’.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Πώληση Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Το Ether κυκλοφορεί επίσημα προς πώληση για 42 ημέρες. Μπορείτε να το αγοράσετε με BTC.

[Διαβάστε την ανακοίνωση του Ιδρύματος Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Ανακοίνωση των τεχνικών λεπτομερειών {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Ο Dr. Gavin Wood, συντάσσει και ανακοινώνει τους τεχνικούς όρους του πρωτοκόλλου του Ethereum.

[Δείτε τις τεχνικές πληροφορίες](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Ανακοίνωση καταστατικού {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Η εισαγωγική έκθεση που δημοσιεύθηκε το 2013 από τον Vitalik Buterin, ιδρυτή του Ethereum, πριν από την έναρξη του έργου το 2015.

<DocLink href="/whitepaper/">
  Καταστατικό
</DocLink>
