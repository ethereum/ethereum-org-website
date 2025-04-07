---
title: Ethereum Development Standards
description:
lang: en
incomplete: true
---

## Standards overview {#standards-overview}

The Ethereum community has adopted many standards that help keep projects (such as [Ethereum clients](/developers/docs/nodes-and-clients/) and wallets) interoperable across implementations, and ensure smart contracts and dapps remain composable.

> Standards promote collaboration, reduce redundancy, and simplify integration for developers building on Ethereum.

Typically standards are introduced as [Ethereum Improvement Proposals](/eips/) (EIPs), which are discussed by community members through a [standard process](https://eips.ethereum.org/EIPS/eip-1).

> EIPs serve as a formal documentation mechanism for proposing new features, technical specifications, or process changes.

- [Introduction to EIPs](/eips/)
- [List of EIPs](https://eips.ethereum.org/)
- [EIP GitHub repo](https://github.com/ethereum/EIPs)
- [EIP discussion board](https://ethereum-magicians.org/c/eips)
- [Introduction to Ethereum Governance](/governance/)
- [Ethereum Governance Overview](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _March 31, 2019 - Boris Mann_
- [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _March 23, 2020 - Hudson Jameson_
- [Playlist of all Ethereum Core Dev Meetings](https://www.youtube.com/@EthereumProtocol) _(YouTube Playlist)_

## Types of standards {#types-of-standards}

There are 3 types of EIPs:

- Standards Track: describes any change that affects most or all Ethereum implementations  
  > Includes improvements to the protocol, application-level standards (like token standards), and interface-level upgrades.

- [Meta Track](https://eips.ethereum.org/meta): describes a process surrounding Ethereum or proposes a change to a process  
  > For example, updates to the EIP process itself or the addition of a new working group.

- [Informational Track](https://eips.ethereum.org/informational): describes an Ethereum design issue or provides general guidelines or information to the Ethereum community  
  > These EIPs do not propose new features but help educate and provide reference materials.

Furthermore, the Standard Track is subdivided into 4 categories:

- [Core](https://eips.ethereum.org/core): improvements requiring a consensus fork  
  > These include changes that all nodes must adopt, such as opcodes or gas cost changes.

- [Networking](https://eips.ethereum.org/networking): improvements around devp2p and Light Ethereum Subprotocol, as well as proposed improvements to network protocol specifications of whisper and swarm.  
  > These affect peer discovery, transaction propagation, and data transmission.

- [Interface](https://eips.ethereum.org/interface): improvements around client API/RPC specifications and standards, and certain language-level standards like method names and contract ABIs.  
  > Interface-level EIPs aim to harmonize how applications and tools interact with Ethereum clients.

- [ERC](https://eips.ethereum.org/erc): application-level standards and conventions  
  > These are often the most visible to dApp developers and end-users, defining how tokens and other application-layer components behave.

More detailed information on these different types and categories can be found in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Token standards {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - A standard interface for fungible (interchangeable) tokens, like voting tokens, staking tokens or virtual currencies.  
  > ERC-20 enables token compatibility across exchanges, wallets, and DeFi platforms.

  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - A fungible tokens standard that makes tokens behave identical to ether and supports token transfers handling on the recipients side.  
    > Helps prevent accidental loss of tokens when sent to a contract not designed to handle them.

  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) - Defines a token interface for ERC-20 tokens that supports executing recipient code after transfer or transferFrom, or spender code after approve.  
    > Enables a "pay and execute" pattern, combining token transfer and function call.

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - A standard interface for non-fungible tokens, like a deed for artwork or a song.  
  > Pioneered the NFT space and allows each token to be unique and traceable.

  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - A standardized event emitted when creating/transferring one, or many non-fungible tokens using consecutive token identifiers.  
    > Improves minting efficiency for large NFT collections.

  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Interface extension for EIP-721 consumer role.  
    > Adds consumer-specific capabilities, allowing access without ownership.

  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Add a time-limited role with restricted permissions to ERC-721 tokens.  
    > Enables rental or delegation of NFTs with an expiration time.

- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NOT RECOMMENDED)** A token standard improving over ERC-20.  
  > Adds advanced features like operator control and hooks but faced adoption challenges due to complexity.

- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - A token standard which can contain both fungible and non-fungible assets.  
  > Reduces gas cost and contract complexity by allowing batch operations for multiple token types.

- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - A tokenized vault standard designed to optimize and unify the technical parameters of yield-bearing vaults.  
  > Standardizes how DeFi protocols interact with interest-bearing assets like Yearn or Aave vaults.

Learn more about [token standards](/developers/docs/standards/tokens/).

## Further reading {#further-reading}

- [Ethereum Improvement Proposals (EIPs)](/eips/)

_Know of a community resource that helped you? Edit this page and add it!_
