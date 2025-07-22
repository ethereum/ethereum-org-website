---
title: Ethereum για προγραμματιστές Rust
description: Μάθετε πως να προγραμματίσετε για το Ethereum με χρήση έργων και εργαλείων βασισμένα στη rust
lang: el
incomplete: true
---

<FeaturedText>Μάθετε πως να προγραμματίσετε για το Ethereum με χρήση έργων και εργαλείων βασισμένα στη Rust</FeaturedText>

Χρησιμοποιήστε το Ethereum για να δημιουργήσετε αποκεντρωμένες εφαρμογές (ή αλλιώς "dapps") που θα χρησιμοποιούν τα οφέλη της τεχνολογίας των κρυπτονομισμάτων και της αλυσίδας των μπλοκ. Αυτά τα dapps μπορούν να είναι αξιόπιστα, πράγμα που σημαίνει ότι μόλις αναπτυχθούν στο Ethereum, θα λειτουργούν πάντοτε όπως έχουν προγραμματιστεί. Μπορούν να ελέγχουν ψηφιακά στοιχεία προκειμένου να δημιουργήσουν νέα είδη χρηματοοικονομικών εφαρμογών. Μπορούν να είναι αποκεντρωμένα, πράγμα που σημαίνει ότι καμία υπηρεσία ή άτομο δεν τα ελέγχει και είναι σχεδόν αδύνατο να λογοκριθούν.

## Ξεκινώντας με τα έξυπνα συμβόλαια και τη γλώσσα Solidity {#getting-started-with-smart-contracts-and-solidity}

**Δείτε τι χρειάζεται για να ξεκινήσετε με τη Rust στο Ethereum**

Χρειάζεστε περισσότερες βασικές πληροφορίες αρχικά; Επισκεφθείτε το [ethereum.org/learn](/learn/) ή το [ethereum.org/developers](/developers/).

- [Τι είναι η αλυσίδα των μπλοκ](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Κατανοώντας τα έξυπνα συμβόλαια](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Συντάξτε το πρώτο σας έξυπνο συμβόλαιο](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Μάθετε ανάπτυξη και μεταγλωττισμό με τη Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Άρθρα για αρχάριους {#beginner-articles}

- [The Rust Ethereum Client](https://openethereum.github.io/) \* **Λάβετε υπόψη ότι το OpenEthereum [έχει καταργηθεί](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) και δε συντηρείται πλέον.** Χρησιμοποιήστε το με προσοχή και κατά προτίμηση μεταβείτε σε άλλο πρόγραμμα πελάτη.
- [Αποστολή συναλλαγής στο Ethereum με χρήση της Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Ένας οδηγός βήμα προς βήμα δημιουργίας συμβολαίων στη Rust Wasm για Kovan](https://github.com/paritytech/pwasm-tutorial)

## Άρθρα μεσαίας δυσκολίας {#intermediate-articles}

## Πρότυπα χρήσης για προχωρημένους {#advanced-use-patterns}

- [Η εξωτερική βιβλιοθήκη pwasm_ethereum για την αλληλεπίδραση με δίκτυο τύπου Ethereum](https://github.com/openethereum/pwasm-ethereum)
- [Δημιουργία αποκεντρωμένης εφαρμογής συνομιλιών με JavaScript και Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Δημιουργία αποκεντρωμένης εφαρμογής λίστας εργασιών με Vue.js & Rust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Φτιάξτε ένα blockchain στη Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Έργα και εργαλεία της Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Μια εξωτερική βιβλιοθήκη για την αλληλεπίδραση με δίκτυα τύπου Ethereum._
- [Lighthouse](https://github.com/sigp/lighthouse) - _Γρήγορος πελάτης επιπέδου συναίνεσης Ethereum_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _Προτεινόμενος επανασχεδιασμός του επιπέδου εκτέλεσης έξυπνων συμβολαίων Ethereum χρησιμοποιώντας ένα ντετερμινιστικό υποσύνολο του WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _αναφορά OASIS API_
- [Solaris](https://github.com/paritytech/sol-rs) - _Δοκιμαστική μονάδα έξυπνου συμβολαίου Solidity χρησιμοποιώντας το εγγενές Parity Client EVM._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Εφαρμογή εικονικής μηχανής Rust Ethereum_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Το έξυπνο συμβόλαιο Wavelet στη Rust_
- [Foundry](https://github.com/foundry-rs/foundry) - _Εργαλειοθήκη για την ανάπτυξη εφαρμογών Ethereum_
- [Alloy](https://alloy.rs) - _Υψηλής απόδοσης, καλά δοκιμασμένες & τεκμηριωμένες βιβλιοθήκες για αλληλεπίδραση με το Ethereum και άλλες αλυσίδες που βασίζονται σε EVM._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Εφαρμογή βιβλιοθήκης και πορτοφολιού Ethereum_
- [SewUp](https://github.com/second-state/SewUp) - _Μια βιβλιοθήκη που θα σας βοηθήσει να δημιουργήσετε το συμβόλαιο Ethereum σύνθεσης με τη Rust και να το αναπτύξετε σε ένα κοινό backend_
- [Substreams](https://github.com/streamingfast/substreams) - _Τεχνολογία παράλληλου ευρετηρίου δεδομένων blockchain_
- [Reth](https://github.com/paradigmxyz/reth) Το Reth (συντομογραφία του Rust Ethereum) είναι μια νέα υλοποίηση πλήρους κόμβου Ethereum
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Μια επιμελημένη συλλογή έργων στο οικοσύστημα Ethereum γραμμένα σε Rust_

Χρειάζεστε περισσότερες πληροφορίες; Επισκεφθείτε το [ethereum.org/developers.](/developers/)

## Κοινότητα εθελοντών της Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
