---
title: Evaluating Ethereum for your organization
metaTitle: Evaluating Ethereum for your organization | ethereum.org
description: A phased due-diligence framework for deciding whether and how an organization should build on Ethereum.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
heroImage: /images/enterprise-eth.png
heroImageWidth: 2263
heroImageHeight: 1433
alt: Ethereum logo
---

Ethereum is a foundation, not a turnkey solution. Use this guide when you need to decide whether to proceed, what to test, and what would make the answer no.

## Questions for every component {#questions-for-every-component}

| Question | What it reveals |
| --- | --- |
| If its operator disappeared tomorrow, what would still work? | The real dependency boundary. |
| Can we retrieve assets and records without its cooperation? | Recovery and exit capability. |
| Who can change, pause, censor, or upgrade it? | Authority and governance. |
| Can auditors inspect relevant code and rules? | Verifiability. |
| What data becomes visible, and to whom? | Privacy exposure. |
| What does migration away look like in practice? | Switching cost and continuity. |
| Are we using open standards or a proprietary interpretation? | Interoperability risk. |

## A phased approach {#a-phased-approach}

Scope one use case with an owner and bounded blast radius. Choose the architecture deliberately. Design confidentiality and controls early. Audit the code and the operating assumptions. Launch with limits, run alongside existing systems, then expand only with operational confidence.

<Grid>
  <Card title="1. Scope" description="Choose one use case, one owner, and a bounded blast radius." emoji="01" />
  <Card title="2. Test" description="Choose architecture deliberately, design controls early, and audit code plus operating assumptions." emoji="02" />
  <Card title="3. Learn" description="Launch with limits, run alongside existing systems, and expand only with operational confidence." emoji="03" />
</Grid>

## When Ethereum is not the answer {#when-ethereum-is-not-the-answer}

Use a conventional system when one legitimate operator controls the process, external parties do not need independent verification, or performance within a single perimeter is the only goal. Shared infrastructure is useful only when it solves a real coordination problem.
