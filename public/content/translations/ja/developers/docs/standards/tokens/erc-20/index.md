---
title: ERC-20トークン規格
description:
lang: ja
---

## はじめに {#introduction}

**トークンとは何か？**

トークンは、イーサリアムネットワークにおいて事実上あらゆるものを表現できます。

- オンラインプラットフォームにおける評価ポイント。
- ゲーム内のキャラクターにおけるスキル。
- 宝くじの券。
- 企業の株式などの金融資産。
- 米ドルをはじめとする法定通貨。
- 金（ゴールド）1オンス。
- 等々。

イーサリアムにおいてこれほどの威力を持つ機能に対しては、必然的に堅牢な規格が必要です。 これこそ、ERC-20規格が果たすべき役割なのです！ この規格を用いることで、イーサリアム外の製品やサービスと相互運用できるトークンアプリを構築することが可能になります。

**ERC-20とは何か？**

ERC-20規格は、代替性トークンを扱うための標準規格です。つまりこの規格では、ひとつのトークンが、その種類および値において他のトークンとまったく同じであるというプロパティを持たせることができます。 例えば、ERC-20トークンはETHとまったく同様に動作します。つまり、1トークンは、現在および将来において常に、他のひとつのトークンと同等になります。

## 前提知識 {#prerequisites}

- [アカウント](/developers/docs/accounts)
- [スマートコントラクト](/developers/docs/smart-contracts/)
- [トークンの基準](/developers/docs/standards/tokens/)

## 規格の概要 {#body}

ERC-20（Ethereum Request for Comments 20）は、スマートコントラクト内にトークンAPIとして実装できるトークン規格として、ファビアン・ヴォゲルステラー氏により2015年11月に提案されました。

ERC-20は、以下のような機能を提供します:

- トークンを、ひとつのアカウントから他のアカウントに転送する。
- アカウントにおける現在のトークン残高を取得する。
- ネットワーク上で利用可能なトークンの総供給量を取得する。
- 特定のアカウントにおけるトークンにつき、一定額をサードパーティのアカウントが使用できるか否かを承認する。

以下のメソッドおよびイベントを実装しているスマートコントラクトはERC-20トークンコントラクトと呼ぶことができ、デプロイされると、イーサリアム上で発行されたトークンの状況を追跡する責任を負います。

[EIP-20](https://eips.ethereum.org/EIPS/eip-20)から引用：

### メソッド {#methods}

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

### イベント {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### 実例： {#web3py-example}

イーサリアムのERC-20トークンコントラクトのコードを詳しく見ることで、これらの規格がイーサリアムのシンプルさを保証する上でどれだけ重要なのかを理解しておきましょう。 ERC-20トークンを扱うインターフェイスを開発するには、当該コントラクトのアプリケーション・バイナリー・インターフェイス（ABI）を用いればよいです。 理解しやすいように、以下では簡略化したABIを用いています。

#### Web3.pyの実例： {#web3py-example}

まず、 Pythonのライブラリから[Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation)をインストール済みであることを確認してください:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# これはERC-20トークンのコントラクトのアプリケーション・バイナリ・インターフェース（ABI）を簡略化したものです。
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

## 参考文献 {#further-reading}

- [EIP-20：ERC-20トークン規格](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - トークン](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20の実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - SolidityにおけるERC20トークンのガイド](https://www.alchemy.com/overviews/erc20-solidity)
