---
title: AI agent models
description: Choosing the model that drives your AI agent, capability, cost, latency, inference hosting options from centralized APIs to self-hosted open weights, and the trust tradeoffs of each
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: AI agent models on Ethereum
summaryPoints:
  - "Pick a model for tool-calling reliability, not chatbot benchmarks"
  - "Inference hosting from centralized API to self-hosted open weights"
  - "Centralized inference is the agent's biggest off-chain trust dependency"
---

<!--
## OLD CONTENT FROM VERIFICATION (TEE and maturity sections — relevant to inference trust and privacy)

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

## Current maturity and production guidance {#maturity}

<Alert variant="warning">
<AlertContent>
<AlertTitle>
Maturity note
</AlertTitle>
<AlertDescription>
Most production agents in 2026 do not use verifiable inference. Integrating zkML or TEE attestations adds engineering complexity and, for zkML, meaningful latency. The guidance below describes when the added complexity is justified.
</AlertDescription>
</AlertContent>
</Alert>

**Use zkML when:**

- The agent controls funds or executes consequential transactions that require verifiable policy compliance.
- You need asynchronous proof submission, meaning the agent acts, generates a proof offline, and the proof is verified before a subsequent dependent action.
- The model is small and bounded: decision trees, compact classifiers, or fraud detectors under a few thousand parameters.

**Use TEEs when:**

- The agent's model weights or strategy are proprietary and cannot be revealed, but the agent needs to prove it is running unmodified code.
- Real-time operation is required and zkML proving latency is not acceptable.
- The hardware supply chain risk of TEEs is acceptable for your threat model.

**Expect rapid improvement:** Proof generation times are falling as GPU-accelerated proving infrastructure matures. EZKL and SP1 are actively driving proving times toward sub-second ranges for bounded models, and folding schemes (HyperNova, Protostar) are reducing memory footprints to enable complex models on commodity hardware.

## Further reading {#further-reading}

- [The promise and challenges of crypto + AI applications](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html) — Vitalik Buterin's foundational analysis of where cryptographic verification adds value to AI systems and where it does not.
- [The Definitive Guide to ZKML (2025)](https://blog.icme.io/the-definitive-guide-to-zkml-2025/) — Comprehensive technical overview of the zkML landscape, covering proving infrastructure evolution, tool comparisons, and performance benchmarks from 2023 to 2025.
- [Agent identity (ERC-8004)](/ai-agents/identity/) — The onchain agent identity standard, including the Validation Registry design that will route verification requests to delegated verifier contracts once finalized.

-->
