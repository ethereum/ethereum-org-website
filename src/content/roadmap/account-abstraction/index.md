---
title: Account abstraction
description: An overview of Ethereum's plans t make user-accounts simpler and safer
lang: en
template: staking
emoji: ":money_with_wings:"
image: ../../../assets/staking/leslie-pool.png
alt: Leslie the rhino swimming in the pool.
sidebarDepth: 2
summaryPoints:
  - Learn about upcoming changes to how users interact with Ethereum
  - Read why account abstraction will help users to secure their assets
  - Understand why account abstraction will make Ethereum easier to use
---

Account abstraction allows users to add new logic to their accounts. Today, users interact with Ethereum using "Externally Owned Accounts" (EOAs). These are the only entities that can initiate a transaction or execute functions in smart contracts, and they pay gas fees in ETH whenever those transactions change Ethereum's state. Account abstraction aims to expand the types of entity that can initiate transactions to include smart contracts. This allows users to flexibly program more security and and better user experiences into their accounts.

Account abstraction unlocks many benefits for the user, including:

- no more seed phrases
- define your own flexible security rules
- recover your account if you lose the keys
- share your account security across trusted devices or individuals
- pay someone else's gas, or have someone else pay yours
- easily batch transactions together (e.g. approve and execute a swap in one go)
- more opportunities for dapps and wallet developers to innovate on user experiences
- upgrade the cryptography securing an account when quantum computers arrive

These benefits are not available to today's Ethereum users because accounts are simple public-private key pairs. The security model is simple: if you have the private key you can do _anything_ within the rules of the Ethereum Virtual Machine (EVM); if you do not have the private key you can do _nothing_. This means lost keys are completely unrecoverable and stolen keys give thieves instant access to all the funds in an account. The logic that can be embedded in these accounts is only the validation that is native to the EVM and cannot be customized. Account abstraction is the solution to these problems.

## Beyond seed phrases

Today's accounts are secured using private keys that are calculated from seed phrases. Any person who has access to a seed phrase can easily discover the private key protecting an account and gain access to all the assets it protects. If a private key and seed phrase are lost. they can never be recovered and the assets they control are frozen forever. Securing these seed phrases is awkward, even for expert users and seed phrase phishing is one of the most common ways users get scammed.

Account abstraction will solve this problem by using a smart contract to hold assets and authorize transactions. These smart contracts can then be decorated with custom logic to make them as secure and tailored to the user as possible. Accessing the smart contract does not require a seed phrase or access to a private key. Instead, you can access the account using, for example, a username, password and autheticator app. Then, custom security logic can be built into the wallet itself. A wallet can be instructed to block every transaction unless it is to a trusted address or verified using 2-factor authentication. Alternatively, you might want to separate out types of transactions with different rules, for example low value transactions can be verified on a mobile phone, whereas higher value transactions require verification from multiple authenticated devices.

### Examples of security logic that can be built into a smart contract wallet:

- **Multisig authorization**: You can share authorization credentials across multiple trusted people or devices. Then the contract can be configured so that transactions of more than some preset value require authorization from a certain proportion (e.g. 3/5) of the trusted parties. For example, high value transactions might require approval from both a mobile device and a hardware wallet, or signatures from accounts distributed to trusted family members.
- **Account freezing**: If a device is lost or compromised the account can be locked from another authorized device, protecting the user's assets.
- **Account recovery**: Lost a device or forgotten a password? In the current paradigm this means your assets could be frozen forever. With a smart contract wallet, you can set some pre-approved accounts that can authorize new devices and reset access.
- **Set transaction limits**: specify daily thresholds for how much value can be transferred from the accoutn in a day/week/month. This means if an attacker does gain access to your account they can't drain everything at once and you have opportunities to freeze and reset access.
- **Create whitelists**: only allow transactions to certain addresses that you know to be safe. This means that _even if_ your private key was stolen, the attacker could not send funds to non-whitelisted destination accounts.

## Better user experience

Account abstraction allows for a better overall user experience as well as improved security. The most important reason for this is that it will provide smart contract, wallet and application developers with much mroe freedom to innovate on the user experience in ways that we may not yet be able to anticipate. Some obvious improvements that will come along with account abstraction include bundling of transactions for speed and efficiency. For example, a simple swap should eb a one-click operation but today it requires signing multiple transactions for approving spending of individual tokens before the swap is executed. Accoutn abstraction removes that friction by allowing transaction bundling. Furthermore, the bundled transaction could approve precisely the right value of tokens required fo each transaction and then revoke the approvals after the transaction completes, providing additional security.

Gas management is also much improved with accoutn abstraction. Not only can applications offer to pay their users' gas fees, but gas fees can be paid in tokens other than ETH, freeing users from having to maintain an ETH balance for funding transactions. This would work by swapping the user's tokens for ETH inside the contract and then using the ETH to pay for gas.

Trusted sessions are also potentially transformative for user experiences, especially for applications like gaming where large numbers of small transactions might need to be approved in a small amount of time. Individually approving each transaction would break the gaming experience, but permanent approval is unsafe. Therefore, the wallet could approve certain transactions for a fixed time, possibly also up to a certain value or only to certain addresses.

It is also interesting to consider how purchases could change with account abstraction. Today, each transaction has to be approved and executed from a wallet prefunded with a sufficient amount of the correct token. With account absraction the experience could be more like familiar online shopping where a user could fill a "basket" with items and click once to purchase all at once, with all the logic required handled by the contract, not the user.

These are just a few examples of how user experiences could be levelled up by account abstraction, but there will be many more that we haven't imagined yet. Account abstraction frees developers from the constraints of present-day EOAs, allows them to bring the good aspects of web2 into web3 without sacrificing self-custody and to hack creatively on inventive new user experiences.

## How will account abstraction be implemented?

EIP-4337: first step, no changes to protocol
shared mempool for contract wallet
no need to keep additional EOA to access a smart contract wallet
separate validation freom execution
efficient batchign and aggregation
dead man's switch and succession plan
