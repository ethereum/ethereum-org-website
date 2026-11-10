# Curriculum

The canonical home for course order, vocabulary rules and the term ledger.

## Order is a suggestion

`COURSES` in `src/data/courses/index.ts` is the suggested path, and the hub lists courses in that order. Nothing is locked: learners can open any course or lesson. Lessons in a course are still written to be taken in order.

Suggested path: **Wallets → Blockchain → Transactions → Ether → Smart contracts**. Wallets is the friendly hook and needs only a one-line idea of a blockchain. Blockchain explains blocks, validators and finality. Transactions builds on both. Ether deepens the money side (units, supply, staking) and introduces tokens at intro depth. Smart contracts comes last because it needs transactions, gas and tokens.

## Vocabulary rules

1. **Introduce, then assume.** A term is introduced when a concept step defines it in plain words (bold it with `<strong>` there). After that, later lessons in the same course use it freely.
2. **Define on first use when no earlier lesson did.** Use a short appositive ("a <strong>gas limit</strong>: the most gas the transaction is allowed to use") rather than a separate lesson. Prompts and options are plain text, so define the term in a concept step or in the prompt sentence itself.
3. **Across courses, assume earlier courses on the suggested path, but add a short reminder.** Because nothing is locked, a lesson that leans on an earlier course's term restates it in a clause ("Validators, who stake ETH to run the network, …"). Never write "as you saw in course X".
4. **Prefer plain description to a new term.** If a term is used only once, describe it instead ("the same turn", not "the same slot", until a lesson needs slots for real, as finality does). Every new term costs the learner attention.
5. **Preview, don't presume.** When a step has to touch a topic no lesson covers yet, describe it plainly, name it once, and flag it: "We'll learn more about slashing in a future lesson." Then add it to the owed topics below. Never use an uncovered term as if the learner knows it, and don't name later topics just to sound complete.
6. **Feedback and widget strings count.** Option feedback, explains and widget labels follow the same rules as concept text.

## Spiral depth

A topic can appear several times at increasing depth: a simplified first pass that avoids jargon, then a later lesson or course that revisits it once its dependencies exist. Depth levels used in the ledger:

- **intro**: plain-language idea, no mechanics ("a shared record that thousands of computers keep in sync").
- **core**: how it works, with the term in play ("blocks linked by hashes").
- **deep**: edge cases, numbers and trade-offs ("finality after about 13 to 19 minutes; a third of stake can stall it").

A later pass may deepen a term but must not contradict the earlier simplification. Tighten it ("roughly", "usually") rather than leave a wrong mental model.

## Term ledger

The terms each lesson introduces, in suggested-path order. A lesson may use anything above it, plus everyday words. When adding or editing a lesson, add its terms here and check its copy against the rows above it.

| Course / lesson           | Introduces (depth)                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallets / keys            | blockchain (intro), private key, address, wallet holds keys not coins                                                                                                                                         |
| wallets / recovery        | recovery phrase, self-custody (described as "holding your own keys")                                                                                                                                          |
| wallets / signing         | digital signature, signing a message                                                                                                                                                                          |
| wallets / addresses       | account (many from one recovery phrase), look-alike address (named "address poisoning" once), checking the whole address                                                                                      |
| wallets / custody         | exchange (described), custodial ("someone else holds your keys"), hot wallet, hardware wallet, cold wallet (keys offline)                                                                                     |
| blockchain / hashing      | hash function, hash, one-way                                                                                                                                                                                  |
| blockchain / chain        | block, chain of hashes (blockchain to core), node                                                                                                                                                             |
| blockchain / consensus    | validator, stake, finality (core), slashing (preview)                                                                                                                                                         |
| blockchain / nodes        | node (core: own copy, checks every block, anyone can run one), syncing / in sync                                                                                                                              |
| blockchain / finality     | slot (12 seconds, one chance for a block), checkpoint (every 32 slots, about 6.4 minutes), finality (deep, about 13 to 19 minutes, by where the block lands), slashing (core)                                 |
| transactions / lifecycle  | transaction, broadcast, irreversibility                                                                                                                                                                       |
| transactions / gas        | gas, gas price, gwei, gas limit, base fee, tip                                                                                                                                                                |
| transactions / blocks     | block space, burn, nonce, finality (reminder, about 13 to 19 minutes)                                                                                                                                         |
| transactions / failed     | failed transaction, fee still paid, unused gas refunded                                                                                                                                                       |
| transactions / explorer   | block explorer, transaction hash                                                                                                                                                                              |
| ether / what              | ether / ETH (native currency), Ethereum the network vs ETH the money, uses of ETH (fees, validator stake, money)                                                                                              |
| ether / units             | wei (smallest unit, how balances are recorded), 1 ETH = 1,000,000,000 gwei = 10^18 wei                                                                                                                        |
| ether / supply            | issuance (new ETH to validators), burn (core: base fee vs issuance), net supply grows or shrinks with activity                                                                                                |
| ether / wrapped           | token (intro: "a balance that a program on Ethereum keeps track of"), wrapped ETH (WETH, 1:1), smart contract (preview)                                                                                       |
| ether / staking           | staking rewards, solo staking (32 ETH), staking pool, exchange staking (custodial reminder), offline penalties                                                                                                |
| smart-contracts / what    | smart contract (core: program on Ethereum that runs exactly as written, vending machine with no clerk), rejected input changes nothing, deploy (published to Ethereum), deployed code can't simply be changed |
| smart-contracts / calling | calling a contract, reading (free: no transaction, no gas, nothing changes), writing (signed transaction + gas, changes something)                                                                            |
| smart-contracts / tokens  | token (core: a contract keeping a list of balances; sending = asking it to update the list; tokens never leave it), WETH reminder (balance on the WETH contract)                                              |
| smart-contracts / public  | contract code is public, source code, verified contract (on a block explorer), contracts calling contracts (described as "building blocks")                                                                   |
| smart-contracts / risks   | bugs can't simply be patched, attackers read the code too, audit (reduces risk, no guarantee), token approval, unlimited approval (no expiry), revoke                                                         |

## Owed topics

Previewed with a "future lesson" promise but not yet taught. Each needs a lesson (or a later pass) that covers it; remove the row when it ships.

| Topic | Previewed in | Promise |
| ----- | ------------ | ------- |
