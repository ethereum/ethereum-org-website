---
title: "Scaffold-ETH 2: Building with the AI extension"
description: Scaffold-ETH 2 now supports AI-powered code generation, enabling developers to prototype smart contracts and front-end components faster. Learn how to use the new extension to accelerate your Ethereum development workflow.
author: Austin Griffith
team: EF Builder Growth
tags: ["scaffold-eth", "tooling", "ai"]
published: 2026-05-01
lang: en
template: blog
breadcrumb: Scaffold-ETH 2 AI
---

## What is new {#what-is-new}

Scaffold-ETH 2 has introduced an AI-powered extension that generates boilerplate code for smart contracts and React front-end components. This post walks through the key features and how to get started.

## Getting started {#getting-started}

To try the AI extension, create a new Scaffold-ETH 2 project:

```sh
npx create-eth@latest
```

Then enable the AI extension in your project configuration:

```typescript
// scaffold.config.ts
const scaffoldConfig = {
  aiExtension: true,
  targetNetworks: [chains.sepolia],
}
```

## Smart contract generation {#smart-contract-generation}

The AI extension can generate Solidity smart contracts from natural language descriptions. For example, you can describe a token vesting contract and receive a working implementation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVesting {
    IERC20 public token;
    address public beneficiary;
    uint256 public releaseTime;

    constructor(IERC20 _token, address _beneficiary, uint256 _releaseTime) {
        require(_releaseTime > block.timestamp, "Release time must be in the future");
        token = _token;
        beneficiary = _beneficiary;
        releaseTime = _releaseTime;
    }

    function release() public {
        require(block.timestamp >= releaseTime, "Tokens are not yet releasable");
        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "No tokens to release");
        token.transfer(beneficiary, amount);
    }
}
```

## What is next {#what-is-next}

The team is working on expanding the AI extension to support:

- Multi-contract project scaffolding
- Automated test generation
- Front-end component suggestions based on contract ABIs

Stay tuned for more updates from the Ethereum builder ecosystem.
