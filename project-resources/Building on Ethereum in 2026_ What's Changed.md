# Building on Ethereum in 2026, What's Changed

If your mental model of Ethereum was formed in 2021 to 2023, it is out of date. Three protocol upgrades since then, Dencun in March 2024, Pectra in May 2025, and Fusaka in December 2025, changed two things builders care about, how much L1 costs to use and what regular wallets can do.

## Mainnet is cheap again

The 2021 to 2023 fee regime is no longer a safe default assumption.

As of May 5, 2026, Etherscan's gas tracker shows standard gas around 0.15 gwei, with daily averages near 0.5 gwei through April. A basic ETH transfer costs under a cent at that level, with typical recent days landing in the low single-digit cents. The trend has been falling across each of the recent upgrades, and the next one, Glamsterdam, is set to push fees lower still. That makes "Ethereum mainnet is too expensive for most apps" a stale starting point.

If you want a simple rule of thumb, use gas math instead of old folklore. At 0.5 gwei, the recent April average, and ETH at roughly $2,350, illustrative costs look like this.

| Operation | Gas Used | Illustrative Cost |
| :---- | :---- | :---- |
| ETH transfer | 21,000 | **$0.025** |
| ERC-20 transfer | \~65,000 | **$0.076** |
| ERC-20 approve | \~46,000 | **$0.054** |
| Swap | \~180,000 | **$0.21** |
| ERC-20 deploy | \~1,200,000 | **$1.41** |

Those are examples, not guarantees. Costs move with ETH price, gas price, and contract complexity. Gwei readings can swing widely inside a normal month while the dollar cost barely moves, because rollups now carry about 95 percent of Ethereum's transactions and L1 typically runs well below its block target. Mainnet fees are now low enough that many apps can sensibly run on mainnet.

### Why costs fell

Three upgrades did most of the work.

Dencun (March 2024\) introduced EIP-4844 and gave rollups their own data lane through blobs, with a separate fee market. Rollups stopped competing with ordinary execution traffic on the same blockspace.

Pectra activated on May 7, 2025\. EIP-7691 raised blob throughput from 3 target / 6 max blobs per block to 6 target / 9 max, which expanded the cheap data lane rollups use and pushed L2 fees lower.

Fusaka activated on December 3, 2025\. Its headline capacity change was PeerDAS, which lets validators sample blob data instead of downloading every blob in full, and that sampling is what makes higher blob counts safe at the network layer. In parallel, the community raised the L1 gas limit from 30M to 60M during 2025, and Fusaka's EIP-7935 standardized 60M as the new default. EIP-7825 caps any single transaction at \~16.78M gas, which most apps will never notice but very large deployments and monolithic multicalls now have to fit inside. EIP-7951 also added native secp256r1 (P-256) verification on mainnet, which makes passkey and WebAuthn signatures far cheaper to verify in account flows.

The net effect is that mainnet is no longer priced like a permanently congested chain.

## How EIP-7702 changes the account model

Pectra also shipped EIP-7702, which gives regular wallets access to smart-account behavior like batching, gas sponsorship, session keys, recovery flows, and passkey-friendly UX, without making the user migrate to a new account.

It works by adding a new transaction type (type `0x04`, `SetCode`) that lets an EOA set a pointer to already deployed contract code. The user keeps the same address, the original EOA key keeps ultimate control over the account, and the delegation can later be changed or reset to the null address.

For app builders, the practical change is to ask the wallet for the outcome, not for low-level EIP-7702 setup. If a user needs to approve and swap in one flow, request a batch through ERC-5792 `wallet_sendCalls`. The wallet can decide whether to use EIP-7702, ERC-4337, or another account system.

The delegated code is a security boundary. If a wallet points an EOA at buggy or malicious code, that code can make calls as the user, including token approvals, transfers, and app interactions. Builders should treat delegation targets like wallet infrastructure, relying on wallet-vetted implementations and not asking users to delegate to app-controlled code casually.

## What this changes about how to build

The default builder question used to be "which L2 is cheap enough?" That question still has answers, but it is not the only one. With L1 fees in the cents-per-tx range during normal load, and EIP-7702 letting any wallet expose smart-account UX without migrating addresses, the more useful default is whether the app should live on mainnet, or whether a specific L2 gives a real distribution, liquidity, or UX advantage that L1 cannot.

The account assumption changes too. Do not design new apps as if every user account is a plain ECDSA EOA that must hold ETH before doing anything useful. Prefer wallet-level batching interfaces such as ERC-5792 `wallet_sendCalls`, assume gas sponsorship and session keys will become normal wallet features, and treat passkeys and recovery flows as part of the account UX surface rather than separate onboarding hacks.

## What's next

Ethereum's next named upgrade is Glamsterdam, with Block-level Access Lists (BALs) and enshrined proposer-builder separation (ePBS) as headline items. Together those make it safe to raise the block gas limit from 60 million today toward roughly 200 million, leaving more L1 capacity for builders to work with. Activation is expected in the second half of 2026\. After Glamsterdam, Hegotá is planned to follow, with Fork-choice enforced Inclusion Lists (FOCIL) selected as its headlining feature.

For builders, the items worth tracking are more L1 capacity (BALs), more reliable transaction inclusion (FOCIL), and the path toward native account abstraction. ePBS, the other Glamsterdam headline, is mostly an infrastructure change that removes a trust dependency under L1 transaction inclusion. The direct app-level surface change is small.

BALs are about keeping L1 cheap as usage grows. In plain English, a block would come with a map of the accounts and storage it touches. Clients can use that map to prefetch data and execute independent transactions in parallel, which makes it safer to raise the L1 gas limit without making blocks too slow to verify. The practical effect for builders is that more activity can come back to mainnet without automatically recreating the 2021 to 2023 gas regime.

FOCIL is about getting valid transactions into blocks even when one block producer would rather leave them out. Today, if the party building a block ignores a transaction, the rest of the protocol has limited ways to force it in. With EIP-7805, several validators would say, in effect, "we saw these valid transactions waiting in the public mempool." The next block then has to include them, or validators can refuse to support that block. For builders, this matters when reliable access to L1 is part of the product, including privacy tooling, regulated onramps, or apps serving users who may be filtered by some infrastructure providers.

For app builders, the Hegotá item to watch most closely is account abstraction. EIP-8141, Frame Transactions, would add a transaction type where validation, execution, and gas payment are split into frames. In practice, that means a smart account could verify a transaction itself, define its own signature rules, approve who pays gas, and execute one or more actions without depending on the ERC-4337 EntryPoint, bundlers, or app-run relayers.

That changes product assumptions. Gas sponsorship becomes a native account pattern instead of infrastructure every app has to arrange separately. Alternative signature schemes become easier to support, including passkeys today and a path away from ECDSA if post-quantum migration becomes necessary. If EIP-8141 or a similar native account abstraction design lands, the builder model shifts from "an EOA signs a transaction" to "an account defines how it validates, pays for, and executes a transaction."

That is the direction, not a promise. EIP-8141 is Draft, and as of May 2026 it is only "considered for inclusion" in Hegotá, meaning client teams are discussing it but have not committed to shipping it in that upgrade. The practical 2026 build path for account UX is still EIP-7702 plus ERC-4337 wallet flows, but builders should design as if programmable accounts are becoming the default account model.

## What to build differently now

Start by re-checking old fee assumptions. If your deployment playbook still treats Ethereum mainnet as a 10 to 30 gwei environment by default, it is probably routing too much work away from L1. Mainnet is worth considering first when your app depends on shared liquidity, composability with existing protocols, neutrality, or high-value state that should live where Ethereum's security and social consensus are strongest.

Use L2s for the reasons that still matter, including distribution, very high transaction volume, app-specific ecosystems, or per-action costs that need to be as close to zero as possible. The point is not "mainnet for everything." The point is that "mainnet is too expensive" should no longer be the first filter.

On the account side, build against wallet capabilities instead of raw EOAs. Your frontend should be ready for batched calls, sponsored gas, session keys, passkeys, and recovery flows to arrive through wallets. EIP-7702 and ERC-4337 are the practical tools today. Native account abstraction is the direction to track next.

Stop treating Ethereum mainnet as the expensive settlement layer you only touch at the end, and stop treating user accounts as static ECDSA keys that must hold ETH before they can do anything. Ethereum in 2026 is moving toward cheaper L1 execution and programmable accounts. Build for that world.

## Further Reading

- [Pectra Mainnet Announcement](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)  
- [Fusaka Mainnet Announcement](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)  
- [Protocol Priorities Update for 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)  
- [Checkpoint \#9 (Apr 2026\)](https://blog.ethereum.org/2026/04/10/checkpoint-9)  
- [Pectra 7702 guidelines on ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)  
- [EIP-7702 Set Code for EOAs](https://eips.ethereum.org/EIPS/eip-7702)  
- [EIP-7928 Block-level Access Lists](https://eips.ethereum.org/EIPS/eip-7928)  
- [EIP-7805 Fork-choice enforced Inclusion Lists (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)  
- [EIP-8141 Frame Transaction](https://eips.ethereum.org/EIPS/eip-8141)  
- [Forkcast Hegotá Upgrade](https://forkcast.org/upgrade/hegota/)  
- [Etherscan Gas Tracker](https://etherscan.io/gastracker)  
- [EIP-7773 Glamsterdam Hardfork Meta](https://eips.ethereum.org/EIPS/eip-7773)  
- [Glamsterdam roadmap on ethereum.org](https://ethereum.org/roadmap/glamsterdam/)

