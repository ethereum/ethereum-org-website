---
title: Token integration checklist
description: A checklist of things to consider when interacting with tokens
author: "Trailofbits"
lang: en
tags: ["solidity", "smart contracts", "security", "tokens"]
skill: intermediate
breadcrumb: Token integration
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Follow this checklist when interacting with arbitrary tokens. Make sure you understand the risks associated with each item, and justify any exceptions to these rules.

For convenience, all Slither [utilities](https://github.com/crytic/slither#tools) can be run directly on a token address, such as:

[Using Slither tutorial](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Fetching verified source code from Etherscan requires an [Etherscan API key](https://docs.etherscan.io/set-up-your-api-key) (a free key works). Pass it with `--etherscan-apikey`, or set the `ETHERSCAN_API_KEY` environment variable, which Slither also reads:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Without a key, the command fails with an `Invalid etherscan API Key` error.

To follow this checklist, you'll want to have this output from Slither for the token:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # requires configuration, and use of Echidna
```

## General considerations {#general-considerations}

- **The contract has a security review.** Avoid interacting with contracts that lack a security review. Check the length of the assessment (aka “level of effort”), the reputation of the security firm, and the number and severity of the findings.
- **You have contacted the developers.** You may need to alert their team to an incident. Look for appropriate contacts on [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **They have a security mailing list for critical announcements.** Their team should advise users (like you!) when critical issues are found or when upgrades occur.

## ERC conformity {#erc-conformity}

Slither includes a utility, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), that reviews the conformance of a token to many related ERC standards. Use slither-check-erc to review that:

- **Transfer and transferFrom return a boolean.** Several tokens do not return a boolean on these functions. As a result, their calls in the contract might fail.
- **The name, decimals, and symbol functions are present if used.** These functions are optional in the ERC20 standard and might not be present.
- **Decimals returns a uint8.** Several tokens incorrectly return a uint256. If this is the case, ensure the value returned is below 255.
- **The token mitigates the known [ERC20 race condition](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** The ERC20 standard has a known ERC20 race condition that must be mitigated to prevent attackers from stealing tokens.
- **The token is not an ERC777 token and has no external function call in transfer and transferFrom.** External calls in the transfer functions can lead to reentrancies.

Slither includes a utility, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), that generates unit tests and security properties that can discover many common ERC flaws. Use slither-prop to review that:

- **The contract passes all unit tests and security properties from slither-prop.** Run the generated unit tests, then check the properties with [Echidna](https://github.com/crytic/echidna).

Finally, there are certain characteristics that are difficult to identify automatically. Review for these conditions by hand:

- **Transfer and transferFrom should not take a fee.** Deflationary tokens can lead to unexpected behavior.
- **Potential interest earned from the token is taken into account.** Some tokens distribute interest to token holders. This interest might be trapped in the contract if not taken into account.

## Contract composition {#contract-composition}

- **The contract avoids unneeded complexity.** The token should be a simple contract; a token with complex code requires a higher standard of review. Use Slither’s [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) to identify complex code.
- **The contract uses checked arithmetic.** Solidity 0.8 and later revert on overflow and underflow by default; older contracts need SafeMath for the same protection. Contracts compiled with older versions without SafeMath, or that use `unchecked` blocks, require a higher standard of review. Inspect arithmetic by hand, especially inside `unchecked` blocks and inline assembly.
- **The contract has only a few non–token-related functions.** Non–token-related functions increase the likelihood of an issue in the contract. Use Slither’s [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) to broadly review the code used in the contract.
- **The token only has one address.** Tokens with multiple entry points for balance updates can break internal bookkeeping based on the address (e.g., `balances[token_address][msg.sender]` might not reflect the actual balance).

## Owner privileges {#owner-privileges}

- **The token is not upgradeable.** Upgradeable contracts might change their rules over time. Use Slither’s [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) to determine if the contract is upgradeable.
- **The owner has limited minting capabilities.** Malicious or compromised owners can abuse minting capabilities. Use Slither’s [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) to review minting capabilities, and consider manually reviewing the code.
- **The token is not pausable.** Malicious or compromised owners can trap contracts relying on pausable tokens. Identify pauseable code by hand.
- **The owner cannot blacklist the contract.** Malicious or compromised owners can trap contracts relying on tokens with a blacklist. Identify blacklisting features by hand.
- **The team behind the token is known and can be held responsible for abuse.** Contracts with anonymous development teams, or that reside in legal shelters should require a higher standard of review.

## Token scarcity {#token-scarcity}

Reviews for issues of token scarcity requires manual review. Check for these conditions:

- **No user owns most of the supply.** If a few users own most of the tokens, they can influence operations based on the token's repartition.
- **The total supply is sufficient.** Tokens with a low total supply can be easily manipulated.
- **The tokens are located in more than a few exchanges.** If all the tokens are in one exchange, a compromise of the exchange can compromise the contract relying on the token.
- **Users understand the associated risks of large funds or flash loans.** Contracts relying on the token balance must carefully take in consideration attackers with large funds or attacks through flash loans.
- **The token does not allow flash minting**. Flash minting can lead to substantial swings in the balance and the total supply, which necessitate strict and comprehensive overflow checks in the operation of the token.

## Known non-standard ERC20 tokens {#known-non-standard-erc20-tokens}

Protocols that allow integration with arbitrary tokens must take care to properly handle certain well-known non-standard ERC20 tokens. Refer to the [non-standard tokens list](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) for well-known tokens that carry additional risks.

## ERC721 tokens {#erc721-tokens}

### ERC721 conformity checks {#erc721-conformity-checks}

The behavior of certain contracts may differ from the original ERC specification. Review the following conditions manually:

- **Transfers of tokens to the 0x0 address revert.** Some tokens allow transfers to 0x0 and consider tokens sent to that address to have been burned; however, the ERC721 standard requires that such transfers revert.
- **`safeTransferFrom` functions are implemented with the correct signature.** Some token contracts do not implement these functions. Transferring NFTs to one of those contracts can result in a loss of assets.
- **The `name`, `decimals`, and `symbol` functions are present if used.** These functions are optional in the ERC721 standard and may not be present.
- **If used, `decimals` returns a `uint8(0)`.** Other values are invalid.
- **The `name` and `symbol` functions can return an empty string.** This behavior is allowed by the standard.
- **The `ownerOf` function reverts if the `tokenId` is invalid or refers to a token that has already been burned.** The function cannot return 0x0. This behavior is required by the standard but may not always be implemented correctly.
- **A transfer of an NFT clears its approvals.** This is required by the standard.
- **The token ID of an NFT cannot be changed during its lifetime.** This is required by the standard.

### Common risks of the ERC721 standard {#common-risks-of-the-erc721-standard}

Mitigate the risks associated with ERC721 contracts by conducting a manual review of the following conditions:

- **The `onERC721Received` callback is taken into account.** External calls in the transfer functions can lead to reentrancies, especially when the callback is not explicit (e.g., in [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code) calls).
- **When an NFT is minted, it is safely transferred to a smart contract.** If a minting function exists, it should behave similarly to `safeTransferFrom` and handle the minting of new tokens to a smart contract properly, preventing asset loss.
- **Burning a token clears its approvals.** If a burning function exists, it should clear the token’s previous approvals.
