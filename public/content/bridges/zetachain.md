---
title: ZetaChain Omnichain Bridge
description: Learn about ZetaChain's omnichain protocol for cross-chain messaging and asset transfers
lang: en
---

# ZetaChain Omnichain Bridge {#zetachain}

ZetaChain enables omnichain smart contracts and cross-chain messaging between Ethereum and other major blockchains including Bitcoin, Solana, Polygon, BSC, Avalanche, and Layer 2 networks.

Unlike traditional bridges that only transfer assets, ZetaChain supports both native asset bridging and arbitrary cross-chain messaging, allowing developers to build universal applications that span multiple chains.

## What makes ZetaChain different? {#unique-features}

ZetaChain represents a **trustless bridge** approach with unique capabilities:

- **Native Bitcoin support** - Direct BTC transfers without wrapped tokens
- **Cross-chain messaging** - Send arbitrary data and function calls between chains
- **Omnichain contracts** - Smart contracts that can interact with multiple blockchains
- **Automatic relay** - No manual claiming required, validators handle execution
- **Flexible gas payments** - Pay fees in various tokens across chains

## How ZetaChain works {#how-it-works}

ZetaChain uses a proof-of-stake validator network (100+ validators) to observe transactions on external chains and relay messages between them:

1. **Observation** - Validators observe transactions on Ethereum and other chains through full nodes
2. **Verification** - Validators reach consensus on observed transactions using Tendermint BFT
3. **Execution** - Omnichain contracts execute on ZetaChain's EVM-compatible chain
4. **Relay** - Validators sign and submit transactions to destination chains

This architecture enables:
- **No intermediary tokens** - Transfer native assets directly
- **Arbitrary messaging** - Execute complex cross-chain logic
- **Trustless operation** - Security derived from validator consensus

Learn more about [ZetaChain's architecture](https://www.zetachain.com/docs/developers/architecture/overview).

## Supported chains {#supported-chains}

ZetaChain connects Ethereum to:

| Chain | Native Token | Additional Support |
|-------|-------------|-------------------|
| Bitcoin | BTC | Native Bitcoin transfers via HTLC |
| Solana | SOL | SPL tokens |
| Polygon | MATIC | All ERC-20 tokens |
| BSC | BNB | All BEP-20 tokens |
| Avalanche | AVAX | All ARC-20 tokens |
| Arbitrum | ETH | Layer 2 ecosystem |
| Optimism | ETH | Layer 2 ecosystem |
| Base | ETH | Base ecosystem |

See the [complete list of supported networks](https://www.zetachain.com/docs/developers/chains/list).

## Omnichain messaging {#omnichain-messaging}

Beyond simple asset transfers, ZetaChain's Universal App framework enables building applications that operate across Ethereum and other chains simultaneously.

### Use cases {#use-cases}

- **Cross-chain DeFi** - Aggregate liquidity across multiple chains
- **Universal NFTs** - Mint on Ethereum, transfer to any chain
- **Multi-chain gaming** - Assets on Ethereum, game logic on other chains
- **Cross-chain governance** - Vote on Ethereum, execute on other chains
- **Bitcoin DeFi** - Use native BTC in Ethereum DeFi protocols

### Example: Cross-chain swap {#example}

```solidity
// Omnichain contract on ZetaChain
contract CrossChainSwap {
    function swapETHForBTC(address recipient) external payable {
        // 1. Receive ETH from Ethereum
        // 2. Execute swap logic on ZetaChain
        // 3. Send native BTC to recipient on Bitcoin
    }
}
```

This single contract can:
- Accept ETH deposits from Ethereum
- Execute swap logic on ZetaChain
- Send native BTC to Bitcoin addresses

## Security model {#security}

ZetaChain's security relies on:

- **Proof-of-stake consensus** - 100+ validators secure the network with economic incentives
- **Chain observers** - Dedicated full nodes monitor all connected chains
- **Threshold signatures** - Multiple validators must sign each cross-chain transaction (Byzantine fault tolerance)
- **Audited contracts** - Protocol contracts audited by leading security firms

### Trust assumptions {#trust-assumptions}

As a **trustless bridge**, ZetaChain:
- ✅ Derives security from validator consensus (same as underlying blockchain)
- ✅ Users maintain control of funds through smart contracts
- ✅ No central entity controls operations
- ⚠️ Requires trusting the validator set's economic incentives

## Gas handling {#gas-handling}

ZetaChain provides flexible options for handling cross-chain gas fees:

### Pay on source chain {#source-chain-payment}

Pay all transaction fees on Ethereum in ETH, ZETA, USDC, or USDT. ZetaChain automatically handles gas payments on destination chains.

### Automatic gas drops {#gas-drops}

Request native tokens on the destination chain. For example:
- Bridge USDC from Ethereum to Solana
- Pay a small fee in USDC
- Receive SOL for gas on Solana

### Custom gas logic {#custom-gas}

Universal Apps can implement custom payment models:
- Charge users in any token
- Subsidize gas for users
- Dynamic gas pricing

## Getting started {#getting-started}

### For users {#for-users}

Use ZetaChain bridge interfaces:
- [ZetaChain Hub](https://hub.zetachain.com/) - Official bridge interface
- [Athens Testnet Explorer](https://athens.explorer.zetachain.com/)
- [Mainnet Explorer](https://zetascan.com/)

### For developers {#for-developers}

Build omnichain applications:

```bash
# Install ZetaChain CLI
npm install -g @zetachain/cli

# Create new project
npx zetachain init my-universal-app
cd my-universal-app

# Deploy to testnet
npx zetachain deploy --network testnet
```

## Resources {#resources}

### Documentation {#documentation}

- [ZetaChain Docs](https://www.zetachain.com/docs/)
- [Architecture Overview](https://www.zetachain.com/docs/developers/architecture/overview)
- [Universal Apps Tutorial](https://www.zetachain.com/docs/developers/tutorials/intro)
- [Cross-Chain Messaging Guide](https://www.zetachain.com/docs/developers/tutorials/messaging)

### Code examples {#code-examples}

- [Example Contracts](https://github.com/zeta-chain/example-contracts)
- [ZetaChain SDK](https://www.zetachain.com/docs/developers/sdk/intro)

### Community {#community}

- [ZetaChain Discord](https://discord.gg/zetachain)
- [GitHub](https://github.com/zeta-chain)
- [Twitter](https://twitter.com/zetablockchain)

## Risks and considerations {#risks}

Like all bridges, ZetaChain has risks to consider:

### Smart contract risk {#smart-contract-risk}

- Bugs in omnichain contracts could cause fund loss
- Multiple chains increase attack surface
- Complexity of cross-chain logic

### Validator risk {#validator-risk}

- Security depends on validator set honesty
- Potential for validator collusion
- Economic incentives must remain strong

### Best practices {#best-practices}

When using ZetaChain:

✅ **Do:**
- Verify gateway addresses from official sources
- Start with small amounts on testnet
- Understand the cross-chain flow
- Monitor transactions on explorers

❌ **Don't:**
- Send to unverified contract addresses
- Skip testnet testing for complex flows
- Assume instant finality across all chains
- Ignore gas requirements on destination chains

## Comparison with other bridges {#comparison}

| Feature | ZetaChain | Traditional Bridges |
|---------|-----------|-------------------|
| Asset bridging | Native tokens | Wrapped tokens |
| Bitcoin support | ✅ Native BTC | ⚠️ Limited/wrapped |
| Cross-chain messaging | ✅ Full support | ❌ Limited |
| Omnichain contracts | ✅ Yes | ❌ No |
| Manual claiming | ❌ Automatic | ⚠️ Often required |
| Trust model | Trustless (validator consensus) | Varies (trusted/trustless) |

## Further reading {#further-reading}

- [ZetaChain Whitepaper](https://www.zetachain.com/whitepaper.pdf)
- [Omnichain Contracts Explained](https://www.zetachain.com/blog/omnichain-contracts)
- [ZetaChain vs Traditional Bridges](https://www.zetachain.com/blog/why-zetachain)
