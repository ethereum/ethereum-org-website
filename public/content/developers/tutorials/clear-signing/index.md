---
title: Add clear signing to your protocol with ERC-7730
description: Learn how to write an ERC-7730 descriptor so your smart contract interactions display human-readable details in wallets before users sign.
author: Hester Bruikman
lang: en
tags: ["ERC-7730", "security", "signing", "smart contracts", "wallets"]
skill: intermediate
breadcrumb: Clear signing
published: 2026-05-11
---

Most major Ethereum exploit has had the same final step: a user approving a transaction they could not meaningfully understand. Hardware wallets show raw hex calldata, and worse force you to have blind signing on. Software wallets show decoded fields, but only when they recognise the contract. When they don't, whether because the protocol is new, the app is compromised, or the device is offline, users sign blind.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) defines a standard JSON format for describing what your contract's function calls *mean*. A wallet that supports ERC-7730 reads your descriptor and shows:

> **Swap**
> Send: 1,000 USDC
> Receive minimum: 0.42 WETH
> Protocol: Uniswap V3

Or a single constructed sentence readable by humans and agents alike:

> Swap 1,000 USDC for at least 0.42 WETH

Instead of a function selector and a list of raw integer values.

This is [clear signing](https://clearsigning.org/) — "What You See Is What You Sign." This tutorial walks you through writing a descriptor for your own contract, validating it with the official CLI tool, and submitting it to the open registry.

## Prerequisites {#prerequisites}

- Familiarity with Solidity and smart contract ABIs  
- A deployed contract with a verified ABI ([Sourcify](https://sourcify.dev) verification is required before a descriptor is accepted to the registry)  
- Python 3.12+ for the validation CLI  
- Basic JSON knowledge

## What is an ERC-7730 descriptor? {#what-is-an-erc-7730-descriptor}

A descriptor is a single JSON file with three sections:

| Section | Purpose |
| :---- | :---- |
| `context` | Binds the descriptor to specific contract deployments by chain ID and address |
| `metadata` | Names the project and defines reusable constants |
| `display` | Maps each function signature to human-readable labels and field formats |

Because the descriptor is separate from the contract itself, you can add clear signing support to any existing protocol without redeployment. Wallets retrieve descriptors from the registry and use them at signing time.

## Step 1: Create the file skeleton {#step-1-create-the-file-skeleton}

Create a file named `calldata-<contractname>-<descriptorversion>.json`. The `calldata-` prefix tells the registry this descriptor covers contract function calls, as opposed to `eip712-` for typed-data messages. The `descriptorversion` tells the registry the version of the descriptor file, by default should be : 0\.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## Step 2: Write the `context` section {#step-2-write-the-context-section}

The `context` section binds the descriptor to one or more contract deployments. Wallets use this to match an incoming transaction to the correct descriptor.

```json
"context": {
  "$id": "this is an internal label - use your project's name",
  "contract": {
    "deployments": [
      { "chainId": 1,   "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

Include every chain where your contract is deployed. 

## Step 3: Write the `metadata` section {#step-3-write-the-metadata-section}

Metadata identifies the project and, for tokens, provides on-chain lookup data wallets may not have cached.

```json
"metadata": {
  "owner": "My Token Project",
  "info": {
    "url": "https://myproject.example",
    "deploymentDate": "2024-01-15T00:00:00Z"
  },
  "contractName": "MyToken",
  "token": {
    "name": "My Token",
    "ticker": "MYT",
    "decimals": 18
  }

}
```

 If your ERC-7730 file describes an ERC-20 contract, you should add a token object too. It contains:

`name`: the token name, equivalent to the ERC-20 name() return value.  
`ticker`: the token symbol/ticker shown by wallets, equivalent to the ERC-20 `symbol()` return value.  
`decimals`: the number of decimal places used to format token amounts, equivalent to the ERC-20 `decimals()` return value.

Do not add `metadata.token` if the contract already supports the ERC-20 `name()`, `symbol()`, and `decimals()` calls

## Step 4: Write the `display.formats` section {#step-4-write-the-displayformats-section}

The `display.formats` object maps function signatures to formatting instructions. **This is what your users will see\!** Each key is the human-readable ABI fragment — the function signature including **both parameter names and types** exactly as they appear in your ABI.

### E.g. Describing `transfer` {#eg-describing-transfer}

```json
"transfer(address to, uint256 value)": {
  "intent": "Send",
  "fields": [
    {
      "path": "#.value",
      "label": "Amount",
      "format": "tokenAmount",
      "params": { "tokenPath": "@.to" }
    },
    {
      "path": "#.to",
      "label": "To",
      "format": "addressName",
      "params": {
        "types": ["eoa"],
        "sources": ["local", "ens"]
      }
    }
  ]
}
```

Breaking this down:

- **`intent`** — A short action label such as `"Send"`. Always include this.  
- **`interpolatedIntent`** — A fuller sentence with `{path}` placeholders that resolve to live field values, such as `"Send {value} to {to}"` → `"Send 100 MYT to alice.eth"`. Include this alongside `intent` so wallets can choose whichever fits their display constraints. If any placeholder fails to resolve, the wallet falls back to `intent`.  
- **`fields`** — The parameters to display, in the order they should appear on screen.  
- **`path`** — A reference to the transaction data. `#.fieldName` points to a decoded calldata parameter by the name in the ABI. `@.value` refers to the ETH value sent with the transaction.  
- **`label`** — The field name shown to the user.  
- **`format`** — How to render the raw value. `tokenAmount` applies decimal conversion and appends the ticker. `addressName` resolves ENS names with a fallback to the checksummed address.  
- **`params.tokenPath`** — Used by `tokenAmount` to look up decimals and the ticker. `@.to` points to the contract being called — correct for an ERC-20 where the contract *is* the token.

**Note:** The signature key must match your ABI exactly. If your ABI uses underscore-prefixed parameter names such as `_to` or `_value`, use those names in the key and reference them as `#._to` and `#._value` in paths. The `erc7730 lint` command will catch mismatches.

### Describing `approve` {#describing-approve}

Token approvals deserve special attention because an unlimited approval is a common attack vector. The `tokenAmount` format accepts a `threshold` parameter: any value at or above that threshold is replaced by a label (defaulting to `"Unlimited"`) instead of a decimal amount, giving users a meaningful signal that they are granting open-ended spend access.

```json
"approve(address spender, uint256 value)": {
  "intent": "Approve",
  "fields": [
    {
      "path": "#.spender",
      "label": "Spender",
      "format": "addressName",
      "params": { "types": ["eoa", "contract"] }
    },
    {
      "path": "#.value",
      "label": "Amount",
      "format": "tokenAmount",
      "params": {
        "tokenPath": "@.to",
        "threshold": "0x8000000000000000000000000000000000000000000000000000000000000000",
        "message": "Unlimited"
      }
    }
  ]
}
```

The wallet displays the result as `"{message} {ticker}"` — for example, `"Unlimited USDT"`. The `message` field is optional and defaults to `"Unlimited"` if omitted.

**Choosing a threshold value.** The ERC-7730 spec does not mandate a specific threshold — the value is yours to set based on what makes sense for your token's realistic supply. The value above (2²⁵⁵) is taken from the USDT descriptor in the registry and has become a common convention: it is high enough that no real token supply would reach it, so any approval at or above it is effectively unlimited. Another common choice is `type(uint256).max` (`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`), which matches the exact value that `SafeERC20.safeApprove` and many dApps pass for infinite approvals. Either is reasonable; the important thing is that the threshold is low enough to catch all practical unlimited-approval patterns used by the protocols integrating with your token.

### Common field formats {#common-field-formats}

| Format | Use case |
| :---- | :---- |
| `tokenAmount` | ERC-20 amounts — applies decimals and appends ticker |
| `amount` | Native ETH value — typically used with path `@.value` |
| `addressName` | Ethereum addresses — resolves ENS if available |
| `date` | Unix timestamps formatted as a human-readable date |
| `raw` | Display the value with no transformation |

## The complete descriptor {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "MyToken",
    "contract": {
      "deployments": [
        { "chainId": 1, "address": "0xYourContractAddress" }
      ]
    }
  },
  "metadata": {
    "owner": "My Token Project",
    "info": { "url": "https://myproject.example" },
    "contractName": "MyToken",
    "token": { "name": "My Token", "ticker": "MYT", "decimals": 18 }
  },
  "display": {
    "formats": {
      "transfer(address to, uint256 value)": {
        "intent": "Send",
        "interpolatedIntent": "Send {value} to {to}",
        "fields": [
          {
            "path": "#.value",
            "label": "Amount",
            "format": "tokenAmount",
            "params": { "tokenPath": "@.to" }
          },
          {
            "path": "#.to",
            "label": "To",
            "format": "addressName",
            "params": { "types": ["eoa"], "sources": ["local", "ens"] }
          }
        ]
      },
      "approve(address spender, uint256 value)": {
        "intent": "Approve",
        "interpolatedIntent": "Approve {spender} to spend {value}",
        "fields": [
          {
            "path": "#.spender",
            "label": "Spender",
            "format": "addressName",
            "params": { "types": ["eoa", "contract"] }
          },
          {
            "path": "#.value",
            "label": "Amount",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "@.to",
              "threshold": "0x8000000000000000000000000000000000000000000000000000000000000000",
              "message": "Unlimited"
            }
          }
        ]
      }
    }
  }
}
```

## Step 5: Submit to the registry {#step-5-submit-to-the-registry}

The [ERC-7730 registry](https://github.com/ethereum/clear-signing-erc7730-registry) is an open repository hosted by the Ethereum Foundation as a neutral steward. Anyone is free to clone and self-host it — wallets independently decide which registry instances they trust.

1. Fork the repository on GitHub  
2. Create a folder at `registry/<your-project-name>/`  
3. Place your file inside it: `registry/myproject/calldata-mytoken.json`  
4. Update the `$schema` field to the relative path used within the repo: `"../../specs/erc7730-v2.schema.json"`  
5. Open a pull request

When you open the PR, CI automatically runs schema validation, checks that function signatures produce valid selectors, confirms the contract address is verified on Sourcify, and flags ABI inconsistencies. The check results appear inline on the PR. Maintainers then review intent descriptions and field labels for accuracy before merging.

**Note:** Your contract must be verified on [Sourcify](https://repo.sourcify.dev) before your PR can be accepted. If it is not yet verified, submit verification there first.

## What happens after merging? {#what-happens-after-merging}

All descriptors in the registry are open to auditors. After your PR is merged, any auditor can review your descriptor and publish a cryptographic attestation (under [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) confirming its accuracy. These attestation signals let wallets apply their own trust policies — a descriptor with multiple independent attestations carries more weight than one without. You can reach the auditor community through [clearsigning.org](https://clearsigning.org).

Wallets choose which registry they will support. Once your descriptor is in the registry, wallets that support ERC-7730 will start fetching it if it is in their registry and will display human-readable data when users interact with your contract. The registry is publicly mirrored and censorship-resistant — wallets decide which sources they trust.

## Further reading {#further-reading}

- [ERC-7730 specification](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 registry](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — tooling, ecosystem status, and governance  
- [Sourcify contract verification](https://sourcify.dev)  
- [Trillion Dollar Security initiative](https://trilliondollarsecurity.org)

