---
title: "ERC-20 代币标准"
description: "了解 ERC-20，这是以太坊上的同质化代币标准，支持可互操作的代币应用程序。"
lang: zh
---

## 简介 {#introduction}

**什么是代币？**

代币几乎可以代表[以太坊](/)中的任何东西：

- 在线平台中的信誉积分
- 游戏中角色的技能
- 金融资产，如公司股份
- 法定货币，如美元
- 一盎司黄金
- 以及更多……

以太坊如此强大的功能必须由一个强大的标准来处理，对吧？这正是 ERC-20 发挥作用的地方！该标准允许开发者构建与其他产品和服务可互操作的代币应用程序。ERC-20 标准还用于为[以太币](/glossary/#ether)提供附加功能。

**什么是 ERC-20？**

ERC-20 引入了同质化代币的标准，换句话说，它们具有一种属性，使得每个代币（在类型和价值上）与另一个代币完全相同。例如，一个 ERC-20 代币的作用就像 ETH 一样，这意味着 1 个代币现在和将来都始终等于所有其他代币。

## 前提条件 {#prerequisites}

- [账户](/developers/docs/accounts)
- [智能合约](/developers/docs/smart-contracts/)
- [代币标准](/developers/docs/standards/tokens/)

## 正文 {#body}

ERC-20（Ethereum Request for Comments 20，以太坊征求意见稿 20）由 Fabian Vogelsteller 于 2015 年 11 月提出，是一种在智能合约中为代币实现 API 的代币标准。

ERC-20 提供的功能示例：

- 将代币从一个账户转账到另一个账户
- 获取账户的当前代币余额
- 获取网络上可用的代币总供应量
- 授权第三方账户是否可以花费某个账户中的一定数量的代币

如果一个智能合约实现了以下方法和事件，它就可以被称为 ERC-20 代币合约，并且一旦部署，它将负责跟踪在以太坊上创建的代币。

摘自 [EIP-20](https://eips.ethereum.org/EIPS/eip-20)：

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

让我们看看标准为何如此重要，它使我们能够轻松检查以太坊上的任何 ERC-20 代币合约。我们只需要合约应用程序二进制接口（ABI）即可创建任何 ERC-20 代币的接口。正如你在下面看到的，我们将使用一个简化的 ABI，使其成为一个低门槛的示例。

#### Web3.py 示例 {#web3py-example-2}

首先，确保你已经安装了 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 库：

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # 包装以太币 (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # 尤尼斯瓦普 V2: DAI 2

# 这是一个 ERC-20 代币合约的简化合约应用二进制接口 (ABI)。
# 它将仅暴露以下方法：balanceOf(address)、decimals()、symbol() 和 totalSupply()
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

## 已知问题 {#erc20-issues}

### ERC-20 代币接收问题 {#reception-issue}

**截至 2024 年 6 月 20 日，至少有价值 83,656,418 美元的 ERC-20 代币因该问题而丢失。请注意，纯粹的 ERC-20 实现很容易出现此问题，除非你在标准之上实施如下所列的一系列额外限制。**

当 ERC-20 代币被发送到一个并非设计用于处理 ERC-20 代币的智能合约时，这些代币可能会永久丢失。发生这种情况是因为接收合约没有识别或响应传入代币的功能，并且 ERC-20 标准中没有机制来通知接收合约有关传入代币的信息。此问题的主要表现形式包括：

1.	代币转账机制
  - ERC-20 代币使用 transfer 或 transferFrom 函数进行转账
	-	当用户使用这些函数将代币发送到合约地址时，无论接收合约是否设计为处理它们，代币都会被转账
2.	缺乏通知
	-	接收合约不会收到代币已发送给它的通知或回调
	-	如果接收合约缺乏处理代币的机制（例如，回退函数或管理代币接收的专用函数），代币实际上会卡在合约地址中
3.	没有内置处理机制
	-	ERC-20 标准不包含接收合约必须实现的强制性函数，导致许多合约无法正确管理传入的代币

**可能的解决方案**

虽然无法完全防止 ERC-20 出现此问题，但有一些方法可以显著降低最终用户丢失代币的可能性：

- 最常见的问题是用户将代币发送到代币合约地址本身（例如，将 USDT 存入 USDT 代币合约的地址）。建议限制 `transfer(..)` 函数以回退此类转账尝试。考虑在 `transfer(..)` 函数的实现中添加 `require(_to != address(this));` 检查。
- `transfer(..)` 函数通常不是为将代币存入合约而设计的。相反，`approve(..) & transferFrom(..)` 模式用于将 ERC-20 代币存入合约。可以限制转账函数以禁止使用它将代币存入任何合约，但这可能会破坏与假设可以使用 `transfer(..)` 函数将代币存入合约的合约（例如，尤尼斯瓦普流动性池）的兼容性。
- 始终假设 ERC-20 代币最终可能会进入你的合约，即使你的合约本不应该接收任何代币。在接收方无法防止或拒绝意外存款。建议实现一个允许提取意外存入的 ERC-20 代币的函数。
- 考虑使用替代的代币标准。

针对此问题已经出现了一些替代标准，例如 [ERC-223](/developers/docs/standards/tokens/erc-223) 或 [ERC-1363](/developers/docs/standards/tokens/erc-1363)。

## 延伸阅读 {#further-reading}

- [EIP-20：ERC-20 代币标准](https://eips.ethereum.org/EIPS/eip-20)
- [欧本齐柏林 - 代币](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [欧本齐柏林 - ERC-20 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC-20 代币指南](https://www.alchemy.com/overviews/erc20-solidity)

## 其他同质化代币标准 {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - 代币化金库](/developers/docs/standards/tokens/erc-4626)

## 教程：在以太坊上使用 ERC-20 进行构建 {#tutorials}

- [ERC-20 合约演练](/developers/tutorials/erc20-annotated-code/) _– 欧本齐柏林 ERC-20 合约实现的逐行注释演练。_
- [带有安全护栏的 ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– 如何为 ERC-20 代币添加安全防护，以帮助用户避免常见错误。_
- [使用 Ethers.js 发送代币](/developers/tutorials/send-token-ethersjs/) _– 使用 Ethers.js 转账 ERC-20 代币的初学者友好指南。_
- [诈骗代币使用的一些伎俩以及如何检测它们](/developers/tutorials/scam-token-tricks/) _– 深入探讨诈骗 ERC-20 代币模式以及如何识别它们。_