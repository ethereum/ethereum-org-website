---
title: "透過 ERC-7730 為您的協定加入清晰簽署"
description: "了解如何撰寫 ERC-7730 描述檔，讓您的智能合約互動在使用者簽署前，於錢包中顯示人類可讀的詳細資訊。"
author: "赫斯特·布魯克曼"
lang: zh-tw
tags:
  - ERC-7730
  - 安全性
  - 簽署
  - 智能合約
  - 錢包
skill: intermediate
breadcrumb: "清晰簽署"
published: 2026-05-11
---

大多數重大的以太坊漏洞利用都有相同的最後一步：使用者授權了一筆他們無法真正理解的交易。硬體錢包顯示原始的十六進位呼叫資料，更糟的是強迫您開啟盲簽 (blind signing)。軟體錢包會顯示解碼後的欄位，但前提是它們認得該合約。當它們不認得時，無論是因為協定是新的、應用程式遭到入侵，還是裝置處於離線狀態，使用者都只能盲簽。

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) 定義了一種標準的 JSON 格式，用於描述您的合約函式呼叫的*意義*。

支援 ERC-7730 的錢包會讀取您的描述檔並顯示：

> **兌換 (Swap)**  
> 發送：1,000 USDC  
> 最低接收：0.42 WETH  
> 協定：Uniswap V2

或者是一句人類和代理程式都能讀懂的完整句子：

> 將 1,000 USDC 兌換為至少 0.42 WETH

而不是一個函式選擇器 (function selector) 和一串原始整數值。

這就是[清晰簽署 (clear signing)](https://clearsigning.org/)——「所見即所簽 (What You See Is What You Sign)」。本教學將引導您為自己的合約撰寫描述檔、使用官方 CLI 工具進行驗證，並將其提交到開放的註冊表。

## 先決條件 {#prerequisites}

- 熟悉 Solidity 與智能合約 ABI
- 一個已部署且具備已驗證 ABI 的智能合約（在描述檔被註冊表接受之前，必須先通過 [Sourcify](https://sourcify.dev) 驗證）
- 用於驗證 CLI 的 Python 3.12（指定的 `erc7730` 套件無法安裝在 Python 3.13 或更新版本上）。如果您的系統 Python 是不同版本，[uv](https://docs.astral.sh/uv/) 可以為您下載並執行 Python 3.12
- 基本的 JSON 知識

## 什麼是 ERC-7730 描述檔？ {#what-is-an-erc-7730-descriptor}

描述檔是一個包含三個區塊的單一 JSON 檔案：

| 區塊 | 目的 |
| :---- | :---- |
| `context` | 透過鏈 ID 和地址將描述檔綁定到特定的合約部署 |
| `metadata` | 命名專案並定義可重複使用的常數 |
| `display` | 將每個函式簽章對應到人類可讀的標籤和欄位格式 |

由於描述檔與合約本身是分開的，您可以為任何現有的協定加入清晰簽署支援，而無需重新部署。錢包會從註冊表中擷取描述檔，並在簽署時使用它們。

## 步驟 1：建立檔案骨架 {#step-1-create-the-file-skeleton}

建立一個名為 `calldata-<ContractName>.json` 的檔案，例如 `calldata-SwapRouter.json`。`calldata-` 前綴告訴註冊表此描述檔涵蓋合約函式呼叫，而不是用於類型化資料 (typed-data) 訊息的 `eip712-`。如果您需要描述合約的多個版本，請在名稱中包含合約版本，就像註冊表中的 `calldata-UniswapV3Router02.json` 一樣。

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

## 步驟 2：撰寫 context 區塊 {#step-2-write-the-context-section}

`context` 區塊將描述檔綁定到一個或多個合約部署。錢包使用它來將傳入的交易與正確的描述檔進行比對。

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Context 欄位 {#context-fields}

- `context.$id` — 此描述檔文件或部署設定的唯一識別碼。
- `contract.deployments` — 此描述檔適用的部署集合。
- `deployments[].chainId` — 部署的 EVM 鏈 ID。請包含您的合約已部署的每一條鏈。
- `deployments[].address` — 錢包應與此描述檔關聯的合約地址。這是使用者實際發送交易的地址。如果您的合約是可升級的，這會是代理 (proxy) 地址，而不是實作 (implementation) 地址，而 `display.formats` 中的函式簽章則來自實作的 ABI。

## 步驟 3：撰寫 metadata 區塊 {#step-3-write-the-metadata-section}

metadata 區塊提供有關此檔案所描述之專案和合約的人類可讀資訊。錢包可能會在簽署期間使用此資訊來顯示協定名稱、連結和其他上下文詳細資訊。

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Metadata 欄位 {#metadata-fields}

- `owner` — 負責此描述檔的專案、協定、組織或維護者。
- `info.url` — 錢包可能會向使用者顯示以提供額外上下文的權威專案或文件 URL。
- `contractName` — 此檔案描述的合約或實作名稱，通常與已驗證的原始碼或 ABI 相符。

如果您的 ERC-7730 檔案描述的是 ERC-20 合約，您也應該加入一個代幣 (token) 物件。 

## 步驟 4：撰寫 display formats 區塊 {#step-4-write-the-displayformats-section}

`display.formats` 物件將函式簽章對應到人類可讀的簽署指示。這就是錢包在使用者授權交易之前向他們顯示您的函式的方式！

每個鍵 (key) 都是一個人類可讀的 ABI 片段——包含參數名稱和參數類型的函式簽章，必須與它們在您的 ABI 中出現的完全一致。


### 範例：描述代幣兌換 {#eg-describing-token-swap}

此範例描述了 Uniswap V2 `Router02` 合約中的 `swapExactTokensForTokens`。輸入代幣是 `path` 的第一個元素，而輸出代幣是最後一個元素（對於多跳兌換 (multi-hop swap)，`path` 可以有兩個以上的元素）。

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
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
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

### Display 欄位 {#display-fields}

- **`intent`** — **(必填)** 簡短、對使用者友善的動作描述，例如「Swap」。
- **`interpolatedIntent`** — **(建議)** 嵌入格式化欄位值的更豐富句子範本，例如 `"Swap {amountIn} for at least {amountOutMin}"`。將此與 `intent` 一起包含，以提供更對使用者友善的描述檔，錢包可以根據任何顯示限制選擇顯示。
- **`fields`** — **(必填)** 錢包應向使用者顯示的交易欄位排序清單。
  - **`path`** — **(必填)** 對交易資料的參考。`#.fieldName` 指向 ABI 中名稱對應的解碼呼叫資料參數。`@.value` 指的是隨交易發送的 ETH 值。陣列元素的寫法是在括號前加上 `.`：`#.path.[0]` 是第一個元素，而 `#.path.[-1]` 是最後一個。`#.path[0]`（沒有點）會被 linter 拒絕。
  - **`label`** — **(必填)** 顯示在值旁邊的人類可讀標籤。
  - **`format`** — **(建議)** 控制值應如何呈現。常見的格式包括：
    - `tokenAmount`
    - `addressName`
    - `date`

    當不需要額外格式化時，請使用 `raw`。某些格式接受額外的 **`params`** 設定。例如：

    - `tokenAmount` 可以使用 `tokenPath` 來識別哪個代幣地址提供小數位數和代號中繼資料。
    - `date` 可以使用 `encoding` 來描述時間戳記的編碼方式。

    如果選擇的格式不需要額外資訊，請省略 `params`。

## 完整的描述檔 {#the-complete-descriptor}

將預留位置地址替換為您已部署合約的地址。linter 會根據這些地址上已驗證的 ABI 來檢查描述檔，因此在您替換之前它會回報錯誤。

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
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
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
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

## 步驟 5：提交到註冊表 {#step-5-submit-to-the-registry}

[ERC-7730 註冊表](https://github.com/ethereum/clear-signing-erc7730-registry) 是一個由[以太坊基金會](/foundation/)作為中立管理者所託管的開放儲存庫。任何人都可以自由複製 (clone) 並自行託管——錢包會獨立決定他們信任哪些註冊表實例。

1. 在 GitHub 上分叉 (Fork) 該儲存庫
2. 在 `registry/<your-project-name>/` 建立一個資料夾
3. 將您的檔案放入其中：`registry/myproject/calldata-SwapRouter.json`
4. 將 `$schema` 欄位更新為儲存庫內使用的相對路徑：`"../../specs/erc7730-v2.schema.json"`。CI 會拒絕此處的 URL。
5. 加入測試檔案（見下文）
6. 在本機驗證您的檔案（見下文）
7. 開啟拉取請求 (pull request)。每個拉取請求只能變更 `registry/` 下的一個資料夾

### 加入測試檔案 {#add-a-test-file}

您加入或變更的每個描述檔都需要一個測試檔案，以便清晰簽署實作可以對其進行檢查。建立 `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json`，並為 `display.formats` 中的每個函式提供至少一個測試案例。CI 會衍生每種格式的函式選擇器，如果沒有測試交易呼叫它，則會失敗。

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` 是完整的序列化**未簽署**交易（此處已縮短），而不僅僅是呼叫資料。對您合約的真實交易是最好的測試案例。
- `dataProvider` 提供代幣中繼資料（以及可選的地址和 ENS 名稱），因此測試不需要網路存取。
- `expected` 是錢包應該顯示的內容。CI 會使用清晰簽署實作來渲染每個測試案例，並在拉取請求上回報任何差異。

有關完整格式（包含 EIP-712 描述檔的測試檔案），請參閱註冊表 README 中的[參考測試案例 (Reference test cases)](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases)。

### 在本機驗證 {#validate-locally}

註冊表使用固定在 `.github/requirements.txt` 中的 [`erc7730`](https://github.com/sourcifyeth/python-erc7730) 命令列工具來檢查描述檔。在 Python 3.12 環境中，從您分叉的根目錄執行它：

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

如果您使用 [uv](https://docs.astral.sh/uv/)，您可以跳過虛擬環境，且 uv 會在需要時下載 Python 3.12：

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

linter 會根據結構描述 (schema) 以及您合約已驗證的 ABI 來檢查描述檔。請修正每個錯誤。諸如 `Missing display format` 之類的警告表示合約具有您的描述檔尚未描述的函式。若要像 CI 一樣同時檢查 `$schema` 路徑和測試檔案，請參閱註冊表 README 中的[如何驗證 (How to validate)](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate)。

當您開啟 PR 時，CI 會自動執行結構描述驗證、檢查函式簽章是否產生有效的選擇器、確認合約地址已在 Sourcify 上驗證，並標記 ABI 不一致之處。檢查結果會內嵌顯示在 PR 上。註冊表維護者會篩選提交的內容，以防出現格式錯誤或潛在惡意的描述檔。被納入註冊表並不代表經過稽核或背書。

<Alert variant="info">
<AlertContent>
<AlertDescription>
**注意：** 您的合約必須在 <a href="https://repo.sourcify.dev">Sourcify</a> 上驗證後，您的 PR 才能被接受。如果尚未驗證，請先<a href="https://verify.sourcify.dev/">提交驗證</a>。
</AlertDescription>
</AlertContent>
</Alert>

## 合併後會發生什麼事？ {#what-happens-after-merging}

註冊表中的所有描述檔都對稽核員開放。在您的 PR 合併後，任何稽核員都可以審查您的描述檔，並發布密碼學證明（根據 [ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)）以確認其準確性。 

這些證明訊號讓錢包能夠套用自己的信任策略——擁有多個獨立證明的描述檔比沒有證明的描述檔更具份量。您可以透過 [clearsigning.org](https://clearsigning.org) 聯絡稽核員社群。

錢包會選擇他們將支援哪個註冊表。一旦您的描述檔進入註冊表，支援 ERC-7730 的錢包如果其註冊表中包含該描述檔，就會開始擷取它，並在使用者與您的合約互動時顯示人類可讀的資料。

## 延伸閱讀 {#further-reading}

- [ERC-7730 規格](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 註冊表](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — 工具、生態系狀態與治理  
- [Sourcify 合約驗證](https://sourcify.dev)  
- [兆元安全倡議 (Trillion Dollar Security initiative)](https://trilliondollarsecurity.org)

