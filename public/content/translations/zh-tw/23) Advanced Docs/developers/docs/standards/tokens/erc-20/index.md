---
title: ERC-20 代幣標準
description:
lang: zh-tw
---

## 簡介 {#introduction}

**什麼是代幣？**

代幣幾乎可以代表以太坊中的任何東西：

- 線上平台信譽積分
- 遊戲中角色的技能
- 金融資產，如公司股份
- 法定貨幣，如美元
- 一盎司黃金
- 以及更多...

以太坊這麼強大的功能當然要由一個穩健的標準來處理，對吧？ 這正是 ERC-20 發揮作用的地方！ 這個標準允許開發者構建與其他產品和服務相互操作的代幣應用程式。 ERC-20 標準也用於為[以太](/glossary/#ether)提供附加功能。

**什麼是 ERC-20？**

ERC-20 引入了同質化代幣的標準，換句話說，這些代幣具有一種屬性，使得每個代幣在類型和值上都與其他代幣完全相同。 例如，ERC-20 代幣就像以太幣一樣，意味著一個代幣會及永遠與其他代幣一樣。

## 基本資訊 {#prerequisites}

- [帳戶](/developers/docs/accounts)
- [智慧型合約](/developers/docs/smart-contracts/)
- [權杖標準](/developers/docs/standards/tokens/)

## 內文 {#body}

ERC-20（以太坊意見請求 20）由 Fabian Vogelsteller 於 2015 年 11 月提出，是一種在智慧型合約中實作代幣應用程式介面的代幣標準。

ERC-20 的功能範例：

- 將代幣從一個帳戶轉移到另一個帳戶
- 取得帳戶當前代幣餘額
- 取得網路上可用代幣的總供應量
- 批准第三方帳戶是否可以使用帳戶中的一定數量代幣

如果智慧型合約實作以下方法和事件，則可以將其稱為 ERC-20 代幣合約。一旦部署，它將負責追蹤以太坊上創建的代幣。

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

讓我們看看為何標準如此重要，去讓我們檢查以太坊上的任何 ERC-20 代幣合約變得簡單。 我們只需要合約應用程式二進位介面 (ABI) 來創建任何 ERC-20 代幣的介面。 如下所示，我們將使用簡化的 ABI，使其成為一個低門檻的範例。

#### Web3.py 範例 {#web3py-example}

首先，請確保你已經安裝了 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 程式庫：

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
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

當 ERC-20 代幣被發送到並非用於處理 ERC-20 代幣而設計的智慧型合約時，這些代幣可能會永久丟失。 發生這種情況是因為接收合約不具有識別或回應傳入代幣的功能，且 ERC-20 標準中沒有機制來通知接收合約有關傳入代幣的資訊。 這個問題形成的主要方式是：

1.  代幣傳送機制
  - ERC-20 代幣使用了 transfer 或 transferFrom 函數傳送
    -   當用戶使用這些函數將代幣發送到合約地址時，無論接收合約是否為處理代幣而設，代幣都會被傳送
2.  缺乏通知
    -   接收的合約沒有收到代幣已發送給它的通知或回調
    -   如果接收合約缺乏處理代幣的機制（例如，遞補函數或管理代幣接收的專用函數），則代幣實際上會卡在合約的地址中
3.  沒有內建處理
    -   ERC-20 標準沒有包括強制要求接收合約實作接收代幣的函數，這導致許多合約無法正確管理收到的代幣

一些替代標準，例如 [ERC-223](/developers/docs/standards/tokens/erc-223) 已經解決了這個問題

## 了解更多 {#further-reading}

- [EIP20：ERC-20 代幣標準](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - 代幣](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 代幣指南](https://www.alchemy.com/overviews/erc20-solidity)


## 其他同質化代幣標準 {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - 代幣化金庫](/developers/docs/standards/tokens/erc-4626)