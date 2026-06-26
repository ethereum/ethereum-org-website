---
title: "ERC-20 代幣標準"
description: "了解 ERC-20，這是在以太坊上用於同質化代幣的標準，能實現可互操作的代幣應用程式。"
lang: zh-tw
---

## 簡介 {#introduction}

**什麼是代幣？**

代幣在[以太坊](/)中幾乎可以代表任何東西：

- 線上平台中的聲譽積分
- 遊戲中角色的技能
- 金融資產，例如公司的股份
- 法定貨幣，例如美元
- 一盎司的黃金
- 以及更多……

以太坊如此強大的功能必須由一個穩健的標準來處理，對吧？這正是 ERC-20 發揮作用的地方！這個標準允許開發者建立與其他產品和服務可互操作的代幣應用程式。ERC-20 標準也用於為[以太幣](/glossary/#ether)提供額外的功能。

**什麼是 ERC-20？**

ERC-20 引入了同質化代幣的標準，換句話說，它們具有一種特性，使得每個代幣（在類型和價值上）與另一個代幣完全相同。例如，ERC-20 代幣的作用就像 ETH 一樣，這意味著 1 個代幣現在和未來都將永遠等同於所有其他的代幣。

## 先決條件 {#prerequisites}

- [帳戶](/developers/docs/accounts)
- [智能合約](/developers/docs/smart-contracts/)
- [代幣標準](/developers/docs/standards/tokens/)

## 內文 {#body}

ERC-20（Ethereum Request for Comments 20，以太坊意見徵求稿第 20 號）由 Fabian Vogelsteller 於 2015 年 11 月提出，是一個在智能合約中為代幣實作 API 的代幣標準。

ERC-20 提供的功能範例：

- 將代幣從一個帳戶轉帳到另一個帳戶
- 取得帳戶目前的代幣餘額
- 取得網路上可用的代幣總供應量
- 授權第三方帳戶是否可以花費某個帳戶中一定數量的代幣

如果一個智能合約實作了以下方法和事件，它就可以被稱為 ERC-20 代幣合約，一旦部署，它將負責追蹤在以太坊上建立的代幣。

來自 [EIP-20](https://eips.ethereum.org/EIPS/eip-20)：

### 方法 {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### 事件 {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### 範例 {#web3py-example}

讓我們看看標準為何如此重要，它使我們能夠輕鬆檢查以太坊上的任何 ERC-20 代幣合約。我們只需要合約應用程式二進位介面 (ABI) 即可建立任何 ERC-20 代幣的介面。如下所示，我們將使用簡化的 ABI，使其成為一個簡單易懂的範例。

#### Web3.py 範例 {#web3py-example-2}

首先，請確保您已安裝 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 函式庫：

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # 包裝以太幣 (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # 尤尼斯瓦普 V2：DAI 2

# 這是一個 ERC-20 代幣合約的簡化合約應用程式二進位介面 (ABI)。
# 它將僅公開以下方法：balanceOf(address)、decimals()、symbol() 和 totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## 已知問題 {#erc20-issues}

### ERC-20 代幣接收問題 {#reception-issue}

**截至 2024 年 6 月 20 日，至少有價值 83,656,418 美元的 ERC-20 代幣因這個問題而遺失。請注意，純粹的 ERC-20 實作很容易出現這個問題，除非您在標準之上實作如下所列的一組額外限制。**

當 ERC-20 代幣被發送到未設計用於處理 ERC-20 代幣的智能合約時，這些代幣可能會永久遺失。發生這種情況是因為接收合約沒有識別或回應傳入代幣的功能，而且 ERC-20 標準中沒有機制可以通知接收合約有關傳入代幣的資訊。這個問題主要透過以下方式發生：

1.	代幣轉帳機制
  - ERC-20 代幣使用 transfer 或 transferFrom 函式進行轉帳
	-	當使用者使用這些函式將代幣發送到合約地址時，無論接收合約是否設計為處理它們，代幣都會被轉帳
2.	缺乏通知
	-	接收合約不會收到代幣已發送給它的通知或回呼 (callback)
	-	如果接收合約缺乏處理代幣的機制（例如，回退函式或管理代幣接收的專用函式），代幣實際上會卡在合約的地址中
3.	沒有內建處理機制
	-	ERC-20 標準不包含接收合約必須實作的強制性函式，導致許多合約無法正確管理傳入的代幣

**可能的解決方案**

雖然無法完全防止 ERC-20 出現此問題，但有一些方法可以顯著降低終端使用者遺失代幣的可能性：

- 最常見的問題是當使用者將代幣發送到代幣合約地址本身時（例如，將 USDT 存入 USDT 代幣合約的地址）。建議限制 `transfer(..)` 函式以回滾此類轉帳嘗試。考慮在 `transfer(..)` 函式的實作中加入 `require(_to != address(this));` 檢查。
- 一般來說，`transfer(..)` 函式並非設計用於將代幣存入合約。相反地，`approve(..) & transferFrom(..)` 模式用於將 ERC-20 代幣存入合約。可以限制轉帳函式以禁止使用它將代幣存入任何合約，但這可能會破壞與假設可以使用 `transfer(..)` 函式將代幣存入合約的相容性（例如，尤尼斯瓦普流動性池）。
- 始終假設 ERC-20 代幣最終可能會進入您的合約，即使您的合約不應該接收任何代幣。接收端無法防止或拒絕意外的存款。建議實作一個允許提取意外存入的 ERC-20 代幣的函式。
- 考慮使用替代的代幣標準。

針對這個問題已經出現了一些替代標準，例如 [ERC-223](/developers/docs/standards/tokens/erc-223) 或 [ERC-1363](/developers/docs/standards/tokens/erc-1363)。

## 延伸閱讀 {#further-reading}

- [EIP-20：ERC-20 代幣標準](https://eips.ethereum.org/EIPS/eip-20)
- [歐本齊柏林 - 代幣](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [歐本齊柏林 - ERC-20 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC-20 代幣指南](https://www.alchemy.com/overviews/erc20-solidity)

## 其他同質化代幣標準 {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - 代幣化金庫](/developers/docs/standards/tokens/erc-4626)

## 教學：在以太坊上使用 ERC-20 進行建置 {#tutorials}

- [ERC-20 合約演練](/developers/tutorials/erc20-annotated-code/) _– 歐本齊柏林 ERC-20 合約實作的逐行註解演練。_
- [帶有安全護欄的 ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– 如何為 ERC-20 代幣加入安全防護，以幫助使用者避免常見錯誤。_
- [使用 Ethers.js 發送代幣](/developers/tutorials/send-token-ethersjs/) _– 適合初學者的指南，介紹如何使用 Ethers.js 轉帳 ERC-20 代幣。_
- [詐騙代幣使用的一些伎倆以及如何偵測它們](/developers/tutorials/scam-token-tricks/) _– 深入探討詐騙 ERC-20 代幣模式以及如何識別它們。_