---
title: 2. réteg hozzáadása
description: A házirend, amelyet akkor használunk, amikor 2. réteget adunk az ethereum.org webhelyhez
lang: hu
---

# 2. réteg hozzáadása {#adding-layer-2}

Biztosítani szeretnénk, hogy a lehető legjobb erőforrásokat soroljuk fel, hogy a felhasználók biztonságosan és magabiztosan navigálhassanak a 2. rétegű területen.

Bárki szabadon javasolhatja egy 2. réteg hozzáadását az ethereum.org webhelyen. Ha van egy 2. réteg, amelyet kihagytunk, **[kérjük, javasolja](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

We currently list L2s on the following pages:

- [Optimista összegzők](/developers/docs/scaling/optimistic-rollups/)
- [Zero-knowledge összegzők](/developers/docs/scaling/zk-rollups/)
- [2. réteg](/layer-2/)

Layer 2 is a relatively new and exciting paradigm for Ethereum. We've tried to create a fair framework for consideration on ethereum.org but the listing criteria will change and evolve over time.

## The decision framework {#decision-framework}

### Criteria for inclusion: the must-haves {#criteria-for-inclusion-the-must-haves}

**Listing on L2BEAT**

- In order to be considered, this project must be listed on [L2BEAT](https://l2beat.com). L2BEAT provides a robust risk assessment of layer 2 projects that we lean on for evaluating L2 projects. **If the project is not featured on L2BEAT, we will not list them as an L2 on ethereum.org.**
- [Learn how to add your L2 project to L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**Nyílt forráskódú**

- Your code must be accessible and you should accept PRs from the wider community.

**Layer 2 category**

We currently consider the following to be layer 2 solutions:

- Optimistic típusú összevont tranzakciók
- Nulla tudás alapú összevont tranzakció

_We do not consider other scaling solutions that don't use Ethereum for data availability or security to be layer 2._

**Ethereum for data availability**

- Data availability is an important differentiating factor between other scaling solutions and layer 2. A project **must** use Ethereum Mainnet for data availability to be considered for listing.

**Bridges**

- How are users able to onboard to the layer 2?

**Date project went live**

- A layer 2 that has been "live" on Mainnet for over 6 months

- Newer projects that have not been battle-tested by users are less likely to be listed.

**External security audit**

- Whether through audit, an internal security team or some other method, your product's security must be reliably tested. This reduces the risk to our users and shows us that you take security seriously.

**Sustained user base**

- We will consider metrics such as TVL history, transaction statistics, and whether it is used by known companies or projects

**Active development team**

- We won't list a layer 2 that doesn't have an active team working on project.

**Block explorer**

- Listed projects require a working block explorer to allow users to easily navigate the chain.

### Other criteria: the nice-to-haves {#nice-to-haves}

**Exchange support for the project**

- Are users able to deposit and/or withdraw directly from an exchange?

**Links to dapps in the layer 2 ecosystem**

- We want to be able to provide information on what users can expect to be able to do on this layer 2. (e.g. https://portal.arbitrum.io/, https://www.optimism.io/apps)

**Token contract lists**

- Since assets will have a new address on layer 2, if there is a token list resource available please share.

**Native wallet support**

- Do any wallets support the L2 natively?

## Add your layer 2 {#add-exchange}

If you want to add a layer 2 to ethereum.org, create an issue on GitHub.

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  Hozzon létre egy problémát
</ButtonLink>
