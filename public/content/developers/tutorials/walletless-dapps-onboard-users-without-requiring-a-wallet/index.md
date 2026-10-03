---
title: Walletless dapps: Onboard users without requiring a wallet
description: Learn how to build a walletless dapp experience by embedding a wallet client-side, storing it securely, and presenting a standard wallet interface to the rest of your app.
author: ethereum.org
breadcrumb: Walletless dapps
tags:
  [
    "frontend",
    "wallet",
    "rust",
    "wasm",
  ]
skill: intermediate
---

## Introduction {#introduction}

Some users will not install a wallet extension before they know a dapp is worth using. A walletless onboarding flow lets them try the product first, then graduate to a wallet later.

This tutorial covers a practical approach:

- create a seed phrase and keys in the client
- store the encrypted wallet locally
- present a standard wallet-style interface to the app
- explain the main failure modes and safety tradeoffs

If your app also needs to hide transaction costs, combine this pattern with gasless transactions.

## The tools {#the-tools}

The stack for this tutorial is:

- Vite
- React
- WASM
- Rust

The goal is not to replace wallet infrastructure everywhere. The goal is to give first-time users a low-friction path into the app while keeping the rest of the codebase aligned with a normal wallet integration.

## Getting started {#getting-started}

Start by generating a seed phrase inside the client. From there, derive the keys you need for signing and account management.

Keep the implementation small and explicit:

1. generate the wallet material in the browser
2. encrypt it before storing it
3. keep the decrypted form in memory only as long as needed
4. expose a wallet-like API to the rest of the application

That last step matters because it avoids maintaining two separate application paths.

## User experience {#user-experience}

The safety model should be simple enough for non-technical users to understand.

- explain that the seed phrase is the backup
- warn users not to share it
- make the storage step visible
- prefer browser storage only when the threat model accepts it

The encrypted wallet can be stored client-side, but that only works if the browser and device are trustworthy enough for the use case. If they are not, the app should clearly say so.

## Impersonating a wallet {#impersonating-a-wallet}

Once the wallet is available in the client, present it through the same interface your app would use for a standard extension wallet.

That lets the rest of the application call a familiar wallet surface without knowing whether the provider is an extension or an embedded client-side wallet.

## How this can go wrong {#how-this-can-go-wrong}

Walletless onboarding improves conversion, but it also shifts risk onto the application.

### Insecure browser {#insecure-browser}

If the browser is compromised, the embedded wallet is compromised too.

### User moving to a different device {#user-moving-to-a-different-device}

Local storage does not follow the user to another device unless they restore from backup.

### User forgetting or disclosing the seed phrase {#user-forgetting-or-disclosing-the-seed-phrase}

If the seed phrase is lost, the wallet is lost. If it is shared, the wallet is exposed.

### Impersonating sites {#impersonating-sites}

Users can still be tricked by malicious lookalike sites, so the app should make the origin and trust model clear.

## Conclusion {#conclusion}

Walletless dapps can help users try a product before they commit to installing a wallet. Used carefully, they create a smoother onboarding path while preserving a familiar wallet-shaped API for the rest of the app.
