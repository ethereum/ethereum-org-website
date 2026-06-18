---
title: ERC-721 非代替性トークン標準
description: イーサリアム上の固有のデジタル資産を表す非代替性トークン（NFT）の標準であるERC-721について学びます。
lang: ja
---

## はじめに {#introduction}

**非代替性トークンとは何ですか？**

非代替性トークン（NFT）は、何かまたは誰かを一意に識別するために使用されます。このタイプのトークンは、コレクティブルアイテム、アクセスキー、宝くじ、コンサートやスポーツの試合の指定席などを提供するプラットフォームでの使用に最適です。この特別なタイプのトークンには驚くべき可能性があるため、適切な標準が必要であり、ERC-721がそれを解決するために登場しました！

**ERC-721とは何ですか？**

ERC-721はNFTの標準を導入します。言い換えれば、このタイプのトークンは一意であり、同じスマート・コントラクトからの別のトークンとは異なる価値を持つ可能性があります。それは、年齢、希少性、あるいは見た目のような他の要因によるものかもしれません。えっ、見た目？

はい！すべてのNFTには`tokenId`と呼ばれる`uint256`変数が含まれています。そのため、どのERC-721コントラクトにおいても、`contract address, uint256 tokenId`のペアはグローバルに一意でなければなりません。つまり、分散型アプリケーション (dapp) は、`tokenId`を入力として使用し、ゾンビ、武器、スキル、または素晴らしい子猫のようなクールなものの画像を出力する「コンバーター」を持つことができます！

## 前提条件 {#prerequisites}

- [アカウント](/developers/docs/accounts/)
- [スマート・コントラクト](/developers/docs/smart-contracts/)
- [トークン標準](/developers/docs/standards/tokens/)

## 本文 {#body}

2018年1月にWilliam Entriken、Dieter Shirley、Jacob Evans、Nastassia Sachsによって提案されたERC-721（[イーサリアム](/) Request for Comments 721）は、スマート・コントラクト内のトークン用のAPIを実装する非代替性トークン標準です。

あるアカウントから別のアカウントへトークンを送金する、アカウントの現在のトークン残高を取得する、特定のトークンの所有者を取得する、ネットワーク上で利用可能なトークンの総供給量を取得するなどの機能を提供します。これらに加えて、アカウントからの一定量のトークンを第三者のアカウントが移動できることを承認するなどの機能もあります。

スマート・コントラクトが以下のメソッドとイベントを実装している場合、それはERC-721非代替性トークンコントラクトと呼ぶことができ、デプロイされると、イーサリアム上で作成されたトークンを追跡する役割を担います。

[EIP-721](https://eips.ethereum.org/EIPS/eip-721)より:

### メソッド {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### イベント {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### 例 {#web3py-example}

イーサリアム上の任意のERC-721トークンコントラクトを検査する際、標準がいかに物事をシンプルにするために重要であるかを見てみましょう。任意のERC-721トークンへのインターフェースを作成するには、コントラクトのアプリケーション・バイナリ・インターフェース（ABI）が必要です。以下に示すように、理解しやすい例にするために簡略化されたABIを使用します。

#### Web3.pyの例 {#web3py-example-2}

まず、[Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Pythonライブラリがインストールされていることを確認してください:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # クリプトキティーズ・コントラクト

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # クリプトキティーズのセールスオークション

# これはERC-721 NFTコントラクトの簡略化されたコントラクト・アプリケーション・バイナリ・インターフェース（ABI）です。
# 以下のメソッドのみを公開します: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# TransferイベントのABIを使用して、送金されたKittiesに関する情報を取得します。
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# ログをフィルタリングするためにイベントのシグネチャが必要です
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# メモ:
#   - Transferイベントが返されない場合は、ブロック数を120から増やしてください。
#   - Transferイベントが見つからなかった場合は、以下でtokenIdの取得を試すこともできます:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       クリックしてイベントのログを展開し、その「tokenId」引数をコピーします
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 上記のリンクから取得した「tokenId」をここに貼り付けます
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

クリプトキティーズのコントラクトには、標準のもの以外にも興味深いイベントがいくつかあります。

`Pregnant`と`Birth`の2つを確認してみましょう。

```python
# PregnantおよびBirthイベントのABIを使用して、新しいKittiesに関する情報を取得します。
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# ログをフィルタリングするためにイベントのシグネチャが必要です
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# 以下はPregnantイベントです:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# 以下はBirthイベントです:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 人気のNFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts)は、送金量によるイーサリアム上のトップNFTをリストアップしています。
- [クリプトキティーズ](https://www.cryptokitties.co/)は、繁殖可能でコレクティブルな、とても愛らしいクリプトキティーズと呼ばれる生き物を中心としたゲームです。
- [Sorare](https://sorare.com/)は、限定版のコレクティブルを集め、チームを管理し、賞品を獲得するために競い合うグローバルなファンタジーフットボールゲームです。
- [Ethereum Name Service (ENS)](https://ens.domains/)は、シンプルで人間が読める名前を使用して、ブロックチェーンの内外両方のリソースをアドレス指定するための安全で分散型の方法を提供します。
- [POAP](https://poap.xyz)は、イベントに参加したり特定のアクションを完了したりした人々に無料のNFTを提供します。POAPは無料で作成および配布できます。
- [Unstoppable Domains](https://unstoppabledomains.com/)は、ブロックチェーン上にドメインを構築しているサンフランシスコを拠点とする企業です。ブロックチェーンのドメインは、暗号資産のアドレスを人間が読める名前に置き換え、検閲耐性のあるウェブサイトを可能にするために使用できます。
- [Gods Unchained Cards](https://godsunchained.com/)は、イーサリアムブロックチェーン上のTCGであり、NFTを使用してゲーム内資産に真の所有権をもたらします。
- [Bored Ape Yacht Club](https://boredapeyachtclub.com)は、10,000個のユニークなNFTのコレクションです。証明可能な希少なアート作品であるだけでなく、クラブのメンバーシップトークンとしても機能し、コミュニティの努力の結果として時間とともに増加するメンバーの特典や利益を提供します。

## 参考文献 {#further-reading}

- [EIP-721: ERC-721 非代替性トークン標準](https://eips.ethereum.org/EIPS/eip-721)
- [オープンツェッペリン - ERC-721 ドキュメント](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [オープンツェッペリン - ERC-721 実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## チュートリアル: イーサリアム上で非代替性トークン（ERC-721）を使用して構築する {#tutorials}

- [Vyper ERC-721 コントラクトのウォークスルー](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyperで書かれた完全なERC-721 NFTコントラクトの注釈付きウォークスルー。_
- [NFTの書き方とデプロイ方法（パート1/3）](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– 初めてのERC-721スマート・コントラクトを書いてデプロイするためのステップバイステップガイド。_
- [NFTをミントする方法（パート2/3）](/developers/tutorials/how-to-mint-an-nft/) _– デプロイされたスマート・コントラクトとWeb3を使用してERC-721 NFTをミントする方法。_
- [ウォレットでNFTを表示する方法（パート3/3）](/developers/tutorials/how-to-view-nft-in-metamask/) _– デプロイ後、ミントしたNFTをメタマスクで表示する方法。_
- [NFTミンターチュートリアル](/developers/tutorials/nft-minter/) _– Reactフロントエンド、メタマスク、Alchemyを使用して、フルスタックのNFTミンティングdappを構築します。_