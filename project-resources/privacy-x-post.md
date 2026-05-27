author: Philip Krause 
posted on X: @phipsae (https://x.com/phipsae) 

Original X article link: https://x.com/phipsae/status/2044052479776620560?s=20 

Originally posted date: April 14, 2026 

Post title: Privacy apps on Ethereum 

-- 
# Privacy apps on Ethereum 

Ethereum is radically public by design. Every address, every balance, every vote is visible to anyone with an RPC endpoint. Yet you can vote without revealing who voted, withdraw without revealing who deposited, and claim airdrops or join DAOs without being linked back to a wallet.

One reusable pattern powers a large class of privacy apps. This article is specifically about anonymous-membership apps: systems where people register first, then later prove they belong to the group without revealing which member they are. At its core, the pattern breaks the on-chain link between the wallet you register with and the wallet you act from. A zero-knowledge proof is the bridge between them, and it does not leak who you are. Master the pattern once and you can build voting, mixers, anonymous airdrops, and anonymous membership systems. The core idea repeats, even though the implementation details still matter.

## The pattern, explained through anonymous voting
The cleanest way to see it is anonymous voting.

### Step one: registering
Every voter picks two random numbers and keeps them private. Call them the **secret** and the **nullifier**. The voter hashes them together into a single value called a **commitment**, then publishes the commitment on-chain and keeps the two original numbers stored securely on their computer. You can think of the commitment as the registration record that later lets you cast one anonymous vote from a different address. Because the commitment is a hash, it reveals nothing about the secret or the nullifier inside it.

### Step two: building the crowd
As more voters register, all of their commitments are collected into a shared **Merkle tree**. A Merkle tree is a way of summarizing many commitments into one master hash called the **root**. You hash the commitments in pairs, then hash those results in pairs, and keep going until everything has been collapsed into a single value at the top. The trick of a Merkle tree is that, given the root, you can later prove your commitment was one of the inputs that produced it without revealing which one.

That tree is your **anonymity set**. The term sounds technical but the idea is simple: when you later prove you are in the tree, an outside observer can only narrow you down to "someone who is in this tree." They cannot tell which of the registered voters was actually you. Everyone in the tree looks the same from the outside, and that is exactly the privacy you want.

The strength of that protection scales with the size of the crowd. With three voters in the tree, an observer has a one-in-three shot at guessing which one was you. With ten thousand, guessing is useless. A "private" app with two users is not private. It gives an observer a 50:50 chance of picking the right person.

### Step three: voting
When the poll opens, you do not log in with your registration address. Instead, you create a **zero-knowledge proof**: math that lets you prove a statement is true without revealing the values that make it true. The statement is encoded as a small program called a **circuit**, and in this case the circuit checks that you know the **secret** and **nullifier** behind one of the commitments in the Merkle tree.

The **secret** helps prove you are an eligible voter, and the **nullifier** is what prevents you from voting twice. You submit the proof to the voting contract. That contract relies on a **verifier**, a smart contract automatically generated from your circuit and deployed on-chain, which checks the proof against the rules. The contract becomes convinced you are one of the registered voters, but never learns which one.

Alongside the proof, you publish one more value: a hash of your nullifier, called the **nullifier hash**. The contract stores it as a one-shot stamp on your vote. Because it is a hash, nobody can run it backward to recover the nullifier itself or learn anything useful about your private values.

The contract does two checks. Is the proof valid, and has it seen this nullifier hash before? If the proof passes and the hash is new, it counts your vote and saves the hash. If you try to vote again from the same commitment, your nullifier produces the same hash, the contract sees the collision, and it rejects the duplicate. Every commitment is spent exactly once, and the contract never learns which one was yours.

## How a zero-knowledge proof works
It is worth taking a closer look at the proof, because it does most of the heavy lifting. Think of it as a sealed envelope. Inside the envelope are your private values: the secret and the nullifier. Outside the envelope is a tiny mathematical receipt that anyone can check. The receipt effectively says: "Whoever sealed this envelope knew values that satisfy the rules." The verifier checks the receipt, accepts you, and never opens the envelope.

## The wallet catch
Even a perfect proof fails if you are careless about which wallet you use. Register your commitment from wallet A and then vote from wallet A, and anyone watching can link the two transactions directly, undoing everything the proof protected.

The fix: register from one wallet, then act from a fresh burner wallet that has never been used before. Have a relayer (or an ERC-4337 paymaster) pay the burner's gas, so the burner does not need to receive ETH from you first, which would itself create a link. The proof is the only bridge between your two identities, and unlike the wallets themselves, that bridge is cryptographic and unobservable.

## A reusable gate
Now the payoff. Strip away the voting story and what you actually have is a reusable gate you can drop in front of certain smart contract functions: verify the proof, confirm the nullifier hash has not been used yet, mark it as used, then run the rest of the function. That pattern repeats across use cases, but the surrounding engineering still matters: deploying the verifier, storing the user's secret and nullifier safely, handling Merkle roots, and maintaining an offchain copy of the tree are all part of a real system. 

Put the check in front of a withdrawal function and you have the core of a mixer-style withdrawal flow. Put it in front of an airdrop claim and you have anonymous airdrops. Put it in front of a vote, a leak submission, or an access gate and you have private DAOs, anonymous whistleblowing, and shielded membership checks. Same commitment tree, same nullifier idea, same proof pattern. What changes is the function body and the surrounding app logic.

It is not an app. It is a privacy layer: a gate you drop into any smart contract function that should only be callable by an anonymous member of a registered group.

## The tooling caught up

The tooling has finally caught up. **Noir** is a Rust-like language for writing the math (the "circuit") that defines what your proof has to prove. **Poseidon**, the hash function ZK circuits use internally, is roughly fifty times cheaper to run inside a circuit than SHA256, which is why proofs actually fit on-chain. As of April 2026, mainnet gas has often been low enough that verification can cost cents per call when conditions are similar. A privacy MVP today is often one or two contracts, one circuit, and a frontend: small enough to prototype quickly, even if production hardening takes more work.

Build it yourself: [ethskills.com/noir](https://ethskills.com/noir) for the full mechanics, [speedrunethereum.com/challenge/zk-voting](https://speedrunethereum.com/challenge/zk-voting) for a complete worked example.