---
title: Glamsterdam
description: Learn about the Glamsterdam protocol upgrade
lang: en
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam is an upcoming Ethereum upgrade planned for H1 2026
</AlertTitle>
<AlertDescription>
The Glamsterdam upgrade is only a single step in Ethereum's long-term development goals. Learn more about [the protocol roadmap](/roadmap/) and [previous upgrades](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

[Ethereum’s](/) upcoming Glamsterdam upgrade is designed to clear the path for the next generation of scaling. Glamsterdam is named from the combination of "Amsterdam" (execution layer upgrade, named after a previous Devconnect location) and "Gloas" (consensus layer upgrade, named after a star).

Following the progress made in the [Fusaka](/roadmap/fusaka/) upgrade, Glamsterdam focuses on scaling the L1 by reorganizing how the network processes transactions and manages its growing database, fundamentally updating how Ethereum creates and verifies blocks.

While Fusaka focused on foundational refinements, Glamsterdam advances the "Scale L1" and "Scale Blobs" objectives by enshrining the separation of duties between different network participants, and introducing more efficient ways to handle data to prepare the [state](/glossary/#state) for high-throughput parallelization.

These improvements ensure Ethereum remains fast, affordable, and decentralized as it handles more activity, while keeping hardware requirements manageable for people running [nodes](/glossary/#node) at home.

<YouTube id="GgKveVMLnoo" />

## Improvements considered for Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Note: This article currently highlights a selection of EIPs being considered for inclusion in Glamsterdam. For the latest status updates, view the [Glamsterdam upgrade on Forkcast](https://forkcast.org/upgrade/glamsterdam).

If you want to add an EIP that’s under consideration for Glamsterdam, but hasn’t been added to this page yet, [learn how to contribute to ethereum.org here](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

The Glamsterdam upgrade centers on three main goals:

- Speeding up processing (parallelization): Reorganizing how the network records data dependencies, so that it can safely process many transactions at the same time instead of in a slow, one-by-one sequence.
- Expanding capacity: Splitting up the heavy lifting of creating and verifying blocks, giving the network more time to propagate larger amounts of data without slowing down.
- Preventing database bloat (sustainability): Adjusting network fees to accurately reflect the long-term hardware cost of storing new data, unblocking future gas limit increases while preventing hardware performance degradation.

In short, Glamsterdam will introduce structural changes to ensure that as the network increases capacity, it remains sustainable and performance stays high.

## Scale L1 & parallel processing {#scale-l1}

Meaningful L1 scaling requires moving away from off-protocol trust assumptions and serial execution constraints. Glamsterdam addresses this by enshrining separation of certain block-building duties and introducing new data structures that allow the network to prepare for parallel processing.

### Headliner proposal: Enshrined proposer-builder separation (ePBS) {#epbs}

- Removes off-protocol trust assumptions and reliance on closed-source relays
- Enables L1 scaling by allowing much larger payloads through extended propagation windows
- Introduces trustless builder payments and encrypted transactions to anonymous builders

Currently, the process of proposing and building blocks includes a hand-off between block proposers and block builders. The relationship between proposers and builders isn’t part of the core Ethereum protocol, so it relies on closed-source, third-party software (relays), as well as off-protocol trust between entities.

The out-of-protocol relationship between proposers and builders also creates a ‘hot path’ during block validation that forces [validators](/glossary/#validator) to rush through transaction broadcasting and execution in a tight 2-second window, limiting how much data the network can handle.

**Enshrined proposer-builder separation (ePBS, or EIP-7732)** formally separates the job of the proposer (who chooses the block) from the builder (who assembles the transactions), ‘enshrining’ this process directly into the Ethereum protocol to remove off-protocol trust. It also introduces the Payload Timeliness Committee (PTC) and a dual-deadline logic, with validators attesting to timeliness and data availability separately to maximize throughput.

<YouTube id="u8XvkTrjITs" />

Separating the proposer and builder roles at the protocol level expands the propagation window (or the time available to spread data across the network) from 2 seconds to about 9 seconds.

ePBS reduces dependencies on extra third-party software and allows Ethereum to safely process much larger amounts of data (like more blobs for [Layer 2s](/glossary/#layer-2)) without stressing the network.

**Resources**: [EIP-7732 technical specification](https://eips.ethereum.org/EIPS/eip-7732)

### Headliner proposal: Block-level access lists (BALs) {#bals}

- Eliminates sequential processing bottlenecks by providing an upfront map of all transaction dependencies, setting the stage for validators to process many transactions in parallel instead of one by one
- Allows nodes to update their records by reading the final results without needing to replay every transaction (executionless sync), making it much faster to sync a node to the network
- Eliminates guesswork, allowing validators to pre-load all necessary data at once instead of discovering it step-by-step, which makes validation much faster

Today’s Ethereum is like a single-lane road; because the network doesn’t know what data a transaction will need or change (like which accounts a transaction will touch) until a transaction has been run, validators must process transactions one by one in a strict, sequential line. If they tried to process the transactions all at once, without knowing these dependencies, two transactions might accidentally try to change the exact same data at the same time, causing errors.

**Block-level access lists (BALs, or EIP-7928)** are like a map that’s included in every block, telling the network which parts of the database will be accessed before the work begins. BALs require every block to include the hash of every account change that the transactions will touch, along with the final results of those changes (the hash record of all state accesses and post-execution values).

Because they give instant visibility into which transactions don’t overlap, BALs allow nodes to perform parallel disk reads, fetching information for many transactions simultaneously. The network can safely group unrelated transactions and process them in parallel.

Because the BAL includes the final results of transactions (the post-execution values), when the network’s nodes need to sync to the network’s current state, they can copy those final results to update their records. Validators no longer have to replay all the complicated transactions from scratch to know what happened, making it faster and easier for new nodes to join the network.

The parallel disk reads enabled by BALs will be a significant step toward a future where Ethereum can process many transactions at once, significantly increasing the network’s speed.

#### eth/71 block access list exchange {#bale}

Block access list exchange (eth/71 or EIP-8159) is the direct networking companion to block-level access lists. While BALs unlock parallel execution, eth/71 upgrades the peer-to-peer protocol to allow nodes to actually share these lists over the network. Implementing the block access list exchange will enable faster syncing and allow nodes to perform executionless state updates.

**Resources**:

- [EIP-7928 technical specification](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8159 technical specification](https://eips.ethereum.org/EIPS/eip-8159)

## Network sustainability {#network-sustainability}

As the Ethereum network grows faster, it’s important to ensure that the cost of using it matches the wear-and-tear on the hardware that runs Ethereum. The network needs to increase its overall capacity limits in order to safely scale and process more transactions.

### State creation gas cost increase {#state-creation-gas-cost-increase}

- Ensures that the fees to create new accounts or smart contracts accurately reflect the long-term burden they place on Ethereum's database
- Automatically adjusts these data-creation fees based on the network's overall capacity, targeting a safe and predictable growth rate so standard physical hardware can continue running the network
- Separates the accounting for these specific fees to a new reservoir, removing old transaction limits and allowing developers to deploy larger, more complex applications

Adding new accounts, tokens, and [smart contracts](/glossary/#smart-contract) creates permanent data (known as "state") that every computer running the network must store indefinitely. The current fees to add or read this data are inconsistent and don’t necessarily reflect the actual, long-term storage burden they place on the network's hardware.

Some actions that create state on Ethereum, like creating new accounts or deploying large smart contracts, have been relatively low-cost compared to the permanent storage space they take up on the network’s nodes, for example, contract deployment is significantly cheaper per byte than creating storage slots.

Without adjustment, Ethereum’s state could grow by nearly 200 GiB a year if the network scales to a 100M gas limit, eventually outstripping common hardware.

**State creation gas cost increase (or EIP-8037)** harmonizes costs by tying them to the actual size of the data being created, updating the fees so they are proportional to the amount of permanent data an operation creates or accesses.

EIP-8037 also introduces a reservoir model to manage these costs more predictably; state gas charges draw from the `state_gas_reservoir` first, and the `GAS` opcode only returns `gas_left`, preventing execution frames from miscalculating available gas.

Before EIP-8037, both the computational work (the active processing) and the permanent data storage (saving the smart contract to the network's database) share the same gas limit. The reservoir model splits accounting: the gas limit for the actual computational work of the transaction (processing) and for long-term data storage (state gas). Separating the two helps prevent the sheer size of an application's data from capping out the gas limit; as long as developers provide enough funds to fill the reservoir for data storage, they can deploy much larger and more complex smart contracts.

Pricing data storage more accurately and predictably will help Ethereum safely increase its speed and capacity without bloating the database. This sustainability will allow node operators to continue using (relatively) affordable hardware for years to come, keeping home staking accessible to maintain the network’s decentralization.

**Resources**: [EIP-8037 technical specification](https://eips.ethereum.org/EIPS/eip-8037)

### State-access gas cost update {#state-access-gas-cost-update}

- Increases the gas costs for when applications read or update information permanently stored on Ethereum (state-access opcodes) to accurately match the compute work these commands require

As Ethereum’s state has grown, the act of searching for and reading old data ("state access") has become heavier and slower for nodes to process. The fees for these actions have remained the same even though it is now slightly more expensive to look up information (in terms of compute power).

As a result, some specific commands are currently underpriced relative to the work they force a node to do. `EXTCODESIZE` and `EXTCODECOPY` are underpriced, for example, because they require two separate database reads—one for the account object, and a second for the actual code size or bytecode.

**State-access gas cost update (or EIP-8038)** increases the gas constants for state-access opcodes, like looking up account and contract data, to align with modern hardware performance and state size.

Aligning the cost of state-access also helps make Ethereum more resilient. Because these heavy data-reading actions are artificially cheap, a malicious attacker could spam the network with thousands of complex data requests in a single block before hitting the network's fee limit, potentially causing the network to stall or crash (a Denial-of-Service attack). Even without malicious intent, developers are not economically encouraged to build efficient applications if reading network data is too cheap.

By pricing state-access actions more accurately Ethereum can be more resilient against accidental or intentional slowdowns, while aligning network costs with hardware load proves a more sustainable foundation for future gas limit increases.

**Resources**: [EIP-8038 technical specification](https://eips.ethereum.org/EIPS/eip-8038)

## Network resilience

Refinements to validator duties and exit processes ensure network stability during mass-slashing events and democratize liquidity. These improvements make the network more stable and ensure that all participants, large and small, are treated fairly.

### Exclude slashed validators from proposing {#exclude-slashed-validators}

- Stops penalized (slashed) validators from being selected to propose future blocks, eliminating guaranteed missed slots
- Keeps Ethereum running smoothly and dependably, preventing severe stalls in the case of a mass slashing event

Currently, even if a validator is slashed (penalized for breaking the rules or not operating as expected), the system might still pick them to lead a block in the near future when it generates future proposer lookaheads.

Because blocks from slashed proposers are automatically rejected as invalid, this causes the network to miss slots and delays network recovery during mass slashing events.

**Exclude slashed validators from proposing (or EIP-8045)** simply filters out slashed validators from being selected for future duties. This improves chain resilience by ensuring only healthy validators are selected to propose blocks, maintaining quality of service during network disruptions.

**Resources**: [EIP-8045 technical specification](https://eips.ethereum.org/EIPS/eip-8045)

### Let exits use the consolidation queue {#let-exits-use-the-consolidation-queue}

- Closes a loophole that allows high-balance validators to exit the network more quickly than smaller validators via the consolidation queue
- Allows regular exits to overflow into this second queue when it has spare capacity, reducing staking withdrawal times during high-volume periods
- Maintains strict security to avoid altering Ethereum's core safety limits or weakening the network

Since the [Pectra upgrade](/roadmap/pectra) increased the maximum effective balance for Ethereum validators from 32 ETH to 2,048 ETH, a technical loophole allows high-balance validators to exit the network faster than smaller validators via the consolidation queue.

**Let exits use the consolidation queue (or EIP-8080)** democratizes the consolidation queue for all staking exits, creating a single, fair line for everyone.

To break down how this works today:

- Ethereum’s churn limit is a safety limit on the rate at which validators can enter, exit, or merge (consolidate) their staked ETH, to ensure the network's security is never destabilized
- Because a validator consolidation is a heavier action with more moving parts than a standard validator exit, it eats up a larger portion of this safety budget (churn limit)
- Specifically, the protocol dictates that the exact security cost of one standard exit is two-thirds (2/3) the cost of one consolidation

Fairer exit queues will allow standard exits to borrow unused space from the consolidation queue during periods of high exit demand, applying a "3 for 2" exchange rate (for every 2 unused consolidation spots, the network can safely process 3 standard exits). This 3/2 churn factor balances demand across the consolidation and exit queues.

Democratizing access to the consolidation queue will increase the speed at which users can exit their stake during high-demand periods by up to 2.5x, without compromising network security.

**Resources**: [EIP-8080 technical specification](https://eips.ethereum.org/EIPS/eip-8080)

## Improve user & developer experience {#improve-user-developer-experience}

Ethereum’s Glamsterdam upgrade aims to improve the user experience, enhance data discoverability, and handle rising message sizes to prevent sync failures. This makes it easier to track what’s happening onchain while preventing technical hiccups as the network scales.

### Reduce intrinsic transaction gas costs {#reduce-intrinsic-transaction-gas-costs}

- Lowers the base fee for transactions, reducing the overall cost of a simple native ETH payment
- Makes smaller transfers more affordable, boosting Ethereum's viability as a routine medium of exchange

All Ethereum transactions have a flat base gas fee today, regardless of how simple or complex it is to process. **Reduce intrinsic transaction gas (or EIP-2780)** proposes reducing that base fee to make a standard ETH transfer between existing accounts up to 71% cheaper.

Reduce intrinsic transaction gas works by breaking down the transaction fee to reflect only the basic, essential work the computers running the network actually do, like verifying a digital signature and updating a balance. Because a basic ETH payment doesn't execute complex code or carry extra data, this proposal would reduce its fee to match its lightweight footprint.

The proposal introduces an exception for creating brand-new accounts to keep lower fees from overwhelming the network’s state. If a transfer sends ETH to an empty, non-existent address, the network must create a permanent new record for it. A gas surcharge is added for that account creation to help cover its long-term storage burden.

Together, the EIP-2780 aims to make everyday transfers between existing accounts more affordable while ensuring the network is still protected against database bloat by accurately pricing true state growth.

**Resources**: [EIP-2780 technical specification](https://eips.ethereum.org/EIPS/eip-2780)

### Deterministic factory predeploy {#deterministic-factory-predeploy}

- Gives developers a native way to deploy applications and smart contract wallets to the exact same address across multiple chains
- Allows users to have the same smart wallet address on multiple Layer 2 (L2) networks, reducing cognitive load, reducing confusion, and reducing the risk of accidental loss of funds
- Replaces the workarounds developers currently use to achieve this parity, making it easier and more secure to build multi-chain wallets and apps

If a user has a smart contract wallet today with accounts across multiple Ethereum Virtual Machine (EVM)-compatible chains, they often end up with a completely different address on different networks. This is not only confusing, but can lead to accidental loss of funds.

**Deterministic factory predeploy (or EIP-7997)** gives developers a native, built-in way to deploy their decentralized applications and smart contract wallets to the exact same address across multiple EVM chains, including Ethereum Mainnet, Layer 2 (L2) networks, and more. If adopted, it would allow user to have the exact same address on every participating chain, significantly reducing cognitive load and the potential for user error.

Deterministic factory predeploy works by permanently placing a minimal, specialized factory program at an identical location (specifically, address 0x12) on every participating EVM-compatible chain. Its goal is to provide a universal, standard factory contract that can be adopted by any EVM-compatible network; as long as an EVM chain participates and adopts this standard, developers will be able to use it to deploy their smart contracts to the exact same address on that network.

This standardization simplifies building and managing cross-chain applications for developers and the broader ecosystem. Developers no longer have to build custom, chain-specific code to link their software together across different networks, instead using this universal factory to generate the exact same address for their application everywhere. In addition, block explorers, tracking services, and wallets can more easily identify and link these applications and accounts across various chains, creating a more unified and seamless multi-chain environment for all Ethereum-based participants.

**Resources**: [EIP-7997 technical specification](https://eips.ethereum.org/EIPS/eip-7997)

### ETH transfers and burns emit a log {#eth-transfers-and-burns-emit-a-log}

- Automatically generates a permanent record (log) every time ETH is transferred or burned
- Fixes a historical blind spot that allows apps, exchanges, and bridges to dependably detect user deposits without ad-hoc tracing tools

Unlike tokens (ERC-20s), regular ETH transfers between smart contracts don't emit a clear receipt (standard log), making them difficult for exchanges and apps to track.

ETH transfers and burns emit a log (or EIP-7708) makes it mandatory for the network to emit a standard log event every time a non-zero amount of ETH is moved or burned.

This will make it much easier and more reliable for wallets, exchanges, and bridge operators to accurately track deposits and movements without custom tooling.

**Resources**: [EIP-7708 technical specification](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 partial block receipt lists {#eth-70-partial-block-receipt-lists}

As we increase the amount of work Ethereum can do, the lists of receipts for those actions (the data records of these transactions) are getting so large that they could potentially cause the network’s nodes to fail when trying to sync data with one another.

eth/70 partial block receipt lists (or EIP-7975) introduces a new way for nodes to talk to each other (eth/70) that allows these large lists to be broken into smaller, more manageable pieces. eth/70 introduces a pagination system for the network's communication protocol that allows nodes to break block receipt lists down and safely request the data in smaller, more manageable chunks.

This change would prevent network sync failures during periods of heavy activity. Ultimately, it paves the way for Ethereum to increase its block capacity, and process more transactions per block in the future, without overwhelming the physical hardware syncing the chain.

**Resources**: [EIP-7975 technical specification](https://eips.ethereum.org/EIPS/eip-7975)

## Further reading {#further-reading}

- [Ethereum roadmap](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Protocol Priorities Update for 2026 blog announcement](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [The Daily Gwei Refuel podcast - Post-quantum Ethereum, Glamsterdam is coming](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### How can ETH be converted after the Glamsterdam hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **No Action Required for Your ETH**: There is no need to convert or upgrade your ETH following the Glamsterdam upgrade. Your account balances will remain the same, and the ETH you currently hold will remain accessible in its existing form after the hard fork.
- **Beware of Scams!** <Emoji text="⚠️" /> **anyone instructing you to "upgrade" your ETH is trying to scam you.** There is nothing you need to do in relation to this upgrade. Your assets will stay completely unaffected. Remember, staying informed is the best defense against scams.

[More on recognizing and avoiding scams](/security/)

### Does the Glamsterdam upgrade affect all Ethereum nodes and validators? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Yes, the Glamsterdam upgrade requires updates to both [execution clients and consensus clients](/developers/docs/nodes-and-clients/). Because this upgrade introduces Enshrined Proposer-Builder Separation (ePBS), node operators will need to ensure their clients are updated to handle the new ways blocks are built, validated, and attested to by the network.

All main Ethereum clients will release versions supporting the hard fork marked as high priority. You can keep up with when these releases will be available in client Github repos, their [Discord channels](https://ethstaker.org/support), the [EthStaker Discord](https://dsc.gg/ethstaker), or by subscribing to the Ethereum blog for protocol updates.

To maintain synchronization with the Ethereum network post-upgrade, node operators must ensure they are running a supported client version. Note that the information about client releases is time-sensitive, and users should refer to the latest updates for the most current details.

### As a staker, what do I need to do for the Glamsterdam upgrade? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

As with every network upgrade, make sure to update your clients to latest versions marked with Glamsterdam support. Follow updates in the mailing list and [Protocol Announcements on the EF Blog](https://blog.ethereum.org/category/protocol) to get informed about releases.

To validate your setup before Glamsterdam gets activated on Mainnet, you can run a validator on testnets. Testnet forks are also announced in the mailing list and blog.

### What improvements will Glamsterdam include for L1 Scaling? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

The headline feature is ePBS (EIP-7732), which separates the heavy task of validating network transactions from the task of reaching consensus. This expands the data propagation window from 2 seconds to roughly 9 seconds, unblocking Ethereum's ability to safely handle much higher transaction throughput and accommodate more data blobs for Layer 2 networks.

### Will Glamsterdam lower fees on Ethereum (Layer 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Yes, Glamsterdam will most likely reduce fees for everyday users! Reduce intrinsic transaction gas (or EIP-2780) reduces the base fee for sending ETH, making ETH much cheaper to use for everyday payments.

In addition, for long-term sustainability, Glamsterdam introduces Block-Level Access Lists (BALs). This enables parallel processing and prepares the L1 to safely handle higher overall gas limits in the future, which will likely reduce per-transaction gas costs as capacity grows.

### Will there be any changes to my existing smart contracts post-Glamsterdam? {#will-my-smart-contracts-change}

Existing contracts will continue to function normally after Glamsterdam. Developers will likely get several new tools and should review their gas usage:

- Increase maximium contract size (or EIP-7954)allows developers to deploy larger applications, raising the maximum contract size limit from roughly 24KiB to 32KiB.
- Deterministic factory predeploy (or EIP-7997) introduces a universal, built-in factory contract. It allows developers to deploy their applications and smart contract wallets to the exact same address across all participating EVM chains.
- If your app relies on complex tracing to find ETH transfers, ETH transfers and burns emit a log (or EIP-7708) will allow you to switch to using logs for more simple and reliable accounting.
- State creation gas cost increase (or EIP-8037) and state-access gas cost update (or EIP-8038) introduce new sustainability models that will change certain contract deployment costs, as creating new accounts or permanent storage will have a dynamically-adjusting fee.

### How will Glamsterdam affect node storage and hardware requirements? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Multiple EIPs under consideration for Glamsterdam address the performance cliff of state growth:

- State creation gas cost increase (or EIP-8037) introduces a dymanic pricing model to target a state database growth rate of 100 GiB/year, ensuring standard physical hardware can continue running the network efficiently.
- eth/70 partial block receipt lists (or EIP-7975) allows nodes to request paginated block receipts, which breaks data-heavy block receipt lists into smaller chunks to prevent crashes and syncs as Ethereum scales.
