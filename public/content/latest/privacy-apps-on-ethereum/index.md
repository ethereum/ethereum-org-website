---
title: "How to build privacy apps on Ethereum with zero-knowledge proofs"
description: "One reusable pattern powers anonymous voting, mixers, airdrops, and membership systems on Ethereum. Learn the commitment-nullifier-proof cycle and how zero-knowledge tooling makes it practical to build today."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "zero-knowledge proofs"
  - "privacy"
  - "Noir"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: Privacy apps on Ethereum
lang: en
---

Ethereum is radically public by design. Every address, balance, transaction, contract call, and event is visible to anyone with a block explorer. That transparency is useful when you want verifiability. It is a problem when users need to vote, claim, withdraw, or prove membership without linking every action back to the same wallet.

Anonymous membership is the reusable pattern that powers a large class of privacy apps on Ethereum. People register first, then later prove they belong to the group without revealing which member they are. A zero-knowledge proof is the bridge between the registration wallet and the acting wallet, and the bridge does not reveal who crossed it.

The surrounding product changes, but the privacy skeleton stays the same.

## The pattern, explained through anonymous voting {#the-pattern-explained-through-anonymous-voting}

The pattern has three pieces. A commitment registers each member. A Merkle tree turns those commitments into a crowd. A proof and a nullifier let one member act once without revealing which member acted.

### Step one: registering {#step-one-registering}

Every voter creates two private values offchain, the secret and the nullifier. The voter hashes those values into a public commitment, then registers that commitment onchain.

The commitment is the public registration record. The secret and nullifier are the private note the voter needs later. Lose the note and the voter cannot prove membership. Leak it and someone else may be able to vote in the user's place.

Because the commitment is a hash, observers cannot recover the private values inside it. The commitment says "someone registered" without revealing who will later use that registration.

### Step two: building the crowd {#step-two-building-the-crowd}

As more voters register, the app collects their commitments into a Merkle tree. A Merkle tree compresses a long list of values into a single hash, called the root. Change any value in the list and the hash changes, so the root acts as a tamper-evident summary of the whole set.

That tree is your anonymity set. If ten users are in the tree, an observer can narrow a later action down to one of those ten. If ten thousand users are in the tree, the action is much harder to link to one person. A private app with a tiny anonymity set is usually not very private, even if the cryptography is correct.

### Step three: acting anonymously {#step-three-acting-anonymously}

When the poll opens, the voter should not vote from the same wallet that registered the commitment. Voting from the registration wallet would link the vote straight back to the registrant and undo the privacy work. Instead, the voter creates a zero-knowledge proof. The statement is encoded as a circuit that says, "I know private values that produce a registered commitment, and I am revealing the correct nullifier hash for this poll."

The proof convinces the verifier contract that the statement is true. It does not reveal the secret, the nullifier, or which commitment was used.

The nullifier is what prevents double voting. Alongside the proof, the voter publishes a nullifier hash. The voting contract stores that hash after accepting the vote. If the same private note is used again for the same poll, it produces the same nullifier hash, and the contract rejects the second vote. Combined with the proof, this leaves the contract knowing only that some registered voter acted once, not which one.

## The reusable gate {#the-reusable-gate}

That same proof-and-nullifier pair works beyond voting. Strip away the voting story and what you have is a privacy gate for smart contract functions.

Before the function runs, the contract checks the Merkle root, verifies the proof, confirms the nullifier hash has not been used, and binds the public inputs to the right app, chain, poll, claim, or withdrawal. If those checks pass, it marks the nullifier as used and runs the rest of the function.

Put that gate in front of a vote and you get anonymous voting. Put it in front of an airdrop claim and you get anonymous claims. Put it in front of a withdrawal function and you get the core of a mixer-style withdrawal flow. Same commitment tree, same nullifier idea, same proof pattern. What changes is the function body and the surrounding app logic.

## What runs where {#what-runs-where}

The private work usually happens offchain. The user stores the note, and a client app builds the witness and runs the prover to produce the proof. An indexer tracks commitments and Merkle roots. A bundler propagates the UserOperation onchain and an ERC-4337 paymaster sponsors the gas, so a fresh wallet does not need ETH from a user's known wallet first.

The public enforcement happens onchain. The verifier contract checks the proof. The app contract checks valid roots and unused nullifiers, stores the nullifier hash, and runs the public action.

The sensitive UX is note handling. Treat the secret and nullifier like keys. Do not put them in analytics, logs, URLs, error reports, or normal server-side telemetry. Once the note leaks, the privacy is gone, no matter how strong the proof.

## The tooling caught up {#the-tooling-caught-up}

You do not need to hand-code the underlying cryptography. A common path is to write the circuit in a high-level zero-knowledge language, generate a Solidity verifier, and call that verifier from the app contract.

The right stack depends on the job. Circom with snarkjs is a long-established path for app-level circuits. Noir with Barretenberg is a newer developer-friendly path. Halo2 and gnark are lower-level circuit libraries. zkVMs such as RISC Zero or SP1 prove normal programs, but can be more expensive to prove than a small custom circuit.

For anonymous membership, reach for an existing protocol before writing your own circuit. Semaphore packages group membership and nullifier-based double-use prevention into contracts and JavaScript libraries. For private voting and governance, MACI is the specialized path because it adds anti-collusion properties. Mature protocols are often safer than new circuits.

## The proof is not enough {#the-proof-is-not-enough}

Even a perfect proof fails if the wallet flow leaks the link. Register from wallet A and later act from wallet A, and anyone watching can connect the transactions. Fund wallet B from wallet A right before acting, and that funding transaction creates the same problem.

This is why bundlers and paymasters matter. The acting wallet should be fresh, and it should not need to receive ETH from a wallet the user is trying to separate from the action.

The same problem exists offchain. Submitting registration and action transactions from the same IP address, RPC provider, or session can weaken the privacy the circuit provides. Frontends can leak through analytics, local storage, and support logs. A zero-knowledge proof hides the values inside the proof. It does not hide everything around the transaction.

Public inputs are another place privacy apps fail. Anything marked public in the circuit, emitted as an event, included in calldata, or stored by the contract is visible. Review public inputs as carefully as access control on a Solidity contract.

## What this changes for builders {#what-this-changes-for-builders}

Privacy on Ethereum is shippable. Builders can compose the pieces into real applications. The stack is a circuit for the private statement, a verifier for proof checking, an app contract for public rules, an indexer for Merkle data, and a bundler plus paymaster for unlinkable submission and gas sponsorship.

The hard parts are product design, key management, metadata hygiene, audits, and growing the anonymity set. Get any of them wrong and the privacy the proof gave is gone.

## Further reading {#further-reading}

1. [Zero-knowledge proofs (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Semaphore Documentation](https://docs.semaphore.pse.dev/)
3. [MACI Documentation](https://maci.pse.dev/)
4. [Circom Documentation](https://docs.circom.io/)
5. [Noir Documentation](https://noir-lang.org/)
6. [Halo2 Book](https://zcash.github.io/halo2/)
7. [gnark Documentation](https://docs.gnark.consensys.io/)
8. [RISC Zero Documentation](https://dev.risczero.com/api/)
9. [SP1 Documentation](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Account Abstraction via EntryPoint Contract](https://eips.ethereum.org/EIPS/eip-4337)
