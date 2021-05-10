---
title: Ενσωμάτωση του κεντρικού δικτύου με το Eth2
description: Μάθετε για την ενσωμάτωση - όταν το κεντρικό δίκτυο του Ethereum θα συνδεθεί με το Beacon Chain, το συντονισμένο σύστημα proof-of-stake.
lang: el
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    'Τελικά το τρέχον κεντρικό δίκτυο του Ethereum θα "ενσωματωθεί" με τις υπόλοιπες αναβαθμίσεις του Eth2.',
    'Η ενσωμάτωση αυτή θα συγχωνεύσει το κεντρικό δίκτυο του "Eth1" με το beacon chain του Eth2 και το σύστημα διαλογής (sharding system).',
    "Αυτό θα σηματοδοτήσει το τέλος του proof-of-work για το Ethereum και την πλήρη μετάβαση στο proof of stake.",
    'Μπορεί να το γνωρίζετε αυτό ως "Φάση 1.5" με τεχνικούς όρους.',
  ]
---

<UpgradeStatus date="~2021/22">
    Με αυτή την αναβάθμιση θα ακολουθήσει η άφιξη των shard chains. Αλλά είναι η στιγμή που το <a href="/eth2/vision/">όραμα του Eth2</a> θα υλοποιηθεί πλήρως – με μεγαλύτερη επεκτασιμότητα, ασφάλεια και επιβιωσιμότητα με την υποστήριξη ολόκληρου του δικτύου.
</UpgradeStatus>

## Ποια είναι η ενσωμάτωση; {#what-is-the-docking}

Είναι σημαντικό να θυμόμαστε ότι αρχικά, οι υπόλοιπες αναβαθμίσεις του Eth2 αποστέλλονται ξεχωριστά από το [κεντρικό δίκτυο](/glossary/#mainnet) - την αλυσίδα (chain) που χρησιμοποιούμε σήμερα. Το κεντρικό δίκτυο του Ethereum θα συνεχίσει να ασφαλίζεται με το λεγόμενο [proof-of-work](/developers/docs/consensus-mechanisms/pow/), ακόμη και όταν [η Beacon Chain](/eth2/beacon-chain/) και οι [shard chains](/eth2/shard-chains/) θα εκτελούνται παράλληλα χρησιμοποιώντας το [proof of stake](/developers/docs/consensus-mechanisms/pos/). Η ενσωμάτωση θα πραγματοποιηθεί όταν αυτά τα δύο συστήματα θα συγχωνευτούν.

Φανταστείτε το Ethereum να είναι ένα διαστημόπλοιο που δεν είναι αρκετά έτοιμο για ένα διαστρικό ταξίδι του. Με την Beacon Chain και τις shard chains η κοινότητα έχει χτίσει ένα νέο κινητήρα και ένα ποιο ανθεκτικό κύτος. Όταν έρθει η ώρα, το διαστημόπλοιο θα προσγειωθεί με αυτό το νέο σύστημα, έτσι ώστε να μπορεί να καταστεί έτοιμο να τεθεί σε σοβαρά έτη φωτός και να επικρατήσει στο σύμπαν.

## Ενσωμάτωση κεντρικού δικτύου {#docking-mainnet}

Όταν είναι έτοιμο, το κεντρικό δίκτυο του Ethereum θα "συνδεθεί" με την Beacon Chain και θα γίνει το δικό του σύστημα που θα χρησιμοποιεί το proof-of-stake αντί για το [proof of work](/developers/docs/consensus-mechanisms/pow/).

Το Κεντρικό δίκτυο θα φέρει τη δυνατότητα να διαχειρίζεται Smart Contract με το σύστημα proof-of-stake, συν το πλήρες ιστορικό και την τρέχουσα κατάσταση του Ethereum, για να διασφαλιστεί ότι η μετάβαση θα είναι ομαλή για όλους τους κατόχους και τους χρήστες του ETH.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Μετά την ενσωμάτωση {#after-the-docking}

Αυτό θα σηματοδοτήσει το τέλος του proof-of-work για το Ethereum και θα ξεκινήσει την εποχή ενός πιο βιώσιμου, φιλικού προς το περιβάλλον Ethereum. Σε αυτό το σημείο το Ethereum θα έχει την κλίμακα, την ασφάλεια και τη βιωσιμότητα που περιγράφεται στο [όραμα Eth2](/eth2/vision/).

## Σχέση μεταξύ των αναβαθμίσεων {#relationship-between-upgrades}

Οι αναβαθμίσεις του Eth2 είναι με κάποιο τρόπο αλληλένδετες. Ας ανακεφαλαιώσουμε λοιπόν πώς η ενσωμάτωση επηρεάζει τις υπόλοιπες αναβαθμίσεις.

### Η ενσωμάτωση και η κύρια αλυσίδα {#docking-and-beacon-chain}

Μόλις συμβεί η ενσωμάτωση, οι stakers θα αφοσιωθούν στην επικύρωση του κεντρικού δικτύου του Ethereum. Ακριβώς όπως και με τις shard chains. [Η εξόρυξη](/developers/docs/consensus-mechanisms/pow/mining/) δεν θα απαιτείται πλέον και έτσι οι εξορύκτες πιθανότατα να επενδύσουν τα κέρδη τους στο νέο σύστημα proof-of-stake.<ButtonLink to="/eth2/beacon-chain/">Το Beacon Chain</ButtonLink>

### Η ενσωμάτωση και οι shard chains {#docking-and-shard-chains}

Με το κεντρικό δίκτυο να γίνεται ένα shard, η επιτυχής εφαρμογή των shard chains είναι κρίσιμη για αυτή την αναβάθμιση. Είναι πιθανό η μετάβαση να διαδραματίσει σημαντικό ρόλο βοηθώντας την κοινότητα να αποφασίσει αν θα ξεκινήσει μια δεύτερη αναβάθμιση για το sharding. Αυτή η αναβάθμιση θα κάνει τα άλλα shards όπως το mainnet: θα είναι σε θέση να χειριστεί συναλλαγές και Smart Contract και όχι μόνο να παρέχει περισσότερα δεδομένα.<ButtonLink to="/eth2/shard-chains/">Shard chains</ButtonLink>
