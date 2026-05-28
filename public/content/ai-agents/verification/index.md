---
title: Verifiable AI agents
description: How zero-knowledge machine learning, trusted execution environments, and onchain audit trails enable verifiable AI agent behavior on Ethereum
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Verifiable AI agents on Ethereum
summaryPoints:
  - "zkML proofs and TEE attestations remove operator trust"
  - "Contracts verify correct model execution before releasing funds"
  - "Permanent, tamper-resistant onchain audit trails of agent behavior"
---

**An AI agent running offchain is, by default, opaque.** Users and counterparties have no way to confirm that the model producing the agent's outputs is the model it claims to be, that it ran without tampering, or that it followed its stated rules. When an agent takes a consequential action, like executing a trade, releasing funds, or making a governance vote, the only evidence it provides is its own assertion.

Ethereum provides two technical paths for making agent behavior verifiable without requiring trust in the agent's operator: **zero-knowledge machine learning (zkML) proofs** and **trusted execution environment (TEE) attestations**. Smart contracts can verify both types of evidence before releasing funds or executing other consequential actions, creating a chain of verifiable behavior from model inference to onchain settlement.

---

## Zero-knowledge machine learning (zkML) {#zkml}

[Zero-knowledge](/zero-knowledge-proofs/) machine learning generates a **cryptographic proof** demonstrating that a specific model produced a specific output from a specific input. The proof can be **verified onchain by a smart contract**, and the proof verification does not require access to the model weights or input data.

**What zkML proves:** Correct computation. A zkML proof guarantees that the stated model executed the stated logic on the stated input and produced the stated output. It does not guarantee that the output is factually accurate, only that it was produced consistently.

**What zkML does not prove:** Factual accuracy, absence of hallucination, or correctness of the model's reasoning. An agent can still produce a wrong answer and provide a valid zkML proof of that wrong answer. zkML proves that the model ran, not that the model was right.

This distinction matters for how zkML is used in practice. It is most valuable for **proving policy compliance** ("the agent only called the trade function when its classifier output exceeded 0.95 confidence") rather than for validating the underlying reasoning.

### zkML tools and maturity {#zkml-tools}

The following tools have production-ready APIs and are suitable for builder integration as of early 2026:

| Tool                                             | Description                                                                                          | Maturity                                                         |
| :----------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| **[EZKL](https://ezkl.xyz/)**                    | Converts ONNX models to ZK circuits; CLI and Python SDK; GPU-accelerated with CUDA kernel support    | Production-ready — audited, deployed in adversarial environments |
| **[Risc Zero](https://dev.risczero.com/)**       | General-purpose ZK proofs via zkVM; supports arbitrary Rust programs with onchain verifier contracts | Production-ready (post-1.0 release)                              |
| **[SP1 (Succinct)](https://docs.succinct.xyz/)** | ZK proving system for RISC-V programs; multilinear polynomial-based proof system                     | Production-ready (SP1 Hypercube, launched mainnet Feb 2026)      |

**Emerging tools:** [DeepProve (Lagrange)](https://lagrange.dev/deepprove) has demonstrated transformer-scale proving (GPT-2) but is not yet generally available. [Jolt (a16z)](https://jolt.a16zcrypto.com/) added native zero-knowledge privacy support in March 2026 but remains in alpha. Neither is recommended for production agent deployments today.

**Performance envelope (2026):** Proof generation takes **1–5 seconds for bounded models** (decision trees, compact classifiers, fraud detectors) with GPU-accelerated proving infrastructure. Larger models (transformer-scale) require **10–60+ seconds** depending on model size and proving hardware. These timelines are not suitable for real-time inference. Use zkML for **batch verification or asynchronous proof submission** — scenarios where the proof can be generated after the inference and submitted onchain before a dependent action executes.

### The EZKL workflow {#ezkl-workflow}

EZKL is the most accessible starting point for zkML integration. It takes an ONNX model file and produces a proof circuit that can be verified onchain.

The following CLI sequence converts an ONNX model into a ZK circuit, generates a proof for a specific inference run, and verifies the proof locally. The output is a proof file that can be submitted to the Solidity verifier contract that EZKL also generates.

```bash
pip install ezkl

# Step 1: Generate settings for your model
ezkl gen-settings -M model.onnx

# Step 2: Calibrate for your expected input distribution
ezkl calibrate-settings -M model.onnx -D input.json

# Step 3: Compile the model to a ZK circuit
ezkl compile-circuit -M model.onnx

# Step 4: Trusted setup (run once per circuit)
ezkl setup -M model.onnx --srs-path ptau.ptau

# Step 5: Generate a proof for a specific inference
ezkl prove -M model.onnx -D input.json

# Step 6: Verify the proof
ezkl verify
```

A smart contract can call the generated **Solidity verifier** before releasing funds or taking any action contingent on the model's output. The following section describes the practical scenarios where that verification adds the most value.

### Practical use cases for zkML {#zkml-use-cases}

**Policy compliance gating:** A DeFi agent proves that its classifier exceeded a confidence threshold before the treasury contract allows a withdrawal. The contract verifies the proof; if it fails or is absent, the withdrawal reverts.

**Fraud detection:** A fraud detection model runs offchain and generates a zkML proof for each transaction it approves. The proof is posted onchain as a **permanent, auditable record** that the transaction passed the model's risk check at that moment.

**Model upgrade governance:** A DAO governing an AI-powered protocol can require zkML proofs that a proposed model produces equivalent outputs to the current model on a defined test set, providing **cryptographic evidence before a governance vote**.

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

## Onchain immutability as an audit trail {#audit-trail}

Both zkML proofs and TEE attestations can be posted onchain, creating a **permanent, tamper-resistant audit trail**. A smart contract that records proof hashes with timestamps provides:

- **Historical accountability** — anyone can verify that a specific agent output was proven or attested at a specific point in time.
- **Dispute resolution** — if an agent's behavior is later disputed, the onchain record provides evidence that the behavior was consistent with the declared model.
- **Composability** — other smart contracts can read the proof record and condition their own behavior on whether an agent has a current valid proof.

The [ERC-8004 Validation Registry](/ai-agents/identity/#validation-registry) is designed to formalize this pattern by routing verification requests to delegated verifier contracts and recording results onchain. The Validation Registry specification is **not yet finalized**; see the [AI agents: Identity](/ai-agents/identity/) page for current status. The audit trail patterns described above can be implemented independently of ERC-8004 using custom verifier contracts.

The sections above describe how zkML proofs, TEE attestations, and onchain audit trails make agent behavior verifiable. The guidance below covers when to use each approach based on your agent's model size, latency requirements, and threat model.

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

## Frequently asked questions {#faq}

<ExpandableCard title="What is zkML and why does it matter for AI agents?">

**Zero-knowledge machine learning (zkML)** generates a cryptographic proof that a specific model ran a specific computation and produced a specific output. A smart contract can verify this proof before releasing funds or executing a consequential action, allowing the contract to condition behavior on the agent's reasoning, not just its assertion. Today zkML is production-viable for bounded models (decision trees, classifiers). Large language model inference remains too slow for real-time use but is improving rapidly.

</ExpandableCard>

<ExpandableCard title="How do I verify what my AI agent did?">

Three mechanisms: (1) **Onchain transaction history** — every transaction signed by the agent is permanently recorded on the L2 and settled to Mainnet. (2) **ERC-8004 Reputation Registry** — other parties can post feedback about the agent's behavior. (3) **zkML proofs or TEE attestations** — for cases where you need to prove that a specific model produced a specific output. Most production agents today rely on onchain transaction history for auditing. zkML is used when you need cryptographic proof of policy compliance.

</ExpandableCard>

## Further reading {#further-reading}

- [The promise and challenges of crypto + AI applications](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html) — Vitalik Buterin's foundational analysis of where cryptographic verification adds value to AI systems and where it does not.
- [The Definitive Guide to ZKML (2025)](https://blog.icme.io/the-definitive-guide-to-zkml-2025/) — Comprehensive technical overview of the zkML landscape, covering proving infrastructure evolution, tool comparisons, and performance benchmarks from 2023 to 2025.
- [Agent identity (ERC-8004)](/ai-agents/identity/) — The onchain agent identity standard, including the Validation Registry design that will route verification requests to delegated verifier contracts once finalized.
