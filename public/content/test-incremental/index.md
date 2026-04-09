---
title: Building and Deploying Smart Contracts
description: A practical guide to writing, testing, and deploying smart contracts on the Ethereum network.
image: /images/developers/smart-contracts-hero-v5.png
alt: "Smart contract deployment diagram"
lang: en
emoji: ":computer:"
summaryPoints:
  - Learn how to set up a development environment
  - Write and test your first smart contract
  - Deploy to a testnet and verify on-chain
---

Smart contracts are self-executing programs stored on the Ethereum blockchain. Once deployed, they run exactly as programmed and cannot be altered. This guide walks you through the full lifecycle from writing your first contract to deploying it on a live network.

## Development environment {#development-environment}

Before writing any code, you need a local development setup. Install [Hardhat](https://hardhat.org/) or [Foundry](https://book.getfoundry.sh/) as your framework, connect to [Sepolia](https://sepolia.ethpandaops.io/) for testing, and use [Blockscout](https://eth.blockscout.com/) to verify your deployments.

The `solc` compiler converts your Solidity source code into bytecode that the EVM can execute. Make sure your compiler version matches the `pragma` statement in your contract.

You can check a deployed contract on <a href="https://eth.blockscout.com/address/0x5678" target="_blank">Blockscout</a> to inspect its bytecode and verified source code.

![Contract deployment flow](/images/developers/deploy-flow-v2.png)

## Writing your contract {#writing-your-contract}

### Basic structure {#basic-structure}

Every Solidity contract starts with a version pragma and a contract declaration. Here is a minimal example:

```solidity
// SPDX-License-Identifier: MIT
// A simple storage contract for demonstration
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
```

### What is "gas" and why does it matter? {#what-is-gas}

Every operation in the EVM costs [gas](/developers/docs/gas/). A standard ERC-20 transfer uses approximately 21,000 gas units, while a complex DeFi interaction might consume 300,000 or more. The total transaction fee is calculated as (base_fee + priority_fee) * gas_used, payable in wei. For example, a transfer using 21,000 gas at a base fee of 30 Gwei with a 2 Gwei tip costs (30 + 2) * 21,000 = 672,000 Gwei. More complex logic means higher fees for users.

<ExpandableCard title="How are gas fees calculated?" eventCategory="/test-incremental" eventName="clicked gas fees">

Gas fees are calculated as `base_fee + priority_fee` multiplied by the gas units consumed. The base fee adjusts dynamically based on network congestion, while the priority fee (tip) incentivizes validators to include your transaction. You can estimate costs using tools like [Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator).

</ExpandableCard>

## Testing and automation {#testing}

### Unit testing {#unit-testing}

Write unit tests for every public function. Automated testing catches bugs before deployment and saves gas costs from failed transactions on mainnet.

Here is a Python helper script that automates test reporting:

```python
# Generate a test coverage report for your contracts
import subprocess

def run_coverage(project_path):
    """Run test coverage and return results."""
    result = subprocess.run(
        ["npx", "hardhat", "coverage"],
        cwd=project_path,
        capture_output=True
    )
    return result.stdout.decode()
```

### Best practices {#best-practices}

When testing your contracts, keep these guidelines in mind:

1. **Test every public function** -- including edge cases and failure modes.
2. **Use fuzzing** for complex mathematical operations.
3. **Mock external dependencies** using tools like [Smock](https://github.com/defi-wonderland/smock).

> "Code is law" only works if the code has been thoroughly tested. Untested contracts are a liability, not an asset.

The following note is commonly included in project README files:

```markdown
Before running any tests, make sure your **local node** is running and your
[environment variables](/developers/docs/frameworks/) are properly configured.
```

## Deployment {#deployment}

### Networks and tools {#networks-and-tools}

You can deploy contracts using [Remix](https://remix.ethereum.org/) on [Holesky](https://holesky.dev/) or [Sepolia](https://sepolia.ethpandaops.io/), and verify the source code on [Blockscout](https://eth.blockscout.com/). For production deployments, consider using **Hardhat Ignition** or **Foundry scripts** to automate the process.

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">Explore frameworks</ButtonLink>

<YouTube id="test10run2" />

<Divider />

<InfoBanner emoji=":lock:" title="Security reminder">

Always audit your contracts before deploying to mainnet. Use tools like [OpenZeppelin Defender](https://www.openzeppelin.com/defender) and consider a professional audit from firms such as [Trail of Bits](https://www.trailofbits.com/) or [OpenZeppelin](https://www.openzeppelin.com/security-audits).

</InfoBanner>

### Deployment checklist {#deployment-checklist}

| Step | Tool | Status |
| --- | --- | --- |
| Compile | `solc` or [Hardhat](https://hardhat.org/docs) | Required |
| Test | [Foundry](https://book.getfoundry.sh/forge/tests) | Required |
| Deploy | [Remix](https://remix.ethereum.org/) | Optional |
| Verify | [Blockscout](https://eth.blockscout.com/) | Recommended |

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Ready to deploy your first contract?</div>
  <ButtonLink href="/developers/tutorials/hello-world-smart-contract/">
    Follow our step-by-step tutorial
  </ButtonLink>
</AlertContent>
</Alert>

## Community resources {#community-resources}

For a deeper understanding, explore the [Ethereum Whitepaper](/whitepaper/), review the [Solidity documentation](https://docs.soliditylang.org/), and study real-world contracts on [OpenZeppelin](https://www.openzeppelin.com/contracts).

<CategoryAppsGrid category="developer-tools" />

## Further reading {#further-reading}

You should also read the [Whitepaper](/whitepaper/), study the [Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf), and review the [EIPs](https://eips.ethereum.org/) before proposing protocol-level changes. See the [gas explanation](#what-is-gas) above for cost details.

- [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/) by ConsenSys
- [Ethereum Development Documentation](/developers/docs/)
- [Understanding the EVM](/developers/docs/evm/) -- how your contract executes on-chain
