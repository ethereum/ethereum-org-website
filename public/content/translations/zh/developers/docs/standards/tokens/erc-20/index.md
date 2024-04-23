---
title: ERC-20 代币标准
description:
lang: zh
---

## 介绍 {#introduction}

**什么叫做代币？**

代币可以在以太坊中表示任何东西：

- 在线平台中的信誉积分
- 游戏中一个角色的技能
- 彩票卷
- 金融资产类似于公司股份的资产
- 像美元一样的法定货币
- 一盎司黄金
- 及更多...

以太坊的这种强大特点必须以强有力的标准来处理，对吗？ 这正是 ERC-20 发挥其作用的地方！ 此标准允许开发者构建可与其他产品和服务互相操作的代币应用程序。

**什么是 ERC-20？**

ERC-20 提出了一个同质化代币的标准，换句话说，它们具有一种属性，使得每个代币都与另一个代币（在类型和价值上）完全相同。 例如，一个 ERC-20 代币就像以太币一样，意味着一个代币会并永远会与其他代币一样。

## 前提条件 {#prerequisites}

- [帐户](/developers/docs/accounts)
- [智能合约](/developers/docs/smart-contracts/)
- [代币标准](/developers/docs/standards/tokens/)

## 正文 {#body}

ERC-20（以太坊意见征求 20）由 Fabian Vogelsteller 提出于 2015 年 11 月。这是一个能实现智能合约中代币的应用程序接口标准。

ERC-20 的功能示例包括：

- 将代币从一个帐户转到另一个帐户
- 获取帐户的当前代币余额
- 获取网络上可用代币的总供应量
- 批准一个帐户中一定的代币金额由第三方帐户使用

如果智能合约实施了下列方法和事件，它可以被称为 ERC-20 代币合约，一旦部署，将负责跟踪以太坊上创建的代币。

来自 [EIP-20](https://eips.ethereum.org/EIPS/eip-20)：

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

### 示例 {#web3py-example}

让我们看看如此重要的一个标准是如何使我们能够简单地检查以太坊上的任何 ERC-20 代币合约。 我们只需要合约的应用程序二进制接口 (ABI) 来创造一个 ERC-20 代币界面。 下面我们将使用一个简化的应用程序二进制接口，让例子变得更为简单。

#### Web3.py 示例 {#web3py-example}

首先，请确保你已安装 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 库：

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

## 延伸阅读 {#further-reading}

- [EIP-20：ERC-20 代币标准](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - 代币](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 实施](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 代币指南](https://www.alchemy.com/overviews/erc20-solidity)
