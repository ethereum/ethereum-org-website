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

Most major Ethereum exploits have had the same final step: a user approving a transaction they could not meaningfully understand. Hardware wallets show raw hex calldata, and worse force you to have blind signing on. Software wallets show decoded fields, but only when they recognise the contract. When they don't, whether because the protocol is new, the app is compromised, or the device is offline, users sign blind.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) defines a standard JSON format for describing what your contract's function calls *mean*. 

A wallet that supports ERC-7730 reads your descriptor and shows:

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

Create a file named `calldata-<contractname>-<descriptorversion>.json`. The `calldata-` prefix tells the registry this descriptor covers contract function calls, as opposed to `eip712-` for typed-data messages. The `descriptorversion` tells the registry the version of the descriptor file, 0 by default if no version is provided.


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

## Step 2: Write the context section {#step-2-write-the-context-section}

The `context` section binds the descriptor to one or more contract deployments. Wallets use this to match an incoming transaction to the correct descriptor.

```json
"context": { 
   "$id": "uniswap-v3-router-mainnet", 
   "contract": { "deployments": [ { 
   "chainId": 1, "address": "0xYourContractAddressOnMainnet" }, 
   { "chainId": 137, "address": "0xYourContractAddressOnPolygon" } 
    ] 
   }
}
```

### Context fields {#context-fields}

- `context.$id`: A unique identifier for this descriptor document or deployment configuration.
- `contract.deployments`: The set of deployments this descriptor applies to.
- `deployments[].chainId`: The EVM chain ID for a deployment. Include every chain where your contract is deployed.
- `deployments[].address`: The contract address wallets should associate with this descriptor. Use the implementation address that holds the execution logic.

## Step 3: Write the metadata section {#step-3-write-the-metadata-section}

The metadata section provides human-readable information about the project and contract described by this file. Wallets may use this information to display protocol names, links, and other contextual details during signing.

```json
"metadata": { 
   "owner": "Example Swap Protocol", 
   "info": { "url": "https://example.xyz", 
}, 
"contractName": "SwapRouter" 
}
```

### Metadata fields {#metadata-fields}

- `owner`: The project, protocol, organization, or maintainer responsible for this descriptor.
- `info.url`: A canonical project or documentation URL wallets may display to users for additional context.
- `contractName`: The contract or implementation name described by this file, typically matching the verified source code or ABI.

If your ERC-7730 file describes an ERC-20 contract, you should add a token object too. It contains:

- `name`: the token name, equivalent to the ERC-20 `name()` return value.
- `ticker`: the token symbol/ticker shown by wallets, equivalent to the ERC-20 `symbol()` return value.
- `decimals`: the number of decimal places used to format token amounts, equivalent to the ERC-20 `decimals()` return value.

## Step 4: Write the display formats section {#step-4-write-the-displayformats-section}

The `display.formats` object maps function signatures to human-readable signing instructions. This is how wallets show your function to users before they approve a transaction!

Each key is a human-readable ABI fragment — the function signature including both parameter names and parameter types exactly as they appear in your ABI.


### E.g. Describing a token swap {#eg-describing-token-swap}

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}

```

### Display fields {#display-fields}

- **`intent`** — **(required)** A short, user-friendly description of the action, such as "Swap".
- **`interpolatedIntent`** — **(recommended)** A richer sentence template that embeds formatted field values, such as `"Swap {amountIn} for at least {amountOutMin}"`. Include this alongside `intent` to provide an even more user friendly descriptor that wallets can choose to show provided any display constraints.
- **`fields`** — **(required)** The ordered list of transaction fields wallets should display to users.
- **`path`** — **(required)** A reference to the transaction data. `#.fieldName` points to a decoded calldata parameter by the name in the ABI. `@.value` refers to the ETH value sent with the transaction.
- **`label`** — **(required)** The human-readable label shown beside the value.
- **`format`** — **(recommended)** Controls how the value should be rendered. Common formats include:
  - `tokenAmount`
  - `addressName`
  - `date`

  Use `raw` when no additional formatting is needed. Some formats accept additional **`params`** configuration. For example:

- `tokenAmount` can use `tokenPath` to identify which token address provides decimals and ticker metadata.
- `date` can use `encoding` to describe how the timestamp is encoded.

  If the selected format does not require extra information, omit `params`.

## The complete descriptor {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
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
3. Place your file inside it: `registry/myproject/calldata-mycontract-0_0.json`  
4. Update the `$schema` field to the relative path used within the repo: `"../../specs/erc7730-v2.schema.json"`  
5. Open a pull request

When you open the PR, CI automatically runs schema validation, checks that function signatures produce valid selectors, confirms the contract address is verified on Sourcify, and flags ABI inconsistencies. The check results appear inline on the PR. Registry maintainers screen submissions for malformed or potentially malicious descriptors. Inclusion in the registry does not imply audit or endorsement.

**Note:** Your contract must be verified on [Sourcify](https://repo.sourcify.dev) before your PR can be accepted. If it is not yet verified, [submit verification](https://verify.sourcify.dev/) first.

## What happens after merging? {#what-happens-after-merging}

All descriptors in the registry are open to auditors. After your PR is merged, any auditor can review your descriptor and publish a cryptographic attestation (under [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)) confirming its accuracy. These attestation signals let wallets apply their own trust policies — a descriptor with multiple independent attestations carries more weight than one without. You can reach the auditor community through [clearsigning.org](https://clearsigning.org).

Wallets choose which registry they will support. Once your descriptor is in the registry, wallets that support ERC-7730 will start fetching it if it is in their registry and will display human-readable data when users interact with your contract.

## Further reading {#further-reading}

- [ERC-7730 specification](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 registry](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — tooling, ecosystem status, and governance  
- [Sourcify contract verification](https://sourcify.dev)  
- [Trillion Dollar Security initiative](https://trilliondollarsecurity.org)

