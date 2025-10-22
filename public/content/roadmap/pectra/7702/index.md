---
title: Pectra 7702 guidelines
description: Learn more about 7702 in the Pectra release
lang: en
---

# Pectra 7702

## Abstract {#abstract}

EIP 7702 defines a mechanism to add code to an EOA. This proposal allows EOAs, the legacy Ethereum accounts, to receive short-term functionality improvements, increasing the usability of applications. This is done by setting a pointer to already deployed code using a new transaction type: 4.

This new transaction type introduces an authorization list. Each authorization tuple in the list is defined as

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** is the delegation (already deployed bytecode that'll be used by the EOA)
**chain_id** locks the authorization to a specific chain (or 0 for all chains)
**nonce** locks the authorization to a specific account nonce
(**y_parity, r, s**) is the signature of the authorization tuple, defined as keccak(0x05 || rlp ([chain_id ,address, nonce])) by the private key of EOA to which the authorization applies (also called the authority)

A delegation can be reset by delegating to the null address.

The private key of the EOA retains full control over the account after the delegation. For example delegating to a Safe doesn't make the account a multisig because there's still a single key that can bypass any signing policy. Going forward, developers should design with the assumption that any participant in the system could be a smart contract. For smart contract developers, it’s no longer safe to assume that `tx.origin` refers to an EOA.

## Best practices {#best-practices}

**Account Abstraction**: A delegation contract should align with Ethereum’s broader account abstraction (AA) standards to maximize compatibility. In particular, it should ideally be ERC-4337 compliant or compatible.

**Permissionless and Censorship-Resistant Design**: Ethereum values permissionless participation. A delegation contract MUST NOT hard-code or rely on any single “trusted” relayer or service. This would brick the account if the relayer goes offline. Features like batching (e.g., approve+transferFrom) can be used by the EOA itself without a relayer. For application developers that want to use advanced features enabled by 7702 (Gas Abstraction, Privacy-Preserving Withdrawals) you’ll need a relayer. While there are different relayer architectures, our recommendation is to use [4337 bundlers](https://www.erc4337.io/bundlers) pointing at least [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) because:

- They provide standardized interfaces for relaying
- Include built-in paymaster systems
- Ensure forward compatibility
- Can support censorship resistance through a [public mempool](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Can require the init function to only be called from [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

In other words, anyone should be able to act as the transaction sponsor/relayer as long as they provide the required valid signature or UserOperation from the account. This ensures censorship resistance: if no custom infrastructure is required, a user’s transactions cannot be arbitrarily blocked by a gatekeeping relay. For example, [MetaMask’s Delegation Toolkit](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) explicitly works with any ERC-4337 bundler or paymaster on any chain, rather than requiring a MetaMask-specific server.

**dApps Integration via Wallet Interfaces**:

Given that wallets will whitelist specific delegation contracts for EIP-7702, dApps should not expect to directly request 7702 authorizations. Instead, integration should occur through standardized wallet interfaces:

- **ERC-5792 (`wallet_sendCalls`)**: Enables dApps to request wallets to execute batched calls, facilitating functionalities like transaction batching and gas abstraction.

- **ERC-6900**: Allows dApps to leverage modular smart account capabilities, such as session keys and account recovery, through wallet-managed modules.

By utilizing these interfaces, dApps can access smart account functionalities provided by EIP-7702 without directly managing delegations, ensuring compatibility and security across different wallet implementations.

> Note: There is no standardized method for dApps to request 7702 authorization signatures directly. DApps must rely on specific wallet interfaces like ERC-6900 to take advantage of EIP-7702 features.

For more information:

- [ERC-5792 specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Avoiding Vendor Lock-In**: In line with the above, a good implementation is vendor-neutral and interoperable. This often means adhering to emerging standards for smart accounts. For instance, [Alchemy’s Modular Account](https://github.com/alchemyplatform/modular-account) uses the ERC-6900 standard for modular smart accounts and is designed with “permissionless interoperable usage” in mind.

**Privacy Preservation**: While onchain privacy is limited, a delegation contract should strive to minimize data exposure and linkability. This can be achieved by supporting features like gas payments in ERC-20 tokens (so users need not maintain a public ETH balance, which improves privacy and UX) and one-time session keys (which reduce reliance on a single long-term key). For example, EIP-7702 enables paying gas in tokens via sponsored transactions, and a good implementation will make it easy to integrate such paymasters without leaking more information than necessary. Additionally, off-chain delegation of certain approvals (using signatures that are verified onchain) means fewer onchain transactions with the user’s primary key, aiding privacy. Accounts that require using a relayer force users to reveal their IP addresses. PublicMempools improves this, when a transaction/UserOp propagates through the mempool you can't tell whether it originated from the IP that sent it, or just relayed through it via the p2p protocol.

**Extensibility and Modular Security**: Account implementations should be extensible so they can evolve with new features and security improvements. Upgradability is inherently possible with EIP-7702 (since an EOA can always delegate to a new contract in the future to upgrade its logic). Beyond upgradability, a good design allows modularity – e.g., plug-in modules for different signature schemes or spending policies – without needing to redeploy entirely. Alchemy’s Account Kit is a prime example, allowing developers to install validation modules (for different signature types like ECDSA, BLS, etc.) and execution modules for custom logic. To achieve greater flexibility and security in EIP-7702-enabled accounts, developers are encouraged to delegate to a proxy contract rather than directly to a specific implementation. This approach allows for seamless upgrades and modularity without requiring additional EIP-7702 authorizations for each change.

Benefits of the Proxy Pattern:

- **Upgradability**: Update the contract logic by pointing the proxy to a new implementation contract.

- **Custom Initialization Logic**: Incorporate initialization functions within the proxy to set up necessary state variables securely.

For instance, the [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) demonstrates how a proxy can be utilized to securely initialize and manage delegations in EIP-7702-compatible accounts.

Cons of the Proxy Pattern:

- **Reliance on external actors**: You have to rely on an external team to not upgrade to an unsafe contract.

## Security Considerations {#security-considerations}

**Reentrancy guard**: With the introduction of EIP-7702 delegation, a user’s account can dynamically switch between an Externally Owned Account (EOA) and a Smart Contract (SC). This flexibility enables the account to both initiate transactions and be the target of calls. As a result, scenarios where an account calls itself and makes external calls will have `msg.sender` equal to `tx.origin`, which undermines certain security assumptions that previously relied on `tx.origin` always being an EOA.

For smart contract developers, it's no longer safe to assume that `tx.origin` refers to an EOA. Likewise, using `msg.sender == tx.origin` as a safeguard against reentrancy attacks is no longer a reliable strategy.

Going forward, developers should design with the assumption that any participant in the system could be a smart contract. Alternatively they could implement explicit reentrancy protection using reentrancy guards with a `nonReentrant` modifier patterns. We recommend following an audited modifier e.g [Open Zeppelin's Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). They could also use a [transient storage variable](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Initialization Security Considerations**

Implementing EIP-7702 delegation contracts introduces specific security challenges, particularly concerning the initialization process. A critical vulnerability arises when the initialization function (`init`) is atomically coupled with the delegation process. In such cases, a frontrunner could intercept the delegation signature and execute the `init` function with altered parameters, potentially taking control of the account.

This risk is especially pertinent when attempting to use existing Smart Contract Account (SCA) implementations with EIP-7702 without modifying their initialization mechanisms.

**Solutions to Mitigate Initialization Vulnerabilities**

- Implement `initWithSig`  
  Replace the standard `init` function with an `initWithSig` function that requires the user to sign the initialization parameters. This approach ensures that the initialization can only proceed with explicit user consent, thereby mitigating unauthorized initialization risks.

- Utilize ERC-4337's EntryPoint  
  Require that the initialization function be called exclusively from the ERC-4337 EntryPoint contract. This method leverages the standardized validation and execution framework provided by ERC-4337, adding an additional layer of security to the initialization process.  
  _(See: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

By adopting these solutions, developers can enhance the security of EIP-7702 delegation contracts, safeguarding against potential frontrunning attacks during the initialization phase.

**Storage Collisions** Delegating code does not clear existing storage. When migrating from one delegation contract to another, the residual data from the previous contract remains. If the new contract utilizes the same storage slots but interprets them differently, it can cause unintended behavior. For instance, if the initial delegation was to a contract where a storage slot represents a `bool`, and the subsequent delegation is to a contract where the same slot represents a `uint`, the mismatch can lead to unpredictable outcomes.

**Phishing risks** With the implementation of EIP-7702 delegation, the assets in a user's account may be entirely controlled by smart contracts. If a user unknowingly delegates their account to a malicious contract, an attacker could easily gain control and steal funds. When using `chain_id=0` the delegation is applied to all chain ids. Only delegate to an immutable contract (never delegate to a proxy), and only to contracts that were deployed using CREATE2 (with standard initcode - no metamorphic contracts) so the deployer can't deploy something different to the same address elsewhere. Otherwise your delegation puts your account at risk on all other EVM chains.

When users perform delegated signatures, the target contract receiving the delegation should be clearly and prominently displayed to help mitigate phishing risks.

**Minimal Trusted Surface & Security**: While offering flexibility, a delegation contract should keep its core logic minimal and auditable. The contract is effectively an extension of the user’s EOA, so any flaw can be catastrophic. Implementations should follow best practices from the smart contract security community. For instance, constructor or initializer functions must be carefully secured – as highlighted by Alchemy, if using a proxy pattern under 7702, an unprotected initializer could let an attacker take over the account. Teams should aim to keep the onchain code simple: Ambire’s 7702 contract is only ~200 lines of Solidity, deliberately minimizing complexity to reduce bugs. A balance must be struck between feature-rich logic and the simplicity that eases auditing.

### Known implementations {#known-implementations}

Due to the nature of EIP 7702, it is recommended wallets use caution when helping users delegate to a 3rd party contract. Listed below is a collection of known implementations that have been audited:

| Contract address                           | Source                                                                                                                                     | Audits                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audits](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Foundation AA team](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Hardware wallet guidelines {#hardware-wallet-guidelines}

Hardware wallets shouldn't expose arbitrary delegation. The consensus in the Hardware wallet space is to use a list of trusted delegator contracts. We suggest to allow known implementations listed above and to consider others on a case by case basis. As delegating your EOA to a contract gives control over all the assets, hardware wallets should be cautious with the way they implement 7702.

### Integration scenarios for companion apps {#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

As the EOA still operates as usual, there's nothing to do.

Note : some assets could be automatically rejected by the delegation code, such as ERC 1155 NFTs, and support should be aware of it.

#### Aware {#aware}

Notify the user that a delegation is in place for the EOA by checking its code, and optionally offer to remove the delegation.

#### Common delegation {#common-delegation}

Hardware provider whitelists known delegation contracts and implements their support in software companion. It is recommended to choose a contract with full ERC 4337 support.

EOAs delegated to a different one will be handled as standard EOAs.

#### Custom delegation {#custom-delegation}

Hardware provider implements its own delegation contract and adds it to the lists implements its support in softaware companion. It is recommended to build a contract with full ERC 4337 support.

EOAs delegated to a different one will be handled as standard EOAs.
