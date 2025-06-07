---
title: Δίκτυα
description: Μια επισκόπηση των δικτύων του Ethereum και πού μπορείτε να βρείτε δοκιμαστικό δίκτυο ether (ETH) για να δοκιμάσετε την εφαρμογή σας.
lang: el
---

Τα δίκτυα Ethereum είναι ομάδες συνδεδεμένων υπολογιστών που επικοινωνούν χρησιμοποιώντας το πρωτόκολλο Ethereum. Υπάρχει μόνο ένα κεντρικό δίκτυο (Mainnet) Ethereum, αλλά μπορούν να δημιουργηθούν ανεξάρτητα δίκτυα που συμμορφώνονται με τους ίδιους κανόνες πρωτοκόλλου για σκοπούς δοκιμής και ανάπτυξης. Υπάρχουν πολλά ανεξάρτητα «δίκτυα» που συμμορφώνονται με το πρωτόκολλο χωρίς να αλληλεπιδρούν μεταξύ τους. Μπορείτε ακόμη και να ξεκινήσετε ένα τοπικά στον υπολογιστή σας για να δοκιμάσετε τα έξυπνα συμβόλαιά σας και τις εφαρμογές web3.

Ο λογαριασμός Ethereum σας θα λειτουργεί σε διάφορα δίκτυα, αλλά το υπόλοιπο του λογαριασμού σας και το ιστορικό συναλλαγών δεν μπορούν να μεταφέρονται από το κύριο δίκτυο Ethereum. Για λόγους δοκιμής, είναι χρήσιμο να γνωρίζετε ποια δίκτυα είναι διαθέσιμα και πώς μπορείτε να πάρετε ETH δοκιμαστικού δικτύου για να κάνετε τις δοκιμές σας. Γενικά, για λόγους ασφαλείας, δεν συνιστάται η επαναχρησιμοποίηση λογαριασμών βασικού δικτύου σε δοκιμαστικά δίκτυα ή το αντίστροφο.

## Προαπαιτούμενα {#prerequisites}

Θα πρέπει να κατανοήσετε τα [βασικά του Ethereum](/developers/docs/intro-to-ethereum/) πριν διαβάσετε για τα διάφορα δίκτυα, καθώς τα δοκιμαστικά δίκτυα σας παρέχουν μια φθηνή, ασφαλή έκδοση του Ethereum για να κάνετε τις δοκιμές σας.

## Δημόσια δίκτυα {#public-networks}

Τα δημόσια δίκτυα είναι προσβάσιμα σε οποιονδήποτε έχει σύνδεση στο διαδίκτυο ανά τον κόσμο. Οποιοσδήποτε μπορεί να διαβάσει ή να δημιουργήσει συναλλαγές σε μια δημόσια αλυσίδα συστοιχιών και να επικυρώσει τις συναλλαγές που εκτελούνται. Η συναίνεση μεταξύ των ομοτίμων αποφασίζει για τη συμπερίληψη των συναλλαγών και την κατάσταση του δικτύου.

### Κεντρικό δίκτυο Ethereum {#ethereum-mainnet}

Το βασικό δίκτυο είναι η κύρια δημόσια αλυσίδα συστοιχιών παραγωγής Ethereum παραγωγής, όπου πραγματοποιούνται συναλλαγές με πραγματική αξία στο κατανεμημένο καθολικό.

Όταν οι άνθρωποι και τα χρηματιστήρια συζητούν τις τιμές ETH, μιλούν για το βασικό δίκτυο ETH.

### Δίκτυα δοκιμών Ethereum {#ethereum-testnets}

Εκτός από το βασικό δίκτυο, υπάρχουν δημόσια δοκιμαστικά δίκτυα. Αυτά είναι δίκτυα που χρησιμοποιούνται από προγραμματιστές πρωτοκόλλων ή έξυπνων συμβολαίων για να δοκιμάσουν τόσο τις αναβαθμίσεις πρωτοκόλλων όσο και τα πιθανά έξυπνα συμβόλαια σε ένα περιβάλλον παραγωγής πριν από την ανάπτυξη τους στο βασικό δίκτυο. Σκέψου το σαν μια αναλογία των διακομιστών παραγωγής έναντι των διακομιστών «staging».

Προτού αναπτύξετε οποιονδήποτε κώδικα συμβολαίου γράφετε στο βασικό δίκτυο, θα πρέπει να τον δοκιμάσετε σε ένα δοκιμαστικό. Ανάμεσα στις αποκεντρωμένες εφαρμογές που ενσωματώνονται σε υπάρχοντα έξυπνα συμβόλαια, τα περισσότερα έργα έχουν αντίγραφα που έχουν αναπτυχθεί σε δοκιμαστικά δίκτυα.

Τα περισσότερα δοκιμαστικά δίκτυα ξεκίνησαν χρησιμοποιώντας έναν μηχανισμό συναίνεσης περιορισμένης πρόσβασης με απόδειξη άδειας. Αυτό σημαίνει ότι επιλέγεται ένας μικρός αριθμός κόμβων για την επικύρωση των συναλλαγών και τη δημιουργία νέων μπλοκ - αποθηκεύοντας την ταυτότητά τους κατά τη διαδικασία. Εναλλακτικά, κάποια δοκιμαστικά δίκτυα διαθέτουν έναν ανοιχτό μηχανισμό συναίνεσης με απόδειξη συμμετοχής όπου όλοι μπορούν να δοκιμάσουν να εκτελέσουν έναν επικυρωτή, ακριβώς όπως στο βασικό δίκτυο του Ethereum.

Το ETH στα δοκιμαστικά δίκτυα υποτίθεται ότι δεν έχει καμία πραγματική αξία, ωστόσο έχουν δημιουργηθεί αγορές για ορισμένους τύπους δοκιμαστικών δικτύων ETH των οποίων η απόκτηση έχει γίνει σπάνια ή δύσκολη. Δεδομένου ότι χρειάζεσαι ETH για να αλληλεπιδράσεις πραγματικά με το Ethereum (ακόμη και στα δοκιμαστικά δίκτυα), οι περισσότεροι άνθρωποι παίρνουν δωρεάν ETH δοκιμαστικών δικτύων από faucet. Οι περισσότερες παροχές είναι εφαρμογές ιστού όπου μπορείτε να εισαγάγετε τη διεύθυνσή σας για να αιτηθείτε και να λάβετε ΕΤΗ.

#### Ποιo δοκιμαστικό δίκτυο να χρησιμοποιήσω;

Τα δύο δημόσια δοκιμαστικά δίκτυα που διατηρούν επί του παρόντος οι προγραμματιστές είναι το Sepolia και το Hoodi. Το Sepolia είναι ένα δίκτυο ώστε οι προγραμματιστές συμβολαίων και εφαρμογών να δοκιμάζουν τις εφαρμογές τους. Το δίκτυο Hoodi επιτρέπει στους προγραμματιστές πρωτοκόλλων να δοκιμάζουν τις αναβαθμίσεις του δικτύου και επιτρέπει στους συμμετέχοντες να δοκιμάζουν τους επικυρωτές.

#### Sepolia {#sepolia}

**Το Sepolia είναι το προτεινόμενο προεπιλεγμένο δοκιμαστικό δίκτυο για την ανάπτυξη εφαρμογών**. Το δίκτυο Sepolia χρησιμοποιεί ένα σύνολο επικυρωτών με δικαιώματα που ελέγχεται από ομάδες πελατών και δοκιμών.

##### Πηγές

- [Ιστότοπος](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Πηγή QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Πηγή PoW](https://sepolia-faucet.pk910.de/)
- [Πηγή Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Πηγή Infura Sepolia](https://www.infura.io/faucet)
- [Πηγή Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Πηγή Ethereum Ecosystem](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Πηγή Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

#### Hoodi {#hoodi}

Το Hoodi είναι ένα δοκιμαστικό δίκτυο για δοκιμές επικύρωσης και αποθήκευσης. Το δίκτυο Hoodi είναι ανοιχτό για χρήστες που θέλουν να εκτελέσουν ένα πρόγραμμα επικύρωσης δοκιμαστικού δικτύου. Επομένως, οι συμμετέχοντες που επιθυμούν να δοκιμάσουν αναβαθμίσεις πρωτοκόλλου πριν από την ανάπτυξή τους στο βασικό δίκτυο θα πρέπει να χρησιμοποιούν το Hoodi.

- Ελεύθερο σύνολο επικυρωτή, οι χρήστες με δεσμευμένο κεφάλαιο μπορούν να δοκιμάσουν αναβαθμίσεις δικτύου
- Μεγάλη κατάσταση, χρήσιμη για τον έλεγχο σύνθετων αλληλεπιδράσεων έξυπνων συμβολαίων
- Περισσότερος χρόνος συγχρονισμού και απαιτείται περισσότερος χώρος αποθήκευσης για την εκτέλεση ενός κόμβου

##### Πηγές

- [Ιστότοπος](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Εξερευνητής](https://explorer.hoodi.ethpandaops.io/)
- [Συγχρονισμός σημείου αναφοράς](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)
- [Blockscout](https://hoodi.cloud.blockscout.com/)

##### Faucets

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [Πηγή PoW](https://hoodi-faucet.pk910.de/)

#### Holesky {#holesky}

Το δίκτυο δοκιμών Holesky θα [καταργηθεί τον Σεπτέμβριο του 2025](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky). Οι πάροχοι δέσμευσης κεφαλαίου και οι πάροχοι υποδομών θα πρέπει να χρησιμοποιούν το Hoodi για δοκιμές επικύρωσης.

##### Πηγές

- [Ιστότοπος](https://holesky.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/holesky)
- [Otterscan](https://holesky.otterscan.io/)
- [Etherscan](https://holesky.etherscan.io/)
- [Blockscout](https://eth-holesky.blockscout.com/)

##### Faucets

- [Πηγή QuickNode Holesky](https://faucet.quicknode.com/ethereum/holesky)
- [Πηγή PoW](https://holesky-faucet.pk910.de/)
- [Πηγή Alchemy Holesky](https://www.alchemy.com/faucets/ethereum-holesky)
- [Πηγή Chainstack Holesky](https://faucet.chainstack.com/holesky-testnet-faucet)
- [Πηγή Ethereum Ecosystem](https://www.ethereum-ecosystem.com/faucets/ethereum-holesky)
- [Πηγή Google Cloud Web3 Holesky](https://cloud.google.com/application/web3/faucet/ethereum/holesky)

Για να ξεκινήσετε έναν επικυρωτή στο Hoodi testnet, χρησιμοποιήστε το [Hoodi launchpad](https://hoodi.launchpad.ethereum.org/en/).

### Δίκτυα δοκιμών Layer 2 {#layer-2-testnets}

Το [επίπεδο 2 (L2)](/layer-2/) είναι ένας συλλογικός όρος που περιγράφει ένα συγκεκριμένο σύνολο λύσεων κλιμάκωσης Ethereum. Το επίπεδο 2 είναι μια ξεχωριστή αλυσίδα συστοιχιών που επεκτείνει το Ethereum και κληρονομεί τις εγγυήσεις ασφαλείας του Ethereum. Τα δοκιμαστικά δίκτυα επιπέδου 2 είναι συνήθως στενά συνδεδεμένα με δημόσια δοκιμαστικά δίκτυα Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Ένα δίκτυο δοκιμών για το [Arbitrum](https://arbitrum.io/).

##### Πηγές

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Πηγή Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Πηγή QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)
- [Πηγή Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Πηγή Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Ένα δίκτυο δοκιμών για το [Optimism](https://www.optimism.io/).

##### Πηγές

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Πηγή Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Πηγές δικτύων δοκιμών](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Ένα δοκιμαστικό δίκτυο για το [Starknet](https://www.starknet.io).

##### Πηγές

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Alchemy faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Starknet faucet](https://starknet-faucet.vercel.app/)
- [Πηγή Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)

## Ιδιωτικά δίκτυα {#private-networks}

Ένα δίκτυο Ethereum είναι ένα ιδιωτικό δίκτυο εάν οι κόμβοι του δεν είναι συνδεδεμένοι σε ένα δημόσιο δίκτυο (δηλ. Κεντρικό δίκτυο ή δίκτυο δοκιμών). Σε αυτό το πλαίσιο, ιδιωτικό σημαίνει μόνο δεσμευμένο ή απομονωμένο, και όχι προστατευμένο ή ασφαλές.

### Δίκτυα ανάπτυξης {#development-networks}

Για να αναπτύξετε μια εφαρμογή Ethereum, θα θέλετε να την εκτελέσετε σε ένα ιδιωτικό δίκτυο για να δείτε πώς λειτουργεί πριν τη χρησιμοποιήσετε. Παρόμοια με τον τρόπο που δημιουργείτε έναν τοπικό διακομιστή στον υπολογιστή σας για την ανάπτυξη ιστοσελίδων, μπορείτε να δημιουργήσετε ένα τοπικό παράδειγμα αλυσίδας συστοιχιών για να δοκιμάσετε την αποκεντρωμένη εφαρμογή σας. Αυτό επιτρέπει πολύ πιο γρήγορη επανάληψη από ένα δημόσιο δοκιμαστικό δίκτυο.

Υπάρχουν έργα και εργαλεία αφιερωμένα στο να βοηθήσουν σε αυτό. Μάθετε περισσότερα σχετικά με τα [δίκτυα ανάπτυξης](/developers/docs/development-networks/).

### Δίκτυα Consortium {#consortium-networks}

Η διαδικασία συναίνεσης ελέγχεται από ένα προκαθορισμένο σύνολο κόμβων που είναι έμπιστοι. Για παράδειγμα, ένα ιδιωτικό δίκτυο γνωστών ακαδημαϊκών ιδρυμάτων που το καθένα διοικεί έναν κόμβο, και τα μπλοκ επικυρώνονται από ένα όριο υπογραφόντων εντός του δικτύου.

Εάν ένα δημόσιο δίκτυο Ethereum είναι σαν το δημόσιο διαδίκτυο, ένα δίκτυο consortium είναι σαν ένα ιδιωτικό ενδοδίκτυο.

## Σχετικά εργαλεία {#related-tools}

- [Chainlist](https://chainlist.org/) _λίστα δικτύων EVM για τη σύνδεση πορτοφολιών και παρόχων με το κατάλληλο Chain ID και Network ID_
- [Αλυσίδες που βασίζονται σε EVM](https://github.com/ethereum-lists/chains) _Αποθετήριο μεταδεδομένων αλυσίδας GitHub που υποστηρίζει το Chainlist_

## Περισσότερες πληροφορίες {#further-reading}

- [Πρόταση: Προβλέψιμος κύκλος ζωής Ethereum Testnet](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Η Εξέλιξη των Δοκιμαστικών Δικτύων Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
