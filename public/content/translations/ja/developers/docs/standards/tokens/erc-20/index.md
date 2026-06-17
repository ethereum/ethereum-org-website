---
title: ERC-20 トークン標準
description: 相互運用可能なトークンアプリケーションを可能にする、イーサリアム上の代替可能トークンの標準であるERC-20について学びます。
lang: ja
---

## はじめに {#introduction}

**トークンとは何ですか？**

トークンは、[イーサリアム](/)において事実上あらゆるものを表現できます。

- オンラインプラットフォームでの評判ポイント
- ゲームのキャラクターのスキル
- 会社の株式のような金融資産
- USDのような法定通貨
- 1オンスの金
- その他多数...

イーサリアムのこのような強力な機能は、堅牢な標準によって処理される必要がありますよね？まさにそこでERC-20が役割を果たします！この標準により、開発者は他の製品やサービスと相互運用可能なトークンアプリケーションを構築できます。ERC-20標準は、[イーサ](/glossary/#ether)に追加機能を提供するためにも使用されます。

**ERC-20とは何ですか？**

ERC-20は代替可能トークン（Fungible Token）の標準を導入します。言い換えると、各トークンが他のトークンと（種類と価値において）まったく同じになるという特性を持っています。例えば、ERC-20トークンはETHとまったく同じように機能します。つまり、1トークンは常に他のすべてのトークンと等しいということです。

## 前提条件 {#prerequisites}

- [アカウント](/developers/docs/accounts)
- [スマート・コントラクト](/developers/docs/smart-contracts/)
- [トークン標準](/developers/docs/standards/tokens/)

## 本文 {#body}

2015年11月にFabian Vogelstellerによって提案されたERC-20（Ethereum Request for Comments 20）は、スマート・コントラクト内のトークン用のAPIを実装するトークン標準です。

ERC-20が提供する機能の例：

- あるアカウントから別のアカウントへトークンを送金する
- アカウントの現在のトークン残高を取得する
- ネットワーク上で利用可能なトークンの総供給量を取得する
- アカウントの一定量のトークンをサードパーティのアカウントが使用できるかどうかを承認する

スマート・コントラクトが以下のメソッドとイベントを実装している場合、それはERC-20トークンコントラクトと呼ぶことができ、デプロイされると、イーサリアム上で作成されたトークンを追跡する役割を担います。

[EIP-20](https://eips.ethereum.org/EIPS/eip-20)より：

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

### 例 {#web3py-example}

イーサリアム上の任意のERC-20トークンコントラクトを検査する際、標準がいかに物事をシンプルにする上で重要であるかを見てみましょう。任意のERC-20トークンへのインターフェースを作成するには、コントラクトのアプリケーション・バイナリ・インターフェース（ABI）が必要です。以下に示すように、摩擦の少ない例にするために簡略化されたABIを使用します。

#### Web3.pyの例 {#web3py-example-2}

まず、[Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Pythonライブラリがインストールされていることを確認してください。

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # ラップドイーサ (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # ユニスワップ V2: DAI 2

# これはERC-20トークンコントラクトの簡略化されたコントラクト・アプリケーション・バイナリ・インターフェース（ABI）です。
# 以下のメソッドのみを公開します: balanceOf(address)、decimals()、symbol()、および totalSupply()
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

## 既知の問題 {#erc20-issues}

### ERC-20トークンの受信問題 {#reception-issue}

**2024年6月20日現在、この問題により少なくとも83,656,418ドル相当のERC-20トークンが失われました。以下にリストされているように、標準の上に一連の追加の制限を実装しない限り、純粋なERC-20の実装はこの問題の影響を受けやすいことに注意してください。**

ERC-20トークンを処理するように設計されていないスマート・コントラクトにERC-20トークンが送信されると、それらのトークンは永久に失われる可能性があります。これは、受信側のコントラクトに受信したトークンを認識または応答する機能がなく、ERC-20標準には受信側のコントラクトにトークンの受信を通知するメカニズムがないために発生します。この問題が具体化する主な要因は以下の通りです。

1.	トークンの送金メカニズム
  - ERC-20トークンは、transferまたはtransferFrom関数を使用して送金されます。
	-	ユーザーがこれらの関数を使用してコントラクトアドレスにトークンを送信すると、受信側のコントラクトがそれらを処理するように設計されているかどうかに関係なく、トークンは送金されます。
2.	通知の欠如
	-	受信側のコントラクトは、トークンが送信されたという通知やコールバックを受け取りません。
	-	受信側のコントラクトにトークンを処理するメカニズム（例：フォールバック関数やトークン受信を管理する専用関数）がない場合、トークンは事実上コントラクトのアドレスにスタックします。
3.	組み込みの処理がない
	-	ERC-20標準には、受信側のコントラクトが実装すべき必須の関数が含まれていないため、多くのコントラクトが受信したトークンを適切に管理できない状況につながっています。

**考えられる解決策**

ERC-20でこの問題を完全に防ぐことはできませんが、エンドユーザーのトークン喪失の可能性を大幅に減らすことができる方法があります。

- 最も一般的な問題は、ユーザーがトークンコントラクトのアドレス自体にトークンを送信する場合です（例：USDTトークンコントラクトのアドレスにUSDTを入金する）。そのような送金の試みをリバートするように`transfer(..)`関数を制限することをお勧めします。`transfer(..)`関数の実装内に`require(_to != address(this));`のチェックを追加することを検討してください。
- 一般的に、`transfer(..)`関数はコントラクトにトークンを入金するためには設計されていません。代わりに、ERC-20トークンをコントラクトに入金するには`approve(..) & transferFrom(..)`パターンが使用されます。transfer関数を制限して、それを使用して任意のコントラクトにトークンを入金できないようにすることは可能ですが、`transfer(..)`関数を使用してコントラクトにトークンを入金できると想定しているコントラクト（例：ユニスワップの流動性プール）との互換性が損なわれる可能性があります。
- コントラクトがトークンを受け取ることを想定していない場合でも、ERC-20トークンがコントラクトに送られてくる可能性があると常に想定してください。受信側で誤った入金を防いだり拒否したりする方法はありません。誤って入金されたERC-20トークンを抽出できる関数を実装することをお勧めします。
- 代替のトークン標準の使用を検討してください。

この問題から、[ERC-223](/developers/docs/standards/tokens/erc-223)や[ERC-1363](/developers/docs/standards/tokens/erc-1363)などの代替標準がいくつか登場しています。

## 参考文献 {#further-reading}

- [EIP-20: ERC-20 トークン標準](https://eips.ethereum.org/EIPS/eip-20)
- [オープンツェッペリン - トークン](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [オープンツェッペリン - ERC-20 実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20トークンガイド](https://www.alchemy.com/overviews/erc20-solidity)

## その他の代替可能トークン標準 {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - トークン化されたボールト](/developers/docs/standards/tokens/erc-4626)

## チュートリアル：イーサリアム上でERC-20を使って構築する {#tutorials}

- [ERC-20コントラクトのウォークスルー](/developers/tutorials/erc20-annotated-code/) _– オープンツェッペリンのERC-20コントラクト実装の1行ごとの注釈付きウォークスルー。_
- [安全対策付きのERC-20](/developers/tutorials/erc20-with-safety-rails/) _– ユーザーがよくある間違いを避けるために、ERC-20トークンにセーフガードを追加する方法。_
- [Ethers.jsを使用したトークンの送信](/developers/tutorials/send-token-ethersjs/) _– Ethers.jsを使用してERC-20トークンを送金するための初心者向けガイド。_
- [詐欺トークンが使用するいくつかの手口とそれらを検出する方法](/developers/tutorials/scam-token-tricks/) _– 詐欺的なERC-20トークンのパターンとそれらを特定する方法についての詳細な解説。_