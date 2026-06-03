---
title: AI agent wallets
description: Smart account and wallet infrastructure for Ethereum AI agents, including ERC-4337, EIP-7702, session keys, key management security patterns, and SDK guidance for ZeroDev and Safe
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: AI agent wallets on Ethereum
summaryPoints:
  - "Smart accounts with session keys and spending limits"
  - "ERC-4337 for new wallets, EIP-7702 for upgrades"
  - "Key management patterns with human-in-the-loop escalation"
---

This page covers wallet infrastructure for autonomous AI agents: programmatic key management, spending guardrails, and session-based access control.

For personal wallets (human-managed Ethereum accounts, wallet apps, self-custody basics, and security), see [Ethereum wallets](/wallets/).

---

An autonomous agent requires a wallet with enforced operational boundaries. A raw externally owned account (EOA) **has no native concept of spending limits**, so a single hallucination, prompt injection, or logic error can drain it.

Smart account standards, primarily [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) and [EIP-7702](/roadmap/pectra/7702/), prevent these unauthorized drains by moving policy enforcement into the contract itself.

## ERC-4337 vs. EIP-7702 {#account-standards}

Two standards dominate agent wallet infrastructure. The right choice depends on whether you are creating a new agent or upgrading an existing EOA.

|                  | ERC-4337 smart account                     | EIP-7702 delegation                                                           |
| :--------------- | :----------------------------------------- | :---------------------------------------------------------------------------- |
| **Address**      | New contract address                       | Preserves your existing EOA address                                           |
| **Gas**          | Native abstraction via Paymaster contracts | Possible via delegated contract logic                                         |
| **Session keys** | Full support via permission plugins        | Full support via delegation modules                                           |
| **Revocability** | Module upgrade or removal                  | Delegate to a null address                                                    |
| **Best for**     | New agent deployments, maximum flexibility | Adding smart account capabilities to an existing EOA without migrating assets |

**ERC-4337** deploys a new smart contract account at a fresh address. It is the standard starting point for new agent deployments and provides the most mature ecosystem of permission plugins and paymasters.

**EIP-7702** allows an existing EOA to temporarily delegate execution to a smart contract module. The EOA address is preserved, no asset migration is required, and the delegation can be revoked at any time by pointing to a null address. Use EIP-7702 when you need to add session key capability to an existing wallet without disrupting the address or migrating assets.

For most new agent deployments, **ERC-4337 is the standard starting point**. EIP-7702 is the right choice when you are upgrading an existing EOA. When evaluating wallet providers and SDKs, filter for those with native ERC-4337 support. The two SDK examples covered in this guide both implement it.

Before choosing an SDK, first understand how you will store and manage the keys that control the account. The key storage options range significantly in security and operational complexity.

## Key management patterns {#key-management}

An autonomous agent must sign transactions programmatically, requiring a private key to be accessible in its runtime environment. Programmatic key access creates a fundamental security tension: the key must be available enough for the agent to act independently, but isolated enough that a runtime exploit or compromised dependency cannot extract it.

The following patterns describe where to store the agent's signing key, scaling from local development shortcuts to production-grade architectures.

| Pattern                             | Security  | Operational complexity | Recommended for                                          |
| :---------------------------------- | :-------- | :--------------------- | :------------------------------------------------------- |
| Local `.env` file                   | Low       | Minimal                | Local development only — never production                |
| Encrypted keystore                  | Medium    | Low                    | Early production with limited value at risk              |
| Cloud KMS (AWS, GCP)                | High      | Medium                 | Production deployments with automated signing            |
| Hardware wallet co-signing          | Very high | High                   | High-value agent operations requiring human confirmation |
| TEE (Trusted Execution Environment) | Very high | High                   | Agents requiring private keys to remain unextractable    |

**Key safety rules:**

- Never commit private keys to Git. Bots scrape GitHub in real time and exploit leaked secrets within seconds.
- Never store a master private key in an agent's runtime environment. Use session keys.
- Use a dedicated wallet with limited funds for agent operations.
- Double-check addresses. Use `viem.getAddress()` for checksum validation before every transaction.

## Session keys {#session-keys}

A **session key** is a time-bounded, policy-bounded signing credential. It authorizes the agent to act within a defined scope without exposing the master private key. If the session key is compromised, **the blast radius is limited to the policy parameters you set**. The smart contract rejects any UserOperation that violates them, regardless of what the language model instructs.

A well-structured session key policy specifies:

- **Maximum spend per transaction** — prevents runaway individual operations.
- **Rolling time-window budget** — for example, no more than 100 USDC per day.
- **Contract allowlist** — restricts the agent to specific verified contracts.
- **Validity window** — a `validAfter` / `validUntil` timestamp after which the key automatically expires.

The **owner-agent key separation** pattern is essential. The agent generates a local key pair and sends only its public address to the account owner. The owner configures the session key policy and hands the bounded credential back to the agent. **The agent never sees the master private key.**

Session keys are enabled by the custom validation logic built into ERC-4337 smart accounts and EIP-7702 delegation modules (they are not a core Ethereum protocol primitive). Because each SDK implementor built session key support independently, there is no unified interface for requesting them yet.

The proposed [Request Permissions from Wallets - ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) addresses the lack of a unified interface by defining a standardized `wallet_grantPermissions` RPC method, through which an agent requests a scoped session key from a wallet provider. The policy parameters described above (spend limits, contract allowlist, validity window) are the values passed in that request.

ERC-7715 is in draft and being adopted by major smart wallet providers. Until it is finalized, consult your chosen SDK's documentation for its current permission request API.

## SDK implementation examples {#sdk-examples}

The examples below cover two production-grade options that serve different deployment shapes:

- ZeroDev for new agent deployments requiring granular policy enforcement
- Safe for high-value or multi-party treasury deployments

Both have well-documented session key permission APIs. If evaluating other wallet SDKs, verify they provide stable, documented methods for enforcing session key boundaries (such as spend limits and contract allowlists) while ERC-7715 remains in draft.

### ZeroDev (Kernel) {#zerodev-kernel}

<Alert variant="warning">
<AlertContent>
<AlertTitle>
Best for:
</AlertTitle>
<AlertDescription>
New agent deployments requiring granular per-contract, per-function, or per-value policy enforcement, and teams comfortable building on a still-maturing ERC-4337 ecosystem.
</AlertDescription>
</AlertContent>
</Alert>

ZeroDev's [Kernel smart account](https://docs.zerodev.app/) uses composable permission plugins. It provides granular session key control and is frequently recommended for new agent deployments that need per-contract, per-function, or per-value policy enforcement.

The example below demonstrates the pattern. It creates a Kernel smart account with two enforced policies:

1. A call policy restricting the agent to a single allowlisted contract address
2. A timestamp policy expiring the session after 24 hours
   It then assembles a bundler client wired to a paymaster.

_Replace the example contract address with the smart contract you want to authorize your agent to interact with._

```bash
npm install @zerodev/sdk @zerodev/ecdsa-validator @zerodev/permissions viem permissionless
```

```typescript
import { toPermissionValidator } from "@zerodev/permissions"
import { toCallPolicy, toTimestampPolicy } from "@zerodev/permissions/policies"
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk"
import { parseUnits, getAddress, http } from "viem"
import { sepolia } from "viem/chains"
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless"
import { account, agentSigner, ecdsaValidator, publicClient } from "./setup"

const ENTRY_POINT_ADDRESS = ENTRYPOINT_ADDRESS_V07
// EntryPoint v0.7: 0x0000000071727De22E5E9d8BAf0edAc6f37da032
// v0.8 and v0.9 are also live — verify the version your SDK and bundler target.

// Example: WETH on Sepolia — replace with your authorized target contract address
const WETH_SEPOLIA = getAddress("0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14")

const callPolicy = toCallPolicy({
  permissions: [
    {
      target: WETH_SEPOLIA,
      valueLimit: parseUnits("0", 18), // no ETH value transfers
    },
  ],
})

const timestampPolicy = toTimestampPolicy({
  validAfter: Math.floor(Date.now() / 1000),
  validUntil: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
})

const permissionValidator = await toPermissionValidator(publicClient, {
  entryPoint: ENTRY_POINT_ADDRESS,
  signer: agentSigner, // agent's key — not the owner's
  policies: [callPolicy, timestampPolicy],
})

const agentAccount = await createKernelAccount(publicClient, {
  plugins: {
    sudo: ecdsaValidator,        // owner's public key (ECDSA address) — can revoke
    regular: permissionValidator, // agent's bounded authority
  },
  entryPoint: ENTRY_POINT_ADDRESS,
})

// Pass agentKernelClient (not the owner's client) to your framework wallet adapter
export const agentKernelClient = createKernelAccountClient({
  account: agentAccount,
  chain: sepolia,
  bundlerTransport: http(process.env.BUNDLER_RPC),
  middleware: {
    sponsorUserOperation: (await createZeroDevPaymasterClient({
      chain: sepolia,
      transport: http(process.env.PAYMASTER_RPC),
    })).sponsorUserOperation,
  },
})
```

Any UserOperation that violates `callPolicy` or `timestampPolicy` is rejected by the bundler before it reaches the mempool.

### Safe (Allowance Module) {#safe-allowance-module}

<Alert variant="warning">
<AlertContent>
<AlertTitle>
Best for:
</AlertTitle>
<AlertDescription>
Any production agent deployment that requires a battle-tested foundation. Safe is widely audited, multi-party by default, and the only option in this guide that does not depend on still-maturing ERC-4337 tooling. Particularly suited to DAO treasury delegation and cases where the agent must spend from a shared team treasury without being granted full multisig signing authority.
</AlertDescription>
</AlertContent>
</Alert>

Safe provides widely audited smart account infrastructure on Ethereum. For agent deployments, the [Safe Allowance Module](https://github.com/safe-global/safe-modules/tree/main/modules/allowances) is the primary mechanism for delegating scoped spending to an agent key without exposing the multisig threshold.

Because the agent key is a hot key operating autonomously, placing the Safe under multisig ownership ensures no single compromised credential (whether the agent key, a human hot wallet, or a prompt injection) can unilaterally drain the treasury.

**Recommended production pattern:**

- A 2-of-3 Safe with an agent wallet (hot), a human hot wallet, and a human cold wallet
- Threshold: 2

The agent can spend within the allowance module's limits autonomously; any operation above the allowance requires the human co-signers.

The code below shows how to connect the Safe SDK to an existing Safe instance. Enabling the Allowance Module is a two-step prerequisite:

1. Submit a module-enable transaction signed by the required threshold of owners
2. Configure the agent's delegate address and per-period spending limit via the module's API before the agent can act autonomously.

```bash
npm install @safe-global/protocol-kit @safe-global/api-kit
```

```typescript
import Safe from "@safe-global/protocol-kit"

// Initialize the Safe SDK with the owner's key
const safeSdk = await Safe.create({
  provider: process.env.RPC_URL,
  signer: process.env.OWNER_PRIVATE_KEY,
  safeAddress: process.env.SAFE_ADDRESS,
})

// The Allowance Module is a separate Safe module — enable it on your Safe first
// via a module transaction signed by the required threshold of owners.
// After enabling, configure the agent delegate and allowance via the module's API.
// See: https://github.com/safe-global/safe-modules/tree/main/modules/allowances
```

**Key Safe contract addresses (v1.4.1, deterministic across chains):**

| Contract           | Address                                      |
| :----------------- | :------------------------------------------- |
| Safe Singleton     | `0x41675C099F32341bf84BFc5382aF534df5C7461a` |
| Safe Proxy Factory | `0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67` |
| MultiSend          | `0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526` |

## Human-in-the-loop escalation {#hitl}

Session key policies enforce hard limits, but some actions should require a human decision before submission:

1. **Routine operations within the allowlist** — execute autonomously.
2. **Out-of-allowlist addresses or near-budget operations** — pause and notify the operator before submitting.
3. **Policy modifications or large treasury movements** — require explicit out-of-band authorization (for example, a signed approval from the owner's key) before proceeding.

The Vercel AI SDK's `onStepFinish` callback gives you a hook to inspect each tool invocation before the next reasoning step. For workflows that need durable state across pauses, [LangGraph](https://www.langchain.com/langgraph) provides `interrupt_before` / `interrupt_after` hooks that fully serialize agent state and resume only on an external signal.

[Clear signing](https://clearsigning.org/) is an emerging initiative to ensure that every wallet displays a structured, human-readable transaction summary before the operator confirms, rather than raw hexadecimal calldata that operators cannot meaningfully verify. Without it, hardware wallet co-signing on AI agent actions is a blind confirmation: the operator has no way to know what the transaction actually does. [Structured Data Clear Signing Format - ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) is the standard defining the metadata format that makes clear signing possible across wallets.

Until ERC-7730 support is widespread, two interim practices maintain meaningful human review:

- **Use a wallet with built-in transaction decoding.** Wallets that have adopted Clear Signing, Hardware wallets with proprietary clear signing implementations, and software wallets with integrated simulation can decode calldata before presenting it to the operator.
- **Run pre-submission simulation in your escalation logic.** Before surfacing a high-value transaction to the human operator, call `publicClient.simulateContract()` and format the decoded result (including target address, function name, and parameters) as part of the approval request. This ensures the operator sees what they are approving regardless of their wallet's display capabilities.

## Local testing security {#local-testing-security}

<Alert variant="warning">
<AlertContent>
<AlertTitle>
The Anvil RPC exploit vector
</AlertTitle>
<AlertDescription>
Language models can discover and invoke privileged Anvil debug methods, like `anvil_setBalance` and `anvil_setStorageAt`, to manipulate local blockchain state rather than executing proper contract logic. An agent using `anvil_setBalance` to give itself a large ETH balance bypasses the spending limits and allowlist checks that your session key is supposed to enforce. This defeats the purpose of testing your guardrails.
</AlertDescription>
</AlertContent>
</Alert>

**How to mitigate:** Route your agent's RPC calls through a restrictive JSON-RPC proxy that blocks non-standard methods. [Veto](https://github.com/pimlicolabs/veto) is designed specifically for this purpose, acting as a proxy that allows only the standard EIP-1474 JSON-RPC methods and rejects any `anvil_*`, `hardhat_*`, or `debug_*` prefixed calls.

The following command installs and starts Veto on port 8546, forwarding permitted calls to your Anvil node on port 8545:

```bash
# Install and run Veto as a proxy in front of your Anvil node
npx @pimlico/veto --port 8546 --upstream http://localhost:8545
```

Point your agent's RPC to `http://localhost:8546` (the Veto proxy) instead of `http://localhost:8545` (raw Anvil). The agent's transaction logic now must work within the constraints of standard Ethereum JSON-RPC, the same constraints it will face on testnet and mainnet.

**Additional local testing practices:**

- Run your full session key policy under Veto before deploying to testnet.
- Test that your HITL escalation logic correctly intercepts operations that should require human approval.
- Use `publicClient.simulateContract()` before every `writeContract` call, even in local tests.

## Frequently asked questions {#faq}

<ExpandableCard title="Do AI agents need a wallet?">

Yes. Any agent that needs to send, receive, or interact with onchain protocols needs a wallet. For production agents, a **smart account** (ERC-4337 or EIP-7702) is the recommended approach. It allows you to set spending limits, allowlists, and time-bounded session keys at the contract level. A raw EOA with no spending policy is not appropriate for autonomous operation.

</ExpandableCard>

<ExpandableCard title="Can AI agents own cryptocurrency?">

Yes. An Ethereum smart account is not tied to a legal entity. An agent can hold ETH, stablecoins, and any ERC-20 or ERC-721 token. The agent controls these assets through its signing key. This is different from a human controlling an agent's wallet; the agent itself holds the key and signs transactions directly (with guardrails in place).

</ExpandableCard>

<ExpandableCard title="What is ERC-4337 and how do agents use it?">

ERC-4337 is the smart account standard for Ethereum. Instead of a raw externally owned account (EOA) controlled by a private key with no spending constraints, ERC-4337 deploys a smart contract wallet that enforces spending limits, allowlists, and session key policies at the contract level. For agents, this means a compromised session key cannot drain the wallet beyond the policy it is scoped to.

</ExpandableCard>

<ExpandableCard title="What is EIP-7702?">

EIP-7702 is live on Ethereum Mainnet since the Pectra upgrade (May 7, 2025). It allows an existing EOA to temporarily delegate execution to a smart contract module, gaining smart account capabilities (spending limits, session keys, gas abstraction) without migrating assets to a new address. Use EIP-7702 when you need to upgrade an existing wallet without changing its address. Use ERC-4337 when deploying a new agent from scratch.

</ExpandableCard>

<ExpandableCard title="How do I limit what my AI agent can spend?">

Use an ERC-4337 smart account with a session key policy. A session key is a time-bounded, policy-bounded signing credential that authorizes the agent to act within a defined scope. For example, maximum 0.01 ETH per transaction, 100 USDC per day, only allowed to call Uniswap and Aave. The smart contract enforces these limits and rejects any UserOperation that violates them regardless of what the language model instructs.

</ExpandableCard>

<ExpandableCard title="Can an AI agent drain my wallet?">

A raw EOA with no spending constraints can be drained if the agent is compromised, hallucinating, or subject to a prompt injection attack. A smart account with a session key policy limits the blast radius to the policy parameters. If the session key is compromised, the attacker can only spend up to the daily limit and only call the allowlisted contracts. For production deployments with significant value at risk, use a Safe 2-of-3 (agent key, human hot wallet, human cold wallet) so no single key can authorize large treasury movements.

</ExpandableCard>

## Further reading {#further-reading}

- [ERC-7715: Wallet permissions](https://eips.ethereum.org/EIPS/eip-7715) — Ethereum Improvement Proposals
- [Safe documentation](https://docs.safe.global/) — safe.global
- [ZeroDev documentation](https://docs.zerodev.app/) — zerodev.app
- [Veto JSON-RPC proxy](https://github.com/pimlicolabs/veto) — GitHub
- [Flashbots Protect documentation](https://docs.flashbots.net/flashbots-protect/overview) — How private mempool routing works and when to use it for MEV-sensitive agent transactions

<!--
## OLD CONTENT FROM VERIFICATION (TEE providers and trust — relevant to key-security ladder)

## Trusted Execution Environments (TEEs) {#tees}

A Trusted Execution Environment partitions a processor into a secure, **hardware-isolated region** that the host operating system and cloud provider cannot access. Private keys, model weights, and signing operations run inside the enclave. The hardware generates a **cryptographic attestation** proving that a specific, unmodified piece of code is actively running in the enclave.

TEE attestations can be published onchain as a verifiable claim about the agent's integrity, providing a **faster alternative to zkML** for cases where full computational proofs are not yet practical, with **different trust assumptions**.

### TEE providers {#tee-providers}

| Provider               | Notes                                                                        |
| :--------------------- | :--------------------------------------------------------------------------- |
| **AWS Nitro Enclaves** | Easiest to deploy; well-documented; strong isolation from the EC2 hypervisor |
| **Intel TDX**          | Broader hardware support; used in GCP Confidential VMs                       |
| **AMD SEV**            | Hardware-level memory encryption; used in Azure Confidential VMs             |
| **Phala Network**      | TEE-based smart contracts; onchain attestation via the Phala Protocol        |

[Unichain](https://docs.unichain.org/) uses TEE-based block ordering to provide **MEV-resistant transaction sequencing** via Flashbots Rollup-Boost, demonstrating how TEE guarantees can be integrated into L2 protocol design, not just agent deployments.

### Trust assumptions for TEEs {#tee-trust}

TEE security depends on the manufacturing integrity and signing infrastructure of the hardware vendor. Published vulnerabilities in Intel SGX, including [Foreshadow](https://foreshadowattack.eu/) (speculative execution side-channel, 2018) and [Plundervolt](https://plundervolt.com/) (voltage fault injection, 2019), have demonstrated that **hardware-level flaws can break isolation guarantees**. Builders choosing TEEs are trusting the hardware supply chain as well as the software running inside the enclave.

TEE attestations provide a **weaker trust model than zkML proofs**, which depend only on mathematical hardness assumptions. TEEs should be treated as a strong but imperfect mitigation, not an absolute guarantee.

-->
