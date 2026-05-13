---
title: 使用 ERC-7730 为你的协议添加明文签名
description: 了解如何编写 ERC-7730 描述符，以便在用户签名前，你的智能合约交互能在钱包中显示人类可读的详细信息。
author: 海斯特·布鲁克曼
lang: zh
tags: ["ERC-7730", "安全", "签名", "智能合约", "钱包"]
skill: intermediate
breadcrumb: 明文签名
published: 2026-05-11
---

大多数重大的以太坊漏洞利用都有相同的最后一步：用户授权了一笔他们无法真正理解的交易。硬件钱包显示原始的十六进制调用数据，更糟糕的是，它们迫使你开启盲签。软件钱包会显示解码后的字段，但前提是它们能识别该合约。当它们无法识别时（无论是因为协议是新的、应用程序被攻破，还是设备离线），用户只能盲签。

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) 定义了一种标准的 JSON 格式，用于描述你的合约函数调用的*含义*。

支持 ERC-7730 的钱包会读取你的描述符并显示：

> **兑换**  
> 发送：1,000 USDC  
> 最低接收：0.42 WETH  
> 协议：尤尼斯瓦普 V3 (Uniswap V3)

或者是一句人类和代理都能读懂的完整句子：

> 将 1,000 USDC 兑换为至少 0.42 WETH

而不是一个函数选择器和一堆原始整数值。

这就是[明文签名](https://clearsigning.org/)——“所见即所签”。本教程将引导你为自己的合约编写描述符，使用官方 CLI 工具进行验证，并将其提交到开放注册表。

## 前提条件 {#prerequisites}

- 熟悉 Solidity 和智能合约 ABI
- 一个已部署且具有已验证 ABI 的智能合约（在描述符被注册表接受之前，需要进行 [Sourcify](https://sourcify.dev) 验证） 
- 用于验证 CLI 的 Python 3.12+ 
- 基本的 JSON 知识

## 什么是 ERC-7730 描述符？ {#what-is-an-erc-7730-descriptor}

描述符是一个包含三个部分的单一 JSON 文件：

| 部分 | 目的 |
| :---- | :---- |
| `context` | 通过链 ID 和地址将描述符绑定到特定的合约部署 |
| `metadata` | 命名项目并定义可重用的常量 |
| `display` | 将每个函数签名映射到人类可读的标签和字段格式 |

由于描述符与合约本身是分离的，你可以为任何现有协议添加明文签名支持，而无需重新部署。钱包从注册表中检索描述符，并在签名时使用它们。

## 第 1 步：创建文件骨架 {#step-1-create-the-file-skeleton}

创建一个名为 `calldata-<contractname>-<descriptorversion>.json` 的文件。`calldata-` 前缀告诉注册表此描述符涵盖合约函数调用，而不是用于类型化数据消息的 `eip712-`。`descriptorversion` 告诉注册表描述符文件的版本，如果未提供版本，则默认为 0。


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

## 第 2 步：编写上下文部分 {#step-2-write-the-context-section}

`context` 部分将描述符绑定到一个或多个合约部署。钱包使用它来将传入的交易与正确的描述符进行匹配。

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### 上下文字段 {#context-fields}

- `context.$id` — 此描述符文档或部署配置的唯一标识符。
- `contract.deployments` — 此描述符适用的部署集合。
- `deployments[].chainId` — 部署的 EVM 链 ID。包括你的合约部署的每条链。
- `deployments[].address` — 钱包应与此描述符关联的合约地址。使用包含执行逻辑的实现地址。

## 第 3 步：编写元数据部分 {#step-3-write-the-metadata-section}

元数据部分提供有关此文件描述的项目和合约的人类可读信息。钱包可能会在签名期间使用此信息来显示协议名称、链接和其他上下文详细信息。

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### 元数据字段 {#metadata-fields}

- `owner` — 负责此描述符的项目、协议、组织或维护者。
- `info.url` — 钱包可能向用户显示的规范项目或文档 URL，以提供额外的上下文。
- `contractName` — 此文件描述的合约或实现名称，通常与已验证的源代码或 ABI 匹配。

如果你的 ERC-7730 文件描述的是一个 ERC-20 合约，你也应该添加一个代币对象。 

## 第 4 步：编写显示格式部分 {#step-4-write-the-displayformats-section}

`display.formats` 对象将函数签名映射到人类可读的签名指令。这就是钱包在用户授权交易之前向用户显示你的函数的方式！

每个键都是一个人类可读的 ABI 片段——包含参数名称和参数类型的函数签名，与它们在你的 ABI 中出现的方式完全一致。


### 示例：描述代币兑换 {#eg-describing-token-swap}

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

### 显示字段 {#display-fields}

- **`intent`** — **（必填）** 操作的简短、用户友好的描述，例如“兑换”。
- **`interpolatedIntent`** — **（推荐）** 嵌入格式化字段值的更丰富的句子模板，例如 `"Swap {amountIn} for at least {amountOutMin}"`。将其与 `intent` 一起包含，以提供更用户友好的描述符，钱包可以根据任何显示限制选择显示。
- **`fields`** — **（必填）** 钱包应向用户显示的交易字段的有序列表。
  - **`path`** — **（必填）** 对交易数据的引用。`#.fieldName` 指向按 ABI 中名称解码的调用数据参数。`@.value` 指随交易发送的 ETH 值。
  - **`label`** — **（必填）** 显示在值旁边的人类可读标签。
  - **`format`** — **（推荐）** 控制应如何渲染该值。常见格式包括：
    - `tokenAmount`
    - `addressName`
    - `date`

    当不需要额外的格式化时，使用 `raw`。某些格式接受额外的 **`params`** 配置。例如：

    - `tokenAmount` 可以使用 `tokenPath` 来识别哪个代币地址提供小数位数和代码元数据。
    - `date` 可以使用 `encoding` 来描述时间戳的编码方式。

    如果所选格式不需要额外信息，请省略 `params`。

## 完整的描述符 {#the-complete-descriptor}

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

## 第 5 步：提交到注册表 {#step-5-submit-to-the-registry}

[ERC-7730 注册表](https://github.com/ethereum/clear-signing-erc7730-registry)是一个由[以太坊基金会](/foundation/)作为中立管理者托管的开放存储库。任何人都可以自由克隆并自行托管它——钱包独立决定它们信任哪些注册表实例。

1. 在 GitHub 上复刻 (Fork) 该存储库  
2. 在 `registry/<your-project-name>/` 处创建一个文件夹  
3. 将你的文件放入其中：`registry/myproject/calldata-mycontract-0_0.json`  
4. 将 `$schema` 字段更新为存储库中使用的相对路径：`"../../specs/erc7730-v2.schema.json"`  
5. 开启一个拉取请求 (Pull request)

当你开启 PR 时，CI 会自动运行模式验证，检查函数签名是否生成有效的选择器，确认合约地址已在 Sourcify 上验证，并标记 ABI 不一致之处。检查结果会内联显示在 PR 上。注册表维护者会筛选提交的内容，以查找格式错误或潜在恶意的描述符。包含在注册表中并不意味着经过审计或认可。

<Alert variant="info">
<AlertContent>
<AlertDescription>
**注意：** 你的合约必须在 <a href="https://repo.sourcify.dev">Sourcify</a> 上验证后，你的 PR 才能被接受。如果尚未验证，请先<a href="https://verify.sourcify.dev/">提交验证</a>。
</AlertDescription>
</AlertContent>
</Alert>

## 合并后会发生什么？ {#what-happens-after-merging}

注册表中的所有描述符都对审计员开放。在你的 PR 合并后，任何审计员都可以审查你的描述符并发布加密证明（根据 [ERC-8176](https://github.com/ethereum/ERCs/pull/1576)）以确认其准确性。 

这些证明信号让钱包能够应用自己的信任策略——具有多个独立证明的描述符比没有证明的描述符更有分量。你可以通过 [clearsigning.org](https://clearsigning.org) 联系审计员社区。

钱包选择它们将支持的注册表。一旦你的描述符进入注册表，支持 ERC-7730 的钱包如果其注册表中包含该描述符，就会开始获取它，并在用户与你的合约交互时显示人类可读的数据。

## 延伸阅读 {#further-reading}

- [ERC-7730 规范](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 注册表](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — 工具、生态系统状态和治理  
- [Sourcify 合约验证](https://sourcify.dev)  
- [万亿美元安全倡议 (Trillion Dollar Security initiative)](https://trilliondollarsecurity.org)