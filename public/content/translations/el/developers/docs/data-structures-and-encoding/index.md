---
title: Δομές δεδομένων και κωδικοποίηση
description: Επισκόπηση των θεμελιωδών δομών δεδομένων του Ethereum.
lang: el
sidebarDepth: 2
---

Το Ethereum δημιουργεί, αποθηκεύει και μεταφέρει μεγάλο όγκο δεδομένων. Αυτά τα δεδομένα πρέπει να μορφοποιηθούν με τυποποιημένους και αποδοτικούς τρόπους αποθήκευσης, ώστε να επιτραπεί σε οποιονδήποτε να [εκτελέσει έναν κόμβο](/run-a-node/) με υλικά μεσαίας κατηγορίας. Για να επιτευχθεί αυτό, χρησιμοποιούνται αρκετές συγκεκριμένες δομές δεδομένων στη στοίβα του Ethereum.

## Προαπαιτούμενα {#prerequisites}

Θα πρέπει να κατανοείτε τα θεμελιώδη στοιχεία του Ethereum και της [εφαρμογής λογισμικού πελάτη](/developers/docs/nodes-and-clients/). Συνιστάται η εξοικείωση με το επίπεδο δικτύωσης και [τη λευκή βίβλο του Ethereum](/whitepaper/).

## Δομές δεδομένων {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Το Patricia Merkle Tries είναι μια δομή δεδομένων που κωδικοποιεί τα ζεύγη κλειδιού-αξίας σε μια ντετερμινιστική και κρυπτογραφικά πιστοποιημένη κατάσταση. Χρησιμοποιούνται εκτενώς σε όλο το επίπεδο εκτέλεσης του Ethereum.

[Περισσότερα για το Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Το Recursive Length Prefix (RLP) είναι μια μέθοδος σειριοποίησης που χρησιμοποιείται εκτενώς σε όλο το επίπεδο εκτέλεσης του Ethereum.

[Περισσότερα για τα RLP](/developers/docs/data-structures-and-encoding/rlp)

### Απλή σειριοποίηση {#simple-serialize}

Η απλή σειριοποίηση (SSZ) είναι η κυρίαρχη μορφή σειριοποίησης στο επίπεδο συναίνεσης του Ethereum λόγω της συμβατότητάς του με merklelization.

[Περισσότερα για SSZ](/developers/docs/data-structures-and-encoding/ssz)
