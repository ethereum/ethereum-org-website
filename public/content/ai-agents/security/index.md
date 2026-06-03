---
title: AI agent security
description: Securing autonomous AI agents against prompt injection, poisoned tools and MCP servers, malicious LLM routers, and supply-chain attacks, anchored to the OWASP Agentic Top 10
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: AI agent security on Ethereum
summaryPoints:
  - "The model and tools never touch the signing key"
  - "Prompt injection, poisoned MCP, and LLM router attack surfaces"
  - "Anchored to the OWASP Agentic Top 10"
---

<!--
## OLD CONTENT FROM VERIFICATION (opaque agent framing, TEE trust assumptions — relevant to security attack surface)

**An AI agent running offchain is, by default, opaque.** Users and counterparties have no way to confirm that the model producing the agent's outputs is the model it claims to be, that it ran without tampering, or that it followed its stated rules. When an agent takes a consequential action, like executing a trade, releasing funds, or making a governance vote, the only evidence it provides is its own assertion.

### Trust assumptions for TEEs {#tee-trust}

TEE security depends on the manufacturing integrity and signing infrastructure of the hardware vendor. Published vulnerabilities in Intel SGX, including [Foreshadow](https://foreshadowattack.eu/) (speculative execution side-channel, 2018) and [Plundervolt](https://plundervolt.com/) (voltage fault injection, 2019), have demonstrated that **hardware-level flaws can break isolation guarantees**. Builders choosing TEEs are trusting the hardware supply chain as well as the software running inside the enclave.

TEE attestations provide a **weaker trust model than zkML proofs**, which depend only on mathematical hardness assumptions. TEEs should be treated as a strong but imperfect mitigation, not an absolute guarantee.

---

## OLD CONTENT FROM WALLETS (local testing security, Anvil exploit — relevant to security attack surface)

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

-->
